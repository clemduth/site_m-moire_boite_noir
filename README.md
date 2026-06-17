# les boîtes noires — site final

site statique du mémoire DSAA "les boîtes noires" de clément duterlay, avec
4 pages (accueil + 3 prototypes interactifs de test utilisateur) et un endpoint
PHP pour collecter les résultats de test.

## structure

```
site_final/
├── index.html                  accueil — mémoire et synthèse
├── proto1.html                 la décision dépliable (allocataire)
├── proto2.html                 le simulateur de vie (allocataire prospectif)
├── proto3.html                 la double lecture (juriste)
├── save.php                    endpoint de réception des résultats de test
├── robots.txt                  règles d'indexation moteurs de recherche
├── README.md                   ce fichier
│
├── css/                        feuilles de style
│   ├── index.css               accueil
│   ├── proto1.css              proto 1 (style CAF)
│   ├── proto2.css              proto 2 (simulateur)
│   └── proto3.css              proto 3 (extension Légifrance)
│
├── js/                         scripts
│   ├── index.js                nav active au scroll
│   ├── proto1.js               logique dépliants + couche test
│   ├── proto2.js               logique simulateur + couche test
│   └── proto3.js               logique extension + couche test
│
├── docs/                       documents téléchargeables
│   └── memoire_les_boites_noires.pdf
│
└── resultats/                  CSV des tests utilisateurs (créés par save.php)
    ├── .htaccess               bloque tout accès web externe
    └── README.md
```

## modifier le site

- **changer le texte ou la structure d'une page** → éditer le `.html` correspondant
- **changer la mise en forme** → éditer le `.css` correspondant dans `css/`
- **changer un comportement interactif** → éditer le `.js` correspondant dans `js/`
- **mettre à jour le PDF du mémoire** → remplacer `docs/memoire_les_boites_noires.pdf`

les chemins dans les HTML sont **relatifs** (`css/index.css`, `js/index.js`,
`docs/memoire_les_boites_noires.pdf`), donc tous les fichiers doivent rester
dans la même arborescence sur le serveur.

## polices

- **sligoil** (velvetyne, ariel martín pérez) — chargée depuis velvetyne.fr (accueil)
- **cambay** (google fonts, pooja saxena) — accueil
- **open sans** + **jetbrains mono** — google fonts, protos 1 et 2 (style CAF)
- **spectral** — google fonts, proto 3 (style Légifrance)

## endpoint de sauvegarde (save.php)

`save.php` reçoit en POST un JSON contenant les réponses du testeur, et le
stocke dans un CSV par prototype dans le dossier `resultats/`. la doc complète
est dans les commentaires en tête du fichier.

prérequis sur le serveur :
- PHP 7.4+ activé (apache + libapache2-mod-php)
- droits d'écriture sur le dossier `resultats/`

protection du dossier `resultats/` :
- le `.htaccess` bloque tout accès web (lecture ou listing depuis un navigateur)
- les CSV sont récupérables uniquement via SSH/SFTP sur le serveur
- `robots.txt` bloque aussi l'indexation par les moteurs

les 3 prototypes envoient automatiquement les résultats à `save.php` à la racine
du site. configurable dans chaque proto via la variable `SYNC_ENDPOINT` en tête
du JS.

## déploiement (serveur Debian local de Clément)

- serveur : Debian 12 + Apache, lenovo mini PC
- accès local : `http://192.168.1.51`
- racine sur le serveur : `/var/www/html/`
- propriétaire du dossier : `clem`

déposer le contenu du dossier `site_final/` dans `/var/www/html/` via WinSCP/SFTP.
aucun redémarrage Apache n'est nécessaire, le changement est visible immédiatement
après refresh du navigateur.

vérifier les droits :
- `css/`, `js/`, `docs/` : 755, propriétaire `clem`
- fichiers HTML, CSS, JS, PDF : 644, propriétaire `clem`
- `save.php` : 644, propriétaire `clem`
- `resultats/` : 755, propriétaire `www-data` (pour que PHP puisse y écrire)

