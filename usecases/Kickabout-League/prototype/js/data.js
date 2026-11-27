/* Kickabout League: sample league data shared by every persona prototype */
window.KL = window.KL || {};
KL.league = { name: 'Liga Del Valle', season: 'Fall 2026', city: 'West Valley City, UT', venue: 'Rose Park Fields', matchday: 7, rules: { win: 3, draw: 1, loss: 0, yellowsForBan: 5, redBan: 1, refFee: 60, leagueFee: 450 } };
KL.teams = {
  HAL: { name: 'Halcones FC', short: 'Halcones', color: '#ff7a1a' },
  TIG: { name: 'Tigres del Norte', short: 'Tigres', color: '#ffd23f' },
  RWS: { name: 'Real Westside', short: 'Westside', color: '#6aa9ff' },
  DJA: { name: 'Deportivo Jalisco', short: 'Jalisco', color: '#ff4d5e' },
  ARP: { name: 'Atlético Rose Park', short: 'Rose Park', color: '#ff8fb1' },
  PUK: { name: 'Pumas Kearns', short: 'Pumas', color: '#c9a227' },
  GAL: { name: 'Los Galácticos', short: 'Galácticos', color: '#9b7bff' },
  UNM: { name: 'Unión Magna', short: 'Magna', color: '#2fd3b4' }
};
/* [matchday, home, away, home goals, away goals] */
KL.results = [[1,"HAL","UNM",4,1],[1,"TIG","GAL",2,1],[1,"RWS","PUK",1,1],[1,"DJA","ARP",4,2],[2,"HAL","GAL",1,1],[2,"UNM","PUK",2,0],[2,"TIG","ARP",4,3],[2,"RWS","DJA",1,1],[3,"HAL","PUK",1,3],[3,"GAL","ARP",4,2],[3,"UNM","DJA",4,2],[3,"TIG","RWS",0,1],[4,"HAL","ARP",4,1],[4,"PUK","DJA",2,1],[4,"GAL","RWS",0,3],[4,"UNM","TIG",1,2],[5,"HAL","DJA",1,1],[5,"ARP","RWS",0,0],[5,"PUK","TIG",0,1],[5,"GAL","UNM",2,1],[6,"HAL","RWS",4,1],[6,"DJA","TIG",3,2],[6,"ARP","UNM",3,2],[6,"PUK","GAL",2,2]];
KL.fixtures = [
  { id: 'm7a', md: 7, h: 'HAL', a: 'TIG', day: 'Sun, Nov 29', time: '8:00 PM', field: 'Field 2', ref: 'Marisol Ortega' },
  { id: 'm7b', md: 7, h: 'RWS', a: 'UNM', day: 'Sun, Nov 29', time: '6:30 PM', field: 'Field 1', ref: 'Javier Luna' },
  { id: 'm7c', md: 7, h: 'DJA', a: 'GAL', day: 'Sun, Nov 29', time: '8:00 PM', field: 'Field 1', ref: 'Javier Luna' },
  { id: 'm7d', md: 7, h: 'ARP', a: 'PUK', day: 'Sun, Nov 29', time: '6:30 PM', field: 'Field 2', ref: 'Marisol Ortega' }
];
KL.rosters = {
  HAL: [
    { n: 1, name: 'Luis Carrillo', pos: 'GK', g: 0, y: 0, paid: 'app' },
    { n: 2, name: 'Erick Soto', pos: 'DF', g: 0, y: 2, paid: 'cash' },
    { n: 4, name: 'Beto Salazar', pos: 'DF', g: 1, y: 1, paid: 'app', cap: true },
    { n: 5, name: 'Jonathan Ríos', pos: 'DF', g: 0, y: 4, paid: 'no' },
    { n: 6, name: 'Adrián Vela', pos: 'MF', g: 1, y: 0, paid: 'app' },
    { n: 7, name: 'Kevin Mora', pos: 'MF', g: 2, y: 1, paid: 'cash' },
    { n: 8, name: 'Samuel Duarte', pos: 'MF', g: 1, y: 0, paid: 'app' },
    { n: 9, name: 'Ricardo Peña', pos: 'FW', g: 2, y: 0, paid: 'no' },
    { n: 10, name: 'Diego Ramírez', pos: 'FW', g: 7, y: 1, paid: 'app', me: true },
    { n: 11, name: 'Brandon Ávila', pos: 'FW', g: 1, y: 0, paid: 'app' },
    { n: 14, name: 'Héctor Lugo', pos: 'MF', g: 0, y: 1, paid: 'no' },
    { n: 17, name: 'Omar Cisneros', pos: 'DF', g: 0, y: 5, paid: 'cash', ban: true }
  ],
  TIG: [
    { n: 1, name: 'Arturo Flores', pos: 'GK' }, { n: 3, name: 'Iker Ramos', pos: 'DF' }, { n: 4, name: 'Manuel Rojo', pos: 'DF' },
    { n: 5, name: 'César Ibarra', pos: 'DF' }, { n: 6, name: 'Pablo Nava', pos: 'MF' }, { n: 8, name: 'Gael Contreras', pos: 'MF' },
    { n: 9, name: 'Óscar Leyva', pos: 'FW' }, { n: 10, name: 'Alan Guzmán', pos: 'MF' }, { n: 11, name: 'Rubén Ortiz', pos: 'FW' },
    { n: 13, name: 'Jesús Zamora', pos: 'DF' }, { n: 19, name: 'Toño Bernal', pos: 'FW' }
  ]
};
KL.scorers = [
  { name: 'Diego Ramírez', t: 'HAL', g: 7 }, { name: 'Iván Cruz', t: 'DJA', g: 6 }, { name: 'Óscar Leyva', t: 'TIG', g: 5 },
  { name: 'Marco Tapia', t: 'UNM', g: 5 }, { name: 'Kevin Ochoa', t: 'ARP', g: 4 }, { name: 'Rubén Ortiz', t: 'TIG', g: 3 }
];
KL.fairplay = [ { t: 'RWS', pts: 4 }, { t: 'TIG', pts: 6 }, { t: 'GAL', pts: 7 }, { t: 'HAL', pts: 9 }, { t: 'DJA', pts: 11 } ];
KL.me = { HAL: { n: 10, name: 'Diego Ramírez', pos: 'Forward', g: 7, a: 3, y: 1, r: 0, mp: 6, min: 492 } };

/* Live match: seeded state, then shared between tabs through localStorage */
KL.LIVE_KEY = 'kl-live-v1';
KL.liveSeed = () => ({ id: 'm7a', status: 'live', minute: 34, events: [
  { min: 12, type: 'goal', t: 'HAL', n: 10 }, { min: 27, type: 'goal', t: 'TIG', n: 9 }, { min: 31, type: 'yellow', t: 'TIG', n: 4 }
] });
KL.loadLive = () => { try { const v = JSON.parse(localStorage.getItem(KL.LIVE_KEY)); if (v && v.events) return v; } catch (e) {} return KL.liveSeed(); };
KL.saveLive = (v) => { try { localStorage.setItem(KL.LIVE_KEY, JSON.stringify(v)); } catch (e) {} try { KL.bc && KL.bc.postMessage(v); } catch (e) {} };
try { KL.bc = new BroadcastChannel('kl-live'); } catch (e) {}
KL.onLive = (fn) => {
  addEventListener('storage', (e) => { if (e.key === KL.LIVE_KEY) fn(KL.loadLive()); });
  try { KL.bc && KL.bc.addEventListener('message', (e) => fn(e.data)); } catch (e) {}
};
KL.score = (live) => { const s = { HAL: 0, TIG: 0 }; live.events.forEach(e => { if (e.type === 'goal') s[e.t]++; }); return s; };

/* Standings from results, optionally including the live match */
KL.table = (live) => {
  const r = KL.league.rules, st = {};
  Object.keys(KL.teams).forEach(k => st[k] = { k, P: 0, W: 0, D: 0, L: 0, GF: 0, GA: 0, form: [] });
  const add = (h, a, gh, ga) => [[h, gh, ga], [a, ga, gh]].forEach(([t, f, g]) => {
    const s = st[t]; s.P++; s.GF += f; s.GA += g;
    if (f > g) { s.W++; s.form.push('W'); } else if (f === g) { s.D++; s.form.push('D'); } else { s.L++; s.form.push('L'); }
  });
  KL.results.forEach(([md, h, a, gh, ga]) => add(h, a, gh, ga));
  if (live) { const sc = KL.score(live); add('HAL', 'TIG', sc.HAL, sc.TIG); }
  return Object.values(st).map(s => ({ ...s, GD: s.GF - s.GA, Pts: s.W * r.win + s.D * r.draw + s.L * r.loss }))
    .sort((x, y) => y.Pts - x.Pts || y.GD - x.GD || y.GF - x.GF);
};
/* the finished version of the same match, used by reports when the live one is still running */
KL.finalSeed = () => ({ id: 'm7a', status: 'final', minute: 80, events: KL.liveSeed().events.concat([
  { min: 52, type: 'sub', t: 'TIG', n: 19 }, { min: 62, type: 'goal', t: 'TIG', n: 19 }, { min: 70, type: 'yellow', t: 'HAL', n: 7 },
  { min: 74, type: 'goal', t: 'HAL', n: 10 }, { min: 77, type: 'sub', t: 'HAL', n: 9 }
]) });
KL.report = () => { const l = KL.loadLive(); return l.status === 'final' ? l : KL.finalSeed(); };
