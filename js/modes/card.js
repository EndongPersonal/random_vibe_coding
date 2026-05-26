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
            <div class="card-face card-back" id="cardBack">${t('cardHint')}</div>
          </div>
        </div>
        <button class="btn btn-primary" id="cardDrawBtn">${t('cardDraw')}</button>
        <div class="result-area" id="cardResult"></div>
        <button class="publish-btn" id="cardPublishBtn" style="display:none;">${t('coinPublish')}</button>
      </div>`;
  },

  onActivate() {
    const cardItem = document.getElementById('cardItem');
    const cardBack = document.getElementById('cardBack');
    const drawBtn = document.getElementById('cardDrawBtn');
    const resultEl = document.getElementById('cardResult');
    const publishBtn = document.getElementById('cardPublishBtn');
    let currentCard = '';

    cardItem.classList.add('flipped');

    drawBtn.onclick = async () => {
      currentCard = randomPick(Topics.cards);
      cardItem.classList.remove('flipped');
      await delay(400);
      cardBack.textContent = currentCard;
      cardItem.classList.add('flipped');
      drawBtn.disabled = true;
      resultEl.classList.remove('filled');
      resultEl.textContent = t('cardDrawing');
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

    document.getElementById('cardDeck').onclick = () => drawBtn.click();
  }
});