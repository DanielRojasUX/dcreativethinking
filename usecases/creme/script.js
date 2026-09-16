const stageNames = ["Submitted","Specialist review","Underwriting decision","Settlement approval","Closed"];
const stageNotes = [
  "Claim intake is complete and awaiting specialist assignment.",
  "Specialist assessment is currently in progress.",
  "Underwriting is finalizing the coverage determination.",
  "Pending final settlement sign-off.",
  "Case closed; settlement paid in full."
];

const categories = [
  { name:"Fine art", items:["Klimt study, oil on canvas","Rothko color field, mid-century","Degas bronze, edition 4/8","Basquiat work on paper","Monet water lily sketch"], values:[1250000,2140000,890000,3400000,1675000], gradient:"linear-gradient(135deg,#8f8368,#c9beA2)", spec:{initials:"MC",name:"Margot Chen",role:"Fine Art Appraiser, Chen & Ostrow",note:"Engaged to assess condition and authenticate provenance prior to valuation sign-off."} },
  { name:"Timepieces", items:["1962 Patek Philippe, ref. 2499","Rolex Daytona, 'Paul Newman'","Vacheron Constantin minute repeater","Audemars Piguet Royal Oak, 1972","Patek Philippe Nautilus, platinum"], values:[420000,680000,950000,310000,1150000], gradient:"linear-gradient(135deg,#5b5b58,#8a8a86)", spec:{initials:"JT",name:"James Torres",role:"Horology Specialist, Torres Valuations",note:"Confirms authenticity and cross-references market comparables before settlement recommendation."} },
  { name:"Marine vessels", items:["62' Sunreef catamaran, hull damage","112' Feadship, tender loss","Riva Aquarama, restoration claim","78' Sanlorenzo, storm damage","Wally 100, engine failure"], values:[310000,2850000,540000,1200000,4100000], gradient:"linear-gradient(135deg,#5c7686,#9db3bd)", spec:{initials:"DW",name:"Dana Whitcombe",role:"Marine Surveyor, Whitcombe Marine",note:"Surveys hull and mechanical systems to confirm extent of damage and repair cost."} },
  { name:"Wine collections", items:["Bordeaux collection, 1982 vintage","Burgundy cellar, temperature loss","Champagne library, transit damage","Napa cult cabernet collection","Rhone vertical, cellar flood"], values:[95000,210000,68000,340000,145000], gradient:"linear-gradient(135deg,#7a5a52,#a9887c)", spec:{initials:"PL",name:"Priya Lall",role:"Certified Sommelier, Lall Wine Consultancy",note:"Verifies spoilage and cross-checks bottle provenance against the original appraisal."} },
  { name:"Jewelry", items:["Cartier emerald necklace","Harry Winston diamond suite","Bulgari sapphire parure","Van Cleef & Arpels bracelet","Graff diamond ring, 12ct"], values:[560000,890000,1320000,275000,1980000], gradient:"linear-gradient(135deg,#6b5a7a,#a08cb0)", spec:{initials:"AF",name:"Adrienne Faust",role:"Gemologist, Faust & Lowe",note:"Assesses stone grading and setting integrity ahead of valuation confirmation."} },
  { name:"Classic automobiles", items:["1961 Ferrari 250 GT","1967 Shelby Cobra 427","Aston Martin DB5, restoration","Mercedes 300SL Gullwing","Porsche 911 Carrera RS"], values:[1850000,2600000,970000,1420000,780000], gradient:"linear-gradient(135deg,#7a2f2f,#b06060)", spec:{initials:"NB",name:"Nico Bellandi",role:"Classic Car Appraiser, Bellandi Motorworks",note:"Inspects chassis and provenance documentation to confirm restoration scope."} },
  { name:"Private aviation", items:["Gulfstream G650, landing gear incident","Bombardier Global 7500, hail damage","Cessna Citation X, hangar damage","Dassault Falcon 8X, bird strike","Embraer Phenom 300, ground incident"], values:[3200000,5100000,2450000,4300000,1890000], gradient:"linear-gradient(135deg,#4a5a6b,#7f95a8)", spec:{initials:"GM",name:"Grace Muniz",role:"Aviation Loss Adjuster, Muniz Aero Claims",note:"Coordinates with maintenance records to determine airworthiness impact and repair cost."} },
  { name:"Rare antiques", items:["First-edition manuscript collection","18th-century tapestry, moth damage","Ming dynasty vase, transit crack","Renaissance bronze bust","Rare book collection, water damage"], values:[180000,420000,265000,610000,340000], gradient:"linear-gradient(135deg,#6e6248,#a89b78)", spec:{initials:"OR",name:"Owen Radcliffe",role:"Antiquarian Appraiser, Radcliffe & Vance",note:"Authenticates provenance and assesses conservation requirements before settlement."} }
];

const clientNames = ["Whitfield, R.","Alvarez-Kent Family Trust","Devereux, S. & M.","Okafor, N.","Bertrand, C.","Castellane, P. & L.","Yamamoto Family Trust","Hollis, E.","Fitzgerald, T.","Marchetti, G.","Solberg, A. & K.","Reyes-Laurent, M.","Ashworth Family Trust","Van Doren, J.","Kowalski, R.","Osei, D.","Delacroix, S.","Renwick, H. & P.","Abernathy, W.","Tanaka, Y.","Moreau, C.","Whitmore Family Trust","Sinclair-Voss, N.","Adeyemi, F.","Larsen, B. & T.","Beaumont, L.","Castillo, R.","Nakamura, K.","Ferro, A.","Hargrove Family Trust","Chatterjee, S.","Lindqvist, M.","Okonjo, I.","Bassett-Hale, D.","Villanueva, C.","Strand, E. & J.","Duquesne, P.","Harrington, V.","Naidoo, R.","Prescott Family Trust"];

const causes = ["Water damage, storage flood","Theft, reported to local police","Transit damage during shipping","Fire damage, partial loss","Storm damage","Accidental drop","Mechanical failure","Structural damage in transit","Cooling or climate control failure","Impact damage, ground incident"];
const locations = ["Client residence, Geneva","Safe deposit, Zurich","Marina, Palma de Mallorca","Climate-controlled facility, London","Private vault, Monaco","Estate, Cap Ferrat","Storage facility, New York","Residence, Aspen","Gallery storage, Basel","Hangar, Teterboro"];
const tiers = ["Crème Reserve","Crème Coastal","Crème Aviation","Crème Signature"];
const appraisalPool = ["March 2025","November 2024","June 2025","January 2025","September 2024","February 2026","August 2025","May 2025"];

const claims = [];
const today = new Date("2026-09-11");
for(let i=0;i<40;i++){
  const catIdx = Math.floor(i/5);
  const itemIdx = i%5;
  const cat = categories[catIdx];
  const stage = i%5;
  const cause = causes[i%causes.length];
  const location = locations[(i+2)%locations.length];
  const tier = tiers[i%tiers.length];
  const daysAgo = 4 + i*3;
  const filedDate = new Date(today);
  filedDate.setDate(filedDate.getDate()-daysAgo);
  const filedStr = filedDate.toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'});
  const client = clientNames[i];
  const initials = client.split(/[\s,]+/).filter(w=>w && w[0]===w[0].toUpperCase() && !/Family|Trust/.test(w)).slice(0,2).map(w=>w[0]).join('').slice(0,2).toUpperCase() || "CL";
  const spec = stage===0 ? {initials:"—",name:"Not yet assigned",role:"Pending assignment",note:"A specialist will be assigned once initial documentation is confirmed complete."} : cat.spec;
  claims.push({
    id:i+1, client:client, initials:initials, item:cat.items[itemIdx], category:cat.name,
    valueNum:cat.values[itemIdx], value:"$"+cat.values[itemIdx].toLocaleString('en-US'),
    stage:stage, statusLabel:stageNames[stage], filed:filedStr, dateTs:filedDate.getTime(),
    swatchColor:cat.gradient,
    facts:[["Category",cat.name],["Location",location],["Last appraisal",appraisalPool[i%appraisalPool.length]],["Cause",cause],["Policy tier",tier]],
    notes:"Client reported "+cause.toLowerCase()+", item located at "+location+". "+stageNotes[stage],
    spec:spec
  });
}

let currentPage = 1;
const pageSize = 10;
const filterState = { category:'all', status:'all', sort:'date-desc' };

function checkSvg(){
  return '<svg class="chk" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>';
}

function populateFilterOptions(){
  const catPanel = document.getElementById('categoryDropdownPanel');
  let catHtml = `<div class="dropdown-item selected" data-value="all" onclick="selectFilter('category','all','All categories',this)">${checkSvg()}All categories</div>`;
  categories.forEach(c=>{
    catHtml += `<div class="dropdown-item" data-value="${c.name}" onclick="selectFilter('category','${c.name}','${c.name}',this)">${checkSvg()}${c.name}</div>`;
  });
  catPanel.innerHTML = catHtml;

  const statPanel = document.getElementById('statusDropdownPanel');
  let statHtml = `<div class="dropdown-item selected" data-value="all" onclick="selectFilter('status','all','All statuses',this)">${checkSvg()}All statuses</div>`;
  stageNames.forEach((s,i)=>{
    statHtml += `<div class="dropdown-item" data-value="${i}" onclick="selectFilter('status','${i}','${s}',this)">${checkSvg()}${s}</div>`;
  });
  statPanel.innerHTML = statHtml;
}

function getFiltered(){
  const q = document.getElementById('searchInput').value.trim().toLowerCase();
  let list = claims.filter(c=>{
    if(filterState.category!=='all' && c.category!==filterState.category) return false;
    if(filterState.status!=='all' && String(c.stage)!==filterState.status) return false;
    if(q && !(c.client.toLowerCase().includes(q) || c.item.toLowerCase().includes(q))) return false;
    return true;
  });
  list.sort((a,b)=>{
    if(filterState.sort==='value-desc') return b.valueNum-a.valueNum;
    if(filterState.sort==='value-asc') return a.valueNum-b.valueNum;
    if(filterState.sort==='date-asc') return a.dateTs-b.dateTs;
    return b.dateTs-a.dateTs;
  });
  return list;
}

function badgeClassFor(stage){ return (stage===1||stage===2||stage===3) ? 'active-status' : 'muted-status'; }

function renderQueue(){
  const filtered = getFiltered();
  const totalPages = Math.max(1, Math.ceil(filtered.length/pageSize));
  if(currentPage>totalPages) currentPage=totalPages;
  const startIdx=(currentPage-1)*pageSize;
  const pageItems = filtered.slice(startIdx, startIdx+pageSize);
  const body = document.getElementById('queue-body');

  if(pageItems.length===0){
    body.innerHTML = `<tr class="empty-row"><td colspan="5"><div class="empty-state"><div class="e-title">No claims match your filters</div><div class="e-sub">Try a different search term or reset your filters.</div><button class="btn btn-outline" onclick="clearFilters()">Clear filters</button></div></td></tr>`;
  } else {
    body.innerHTML = pageItems.map(c => `
      <tr onclick="showDetail(${c.id})">
        <td><div class="client-cell"><div class="avatar raised-sm">${c.initials}</div><div class="client-name">${c.client}</div></div></td>
        <td><div>${c.item}</div><div class="item-meta">${c.category}</div></td>
        <td class="filed-cell">${c.filed}</td>
        <td class="value-cell">${c.value}</td>
        <td><span class="badge ${badgeClassFor(c.stage)}"><span class="badge-dot"></span>${c.statusLabel}</span></td>
      </tr>`).join('');
  }

  const pag = document.getElementById('pagination');
  let pagHtml = `<button class="page-btn" ${currentPage===1?'disabled':''} onclick="goPage(${currentPage-1})">Prev</button><div class="page-numbers">`;
  for(let p=1;p<=totalPages;p++){ pagHtml += `<button class="page-btn ${p===currentPage?'active':''}" onclick="goPage(${p})">${p}</button>`; }
  pagHtml += `</div><button class="page-btn" ${currentPage===totalPages?'disabled':''} onclick="goPage(${currentPage+1})">Next</button>`;
  pag.innerHTML = pagHtml;

  const shownFrom = pageItems.length ? startIdx+1 : 0;
  const shownTo = startIdx+pageItems.length;
  document.getElementById('resultsCount').textContent = `Showing ${shownFrom}-${shownTo} of ${filtered.length} claims`;
  document.getElementById('queueSubtitle').textContent = filtered.length===claims.length ? `${claims.length} active claims across your book` : `${filtered.length} claim${filtered.length!==1?'s':''} match your filters`;
}

function goPage(p){
  const filtered = getFiltered();
  const totalPages = Math.max(1, Math.ceil(filtered.length/pageSize));
  if(p<1||p>totalPages) return;
  currentPage = p;
  renderQueue();
  document.querySelector('.queue-card').scrollIntoView({block:'nearest'});
}

function selectFilter(kind, value, label, el){
  filterState[kind] = value;
  const panel = el.closest('.dropdown-panel');
  panel.querySelectorAll('.dropdown-item').forEach(it=>it.classList.remove('selected'));
  el.classList.add('selected');
  const dropdownId = el.closest('.dropdown').id;
  document.getElementById(dropdownId.replace('Dropdown','DropdownLabel')).textContent = label;
  el.closest('.dropdown').classList.remove('open');
  currentPage = 1;
  renderQueue();
}

function clearFilters(){
  document.getElementById('searchInput').value='';
  filterState.category='all'; filterState.status='all'; filterState.sort='date-desc';
  document.getElementById('categoryDropdownLabel').textContent='All categories';
  document.getElementById('statusDropdownLabel').textContent='All statuses';
  document.getElementById('sortDropdownLabel').textContent='Newest filed';
  document.querySelectorAll('#categoryDropdownPanel .dropdown-item').forEach(it=>it.classList.toggle('selected', it.dataset.value==='all'));
  document.querySelectorAll('#statusDropdownPanel .dropdown-item').forEach(it=>it.classList.toggle('selected', it.dataset.value==='all'));
  document.querySelectorAll('#sortDropdownPanel .dropdown-item').forEach(it=>it.classList.toggle('selected', it.dataset.value==='date-desc'));
  currentPage=1;
  renderQueue();
}

document.getElementById('searchInput').addEventListener('input', ()=>{ currentPage=1; renderQueue(); });

function toggleDropdown(id){
  const el = document.getElementById(id);
  const isOpen = el.classList.contains('open');
  document.querySelectorAll('.dropdown.open').forEach(d=>{ if(d.id!==id) d.classList.remove('open'); });
  el.classList.toggle('open', !isOpen);
}
document.addEventListener('click', (e)=>{
  document.querySelectorAll('.dropdown.open').forEach(d=>{ if(!d.contains(e.target)) d.classList.remove('open'); });
});

function renderTracker(currentStage){
  const el = document.getElementById('d-tracker');
  el.innerHTML = stageNames.map((s,i) => {
    let cls = 'tstep';
    if(i < currentStage) cls += ' done';
    if(i === currentStage) cls += ' current';
    const mark = i < currentStage ? '&#10003;' : (i+1);
    return `<div class="${cls}"><div class="tline"></div><div class="tdot">${mark}</div><div class="tlabel">${s}</div></div>`;
  }).join('');
}

let activeClaim = null;

function setActiveNav(name){
  document.querySelectorAll('.nav-item').forEach(n=>n.classList.remove('active','raised-sm'));
  const navEl = document.getElementById('nav-'+name);
  if(navEl) navEl.classList.add('active','raised-sm');
}

function switchView(name){
  document.querySelectorAll('.view').forEach(v=>v.classList.remove('active'));
  document.getElementById('view-'+name).classList.add('active');
  setActiveNav(name);
  if(name==='clients') renderClients();
  if(name==='specialists') renderSpecialists();
  if(name==='settlements') renderSettlements();
  window.scrollTo(0,0);
}

function goToClientClaims(clientName){
  switchView('queue');
  document.getElementById('searchInput').value = clientName;
  filterState.category='all'; filterState.status='all'; filterState.sort='date-desc';
  document.getElementById('categoryDropdownLabel').textContent='All categories';
  document.getElementById('statusDropdownLabel').textContent='All statuses';
  document.getElementById('sortDropdownLabel').textContent='Newest filed';
  document.querySelectorAll('#categoryDropdownPanel .dropdown-item').forEach(it=>it.classList.toggle('selected', it.dataset.value==='all'));
  document.querySelectorAll('#statusDropdownPanel .dropdown-item').forEach(it=>it.classList.toggle('selected', it.dataset.value==='all'));
  document.querySelectorAll('#sortDropdownPanel .dropdown-item').forEach(it=>it.classList.toggle('selected', it.dataset.value==='date-desc'));
  currentPage=1;
  renderQueue();
}

function goToCategoryClaims(categoryName){
  switchView('queue');
  document.getElementById('searchInput').value='';
  filterState.category=categoryName; filterState.status='all'; filterState.sort='date-desc';
  document.getElementById('categoryDropdownLabel').textContent=categoryName;
  document.getElementById('statusDropdownLabel').textContent='All statuses';
  document.getElementById('sortDropdownLabel').textContent='Newest filed';
  document.querySelectorAll('#categoryDropdownPanel .dropdown-item').forEach(it=>it.classList.toggle('selected', it.dataset.value===categoryName));
  document.querySelectorAll('#statusDropdownPanel .dropdown-item').forEach(it=>it.classList.toggle('selected', it.dataset.value==='all'));
  document.querySelectorAll('#sortDropdownPanel .dropdown-item').forEach(it=>it.classList.toggle('selected', it.dataset.value==='date-desc'));
  currentPage=1;
  renderQueue();
}

function computeClientStats(){
  const map = {};
  claims.forEach(c=>{
    if(!map[c.client]) map[c.client] = {count:0, total:0, categories:{}, initials:c.initials};
    map[c.client].count++;
    map[c.client].total += c.valueNum;
    map[c.client].categories[c.category] = (map[c.client].categories[c.category]||0)+1;
  });
  return Object.keys(map).map(name=>{
    const d = map[name];
    const primaryCat = Object.keys(d.categories).sort((a,b)=>d.categories[b]-d.categories[a])[0];
    return Object.assign({name:name, primaryCat:primaryCat}, d);
  });
}

const clientsFilterState = { category:'all', sort:'value-desc' };
let clientsViewMode = 'grid';
let clientsPage = 1;
const clientsPageSize = 10;

function populateClientsFilterOptions(){
  const panel = document.getElementById('clientsCategoryDropdownPanel');
  let html = `<div class="dropdown-item selected" data-value="all" onclick="selectClientsFilter('category','all','All categories',this)">${checkSvg()}All categories</div>`;
  categories.forEach(c=>{ html += `<div class="dropdown-item" data-value="${c.name}" onclick="selectClientsFilter('category','${c.name}','${c.name}',this)">${checkSvg()}${c.name}</div>`; });
  panel.innerHTML = html;
}

function getFilteredClients(){
  const q = document.getElementById('clientsSearchInput').value.trim().toLowerCase();
  let list = computeClientStats().filter(cl=>{
    if(clientsFilterState.category!=='all' && !cl.categories[clientsFilterState.category]) return false;
    if(q && !cl.name.toLowerCase().includes(q)) return false;
    return true;
  });
  list.sort((a,b)=>{
    if(clientsFilterState.sort==='value-asc') return a.total-b.total;
    if(clientsFilterState.sort==='claims-desc') return b.count-a.count;
    if(clientsFilterState.sort==='name-asc') return a.name.localeCompare(b.name);
    return b.total-a.total;
  });
  return list;
}

function selectClientsFilter(kind, value, label, el){
  clientsFilterState[kind] = value;
  const panel = el.closest('.dropdown-panel');
  panel.querySelectorAll('.dropdown-item').forEach(it=>it.classList.remove('selected'));
  el.classList.add('selected');
  document.getElementById(el.closest('.dropdown').id+'Label').textContent = label;
  el.closest('.dropdown').classList.remove('open');
  clientsPage = 1;
  renderClients();
}

function goClientsPage(p){
  const filtered = getFilteredClients();
  const totalPages = Math.max(1, Math.ceil(filtered.length/clientsPageSize));
  if(p<1||p>totalPages) return;
  clientsPage = p;
  renderClients();
}

function setClientsView(mode){
  clientsViewMode = mode;
  document.querySelectorAll('#clientsViewToggle .view-toggle-btn').forEach(b=>b.classList.toggle('active', b.dataset.mode===mode));
  document.getElementById('clients-grid').style.display = mode==='grid' ? '' : 'none';
  document.getElementById('clients-list').style.display = mode==='list' ? '' : 'none';
}

function renderClients(){
  const filtered = getFilteredClients();
  const totalPages = Math.max(1, Math.ceil(filtered.length/clientsPageSize));
  if(clientsPage>totalPages) clientsPage=totalPages;
  const startIdx=(clientsPage-1)*clientsPageSize;
  const list = filtered.slice(startIdx, startIdx+clientsPageSize);

  document.getElementById('clients-grid').innerHTML = list.map(cl => `
    <div class="entity-card raised" onclick="goToClientClaims('${cl.name.replace(/'/g,"\\'")}')">
      <div class="e-top">
        <div class="avatar raised-sm">${cl.initials}</div>
        <div><div class="e-name">${cl.name}</div><div class="e-sub">${cl.primaryCat}</div></div>
      </div>
      <div class="e-stats"><span>${cl.count} claim${cl.count!==1?'s':''}</span><span class="n">$${cl.total.toLocaleString('en-US')}</span></div>
      <div class="hint-row">View claims &rarr;</div>
    </div>
  `).join('');
  document.getElementById('clients-list-body').innerHTML = list.map(cl => `
    <tr onclick="goToClientClaims('${cl.name.replace(/'/g,"\\'")}')">
      <td><div class="client-cell"><div class="avatar raised-sm">${cl.initials}</div><div class="client-name">${cl.name}</div></div></td>
      <td class="item-meta">${cl.primaryCat}</td>
      <td class="value-cell">${cl.count}</td>
      <td class="value-cell">$${cl.total.toLocaleString('en-US')}</td>
    </tr>
  `).join('');

  const pag = document.getElementById('clientsPagination');
  let pagHtml = `<button class="page-btn" ${clientsPage===1?'disabled':''} onclick="goClientsPage(${clientsPage-1})">Prev</button><div class="page-numbers">`;
  for(let p=1;p<=totalPages;p++){ pagHtml += `<button class="page-btn ${p===clientsPage?'active':''}" onclick="goClientsPage(${p})">${p}</button>`; }
  pagHtml += `</div><button class="page-btn" ${clientsPage===totalPages?'disabled':''} onclick="goClientsPage(${clientsPage+1})">Next</button>`;
  pag.innerHTML = pagHtml;

  const shownFrom = list.length ? startIdx+1 : 0;
  const shownTo = startIdx+list.length;
  document.getElementById('clientsResultsCount').textContent = `Showing ${shownFrom}-${shownTo} of ${filtered.length} clients`;
}

const specialistsFilterState = { category:'all', sort:'active-desc' };
let specialistsViewMode = 'grid';
let specialistsPage = 1;
const specialistsPageSize = 10;

function populateSpecialistsFilterOptions(){
  const panel = document.getElementById('specialistsCategoryDropdownPanel');
  let html = `<div class="dropdown-item selected" data-value="all" onclick="selectSpecialistsFilter('category','all','All categories',this)">${checkSvg()}All categories</div>`;
  categories.forEach(c=>{ html += `<div class="dropdown-item" data-value="${c.name}" onclick="selectSpecialistsFilter('category','${c.name}','${c.name}',this)">${checkSvg()}${c.name}</div>`; });
  panel.innerHTML = html;
}

function getFilteredSpecialists(){
  const q = document.getElementById('specialistsSearchInput').value.trim().toLowerCase();
  let list = categories.map(cat=>({
    category: cat.name,
    initials: cat.spec.initials,
    name: cat.spec.name,
    role: cat.spec.role,
    active: claims.filter(c=>c.category===cat.name && c.stage>0 && c.stage<4).length
  })).filter(s=>{
    if(specialistsFilterState.category!=='all' && s.category!==specialistsFilterState.category) return false;
    if(q && !(s.name.toLowerCase().includes(q) || s.category.toLowerCase().includes(q) || s.role.toLowerCase().includes(q))) return false;
    return true;
  });
  list.sort((a,b)=>{
    if(specialistsFilterState.sort==='active-asc') return a.active-b.active;
    if(specialistsFilterState.sort==='name-asc') return a.name.localeCompare(b.name);
    if(specialistsFilterState.sort==='category-asc') return a.category.localeCompare(b.category);
    return b.active-a.active;
  });
  return list;
}

function selectSpecialistsFilter(kind, value, label, el){
  specialistsFilterState[kind] = value;
  const panel = el.closest('.dropdown-panel');
  panel.querySelectorAll('.dropdown-item').forEach(it=>it.classList.remove('selected'));
  el.classList.add('selected');
  document.getElementById(el.closest('.dropdown').id+'Label').textContent = label;
  el.closest('.dropdown').classList.remove('open');
  specialistsPage = 1;
  renderSpecialists();
}

function goSpecialistsPage(p){
  const filtered = getFilteredSpecialists();
  const totalPages = Math.max(1, Math.ceil(filtered.length/specialistsPageSize));
  if(p<1||p>totalPages) return;
  specialistsPage = p;
  renderSpecialists();
}

function setSpecialistsView(mode){
  specialistsViewMode = mode;
  document.querySelectorAll('#specialistsViewToggle .view-toggle-btn').forEach(b=>b.classList.toggle('active', b.dataset.mode===mode));
  document.getElementById('specialists-grid').style.display = mode==='grid' ? '' : 'none';
  document.getElementById('specialists-list').style.display = mode==='list' ? '' : 'none';
}

function renderSpecialists(){
  const filtered = getFilteredSpecialists();
  const totalPages = Math.max(1, Math.ceil(filtered.length/specialistsPageSize));
  if(specialistsPage>totalPages) specialistsPage=totalPages;
  const startIdx=(specialistsPage-1)*specialistsPageSize;
  const list = filtered.slice(startIdx, startIdx+specialistsPageSize);

  document.getElementById('specialists-grid').innerHTML = list.map(s => `
    <div class="entity-card raised" onclick="goToCategoryClaims('${s.category}')">
      <div class="e-top">
        <div class="avatar raised-sm">${s.initials}</div>
        <div><div class="e-name">${s.name}</div><div class="e-sub">${s.role}</div></div>
      </div>
      <div class="e-stats"><span>${s.category}</span><span class="n">${s.active} active</span></div>
      <div class="hint-row">View category claims &rarr;</div>
    </div>`).join('');
  document.getElementById('specialists-list-body').innerHTML = list.map(s => `
    <tr onclick="goToCategoryClaims('${s.category}')">
      <td><div class="client-cell"><div class="avatar raised-sm">${s.initials}</div><div><div class="client-name">${s.name}</div><div class="item-meta">${s.role}</div></div></div></td>
      <td class="item-meta">${s.category}</td>
      <td class="value-cell">${s.active}</td>
    </tr>`).join('');

  const pag = document.getElementById('specialistsPagination');
  let pagHtml = `<button class="page-btn" ${specialistsPage===1?'disabled':''} onclick="goSpecialistsPage(${specialistsPage-1})">Prev</button><div class="page-numbers">`;
  for(let p=1;p<=totalPages;p++){ pagHtml += `<button class="page-btn ${p===specialistsPage?'active':''}" onclick="goSpecialistsPage(${p})">${p}</button>`; }
  pagHtml += `</div><button class="page-btn" ${specialistsPage===totalPages?'disabled':''} onclick="goSpecialistsPage(${specialistsPage+1})">Next</button>`;
  pag.innerHTML = pagHtml;

  const shownFrom = list.length ? startIdx+1 : 0;
  const shownTo = startIdx+list.length;
  document.getElementById('specialistsResultsCount').textContent = `Showing ${shownFrom}-${shownTo} of ${filtered.length} specialists`;
}

const settlementsFilterState = { category:'all', sort:'date-desc' };
let settlementsPage = 1;
const settlementsPageSize = 10;

function populateSettlementsFilterOptions(){
  const panel = document.getElementById('settlementsCategoryDropdownPanel');
  let html = `<div class="dropdown-item selected" data-value="all" onclick="selectSettlementsFilter('category','all','All categories',this)">${checkSvg()}All categories</div>`;
  categories.forEach(c=>{ html += `<div class="dropdown-item" data-value="${c.name}" onclick="selectSettlementsFilter('category','${c.name}','${c.name}',this)">${checkSvg()}${c.name}</div>`; });
  panel.innerHTML = html;
}

function getFilteredSettlements(){
  const q = document.getElementById('settlementsSearchInput').value.trim().toLowerCase();
  let list = claims.filter(c=>{
    if(c.stage!==4) return false;
    if(settlementsFilterState.category!=='all' && c.category!==settlementsFilterState.category) return false;
    if(q && !(c.client.toLowerCase().includes(q) || c.item.toLowerCase().includes(q))) return false;
    return true;
  });
  list.sort((a,b)=>{
    if(settlementsFilterState.sort==='value-desc') return b.valueNum-a.valueNum;
    if(settlementsFilterState.sort==='value-asc') return a.valueNum-b.valueNum;
    if(settlementsFilterState.sort==='date-asc') return a.dateTs-b.dateTs;
    return b.dateTs-a.dateTs;
  });
  return list;
}

function selectSettlementsFilter(kind, value, label, el){
  settlementsFilterState[kind] = value;
  const panel = el.closest('.dropdown-panel');
  panel.querySelectorAll('.dropdown-item').forEach(it=>it.classList.remove('selected'));
  el.classList.add('selected');
  document.getElementById(el.closest('.dropdown').id+'Label').textContent = label;
  el.closest('.dropdown').classList.remove('open');
  settlementsPage = 1;
  renderSettlements();
}

function goSettlementsPage(p){
  const filtered = getFilteredSettlements();
  const totalPages = Math.max(1, Math.ceil(filtered.length/settlementsPageSize));
  if(p<1||p>totalPages) return;
  settlementsPage = p;
  renderSettlements();
}

function renderSettlements(){
  const filtered = getFilteredSettlements();
  const totalPages = Math.max(1, Math.ceil(filtered.length/settlementsPageSize));
  if(settlementsPage>totalPages) settlementsPage=totalPages;
  const startIdx=(settlementsPage-1)*settlementsPageSize;
  const pageItems = filtered.slice(startIdx, startIdx+settlementsPageSize);

  document.getElementById('settlementsSubtitle').textContent = filtered.length + ' closed claims, most recent first';
  document.getElementById('settlements-body').innerHTML = pageItems.length ? pageItems.map(c => `
    <tr onclick="showDetail(${c.id})">
      <td><div class="client-cell"><div class="avatar raised-sm">${c.initials}</div><div class="client-name">${c.client}</div></div></td>
      <td><div>${c.item}</div><div class="item-meta">${c.category}</div></td>
      <td class="filed-cell">${c.filed}</td>
      <td class="value-cell">${c.value}</td>
      <td><span class="badge muted-status"><span class="badge-dot"></span>Closed</span></td>
    </tr>
  `).join('') : `<tr class="empty-row"><td colspan="5"><div class="empty-state"><div class="e-title">No settlements match your filters</div><div class="e-sub">Try a different search term or reset your filters.</div></div></td></tr>`;

  const pag = document.getElementById('settlementsPagination');
  let pagHtml = `<button class="page-btn" ${settlementsPage===1?'disabled':''} onclick="goSettlementsPage(${settlementsPage-1})">Prev</button><div class="page-numbers">`;
  for(let p=1;p<=totalPages;p++){ pagHtml += `<button class="page-btn ${p===settlementsPage?'active':''}" onclick="goSettlementsPage(${p})">${p}</button>`; }
  pagHtml += `</div><button class="page-btn" ${settlementsPage===totalPages?'disabled':''} onclick="goSettlementsPage(${settlementsPage+1})">Next</button>`;
  pag.innerHTML = pagHtml;

  const shownFrom = pageItems.length ? startIdx+1 : 0;
  const shownTo = startIdx+pageItems.length;
  document.getElementById('settlementsResultsCount').textContent = `Showing ${shownFrom}-${shownTo} of ${filtered.length} settlements`;
}

function showDetail(id){
  const c = claims.find(x => x.id === id);
  activeClaim = c;
  document.getElementById('d-item').textContent = c.item;
  document.getElementById('d-client').textContent = c.client + ' · ' + c.category;
  document.getElementById('d-value').textContent = c.value;
  document.getElementById('d-swatch').style.background = c.swatchColor;
  document.getElementById('d-swatch-tag').textContent = c.category;
  document.getElementById('d-facts').innerHTML = c.facts.map(f => `<div class="fact-row"><span class="k">${f[0]}</span><span class="v">${f[1]}</span></div>`).join('');
  document.getElementById('d-notes').textContent = c.notes;
  document.getElementById('d-spec-avatar').textContent = c.spec.initials;
  document.getElementById('d-spec-name').textContent = c.spec.name;
  document.getElementById('d-spec-role').textContent = c.spec.role;
  document.getElementById('d-spec-note').textContent = c.spec.note;
  renderTracker(c.stage);
  document.querySelectorAll('.view').forEach(v=>v.classList.remove('active'));
  document.getElementById('view-detail').classList.add('active');
  setActiveNav('queue');
  document.querySelector('#view-queue .crumb-current').textContent = c.item.length>28 ? c.item.slice(0,28)+'…' : c.item;
  window.scrollTo(0,0);
}

function showQueue(){
  document.querySelectorAll('.view').forEach(v=>v.classList.remove('active'));
  document.getElementById('view-queue').classList.add('active');
  setActiveNav('queue');
  document.querySelector('#view-queue .crumb-current').textContent = 'Claims queue';
}

function openModal(kind){
  const layer = document.getElementById('modal-layer');
  const title = document.getElementById('modal-title');
  const body = document.getElementById('modal-body');
  const amountLine = document.getElementById('modal-amount-line');
  const amount = document.getElementById('modal-amount');
  const confirmBtn = document.getElementById('modal-confirm');
  if(kind === 'approve'){
    title.textContent = 'Approve settlement?';
    body.textContent = `This confirms settlement for ${activeClaim.client} on the ${activeClaim.item}. This action notifies the relationship manager and cannot be reversed from this screen.`;
    amountLine.style.display = 'flex'; amount.textContent = activeClaim.value;
    confirmBtn.textContent = 'Confirm settlement';
    confirmBtn.onclick = () => finishAction('Settlement confirmed for ' + activeClaim.client);
  } else if(kind === 'info'){
    title.textContent = 'Request more information?';
    body.textContent = `This sends a request back to ${activeClaim.client} and pauses the claim until the requested documents are received.`;
    amountLine.style.display = 'none';
    confirmBtn.textContent = 'Send request';
    confirmBtn.onclick = () => finishAction('Information request sent to ' + activeClaim.client);
  } else {
    title.textContent = 'Deny claim?';
    body.textContent = `This denies the claim for ${activeClaim.client} on the ${activeClaim.item}. The client's relationship manager will be notified before the client.`;
    amountLine.style.display = 'none';
    confirmBtn.textContent = 'Deny claim';
    confirmBtn.onclick = () => finishAction('Claim denied for ' + activeClaim.client);
  }
  layer.classList.add('active');
}

function closeModal(){ document.getElementById('modal-layer').classList.remove('active'); }

function toast(message){
  const t = document.getElementById('toast');
  document.getElementById('toast-text').textContent = message;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3200);
}

function finishAction(message){ closeModal(); showQueue(); toast(message); }

populateFilterOptions();
renderQueue();
populateClientsFilterOptions();
populateSpecialistsFilterOptions();
populateSettlementsFilterOptions();

document.getElementById('clientsSearchInput').addEventListener('input', ()=>{ clientsPage=1; renderClients(); });
document.getElementById('specialistsSearchInput').addEventListener('input', ()=>{ specialistsPage=1; renderSpecialists(); });
document.getElementById('settlementsSearchInput').addEventListener('input', ()=>{ settlementsPage=1; renderSettlements(); });

/* Login screen */
function attemptLogin(){
  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value;
  if(!email || !password){
    toast('Enter your email and password to continue');
    return;
  }
  document.getElementById('login-screen').classList.add('hidden');
  document.getElementById('app-shell').classList.add('active');
}

function togglePasswordVisibility(){
  const input = document.getElementById('loginPassword');
  const btn = document.getElementById('togglePasswordBtn');
  if(input.type === 'password'){
    input.type = 'text';
    btn.setAttribute('aria-label','Hide password');
  } else {
    input.type = 'password';
    btn.setAttribute('aria-label','Show password');
  }
}

let rememberMe = false;
function toggleRemember(){
  rememberMe = !rememberMe;
  document.getElementById('rememberBox').classList.toggle('checked', rememberMe);
}
