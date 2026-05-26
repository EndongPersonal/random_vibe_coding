// ============================================================
// app.js — Vibe Coding Roller 主入口
// 模式路由 + 全局状态管理
// ============================================================

const App = {
  currentMode: 'coin',

  // 模式注册表
  modes: {},

  // 注册模式
  register(name, config) {
    this.modes[name] = config;
  },

  // 切换模式
  switchMode(name) {
    this.currentMode = name;

    // 更新导航
    document.querySelectorAll('.nav-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.mode === name);
    });

    // 更新面板
    document.querySelectorAll('.mode-panel').forEach(p => {
      p.classList.toggle('active', p.id === 'panel-' + name);
    });

    // 调用模式的 onActivate
    const mode = this.modes[name];
    if (mode && mode.onActivate) {
      mode.onActivate();
    }
  },

  // 初始化
  init() {
    const nav = document.getElementById('nav');
    const main = document.getElementById('main');

    // 构建所有模式面板
    const modeOrder = ['coin', 'dice', 'wheel', 'card', 'tree', 'iching', 'group', 'almanac', 'factory', 'trends'];
    modeOrder.forEach(name => {
      const mode = this.modes[name];
      if (!mode) return;

      const panel = document.createElement('div');
      panel.id = 'panel-' + name;
      panel.className = 'mode-panel' + (name === 'coin' ? ' active' : '');
      panel.innerHTML = mode.render();
      main.appendChild(panel);
    });

    // 导航点击事件
    nav.addEventListener('click', (e) => {
      const btn = e.target.closest('.nav-btn');
      if (!btn) return;
      this.switchMode(btn.dataset.mode);
    });

    // 激活首个模式
    const firstMode = this.modes['coin'];
    if (firstMode && firstMode.onActivate) {
      firstMode.onActivate();
    }
  }
};

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
  App.init();
});