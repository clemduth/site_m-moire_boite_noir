<?php
/**
 * save.php — Endpoint de réception des résultats de test utilisateur
 *
 * Reçoit en POST un JSON décrivant la session d'un testeur, et le stocke dans
 * un fichier CSV cumulatif (1 ligne par testeur, par proto).
 *
 * À chaque étape validée par le testeur, le proto envoie tout l'état courant.
 * Le script :
 *   - identifie le testeur par son champ "session_id" (UUID généré côté navigateur)
 *   - met à jour la ligne correspondante (ou la crée si nouvelle)
 *   - crée le CSV avec un header si le fichier n'existe pas encore
 *
 * Usage côté client :
 *   fetch('save.php', {
 *     method: 'POST',
 *     headers: { 'Content-Type': 'application/json' },
 *     body: JSON.stringify({ proto: 'proto1', session_id: '...', data: {...} })
 *   });
 *
 * Mémoire DSAA "Les boîtes noires" — Clément Duterlay, 2026
 */

// ──────────────────────────────────────────────────────────────────
// CONFIG
// ──────────────────────────────────────────────────────────────────

// dossier où sont stockés les CSV
// IMPORTANT : ce dossier doit être en dehors du web public ou protégé par .htaccess
// par défaut on le met à côté du script ; pense à le verrouiller (voir guide)
$RESULTATS_DIR = __DIR__ . '/resultats';

// protos acceptés (pour éviter d'écrire n'importe où)
$PROTOS_VALIDES = ['proto1', 'proto2', 'proto3'];

// taille max du JSON reçu (en octets) — protection anti-flood
$MAX_JSON_SIZE = 200 * 1024; // 200 Ko

// ──────────────────────────────────────────────────────────────────
// CORS — autorise les requêtes depuis n'importe quel domaine
// (utile si les protos sont servis depuis un autre serveur que celui-ci)
// ──────────────────────────────────────────────────────────────────
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json; charset=utf-8');

// pré-vol CORS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// ──────────────────────────────────────────────────────────────────
// VALIDATION
// ──────────────────────────────────────────────────────────────────
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Méthode non autorisée']);
    exit;
}

$rawBody = file_get_contents('php://input');
if (strlen($rawBody) > $MAX_JSON_SIZE) {
    http_response_code(413);
    echo json_encode(['ok' => false, 'error' => 'Payload trop gros']);
    exit;
}

$payload = json_decode($rawBody, true);
// Repli : si le corps brut n'est pas du JSON (ex. formulaire HTML classique),
// on accepte aussi un champ POST "payload" contenant le JSON.
if (!is_array($payload) && isset($_POST['payload'])) {
    $payload = json_decode($_POST['payload'], true);
}
if (!is_array($payload)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'JSON invalide']);
    exit;
}

$proto = $payload['proto'] ?? null;
$sessionId = $payload['session_id'] ?? null;
$data = $payload['data'] ?? null;

if (!in_array($proto, $PROTOS_VALIDES, true)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Proto inconnu']);
    exit;
}

if (!is_string($sessionId) || !preg_match('/^[a-z0-9-]{8,40}$/i', $sessionId)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'session_id invalide']);
    exit;
}

if (!is_array($data)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'data manquant']);
    exit;
}

// ──────────────────────────────────────────────────────────────────
// CRÉATION DU DOSSIER
// ──────────────────────────────────────────────────────────────────
if (!is_dir($RESULTATS_DIR)) {
    if (!@mkdir($RESULTATS_DIR, 0750, true)) {
        http_response_code(500);
        echo json_encode(['ok' => false, 'error' => 'Impossible de créer le dossier de résultats']);
        exit;
    }
}

$csvPath = $RESULTATS_DIR . '/resultats_' . $proto . '.csv';

// ──────────────────────────────────────────────────────────────────
// APLATIR LE JSON EN LIGNE CSV
// ──────────────────────────────────────────────────────────────────
// stratégie : on aplatit récursivement le tableau associatif en colonnes
// du type "phases.taches.0.result", "phases.entretien.echelles.precision", etc.

function flatten_array(array $arr, string $prefix = ''): array {
    $result = [];
    foreach ($arr as $key => $val) {
        $col = $prefix === '' ? (string)$key : $prefix . '.' . $key;
        if (is_array($val)) {
            // si tableau vide
            if (count($val) === 0) {
                $result[$col] = '';
            } else {
                $result = array_merge($result, flatten_array($val, $col));
            }
        } else {
            if (is_bool($val)) {
                $result[$col] = $val ? 'true' : 'false';
            } elseif (is_null($val)) {
                $result[$col] = '';
            } else {
                $result[$col] = (string)$val;
            }
        }
    }
    return $result;
}

$flatData = flatten_array($data);

// on ajoute les méta-colonnes générales en début
$row = array_merge([
    'session_id' => $sessionId,
    'last_update' => date('Y-m-d H:i:s'),
    'ip_hash' => substr(hash('sha256', ($_SERVER['REMOTE_ADDR'] ?? '') . 'salt_boites_noires'), 0, 12),
    'user_agent' => substr($_SERVER['HTTP_USER_AGENT'] ?? '', 0, 200),
], $flatData);

// ──────────────────────────────────────────────────────────────────
// VERROU + LECTURE DU CSV EXISTANT
// ──────────────────────────────────────────────────────────────────
// on prend un verrou exclusif sur un fichier .lock pour éviter qu'un autre
// testeur écrive en même temps et corrompe le CSV
$lockPath = sys_get_temp_dir() . '/bn_' . $proto . '.lock';
$lockFp = fopen($lockPath, 'c');
if (!$lockFp || !flock($lockFp, LOCK_EX)) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'Verrou impossible']);
    exit;
}

try {
    $existingHeaders = [];
    $existingRows = [];

    if (file_exists($csvPath) && filesize($csvPath) > 0) {
        if (($fp = fopen($csvPath, 'r')) !== false) {
            $existingHeaders = fgetcsv($fp, 0, ',', '"', '\\') ?: [];
            // Strip BOM from first header if present
            if (!empty($existingHeaders) && substr($existingHeaders[0], 0, 3) === "\xEF\xBB\xBF") {
                $existingHeaders[0] = substr($existingHeaders[0], 3);
            }
            while (($r = fgetcsv($fp, 0, ',', '"', '\\')) !== false) {
                if (count($r) === count($existingHeaders)) {
                    $existingRows[] = array_combine($existingHeaders, $r);
                }
            }
            fclose($fp);
        }
    }

    // ──────────────────────────────────────────────────────────────────
    // FUSION DES HEADERS — on garde l'ordre existant, on ajoute les nouveaux à la fin
    // ──────────────────────────────────────────────────────────────────
    $newKeys = array_keys($row);
    $mergedHeaders = $existingHeaders;
    foreach ($newKeys as $k) {
        if (!in_array($k, $mergedHeaders, true)) {
            $mergedHeaders[] = $k;
        }
    }

    // ──────────────────────────────────────────────────────────────────
    // MISE À JOUR DE LA LIGNE OU AJOUT
    // ──────────────────────────────────────────────────────────────────
    $updated = false;
    foreach ($existingRows as &$existingRow) {
        if (($existingRow['session_id'] ?? '') === $sessionId) {
            // on écrase les valeurs avec celles de $row (qui contient tout l'état courant)
            foreach ($row as $k => $v) {
                $existingRow[$k] = $v;
            }
            $updated = true;
            break;
        }
    }
    unset($existingRow);

    if (!$updated) {
        $existingRows[] = $row;
    }

    // ──────────────────────────────────────────────────────────────────
    // RÉÉCRITURE COMPLÈTE DU CSV
    // ──────────────────────────────────────────────────────────────────
    $tmpPath = $csvPath . '.tmp';
    if (($fp = fopen($tmpPath, 'w')) === false) {
        throw new Exception('Impossible d\'ouvrir le CSV en écriture');
    }
    // BOM UTF-8 pour Excel
    fwrite($fp, "\xEF\xBB\xBF");
    fputcsv($fp, $mergedHeaders, ',', '"', '\\');
    foreach ($existingRows as $r) {
        $line = [];
        foreach ($mergedHeaders as $h) {
            $line[] = $r[$h] ?? '';
        }
        fputcsv($fp, $line, ',', '"', '\\');
    }
    fclose($fp);

    // renommage atomique
    if (!rename($tmpPath, $csvPath)) {
        @unlink($tmpPath);
        throw new Exception('Impossible de remplacer le CSV');
    }

    // ──────────────────────────────────────────────────────────────────
    // OK
    // ──────────────────────────────────────────────────────────────────
    flock($lockFp, LOCK_UN);
    fclose($lockFp);

    echo json_encode([
        'ok' => true,
        'session_id' => $sessionId,
        'proto' => $proto,
        'updated' => $updated,
        'columns' => count($mergedHeaders)
    ]);
} catch (Exception $e) {
    flock($lockFp, LOCK_UN);
    fclose($lockFp);
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => $e->getMessage()]);
}
