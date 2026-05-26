// ============================================================
// group.js — 分组模式
// ============================================================

App.register('group', {
  render() {
    return `
      <div class="card">
        <p style="color:var(--text-dim);margin-bottom:12px;font-size:0.9rem;">${t('groupHint')}</p>
        <textarea class="group-input" id="groupInput" placeholder="Item A&#10;Item B&#10;Item C&#10;Item D&#10;Item E&#10;Item F"></textarea>
        <div class="group-count">
          <span style="color:var(--text-dim);font-size:0.9rem;">${t('groupSplit')}</span>
          <input type="number" id="groupNum" value="2" min="1" max="20">
          <span style="color:var(--text-dim);font-size:0.9rem;">${t('groupUnit')}</span>
        </div>
        <button class="btn btn-primary" id="groupBtn">${t('groupBtn')}</button>
        <div class="group-results" id="groupResults"></div>
      </div>`;
  },

  onActivate() {
    const inputEl = document.getElementById('groupInput');
    const numEl = document.getElementById('groupNum');
    const groupBtn = document.getElementById('groupBtn');
    const resultsEl = document.getElementById('groupResults');

    if (!inputEl.value) {
      inputEl.value = 'Item A\nItem B\nItem C\nItem D\nItem E\nItem F';
    }

    groupBtn.onclick = () => {
      const items = inputEl.value.split('\n').map(s => s.trim()).filter(Boolean);
      const numGroups = Math.max(1, Math.min(parseInt(numEl.value) || 2, items.length));

      if (items.length === 0) {
        resultsEl.innerHTML = `<p style="color:var(--text-dim);">${t('groupEmpty')}</p>`;
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
          <h3>${t('groupCol')} ${i + 1} (${g.length} ${t('groupItems')})</h3>
          ${g.map(item => `<li>${item}</li>`).join('')}
        </div>
      `).join('');
    };
  }
});