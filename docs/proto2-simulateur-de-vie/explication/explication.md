# Prototype 02 — Le simulateur de vie

**Public :** l'allocataire prospectif (qui anticipe un changement).
**Forme :** un simulateur où l'on glisse des « blocs de vie » sur une frise de
douze mois.
**Code de référence :** [`../code/`](../code/) — `proto2.html`, `proto2.css`,
`proto2.js` (+ `sync-guard.js` partagé).
**Version en production :** `proto2.html` à la racine du site.

---

## Intention

Déplacer l'explication du *passé* vers le *futur*. Là où le proto 1 explique une
décision déjà tombée, le proto 2 permet d'**anticiper** : que se passe-t-il pour
mon ALS si je déménage, si je reprends un emploi, si un enfant arrive ?
L'objectif est de redonner une prise prospective, là où l'allocataire subit
habituellement des recalculs trimestriels qu'il ne voit pas venir.

## Mécanique

Une palette de **blocs de changement de vie** (déménagement, reprise d'emploi,
naissance…) que l'on dépose sur une **frise mensuelle de 12 mois**. Un graphique
montre l'évolution prévue de l'ALS au fil de l'année, et chaque variation expose
la **trace du calcul** qui l'explique. L'utilisateur compose ainsi son propre
scénario et en lit immédiatement l'effet.

## Scénario de test

L'utilisateur incarne **Marie D.**, 32 ans, mi-temps à 1 650 € net, 199 € d'ALS,
qui prévoit deux changements :

- **mai 2026** — déménagement dans un T2 à 650 € (zone 2) ;
- **septembre 2026** — passage à temps plein (2 000 € net).

Sa question : ces changements vont-ils **déclencher un nouvel indu** ? Son ALS
va-t-elle monter ou baisser ? L'utilisateur formule d'abord son intuition (« le
déménagement ou le temps plein ? »), puis utilise le simulateur pour la
vérifier, accomplit cinq tâches, et répond à l'entretien de retour.

## Ce qu'il démontre

Que la trace Catala peut alimenter un outil **prospectif et manipulable**, pas
seulement justificatif. L'explicabilité devient un instrument de **contrôle de sa
propre situation**, et non plus une lecture après coup d'une décision subie.

## Repères techniques

- **Styles** : `proto2.css` (Open Sans + JetBrains Mono).
- **Logique** : `proto2.js` gère le glisser-déposer des blocs sur la frise, le
  calcul de l'ALS, le graphique et la couche de test (4 phases).
  `sync-guard.js` sécurise l'envoi des résultats.
- **Modes** : `proto2.html` (questionnaire) · `?demo=1` (présentation) ·
  `?test=1` (réaffiche la couche test).
