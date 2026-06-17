/**
 * sync-guard.js — Filet de sécurité de sauvegarde
 *
 * Module indépendant du code de chaque proto. Il lit l'état que le proto
 * enregistre déjà dans localStorage (clé boites_noires_session_protoN) et
 * le renvoie à save.php avec vérification de la réponse et réessai en cas
 * d'échec. Affiche un petit témoin de statut pour qu'aucun envoi raté ne
 * passe inaperçu.
 *
 * Ne touche à rien d'autre : il se contente de garantir la livraison.
 *
 * Mémoire DSAA "Les boîtes noires" — Clément Duterlay, 2026
 */
(function () {
  // ── identifier le proto courant ────────────────────────────────
  var m = (location.pathname || '').match(/proto([123])/);
  var PROTO = m ? ('proto' + m[1]) : null;
  if (!PROTO) {
    // repli : chercher une session déjà commencée dans localStorage
    try {
      for (var i = 0; i < localStorage.length; i++) {
        var k = localStorage.key(i);
        if (/^boites_noires_session_proto[123]$/.test(k)) {
          PROTO = k.replace('boites_noires_session_', '');
          break;
        }
      }
    } catch (e) { /* localStorage indisponible */ }
  }
  if (!PROTO) return;

  var KEY = 'boites_noires_session_' + PROTO;
  var ENDPOINT = 'save.php';
  var lastSentHash = null;
  var sending = false;
  var retryTimer = null;

  // ── témoin de statut ────────────────────────────────────────────
  var badge = document.createElement('div');
  badge.style.cssText = 'position:fixed;bottom:12px;right:12px;z-index:2147483647;' +
    'font:12px/1.4 monospace;padding:6px 10px;border-radius:4px;background:#1a1a1a;' +
    'color:#bbb;opacity:.9;pointer-events:none;display:none;box-shadow:0 2px 8px rgba(0,0,0,.25)';
  function setBadge(txt, color) {
    badge.textContent = txt || '';
    badge.style.color = color || '#bbb';
    badge.style.display = txt ? 'block' : 'none';
  }
  function whenReady(fn) {
    if (document.body) fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }
  whenReady(function () { document.body.appendChild(badge); });

  // ── lecture de l'état local ─────────────────────────────────────
  function readSession() {
    try {
      var raw = localStorage.getItem(KEY);
      if (!raw) return null;
      var p = JSON.parse(raw);
      if (!p || !p.data) return null;
      // on n'envoie que si le test a effectivement commencé
      if (!p.data.meta || !p.data.meta.started_at) return null;
      return { session_id: p.session_id, data: p.data };
    } catch (e) { return null; }
  }

  function hashOf(s) {
    try { return JSON.stringify(s.data); } catch (e) { return String(Date.now()); }
  }

  // ── envoi vérifié, avec réessai ─────────────────────────────────
  function send(force) {
    var s = readSession();
    if (!s || !s.session_id) return;
    var h = hashOf(s);
    if (!force && h === lastSentHash) return; // rien de nouveau depuis le dernier envoi réussi
    if (sending) return;
    sending = true;
    setBadge('envoi…', '#e0a800');
    fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ proto: PROTO, session_id: s.session_id, data: s.data })
    })
      .then(function (r) {
        if (!r.ok) return Promise.reject('HTTP ' + r.status);
        return r.json().catch(function () { return { ok: true }; });
      })
      .then(function (j) {
        sending = false;
        if (j && j.ok) {
          lastSentHash = h;
          setBadge('enregistré \u2713', '#28a745');
          setTimeout(function () {
            if (badge.textContent.indexOf('enregistré') === 0) setBadge('');
          }, 2500);
        } else {
          throw new Error('réponse non ok');
        }
      })
      .catch(function () {
        sending = false;
        setBadge('non enregistré \u2014 nouvel essai…', '#dc3545');
        clearTimeout(retryTimer);
        retryTimer = setTimeout(function () { send(true); }, 4000); // réessai automatique
      });
  }

  // ── envoi de secours synchrone à la fermeture ───────────────────
  function beacon() {
    var s = readSession();
    if (!s || !s.session_id) return;
    try {
      var blob = new Blob(
        [JSON.stringify({ proto: PROTO, session_id: s.session_id, data: s.data })],
        { type: 'application/json' }
      );
      navigator.sendBeacon(ENDPOINT, blob);
    } catch (e) { /* ignore */ }
  }

  // ── déclencheurs ────────────────────────────────────────────────
  // 1) périodique
  setInterval(function () { send(false); }, 5000);
  // 2) à chaque saisie (debounced)
  var inputTimer = null;
  document.addEventListener('input', function (e) {
    if (e.target && (e.target.tagName === 'TEXTAREA' || e.target.tagName === 'INPUT')) {
      clearTimeout(inputTimer);
      inputTimer = setTimeout(function () { send(false); }, 1200);
    }
  }, true);
  // 3) onglet masqué / page quittée / fermeture
  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'hidden') beacon();
  });
  window.addEventListener('pagehide', beacon);
  window.addEventListener('beforeunload', beacon);
  // 4) à l'apparition de l'écran de remerciement : envoi vérifié forcé
  whenReady(function () {
    var obs = new MutationObserver(function () {
      var t = document.getElementById('test-overlay-thanks');
      if (t && t.style.display && t.style.display !== 'none') send(true);
      var oldEnd = document.getElementById('test-overlay-end');
      if (oldEnd && (!oldEnd.classList.contains('test-hidden'))) send(true);
    });
    obs.observe(document.documentElement, {
      attributes: true, subtree: true, attributeFilter: ['style', 'class']
    });
  });
  // 5) tentative initiale : livrer d'éventuelles données d'un test précédent
  whenReady(function () { setTimeout(function () { send(false); }, 1500); });
})();
