/* ═══════════════════════════════════════════════════════════════════════
   AUDIO MANAGER — Web Audio API synthesized SFX
   (No audio assets required; all sounds generated procedurally)
   ═══════════════════════════════════════════════════════════════════════ */

(function (global) {
  'use strict';

  class AudioManager {
    constructor() {
      this.ctx = null;
      this.enabled = false;
      this.activeNodes = [];
    }

    _ensureContext() {
      if (!this.ctx) {
        try {
          this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
          console.warn('[audio] Web Audio API not supported');
          return false;
        }
      }
      // Resume if suspended (Chrome autoplay policy)
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      return true;
    }

    setEnabled(enabled) {
      this.enabled = enabled;
    }

    /* ─── SOUND PRIMITIVES ───────────────────────────────────────── */
    _envelope(node, t, attack, hold, release, peak = 1) {
      const gain = node.gain;
      gain.cancelScheduledValues(t);
      gain.setValueAtTime(0, t);
      gain.linearRampToValueAtTime(peak, t + attack);
      gain.setValueAtTime(peak, t + attack + hold);
      gain.exponentialRampToValueAtTime(0.001, t + attack + hold + release);
    }

    _playTone(freq, duration, type = 'sine', peak = 0.1, attack = 0.005, release = 0.05) {
      if (!this.enabled || !this._ensureContext()) return;
      const ctx = this.ctx;
      const t = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.value = freq;
      osc.connect(gain);
      gain.connect(ctx.destination);
      this._envelope(gain, t, attack, duration - attack - release, release, peak);
      osc.start(t);
      osc.stop(t + duration);
    }

    _playNoise(duration, peak = 0.05, filterFreq = 4000, filterType = 'highpass') {
      if (!this.enabled || !this._ensureContext()) return;
      const ctx = this.ctx;
      const t = ctx.currentTime;
      const bufferSize = ctx.sampleRate * duration;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1);
      }
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      const filter = ctx.createBiquadFilter();
      filter.type = filterType;
      filter.frequency.value = filterFreq;
      const gain = ctx.createGain();
      this._envelope(gain, t, 0.01, duration * 0.5, duration * 0.4, peak);
      source.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      source.start(t);
    }

    /* ─── PUBLIC SFX ─────────────────────────────────────────────── */
    play(soundName) {
      switch (soundName) {
        case 'archive-rise':
          // CRT power-on: rising hum
          this._playTone(60, 0.4, 'sine', 0.08, 0.1, 0.3);
          this._playTone(120, 0.5, 'triangle', 0.05, 0.15, 0.35);
          this._playNoise(0.3, 0.04, 3000);
          break;

        case 'tape-hover-hum':
          // Sustained subtle hum (looping)
          if (!this.enabled || !this._ensureContext()) return;
          if (this._hoverHum) return; // already playing
          const ctx = this.ctx;
          this._hoverHum = ctx.createOscillator();
          this._hoverHum.type = 'sine';
          this._hoverHum.frequency.value = 180;
          this._hoverHumGain = ctx.createGain();
          this._hoverHumGain.gain.value = 0;
          this._hoverHum.connect(this._hoverHumGain);
          this._hoverHumGain.connect(ctx.destination);
          this._hoverHum.start();
          this._hoverHumGain.gain.linearRampToValueAtTime(0.02, ctx.currentTime + 0.1);
          break;

        case 'tape-flight-whoosh':
          // Filtered noise sweep
          this._playNoise(0.5, 0.06, 800, 'bandpass');
          this._playTone(220, 0.4, 'sine', 0.04, 0.1, 0.3);
          break;

        case 'tape-insert-click':
          // Sharp click
          this._playNoise(0.1, 0.12, 6000);
          this._playTone(800, 0.05, 'square', 0.08, 0.001, 0.04);
          break;

        case 'crt-power-off':
          // Falling tone + click
          if (!this.enabled || !this._ensureContext()) return;
          const ctx2 = this.ctx;
          const t2 = ctx2.currentTime;
          const osc2 = ctx2.createOscillator();
          const gain2 = ctx2.createGain();
          osc2.type = 'sine';
          osc2.frequency.setValueAtTime(60, t2);
          osc2.frequency.exponentialRampToValueAtTime(20, t2 + 0.4);
          gain2.gain.setValueAtTime(0.08, t2);
          gain2.gain.exponentialRampToValueAtTime(0.001, t2 + 0.5);
          osc2.connect(gain2);
          gain2.connect(ctx2.destination);
          osc2.start(t2);
          osc2.stop(t2 + 0.5);
          this._playNoise(0.15, 0.08, 4000);
          break;

        case 'tape-eject-spring':
          // Spring release: short upward chirp
          if (!this.enabled || !this._ensureContext()) return;
          const ctx3 = this.ctx;
          const t3 = ctx3.currentTime;
          const osc3 = ctx3.createOscillator();
          const gain3 = ctx3.createGain();
          osc3.type = 'sine';
          osc3.frequency.setValueAtTime(150, t3);
          osc3.frequency.exponentialRampToValueAtTime(400, t3 + 0.1);
          gain3.gain.setValueAtTime(0.08, t3);
          gain3.gain.exponentialRampToValueAtTime(0.001, t3 + 0.15);
          osc3.connect(gain3);
          gain3.connect(ctx3.destination);
          osc3.start(t3);
          osc3.stop(t3 + 0.15);
          break;

        case 'browser-digital-rise':
          // Rising digital chime
          this._playTone(440, 0.15, 'square', 0.05);
          setTimeout(() => this._playTone(660, 0.15, 'square', 0.05), 60);
          setTimeout(() => this._playTone(880, 0.2, 'square', 0.05), 120);
          break;
      }
    }

    stop(soundName) {
      if (soundName === 'tape-hover-hum' && this._hoverHum) {
        try {
          this._hoverHumGain.gain.cancelScheduledValues(this.ctx.currentTime);
          this._hoverHumGain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 0.2);
          this._hoverHum.stop(this.ctx.currentTime + 0.3);
        } catch (e) {}
        this._hoverHum = null;
        this._hoverHumGain = null;
      }
    }

    /* ─── GLITCH SEQUENCE ────────────────────────────────────────── */
    playGlitchSequence() {
      if (!this.enabled || !this._ensureContext()) return;
      // Phase 1: electrical crackle
      setTimeout(() => this._playNoise(0.3, 0.1, 5000), 0);
      setTimeout(() => this._playTone(80, 0.3, 'sawtooth', 0.05), 50);
      // Phase 2-3: analog signal noise
      setTimeout(() => this._playNoise(0.3, 0.06, 2000, 'bandpass'), 300);
      // Phase 4: snow static
      setTimeout(() => this._playNoise(0.3, 0.04, 8000), 900);
      // Phase 5: descending hum
      setTimeout(() => {
        if (!this._ensureContext()) return;
        const ctx = this.ctx;
        const t = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(220, t);
        osc.frequency.exponentialRampToValueAtTime(110, t + 0.6);
        gain.gain.setValueAtTime(0.06, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.6);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(t);
        osc.stop(t + 0.6);
      }, 1200);
    }
  }

  global.ArchiveAudio = AudioManager;
})(window);