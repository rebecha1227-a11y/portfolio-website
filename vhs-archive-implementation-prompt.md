# VHS Archive Experience — AI Design Tool Implementation Prompt

> ⚠️ **历史文档**：写于 Archive 初版实现前，文中 `second_version.html` 已合并为根目录 `index.html`。  
> **以当前代码为准** → [`CLAUDE.md`](./CLAUDE.md) · [`archive/archive.js`](./archive/archive.js)

## 文档目的

这份 prompt 是给设计类 AI 工具（如 Cursor、v0、Bolt、Windsurf 等）的精确指令。目标是在现有的 Jinger OS 作品集网站基础上，实现"项目展示"板块的 VHS Archive 交互体验。

---

## CONTEXT — 现有网站状态

你正在修改的是一个已完成的单页 HTML 网站 `second_version.html`。该网站模拟了一个 macOS 经典桌面操作系统，包含以下已完成的功能模块：

**保留不动的部分：**
- Menu Bar（顶部，28px 高，macOS Platinum 风格）
- Desktop Area（壁纸 + hero 文字 + 桌面图标）
- Desktop Icons（Bio.app、Exp.app、Projects.app、Terminal、Playground，可拖拽）
- Window System（可拖拽、可缩放、可最小化/最大化/关闭的窗口组件）
- Dock Bar（底部，68px 高，macOS 风格）
- Terminal Window（完整的命令行模拟，已实现 help、whoami、ls 等命令）
- Bio Window、Experience Window、Contact Window（iPhone 4s 模拟器）
- 所有 CSS 变量和字体加载
- 窗口管理 JS（拖拽、缩放、z-index 管理、Genie 最小化动画）

**需要替换的部分：**
- 当前的 `win-projects` 窗口（Finder 风格的项目画廊 + 项目详情视图）
- 将被 VHS Archive 全屏体验替换

**需要新增的部分：**
- VHS Archive 全屏叠加层
- CRT 电视组件
- 5个 VHS 磁带组件
- Glitch 过渡动画系统
- 浏览器框架（Chrome Shell）组件
- 音频系统
- 5个项目独立网站页面

---

## TASK — 精确实现以下交互流程

### STEP 1: Desktop → Archive Transition

**触发方式：**
当用户双击桌面上的 `Projects.app` 图标、点击 Dock 中的 Projects 按钮、或在 Terminal 输入 `/projects` 时触发。

**具体实现：**

```
创建一个全屏覆盖层 div#vhs-archive-overlay，初始 display:none。
触发时：
  1. overlay 变为 display:flex，背景色 rgba(10,10,15,0)
  2. 背景色 transition 到 rgba(10,10,15,0.85)，duration 600ms，ease-out
  3. 所有 .desktop-icon 元素添加 filter:blur(7px) + opacity:0.4，transition 500ms
  4. #dock 元素添加 opacity:0.5，所有动画暂停
  5. 延迟 300ms 后，CRT 电视从底部 translateY(100vh) 移动到最终位置 translateY(0)
     - 最终位置：垂直居中偏下 10%（center + 10vh offset）
     - 动画：cubic-bezier(0.16, 1, 0.3, 1), 800ms
     - 到达后有 8px 的 overshoot bounce（200ms 回弹）
  6. CRT 屏幕点亮序列：
     - 中央出现 2px 高的水平白线，width 从 0 扩展到 100%（150ms）
     - 白线纵向扩展填满屏幕（200ms）
     - 背景色渐变为深绿色 #0a1a0a
     - 叠加扫描线 CSS（repeating-linear-gradient，2px 间距）
     - 显示文字 "-- VHS ARCHIVE --" 和 "SELECT A TAPE"
     - 字体 'Press Start 2P'，颜色 #33CC55，居中
  7. 5盘磁带依次飞入：
     - 每盘间隔 80ms
     - 从 CRT 两侧外部飞入到弧形位置
     - 使用 cubic-bezier(0.34, 1.56, 0.64, 1) 带轻微弹性
     - 最终排列：135° 弧形，CRT 在弧底中央
```

### STEP 2: VHS Archive Scene — Static Layout

**CRT 电视 HTML 结构：**
```html
<div class="crt-television">
  <div class="crt-body">
    <!-- 外壳：深灰色塑料质感 -->
    <div class="crt-screen-frame">
      <div class="crt-screen">
        <!-- 屏幕内容区域 -->
        <div class="crt-scanlines"></div>
        <div class="crt-noise"></div>
        <div class="crt-vignette"></div>
        <div class="crt-content">
          <!-- 待机文字或预览画面 -->
        </div>
      </div>
    </div>
    <div class="crt-slot"><!-- VHS 插槽 --></div>
    <div class="crt-power-led"></div>
    <div class="crt-brand">JingerOS</div>
  </div>
</div>
```

**CRT 电视 CSS 关键样式：**
```css
.crt-television {
  width: clamp(320px, 38vw, 520px);
  position: relative;
}

.crt-body {
  background: linear-gradient(145deg, #3a3a3a 0%, #2a2a2a 50%, #1f1f1f 100%);
  border-radius: 16px;
  padding: 20px;
  box-shadow:
    0 20px 60px rgba(0,0,0,0.6),
    inset 0 1px 0 rgba(255,255,255,0.08),
    inset 0 -2px 0 rgba(0,0,0,0.3);
  /* 模拟注塑成型塑料的微弱纹理 */
}

.crt-screen {
  aspect-ratio: 4/3;
  background: #0a0a0a;
  border-radius: 12px / 16px; /* 弧面屏幕 */
  overflow: hidden;
  position: relative;
  /* 桶形畸变 */
  box-shadow:
    inset 0 0 80px rgba(0,40,0,0.15),
    inset 0 0 4px rgba(0,0,0,0.8);
}

.crt-scanlines {
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    to bottom,
    transparent 0px,
    transparent 2px,
    rgba(0,0,0,0.15) 2px,
    rgba(0,0,0,0.15) 4px
  );
  pointer-events: none;
  z-index: 10;
}

.crt-noise {
  position: absolute;
  inset: 0;
  opacity: 0.06;
  /* 使用 CSS animation 或 canvas 生成动态噪点 */
  animation: noise 0.5s steps(8) infinite;
  pointer-events: none;
  z-index: 11;
}

.crt-vignette {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse at center,
    transparent 50%,
    rgba(0,0,0,0.4) 100%
  );
  pointer-events: none;
  z-index: 12;
}

.crt-slot {
  width: 60%;
  height: 6px;
  margin: 12px auto 0;
  background: #111;
  border-radius: 2px;
  box-shadow: inset 0 2px 3px rgba(0,0,0,0.5);
}

.crt-power-led {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #33CC55;
  box-shadow: 0 0 6px #33CC55;
  position: absolute;
  bottom: 12px;
  right: 24px;
}
```

**VHS 磁带 HTML 结构（每盘磁带一个实例）：**
```html
<div class="vhs-tape" data-project="remoire" data-index="0">
  <div class="tape-body">
    <div class="tape-window">
      <!-- 透明窗口，里面可见磁带卷轴 -->
      <div class="tape-reel tape-reel-left"></div>
      <div class="tape-reel tape-reel-right"></div>
      <div class="tape-specular"></div>
    </div>
    <div class="tape-label">
      <span class="tape-number">01</span>
      <span class="tape-title">REMOIRE</span>
      <span class="tape-action">PLAY ▶</span>
      <span class="tape-format">VHS</span>
    </div>
    <div class="tape-screws">
      <span class="screw"></span>
      <span class="screw"></span>
    </div>
  </div>
</div>
```

**VHS 磁带 CSS 关键样式：**
```css
.vhs-tape {
  width: clamp(120px, 14vw, 180px);
  cursor: pointer;
  transition: transform 0.3s cubic-bezier(0.25, 1, 0.5, 1),
              filter 0.3s ease;
  will-change: transform;
  position: absolute;
  /* 各磁带的 top/left 通过 JS 计算弧形位置 */
}

.tape-body {
  aspect-ratio: 188/120; /* 标准 VHS 比例 */
  background: linear-gradient(145deg, #2a2a2a, #1a1a1a);
  border-radius: 4px;
  padding: 8px;
  position: relative;
  box-shadow:
    0 4px 12px rgba(0,0,0,0.4),
    inset 0 1px 0 rgba(255,255,255,0.05);
  /* 每盘磁带的背景色在 data-project 对应的 CSS 类中覆盖 */
}

/* Remoire 专属色 */
.vhs-tape[data-project="remoire"] .tape-body {
  background: linear-gradient(145deg, #F0EDE5, #E0DDD5);
}
.vhs-tape[data-project="remoire"] .tape-label {
  color: #1B4332;
}

/* CareerForge 专属色 */
.vhs-tape[data-project="careerforge"] .tape-body {
  background: linear-gradient(145deg, #D4A017, #B8890F);
}

/* French Quest 专属色 */
.vhs-tape[data-project="frenchquest"] .tape-body {
  background: linear-gradient(145deg, #FAF3E0, #E8DCC8);
}
.vhs-tape[data-project="frenchquest"] .tape-label {
  color: #2D5F8A;
}

/* Chatbox 专属色 */
.vhs-tape[data-project="chatbox"] .tape-body {
  background: linear-gradient(145deg, #1A1A1A, #0D0D0D);
}
.vhs-tape[data-project="chatbox"] .tape-label {
  color: #FF6B9D;
}

/* Generator 专属色 */
.vhs-tape[data-project="generator"] .tape-body {
  background: linear-gradient(145deg, #B8B8B8, #9A9A9A);
}

.tape-window {
  width: 55%;
  height: 35%;
  margin: 0 auto;
  background: rgba(40, 35, 30, 0.6);
  border-radius: 3px;
  border: 1px solid rgba(0,0,0,0.3);
  position: relative;
  overflow: hidden;
}

.tape-specular {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    transparent 30%,
    rgba(255,255,255,0.08) 45%,
    transparent 55%
  );
  pointer-events: none;
  /* 高光位置通过 JS 跟随鼠标位置动态更新 */
  transition: background-position 0.1s ease;
}

.tape-label {
  font-family: 'Press Start 2P', monospace;
  font-size: 7px;
  padding: 6px;
  position: relative;
}

.tape-number {
  position: absolute;
  top: 4px;
  right: 6px;
  font-size: 9px;
  opacity: 0.6;
}

.tape-title {
  display: block;
  font-size: 8px;
  letter-spacing: 1px;
  margin-bottom: 2px;
}

.tape-action, .tape-format {
  font-size: 5px;
  opacity: 0.5;
}
```

### STEP 3: Tape Hover Interaction

**使用 JavaScript 实现以下交互行为：**

```javascript
// 伪代码描述：

每盘 VHS 磁带需要以下 hover 行为：

1. 磁力吸附场：
   - 监听 mousemove 事件
   - 计算鼠标与磁带中心的距离
   - 如果距离 < 120px（吸引半径）：
     - 磁带向鼠标方向偏移，偏移量 = (120-距离)/120 * 8px
     - 使用 requestAnimationFrame 平滑更新
     - 偏移应用在 transform: translate() 上
   - 如果距离 > 120px：
     - 磁带回到原位，使用 spring animation（k=300, damping=25）

2. Hover 触发（鼠标进入磁带区域）：
   - transform: translateY(-12px) rotateX(2deg) rotateY(基于鼠标X偏移的值deg)
   - box-shadow 增强：0 12px 24px rgba(0,0,0,0.5)
   - .tape-specular 的 background-position 跟随鼠标位置
   - .tape-reel 元素添加微弱旋转动画（模拟内部磁带轻微转动）
   - 过渡时间：300ms

3. CRT 预览同步：
   - 通知 CRT 组件切换到该项目的预览模式
   - CRT 先显示 50ms 的白噪声帧
   - 然后以 5fps 播放该项目的预览帧序列
   - 预览帧叠加 CRT 效果（扫描线、噪点、暗角、RGB偏移1px）

4. Hover 离开：
   - 所有 transform 回到初始值
   - box-shadow 恢复
   - CRT 先显示 50ms 白噪声
   - 如果没有其他磁带被 hover，CRT 回到待机文字
```

### STEP 4: Tape Click → Insertion Animation

```
当用户点击一盘磁带：

1. 锁定系统：
   - 设置全局状态 isPlaying = true
   - 禁止所有其他磁带的交互
   - 其他 4 盘磁带 → opacity:0.25, scale:0.95, transition 300ms
   - Archive overlay 背景加深到 rgba(5,5,8,0.9)

2. 贝塞尔曲线飞行（500-600ms）：
   - 计算磁带当前位置到 CRT 插槽位置的路径
   - 不使用直线。使用 CSS motion-path 或 JS 计算的贝塞尔曲线
   - 曲线应该先向上微微弧起，然后俯冲向 CRT
   - 同时旋转磁带 90°，使短边对准插槽
   - 速度 ease-out：接近 CRT 时减速

3. 停顿（250ms）：
   - 磁带停在插槽前方 5px 处
   - 画面完全静止
   - 这个停顿创造期待感

4. 插入（200ms）：
   - 磁带向前滑入最后 5px
   - 运动曲线：慢→快→突停
   - 到位瞬间 CRT 整体 translate(0, 1px) 抖动 80ms 后回弹
   - 如果声音开启：播放机械卡扣音效

5. 磁带消失：
   - 磁带 opacity→0 + scaleY→0（从中间压扁消失），200ms
   - 模拟磁带被完全吸入 CRT 内部
```

### STEP 5: Glitch / Signal Reconstruction (The Big Bang)

```
总时长 1.8 秒。使用 CSS animations + canvas/WebGL 实现。

这是整个网站最关键的视觉时刻。必须精确实现。

Phase 1 — Ignition（0ms - 300ms）：
  - CRT 屏幕 background 从 #0a0a0a 闪为 #ffffff（50ms）
  - 然后回落到不稳定的闪烁状态
  - CRT 的 box-shadow 增大：0 0 60px rgba(200,255,200,0.3)（模拟光照射到周围环境）
  - 扫描线宽度从 2px 增加到 4px
  CSS: animation: ignition-flash 0.3s steps(6) forwards;

Phase 2 — H.Tearing（300ms - 600ms）：
  - 屏幕内容被水平切割成 8-12 条横向条带
  - 每条条带随机水平偏移 -20px 到 +20px
  - 偏移值每 50ms 随机变化
  - 整体画面垂直抖动 ±5px
  CSS: 使用 clip-path 或多个 div 模拟条带错位

Phase 3 — RGB Split（600ms - 900ms）：
  - 屏幕内容复制为 3 层（R、G、B）
  - 红色层：mix-blend-mode: screen, 向左偏移 4px
  - 蓝色层：mix-blend-mode: screen, 向右偏移 4px
  - 绿色层：保持中心但垂直抖动 ±3px
  - 此阶段隐约闪过目标项目的截图（opacity 0.3-0.5，每次持续 60ms）
  CSS: 使用 ::before 和 ::after 伪元素 + translateX + 色彩滤镜

Phase 4 — Snow Storm（900ms - 1200ms）：
  - 全屏白噪声覆盖
  - 使用 canvas 绘制随机像素噪声，每帧更新
  - 间歇性闪过项目画面（每 100ms 出现一次，持续 50-80ms）
  - 噪声 opacity 从 1.0 逐渐降到 0.3
  - 最后 50ms 画面突然清晰

Phase 5 — Screen Expand（1200ms - 1800ms）：
  - CRT 的屏幕内容区域开始超出 .crt-screen 边界
  - 实现方式：移除 overflow:hidden，然后 scale 从 1 扩大到覆盖整个 viewport
  - 同时 .crt-body（电视外壳）opacity→0
  - 同时 .crt-scanlines opacity 从 1→0
  - 同时 .crt-noise opacity 从 0.06→0
  - 同时 .crt-vignette opacity 从 1→0
  - 所有其他 Archive 元素（其他磁带、粒子）opacity→0
  - 扩展曲线：cubic-bezier(0.55, 0.085, 0.68, 0.53) 前半段 + cubic-bezier(0.25, 0.46, 0.45, 0.94) 后半段
  - 最后 100ms 快速填满整个 viewport

  最终状态：整个屏幕被项目内容填满，所有 CRT 效果消失。
```

### STEP 6: Browser Shell Appearance

```
Glitch 结束后，浏览器框架组件出现：

1. 浏览器顶部 chrome 栏从 translateY(-40px) + opacity:0 滑入到位
   - 高度：36px
   - 背景：#F5F5F5
   - 底部边框：1px solid #DDD
   - duration: 200ms, ease-out

2. 地址栏内容逐字打出：
   - "jingeros://projects/" + 项目名
   - typewriter 效果，每字符 20ms
   - 字体：系统等宽字体

3. 红黄绿按钮从 scale:0 弹出到 scale:1
   - 每个间隔 50ms
   - cubic-bezier(0.34, 1.56, 0.64, 1)

4. 子导航栏淡入
   - 文字：ABOUT · PROCESS · GALLERY · IMPACT
   - opacity 0→1, duration 200ms

5. 项目内容从下方淡入上升
   - translateY(20px) + opacity:0 → translateY(0) + opacity:1
   - duration 400ms, ease-out

整个浏览器框架的运动感应该是数学般精确的。
不弹跳。不抖动。不 glitch。
浏览器属于数字世界，它的运动是对之前模拟混乱的对比。
```

### STEP 7: Return to Archive (Power Off)

```
触发：点击浏览器左上角红色按钮或 "← Back to Archive" 链接。

1. 项目内容 fade-down + opacity→0（200ms）

2. 浏览器框架向 CRT 位置收缩
   - transform: scale(1) → scale(0.3)，同时 translate 到 CRT 中心位置
   - duration: 400ms, ease-in

3. CRT 重新出现，显示项目最后一帧（带扫描线）
   - 持续 300ms（确认帧）

4. CRT 关机序列：
   - 画面亮度压缩为中央水平白线
     width: 100% → height 从屏幕高度压缩到 2px（200ms）
   - 白线从两端收缩到中心点（150ms）
   - 中心白点闪烁 2 次后消失（100ms）
   - 屏幕变黑

5. 机械声（如果声音开启）
   - 150ms 后磁带弹出

6. 磁带从插槽弹出 20px
   - 然后沿原飞行路径的反向贝塞尔曲线飞回原位
   - duration: 500ms

7. 其他磁带恢复 opacity:1 + scale:1
   - Archive overlay 亮度恢复
   - 粒子和环境动画恢复
   - CRT 回到待机状态

8. 所有磁带重新可交互
```

---

## AMBIENT EFFECTS — 环境粒子系统

```
使用 <canvas> 覆盖在 Archive 场景上方。

粒子规格：
- 数量：6-10 个
- 大小：1-3px 圆形
- 颜色：rgba(255, 255, 255, opacity)
- opacity 范围：0.1 - 0.25
- 运动速度：0.2 - 0.6 px/frame
- 运动方向：主要水平向右，带轻微上下漂移（sin 波形）
- 粒子到达右侧边界时从左侧重新出现
- z-index 在 CRT 和磁带之间

不要过度——这些粒子的存在应该是潜意识级别的。
如果用户需要刻意寻找才能看到，那就对了。
```

---

## SOUND SYSTEM — 音频管理

```
默认静音。

首次 hover 到任何磁带时，在 CRT 屏幕右下角显示：
  "🔇 Click for sound"
  font-size: 10px, opacity: 0.6
  点击后切换为 "🔊" 图标

使用 Web Audio API。
所有音效文件 < 100KB。
使用 mp3 或 ogg 格式。

音效列表（需要准备的音频文件）：
- crt-power-on.mp3 (800ms)
- tape-hover-hum.mp3 (loop, 持续)
- tape-flight-whoosh.mp3 (500ms)
- tape-insert-click.mp3 (200ms)
- glitch-electrical.mp3 (300ms)
- glitch-static.mp3 (600ms)
- glitch-snow.mp3 (300ms)
- browser-digital-rise.mp3 (300ms)
- crt-power-off.mp3 (500ms)
- tape-eject-spring.mp3 (150ms)
```

---

## RESPONSIVE — 响应式规则

```
桌面端（>1024px）：
  完整 VHS Archive 体验。所有物理交互、3D 效果、声音设计、粒子效果。

平板端（768-1024px）：
  - CRT 和磁带尺寸按 0.7 倍缩放
  - 磁带排列改为 2 行（3+2 或 2+3）而非弧形
  - 保留 CRT 预览
  - 粒子数量减半
  - Glitch 过渡简化为 3 阶段（跳过 H.Tearing 和 RGB Split，直接 Snow → Expand）

移动端（<768px）：
  不使用 VHS Archive。替换为：
  - 全屏暗色背景
  - 标题 "-- VHS ARCHIVE -- SELECT A TAPE" 顶部显示
  - 5 张竖向排列的 VHS 风格卡片
  - 每张卡片保留磁带标签视觉（编号、标题、标签纸质感）
  - 点击卡片：简化过渡（扫描线 overlay 0.5s → 项目页面滑入）
  - 无 CRT 电视、无飞行动画、无贝塞尔曲线
  - 返回：顶部返回按钮 + 左滑手势
```

---

## VISUAL REFERENCES — 视觉参考

动画与交互参考（风格而非复制）：
- HBO Westworld 片头的 CRT glitch 美学
- The Last of Us 片头的信号重建感
- Netflix 加载动画的电子质感
- Sony Trinitron 14寸电视的外形
- Panasonic NV 系列 VHS 播放器的插槽设计
- 90年代 VHS 磁带的真实质感（透明窗口、纸质标签、塑料外壳）

设计风格参考：
- Awwwards 年度最佳网站级别的动画流畅度
- 物理交互参考：Apple Vision Pro 空间界面的重量感
- 材质渲染参考：Teenage Engineering 产品页面的塑料质感

---

## CRITICAL CONSTRAINTS — 关键约束

1. **性能：** 所有动画必须运行在 30fps 以上。使用 transform 和 opacity 做动画，不改变 layout 属性。
2. **无障碍：** 提供 `prefers-reduced-motion` 媒体查询的降级版本（直接切换，无过渡动画）。
3. **渐进增强：** 如果 WebGL 不可用，Glitch 效果降级为 CSS-only 版本。
4. **首屏性能：** Desktop 优先加载。Archive 资源后台预加载。
5. **Archive 总资源预算：** < 5MB（包括预览帧图片、音效、CRT/磁带贴图）。
6. **动画：** 推荐使用 GSAP（gsap.min.js + MotionPathPlugin + ScrollTrigger 按需加载）作为动画引擎。 这个项目的时间轴编排和物理路径动画复杂度需要专业的动画库支持。不要引入其他额外的动画库。CSS transitions 仍用于简单的 hover/opacity/transform 变化。
7. **兼容性：** Chrome 90+、Safari 15+、Firefox 90+、Edge 90+。

---

## FILE STRUCTURE — 建议文件结构

```
jingeros/
├── index.html
├── css/
│   ├── desktop.css          (现有桌面样式)
│   ├── archive.css          (VHS Archive 新增样式)
│   ├── glitch.css           (Glitch 过渡动画)
│   └── browser-shell.css    (浏览器框架样式)
├── js/
│   ├── desktop.js           (现有桌面逻辑)
│   ├── archive.js           (Archive 场景管理)
│   ├── tape-physics.js      (磁带物理交互)
│   ├── crt-effects.js       (CRT 效果渲染)
│   ├── glitch-transition.js (Glitch 过渡控制器)
│   ├── audio-manager.js     (音频系统)
│   └── particles.js         (环境粒子)
├── assets/
│   ├── audio/               (音效文件)
│   ├── previews/            (每个项目的预览帧)
│   └── textures/            (CRT/磁带纹理)
└── projects/
    ├── remoire/             (项目1独立页面)
    ├── careerforge/         (项目2独立页面)
    ├── frenchquest/         (项目3独立页面)
    ├── chatbox/             (项目4独立页面)
    └── generator/           (项目5独立页面)
```

---

## PROJECT PAGES — 五个项目独立页面设计

每个项目页面在浏览器 Chrome Shell 内呈现，拥有完全独立的视觉风格。以下是各项目的 CSS 变量和实现要点。

### 项目 1: Remoire（暖光客厅风格）

```css
/* projects/remoire/ */
--rm-bg: #FDF6EC;
--rm-bg-alt: #F5EDE0;
--rm-text: #3D2B1F;
--rm-text-body: #5C4A3A;
--rm-accent: #D4956A;
--rm-gold: #C7A882;
--rm-muted: #8B6F47;
--rm-shadow: 0 4px 20px rgba(61,43,31,0.08);
--rm-font-display: 'Libre Caslon Text', Georgia, serif;
--rm-font-body: 'Nunito Sans', system-ui, sans-serif;
```

**布局关键实现：**
- Hero: 左文右图（手机框架），背景线性渐变 `#FDF6EC → #F5EDE0`
- 功能区: 左右交替的 2 栏布局（`grid-template-columns: 1fr 1fr`），奇数行文左图右，偶数行反转
- 手机框架: `border-radius: 36px; border: 8px solid #E8DDD0; aspect-ratio: 9/19.5;`
- 板块分隔: `border-top: 1px dashed #C7A882; width: 80%; margin: 0 auto;`
- 核心特征: 内联文字行，`font-size: 18px; color: #D4956A; text-align: center; letter-spacing: 2px;`

**加载资源：**
```html
<link href="https://fonts.googleapis.com/css2?family=Libre+Caslon+Text:wght@400;700&family=Nunito+Sans:wght@400;600&display=swap" rel="stylesheet">
```

---

### 项目 2: AI Chatbox（iMessage 风格）

```css
/* projects/chatbox/ */
--cb-bg: #FAFBFC;
--cb-bg-alt: #F2F2F7;
--cb-bubble-send: #34C759;
--cb-bubble-recv: #E9E9EB;
--cb-text: #1C1C1E;
--cb-text-body: #3A3A3C;
--cb-accent: #007AFF;
--cb-orange: #FF9500;
--cb-red: #FF3B30;
--cb-shadow: 0 2px 12px rgba(0,0,0,0.06);
--cb-font-display: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', sans-serif;
--cb-font-body: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', sans-serif;
```

**布局关键实现：**
- Hero: 居中 iPhone 框架，极淡蓝白背景
- 气泡: `border-radius: 18px; padding: 10px 16px; max-width: 75%;` 发送方右对齐绿色，接收方左对齐灰色
- iPhone 框架: `border-radius: 40px; border: 6px solid #1C1C1E; padding-top: 30px;` 顶部有 notch `width: 120px; height: 28px; border-radius: 0 0 16px 16px; background: #1C1C1E; margin: 0 auto;`
- 功能列表: 纵向全宽行，编号"01"~"04" 用 `color: #007AFF; font-size: 20px;`，行间 `border-bottom: 1px solid #E9E9EB;`
- 板块分隔: `height: 8px; background: #F2F2F7; width: 100%;`

**无需额外字体加载**（使用系统字体栈）

---

### 项目 3: CareerForge（求职者指南风格）

```css
/* projects/careerforge/ */
--cf-bg: #F6F4F0;
--cf-bg-alt: #ECEAE4;
--cf-text: #1B2A4A;
--cf-text-body: #3D4A5C;
--cf-accent: #C68B2C;
--cf-sage: #7A9E7E;
--cf-border: #D8D4CC;
--cf-dark-block: #1B2A4A;
--cf-dark-text: #E8DCC8;
--cf-font-display: 'Bricolage Grotesque', system-ui, sans-serif;
--cf-font-body: 'Figtree', system-ui, sans-serif;
```

**布局关键实现：**
- Hero: 左文(60%)右图(40%)，背景 `#F6F4F0` 纯色，无渐变无光晕
- Skills 列表: 纵向编号列表，每行 `display: grid; grid-template-columns: 80px 1fr;`，编号 `font-size: 36px; color: #C68B2C;`，行间 `border-bottom: 1px solid #D8D4CC;`
- 深色插入块: 全宽 `background: #1B2A4A; color: #E8DCC8; padding: 64px 0;`，页面内唯一深色区域
- 引用排版: 左侧大引号 72px `color: #D8D4CC;`，正文 `font-style: italic; font-size: 20px;`
- 截图画廊: `grid-template-columns: 3fr 2fr;`（交替 `2fr 3fr`），不等宽排列
- 按钮: `border-radius: 6px; background: #1B2A4A; color: #F6F4F0;`

**加载资源：**
```html
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;600;700&family=Figtree:wght@400;500&display=swap" rel="stylesheet">
```

---

### 项目 4: 小红书图文生成器（创意工作台风格）

```css
/* projects/generator/ */
--gen-bg: #FAFAFA;
--gen-bg-alt: #F0F0F0;
--gen-text: #1F1F23;
--gen-text-body: #4A4A4A;
--gen-red: #FF2442;
--gen-orange: #FF6B35;
--gen-yellow: #FFB800;
--gen-green: #00C853;
--gen-shadow: 0 2px 16px rgba(0,0,0,0.06);
--gen-font-display: 'Poppins', system-ui, sans-serif;
--gen-font-body: 'Noto Sans SC', system-ui, sans-serif;
```

**布局关键实现：**
- Hero: 背景 `#FAFAFA` 纯色，无渐变装饰
- 瀑布流: CSS columns 或 Masonry Grid `column-count: 3; column-gap: 16px;`，每张卡片 `break-inside: avoid; border-radius: 12px; margin-bottom: 16px;`
- 标签: `border-radius: 4px; padding: 6px 16px; background: #F0F0F0;` hover 时 `background: #FF2442; color: #fff;`
- 流程步骤: 3 栏等宽网格，步骤间用虚线箭头连接（CSS `border-top: 2px dashed #FF6B35` + `::after` 伪元素画箭头）

**加载资源：**
```html
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Noto+Sans+SC:wght@400;500&display=swap" rel="stylesheet">
```

---

### 项目 5: Français Quest（像素复古教室风格）

```css
/* projects/frenchquest/ */
--fq-bg: #F5F0E6;
--fq-bg-alt: #EAE2D0;
--fq-text: #2C1810;
--fq-text-body: #4A3728;
--fq-blue: #2E5A88;
--fq-terra: #C75B39;
--fq-chalk: #2D5A3D;
--fq-cream: #F2D98B;
--fq-pixel-white: #F8F4ED;
--fq-wood: #8B6F47;
--fq-font-pixel: 'Fusion Pixel', monospace;
--fq-font-body: 'Nunito', system-ui, sans-serif;
```

**布局关键实现：**
- 背景纹理: 叠加网格线 `background-image: repeating-linear-gradient(0deg, transparent, transparent 23px, rgba(44,24,16,0.04) 24px), repeating-linear-gradient(90deg, transparent, transparent 23px, rgba(44,24,16,0.04) 24px);`
- 黑板区域: `background: #2D5A3D; color: #F2D98B; border: 6px solid #8B6F47; padding: 24px;` 文字加 text-shadow 模拟粉笔效果 `text-shadow: 0 0 2px rgba(242,217,139,0.5);`
- 像素边框: `border: 4px solid #2C1810; image-rendering: pixelated;`
- 进度条: 方块填充 `background: linear-gradient(90deg, #2E5A88 var(--progress), transparent var(--progress)); height: 12px; border: 2px solid #2C1810;`（同 JingerOS Terminal 风格）
- 热力图: `display: grid; grid-template-columns: repeat(52, 10px); gap: 2px;` 每个方块 `10px × 10px; border-radius: 0;`
- Fusion Pixel 字体: 复用已加载的 @font-face，不需要额外加载

**加载资源：**
```html
<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600&display=swap" rel="stylesheet">
```

---

### 子导航栏实现（所有项目通用）

```css
.project-subnav {
  position: sticky;
  top: 36px; /* 浏览器 chrome 高度 */
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 32px;
  font-size: 12px;
  letter-spacing: 2px;
  text-transform: uppercase;
  z-index: 10;
  /* 背景色和文字色从各项目 CSS 变量继承 */
}

.project-subnav a {
  text-decoration: none;
  opacity: 0.6;
  transition: opacity 0.2s;
}

.project-subnav a.active,
.project-subnav a:hover {
  opacity: 1;
  border-bottom: 2px solid currentColor;
}
```

### 截图 Lightbox 实现（所有项目通用）

```
点击任意截图 → 全屏暗色遮罩 (background: rgba(0,0,0,0.85))
→ 居中显示大图 (max-width: 90vw; max-height: 85vh; object-fit: contain;)
→ 点击遮罩或按 ESC 关闭
→ 淡入淡出动画 200ms
```

---

*这份 prompt 的目标是 99.999% 复刻设计意图。每一个时间参数、每一个缓动曲线、每一个视觉细节都已精确指定。按照这份文档实现即可。*
