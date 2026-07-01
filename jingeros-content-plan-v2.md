# JingerOS 网站内容规划 — 文案、案例与展示方案

> **文档角色**：全站中英文案、各磁带项目 section 规划与叙事。  
> **代码地图 & 实现状态** → 见 [`CLAUDE.md`](./CLAUDE.md)（含五盘磁带完成度表）

> Connie × 静儿 · 2026.06.17
> 目标用户：招聘方 + 潜在合作者

---

## 1. About Me — 个人简介

### 1.1 终端面板版本（Terminal Window 内）

这是 JingerOS 里 Terminal 窗口的内容，也是网站 `/about` 的核心。用终端命令的隐喻来组织信息，但内容本身要有温度、有叙事、有记忆点。

```
$ whoami
──────────────────────────────────────────────

  周静儿 / Jinger Zhou
  AI Product Manager · AI Native Builder · Vibe Coder

  我不是程序员出身——我的专业是英语翻译，硕士读的是传媒方向笔译。
  2025 年我第一次打开 Claude Code，从那以后一切都变了。

  我发现我真正擅长的不是写代码，
  而是告诉 AI 应该写什么代码。
  需求拆解、系统设计、产品架构——
  这些才是我的母语。

  6 个月里我从零搭建了 5 个 AI 项目，
  全部通过 Vibe Coding 完成。
  开源项目 CareerForge 获 100+ GitHub Stars。
  小红书 AI 实战内容累计 18,000+ 赞与收藏。
  我写 PRD，AI 写代码，一起 ship。

$ cat current_status.txt
──────────────────────────────────────────────

  📍 广州
  🔍 Looking for: AI 产品经理 / AI Native 团队
  💡 Superpower: 翻译出身 → 天生擅长"翻译"需求和技术之间的鸿沟
  🌐 Languages: 中文 / English (IELTS 7.5) / Français (learning)

$ ls skills/
──────────────────────────────────────────────

  ai-dev/         Claude Code, Cursor, Codex, MCP, Prompt Engineering
  product/        需求拆解, 用户场景分析, 竞品分析, 项目管理
  design/         Figma, Claude Design, Google AI Studio
  automation/     业务流程自动化, Hook 机制, Skill 模板
  languages/      英语专八, CATTI 二笔, 雅思 7.5, 法语 A1

$ cat philosophy.txt
──────────────────────────────────────────────

  我相信未来最稀缺的不是会写代码的人，
  而是知道「为什么要写这段代码」的人。

  AI 不需要你教它语法，
  它需要你告诉它：用户要什么，边界在哪里，
  什么是好的，什么是不够好的。

  这就是产品经理的价值。
  在 AI Native 时代，这个价值只会更大。
```

### 1.2 故事版 About Me（非终端区域，正文排版）

用于 About Me 窗口的正文区域（在终端面板下方或独立 tab），用 Inter/Noto Sans 正文字体，更适合深度阅读。

---

**从翻译到 AI：一条不太典型的路**

我的职业起点和 AI 完全没有关系。

2021 年研究生毕业后，我做了三年国际教育——先在新东方帮学生写申请文书，后来在广州外国语学校做升学顾问。这段经历教会我的最重要的事不是教育行业知识，而是：**怎么把一个人的复杂经历，提炼成一个清晰的故事**。

500+ 份文书、20+ 名学生的全流程规划、100+ 份 offer——每一个背后都是一次「需求分析 → 策略设计 → 交付验证」的完整循环。后来我意识到，这和产品经理做的事情是一样的。

2025 年初，我开始重度使用 Claude Code 做 Vibe Coding。六个月里，我从零搭建了 5 个完整项目——包括一个有四层记忆系统的 AI 陪伴产品、一个开源的小红书内容生成工具、一个获得 100+ GitHub Stars 的 AI 求职工具包。全栈。从 PRD 到数据库设计到前端界面到部署上线，全部是我一个人和 AI 一起完成的。同时在小红书分享 AI 实战内容，累计收获 18,000+ 赞与收藏，多篇笔记达 2-3 万+ 浏览量。

我不是工程师，但我能设计系统。我不写代码，但我知道代码应该做什么。

这就是我想做的事：**用产品思维驾驭 AI 能力，把复杂问题变成好用的工具。**

---

### 1.3 数据亮点条（可视化数字）

在 About 区域顶部或中间穿插，用滚动计数动画（scroll-triggered counter），像素风标签样式。

```
┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│   5+          │  │   6 months+  │  │   18,000+    │  │   104 ⭐      │  │   3           │
│   AI Projects │  │   Vibe Coding│  │   Likes &    │  │   GitHub     │  │   Languages   │
│   Shipped     │  │   Experience │  │   Saves on XHS│  │   Stars      │  │   spoken     │
└──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘
```

---

## 2. 项目案例（Case Studies）

### 展示策略

你有 5-6 个项目，但不是所有项目都值得占同等篇幅。建议分两档：

- **S 级（完整 Case Study）**：Remoire、小红书生成器、CareerForge —— 这三个最能体现你的能力，有技术深度也有差异化
- **A 级（简要卡片）**：AI 聊天平台、法语学习平台、小红书内容运营 —— 简要展示，点到为止

---

### 2.1 Remoire — AI 陪伴产品（S 级）

**窗口标题栏**：`📁 Remoire — AI Companion System`
**标签**：`[全栈]` `[Claude Code]` `[MCP]` `[向量语义]` `[Private]`

**一句话**：
一个让 AI 真正"记住你"的陪伴产品。不是聊天工具，是关系空间。

**问题（Why）**：
现有的 AI 聊天产品（ChatGPT、Claude）有一个根本问题：每次对话都是从零开始。AI 不记得你昨天说了什么，不知道你最近在焦虑什么，更不会在你需要的时候主动找你。这不是真正的"陪伴"，这只是"问答"。

**方案（What）**：
我设计并搭建了 Remoire —— 一个拥有四层动态记忆系统的 AI 陪伴 PWA。

核心架构：
- **四层记忆系统**：Core（关系基石）→ Long（长期记忆）→ Short（临时上下文）→ Consciousness（AI 自我状态），模拟人脑从核心记忆到工作记忆的层级
- **双通道检索**：关键词精确匹配 + BGE-M3 向量语义搜索，解决了纯语义搜索把"学韩语"和"学法语"混为一谈的问题
- **情感感知**：Russell 环形模型标注 valence（正负）和 arousal（强度），高情绪记忆召回时优先浮现
- **自然衰减**：记忆权重按天衰减，被触发的记忆"活下来"，不被需要的自然淡化
- **多入口统一**：自有 PWA 前端、Claude.ai（通过 MCP）、微信（通过 iLink API）共享同一份记忆和人格设定
- **主动消息系统**：AI 不只被动回复，还会根据时间、上下文、情绪状态主动找你——早安、关心、追问未完成的事

技术栈：FastAPI + SQLite + 硅基流动 BGE-M3（向量嵌入）+ FastMCP + SSE + Web Push + iLink API（微信桥接）

**过程（How）**：
从 PRD 到数据库设计到后端 API 到前端界面，全部由我独立完成产品设计，通过 Claude Code Vibe Coding 实现。我写的不是代码，是完整的系统设计文档——PRD、技术栈选型、数据库 Schema、API 规范、Prompt 工程——然后和 AI 一起把它变成可运行的产品。

记忆系统的设计参考了我自己发布的 Living Memory Architecture 框架。

**数据**：
- 300+ 条结构化记忆，覆盖事实、事件、情感、未解决事项
- 四层记忆 + 候选确认机制 + 去重引擎 + 情感回填
- 月 LLM 成本控制在 ¥15-50

**我学到的**：
这个项目让我深刻理解了"产品设计"和"功能堆砌"的区别。记忆系统不是越多越好——做减法比做加法难十倍。比如"脱水压缩"功能我到现在都没做，因为 300 条记忆还不需要它。知道什么时候不做，比知道怎么做更重要。

> **注意**：Remoire 是私有项目，仓库不公开。如果你对技术架构细节感兴趣，欢迎联系我交流。

---

### 2.2 小红书笔记图片生成工具（S 级）

**窗口标题栏**：`📁 RedNote Generator — Content Creation Tool`
**标签**：`[开源]` `[Vibe Coding]` `[内容自动化]` `[模板系统]`

**一句话**：
把手动排版、标签整理、图片导出的 30 分钟流程，压缩到 1 分钟。

**问题（Why）**：
小红书内容创作者每天要做大量重复劳动：写文案 → 整理标签 → 排版图片 → 导出 → 发布。尤其是图片笔记的排版——调字体、调间距、调布局——每篇花 20-30 分钟。这不是创作，这是体力活。

**方案（What）**：
一个面向小红书创作者的一键图片生成工具。输入想法和素材，自动输出可直接发布的图片 + 正文 + 标签。

核心功能：
- 多套设计模板，覆盖不同内容类型
- 类富文本框交互，支持自定义编辑
- 批量导出可直接发布的图片
- 不内置 AI 模型，用户自行配置 API Key，架构灵活
- 已开源至 GitHub

**结果**：
- GitHub 开源
- 解决了自己和社群成员的真实痛点
- 作为 Vibe Coding 实战案例在小红书分享后引发广泛关注

**为什么这个项目重要**：
它证明了我不只能做"给自己用的工具"，还能做"给别人用的产品"。从需求定义到模板系统设计到开源文档，完整走了一遍产品生命周期。

---

### 2.3 CareerForge — AI 求职工具包（S 级）

**窗口标题栏**：`📁 CareerForge — AI Career Toolkit`
**标签**：`[开源]` `[Claude Code Skill]` `[模板系统]` `[PDF 自动化]` `[⭐ 104 Stars]`

**一句话**：
一套 AI 驱动的完整求职链路工具——从简历到 Cover Letter 到模拟面试。

**问题（Why）**：
求职者需要的不是一个"帮你改简历"的 AI，而是一个理解整个求职流程的系统。简历优化、风格适配、Cover Letter 针对性调整、模拟面试——这些环节之间是相互关联的，但市面上的工具都是孤立的。

**方案（What）**：
基于 Claude Code Skill 机制构建的结构化求职工具包：
- **简历智能匹配**：上传简历 + 职位描述，AI 分析匹配度并给出优化建议
- **7 种专业排版模板**：从极简到学术风格，涵盖不同行业需求
- **Cover Letter 生成**：根据简历 + 职位自动生成针对性 Cover Letter
- **模拟面试**：基于职位描述生成面试问题，AI 扮演面试官
- **自动化 PDF 导出**：一键输出排版完整的专业文档

**技术亮点**：
通过 Claude Code 的 Skill 机制实现结构化对话式交互——不是简单的"帮我改简历"，而是分步引导用户完成信息收集 → 策略生成 → 文档输出的完整链路。

**结果**：
- GitHub 开源后获得 **104 Stars**，是个人项目中社区反响最好的
- 被多位求职者实际使用并反馈有效

---

### 2.4 AI 角色扮演聊天平台（A 级卡片）

**标签**：`[HTML/CSS/JS]` `[Supabase]` `[实时同步]`

具有完整社交功能的 AI 聊天 Bot 平台。支持角色扮演、群聊、用户管理。前端纯 HTML/CSS/JS，后端 Supabase 实现用户认证与实时数据同步。

---

### 2.5 法语学习平台（A 级卡片）

**标签**：`[Vibe Coding]` `[教育产品]` `[内容结构化]`

拆解纯法语教材，构建完整 A1 讲义体系与练习题库。设计错题池实现个性化学习路径。体现从教学内容到产品功能的系统性设计能力。

---

### 2.6 AI & Vibe Coding 内容创作（A 级卡片）

**标签**：`[内容运营]` `[社区建设]` `[AI 布道]`

在小红书持续输出 AI 工具使用与 Vibe Coding 实战内容。累计 18,000+ 赞与收藏，多篇笔记达 20,000-30,000+ 浏览量。建立粉丝交流社群，具备 AI 领域内容传播力与社区运营能力。

---

## 3. 经历展示方案

### 3.1 时间线展示（推荐方案）

保留你 DESIGN.md 里的时间线设计，但需要优化内容。目前的时间线只有标题没有 substance，招聘方看不出价值。

优化后的时间线：

```
  2017 ──●── 浙江农林大学 · 英语学士
           │  GPA 3.85/4.0 · 专业前 5%
           │
  2021 ──●── 广东外语外贸大学 · 翻译硕士（传媒方向）
           │  GPA 3.8/4.0 · 校奖学金一等奖 × 2
           │  管理 71 人译审团队
           │
  2022 ──●── 树根互联 · 翻译实习生（产品方向）
           │  10 万+ 字技术文档 · 竞品分析 · 流程优化
           │
  2023 ──●── 新东方 SFK · 留学指导老师
           │  500+ 文书项目 · 100+ offer · 面试通过率 90%+
           │
  2024 ──●── 广州外国语学校 · 升学指导顾问
           │  20+ 学生全流程 · 100+ 夏校数据库
           │  社媒运营 30+ 内容 · 20,000+ 浏览
           │
  2025 ──◉── AI Native Builder 觉醒
           │  6 个月 · 5 个 AI 项目从 0 到 1
           │  小红书 18,000+ 赞与收藏 · 多篇 2-3 万+ 浏览
           │  开源项目 CareerForge 获 100+ GitHub Stars
           │  AI 开发方法论沉淀
           │
  NOW  ──◈── Seeking AI Product Manager Role
```

### 3.2 不建议在网站上完整展示简历

你的 HTML 简历已经非常完整了。在个人网站上重复展示全部内容是冗余的。建议：

- 时间线做精简版（如上）
- 简历 PDF 放在 Contact 区域的下载按钮
- 或者在 JingerOS 的 Resume 窗口里嵌入一个 iframe 预览你的 HTML 简历，旁边放一个 "Download PDF" 按钮

### 3.3 方法论板块（加分项）

你简历上的"AI 开发方法论沉淀"部分非常有差异化价值，建议在网站上做一个独立的小展区：

**标题**：`$ cat methodology.md`

| 方法 | 说明 |
|------|------|
| **Handover Skill** | 跨 Session 交接文档，AI 换窗口也不丢上下文 |
| **Reflect Skill** | 复盘学习机制，自动将经验沉淀为 Rules |
| **Auto Hook** | 窗口压缩前自动触发 Handover，流程标准化 |
| **Memory MCP** | 可复用的记忆集成工具，支持跨平台 AI Agent |
| **AI 工作流集成** | MCP 接入飞书 + Notion，日报自动化、文档自动整理 |

这个板块告诉招聘方：她不只是会用 AI 工具，她还总结出了可复用的方法论。这是从"使用者"到"建设者"的跃升。

---

## 4. Contact 部分设计

### 4.1 保留 iPhone 4s 联系卡（快速联系）

你原来的 iPhone 4s 设计很好，作为"直接联系"的入口保留。但需要补充一个表单入口。

### 4.2 新增：合作意向表单

表单不需要复杂——你是静态网站（GitHub Pages），没有后端。推荐用以下方案之一处理表单提交：

**推荐方案：Formspree（免费 50 次/月）**

表单直接提交到 Formspree，邮件会发到你的邮箱。零后端、零维护。

**表单设计（终端风格）**：

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
│  │                                                 │  │
│  │                                                 │  │
│  │                                                 │  │
│  │ _                                               │  │
│  └─────────────────────────────────────────────────┘  │
│                                                       │
│  [▸ Send Message]                                     │
│                                                       │
│  Or reach me directly:                                │
│  → z17326084778@163.com                               │
│  → github.com/rebecha1227-a11y                        │
│  → 小红书 @静儿的AI笔记                                │
│                                                       │
└───────────────────────────────────────────────────────┘
```

**表单字段**：

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| Name | text | ✅ | 你的名字 |
| Email | email | ✅ | 回复用的邮箱 |
| Type | radio | ✅ | 合作/招聘/打招呼/技术问题 |
| Message | textarea | ✅ | 具体内容 |

**提交后反馈（终端风格）**：

```
$ send message...
> ✓ Message sent successfully!
> Jinger will reply within 24-48 hours.
> Thank you for reaching out! ☺
```

**Formspree 接入代码（给 AI 生成时参考）**：

```html
<form action="https://formspree.io/f/{YOUR_FORM_ID}" method="POST">
  <input type="text" name="name" required placeholder="Your name">
  <input type="email" name="email" required placeholder="Your email">
  <select name="type" required>
    <option value="collaboration">Collaboration / Project</option>
    <option value="job">Job Opportunity</option>
    <option value="hello">Just saying hi</option>
    <option value="technical">Technical Question</option>
  </select>
  <textarea name="message" required placeholder="Your message"></textarea>
  <button type="submit">Send Message</button>
</form>
```

注册 Formspree (formspree.io) 后创建一个 form，把生成的 form ID 替换进去即可。免费版每月 50 次提交，对个人网站完全够用。

### 4.3 Contact 区域的信息优先级

根据目标用户（招聘方 + 合作者），联系信息优先级应该是：

1. **Email**（最重要，专业沟通首选）
2. **合作表单**（降低联系门槛，让对方结构化表达意图）
3. **GitHub**（展示技术能力和开源贡献）
4. **LinkedIn**（如果有的话，对招聘方很重要）
5. **小红书**（展示内容运营能力）
6. **Resume PDF 下载**（招聘方需要）
7. **Phone**（最不重要，建议在公开网站上隐藏或模糊处理）

**关于手机号**：你的 DESIGN.md 里 iPhone 4s 联系卡显示了完整手机号。在面向公众的网站上建议去掉或改为"Available upon request"。Email 和表单足够了。

---

## 5. 整体内容架构建议

把你的六个"窗口"内容整理如下：

| 窗口 | 核心内容 | 访客停留目标 |
|------|---------|------------|
| **About Me** | 个人故事 + 终端 whoami + 数据亮点 + 方法论 | 让人记住"翻译出身的 AI Native Builder" |
| **Projects** | 3 个 S 级 Case Study + 3 个 A 级卡片 | 证明"她真的能从 0 到 1 做出产品" |
| **Timeline** | 经历时间线（精简版 + 数据点） | 理解她的成长路径和跨界故事 |
| **Resume** | HTML 简历预览 + PDF 下载（中英各一份） | 给招聘方一个可直接使用的文件 |
| **Contact** | 合作表单 + iPhone 4s 快速联系 | 降低"联系她"的门槛 |
| **Terminal** | 命令行彩蛋 + 快捷导航 | 趣味性，展示技术理解深度 |
| **🌐 Lang** | 中英双语切换（`/zh` `/en`） | 覆盖国内招聘方 + 海外/外企合作者 |

---

## 附：SEO 和 Meta 信息

别忘了这些对招聘方搜索可见性很重要的基础设施：

**中文版**：
```html
<title>周静儿 Jinger Zhou — AI 产品经理 · AI Native Builder</title>
<meta name="description" content="AI 产品经理周静儿的个人作品集。6 个月 Vibe Coding 实战经验，主导完成 5+ 个全栈 AI 项目，开源项目获 100+ GitHub Stars。擅长需求拆解、系统设计、Prompt Engineering。">
<meta property="og:title" content="Jinger Zhou — AI Product Manager">
<meta property="og:description" content="翻译出身的 AI Native Builder，用产品思维驾驭 AI 能力。">
<meta property="og:image" content="og-image.png">
```

**英文版**：
```html
<title>Jinger Zhou — AI Product Manager · AI Native Builder</title>
<meta name="description" content="Portfolio of Jinger Zhou, AI Product Manager. 6+ months of Vibe Coding experience, shipped 5+ full-stack AI products from zero. Open-source project with 100+ GitHub Stars. Expert in requirements analysis, system design & prompt engineering.">
<meta property="og:title" content="Jinger Zhou — AI Product Manager">
<meta property="og:description" content="From translation to AI: a non-engineer who designs systems, ships products, and bridges the gap between ideas and implementation.">
<meta property="og:image" content="og-image-en.png">
```

OG Image 建议做一张 1200×630 的预览图，用你的像素风格 + 名字 + 标语，这样分享链接时有好看的卡片预览。中英各一张。

---

## 附：中英双语版本方案

网站计划支持中英双语切换，以下是实现建议和内容策略。

### 语言切换方式

**推荐方案：路由前缀**
- 中文版：`jingerzhou.com/` 或 `jingerzhou.com/zh/`
- 英文版：`jingerzhou.com/en/`
- 默认根据浏览器语言自动跳转，右上角有手动切换按钮

切换按钮设计（终端风格）：
```
$ locale --set en_US  ⇄  $ locale --set zh_CN
```
或简洁版：`[EN / 中]` 小药丸按钮放在导航栏右侧。

### 内容翻译策略

不是逐字直译——中英版本的语气和侧重点应该有差异：

| 板块 | 中文版侧重 | 英文版侧重 |
|------|-----------|-----------|
| About Me | 跨界叙事，"翻译→AI"的个人故事感 | Professional positioning，突出"non-engineer who ships" |
| Projects | 技术深度 + 产品思维并重 | 偏重 impact 和 methodology |
| Timeline | 完整经历 | 精简到 AI 相关经历为主 |
| Contact | 小红书 + Email + GitHub | LinkedIn + Email + GitHub |
| 方法论 | 详细展开 | 用更简洁的 bullet points |

### 英文版 About Me 终端面板参考

```
$ whoami
──────────────────────────────────────────────

  Jinger Zhou
  AI Product Manager · AI Native Builder · Vibe Coder

  I didn't start in tech — my background is in
  English translation and media studies.

  In early 2025, I opened Claude Code for the first time.
  Everything changed.

  What I discovered is that my real skill isn't writing code —
  it's telling AI what code to write.
  Requirements analysis, system design, product architecture —
  that's my native language.

  In 6 months, I shipped 5 AI products from scratch,
  all through Vibe Coding.
  I write PRDs, AI writes code, we ship together.

$ cat current_status.txt
──────────────────────────────────────────────

  📍 Guangzhou, China
  🔍 Looking for: AI Product Manager / AI Native Team
  💡 Superpower: Translation background → naturally skilled at
     "translating" between business needs and technical solutions
  🌐 Languages: Chinese (native) / English (IELTS 7.5) / French (learning)

$ ls achievements/
──────────────────────────────────────────────

  5+ AI products shipped from zero to production
  100+ GitHub Stars on open-source career toolkit
  18,000+ likes & saves on Xiaohongshu (Chinese social platform)
  Full-stack product delivery: PRD → DB design → API → frontend → deploy
```

### 英文版故事 About Me 参考

**From Translation to AI: A Non-Typical Path**

My career started far from tech.

After my master's in Translation Studies, I spent three years in international education — first at New Oriental helping students craft application essays, then as a college counselor at Guangzhou Foreign Language School. The most important thing those years taught me wasn't about education. It was this: **how to distill a person's complex experience into a clear, compelling story.**

500+ essays, 20+ students guided end-to-end, 100+ offers landed — each one was a full cycle of "needs analysis → strategy design → delivery." I later realized that's exactly what a product manager does.

In early 2025, I started using Claude Code for Vibe Coding. In six months, I shipped 5 complete products from scratch — including an AI companion app with a four-layer memory system, an open-source content creation tool, and an AI career toolkit that earned 100+ GitHub Stars on GitHub. Full-stack. From PRD to database schema to frontend to deployment, all designed by me and built with AI.

I'm not an engineer, but I design systems. I don't write code, but I know exactly what the code should do.

**That's what I'm here for: using product thinking to harness AI capabilities and turn complex problems into tools that work.**

---

*这份文档涵盖了网站的全部内容规划（中英双语）。文案可以直接作为 AI 生成网站代码时的 prompt 素材。英文版文案不是机械翻译，而是根据英文语境重新组织了语气和侧重点。如果需要调整语气、补充细节，或者把某个 case study 展开得更详细，随时告诉我。*
