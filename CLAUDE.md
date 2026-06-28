# JingerOS 个人作品集网站

## 项目概览

千禧复古 Mac OS 风格的个人作品集网站，纯静态前端（HTML/CSS/JS），部署在 Vercel。
- 线上地址：通过 Vercel `jingeros` 项目部署
- GitHub：`rebecha1227-a11y/portfolio-website`

## 技术栈

- **纯静态**：单页 `index.html` 包含桌面系统（窗口、dock、壁纸）
- **VHS Archive Browser**：全屏项目展示系统（`archive/` 目录），自定义滚动，非原生滚动
- **部署**：Vercel，`vercel.json` 设了 `"framework": null` 跳过 Vite 构建（虽然有 `vite.config.js`）
- **本地预览**：`npx serve -l 3456 .`（配置在 `.claude/launch.json`）
- **动画**：GSAP（从 `gsap-public/` 目录本地引入）

## 关键文件

| 文件 | 用途 |
|------|------|
| `index.html` | 整个网站的唯一页面，含桌面系统所有 HTML/CSS/JS |
| `archive/archive.js` | VHS Archive Browser 核心逻辑，滚动系统、项目切换 |
| `archive/archive.css` | Archive 所有样式，含各项目页面的样式 |
| `projects/*/` | 各项目的内容文件（`*-content.js` 导出 HTML 字符串） |
| `screenshots/*/` | 项目截图资源 |
| `vercel.json` | 部署配置，必须保持 `framework: null` |

## 架构要点

### VHS Archive Browser 滚动系统
- `archive.js` 的 `handleWheel()` 和 `handleTouchMove()` 控制 section 切换
- CareerForge 用 `position: absolute` 的 section，一次只显示一个 `.active`
- Remoire 是长滚动页面，`.browser-content` 需要 `overflow-y: auto`
- 每个项目在 `_openBrowser()` 时初始化，subnav 在各自的 init 函数里重置

### 中英双语系统
- 靠 `.lang-zh` / `.lang-en` class 控制显隐
- 新增内容必须同时写中英两份

### 字体
- CareerForge：系统默认字体
- Remoire：标题用 `Mieszkanie`，英文正文用 `Baby Doll`（字体文件在 `projects/remoire/`）

## 常见坑

1. **居中问题**：`position: absolute` 的元素不能用 `margin: 0 auto`，用 `padding: 0 max(24px, calc(50% - Npx))` 代替
2. **Vercel 构建**：只设 `buildCommand: null` 不够，必须同时 `"framework": null`，否则检测到 `vite.config.js` 会自动用 Vite
3. **滚动判断**：`scrollHeight > clientHeight` 不够，还要检查 CSS `overflow` 属性值
4. **CRT 叠加层**：z-index 820 的 CRT 效果会遮挡内容，预览时可能需要隐藏
5. **视频透明背景**：`mix-blend-mode: screen` + `mask-image: radial-gradient(...)` 组合使用
6. **文件名拼写**：`backgrounds/biography-avartar.jpg`（avartar 不是 avatar），别改名
