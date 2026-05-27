// ============================================================
// app.js — Vibe Coding Roller 主入口
// 模式路由 + 主题切换 + 语言切换 + 全局状态管理
// ============================================================

const App = {
  currentMode: 'coin',
  theme: localStorage.getItem('theme') || 'light',

  modes: {},

  register(name, config) {
    this.modes[name] = config;
  },

  // 更新所有 data-i18n 元素的文本
  updateI18n() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      el.textContent = t(el.dataset.i18n);
    });
    // 更新 meta description
    const metaDesc = document.querySelector('meta[name="description"]');
    const ogDesc = document.querySelector('meta[property="og:description"]');
    const desc = I18n.current === 'en'
      ? 'Vibe Coding Roller — 11 random inspiration modes, 650+ coding ideas. Roll dice, draw cards, go fishing, consult the I Ching… Let fate decide what to code today.'
      : 'Vibe Coding Roller — 11种随机灵感决策模式，650+编程灵感选项。掷骰子、抽卡牌、电子钓鱼、梅花易数…让命运帮你决定今天写什么代码。';
    if (metaDesc) metaDesc.setAttribute('content', desc);
    if (ogDesc) ogDesc.setAttribute('content', desc);
  },

  // 应用主题
  applyTheme() {
    document.documentElement.setAttribute('data-theme', this.theme);
    const btn = document.getElementById('btnTheme');
    if (btn) {
      btn.textContent = this.theme === 'dark' ? t('themeDark') : t('themeLight');
    }
  },

  toggleTheme() {
    this.theme = this.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', this.theme);
    this.applyTheme();
  },

  // 切换语言
  setLanguage(lang) {
    if (I18n.current === lang) return; // 相同语言无需重建
    I18n.setLang(lang);
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';

    document.querySelectorAll('[data-action="lang"]').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    this.rebuildPanels();
    this.updateI18n();
    this.applyTheme();
  },

  // 重建所有面板 (语言切换时使用，保留已有面板结构仅更新内容)
  rebuildPanels() {
    const main = document.getElementById('main');
    const modeOrder = ['coin', 'dice', 'wheel', 'card', 'tree', 'iching', 'group', 'almanac', 'factory', 'trends', 'fishing'];
    const currentActive = this.currentMode;
    const existing = {};

    // 收集已有面板
    main.querySelectorAll('.mode-panel').forEach(p => {
      const name = p.id.replace('panel-', '');
      existing[name] = p;
    });

    const frag = document.createDocumentFragment();
    modeOrder.forEach(name => {
      const mode = this.modes[name];
      if (!mode) return;
      let panel = existing[name];
      if (panel) {
        // 更新已有面板内容
        panel.innerHTML = mode.render();
        panel.className = 'mode-panel' + (name === currentActive ? ' active' : '');
        frag.appendChild(panel);
        delete existing[name];
      } else {
        panel = document.createElement('div');
        panel.id = 'panel-' + name;
        panel.className = 'mode-panel' + (name === currentActive ? ' active' : '');
        panel.innerHTML = mode.render();
        frag.appendChild(panel);
      }
    });
    // 移除不再需要的旧面板
    Object.values(existing).forEach(p => p.remove());
    main.innerHTML = '';
    main.appendChild(frag);

    const mode = this.modes[currentActive];
    if (mode && mode.onActivate) {
      mode.onActivate();
    }
  },

  // 切换模式
  switchMode(name) {
    this.currentMode = name;

    document.querySelectorAll('.nav-btn').forEach(btn => {
      const active = btn.dataset.mode === name;
      btn.classList.toggle('active', active);
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
    });

    document.querySelectorAll('.mode-panel').forEach(p => {
      p.classList.toggle('active', p.id === 'panel-' + name);
    });

    const mode = this.modes[name];
    if (mode && mode.onActivate) {
      mode.onActivate();
    }
  },

  init() {
    this.applyTheme();

    if (I18n.current === 'en') {
      document.documentElement.lang = 'en';
      document.querySelectorAll('[data-action="lang"]').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === 'en');
      });
    }

    const themeBtn = document.getElementById('btnTheme');
    if (themeBtn) themeBtn.onclick = () => this.toggleTheme();

    document.querySelectorAll('[data-action="lang"]').forEach(btn => {
      btn.onclick = () => this.setLanguage(btn.dataset.lang);
    });

    const nav = document.getElementById('nav');
    nav.addEventListener('click', (e) => {
      const btn = e.target.closest('.nav-btn');
      if (!btn) return;
      this.switchMode(btn.dataset.mode);
    });

    this.rebuildPanels();
    this.updateI18n();
  }
};

document.addEventListener('DOMContentLoaded', () => {
  App.init();
});