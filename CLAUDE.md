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

### 部署与构建
1. **Vercel 构建**：只设 `buildCommand: null` 不够，必须同时 `"framework": null`，否则检测到 `vite.config.js` 会自动用 Vite
2. **中文文件名导致部署失败**：Vercel 不支持中文路径。所有文件夹/文件名必须用英文（已全部改过：`字体/` → `fonts/`、`桌面图标/` → `icons/`、`背景图/` → `backgrounds/`、`项目展示 截图/` → `screenshots/`）

### CSS 布局
3. **absolute 元素居中**：`position: absolute` 的元素不能用 `margin: 0 auto`，用 `padding: 0 max(24px, calc(50% - Npx))` 代替
4. **dock 高度计算**：dock 是 `position: fixed` 浮在上面的，`.desktop` 的 height 不需要减去 dock 高度（减了会露出 body 灰色背景）
5. **窗口关闭用 display:none**：之前用 `opacity: 0` 关闭窗口会被移动端媒体查询的 `!important` 覆盖，必须用 `display: none`

### VHS Archive Browser
6. **滚动判断**：`scrollHeight > clientHeight` 不够，还要检查 CSS `overflow` 属性值是否为 `auto`/`scroll`
7. **Remoire 滚动**：Remoire 是长滚动页面，`.browser-content` 默认 `overflow: hidden` 会阻止滚动，需要 `:has(.remoire-page)` 规则设置 `overflow-y: auto`
8. **subnav 残留**：`_openBrowser()` 切换项目时不会自动重置 subnav，每个项目的 init 函数里必须手动重建 subnav 内容
9. **CRT 叠加层**：z-index 820 的 CRT 效果会遮挡内容，预览时可能需要隐藏
10. **磁带动画冲突**：GSAP motionPath 与 CSS `calc()` transform 冲突，磁带飞行/插入动画要注意

### 视觉与字体
11. **视频透明背景**：`mix-blend-mode: screen` 让黑色透明，但非纯黑背景会有色差，需要加 `mask-image: radial-gradient(...)` 淡化边缘
12. **像素字体不支持中文**：`Press Start 2P` 只有英文，中文会 fallback 成普通字体。中文像素字体可用 Fusion Pixel（喵闪字库），但字体文件很大（2.5MB+），注意加载超时
13. **混合语言字体栈**：中英混排时，把纯英文字体放在 `font-family` 最前面，中文字符会自动 fallback 到后面的中文字体
14. **弯引号污染**：某些编辑器/工具会把 HTML 里的直引号替换成 curly quotes（弯引号），会导致 HTML 属性失效。曾经一次性出现 218 处，需全局替换回直引号

### 文件与命名
15. **文件名拼写**：`backgrounds/biography-avartar.jpg`（avartar 不是 avatar），别改名
16. **中英切换内容成对**：`.lang-zh` / `.lang-en` 控制显隐，新增内容必须同时写中英两份，否则切换语言时出现空白

### 静儿的偏好（踩过的决策坑）
17. **dock 毛玻璃背景要保留**：静儿要去掉的是 dock 下方露出的 body 灰色背景，不是 dock 本身的毛玻璃效果
18. **Biography 不要方法论 tab**：静儿否决过 Methodology tab 和 Story 里嵌方法论卡片，要纯叙事
19. **时间线准确性**：2025 年初用的是 Cursor，Claude Code 是 2026 年才接触的，这两个工具时间不能搞混
