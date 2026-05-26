// ============================================================
// card.js — 抽卡模式
// ============================================================

App.register('card', {
  render() {
    return `
      <div class="card">
        <div class="card-deck" id="cardDeck">
          <div class="card-item" id="cardItem">
            <div class="card-face card-front">🃏</div>
            <div class="card-face card-back" id="cardBack">点击抽卡</div>
          </div>
        </div>
        <button class="btn btn-primary" id="cardDrawBtn">🃏 抽一张卡</button>
        <div class="result-area" id="cardResult"></div>
        <button class="publish-btn" id="cardPublishBtn" style="display:none;">
          📤 发布到 Trends
        </button>
      </div>`;
  },

  onActivate() {
    const cardItem = document.getElementById('cardItem');
    const cardBack = document.getElementById('cardBack');
    const drawBtn = document.getElementById('cardDrawBtn');
    const resultEl = document.getElementById('cardResult');
    const publishBtn = document.getElementById('cardPublishBtn');
    let currentCard = '';

    // 初始状态: 正面朝上
    cardItem.classList.add('flipped');

    drawBtn.onclick = async () => {
      currentCard = randomPick(Topics.cards);

      // 翻回正面
      cardItem.classList.remove('flipped');
      await delay(400);

      // 更新背面文字
      cardBack.textContent = currentCard;

      // 翻到背面
      cardItem.classList.add('flipped');
      drawBtn.disabled = true;
      resultEl.classList.remove('filled');
      resultEl.textContent = '抽卡中...';
      publishBtn.style.display = 'none';

      await delay(700);

      resultEl.innerHTML = `🎯 <strong>${currentCard}</strong>`;
      resultEl.classList.add('filled');
      publishBtn.style.display = 'inline-flex';
      drawBtn.disabled = false;
    };

    publishBtn.onclick = () => {
      publishIdea(currentCard, '抽卡');
    };

    // 点击牌堆也可以抽
    document.getElementById('cardDeck').onclick = () => drawBtn.click();
  }
});