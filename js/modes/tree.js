// ============================================================
// tree.js — 决策树模式
// ============================================================

App.register('tree', {
  getTree() {
    return {
      question: t('treeTitle'),
      options: [
        { label: t('treeGame'), result: t('treeGameR') },
        { label: t('treeVis'), result: t('treeVisR') },
        { label: t('treeApi'), result: t('treeApiR') },
        { label: t('treeFront'), result: t('treeFrontR') },
        {
          label: t('treeLearn'),
          question: t('treeLearnQ'),
          options: [
            { label: t('treeLang'), result: t('treeLangR') },
            { label: t('treeFramework'), result: t('treeFrameworkR') },
            { label: t('treeAI'), result: t('treeAIR') },
            { label: t('treeSource'), result: t('treeSourceR') }
          ]
        },
        { label: t('treeRandom'), result: t('treeRandomR') }
      ]
    };
  },

  render() {
    return `
      <div class="card" id="treeCard">
        <div class="tree-path" id="treePath"></div>
        <div class="tree-node" id="treeNode"></div>
        <div class="result-area" id="treeResult"></div>
        <button class="publish-btn" id="treePublishBtn" style="display:none;">${t('coinPublish')}</button>
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

    breadcrumbs.length = 0;
    pathEl.innerHTML = '';
    resultEl.classList.remove('filled');
    resultEl.innerHTML = '';
    publishBtn.style.display = 'none';
    renderNode(this.getTree());

    publishBtn.onclick = () => {
      publishIdea(publishBtn._lastResult || 'Decision tree result', '决策树');
    };
  }
});