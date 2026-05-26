// ============================================================
// almanac.js — 黄历模式 (含每日灵感)
// ============================================================

App.register('almanac', {
  render() {
    return `
      <div class="card">
        <div class="almanac-date">📅 ${todayCN()} · ${weekdayCN()}</div>

        <div class="almanac-grid">
          <div class="almanac-col good">
            <h3>${t('almanacGood')}</h3>
            <ul id="almanacGood"></ul>
          </div>
          <div class="almanac-col bad">
            <h3>${t('almanacBad')}</h3>
            <ul id="almanacBad"></ul>
          </div>
        </div>

        <div class="result-area" id="almanacIdea" style="margin-top:24px;">
          ✨ 今日灵感加载中...
        </div>

        <button class="btn btn-primary" id="almanacRefreshBtn" style="margin-top:16px;">${t('almanacRefresh')}</button>
        <p style="color:var(--text-dim);font-size:0.75rem;margin-top:8px;">${t('almanacNote')}</p>
      </div>`;
  },

  onActivate() {
    const goodEl = document.getElementById('almanacGood');
    const badEl = document.getElementById('almanacBad');
    const ideaEl = document.getElementById('almanacIdea');
    const refreshBtn = document.getElementById('almanacRefreshBtn');
    let useRandom = false;
    let activateTime = Date.now();

    function render() {
      let goodItems, badItems, cardIdea, factoryIdea;

      const seed = useRandom ? String(activateTime + Math.random()) : todayStr();

      if (useRandom) {
        goodItems = shuffle(Topics.almanac.good).slice(0, 5);
        badItems = shuffle(Topics.almanac.bad).slice(0, 5);
        cardIdea = randomPick(Topics.cards);
        factoryIdea = randomPick(Topics.users) + ' · ' + randomPick(Topics.tools) + ' · ' + randomPick(Topics.features);
      } else {
        // 基于日期种子，同一天结果完全一致
        const rng = seededRandom(seed);
        const pickN = (arr, n) => {
          const shuffled = arr.map((v, i) => ({ v, i, r: rng() }))
            .sort((a, b) => a.r - b.r);
          return shuffled.slice(0, n).map(x => x.v);
        };
        goodItems = pickN(Topics.almanac.good, 5);
        badItems = pickN(Topics.almanac.bad, 5);
        cardIdea = pickN(Topics.cards, 1)[0];
        const u = pickN(Topics.users, 1)[0];
        const tk = pickN(Topics.tools, 1)[0];
        const ft = pickN(Topics.features, 1)[0];
        const pf = pickN(Topics.platforms, 1)[0];
        factoryIdea = `给${u}用${tk}做一个${ft}，发布为${pf}`;
      }

      goodEl.innerHTML = goodItems.map(i => `<li>${i}</li>`).join('');
      badEl.innerHTML = badItems.map(i => `<li>${i}</li>`).join('');

      ideaEl.innerHTML = `
        <div style="margin-bottom:8px;font-size:0.8rem;color:var(--text-dim);">🌟 ${useRandom ? '随机灵感' : '今日灵感'}</div>
        <div style="font-size:1.1rem;line-height:1.7;">
          <strong>${cardIdea}</strong>
        </div>
        <div style="margin-top:12px;padding-top:12px;border-top:1px solid var(--border);font-size:0.95rem;color:var(--text-dim);">
          💡 ${factoryIdea}
        </div>
      `;
      ideaEl.classList.add('filled');
    }

    // 移除旧的监听器 (防止重复绑定)
    refreshBtn.onclick = null;
    refreshBtn.onclick = () => {
      activateTime = Date.now();
      useRandom = true;
      render();
    };

    render();
  }
});