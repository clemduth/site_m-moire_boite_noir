# Prototype 01 — La décision dépliable

**Public :** l'allocataire qui reçoit la décision.
**Forme :** une notification de dette CAF reproduite à l'identique, *augmentée*
par une « extension Catala ».
**Geste de design :** expliquer une décision *déjà tombée*, couche par couche, à
la demande.

---

## Le problème de départ

Le point de contact le plus fréquent entre l'allocataire et l'algorithme, c'est
le **courrier**. Or la notification de dette CAF est le document le plus opaque
qui soit : dense, juridique, impersonnel, écrit pour l'administration plus que
pour la personne. Marie D. y reconnaît son nom, des chiffres, le mot « dette » —
mais rien ne lui dit *d'où* vient cette dette, ni si elle peut agir.

L'enjeu de conception : rendre ce document lisible **sans le réécrire**. On ne
remplace pas le courrier officiel (il a une valeur juridique) ; on le laisse tel
quel et on greffe par-dessus une couche d'explicabilité, activable seulement là
où ça bloque.

## La mécanique : quatre couches dépliables

Chaque élément incompréhensible du courrier — un chiffre, une somme, un terme
technique — est **souligné en orange** et peut être déplié. Le dépliage révèle
**quatre couches**, organisées du plus concret au plus contextuel :

1. **En clair** — ce que ça veut dire, le détail du calcul sous forme de tableau,
   et un encart « Concrètement » qui traduit l'effet réel sur la situation.
2. **Loi** — l'article du Code applicable, présenté en carte Légifrance :
   intitulé, citation de l'article, lien vers la source.
3. **Code & responsable** — l'extrait **Catala** correspondant (le calcul rendu
   lisible) et *qui* est responsable de cette donnée ou de cette règle : DGFiP,
   France Travail, CNAF / CRISTAL, avec la date et la source du flux.
4. **Pourquoi cette règle** — le contexte historique et politique : pourquoi
   cette règle existe, d'où elle vient, ce qu'elle produit (réforme de la
   contemporanéisation, programme « dites-le-nous-une-fois », logique d'indu
   héritée de 1945…).

La progression des couches incarne directement l'**explicabilité adaptative** :
le même fait technique est dit quatre fois, à quatre niveaux de profondeur, et
l'usager s'arrête au niveau qui lui suffit.

### Les éléments dépliables du courrier

Le courrier de Marie D. compte sept points d'entrée, qui suivent le fil du
raisonnement de la CAF :

| Élément | Question à laquelle il répond |
|---------|-------------------------------|
| `informations` | D'où viennent les informations utilisées ? (flux DGFiP, France Travail…) |
| `après calcul` | Quel calcul a été appliqué ? (formule du barème ALS) |
| `1 213 € reçu` | D'où vient cette somme déjà versée ? |
| `793 € de droit` | Pourquoi le droit recalculé est-il plus bas ? |
| `420 € de dette` | Comment arrive-t-on à ce montant ? (versé − dû) |
| `57 € de retenue` | Comment la retenue mensuelle est-elle fixée ? |
| `199 € ALS final` | Pourquoi ce nouveau montant à partir de janvier ? |

Des commandes **« tout déplier / tout replier »** et un **glossaire** de termes
techniques cliquables complètent la lecture.

## Le scénario éprouvé

L'utilisateur incarne **Marie D.**, seule chez elle, tard, face à une
notification de dette de 420 € qu'elle ne comprend pas — alors qu'elle n'a rien
changé à sa situation. Il explore d'abord librement le document, puis accomplit
des tâches concrètes (retrouver l'origine de la dette, comprendre le passage de
1 213 € à 793 €…), avant un entretien de retour.

## La variante « brute »

Une variante affiche la **trace Catala telle quelle**, sans aucune mise en forme.
Elle sert de **contre-exemple** : elle donne à voir, par contraste, ce
qu'ajoute le travail de design. La trace brute remplit l'obligation de
*transparence* — mais reste illisible. C'est tout l'écart avec
l'*intelligibilité* que le prototype cherche à combler.

## Ce qu'il démontre

Que l'explicabilité peut être **progressive et à la demande** : on n'impose pas
tout le calcul d'un coup, l'usager ouvre ce qui le bloque, au niveau de
profondeur qu'il choisit. Une seule et même trace technique alimente les quatre
couches. C'est l'illustration la plus directe de la promesse du mémoire, du côté
du public le plus exposé et le moins outillé.
