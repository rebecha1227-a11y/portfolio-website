/* ═══════════════════════════════════════════════════════════════════════
   CRT EFFECTS — Noise canvas + Preview frame cycler + Standby text
   ═══════════════════════════════════════════════════════════════════════ */

(function (global) {
  'use strict';

  /* ─── PREVIEW FRAME GENERATORS (procedural since no real assets) ── */
  // Each project gets a canvas-rendered "preview" — visual teaser in
  // matching color palette. Cycles at 5fps per design system v2 spec.

  const PREVIEW_PALETTES = {
    remoire: {
      bg: '#1A1512', bgAlt: '#0F0D0A',
      accent: '#D4956A', accent2: '#E8C4A0',
      text: '#F5EDE0', muted: '#8B6F47',
      headline: 'REMOIRE', sub: 'AI Memory Companion',
      desc: 'Your conversations, remembered.',
      tags: ['AI', 'MEMORY', 'COMPANION'],
      stats: [{ label: 'SESSIONS', val: '2.4K' }, { label: 'RECALL', val: '97%' }]
    },
    careerforge: {
      bg: '#0D1520', bgAlt: '#0A1018',
      accent: '#C68B2C', accent2: '#7A9E7E',
      text: '#E8E4DC', muted: '#5A7A9E',
      headline: 'CAREERFORGE', sub: '6 AI Resume Skills',
      desc: '102 ★ on GitHub. Open source.',
      tags: ['OPEN SOURCE', 'AI', 'RESUME'],
      stats: [{ label: 'STARS', val: '102' }, { label: 'SKILLS', val: '6' }]
    },
    frenchquest: {
      bg: '#12141E', bgAlt: '#0A0C14',
      accent: '#2E5A88', accent2: '#C75B39',
      text: '#E0DCD4', muted: '#6B8AAF',
      headline: 'FRANÇAIS', sub: 'Language Quest',
      desc: 'Interactive French learning.',
      tags: ['LANGUAGE', 'INTERACTIVE', 'WEB'],
      stats: [{ label: 'LESSONS', val: '40+' }, { label: 'QUIZZES', val: '120' }]
    },
    chatbox: {
      bg: '#0A1A0A', bgAlt: '#060F06',
      accent: '#34C759', accent2: '#007AFF',
      text: '#E8F0E8', muted: '#4A9A6A',
      headline: 'CHATBOX', sub: 'AI Roleplay Engine',
      desc: 'Multi-persona conversations.',
      tags: ['AI', 'CHAT', 'ROLEPLAY'],
      stats: [{ label: 'PERSONAS', val: '8' }, { label: 'THREADS', val: '∞' }]
    },
    generator: {
      bg: '#1A0A0A', bgAlt: '#120606',
      accent: '#FF2442', accent2: '#FFB800',
      text: '#F0E8E8', muted: '#CC4455',
      headline: 'REDNOTE', sub: 'Image Generator',
      desc: '17.6K likes & saves.',
      tags: ['小红书', 'CONTENT', 'VIRAL'],
      stats: [{ label: 'LIKES', val: '17.6K' }, { label: 'POSTS', val: '50+' }]
    }
  };

  function drawPreviewFrame(canvas, palette, frameIndex) {
    const ctx = canvas.getContext('2d');
    const w = canvas.width = Math.max(canvas.offsetWidth * 2, 640);
    const h = canvas.height = Math.max(canvas.offsetHeight * 2, 480);
    canvas.style.width = '100%';
    canvas.style.height = '100%';

    const t = frameIndex / 8;
    const pulse = Math.sin(t * Math.PI * 2);

    ctx.clearRect(0, 0, w, h);

    const grad = ctx.createRadialGradient(w * 0.3, h * 0.4, 0, w * 0.5, h * 0.5, w * 0.8);
    grad.addColorStop(0, palette.bg);
    grad.addColorStop(1, palette.bgAlt);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    ctx.fillStyle = palette.accent + '08';
    for (let i = 0; i < 6; i++) {
      const lineY = h * 0.1 + i * h * 0.16 + pulse * 2;
      ctx.fillRect(0, lineY, w, 1);
    }

    const topBarH = h * 0.06;
    ctx.fillStyle = palette.accent + '18';
    ctx.fillRect(0, 0, w, topBarH);
    ctx.fillStyle = palette.accent;
    ctx.fillRect(0, topBarH - 1, w, 1);

    ctx.textAlign = 'left';
    ctx.fillStyle = palette.accent;
    ctx.font = `${w * 0.018}px monospace`;
    ctx.fillText('▸ VHS://' + palette.headline.toLowerCase() + '.tape', w * 0.03, topBarH * 0.65);

    for (let i = 0; i < 3; i++) {
      const cx = w - w * 0.03 - i * w * 0.025;
      ctx.fillStyle = i === 0 ? palette.accent : palette.muted + '60';
      ctx.beginPath();
      ctx.arc(cx, topBarH * 0.5, 4, 0, Math.PI * 2);
      ctx.fill();
    }

    const headY = h * 0.18;
    ctx.fillStyle = palette.text;
    ctx.font = `bold ${w * 0.075}px monospace`;
    ctx.textAlign = 'left';
    ctx.fillText(palette.headline, w * 0.06, headY);

    const lineW = ctx.measureText(palette.headline).width;
    ctx.fillStyle = palette.accent;
    ctx.fillRect(w * 0.06, headY + 6, lineW, 2);

    ctx.fillStyle = palette.muted;
    ctx.font = `${w * 0.028}px monospace`;
    ctx.fillText(palette.sub, w * 0.06, headY + h * 0.06);

    ctx.fillStyle = palette.text + 'AA';
    ctx.font = `${w * 0.024}px monospace`;
    ctx.fillText(palette.desc, w * 0.06, headY + h * 0.12);

    const tagY = headY + h * 0.19;
    let tagX = w * 0.06;
    ctx.font = `bold ${w * 0.016}px monospace`;
    palette.tags.forEach((tag, i) => {
      const tw = ctx.measureText(tag).width + w * 0.03;
      ctx.fillStyle = i === 0 ? palette.accent + '30' : palette.muted + '20';
      ctx.fillRect(tagX, tagY - w * 0.016, tw, w * 0.026);
      ctx.fillStyle = i === 0 ? palette.accent : palette.text + '99';
      ctx.fillText(tag, tagX + w * 0.015, tagY);
      tagX += tw + w * 0.012;
    });

    const cardY = h * 0.54;
    const cardW = w * 0.38;
    const cardH = h * 0.28;
    const cardX = w * 0.06;

    ctx.fillStyle = palette.accent + '0C';
    ctx.fillRect(cardX, cardY, cardW, cardH);
    ctx.strokeStyle = palette.accent + '30';
    ctx.lineWidth = 1;
    ctx.strokeRect(cardX, cardY, cardW, cardH);

    palette.stats.forEach((s, i) => {
      const sx = cardX + w * 0.03 + i * w * 0.16;
      const sy = cardY + cardH * 0.35;
      ctx.fillStyle = palette.accent;
      ctx.font = `bold ${w * 0.05}px monospace`;
      ctx.textAlign = 'left';
      ctx.fillText(s.val, sx, sy);
      ctx.fillStyle = palette.muted;
      ctx.font = `${w * 0.016}px monospace`;
      ctx.fillText(s.label, sx, sy + w * 0.03);
    });

    const vizX = w * 0.52;
    const vizY = h * 0.54;
    const vizW = w * 0.42;
    const vizH = h * 0.28;
    const barCount = 8;
    const barGap = vizW / (barCount + 1);

    ctx.strokeStyle = palette.muted + '20';
    ctx.lineWidth = 0.5;
    for (let i = 0; i < 4; i++) {
      const ly = vizY + vizH - i * vizH * 0.25;
      ctx.beginPath();
      ctx.moveTo(vizX, ly);
      ctx.lineTo(vizX + vizW, ly);
      ctx.stroke();
    }

    for (let i = 0; i < barCount; i++) {
      const bx = vizX + barGap * (i + 0.5);
      const amplitude = (Math.sin((i + frameIndex * 0.5) * 0.8) + 1) * 0.35 + 0.15;
      const bh = vizH * amplitude;
      const by = vizY + vizH - bh;

      const barGrad = ctx.createLinearGradient(bx, by, bx, vizY + vizH);
      barGrad.addColorStop(0, palette.accent);
      barGrad.addColorStop(1, palette.accent + '40');
      ctx.fillStyle = barGrad;
      ctx.fillRect(bx, by, barGap * 0.6, bh);
    }

    const scanY = (frameIndex * h * 0.15) % h;
    const scanGrad = ctx.createLinearGradient(0, scanY - 4, 0, scanY + 4);
    scanGrad.addColorStop(0, 'rgba(255,255,255,0)');
    scanGrad.addColorStop(0.5, 'rgba(255,255,255,0.03)');
    scanGrad.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = scanGrad;
    ctx.fillRect(0, scanY - 4, w, 8);

    const statusY = h * 0.93;
    ctx.fillStyle = palette.muted + '40';
    ctx.font = `${w * 0.014}px monospace`;
    ctx.textAlign = 'left';
    const blinkChar = frameIndex % 2 === 0 ? '█' : ' ';
    ctx.fillText('READY ' + blinkChar, w * 0.06, statusY);
    ctx.textAlign = 'right';
    ctx.fillText('VHS-' + palette.headline.substring(0, 4) + ' // REC ●', w * 0.94, statusY);

    for (let i = 0; i < 120; i++) {
      ctx.fillStyle = `rgba(${Math.random() < 0.5 ? '255,255,255' : '0,0,0'}, ${Math.random() * 0.03})`;
      ctx.fillRect(Math.random() * w, Math.random() * h, 1, 1);
    }

    ctx.textAlign = 'left';
  }

  /* ─── CRT EFFECTS CLASS ─────────────────────────────────────────── */
  class CRTEffects {
    constructor(previewEl, noiseCanvasEl) {
      this.previewEl = previewEl;
      this.noiseCanvas = noiseCanvasEl;
      this.previewCanvas = null;
      this.noiseCtx = null;
      this.noiseTimer = null;
      this.previewTimer = null;
      this.currentProject = null;
      this.frameIndex = 0;
      this.active = false;
    }

    init() {
      // Build preview canvas
      this.previewCanvas = document.createElement('canvas');
      this.previewCanvas.style.cssText = `
        width: 100%; height: 100%; display: block;
        image-rendering: pixelated;
      `;
      this.previewEl.appendChild(this.previewCanvas);

      // Setup noise canvas (dynamic grain)
      const rect = this.noiseCanvas.getBoundingClientRect();
      this.noiseCanvas.width = 200;
      this.noiseCanvas.height = 150;
      this.noiseCtx = this.noiseCanvas.getContext('2d');

      this.active = true;
      this._startNoise();
    }

    /* ─── NOISE CANVAS (continuous subtle grain) ─────────────────── */
    _startNoise() {
      if (this.noiseTimer) return;
      const ctx = this.noiseCtx;
      const w = this.noiseCanvas.width;
      const h = this.noiseCanvas.height;

      const renderNoise = () => {
        if (!this.active) return;
        const imgData = ctx.createImageData(w, h);
        const data = imgData.data;
        for (let i = 0; i < data.length; i += 4) {
          const v = Math.random() * 255;
          data[i] = v;
          data[i + 1] = v;
          data[i + 2] = v;
          data[i + 3] = 40; // opacity
        }
        ctx.putImageData(imgData, 0, 0);
        this.noiseTimer = requestAnimationFrame(renderNoise);
      };
      renderNoise();
    }

    /* ─── PREVIEW CYCLING ─────────────────────────────────────────── */
    showPreview(projectId) {
      if (!this.previewCanvas) return;

      this._flashNoise();

      setTimeout(() => {
        this.currentProject = projectId;
        this.frameIndex = 0;
        this.previewEl.style.opacity = '';
        this.previewEl.classList.add('active');

        // Stop standby text from showing on top
        const content = document.getElementById('crt-content');
        if (content) content.style.opacity = '0';

        const palette = PREVIEW_PALETTES[projectId] || PREVIEW_PALETTES.remoire;

        // Cycle frames at 5fps
        if (this.previewTimer) clearInterval(this.previewTimer);
        drawPreviewFrame(this.previewCanvas, palette, this.frameIndex);
        this.previewTimer = setInterval(() => {
          this.frameIndex = (this.frameIndex + 1) % 8;
          drawPreviewFrame(this.previewCanvas, palette, this.frameIndex);
        }, 200); // 5fps
      }, 50);
    }

    hidePreview() {
      if (this.previewTimer) {
        clearInterval(this.previewTimer);
        this.previewTimer = null;
      }
      this._flashNoise();
      setTimeout(() => {
        this.previewEl.classList.remove('active');
        const content = document.getElementById('crt-content');
        if (content) content.style.opacity = '1';
        this.currentProject = null;
      }, 50);
    }

    _flashNoise() {
      const noise = this.noiseCanvas;
      noise.classList.add('active');
      setTimeout(() => noise.classList.remove('active'), 80);
    }

    /* ─── LIFECYCLE ────────────────────────────────────────────────── */
    stop() {
      this.active = false;
      if (this.noiseTimer) {
        cancelAnimationFrame(this.noiseTimer);
        this.noiseTimer = null;
      }
      if (this.previewTimer) {
        clearInterval(this.previewTimer);
        this.previewTimer = null;
      }
    }
  }

  global.ArchiveCRTEffects = CRTEffects;
})(window);