/*
  Scrigno digitale segreto — versione WOW, a capitoli e buste apribili.

  Nota importante sul PIN:
  su GitHub Pages il codice JavaScript è visibile a chiunque apra gli strumenti sviluppatore.
  L'hash SHA-256 rende il PIN meno esplicito nel file, ma NON è vera sicurezza: è un effetto scenico,
  perfetto per creare atmosfera e sorpresa.

  PIN di esempio attuale: 1234
  Per cambiarlo: apri questo sito nel browser, vai nella console e scrivi:
  generatePinHash("IL_TUO_NUOVO_PIN").then(console.log)
  Poi incolla il risultato in CONFIG.pinHash.

  Musica:
  per usare una canzone, inserisci il file in assets/audio/canzone.mp3 oppure cambia CONFIG.musicSrc.
*/

const CONFIG = {
  friendName: "Niky",
  senderName: "Sergio",
  pinHash: "03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4", // PIN demo: 1234
  birthdayText: "La mulți ani",
  musicSrc: "assets/audio/canzone.mp3",
  musicVolume: 0.34,
  photos: [
    { src: "assets/img/foto1.jpg", caption: "Una giornata da tenere" },
    { src: "assets/img/foto2.jpg", caption: "Una risata che non serve spiegare" },
    { src: "assets/img/foto3.jpg", caption: "Noi, probabilmente mentre facevamo qualcosa di discutibile" },
    { src: "assets/img/foto4.jpg", caption: "Un momento piccolo, ma nostro" },
    { src: "assets/img/foto5.jpg", caption: "La prova che certe persone cambiano le giornate" },
    { src: "assets/img/foto6.jpg", caption: "Questa la capiamo solo noi" }
  ],
  timeline: [
    { title: "La prima complicità", text: "Quel momento in cui una persona smette di essere nuova e inizia a sembrare stranamente familiare." },
    { title: "Le risate stupide", text: "Quelle che partono dal nulla, peggiorano in fretta e diventano impossibili da spiegare a chiunque altro." },
    { title: "I giorni pieni", text: "Giornate normali che, per qualche motivo, con te diventano ricordi." },
    { title: "I discorsi seri", text: "Quelli in cui ci si ascolta davvero, senza dover sistemare tutto, ma restando presenti." },
    { title: "Le foto discutibili", text: "Prove ufficiali che l’imbarazzo, con la persona giusta, diventa materiale prezioso." },
    { title: "Il filo invisibile", text: "Quella cosa difficile da spiegare, ma facile da sentire: sapere che una persona conta, anche quando non serve dirlo ogni minuto." }
  ]
};

const wrongPinMessages = [
  "Mmm… quasi. Lo scrigno è un po’ testardo.",
  "Nope. Però apprezzo il tentativo.",
  "Indizio: pensa a qualcosa che appartiene solo a voi."
];

const memoryCards = [
  { icon: "☼", title: "Più leggerezza", text: "Da quando ci sei tu, certe giornate sembrano meno pesanti. Anche quando non cambia nulla fuori, cambia qualcosa dentro." },
  { icon: "✦", title: "Più ricordi", text: "In un anno e mezzo abbiamo raccolto momenti che sembrano già capitoli interi. Alcuni fanno ridere, altri stringono il cuore, altri li capiamo solo noi." },
  { icon: "〰", title: "Più verità", text: "Con certe persone non serve fingere troppo. Si può essere stanchi, strani, felici, confusi, e sentirsi comunque al posto giusto." },
  { icon: "◌", title: "Più vita", text: "La tua presenza ha aggiunto colore alle cose normali. E questa, secondo me, è una delle magie più belle che una persona possa fare." }
];

const affirmations = [
  "Vali molto più dei giorni in cui ti senti piccola.",
  "Hai una luce che non sempre vedi, ma che gli altri sentono.",
  "Non sei difficile da voler bene. Sei profonda, e le cose profonde vanno capite con cura.",
  "Quando dipingi, si vede che dentro di te esiste un mondo pieno di colori, sensibilità e pensieri che non tutti saprebbero trasformare in bellezza.",
  "Nello sport non sei forte solo per quello che riesci a fare. Sei forte perché continui, perché provi, perché nonostante la testa a volte faccia rumore, tu trovi un modo per andare avanti.",
  "Ti scoraggi, sì. Ma questo non cancella il tuo valore. Anzi, rende ancora più bella la forza con cui ogni volta torni in piedi.",
  "Hai il dono raro di rendere speciali anche i momenti semplici.",
  "Non devi diventare più dura, più perfetta o più simile agli altri per meritare amore, amicizia e stima. Sei già abbastanza. Sei già tanto."
];

const letterParagraphs = [
  "Quando ti scoraggi, vorrei poterti prestare per un attimo il modo in cui ti vedo io.",
  "Perché tu, nei tuoi giorni difficili, forse vedi solo quello che manca. Io invece vedo tutto quello che sei.",
  "Vedo una persona sensibile, anche quando prova a fare la forte.",
  "Vedo una persona che sente tanto, e proprio per questo a volte si stanca.",
  "Vedo una persona con talento, con cuore, con un modo tutto suo di rendere più belle le cose.",
  "Vedo una persona che cade nei pensieri, ma poi cerca comunque una strada per rialzarsi.",
  "E se qualche volta ti sembrerà di non valere abbastanza, torna qui.",
  `Questo posto esiste anche per questo: per ricordarti che almeno una persona, ${CONFIG.senderName}, non ha dubbi su di te.`
];

const manualArticles = [
  "Articolo 1: le risate stupide valgono come cura ufficiale.",
  "Articolo 2: una foto venuta male non si elimina. Si conserva come reperto storico.",
  "Articolo 3: se una cosa la capiamo solo noi, allora probabilmente è importante.",
  "Articolo 4: quando una delle due persone si scoraggia, l’altra ha il compito sacro di ricordarle quanto vale.",
  "Articolo 5: prendere in giro è consentito solo se sotto c’è affetto vero.",
  "Articolo 6: certe amicizie non si spiegano bene. Si vivono, si proteggono e si ringraziano.",
  "Articolo 7: nei giorni no sono ammessi messaggi confusi, sfoghi, silenzi strani e ritorni alla normalità senza troppe spiegazioni.",
  "Articolo 8: questa amicizia è ufficialmente classificata come cosa bella."
];

const emergencyMotivations = [
  "Respira. Non devi sistemare tutta la vita oggi.",
  "Promemoria ufficiale: sei molto più capace di quanto pensi.",
  `${CONFIG.senderName} conferma: sei rara.`,
  "Oggi non devi essere perfetta. Devi solo essere gentile con te stessa.",
  "Hai già superato giorni che sembravano impossibili.",
  "La tua versione stanca merita affetto quanto la tua versione migliore.",
  "Non credere a tutti i pensieri brutti che ti passano per la testa.",
  "Sei una persona preziosa anche quando non hai energia per dimostrarlo."
];

const admirationNotes = [
  "Io ammiro la tua sensibilità, anche quando ti pesa.",
  "Ammiro il tuo talento, anche quando tu lo minimizzi.",
  "Ammiro il modo in cui metti qualcosa di tuo nelle cose che fai.",
  "Ammirare te significa vedere una persona che forse non si rende conto abbastanza di quanta bellezza porta.",
  "Ammiro la tua forza non rumorosa: quella che magari tu non chiami forza, ma che si vede nel modo in cui continui."
];

const capsuleNotes = [
  "Non sei troppo. Sei una persona che sente molto. E sentire molto, a volte, è faticoso. Ma è anche una parte enorme della tua bellezza.",
  "Non sei in ritardo sulla vita. Stai facendo il tuo percorso, con i tuoi tempi, le tue curve, le tue ripartenze. Questo non ti rende meno valida.",
  "Quando la giornata pesa, non devi vincerla tutta. Basta un gesto piccolo: bere acqua, respirare, mandare un messaggio, ricordarti che non devi fare tutto da sola."
];

const finalLetterParagraphs = [
  "Non so sempre trovare le parole giuste. A volte scherzo, a volte cambio argomento, a volte faccio finta che certe cose siano più leggere di quanto siano.",
  "Però questa volevo dirtela bene.",
  "In questo anno e mezzo sei diventata una presenza enorme nella mia vita. Una di quelle persone che arrivano e, senza chiedere troppo spazio, finiscono per renderlo tutto un po’ più bello.",
  "Sei stata risata, confronto, caos, leggerezza, ascolto, memoria, compagnia.",
  "Sei stata una di quelle amicizie che non si programmano, ma quando succedono ti fanno pensare: meno male.",
  "Meno male che ci sei. Meno male che ci siamo trovati. Meno male che, tra tutte le persone possibili, la vita mi ha messo accanto proprio un’amica come te.",
  "Spero che questo compleanno ti ricordi almeno un po’ quello che io vedo chiaramente: che sei speciale, che vali, che hai dentro cose bellissime, e che la tua presenza è un regalo per chi sa guardarti davvero.",
  "Non devi essere perfetta per essere importante. Non devi dimostrare sempre qualcosa per meritare affetto. Non devi brillare ogni giorno per essere luce.",
  "A volte basta che tu sia tu.",
  "E fidati: è già tantissimo.",
  "Buon compleanno. Ti voglio bene più di quanto questo sito riesca a dire."
];

const photoSecrets = [
  "Questo è uno di quei frammenti che diventano casa.",
  "Qui probabilmente stava succedendo qualcosa di assurdo. E va benissimo così.",
  "Reperto storico ufficiale. Non discutere con l’archivio.",
  "Alcune cose piccole, dopo, diventano enormi.",
  "La prova che certe presenze cambiano proprio il colore delle giornate.",
  "Questa la capiamo solo noi. Ed è già abbastanza."
];

const state = {
  wrongAttempts: 0,
  currentChapter: 0,
  typedKeys: "",
  hasTypedHero: false,
  affirmationIndex: 0,
  letterIndex: 0,
  finalIndex: 0,
  articleIndex: 0,
  footerStarClicks: 0,
  lockStampClicks: 0,
  motivationClicks: 0,
  openedChapters: new Set(),
  isMusicPlaying: false,
  audioUnavailable: false,
  ambientMusic: null
};

const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

window.addEventListener("DOMContentLoaded", init);

function init() {
  applyConfig();
  renderChapterDots();
  renderTimelineTickets();
  renderGallery();
  renderConstellation();
  setupPinLock();
  setupChapterControls();
  setupCovers();
  setupMemorySwitcher();
  setupAffirmations();
  setupLetterReveal();
  setupManual();
  setupGalleryInteractions();
  setupCertificatePrint();
  setupCapsule();
  setupFinalLetter();
  setupMusic();
  setupEasterEggs();
  updateChapterUI();
}

function applyConfig() {
  $$('[data-friend-name]').forEach((element) => { element.textContent = CONFIG.friendName; });
  $$('[data-sender-name]').forEach((element) => { element.textContent = CONFIG.senderName; });
  $$('[data-birthday-text]').forEach((element) => { element.textContent = CONFIG.birthdayText; });
  document.title = `${CONFIG.birthdayText}, ${CONFIG.friendName}`;
}

function renderChapterDots() {
  const dots = $('#chapterDots');
  if (!dots) return;
  const chapters = $$('.chapter');
  dots.innerHTML = chapters.map((chapter, index) => `
    <button class="chapter-dot" type="button" data-go-chapter="${index}" aria-label="Vai a ${escapeHtml(chapter.dataset.title || `capitolo ${index + 1}`)}"></button>
  `).join('');
}

function renderTimelineTickets() {
  const grid = $('#timelineTickets');
  if (!grid) return;
  grid.innerHTML = CONFIG.timeline.map((item, index) => `
    <button class="ticket" type="button" data-timeline="${index}">
      <small>tappa ${index + 1}</small>
      ${escapeHtml(item.title)}
    </button>
  `).join('');

  grid.addEventListener('click', (event) => {
    const button = event.target.closest('[data-timeline]');
    if (!button) return;
    const item = CONFIG.timeline[Number(button.dataset.timeline)];
    const reader = $('#timelineReader');
    if (!reader || !item) return;
    reader.innerHTML = `
      <p class="reader-kicker">piccola cosa enorme</p>
      <h3>${escapeHtml(item.title)}</h3>
      <p>${escapeHtml(item.text)}</p>
    `;
    animateIn(reader);
    tinySparkles(button, 7);
  });
}

function renderGallery() {
  const gallery = $('#photoGallery');
  if (!gallery) return;

  gallery.innerHTML = CONFIG.photos.slice(0, 6).map((photo, index) => `
    <figure class="polaroid" tabindex="0" role="button" aria-label="Apri polaroid ${index + 1}">
      <div class="photo-frame" data-secret="${escapeHtml(photoSecrets[index] || 'Ricordo segreto.')}" >
        <img src="${escapeHtml(photo.src)}" alt="${escapeHtml(photo.caption)}" loading="lazy" onload="this.parentElement.classList.add('has-image')" onerror="this.remove()" />
        <span class="photo-placeholder">foto da aggiungere</span>
      </div>
      <figcaption>${escapeHtml(photo.caption)}</figcaption>
    </figure>
  `).join('');
}

function renderConstellation() {
  const area = $('#admirationConstellation');
  if (!area) return;
  const positions = [
    ['12%', '18%'], ['68%', '14%'], ['38%', '42%'], ['78%', '62%'], ['18%', '70%']
  ];
  area.innerHTML = admirationNotes.map((_, index) => `
    <button class="star-button" type="button" data-admiration="${index}" style="left:${positions[index][0]}; top:${positions[index][1]};" aria-label="Apri ammirazione ${index + 1}">✦</button>
  `).join('');

  area.addEventListener('click', (event) => {
    const button = event.target.closest('[data-admiration]');
    if (!button) return;
    const output = $('#admirationOutput');
    const note = admirationNotes[Number(button.dataset.admiration)];
    if (!output || !note) return;
    output.innerHTML = `<p>${escapeHtml(note)}</p>`;
    animateIn(output);
    tinySparkles(button, 9);
  });
}

function setupPinLock() {
  const form = $('#pinForm');
  const input = $('#pinInput');
  const message = $('#pinMessage');
  const lockScreen = $('#lockScreen');
  const lockCard = $('#lockCard');
  const mainContent = $('#mainContent');
  const unlockNote = $('#unlockNote');

  if (!form || !input || !message || !lockScreen || !mainContent) return;
  input.focus({ preventScroll: true });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const typedPin = input.value.trim();

    if (!typedPin) {
      message.textContent = 'Serve una piccola chiave per aprire questo posto.';
      input.focus();
      return;
    }

    const typedHash = await sha256(typedPin);

    if (typedHash === CONFIG.pinHash) {
      message.textContent = '';
      lockCard?.classList.add('is-opening');
      burstConfetti(46);

      window.setTimeout(() => {
        lockScreen.classList.add('is-unlocked');
        mainContent.classList.add('is-visible');
        mainContent.setAttribute('aria-hidden', 'false');
        document.body.classList.add('is-unlocked');
        unlockNote?.classList.add('is-visible');
        updateChapterUI();
      }, 650);

      window.setTimeout(() => {
        unlockNote?.classList.remove('is-visible');
      }, 5900);
    } else {
      const nextMessage = wrongPinMessages[state.wrongAttempts % wrongPinMessages.length];
      state.wrongAttempts += 1;
      message.textContent = nextMessage;
      input.value = '';
      shake(input);
      input.focus();
    }
  });
}

function setupCovers() {
  document.addEventListener('click', (event) => {
    const opener = event.target.closest('[data-open-cover]');
    if (!opener) return;
    const chapter = opener.closest('.chapter');
    if (!chapter) return;
    openChapterCover(chapter);
  });
}

function openChapterCover(chapter) {
  const index = Number(chapter.dataset.chapter || 0);
  const shell = chapter.querySelector('.chapter-shell');
  if (!shell) return;
  shell.classList.add('is-open');
  state.openedChapters.add(index);
  burstConfetti(index === 10 ? 28 : 14);
  tinySparkles(shell, 10);
  if (index === 0) window.setTimeout(startTypewriterOnce, 450);
  if (index === 4 && state.letterIndex === 0) window.setTimeout(revealNextLetterLine, 520);
  if (index === 10 && state.finalIndex === 0) window.setTimeout(revealNextFinalLine, 520);
}

function setupChapterControls() {
  document.addEventListener('click', (event) => {
    const nextButton = event.target.closest('[data-next]');
    const dot = event.target.closest('[data-go-chapter]');
    if (nextButton) goToChapter(state.currentChapter + 1);
    if (dot) goToChapter(Number(dot.dataset.goChapter));
  });

  $('#prevChapter')?.addEventListener('click', () => goToChapter(state.currentChapter - 1));
  $('#restartStory')?.addEventListener('click', () => {
    state.affirmationIndex = 0;
    state.letterIndex = 0;
    state.finalIndex = 0;
    state.articleIndex = 0;
    state.openedChapters = new Set();
    $('#letterLines').innerHTML = '';
    $('#finalLetter').innerHTML = '';
    $('#manualArticles').innerHTML = '';
    $$('.chapter-shell').forEach((shell) => shell.classList.remove('is-open'));
    updateAffirmation();
    goToChapter(0);
    showToast('Scrigno riavvolto. Alcune cose belle meritano un secondo giro.');
  });

  window.addEventListener('keydown', (event) => {
    if (!$('#mainContent')?.classList.contains('is-visible')) return;
    if (event.key === 'ArrowRight') goToChapter(state.currentChapter + 1);
    if (event.key === 'ArrowLeft') goToChapter(state.currentChapter - 1);
  });
}

function goToChapter(nextIndex) {
  const chapters = $$('.chapter');
  const bounded = Math.max(0, Math.min(chapters.length - 1, nextIndex));
  if (bounded === state.currentChapter) return;

  const current = chapters[state.currentChapter];
  const next = chapters[bounded];
  current?.classList.toggle('exiting-left', bounded > state.currentChapter);
  current?.classList.remove('active');
  next?.classList.add('active');
  next?.classList.remove('exiting-left');
  state.currentChapter = bounded;
  updateChapterUI();
  chapterEntranceEffects(bounded);
}

function updateChapterUI() {
  const chapters = $$('.chapter');
  const progress = $('#storyProgress span');
  const prev = $('#prevChapter');
  const chapterName = $('#chapterName');
  const percentage = chapters.length > 1 ? (state.currentChapter / (chapters.length - 1)) * 100 : 0;
  if (progress) progress.style.width = `${percentage}%`;
  if (prev) prev.disabled = state.currentChapter === 0;
  if (chapterName) chapterName.textContent = chapters[state.currentChapter]?.dataset.title || '';
  $$('.chapter-dot').forEach((dot, index) => {
    dot.classList.toggle('active', index === state.currentChapter);
    dot.setAttribute('aria-current', index === state.currentChapter ? 'step' : 'false');
  });
}

function chapterEntranceEffects(index) {
  const active = $$('.chapter')[index];
  if (!active) return;
  const shell = active.querySelector('.chapter-shell');
  animateIn(shell || active);
  if ([3, 4, 7, 10].includes(index)) tinySparkles(active, 10);
}

function setupMemorySwitcher() {
  const panel = $('#memoryPanel');
  const pills = $$('[data-memory]');
  if (!panel || !pills.length) return;

  pills.forEach((pill) => {
    pill.addEventListener('click', () => {
      const card = memoryCards[Number(pill.dataset.memory)];
      if (!card) return;
      pills.forEach((button) => button.classList.remove('active'));
      pill.classList.add('active');
      panel.innerHTML = `
        <span class="panel-icon" aria-hidden="true">${escapeHtml(card.icon)}</span>
        <h3>${escapeHtml(card.title)}</h3>
        <p>${escapeHtml(card.text)}</p>
      `;
      animateIn(panel);
      tinySparkles(pill, 5);
    });
  });
}

function setupAffirmations() {
  $('#nextAffirmation')?.addEventListener('click', () => {
    state.affirmationIndex = (state.affirmationIndex + 1) % affirmations.length;
    updateAffirmation();
  });

  $('#prevAffirmation')?.addEventListener('click', () => {
    state.affirmationIndex = (state.affirmationIndex - 1 + affirmations.length) % affirmations.length;
    updateAffirmation();
  });

  updateAffirmation();
}

function updateAffirmation() {
  const text = $('#affirmationText');
  const counter = $('#affirmationCounter');
  const card = text?.closest('.affirmation-envelope');
  if (!text || !counter) return;
  text.textContent = affirmations[state.affirmationIndex];
  counter.textContent = `Promemoria ${state.affirmationIndex + 1} di ${affirmations.length}`;
  if (card) {
    card.classList.remove('opening');
    void card.offsetWidth;
    card.classList.add('opening');
  }
}

function setupLetterReveal() {
  $('#revealLetterLine')?.addEventListener('click', () => revealNextLetterLine());
}

function revealNextLetterLine() {
  const container = $('#letterLines');
  const button = $('#revealLetterLine');
  if (!container || !button) return;
  if (state.letterIndex >= letterParagraphs.length) {
    showToast('La lettera è tutta aperta. Puoi tornarci quando serve.');
    return;
  }
  const p = document.createElement('p');
  p.textContent = letterParagraphs[state.letterIndex];
  container.appendChild(p);
  p.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  state.letterIndex += 1;
  if (state.letterIndex === letterParagraphs.length) {
    button.textContent = 'Lettera aperta';
    tinySparkles(container, 12);
  }
}

function setupManual() {
  $('#nextArticle')?.addEventListener('click', () => {
    const stack = $('#manualArticles');
    if (!stack) return;
    if (state.articleIndex >= manualArticles.length) {
      showToast('Il regolamento è completo. Ed è legalmente affettuoso.');
      tinySparkles(stack, 10);
      return;
    }
    const article = document.createElement('article');
    article.className = 'article-card';
    article.innerHTML = `<p>${escapeHtml(manualArticles[state.articleIndex])}</p>`;
    stack.appendChild(article);
    article.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    state.articleIndex += 1;
  });

  $('#chaosStamp')?.addEventListener('click', (event) => {
    showToast('Timbro ufficiale: amicizia approvata, risate obbligatorie, foto brutte non cancellabili.');
    tinySparkles(event.currentTarget, 12);
  });

  $('#motivationBtn')?.addEventListener('click', () => {
    const output = $('#motivationOutput');
    if (!output) return;
    state.motivationClicks += 1;
    output.textContent = pickRandom(emergencyMotivations, output.textContent);
    animateIn(output);
    if (state.motivationClicks === 5) {
      showToast('Easter egg: hai richiesto abbastanza supporto emotivo da sbloccare il livello “abbraccio digitale”.');
      sparkleRain('♡', 18);
    }
  });
}

function setupGalleryInteractions() {
  $('#photoGallery')?.addEventListener('click', togglePolaroid);
  $('#photoGallery')?.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    togglePolaroid(event);
  });

  function togglePolaroid(event) {
    const polaroid = event.target.closest('.polaroid');
    if (!polaroid) return;
    polaroid.classList.toggle('is-flipped');
    if (polaroid.classList.contains('is-flipped')) tinySparkles(polaroid, 7);
  }
}

function setupCertificatePrint() {
  $('#printCertificateBtn')?.addEventListener('click', () => window.print());
  $('#certificateRibbon')?.addEventListener('dblclick', (event) => {
    event.currentTarget.classList.remove('stamped');
    void event.currentTarget.offsetWidth;
    event.currentTarget.classList.add('stamped');
    showToast('Easter egg: certificato vidimato con timbro extra ufficiale.');
    sparkleRain('✓', 14);
  });
}

function setupCapsule() {
  $$('.capsule-note').forEach((note) => {
    note.addEventListener('click', () => {
      const output = $('#capsuleOutput');
      const text = capsuleNotes[Number(note.dataset.capsule)];
      if (!output || !text) return;
      output.textContent = text;
      animateIn(output);
      tinySparkles(note, 8);
    });
  });
}

function setupFinalLetter() {
  $('#revealFinalLine')?.addEventListener('click', () => revealNextFinalLine());
}

function revealNextFinalLine() {
  const container = $('#finalLetter');
  const button = $('#revealFinalLine');
  if (!container || !button) return;
  if (state.finalIndex >= finalLetterParagraphs.length) {
    showToast('Fine dello scrigno. O forse no: qualche passaggio segreto esiste ancora.');
    sparkleRain('✦', 20);
    return;
  }
  const p = document.createElement('p');
  p.textContent = finalLetterParagraphs[state.finalIndex];
  container.appendChild(p);
  p.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  state.finalIndex += 1;

  if (state.finalIndex === finalLetterParagraphs.length) {
    button.textContent = 'Rileggi questo finale';
    burstConfetti(36);
    sparkleRain('♡', 18);
  }
}

function setupMusic() {
  const audio = $('#bgMusic');
  const toggle = $('#musicToggle');
  const heroMusic = $('#startMusicFromHero');
  if (!audio || !toggle) return;

  audio.src = CONFIG.musicSrc;
  audio.volume = CONFIG.musicVolume;
  audio.addEventListener('error', () => { state.audioUnavailable = true; });

  const toggleMusic = async () => {
    if (state.isMusicPlaying) {
      audio.pause();
      stopAmbientMusic();
      state.isMusicPlaying = false;
      toggle.classList.remove('is-playing');
      toggle.setAttribute('aria-pressed', 'false');
      toggle.textContent = '♪ musica';
      return;
    }

    let usedCustomAudio = false;
    if (!state.audioUnavailable && CONFIG.musicSrc) {
      try {
        await Promise.race([
          audio.play(),
          new Promise((_, reject) => window.setTimeout(() => reject(new Error('audio-timeout')), 900))
        ]);
        usedCustomAudio = true;
      } catch (error) {
        state.audioUnavailable = true;
        audio.pause();
      }
    }

    if (!usedCustomAudio) startAmbientMusic();
    state.isMusicPlaying = true;
    toggle.classList.add('is-playing');
    toggle.setAttribute('aria-pressed', 'true');
    toggle.textContent = '♪ on';
    showToast(usedCustomAudio ? 'Musica attivata. Effetto scrigno acceso.' : 'Melodia delicata attivata. Per usare una canzone vera puoi aggiungere un MP3.');
  };

  toggle.addEventListener('click', toggleMusic);
  heroMusic?.addEventListener('click', toggleMusic);
}

function startAmbientMusic() {
  if (state.ambientMusic?.context) return;
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return;

  const context = new AudioContext();
  const master = context.createGain();
  master.gain.value = CONFIG.musicVolume * 0.34;
  master.connect(context.destination);

  const melody = [523.25, 659.25, 783.99, 659.25, 587.33, 698.46, 523.25, 392.00, 440.00, 523.25, 587.33, 493.88];
  let step = 0;

  const playNote = () => {
    const now = context.currentTime;
    const osc = context.createOscillator();
    const gain = context.createGain();
    osc.type = step % 3 === 0 ? 'triangle' : 'sine';
    osc.frequency.value = melody[step % melody.length];
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.32, now + 0.035);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.15);
    osc.connect(gain);
    gain.connect(master);
    osc.start(now);
    osc.stop(now + 1.2);
    step += 1;
  };

  playNote();
  const timer = window.setInterval(playNote, 900);
  state.ambientMusic = { context, timer };
}

function stopAmbientMusic() {
  if (!state.ambientMusic) return;
  window.clearInterval(state.ambientMusic.timer);
  state.ambientMusic.context.close();
  state.ambientMusic = null;
}

function setupEasterEggs() {
  $('#footerStar')?.addEventListener('click', (event) => {
    state.footerStarClicks += 1;
    tinySparkles(event.currentTarget, 5);
    if (state.footerStarClicks === 5) {
      showToast('Ok, hai trovato il passaggio segreto. Sergio sapeva che avresti curiosato.');
      sparkleRain('✦', 20);
    }
  });

  $('#hiddenHeart')?.addEventListener('click', () => {
    showToast('Ci sono persone che non fanno rumore, ma cambiano il modo in cui ricordi le giornate.');
    sparkleRain('♡', 16);
  });

  $('#lockStamp')?.addEventListener('click', (event) => {
    state.lockStampClicks += 1;
    if (state.lockStampClicks === 3) {
      showToast('Timbro segreto trovato: questo posto è ufficialmente non generico.');
      tinySparkles(event.currentTarget, 10);
    }
  });

  $('#musicToggle')?.addEventListener('dblclick', () => {
    showToast('Easter egg: blu, giallo e rosso, ma in versione delicata. Sergio ci ha pensato.');
    burstConfetti(24);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key.length !== 1) return;
    state.typedKeys = (state.typedKeys + event.key.toLowerCase()).slice(-16);

    if (state.typedKeys.includes('amica')) {
      state.typedKeys = '';
      showToast('Non tutte le amicizie sono uguali. Alcune diventano famiglia, senza bisogno di dirlo troppo forte.');
      sparkleRain('✦', 24);
    }

    if (state.typedKeys.includes('sergio')) {
      state.typedKeys = '';
      showToast(`${CONFIG.senderName} dice: non piangere troppo. Però se succede, è colpa sua.`);
      sparkleRain('♡', 18);
    }
  });
}

function startTypewriterOnce() {
  if (state.hasTypedHero) return;
  state.hasTypedHero = true;
  const target = $('#typewriterText');
  if (!target) return;
  const text = 'Meno male che ci sei.';
  let index = 0;
  target.textContent = '';
  const timer = window.setInterval(() => {
    target.textContent += text[index] || '';
    index += 1;
    if (index > text.length) window.clearInterval(timer);
  }, 70);
}

async function sha256(value) {
  const encoder = new TextEncoder();
  const data = encoder.encode(value);

  if (window.crypto?.subtle) {
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(hashBuffer))
      .map((byte) => byte.toString(16).padStart(2, '0'))
      .join('');
  }

  return sha256Fallback(value);
}

// Fallback per aprire index.html direttamente anche in browser che non espongono crypto.subtle su file locali.
function sha256Fallback(message) {
  const rightRotate = (value, amount) => (value >>> amount) | (value << (32 - amount));
  const mathPow = Math.pow;
  const maxWord = mathPow(2, 32);
  const words = [];
  const asciiBitLength = message.length * 8;
  let hashBase = sha256Fallback.h || [];
  let k = sha256Fallback.k || [];
  let primeCounter = k.length;

  const isComposite = {};
  for (let candidate = 2; primeCounter < 64; candidate += 1) {
    if (!isComposite[candidate]) {
      for (let i = 0; i < 313; i += candidate) isComposite[i] = candidate;
      if (primeCounter < 8) hashBase[primeCounter] = (mathPow(candidate, 0.5) * maxWord) | 0;
      k[primeCounter] = (mathPow(candidate, 1 / 3) * maxWord) | 0;
      primeCounter += 1;
    }
  }
  sha256Fallback.h = hashBase;
  sha256Fallback.k = k;
  let hash = hashBase.slice(0);

  message += '\x80';
  while (message.length % 64 - 56) message += '\x00';

  for (let i = 0; i < message.length; i += 1) {
    const j = message.charCodeAt(i);
    if (j >> 8) return '';
    words[i >> 2] |= j << (((3 - i) % 4) * 8);
  }
  words[words.length] = (asciiBitLength / maxWord) | 0;
  words[words.length] = asciiBitLength;

  for (let j = 0; j < words.length;) {
    const w = words.slice(j, j += 16);
    const oldHash = hash.slice(0);
    let a = hash[0];
    let b = hash[1];
    let c = hash[2];
    let d = hash[3];
    let e = hash[4];
    let f = hash[5];
    let g = hash[6];
    let h = hash[7];

    for (let i = 0; i < 64; i += 1) {
      const w15 = w[i - 15];
      const w2 = w[i - 2];
      const word = w[i] = i < 16 ? w[i] : (
        w[i - 16]
        + (rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15 >>> 3))
        + w[i - 7]
        + (rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2 >>> 10))
      ) | 0;

      const t1 = h
        + (rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25))
        + ((e & f) ^ ((~e) & g))
        + k[i]
        + word;
      const t2 = (rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22))
        + ((a & b) ^ (a & c) ^ (b & c));

      h = g;
      g = f;
      f = e;
      e = (d + t1) | 0;
      d = c;
      c = b;
      b = a;
      a = (t1 + t2) | 0;
    }

    hash[0] = (hash[0] + a) | 0;
    hash[1] = (hash[1] + b) | 0;
    hash[2] = (hash[2] + c) | 0;
    hash[3] = (hash[3] + d) | 0;
    hash[4] = (hash[4] + e) | 0;
    hash[5] = (hash[5] + f) | 0;
    hash[6] = (hash[6] + g) | 0;
    hash[7] = (hash[7] + h) | 0;
  }

  let result = '';
  for (let i = 0; i < hash.length; i += 1) {
    for (let j = 3; j + 1; j -= 1) {
      const byte = (hash[i] >> (j * 8)) & 255;
      result += ((byte < 16) ? '0' : '') + byte.toString(16);
    }
  }
  return result;
}

window.generatePinHash = sha256;

function burstConfetti(amount = 36) {
  const colors = ['#7fa0c3', '#e8c96c', '#c9796f', '#8ca77b', '#fdf7ea'];
  for (let i = 0; i < amount; i += 1) {
    const piece = document.createElement('span');
    piece.className = 'confetti';
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.animationDelay = `${Math.random() * 0.45}s`;
    piece.style.transform = `rotate(${Math.random() * 180}deg)`;
    document.body.appendChild(piece);
    window.setTimeout(() => piece.remove(), 2100);
  }
}

function sparkleRain(symbol = '✦', amount = 14) {
  for (let i = 0; i < amount; i += 1) {
    const sparkle = document.createElement('span');
    sparkle.className = 'float-sparkle';
    sparkle.textContent = symbol;
    sparkle.style.left = `${8 + Math.random() * 84}%`;
    sparkle.style.bottom = `${8 + Math.random() * 28}%`;
    sparkle.style.animationDelay = `${Math.random() * 0.35}s`;
    $('#sparkleLayer')?.appendChild(sparkle);
    window.setTimeout(() => sparkle.remove(), 2200);
  }
}

function tinySparkles(anchor, amount = 6) {
  const rect = anchor.getBoundingClientRect();
  for (let i = 0; i < amount; i += 1) {
    const sparkle = document.createElement('span');
    sparkle.className = 'float-sparkle';
    sparkle.textContent = Math.random() > 0.5 ? '✦' : '♡';
    sparkle.style.left = `${rect.left + rect.width / 2 + (Math.random() - 0.5) * Math.max(rect.width, 80)}px`;
    sparkle.style.bottom = `${window.innerHeight - rect.top - rect.height / 2}px`;
    $('#sparkleLayer')?.appendChild(sparkle);
    window.setTimeout(() => sparkle.remove(), 1900);
  }
}

function showToast(message) {
  const toast = $('#toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('is-visible');
  window.clearTimeout(showToast.timeoutId);
  showToast.timeoutId = window.setTimeout(() => {
    toast.classList.remove('is-visible');
  }, 4300);
}

function animateIn(element) {
  if (!element) return;
  element.animate(
    [
      { transform: 'translateY(12px) scale(0.99)', opacity: 0, filter: 'blur(4px)' },
      { transform: 'translateY(0) scale(1)', opacity: 1, filter: 'blur(0)' }
    ],
    { duration: 360, easing: 'cubic-bezier(0.2, 0.75, 0.2, 1)' }
  );
}

function shake(element) {
  element.animate(
    [
      { transform: 'translateX(0)' },
      { transform: 'translateX(-7px)' },
      { transform: 'translateX(7px)' },
      { transform: 'translateX(0)' }
    ],
    { duration: 240, easing: 'ease-out' }
  );
}

function pickRandom(list, previous = '') {
  if (!list.length) return '';
  let next = list[Math.floor(Math.random() * list.length)];
  if (list.length > 1) {
    while (next === previous) next = list[Math.floor(Math.random() * list.length)];
  }
  return next;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}
