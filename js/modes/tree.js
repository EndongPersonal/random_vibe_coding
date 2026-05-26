// ============================================================
// tree.js — 决策树模式
// ============================================================

App.register('tree', {
  // 决策树结构
  tree: {
    question: '先选大方向？',
    options: [
      {
        label: '写游戏',
        result: '今天做一个游戏项目！可以是文字冒险、贪吃蛇、扫雷、2048、迷宫...任你发挥'
      },
      {
        label: '做可视化',
        result: '今天做可视化！粒子动画、数据大屏、音乐可视化、分形图形...视觉盛宴搞起来'
      },
      {
        label: '搭服务',
        result: '今天搭后端/API服务！REST API、GraphQL、WebSocket...或者做个Bot、写个自动化脚本'
      },
      {
        label: '搞前端',
        result: '今天搞前端页面！CSS动画、Canvas画布、WebGL...或者做一个纯粹的交互体验'
      },
      {
        label: '学东西',
        question: '学什么方向？',
        options: [
          { label: '新语言', result: '今天学一门新编程语言！Rust、Go、Elixir...挑一个没试过的' },
          { label: '新框架', result: '今天学个新框架！Svelte、Astro、SolidJS...或者后端框架如FastAPI、Gin' },
          { label: 'AI相关', result: '今天学AI！LangChain、RAG、Agent、Prompt Engineering...跟一波AI浪潮' },
          { label: '读源码', result: '今天静心读源码！找个你常用的开源库，看看它是怎么实现的' }
        ]
      },
      {
        label: '随便',
        result: '今天随缘写代码！打开编辑器，想到什么写什么，享受纯粹的 coding 快乐'
      }
    ]
  },

  render() {
    return `
      <div class="card" id="treeCard">
        <div class="tree-path" id="treePath"></div>
        <div class="tree-node" id="treeNode"></div>
        <div class="result-area" id="treeResult"></div>
        <button class="publish-btn" id="treePublishBtn" style="display:none;">
          📤 发布到 Trends
        </button>
      </div>`;
  },

  onActivate() {
    const pathEl = document.getElementById('treePath');
    const nodeEl = document.getElementById('treeNode');
    const resultEl = document.getElementById('treeResult');
    const publishBtn = document.getElementById('treePublishBtn');
    const breadcrumbs = [];

    function renderNode(node) {
      nodeEl.innerHTML = `
        <p class="tree-question">${node.question}</p>
        <div class="tree-options">
          ${node.options.map((opt, i) =>
            `<button class="tree-option" data-idx="${i}">${opt.label}</button>`
          ).join('')}
        </div>
      `;

      nodeEl.querySelectorAll('.tree-option').forEach(btn => {
        btn.onclick = () => {
          const opt = node.options[parseInt(btn.dataset.idx)];
          breadcrumbs.push(opt.label);
          pathEl.innerHTML = breadcrumbs.map(b =>
            `<span class="tree-breadcrumb">${b}</span>`
          ).join(' → ');

          if (opt.result) {
            nodeEl.innerHTML = '';
            resultEl.innerHTML = `🎯 <strong>${opt.result}</strong>`;
            resultEl.classList.add('filled');
            publishBtn.style.display = 'inline-flex';
            publishBtn._lastResult = opt.result;
          } else if (opt.options) {
            resultEl.classList.remove('filled');
            publishBtn.style.display = 'none';
            renderNode(opt);
          }
        };
      });
    }

    // 重置
    breadcrumbs.length = 0;
    pathEl.innerHTML = '';
    resultEl.classList.remove('filled');
    resultEl.innerHTML = '';
    publishBtn.style.display = 'none';
    renderNode(this.tree);

    publishBtn.onclick = () => {
      publishIdea(publishBtn._lastResult || '决策树结果', '决策树');
    };
  }
});