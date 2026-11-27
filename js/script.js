/**
 * Visual Novel Engine & Interactive Controller
 * for The Great Web Project.
 */
(function () {
  const { assets, books, scenes } = window.VN_DATA;
  const audio = new window.AudioManager(assets);

  // DOM Elements
  const bgLayer = document.getElementById('bg-layer');
  const bgBlurLayer = document.getElementById('bg-blur-layer');
  const transitionOverlay = document.getElementById('transition-overlay');

  const screens = {
    title: document.getElementById('scene-title'),
    dialogue: document.getElementById('scene-dialogue'),
    library: document.getElementById('scene-library'),
    credits: document.getElementById('scene-credits')
  };

  const btnStart = document.getElementById('btn-start');
  const btnLibrary = document.getElementById('btn-library');
  const btnLeaveLibrary = document.getElementById('btn-leave-library');
  const btnAudioToggle = document.getElementById('btn-audio-toggle');
  const iconAudioOn = document.getElementById('icon-audio-on');
  const iconAudioOff = document.getElementById('icon-audio-off');
  const btnBackTitle = document.getElementById('btn-back-title');

  // Dialogue elements
  const characterContainer = document.getElementById('character-container');
  const characterSprite = document.getElementById('character-sprite');
  const choiceContainer = document.getElementById('choice-container');
  const quickInputContainer = document.getElementById('quick-input-container');
  const quickInputField = document.getElementById('quick-input-field');
  const quickTimerTrack = document.getElementById('quick-timer-track');
  const quickTimerFill = document.getElementById('quick-timer-fill');
  const dialogueBox = document.getElementById('dialogue-box');
  const speakerLabel = document.getElementById('speaker-label');
  const dialogueText = document.getElementById('dialogue-text');
  const nextIndicator = document.getElementById('dialogue-next-indicator');

  // Library & Modal elements
  const bookSymbolsGrid = document.getElementById('book-symbols-grid');
  const modalOverlay = document.getElementById('book-modal-overlay');
  const btnCloseModal = document.getElementById('btn-close-modal');
  const modalSymbol = document.getElementById('modal-book-symbol');
  const modalTitle = document.getElementById('modal-book-title');
  const modalAuthor = document.getElementById('modal-book-author');
  const modalGenre = document.getElementById('modal-book-genre');
  const modalDateLabel = document.getElementById('modal-book-date-label');
  const modalDate = document.getElementById('modal-book-date');
  const modalSummary = document.getElementById('modal-book-summary');
  const modalLink = document.getElementById('modal-book-link');

  // Engine State
  const state = {
    currentScreen: 'title',
    currentSceneKey: null,
    dialogueIndex: 0,
    isTyping: false,
    fullText: '',
    typeTimer: null,
    quickEventTimer: null,
    isTransitioning: false,
    awaitingChoice: false,
    currentSpriteKey: null
  };

  /* ========================================================================
     Initialization
     ======================================================================== */
  function init() {
    preloadImages();
    renderLibraryGrid();
    bindEvents();
    showTitleScreen();
    audio.startBgm();

    // Fallback in case the browser blocks autoplay until the first user interaction
    const unlockAudio = () => {
      if (!audio.isMuted && audio.bgm.paused) {
        audio.startBgm();
      }
      if (audio.bgmStarted) {
        document.removeEventListener('pointerdown', unlockAudio);
        document.removeEventListener('keydown', unlockAudio);
      }
    };
    document.addEventListener('pointerdown', unlockAudio);
    document.addEventListener('keydown', unlockAudio);
  }

  function preloadImages() {
    const urls = [
      ...Object.values(assets.bg),
      ...Object.values(assets.character)
    ];
    urls.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }

  function bindEvents() {
    btnStart.addEventListener('click', () => {
      audio.startBgm();
      audio.playSfx('click');
      startScene('scene2');
    });

    btnLibrary.addEventListener('click', () => {
      audio.startBgm();
      audio.playSfx('click');
      showLibraryScreen();
    });

    btnLeaveLibrary.addEventListener('click', () => {
      audio.playSfx('shine', 0.5);
      startScene('scene5');
    });

    btnBackTitle.addEventListener('click', () => {
      audio.playSfx('click');
      showTitleScreen();
    });

    btnAudioToggle.addEventListener('click', () => {
      const muted = audio.toggleMute();
      iconAudioOn.classList.toggle('hidden', muted);
      iconAudioOff.classList.toggle('hidden', !muted);
      btnAudioToggle.setAttribute('aria-pressed', String(muted));
      if (!muted) {
        audio.playSfx('click');
      }
    });

    dialogueBox.addEventListener('click', handleDialogueAdvance);
    dialogueBox.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleDialogueAdvance();
      }
    });

    btnCloseModal.addEventListener('click', closeBookModal);
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        closeBookModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !modalOverlay.classList.contains('hidden')) {
        closeBookModal();
      }
    });
  }

  /* ========================================================================
     Screen & Background Management
     ======================================================================== */
  function setActiveScreen(screenKey) {
    Object.values(screens).forEach((el) => el.classList.remove('active'));
    screens[screenKey].classList.add('active');
    state.currentScreen = screenKey;

    const inLibrary = screenKey === 'library';
    btnLeaveLibrary.classList.toggle('hidden', !inLibrary);
    bgBlurLayer.classList.toggle('active', inLibrary);
  }

  function setBackground(bgKey) {
    const bgUrl = assets.bg[bgKey];
    if (bgUrl) {
      bgLayer.style.backgroundImage = `url("${bgUrl}")`;
    }
  }

  function runTransition(type, callback) {
    if (state.isTransitioning) return;
    state.isTransitioning = true;

    transitionOverlay.classList.remove('fade-black-slow');
    transitionOverlay.classList.add('fade-black');

    setTimeout(() => {
      callback();

      // Ensure Scene 3 background is decoded before smoothly fading out the black overlay
      const reveal = () => {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            if (type === 'white-fade') {
              transitionOverlay.classList.add('fade-black-slow');
            }
            transitionOverlay.classList.remove('fade-black');
            setTimeout(() => {
              transitionOverlay.classList.remove('fade-black-slow');
              state.isTransitioning = false;
            }, type === 'white-fade' ? 1150 : 520);
          });
        });
      };

      const bgImg = new Image();
      bgImg.src = assets.bg.lib;
      if (bgImg.decode) {
        bgImg.decode().then(reveal).catch(reveal);
      } else {
        setTimeout(reveal, 120);
      }
    }, 520);
  }

  function showTitleScreen() {
    clearTimers();
    audio.stopVoice();
    setBackground('libLit');
    setActiveScreen('title');
  }

  function showLibraryScreen() {
    clearTimers();
    audio.stopVoice();
    setBackground('lib');
    setActiveScreen('library');
  }

  function showCreditsScreen() {
    clearTimers();
    audio.stopVoice();
    setBackground('libLit');
    setActiveScreen('credits');
  }

  /* ========================================================================
     Dialogue & Scene Engine
     ======================================================================== */
  function startScene(sceneKey) {
    const scene = scenes[sceneKey];
    if (!scene) return;

    clearTimers();
    state.currentSceneKey = sceneKey;
    state.dialogueIndex = 0;
    state.awaitingChoice = false;
    state.currentSpriteKey = null;

    setBackground(scene.bg);
    setCharacterSprite(scene.character);
    clearSpecialUI();
    setActiveScreen('dialogue');

    renderCurrentLine();
  }

  function renderCurrentLine() {
    const scene = scenes[state.currentSceneKey];
    const entry = scene.dialogue[state.dialogueIndex];
    if (!entry) return;

    clearSpecialUI();

    if (entry.sprite !== undefined) {
      setCharacterSprite(entry.sprite);
    }

    speakerLabel.textContent = entry.speaker;

    if (entry.voice) {
      audio.playVoice(entry.voice);
    }

    startTypewriter(entry.text, () => {
      if (entry.choices) {
        renderChoices(entry.choices);
      } else if (entry.quickEvent) {
        triggerQuickEvent(entry.quickEvent);
      }
    });
  }

  function startTypewriter(text, onComplete) {
    clearInterval(state.typeTimer);
    state.isTyping = true;
    state.fullText = text;
    dialogueText.textContent = '';
    dialogueText.classList.add('typing');
    nextIndicator.classList.add('hidden');

    let index = 0;
    state.typeTimer = setInterval(() => {
      const ch = text.charAt(index);
      const span = document.createElement('span');
      span.className = 'typed-char';
      span.textContent = ch;
      dialogueText.appendChild(span);

      index += 1;
      if (index >= text.length) {
        finishTypewriter(onComplete);
      }
    }, 16);
  }

  function finishTypewriter(onComplete) {
    clearInterval(state.typeTimer);
    state.isTyping = false;
    dialogueText.classList.remove('typing');
    dialogueText.textContent = state.fullText;
    nextIndicator.classList.toggle('hidden', state.awaitingChoice);
    if (typeof onComplete === 'function') {
      onComplete();
    }
  }

  function handleDialogueAdvance() {
    if (state.isTransitioning || state.awaitingChoice) return;

    const scene = scenes[state.currentSceneKey];
    const entry = scene.dialogue[state.dialogueIndex];
    if (!entry) return;

    if (state.isTyping) {
      finishTypewriter(() => {
        if (entry.choices) {
          renderChoices(entry.choices);
        } else if (entry.quickEvent) {
          triggerQuickEvent(entry.quickEvent);
        }
      });
      return;
    }

    audio.playSfx('click', 0.4);
    advanceToNextLine();
  }

  function advanceToNextLine() {
    clearTimers();
    clearSpecialUI();

    const scene = scenes[state.currentSceneKey];
    const currentEntry = scene.dialogue[state.dialogueIndex];

    if (currentEntry && currentEntry.nextScene) {
      const target = currentEntry.nextScene;
      const goNext = () => {
        if (target === 'library') {
          showLibraryScreen();
        } else if (target === 'credits') {
          showCreditsScreen();
        } else {
          startScene(target);
        }
      };

      if (currentEntry.transitionOut) {
        audio.playSfx('shine', 0.55);
        runTransition(currentEntry.transitionOut, goNext);
      } else {
        goNext();
      }
      return;
    }

    if (state.dialogueIndex + 1 < scene.dialogue.length) {
      state.dialogueIndex += 1;
      renderCurrentLine();
    }
  }

  /* ========================================================================
     Character, Choices, Quick Events & Props
     ======================================================================== */
  function setCharacterSprite(spriteKey) {
    if (!spriteKey || !assets.character[spriteKey]) {
      characterContainer.classList.add('hidden');
      characterSprite.removeAttribute('src');
      state.currentSpriteKey = null;
      return;
    }

    const wasHidden = characterContainer.classList.contains('hidden');
    if (state.currentSpriteKey !== spriteKey) {
      characterSprite.src = assets.character[spriteKey];
      state.currentSpriteKey = spriteKey;
    }

    characterContainer.classList.remove('hidden');
    if (wasHidden) {
      characterContainer.classList.add('entering');
      setTimeout(() => characterContainer.classList.remove('entering'), 360);
    }
  }

  function renderChoices(choices) {
    state.awaitingChoice = true;
    nextIndicator.classList.add('hidden');
    choiceContainer.innerHTML = '';

    choices.forEach((choice) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'pill-btn';
      btn.textContent = choice.label;
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        audio.playSfx('click');
        state.awaitingChoice = false;
        if (choice.action === 'credits') {
          runTransition('black-fade', showCreditsScreen);
        } else {
          advanceToNextLine();
        }
      });
      choiceContainer.appendChild(btn);
    });

    choiceContainer.classList.remove('hidden');
  }

  function triggerQuickEvent(quickEvent) {
    nextIndicator.classList.add('hidden');
    const duration = quickEvent.durationMs || 1100;

    // Show & animate speed timer progress line reliably via CSS keyframe
    quickTimerTrack.classList.remove('hidden');
    quickTimerFill.style.animation = 'none';
    void quickTimerFill.offsetWidth;
    quickTimerFill.style.animation = `timerShrink ${duration}ms linear forwards`;

    if (quickEvent.type === 'text-input') {
      quickInputField.value = '';
      quickInputContainer.classList.remove('hidden');
      quickInputField.focus({ preventScroll: true });
    } else if (quickEvent.type === 'yes-no') {
      choiceContainer.innerHTML = '';
      ['Yes', 'No'].forEach((label) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'pill-btn';
        btn.textContent = label;
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          audio.playSfx('click');
          advanceToNextLine();
        });
        choiceContainer.appendChild(btn);
      });
      choiceContainer.classList.remove('hidden');
    }

    state.quickEventTimer = setTimeout(() => {
      advanceToNextLine();
    }, duration);
  }

  function clearSpecialUI() {
    choiceContainer.classList.add('hidden');
    choiceContainer.innerHTML = '';
    quickInputContainer.classList.add('hidden');
    quickInputField.value = '';
    quickTimerTrack.classList.add('hidden');
    quickTimerFill.style.animation = 'none';
  }

  function clearTimers() {
    clearInterval(state.typeTimer);
    clearTimeout(state.quickEventTimer);
    state.isTyping = false;
  }

  /* ========================================================================
     Library Grid & Book Modal
     ======================================================================== */
  function renderLibraryGrid() {
    bookSymbolsGrid.innerHTML = '';

    books.forEach((book) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'book-symbol-btn';
      btn.setAttribute('aria-label', `Inspect ${book.title}`);
      btn.setAttribute('title', book.title);

      const img = document.createElement('img');
      img.src = book.symbol;
      img.alt = book.title;

      btn.appendChild(img);
      btn.addEventListener('click', () => openBookModal(book));
      bookSymbolsGrid.appendChild(btn);
    });
  }

  function openBookModal(book) {
    audio.playSfx('pageFlip', 0.6);

    modalSymbol.src = book.symbol;
    modalSymbol.alt = book.title;
    modalTitle.textContent = book.title;
    modalAuthor.textContent = book.author ? `by ${book.author}` : '';
    modalGenre.textContent = book.genre;
    modalDateLabel.textContent = book.dateLabel;
    modalDate.textContent = book.dateValue;
    modalSummary.textContent = book.summary;
    modalLink.href = book.ebookUrl;

    modalOverlay.classList.remove('hidden');
    btnCloseModal.focus();
  }

  function closeBookModal() {
    audio.playSfx('click', 0.45);
    modalOverlay.classList.add('hidden');
  }

  document.addEventListener('DOMContentLoaded', init);
})();
