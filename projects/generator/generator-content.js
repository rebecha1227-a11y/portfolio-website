(function (global) {
  'use strict';

  global.GENERATOR_PAGE_HTML_GLOBAL = `
    <div class="gen-page">

      <svg class="gen-svg-filters" xmlns="http://www.w3.org/2000/svg" width="0" height="0">
        <filter id="genInkFilter">
          <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="4" result="noise"/>
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.5" result="displaced"/>
          <feGaussianBlur in="displaced" stdDeviation="0.2"/>
        </filter>
      </svg>

      <!-- ═══ SECTION 1: HERO ═══ -->
      <section class="gen-hero" id="section-about">
        <div class="gen-hero-row">
          <div class="gen-hero-content">
            <h1 class="gen-hero-logo" id="gen-title">
              <span class="gen-logo-text">LittleRedNote</span>
              <span class="gen-logo-text">Generator</span>
            </h1>
            <p class="gen-hero-sub lang-zh">灵感 → AI → 成品，一键生成小红书图文。</p>
            <p class="gen-hero-sub lang-en">From idea to polished Xiaohongshu posts in one click.</p>
            <div class="gen-hero-actions">
              <a class="gen-btn gen-btn-primary" href="https://rednote-image-generater-production.up.railway.app/" target="_blank" rel="noopener">Try It →</a>
              <a class="gen-btn gen-btn-ghost" href="https://github.com/rebecha1227-a11y/Rednote-Image-Generater" target="_blank" rel="noopener">GitHub →</a>
            </div>
            <div class="gen-hero-stats">
              <div class="gen-stat">
                <svg class="gen-stat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>
                <span class="gen-stat-value lang-zh">30 min → 1 min</span>
                <span class="gen-stat-value lang-en">30 min → 1 min</span>
                <span class="gen-stat-label lang-zh">效率提升</span>
                <span class="gen-stat-label lang-en">Efficiency Boost</span>
              </div>
              <div class="gen-stat">
                <svg class="gen-stat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                <span class="gen-stat-value">3</span>
                <span class="gen-stat-label lang-zh">创作风格</span>
                <span class="gen-stat-label lang-en">Writing Styles</span>
              </div>
              <div class="gen-stat">
                <svg class="gen-stat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>
                <span class="gen-stat-value">5</span>
                <span class="gen-stat-label lang-zh">卡片布局</span>
                <span class="gen-stat-label lang-en">Card Layouts</span>
              </div>
            </div>
          </div>
          <div class="gen-hero-cards">
            <div class="gen-stamp-grid" id="gen-stamp-grid">
              <img class="gen-stamp" src="screenshots/generator/card-cover.JPG" alt="Cover card" loading="lazy">
              <img class="gen-stamp" src="screenshots/generator/card-text.JPG" alt="Text card" loading="lazy">
              <img class="gen-stamp" src="screenshots/generator/card-list.JPG" alt="List card" loading="lazy">
              <img class="gen-stamp" src="screenshots/generator/card-terminal.JPG" alt="Terminal card" loading="lazy">
              <img class="gen-stamp" src="screenshots/generator/card-grid.JPG" alt="Grid card" loading="lazy">
              <img class="gen-stamp" src="screenshots/generator/note_history.png" alt="Note history" loading="lazy">
              <img class="gen-stamp" src="screenshots/generator/Note-caption.png" alt="Note caption" loading="lazy">
              <img class="gen-stamp" src="screenshots/generator/ai-rewrite.png" alt="AI rewrite" loading="lazy">
            </div>
          </div>
        </div>
      </section>

      <div class="gen-divider"></div>

      <!-- ═══ SECTION 2: HOW IT WORKS ═══ -->
      <section class="gen-section" id="section-features">
        <div class="gen-section-header">
          <span class="gen-section-label lang-zh">创作流程</span>
          <span class="gen-section-label lang-en">How It Works</span>
        </div>

        <div class="gen-steps-grid">
          <div class="gen-step-card">
            <div class="gen-step-card-header">
              <span class="gen-step-num">01</span>
              <svg class="gen-step-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 3v18"/><path d="M8 8l4-4 4 4"/><path d="M8 16l4 4 4-4"/></svg>
            </div>
            <h3 class="lang-zh">输入灵感</h3>
            <h3 class="lang-en">Input Your Idea</h3>
            <p class="lang-zh">写下想法，选择创作风格，贴上参考链接。</p>
            <p class="lang-en">Write your idea, pick a style, add reference links.</p>
            <div class="gen-step-thumb">
              <img src="screenshots/generator/input.png" alt="Input interface" loading="lazy">
            </div>
          </div>

          <div class="gen-step-card">
            <div class="gen-step-card-header">
              <span class="gen-step-num">02</span>
              <svg class="gen-step-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2a10 10 0 1 0 10 10H12V2z"/><path d="M12 2a10 10 0 0 1 10 10"/></svg>
            </div>
            <h3 class="lang-zh">AI 生成卡片</h3>
            <h3 class="lang-en">AI Generates</h3>
            <p class="lang-zh">AI 一次性生成全套卡片，五种布局自动编排。</p>
            <p class="lang-en">AI generates a full set of cards with five layouts.</p>
            <div class="gen-step-thumb">
              <img src="screenshots/generator/Hero.png" alt="AI generation" loading="lazy">
            </div>
          </div>

          <div class="gen-step-card">
            <div class="gen-step-card-header">
              <span class="gen-step-num">03</span>
              <svg class="gen-step-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
            </div>
            <h3 class="lang-zh">所见即所得编辑</h3>
            <h3 class="lang-en">Edit In Place</h3>
            <p class="lang-zh">点击文字直接修改，AI 辅助局部改写。</p>
            <p class="lang-en">Click any text to edit, AI helps rewrite selections.</p>
            <div class="gen-step-thumb">
              <img src="screenshots/generator/Edit-In-Place.png" alt="Edit in place" loading="lazy">
            </div>
          </div>

          <div class="gen-step-card">
            <div class="gen-step-card-header">
              <span class="gen-step-num">04</span>
              <svg class="gen-step-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            </div>
            <h3 class="lang-zh">一键导出</h3>
            <h3 class="lang-en">One-Click Export</h3>
            <p class="lang-zh">1242×1660px 标准尺寸，批量导出 PNG。</p>
            <p class="lang-en">Export all cards as PNG at 1242×1660px.</p>
            <div class="gen-step-thumb">
              <img src="screenshots/generator/export.png" alt="Export" loading="lazy">
            </div>
          </div>
        </div>
      </section>

      <div class="gen-divider"></div>

      <!-- ═══ SECTION 3: CARD LAYOUTS ═══ -->
      <section class="gen-section" id="section-tech">
        <div class="gen-section-header">
          <span class="gen-section-label lang-zh">五种布局</span>
          <span class="gen-section-label lang-en">5 Layouts</span>
        </div>

        <div class="gen-layout-item">
          <div class="gen-layout-meta">
            <span class="gen-step-num">01</span>
            <div class="gen-layout-info">
              <h3>Cover</h3>
              <p class="lang-zh">封面卡片 — 大标题 + 双图堆叠 + 装饰星星 + 品牌标签</p>
              <p class="lang-en">Cover card — headline + stacked dual images + decorative stars + brand badges</p>
            </div>
          </div>
          <div class="gen-layout-image">
            <img src="screenshots/generator/card-cover.JPG" alt="Cover layout" loading="lazy">
          </div>
        </div>

        <div class="gen-divider-thin"></div>

        <div class="gen-layout-item">
          <div class="gen-layout-meta">
            <span class="gen-step-num">02</span>
            <div class="gen-layout-info">
              <h3>Text</h3>
              <p class="lang-zh">纯文本卡片 — 荧光笔高亮 + 标签标记 + 图文混排</p>
              <p class="lang-en">Text card — highlight markers + inline tags + mixed text-image blocks</p>
            </div>
          </div>
          <div class="gen-layout-image">
            <img src="screenshots/generator/card-text.JPG" alt="Text layout" loading="lazy">
          </div>
        </div>

        <div class="gen-divider-thin"></div>

        <div class="gen-layout-item">
          <div class="gen-layout-meta">
            <span class="gen-step-num">03</span>
            <div class="gen-layout-info">
              <h3>List</h3>
              <p class="lang-zh">列表卡片 — 自动编号圆形标记，适合步骤型内容</p>
              <p class="lang-en">List card — auto-numbered circular markers, great for step-by-step content</p>
            </div>
          </div>
          <div class="gen-layout-image">
            <img src="screenshots/generator/card-list.JPG" alt="List layout" loading="lazy">
          </div>
        </div>

        <div class="gen-divider-thin"></div>

        <div class="gen-layout-item">
          <div class="gen-layout-meta">
            <span class="gen-step-num">04</span>
            <div class="gen-layout-info">
              <h3>Terminal</h3>
              <p class="lang-zh">终端卡片 — 仿 macOS 终端窗口，Catppuccin Mocha 配色</p>
              <p class="lang-en">Terminal card — macOS-style terminal with Catppuccin Mocha color scheme</p>
            </div>
          </div>
          <div class="gen-layout-image">
            <img src="screenshots/generator/card-terminal.JPG" alt="Terminal layout" loading="lazy">
          </div>
        </div>

        <div class="gen-divider-thin"></div>

        <div class="gen-layout-item">
          <div class="gen-layout-meta">
            <span class="gen-step-num">05</span>
            <div class="gen-layout-info">
              <h3>Grid</h3>
              <p class="lang-zh">网格卡片 — 2 列布局，蓝色等宽字体，适合展示工具集合</p>
              <p class="lang-en">Grid card — 2-column grid with monospace labels, perfect for tool collections</p>
            </div>
          </div>
          <div class="gen-layout-image">
            <img src="screenshots/generator/card-grid.JPG" alt="Grid layout" loading="lazy">
          </div>
        </div>
      </section>

      <div class="gen-divider"></div>

      <!-- ═══ SECTION 4: AI POWER ═══ -->
      <section class="gen-section" id="section-gallery">
        <div class="gen-section-header">
          <span class="gen-section-label lang-zh">AI 能力</span>
          <span class="gen-section-label lang-en">AI Power</span>
        </div>

        <div class="gen-feature gen-feature-left">
          <div class="gen-feature-text">
            <h3 class="lang-zh">多供应商兼容</h3>
            <h3 class="lang-en">Multi-Provider</h3>
            <p class="lang-zh">支持任何 OpenAI 格式 API — DeepSeek、GPT-4o、Claude。自动识别 vision 模型，可以发图给 AI 分析。</p>
            <p class="lang-en">Works with any OpenAI-format API — DeepSeek, GPT-4o, Claude. Auto-detects vision models for image input.</p>
          </div>
          <div class="gen-feature-image">
            <img src="screenshots/generator/multi-provider.png" alt="Multi-provider support" loading="lazy">
          </div>
        </div>

        <div class="gen-divider-thin"></div>

        <div class="gen-feature gen-feature-right">
          <div class="gen-feature-text">
            <h3 class="lang-zh">AI 局部改写</h3>
            <h3 class="lang-en">Smart Rewrite</h3>
            <p class="lang-zh">选中文字，AI 只改选中部分，或重写整张卡片。支持自然语言指令："更犀利"、"更小红书"、"更具体"。</p>
            <p class="lang-en">Select text, AI rewrites just that part — or the entire card. Natural language instructions: "make it sharper", "more specific".</p>
          </div>
          <div class="gen-feature-image">
            <img src="screenshots/generator/ai-rewrite.png" alt="AI smart rewrite" loading="lazy">
          </div>
        </div>

        <div class="gen-divider-thin"></div>

        <div class="gen-feature gen-feature-left">
          <div class="gen-feature-text">
            <h3 class="lang-zh">参考链接抓取</h3>
            <h3 class="lang-en">Reference Extraction</h3>
            <p class="lang-zh">贴一个 URL，后端自动提取网页内容作为 AI 创作参考。内置 SSRF 防护，安全第一。</p>
            <p class="lang-en">Paste a URL, the backend auto-extracts page content as AI reference material. Built-in SSRF protection.</p>
          </div>
          <div class="gen-feature-image">
            <img src="screenshots/generator/Reference-Extraction.png" alt="Reference extraction" loading="lazy">
          </div>
        </div>
      </section>

      <div class="gen-divider"></div>

      <!-- ═══ SECTION 5: TECH HIGHLIGHTS + CTA ═══ -->
      <section class="gen-section gen-tech-cta" id="section-github">
        <div class="gen-section-header">
          <span class="gen-section-label lang-zh">技术亮点</span>
          <span class="gen-section-label lang-en">Under the Hood</span>
        </div>

        <div class="gen-tech-content">
          <div class="gen-tech-left">
            <div class="gen-pill-cloud">
              <span class="gen-pill">React 19</span>
              <span class="gen-pill">TypeScript</span>
              <span class="gen-pill">Tailwind CSS 4</span>
              <span class="gen-pill">Express</span>
              <span class="gen-pill">IndexedDB</span>
              <span class="gen-pill">html-to-image</span>
            </div>
          </div>
          <div class="gen-tech-right">
            <div class="gen-tech-highlight">
              <h4 class="lang-zh">离线可用</h4>
              <h4 class="lang-en">Works Offline</h4>
              <p class="lang-zh">IndexedDB 自动保存 + 版本管理，断网也不丢数据。</p>
              <p class="lang-en">IndexedDB auto-save with version management. Your data survives disconnects.</p>
            </div>
            <div class="gen-tech-highlight">
              <h4 class="lang-zh">安全防护</h4>
              <h4 class="lang-en">Security First</h4>
              <p class="lang-zh">完整 SSRF 防护，防止恶意链接注入。</p>
              <p class="lang-en">Full SSRF protection prevents malicious URL injection.</p>
            </div>
            <div class="gen-tech-highlight">
              <h4 class="lang-zh">撤销 / 重做</h4>
              <h4 class="lang-en">Undo / Redo</h4>
              <p class="lang-zh">全局 30 步 + 单卡 20 步独立历史，随时回退。</p>
              <p class="lang-en">30-step global + 20-step per-card independent history.</p>
            </div>
          </div>
        </div>

        <div class="gen-final-cta">
          <h2 class="gen-cta-title lang-zh">试试看。</h2>
          <h2 class="gen-cta-title lang-en">Try it yourself.</h2>
          <p class="gen-cta-sub lang-zh">60 秒生成你的第一张小红书卡片。</p>
          <p class="gen-cta-sub lang-en">Generate your first card in 60 seconds.</p>
          <a class="gen-btn gen-btn-primary gen-btn-lg gen-btn-pulse" href="https://rednote-image-generater-production.up.railway.app/" target="_blank" rel="noopener">Try It →</a>
        </div>
      </section>

    </div>
  `;
})(window);
