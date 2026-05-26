// ============================================================
// app.js — Vibe Coding Roller 主入口
// 模式路由 + 主题切换 + 语言切换 + 全局状态管理
// ============================================================

const App = {
  currentMode: 'coin',
  theme: localStorage.getItem('theme') || 'dark',

  modes: {},

  register(name, config) {
    this.modes[name] = config;
  },

  // 更新所有 data-i18n 元素的文本
  updateI18n() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      el.textContent = t(el.dataset.i18n);
    });
  },

  // 应用主题
  applyTheme() {
    document.documentElement.setAttribute('data-theme', this.theme);
    const btn = document.getElementById('btnTheme');
    if (btn) {
      btn.textContent = this.theme === 'dark' ? t('themeDark') : t('themeLight');
    }
  },

  // 切换主题
  toggleTheme() {
    this.theme = this.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', this.theme);
    this.applyTheme();
  },

  // 切换语言
  setLanguage(lang) {
    I18n.setLang(lang);
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';

    // 更新语言按钮活跃状态
    document.querySelectorAll('[data-action="lang"]').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    // 重建所有面板
    this.rebuildPanels();

    // 更新 i18n 元素和主题按钮
    this.updateI18n();
    this.applyTheme();
  },

  // 重建所有面板
  rebuildPanels() {
    const main = document.getElementById('main');
    const modeOrder = ['coin', 'dice', 'wheel', 'card', 'tree', 'iching', 'group', 'almanac', 'factory', 'trends'];

    let currentActive = this.currentMode;

    main.innerHTML = '';
    modeOrder.forEach(name => {
      const mode = this.modes[name];
      if (!mode) return;

      const panel = document.createElement('div');
      panel.id = 'panel-' + name;
      panel.className = 'mode-panel' + (name === currentActive ? ' active' : '');
      panel.innerHTML = mode.render();
      main.appendChild(panel);
    });

    // 重新激活当前模式
    const mode = this.modes[currentActive];
    if (mode && mode.onActivate) {
      mode.onActivate();
    }

    // 更新 i18n 元素
    this.updateI18n();
  },

  // 切换模式
  switchMode(name) {
    this.currentMode = name;

    document.querySelectorAll('.nav-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.mode === name);
    });

    document.querySelectorAll('.mode-panel').forEach(p => {
      p.classList.toggle('active', p.id === 'panel-' + name);
    });

    const mode = this.modes[name];
    if (mode && mode.onActivate) {
      mode.onActivate();
    }
  },

  // 初始化
  init() {
    // 应用主题
    this.applyTheme();

    // 应用语言
    if (I18n.current === 'en') {
      document.documentElement.lang = 'en';
      document.querySelectorAll('[data-action="lang"]').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === 'en');
      });
    }

    // 主题切换按钮
    const themeBtn = document.getElementById('btnTheme');
    if (themeBtn) {
      themeBtn.onclick = () => this.toggleTheme();
    }

    // 语言切换按钮
    document.querySelectorAll('[data-action="lang"]').forEach(btn => {
      btn.onclick = () => this.setLanguage(btn.dataset.lang);
    });

    // 导航点击
    const nav = document.getElementById('nav');
    nav.addEventListener('click', (e) => {
      const btn = e.target.closest('.nav-btn');
      if (!btn) return;
      this.switchMode(btn.dataset.mode);
    });

    // 构建模式面板
    this.rebuildPanels();

    // 更新 i18n
    this.updateI18n();
  }
};

document.addEventListener('DOMContentLoaded', () => {
  App.init();
});