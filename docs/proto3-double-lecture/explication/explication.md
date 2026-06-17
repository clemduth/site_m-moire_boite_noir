# Prototype 03 — La double lecture

**Public :** le juriste (avocat, juriste associatif) qui prépare un recours.
**Forme :** une extension de navigateur fictive greffée sur les pages Légifrance.
**Geste de design :** convertir la transparence en *moyen de droit*.

---

## Le problème de départ

C'est le besoin le plus exigeant des trois. Le juriste n'a pas besoin de
pédagogie : il a besoin de **fonder un moyen de droit** sur le calcul. Pour
contester une décision, il lui faut la règle exacte, sa source législative
précise, et surtout une **trace d'exécution pour le cas réel** — afin de
repérer où, concrètement, l'algorithme s'est écarté de la loi.

Aujourd'hui, ces éléments sont dispersés : le texte est sur Légifrance, le calcul
est dans un logiciel fermé (CRISTAL), et rien ne permet de confronter l'un à
l'autre pour un dossier donné. L'enjeu de conception : réunir le **texte de loi**
et le **calcul appliqué** au même endroit, et rendre l'écart visible.

## La mécanique : une extension sur Légifrance

Sur une page **Légifrance** reproduite (avec le Système de Design de l'État, pour
la crédibilité du contexte), une extension fictive vient greffer une seconde
lecture de l'article : sa **traduction Catala exécutable**. L'outil s'organise en
**trois onglets** :

- **Lecture** — l'article de loi et sa traduction Catala mises en regard : on
  voit comment le texte devient calcul.
- **Génération** — la production des éléments d'instruction pour le dossier (la
  matière argumentaire).
- **Projet** — l'espace de travail où s'instruit le dossier en cours.

Le point clé est la **trace appliquée au cas réel** : elle met en évidence, par
exemple, une **exception légale qui aurait dû s'appliquer mais ne l'a pas**.
C'est précisément ce type d'écart qui devient le *moyen* du recours — l'argument
juridique fondé sur le calcul lui-même.

## Le scénario éprouvé

L'utilisateur incarne **Maître Léa Bernard**, avocate en droit social au barreau
de Lyon, mandatée par **Marie D.** pour préparer un **recours amiable devant la
CRA** (Commission de Recours Amiable) de la CAF du Rhône. Le délai légal est de
**deux mois** à compter de la notification, soit jusqu'au 15 mars 2026.

Avant d'ouvrir l'outil, deux questions de cadrage mesurent sa pratique actuelle
(« comment instruiriez-vous ce dossier *sans* l'outil ? quelles sources ? ») —
de façon à mesurer ce que l'extension change concrètement. Sa mission : comprendre
comment le montant a été calculé, vérifier la conformité de la procédure,
identifier les points contestables, et préparer l'argumentation du recours.

## Ce qu'il démontre

Que la transparence outillée se convertit en **capacité d'action juridique** : la
même trace Catala, lue par un professionnel, devient un instrument d'instruction
et de contestation. C'est l'expression la plus directe de l'enjeu démocratique du
mémoire — un algorithme public est un acte administratif, donc contestable, à
condition de disposer des moyens de le contester.
