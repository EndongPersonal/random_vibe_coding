// ============================================================
// fishing.js — 电子钓鱼模式
// ============================================================

App.register('fishing', {
  fishTypes: [
    { id: 'clown',  name: '小丑鱼', emoji: '🐟', rarity: '普通', rate: 35, color: '#ff914d',
      desc: '一条活泼的小丑鱼，带来了一个轻松有趣的小项目',
      pool() {
        const easy = Topics.cards.filter(c => c.length < 25);
        return randomPick(easy.length ? easy : Topics.cards);
      }
    },
    { id: 'tropical', name: '热带鱼', emoji: '🐠', rarity: '稀有', rate: 25, color: '#ff6b9d',
      desc: '一条色彩斑斓的热带鱼，闪烁着创意的光芒',
      pool() {
        const mid = Topics.cards.filter(c => c.length >= 15 && c.length < 35);
        return randomPick(mid.length ? mid : Topics.cards);
      }
    },
    { id: 'squid',   name: '鱿鱼',   emoji: '🦑', rarity: '罕见', rate: 15, color: '#c084fc',
      desc: '一只神秘的鱿鱼，喷出了一团奇怪的灵感墨水',
      pool() {
        const weird = Topics.features.filter(f =>
          f.includes('奇怪') || f.includes('阴谋') || f.includes('屎山') ||
          f.includes('摸鱼') || f.includes('解压') || f.includes('宠物') || f.includes('打分')
        );
        const w = randomPick(weird.length ? weird : Topics.features);
        return w + ' —— ' + randomPick(Topics.cards);
      }
    },
    { id: 'shark',   name: '鲨鱼',   emoji: '🦈', rarity: '史诗', rate: 12, color: '#60a5fa',
      desc: '一条凶猛的鲨鱼，带来了一个野心勃勃的大项目',
      pool() {
        return `给${randomPick(Topics.users)}用${randomPick(Topics.tools)}做一个${randomPick(Topics.features)}，发布为${randomPick(Topics.platforms)}`;
      }
    },
    { id: 'octopus', name: '章鱼',   emoji: '🐙', rarity: '神话', rate: 8,  color: '#f472b6',
      desc: '一只古老的章鱼智者，八条触手各握着一个绝妙创意',
      pool() {
        const ideas = [];
        for (let i = 0; i < 3; i++) ideas.push(randomPick(Topics.cards));
        return ideas.join('；\n');
      }
    },
    { id: 'whale',   name: '鲸鱼',   emoji: '🐳', rarity: '传说', rate: 5,  color: '#818cf8',
      desc: '深海巨鲸浮出水面，带来一个足以改变世界的灵感',
      pool() {
        return `🌟 史诗项目\n给${randomPick(Topics.users)}用${randomPick(Topics.tools)}做一个${randomPick(Topics.features)}，发布为${randomPick(Topics.platforms)}`;
      }
    }
  ],

  render() {
    return `
      <div class="card fishing-card">
        <div class="fishing-scene" id="fishingScene">
          <div class="fishing-water">
            <div class="fishing-wave"></div>
            <div class="fishing-wave2"></div>
          </div>
          <div class="fishing-line" id="fishingLine">
            <div class="fishing-bobber" id="fishingBobber">🎣</div>
          </div>
          <div class="fishing-catch" id="fishingCatch" style="display:none;">
            <div class="fishing-catch-fish" id="catchFish"></div>
            <div class="fishing-catch-name" id="catchName"></div>
            <div class="fishing-catch-rarity" id="catchRarity"></div>
          </div>
        </div>

        <div class="fishing-controls">
          <button class="btn btn-primary" id="fishingCastBtn">🎣 抛竿</button>
          <button class="btn btn-primary" id="fishingReelBtn" style="display:none;">⚡ 收线！</button>
        </div>

        <div class="fishing-status" id="fishingStatus">准备好开始钓鱼了吗？</div>

        <div class="result-area" id="fishingResult"></div>
        <div class="result-actions" id="fishingActions" style="display:none;">
          <button class="copy-btn" id="fishingCopyBtn">📋 复制</button>
          <button class="publish-btn" id="fishingPublishBtn">${t('coinPublish')}</button>
        </div>

        <details class="fishing-collection" id="fishingCollectionDetails" open>
          <summary>📖 我的鱼获图鉴 (<span id="fishingCollCount">0</span>/6)</summary>
          <div class="fishing-collection-grid" id="fishingCollection"></div>
        </details>
      </div>`;
  },

  onActivate() {
    const self = this; // 缓存模式配置引用
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

    let state = 'idle';
    let caughtFish = null;
    let biteTimer = null;

    function resetScene() {
      state = 'idle';
      catchEl.style.display = 'none';
      scene.classList.remove('fishing-casting', 'fishing-biting', 'fishing-reeling');
      bobber.style.top = '-40px';
      bobber.style.animation = 'none';
      line.style.height = '0px';
      castBtn.style.display = '';
      reelBtn.style.display = 'none';
      clearTimeout(biteTimer);
      // 不清理结果区，让用户继续看到上次钓到的灵感
    }

    function randomFish() {
      const rand = randomInt(1, 101);
      let cumulative = 0;
      for (const fish of self.fishTypes) {
        cumulative += fish.rate;
        if (rand <= cumulative) return fish;
      }
      return self.fishTypes[0];
    }

    function updateCollection() {
      const caught = loadData('fishing_caught', []);
      collCount.textContent = caught.length;

      collGrid.innerHTML = self.fishTypes.map(f => {
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

    function recordCatch(fishId) {
      const caught = loadData('fishing_caught', []);
      const isNew = !caught.includes(fishId);
      if (isNew) {
        caught.push(fishId);
        saveData('fishing_caught', caught);
        // 首次捕获自动展开图鉴
        collDetails.open = true;
      }
      updateCollection();
    }

    castBtn.onclick = () => {
      if (state !== 'idle') return;
      state = 'waiting';
      scene.classList.add('fishing-casting');
      line.style.height = '70%';
      bobber.style.top = '65%';
      bobber.style.animation = 'bobFloat 2s ease-in-out infinite';
      castBtn.style.display = 'none';
      statusEl.textContent = '🎣 浮漂在水面上轻轻晃动...等待鱼儿上钩...';

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

    reelBtn.onclick = async () => {
      if (state !== 'biting') return;
      state = 'caught';
      clearTimeout(biteTimer);
      reelBtn.style.display = 'none';
      statusEl.textContent = '🎣 正在奋力收线...';

      scene.classList.add('fishing-reeling');
      bobber.style.animation = 'bobUp 0.5s ease-in forwards';

      await delay(600);

      caughtFish = randomFish();
      const idea = caughtFish.pool();

      // 鱼出现
      catchFish.innerHTML = `<span style="font-size:5rem;display:block;animation:fishAppear 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);text-shadow:0 0 30px ${caughtFish.color};">${caughtFish.emoji}</span>`;
      catchName.innerHTML = `${caughtFish.name} <span style="color:${caughtFish.color};font-size:0.9rem;">[${caughtFish.rarity}]</span>`;
      catchRarity.textContent = caughtFish.desc;
      catchEl.style.display = 'flex';

      recordCatch(caughtFish.id);

      await delay(600);

      // 显示灵感
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

      // 短暂等待后可再次抛竿
      await delay(3000);
      resetScene();
      statusEl.textContent = '准备好再次抛竿了吗？🐟';
    };

    publishBtn.onclick = () => {
      const text = caughtFish
        ? `[${caughtFish.rarity}·${caughtFish.name}] ${resultEl._lastResult || ''}`
        : (resultEl._lastResult || '钓鱼收获');
      publishIdea(text, '电子钓鱼');
    };
    copyBtn.onclick = () => copyToClipboard(resultEl._lastResult || '', copyBtn);

    updateCollection();
    statusEl.textContent = '准备好开始钓鱼了吗？🐟';
  }
});