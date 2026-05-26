// ============================================================
// factory.js — 创意工厂模式
// 每个空位可以自选不同的随机模式来填充
// ============================================================

App.register('factory', {
  // 模板定义
  template: [
    { id: 'who', label: '给', pool: Topics.users, result: '' },
    { id: 'tool', label: '用', pool: Topics.tools, result: '' },
    { id: 'feature', label: '做一个', pool: Topics.features, result: '' },
    { id: 'platform', label: '发布为', pool: Topics.platforms, result: '' }
  ],

  render() {
    const modeOptions = ['random', 'dice', 'wheel', 'coin', 'card', 'iching'];
    const modeLabels = { random: '纯随机', dice: '骰子式', wheel: '转盘式', coin: '硬币式', card: '抽卡式', iching: '卦象式' };

    const slotsHTML = this.template.map(t => `
      <div class="factory-row">
        <span class="factory-label">${t.label}</span>
        <select class="factory-mode-select" data-slot="${t.id}">
          ${modeOptions.map(m => `<option value="${m}">${modeLabels[m]}</option>`).join('')}
        </select>
        <div class="factory-slot" id="slot-${t.id}">?</div>
      </div>
    `).join('');

    return `
      <div class="card">
        <p style="color:var(--text-dim);margin-bottom:16px;font-size:0.9rem;">
          每个空位可选不同模式填充，组合出完整创意
        </p>
        <div class="factory-slots">
          ${slotsHTML}
        </div>
        <button class="btn btn-primary" id="factoryGenerateBtn">🎰 一键生成</button>
        <div class="result-area factory-result" id="factoryResult"></div>
        <button class="publish-btn" id="factoryPublishBtn" style="display:none;">
          📤 发布到 Trends
        </button>
      </div>`;
  },

  onActivate() {
    const generateBtn = document.getElementById('factoryGenerateBtn');
    const resultEl = document.getElementById('factoryResult');
    const publishBtn = document.getElementById('factoryPublishBtn');
    const slots = {};

    // 获取每个空位当前选中的模式
    this.template.forEach(t => {
      slots[t.id] = {
        el: document.getElementById('slot-' + t.id),
        select: document.querySelector(`[data-slot="${t.id}"]`),
        pool: t.pool,
        value: ''
      };
    });

    function pickWithMode(pool, mode) {
      switch (mode) {
        case 'dice':
          // 骰子式：从池中取 6 个候选模拟骰子
          return randomPick(shuffle(pool).slice(0, 6));
        case 'wheel':
          // 转盘式：从池中取 8 个候选模拟转盘
          return randomPick(shuffle(pool).slice(0, 8));
        case 'coin':
          // 硬币式：从池中取 2 个候选二选一
          const two = shuffle(pool).slice(0, 2);
          return Math.random() < 0.5 ? two[0] : two[1];
        case 'card':
          // 抽卡式：纯随机抽一张
          return randomPick(shuffle(pool).slice(0, 32));
        case 'iching':
          // 卦象式：用 64 卦映射到池索引
          const hexIdx = randomInt(0, 64);
          return pool[hexIdx % pool.length];
        case 'random':
        default:
          return randomPick(pool);
      }
    }

    generateBtn.onclick = async () => {
      generateBtn.disabled = true;
      resultEl.classList.remove('filled');
      resultEl.innerHTML = '生成中...';
      publishBtn.style.display = 'none';

      // 逐个填充空位（带延迟动画效果）
      for (const t of this.template) {
        const s = slots[t.id];
        const mode = s.select.value;
        s.value = pickWithMode(s.pool, mode);
        s.el.textContent = s.value;
        s.el.classList.add('filled');
        await delay(200);
      }

      // 组装最终结果
      const final = `给<strong>${slots['who'].value}</strong>用<strong>${slots['tool'].value}</strong>做一个<strong>${slots['feature'].value}</strong>，发布为<strong>${slots['platform'].value}</strong>`;

      resultEl.innerHTML = `💡 ${final}`;
      resultEl.classList.add('filled');
      publishBtn.style.display = 'inline-flex';
      generateBtn.disabled = false;

      resultEl._lastResult = `给${slots['who'].value}用${slots['tool'].value}做一个${slots['feature'].value}，发布为${slots['platform'].value}`;
    };

    publishBtn.onclick = () => {
      publishIdea(resultEl._lastResult || '创意工厂组合结果', '创意工厂');
    };
  }
});