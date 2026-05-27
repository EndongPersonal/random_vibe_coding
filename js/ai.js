// ============================================================
// ai.js — AI 增强模块
// 提供扩展选项池、灵感解读、Vibe Coding 启动模板
// 支持 OpenAI 兼容 API (用户自行配置 Key)
// ============================================================

const AIService = {
  // 默认配置 (用户需自行设置 API Key)
  defaultConfig: {
    endpoint: 'https://api.openai.com/v1/chat/completions',
    model: 'gpt-4o-mini',
    apiKey: '',
    enabled: false
  },

  // 读取配置
  getConfig() {
    const stored = loadData('ai_config', {});
    return { ...this.defaultConfig, ...stored, enabled: !!stored.apiKey };
  },

  // 保存配置
  saveConfig(config) {
    saveData('ai_config', { ...this.getConfig(), ...config });
  },

  // 设置 API Key
  setApiKey(key) {
    this.saveConfig({ apiKey: key });
  },

  // 测试连接
  async testConnection() {
    const cfg = this.getConfig();
    if (!cfg.apiKey) return { ok: false, error: 'API Key 未设置' };

    try {
      const res = await fetch(cfg.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${cfg.apiKey}`
        },
        body: JSON.stringify({
          model: cfg.model,
          messages: [{ role: 'user', content: 'Say "OK" in one word.' }],
          max_tokens: 10
        })
      });

      if (!res.ok) {
        const err = await res.text();
        return { ok: false, error: `HTTP ${res.status}: ${err.slice(0, 200)}` };
      }

      const data = await res.json();
      return { ok: true, data };
    } catch (e) {
      return { ok: false, error: e.message };
    }
  },

  // 通用 API 调用
  async call(systemPrompt, userPrompt, maxTokens = 500) {
    const cfg = this.getConfig();
    if (!cfg.apiKey) throw new Error(t('aiErrorNoKey'));

    const res = await fetch(cfg.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${cfg.apiKey}`
      },
      body: JSON.stringify({
        model: cfg.model,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        max_tokens: maxTokens,
        temperature: 0.9
      })
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`API Error ${res.status}: ${err.slice(0, 300)}`);
    }

    const data = await res.json();
    return data.choices[0].message.content.trim();
  },

  // === AI 功能 ===

  // 1. 扩展选项池 (为某个类别生成更多选项)
  async expandPool(category, existingItems, count = 5) {
    const system = t('aiSystemExpand');
    const prompt = t('aiPromptExpand')
      .replace('{category}', category)
      .replace('{count}', count)
      .replace('{existing}', existingItems.slice(0, 10).join('、'));
    const result = await this.call(system, prompt, 300);
    return result.split('\n').map(s => s.replace(/^\d+[\.\)\、]\s*/, '').trim()).filter(Boolean);
  },

  // 2. 为灵感提供详细解读/Hint
  async getHint(idea) {
    const system = t('aiSystemHint');
    const prompt = t('aiPromptHint').replace('{idea}', idea);
    return await this.call(system, prompt, 400);
  },

  // 3. Vibe Coding 启动模板
  async getStarter(idea) {
    const system = t('aiSystemStarter');
    const prompt = t('aiPromptStarter').replace('{idea}', idea);
    return await this.call(system, prompt, 600);
  }
};