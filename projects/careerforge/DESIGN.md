# CareerForge — Design System
> 基于 careers.kimi.com/about-us 的视觉语言复刻

---

## 1. Visual Theme & Atmosphere

**复古像素 × 太空叙事 × 科技招聘**

Kimi 的招聘页不是一个传统的"关于我们"页面，而是一部**全屏沉浸式的交互电影**。整个页面以纯黑为底，像素化的太空流体视频作为背景，搭配像素字体和自定义复古光标，营造出一种**80 年代科幻终端**的氛围。

核心设计调性：
- **暗黑沉浸**：纯黑底 + 白色像素字体，无任何浅色背景区域
- **像素复古**：所有文字使用像素等宽字体，图片使用 `image-rendering: pixelated`
- **太空流体**：背景视频是像素化的太空粒子流动效果（WebM 格式）
- **全屏场景式**：每个"场景"占满视口高度，通过滚动切换
- **文字打字机效果**：标题文字有逐字符揭示的 shuffle 动画
- **自定义光标**：全套像素风格光标（默认、手指、文本、禁止、抓取等）

这种风格让人想起**太空探索类终端界面**——冷静、神秘、技术感十足，但又带着复古的温度。

---

## 2. Color Palette & Roles

### 核心色彩（暗色主题）

| 角色 | 色值 | 用途 |
|------|------|------|
| **背景** | `#000000` | 页面底色，纯黑 |
| **主文字** | `#FFFFFF` (100%) | 标题、核心信息 |
| **次要文字** | `rgba(255,255,255, 0.70)` | 描述文字 |
| **三级文字** | `rgba(255,255,255, 0.55)` | 辅助信息 |
| **品牌蓝** | `#1A88FF` | 交互元素、链接（暗色模式） |
| **强调绿** | `#32FF7D` | 成功、正面状态 |
| **警告红** | `#FF4756` | 错误、危险状态 |
| **中灰** | `#7A7A7A` | 分隔线、弱化元素 |
| **深灰** | `#4F4F4F` | 次级背景色 |
| **深底** | `#121212` | 暗色主题的一级背景 |
| **次深底** | `#1F1F1F` | 二级背景面 |
| **三级底** | `#292929` | 三级背景面、气泡 |

### 渐变

- **底部遮罩渐变**：`linear-gradient(to top, rgba(0,0,0,0.85), rgba(0,0,0,0.45), transparent)` — 用于视频上方的文字可读性
- 无彩色渐变文字（纯色文字 + 阴影营造深度）

### 文字阴影

| 效果 | 值 | 用途 |
|------|------|------|
| **重阴影** | `-4px 6px 0 #000` | 大标题，增加像素立体感 |
| **轻阴影** | `0 2px 0 #000` | 次要标题 |
| **按钮阴影** | `drop-shadow(0 4px 0 #000)` | 交互元素 |

---

## 3. Typography Rules

### 字体家族

| 用途 | 字体 | 说明 |
|------|------|------|
| **全站唯一字体** | `Fusion Pixel 12px Mono zh_hans` | 像素等宽字体，支持中日韩，OTF 格式 |
| **备选** | `monospace` | 降级方案 |

这是整个设计最独特的一点：**全站只用一种像素字体**。不分标题和正文字体，统一使用像素等宽体，靠字号和间距创造层次。

### 字号层级

| 层级 | 尺寸 | 行高 | 字间距 | 用途 |
|------|------|------|--------|------|
| **Hero 标题** | `clamp(2rem, 4.2vw, 3.25rem)` | 1.2 | — | 首屏大标题 |
| **场景标题** | `24px` | `32px` | `0.96px` | 各场景标题 |
| **副标题** | `22-23px` | `32px` | `0.72px` | 次级标题 |
| **正文大** | `18px` | `26px` | `0.56px` | 描述段落 |
| **正文中** | `16px` | `24px` | `0.48px` | 常规段落 |
| **正文小** | `14px` | `20px` | `0.36px` | 辅助文字 |
| **注解** | `12px` | `18px` | `0.32px` | 最小文字 |

### 字间距哲学

所有文字都有**明确的 letter-spacing**，范围从 `0.32px` 到 `0.96px`。这是因为像素字体在大尺寸下需要额外的字间距来保持可读性。字号越大，字间距越宽。

---

## 4. Component Stylings

### 导航栏

- **位置**：固定在顶部
- **背景**：透明（覆盖在视频上）
- **左侧**：Logo + "招聘" 文字
- **右侧**：文字导航链接（加入我们 / 关于我们 / 招聘流程）
- **文字颜色**：白色
- **Hover**：opacity 0.8
- **字体**：同全站像素字体

### Hero 区域

- **高度**：`100svh`（满视口）
- **背景**：像素化太空流体视频（pixel-flow.webm）+ 黑色底色
- **内容居中**：标题 "Build Your Own Job" 在视觉中心偏上
- **文字效果**：shuffle 逐字符揭示动画
- **下方**：两列对比（旧思维 → 新思维），中间有动画箭头
- **底部**：向下引导的像素图标 + "继续了解"

### 对比列表（Hero 中的 "旧→新" 转换）

```
左列（旧）          →        右列（新）
单一技能                      通用智能
过去履历                      进化速度
单线程努力          →         使用 AI Scale
我一直是对的                  追求真相的好奇
跟随共识的安全感              独立思考的审美
```

- 左列文字正常白色
- 箭头是带动画的虚线箭头
- 右列文字**加粗**
- 整体排版左右对齐，中间箭头

### 按钮

- **主按钮**：白色文字 + 透明背景 + 白色边框
- **Hover**：背景变白色，文字变黑色
- **Focus**：白色 outline，2px，offset 4px
- **过渡**：`duration-200 ease-in-out`

### 卡片

- **背景**：半透明深色 (`rgba(0,0,0,0.60)`)
- **圆角**：`10px`
- **无边框**（暗色上的暗色，靠透明度层次区分）
- **内边距**：`16px-24px`

### 文字 Shuffle 动画

这是最核心的动画组件。每个字符被包裹在一个 overflow:hidden 的容器里，通过 transform 实现逐字揭示：

```css
.shuffle-parent {
  white-space: normal;
  word-wrap: break-word;
  will-change: transform;
  visibility: hidden;       /* 初始隐藏 */
  line-height: 1;
  display: inline-block;
}
.shuffle-parent.is-ready {
  visibility: visible;      /* JS 准备好后显示 */
}
.shuffle-char-wrapper {
  vertical-align: baseline;
  display: inline-block;
  position: relative;
  overflow: hidden;          /* 裁剪字符动画 */
}
.shuffle-char-wrapper > span {
  will-change: transform;
  display: inline-flex;
}
.shuffle-char {
  text-align: center;
  line-height: 1;
  display: inline-block;
}
```

---

## 5. Layout Principles

### 全屏场景式布局

- **每个场景**占据 `100svh`（整个视口高度）
- **滚动方式**：`scroll-snap-type: x mandatory`（水平 snap 滚动）
- **overflow**：`hidden` on html/body + `touch-action: none`
- 这意味着页面不是传统的垂直滚动，而是**全屏横向场景切换**

### 容器宽度

| 断点 | 最大宽度 |
|------|----------|
| `sm` (40rem / 640px) | `40rem` |
| `md` (48rem / 768px) | `48rem` |
| `lg` (64rem / 1024px) | `64rem` |
| `xl` (80rem / 1280px) | `80rem` |
| `2xl` (96rem / 1536px) | `96rem` |

### 内容区域宽度

- 最大 `1400px` 或 `1120px` 或 `1000px`（视内容而定）
- 描述文字最大 `600px` 或 `620px`
- 居中对齐 `mx-auto`

### 间距系统

基于 Tailwind 的 `0.25rem` (4px) 基数：

| Token | 值 | 用途 |
|-------|------|------|
| `gap-2` | `8px` | 紧凑间距 |
| `gap-3` | `12px` | 小间距 |
| `gap-4` | `16px` | 标准间距 |
| `gap-6` | `24px` | 中等间距 |
| `gap-14` | `56px` | 大间距 |
| `gap-20` | `80px` | 超大间距 |
| `pt-24` | `96px` | 场景顶部内边距 |
| `pt-32` | `128px` | 大场景顶部内边距 |
| `pb-28` | `112px` | 场景底部内边距 |

---

## 6. Depth & Elevation

### 层级系统

没有使用传统的 box-shadow 层级。深度感通过以下方式创造：

1. **文字阴影**：`text-shadow: -4px 6px 0 #000` — 硬阴影，像素化的立体感
2. **drop-shadow**：`drop-shadow(0 4px 0 #000)` — 用于按钮/图标
3. **透明度层级**：背景色从 100% 黑到 60% 黑再到透明，形成深度
4. **渐变遮罩**：`from-black/85 via-black/45 to-transparent` 创造从下到上的渐隐
5. **z-index 层级**：从 z-0 到 z-9999，多达 15+ 个层级

### 表面处理

- 无 blur/backdrop-filter/glassmorphism
- 无圆角阴影卡片
- 深度完全靠**透明度**和**硬阴影**表达，保持像素风的干净

---

## 7. Interaction Patterns

### 自定义光标系统

完整的像素风光标套件：

| 状态 | 光标文件 |
|------|----------|
| 默认 | `retrosmart/default.png` |
| 指针/链接 | `retrosmart/pointer.png` |
| 文本选择 | `retrosmart/text.png` |
| 禁用 | `retrosmart/not-allowed.png` |
| 等待 | `retrosmart/wait.png` |
| 抓取 | `retrosmart/openhand.png` |
| 抓取中 | `retrosmart/closedhand.png` |
| 十字 | `retrosmart/crosshair.png` |
| 帮助 | `retrosmart/help.png` |
| 水平缩放 | `retrosmart/size-hor.png` |
| 垂直缩放 | `retrosmart/size-ver.png` |

### 过渡时序

| 时长 | 缓动 | 用途 |
|------|------|------|
| `100ms` | — | 快速状态反馈 |
| `150ms` | `ease-in-out` | 默认过渡（Tailwind 默认） |
| `200ms` | `ease-in-out` | 颜色/opacity 变化 |
| `250ms` | `ease-out` | 标准交互 |
| `300ms` | `ease-out` | 稍慢的过渡 |

### 招聘地图交互（SVG 动画）

地图上的射线效果有精心编排的动画序列：

```css
/* 射线淡入 → 射线揭示 → 端点弹出 */
hoverRayFade:     0.12s ease-out
hoverRayReveal:   0.62s cubic-bezier(.16,1,.3,1)  /* 快速减速 */
hoverRayDash:     0.36s ease-out
hoverRayGlow:     0.68s ease-out (0→95%→42% opacity)
hoverRayEndpoint: 0.26s cubic-bezier(.16,1,.3,1)
```

都使用 CSS `--land-on-ray-delay` 变量实现交错时序。

### Hover 效果

- **按钮**：背景白色 + 文字黑色反转
- **链接**：opacity 0.8
- **卡片**：scale(1.1) 放大
- **图片**：brightness(0.9)

### 3D 透视

- `perspective: 900px` — 用于卡片或场景切换的 3D 变换

---

## 8. Responsive Behavior

### 断点

| 名称 | 宽度 | 对应 |
|------|------|------|
| `sm` | `≥640px` | 手机横屏 / 小平板 |
| `md` | `≥768px` | 平板 |
| `lg` | `≥1024px` | 桌面 |
| `xl` | `≥1280px` | 大桌面 |
| `2xl` | `≥1536px` | 超大屏 |

### 移动端适配

- `max-md:` 前缀用于移动端专用样式
- 移动端视频背景居中裁切：`width: 128svh; height: 72svh; translate: -50% -50%`
- 文字尺寸在 `sm:` 断点放大（如 12px → 13px, 14px → 16px）
- 移动端场景有独立的宽高变量 (`--mobile-slide-width`, `--mobile-slide-height`)

---

## 9. Do's and Don'ts

### ✅ DO

- 使用纯黑 `#000` 作为背景，不要用深灰
- 全站统一像素等宽字体，靠字号和间距区分层级
- 用硬阴影（`text-shadow` 无 blur）保持像素感
- 用透明度分层而非 box-shadow
- 所有图片加 `image-rendering: pixelated`
- 保持 wide letter-spacing（0.3px-1px）
- 文字动画用逐字符 shuffle 效果
- Hover 用颜色反转（白→黑 或 黑→白）

### ❌ DON'T

- 不要用 blur、毛玻璃、渐变文字
- 不要用圆角卡片 + 柔和阴影（那是另一种审美）
- 不要混用多种字体
- 不要用浅色背景区域打断暗色沉浸感
- 不要用 bounce/elastic 缓动，保持 ease-out 的克制感
- 不要加太多颜色——主体是黑白，偶尔用品牌蓝点缀

---

## 10. Agent Prompt Guide

### 复刻 Hero 区域

> "全屏黑色背景，中心偏上放置像素等宽字体标题，字号 clamp(2rem, 4.2vw, 3.25rem)，白色，text-shadow: -4px 6px 0 #000。标题下方是两列对比文字（旧思维→新思维），中间有动画箭头。底部有向下引导的像素图标和'继续了解'文字。背景是缓慢流动的像素化粒子视频。"

### 复刻文字 Shuffle 动画

> "每个字符包在 overflow:hidden 的 inline-block 容器里，通过 transform: translateY 从下方滑入。stagger 0.03s，duration 0.4s。初始 visibility:hidden，JS 计算完位置后切换为 visible。"

### 复刻导航栏

> "固定顶部，透明背景，左侧 Logo，右侧 3-4 个文字链接，全部像素字体白色。hover 时 opacity 降到 0.8。无边框无阴影无毛玻璃。"

### 复刻按钮

> "像素字体白色文字，透明背景，1px 白色边框（用 ring 实现），hover 时背景变白文字变黑，过渡 200ms ease-in-out。focus-visible 有 2px 白色 outline + 4px offset。"

---

## 11. Key Assets & Technical Notes

### 关键资源

| 资源 | 说明 |
|------|------|
| `Fusion Pixel 12px Mono zh_hans` | 核心字体，OTF 格式，支持中文 |
| `pixel-flow.webm` | Hero 背景视频，像素化太空流体 |
| `retrosmart/*.png` | 全套像素光标图片（10+ 个） |
| `bg-about-us.png` / `bg-about-us-2.png` | 场景背景图 |

### 技术栈

| 技术 | 用途 |
|------|------|
| Next.js (App Router) | 框架 |
| Tailwind CSS v4 | 样式（使用 @layer 和 @property） |
| CSS Modules | 组件级样式隔离 |
| WebM Video | 背景动画 |
| SVG | 地图交互、图标 |
| CSS @keyframes | 射线动画 |
| JS (custom) | 文字 shuffle 动画 |

### 对 CareerForge 的适配建议

CareerForge 是你的作品集项目，不需要完全照搬 Kimi 的所有元素。建议重点复刻：

1. **暗色全屏场景式布局** — 每个板块占满视口
2. **像素字体** — 可以用 Fusion Pixel 或类似的中文像素字体
3. **文字 shuffle 动画** — 标题逐字揭示效果
4. **硬阴影文字** — text-shadow 无 blur
5. **自定义光标**（可选） — 增加趣味性
6. **黑白为主的色彩** — 偶尔用强调色点缀
7. **对比式文案** — 类似"旧→新"的转换叙事

可以不复刻的：
- 像素化视频背景（资源太重）
- SVG 地图交互（与 CareerForge 无关）
- 复杂的水平滚动场景系统（在 Archive Browser 里不适用）
