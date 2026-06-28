/* ═══════════════════════════════════════════════════════════════════════
   AMBIENT PARTICLES — Dust drifting in archive room
   ═══════════════════════════════════════════════════════════════════════ */

(function (global) {
  'use strict';

  const PARTICLE_COUNT = 8;
  const SPEED_MIN = 0.2;
  const SPEED_MAX = 0.6;

  class ParticleSystem {
    constructor(canvas) {
      this.canvas = canvas;
      this.ctx = null;
      this.particles = [];
      this.active = false;
      this.raf = null;
    }

    start() {
      if (!this.canvas) return;
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
      this.ctx = this.canvas.getContext('2d');

      // Build particles
      this.particles = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        this.particles.push({
          x: Math.random() * this.canvas.width,
          y: Math.random() * this.canvas.height,
          vx: SPEED_MIN + Math.random() * (SPEED_MAX - SPEED_MIN),
          vy: 0,
          r: 1 + Math.random() * 2,
          opacity: 0.1 + Math.random() * 0.15,
          phase: Math.random() * Math.PI * 2
        });
      }

      this.active = true;
      this._render();
    }

    stop() {
      this.active = false;
      if (this.raf) {
        cancelAnimationFrame(this.raf);
        this.raf = null;
      }
      if (this.ctx) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      }
    }

    _render() {
      if (!this.active) return;
      this.raf = requestAnimationFrame(() => this._render());

      const ctx = this.ctx;
      const w = this.canvas.width;
      const h = this.canvas.height;

      ctx.clearRect(0, 0, w, h);

      this.particles.forEach(p => {
        // Subtle vertical drift via sine wave
        p.phase += 0.008;
        const drift = Math.sin(p.phase) * 0.15;

        p.x += p.vx;
        p.y += drift;

        // Wrap around
        if (p.x > w + 5) p.x = -5;
        if (p.x < -5) p.x = w + 5;
        if (p.y > h + 5) p.y = -5;
        if (p.y < -5) p.y = h + 5;

        // Draw
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
        ctx.fill();
      });
    }
  }

  global.ArchiveParticles = ParticleSystem;
})(window);