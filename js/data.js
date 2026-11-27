/**
 * Centralized asset paths, book recommendations, and story script data
 * for The Great Web Project.
 */
window.VN_DATA = {
  assets: {
    bg: {
      dark: 'assets/bg/bg-dark.webp',
      lib: 'assets/bg/bg-lib.webp',
      libLit: 'assets/bg/bg-lib-lit.webp'
    },
    character: {
      normal: 'assets/character/alyssa-normal (1).webp',
      mad: 'assets/character/alyssa-mad.webp'
    },
    bgm: {
      main: 'assets/bg-music/leberch-no-copyright-music-594951.mp3'
    },
    sfx: {
      click: 'assets/sfx/dragon-studio-button-press-382713.mp3',
      type: 'assets/sfx/dragon-studio-keyboard-typing-sound-effect-335503.mp3',
      pageFlip: 'assets/sfx/sumaga123-page-flip-557810.mp3',
      shine: 'assets/sfx/benkirb-shine-2-268904.mp3'
    },
    voice: {
      neutral: 'assets/voice/alyssa-neutral.wav',
      angry: 'assets/voice/alysa-angry.wav',
      happy: 'assets/voice/alyssa-happy.wav',
      sad: 'assets/voice/alyssa-sad.wav',
      surprised: 'assets/voice/alyssa-surprised.wav'
    }
  },

  books: [
    {
      id: 'house-of-hades',
      title: 'Heroes of Olympus: House of Hades',
      author: 'Rick Riordan',
      genre: 'Fantasy, Mythology, Adventure',
      dateLabel: 'Published:',
      dateValue: '2013',
      symbol: 'assets/objects/house-of-hades.webp',
      ebookUrl: 'assets/books/house-of-hades.pdf',
      summary:
        'Percy Jackson and Annabeth Chase are trapped in Tartarus and must fight their way toward the Doors of Death from the underworld side. Meanwhile, their friends aboard the Argo II race across the mortal world to reach the House of Hades and close the doors before Gaea’s forces can overwhelm them.'
    },
    {
      id: 'dear-evan-hansen',
      title: 'Dear Evan Hansen',
      author: 'Val Emmich',
      genre: 'Young Adult, Contemporary Fiction',
      dateLabel: 'Published:',
      dateValue: '2018',
      symbol: 'assets/objects/dear-evan-hansen.webp',
      ebookUrl: 'assets/books/dear-evan-hansen.pdf',
      summary:
        'Evan Hansen is a socially anxious high school student who struggles to connect with the people around him. After a misunderstanding involving a letter and a classmate named Connor Murphy, Evan finds himself caught in a complicated situation that changes how others see him. As the lie grows, he must confront the consequences of his actions and the truth about himself.'
    },
    {
      id: 'the-color-purple',
      title: 'The Color Purple',
      author: 'Alice Walker',
      genre: 'Historical Fiction, Epistolary Fiction',
      dateLabel: 'Published:',
      dateValue: '1982',
      symbol: 'assets/objects/color-purple.webp',
      ebookUrl: 'assets/books/the-color-purple.pdf',
      summary:
        'Told through heartfelt letters, Celie chronicles her life in the American South as she endures hardship, separation from her beloved sister Nettie, and oppression. Through resilience and the inspiring bonds she forms with remarkable women like Shug Avery and Sofia, Celie discovers her voice, self-worth, and independence.'
    },
    {
      id: 'orpheus-and-eurydice',
      title: 'Orpheus and Eurydice',
      author: 'Ancient Greek Mythology',
      genre: 'Greek Mythology, Tragedy',
      dateLabel: 'Origin:',
      dateValue: 'Ancient Greek mythology',
      symbol: 'assets/objects/orpheus-and-eurydice.webp',
      ebookUrl: 'assets/books/orpheus-and-eurydice.pdf',
      summary:
        'After his bride Eurydice dies from a viper bite, the gifted musician Orpheus descends into the Underworld to win her back with his lyre. Moved by his song, Hades grants his wish on one condition: Orpheus must never look back at Eurydice until they both reach the surface—a test of trust with a heartbreaking ending.'
    },
    {
      id: 'white-nights',
      title: 'White Nights',
      author: 'Fyodor Dostoyevsky',
      genre: 'Romance, Classic Literature, Psychological Fiction',
      dateLabel: 'Published:',
      dateValue: '1848',
      symbol: 'assets/objects/white-night.webp',
      ebookUrl: 'assets/books/white-nights.pdf',
      summary:
        'Over four luminous summer nights in Saint Petersburg, a lonely dreamer meets Nastenka, a young woman waiting for the return of the man she loves. As they share their hopes and sorrows, the dreamer falls deeply in love, knowing their fleeting connection may vanish the moment her past returns.'
    },
    {
      id: 'dorian-grey',
      title: 'The Portrait of Dorian Grey',
      author: 'Oscar Wilde',
      genre: 'Gothic Fiction, Philosophical Fiction',
      dateLabel: 'Published:',
      dateValue: '1890',
      symbol: 'assets/objects/the-portrait-of-dorian-gray.webp',
      ebookUrl: 'assets/books/dorian-grey.pdf',
      summary:
        'Enthralled by his own youthful beauty, Dorian Gray wishes that a painted portrait of him would age and bear the scars of his sins instead of himself. As Dorian pursues a life of vanity and indulgence, he stays untouched by time while the hidden portrait grows ever more grotesque.'
    },
    {
      id: 'guide-to-the-galaxy',
      title: 'Hitchhiker’s Guide to the Galaxy',
      author: 'Douglas Adams',
      genre: 'Science Fiction, Comedy, Adventure',
      dateLabel: 'Published:',
      dateValue: '1979',
      symbol: 'assets/objects/guide-to-galaxy.webp',
      ebookUrl: 'assets/books/guide-to-the-galaxy.pdf',
      summary:
        'Seconds before Earth is demolished to make way for an intergalactic bypass, ordinary Englishman Arthur Dent is rescued by his alien friend Ford Prefect. Armed with a towel and an electronic guidebook, Arthur embarks on an absurd cosmic journey full of eccentric characters and the ultimate question of life.'
    },
    {
      id: 'these-violent-delights',
      title: 'These Violent Delights',
      author: 'Chloe Gong',
      genre: 'Historical Fantasy, Romance, Young Adult',
      dateLabel: 'Published:',
      dateValue: '2020',
      symbol: 'assets/objects/these-violent-nights.webp',
      ebookUrl: 'assets/books/these-violent-delights.pdf',
      summary:
        'Set in 1926 Shanghai, rival gang heirs Juliette Cai and Roma Montagov—once each other’s first love—are forced to set aside their blood feud when a mysterious madness begins claiming victims across the city. Together, they must uncover a lurking monster before it destroys everything they care about.'
    }
  ],

  scenes: {
    scene2: {
      bg: 'dark',
      character: null,
      dialogue: [
        { speaker: '???', text: '…', voice: 'neutral' },
        { speaker: '???', text: 'A visitor?', voice: 'surprised' },
        { speaker: '???', text: 'How interesting…', voice: 'neutral' },
        { speaker: '???', text: 'It has been far too long since I’ve seen people in these parts', voice: 'neutral' },
        { speaker: '???', text: 'Are you lost? Took a wrong turn? Heh. Figures.', voice: 'neutral' },
        { speaker: '???', text: 'No one ever visits here willingly…', voice: 'sad' },
        { speaker: '???', text: 'Anyways, I can get you back to your world. But it’ll take a while to activate the portal.', voice: 'neutral' },
        {
          speaker: '???',
          text: 'Would you like to listen to me talk in the meanwhile?',
          voice: 'neutral',
          choices: [
            { label: 'Sure', action: 'next' },
            { label: 'Nah', action: 'credits' }
          ]
        },
        {
          speaker: '???',
          text: 'Great. Let me just….',
          voice: 'happy',
          transitionOut: 'white-fade',
          nextScene: 'scene3'
        }
      ]
    },

    scene3: {
      bg: 'lib',
      character: 'normal',
      dialogue: [
        { speaker: '???', text: 'Sorry about that. I never open the lights because no one really comes here.', voice: 'neutral' },
        { speaker: '???', text: 'And electricity bills get to a point where it’s not affordable…', voice: 'sad' },
        { speaker: '???', text: 'Welcome To my humble library. I am Alyssa, the owner and only employee…', voice: 'happy' },
        {
          speaker: 'ALYSSA',
          text: 'Who are you?',
          voice: 'neutral',
          sprite: 'normal',
          quickEvent: { type: 'text-input', durationMs: 1100 }
        },
        {
          speaker: 'ALYSSA',
          text: 'Scratch that. How did you get here?!',
          voice: 'angry',
          sprite: 'mad',
          quickEvent: { type: 'text-input', durationMs: 1100 }
        },
        {
          speaker: 'ALYSSA',
          text: 'Are you perhaps a Chinese spy?',
          voice: 'angry',
          sprite: 'mad',
          quickEvent: { type: 'yes-no', durationMs: 500 }
        },
        { speaker: 'ALYSSA', text: 'Bah, you don’t look the part.', voice: 'angry', sprite: 'mad' },
        { speaker: 'ALYSSA', text: 'Maybe you’re just… a boring, normal person.', voice: 'angry', sprite: 'mad' },
        { speaker: 'ALYSSA', text: 'Anyways…', voice: 'neutral', sprite: 'mad' },
        {
          speaker: 'ALYSSA',
          text: 'Right!',
          voice: 'happy',
          sprite: 'normal'
        },
        { speaker: 'ALYSSA', text: 'Books. You’ve heard of them… right?', voice: 'neutral' },
        { speaker: 'ALYSSA', text: 'I enjoy quite a lot of them… Well that’s why I have a library..', voice: 'happy' },
        { speaker: 'ALYSSA', text: 'I like collecting them, like, especially my favorite ones.', voice: 'happy' },
        { speaker: 'ALYSSA', text: 'Books can be about anything. Collections of short stories. Anecdotes. Fiction. Nonfiction. So many options.', voice: 'neutral' },
        {
          speaker: 'ALYSSA',
          text: 'There’s also different genres. Like laughing? Then Comedy is for ‘ya.',
          voice: 'happy'
        },
        {
          speaker: 'ALYSSA',
          text: 'A hopeless romantic? A horror fanatic? There’s a book guaranteed to your tastes. There are a lot of amazing authors.',
          voice: 'happy'
        },
        {
          speaker: 'ALYSSA',
          text: 'Here are some of my favorite ones!',
          voice: 'happy',
          nextScene: 'library'
        }
      ]
    },

    scene5: {
      bg: 'libLit',
      character: 'normal',
      dialogue: [
        { speaker: 'ALYSSA', text: 'Ah! Your time is up.', voice: 'surprised' },
        { speaker: 'ALYSSA', text: 'Well, don’t be a stranger. You can come back if you want.', voice: 'happy' },
        {
          speaker: 'ALYSSA',
          text: 'Thank you for visiting me!!',
          voice: 'happy',
          nextScene: 'credits'
        }
      ]
    }
  }
};
