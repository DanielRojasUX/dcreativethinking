/* Sunú Home · clickable prototype */
(function(){
const D = window.DATA;
const S = {
  lang: (()=>{try{return localStorage.getItem('ck-lang')||'en'}catch(e){return 'en'}})(),
  name:'', people:3, kids:null,
  restrict:new Set(), allergies:new Set(),
  habits:new Set(), skill:null, time:30,
  equip:new Set(), budget:1800, budgetSet:false,
  stores:new Set(), extraStores:[], tianguis:false,
  shots:0, removed:new Set(), added:[], scanned:false,
  list:D.list.map(i=>i.id), got:new Set(), fromRecipes:[],
  readyTab:'ready', step:0, rating:4, leftovers:true,
  notif:{push:true,email:true,watch:false}, moved:false, checks:new Set()
};
const x = (en,es)=> S.lang==='es'?es:en;
const L = o => o ? (o[S.lang]||o.en) : '';
const $ = (s,el=document)=>el.querySelector(s);
const $$ = (s,el=document)=>[...el.querySelectorAll(s)];
const money = n => '$'+n.toLocaleString('en-US');
const wait = ms => new Promise(r=>setTimeout(r,ms));
const ING = Object.fromEntries(D.ingredients.map(i=>[i.id,i]));
const STORE = Object.fromEntries(D.stores.map(s=>[s.id,s]));

/* ---------- icons ---------- */
const ic = {
  back:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg>',
  close:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>',
  bell:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15z"/><path d="M10 20.5a2 2 0 0 0 4 0"/></svg>',
  check:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
  plus:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>',
  mic:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="9" y="3" width="6" height="12" rx="3"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21"/></svg>',
  send:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M6 11l6-6 6 6"/></svg>',
  arrow:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  star:'<svg class="star" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1l2.2 7.3L22 9.5l-6 4.6 2.3 7.9L12 17.4 5.7 22 8 14.1 2 9.5l7.8-1.2z"/></svg>',
  spark:'<svg class="star" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c.8 6.6 5.4 11.2 12 12-6.6.8-11.2 5.4-12 12-.8-6.6-5.4-11.2-12-12C6.6 11.2 11.2 6.6 12 0z"/></svg>',
  burst:'<svg class="star" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 2v20M2 12h20M4.9 4.9l14.2 14.2M19.1 4.9L4.9 19.1"/></svg>',
  ring:'<svg class="star" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="2.5" fill="currentColor"/></svg>',
  cook:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11h18v2a7 7 0 0 1-7 7h-4a7 7 0 0 1-7-7z"/><path d="M8 7c0-1.5 1-2 1-3.5M12 7c0-1.5 1-2 1-3.5M16 7c0-1.5 1-2 1-3.5"/></svg>',
  fridge:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="5" y="2.5" width="14" height="19" rx="3"/><path d="M5 10h14M8.5 6v1.5M8.5 13v3"/></svg>',
  cart:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 4h2.5l2.2 11h10.6L21 7.5H6.4"/><circle cx="9.5" cy="19.5" r="1.5"/><circle cx="17" cy="19.5" r="1.5"/></svg>',
  me:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="8.5" r="4"/><path d="M4 21c1.2-4 4.3-6 8-6s6.8 2 8 6"/></svg>',
  play:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.5v13l10.5-6.5z"/></svg>',
  pause:'<svg viewBox="0 0 24 24" fill="currentColor"><rect x="6.5" y="5" width="4" height="14" rx="1"/><rect x="13.5" y="5" width="4" height="14" rx="1"/></svg>',
  drag:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" width="22" height="22"><path d="M9 6l-6 6 6 6M15 6l6 6-6 6"/></svg>',
  heart:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.2a4.3 4.3 0 0 1 7.5 2.6C19.5 15.4 12 20 12 20z"/></svg>',
  pin:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s-6.5-6.1-6.5-11a6.5 6.5 0 0 1 13 0c0 4.9-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.3"/></svg>'
};
const CURVE_D = "M1447.8,510.2c-18.5-24.3-40.2-47.4-66.7-63.4l-90.8-54.7c-17-10.2-34.7-26.2-41.3-45-19.7-56.3,79.7-125.1,169.3-106.2,9.1,1.9,20.2,11.5,22.9,18.1,3.3,7.9-.2,21.3-5.6,28.7l-23.3,31.7c-3.5,4.7-2.7,20.7.7,25.4,28.1,38.6,186.9,1.9,246-107.9,22.7-42.2,16.5-95.1-17.2-129.2-134.8-136.1-549.7-25.9-647.1,176.5-29.9,62.1-20.8,129.9,24.4,181.1,26.1,29.6,58.1,51.8,92.5,71.5l67.3,38.5c18.8,10.7,37.1,27.8,46,47.6,10.1,22.5,2.7,49.8-12.8,67.9-62.5,72.8-185.8,64.2-211.3,3.1-8.1-19.3-7-43.9-1.9-64.9,20.3-85.2-31.5-141.9-109.6-169.8-189.8-67.7-411.1-24.3-574.5,90.1-68.2,47.7-134.6,125.7-132.1,210,1.8,59.7,40.6,105.5,98.4,118.5,60.5,13.5,121.2-2.7,173.1-37.7,45.1-30.3,77.8-73.1,105-120.8,35.9-63,77.1-123,148.2-144.6,22.8-6.9,48.5-8.8,69.3,3.6,17.5,10.4,18.3,35.1,10.1,52.4l-25,52.5c-37.3,78.2-16.6,167.3,50.4,222.8,42.1,34.9,92.4,55.5,147.3,65.7,175.2,32.7,348.3,6.8,495.7-180.4,44.4-56.4,54-200.5-7.3-281Z";
const curveSVG = `<svg class="hero__curve" viewBox="0 380 900 700" aria-hidden="true"><path d="${CURVE_D}"/></svg>`;
const logoW = '<img src="assets/brand/Sunu-logo-white.svg" alt="Sunú">';
const logoR = '<img src="assets/brand/Sunu-logo-red.svg" alt="Sunú">';
const byline = (white)=>`<div class="logo-line"><img src="assets/brand/Sunu-logo-slogan-${white?'white':'color'}.svg" alt="Sun\u00fa, cocina con amor" style="height:30px"></div>`;
const lockup = (h,white,ink)=>`<span class="lockup" style="--lh:${h}px"><img src="assets/brand/Sunu-logo-${white?'white':'red'}.svg" alt="Sun\u00fa"><span class="wordmark" style="color:${ink||'currentColor'}">Home</span></span>`;
const top = (left, mid='', right='')=>`<div class="top st">${left||'<span style="width:44px"></span>'}${mid}${right||'<span style="width:44px"></span>'}</div>`;
const backBtn = (close)=>`<button class="icon-btn" data-back aria-label="${x('Back','Atrás')}">${close?ic.close:ic.back}</button>`;
const dots = n => `<div class="steps-dots">${[1,2,3,4,5,6,7].map(i=>`<i class="${i<=n?'on':''}"></i>`).join('')}</div>`;
const ingName = id => ING[id] ? L(ING[id]) : L(D.extra[id]);
const myIngredients = ()=> D.ingredients.filter(i=>!S.removed.has(i.id)).map(i=>i.id).concat(S.added.map(a=>a.id));
const listItems = ()=> D.list.filter(i=>S.list.includes(i.id)).concat(S.fromRecipes);

/* ---------- screens ---------- */
const SC = {};

SC.splash = { theme:'t-violet', full:true,
  render:()=>`<div style="position:absolute;inset:0;overflow:hidden">
    <svg viewBox="0 0 390 844" preserveAspectRatio="xMidYMid slice" style="position:absolute;inset:0;width:100%;height:100%">
      <circle class="sp-c1" cx="330" cy="140" r="170" fill="#FFD447"/><circle cx="350" cy="900" r="170" fill="#FF9BD0" class="sp-c2"/>
      <path class="sp-c3" d="M-40 560 a 230 230 0 0 1 460 0z" fill="#F40046"/></svg>
    <div style="position:absolute;left:24px;right:24px;bottom:120px">
      <img class="st" src="assets/brand/Sunu-logo-white.svg" alt="Sun\u00fa" style="width:270px;display:block">
      <div class="big-light st" style="font-size:30px;color:#fff;margin-top:14px">${x('cook with what you have','cocina con lo que hay')}</div>
      
    </div></div>`,
  mount:async el=>{
    await wait(2200); if(cur()==='splash') go('welcome',{type:'flood',color:'#F3EEE7'});
  }};

SC.welcome = { theme:'t-violet', noTab:true, dark:true,
  render:()=>`<svg viewBox="0 0 390 844" preserveAspectRatio="xMidYMin slice" style="position:absolute;left:0;top:0;width:100%;height:100%;pointer-events:none" aria-hidden="true"><circle cx="350" cy="120" r="150" fill="#FFD447"/><path d="M-70 500 a 250 250 0 0 1 500 0z" fill="#F40046"/></svg>
    <div style="position:relative;display:flex;flex-direction:column;min-height:100%">
    ${top(`<img class="st" src="assets/brand/Sunu-logo-white.svg" alt="Sun\u00fa" style="height:30px;width:auto;display:block">`,'',langToggle())}
    <div class="d st" style="font-size:72px;margin-top:206px">${x('What\u2019s for<br>dinner?','\u00bfQu\u00e9 hay de<br>comer?')}</div>
    <p class="st" style="font-size:16px;line-height:1.5;margin:14px 0 0;color:#fff">${x('Snap your fridge and pantry. See what you can cook, keep it organized and shop smarter.','Toma foto a tu refri y alacena. Ve qu\u00e9 puedes cocinar, mant\u00e9n todo en orden y compra mejor.')}</p>
    <div class="grow"></div>
    <div class="stack" style="margin-top:28px">
      <button class="btn st" style="background:#000;color:#fff" data-go="ob1"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.4 12.6c0-2.6 2.1-3.8 2.2-3.9-1.2-1.8-3.1-2-3.7-2-1.6-.2-3.1.9-3.9.9-.8 0-2-.9-3.4-.9-1.7 0-3.3 1-4.2 2.6-1.8 3.1-.5 7.7 1.3 10.2.9 1.2 1.9 2.6 3.2 2.6 1.3-.1 1.8-.8 3.3-.8 1.6 0 2 .8 3.4.8 1.4 0 2.3-1.3 3.1-2.5 1-1.4 1.4-2.8 1.4-2.9 0 0-2.7-1-2.7-4.1zM13.9 4.9c.7-.9 1.2-2 1-3.2-1 .1-2.3.7-3 1.6-.7.8-1.3 2-1.1 3.1 1.2.1 2.3-.6 3.1-1.5z"/></svg>${x('Continue with Apple','Continuar con Apple')}</button>
      <button class="btn st" style="background:#fff;color:var(--ink)" data-go="ob1"><svg viewBox="0 0 24 24"><path fill="#4285F4" d="M22.5 12.3c0-.8-.1-1.5-.2-2.2H12v4.2h5.9a5 5 0 0 1-2.2 3.3v2.7h3.5c2.1-1.9 3.3-4.7 3.3-8z"/><path fill="#34A853" d="M12 23c3 0 5.5-1 7.3-2.7l-3.5-2.7c-1 .7-2.3 1.1-3.8 1.1-2.9 0-5.4-2-6.3-4.7H2.1v2.8A11 11 0 0 0 12 23z"/><path fill="#FBBC05" d="M5.7 14c-.2-.7-.4-1.4-.4-2s.1-1.4.4-2V7.1H2.1a11 11 0 0 0 0 9.8z"/><path fill="#EA4335" d="M12 5.4c1.6 0 3.1.6 4.3 1.7l3.1-3.1A11 11 0 0 0 2.1 7.1L5.7 10C6.6 7.3 9.1 5.4 12 5.4z"/></svg>${x('Continue with Google','Continuar con Google')}</button>
      <button class="btn ghost st" data-go="ob1">${x('Continue with email','Continuar con correo')}</button>
    </div>
    <p class="small st" style="text-align:center;margin:16px 0 4px;color:#DCD5FF">${x('By continuing you agree to the Terms and Privacy Policy.','Al continuar aceptas los T\u00e9rminos y el Aviso de privacidad.')}</p>
    <div class="st" style="display:flex;justify-content:center;margin-top:8px;color:#fff">${byline(true)}</div>
    </div>`,
  mount:el=>bindLang(el)};

function langToggle(){return `<div class="lang st" data-lang>${['en','es'].map(l=>`<button data-l="${l}" class="${S.lang===l?'on':''}">${l.toUpperCase()}</button>`).join('')}</div>`}
function bindLang(el){ $$('[data-l]',el).forEach(b=>b.onclick=()=>{ if(S.lang===b.dataset.l)return; S.lang=b.dataset.l; try{localStorage.setItem('ck-lang',S.lang)}catch(e){} rerender(); }); }

/* onboarding */
const obShell = (n, title, lead, body, next, extra='')=>`${top('', dots(n), `<span class="small st" style="width:44px;text-align:right">${n}/7</span>`)}
  <div class="d d-m st" style="margin-bottom:10px">${title}</div><p class="lead st" style="margin-bottom:22px">${lead}</p>${body}
  <div class="dock"><button class="btn st" id="obNext" data-go="${next}">${x('Continue','Continuar')} ${ic.arrow}</button>${extra}<div class="st" style="display:flex;justify-content:center">${byline(false)}</div></div>`;

SC.ob1 = { theme:'t-cream', noTab:true,
  render:()=>obShell(1, x('Who’s at<br>the table?','¿Quiénes<br>comen en casa?'), x('We’ll size every recipe and every list for your home.','Ajustamos cada receta y cada lista a tu casa.'),
   `<input class="input st" id="nm" placeholder="${x('Your first name','Tu nombre')}" value="${S.name}" autocomplete="given-name">
    <div class="dial st" id="dPeople"></div>
    <div class="label st" style="margin:4px 0 10px">${x('Kids at home','Niños en casa')}</div>
    <div class="pills st" id="kids">${[0,1,2,3].map(k=>`<button class="pill ${S.kids===k?'on':''}" data-k="${k}">${k===3?'3+':k}</button>`).join('')}</div>`, 'ob2'),
  mount:el=>{
    const chk=()=>gate(el,S.name.length>1&&S.kids!==null,!S.name?x('Add your name to continue','Escribe tu nombre para continuar'):x('Choose kids at home','Elige ni\u00f1os en casa'));
    $('#nm',el).oninput=e=>{S.name=e.target.value.trim();chk()};
    makeDial($('#dPeople',el),[1,2,3,4,5,6,7,8],S.people-1,v=>S.people=v,v=>x(v===1?'person':'people',v===1?'persona':'personas'));
    $$('[data-k]',el).forEach(b=>b.onclick=()=>{S.kids=+b.dataset.k;$$('[data-k]',el).forEach(o=>o.classList.toggle('on',o===b));pop(b);chk()});chk();
  }};

function gate(el,ok,need){const b=$('#obNext',el);if(!b)return;if(ok){b.removeAttribute('disabled');b.innerHTML=x('Continue','Continuar')+' '+ic.arrow}else{b.setAttribute('disabled','');b.textContent=need}}
const TILE_C = ['#5B3DF5','#F40046','#0F9D8F','#FF6B2C','#FF9BD0','#FFD447','#D8F25A','#1C1830'];
const TILE_F = ['#fff','#fff','#fff','#fff','#7B0E4B','#5A3F00','#2E4500','#fff'];
function tiles(items, set, key, one){
  return `<div class="tiles ${one?'one':''} st" data-set="${key}">${items.map((t,i)=>`<button class="tile ${set.has(t[0])?'on':''}" data-v="${t[0]}" style="--tc:${TILE_C[i%8]};--tfg:${TILE_F[i%8]}">
    <span class="grow"><span class="tile__name" style="display:block">${t[1]}</span>${t[2]?`<span class="tile__desc" style="display:block">${t[2]}</span>`:''}</span><span class="tile__check">${ic.check}</span></button>`).join('')}</div>`;
}
function bindTiles(el, sets, single, after){
  $$('[data-set]',el).forEach(g=>{const set=sets[g.dataset.set];
    $$('.tile',g).forEach(t=>t.onclick=()=>{const v=t.dataset.v;
      if(single&&single[g.dataset.set]){ single[g.dataset.set](v); $$('.tile',g).forEach(o=>o.classList.toggle('on',o===t)); pop(t); after&&after(); return; }
      if(v==='none'){set.clear();set.add('none')}else{set.delete('none');set.has(v)?set.delete(v):set.add(v)}
      $$('.tile',g).forEach(o=>o.classList.toggle('on',set.has(o.dataset.v))); pop(t); after&&after();});});
}

SC.ob2 = { theme:'t-cream', noTab:true,
  render:()=>obShell(2, x('Anything you<br>don’t eat?','¿Algo que<br>no comen?'), x('Pick all that apply. Recipes and swaps will always respect them.','Elige todo lo que aplique. Las recetas y sustituciones siempre lo respetan.'),
   tiles([['veg',x('Vegetarian','Vegetariano')],['vegan',x('Vegan','Vegano')],['gluten',x('Gluten free','Sin gluten')],['lactose',x('Lactose free','Sin lactosa')],['nopork',x('No pork','Sin cerdo')],['sodium',x('Low sodium','Bajo en sodio')],['sugar',x('Low sugar','Bajo en azúcar')],['seafood',x('No seafood','Sin mariscos')],['none',x('None of these','Ninguna')]],S.restrict,'restrict')
   +`<div class="label st" style="margin:24px 0 10px">${x('Allergies','Alergias')}</div>
   <div class="pills st" id="alg">${[['peanuts',x('Peanuts','Cacahuate')],['shellfish',x('Shellfish','Mariscos')],['eggs',x('Eggs','Huevo')],['soy',x('Soy','Soya')],['nuts',x('Tree nuts','Nueces')],['sesame',x('Sesame','Ajonjolí')]].map(a=>`<button class="pill ${S.allergies.has(a[0])?'on':''}" data-a="${a[0]}">${a[1]}</button>`).join('')}</div>`,'ob3'),
  mount:el=>{const chk=()=>gate(el,S.restrict.size>0,x('Pick one, or None of these','Elige una, o Ninguna'));bindTiles(el,{restrict:S.restrict},null,chk);chk();$$('[data-a]',el).forEach(b=>b.onclick=()=>{const v=b.dataset.a;S.allergies.has(v)?S.allergies.delete(v):S.allergies.add(v);b.classList.toggle('on')})}};

SC.ob3 = { theme:'t-cream', noTab:true,
  render:()=>obShell(3, x('How does your<br>home eat?','¿Cómo comen<br>en tu casa?'), x('Choose as many as feel like a normal week.','Elige todas las que se parezcan a una semana normal.'),
   tiles([['daily',x('We cook every day','Cocinamos diario'),x('Lunch and dinner at home','Comida y cena en casa')],['prep',x('Meal prep on weekends','Preparamos el fin de semana'),x('Cook once, eat for days','Cocinar una vez, comer varios días')],['lunch',x('We pack lunch boxes','Hacemos lunch boxes'),x('School or work, every weekday','Escuela o trabajo, entre semana')],['guests',x('We often cook for guests','Seguido cocinamos para visitas'),x('Family Sundays, friends over','Domingos familiares, amigos')],['out',x('We mostly eat out','Casi siempre comemos fuera'),x('Help us cook a bit more','Ayúdanos a cocinar un poco más')]],S.habits,'habits',true),'ob4'),
  mount:el=>{const chk=()=>gate(el,S.habits.size>0,x('Pick at least one','Elige al menos una'));bindTiles(el,{habits:S.habits},null,chk);chk()}};

SC.ob4 = { theme:'t-cream', noTab:true,
  render:()=>obShell(4, x('Skill and<br>time','Experiencia<br>y tiempo'), x('No judgment. This just tunes how hard and how long recipes get.','Sin juicios. Solo ajusta qué tan difíciles y largas son las recetas.'),
   tiles([['new',x('Just starting','Apenas empiezo'),x('Keep it simple','Algo sencillo')],['ok',x('Comfortable','Me defiendo'),x('I know my way around','Ya le sé')],['pro',x('I love cooking','Me encanta cocinar'),x('Challenge me','Retáme')]],new Set(S.skill?[S.skill]:[]),'skill',true)
   +`<div class="label st" style="margin:26px 0 0">${x('Time on a weekday','Tiempo entre semana')}</div><div class="dial st" id="dTime"></div>`,'ob5'),
  mount:el=>{const chk=()=>gate(el,!!S.skill,x('Choose your skill level','Elige tu nivel'));bindTiles(el,{skill:new Set()},{skill:v=>S.skill=v},chk);chk();makeDial($('#dTime',el),[15,20,30,45,60,90],[15,20,30,45,60,90].indexOf(S.time),v=>S.time=v,()=>x('minutes','minutos'))}};

SC.ob5 = { theme:'t-cream', noTab:true,
  render:()=>obShell(5, x('What’s in<br>your kitchen?','¿Qué hay en<br>tu cocina?'), x('We only suggest recipes you can actually make.','Solo sugerimos recetas que sí puedes hacer.'),
   tiles([['stove',x('Stove','Estufa')],['oven',x('Oven','Horno')],['comal','Comal'],['microwave',x('Microwave','Microondas')],['airfryer',x('Air fryer','Freidora de aire')],['blender',x('Blender','Licuadora')],['pressure',x('Pressure cooker','Olla exprés')],['slow',x('Slow cooker','Olla de cocción lenta')]],S.equip,'equip'),'ob6'),
  mount:el=>{const chk=()=>gate(el,S.equip.size>0,x('Pick at least one','Elige al menos uno'));bindTiles(el,{equip:S.equip},null,chk);chk()}};

SC.ob6 = { theme:'t-yellow', noTab:true,
  render:()=>obShell(6, x('Weekly food<br>budget','Presupuesto<br>semanal'), x('We use it to pick stores and flag when a recipe gets pricey.','Lo usamos para elegir tiendas y avisarte si una receta sale cara.'),
   `<div class="st" style="margin:18px 0 8px"><span class="d" id="bud" style="font-size:120px">${money(S.budget)}</span><span class="label" style="margin-left:6px">MXN</span></div>
    <input type="range" class="range st" id="rb" min="500" max="5000" step="100" value="${S.budget}">
    <div class="row between small st" style="margin-top:10px"><span>$500</span><span>$5,000</span></div>
    <div class="card c-cream st" style="margin-top:26px"><div class="small" id="budNote"></div></div>`,'ob7'),
  mount:el=>{const upd=()=>{$('#bud',el).textContent=money(S.budget);$('#budNote',el).innerHTML=x(`About <b>${money(Math.round(S.budget/7/S.people))}</b> per person per day for ${S.people} people.`,`Cerca de <b>${money(Math.round(S.budget/7/S.people))}</b> por persona al día para ${S.people} personas.`)};
    const chk=()=>gate(el,S.budgetSet,x('Slide to set your budget','Desliza para fijar tu presupuesto'));
    upd();chk();$('#rb',el).oninput=e=>{S.budget=+e.target.value;S.budgetSet=true;upd();chk()}}};

SC.ob7 = { theme:'t-cream', noTab:true,
  render:()=>obShell(7, x('Where do<br>you shop?','¿Dónde<br>compras?'), x('Near you in Aguascalientes. Add the places without prices online too, like a tianguis or your tiendita.','Cerca de ti en Aguascalientes. Agrega también lugares sin precios en línea, como un tianguis o tu tiendita.'),
   `<div class="stack st">${D.stores.map(s=>storeToggle(s)).join('')}${S.extraStores.map(n=>storeToggle({id:'x-'+n,name:n,branch:x('Added by you','Agregado por ti'),mark:n[0],sc:'#D8F25A',sf:'#2E4500'},true)).join('')}</div>
    <div class="row st" style="margin-top:12px"><input class="input" id="addStore" placeholder="${x('Tianguis, tiendita, market...','Tianguis, tiendita, mercado...')}"><button class="round" id="addStoreBtn" aria-label="${x('Add','Agregar')}">${ic.plus}</button></div>`,'ob8'),
  mount:el=>{
    gate(el,S.stores.size>0,x('Pick at least one place','Elige al menos un lugar'));
    $$('.store[data-s]',el).forEach(b=>b.onclick=()=>{const v=b.dataset.s;S.stores.has(v)?S.stores.delete(v):S.stores.add(v);rerender()});
    const add=()=>{const v=$('#addStore',el).value.trim();if(!v)return;S.extraStores.push(v);S.stores.add('x-'+v);rerender()};
    $('#addStoreBtn',el).onclick=add;$('#addStore',el).onkeydown=e=>{if(e.key==='Enter')add()};
  }};
function storeToggle(s){const on=S.stores.has(s.id);return `<button class="store" data-s="${s.id}" style="--sc:${s.sc};--sf:${s.sf}"><span class="store__mark">${s.mark}</span><span class="grow"><span class="store__name" style="display:block">${s.name}</span><span class="small">${s.branch}${s.km?' · '+s.km+' km':''}</span></span><span class="tile__check" style="${on?'opacity:1;background:var(--ink);color:#fff':''}">${on?ic.check.replace('<svg','<svg style="opacity:1;width:14px;height:14px"'):''}</span></button>`}

SC.ob8 = { theme:'t-violet', noTab:true,
  render:()=>`<svg viewBox="0 380 900 700" style="position:absolute;right:-170px;top:-40px;width:560px;pointer-events:none" aria-hidden="true"><path d="${CURVE_D}" fill="#7E66FF"/></svg><div style="position:relative">${top('',dots(7),'')}
    <div class="label st" style="color:var(--fg2)">${x('Your kitchen profile','Tu perfil de cocina')}</div>
    <div class="d d-l st" style="margin:8px 0 6px">${S.name?x('Ready, ','Listo, ')+S.name+'.':x('You’re set.','Todo listo.')}</div>
    <div class="bignums">
      ${[[S.people,x('people at home','personas en casa')],[S.time,x('minutes on weekdays','minutos entre semana')],[money(S.budget),x('a week for food','a la semana en comida')]].map(n=>`<div class="bignum st"><span class="d">${n[0]}</span><span class="lbl">${n[1]}</span></div>`).join('')}
    </div>
    <div class="pills st" style="margin-bottom:22px">${[...S.restrict].filter(r=>r!=='none').map(r=>`<span class="pill">${restrictName(r)}</span>`).join('')}${[...S.allergies].map(r=>`<span class="pill">${x('No','Sin')} ${allergyName(r)}</span>`).join('')}</div>
    <div class="card st" style="background:rgba(255,255,255,.12);color:#fff">
      <div style="font-weight:500;font-size:17px;margin-bottom:4px">${x('Know before you run out','Entérate antes de que se acabe')}</div>
      <p class="small" style="color:var(--fg2);margin-bottom:6px">${x('We’ll remind you on your phone, by email or on your watch.','Te avisamos en tu teléfono, por correo o en tu reloj.')}</p>
      ${notifRows(true)}
    </div>
    <div class="st" style="display:flex;justify-content:center;margin-top:26px"><img src="assets/brand/Sunu-logo-slogan-white.svg" alt="Sun\u00fa, cocina con amor" style="height:46px"></div>
    <div class="dock"><button class="btn st" style="background:#fff;color:var(--violet)" data-go="home" data-tr="flood" data-root>${x('Start cooking','Empezar a cocinar')} ${ic.arrow}</button></div></div>`,
  mount:el=>bindNotif(el)};
function restrictName(r){return ({veg:x('Vegetarian','Vegetariano'),vegan:x('Vegan','Vegano'),gluten:x('Gluten free','Sin gluten'),lactose:x('Lactose free','Sin lactosa'),nopork:x('No pork','Sin cerdo'),sodium:x('Low sodium','Bajo en sodio'),sugar:x('Low sugar','Bajo en azúcar'),seafood:x('No seafood','Sin mariscos')})[r]}
function allergyName(r){return ({peanuts:x('peanuts','cacahuate'),shellfish:x('shellfish','mariscos'),eggs:x('eggs','huevo'),soy:x('soy','soya'),nuts:x('tree nuts','nueces'),sesame:x('sesame','ajonjolí')})[r]}
function notifRows(onDark){const st=onDark?'border-color:rgba(255,255,255,.2)':'';return [['push',x('Push notifications','Notificaciones'),x('Running low, deals, tianguis day','Lo que se acaba, ofertas, día de tianguis')],['email',x('Weekly email','Correo semanal'),x('Your week in food, every Sunday','Tu semana de comida, cada domingo')],['watch',x('Apple Watch','Apple Watch'),x('Timers and your list on your wrist','Temporizadores y tu lista en la muñeca')]].map(r=>`<button class="set-row" data-n="${r[0]}" style="${st}"><span class="grow"><b>${r[1]}</b><span class="small" style="${onDark?'color:var(--fg2)':''}">${r[2]}</span></span><span class="tgl ${S.notif[r[0]]?'on':''}"></span></button>`).join('')}
function bindNotif(el){$$('[data-n]',el).forEach(b=>b.onclick=()=>{const k=b.dataset.n;S.notif[k]=!S.notif[k];$('.tgl',b).classList.toggle('on',S.notif[k]);toast(S.notif[k]?x('On','Activado'):x('Off','Desactivado'))})}

/* home */
SC.home = { theme:'t-cream', tab:'cook',
  render:()=>{const h=new Date().getHours();const greet=h<12?x('Good morning','Buenos días'):h<19?x('Good afternoon','Buenas tardes'):x('Good evening','Buenas noches');
   return `${top(`<div class="st greet"><img src="assets/brand/Sunu-logo-red.svg" alt="Sun\u00fa"><span class="greet__bar" aria-hidden="true"></span><span>${greet}${S.name?', '+S.name:''}</span></div>`,'',`<button class="icon-btn st" data-go="alerts" aria-label="${x('Running low','Por acabarse')}">${ic.bell}<span class="badge">4</span></button>`)}
    <div class="hero st">${curveSVG}
      <div><span class="pill" style="color:#fff">${x('tonight','hoy')}</span></div>
      <div><div class="big-light" style="font-size:42px;margin-bottom:18px">${x('what can I make with what I have?','¿qué hago con lo que tengo?')}</div>
      <button class="btn" style="background:#fff;color:var(--red)" data-go="camera" data-tr="flood" data-color="#0E0C14">${x('Scan my kitchen','Escanear mi cocina')} ${ic.arrow}</button></div>
    </div>
    <div class="sec-title st"><span class="label">${x('Your kitchen today','Tu cocina hoy')}</span><span class="small">${S.scanned?x('Scanned just now','Escaneado ahorita'):x('Last scan Tuesday','Último escaneo el martes')}</span></div>
    <div class="tabstack">
      <button class="tabcard card c-violet st" data-go="recipes" data-tr="open"><div class="tabcard__head"><span class="pill">${x('cook','cocina')}</span>${ic.star}</div><div><div class="tabcard__label">${x('6 recipes ready','6 recetas listas')}</div><div class="tabcard__meta">${x('4 with nothing to buy','4 sin comprar nada')}</div></div></button>
      <button class="tabcard card c-yellow st" data-go="alerts" data-tr="open"><div class="tabcard__head"><span class="pill">${x('use soon','úsalo pronto')}</span>${ic.burst}</div><div><div class="tabcard__label">${x('cilantro, crema, tomatoes','cilantro, crema, jitomates')}</div><div class="tabcard__meta">${x('Chilaquiles use all three','Los chilaquiles usan los tres')}</div></div></button>
      <button class="tabcard card c-pink st" data-tab="shop"><div class="tabcard__head"><span class="pill">${x('shop','compra')}</span>${ic.spark}</div><div><div class="tabcard__label">${listItems().length} ${x('on your list','en tu lista')}</div><div class="tabcard__meta">${x('Best mix saves $41','La mejor combinación ahorra $41')}</div></div></button>
      <button class="tabcard card c-teal st" data-tab="kitchen"><div class="tabcard__head"><span class="pill">${x('organize','acomoda')}</span>${ic.ring}</div><div><div class="tabcard__label">${S.moved?'100%':'72%'} ${x('organized','acomodado')}</div><div class="tabcard__meta">${S.moved?x('Your fridge is in great shape','Tu refri está en orden'):x('3 moves to a fresher fridge','3 cambios para un refri más fresco')}</div></div></button>
    </div>
    ${sunuCard()}`}};
function sunuCard(){return `<div class="card c-red st" style="margin-top:14px;display:flex;flex-direction:column;gap:14px">
  <div class="row between"><span class="pill">${x('no time tonight?','¿sin tiempo hoy?')}</span><span style="height:22px;display:block">${logoW.replace('<img','<img style="height:22px"')}</span></div>
  <div class="mid-light">${x('Let Sunú cook. A pasta tray for 4 with salad and garlic bread.','Deja que Sunú cocine. Charola de pasta para 4 con ensalada y pan de ajo.')}</div>
  <a class="btn" style="background:#fff;color:var(--red);text-decoration:none" href="https://wa.me/14355220613" target="_blank" rel="noopener">${x('Order on WhatsApp','Pedir por WhatsApp')} ${ic.arrow}</a></div>`}

/* camera */
SC.camera = { theme:'t-ink', full:true, noTab:true, dark:true,
  render:()=>`<div class="cam"><div class="cam__top"><button class="icon-btn" data-back style="color:#fff">${ic.close}</button>
    <div class="seg" id="seg"><span class="seg__blob"></span>${['fridge','pantry','both'].map(k=>`<button data-m="${k}" class="${k==='fridge'?'on':''}">${({fridge:x('Fridge','Refri'),pantry:x('Pantry','Alacena'),both:x('Both','Ambos')})[k]}</button>`).join('')}</div><span style="width:44px"></span></div>
    <div class="cam__view" id="cv">${scene('before')}<div class="cam__corners"><i></i><i></i><i></i><i></i></div><div class="flash" id="fl"></div>
      <div style="position:absolute;left:0;right:0;bottom:16px;text-align:center"><span class="pill" id="hint" style="color:#fff;background:rgba(0,0,0,.35);border-color:transparent">${x('Open the door and fit every shelf','Abre la puerta y que se vean todas las repisas')}</span></div></div>
    <div class="cam__bar"><div class="thumbs" id="th"><b style="opacity:0"></b></div>
      <button class="shutter" id="shut" aria-label="${x('Take photo','Tomar foto')}"><i></i></button>
      <button class="pill" id="done" style="color:#fff;opacity:.35;pointer-events:none">${x('Done','Listo')}</button></div></div>`,
  mount:el=>{S.shots=0;let mode='fridge';
    const seg=$('#seg',el);const setMode=m=>{mode=m;$$('button',seg).forEach(b=>b.classList.toggle('on',b.dataset.m===m));moveBlob(seg,$(`[data-m="${m}"]`,seg));
      const sv=$('svg.scene',el);const n=document.createElement('div');n.innerHTML=scene(m==='pantry'?'pantry':'before');sv.replaceWith(n.firstChild);
      $('#hint',el).textContent=m==='pantry'?x('Step back to fit the whole pantry','Aléjate para que se vea toda la alacena'):x('Open the door and fit every shelf','Abre la puerta y que se vean todas las repisas')};
    requestAnimationFrame(()=>moveBlob(seg,$('.on',seg),true));
    $$('button',seg).forEach(b=>b.onclick=()=>setMode(b.dataset.m));
    $('#shut',el).onclick=()=>{S.shots++;const f=$('#fl',el);f.animate([{opacity:.9},{opacity:0}],{duration:420,easing:'ease-out'});
      const th=$('#th',el);th.innerHTML=`<b></b><span>${S.shots}</span>`;$('b',th).animate([{transform:'scale(.4) translateY(-200px)',opacity:0},{transform:'scale(1)',opacity:1}],{duration:520,easing:'cubic-bezier(.34,1.56,.64,1)'});
      const d=$('#done',el);d.style.opacity=1;d.style.pointerEvents='auto';d.classList.add('on');d.style.color='';
      if(S.shots===1&&mode==='fridge'){setTimeout(()=>{setMode('pantry');toast(x('Now the pantry','Ahora la alacena'))},700)}};
    $('#done',el).onclick=()=>go('analyzing',{type:'fade'});
  }};
function moveBlob(seg,btn,instant){const b=$('.seg__blob',seg);if(!btn||!b)return;if(instant)b.style.transition='none';b.style.left=btn.offsetLeft+'px';b.style.width=btn.offsetWidth+'px';if(instant){b.offsetWidth;b.style.transition=''}}

SC.analyzing = { theme:'t-ink', full:true, noTab:true, dark:true,
  render:()=>`<div class="cam"><div class="cam__top"><span style="width:44px"></span><span class="label" style="color:#D8F25A">${x('Reading your kitchen','Leyendo tu cocina')}</span><span style="width:44px"></span></div>
    <div class="cam__view">${svgWrap(scene('before').replace(/^<svg[^>]*>|<\/svg>$/g,''),detections(S.lang))}<div class="scanline" id="sl"></div></div>
    <div class="cam__bar" style="flex-direction:column;align-items:flex-start;gap:6px;min-height:150px"><div class="d" style="font-size:54px" id="cnt">0</div><div class="small" style="color:#B7B1C9" id="stat">${x('Finding ingredients','Buscando ingredientes')}</div></div></div>`,
  mount:async el=>{
    $('#sl',el).animate([{top:'-90px'},{top:'100%'}],{duration:1500,iterations:Infinity,easing:'cubic-bezier(.45,0,.55,1)'});
    requestAnimationFrame(()=>$$('.det-g',el).forEach(g=>g.style.opacity=1));
    const msgs=[x('Finding ingredients','Buscando ingredientes'),x('Checking freshness','Revisando frescura'),x('Matching your profile','Cruzando con tu perfil'),x('Building recipes','Armando recetas')];
    for(let i=1;i<=14;i++){await wait(200);if(!el.isConnected)return;$('#cnt',el).textContent=i;if(i%4===0)$('#stat',el).textContent=msgs[Math.min(3,i/4)]}
    await wait(600);if(!el.isConnected)return;S.scanned=true;go('result',{type:'flood',color:'#F40046',replace:true});
  }};

SC.result = { theme:'t-red', noTab:true, dark:true,
  render:()=>`${top(`<button class="icon-btn" data-go="home" data-root data-tr="slideback">${ic.close}</button>`,`<span class="label">${x('Scan complete','Escaneo listo')}</span>`)}
    <div class="bignums">${[[myIngredients().length,x('ingredients found','ingredientes encontrados')],[6,x('recipes you can make','recetas que puedes hacer')],[3,x('to use soon','por usar pronto')]].map(n=>`<div class="bignum st"><span class="d">${n[0]}</span><span class="lbl">${n[1]}</span></div>`).join('')}</div>
    <div class="card st"><div class="label" style="color:var(--red-deep);margin-bottom:12px">${x('Use these first','Usa esto primero')}</div>
      <div class="chips">${D.ingredients.filter(i=>i.soon).map(i=>`<span class="chip soon"><span class="dot" style="--dc:${i.c==='#FFFFFF'?'#E2DBD0':i.c}"></span>${L(i)}<span class="small" style="color:inherit;opacity:.7;padding-right:8px">${L(i.qty)}</span></span>`).join('')}</div></div>
    <div class="dock"><button class="btn st" style="background:#fff;color:var(--red)" data-go="confirm">${x('Review ingredients','Revisar ingredientes')} ${ic.arrow}</button>
    <button class="btn ghost st" data-go="ask">${x('Skip to recipes','Ir a recetas')}</button></div>`};

SC.confirm = { theme:'t-cream', noTab:true,
  render:()=>`${top(backBtn(),`<span class="label">${myIngredients().length} ${x('found','encontrados')}</span>`)}
    <div class="d d-m st" style="margin-bottom:10px">${x('Did we get<br>it right?','¿Lo vimos<br>bien?')}</div>
    <p class="lead st" style="margin-bottom:22px">${x('Remove anything we got wrong, or add what the camera couldn’t see.','Quita lo que vimos mal o agrega lo que la cámara no alcanzó a ver.')}</p>
    <div class="label st" style="margin-bottom:10px">${x('Use soon','Úsalo pronto')}</div>
    <div class="chips st" style="margin-bottom:24px">${D.ingredients.filter(i=>i.soon&&!S.removed.has(i.id)).map(chip).join('')}</div>
    <div class="label st" style="margin-bottom:10px">${x('Everything else','Todo lo demás')}</div>
    <div class="chips st" id="rest">${D.ingredients.filter(i=>!i.soon&&!S.removed.has(i.id)).map(chip).join('')}${S.added.map(a=>chip(a)).join('')}<button class="chip add" id="addI">${ic.plus.replace('<svg','<svg width="14" height="14"')} ${x('Add','Agregar')}</button></div>
    <div class="dock"><button class="btn st" data-go="ask">${x('Looks good','Todo bien')} ${ic.arrow}</button></div>`,
  mount:el=>{
    $$('.chip .x',el).forEach(b=>b.onclick=()=>{const c=b.closest('.chip');const id=c.dataset.id;
      c.animate([{transform:'scale(1)',opacity:1},{transform:'scale(.6)',opacity:0}],{duration:280,easing:'ease-in'}).onfinish=()=>{S.removed.add(id);S.added=S.added.filter(a=>a.id!==id);c.remove();$('.top .label',el).textContent=myIngredients().length+' '+x('found','encontrados')};
      toast(x('Removed','Quitado'))});
    $('#addI',el).onclick=e=>{const b=e.currentTarget;const inp=document.createElement('input');inp.className='chip-input';inp.placeholder=x('e.g. carrots','ej. zanahorias');b.replaceWith(inp);inp.focus();
      const commit=()=>{const v=inp.value.trim();if(v){S.added.push({id:'u-'+Date.now(),en:v,es:v,c:'#5B3DF5'})}rerender()};
      inp.onkeydown=k=>{if(k.key==='Enter')commit()};inp.onblur=commit};
  }};
function chip(i){return `<span class="chip ${i.soon?'soon':''}" data-id="${i.id}"><span class="dot" style="--dc:${(i.c==='#FFFFFF'||i.c==='#F3EEE7')?'#E2DBD0':i.c}"></span>${L(i)}<button class="x" aria-label="${x('Remove','Quitar')}">${ic.close}</button></span>`}

SC.ask = { theme:'t-violet', noTab:true, dark:true,
  render:()=>`${top(backBtn(),`<span class="label">${x('Ask Sun\u00fa','Pregunta a Sun\u00fa')}</span>`)}
    <div class="d d-l st" style="margin-bottom:22px">${x('What can<br>I make?','¿Qué<br>preparo?')}</div>
    <div class="prompt st"><textarea id="q" rows="3">${x('Something quick for 3 tonight, and use the cilantro before it goes bad.','Algo rápido para 3 hoy en la noche, y que use el cilantro antes de que se eche a perder.')}</textarea>
      <button class="round red" id="mic" aria-label="${x('Speak','Hablar')}">${ic.mic}</button></div>
    <div class="label st" style="margin:24px 0 10px;color:var(--fg2)">${x('Shape it','Ajústalo')}</div>
    <div class="pills st" id="flt">${[[x('Under 30 min','Menos de 30 min'),1],[x('Use soon first','Primero lo que se acaba'),1],[x('Kid friendly','Para niños'),0],[x('One pot','Una sola olla'),0],[x('No oven','Sin horno'),0],[x('Leftovers for lunch','Sobras para lunch'),0]].map(f=>`<button class="pill ${f[1]?'on':''}">${f[0]}</button>`).join('')}</div>
    <div class="card st" style="margin-top:24px;background:rgba(255,255,255,.12);color:#fff"><div class="small" style="color:var(--fg2)">${x('Using','Usando')} ${myIngredients().length} ${x('ingredients','ingredientes')} · ${[...S.restrict].filter(r=>r!=='none').map(restrictName).join(', ')||x('no restrictions','sin restricciones')} · ${S.people} ${x('people','personas')}</div></div>
    <div class="dock"><button class="btn st" style="background:#fff;color:var(--violet)" data-go="recipes" data-loading="1">${x('Show me recipes','Muéstrame recetas')} ${ic.send}</button></div>`,
  mount:el=>{$$('#flt .pill',el).forEach(p=>p.onclick=()=>{p.classList.toggle('on');pop(p)});
    $('#mic',el).onclick=e=>{const b=e.currentTarget;if(b.dataset.on){b.dataset.on='';b.innerHTML=ic.mic;return}b.dataset.on=1;b.innerHTML='<span class="bars"><i></i><i></i><i></i><i></i><i></i></span>';
      const q=$('#q',el);const txt=x('Something quick for 3 tonight. No pork, and use the cilantro first.','Algo rápido para 3 hoy. Sin cerdo, y que use primero el cilantro.');q.value='';let i=0;
      const t=setInterval(()=>{q.value=txt.slice(0,++i);if(i>=txt.length||!b.dataset.on){clearInterval(t);b.dataset.on='';b.innerHTML=ic.mic}},38)}}};

SC.recipes = { theme:'t-cream', tab:'cook',
  render:d=>{const list=D.recipes.filter(r=>S.readyTab==='ready'?r.ready:!r.ready);
   return `${top(backBtn(),`<span class="label">${x('For tonight','Para hoy')}</span>`)}
    <div class="d d-m st" style="margin-bottom:16px">${x('6 things you<br>can cook','6 cosas que<br>puedes cocinar')}</div>
    <div class="pills st" id="rt" style="margin-bottom:18px"><button class="pill ${S.readyTab==='ready'?'on':''}" data-t="ready">${x('Ready now','Listas ya')} · 4</button><button class="pill ${S.readyTab==='miss'?'on':''}" data-t="miss">${x('Missing 1 item','Falta 1 cosa')} · 2</button></div>
    <div class="covers" id="cv">${d&&d.loading?[0,1].map(()=>'<div class="cover skel"></div>').join(''):list.map(coverHTML).join('')}</div>
    <div class="card st" style="margin-top:12px"><div class="row" style="align-items:flex-start;gap:14px"><span style="color:var(--violet)">${ic.spark}</span><div><div style="font-weight:500;margin-bottom:4px">${x('Why these','Por qué estas')}</div><p class="small">${x(`Ranked by what you already have, ${S.time} minutes or less on weekdays, and the 3 items that need using first.${S.restrict.has('nopork')?' Nothing with pork.':''}`,`Ordenadas por lo que ya tienes, ${S.time} minutos o menos entre semana y las 3 cosas que hay que usar primero.${S.restrict.has('nopork')?' Nada con cerdo.':''}`)}</p></div></div></div>
    ${sunuCard()}`},
  mount:async (el,d)=>{
    $$('#rt .pill',el).forEach(p=>p.onclick=()=>{S.readyTab=p.dataset.t;$$('#rt .pill',el).forEach(o=>o.classList.toggle('on',o===p));const cv=$('#cv',el);cv.innerHTML=D.recipes.filter(r=>S.readyTab==='ready'?r.ready:!r.ready).map(coverHTML).join('');cv.scrollLeft=0;stagger(cv,'.cover',70)});
    if(d&&d.loading){await wait(950);if(!el.isConnected)return;d.loading=false;const cv=$('#cv',el);cv.innerHTML=D.recipes.filter(r=>S.readyTab==='ready'?r.ready:!r.ready).map(coverHTML).join('');stagger(cv,'.cover',80)}
  }};
function coverHTML(r){const p=PAL[r.c];return `<button class="cover" data-go="recipe" data-tr="open" data-id="${r.id}" style="--cbg:${p.bg};--cfg:${p.fg}">${coverArt(r.art,r.c)}
  <div class="cover__meta"><span class="pill">${r.time} min</span>${r.sunu?`<span class="pill">Sun\u00fa</span>`:''}${r.ready?`<span class="pill">${x('ready','lista')}</span>`:`<span class="pill">+ ${L(r.missing)}</span>`}</div><div class="cover__title">${L(r)}</div></button>`}

SC.recipe = { theme:'t-cream', noTab:true,
  render:d=>{const r=D.recipes.find(q=>q.id===d.id);const p=PAL[r.c];const have=myIngredients();
   const swap=r.id==='pasta'?x('Out of chipotle? A spoon of chile morita salsa gives you the same smoky kick.','¿Sin chipotle? Una cucharada de salsa de chile morita da el mismo toque ahumado.'):x('No crema? Plain yogurt with a squeeze of lime works the same way.','¿Sin crema? Yogur natural con un chorrito de limón funciona igual.');
   return `<div class="rhead" style="--cbg:${p.bg};--cfg:${p.fg}">${coverArt(r.art,r.c).replace('preserveAspectRatio="xMidYMax slice"','preserveAspectRatio="xMaxYMax slice"')}
     <div class="top" style="position:relative;z-index:2">${backBtn()}<button class="icon-btn" id="fav" aria-label="${x('Save','Guardar')}">${ic.heart}</button></div>
     <div class="rhead__title st">${L(r)}</div></div>
    <svg class="wave" viewBox="0 0 390 42" preserveAspectRatio="none"><path id="wv" d="M0 42 V22 C 65 4 130 4 195 22 S 325 40 390 22 V42z" fill="#F3EEE7"/></svg>
    <div class="meta3 st"><div><span class="d">${r.time}</span><div class="small">${x('minutes','minutos')}</div></div><div><span class="d">${S.people}</span><div class="small">${x('servings','porciones')}</div></div><div><span class="d" style="font-size:26px;line-height:36px">${L(r.level)}</span><div class="small">${x('level','nivel')}</div></div></div>
    <p class="lead st" style="margin-bottom:6px">${L(r.why)}.</p>${r.sunu?`<div class="card c-red st" style="margin-top:14px;display:flex;align-items:center;justify-content:space-between;gap:14px"><span style="font-weight:500">${x('A recipe from Sun\u00fa\u2019s kitchen','Receta de la cocina de Sun\u00fa')}</span><img src="assets/brand/Sunu-logo-white.svg" alt="Sun\u00fa" style="height:22px"></div>`:''}
    <div class="sec-title st"><span class="label">${x('Ingredients','Ingredientes')}</span><span class="small">${r.ing.filter(i=>have.includes(i)).length}/${r.ing.length} ${x('at home','en casa')}</span></div>
    <div class="card st" style="padding:6px 18px">${r.ing.map(i=>{const h=have.includes(i);const inList=S.fromRecipes.some(f=>f.id===i);return `<div class="ing ${h?'':'missing'}"><span class="ing__mark">${h?ic.check:ic.plus}</span><span class="ing__name">${ingName(i)}</span>${h?`<span class="ing__qty">${ING[i]?L(ING[i].qty):''}</span>`:`<button class="mini-btn ${inList?'done':''}" data-add="${i}">${inList?x('On your list','En tu lista'):x('Add to list','A la lista')}</button>`}</div>`}).join('')}</div>
    <div class="card c-yellow st" style="margin-top:12px"><div class="label" style="margin-bottom:6px">${x('Swap','Sustituye')}</div><p style="font-size:15px;line-height:1.45">${swap}</p></div>
    <div class="sec-title st"><span class="label">${x('Steps','Pasos')}</span><span class="small">${r.steps.length}</span></div>
    ${r.steps.map((s,i)=>`<div class="stepline st"><span class="num">${i+1}</span><p>${L(s)}</p></div>`).join('')}
    <div class="dock"><button class="btn st" data-go="cook" data-tr="flood" data-color="${p.bg}" data-id="${r.id}">${x('Start cooking','Empezar a cocinar')} ${ic.play}</button></div>`},
  mount:(el,d)=>{
    const wv=$('#wv',el);wv.animate([{d:'path("M0 42 V36 C 65 36 130 36 195 36 S 325 36 390 36 V42z")'},{d:'path("M0 42 V22 C 65 4 130 4 195 22 S 325 40 390 22 V42z")'}],{duration:900,easing:'cubic-bezier(.34,1.56,.64,1)'});
    $$('[data-add]',el).forEach(b=>b.onclick=()=>{const id=b.dataset.add;if(S.fromRecipes.some(f=>f.id===id))return;const r=D.recipes.find(q=>q.id===d.id);
      S.fromRecipes.push({id,en:D.extra[id].en,es:D.extra[id].es,why:{en:'For '+r.en,es:'Para '+r.es},g:'pantry',c:'red',p:[r.missing.price,r.missing.price+2,r.missing.price+1,r.missing.price+6,r.missing.price+3,0]});
      b.classList.add('done');b.textContent=x('On your list','En tu lista');pop(b);toast(x('Added to your list','Agregado a tu lista'))});
    $('#fav',el).onclick=e=>{const b=e.currentTarget;b.style.background=b.style.background?'':'currentColor';b.querySelector('svg').style.color=b.style.background?'var(--cbg)':'';pop(b);toast(b.style.background?x('Saved to favorites','Guardada en favoritos'):x('Removed from favorites','Quitada de favoritos'))};
  }};

SC.cook = { full:true, noTab:true,
  themeFor:d=>'t-'+D.recipes.find(q=>q.id===d.id).c,
  render:d=>{const r=D.recipes.find(q=>q.id===d.id);S.step=d.step||0;return `<div class="screen" style="position:absolute;inset:0;padding-bottom:30px;display:flex;flex-direction:column">
    ${top(`<button class="icon-btn" data-back>${ic.close}</button>`,`<span class="label">${L(r)}</span>`)}
    <div id="ck" class="grow" style="display:flex;flex-direction:column">${cookStep(r)}</div>
    <div class="row" style="gap:10px;margin-top:18px"><button class="round" id="prev" style="background:transparent;border:1.5px solid currentColor;color:inherit" aria-label="${x('Previous','Anterior')}">${ic.back}</button>
    <button class="btn grow" id="next" style="background:var(--fg);color:var(--bg)">${x('Next step','Siguiente paso')} ${ic.arrow}</button></div></div>`},
  mount:(el,d)=>{const r=D.recipes.find(q=>q.id===d.id);let timer=null,left=0;
    const draw=dir=>{clearInterval(timer);timer=null;const ck=$('#ck',el);ck.animate([{opacity:1,transform:'translateX(0)'},{opacity:0,transform:`translateX(${-dir*40}px)`}],{duration:160}).onfinish=()=>{ck.innerHTML=cookStep(r);bindTimer();ck.animate([{opacity:0,transform:`translateX(${dir*40}px)`},{opacity:1,transform:'translateX(0)'}],{duration:380,easing:'cubic-bezier(.2,.8,.2,1)'})};
      $('#next',el).innerHTML=S.step===r.steps.length-1?x('Finish','Terminar')+' '+ic.check:x('Next step','Siguiente paso')+' '+ic.arrow};
    const bindTimer=()=>{const b=$('#tb',el);if(!b)return;left=r.steps[S.step].t;const tot=left;const ring=$('#tr',el);const lab=$('#tt',el);
      b.onclick=()=>{if(timer){clearInterval(timer);timer=null;b.innerHTML=ic.play;return}b.innerHTML=ic.pause;timer=setInterval(()=>{if(!el.isConnected){clearInterval(timer);timer=null;return}left=Math.max(0,left-10);lab.textContent=fmt(left);ring.style.strokeDashoffset=565*(1-left/tot);if(!left){clearInterval(timer);timer=null;b.innerHTML=ic.play;toast(x('Time’s up','Se acabó el tiempo'))}},100)}};
    bindTimer();
    $('#next',el).onclick=()=>{if(S.step<r.steps.length-1){S.step++;draw(1)}else{clearInterval(timer);go('done',{type:'flood',color:'#D8F25A',replace:true,data:{id:r.id}})}};
    $('#prev',el).onclick=()=>{if(S.step>0){S.step--;draw(-1)}};
  }};
const fmt=s=>Math.floor(s/60)+':'+String(s%60).padStart(2,'0');
function cookStep(r){const s=r.steps[S.step];return `<div class="label" style="color:var(--fg2);margin-top:8px">${x('Step','Paso')} ${S.step+1} ${x('of','de')} ${r.steps.length}</div>
  <div class="cook-num">${String(S.step+1).padStart(2,'0')}</div>
  <p class="mid-light" style="margin-top:14px">${L(s)}</p>
  ${s.t?`<div class="timer"><svg viewBox="0 0 200 200"><circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" stroke-opacity=".2" stroke-width="12"/><circle id="tr" cx="100" cy="100" r="90" fill="none" stroke="currentColor" stroke-width="12" stroke-linecap="round" stroke-dasharray="565" stroke-dashoffset="0" style="transition:stroke-dashoffset .1s linear"/></svg><div class="timer__t"><span id="tt">${fmt(s.t)}</span></div></div>
  <div style="display:flex;justify-content:center"><button class="round" id="tb" style="background:var(--fg);color:var(--bg)" aria-label="${x('Start timer','Iniciar temporizador')}">${ic.play}</button></div>`:'<div class="grow"></div>'}
  <div class="voice-hint" style="margin-top:auto;padding-top:18px"><span class="bars"><i></i><i></i><i></i><i></i><i></i></span>${x('Hands busy? Say “next”','¿Manos ocupadas? Di “siguiente”')}</div>`}

SC.done = { theme:'t-lime', noTab:true,
  render:d=>{const r=D.recipes.find(q=>q.id===d.id);return `${top('',`<span class="label">${L(r)}</span>`)}
    <div class="d st" style="font-size:150px;margin-top:20px">${x('Done.','Listo.')}</div>
    <div class="big-light st" style="margin:10px 0 26px">${x('how did it turn out?','¿cómo quedó?')}</div>
    <div class="row st" id="rate" style="gap:10px;margin-bottom:28px">${[1,2,3,4,5].map(i=>`<button data-r="${i}" style="width:52px;height:52px;border-radius:50%;border:2px solid currentColor;background:${i<=S.rating?'currentColor':'transparent'};transition:transform .35s var(--spring),background .2s"></button>`).join('')}</div>
    <div class="card st" style="background:rgba(255,255,255,.55)"><button class="set-row" id="lo" style="border:0;padding:4px 0"><span class="grow"><b>${x('Save leftovers','Guardar sobras')}</b><span class="small">${x('We’ll add them to your fridge and suggest them for tomorrow’s lunch boxes.','Las agregamos a tu refri y te las sugerimos para los lunch boxes de mañana.')}</span></span><span class="tgl ${S.leftovers?'on':''}"></span></button></div>
    <div class="card st" style="margin-top:12px;background:rgba(255,255,255,.55)"><div class="small" style="color:var(--lime-fg)">${x('Updated your kitchen: crema, cilantro and 6 tortillas used.','Actualizamos tu cocina: se usaron la crema, el cilantro y 6 tortillas.')}</div></div>
    <div class="dock"><button class="btn st" data-go="home" data-root data-tr="flood" data-color="#F3EEE7">${x('Back home','Volver al inicio')}</button><div class="st" style="display:flex;justify-content:center">${byline(false)}</div></div>`},
  mount:el=>{$$('[data-r]',el).forEach(b=>b.onclick=()=>{S.rating=+b.dataset.r;$$('[data-r]',el).forEach(o=>{o.style.background=+o.dataset.r<=S.rating?'currentColor':'transparent'});pop(b)});
    $('#lo',el).onclick=()=>{S.leftovers=!S.leftovers;$('#lo .tgl',el).classList.toggle('on',S.leftovers)}}};

/* shop */
const priceAt=(it,si)=>it.p[si];
function storeTotals(){const items=listItems();return D.stores.map((s,si)=>{let t=0,n=0;items.forEach(it=>{const v=priceAt(it,si);if(v){t+=v;n++}});return {s,si,t,n}})}
function bestMix(){const items=listItems();const w=D.stores.findIndex(s=>s.id==='walmart'),m=D.stores.findIndex(s=>s.id==='teran');let t=0;items.forEach(it=>{const a=it.p[m],b=it.p[w];t+=(a&&(it.g==='produce'||it.g==='pantry')&&a<b)?a:b});return t}
SC.shop = { theme:'t-cream', tab:'shop',
  render:()=>{const items=listItems();const groups=[['produce',x('Produce','Frutas y verduras')],['dairy',x('Dairy','Lácteos')],['pantry',x('Pantry','Abarrotes')]];const rot=[-3,2.5,-1.5,3,-2.5,1.5,-2,2];let k=0;
   return `${top(`<div class="st"><div class="small">${x('Shopping','Compras')}</div><div class="d d-s">${x('Your list','Tu lista')}</div></div>`,'',`<button class="icon-btn st" id="vo" aria-label="${x('Add by voice','Agregar por voz')}">${ic.mic}</button>`)}
    <div class="card c-ink st"><div class="row between"><span class="pill">${x('this week','esta semana')}</span>${ic.spark}</div>
      <div class="row" style="align-items:flex-end;gap:12px;margin-top:18px"><span class="d" style="font-size:96px">${items.length}</span><span style="padding-bottom:12px;font-size:14px;color:#B7B1C9">${x('items','cosas')} · ${x('about','aprox.')} ${money(bestMix())}${S.tianguis?' · '+x('tianguis added','tianguis agregado'):''}</span></div>
      <button class="btn" style="background:var(--lime);color:var(--lime-fg);margin-top:16px" data-go="compare">${x('Compare stores','Comparar tiendas')} ${ic.arrow}</button></div>
    ${groups.map(g=>{const its=items.filter(i=>i.g===g[0]);if(!its.length)return '';return `<div class="group-h st"><span class="label">${g[1]}</span><span class="small">${its.length}</span></div>
     <div class="stickies">${its.map(i=>{const p=PAL[i.c]||{bg:'#fff',fg:'#1C1830'};const bg=i.c==='cream'?'#FFFFFF':p.bg;const fg=i.c==='cream'?'#1C1830':p.fg;return `<button class="sticky st ${S.got.has(i.id)?'got':''}" data-i="${i.id}" style="--cbg:${bg};--cfg:${fg};--rot:${rot[k++%8]}deg"><span class="d">${money(Math.min(...i.p.filter(Boolean)))}</span><span><span class="sticky__name" style="display:block">${L(i)}</span><span class="sticky__why" style="display:block">${L(i.why)}</span></span></button>`}).join('')}</div>`}).join('')}`},
  mount:el=>{$$('.sticky',el).forEach(b=>b.onclick=()=>{const id=b.dataset.i;S.got.has(id)?S.got.delete(id):S.got.add(id);b.classList.toggle('got');pop(b)});$('#vo',el).onclick=()=>voiceSheet()}};

function voiceSheet(){
  const said=x('Tianguis on Thursdays in my neighborhood. Avocados three for twenty, cilantro five pesos.','Tianguis de los jueves en mi colonia, aguacates tres por veinte y el cilantro a cinco pesos.');
  const sh=openSheet(`<div class="label" style="margin-bottom:14px;color:var(--red)">${x('Listening','Escuchando')}</div>
    <div class="row" style="gap:14px;margin-bottom:18px"><span class="round red">${ic.mic}</span><span class="bars" style="height:30px;color:var(--red)"><i></i><i></i><i></i><i></i><i></i></span></div>
    <p class="mid-light typing" id="said" style="font-size:24px;min-height:96px"></p>
    <div id="parsed" style="display:grid;gap:10px;margin-top:16px"></div>
    <div id="act" style="margin-top:20px"></div>`);
  const p=$('#said',sh);let i=0;const t=setInterval(()=>{if(!sh.isConnected)return clearInterval(t);p.textContent=said.slice(0,++i);if(i>=said.length){clearInterval(t);p.classList.remove('typing');parsed()}},32);
  function parsed(){const box=$('#parsed',sh);box.innerHTML=`
    <div class="card c-teal" style="padding:16px 18px"><div class="label" style="color:var(--teal-fg);margin-bottom:4px">${x('New place','Lugar nuevo')}</div><div style="font-weight:500;font-size:17px">${x('Thursday tianguis','Tianguis de los jueves')}</div><div class="small" style="color:var(--teal-fg)">${x('Thursdays · 0.6 km from home','Jueves · a 0.6 km de casa')}</div></div>
    <div class="row" style="gap:10px"><div class="card c-lime grow" style="padding:16px"><div class="d" style="font-size:34px">3 / $20</div><div class="small" style="color:var(--lime-fg)">${x('Avocados','Aguacates')}</div></div><div class="card c-yellow grow" style="padding:16px"><div class="d" style="font-size:34px">$5</div><div class="small" style="color:var(--yellow-fg)">${x('Cilantro bunch','Manojo de cilantro')}</div></div></div>`;
    stagger(box,':scope > *',90);
    $('#act',sh).innerHTML=`<button class="btn">${x('Save place and prices','Guardar lugar y precios')}</button>`;
    $('#act .btn',sh).onclick=()=>{S.tianguis=true;const av=D.list.find(l=>l.id==='avocado');av.p[5]=27;const ci=D.list.find(l=>l.id==='cilantro2');ci.p[5]=5;closeSheet();toast(x('Tianguis saved, prices updated','Tianguis guardado, precios actualizados'));rerender()}}
}

SC.compare = { theme:'t-cream', noTab:true,
  render:()=>{const tot=storeTotals().filter(r=>S.stores.has(r.s.id)||r.s.id==='walmart'||r.s.id==='teran');const max=Math.max(...tot.filter(r=>r.n===listItems().length).map(r=>r.t));const best=bestMix();const n=listItems().length;
   return `${top(backBtn(),`<span class="label">${n} ${x('items','cosas')}</span>`)}
    <div class="d d-m st" style="margin-bottom:10px">${x('Where to<br>shop','Dónde<br>comprar')}</div>
    <p class="lead st" style="margin-bottom:18px">${x('Online prices from your stores, plus the ones you told us about.','Precios en línea de tus tiendas, más los que tú nos diste.')}</p>
    <div class="card c-violet st"><div class="row between"><span class="pill">${x('best mix','mejor combinación')}</span>${ic.star}</div>
      <div class="d" style="font-size:96px;margin-top:16px">${money(best)}</div>
      <div style="font-size:15px;margin-top:4px">Mercado Terán + Walmart Independencia</div>
      <div class="small" style="color:var(--violet-fg);margin-top:2px">${x('Produce at the market, the rest at Walmart. Saves','Frutas y verduras en el mercado, lo demás en Walmart. Ahorras')} ${money(max-best)}</div>
      <button class="btn" style="background:#fff;color:var(--violet);margin-top:16px" data-go="route">${x('Plan my route','Planear mi ruta')} ${ic.arrow}</button></div>
    <div class="sec-title st"><span class="label">${x('One stop','Una sola tienda')}</span><span class="small">${x('total','total')}</span></div>
    <div class="stack">${tot.sort((a,b)=>(b.n-a.n)||(a.t-b.t)).map(r=>`<div class="store st" style="--sc:${r.s.sc};--sf:${r.s.sf}"><span class="store__mark">${r.s.mark}</span><span class="grow"><span class="store__name" style="display:block">${r.s.name}</span><span class="small">${r.s.branch} · ${r.n===n?x('has everything','tiene todo'):r.n+' '+x('of','de')+' '+n+' '+x('items','cosas')}</span><div class="bar-wrap"><i style="width:${Math.round(r.t/max*100)}%;--bc:${r.s.sc}"></i></div></span><span class="store__price">${money(r.t)}</span></div>`).join('')}</div>`}};

SC.route = { theme:'t-cream', noTab:true,
  render:()=>`${top(backBtn(),`<span class="label">${x('Today','Hoy')}</span>`)}
    <div class="d d-m st" style="margin-bottom:16px">${x('Your route','Tu ruta')}</div>
    <div class="map st">${routeMap()}</div>
    <div class="row st" style="gap:10px;margin-bottom:10px">${[['48',x('minutes','minutos')],['9.2','km'],[money(bestMix()),x('estimated','estimado')]].map(m=>`<div class="card grow" style="padding:14px;text-align:center"><div class="d" style="font-size:34px">${m[0]}</div><div class="small">${m[1]}</div></div>`).join('')}</div>
    <div class="card st" style="padding:8px 18px">
      ${[[STORE.teran,'1',x('Produce · opens 7:00','Frutas y verduras · abre 7:00'),'10:00'],[STORE.walmart,'2',x('Dairy and pantry','Lácteos y abarrotes'),'10:25']].map(s=>`<div class="stop" style="--sc:${s[0].sc};--sf:${s[0].sf}"><span class="num">${s[1]}</span><span class="grow"><b style="font-weight:500;display:block">${s[0].name} ${s[0].branch}</b><span class="small">${s[2]}</span></span><span class="small">${s[3]}</span></div>`).join('<div class="hr" style="margin:0"></div>')}
    </div>
    <div class="card c-yellow st" style="margin-top:12px"><div class="small" style="color:var(--yellow-fg)">${x('Leave by 10:00 to beat the Saturday traffic on Av. Independencia. Back home around 10:48.','Sal a las 10:00 para evitar el tráfico del sábado en Av. Independencia. De regreso como a las 10:48.')}</div></div>
    <div class="dock"><button class="btn st" data-go="instore" data-tr="flood" data-color="#FFD447">${x('Start shopping','Empezar a comprar')} ${ic.arrow}</button></div>`};

SC.instore = { theme:'t-yellow', noTab:true,
  render:()=>{const items=listItems();const m=items.filter(i=>i.g==='produce');const w=items.filter(i=>i.g!=='produce');const done=items.filter(i=>S.checks.has(i.id)).length;
   const row=(i,si)=>`<button class="check ${S.checks.has(i.id)?'on':''}" data-c="${i.id}"><span class="check__box">${ic.check}</span><span class="check__t">${L(i)}</span><span class="check__p">${money(i.p[si]||i.p[0])}</span></button>`;
   return `${top(backBtn(),`<span class="label">${x('Shopping','Comprando')}</span>`)}
    <div class="row st" style="align-items:flex-end;gap:10px;margin-bottom:8px"><span class="d" id="prog" style="font-size:120px">${done}/${items.length}</span></div>
    <div class="label st" style="margin:18px 0 4px">1 · Mercado Terán</div>${m.map(i=>row(i,5)).join('')}
    <div class="label st" style="margin:26px 0 4px">2 · Walmart Independencia</div>${w.map(i=>row(i,0)).join('')}
    <div class="dock"><button class="btn st" id="fin">${x('Finish shopping','Terminar compras')}</button></div>`},
  mount:el=>{const items=listItems();$$('[data-c]',el).forEach(b=>b.onclick=()=>{const id=b.dataset.c;S.checks.has(id)?S.checks.delete(id):S.checks.add(id);b.classList.toggle('on');const n=items.filter(i=>S.checks.has(i.id)).length;$('#prog',el).textContent=n+'/'+items.length;if(n===items.length)toast(x('All done. Kitchen updated.','Todo listo. Cocina actualizada.'))});
    $('#fin',el).onclick=()=>{items.forEach(i=>{if(S.checks.has(i.id))S.got.add(i.id)});toast(x('Your kitchen is restocked','Tu cocina está surtida'));go('shop',{type:'flood',color:'#F3EEE7',root:true,tab:'shop'})}}};

/* kitchen */
SC.kitchen = { theme:'t-cream', tab:'kitchen',
  render:()=>`${top(`<div class="st"><div class="small">${x('Organize','Acomoda')}</div><div class="d d-s">${x('Your fridge','Tu refri')}</div></div>`,'',`<button class="icon-btn st" data-go="camera" data-tr="flood" data-color="#0E0C14" aria-label="${x('Rescan','Volver a escanear')}">${ic.fridge}</button>`)}
    <div class="card c-teal st"><div class="row between"><span class="pill">${x('fridge score','puntaje del refri')}</span>${ic.ring}</div>
      <div class="row" style="align-items:flex-end;gap:8px;margin-top:14px"><span class="d" style="font-size:110px">${S.moved?100:72}</span><span class="d" style="font-size:44px;padding-bottom:12px">%</span></div>
      <div class="small" style="color:var(--teal-fg)">${S.moved?x('Everything is where it keeps best.','Todo está donde mejor se conserva.'):x('3 items are in spots that make them spoil faster. Tap a number to see why.','3 cosas están en lugares donde se echan a perder más rápido. Toca un número para ver por qué.')}</div></div>
    <div class="fridge-wrap st" style="margin-top:14px">${scene(S.moved?'after':'before').replace('class="scene"','').replace('preserveAspectRatio="xMidYMid slice"','')}
      ${D.zones.map(z=>`<button class="pin" data-z="${z.n}" style="left:${z.x}%;top:${z.y}%">${z.n}</button>`).join('')}</div>
    ${S.moved?'':`<div class="sec-title st"><span class="label">${x('Suggested moves','Cambios sugeridos')}</span><span class="small">3</span></div>
    <div class="stack">${moves().map((m,i)=>`<div class="card st row" style="gap:14px;align-items:flex-start"><span class="pin" style="position:static;margin:0;flex:none;background:${PAL[m[2]].bg}">${i+1}</span><div><b style="font-weight:500">${m[0]}</b><p class="small">${m[1]}</p></div></div>`).join('')}</div>`}
    <div class="dock"><button class="btn st" data-go="beforeafter">${S.moved?x('See before and after','Ver antes y después'):x('See the new layout','Ver el nuevo acomodo')} ${ic.arrow}</button></div>`,
  mount:el=>{$$('[data-z]',el).forEach(b=>b.onclick=()=>{$$('.pin',el).forEach(p=>p.classList.toggle('on',p===b));zoneSheet(D.zones[+b.dataset.z-1],()=>b.classList.remove('on'))})}};
function moves(){return [[x('Chicken to the bottom shelf','El pollo a la repisa de abajo'),x('Raw meat on top can drip onto everything below it.','La carne cruda arriba puede gotear sobre todo lo de abajo.'),'red'],[x('Milk out of the door','La leche fuera de la puerta'),x('The door is the warmest spot. Milk lasts about 2 more days on the middle shelf.','La puerta es lo más tibio. La leche dura como 2 días más en la repisa de en medio.'),'yellow'],[x('Cilantro into the left drawer','El cilantro al cajón izquierdo'),x('Wrapped in a damp towel it stays fresh for a week instead of 2 days.','Envuelto en una servilleta húmeda dura una semana en vez de 2 días.'),'teal']]}
function zoneSheet(z,onClose){const p=PAL[z.c];openSheet(`<div class="row" style="gap:14px;margin-bottom:16px"><span class="pin" style="position:static;margin:0;background:${p.bg};color:${p.fg}">${z.n}</span><div class="d d-s">${L(z)}</div></div>
  <div class="label" style="margin-bottom:6px">${x('What goes here','Qué va aquí')}</div><p style="font-size:17px;line-height:1.45;margin-bottom:18px">${L(z.what)}</p>
  <div class="card" style="background:${p.bg};color:${p.fg}"><div class="label" style="margin-bottom:6px;opacity:.8">${x('Why','Por qué')}</div><p class="mid-light" style="font-size:22px">${L(z.why)}</p></div>
  <button class="btn" style="margin-top:18px" data-close>${x('Got it','Entendido')}</button>`,onClose)}

SC.beforeafter = { theme:'t-cream', noTab:true,
  render:()=>`${top(backBtn(),`<span class="label">${x('Drag to compare','Desliza para comparar')}</span>`)}
    <div class="d d-m st" style="margin-bottom:16px">${x('Before and<br>after','Antes y<br>después')}</div>
    <div class="ba st" id="ba">${scene('before').replace('class="scene"','').replace('preserveAspectRatio="xMidYMid slice"','')}
      <div class="ba__after">${scene('after').replace('class="scene"','').replace('preserveAspectRatio="xMidYMid slice"','')}</div>
      <span class="ba__tag" style="left:14px">${x('Now','Ahora')}</span><span class="ba__tag" style="right:14px;background:var(--teal)">${x('Better','Mejor')}</span>
      <div class="ba__handle"><b>${ic.drag}</b></div></div>
    <div class="card st" style="margin-top:14px"><div class="row" style="gap:14px"><span class="d" style="font-size:52px;color:var(--teal)">+4</span><p class="small">${x('days of freshness on average for milk, cilantro and chicken.','días más de frescura en promedio para la leche, el cilantro y el pollo.')}</p></div></div>
    <div class="dock"><button class="btn st" id="mv">${S.moved?x('Back to my fridge','Volver a mi refri'):x('I moved them','Ya los cambié')} ${ic.check}</button></div>`,
  mount:el=>{const ba=$('#ba',el),af=$('.ba__after',el),h=$('.ba__handle',el);
    const set=px=>{const r=ba.getBoundingClientRect();const p=Math.max(4,Math.min(96,(px-r.left)/r.width*100));af.style.clipPath=`inset(0 0 0 ${p}%)`;h.style.left=p+'%'};
    let drag=false;ba.onpointerdown=e=>{drag=true;ba.setPointerCapture(e.pointerId);set(e.clientX)};ba.onpointermove=e=>{if(drag)set(e.clientX)};ba.onpointerup=()=>drag=false;
    let t0=null;const intro=ts=>{if(!t0)t0=ts;const k=Math.min(1,(ts-t0)/1400);const p=50+Math.sin(k*Math.PI*2)*22*(1-k);af.style.clipPath=`inset(0 0 0 ${p}%)`;h.style.left=p+'%';if(k<1&&!drag)requestAnimationFrame(intro)};setTimeout(()=>requestAnimationFrame(intro),500);
    $('#mv',el).onclick=()=>{if(!S.moved){S.moved=true;toast(x('Fridge score 100%','Puntaje del refri 100%'))}back()}}};

/* alerts + previews */
SC.alerts = { theme:'t-cream', noTab:true,
  render:()=>{const rows=[[x('Milk','Leche'),2,'violet',x('About 2 days left','Quedan como 2 días')],[x('Cilantro','Cilantro'),0,'teal',x('Use it today','Úsalo hoy')],[x('Corn tortillas','Tortillas de maíz'),3,'yellow',x('Out by Thursday','Se acaban el jueves')],[x('Pinto beans','Frijoles pintos'),5,'orange',x('Last can','Última lata')]];
   return `${top(backBtn(),`<span class="label">${x('Running low','Por acabarse')}</span>`)}
    <div class="d d-m st" style="margin-bottom:10px">${x('Before it<br>runs out','Antes de<br>que se acabe')}</div>
    <p class="lead st" style="margin-bottom:18px">${x('Based on what you scanned and how fast your home uses it.','Según lo que escaneaste y qué tan rápido se usa en tu casa.')}</p>
    <div class="stack">${rows.map(r=>{const p=PAL[r[2]];return `<div class="days st"><span class="d" style="color:${r[2]==='yellow'?'#B38600':p.bg}">${r[1]}</span><span class="grow"><b style="font-weight:500;display:block">${r[0]}</b><span class="small">${r[3]}</span><div class="bar-wrap"><i style="width:${Math.max(8,r[1]/7*100)}%;--bc:${p.bg}"></i></div></span></div>`}).join('')}</div>
    <button class="btn st" style="margin-top:14px" id="addAll">${x('Add all to my list','Agregar todo a mi lista')} ${ic.plus}</button>
    <div class="sec-title st"><span class="label">${x('How we remind you','Cómo te avisamos')}</span></div>
    <div class="card st" style="padding:4px 18px">${notifRows(false)}</div>
    <div class="row st" style="gap:10px;margin-top:12px"><button class="btn ghost grow" data-go="lock" data-tr="fade">${x('Phone alert','Alerta en el teléfono')}</button><button class="btn ghost grow" data-go="email">${x('Weekly email','Correo semanal')}</button></div>`},
  mount:el=>{bindNotif(el);$('#addAll',el).onclick=e=>{toast(x('4 items are on your list','4 cosas están en tu lista'));pop(e.currentTarget)}}};

SC.lock = { full:true, noTab:true, theme:'t-violet', dark:true,
  render:()=>{const d=new Date();return `<div class="lock"><svg class="lock__art" viewBox="0 0 390 844" preserveAspectRatio="xMidYMid slice"><circle cx="340" cy="660" r="230" fill="#FFD447"/><path d="M-60 520 a 200 200 0 0 1 400 0z" fill="#FF9BD0"/><circle cx="60" cy="760" r="90" fill="#F40046"/></svg>
    <div class="lock__time"><div class="small" style="color:#DCD5FF;font-weight:500">${d.toLocaleDateString(S.lang==='es'?'es-MX':'en-US',{weekday:'long',month:'long',day:'numeric'})}</div><div class="d">${d.getHours()}:${String(d.getMinutes()).padStart(2,'0')}</div></div>
    <button class="notif" id="n1" data-back style="opacity:0"><span class="notif__icon"><img src="assets/brand/Sunu-logo-white.svg" alt="" style="width:32px"></span><span style="flex:1"><span class="row between"><b>Sun\u00fa</b><span class="small" style="color:var(--ink-2)">${x('now','ahora')}</span></span><p>${x('Milk runs out in about 2 days. It’s $29 at Walmart Independencia, on your way home.','La leche se acaba en unos 2 días. Está en $29 en Walmart Independencia, de camino a casa.')}</p></span></button>
    <button class="notif" id="n2" data-back style="opacity:0;margin-top:10px"><span class="notif__icon"><img src="assets/brand/Sunu-logo-white.svg" alt="" style="width:32px"></span><span style="flex:1"><span class="row between"><b>Sun\u00fa</b><span class="small" style="color:var(--ink-2)">${x('8 min ago','hace 8 min')}</span></span><p>${x('Tianguis day is tomorrow. Avocados were 3 for $20 last week.','Mañana es día de tianguis. Los aguacates estaban a 3 por $20 la semana pasada.')}</p></span></button></div>`},
  mount:el=>{['#n1','#n2'].forEach((s,i)=>setTimeout(()=>{const n=$(s,el);if(!n)return;n.animate([{opacity:0,transform:'translateY(-60px) scale(.9)'},{opacity:1,transform:'none'}],{duration:650,easing:'cubic-bezier(.34,1.56,.64,1)',fill:'forwards'})},400+i*500))}};

SC.email = { theme:'t-cream', noTab:true,
  render:()=>`${top(backBtn(),`<span class="label">${x('Inbox','Bandeja')}</span>`)}
    <div class="st" style="margin-bottom:14px"><div style="font-weight:600;font-size:18px">${x('Your kitchen this week','Tu cocina esta semana')}</div><div class="small">Sunú · ${x('Sunday 8:00','domingo 8:00')}</div></div>
    <div class="mail st"><div class="mail__hero"><svg viewBox="0 0 300 160" style="position:absolute;right:-40px;top:-20px;width:240px"><circle cx="190" cy="90" r="80" fill="#F40046"/><circle cx="110" cy="40" r="34" fill="#5B3DF5"/></svg>
      <img src="assets/brand/Sunu-logo-red.svg" alt="Sun\u00fa" style="height:26px;width:auto;display:block;position:relative"><div class="d" style="font-size:64px;margin-top:40px;position:relative">${x('Hi','Hola')}${S.name?' '+S.name:''}.</div></div>
      <div class="mail__body"><p style="font-size:15px;line-height:1.55;margin-bottom:16px">${x('You cooked 5 times this week and wasted almost nothing. Here’s what’s coming:','Cocinaste 5 veces esta semana y casi no tiraste nada. Esto es lo que viene:')}</p>
      <div class="row" style="gap:10px;margin-bottom:16px">${[['5',x('meals cooked','comidas')],['$186',x('saved','ahorrado')],['4',x('running low','por acabarse')]].map(m=>`<div class="grow" style="background:var(--cream);border-radius:16px;padding:12px;text-align:center"><div class="d" style="font-size:32px">${m[0]}</div><div class="small" style="font-size:11px">${m[1]}</div></div>`).join('')}</div>
      <p class="small" style="margin-bottom:16px">${x('Milk, tortillas, beans and cilantro run out before Thursday. Your best mix is Mercado Terán plus Walmart Independencia.','La leche, las tortillas, los frijoles y el cilantro se acaban antes del jueves. Tu mejor combinación es Mercado Terán más Walmart Independencia.')}</p>
      <button class="btn red" data-tab="shop">${x('Open my list','Abrir mi lista')}</button>
      <div style="display:flex;justify-content:center;margin-top:22px"><img src="assets/brand/Sunu-logo-slogan-color.svg" alt="Sun\u00fa, cocina con amor" style="height:40px"></div></div></div>`};

/* me */
SC.me = { theme:'t-cream', tab:'me',
  render:()=>`${top(`<div class="st"><div class="small">${x('Profile','Perfil')}</div><div class="d d-s">${S.name||x('Your kitchen','Tu cocina')}</div></div>`,'',langToggle())}
    <div class="card c-violet st"><div class="row between"><span class="pill">${x('kitchen profile','perfil de cocina')}</span>${ic.star}</div>
      <div class="row" style="gap:18px;margin-top:16px">${[[S.people,x('people','personas')],[S.time,'min'],[money(S.budget),x('a week','a la semana')]].map(n=>`<div><div class="d" style="font-size:46px">${n[0]}</div><div class="small" style="color:var(--violet-fg)">${n[1]}</div></div>`).join('')}</div>
      <div class="pills" style="margin-top:16px">${[...S.restrict].filter(r=>r!=='none').map(r=>`<span class="pill">${restrictName(r)}</span>`).join('')}</div>
      <button class="btn" style="background:#fff;color:var(--violet);margin-top:16px" data-go="ob1">${x('Edit profile','Editar perfil')}</button></div>
    <div class="sec-title st"><span class="label">${x('Reminders','Recordatorios')}</span></div><div class="card st" style="padding:4px 18px">${notifRows(false)}</div>
    <div class="sec-title st"><span class="label">${x('Your stores','Tus tiendas')}</span><span class="small">${S.stores.size}</span></div>
    <div class="pills st">${[...S.stores].map(id=>`<span class="pill">${STORE[id]?STORE[id].name:id.replace('x-','')}</span>`).join('')}${S.tianguis?`<span class="pill">${x('Thursday tianguis','Tianguis de los jueves')}</span>`:''}</div>
    <div class="card st" style="margin-top:22px"><div class="row" style="gap:14px;align-items:flex-start"><span style="color:var(--red)">${ic.spark}</span><p class="small">${x('Photos are read by an AI vision model and recipes are planned by a language model, always within your profile. Your photos are never shared.','Las fotos las lee un modelo de visión con IA y las recetas las planea un modelo de lenguaje, siempre dentro de tu perfil. Tus fotos nunca se comparten.')}</p></div></div>
    <div class="st" style="display:flex;justify-content:center;margin-top:26px">${byline(false)}</div>`,
  mount:el=>{bindLang(el);bindNotif(el)}};

/* ---------- engine ---------- */
const view=$('#view'), tabbar=$('#tabbar'), sb=$('.statusbar');
let stack=[];
const cur=()=>stack.length?stack[stack.length-1].name:null;
const TABS=['cook','kitchen','shop','me'], TAB_ROOT={cook:'home',kitchen:'kitchen',shop:'shop',me:'me'};

function build(name,data){const def=SC[name];const el=document.createElement('section');
  if(def.full&&!def.themeFor){el.className='screen full '+(def.theme||'');}
  else if(def.themeFor){el.className='screen full '+def.themeFor(data);}
  else el.className='screen '+(def.theme||'')+(def.noTab?' no-tab':'');
  el.innerHTML=def.render(data||{});el.dataset.name=name;return el}
function mount(el,name,data){const def=SC[name];sb.style.setProperty('--sb',isDark(name,data)?'#fff':'#1C1830');
  tabbar.classList.toggle('hide',!def.tab);$$('[data-lbl]',tabbar).forEach(s=>s.textContent=({cook:x('Cook','Cocinar'),kitchen:x('Kitchen','Mi cocina'),shop:x('Shop','S\u00faper'),me:x('Me','Perfil')})[s.dataset.lbl]);if(def.tab)setTab(def.tab);
  if(def.mount)def.mount(el,data||{})}
function isDark(name,data){const def=SC[name];if(def.dark)return true;const th=def.themeFor?def.themeFor(data):def.theme;return /t-(violet|red|teal|orange|ink)/.test(th||'')}

async function go(name,o={}){
  closeSheet();
  const oldEl=view.lastElementChild;const data=o.data||{};
  const el=build(name,data);view.appendChild(el);
  const entry={name,data,type:o.type||'slide',rect:o.rect,color:o.color};
  if(o.root)stack=[entry];else if(o.replace)stack[stack.length-1]=entry;else stack.push(entry);
  mount(el,name,data);
  await enter(el,oldEl,entry.type,o.rect,o.dir||1);
  if(oldEl&&oldEl.isConnected)oldEl.remove();
  $$('#view > section').slice(0,-1).forEach(s=>s.remove());
}
async function back(){
  closeSheet();
  if(stack.length<2){return}
  const leaving=stack.pop();const prev=stack[stack.length-1];
  const oldEl=view.lastElementChild;const el=build(prev.name,prev.data);view.insertBefore(el,oldEl);
  mount(el,prev.name,prev.data);
  await leave(oldEl,el,leaving.type,leaving.rect);
  oldEl.remove();
}
function rerender(){const e=stack[stack.length-1];if(!e)return;const old=view.lastElementChild;const st=old?old.scrollTop:0;const el=build(e.name,e.data);view.replaceChild(el,old);el.scrollTop=st;mount(el,e.name,e.data)}

const EASE='cubic-bezier(.2,.8,.2,1)', SPRING='cubic-bezier(.34,1.4,.64,1)';
function stagger(root,sel='.st',gap=45){$$(sel,root).forEach((n,i)=>n.animate([{opacity:0,transform:'translateY(22px)'},{opacity:1,transform:'none'}],{duration:520,delay:90+i*gap,easing:EASE,fill:'backwards'}))}
async function enter(el,old,type,rect,dir){
  const H=view.clientHeight,W=view.clientWidth;let a;
  if(type==='flood'){a=el.animate([{clipPath:'inset(100% 0 0 0)'},{clipPath:'inset(0% 0 0 0)'}],{duration:640,easing:'cubic-bezier(.7,0,.2,1)'});stagger(el)}
  else if(type==='open'&&rect){const r=rect;const ins=`inset(${r.top}px ${W-r.right}px ${H-r.bottom}px ${r.left}px round 28px)`;a=el.animate([{clipPath:ins},{clipPath:'inset(0px 0px 0px 0px round 0px)'}],{duration:620,easing:'cubic-bezier(.65,0,.2,1)'});stagger(el,'.st',40)}
  else if(type==='fade'){a=el.animate([{opacity:0},{opacity:1}],{duration:380,easing:'ease-out'});stagger(el)}
  else if(type==='slideback'){a=el.animate([{transform:'translateX(-30%)',opacity:.6},{transform:'none',opacity:1}],{duration:460,easing:EASE});if(old)old.animate([{transform:'none'},{transform:'translateX(100%)'}],{duration:460,easing:EASE,fill:'forwards'});el.style.zIndex=0;if(old)old.style.zIndex=1;stagger(el)}
  else {a=el.animate([{transform:`translateX(${dir*100}%)`},{transform:'none'}],{duration:480,easing:EASE});if(old)old.animate([{transform:'none',opacity:1},{transform:`translateX(${-dir*28}%)`,opacity:.5}],{duration:480,easing:EASE,fill:'forwards'});stagger(el)}
  await a.finished.catch(()=>{});
}
async function leave(old,el,type,rect){
  const H=view.clientHeight,W=view.clientWidth;let a;
  if(type==='flood'){a=old.animate([{clipPath:'inset(0 0 0 0)'},{clipPath:'inset(100% 0 0 0)'}],{duration:540,easing:'cubic-bezier(.7,0,.2,1)',fill:'forwards'})}
  else if(type==='open'&&rect){const r=rect;a=old.animate([{clipPath:'inset(0px 0px 0px 0px round 0px)'},{clipPath:`inset(${r.top}px ${W-r.right}px ${H-r.bottom}px ${r.left}px round 28px)`}],{duration:520,easing:'cubic-bezier(.65,0,.2,1)',fill:'forwards'})}
  else if(type==='fade'){a=old.animate([{opacity:1},{opacity:0}],{duration:300,fill:'forwards'})}
  else {a=old.animate([{transform:'none'},{transform:'translateX(100%)'}],{duration:440,easing:EASE,fill:'forwards'});el.animate([{transform:'translateX(-28%)',opacity:.5},{transform:'none',opacity:1}],{duration:440,easing:EASE})}
  await a.finished.catch(()=>{});
}

/* tab bar with liquid blob */
let curTab=null;
function setTab(t,anim){const btns=$$('button',tabbar);const i=TABS.indexOf(t);const b=btns[i];const blob=$('.tabbar__blob',tabbar);
  btns.forEach(o=>o.classList.toggle('on',o===b));const L1=b.offsetLeft,W1=b.offsetWidth;
  if(curTab!==null&&curTab!==t&&anim){const pb=btns[TABS.indexOf(curTab)];const L0=pb.offsetLeft,W0=pb.offsetWidth;const minL=Math.min(L0,L1),maxR=Math.max(L0+W0,L1+W1);
    blob.animate([{left:L0+'px',width:W0+'px',transform:'scaleY(1)'},{left:minL+'px',width:(maxR-minL)+'px',transform:'scaleY(.82)',offset:.45},{left:L1+'px',width:W1+'px',transform:'scaleY(1)'}],{duration:620,easing:SPRING})}
  blob.style.left=L1+'px';blob.style.width=W1+'px';curTab=t}
tabbar.addEventListener('click',e=>{const b=e.target.closest('button[data-t]');if(!b)return;switchTab(b.dataset.t)});
function switchTab(t){if(curTab===t&&stack.length===1)return;const dir=TABS.indexOf(t)>=TABS.indexOf(curTab)?1:-1;setTab(t,true);go(TAB_ROOT[t],{root:true,dir})}

/* global taps */
view.addEventListener('click',e=>{
  const tb=e.target.closest('[data-tab]');if(tb){switchTab(tb.dataset.tab);return}
  const bk=e.target.closest('[data-back]');if(bk){back();return}
  const g=e.target.closest('[data-go]');if(!g||g.hasAttribute('disabled'))return;
  const r=g.getBoundingClientRect(),vr=view.getBoundingClientRect();const sc=view.getBoundingClientRect().width/view.offsetWidth||1;
  const rect={top:(r.top-vr.top)/sc,left:(r.left-vr.left)/sc,right:(r.right-vr.left)/sc,bottom:(r.bottom-vr.top)/sc};
  const data={};if(g.dataset.id)data.id=g.dataset.id;if(g.dataset.loading)data.loading=true;
  go(g.dataset.go,{type:g.dataset.tr||'slide',rect,root:g.hasAttribute('data-root'),data,color:g.dataset.color});
});

/* sheet + toast + pop */
let sheetClose=null;
function openSheet(html,onClose){closeSheet(true);const bg=document.createElement('div');bg.className='sheet-bg';const sh=document.createElement('div');sh.className='sheet';sh.innerHTML='<div class="sheet__grab"></div>'+html;
  const scr=$('.device__screen');scr.append(bg,sh);requestAnimationFrame(()=>{bg.classList.add('open');sh.classList.add('open')});
  bg.onclick=()=>closeSheet();sh.addEventListener('click',e=>{if(e.target.closest('[data-close]'))closeSheet()});
  let y0=null;sh.addEventListener('pointerdown',e=>{if(sh.scrollTop<=0)y0=e.clientY});sh.addEventListener('pointerup',e=>{if(y0!==null&&e.clientY-y0>70)closeSheet();y0=null});
  sheetClose=()=>{onClose&&onClose();bg.classList.remove('open');sh.classList.remove('open');setTimeout(()=>{bg.remove();sh.remove()},500)};return sh}
function closeSheet(){if(sheetClose){const f=sheetClose;sheetClose=null;f()}}
let tt=null;function toast(m){const t=$('#toast');t.textContent=m;t.classList.add('show');clearTimeout(tt);tt=setTimeout(()=>t.classList.remove('show'),1900)}
function pop(n){n.animate([{transform:'scale(1)'},{transform:'scale(.9)'},{transform:'scale(1.04)'},{transform:'scale(1)'}],{duration:420,easing:'ease-out'})}

/* arc dial */
function makeDial(host,values,idx,onChange,unit){const step=13;
  host.innerHTML=`<div class="dial__ring"></div><div class="dial__items">${values.map((v,i)=>`<button class="dial__item" data-i="${i}" style="transform:rotate(${i*step}deg)">${v}</button>`).join('')}</div><div class="dial__needle"></div><div class="dial__value"><span class="d"></span><div class="small"></div></div>`;
  const items=$('.dial__items',host),val=$('.dial__value .d',host),lab=$('.dial__value .small',host);let cur=Math.max(0,idx);
  const set=(i,anim=true)=>{cur=Math.max(0,Math.min(values.length-1,i));items.style.transition=anim?'':'none';items.style.transform=`rotate(${-cur*step}deg)`;$$('.dial__item',host).forEach((b,j)=>b.classList.toggle('on',j===cur));
    const v=values[cur];if(val.textContent!==String(v)){val.textContent=v;val.animate([{transform:'translateY(14px)',opacity:0},{transform:'none',opacity:1}],{duration:320,easing:SPRING})}lab.textContent=unit(v);onChange(v)};
  set(cur,false);
  $$('.dial__item',host).forEach(b=>b.onclick=()=>set(+b.dataset.i));
  let x0=null,c0=0;host.addEventListener('pointerdown',e=>{if(e.target.closest('.dial__item'))return;x0=e.clientX;c0=cur;host.setPointerCapture(e.pointerId)});
  host.addEventListener('pointermove',e=>{if(x0===null)return;const d=Math.round((x0-e.clientX)/38);set(c0+d)});
  host.addEventListener('pointerup',()=>x0=null);
}

/* boot */
const ck=()=>{const d=new Date();const c=$('#clock');if(c)c.textContent=d.getHours()+':'+String(d.getMinutes()).padStart(2,'0')};ck();setInterval(ck,20000);
window.__ck={go,back,S};
go('splash',{type:'fade',root:true});
})();
