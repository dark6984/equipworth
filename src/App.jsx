import React from 'react';
import Home from './pages/Home.jsx';
import SignedOut from './pages/SignedOut.jsx';
import AppShell from './app/AppShell.jsx';
import LegalModal from './components/LegalModal.jsx';
import Toast from './components/Toast.jsx';

// Ported from the EquipWorth design prototype's `class Component extends
// DCLogic` (DCLogic being the design tool's alias for React.Component —
// constructor/state/setState/refs/lifecycle are all standard React). The
// logic here is unchanged from the design; only the render tail (JSX output)
// is new, since the original rendered into a template via a returned
// view-model object instead of JSX directly.
export default class App extends React.Component {
  constructor(props) {
    super(props);
    const U = (stock, year, make, model, cat, hours, cost, ask, comp, quick, max, days, acq, notes) =>
      ({ stock, year, make, model, cat, hours, cost, ask, comp, quick, max, days, acq, notes });
    this.units = [
      U('EW-2417', 2021, 'John Deere', '8R 340', 'Tractors', 1480, 289500, 342000, 328400, 318500, 344900, 34, 'Jun 15', [
        'Comp volume is strong: 11 sales in 90 days, spread is tight (±3.1%). Band is reliable.',
        'IVT + front duals adds ~$9K over base-spec comps; already reflected in Adj. column.',
        'Deere used 8R incentive (0%/48) effectively lowers buyer cost, supports holding near max.']),
      U('EW-2398', 2019, 'Case IH', 'Magnum 280', 'Tractors', 2910, 158000, 189900, 174200, 168900, 182500, 121, 'Mar 20', [
        'Ask is $15.7K over comp avg and the unit has crossed 120 days, carrying cost is eating the spread.',
        'Three comparable Magnums sold under $172K in the last 30 days. Market is drifting down ~1.2%/mo.',
        'At $174,500 the model projects sale in ~3 weeks with $16.5K margin.']),
      U('EW-2431', 2022, 'Kubota', 'M7-172', 'Tractors', 640, 112000, 129500, 131800, 126500, 136900, 18, 'Jul 1', [
        'Ask is below comp avg, you are leaving money on the table on a fresh, low-hour unit.',
        'Only 4 comps but all hammered above $128K. Low-hour M7s are scarce in region.',
        'Model supports raising to $134,900 with no meaningful days-to-sell penalty.']),
      U('EW-2405', 2020, 'John Deere', 'S780', 'Harvest', 1120, 312000, 359000, 344000, 337500, 356000, 88, 'Apr 22', [
        'Harvest window: combine demand peaks next 6 weeks, then falls off a cliff. Price to clear before September.',
        'Deere $15K trade-assist on S-series (ends Aug 15) is doing your discounting for you, hold ask, push the program.',
        'If unsold by Aug 15, model recommends immediate drop to $339,900.']),
      U('EW-2422', 2018, 'New Holland', 'T8.410', 'Tractors', 3450, 121000, 152000, 138700, 133900, 146500, 143, 'Feb 26', [
        '143 days on lot. Every comp in 60 days hammered below your ask.',
        'High-hour T8s are moving at auction only, retail interest at this spec is thin.',
        'Consider AuctionTime consignment if not sold at $135,900 within 3 weeks.']),
      U('EW-2440', 2023, 'John Deere', '6R 145', 'Tractors', 420, 148500, 164900, 166200, 161000, 172400, 9, 'Jul 10', [
        'Hot unit: 6R 1.9%/60 program is pulling buyers into exactly this spec.',
        'Comp avg exceeds your ask. Raise to $169,900, the incentive covers the difference for the buyer.',
        'Two inquiries logged this week before first price review.']),
      U('EW-2389', 2017, 'AGCO', 'Fendt 936', 'Tractors', 4100, 139000, 172500, 158900, 152000, 166800, 167, 'Feb 2', [
        'Longest-aged unit on the lot. Ask is $13.6K over comp avg with zero inquiries in 30 days.',
        'Fendt buyer pool in region is small; comps are mostly out-of-state hauls (freight-adjusted).',
        'Model strongly favors the quick-move end: $154,900 projects sale in ~2-3 weeks.']),
      U('EW-2426', 2021, 'Case IH', 'Steiger 470', 'Tractors', 1890, 298000, 344500, 339600, 329900, 351500, 52, 'May 28', [
        'Ask sits inside the comp band; no action urgent.',
        '4WD demand is seasonal, tillage season firmness expected through September.',
        'Hold current ask; re-evaluate at 75 days.']),
      U('EW-2435', 2020, 'Kubota', 'SVL97-2', 'Construction', 1240, 52500, 64900, 61300, 58900, 64500, 76, 'May 4', [
        'CTL market softened ~4% this quarter, comp band has moved down since listing.',
        'Ask is above the entire comp band. Nudge to $62,500 to stay visible in search filters.',
        'BigIron sales dominate comps; retail premium for this spec is ~5%, already applied.'])
    ];
    this.units.forEach((u, i) => this.decorate(u, i));
    const OPTS = {
      'EW-2417': [['IVT transmission', '+$6.5K'], ['Front duals', '+$3.8K'], ['Premium CommandView cab', '+$2.4K'], ['AutoTrac ready', '+$1.1K'], ['60 GPM hydraulics', '+$1.9K']],
      'EW-2398': [['Powershift 21-spd', '+$2.9K'], ['Deluxe cab', '+$1.2K'], ['540/1000 PTO', 'base'], ['Rear weight pkg', '+$800']],
      'EW-2431': [['KVT (CVT) transmission', '+$3.1K'], ['Suspended cab', '+$1.6K'], ['Front 3-pt hitch + PTO', '+$2.2K'], ['LED work lights', '+$400']],
      'EW-2405': [['ProDrive transmission', '+$4.0K'], ['Premium cab', '+$1.8K'], ['PowerCast tailboard', '+$2.6K'], ['26-ft unload auger', 'base'], ['Duals', '+$3.5K']],
      'EW-2422': [['Ultra Command powershift', '+$2.1K'], ['Deluxe cab', '+$900'], ['Diff lock', 'base'], ['Guidance-ready', '+$1.4K']],
      'EW-2440': [['AutoQuad Plus 20/20', '+$1.9K'], ['ComfortView cab', '+$1.3K'], ['620R loader prep', '+$2.8K'], ['Panorama roof', '+$600']],
      'EW-2389': [['Vario CVT', '+$3.4K'], ['Cab suspension', '+$1.0K'], ['Front linkage + PTO', '+$2.9K'], ['VarioGrip tire inflation', '+$2.1K']],
      'EW-2426': [['PowerDrive 16-spd', '+$2.5K'], ['Luxury cab', '+$1.7K'], ['High-flow hydraulics', '+$3.2K'], ['Tow cable', 'base']],
      'EW-2435': [['Enclosed cab w/ AC', '+$2.8K'], ['High-flow aux hydraulics', '+$1.9K'], ['2-speed travel', 'base'], ['Bucket + pallet forks', '+$1.5K']]
    };
    this.units.forEach(u => { u.opts = OPTS[u.stock] || [['Standard configuration', 'base']]; });
    this.stores = ['Kirksville', 'Moberly', 'Palmyra', 'Bloomfield'];
    this.roles = ['Store Manager', 'Sales', 'Appraiser', 'Service Writer'];
    this.team = [
      { name: 'Walt Hagen', role: 'Owner / CEO', store: 'All stores', joined: 'Founder', locked: true },
      { name: 'Drew Barnett', role: 'Store Manager', store: 'Kirksville', joined: 'Mar 2021' },
      { name: 'Casey Brandt', role: 'Sales', store: 'Kirksville', joined: 'Aug 2023' },
      { name: 'Miguel Ortega', role: 'Appraiser', store: 'Moberly', joined: 'Jan 2022' },
      { name: 'Terri Vance', role: 'Store Manager', store: 'Moberly', joined: 'Jun 2019' },
      { name: 'Rob Kessler', role: 'Sales', store: 'Palmyra', joined: 'Oct 2024' },
      { name: 'June Albrecht', role: 'Service Writer', store: 'Palmyra', joined: 'Apr 2020' },
      { name: 'Pete Dolan', role: 'Store Manager', store: 'Bloomfield', joined: 'Feb 2022' }
    ].map(p => ({ ...p, email: p.name.toLowerCase().replace(/[^a-z ]/g, '').trim().replace(/ +/g, '.') + '@legacyequip.com' }));
    this.apprData = {
      'John Deere': { '8R 340': 322000, '8R 310': 296000, '7R 250': 214000, '6R 145': 164000, '9R 490': 428000, 'S780': 348000 },
      'Case IH': { 'Magnum 280': 173000, 'Magnum 250': 162000, 'Steiger 470': 338000 },
      'Kubota': { 'M7-172': 129000, 'M7-152': 118000, 'SVL97-2': 60500 },
      'New Holland': { 'T8.410': 139000, 'T8.380': 128500 },
      'Fendt': { '936 Vario': 158000, '724 Vario': 172000 }
    };
    this.APP_VIEWS = ['home', 'dashboard', 'inventory', 'unit', 'appraiser', 'team', 'system', 'settings', 'chat', 'invites'];
    this._storedView = typeof localStorage !== 'undefined' ? localStorage.getItem('ewView') : null;
    this.state = {
      view: this.props.startOn ?? 'home', authed: false, user: null, booting: true,
      loginEmail: '', loginPassword: '', loginError: '', loginBusy: false,
      unitId: null, slider: {}, query: '', cat: 'All',
      apprMake: 'John Deere', apprModel: '8R 340', apprHours: 1500, apprCond: 'Good',
      teamFilter: 'All', addOpen: false, nName: '', nRole: 'Sales', nStore: 'Kirksville',
      watch: { 'EW-2398': true, 'EW-2405': true }, deal: {},
      legal: null,
      userMenu: false, theme: (typeof localStorage !== 'undefined' && localStorage.getItem('ewTheme3')) || 'field',
      cpw: '', npw: '', npw2: '', lookback: 90, strategy: 'Balanced',
      notifs: { digest: true, drops: true, bulletins: false },
      chatMenu: null, renameId: null, renameVal: '', delId: null, schedOpen: false, schedId: null, schedFreq: 'Daily', schedTime: '7:00 AM',
      chats: [
        { id: 1, title: 'Deere incentives rundown', when: 'Yesterday', cat: 'Incentives', schedule: { freq: 'Daily', time: '7:00 AM' }, messages: [
          { who: 'me', lines: ["What do I need to know about Deere's incentives today?"] },
          { who: 'bot', lines: ['Three things mattered yesterday: 0%/48 on used 8R/9R (or $9.5K cash-in-lieu), 1.9%/60 on MY2020+ 6R/7R, and the $15K S-series trade-assist ending Aug 15. PowerGard inspection required over 2,000 hrs.'] },
          { who: 'bot', badge: 'Scheduled digest · today 7:00 AM', lines: ['No new bulletins overnight. Unchanged: 0%/48 used 8R/9R, 1.9%/60 6R/7R, $15K S-series trade-assist, 27 days left on that clock. Heads up: BigIron comps are still missing from the bands (collector down since Jul 17).'], actions: [{ label: 'Open the S780 · EW-2405', stock: 'EW-2405' }] }] },
        { id: 2, title: 'Combine trade assist deadline', when: 'Jul 14', cat: 'Incentives', schedule: null, messages: [
          { who: 'me', lines: ['Combine trade assist deadline?'] },
          { who: 'bot', lines: ['$15,000 S-series trade-assist, trade must be on our books by Aug 15, hard deadline. Used S770/S780/S790, MY2019+. Stacks with 3.9/48, not with cash-in-lieu.'] }] },
      ], activeChat: null, nextChat: 3,
      typing: false, chatInput: '', toast: null, count: 1, revIdx: 0
    };
    this.chatRef = React.createRef();
    this.fileRef = React.createRef();
    this.chatCats = [
      ['Incentives', 'ph-megaphone', 'var(--color-accent)'],
      ['Financing', 'ph-bank', 'var(--color-accent-2-400)'],
      ['Competitive', 'ph-sword', 'var(--color-harvest)'],
      ['General', 'ph-chat-circle', 'var(--color-sky)']];
  }

  decorate(u, i) {
    const srcs = ['TractorHouse', 'AuctionTime', 'Machinery Pete', 'Purple Wave', 'BigIron'];
    const dates = ['Jul 11', 'Jul 2', 'Jun 24', 'Jun 12', 'May 30'];
    const specs = ['same spec', 'lower option pkg', 'premium pkg', 'same spec', 'higher hours'];
    const offs = [0.028, -0.041, 0.052, -0.012, -0.063];
    const hoffs = [-180, 420, -320, 90, 610];
    u.comps = srcs.map((s, j) => {
      const price = Math.round(u.comp * (1 + offs[(i + j) % 5]) / 100) * 100;
      const adj = Math.round(u.comp * (1 + offs[(i + j) % 5] * 0.35) / 100) * 100;
      return { src: srcs[(i + j) % 5], date: dates[j], spec: specs[(i + j * 2) % 5], hrs: u.hours + hoffs[(i + j) % 5], price, adj };
    });
    u.signal = u.ask < u.comp ? 'Hot' : (u.days > 110 || u.ask > u.comp * 1.06) ? 'Reprice' : u.days > 70 ? 'Watch' : 'Hold';
  }

  exportCsv() {
    const head = 'stock,year,make,model,category,hours,cost,current_ask,comp_avg,quick_move,max_profit,days_on_lot,signal';
    const lines = this.units.map(u => [u.stock, u.year, u.make, u.model, u.cat, u.hours, u.cost, u.ask, u.comp, u.quick, u.max, u.days, u.signal].join(','));
    const blob = new Blob([head + '\n' + lines.join('\n')], { type: 'text/csv' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob); a.download = 'equipworth-inventory.csv'; a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 2000);
    this.toast('Exported ' + this.units.length + ' units to CSV');
  }

  importCsv(ev) {
    const file = ev.target.files && ev.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const lines = String(reader.result).trim().split(/\r?\n/);
        const cols = lines[0].toLowerCase().split(',').map(c => c.trim());
        const idx = n => cols.findIndex(c => c.includes(n));
        const iStock = idx('stock'), iYear = idx('year'), iMake = idx('make'), iModel = idx('model'),
          iCat = idx('categ'), iHours = idx('hour'), iCost = idx('cost'), iAsk = idx('ask'), iDays = idx('day');
        if (iMake < 0 || iModel < 0) { this.toast('Import failed: need at least make and model columns'); return; }
        let n = 0;
        lines.slice(1).forEach((ln, k) => {
          if (!ln.trim()) return;
          const v = ln.split(',').map(x => x.trim());
          const num = (i2, d) => { const x = parseFloat((v[i2] || '').replace(/[$,]/g, '')); return isNaN(x) ? d : x; };
          const ask = num(iAsk, 100000);
          const u = {
            stock: iStock >= 0 && v[iStock] ? v[iStock] : 'EW-' + (2450 + this.units.length),
            year: Math.round(num(iYear, 2020)), make: v[iMake], model: v[iModel],
            cat: iCat >= 0 && v[iCat] ? v[iCat] : 'Tractors',
            hours: Math.round(num(iHours, 1500)), cost: num(iCost, ask * 0.85), ask,
            comp: Math.round(ask * 0.955 / 100) * 100, quick: Math.round(ask * 0.925 / 100) * 100, max: Math.round(ask * 1.015 / 100) * 100,
            days: Math.round(num(iDays, 0)), acq: 'Imported',
            notes: ['Imported from CSV: comp band estimated from ask until the next overnight comp pass.'],
            opts: [['Standard configuration', 'base']]
          };
          this.decorate(u, this.units.length + k);
          this.units.push(u); n++;
        });
        this.toast('Imported ' + n + ' units · comp bands rebuild on the next overnight pass');
        this.forceUpdate();
      } catch (e2) { this.toast('Import failed: check the CSV format'); }
    };
    reader.readAsText(file);
    ev.target.value = '';
  }

  fmt(n) { return '$' + Math.round(n).toLocaleString('en-US'); }
  fmtK(n) { return n >= 1e6 ? '$' + (n / 1e6).toFixed(2) + 'M' : '$' + (n / 1000).toFixed(n < 100000 ? 1 : 0) + 'K'; }

  startCount() {
    cancelAnimationFrame(this._raf);
    const t0 = performance.now();
    const step = now => {
      const p = Math.min(1, (now - t0) / 800);
      this.setState({ count: 1 - Math.pow(1 - p, 3) });
      if (p < 1) this._raf = requestAnimationFrame(step);
    };
    this._raf = requestAnimationFrame(step);
  }

  saveView(view) {
    try { if (typeof localStorage !== 'undefined') localStorage.setItem('ewView', view); } catch (e) {}
  }

  nav(view) { this.setState({ view, userMenu: false }); if (view === 'dashboard') this.startCount(); this.saveView(view); }
  openUnit(stock) { this.setState({ view: 'unit', unitId: stock }); this.saveView('unit'); }

  async checkSession() {
    try {
      const res = await fetch('/api/auth/me');
      if (res.ok) {
        const { user } = await res.json();
        const storedView = this._storedView;
        const view = storedView && this.APP_VIEWS.includes(storedView) ? storedView : 'dashboard';
        this.setState({ user, authed: true, booting: false, view });
        if (view === 'dashboard') this.startCount();
        return;
      }
    } catch (e) {}
    this.setState({ user: null, authed: false, booting: false });
  }

  async submitLogin() {
    const email = this.state.loginEmail.trim();
    const password = this.state.loginPassword;
    if (!email || !password) { this.setState({ loginError: 'Enter your email and password' }); return; }
    this.setState({ loginBusy: true, loginError: '' });
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) { this.setState({ loginBusy: false, loginError: data.error || 'Invalid email or password' }); return; }
      this.setState({ authed: true, user: data.user, loginBusy: false, loginPassword: '', loginError: '' });
      this.nav('dashboard');
    } catch (e) {
      this.setState({ loginBusy: false, loginError: 'Could not reach the server. Try again.' });
    }
  }

  async signOut() {
    this.setState({ authed: false, user: null, view: 'signedout', userMenu: false });
    this.saveView('signedout');
    this.toast('Signed out');
    try { await fetch('/api/auth/logout', { method: 'POST' }); } catch (e) {}
  }

  themeTokens(m) {
    const o = {};
    const set = (role, vals) => vals.forEach((v, i) => { o['--color-' + role + '-' + ((i + 1) * 100)] = v; });
    if (m === 'midnight') {
      Object.assign(o, { '--color-bg': '#0C1117', '--color-surface': '#131A22', '--color-text': '#E8EBEF', '--color-accent': '#47A263', '--color-accent-2': '#E0A458', '--color-divider': 'rgba(232,235,239,.13)', '--shadow-sm': '0 0 0 1px #28303A', '--shadow-md': '0 0 0 1px #303840,0 8px 24px rgba(0,0,0,.55)', '--shadow-lg': '0 0 0 1px #464E58,0 18px 48px rgba(0,0,0,.65)' });
      set('neutral', ['#F1F3F6', '#DDE1E7', '#C0C6CE', '#9BA3AD', '#7B838E', '#5F6771', '#464E58', '#303840', '#1A2128']);
      set('accent', ['#E9F6EC', '#CFEAD6', '#A3D8B1', '#6FBF85', '#47A263', '#35854E', '#28683D', '#1D4A2C', '#122F1C']);
      set('accent-2', ['#FAF0DF', '#F3DDB9', '#E8C28A', '#E0A458', '#C9822E', '#A66722', '#7F4E1B', '#573514', '#33200C']);
      Object.assign(o, { '--color-harvest': '#DE7350', '--color-harvest-bg': '#3A1F14', '--color-harvest-ink': '#F0BCA6', '--color-sky': '#7FB3D5', '--color-sky-bg': '#14283A', '--color-sky-ink': '#B7D4E8' });
    } else if (m === 'field') {
      Object.assign(o, { '--color-bg': '#ECF1E4', '--color-surface': '#F9FBF5', '--color-text': '#1B211A', '--color-accent': '#3F8A34', '--color-accent-2': '#A66722', '--color-divider': 'rgba(27,33,26,.15)', '--shadow-sm': '0 0 0 1px #DCE2D0', '--shadow-md': '0 0 0 1px #D0D8C2,0 6px 18px rgba(27,33,26,.08)', '--shadow-lg': '0 0 0 1px #BEC7AC,0 16px 40px rgba(27,33,26,.14)' });
      set('neutral', ['#1B211A', '#2F362D', '#464F43', '#606A5C', '#7B8577', '#9AA394', '#BBC2B3', '#DBDFD0', '#EDF0E4']);
      set('accent', ['#14290F', '#1E3D17', '#2F6B28', '#3F8A34', '#55A945', '#7BC96A', '#A9DB94', '#D8EDCD', '#EFF7EA']);
      set('accent-2', ['#33200C', '#573514', '#7F4E1B', '#A66722', '#C9822E', '#E0A458', '#E8C28A', '#F3DDB9', '#FAF0DF']);
      Object.assign(o, { '--color-harvest': '#B65427', '--color-harvest-bg': '#F6E0D2', '--color-harvest-ink': '#7F3A16', '--color-sky': '#3F7396', '--color-sky-bg': '#E1ECF3', '--color-sky-ink': '#2B516C' });
    } else if (m === 'terminal' || m === 'dark') {
      Object.assign(o, { '--color-bg': '#0F1411', '--color-surface': '#171D19', '--color-text': '#EDEBE2', '--color-accent': '#55A945', '--color-accent-2': '#E0A458', '--color-divider': 'rgba(237,235,226,.13)', '--shadow-sm': '0 0 0 1px #2A322B', '--shadow-md': '0 0 0 1px #333B34,0 8px 24px rgba(0,0,0,.5)', '--shadow-lg': '0 0 0 1px #4C5249,0 18px 48px rgba(0,0,0,.6)' });
      set('neutral', ['#F2F1EA', '#DFDED4', '#C4C4B8', '#A3A499', '#83857B', '#666B61', '#4C5249', '#333B34', '#1D2420']);
      set('accent', ['#EAF6E4', '#D2ECC6', '#A9DB94', '#7BC96A', '#55A945', '#3F8A34', '#2F6B28', '#224D1E', '#163315']);
      set('accent-2', ['#FAF0DF', '#F3DDB9', '#E8C28A', '#E0A458', '#C9822E', '#A66722', '#7F4E1B', '#573514', '#33200C']);
      Object.assign(o, { '--color-harvest': '#D96C47', '--color-harvest-bg': '#3B1F14', '--color-harvest-ink': '#F0B79F', '--color-sky': '#6FA7C7', '--color-sky-bg': '#16303F', '--color-sky-ink': '#A9CCE2' });
    } else {
      Object.assign(o, { '--color-bg': '#F2F0E9', '--color-surface': '#FBFAF6', '--color-text': '#1A1F1B', '--color-accent': '#3F8A34', '--color-accent-2': '#A66722', '--color-divider': 'rgba(26,31,27,.15)', '--shadow-sm': '0 0 0 1px #E3E0D5', '--shadow-md': '0 0 0 1px #D8D5C8,0 6px 18px rgba(26,31,27,.08)', '--shadow-lg': '0 0 0 1px #C8C5B6,0 16px 40px rgba(26,31,27,.14)' });
      set('neutral', ['#1A1F1B', '#2E342F', '#454C46', '#5F675F', '#7A8279', '#9AA097', '#BBBFB4', '#DDDBD0', '#EFEDE5']);
      set('accent', ['#14290F', '#1E3D17', '#2F6B28', '#3F8A34', '#55A945', '#7BC96A', '#A9DB94', '#D8EDCD', '#EFF7EA']);
      set('accent-2', ['#33200C', '#573514', '#7F4E1B', '#A66722', '#C9822E', '#E0A458', '#E8C28A', '#F3DDB9', '#FAF0DF']);
      Object.assign(o, { '--color-harvest': '#B65427', '--color-harvest-bg': '#F6E0D2', '--color-harvest-ink': '#7F3A16', '--color-sky': '#3F7396', '--color-sky-bg': '#E1ECF3', '--color-sky-ink': '#2B516C' });
    }
    return o;
  }

  applyTheme(m) {
    const t = this.themeTokens(m), r = document.documentElement;
    for (const k in t) r.style.setProperty(k, t[k]);
  }

  setTheme(m) {
    try { localStorage.setItem('ewTheme3', m); } catch (e) {}
    this.setState({ theme: m });
    this.applyTheme(m);
  }

  changePw() {
    const { cpw, npw, npw2 } = this.state;
    if (!cpw || !npw) { this.toast('Fill in the current and new password fields'); return; }
    if (npw.length < 8) { this.toast('New password needs at least 8 characters'); return; }
    if (npw !== npw2) { this.toast("New passwords don't match"); return; }
    this.setState({ cpw: '', npw: '', npw2: '' });
    this.toast('Password updated');
  }

  componentDidMount() {
    this.applyTheme(this.state.theme);
    this.checkSession();
    if (typeof window !== 'undefined') {
      if (window.__ewRevTimer) clearInterval(window.__ewRevTimer);
      window.__ewRevTimer = setInterval(() => {
        this.setState(s => (s.view === 'home' ? { revNow: Date.now() } : null));
      }, 900);
      this._rev = window.__ewRevTimer;
    }
  }

  componentWillUnmount() {
    clearInterval(this._rev);
    cancelAnimationFrame(this._raf);
    clearTimeout(this._t);
    clearTimeout(this._toastT);
  }

  componentDidUpdate() { const el = this.chatRef.current; if (el) el.scrollTop = el.scrollHeight; }

  botReply(text) {
    const t = text.toLowerCase();
    if (/(incentive|today|know|what.?s new|bulletin)/.test(t) && !/6r|kubota|combine|s7/.test(t)) return [
      'Three things matter this week. Everything else in the bulletins is noise.',
      '• Used 8R/9R: 0% for 48 mo OR $9,500 cash-in-lieu (JDF, tier-1 credit). Runs through Jul 31.',
      '• 6R/7R, MY2020+ under 2,500 hrs: 1.9% for 60 mo. No cash option this cycle.',
      '• S-series combines: $15,000 trade-assist if the trade is on our books by Aug 15. This is the lever for the S780 sitting at 88 days.',
      'Fine print that bites: units over 2,000 hrs need a PowerGard inspection before JDF funds, and cash-in-lieu does NOT stack with doc-fee waivers.',
      'Nothing changed on compact/turf or CCE this week.'];
    if (/6r|7r/.test(t)) return [
      '6R/7R program, current cycle:',
      '• 1.9% for 60 mo via JDF on MY2020+ with under 2,500 hrs. That covers the 6R 145 on the lot (420 hrs).',
      '• Rate is buyer-facing, no dealer buy-down this cycle, so it costs us nothing to push it.',
      '• Expires with the Jul 31 bulletin unless renewed; last three cycles it renewed unchanged.',
      'Sales angle: at $169,900 financed at 1.9/60, payment lands ~$2,970/mo, under the psychological $3K line.'];
    if (/combine|s7|harvest/.test(t)) return [
      'S-series combines:',
      '• $15,000 trade-assist, trade must be on our books by Aug 15, hard deadline, no extensions granted last year.',
      '• Applies to used S770/S780/S790, MY2019+.',
      '• Stacks with standard JDF used rates (currently 3.9/48) but NOT with cash-in-lieu.',
      'The S780 (EW-2405) is the unit to move with this. After Aug 15 the model wants a $19K price drop instead, the program is cheaper.'];
    if (/kubota|case|competitive|vs/.test(t)) return [
      'Competitive picture this month:',
      "• Kubota: 0% for 60 mo on M7 series, stronger paper than Deere's 1.9, and it's hurting mid-frame Deere conversions.",
      '• Case IH is running dealer cash on Magnums ($7,500), which explains the soft Magnum comps, their dealers are discounting.',
      "Counter: Deere's 0%/48 on used 8R/9R is the only genuinely aggressive Deere paper right now. Lead with it on big-frame deals."];
    if (/powergard|inspection|warranty/.test(t)) return [
      'PowerGard requirement, short version:',
      '• Any used unit over 2,000 hrs needs a completed PowerGard inspection before JDF releases incentive funding.',
      '• Inspection is on us (~$450, service dept books it, 2-day turnaround currently).',
      '• Deere units only, on our lot it currently touches the 8R 340 if it crosses 2,000 hrs.'];
    return [
      'I track Deere incentive bulletins, JDF financing programs, trade-assists and competitive offers.',
      "Try: 'what do I need to know about Deere incentives today', '6R financing', 'combine trade assist', or 'what's Kubota running against us'."];
  }

  botActions(text) {
    const t = text.toLowerCase();
    if (/combine|s7|harvest/.test(t)) return [{ label: 'Open the S780 · EW-2405', stock: 'EW-2405' }];
    if (/6r|7r/.test(t)) return [{ label: 'Open the 6R 145 · EW-2440', stock: 'EW-2440' }];
    if (/kubota|case|competitive|vs/.test(t)) return [{ label: 'Open the Magnum 280 · EW-2398', stock: 'EW-2398' }];
    if (/incentive|today|know|bulletin/.test(t)) return [
      { label: 'Open the S780 · EW-2405', stock: 'EW-2405' },
      { label: 'Open the 6R 145 · EW-2440', stock: 'EW-2440' }];
    return [];
  }

  send(text) {
    if (!text.trim()) return;
    const mkTitle = text.length > 36 ? text.slice(0, 36) + '…' : text;
    const mkCat = /incentive|assist|bulletin|program/i.test(text) ? 'Incentives' : /financ|rate|term|%|apr|payment/i.test(text) ? 'Financing' : /kubota|case|vs|against|competit/i.test(text) ? 'Competitive' : 'General';
    this.setState(s => {
      if (s.activeChat == null || !s.chats.some(c => c.id === s.activeChat)) {
        const id = s.nextChat;
        return {
          chats: [...s.chats, { id, title: mkTitle, when: 'Today', cat: mkCat, schedule: null, messages: [{ who: 'me', lines: [text] }] }],
          activeChat: id, nextChat: id + 1, chatInput: '', typing: true
        };
      }
      return {
        chats: s.chats.map(c => c.id === s.activeChat ? { ...c, messages: [...c.messages, { who: 'me', lines: [text] }] } : c),
        chatInput: '', typing: true
      };
    });
    clearTimeout(this._t);
    this._t = setTimeout(() => {
      this.setState(s => ({
        typing: false,
        chats: s.chats.map(c => c.id === s.activeChat ? { ...c, messages: [...c.messages, { who: 'bot', lines: this.botReply(text), actions: this.botActions(text) }] } : c)
      }));
    }, 1100);
  }

  toast(msg) {
    clearTimeout(this._toastT);
    this.setState({ toast: msg });
    this._toastT = setTimeout(() => this.setState({ toast: null }), 3200);
  }

  spark(vals, w, h) {
    const min = Math.min(...vals), max = Math.max(...vals), r = max - min || 1;
    return vals.map((v, i) => (i / (vals.length - 1) * w).toFixed(1) + ',' + (h - 2 - (v - min) / r * (h - 4)).toFixed(1)).join(' ');
  }

  renderVals() {
    const s = this.state;
    const agingThreshold = this.props.agingThreshold ?? 90;
    const dealerName = this.props.dealerName ?? 'Heartland Ag & Turf · 4 locations';
    const units = this.units;
    const tagClass = sig => sig === 'Hot' ? 'tag-accent' : sig === 'Reprice' ? 'tag-harvest' : sig === 'Watch' ? 'tag-accent-2' : 'tag-neutral';
    const titles = { dashboard: 'Dashboard', inventory: 'Used inventory', unit: 'Unit pricing', appraiser: 'Trade appraiser', team: 'Team & stores', chat: 'Worth AI, market copilot', system: 'System status', settings: 'Settings', invites: 'Invite teammates' };
    const navDefs = [
      ['dashboard', 'ph-squares-four', 'Dashboard'],
      ['inventory', 'ph-tractor', 'Inventory'],
      ['unit', 'ph-chart-line-up', 'Unit pricing'],
      ['appraiser', 'ph-calculator', 'Trade appraiser'],
      ['chat', 'ph-sparkle', 'Worth AI']];
    const adminDefs = [
      ['team', 'ph-users-three', 'Team'],
      ['system', 'ph-activity', 'System status'],
      ...(s.user && s.user.isAdmin ? [['invites', 'ph-envelope-simple', 'Invites']] : [])];
    const navMap = ([v, icon, label]) => ({
      icon, label,
      go: () => v === 'unit' ? this.openUnit(s.unitId || units[1].stock) : this.nav(v),
      style: 'display:flex;align-items:center;gap:10px;width:100%;text-align:left;font:inherit;font-size:13px;padding:8px 10px;border:none;border-radius:8px;cursor:pointer;' +
        (s.view === v ? 'background:rgba(237,235,226,.12);color:#F2F1EA;box-shadow:inset 2px 0 0 #E0A458;' : 'background:transparent;color:rgba(237,235,226,.62);')
    });
    const navItems = navDefs.map(navMap);
    const adminItems = adminDefs.map(navMap);
    const firstName = (s.user && s.user.name) ? s.user.name.split(' ')[0] : 'there';
    // home
    const features = [
      { icon: 'ph-gavel', title: 'Auction comp engine', body: 'Every sold lot from five marketplaces, matched to your units and normalized for hours, condition and options. New comps land before you pour coffee.' },
      { icon: 'ph-arrows-left-right', title: 'Two-price strategy', body: 'Not one number: a band. The max-profit price, the quick-move price, and a days-to-sell model for everything in between. You pick the tradeoff.' },
      { icon: 'ph-headset', title: 'The Incentive Desk', body: 'A staff chatbot that reads every John Deere bulletin and answers in plain language. Ask what changed today; get the three lines that matter.' }].map((f, i) => ({
        ...f,
        cardStyle: 'padding:22px;gap:10px;transition:transform .2s,box-shadow .2s;border-top:3px solid ' + (i === 1 ? 'var(--color-harvest)' : i === 2 ? 'var(--color-sky)' : 'var(--color-accent)') + ';animation:ewfade .5s ' + (0.05 + i * 0.08).toFixed(2) + 's ease both',
        tileStyle: 'width:38px;height:38px;border-radius:var(--radius-md);display:grid;place-items:center;background:' + (i === 1 ? 'var(--color-harvest-bg)' : i === 2 ? 'var(--color-sky-bg)' : 'var(--color-accent-900)'),
        iconColor: i === 1 ? 'var(--color-harvest-ink)' : i === 2 ? 'var(--color-sky-ink)' : 'var(--color-accent-300)'
      }));
    const plans = [
      { name: 'Single store', price: '$399', per: '/mo', blurb: 'One rooftop, unlimited users.', featured: false,
        rows: ['All five auction sources', 'Two-price strategy + comp bands', 'Trade appraiser', 'Incentive Desk chatbot'], cta: 'Contact sales' },
      { name: 'Multi-store', price: '$329', per: '/store/mo', blurb: '2–10 rooftops, shared inventory.', featured: true,
        rows: ['Everything in Single store', 'Cross-store transfer suggestions', 'Role-based team access', 'DMS inventory sync'], cta: 'Contact sales' },
      { name: 'Enterprise', price: "Let's talk", per: '', blurb: '10+ rooftops or custom data feeds.', featured: false,
        rows: ['Everything in Multi-store', 'Custom auction sources', 'API access + data export', 'Dedicated onboarding'], cta: 'Contact sales' }
    ].map(p => ({
      ...p,
      cardStyle: 'position:relative;display:flex;flex-direction:column;gap:10px;padding:26px;background:var(--color-surface);border-radius:12px;border:1px solid ' + (p.featured ? 'var(--color-accent-2-400)' : 'var(--color-divider)') + (p.featured ? ';box-shadow:0 18px 48px rgba(0,0,0,.35)' : ''),
      kickerColor: p.featured ? 'var(--color-accent-300)' : 'var(--color-neutral-500)',
      priceColor: p.featured ? 'var(--color-accent-300)' : 'var(--color-text)',
      checkColor: p.featured ? 'var(--color-accent)' : 'var(--color-neutral-500)',
      btnClass: p.featured ? 'btn-primary' : 'btn-secondary'
    }));
    const legalDocs = {
      terms: { title: 'Terms of Use', body: [
        ['1. Acceptance', 'By accessing EquipWorth you agree to these terms on behalf of your dealership. If you do not agree, do not use the service.'],
        ['2. The service', 'EquipWorth aggregates publicly reported auction results and produces suggested pricing. Suggestions are decision support, not appraisals or guarantees of sale price.'],
        ['3. Your responsibility', 'You are responsible for the prices you set and the representations you make to customers. Verify every incentive and financing term against official Deere & Company bulletins before quoting.'],
        ['4. Acceptable use', 'You may not resell, scrape, or redistribute EquipWorth comp data outside your dealership without written consent.'],
        ['5. Availability & liability', 'The service is provided "as is." EquipWorth is not liable for lost profit, mispriced units, or decisions made from the data. This is a demonstration product.']
      ] },
      privacy: { title: 'Privacy Policy', body: [
        ['What we collect', 'Account details (name, email, dealership, role) and the inventory data you sync or import. We log usage to improve the pricing model.'],
        ['What we do not do', 'We never sell your inventory data or share your pricing with competing dealerships. Your lot data is yours.'],
        ['Auction data', 'Comparable sales are drawn from publicly reported auction results and are not personal information.'],
        ['Retention & control', 'You can export or delete your inventory data at any time from Settings. Deleting your account removes your dealership data within 30 days.'],
        ['Contact', 'Questions about your data: privacy@equipworth.com.']
      ] }
    };
    const steps = [
      { n: '1.', title: 'Sync your inventory', body: 'Stock numbers, hours, cost basis and current asks come in from your DMS. No re-keying.' },
      { n: '2.', title: 'We match comps overnight', body: 'The engine pulls the night’s hammer prices, spec-adjusts them to each of your units and rebuilds every comp band.' },
      { n: '3.', title: 'You reprice with confidence', body: 'Flags on the units that drifted, a suggested number for each, and one click to push it to your listings.' }].map((st3, i) => ({
        ...st3, bar: i === 0 ? '#3F8A34' : i === 1 ? '#7BC96A' : '#3F7396',
        style: 'animation:ewfade .5s ' + (0.05 + i * 0.1).toFixed(2) + 's ease both'
      }));
    const bandStats = [
      { v: '38,400+', l: 'auction comps indexed and spec-adjusted' },
      { v: '22%', l: 'faster inventory turns for desks pricing inside the band' },
      { v: '5', l: 'marketplaces watched, every night' },
      { v: '$4.1M', l: 'average dealer inventory under management' }];
    const tickerBase = [
      { unit: '2020 JD 8R 310 · 2,140h', price: '$301,000', delta: '−4.2%', src: 'Purple Wave' },
      { unit: '2019 CIH Magnum 250 · 3,020h', price: '$164,500', delta: '−6.8%', src: 'BigIron' },
      { unit: '2022 Kubota M7-152 · 890h', price: '$121,750', delta: '+2.1%', src: 'AuctionTime' },
      { unit: '2021 JD S770 · 980 sep h', price: '$338,000', delta: '−1.4%', src: 'Machinery Pete' },
      { unit: '2018 NH T8.380 · 3,600h', price: '$128,900', delta: '−7.5%', src: 'TractorHouse' },
      { unit: '2023 JD 6R 145 · 310h', price: '$171,200', delta: '+3.0%', src: 'AuctionTime' },
      { unit: '2017 Fendt 936 · 4,480h', price: '$149,500', delta: '−5.9%', src: 'BigIron' },
      { unit: '2021 CIH Steiger 470 · 2,050h', price: '$336,000', delta: '−0.8%', src: 'Purple Wave' }];
    const ticker = [...tickerBase, ...tickerBase].map(t => ({ ...t, deltaColor: t.delta.startsWith('+') ? '#2F6B28' : '#B65427' }));
    const heroBoard = tickerBase.slice(0, 5).map(t2 => ({ ...t2, deltaColor: t2.delta.startsWith('+') ? '#7BC96A' : '#D96C47' }));
    // dashboard
    const e = s.count;
    const totalVal = units.reduce((a, u) => a + u.ask, 0);
    const totalCost = units.reduce((a, u) => a + u.cost, 0);
    const avgDays = units.reduce((a, u) => a + u.days, 0) / units.length;
    const aged = units.filter(u => u.days > agingThreshold);
    const marginAtSug = units.reduce((a, u) => a + ((u.quick + u.max) / 2 - u.cost), 0);
    const sp = v => this.spark(v, 58, 20);
    const kdefs = [
      ['Units in stock', units.length, v => String(Math.round(v)), '2 inbound on trade', 'var(--color-neutral-500)', sp([7, 8, 8, 9, 10, 9, 8, 9, 9, 9]), 'var(--color-accent-400)'],
      ['Inventory at ask', totalVal, v => this.fmtK(v), 'cost basis ' + this.fmtK(totalCost), 'var(--color-neutral-500)', sp([1.6, 1.7, 1.75, 1.9, 2.1, 2.0, 1.95, 2.05, 2.1, 2.1]), 'var(--color-accent-2-500)'],
      ['Avg days on lot', avgDays, v => Math.round(v) + 'd', 'target < 75d', 'var(--color-neutral-500)', sp([58, 61, 66, 70, 74, 77, 79, 81, 82, 83]), 'var(--color-sky)'],
      ['Over ' + agingThreshold + ' days', aged.length, v => String(Math.round(v)), aged.length ? this.fmtK(aged.reduce((a, u) => a + u.ask, 0)) + ' tied up' : 'clean', aged.length ? 'var(--color-harvest)' : 'var(--color-neutral-500)', sp([1, 1, 2, 2, 2, 3, 3, 3, 3, aged.length]), 'var(--color-harvest)'],
      ['Margin at suggested', marginAtSug, v => this.fmtK(v), 'blended midpoint', 'var(--color-neutral-500)', sp([180, 195, 210, 200, 220, 235, 228, 240, 248, 252]), 'var(--color-accent-400)']];
    const kpis = kdefs.map(([label, raw, f, sub, subColor, spark, sparkColor], i) => ({
      label, value: f(raw * e), sub, subColor, spark, sparkColor,
      cardStyle: 'min-width:0;padding:2px 0 2px 14px;border-left:2px solid ' + sparkColor + ';animation:ewfade .4s ' + (i * 0.06) + 's ease both'
    }));
    const queue = units.filter(u => u.signal === 'Reprice' || u.signal === 'Hot').slice(0, 4).map(u => ({
      icon: u.signal === 'Hot' ? 'ph-trend-up' : 'ph-arrow-bend-right-down',
      iconColor: u.signal === 'Hot' ? 'var(--color-accent-300)' : 'var(--color-harvest)',
      title: u.year + ' ' + u.make + ' ' + u.model + ' · ' + u.stock,
      detail: u.signal === 'Hot'
        ? 'Ask is ' + this.fmt(u.comp - u.ask) + ' under comp avg on a ' + u.days + '-day unit: raise it'
        : u.days + ' days on lot, ask ' + this.fmt(u.ask - u.comp) + ' over comp avg',
      suggest: u.signal === 'Hot' ? this.fmt(u.max - 2500) : this.fmt(u.quick + Math.round((u.comp - u.quick) * .55 / 100) * 100),
      open: () => this.openUnit(u.stock)
    }));
    const hr2 = new Date().getHours();
    const [greet, greetSub] = hr2 < 5
      ? ['Still up, night owl?', 'The overnight pass lands at 02:00, fresh comps by breakfast.']
      : hr2 < 12
        ? ['Good morning, ' + firstName + '.', 'Overnight pass is done, ' + queue.length + ' units want a look before the phones start.']
        : hr2 < 17
          ? ['Good afternoon, ' + firstName + '.', queue.length + ' units on the queue, and the S-series trade-assist clock is ticking.']
          : hr2 < 22
            ? ['Good evening, ' + firstName + '.', 'Wrap the day: ' + queue.length + ' pricing calls left on the queue.']
            : ['Still at it, night owl?', 'Anything you price now gets rechecked when the 02:00 pass lands.'];
    const greetDate = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
    const maxDays = Math.max(...units.map(u => u.days));
    const aging = [...units].sort((a, b) => b.days - a.days).map(u => ({
      name: u.year + ' ' + u.make + ' ' + u.model,
      days: u.days,
      numColor: u.days > agingThreshold ? 'var(--color-harvest)' : u.days > agingThreshold * 0.7 ? 'var(--color-accent-2-300)' : 'var(--color-neutral-400)',
      barStyle: 'height:100%;border-radius:3px;transition:width .8s cubic-bezier(.2,.8,.2,1);width:' + Math.round(u.days / maxDays * 100 * e) + '%;background:' +
        (u.days > agingThreshold ? 'var(--color-harvest)' : u.days > agingThreshold * 0.7 ? 'var(--color-accent-2-600)' : 'var(--color-accent-500)')
    }));
    const feed = [
      { unit: '2020 JD 8R 310, 2,140 hrs', price: '$301,000', src: 'Purple Wave · Wichita KS', when: '2h ago', delta: '−4.2%', deltaColor: 'var(--color-harvest)' },
      { unit: '2019 Case IH Magnum 250, 3,020 hrs', price: '$164,500', src: 'BigIron · Norfolk NE', when: '5h ago', delta: '−6.8%', deltaColor: 'var(--color-harvest)' },
      { unit: '2022 Kubota M7-152, 890 hrs', price: '$121,750', src: 'AuctionTime', when: 'yesterday', delta: '+2.1%', deltaColor: 'var(--color-accent-300)' },
      { unit: '2018 NH T8.380, 3,600 hrs', price: '$128,900', src: 'TractorHouse · sold', when: '2d ago', delta: '−7.5%', deltaColor: 'var(--color-harvest)' }];
    // lot advisor
    const totalComp = units.reduce((a2, u2) => a2 + u2.comp, 0);
    const premium = (totalVal - totalComp) / totalComp;
    const overU = [...units].filter(u2 => u2.ask > u2.comp * 1.03).sort((a2, b2) => (b2.ask - b2.comp) - (a2.ask - a2.comp));
    const underU = units.filter(u2 => u2.ask < u2.comp);
    const [advTag, advTagClass, advHeadline] = premium > 0.025
      ? ['Running hot', 'tag-harvest', 'Your lot is priced ' + (premium * 100).toFixed(1) + '% over the market as a whole.']
      : premium < -0.01
        ? ['Under market', 'tag-accent', 'Your lot is priced ' + Math.abs(premium * 100).toFixed(1) + '% under the market: money on the table.']
        : ['In the band', 'tag-accent', 'Your lot is sitting inside the comp band. Keep it there.'];
    const advBody = premium > 0.025
      ? 'Most of that premium sits in the ' + overU[0].model + ' and ' + overU[1].model + ', together ' + this.fmtK(overU[0].ask - overU[0].comp + overU[1].ask - overU[1].comp) + ' over the band with ' + (overU[0].days + overU[1].days) + ' combined days on lot. Trim those two to the band and the lot reads healthy. On the flip side, the ' + (underU.map(u2 => u2.model).join(' and ') || 'newest units') + ' are under market, raise them and let the current Deere programs carry the buyer.'
      : 'Aged units are the main drag: ' + aged.length + ' over the ' + agingThreshold + '-day line. Work the action queue top-down and re-run the numbers after the weekend auctions post.';
    const advTop = [...units]
      .sort((a2, b2) => (Math.abs(b2.ask - b2.comp) / b2.comp + b2.days / 400) - (Math.abs(a2.ask - a2.comp) / a2.comp + a2.days / 400))
      .slice(0, 3).map(u2 => ({
        name: u2.year + ' ' + u2.make + ' ' + u2.model,
        note: (u2.ask >= u2.comp ? '+' : '−') + this.fmtK(Math.abs(u2.ask - u2.comp)).slice(1) + (u2.ask >= u2.comp ? ' over' : ' under') + ' · ' + u2.days + 'd',
        color: u2.ask >= u2.comp ? 'var(--color-harvest)' : 'var(--color-accent-300)',
        open: () => this.openUnit(u2.stock)
      }));
    const pr = [104, 103.2, 101.4, 100.2, 98.6, 97.6], pn = [102, 101.4, 100.6, 100.0, 99.2, 98.4];
    const px = i => 8 + i * (304 / 5);
    const py = v => 98 - (v - 96) / 9 * 88;
    const pulseRegion = pr.map((v, i) => px(i).toFixed(1) + ',' + py(v).toFixed(1)).join(' ');
    const pulseNational = pn.map((v, i) => px(i).toFixed(1) + ',' + py(v).toFixed(1)).join(' ');
    // inventory
    const cats = ['All', 'Tractors', 'Harvest', 'Construction'];
    const catOpts = cats.map(c => ({ label: c, on: s.cat === c, pick: () => this.setState({ cat: c }) }));
    const q = s.query.toLowerCase();
    const filtered = units.filter(u =>
      (s.cat === 'All' || u.cat === s.cat) &&
      (!q || (u.stock + ' ' + u.year + ' ' + u.make + ' ' + u.model).toLowerCase().includes(q)));
    const rows = filtered.map(u => ({
      stock: u.stock, title: u.year + ' ' + u.make + ' ' + u.model,
      starIcon: s.watch[u.stock] ? 'ph-fill ph-star' : 'ph ph-star',
      starColor: s.watch[u.stock] ? 'var(--color-accent-2-500)' : 'var(--color-neutral-700)',
      star: ev => { ev.stopPropagation(); this.setState(s2 => ({ watch: { ...s2.watch, [u.stock]: !s2.watch[u.stock] } })); },
      hours: u.hours.toLocaleString('en-US'), days: u.days,
      daysColor: u.days > agingThreshold ? 'var(--color-harvest)' : u.days > agingThreshold * 0.7 ? 'var(--color-accent-2-300)' : 'var(--color-neutral-300)',
      cost: this.fmt(u.cost), ask: this.fmt(u.ask), comp: this.fmt(u.comp),
      quick: this.fmt(u.quick), max: this.fmt(u.max),
      signal: u.signal, tagClass: tagClass(u.signal),
      open: () => this.openUnit(u.stock)
    }));
    // unit detail
    const cu = units.find(x => x.stock === s.unitId) || units[0];
    const sliderVal = s.slider[cu.stock] ?? 50;
    const t = sliderVal / 100;
    const sug = Math.round((cu.quick + t * (cu.max - cu.quick)) / 100) * 100;
    const estDays = Math.round(16 + t * t * 68);
    const lo = Math.min(cu.cost, cu.quick) * 0.97, hi = Math.max(cu.max, cu.ask) * 1.02;
    const pct = v => ((v - lo) / (hi - lo) * 100).toFixed(1);
    const mk = (label, v, color, top) => ({
      label, value: this.fmtK(v), color,
      style: 'position:absolute;left:' + pct(v) + '%;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;gap:1px;' + (top ? 'top:0' : 'top:22px')
    });
    const u = {
      title: cu.year + ' ' + cu.make + ' ' + cu.model, stock: cu.stock,
      hours: cu.hours.toLocaleString('en-US'), days: cu.days, acq: cu.acq,
      ask: this.fmt(cu.ask), quick: this.fmt(cu.quick), max: this.fmt(cu.max),
      signal: cu.signal, tagClass: tagClass(cu.signal),
      compNote: cu.comps.length + ' sales, trailing 90 days, freight- and spec-adjusted',
      comps: cu.comps.map(c => ({ src: c.src, date: c.date, spec: c.spec, hrs: c.hrs.toLocaleString('en-US'), price: this.fmt(c.price), adj: this.fmt(c.adj) })),
      notes: cu.notes.map(n => ({ text: n })),
      opts: (cu.opts || []).map(([label, delta]) => ({ label, delta })),
      bandStyle: 'position:absolute;top:26px;height:4px;border-radius:2px;background:var(--color-accent-800);left:' + pct(cu.quick) + '%;width:' + (pct(cu.max) - pct(cu.quick)) + '%',
      markers: [
        mk('cost', cu.cost, 'var(--color-neutral-500)', true),
        mk('quick', cu.quick, 'var(--color-accent-2-300)', false),
        mk('ask', cu.ask, 'var(--color-text)', true),
        mk('max', cu.max, 'var(--color-accent-300)', false)]
    };
    const margin = sug - cu.cost;
    const vsCompN = sug - cu.comp;
    // deal desk
    const floor = Math.round((cu.cost + 1500 + cu.days * 35) / 100) * 100;
    const dealRaw = s.deal[cu.stock] || '';
    const dealNum = parseFloat(dealRaw.replace(/[$,\s]/g, ''));
    const hasDeal = !isNaN(dealNum) && dealNum > 0;
    const dVsFloor = hasDeal ? dealNum - floor : 0;
    const [dealVerdict, dealTagClass, dealNote] = !hasDeal
      ? ['Waiting on a number', 'tag-neutral', 'Type the number on the table to see if the deal works.']
      : dVsFloor < 0
        ? ['Under water', 'tag-harvest', 'This is ' + this.fmtK(-dVsFloor) + ' below your floor. Walk, counter, or take it as a wholesale exit.']
        : dVsFloor < (cu.comp - floor) * 0.15
          ? ['Thin: counter', 'tag-accent-2', 'Only ' + this.fmtK(dVsFloor) + ' over floor. Counter with warranty or delivery instead of price.']
          : ['Green light', 'tag-accent', this.fmtK(dVsFloor) + ' of cushion over your floor. Shake hands.'];
    // appraiser
    const apprMakes = Object.keys(this.apprData);
    const apprModels = Object.keys(this.apprData[s.apprMake]);
    const base = this.apprData[s.apprMake][s.apprModel] ?? Object.values(this.apprData[s.apprMake])[0];
    const condMult = { Excellent: 1.06, Good: 1.0, Fair: 0.9 }[s.apprCond];
    const hrAdj = Math.max(-0.32, Math.min(0.28, (1500 - s.apprHours) * 0.00008));
    const val = base * (1 + hrAdj) * condMult;
    const r100 = n => Math.round(n / 100) * 100;
    const compCount = (s.apprModel.length * 7 + s.apprMake.length * 3) % 11 + 4;
    const apprConf = compCount >= 10 ? 'High confidence' : compCount >= 7 ? 'Medium confidence' : 'Thin data';
    const condOpts = ['Excellent', 'Good', 'Fair'].map(c => ({ label: c, on: s.apprCond === c, pick: () => this.setState({ apprCond: c }) }));
    const apprFlags = [
      s.apprHours > 2000 && s.apprMake === 'John Deere' ? 'Over 2,000 hrs: PowerGard inspection required before JDF incentive funding on resale.' : 'Under 2,000 hrs: clean for all current JDF programs on resale.',
      compCount < 7 ? 'Fewer than 7 regional comps: number leans on national sales, widen your margin of safety.' : compCount + ' regional comps in the last 90 days: band is tight.',
      s.apprCond === 'Fair' ? 'Fair condition units are trending to auction, not retail. Appraise against the auction column.' : 'Retail-grade condition: the recon-to-retail spread is where the margin lives.'
    ].map(t2 => ({ text: t2 }));
    // team
    const access = { 'Owner / CEO': 'Everything, all stores', 'Store Manager': 'Full pricing + team', 'Sales': 'View, chat, appraise', 'Appraiser': 'Appraise + view', 'Service Writer': 'View only' };
    const roleClass = r => r === 'Owner / CEO' ? 'tag-accent' : r === 'Store Manager' ? 'tag-accent-2' : r === 'Sales' ? 'tag-neutral' : 'tag-outline';
    const storeOpts = ['All', ...this.stores].map(st2 => ({ label: st2, on: s.teamFilter === st2, pick: () => this.setState({ teamFilter: st2 }) }));
    const teamRows = this.team
      .filter(p => s.teamFilter === 'All' || p.store === s.teamFilter || p.store === 'All stores')
      .map(p => ({
        name: p.name, email: p.email, role: p.role, store: p.store, joined: p.joined,
        initials: p.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase(),
        access: access[p.role] || 'View only', roleClass: roleClass(p.role),
        removable: !p.locked,
        remove: () => { this.team = this.team.filter(x => x !== p); this.toast(p.name + ' removed from ' + p.store); this.forceUpdate(); }
      }));
    // system status
    const dot = (c2, glow) => 'width:8px;height:8px;flex:none;border-radius:50%;background:' + c2 + (glow ? ';box-shadow:0 0 6px ' + c2 : '');
    const sysSources = [
      { name: 'TractorHouse', status: 'Operational', tagClass: 'tag-accent', dotStyle: dot('var(--color-accent)', true), last: '14 min ago', recs: '612', note: 'Sold listings + spec sheets parsing clean.', broken: false },
      { name: 'AuctionTime', status: 'Operational', tagClass: 'tag-accent', dotStyle: dot('var(--color-accent)', true), last: '22 min ago', recs: '438', note: 'Nominal.', broken: false },
      { name: 'Machinery Pete', status: 'Degraded', tagClass: 'tag-accent-2', dotStyle: dot('var(--color-accent-2-500)', true), last: '3 h ago', recs: '171', note: 'Listing layout changed Jul 16: hours field missing on ~18% of pulls. Parser patch in review.', broken: true, fixLabel: 'View patch' },
      { name: 'Purple Wave', status: 'Operational', tagClass: 'tag-accent', dotStyle: dot('var(--color-accent)', true), last: '9 min ago', recs: '389', note: 'Nominal.', broken: false },
      { name: 'BigIron', status: 'Needs fix', tagClass: 'tag-harvest', dotStyle: dot('var(--color-harvest)', false), last: 'Jul 17, 06:40', recs: '0', note: 'API v2 sunset: auth schema changed, collector returns 401. No BigIron comps in bands since Jul 17.', broken: true, fixLabel: 'Ticket EW-341' }
    ].map(x => ({ ...x, fix: () => this.toast(x.name + ': ' + (x.fixLabel === 'Ticket EW-341' ? 'ticket EW-341 opened with the API error log attached' : 'parser patch opened for review')) }));
    const sysStats = [
      { label: 'Comps in database', value: '38,412', sub: '+1,847 this week', subColor: 'var(--color-accent-300)' },
      { label: 'Last overnight pass', value: '02:14', sub: 'completed in 41 min', subColor: 'var(--color-neutral-500)' },
      { label: 'Parse success', value: '96.8%', sub: 'target ≥ 98% · dragged by Machinery Pete', subColor: 'var(--color-accent-2-300)' },
      { label: 'Collectors up', value: '3 / 5', sub: '1 degraded · 1 down', subColor: 'var(--color-accent-2-300)' }];
    const sysLog = [
      { when: 'Jul 17', color: 'var(--color-harvest)', text: 'BigIron collector down: API v2 sunset, 401 on auth. Ticket EW-341.' },
      { when: 'Jul 16', color: 'var(--color-accent-2-400)', text: 'Machinery Pete layout change; hours field intermittent. Patch in review.' },
      { when: 'Jul 12', color: 'var(--color-accent)', text: 'Purple Wave rate limit raised: pull frequency back to hourly.' },
      { when: 'Jul 08', color: 'var(--color-accent)', text: 'Overnight pass moved to 02:00 to catch late West-coast closings.' }];
    const sysDb = [
      { k: 'Comp records', v: '38,412' }, { k: 'Your inventory rows', v: String(units.length) },
      { k: 'Models tracked', v: '214' }, { k: 'Storage used', v: '1.9 GB of 25 GB' },
      { k: 'Pricing model version', v: 'v3.2 · retrained Jul 6' }, { k: 'Next full pass', v: 'tonight 02:00' }];
    // chat
    const active = s.chats.find(c => c.id === s.activeChat) || null;
    const patchChat = (id, patch) => this.setState(s2 => ({ chats: s2.chats.map(c => c.id === id ? { ...c, ...patch } : c) }));
    const chatVm = c => ({
      title: c.title, when: c.when,
      renaming: s.renameId === c.id, notRenaming: s.renameId !== c.id,
      menuOpen: s.chatMenu === c.id,
      scheduled: !!c.schedule, schedLabel: c.schedule ? c.schedule.freq + ' ' + c.schedule.time : '',
      schedAction: c.schedule ? 'Edit schedule…' : 'Schedule…',
      pick: () => this.setState({ activeChat: c.id, chatMenu: null }),
      menu: () => this.setState(s2 => ({ chatMenu: s2.chatMenu === c.id ? null : c.id })),
      rename: () => this.setState({ renameId: c.id, renameVal: c.title, chatMenu: null }),
      sched: () => this.setState({ schedOpen: true, schedId: c.id, chatMenu: null, schedFreq: c.schedule ? c.schedule.freq : 'Daily', schedTime: c.schedule ? c.schedule.time : '7:00 AM' }),
      del: () => this.setState({ delId: c.id, chatMenu: null }),
      cats: this.chatCats.map(([label, icon, iconColor]) => ({
        label, icon, iconColor, on: c.cat === label,
        pick: () => { patchChat(c.id, { cat: label }); this.setState({ chatMenu: null }); }
      })),
      style: 'display:block;width:100%;text-align:left;font:inherit;border:none;cursor:pointer;padding:7px 8px;border-radius:var(--radius-sm);color:var(--color-text);background:' +
        (c.id === s.activeChat ? 'color-mix(in srgb, var(--color-accent) 10%, transparent)' : 'transparent')
    });
    const chatGroups = this.chatCats
      .map(([name]) => ({ name, items: [...s.chats].reverse().filter(c => (c.cat || 'General') === name).map(chatVm) }))
      .filter(g => g.items.length);
    const schedChat = s.chats.find(c => c.id === s.schedId);
    const wrapBot = 'align-self:flex-start;max-width:82%;display:flex;flex-direction:column;gap:2px;background:var(--color-surface);border-radius:var(--radius-md);padding:12px 16px;animation:ewfade .3s ease both';
    const wrapMe = 'align-self:flex-end;max-width:70%;background:var(--color-accent-900);color:var(--color-accent-100);border-radius:var(--radius-md);padding:10px 14px;animation:ewfade .3s ease both';
    const chatFresh = !active;
    const chatGreeting = (hr2 < 12 ? 'Morning' : hr2 < 17 ? 'Afternoon' : 'Evening') + ', ' + firstName + '.';
    const messages = (active ? active.messages : []).map(m => ({
      wrapStyle: m.who === 'bot' ? wrapBot : wrapMe,
      hasBadge: !!m.badge, badge: m.badge || '',
      hasActions: !!(m.actions && m.actions.length),
      actions: (m.actions || []).map(a => ({ label: a.label, go: () => this.openUnit(a.stock) })),
      lines: m.lines.map(l => ({
        text: l,
        style: 'font-size:13px;line-height:1.55;' + (l.startsWith('•') ? 'padding-left:4px;' : '') + (m.who === 'bot' ? 'color:var(--color-neutral-200);' : '')
      }))
    }));
    const chips = [
      "What do I need to know about Deere's incentives today?",
      '6R financing terms?',
      'Combine trade assist deadline?',
      "What's Kubota running against us?"].map(label => ({ label, send: () => this.send(label) }));
    const revBucket = Math.floor(Date.now() / 5200);
    const revHold = s.revHold && Date.now() < s.revHold.until ? s.revHold : null;
    const revShow = revHold ? revHold.idx : revBucket % 3;
    const revPar = (revHold ? revHold.tick : revBucket) % 2;
    return {
      navItems, adminItems, dealerName, agingThreshold,
      pageTitle: titles[s.view],
      isHome: s.view === 'home', isApp: s.view !== 'home' && s.view !== 'signedout', isOut: s.view === 'signedout',
      isDash: s.view === 'dashboard', isInv: s.view === 'inventory', isUnit: s.view === 'unit', isAppr: s.view === 'appraiser', isTeam: s.view === 'team', isChat: s.view === 'chat', isSet: s.view === 'settings', isSys: s.view === 'system', isInvites: s.view === 'invites',
      userMenu: s.userMenu,
      toggleUserMenu: () => this.setState(st => ({ userMenu: !st.userMenu })),
      goSettings: () => this.nav('settings'),
      signOut: () => this.signOut(),
      signIn: () => this.submitLogin(),
      onLoginKey: ev => { if (ev.key === 'Enter') this.submitLogin(); },
      loginEmail: s.loginEmail, loginPassword: s.loginPassword, loginError: s.loginError, loginBusy: s.loginBusy,
      onLoginEmail: ev => this.setState({ loginEmail: ev.target.value }),
      onLoginPassword: ev => this.setState({ loginPassword: ev.target.value }),
      advTag, advTagClass, advHeadline, advBody, advTop,
      cpw: s.cpw, npw: s.npw, npw2: s.npw2,
      onCpw: ev => this.setState({ cpw: ev.target.value }),
      onNpw: ev => this.setState({ npw: ev.target.value }),
      onNpw2: ev => this.setState({ npw2: ev.target.value }),
      changePw: () => this.changePw(),
      themeOpts: [['terminal', 'Terminal', 'ph-terminal-window'], ['midnight', 'Midnight', 'ph-moon-stars'], ['bone', 'Bone', 'ph-sun'], ['field', 'Field', 'ph-plant']].map(([v2, label, icon]) => ({ label, icon, on: s.theme === v2, pick: () => this.setTheme(v2) })),
      lookback: s.lookback, lookbackLabel: s.lookback + ' days',
      onLookback: ev => this.setState({ lookback: +ev.target.value }),
      stratOpts: ['Move it', 'Balanced', 'Max profit'].map(v2 => ({ label: v2, on: s.strategy === v2, pick: () => this.setState({ strategy: v2 }) })),
      notifRows: [['digest', 'Morning lot digest', 'One email: overnight comps, flags, and the day’s queue'], ['drops', 'Auction price-drop alerts', 'Ping when a comp lands 5%+ under your ask'], ['bulletins', 'Deere bulletin summaries', 'Incentive Desk digest every time JDF updates a program']].map(([k2, label, sub]) => {
        const on = s.notifs[k2];
        return { label, sub,
          toggle: () => this.setState(st => ({ notifs: { ...st.notifs, [k2]: !st.notifs[k2] } })),
          style: 'position:relative;width:36px;height:20px;border-radius:10px;border:none;cursor:pointer;flex:none;transition:background .2s;background:' + (on ? 'var(--color-accent)' : 'var(--color-neutral-800)'),
          dotStyle: 'position:absolute;top:2px;width:16px;height:16px;border-radius:50%;background:var(--color-surface);transition:left .2s;left:' + (on ? '18px' : '2px') };
      }),
      disconnectDms: () => this.toast('DMS sync paused, inventory will stop updating overnight'),
      goHome: () => this.nav('home'), goDash: () => this.nav('dashboard'), goInv: () => this.nav('inventory'), goChat: () => this.nav('chat'), goAppr: () => this.nav('appraiser'),
      features, steps, bandStats, ticker, plans, heroBoard,
      revText: [
        '“We stopped arguing about what a Magnum is worth. The comp band is on the screen; the argument is over. It paid for itself on the first aged unit we cut loose.”',
        '“Worth AI catches bulletin changes before our Deere rep calls about them. The sales floor quotes programs with actual confidence now.”',
        '“The trade appraiser turned a twenty-minute gut call into ten seconds with receipts. Farmers respect the number when you can show the sales behind it.”'][revShow],
      revWho: [
        'Used-equipment manager · 7-store Deere dealer group, Missouri',
        'Sales manager · 3-store dealer, Iowa',
        'Owner · single-store dealer, Nebraska'][revShow],
      revStyle: 'animation:' + (revPar ? 'ewfadeB' : 'ewfade') + ' .6s ease both',
      revDots: [0, 1, 2].map(i2 => ({
        pick: () => this.setState({ revHold: { idx: i2, until: Date.now() + 9000, tick: (revHold ? revHold.tick : revBucket) + 1 } }),
        style: 'width:7px;height:7px;border-radius:50%;border:none;cursor:pointer;padding:0;background:' + (i2 === revShow ? '#2F6B28' : 'rgba(26,31,27,.22)')
      })),
      authed: s.authed, user: s.user, booting: s.booting,
      goDashLink: ev => { ev.preventDefault(); this.nav(s.authed ? 'dashboard' : 'signedout'); },
      goLogin: () => this.nav(s.authed ? 'dashboard' : 'signedout'),
      goHomeLink: ev => {
        ev.preventDefault();
        this.nav('home');
        const el = (ev.currentTarget && ev.currentTarget.closest && ev.currentTarget.closest('[data-scroll-root]')) || document.querySelector('[data-scroll-root]');
        if (el) el.scrollTop = 0;
      },
      legalOpen: !!s.legal,
      legalTitle: s.legal ? legalDocs[s.legal].title : '',
      legalBody: s.legal ? legalDocs[s.legal].body.map(([h, p]) => ({ h, p })) : [],
      openTerms: ev => { ev.preventDefault(); this.setState({ legal: 'terms' }); },
      openPrivacy: ev => { ev.preventDefault(); this.setState({ legal: 'privacy' }); },
      closeLegal: () => this.setState({ legal: null }),
      stopProp: ev => ev.stopPropagation(),
      greet, greetSub, greetDate,
      dealVal: dealRaw, hasDeal,
      onDeal: ev => this.setState(s2 => ({ deal: { ...s2.deal, [cu.stock]: ev.target.value } })),
      dealFloor: this.fmt(floor),
      dealMargin: hasDeal ? this.fmt(dealNum - cu.cost) : 'n/a',
      dealVsFloor: hasDeal ? (dVsFloor >= 0 ? '+' : '−') + this.fmt(Math.abs(dVsFloor)).slice(1) : 'n/a',
      dealVerdict, dealTagClass, dealNote,
      dealPlaceholder: 'e.g. ' + this.fmt(sug - 4000),
      kpis, queue, aging, feed, pulseRegion, pulseNational,
      pulseDotX: px(5).toFixed(1), pulseDotY: py(pr[5]).toFixed(1),
      query: s.query, onQuery: ev => this.setState({ query: ev.target.value }),
      catOpts, rows, rowCount: rows.length,
      fileRef: this.fileRef,
      importClick: () => this.fileRef.current && this.fileRef.current.click(),
      onImportFile: ev => this.importCsv(ev),
      exportCsv: () => this.exportCsv(),
      storeOpts, teamRows, teamCount: teamRows.length,
      storeList: this.stores, roleList: this.roles,
      addOpen: s.addOpen,
      openAdd: () => this.setState({ addOpen: true, nName: '' }),
      closeAdd: () => this.setState({ addOpen: false }),
      nName: s.nName, nRole: s.nRole, nStore: s.nStore,
      onNName: ev => this.setState({ nName: ev.target.value }),
      onNRole: ev => this.setState({ nRole: ev.target.value }),
      onNStore: ev => this.setState({ nStore: ev.target.value }),
      addPerson: () => {
        const nm = s.nName.trim();
        if (!nm) { this.toast('Enter a name first'); return; }
        this.team.push({ name: nm, role: s.nRole, store: s.nStore, joined: 'Today',
          email: nm.toLowerCase().replace(/[^a-z ]/g, '').trim().replace(/ +/g, '.') + '@legacyequip.com' });
        this.setState({ addOpen: false });
        this.toast(nm + ' added to ' + s.nStore + ' as ' + s.nRole);
      },
      u, sliderVal,
      onSlider: ev => this.setState(st => ({ slider: { ...st.slider, [cu.stock]: +ev.target.value } })),
      sugPrice: this.fmt(sug),
      sugNote: t < 0.25 ? 'priced to move: bottom of the comp band' : t > 0.75 ? 'top of band: expect a slower sale' : 'balanced: inside the comp band',
      estDays: estDays + 'd', margin: this.fmt(margin),
      vsComp: (vsCompN >= 0 ? '+' : '−') + '$' + Math.abs(vsCompN).toLocaleString('en-US'),
      applyPrice: () => this.toast('List price updated · pushed to website, TractorHouse listing and lot sheet'),
      apprMakes, apprModels, apprMake: s.apprMake, apprModel: s.apprModel,
      apprHours: s.apprHours, apprHoursLabel: s.apprHours.toLocaleString('en-US') + ' hrs',
      onApprMake: ev => { const m = ev.target.value; this.setState({ apprMake: m, apprModel: Object.keys(this.apprData[m])[0] }); },
      onApprModel: ev => this.setState({ apprModel: ev.target.value }),
      onApprHours: ev => this.setState({ apprHours: +ev.target.value }),
      condOpts,
      apprTrade: this.fmt(r100(val * 0.90)) + ' – ' + this.fmt(r100(val * 0.96)),
      apprAuction: this.fmt(r100(val * 0.87)) + ' – ' + this.fmt(r100(val * 0.94)),
      apprRetail: this.fmt(r100(val * 1.02)) + ' – ' + this.fmt(r100(val * 1.08)),
      apprConf, apprConfClass: compCount >= 10 ? 'tag-accent' : compCount >= 7 ? 'tag-accent-2' : 'tag-outline',
      apprBasis: 'Based on ' + compCount + ' comps, trailing 90 days · normalized to ' + s.apprHours.toLocaleString('en-US') + ' hrs, ' + s.apprCond.toLowerCase() + ' condition',
      apprDraft: () => this.toast('Draft created · ' + s.apprMake + ' ' + s.apprModel + ' queued for stock number'),
      apprFlags,
      sysStats, sysSources, sysLog, sysDb,
      chatGroups,
      renameVal: s.renameVal,
      onRenameChange: ev => this.setState({ renameVal: ev.target.value }),
      onRenameKey: ev => { if (ev.key === 'Enter') ev.target.blur(); if (ev.key === 'Escape') this.setState({ renameId: null }); },
      commitRename: () => { if (s.renameId != null && s.renameVal.trim()) patchChat(s.renameId, { title: s.renameVal.trim() }); this.setState({ renameId: null }); },
      schedOpen: s.schedOpen, schedHas: !!(schedChat && schedChat.schedule),
      schedFreqOpts: ['Daily', 'Weekdays', 'Weekly'].map(fq => ({ label: fq, on: s.schedFreq === fq, pick: () => this.setState({ schedFreq: fq }) })),
      schedTimes: ['6:00 AM', '6:30 AM', '7:00 AM', '7:30 AM', '8:00 AM', '12:00 PM', '5:00 PM'],
      schedTime: s.schedTime,
      onSchedTime: ev => this.setState({ schedTime: ev.target.value }),
      schedClose: () => this.setState({ schedOpen: false }),
      schedSave: () => { patchChat(s.schedId, { schedule: { freq: s.schedFreq, time: s.schedTime } }); this.setState({ schedOpen: false }); this.toast('Scheduled, ' + s.schedFreq.toLowerCase() + ' at ' + s.schedTime); },
      schedRemove: () => { patchChat(s.schedId, { schedule: null }); this.setState({ schedOpen: false }); this.toast('Schedule removed'); },
      delOpen: s.delId != null,
      delChatTitle: (s.chats.find(c => c.id === s.delId) || {}).title || '',
      delScheduled: !!((s.chats.find(c => c.id === s.delId) || {}).schedule),
      cancelDel: () => this.setState({ delId: null }),
      confirmDel: () => this.setState(s2 => {
        const gone = s2.chats.find(x => x.id === s2.delId);
        const chats = s2.chats.filter(x => x.id !== s2.delId);
        let activeChat = s2.activeChat;
        if (activeChat === s2.delId) activeChat = chats.length ? chats[chats.length - 1].id : null;
        this.toast('Deleted "' + (gone ? gone.title : 'thread') + '"');
        return { chats, activeChat, delId: null };
      }),
      newChat: () => this.setState({ activeChat: null, chatMenu: null }),
      chatFresh, chatActive: !chatFresh, chatGreeting,
      messages, typing: s.typing, chatRef: this.chatRef,
      chatInput: s.chatInput,
      onChatInput: ev => this.setState({ chatInput: ev.target.value }),
      onChatKey: ev => { if (ev.key === 'Enter') this.send(s.chatInput); },
      sendChat: () => this.send(s.chatInput),
      chips,
      toastOn: !!s.toast, toastText: s.toast || ''
    };
  }

  render() {
    const vm = this.renderVals();
    // While the session check is in flight, a returning visitor whose last
    // view was inside the app gets a blank brand splash instead of a flash
    // of the marketing home page that then jumps to their dashboard.
    const showBootSplash = vm.booting && this._storedView && this._storedView !== 'home';
    return (
      <div style={{ height: '100vh', overflow: 'hidden', background: 'var(--color-bg)', color: 'var(--color-text)', fontFamily: 'var(--font-body)' }}>
        {showBootSplash ? (
          <div style={{ height: '100%', display: 'grid', placeItems: 'center' }} />
        ) : (
          <>
            {vm.isHome && <Home vm={vm} />}
            {vm.isApp && <AppShell vm={vm} />}
            {vm.isOut && <SignedOut vm={vm} />}
          </>
        )}
        {vm.legalOpen && <LegalModal title={vm.legalTitle} body={vm.legalBody} onClose={vm.closeLegal} />}
        {vm.toastOn && <Toast text={vm.toastText} />}
      </div>
    );
  }
}

App.defaultProps = {
  startOn: 'home',
  dealerName: 'Legacy Equipment · 7 locations',
  agingThreshold: 90,
};
