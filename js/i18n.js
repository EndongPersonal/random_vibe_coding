// ============================================================
// i18n.js — 中英文翻译
// ============================================================

const I18n = {
  current: localStorage.getItem('lang') || 'zh',

  data: {
    zh: {
      noscript: '请启用 JavaScript 以使用 Vibe Coding Roller。',
      subtitle: '随机决策 · 灵感生成 · 今天写什么？',
      themeDark: '🌙 暗色',
      themeLight: '☀️ 亮色',
      langZH: '中文',
      langEN: 'English',

      // 通用
      copyBtn: '📋 复制',
      copyDone: '✓ 已复制',

      // 导航
      navCoin: '🪙 掷硬币',
      navDice: '🎲 骰子',
      navWheel: '🎡 转盘',
      navCard: '🃏 抽卡',
      navTree: '🌳 决策树',
      navIching: '☯ 梅花易数',
      navGroup: '👥 分组',
      navAlmanac: '📅 黄历',
      navFactory: '🏭 创意工厂',
      navTrends: '🔥 Trends',
      navFishing: '🎣 电子钓鱼',

      // 硬币
      coinLoading: '加载中...',
      coinFlip: '🪙 抛硬币',
      coinSpinning: '旋转中...',
      coinPublish: '📤 发布到 Trends',
      coinHead: '正',
      coinTail: '反',

      // 骰子
      diceRoll: '🎲 掷骰子',
      diceRolling: '滚动中...',

      // 转盘
      wheelSpin: '🎡 旋转转盘',
      wheelSpinning: '旋转中...',
      wheelCenter: 'SPIN',

      // 抽卡
      cardDraw: '🃏 抽一张卡',
      cardDrawing: '抽卡中...',
      cardHint: '点击抽卡',

      // 决策树
      treeTitle: '先选大方向？',
      treeGame: '写游戏',
      treeGameR: '今天做一个游戏项目！可以是文字冒险、贪吃蛇、扫雷、2048、迷宫…任你发挥',
      treeVis: '做可视化',
      treeVisR: '今天做可视化！粒子动画、数据大屏、音乐可视化、分形图形…视觉盛宴搞起来',
      treeApi: '搭服务',
      treeApiR: '今天搭后端/API服务！REST API、GraphQL、WebSocket…或者做个Bot、写个自动化脚本',
      treeFront: '搞前端',
      treeFrontR: '今天搞前端页面！CSS动画、Canvas画布、WebGL…或者做一个纯粹的交互体验',
      treeLearn: '学东西',
      treeLearnQ: '学什么方向？',
      treeLang: '新语言',
      treeLangR: '今天学一门新编程语言！Rust、Go、Elixir…挑一个没试过的',
      treeFramework: '新框架',
      treeFrameworkR: '今天学个新框架！Svelte、Astro、SolidJS…或者后端框架如FastAPI、Gin',
      treeAI: 'AI相关',
      treeAIR: '今天学AI！LangChain、RAG、Agent、Prompt Engineering…跟一波AI浪潮',
      treeSource: '读源码',
      treeSourceR: '今天静心读源码！找个你常用的开源库，看看它是怎么实现的',
      treeRandom: '随便',
      treeRandomR: '今天随缘写代码！打开编辑器，想到什么写什么，享受纯粹的 coding 快乐',

      // 梅花易数
      ichingHint: '三枚铜钱，每爻一掷，六爻成卦',
      ichingCast: '☯ 起卦',
      ichingCasting: '起卦中…',

      // 分组
      groupHint: '输入要分组的内容（每行一个），选择组数',
      groupPlaceholder: '项目A\n项目B\n项目C\n项目D\n项目E\n项目F',
      groupSplit: '分成',
      groupUnit: '组',
      groupBtn: '🎲 随机分组',
      groupEmpty: '请先输入内容',
      groupCol: '组',
      groupItems: '项',

      // 黄历
      almanacGood: '✅ 今日宜',
      almanacBad: '❌ 今日忌',
      almanacRefresh: '🔮 再看一天',
      almanacNote: '基于日期种子生成，同一天结果一致',
      almanacDailyIdea: '🌟 今日灵感',
      almanacRandomIdea: '🎲 随机灵感',

      // 创意工厂
      factoryHint: '每个空位可选不同模式填充，组合出完整创意',
      factoryLabelWho: '给',
      factoryLabelTool: '用',
      factoryLabelFeature: '做一个',
      factoryLabelPlatform: '发布为',
      factoryGenerate: '🎰 一键生成',
      factoryGenerating: '生成中…',
      factoryModeRandom: '纯随机',
      factoryModeDice: '骰子式',
      factoryModeWheel: '转盘式',
      factoryModeCoin: '硬币式',
      factoryModeCard: '抽卡式',
      factoryModeIching: '卦象式',
      factoryResultTpl: '给<span class="hl">${w}</span>用<span class="hl">${t}</span>做一个<span class="hl">${f}</span>，发布为<span class="hl">${p}</span>',

      // Trends
      trendsHot: '🔥 热门',
      trendsNew: '🕐 最新',
      trendsNote: '💡 在其他模式生成后点击「发布到 Trends」即可投稿',
      trendsNote2: '📊 数据存储在本地浏览器，暂不支持跨设备同步',
      trendsSourceFactory: '创意工厂',
      trendsSourceCard: '抽卡',
      trendsSourceDice: '骰子',
      trendsSourceCoin: '掷硬币',
      trendsSourceWheel: '转盘',
      trendsSourceTree: '决策树',
      trendsSourceIching: '梅花易数',
      trendsSourceFishing: '电子钓鱼',

      // 电子钓鱼
      fishingCast: '🎣 抛竿',
      fishingReel: '⚡ 收线！',
      fishingStatusIdle: '准备好开始钓鱼了吗？',
      fishingStatusWait: '🎣 浮漂在水面上轻轻晃动…等待鱼儿上钩…',
      fishingStatusBite: '⚡ 有鱼咬钩了！浮漂猛地往下沉！快收线！',
      fishingStatusReel: '🎣 正在奋力收线…',
      fishingStatusCaught: '🎉 成功钓到了一条',
      fishingStatusReady: '准备好再次抛竿了吗？🐟',
      fishingCollection: '📖 我的鱼获图鉴',
      fishingCatchTitle: '钓到了',
      fishingSource: '电子钓鱼'
    },

    en: {
      noscript: 'Please enable JavaScript to use Vibe Coding Roller.',
      subtitle: 'Random Decision · Idea Generator · What to code today?',
      themeDark: '🌙 Dark',
      themeLight: '☀️ Light',
      langZH: '中文',
      langEN: 'English',

      copyBtn: '📋 Copy',
      copyDone: '✓ Copied',

      navCoin: '🪙 Coin Flip',
      navDice: '🎲 Dice',
      navWheel: '🎡 Wheel',
      navCard: '🃏 Card Draw',
      navTree: '🌳 Decision Tree',
      navIching: '☯ I Ching',
      navGroup: '👥 Grouping',
      navAlmanac: '📅 Almanac',
      navFactory: '🏭 Idea Factory',
      navTrends: '🔥 Trends',
      navFishing: '🎣 Fishing',

      coinLoading: 'Loading…',
      coinFlip: '🪙 Flip Coin',
      coinSpinning: 'Flipping…',
      coinPublish: '📤 Publish to Trends',
      coinHead: 'H',
      coinTail: 'T',

      diceRoll: '🎲 Roll Dice',
      diceRolling: 'Rolling…',

      wheelSpin: '🎡 Spin Wheel',
      wheelSpinning: 'Spinning…',
      wheelCenter: 'SPIN',

      cardDraw: '🃏 Draw a Card',
      cardDrawing: 'Drawing…',
      cardHint: 'Click to draw',

      treeTitle: 'Pick a direction?',
      treeGame: 'Build a Game',
      treeGameR: 'Build a game today! Text adventure, Tetris, Minesweeper, 2048, maze generator… go wild!',
      treeVis: 'Visualization',
      treeVisR: 'Create visualizations! Particle animation, data dashboard, music visualizer, fractals…',
      treeApi: 'APIs & Services',
      treeApiR: 'Build an API or service! REST API, GraphQL, WebSocket… or make a Bot, write automation scripts',
      treeFront: 'Frontend',
      treeFrontR: 'Frontend day! CSS animations, Canvas, WebGL… or a pure interactive experience',
      treeLearn: 'Learn Something',
      treeLearnQ: 'What to learn?',
      treeLang: 'New Language',
      treeLangR: 'Learn a new programming language! Rust, Go, Elixir… pick one you haven\'t tried',
      treeFramework: 'New Framework',
      treeFrameworkR: 'Learn a new framework! Svelte, Astro, SolidJS… or FastAPI, Gin for backend',
      treeAI: 'AI Stuff',
      treeAIR: 'Learn AI! LangChain, RAG, Agents, Prompt Engineering… ride the AI wave',
      treeSource: 'Read Source',
      treeSourceR: 'Read source code! Find an open-source library you use and understand how it works',
      treeRandom: 'Freestyle',
      treeRandomR: 'Freestyle coding! Open your editor and write whatever comes to mind. Pure coding joy.',

      ichingHint: 'Three coins, six lines, one hexagram',
      ichingCast: '☯ Cast Hexagram',
      ichingCasting: 'Casting…',

      groupHint: 'Enter items to group (one per line), choose group count',
      groupPlaceholder: 'Item A\nItem B\nItem C\nItem D\nItem E\nItem F',
      groupSplit: 'Split into',
      groupUnit: 'groups',
      groupBtn: '🎲 Shuffle & Group',
      groupEmpty: 'Please enter some items first',
      groupCol: 'Group',
      groupItems: 'items',

      almanacGood: '✅ Dos Today',
      almanacBad: '❌ Don\'ts Today',
      almanacRefresh: '🔮 Roll Again',
      almanacNote: 'Date-seeded randomness, same results for the same day',
      almanacDailyIdea: '🌟 Daily Inspiration',
      almanacRandomIdea: '🎲 Random Idea',

      factoryHint: 'Each slot can use a different randomization mode',
      factoryLabelWho: 'For',
      factoryLabelTool: 'using',
      factoryLabelFeature: 'build a',
      factoryLabelPlatform: 'as a',
      factoryGenerate: '🎰 Generate Idea',
      factoryGenerating: 'Generating…',
      factoryModeRandom: 'Random',
      factoryModeDice: 'Dice-style',
      factoryModeWheel: 'Wheel-style',
      factoryModeCoin: 'Coin-style',
      factoryModeCard: 'Card-style',
      factoryModeIching: 'Hexagram-style',
      factoryResultTpl: 'For <span class="hl">${w}</span> using <span class="hl">${t}</span> build a <span class="hl">${f}</span> as a <span class="hl">${p}</span>',

      trendsHot: '🔥 Hot',
      trendsNew: '🕐 New',
      trendsNote: '💡 Generate ideas in other modes and "Publish to Trends"',
      trendsNote2: '📊 Data stored locally in your browser',
      trendsSourceFactory: 'Idea Factory',
      trendsSourceCard: 'Card Draw',
      trendsSourceDice: 'Dice',
      trendsSourceCoin: 'Coin Flip',
      trendsSourceWheel: 'Wheel',
      trendsSourceTree: 'Decision Tree',
      trendsSourceIching: 'I Ching',
      trendsSourceFishing: 'Fishing',

      fishingCast: '🎣 Cast Line',
      fishingReel: '⚡ Reel In!',
      fishingStatusIdle: 'Ready to go fishing?',
      fishingStatusWait: '🎣 The bobber floats gently… waiting for a bite…',
      fishingStatusBite: '⚡ A fish is biting! The bobber plunges down! Reel it in!',
      fishingStatusReel: '🎣 Reeling in…',
      fishingStatusCaught: '🎉 You caught a ',
      fishingStatusReady: 'Ready to cast again? 🐟',
      fishingCollection: '📖 Catch Collection',
      fishingCatchTitle: 'caught',
      fishingSource: 'Fishing'
    }
  },

  t(key) {
    return this.data[this.current]?.[key] || this.data['zh'][key] || key;
  },

  setLang(lang) {
    this.current = lang;
    localStorage.setItem('lang', lang);
  }
};

function t(key) {
  return I18n.t(key);
}