// ============================================================
// group.js — 分组模式
// ============================================================

App.register('group', {
  render() {
    return `
      <div class="card">
        <p style="color:var(--text-dim);margin-bottom:12px;font-size:0.9rem;">
          输入要分组的内容（每行一个），选择组数
        </p>
        <textarea class="group-input" id="groupInput" placeholder="项目A&#10;项目B&#10;项目C&#10;项目D&#10;项目E&#10;项目F"></textarea>
        <div class="group-count">
          <span style="color:var(--text-dim);font-size:0.9rem;">分成</span>
          <input type="number" id="groupNum" value="2" min="1" max="20">
          <span style="color:var(--text-dim);font-size:0.9rem;">组</span>
        </div>
        <button class="btn btn-primary" id="groupBtn">🎲 随机分组</button>
        <div class="group-results" id="groupResults"></div>
      </div>`;
  },

  onActivate() {
    const inputEl = document.getElementById('groupInput');
    const numEl = document.getElementById('groupNum');
    const groupBtn = document.getElementById('groupBtn');
    const resultsEl = document.getElementById('groupResults');

    // 预填示例
    if (!inputEl.value) {
      inputEl.value = '项目A\n项目B\n项目C\n项目D\n项目E\n项目F';
    }

    groupBtn.onclick = () => {
      const items = inputEl.value.split('\n').map(s => s.trim()).filter(Boolean);
      const numGroups = Math.max(1, Math.min(parseInt(numEl.value) || 2, items.length));

      if (items.length === 0) {
        resultsEl.innerHTML = '<p style="color:var(--text-dim);">请先输入内容</p>';
        return;
      }

      const shuffled = shuffle(items);
      const groups = [];
      for (let i = 0; i < numGroups; i++) groups.push([]);
      shuffled.forEach((item, i) => {
        groups[i % numGroups].push(item);
      });

      resultsEl.innerHTML = groups.map((g, i) => `
        <div class="group-col">
          <h3>第 ${i + 1} 组 (${g.length}项)</h3>
          ${g.map(item => `<li>${item}</li>`).join('')}
        </div>
      `).join('');
    };
  }
});