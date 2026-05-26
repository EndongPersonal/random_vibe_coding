// ============================================================
// trends.js — 灵感 Trends 模式
// 发布想法 + ❤️点赞 + 排行榜
// ============================================================

// 全局发布函数 (供其他模式调用)
function publishIdea(content, source) {
  const ideas = loadData('trends_ideas', []);
  ideas.unshift({
    content,
    source,
    likes: 0,
    time: new Date().toISOString()
  });
  saveData('trends_ideas', ideas);

  // 如果 Trends 面板已渲染，刷新
  const panel = document.getElementById('panel-trends');
  if (panel && panel.classList.contains('active')) {
    App.switchMode('trends');
  }
}

App.register('trends', {
  render() {
    return `
      <div class="card" id="trendsCard">
        <div class="trends-tabs">
          <button class="trends-tab active" data-sort="hot">🔥 热门</button>
          <button class="trends-tab" data-sort="new">🕐 最新</button>
        </div>
        <div class="trends-list" id="trendsList"></div>
        <p style="text-align:center;margin-top:16px;color:var(--text-dim);font-size:0.8rem;">
          💡 在其他模式生成后点击「发布到 Trends」即可投稿<br>
          📊 数据存储在本地浏览器，暂不支持跨设备同步
        </p>
      </div>`;
  },

  onActivate() {
    const listEl = document.getElementById('trendsList');
    const tabs = document.querySelectorAll('#panel-trends .trends-tab');
    let sortMode = 'hot';

    function loadIdeas() {
      let ideas = loadData('trends_ideas', []);

      // 如果本地没有数据，用种子数据
      if (ideas.length === 0) {
        ideas = Topics.seedIdeas.map(s => ({
          ...s,
          time: new Date(Date.now() - randomInt(0, 86400000 * 30)).toISOString()
        }));
        saveData('trends_ideas', ideas);
      }

      // 读取点赞状态
      const liked = loadData('trends_liked', {});

      if (sortMode === 'hot') {
        ideas.sort((a, b) => b.likes - a.likes);
      } else {
        ideas.sort((a, b) => new Date(b.time) - new Date(a.time));
      }

      listEl.innerHTML = ideas.map((idea, i) => {
        const isLiked = liked[idea.content] || false;
        const rank = sortMode === 'hot' ? i + 1 : null;
        const rankClass = rank && rank <= 3 ? ' top' : '';

        return `
          <div class="trends-item" data-idx="${i}">
            ${rank ? `<span class="trends-rank${rankClass}">#${rank}</span>` : ''}
            <div style="flex:1;min-width:0;">
              <span class="trends-source">${idea.source}</span>
              <div class="trends-content" style="margin-top:4px;">${idea.content}</div>
              <div class="trends-meta">
                <span>${formatTime(idea.time)}</span>
              </div>
            </div>
            <button class="trends-heart${isLiked ? ' liked' : ''}" data-idx="${i}">
              ${isLiked ? '❤️' : '🤍'}
              <span class="trends-heart-count">${idea.likes}</span>
            </button>
          </div>
        `;
      }).join('');

      // 绑定点赞事件
      listEl.querySelectorAll('.trends-heart').forEach(btn => {
        btn.onclick = () => {
          const idx = parseInt(btn.dataset.idx);
          const ideas = loadData('trends_ideas', []);
          const liked = loadData('trends_liked', {});

          // 用相同方式排序以匹配渲染时的索引
          const sorted = [...ideas];
          if (sortMode === 'hot') {
            sorted.sort((a, b) => b.likes - a.likes);
          } else {
            sorted.sort((a, b) => new Date(b.time) - new Date(a.time));
          }

          const idea = sorted[idx];
          if (!idea) return;

          // 在原始数组中查找并更新
          const origIdx = ideas.findIndex(i => i.content === idea.content && i.time === idea.time);
          if (origIdx === -1) return;

          const key = idea.content;
          if (liked[key]) {
            ideas[origIdx].likes = Math.max(0, ideas[origIdx].likes - 1);
            delete liked[key];
          } else {
            ideas[origIdx].likes += 1;
            liked[key] = true;
          }
          saveData('trends_ideas', ideas);
          saveData('trends_liked', liked);
          loadIdeas();
        };
      });
    }

    // 排序切换
    tabs.forEach(tab => {
      tab.onclick = () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        sortMode = tab.dataset.sort;
        loadIdeas();
      };
    });

    loadIdeas();
  }
});

// HTML 转义 (防止 XSS)
function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}