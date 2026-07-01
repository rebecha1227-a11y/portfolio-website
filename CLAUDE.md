# JingerOS 个人作品集网站 — AI 协作文档

> **给 AI / 协作者的第一份文档。** 改代码前先读这里；视觉规范、文案规划见下方「文档地图」。

---

## 项目是什么

千禧复古 Mac OS 风格的**纯静态**个人作品集，两层体验：

1. **JingerOS 桌面**（`index.html`）— 窗口、dock、终端、Bio/Experience 等
2. **VHS Archive Browser**（`archive/`）— 点击 Projects 后全屏磁带柜 → 插带 → 浏览器壳里展示各项目独立页面

- **GitHub**：`rebecha1227-a11y/portfolio-website`
- **部署**：Vercel 项目 `jingeros`
- **构建**：无构建步骤；`vercel.json` 必须 `"framework": null`（否则 Vite 会被误检测）

---

## 本地预览

```bash
npx serve -l 3456 .
```

浏览器打开 `http://localhost:3456` → 双击 **Projects** 进入 Archive。

---

## 文档地图（各文件干什么、什么时候读）

| 文档 | 用途 | 何时读 |
|------|------|--------|
| **`CLAUDE.md`（本文件）** | 代码结构、文件 map、架构坑、协作约定 | **每次改代码前** |
| `DESIGN.md` | 桌面层视觉愿景 + 组件规范；含**未落地的开机 3D 场景**（键盘、像素小人亚克力立牌等） | 改桌面 UI / 查阅视觉方向；**勿删未实现章节** |
| `jingeros-design-system-v2.md` | VHS Archive 体验规范：磁带柜、CRT、Glitch、浏览器壳、时间轴 | 改 Archive 交互/动效 |
| `jingeros-content-plan-v2.md` | 全站文案、各项目叙事与 section 规划 | 写/改中英文案 |
| `jingeros-design-guide.md` | 早期设计评审 + MVP 分期；记录完整愿望清单（3D/Playground/积分等） | 评估范围；**保留原文，非删减版 spec** |
| `vhs-archive-implementation-prompt.md` | 初版 Archive 实现 prompt（**已过时**，文件名仍写 `second_version.html`） | 仅考古，以代码为准 |
| `projects/careerforge/DESIGN.md` | CareerForge 磁带页专属视觉说明 | 只改 CareerForge 页 |

---

## 设计文档 vs 当前实现（重要）

`DESIGN.md`、`jingeros-design-guide.md` 等**设计向文档**里，有大量**桌面开机前 / 未来迭代**的构想，例如：

- Three.js **3D 桌面场景**（复古电脑、独立键盘模型、CSS3D 屏幕）
- **像素小人亚克力立牌**（透明底座 + 立牌纹理、边缘高光）
- 全屏 **ASCII Art** 动态背景、访客积分、**Playground** 小游戏
- 像素小人桌面宠物、更重的游戏化彩蛋

**这些章节是刻意保留的设计资产，不是「写错了」或「过时废话」。**

| 原则 | 说明 |
|------|------|
| **改代码时** | 以 `index.html` / `archive/` **实际代码**为准，不要把设计文档当已实现功能 |
| **改文档时** | **不要删除**上述未落地构想；若已实现某条，可在 `CLAUDE.md` 或文档内标注「✅ 已做」 |
| **3D 资产** | `3D模型/` 目录存 GLTF 等模型，供日后 3D 场景用；**不要放进 Vercel 部署路径**（中文目录名） |

### 当前已实现（桌面层摘要）

| 已有 | 设计文档里仍保留、尚未做或仅部分做 |
|------|----------------------------------|
| JingerOS 窗口系统（Bio / Exp / Terminal / Contact / iPod / Playground 等窗口） | 开机 **3D 桌面场景** + 镜头推进动画 |
| Dock、菜单栏、语言切换、终端命令 | **像素小人亚克力立牌** 3D 摆件 |
| Projects → **VHS Archive** 全屏体验 | 独立 **3D 键盘** 模型交互 |
| ASCII/千禧视觉语言（字体、配色、窗口样式） | 全屏 Canvas **ASCII 背景**、积分系统 |
| — | Playground **完整游戏集**、桌面宠物 AI 对话 |

VHS Archive 与三盘完整磁带页（Remoire / CareerForge / Generator）**已上线**；FrenchQuest / Chatbox 仍为 placeholder。

---

## 代码架构总览

```
index.html                    ← 整站唯一 HTML：桌面 CSS/JS + 窗口 DOM + script 引入顺序
├── 桌面系统（内联 CSS/JS）    ← 窗口管理、终端、Bio、Experience、Dock…
├── archive/*.js              ← VHS Archive 运行时（磁带 → 浏览器）
├── projects/*/*-content.js   ← 各项目页面 HTML 字符串（注入浏览器壳）
├── archive/archive.css       ← Archive 壳 + 全部项目页样式
├── screenshots/*/            ← 项目截图（路径必须英文）
├── icons/ backgrounds/ fonts/ ← 桌面资源
└── vercel.json               ← 部署配置
```

**脚本加载顺序**（`index.html` 底部，顺序不能乱）：

1. GSAP + ScrollTrigger + MotionPath + Draggable（**jsDelivr CDN**）
2. `archive/audio-manager.js` → `particles.js` → `crt-effects.js` → `tape-physics.js` → `glitch-transition.js`
3. `projects/remoire/remoire-content.js`
4. `projects/careerforge/cf-content.js`
5. `projects/generator/generator-content.js`
6. `archive/archive.js`（读 global 上的 `*_PAGE_HTML_GLOBAL`，挂 `window.JingerArchive`）

---

## 关键文件地图

### 根目录

| 路径 | 用途 |
|------|------|
| `index.html` | 桌面全部 HTML/CSS/JS；引入 Archive 与项目 content |
| `vercel.json` | `framework: null`，跳过 Vite 构建 |
| `vite.config.js` | 存在但**生产不用**；勿删以免误触发 Vercel Vite |
| `jingeros-tokens.css` | 设计 token（若桌面有引用） |
| `package.json` | 项目元数据，无生产构建依赖 |

### `archive/` — VHS Archive 运行时

| 文件 | 用途 |
|------|------|
| `archive.js` | **核心**：状态机、磁带轮播、插带动画、`_openBrowser`、各项目 `_init*Animations`、placeholder 页 |
| `archive.css` | 磁带柜/CRT/浏览器壳样式 + **所有项目页**样式（`.remoire-page` `.cf-page` `.gen-page`…） |
| `tape-physics.js` | 磁带 3D 弧形轮播与拖拽 |
| `crt-effects.js` | CRT 预览、扫描线、磁带 hover 预览 |
| `glitch-transition.js` | 插带 → 浏览器 的 Glitch 过渡 |
| `audio-manager.js` | 音效（默认需用户启用） |
| `particles.js` | Archive 环境粒子 |

### `projects/` — 项目磁带内容

每个已上线项目一个文件夹，**导出 HTML 字符串**到 `window.*_PAGE_HTML_GLOBAL`：

| 目录 | 内容文件 | 全局变量 | Archive `projectId` | 状态 |
|------|----------|----------|---------------------|------|
| `remoire/` | `remoire-content.js` | `REMOIRE_PAGE_HTML_GLOBAL` | `remoire` | ✅ 完整长滚动页 |
| `careerforge/` | `cf-content.js` | `CAREERFORGE_PAGE_HTML_GLOBAL` | `careerforge` | ✅ 完整 section 切换页 |
| `generator/` | `generator-content.js` | `GENERATOR_PAGE_HTML_GLOBAL` | `generator` | ✅ 完整长滚动页 |
| `frenchquest/` | — | — | `frenchquest` | ⏳ placeholder（`buildPlaceholder`） |
| `chatbox/` | — | — | `chatbox` | ⏳ placeholder |

项目页字体/素材放在各自 `projects/<name>/` 下（如 Generator 的 `.ttf`）。

### 静态资源

| 路径 | 用途 |
|------|------|
| `icons/` | 桌面图标（原「桌面图标」） |
| `backgrounds/` | 壁纸等（原「背景图」） |
| `fonts/` | 全站字体（原「字体」） |
| `screenshots/<project>/` | 各项目截图（原「项目展示 截图」） |
| `favicons/` | 站点图标 |
| `3D模型/` | 3D 资产（键盘、电脑、iPod 等 GLTF；**未来 3D 桌面场景用**，中文目录名勿部署） |

---

## VHS Archive 行为要点

### 状态流（`archive.js`）

`CLOSED → OPENING → READY → FLYING → INSERTING → GLITCHING → BROWSING → RETURNING`

- 双击磁带 / 点击：` _playTape` → `_beginGlitch` → `_openBrowser(projectId)`
- 返回：` _returnToArchive` → 关机序列 → 回到磁带柜

### 滚动系统（`.browser-content`）

| 项目页类型 | 滚动方式 | CSS 要点 |
|------------|----------|----------|
| **Remoire** | 长滚动 | `.browser-content:has(.remoire-page) { overflow-y: auto }` |
| **Generator** | 长滚动 | `.browser-content:has(.gen-page) { overflow-y: auto; min-height: 0 }` |
| **CareerForge** | section 切换 | section `position: absolute`，一次一个 `.active`；**不用**原生长滚动 |
| **Placeholder** | 视实现而定 | 默认壳内滚动 |

- `handleWheel()` / `handleTouchMove()`：CareerForge 等用来切换 section；长滚动页要先判断 `overflow` 是否为 `auto/scroll` 且内容可滚
- 切换项目：`_openBrowser()` **不会**重置 subnav → 各 `_init*Animations` 里必须重建 subnav

### 项目动画 init（`_openBrowser` 内 `setTimeout 500ms`）

| projectId | 函数 | 清理事件 |
|-----------|------|----------|
| `remoire` | `_initRemoireAnimations()` | — |
| `careerforge` | `_initCareerForgeAnimations()` | — |
| `generator` | `_initGeneratorAnimations()` | `jingeros:generator-cleanup`（光标、ScrollTrigger、grain、lightbox） |

### Generator 页特别说明（近期迭代集中区）

- 自定义光标挂 **`document.body`**（祖先 `transform` 会破坏 `fixed`）
- Lightbox 卡片放大：打开时挂 `body`，GSAP FLIP 动画；`object-fit: contain`
- Section 标题水墨：`#genInkFilter` + ScrollTrigger per header
- 底部 CTA「试试看」：逐字动画，**滚动位置检测**（非底部 ScrollTrigger）；离开视口才 reset
- 中文模式：Generator 内 `.lang-zh` + `.lang-en` **同时显示**；`body.lang-en` 时只显示英文

---

## 桌面层要点（`index.html`）

- 窗口：`openWindow` / `closeWindow` / 拖拽缩放；关闭用 **`display: none`**（勿只用 `opacity`，移动端会被覆盖）
- Dock：`position: fixed` 浮层；`.desktop` 高度**不减** dock 高度（否则会露出 body 灰底）
- 语言：`body.lang-en` 切换；`.lang-zh` / `.lang-en` 成对出现
- Biography：**不要**方法论 tab（静儿否决过）；纯叙事

---

## 新增 / 修改项目页 Checklist

1. 建 `projects/<id>/<id>-content.js`，导出 `*_PAGE_HTML_GLOBAL`
2. 在 `index.html` 用 `<script src="projects/...">` 引入（在 `archive.js` **之前**）
3. `archive.js` → `_buildProjectPage` 增加分支；`_openBrowser` 如需动画则加 `_init*Animations`
4. 样式写入 `archive/archive.css`（按 `.xxx-page` 命名空间）
5. 截图放 `screenshots/<id>/`，**路径全英文**
6. 中英文案成对；参考 `jingeros-content-plan-v2.md`
7. `PROJECTS` 数组里已有磁带 id 则改 placeholder 为正式页

---

## 常见坑

### 部署

1. `vercel.json` 必须 `"framework": null`，仅有 `buildCommand: null` 不够
2. **禁止中文路径/文件名**用于部署资源（Vercel 会失败）
3. `dist/` 是旧构建产物，**生产不走 Vite**，以根目录静态文件为准

### CSS / 布局

4. `position: absolute` 居中：用 `padding: 0 max(24px, calc(50% - Npx))`，不用 `margin: 0 auto`
5. 窗口关闭：`display: none`
6. 弯引号污染：HTML 属性必须用直引号 `'` `"`（弯引号会导致属性失效）

### Archive

7. 滚动判断：看 `overflow` + `scrollHeight > clientHeight`
8. CRT 叠加层 z-index 820 可能挡内容
9. GSAP `motionPath` 与 CSS `calc()` transform 冲突（磁带动画）
10. `id="section-features"` 等在多项目重复 → 查询用 `.gen-page #section-...` 等作用域

### 视觉

11. `mix-blend-mode: screen` 非纯黑背景会色差 → 加 `mask-image` 淡化边缘
12. `Press Start 2P` 无中文；中文像素字用 Fusion Pixel（`fonts/fusion-pixel/`，体积大）
13. 混合字体栈：英文字体放前，中文自动 fallback

### 命名（勿改）

14. `backgrounds/biography-avartar.jpg`（拼写是 avartar）

### 静儿偏好

15. 保留 dock 毛玻璃；去掉的是 dock **下方**露出的 body 灰底
16. 时间线：2025 年初用 Cursor；Claude Code 是 **2026** 年才接触

---

## 技术栈速查

| 类别 | 选型 |
|------|------|
| 结构 | 单页 HTML + 多 JS 模块 |
| 动画 | GSAP 3.12（CDN）+ ScrollTrigger |
| 部署 | Vercel 静态 |
| 构建 | 无（`vite.config.js` 仅历史遗留） |

---

*最后更新：2026-07-01 — 补齐文件 map、文档索引、设计愿景保留说明、五盘磁带状态*
