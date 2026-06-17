# Prototype 03 — La double lecture

**Public :** le juriste (avocat, juriste associatif) qui prépare un recours.
**Forme :** une extension de navigateur fictive greffée sur les pages Légifrance.
**Code de référence :** [`../code/`](../code/) — `proto3.html`, `proto3.css`,
`proto3.js` (+ `sync-guard.js` partagé). S'appuie sur le **Système de Design de
l'État (DSFR)**.
**Version en production :** `proto3.html` à la racine du site.

---

## Intention

Servir le besoin le plus exigeant : fonder un **moyen de droit** sur le calcul.
Le juriste n'a pas besoin de pédagogie, il a besoin de la règle exacte, de sa
source législative, et d'une **trace d'exécution pour le cas réel** — afin de
repérer précisément où l'algorithme s'écarte de la loi.

## Mécanique

Sur une page **Légifrance** reproduite, l'extension donne accès à la
**traduction Catala exécutable** de l'article et confronte le texte de loi au
code effectivement appliqué. Elle s'organise en **trois onglets** :

- **Lecture** — l'article et sa traduction Catala mises en regard ;
- **Génération** — production de blocs / éléments pour le dossier ;
- **Projet** — l'instruction du dossier en cours.

La trace met en évidence, par exemple, une **exception légale qui aurait dû
s'appliquer mais ne l'a pas** — le moyen retenu pour le recours.

## Scénario de test

L'utilisateur incarne **Maître Léa Bernard**, avocate en droit social à Lyon,
mandatée par **Marie D.** pour préparer un **recours amiable devant la CRA**
(Commission de Recours Amiable) de la CAF du Rhône. Délai légal : **2 mois** à
compter de la notification, soit jusqu'au **15 mars 2026**.

Avant d'ouvrir l'outil, deux questions de cadrage mesurent sa pratique actuelle
(« comment instruiriez-vous ce dossier sans l'outil ? »). Mission : comprendre
le calcul, vérifier la conformité de la procédure, identifier les points
contestables, préparer l'argumentation. Puis cinq tâches et l'entretien de
retour.

## Ce qu'il démontre

Que la transparence outillée se convertit en **capacité d'action juridique** :
la même trace, lue par un professionnel, devient un instrument d'instruction et
de contestation. C'est l'expression la plus directe de l'enjeu démocratique du
mémoire — un algorithme public est un acte administratif, donc contestable.

## Repères techniques

- **Styles** : `proto3.css` + DSFR (`@gouvfr/dsfr`) + police Spectral (registre
  Légifrance).
- **Logique** : `proto3.js` gère l'extension (3 onglets), la génération de blocs
  et la couche de test (4 phases). `sync-guard.js` sécurise l'envoi des
  résultats.
- **Modes** : `proto3.html` (questionnaire) · `?demo=1` (présentation) ·
  `?test=1` (réaffiche la couche test).
