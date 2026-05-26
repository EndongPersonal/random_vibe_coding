// ============================================================
// iching.js — 梅花易数模式
// ============================================================

App.register('iching', {
  render() {
    return `
      <div class="card">
        <p style="color:var(--text-dim);margin-bottom:16px;font-size:0.9rem;">${t('ichingHint')}</p>
        <div class="iching-coin-box" id="ichingCoins">
          <div class="iching-coin">🪙</div>
          <div class="iching-coin">🪙</div>
          <div class="iching-coin">🪙</div>
        </div>
        <div class="hexagram" id="ichingHexagram" style="min-height:60px;"></div>
        <button class="btn btn-primary" id="ichingCastBtn">${t('ichingCast')}</button>
        <div class="result-area" id="ichingResult"></div>
        <button class="publish-btn" id="ichingPublishBtn" style="display:none;">${t('coinPublish')}</button>
      </div>`;
  },

  onActivate() {
    const coinsEl = document.getElementById('ichingCoins');
    const hexagramEl = document.getElementById('ichingHexagram');
    const castBtn = document.getElementById('ichingCastBtn');
    const resultEl = document.getElementById('ichingResult');
    const publishBtn = document.getElementById('ichingPublishBtn');

    castBtn.onclick = async () => {
      castBtn.disabled = true;
      resultEl.classList.remove('filled');
      resultEl.textContent = t('ichingCasting');
      publishBtn.style.display = 'none';

      const lines = [];
      let lineStr = '';

      for (let row = 0; row < 6; row++) {
        const coinEls = coinsEl.querySelectorAll('.iching-coin');
        coinEls.forEach(c => {
          c.classList.remove('flipping');
          void c.offsetWidth;
          c.classList.add('flipping');
        });
        await delay(700);

        const coins = [Math.random() < 0.5, Math.random() < 0.5, Math.random() < 0.5];
        const heads = coins.filter(c => c).length;
        const isYang = heads >= 2;
        lines.unshift(isYang);
        lineStr = lines.map(l => l ? '⚊' : '⚋').join('<br>');
        hexagramEl.innerHTML = lineStr;
      }

      let val = 0;
      for (let i = 0; i < 6; i++) {
        if (lines[i]) val |= (1 << i);
      }
      const hexIdx = val % 64;
      const hex = Topics.iching[hexIdx];

      const output = `${hex.trigram} ${hex.name} — ${hex.advice}`;
      resultEl.innerHTML = `
        <div style="font-size:2rem;">${hex.trigram}</div>
        <div style="font-size:1.3rem;font-weight:700;">${hex.name}</div>
        <div style="margin-top:8px;color:var(--text-dim);">${hex.advice}</div>
      `;
      resultEl.classList.add('filled');
      publishBtn.style.display = 'inline-flex';
      publishBtn._lastResult = output;
      castBtn.disabled = false;
    };

    publishBtn.onclick = () => {
      publishIdea(publishBtn._lastResult || '梅花易数卦象', '梅花易数');
    };
  }
});