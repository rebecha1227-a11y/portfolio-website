/* ═══════════════════════════════════════════════════════════════════════
   GLITCH TRANSITION — The Big Bang
   5 phases over 1.8s, orchestrated via GSAP Timeline
   ═══════════════════════════════════════════════════════════════════════ */

(function (global) {
  'use strict';

  class GlitchTransition {
    constructor(opts) {
      this.flashEl     = opts.flashEl;
      this.snowEl      = opts.snowEl;
      this.snowCanvas  = opts.snowCanvas;
      this.rgbEl       = opts.rgbEl;
      this.tearingEl   = opts.tearingEl;
      this.crtContent  = opts.crtContent;
      this.crtScreen   = opts.crtScreen;
      this.crtTearing  = opts.crtTearing;
      this.crtRgbSplit = opts.crtRgbSplit;
      this.snowCtx     = null;
      this.snowRAF     = null;
      this._snowNoiseData = null;
      this._snowImageData = null;
    }

    run(projectId, opts) {
      const onComplete = opts.onComplete || (() => {});

      // Build tearing bars dynamically each run (random offsets)
      this._buildTearingBars();

      const tl = gsap.timeline({
        onComplete: () => {
          // Clean up overlays before browser shows
          gsap.set([this.flashEl, this.snowEl, this.rgbEl, this.tearingEl, this.crtTearing, this.crtRgbSplit],
            { opacity: 0 });
          this._stopSnow();
          onComplete();
        }
      });

      // ─── Phase 1: Ignition (0-300ms) ───────────────────────────
      tl.set(this.flashEl, { opacity: 0.95, backgroundColor: '#ffffff' }, 0);
      tl.to(this.flashEl, {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.out'
      }, 0);

      // Scanlines widen
      tl.call(() => {
        const scanlines = document.querySelector('.crt-scanlines');
        if (scanlines) {
          scanlines.style.background = `
            repeating-linear-gradient(
              to bottom,
              transparent 0px,
              transparent 3px,
              rgba(0,0,0,0.4) 3px,
              rgba(0,0,0,0.4) 6px
            )
          `;
        }
      }, [], 0);

      // CRT body has a momentary glow
      tl.to('.crt-body', {
        boxShadow: '0 28px 70px rgba(0,0,0,0.7), 0 0 100px rgba(200,255,200,0.4), inset 0 1px 0 rgba(255,255,255,0.08)',
        duration: 0.2,
        yoyo: true,
        repeat: 1
      }, 0);

      // ─── Phase 2: H.Tearing (300-600ms) ────────────────────────
      tl.set(this.tearingEl, { opacity: 1 }, 0.3);
      tl.call(() => this._animateTearing(), [], 0.3);
      tl.to(this.crtScreen, {
        y: '+=3',
        duration: 0.05,
        yoyo: true,
        repeat: 5,
        ease: 'none'
      }, 0.3);
      tl.set(this.tearingEl, { opacity: 0 }, 0.6);

      // ─── Phase 3: RGB Split (600-900ms) ────────────────────────
      tl.set(this.crtRgbSplit, { opacity: 1 }, 0.6);
      tl.to(['.crt-rgb-split .rgb-r', '.crt-rgb-split .rgb-b'], {
        x: '+=6',
        duration: 0.15,
        yoyo: true,
        repeat: 2
      }, 0.6);
      tl.to('.crt-rgb-split .rgb-g', {
        y: '+=3',
        duration: 0.1,
        yoyo: true,
        repeat: 3
      }, 0.6);
      // Flash project color tint
      tl.fromTo(this.crtScreen,
        { filter: 'hue-rotate(0deg) brightness(1)' },
        { filter: 'hue-rotate(45deg) brightness(1.3)', duration: 0.15, yoyo: true, repeat: 2 },
        0.6
      );
      tl.set(this.crtRgbSplit, { opacity: 0 }, 0.9);

      // ─── Phase 4: Snow Storm (900-1200ms) ──────────────────────
      tl.call(() => this._startSnow(), [], 0.9);
      tl.to(this.snowEl, { opacity: 1, duration: 0.05 }, 0.9);

      // Brief flashes of project content visible through snow
      tl.call(() => {
        // Tint snow toward project color
        const palettes = {
          remoire: '#FDF6EC',
          careerforge: '#F6F4F0',
          frenchquest: '#F5F0E6',
          chatbox: '#FAFBFC',
          generator: '#FAFAFA'
        };
        const tint = palettes[projectId] || '#FFFFFF';
        this.flashEl.style.backgroundColor = tint;
        gsap.fromTo(this.flashEl,
          { opacity: 0.3 },
          { opacity: 0, duration: 0.08 }
        );
      }, [], 1.0);
      tl.call(() => {
        this.flashEl.style.backgroundColor = '#FFFFFF';
        gsap.fromTo(this.flashEl,
          { opacity: 0.4 },
          { opacity: 0, duration: 0.06 }
        );
      }, [], 1.1);

      tl.to(this.snowEl, { opacity: 0.3, duration: 0.3 }, 1.2);

      // ─── Phase 5: Screen Expand (1200-1800ms) ──────────────────
      // The CRT screen image "escapes" the TV and fills viewport
      // We do this by removing the overflow:hidden and scaling up
      tl.call(() => {
        // Lock to clean frame first
        this._stopSnow();
        gsap.set(this.snowEl, { opacity: 0 });
        gsap.set(this.crtScreen, {
          backgroundColor: '#FFFFFF',
          boxShadow: 'none'
        });
        this.crtScreen.style.overflow = 'visible';
      }, [], 1.2);

      tl.to(this.crtScreen, {
        scale: 4,
        duration: 0.6,
        ease: 'power2.in'
      }, 1.2);

      // Fade out CRT body and other archive elements during expand
      tl.to(['.crt-body', '.crt-slot', '.crt-power-led', '.crt-brand', '.crt-speaker'], {
        opacity: 0,
        duration: 0.4
      }, 1.3);

      // Fade out scanlines, noise, vignette
      tl.to(['.crt-scanlines', '.crt-noise', '.crt-vignette', '.crt-preview'], {
        opacity: 0,
        duration: 0.4
      }, 1.4);

      // Reset scale after expand complete (browser will be over this)
      tl.set(this.crtScreen, { scale: 1, overflow: 'hidden', backgroundColor: '#000' }, 1.8);
      tl.set(['.crt-body', '.crt-slot', '.crt-power-led', '.crt-brand', '.crt-speaker'], { opacity: 1 }, 1.8);

      // Reset scanlines
      tl.call(() => {
        const scanlines = document.querySelector('.crt-scanlines');
        if (scanlines) {
          scanlines.style.background = '';
        }
      }, [], 1.8);
    }

    /* ─── H-TEARING BARS ─────────────────────────────────────────── */
    _buildTearingBars() {
      this.tearingEl.innerHTML = '';
      const barCount = 10;
      for (let i = 0; i < barCount; i++) {
        const bar = document.createElement('div');
        bar.className = 'gt-tear-bar';
        bar.style.cssText = `
          position: absolute; left: 0; width: 100%; height: ${100/barCount}%;
          background: #000;
          top: ${(i * 100/barCount)}%;
        `;
        bar.dataset.idx = i;
        this.tearingEl.appendChild(bar);
      }
    }

    _animateTearing() {
      const bars = this.tearingEl.querySelectorAll('.gt-tear-bar');
      bars.forEach((bar, i) => {
        const offset = (Math.random() - 0.5) * 40;
        gsap.fromTo(bar,
          { x: offset, backgroundColor: 'rgba(255,255,255,0.05)' },
          {
            x: -offset,
            duration: 0.05,
            repeat: 5,
            yoyo: true,
            ease: 'none'
          }
        );
      });
    }

    /* ─── SNOW NOISE ─────────────────────────────────────────────── */
    _startSnow() {
      const canvas = this.snowCanvas;
      const ctx = canvas.getContext('2d');
      this.snowCtx = ctx;

      const resize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };
      resize();

      const render = () => {
        if (!this.snowCtx) return;
        const w = canvas.width;
        const h = canvas.height;
        const imgData = ctx.createImageData(w, h);
        const data = imgData.data;
        for (let i = 0; i < data.length; i += 4) {
          const v = Math.random() * 255;
          data[i] = v;
          data[i+1] = v;
          data[i+2] = v;
          data[i+3] = 255;
        }
        ctx.putImageData(imgData, 0, 0);
        this.snowRAF = requestAnimationFrame(render);
      };
      render();
    }

    _stopSnow() {
      if (this.snowRAF) {
        cancelAnimationFrame(this.snowRAF);
        this.snowRAF = null;
      }
      this.snowCtx = null;
      if (this.snowCanvas) {
        this.snowCanvas.width = 0;
        this.snowCanvas.height = 0;
      }
    }
  }

  global.ArchiveGlitch = GlitchTransition;
})(window);