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
        <button class="publish-btn" id="factoryPublishBtn" style="display:none;">${t('coinPublish')}</button>
      </div>`;
  },

  onActivate() {
    const generateBtn = document.getElementById('factoryGenerateBtn');
    const resultEl = document.getElementById('factoryResult');
    const publishBtn = document.getElementById('factoryPublishBtn');
    const slots = {};

    this.template.forEach(slot => {
      slots[slot.id] = {
        el: document.getElementById('slot-' + slot.id),
        select: document.querySelector(`[data-slot="${slot.id}"]`),
        pool: slot.pool,
        value: ''
      };
    });

    function pickWithMode(pool, mode) {
      switch (mode) {
        case 'dice': return randomPick(shuffle(pool).slice(0, 6));
        case 'wheel': return randomPick(shuffle(pool).slice(0, 8));
        case 'coin': const two = shuffle(pool).slice(0, 2); return Math.random() < 0.5 ? two[0] : two[1];
        case 'card': return randomPick(shuffle(pool).slice(0, 32));
        case 'iching': return pool[randomInt(0, 64) % pool.length];
        case 'random': default: return randomPick(pool);
      }
    }

    generateBtn.onclick = async () => {
      generateBtn.disabled = true;
      resultEl.classList.remove('filled');
      resultEl.innerHTML = t('factoryGenerating');
      publishBtn.style.display = 'none';

      for (const slot of this.template) {
        const s = slots[slot.id];
        const mode = s.select.value;
        s.value = pickWithMode(s.pool, mode);
        s.el.textContent = s.value;
        s.el.classList.add('filled');
        await delay(200);
      }

      const who = slots['who'].value;
      const tool = slots['tool'].value;
      const feat = slots['feature'].value;
      const plat = slots['platform'].value;
      const final = `给${who}用${tool}做一个${feat}，发布为${plat}`;

      resultEl.innerHTML = `💡 给<strong>${who}</strong>用<strong>${tool}</strong>做一个<strong>${feat}</strong>，发布为<strong>${plat}</strong>`;
      resultEl.classList.add('filled');
      publishBtn.style.display = 'inline-flex';
      generateBtn.disabled = false;
      resultEl._lastResult = final;
    };

    publishBtn.onclick = () => {
      publishIdea(resultEl._lastResult || '创意工厂组合结果', '创意工厂');
    };
  }
});