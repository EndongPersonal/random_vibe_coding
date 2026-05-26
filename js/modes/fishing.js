// ============================================================
// fishing.js — 电子钓鱼模式
// 抛出鱼线 → 等待咬钩 → 收线 → 钓上不同稀有度的鱼 + 灵感idea
// ============================================================

App.register('fishing', {
  // 鱼种定义
  fishTypes: [
    { id: 'clown',  name: '小丑鱼', emoji: '🐟', rarity: '普通',  rate: 35, color: '#ff914d',
      icon: '🐟', desc: '一条活泼的小丑鱼，带来了一个轻松有趣的小项目',
      pool: () => {
        const easy = Topics.cards.filter(c => c.length < 25);
        return randomPick(easy.length ? easy : Topics.cards);
      }
    },
    { id: 'tropical', name: '热带鱼', emoji: '🐠', rarity: '稀有', rate: 25, color: '#ff6b9d',
      icon: '🐠', desc: '一条色彩斑斓的热带鱼，闪烁着创意的光芒',
      pool: () => {
        const mid = Topics.cards.filter(c => c.length >= 15 && c.length < 35);
        return randomPick(mid.length ? mid : Topics.cards);
      }
    },
    { id: 'squid',   name: '鱿鱼',   emoji: '🦑', rarity: '罕见', rate: 15, color: '#c084fc',
      icon: '🦑', desc: '一只神秘的鱿鱼，喷出了一团奇怪的灵感墨水',
      pool: () => {
        const weird = Topics.features.filter(f => f.includes('奇怪') || f.includes('阴谋') || f.includes('屎山') || f.includes('摸鱼') || f.includes('解压'));
        return randomPick(weird.length ? weird : Topics.features) + ' —— ' + randomPick(Topics.cards);
      }
    },
    { id: 'shark',   name: '鲨鱼',   emoji: '🦈', rarity: '史诗', rate: 12, color: '#60a5fa',
      icon: '🦈', desc: '一条凶猛的鲨鱼，带来了一个野心勃勃的大项目',
      pool: () => {
        const u = randomPick(Topics.users);
        const t = randomPick(Topics.tools);
        const f = randomPick(Topics.features);
        const p = randomPick(Topics.platforms);
        return `给${u}用${t}做一个${f}，发布为${p}`;
      }
    },
    { id: 'octopus', name: '章鱼',   emoji: '🐙', rarity: '神话', rate: 8,  color: '#f472b6',
      icon: '🐙', desc: '一只古老的章鱼智者，八条触手各握着一个绝妙创意',
      pool: () => {
        const ideas = [];
        for (let i = 0; i < 3; i++) {
          ideas.push(randomPick(Topics.cards));
        }
        return ideas.join('；\n');
      }
    },
    { id: 'whale',   name: '鲸鱼',   emoji: '🐳', rarity: '传说', rate: 5,  color: '#818cf8',
      icon: '🐳', desc: '深海巨鲸浮出水面，带来一个足以改变世界的灵感',
      pool: () => {
        const u = randomPick(Topics.users);
        const t = randomPick(Topics.tools);
        const f = randomPick(Topics.features);
        const p = randomPick(Topics.platforms);
        return `🌟 史诗项目：给${u}用${t}做一个${f}，发布为${p}\n同时用${randomPick(Topics.tools)}实现${randomPick(Topics.features)}作为附加功能`;
      }
    }
  ],

  render() {
    return `
      <div class="card fishing-card">
        <!-- 钓鱼场景 -->
        <div class="fishing-scene" id="fishingScene">
          <!-- 天空 -->
          <div class="fishing-sky"></div>
          <!-- 水面 -->
          <div class="fishing-water">
            <div class="fishing-wave"></div>
            <div class="fishing-wave2"></div>
          </div>
          <!-- 鱼线 -->
          <div class="fishing-line" id="fishingLine">
            <div class="fishing-bobber" id="fishingBobber">🎣</div>
          </div>
          <!-- 钓上来的鱼 -->
          <div class="fishing-catch" id="fishingCatch" style="display:none;">
            <div class="fishing-catch-fish" id="catchFish"></div>
            <div class="fishing-catch-name" id="catchName"></div>
            <div class="fishing-catch-rarity" id="catchRarity"></div>
          </div>
        </div>

        <!-- 操作按钮 -->
        <div class="fishing-controls">
          <button class="btn btn-primary" id="fishingCastBtn">🎣 抛竿</button>
          <button class="btn btn-primary" id="fishingReelBtn" style="display:none;">⚡ 收线！</button>
        </div>

        <!-- 状态提示 -->
        <div class="fishing-status" id="fishingStatus">准备好开始钓鱼了吗？</div>

        <!-- 结果 -->
        <div class="result-area" id="fishingResult"></div>
        <div class="result-actions" id="fishingActions" style="display:none;">
          <button class="copy-btn" id="fishingCopyBtn">📋 复制</button>
          <button class="publish-btn" id="fishingPublishBtn">${t('coinPublish')}</button>
        </div>

        <!-- 收藏图鉴 -->
        <details class="fishing-collection" id="fishingCollectionDetails">
          <summary>📖 我的鱼获图鉴 (<span id="fishingCollCount">0</span>/6)</summary>
          <div class="fishing-collection-grid" id="fishingCollection"></div>
        </details>
      </div>`;
  },

  onActivate() {
    const scene = document.getElementById('fishingScene');
    const bobber = document.getElementById('fishingBobber');
    const line = document.getElementById('fishingLine');
    const catchEl = document.getElementById('fishingCatch');
    const catchFish = document.getElementById('catchFish');
    const catchName = document.getElementById('catchName');
    const catchRarity = document.getElementById('catchRarity');
    const castBtn = document.getElementById('fishingCastBtn');
    const reelBtn = document.getElementById('fishingReelBtn');
    const statusEl = document.getElementById('fishingStatus');
    const resultEl = document.getElementById('fishingResult');
    const actionsEl = document.getElementById('fishingActions');
    const copyBtn = document.getElementById('fishingCopyBtn');
    const publishBtn = document.getElementById('fishingPublishBtn');
    const collDetails = document.getElementById('fishingCollectionDetails');
    const collGrid = document.getElementById('fishingCollection');
    const collCount = document.getElementById('fishingCollCount');

    let state = 'idle'; // idle | waiting | biting | caught
    let caughtFish = null;
    let biteTimer = null;

    // 重置场景
    function resetScene() {
      state = 'idle';
      catchEl.style.display = 'none';
      scene.classList.remove('fishing-casting', 'fishing-biting', 'fishing-reeling');
      bobber.style.top = '-40px';
      bobber.style.animation = 'none';
      line.style.height = '0px';
      castBtn.style.display = '';
      reelBtn.style.display = 'none';
      resultEl.classList.remove('filled');
      resultEl.innerHTML = '';
      actionsEl.style.display = 'none';
      clearTimeout(biteTimer);
    }

    // 随机选鱼 (按稀有度概率)
    function randomFish() {
      const rand = randomInt(1, 101); // 1-100
      let cumulative = 0;
      for (const fish of this.fishTypes) {
        cumulative += fish.rate;
        if (rand <= cumulative) return fish;
      }
      return this.fishTypes[0];
    }

    // 更新图鉴
    function updateCollection() {
      const caught = loadData('fishing_caught', []);
      collCount.textContent = caught.length;

      collGrid.innerHTML = this.fishTypes.map(f => {
        const isCaught = caught.includes(f.id);
        return `
          <div class="fishing-coll-item ${isCaught ? 'caught' : 'locked'}">
            <div class="fishing-coll-emoji">${isCaught ? f.emoji : '❓'}</div>
            <div class="fishing-coll-name">${isCaught ? f.name : '???'}</div>
            <div class="fishing-coll-rarity" style="color:${f.color}">${f.rarity}</div>
          </div>
        `;
      }).join('');
    }

    // 记录捕获
    function recordCatch(fishId) {
      const caught = loadData('fishing_caught', []);
      if (!caught.includes(fishId)) {
        caught.push(fishId);
        saveData('fishing_caught', caught);
      }
      updateCollection();
    }

    // 抛竿
    castBtn.onclick = () => {
      if (state !== 'idle') return;
      state = 'waiting';

      // 动画: 鱼线放出
      scene.classList.add('fishing-casting');
      line.style.height = '70%';
      bobber.style.top = '65%';
      bobber.style.animation = 'bobFloat 2s ease-in-out infinite';

      castBtn.style.display = 'none';
      statusEl.textContent = '🎣 浮漂在水面上轻轻晃动...等待鱼儿上钩...';

      // 随机等待 2-6 秒
      const waitTime = 2000 + Math.random() * 4000;
      biteTimer = setTimeout(() => {
        if (state !== 'waiting') return;
        state = 'biting';
        scene.classList.add('fishing-biting');
        bobber.style.animation = 'bobBite 0.3s ease-in-out infinite';
        statusEl.textContent = '⚡ 有鱼咬钩了！浮漂猛地往下沉！快收线！';
        reelBtn.style.display = '';
      }, waitTime);
    };

    // 收线
    reelBtn.onclick = async () => {
      if (state !== 'biting') return;
      state = 'caught';
      clearTimeout(biteTimer);
      reelBtn.style.display = 'none';
      statusEl.textContent = '🎣 正在奋力收线...';

      // 收线动画
      scene.classList.add('fishing-reeling');
      bobber.style.animation = 'bobUp 0.5s ease-in forwards';

      await delay(600);

      // 随机选鱼
      caughtFish = randomFish.call(this);
      const idea = caughtFish.pool();

      // 显示鱼
      catchFish.innerHTML = `<span style="font-size:5rem;display:block;animation:fishAppear 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);text-shadow:0 0 30px ${caughtFish.color};">${caughtFish.emoji}</span>`;
      catchName.innerHTML = `${caughtFish.name} <span style="color:${caughtFish.color};font-size:0.9rem;">[${caughtFish.rarity}]</span>`;
      catchRarity.textContent = caughtFish.desc;
      catchEl.style.display = 'flex';

      // 记录
      recordCatch(caughtFish.id);

      await delay(500);

      // 显示结果
      resultEl.innerHTML = `
        <div style="font-size:0.85rem;color:var(--text-dim);margin-bottom:6px;">
          ${caughtFish.emoji} 钓到了 <span style="color:${caughtFish.color};font-weight:700;">${caughtFish.rarity}·${caughtFish.name}</span>
        </div>
        <div style="font-size:1.1rem;line-height:1.7;">${idea.replace(/\n/g, '<br>')}</div>
      `;
      resultEl.classList.add('filled');
      actionsEl.style.display = 'flex';
      resultEl._lastResult = idea.replace(/\n/g, ' ');
      statusEl.textContent = `🎉 成功钓到了一条${caughtFish.rarity}的${caughtFish.name}！`;

      // 3秒后可再次抛竿
      await delay(3000);
      resetScene();
      statusEl.textContent = '准备好再次抛竿了吗？🐟';
      updateCollection();
    };

    publishBtn.onclick = () => {
      const text = caughtFish
        ? `[${caughtFish.rarity}·${caughtFish.name}] ${resultEl._lastResult}`
        : (resultEl._lastResult || '钓鱼收获');
      publishIdea(text, '电子钓鱼');
    };
    copyBtn.onclick = () => copyToClipboard(resultEl._lastResult || '', copyBtn);

    // 初始化
    updateCollection();
    statusEl.textContent = '准备好开始钓鱼了吗？🐟';
  }
});