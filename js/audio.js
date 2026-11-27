/**
 * Centralized Audio Manager for BGM, SFX, and Voice clips.
 * Gracefully handles browser autoplay restrictions and missing files.
 */
class AudioManager {
  constructor(assets) {
    this.assets = assets;
    this.isMuted = false;
    this.bgmStarted = false;

    this.bgm = new Audio();
    this.bgm.src = assets.bgm.main;
    this.bgm.loop = true;
    this.bgm.volume = 0.35;

    this.currentVoice = null;
    this.fadeInterval = null;
  }

  startBgm() {
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
      const sfx = new Audio(src);
      sfx.volume = volume;
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
      const voice = new Audio(src);
      voice.volume = 0.7;
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
