// ============================================================================
// ARTICLES_DATA — base de connaissance des articles affichables
// ============================================================================
const ARTICLES_DATA = {
  'L823-1': {
    breadcrumb: 'Article L823-1',
    book: 'Livre VIII', title: 'Titre II',
    abrogated: false,
    tagText: 'Code de la construction et de l\'habitation',
    titleHtml: 'Article L823-1',
    meta: 'Modifié par <a href="#">Ordonnance n°2019-770 du 17 juillet 2019 - art. 2 (V)</a><br>Créé par <a href="#">Ordonnance n°2019-770 du 17 juillet 2019 - art. 2 (V)</a><br><em>En vigueur depuis le 1<sup>er</sup> septembre 2019.</em>',
    body: `
      <p>Le montant de l'aide personnelle au logement est calculé en fonction d'un barème défini par voie réglementaire.</p>
      <p>Ce barème est établi en prenant en considération :</p>
      <ol>
        <li>La situation de famille du demandeur de l'aide et le nombre de personnes à charge vivant habituellement à son foyer ;</li>
        <li class="detected" id="detected-alinea" data-alinea="2">
          <div class="detected-badge">Calcul détecté</div>
          Les ressources du demandeur et, le cas échéant, de son conjoint et des personnes vivant habituellement à son foyer ainsi que la valeur en capital de leur patrimoine, lorsque celui-ci ne produit pas de revenus imposables, appréciée dans les conditions prévues à l'article L. 822-5 ;
          <div class="detection-tooltip" id="detection-tt">
            <span style="font-family:monospace;font-weight:700;">{ }</span>
            Voir le calcul Catala
          </div>
        </li>
        <li>Le montant du loyer payé, pris en compte dans la limite d'un plafond, ainsi que les charges, retenues forfaitairement, ou les mensualités d'emprunt contracté pour l'accession à la propriété du logement.</li>
      </ol>
      <p>Le barème est révisé chaque année au 1<sup>er</sup> octobre dans les conditions prévues à l'article L. 823-4.</p>
    `,
    related: [
      'Code de la construction - art. L822-5',
      'Code de la construction - art. L823-2',
      'Code de la construction - art. L823-4'
    ],
    catala: {
      extSubtitle: 'Article L823-1 · alinéa 2°',
      lecture: {
        intro: "L'alinéa 2° définit le calcul des <strong>ressources</strong> entrant dans le barème APL, en y intégrant la valeur du patrimoine non productif de revenus.",
        codeCatala: `<span class="kw">declaration scope</span>
  <span class="var">CalculRessources</span>:
  <span class="kw">input</span> revenus_demandeur
  <span class="kw">input</span> revenus_conjoint
  <span class="kw">input</span> revenus_foyer
  <span class="kw">input</span> patrimoine_non_productif
  <span class="kw">output</span> ressources_nettes

<span class="kw">scope</span> <span class="var">CalculRessources</span>:
  <span class="kw">definition</span> revenus_patrimoine
    <span class="kw">equals</span> patrimoine_non_productif * <span class="num">0,03</span>

  <span class="kw">definition</span> ressources_nettes
    <span class="kw">equals</span>
    revenus_demandeur
    + revenus_conjoint
    + revenus_foyer
    + revenus_patrimoine`,
        formulaInline: '<strong>R</strong> = R<sub>dem</sub> + R<sub>conj</sub> + R<sub>foyer</sub> + 0,03 × P',
        formulaNote: 'avec P = valeur du patrimoine non productif de revenus imposables (article L. 822-5).',
        exampleRows: [
          { label: 'R<sub>dem</sub>', value: '18 400 €' },
          { label: 'R<sub>conj</sub>', value: '14 200 €' },
          { label: 'R<sub>foyer</sub>', value: '0 €' },
          { label: 'P (patrimoine)', value: '12 000 €' },
          { label: 'Revenus patrimoine', value: '+ 360 €' }
        ],
        result: '32 960 €',
        whyTag: '? Pourquoi cette règle existe',
        whyTitle: 'Le passage par l\'ordonnance de 2019',
        whyText: `
          <p>L'ordonnance 2019-770 a récrit l'article et intégré explicitement la <strong>valeur en capital du patrimoine</strong> non productif de revenus. Avant 2019, ce point n'était pas dans la loi mais dans le décret d'application.</p>
          <p>Le taux de conversion (3% par défaut) est fixé par l'article R. 822-7 du CCH.</p>
          <div class="why-fact"><strong>À retenir :</strong> un patrimoine immobilier ou financier non productif de revenus imposés (ex. compte courant) entre dans l'assiette même s'il ne génère pas de revenu réel.</div>
          <div class="why-source">Ordonnance n°2019-770 du 17 juillet 2019 · article R. 822-7 CCH.</div>
        `,
        source: 'Source : Inria Prosecco · projet Catala · transcription par M. Alauzen, D. Merigoux et al. (2024)'
      },
      params: ['revenus_demandeur', 'revenus_conjoint', 'revenus_foyer', 'patrimoine_non_productif']
    }
  },

  'L823-2': {
    breadcrumb: 'Article L823-2',
    book: 'Livre VIII', title: 'Titre II',
    abrogated: false,
    tagText: 'Code de la construction et de l\'habitation',
    titleHtml: 'Article L823-2',
    meta: 'Modifié par <a href="#">Ordonnance n°2019-770 du 17 juillet 2019 - art. 2 (V)</a><br>Créé par <a href="#">Ordonnance n°2019-770 du 17 juillet 2019 - art. 2 (V)</a><br><em>En vigueur depuis le 1<sup>er</sup> septembre 2019.</em>',
    body: `
      <p>L'enfant en résidence alternée au domicile de chacun de ses parents en application d'une décision de justice ou d'une convention homologuée par le juge peut être, sur demande conjointe des parents, regardé comme à la charge de l'un et de l'autre pour la détermination de l'aide personnelle au logement.</p>
      <p class="detected" id="detected-alinea" data-alinea="2">
        <span class="detected-badge">Calcul détecté</span>
        Dans ce cas, le montant de l'aide est calculé selon une répartition entre les parents définie par voie réglementaire.
        <span class="detection-tooltip" id="detection-tt">
          <span style="font-family:monospace;font-weight:700;">{ }</span>
          Voir le calcul Catala
        </span>
      </p>
    `,
    related: [
      'Code de la construction - art. L823-1',
      'Code de la construction - art. R823-1'
    ],
    catala: {
      extSubtitle: 'Article L823-2 · résidence alternée',
      lecture: {
        intro: "L'article L823-2 définit le <strong>partage de la charge enfant</strong> lorsque l'enfant est en résidence alternée. La répartition par défaut est 50/50 si les deux parents en font la demande conjointe.",
        codeCatala: `<span class="kw">declaration scope</span>
  <span class="var">PartageEnfant</span>:
  <span class="kw">input</span> residence_alternee: <span class="kw">boolean</span>
  <span class="kw">input</span> demande_conjointe: <span class="kw">boolean</span>
  <span class="kw">output</span> part_enfant

<span class="kw">scope</span> <span class="var">PartageEnfant</span>:
  <span class="kw">definition</span> part_enfant
    <span class="kw">equals</span>
    <span class="kw">if</span> residence_alternee
    <span class="kw">and</span> demande_conjointe
    <span class="kw">then</span> <span class="num">0,5</span>
    <span class="kw">else</span> <span class="num">1</span>`,
        formulaInline: '<strong>part_enfant</strong> = 0,5 si résidence alternée + demande conjointe, sinon 1',
        formulaNote: 'La part s\'applique ensuite au coefficient enfant du barème APL.',
        exampleRows: [
          { label: 'Résidence alternée', value: 'oui' },
          { label: 'Demande conjointe', value: 'oui' }
        ],
        result: '0,5',
        whyTag: '? Pourquoi cette règle existe',
        whyTitle: 'Une réponse au contentieux des familles séparées',
        whyText: `
          <p>Avant 2019, les CAF refusaient majoritairement la double prise en compte de l'enfant en résidence alternée. Le contentieux était abondant.</p>
          <p>La codification de la répartition 50/50 dans la loi consolide une jurisprudence établie progressivement par le Conseil d'État (CE, 21 juillet 2017, n°398563).</p>
          <div class="why-fact"><strong>À retenir :</strong> la demande doit être <strong>conjointe</strong>. Si un seul parent en fait la demande, c'est lui qui se voit attribuer l'enfant pour le calcul.</div>
          <div class="why-source">Ordonnance 2019-770 · CE 21 juillet 2017 n°398563.</div>
        `,
        source: 'Source : Inria Prosecco · projet Catala · transcription par M. Alauzen, D. Merigoux et al. (2024)'
      },
      params: ['residence_alternee', 'demande_conjointe']
    }
  },

  'L823-3': {
    breadcrumb: 'Article L823-3',
    book: 'Livre VIII', title: 'Titre II',
    abrogated: false,
    tagText: 'Code de la construction et de l\'habitation',
    titleHtml: 'Article L823-3',
    meta: 'Créé par <a href="#">Ordonnance n°2019-770 du 17 juillet 2019 - art. 2 (V)</a><br><em>En vigueur depuis le 1<sup>er</sup> septembre 2019.</em>',
    body: `
      <p>Sont également assimilés à des dépenses de loyer pour le calcul de l'aide personnelle au logement :</p>
      <ol>
        <li>La redevance payée par les occupants d'un logement-foyer pour la part représentative des frais de logement ;</li>
        <li>La redevance d'occupation payée par les occupants précaires d'un logement vacant appartenant aux administrations publiques ;</li>
        <li>Les sommes versées par les sous-locataires d'un organisme d'habitations à loyer modéré dans les conditions prévues à l'article L. 442-8-3 ;</li>
        <li>Les frais d'hébergement versés par les personnes âgées ou handicapées hébergées dans les conditions prévues à l'article L. 313-12 du code de l'action sociale et des familles.</li>
      </ol>
      <p><em>Cet article ne contient pas de calcul exécutable : il énumère des catégories de dépenses assimilées au loyer.</em></p>
    `,
    related: [
      'Code de la construction - art. L442-8-3',
      'Code de l\'action sociale - art. L313-12'
    ],
    catala: null
  },

  'L823-4': {
    breadcrumb: 'Article L823-4',
    book: 'Livre VIII', title: 'Titre II',
    abrogated: false,
    tagText: 'Code de la construction et de l\'habitation',
    titleHtml: 'Article L823-4',
    meta: 'Modifié par <a href="#">LOI n°2022-1158 du 16 août 2022 - art. 7</a><br>Créé par <a href="#">Ordonnance n°2019-770 du 17 juillet 2019 - art. 2 (V)</a>',
    body: `
      <p class="detected" id="detected-alinea" data-alinea="1">
        <span class="detected-badge">Calcul détecté</span>
        Le barème mentionné à l'article L. 823-1 est révisé chaque année au 1<sup>er</sup> octobre. Cette révision tient compte de l'évolution de l'indice de référence des loyers définie au I de l'article 17-1 de la loi n° 89-462 du 6 juillet 1989 tendant à améliorer les rapports locatifs.
        <span class="detection-tooltip" id="detection-tt">
          <span style="font-family:monospace;font-weight:700;">{ }</span>
          Voir le calcul Catala
        </span>
      </p>
      <p>Les paramètres mentionnés au 3° de l'article L. 823-1 sont fixés par arrêté conjoint du ministre chargé du logement et du ministre chargé du budget.</p>
    `,
    related: [
      'Code de la construction - art. L823-1',
      'Loi n°89-462 du 6 juillet 1989 - art. 17-1'
    ],
    catala: {
      extSubtitle: 'Article L823-4 · révision annuelle',
      lecture: {
        intro: "L'article L823-4 lie la <strong>révision annuelle</strong> du barème APL à l'évolution de l'IRL (indice de référence des loyers). La loi du 16 août 2022 (pouvoir d'achat) a renforcé ce lien.",
        codeCatala: `<span class="kw">declaration scope</span>
  <span class="var">RevisionBareme</span>:
  <span class="kw">input</span> bareme_n_moins_1
  <span class="kw">input</span> irl_t2
  <span class="kw">input</span> irl_t2_n_moins_1
  <span class="kw">output</span> bareme_n

<span class="kw">scope</span> <span class="var">RevisionBareme</span>:
  <span class="kw">definition</span> coefficient_irl
    <span class="kw">equals</span> irl_t2 / irl_t2_n_moins_1

  <span class="kw">definition</span> bareme_n
    <span class="kw">equals</span> bareme_n_moins_1 * coefficient_irl`,
        formulaInline: '<strong>B<sub>n</sub></strong> = B<sub>n-1</sub> × (IRL<sub>T2</sub> / IRL<sub>T2 n-1</sub>)',
        formulaNote: 'L\'IRL T2 est l\'indice de référence des loyers du 2<sup>e</sup> trimestre publié par l\'INSEE.',
        exampleRows: [
          { label: 'B<sub>n-1</sub>', value: '1 213 €' },
          { label: 'IRL T2 2024', value: '143,46' },
          { label: 'IRL T2 2023', value: '141,17' },
          { label: 'Coefficient', value: '× 1,0162' }
        ],
        result: '1 233 €',
        whyTag: '? Pourquoi cette règle existe',
        whyTitle: 'L\'IRL comme garde-fou contre le décrochage',
        whyText: `
          <p>Historiquement, le barème APL pouvait être gelé ou sous-revalorisé par mesure budgétaire. Cela créait un écart croissant entre les loyers réels et le barème — le fameux <strong>décrochage</strong>.</p>
          <p>La loi pouvoir d'achat de 2022 a renforcé le lien entre la révision et l'IRL pour limiter ce décalage, dans un contexte d'inflation.</p>
          <div class="why-fact"><strong>À retenir :</strong> la révision est mécanique sur le papier, mais des décrets peuvent toujours moduler le coefficient à la baisse — et ils l'ont fait par le passé.</div>
          <div class="why-source">Loi n°2022-1158 du 16 août 2022 · INSEE · IRL trimestriel.</div>
        `,
        source: 'Source : Inria Prosecco · projet Catala · transcription par M. Alauzen, D. Merigoux et al. (2024)'
      },
      params: ['bareme_n_moins_1', 'irl_t2_courant', 'irl_t2_anterieur']
    }
  },

  'L351-3': {
    breadcrumb: 'Article L351-3',
    book: 'Livre III', title: 'Titre V',
    abrogated: true,
    tagText: 'Code de la construction et de l\'habitation — partie historique',
    titleHtml: 'Article L351-3 <span class="abrogated">(abrogé)</span>',
    meta: 'Abrogé par <a href="#">Ordonnance n°2019-770 du 17 juillet 2019 - art. 2 (VD)</a><br>Modifié par <a href="#">LOI n°2018-1203 du 22 décembre 2018 - art. 78 (V)</a><br><em>Article abrogé au 1<sup>er</sup> septembre 2019, remplacé par L823-1.</em>',
    body: `
      <p>Le montant de l'aide personnalisée au logement est calculé en fonction d'un barème défini par voie réglementaire.</p>
      <p>Ce barème est établi en prenant en considération :</p>
      <ol>
        <li>La situation de famille du demandeur de l'aide occupant le logement et le nombre de personnes à charge vivant habituellement au foyer ;</li>
        <li class="detected" id="detected-alinea" data-alinea="2">
          <div class="detected-badge">Calcul détecté</div>
          Les ressources du demandeur et, s'il y a lieu, de son conjoint et des personnes vivant habituellement à son foyer ; toutefois un abattement est opéré sur le montant des ressources, lorsque le conjoint perçoit des revenus résultant de l'exercice d'une activité professionnelle ;
          <div class="detection-tooltip" id="detection-tt">
            <span style="font-family:monospace;font-weight:700;">{ }</span>
            Voir le calcul Catala
          </div>
        </li>
        <li>Le montant du loyer ou des charges de remboursement des prêts contractés pour l'acquisition du logement ou son amélioration, pris en compte dans la limite d'un plafond, ainsi que les dépenses accessoires retenues forfaitairement.</li>
      </ol>
      <p>Le barème, révisé le 1<sup>er</sup> juillet de chaque année, tient compte de l'évolution constatée des prix de détail et du coût de la construction.</p>
    `,
    related: [
      'Code de la sécurité sociale - art. L542-1',
      'Code de la construction - art. R351-1',
      'Code de la construction - art. R351-7'
    ],
    catala: {
      extSubtitle: 'Article L351-3 · alinéa 2° (abrogé)',
      lecture: {
        intro: "L'alinéa 2° définit l'<strong>abattement</strong> sur les ressources lorsque le conjoint exerce une activité professionnelle. Cette logique était celle de la loi de 1977 créant l'APL.",
        codeCatala: `<span class="kw">declaration scope</span>
  <span class="var">CalculRessources</span>:
  <span class="kw">input</span> revenus_demandeur
  <span class="kw">input</span> revenus_conjoint
  <span class="kw">input</span> revenus_foyer
  <span class="kw">input</span> conjoint_actif: <span class="kw">boolean</span>
  <span class="kw">output</span> ressources_nettes

<span class="kw">scope</span> <span class="var">CalculRessources</span>:
  <span class="kw">definition</span>
    abattement <span class="kw">equals</span>
    <span class="kw">if</span> conjoint_actif
    <span class="kw">then</span> <span class="num">5712</span>€
    <span class="kw">else</span> <span class="num">0</span>€

  <span class="kw">definition</span> ressources_nettes
    <span class="kw">equals</span>
    revenus_demandeur
    + revenus_conjoint
    + revenus_foyer
    - abattement`,
        formulaInline: '<strong>R</strong> = R<sub>dem</sub> + R<sub>conj</sub> + R<sub>foyer</sub> − A',
        formulaNote: 'avec A = 5 712 € si le conjoint exerce une activité professionnelle, sinon A = 0',
        exampleRows: [
          { label: 'R<sub>dem</sub>', value: '18 400 €' },
          { label: 'R<sub>conj</sub>', value: '14 200 €' },
          { label: 'R<sub>foyer</sub>', value: '0 €' },
          { label: 'A (abattement)', value: '−5 712 €' }
        ],
        result: '26 888 €',
        whyTag: '? Pourquoi cette règle existait',
        whyTitle: 'Une logique d\'incitation à l\'activité du conjoint',
        whyText: `
          <p>L'abattement forfaitaire de 5 712 € visait à ne pas pénaliser les couples où le conjoint travaille — logique d'incitation à l'activité typique des années 1970.</p>
          <p>L'ordonnance de 2019 a supprimé cet abattement et intégré la prise en compte du patrimoine non productif, reflétant une autre vision de la solidarité.</p>
          <div class="why-fact"><strong>À retenir :</strong> cet article reste utile pour comprendre les <strong>dossiers antérieurs à septembre 2019</strong>, encore présents dans le contentieux.</div>
          <div class="why-source">Loi n°77-1 du 3 janvier 1977 · abrogé par Ordonnance 2019-770.</div>
        `,
        source: 'Source : Inria Prosecco · projet Catala · transcription par M. Alauzen, D. Merigoux et al. (2024)'
      },
      params: ['revenus_demandeur', 'revenus_conjoint', 'revenus_foyer', 'conjoint_actif', 'abattement']
    }
  }
};

const PARAM_DATA = {
  revenus_demandeur:        { label: 'Revenus du demandeur',         defaultVal: '18400', unit: '€', type: 'number' },
  revenus_conjoint:         { label: 'Revenus du conjoint',          defaultVal: '14200', unit: '€', type: 'number' },
  revenus_foyer:            { label: 'Autres revenus du foyer',      defaultVal: '0',     unit: '€', type: 'number' },
  conjoint_actif:           { label: 'Conjoint actif',               defaultVal: 'oui',   unit: '',  type: 'bool' },
  abattement:               { label: 'Abattement',                   defaultVal: '5712',  unit: '€', type: 'number' },
  patrimoine_non_productif: { label: 'Patrimoine non productif',     defaultVal: '12000', unit: '€', type: 'number' },
  residence_alternee:       { label: 'Résidence alternée',            defaultVal: 'oui',   unit: '',  type: 'bool' },
  demande_conjointe:        { label: 'Demande conjointe',            defaultVal: 'oui',   unit: '',  type: 'bool' },
  bareme_n_moins_1:         { label: 'Barème année n-1',              defaultVal: '1213',  unit: '€', type: 'number' },
  irl_t2_courant:           { label: 'IRL T2 courant',               defaultVal: '143.46',unit: '',  type: 'number' },
  irl_t2_anterieur:         { label: 'IRL T2 année n-1',              defaultVal: '141.17',unit: '',  type: 'number' }
};

// ============================================================================
// État global de l'extension
// ============================================================================
let CURRENT_ARTICLE = 'L823-1';
const generatedBlocks = {};
const pinnedBlocks = {};
let assembledIds = [];

// ============ ouverture / fermeture du panel ============
const panel = document.getElementById('ext-panel');
const extIcon = document.getElementById('ext-icon');
const extClose = document.getElementById('ext-close');

function openPanel(section) {
  panel.classList.add('open');
  if (section) switchSection(section);
}
function closePanel() { panel.classList.remove('open'); }

extIcon.addEventListener('click', () => openPanel('lecture'));
extClose.addEventListener('click', closePanel);

// ============ tabs ============
const tabs = document.querySelectorAll('.ext-tab');
const sections = document.querySelectorAll('.ext-section');

function switchSection(name) {
  tabs.forEach(t => t.classList.toggle('active', t.dataset.section === name));
  sections.forEach(s => s.classList.toggle('active', s.dataset.section === name));
}
tabs.forEach(t => t.addEventListener('click', () => switchSection(t.dataset.section)));

// ============================================================================
// renderArticle — affiche un article entier (légifrance + extension)
// ============================================================================
function renderArticle(key) {
  const data = ARTICLES_DATA[key];
  if (!data) return;
  CURRENT_ARTICLE = key;

  // breadcrumb
  const bc = document.getElementById('breadcrumb-article');
  if (bc) bc.textContent = data.breadcrumb;

  // sidebar : marquer le current
  document.querySelectorAll('.article-link').forEach(link => {
    link.classList.toggle('current', link.dataset.article === key);
  });

  // article container
  const ac = document.getElementById('article-container');
  if (ac) {
    ac.innerHTML = `
      <div class="article-header">
        <span class="article-tag">${data.tagText}</span>
        <h1 class="article-title">${data.titleHtml}</h1>
        <div class="article-meta">${data.meta}</div>
        <div class="article-actions">
          <button>Versions</button>
          <button>Modifications</button>
          <button>Cite</button>
          <button>Cité par</button>
        </div>
      </div>
      <div class="article-body">${data.body}</div>
      <div class="related">
        <h3>Liens relatifs à cet article</h3>
        <ul>${data.related.map(r => `<li><a href="#">${r}</a></li>`).join('')}</ul>
      </div>
    `;
  }

  // ext-subtitle
  const sub = document.getElementById('ext-subtitle');
  if (sub) sub.textContent = data.catala ? data.catala.extSubtitle : `${data.breadcrumb} · pas de calcul`;

  // re-bind detection click si présent
  const detected = document.getElementById('detected-alinea');
  const detectionTT = document.getElementById('detection-tt');
  if (detected) detected.addEventListener('click', () => openPanel('lecture'));
  if (detectionTT) detectionTT.addEventListener('click', e => { e.stopPropagation(); openPanel('lecture'); });

  // lecture section
  renderLectureSection(data);

  // param chips
  renderParamChips(data);

  // si pas de Catala : on grise les onglets générer/projet
  document.querySelectorAll('.ext-tab').forEach(t => {
    if (t.dataset.section === 'generation' || t.dataset.section === 'projet') {
      t.classList.toggle('is-disabled', !data.catala);
    }
  });
}

function renderLectureSection(data) {
  const section = document.getElementById('lecture-section');
  if (!section) return;
  if (!data.catala) {
    section.innerHTML = `
      <div style="padding:20px;background:var(--grey-50);border-radius:4px;color:var(--grey-700);font-size:12px;line-height:1.5;">
        <strong>Pas de calcul Catala disponible pour cet article.</strong><br><br>
        Cet article énumère des catégories ou des définitions, mais ne contient pas d'algorithme exécutable. Allez sur un article marqué du symbole <code>{ }</code> dans le plan du code.
      </div>
    `;
    return;
  }
  const L = data.catala.lecture;
  section.innerHTML = `
    <p style="font-size:12px;color:var(--grey-700);margin-bottom:14px;line-height:1.5;">${L.intro}</p>

    <div class="code-formula">
      <div class="code-block">
        <span class="block-label">Catala</span>
<pre>${L.codeCatala}</pre>
      </div>
      <div class="formula-block">
        <span class="block-label">Calcul</span>
        <div class="formula-line">${L.formulaInline}</div>
        <div class="formula-line" style="font-size:11px;color:var(--grey-700);margin-top:6px;">${L.formulaNote}</div>
        <div style="margin-top:10px;">
          ${L.exampleRows.map(r => `<div class="example-row"><span class="label">${r.label}</span><span class="value">${r.value}</span></div>`).join('')}
        </div>
        <div class="result">${L.result}</div>
      </div>
    </div>

    <div class="why-block">
      <div class="why-tag">${L.whyTag}</div>
      <div class="why-title">${L.whyTitle}</div>
      ${L.whyText}
    </div>

    <div style="font-size:11px;color:var(--grey-500);font-style:italic;background:var(--grey-50);padding:8px;border-radius:4px;">
      ${L.source}
    </div>
  `;
}

function renderParamChips(data) {
  const list = document.getElementById('params-list');
  if (!list) return;
  list.innerHTML = '<div class="label">Paramètres détectés</div>';
  if (!data.catala) {
    list.innerHTML += '<div style="font-size:11px;color:var(--grey-500);font-style:italic;">Aucun paramètre exécutable pour cet article.</div>';
    return;
  }
  data.catala.params.forEach(p => {
    const meta = PARAM_DATA[p] || { label: p };
    const chip = document.createElement('span');
    chip.className = 'param-chip';
    chip.dataset.param = p;
    chip.innerHTML = `<span class="icon">+</span> ${meta.label}`;
    if (generatedBlocks[p]) {
      chip.classList.add('added');
      chip.querySelector('.icon').textContent = '✓';
    }
    chip.addEventListener('click', () => {
      if (chip.classList.contains('added')) return;
      chip.classList.add('added');
      chip.querySelector('.icon').textContent = '✓';
      generateBlock(p);
    });
    list.appendChild(chip);
  });
}

// ============================================================================
// génération de blocs (onglet 2)
// ============================================================================
function getParamData(paramKey) {
  const meta = PARAM_DATA[paramKey] || { label: paramKey, defaultVal: '', unit: '', type: 'number' };
  const articleData = ARTICLES_DATA[CURRENT_ARTICLE];
  return {
    ...meta,
    source: articleData ? articleData.breadcrumb : 'Article inconnu',
    articleKey: CURRENT_ARTICLE
  };
}

function generateBlock(paramKey) {
  const data = getParamData(paramKey);
  const container = document.getElementById('generated-blocks');
  const id = 'block-' + paramKey;
  generatedBlocks[paramKey] = { ...data, value: data.defaultVal };

  const blockEl = document.createElement('div');
  blockEl.className = 'scratch-block';
  blockEl.id = id;
  blockEl.innerHTML = `
    <div class="block-title">
      <span style="font-family:monospace;">{ }</span>
      ${data.label}
    </div>
    <div class="block-source">extrait de ${data.source}</div>
    <div class="block-input">
      <span>=</span>
      <input type="text" value="${data.defaultVal}" data-param="${paramKey}">
      <span style="color:var(--grey-500);font-size:11px;">${data.unit}</span>
    </div>
    <button class="pin-btn" data-param="${paramKey}">📌 Épingler dans le projet</button>
  `;
  container.appendChild(blockEl);

  blockEl.querySelector('input').addEventListener('input', (e) => {
    generatedBlocks[paramKey].value = e.target.value;
    if (pinnedBlocks[paramKey]) {
      pinnedBlocks[paramKey].value = e.target.value;
      renderPinned();
      recompute();
    }
  });

  blockEl.querySelector('.pin-btn').addEventListener('click', (e) => {
    const btn = e.currentTarget;
    if (btn.classList.contains('pinned')) return;
    btn.classList.add('pinned');
    btn.textContent = '✓ Épinglé';
    pinnedBlocks[paramKey] = { ...generatedBlocks[paramKey] };
    renderPinned();
    updateProjectBadge();
    setTimeout(() => switchSection('projet'), 350);
  });
}

// ============================================================================
// projet — épinglés + assemblage avec drag-drop amélioré
// ============================================================================
function updateProjectBadge() {
  const badge = document.getElementById('tab-badge-projet');
  if (!badge) return;
  const total = Object.keys(pinnedBlocks).length;
  if (total > 0) {
    badge.textContent = total;
    badge.style.display = '';
  } else {
    badge.style.display = 'none';
  }
}

function renderPinned() {
  const container = document.getElementById('pinned-blocks');
  if (!container) return;
  const keys = Object.keys(pinnedBlocks).filter(k => !assembledIds.includes(k));
  if (Object.keys(pinnedBlocks).length === 0) {
    container.innerHTML = '<div class="pinned-empty">Aucun bloc épinglé. Allez dans <strong>Générer</strong> pour en créer.</div>';
    return;
  }
  if (keys.length === 0) {
    container.innerHTML = '<div class="pinned-empty">Tous vos blocs sont assemblés.</div>';
    return;
  }
  container.innerHTML = '';
  keys.forEach(k => {
    const data = pinnedBlocks[k];
    const el = document.createElement('div');
    el.className = 'mini-block';
    el.draggable = true;
    el.dataset.param = k;
    el.innerHTML = `
      <button class="remove" data-param="${k}" title="Retirer du projet">×</button>
      <div class="name">${data.label}</div>
      <div class="val">${data.value}${data.unit}</div>
      <button class="add-to-chain" data-add="${k}" title="Ajouter dans la zone d'assemblage">+ assembler</button>
    `;

    el.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('text/plain', k);
      e.dataTransfer.effectAllowed = 'move';
      el.classList.add('is-dragging');
      document.getElementById('assemble-area')?.classList.add('drop-target-hint');
    });
    el.addEventListener('dragend', () => {
      el.classList.remove('is-dragging');
      document.getElementById('assemble-area')?.classList.remove('drop-target-hint','is-over');
    });

    el.querySelector('.remove').addEventListener('click', (e) => {
      e.stopPropagation();
      delete pinnedBlocks[k];
      assembledIds = assembledIds.filter(id => id !== k);
      renderPinned();
      renderAssembled();
      recompute();
      updateProjectBadge();
    });

    el.querySelector('.add-to-chain').addEventListener('click', (e) => {
      e.stopPropagation();
      if (!assembledIds.includes(k)) {
        assembledIds.push(k);
        renderAssembled();
        renderPinned();
        recompute();
      }
    });

    container.appendChild(el);
  });
}

function renderAssembled() {
  const chain = document.getElementById('assembled-chain');
  if (!chain) return;
  if (assembledIds.length === 0) {
    chain.innerHTML = '<span class="placeholder">Glissez ici les blocs à combiner (ou utilisez le bouton « + assembler »)</span>';
    return;
  }
  chain.innerHTML = '';
  assembledIds.forEach((k, idx) => {
    const data = pinnedBlocks[k];
    if (!data) return;
    const el = document.createElement('div');
    el.className = 'chain-block';
    el.draggable = true;
    el.dataset.chainParam = k;
    el.dataset.chainIdx = idx;
    el.innerHTML = `
      <span class="chain-grip" aria-hidden="true">⋿</span>
      ${data.label}
      <span class="val">${data.value}${data.unit}</span>
      <button class="chain-remove" data-remove="${k}" title="Retirer de l'assemblage">×</button>
    `;

    // réordonnancement par drag dans la chaîne
    el.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('text/plain', 'reorder:' + k);
      e.dataTransfer.effectAllowed = 'move';
      el.classList.add('is-dragging');
    });
    el.addEventListener('dragend', () => {
      el.classList.remove('is-dragging');
      document.querySelectorAll('.chain-block').forEach(b => b.classList.remove('is-drop-target'));
    });
    el.addEventListener('dragover', (e) => {
      e.preventDefault();
      el.classList.add('is-drop-target');
    });
    el.addEventListener('dragleave', () => {
      el.classList.remove('is-drop-target');
    });
    el.addEventListener('drop', (e) => {
      e.preventDefault();
      el.classList.remove('is-drop-target');
      const raw = e.dataTransfer.getData('text/plain');
      if (raw.startsWith('reorder:')) {
        const draggedKey = raw.slice('reorder:'.length);
        const targetIdx = parseInt(el.dataset.chainIdx);
        const draggedIdx = assembledIds.indexOf(draggedKey);
        if (draggedIdx >= 0 && draggedIdx !== targetIdx) {
          assembledIds.splice(draggedIdx, 1);
          assembledIds.splice(targetIdx, 0, draggedKey);
          renderAssembled();
          recompute();
        }
      }
    });

    el.querySelector('.chain-remove').addEventListener('click', () => {
      assembledIds = assembledIds.filter(id => id !== k);
      renderAssembled();
      renderPinned();
      recompute();
    });
    chain.appendChild(el);
  });
}

const assembleArea = document.getElementById('assemble-area');
if (assembleArea) {
  assembleArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    assembleArea.classList.add('is-over');
  });
  assembleArea.addEventListener('dragleave', (e) => {
    if (!assembleArea.contains(e.relatedTarget)) assembleArea.classList.remove('is-over');
  });
  assembleArea.addEventListener('drop', (e) => {
    e.preventDefault();
    assembleArea.classList.remove('is-over', 'drop-target-hint');
    const raw = e.dataTransfer.getData('text/plain');
    if (raw && !raw.startsWith('reorder:')) {
      const param = raw;
      if (pinnedBlocks[param] && !assembledIds.includes(param)) {
        assembledIds.push(param);
        renderAssembled();
        renderPinned();
        recompute();
      }
    }
  });
}

function recompute() {
  const result = document.getElementById('compute-result');
  if (!result) return;
  if (assembledIds.length === 0) {
    result.style.display = 'none';
    return;
  }
  result.style.display = 'block';

  // calcul générique : on parcourt les blocs assemblés dans l'ordre,
  // on additionne les numériques, et on gère les spécificités par article.
  let total = 0;
  const parts = [];
  assembledIds.forEach((k, i) => {
    const data = pinnedBlocks[k];
    if (!data) return;
    const meta = PARAM_DATA[k] || {};
    const numVal = parseFloat(String(data.value).replace(',', '.')) || 0;
    if (meta.type === 'bool') {
      const isYes = String(data.value || '').toLowerCase().startsWith('o');
      parts.push(`${data.label} = ${isYes ? 'oui' : 'non'}`);
      // pour L351-3 : si abattement & conjoint_actif assemblés, on soustrait
      if (CURRENT_ARTICLE === 'L351-3' && k === 'conjoint_actif' && !isYes) {
        // on retire l'abattement s'il avait été ajouté
        if (assembledIds.includes('abattement')) {
          const abVal = parseFloat(String(pinnedBlocks.abattement?.value || 0).replace(',', '.')) || 0;
          total += abVal;
        }
      }
    } else {
      // spécificités
      if (CURRENT_ARTICLE === 'L823-1' && k === 'patrimoine_non_productif') {
        const rev = numVal * 0.03;
        total += rev;
        parts.push((i === 0 ? '' : '+ ') + rev.toFixed(0) + ' (3% de ' + numVal + ')');
      } else if (CURRENT_ARTICLE === 'L351-3' && k === 'abattement') {
        const conjActif = assembledIds.includes('conjoint_actif')
          ? String(pinnedBlocks.conjoint_actif?.value || '').toLowerCase().startsWith('o')
          : true;
        if (conjActif) { total -= numVal; parts.push('− ' + numVal.toLocaleString('fr-FR')); }
      } else {
        total += numVal;
        parts.push((i === 0 ? '' : '+ ') + numVal.toLocaleString('fr-FR'));
      }
    }
  });

  document.getElementById('result-value').textContent =
    total.toLocaleString('fr-FR', {maximumFractionDigits: 2}) + ' €';
  document.getElementById('result-formula').textContent =
    parts.filter(Boolean).join(' ') + ' = ' + total.toLocaleString('fr-FR', {maximumFractionDigits: 2}) + ' €';
}

// export
const exportBtn = document.getElementById('export-btn');
if (exportBtn) {
  exportBtn.addEventListener('click', () => {
    const projectName = document.getElementById('project-title').value;
    if (assembledIds.length === 0) {
      alert('Assemblez au moins un bloc avant d\'exporter.');
      return;
    }
    alert(`PDF généré pour le projet « ${projectName} ».\n\nTrace Catala exécutable + valeurs + référence à ${ARTICLES_DATA[CURRENT_ARTICLE]?.breadcrumb || 'l\'article'} incluses.`);
  });
}

// ============================================================================
// navigation entre articles (sidebar)
// ============================================================================
document.querySelectorAll('.article-link[data-article]').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const key = link.dataset.article;
    renderArticle(key);
    // si l'extension est ouverte, on remet l'onglet lecture en avant
    if (panel.classList.contains('open')) switchSection('lecture');
    // re-scan glossaire sur les nouveaux noeuds
    if (window.__glossaireScan) window.__glossaireScan();
  });
});

// rendu initial
renderArticle(CURRENT_ARTICLE);
renderPinned();
renderAssembled();
updateProjectBadge();

// petit clignotement de l'icône extension au chargement
setTimeout(() => {
  extIcon.style.transform = 'scale(1.15)';
  setTimeout(() => extIcon.style.transform = '', 400);
}, 800);

/* ============================================================ */

(function() {
  const state = {
    phase: 'start',
    data: {
      meta: {
        protocole: 3,
        nom: "La double lecture",
        started_at: null,
        finished_at: null,
        pseudo: null,
        profil_type: null,
        profil_detail: null
      },
      phases: {
        scenario: { habitudes: null, premiere_question: null, duration_s: 0 },
        libre: { notes: null, duration_s: 0 },
        taches: [],
        entretien: { reponses: {}, echelles: {} }
      },
      interactions: {
        ext_panel_opens: 0,
        ext_panel_closes: 0,
        tabs_switched: [],         // [{section, ts, phase}]
        tab_time_spent: { lecture: 0, generation: 0, projet: 0 }, // approximation
        detection_clicks: 0
      }
    },
    timers: {
      libre_start: null,
      libre_elapsed: 0,
      scenario_start: null,
      task_timers: {},
      last_tab_switch_ts: null,
      current_tab: null
    },
    tasks: [
      {
        id: 1,
        fn: "Lire",
        text: "Ouvrez l'extension Catala sur cette page. Sur quel article et quel alinéa s'ouvre-t-elle ? Que calcule le code ?",
        hint: "Indice : l'extension détecte automatiquement les passages calculables. Cherchez le badge qui les met en évidence, puis ouvrez l'onglet Lecture."
      },
      {
        id: 2,
        fn: "Comprendre",
        text: "Dans l'onglet Lecture, repérez les paramètres d'entrée du calcul. Lequel a le plus probablement changé pour expliquer la dette de Marie D. (1 213 € versé / 793 € dû après recalcul) ?",
        hint: "Indice : un seul de ces paramètres est transmis automatiquement par la DGFiP à la CAF chaque année. C'est lui qui déclenche le plus souvent une révision."
      },
      {
        id: 3,
        fn: "Naviguer",
        text: "Parcourez les articles de la sidebar. Lequel autorise la révision annuelle du barème ? En quoi l'article abrogé L351-3 calculait-il les ressources différemment de L823-1 ?",
        hint: "Indice : un article lie la révision du barème à l'IRL. L'article abrogé L351-3 montre comment la règle a changé en 2019 (abattement vs patrimoine)."
      },
      {
        id: 4,
        fn: "Instrumenter",
        text: "Dans l'onglet Générer, créez deux blocs, épinglez-les dans le Projet et assemblez-les pour lancer le calcul. Quel point pourriez-vous contester devant la CRA ?",
        hint: "Indice : un recours s'appuie sur une erreur de droit (mauvaise règle), une erreur de fait (mauvais paramètre) ou un vice de procédure. Regardez aussi les encadrés « pourquoi cette règle » de chaque article."
      },
      {
        id: 5,
        fn: "Ressentir",
        text: "Depuis le début du test, votre stratégie de recours a-t-elle changé ? Sur quel point concentreriez-vous la contestation devant la CRA ?",
        hint: "Aucun indice ici. Cette tâche n'a pas de bonne réponse. Décrivez sincèrement ce qui a bougé entre votre lecture intuitive et votre lecture instrumentée.",
        showFirstReaction: true
      }
    ]
  };

  const overlayStart = document.getElementById('test-overlay-start');
  const overlayScenario = document.getElementById('test-overlay-scenario');
  const overlayEnd = document.getElementById('test-overlay-end');
  const topbar = document.getElementById('test-topbar');
  const panel = document.getElementById('test-panel');

  function showOverlay(el) {
    [overlayStart, overlayScenario, overlayEnd].forEach(o => o.classList.add('test-hidden'));
    if (el) el.classList.remove('test-hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function showPanelPhase(phase) {
    panel.querySelectorAll('.test-panel__inner').forEach(el => el.classList.add('test-hidden'));
    const target = panel.querySelector(`[data-panel-phase="${phase}"]`);
    if (target) target.classList.remove('test-hidden');
    panel.scrollTop = 0;
    if (target) {
      const body = target.querySelector('.test-panel__body');
      if (body) body.scrollTop = 0;
    }
  }

  function setPhase(phase) {
    state.phase = phase;
    if (phase !== 'libre') stopLibreTimer();

    if (phase === 'start') {
      showOverlay(overlayStart);
      topbar.classList.add('test-hidden');
      panel.classList.add('test-hidden');
      document.body.classList.remove('test-active', 'test-panel-open');
    } else if (phase === 'scenario') {
      showOverlay(overlayScenario);
      showScenarioStep('presentation');
      topbar.classList.add('test-hidden');
      panel.classList.add('test-hidden');
      document.body.classList.remove('test-active', 'test-panel-open');
      if (!state.timers.scenario_start) state.timers.scenario_start = Date.now();
    } else if (phase === 'libre') {
      showOverlay(null);
      topbar.classList.remove('test-hidden');
      panel.classList.remove('test-hidden');
      panel.classList.add('is-open');
      document.body.classList.add('test-active', 'test-panel-open');
      updateTopbarToggle();
      showPanelPhase('libre');
      updateTopbarLabels('Exploration libre', 33);
      startLibreTimer();
    } else if (phase === 'taches') {
      showOverlay(null);
      topbar.classList.remove('test-hidden');
      panel.classList.remove('test-hidden');
      panel.classList.add('is-open');
      document.body.classList.add('test-active', 'test-panel-open');
      updateTopbarToggle();
      renderTasks();
      showPanelPhase('taches');
      updateTopbarLabels('Tâches dirigées', 66);
    } else if (phase === 'entretien') {
      showOverlay(null);
      topbar.classList.remove('test-hidden');
      panel.classList.remove('test-hidden');
      panel.classList.add('is-open');
      document.body.classList.add('test-active', 'test-panel-open');
      updateTopbarToggle();
      renderEntretien();
      showPanelPhase('entretien');
      updateTopbarLabels('Entretien de retour', 90);
    } else if (phase === 'fin') {
      stopLibreTimer();
      Object.keys(state.timers.task_timers).forEach(k => stopTaskTimer(parseInt(k)));
      state.data.meta.finished_at = new Date().toISOString();
      showOverlay(overlayEnd);
      topbar.classList.add('test-hidden');
      panel.classList.add('test-hidden');
      document.body.classList.remove('test-active', 'test-panel-open');
    }

    // sauvegarde + envoi serveur à chaque transition de phase
    if (state && typeof state._save === 'function') state._save();
  }

  function updateTopbarLabels(phaseLabel, pct) {
    document.getElementById('test-topbar-phase').textContent = phaseLabel;
    document.getElementById('test-progress-fill').style.width = pct + '%';
  }

  function updateTopbarToggle() {
    const btn = document.getElementById('test-panel-toggle');
    btn.innerHTML = panel.classList.contains('is-open') ? 'Fermer le test ›' : '‹ Ouvrir le test';
  }

  // ----- ACCUEIL -----
  const consentBox = document.getElementById('test-consent');
  const startBtn = document.getElementById('test-start-btn');

  consentBox.addEventListener('change', () => {
    startBtn.disabled = !consentBox.checked;
  });

  startBtn.addEventListener('click', () => {
    state.data.meta.started_at = new Date().toISOString();
    state.data.meta.pseudo = document.getElementById('test-pseudo').value || null;
    state.data.meta.profil_type = 'juriste';
    state.data.meta.profil_detail = document.getElementById('test-profil-detail').value || null;
    setPhase('scenario');
  });

  // ----- SCÉNARIO : navigation entre les 2 sous-écrans -----
  function showScenarioStep(step) {
    document.querySelectorAll('[data-scenario-step]').forEach(el => {
      if (el.dataset.scenarioStep === step) {
        el.classList.remove('test-hidden');
      } else {
        el.classList.add('test-hidden');
      }
    });
    const box = document.querySelector('#test-overlay-scenario .test-overlay__box');
    if (box) box.scrollTop = 0;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  document.getElementById('test-scenario-next-btn').addEventListener('click', () => {
    showScenarioStep('question');
  });
  document.getElementById('test-scenario-back-btn').addEventListener('click', () => {
    showScenarioStep('presentation');
  });

  // ----- SCÉNARIO -----
  document.getElementById('test-to-libre-btn').addEventListener('click', () => {
    state.data.phases.scenario.habitudes = document.getElementById('test-q-scenario1').value || null;
    state.data.phases.scenario.premiere_question = document.getElementById('test-q-scenario2').value || null;
    if (state.timers.scenario_start) {
      state.data.phases.scenario.duration_s = Math.floor((Date.now() - state.timers.scenario_start) / 1000);
    }
    startTuto();
  });

  // ----- TUTO : 2 bulles puis exploration libre -----
  const tutoEl = document.getElementById('test-tuto');
  const tutoBubble1 = document.getElementById('test-tuto-bubble-1');
  const tutoBubble2 = document.getElementById('test-tuto-bubble-2');

  function startTuto() {
    showOverlay(null);
    topbar.classList.remove('test-hidden');
    panel.classList.remove('test-hidden');
    panel.classList.add('is-open');
    document.body.classList.add('test-active', 'test-panel-open');
    updateTopbarToggle();
    showPanelPhase('libre');
    updateTopbarLabels('Exploration libre', 33);
    tutoEl.classList.remove('test-hidden');
    tutoBubble1.classList.add('is-active');
    tutoBubble2.classList.remove('is-active');
  }

  function endTuto() {
    tutoEl.classList.add('test-hidden');
    setPhase('libre');
  }

  document.getElementById('test-tuto-next-1').addEventListener('click', () => {
    tutoBubble1.classList.remove('is-active');
    tutoBubble2.classList.add('is-active');
  });
  document.getElementById('test-tuto-next-2').addEventListener('click', endTuto);
  document.getElementById('test-tuto-skip-1').addEventListener('click', endTuto);
  document.getElementById('test-tuto-skip-2').addEventListener('click', endTuto);

  // ----- TIMER LIBRE -----
  let libreInterval = null;
  function startLibreTimer() {
    if (state.timers.libre_start) return;
    state.timers.libre_start = Date.now();
    libreInterval = setInterval(() => {
      const sec = Math.floor((Date.now() - state.timers.libre_start) / 1000) + state.timers.libre_elapsed;
      const mm = String(Math.floor(sec / 60)).padStart(2, '0');
      const ss = String(sec % 60).padStart(2, '0');
      const el = document.getElementById('test-timer-libre');
      if (el) el.textContent = mm + ':' + ss;
    }, 1000);
  }
  function stopLibreTimer() {
    if (libreInterval) {
      clearInterval(libreInterval);
      libreInterval = null;
      if (state.timers.libre_start) {
        state.timers.libre_elapsed += Math.floor((Date.now() - state.timers.libre_start) / 1000);
        state.timers.libre_start = null;
      }
    }
  }

  // ----- TOGGLE PANEL -----
  document.getElementById('test-panel-toggle').addEventListener('click', () => {
    if (panel.classList.contains('is-open')) {
      panel.classList.remove('is-open');
      document.body.classList.remove('test-panel-open');
    } else {
      panel.classList.add('is-open');
      document.body.classList.add('test-panel-open');
    }
    updateTopbarToggle();
  });

  // ----- TÂCHES -----
  function escapeHTML(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  state.currentTaskIdx = 0;

  function renderTasks() {
    const container = document.getElementById('test-tasks-container');
    const dotsContainer = document.getElementById('test-tasks-dots');
    container.innerHTML = '';
    dotsContainer.innerHTML = '';
    document.getElementById('test-task-total').textContent = state.tasks.length;

    state.tasks.forEach((task, idx) => {
      if (!state.data.phases.taches[idx]) {
        state.data.phases.taches[idx] = {
          id: task.id, text: task.text,
          result: null, how: null, duration_s: 0, start_ts: null
        };
      }

      const slide = document.createElement('div');
      slide.className = 'test-tasks-carousel__slide';
      slide.dataset.slideIdx = idx;

      const firstReactionBlock = task.showFirstReaction ? `
        <div class="test-task__first-reaction" id="test-first-reaction-${idx}">
          <div class="test-task__first-reaction-label">Au début du test, vous aviez écrit :</div>
          <blockquote class="test-task__first-reaction-text" id="test-first-reaction-text-${idx}">
            <em>(aucune réponse n'a été donnée)</em>
          </blockquote>
        </div>
      ` : '';

      slide.innerHTML = `
        <div class="test-task">
          <div class="test-task__header-row">
            <div class="test-task__num">Tâche ${task.id} / ${state.tasks.length}</div>
            <div class="test-task__fn">${task.fn}</div>
          </div>
          <div class="test-task__text">${task.text}</div>
          ${firstReactionBlock}
          ${task.hint ? `
            <details class="test-task__hint">
              <summary>Voir un indice</summary>
              <div class="test-task__hint-body">${task.hint}</div>
            </details>
          ` : ''}
          <div class="test-task__timer">Temps · <span data-task-timer="${idx}">00:00</span></div>
          <div class="test-input-group" style="margin-top: 12px;">
            <label class="test-input-group__label">Avez-vous réussi ?</label>
            <div class="test-result-buttons">
              <button class="test-result-btn" data-task="${idx}" data-result="success">Oui</button>
              <button class="test-result-btn" data-task="${idx}" data-result="partial">En partie</button>
              <button class="test-result-btn" data-task="${idx}" data-result="fail">Non</button>
            </div>
          </div>
          <div class="test-input-group" style="margin-bottom: 0;">
            <label class="test-input-group__label" for="test-task-how-${idx}">Racontez comment vous avez fait (ou pourquoi vous bloquez)</label>
            <textarea class="test-textarea" data-task-how="${idx}" id="test-task-how-${idx}" placeholder="Quelques phrases suffisent."></textarea>
          </div>
          <div class="test-task__validate-row">
            <button class="test-btn test-task__validate" data-task-validate="${idx}" disabled>
              ${idx === state.tasks.length - 1 ? 'Valider et terminer' : 'Valider et passer à la suivante'}
            </button>
          </div>
        </div>
      `;
      container.appendChild(slide);

      if (task.showFirstReaction) {
        const reactionText = state.data?.phases?.scenario?.premiere_question || state.data?.phases?.scenario?.habitudes;
        if (reactionText && reactionText.trim()) {
          const tgt = slide.querySelector(`#test-first-reaction-text-${idx}`);
          if (tgt) tgt.innerHTML = '« ' + escapeHTML(reactionText.trim()) + ' »';
        }
      }

      const dot = document.createElement('button');
      dot.className = 'test-tasks-carousel__dot';
      dot.dataset.dotIdx = idx;
      dot.setAttribute('aria-label', `Tâche ${task.id}`);
      dot.addEventListener('click', () => goToTask(idx));
      dotsContainer.appendChild(dot);
    });

    state.data.phases.taches.forEach((t, idx) => {
      if (t.result) {
        const b = container.querySelector(`.test-result-btn[data-task="${idx}"][data-result="${t.result}"]`);
        if (b) b.classList.add('is-selected');
        t._draft_result = t.result;
      }
      if (t.how) {
        const ta = container.querySelector(`[data-task-how="${idx}"]`);
        if (ta) ta.value = t.how;
      }
      updateValidateBtn(idx);
    });

    container.querySelectorAll('.test-result-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const taskIdx = parseInt(btn.dataset.task);
        const result = btn.dataset.result;
        container.querySelectorAll(`.test-result-btn[data-task="${taskIdx}"]`).forEach(b => b.classList.remove('is-selected'));
        btn.classList.add('is-selected');
        state.data.phases.taches[taskIdx]._draft_result = result;
        updateValidateBtn(taskIdx);
      });
    });

    container.querySelectorAll('[data-task-how]').forEach(ta => {
      ta.addEventListener('input', () => {
        const taskIdx = parseInt(ta.dataset.taskHow);
        state.data.phases.taches[taskIdx].how = ta.value;
        updateValidateBtn(taskIdx);
      });
    });

    container.querySelectorAll('[data-task-validate]').forEach(btn => {
      btn.addEventListener('click', () => {
        const taskIdx = parseInt(btn.dataset.taskValidate);
        const t = state.data.phases.taches[taskIdx];
        if (t._draft_result) t.result = t._draft_result;
        stopTaskTimer(taskIdx);
        updateDots();
        if (taskIdx === state.tasks.length - 1) {
          btn.textContent = '✓ Tâche validée';
          btn.disabled = true;
          return;
        }
        goToTask(taskIdx + 1);
      });
    });

    const firstPending = state.data.phases.taches.findIndex(t => !t.result);
    state.currentTaskIdx = firstPending >= 0 ? firstPending : 0;
    goToTask(state.currentTaskIdx);
  }

  function goToTask(idx) {
    if (idx < 0 || idx >= state.tasks.length) return;
    state.currentTaskIdx = idx;
    document.querySelectorAll('.test-tasks-carousel__slide').forEach(s => {
      s.classList.toggle('is-active', parseInt(s.dataset.slideIdx) === idx);
    });
    document.getElementById('test-task-current').textContent = idx + 1;
    updateDots();
    updateArrows();
    if (!state.data.phases.taches[idx].result) {
      startTaskTimer(idx);
    }
    const body = document.getElementById('test-tasks-body');
    if (body) body.scrollTop = 0;
  }

  function updateDots() {
    document.querySelectorAll('.test-tasks-carousel__dot').forEach(dot => {
      const idx = parseInt(dot.dataset.dotIdx);
      dot.classList.toggle('is-active', idx === state.currentTaskIdx);
      dot.classList.toggle('is-done', !!state.data.phases.taches[idx]?.result && idx !== state.currentTaskIdx);
    });
  }

  function updateArrows() {
    document.getElementById('test-task-prev').disabled = (state.currentTaskIdx === 0);
    document.getElementById('test-task-next').disabled = (state.currentTaskIdx === state.tasks.length - 1);
  }

  function updateValidateBtn(taskIdx) {
    const t = state.data.phases.taches[taskIdx];
    const btn = document.querySelector(`[data-task-validate="${taskIdx}"]`);
    if (!btn) return;
    const hasResult = !!t._draft_result;
    const hasHow = t.how && t.how.trim().length > 0;
    btn.disabled = !(hasResult && hasHow);
  }

  document.getElementById('test-task-prev').addEventListener('click', () => goToTask(state.currentTaskIdx - 1));
  document.getElementById('test-task-next').addEventListener('click', () => goToTask(state.currentTaskIdx + 1));

  function startTaskTimer(idx) {
    if (state.timers.task_timers[idx]) return;
    if (!state.data.phases.taches[idx].start_ts) state.data.phases.taches[idx].start_ts = Date.now();
    state.timers.task_timers[idx] = setInterval(() => {
      const t = state.data.phases.taches[idx];
      const sec = Math.floor((Date.now() - t.start_ts) / 1000) + t.duration_s;
      const mm = String(Math.floor(sec / 60)).padStart(2, '0');
      const ss = String(sec % 60).padStart(2, '0');
      const el = document.querySelector(`[data-task-timer="${idx}"]`);
      if (el) el.textContent = mm + ':' + ss;
    }, 1000);
  }

  function stopTaskTimer(idx) {
    if (state.timers.task_timers[idx]) {
      clearInterval(state.timers.task_timers[idx]);
      delete state.timers.task_timers[idx];
      const t = state.data.phases.taches[idx];
      if (t.start_ts) {
        t.duration_s += Math.floor((Date.now() - t.start_ts) / 1000);
        t.start_ts = null;
      }
    }
  }

  // ============================================================================
  // ENTRETIEN — carrousel de 12 slides (adapté au public juriste)
  // ============================================================================
  const ENTRETIEN_ITEMS = [
    { type: 'open',  id: 'q1', num: 'Q1', text: "Est-ce que vous utiliseriez cet outil dans votre pratique quotidienne ? Pour quoi faire concrètement ?", placeholder: "Réponse libre, exemples bienvenus." },
    { type: 'open',  id: 'q2', num: 'Q2', text: "Quelle proportion du contenu vous paraît utilisable en l'état, quelle proportion demande une traduction ?", placeholder: "Estimation libre, exemples bienvenus." },
    { type: 'open',  id: 'q3', num: 'Q3', text: "La double lecture code Catala / formule mathématique vous paraît nécessaire, ou préféreriez-vous une seule couche ?", placeholder: "Réponse libre." },
    { type: 'open',  id: 'q4', num: 'Q4', text: "Quels manques identifiez-vous par rapport à un dossier réel (informations qui ne sont pas là, fonctions absentes) ?", placeholder: "Réponse libre." },
    { type: 'open',  id: 'q5', num: 'Q5', text: "Est-ce que cet outil change votre façon de voir l'algorithme CAF ? Et plus largement, votre rapport aux décisions automatisées ?", placeholder: "Réponse libre." },
    { type: 'open',  id: 'q6', num: 'Q6', text: "Comment présenteriez-vous cet outil à un confrère qui débute en droit social ?", placeholder: "Réponse libre." },
    { type: 'scale', id: 'precision',     num: 'E1', label: "Précision",      desc: "Le niveau de détail correspond à ce dont j'ai besoin pour instruire un dossier." },
    { type: 'scale', id: 'opposabilite',  num: 'E2', label: "Opposabilité",   desc: "Je peux fonder un argumentaire juridique sur ce que l'outil me montre." },
    { type: 'scale', id: 'lisibilite',    num: 'E3', label: "Lisibilité",     desc: "La double lecture code / explication est claire et bien articulée." },
    { type: 'scale', id: 'utilite',       num: 'E4', label: "Utilité prof.",  desc: "Cet outil pourrait s'intégrer à ma pratique." },
    { type: 'open',  id: 'q7', num: 'Q7', text: "À quoi ressemblerait une version 2 de cet outil ? La fonction qui vous manque le plus ?", placeholder: "Réponse libre." },
    { type: 'open',  id: 'q8', num: 'Q8', text: "À qui donneriez-vous cet outil ? À qui surtout pas ?", placeholder: "Réponse libre." }
  ];

  state.currentEntretienIdx = 0;

  function renderEntretien() {
    const container = document.getElementById('test-entretien-container');
    const dotsContainer = document.getElementById('test-entretien-dots');
    if (!container || container.dataset.rendered === '1') return;
    container.innerHTML = '';
    dotsContainer.innerHTML = '';
    document.getElementById('test-entretien-total').textContent = ENTRETIEN_ITEMS.length;

    ENTRETIEN_ITEMS.forEach((item, idx) => {
      const slide = document.createElement('div');
      slide.className = 'test-tasks-carousel__slide';
      slide.dataset.entretienSlideIdx = idx;
      const isLast = idx === ENTRETIEN_ITEMS.length - 1;
      const btnLabel = isLast ? 'Valider et terminer' : 'Valider et passer à la suivante';

      if (item.type === 'open') {
        slide.innerHTML = `
          <div class="test-task">
            <div class="test-task__header-row">
              <div class="test-task__num">${idx + 1} / ${ENTRETIEN_ITEMS.length}</div>
              <div class="test-task__fn">Question ${item.num}</div>
            </div>
            <div class="test-task__text">${item.text}</div>
            <div class="test-input-group" style="margin-bottom: 0;">
              <textarea class="test-textarea" id="test-q-r${item.id.replace('q','')}" data-entretien-open="${idx}" placeholder="${item.placeholder}"></textarea>
            </div>
            <div class="test-task__validate-row">
              <button class="test-btn test-task__validate" data-entretien-validate="${idx}" disabled>${btnLabel}</button>
            </div>
          </div>
        `;
      } else {
        slide.innerHTML = `
          <div class="test-task">
            <div class="test-task__header-row">
              <div class="test-task__num">${idx + 1} / ${ENTRETIEN_ITEMS.length}</div>
              <div class="test-task__fn">Échelle ${item.num}</div>
            </div>
            <div class="test-task__text">${item.label}</div>
            <p style="font-size: 13px; color: var(--test-mute); font-style: italic; margin-bottom: 14px;">${item.desc}</p>
            <div class="test-scale" data-scale="${item.id}" data-entretien-scale="${idx}">
              <div class="test-scale__row">
                <button class="test-scale__btn" data-value="1">1</button>
                <button class="test-scale__btn" data-value="2">2</button>
                <button class="test-scale__btn" data-value="3">3</button>
                <button class="test-scale__btn" data-value="4">4</button>
                <button class="test-scale__btn" data-value="5">5</button>
              </div>
              <div class="test-scale__ends"><span>Pas du tout</span><span>Totalement</span></div>
            </div>
            <div class="test-task__validate-row">
              <button class="test-btn test-task__validate" data-entretien-validate="${idx}" disabled>${btnLabel}</button>
            </div>
          </div>
        `;
      }
      container.appendChild(slide);

      const dot = document.createElement('button');
      dot.className = 'test-tasks-carousel__dot';
      dot.dataset.entretienDotIdx = idx;
      dot.setAttribute('aria-label', `${item.num}`);
      dot.addEventListener('click', () => {
        const validated = (state.data.phases.entretien.validated || {})[idx];
        if (validated || idx === state.currentEntretienIdx) goToEntretien(idx);
      });
      dotsContainer.appendChild(dot);
    });

    container.querySelectorAll('[data-entretien-open]').forEach(ta => {
      ta.addEventListener('input', () => {
        const slideIdx = parseInt(ta.dataset.entretienOpen);
        const item = ENTRETIEN_ITEMS[slideIdx];
        state.data.phases.entretien.reponses[item.id] = ta.value || null;
        updateEntretienValidate(slideIdx);
      });
    });

    container.querySelectorAll('[data-entretien-scale]').forEach(scale => {
      const slideIdx = parseInt(scale.dataset.entretienScale);
      const item = ENTRETIEN_ITEMS[slideIdx];
      scale.querySelectorAll('.test-scale__btn').forEach(btn => {
        btn.addEventListener('click', () => {
          scale.querySelectorAll('.test-scale__btn').forEach(b => b.classList.remove('is-selected'));
          btn.classList.add('is-selected');
          state.data.phases.entretien.echelles[item.id] = parseInt(btn.dataset.value);
          updateEntretienValidate(slideIdx);
          if (typeof state._save === 'function') state._save();
        });
      });
    });

    container.querySelectorAll('[data-entretien-validate]').forEach(btn => {
      btn.addEventListener('click', () => {
        const slideIdx = parseInt(btn.dataset.entretienValidate);
        state.data.phases.entretien.validated = state.data.phases.entretien.validated || {};
        state.data.phases.entretien.validated[slideIdx] = true;
        updateEntretienDots();
        if (typeof state._save === 'function') state._save();
        if (slideIdx === ENTRETIEN_ITEMS.length - 1) {
          const finishBtn = document.getElementById('test-entretien-finish');
          if (finishBtn) {
            finishBtn.disabled = false;
            finishBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
          btn.textContent = '✓ Question validée';
          btn.disabled = true;
          return;
        }
        goToEntretien(slideIdx + 1);
      });
    });

    document.getElementById('test-entretien-prev').addEventListener('click', () => {
      const target = state.currentEntretienIdx - 1;
      const validated = (state.data.phases.entretien.validated || {})[target];
      if (validated) goToEntretien(target);
    });
    document.getElementById('test-entretien-next').addEventListener('click', () => {
      const curValidated = (state.data.phases.entretien.validated || {})[state.currentEntretienIdx];
      if (curValidated) goToEntretien(state.currentEntretienIdx + 1);
    });

    container.dataset.rendered = '1';
    goToEntretien(0);
  }

  function goToEntretien(idx) {
    if (idx < 0 || idx >= ENTRETIEN_ITEMS.length) return;
    state.currentEntretienIdx = idx;
    document.querySelectorAll('.test-tasks-carousel__slide[data-entretien-slide-idx]').forEach(s => {
      s.classList.toggle('is-active', parseInt(s.dataset.entretienSlideIdx) === idx);
    });
    document.getElementById('test-entretien-current').textContent = idx + 1;
    updateEntretienDots();
    updateEntretienArrows();
    const body = document.getElementById('test-entretien-body');
    if (body) body.scrollTop = 0;
  }

  function updateEntretienDots() {
    const validated = state.data.phases.entretien.validated || {};
    document.querySelectorAll('[data-entretien-dot-idx]').forEach(dot => {
      const idx = parseInt(dot.dataset.entretienDotIdx);
      dot.classList.toggle('is-active', idx === state.currentEntretienIdx);
      dot.classList.toggle('is-done', !!validated[idx] && idx !== state.currentEntretienIdx);
      const isLocked = !validated[idx] && idx > state.currentEntretienIdx;
      dot.classList.toggle('is-locked', isLocked);
      dot.disabled = isLocked;
    });
  }

  function updateEntretienArrows() {
    const prevBtn = document.getElementById('test-entretien-prev');
    const nextBtn = document.getElementById('test-entretien-next');
    const validated = state.data.phases.entretien.validated || {};
    const idx = state.currentEntretienIdx;
    prevBtn.disabled = (idx === 0) || !validated[idx - 1];
    nextBtn.disabled = (idx === ENTRETIEN_ITEMS.length - 1) || !validated[idx];
  }

  function updateEntretienValidate(slideIdx) {
    const item = ENTRETIEN_ITEMS[slideIdx];
    const btn = document.querySelector(`[data-entretien-validate="${slideIdx}"]`);
    if (!btn) return;
    let answered = false;
    if (item.type === 'open') {
      const v = state.data.phases.entretien.reponses[item.id];
      answered = !!(v && v.trim());
    } else {
      answered = !!state.data.phases.entretien.echelles[item.id];
    }
    btn.disabled = !answered;
  }

  // ----- NAVIGATION ENTRE PHASES -----
  document.querySelectorAll('[data-test-next]').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.testNext;
      if (state.phase === 'libre') {
        state.data.phases.libre.notes = document.getElementById('test-q-libre').value || null;
        state.data.phases.libre.duration_s = state.timers.libre_elapsed + (state.timers.libre_start ? Math.floor((Date.now() - state.timers.libre_start) / 1000) : 0);
      } else if (state.phase === 'entretien') {
        for (let i = 1; i <= 8; i++) {
          const el = document.getElementById('test-q-r' + i);
          if (el) state.data.phases.entretien.reponses['q' + i] = el.value || null;
        }
      }
      setPhase(target);
    });
  });

  // ----- TRACKING SPÉCIFIQUE PROTO 3 -----
  // (s'attache aux éléments du proto original via les ids exposés par son script)

  const extIcon = document.getElementById('ext-icon');
  const detectionTT = document.getElementById('detection-tt');
  const detected = document.getElementById('detected-alinea');
  const extClose = document.getElementById('ext-close');
  const extTabs = document.querySelectorAll('.ext-tab');

  function isTracking() {
    return state.phase !== 'start' && state.phase !== 'scenario';
  }

  function recordTabTime() {
    if (state.timers.last_tab_switch_ts && state.timers.current_tab) {
      const elapsed = Math.floor((Date.now() - state.timers.last_tab_switch_ts) / 1000);
      const key = state.timers.current_tab;
      state.data.interactions.tab_time_spent[key] = (state.data.interactions.tab_time_spent[key] || 0) + elapsed;
    }
  }

  if (extIcon) {
    extIcon.addEventListener('click', () => {
      if (!isTracking()) return;
      state.data.interactions.ext_panel_opens++;
      state.timers.last_tab_switch_ts = Date.now();
      state.timers.current_tab = 'lecture';
    });
  }
  if (detected) {
    detected.addEventListener('click', () => {
      if (!isTracking()) return;
      state.data.interactions.detection_clicks++;
    });
  }
  if (detectionTT) {
    detectionTT.addEventListener('click', () => {
      if (!isTracking()) return;
      state.data.interactions.detection_clicks++;
    });
  }
  if (extClose) {
    extClose.addEventListener('click', () => {
      if (!isTracking()) return;
      state.data.interactions.ext_panel_closes++;
      recordTabTime();
      state.timers.current_tab = null;
      state.timers.last_tab_switch_ts = null;
    });
  }
  extTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      if (!isTracking()) return;
      const section = tab.dataset.section;
      state.data.interactions.tabs_switched.push({
        section: section,
        phase: state.phase,
        ts: new Date().toISOString()
      });
      recordTabTime();
      state.timers.current_tab = section;
      state.timers.last_tab_switch_ts = Date.now();
    });
  });

  // (Bloc téléchargement JSON retiré : sauvegarde gérée par save.php côté serveur)

  // ============================================================================
  // SYNC MODULE — sauvegarde locale + envoi serveur
  // ============================================================================
  const SYNC_ENDPOINT = "save.php";
  const SYNC_PROTO_KEY = "proto3";
  const SYNC_STORAGE_KEY = "boites_noires_session_" + SYNC_PROTO_KEY;

  function generateSessionId() {
    return 'xxxxxxxx-xxxx'.replace(/x/g, () =>
      Math.floor(Math.random() * 16).toString(16)
    );
  }

  let sessionId = null;
  try {
    const stored = localStorage.getItem(SYNC_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed && parsed.session_id) sessionId = parsed.session_id;
    }
  } catch (e) {}
  if (!sessionId) sessionId = generateSessionId();

  function restoreState() {
    try {
      const stored = localStorage.getItem(SYNC_STORAGE_KEY);
      if (!stored) return false;
      const parsed = JSON.parse(stored);
      if (!parsed || !parsed.data) return false;
      Object.assign(state.data.meta, parsed.data.meta || {});
      if (parsed.data.phases) {
        Object.assign(state.data.phases.scenario, parsed.data.phases.scenario || {});
        Object.assign(state.data.phases.libre, parsed.data.phases.libre || {});
        if (Array.isArray(parsed.data.phases.taches)) {
          state.data.phases.taches = parsed.data.phases.taches;
        }
        if (parsed.data.phases.entretien) {
          state.data.phases.entretien.reponses = parsed.data.phases.entretien.reponses || {};
          state.data.phases.entretien.echelles = parsed.data.phases.entretien.echelles || {};
        }
      }
      return true;
    } catch (e) { return false; }
  }

  function saveLocal() {
    try {
      localStorage.setItem(SYNC_STORAGE_KEY, JSON.stringify({
        session_id: sessionId,
        saved_at: new Date().toISOString(),
        data: state.data
      }));
    } catch (e) {}
  }

  let syncTimer = null;
  function syncToServer() {
    if (!SYNC_ENDPOINT) return;
    if (syncTimer) clearTimeout(syncTimer);
    syncTimer = setTimeout(() => {
      const payload = { proto: SYNC_PROTO_KEY, session_id: sessionId, data: state.data };
      try {
        fetch(SYNC_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
          keepalive: true
        }).catch(() => {});
      } catch (e) {}
    }, 800);
  }

  function save() { saveLocal(); syncToServer(); }

  function syncOnUnload() {
    if (!SYNC_ENDPOINT) return;
    const payload = { proto: SYNC_PROTO_KEY, session_id: sessionId, data: state.data };
    try {
      const blob = new Blob([JSON.stringify(payload)], { type: 'application/json' });
      navigator.sendBeacon(SYNC_ENDPOINT, blob);
    } catch (e) {}
  }
  window.addEventListener('beforeunload', syncOnUnload);
  window.addEventListener('pagehide', syncOnUnload);
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') syncOnUnload();
  });

  state._save = save;

  const wasRestored = restoreState();

  const _setPhaseOriginal = setPhase;
  function setPhaseAndSave(phase) {
    _setPhaseOriginal(phase);
    save();
  }

  setInterval(save, 30000);

  document.addEventListener('input', function(e) {
    if (e.target && (e.target.tagName === 'TEXTAREA' || e.target.tagName === 'INPUT')) {
      save();
    }
  });

  // ----- INIT -----
  setPhaseAndSave(wasRestored && state.data.meta.started_at ? state.phase : 'start');
})();

/* ============================================================ */

(function() {
  const glossaire = {
    // --- sigles administratifs ---
    "CAF": {
      title: "CAF — Caisse d'Allocations Familiales",
      body: "Organisme local de la branche famille de la Sécurité sociale, en charge du versement des prestations familiales et sociales. 101 CAF locales en France."
    },
    "CNAF": {
      title: "CNAF — Caisse Nationale des Allocations Familiales",
      body: "Tête de réseau des 101 CAF locales. Conçoit les outils informatiques et les règles de gestion communes au réseau."
    },
    "DGFiP": {
      title: "DGFiP — Direction Générale des Finances Publiques",
      body: "Administration fiscale française. Transmet automatiquement les revenus aux organismes sociaux (CAF, MSA, etc.) sur le fondement de l'article L98 A du Livre des procédures fiscales."
    },
    "France Travail": {
      title: "France Travail",
      body: "Nouveau nom de Pôle Emploi depuis le 1er janvier 2024. Service public de l'emploi. Transmet les périodes d'inscription et d'indemnisation."
    },
    "DSN": {
      title: "DSN — Déclaration Sociale Nominative",
      body: "Déclaration mensuelle obligatoire des employeurs, qui transmet salaires et cotisations à l'administration. Source primaire pour les ressources d'activité."
    },
    "DITP": {
      title: "DITP — Direction Interministérielle de la Transformation Publique",
      body: "Service de l'État qui pilote la simplification administrative et la transformation des services publics."
    },
    "IGAS": {
      title: "IGAS — Inspection Générale des Affaires Sociales",
      body: "Corps de contrôle interministériel sur les politiques sociales. Produit des rapports d'évaluation."
    },
    "IGF": {
      title: "IGF — Inspection Générale des Finances",
      body: "Corps de contrôle sur les finances publiques. Souvent en mission conjointe avec l'IGAS sur les sujets sociaux à fort enjeu budgétaire."
    },

    // --- prestations logement ---
    "APL": {
      title: "APL — Aide Personnalisée au Logement",
      body: "Aide pour les logements conventionnés (conventions État-bailleur). Régie par le Code de la construction et de l'habitation (L823-1 et suivants)."
    },
    "ALS": {
      title: "ALS — Allocation de Logement Sociale",
      body: "Aide pour les personnes ne touchant ni l'APL ni l'ALF (étudiants, jeunes actifs, ménages sans enfant). Régie par le Code de la sécurité sociale (L831-1 et suivants). C'est l'aide que touche Marie D."
    },
    "ALF": {
      title: "ALF — Allocation de Logement Familiale",
      body: "Aide pour les ménages avec enfants ou personnes à charge, sans condition de logement conventionné. La plus ancienne des trois aides (1948)."
    },

    // --- applications & flux ---
    "CRISTAL": {
      title: "CRISTAL",
      body: "Application informatique interne à la CNAF qui gère l'ensemble des dossiers allocataires et exécute les calculs de prestations. Écrit en COBOL pour l'essentiel, encore en production aujourd'hui."
    },
    "NIR": {
      title: "NIR — Numéro d'Inscription au Répertoire",
      body: "Le « numéro de sécurité sociale » de chaque personne. Identifiant unique pour les échanges entre administrations."
    },
    "DRM": {
      title: "DRM — Dispositif de Ressources Mensuelles",
      body: "Système d'échange automatique qui transmet à la CAF les ressources de l'allocataire chaque mois. Mis en place avec la contemporanéité des aides en 2021."
    },
    "RFR": {
      title: "RFR — Revenu Fiscal de Référence",
      body: "Chiffre annuel calculé par les impôts à partir de la déclaration de revenus. Sert d'étalon pour de nombreuses prestations sociales. Créé par la loi de finances pour 1997 (article 1417 du CGI)."
    },

    // --- vocabulaire du calcul ---
    "Loyer plafonné": {
      title: "Loyer plafonné",
      body: "Montant maximum du loyer pris en compte dans le calcul, fixé par décret selon la zone géographique et la composition du foyer. Au-delà, le surplus n'augmente pas l'aide."
    },
    "loyer plafond": {
      title: "Loyer plafond",
      body: "Synonyme de « loyer plafonné ». Montant maximum du loyer pris en compte dans le barème."
    },
    "Charges forfaitaires": {
      title: "Charges forfaitaires",
      body: "Montant fixe ajouté au loyer pour couvrir les charges locatives, défini chaque année par arrêté."
    },
    "Loyer minimal": {
      title: "Loyer minimal",
      body: "Minimum de loyer que l'allocataire doit assumer lui-même avant que l'aide entre en jeu. Joue le rôle d'une franchise."
    },
    "Participation personnelle": {
      title: "Participation personnelle",
      body: "Part variable du loyer que l'allocataire doit payer de sa poche, calculée selon ses ressources. Plus les revenus sont élevés, plus elle augmente."
    },

    // --- vocabulaire général du droit social ---
    "indu": {
      title: "Indu",
      body: "Somme versée à tort par l'administration. Doit normalement être remboursée par l'allocataire, sauf remise de dette accordée à titre exceptionnel (L256-4 CSS)."
    },
    "recouvrement": {
      title: "Recouvrement",
      body: "Procédure par laquelle l'administration récupère une somme due. Pour les CAF, principalement par retenue automatique sur prestations futures (R553-1 CSS), plus rarement par voie d'huissier."
    },
    "contemporanéisation": {
      title: "Contemporanéisation",
      body: "Réforme du 1er janvier 2021. Les aides au logement sont calculées sur les 12 derniers mois glissants, et non plus sur N-2. Recalcul tous les 3 mois. Décret n°2019-1574 du 30 décembre 2019."
    },

    // --- TERMES JURIDIQUES SPÉCIFIQUES (proto 3) ---
    "CRA": {
      title: "CRA — Commission de Recours Amiable",
      body: "Instance interne à chaque CAF qui examine les contestations des décisions. Étape préalable obligatoire avant tout recours contentieux. Délai de saisine : 2 mois à compter de la notification (R142-1 CSS)."
    },
    "CRPA": {
      title: "CRPA — Code des Relations entre le Public et l'Administration",
      body: "Code de 2015 qui rassemble les règles générales de procédure administrative non contentieuse. Articles L211-2 et L211-5 sur la motivation des décisions individuelles défavorables. L311-3-1 sur les décisions automatisées."
    },
    "RAPO": {
      title: "RAPO — Recours Administratif Préalable Obligatoire",
      body: "Recours administratif que le justiciable doit obligatoirement former auprès de l'administration avant de saisir le juge. La saisine de la CRA est un RAPO en matière de prestations CAF."
    },
    "contentieux": {
      title: "Contentieux",
      body: "Phase judiciaire d'un litige. Pour les prestations sociales, le contentieux relève du tribunal judiciaire — pôle social — depuis la réforme du 1er janvier 2019 (article L142-2 CSS)."
    },
    "motivation": {
      title: "Motivation (d'une décision)",
      body: "Obligation pour l'administration d'expliciter par écrit les considérations de droit et de fait qui fondent une décision individuelle défavorable. Articles L211-2 à L211-7 CRPA. Le défaut de motivation est un vice de procédure."
    },
    "recours gracieux": {
      title: "Recours gracieux",
      body: "Demande adressée à l'auteur de la décision pour qu'il la retire ou la modifie. À la CAF, il prend la forme d'une saisine de la CRA. Non obligatoire en principe, mais devient obligatoire (RAPO) pour les prestations sociales."
    },
    "contradictoire": {
      title: "Contradictoire (principe du)",
      body: "Principe selon lequel chaque partie doit pouvoir connaître les arguments de l'autre et y répondre. L'article L121-1 CRPA impose à l'administration de mettre l'allocataire en mesure de présenter ses observations avant toute décision défavorable, sauf urgence."
    },
    "voies et délais de recours": {
      title: "Voies et délais de recours",
      body: "Mention obligatoire dans toute décision administrative : indication précise de l'autorité à saisir, du délai (2 mois pour la CRA en matière sociale), et des conséquences du non-recours. L'absence de cette mention proroge le délai (R421-5 CJA, R142-1 CSS)."
    },
    "tribunal judiciaire": {
      title: "Tribunal judiciaire — pôle social",
      body: "Depuis le 1er janvier 2019, c'est le tribunal judiciaire (pôle social) qui est compétent pour les litiges sur les prestations sociales, en remplacement du tribunal des affaires de sécurité sociale (TASS) supprimé."
    },
    "remise de dette": {
      title: "Remise de dette",
      body: "Procédure par laquelle la CAF peut renoncer à recouvrer un indu, en tout ou partie, pour des motifs de bonne foi ou de précarité (L256-4 CSS). Décision discrétionnaire de la commission départementale d'aide sociale ou de la CAF."
    }
  };

  const tip = document.getElementById('glossary-tooltip');
  const tipTitle = document.getElementById('glossary-tooltip-title');
  const tipBody = document.getElementById('glossary-tooltip-body');
  const tipClose = document.getElementById('glossary-tooltip-close');
  let currentTarget = null;

  function closeTip() {
    tip.classList.remove('is-open');
    currentTarget = null;
  }

  function showTip(targetEl, key) {
    const data = glossaire[key];
    if (!data) return;
    tipTitle.textContent = data.title;
    tipBody.textContent = data.body;
    tip.classList.add('is-open');
    const rect = targetEl.getBoundingClientRect();
    const tipRect = tip.getBoundingClientRect();
    const margin = 8;
    let left = rect.left + (rect.width / 2) - (tipRect.width / 2);
    let top = rect.bottom + margin;
    if (left < margin) left = margin;
    if (left + tipRect.width > window.innerWidth - margin) {
      left = window.innerWidth - tipRect.width - margin;
    }
    if (top + tipRect.height > window.innerHeight - margin) {
      top = rect.top - tipRect.height - margin;
    }
    tip.style.left = Math.max(margin, left) + 'px';
    tip.style.top = Math.max(margin, top) + 'px';
    currentTarget = targetEl;
  }

  tipClose.addEventListener('click', e => { e.stopPropagation(); closeTip(); });
  document.addEventListener('click', e => {
    if (currentTarget && !tip.contains(e.target) && !e.target.classList.contains('glossary-term')) {
      closeTip();
    }
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeTip(); });
  window.addEventListener('resize', closeTip);
  window.addEventListener('scroll', closeTip, true);

  const sortedKeys = Object.keys(glossaire).sort((a, b) => b.length - a.length);

  function escapeRegex(s) {
    return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  function wrapTermsInTextNode(node) {
    if (!node.nodeValue || !node.nodeValue.trim()) return;
    const text = node.nodeValue;
    const pattern = sortedKeys.map(k => '\\b' + escapeRegex(k) + '\\b').join('|');
    const re = new RegExp(pattern, 'g');
    let match, lastIdx = 0;
    const parent = node.parentNode;
    if (!parent) return;
    let p = parent;
    while (p && p !== document.body) {
      if (p.classList && (
        p.classList.contains('glossary-term') ||
        p.classList.contains('catala-block') ||
        p.classList.contains('catala-code') ||
        p.classList.contains('law-tag') ||
        p.classList.contains('source')
      )) return;
      if (['TEXTAREA','INPUT','BUTTON','A','SCRIPT','STYLE','CODE','PRE'].includes(p.tagName)) return;
      p = p.parentNode;
    }
    const frag = document.createDocumentFragment();
    while ((match = re.exec(text)) !== null) {
      if (match.index > lastIdx) {
        frag.appendChild(document.createTextNode(text.slice(lastIdx, match.index)));
      }
      const term = match[0];
      const span = document.createElement('span');
      span.className = 'glossary-term';
      span.textContent = term;
      span.dataset.gloss = term;
      span.addEventListener('click', e => {
        e.stopPropagation();
        if (currentTarget === span) {
          closeTip();
        } else {
          showTip(span, term);
        }
      });
      frag.appendChild(span);
      lastIdx = re.lastIndex;
    }
    if (lastIdx === 0) return;
    if (lastIdx < text.length) {
      frag.appendChild(document.createTextNode(text.slice(lastIdx)));
    }
    parent.replaceChild(frag, node);
  }

  function scanZone(zone) {
    if (!zone) return;
    const walker = document.createTreeWalker(zone, NodeFilter.SHOW_TEXT, null);
    const nodes = [];
    let n;
    while ((n = walker.nextNode())) nodes.push(n);
    nodes.forEach(wrapTermsInTextNode);
  }

  function init() {
    // Cibles : panneau extension Catala (lecture/génération/projet) + texte de l'article Légifrance
    document.querySelectorAll('.ext-section, .article-body').forEach(scanZone);
  }

  // exposé globalement pour re-scan après changement d'article
  window.__glossaireScan = init;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();