# Organisation des dossiers et fichiers du site

Le site est un **site statique** (HTML/CSS/JS) avec un unique point d'entrée
PHP (`save.php`) pour collecter les résultats des tests utilisateurs. Tout est
déployé à la racine `/var/www/html/` du serveur.

> Cette page documente le site *réel en production*. Les copies de code rangées
> sous `docs/protoN/code/` ne sont que des copies de référence : éditer le site,
> c'est éditer les fichiers décrits ci-dessous, à la racine.

## Arborescence

```
/var/www/html/
├── index.html                       accueil — mémoire et synthèse (6 sections)
│
├── proto1.html                      proto 01 · la décision dépliable
├── proto2.html                      proto 02 · le simulateur de vie
├── proto3.html                      proto 03 · la double lecture
├── proto4.html                      proto 04 · la tour de calcul (test, autonome)
│
├── proto1-brut-9c2f1a.html          variante : trace Catala brute (proto 1)
├── presentation-protos-4a2e7d.html  page de présentation (les 4 protos en démo)
├── bilan-tests-b7f3c9.html          bilan des tests utilisateurs
├── verif-sauvegarde.html            page de vérification des sauvegardes
│
├── save.php                         endpoint POST → écrit les CSV de résultats
├── robots.txt                       blocage de l'indexation
├── .htaccess                        configuration Apache (racine)
├── README.md                        doc technique (déploiement, droits, polices)
│
├── css/                             feuilles de style
│   ├── index.css                    accueil + page de présentation
│   ├── proto1.css                   proto 1 (style courrier CAF)
│   ├── proto2.css                   proto 2 (simulateur)
│   └── proto3.css                   proto 3 (extension Légifrance · DSFR)
│
├── js/                              scripts
│   ├── index.js                     navigation active au scroll
│   ├── proto1.js                    dépliants + couche test (proto 1)
│   ├── proto2.js                    simulateur + couche test (proto 2)
│   ├── proto3.js                    extension + couche test (proto 3)
│   └── sync-guard.js                garde-fou d'envoi des résultats (protos 1-3)
│
├── docs/                            documents et documentation (ce dossier)
│   ├── memoire_les_boites_noires.pdf  mémoire intégral téléchargeable
│   ├── 00-resume-global.md            résumé global du projet
│   ├── site/                          cette documentation
│   └── proto1…4-*/                    code + explication par prototype
│
└── resultats/                       CSV des tests (créés par save.php)
    ├── .htaccess                    bloque tout accès web externe
    ├── resultats_proto1.csv
    ├── resultats_proto2.csv
    ├── resultats_proto3.csv
    └── .protoN.lock                 verrous d'écriture concurrente
```

## Rôle de chaque dossier

| Dossier | Contenu | Remarques |
|---------|---------|-----------|
| *(racine)* | pages HTML, `save.php`, `robots.txt`, `README.md` | tout est servi à la racine ; les chemins entre fichiers sont **relatifs** |
| `css/` | une feuille par page / proto | `index.css` sert aussi la page de présentation |
| `js/` | un script par page / proto + `sync-guard.js` | `sync-guard.js` est **partagé** par les protos 1 à 3 |
| `docs/` | mémoire PDF + cette documentation | non servie de façon critique au site ; sûre à éditer |
| `resultats/` | CSV générés par `save.php` | **protégé** : `.htaccess` bloque l'accès web, récupération par SSH/SFTP uniquement |

## Points d'attention

- **Chemins relatifs.** Les HTML référencent `css/…`, `js/…`,
  `docs/memoire_les_boites_noires.pdf`. Tous les fichiers doivent rester dans la
  même arborescence sur le serveur — c'est pourquoi on ne déplace pas les protos
  dans des sous-dossiers (cela casserait l'accueil, les liens et `save.php`).
- **`save.php` à la racine.** Les protos envoient leurs résultats à `save.php`
  via la variable `SYNC_ENDPOINT` en tête de chaque JS. Le dossier `resultats/`
  doit être accessible en écriture par `www-data`.
- **Pages internes non répertoriées.** `presentation-protos-…`, `bilan-tests-…`
  et `verif-sauvegarde.html` portent des suffixes aléatoires et `noindex` : non
  listées, partagées par lien direct.
- **Modes d'ouverture des protos.** `protoN.html` = version questionnaire
  complète ; `?demo=1` (ou absence de `?test`) = version présentation sans
  questionnaire ; `?test=1` = réaffiche la couche test.

Pour le détail du déploiement (serveur, droits de fichiers, polices, endpoint),
voir le [`README.md`](../../README.md) à la racine.
