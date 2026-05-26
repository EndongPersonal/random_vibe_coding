// ============================================================
// factory.js — 创意工厂模式
// ============================================================

App.register('factory', {
  template: [
    { id: 'who', labelKey: 'factoryLabelWho', pool: Topics.users, result: '' },
    { id: 'tool', labelKey: 'factoryLabelTool', pool: Topics.tools, result: '' },
    { id: 'feature', labelKey: 'factoryLabelFeature', pool: Topics.features, result: '' },
    { id: 'platform', labelKey: 'factoryLabelPlatform', pool: Topics.platforms, result: '' }
  ],

  render() {
    const modeKeys = {
      random: 'factoryModeRandom', dice: 'factoryModeDice', wheel: 'factoryModeWheel',
      coin: 'factoryModeCoin', card: 'factoryModeCard', iching: 'factoryModeIching'
    };
    const modeOpts = ['random', 'dice', 'wheel', 'coin', 'card', 'iching'];

    const slotsHTML = this.template.map(slot => `
      <div class="factory-row">
        <span class="factory-label">${t(slot.labelKey)}</span>
        <select class="factory-mode-select" data-slot="${slot.id}">
          ${modeOpts.map(m => `<option value="${m}">${t(modeKeys[m])}</option>`).join('')}
        </select>
        <div class="factory-slot" id="slot-${slot.id}">?</div>
      </div>
    `).join('');

    return `
      <div class="card">
        <p style="color:var(--text-dim);margin-bottom:16px;font-size:0.9rem;">${t('factoryHint')}</p>
        <div class="factory-slots">${slotsHTML}</div>
        <button class="btn btn-primary" id="factoryGenerateBtn">${t('factoryGenerate')}</button>
        <div class="result-area factory-result" id="factoryResult"></div>
        <div class="result-actions" id="factoryActions" style="display:none;">
          <button class="copy-btn" id="factoryCopyBtn">📋 复制</button>
          <button class="publish-btn" id="factoryPublishBtn">${t('coinPublish')}</button>
        </div>
      </div>`;
  },

  onActivate() {
    const generateBtn = document.getElementById('factoryGenerateBtn');
    const resultEl = document.getElementById('factoryResult');
    const actionsEl = document.getElementById('factoryActions');
    const publishBtn = document.getElementById('factoryPublishBtn');
    const copyBtn = document.getElementById('factoryCopyBtn');
    const slots = {};

    this.template.forEach(slot => {
      slots[slot.id] = {
        el: document.getElementById('slot-' + slot.id),
        select: document.querySelector(`[data-slot="${slot.id}"]`),
        pool: slot.pool, value: ''
      };
    });

    function pickWithMode(pool, mode) {
      switch (mode) {
        case 'dice': return randomPick(shuffle(pool).slice(0, 6));
        case 'wheel': return randomPick(shuffle(pool).slice(0, 8));
        case 'coin': const two = shuffle(pool).slice(0, 2); return Math.random() < 0.5 ? two[0] : two[1];
        case 'card': return randomPick(shuffle(pool).slice(0, 32));
        case 'iching': return pool[randomInt(0, 64) % pool.length];
        default: return randomPick(pool);
      }
    }

    generateBtn.onclick = async () => {
      generateBtn.disabled = true;
      resultEl.classList.remove('filled'); resultEl.innerHTML = t('factoryGenerating');
      actionsEl.style.display = 'none';

      for (const slot of this.template) {
        const s = slots[slot.id];
        s.value = pickWithMode(s.pool, s.select.value);
        s.el.textContent = s.value;
        s.el.classList.add('filled');
        await delay(200);
      }

      const w = slots['who'].value, t = slots['tool'].value, f = slots['feature'].value, p = slots['platform'].value;
      const final = `给${w}用${t}做一个${f}，发布为${p}`;
      resultEl.innerHTML = `💡 给<strong>${w}</strong>用<strong>${t}</strong>做一个<strong>${f}</strong>，发布为<strong>${p}</strong>`;
      resultEl.classList.add('filled');
      actionsEl.style.display = 'flex';
      generateBtn.disabled = false;
      resultEl._lastResult = final;
    };

    publishBtn.onclick = () => publishIdea(resultEl._lastResult || '创意工厂组合结果', '创意工厂');
    copyBtn.onclick = () => copyToClipboard(resultEl._lastResult || '', copyBtn);
  }
});