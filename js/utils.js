// ============================================================
// utils.js — 通用工具函数
// ============================================================

// 随机整数 [min, max)
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// 从数组随机取一个元素
function randomPick(arr) {
  return arr[randomInt(0, arr.length)];
}

// 洗牌 (Fisher-Yates)
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = randomInt(0, i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// 延迟 (用于动画)
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// 获取今日日期字符串 YYYY-MM-DD
function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

// 获取今日日期字符串 (中文)
function todayCN() {
  const d = new Date();
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
}

// 获取星期几 (中文)
function weekdayCN() {
  const days = ['日', '一', '二', '三', '四', '五', '六'];
  return '星期' + days[new Date().getDay()];
}

// 获取简单 hash (用于黄历每日变化)
function simpleHash(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

// 基于日期种子的伪随机 (保证同一天结果一致)
function seededRandom(seed) {
  let s = simpleHash(seed);
  return function() {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    return s / 0x7fffffff;
  };
}

// 基于日期从数组选取 N 个固定元素
function dailyPick(arr, n) {
  const rng = seededRandom(todayStr());
  const indices = arr.map((_, i) => ({ i, r: rng() }))
    .sort((a, b) => a.r - b.r)
    .slice(0, n)
    .map(x => x.i)
    .sort((a, b) => a - b);
  return indices.map(i => arr[i]);
}

// 格式化日期时间
function formatTime(iso) {
  const d = new Date(iso);
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')} ${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`;
}

// 读取 localStorage (带默认值)
function loadData(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch { return fallback; }
}

// 写入 localStorage
function saveData(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch { /* quota exceeded */ }
}

// HTML 转义 (防 XSS)
function escapeHtml(str) {
  return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

// 为结果区添加 AI 增强按钮 (如果 AI 已配置)
function injectAIButtons(actionsEl, getResultText) {
  if (!actionsEl || actionsEl.querySelector('.ai-hint-btn')) return;

  const cfg = AIService.getConfig();

  const hintBtn = document.createElement('button');
  hintBtn.className = 'ai-btn ai-hint-btn';
  hintBtn.textContent = t('aiHint');
  hintBtn.style.display = cfg.enabled ? '' : 'none';

  const starterBtn = document.createElement('button');
  starterBtn.className = 'ai-btn ai-starter-btn';
  starterBtn.textContent = t('aiStarter');
  starterBtn.style.display = cfg.enabled ? '' : 'none';

  // 找到 actions 区域的父容器来追加 AI 结果
  const card = actionsEl.closest('.card');
  let aiResultEl = card ? card.querySelector('.ai-result') : null;
  if (!aiResultEl && card) {
    aiResultEl = document.createElement('div');
    aiResultEl.className = 'ai-result';
    aiResultEl.style.display = 'none';
    card.appendChild(aiResultEl);
  }

  hintBtn.onclick = async function() {
    const text = getResultText();
    if (!text) return;
    hintBtn.disabled = true;
    hintBtn.textContent = '⏳ ' + t('aiHintLoading');
    try {
      const hint = await AIService.getHint(text);
      if (aiResultEl) {
        aiResultEl.textContent = hint;
        aiResultEl.style.display = 'block';
      }
    } catch (e) {
      if (aiResultEl) {
        aiResultEl.textContent = t('aiErrorCall') + ': ' + e.message;
        aiResultEl.style.display = 'block';
      }
    }
    hintBtn.disabled = false;
    hintBtn.textContent = t('aiHint');
  };

  starterBtn.onclick = async function() {
    const text = getResultText();
    if (!text) return;
    starterBtn.disabled = true;
    starterBtn.textContent = '⏳ ' + t('aiHintLoading');
    try {
      const starter = await AIService.getStarter(text);
      if (aiResultEl) {
        aiResultEl.textContent = starter;
        aiResultEl.style.display = 'block';
      }
      // 添加复制按钮
      if (aiResultEl && !aiResultEl.querySelector('.ai-copy-starter')) {
        const cpy = document.createElement('button');
        cpy.className = 'copy-btn ai-copy-starter';
        cpy.textContent = t('aiCopyStarter');
        cpy.style.marginTop = '10px';
        cpy.onclick = () => copyToClipboard(starter, cpy);
        aiResultEl.appendChild(cpy);
      }
    } catch (e) {
      if (aiResultEl) {
        aiResultEl.textContent = t('aiErrorCall') + ': ' + e.message;
        aiResultEl.style.display = 'block';
      }
    }
    starterBtn.disabled = false;
    starterBtn.textContent = t('aiStarter');
  };

  actionsEl.appendChild(hintBtn);
  actionsEl.appendChild(starterBtn);
}
async function copyToClipboard(text, btn) {
  try {
    await navigator.clipboard.writeText(text);
    if (btn) {
      const orig = btn.textContent;
      btn.textContent = t('copyDone');
      btn.classList.add('copied');
      setTimeout(() => {
        btn.textContent = orig;
        btn.classList.remove('copied');
      }, 1500);
    }
  } catch {
    // 降级方案
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    if (btn) {
      const orig = btn.textContent;
      btn.textContent = t('copyDone');
      btn.classList.add('copied');
      setTimeout(() => {
        btn.textContent = orig;
        btn.classList.remove('copied');
      }, 1500);
    }
  }
}