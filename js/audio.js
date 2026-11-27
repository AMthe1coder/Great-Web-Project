/**
 * Centralized Audio Manager for BGM, SFX, and Voice clips.
 * Lazily loads audio only when needed and caches Audio instances to prevent duplicate downloads.
 */
class AudioManager {
  constructor(assets) {
    this.assets = assets;
    this.isMuted = false;
    this.bgmStarted = false;
    this.bgmLoaded = false;

    this.bgm = new Audio();
    this.bgm.preload = 'none';
    this.bgm.loop = true;
    this.bgm.volume = 0.35;

    this.sfxCache = new Map();
    this.voiceCache = new Map();
    this.currentVoice = null;
    this.fadeInterval = null;
  }

  startBgm() {
    if (!this.bgmLoaded) {
      this.bgm.src = this.assets.bgm.main;
      this.bgmLoaded = true;
    }

    if (this.bgmStarted) {
      if (!this.isMuted && this.bgm.paused) {
        this.bgm.play().catch(() => {});
      }
      return;
    }

    this.bgmStarted = true;
    if (!this.isMuted) {
      this.bgm.volume = 0;
      this.bgm.play()
        .then(() => this.fadeBgmTo(0.35, 700))
        .catch(() => {
          this.bgmStarted = false;
        });
    }
  }

  fadeBgmTo(targetVolume, durationMs = 500) {
    clearInterval(this.fadeInterval);
    const startVolume = this.bgm.volume;
    const steps = 15;
    const stepTime = durationMs / steps;
    const delta = (targetVolume - startVolume) / steps;
    let count = 0;

    this.fadeInterval = setInterval(() => {
      count += 1;
      const nextVol = Math.max(0, Math.min(1, startVolume + delta * count));
      this.bgm.volume = nextVol;
      if (count >= steps) {
        clearInterval(this.fadeInterval);
        this.bgm.volume = targetVolume;
      }
    }, stepTime);
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    this.bgm.muted = this.isMuted;

    if (this.currentVoice) {
      this.currentVoice.muted = this.isMuted;
    }

    if (!this.isMuted && this.bgmStarted && this.bgm.paused) {
      this.bgm.play().catch(() => {});
    }

    return this.isMuted;
  }

  playSfx(key, volume = 0.55) {
    if (this.isMuted) return;
    const src = this.assets.sfx[key];
    if (!src) return;

    try {
      let sfx = this.sfxCache.get(key);
      if (!sfx) {
        sfx = new Audio(src);
        this.sfxCache.set(key, sfx);
      }
      sfx.volume = volume;
      sfx.currentTime = 0;
      sfx.play().catch(() => {});
    } catch (_) {
      // Ignore audio playback errors
    }
  }

  playVoice(key) {
    this.stopVoice();
    if (this.isMuted || !key) return;

    const src = this.assets.voice[key];
    if (!src) return;

    try {
      let voice = this.voiceCache.get(key);
      if (!voice) {
        voice = new Audio(src);
        this.voiceCache.set(key, voice);
      }
      voice.volume = 0.7;
      voice.muted = this.isMuted;
      voice.currentTime = 0;
      this.currentVoice = voice;
      voice.play().catch(() => {});
    } catch (_) {
      // Ignore missing or blocked voice clips
    }
  }

  stopVoice() {
    if (this.currentVoice) {
      this.currentVoice.pause();
      this.currentVoice.currentTime = 0;
      this.currentVoice = null;
    }
  }
}

window.AudioManager = AudioManager;
