// ============================================================
// topics.js — Vibe Coding Roller 选项池 (~650 条)
// 所有模式共享的数据池
// ============================================================

const Topics = {

  // --- 1. 目标用户池 (创意工厂【谁】) ---
  users: [
    // 职业身份
    '普通人', '程序员', '前端开发', '后端开发', '全栈工程师', '算法工程师', 'DevOps', '安全工程师',
    '数据科学家', '产品经理', 'UI设计师', 'UX研究员', '项目经理', '技术总监', 'CTO', '独立开发者',
    '自由职业者', '创业者', '投资人', '猎头', '外卖骑手', '出租车司机', '快递小哥', '环卫工人', '城管',
    // 学生/学术
    '小学生', '初中生', '高中生', '大学生', '研究生', '博士生', '考研党', '考公党', '留学生', '辍学生',
    '实习生', '应届生',
    // 生活方式
    '打工人', '躺平族', '内卷王', '斜杠青年', '数字游民', 'FIRE族', '极简主义者', '环保主义者',
    '熬夜冠军', '早起鸟', '午睡达人', '周末宅家党', '露营爱好者', '房车旅居者', '背包客',
    '流浪诗人', '胡同大爷', '广场舞大妈', '居委会阿姨', '小区保安',
    // 性格/心理
    '社恐', '社牛', '讨好型人格', '回避型依恋', '拖延症晚期', '选择困难症', '强迫症', '完美主义者',
    'ADHD', '焦虑体质', '乐天派', '悲观主义者', '疑病患者', '控制狂', '冒险家', '谨慎派',
    '三分钟热度', '长期主义者',
    // 兴趣爱好
    '猫奴', '狗奴', '鸟奴', '爬宠爱好者', '水族爱好者', '植物杀手', '多肉控', '养花达人',
    '钓鱼佬', '登山爱好者', '滑雪爱好者', '冲浪爱好者', '潜水爱好者', '滑板少年', '跑酷爱好者',
    '健身教练', '瑜伽爱好者', '普拉提爱好者', 'CrossFit狂热者', '马拉松跑者', '骑行爱好者',
    '手工达人', '乐高玩家', '模型爱好者', '胶佬', '羊毛毡艺术家', '编织爱好者', '木工爱好者',
    '陶艺爱好者', '烘焙爱好者', '咖啡师', '调酒师', '精酿啤酒爱好者', '茶艺师', '威士忌品鉴师',
    // 亚文化/圈子
    '二次元', '三坑少女', 'Coser', 'Vtuber粉丝', '偶像宅', '追星族', 'K-pop粉',
    '桌游玩家', 'DND跑团玩家', '战锤玩家', 'TCG卡牌玩家', '游戏主播', '电竞选手',
    '科幻迷', '奇幻迷', '克苏鲁信徒', '历史迷', '军事迷', '铁路迷', '航空迷',
    // 玄学/灵性
    '占星师', '塔罗师', '星座爱好者', 'MBTI中毒者', '九型人格爱好者', '人类图研究者',
    '风水爱好者', '禅修者', '冥想者', '正念练习者'
  ],

  // --- 2. 技术/工具池 (创意工厂【什么】) ---
  tools: [
    // 编程语言
    'Python', 'JavaScript', 'TypeScript', 'Go', 'Rust', 'Java', 'Kotlin', 'Swift', 'C++', 'C#',
    'Ruby', 'Lua', 'PHP', 'Scala', 'Elixir',
    // 前端框架/库
    'React', 'Vue', 'Svelte', 'Angular', 'SolidJS', 'Qwik', 'Next.js', 'Nuxt', 'Astro', 'Remix',
    'Tailwind CSS', 'shadcn/ui', 'Framer Motion', 'D3.js', 'ECharts',
    // 后端/API
    'Node.js', 'Express', 'FastAPI', 'Django', 'Flask', 'Spring Boot', 'Gin', 'Actix',
    'GraphQL', 'tRPC', 'REST API', 'WebSocket', 'gRPC', 'Serverless', 'Webhook',
    // 数据库
    'SQLite', 'PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Elasticsearch', 'Neo4j', 'ClickHouse',
    'Supabase', 'Firebase',
    // 云/DevOps
    'Docker', 'Kubernetes', 'GitHub Actions', 'Vercel', 'Netlify', 'Cloudflare Workers',
    'AWS Lambda', 'Nginx', 'Caddy', 'Terraform',
    // 浏览器能力
    'Canvas API', 'WebGL', 'Three.js', 'SVG', 'CSS动画', 'WebSocket', 'WebRTC', 'Web Workers',
    'PWA', '浏览器扩展', 'IndexedDB', 'Service Worker', 'Web Audio API', 'Speech API', 'Geolocation',
    // Bot/自动化
    'Telegram Bot', 'Discord Bot', 'Slack Bot', '微信机器人', '飞书机器人', '钉钉机器人',
    'RPA', 'Selenium',
    // LLM/AI
    'ChatGPT API', 'Claude API', 'LangChain', 'Stable Diffusion', 'Midjourney API',
    'Whisper', 'TTS语音合成', 'RAG', 'Agent', 'Embedding', 'Function Calling', 'Prompt Engineering',
    // 移动/桌面
    '小程序', 'React Native', 'Flutter', 'Electron', 'Tauri', 'PWA', 'SwiftUI', 'Jetpack Compose',
    // 数据/文件格式
    'Markdown', 'YAML', 'JSON', 'CSV', 'XML', 'SQL', 'Graphviz', 'Mermaid', 'LaTeX', 'Regex',
    // 硬件/嵌入式
    'Arduino', 'Raspberry Pi', 'ESP32', 'Micro:bit', '3D打印机', '激光切割机',
    'LED灯带', '电子墨水屏', '热敏打印机', 'NFC标签', '蓝牙BLE', 'MIDI键盘',
    // 非传统工具
    '纸和笔', '便利贴', '白板', '乐高积木', '橡皮泥', '骰子', '扑克牌', '塔罗牌', 'I Ching铜钱',
    'Excel公式', '手机陀螺仪', '手机闪光灯', '手机振动马达', '笔记本摄像头', '浏览器Notification'
  ],

  // --- 3. 功能/项目池 (创意工厂【功能】) ---
  features: [
    // 效率工具
    '待办事项', '番茄钟', '倒计时器', '习惯追踪', '记账本', '日记本', '笔记软件', '日程管理',
    '文件分享', '剪贴板管理', '稍后阅读', '书签管理', '密码管理器', '个人知识库', '周报生成器',
    // 信息/查询
    '天气预报', '汇率转换', '单位换算', '快递查询', '空气质量', '星座运势', '黄道吉日',
    '历史上的今天', '油价查询', '限行查询', '地铁线路图', '公交实时到站',
    // 生成器类
    '情书生成器', '彩虹屁生成器', '毒鸡汤生成器', '鸡汤文生成器', '废话生成器',
    '网名生成器', '乐队名生成器', '创业点子生成器', '菜谱生成器', '鸡尾酒配方生成器',
    '中式菜名翻译器', '辞职信生成器', '道歉信生成器', '婚礼誓词生成器', '挽联生成器',
    '公司使命宣言生成器', '论文标题生成器', '密码生成器', 'UUID生成器', '假数据生成器',
    // 游戏
    '文字冒险游戏', '扫雷', '俄罗斯方块', '贪吃蛇', '2048', '迷宫生成器', '迷宫自动寻路',
    '你画我猜', '谁是卧底', '真心话大冒险', '跑团骰子', '塔罗占卜', '签文抽签',
    '翻牌记忆配对', '打地鼠', '弹球打砖块', '井字棋', '五子棋AI',
    // 可视化/艺术
    '像素画编辑器', 'ASCII艺术生成器', '词云生成器', '数据大屏', '音乐可视化',
    '粒子动画', '烟花模拟', '星空模拟', '流体模拟', '生命游戏', '分形图形生成器',
    '万花筒效果', '故障艺术效果', '像素排序艺术', '流沙模拟', '鸟群模拟', '蚁群模拟',
    // 自动化脚本
    '网页变更监控', '定时发消息', '批量重命名', '自动整理文件夹', '文件备份脚本',
    'RSS聚合阅读器', '自动签到脚本', '自动抢票助手', '邮件自动归类', '手机截图自动整理',
    // 社交/互动
    '匿名树洞', '漂流瓶', '弹幕墙', '在线白板协作', '点歌台', '许愿墙', '真心话匿名提问箱',
    '投票系统', '问卷系统', '抽奖转盘',
    // 奇怪创意项目
    '屏幕宠物(桌面上走来走去的小动物)', '鼠标轨迹艺术(移动鼠标自动作画)',
    '键盘音效器(打字发出各种奇怪声音)', '网页末日倒计时', '今天吃什么决策器',
    '修狗/修猫颜值AI打分器', '蚊子咬人位置统计器', '摸鱼伪装页面(一键切换成Excel界面)',
    '会议废话Bingo卡', '工位风水罗盘', '代码屎山可视化(3D俯瞰你的git history)',
    '网抑云时间到自动切歌', '根据心情推荐颜色方案', '对屏幕吹气吹散蒲公英',
    '一个什么都不做但很解压的按钮', '一个只会说再等等的进度条', '随机生成一个阴谋论',
    '把两个完全不相关的东西强行关联的分析器', '模拟自己是AI看世界的视角',
    '给每行代码打分(诗意的变量名评分)', '一个帮你练习说不的模拟器',
    '随机打开一个冷门维基百科页面', '给你的照片P上赛博朋克滤镜',
    '模拟在太空站写代码的ASMR音效', '把今天的聊天记录生成一首诗'
  ],

  // --- 4. 发布平台池 (创意工厂【平台】) ---
  platforms: [
    'Web网页 (GitHub Pages)', 'Web网页 (Vercel)', 'Web网页 (Netlify)',
    '单页应用 (SPA)', '多页网站', 'PWA可安装应用',
    '微信小程序', '支付宝小程序', '百度小程序', '抖音小程序',
    'iOS App', 'Android App', 'Flutter跨平台App', 'React Native跨平台App',
    'Electron桌面应用', 'Tauri桌面应用', '命令行CLI工具',
    '浏览器扩展 (Chrome)', '浏览器扩展 (Firefox)', 'VS Code插件',
    'Telegram Bot', 'Discord Bot', 'Slack Bot',
    'API服务 (REST)', 'API服务 (GraphQL)', 'WebSocket实时服务'
  ],

  // --- 5. 黄历 — 宜/忌 ---
  almanac: {
    good: [
      '写代码', '重构老代码', '写单元测试', '写集成测试', '写文档', '画UI原型',
      '学习新技术', 'code review', '性能优化', '修bug', '更新依赖', '清理TODO',
      '整理项目文件夹', '提交PR', '合并分支', '开源贡献', '写技术博客',
      '配置CI/CD', '升级Node版本', '喝咖啡coding', '深夜赶工'
    ],
    bad: [
      '删库跑路', '强制推送main', '不写注释', '硬编码密码', '复制粘贴不读代码',
      '过度设计', '过早优化', '在生产环境debug', 'git push --force', 'rm -rf /',
      '周五下午部署', '改需求不通知', '提交node_modules', '.env上传GitHub',
      '写上万行一个文件', '变量名叫a b c', '不用版本控制', '生产环境直接改代码',
      '不写.gitignore', '直接clone下来不读README就npm install'
    ]
  },

  // --- 6. 骰子 6面 ---
  dice: [
    '写个小游戏',
    '做个可视化项目',
    '搭个 API 或后端服务',
    '写个效率/自动化工具',
    '设计实现一个 UI 界面',
    '学个新技术并做个 demo'
  ],

  // --- 7. 卡牌 (60张) ---
  cards: [
    '用纯 CSS 画一只会wink的猫',
    '写一个命令行的俄罗斯方块',
    '做一个自动生成辞职信的网站',
    '用 Canvas 实现烟花粒子效果',
    '搭建一个个人短链接服务',
    '做一个浏览器新标签页美化插件',
    '写一个聊天记录数据可视化脚本',
    '用 Three.js 做一个旋转的3D地球',
    '做一个把照片转成 ASCII 艺术的工具',
    '实现一个生命游戏 Conway',
    '做一个敲键盘发出不同音效的网页',
    '写一个从豆瓣导出读过看过的脚本',
    '做一个今日运势签文抽签页',
    '用 SVG 画一幅下雪的动画场景',
    '做一个天气查询 Telegram Bot',
    '实现一个极简区块链 demo',
    '做一个 Markdown 转精美海报的工具',
    '写一个按日期自动归类文件的脚本',
    '做一个像素风头像生成器',
    '实现 WebRTC 局域网文字文件传输',
    '做一个生理期记录小工具',
    '实现网页版的你画我猜',
    '做一个随机生成 lo-fi 节拍的页面',
    '把微信聊天记录生成词云',
    '实现纯 CSS 翻牌记忆配对游戏',
    '做一个根据心情推荐电影的页面',
    '模拟蚂蚁觅食行为的可视化',
    '做一个 GitHub 年度报告生成器',
    '做一个今天穿什么穿搭推荐',
    '把英文翻译成莎士比亚风格',
    '做一个收集互联网冷知识的 API',
    '实现基于鼠标轨迹的抽象画生成器',
    '做一个会议废话 Bingo 卡生成器',
    '实现一个工位风水罗盘',
    '做一个摸鱼伪装页面',
    '做一个代码屎山3D可视化',
    '写一个随机生成阴谋论的网站',
    '做一个帮你说"不"的练习模拟器',
    '实现一个随机冷门维基百科跳转',
    '做一个给代码变量名打分的工具',
    '实现一个在线匿名树洞',
    '做一个漂流瓶匿名社交页',
    '做一个在线真心话大冒险',
    '实现一个弹幕墙',
    '做一个在线点歌台',
    '做一个许愿墙',
    '写一个自动生成鸡尾酒配方的页面',
    '做一个像素排序艺术生成器',
    '实现一组纯CSS的粒子万花筒',
    '做一个模拟在太空站写代码的ASMR页',
    '实现一个故障艺术glitch art效果',
    '做一个赛博朋克滤镜工具',
    '写一个给任意文本生成rap歌词的工具',
    '实现一个今天吃什么的轮盘决策器',
    '做一个屏幕吹气吹散蒲公英的页面',
    '实现一个什么都不做但很解压的按钮',
    '做一个随机生成彩虹屁的API',
    '写一个模拟Windows蓝屏的整蛊页面',
    '做一个节奏感测试小游戏',
    '实现一个网页端的AI算命'
  ],

  // --- 8. 硬币 (二元对立) ---
  coins: [
    { a: '做新项目', b: '修旧bug' },
    { a: '学新技术', b: '深耕现有技术栈' },
    { a: '写代码', b: '写文档' },
    { a: '搞前端', b: '搞后端' },
    { a: '一个人写', b: '找人合作' },
    { a: '开源', b: '闭源自用' },
    { a: '追求完美', b: 'MVP先跑起来' },
    { a: '加班肝', b: '到点就走' },
    { a: '重构', b: '加新功能' },
    { a: '画UI', b: '写逻辑' },
    { a: '用框架', b: '手写原生' },
    { a: '面向对象', b: '函数式' },
    { a: '关系型DB', b: 'NoSQL' },
    { a: 'monolith', b: '微服务' },
    { a: '写测试', b: '相信自己的代码' },
    { a: '买课学', b: '看文档自学' },
    { a: 'Windows', b: 'Mac' },
    { a: 'Vim', b: 'VSCode' },
    { a: 'Tab', b: 'Space' },
    { a: '暗色主题', b: '亮色主题' }
  ],

  // --- 9. 梅花易数 64卦 ---
  iching: [
    { name: '乾为天',   trigram: '☰☰', advice: '创造力爆棚，大胆开新坑' },
    { name: '坤为地',   trigram: '☷☷', advice: '稳扎稳打，写测试写文档' },
    { name: '水雷屯',   trigram: '☵☳', advice: '万事开头难，先写个 Hello World' },
    { name: '山水蒙',   trigram: '☶☵', advice: '该去读文档和源码了' },
    { name: '水天需',   trigram: '☵☰', advice: '等待灵感，别硬写' },
    { name: '天水讼',   trigram: '☰☵', advice: '代码评审可能有争议，做好准备' },
    { name: '地水师',   trigram: '☷☵', advice: '适合团队协作，拉上小伙伴' },
    { name: '水地比',   trigram: '☵☷', advice: '多参考开源项目，别重复造轮子' },
    { name: '风天小畜', trigram: '☴☰', advice: '小步迭代，别一次做太多' },
    { name: '天泽履',   trigram: '☰☱', advice: '谨慎重构，步步为营' },
    { name: '地天泰',   trigram: '☷☰', advice: '通顺流畅，今天写啥都顺' },
    { name: '天地否',   trigram: '☰☷', advice: '瓶颈期，换个思路试试' },
    { name: '天火同人', trigram: '☰☲', advice: '找人code review，集思广益' },
    { name: '火天大有', trigram: '☲☰', advice: '收获满满，适合收尾和发布' },
    { name: '地山谦',   trigram: '☷☶', advice: '低调coding，不炫技' },
    { name: '雷地豫',   trigram: '☳☷', advice: '心情愉悦，写点好玩的' },
    { name: '泽雷随',   trigram: '☱☳', advice: '跟随直觉，别想太多' },
    { name: '山风蛊',   trigram: '☶☴', advice: '技术债该还了，重构吧' },
    { name: '地泽临',   trigram: '☷☱', advice: '亲自下场，hands-on' },
    { name: '风地观',   trigram: '☴☷', advice: '多观察多学习，别急着动手' },
    { name: '火雷噬嗑', trigram: '☲☳', advice: 'debug时刻，啃硬骨头' },
    { name: '山火贲',   trigram: '☶☲', advice: '美化UI，打磨交互细节' },
    { name: '山地剥',   trigram: '☶☷', advice: '删减冗余代码，做减法' },
    { name: '地雷复',   trigram: '☷☳', advice: '旧项目重启，重新开始' },
    { name: '天雷无妄', trigram: '☰☳', advice: '别想太多花活，回归本质' },
    { name: '山天大畜', trigram: '☶☰', advice: '积蓄能量，适合做技术储备' },
    { name: '山雷颐',   trigram: '☶☳', advice: '打好基础，写核心模块' },
    { name: '泽风大过', trigram: '☱☴', advice: '大改动，架构调整' },
    { name: '坎为水',   trigram: '☵☵', advice: '困难重重，但坚持就能过' },
    { name: '离为火',   trigram: '☲☲', advice: '热情高涨，适合写前端' },
    { name: '泽山咸',   trigram: '☱☶', advice: '感性coding，用心感受代码之美' },
    { name: '雷风恒',   trigram: '☳☴', advice: '持之以恒，坚持日常commit' },
    { name: '天山遁',   trigram: '☰☶', advice: '该放手时就放手，别死磕' },
    { name: '雷天大壮', trigram: '☳☰', advice: '力量充沛，冲一个大功能' },
    { name: '火地晋',   trigram: '☲☷', advice: '进步明显，适合学新技术' },
    { name: '地火明夷', trigram: '☷☲', advice: '受伤了，遇到bug墙，先休息' },
    { name: '风火家人', trigram: '☴☲', advice: '适合做给家人朋友用的工具' },
    { name: '火泽睽',   trigram: '☲☱', advice: '思路分歧，先对齐再写' },
    { name: '水山蹇',   trigram: '☵☶', advice: '困难重重，拆解成小步骤' },
    { name: '雷水解',   trigram: '☳☵', advice: '难题化解，bug终于修好了' },
    { name: '山泽损',   trigram: '☶☱', advice: '做减法，去掉花里胡哨' },
    { name: '风雷益',   trigram: '☴☳', advice: '做加法，增加实用功能' },
    { name: '泽天夬',   trigram: '☱☰', advice: '果断决策，别犹豫' },
    { name: '天风姤',   trigram: '☰☴', advice: '偶然发现好想法，抓住它' },
    { name: '泽地萃',   trigram: '☱☷', advice: '资源汇聚，适合做聚合类项目' },
    { name: '地风升',   trigram: '☷☴', advice: '步步高升，技术成长ing' },
    { name: '泽水困',   trigram: '☱☵', advice: '被困住了，出门走走找灵感' },
    { name: '水风井',   trigram: '☵☴', advice: '深挖一口井，专注一个方向' },
    { name: '泽火革',   trigram: '☱☲', advice: '变革时刻，推倒重来' },
    { name: '火风鼎',   trigram: '☲☴', advice: '打造精品，适合做工具框架' },
    { name: '震为雷',   trigram: '☳☳', advice: '震撼出击，搞个大新闻' },
    { name: '艮为山',   trigram: '☶☶', advice: '不动如山，稳定优先' },
    { name: '风山渐',   trigram: '☴☶', advice: '循序渐进，慢慢来比较快' },
    { name: '雷泽归妹', trigram: '☳☱', advice: '组合创新，A+B=C' },
    { name: '雷火丰',   trigram: '☳☲', advice: '丰盛产出，适合多写代码' },
    { name: '火山旅',   trigram: '☲☶', advice: 'coding之旅，探索未知领域' },
    { name: '巽为风',   trigram: '☴☴', advice: '灵活变通，随风而动' },
    { name: '兑为泽',   trigram: '☱☱', advice: '分享交流，适合写博客演讲' },
    { name: '风水涣',   trigram: '☴☵', advice: '分散精力，聚焦一件事' },
    { name: '水泽节',   trigram: '☵☱', advice: '节制，别写过度设计的代码' },
    { name: '风泽中孚', trigram: '☴☱', advice: '诚信为本，写可靠的代码' },
    { name: '雷山小过', trigram: '☳☶', advice: '小事可过，大事谨慎' },
    { name: '水火既济', trigram: '☵☲', advice: '项目完成，测试通过！' },
    { name: '火水未济', trigram: '☲☵', advice: '项目未完成，革命尚未成功' }
  ],

  // --- 10. 种子 idea (for Trends 预置) ---
  seedIdeas: [
    { content: '给熬夜冠军用 React 做一个赛博朋克滤镜工具，发布为 Web网页', likes: 42, source: '创意工厂' },
    { content: '给猫奴用 Canvas API 做一个屏幕宠物，发布为 浏览器扩展', likes: 38, source: '创意工厂' },
    { content: '给考研党用 Python 做一个自动整理文件夹的脚本，发布为 命令行CLI工具', likes: 35, source: '创意工厂' },
    { content: '给社恐用 Three.js 做一个模拟蚂蚁觅食行为的可视化，发布为 Web网页', likes: 31, source: '创意工厂' },
    { content: '给追星族用 Telegram Bot 做一个彩虹屁生成器，发布为 Telegram Bot', likes: 29, source: '创意工厂' },
    { content: '用纯 CSS 画一只会wink的猫', likes: 27, source: '抽卡' },
    { content: '给打工人用 Electron 做一个摸鱼伪装页面(一键切换成Excel界面)，发布为 Electron桌面应用', likes: 25, source: '创意工厂' },
    { content: '实现一个什么都不做但很解压的按钮', likes: 24, source: '抽卡' },
    { content: '给钓鱼佬用 Arduino 做一个天气查询工具，发布为 iOS App', likes: 22, source: '创意工厂' },
    { content: '给MBTI中毒者用 D3.js 做一个数据大屏，发布为 Web网页', likes: 20, source: '创意工厂' },
    { content: '做一个敲键盘发出不同音效的网页', likes: 19, source: '抽卡' },
    { content: '给拖延症晚期用 Flask 做一个习惯追踪工具，发布为 PWA可安装应用', likes: 18, source: '创意工厂' },
    { content: '实现一个网页端的AI算命', likes: 17, source: '抽卡' },
    { content: '给DND跑团玩家用 WebSocket 做一个在线真心话大冒险，发布为 Web网页', likes: 16, source: '创意工厂' },
    { content: '给咖啡师用 Stable Diffusion 做一个像素风头像生成器，发布为 微信小程序', likes: 15, source: '创意工厂' },
    { content: '做一个今天吃什么决策器', likes: 14, source: '抽卡' },
    { content: '给数字游民用 Supabase 搭建一个个人知识库，发布为 Web网页', likes: 13, source: '创意工厂' },
    { content: '写一个随机生成阴谋论的网站', likes: 12, source: '抽卡' },
    { content: '给二次元用 CSS动画 做一个万花筒效果，发布为 Web网页 (Vercel)', likes: 11, source: '创意工厂' },
    { content: '做一个代码屎山3D可视化', likes: 10, source: '抽卡' }
  ]
};

// 导出 (兼容 ES module 和 script 标签)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Topics;
}