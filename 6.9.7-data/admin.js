const secretInput = document.getElementById('adminSecret');
const loadStatsBtn = document.getElementById('loadStatsBtn');
const adminMessage = document.getElementById('adminMessage');
const statsPanel = document.getElementById('statsPanel');

function setMessage(text, type='note'){
  adminMessage.textContent = text;
  adminMessage.className = `admin-message ${type}`;
}

function renderDistribution(title, data){
  const entries = Object.entries(data || {}).sort((a,b)=>b[1]-a[1]);
  if(!entries.length) return `<div class="result-card"><div class="result-title">${title}</div><p class="note">暂无数据</p></div>`;
  return `<div class="result-card"><div class="result-title">${title}</div><div class="admin-list">${entries.map(([name,count])=>`<div class="admin-row"><strong>${name}</strong><span>${count}</span></div>`).join('')}</div></div>`;
}

function renderStats(data){
  statsPanel.hidden = false;
  statsPanel.innerHTML = `
    <div class="result-card"><div class="result-title">总提交数</div><div class="big-result">${data.totalSubmissions || 0}</div></div>
    <div class="admin-grid">
      ${renderDistribution('MBTI 结果分布', data.mbtiDistribution)}
      ${renderDistribution('物件结果分布', data.objectDistribution)}
      ${renderDistribution('每日提交数量', data.dailySubmissions)}
      <div class="result-card">
        <div class="result-title">最近匿名提交</div>
        <div class="admin-list">${(data.latestSubmissions || []).map(item=>`<div class="admin-row"><strong>${item.resultMbti} - ${item.resultObject}</strong><span>${item.confidence || '未知'} · ${String(item.createdAt || '').slice(0,16).replace('T',' ')}</span></div>`).join('') || '<p class="note">暂无数据</p>'}</div>
      </div>
    </div>
  `;
}

async function loadStats(){
  const secret = secretInput.value.trim();
  if(!secret){
    setMessage('请输入管理员密钥。','error');
    return;
  }
  loadStatsBtn.disabled = true;
  loadStatsBtn.textContent = '正在读取…';
  setMessage('正在读取匿名统计…');
  try{
    const res = await fetch('/.netlify/functions/admin-stats', {
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        'x-admin-secret':secret
      },
      body: JSON.stringify({ scope:'stats' })
    });
    const data = await res.json().catch(()=>({ok:false}));
    if(res.status === 401){
      setMessage('无权限或密钥错误。','error');
      statsPanel.hidden = true;
      return;
    }
    if(!res.ok || !data.ok){
      setMessage(data.error || '读取失败，请稍后再试。','error');
      return;
    }
    setMessage('统计已更新。','success');
    renderStats(data);
  }catch(err){
    console.warn('Failed to load admin stats', err);
    setMessage('读取失败，请检查网络或函数部署状态。','error');
  }finally{
    loadStatsBtn.disabled = false;
    loadStatsBtn.textContent = '查看统计';
  }
}

loadStatsBtn.addEventListener('click', loadStats);
secretInput.addEventListener('keydown', (event)=>{
  if(event.key === 'Enter') loadStats();
});
