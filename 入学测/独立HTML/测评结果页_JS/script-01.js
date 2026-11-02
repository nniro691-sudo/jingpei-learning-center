(() => {
  const resultPage = document.querySelector('.result-page');
  if (resultPage) {
    const resultHero = resultPage.querySelector('.result-hero');
    const pageTitle = document.createElement('h1');
    pageTitle.className = 'page-result-title';
    pageTitle.textContent = '信息系统项目管理师入学进班测试';
    resultPage.insertBefore(pageTitle, resultHero);

    const learning = resultPage.querySelector('.learning');
    const analysis = resultPage.querySelector('.analysis');
    resultPage.insertBefore(learning, analysis);
    const vipTag = analysis.querySelector('.section-title > .tag');
    if (vipTag) {
      vipTag.classList.add('learning-vip');
      learning.insertBefore(vipTag, learning.querySelector('.section-title'));
    }
    learning.querySelectorAll('.guide').forEach((card, index) => {
      card.dataset.order = String(index + 1).padStart(2, '0');
    });

    const moduleTable = analysis.querySelector('.module-table');
    moduleTable.innerHTML = `
      <div class="result-analysis-grid">
        <div class="ra-head">
          <span>知识模块</span><span>答题正确率</span><span>预估考试权重参考<small>（即在科目一的预估分数占比）</small></span><span>预估知识掌握度</span><span>学习建议</span>
        </div>
        <section class="ra-group ra-weak" aria-label="基础待加强模块">
          <div class="ra-rows">
            <article class="ra-row"><div class="ra-module"><img src="测评结果页_图片/图片-15.png" alt="" aria-hidden="true"><div><h3>第1模块-技术</h3><span>第1–5章</span></div></div><strong class="ra-rate">9%</strong><strong class="ra-weight">21%</strong></article>
            <article class="ra-row"><div class="ra-module"><img src="测评结果页_图片/图片-15.png" alt="" aria-hidden="true"><div><h3>第3模块-项目管理下</h3><span>第11–15章</span></div></div><strong class="ra-rate">0%</strong><strong class="ra-weight">22%</strong></article>
            <article class="ra-row"><div class="ra-module"><img src="测评结果页_图片/图片-15.png" alt="" aria-hidden="true"><div><h3>第4模块-高级项目管理</h3><span>第16–20章</span></div></div><strong class="ra-rate">0%</strong><strong class="ra-weight">19%</strong></article>
          </div>
          <div class="ra-level"><span>基础待加强</span></div>
          <div class="ra-advice"><i aria-hidden="true"></i><p>通过视频课程和学习资料完成基础知识学习后，再通过章节强化练习持续巩固，完成专门为您制定的对应章刷题目标。完成部分章节学习和练习后，建议进行一次章节测试，检验当前章节的掌握情况。</p></div>
        </section>
        <section class="ra-group ra-growing" aria-label="有一定了解模块">
          <div class="ra-rows">
            <article class="ra-row"><div class="ra-module"><img src="测评结果页_图片/图片-16.png" alt="" aria-hidden="true"><div><h3>第2模块-项目管理上</h3><span>第6–10章</span></div></div><strong class="ra-rate">0%</strong><strong class="ra-weight">25%</strong></article>
            <article class="ra-row"><div class="ra-module"><img src="测评结果页_图片/图片-16.png" alt="" aria-hidden="true"><div><h3>第5模块-标准规范</h3><span>第21–24章</span></div></div><strong class="ra-rate">0%</strong><strong class="ra-weight">13%</strong></article>
          </div>
          <div class="ra-level"><span>有一定了解</span></div>
          <div class="ra-advice"><i aria-hidden="true"></i><p>通过视频课程和学习资料完成基础知识学习后，再完成对应章的刷题目标。对掌握较好的章节可优先进行章测试，根据测验结果优化刷题目标；完成部分章节学习和练习后，再进行一次章节测验。</p></div>
        </section>
      </div>`;
    analysis.querySelector('.advice-panel')?.remove();

    const analysisCta = document.createElement('div');
    analysisCta.className = 'analysis-cta';
    analysisCta.innerHTML = '<a class="primary" href="../../学习报告页-科目一科目二整合版.html#class-center">开启学习，进入【班级中心】</a>';
    analysis.append(analysisCta);
  }

  const start = document.querySelector('#start-test');
  if (start) start.addEventListener('click', () => document.querySelector('#start-dialog').showModal());
  document.querySelectorAll('.dialog-close').forEach(button => button.addEventListener('click', () => button.closest('dialog').close()));
  document.querySelectorAll('dialog').forEach(dialog => dialog.addEventListener('click', event => { if(event.target === dialog && (event.clientX < dialog.getBoundingClientRect().left || event.clientX > dialog.getBoundingClientRect().right || event.clientY < dialog.getBoundingClientRect().top || event.clientY > dialog.getBoundingClientRect().bottom)) dialog.close(); }));
  const names = ['技术','项目管理上','项目管理下','高级项目管理','标准规范'];
  const adviceButtons = document.querySelectorAll('[data-module]');
  adviceButtons.forEach(button => button.addEventListener('click', () => {
    const index = Number(button.dataset.module);
    document.querySelector('#advice-title').textContent = `第${index}模块 · ${names[index-1]}：建议从基础学习开始`;
    adviceButtons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    document.querySelector('#advice-panel').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant':'smooth',block:'nearest'});
  }));
  if (adviceButtons.length) adviceButtons[0].setAttribute('aria-pressed','true');
  const dialog = document.querySelector('#answer-dialog');
  let current = 1;
  function showQuestion(number) {
    current = number;
    document.querySelector('#question-title').textContent = `第 ${number} 题`;
    document.querySelector('#question-state').textContent = `答题状态：${number === 1 ? '答对' : number < 6 ? '答错' : '未答'}`;
    document.querySelector('#prev-question').disabled = number === 1;
    document.querySelector('#next-question').disabled = number === 50;
    if (!dialog.open) dialog.showModal();
  }
  document.querySelectorAll('[data-question]').forEach(button => button.addEventListener('click', () => showQuestion(Number(button.dataset.question))));
  if (dialog) {
    document.querySelector('#review-answers').addEventListener('click', () => showQuestion(1));
    document.querySelector('#prev-question').addEventListener('click', () => showQuestion(Math.max(1,current-1)));
    document.querySelector('#next-question').addEventListener('click', () => showQuestion(Math.min(50,current+1)));
  }
})();
