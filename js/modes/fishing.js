// ============================================================
// fishing.js — 电子钓鱼模式 (双语鱼数据)
// ============================================================

App.register('fishing', {

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
          <button class="btn btn-primary" id="fishingCastBtn">${t('fishingCast')}</button>
          <button class="btn btn-primary" id="fishingReelBtn" style="display:none;">${t('fishingReel')}</button>
        </div>

        <div class="fishing-status" id="fishingStatus">${t('fishingStatusIdle')}</div>

        <div class="result-area" id="fishingResult"></div>
        <div class="result-actions" id="fishingActions" style="display:none;">
          <button class="copy-btn" id="fishingCopyBtn">${t('copyBtn')}</button>
          <button class="publish-btn" id="fishingPublishBtn">${t('coinPublish')}</button>
        </div>

        <details class="fishing-collection" id="fishingCollectionDetails" open>
          <summary>${t('fishingCollection')} (<span id="fishingCollCount">0</span>/6)</summary>
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

    let state = 'idle';
    let caughtFish = null;
    let biteTimer = null;

    // 构建鱼种列表 (从 i18n + Topics 动态生成)
    function buildFishTypes() {
      const fishData = I18n.data[I18n.current].fishingFish;
      const emojis = ['🐟', '🐠', '🦑', '🦈', '🐙', '🐳'];
      const colors = ['#ff914d', '#ff6b9d', '#c084fc', '#60a5fa', '#f472b6', '#818cf8'];
      const rates = [35, 25, 15, 12, 8, 5];
      const en = I18n.current === 'en';

      return fishData.map((fd, i) => ({
        id: ['clown','tropical','squid','shark','octopus','whale'][i],
        name: fd.name, rarity: fd.rarity, desc: fd.desc,
        emoji: emojis[i], color: colors[i], rate: rates[i],
        pool() {
          if (i === 0) { const e = Topics.cards.filter(c => c.length < 25); return randomPick(e.length ? e : Topics.cards); }
          if (i === 1) { const m = Topics.cards.filter(c => c.length >= 15 && c.length < 35); return randomPick(m.length ? m : Topics.cards); }
          if (i === 2) {
            const weird = Topics.features.filter(f => f.includes('奇怪') || f.includes('阴谋') || f.includes('屎山') || f.includes('摸鱼') || f.includes('解压') || f.includes('宠物') || f.includes('打分'));
            return randomPick(weird.length ? weird : Topics.features) + ' — ' + randomPick(Topics.cards);
          }
          if (i === 3) return en
            ? `For ${randomPick(Topics.users)} using ${randomPick(Topics.tools)} build a ${randomPick(Topics.features)} as a ${randomPick(Topics.platforms)}`
            : `给${randomPick(Topics.users)}用${randomPick(Topics.tools)}做一个${randomPick(Topics.features)}，发布为${randomPick(Topics.platforms)}`;
          if (i === 4) { const ids = []; for (let j=0;j<3;j++) ids.push(randomPick(Topics.cards)); return ids.join(en ? ';\n' : '；\n'); }
          if (i === 5) return en
            ? `Epic project\nFor ${randomPick(Topics.users)} using ${randomPick(Topics.tools)} build a ${randomPick(Topics.features)} as a ${randomPick(Topics.platforms)}`
            : `🌟 史诗项目\n给${randomPick(Topics.users)}用${randomPick(Topics.tools)}做一个${randomPick(Topics.features)}，发布为${randomPick(Topics.platforms)}`;
        }
      }));
    }

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
    }

    function randomFish() {
      const fishTypes = buildFishTypes();
      const rand = randomInt(1, 101);
      let cumulative = 0;
      for (const fish of fishTypes) {
        cumulative += fish.rate;
        if (rand <= cumulative) return fish;
      }
      return fishTypes[0];
    }

    function updateCollection() {
      const fishTypes = buildFishTypes();
      const caught = loadData('fishing_caught', []);
      collCount.textContent = caught.length;

      const frag = document.createDocumentFragment();
      fishTypes.forEach(f => {
        const isCaught = caught.includes(f.id);
        const item = document.createElement('div');
        item.className = 'fishing-coll-item ' + (isCaught ? 'caught' : 'locked');
        item.innerHTML = `<div class="fishing-coll-emoji">${isCaught ? f.emoji : '❓'}</div>`;
        const nameEl = document.createElement('div');
        nameEl.className = 'fishing-coll-name';
        nameEl.textContent = isCaught ? f.name : '???';
        item.appendChild(nameEl);
        const rarityEl = document.createElement('div');
        rarityEl.className = 'fishing-coll-rarity';
        rarityEl.style.color = f.color;
        rarityEl.textContent = f.rarity;
        item.appendChild(rarityEl);
        frag.appendChild(item);
      });
      collGrid.innerHTML = '';
      collGrid.appendChild(frag);
    }

    function recordCatch(fishId) {
      const caught = loadData('fishing_caught', []);
      if (!caught.includes(fishId)) {
        caught.push(fishId);
        saveData('fishing_caught', caught);
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
      statusEl.textContent = t('fishingStatusWait');

      const waitTime = 2000 + Math.random() * 4000;
      biteTimer = setTimeout(() => {
        if (state !== 'waiting') return;
        state = 'biting';
        scene.classList.add('fishing-biting');
        bobber.style.animation = 'bobBite 0.3s ease-in-out infinite';
        statusEl.textContent = t('fishingStatusBite');
        reelBtn.style.display = '';
      }, waitTime);
    };

    reelBtn.onclick = async () => {
      if (state !== 'biting') return;
      state = 'caught';
      clearTimeout(biteTimer);
      reelBtn.style.display = 'none';
      statusEl.textContent = t('fishingStatusReel');

      scene.classList.add('fishing-reeling');
      bobber.style.animation = 'bobUp 0.5s ease-in forwards';

      await delay(600);

      caughtFish = randomFish();
      const idea = caughtFish.pool();

      catchFish.innerHTML = `<span style="font-size:5rem;display:block;animation:fishAppear 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);text-shadow:0 0 30px ${caughtFish.color};">${caughtFish.emoji}</span>`;
      catchName.textContent = caughtFish.name;
      catchRarity.innerHTML = `<span style="color:${caughtFish.color};font-weight:700;font-size:0.9rem;">${caughtFish.rarity}</span> · ${caughtFish.desc}`;
      catchEl.style.display = 'flex';

      recordCatch(caughtFish.id);

      await delay(600);

      // 使用文档片段构建结果
      const frag = document.createDocumentFragment();
      const meta = document.createElement('div');
      meta.style.cssText = 'font-size:0.85rem;color:var(--text-secondary);margin-bottom:6px;';
      meta.textContent = `${caughtFish.emoji} ${t('fishingCatchTitle')} ${caughtFish.rarity} · ${caughtFish.name}`;
      frag.appendChild(meta);
      const body = document.createElement('div');
      body.style.cssText = 'font-size:1.1rem;line-height:1.7;';
      body.innerHTML = idea.replace(/\n/g, '<br>');
      frag.appendChild(body);
      resultEl.innerHTML = '';
      resultEl.appendChild(frag);
      resultEl.classList.add('filled');
      actionsEl.style.display = 'flex';
      resultEl._lastResult = idea.replace(/\n/g, ' ');

      statusEl.textContent = `${t('fishingStatusCaught')} ${caughtFish.rarity} · ${caughtFish.name}!`;

      await delay(3000);
      resetScene();
      statusEl.textContent = t('fishingStatusReady');
    };

    publishBtn.onclick = () => {
      const text = caughtFish
        ? `[${caughtFish.rarity} · ${caughtFish.name}] ${resultEl._lastResult || ''}`
        : (resultEl._lastResult || t('fishingSource'));
      publishIdea(text, t('fishingSource'));
    };
    copyBtn.onclick = () => copyToClipboard(resultEl._lastResult || '', copyBtn);

    updateCollection();
    statusEl.textContent = t('fishingStatusIdle');
  }
});