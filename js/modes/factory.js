// ============================================================
// factory.js — 创意工厂模式
// ============================================================

App.register('factory', {
  render() {
    const modeKeys = {
      random: 'factoryModeRandom', dice: 'factoryModeDice', wheel: 'factoryModeWheel',
      coin: 'factoryModeCoin', card: 'factoryModeCard', iching: 'factoryModeIching'
    };
    const modeOpts = ['random', 'dice', 'wheel', 'coin', 'card', 'iching'];
    const slots = [
      { id: 'who', labelKey: 'factoryLabelWho' },
      { id: 'tool', labelKey: 'factoryLabelTool' },
      { id: 'feature', labelKey: 'factoryLabelFeature' },
      { id: 'platform', labelKey: 'factoryLabelPlatform' }
    ];

    const slotsHTML = slots.map(s => `
      <div class="factory-row">
        <span class="factory-label">${t(s.labelKey)}</span>
        <select class="factory-mode-select" id="sel-${s.id}">
          ${modeOpts.map(m => `<option value="${m}">${t(modeKeys[m])}</option>`).join('')}
        </select>
        <div class="factory-slot" id="slot-${s.id}">?</div>
      </div>
    `).join('');

    return `
      <div class="card">
        <p style="color:var(--text-dim);margin-bottom:16px;font-size:0.9rem;">${t('factoryHint')}</p>
        <div class="factory-slots">${slotsHTML}</div>
        <button class="btn btn-primary" id="factoryGenerateBtn">${t('factoryGenerate')}</button>
        <div class="result-area factory-result" id="factoryResult"></div>
        <div class="result-actions" id="factoryActions" style="display:none;">
          <button class="copy-btn" id="factoryCopyBtn">${t('copyBtn')}</button>
          <button class="publish-btn" id="factoryPublishBtn">${t('coinPublish')}</button>
        </div>
      </div>`;
  },

  onActivate() {
    const btn = document.getElementById('factoryGenerateBtn');
    const resultEl = document.getElementById('factoryResult');
    const actionsEl = document.getElementById('factoryActions');
    const copyBtn = document.getElementById('factoryCopyBtn');
    const publishBtn = document.getElementById('factoryPublishBtn');

    // 池子映射
    const pools = {
      who: Topics.users,
      tool: Topics.tools,
      feature: Topics.features,
      platform: Topics.platforms
    };

    // 选择器
    const selects = {
      who: document.getElementById('sel-who'),
      tool: document.getElementById('sel-tool'),
      feature: document.getElementById('sel-feature'),
      platform: document.getElementById('sel-platform')
    };

    // 显示槽
    const slotEls = {
      who: document.getElementById('slot-who'),
      tool: document.getElementById('slot-tool'),
      feature: document.getElementById('slot-feature'),
      platform: document.getElementById('slot-platform')
    };

    function pickWithMode(pool, mode) {
      switch (mode) {
        case 'dice': return randomPick(shuffle(pool).slice(0, 6));
        case 'wheel': return randomPick(shuffle(pool).slice(0, 8));
        case 'coin': {
          const two = shuffle(pool).slice(0, 2);
          return Math.random() < 0.5 ? two[0] : two[1];
        }
        case 'card': return randomPick(shuffle(pool).slice(0, 32));
        case 'iching': return pool[randomInt(0, 64) % pool.length];
        default: return randomPick(pool);
      }
    }

    btn.onclick = async function() {
      btn.disabled = true;
      resultEl.classList.remove('filled');
      resultEl.innerHTML = t('factoryGenerating');
      actionsEl.style.display = 'none';

      const ids = ['who', 'tool', 'feature', 'platform'];
      const values = {};

      for (const id of ids) {
        const mode = selects[id].value;
        values[id] = pickWithMode(pools[id], mode);
        slotEls[id].textContent = values[id];
        slotEls[id].classList.add('filled');
        await delay(200);
      }

      const final = `给${values.who}用${values.tool}做一个${values.feature}，发布为${values.platform}`;
      resultEl.innerHTML = `💡 给<strong>${values.who}</strong>用<strong>${values.tool}</strong>做一个<strong>${values.feature}</strong>，发布为<strong>${values.platform}</strong>`;
      resultEl.classList.add('filled');
      actionsEl.style.display = 'flex';
      btn.disabled = false;
      resultEl._lastResult = final;
    };

    publishBtn.onclick = function() {
      publishIdea(resultEl._lastResult || '创意工厂组合结果', t('trendsSourceFactory'));
    };
    copyBtn.onclick = function() {
      copyToClipboard(resultEl._lastResult || '');
    };
  }
});