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
        <p id="coinPair" style="color:var(--text-dim);margin-bottom:16px;font-size:0.9rem;">加载中...</p>
        <button class="btn btn-primary" id="coinFlipBtn">🪙 抛硬币</button>
        <div class="result-area" id="coinResult"></div>
        <button class="publish-btn" id="coinPublishBtn" style="display:none;">
          📤 发布到 Trends
        </button>
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
      resultEl.textContent = '旋转中...';
      publishBtn.style.display = 'none';

      const isHeads = Math.random() < 0.5;
      const face = isHeads ? 'heads' : 'tails';

      setTimeout(() => {
        coinEl.style.transform = isHeads ? 'rotateY(1440deg)' : 'rotateY(1620deg)';
      }, 300);

      await delay(1300);
      currentResult = isHeads ? currentPair.a : currentPair.b;
      resultEl.innerHTML = `🎯 <strong>${currentResult}</strong>`;
      resultEl.classList.add('filled');
      publishBtn.style.display = 'inline-flex';
      flipBtn.disabled = false;

      // 下次再抛换一组
      setTimeout(pickPair, 800);
    };

    pickPair();
  }
});