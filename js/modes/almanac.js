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
            <h3>✅ 今日宜</h3>
            <ul id="almanacGood"></ul>
          </div>
          <div class="almanac-col bad">
            <h3>❌ 今日忌</h3>
            <ul id="almanacBad"></ul>
          </div>
        </div>
        <button class="btn btn-primary" id="almanacRefreshBtn" style="margin-top:16px;">🔮 再看一天</button>
        <p style="color:var(--text-dim);font-size:0.75rem;margin-top:8px;">
          基于日期种子生成，同一天结果一致
        </p>
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
        // 随机模式
        goodItems = shuffle(Topics.almanac.good).slice(0, 5);
        badItems = shuffle(Topics.almanac.bad).slice(0, 5);
      } else {
        // 基于日期种子
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
      // 切回日期模式
      setTimeout(() => { useRandom = false; }, 3000);
    };
  }
});