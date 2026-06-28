/* ═══════════════════════════════════════════════════════════════════════
   TAPE PHYSICS — Carousel-compatible stub
   The carousel renderer in archive.js now handles all positioning.
   This module is kept for API compatibility with sub-modules.
   ═══════════════════════════════════════════════════════════════════════ */

(function (global) {
  'use strict';

  class TapePhysics {
    constructor(tapeEls, callbacks) {
      this.tapeEls = tapeEls;
      this.callbacks = callbacks;
      this.enabled = false;
    }

    setEnabled(enabled) { this.enabled = enabled; }
    setRestPosition() {}
    getRestPosition() { return { x: 0, y: 0 }; }
    pause() { this.enabled = false; }
    resume() { this.enabled = true; }
  }

  global.ArchiveTapePhysics = TapePhysics;
})(window);
