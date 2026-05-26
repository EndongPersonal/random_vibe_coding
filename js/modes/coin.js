// ============================================================
// coin.js — 掷硬币模式
// ============================================================

App.register('coin', {
  render() {
    return `
      <div class="card">
        <div class="coin-scene">
          <div class="coin" id="coinEl">
            <div class="coin-side coin-heads">正</div>
            <div class="coin-side coin-tails">反</div>
          </div>
        </div>
        <p id="coinPair" style="color:var(--text-dim);margin-bottom:16px;font-size:0.9rem;">${t('coinLoading')}</p>
        <button class="btn btn-primary" id="coinFlipBtn">${t('coinFlip')}</button>
        <div class="result-area" id="coinResult"></div>
        <button class="publish-btn" id="coinPublishBtn" style="display:none;">${t('coinPublish')}</button>
      </div>`;
  },

  onActivate() {
    const coinEl = document.getElementById('coinEl');
    const pairEl = document.getElementById('coinPair');
    const flipBtn = document.getElementById('coinFlipBtn');
    const resultEl = document.getElementById('coinResult');
    const publishBtn = document.getElementById('coinPublishBtn');
    let currentPair = null;
    let currentResult = '';

    function pickPair() {
      currentPair = randomPick(Topics.coins);
      pairEl.textContent = `${currentPair.a}   VS   ${currentPair.b}`;
    }

    publishBtn.onclick = () => {
      publishIdea(currentResult, '掷硬币');
    };

    flipBtn.onclick = async () => {
      if (!currentPair) pickPair();
      coinEl.classList.remove('flipping');
      void coinEl.offsetWidth;
      coinEl.classList.add('flipping');
      flipBtn.disabled = true;
      resultEl.classList.remove('filled');
      resultEl.textContent = t('coinSpinning');
      publishBtn.style.display = 'none';

      const isHeads = Math.random() < 0.5;
      setTimeout(() => {
        coinEl.style.transform = isHeads ? 'rotateY(1440deg)' : 'rotateY(1620deg)';
      }, 300);

      await delay(1300);
      currentResult = isHeads ? currentPair.a : currentPair.b;
      resultEl.innerHTML = `🎯 <strong>${currentResult}</strong>`;
      resultEl.classList.add('filled');
      publishBtn.style.display = 'inline-flex';
      flipBtn.disabled = false;

      setTimeout(pickPair, 800);
    };

    pickPair();
  }
});