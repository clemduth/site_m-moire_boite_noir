// gestion d'erreur globale : si quoi que ce soit plante, on l'affiche
window.addEventListener('error', function(e) {
  const box = document.getElementById('error-box');
  if (box) {
    box.classList.add('show');
    box.textContent = 'Erreur : ' + e.message + '\nLigne : ' + e.lineno;
  }
});

// on attend que le DOM soit prêt
document.addEventListener('DOMContentLoaded', function() {

  try {

    // ============ DONNEES ============
    const MOIS = ['Janv.', 'Févr.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'];

    const TEMPLATES = {
      'situation-initiale': {
        cat: 'initial', icon: '🏁', label: 'Situation initiale', date: 0,
        fields: {
          revenus: { label: 'Revenus mensuels', type: 'number', value: 1650, unit: '€' },
          loyer: { label: 'Loyer', type: 'number', value: 500, unit: '€' },
          charges: { label: 'Charges locatives (eau, ascenseur…)', type: 'number', value: 35, unit: '€/mois' },
          foyer: { label: 'Composition foyer', type: 'select', value: 'seul', options: [['seul','Seul·e'],['couple','En couple'],['1enfant','+ 1 enfant'],['2enfants','+ 2 enfants']] },
          zone: { label: 'Zone géographique', type: 'select', value: '2', options: [['1','Zone 1 (Paris)'],['2','Zone 2 (>100k hab.)'],['3','Zone 3 (autres)']] }
        }
      },
      'demenagement-moins-cher': {
        cat: 'logement', icon: '📦', label: 'Déménagement (loyer −)', date: 3,
        fields: {
          loyer: { label: 'Nouveau loyer', type: 'number', value: 380, unit: '€' },
          charges: { label: 'Nouvelles charges', type: 'number', value: 30, unit: '€/mois' },
          frais_agence: { label: 'Frais d\'agence (ponctuel)', type: 'number', value: 0, unit: '€' },
          zone: { label: 'Nouvelle zone', type: 'select', value: '2', options: [['1','Zone 1 (Paris)'],['2','Zone 2 (>100k hab.)'],['3','Zone 3 (autres)']] }
        }
      },
      'demenagement-plus-cher': {
        cat: 'logement', icon: '🏘️', label: 'Déménagement (loyer +)', date: 5,
        fields: {
          loyer: { label: 'Nouveau loyer', type: 'number', value: 600, unit: '€' },
          charges: { label: 'Nouvelles charges', type: 'number', value: 50, unit: '€/mois' },
          frais_agence: { label: 'Frais d\'agence (ponctuel)', type: 'number', value: 600, unit: '€' },
          depot_garantie: { label: 'Dépôt de garantie (ponctuel)', type: 'number', value: 600, unit: '€' },
          zone: { label: 'Nouvelle zone', type: 'select', value: '2', options: [['1','Zone 1 (Paris)'],['2','Zone 2 (>100k hab.)'],['3','Zone 3 (autres)']] }
        }
      },
      'changement-zone': {
        cat: 'logement', icon: '🗺️', label: 'Changement de zone', date: 4,
        fields: {
          zone: { label: 'Nouvelle zone', type: 'select', value: '1', options: [['1','Zone 1 (Paris)'],['2','Zone 2 (>100k hab.)'],['3','Zone 3 (autres)']] },
          nouveau_loyer: { label: 'Nouveau loyer (si déménagement)', type: 'number', value: 0, unit: '€' }
        }
      },
      'reprise-emploi': {
        cat: 'emploi', icon: '🆕', label: "Reprise d'emploi", date: 5,
        fields: {
          revenus: { label: 'Salaire net mensuel', type: 'number', value: 2000, unit: '€' },
          temps_travail: { label: 'Temps de travail', type: 'select', value: '100', options: [['50','Mi-temps (50%)'],['80','80%'],['100','Plein temps']] },
          prime_embauche: { label: 'Prime d\'embauche (ponctuel)', type: 'number', value: 0, unit: '€' },
          frais_transport: { label: 'Frais transport / mois', type: 'number', value: 75, unit: '€' }
        }
      },
      'perte-emploi': {
        cat: 'emploi', icon: '📉', label: "Perte d'emploi", date: 8,
        fields: {
          revenus: { label: 'Allocations chômage / mois', type: 'number', value: 950, unit: '€' },
          duree_allocs: { label: 'Durée prévue (mois)', type: 'number', value: 24, unit: 'mois' },
          indemnite_licenciement: { label: 'Indemnités licenciement (ponctuel)', type: 'number', value: 0, unit: '€' }
        }
      },
      'augmentation': {
        cat: 'emploi', icon: '📈', label: 'Augmentation salaire', date: 6,
        fields: {
          revenus: { label: 'Nouveau salaire net / mois', type: 'number', value: 1450, unit: '€' },
          prime_annuelle: { label: 'Prime annuelle (juin/déc)', type: 'number', value: 0, unit: '€' }
        }
      },
      'temps-partiel': {
        cat: 'emploi', icon: '⏰', label: 'Passage temps partiel', date: 7,
        fields: {
          revenus: { label: 'Nouveau salaire net / mois', type: 'number', value: 850, unit: '€' },
          temps_travail: { label: 'Nouveau temps de travail', type: 'select', value: '50', options: [['30','30%'],['50','Mi-temps (50%)'],['80','80%']] }
        }
      },
      'mise-couple': {
        cat: 'foyer', icon: '💍', label: 'Mise en couple', date: 10,
        fields: {
          foyer: { label: 'Composition', type: 'select', value: 'couple', options: [['couple','En couple'],['1enfant','Couple + 1 enfant']] },
          revenus_conjoint: { label: 'Revenus du conjoint / mois', type: 'number', value: 1500, unit: '€' },
          loyer_partage: { label: 'Part du loyer prise par le conjoint', type: 'number', value: 50, unit: '%' }
        }
      },
      'separation': {
        cat: 'foyer', icon: '💔', label: 'Séparation', date: 9,
        fields: {
          foyer: { label: 'Nouvelle composition', type: 'select', value: 'seul', options: [['seul','Seul·e'],['1enfant','Seul·e + 1 enfant']] },
          pension_alimentaire: { label: 'Pension alimentaire (reçue +/versée −)', type: 'number', value: 0, unit: '€/mois' }
        }
      },
      'naissance': {
        cat: 'foyer', icon: '👶', label: "Naissance d'un enfant", date: 9,
        fields: {
          foyer: { label: 'Nouvelle composition', type: 'select', value: '1enfant', options: [['1enfant','+ 1 enfant'],['2enfants','+ 2 enfants']] },
          conge_parental: { label: 'Congé parental', type: 'select', value: 'non', options: [['non','Aucun'],['court','Court (~3 mois)'],['long','Long (~12 mois)']] },
          prime_naissance: { label: 'Prime à la naissance (ponctuel)', type: 'number', value: 1019, unit: '€' }
        }
      }
    };

    let chain = [];
    let selectedBlockId = null;
    let nextId = 1;

    function cloneTemplate(key) {
      const tpl = TEMPLATES[key];
      const clone = JSON.parse(JSON.stringify(tpl));
      clone.id = 'b' + (nextId++);
      clone.template = key;
      return clone;
    }

    chain.push(cloneTemplate('situation-initiale'));

    // ============ CALCUL ALS ============
    const PLAFOND_LOYER = { '1': 800, '2': 700, '3': 600 };

    function calculerALS(state) {
      const loyerPlafonne = Math.min(state.loyer, PLAFOND_LOYER[state.zone]);

      let personnesSupp = 0;
      if (state.foyer === 'couple') personnesSupp = 1;
      else if (state.foyer === '1enfant') personnesSupp = 1;
      else if (state.foyer === '2enfants') personnesSupp = 2;

      const forfaitCharges = 62 + (personnesSupp * 13);

      let revenus = state.revenus;
      if (state.foyer === 'couple' && state.revenus_conjoint) {
        revenus += state.revenus_conjoint;
      }

      const taux_effort = revenus < 800 ? 0.10 : revenus < 1500 ? 0.16 : revenus < 2500 ? 0.22 : 0.28;
      const participation = revenus * taux_effort;

      let als = (loyerPlafonne + forfaitCharges) - participation;
      return Math.max(0, Math.round(als));
    }

    function buildMonthlyStates() {
      const monthly = [];
      const init = chain.find(b => b.template === 'situation-initiale');

      for (let m = 0; m < 12; m++) {
        let state = {};
        if (init) {
          for (const k in init.fields) {
            const f = init.fields[k];
            state[k] = f.type === 'number' ? Number(f.value) : f.value;
          }
        }
        const blocs_actifs = chain
          .filter(b => b.template !== 'situation-initiale' && b.date <= m)
          .sort((a, b) => a.date - b.date);

        blocs_actifs.forEach(b => {
          for (const k in b.fields) {
            const f = b.fields[k];
            state[k] = f.type === 'number' ? Number(f.value) : f.value;
          }
        });

        monthly[m] = { mois: m, label: MOIS[m], state: Object.assign({}, state), als: calculerALS(state) };
      }
      return monthly;
    }

    // ============ RENDU CHAINE ============
    function renderChain() {
      const chainEl = document.getElementById('chain');
      chainEl.innerHTML = '';

      const sorted = chain.slice().sort((a, b) => a.date - b.date);

      if (sorted.length === 0) {
        chainEl.classList.add('empty');
        return;
      }
      chainEl.classList.remove('empty');

      sorted.forEach(b => {
        const el = document.createElement('div');
        el.className = 'chain-block cat-' + b.cat;
        if (b.id === selectedBlockId) el.classList.add('selected');
        el.dataset.id = b.id;

        let detail = '';
        if (b.fields.revenus) detail = b.fields.revenus.value + '€';
        else if (b.fields.loyer) detail = b.fields.loyer.value + '€';
        else if (b.fields.zone) detail = 'zone ' + b.fields.zone.value;
        else if (b.fields.foyer) detail = b.fields.foyer.value;

        el.innerHTML =
          (b.template !== 'situation-initiale' ? '<button class="chain-block-remove" data-remove="' + b.id + '">×</button>' : '') +
          '<div class="chain-block-icon">' + b.icon + '</div>' +
          '<div class="chain-block-date">' + MOIS[b.date] + ' 2026</div>' +
          '<div class="chain-block-label">' + b.label + '</div>' +
          '<div class="chain-block-detail">' + detail + '</div>';

        el.addEventListener('click', function(e) {
          if (e.target.dataset && e.target.dataset.remove) {
            removeBlock(e.target.dataset.remove);
            return;
          }
          selectBlock(b.id);
        });

        chainEl.appendChild(el);
      });
    }

    // ============ RENDU CHART ============
    function renderChart() {
      const svg = document.getElementById('chart');
      const data = buildMonthlyStates();

      const W = 800, H = 220;
      const margin = { top: 20, right: 30, bottom: 40, left: 50 };
      const innerW = W - margin.left - margin.right;
      const innerH = H - margin.top - margin.bottom;

      const maxVal = Math.max.apply(null, data.map(d => d.als).concat([400]));
      function yScale(v) { return margin.top + innerH - (v / maxVal) * innerH; }
      function xScale(i) { return margin.left + (i / 11) * innerW; }

      let svgContent = '';

      for (let i = 0; i <= 4; i++) {
        const y = margin.top + (i / 4) * innerH;
        const val = Math.round(maxVal * (1 - i / 4));
        svgContent += '<line x1="' + margin.left + '" y1="' + y + '" x2="' + (W - margin.right) + '" y2="' + y + '" stroke="#e6e6e6" stroke-width="1"/>';
        svgContent += '<text x="' + (margin.left - 8) + '" y="' + (y + 4) + '" font-size="10" fill="#757575" text-anchor="end">' + val + '€</text>';
      }

      for (let m = 0; m < 12; m++) {
        const x = xScale(m);
        svgContent += '<text x="' + x + '" y="' + (H - margin.bottom + 18) + '" font-size="10" fill="#757575" text-anchor="middle">' + MOIS[m] + '</text>';
      }

      // courbe en step
      let linePath = '';
      data.forEach(function(d, i) {
        const x = xScale(i);
        const y = yScale(d.als);
        if (i === 0) {
          linePath += 'M ' + x + ' ' + y + ' ';
        } else {
          const xm = xScale(i - 1) + (xScale(i) - xScale(i - 1)) / 2;
          linePath += 'L ' + xm + ' ' + yScale(data[i - 1].als) + ' L ' + xm + ' ' + y + ' L ' + x + ' ' + y + ' ';
        }
      });
      svgContent += '<path d="' + linePath + '" fill="none" stroke="#006bb6" stroke-width="2.5" stroke-linejoin="round"/>';

      // points et marqueurs d'événements
      const events = chain.filter(b => b.template !== 'situation-initiale');
      data.forEach(function(d, i) {
        const x = xScale(i);
        const y = yScale(d.als);
        const evt = events.find(e => e.date === i);

        if (evt) {
          let color = '#006bb6';
          if (evt.cat === 'logement') color = '#2e7d32';
          if (evt.cat === 'emploi') color = '#6a1b9a';
          if (evt.cat === 'foyer') color = '#c62828';

          svgContent += '<line x1="' + x + '" y1="' + margin.top + '" x2="' + x + '" y2="' + (margin.top + innerH) + '" stroke="' + color + '" stroke-width="1.5" stroke-dasharray="3,3" opacity="0.6"/>';
          svgContent += '<circle cx="' + x + '" cy="' + (margin.top - 8) + '" r="9" fill="' + color + '"/>';
          svgContent += '<text x="' + x + '" y="' + (margin.top - 4) + '" font-size="11" text-anchor="middle" fill="white">' + evt.icon + '</text>';
          svgContent += '<circle cx="' + x + '" cy="' + y + '" r="5" fill="white" stroke="' + color + '" stroke-width="2.5"/>';
        } else {
          svgContent += '<circle cx="' + x + '" cy="' + y + '" r="3" fill="#006bb6"/>';
        }
      });

      svg.innerHTML = svgContent;

      // stats
      const valsByMonth = data.map(d => d.als);
      document.getElementById('stat-min').textContent = Math.min.apply(null, valsByMonth) + ' €';
      document.getElementById('stat-max').textContent = Math.max.apply(null, valsByMonth) + ' €';
      document.getElementById('stat-total').textContent = valsByMonth.reduce((a, b) => a + b, 0).toLocaleString('fr-FR') + ' €';

      const initState = data[0].als;
      const finalState = data[11].als;
      const diff = finalState - initState;
      const diffEl = document.getElementById('stat-diff');
      diffEl.textContent = (diff >= 0 ? '+' : '') + diff + ' €/mois';
      diffEl.classList.remove('diff-pos', 'diff-neg');
      if (diff > 0) diffEl.classList.add('diff-pos');
      if (diff < 0) diffEl.classList.add('diff-neg');

      // rafraîchir la trace de calcul
      renderTrace(data);
    }

    // ============ TRACE DE CALCUL ============
    let selectedTraceMonth = null; // null = aucun sélectionné

    function calculerALSDetail(state) {
      // re-fait le calcul en exposant chaque étape
      const plafond = PLAFOND_LOYER[state.zone];
      const plafondMax = plafond;
      const loyerReel = Number(state.loyer) || 0;
      const loyerPlafonne = Math.min(loyerReel, plafondMax);

      let personnesSupp = 0;
      if (state.foyer === 'couple') personnesSupp = 1;
      else if (state.foyer === '1enfant') personnesSupp = 1;
      else if (state.foyer === '2enfants') personnesSupp = 2;

      const forfaitCharges = 62 + (personnesSupp * 13);

      let revenusBase = Number(state.revenus) || 0;
      let revenusConjoint = 0;
      if (state.foyer === 'couple' && state.revenus_conjoint) {
        revenusConjoint = Number(state.revenus_conjoint);
      }
      const revenusTotal = revenusBase + revenusConjoint;

      const taux = revenusTotal < 800 ? 0.10 : revenusTotal < 1500 ? 0.16 : revenusTotal < 2500 ? 0.22 : 0.28;
      const participation = revenusTotal * taux;

      const alsBrut = (loyerPlafonne + forfaitCharges) - participation;
      const alsFinal = Math.max(0, Math.round(alsBrut));

      return {
        loyerReel: loyerReel,
        plafond: plafond,
        plafondMax: Math.round(plafondMax),
        loyerPlafonne: Math.round(loyerPlafonne),
        loyerSurplus: Math.max(0, Math.round(loyerReel - plafondMax)),
        forfaitCharges: forfaitCharges,
        personnesSupp: personnesSupp,
        zone: state.zone,
        foyer: state.foyer,
        revenusBase: revenusBase,
        revenusConjoint: revenusConjoint,
        revenusTotal: revenusTotal,
        taux: taux,
        tauxPct: Math.round(taux * 100),
        participation: Math.round(participation),
        alsBrut: Math.round(alsBrut),
        als: alsFinal,
        plafondAtteint: loyerReel > plafondMax
      };
    }

    function renderTrace(data) {
      const monthsEl = document.getElementById('trace-months');
      const detailEl = document.getElementById('trace-detail');
      if (!monthsEl || !detailEl) return;

      // si aucun mois sélectionné, on prend le premier où une variation a lieu
      if (selectedTraceMonth === null) {
        const events = chain.filter(b => b.template !== 'situation-initiale').map(b => b.date).sort();
        selectedTraceMonth = events.length > 0 ? events[0] : 0;
      }

      // construire les onglets
      monthsEl.innerHTML = '';
      data.forEach(function(d, i) {
        const tab = document.createElement('button');
        tab.type = 'button';
        tab.className = 'trace-month-tab' + (i === selectedTraceMonth ? ' is-active' : '');
        tab.dataset.month = i;
        tab.innerHTML =
          '<span class="trace-month-tab__label">' + d.label + '</span>' +
          '<span class="trace-month-tab__value">' + d.als + ' €</span>';
        tab.addEventListener('click', function() {
          selectedTraceMonth = parseInt(tab.dataset.month);
          renderTrace(data);
        });
        monthsEl.appendChild(tab);
      });

      // titre du mois courant dans la barre
      const monthLabel = MOIS[selectedTraceMonth] + ' 2026';
      const currentEl = document.getElementById('trace-current-month');
      if (currentEl) currentEl.textContent = monthLabel + ' · ' + data[selectedTraceMonth].als + ' € d\'ALS';

      // rendu détail du mois
      const monthData = data[selectedTraceMonth];
      const detail = calculerALSDetail(monthData.state);

      const composFoyer = detail.foyer === 'seul' ? 'Seul·e'
        : detail.foyer === 'couple' ? 'En couple'
        : detail.foyer === '1enfant' ? '+ 1 enfant à charge'
        : '+ 2 enfants à charge';

      let html = '';
      html += '<div class="trace-detail__title">Calcul de l\'ALS pour ' + monthLabel + '</div>';
      html += '<div class="trace-detail__subtitle">' + composFoyer + ' · Zone ' + detail.zone + '</div>';

      // formule
      html += '<div class="trace-formula">';
      html += '<span class="comment">// Formule simplifiée ALS (extraite de Catala)</span><br>';
      html += '<span class="var">als</span> <span class="op">=</span> <span class="op">max(</span><span class="num">0</span><span class="op">,</span> <span class="op">(</span><span class="var">loyer_plafonné</span> <span class="op">+</span> <span class="var">forfait_charges</span><span class="op">)</span> <span class="op">−</span> <span class="var">participation_personnelle</span><span class="op">)</span><br>';
      html += '<span class="comment">// → max(0, (' + detail.loyerPlafonne + ' + ' + detail.forfaitCharges + ') − ' + detail.participation + ')</span><br>';
      html += '<span class="result">als = ' + detail.als + ' €</span>';
      html += '</div>';

      // lignes de calcul
      html += '<div class="trace-rows">';
      html += '<div class="lbl">Loyer réel déclaré</div><div class="val">' + detail.loyerReel + ' €</div>';
      html += '<div class="lbl">Plafond loyer (zone ' + detail.zone + ')</div><div class="val">' + detail.plafondMax + ' €</div>';
      html += '<div class="lbl">→ Loyer plafonné retenu</div><div class="val">' + detail.loyerPlafonne + ' €</div>';
      if (detail.plafondAtteint) {
        html += '<div class="lbl" style="color:#c62828">⚠ Plafond atteint, +' + detail.loyerSurplus + ' € non pris en compte</div><div class="val" style="color:#c62828">−</div>';
      }
      html += '<div class="lbl">Forfait charges (' + (detail.personnesSupp + 1) + ' pers.)</div><div class="val">+ ' + detail.forfaitCharges + ' €</div>';
      html += '<div class="lbl">Revenus retenus</div><div class="val">' + detail.revenusTotal + ' €</div>';
      if (detail.revenusConjoint > 0) {
        html += '<div class="lbl" style="padding-left:14px;font-size:11.5px;color:var(--grey-500)">dont conjoint</div><div class="val" style="font-size:11.5px;color:var(--grey-500)">' + detail.revenusConjoint + ' €</div>';
      }
      html += '<div class="lbl">Taux d\'effort appliqué</div><div class="val">' + detail.tauxPct + ' %</div>';
      html += '<div class="lbl">→ Participation personnelle</div><div class="val">− ' + detail.participation + ' €</div>';
      html += '<div class="lbl row--total">ALS du mois</div><div class="val row--total">' + detail.als + ' €</div>';
      html += '</div>';

      // contexte / explication
      const blocsCeMois = chain.filter(b => b.template !== 'situation-initiale' && b.date === selectedTraceMonth);
      if (blocsCeMois.length > 0) {
        html += '<div class="trace-context">';
        html += '<strong>Évènement(s) ce mois :</strong> ';
        html += blocsCeMois.map(b => b.icon + ' ' + b.label).join(', ');
        html += '. Le recalcul prend effet ce mois-ci.';
        html += '</div>';
      } else if (selectedTraceMonth > 0 && monthData.als !== data[selectedTraceMonth - 1].als) {
        html += '<div class="trace-context">Variation observée par rapport au mois précédent : ' + (monthData.als - data[selectedTraceMonth - 1].als > 0 ? '+' : '') + (monthData.als - data[selectedTraceMonth - 1].als) + ' €.</div>';
      }

      detailEl.innerHTML = html;
    }

    // ============ EDITION ============
    function selectBlock(id) {
      const block = chain.find(b => b.id === id);
      if (!block) return;
      if (selectedBlockId === id) { closeEdit(); return; }
      selectedBlockId = id;
      renderChain();
      openEdit(block);
    }

    function openEdit(block) {
      const panel = document.getElementById('edit-panel');
      const icon = document.getElementById('edit-icon');
      const title = document.getElementById('edit-title');
      const fieldsEl = document.getElementById('edit-fields');

      icon.textContent = block.icon;
      title.textContent = block.label + ' — ' + MOIS[block.date] + ' 2026';
      fieldsEl.innerHTML = '';

      if (block.template !== 'situation-initiale') {
        const dateField = document.createElement('div');
        dateField.className = 'edit-field';
        let optionsHtml = '';
        MOIS.forEach(function(m, i) {
          optionsHtml += '<option value="' + i + '"' + (i === block.date ? ' selected' : '') + '>' + m + ' 2026</option>';
        });
        dateField.innerHTML = '<label>Mois de l\'événement</label><select>' + optionsHtml + '</select>';
        fieldsEl.appendChild(dateField);
        dateField.querySelector('select').addEventListener('change', function(e) {
          block.date = Number(e.target.value);
          title.textContent = block.label + ' — ' + MOIS[block.date] + ' 2026';
          renderChain();
          renderChart();
        });
      }

      for (const key in block.fields) {
        const field = block.fields[key];
        const div = document.createElement('div');
        div.className = 'edit-field';
        if (field.type === 'number') {
          div.innerHTML = '<label>' + field.label + ' (' + (field.unit || '') + ')</label><input type="number" value="' + field.value + '">';
          div.querySelector('input').addEventListener('input', function(e) {
            block.fields[key].value = Number(e.target.value) || 0;
            renderChain();
            renderChart();
          });
        } else if (field.type === 'select') {
          let optHtml = '';
          field.options.forEach(function(o) {
            optHtml += '<option value="' + o[0] + '"' + (o[0] === field.value ? ' selected' : '') + '>' + o[1] + '</option>';
          });
          div.innerHTML = '<label>' + field.label + '</label><select>' + optHtml + '</select>';
          div.querySelector('select').addEventListener('change', function(e) {
            block.fields[key].value = e.target.value;
            renderChain();
            renderChart();
          });
        }
        fieldsEl.appendChild(div);
      }

      panel.classList.add('open');
    }

    function closeEdit() {
      selectedBlockId = null;
      document.getElementById('edit-panel').classList.remove('open');
      renderChain();
    }

    document.getElementById('edit-close').addEventListener('click', closeEdit);

    // ============ AJOUT / SUPPRESSION ============
    function addBlock(templateKey, overrides) {
      const events = chain.filter(b => b.template !== 'situation-initiale');
      const newBlock = cloneTemplate(templateKey);
      if (events.length > 0) {
        const lastDate = Math.max.apply(null, events.map(e => e.date));
        newBlock.date = Math.min(11, lastDate + 2);
      }
      // appliquer les overrides éventuels depuis le mini-formulaire de la palette
      if (overrides) {
        if (typeof overrides.date === 'number') newBlock.date = overrides.date;
        if (overrides.fields) {
          for (const k in overrides.fields) {
            if (newBlock.fields[k]) {
              newBlock.fields[k].value = overrides.fields[k];
            }
          }
        }
      }
      chain.push(newBlock);
      selectedBlockId = newBlock.id;
      renderChain();
      renderChart();
      openEdit(newBlock);
    }

    function removeBlock(id) {
      chain = chain.filter(b => b.id !== id);
      if (selectedBlockId === id) closeEdit();
      renderChain();
      renderChart();
    }

    // ============ ENRICHISSEMENT PALETTE (mini-formulaires) ============
    function enrichPaletteCards() {
      document.querySelectorAll('.palette-block').forEach(function(card) {
        const tplKey = card.dataset.template;
        const tpl = TEMPLATES[tplKey];
        if (!tpl) return;

        // déjà enrichie ? on saute
        if (card.querySelector('.palette-block-form')) return;

        // restructurer : on déplace icône + texte dans un head
        const icon = card.querySelector('.palette-block-icon');
        const text = card.querySelector('.palette-block-text');
        if (!icon || !text) return;

        // vider et reconstruire
        card.innerHTML = '';

        const head = document.createElement('div');
        head.className = 'palette-block-head';
        head.appendChild(icon);
        head.appendChild(text);
        card.appendChild(head);

        const form = document.createElement('div');
        form.className = 'palette-block-form';

        // champ MOIS (toujours, sauf situation-initiale qui n'est pas dans la palette)
        const monthField = document.createElement('div');
        monthField.className = 'palette-block-field';
        let optsMois = '';
        MOIS.forEach(function(m, i) {
          const sel = (i === tpl.date) ? ' selected' : '';
          optsMois += '<option value="' + i + '"' + sel + '>' + m + '</option>';
        });
        monthField.innerHTML = '<label>Mois</label><select data-pal-field="date">' + optsMois + '</select>';
        form.appendChild(monthField);

        // pour chaque champ principal du template, on génère un input
        // (priorité : revenus > loyer > revenus_conjoint > zone > foyer)
        const priority = ['revenus', 'loyer', 'revenus_conjoint', 'zone', 'foyer'];
        const shown = new Set();
        priority.forEach(function(k) {
          if (!tpl.fields[k] || shown.has(k)) return;
          const f = tpl.fields[k];
          const fieldDiv = document.createElement('div');
          fieldDiv.className = 'palette-block-field';
          if (f.type === 'number') {
            fieldDiv.innerHTML = '<label>' + f.label + (f.unit ? ' (' + f.unit + ')' : '') + '</label><input type="number" data-pal-field="' + k + '" value="' + f.value + '">';
          } else if (f.type === 'select') {
            let opts = '';
            f.options.forEach(function(o) {
              const sel = (o[0] === f.value) ? ' selected' : '';
              opts += '<option value="' + o[0] + '"' + sel + '>' + o[1] + '</option>';
            });
            fieldDiv.innerHTML = '<label>' + f.label + '</label><select data-pal-field="' + k + '">' + opts + '</select>';
          }
          form.appendChild(fieldDiv);
          shown.add(k);
        });

        // bouton ajouter
        const btn = document.createElement('button');
        btn.className = 'palette-block-add';
        btn.type = 'button';
        btn.dataset.palAddTpl = tplKey;
        btn.textContent = 'Ajouter au parcours';
        form.appendChild(btn);

        card.appendChild(form);
      });
    }

    // appeler après init des templates
    enrichPaletteCards();

    // ============ CLIC PALETTE — bouton "Ajouter au parcours" ============
    // event delegation : on attache UN seul listener au document
    // (déclenche addBlock uniquement sur clic du bouton, pas de la carte entière)
    document.addEventListener('click', function(e) {
      const addBtn = e.target.closest && e.target.closest('.palette-block-add');
      if (addBtn && addBtn.dataset.palAddTpl) {
        const tpl = addBtn.dataset.palAddTpl;
        if (!TEMPLATES[tpl]) return;
        // collecter les valeurs saisies dans la carte
        const card = addBtn.closest('.palette-block');
        const overrides = { fields: {} };
        if (card) {
          card.querySelectorAll('[data-pal-field]').forEach(function(el) {
            const k = el.dataset.palField;
            if (k === 'date') {
              overrides.date = parseInt(el.value);
            } else {
              const tplField = TEMPLATES[tpl].fields[k];
              if (tplField) {
                overrides.fields[k] = tplField.type === 'number'
                  ? (Number(el.value) || 0)
                  : el.value;
              }
            }
          });
        }
        addBlock(tpl, overrides);
      }
    });

    // ============ RESET ============
    document.getElementById('reset').addEventListener('click', function() {
      if (chain.length <= 1) return;
      if (confirm('Réinitialiser le parcours ?')) {
        chain = [cloneTemplate('situation-initiale')];
        closeEdit();
        renderChain();
        renderChart();
      }
    });

    // ============ TRACE TOGGLE ============
    const traceToggle = document.getElementById('trace-toggle');
    if (traceToggle) {
      traceToggle.addEventListener('click', function() {
        const isOpen = traceToggle.getAttribute('aria-expanded') === 'true';
        traceToggle.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
      });
    }

    // ============ INIT ============
    renderChain();
    renderChart();

  } catch (err) {
    const box = document.getElementById('error-box');
    if (box) {
      box.classList.add('show');
      box.textContent = 'Erreur d\'initialisation : ' + err.message + '\n\n' + (err.stack || '');
    }
  }

});

/* ============================================================ */

(function() {
  const state = {
    phase: 'start',
    currentTaskIdx: 0,
    currentEntretienIdx: 0,
    data: {
      meta: { protocole: 'proto2_simulateur_de_vie', started_at: null, finished_at: null, pseudo: null, profil_detail: null },
      phases: {
        scenario: { duration_s: 0, intuition: null },
        libre: { duration_s: 0, notes: null },
        taches: [],
        entretien: { reponses: {}, echelles: {} }
      }
    },
    timers: {
      libre_start: null, libre_elapsed: 0,
      scenario_start: null,
      task_timers: {}
    },
    tasks: [
      {
        id: 1,
        fn: "Explorer",
        text: "Avant de simuler quoi que ce soit, prenez en main l'outil : repérez la palette de blocs à gauche, la frise de 12 mois et le graphique d'évolution. Placez n'importe quel bloc pour voir comment ça fonctionne.",
        hint: "Indice : cliquez sur un bloc de la palette, il s'ajoute à la frise. Vous pouvez ensuite cliquer dessus pour modifier ses paramètres."
      },
      {
        id: 2,
        fn: "Prévoir",
        text: "Simulez le déménagement de Marie D. en mai 2026 : nouveau loyer de 650 € (zone 2, T2). Identifiez l'effet sur le montant de l'ALS à partir de mai.",
        hint: "Indice : ajoutez un bloc « Déménagement (loyer +) » à mai, fixez le loyer à 650 € et vérifiez que la zone reste sur Zone 2. Regardez la courbe : monte-t-elle ou descend-elle ?"
      },
      {
        id: 3,
        fn: "Comparer scénarios",
        text: "Sans toucher au déménagement, ajoutez maintenant le passage à temps plein en septembre 2026 (salaire porté à 2 000 €/mois). Comparez le montant d'ALS d'août (avant) avec celui d'octobre (après). De combien l'ALS baisse-t-elle ?",
        hint: "Indice : utilisez le bouton « Reprise d'emploi » pour ajouter le bloc à septembre et fixez le salaire à 2 000 €. Regardez les chiffres du graphique entre août et octobre."
      },
      {
        id: 4,
        fn: "Repérer les seuils",
        text: "Toujours avec les deux blocs en place, observez le graphique mois par mois. Y a-t-il un mois où l'ALS chute brutalement ou atteint un montant très bas ? Quel événement provoque la plus forte baisse ?",
        hint: "Indice : utilisez les indicateurs Min / Max au-dessus du graphique et la trace de calcul mois par mois pour identifier le point de bascule."
      },
      {
        id: 5,
        fn: "Décider",
        text: "Au tout début du test, vous avez écrit votre intuition : qu'est-ce qui allait le plus changer l'ALS, le déménagement ou le passage à temps plein ? Maintenant que vous avez simulé, votre intuition s'est-elle vérifiée ? Que conseilleriez-vous concrètement à Marie D. ?",
        hint: "Aucun indice. Cette tâche n'a pas de bonne réponse, juste la vôtre.",
        showFirstReaction: true
      }
    ]
  };

  // ----- ELEMENTS -----
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
    state.data.meta.profil_detail = document.getElementById('test-profil-detail').value || null;
    setPhase('scenario');
  });

  // ----- SCÉNARIO : nav 2 sous-écrans -----
  function showScenarioStep(step) {
    document.querySelectorAll('[data-scenario-step]').forEach(el => {
      el.classList.toggle('test-hidden', el.dataset.scenarioStep !== step);
    });
    const box = document.querySelector('#test-overlay-scenario .test-overlay__box');
    if (box) box.scrollTop = 0;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  document.getElementById('test-scenario-next-btn').addEventListener('click', () => showScenarioStep('question'));
  document.getElementById('test-scenario-back-btn').addEventListener('click', () => showScenarioStep('presentation'));

  document.getElementById('test-to-libre-btn').addEventListener('click', () => {
    state.data.phases.scenario.intuition = document.getElementById('test-q-scenario').value || null;
    if (state.timers.scenario_start) {
      state.data.phases.scenario.duration_s = Math.floor((Date.now() - state.timers.scenario_start) / 1000);
    }
    startTuto();
  });

  // ----- TUTO -----
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

  // ----- TIMERS -----
  let libreInterval = null;
  function startLibreTimer() {
    if (libreInterval) return;
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

  // ----- escape -----
  function escapeHTML(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
  }

  // ============================================================================
  // TÂCHES — carrousel
  // ============================================================================
  function renderTasks() {
    const container = document.getElementById('test-tasks-container');
    const dotsContainer = document.getElementById('test-tasks-dots');
    container.innerHTML = '';
    dotsContainer.innerHTML = '';
    document.getElementById('test-task-total').textContent = state.tasks.length;

    state.tasks.forEach((task, idx) => {
      if (!state.data.phases.taches[idx]) {
        state.data.phases.taches[idx] = { id: task.id, text: task.text, result: null, how: null, duration_s: 0, start_ts: null };
      }
      const slide = document.createElement('div');
      slide.className = 'test-tasks-carousel__slide';
      slide.dataset.slideIdx = idx;

      const firstReactionBlock = task.showFirstReaction ? `
        <div class="test-task__first-reaction">
          <div class="test-task__first-reaction-label">Au début du test, vous aviez écrit :</div>
          <blockquote class="test-task__first-reaction-text" id="test-first-reaction-text-${idx}">
            <em>(aucune réponse n'a été donnée)</em>
          </blockquote>
        </div>` : '';

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
            </details>` : ''}
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
        </div>`;
      container.appendChild(slide);

      if (task.showFirstReaction) {
        const reactionText = state.data?.phases?.scenario?.intuition;
        if (reactionText && reactionText.trim()) {
          const tgt = slide.querySelector(`#test-first-reaction-text-${idx}`);
          if (tgt) tgt.innerHTML = '« ' + escapeHTML(reactionText.trim()) + ' »';
        }
      }

      const dot = document.createElement('button');
      dot.className = 'test-tasks-carousel__dot';
      dot.dataset.dotIdx = idx;
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
    if (!state.data.phases.taches[idx].result) startTaskTimer(idx);
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
    btn.disabled = !(t._draft_result && t.how && t.how.trim().length > 0);
  }
  document.getElementById('test-task-prev').addEventListener('click', () => goToTask(state.currentTaskIdx - 1));
  document.getElementById('test-task-next').addEventListener('click', () => goToTask(state.currentTaskIdx + 1));

  // ============================================================================
  // ENTRETIEN — carrousel 12 slides
  // ============================================================================
  const ENTRETIEN_ITEMS = [
    { type: 'open', id: 'q1', num: 'Q1', text: "Qu'est-ce qui vous a surpris dans cet outil ?", placeholder: "Une chose, plusieurs choses, en bien ou en mal..." },
    { type: 'open', id: 'q2', num: 'Q2', text: "Est-ce que les blocs de la palette couvrent les situations que vous pourriez vraiment rencontrer ? Lesquels manquent ?", placeholder: "Réponse libre, exemples bienvenus." },
    { type: 'open', id: 'q3', num: 'Q3', text: "Avez-vous compris comment un changement à un mois donné affectait les mois suivants ? Sur quel élément du simulateur cela apparaît clairement ?", placeholder: "Réponse libre." },
    { type: 'open', id: 'q4', num: 'Q4', text: "Est-ce que vous comprenez mieux le calcul de votre ALS maintenant qu'au début ?", placeholder: "Réponse libre." },
    { type: 'open', id: 'q5', num: 'Q5', text: "Après avoir simulé, vous sentez-vous capable d'identifier vous-même le mois où votre situation devient économiquement difficile ?", placeholder: "Et si oui, comment ? Si non, qu'est-ce qui manque dans l'outil ?" },
    { type: 'open', id: 'q6', num: 'Q6', text: "Est-ce que vous utiliseriez ce simulateur dans la vraie vie, avant un vrai changement de situation ?", placeholder: "Réponse libre." },
    { type: 'scale', id: 'comprehension', num: 'E1', label: "Compréhension", desc: "L'outil m'a aidée à comprendre comment mon ALS va évoluer." },
    { type: 'scale', id: 'anticipation',  num: 'E2', label: "Anticipation",  desc: "Je peux maintenant prévoir l'effet d'un changement avant qu'il arrive." },
    { type: 'scale', id: 'autonomie',     num: 'E3', label: "Autonomie",     desc: "Avec cet outil, je peux comprendre l'impact d'un changement de vie sans avoir besoin d'aide extérieure." },
    { type: 'scale', id: 'confiance',     num: 'E4', label: "Confiance",     desc: "Je fais davantage confiance aux chiffres après avoir simulé moi-même." },
    { type: 'open', id: 'q7', num: 'Q7', text: "Si vous pouviez changer une seule chose dans cet outil, ce serait quoi ?", placeholder: "La chose qui vous a le plus manqué ou le plus gêné." },
    { type: 'open', id: 'q8', num: 'Q8', text: "À qui donneriez-vous cet outil ? À qui surtout pas ?", placeholder: "Réponse libre." }
  ];

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
              <textarea class="test-textarea" data-entretien-open="${idx}" placeholder="${item.placeholder}"></textarea>
            </div>
            <div class="test-task__validate-row">
              <button class="test-btn test-task__validate" data-entretien-validate="${idx}" disabled>${btnLabel}</button>
            </div>
          </div>`;
      } else {
        slide.innerHTML = `
          <div class="test-task">
            <div class="test-task__header-row">
              <div class="test-task__num">${idx + 1} / ${ENTRETIEN_ITEMS.length}</div>
              <div class="test-task__fn">Échelle ${item.num}</div>
            </div>
            <div class="test-task__text">${item.label}</div>
            <p style="font-size: 13px; color: var(--test-mute); font-style: italic; margin-bottom: 14px;">${item.desc}</p>
            <div class="test-scale" data-entretien-scale="${idx}">
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
          </div>`;
      }
      container.appendChild(slide);

      const dot = document.createElement('button');
      dot.className = 'test-tasks-carousel__dot';
      dot.dataset.entretienDotIdx = idx;
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
    const answered = item.type === 'open'
      ? !!(state.data.phases.entretien.reponses[item.id] && state.data.phases.entretien.reponses[item.id].trim())
      : !!state.data.phases.entretien.echelles[item.id];
    btn.disabled = !answered;
  }

  // ----- NAVIGATION PHASES -----
  document.querySelectorAll('[data-test-next]').forEach(btn => {
    btn.addEventListener('click', () => {
      if (state.phase === 'libre') {
        state.data.phases.libre.notes = document.getElementById('test-q-libre').value || null;
        state.data.phases.libre.duration_s = state.timers.libre_elapsed + (state.timers.libre_start ? Math.floor((Date.now() - state.timers.libre_start) / 1000) : 0);
      }
      setPhase(btn.dataset.testNext);
    });
  });

  // ----- TOGGLE PANEL -----
  document.getElementById('test-panel-toggle').addEventListener('click', () => {
    panel.classList.toggle('is-open');
    document.body.classList.toggle('test-panel-open', panel.classList.contains('is-open'));
    updateTopbarToggle();
  });

  // (Bloc téléchargement JSON retiré : sauvegarde gérée par save.php côté serveur)

  // ============================================================================
  // SYNC MODULE — sauvegarde locale + envoi serveur
  // ============================================================================
  const SYNC_ENDPOINT = "save.php";
  const SYNC_PROTO_KEY = "proto2";
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
    "CAF": { title: "CAF — Caisse d'Allocations Familiales", body: "Organisme local de la branche famille de la Sécurité sociale, en charge du versement des prestations familiales et sociales. 101 CAF locales en France." },
    "CNAF": { title: "CNAF — Caisse Nationale des Allocations Familiales", body: "Tête de réseau des 101 CAF locales. Conçoit les outils informatiques et les règles de gestion communes au réseau." },
    "DGFiP": { title: "DGFiP — Direction Générale des Finances Publiques", body: "Administration fiscale française. Transmet automatiquement les revenus aux organismes sociaux." },
    "France Travail": { title: "France Travail", body: "Nouveau nom de Pôle Emploi depuis le 1er janvier 2024. Service public de l'emploi." },
    "DSN": { title: "DSN — Déclaration Sociale Nominative", body: "Déclaration mensuelle obligatoire des employeurs qui transmet salaires et cotisations à l'administration." },
    "APL": { title: "APL — Aide Personnalisée au Logement", body: "Aide pour les logements conventionnés (conventions État-bailleur). Régie par le Code de la construction et de l'habitation." },
    "ALS": { title: "ALS — Allocation de Logement Sociale", body: "Aide pour les personnes ne touchant ni l'APL ni l'ALF (étudiants, jeunes actifs, ménages sans enfant). Régie par le Code de la sécurité sociale. C'est l'aide que touche Marie D." },
    "ALF": { title: "ALF — Allocation de Logement Familiale", body: "Aide pour les ménages avec enfants ou personnes à charge, sans condition de logement conventionné." },
    "CRISTAL": { title: "CRISTAL", body: "Application informatique interne à la CNAF qui gère l'ensemble des dossiers allocataires et exécute les calculs de prestations. Écrit en COBOL pour l'essentiel." },
    "DRM": { title: "DRM — Dispositif de Ressources Mensuelles", body: "Système d'échange automatique qui transmet à la CAF les ressources de l'allocataire chaque mois. Mis en place avec la contemporanéité des aides en 2021." },
    "RFR": { title: "RFR — Revenu Fiscal de Référence", body: "Chiffre annuel calculé par les impôts à partir de la déclaration de revenus. Sert d'étalon pour de nombreuses prestations sociales. Créé par la loi de finances pour 1997." },
    "loyer plafond": { title: "Loyer plafond", body: "Montant maximum du loyer pris en compte dans le calcul, fixé par décret selon la zone géographique et la composition du foyer. Au-delà, le surplus n'augmente pas l'aide." },
    "Loyer plafonné": { title: "Loyer plafonné", body: "Synonyme de loyer plafond. Montant maximum pris en compte dans le barème." },
    "zone 1": { title: "Zone 1", body: "Zonage géographique des aides au logement. Zone 1 = Paris et communes limitrophes, où les loyers sont les plus élevés. Le plafond de loyer pris en compte y est le plus haut." },
    "zone 2": { title: "Zone 2", body: "Zonage géographique des aides au logement. Zone 2 = agglomérations de plus de 100 000 habitants. Lyon est en zone 2. C'est la zone de Marie D." },
    "zone 3": { title: "Zone 3", body: "Zonage géographique des aides au logement. Zone 3 = reste du territoire, où les loyers et donc les plafonds sont les plus bas." },
    "indu": { title: "Indu", body: "Somme versée à tort par l'administration. Doit normalement être remboursée par l'allocataire, sauf remise de dette accordée à titre exceptionnel." },
    "trop-perçu": { title: "Trop-perçu", body: "Synonyme d'indu. Somme versée en excès par la CAF, que l'allocataire doit rembourser." },
    "recouvrement": { title: "Recouvrement", body: "Procédure par laquelle l'administration récupère une somme due. Pour la CAF, principalement par retenue automatique sur prestations futures." },
    "contemporanéisation": { title: "Contemporanéisation", body: "Réforme du 1er janvier 2021. Les aides au logement sont calculées sur les 12 derniers mois glissants de revenus, et non plus sur N-2. Recalcul tous les 3 mois." },
    "contemporanéité": { title: "Contemporanéité", body: "Principe selon lequel les aides au logement sont calculées en temps quasi réel sur les ressources des 12 derniers mois, depuis la réforme de 2021." }
  };

  const tip = document.getElementById('glossary-tooltip');
  const tipTitle = document.getElementById('glossary-tooltip-title');
  const tipBody = document.getElementById('glossary-tooltip-body');
  const tipClose = document.getElementById('glossary-tooltip-close');
  let currentTarget = null;

  function closeTip() { tip.classList.remove('is-open'); currentTarget = null; }
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
    if (left + tipRect.width > window.innerWidth - margin) left = window.innerWidth - tipRect.width - margin;
    if (top + tipRect.height > window.innerHeight - margin) top = rect.top - tipRect.height - margin;
    tip.style.left = Math.max(margin, left) + 'px';
    tip.style.top = Math.max(margin, top) + 'px';
    currentTarget = targetEl;
  }
  tipClose.addEventListener('click', e => { e.stopPropagation(); closeTip(); });
  document.addEventListener('click', e => {
    if (currentTarget && !tip.contains(e.target) && !e.target.classList.contains('glossary-term')) closeTip();
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeTip(); });
  window.addEventListener('resize', closeTip);
  window.addEventListener('scroll', closeTip, true);

  const sortedKeys = Object.keys(glossaire).sort((a, b) => b.length - a.length);
  function escapeRegex(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

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
      if (p.classList && (p.classList.contains('glossary-term') || p.classList.contains('source'))) return;
      if (['TEXTAREA','INPUT','BUTTON','A','SCRIPT','STYLE','CODE','PRE','LABEL','OPTION','SELECT'].includes(p.tagName)) return;
      p = p.parentNode;
    }
    const frag = document.createDocumentFragment();
    while ((match = re.exec(text)) !== null) {
      if (match.index > lastIdx) frag.appendChild(document.createTextNode(text.slice(lastIdx, match.index)));
      const term = match[0];
      const span = document.createElement('span');
      span.className = 'glossary-term';
      span.textContent = term;
      span.dataset.gloss = term;
      span.addEventListener('click', e => {
        e.stopPropagation();
        if (currentTarget === span) closeTip();
        else showTip(span, term);
      });
      frag.appendChild(span);
      lastIdx = re.lastIndex;
    }
    if (lastIdx === 0) return;
    if (lastIdx < text.length) frag.appendChild(document.createTextNode(text.slice(lastIdx)));
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
    // Cibles : intro-bar du simulateur + edit-panel (paramètres des blocs)
    document.querySelectorAll('.intro-bar, .edit-panel, .palette-card').forEach(scanZone);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();