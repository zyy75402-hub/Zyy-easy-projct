const engine = createBBTIModel(BBTI_DATA);
const parallelLifeEngine = createParallelLifeEngine(BBTI_PARALLEL_LIFE_ENV, BBTI_PARALLEL_LIFE_EVENTS, BBTI_PARALLEL_LIFE_COPY, BBTI_PARALLEL_LIFE_EVALUATION);
const { questions: QUESTIONS, allMbti: ALL_MBTI, confidence: CONFIDENCE, dimensions: DIMS, derivedDimensions: DERIVED_DIMS, dimensionLabels: DIM_LABELS } = BBTI_DATA;
const MATCH_DIMS = [...DIMS, ...DERIVED_DIMS];
const state = { screen: 'home', mbti: 'INFP', confidence: 'B', answers: {}, parallelAnswers: {}, parallelSeed: 0, lastResult: null };
const app = document.querySelector('#app');

function esc(text) { return String(text).replace(/[&<>"]/g, (ch) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[ch])); }
function round(value) { return Math.round(value * 10) / 10; }
function confidenceItem() { return CONFIDENCE.find((item) => item.key === state.confidence) || CONFIDENCE[1]; }
function moduleName(q) { return BBTI_DATA.modules.find((m) => m.ids.includes(q.id))?.name || '题目'; }
function allAnswered() { return QUESTIONS.every((q) => state.answers[q.id]); }
function answeredCount() { return QUESTIONS.filter((q) => state.answers[q.id]).length; }

function renderHome() {
  app.innerHTML = `<section class="hero">
    <div class="kicker">BBTI 7.0.3.2 · 小动物和平行人生版</div>
    <h1>BBTI<br>底色原型回推</h1>
    <p class="lead">本版本使用 33 道题完成底色回推，并将唯一结果映射为 BBTI 小动物。完成结果后，可以继续进入平行人生，看看同一个底色在另一组成长环境里会被塑造成什么样。页面不会上传数据。</p>
    <div class="actions"><button class="primary" data-action="start">开始 33 题测试</button></div>
    <div class="notice">提示：人格测试和小动物结果仍沿用 7.0.2；平行人生只在结果页之后追加，不改原模型。</div>
  </section>`;
}
function renderSetup() {
  app.innerHTML = `<div class="topbar"><div class="progress-wrap"><div class="progress" style="width: 3%"></div></div></div>
  <section class="panel">
    <div class="kicker">Step 01 · 测试前的你</div>
    <h2>先给系统一个“现在的你”</h2>
    <p class="muted">系统会把 MBTI 当作当前人格自我描述，而不是最终结论。后续 33 题会继续校准。</p>
    <h3>当前 MBTI</h3>
    <div class="grid">${ALL_MBTI.map((type) => `<button class="mbti-btn ${state.mbti === type ? 'active' : ''}" data-mbti="${type}">${type}</button>`).join('')}</div>
    <h3 style="margin-top:22px">MBTI 置信度</h3>
    <div class="grid">${CONFIDENCE.map((item) => `<button class="confidence-btn ${state.confidence === item.key ? 'active' : ''}" data-confidence="${item.key}">${item.key}. ${item.text}</button>`).join('')}</div>
    <div class="nav"><button class="ghost" data-action="home">返回</button><button class="primary" data-action="questions">继续：开始答题</button></div>
  </section>`;
}
function renderQuestions() {
  const done = answeredCount();
  app.innerHTML = `<div class="topbar"><div class="small muted">已完成 ${done}/${QUESTIONS.length}</div><div class="progress-wrap"><div class="progress" style="width:${Math.round(done / QUESTIONS.length * 100)}%"></div></div></div>
  <section class="panel">
    <div class="kicker">Step 02 · 33 道模型题</div>
    <h2>按第一反应选择更接近的一项</h2>
    <p class="muted">题目没有好坏，也不是心理诊断。它会用于生成你的唯一 BBTI 小动物结果，并作为平行人生的底色输入。</p>
  </section>
  ${QUESTIONS.map((q, index) => `<section class="card" id="${q.id}">
    <div class="question-meta">${index + 1}/33 · ${q.id} · ${moduleName(q)} · ${esc(q.title)}</div>
    <div class="question-title">${esc(q.prompt)}</div>
    <div class="row" style="display:block">${q.options.map((opt) => `<button class="choice ${state.answers[q.id] === opt.key ? 'active' : ''}" data-answer-q="${q.id}" data-answer-opt="${opt.key}"><span class="choice-key">${opt.key}</span><span>${esc(opt.text)}</span></button>`).join('')}</div>
  </section>`).join('')}
  <div class="nav"><button class="secondary" data-action="setup">返回 MBTI</button><button class="primary" data-action="result" ${allAnswered() ? '' : 'disabled'}>${allAnswered() ? '生成我的小动物' : '完成全部题目后生成'}</button></div>`;
}
function metricRows(feedback) {
  const rows = [ ['SUP','表达回收'], ['EVAL','评价雷达'], ['RESP','过早懂事'], ['CTRL','选择回声'], ['COST','成本预演'] ];
  return rows.map(([key, label]) => `<div class="metric-row"><b>${label}</b><div class="bar"><div class="bar-fill" style="width:${feedback.flat[key]}%"></div></div><span>${feedback.flat[key]}</span></div>`).join('');
}
function vectorTable(vec, dims = DIMS) {
  return `<table class="table"><tbody>${dims.map((dim) => `<tr><th>${dim}</th><td>${DIM_LABELS[dim] || dim}</td><td>${round(vec[dim] || 0)}</td></tr>`).join('')}</tbody></table>`;
}
function feedbackTable(f) {
  return `<table class="table"><tbody>${['SUP','EVAL','RESP','CTRL','COST'].map((dim) => `<tr><th>${dim}</th><td>${DIM_LABELS[dim]}</td><td>${round(f.flat[dim] || 0)}</td></tr>`).join('')}</tbody></table>`;
}
function rangeTable() {
  const r = engine.ranges;
  const rows = [];
  for (const layer of ['R','C','F','E']) {
    for (const [dim, item] of Object.entries(r[layer])) rows.push(`<tr><th>${layer}.${dim}</th><td>${item.min}</td><td>${item.max}</td></tr>`);
  }
  return `<table class="table"><thead><tr><th>维度</th><th>理论 min</th><th>理论 max</th></tr></thead><tbody>${rows.join('')}</tbody></table>`;
}

function animalProfile(id) {
  return (BBTI_DATA.animalProfiles && BBTI_DATA.animalProfiles[id]) || null;
}
function animalName(id, fallback) {
  const profile = animalProfile(id);
  return profile ? profile.nickname : fallback;
}
function renderResult() {
  const r = engine.calculate({ mbti: state.mbti, confidence: state.confidence, answers: state.answers });
  state.lastResult = r;
  const main = r.main;
  const profile = animalProfile(main.id);
  const displayName = profile ? profile.nickname : main.name;
  const animal = profile ? profile.animal : '未知动物';
  const emoji = profile ? profile.emoji : '🐾';
  const slogan = profile ? profile.slogan : '这是当前模型下最接近你的唯一底色。';
  const coreText = profile ? profile.coreText : `系统推测：在剥离一部分后天反馈和环境成本影响后，你的底色向量更接近 ${main.id}。`;
  const growthText = profile ? profile.growthText : '这不是心理诊断，也不是固定人设，只是当前模型下的唯一回推结果。';
  app.innerHTML = `<section class="result-head animal-page">
    <div class="kicker">BBTI 7.0.3.2 · 小动物和平行人生版</div>
    <div class="share-card" aria-label="可截图的小动物结果卡">
      <div class="share-kicker">你的 BBTI 小动物</div>
      <div class="animal-visual">${esc(emoji)}</div>
      <div class="animal-name">${esc(displayName)}</div>
      <div class="animal-species">${esc(animal)}</div>
      <div class="animal-slogan">${esc(slogan)}</div>
    </div>
    <div class="actions"><button class="primary" data-action="parallelSetup">进入我的平行人生</button><button class="secondary" data-action="questions">修改答案</button><button class="ghost" data-action="home">回到首页</button></div>
  </section>
  <section class="result-grid animal-detail-grid">
    <div class="result-card"><h3>你是一只怎样的小动物？</h3><p>${esc(coreText)}</p></div>
    <div class="result-card"><h3>长大后的你可能是什么样？</h3><p>${esc(growthText)}</p></div>
    <div class="result-card"><h3>测试前的你</h3><p>你输入的 MBTI：<b>${state.mbti}</b></p><p>你对这个输入的确定程度：<b>${confidenceItem().text}</b></p><p class="muted">系统会把它作为起点，再结合后面的 33 道题继续校准。</p></div>
    <div class="result-card"><h3>你现在表现出来的一面</h3>${r.shell.length ? `<ul>${r.shell.map((item) => `<li>${item}</li>`).join('')}</ul>` : '<p class="muted">这次没有出现特别强的外层表现信号。</p>'}<p class="muted">这不等于你的底色，而是你在现实生活中更常使用的外层反应。</p></div>
  </section>
  <section class="panel" style="margin-top:16px"><details><summary>展开模型解释与调试数据</summary>
    <h3>唯一结果</h3><p><b>${main.id}｜${esc(displayName)}</b></p><p>原型底色：${profile ? esc(profile.prototypeName) : esc(main.name)}</p><p>底色判定强度：<b>${r.strength}</b></p>
    <h3>后天反馈雷达</h3><div class="metric">${metricRows(r.feedback)}</div>
    <h3>强副标签 / 观察信号</h3>${r.tags.length ? r.tags.map((tag) => `<p><b>${tag.name}</b>｜${tag.text}</p>`).join('') : '<p class="muted">本次没有触发强副标签。</p>'}${r.observations.length ? `${r.observations.map((item) => `<p><b>${item.name}</b>｜${item.text}</p>`).join('')}` : ''}
    <h3>反向修正说明</h3>${r.correction.details.length ? r.correction.details.map((d) => `<p><b>${DIM_LABELS[d.dim]} ${d.amount > 0 ? '上修' : '下修'} ${Math.abs(d.amount)}</b><br><span class="muted">${d.rule}</span></p>`).join('') : '<p class="muted">系统没有触发明显反向修正。</p>'}
    <h3>置信度</h3><p style="font-size:24px;font-weight:1000">${r.confidence.label} · ${r.confidence.score}/100</p><p class="muted">置信度受内部距离差、MBTI 置信度、后天反馈强度和反向修正量影响。${r.gapPercent < 3 ? ' 系统已根据核心维度完成唯一判定，但该结果仍属于当前模型下的回推判断。' : ''}</p>
    <h3>主要依据题目线索</h3>${r.clues.map((c) => `<p>${esc(c)}</p>`).join('')}
    <h3>理论 min/max 范围</h3>${rangeTable()}
    <h3>C 当前外壳向量（归一化）</h3>${vectorTable(r.norm.C)}
    <h3>MBTI base 向量</h3>${vectorTable(r.mbtiBase)}
    <h3>系统校准后的当前外壳 C_final</h3>${vectorTable(r.C_final)}
    <h3>R 底色残留向量（归一化）</h3>${vectorTable(r.norm.R)}
    <h3>F / COST 分数（归一化）</h3>${feedbackTable(r.feedback)}
    <h3>反向修正量</h3>${vectorTable(r.correction.delta)}
    <h3>最终 BBTI 8 维向量</h3>${vectorTable(r.B_final)}
    <h3>新增 6 个派生维度</h3>${vectorTable(r.expanded, DERIVED_DIMS)}
    <h3>14 维等级向量</h3>${vectorTable(r.levels, MATCH_DIMS)}
    <h3>P01-P12 距离排名</h3><table class="table"><thead><tr><th>排名</th><th>原型</th><th>距离</th><th>内部相似度</th><th>核心命中</th></tr></thead><tbody>${r.rank.map((p, i) => `<tr><td>${i+1}</td><td>${p.id}｜${esc(animalName(p.id, p.name))}</td><td>${p.distance}</td><td>${p.rawSimilarity}%</td><td>${p.coreHits}/3</td></tr>`).join('')}</tbody></table>
    <h3>tie-breaker</h3><p>${r.tieTriggered ? '已触发' : '未触发'}；选择来源：${r.tieBreaker}</p>
    <h3>原始调试 JSON</h3><pre>${esc(JSON.stringify({ raw:r.raw, normalized:r.norm, mbtiBase:r.mbtiBase, C_final:r.C_final, B_raw:r.B_raw, feedback:r.feedback, correction:r.correction.delta, final8:r.B_final, derived:r.expanded, levels:r.levels, gapPercent:r.gapPercent, tieBreaker:r.tieBreaker, ranking:r.rank.map(({id,name,distance,rawSimilarity,coreHits})=>({id,name:animalName(id,name),distance,rawSimilarity,coreHits})) }, null, 2))}</pre>
  </details></section>`;
}

function parallelAllAnswered() { return BBTI_PARALLEL_LIFE_ENV.envQuestions.every((q) => state.parallelAnswers[q.id]); }
function parallelAnsweredCount() { return BBTI_PARALLEL_LIFE_ENV.envQuestions.filter((q) => state.parallelAnswers[q.id]).length; }
function currentPersonalityResult() {
  if (state.lastResult) return state.lastResult;
  state.lastResult = engine.calculate({ mbti: state.mbti, confidence: state.confidence, answers: state.answers });
  return state.lastResult;
}
function renderParallelSetup() {
  const questions = BBTI_PARALLEL_LIFE_ENV.envQuestions;
  const done = parallelAnsweredCount();
  app.innerHTML = `<div class="topbar"><div class="small muted">平行人生设定 ${done}/${questions.length}</div><div class="progress-wrap"><div class="progress" style="width:${Math.round(done / questions.length * 100)}%"></div></div></div>
  <section class="panel">
    <div class="kicker">Step 03 · 平行人生设定</div>
    <h2>给这条人生换一组开局</h2>
    <p class="muted">这里只选择环境设定，不会展示后台数值。系统会用这些选择生成一组 5–8 段经历，再由经历汇总最终评价。</p>
  </section>
  ${questions.map((q, index) => `<section class="card" id="${q.id}">
    <div class="question-meta">${index + 1}/8 · 平行人生</div>
    <div class="question-title">${esc(q.title)}</div>
    <div class="row" style="display:block">${q.options.map((opt) => `<button class="choice ${state.parallelAnswers[q.id] === opt.id ? 'active' : ''}" data-env-q="${q.id}" data-env-opt="${opt.id}"><span class="choice-key">${opt.id}</span><span>${esc(opt.label)}</span></button>`).join('')}</div>
  </section>`).join('')}
  <div class="nav"><button class="secondary" data-action="result">返回结果页</button><button class="primary" data-action="parallelResult" ${parallelAllAnswered() ? '' : 'disabled'}>${parallelAllAnswered() ? '生成这条人生' : '完成 8 个设定后生成'}</button></div>`;
}
function renderParallelResult() {
  const personalityResult = currentPersonalityResult();
  const life = parallelLifeEngine.generateParallelLife({ personalityResult, envAnswers: state.parallelAnswers, seed: state.parallelSeed });
  const evaluationSections = life.evaluation.sections || life.evaluation.paragraphs.map((body, index) => ({ title: ['和你的原本底色相比', '被环境放大的部分', '你长出的新外壳', '这条人生的优势与代价'][index] || '补充判断', body }));
  app.innerHTML = `<section class="result-head parallel-page">
    <div class="kicker">BBTI 7.0.3.2 · 平行人生</div>
    <div class="result-title">这条人生里的你</div>
    <p class="lead">同一个底色，换一组成长环境，会被训练出另一种表达方式。下面不是命运预测，而是一条由环境设定和经历事件推演出来的平行人生。</p>
  </section>
  <section class="panel parallel-story"><h2>经历</h2>${life.experiences.map((item) => `<p>${esc(item.text)}</p>`).join('')}</section>
  <section class="panel parallel-evaluation"><h2>最终评价</h2>${evaluationSections.map((section) => `<section class="evaluation-section"><h3>${esc(section.title)}</h3><p>${esc(section.body)}</p></section>`).join('')}</section>
  <div class="nav parallel-actions"><button class="primary" data-action="parallelRegenerate">重新生成这一生</button><button class="secondary" data-action="parallelSetup">重新选择人生设定</button><button class="ghost" data-action="result">返回小动物结果页</button></div>`;
}

function render() {
  if (state.screen === 'home') renderHome();
  if (state.screen === 'setup') renderSetup();
  if (state.screen === 'questions') renderQuestions();
  if (state.screen === 'result') renderResult();
  if (state.screen === 'parallelSetup') renderParallelSetup();
  if (state.screen === 'parallelResult') renderParallelResult();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
app.addEventListener('click', (event) => {
  const target = event.target.closest('button');
  if (!target) return;
  const action = target.dataset.action;
  if (target.dataset.mbti) { state.mbti = target.dataset.mbti; renderSetup(); return; }
  if (target.dataset.confidence) { state.confidence = target.dataset.confidence; renderSetup(); return; }
  if (target.dataset.answerQ) {
    state.answers[target.dataset.answerQ] = target.dataset.answerOpt;
    state.lastResult = null;
    renderQuestions();
    const q = document.getElementById(target.dataset.answerQ);
    if (q) q.scrollIntoView({ block: 'center' });
    return;
  }
  if (target.dataset.envQ) {
    state.parallelAnswers[target.dataset.envQ] = target.dataset.envOpt;
    state.parallelSeed = 0;
    renderParallelSetup();
    const q = document.getElementById(target.dataset.envQ);
    if (q) q.scrollIntoView({ block: 'center' });
    return;
  }
  if (action === 'start') state.screen = 'setup';
  if (action === 'home') state.screen = 'home';
  if (action === 'setup') state.screen = 'setup';
  if (action === 'questions') state.screen = 'questions';
  if (action === 'result' && allAnswered()) state.screen = 'result';
  if (action === 'parallelSetup' && allAnswered()) state.screen = 'parallelSetup';
  if (action === 'parallelResult' && parallelAllAnswered()) state.screen = 'parallelResult';
  if (action === 'parallelRegenerate') { state.parallelSeed += 1; state.screen = 'parallelResult'; }
  render();
});
render();
