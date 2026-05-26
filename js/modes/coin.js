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
        <div class="result-actions" id="coinActions" style="display:none;">
          <button class="copy-btn" id="coinCopyBtn">📋 复制</button>
          <button class="publish-btn" id="coinPublishBtn">${t('coinPublish')}</button>
        </div>
      </div>`;
  },

  onActivate() {
    const coinEl = document.getElementById('coinEl');
    const pairEl = document.getElementById('coinPair');
    const flipBtn = document.getElementById('coinFlipBtn');
    const resultEl = document.getElementById('coinResult');
    const actionsEl = document.getElementById('coinActions');
    const publishBtn = document.getElementById('coinPublishBtn');
    const copyBtn = document.getElementById('coinCopyBtn');
    let currentPair = null;
    let currentResult = '';

    function pickPair() {
      currentPair = randomPick(Topics.coins);
      pairEl.textContent = `${currentPair.a}   VS   ${currentPair.b}`;
    }

    publishBtn.onclick = () => publishIdea(currentResult, '掷硬币');
    copyBtn.onclick = () => copyToClipboard(currentResult, copyBtn);

    flipBtn.onclick = async () => {
      if (!currentPair) pickPair();
      coinEl.classList.remove('flipping');
      void coinEl.offsetWidth;
      coinEl.classList.add('flipping');
      flipBtn.disabled = true;
      resultEl.classList.remove('filled');
      resultEl.textContent = t('coinSpinning');
      actionsEl.style.display = 'none';

      const isHeads = Math.random() < 0.5;
      setTimeout(() => {
        coinEl.style.transform = isHeads ? 'rotateY(1440deg)' : 'rotateY(1620deg)';
      }, 300);

      await delay(1300);
      currentResult = isHeads ? currentPair.a : currentPair.b;
      resultEl.innerHTML = `🎯 <strong>${currentResult}</strong>`;
      resultEl.classList.add('filled');
      actionsEl.style.display = 'flex';
      flipBtn.disabled = false;

      setTimeout(pickPair, 800);
    };

    pickPair();
  }
});