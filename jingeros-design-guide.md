# JingerOS 个人网站 — 设计分析与实现指南

> Connie 给静儿的全面分析 · 2026.06.17

---

## Part 1：设计文件的优点（你做得很好的地方）

**视觉定位精准且独特。** "被遗忘在 2002 年网吧角落的 CRT 显示器被 AI 唤醒后长出了现代灵魂"——这句话本身就是一个非常好的品牌叙事。千禧复古 × 像素 × 终端命令行的组合在设计师作品集圈子里辨识度极高，同时又和你的"AI Native Builder"定位完美匹配：复古外壳 + 现代灵魂 = 你这个人。

**色彩系统很成熟。** CRT 调色盘的命名方式不仅好记，功能分配也清晰。Terminal Gray 做底、Pixel Blue 做交互、Retro Pink 做强调——这个三角色关系很稳。ASCII Art 专用色也是一个细心的补充。

**字体层级清晰。** 像素字体做标题、等宽字体做命令、无衬线做正文，三种字体各司其职。"正文绝不用像素字体"这条规则说明你理解了可读性和风格之间的平衡。

**组件设计有画面感。** 用 ASCII art 画出的 wireframe（项目卡片的窗口样式、终端面板、iPod 界面）比任何抽象描述都直观。这份文档本身就是一个很好的"给 AI 的 prompt"。

**交互序列设计完整。** 开机流程从"页面加载 → CRT 启动 → 按 Enter → zoom into 屏幕 → JingerOS 桌面"的 step-by-step 描述，已经精细到可以直接作为开发 spec 了。

---

## Part 2：需要改进和优化的地方

### 2.1 最大问题：范围太大，缺乏 MVP 定义

你的设计文件描述了一个包含以下功能的网站：

- Three.js 3D 实时渲染场景（5 个 GLTF 模型 + 光照 + 阴影 + 相机控制）
- CSS3DRenderer 把 HTML 嵌入 3D 模型屏幕
- 全屏 Canvas ASCII Art 动态背景
- 完整的 JingerOS 窗口管理系统（拖拽、缩放、最小化、z-index）
- 真实可用的 iPod 音乐播放器
- 像素小人桌面宠物（sprite 动画 + AI 对话）
- Playground 游戏系统（打砖块、贪吃蛇等）
- 积分系统
- 斜杠命令系统
- 深色/浅色主题切换
- 完整的响应式适配

这里面**每一个单独拿出来都是一个中等复杂度的前端项目**。全部放在一起，对于一个专业前端开发者来说也需要 2-4 周的全职开发时间。对于依赖 AI 辅助的非开发者来说，风险在于：AI 能生成代码片段，但组装和调试 10+ 个复杂模块的协同工作是最难的部分。

**建议：** 定义三个层级的版本，先发布 V1，持续迭代。

### 2.2 性能预算缺失

Three.js 3D 场景 + Canvas ASCII 渲染 + GSAP 动画 + 多个嵌套 HTML 面板同时运行，在中低端设备上很可能卡顿。设计文件提到了"低端设备降级"但描述比较简略。

**建议补充：**
- 明确目标帧率（60fps 桌面 / 30fps 移动端）
- 3D 模型的多边形预算（建议总计 < 50K 三角面）
- 首屏加载时间目标（建议 < 3 秒，模型异步加载）
- Canvas ASCII 背景在移动端可以完全关闭而不只是"降低密度"

### 2.3 内容 vs 容器的失衡

设计文件 90% 的篇幅在描述"容器"（视觉风格、交互效果、动画），但对"内容"的描述很少。作品集网站的核心竞争力是你的项目案例，不是容器有多花哨。

**需要补充的内容板块：**
- 每个项目的 case study 模板（问题 → 过程 → 方案 → 结果）
- 项目截图/演示 GIF 的规格和风格指南
- About Me 的叙事结构（不只是 `$ whoami` 那三行）
- 简历/经历的具体呈现方式

### 2.4 可访问性（Accessibility）不够

设计文件提到了 `prefers-reduced-motion`，这很好，但还需要：
- ASCII 背景上的文字对比度是否达标（WCAG AA 4.5:1）
- 键盘导航路径（Tab 顺序、焦点状态）
- 屏幕阅读器的降级体验（3D 场景完全不可访问，需要 aria 替代文案）
- 命令行交互对不知道要"输入命令"的人来说门槛很高——备用路径要更明显

### 2.5 几个具体设计细节

**像素小人桌面宠物 + AI 对话功能有泄露 API 密钥的风险。** 如果要在静态网站上实现 AI 对话，要么后端代理，要么只做预设对话。GitHub Pages 是纯静态托管，没有后端。

**iPod 播放器的音乐版权问题。** 如果放自己喜欢的 MP3，公开网站上会有版权风险。建议用免费商用音乐或自己的 playlist（比如链接到 Spotify embed）。

**iPhone 4s 联系卡的信息层级。** 设计文件描述了外观但没有具体内容——邮箱、LinkedIn、GitHub、小红书的优先级是什么？哪些对目标用户（招聘方/合作者）最重要？

---

## Part 3：参考网站技术分析

### toddham.com

Todd Hamilton 的网站是一个 **React 单页应用**，特点是 3D 桌面场景：
- 使用 **React Three Fiber**（React 的 Three.js 封装）渲染 3D 场景
- 物件（MacBook、键盘、咖啡杯等）都是 GLTF 模型
- 鼠标移动时相机有微妙的视差跟随（不是旋转，是轻微位移）
- 物件可点击，跳转到不同内容区
- 背景是柔和的纯色渐变 + 环境光遮蔽
- **整体技术复杂度：高**（需要 3D 建模能力 + React + Three.js）

**你可以学习的点：** 视差效果的克制（只有 ±2° 的微调，不是大幅度旋转）。物件之间的间距和随意感（不是网格对齐）。

### daveos.fun

Diego Villarroel 的作品集，**100% 用 Framer 构建**（非手写代码）：
- 模拟 macOS 桌面系统，有 Dock 栏、可点击图标、窗口
- iPod 播放器组件（歌曲列表 + 播放控制）
- Calculator 计算器组件
- Finder 文件浏览器
- 图片 Gallery
- Terminal 终端
- 窗口有打开/关闭动画

**关键发现：** 它看起来像一个复杂的编程项目，实际上是 Framer 的组件 + 交互 + 覆盖层系统实现的。Framer 原生支持窗口弹出、拖拽模拟、状态切换等，不需要写 JS。

**你可以学习的点：** 功能的精简——DaveOS 的窗口不能真的拖拽和调整大小，它用的是 Framer 的 overlay（覆盖层）来模拟窗口打开/关闭。这大幅降低了实现复杂度，但用户感受差距不大。

### sethlukin.com

也是 **Framer 构建**：
- 像素风视觉设计（像素图标、复古 GIF 装饰）
- 滚动驱动的动画效果（文字渐入、marquee 滚动条）
- 技能标签的横向无限滚动（CSS marquee 效果）
- 作品集以大卡片形式展示，hover 有交互
- 底部有时间和地点的动态显示
- 整体比 DaveOS 简单很多，更像传统作品集 + 像素风装饰

**你可以学习的点：** 像素风的"点到为止"——Seth 没有让像素风格支配一切，而是把它作为点缀和装饰（小图标、分隔线的像素 GIF、标题字体），正文和大面积内容仍然用现代字体和布局。这让网站好看且可读。

---

## Part 4：实现路径对比与建议

### 路径 A：Framer（推荐给你）

| 维度 | 评估 |
|------|------|
| 学习曲线 | 低，可视化编辑器，类似 Figma |
| 能否实现你的设计 | 能实现 70-80%（窗口系统、iPod、导航、动画都可以） |
| 不能实现的部分 | Three.js 3D 实时场景、Canvas ASCII 背景、真实的拖拽窗口管理 |
| 部署 | Framer 自带托管，自定义域名 |
| AI 辅助 | Framer 支持自定义代码组件，复杂交互可以让 AI 写 |
| 迭代速度 | 很快，拖拽调整，实时预览 |
| 成本 | 免费版可用，Pro $20/月（自定义域名需要 Pro） |

### 路径 B：纯代码（Claude Code 辅助）

| 维度 | 评估 |
|------|------|
| 学习曲线 | 中高，即使 AI 写代码你也需要理解基本结构来 debug |
| 能否实现你的设计 | 理论上 100% 都能实现 |
| 风险 | 模块间的集成和调试是最大痛点，AI 对 Three.js 场景的调试能力有限 |
| 部署 | GitHub Pages 免费 |
| AI 辅助 | Claude Code 可以生成单个模块，但组装需要人工协调 |
| 迭代速度 | 慢，每次改动都要理解代码 |
| 成本 | 免费（除了 AI 订阅） |

### 路径 C：混合方案（我最推荐）

用 **Framer 做主体框架**（布局、导航、窗口系统、作品展示、响应式），把最酷的几个自定义交互用 **Framer 的 Code Component 功能** 实现（让 AI 帮你写 React 组件嵌入进去）。

这样你可以：
- 快速搭建 80% 的内容（Framer 可视化）
- 把精力集中在最有记忆点的 20% 交互上（ASCII 背景、CRT 开机效果、iPod 播放器）
- 随时调整布局而不用改代码
- 如果某个复杂效果搞不定，直接降级为 Framer 原生动画，体验不会崩

---

## Part 5：分阶段实现计划

### Phase 1 — MVP（1-2 周）—— 先让网站上线

**核心目标：** 一个能看、能用、有个性的作品集网站

包含：
- 首页 Hero 区域（像素字体大标题 + 终端风格自我介绍 + CRT 扫描线效果用 CSS 实现）
- 导航系统（斜杠命令样式，但实际是可点击的链接）
- 项目卡片（macOS Classic 窗口样式，2-3 个项目）
- About Me 页面（终端面板风格）
- Contact 页面（iPhone 4s 联系卡）
- Footer
- 响应式适配

**不包含（后续加）：** 3D 场景、ASCII Canvas 背景、iPod 播放器、像素小人、Playground、积分系统

### Phase 2 — 氛围增强（2-3 周）

- CRT 开机动画（CSS + JS 动画，不需要 Three.js）
- ASCII Art 静态装饰（SVG/CSS 实现的 ASCII 图案，不是 Canvas 实时渲染）
- 鼠标跟随的光晕效果（CSS + JS，成本很低但效果好）
- Hover 微交互（卡片抬起、标题栏变色、按钮按下效果）
- 深色/浅色主题切换

### Phase 3 — 杀手级功能（3-4 周）

- JingerOS 窗口系统（可以不支持拖拽，用 overlay 模拟）
- iPod 音乐播放器（HTML5 Audio + 自定义 UI）
- 斜杠命令系统（在终端窗口内输入命令）
- 滚动驱动动画（项目卡片依次弹出等）

### Phase 4 — 全部展开（持续迭代）

- Three.js 3D 桌面场景（如果技术上能搞定的话）
- Canvas ASCII 动态背景
- 像素小人桌面宠物
- Playground 小游戏
- 积分/彩蛋系统

---

## Part 6：给 AI 写代码时的 Prompt 策略

你不会写代码但需要 AI 帮你实现，这份 DESIGN.md 本身就是一个很好的 prompt 基础。但为了让 AI 输出更准确，建议：

### 6.1 每次只给一个模块

不要把整份 DESIGN.md 丢给 AI 说"帮我做"。拆成：
- "帮我做一个 CRT 开机效果的 CSS 动画，具体需求是……"
- "帮我做一个仿 macOS Classic 窗口样式的项目卡片组件，具体需求是……"

### 6.2 附上参考网站的具体截图

告诉 AI "我要像 daveos.fun 的 iPod 播放器那样的效果"比纯文字描述有效得多。在 Claude 里可以直接贴截图。

### 6.3 先要求输出 HTML+CSS 静态版本，再加 JS 交互

这样你可以先确认视觉效果对不对，再加交互逻辑。避免一次性生成太多代码导致难以 debug。

### 6.4 保持一个 Design Tokens 文件

把你的颜色、字体、间距等变量定义在一个 CSS Variables 文件里，每次给 AI 写新模块时都附上这个文件，确保风格一致。

---

## Part 7：从参考网站可以直接提取的实现 Specs

### CRT 开机效果（参考多个复古网站的通用模式）

```css
/* CRT 扫描线 — 覆盖在内容上方的伪元素 */
.crt-overlay::after {
  content: '';
  position: fixed;
  inset: 0;
  background: repeating-linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.03) 0px,
    rgba(0, 0, 0, 0.03) 1px,
    transparent 1px,
    transparent 2px
  );
  pointer-events: none;
  z-index: 9999;
}

/* CRT 开机：从一条亮线扩展到全屏 */
@keyframes crt-boot {
  0%   { clip-path: inset(50% 0); filter: brightness(3); }
  30%  { clip-path: inset(30% 0); filter: brightness(2); }
  60%  { clip-path: inset(10% 0); filter: brightness(1.3); }
  100% { clip-path: inset(0% 0);  filter: brightness(1); }
}

/* CRT 关机：压缩成一条线再消失 */
@keyframes crt-shutdown {
  0%   { clip-path: inset(0% 0);    filter: brightness(1); }
  60%  { clip-path: inset(45% 0);   filter: brightness(2); }
  80%  { clip-path: inset(49.5% 0); filter: brightness(3); }
  100% { clip-path: inset(50% 0);   filter: brightness(0); }
}
```

### macOS Classic 窗口样式（项目卡片）

```css
.window-card {
  border: 2px solid #808080;
  background: #F0EDE5;
  box-shadow:
    inset -1px -1px 0 #404040,
    inset 1px 1px 0 #DFDFDF,
    2px 2px 8px rgba(0,0,0,0.1);
}

.window-titlebar {
  background: linear-gradient(180deg, #B8B5AD 0%, #9E9B93 100%);
  padding: 4px 8px;
  display: flex;
  align-items: center;
  gap: 6px;
  border-bottom: 1px solid #808080;
  font-family: 'Chicago', 'Geneva', sans-serif;
  font-size: 12px;
  font-weight: bold;
}

/* 红黄绿三个窗口控制按钮 */
.window-btn {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 1px solid rgba(0,0,0,0.2);
}
.window-btn.close    { background: #FF5F57; }
.window-btn.minimize { background: #FFBD2E; }
.window-btn.maximize { background: #28CA41; }
```

### 终端打字机效果

```css
.typing-text {
  font-family: 'JetBrains Mono', monospace;
  overflow: hidden;
  border-right: 2px solid #5BBA6F; /* 绿色光标 */
  white-space: nowrap;
  animation:
    typing 2s steps(30) forwards,
    blink 0.8s step-end infinite;
}

@keyframes typing {
  from { width: 0; }
  to   { width: 100%; }
}

@keyframes blink {
  50% { border-color: transparent; }
}
```

### Windows 2000 风格按钮（3D 凸起效果）

```css
.retro-button {
  background: #D4D0C8;
  border: none;
  padding: 6px 16px;
  font-family: 'Tahoma', sans-serif;
  font-size: 11px;
  box-shadow:
    inset -1px -1px 0 #808080,
    inset 1px 1px 0 #FFFFFF,
    inset -2px -2px 0 #404040,
    inset 2px 2px 0 #DFDFDF;
  cursor: pointer;
}

.retro-button:active {
  box-shadow:
    inset 1px 1px 0 #808080,
    inset -1px -1px 0 #FFFFFF,
    inset 2px 2px 0 #404040,
    inset -2px -2px 0 #DFDFDF;
}
```

### 像素风标签

```css
.pixel-tag {
  font-family: 'Press Start 2P', monospace;
  font-size: 10px;
  padding: 4px 10px;
  background: #4A9EE5;
  color: #FFFFFF;
  border-radius: 2px;
  display: inline-block;
  image-rendering: pixelated;
}
```

### 鼠标跟随光晕

```javascript
// 低成本、高效果的鼠标跟随光晕
document.addEventListener('mousemove', (e) => {
  document.documentElement.style.setProperty('--mx', e.clientX + 'px');
  document.documentElement.style.setProperty('--my', e.clientY + 'px');
});
```

```css
body::before {
  content: '';
  position: fixed;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(232, 131, 155, 0.08) 0%,   /* --accent-pink */
    transparent 70%
  );
  left: var(--mx);
  top: var(--my);
  transform: translate(-50%, -50%);
  pointer-events: none;
  z-index: 1;
  transition: left 0.1s, top 0.1s;
}
```

### Marquee 技能滚动（参考 sethlukin.com）

```css
.marquee {
  overflow: hidden;
  white-space: nowrap;
}

.marquee-inner {
  display: inline-flex;
  gap: 24px;
  animation: scroll-left 20s linear infinite;
}

@keyframes scroll-left {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
```

---

## 附：给你的决策清单

开始动手前，先回答这几个问题：

1. **你愿意花时间学 Framer 吗？** 如果愿意（学习成本约 1-2 天），路径 C（Framer + 自定义代码组件）对你来说是最优解。如果不愿意学新工具，就走纯代码路线，但需要更强的 MVP 意识。

2. **你的项目案例内容准备好了吗？** 设计容器之前先准备好内容。至少 3 个项目的 case study（Remoire、小红书生成器、还有什么？），每个需要问题描述、方案、截图/GIF、结果/反思。

3. **你希望网站什么时候上线？** 如果是 2 周内，就做 Phase 1 的 MVP；如果是 1-2 个月，可以做到 Phase 2-3。

4. **你的目标用户是谁？** 招聘方？潜在合作者？设计/PM 社区？这决定了内容的侧重点和专业性。

5. **域名想好了吗？** jingerzhou.com？jinger.dev？这影响品牌调性。

---

*这份文档是 Connie 根据你的 DESIGN.md 和三个参考网站分析后整理的。随时问我任何细节，我们一步步把 JingerOS 做出来。* 💙
