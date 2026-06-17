# Les boîtes noires — résumé global

Mémoire DSAA design **« Les boîtes noires »** — Clément Duterlay, 2026.
École Supérieure de Design de Villefontaine, en collaboration avec l'équipe
**Inria Prosecco** (projet Catala).

> *« Comment rendre transparent les boîtes noires. »* Une recherche par le design
> sur la transparence des algorithmes publics, à travers le cas du calcul des
> aides au logement (APL / ALS) par la CAF.

---

## Le propos

Les algorithmes publics sont des **actes administratifs** : ils exécutent le
droit et produisent un effet juridique sur les personnes. Le droit à
l'explication existe (loi de 1978, CRPA 2016, RGPD 2018) mais reste, dans les
faits, rarement praticable. Sur les ~120 algorithmes inventoriés par l'ODAP, 24
sont soumis à l'obligation de transparence et **6 seulement** y sont conformes.

Le mémoire distingue deux notions souvent confondues :

- **Transparence** — rendre le code / les règles *accessibles*.
- **Intelligibilité** — faire en sorte que ce qui est accessible soit réellement
  *lisible et utilisable* par quelqu'un.

C'est dans cet écart que se loge le travail de design.

## La proposition : l'explicabilité adaptative

**Une même source technique, plusieurs lectures selon qui s'en saisit.**

La source commune est la **trace d'exécution Catala** du calcul des aides au
logement. Catala (langage d'Inria Prosecco) transcrit le droit en programme
exécutable et exhaustivement traçable, en rattachant chaque règle à son article
source. Cette trace n'est jamais montrée brute à l'usager : elle est *mise en
forme* différemment selon le public.

Les quatre prototypes éprouvent cette proposition, chacun pour un usage et un
public distincts.

## Les quatre prototypes

Un même personnage relie les scénarios : **Marie D.**, locataire d'un T1 à Lyon,
qui reçoit une notification de dette d'ALS de **420 €** (15 janvier 2026) ; son
droit recalculé passe à **199 €/mois**.

| # | Titre | Public | Geste de design | Statut |
|---|-------|--------|-----------------|--------|
| [01](proto1-decision-depliable/explication/) | La décision dépliable | L'allocataire | Expliquer une décision *déjà tombée*, couche par couche | Testé |
| [02](proto2-simulateur-de-vie/explication/) | Le simulateur de vie | L'allocataire prospectif | Déplacer l'explication vers le *futur* : anticiper | Testé |
| [03](proto3-double-lecture/explication/) | La double lecture | Le juriste | Convertir la transparence en *moyen de droit* | Testé |
| [04](proto4-tour-de-calcul/explication/) | La tour de calcul | Exploration visuelle | Spatialiser un calcul complexe pour le rendre *navigable* | Test, non finalisé |

## Organisation de cette documentation

```
docs/
├── 00-resume-global.md          ← vous êtes ici
├── proto1-decision-depliable/
│   ├── code/                    le code du prototype
│   └── explication/             fiche de conception détaillée
├── proto2-simulateur-de-vie/    (même structure)
├── proto3-double-lecture/       (même structure)
└── proto4-tour-de-calcul/       (même structure)
```

Chaque dossier `protoN/` contient **le code du prototype** (`code/`) et **une
explication de conception** (`explication/`).

---

*Document de conception — à compléter au fil des tests et de la rédaction du mémoire.*
