# Prototype 02 — Le simulateur de vie

**Public :** l'allocataire prospectif (qui anticipe un changement).
**Forme :** un simulateur où l'on glisse des « blocs de vie » sur une frise de
douze mois.
**Geste de design :** déplacer l'explication vers le *futur* — anticiper l'effet
d'un changement avant qu'il n'arrive.

---

## Le problème de départ

Depuis la réforme de la contemporanéisation (2021), l'ALS est **recalculée tous
les trois mois**. L'allocataire ne subit donc plus une décision annuelle stable,
mais une succession de recalculs qu'il ne voit pas venir — et dont chacun peut
produire un trop-perçu rétroactif (l'indu du proto 1). L'explication *après
coup* ne suffit plus : il faudrait pouvoir anticiper.

L'enjeu de conception : faire passer l'explicabilité du registre de la
*justification* (« voici pourquoi on vous demande de rembourser ») à celui de
l'*anticipation* (« voici ce qui se passera si… »). Redonner une prise
prospective là où l'allocataire est habituellement passif.

## La mécanique : des blocs de vie sur une frise

L'outil propose une **palette de blocs de changement de vie** — déménagement,
reprise d'emploi, naissance, etc. — que l'on **glisse sur une frise de douze
mois**. À mesure qu'on compose son année :

- un **graphique** montre l'évolution prévue de l'ALS, mois par mois ;
- chaque variation du montant **expose la trace du calcul** qui l'explique : quel
  paramètre a bougé, comment il se répercute sur l'aide.

L'utilisateur construit lui-même son scénario et en lit immédiatement la
conséquence. La trace Catala n'est plus seulement lue : elle est **manipulée**,
rejouée pour des situations qui n'ont pas encore eu lieu.

## Le scénario éprouvé

L'utilisateur incarne **Marie D.**, 32 ans, à mi-temps pour 1 650 € net, qui
touche 199 € d'ALS et vient de recevoir une notification de dette. Deux
changements se profilent :

- **mai 2026** — un déménagement dans un T2 à 650 € (toujours en zone 2), pour
  préparer l'arrivée éventuelle d'un enfant ;
- **septembre 2026** — un passage à temps plein, portant le salaire à 2 000 €
  net.

Sa préoccupation : **ces changements vont-ils déclencher un nouvel indu ?** Son
ALS va-t-elle monter ou baisser ? Aura-t-elle les moyens du nouveau loyer ?
L'utilisateur formule d'abord son intuition (« le déménagement ou le temps
plein, qu'est-ce qui pèse le plus ? »), puis se sert du simulateur pour la
confronter au calcul réel.

## Ce qu'il démontre

Que la trace Catala peut alimenter un outil **prospectif et interactif**, et pas
seulement justificatif. L'explicabilité devient alors un instrument de
**contrôle de sa propre situation** : comprendre, ce n'est plus seulement
encaisser une décision passée, c'est pouvoir tester ses choix à venir et éviter
le prochain indu.
