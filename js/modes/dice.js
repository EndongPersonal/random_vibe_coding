// ============================================================
// dice.js — 骰子模式
// ============================================================

App.register('dice', {
  render() {
    return `
      <div class="card">
        <div class="dice-scene">
          <div class="dice" id="diceEl">
            <div class="dice-face dice-front">1</div>
            <div class="dice-face dice-back">6</div>
            <div class="dice-face dice-right">2</div>
            <div class="dice-face dice-left">5</div>
            <div class="dice-face dice-top">3</div>
            <div class="dice-face dice-bottom">4</div>
          </div>
        </div>
        <button class="btn btn-primary" id="diceRollBtn">🎲 掷骰子</button>
        <div class="result-area" id="diceResult"></div>
        <button class="publish-btn" id="dicePublishBtn" style="display:none;">
          📤 发布到 Trends
        </button>
      </div>`;
  },

  onActivate() {
    const diceEl = document.getElementById('diceEl');
    const rollBtn = document.getElementById('diceRollBtn');
    const resultEl = document.getElementById('diceResult');
    const publishBtn = document.getElementById('dicePublishBtn');

    const faceRotations = [
      'rotateX(0deg) rotateY(0deg)',           // 1
      'rotateX(0deg) rotateY(90deg)',           // 2
      'rotateX(-90deg) rotateY(0deg)',          // 3
      'rotateX(90deg) rotateY(0deg)',           // 4
      'rotateX(0deg) rotateY(-90deg)',          // 5
      'rotateX(0deg) rotateY(180deg)',          // 6
    ];

    rollBtn.onclick = async () => {
      const face = randomInt(0, 6);
      const topic = Topics.dice[face];

      // 先动画回正
      diceEl.style.transition = 'transform 0.1s';
      diceEl.style.transform = 'rotateX(0deg) rotateY(0deg)';
      await delay(100);

      // 滚动动画 + 结果
      diceEl.style.transition = 'transform 0.8s cubic-bezier(0.25, 0.1, 0.25, 1)';
      diceEl.style.transform = `rotateX(1080deg) rotateY(${720 + face * 90}deg)`;
      rollBtn.disabled = true;
      resultEl.classList.remove('filled');
      resultEl.textContent = '滚动中...';
      publishBtn.style.display = 'none';

      await delay(900);

      // 精确停在结果面
      diceEl.style.transition = 'transform 0.4s ease-out';
      diceEl.style.transform = faceRotations[face];

      resultEl.innerHTML = `🎯 <strong>${topic}</strong>`;
      resultEl.classList.add('filled');
      publishBtn.style.display = 'inline-flex';
      rollBtn.disabled = false;

      // 保存用于发布
      diceEl._lastResult = topic;
    };

    // 发布按钮
    publishBtn.onclick = () => {
      const text = diceEl._lastResult || Topics.dice[0];
      publishIdea(text, '骰子');
    };
  }
});