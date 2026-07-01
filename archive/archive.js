/* ═══════════════════════════════════════════════════════════════════════
   VHS ARCHIVE — MAIN CONTROLLER (Ferris-wheel carousel + CRT)
   ═══════════════════════════════════════════════════════════════════════ */

(function (global) {
  'use strict';

  if (typeof gsap === 'undefined') {
    console.error('[archive] GSAP not loaded.');
    return;
  }
  if (typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }
  if (typeof MotionPathPlugin !== 'undefined') {
    gsap.registerPlugin(MotionPathPlugin);
  }
  if (typeof Draggable !== 'undefined') {
    gsap.registerPlugin(Draggable);
  }

  const STATES = {
    CLOSED:       'closed',
    OPENING:      'opening',
    READY:        'ready',
    FLYING:       'flying',
    INSERTING:    'inserting',
    GLITCHING:    'glitching',
    BROWSING:     'browsing',
    RETURNING:    'returning',
    POWERING_OFF: 'powering_off',
    EJECTING:     'ejecting',
    CLOSING:      'closing'
  };

  const PROJECTS = [
    { id: 'remoire',     title: 'REMOIRE',     number: '01' },
    { id: 'careerforge', title: 'CAREERFORGE', number: '02' },
    { id: 'frenchquest', title: 'FRANÇAIS',    number: '03' },
    { id: 'chatbox',     title: 'CHATBOX',     number: '04' },
    { id: 'generator',   title: 'GENERATOR',   number: '05' },
  ];

  const TAPES = [
    ...PROJECTS.map(p => ({ ...p, copy: 1 })),
    ...PROJECTS.map(p => ({ ...p, id: p.id + '-b', origId: p.id, copy: 2 })),
  ];

  const PLAYABLE_TAPES = PROJECTS;
  const ANGLE_STEP = 360 / TAPES.length; // 36° per tape

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  class ArchiveScene {
    constructor() {
      this.overlay        = null;
      this.scene          = null;
      this.crtEl          = null;
      this.carouselEl     = null;
      this.tapeEls        = {};
      this.particleCanvas = null;
      this.exitHint       = null;
      this.soundHint      = null;

      this.state          = STATES.CLOSED;
      this.currentProject = null;
      this.hoveredTape    = null;
      this.soundEnabled   = false;

      this.crtEffects     = null;
      this.glitch         = null;
      this.particles      = null;
      this.audio          = null;

      // Carousel state
      this._angle         = 0;      // current rotation angle (degrees)
      this._autoSpeed     = 0.45;   // degrees per frame (auto-rotate)
      this._velocity      = 0;      // drag velocity
      this._dragging      = false;
      this._dragLastY     = 0;
      this._dragLastTime  = 0;
      this._hoverPaused   = false;
      this._lastFrontId   = null;
      this._raf           = null;

      this._onKeyDown     = this._onKeyDown.bind(this);
      this._onResize      = this._onResize.bind(this);
      this._onTrigger     = this._onTrigger.bind(this);
      this._renderCarousel = this._renderCarousel.bind(this);
    }

    init() {
      this._buildDOM();
      this._wireTriggers();
      document.addEventListener('keydown', this._onKeyDown);
      window.addEventListener('resize', this._onResize);
    }

    /* ─── DOM CONSTRUCTION ──────────────────────────────────────────── */
    _buildDOM() {
      if ($('#vhs-archive-overlay')) {
        this._queryExistingDOM();
        return;
      }

      const overlay = document.createElement('div');
      overlay.id = 'vhs-archive-overlay';
      overlay.className = 'vhs-archive-overlay';

      overlay.innerHTML = `
        <div class="archive-ambient-glow"></div>
        <canvas class="archive-particles" id="archive-particles"></canvas>

        <div class="archive-scene" id="archive-scene">
          <div class="archive-mobile-title lang-zh">VHS 档案室</div>
          <div class="archive-mobile-title lang-en">VHS ARCHIVE</div>
          <div class="archive-mobile-sub lang-zh">选择一盘磁带</div>
          <div class="archive-mobile-sub lang-en">SELECT A TAPE</div>

          <div class="tape-carousel" id="tape-carousel">
            <div class="tape-carousel-label">↕ drag to browse</div>
            ${TAPES.map(t => {
              const colorId = t.origId || t.id;
              return `
              <div class="vhs-tape"
                   data-project="${t.origId || t.id}" data-tape-id="${t.id}" id="tape-${t.id}"
                   style="--tape-default-text: var(--tape-${colorId}-text);">
                <div class="tape-body">
                  <div class="tape-window">
                    <div class="tape-reel tape-reel-left"></div>
                    <div class="tape-reel tape-reel-right"></div>
                  </div>
                  <div class="tape-specular"></div>
                  <div class="tape-label">
                    <span class="tape-number">${t.number}</span>
                    <span class="tape-title">${t.title}</span>
                    <span class="tape-action">PLAY ▶</span>
                    <span class="tape-format">VHS · ${colorId.toUpperCase()}</span>
                  </div>
                  <div class="tape-screws">
                    <span class="screw screw-tl"></span>
                    <span class="screw screw-tr"></span>
                    <span class="screw screw-bl"></span>
                    <span class="screw screw-br"></span>
                  </div>
                </div>
              </div>`;
            }).join('')}
          </div>

          <div class="crt-television" id="crt-television">
            <div class="crt-body">
              <div class="crt-screen-frame">
                <div class="crt-screen" id="crt-screen">
                  <div class="crt-content" id="crt-content">
                    <div class="crt-standby-line1">-- VHS ARCHIVE --</div>
                    <div class="crt-standby-line2">SELECT A TAPE</div>
                  </div>
                  <div class="crt-preview" id="crt-preview"></div>
                  <canvas class="crt-noise" id="crt-noise"></canvas>
                  <div class="crt-rgb-split" id="crt-rgb-split">
                    <div class="rgb-r"></div>
                    <div class="rgb-g"></div>
                    <div class="rgb-b"></div>
                  </div>
                  <div class="crt-tearing" id="crt-tearing"></div>
                  <div class="crt-vignette"></div>
                  <div class="crt-scanlines"></div>
                  <div class="crt-sound-hint" id="crt-sound-hint">🔇 Click for sound</div>
                </div>
              </div>
              <div class="crt-slot" id="crt-slot"></div>
              <div class="crt-speaker">
                <span></span><span></span><span></span><span></span>
                <span></span><span></span><span></span><span></span>
                <span></span><span></span><span></span><span></span>
              </div>
              <div class="crt-power-led"></div>
              <div class="crt-brand">JingerOS</div>
            </div>
          </div>
        </div>

        <div class="archive-exit-hint" id="archive-exit-hint">
          <kbd>ESC</kbd> Exit Archive
        </div>
      `;
      document.body.appendChild(overlay);

      const glitchLayer = document.createElement('div');
      glitchLayer.innerHTML = `
        <div class="glitch-flash" id="glitch-flash"></div>
        <div class="glitch-snow" id="glitch-snow"><canvas id="glitch-snow-canvas"></canvas></div>
        <div class="glitch-rgb" id="glitch-rgb"></div>
        <div class="glitch-tearing" id="glitch-tearing"></div>
      `;
      document.body.appendChild(glitchLayer);

      const browserShell = document.createElement('div');
      browserShell.className = 'browser-shell';
      browserShell.id = 'browser-shell';
      browserShell.innerHTML = `
        <div class="browser-chrome">
          <div class="browser-controls">
            <button class="browser-btn browser-btn-close" id="browser-close" aria-label="Close"></button>
            <button class="browser-btn browser-btn-minimize" aria-label="Minimize"></button>
            <button class="browser-btn browser-btn-maximize" aria-label="Maximize"></button>
          </div>
          <div class="browser-nav-arrows">
            <button class="browser-arrow" id="browser-back" aria-label="Back">←</button>
            <button class="browser-arrow" aria-label="Forward">→</button>
          </div>
          <div class="browser-address">
            <span class="browser-address-icon">🔒</span>
            <span id="browser-address-text">jingeros://archive</span>
          </div>
          <div class="browser-actions">
            <button class="browser-action-icon" aria-label="Bookmark">☆</button>
            <button class="browser-action-icon" aria-label="Menu">⋮</button>
          </div>
        </div>
        <div class="project-subnav" id="project-subnav">
          <a class="active" data-section="about">About</a>
          <a data-section="features">Features</a>
          <a data-section="tech">Tech</a>
        </div>
        <div class="browser-content" id="browser-content">
          ${this._buildAllProjectPages()}
        </div>
      `;
      document.body.appendChild(browserShell);

      this._assignDOMRefs(overlay);
      this._initSubModules();
    }

    _assignDOMRefs(overlay) {
      this.overlay        = overlay || $('#vhs-archive-overlay');
      this.scene          = $('#archive-scene');
      this.crtEl          = $('#crt-television');
      this.carouselEl     = $('#tape-carousel');
      this.tapeEls        = TAPES.reduce((acc, t) => {
        acc[t.id] = $(`#tape-${t.id}`);
        return acc;
      }, {});
      this.particleCanvas = $('#archive-particles');
      this.exitHint       = $('#archive-exit-hint');
      this.soundHint      = $('#crt-sound-hint');
      this.browserShell   = $('#browser-shell');
      this.browserContent = $('#browser-content');
      this.browserAddress = $('#browser-address-text');

      const tearingEl = $('#crt-tearing');
      if (tearingEl && !tearingEl.querySelector('.tear-bar')) {
        for (let i = 0; i < 12; i++) {
          const bar = document.createElement('div');
          bar.className = 'tear-bar';
          bar.style.top = (i * 8.33) + '%';
          tearingEl.appendChild(bar);
        }
      }
    }

    _queryExistingDOM() {
      this._assignDOMRefs();
      this._initSubModules();
    }

    _initSubModules() {
      if (global.ArchiveAudio) {
        this.audio = new global.ArchiveAudio();
      }
      if (global.ArchiveParticles) {
        this.particles = new global.ArchiveParticles(this.particleCanvas);
      }
      if (global.ArchiveCRTEffects) {
        this.crtEffects = new global.ArchiveCRTEffects($('#crt-preview'), $('#crt-noise'));
      }
      if (global.ArchiveGlitch) {
        this.glitch = new global.ArchiveGlitch({
          flashEl:     $('#glitch-flash'),
          snowEl:      $('#glitch-snow'),
          snowCanvas:  $('#glitch-snow-canvas'),
          rgbEl:       $('#glitch-rgb'),
          tearingEl:   $('#glitch-tearing'),
          crtContent:  $('#crt-content'),
          crtScreen:   $('#crt-screen'),
          crtTearing:  $('#crt-tearing'),
          crtRgbSplit: $('#crt-rgb-split')
        });
      }

      $('#browser-close').addEventListener('click', () => this._returnToArchive());
      $('#browser-back').addEventListener('click', () => this._returnToArchive());
      this.soundHint.addEventListener('click', () => this._toggleSound());

      $$('.project-subnav a').forEach(a => {
        a.addEventListener('click', (e) => {
          e.preventDefault();
          const section = a.getAttribute('data-section');
          $$('.project-subnav a').forEach(x => x.classList.remove('active'));
          a.classList.add('active');
          this._scrollProjectTo(section);
        });
      });

      this._setupCarouselInput();
    }

    _scrollProjectTo(section) {
      const target = this.browserContent.querySelector(`#section-${section}, [data-section="${section}"]`);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    /* ─── CAROUSEL INPUT (drag + scroll + click) ───────────────────── */
    _setupCarouselInput() {
      const el = this.carouselEl;
      if (!el) return;

      let startY = 0;
      let startAngle = 0;

      const onPointerDown = (e) => {
        if (this.state !== STATES.READY) return;
        this._dragging = true;
        this._velocity = 0;
        startY = e.clientY || (e.touches && e.touches[0].clientY) || 0;
        startAngle = this._angle;
        this._dragLastY = startY;
        this._dragLastTime = performance.now();
        e.preventDefault();
      };

      const onPointerMove = (e) => {
        if (!this._dragging) return;
        const clientY = e.clientY || (e.touches && e.touches[0].clientY) || 0;
        const dy = clientY - startY;
        const sensitivity = 0.5;
        this._angle = startAngle + dy * sensitivity;

        const now = performance.now();
        const dt = now - this._dragLastTime;
        if (dt > 0) {
          this._velocity = (clientY - this._dragLastY) * sensitivity / dt * 16;
        }
        this._dragLastY = clientY;
        this._dragLastTime = now;
      };

      const onPointerUp = () => {
        if (!this._dragging) return;
        this._dragging = false;
        // velocity decays naturally in the render loop
      };

      el.addEventListener('mousedown', onPointerDown);
      el.addEventListener('touchstart', onPointerDown, { passive: false });
      window.addEventListener('mousemove', onPointerMove);
      window.addEventListener('touchmove', onPointerMove, { passive: false });
      window.addEventListener('mouseup', onPointerUp);
      window.addEventListener('touchend', onPointerUp);

      el.addEventListener('wheel', (e) => {
        if (this.state !== STATES.READY) return;
        e.preventDefault();
        this._angle += e.deltaY * 0.15;
      }, { passive: false });

      // Tape click
      TAPES.forEach((t, idx) => {
        const tapeEl = this.tapeEls[t.id];
        if (!tapeEl) return;
        tapeEl.addEventListener('click', (e) => {
          if (this.state !== STATES.READY) return;
          const tapeAngle = this._getTapeAngle(idx);
          const rad = tapeAngle * Math.PI / 180;
          const depth = Math.cos(rad);
          if (depth > 0.5) {
            this._handleTapeClick(t.origId || t.id);
          }
        });
        tapeEl.addEventListener('mouseenter', () => {
          if (this.state !== STATES.READY) return;
          const tapeAngle = this._getTapeAngle(idx);
          const depth = Math.cos(tapeAngle * Math.PI / 180);
          if (depth > 0.5) {
            this._handleTapeHover(t.origId || t.id);
          }
        });
        tapeEl.addEventListener('mouseleave', () => {
          this._handleTapeHoverEnd();
        });
      });
    }

    /* ─── CAROUSEL RENDERING ───────────────────────────────────────── */
    _startCarousel() {
      if (this._raf) return;
      this._raf = true;
      gsap.ticker.add(this._renderCarousel);
    }

    _stopCarousel() {
      if (this._raf) {
        gsap.ticker.remove(this._renderCarousel);
        this._raf = null;
      }
    }

    _renderCarousel() {
      if (this.state === STATES.CLOSED || this.state === STATES.CLOSING) {
        gsap.ticker.remove(this._renderCarousel);
        this._raf = null;
        return;
      }

      if (!this._dragging && !this._hoverPaused) {
        if (Math.abs(this._velocity) > 0.01) {
          this._angle += this._velocity;
          this._velocity *= 0.95;
        } else {
          this._velocity = 0;
          this._angle += this._autoSpeed;
        }
      }

      const carouselH = this.carouselEl ? this.carouselEl.offsetHeight : 400;
      const radius = carouselH * 0.45;

      let closestFrontId = null;
      let closestFrontDist = Infinity;

      TAPES.forEach((t, i) => {
        const el = this.tapeEls[t.id];
        if (!el || el.classList.contains('playing')) return;

        const tapeAngle = this._getTapeAngle(i);
        const rad = tapeAngle * Math.PI / 180;

        const yPos = Math.sin(rad) * radius;
        const depth = Math.cos(rad);

        const scale = 0.35 + Math.max(0, (depth + 1)) * 0.35;
        const opacity = depth > -0.15 ? Math.min(1, Math.pow((depth + 0.15) / 1.15, 0.7)) : 0;
        const zIdx = Math.round((depth + 1) * 50);

        const isFront = depth > 0.85;
        const popOut = isFront ? (depth - 0.85) * 60 : 0;

        gsap.set(el, {
          x: popOut,
          y: yPos,
          xPercent: -50,
          yPercent: -50,
          scale: scale,
          opacity: opacity,
          zIndex: zIdx
        });

        el.style.left = '50%';
        el.style.top = '50%';
        el.style.pointerEvents = (depth > 0.5 && this.state === STATES.READY) ? 'auto' : 'none';

        if (depth > 0.5) {
          el.style.filter = isFront
            ? 'drop-shadow(0 6px 16px rgba(0,0,0,0.5))'
            : '';
          el.style.cursor = 'pointer';
        } else {
          el.style.filter = `blur(${Math.round((1 - Math.max(0, depth)) * 2)}px)`;
          el.style.cursor = '';
        }

        if (depth > 0.9) {
          const projectId = t.origId || t.id;
          const dist = Math.abs(((tapeAngle % 360) + 360) % 360);
          const frontDist = dist > 180 ? 360 - dist : dist;
          if (frontDist < closestFrontDist) {
            closestFrontDist = frontDist;
            closestFrontId = projectId;
          }
        }
      });

      if (closestFrontId !== this._lastFrontId && !this._dragging) {
        this._lastFrontId = closestFrontId;
        if (closestFrontId && !this._hoverPaused) {
          if (this.crtEffects) this.crtEffects.showPreview(closestFrontId);
        }
      }
    }

    _getTapeAngle(index) {
      return this._angle + index * ANGLE_STEP;
    }

    /* ─── TRIGGER WIRING ────────────────────────────────────────────── */
    _wireTriggers() {
      $$('[data-win="win-projects"]').forEach(el => {
        el.addEventListener('click', (e) => {
          if (this.state !== STATES.CLOSED) return;
          e.preventDefault();
          e.stopPropagation();
          this._onTrigger();
        });
      });

      const dockProj = $('#dock-item-win-projects');
      if (dockProj) {
        dockProj.addEventListener('click', (e) => {
          if (this.state !== STATES.CLOSED) {
            e.stopPropagation();
            return;
          }
          e.preventDefault();
          e.stopPropagation();
          this._onTrigger();
        }, true);
      }
    }

    _onTrigger() {
      if (this.state !== STATES.CLOSED) return;
      this.openArchive();
    }

    /* ─── ARCHIVE OPEN ──────────────────────────────────────────────── */
    openArchive() {
      if (this.state !== STATES.CLOSED) return;
      this.state = STATES.OPENING;

      document.body.classList.add('archive-active');
      this.overlay.classList.add('active');
      this.exitHint.classList.add('visible');

      gsap.set(this.crtEl, {
        xPercent: -50,
        yPercent: -50,
        y: window.innerHeight,
        opacity: 0
      });

      TAPES.forEach(t => {
        const el = this.tapeEls[t.id];
        if (el) gsap.set(el, { opacity: 0, scale: 0.3 });
      });

      if (this.crtEffects) this.crtEffects.init();

      const tl = gsap.timeline({
        onComplete: () => {
          this.state = STATES.READY;
          if (this.particles) this.particles.start();
          this._startCarousel();
        }
      });

      tl.to(this.crtEl, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out'
      }, 0.3);

      tl.to(this.crtEl, { y: -8, duration: 0.1, ease: 'power2.out' }, 1.1);
      tl.to(this.crtEl, { y: 0, duration: 0.2, ease: 'power2.inOut' }, 1.2);

      tl.add(() => this._powerOnCRTScreen(), 0.8);
      tl.call(() => this.soundHint.classList.add('visible'), [], '+=0.6');

      if (this.audio) {
        tl.call(() => this.audio.play('archive-rise'), [], 0.3);
      }
    }

    _powerOnCRTScreen() {
      const tl = gsap.timeline();
      const lineEl = document.createElement('div');
      lineEl.style.cssText = `
        position: absolute; left: 0; top: 50%; width: 0; height: 2px;
        background: var(--crt-phosphor);
        box-shadow: 0 0 8px var(--crt-phosphor), 0 0 16px rgba(51,204,85,0.6);
        z-index: 20; transform: translateY(-50%);
      `;
      $('#crt-screen').appendChild(lineEl);

      tl.to(lineEl, { width: '100%', duration: 0.15, ease: 'power2.out' })
        .to(lineEl, { height: '100%', top: '0%', y: '0%', duration: 0.2, ease: 'power2.in' }, '+=0')
        .to(lineEl, { opacity: 0, duration: 0.15 }, '+=0')
        .call(() => lineEl.remove())
        .call(() => {
          $('#crt-content').style.opacity = '1';
          gsap.fromTo($('#crt-content'),
            { opacity: 0 },
            { opacity: 1, duration: 0.3, ease: 'power2.out' }
          );
        });
    }

    /* ─── HOVER HANDLERS ────────────────────────────────────────────── */
    _handleTapeHover(projectId) {
      if (this.state !== STATES.READY) return;
      this.hoveredTape = projectId;
      this._hoverPaused = true;
      if (this.crtEffects) this.crtEffects.showPreview(projectId);
      this.soundHint.classList.add('visible');
      if (this.audio) this.audio.play('tape-hover-hum');
    }

    _handleTapeHoverEnd() {
      if (this.state !== STATES.READY) return;
      this.hoveredTape = null;
      this._hoverPaused = false;
      if (this.crtEffects) this.crtEffects.hidePreview();
      if (this.audio) this.audio.stop('tape-hover-hum');
    }

    _handleTapeClick(projectId) {
      if (this.state !== STATES.READY) return;
      this.state = STATES.FLYING;
      this.currentProject = projectId;
      this._hoverPaused = false;
      this._stopCarousel();
      if (this.crtEffects) this.crtEffects.hidePreview();

      const clickedEl = this._findFrontTapeEl(projectId);
      this._playTape(projectId, clickedEl);
    }

    _findFrontTapeEl(projectId) {
      let best = null;
      let bestDepth = -Infinity;
      TAPES.forEach((t, i) => {
        if ((t.origId || t.id) !== projectId) return;
        const rad = this._getTapeAngle(i) * Math.PI / 180;
        const depth = Math.cos(rad);
        if (depth > bestDepth) {
          bestDepth = depth;
          best = this.tapeEls[t.id];
        }
      });
      return best || this.tapeEls[projectId];
    }

    /* ─── TAPE PLAY SEQUENCE (bezier flight + insert) ──────────────── */
    _playTape(projectId, tapeEl) {
      const slotEl = $('#crt-slot');
      this._flyingTapeEl = tapeEl;

      TAPES.forEach(t => {
        const el = this.tapeEls[t.id];
        if (el && el !== tapeEl) {
          gsap.to(el, { opacity: 0, scale: 0.4, duration: 0.3, ease: 'power2.out' });
        }
      });

      tapeEl.classList.add('playing');

      const tapeRect = tapeEl.getBoundingClientRect();
      const slotRect = slotEl.getBoundingClientRect();
      const tapeCX = tapeRect.left + tapeRect.width / 2;
      const tapeCY = tapeRect.top + tapeRect.height / 2;
      const slotCX = slotRect.left + slotRect.width / 2;
      const slotCY = slotRect.top + slotRect.height / 2;

      const currentX = gsap.getProperty(tapeEl, 'x') || 0;
      const currentY = gsap.getProperty(tapeEl, 'y') || 0;

      const dx = slotCX - tapeCX + currentX;
      const dy = slotCY - tapeCY + currentY;

      if (this.audio) this.audio.play('tape-flight-whoosh');

      const tl = gsap.timeline();

      // T+0ms: lift off — tape rises and curves toward CRT
      tl.to(tapeEl, {
        x: currentX + dx * 0.3,
        y: currentY + Math.min(dy * 0.2, -60),
        scale: 0.9,
        rotation: -15,
        duration: 0.2,
        ease: 'power2.out'
      });

      // T+200ms: bezier flight — sweep toward CRT slot with rotation
      tl.to(tapeEl, {
        x: currentX + dx,
        y: currentY + dy - 8,
        scale: 0.75,
        rotation: 0,
        duration: 0.4,
        ease: 'power3.out'
      });

      // T+600ms: pause — hover above slot (250ms)
      tl.to(tapeEl, {
        y: currentY + dy - 5,
        duration: 0.25,
        ease: 'sine.inOut'
      });

      // T+850ms: insert — slow approach, then click into slot
      tl.to(tapeEl, {
        y: currentY + dy - 2,
        duration: 0.1,
        ease: 'power1.in'
      });

      tl.call(() => {
        this.state = STATES.INSERTING;
        if (this.audio) this.audio.play('tape-insert-click');
      });

      // Final push + lock
      tl.to(tapeEl, {
        y: currentY + dy + 1,
        duration: 0.04,
        ease: 'power3.in'
      });

      // CRT shudder on lock
      tl.call(() => {
        gsap.fromTo(this.crtEl,
          { y: 0 },
          { y: 2, duration: 0.04, yoyo: true, repeat: 3, ease: 'power2.inOut' }
        );
      });

      // Tape absorbs into slot
      tl.to(tapeEl, {
        scaleY: 0.03,
        scaleX: 1.3,
        opacity: 0,
        duration: 0.2,
        ease: 'power2.in',
        onComplete: () => this._beginGlitch(projectId)
      });
    }

    /* ─── GLITCH TRANSITION ──────────────────────────────────────────── */
    _beginGlitch(projectId) {
      this.state = STATES.GLITCHING;
      if (this.particles) this.particles.stop();
      if (this.audio) this.audio.playGlitchSequence();

      if (this.glitch) {
        this.glitch.run(projectId, {
          onComplete: () => this._openBrowser(projectId)
        });
      } else {
        setTimeout(() => this._openBrowser(projectId), 1800);
      }
    }

    /* ─── BROWSER OPEN ──────────────────────────────────────────────── */
    _openBrowser(projectId) {
      if (this.currentProject === 'generator' && projectId !== 'generator') {
        document.dispatchEvent(new Event('jingeros:generator-cleanup'));
      }

      this.state = STATES.BROWSING;
      this.currentProject = projectId;

      gsap.set(this.overlay, { opacity: 0, pointerEvents: 'none' });

      const url = `jingeros://projects/${projectId}`;
      this._typeAddress(url);

      $$('.project-page').forEach(p => p.classList.remove('active'));
      const targetPage = this.browserContent.querySelector(`#project-page-${projectId}`);
      if (targetPage) targetPage.classList.add('active');

      this.browserShell.className = 'browser-shell active';
      if (targetPage) {
        const theme = targetPage.getAttribute('data-theme');
        if (theme) this.browserShell.classList.add(theme);
      }

      $$('.project-subnav a').forEach(a => {
        a.classList.toggle('active', a.getAttribute('data-section') === 'about');
      });

      this.browserContent.scrollTop = 0;

      const tl = gsap.timeline();

      tl.fromTo(this.browserShell,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: 'power2.out' }
      );
      tl.fromTo('.browser-shell .browser-btn',
        { scale: 0 },
        { scale: 1, duration: 0.25, stagger: 0.05, ease: 'back.out(2)' },
        '-=0.15'
      );
      tl.fromTo('.project-subnav',
        { opacity: 0 },
        { opacity: 1, duration: 0.2 },
        '-=0.1'
      );
      tl.fromTo('.browser-content',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out', clearProps: 'transform' },
        '-=0.1'
      );

      if (this.audio) this.audio.play('browser-digital-rise');

      if (projectId === 'remoire') {
        setTimeout(() => this._initRemoireAnimations(), 500);
      }
      if (projectId === 'careerforge') {
        setTimeout(() => this._initCareerForgeAnimations(), 500);
      }
      if (projectId === 'generator') {
        setTimeout(() => this._initGeneratorAnimations(), 500);
      }
    }

    /* ─── REMOIRE PAGE ANIMATIONS ───────────────────────────────────── */
    _initRemoireAnimations() {
      const page = document.querySelector('.remoire-page');
      if (!page) return;

      const subnav = document.querySelector('#project-subnav');
      if (subnav) {
        subnav.innerHTML = `
          <a class="active" data-section="about">About</a>
          <a data-section="features">Features</a>
          <a data-section="tech">Tech</a>
          <a data-section="github">GitHub</a>
        `;
        subnav.querySelectorAll('a[data-section]').forEach(a => {
          a.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = a.getAttribute('data-section');
            subnav.querySelectorAll('a').forEach(x => x.classList.remove('active'));
            a.classList.add('active');
            const target = page.querySelector(`#section-${sectionId}`);
            if (target) {
              const container = page.closest('.browser-content');
              if (container) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }
          });
        });
      }

      // Counter animation for stats
      const statItems = page.querySelectorAll('.stat-item[data-count]');
      statItems.forEach((item, idx) => {
        const target = parseInt(item.getAttribute('data-count'));
        const valueEl = item.querySelector('.stat-value');
        if (!valueEl) return;
        gsap.fromTo(valueEl,
          { textContent: 0 },
          {
            textContent: target,
            duration: 2,
            delay: 0.8 + idx * 0.15,
            ease: 'power2.out',
            snap: { textContent: 1 },
            onUpdate: function() {
              valueEl.textContent = Math.round(this.targets()[0].textContent);
            }
          }
        );
      });

      // Progress bar visibility
      const progress = page.querySelector('.remoire-progress');
      if (progress) progress.classList.add('visible');

      // Scroll-triggered reveals using IntersectionObserver
      const observerOptions = { threshold: 0.15, rootMargin: '0px 0px -50px 0px' };

      // Feature sections
      const featureSections = page.querySelectorAll('.remoire-feature-section');
      featureSections.forEach((section, idx) => {
        const textBlock = section.querySelector('.text-block');
        const imageBlock = section.querySelector('.image-block');
        const bgNumber = section.querySelector('.feature-bg-number');

        if (textBlock) {
          textBlock.style.opacity = '0';
          textBlock.style.transform = idx % 2 === 0 ? 'translateX(-40px)' : 'translateX(40px)';
        }
        if (imageBlock) {
          imageBlock.querySelectorAll('.screenshot-reveal').forEach(reveal => {
            reveal.style.opacity = '0';
            reveal.style.transform = 'translateY(40px)';
          });
        }
        if (bgNumber) {
          bgNumber.style.opacity = '0';
          bgNumber.style.transform = 'scale(0.8)';
        }

        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              if (textBlock) {
                gsap.to(textBlock, { opacity: 1, x: 0, duration: 0.9, ease: 'power3.out' });
              }
              if (imageBlock) {
                imageBlock.querySelectorAll('.screenshot-reveal').forEach((reveal, ri) => {
                  gsap.to(reveal, { opacity: 1, y: 0, duration: 1, delay: 0.2 + ri * 0.15, ease: 'power3.out' });
                });
              }
              if (bgNumber) {
                gsap.to(bgNumber, { opacity: 0.03, scale: 1, duration: 1.2, ease: 'power2.out' });
              }
              observer.unobserve(entry.target);
            }
          });
        }, observerOptions);
        observer.observe(section);
      });

      // Positioning section
      const positioning = page.querySelector('.remoire-positioning');
      if (positioning) {
        const quote = positioning.querySelector('.positioning-quote');
        const desc = positioning.querySelector('.positioning-desc');
        if (quote) { quote.style.opacity = '0'; quote.style.transform = 'translateY(30px)'; }
        if (desc) { desc.style.opacity = '0'; desc.style.transform = 'translateY(20px)'; }

        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              if (quote) gsap.to(quote, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' });
              if (desc) gsap.to(desc, { opacity: 1, y: 0, duration: 0.8, delay: 0.3, ease: 'power3.out' });
              observer.unobserve(entry.target);
            }
          });
        }, observerOptions);
        observer.observe(positioning);
      }

      // Tech cards
      const techCards = page.querySelectorAll('.tech-card');
      techCards.forEach((card, idx) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              gsap.to(card, { opacity: 1, y: 0, duration: 0.7, delay: idx * 0.1, ease: 'power3.out' });
              observer.unobserve(entry.target);
            }
          });
        }, observerOptions);
        observer.observe(card);
      });

      // Architecture tree items
      const treeItems = page.querySelectorAll('.arch-item.tree-animate');
      treeItems.forEach((item, idx) => {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              setTimeout(() => item.classList.add('revealed'), idx * 80);
              observer.unobserve(entry.target);
            }
          });
        }, { threshold: 0.1 });
        observer.observe(item);
      });

      // Gallery items
      const galleryItems = page.querySelectorAll('.remoire-gallery-item');
      galleryItems.forEach((item, idx) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(40px) scale(0.95)';
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              gsap.to(item, {
                opacity: 1, y: 0, scale: 1,
                duration: 0.8,
                delay: (idx % 3) * 0.1,
                ease: 'power3.out'
              });
              observer.unobserve(entry.target);
            }
          });
        }, observerOptions);
        observer.observe(item);
      });

      // Platform cards
      const platformCards = page.querySelectorAll('.platform-card');
      platformCards.forEach((card, idx) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              gsap.to(card, { opacity: 1, y: 0, duration: 0.6, delay: idx * 0.12, ease: 'power3.out' });
              observer.unobserve(entry.target);
            }
          });
        }, observerOptions);
        observer.observe(card);
      });

      // Progress bar tracking
      const progressFill = page.querySelector('#rm-progress-fill');
      const progressDots = page.querySelectorAll('.remoire-progress-dots .dot');
      if (progressFill) {
        const updateProgress = () => {
          const scrollTop = this.browserContent.scrollTop;
          const scrollHeight = this.browserContent.scrollHeight - this.browserContent.clientHeight;
          const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
          progressFill.style.width = progress + '%';

          // Update active dot
          const sections = page.querySelectorAll('section[id], .remoire-feature-section');
          let activeIdx = 0;
          sections.forEach((section, idx) => {
            const rect = section.getBoundingClientRect();
            const containerRect = this.browserContent.getBoundingClientRect();
            if (rect.top <= containerRect.top + containerRect.height * 0.4) {
              activeIdx = idx;
            }
          });
          progressDots.forEach((dot, idx) => {
            dot.classList.toggle('active', idx === activeIdx);
          });
        };
        this.browserContent.addEventListener('scroll', updateProgress, { passive: true });
      }

      // Subnav click smooth scroll
      const subnavLinks = document.querySelectorAll('.project-subnav a');
      subnavLinks.forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          const section = link.getAttribute('data-section');
          const target = page.querySelector(`#section-${section}`);
          if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        });
      });

      // 3D tilt effect on phone frames
      const phoneFrames = page.querySelectorAll('.remoire-phone-frame');
      phoneFrames.forEach(frame => {
        const parent = frame.closest('.image-block');
        if (!parent) return;
        parent.addEventListener('mousemove', (e) => {
          const rect = parent.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width - 0.5;
          const y = (e.clientY - rect.top) / rect.height - 0.5;
          frame.style.transform = `perspective(1000px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) scale(1.02)`;
        });
        parent.addEventListener('mouseleave', () => {
          frame.style.transform = '';
        });
      });
    }

    /* ─── CAREERFORGE PAGE ANIMATIONS ──────────────────────────────────── */
    _initCareerForgeAnimations() {
      const page = document.querySelector('.cf-page');
      if (!page) return;

      const scrollRoot = this.browserContent || page.closest('.browser-content');

      // Update subnav labels for CareerForge (click binding happens in _initCFParticleTransitions where goToSection is defined)
      const subnav = document.querySelector('#project-subnav');
      if (subnav) {
        subnav.innerHTML = `
          <a class="active" data-section="0">Overview</a>
          <a data-section="1">Skills</a>
          <a data-section="2">Numbers</a>
          <a data-section="3">Details</a>
          <a data-section="4">GitHub</a>
        `;
      }

      // Star field
      const starField = page.querySelector('#cf-star-field');
      if (starField) {
        for (let i = 0; i < 80; i++) {
          const star = document.createElement('div');
          star.className = 'cf-star';
          star.style.left = Math.random() * 100 + '%';
          star.style.top = Math.random() * 100 + '%';
          star.style.setProperty('--twinkle-dur', (2 + Math.random() * 4) + 's');
          star.style.setProperty('--twinkle-delay', (Math.random() * 3) + 's');
          star.style.setProperty('--star-min', (0.1 + Math.random() * 0.2).toFixed(2));
          star.style.setProperty('--star-max', (0.5 + Math.random() * 0.5).toFixed(2));
          if (Math.random() > 0.7) star.style.width = star.style.height = '3px';
          starField.appendChild(star);
        }
      }

      // Hero title shuffle
      const heroTitle = page.querySelector('#cf-hero-title');
      if (heroTitle) this._cfShuffleText(heroTitle, 0.6);

      // Hero stats counter
      const heroStats = page.querySelectorAll('.cf-hero-stats .cf-stat[data-count]');
      heroStats.forEach((stat, idx) => {
        const target = parseInt(stat.getAttribute('data-count'));
        const valueEl = stat.querySelector('.cf-stat-value');
        if (!valueEl) return;
        gsap.fromTo(valueEl, { textContent: 0 }, {
          textContent: target, duration: 2, delay: 1.2 + idx * 0.2,
          ease: 'power2.out', snap: { textContent: 1 },
          onUpdate: function() { valueEl.textContent = Math.round(this.targets()[0].textContent); }
        });
      });

      // 3D orbit animation (JS-driven elliptical paths)
      this._initCFOrbitAnimation(page);

      // Particle collapse transition between sections
      this._initCFParticleTransitions(page, scrollRoot);

      // Scroll-based section reveals
      const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px',
        root: scrollRoot || null
      };

      const shuffleTitles = page.querySelectorAll('[data-shuffle]');
      shuffleTitles.forEach(title => {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              this._cfShuffleText(title, 0.3);
              observer.unobserve(entry.target);
            }
          });
        }, observerOptions);
        observer.observe(title);
      });

      const metricCards = page.querySelectorAll('.cf-metric-card[data-count]');
      metricCards.forEach((card, idx) => {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const target = parseInt(card.getAttribute('data-count'));
              const suffix = card.getAttribute('data-suffix') || '';
              const numEl = card.querySelector('.cf-metric-number');
              if (!numEl) return;
              gsap.fromTo(numEl, { textContent: 0 }, {
                textContent: target, duration: 1.8, delay: idx * 0.15,
                ease: 'power2.out', snap: { textContent: 1 },
                onUpdate: function() { numEl.textContent = Math.round(this.targets()[0].textContent) + suffix; },
                onComplete: function() { numEl.textContent = target + suffix; }
              });
              observer.unobserve(entry.target);
            }
          });
        }, observerOptions);
        observer.observe(card);
      });

      const skillDetails = page.querySelectorAll('.cf-skill-detail');
      skillDetails.forEach(detail => {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              gsap.to(detail, { opacity: 1, y: 0, duration: 1, delay: 0.1, ease: 'power3.out' });
              observer.unobserve(entry.target);
            }
          });
        }, { threshold: 0.1, root: scrollRoot || null });
        observer.observe(detail);
      });
    }

    _initCFOrbitAnimation(page) {
      const planets = page.querySelectorAll('.cf-planet');
      if (!planets.length) return;

      const ellipse = { rx: 170, ry: 75 };
      const speed = 0.0003;
      let running = true;
      let paused = false;
      let startTime = performance.now();
      let pauseOffset = 0;

      planets.forEach(p => {
        p.addEventListener('mouseenter', () => {
          paused = true;
          pauseOffset = performance.now();
        });
        p.addEventListener('mouseleave', () => {
          startTime += performance.now() - pauseOffset;
          paused = false;
        });
      });

      const animate = (now) => {
        if (!running) return;
        if (!paused) {
          const elapsed = now - startTime;
          planets.forEach(p => {
            const angle0 = parseFloat(p.getAttribute('data-angle')) || 0;
            const a = (angle0 * Math.PI / 180) + elapsed * speed;
            const x = Math.cos(a) * ellipse.rx;
            const y = Math.sin(a) * ellipse.ry;
            const depth = (Math.sin(a) + 1) / 2;
            const scale = 0.7 + 0.3 * depth;
            p.style.transform = `translate(${x}px, ${y}px)`;
            p.style.zIndex = Math.round(depth * 100) + 2;
            const body = p.querySelector('.cf-planet-body');
            if (body) {
              body.style.transform = `scale(${scale.toFixed(2)})`;
              const svg = body.querySelector('svg');
              if (svg) svg.style.opacity = (0.5 + 0.5 * depth).toFixed(2);
            }
          });
        }
        requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);

      this._cfOrbitCleanup = () => { running = false; };
    }

    _initCFParticleTransitions(page, scrollRoot) {
      const canvas = page.querySelector('#cf-particle-canvas');
      if (!canvas || !scrollRoot) return;
      const ctx = canvas.getContext('2d');
      const sections = Array.from(page.querySelectorAll('.cf-section'));
      if (sections.length < 2) return;

      // Section names for labels
      const sectionNames = ['Overview', 'Skill Galaxy', 'By the Numbers', 'Deep Dive', 'Ready to Forge'];

      let particles = [];
      let animFrame = null;
      let isActive = false;
      let currentSection = 0;
      let isTransitioning = false;
      let scrollAccumulated = 0;
      const SCROLL_THRESHOLD = 60; // pixels of scroll to trigger transition (lower = more responsive)

      // Resize canvas to full viewport
      const resize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };
      resize();
      window.addEventListener('resize', resize);

      // Initialize sections - only show first one
      sections.forEach((s, i) => {
        s.classList.toggle('active', i === 0);
        s.style.position = 'absolute';
        s.style.top = '0';
        s.style.left = '0';
        s.style.width = '100%';
        s.style.height = '100vh';
        s.style.overflow = i === 3 ? 'auto' : 'hidden'; // Deep Dive section can scroll internally
      });

      // Create scroll indicator dots
      let indicatorContainer = page.querySelector('.cf-scroll-indicator');
      if (!indicatorContainer) {
        indicatorContainer = document.createElement('div');
        indicatorContainer.className = 'cf-scroll-indicator';
        sections.forEach((_, i) => {
          const dot = document.createElement('div');
          dot.className = 'cf-scroll-dot' + (i === 0 ? ' active' : '');
          dot.addEventListener('click', () => goToSection(i));
          indicatorContainer.appendChild(dot);
        });
        page.appendChild(indicatorContainer);
      }

      // Section label for transition
      let sectionLabel = page.querySelector('.cf-section-label');
      if (!sectionLabel) {
        sectionLabel = document.createElement('div');
        sectionLabel.className = 'cf-section-label';
        page.appendChild(sectionLabel);
      }

      // Update dots
      const updateDots = (idx) => {
        indicatorContainer.querySelectorAll('.cf-scroll-dot').forEach((d, i) => {
          d.classList.toggle('active', i === idx);
        });
      };

      // Spawn particle rain
      const spawnParticles = (direction) => {
        const count = 600;
        const goingDown = direction > 0;
        const w = canvas.width;
        const h = canvas.height;
        const cols = 40;

        for (let i = 0; i < count; i++) {
          const col = i % cols;
          const row = Math.floor(i / cols);
          const xBase = (col / cols) * w + (Math.random() - 0.5) * (w / cols);

          particles.push({
            x: xBase + (Math.random() - 0.5) * 20,
            y: goingDown ? -row * 8 - Math.random() * 30 : h + row * 8 + Math.random() * 30,
            vx: (Math.random() - 0.5) * 0.5,
            vy: goingDown ? 4 + Math.random() * 6 : -(4 + Math.random() * 6),
            size: 6 + Math.random() * 10,
            char: String.fromCharCode(48 + Math.floor(Math.random() * 10)),
            alpha: 0.4 + Math.random() * 0.4,
            life: 1.0,
            decay: 0.008 + Math.random() * 0.008,
            trail: [] // For motion blur effect
          });
        }
      };

      // Draw particles with trail effect
      const drawParticles = () => {
        // Clear with transparency for trail effect, but keep background visible
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        let alive = 0;
        for (let i = particles.length - 1; i >= 0; i--) {
          const p = particles[i];
          if (p.life <= 0) { particles.splice(i, 1); continue; }
          alive++;

          // Store trail
          p.trail.push({ x: p.x, y: p.y, alpha: p.alpha * p.life });
          if (p.trail.length > 4) p.trail.shift();

          p.x += p.vx;
          p.y += p.vy;
          p.vy *= 1.005; // slight acceleration
          p.life -= p.decay;

          const a = p.alpha * p.life;
          if (a < 0.01) { p.life = 0; continue; }

          // Draw trail
          p.trail.forEach((t, idx) => {
            const trailAlpha = t.alpha * (idx / p.trail.length) * 0.3;
            ctx.font = (p.size * 0.7) + 'px "Fusion Pixel", monospace';
            ctx.fillStyle = `rgba(200, 210, 255, ${trailAlpha.toFixed(3)})`;
            ctx.fillText(p.char, t.x, t.y);
          });

          // Draw main particle
          ctx.font = p.size + 'px "Fusion Pixel", monospace';
          ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(1, a).toFixed(3)})`;
          ctx.fillText(p.char, p.x, p.y);
        }

        if (alive > 0) {
          animFrame = requestAnimationFrame(drawParticles);
        } else {
          isActive = false;
          canvas.classList.remove('active');
          particles = [];
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
      };

      // Trigger particle animation
      const triggerParticles = (direction, callback) => {
        resize();
        canvas.classList.add('active');
        spawnParticles(direction);

        // Show section label
        const targetName = sectionNames[currentSection + direction] || sectionNames[currentSection];
        sectionLabel.textContent = targetName;
        sectionLabel.classList.add('visible');

        if (!isActive) {
          isActive = true;
          animFrame = requestAnimationFrame(drawParticles);
        }

        // Faster callback - don't wait for all particles to finish
        setTimeout(() => {
          sectionLabel.classList.remove('visible');
          if (callback) callback();
        }, 500);
      };

      // Navigate to specific section
      const goToSection = (targetIdx) => {
        if (isTransitioning || targetIdx === currentSection || targetIdx < 0 || targetIdx >= sections.length) return;
        isTransitioning = true;

        const direction = targetIdx > currentSection ? 1 : -1;
        const current = sections[currentSection];
        const next = sections[targetIdx];

        // Exit current section
        current.classList.add(direction > 0 ? 'exit-up' : 'exit-down');

        // Trigger particles (overlay on top of current section)
        triggerParticles(direction, () => {
          // Hide current, show next
          current.classList.remove('active', 'exit-up', 'exit-down');
          next.classList.add('active');
          currentSection = targetIdx;
          updateDots(currentSection);
          isTransitioning = false;
          scrollAccumulated = 0;
        });
      };

      // Bind subnav clicks now that goToSection is defined
      const subnavEl = document.querySelector('#project-subnav');
      if (subnavEl) {
        subnavEl.querySelectorAll('a').forEach(a => {
          a.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionIdx = parseInt(a.getAttribute('data-section'));
            if (!isNaN(sectionIdx)) {
              goToSection(sectionIdx);
            }
          });
        });
      }

      // Handle wheel events with damping
      const handleWheel = (e) => {
        if (isTransitioning) {
          e.preventDefault();
          return;
        }

        const current = sections[currentSection];
        const overflowStyle = current.style.overflow || getComputedStyle(current).overflow;
        const canScroll = overflowStyle === 'auto' || overflowStyle === 'scroll';
        const scrollable = canScroll && current.scrollHeight > current.clientHeight + 10;

        if (scrollable) {
          const atTop = current.scrollTop <= 2;
          const atBottom = current.scrollTop + current.clientHeight >= current.scrollHeight - 10;

          // Allow normal scrolling within section unless at boundaries
          if (e.deltaY > 0 && !atBottom) return; // scrolling down, not at bottom
          if (e.deltaY < 0 && !atTop) return; // scrolling up, not at top
        }

        e.preventDefault();
        scrollAccumulated += Math.abs(e.deltaY);

        if (scrollAccumulated >= SCROLL_THRESHOLD) {
          const direction = e.deltaY > 0 ? 1 : -1;
          const targetIdx = currentSection + direction;

          if (targetIdx >= 0 && targetIdx < sections.length) {
            goToSection(targetIdx);
          }
          scrollAccumulated = 0;
        }
      };

      // Touch handling for mobile
      let touchStartY = 0;
      const handleTouchStart = (e) => {
        touchStartY = e.touches[0].clientY;
      };
      const handleTouchMove = (e) => {
        if (isTransitioning) {
          e.preventDefault();
          return;
        }
        const deltaY = touchStartY - e.touches[0].clientY;

        const current = sections[currentSection];
        const ovf = current.style.overflow || getComputedStyle(current).overflow;
        const canScrollTouch = ovf === 'auto' || ovf === 'scroll';
        const scrollable = canScrollTouch && current.scrollHeight > current.clientHeight + 10;

        if (scrollable) {
          const atTop = current.scrollTop <= 2;
          const atBottom = current.scrollTop + current.clientHeight >= current.scrollHeight - 10;

          if (deltaY > 0 && !atBottom) return;
          if (deltaY < 0 && !atTop) return;
        }

        if (Math.abs(deltaY) > 50) {
          e.preventDefault();
          const direction = deltaY > 0 ? 1 : -1;
          const targetIdx = currentSection + direction;
          if (targetIdx >= 0 && targetIdx < sections.length) {
            goToSection(targetIdx);
          }
          touchStartY = e.touches[0].clientY;
        }
      };

      // Keyboard navigation
      const handleKeyDown = (e) => {
        if (isTransitioning) return;
        if (e.key === 'ArrowDown' || e.key === 'PageDown') {
          e.preventDefault();
          if (currentSection < sections.length - 1) goToSection(currentSection + 1);
        } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
          e.preventDefault();
          if (currentSection > 0) goToSection(currentSection - 1);
        }
      };

      // Attach listeners to scrollRoot
      scrollRoot.addEventListener('wheel', handleWheel, { passive: false });
      scrollRoot.addEventListener('touchstart', handleTouchStart, { passive: true });
      scrollRoot.addEventListener('touchmove', handleTouchMove, { passive: false });
      scrollRoot.addEventListener('keydown', handleKeyDown);

      this._cfParticleCleanup = () => {
        if (animFrame) cancelAnimationFrame(animFrame);
        window.removeEventListener('resize', resize);
        scrollRoot.removeEventListener('wheel', handleWheel);
        scrollRoot.removeEventListener('touchstart', handleTouchStart);
        scrollRoot.removeEventListener('touchmove', handleTouchMove);
        scrollRoot.removeEventListener('keydown', handleKeyDown);
      };
    }

    _cfShuffleText(el, delay) {
      const text = el.textContent;
      el.textContent = '';
      el.classList.add('shuffle-ready');
      const chars = text.split('');
      const charPool = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%';

      chars.forEach((char, i) => {
        const wrapper = document.createElement('span');
        wrapper.style.display = 'inline-block';
        wrapper.style.overflow = 'hidden';
        const inner = document.createElement('span');
        inner.style.display = 'inline-block';
        inner.textContent = char === ' ' ? ' ' : charPool[Math.floor(Math.random() * charPool.length)];
        wrapper.appendChild(inner);
        el.appendChild(wrapper);

        if (char === ' ') {
          inner.textContent = ' ';
          return;
        }

        const shuffleCount = 4 + Math.floor(Math.random() * 4);
        let step = 0;
        const startTime = (delay || 0) * 1000 + i * 40;

        setTimeout(() => {
          const interval = setInterval(() => {
            if (step >= shuffleCount) {
              inner.textContent = char;
              clearInterval(interval);
              return;
            }
            inner.textContent = charPool[Math.floor(Math.random() * charPool.length)];
            step++;
          }, 50);
        }, startTime);
      });
    }

    _typeAddress(url) {
      let i = 0;
      this.browserAddress.textContent = '';
      const interval = setInterval(() => {
        if (i >= url.length) { clearInterval(interval); return; }
        this.browserAddress.textContent += url.charAt(i);
        i++;
      }, 20);
    }

    /* ─── GENERATOR PAGE ANIMATIONS ───────────────────────────────────── */
    _genKillDelayedCalls(page, key) {
      const list = page[key];
      if (!list) return;
      list.forEach(c => c.kill());
      list.length = 0;
    }

    _genVisibleSectionLabels(header) {
      const isEn = document.body.classList.contains('lang-en');
      return [...header.querySelectorAll('.gen-section-label')].filter(el => {
        if (isEn) return el.classList.contains('lang-en');
        return el.classList.contains('lang-zh') || el.classList.contains('lang-en');
      });
    }

    _genVisibleCtaTitles(page) {
      const isEn = document.body.classList.contains('lang-en');
      return [...page.querySelectorAll('.gen-cta-title')].filter(t => {
        if (isEn) return t.classList.contains('lang-en');
        return t.classList.contains('lang-zh') || t.classList.contains('lang-en');
      });
    }

    _playGenCtaLetterReveal(titleEl) {
      const chars = titleEl.querySelectorAll('.gen-cta-char');
      if (!chars.length) return;
      gsap.to(chars, {
        yPercent: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.1,
        ease: 'power1.out',
      });
    }

    _prepareGenCtaTitles(page) {
      page.querySelectorAll('.gen-cta-title').forEach(title => {
        if (title.dataset.genSplit) {
          gsap.set(title, { opacity: 1 });
          gsap.set(title.querySelectorAll('.gen-cta-char'), { yPercent: 100, opacity: 0 });
          return;
        }
        const text = title.textContent.trim();
        title.textContent = '';
        title.dataset.genSplit = '1';
        [...text].forEach(ch => {
          const span = document.createElement('span');
          span.className = 'gen-cta-char';
          span.textContent = ch === ' ' ? '\u00a0' : ch;
          title.appendChild(span);
        });
        gsap.set(title, { opacity: 1 });
        gsap.set(title.querySelectorAll('.gen-cta-char'), { yPercent: 100, opacity: 0 });
      });
    }

    _initGenSectionInkReveal(page, bc) {
      if (typeof ScrollTrigger === 'undefined') return;
      page._genInkDelayed = page._genInkDelayed || [];

      page.querySelectorAll('.gen-section-header').forEach(header => {
        const resetLabels = () => {
          this._genKillDelayedCalls(page, '_genInkDelayed');
          this._genVisibleSectionLabels(header).forEach(label => {
            gsap.killTweensOf(label);
            label.style.filter = 'none';
            gsap.set(label, { opacity: 0, yPercent: 0 });
            delete label.dataset.genInkDone;
          });
        };

        const playLabels = () => {
          const labels = this._genVisibleSectionLabels(header);
          if (!labels.length) return;

          this._genKillDelayedCalls(page, '_genInkDelayed');
          labels.forEach((label, idx) => {
            if (label.dataset.genInkDone === '1' && parseFloat(getComputedStyle(label).opacity) > 0.5) {
              return;
            }
            const call = gsap.delayedCall(idx * 0.18, () => {
              label.dataset.genInkDone = '1';
              this._playGenInkReveal(label);
            });
            page._genInkDelayed.push(call);
          });
        };

        const st = ScrollTrigger.create({
          trigger: header,
          scroller: bc,
          start: 'top 85%',
          onEnter: playLabels,
          onEnterBack: playLabels,
          onLeaveBack: resetLabels,
        });
        page._genScrollTriggers.push(st);
      });
    }

    _genCtaIsRevealed(page) {
      const titles = this._genVisibleCtaTitles(page);
      if (!titles.length) return false;
      return titles.every(title => {
        const chars = title.querySelectorAll('.gen-cta-char');
        return chars.length > 0 && [...chars].every(
          c => parseFloat(getComputedStyle(c).opacity) > 0.9
        );
      });
    }

    _genCtaVisibleRatio(ctaBlock, bc) {
      const root = bc.getBoundingClientRect();
      const rect = ctaBlock.getBoundingClientRect();
      const overlap = Math.min(rect.bottom, root.bottom) - Math.max(rect.top, root.top);
      return Math.max(0, overlap) / Math.max(rect.height, 1);
    }

    _syncGenCtaIfVisible(page, bc) {
      if (typeof page._genCtaScrollHandler === 'function') {
        page._genCtaScrollHandler();
      }
    }

    _bindGenCtaResizeRefresh(page, bc) {
      if (page._genCtaResizeBound) return;
      page._genCtaResizeBound = true;
      let resizeTimer = null;
      const refresh = () => {
        if (resizeTimer) clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
          resizeTimer = null;
          const wasNearBottom = bc.scrollTop + bc.clientHeight >= bc.scrollHeight - 200;
          if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
          if (wasNearBottom) {
            bc.scrollTop = bc.scrollHeight;
          }
          this._syncGenCtaIfVisible(page, bc);
        }, 80);
      };
      window.addEventListener('load', refresh, { once: true });
      page.querySelectorAll('img').forEach(img => {
        if (!img.complete) img.addEventListener('load', refresh, { once: true });
      });
      if (typeof ResizeObserver !== 'undefined') {
        const ro = new ResizeObserver(refresh);
        ro.observe(page);
        if (bc) ro.observe(bc);
        page._genCtaResizeObserver = ro;
      }
    }

    _initGenCtaScrollReveal(page, bc) {
      const ctaBlock = page.querySelector('.gen-final-cta');
      if (!ctaBlock || !bc) return;
      page._genCtaDelayed = page._genCtaDelayed || [];

      if (page._genCtaScrollHandler) {
        bc.removeEventListener('scroll', page._genCtaScrollHandler);
      }

      const resetCtaTitles = () => {
        this._genKillDelayedCalls(page, '_genCtaDelayed');
        this._genVisibleCtaTitles(page).forEach(title => {
          const chars = title.querySelectorAll('.gen-cta-char');
          gsap.killTweensOf(chars);
          gsap.set(chars, { yPercent: 100, opacity: 0 });
          delete title.dataset.genCtaPlayed;
        });
        page._genCtaWasVisible = false;
        page._genCtaPlayRequested = false;
      };

      const playCtaTitles = () => {
        if (this._genCtaIsRevealed(page) || page._genCtaPlayRequested) return;
        const titles = this._genVisibleCtaTitles(page);
        if (!titles.length) return;

        page._genCtaPlayRequested = true;
        this._genKillDelayedCalls(page, '_genCtaDelayed');
        titles.forEach((title, idx) => {
          const call = gsap.delayedCall(idx * 0.35, () => {
            const chars = title.querySelectorAll('.gen-cta-char');
            if (!chars.length) return;
            gsap.killTweensOf(chars);
            gsap.set(chars, { yPercent: 100, opacity: 0 });
            this._playGenCtaLetterReveal(title);
            title.dataset.genCtaPlayed = '1';
          });
          page._genCtaDelayed.push(call);
        });
      };

      page._genPlayCtaTitles = playCtaTitles;
      page._genResetCtaTitles = resetCtaTitles;
      page._genCtaWasVisible = false;
      page._genCtaPlayRequested = false;

      const checkCta = () => {
        const ratio = this._genCtaVisibleRatio(ctaBlock, bc);
        const inView = ratio >= 0.2;
        const maxScroll = Math.max(bc.scrollHeight - bc.clientHeight, 1);
        const nearBottom = bc.scrollTop + bc.clientHeight >= bc.scrollHeight - 240;
        const deepEnough = bc.scrollTop / maxScroll > 0.9;

        if ((nearBottom || deepEnough) && !this._genCtaIsRevealed(page) && !page._genCtaPlayRequested) {
          playCtaTitles();
        } else if (inView && !page._genCtaWasVisible) {
          playCtaTitles();
        } else if (inView && !this._genCtaIsRevealed(page) && !page._genCtaPlayRequested) {
          playCtaTitles();
        }

        if (inView || nearBottom || deepEnough) {
          page._genCtaWasVisible = true;
        } else if (page._genCtaWasVisible && ratio < 0.04 && !nearBottom && !deepEnough) {
          resetCtaTitles();
          page._genCtaPlayRequested = false;
        }
      };

      page._genCtaScrollHandler = checkCta;
      bc.addEventListener('scroll', checkCta, { passive: true });
      this._bindGenCtaResizeRefresh(page, bc);

      requestAnimationFrame(checkCta);
      [0.35, 1.0, 2.0, 3.5].forEach(t => gsap.delayedCall(t, checkCta));
    }

    _playGenInkReveal(el) {
      const disp = document.getElementById('gen-ink-disp');
      const blur = document.getElementById('gen-ink-blur');
      if (!el) return;
      if (!disp || !blur) {
        gsap.to(el, { opacity: 1, yPercent: 0, duration: 1.2, ease: 'power4.out' });
        return;
      }

      disp.setAttribute('scale', '70');
      blur.setAttribute('stdDeviation', '10');
      el.style.filter = 'url(#genInkFilter)';
      gsap.set(el, { opacity: 0, yPercent: 0 });

      const state = { scale: 70, blur: 10 };
      gsap.timeline()
        .to(el, { opacity: 1, duration: 0.2, ease: 'power2.out' })
        .to(state, {
          scale: 0,
          blur: 0,
          duration: 1.8,
          ease: 'power3.out',
          onUpdate: () => {
            disp.setAttribute('scale', String(state.scale));
            blur.setAttribute('stdDeviation', String(state.blur));
          },
          onComplete: () => {
            el.style.filter = 'none';
          }
        }, 0);
    }

    _openGenCardZoom(card, img, lightbox, lightboxImg, stackCards) {
      if (lightbox.classList.contains('active')) return;

      const rect = img.getBoundingClientRect();
      const aspect = (img.naturalWidth && img.naturalHeight)
        ? img.naturalWidth / img.naturalHeight
        : rect.width / rect.height;
      let targetW = Math.min(rect.width * 2.8, window.innerWidth * 0.76);
      let targetH = targetW / aspect;
      const maxH = window.innerHeight * 0.82;
      if (targetH > maxH) {
        targetH = maxH;
        targetW = targetH * aspect;
      }
      const targetLeft = (window.innerWidth - targetW) / 2;
      const targetTop = (window.innerHeight - targetH) / 2;

      if (lightbox.parentNode !== document.body) {
        document.body.appendChild(lightbox);
      }

      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightbox.dataset.zoomCard = card.dataset.index || '0';
      delete lightbox.dataset.zoomClosing;
      lightbox.classList.add('active');

      gsap.killTweensOf([lightbox, lightboxImg]);
      gsap.set(lightbox, { autoAlpha: 0 });
      gsap.to(lightbox, { autoAlpha: 1, duration: 0.3, ease: 'power2.out' });
      gsap.set(lightboxImg, {
        position: 'fixed',
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
        maxWidth: 'none',
        maxHeight: 'none',
        margin: 0,
        x: 0,
        y: 0,
        scale: 1,
        rotation: gsap.getProperty(card, 'rotation') || 0,
        transformOrigin: 'center center',
        opacity: 1,
        visibility: 'visible',
        zIndex: 10001,
      });
      gsap.set(img, { opacity: 0 });

      stackCards.forEach(c => {
        gsap.to(c, { opacity: c === card ? 1 : 0.2, duration: 0.35, ease: 'power2.out' });
      });

      gsap.to(lightboxImg, {
        top: targetTop,
        left: targetLeft,
        width: targetW,
        height: targetH,
        rotation: 0,
        duration: 0.48,
        ease: 'power3.inOut',
      });
    }

    _closeGenCardZoom(lightbox, lightboxImg, stackCards) {
      if (!lightbox.classList.contains('active') || lightbox.dataset.zoomClosing === '1') return;
      lightbox.dataset.zoomClosing = '1';
      lightbox.style.pointerEvents = 'none';

      const cardIdx = lightbox.dataset.zoomCard;
      const card = [...stackCards].find(c => c.dataset.index === cardIdx) || stackCards[0];
      const img = card?.querySelector('img');
      if (!img) {
        lightbox.classList.remove('active');
        lightbox.style.pointerEvents = '';
        delete lightbox.dataset.zoomClosing;
        return;
      }

      const rect = img.getBoundingClientRect();
      gsap.killTweensOf([lightboxImg, lightbox]);

      stackCards.forEach(c => {
        gsap.to(c, { opacity: 1, duration: 0.35, ease: 'power2.out' });
      });

      gsap.timeline({
        defaults: { ease: 'power3.inOut' },
        onComplete: () => {
          gsap.set(lightboxImg, { autoAlpha: 0 });
          gsap.set(img, { opacity: 1 });
          gsap.set(lightboxImg, { clearProps: 'all' });
          lightbox.classList.remove('active');
          gsap.set(lightbox, { autoAlpha: 0 });
          lightbox.style.pointerEvents = '';
          delete lightbox.dataset.zoomClosing;
        },
      })
        .to(lightbox, { autoAlpha: 0, duration: 0.34, ease: 'power2.inOut' }, 0)
        .to(lightboxImg, {
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height,
          rotation: gsap.getProperty(card, 'rotation') || 0,
          duration: 0.42,
        }, 0);
    }

    _initGenGrainCanvas(page) {
      const canvas = page.querySelector('#gen-grain-canvas');
      if (!canvas) return null;

      const bc = page.closest('.browser-content');

      const ctx = canvas.getContext('2d');
      const off = document.createElement('canvas');
      const offCtx = off.getContext('2d');
      let rafId = null;
      let last = 0;
      let imgData = null;
      let buf = null;
      let resizeTimer = null;

      const getSettings = () => ({
        interval: window.innerWidth >= 1024 ? 10 : 40,
        alpha: window.innerWidth >= 1024 ? 0.1 : 0.07,
      });

      const resize = () => {
        const w = page.clientWidth || window.innerWidth;
        const h = Math.max(page.scrollHeight, page.offsetHeight, page.clientHeight);
        if (!w || !h) return;
        canvas.style.width = w + 'px';
        canvas.style.height = h + 'px';
        if (canvas.width !== w || canvas.height !== h) {
          canvas.width = w;
          canvas.height = h;
          off.width = w;
          off.height = h;
          imgData = offCtx.createImageData(w, h);
          buf = imgData.data;
        }
      };

      const scheduleResize = () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(resize, 80);
      };

      const draw = (now) => {
        rafId = requestAnimationFrame(draw);
        const { interval, alpha } = getSettings();
        if (now - last < interval || !buf) return;
        last = now;
        const total = buf.length / 4;
        const count = Math.floor(total * 0.02);
        for (let i = 0; i < count; i++) {
          const px = Math.floor(Math.random() * total) * 4;
          buf[px + 3] = Math.random() * 255 * alpha;
        }
        offCtx.putImageData(imgData, 0, 0);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(off, 0, 0);
      };

      const onResize = () => scheduleResize();

      resize();
      window.addEventListener('resize', onResize);
      const resizeObserver = typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(() => scheduleResize())
        : null;
      if (resizeObserver) resizeObserver.observe(page);
      page.querySelectorAll('img').forEach(img => {
        if (!img.complete) img.addEventListener('load', scheduleResize, { once: true });
      });
      if (bc) bc.addEventListener('scroll', scheduleResize, { passive: true });
      setTimeout(scheduleResize, 400);
      setTimeout(scheduleResize, 1200);
      rafId = requestAnimationFrame(draw);

      return () => {
        if (rafId) cancelAnimationFrame(rafId);
        window.removeEventListener('resize', onResize);
        if (resizeObserver) resizeObserver.disconnect();
        if (bc) bc.removeEventListener('scroll', scheduleResize);
        clearTimeout(resizeTimer);
      };
    }

    _resetGeneratorRevealState(page) {
      page.querySelectorAll('.gen-section').forEach(section => {
        delete section.dataset.genRevealed;
      });
      page.querySelectorAll('.gen-section-label').forEach(label => {
        delete label.dataset.genInkDone;
        label.style.filter = '';
      });
      page.querySelectorAll('.gen-cta-title').forEach(title => {
        delete title.dataset.genCtaPlayed;
      });
    }

    _initGeneratorAnimations() {
      const page = document.querySelector('.gen-page');
      if (!page) return;

      const bc = page.closest('.browser-content');

      this._resetGeneratorRevealState(page);

      if (page._genGrainCleanup) page._genGrainCleanup();
      page._genGrainCleanup = this._initGenGrainCanvas(page);

      const subnav = document.querySelector('#project-subnav');
      if (subnav) {
        subnav.innerHTML = `
          <a class="active" data-section="about">About</a>
          <a data-section="features">How It Works</a>
          <a data-section="tech">Layouts</a>
          <a data-section="gallery">AI Power</a>
          <a data-section="github">Tech & Try</a>
        `;
        subnav.querySelectorAll('a[data-section]').forEach(a => {
          a.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = a.getAttribute('data-section');
            subnav.querySelectorAll('a').forEach(x => x.classList.remove('active'));
            a.classList.add('active');
            const target = page.querySelector(`#section-${sectionId}`);
            if (target && bc) {
              const rootRect = bc.getBoundingClientRect();
              const targetRect = target.getBoundingClientRect();
              const top = bc.scrollTop + targetRect.top - rootRect.top - 24;
              bc.scrollTo({ top, behavior: 'smooth' });
            }
          });
        });
      }

      if (bc && subnav) {
        const sectionIds = ['about', 'features', 'tech', 'gallery', 'github'];
        bc.addEventListener('scroll', () => {
          const scrollPos = bc.scrollTop + 120;
          let currentSection = 'about';
          sectionIds.forEach(id => {
            const section = page.querySelector(`#section-${id}`);
            if (section && section.offsetTop <= scrollPos) {
              currentSection = id;
            }
          });
          subnav.querySelectorAll('a').forEach(a => {
            a.classList.toggle('active', a.getAttribute('data-section') === currentSection);
          });
        });
      }

      const logoLines = page.querySelectorAll('.gen-logo-text');
      if (logoLines.length) {
        gsap.fromTo(logoLines,
          { opacity: 0, x: -30 },
          { opacity: 1, x: 0, duration: 0.8, stagger: 0.15, ease: 'power2.out' }
        );
      }

      const isEn = document.body.classList.contains('lang-en');
      const heroSub = [...page.querySelectorAll('.gen-hero-sub')].filter(el =>
        isEn ? el.classList.contains('lang-en') : true
      );
      if (heroSub.length) {
        gsap.fromTo(heroSub,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, delay: 0.4, ease: 'power2.out' }
        );
      }

      const heroActions = page.querySelector('.gen-hero-actions');
      if (heroActions) {
        gsap.fromTo(heroActions,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.5, delay: 0.7, ease: 'power2.out' }
        );
      }

      const heroStats = page.querySelector('.gen-hero-stats');
      if (heroStats) {
        gsap.fromTo(heroStats,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, delay: 0.9, ease: 'power2.out' }
        );
      }

      const cardStack = page.querySelector('#gen-card-stack');
      const stackCards = page.querySelectorAll('.gen-stack-card');
      if (cardStack && stackCards.length) {
        const defaultTransforms = [
          { xPercent: -50, x: -30, rotation: -9, y: 0 },
          { xPercent: -50, x: -15, rotation: -5, y: 0 },
          { xPercent: -50, x: 0,   rotation: 0,  y: 0 },
          { xPercent: -50, x: 15,  rotation: 5,  y: 0 },
          { xPercent: -50, x: 30,  rotation: 9,  y: 0 },
        ];
        const spreadTransforms = [
          { xPercent: -50, x: -168, rotation: -24, y: 16 },
          { xPercent: -50, x: -84,  rotation: -12, y: -12 },
          { xPercent: -50, x: 0,    rotation: 0,   y: -18 },
          { xPercent: -50, x: 84,   rotation: 12,  y: -12 },
          { xPercent: -50, x: 168,  rotation: 24,  y: 16 },
        ];

        gsap.killTweensOf(stackCards);
        const cardTl = gsap.timeline({ delay: 0.45 });
        stackCards.forEach((card, i) => {
          const d = defaultTransforms[i] || defaultTransforms[2];
          gsap.set(card, {
            xPercent: d.xPercent,
            x: d.x,
            y: d.y + 28,
            rotation: d.rotation,
            scale: 0.94,
            opacity: 0,
            force3D: true,
          });
          cardTl.to(card, {
            opacity: 1,
            y: d.y,
            scale: 1,
            duration: 0.75,
            ease: 'power3.out',
          }, i * 0.08);
        });

        cardStack.addEventListener('mouseenter', () => {
          stackCards.forEach((card, i) => {
            const s = spreadTransforms[i] || spreadTransforms[2];
            gsap.to(card, { xPercent: s.xPercent, x: s.x, y: s.y, rotation: s.rotation, duration: 0.44, ease: 'power3.out' });
          });
        });
        cardStack.addEventListener('mouseleave', () => {
          stackCards.forEach((card, i) => {
            const d = defaultTransforms[i] || defaultTransforms[2];
            gsap.to(card, { xPercent: d.xPercent, x: d.x, y: d.y, rotation: d.rotation, duration: 0.4, ease: 'power3.inOut' });
          });
        });

        const lightbox = page.querySelector('#gen-lightbox');
        const lightboxImg = page.querySelector('#gen-lightbox-img');
        if (lightbox && lightboxImg) {
          stackCards.forEach(card => {
            card.addEventListener('click', (e) => {
              e.stopPropagation();
              const img = card.querySelector('img');
              if (img) this._openGenCardZoom(card, img, lightbox, lightboxImg, stackCards);
            });
          });
          lightbox.addEventListener('click', () => {
            this._closeGenCardZoom(lightbox, lightboxImg, stackCards);
          });
        }
      }

      // Custom cursor with smooth trailing
      // Remove any stale cursor from previous visits
      document.querySelectorAll('#gen-cursor').forEach(c => c.remove());
      const cursor = page.querySelector('#gen-cursor') || (() => {
        const c = document.createElement('div');
        c.className = 'gen-cursor';
        c.id = 'gen-cursor';
        return c;
      })();
      if (cursor && bc) {
        document.body.appendChild(cursor);
        gsap.set(cursor, { x: 0, y: 0, force3D: true });

        let cursorVisible = false;
        const cursorXTo = gsap.quickTo(cursor, 'x', { duration: 0.14, ease: 'power3.out' });
        const cursorYTo = gsap.quickTo(cursor, 'y', { duration: 0.14, ease: 'power3.out' });

        function isInsideBC(clientX, clientY) {
          const r = bc.getBoundingClientRect();
          return clientX >= r.left && clientX <= r.right &&
                 clientY >= r.top && clientY <= r.bottom;
        }

        function onMouseMove(e) {
          if (isInsideBC(e.clientX, e.clientY)) {
            if (!cursorVisible) {
              gsap.set(cursor, { x: e.clientX - 20, y: e.clientY - 20 });
              cursorVisible = true;
              cursor.classList.add('visible');
            }
            cursorXTo(e.clientX - 20);
            cursorYTo(e.clientY - 20);
          } else if (cursorVisible) {
            cursorVisible = false;
            cursor.classList.remove('visible');
          }
        }

        document.addEventListener('mousemove', onMouseMove, { passive: true });

        const interactives = page.querySelectorAll('a, button, .gen-stack-card');
        interactives.forEach(el => {
          el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
          el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
        });

        const cleanup = () => {
          document.removeEventListener('mousemove', onMouseMove);
          cursorXTo.tween?.kill();
          cursorYTo.tween?.kill();
          gsap.killTweensOf(cursor);
          cursor.classList.remove('visible');
          if (cursor.parentNode) cursor.parentNode.removeChild(cursor);
          if (page._genScrollTriggers) {
            page._genScrollTriggers.forEach(st => st.kill());
            page._genScrollTriggers = [];
          }
          if (page._genGrainCleanup) {
            page._genGrainCleanup();
            page._genGrainCleanup = null;
          }
          this._genKillDelayedCalls(page, '_genInkDelayed');
          this._genKillDelayedCalls(page, '_genCtaDelayed');
          if (page._genCtaResizeObserver) {
            page._genCtaResizeObserver.disconnect();
            page._genCtaResizeObserver = null;
          }
          delete page._genCtaResizeBound;
          delete page._genPlayCtaTitles;
          delete page._genResetCtaTitles;
          delete page._genCtaWasVisible;
          delete page._genCtaPlayRequested;
          if (page._genCtaScrollHandler && bc) {
            bc.removeEventListener('scroll', page._genCtaScrollHandler);
          }
          delete page._genCtaScrollHandler;
          if (page._genLangChangeHandler) {
            document.removeEventListener('jingeros:lang-change', page._genLangChangeHandler);
            delete page._genLangChangeHandler;
          }
          const lb = document.querySelector('#gen-lightbox');
          const lbImg = document.querySelector('#gen-lightbox-img');
          if (lb) {
            gsap.killTweensOf([lb, lbImg]);
            lb.classList.remove('active');
            delete lb.dataset.zoomClosing;
            lb.style.pointerEvents = '';
            if (lbImg) {
              gsap.set(lbImg, { clearProps: 'all' });
            }
            gsap.set(lb, { autoAlpha: 0 });
            page.querySelectorAll('.gen-stack-card img').forEach(im => gsap.set(im, { opacity: 1 }));
            const genPage = document.querySelector('.gen-page');
            if (genPage && lb.parentNode === document.body) {
              genPage.insertBefore(lb, genPage.firstChild);
            }
          }
          document.removeEventListener('jingeros:generator-cleanup', cleanup);
        };
        document.addEventListener('jingeros:generator-cleanup', cleanup);
      }

      if (bc) {
        // Kill stale ScrollTriggers from previous visits
        if (page._genScrollTriggers) {
          page._genScrollTriggers.forEach(st => st.kill());
        }
        page._genScrollTriggers = [];

        this._prepareGenCtaTitles(page);

        const sectionLabels = page.querySelectorAll('.gen-section-label');
        sectionLabels.forEach(label => {
          gsap.set(label, { opacity: 0, yPercent: 0 });
        });

        const steps = page.querySelectorAll('.gen-flow-step, .gen-layout-row, .gen-feature, .gen-tech-highlight');
        steps.forEach(step => {
          gsap.set(step, { opacity: 0, y: 30 });
        });

        const pills = page.querySelectorAll('.gen-pill');
        pills.forEach(pill => {
          gsap.set(pill, { opacity: 0, scale: 0.8 });
        });

        const revealSection = (section) => {
          if (section.dataset.genRevealed) return;
          section.dataset.genRevealed = '1';

          section.querySelectorAll('.gen-flow-step, .gen-layout-row, .gen-feature, .gen-tech-highlight').forEach((step, idx) => {
            gsap.to(step, { opacity: 1, y: 0, duration: 0.6, delay: idx * 0.08, ease: 'power2.out' });
          });

          section.querySelectorAll('.gen-pill').forEach((pill, idx) => {
            gsap.to(pill, { opacity: 1, scale: 1, duration: 0.4, delay: idx * 0.04, ease: 'back.out(1.5)' });
          });
        };

        const sections = page.querySelectorAll('.gen-section');
        if (typeof ScrollTrigger !== 'undefined') {
          sections.forEach(section => {
            const st = ScrollTrigger.create({
              trigger: section,
              scroller: bc,
              start: 'top 82%',
              once: true,
              onEnter: () => revealSection(section),
            });
            page._genScrollTriggers.push(st);
          });
          ScrollTrigger.refresh();
          this._initGenSectionInkReveal(page, bc);
          this._initGenCtaScrollReveal(page, bc);
          ScrollTrigger.refresh();
          requestAnimationFrame(() => {
            ScrollTrigger.refresh();
            sections.forEach(section => {
              const rect = section.getBoundingClientRect();
              const rootRect = bc.getBoundingClientRect();
              if (rect.top < rootRect.bottom - 60 && rect.bottom > rootRect.top + 40) {
                revealSection(section);
              }
            });
            this._syncGenCtaIfVisible(page, bc);
          });
        } else {
          const checkSections = () => {
            const rootRect = bc.getBoundingClientRect();
            sections.forEach(section => {
              if (section.dataset.genRevealed) return;
              const rect = section.getBoundingClientRect();
              if (rect.top < rootRect.bottom - 80 && rect.bottom > rootRect.top + 40) {
                revealSection(section);
              }
            });
            this._syncGenCtaIfVisible(page, bc);
          };
          bc.addEventListener('scroll', checkSections, { passive: true });
          requestAnimationFrame(checkSections);
        }

        const onLangChange = () => {
          if (!document.querySelector('.gen-page')) return;
          sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const rootRect = bc.getBoundingClientRect();
            if (rect.top < rootRect.bottom - 60 && rect.bottom > rootRect.top + 40) {
              revealSection(section);
            }
          });
          page.querySelectorAll('.gen-section-header').forEach(header => {
            const rect = header.getBoundingClientRect();
            const rootRect = bc.getBoundingClientRect();
            if (rect.top < rootRect.bottom - 40 && rect.bottom > rootRect.top) {
              this._genVisibleSectionLabels(header).forEach((label, idx) => {
                if (parseFloat(getComputedStyle(label).opacity) > 0.5) return;
                gsap.delayedCall(idx * 0.12, () => this._playGenInkReveal(label));
              });
            }
          });
          this._syncGenCtaIfVisible(page, bc);
        };
        if (page._genLangChangeHandler) {
          document.removeEventListener('jingeros:lang-change', page._genLangChangeHandler);
        }
        page._genLangChangeHandler = onLangChange;
        document.addEventListener('jingeros:lang-change', onLangChange);
      }
    }

    /* ─── RETURN TO ARCHIVE ─────────────────────────────────────────── */
    _returnToArchive() {
      if (this.state !== STATES.BROWSING) return;
      if (this.currentProject === 'generator') {
        document.dispatchEvent(new Event('jingeros:generator-cleanup'));
      }
      this.state = STATES.RETURNING;
      if (this.audio) this.audio.play('crt-power-off');

      const tl = gsap.timeline({
        onComplete: () => this._powerOffSequence()
      });

      tl.to('.browser-content', { opacity: 0, y: 20, duration: 0.2, ease: 'power2.in' });
      tl.to(this.browserShell, {
        scale: 0.05, opacity: 0,
        transformOrigin: 'center 60%',
        duration: 0.4, ease: 'power2.in'
      });
      tl.call(() => {
        gsap.set(this.overlay, { opacity: 1, pointerEvents: 'auto' });
      });
    }

    _powerOffSequence() {
      this.state = STATES.POWERING_OFF;
      this.browserShell.classList.remove('active');
      gsap.set(this.browserShell, { scale: 1, opacity: 0 });

      const crtContent = $('#crt-content');
      const tl = gsap.timeline({
        onComplete: () => this._ejectTape()
      });

      tl.fromTo(crtContent,
        { opacity: 0, scaleY: 1 },
        { opacity: 0.8, duration: 0.15, ease: 'power2.out' }
      );
      tl.to(crtContent, { scaleY: 0.01, duration: 0.25, ease: 'power2.in' });
      tl.to(crtContent, { opacity: 0.3, duration: 0.15 }, '-=0.1');

      tl.call(() => {
        const dot = document.createElement('div');
        dot.style.cssText = `
          position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%);
          width: 8px; height: 8px; border-radius: 50%; background: white;
          box-shadow: 0 0 16px white; z-index: 30;
        `;
        $('#crt-screen').appendChild(dot);
        gsap.to(dot, { opacity: 0, duration: 0.4, delay: 0.15, onComplete: () => dot.remove() });
      });

      tl.call(() => {
        crtContent.innerHTML = `
          <div class="crt-standby-line1">-- VHS ARCHIVE --</div>
          <div class="crt-standby-line2">SELECT A TAPE</div>
        `;
        gsap.set(crtContent, { scaleY: 1, opacity: 1 });
      }, [], '+=0.6');
    }

    _ejectTape() {
      this.state = STATES.EJECTING;
      if (!this.currentProject) {
        this._restoreArchive();
        return;
      }

      if (this.audio) this.audio.play('tape-eject-spring');

      const tapeEl = this._flyingTapeEl || this.tapeEls[this.currentProject];

      gsap.set(tapeEl, {
        opacity: 0, scale: 1, scaleX: 1, scaleY: 1, rotation: 0
      });

      gsap.to(tapeEl, {
        opacity: 1, duration: 0.15, ease: 'power2.out'
      });

      tapeEl.classList.remove('playing');

      gsap.delayedCall(0.3, () => this._restoreArchive());
    }

    _restoreArchive() {
      this.state = STATES.READY;
      this.currentProject = null;
      this.hoveredTape = null;
      this._hoverPaused = false;
      this._lastFrontId = null;
      this._flyingTapeEl = null;
      this._velocity = 0;

      TAPES.forEach(t => {
        const el = this.tapeEls[t.id];
        if (el) {
          el.classList.remove('playing');
          gsap.set(el, { opacity: 1, scale: 1, scaleX: 1, scaleY: 1, rotation: 0 });
        }
      });

      if (this.crtEffects) this.crtEffects.hidePreview();
      if (this.particles) this.particles.start();

      this._stopCarousel();
      this._startCarousel();
    }

    /* ─── ARCHIVE CLOSE ─────────────────────────────────────────────── */
    closeArchive() {
      if (this.state === STATES.CLOSED || this.state === STATES.CLOSING) return;
      this.state = STATES.CLOSING;

      this.exitHint.classList.remove('visible');
      this._stopCarousel();

      const tl = gsap.timeline({
        onComplete: () => {
          this.state = STATES.CLOSED;
          document.body.classList.remove('archive-active');
          this.overlay.classList.remove('active');
          gsap.set(this.overlay, { opacity: '', pointerEvents: '' });
          if (this.particles) this.particles.stop();
          if (this.crtEffects) this.crtEffects.stop();
        }
      });

      TAPES.forEach((t, i) => {
        const el = this.tapeEls[t.id];
        if (!el) return;
        gsap.to(el, {
          opacity: 0, scale: 0.3,
          duration: 0.4,
          delay: i * 0.02,
          ease: 'power2.in'
        });
      });

      tl.to(this.crtEl, {
        y: window.innerHeight,
        opacity: 0,
        duration: 0.6,
        delay: 0.15,
        ease: 'power2.in'
      });
    }

    /* ─── KEYBOARD ──────────────────────────────────────────────────── */
    _onKeyDown(e) {
      if (e.key === 'Escape') {
        if (this.state === STATES.BROWSING) {
          this._returnToArchive();
        } else if (this.state === STATES.READY) {
          this.closeArchive();
        }
      }
    }

    /* ─── RESIZE ────────────────────────────────────────────────────── */
    _onResize() {
      // carousel re-renders automatically each frame
    }

    /* ─── SOUND ─────────────────────────────────────────────────────── */
    _toggleSound() {
      this.soundEnabled = !this.soundEnabled;
      this.soundHint.textContent = this.soundEnabled ? '🔊 Sound on' : '🔇 Sound off';
      if (this.audio) this.audio.setEnabled(this.soundEnabled);
    }

    /* ─── PROJECT PAGE BUILDERS ─────────────────────────────────────── */
    _buildAllProjectPages() {
      return PLAYABLE_TAPES.map(t => {
        const page = this._buildProjectPage(t.id);
        const themeClass = t.id === 'remoire' ? 'remoire-theme' : t.id === 'careerforge' ? 'careerforge-theme' : t.id === 'generator' ? 'generator-theme' : '';
        return `<div class="project-page ${themeClass}" id="project-page-${t.id}" data-theme="${themeClass}" data-project="${t.id}">${page}</div>`;
      }).join('');
    }

    _buildProjectPage(projectId) {
      if (projectId === 'remoire') return REMOIRE_PAGE_HTML;
      if (projectId === 'careerforge') return CAREERFORGE_PAGE_HTML;
      if (projectId === 'generator') return GENERATOR_PAGE_HTML;
      return buildPlaceholder(projectId);
    }
  }

  function buildPlaceholder(projectId) {
    const meta = PLAYABLE_TAPES.find(t => t.id === projectId);
    const titleMap = {
      careerforge:  { en: 'CareerForge',  zh: '求职助手',
                      enDesc: 'AI-driven candidate toolkit covering resume audit, cover letter generation, and mock interviews.',
                      zhDesc: 'AI 驱动的完整求职链路助手：简历审计、Cover Letter 生成、模拟面试。',
                      tags: ['Open Source', 'Claude Code Skill', 'PDF Generation', '104+ GitHub Stars'] },
      frenchquest:  { en: 'Français Quest', zh: '法语闯关',
                      enDesc: 'Gamified French learning platform with TCF Canada exam prep, RPG-style progression, and pixel-art UI.',
                      zhDesc: '游戏化法语学习网站，TCF Canada 备考闯关，像素风格 UI。',
                      tags: ['Education', 'Gamification', 'Pixel Art', 'LocalStorage'] },
      chatbox:      { en: 'AI Chatbox',   zh: 'AI 聊天',
                      enDesc: 'iOS-style chat interface for roleplay AI conversations with multi-model switching and persona prompt engineering.',
                      zhDesc: 'iOS 风格 AI 聊天界面，支持角色扮演、多模型切换和个性化 Prompt 工程。',
                      tags: ['Web App', 'AI Chat', 'Prompt Engineering', 'Multi-model'] },
      generator:    { en: 'Rednote Image Generator', zh: '小红书图文',
                      enDesc: 'One-click generator for Xiaohongshu card graphics. Turns 30-minute manual layout into 60 seconds.',
                      zhDesc: '一键生成小红书爆款图文卡片，从 30 分钟手动排版压缩到 60 秒。',
                      tags: ['Canvas', 'Automation', 'AI Layout', 'Vibe Coding'] }
    };
    const info = titleMap[projectId] || titleMap.careerforge;

    return `
      <div class="project-placeholder">
        <div class="placeholder-status">VHS Tape · ${meta ? meta.number : '??'} · Coming Soon</div>
        <h1 class="placeholder-title lang-zh">${info.zh}</h1>
        <h1 class="placeholder-title lang-en">${info.en}</h1>
        <p class="placeholder-subtitle lang-zh">${info.zhDesc}</p>
        <p class="placeholder-subtitle lang-en">${info.enDesc}</p>

        <div class="placeholder-section" id="section-about">
          <h3 class="lang-zh">关于这个项目</h3>
          <h3 class="lang-en">About This Project</h3>
          <p class="lang-zh">本项目的完整独立页面正在构建中。</p>
          <p class="lang-en">The full project page for this tape is currently being built.</p>
        </div>

        <div class="placeholder-section" id="section-features">
          <h3 class="lang-zh">核心特性（计划）</h3>
          <h3 class="lang-en">Planned Highlights</h3>
          <ul class="lang-zh">
            <li>完整的视觉风格还原</li>
            <li>交互式功能演示</li>
            <li>截图画廊</li>
            <li>技术架构可视化</li>
          </ul>
          <ul class="lang-en">
            <li>Distinct visual identity</li>
            <li>Interactive feature walkthrough</li>
            <li>Annotated screenshot gallery</li>
            <li>Technical architecture visualization</li>
          </ul>
        </div>

        <div class="placeholder-section" id="section-tech">
          <h3>Tech Stack</h3>
          <div class="placeholder-tags">
            ${info.tags.map(tag => `<span class="placeholder-tag">${tag}</span>`).join('')}
          </div>
        </div>

        <div class="placeholder-section" id="section-gallery">
          <h3 class="lang-zh">截图（即将上线）</h3>
          <h3 class="lang-en">Gallery (Coming Soon)</h3>
          <p style="color:#888;font-size:13px;">Coming soon.</p>
        </div>

        <a class="placeholder-cta" href="#" onclick="event.preventDefault();">
          GitHub Repository →
        </a>
      </div>
    `;
  }

  let REMOIRE_PAGE_HTML = '';
  let CAREERFORGE_PAGE_HTML = '';
  let GENERATOR_PAGE_HTML = '';

  function init() {
    if (global.JingerArchive) return;

    if (global.REMOIRE_PAGE_HTML_GLOBAL) {
      REMOIRE_PAGE_HTML = global.REMOIRE_PAGE_HTML_GLOBAL;
    }
    if (global.CAREERFORGE_PAGE_HTML_GLOBAL) {
      CAREERFORGE_PAGE_HTML = global.CAREERFORGE_PAGE_HTML_GLOBAL;
    }
    if (global.GENERATOR_PAGE_HTML_GLOBAL) {
      GENERATOR_PAGE_HTML = global.GENERATOR_PAGE_HTML_GLOBAL;
    }

    const scene = new ArchiveScene();
    global.JingerArchive = scene;
    scene.init();
    console.log('[archive] VHS Archive initialized (carousel mode)');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})(window);
