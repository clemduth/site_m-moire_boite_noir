# Prototype 01 — La décision dépliable

**Public :** l'allocataire qui reçoit la décision.
**Forme :** une notification de dette CAF reproduite à l'identique, *augmentée*
par une « extension Catala ».
**Code de référence :** [`../code/`](../code/) — `proto1.html`, `proto1.css`,
`proto1.js` (+ `sync-guard.js` partagé, `proto1-brut-9c2f1a.html` variante).
**Version en production :** `proto1.html` à la racine du site.

---

## Intention

Partir du document réel le plus opaque — un courrier de notification de dette,
dense, juridique, impersonnel — et le rendre lisible **sans le réécrire**. Le
courrier reste tel quel ; ce sont les éléments incompréhensibles (un chiffre, un
mot technique, une somme) qui deviennent dépliables à la demande.

## Mécanique

Chaque élément souligné en orange se déplie en **quatre couches**, du plus
concret au plus contextuel :

1. **En clair** — ce que ça veut dire, le détail du calcul, un encart
   « Concrètement ».
2. **Loi** — l'article du code applicable (carte Légifrance : citation + lien).
3. **Code & responsable** — l'extrait **Catala** correspondant et *qui* est
   responsable de la donnée ou de la règle (DGFiP, France Travail, CNAF /
   CRISTAL…).
4. **Pourquoi cette règle** — le contexte historique et politique (réforme de la
   contemporanéisation, « dites-le-nous-une-fois », logique d'indu de 1945…).

Des contrôles « tout déplier / tout replier » et un glossaire de termes
techniques cliquables complètent la lecture.

### Éléments dépliables du courrier

`informations` · `après calcul` · `1 213 € reçu` · `793 € de droit` ·
`420 € de dette` · `57 € de retenue` · `199 € ALS final`. Chacun ouvre ses
quatre couches.

## Scénario de test

L'utilisateur incarne **Marie D.**, seule chez elle, tard, face à la
notification de dette de 420 €. Il explore librement le document, puis accomplit
**cinq tâches** (retrouver l'origine de la dette, comprendre le passage de
1 213 € à 793 €, etc.), avant un **entretien de retour** (jusqu'à 12 questions).

## Ce qu'il démontre

Que l'explicabilité peut être **progressive et à la demande** : on n'impose pas
tout le calcul d'un coup, l'usager ouvre ce qui le bloque, au niveau de
profondeur qu'il choisit. La même trace technique alimente les quatre couches —
illustration directe de l'**explicabilité adaptative**.

## La variante « brute »

`proto1-brut-9c2f1a.html` montre la trace Catala affichée *telle quelle*, sans
mise en forme. Elle sert de **contre-exemple** : donner à voir, par contraste,
ce qu'ajoute le travail de design d'intelligibilité (transparence ≠
intelligibilité).

## Repères techniques

- **Styles** : `proto1.css` (style courrier CAF — Open Sans + JetBrains Mono).
- **Logique** : `proto1.js` gère les dépliants, les couches, le glossaire et la
  couche de test (4 phases). `sync-guard.js` sécurise l'envoi des résultats.
- **Modes** : `proto1.html` (questionnaire) · `?demo=1` (présentation) ·
  `?test=1` (réaffiche la couche test).
