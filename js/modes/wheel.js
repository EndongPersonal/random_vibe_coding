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
        <button class="btn btn-primary" id="wheelSpinBtn">${t('wheelSpin')}</button>
        <div class="result-area" id="wheelResult"></div>
        <div class="result-actions" id="wheelActions" style="display:none;">
          <button class="copy-btn" id="wheelCopyBtn">${t('copyBtn')}</button>
          <button class="publish-btn" id="wheelPublishBtn">${t('coinPublish')}</button>
        </div>
      </div>`;
  },

  onActivate() {
    const canvas = document.getElementById('wheelCanvas');
    const spinBtn = document.getElementById('wheelSpinBtn');
    const resultEl = document.getElementById('wheelResult');
    const actionsEl = document.getElementById('wheelActions');
    const publishBtn = document.getElementById('wheelPublishBtn');
    const copyBtn = document.getElementById('wheelCopyBtn');
    const ctx = canvas.getContext('2d');

    let options = shuffle(Topics.cards).slice(0, 8);
    const colors = ['#ff4da6','#4da6ff','#4dff88','#ffdd4d','#a855f7','#ff6b6b','#48dbfb','#feca57'];

    function drawWheel(rotation = 0) {
      const cx = 280, cy = 280, r = 260;
      ctx.clearRect(0, 0, 560, 560);
      const n = options.length;
      const arc = (2 * Math.PI) / n;
      for (let i = 0; i < n; i++) {
        const sa = rotation + i * arc - Math.PI / 2;
        ctx.beginPath(); ctx.moveTo(cx, cy); ctx.arc(cx, cy, r, sa, sa + arc);
        ctx.fillStyle = colors[i % colors.length]; ctx.fill();
        ctx.strokeStyle = 'rgba(255,255,255,0.2)'; ctx.lineWidth = 2; ctx.stroke();
        ctx.save(); ctx.translate(cx, cy); ctx.rotate(sa + arc / 2);
        ctx.textAlign = 'right'; ctx.fillStyle = '#fff';
        ctx.font = 'bold 12px "Segoe UI", system-ui, sans-serif';
        let text = options[i]; if (text.length > 10) text = text.slice(0, 10) + '\u2026';
        ctx.fillText(text, r - 20, 5); ctx.restore();
      }
      ctx.beginPath(); ctx.arc(cx, cy, 30, 0, 2 * Math.PI);
      ctx.fillStyle = '#12122a'; ctx.fill();
      ctx.strokeStyle = '#fff'; ctx.lineWidth = 3; ctx.stroke();
      ctx.fillStyle = '#fff'; ctx.font = 'bold 14px "Segoe UI", system-ui, sans-serif';
      ctx.textAlign = 'center'; ctx.fillText(t('wheelCenter'), cx, cy + 5);
    }

    drawWheel();

    spinBtn.onclick = async () => {
      options = shuffle(Topics.cards).slice(0, 8);
      const spins = 5 + Math.random() * 8;
      const totalAngle = spins * 2 * Math.PI;
      const n = options.length, arc = (2 * Math.PI) / n;
      const target = randomInt(0, n);
      const finalAngle = totalAngle + (n - target) * arc + arc / 2;

      spinBtn.disabled = true;
      resultEl.classList.remove('filled'); resultEl.textContent = t('wheelSpinning');
      actionsEl.style.display = 'none';

      const startTime = performance.now();
      const duration = 4000;

      function animate(now) {
        const t = Math.min((now - startTime) / duration, 1);
        drawWheel(finalAngle * (1 - Math.pow(1 - t, 3)));
        if (t < 1) { requestAnimationFrame(animate); } else {
          const norm = ((finalAngle % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
          const winIdx = Math.floor(((2 * Math.PI - norm + Math.PI / 2) % (2 * Math.PI)) / arc) % n;
          const winner = options[winIdx];
          resultEl.innerHTML = `🎯 <strong>${winner}</strong>`;
          resultEl.classList.add('filled');
          actionsEl.style.display = 'flex';
          spinBtn.disabled = false;
          canvas._lastResult = winner;
        }
      }
      requestAnimationFrame(animate);
    };

    publishBtn.onclick = () => publishIdea(canvas._lastResult || '转盘随机项目', t('trendsSourceWheel'));
    copyBtn.onclick = () => copyToClipboard(canvas._lastResult || '', copyBtn);
  }
});