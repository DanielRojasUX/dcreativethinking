/* ---------------- login flow ---------------- */
(function(){
  const loginScreen = document.getElementById('loginScreen');
  const loginCard = document.getElementById('loginCard');
  const loginForm = document.getElementById('loginForm');
  const loginSuccessEl = document.getElementById('loginSuccess');
  const loginSubmit = document.getElementById('loginSubmit');
  const emailInput = document.getElementById('loginEmail');
  const passwordInput = document.getElementById('loginPassword');
  const tipEmail = document.getElementById('tipEmail');
  const tipPassword = document.getElementById('tipPassword');
  const appRoot = document.getElementById('appRoot');

  if(!loginScreen || !appRoot) return;

  let emailTouched = false;
  let passwordTouched = false;

  function showTip(el){ if(el) el.classList.add('login-tip-visible'); }
  function hideTip(el){ if(el) el.classList.remove('login-tip-visible'); }

  function advanceToPasswordTip(){
    if(emailTouched) return;
    emailTouched = true;
    hideTip(tipEmail);
    setTimeout(()=>{ if(!passwordTouched) showTip(tipPassword); }, 350);
  }

  if (emailInput) emailInput.addEventListener('input', advanceToPasswordTip);
  if (passwordInput) {
    passwordInput.addEventListener('focus', advanceToPasswordTip);
    passwordInput.addEventListener('input', ()=>{
      if(passwordTouched) return;
      passwordTouched = true;
      hideTip(tipPassword);
    });
  }

  function initLoginSequence() {
    setTimeout(()=>{
      if(loginCard) loginCard.classList.add('login-card-visible');
      setTimeout(()=> showTip(tipEmail), 500);
    }, 1000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLoginSequence);
  } else {
    initLoginSequence();
  }

  function revealDashboard(){
    const groups = [];
    const rail = document.querySelector('.rail');
    const topbar = document.querySelector('.topbar');
    if(rail) groups.push([rail]);
    if(topbar) groups.push([topbar]);

    const activeView = document.querySelector('.view.active');
    if(activeView){
      const head = activeView.querySelector('.view-head');
      if(head) groups.push([head]);

      const wrappers = Array.from(activeView.children).filter(c=> c !== head);
      wrappers.forEach(w=>{
        const kids = Array.from(w.children);
        if(kids.length > 1){
          kids.forEach(k=>{
            if(/\b(kpi-row|g-2col|g-2col-r|g-3col)\b/.test(k.className)){
              Array.from(k.children).forEach(gc=> groups.push([gc]));
            } else {
              groups.push([k]);
            }
          });
        } else if(kids.length === 1){
          groups.push([kids[0]]);
        } else {
          groups.push([w]);
        }
      });
    }

    appRoot.classList.add('app-visible');

    let delay = 0;
    groups.forEach(g=>{
      g.forEach(el=>{
        if(!el) return;
        el.classList.add('dash-reveal');
        setTimeout(()=> el.classList.add('dash-reveal-in'), delay);
      });
      delay += 90;
    });
  }

  if (loginForm) {
    loginForm.addEventListener('submit', (e)=>{
      e.preventDefault();
      if(loginSubmit.classList.contains('loading')) return;
      if(!emailInput.value.trim() || !passwordInput.value.trim()) return;

      hideTip(tipEmail);
      hideTip(tipPassword);
      loginSubmit.classList.add('loading');

      setTimeout(()=>{
        loginForm.classList.add('login-form-hidden');
        loginSuccessEl.classList.add('login-success-visible');

        setTimeout(()=>{
          loginCard.classList.add('login-card-leaving');

          setTimeout(()=>{
            loginScreen.style.display = 'none';
            revealDashboard();
          }, 550);
        }, 1100);
      }, 850);
    });
  }
})();

/* ---------------- Global Chart Refresh Logic ---------------- */
function randomizeCharts() {
  if (typeof Chart === 'undefined') return;
  Object.values(Chart.instances).forEach(chart => {
    chart.data.datasets.forEach(dataset => {
      if(dataset.data) {
        dataset.data = dataset.data.map(v => Math.max(1, v + (Math.floor(Math.random() * 20) - 10)));
      }
    });
    chart.update('none'); // Update without full animation for quick filter transitions
  });
}

/* ---------------- UI Interactions & Modals ---------------- */
(function initUI() {
  const toggles = [
    { btn: 'rangeToggle', menu: 'rangeDropdown' },
    { btn: 'notifToggle', menu: 'notifDropdown' },
    { btn: 'profileToggle', menu: 'profileDropdown' }
  ];

  toggles.forEach(t => {
    const btn = document.getElementById(t.btn);
    const menu = document.getElementById(t.menu);
    if (btn && menu) {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggles.forEach(other => {
          if (other.menu !== t.menu) {
            const m = document.getElementById(other.menu);
            if (m) m.classList.remove('show');
          }
        });
        menu.classList.toggle('show');
      });
    }
  });

  document.addEventListener('click', () => {
    toggles.forEach(t => {
      const menu = document.getElementById(t.menu);
      if (menu) menu.classList.remove('show');
    });
  });

  document.querySelectorAll('.dropdown-menu').forEach(m => {
    m.addEventListener('click', e => e.stopPropagation());
  });

  // Range Dropdown filter actions
  const rangeItems = document.querySelectorAll('#rangeDropdown .dropdown-item');
  const rangeValue = document.getElementById('rangeValue');
  rangeItems.forEach(item => {
    item.addEventListener('click', () => {
      if (rangeValue) rangeValue.textContent = item.dataset.range;
      document.getElementById('rangeDropdown').classList.remove('show');
      randomizeCharts();
    });
  });

  /* Modals Logic */
  const backdrop = document.getElementById('modalBackdrop');
  
  function openModal(id) {
    if (!backdrop) return;
    document.querySelectorAll('.modal').forEach(m => m.classList.remove('active'));
    document.querySelectorAll('.dropdown-menu').forEach(m => m.classList.remove('show'));
    backdrop.classList.add('show');
    const target = document.getElementById(id);
    if (target) target.classList.add('active');
  }

  function closeModal() {
    if (backdrop) backdrop.classList.remove('show');
    document.querySelectorAll('.modal').forEach(m => m.classList.remove('active'));
  }

  document.getElementById('btnSignoutPrompt')?.addEventListener('click', () => openModal('modalSignout'));
  document.getElementById('btnSettings')?.addEventListener('click', () => openModal('modalSettings'));
  document.getElementById('btnPreferences')?.addEventListener('click', () => openModal('modalPreferences'));
  document.getElementById('btnSeeAllNotifs')?.addEventListener('click', () => openModal('modalAllNotifs'));

  document.querySelectorAll('.modal-close, [data-modal-close]').forEach(btn => {
    btn.addEventListener('click', closeModal);
  });

  if (backdrop) {
    backdrop.addEventListener('click', e => {
      if (e.target === backdrop) closeModal();
    });
  }

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
  });

  /* Notification Dropdown Click Hooks */
  const notifItems = document.querySelectorAll('.notif-list-dd .notif-item');
  const notifDot = document.getElementById('notifDot');
  notifItems.forEach(item => {
    item.addEventListener('click', () => {
      item.classList.remove('unread');
      item.classList.add('read');
      const group = item.dataset.targetGroup;
      const view = item.dataset.targetView;
      if (group && view && typeof switchGroup === 'function') {
        switchGroup(group);
        switchView(group, view);
        if (notifDot) notifDot.style.display = 'none';
        document.getElementById('notifDropdown').classList.remove('show');
      }
    });
  });

  /* 20 Dummy Notifications for Modal */
  const allNotifsData = [
    { tag: "ALARM", tagClass: "warn", title: "Theft alert triggered", sub: "TCU 15542000002638 · 2m ago", read: false },
    { tag: "E-3", tagClass: "warn", title: "Charge fault detected", sub: "TCU 353915080106927 · 1h ago", read: false },
    { tag: "INFO", tagClass: "info", title: "Weekly sales report ready", sub: "System · 3h ago", read: false },
    { tag: "TEMP", tagClass: "warn", title: "Battery overheat warning", sub: "TCU 20981100034456 · 5h ago", read: false },
    { tag: "COMM", tagClass: "dim", title: "Lost GPS signal", sub: "TCU 17795500098871 · 6h ago", read: false },
    { tag: "BATT", tagClass: "warn", title: "Low 12V Battery", sub: "TCU 15542000002638 · 8h ago", read: false },
    { tag: "INFO", tagClass: "info", title: "Firmware Updated V2.6", sub: "TCU 353915080106927 · 12h ago", read: false },
    { tag: "INFO", tagClass: "info", title: "New long ride logged", sub: "TCU 17795500012211 · 14h ago", read: false },
    { tag: "E-3", tagClass: "warn", title: "Charge fault detected", sub: "TCU 20981100091823 · 1d ago", read: true },
    { tag: "ALARM", tagClass: "warn", title: "Security disarmed", sub: "TCU 15542000002638 · 1d ago", read: true },
    { tag: "INFO", tagClass: "info", title: "Monthly diagnostics report", sub: "System · 2d ago", read: true },
    { tag: "COMM", tagClass: "dim", title: "Connectivity restored", sub: "TCU 17795500098871 · 2d ago", read: true },
    { tag: "INFO", tagClass: "info", title: "TCU Activation complete", sub: "TCU 48200192837465 · 3d ago", read: true },
    { tag: "INFO", tagClass: "info", title: "Fleet maintenance reminder", sub: "System · 4d ago", read: true },
    { tag: "E-3", tagClass: "warn", title: "Charge fault detected", sub: "TCU 15542000002638 · 4d ago", read: true },
    { tag: "TEMP", tagClass: "warn", title: "Battery overheat warning", sub: "TCU 353915080106927 · 5d ago", read: true },
    { tag: "INFO", tagClass: "info", title: "New long ride logged", sub: "TCU 20981100034456 · 6d ago", read: true },
    { tag: "ALARM", tagClass: "warn", title: "Theft alert triggered", sub: "TCU 17795500012211 · 1w ago", read: true },
    { tag: "INFO", tagClass: "info", title: "Quarterly sales review", sub: "System · 1w ago", read: true },
    { tag: "BATT", tagClass: "warn", title: "Low 12V Battery resolved", sub: "TCU 15542000002638 · 1w ago", read: true }
  ];

  const notifsList = document.getElementById('allNotifsList');
  let currentFilter = 'all';

  function renderModalNotifs() {
    if (!notifsList) return;
    notifsList.innerHTML = '';
    const filtered = allNotifsData.filter(n => currentFilter === 'all' || !n.read);
    
    if (filtered.length === 0) {
      notifsList.innerHTML = '<div style="padding: 40px; text-align:center; color: var(--ink-faint);">No unread notifications</div>';
      return;
    }

    filtered.forEach((n, idx) => {
      const item = document.createElement('div');
      item.className = `dropdown-item notif-item ${n.read ? 'read' : 'unread'}`;
      item.innerHTML = `
        <span class="event-tag ${n.tagClass}">${n.tag}</span>
        <div>
          <div class="notif-title">${n.title}</div>
          <div class="notif-sub">${n.sub}</div>
        </div>
      `;
      item.addEventListener('click', () => {
        n.read = true;
        renderModalNotifs();
      });
      notifsList.appendChild(item);
    });
  }

  document.getElementById('tabNotifAll')?.addEventListener('click', (e) => {
    document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
    e.target.classList.add('active');
    currentFilter = 'all';
    renderModalNotifs();
  });

  document.getElementById('tabNotifUnread')?.addEventListener('click', (e) => {
    document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
    e.target.classList.add('active');
    currentFilter = 'unread';
    renderModalNotifs();
  });

  document.getElementById('btnMarkAllRead')?.addEventListener('click', () => {
    allNotifsData.forEach(n => n.read = true);
    if (notifDot) notifDot.style.display = 'none';
    document.querySelectorAll('.notif-list-dd .notif-item').forEach(el => {
      el.classList.remove('unread'); el.classList.add('read');
    });
    const badge = document.querySelector('.notif-count');
    if (badge) badge.style.display = 'none';
    renderModalNotifs();
  });

  renderModalNotifs();

})();

/* ---------------- group / tab model ---------------- */
const GROUPS = {
  favorites: { label:'Favorites', children:[] },
  fleet: { label:'Fleet', children:[
    {id:'fleet-overview', label:'Fleet Overview'},
    {id:'sales', label:'Sales'},
    {id:'daily', label:'Daily Bike Status'}
  ]},
  performance: { label:'Performance', children:[
    {id:'summary', label:'Summary'},
    {id:'battery', label:'Battery Status'},
    {id:'mileage', label:'Mileage Summary'},
    {id:'ride', label:'Ride Summary'}
  ]},
  diagnostics: { label:'Diagnostics', children:[
    {id:'telltales', label:'Telltales'},
    {id:'details', label:'Mileage Details'}
  ]}
};

function groupOf(viewId){
  for(const g in GROUPS){
    if(GROUPS[g].children.some(c=> c.id === viewId)) return g;
  }
  return null;
}
function labelOf(viewId){
  for(const g in GROUPS){
    const c = GROUPS[g].children.find(c=> c.id === viewId);
    if(c) return c.label;
  }
  return viewId;
}

const favorites = {};

let activeGroup = 'fleet';
let activeView = 'fleet-overview';

const tabsWrap = document.getElementById('tabsWrap');
const tabPill = document.getElementById('tabPill');
const groupLabel = document.getElementById('groupLabel');
const railRows = Array.from(document.querySelectorAll('.rail-row[data-group]'));
const railFavItems = document.getElementById('railFavItems');
const views = Array.from(document.querySelectorAll('.view'));

/* Using a pure monotonic SVG icon for stars to avoid any emoji-replacements */
const STAR_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-star"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>';
const UNPIN_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>';

function renderTabs(groupKey, selectView){
  const group = GROUPS[groupKey];
  if (!tabsWrap) return;
  Array.from(tabsWrap.querySelectorAll('.tab-btn')).forEach(b=> b.remove());

  if(!group.children.length){
    tabsWrap.style.display = 'none';
    if(groupLabel) groupLabel.style.display = 'block';
    return;
  }
  tabsWrap.style.display = 'flex';
  if(groupLabel) groupLabel.style.display = 'none';

  group.children.forEach(child=>{
    const btn = document.createElement('button');
    btn.className = 'tab-btn' + (child.id === selectView ? ' active' : '');
    btn.dataset.view = child.id;

    const label = document.createElement('span');
    label.className = 'tab-label';
    label.textContent = child.label;
    btn.appendChild(label);

    const star = document.createElement('span');
    star.className = 'tab-star' + (favorites[child.id] ? ' favorited' : '');
    star.innerHTML = STAR_SVG;
    star.addEventListener('click', (e)=>{
      e.stopPropagation();
      toggleFavorite(child.id, child.label, groupKey);
      star.classList.toggle('favorited', !!favorites[child.id]);
    });
    btn.appendChild(star);

    btn.addEventListener('click', ()=> switchView(groupKey, child.id));
    tabsWrap.appendChild(btn);
  });

  requestAnimationFrame(()=>{
    const activeBtn = tabsWrap.querySelector('.tab-btn.active') || tabsWrap.querySelector('.tab-btn');
    if(activeBtn) placePill(activeBtn);
  });
}

function placePill(btn){
  if (!tabsWrap || !tabPill) return;
  const r = btn.getBoundingClientRect();
  const wrapR = tabsWrap.getBoundingClientRect();
  tabPill.style.opacity = '1';
  tabPill.style.width = r.width + 'px';
  tabPill.style.transform = `translateX(${r.left - wrapR.left}px)`;
}

function switchGroup(groupKey){
  activeGroup = groupKey;
  railRows.forEach(b=> b.classList.toggle('active', b.dataset.group === groupKey));
  const group = GROUPS[groupKey];
  if(!group.children.length){
    if(tabPill) tabPill.style.opacity = '0';
    renderTabs(groupKey, null);
    showView('favorites');
    return;
  }
  const firstChild = group.children[0].id;
  renderTabs(groupKey, firstChild);
  showView(firstChild);
}

function switchView(groupKey, viewId){
  activeGroup = groupKey;
  railRows.forEach(b=> b.classList.toggle('active', b.dataset.group === groupKey));
  if(tabsWrap) {
    Array.from(tabsWrap.querySelectorAll('.tab-btn')).forEach(b=>{
      b.classList.toggle('active', b.dataset.view === viewId);
    });
    const activeBtn = tabsWrap.querySelector('.tab-btn.active');
    if(activeBtn) placePill(activeBtn);
  }
  showView(viewId);
}

function showView(viewId){
  activeView = viewId;
  views.forEach(v=> v.classList.toggle('active', v.id === 'view-' + viewId));
  if(viewId === 'fleet-overview') requestAnimationFrame(revealRings);
  if(viewId === 'battery') requestAnimationFrame(revealRings);
  if(viewId === 'favorites') renderFavoritesView();
  
  // Forces Chart.js to recalculate its canvas dimensions when a tab becomes visible
  // We call reset() and update() to mathematically ensure the bars rise from the base and lines draw correctly
  if (typeof Chart !== 'undefined') {
    requestAnimationFrame(() => {
      Object.values(Chart.instances).forEach(chart => {
        if (chart.canvas.closest('#view-' + viewId)) {
           chart.resize();
           chart.reset(); 
           chart.update(); 
        }
      });
    });
  }
}

railRows.forEach(btn=>{
  btn.addEventListener('click', ()=> switchGroup(btn.dataset.group));
});

/* ---------------- favorites logic ---------------- */
function toggleFavorite(viewId, label, group){
  if(favorites[viewId]){
    delete favorites[viewId];
  } else {
    favorites[viewId] = { label, group };
  }
  renderFavoritesSidebar();
  if(activeView === 'favorites') renderFavoritesView();
}

function renderFavoritesSidebar(){
  if (!railFavItems) return;
  railFavItems.innerHTML = '';
  Object.keys(favorites).forEach(viewId=>{
    const fav = favorites[viewId];
    const row = document.createElement('div');
    row.className = 'rail-row rail-fav-item';
    row.dataset.group = fav.group;
    row.dataset.view = viewId;
    row.title = fav.label;
    row.innerHTML = `
      <span class="rail-ico"></span>
      <span class="rail-label">${fav.label}</span>
      <span class="rail-unpin">${UNPIN_SVG}</span>
    `;
    row.addEventListener('click', (e)=>{
      if(e.target.closest('.rail-unpin')) return;
      activeGroup = fav.group;
      railRows.forEach(b=> b.classList.toggle('active', b.dataset.group === fav.group));
      renderTabs(fav.group, viewId);
      switchView(fav.group, viewId);
    });
    row.querySelector('.rail-unpin').addEventListener('click', (e)=>{
      e.stopPropagation();
      toggleFavorite(viewId, fav.label, fav.group);
      if(activeGroup === fav.group && tabsWrap){
        const starBtn = tabsWrap.querySelector(`.tab-btn[data-view="${viewId}"] .tab-star`);
        if(starBtn) starBtn.classList.remove('favorited');
      }
    });
    railFavItems.appendChild(row);
  });
}

function renderFavoritesView(){
  const el = document.getElementById('favoritesContent');
  if(!el) return;
  const ids = Object.keys(favorites);
  if(!ids.length){
    el.innerHTML = `
      <div class="glass fav-empty">
        <div class="fav-empty-icon">${STAR_SVG}</div>
        <h2>No favorites yet</h2>
        <p>Hover any tab up top and tap the star to pin it here for quick access.</p>
        <div class="hint">${STAR_SVG}<span>Look for the star on each tab</span></div>
      </div>
    `;
    return;
  }
  el.innerHTML = `<div class="fav-grid">${ids.map(viewId=>{
    const fav = favorites[viewId];
    return `
      <div class="glass fav-card" data-group="${fav.group}" data-view="${viewId}">
        <div class="top">
          <div class="grp">${GROUPS[fav.group].label}</div>
          <div class="unstar">${STAR_SVG}</div>
        </div>
        <div class="lbl">${fav.label}</div>
      </div>
    `;
  }).join('')}</div>`;

  el.querySelectorAll('.fav-card').forEach(card=>{
    card.addEventListener('click', (e)=>{
      const g = card.dataset.group, v = card.dataset.view;
      if(e.target.closest('.unstar')){
        toggleFavorite(v, favorites[v] ? favorites[v].label : labelOf(v), g);
        return;
      }
      activeGroup = g;
      railRows.forEach(b=> b.classList.toggle('active', b.dataset.group === g));
      renderTabs(g, v);
      switchView(g, v);
    });
  });
}

window.addEventListener('resize', ()=>{
  if(tabsWrap) {
    const activeBtn = tabsWrap.querySelector('.tab-btn.active');
    if(activeBtn) placePill(activeBtn);
  }
});

/* initial state */
function initDashboard() {
  renderTabs('fleet', 'fleet-overview');
  showView('fleet-overview');
  renderFavoritesSidebar(); 
  
  // Initialize charts after the DOM is fully established
  initCharts();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initDashboard);
} else {
  initDashboard();
}

function revealRings(){
  document.querySelectorAll('.ring-value').forEach(el=>{
    if(el.dataset.offset) el.style.strokeDashoffset = el.dataset.offset;
  });
}

/* ---------------- Global Chart Instances ---------------- */
let chartFleetMonthly, chartSalesQuarter, chartDaily, chartCurve, chartMileage, chartRideDist, chartSummaryAcDc;

/* Center text plugin for doughnut charts */
const centerTextPlugin = {
  id: 'centerText',
  beforeDraw: function(chart) {
    if (chart.config.type !== 'doughnut') return;
    var width = chart.width, height = chart.height, ctx = chart.ctx;
    ctx.restore();
    var fontSize = (height / 114).toFixed(2);
    ctx.font = "bold " + fontSize + "em Space Grotesk";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#fff";
    var text = "52",
        textX = Math.round((width - ctx.measureText(text).width) / 2),
        textY = height / 2 - 10;
    ctx.fillText(text, textX, textY);
    ctx.font = "normal " + (fontSize*0.4) + "em JetBrains Mono";
    ctx.fillStyle = "#9aa2b1";
    var text2 = "SESSIONS",
        text2X = Math.round((width - ctx.measureText(text2).width) / 2),
        text2Y = height / 2 + 15;
    ctx.fillText(text2, text2X, text2Y);
    ctx.save();
  }
};

function initCharts() {
  if (typeof Chart === 'undefined') return;
  Chart.register(centerTextPlugin);

  Chart.defaults.font.family = "'JetBrains Mono', monospace";
  Chart.defaults.color = '#9aa2b1';
  Chart.defaults.font.size = 10.5;
  const gridCfg = { color:'rgba(255,255,255,0.06)', drawBorder:false };
  const tickCfg = { color:'#5b6272', font: { family: "'JetBrains Mono', monospace", size: 10 } };
  const tooltipCfg = { backgroundColor:'#0a0c10', borderColor:'rgba(255,255,255,0.12)', borderWidth:1, padding:12, titleFont: {weight:'bold', size: 13, family: "'Space Grotesk', sans-serif"}, bodyFont: {family: "'JetBrains Mono', monospace", size: 11}, bodySpacing:6, cornerRadius: 8, displayColors: true };

  // Base options applied to all charts to handle hover cursors and interactions smoothly
  const commonBaseOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: { display: false },
      tooltip: tooltipCfg
    },
    onHover: (event, chartElement) => {
      event.native.target.style.cursor = chartElement[0] ? 'pointer' : 'default';
    },
    onClick: (event, elements, chart) => {
      if (elements.length > 0) {
        const dataIndex = elements[0].index;
        const datasetIndex = elements[0].datasetIndex;
        const dataset = chart.data.datasets[datasetIndex];
        
        if (!dataset._originalBg) {
          dataset._originalBg = Array.isArray(dataset.backgroundColor) ? [...dataset.backgroundColor] : Array(dataset.data.length).fill(dataset.backgroundColor);
        }
        dataset.backgroundColor = dataset._originalBg.map((color, i) => i === dataIndex ? '#fff' : color);
        chart.update('none'); // Instant flash without redrawing lines
        setTimeout(() => {
          dataset.backgroundColor = dataset._originalBg;
          chart.update('none');
        }, 300);
      }
    }
  };

  // 1. Rising Bars: Native Chart.js does this automatically. We explicitly set the animation timing here.
  const barOptions = {
    ...commonBaseOptions,
    animation: {
      duration: 1200,
      easing: 'easeOutQuart'
    },
    scales:{ x:{ display: true, grid:{display:false}, ticks:tickCfg }, y:{ display: true, grid:gridCfg, ticks:tickCfg } }
  };

  // 2. Sequential Node Pop-In / Line Draw
  const lineOptions = {
    ...commonBaseOptions,
    animation: {
      duration: 1200,
      easing: 'easeOutQuart',
      delay: (ctx) => {
        return ctx.type === 'data' ? ctx.index * 60 : 0;
      }
    },
    scales:{ x:{ display: true, grid:{display:false}, ticks:tickCfg }, y:{ display: true, grid:gridCfg, ticks:tickCfg } }
  };

  const elFleetMonthly = document.getElementById('chartFleetMonthly');
  if (elFleetMonthly) {
    const monthLabels = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
    chartFleetMonthly = new Chart(elFleetMonthly, {
      data:{
        labels: monthLabels,
        datasets:[
          { type:'bar', label:'AC', data:[64,92,78,120,104,138,112,86,70,58,44,52],
            backgroundColor: [64,92,78,120,104,138,112,86,70,58,44,52].map((v,i)=> (i===3||i===5) ? 'rgba(255,130,106,0.85)' : 'rgba(255,255,255,0.10)'),
            hoverBackgroundColor: '#fff', borderRadius:6, maxBarThickness:22 },
          { type:'line', label:'DC', data:[18,24,20,34,28,38,30,22,17,14,11,13], borderColor:'#3fe0c9', backgroundColor:'rgba(63,224,201,0.12)',
            tension:0.4, fill:true, pointRadius:0, borderWidth:2 }
        ]
      },
      options: lineOptions // Uses the line animation stagger so both the bars and the line flow in beautifully
    });
  }

  const elSalesQuarter = document.getElementById('chartSalesQuarter');
  if (elSalesQuarter) {
    chartSalesQuarter = new Chart(elSalesQuarter, {
      type:'line',
      data:{
        labels:['Q1 21','Q2 21','Q3 21','Q4 21','Q1 22','Q2 22'],
        datasets:[{
          label: 'Units Delivered',
          data:[44,58,66,80,72,94],
          borderColor: '#FF826A', backgroundColor: 'rgba(255,130,106,0.1)',
          fill: true, tension: 0.3, pointBackgroundColor: '#FF826A', pointBorderWidth: 2, pointRadius: 4, hoverBorderWidth: 4
        }]
      },
      options: lineOptions
    });
  }

  const elDaily = document.getElementById('chartDaily');
  if (elDaily) {
    const dailyHeights = [58,64,71,66,78,84,74,62,69,80,88,73,61,55,67,76,82,90,79,70,64,59,72,86,92,77,68,60,66,75];
    chartDaily = new Chart(elDaily, {
      type:'bar',
      data:{
        labels: dailyHeights.map((_,i)=> 'D'+(i+1)),
        datasets:[{
          label: 'Reporting Bikes',
          data: dailyHeights,
          backgroundColor: dailyHeights.map(v=> v>=88 ? 'rgba(255,130,106,0.9)' : 'rgba(255,255,255,0.10)'),
          hoverBackgroundColor: '#fff', borderRadius:5, maxBarThickness:16
        }]
      },
      options:{
        ...barOptions,
        scales:{ x:{ display: true, grid:{display:false}, ticks:{display:false} }, y:{ display: true, grid:gridCfg, ticks:tickCfg } }
      }
    });
  }

  const elCurve = document.getElementById('chartCurve');
  if (elCurve) {
    chartCurve = new Chart(elCurve, {
      type:'line',
      data:{
        labels:Array.from({length:12},(_,i)=>i+1),
        datasets:[{
          label: 'Charge %',
          data:[28,34,41,49,56,63,70,77,84,90,95,100],
          borderColor: '#3fe0c9', backgroundColor: 'rgba(63,224,201,0.15)',
          fill: true, tension: 0.4, pointRadius: 0, borderWidth: 3
        }]
      },
      options:{
        ...lineOptions,
        scales:{ x:{ display: true, grid:{display:false}, ticks:{display:false} }, y:{ display: false } }
      }
    });
  }

  const elMileage = document.getElementById('chartMileage');
  if (elMileage) {
    chartMileage = new Chart(elMileage, {
      type:'line',
      data:{
        labels:['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'],
        datasets:[{
          label: 'Distance (mi)',
          data:[40,52,61,74,83,95,88,70,56,44,33,38],
          borderColor: 'rgba(255,255,255,0.8)', backgroundColor: 'rgba(255,255,255,0.05)',
          fill: true, tension: 0.3, pointRadius: 3, pointBackgroundColor: '#fff'
        }]
      },
      options:{
        ...lineOptions,
        scales:{ x:{ display: true, grid:{display:false}, ticks:tickCfg }, y:{ display: false } }
      }
    });
  }

  const elRideDist = document.getElementById('chartRideDist');
  if (elRideDist) {
    chartRideDist = new Chart(elRideDist, {
      type:'bar',
      data:{
        labels:['<15m','30m','1h','2h','3h','4h+'],
        datasets:[{
          label: 'Rides',
          data:[32,58,86,64,42,26],
          backgroundColor:[32,58,86,64,42,26].map(v=> v>=86 ? 'rgba(255,130,106,0.85)' : 'rgba(255,255,255,0.10)'),
          hoverBackgroundColor: '#fff', borderRadius:8, maxBarThickness:56
        }]
      },
      options:{
        ...barOptions,
        scales:{ x:{ display: true, grid:{display:false}, ticks:tickCfg }, y:{ display: false } }
      }
    });
  }

  const elSummaryAcDc = document.getElementById('chartSummaryAcDc');
  if (elSummaryAcDc) {
    chartSummaryAcDc = new Chart(elSummaryAcDc, {
      type:'doughnut',
      data:{
        labels: ['AC Sessions', 'DC Sessions'],
        datasets: [{
          data: [39, 13],
          backgroundColor: ['#FF826A', '#3fe0c9'],
          hoverBackgroundColor: ['#fff', '#fff'],
          borderWidth: 0,
          hoverOffset: 4
        }]
      },
      options:{
        ...commonBaseOptions,
        cutout: '75%',
        // 3. Progress Arc Fill / Circular Reveal
        animation: {
          animateRotate: true,
          animateScale: false,
          duration: 1500,
          easing: 'easeOutQuart'
        },
        scales: {x: {display:false}, y: {display:false}}
      }
    });
  }
}

/* ---------------- Telltales Radar Filtering ---------------- */
const radar = document.getElementById('radar');
if(radar){
  const pins = [
    {x:18, y:38, size:14, type:'fault', label:'353915080106927 · CHARGER'},
    {x:34, y:56, size:10, type:'fault', label:'15542000002638 · ALARM'},
    {x:52, y:34, size:20, type:'main',  label:'CLUSTER · 28% SOC AVG'},
    {x:66, y:62, size:12, type:'info',  label:'15542000002638 · DISARMED'},
    {x:78, y:44, size:8,  type:'fault', label:'353915080106927 · E-3'},
    {x:44, y:74, size:9,  type:'info',  label:'TCU · INFO EVENT'},
    {x:25, y:20, size:11, type:'info',  label:'TCU · INFO EVENT'},
    {x:85, y:70, size:13, type:'fault', label:'15542000002638 · CHARGER'},
    {x:60, y:15, size:10, type:'info',  label:'TCU · NORMAL'},
    {x:12, y:80, size:12, type:'fault', label:'CLUSTER · E-3'},
    {x:45, y:45, size:16, type:'info',  label:'TCU · ACTIVE'},
    {x:90, y:30, size:9,  type:'main',  label:'CLUSTER · OVERVIEW'},
    {x:70, y:85, size:14, type:'fault', label:'353915080106927 · ALARM'}
  ];
  pins.forEach(p=>{
    const pin = document.createElement('div');
    pin.className = 'pin ' + p.type;
    pin.style.left = p.x + '%';
    pin.style.top = p.y + '%';
    pin.style.width = p.size + 'px';
    pin.style.height = p.size + 'px';
    const tip = document.createElement('div');
    tip.className = 'pin-tip';
    tip.textContent = p.label;
    pin.appendChild(tip);
    radar.appendChild(pin);
  });
}

// Radar Chip Toggle Logic
const chipTelltaleFaulted = document.getElementById('chipTelltaleFaulted');
const chipTelltaleAll = document.getElementById('chipTelltaleAll');

if (chipTelltaleFaulted && chipTelltaleAll) {
  chipTelltaleFaulted.addEventListener('click', () => {
    chipTelltaleFaulted.classList.add('solid');
    chipTelltaleAll.classList.remove('solid');
    document.querySelectorAll('.radar .pin').forEach(p => {
      p.style.display = p.classList.contains('fault') ? 'block' : 'none';
    });
  });
  
  chipTelltaleAll.addEventListener('click', () => {
    chipTelltaleAll.classList.add('solid');
    chipTelltaleFaulted.classList.remove('solid');
    document.querySelectorAll('.radar .pin').forEach(p => {
      p.style.display = 'block';
    });
  });
}

/* ---------------- Mileage Details Table Filtering ---------------- */
const detailsRows = [
  {tcu:'353915080106927', date:'08/09/2021', sec:'armed', range:'255,456', stolen:false, immo:false},
  {tcu:'353915080106927', date:'08/09/2021', sec:'armed', range:'255,456', stolen:false, immo:false},
  {tcu:'353915080106927', date:'08/12/2021', sec:'armed', range:'255,456', stolen:false, immo:false},
  {tcu:'353915080106927', date:'09/01/2021', sec:'armed', range:'255,456', stolen:false, immo:false},
  {tcu:'353915080106927', date:'09/01/2021', sec:'armed', range:'255,456', stolen:false, immo:false},
  {tcu:'15542000002638', date:'02/20/2021', sec:'disarmed', range:'176,976', stolen:false, immo:false},
  {tcu:'15542000002638', date:'02/20/2021', sec:'armed', range:'167,959', stolen:false, immo:false},
  {tcu:'15542000002638', date:'02/20/2021', sec:'disarmed', range:'177,733', stolen:false, immo:false},
  {tcu:'15542000002638', date:'02/20/2021', sec:'armed', range:'177,813', stolen:false, immo:false},
  {tcu:'15542000002638', date:'02/20/2021', sec:'alarm', range:'175,118', stolen:false, immo:false},
  {tcu:'17795500012211', date:'03/04/2021', sec:'armed', range:'142,308', stolen:false, immo:false},
  {tcu:'17795500012211', date:'03/09/2021', sec:'armed', range:'143,912', stolen:false, immo:false},
  {tcu:'17795500098871', date:'04/18/2021', sec:'disarmed', range:'98,455', stolen:false, immo:false},
  {tcu:'17795500098871', date:'04/22/2021', sec:'alarm', range:'99,120', stolen:true, immo:false},
  {tcu:'20981100034456', date:'05/30/2021', sec:'armed', range:'211,004', stolen:false, immo:false},
  {tcu:'20981100034456', date:'06/02/2021', sec:'armed', range:'212,588', stolen:false, immo:true},
  {tcu:'20981100091823', date:'06/14/2021', sec:'armed', range:'56,742', stolen:false, immo:false},
  {tcu:'20981100091823', date:'07/01/2021', sec:'disarmed', range:'58,930', stolen:false, immo:false},
  {tcu:'353915080106927', date:'08/09/2021', sec:'armed', range:'255,456', stolen:false, immo:false},
  {tcu:'353915080106927', date:'08/09/2021', sec:'armed', range:'255,456', stolen:false, immo:false},
  {tcu:'353915080106927', date:'08/12/2021', sec:'armed', range:'255,456', stolen:false, immo:false},
  {tcu:'353915080106927', date:'09/01/2021', sec:'armed', range:'255,456', stolen:false, immo:false},
  {tcu:'353915080106927', date:'09/01/2021', sec:'armed', range:'255,456', stolen:false, immo:false},
  {tcu:'15542000002638', date:'02/20/2021', sec:'disarmed', range:'176,976', stolen:false, immo:false},
  {tcu:'15542000002638', date:'02/20/2021', sec:'armed', range:'167,959', stolen:false, immo:false},
  {tcu:'15542000002638', date:'02/20/2021', sec:'disarmed', range:'177,733', stolen:false, immo:false},
  {tcu:'15542000002638', date:'02/20/2021', sec:'armed', range:'177,813', stolen:false, immo:false},
  {tcu:'15542000002638', date:'02/20/2021', sec:'alarm', range:'175,118', stolen:false, immo:false},
  {tcu:'17795500012211', date:'03/04/2021', sec:'armed', range:'142,308', stolen:false, immo:false},
  {tcu:'17795500012211', date:'03/09/2021', sec:'armed', range:'143,912', stolen:false, immo:false},
  {tcu:'17795500098871', date:'04/18/2021', sec:'disarmed', range:'98,455', stolen:false, immo:false},
  {tcu:'17795500098871', date:'04/22/2021', sec:'alarm', range:'99,120', stolen:true, immo:false},
  {tcu:'20981100034456', date:'05/30/2021', sec:'armed', range:'211,004', stolen:false, immo:false},
  {tcu:'20981100034456', date:'06/02/2021', sec:'armed', range:'212,588', stolen:false, immo:true},
  {tcu:'20981100091823', date:'06/14/2021', sec:'armed', range:'56,742', stolen:false, immo:false},
  {tcu:'20981100091823', date:'07/01/2021', sec:'disarmed', range:'58,930', stolen:false, immo:false}
];

const detailsBody = document.getElementById('detailsBody');

function renderDetailsTable() {
  if (!detailsBody) return;
  const chipStolen = document.getElementById('chipStolen');
  const chipNotStolen = document.getElementById('chipNotStolen');
  const chipImmob = document.getElementById('chipImmob');
  const chipNotImmob = document.getElementById('chipNotImmob');
  
  const showStolen = chipStolen ? chipStolen.classList.contains('solid') : false;
  const showNotStolen = chipNotStolen ? chipNotStolen.classList.contains('solid') : false;
  const showImmob = chipImmob ? chipImmob.classList.contains('solid') : false;
  const showNotImmob = chipNotImmob ? chipNotImmob.classList.contains('solid') : false;

  const filtered = detailsRows.filter(r => {
    let matchStolen = true;
    if (showStolen && !showNotStolen) matchStolen = r.stolen === true;
    if (showNotStolen && !showStolen) matchStolen = r.stolen === false;
    
    let matchImmob = true;
    if (showImmob && !showNotImmob) matchImmob = r.immo === true;
    if (showNotImmob && !showImmob) matchImmob = r.immo === false;

    return matchStolen && matchImmob;
  });

  detailsBody.innerHTML = filtered.map(r=>`
    <tr>
      <td>${r.tcu}</td>
      <td>${r.date}</td>
      <td>${r.stolen ? '<span style="color:var(--red)">Stolen</span>' : 'Not stolen'}</td>
      <td>${r.immo ? '<span style="color:var(--amber-soft)">Immobilized</span>' : 'Not immobilized'}</td>
      <td><span class="status-pill ${r.sec}"><span class="sw"></span>${r.sec.charAt(0).toUpperCase()+r.sec.slice(1)}</span></td>
      <td>${r.range}</td>
      <td>E-3</td>
    </tr>
  `).join('');
  
  const footLabel = document.querySelector('#view-details .table-foot .chart-sub');
  if(footLabel) {
    footLabel.textContent = `${filtered.length} OF ${detailsRows.length} ROWS`;
  }
}

function pairToggle(onId, offId){
  const a = document.getElementById(onId), b = document.getElementById(offId);
  if(!a || !b) return;
  [a,b].forEach(el=> el.addEventListener('click', ()=>{
    a.classList.toggle('solid', el===a); 
    b.classList.toggle('solid', el===b);
    renderDetailsTable();
  }));
}

pairToggle('chipNotStolen','chipStolen');
pairToggle('chipNotImmob','chipImmob');
renderDetailsTable(); 

/* ---------------- background dimmer ---------------- */
(function initDimmer() {
  const dimmerSlider = document.getElementById('dimmerSlider');
  const dimmerOverlay = document.getElementById('dimmerOverlay');
  const dimmerWrapper = document.getElementById('dimmerWrapper');
  const dimmerToggleBtn = document.getElementById('dimmerToggleBtn');
  const dimmerCloseBtn = document.getElementById('dimmerCloseBtn');

  if (dimmerToggleBtn && dimmerWrapper && dimmerCloseBtn) {
    dimmerToggleBtn.addEventListener('click', () => {
      dimmerWrapper.classList.add('open');
    });
    dimmerCloseBtn.addEventListener('click', () => {
      dimmerWrapper.classList.remove('open');
    });
  }

  if (dimmerSlider && dimmerOverlay) {
    dimmerSlider.addEventListener('input', (e) => {
      dimmerOverlay.style.opacity = e.target.value;
    });
  }
})();