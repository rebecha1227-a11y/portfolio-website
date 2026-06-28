(function (global) {
  'use strict';

  global.REMOIRE_PAGE_HTML_GLOBAL = `
    <div class="remoire-page">

      <!-- PROGRESS BAR -->
      <div class="remoire-progress">
        <div class="remoire-progress-track">
          <div class="remoire-progress-fill" id="rm-progress-fill"></div>
        </div>
        <div class="remoire-progress-dots">
          <span class="dot active" data-idx="0">01</span>
          <span class="dot" data-idx="1">02</span>
          <span class="dot" data-idx="2">03</span>
          <span class="dot" data-idx="3">04</span>
          <span class="dot" data-idx="4">05</span>
        </div>
      </div>

      <!-- HERO -->
      <section class="remoire-hero" id="section-about">
        <div class="remoire-hero-bg">
          <div class="hero-blob blob-1"></div>
          <div class="hero-blob blob-2"></div>
          <div class="hero-blob blob-3"></div>
        </div>
        <div class="remoire-hero-content">
          <div class="remoire-hero-text">
            <div class="hero-eyebrow-wrap">
              <span class="remoire-eyebrow">AI Relationship OS</span>
              <div class="eyebrow-line"></div>
            </div>
            <h1 class="hero-title-animate">
              <span class="title-line">Remoire</span>
            </h1>
            <p class="subtitle hero-fade-up">两人专属的 AI 情感陪伴空间。不是聊天工具，是你们共同拥有的一间客厅。</p>
            <p class="subtitle-en hero-fade-up">A two-person AI companion PWA — not a chatbot, but a living room you share.</p>
            <div class="remoire-hero-stats hero-fade-up">
              <div class="stat-item" data-count="25">
                <span class="stat-value">0</span>
                <span class="stat-label">数据表</span>
                <div class="stat-glow"></div>
              </div>
              <div class="stat-item" data-count="4">
                <span class="stat-value">0</span>
                <span class="stat-label">记忆层级</span>
                <div class="stat-glow"></div>
              </div>
              <div class="stat-item" data-count="3">
                <span class="stat-value">0</span>
                <span class="stat-label">平台同步</span>
                <div class="stat-glow"></div>
              </div>
              <div class="stat-item" data-count="8">
                <span class="stat-value">0</span>
                <span class="stat-label">Prompt 模板</span>
                <div class="stat-glow"></div>
              </div>
            </div>
          </div>
          <div class="image-block hero-image-reveal">
            <div class="phone-3d-container">
              <div class="remoire-phone-frame" id="hero-phone">
                <div class="phone-screen-glow"></div>
                <img src="screenshots/remoire/Cover-remoire.png" alt="Remoire main interface" loading="lazy">
                <div class="phone-reflection"></div>
              </div>
              <div class="phone-shadow"></div>
            </div>
          </div>
        </div>
        <div class="scroll-hint">
          <div class="scroll-mouse">
            <div class="scroll-wheel"></div>
          </div>
          <span>scroll</span>
        </div>
      </section>

      <!-- POSITIONING -->
      <section class="remoire-positioning">
        <div class="remoire-positioning-inner">
          <div class="quote-mark open">"</div>
          <p class="positioning-quote">关系跨平台、跨时间保持一致</p>
          <div class="quote-mark close">"</div>
          <p class="positioning-desc">Remoire 的核心设计理念是让 AI 从「被动应答的工具」变成「主动关怀的伴侣」。AI 角色 Connie 不只是回答你的问题——他会在合适的时候主动找你聊天、悄悄给你留纸条、在日记里写下他的想法，甚至会根据你的 iPhone 数据关心你今天是不是走了太多路。</p>
        </div>
        <div class="positioning-particles" id="positioning-particles"></div>
      </section>

      <!-- CORE FEATURES LINE -->
      <div class="remoire-feature-line">
        <div class="feature-line-track">
          <span class="feature-line-item">艾宾浩斯记忆曲线</span>
          <span class="feature-line-dot">◆</span>
          <span class="feature-line-item">AI 自主活动</span>
          <span class="feature-line-dot">◆</span>
          <span class="feature-line-item">日记锁与解锁</span>
          <span class="feature-line-dot">◆</span>
          <span class="feature-line-item">跨平台同步</span>
          <span class="feature-line-dot">◆</span>
          <span class="feature-line-item">时间感知视觉</span>
          <span class="feature-line-dot">◆</span>
          <span class="feature-line-item">艾宾浩斯记忆曲线</span>
          <span class="feature-line-dot">◆</span>
          <span class="feature-line-item">AI 自主活动</span>
          <span class="feature-line-dot">◆</span>
          <span class="feature-line-item">日记锁与解锁</span>
        </div>
      </div>

      <!-- FEATURE 1: Memory System -->
      <section class="remoire-feature-section" id="section-features" data-feature="1">
        <div class="feature-bg-number">01</div>
        <div class="text-block">
          <span class="feature-number">01</span>
          <h2>四层记忆 + 自然遗忘</h2>
          <p>不是简单地"存一条记忆"。Remoire 用改良的艾宾浩斯遗忘曲线做了四层分级：</p>
          <ul class="remoire-feature-list">
            <li class="feature-list-item" data-layer="core">
              <div class="layer-indicator">
                <span class="layer-dot" style="--layer-color: #D4956A;"></span>
                <span class="layer-pulse"></span>
              </div>
              <div class="layer-content">
                <strong>核心层</strong> — 永不衰减。生日、关系基石、重要纪念日。
              </div>
            </li>
            <li class="feature-list-item" data-layer="long">
              <div class="layer-indicator">
                <span class="layer-dot" style="--layer-color: #C7A882;"></span>
                <span class="layer-pulse"></span>
              </div>
              <div class="layer-content">
                <strong>长期层</strong> — 每天保留率 99.5%。你的口味偏好、朋友名字。
              </div>
            </li>
            <li class="feature-list-item" data-layer="short">
              <div class="layer-indicator">
                <span class="layer-dot" style="--layer-color: #8B6F47;"></span>
                <span class="layer-pulse"></span>
              </div>
              <div class="layer-content">
                <strong>短期层</strong> — 每天保留率 95%。昨天聊的话题。
              </div>
            </li>
            <li class="feature-list-item" data-layer="stream">
              <div class="layer-indicator">
                <span class="layer-dot" style="--layer-color: #B8A99A;"></span>
                <span class="layer-pulse"></span>
              </div>
              <div class="layer-content">
                <strong>意识流层</strong> — 不会衰减。Connie 视角记下的内心想法、感受与行动备忘。
              </div>
            </li>
          </ul>
          <p class="feature-detail">被回忆的次数越多，衰减越慢。高情绪唤醒度的记忆也衰减更慢——就像人类对强烈情感经历记得更久。每次写入新记忆时，还会自动找出最相关的 3 条旧记忆，增加它们的触发计数——像人脑中"想到一件事连带想到另一件事"。</p>
        </div>
        <div class="image-block">
          <div class="screenshot-reveal">
            <div class="remoire-phone-frame no-crop tilt-card">
              <img src="screenshots/remoire/memory_palace.PNG" alt="Memory system" loading="lazy">
              <div class="screenshot-overlay">
                <div class="scan-line"></div>
              </div>
            </div>
            <div class="image-caption-float">记忆宫殿界面</div>
          </div>
        </div>
      </section>

      <!-- FEATURE 2: Autonomous Activity -->
      <section class="remoire-feature-section reverse" data-feature="2">
        <div class="feature-bg-number">02</div>
        <div class="text-block">
          <span class="feature-number">02</span>
          <h2>AI 自主活动系统</h2>
          <p>不再是你问它答。Connie 每 45-75 分钟（随机间隔）自主"醒来"，可以做这些事：</p>
          <ul class="remoire-feature-list">
            <li class="feature-list-item" data-layer="msg">
              <div class="layer-indicator">
                <span class="layer-dot" style="--layer-color: #D4956A;"></span>
                <span class="layer-pulse"></span>
              </div>
              <div class="layer-content">
                <strong>主动发消息</strong> — 有冷却时间（60 分钟）和每日上限（5 条），不会骚扰你
              </div>
            </li>
            <li class="feature-list-item" data-layer="diary">
              <div class="layer-indicator">
                <span class="layer-dot" style="--layer-color: #C7A882;"></span>
                <span class="layer-pulse"></span>
              </div>
              <div class="layer-content">
                <strong>写日记</strong> — 他也有自己的日记本
              </div>
            </li>
            <li class="feature-list-item" data-layer="note">
              <div class="layer-indicator">
                <span class="layer-dot" style="--layer-color: #8B6F47;"></span>
                <span class="layer-pulse"></span>
              </div>
              <div class="layer-content">
                <strong>留小纸条</strong> — 你打开 app 时才发现，像"你不在的时候我在想你"
              </div>
            </li>
            <li class="feature-list-item" data-layer="status">
              <div class="layer-indicator">
                <span class="layer-dot" style="--layer-color: #B8A99A;"></span>
                <span class="layer-pulse"></span>
              </div>
              <div class="layer-content">
                <strong>更新气息状态</strong> — 聊天顶部 4-12 字的诗意短语，"在发呆""想你了"
              </div>
            </li>
          </ul>
          <p class="feature-detail">关键设计：AI 有"内心独白"（不发给用户）和"外部消息"（发给用户）的区分。Prompt 里还写了——"不调用工具也是一种正常的亲密"，避免 AI 过度积极。</p>
        </div>
        <div class="image-block">
          <div class="screenshot-reveal">
            <div class="remoire-phone-frame no-crop tilt-card">
              <img src="screenshots/remoire/daily_log.PNG" alt="Autonomous messaging" loading="lazy">
              <div class="screenshot-overlay">
                <div class="scan-line"></div>
              </div>
            </div>
            <div class="image-caption-float">自主消息推送</div>
          </div>
        </div>
      </section>

      <!-- FEATURE 3: Diary Lock -->
      <section class="remoire-feature-section" data-feature="3">
        <div class="feature-bg-number">03</div>
        <div class="text-block">
          <span class="feature-number">03</span>
          <h2>日记锁与解锁仪式</h2>
          <p>这是产品最具差异化的交互。</p>
          <div class="diary-lock-demo">
            <div class="lock-visual">
              <div class="lock-body">
                <div class="lock-shackle"></div>
                <div class="lock-keyhole"></div>
              </div>
              <div class="unlock-ripple"></div>
            </div>
            <p class="lock-caption">用户可以锁日记。AI 可以"请求解锁"——但需要给出理由。解锁成功后 AI 会留下阅读痕迹和感想。所有解锁尝试（成功和失败的）都有完整记录。</p>
          </div>
          <p class="feature-detail">小纸条系统也很特别：AI 悄悄留言，不推送通知，打开 app 才发现——"你不在的时候我想到了一些东西"。这种非对称的主动性，让关系有了自然的节奏感。</p>
        </div>
        <div class="image-block">
          <div class="image-pair">
            <div class="screenshot-reveal">
              <div class="remoire-phone-frame no-crop tilt-card">
                <img src="screenshots/remoire/diary_log.PNG" alt="Diary system" loading="lazy">
                <div class="screenshot-overlay">
                  <div class="scan-line"></div>
                </div>
              </div>
            </div>
            <div class="screenshot-reveal">
              <div class="remoire-phone-frame no-crop tilt-card">
                <img src="screenshots/remoire/notes.PNG" alt="Notes system" loading="lazy">
                <div class="screenshot-overlay">
                  <div class="scan-line"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="image-caption-float">日记与纸条系统</div>
        </div>
      </section>

      <!-- FEATURE 4: Cross-Platform -->
      <section class="remoire-feature-section reverse" data-feature="4">
        <div class="feature-bg-number">04</div>
        <div class="text-block">
          <span class="feature-number">04</span>
          <h2>跨平台 · 同一段关系</h2>
          <p>三种触达方式，同一个记忆体、同一个人格、同一段持续的关系：</p>
          <div class="platform-cards">
            <div class="platform-card" data-platform="pwa">
              <div class="platform-icon-dot" style="--dot-color: #D4956A;"></div>
              <div class="platform-name">PWA</div>
              <div class="platform-desc">手机原生体验，Web Push 推送，时间感知视觉系统</div>
            </div>
            <div class="platform-card" data-platform="mcp">
              <div class="platform-icon-dot" style="--dot-color: #C7A882;"></div>
              <div class="platform-name">MCP 协议</div>
              <div class="platform-desc">在 Claude Desktop 里直接和 Connie 对话，暴露 recall/remember/resume 等 8 个工具</div>
            </div>
            <div class="platform-card" data-platform="wechat">
              <div class="platform-icon-dot" style="--dot-color: #8B6F47;"></div>
              <div class="platform-name">微信</div>
              <div class="platform-desc">通过 iLink API 接入，最轻量的触达</div>
            </div>
          </div>
          <p class="feature-detail">iPhone 设备感知也很有意思：通过快捷指令每 3 小时上传位置、天气、电量、步数、屏幕使用时长。这些数据不是展示为仪表盘，而是 AI 悄悄知道——"你今天走了好多路"、"手机快没电了该休息了"。</p>
        </div>
        <div class="image-block">
          <div class="image-pair">
            <div class="screenshot-reveal">
              <div class="remoire-phone-frame no-crop tilt-card">
                <img src="screenshots/remoire/device_reports.PNG" alt="Device reports" loading="lazy">
                <div class="screenshot-overlay">
                  <div class="scan-line"></div>
                </div>
              </div>
            </div>
            <div class="screenshot-reveal">
              <div class="remoire-phone-frame no-crop tilt-card">
                <img src="screenshots/remoire/pwa.jpg" alt="MCP settings" loading="lazy">
                <div class="screenshot-overlay">
                  <div class="scan-line"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="image-caption-float">跨平台同步设置</div>
        </div>
      </section>

      <!-- FEATURE 5: Time-Aware Visual System -->
      <section class="remoire-feature-section" data-feature="5">
        <div class="feature-bg-number">05</div>
        <div class="text-block">
          <span class="feature-number">05</span>
          <h2>会呼吸的客厅</h2>
          <p>不是静态 UI。整个 app 随一天中的时间段变化：</p>
          <div class="time-of-day-visual">
            <div class="time-ring">
              <div class="time-slice" data-time="黎明" style="--slice-color: #F0C987; --slice-idx: 0;"></div>
              <div class="time-slice" data-time="清晨" style="--slice-color: #E8B870; --slice-idx: 1;"></div>
              <div class="time-slice" data-time="午后" style="--slice-color: #D4956A; --slice-idx: 2;"></div>
              <div class="time-slice" data-time="黄金时分" style="--slice-color: #C7A882; --slice-idx: 3;"></div>
              <div class="time-slice" data-time="黄昏" style="--slice-color: #A0785A; --slice-idx: 4;"></div>
              <div class="time-slice" data-time="夜晚" style="--slice-color: #6B5B4E; --slice-idx: 5;"></div>
              <div class="time-slice" data-time="深夜" style="--slice-color: #3D2B1F; --slice-idx: 6;"></div>
            </div>
          </div>
          <ul class="remoire-feature-list">
            <li>7 档环境光效 — 黎明 / 清晨 / 午后 / 黄金时分 / 黄昏 / 夜晚 / 深夜</li>
            <li>聊天气泡是半透明"玻璃"质感，随时段变色</li>
            <li>雨雾粒子特效，根据实际天气数据触发</li>
            <li>超过 30 分钟没聊插入时间标记，超过 2 小时自动执行 resume</li>
          </ul>
        </div>
        <div class="image-block">
          <div class="image-pair">
            <div class="screenshot-reveal">
              <div class="remoire-phone-frame no-crop tilt-card">
                <img src="screenshots/remoire/dawn.PNG" alt="Dawn visuals" loading="lazy">
                <div class="screenshot-overlay">
                  <div class="scan-line"></div>
                </div>
              </div>
            </div>
            <div class="screenshot-reveal">
              <div class="remoire-phone-frame no-crop tilt-card">
                <img src="screenshots/remoire/midnight.PNG" alt="Midnight visuals" loading="lazy">
                <div class="screenshot-overlay">
                  <div class="scan-line"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="image-caption-float">黎明与深夜时刻</div>
        </div>
      </section>

      <!-- TECH ARCHITECTURE -->
      <section class="remoire-tech" id="section-tech">
        <div class="tech-section-header">
          <h2>技术架构</h2>
          <div class="tech-header-line"></div>
        </div>
        <div class="remoire-tech-grid">
          <div class="tech-card" data-tech="frontend">
            <div class="tech-card-glow"></div>
            <div class="tech-card-header">
              <span>前端</span>
            </div>
            <div class="tech-card-items">
              <span class="tech-tag">React 19</span>
              <span class="tech-tag">Vite 6</span>
              <span class="tech-tag">Tailwind CSS 4</span>
              <span class="tech-tag">React Router 7</span>
            </div>
          </div>
          <div class="tech-card" data-tech="backend">
            <div class="tech-card-glow"></div>
            <div class="tech-card-header">
              <span>后端</span>
            </div>
            <div class="tech-card-items">
              <span class="tech-tag">Python 3.12</span>
              <span class="tech-tag">FastAPI</span>
              <span class="tech-tag">Uvicorn</span>
              <span class="tech-tag">APScheduler</span>
            </div>
          </div>
          <div class="tech-card" data-tech="data">
            <div class="tech-card-glow"></div>
            <div class="tech-card-header">
              <span>数据</span>
            </div>
            <div class="tech-card-items">
              <span class="tech-tag">SQLite WAL</span>
              <span class="tech-tag">aiosqlite</span>
              <span class="tech-tag">25 张表</span>
              <span class="tech-tag">9 个 Router</span>
            </div>
          </div>
          <div class="tech-card" data-tech="ai">
            <div class="tech-card-glow"></div>
            <div class="tech-card-header">
              <span>AI & 协议</span>
            </div>
            <div class="tech-card-items">
              <span class="tech-tag">OpenAI 兼容</span>
              <span class="tech-tag">FastMCP (SSE)</span>
              <span class="tech-tag">Web Push</span>
              <span class="tech-tag">多模型切换</span>
            </div>
          </div>
        </div>
        <p class="tech-note">支持 DeepSeek · OpenAI · Anthropic · Gemini Flash · Ollama · SiliconFlow 等多个 LLM 提供商。三个模型槽位（daily / deep / backend）分别用于日常聊天、深度对话和后台任务。</p>
        
        <!-- Architecture Diagram -->
        <div class="arch-diagram">
          <div class="arch-node arch-client">
            <div class="arch-node-label">Client</div>
            <div class="arch-node-subs">
              <span>PWA</span>
              <span>MCP</span>
              <span>WeChat</span>
            </div>
          </div>
          <div class="arch-connector">
            <div class="arch-arrow"></div>
            <div class="arch-packet"></div>
          </div>
          <div class="arch-node arch-server">
            <div class="arch-node-label">FastAPI</div>
            <div class="arch-node-subs">
              <span>Router</span>
              <span>Service</span>
              <span>Prompt</span>
            </div>
          </div>
          <div class="arch-connector">
            <div class="arch-arrow"></div>
            <div class="arch-packet"></div>
          </div>
          <div class="arch-node arch-data">
            <div class="arch-node-label">SQLite</div>
            <div class="arch-node-subs">
              <span>Memory</span>
              <span>Diary</span>
              <span>User</span>
            </div>
          </div>
        </div>
      </section>

      <!-- ARCHITECTURE OVERVIEW -->
      <section class="remoire-architecture">
        <h2>代码结构</h2>
        <div class="arch-columns">
          <div class="arch-col">
            <h3>Backend</h3>
            <div class="arch-tree">
              <div class="arch-item tree-animate"><span class="arch-file">main.py</span> — FastAPI 入口 + 5 个定时任务</div>
              <div class="arch-item tree-animate"><span class="arch-file">llm.py</span> — 统一 LLM 调用（流式/非流式/工具调用）</div>
              <div class="arch-item tree-animate"><span class="arch-file">database.py</span> — 25+ 张表初始化</div>
              <div class="arch-item tree-animate"><span class="arch-folder">routers/</span> — 10 个路由模块</div>
              <div class="arch-item tree-animate"><span class="arch-folder">services/</span> — 13 个服务层</div>
              <div class="arch-item tree-animate"><span class="arch-folder">prompts/</span> — 8 个 Prompt 模板</div>
              <div class="arch-item tree-animate"><span class="arch-folder">scheduler/</span> — 自动日记 / 记忆衰减 / 压缩</div>
            </div>
          </div>
          <div class="arch-col">
            <h3>Frontend</h3>
            <div class="arch-tree">
              <div class="arch-item tree-animate"><span class="arch-file">App.jsx</span> — 5 Tab + 字体 + 主题 + 心跳</div>
              <div class="arch-item tree-animate"><span class="arch-folder">components/</span> — 13 个组件</div>
              <div class="arch-item tree-animate indent">ChatPage · DiaryPage</div>
              <div class="arch-item tree-animate indent">MemoryPalace · WeatherEffects</div>
              <div class="arch-item tree-animate indent">NoteDrawer · SignalBadge</div>
            </div>
          </div>
        </div>
      </section>

      <!-- FOOTER / CTA -->
      <section class="remoire-footer">
        <div class="footer-bg-gradient"></div>
        <div class="footer-content">
          <div class="footer-actions">
            <a href="https://github.com/rebecha1227-a11y/remoire" target="_blank" class="remoire-github-btn">
              <span class="btn-text">View on GitHub</span>
              <span class="btn-arrow">→</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  `;
})(window);
