// ============================================================
// almanac.js — 黄历模式
// ============================================================

App.register('almanac', {
  render() {
    return `
      <div class="card">
        <div class="almanac-date">
          📅 ${todayCN()} · ${weekdayCN()}
        </div>
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
        <button class="btn btn-primary" id="almanacRefreshBtn" style="margin-top:16px;">${t('almanacRefresh')}</button>
        <p style="color:var(--text-dim);font-size:0.75rem;margin-top:8px;">${t('almanacNote')}</p>
      </div>`;
  },

  onActivate() {
    const goodEl = document.getElementById('almanacGood');
    const badEl = document.getElementById('almanacBad');
    const refreshBtn = document.getElementById('almanacRefreshBtn');
    let useRandom = false;

    function render() {
      let goodItems, badItems;

      if (useRandom) {
        goodItems = shuffle(Topics.almanac.good).slice(0, 5);
        badItems = shuffle(Topics.almanac.bad).slice(0, 5);
      } else {
        goodItems = dailyPick(Topics.almanac.good, 5);
        badItems = dailyPick(Topics.almanac.bad, 5);
      }

      goodEl.innerHTML = goodItems.map(i => `<li>${i}</li>`).join('');
      badEl.innerHTML = badItems.map(i => `<li>${i}</li>`).join('');
    }

    render();

    refreshBtn.onclick = () => {
      useRandom = true;
      render();
      setTimeout(() => { useRandom = false; }, 3000);
    };
  }
});