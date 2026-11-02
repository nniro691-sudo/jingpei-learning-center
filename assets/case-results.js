(() => {
  const items = [...document.querySelectorAll('.wq-item')];
  const detail = document.querySelector('#question-detail');
  if (!detail || !items.length) return;
  const body = detail.parentElement;
  const panel = body.parentElement;
  const title = panel.querySelector('.p-title');
  const original = body.innerHTML;
  const icon = title.querySelector('img').cloneNode(true);
  const originalName = items[0].querySelector('.wq-name').textContent.trim();
  function element(tag, className, text) {
    const node = document.createElement(tag);
    node.className = className;
    node.textContent = text;
    return node;
  }
  function select(item, scroll = true) {
    items.forEach(node => {
      const active = node === item;
      node.classList.toggle('on', active);
      node.setAttribute('aria-pressed', String(active));
    });
    const name = item.querySelector('.wq-name').textContent.trim();
    title.replaceChildren(icon.cloneNode(true), document.createTextNode(name + ' 错题解析'));
    if (name === originalName) body.innerHTML = original;
    else {
      body.innerHTML = original;
      const parts = name.split(/[-–]/);
      body.querySelector('.case-head-txt').textContent = parts[0] + '-材料型问答题';
      body.querySelector('.case-section-body').replaceChildren(element('p', '', '案例材料待补充。'));
      body.querySelector('.q-badge').textContent = '问题' + parts[1];
      body.querySelector('.q-head-txt').textContent = '题干待补充。';
      body.querySelector('.ans-box').textContent = '作答记录待补充。';
      const scoreText = item.querySelector('.wq-score').textContent;
      const scores = scoreText.match(/\d+/g);
      const scoreLine = body.querySelector('.score-line');
      scoreLine.replaceChildren(document.createTextNode('该题总分' + scores[1] + '分，实得'), element('span', 'got', scores[0] + '分'));
      body.querySelector('.reason').textContent = '批阅说明待补充。';
      body.querySelector('.rule-txt').textContent = '评分规则待补充。';
      body.querySelector('.knowledge').textContent = item.querySelector('.wq-point').textContent.replace(/^考点：/, '');
      const reference = element('div', 'ref-stage', '');
      reference.append(element('div', 'ref-stage-body', '参考答案待补充。'));
      body.querySelector('.ref-stages').replaceChildren(reference);
    }
    if (scroll) panel.scrollIntoView({behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start'});
  }
  items.forEach(item => {
    item.setAttribute('role', 'button');
    item.tabIndex = 0;
    item.setAttribute('aria-pressed', String(item.classList.contains('on')));
    item.addEventListener('click', () => select(item));
    item.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); select(item); }
    });
  });
  document.querySelector('#onlyChapter')?.addEventListener('change', () => {
    const current = items.find(item => item.classList.contains('on'));
    if (current?.style.display === 'none') {
      const first = items.find(item => item.style.display !== 'none');
      if (first) select(first, false);
    }
  });
})();
