# Vibe Coding Roller 🎲

> 随机决策 · 灵感生成 · 今天写什么？  
> Random Decision · Idea Generator · What to code today?

*[English below](#english)*

---

## 中文

### 这是什么？

**Vibe Coding Roller** 是一个趣味随机灵感决策工具。当你不知道今天该写什么代码时，让命运帮你决定 —— 掷骰子、抽卡牌、转盘、起卦、翻黄历……10 种模式，650+ 灵感选项，给你一个无法拒绝的 coding 方向。

### 功能模式

| 模式 | 图标 | 说明 |
|------|------|------|
| 掷硬币 | 🪙 | 二元对立随机决策，20 组经典程序员难题 |
| 骰子 | 🎲 | 3D 骰子动画，6 个 coding 方向任你选 |
| 转盘 | 🎡 | Canvas 幸运转盘，8 选 1 华丽定格 |
| 抽卡 | 🃏 | 牌堆翻转动画，60 张具体任务卡等你抽 |
| 决策树 | 🌳 | 层层分支持续缩小方向，走到底就是答案 |
| 梅花易数 | ☯ | 三枚铜钱起卦，64 卦映射 coding 哲学解读 |
| 分组 | 👥 | 输入 N 个人/事，随机分成 M 组 |
| 黄历 | 📅 | 基于日期的今日 coding 宜忌，每日更新 |
| 创意工厂 | 🏭 | 模板填空：给`[谁]`用`[什么]`做`[功能]`发布为`[平台]`，每空位可自选随机模式 |
| 灵感 Trends | 🔥 | 发布想法到灵感广场，❤️ 点赞，热度排行 |

### 技术栈

- 纯 **HTML / CSS / JavaScript**，零依赖
- CSS 3D Transform 骰子动画
- Canvas 转盘绘制
- LocalStorage 数据持久化
- 响应式设计，适配移动端

### 本地运行

直接用浏览器打开 `index.html` 即可，无需任何构建工具或服务器：

```bash
open index.html
```

### 部署

推送到 GitHub Pages 即可直接部署：

1. GitHub 仓库 → Settings → Pages
2. Source 选择 `main` 分支，根目录 `/ (root)`
3. 保存，等待部署完成

### 项目结构

```
proj_1/
├── index.html              # 主页面
├── css/
│   └── style.css           # 暗色霓虹主题样式
├── js/
│   ├── app.js              # 入口 + 模式路由
│   ├── topics.js           # 650+ 选项池数据
│   ├── utils.js            # 通用工具函数
│   └── modes/
│       ├── coin.js         # 掷硬币
│       ├── dice.js         # 骰子
│       ├── wheel.js        # 转盘
│       ├── card.js         # 抽卡
│       ├── tree.js         # 决策树
│       ├── iching.js       # 梅花易数
│       ├── group.js        # 分组
│       ├── almanac.js      # 黄历
│       ├── factory.js      # 创意工厂
│       └── trends.js       # 灵感Trends
└── LICENSE                 # MIT
```

### 选项池

覆盖 ~650 条灵感选项，包括但不限于：

- **目标用户** 140+：程序员、钓鱼佬、克苏鲁信徒、MBTI 中毒者……
- **技术工具** 145+：Python、Canvas、Arduino、便利贴、手机振动马达……
- **功能项目** 128+：屏幕宠物、阴谋论生成器、代码屎山 3D 可视化……
- **发布平台** 25 种：小程序、Telegram Bot、Electron、Chrome 扩展……
- **更多**：60 张任务卡、64 卦 coding 哲学、20 组程序员二元对立……

### 后续计划

- [ ] 更多创意模式（占卜、命运之书、AI 灵感注入……）
- [ ] 接入 Supabase 实现跨设备 Trends 排行榜
- [ ] 主题切换（更多视觉风格）
- [ ] 导出/分享 idea 为图片
- [ ] 国际化支持更多语言

---

## English <a id="english"></a>

### What is this?

**Vibe Coding Roller** is a fun random inspiration tool for developers. When you don't know what to code today, let fate decide — roll dice, draw cards, spin the wheel, consult the I Ching, check the dev almanac... 10 modes, 650+ inspiration options, giving you a coding direction you can't refuse.

### Modes

| Mode | Icon | Description |
|------|------|-------------|
| Coin Flip | 🪙 | Binary decision with 20 classic developer dilemmas |
| Dice | 🎲 | 3D dice animation, 6 coding directions |
| Spinning Wheel | 🎡 | Canvas wheel of fortune, pick 1 of 8 |
| Card Draw | 🃏 | Card flip animation, 60 specific task cards |
| Decision Tree | 🌳 | Branch through choices to narrow your direction |
| I Ching | ☯ | Cast 3 coins, 64 hexagrams → coding philosophy |
| Grouping | 👥 | Input N items, randomly split into M groups |
| Dev Almanac | 📅 | Daily coding dos and don'ts (date-seeded) |
| Idea Factory | 🏭 | Template: For `[who]` using `[what]` build `[feature]` as `[platform]` |
| Trends | 🔥 | Publish ideas, ❤️ likes, hot ranking |

### Tech Stack

- Pure **HTML / CSS / JavaScript**, zero dependencies
- CSS 3D transforms for dice animation
- Canvas API for wheel drawing
- LocalStorage for data persistence
- Responsive design, mobile-friendly

### Run Locally

Open `index.html` in any browser — no build tools or server needed:

```bash
open index.html
```

### Deploy to GitHub Pages

1. Repository → Settings → Pages
2. Source: `main` branch, `/ (root)` directory
3. Save and wait for deployment

### Project Structure

```
proj_1/
├── index.html              # Main page
├── css/
│   └── style.css           # Dark neon theme styles
├── js/
│   ├── app.js              # Entry + mode router
│   ├── topics.js           # 650+ option pool data
│   ├── utils.js            # Utility functions
│   └── modes/
│       ├── coin.js         # Coin flip
│       ├── dice.js         # Dice roll
│       ├── wheel.js        # Spinning wheel
│       ├── card.js         # Card draw
│       ├── tree.js         # Decision tree
│       ├── iching.js       # I Ching divination
│       ├── group.js        # Grouping
│       ├── almanac.js      # Dev almanac
│       ├── factory.js      # Idea factory
│       └── trends.js       # Trends ranking
└── LICENSE                 # MIT
```

### Option Pools

~650 curated inspiration options, including:

- **Target users** 140+: developers, anglers, Cthulhu cultists, MBTI addicts...
- **Tech & tools** 145+: Python, Canvas, Arduino, sticky notes, phone vibrator motor...
- **Features** 128+: desktop pet, conspiracy theory generator, 3D codebase visualization...
- **Platforms** 25: mini-programs, Telegram Bot, Electron, Chrome extensions...
- **More**: 60 task cards, 64 I Ching hexagrams, 20 developer dilemmas...

### Roadmap

- [ ] More creative modes (fortune telling, book of fate, AI inspiration...)
- [ ] Supabase integration for cross-device Trends ranking
- [ ] Theme switching (more visual styles)
- [ ] Export / share ideas as images
- [ ] i18n support for more languages

---

**MIT License** — feel free to use, modify, and share. Happy vibe coding! 🚀