const deployables = document.querySelectorAll('.deployable');
const panels = document.querySelectorAll('.unfold-panel');
const closeBtns = document.querySelectorAll('.unfold-close');

function closeAllPanels(except) {
  panels.forEach(p => {
    if (p.dataset.panel !== except) {
      p.classList.remove('open');
      p.querySelectorAll('.layer-2-content, .layer-3-content, .layer-4-content').forEach(c => c.classList.remove('open'));
      p.querySelectorAll('.layer-link').forEach(l => l.classList.remove('active'));
    }
  });
  deployables.forEach(d => { if (d.dataset.key !== except) d.classList.remove('active'); });
}

function openPanel(key) {
  closeAllPanels(key);
  const panel = document.querySelector(`.unfold-panel[data-panel="${key}"]`);
  const trigger = document.querySelector(`.deployable[data-key="${key}"]`);
  if (!panel) return;
  if (panel.classList.contains('open')) {
    panel.classList.remove('open');
    panel.querySelectorAll('.layer-2-content, .layer-3-content, .layer-4-content').forEach(c => c.classList.remove('open'));
    panel.querySelectorAll('.layer-link').forEach(l => l.classList.remove('active'));
    trigger?.classList.remove('active');
  } else {
    panel.classList.add('open');
    trigger?.classList.add('active');
    setTimeout(() => panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 100);
  }
}

deployables.forEach(d => {
  d.addEventListener('click', (e) => {
    e.preventDefault();
    openPanel(d.dataset.key);
  });
});

closeBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const panel = btn.closest('.unfold-panel');
    panel.classList.remove('open');
    panel.querySelectorAll('.layer-2-content, .layer-3-content, .layer-4-content').forEach(c => c.classList.remove('open'));
    panel.querySelectorAll('.layer-link').forEach(l => l.classList.remove('active'));
    document.querySelector(`.deployable[data-key="${panel.dataset.panel}"]`)?.classList.remove('active');
  });
});

document.querySelectorAll('.layer-link').forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.target;
    let el;
    if (btn.classList.contains('layer-2-link')) el = document.querySelector(`[data-layer2="${target}"]`);
    if (btn.classList.contains('layer-3-link')) el = document.querySelector(`[data-layer3="${target}"]`);
    if (btn.classList.contains('layer-4-link')) el = document.querySelector(`[data-layer4="${target}"]`);
    if (!el) return;
    el.classList.toggle('open');
    btn.classList.toggle('active', el.classList.contains('open'));
    if (el.classList.contains('open')) {
      setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 100);
    }
  });
});

document.getElementById('expand-all').addEventListener('click', () => {
  panels.forEach(p => {
    p.classList.add('open');
    p.querySelectorAll('.layer-2-content, .layer-3-content, .layer-4-content').forEach(c => c.classList.add('open'));
    p.querySelectorAll('.layer-link').forEach(l => l.classList.add('active'));
  });
  deployables.forEach(d => d.classList.add('active'));
});

document.getElementById('collapse-all').addEventListener('click', () => {
  panels.forEach(p => {
    p.classList.remove('open');
    p.querySelectorAll('.layer-2-content, .layer-3-content, .layer-4-content').forEach(c => c.classList.remove('open'));
    p.querySelectorAll('.layer-link').forEach(l => l.classList.remove('active'));
  });
  deployables.forEach(d => d.classList.remove('active'));
});

/* ============================================================ */

(function() {
  // ----- STATE -----
  const state = {
    phase: 'start', // start | scenario | libre | taches | entretien | fin
    data: {
      meta: {
        protocole: 1,
        nom: "La décision dépliable",
        started_at: null,
        finished_at: null,
        pseudo: null,
        profil: null
      },
      phases: {
        scenario: { reaction: null, duration_s: 0 },
        libre: { notes: null, duration_s: 0 },
        taches: [],
        entretien: { reponses: {}, echelles: {} }
      },
      interactions: {
        deployables_opened: [],  // [{key, opened_at_phase, ts}]
        deployables_total_opens: {}, // {key: count}
        layer_links_clicked: []   // [{target, type, ts}]
      }
    },
    timers: {
      libre_start: null,
      libre_elapsed: 0,
      scenario_start: null,
      task_timers: {}
    },
    tasks: [
      {
        id: 1,
        fn: "Lire",
        text: "Retrouvez dans le document d'où vient le montant de 199 € (votre nouveau droit ALS à partir de janvier 2026). Notez les étapes du calcul que vous avez suivies pour y arriver.",
        hint: "Indice : suivez les chiffres soulignés en orange."
      },
      {
        id: 2,
        fn: "Comprendre",
        text: "Le mot « loyer plafond » apparaît dans le document. Trouvez-le et expliquez avec vos propres mots ce qu'il veut dire.",
        hint: "Indice : ouvrez l'élément concerné, puis lisez la couche En clair."
      },
      {
        id: 3,
        fn: "Comparer",
        text: "Le document indique que vous avez reçu 1 213 € alors que vous aviez droit à 793 €. Identifiez dans le document ce qui a changé entre ces deux montants.",
        hint: "Indice : ouvrez l'élément « 793 € » pour comprendre d'où vient le nouveau calcul."
      },
      {
        id: 4,
        fn: "Imputer + contester",
        text: "Imaginez que vous trouvez le calcul faux. Dans le document, trouvez d'abord qui est responsable du recalcul, puis ce que vous pouvez faire pour le contester.",
        hint: "Indice : regardez les couches Code & responsable et Loi."
      },
      {
        id: 5,
        fn: "Ressentir",
        text: "Au tout début du test, vous avez écrit votre première réaction à la notification. Maintenant que vous avez exploré le document, votre réaction a-t-elle changé ? En quoi ?",
        hint: "Aucun indice ici. Cette tâche n'a pas de bonne réponse, juste la vôtre.",
        showFirstReaction: true
      }
    ]
  };

  // ----- ÉCRANS -----
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

    // gestion timers
    if (phase !== 'libre') stopLibreTimer();

    if (phase === 'start') {
      showOverlay(overlayStart);
      topbar.classList.add('test-hidden');
      panel.classList.add('test-hidden');
      document.body.classList.remove('test-active', 'test-panel-open');
    }
    else if (phase === 'scenario') {
      showOverlay(overlayScenario);
      showScenarioStep('presentation');
      topbar.classList.add('test-hidden');
      panel.classList.add('test-hidden');
      document.body.classList.remove('test-active', 'test-panel-open');
      if (!state.timers.scenario_start) state.timers.scenario_start = Date.now();
    }
    else if (phase === 'libre') {
      showOverlay(null);
      topbar.classList.remove('test-hidden');
      panel.classList.remove('test-hidden');
      document.body.classList.add('test-active');
      // panel ouvert par défaut au démarrage de l'exploration
      panel.classList.add('is-open');
      document.body.classList.add('test-panel-open');
      updateTopbarToggle();
      showPanelPhase('libre');
      updateTopbarLabels('Exploration libre', 33);
      startLibreTimer();
    }
    else if (phase === 'taches') {
      showOverlay(null);
      topbar.classList.remove('test-hidden');
      panel.classList.remove('test-hidden');
      panel.classList.add('is-open');
      document.body.classList.add('test-active', 'test-panel-open');
      updateTopbarToggle();
      renderTasks();
      showPanelPhase('taches');
      updateTopbarLabels('Tâches dirigées', 66);
    }
    else if (phase === 'entretien') {
      showOverlay(null);
      topbar.classList.remove('test-hidden');
      panel.classList.remove('test-hidden');
      panel.classList.add('is-open');
      document.body.classList.add('test-active', 'test-panel-open');
      updateTopbarToggle();
      renderEntretien();
      showPanelPhase('entretien');
      updateTopbarLabels('Entretien de retour', 90);
    }
    else if (phase === 'fin') {
      // arrêter tous les timers
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
    if (panel.classList.contains('is-open')) {
      btn.innerHTML = 'Fermer le test ›';
    } else {
      btn.innerHTML = '‹ Ouvrir le test';
    }
  }

  // ----- ACCUEIL : consent + start -----
  const consentBox = document.getElementById('test-consent');
  const startBtn = document.getElementById('test-start-btn');
  consentBox.addEventListener('change', () => {
    startBtn.disabled = !consentBox.checked;
  });
  startBtn.addEventListener('click', () => {
    state.data.meta.started_at = new Date().toISOString();
    state.data.meta.pseudo = document.getElementById('test-pseudo').value || null;
    state.data.meta.profil = document.getElementById('test-profil').value || null;
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
    // remonter en haut quand on change
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

  // ----- SCÉNARIO : passage au tuto -----
  document.getElementById('test-to-libre-btn').addEventListener('click', () => {
    state.data.phases.scenario.reaction = document.getElementById('test-q-scenario').value || null;
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
    // on masque les overlays, on affiche déjà le proto en arrière-plan
    showOverlay(null);
    topbar.classList.remove('test-hidden');
    panel.classList.remove('test-hidden');
    panel.classList.add('is-open');
    document.body.classList.add('test-active', 'test-panel-open');
    updateTopbarToggle();
    showPanelPhase('libre');
    updateTopbarLabels('Exploration libre', 33);
    // on superpose le tuto
    tutoEl.classList.remove('test-hidden');
    tutoBubble1.classList.add('is-active');
    tutoBubble2.classList.remove('is-active');
  }

  function endTuto() {
    tutoEl.classList.add('test-hidden');
    // lance vraiment la phase libre (timer compris)
    setPhase('libre');
  }

  document.getElementById('test-tuto-next-1').addEventListener('click', () => {
    tutoBubble1.classList.remove('is-active');
    tutoBubble2.classList.add('is-active');
  });
  document.getElementById('test-tuto-next-2').addEventListener('click', endTuto);
  document.getElementById('test-tuto-skip-1').addEventListener('click', endTuto);
  document.getElementById('test-tuto-skip-2').addEventListener('click', endTuto);

  // ----- TIMER PHASE LIBRE -----
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
  // index de la tâche affichée
  state.currentTaskIdx = 0;

  function updateValidateBtn(taskIdx) {
    const t = state.data.phases.taches[taskIdx];
    const btn = document.querySelector(`[data-task-validate="${taskIdx}"]`);
    if (!btn) return;
    const hasResult = !!t._draft_result;
    const hasHow = t.how && t.how.trim().length > 0;
    btn.disabled = !(hasResult && hasHow);
  }

  function escapeHTML(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function renderTasks() {
    const container = document.getElementById('test-tasks-container');
    const dotsContainer = document.getElementById('test-tasks-dots');
    container.innerHTML = '';
    dotsContainer.innerHTML = '';

    // total dans l'indicateur
    document.getElementById('test-task-total').textContent = state.tasks.length;

    state.tasks.forEach((task, idx) => {
      if (!state.data.phases.taches[idx]) {
        state.data.phases.taches[idx] = {
          id: task.id,
          text: task.text,
          result: null,
          how: null,
          duration_s: 0,
          start_ts: null
        };
      }

      // slide
      const slide = document.createElement('div');
      slide.className = 'test-tasks-carousel__slide';
      slide.dataset.slideIdx = idx;
      // bloc première réaction (uniquement tâche 5)
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

      // si c'est la tâche 5, on injecte la première réaction quand elle existe
      if (task.showFirstReaction) {
        const reactionText = state.data?.phases?.scenario?.reaction;
        if (reactionText && reactionText.trim()) {
          const tgt = slide.querySelector(`#test-first-reaction-text-${idx}`);
          if (tgt) tgt.innerHTML = '« ' + escapeHTML(reactionText.trim()) + ' »';
        }
      }

      // dot
      const dot = document.createElement('button');
      dot.className = 'test-tasks-carousel__dot';
      dot.dataset.dotIdx = idx;
      dot.setAttribute('aria-label', `Tâche ${task.id}`);
      dot.addEventListener('click', () => goToTask(idx));
      dotsContainer.appendChild(dot);
    });

    // restaurer les valeurs déjà saisies (si retour en arrière)
    state.data.phases.taches.forEach((t, idx) => {
      if (t.result) {
        const btn = container.querySelector(`.test-result-btn[data-task="${idx}"][data-result="${t.result}"]`);
        if (btn) btn.classList.add('is-selected');
        t._draft_result = t.result;
      }
      if (t.how) {
        const ta = container.querySelector(`[data-task-how="${idx}"]`);
        if (ta) ta.value = t.how;
      }
      updateValidateBtn(idx);
    });

    // listeners boutons résultat — plus d'avancement auto
    container.querySelectorAll('.test-result-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const taskIdx = parseInt(btn.dataset.task);
        const result = btn.dataset.result;
        container.querySelectorAll(`.test-result-btn[data-task="${taskIdx}"]`).forEach(b => b.classList.remove('is-selected'));
        btn.classList.add('is-selected');
        // résultat stocké provisoirement (sera confirmé au clic Valider)
        state.data.phases.taches[taskIdx]._draft_result = result;
        updateValidateBtn(taskIdx);
      });
    });

    // listeners textarea
    container.querySelectorAll('[data-task-how]').forEach(ta => {
      ta.addEventListener('input', () => {
        const taskIdx = parseInt(ta.dataset.taskHow);
        state.data.phases.taches[taskIdx].how = ta.value;
        updateValidateBtn(taskIdx);
      });
    });

    // listeners bouton valider
    container.querySelectorAll('[data-task-validate]').forEach(btn => {
      btn.addEventListener('click', () => {
        const taskIdx = parseInt(btn.dataset.taskValidate);
        const t = state.data.phases.taches[taskIdx];
        // confirmer le résultat
        if (t._draft_result) {
          t.result = t._draft_result;
        }
        stopTaskTimer(taskIdx);
        updateDots();
        // dernière tâche ? on reste, l'utilisatrice clique sur "Passer à l'entretien" en bas
        if (taskIdx === state.tasks.length - 1) {
          btn.textContent = '✓ Tâche validée';
          btn.disabled = true;
          return;
        }
        // sinon, on passe à la suivante
        goToTask(taskIdx + 1);
      });
    });

    // démarrer sur la première tâche en attente
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
    // démarrer le timer si la tâche n'est pas encore validée
    if (!state.data.phases.taches[idx].result) {
      startTaskTimer(idx);
    }
    // remonter en haut du body
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

  // listeners flèches
  document.getElementById('test-task-prev').addEventListener('click', () => {
    goToTask(state.currentTaskIdx - 1);
  });
  document.getElementById('test-task-next').addEventListener('click', () => {
    goToTask(state.currentTaskIdx + 1);
  });

  function startTaskTimer(idx) {
    if (state.timers.task_timers[idx]) return;
    if (!state.data.phases.taches[idx].start_ts) {
      state.data.phases.taches[idx].start_ts = Date.now();
    }
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
  // ENTRETIEN — carrousel de 12 slides
  // ============================================================================
  const ENTRETIEN_ITEMS = [
    { type: 'open', id: 'q1',  num: 'Q1', text: "Qu'est-ce qui vous a surpris dans cet outil ?", placeholder: "Une chose, plusieurs choses, en bien ou en mal..." },
    { type: 'open', id: 'q2',  num: 'Q2', text: "À quel moment avez-vous compris la logique des 4 couches (En clair / Loi / Code / Pourquoi) ?", placeholder: "Tout de suite, après plusieurs essais, jamais vraiment..." },
    { type: 'open', id: 'q3',  num: 'Q3', text: "Y a-t-il une couche qui vous a paru inutile ou au contraire indispensable ?", placeholder: "Réponse libre." },
    { type: 'open', id: 'q4',  num: 'Q4', text: "Est-ce que vous comprenez mieux votre ALS maintenant qu'au début ?", placeholder: "Réponse libre." },
    { type: 'open', id: 'q5',  num: 'Q5', text: "Si vous trouviez une erreur dans le calcul, est-ce que l'outil vous donne envie de contester ?", placeholder: "Et si oui, comment ? Si non, qu'est-ce qui manque ?" },
    { type: 'open', id: 'q6',  num: 'Q6', text: "Est-ce que vous utiliseriez ce document dans la vraie vie ?", placeholder: "Réponse libre." },
    { type: 'scale', id: 'comprehension', num: 'E1', label: "Compréhension", desc: "L'outil m'a aidée à comprendre comment mon ALS est calculée." },
    { type: 'scale', id: 'confiance',     num: 'E2', label: "Confiance",     desc: "Après ce test, j'ai plus confiance dans le calcul de la CAF." },
    { type: 'scale', id: 'autonomie',     num: 'E3', label: "Autonomie",     desc: "Avec cet outil, je pourrais agir seule si je trouvais une erreur." },
    { type: 'scale', id: 'charge',        num: 'E4', label: "Charge cognitive", desc: "L'outil reste simple à utiliser même quand on est stressée." },
    { type: 'open', id: 'q7', num: 'Q7', text: "Si vous pouviez changer une seule chose dans cet outil, ce serait quoi ?", placeholder: "La chose qui vous a le plus manqué ou le plus gêné." },
    { type: 'open', id: 'q8', num: 'Q8', text: "À qui donneriez-vous cet outil ? À qui surtout pas ?", placeholder: "Réponse libre." }
  ];

  state.currentEntretienIdx = 0;

  function renderEntretien() {
    const container = document.getElementById('test-entretien-container');
    const dotsContainer = document.getElementById('test-entretien-dots');
    if (!container || container.dataset.rendered === '1') return; // une seule fois
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

      // dot — cliquable uniquement vers une question déjà validée (pas de skip avant)
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

    // attacher les listeners
    container.querySelectorAll('[data-entretien-open]').forEach(ta => {
      ta.addEventListener('input', () => {
        const slideIdx = parseInt(ta.dataset.entretienOpen);
        const item = ENTRETIEN_ITEMS[slideIdx];
        state.data.phases.entretien.reponses[item.id] = ta.value || null;
        updateEntretienValidate(slideIdx);
        // (le save() de l'event 'input' global au document s'en charge)
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
        // marquer la question comme validée (utilisé pour le dot et l'état des flèches)
        state.data.phases.entretien.validated = state.data.phases.entretien.validated || {};
        state.data.phases.entretien.validated[slideIdx] = true;
        updateEntretienDots();
        // sauvegarde + envoi serveur dès qu'une question est validée
        if (typeof state._save === 'function') state._save();
        // dernière question : on active le bouton "Terminer le test" du footer
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

    // flèches : on n'autorise le retour qu'aux questions DÉJÀ VALIDÉES, et l'avance
    //           UNIQUEMENT à la question suivante si la courante est validée.
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
      const item = ENTRETIEN_ITEMS[idx];
      const answered = item.type === 'open'
        ? !!(state.data.phases.entretien.reponses[item.id] && state.data.phases.entretien.reponses[item.id].trim())
        : !!state.data.phases.entretien.echelles[item.id];
      dot.classList.toggle('is-active', idx === state.currentEntretienIdx);
      dot.classList.toggle('is-done', !!validated[idx] && idx !== state.currentEntretienIdx);
      // verrou visuel : les questions au-delà de la courante non validées sont grisées
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

  // ----- BOUTONS DE NAVIGATION ENTRE PHASES -----
  document.querySelectorAll('[data-test-next]').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.testNext;
      // sauvegarder selon phase courante
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

  // ----- TRACKING DES INTERACTIONS AVEC LE PROTO -----
  // (les éléments .deployable et .layer-link sont définis dans le proto original)
  document.querySelectorAll('.deployable').forEach(d => {
    d.addEventListener('click', () => {
      const key = d.dataset.key;
      if (!key) return;
      // n'enregistrer que si le test est commencé (pas en accueil/scenario)
      if (state.phase === 'start' || state.phase === 'scenario') return;
      state.data.interactions.deployables_opened.push({
        key: key,
        phase: state.phase,
        ts: new Date().toISOString()
      });
      state.data.interactions.deployables_total_opens[key] = (state.data.interactions.deployables_total_opens[key] || 0) + 1;
    });
  });

  document.querySelectorAll('.layer-link').forEach(btn => {
    btn.addEventListener('click', () => {
      if (state.phase === 'start' || state.phase === 'scenario') return;
      const target = btn.dataset.target;
      let type = '';
      if (btn.classList.contains('layer-2-link')) type = 'layer-2';
      else if (btn.classList.contains('layer-3-link')) type = 'layer-3';
      else if (btn.classList.contains('layer-4-link')) type = 'layer-4';
      state.data.interactions.layer_links_clicked.push({
        target: target,
        type: type,
        phase: state.phase,
        ts: new Date().toISOString()
      });
    });
  });

  // (Bloc téléchargement JSON retiré : sauvegarde gérée par save.php côté serveur)

  // ============================================================================
  // SYNC MODULE — sauvegarde locale + envoi serveur
  // ============================================================================
  // Configuration : URL de l'endpoint PHP qui reçoit les résultats.
  // Mets l'URL complète, par exemple :
  //   "https://boitesnoires.example.com/save.php"
  // Si tu testes en local, laisse une chaîne vide : seule la sauvegarde
  // localStorage sera active (pas d'envoi serveur).
  const SYNC_ENDPOINT = "save.php";
  const SYNC_PROTO_KEY = "proto1";
  const SYNC_STORAGE_KEY = "boites_noires_session_" + SYNC_PROTO_KEY;

  // génère un id de session court et stable
  function generateSessionId() {
    return 'xxxxxxxx-xxxx'.replace(/x/g, () =>
      Math.floor(Math.random() * 16).toString(16)
    );
  }

  // session_id : unique par testeur, persistant dans localStorage
  let sessionId = null;
  try {
    const stored = localStorage.getItem(SYNC_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed && parsed.session_id) sessionId = parsed.session_id;
    }
  } catch (e) { /* localStorage indisponible */ }
  if (!sessionId) sessionId = generateSessionId();

  // restaure l'état si une session existe déjà
  function restoreState() {
    try {
      const stored = localStorage.getItem(SYNC_STORAGE_KEY);
      if (!stored) return false;
      const parsed = JSON.parse(stored);
      if (!parsed || !parsed.data) return false;
      // fusion : on remplace state.data par celui sauvegardé
      // (les champs manquants côté stocké sont préservés)
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
      if (parsed.data.interactions) {
        Object.assign(state.data.interactions, parsed.data.interactions);
      }
      return true;
    } catch (e) {
      console.warn('Restauration impossible', e);
      return false;
    }
  }

  // sauvegarde locale
  function saveLocal() {
    try {
      localStorage.setItem(SYNC_STORAGE_KEY, JSON.stringify({
        session_id: sessionId,
        saved_at: new Date().toISOString(),
        data: state.data
      }));
    } catch (e) { /* quota ou indisponible */ }
  }

  // envoi serveur — debounced 800ms
  let syncTimer = null;
  function syncToServer() {
    if (!SYNC_ENDPOINT) return; // pas d'endpoint configuré
    if (syncTimer) clearTimeout(syncTimer);
    syncTimer = setTimeout(() => {
      const payload = {
        proto: SYNC_PROTO_KEY,
        session_id: sessionId,
        data: state.data
      };
      try {
        fetch(SYNC_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
          keepalive: true
        }).catch(() => { /* offline ou erreur réseau, on s'en remet à beforeunload */ });
      } catch (e) { /* ignore */ }
    }, 800);
  }

  // sauvegarde locale + envoi serveur
  function save() {
    saveLocal();
    syncToServer();
  }

  // envoi garanti au déchargement (onglet fermé, navigation, etc.)
  function syncOnUnload() {
    if (!SYNC_ENDPOINT) return;
    const payload = {
      proto: SYNC_PROTO_KEY,
      session_id: sessionId,
      data: state.data
    };
    try {
      const blob = new Blob([JSON.stringify(payload)], { type: 'application/json' });
      navigator.sendBeacon(SYNC_ENDPOINT, blob);
    } catch (e) { /* ignore */ }
  }
  window.addEventListener('beforeunload', syncOnUnload);
  window.addEventListener('pagehide', syncOnUnload);
  // sur mobile : envoi quand l'onglet devient invisible
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') syncOnUnload();
  });

  // exposer save() pour que le reste du code puisse l'appeler
  state._save = save;

  // restaurer ce qui peut l'être avant l'init
  const wasRestored = restoreState();

  // monkey-patch setPhase pour déclencher save() à chaque transition
  // (setPhase est déclarée plus haut dans le scope avec `function`, donc accessible
  //  via une closure ; on enrobe l'appel à l'init en gardant la référence)
  const _setPhaseOriginal = setPhase;
  function setPhaseAndSave(phase) {
    _setPhaseOriginal(phase);
    save();
  }

  // sauvegarde périodique de secours (toutes les 30s) au cas où le serveur
  // soit indisponible au moment d'une étape
  setInterval(save, 30000);

  // sauvegarde aussi à chaque saisie sur les textareas et inputs (debounced)
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
  // Définitions
  const glossaire = {
    "CAF": {
      title: "CAF — Caisse d'Allocations Familiales",
      body: "Organisme local de la branche famille de la Sécurité sociale. En charge du versement des prestations familiales et sociales. Il y a 101 CAF locales en France."
    },
    "CNAF": {
      title: "CNAF — Caisse Nationale des Allocations Familiales",
      body: "Tête de réseau des 101 CAF locales. Conçoit les outils informatiques et les règles de gestion communes à l'ensemble du réseau."
    },
    "DGFiP": {
      title: "DGFiP — Direction Générale des Finances Publiques",
      body: "Administration fiscale française. Collecte les impôts et transmet automatiquement les revenus aux organismes sociaux comme la CAF."
    },
    "France Travail": {
      title: "France Travail",
      body: "Service public de l'emploi. C'est le nouveau nom de Pôle Emploi depuis le 1er janvier 2024. Transmet à la CAF les périodes d'inscription et d'indemnisation."
    },
    "DSN": {
      title: "DSN — Déclaration Sociale Nominative",
      body: "Déclaration mensuelle obligatoire que tous les employeurs transmettent à l'administration. Elle remplace plusieurs déclarations en une seule et permet à la CAF de connaître vos salaires."
    },
    "DITP": {
      title: "DITP — Direction Interministérielle de la Transformation Publique",
      body: "Service de l'État qui pilote la simplification administrative et la transformation des services publics."
    },
    "IGAS": {
      title: "IGAS — Inspection Générale des Affaires Sociales",
      body: "Corps de contrôle interministériel sur les politiques sociales. Produit des rapports d'évaluation, notamment sur la sécurité sociale et les prestations."
    },
    "IGF": {
      title: "IGF — Inspection Générale des Finances",
      body: "Corps de contrôle sur les finances publiques. Mène souvent des missions conjointes avec l'IGAS sur les sujets sociaux à forte composante budgétaire."
    },
    "APL": {
      title: "APL — Aide Personnalisée au Logement",
      body: "Aide au logement pour les logements conventionnés (conventions État-bailleur). Régie par le Code de la construction et de l'habitation. À distinguer de l'ALS et de l'ALF."
    },
    "ALS": {
      title: "ALS — Allocation de Logement Sociale",
      body: "Aide au logement pour les personnes qui ne touchent ni l'APL ni l'ALF : étudiants, jeunes actifs, ménages sans enfant. Régie par le Code de la sécurité sociale (L831-1 et suivants). C'est l'aide que touche Marie D."
    },
    "ALF": {
      title: "ALF — Allocation de Logement Familiale",
      body: "Aide au logement pour les ménages avec enfants ou personnes à charge, sans condition de logement conventionné. La plus ancienne des trois aides (1948)."
    },
    "CRISTAL": {
      title: "CRISTAL",
      body: "Application informatique interne à la CNAF qui gère l'ensemble des dossiers allocataires et exécute les calculs de prestations. Tourne en grande partie en COBOL, un langage des années 1960 encore utilisé pour des raisons de stabilité."
    },
    "NIR": {
      title: "NIR — Numéro d'Inscription au Répertoire",
      body: "Le « numéro de sécurité sociale » de chaque personne, à 13 chiffres + clé. Sert d'identifiant unique pour les échanges entre administrations."
    },
    "DRM": {
      title: "DRM — Dispositif de Ressources Mensuelles",
      body: "Système d'échange entre administrations qui transmet automatiquement les ressources à la CAF chaque mois. Permet le calcul « en temps réel » des aides, sans déclaration manuelle de l'allocataire."
    },
    "RFR": {
      title: "RFR — Revenu Fiscal de Référence",
      body: "Chiffre annuel calculé par les impôts à partir de votre déclaration. Il sert d'étalon pour de nombreuses prestations sociales. Créé par la loi de finances pour 1997."
    },
    "Loyer plafonné": {
      title: "Loyer plafonné",
      body: "Montant maximum du loyer pris en compte dans le calcul de l'aide, fixé par décret selon la zone géographique et la composition du foyer. Au-delà de ce plafond, le surplus n'augmente pas l'aide."
    },
    "Charges forfaitaires": {
      title: "Charges forfaitaires",
      body: "Montant fixe ajouté au loyer dans le calcul, censé représenter les charges locatives (eau, ascenseur, entretien). Défini chaque année par arrêté."
    },
    "Loyer minimal": {
      title: "Loyer minimal",
      body: "Minimum de loyer que l'allocataire doit assumer lui-même avant que l'aide entre en jeu. Joue le rôle d'une franchise."
    },
    "Participation personnelle": {
      title: "Participation personnelle",
      body: "Part variable du loyer que l'allocataire doit payer de sa poche, calculée en fonction de ses ressources. Plus les revenus sont élevés, plus elle augmente."
    },
    "indu": {
      title: "Indu",
      body: "Somme versée à tort par l'administration (trop-perçu). Elle doit normalement être remboursée par l'allocataire, sauf en cas de remise de dette (procédure exceptionnelle)."
    },
    "recouvrement": {
      title: "Recouvrement",
      body: "Procédure par laquelle l'administration récupère une somme due. Pour la CAF, principalement par retenue automatique sur les prestations futures. Plus rarement par voie d'huissier."
    },
    "contemporanéisation": {
      title: "Contemporanéisation",
      body: "Réforme entrée en vigueur le 1er janvier 2021. Les aides au logement sont calculées sur les 12 derniers mois glissants de revenus, et non plus sur les revenus N-2. Recalcul tous les 3 mois. Présentée comme une justice mais source d'instabilité pour les allocataires."
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
    // afficher pour mesurer
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
    // si pas la place en bas, on met en haut
    if (top + tipRect.height > window.innerHeight - margin) {
      top = rect.top - tipRect.height - margin;
    }
    tip.style.left = Math.max(margin, left) + 'px';
    tip.style.top = Math.max(margin, top) + 'px';
    currentTarget = targetEl;
  }

  tipClose.addEventListener('click', e => {
    e.stopPropagation();
    closeTip();
  });
  document.addEventListener('click', e => {
    if (currentTarget && !tip.contains(e.target) && !e.target.classList.contains('glossary-term')) {
      closeTip();
    }
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeTip();
  });
  window.addEventListener('resize', closeTip);
  window.addEventListener('scroll', closeTip, true);

  // ----- Scan et wrap des termes dans les zones cibles -----
  // Important : on n'enrobe que dans les unfold-panels (pas dans le courrier officiel)
  const sortedKeys = Object.keys(glossaire).sort((a, b) => b.length - a.length); // les plus longs d'abord

  function escapeRegex(s) {
    return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  function wrapTermsInTextNode(node) {
    if (!node.nodeValue || !node.nodeValue.trim()) return;
    const text = node.nodeValue;
    // construire une regex globale pour tous les termes
    const pattern = sortedKeys.map(k => '\\b' + escapeRegex(k) + '\\b').join('|');
    const re = new RegExp(pattern, 'g');
    let match;
    let lastIdx = 0;
    const parent = node.parentNode;
    if (!parent) return;
    // ignorer si on est déjà dans un glossary-term ou dans un input/textarea/code
    let p = parent;
    while (p && p !== document.body) {
      if (p.classList && (p.classList.contains('glossary-term') || p.classList.contains('catala-block') || p.classList.contains('law-tag') || p.classList.contains('source'))) return;
      if (['TEXTAREA','INPUT','BUTTON','A','SCRIPT','STYLE'].includes(p.tagName)) return;
      p = p.parentNode;
    }
    const frag = document.createDocumentFragment();
    while ((match = re.exec(text)) !== null) {
      // texte avant le match
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
    if (lastIdx === 0) return; // aucun match
    if (lastIdx < text.length) {
      frag.appendChild(document.createTextNode(text.slice(lastIdx)));
    }
    parent.replaceChild(frag, node);
  }

  function scanZone(zone) {
    if (!zone) return;
    // collecter tous les text nodes d'abord (pour pas casser l'itération)
    const walker = document.createTreeWalker(zone, NodeFilter.SHOW_TEXT, null);
    const nodes = [];
    let n;
    while ((n = walker.nextNode())) nodes.push(n);
    nodes.forEach(wrapTermsInTextNode);
  }

  // Lancer le scan sur les dépliants après chargement
  function init() {
    document.querySelectorAll('.unfold-panel').forEach(scanZone);
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();