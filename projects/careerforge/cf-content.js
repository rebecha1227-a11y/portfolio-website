(function (global) {
  'use strict';

  const PLANET_SVGS = {
    'job-hunt': `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="28" fill="#5BA0E8" stroke="#3B7DD8" stroke-width="1.5"/>
      <ellipse cx="28" cy="26" rx="10" ry="9" fill="#7AB8F5" opacity="0.6"/>
      <circle cx="24" cy="22" r="4" fill="#B8DEFF" opacity="0.5"/>
      <ellipse cx="40" cy="42" rx="6" ry="5" fill="#3B7DD8" opacity="0.4"/>
      <circle cx="42" cy="18" r="3" fill="#2D6BC4" opacity="0.3"/>
      <path d="M12,30 Q20,28 28,32 Q36,36 52,33" stroke="#3B7DD8" stroke-width="1" fill="none" opacity="0.3"/>
    </svg>`,
    'resume-match': `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="28" fill="#F0B860" stroke="#C47A2E" stroke-width="1.5"/>
      <ellipse cx="28" cy="26" rx="10" ry="9" fill="#F5D080" opacity="0.6"/>
      <circle cx="24" cy="22" r="4" fill="#FFF0C0" opacity="0.5"/>
      <ellipse cx="38" cy="40" rx="7" ry="6" fill="#D4893A" opacity="0.4"/>
      <circle cx="44" cy="24" r="3.5" fill="#C47A2E" opacity="0.35"/>
      <ellipse cx="32" cy="32" rx="28" ry="6" fill="none" stroke="#C47A2E" stroke-width="1.2" opacity="0.35" transform="rotate(-15,32,32)"/>
    </svg>`,
    'resume-craft': `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="28" fill="#7DD48C" stroke="#4A9C58" stroke-width="1.5"/>
      <ellipse cx="26" cy="26" rx="11" ry="10" fill="#90E89C" opacity="0.6"/>
      <circle cx="22" cy="22" r="5" fill="#C0FFD0" opacity="0.45"/>
      <ellipse cx="40" cy="38" rx="5" ry="4" fill="#5AB068" opacity="0.4"/>
      <circle cx="38" cy="46" r="3" fill="#3D8A4A" opacity="0.3"/>
      <circle cx="46" cy="22" r="2.5" fill="#4A9C58" opacity="0.35"/>
    </svg>`,
    'cover-letter': `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="28" fill="#E87AA0" stroke="#B04A6C" stroke-width="1.5"/>
      <ellipse cx="27" cy="26" rx="10" ry="9" fill="#F08CB0" opacity="0.6"/>
      <circle cx="23" cy="22" r="4.5" fill="#FFD0E0" opacity="0.5"/>
      <ellipse cx="40" cy="40" rx="6" ry="5" fill="#C45A7C" opacity="0.4"/>
      <circle cx="18" cy="38" r="3" fill="#9C3C5C" opacity="0.3"/>
      <path d="M14,34 Q24,30 34,34 Q44,38 54,35" stroke="#C45A7C" stroke-width="0.8" fill="none" opacity="0.3"/>
    </svg>`,
    'mock-interview': `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="28" fill="#AD7DE8" stroke="#7A4AB0" stroke-width="1.5"/>
      <ellipse cx="27" cy="26" rx="10" ry="9" fill="#BF90F5" opacity="0.6"/>
      <circle cx="23" cy="22" r="4" fill="#E0D0FF" opacity="0.5"/>
      <ellipse cx="42" cy="38" rx="5" ry="4.5" fill="#8A5AC4" opacity="0.4"/>
      <circle cx="36" cy="46" r="3.5" fill="#6A3C9C" opacity="0.3"/>
      <circle cx="44" cy="20" r="2.5" fill="#7A4AB0" opacity="0.3"/>
    </svg>`,
    'offer-decision': `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="28" fill="#E8B860" stroke="#9C6A22" stroke-width="1.5"/>
      <ellipse cx="27" cy="26" rx="10" ry="9" fill="#F0C868" opacity="0.6"/>
      <circle cx="23" cy="22" r="4.5" fill="#FFF0C0" opacity="0.5"/>
      <ellipse cx="38" cy="42" rx="6" ry="5" fill="#C4903A" opacity="0.4"/>
      <circle cx="44" cy="26" r="3" fill="#B07A2E" opacity="0.35"/>
      <ellipse cx="32" cy="32" rx="28" ry="5" fill="none" stroke="#9C6A22" stroke-width="1" opacity="0.3" transform="rotate(-20,32,32)"/>
    </svg>`
  };

  const planetHTML = (skill, orbit, angle) => `
    <div class="cf-planet" data-skill="${skill}" data-orbit="${orbit}" data-angle="${angle}">
      <div class="cf-planet-body">${PLANET_SVGS[skill]}</div>
      <div class="cf-planet-tooltip">
        <strong>${{
          'job-hunt': 'Job Hunt',
          'resume-match': 'Resume Match',
          'resume-craft': 'Resume Craft',
          'cover-letter': 'Cover Letter',
          'mock-interview': 'Mock Interview',
          'offer-decision': 'Offer Decision'
        }[skill]}</strong>
        <span>${{
          'job-hunt': '智能岗位搜索与匹配，根据你的技能和偏好推荐最合适的职位。',
          'resume-match': '简历与 JD 深度对比分析，逐项匹配度评分，找出差距。',
          'resume-craft': 'AI 驱动的简历优化，针对目标岗位重写经历描述和关键词。',
          'cover-letter': '生成高度定制的求职信，结合岗位要求和个人经历。',
          'mock-interview': '模拟面试官提问，支持行为面试和技术面试，实时反馈。',
          'offer-decision': '多维度对比 Offer（薪资、文化、成长），帮你做出理性选择。'
        }[skill]}</span>
      </div>
    </div>`;

  global.CAREERFORGE_PAGE_HTML_GLOBAL = `
    <div class="cf-page">

      <!-- PARTICLE CANVAS (sits behind everything, spans full page) -->
      <canvas class="cf-particle-canvas" id="cf-particle-canvas"></canvas>

      <!-- HERO -->
      <section class="cf-hero cf-section" id="cf-section-hero">
        <div class="cf-hero-bg">
          <div class="cf-star-field" id="cf-star-field"></div>
        </div>
        <div class="cf-hero-content">
          <div class="cf-hero-eyebrow">OPEN SOURCE · AI SKILL TOOLKIT</div>
          <h1 class="cf-hero-title" id="cf-hero-title">CareerForge</h1>
          <p class="cf-hero-subtitle">6 AI Skills. One toolkit. Your entire job search, handled.</p>
          <p class="cf-hero-subtitle-zh">六个 AI 技能，一套工具包，覆盖求职全链路。</p>
          <div class="cf-hero-stats">
            <div class="cf-stat" data-count="137">
              <span class="cf-stat-value" id="cf-stat-stars">0</span>
              <span class="cf-stat-label">GitHub Stars</span>
            </div>
            <div class="cf-stat" data-count="50">
              <span class="cf-stat-value" id="cf-stat-platforms">0</span>
              <span class="cf-stat-label">AI Platforms</span>
            </div>
            <div class="cf-stat" data-count="6">
              <span class="cf-stat-value" id="cf-stat-skills">0</span>
              <span class="cf-stat-label">AI Skills</span>
            </div>
          </div>
        </div>
        <div class="cf-scroll-hint">
          <span class="cf-scroll-arrow">&#x2193;</span>
          <span class="cf-scroll-text">SCROLL TO EXPLORE</span>
        </div>
        <video class="cf-hero-video" autoplay muted loop playsinline>
          <source src="projects/careerforge/dithered_video.webm" type="video/webm">
        </video>
      </section>

      <!-- ORBIT SECTION -->
      <section class="cf-orbit-section cf-section" id="cf-section-orbit">
        <h2 class="cf-section-title" data-shuffle>Skill Galaxy</h2>
        <p class="cf-section-desc">每个技能都是一颗行星，围绕求职核心运转。悬停探索。</p>
        <div class="cf-orbit-stage">
          <div class="cf-orbit-container" id="cf-orbit-container">
            <svg class="cf-orbit-path" viewBox="-200 -100 400 200" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="0" cy="0" rx="170" ry="75" fill="none" stroke="rgba(255,255,255,0.25)" stroke-width="3" stroke-dasharray="4 4" shape-rendering="crispEdges"/>
            </svg>
            <div class="cf-orbit-center">
              <span class="cf-orbit-core-text">Career<br>Forge</span>
            </div>
            ${planetHTML('job-hunt', 1, 0)}
            ${planetHTML('resume-match', 1, 60)}
            ${planetHTML('resume-craft', 1, 120)}
            ${planetHTML('cover-letter', 1, 180)}
            ${planetHTML('mock-interview', 1, 240)}
            ${planetHTML('offer-decision', 1, 300)}
          </div>
        </div>
      </section>

      <!-- METRICS SHUFFLE SECTION -->
      <section class="cf-metrics-section cf-section" id="cf-section-metrics">
        <h2 class="cf-section-title" data-shuffle>By the Numbers</h2>
        <div class="cf-metrics-grid">
          <div class="cf-metric-card" data-count="137" data-suffix="+">
            <span class="cf-metric-number">0</span>
            <span class="cf-metric-label">GitHub Stars</span>
          </div>
          <div class="cf-metric-card" data-count="50" data-suffix="+">
            <span class="cf-metric-number">0</span>
            <span class="cf-metric-label">Compatible Platforms</span>
          </div>
          <div class="cf-metric-card" data-count="6">
            <span class="cf-metric-number">0</span>
            <span class="cf-metric-label">Specialized Skills</span>
          </div>
          <div class="cf-metric-card" data-count="100" data-suffix="%">
            <span class="cf-metric-number">0</span>
            <span class="cf-metric-label">Open Source</span>
          </div>
        </div>
      </section>

      <!-- SKILL DETAILS -->
      <section class="cf-skills-section cf-section" id="cf-section-skills">
        <h2 class="cf-section-title" data-shuffle>Deep Dive</h2>
        <p class="cf-section-desc">每个 Skill 的详细功能与实际效果。</p>

        <div class="cf-skill-detail" id="cf-skill-job-hunt">
          <div class="cf-skill-number">01</div>
          <div class="cf-skill-content">
            <div class="cf-skill-text">
              <h3 class="cf-skill-name">Job Hunt</h3>
              <p class="cf-skill-tagline">智能岗位搜索引擎</p>
              <p class="cf-skill-desc">不再盲目海投。Job Hunt 分析你的技能图谱和职业偏好，从海量岗位中精准匹配，按匹配度排序，附带申请策略建议。支持多平台岗位聚合，一次搜索覆盖全网。</p>
              <div class="cf-skill-tags"><span>Smart Matching</span><span>Multi-platform</span><span>Strategy Tips</span></div>
            </div>
            <div class="cf-skill-visual"><img src="screenshots/careerforge/job-hunt.png" alt="Job Hunt" loading="lazy"></div>
          </div>
        </div>

        <div class="cf-skill-detail" id="cf-skill-resume-match">
          <div class="cf-skill-number">02</div>
          <div class="cf-skill-content cf-reverse">
            <div class="cf-skill-text">
              <h3 class="cf-skill-name">Resume Match</h3>
              <p class="cf-skill-tagline">简历 x JD 深度对比</p>
              <p class="cf-skill-desc">把你的简历和目标岗位 JD 放在一起，AI 逐条分析匹配度。哪些经历是加分项、哪些关键词缺失、哪些地方需要补充——一目了然，不再靠感觉投简历。</p>
              <div class="cf-skill-tags"><span>Gap Analysis</span><span>Keyword Match</span><span>Score Report</span></div>
            </div>
            <div class="cf-skill-visual"><img src="screenshots/careerforge/match1.png" alt="Resume Match" loading="lazy"></div>
          </div>
        </div>

        <div class="cf-skill-detail" id="cf-skill-resume-craft">
          <div class="cf-skill-number">03</div>
          <div class="cf-skill-content">
            <div class="cf-skill-text">
              <h3 class="cf-skill-name">Resume Craft</h3>
              <p class="cf-skill-tagline">AI 简历重写工坊</p>
              <p class="cf-skill-desc">基于 Resume Match 的分析结果，AI 自动重写你的简历。不是简单润色，而是针对目标岗位重新组织经历、量化成果、优化关键词，输出可直接使用的定制版简历。</p>
              <div class="cf-skill-tags"><span>Targeted Rewrite</span><span>ATS-Optimized</span><span>PDF Export</span></div>
            </div>
            <div class="cf-skill-visual"><img src="screenshots/careerforge/demo-resume.png" alt="Resume Craft" loading="lazy"></div>
          </div>
        </div>

        <div class="cf-skill-detail" id="cf-skill-cover-letter">
          <div class="cf-skill-number">04</div>
          <div class="cf-skill-content cf-reverse">
            <div class="cf-skill-text">
              <h3 class="cf-skill-name">Cover Letter</h3>
              <p class="cf-skill-tagline">一键定制求职信</p>
              <p class="cf-skill-desc">根据你的简历和目标岗位 JD 自动生成高度个性化的 Cover Letter。不是模板填空，是真正理解你的经历后写出的有说服力的求职信，每一封都不一样。</p>
              <div class="cf-skill-tags"><span>Personalized</span><span>JD-Aligned</span><span>Multi-language</span></div>
            </div>
            <div class="cf-skill-visual"><img src="screenshots/careerforge/match2.png" alt="Cover Letter" loading="lazy"></div>
          </div>
        </div>

        <div class="cf-skill-detail" id="cf-skill-mock-interview">
          <div class="cf-skill-number">05</div>
          <div class="cf-skill-content">
            <div class="cf-skill-text">
              <h3 class="cf-skill-name">Mock Interview</h3>
              <p class="cf-skill-tagline">AI 模拟面试官</p>
              <p class="cf-skill-desc">扮演真实面试官，根据岗位 JD 和你的简历出题。支持行为面试（STAR 法则）和技术面试，每轮回答后给出详细反馈和改进建议。越练越好，面试不再慌。</p>
              <div class="cf-skill-tags"><span>Behavioral</span><span>Technical</span><span>Real-time Feedback</span></div>
            </div>
            <div class="cf-skill-visual"><img src="screenshots/careerforge/interview1.png" alt="Mock Interview" loading="lazy"></div>
          </div>
        </div>

        <div class="cf-skill-detail" id="cf-skill-offer-decision">
          <div class="cf-skill-number">06</div>
          <div class="cf-skill-content cf-reverse">
            <div class="cf-skill-text">
              <h3 class="cf-skill-name">Offer Decision</h3>
              <p class="cf-skill-tagline">多维度 Offer 对比</p>
              <p class="cf-skill-desc">拿到多个 Offer 不知道选哪个？Offer Decision 从薪资福利、公司文化、成长空间、通勤成本等维度全面对比，用数据辅助直觉，做出不后悔的选择。</p>
              <div class="cf-skill-tags"><span>Multi-dimensional</span><span>Data-driven</span><span>Comparison Matrix</span></div>
            </div>
            <div class="cf-skill-visual"><img src="screenshots/careerforge/offer.png" alt="Offer Decision" loading="lazy"></div>
          </div>
        </div>
      </section>

      <!-- CTA / FOOTER -->
      <section class="cf-cta-section cf-section" id="cf-section-cta">
        <div class="cf-cta-content">
          <h2 class="cf-cta-title" data-shuffle>Ready to Forge?</h2>
          <p class="cf-cta-desc">CareerForge 是完全开源的 Claude Code Skill 工具包。<br>在任何支持 AI Agent 的平台上即可使用。</p>
          <a class="cf-cta-btn" href="https://github.com/rebecha1227-a11y/CareerForge" target="_blank" rel="noopener">
            View on GitHub &#x2192;
          </a>
        </div>
      </section>

    </div>
  `;

})(window);
