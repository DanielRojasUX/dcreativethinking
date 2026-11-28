/* Sunú Home · generated flat art (covers, scenes, map) */
(function(){
const PAL = {
  violet:{bg:'#5B3DF5',fg:'#FFFFFF',a:'#7E66FF',b:'#FFD447',c:'#FF9BD0',d:'#2B1A99'},
  yellow:{bg:'#FFD447',fg:'#5A3F00',a:'#FFE68A',b:'#F40046',c:'#5B3DF5',d:'#5A3F00'},
  orange:{bg:'#FF6B2C',fg:'#FFFFFF',a:'#FF8F5C',b:'#FFD447',c:'#5B3DF5',d:'#6B2200'},
  red:{bg:'#F40046',fg:'#FFFFFF',a:'#FF4A7E',b:'#FFD447',c:'#FF9BD0',d:'#7A0023'},
  pink:{bg:'#FF9BD0',fg:'#7B0E4B',a:'#FFC2E3',b:'#F40046',c:'#5B3DF5',d:'#7B0E4B'},
  teal:{bg:'#0F9D8F',fg:'#FFFFFF',a:'#2DBBAC',b:'#D8F25A',c:'#FFD447',d:'#07413B'},
  green:{bg:'#1E9B4F',fg:'#FFFFFF',a:'#3DBE6B',b:'#F4F1E6',c:'#FF9BD0',d:'#0B4A24'},
  peach:{bg:'#FFB48A',fg:'#6B2200',a:'#FFD2B5',b:'#C2410C',c:'#FFF6EC',d:'#6B2200'},
  chipotle:{bg:'#9A3412',fg:'#FFFFFF',a:'#C2501E',b:'#FFD447',c:'#F3EEE7',d:'#4A1606'},
  lime:{bg:'#D8F25A',fg:'#2E4500',a:'#E8FA92',b:'#5B3DF5',c:'#0F9D8F',d:'#2E4500'}
};
window.PAL = PAL;

window.coverArt = function(type, key){
  const p = PAL[key]; let s = '';
  switch(type){
    case 'sun': s = `<circle cx="196" cy="250" r="118" fill="${p.b}"/><path d="M78 318a118 118 0 0 1 236 0z" fill="${p.a}"/><circle cx="196" cy="250" r="44" fill="${p.c}"/>`; break;
    case 'dots': for(let r=0;r<4;r++)for(let c=0;c<4;c++){const big=(r+c)%3===0;s+=`<circle cx="${50+c*58}" cy="${150+r*52}" r="${big?24:16}" fill="${big?p.b:p.a}"/>`} break;
    case 'waves': for(let i=0;i<5;i++){s+=`<path d="M-10 ${170+i*36} q 40 -26 80 0 t 80 0 t 80 0 t 80 0 v 60 h -330z" fill="${i%2?p.a:p.b}" opacity="${i%2?1:.95}"/>`} break;
    case 'ring': s = `<circle cx="200" cy="230" r="112" fill="none" stroke="${p.b}" stroke-width="46"/><line x1="40" y1="330" x2="260" y2="120" stroke="${p.c}" stroke-width="10" stroke-linecap="round"/>`; break;
    case 'arch': s = `<path d="M30 330 V200 a52 52 0 0 1 104 0 V330z" fill="${p.a}"/><path d="M110 330 V170 a60 60 0 0 1 120 0 V330z" fill="#fff"/><circle cx="170" cy="230" r="26" fill="${p.b}"/>`; break;
    case 'grid': s = `<rect x="70" y="140" width="130" height="130" rx="10" fill="${p.b}" transform="rotate(-12 135 205)"/><rect x="120" y="190" width="120" height="120" rx="10" fill="${p.c}" transform="rotate(9 180 250)"/>`; break;
  }
  return `<svg class="cover__art" viewBox="0 0 230 318" preserveAspectRatio="xMidYMax slice" aria-hidden="true">${s}</svg>`;
};

/* ---- kitchen scenes ---- */
const I = {
  milk:(x,y)=>`<g transform="translate(${x},${y})"><rect x="0" y="18" width="34" height="62" rx="4" fill="#DCD5FF"/><path d="M0 18 L17 2 L34 18z" fill="#B9AEFF"/><rect x="5" y="40" width="24" height="16" rx="3" fill="#5B3DF5"/></g>`,
  eggs:(x,y)=>`<g transform="translate(${x},${y})"><rect x="0" y="14" width="78" height="22" rx="6" fill="#E9D8C4"/>${[0,1,2,3].map(i=>`<ellipse cx="${12+i*18}" cy="14" rx="8" ry="10" fill="#FFF6E6"/>`).join('')}</g>`,
  tomato:(x,y)=>`<g transform="translate(${x},${y})"><circle cx="13" cy="15" r="13" fill="#F40046"/><path d="M8 3 L13 7 L18 3" stroke="#0F9D8F" stroke-width="3" fill="none" stroke-linecap="round"/></g>`,
  avocado:(x,y)=>`<g transform="translate(${x},${y})"><ellipse cx="12" cy="17" rx="12" ry="16" fill="#2F5D2A"/><ellipse cx="12" cy="19" rx="7" ry="9" fill="#9CC25A"/></g>`,
  cilantro:(x,y)=>`<g transform="translate(${x},${y})"><path d="M18 50 L14 18 M18 50 L24 16 M18 50 L8 22" stroke="#3B8A3E" stroke-width="2.5"/><circle cx="12" cy="12" r="9" fill="#3FB950"/><circle cx="25" cy="10" r="9" fill="#2E9E44"/><circle cx="6" cy="20" r="7" fill="#46C25A"/></g>`,
  chicken:(x,y)=>`<g transform="translate(${x},${y})"><rect x="0" y="8" width="70" height="30" rx="8" fill="#E7E2EE"/><path d="M10 26 q10 -18 26 -12 q16 -6 24 10 q-20 10 -50 2z" fill="#FF9BD0"/></g>`,
  crema:(x,y)=>`<g transform="translate(${x},${y})"><rect x="0" y="8" width="30" height="34" rx="6" fill="#FFFFFF"/><rect x="-2" y="2" width="34" height="9" rx="3" fill="#F40046"/></g>`,
  cheese:(x,y)=>`<g transform="translate(${x},${y})"><path d="M0 30 L46 30 L46 8 z" fill="#FFF0B8"/><circle cx="34" cy="22" r="3" fill="#F2D77A"/></g>`,
  tortilla:(x,y)=>`<g transform="translate(${x},${y})"><rect x="0" y="0" width="64" height="26" rx="10" fill="#F2C27B"/><ellipse cx="32" cy="13" rx="20" ry="7" fill="#FFE2A8"/></g>`,
  lime:(x,y)=>`<g transform="translate(${x},${y})"><circle cx="8" cy="10" r="8" fill="#9BD12F"/><circle cx="22" cy="12" r="8" fill="#B5E33D"/></g>`,
  chile:(x,y)=>`<g transform="translate(${x},${y})"><ellipse cx="14" cy="6" rx="14" ry="4.5" fill="#0F9D8F" transform="rotate(-10 14 6)"/><ellipse cx="18" cy="14" rx="14" ry="4.5" fill="#12B3A2" transform="rotate(8 18 14)"/></g>`,
  onion:(x,y)=>`<g transform="translate(${x},${y})"><circle cx="13" cy="15" r="13" fill="#F1E6D6"/><path d="M13 2 v26 M6 6 q7 9 0 18 M20 6 q-7 9 0 18" stroke="#D8C4A8" stroke-width="1.5" fill="none"/></g>`,
  bottle:(x,y,c)=>`<g transform="translate(${x},${y})"><rect x="3" y="0" width="10" height="10" rx="2" fill="${c}"/><rect x="0" y="9" width="16" height="44" rx="5" fill="${c}"/></g>`,
  jar:(x,y,c,l)=>`<g transform="translate(${x},${y})"><rect x="0" y="8" width="40" height="52" rx="8" fill="${c}"/><rect x="-1" y="2" width="42" height="10" rx="3" fill="${l}"/><rect x="6" y="26" width="28" height="16" rx="3" fill="#fff" opacity=".7"/></g>`,
  can:(x,y,c)=>`<g transform="translate(${x},${y})"><rect x="0" y="0" width="32" height="44" rx="5" fill="${c}"/><rect x="0" y="14" width="32" height="16" fill="#fff" opacity=".75"/></g>`,
  bag:(x,y,c)=>`<g transform="translate(${x},${y})"><path d="M2 0 h46 l-2 56 h-42z" fill="${c}"/><rect x="10" y="20" width="30" height="14" rx="3" fill="#fff" opacity=".7"/></g>`
};

function fridgeBase(){
  return `<rect width="300" height="440" fill="#DCE9EC"/>
  <rect x="10" y="10" width="236" height="420" rx="18" fill="#F4FAFB"/>
  <rect x="252" y="10" width="40" height="420" rx="12" fill="#E8F1F3"/>
  ${[118,212,300].map(y=>`<rect x="18" y="${y}" width="220" height="7" rx="3" fill="#C9DDE2"/>`).join('')}
  ${[90,190,290,380].map(y=>`<rect x="254" y="${y}" width="36" height="5" rx="2" fill="#C9DDE2"/>`).join('')}
  <rect x="20" y="316" width="104" height="104" rx="12" fill="#E3EEF1"/><rect x="132" y="316" width="104" height="104" rx="12" fill="#E3EEF1"/>`;
}
window.scene = function(kind){
  let s = '';
  if(kind==='pantry'){
    s = `<rect width="300" height="440" fill="#EADFCF"/><rect x="14" y="14" width="272" height="412" rx="16" fill="#F6EEE2"/>
    ${[140,270,400].map(y=>`<rect x="14" y="${y}" width="272" height="10" fill="#C9A77C"/>`).join('')}
    ${I.jar(30,76,'#F3EEE7','#5B3DF5')}${I.jar(80,76,'#8C4A2F','#F40046')}${I.bag(134,82,'#FFB547')}${I.bag(190,82,'#FFD447')}${I.can(246,96,'#F40046')}
    ${I.can(30,226,'#8C4A2F')}${I.can(68,226,'#8C4A2F')}${I.bottle(116,218,'#FF6B2C')}${I.bottle(140,218,'#0F9D8F')}${I.jar(176,210,'#FFF0B8','#0F9D8F')}${I.bag(226,214,'#E9D8C4')}
    ${I.bag(34,342,'#F2C27B')}${I.jar(96,340,'#FF9BD0','#7B0E4B')}${I.can(152,356,'#5B3DF5')}${I.onion(200,374)}${I.onion(226,372)}${I.lime(250,380)}`;
    return svgWrap(s);
  }
  s = fridgeBase();
  if(kind==='after'){
    s += I.cheese(30,80)+I.jar(90,58,'#FFF0B8','#0F9D8F')+I.jar(140,58,'#F3EEE7','#FF6B2C')
      + I.eggs(28,176)+I.milk(120,128)+I.crema(166,170)+I.crema(202,170)
      + I.chicken(40,262)+I.tomato(140,276)+I.tomato(166,280)+I.onion(196,276)
      + I.cilantro(32,342)+I.chile(70,382)+I.chile(66,358)
      + I.lime(146,380)+I.avocado(186,368)+I.avocado(204,374)
      + I.bottle(262,34,'#F40046')+I.bottle(264,130,'#FF6B2C')+I.bottle(262,232,'#0F9D8F');
  } else {
    s += I.chicken(30,80)+I.cilantro(120,62)+I.tortilla(160,88)
      + I.cheese(36,184)+I.tomato(98,186)+I.tomato(124,190)+I.crema(160,170)+I.lime(200,192)
      + I.eggs(30,264)+I.onion(126,276)+I.avocado(160,270)+I.chile(194,284)
      + I.tomato(40,380)+I.onion(80,378)+I.crema(150,370)
      + I.milk(256,10)+I.bottle(262,130,'#F40046')+I.bottle(264,232,'#FF6B2C');
  }
  return svgWrap(s);
};
function svgWrap(inner,extra=''){return `<svg class="scene" viewBox="0 0 300 440" preserveAspectRatio="xMidYMid slice" aria-hidden="true">${inner}${extra}</svg>`}

/* detection boxes for the analyzing screen, drawn in scene coordinates */
window.detections = function(lang){
  const d = [
    [26,72,82,46,'Chicken breast','Pechuga de pollo'],[112,56,40,60,'Cilantro','Cilantro'],[96,184,56,34,'Tomatoes','Jitomates','b'],
    [156,164,40,46,'Crema','Crema'],[26,256,90,40,'Eggs','Huevos'],[156,262,40,44,'Avocado','Aguacate'],
    [190,278,40,30,'Serranos','Serranos'],[30,176,56,40,'Queso fresco','Queso fresco'],[252,6,40,86,'Milk','Leche']
  ];
  return d.map((r,i)=>`<g class="det-g" style="opacity:0;transition:opacity .4s ${0.25+i*0.28}s">
    <rect x="${r[0]}" y="${r[1]}" width="${r[2]}" height="${r[3]}" rx="8" fill="none" stroke="#D8F25A" stroke-width="2.5"/>
    <rect x="${r[0]}" y="${r[6]?r[1]+r[3]+3:r[1]-17}" width="${(lang==='es'?r[5]:r[4]).length*6.2+14}" height="15" rx="5" fill="#D8F25A"/>
    <text x="${r[0]+7}" y="${r[6]?r[1]+r[3]+14:r[1]-6}" font-family="Poppins" font-size="9.5" font-weight="600" fill="#2E4500">${lang==='es'?r[5]:r[4]}</text></g>`).join('');
};
window.svgWrap = svgWrap;

/* route map */
window.routeMap = function(){
  const blocks = [];
  for(let r=0;r<6;r++)for(let c=0;c<5;c++){blocks.push(`<rect x="${8+c*72}" y="${8+r*58}" width="62" height="48" rx="8" fill="${(r*5+c)%7===0?'#D9E8C4':'#F7F1E7'}"/>`)}
  return `<svg viewBox="0 0 360 330" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
  <rect width="360" height="330" fill="#E4DACB"/>${blocks.join('')}
  <path d="M-10 250 C 80 230, 160 280, 370 180" stroke="#fff" stroke-width="14" fill="none"/>
  <path class="route-path" d="M62 290 L62 240 L134 240 L134 124 L206 124 L206 66 L278 66 L278 182 L134 182 L134 240 L62 240 L62 290" stroke="#5B3DF5" stroke-width="7" fill="none" stroke-linejoin="round" stroke-linecap="round"/>
  <circle cx="62" cy="290" r="14" fill="#1C1830"/><path d="M56 292 l6 -7 l6 7 v6 h-12z" fill="#fff"/>
  <circle cx="206" cy="66" r="18" fill="#1C1830"/><text x="206" y="74" text-anchor="middle" font-family="Shoulders" font-weight="900" font-size="22" fill="#D8F25A">1</text>
  <circle cx="278" cy="182" r="18" fill="#0071CE"/><text x="278" y="190" text-anchor="middle" font-family="Shoulders" font-weight="900" font-size="22" fill="#FFC220">2</text>
  </svg>`;
};
})();
