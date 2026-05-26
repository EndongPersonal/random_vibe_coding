// ============================================================
// wheel.js — 转盘模式
// ============================================================

App.register('wheel', {
  render() {
    return `
      <div class="card">
        <div class="wheel-container">
          <div class="wheel-pointer"></div>
          <canvas class="wheel-canvas" id="wheelCanvas" width="560" height="560"></canvas>
        </div>
        <button class="btn btn-primary" id="wheelSpinBtn">🎡 旋转转盘</button>
        <div class="result-area" id="wheelResult"></div>
        <button class="publish-btn" id="wheelPublishBtn" style="display:none;">
          📤 发布到 Trends
        </button>
      </div>`;
  },

  onActivate() {
    const canvas = document.getElementById('wheelCanvas');
    const spinBtn = document.getElementById('wheelSpinBtn');
    const resultEl = document.getElementById('wheelResult');
    const publishBtn = document.getElementById('wheelPublishBtn');
    const ctx = canvas.getContext('2d');

    // 从卡片池随机选 8 个
    let options = shuffle(Topics.cards).slice(0, 8);
    const colors = ['#ff4da6','#4da6ff','#4dff88','#ffdd4d','#a855f7','#ff6b6b','#48dbfb','#feca57'];

    function drawWheel(rotation = 0) {
      const cx = 280, cy = 280, r = 260;
      ctx.clearRect(0, 0, 560, 560);
      const n = options.length;
      const arc = (2 * Math.PI) / n;

      for (let i = 0; i < n; i++) {
        const startAngle = rotation + i * arc - Math.PI / 2;
        const endAngle = startAngle + arc;

        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.arc(cx, cy, r, startAngle, endAngle);
        ctx.fillStyle = colors[i % colors.length];
        ctx.fill();
        ctx.strokeStyle = 'rgba(255,255,255,0.2)';
        ctx.lineWidth = 2;
        ctx.stroke();

        // 文字
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(startAngle + arc / 2);
        ctx.textAlign = 'right';
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 12px "Segoe UI", system-ui, sans-serif';
        // 截断长文本
        let text = options[i];
        if (text.length > 10) text = text.slice(0, 10) + '…';
        ctx.fillText(text, r - 20, 5);
        ctx.restore();
      }

      // 中心圆
      ctx.beginPath();
      ctx.arc(cx, cy, 30, 0, 2 * Math.PI);
      ctx.fillStyle = '#12122a';
      ctx.fill();
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 3;
      ctx.stroke();

      // 中心文字
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 14px "Segoe UI", system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('SPIN', cx, cy + 5);
    }

    drawWheel();

    spinBtn.onclick = async () => {
      // 随机新选项
      options = shuffle(Topics.cards).slice(0, 8);

      const spins = 5 + Math.random() * 8; // 5-13 圈
      const totalAngle = spins * 2 * Math.PI;
      const n = options.length;
      const arc = (2 * Math.PI) / n;
      const target = randomInt(0, n);
      // 让指针停在 target 扇区中间
      const finalAngle = totalAngle + (n - target) * arc + arc / 2;

      spinBtn.disabled = true;
      resultEl.classList.remove('filled');
      resultEl.textContent = '旋转中...';
      publishBtn.style.display = 'none';

      // 动画
      const startTime = performance.now();
      const duration = 4000;

      function animate(now) {
        const elapsed = now - startTime;
        const t = Math.min(elapsed / duration, 1);
        // easeOutCubic
        const eased = 1 - Math.pow(1 - t, 3);
        const angle = finalAngle * eased;
        drawWheel(angle);

        if (t < 1) {
          requestAnimationFrame(animate);
        } else {
          // 最终状态
          const normalizedAngle = ((finalAngle % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
          const winnerIndex = Math.floor(((2 * Math.PI - normalizedAngle + Math.PI / 2) % (2 * Math.PI)) / arc) % n;
          const winner = options[winnerIndex];

          resultEl.innerHTML = `🎯 <strong>${winner}</strong>`;
          resultEl.classList.add('filled');
          publishBtn.style.display = 'inline-flex';
          spinBtn.disabled = false;
          canvas._lastResult = winner;
        }
      }

      requestAnimationFrame(animate);
    };

    publishBtn.onclick = () => {
      publishIdea(canvas._lastResult || '转盘随机项目', '转盘');
    };
  }
});