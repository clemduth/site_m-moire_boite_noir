# Prototype 04 — La tour de calcul *(test, non finalisé)*

**Public :** exploration visuelle (pas de public-cible figé, non testé).
**Forme :** le calcul APL réel monté en **bâtiment isométrique 3D**, un étage par
variable.
**Code de référence :** [`../code/`](../code/) — `proto4.html` (autonome, rendu
via **three.js**, aucun CSS/JS externe au projet).
**Version en production :** `proto4.html` à la racine du site.

---

## Intention

Explorer une question de représentation : **comment donner à voir, en une seule
image navigable, un calcul long et imbriqué ?** Plutôt qu'une trace linéaire, le
calcul est spatialisé en une tour — chaque étage est une variable, et l'on suit
les valeurs qui montent d'un étage à l'autre.

## Mécanique

Sur le **cas-test public de Catala** (3 personnes à charge, 15 000 € de
ressources → **463,32 €** d'aide), chaque variable du graphe de calcul est un
étage du bâtiment. On peut :

- **ouvrir la boîte** et faire **tourner** la tour ;
- **zoomer** sur un étage, **rechercher** une variable, monter / descendre ;
- consulter le **détail** d'un étage : « la machine » (l'opération), « le suivi
  du calcul » (entrées / sorties tracées, cliquables pour suivre une valeur), et
  l'extrait **Catala** correspondant.

Les valeurs et le code sont tirés du graphe de calcul APL réel — Gesbert,
*L'explication par la paresse*, **JFLA 2025, fig. 8**.

## Statut

**Maquette de test, non finalisée et non soumise au protocole de test
utilisateur.** Elle sert à éprouver une piste de représentation visuelle, pas à
être un outil abouti. Un bandeau le signale explicitement dans l'interface. Elle
est accessible depuis la page d'accueil et la page de présentation.

## Ce qu'elle démontre

Une **direction de recherche** : rendre un calcul complexe *navigable
spatialement* plutôt que lu de bout en bout — à confronter, dans la suite du
travail, aux trois prototypes éprouvés.

## Repères techniques

- **Autonome** : tout le HTML/CSS/JS est dans `proto4.html` ; rendu 3D via
  three.js (CDN). Pas de dépendance aux dossiers `css/` ou `js/` du site.
- **Pas de couche de test** : contrairement aux protos 1-3, aucun protocole ni
  envoi de résultats — un simple bandeau « prototype test » avec retour vers
  l'accueil.
