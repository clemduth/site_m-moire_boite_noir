# Prototype 04 — La tour de calcul *(test, non finalisé)*

**Public :** exploration visuelle (pas de public-cible figé, non testé).
**Forme :** le calcul APL réel monté en **bâtiment isométrique 3D**, un étage par
variable.
**Geste de design :** spatialiser un calcul complexe pour le rendre *navigable*.

---

## Le problème de départ

Le calcul réel des aides au logement n'est pas une formule unique : c'est une
**chaîne d'une vingtaine de variables** qui se nourrissent les unes les autres
(plafonds, abattements, taux, participations…). Une trace linéaire, lue de bout
en bout, devient vite illisible — on perd le fil de ce qui dépend de quoi.

La question explorée ici : **comment donner à voir, en une seule image
navigable, un calcul long et imbriqué ?** Plutôt que de le dérouler en liste, on
le **spatialise** : chaque variable devient un étage, et l'on suit les valeurs
qui montent d'un étage à l'autre jusqu'au résultat final.

## La mécanique : un bâtiment qu'on explore

Le calcul est représenté comme une **tour isométrique en 3D**. Sur le cas-test
public de Catala — 3 personnes à charge, 15 000 € de ressources, résultat
**463,32 €** d'aide — chaque variable du graphe de calcul est un étage du
bâtiment. L'utilisateur peut :

- **ouvrir la boîte** et faire **tourner** la tour pour en saisir la structure ;
- **rechercher** une variable, **monter / descendre** d'étage en étage,
  **zoomer** sur l'un d'eux ;
- consulter le **détail** d'un étage, structuré en trois registres :
  - **« la machine »** — l'opération réalisée à cet étage (entrée, constante,
    mise à l'échelle, combinaison…) ;
  - **« le suivi du calcul »** — les entrées et sorties tracées, cliquables pour
    suivre une valeur d'un étage à l'autre ;
  - **« en Catala »** — l'extrait de code correspondant.

Les valeurs et le code sont tirés du **graphe de calcul APL réel** (Gesbert,
*L'explication par la paresse*, JFLA 2025, fig. 8).

## Statut

C'est une **maquette de test, non finalisée et non soumise au protocole de test
utilisateur.** Elle sert à éprouver une *piste de représentation*, pas à être un
outil abouti — ce qu'un bandeau signale d'ailleurs explicitement dans
l'interface.

## Ce qu'elle démontre

Une **direction de recherche** : rendre un calcul complexe *navigable
spatialement* plutôt que lu de bout en bout. À confronter, dans la suite du
travail, aux trois prototypes éprouvés — c'est l'hypothèse visuelle la plus
ambitieuse, et la moins stabilisée, du corpus.
