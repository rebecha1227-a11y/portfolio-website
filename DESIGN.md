# DESIGN.md — 静儿的个人作品集网站

> **文档角色**：桌面层（JingerOS 窗口 / 终端 / Dock）视觉与组件规范，以及**未来开机 3D 场景**等愿景（键盘、像素小人亚克力立牌、ASCII 背景等）。  
> **未实现章节请保留**，不要当废弃内容删掉。实现状态对照 → [`CLAUDE.md`](./CLAUDE.md) §设计文档 vs 当前实现  
> **代码地图** → [`CLAUDE.md`](./CLAUDE.md) · **VHS Archive** → [`jingeros-design-system-v2.md`](./jingeros-design-system-v2.md)

> AI 产品经理 · AI Native Builder · Vibe Coder
> 千禧复古 × 像素 × ASCII Art × 早期 Apple UI

---

## 1. Visual Theme & Atmosphere

### Core Identity

这不是一个"又一个极简作品集"。这是一台被遗忘在 2002 年网吧角落的 CRT 显示器，突然被 AI 唤醒后长出了现代灵魂。

**关键词**：Y2K 千禧复古 · 像素风 · ASCII Art · 早期 macOS/iOS 拟物 · 终端命令行 · 3D 拟物元素

**氛围描述**：
- 像走进一个被精心布置的复古科技展厅——墙上是 ASCII Art 动态壁画，展台上摆着 3D 渲染的翻盖手机和游戏机
- 交互像使用一台有情感的老电脑：输入命令会有打字机音效的反馈，鼠标移过时 ASCII 字符会流动
- 整体感觉是"怀旧但不老气"——千禧年的视觉语言配上 2026 年的交互技术
- 有游戏感：积分系统、像素小游戏、彩蛋

### Key Characteristics

1. **双层视觉**：底层是 ASCII Art 动态背景（随鼠标移动变化），上层是拟物化的 UI 组件
2. **终端 + GUI 混合**：导航用斜杠命令（`/projects`、`/about`），但展示用图形化卡片
3. **像素与高清共存**：标题用像素字体，正文用清晰的现代字体
4. **3D 拟物装饰**：复古电子设备的 3D 渲染图散落在页面中
5. **游戏化元素**：访客积分、Playground 小游戏、隐藏彩蛋

---

## 2. Color Palette & Roles

### Primary Palette — "CRT 调色盘"

```
┌─────────────────────────────────────────────────┐
│  Terminal Gray    #1A1A2E   深夜屏幕底色          │
│  Pixel Blue       #4A9EE5   主交互色/链接/命令    │
│  Retro Pink       #E8839B   强调色/hover/活力     │
│  Matrix Green     #5BBA6F   成功/数据/终端光标    │
│  CRT Cream        #F0EDE5   浅色背景/卡片底色     │
│  Warm Gray        #B8B5AD   次要文字/边框         │
│  Screen Glow      #E8E4DC   页面主背景            │
└─────────────────────────────────────────────────┘
```

### Functional Roles

| Token | Hex | Role |
|-------|-----|------|
| `--bg-primary` | `#E8E4DC` | 页面主背景，模拟老旧屏幕的微暖灰 |
| `--bg-card` | `#F0EDE5` | 卡片/面板背景，像泛黄的老纸 |
| `--bg-dark` | `#1A1A2E` | 深色区域/终端面板/代码块 |
| `--text-primary` | `#1A1A2E` | 主文字 |
| `--text-secondary` | `#6B6860` | 次要文字 |
| `--text-muted` | `#B8B5AD` | 辅助信息、时间戳 |
| `--accent-blue` | `#4A9EE5` | 主交互色：链接、命令、按钮 |
| `--accent-pink` | `#E8839B` | 强调色：hover 状态、重点标记 |
| `--accent-green` | `#5BBA6F` | 终端光标、成功状态、在线指示 |
| `--accent-yellow` | `#EAC028` | 警告、星标、积分 |
| `--border` | `#D4D0C8` | 边框色，模拟 Windows 2000 风格 |
| `--shadow` | `rgba(26,26,46,0.08)` | 卡片投影 |

### ASCII Art 专用色

```
--ascii-dim:     #C8C4BC    暗部字符
--ascii-mid:     #8A8680    中间调字符
--ascii-bright:  #4A9EE5    高亮字符（鼠标附近）
--ascii-glow:    #E8839B    光晕/鼠标跟随效果
```

---

## 3. Typography Rules

### Font Stack

```css
/* 像素标题字体 — 用于 Hero、H1、大标题 */
--font-pixel: 'Press Start 2P', monospace;

/* 像素 UI 字体 — 用于小标签、badge、积分数字、像素小元素 */
--font-pixel-ui: 'Silkscreen', monospace;

/* 终端/代码字体 — 用于命令行、代码块、斜杠命令 */
--font-mono: 'JetBrains Mono', 'Fira Code', 'Courier New', monospace;

/* 正文字体 — 用于段落、描述、标题 H2/H3、所有非像素/非终端的文字 */
--font-body: 'Space Grotesk', 'Inter', 'Noto Sans SC', sans-serif;
```

### Hierarchy

| Level | Font | Size | Weight | Line Height | Use |
|-------|------|------|--------|-------------|-----|
| Hero Title | Press Start 2P | 36-48px | 400 | 1.4 | 首页大标题，像素感 |
| H1 | Press Start 2P | 24-32px | 400 | 1.3 | 页面标题 |
| H2 | Space Grotesk | 20-24px | 700 | 1.3 | 区块标题 |
| H3 | Space Grotesk | 16-18px | 600 | 1.4 | 卡片标题、项目名 |
| Body | Space Grotesk / Noto Sans SC | 15px | 400 | 1.65 | 正文、描述 |
| Caption | JetBrains Mono | 13px | 400 | 1.4 | 时间戳、元数据 |
| Command | JetBrains Mono | 14px | 500 | 1.5 | 斜杠命令、终端文字 |
| Pixel UI | Silkscreen | 11-12px | 400 | 1.4 | 像素小标签、badge、积分 |

### Typography Principles

- 英文正文用 Space Grotesk，中文用 Noto Sans SC，Inter 仅作 fallback
- 像素字体分两级：Press Start 2P 只用于 Hero/H1 大标题，Silkscreen 用于小标签和 UI 元素
- **正文绝不用像素字体**（会很难读）
- 终端字体（JetBrains Mono）用于所有代码/命令相关的文字
- 像素标题的英文全大写，增加"游戏感"；正文标题不强制全大写

---

## 4. Component Stylings

### 4.1 Navigation — 斜杠命令栏

灵感来源：zui.ooo 的终端导航 + macOS Spotlight

```
┌──────────────────────────────────────────────────────┐
│  $ _                                          [×]    │
│                                                      │
│  /home    /projects    /about    /playground  /contact│
│                                                      │
│  Type a command or click to navigate...              │
└──────────────────────────────────────────────────────┘
```

- 固定在页面顶部，深色背景 `--bg-dark`
- 左侧有闪烁的终端光标（绿色 `--accent-green`）
- 输入框可以真的输入命令，也可以直接点击导航项
- 支持的命令：`/home` `/projects` `/about` `/playground` `/contact` `/resume`
- 输入未知命令显示 `404: command not found` 的俏皮提示
- 移动端收起为汉堡菜单，展开后全屏覆盖

### 4.2 首页 — 3D 桌面场景 + 开机交互

网站的核心记忆点。访客打开网站，看到的是一张无限延伸的浅灰白桌面，上面摆着几个 3D 拟物物件。参考 toddham.com 的 3D 桌面风格。

**场景布局（俯视图）**：
```
                    浅灰白无限桌面（带柔和阴影）
  ┌──────────────────────────────────────────────────────┐
  │                                                      │
  │                                                      │
  │        ┌──────────────┐                              │
  │        │  老式电脑      │   ┌─────────┐              │
  │        │  (Macintosh   │   │  键盘     │              │
  │        │   Classic)    │   │  ⌨️       │              │
  │        │              │   └─────────┘              │
  │        │  屏幕显示：   │                              │
  │        │  开机动画     │                              │
  │        └──────────────┘                              │
  │                                                      │
  │   ┌─────────┐    [像素小人]     ┌──────────┐         │
  │   │  iPod    │    站在桌上       │ iPhone 4s │         │
  │   │  🎵      │    有待机动画     │  📱       │         │
  │   └─────────┘                   └──────────┘         │
  │                                                      │
  └──────────────────────────────────────────────────────┘
```

#### 3D 物件清单

**1. 老式 Macintosh 电脑（核心）**
- 模型：经典 Macintosh 128K / Classic 造型（米色塑料外壳，9 寸 CRT 屏幕，内置软驱槽）
- 屏幕是可交互区域（Three.js CSS3DRenderer 把 HTML 内容贴到屏幕上）
- 旁边放着键盘（独立 3D 模型）
- 鼠标 hover 电脑时有微微的光泽变化

**2. 键盘（交互入口）**
- 模型：经典 Apple Keyboard（大颗按键、米色）
- 回车键 (Enter/Return) 是可点击的——hover 时回车键微微下沉发光
- 点击回车键 → 触发"进入电脑"的过渡动画

**3. iPhone 4s（联系卡）**
- 斜靠在小支架上，屏幕朝向访客
- 屏幕上显示联系信息卡片（见 4.7 节的 iPhone 4s Contact Card）
- 点击 → 弹出联系信息浮层，或 zoom into 手机屏幕

**4. iPod Classic（真·音乐播放器）**
- 模型：经典 iPod（白色，圆形滚轮，小屏幕）
- **真的能播放音乐**——内置几首静儿喜欢的 MP3
- iPod 屏幕显示：当前歌曲名 / 艺术家 / 播放进度
- 圆形滚轮交互：
  - ▶️ 中心按钮：播放 / 暂停
  - ⏮ 左：上一首
  - ⏭ 右：下一首
  - 🔊 上/下：音量（可选）
- 技术实现：Web Audio API + HTML5 Audio，MP3 文件放在 `assets/music/` 里
- 播放时 iPod 屏幕有简单的均衡器动画

**5. 像素小人 — 亚克力立牌（3D 桌面场景专属）**
- 外观：透明亚克力底座 + 立牌，正面印着静儿的像素小人图片（`个人形象像素小人.png`）
- 立牌有真实的厚度（约 3-4mm），边缘有亚克力的通透质感和折射效果
- 底座是圆角矩形的透明支架
- 摆放位置：电脑和 iPod 之间
- 3D 实现：一个扁平的透明长方体几何体，正面贴像素小人纹理，背面可以有轻微模糊的镜像
- 光照下有亚克力特有的边缘高光
- 点击她 → 显示气泡对话："Hi! 我是静儿 ☺"

#### 场景细节

**背景与桌面**：
- 无限延伸的浅灰白平面（`#ECEAE6`），有轻微纹理（模拟桌布/纸质感）
- 所有物件投射柔和的接触阴影（contact shadow）
- 物件之间有合理的间距和摆放角度（不是整齐排列，稍微随意一点，像真的桌面）

**光照**：
- 柔和的顶光 + 右前方环境光
- 物件有微妙的环境反射（让塑料质感更真实）

**相机**：
- 默认视角：略微俯视（约 30° 下倾），能看到所有物件
- 鼠标移动时相机有微妙的跟随偏移（视差效果，不是旋转，参考 toddham.com）
- 滚轮缩放：可以拉近看某个物件的细节

#### 开机流程（交互序列）

```
Step 1: 页面加载
  └→ 3D 场景淡入，物件从虚焦变清晰
  └→ 电脑屏幕是黑的（关机状态）
  └→ 亚克力立牌轻微晃动（像被风吹了一下），吸引注意

Step 2: 电脑自动开机（等 1-2 秒后触发）
  └→ CRT 开机效果：
     - 屏幕中心出现一条亮线（横向）
     - 亮线迅速扩展为全屏白光
     - 白光消退，出现绿色终端文字：
       "JingerOS v2.0"
       "Loading..."
       "$ welcome to jinger's space_"
       "Press [Enter] to continue..."
  └→ 键盘上的 Enter 键开始微微发光脉冲（提示可点击）

Step 3: 访客点击键盘上的 Enter 键
  └→ 键盘 Enter 键下沉动画（物理按下效果）
  └→ 电脑屏幕显示 "Entering JingerOS..."
  └→ 相机 zoom into 电脑屏幕（快速推进）
  └→ 屏幕逐渐占满全屏
  └→ 3D 场景淡出，进入 JingerOS 桌面界面

Step 4: JingerOS 桌面（全屏 HTML）
  └→ 见 4.8 节 JingerOS 桌面系统
```

**备用路径**：如果访客等太久不点 Enter（比如 8 秒），屏幕上多显示一行：
`"Or just scroll down to explore... ↓"`
向下滚动也可以进入桌面，降低交互门槛。

#### 移动端适配

- 手机端：3D 场景简化为正面平视（只看到电脑正面 + iPod）
- 触摸替代鼠标 hover
- iPod 播放器用点击替代滚轮
- "点击 Enter" 改为 "点击屏幕" 或 "向上滑动"

### 4.3 Project Cards — 项目卡片

灵感：早期 macOS 窗口 + 游戏选关界面

```
┌─ 📁 Remoire ──────────────────── [−][□][×] ─┐
│                                               │
│  ┌─────────────────────────────────────────┐  │
│  │         [项目截图 / 3D 预览]             │  │
│  └─────────────────────────────────────────┘  │
│                                               │
│  AI 陪伴产品 · 四层记忆系统 · 全栈              │
│                                               │
│  [Claude Code] [MCP] [向量语义] [全栈]        │
│                                               │
│  ▸ 查看详情          ⭐ GitHub                │
│                                               │
└───────────────────────────────────────────────┘
```

- 卡片模拟 macOS Classic / Windows 2000 的窗口样式
- 标题栏有经典的最小化/最大化/关闭按钮（纯装饰）
- 左上角有文件夹图标
- Hover 时卡片微微抬起 + 窗口标题栏变色（`--accent-blue`）
- 标签用像素风小药丸样式
- 底部操作区用终端风格 `▸`
- 边框：2px solid `--border`，带 inset 阴影模拟早期 UI 凸起效果

### 4.4 Buttons

**主按钮（Terminal Style）**
```css
background: var(--bg-dark);
color: var(--accent-green);
border: 2px solid var(--accent-green);
font-family: var(--font-mono);
padding: 10px 24px;
/* Hover: 背景变 --accent-green, 文字变深色 */
/* 点击时有 1px 下沉效果 */
```

**次按钮（Retro Pill）**
```css
background: var(--bg-card);
color: var(--text-primary);
border: 2px solid var(--border);
border-radius: 4px;
box-shadow: inset -1px -1px 0 #999, inset 1px 1px 0 #fff;
/* 模拟早期 Windows 按钮的 3D 凸起效果 */
```

**标签/Badge**
```css
font-family: var(--font-pixel);
font-size: 10px;
padding: 4px 10px;
background: var(--accent-blue);
color: #fff;
border-radius: 2px;
```

### 4.5 Terminal/Command Panel

```
┌─ terminal@jinger ─────────────────────────────┐
│                                                │
│  $ whoami                                      │
│  > 周静儿 / Jinger Zhou                        │
│  > AI Product Manager · Vibe Coder             │
│                                                │
│  $ ls projects/                                │
│  > remoire/    careerforge/    rednote-gen/    │
│  > french-learn/    ai-chatbox/               │
│                                                │
│  $ cat stats.txt                               │
│  > GitHub Stars: 102                           │
│  > 小红书赞藏: 17,600+                         │
│  > Projects Shipped: 6                         │
│                                                │
│  $ _                                           │
└────────────────────────────────────────────────┘
```

- 深色背景 `--bg-dark`，绿色命令文字 `--accent-green`
- 打字动画效果（逐字出现）
- 光标持续闪烁

### 4.6 Timeline — 关于我页面

```
  2017 ──●── 浙江农林大学 · 英语学士
          │   GPA 3.85/4.0 · 专业前 5%
          │
  2021 ──●── 广东外语外贸大学 · 翻译硕士（传媒方向）
          │   GPA 3.8/4.0 · 校奖学金一等奖 × 2
          │   管理 71 人译审团队
          │
  2022 ──●── 树根互联 · 翻译实习生（产品方向）
          │   10 万+ 字技术文档 · 竞品分析 · 流程优化
          │
  2023 ──●── 新东方 SFK · 留学指导老师
          │   500+ 文书项目 · 100+ offer · 面试通过率 90%+
          │
  2024 ──●── 广州外国语学校 · 升学指导顾问
          │   20+ 学生全流程 · 100+ 夏校数据库
          │   社媒运营 30+ 内容 · 20,000+ 浏览
          │
  2025 ──◉── AI Native Builder 觉醒
          │   6 个月 · 5 个 AI 项目从 0 到 1
          │   小红书 18,000+ 赞与收藏
          │   开源项目 CareerForge 获 100+ GitHub Stars
          │
  NOW  ──◈── Seeking AI Product Manager Role
```

- 像素风圆点节点，滚动时依次点亮
- 每个节点展开后显示数据点（副文本用 `--font-body` 小字）
- 时间线连接线用虚线（模拟终端 `│`）

### 4.7 iPhone 4s Contact Card — 联系方式组件

核心联系组件，外观模拟一台真实的 iPhone 4s。

**外壳结构**：
```
╔══════════════════════════════════════╗  ← 不锈钢边框（#C0C0C0 金属质感）
║  ┌──────────────────────────────┐   ║     圆角较小（iPhone 4s 特征）
║  │  ┌────────────────────────┐  │   ║
║  │  │                        │  │   ║  ← 玻璃屏幕区域
║  │  │   Contact        ↗    │  │   ║
║  │  │   ─────────────────    │  │   ║
║  │  │                        │  │   ║
║  │  │   Phone:               │  │   ║
║  │  │   17326084778  [Copy]  │  │   ║
║  │  │   ─────────────────    │  │   ║
║  │  │   E-mail:              │  │   ║
║  │  │   z1732...  [Email Me] │  │   ║
║  │  │                        │  │   ║
║  │  │   ╔══════════════════╗ │  │   ║  ← 模糊照片区域
║  │  │   ║  [静儿的照片      ║ │  │   ║     backdrop-filter: blur(20px)
║  │  │   ║   模糊处理]       ║ │  │   ║
║  │  │   ╚══════════════════╝ │  │   ║
║  │  │                        │  │   ║
║  │  │   Other:               │  │   ║
║  │  │   My Resume  [↗]      │  │   ║
║  │  │   ─────────────────    │  │   ║
║  │  │                        │  │   ║
║  │  │   [GitHub] [小红书]    │  │   ║  ← 社交图标行
║  │  │                        │  │   ║
║  │  └────────────────────────┘  │   ║
║  │          ┌───┐               │   ║  ← Home 键（经典圆形 + 方形图标）
║  │          │ □ │               │   ║
║  │          └───┘               │   ║
║  └──────────────────────────────┘   ║
╚══════════════════════════════════════╝
```

**外壳细节**：
- 整体尺寸比例：宽 320px，高 约 580px（模拟 iPhone 4s 3.5 寸屏比例）
- 外框：4px 不锈钢边框，带金属光泽渐变（`linear-gradient(135deg, #E8E8E8, #A0A0A0, #C8C8C8)`）
- 边框圆角：`--radius-lg`（8px），iPhone 4s 圆角比现代 iPhone 小很多
- 屏幕区域：内嵌 2px 黑色边框，模拟玻璃面板与金属框的分界
- 底部 Home 键：圆形 40x40px，内有经典方形小图标，纯装饰
- 顶部有听筒条（装饰用，6px 高的深灰圆角条）

**屏幕内容**：
- 背景：静儿的照片，施加 `blur(20px)` + 暗色叠加 `rgba(0,0,0,0.5)`
- 文字全部白色，分区用 1px 半透明分割线
- 左列标签（Phone: / E-mail: / Other:）用 `--font-mono`，12px，灰色
- 右列操作按钮（Copy number / Email Me / My Resume）用 `--font-body`，14px，白色
- 社交图标行：GitHub / 小红书 图标，等间距居中排列，白色描边风格

**包含的联系信息（按优先级排列，招聘方最关注的排前面）**：
| 优先级 | 项目 | 内容 | 交互 |
|--------|------|------|------|
| ★★★ | E-mail | z17326084778@163.com | 点击 → 打开邮件客户端 |
| ★★★ | Resume | 简历 PDF（中英各一份） | 点击 → 下载 PDF |
| ★★☆ | GitHub | github.com/rebecha1227-a11y | 点击 → 新窗口打开 |
| ★★☆ | 小红书 | xhslink.com/m/5D9021FcWWO | 点击 → 新窗口打开 |

> 手机号不在公开网站上展示（隐私保护）。招聘方通过邮箱或表单联系即可。

**交互效果**：
- 整个手机有轻微的 CSS 3D 倾斜（perspective + rotateY(2deg)），鼠标 hover 时回正
- 鼠标移过手机时，背景照片有微妙的视差移动
- 点击 Copy 按钮后显示短暂的"✓ Copied"反馈（1.5 秒后消失）
- 社交图标 hover 时从白色变为对应品牌色

**放置位置**：Contact 窗口左侧，和右侧的合作表单并排显示。

### 4.7.1 合作意向表单 — Contact 窗口右侧

和 iPhone 4s 联系卡并排的表单，终端风格，用 Formspree 处理提交（免费 50 次/月，零后端）。

```
┌─ 📮 Get In Touch ─────────────────────── [−][□][×] ─┐
│                                                       │
│  Have a project idea? Want to collaborate?             │
│  Or just want to say hi? Drop me a message.           │
│                                                       │
│  $ your_name:                                         │
│  ┌─────────────────────────────────────────────────┐  │
│  │ _                                               │  │
│  └─────────────────────────────────────────────────┘  │
│                                                       │
│  $ your_email:                                        │
│  ┌─────────────────────────────────────────────────┐  │
│  │ _                                               │  │
│  └─────────────────────────────────────────────────┘  │
│                                                       │
│  $ inquiry_type:                                      │
│  ( ) 🤝 Collaboration / Project                       │
│  ( ) 💼 Job Opportunity                               │
│  ( ) 💬 Just saying hi                                │
│  ( ) 🔧 Technical Question                            │
│                                                       │
│  $ message:                                           │
│  ┌─────────────────────────────────────────────────┐  │
│  │ _                                               │  │
│  └─────────────────────────────────────────────────┘  │
│                                                       │
│  [▸ Send Message]                                     │
│                                                       │
└───────────────────────────────────────────────────────┘
```

**表单字段**：
| 字段 | 类型 | 必填 |
|------|------|------|
| Name | text | ✅ |
| Email | email | ✅ |
| Type | radio | ✅ |
| Message | textarea | ✅ |

**提交后反馈**（替换表单内容，1.5 秒后恢复）：
```
$ send message...
> ✓ Message sent successfully!
> Jinger will reply within 24-48 hours.
```

**技术实现**：Formspree，`<form action="https://formspree.io/f/{FORM_ID}" method="POST">`，静儿注册后替换 ID。

### 4.8 JingerOS 桌面系统

点击 Enter 键进入电脑后，访客看到的是一个模拟操作系统的全屏桌面界面。参考 daveos.fun 的 OS 模拟概念。

**桌面布局**：
```
┌─────────────────────────────────────────────────────────┐
│  JingerOS  🍎  File  View  Help     ☀️  🔋  10:24 AM   │  ← 顶部菜单栏
├─────────────────────────────────────────────────────────┤
│                                                         │
│   📁 Projects    📄 About Me                            │  ← 桌面图标
│                                                         │
│   🎮 Playground  📋 Resume                              │
│                                                         │
│   🖥 Terminal     📮 Contact                             │
│                                                         │
│              ┌─── Projects ───────────────────┐         │
│              │  窗口内容区域                    │         │  ← 可拖拽窗口
│              │  （项目卡片网格）                │         │
│              │                                │         │
│              └────────────────────────────────┘         │
│                                                         │
├─────────────────────────────────────────────────────────┤
│  🏠 Finder   📁 Projects   👤 About   🎮 Play   📮 Mail │  ← 底部 Dock 栏
└─────────────────────────────────────────────────────────┘
```

#### 顶部菜单栏
- 左侧：JingerOS 苹果 logo + File / View / Help（装饰为主，点击可弹下拉菜单）
- 右侧：时间（真实时钟）、电池图标（装饰）、wifi 图标（装饰）
- 半透明毛玻璃背景（`backdrop-filter: blur(20px)`）
- 高度：28px，经典 macOS 尺寸

#### 桌面图标
- 像素风图标 + 文字标签（白色带阴影）
- 图标排列在左上角，网格对齐
- 双击打开对应窗口
- 图标列表：
  | 图标 | 名称 | 打开内容 |
  |------|------|---------|
  | 📁 | Projects | 项目列表窗口 |
  | 📄 | About Me | 个人介绍窗口 |
  | 🎮 | Playground | 小游戏窗口 |
  | 📋 | Resume | 简历查看 / PDF 下载 |
  | 🖥 | Terminal | 终端模拟器窗口 |
  | 📮 | Contact | 联系方式（iPhone 4s 弹窗） |

#### 窗口系统（核心交互）
- **经典 macOS 窗口外观**：标题栏 + 红黄绿三个圆点按钮 + 内容区
- **可拖拽**：拖动标题栏移动窗口
- **可调整大小**：拖动窗口右下角手柄（V3 功能）
- **可最小化**：点击黄色按钮 → 窗口缩到 Dock
- **可关闭**：点击红色按钮 → 窗口关闭（隐藏）
- **可层叠**：多个窗口可以重叠，点击置顶（z-index 管理）
- **窗口打开动画**：从图标位置 scale(0) → scale(1) + 弹性回弹

#### 窗口交互行为 — 完整 Spec

**拖拽移动**：
- 鼠标按住窗口标题栏可自由拖拽移动窗口位置
- 拖拽时窗口自动提升到最顶层（z-index 最大）
- 拖拽范围限制在视口内（不允许拖出屏幕边界）
- 移动端不支持拖拽，窗口始终居中或全屏
- 技术实现：mousedown/mousemove/mouseup 事件 + transform: translate()

**窗口标题栏三按钮**：

标题栏左侧有三个圆形按钮，模拟 macOS 经典窗口控制：

| 按钮 | 颜色 | 功能 | 交互细节 |
|------|------|------|---------|
| 🔴 关闭 | #FF5F57 | 关闭窗口 | 窗口缩小并淡出（scale 0.95 → 0 + opacity 1 → 0，200ms）。关闭后对应的 Dock 图标恢复未激活状态。 |
| 🟡 最小化 | #FFBD2E | 最小化到 Dock | V1：直接淡出隐藏。V2：窗口"吸入"Dock 栏对应图标位置（Genie 简化版）。Dock 图标下方出现小圆点表示已最小化。点击 Dock 图标可恢复。 |
| 🟢 最大化 | #28CA41 | 全屏/还原切换 | 第一次点击：窗口平滑扩展到占满桌面区域（不覆盖 Dock 和顶部菜单栏），transition 300ms。再次点击：还原到之前的尺寸和位置。 |

按钮默认显示纯色圆点。鼠标 hover 到标题栏时，三个按钮上显示对应图标（× − +）。

**窗口层级管理（z-index）**：
- 点击任何窗口（标题栏或内容区），该窗口提升到最顶层
- 其他窗口保持原有的层级顺序
- 新打开的窗口始终在最顶层
- 技术实现：维护一个全局 z-index 计数器，每次激活窗口时 +1 赋给该窗口

**窗口初始位置**：
- 每个窗口有预设的默认位置和尺寸
- 如果同时打开多个窗口，依次偏移（cascade 排列），避免完全重叠
- 偏移量：每个新窗口向右下各偏移 30px

**窗口尺寸约束**：
- 每个窗口有最小宽度和最小高度（防止缩太小内容不可读）
- About Me 窗口：min 500×400px
- Projects 窗口：min 600×450px
- Contact 窗口：min 400×350px
- Terminal 窗口：min 500×300px

#### 窗口内容映射
| 窗口 | 内容 |
|------|------|
| Projects | 3 个 S 级 Case Study（完整展开）+ 3 个 A 级卡片（简要），支持筛选标签 |
| About Me | 终端面板 `$ whoami` + 故事版长文 + 数据亮点条 + 方法论板块 + 时间线 |
| Playground | 像素小游戏 + ASCII Art 生成器 + 终端文件系统 |
| Resume | HTML 简历 iframe 预览 + 下载 PDF 按钮（中英各一份） |
| Terminal | 斜杠命令系统（`/projects`、`/about` 等打开对应窗口） |
| Contact | iPhone 4s 联系卡 + 合作意向表单（Formspree，终端风格） |

**项目分档展示策略**：
- **S 级（完整 Case Study）**：Remoire、小红书生成器、CareerForge — 各自打开独立子窗口，含截图/GIF、What/Why/How/Result 完整内容
- **A 级（简要卡片）**：AI 聊天平台、法语学习平台、小红书内容运营 — 只在 Projects 网格里显示卡片，点击展开简短描述

**方法论板块**（About Me 窗口内，独立区域）：
用终端风格展示 `$ cat methodology.md`，内容：
| 方法 | 说明 |
|------|------|
| Handover Skill | 跨 Session 交接文档，AI 换窗口不丢上下文 |
| Reflect Skill | 复盘学习机制，自动将经验沉淀为 Rules |
| Auto Hook | 窗口压缩前自动触发 Handover，流程标准化 |
| Memory MCP | 可复用的记忆集成工具，支持跨平台 AI Agent |
| AI 工作流集成 | MCP 接入飞书 + Notion，日报自动化、文档自动整理 |

> 这个板块告诉招聘方：她不只会用 AI 工具，还总结出了可复用的方法论。

#### 底部 Dock 栏
- 半透明毛玻璃条，贴底居中
- 图标稍大于桌面图标，hover 时放大弹跳（经典 macOS Dock 效果）
- 固定显示：Finder / Projects / About / Playground / Contact
- 最小化的窗口也出现在 Dock 里
- 高度：56px

#### 像素小人 — 桌面宠物（JingerOS 专属）

进入 JingerOS 后，像素小人从 2D 形态出现在桌面上，像一个桌面宠物。

**外观**：
- 使用 `个人形象像素小人.png` 的缩小版（约 80-100px 高）
- 纯 2D 平面，CSS 定位在桌面层（在窗口下方、桌面图标同层）

**自主行为（idle 状态）**：
- 沿桌面底部边缘来回走动（左右移动，走到边缘转身）
- 偶尔停下来做动作：挥手、坐下休息、看手机、打字
- 走动时有简单的两帧交替步行动画（左脚/右脚，CSS sprite）
- 走动速度很慢，不抢注意力

**鼠标交互**：
- **可拖拽**：鼠标按住小人可以自由拖到桌面任意位置，松手后小人站在那里，过几秒继续走动
- **点击**：弹出气泡对话，从预设列表随机抽取（纯前端，不调用 AI API）：
  - "Hi! 我是静儿 ☺"
  - "试试打开 Terminal 输入 /help"
  - "拖我到任意地方吧~"
  - "iPod 里有好听的歌哦 🎵"
  - "看看我的项目吧，双击 Projects 图标"
  - "这个网站是用 Claude Code 做的哦"
- **hover**：小人转头看向鼠标方向

**技术实现**：
- 一个 `position: absolute` 的 `<div>`，内含 `<img>` 或 CSS background
- 走动用 `requestAnimationFrame` 或 CSS animation 控制 `left` 值
- 步行帧动画：准备 2-4 帧的 sprite sheet（从原图衍生，左脚/右脚姿态）
- 拖拽用 mousedown/mousemove/mouseup，和窗口拖拽同一套逻辑
- z-index 在窗口下方，但在桌面壁纸上方

#### 退出 OS / 返回 3D 场景
- 顶部菜单栏 File → "Shut Down" 选项
- 触发 CRT 关机动画（画面压缩为一条白线 → 黑屏 → 淡回 3D 桌面场景）
- 3D 场景中电脑屏幕重新显示 "$ welcome to jinger's space_"

#### 技术实现要点
- 整个 JingerOS 是一个全屏 `<div>` 覆盖在 Three.js Canvas 上方
- 窗口拖拽用原生 JS（mousedown/mousemove/mouseup），不需要库
- 窗口状态管理：一个简单的 JS 对象记录每个窗口的位置、大小、z-index、是否打开
- 每个窗口的内容是独立的 HTML 片段，动态加载或预渲染
- Dock 弹跳效果用 CSS transform + transition
- 页面结构从多 HTML 文件变为**单页应用**：所有内容在 index.html 内，通过窗口系统展示

#### 移动端适配
- 手机端不模拟桌面系统（屏幕太小，拖拽体验差）
- 改为简化的列表式导航：图标 + 标签，点击全屏打开内容
- 保留 Dock 栏在底部，但改为固定 Tab Bar 样式
- 仍然有 CRT 开机动画，但跳过 3D 桌面场景直接进入

### 4.9 iPod 音乐播放器组件

3D 桌面场景上的 iPod Classic，不只是装饰——它是一个真正能播放音乐的播放器。

**外观**：
```
     ╔═══════════════════╗
     ║  ┌─────────────┐  ║  ← 白色抛光塑料外壳
     ║  │  Now Playing │  ║
     ║  │  ─────────── │  ║  ← 小屏幕（160x128px 比例）
     ║  │  🎵 Song Name│  ║     浅蓝灰背景
     ║  │  Artist      │  ║
     ║  │  ▶ ━━━●━━━━  │  ║  ← 播放进度条
     ║  │  1:23 / 3:45 │  ║
     ║  └─────────────┘  ║
     ║                   ║
     ║      ┌─────┐      ║
     ║    ╱  MENU   ╲    ║  ← 经典滚轮
     ║   │  ⏮  ▶⏸  ⏭  │  ║     触控区域
     ║    ╲  ⏯     ╱    ║
     ║      └─────┘      ║
     ║                   ║
     ╚═══════════════════╝
```

**滚轮交互**：
| 区域 | 操作 | 功能 |
|------|------|------|
| 上 | 点击 | MENU（显示歌曲列表） |
| 左 | 点击 | 上一首（⏮） |
| 右 | 点击 | 下一首（⏭） |
| 下 | 点击 | 播放 / 暂停（⏯） |
| 中心 | 点击 | 确认选择 / 播放暂停 |
| 滚轮边缘 | 拖动旋转 | 调整音量（可选） |

**屏幕显示状态**：
- **播放中**：歌曲名（滚动显示如果太长）、艺术家名、播放进度条、当前时间 / 总时长
- **菜单模式**：歌曲列表，用滚轮上下选择，中心键确认
- **待机**：显示 "iPod" 和电池图标

**歌曲列表**（示例，静儿后续可替换）：
```
assets/music/
├── track01.mp3
├── track02.mp3
├── track03.mp3
└── ...
```

> ⚠️ **音乐版权提醒**：网站是公开发布的，直接放别人的 MP3 有版权风险。安全的做法：
> - 用免费商用音乐（推荐 freemusicarchive.org、pixabay.com/music、incompetech.com）
> - 或嵌入 Spotify/网易云播放器 widget（不用存 MP3 文件）
> - Lo-fi / chiptune / 8-bit 风格的免费音乐和网站复古氛围很搭
配套一个 `playlist.js`：
```javascript
const playlist = [
  { title: "...", artist: "...", file: "assets/music/track01.mp3" },
  // ...
];
```

**技术实现**：
- HTML5 `<audio>` 元素 + JavaScript 控制
- iPod 外壳是 Three.js 3D 模型上贴的 CSS3DRenderer HTML 面板
- 或者：iPod 模型屏幕区域用 texture 渲染一个 HTML canvas
- 播放状态全局共享（即使离开 3D 场景进入 JingerOS，音乐继续播放）
- JingerOS 里可以有一个小的"正在播放"浮窗（类似 macOS 的 Now Playing widget）

**动画细节**：
- 播放时 iPod 屏幕有微弱的背光脉冲
- 切歌时屏幕内容有淡出淡入过渡
- 滚轮按下时有微妙的按键下沉效果

### 4.10 Footer

- 社交链接用像素图标卡片（GitHub / 小红书 / Email / Resume）
- 底部 ASCII Art 装饰线
- `Built with ♥ and Claude Code`

---

## 5. Layout Principles

### Spacing System

```
--space-1:  4px     像素网格基础单位
--space-2:  8px     元素内间距
--space-3:  12px    紧凑间距
--space-4:  16px    标准间距
--space-6:  24px    区块内间距
--space-8:  32px    区块间距
--space-12: 48px    大区块间距
--space-16: 64px    页面区域间距
```

### Grid & Container

- 最大宽度：`1200px`，居中
- 项目卡片网格：桌面端 2 列，平板 1 列
- 所有尺寸遵循 4px 像素网格

### Whitespace Philosophy

大量留白。千禧复古不等于塞满屏幕。留白让 3D 拟物元素和 ASCII Art 背景有呼吸空间。

### Border Radius Scale

```
--radius-none: 0px      终端/命令面板（方正）
--radius-sm:   2px      像素风标签
--radius-md:   4px      卡片、输入框
--radius-lg:   8px      弹窗、对话框
```

圆角要克制！千禧复古风格偏方正，大圆角会破坏像素感。

---

## 6. Depth & Elevation

### Shadow System

```css
/* 早期 Windows 风格 — border 模拟 3D 凸起 */
--shadow-inset: inset -1px -1px 0 #999, inset 1px 1px 0 #fff;

/* 现代卡片浮起 */
--shadow-sm: 0 2px 8px rgba(26,26,46,0.06);
--shadow-md: 0 4px 16px rgba(26,26,46,0.08);
--shadow-lg: 0 8px 32px rgba(26,26,46,0.12);
--shadow-hover: 0 8px 24px rgba(26,26,46,0.15);
```

### Surface Layering

1. **Background**：ASCII Art 动态背景
2. **Content**：卡片、面板、内容区域
3. **Navigation**：顶部命令栏（固定）
4. **Overlay**：弹窗、终端面板、Playground
5. **Cursor**：鼠标跟随光晕（最顶层）

---

## 7. Interaction Patterns

### 7.1 ASCII Art 动态背景

- 全屏 Canvas 渲染 ASCII 字符矩阵
- 字符密度和亮度随鼠标位置变化
- 鼠标移动时波纹扩散效果
- 空闲时字符缓慢流动
- 用 requestAnimationFrame + Canvas 2D 渲染

### 7.2 滚动驱动动画

- **页面加载**：终端启动序列（逐行打印欢迎信息）
- **向下滚动**：内容块从下方滑入
- **项目卡片**：窗口依次"弹出"
- **时间线**：节点随滚动依次点亮
- **数据数字**：滚动到视口时数字滚动计数

### 7.3 Hover 交互

- **项目卡片**：抬起 4px + 标题栏变色 + 阴影加深
- **导航命令**：文字变绿 + 下划线动画
- **按钮**：Windows 按钮按下效果
- **3D 拟物图片**：轻微旋转（perspective transform）

### 7.4 斜杠命令系统

在 JingerOS 的 Terminal 窗口中输入：

```
/projects      → 打开 Projects 窗口
/about         → 打开 About Me 窗口
/playground    → 打开 Playground 窗口
/contact       → 打开 Contact 窗口（iPhone 4s）
/resume        → 下载简历 PDF
/shutdown      → CRT 关机 → 回到 3D 桌面场景
/theme dark    → 切换深色模式
/theme light   → 切换浅色模式
/help          → 显示所有可用命令
/easter-egg    → 触发彩蛋
/music play    → 播放 iPod 音乐
/music next    → 下一首
/music pause   → 暂停
```

### 7.5 Playground 功能

- 像素小游戏（打砖块 / 贪吃蛇 / 像素跳跳）
- ASCII Art 生成器
- 终端模拟器（探索静儿的"文件系统"）
- 像素画板

### 7.6 场景过渡动画

**3D 桌面 → JingerOS（开机）**：
1. 相机快速推进到电脑屏幕
2. 屏幕边框逐渐消失（全屏化）
3. Three.js Canvas 淡出，JingerOS HTML 淡入
4. 整个过程约 1.5 秒

**JingerOS → 3D 桌面（关机）**：
1. CRT 关机效果：画面亮度急升 → 压缩成水平一条白线 → 白线消失 → 黑屏
2. 黑屏持续 0.5 秒
3. Three.js 3D 桌面场景淡入
4. 电脑屏幕回到待机状态

**JingerOS 内窗口切换**：
- 窗口打开：从图标位置 scale(0) + opacity(0) → scale(1) + opacity(1)，带弹性 easing
- 窗口关闭：反向动画
- 窗口最小化：缩小到 Dock 对应图标位置（Genie 效果，简化版）

---

## 8. 3D & Visual Elements

### 3D 桌面场景（首页核心）

首页的 3D 场景是整个网站的视觉入口，用 Three.js 实时渲染。

**场景中的 3D 模型**：
| 模型 | 说明 | 来源建议 |
|------|------|---------|
| Macintosh Classic | 米色经典 Mac，带 CRT 屏幕，屏幕可交互 | Sketchfab GLTF |
| Apple Keyboard | 经典米色大键盘，Enter 键可点击 | Sketchfab GLTF |
| iPhone 4s | 不锈钢边框 + 玻璃背板，斜靠支架 | Sketchfab GLTF |
| iPod Classic | 白色抛光，圆形滚轮，小屏幕 | Sketchfab GLTF |
| 亚克力立牌 | 静儿的像素小人印在透明立牌上（见下方） | 自制（Three.js 几何体 + PNG 纹理） |

**Three.js 技术要点**：
- `WebGLRenderer` + `CSS3DRenderer` 双渲染器叠加
- CSS3DRenderer 用于在 Mac 屏幕和 iPod 屏幕上嵌入真实 HTML
- GLTF 模型用 `GLTFLoader` 加载
- 柔和光照：`AmbientLight` + `DirectionalLight`（右前方 45°）
- 接触阴影用 `ContactShadowMaterial` 或 `ShadowPlane`
- 相机：`PerspectiveCamera`，FOV 45°，略俯视
- 鼠标视差：监听 mousemove 微调相机位置（±2° 范围）

**低端设备降级**：
- 检测方式：`renderer.getContext().getExtension('WEBGL_debug_renderer_info')` 获取 GPU 信息
- 降级方案：隐藏 Three.js Canvas，显示预渲染的静态图 + CSS transform 视差
- 静态图需要预先截图 3D 场景，存放在 `assets/images/fallback/`

### 像素小人 — 双形态设计

静儿的像素小人在两个场景里以不同形态出现：

**形态 A：3D 亚克力立牌（开场 3D 桌面场景）**
- 透明亚克力板 + 圆角底座，正面印 `个人形象像素小人.png`
- Three.js 实现：`BoxGeometry`（很薄，约 0.05 厚度比）+ `MeshPhysicalMaterial`（transmission: 0.9, roughness: 0.1）模拟亚克力透明质感
- 正面用 `TextureLoader` 加载 PNG 作为贴图，`alphaTest: 0.5` 去掉白色背景
- 边缘在光照下有高光折射效果
- 底座是一个独立的小几何体
- 点击交互：弹出气泡

**形态 B：2D 桌面宠物（JingerOS 桌面内）**
- 纯 CSS/JS 实现，不依赖 Three.js
- 使用原图的缩小版（80-100px 高）
- 沿桌面边缘走动、可拖拽、可点击对话
- 步行动画需要 2-4 帧 sprite sheet（后续从原图制作）
- 详见 4.8 节「像素小人 — 桌面宠物」

---

## 9. Responsive Behavior

### Breakpoints

```
--bp-mobile:  0 - 639px
--bp-tablet:  640px - 1023px
--bp-desktop: 1024px+
```

### Mobile Adaptations

- 命令栏简化为汉堡菜单
- 项目卡片单列
- ASCII 背景降低密度
- 3D 拟物元素隐藏或缩小
- 所有可点击元素最小 44x44px

---

## 10. Do's and Don'ts

### Do's

- 像素字体只用于标题和装饰，正文必须用现代可读字体
- 保持大量留白
- 所有动画支持 `prefers-reduced-motion`
- 命令系统有友好的错误提示（输入未知命令 → 提示可用命令列表）
- 保持"好玩但专业"的平衡
- 内容优先于容器——先把项目 case study 写好，再打磨交互效果
- 所有功能都有非命令行的备用入口（不会打命令的人也能正常浏览）
- 3D 模型异步加载，首屏用 CSS 加载动画过渡

### Don'ts

- 不要所有文字都用像素字体
- 不要圆角过大（千禧复古偏方正）
- 不要用渐变色按钮
- 不要加背景音乐自动播放（iPod 必须手动点击播放）
- 不要让动画阻塞内容加载
- 不要在前端代码里硬编码 API 密钥（像素小人对话用预设文案，不调 AI API）
- 不要放有版权的 MP3 文件（用免费商用音乐或嵌入 Spotify）
- 不要一次实现所有功能——按 V1→V2→V3 迭代发布
- 不要用鼠标跟随的半透明 radial-gradient 光晕效果（2024-2025 AI 生成网站标配，一眼假）
- 不要用 Inter 作为唯一正文字体（改用 Space Grotesk，Inter 只作 fallback）
- 不要用 border-radius 大于 6px 的圆角（千禧复古偏方正，大圆角是现代 SaaS 风格）
- 不要在正文区域用 "Trusted by X companies" / "Join X users" 式 SaaS 话术
- 不要用紫色/蓝色大面积渐变背景（AI 生成网站的另一个标配）

---

## 11. Technical Stack

| 层 | 技术 | 原因 |
|---|------|------|
| 结构 | HTML5 | GitHub Pages 原生支持 |
| 样式 | CSS3 + CSS Variables | 主题切换、响应式 |
| 交互 | Vanilla JS + GSAP | 动画性能好 |
| ASCII 背景 | Canvas 2D API | 高性能字符渲染 |
| 3D 效果 | Three.js + CSS 3D Transforms | 实时 3D 场景（首页/Playground）+ 轻量 CSS 3D（卡片视差） |
| 字体 | Google Fonts | Press Start 2P + Silkscreen + Space Grotesk + JetBrains Mono + Noto Sans SC |
| 部署 | GitHub Pages | 免费 |

---

## 12. Reference Sites

| 网站 | 借鉴点 |
|------|--------|
| [zui.ooo](https://www.zui.ooo/) | 终端导航、命令行交互、文件系统隐喻、ASCII 美学 |
| [laxspace.co](https://www.laxspace.co/) | 3D 效果、大面积留白、积分系统 |
| [sethlukin.com](https://sethlukin.com/) | 像素风"点到为止"——小图标和装饰用像素，正文用现代字体 |
| [xiangyidesign.com](https://xiangyidesign.com/) | 设计师作品集结构 |
| [toddham.com](https://toddham.com/) | 3D 桌面场景、鼠标视差的克制（±2°）、物件摆放的随意感 |
| [daveos.fun](https://daveos.fun/) | OS 模拟作品集、窗口可用 overlay 模拟而非真实拖拽来降低复杂度 |

---

## 13. Performance Budget

3D 场景 + Canvas 渲染 + GSAP 动画同时运行，性能必须有明确约束。

### 帧率目标
| 环境 | 目标帧率 |
|------|---------|
| 桌面端（独显/集显） | 60fps |
| 移动端 | 30fps（3D 场景降级后） |

### 模型面数预算
| 模型 | 建议三角面数上限 |
|------|-----------------|
| Macintosh 128K | < 15K |
| Retro Keyboard | < 15K |
| iPod Classic | < 5K |
| iPhone 5s | < 5K |
| 亚克力立牌 | < 100（简单几何体） |
| **场景总计** | **< 50K 三角面** |

> 如果下载的模型面数超标，用 Three.js 的 `SimplifyModifier` 或 Blender 的 Decimate 工具减面。

### 加载时间目标
| 指标 | 目标 |
|------|------|
| 首屏可见（FCP） | < 2 秒 |
| 3D 场景可交互（TTI） | < 5 秒 |
| 总资源大小 | < 15MB（含所有 3D 模型和纹理） |

### 加载策略
- 首屏先显示 CSS 加载动画（CRT 启动效果），同时异步加载 Three.js 和 3D 模型
- 3D 模型用 `GLTFLoader` 按需加载，不要打包进主 JS
- 纹理图片压缩至 WebP 或降低分辨率（单张 < 512KB）
- 移动端完全跳过 Three.js，用预渲染静态图 + CSS 动画
- Canvas ASCII 背景在移动端关闭（不是"降低密度"，是直接不渲染）

---

## 14. Content Templates

容器再酷，核心竞争力是项目案例本身。

### 14.1 项目 Case Study 模板

每个项目在 Projects 窗口打开后，按这个结构展示：

```
┌─── CareerForge ──────────────────────────────────────┐
│                                                      │
│  [项目截图 / 演示 GIF — 占窗口上半部分]               │
│                                                      │
│  ── What ──                                          │
│  一句话说清这是什么。                                  │
│  例："一个帮求职者用 AI 优化简历的开源工具"            │
│                                                      │
│  ── Why ──                                           │
│  为什么要做？解决什么问题？                            │
│  例："发现身边很多人简历写得好但投递转化率低..."        │
│                                                      │
│  ── How ──                                           │
│  我做了什么？用了什么技术/方法？                       │
│  例："Claude API + RAG 检索 + 岗位匹配算法..."        │
│                                                      │
│  ── Result ──                                        │
│  成果数据。                                           │
│  例："GitHub 102⭐ · 被 3 个技术博主推荐"              │
│                                                      │
│  [GitHub 链接]  [在线演示]                             │
│                                                      │
└──────────────────────────────────────────────────────┘
```

**项目截图/GIF 规格**：
- 尺寸：1200x800px（或 16:9 比例）
- 格式：WebP 优先（比 PNG 小 60%），GIF 用于演示交互
- 风格：带浏览器外框截图，或带手机框截图（和复古主题呼应）

### 14.2 About Me 叙事结构

About Me 窗口包含三个区域：

**区域 1：终端面板** `$ whoami`
- 终端命令风格，展示身份、当前状态、技能目录、理念
- 完整文案见 `JingerOS_内容规划与文案_v2.md` 1.1 节

**区域 2：故事版长文**（正文排版，非终端字体）
- 标题：「从翻译到 AI：一条不太典型的路」
- 弧线：国际教育 3 年（500+ 文书 = 需求分析训练）→ 2025 年 Claude Code 觉醒 → 6 个月 5 个项目
- 核心金句："我不是工程师，但我能设计系统。我不写代码，但我知道代码应该做什么。"
- 完整文案见 `JingerOS_内容规划与文案_v2.md` 1.2 节

**区域 3：数据亮点条**（滚动计数动画）
```
  5+ AI Projects  ·  6 months+ Vibe Coding  ·  18,000+ XHS Likes  ·  104 ⭐ GitHub Stars  ·  3 Languages
```

### 14.3 项目数据清单

文案已就绪（见 `JingerOS_内容规划与文案_v2.md` 第 2 节），截图仍需准备：

**S 级（完整 Case Study）**：
| 项目 | 一句话 | 结果 | 截图 |
|------|--------|------|------|
| Remoire | 一个让 AI 真正"记住你"的陪伴产品 | 300+ 条结构化记忆，月成本 ¥15-50 | ❓ 待截图 |
| 小红书生成器 | 把 30 分钟排版流程压缩到 1 分钟 | GitHub 开源，社群实际使用 | ❓ 待截图 |
| CareerForge | AI 驱动的完整求职链路工具 | 104 ⭐ GitHub Stars | ❓ 待截图 |

**A 级（简要卡片）**：
| 项目 | 一句话 | 截图 |
|------|--------|------|
| AI 聊天平台 | 具有完整社交功能的 AI 角色扮演聊天 Bot 平台 | ❓ 待截图 |
| 法语学习平台 | 拆解纯法语教材，构建 A1 讲义体系与练习题库 | ❓ 待截图 |
| AI 内容创作 | 小红书 AI 实战内容，18,000+ 赞与收藏 | ❓ 待截图 |

---

## 15. Accessibility（可访问性）

### 基本要求
- 所有文字与背景的对比度 ≥ 4.5:1（WCAG AA 标准）
- ASCII 背景上方的文字需要有半透明底色垫层，保证可读性
- 所有可交互元素（按钮、链接、窗口控制）最小尺寸 44x44px

### 键盘导航
- 完整的 Tab 键导航路径：导航栏 → 桌面图标 → 窗口内容 → Dock
- 所有可交互元素有可见的 focus 样式（绿色虚线框，和终端主题呼应）
- Escape 键关闭当前窗口
- Enter 键在桌面图标上 = 双击打开

### 屏幕阅读器
- 3D 桌面场景加 `role="img"` + `aria-label="静儿的虚拟桌面，包含电脑、键盘、iPod和手机"`
- 所有装饰性动画加 `aria-hidden="true"`
- JingerOS 窗口加 `role="dialog"` + `aria-label`
- 桌面图标加 `role="button"` + `aria-label`

### 动画偏好
```css
@media (prefers-reduced-motion: reduce) {
  /* 关闭所有动画：CRT 开机、窗口弹出、小人走动、ASCII 背景 */
  /* 3D 场景改为静态截图 */
  /* 保留内容，只去掉运动 */
}
```

### 备用导航路径
3D 场景和命令行交互对部分用户门槛较高，需要备用入口：
- 3D 桌面场景底部有纯文字链接："直接进入作品集 →"（跳过 3D 直接进 JingerOS）
- JingerOS 内除了双击图标，Dock 栏本身就是可点击的备用导航
- Terminal 的斜杠命令是进阶功能，所有功能都必须能通过点击图标/Dock 完成

---

## 16. Version Roadmap（分阶段发布）

一次做完所有功能不现实。分三个版本，先上线再迭代。

### V1 — MVP（先让网站能看能用）

**包含**：
- 首页 Hero（像素字体标题 + 终端风格自我介绍 + CRT 扫描线 CSS 效果）
- 斜杠命令风格导航栏（实际是可点击的链接）
- 项目卡片（macOS 窗口样式，3-5 个项目，含 case study 内容）
- About Me 页面（终端面板风格 + 时间线）
- iPhone 4s 联系卡
- Footer
- 响应式适配
- JingerOS 窗口系统基础版（可拖拽 + 红黄绿三按钮 + 窗口层级管理）

**不包含**：3D 场景、iPod、像素小人、ASCII Canvas、Playground

**目标**：一个有强烈视觉个性的静态作品集，能投递求职用

### V2 — 氛围升级

在 V1 基础上加：
- CRT 开机/关机过渡动画
- JingerOS 桌面系统完善（Dock 栏 + 最小化吸入动画 + 桌面图标双击打开）
- 斜杠命令系统（Terminal 窗口内）
- Hover 微交互全面完善
- 深色/浅色主题切换
- 滚动驱动动画（GSAP ScrollTrigger）

### V3 — 全部展开

- Three.js 3D 桌面场景（开场动画）
- iPod 音乐播放器
- 像素小人（3D 立牌 + 2D 桌面宠物）
- Canvas ASCII 动态背景
- Playground 小游戏
- 积分/彩蛋系统
- 窗口可调整大小（resize 拖拽手柄）

---

## 17. 中英双语支持

### 切换方式
- URL 路径前缀：中文 `/zh/`（默认），英文 `/en/`
- 根据浏览器 `navigator.language` 自动跳转，右上角有手动切换按钮
- 切换按钮设计（终端风格）：`[EN / 中]` 小药丸按钮在导航栏右侧
- V1 阶段可以先只做中文版，英文版在 V2 加入

### 内容差异化策略
中英版本不是逐字翻译，语气和侧重点有差异：

| 板块 | 中文版侧重 | 英文版侧重 |
|------|-----------|-----------|
| About Me | 跨界叙事，"翻译→AI"的个人故事感 | Professional positioning，突出"non-engineer who ships" |
| Projects | 技术深度 + 产品思维并重 | 偏重 impact 和 methodology |
| Timeline | 完整经历 | 精简到 AI 相关经历为主 |
| Contact | 小红书 + Email + GitHub | LinkedIn + Email + GitHub |

完整的英文版文案见 `JingerOS_内容规划与文案_v2.md` 第 5 节。

### 技术实现
- 纯静态方案：`/zh/index.html` 和 `/en/index.html` 各一份
- 共享 CSS 和 JS，只有 HTML 内容不同
- 语言切换按钮用 JS 跳转对应路径

---

## 18. SEO & Meta

### 基础 Meta 标签
```html
<!-- 中文版 -->
<title>周静儿 Jinger Zhou — AI 产品经理 · AI Native Builder</title>
<meta name="description" content="AI 产品经理周静儿的个人作品集。6 个月 Vibe Coding 实战，5+ 个全栈 AI 项目，开源项目获 100+ GitHub Stars。">

<!-- 英文版 -->
<title>Jinger Zhou — AI Product Manager · AI Native Builder</title>
<meta name="description" content="Portfolio of Jinger Zhou. 6+ months of Vibe Coding, shipped 5+ full-stack AI products. Open-source project with 100+ GitHub Stars.">
```

### Open Graph（分享卡片）
```html
<meta property="og:title" content="Jinger Zhou — AI Product Manager">
<meta property="og:description" content="翻译出身的 AI Native Builder，用产品思维驾驭 AI 能力。">
<meta property="og:image" content="assets/images/og-image.png">
<meta property="og:type" content="website">
```

### OG Image 规格
- 尺寸：1200×630px
- 风格：像素风格 + 名字 + 标语 + 千禧复古配色
- 中英各一张（`og-image-zh.png`、`og-image-en.png`）
