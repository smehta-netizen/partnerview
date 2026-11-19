// All app state, seed data, permissions and the renderVals() view-model.
// Ported unchanged from the design-canvas prototype; DCLogic is React.Component.
import DCLogic from './DCLogic';

export default class PartnerViewLogic extends DCLogic {
  constructor(props) {
    super(props);
    this.KEY = 'aw-partnerview-demo-v17';
    this.UIKEYS = ['me', 'role', 'imp', 'screen', 'dealId', 'leadId', 'tab', 'ltab', 'ptab', 'ctab', 'cttab', 'setTab', 'permRole', 'companyName', 'contactKey', 'navOpen', 'dealView', 'workShow', 'itemSort', 'dtFilter', 'addKind', 'projF'];
    this.PEOPLE = [
      { name: 'Dilbag Singh', role: 'Account executive' },
      { name: 'Sahira Mehta', role: 'Solutions engineer' },
      { name: 'Marcus Lee', role: 'Solutions engineer' },
      { name: 'Ana Torres', role: 'Solutions engineer' },
      { name: 'Erick Razo', role: 'Professional services lead' },
      { name: 'Jamie Cole', role: 'Solutions architect' },
      { name: 'Riley Chen', role: 'Project manager' },
      { name: 'Noah Kim', role: 'Consultant' },
      { name: 'Leo Martins', role: 'Solutions architect' },
      { name: 'Avery Brooks', role: 'Support staff' }
    ];
    this.ROLES = ['Account executive', 'Solutions architect', 'Project manager', 'Consultant', 'Professional services lead'];
    this.PRODUCTS = ['monday Work Management', 'monday CRM', 'monday Dev', 'monday Campaigns', 'monday Service', 'Make.com', 'Cerri', 'Claude'];
    this.SERVICES = ['VSM', 'Professional services hours', 'Support', 'Professional training'];
    this.SOURCES = ['monday.com rep', 'monday go-to partner', 'Website scheduling link', 'Salesforce'];
    this.SCOPES = ['Scope the work and draft the proposal', 'Set the hours on the quote', 'Review the quote before it goes out'];
    this.USERS = [
      { name: 'Erick Razo', short: 'Admin', role: 'admin' },
      { name: 'Dilbag Singh', short: 'AE', role: 'ae' },
      { name: 'Jamie Cole', short: 'SA', role: 'ae' },
      { name: 'Sahira Mehta', short: 'SE', role: 'ae' },
      { name: 'Avery Brooks', short: 'Support staff', role: 'ae' }
    ];
    this.state = this.fresh('admin', 'Erick Razo');
    this.logWrap();
  }

  fresh(role, me) {
    return {
      me: me || 'Erick Razo',
      data: this.seed(), screen: 'home', dealId: '', leadId: '', tab: 'overview', role: role, modal: '', navOpen: true, qSel: '',
      form: { first: '', last: '', company: '', email: '', phone: '', source: 'monday.com rep', needs: '', products: [], services: [] },
      close: { reason: 'Strong product fit', amount: '' }, toast: '',
      lostForm: { reason: '', competitor: '', note: '' },
      actForm: { type: 'Meeting', date: '', title: '', details: '' },
      fileForm: { kind: 'link', url: '', name: '', category: 'Proposal', fileName: '', fileSize: 0 },
      seForm: { pick: '', scope: '', note: '' },
      memberForm: { ctx: 'deal', q: '', pick: '', role: 'Solutions architect' },
      stakeForm: { name: '', email: '', role: 'monday.com rep' },
      contactForm: { name: '', email: '', phone: '', asEb: false }
    };
  }

  med(o) {
    const base = { champ: { s: 0, n: '' }, metrics: { s: 0, n: '' }, eb: { s: 0, n: '' }, dc: { s: 0, n: '' }, dp: { s: 0, n: '' }, pp: { s: 0, n: '' }, pain: { s: 0, n: '' }, comp: { s: 0, n: '' } };
    Object.keys(o || {}).forEach((k) => { base[k] = { ...base[k], ...o[k] }; });
    return base;
  }

  norm(d) {
    const out = {
      contacts: [{ name: d.contact, email: '', phone: '' }], champions: [], eb: '', med: this.med(), budget: '', critical: { date: '', label: 'Go-live' },
      expectedClose: '', nextStep: '', forecast: 0, expectedHours: 0, activities: [], files: [], hasQuote: false, team: [], stakeholders: [], seScope: '', seNote: '',
      ...d
    };
    if (!out.quotes) {
      out.quotes = out.hasQuote ? [{
        id: 'q-' + out.id + '-a', name: 'Scenario A', ver: 1, status: out.quoteAccepted ? 'Accepted' : out.proposal >= 1 ? 'Sent' : 'Draft',
        lines: JSON.parse(JSON.stringify(out.lines || [])),
        lic: out.seats ? [{ product: 'monday CRM', plan: 'Enterprise', seats: out.seats, ppu: 50 }] : []
      }] : [];
      out.activeQ = out.quotes.length ? out.quotes[0].id : '';
    }
    return out;
  }

  projectFull(d) {
    const p = d.project || {};
    const today = new Date().toISOString().slice(0, 10);
    const add = (iso, n) => { const t = new Date(iso + 'T00:00:00'); t.setDate(t.getDate() + n); return t.toISOString().slice(0, 10); };
    const dates = { start: (p.dates && p.dates.start) || today, end: '', expires: '' };
    dates.end = (p.dates && p.dates.end) || add(dates.start, 84);
    dates.expires = (p.dates && p.dates.expires) || add(dates.start, 183);
    const MS = [['m0', 'Setup and kickoff', 0.06, 7], ['m1', 'Discovery and project plan', 0.16, 21], ['m2', 'Build and customer review', 0.5, 56], ['m3', 'Testing, UAT and training', 0.14, 70], ['m4', 'Go-live', 0, 77], ['m5', 'Handoff and closeout', 0.14, 84]];
    const milestones = p.milestones ? p.milestones.map((m) => ({ ...m })) : MS.map(([mid, name, share, off]) => ({ id: mid, name, share, due: add(dates.start, off), done: false }));
    const approved = (d.drd || []).filter((r) => r.ok);
    const tasks = p.tasks ? p.tasks.map((t) => ({ ...t })) : [
      { id: 't-m0-0', ms: 'm0', name: 'Kickoff call with the customer', done: false },
      { id: 't-m1-0', ms: 'm1', name: 'Discovery workshops', done: false },
      { id: 't-m1-1', ms: 'm1', name: 'Project plan and customer sign-off', done: false }
    ].concat(approved.map((r, i) => ({ id: 't-m2-' + i, ms: 'm2', name: r.req, done: false }))).concat([
      { id: 't-m3-0', ms: 'm3', name: 'UAT with the customer', done: false },
      { id: 't-m3-1', ms: 'm3', name: 'Team training session', done: false },
      { id: 't-m4-0', ms: 'm4', name: 'Go-live and hypercare', done: false },
      { id: 't-m5-0', ms: 'm5', name: 'Documentation and handoff', done: false },
      { id: 't-m5-1', ms: 'm5', name: 'Closeout call', done: false }
    ]);
    if (!p.tasks && p.seedEst) tasks.forEach((t) => { if (p.seedEst[t.id]) t.est = p.seedEst[t.id]; });
    if (!p.tasks) tasks.forEach((t) => { const mm = /^t-m2-(\d+)$/.exec(t.id); if (mm) t.reqs = ['r' + mm[1]]; if (t.id === 't-m4-0') t.key = true; });
    tasks.forEach((t) => { if (!t.status) t.status = t.done ? 'Done' : 'Not started'; if (!t.reqs) t.reqs = t.req ? [t.req] : []; });
    milestones.forEach((m) => { if (!m.reqs) m.reqs = []; });
    const firstRole = ((d.quotes || []).find((q) => q.id === d.activeQ) || { lines: d.lines || [] }).lines.filter((l) => l.unit !== 'each')[0];
    const timelog = p.timelog ? p.timelog.map((e) => ({ ...e })) : (p.logged ? [{ id: 'e-legacy', date: dates.start, hours: p.logged, ms: 'm0', task: '', role: firstRole ? firstRole.role : 'Consultant', rate: firstRole && firstRole.rate !== undefined ? Number(firstRole.rate) : 155, by: 'Imported', note: '' }] : []);
    let team = (p.team || []).map((m) => ({ ...m }));
    if (!team.some((m) => m.role === 'Sales rep') && d.owner) team.push({ name: d.owner, role: 'Sales rep' });
    if (!team.some((m) => m.role === 'SE') && d.se) team.push({ name: d.se, role: 'SE' });
    const num = parseInt(String(d.id).replace(/\D/g, ''), 10) || 0;
    const checkLabels = (p.checkLabels || ['__drd__', 'Send getting-started email', 'Request account access', 'Schedule kickoff call', 'Review scope and documents']).slice();
    const checks = checkLabels.map((l, i) => !!(p.checks || [])[i]);
    return { escalations: (p.escalations || []).map((x) => ({ ...x })), id: p.id || 'PRJ-' + this.recNo(d), checks, checkLabels, setup: { ...(p.setup || {}) }, dates, milestones, tasks, timelog, team, lifecycle: p.lifecycle || 'active', startedAt: p.startedAt || '', closedAt: p.closedAt || '' };
  }

  openCompany(name) { this.setState({ screen: 'company', companyName: name, modal: '', ctab: 'overview', coEdit: false }); }
  updCompany(name, fn, msg, perm) {
    const pm = perm === undefined ? ['companies', 'e'] : perm; if (pm && !this.canDo(this.state, pm[0], pm[1])) { this.flash('Your role can\'t ' + ({ e: 'edit ', c: 'add ' })[pm[1]] + pm[0] + '.'); return; }
    this.setState((st) => { const all = { ...(st.data.companyInfo || {}) }; const ci = JSON.parse(JSON.stringify(all[name] || {})); fn(ci); all[name] = ci; return { data: { ...st.data, companyInfo: all } }; });
    if (msg) this.flash(msg);
  }
  updFiles(company, key, fn, msg) {
    if (key === 'co') this.updCompany(company, (ci) => { ci.files = fn(ci.files || []); }, msg, false);
    else if (key.indexOf('d:') === 0) this.updDeal(key.slice(2), (z) => { z.files = fn(z.files || []); return z; }, msg);
    else if (key.indexOf('l:') === 0) { this.updLead(key.slice(2), (l) => { l.files = fn(l.files || []); return l; }); if (msg) this.flash(msg); }
  }
  seedCompanies() {
    return {
      'Sable & Stone Realty': { website: 'sablestone.example', hq: 'Denver, CO',
        tech: [{ id: 't-ss-1', name: 'Property management system', category: 'Other', note: 'Source of tenant and unit records', by: 'Dilbag Singh (AE)' }, { id: 't-ss-2', name: 'Outlook', category: 'Email and calendar', note: 'Tenant requests arrive here today', by: 'Dilbag Singh (AE)' }],
        billing: { status: 'Active customer', since: '2026-10-01', system: '', contact: 'Ethan Brooks', email: 'ap@sablestone.example', terms: 'Net 30', currency: 'USD', po: 'No' },
        files: [
          { id: 'f-co-ss-1', kind: 'link', name: 'Mutual NDA (signed)', url: 'https://example.com/sable-nda', category: 'NDA', date: '2026-09-18', by: 'Dilbag Singh (AE)' },
          { id: 'f-co-ss-2', kind: 'file', name: 'Vendor setup form.pdf', url: '', size: 92000, category: 'Vendor setup', date: '2026-10-02', by: 'Admin' },
          { id: 'f-co-ss-3', kind: 'file', name: 'Invoice INV-1005-01.pdf', url: '', size: 61000, category: 'Invoice', date: '2026-10-20', by: 'Admin' }
        ] },
      'Harborline Clinics': { tech: [{ id: 't-hc-1', name: 'EHR system', category: 'Clinical', note: 'Export feeds the planned Make integration', by: 'Sahira Mehta (SE)' }],
        files: [{ id: 'f-co-hc-1', kind: 'link', name: 'Mutual NDA', url: 'https://example.com/harborline-nda', category: 'NDA', date: '2026-09-30', by: 'Dilbag Singh (AE)' }] },
      'Cobalt Ridge Builders': { tech: [{ id: 't-cr-1', name: 'ERP (job costing)', category: 'ERP', note: 'Job sites to sync into monday', by: 'Sahira Mehta (SE)' }] },
      'Kestrel Foods': { tech: [{ id: 't-kf-1', name: 'Spreadsheets', category: 'Other', note: 'Leads tracked here today', by: 'Dilbag Singh (AE)' }] }
    };
  }
  openContactRecord(company, name) { this.setState({ screen: 'contact', contactKey: company + '|' + name, modal: '', ctEdit: false, cttab: 'overview' }); }

  recNo(r) { if (r && r.no) return r.no; const n = parseInt(String((r && r.id) || '').replace(/\D/g, ''), 10) || 0; return n < 1000 ? 1000 + n : 1000 + (n % 1000); }
  nextNo(list) { return (list || []).reduce((a, r) => Math.max(a, this.recNo(r)), 1000) + 1; }
  defaultSettings() {
    return { lead: {
      rep: { items: [{ key: 'cpm', label: 'Connected with CPM' }, { key: 'rep', label: 'Connected with the rep' }, { key: 'sfOpp', label: 'Opportunity exists in Salesforce' }, { key: 'smp', label: 'SMP submitted and approved' }], minYes: 4 },
      direct: { items: [{ key: 'sfReg', label: 'Deal registered in Salesforce' }], minYes: 1 }
    }, expansion: { rule: 'auto' },
      taskStatuses: [{ label: 'Not started', done: false }, { label: 'In progress', done: false }, { label: 'Blocked', done: false }, { label: 'Done', done: true }],
      defaultValue: 8000,
      costRates: [{ role: 'Solutions architect', rate: 80 }, { role: 'Solutions engineer', rate: 80 }, { role: 'Consultant', rate: 80 }, { role: 'Project manager', rate: 80 }, { role: 'Professional services lead', rate: 80 }], defaultCost: 80,
      dealTasks: [{ title: 'Book the scoping call with the customer', days: 3, owner: 'owner' }, { title: 'Draft the DRD', days: 7, owner: 'owner' }],
      users: this.USERS.map((u) => ({ name: u.name, email: u.name.toLowerCase().replace(/ /g, '.') + '@antlerwing.example', role: u.short, status: 'Active' })),
      roles: [{ name: 'Admin', locked: true, menu: {} }, { name: 'AE', builtin: true, menu: { home: true, companies: true, contacts: true, leads: true, deals: true, projects: true, settings: false } }, { name: 'SA', builtin: true, menu: { home: true, companies: true, contacts: true, leads: false, deals: true, projects: true, settings: false } }, { name: 'SE', builtin: true, menu: { home: true, companies: true, contacts: true, leads: false, deals: true, projects: true, settings: false } },
      { name: 'Support staff', builtin: true, menu: { home: true, companies: true, contacts: true, leads: false, deals: false, projects: true, settings: false },
        acts: { dealStage: false, dealPath: false, dealDrd: false, dealQuotes: false, dealForecast: false, leadCreate: false, tasks: true, logTime: true, projectDates: false, leadConvert: false, leadReassign: false },
        crud: { leads: { v: false, c: false, e: false, vs: 'all', es: 'all' }, deals: { v: false, c: false, e: false, vs: 'own', es: 'own' }, quotes: { v: false, c: false, e: false }, tasks: { v: true, c: true, e: true, d: false },
          activities: { v: true, c: true, e: true, d: false }, projects: { v: true, e: true, vs: 'own', es: 'own' }, companies: { v: true, c: false, e: false }, contacts: { v: true, c: true, e: true }, files: { v: true, c: true, d: false }, time: { c: true, d: true } } }],
      practices: [{ id: 'pr-monday', name: 'monday.com', active: true }, { id: 'pr-odoo', name: 'Odoo', active: true }],
      serviceLines: [{ id: 'sv-custom', name: 'Custom Engagement', active: true }, { id: 'sv-packaged', name: 'Packaged Solution', active: true }, { id: 'sv-monthly', name: 'Monthly PS', active: true }, { id: 'sv-onsite', name: 'On-Site', active: true }, { id: 'sv-vsm', name: 'VSM', active: true }, { id: 'sv-subco', name: 'Subco Package', active: true }],
      onboarding: ['Set start date', 'Send getting-started email', 'Request account access', 'Schedule kickoff call', 'Review scope and documents'],
      pathSteps: [{ key: 'se', label: 'SE support', on: true }, { key: 'drd', label: 'DRD approved', on: true }, { key: 'sent', label: 'Proposal sent', on: true }, { key: 'quote', label: 'Quote accepted', on: true }, { key: 'signed', label: 'Proposal signed', on: true }, { key: 'paid', label: 'Payment received', on: true }] };
  }
  settingsOf(data) { const st = JSON.parse(JSON.stringify((data && data.settings) || this.defaultSettings())); if (!st.expansion) st.expansion = { rule: 'auto' };
    if (!st.taskStatuses) st.taskStatuses = this.defaultSettings().taskStatuses; if (st.defaultValue === undefined) st.defaultValue = 8000;
    if (!st.costRates) st.costRates = this.defaultSettings().costRates; if (st.defaultCost === undefined) st.defaultCost = this.defaultSettings().defaultCost;
    if (!st.dealTasks) st.dealTasks = this.defaultSettings().dealTasks;
    if (!st.pathSteps) st.pathSteps = this.defaultSettings().pathSteps;
    if (!st.onboarding) st.onboarding = this.defaultSettings().onboarding; if (!st.practices) st.practices = this.defaultSettings().practices; if (!st.serviceLines) st.serviceLines = this.defaultSettings().serviceLines; if (!st.users) st.users = this.defaultSettings().users; if (!st.roles) st.roles = this.defaultSettings().roles;
    st.roles.forEach((r) => { r.acts = { ...this.defaultActs(r.name), ...(r.acts || {}) }; if (!r.crud) r.crud = this.defaultCrud(r.name, r); }); return st; }
  defaultActs(roleName) { const all = roleName === 'AE'; return { dealStage: all, dealPath: all, dealDrd: all, dealQuotes: all, dealForecast: all, leadCreate: all, tasks: true, logTime: true, projectDates: false, projectLifecycle: false, leadConvert: all, leadReassign: false }; }
  // Action permissions per role, set by admins in Settings > Users and roles. The Admin role can always do everything.
  // Record permissions (view, create, edit, delete) per role. The Admin role can always do everything.
  defaultCrud(roleName, r) { const ae = roleName === 'AE', a = (r && r.acts) || this.defaultActs(roleName), m = (r && r.menu) || {}, on = (k, d0) => m[k] !== undefined ? !!m[k] : d0;
    return { leads: { v: on('leads', ae), c: a.leadCreate !== undefined ? !!a.leadCreate : ae, e: on('leads', ae), vs: 'all', es: 'all' }, deals: { v: on('deals', true), c: true, e: true, vs: 'own', es: 'own' },
      quotes: { v: a.dealQuotes !== undefined ? !!a.dealQuotes : ae, c: a.dealQuotes !== undefined ? !!a.dealQuotes : ae, e: a.dealQuotes !== undefined ? !!a.dealQuotes : ae },
      tasks: { v: true, c: a.tasks !== false, e: true, d: true }, activities: { v: true, c: true, e: true, d: true }, projects: { v: on('projects', true), e: true, vs: 'own', es: 'own' },
      companies: { v: on('companies', true), c: true, e: true }, contacts: { v: on('contacts', true), c: true, e: true }, files: { v: true, c: true, d: true }, time: { c: a.logTime !== false, d: true } }; }
  // Record scope per role: 'all' records, or only the ones assigned to the user (deal team, project team, lead owner).
  scopeOf(st, rec, k) { const u = this.userOf(st); if (st.role === 'admin' || u.short === 'Admin') return 'all'; const r = (this.settingsOf(st.data).roles || []).find((x) => x.name === u.short); if (!r || r.locked) return r ? 'all' : 'own';
    const c = (r.crud || {})[rec] || {}; return c[k] || (rec === 'leads' ? 'all' : 'own'); }
  canDo(st, rec, op) { const u = this.userOf(st); if (st.role === 'admin' || u.short === 'Admin') return true; const r = (this.settingsOf(st.data).roles || []).find((x) => x.name === u.short);
    if (!r) return rec === 'tasks' || rec === 'activities' || rec === 'time'; if (r.locked) return true; return !!((r.crud || {})[rec] || {})[op]; }
  canAct(st, key) { const MAP = { dealQuotes: ['quotes', 'e'], leadCreate: ['leads', 'c'], tasks: ['tasks', 'c'], logTime: ['time', 'c'] }; if (MAP[key]) return this.canDo(st, MAP[key][0], MAP[key][1]); const u = this.userOf(st); if (st.role === 'admin' || u.short === 'Admin') return true; const r = (this.settingsOf(st.data).roles || []).find((x) => x.name === u.short); if (!r) return key === 'tasks' || key === 'logTime'; return !!r.locked || !!(r.acts || {})[key]; }
  // Users and roles live in Settings. Only the Admin role is an admin; every role's left-menu access is set per menu item.
  usersOf(data) { return this.settingsOf(data).users.map((u) => ({ name: u.name, email: u.email || '', short: u.role, role: u.role === 'Admin' ? 'admin' : 'ae', status: u.status || 'Active' })); }
  userOf(st) { const L = this.usersOf(st.data); return L.find((u) => u.name === (st.me || 'Erick Razo')) || L[0]; }
  menuOn(S, roleName, key) { const r = (S.roles || []).find((x) => x.name === roleName); if (!r) return key !== 'leads' && key !== 'settings'; if (r.locked) return true;
    if (['leads', 'deals', 'projects', 'companies', 'contacts'].indexOf(key) >= 0 && r.crud && r.crud[key]) return !!r.crud[key].v; return !!(r.menu || {})[key]; }
  canMenu(st, key) { const u = this.userOf(st); return st.role === 'admin' || u.short === 'Admin' || this.menuOn(this.settingsOf(st.data), u.short, key); }
  // Template tasks are copied onto a deal when it is created. Later template changes never touch existing deals.
  templateTasks(owner) {
    const S = this.settingsOf(this.state.data), st0 = (S.taskStatuses || [])[0], today = new Date().toISOString().slice(0, 10);
    return (S.dealTasks || []).filter((t) => String(t.title || '').trim()).map((t, i) => {
      let due = ''; const n = parseInt(t.days, 10);
      if (t.days !== '' && t.days !== undefined && !isNaN(n)) { const dd = new Date(today + 'T00:00:00'); dd.setDate(dd.getDate() + n); due = dd.toISOString().slice(0, 10); }
      return { id: 'dt' + Date.now() + '-' + i, title: String(t.title).trim(), due, owner: t.owner === 'owner' ? (owner || '') : '', status: (st0 && st0.label) || 'Not started', done: false, fromTemplate: true };
    });
  }
  billOf(e) { return e.billable === false ? 0 : (Number(e.hours) || 0) * (Number(e.rate) || 0); }
  updSettings(fn, msg) {
    this.setState((st) => { const next = this.settingsOf(st.data); fn(next); return { data: { ...st.data, settings: next } }; });
    if (msg) this.flash(msg);
  }

  newExpansion(name) {
    const base = this.state.data.deals.find((d) => d.company === name);
    const lead = this.state.data.leads.find((l) => l.company === name);
    const id = 'D' + Date.now();
    const raw = { id, no: this.nextNo(this.state.data.deals), name: 'Expansion opportunity', company: name, contact: base ? base.contact : lead ? lead.contact : '', owner: base ? base.owner : 'Dilbag Singh', se: '',
      industry: base ? base.industry : lead ? lead.industry : 'Not set', size: base ? base.size : lead && lead.size ? lead.size : 'Not set', tier: base ? base.tier : 'Starter', strategic: base ? base.strategic : false,
      seRequested: false, drd: [], proposal: 0, lines: [{ role: 'Solutions architect', hours: 20 }], seats: 0, quoteAccepted: false, paid: false, closed: false, closeReason: '', closeAmount: '', project: null,
      expansion: true, forecast: this.settingsOf(this.state.data).defaultValue || 0, nextStep: 'Scope the expansion with the customer', createdAt: new Date().toISOString().slice(0, 10) };
    if (base) { raw.contacts = JSON.parse(JSON.stringify(base.contacts || [])); raw.champions = (base.champions || []).slice(); raw.eb = base.eb || ''; }
    raw.tasks = this.templateTasks(raw.owner);
    const deal = this.norm(raw);
    this.setState((st) => ({ data: { ...st.data, deals: st.data.deals.concat([deal]) }, screen: 'deal', dealId: id, tab: 'overview', modal: '' }));
    this.flash('Expansion deal created for ' + name);
  }

  openSe(id) {
    const d = this.state.data.deals.find((z) => z.id === id);
    if (!d) return;
    this.setState({ modal: 'se', seForm: { pick: d.se || '', scope: d.seScope || this.SCOPES[0], note: d.seNote || '' } });
  }
  openMember(ctx, role) { this.setState({ modal: 'member', memberForm: { ctx: ctx, q: '', pick: '', role: role || (ctx === 'project' ? 'Support SA' : 'Solutions architect'), fixed: !!role } }); }
  openContact(asEb) { this.setState({ modal: 'contact', contactForm: { name: '', email: '', phone: '', asEb: !!asEb } }); }
  openStake() { this.setState({ modal: 'stake', stakeForm: { name: '', email: '', role: 'monday.com rep' } }); }

  seed() {
    const base = this.seedBase();
    const c = (name, email, phone) => ({ name, email, phone });
    const extra = {
      D1: { expectedHours: 30, contacts: [c('Owen Hart', 'owen.hart@lumenfreight.example', '+1 555-0142')],
        med: this.med({ pain: { s: 2, n: 'Dispatch is tracked on whiteboards and status updates are manual.' } }),
        critical: { date: '2026-12-01', label: 'Go-live' }, expectedClose: '2026-11-20', nextStep: 'Choose an SE and book the scoping call', forecast: 8000, hasQuote: false },
      D2: { tasks: [
          { id: 'dt-d2-1', title: 'Draft the scoping questions for the ops team', owner: 'Sahira Mehta', due: '2026-10-30', status: 'In progress', done: false, desc: 'Intake routing first. Cover each clinic\'s current email and phone flow.' },
          { id: 'dt-d2-2', title: 'Confirm the budget owner with Nadia', owner: 'Dilbag Singh', due: '2026-11-03', status: 'Not started', done: false },
          { id: 'dt-d2-3', title: 'Prepare the solution walkthrough', owner: 'Jamie Cole', due: '2026-11-05', status: 'Not started', done: false }
        ],
        timelog: [{ id: 'te-d2-1', task: 'dt-d2-1', date: '2026-10-20', hours: 2, note: 'First pass at the discovery questions', by: 'Sahira Mehta' }],
        activities: [
          { id: 'a-d2-1', type: 'Meeting', date: '2026-10-08', title: 'Right-fit call with Grace and the ops team', details: 'Intake routing is the top priority. Nadia owns the budget.', by: 'Dilbag Singh (AE)' },
          { id: 'a-d2-2', type: 'Email', date: '2026-10-14', title: 'Sent the Scenario A proposal from Prospero', details: '', by: 'Dilbag Singh (AE)' },
          { id: 'a-d2-3', type: 'Next step', date: '2026-10-27', title: 'Walk Nadia through the quote', details: '', by: 'Dilbag Singh (AE)' }
        ],
        files: [
          { id: 'f-d2-1', kind: 'link', name: 'Harborline proposal (Prospero)', url: 'https://example.com/harborline-proposal', category: 'Proposal', date: '2026-10-14', by: 'Dilbag Singh (AE)' },
          { id: 'f-d2-2', kind: 'file', name: 'Right-fit call notes.pdf', url: '', size: 184000, category: 'Discovery notes', date: '2026-10-08', by: 'Dilbag Singh (AE)' }
        ],
        expectedHours: 60, contacts: [c('Grace Okafor', 'grace.okafor@harborline.example', '+1 555-0118'), c('Nadia Reyes', 'nadia.reyes@harborline.example', '+1 555-0127')],
        champions: ['Grace Okafor'], eb: 'Nadia Reyes',
        med: this.med({ champ: { n: 'Operations manager. Wants one intake flow for every clinic.' }, metrics: { s: 3, n: 'Time from intake email to the right clinic.' }, eb: { s: 2, n: 'Owns the operations tooling budget.' }, pain: { s: 4, n: 'Intake emails sorted by hand. Double data entry from the EHR export.' }, comp: { s: 2, items: [{ id: 'c-d2-1', no: 1, text: 'Another monday.com partner' }] } }),
        budget: '$12,000', critical: { date: '2026-11-16', label: 'Go-live' }, expectedClose: '2026-11-06', nextStep: 'Approve the last two DRD items', forecast: 10000, hasQuote: true,
        stakeholders: [{ name: 'Chris Patel', email: 'chris.patel@monday.example', role: 'monday.com rep' }] },
      D3: { chatter: [{ id: 'c-d3-1', by: 'Sahira Mehta', at: '2026-10-26T15:20:00.000Z', text: '@Dilbag the PO is with their finance team. Can you chase Luis on Thursday?', mentions: ['Dilbag Singh'] }], activities: [{ id: 'a-d3-1', type: 'Call', date: '2026-10-16', title: 'Quote accepted on a call with Luis', details: 'Waiting on their finance team for the PO.', by: 'Dilbag Singh (AE)' }],
        files: [{ id: 'f-d3-1', kind: 'link', name: 'Cobalt Ridge SOW draft', url: 'https://example.com/cobalt-sow', category: 'SOW', date: '2026-10-15', by: 'Dilbag Singh (AE)' }],
        expectedHours: 50, contacts: [c('Luis Ortega', 'luis.ortega@cobaltridge.example', '+1 555-0163')], champions: ['Luis Ortega'],
        med: this.med({ metrics: { s: 2, n: '' }, pain: { s: 4, n: 'Job data re-typed weekly. Change orders chased by phone.' }, pp: { s: 3, n: 'Signature in Prospero, then a PO from their finance team.' }, comp: { s: 1, items: [{ id: 'c-d3-1', no: 1, text: 'Another monday.com partner' }, { id: 'c-d3-2', no: 2, text: 'In-house build' }] } }),
        critical: { date: '2026-11-02', label: 'Go-live' }, expectedClose: '2026-10-30', nextStep: 'Collect the signature in Prospero', forecast: 7500, hasQuote: true },
      D4: { expectedHours: 80, contacts: [c('Hannah Moss', 'hannah.moss@copperleaf.example', '+1 555-0175'), c('Tom Fischer', 'tom.fischer@copperleaf.example', '+1 555-0181')],
        champions: ['Hannah Moss'], eb: 'Tom Fischer',
        med: this.med({ metrics: { s: 4, n: 'Referrals converted per practice and recall rate.' }, eb: { s: 4, n: 'Signed off on phase 2.' }, dc: { s: 3, n: '' }, dp: { s: 3, n: '' }, pp: { s: 4, n: 'Signed. Waiting on payment.' }, pain: { s: 4, n: 'Referrals tracked per office. Recalls missed.' } }),
        budget: '$25,000', critical: { date: '2026-10-15', label: 'Go-live' }, expectedClose: '2026-10-23', nextStep: 'Confirm payment with the customer', forecast: 20000, hasQuote: true,
        stakeholders: [{ name: 'Dana Whitfield', email: '', role: 'CPM' }] },
      D6: { expansion: true, contacts: [c('Ethan Brooks', 'ethan.brooks@sablestone.example', '+1 555-0190')], champions: ['Ethan Brooks'], eb: 'Ethan Brooks',
        med: this.med({ pain: { s: 3, n: 'Tenants call for every status update.' } }), critical: { date: '2027-01-15', label: 'Go-live' }, expectedClose: '2026-12-12', nextStep: 'Scope the tenant portal with Ethan', forecast: 6000, hasQuote: false },
      D5: { expectedHours: 100, contacts: [c('Ethan Brooks', 'ethan.brooks@sablestone.example', '+1 555-0190')], champions: ['Ethan Brooks'], eb: 'Ethan Brooks',
        med: this.med({ metrics: { s: 4, n: '' }, eb: { s: 4, n: '' }, pain: { s: 4, n: 'Tenant requests arrive by phone and email.' } }),
        critical: { date: '2026-10-01', label: 'Go-live' }, expectedClose: '2026-10-01', nextStep: 'Project kickoff', forecast: 21500, hasQuote: true }
    };
    const deals = base.deals.map((d) => this.norm({ ...d, ...(extra[d.id] || {}) }));
    const d2 = deals.find((d) => d.id === 'D2');
    if (d2) d2.quotes.push({ id: 'q-D2-b', name: 'Scenario B', ver: 1, status: 'Draft', lines: [{ role: 'Solutions architect', hours: 24 }, { role: 'Consultant', hours: 16 }], lic: [] });
    const FC = { D2: ['Best case', 70], D3: ['Commit', 90], D4: ['Commit', 90] };
    const DT = { D1: { createdAt: '2026-10-09', leadCreatedAt: '2026-10-02' }, D2: { createdAt: '2026-09-28', leadCreatedAt: '2026-09-21' }, D3: { createdAt: '2026-09-22' },
      D4: { createdAt: '2026-09-08', leadCreatedAt: '2026-09-01', signedAt: '2026-10-14' }, D5: { createdAt: '2026-08-25', leadCreatedAt: '2026-08-18', signedAt: '2026-09-24', paidAt: '2026-09-30' }, D6: { createdAt: '2026-10-21' } };
    deals.forEach((d) => Object.assign(d, DT[d.id] || {}));
    const LDT = { L1: '2026-10-05', L2: '2026-10-12', L3: '2026-10-19' };
    base.leads.forEach((l) => { l.createdAt = LDT[l.id] || ''; });
    deals.forEach((d) => {
      if (FC[d.id]) { d.fcat = FC[d.id][0]; d.prob = FC[d.id][1]; }
      (d.quotes || []).forEach((q) => { (q.lines || []).forEach((l, i) => { if (l.pay === 'Annually') l.pay = 'Quarterly'; if (!l.id) l.id = q.id + '-sl' + i; }); q.billing = q.billing || 'Annually'; (q.lic || []).forEach((l) => { if (!l.pay) { const b0 = q.billing || 'Annually'; l.months = Math.max(1, Number(l.term) || 12); l.pay = b0 === 'Quarterly' ? 'Quarterly' : 'Monthly'; if (l.pay === 'Quarterly') l.months = 3 * Math.ceil(l.months / 3); } }); (q.lic || []).forEach((l) => { l.vendor = l.vendor || 'monday.com'; }); });
    });
    return { leads: base.leads.map((l) => this.leadDerive(l)), deals, settings: this.defaultSettings(), companyInfo: this.seedCompanies() };
  }

  seedBase() {
    const drd = (rows) => rows.map((r) => ({ req: r[0], pain: r[1], champ: r[2], eb: r[3], ok: r[4] }));
    return {
      leads: [
        { id: 'L1', first: 'Maya', last: 'Ortiz', company: 'Kestrel Foods', email: 'maya.ortiz@kestrelfoods.example', phone: '+1 555-0142', owner: 'Dilbag Singh', source: 'monday.com rep', products: ['monday CRM', 'Make.com'], services: ['Professional services hours'], industry: 'Food distribution', size: '200–500', value: 18000, nextStep: 'Get SMP approval from the CPM', notes: 'Wants a pilot with the sales team before rolling out to onboarding.', tasks: [{ id: 'lt-1', title: 'Send the SMP form to the CPM', due: '2026-10-29', done: false }, { id: 'lt-2', title: 'Book the right-fit call', due: '2026-10-15', done: true }], status: 'Qualified', rep: 'yes', checks: { cpm: true, rep: true, sfOpp: true, smp: false }, needs: 'Leads tracked in spreadsheets. Handoff to onboarding is manual and details get lost.' },
        { id: 'L2', first: 'Jordan', last: 'Blake', company: 'Brightpath Academy', email: 'jordan.blake@brightpath.example', phone: '+1 555-0177', owner: '', source: 'Website scheduling link', products: ['monday Work Management'], services: ['Professional training'], industry: 'Education', size: '50–200', value: 0, nextStep: '', notes: '', tasks: [], status: 'Working', rep: 'no', checks: {}, needs: 'Course operations run on email threads and shared sheets.' },
        { id: 'L3', first: 'Priya', last: 'Nair', company: 'Alder & Finch Legal', email: 'priya.nair@alderfinch.example', phone: '+1 555-0163', owner: 'Dilbag Singh', source: 'monday go-to partner', products: ['monday CRM'], services: [], industry: 'Legal services', size: '50–200', value: 0, nextStep: '', notes: '', tasks: [], status: 'New', rep: 'yes', checks: { cpm: true }, needs: 'Client intake requests get lost between partners.' }
      ],
      deals: [
        { id: 'D6', name: 'Tenant portal', company: 'Sable & Stone Realty', contact: 'Ethan Brooks', owner: 'Dilbag Singh', se: '', industry: 'Real estate', size: '200–500', tier: 'Growth', strategic: false,
          seRequested: false, drd: drd([['Tenant self-service portal', 'Tenants call for every status update', 'High', 'High', false], ['Portal sign-in with tenant accounts', 'No tenant identity in monday', 'Medium', 'Medium', false]]),
          proposal: 0, lines: [{ role: 'Solutions architect', hours: 30 }], seats: 0, quoteAccepted: false, paid: false, closed: false, closeReason: '', closeAmount: '', project: null },
        { id: 'D1', name: 'Onboarding package', company: 'Lumen Freight', contact: 'Owen Hart', owner: 'Dilbag Singh', se: '', industry: 'Logistics', size: '50–200', tier: 'Starter', strategic: false,
          seRequested: false, drd: drd([['Boards for the dispatch team', 'Dispatch tracked on whiteboards', 'High', 'Medium', false], ['Status-change automations', 'Manual status updates', 'Medium', 'Low', false], ['Team training session', 'Adoption risk', 'Medium', 'Medium', false]]),
          proposal: 0, lines: [{ role: 'Consultant', hours: 30 }], seats: 0, quoteAccepted: false, paid: false, closed: false, closeReason: '', closeAmount: '', project: null },
        { id: 'D2', name: 'Workflow automation', company: 'Harborline Clinics', contact: 'Grace Okafor', owner: 'Dilbag Singh', se: 'Sahira Mehta', industry: 'Healthcare', size: '200–500', tier: 'Growth', strategic: true,
          seRequested: true, drd: drd([['Patient intake routed to the right clinic', 'Intake emails sorted by hand', 'High', 'High', true], ['Make integration with the EHR export', 'Double data entry', 'High', 'Medium', true], ['Weekly operations dashboard', 'No view across clinics', 'Medium', 'High', false], ['Role-based board permissions', 'Everyone sees everything', 'Medium', 'Medium', false]]),
          proposal: 1, lines: [{ role: 'Solutions architect', hours: 40 }, { role: 'Consultant', hours: 24 }], seats: 0, quoteAccepted: false, paid: false, closed: false, closeReason: '', closeAmount: '', project: null },
        { id: 'D3', name: 'Make integration', company: 'Cobalt Ridge Builders', contact: 'Luis Ortega', owner: 'Dilbag Singh', se: 'Sahira Mehta', industry: 'Construction', size: '50–200', tier: 'Growth', strategic: false,
          seRequested: true, drd: drd([['Sync job sites from the ERP', 'Job data re-typed weekly', 'High', 'High', true], ['Change-order approvals in monday', 'Approvals chased by phone', 'High', 'Medium', true], ['Alerts for budget overruns', 'Overruns found too late', 'Medium', 'High', true]]),
          proposal: 1, lines: [{ role: 'Solutions architect', hours: 50 }], seats: 0, quoteAccepted: true, paid: false, closed: false, closeReason: '', closeAmount: '', project: null },
        { id: 'D4', name: 'CRM phase 2', company: 'Copperleaf Dental', contact: 'Hannah Moss', owner: 'Dilbag Singh', se: 'Sahira Mehta', industry: 'Dental group', size: '500–2,000', tier: 'Scale', strategic: true,
          seRequested: true, drd: drd([['Referral pipeline for 12 practices', 'Referrals tracked per office', 'High', 'High', true], ['Automated recall campaigns', 'Recalls missed', 'High', 'Medium', true], ['Practice-level reporting', 'No group-wide view', 'Medium', 'High', true]]),
          proposal: 2, lines: [{ role: 'Solutions architect', hours: 40 }, { role: 'Consultant', hours: 40 }], seats: 15, quoteAccepted: true, paid: false, closed: false, closeReason: '', closeAmount: '', project: null },
        { id: 'D5', name: 'Service desk rollout', company: 'Sable & Stone Realty', contact: 'Ethan Brooks', owner: 'Dilbag Singh', se: 'Sahira Mehta', industry: 'Real estate', size: '200–500', tier: 'Growth', strategic: false,
          seRequested: true, drd: drd([['Tenant requests into one service desk', 'Requests arrive by phone and email', 'High', 'High', true], ['SLA tracking by property', 'No response-time data', 'Medium', 'High', true], ['Vendor dispatch automation', 'Vendors booked manually', 'Medium', 'Medium', true]]),
          proposal: 2, lines: [{ role: 'Solutions architect', hours: 60 }, { role: 'Consultant', hours: 40 }], seats: 10, quoteAccepted: true, paid: true, closed: true, closeReason: 'Strong product fit', closeAmount: '$21,500',
          project: { id: 'PRJ-1005', seedEst: { 't-m0-0': 4, 't-m1-0': 12, 't-m1-1': 6, 't-m2-0': 16, 't-m2-1': 12, 't-m2-2': 10, 't-m3-0': 8 }, checks: [true, true, true, false, false, false], checkLabels: ['__drd__', 'Set start date', 'Send getting-started email', 'Request account access', 'Schedule kickoff call', 'Review scope and documents'], dates: { start: '2026-10-06', end: '2026-12-29', expires: '2027-04-06' },
            team: [{ name: 'Erick Razo', role: 'Engagement manager' }, { name: 'Jamie Cole', role: 'Lead SA' }, { name: 'Avery Brooks', role: 'Support staff' }],
            timelog: [{ id: 'e-d5-1', date: '2026-10-08', hours: 4, ms: 'm0', task: '', role: 'Solutions architect', rate: 155, by: 'Jamie Cole', note: 'Kickoff prep' }, { id: 'e-d5-2', date: '2026-10-14', hours: 2, ms: 'm0', task: 't-m0-0', role: 'Solutions architect', rate: 155, by: 'Jamie Cole', note: '' }] } }
      ]
    };
  }

  componentDidMount() {
    try {
      const raw = window.localStorage.getItem(this.KEY), rawUi = window.localStorage.getItem(this.KEY + ':ui');
      if (raw) {
        const d = JSON.parse(raw);
        if (d && Array.isArray(d.leads) && Array.isArray(d.deals)) { d.deals.forEach((x) => (x.quotes || []).forEach((q) => { (q.lines || []).forEach((l, i) => { if (l.pay === 'Annually') l.pay = 'Quarterly'; if (!l.id) l.id = q.id + '-sl' + i; }); (q.lic || []).forEach((l) => { if (!l.pay) { const b0 = q.billing || 'Annually'; l.months = Math.max(1, Number(l.term) || 12); l.pay = b0 === 'Quarterly' ? 'Quarterly' : 'Monthly'; if (l.pay === 'Quarterly') l.months = 3 * Math.ceil(l.months / 3); } }); })); this._noLog = true; this.setState({ data: d }); }
      }
      if (rawUi) { const u = JSON.parse(rawUi); if (u && typeof u === 'object') { const pick = {}; this.UIKEYS.forEach((k) => { if (u[k] !== undefined) pick[k] = u[k]; }); this._uiLast = rawUi; this.setState(pick); } }
    } catch (e) {}
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.data !== this.state.data) {
      try { window.localStorage.setItem(this.KEY, JSON.stringify(this.state.data)); } catch (e) {}
    }
    // Where the user was (who is signed in, which record and tab) is kept too, so a refresh returns to the same place.
    const ui = {}; this.UIKEYS.forEach((k) => { if (this.state[k] !== undefined) ui[k] = this.state[k]; }); const js = JSON.stringify(ui);
    if (js !== this._uiLast) { this._uiLast = js; try { window.localStorage.setItem(this.KEY + ':ui', js); } catch (e) {} }
  }

  componentWillUnmount() { clearTimeout(this._t); }

  // Change log: every change to leads, deals, projects, companies and contacts is diffed and recorded.
  logWrap() {
    const raw = this.setState.bind(this);
    this.setState = (u, cb) => {
      const skip = !!this._noLog; this._noLog = false;
      return raw((st, p) => {
        const v = typeof u === 'function' ? u(st, p) : u;
        if (skip || !v || !v.data || !st || !st.data || v.data === st.data) return v;
        const ents = this.actDiff(st.data, v.data, st.imp ? st.imp + ' as ' + (st.me || '') : (st.me || 'Erick Razo'));
        return ents.length ? { ...v, data: { ...v.data, activity: this.actMerge(v.data.activity || [], ents) } } : v;
      }, cb);
    };
  }
  actLab(k) {
    const L = { first: 'First name', last: 'Last name', email: 'Email', phone: 'Phone', source: 'Lead source', owner: 'Owner (AE)', assignee: 'Assignee', industry: 'Industry', value: 'Estimated value', forecast: 'Estimated value',
      nextStep: 'Next step', notes: 'Notes', stage: 'Stage', rep: 'monday.com rep involved', checks: 'Lead checklist', products: 'Products', services: 'Services', tasks: 'task', needs: 'Needs',
      name: 'Name', title: 'Title', contacts: 'contact', files: 'file', activities: 'activity', drd: 'DRD item', quotes: 'quote', se: 'SE', fcat: 'Forecast category', prob: 'Probability',
      expectedClose: 'Expected close', closed: 'Closed Won', lost: 'Closed Lost', stakeholders: 'partner stakeholder', champions: 'Champions', eb: 'Economic buyer', med: 'MEDDPICC', team: 'team member',
      milestones: 'phase', timelog: 'time entry', setup: 'Setup', escalations: 'escalation', due: 'Due date', est: 'Estimated hours', desc: 'Description', key: 'Key milestone', reqs: 'Requirements',
      done: 'Done', status: 'Status', billing: 'Billing details', banking: 'Banking details', tech: 'Tech stack', tier: 'Customer tier', size: 'Company size', strategic: 'Strategic account',
      lines: 'quote line', paid: 'Payment received', quoteAccepted: 'Quote accepted', critical: 'Critical date', closeReason: 'Close reason', closeAmount: 'Close amount', company: 'Company', tags: 'tag',
      hours: 'Hours', note: 'Note', ms: 'Phase', task: 'Task', who: 'Person', date: 'Date', category: 'Category', access: 'Access', url: 'Link', dealId: 'Linked deal', seScope: 'SE scope', seNote: 'SE note' };
    return L[k] || String(k).replace(/([A-Z])/g, ' $1').replace(/^./, (c) => c.toUpperCase());
  }
  actFmt(k, v) {
    if (v === undefined || v === null || v === '') return '';
    if (typeof v === 'boolean') return v ? 'Yes' : 'No';
    if ((k === 'value' || k === 'forecast' || k === 'closeAmount') && Number(v)) return '$' + Number(v).toLocaleString('en-US');
    if (typeof v === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(v)) { const d0 = new Date(v + 'T00:00:00'); if (!isNaN(d0)) return d0.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }); }
    const t = Array.isArray(v) ? v.join(', ') : String(v);
    return t.length > 60 ? t.slice(0, 57) + '…' : t;
  }
  actLine(k, x, y) {
    const f = this.actFmt(k, x), t = this.actFmt(k, y);
    return !f ? 'set ' + this.actLab(k) + ' to ' + t : !t ? 'cleared ' + this.actLab(k) : 'changed ' + this.actLab(k) + ' from ' + f + ' to ' + t;
  }
  actDiff(a, b, by) {
    const out = [], same = (x, y) => JSON.stringify(x) === JSON.stringify(y), prim = (v) => v === null || v === undefined || typeof v !== 'object';
    const nm = (o) => (o && (o.name || o.title || o.label || o.req || o.role || o.note || o.id)) || 'item';
    const SKIP = { chatter: 1, pchatter: 1, activity: 1, chat: 1, no: 1, id: 1, createdAt: 1, updatedAt: 1, leadCreatedAt: 1, leadCode: 1, leadId: 1 };
    const LSKIP = { interest: 1, pain: 1, name: 1, contact: 1, status: 1 };
    const diffObj = (x, y, on, extra) => {
      x = x || {}; y = y || {};
      Object.keys({ ...x, ...y }).forEach((k) => {
        if (SKIP[k] || (extra && extra[k]) || same(x[k], y[k])) return;
        const u = x[k], v = y[k];
        if (prim(u) && prim(v)) { out.push({ on, key: k, f: k, from: u, to: v, text: this.actLine(k, u, v) }); return; }
        if (Array.isArray(u) || Array.isArray(v)) {
          const A = u || [], Bv = v || [];
          if (A.concat(Bv).every(prim)) {
            const add = Bv.filter((z) => A.indexOf(z) < 0), rem = A.filter((z) => Bv.indexOf(z) < 0);
            if (add.length) out.push({ on, key: k + '+', text: 'added ' + this.actLab(k) + ': ' + add.join(', ') });
            if (rem.length) out.push({ on, key: k + '-', text: 'removed ' + this.actLab(k) + ': ' + rem.join(', ') });
            return;
          }
          const idOf = (o, i) => (o && (o.id || o.name)) || 'i' + i;
          const ma = {}, mb = {}; A.forEach((o, i) => { ma[idOf(o, i)] = o; }); Bv.forEach((o, i) => { mb[idOf(o, i)] = o; });
          Object.keys(mb).forEach((id) => { if (!ma[id]) out.push({ on, key: k + '+' + id, text: 'added ' + this.actLab(k) + ' "' + nm(mb[id]) + '"' }); });
          Object.keys(ma).forEach((id) => { if (!mb[id]) out.push({ on, key: k + '-' + id, text: 'removed ' + this.actLab(k) + ' "' + nm(ma[id]) + '"' }); });
          Object.keys(mb).forEach((id) => {
            const p = ma[id], q = mb[id]; if (!p || same(p, q)) return;
            const ch = Object.keys({ ...p, ...q }).filter((kk) => !SKIP[kk] && !same(p[kk], q[kk]));
            const subs = ch.filter((kk) => prim(p[kk]) && prim(q[kk]) && !(kk === 'done' && ch.indexOf('status') >= 0)).map((kk) => ({ k: kk === 'owner' ? 'assignee' : kk, from: p[kk], to: q[kk] }));
            const other = ch.filter((kk) => !(prim(p[kk]) && prim(q[kk])));
            out.push({ on, key: k + ':' + id + ':' + ch.join(','), text: 'updated ' + this.actLab(k) + ' "' + nm(q) + '"', subs, other });
          });
          return;
        }
        const subk = Object.keys({ ...(u || {}), ...(v || {}) }).filter((kk) => !same((u || {})[kk], (v || {})[kk]));
        const U0 = u || {}, V0 = v || {};
        const psubs = subk.filter((kk) => prim(U0[kk]) && prim(V0[kk])).map((kk) => ({ k: kk, from: U0[kk], to: V0[kk] }));
        const pother = subk.filter((kk) => !(prim(U0[kk]) && prim(V0[kk])));
        out.push({ on, key: k + ':' + subk.join(','), text: 'updated ' + this.actLab(k), subs: psubs, other: pother });
      });
    };
    (b.leads || []).forEach((l) => { const p = (a.leads || []).find((z) => z.id === l.id), on = { type: 'lead', id: l.id };
      if (!p) out.push({ on, key: 'create', text: 'created the lead' });
      else if (p !== l) { if (!p.dealId && l.dealId) out.push({ on, key: 'conv', text: 'converted the lead to a deal' }); diffObj(p, l, on, { ...LSKIP, dealId: 1 }); } });
    (a.leads || []).forEach((l) => { if (!(b.leads || []).some((z) => z.id === l.id)) out.push({ on: { type: 'lead', id: l.id }, key: 'del', text: 'deleted the lead' }); });
    (b.deals || []).forEach((d) => { const p = (a.deals || []).find((z) => z.id === d.id), on = { type: 'deal', id: d.id };
      if (!p) { out.push({ on, key: 'create', text: d.leadId ? 'created the deal from the lead' : d.expansion ? 'created the expansion deal' : 'created the deal' }); return; }
      if (p === d) return;
      const { project: pp, ...pr } = p, { project: dp, ...dr } = d;
      diffObj(pr, dr, on);
      if (!pp && dp) out.push({ on: { type: 'project', id: d.id }, key: 'create', text: 'created the project' });
      else if (pp && dp && !same(pp, dp)) { let p1 = pp, p2 = dp; try { p1 = this.projectFull(p); p2 = this.projectFull(d); } catch (e) {} diffObj(p1, p2, { type: 'project', id: d.id }, { seedEst: 1 }); } });
    const ca = a.companyInfo || {}, cb = b.companyInfo || {};
    Object.keys(cb).forEach((n) => { if (ca[n] === cb[n] || same(ca[n], cb[n])) return; const on = { type: 'company', id: n };
      if (!ca[n] && cb[n].created) { out.push({ on, key: 'create', text: 'created the company' }); return; }
      const { people: pa, ...ra } = ca[n] || {}, { people: pb, ...rb } = cb[n];
      diffObj(ra, rb, on, { created: 1 });
      const PA = pa || {}, PB = pb || {};
      Object.keys(PB).forEach((who) => { if (!same(PA[who], PB[who])) diffObj(PA[who] || {}, PB[who], { type: 'contact', id: n + '|' + who }); }); });
    const at = new Date().toISOString();
    return out.map((e, i) => ({ id: 'a' + Date.now().toString(36) + i + Math.random().toString(36).slice(2, 6), at, by, ...e }));
  }
  actMerge(list, ents) {
    const res = list.slice(), key = (e) => JSON.stringify(e.on) + '|' + e.key + '|' + e.by;
    ents.forEach((e) => {
      const last = res[res.length - 1];
      if (last && key(last) === key(e) && (new Date(e.at) - new Date(last.at)) < 120000 && (e.f || e.subs)) {
        if (e.f) { const m = { ...last, at: e.at, to: e.to, text: this.actLine(e.f, last.from, e.to) }; if (this.actFmt(e.f, last.from) === this.actFmt(e.f, e.to)) res.pop(); else res[res.length - 1] = m; return; }
        const subs = (last.subs || []).map((x) => ({ ...x })); e.subs.forEach((x) => { const y = subs.find((z) => z.k === x.k); if (y) y.to = x.to; else subs.push({ ...x }); });
        res[res.length - 1] = { ...last, at: e.at, subs: subs.filter((x) => this.actFmt(x.k, x.from) !== this.actFmt(x.k, x.to)) }; return;
      }
      res.push(e);
    });
    return res.slice(-3000);
  }


  flash(msg) {
    clearTimeout(this._t);
    this.setState({ toast: msg });
    this._t = setTimeout(() => this.setState({ toast: '' }), 2800);
  }

  openDeal(id, tab) { this.setState({ screen: 'deal', dealId: id, tab: tab || 'overview', modal: '', qSel: '', drdOpen: '' }); }
  canSeeLeads(st) { const u = this.userOf(st); return st.role === 'admin' || u.short === 'Admin' || u.short === 'AE'; }
  openLead(id) { if (!this.canMenu(this.state, 'leads')) { this.flash('Leads are visible to Admins and AEs only.'); return; } this.setState({ screen: 'lead', leadId: id, modal: '', leadEdit: '', leadForm: null, ltab: 'overview', taskOpen: '', chatOn: null }); }
  openProject(id) { this.setState({ screen: 'project', dealId: id, modal: '', ptab: 'overview', pMs: '', reqPick: null, reqMin: false, reqOpen: '', chatOn: null, chatPrev: null, taskOpen: '' }); }

  updDeal(id, fn, msg) {
    this.setState((st) => ({ data: { ...st.data, deals: st.data.deals.map((d) => d.id === id ? fn(JSON.parse(JSON.stringify(d))) : d) } }));
    if (msg) this.flash(msg);
  }

  updLead(id, fn, perm) {
    const pm = perm === undefined ? ['leads', 'e'] : perm; if (pm && !this.canDo(this.state, pm[0], pm[1])) { this.flash('Your role can\'t edit leads.'); return; }
    if (pm && pm[0] === 'leads' && this.scopeOf(this.state, 'leads', 'es') === 'own') { const l0 = this.state.data.leads.find((l) => l.id === id), me0 = this.state.me || 'Erick Razo'; if (l0 && l0.owner !== me0) { this.flash('You can only edit leads you own.'); return; } }
    this.setState((st) => ({ data: { ...st.data, leads: st.data.leads.map((l) => l.id === id ? this.leadDerive(fn({ ...l, products: (l.products || []).slice(), services: (l.services || []).slice(), tasks: (l.tasks || []).map((t) => ({ ...t })) })) : l) } }));
  }

  leadDerive(l0) {
    const l = { ...l0 };
    if (l.first === undefined) { const parts = String(l.contact || '').trim().split(' '); l.first = parts[0] || ''; l.last = parts.slice(1).join(' '); }
    l.contact = (String(l.first || '').trim() + ' ' + String(l.last || '').trim()).trim();
    l.products = l.products || []; l.services = l.services || []; l.tasks = l.tasks || [];
    l.interest = l.products.concat(l.services).join(', ') || 'Not set yet';
    if (l.needs === undefined) l.needs = l.pain || '';
    l.pain = l.needs;
    l.name = l.company + ' – ' + l.contact;
    if (!l.stage) l.stage = ({ Working: 'MQL', Qualified: 'SQL' })[l.status] || 'New';
    return l;
  }

  saveContact(company, oldName) {
    if (!this.canDo(this.state, 'contacts', 'e')) { this.flash('Your role can\'t edit contacts.'); return; }
    const f = this.state.ctEditForm || {}, tr = (v) => String(v || '').trim();
    const nm = tr(f.name) || oldName;
    this.setState((st) => {
      const data = JSON.parse(JSON.stringify(st.data));
      const ren = (v) => v === oldName ? nm : v;
      data.deals.forEach((d) => { if (d.company !== company) return;
        d.contact = ren(d.contact); d.eb = ren(d.eb); d.champions = (d.champions || []).map(ren);
        (d.contacts || []).forEach((c) => { if (c.name === oldName) { c.name = nm; c.email = tr(f.email); c.phone = tr(f.phone); } }); });
      data.leads = data.leads.map((l) => { if (l.company !== company || l.contact !== oldName) return l; const parts = nm.split(' '); return this.leadDerive({ ...l, first: parts[0], last: parts.slice(1).join(' '), email: tr(f.email) || l.email, phone: tr(f.phone) || l.phone }); });
      const ci = data.companyInfo = data.companyInfo || {}; const inf = ci[company] = ci[company] || {};
      inf.contacts = (inf.contacts || []).map((c) => c.name === oldName ? { ...c, name: nm } : c);
      const ppl = inf.people = inf.people || {}; const prev = ppl[oldName] || {}; delete ppl[oldName];
      ppl[nm] = { ...prev, title: tr(f.title), email: tr(f.email), phone: tr(f.phone) };
      if (inf.billing && inf.billing.contact === oldName) inf.billing.contact = nm;
      return { data, ctEdit: false, contactKey: company + '|' + nm };
    });
    this.flash(nm + ' updated');
  }
  toggleContactTag(company, name, tag) {
    this.updCompany(company, (ci) => {
      if (tag === 'Billing contact') { ci.billing = { ...(ci.billing || {}) }; ci.billing.contact = ci.billing.contact === name ? '' : name; return; }
      const ppl = ci.people = ci.people || {}; const p = ppl[name] = { ...(ppl[name] || {}) }; const tags = (p.tags || []).slice();
      p.tags = tags.indexOf(tag) >= 0 ? tags.filter((t) => t !== tag) : tags.concat([tag]);
    });
  }

  // Company names match case-insensitively, so "kestrel foods" joins Kestrel Foods instead of creating a duplicate company.
  canonCo(name) {
    const q = String(name || '').trim(), lq = q.toLowerCase(); if (!q) return q;
    const D = this.state.data, pool = D.deals.map((d) => d.company).concat(D.leads.map((l) => l.company)).concat(Object.keys(D.companyInfo || {}));
    return pool.find((n) => String(n || '').trim().toLowerCase() === lq) || q;
  }

  createDeal() {
    const f = this.state.dealForm || {}, tr = (v) => String(v || '').trim();
    const company = this.canonCo(f.company), nm = (tr(f.first) + ' ' + tr(f.last)).trim();
    if (!company || !tr(f.name) || !nm || !tr(f.owner || 'Dilbag Singh')) return;
    const id = 'D' + Date.now();
    const base = this.state.data.deals.find((d) => d.company === company), lead = this.state.data.leads.find((l) => l.company === company);
    const contacts = base ? JSON.parse(JSON.stringify(base.contacts || [])) : [];
    if (!contacts.some((c) => c.name === nm)) contacts.push({ name: nm, email: tr(f.email), phone: tr(f.phone) });
    const raw = { id, no: this.nextNo(this.state.data.deals), name: tr(f.name), company, contact: nm, owner: f.owner || 'Dilbag Singh', se: '',
      industry: base ? base.industry : lead && lead.industry ? lead.industry : 'Not set', size: base ? base.size : lead && lead.size ? lead.size : 'Not set', tier: base ? base.tier : 'Starter', strategic: base ? base.strategic : false,
      seRequested: false, drd: [], proposal: 0, lines: [], seats: 0, quoteAccepted: false, paid: false, closed: false, closeReason: '', closeAmount: '', project: null,
      expansion: this.settingsOf(this.state.data).expansion.rule === 'manual' ? f.type === 'exp' : this.state.data.deals.some((o) => o.company === company && o.closed), source: f.source || 'Direct', createdAt: new Date().toISOString().slice(0, 10), expectedClose: f.close || '', forecast: parseInt(String(f.forecast || '').replace(/[^0-9]/g, ''), 10) || this.settingsOf(this.state.data).defaultValue || 0,
      contacts, nextStep: 'Choose an SE and book the scoping call' };
    if (base) { raw.champions = (base.champions || []).slice(); raw.eb = base.eb || ''; }
    raw.tasks = this.templateTasks(raw.owner);
    const deal = this.norm(raw);
    this.setState((st) => ({ data: { ...st.data, deals: st.data.deals.concat([deal]) }, screen: 'deal', dealId: id, tab: 'overview', modal: '', dealForm: {} }));
    this.flash(tr(f.name) + ' created for ' + company);
  }

  convertLead(id) {
    if (!this.canAct(this.state, 'leadConvert')) { this.flash('Your role can\'t convert leads to deals.'); return; }
    const lead = this.state.data.leads.find((l) => l.id === id);
    if (!lead) return;
    const nid = 'D' + Date.now();
    const first = (lead.products || [])[0] || (lead.services || [])[0] || '';
    const raw = {
      id: nid, no: this.nextNo(this.state.data.deals), name: first && first !== 'Not set yet' ? first + ' rollout' : 'New engagement', company: lead.company, contact: lead.contact, owner: lead.owner || this.state.me || 'Dilbag Singh', se: '',
      industry: lead.industry, size: lead.size || 'Not set yet', tier: 'Starter', strategic: false, seRequested: false,
      drd: [
        { req: 'Single pipeline for every lead source', pain: lead.pain || 'Leads scattered across tools', champ: 'High', eb: 'Medium', ok: false },
        { req: 'Automatic handoff from sales to onboarding', pain: 'Manual handoffs lose details', champ: 'High', eb: 'High', ok: false },
        { req: 'Weekly pipeline dashboard for leadership', pain: 'No pipeline visibility', champ: 'Medium', eb: 'High', ok: false }
      ],
      proposal: 0, lines: [{ role: 'Solutions architect', hours: 40 }, { role: 'Consultant', hours: 20 }], seats: 0,
      quoteAccepted: false, paid: false, closed: false, closeReason: '', closeAmount: '', project: null,
      med: this.med({ pain: { s: 0, n: lead.pain || '' } }), nextStep: lead.nextStep || 'Choose an SE and book the scoping call',
      createdAt: new Date().toISOString().slice(0, 10), leadCreatedAt: lead.createdAt || '', leadCode: 'LD-' + this.recNo(lead), leadId: lead.id,
      forecast: Number(lead.value) || this.settingsOf(this.state.data).defaultValue || 0, contacts: [{ name: lead.contact, email: lead.email || '', phone: lead.phone || '' }],
      activities: [].concat(lead.notes ? [{ id: 'a-n' + Date.now(), type: 'Note', date: new Date().toISOString().slice(0, 10), title: 'Notes from the lead', details: lead.notes, by: lead.owner + ' (AE)' }] : [])
        .concat((lead.tasks || []).filter((t) => !t.done).map((t, i) => ({ id: 'a-t' + Date.now() + i, type: 'Next step', date: t.due || new Date().toISOString().slice(0, 10), title: t.title, details: 'Carried over from the lead', by: lead.owner + ' (AE)' }))),
      files: (lead.files || []).slice()
    };
    raw.tasks = this.templateTasks(raw.owner);
    const deal = this.norm(raw);
    this.setState((st) => ({ data: { ...st.data, leads: st.data.leads.map((l) => l.id === id ? { ...l, dealId: nid, stage: 'Opportunity' } : l), deals: st.data.deals.concat([deal]) }, screen: 'deal', dealId: nid, tab: 'overview' }));
    this.flash(lead.company + ' converted to a deal');
  }

  saveLead() {
    const f = this.state.form, tr = (v) => String(v || '').trim();
    if (!tr(f.first) || !tr(f.last) || !tr(f.company) || !tr(f.email) || !tr(f.phone) || !tr(f.needs)) return;
    const id = 'L' + Date.now();
    const co = this.canonCo(f.company);
    const known = this.state.data.deals.find((d) => d.company === co) || this.state.data.leads.find((l) => l.company === co);
    const lead = this.leadDerive({ id, no: this.nextNo(this.state.data.leads), first: tr(f.first), last: tr(f.last), company: co, email: tr(f.email), phone: tr(f.phone),
      source: f.source, needs: tr(f.needs), products: (f.products || []).slice(), services: (f.services || []).slice(),
      owner: '', industry: known && known.industry && known.industry !== 'Not set yet' ? known.industry : '', size: known ? known.size || '' : '', value: 0, nextStep: '', notes: '', tasks: [],
      status: 'New', rep: f.source === 'monday.com rep' ? 'yes' : 'no', checks: {}, createdAt: new Date().toISOString().slice(0, 10) });
    this.setState((st) => ({ data: { ...st.data, leads: [lead].concat(st.data.leads) }, modal: '', form: { first: '', last: '', company: '', email: '', phone: '', source: 'monday.com rep', needs: '', products: [], services: [] }, screen: 'lead', leadId: id }));
    this.flash('Lead added');
  }

  doReset() {
    try { window.localStorage.removeItem(this.KEY); window.localStorage.removeItem(this.KEY + ':ui'); } catch (e) {}
    this._noLog = true;
    this.setState(this.fresh(this.state.role, this.state.me));
    this.flash('Demo data reset. 9 sample records restored.');
  }

  renderVals() {
    const s = this.state;
    const D0 = s.data;
    const LSTAGES = ['New', 'MQL', 'SQL', 'Opportunity', 'Closed Won', 'Closed Lost'];
    const lStage = (l) => { const dd = l.dealId ? D0.deals.find((z) => z.id === l.dealId) : null;
      if (dd) return dd.closed ? 'Closed Won' : dd.lost ? 'Closed Lost' : 'Opportunity';
      return ['New', 'MQL', 'SQL'].indexOf(l.stage) >= 0 ? l.stage : ({ Working: 'MQL', Qualified: 'SQL' })[l.status] || 'New'; };
    // Visibility: admins see everything. AEs, SAs and SEs see only deals (and their projects) where they are on the deal team or the project team. Leads: admins and AEs only.
    const ME0 = s.me || 'Erick Razo', ADM0 = s.role === 'admin';
    const onTeam0 = (d) => d.owner === ME0 || d.se === ME0 || (d.team || []).some((m) => m.name === ME0) || (!!d.project && this.projectFull(d).team.some((m) => m.name === ME0));
    const onDeal0 = (d) => d.owner === ME0 || d.se === ME0 || (d.team || []).some((m) => m.name === ME0), onProj0 = (d) => !!d.project && this.projectFull(d).team.some((m) => m.name === ME0);
    const dVS = this.scopeOf(s, 'deals', 'vs'), pVS = this.scopeOf(s, 'projects', 'vs'), lVS = this.scopeOf(s, 'leads', 'vs'), dOK = ADM0 || this.canDo(s, 'deals', 'v'), pOK = ADM0 || this.canDo(s, 'projects', 'v');
    const dealVis0 = (d) => ADM0 || (dOK && (dVS === 'all' || onDeal0(d) || onProj0(d))) || (pOK && !!d.project && (pVS === 'all' || onDeal0(d) || onProj0(d)));
    const D = { ...D0, leads: this.canMenu(s, 'leads') ? D0.leads.filter((l) => ADM0 || lVS === 'all' || l.owner === ME0).map((l) => ({ ...l, status: lStage(l) })) : [], deals: D0.deals.filter(dealVis0) };
    const SET = this.settingsOf(D);
    const dealCode = (dd) => 'DL-' + this.recNo(dd);
    const leadCode = (l) => 'LD-' + this.recNo(l);
    const hashNo = (str) => { let h = 0; String(str).split('').forEach((ch) => { h = (h * 31 + ch.charCodeAt(0)) % 9000; }); return 1000 + h; };
    const coCode = (name) => 'CO-' + hashNo(name);
    const expRule = (SET.expansion && SET.expansion.rule) || 'auto';
    const msOf = (key, options, selected, toggleFn) => { const open = s.combo === key, sel = selected || [];
      return { open, exp: open ? 'true' : 'false', rot: open ? '180deg' : '0deg', bd: open ? '#6A4FE0' : '#CFCAE3',
        summary: sel.length ? sel.join(', ') : 'Select one or more', sumFg: sel.length ? '#14112E' : '#6F6B89', hasCount: sel.length > 1, count: String(sel.length),
        countText: sel.length + ' of ' + options.length + ' selected',
        toggleOpen: () => this.setState((st) => ({ combo: st.combo === key ? '' : key })), close: () => this.setState({ combo: '' }),
        opts: options.map((o) => { const on = sel.indexOf(o) >= 0; return { label: o, sel: on ? 'true' : 'false', bg: on ? '#F3F0FE' : 'transparent', box: on ? '#6A4FE0' : '#B8B3CE', fill: on ? '#6A4FE0' : '#FFFFFF', tick: on ? '#FFFFFF' : 'transparent', toggle: toggleFn(o) }; }) }; };
    const isExpDeal = (d) => expRule === 'manual' ? !!d.expansion : D.deals.some((o) => o.company === d.company && o.id !== d.id && o.closed && String(o.createdAt || '') <= String(d.createdAt || '9999'));
    const ctCode = (company, name) => 'CT-' + hashNo(company + '|' + name);
    const accent = this.props.accent ?? '#6A4FE0';
    const ground = this.props.ground ?? '#F6F5FB';
    const RATE = 155, COST = 80, SEAT = 600;
    // Quantity and rate are per month; a service line runs for its Months, so totals, hours and cost multiply by them.
    const monthsOf = (l) => (l.pay || 'Upfront') === 'Upfront' ? 1 : l.pay === 'Quarterly' ? 3 * Math.max(1, Math.ceil((parseInt(l.months, 10) || 3) / 3)) : Math.max(1, parseInt(l.months, 10) || 1), qtyOf = (l) => (Number(l.hours) || 0) * monthsOf(l);
    const rateOf = (l) => l.rate === undefined || l.rate === null || l.rate === '' ? RATE : (Number(l.rate) || 0);
    const discOf = (gross, ds) => { if (!ds) return 0; const v = Math.max(0, Number(ds.value) || 0); return Math.round(Math.min(gross, ds.type === 'flat' ? v : gross * Math.min(v, 100) / 100)); };
    const lineGross = (l) => qtyOf(l) * rateOf(l);
    const lineAmt = (l) => lineGross(l) - discOf(lineGross(l), l.disc);
    const termOf = (l) => l.pay ? monthsOf(l) : Math.max(1, Number(l.term) || 12);
    const licGross = (l) => (Number(l.seats) || 0) * (Number(l.ppu) || 0) * termOf(l);
    const licAnnual = (l) => licAmt(l) * 12 / termOf(l);
    const licAmt = (l) => licGross(l) - discOf(licGross(l), l.disc);
    // Cost rates: the admin rate card in Settings, overridable per quote line by an admin.
    const cardRate = (role) => { const r = (SET.costRates || []).find((c) => String(c.role || '').trim().toLowerCase() === String(role || '').trim().toLowerCase()); return r ? Number(r.rate) || 0 : (Number(SET.defaultCost) || 0); };
    const costRateOf = (l) => l.costRate !== undefined && l.costRate !== null && l.costRate !== '' ? Number(l.costRate) || 0 : cardRate(l.role);
    const lineCost = (l) => l.unit === 'each' ? 0 : qtyOf(l) * costRateOf(l);
    const quoteTotals = (q) => {
      if (!q) return { svcGross: 0, arrGross: 0, gross: 0, list: 0, lineDisc: 0, discAmt: 0, totalDisc: 0, svc: 0, arr: 0, arrAnnual: 0, cost: 0, total: 0 };
      const svcList = q.lines.reduce((a, l) => a + lineGross(l), 0), arrList = (q.lic || []).reduce((a, l) => a + licGross(l), 0);
      const svcGross = q.lines.reduce((a, l) => a + lineAmt(l), 0);
      const arrGross = (q.lic || []).reduce((a, l) => a + licAmt(l), 0);
      const lineDisc = (svcList - svcGross) + (arrList - arrGross);
      const ds = q.disc || {}, on = ds.on || 'services', val = Math.max(0, Number(ds.value) || 0);
      const base = on === 'licenses' ? arrGross : on === 'all' ? svcGross + arrGross : svcGross;
      const discAmt = Math.round(Math.min(base, ds.type === 'flat' ? val : base * Math.min(val, 100) / 100));
      let svc = svcGross, arr = arrGross;
      if (discAmt) {
        if (on === 'services') svc -= discAmt;
        else if (on === 'licenses') arr -= discAmt;
        else { const sShare = base ? svcGross / base : 0; svc -= Math.round(discAmt * sShare); arr -= discAmt - Math.round(discAmt * sShare); }
      }
      const annualLines = (q.lic || []).reduce((a, l) => a + licAnnual(l), 0);
      const arrAnnual = Math.round(arrGross ? annualLines * arr / arrGross : 0);
      return { svcGross, arrGross, gross: svcGross + arrGross, list: svcList + arrList, lineDisc, discAmt, totalDisc: lineDisc + discAmt, svc, arr, arrAnnual, cost: q.lines.reduce((a, l) => a + lineCost(l), 0), total: svc + arr };
    };
    const money = (n) => '$' + Math.round(n).toLocaleString('en-US');
    // Customer pays + Months/Quarters: one billing model shared by service and license lines.
    const payInfo = (l, amt, lbl, edit) => {
      const mo = monthsOf(l), pay = l.pay || 'Upfront', per = ({ Monthly: 1, Quarterly: 3 })[pay] || mo, nInv = pay === 'Upfront' ? 1 : Math.max(1, Math.ceil(mo / per)), perMo = amt / mo, last = mo - (nInv - 1) * per, isQ = pay === 'Quarterly';
      return { pay, monthsLabel: (isQ ? 'Quarters, ' : 'Months, ') + lbl, termHead: isQ ? 'Quarters *' : 'Months *', termMax: isQ ? '40' : '120', termPh: isQ ? '1' : 'e.g. 6',
        months: isQ ? String(mo / 3) : l.months ? String(l.months) : '',
        payNote: pay === 'Upfront' ? '1 invoice, paid upfront' : isQ ? nInv + (nInv === 1 ? ' invoice of ' : ' invoices of ') + money(perMo * 3) + ' over ' + nInv + (nInv === 1 ? ' quarter' : ' quarters') + ' (' + mo + ' months)' : !l.months ? 'Add the months to see the invoice plan' : (last === per ? nInv + (nInv === 1 ? ' invoice of ' : ' invoices of ') + money(perMo * per) : (nInv - 1) + ' invoices of ' + money(perMo * per) + ' + 1 of ' + money(perMo * last)) + ' over ' + mo + (mo === 1 ? ' month' : ' months'),
        amtPer: pay === 'Upfront' ? money(amt) : money(perMo * per), amtUnit: ({ Monthly: ' /mo', Quarterly: ' /qtr' })[pay] || '', showTotal: pay !== 'Upfront',
        totalText: !l.months && !isQ ? 'Total: add months' : 'Total = ' + money(amt), totalCol: !l.months && !isQ ? '#8A5A12' : '#4A4766',
        showMonths: pay !== 'Upfront', moBd: pay === 'Monthly' && !l.months ? '#E8A13C' : '#CFCAE3',
        billText: pay === 'Upfront' ? 'Upfront, one payment' : isQ ? 'Quarterly × ' + (mo / 3) + (mo / 3 === 1 ? ' quarter' : ' quarters') : 'Monthly × ' + mo + (mo === 1 ? ' month' : ' months'),
        setMonths: (e) => { const raw = String(e.target.value).trim(); edit((z) => { z.months = isQ ? 3 * Math.max(1, Math.min(40, parseInt(raw, 10) || 1)) : raw === '' ? '' : Math.max(1, Math.min(120, parseInt(raw, 10) || 1)); }); },
        setPay: (e) => { const v = e.target.value; edit((z) => { z.pay = v; if (v === 'Quarterly') z.months = 3 * Math.max(1, Math.ceil((parseInt(z.months, 10) || 3) / 3)); }); } };
    };
    const payMix = (q) => { const ps = []; (q ? q.lines.concat(q.lic || []) : []).forEach((l) => { const v = l.pay || 'Upfront'; if (ps.indexOf(v) < 0) ps.push(v); }); return ps; };
    const P = {
      green: { bg: '#E2F4E6', fg: '#1B6B35' }, amber: { bg: '#FDF0DC', fg: '#8A4B00' },
      violet: { bg: '#EEEAFE', fg: '#4B32B8' }, gray: { bg: '#EEEDF4', fg: '#4A4766' }
    };
    const DONE = '#1B7A3F';
    const B = (k) => k === 'primary' ? { bg: '#14112E', fg: '#FFFFFF', bd: '#14112E', cur: 'pointer' }
      : k === 'off' ? { bg: '#F0EEF6', fg: '#8C88A6', bd: '#E4E1F0', cur: 'not-allowed' }
      : { bg: '#FFFFFF', fg: '#14112E', bd: '#CFCAE3', cur: 'pointer' };
    const isAdmin = s.role === 'admin';
    const ME = s.me || 'Erick Razo', meU = this.userOf(s), meTag = ME + ' (' + meU.short + ')';
    const canLeads = this.canSeeLeads(s);
    const cLeadsMenu = this.canMenu(s, 'leads'), cStage = this.canAct(s, 'dealStage'), cPath = this.canAct(s, 'dealPath'), cDrd = this.canAct(s, 'dealDrd'), cQuote = this.canDo(s, 'quotes', 'v'), cFc = this.canAct(s, 'dealForecast'), cLeadNew = cLeadsMenu && this.canAct(s, 'leadCreate'), cTask = this.canAct(s, 'tasks'), cLog = this.canAct(s, 'logTime');
    const cPDates = this.canAct(s, 'projectDates');
    const CD = (r0, o0) => this.canDo(s, r0, o0), cDealE = CD('deals', 'e'), cDealC = CD('deals', 'c'), cQuoteV = CD('quotes', 'v'), cQuoteC = CD('quotes', 'c'), cQuoteE = CD('quotes', 'e'), cTaskV = CD('tasks', 'v'), cTaskE = CD('tasks', 'e'), cTaskD = CD('tasks', 'd'),
      cActV = CD('activities', 'v'), cActC = CD('activities', 'c'), cActE = CD('activities', 'e'), cActD = CD('activities', 'd'), cProjE = CD('projects', 'e'), cFileV = CD('files', 'v'), cFileC = CD('files', 'c'), cFileD = CD('files', 'd'), cLogD = CD('time', 'd'), cCoC = CD('companies', 'c');
    const noLeads = () => this.flash('Leads are visible to Admins and AEs only.');
    const clOf = (k) => { const shut = !!(s.coll || {})[k]; return { open: !shut, exp: shut ? 'false' : 'true', rot: shut ? '0deg' : '90deg', toggle: () => this.setState((st) => ({ coll: { ...(st.coll || {}), [k]: !shut } })) }; };
    const initialsOf = (n) => String(n).split(' ').map((p) => p[0]).join('').slice(0, 2);
    const noop = () => {};
    // One chatter for every module: posts point at an item { type, id, deal? }
    const tk = (o) => o.type + ':' + (o.deal || o.lead || '') + ':' + o.id;
    const CHAT = (D.chat || []).concat(...D.deals.map((dd) => (dd.chatter || []).map((p) => ({ ...p, on: { type: 'deal', id: dd.id } }))
      .concat((dd.pchatter || []).map((p) => ({ ...p, on: { type: 'project', id: dd.id } })))));
    const coOfOn = (on) => { if (on.type === 'company') return on.id; if (on.type === 'contact') return String(on.id).split('|')[0];
      if (on.type === 'lead' || on.type === 'ltask') return (D.leads.find((l) => l.id === (on.lead || on.id)) || {}).company; return (D.deals.find((z) => z.id === (on.deal || on.id)) || {}).company; };
    const inScope = (t, p) => tk(p.on) === tk(t) || (t.type === 'lead' && p.on.type === 'ltask' && p.on.lead === t.id) || (t.type === 'deal' && (p.on.type === 'drd' || p.on.type === 'dtask' || p.on.type === 'dact') && p.on.deal === t.id) || (t.type === 'project' && (p.on.type === 'task' || p.on.type === 'ms') && p.on.deal === t.id)
      || (t.type === 'company' && p.on.type !== 'company' && coOfOn(p.on) === t.id);
    const chatBtn = (on, nm) => { const n = CHAT.filter((p) => inScope(on, p)).length;
      return { chatN: n ? String(n) : '', chatA: 'Chatter on ' + nm + (n ? ' · ' + n + (n === 1 ? ' post' : ' posts') : ''),
        chatBg: n ? '#EEEAFE' : '#FFFFFF', chatFg: n ? '#4B32B8' : '#4A4766', chatBd: n ? '#D8D0FA' : '#E4E1F0',
        openChat: () => this.setState({ chatOn: on, chatPrev: null, reqPick: null, reqOpen: '' }) }; };
    const STAGES = ['New deal', 'Proposal', 'Negotiating', 'Closed Won', 'Closed Lost'];
    const FCATS = [['Commit', 90], ['Best case', 70], ['Pipeline', 40], ['Long shot', 10]];
    const LOSTP = { bg: '#FBE4E5', fg: '#9E2A30' };
    const initials = (n) => n.split(' ').map((p) => p[0]).join('').slice(0, 2);

    const calc = (d0) => {
      const aq = (d0.quotes || []).find((y) => y.id === d0.activeQ) || null;
      const d = { ...d0, seedLines: d0.lines || [], hasQuote: !!aq, aq, lines: aq ? aq.lines : [], lic: aq ? aq.lic : [], quoteAccepted: !!aq && aq.status === 'Accepted' };
      const hours = d.lines.reduce((a, l) => a + (l.unit === 'each' ? 0 : qtyOf(l)), 0);
      const hq = !!d.hasQuote;
      const qt = quoteTotals(hq ? aq : null);
      const services = qt.svc, arr = qt.arr, arrAnnual = qt.arrAnnual, contract = services + arr, discAmt = qt.totalDisc, quoteDisc = qt.discAmt;
      const total = hq ? contract : (Number(d.forecast) || 0);
      const cost = qt.cost, margin = services - cost;
      const ok = d.drd.filter((x) => x.ok).length, drdDone = ok === d.drd.length;
      const derived = d.quoteAccepted ? 2 : d.se ? 1 : 0;
      const stage = d.closed ? 3 : d.lost ? 4 : typeof d.stage === 'number' ? d.stage : derived;
      let gates = [
        { label: 'SE support', done: !!d.se, todo: 'Choose an SE', tab: 'overview' },
        { label: 'DRD approved', done: drdDone, todo: 'Approve DRD items', tab: 'drd' },
        { label: 'Proposal sent', done: d.proposal >= 1, todo: 'Send the proposal', tab: 'overview' },
        { label: 'Quote accepted', done: d.quoteAccepted, todo: 'Get the quote accepted', tab: 'quote' },
        { label: 'Proposal signed', done: d.proposal === 2, todo: 'Collect the signature', tab: 'overview' },
        { label: 'Payment received', done: d.paid, todo: 'Confirm payment', tab: 'overview' }
      ];
      // Path to close comes from Settings: built-in steps track the deal automatically, custom steps are marked done on the deal.
      const gOf = { se: gates[0], drd: gates[1], sent: gates[2], quote: gates[3], signed: gates[4], paid: gates[5] }, pDone = d.pathDone || {};
      gates = SET.pathSteps.filter((p) => p.on && (p.custom || gOf[p.key])).map((p) => p.custom ? { label: p.label, done: !!pDone[p.key], todo: p.label, tab: 'overview' } : { ...gOf[p.key], label: p.label || gOf[p.key].label });
      const next = gates.find((g) => !g.done);
      const canClose = !next && !d.closed && !d.lost;
      const p0 = d.project ? d.project.checks.filter(Boolean).length : 0;
      const p0Total = d.project ? (d.project.checkLabels || [1, 2, 3, 4, 5]).length : 5;
      return { d, hours, services, arr, arrAnnual, total, contract, discAmt, quoteDisc, cost, margin, ok, drdDone, stage, gates, next, canClose, p0, p0Total, gatesMet: gates.filter((g) => g.done).length };
    };
    const all = D.deals.map(calc);
    const VENDORS = { 'monday.com': { products: ['monday CRM', 'monday Work Management', 'monday Service', 'monday Dev'], plans: ['Standard', 'Pro', 'Enterprise'] },
      'Odoo': { products: ['Odoo CRM', 'Odoo Project', 'Odoo Sales', 'Odoo Helpdesk'], plans: ['Standard', 'Custom'] } };
    const vendorOf = (l) => (l && l.vendor) || 'monday.com';
    // Contract term = the longest recurring line (subscription services and licenses); 0 when everything is one-time.
    const qTermOf = (q) => { const a = q ? q.lines.filter((l) => (l.pay || 'Upfront') !== 'Upfront').map(monthsOf).concat((q.lic || []).filter((l) => (l.pay || 'Upfront') !== 'Upfront').map(termOf)) : []; return a.length ? Math.max.apply(null, a) : 0; };
    const open = all.filter((x) => !x.d.closed && !x.d.lost);
    const withProject = all.filter((x) => x.d.project);

    const queue = [];
    D.leads.filter((l) => cLeadsMenu && l.status === 'SQL').forEach((l) => queue.push({ tag: 'Lead', pill: P.violet, title: 'Convert qualified lead', detail: l.company + ' · ' + l.contact, cta: 'Open lead', go: () => this.openLead(l.id) }));
    open.forEach((x) => {
      if (x.canClose) queue.push({ tag: 'Ready', pill: P.green, title: 'Close the deal', detail: x.d.company + ' · all path-to-close steps done', cta: 'Open deal', go: () => this.openDeal(x.d.id) });
      else queue.push({ tag: STAGES[x.stage], pill: P.gray, title: x.next.todo, detail: x.d.company + ' · ' + x.d.name, cta: 'Open deal', go: () => this.openDeal(x.d.id, x.next.tab) });
    });
    all.filter((x) => x.d.closed && !x.d.project).forEach((x) => queue.push({ tag: 'Won', pill: P.green, title: 'Create the project', detail: x.d.company + ' · ' + x.d.name, cta: 'Open deal', go: () => this.openDeal(x.d.id) }));
    if (isAdmin) withProject.forEach((x) => {
      const pj = this.projectFull(x.d), su0 = pj.setup || {};
      pj.escalations.filter((e) => !e.seen).forEach((e) => queue.push({ tag: 'Over budget', pill: { bg: '#FBE4E5', fg: '#9E2A30' }, title: e.scope + ' is ' + e.over + ' h over (' + e.pct + '%)', detail: x.d.company + ' · ' + pj.id + ' · logged by ' + e.who + ' · for ' + e.to, cta: 'Review',
        go: () => { this.updDeal(x.d.id, (z) => { const p = this.projectFull(z); p.escalations = p.escalations.map((u) => u.id === e.id ? { ...u, seen: true } : u); z.project = p; return z; }); this.openProject(x.d.id); this.setState({ ptab: 'time' }); } }));
      const t0 = new Date(); t0.setHours(0, 0, 0, 0); const ex = pj.dates.expires ? Math.round((new Date(pj.dates.expires + 'T00:00:00') - t0) / 86400000) : null;
      if (ex !== null && ex <= (Number(su0.alertDays) || 30)) queue.push({ tag: 'Contract', pill: P.amber, title: ex < 0 ? 'Contract expired ' + (-ex) + ' days ago' : 'Contract expires in ' + ex + ' days', detail: x.d.company + ' · ' + pj.id + ' · renew or close the project', cta: 'Open project', go: () => this.openProject(x.d.id) });
    });
    withProject.filter((x) => x.p0 < x.p0Total).forEach((x) => queue.push({ tag: 'Project', pill: P.amber, title: 'Finish onboarding (' + x.p0 + ' of ' + x.p0Total + ')', detail: x.d.company + ' · ' + x.d.name, cta: 'Open project', go: () => this.openProject(x.d.id) }));

    const kpis = [
      { label: 'Pipeline', value: money(open.reduce((a, x) => a + x.total, 0)), note: open.length + ' open deals' },
      { label: 'Ready to close', value: String(open.filter((x) => x.canClose).length), note: 'all path-to-close steps done' },
      { label: 'Leads to work', value: String(D.leads.length), note: 'not yet converted' },
      { label: 'Projects in setup', value: String(withProject.filter((x) => x.p0 < x.p0Total).length), note: 'onboarding not finished' }
    ];

    const byId = (id) => all.find((x) => x.d.id === id);
    const kestrelLead = D.leads.some((l) => l.id === 'L1');
    const kestrelDeal = all.find((x) => x.d.company === 'Kestrel Foods');
    const d2 = byId('D2'), d4 = byId('D4');
    const scen = [
      { title: 'Take Kestrel Foods from lead to Closed Won', detail: 'Switch on the SMP toggle, convert the lead, then clear every gate.', done: !!(kestrelDeal && kestrelDeal.d.closed),
        go: () => kestrelLead ? this.openLead('L1') : kestrelDeal ? this.openDeal(kestrelDeal.d.id) : this.setState({ screen: 'deals' }) },
      { title: 'Approve the open DRD items for Harborline', detail: 'Two of four are approved. Watch the gate count move.', done: !!(d2 && d2.drdDone), go: () => this.openDeal('D2', 'drd') },
      { title: 'Close Copperleaf Dental and start its project', detail: 'Only payment is missing. Confirm it and close. The project is created for you.', done: !!(d4 && d4.d.project), go: () => this.openDeal('D4') },
      { title: 'See what an AE sees', detail: 'Sign in as Dilbag and look at the active quote. Cost and profit disappear.', done: s.role === 'ae', go: () => this.setState({ me: 'Dilbag Singh', role: 'ae', screen: 'deal', dealId: 'D3', tab: 'overview' }) },
      { title: 'Choose an SE for Lumen Freight', detail: 'Pick an SE, give them the scope and watch them join the deal team.', done: !!(byId('D1') && byId('D1').d.se), go: () => { this.openDeal('D1'); this.openSe('D1'); } },
      { title: 'Add a lead of your own', detail: 'Create a lead, convert it and take it through the path to close.', done: D.leads.some((l) => l.id.length > 3) || D.deals.some((d) => d.id.length > 3 && d.company !== 'Kestrel Foods'), go: () => cLeadsMenu ? this.setState({ modal: 'lead' }) : noLeads() }
    ];
    const scenarios = scen.map((t, i) => ({ ...t, mark: t.done ? '✓' : String(i + 1), dotBg: t.done ? DONE : '#FFFFFF', dotBd: t.done ? DONE : '#B9AAF7', dotFg: t.done ? '#FFFFFF' : '#4B32B8', cta: t.done ? 'Open again' : 'Try it' }));

    const section = { contact: 'contacts', settings: 'settings', home: 'home', leads: 'leads', lead: 'leads', deals: 'deals', deal: 'deals', projects: 'projects', project: 'projects', companies: 'companies', company: 'companies', contacts: 'contacts' }[s.screen];
    const navCompanies = D.deals.map((dd) => dd.company).concat(D.leads.map((l) => l.company)).filter((v, i, a) => a.indexOf(v) === i).length;
    const navContacts = D.deals.reduce((acc, dd) => acc.concat((dd.contacts || []).map((c) => dd.company + '|' + c.name)), []).concat(D.leads.map((l) => l.company + '|' + l.contact)).filter((v, i, a) => a.indexOf(v) === i).length;
    const nav = [['home', 'My work', queue.length], ['companies', 'Companies', navCompanies], ['contacts', 'Contacts', navContacts], ['leads', 'Leads', D.leads.length], ['deals', 'Deals', D.deals.length], ['projects', 'Projects', withProject.length]].filter((n0) => isAdmin || this.menuOn(SET, meU.short, n0[0])).concat(isAdmin || this.menuOn(SET, meU.short, 'settings') || s.screen === 'settings' ? [['settings', 'Settings', '']] : []).map(([k, label, count]) => ({
      label, count: String(count), go: () => this.setState({ screen: k }), current: section === k ? 'page' : 'false',
      bg: section === k ? '#ECE8FD' : 'transparent', fg: '#14112E', fw: section === k ? '650' : '500'
    }));

    const statusPill = { New: P.gray, MQL: P.amber, SQL: P.violet, Opportunity: { bg: '#E3EEFB', fg: '#1F4E8C' }, 'Closed Won': P.green, 'Closed Lost': LOSTP };
    const leads = D.leads.map((l) => ({ ...l, code: leadCode(l), valueText: Number(l.value) ? money(Number(l.value)) : '—', ownerText: l.owner || 'Unassigned', pill: statusPill[l.status] || P.gray, open: () => this.openLead(l.id) }));
    const lead = D.leads.find((l) => l.id === s.leadId);
    const sel = (on) => on ? { bg: '#14112E', fg: '#FFFFFF', bd: '#14112E' } : { bg: '#FFFFFF', fg: '#14112E', bd: '#CFCAE3' };
    const leadRule = SET.lead[lead && lead.rep === 'yes' ? 'rep' : 'direct'] || { items: [], minYes: 0 };
    const REP_ITEMS = lead ? leadRule.items.map((it) => [it.key, it.label]) : [];
    const ck = (lead && lead.checks) || {};
    const repFields = lead ? REP_ITEMS.map(([key, label]) => {
      const on = !!ck[key];
      return {
        label, on: on ? 'true' : 'false', state: on ? 'Yes' : 'No', stateFg: on ? '#1B6B35' : '#5E5A78',
        trackBg: on ? accent : '#E4E1F0', trackBd: on ? accent : '#CFCAE3', knobBg: '#FFFFFF', knobX: on ? '20px' : '2px',
        toggle: () => this.updLead(lead.id, (l) => { l.checks = { ...(l.checks || {}), [key]: !on }; return l; })
      };
    }) : [];
    const repDone = repFields.filter((r) => r.on === 'true').length;
    const repNeed = Math.min(Number(leadRule.minYes) || 0, repFields.length);
    const checksOk = repDone >= repNeed;
    const LREQ = lead ? [['owner', 'AE owner', !!lead.owner], ['industry', 'Industry', !!String(lead.industry || '').trim() && lead.industry !== 'Not set yet'], ['value', 'Estimated value', Number(lead.value) > 0],
      ['offer', 'A product or service', (lead.products || []).length + (lead.services || []).length > 0], ['next', 'Next step', !!String(lead.nextStep || '').trim()]] : [];
    const lMissing = LREQ.filter((r) => !r[2]).map((r) => r[1]);
    const repReady = checksOk && lMissing.length === 0;
    const chipSel = (on) => on ? { bg: '#14112E', fg: '#FFFFFF', bd: '#14112E' } : { bg: '#FFFFFF', fg: '#14112E', bd: '#CFCAE3' };
    const LF = (k) => (e) => { const v = e.target.value; this.updLead(lead.id, (l) => { l[k] = v; return l; }); };
    const lEdit = !!lead && s.leadEdit === lead.id, lf = s.leadForm || {};
    const LE = (k) => (e) => { const v = e.target.value; this.setState((st) => ({ leadForm: { ...(st.leadForm || {}), [k]: v } })); };
    const lfT = (k) => String(lf[k] || '').trim();
    const lMissE = lEdit ? [['first', 'first name'], ['last', 'last name'], ['email', 'email'], ['phone', 'phone'], ['source', 'lead source']].filter(([k]) => !lfT(k)).map((r) => r[1]) : [];
    const lEmailBad = lEdit && !!lfT('email') && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(lfT('email'));
    const lSaveOk = lEdit && !lMissE.length && !lEmailBad;
    const NTC = '#B4530B';
    const lff0 = s.fileForm || {}, lffKind = lff0.kind === 'file' ? 'file' : 'link';
    const lffOk = lffKind === 'link' ? /^https?:\/\/\S+\.\S+/.test(String(lff0.url || '').trim()) : !!lff0.fileName;
    const lff = {
      isLink: lffKind === 'link', isFile: lffKind === 'file', linkOn: lffKind === 'link' ? 'true' : 'false', fileOn: lffKind === 'file' ? 'true' : 'false',
      linkBg: lffKind === 'link' ? '#FFFFFF' : 'transparent', fileBg: lffKind === 'file' ? '#FFFFFF' : 'transparent',
      pickLink: () => this.setState((st) => ({ fileForm: { ...(st.fileForm || {}), kind: 'link' } })), pickFile: () => this.setState((st) => ({ fileForm: { ...(st.fileForm || {}), kind: 'file' } })),
      url: lff0.url || '', name: lff0.name || '', category: lff0.category || 'Proposal',
      fileNote: lff0.fileName ? 'Selected: ' + lff0.fileName + '. In this demo only the name is kept, not the file itself.' : 'In this demo only the file name is kept, not the file itself.',
      off: !lffOk, b: B(lffOk ? 'primary' : 'off'), cta: lffKind === 'link' ? 'Add link' : 'Add file',
      save: lffOk && lead ? () => { const f = this.state.fileForm || {}, kind = f.kind === 'file' ? 'file' : 'link', url = String(f.url || '').trim();
        const nm = kind === 'link' ? (String(f.name || '').trim() || url.replace(/^https?:\/\//, '').slice(0, 60)) : f.fileName;
        this.updLead(lead.id, (l) => { l.files = (l.files || []).concat([{ id: 'f' + Date.now(), kind, name: nm, url: kind === 'link' ? url : '', size: kind === 'file' ? f.fileSize || 0 : 0, category: f.category || 'Proposal', date: new Date().toISOString().slice(0, 10), by: meTag }]); return l; });
        this.flash(nm + ' added'); this.setState({ fileForm: { kind, url: '', name: '', category: f.category || 'Proposal', fileName: '', fileSize: 0 } }); } : noop };
    const lv = lead ? {
      ...chatBtn({ type: 'lead', id: lead.id }, lead.company),
      contact: lead.contact, company: lead.company, owner: lead.owner, status: lead.status, pill: statusPill[lead.status] || P.gray, pain: lead.pain, code: leadCode(lead),
      ruleText: (!repFields.length ? 'No questions on this path' : repNeed === 0 ? 'No Yes answers needed' : repNeed === repFields.length ? 'All ' + repFields.length + ' need a Yes' : repNeed + ' of ' + repFields.length + ' need a Yes') + ' · set by an admin',
      fields: [
        { k: 'Company', v: lead.company }, { k: 'Owner (AE)', v: lead.owner }, { k: 'Lead source', v: lead.source },
        { k: 'Products and services', v: lead.interest }, { k: 'Industry', v: lead.industry }, { k: 'Company size', v: lead.size || 'Not set yet' }
      ],
      repYes: () => this.updLead(lead.id, (l) => { l.rep = 'yes'; return l; }),
      repNo: () => this.updLead(lead.id, (l) => { l.rep = 'no'; return l; }),
      yesPressed: lead.rep === 'yes' ? 'true' : 'false', noPressed: lead.rep === 'no' ? 'true' : 'false',
      yB: sel(lead.rep === 'yes'), nB: sel(lead.rep === 'no'), yBg: lead.rep === 'yes' ? '#FFFFFF' : 'transparent', nBg: lead.rep === 'no' ? '#FFFFFF' : 'transparent',
      openCompany: () => this.openCompany(lead.company), subLine: lead.contact + (lead.email ? ' · ' + lead.email : '') + ' · ' + (lead.owner ? 'owner ' + lead.owner : 'no owner yet'),
      repFields: repFields,
      repCount: repDone + ' of ' + repFields.length + ' Yes', repCountFg: repReady ? '#1B6B35' : '#8A4B00',
      convertOff: !repReady, convB: B(repReady ? 'primary' : 'off'),
      convNote: lead.dealId ? 'Converted to a deal' : repReady ? 'Ready to become a deal' : !checksOk ? (repNeed - repDone) + ' more Yes needed to create a deal' : 'Add ' + lMissing.join(', ').toLowerCase() + ' to convert',
      name: lead.name || (lead.company + ' – ' + lead.contact), first: lead.first || '', last: lead.last || '', email: lead.email || '', phone: lead.phone || '', source: lead.source, needs: lead.needs || '',
      ownerSel: lead.owner || '', industry: lead.industry === 'Not set yet' ? '' : lead.industry || '', value: Number(lead.value) ? Number(lead.value).toLocaleString('en-US') : '', nextStep: lead.nextStep || '', notes: lead.notes || '',
      setFirst: LF('first'), setLast: LF('last'), setEmail: LF('email'), setPhone: LF('phone'), setSource: LF('source'), setNeeds: LF('needs'), setOwner: LF('owner'), setIndustry: LF('industry'), setNext: LF('nextStep'), setNotes: LF('notes'),
      setValue: (e) => { const v = parseInt(String(e.target.value).replace(/[^0-9]/g, ''), 10) || 0; this.updLead(lead.id, (l) => { l.value = v; return l; }); },
      sourceOpts: this.SOURCES.map((v) => ({ v, label: v })),
      ownerOpts: [{ v: '', label: 'Not assigned yet' }].concat(this.PEOPLE.filter((pp) => pp.role === 'Account executive').map((pp) => ({ v: pp.name, label: pp.name }))),
      hint: { fg: '#B4530B', owner: lead.owner ? '' : '· needed to convert', industry: LREQ[1][2] ? '' : '· needed to convert', value: LREQ[2][2] ? '' : '· needed to convert', next: LREQ[4][2] ? '' : '· needed to convert' },
      needs2: LREQ.map((r) => ({ label: r[1], mark: r[2] ? '✓' : '○', bg: r[2] ? '#E2F4E6' : '#FDF0DC', fg: r[2] ? '#1B6B35' : '#8A4B00' })),
      prodMs: msOf('lv-prod', this.PRODUCTS, lead.products, (pn) => () => this.updLead(lead.id, (l) => { l.products = l.products.indexOf(pn) >= 0 ? l.products.filter((u) => u !== pn) : l.products.concat([pn]); return l; })),
      svcMs: msOf('lv-svc', this.SERVICES, lead.services, (pn) => () => this.updLead(lead.id, (l) => { l.services = l.services.indexOf(pn) >= 0 ? l.services.filter((u) => u !== pn) : l.services.concat([pn]); return l; })),
      prodChips: this.PRODUCTS.map((pn) => { const on = (lead.products || []).indexOf(pn) >= 0; return { label: pn, on: on ? 'true' : 'false', ...chipSel(on), toggle: () => this.updLead(lead.id, (l) => { l.products = on ? l.products.filter((u) => u !== pn) : l.products.concat([pn]); return l; }) }; }),
      svcChips: this.SERVICES.map((pn) => { const on = (lead.services || []).indexOf(pn) >= 0; return { label: pn, on: on ? 'true' : 'false', ...chipSel(on), toggle: () => this.updLead(lead.id, (l) => { l.services = on ? l.services.filter((u) => u !== pn) : l.services.concat([pn]); return l; }) }; }),
      ...(() => {
        const LST = SET.taskStatuses, lDone = (v) => !!(LST.find((u) => u.label === v) || {}).done;
        const lSt = (t) => (LST.some((u) => u.label === t.status) ? t.status : (t.done ? (LST.find((u) => u.done) || {}).label || 'Done' : LST[0].label));
        const lSty = (v) => lDone(v) ? { bg: '#E2F4E6', fg: '#1B6B35' } : /block/i.test(v) ? { bg: '#FBE4E5', fg: '#9E2A30' } : /progress/i.test(v) ? { bg: '#EEEAFE', fg: '#4B32B8' } : { bg: '#FFFFFF', fg: '#14112E' };
        const LT = (tid, fn, msg) => { if (!cTaskE) { this.flash('Your role can\'t edit tasks.'); return; } this.updLead(lead.id, (l) => { l.tasks = l.tasks.map((u) => u.id === tid ? fn({ ...u }) : u); return l; }, false); if (msg) this.flash(msg); };
        const rows = (lead.tasks || []).slice().sort((t1, t2) => (!!t1.done === !!t2.done ? String(t1.due || '9').localeCompare(String(t2.due || '9')) : t1.done ? 1 : -1)).map((t) => {
          const late = !t.done && t.due && t.due < new Date().toISOString().slice(0, 10), st = lSt(t), sty = lSty(st), nCh = CHAT.filter((p) => p.on.type === 'ltask' && p.on.id === t.id).length;
          return { id: t.id, title: t.title, name: t.title, done: !!t.done, fg: t.done ? '#6F6B89' : '#14112E', deco: t.done ? 'line-through' : 'none',
            dueText: t.due ? (late ? 'Overdue · ' : 'Due ') + t.due : 'No date', dueFg: late ? '#9E2A30' : '#5E5A78',
            doneLabel: 'Done: ' + t.title, removeLabel: 'Delete task ' + t.title, statusLabel: 'Status of ' + t.title, ownerLabel: 'Assignee of ' + t.title, dueLabel: 'Due date for ' + t.title,
            status: st, statusBg: sty.bg, statusFg: sty.fg, owner: t.owner || '', due: t.due || '', desc: t.desc || '',
            rowBg: s.taskOpen === t.id ? '#F8F6FF' : 'transparent', hasChat: nCh > 0, chatN: String(nCh), chatA: nCh + (nCh === 1 ? ' post' : ' posts') + ' on ' + t.title,
            open: () => this.setState({ taskOpen: t.id }), openA: 'Open task details: ' + t.title,
            toggle: () => LT(t.id, (u) => { u.done = !u.done; u.status = u.done ? ((LST.find((z) => z.done) || {}).label || 'Done') : LST[0].label; return u; }),
            setStatus: (e) => { const v = e.target.value; LT(t.id, (u) => { u.status = v; u.done = lDone(v); return u; }); },
            setOwner: (e) => { const v = e.target.value; LT(t.id, (u) => { u.owner = v; return u; }); },
            setDue: (e) => { const v = e.target.value; LT(t.id, (u) => { u.due = v; return u; }); },
            setDesc: (e) => { const v = e.target.value; LT(t.id, (u) => { u.desc = v; return u; }); },
            setName: (e) => { const v = e.target.value; LT(t.id, (u) => { u.title = v; return u; }); },
            remove: () => { if (!cTaskD) { this.flash('Your role can\'t delete tasks.'); return; } this.updLead(lead.id, (l) => { l.tasks = l.tasks.filter((u) => u.id !== t.id); return l; }, false); this.flash('Task deleted'); } };
        });
        return { tasks: rows, taskRows: rows, taskStatusOpts: LST.map((u) => ({ v: u.label, label: u.label })),
          taskOwnerOpts: [{ v: '', label: 'Unassigned' }].concat(this.PEOPLE.map((pp) => ({ v: pp.name, label: pp.name }))) };
      })(),
      ...(() => { const lt = ['overview', 'tasks', 'files', 'log'].indexOf(s.ltab) >= 0 ? s.ltab : 'overview';
        return { tabs: [['overview', 'Overview'], ['tasks', 'Tasks ' + (lead.tasks || []).length], ['files', 'Files ' + (lead.files || []).length], ['log', 'Change log']].filter(([k]) => cTaskV || k !== 'tasks').map(([k, label]) => ({
            label, go: () => this.setState({ ltab: k, taskOpen: '' }), selected: lt === k ? 'true' : 'false', bd: lt === k ? accent : 'transparent', fg: lt === k ? '#14112E' : '#5E5A78', fw: lt === k ? '650' : '500' })),
          tabOverview: lt === 'overview', tabTasks: lt === 'tasks', tabFiles: lt === 'files', tabLog: lt === 'log', goTasks: () => this.setState({ ltab: 'tasks' }) }; })(),
      ...(() => { const fd = (v) => { if (!v) return ''; const dt = new Date(v + 'T00:00:00'); return isNaN(dt) ? v : dt.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }); };
        const fl = (lead.files || []).map((f) => ({ canRemove: true, name: f.name, url: f.url || '', isLink: f.kind === 'link', isFile: f.kind !== 'link', category: f.category,
          meta: (f.kind === 'link' ? f.url : (f.size ? Math.max(1, Math.round(f.size / 1024)) + ' KB · ' : '') + 'file') + ' · added ' + fd(f.date) + ' by ' + f.by, removeLabel: 'Remove ' + f.name,
          remove: () => { this.updLead(lead.id, (l) => { l.files = (l.files || []).filter((y) => y.id !== f.id); return l; }); this.flash(f.name + ' removed'); } }));
        return { files: fl, fileCount: fl.length + (fl.length === 1 ? ' item' : ' items'), filesEmpty: !fl.length }; })(),
      noTasks: !(lead.tasks || []).length, taskCount: (lead.tasks || []).filter((t) => !t.done).length + ' open',
      taskTitle: (s.leadTask || {}).title || '', taskDue: (s.leadTask || {}).due || '',
      setTaskTitle: (e) => { const v = e.target.value; this.setState((st) => ({ leadTask: { ...(st.leadTask || {}), title: v } })); },
      setTaskDue: (e) => { const v = e.target.value; this.setState((st) => ({ leadTask: { ...(st.leadTask || {}), due: v } })); },
      taskOff: !String((s.leadTask || {}).title || '').trim(), taskB: B(String((s.leadTask || {}).title || '').trim() ? 'secondary' : 'off'),
      addTask: cTask && String((s.leadTask || {}).title || '').trim() ? () => { const tt = this.state.leadTask || {}; this.updLead(lead.id, (l) => { l.tasks = l.tasks.concat([{ id: 'lt' + Date.now(), title: String(tt.title).trim(), due: tt.due || '', done: false }]); return l; }, false); this.setState({ leadTask: {} }); } : noop,
      convNoteFg: repReady ? '#1B6B35' : '#5E5A78',
      convert: repReady ? () => this.convertLead(lead.id) : noop,
      ...(() => { const lDeal = lead.dealId ? D.deals.find((z) => z.id === lead.dealId) : null, curI = LSTAGES.indexOf(lead.status);
        return { hasDeal: !!lDeal, notConverted: !lDeal, dealLabel: lDeal ? 'Open deal ' + dealCode(lDeal) : '', openDeal: lDeal ? () => this.openDeal(lDeal.id) : noop,
          stageNote: lDeal ? 'Opportunity, Closed Won and Closed Lost follow deal ' + dealCode(lDeal) + '. Click one to open it.' : 'Click a stage to move the lead.',
          stages: LSTAGES.map((n, i) => {
            const cur = i === curI, done = !cur && (curI >= 4 ? i <= 3 : i < curI), won = n === 'Closed Won', lost = n === 'Closed Lost';
            const live = i < 3 ? !lDeal : !!lDeal || (i === 3 && repReady);
            return { label: (done ? '✓ ' : '') + n, current: cur ? 'step' : 'false', cur: live ? 'pointer' : 'default',
              title: i < 3 ? (lDeal ? 'This lead is now a deal' : 'Move the lead to ' + n) : lDeal ? 'Open deal ' + dealCode(lDeal) : i === 3 ? (repReady ? 'Convert this lead to a deal' : 'Finish the lead checklist to convert') : 'Comes from the linked deal',
              go: i < 3 ? (lDeal ? noop : () => this.updLead(lead.id, (l) => { l.stage = n; return l; })) : lDeal ? () => this.openDeal(lDeal.id) : (i === 3 && repReady ? () => this.convertLead(lead.id) : noop),
              bg: cur ? (won ? '#1B6B35' : lost ? '#9E2A30' : accent) : done ? '#EEEAFE' : '#FFFFFF',
              fg: cur ? '#FFFFFF' : done ? '#14112E' : live ? '#5E5A78' : '#A7A3BD',
              bd: cur ? (won ? '#1B6B35' : lost ? '#9E2A30' : accent) : done ? '#D8D0FA' : '#E4E1F0' };
          }) }; })(),
      editing: lEdit, viewing: !lEdit,
      ...(() => { const can = isAdmin || this.canAct(s, 'leadReassign') || ME === lead.owner;
        return { canAssign: can, cannotAssign: !can, ownerText: lead.owner || 'Unassigned',
          assignOpts: [{ v: '', label: 'Unassigned' }].concat(this.PEOPLE.map((pp) => ({ v: pp.name, label: pp.name + ' · ' + pp.role }))),
          assign: can ? (e) => { const v = e.target.value; this.updLead(lead.id, (l) => { l.owner = v; return l; }); this.flash(v ? 'Lead assigned to ' + v : 'Lead unassigned'); } : noop }; })(),
      dfields: [].concat([
        { k: 'Lead name', v: lead.name || (lead.company + ' – ' + lead.contact), fg: '#14112E' },
        { k: 'Company', v: lead.company, fg: '#5B3FD6', isLink: true, go: () => this.openCompany(lead.company) },
        { k: 'First name', v: lead.first || '—', fg: '#14112E' }, { k: 'Last name', v: lead.last || '—', fg: '#14112E' },
        { k: 'Email', v: lead.email || '—', fg: '#14112E' }, { k: 'Phone', v: lead.phone || '—', fg: '#14112E' },
        { k: 'Lead source', v: lead.source || '—', fg: '#14112E' },
        { k: 'Owner (AE)', v: lead.owner || 'Not set · needed to convert', fg: lead.owner ? '#14112E' : NTC },
        { k: 'Industry', v: LREQ[1][2] ? lead.industry : 'Not set · needed to convert', fg: LREQ[1][2] ? '#14112E' : NTC },
        { k: 'Estimated value', v: LREQ[2][2] ? money(Number(lead.value)) : 'Not set · needed to convert', fg: LREQ[2][2] ? '#14112E' : NTC }
      ]).map((f) => ({ ...f, isLink: !!f.isLink, noLink: !f.isLink, go: f.go || noop })),
      edit: () => this.setState({ leadEdit: lead.id, leadForm: { first: lead.first || '', last: lead.last || '', email: lead.email || '', phone: lead.phone || '', source: lead.source || '', owner: lead.owner || '', industry: lead.industry === 'Not set yet' ? '' : lead.industry || '', value: Number(lead.value) ? Number(lead.value).toLocaleString('en-US') : '' } }),
      cancelEdit: () => this.setState({ leadEdit: '', leadForm: null }),
      saveOff: !lSaveOk, saveB: B(lSaveOk ? 'primary' : 'off'),
      editHint: lMissE.length ? 'Required: ' + lMissE.join(', ') : lEmailBad ? 'Check the email address' : 'Owner, industry and estimated value are needed to convert.', editHintFg: lMissE.length || lEmailBad ? NTC : '#5E5A78',
      save: lSaveOk ? () => { const f = this.state.leadForm || {}, T = (k) => String(f[k] || '').trim();
        this.updLead(lead.id, (l) => { l.first = T('first'); l.last = T('last'); l.email = T('email'); l.phone = T('phone'); l.source = f.source; l.owner = f.owner || ''; l.industry = T('industry'); l.value = parseInt(String(f.value || '').replace(/[^0-9]/g, ''), 10) || 0; return l; });
        this.setState({ leadEdit: '', leadForm: null }); this.flash('Lead details saved'); } : noop,
      ...(lEdit ? { first: lf.first || '', last: lf.last || '', email: lf.email || '', phone: lf.phone || '', source: lf.source || '', ownerSel: lf.owner || '', industry: lf.industry || '', value: lf.value || '',
        setFirst: LE('first'), setLast: LE('last'), setEmail: LE('email'), setPhone: LE('phone'), setSource: LE('source'), setOwner: LE('owner'), setIndustry: LE('industry'),
        setValue: (e) => { const n = parseInt(String(e.target.value).replace(/[^0-9]/g, ''), 10); this.setState((st) => ({ leadForm: { ...(st.leadForm || {}), value: n ? n.toLocaleString('en-US') : '' } })); } } : {})
    } : { fields: [], repFields: [], needs2: [], prodMs: { opts: [] }, svcMs: { opts: [] }, prodChips: [], svcChips: [], tasks: [], sourceOpts: [], ownerOpts: [], hint: {}, taskB: B('off'), openCompany: noop, convert: noop, repYes: noop, repNo: noop, yB: sel(false), nB: sel(false), convB: B('off'), convertOff: true };

    const chipFor = (x) => {
      if (x.d.lost) return { chip: 'Lost · ' + x.d.lost.reason.toLowerCase(), pill: LOSTP };
      if (x.d.closed && !x.d.project) return { chip: 'Create project', pill: P.amber };
      if (x.d.closed) return { chip: 'Project live', pill: P.green };
      if (x.canClose) return { chip: 'Ready to close', pill: P.green };
      return { chip: 'Needs: ' + x.next.label.toLowerCase(), pill: P.gray };
    };
    const columns = STAGES.map((name, i) => {
      const cards = all.filter((x) => x.stage === i).map((x) => ({ code: dealCode(x.d), company: x.d.company, name: x.d.name, strategic: x.d.strategic, totalText: money(x.total), ...chipFor(x),
        hasFcat: !!x.d.fcat && x.stage >= 1 && x.stage <= 2, fcat: x.d.fcat ? 'Forecast: ' + x.d.fcat + (x.d.prob !== undefined && x.d.prob !== '' ? ' · ' + x.d.prob + '%' : '') : '', open: () => this.openDeal(x.d.id) }));
      const sum = all.filter((x) => x.stage === i).reduce((a, x) => a + x.total, 0);
      return { name, count: String(cards.length), total: money(sum), cards };
    });

    const x = all.find((y) => y.d.id === s.dealId);
    const soon = (what) => () => this.flash(what + ' opens in the full app. Not part of this demo.');
    let dealNames = [];
    let af = { off: true, b: B('off'), save: noop }, ff = { off: true, b: B('off'), save: noop, isLink: true, isFile: false };
    let qv = { nq: { on: false, opts: [], b: {} }, breakdown: [], termOpts: [], billOpts: [], vendorOpts: [], list: [], lines: [], lic: [], summary: [], none: true, hasSel: false, create: noop, createOff: true, createB: B('off'), send: noop, accept: noop, revise: noop, addLine: noop, addLic: noop, acceptB: B('off'), pill: P.gray };
    let dv = { dt: { taskRows: [], taskStatusOpts: [], taskOwnerOpts: [], taskB: B('off'), addTask: noop }, dtm: { b: B('off'), save: noop }, chat: { posts: [], b: B('off') }, pc: { chips: [], opts: [] }, fcatOpts: [], contractRows: [], mix: { lines: [], tiles: [], foot: [] }, kpisA: [], kpisB: [], stages: [], tabs: [], steps: [], drd: [], lines: [], summary: [], team: [], contacts: [], companyFields: [], svcLines: [], licLines: [], champPick: [], med: [], qSections: [], stakeholders: [],
      accept: noop, approveAll: noop, openClose: noop, confirmClose: noop, create: noop, openProject: noop, createQuote: noop, goQuote: noop, addMember: noop, addStake: noop, addContact: noop, openCompany: noop,
      setClose: noop, setNext: noop, setForecast: noop, setBudget: noop, setCritDate: noop, setCritLabel: noop, setChampNote: noop,
      acceptB: B('off'), approveB: B('off'), closeB: B('off'), createQB: B('off'), addMemberB: B('off'), qPill: P.gray, stagePill: P.gray, critPill: P.gray };
    if (x) {
      const d = x.d, id = d.id, locked = d.closed || !!d.lost;
      const updRaw = (fn, msg) => this.updDeal(id, fn, msg), G = (ok, what) => ok ? updRaw : () => this.flash('Your role can\'t ' + what + '.');
      const upd = G(cDealE && (this.scopeOf(s, 'deals', 'es') === 'all' || onDeal0(d) || onProj0(d)), 'edit deals');
      const setField = (k) => (e) => { const v = e.target.value; upd((z) => { z[k] = v; return z; }); };
      const T = (v) => d.hasQuote ? v : 'TBD';
      const hrs = (l) => qtyOf(l);
      let stepDefs = [
        { title: 'SE support', detail: d.se ? d.se + ' · ' + (d.seScope || 'Solutions engineer on this deal') : 'Choose an SE to scope the work and draft the proposal', done: !!d.se, cta: 'Choose SE', can: true, edit: true,
          act: () => this.openSe(id) },
        { title: 'DRD approved', detail: x.ok + ' of ' + d.drd.length + ' items approved by the AE', done: x.drdDone, cta: 'Review DRD', can: true, act: () => this.setState({ tab: 'drd' }) },
        { title: 'Proposal sent', detail: d.proposal >= 1 ? 'Sent to ' + d.contact + ' from Prospero' : 'The SE drafts it in Prospero', done: d.proposal >= 1, cta: 'Mark sent', can: !!d.se, edit: true, why: 'Needs an SE first',
          act: () => updRaw((z) => { z.proposal = 1; return z; }, 'Proposal marked as sent') },
        { title: 'Quote accepted', detail: d.quoteAccepted ? 'Scenario A accepted · ' + money(x.contract) : d.hasQuote ? 'The SE set the hours. Accept it once the customer agrees.' : 'No quote yet. The SE sets the hours after the proposal.', done: d.quoteAccepted, cta: 'Open quote', can: true, edit: true, act: () => this.setState({ tab: 'quote' }) },
        { title: 'Proposal signed', detail: d.proposal === 2 ? 'Signed in Prospero' : 'Customer signs in Prospero', done: d.proposal === 2, cta: 'Mark signed', can: d.quoteAccepted, edit: true, why: 'Accept the quote first',
          act: () => updRaw((z) => { z.proposal = 2; z.signedAt = z.signedAt || new Date().toISOString().slice(0, 10); return z; }, 'Signature recorded') },
        { title: 'Payment received', detail: d.paid ? 'Payment confirmed' : 'Services deals close only once payment lands', done: d.paid, cta: 'Mark paid', can: d.proposal === 2, edit: true, why: 'Waiting on signature',
          act: () => updRaw((z) => { z.paid = true; z.paidAt = z.paidAt || new Date().toISOString().slice(0, 10); return z; }, 'Payment confirmed. The deal can close.') }
      ];
      const sOf = { se: stepDefs[0], drd: stepDefs[1], sent: stepDefs[2], quote: stepDefs[3], signed: stepDefs[4], paid: stepDefs[5] }, pDn = d.pathDone || {};
      stepDefs = SET.pathSteps.filter((p) => p.on && (p.custom || sOf[p.key])).map((p) => p.custom
        ? { title: p.label, detail: pDn[p.key] ? 'Done' : '', done: !!pDn[p.key], cta: 'Mark done', can: true, edit: true, act: () => updRaw((z) => { z.pathDone = { ...(z.pathDone || {}), [p.key]: true }; return z; }, p.label + ' marked done') }
        : { ...sOf[p.key], title: p.label || sOf[p.key].title });
      const stageGo = (i) => () => {
        if (!cStage) { this.flash('Only an AE or an admin can change the deal stage.'); return; }
        if (d.closed) { this.flash('Closed Won deals are locked'); return; }
        if (d.lost) { this.flash('This deal is Closed Lost. Reopen it to change the stage.'); return; }
        if (i === 4) { this.setState({ modal: 'lost', lostForm: { reason: '', competitor: '', note: '' } }); return; }
        if (i === 3) {
          if (x.canClose) this.setState({ modal: 'close', close: { reason: 'Strong product fit', amount: money(x.total) } });
          else this.flash('Finish the checklist first. Next: ' + x.next.label);
          return;
        }
        if (i === x.stage) return;
        updRaw((z) => { z.stage = i; return z; }, 'Moved to ' + STAGES[i]);
      };
      const pick = (on, tone) => on ? (tone === 'violet' ? { bg: '#EEEAFE', fg: '#4B32B8', bd: '#B9AAF7' } : { bg: '#E2F4E6', fg: '#1B6B35', bd: '#9FD3AE' }) : { bg: '#FFFFFF', fg: '#4A4766', bd: '#CFCAE3' };
      const champs = d.champions || [];
      const contacts = d.contacts.map((c) => {
        const chips = [];
        if (champs.indexOf(c.name) >= 0) chips.push({ label: 'Champion', bg: '#E2F4E6', fg: '#1B6B35' });
        if (d.eb === c.name) chips.push({ label: 'Economic buyer', bg: '#EEEAFE', fg: '#4B32B8' });
        return { name: c.name, email: c.email || 'No email yet', phone: c.phone || 'No phone yet', chips, hasChips: chips.length > 0, noChips: chips.length === 0, open: soon('The contact record') };
      });
      const MED = [['metrics', 'M', 'Metrics'], ['eb', 'E', 'Economic buyer'], ['dc', 'D', 'Decision criteria'], ['dp', 'D', 'Decision process'], ['pp', 'P', 'Paper process'], ['pain', 'I', 'Identified pain'], ['comp', 'C', 'Competition']];
      const LISTS = {
        pain: { prefix: 'P', one: 'Pain point', add: '+ Add pain point', ph: 'Describe one pain point', empty: 'No pain points yet.', hint: 'Each gets an ID to link to DRD items and the project plan' },
        comp: { prefix: 'C', one: 'Competitor', add: '+ Add competitor', ph: 'Competitor name', empty: 'No competitors logged yet.', hint: 'One name per row so deals can be filtered by competitor later' }
      };
      const listItems = (m) => Array.isArray(m.items) ? m.items : (m.n ? String(m.n).split(/\.\s+/).map((t) => t.replace(/\.$/, '').trim()).filter(Boolean).map((t, j) => ({ id: 'seed-' + j, no: j + 1, text: t })) : []);
      const knownComps = [];
      D.deals.forEach((dd) => { const cm = dd.med && dd.med.comp; listItems(cm || {}).forEach((it) => { const t = String(it.text || '').trim(); if (t && knownComps.indexOf(t) < 0) knownComps.push(t); }); if (dd.lost && dd.lost.competitor && knownComps.indexOf(dd.lost.competitor) < 0) knownComps.push(dd.lost.competitor); });
      const med = MED.map(([k, letter, title]) => {
        const m = d.med[k] || { s: 0, n: '' };
        return {
          key: k, anchor: 'med-' + k, letter, title, noteId: id + '-med-' + k, note: m.n, scoreText: ['Not set', 'Assumed', 'Heard', 'Partial', 'Mostly', 'Confirmed'][m.s] || 'Not set',
          ph: k === 'eb' ? 'Context about this economic buyer' : 'Click to add notes for ' + title.toLowerCase(),
          dots: [1, 2, 3, 4, 5].map((n) => ({
            label: title + ': ' + ['', 'assumed', 'heard from the customer', 'partly confirmed', 'mostly confirmed', 'confirmed by the customer'][n] + ' (' + n + ' of 5)', on: n <= m.s ? 'true' : 'false', bg: n <= m.s ? '#2E2468' : '#DEDAEC',
            pick: () => upd((z) => { const cur = z.med[k] || { s: 0, n: '' }; z.med[k] = { ...cur, s: cur.s === n ? n - 1 : n }; return z; })
          })),
          setNote: (e) => { const v = e.target.value; upd((z) => { const cur = z.med[k] || { s: 0, n: '' }; z.med[k] = { ...cur, n: v }; return z; }); },
          isList: !!LISTS[k], isNote: !LISTS[k],
          addLabel: LISTS[k] ? LISTS[k].add : '', itemPh: LISTS[k] ? LISTS[k].ph : '', listHint: LISTS[k] ? LISTS[k].hint : '', emptyText: LISTS[k] ? LISTS[k].empty : '',
          hasDl: k === 'comp', dlId: k === 'comp' ? id + '-comp-list' : '', dlOptions: k === 'comp' ? knownComps.map((v) => ({ v })) : [],
          items: LISTS[k] ? listItems(m).map((it, j) => ({
            text: it.text, tag: LISTS[k].prefix + (it.no || j + 1), label: LISTS[k].one + ' ' + (j + 1), removeLabel: 'Remove ' + LISTS[k].one.toLowerCase() + ' ' + (j + 1),
            set: (e) => { const v = e.target.value; upd((z) => { const cur = z.med[k] || { s: 0, n: '' }; const list = listItems(cur).map((y) => ({ ...y })); if (list[j]) list[j].text = v; z.med[k] = { ...cur, items: list }; return z; }); },
            remove: () => upd((z) => { const cur = z.med[k] || { s: 0, n: '' }; const list = listItems(cur).filter((y, q) => q !== j); z.med[k] = { ...cur, items: list }; return z; })
          })) : [],
          noItems: !!LISTS[k] && !listItems(m).length,
          addItem: () => upd((z) => { const cur = z.med[k] || { s: 0, n: '' }; const list = listItems(cur); z.med[k] = { ...cur, items: list.concat([{ id: k + Date.now(), no: list.reduce((a, y, q) => Math.max(a, y.no || q + 1), 0) + 1, text: '' }]) }; return z; }),
          isEb: k === 'eb',
          ebPick: k === 'eb' ? d.contacts.map((c) => {
            const on = d.eb === c.name, st = pick(on, 'violet');
            return { label: (on ? '✓ ' : '') + c.name, on: on ? 'true' : 'false', bg: st.bg, fg: st.fg, bd: st.bd, toggle: () => upd((z) => { z.eb = z.eb === c.name ? '' : c.name; return z; }) };
          }) : [],
          ebNew: () => this.openContact(true)
        };
      });
      const crit = d.critical || { date: '', label: 'Go-live' };
      let critText = 'No date set', critPill = P.gray;
      if (crit.date) {
        const t0 = new Date(); t0.setHours(0, 0, 0, 0);
        const diff = Math.round((new Date(crit.date + 'T00:00:00') - t0) / 86400000);
        if (!isNaN(diff)) {
          critText = diff < 0 ? (-diff) + (diff === -1 ? ' day past' : ' days past') : diff === 0 ? 'Today' : 'In ' + diff + (diff === 1 ? ' day' : ' days');
          critPill = diff < 0 ? P.amber : P.violet;
        }
      }
      const fmtDate = (v) => { if (!v) return ''; const dt = new Date(v + 'T00:00:00'); return isNaN(dt) ? v : dt.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }); };
      const daysTo = (v) => { if (!v) return null; const t0 = new Date(); t0.setHours(0, 0, 0, 0); const n = Math.round((new Date(v + 'T00:00:00') - t0) / 86400000); return isNaN(n) ? null : n; };
      const rel = (n) => n === null ? '' : n < 0 ? (-n) + (n === -1 ? ' day ago' : ' days ago') : n === 0 ? 'today' : 'in ' + n + (n === 1 ? ' day' : ' days');
      const closeIn = daysTo(d.expectedClose), critIn = daysTo(crit.date);
      const scores = MED.map(([k]) => (d.med[k] || {}).s || 0);
      const medTotal = scores.reduce((a, b) => a + b, 0), unscored = scores.filter((v) => !v).length;
      let weakest = '', minS = 6;
      MED.forEach(([, , t], i) => { if (scores[i] < minS) { minS = scores[i]; weakest = t.toLowerCase(); } });
      const SEV = { Blocker: { bg: '#FBE4E5', fg: '#9E2A30' }, Risk: { bg: '#FDF0DC', fg: '#8A4B00' }, 'To do': { bg: '#EEEAFE', fg: '#4B32B8' } };
      const RANK = { Blocker: 0, Risk: 1, 'To do': 2 };
      const attn = [];
      const MEDK = { '#med-eb': 'eb', '#med-champions': 'champ', '#med-critical': 'crit' };
      const flag = (sev, title, detail, cta, act, href) => attn.push({ go: MEDK[href] ? () => this.setState((st) => ({ medOpen: MEDK[href], secs: { ...(st.secs || {}), med: true } })) : noop, sev, rank: RANK[sev], pill: SEV[sev], title, detail, cta, isBtn: !!act, act: act || noop, isLink: !act && !!href, href: href || '' });
      if (!locked) {
        if (!d.se) flag('Blocker', 'No SE on this deal', 'The proposal and quote wait on an SE to scope the work.', 'Choose SE', () => this.openSe(id));
        if (critIn !== null && critIn < 0) flag('Risk', (crit.label || 'Critical date') + ' passed ' + rel(critIn), 'It was ' + fmtDate(crit.date) + '. Confirm the new date with the customer.', 'Edit date', null, '#med-critical');
        if (closeIn === null) flag('Risk', 'No expected close date', 'The forecast and pipeline need one.', 'Set date', null, '#deal-basics');
        else if (closeIn < 0) flag('Risk', 'Expected close was ' + rel(closeIn), 'It was ' + fmtDate(d.expectedClose) + '. Move the date or close the deal.', 'Update', null, '#deal-basics');
        if (closeIn !== null && critIn !== null && critIn >= 0 && closeIn > critIn) flag('Risk', 'Close lands after the ' + (crit.label || 'critical date').toLowerCase(), 'Expected close ' + fmtDate(d.expectedClose) + ' is after ' + fmtDate(crit.date) + '.', 'Review', null, '#deal-basics');
        if (!x.drdDone) { const left = d.drd.length - x.ok; flag('To do', left + ' DRD ' + (left === 1 ? 'item needs' : 'items need') + ' approval', 'Required before Closed Won. Only approved items move to the project.', 'Review DRD', () => this.setState({ tab: 'drd' })); }
        if (cQuote && d.aq && d.aq.status === 'Draft') flag('To do', d.aq.name + ' is still a draft', 'Mark it sent once it goes to the customer with the proposal.', 'Open quote', () => this.setState({ tab: 'quote' }));
        if (!d.eb) flag('To do', 'No economic buyer identified', 'Pick one from the customer team.', 'Set in MEDDPICC', null, '#med-eb');
        if (!champs.length) flag('To do', 'No champion identified', 'Who is selling this internally for us?', 'Set in MEDDPICC', null, '#med-champions');
        if (!String(d.nextStep || '').trim()) flag('To do', 'No next step recorded', 'Write down what happens next and when.', 'Add', null, '#deal-basics');
      }
      attn.sort((a, b) => a.rank - b.rank);
      const AMBER = '#8A4B00', MUTED = '#5E5A78';
      const kpisA = [
        { label: 'Contract value', value: d.hasQuote ? money(x.contract) : d.forecast ? money(d.forecast) : 'TBD', note: d.hasQuote ? 'from the active quote' : d.forecast ? 'estimated value · no quote yet' : 'no quote or forecast yet', noteFg: MUTED },
        { label: 'Expected close', value: fmtDate(d.expectedClose) || 'Not set', note: closeIn === null ? 'add a date' : rel(closeIn), noteFg: !locked && (closeIn === null || closeIn < 0) ? AMBER : MUTED },
      ];
      const kpisB = [
        { label: 'Path to close', value: x.gatesMet + ' of ' + x.gates.length, note: d.closed ? 'Closed Won' : d.lost ? 'Closed Lost' : x.next ? 'Next: ' + x.next.label : 'Ready to mark Closed Won', noteFg: MUTED },
        { label: 'MEDDPICC', value: medTotal + ' / 35', note: unscored ? unscored + ' of 7 not scored' : 'weakest: ' + weakest, noteFg: unscored > 3 ? AMBER : MUTED }
      ];
      const companyLine = [d.industry, 'size ' + d.size, d.tier + ' tier', d.strategic ? 'Strategic' : 'Not strategic'].join(' · ');
      const buyingNote = d.contacts.length + (d.contacts.length === 1 ? ' contact' : ' contacts') + ' · champion: ' + (champs.length ? champs.join(', ') : 'not set') + ' · economic buyer: ' + (d.eb || 'not set');
      const scope = !d.hasQuote ? [{ kind: 'Quote', k: 'No quote yet. Scope appears once the SE creates one.', v: '' }]
        : d.lines.map((l) => ({ kind: 'Services', k: l.role + ' · ' + qtyOf(l) + (l.unit === 'each' ? ' × ' : ' h × ') + money(rateOf(l)), v: money(lineAmt(l)) }))
          .concat(d.lic.map((l) => ({ kind: 'License', k: l.product + ' ' + l.plan + ' · ' + (Number(l.seats) || 0) + ' seats · ' + termOf(l) + ' mo', v: money(licAmt(l)) })));
      const openKey = s.medOpen || '';
      const SUM_ON = '#4A4766', SUM_OFF = '#6F6B89';
      const rowBase = (key, letter, title, anchor) => {
        const on = openKey === key;
        return { key, letter, title, anchor, open: on, exp: on ? 'true' : 'false', rot: on ? '90deg' : '0deg', rowBg: on ? '#FBFAFE' : '#FFFFFF',
          toggle: () => this.setState({ medOpen: on ? '' : key }),
          scored: false, scoreText: '', dots: [], hasPick: false, pick: [], newContact: noop, isList: false, items: [], isNote: false, isBudget: false, isCrit: false, hasHint: false, hint: '',
          noItems: false, emptyText: '', addItem: noop, addLabel: '', itemPh: '', hasDl: false, dlId: '', dlOptions: [] };
      };
      const sumOf = (text, empty) => text ? { summary: text, sumFg: SUM_ON } : { summary: empty, sumFg: SUM_OFF };
      const medBy = {};
      med.forEach((m) => { medBy[m.key] = m; });
      const fromMed = (k, empty, summaryText) => ({ ...rowBase(k, medBy[k].letter, medBy[k].title, medBy[k].anchor), ...medBy[k], open: openKey === k, scored: true, ...sumOf(summaryText, empty) });
      const firstLine = (k) => String(((d.med[k] || {}).n) || '').split('\n')[0].trim();
      const itemText = (k, sep) => listItems(d.med[k] || {}).map((it) => String(it.text || '').trim()).filter(Boolean).join(sep);
      const champRow = { ...rowBase('champ', 'C', 'Champion', 'med-champions'), ...sumOf(champs.join(', '), 'Not identified'),
        hasPick: true, newContact: () => this.openContact(false), isNote: true, noteId: id + '-champ', note: d.med.champ ? d.med.champ.n : '', ph: 'Who they are, where they came from, what they care about',
        setNote: (e) => { const v = e.target.value; upd((z) => { z.med.champ = { ...(z.med.champ || {}), s: 0, n: v }; return z; }); },
        pick: d.contacts.map((c) => {
          const on = champs.indexOf(c.name) >= 0, st = pick(on, 'green');
          return { label: (on ? '✓ ' : '+ ') + c.name, on: on ? 'true' : 'false', bg: st.bg, fg: st.fg, bd: st.bd,
            toggle: () => upd((z) => { const j = z.champions.indexOf(c.name); if (j >= 0) z.champions.splice(j, 1); else z.champions.push(c.name); return z; }) };
        }) };
      const medRows = [
        fromMed('metrics', 'Not captured yet', firstLine('metrics')),
        { ...fromMed('eb', 'Not identified', d.eb + (firstLine('eb') ? ' · ' + firstLine('eb') : '')), hasPick: true, pick: medBy.eb.ebPick, newContact: medBy.eb.ebNew },
        fromMed('dc', 'Not captured yet', firstLine('dc')),
        fromMed('dp', 'Not captured yet', firstLine('dp')),
        fromMed('pp', 'Not captured yet', firstLine('pp')),
        { ...fromMed('pain', 'None logged yet', itemText('pain', ' · ')), hasHint: true, hint: 'Each pain point keeps its ID so it can be linked to DRD items and the project plan.' },
        champRow,
        { ...fromMed('comp', 'None logged yet', itemText('comp', ', ')), hasHint: true, hint: 'One name per row so deals can be filtered by competitor later.' },
        { ...rowBase('budget', '$', 'Budget', 'med-budget'), ...sumOf(String(d.budget || '').trim(), 'Not recorded'), isBudget: true, inputId: id + '-budget', budget: d.budget, setBudget: setField('budget') },
        { ...rowBase('crit', '!', 'Critical date', 'med-critical'), ...sumOf(crit.date ? (crit.label || 'Critical date') + ' · ' + fmtDate(crit.date) + ' · ' + rel(critIn) : '', 'No date set'), isCrit: true,
          dateId: id + '-crit', labelId: id + '-critl', critDate: crit.date, critLabel: crit.label,
          setCritDate: (e) => { const v = e.target.value; upd((z) => { z.critical = { ...(z.critical || {}), date: v }; return z; }); },
          setCritLabel: (e) => { const v = e.target.value; upd((z) => { z.critical = { ...(z.critical || {}), label: v }; return z; }); } }
      ];
      const medPctN = Math.round(medTotal / 35 * 100);
      const ATYPE = { Meeting: P.violet, Call: { bg: '#E3EEFB', fg: '#1F4E8C' }, Email: P.gray, Note: P.gray, 'Next step': P.amber };
      const me = meTag;
      const acts = (d.activities || []).slice().sort((p1, p2) => String(p2.date).localeCompare(String(p1.date)));
      const TLa = d.timelog || [], hA = (aid) => TLa.filter((e) => e.task === aid).reduce((q, e) => q + (Number(e.hours) || 0), 0), fmtA = (h) => h ? (Math.round(h * 100) / 100) + ' h' : '—', tdyA = new Date().toISOString().slice(0, 10);
      const dtfA = s.dtFilter || '', whoOfA = (a) => { const mm = /^(.*?)\s*\(([^)]+)\)\s*$/.exec(String(a.by || '')); return mm ? mm[1] : String(a.by || ''); };
      const actMatch = (a) => !dtfA ? true : dtfA === '__me' ? whoOfA(a) === ME : dtfA === '__none' ? false : whoOfA(a) === dtfA;
      const AU = (aid, fn) => G(cActE, 'edit activities')((z) => { z.activities = (z.activities || []).map((u) => u.id === aid ? fn({ ...u }) : u); return z; });
      const activities = acts.filter(actMatch).map((a) => ({
        id: a.id, date: a.date || '', dateLabel: a.type === 'Next step' ? 'Due date' : 'Date', rowBg: s.taskOpen === a.id ? '#F8F6FF' : 'transparent',
        logged: fmtA(hA(a.id)), loggedFg: hA(a.id) ? '#14112E' : '#8C88A6', logOff: !cLog, logLabel: 'Log time on ' + a.title,
        logBd: cLog ? '#D8D0FA' : '#E4E1F0', logBg: cLog ? '#F3F0FE' : '#F6F5FB', logFg: cLog ? '#4B32B8' : '#A7A3BD', logCur: cLog ? 'pointer' : 'not-allowed',
        logTime: cLog ? () => this.setState({ modal: 'dtime', dtimeForm: { task: a.id, date: tdyA, hours: '', note: '' } }) : noop,
        open: () => this.setState({ taskOpen: a.id, drdOpen: '' }), openA: 'Open activity: ' + a.title,
        ...(() => { const n0 = CHAT.filter((p) => p.on.type === 'dact' && p.on.deal === id && p.on.id === a.id).length; return { hasChat: n0 > 0, chatN: String(n0), chatA: n0 + (n0 === 1 ? ' post' : ' posts') + ' on ' + a.title }; })(),
        setType: (e) => { const v = e.target.value; AU(a.id, (u) => { u.type = v; return u; }); },
        setTitle: (e) => { const v = e.target.value; AU(a.id, (u) => { u.title = v; return u; }); },
        setDate: (e) => { const v = e.target.value; AU(a.id, (u) => { u.date = v; return u; }); },
        setDetails: (e) => { const v = e.target.value; AU(a.id, (u) => { u.details = v; return u; }); },
        type: a.type, pill: ATYPE[a.type] || P.gray, title: a.title, details: a.details || '', hasDetails: !!a.details,
        ...(() => { const mm = /^(.*?)\s*\(([^)]+)\)\s*$/.exec(String(a.by || '')); const who = mm ? mm[1] : String(a.by || ''); return { who, role: mm ? mm[2] : '', hasRole: !!mm, ini: initialsOf(who) }; })(),
        when: (a.type === 'Next step' ? 'Due ' : '') + fmtDate(a.date), removeLabel: 'Delete activity: ' + a.title,
        remove: () => G(cActD, 'delete activities')((z) => { z.activities = (z.activities || []).filter((y) => y.id !== a.id); return z; }, 'Activity deleted')
      }));
      const dtTasks = (() => {
        const LST = SET.taskStatuses, lDone = (v) => !!(LST.find((u) => u.label === v) || {}).done, tdy = new Date().toISOString().slice(0, 10);
        const lSt = (t) => (LST.some((u) => u.label === t.status) ? t.status : (t.done ? (LST.find((u) => u.done) || {}).label || 'Done' : LST[0].label));
        const lSty = (v) => lDone(v) ? { bg: '#E2F4E6', fg: '#1B6B35' } : /block/i.test(v) ? { bg: '#FBE4E5', fg: '#9E2A30' } : /progress/i.test(v) ? { bg: '#EEEAFE', fg: '#4B32B8' } : { bg: '#FFFFFF', fg: '#14112E' };
        const DTU = (tid, fn, msg) => G(cTaskE, 'edit tasks')((z) => { z.tasks = (z.tasks || []).map((u) => u.id === tid ? fn({ ...u }) : u); return z; }, msg);
        const TL = d.timelog || [];
        const hrsOf = (tid) => TL.filter((e) => e.task === tid).reduce((a, e) => a + (Number(e.hours) || 0), 0);
        const fmtH = (h) => h ? (Math.round(h * 100) / 100) + ' h' : '—';
        const openLog = (tid) => this.setState({ modal: 'dtime', dtimeForm: { task: tid, date: tdy, hours: '', note: '' } });
        const dtf = s.dtFilter || '', dtMatch = (t) => !dtf ? true : dtf === '__me' ? t.owner === ME : dtf === '__none' ? !t.owner : t.owner === dtf;
        const allTasks = d.tasks || [];
        const rows = allTasks.filter(dtMatch).slice().sort((t1, t2) => (!!t1.done === !!t2.done ? String(t1.due || '9').localeCompare(String(t2.due || '9')) : t1.done ? 1 : -1)).map((t) => {
          const st = lSt(t), sty = lSty(st), h = hrsOf(t.id), mine = cLog && !!t.owner && t.owner === ME;
          const nCh = CHAT.filter((p) => p.on.type === 'dtask' && p.on.deal === id && p.on.id === t.id).length;
          return { id: t.id, title: t.title, name: t.title, done: !!t.done, fg: t.done ? '#6F6B89' : '#14112E', deco: t.done ? 'line-through' : 'none',
            statusLabel: 'Status of ' + t.title, ownerLabel: 'Assignee of ' + t.title, dueLabel: 'Due date for ' + t.title,
            status: st, statusBg: sty.bg, statusFg: sty.fg, owner: t.owner || '', due: t.due || '', desc: t.desc || '',
            rowBg: s.taskOpen === t.id ? '#F8F6FF' : 'transparent', hasChat: nCh > 0, chatN: String(nCh), chatA: nCh + (nCh === 1 ? ' post' : ' posts') + ' on ' + t.title,
            tmpl: !!t.fromTemplate, logged: fmtH(h), loggedFg: h ? '#14112E' : '#8C88A6',
            logOff: !mine, logLabel: mine ? 'Log time on ' + t.title : (t.owner ? 'Only ' + t.owner + ' can log time on ' + t.title : 'Assign ' + t.title + ' to log time'),
            logTip: mine ? 'Log time on this task' : (t.owner ? 'Only the assignee, ' + t.owner + ', can log time' : 'Assign the task first'),
            logBd: mine ? '#D8D0FA' : '#E4E1F0', logBg: mine ? '#F3F0FE' : '#F6F5FB', logFg: mine ? '#4B32B8' : '#A7A3BD', logCur: mine ? 'pointer' : 'not-allowed',
            logTime: mine ? () => openLog(t.id) : noop,
            open: () => this.setState({ taskOpen: t.id, drdOpen: '' }), openA: 'Open task details: ' + t.title,
            setStatus: (e) => { const v = e.target.value; DTU(t.id, (u) => { u.status = v; u.done = lDone(v); return u; }); },
            setOwner: (e) => { const v = e.target.value; DTU(t.id, (u) => { u.owner = v; return u; }); },
            setDue: (e) => { const v = e.target.value; DTU(t.id, (u) => { u.due = v; return u; }); },
            setDesc: (e) => { const v = e.target.value; DTU(t.id, (u) => { u.desc = v; return u; }); },
            setName: (e) => { const v = e.target.value; DTU(t.id, (u) => { u.title = v; return u; }); },
            remove: () => G(cTaskD, 'delete tasks')((z) => { z.tasks = (z.tasks || []).filter((u) => u.id !== t.id); return z; }, 'Task deleted') };
        });
        const tot = TL.reduce((a, e) => a + (Number(e.hours) || 0), 0), nOpen = (d.tasks || []).filter((t) => !t.done).length;
        const wShow = s.workShow || 'all', aKind = s.addKind || 'task', SEG = (cur, k) => ({ sel: cur === k ? 'true' : 'false', bg: cur === k ? '#14112E' : 'transparent', fg: cur === k ? '#FFFFFF' : '#14112E' });
        const nt = s.dealTask || {}, ntOk = cTask && !!String(nt.title || '').trim();
        const f0 = s.dtimeForm || {}, tskT = (d.tasks || []).find((u) => u.id === f0.task), tskA = tskT ? null : (d.activities || []).find((u) => u.id === f0.task), tsk = tskT || tskA, hv = Number(f0.hours) || 0;
        const fOk = cLog && !!tsk && (!!tskA || tsk.owner === ME) && hv > 0 && !!f0.date;
        const setF = (k) => (e) => { const v = e.target.value; this.setState((st) => ({ dtimeForm: { ...(st.dtimeForm || {}), [k]: v } })); };
        return {
          dt: { showTasks: wShow !== 'acts' && cTaskV, showActs: wShow !== 'tasks' && cActV, addIsTask: aKind === 'task', addIsAct: aKind === 'act',
            showSeg: [['all', 'All'], ['tasks', 'Tasks'], ['acts', 'Activities']].map(([k, l]) => ({ label: l, ...SEG(wShow, k), go: () => this.setState({ workShow: k }) })),
            kindSeg: [['task', 'Task'], ['act', 'Activity']].map(([k, l]) => ({ label: l, ...SEG(aKind, k), go: () => this.setState({ addKind: k }) })),
            items: (() => { const tk = wShow !== 'acts' && cTaskV ? rows.map((r) => ({ ...r, isTask: true, isAct: false, kindLabel: 'Task', kindBg: '#EEEAFE', kindFg: '#4B32B8', sk: r.done ? 2 : 0, dk: r.due || '' })) : [];
              const ac = wShow !== 'tasks' && cActV ? activities.map((y) => ({ ...y, isTask: false, isAct: true, kindLabel: y.type, kindBg: y.pill.bg, kindFg: y.pill.fg, name: y.title, fg: '#14112E', deco: 'none', tmpl: false,
                logTip: 'Log time on this activity', sk: 1, dk: y.date || '' })) : [];
              const dir = s.itemSort === 'asc' ? 1 : -1; return tk.concat(ac).sort((p1, p2) => { if (!p1.dk !== !p2.dk) return p1.dk ? -1 : 1; return dir * String(p1.dk).localeCompare(String(p2.dk)); }); })(),
            sortDir: s.itemSort === 'asc' ? 'ascending' : 'descending', sortArrow: s.itemSort === 'asc' ? '↑' : '↓', sortA: 'Sort by date, ' + (s.itemSort === 'asc' ? 'oldest first. Click for newest first.' : 'newest first. Click for oldest first.'),
            toggleSort: () => this.setState((st) => ({ itemSort: st.itemSort === 'asc' ? 'desc' : 'asc' })),
            itemsShown: (() => { const nT = wShow !== 'acts' && cTaskV ? rows.length : 0, nA = wShow !== 'tasks' && cActV ? activities.length : 0; return nT + (nT === 1 ? ' task' : ' tasks') + ' · ' + nA + (nA === 1 ? ' activity' : ' activities'); })(),
            itemsEmpty: !((wShow !== 'acts' && cTaskV ? rows.length : 0) + (wShow !== 'tasks' && cActV ? activities.length : 0)),
            emptyText: (allTasks.length || (d.activities || []).length) ? 'Nothing matches these filters.' : 'No tasks or activities yet.',
            taskRows: rows, noTasks: !allTasks.length, noMatch: !!allTasks.length && !rows.length,
            filter: dtf, setFilter: (e) => { const v = e.target.value; this.setState({ dtFilter: v }); },
            filterOpts: [{ v: '', label: 'Everyone' }, { v: '__me', label: 'Mine (' + ME + ')' }, { v: '__none', label: 'Unassigned' }].concat(this.PEOPLE.filter((pp) => pp.name !== ME).map((pp) => ({ v: pp.name, label: pp.name }))),
            shown: dtf ? rows.length + ' of ' + allTasks.length + ' shown' : '', taskCount: nOpen + ' open' + (tot ? ' · ' + fmtH(tot) + ' logged' : ''),
            taskStatusOpts: LST.map((u) => ({ v: u.label, label: u.label })),
            taskOwnerOpts: [{ v: '', label: 'Unassigned' }].concat(this.PEOPLE.map((pp) => ({ v: pp.name, label: pp.name }))),
            taskTitle: nt.title || '', taskDue: nt.due || '',
            setTaskTitle: (e) => { const v = e.target.value; this.setState((st) => ({ dealTask: { ...(st.dealTask || {}), title: v } })); },
            setTaskDue: (e) => { const v = e.target.value; this.setState((st) => ({ dealTask: { ...(st.dealTask || {}), due: v } })); },
            taskOff: !ntOk, taskB: B(ntOk ? 'secondary' : 'off'),
            addTask: ntOk ? () => { const tt = this.state.dealTask || {}; G(cTask, 'create tasks')((z) => { z.tasks = (z.tasks || []).concat([{ id: 'dt' + Date.now(), title: String(tt.title).trim(), due: tt.due || '', status: LST[0].label, done: false }]); return z; }, 'Task added'); this.setState({ dealTask: {} }); } : noop },
          dtm: { sub: tsk ? tsk.title + ' · ' + d.company : '', who: ME, date: f0.date || '', hours: f0.hours || '', note: f0.note || '',
            already: tsk ? 'Logged on this ' + (tskA ? 'activity' : 'task') + ' so far: ' + fmtH(hrsOf(tsk.id)) : '',
            setDate: setF('date'), setHours: setF('hours'), setNote: setF('note'), off: !fOk, b: B(fOk ? 'primary' : 'off'),
            save: fOk ? () => { const f = this.state.dtimeForm || {}, hh = Number(f.hours) || 0;
              G(cLog, 'log time')((z) => { z.timelog = (z.timelog || []).concat([{ id: 'te' + Date.now(), task: tsk.id, date: f.date, hours: hh, note: String(f.note || '').trim(), by: ME }]); return z; }, hh + ' h logged on ' + tsk.title);
              this.setState({ modal: '', dtimeForm: null }); } : noop }
        };
      })();
      const fAcc = (f) => f.access || (/Invoice|Bill/.test(f.category || '') ? 'none' : /NDA|Contract/.test(f.category || '') ? 'view' : 'edit');
      const files = (d.files || []).filter((f) => isAdmin || fAcc(f) !== 'none').map((f) => ({
        canRemove: isAdmin || fAcc(f) === 'edit',
        name: f.name, url: f.url || '', isLink: f.kind === 'link', isFile: f.kind !== 'link', category: f.category,
        meta: (f.kind === 'link' ? f.url : (f.size ? Math.max(1, Math.round(f.size / 1024)) + ' KB · ' : '') + 'file') + ' · added ' + fmtDate(f.date) + ' by ' + f.by,
        removeLabel: 'Remove ' + f.name,
        remove: () => G(cFileD, 'delete files')((z) => { z.files = (z.files || []).filter((y) => y.id !== f.id); return z; }, f.name + ' removed')
      }));
      const af0 = s.actForm || {};
      const todayIso = new Date().toISOString().slice(0, 10);
      const afType = af0.type || 'Meeting', afOk = !!String(af0.title || '').trim() && !locked;
      af = {
        type: afType, date: af0.date || todayIso, title: af0.title || '', details: af0.details || '',
        dateLabel: afType === 'Next step' ? 'Due date' : 'Date',
        titlePh: afType === 'Next step' ? 'e.g. Send revised quote to Nadia' : afType === 'Meeting' ? 'e.g. Scoping call with the ops team' : 'Short summary',
        off: !afOk, b: B(afOk ? 'primary' : 'off'),
        save: afOk ? () => {
          const f = this.state.actForm || {}, ttl = String(f.title || '').trim(), ty = f.type || 'Meeting', dt = f.date || todayIso;
          G(cActC, 'log activities')((z) => {
            z.activities = (z.activities || []).concat([{ id: 'a' + Date.now(), type: ty, date: dt, title: ttl, details: String(f.details || '').trim(), by: me }]);
            if (ty === 'Next step') z.nextStep = ttl + ' (due ' + fmtDate(dt) + ')';
            return z;
          }, ty === 'Next step' ? 'Next step logged and set on the deal' : ty + ' logged');
          this.setState({ actForm: { type: ty, date: todayIso, title: '', details: '' } });
        } : noop
      };
      const ff0 = s.fileForm || {};
      const ffKind = ff0.kind === 'file' ? 'file' : 'link';
      const urlOk = /^https?:\/\/\S+\.\S+/.test(String(ff0.url || '').trim());
      const ffOk = (!locked || s.screen === 'project') && (ffKind === 'link' ? urlOk : !!ff0.fileName);
      ff = {
        isLink: ffKind === 'link', isFile: ffKind === 'file', linkOn: ffKind === 'link' ? 'true' : 'false', fileOn: ffKind === 'file' ? 'true' : 'false',
        linkBg: ffKind === 'link' ? '#FFFFFF' : 'transparent', fileBg: ffKind === 'file' ? '#FFFFFF' : 'transparent',
        pickLink: () => this.setState((st) => ({ fileForm: { ...(st.fileForm || {}), kind: 'link' } })),
        pickFile: () => this.setState((st) => ({ fileForm: { ...(st.fileForm || {}), kind: 'file' } })),
        url: ff0.url || '', name: ff0.name || '', category: ff0.category || 'Proposal',
        fileNote: ff0.fileName ? 'Selected: ' + ff0.fileName + '. In this demo only the name is kept, not the file itself.' : 'In this demo only the file name is kept, not the file itself.',
        off: !ffOk, b: B(ffOk ? 'primary' : 'off'), cta: ffKind === 'link' ? 'Add link' : 'Add file',
        save: ffOk ? () => {
          const f = this.state.fileForm || {}, kind = f.kind === 'file' ? 'file' : 'link';
          const url = String(f.url || '').trim();
          const nm = kind === 'link' ? (String(f.name || '').trim() || url.replace(/^https?:\/\//, '').slice(0, 60)) : f.fileName;
          G(cFileC, 'add files')((z) => { z.files = (z.files || []).concat([{ id: 'f' + Date.now(), kind, name: nm, url: kind === 'link' ? url : '', size: kind === 'file' ? f.fileSize || 0 : 0, category: f.category || 'Proposal', date: todayIso, by: me }]); return z; }, nm + ' added');
          this.setState({ fileForm: { kind, url: '', name: '', category: f.category || 'Proposal', fileName: '', fileSize: 0 } });
        } : noop
      };
      const mixLines = d.hasQuote ? d.lines.map((l) => {
          const dsc = discOf(lineGross(l), l.disc);
          const svN = ((SET.serviceLines || []).find((o) => o.id === l.svc) || {}).name;
          return { k: svN || 'Service line not set', kind: (l.role || 'Untitled line') + ' · ' + (l.unit === 'each' ? 'fixed fee' : 'hourly'), color: accent,
            qtyText: l.unit === 'each' ? qtyOf(l) + ' × fixed' : qtyOf(l) + ' h', rateText: money(rateOf(l)) + (l.unit === 'each' ? '' : ' / h'),
            discText: dsc ? '−' + money(dsc) + ((l.disc || {}).type === 'flat' ? '' : ' (' + l.disc.value + '%)') : '—', discFg: dsc ? '#9E2A30' : '#8C88A6',
            amt: lineAmt(l), v: money(lineAmt(l)) };
        }).concat(d.lic.map((l) => {
          const dsc = discOf(licGross(l), l.disc);
          return { k: 'License', kind: l.product + ' ' + l.plan + ' · ' + money(licAnnual(l)) + '/yr ARR', color: '#E0962E',
            qtyText: (Number(l.seats) || 0) + ' seats × ' + termOf(l) + ' mo', rateText: money(Number(l.ppu) || 0) + ' / seat / mo',
            discText: dsc ? '−' + money(dsc) + ((l.disc || {}).type === 'flat' ? '' : ' (' + l.disc.value + '%)') : '—', discFg: dsc ? '#9E2A30' : '#8C88A6',
            amt: licAmt(l), v: money(licAmt(l)) };
        })) : [];
      const mixFoot = !d.hasQuote ? [] : (x.quoteDisc ? [{ k: 'Discount on the total' + ((d.aq.disc && d.aq.disc.reason) ? ' · ' + d.aq.disc.reason : ''), v: '−' + money(x.quoteDisc), fg: '#9E2A30', fw: '500', size: '13px' }] : [])
        .concat([{ k: 'Contract value', v: money(x.services + x.arr), fg: '#14112E', fw: '700', size: '14px' }]);
      const yr1 = x.services + x.arr;
      const pctOf = (n, dd) => dd ? Math.round(n / dd * 100) : 0;
      const mix = {
        has: d.hasQuote && yr1 > 0, none: !(d.hasQuote && yr1 > 0),
        noneText: d.hasQuote ? 'The active quote has no priced lines yet.' : 'No quote yet. ' + (d.forecast ? 'The estimated value is ' + money(d.forecast) + '.' : 'Nothing to break down until the SE creates one.'),
        sub: d.aq ? d.aq.name + ' v' + d.aq.ver + ' · ' + money(yr1) + ' contract value' : 'from the active quote',
        svcPct: pctOf(x.services, yr1) + '%', licPct: pctOf(x.arr, yr1) + '%',
        svcText: money(x.services), licText: money(x.arr) + (x.arrAnnual ? ' (' + money(x.arrAnnual) + '/yr ARR)' : ''), svcShare: pctOf(x.services, yr1) + '%', licShare: pctOf(x.arr, yr1) + '%',
        aria: 'Contract value ' + money(yr1) + ': services ' + pctOf(x.services, yr1) + '%, licenses ' + pctOf(x.arr, yr1) + '%',
        lines: mixLines, foot: mixFoot,
        showProfit: isAdmin && x.services > 0,
        tiles: [
          { k: 'Services revenue', v: money(x.services), note: 'one-time', bg: '#F6F5FB', fg: '#14112E' },
          { k: 'Delivery cost', v: money(x.cost), note: 'Hours × cost rate per role', bg: '#F6F5FB', fg: '#14112E' },
          { k: 'Services profit', v: money(x.margin), note: 'margin ' + pctOf(x.margin, x.services) + '%', bg: '#E8F5EC', fg: '#1B6B35' }
        ],
        costPct: pctOf(x.cost, x.services) + '%', profitPct: Math.max(0, 100 - pctOf(x.cost, x.services)) + '%',
        marginAria: 'Delivery cost ' + pctOf(x.cost, x.services) + '%, profit ' + pctOf(x.margin, x.services) + '% of services revenue'
      };
      const termList = [];
      d.lines.filter((l) => (l.pay || 'Upfront') !== 'Upfront').map(monthsOf).concat(d.lic.filter((l) => (l.pay || 'Upfront') !== 'Upfront').map(termOf)).forEach((n) => { const t = n + ' months'; if (termList.indexOf(t) < 0) termList.push(t); });
      const hourlyL = d.lines.filter((l) => l.unit !== 'each'), fixedL = d.lines.filter((l) => l.unit === 'each');
      const rates = hourlyL.map((l) => rateOf(l));
      const rMin = rates.length ? Math.min.apply(null, rates) : 0, rMax = rates.length ? Math.max.apply(null, rates) : 0;
      const cRow = (k, v, strong, muted) => ({ k, v, fw: strong ? '700' : '600', fg: muted ? '#6F6B89' : '#14112E' });
      const contractRows = !d.hasQuote ? [
        cRow('Tenure', 'TBD · no quote yet', false, true),
        cRow('Pricing', 'Set when the SE creates the quote', false, true),
        cRow('Estimated value', d.forecast ? money(d.forecast) : 'Not set', true, !d.forecast)
      ] : [
        cRow('Contract term', qTermOf(d.aq) ? qTermOf(d.aq) + ' months' + (termList.length > 1 ? ' (lines: ' + termList.join(' / ') + ')' : '') : 'One-time'),
        cRow('Customer pays', payMix(d.aq).join(', ') || '—', false, !payMix(d.aq).length),
        cRow('Services pricing', hourlyL.length ? (rMin === rMax ? money(rMin) : money(rMin) + '–' + money(rMax)) + '/h · ' + hourlyL.reduce((a, l) => a + qtyOf(l), 0) + ' h' + (fixedL.length ? ' + ' + fixedL.length + ' fixed' : '') : fixedL.length ? fixedL.length + ' fixed-fee item' + (fixedL.length > 1 ? 's' : '') : 'None', false, !d.lines.length),
        cRow('License pricing', d.lic.length ? d.lic.map((l) => vendorOf(l) + ' · ' + (Number(l.seats) || 0) + ' × ' + money(Number(l.ppu) || 0) + '/seat/mo').join(', ') : 'None', false, !d.lic.length)
      ].concat(x.discAmt ? [cRow('Discounts', '−' + money(x.discAmt))] : []).concat([
        cRow('ARR', d.lic.length ? money(x.arrAnnual) + '/yr' : '—', false, !d.lic.length),
        cRow('Contract value', money(x.contract), true)
      ]);
      const team = [{ name: d.owner, role: 'Account executive', sub: 'Owner · added automatically', canChange: false, change: noop, canRemove: false, remove: noop }];
      if (d.se) team.push({ name: d.se, role: 'Solutions engineer', sub: d.seScope || '', canChange: !locked, change: () => this.openSe(id), canRemove: false, remove: noop });
      (d.team || []).forEach((m, i) => team.push({ name: m.name, role: m.role, sub: '', canChange: false, change: noop, canRemove: !locked,
        remove: () => upd((z) => { z.team.splice(i, 1); return z; }, m.name + ' removed from the deal team') }));
      dealNames = team.map((m) => m.name);
      const svcRows = [{ k: 'Services revenue', v: T(money(x.services)) }].concat(isAdmin ? [{ k: 'Cost', v: T('−' + money(x.cost)), muted: true }] : []);
      const licRows = d.hasQuote ? [{ k: 'ARR', v: money(x.arrAnnual) + ' / yr' }, { k: 'License term value', v: money(x.arr) }] : [{ k: 'ARR', v: 'TBD' }];
      const totRows = (x.discAmt ? [{ k: 'Discount', v: '−' + money(x.discAmt), muted: true }] : []).concat([{ k: 'Contract value', v: T(money(x.contract)), strong: true }]).concat(d.hasQuote ? [] : [{ k: 'Estimated value', v: d.forecast ? money(d.forecast) : 'Not set', muted: true }]);
      dv = {
        ...chatBtn({ type: 'deal', id: d.id }, d.company + ' · ' + d.name),
        company: d.company, name: d.name, strategic: d.strategic, code: dealCode(d),
        fcatId: id + '-fcat', probId: id + '-prob', fcat: d.fcat || '', prob: d.prob !== undefined && d.prob !== '' && d.fcat ? String(d.prob) : '',
        fcOff: !(x.stage >= 1 && x.stage <= 2) || !cFc, fcBg: x.stage >= 1 && x.stage <= 2 && cFc ? '#FFFFFF' : '#F6F5FB',
        fcatOpts: [{ v: '', label: 'Not set' }].concat(FCATS.map(([k, p]) => ({ v: k, label: k + ' (' + p + '%)' }))),
        setFcat: !cFc ? noop : (e) => { const v = e.target.value; const hit = FCATS.find((f) => f[0] === v); updRaw((z) => { z.fcat = v; z.prob = hit ? hit[1] : ''; return z; }, v ? 'Forecast set to ' + v : 'Forecast category cleared'); },
        setProb: !cFc ? noop : (e) => { const v = Math.max(0, Math.min(100, parseInt(e.target.value, 10) || 0)); updRaw((z) => { z.prob = v; return z; }); },
        fcNote: !cFc ? '' : x.stage === 0 ? 'Forecast category opens at the Proposal stage. Revenue above is the AE estimate, never linked to the quote.'
          : x.stage > 2 ? 'Deal is closed. Forecast category is locked' + (d.fcat ? ' at ' + d.fcat + '.' : '.')
          : d.fcat ? 'AE judgement · weighted ' + money(Math.round(x.total * (Number(d.prob) || 0) / 100)) + ' (' + (Number(d.prob) || 0) + '% of ' + money(x.total) + ')' : 'AE judgement. Pick a category; the probability fills in and can be changed.',
        stageLabel: STAGES[x.stage], stagePill: d.closed ? P.green : d.lost ? LOSTP : P.violet,
        stages: STAGES.slice(0, 3).map((n, i) => {
          const reached = d.lost ? d.lost.from : x.stage;
          const cur = i === x.stage, done = !cur && i < reached && i < 4;
          const lostBtn = i === 4;
          return {
            label: (done ? '✓ ' : '') + n, current: cur ? 'step' : 'false', go: stageGo(i), cur: locked || !cStage ? 'default' : 'pointer',
            bg: cur ? (lostBtn ? '#9E2A30' : accent) : done ? '#EEEAFE' : '#FFFFFF',
            fg: cur ? '#FFFFFF' : done ? '#14112E' : lostBtn ? '#9E2A30' : '#5E5A78',
            bd: cur ? (lostBtn ? '#9E2A30' : accent) : done ? '#D8D0FA' : lostBtn ? '#E8B9BC' : '#E4E1F0'
          };
        }),
        tabs: [['overview', 'Overview'], ['quote', 'Quotes ' + (d.quotes || []).length], ['drd', 'DRD ' + x.ok + '/' + d.drd.length], ['tasks', 'Tasks and activity ' + ((d.tasks || []).length + (d.activities || []).length)], ['files', 'Files ' + (d.files || []).length], ['log', 'Change log']].filter(([k]) => cQuote || k !== 'quote').map(([k, label]) => ({
          label, go: () => this.setState({ tab: k }), selected: s.tab === k ? 'true' : 'false',
          bd: s.tab === k ? accent : 'transparent', fg: s.tab === k ? '#14112E' : '#5E5A78', fw: s.tab === k ? '650' : '500'
        })),
        tabLog: s.tab === 'log', tabOverview: ['drd', 'quote', 'tasks', 'activity', 'files', 'log'].indexOf(s.tab) < 0 || (s.tab === 'quote' && !cQuote), tabDrd: s.tab === 'drd', tabQuote: s.tab === 'quote' && cQuote, tabActivity: false, tabFiles: s.tab === 'files', tabTasks: s.tab === 'tasks' || s.tab === 'activity', ...dtTasks,
        activities, actCount: activities.length + (activities.length === 1 ? ' entry' : ' entries'), actEmpty: !activities.length,
        files, fileCount: files.length + (files.length === 1 ? ' item' : ' items'), filesEmpty: !files.length,
        doneText: x.gatesMet + ' of ' + x.gates.length + ' done',
        contacts, addContact: () => this.openContact(false),
        openCompany: () => this.openCompany(d.company),
        pc: (() => { const c0 = (d.contacts || []).find((u) => u.name === d.contact) || { name: d.contact || 'Not set', email: '', phone: '' };
          const roles = [].concat((d.champions || []).indexOf(c0.name) >= 0 ? ['Champion'] : []).concat(d.eb === c0.name ? ['Economic buyer'] : []);
          return { name: c0.name, email: c0.email || 'Not added yet', phone: c0.phone || 'Not added yet', selId: id + '-pc',
            chips: roles.map((r) => ({ label: r, bg: r === 'Champion' ? '#E2F4E6' : '#EEEAFE', fg: r === 'Champion' ? '#1B6B35' : '#4B32B8' })),
            opts: (d.contacts || []).map((u) => ({ v: u.name, label: u.name })),
            set: (e) => { const v = e.target.value; upd((z) => { z.contact = v; return z; }, v + ' is now the primary contact'); },
            open: () => this.openContactRecord(d.company, c0.name) }; })(),
        isExpansion: isExpDeal(d), typeId: id + '-type', dtype: isExpDeal(d) ? 'exp' : 'new', typeAuto: expRule !== 'manual', typeBg: expRule !== 'manual' ? '#F6F5FB' : '#FFFFFF',
        setType: (e) => { const v = e.target.value; upd((z) => { z.expansion = v === 'exp'; return z; }, v === 'exp' ? 'Marked as an expansion deal' : 'Marked as new business'); },
        typeNote: expRule !== 'manual' ? 'Set automatically: expansion when the company already has a Closed Won deal.' : 'Set by the AE. Admins can switch to automatic in Settings.',
        contractText: T(money(x.contract)), contractNote: d.hasQuote ? 'From the active quote. Edit it in Quotes.' : 'Set by the quote once the SE creates it',
        closeId: id + '-close', expectedClose: d.expectedClose, setClose: setField('expectedClose'),
        nextId: id + '-next', nextStep: d.nextStep, setNext: setField('nextStep'),
        forecastId: id + '-fc', forecast: d.forecast ? Number(d.forecast).toLocaleString('en-US') : '',
        setForecast: (e) => { const v = parseInt(String(e.target.value).replace(/[^0-9]/g, ''), 10) || 0; upd((z) => { z.forecast = v; return z; }); },
        champPick: d.contacts.map((c) => {
          const on = champs.indexOf(c.name) >= 0, st = pick(on, 'green');
          return { label: (on ? '✓ ' : '+ ') + c.name, on: on ? 'true' : 'false', bg: st.bg, fg: st.fg, bd: st.bd,
            toggle: () => upd((z) => { const j = z.champions.indexOf(c.name); if (j >= 0) z.champions.splice(j, 1); else z.champions.push(c.name); return z; }) };
        }),
        champNoteId: id + '-champ', champNote: d.med.champ ? d.med.champ.n : '',
        setChampNote: (e) => { const v = e.target.value; upd((z) => { z.med.champ = { s: 0, n: v }; return z; }); },
        budgetId: id + '-budget', budget: d.budget, setBudget: setField('budget'),
        critDateId: id + '-crit', critLabelId: id + '-critl', critDate: crit.date, critLabel: crit.label, critText, critPill,
        setCritDate: (e) => { const v = e.target.value; upd((z) => { z.critical = { ...(z.critical || {}), date: v }; return z; }); },
        setCritLabel: (e) => { const v = e.target.value; upd((z) => { z.critical = { ...(z.critical || {}), label: v }; return z; }); },
        med,
        qSub: d.aq ? d.aq.name + ' · v' + d.aq.ver : 'Appears once the SE creates it',
        qSections: [{ h: 'Services', rows: svcRows }, { h: 'Licenses', rows: licRows }, { h: 'Totals', rows: totRows }].map((sec) => ({
          h: sec.h, rows: sec.rows.map((r) => ({ k: r.k, v: r.v, kFg: r.muted ? '#5E5A78' : '#2E2A4D', vFg: r.muted ? '#5E5A78' : '#14112E', fw: r.strong ? '700' : '500' }))
        })),
        netRevenue: T(money(x.services)), showProfit: isAdmin, netProfit: T(money(x.margin)),
        marginText: d.hasQuote && x.services ? 'Margin ' + Math.round(x.margin / x.services * 100) + '%' : 'Margin TBD',
        goQuote: cQuote ? () => this.setState({ tab: 'quote' }) : noop, canQuote: cQuote,
        team: team.map((m) => ({ ...m, initials: initials(m.name), hasSub: !!m.sub })), teamCount: String(team.length),
        addMemberOff: locked, addMemberB: B(locked ? 'off' : 'secondary'), addMember: locked ? noop : () => this.openMember('deal'),
        stakeholders: (d.stakeholders || []).map((p) => ({ name: p.name, initials: initials(p.name), sub: p.role + (p.email ? ' · ' + p.email : '') })),
        stakeEmpty: !(d.stakeholders || []).length, addStake: () => this.openStake(),
        hasQuote: !!d.hasQuote, noQuote: !d.hasQuote,
        medRows, medTotalText: medTotal + ' / 35', medPct: medPctN + '%', medPctLabel: 'MEDDPICC score ' + medTotal + ' of 35',
        medSummary: 'Bars show how confirmed each area is: 1 assumed, 2 heard, 3 partly confirmed, 4 mostly, 5 confirmed by the customer. ' + (unscored ? unscored + ' of 7 not scored yet' : 'All scored') + ' · weakest: ' + weakest + '.',
        mix, companyLine, contractRows, nextLine: String(d.nextStep || '').trim() ? 'Next step: ' + d.nextStep : 'No next step recorded yet', kpisA, kpisB, attn,
        hoursId: id + '-exph', expHours: d.expectedHours ? String(d.expectedHours) : '', hoursLocked: locked,
        setExpHours: (e) => { const v = Math.max(0, Math.min(99999, parseInt(e.target.value, 10) || 0)); upd((z) => { z.expectedHours = v; return z; }); },
        hoursNote: !d.expectedHours ? 'your estimate, before the quote' : d.hasQuote ? 'quote: ' + x.hours + ' h' + (x.hours > d.expectedHours ? ' · ' + (x.hours - d.expectedHours) + ' h over' : x.hours < d.expectedHours ? ' · ' + (d.expectedHours - x.hours) + ' h under' : ' · on target') : 'estimate · no quote yet',
        hoursNoteFg: d.expectedHours && d.hasQuote && x.hours > d.expectedHours * 1.1 ? '#8A4B00' : '#5E5A78', attnCount: attn.length ? attn.length + (attn.length === 1 ? ' item' : ' items') : 'All clear', attnEmpty: !attn.length, buyingNote, scope,
        pathViewOnly: !cPath && !locked,
        steps: stepDefs.map((st, i) => ({
          title: st.title, detail: st.detail, done: st.done, cta: st.cta,
          showCta: !st.done && !locked && cPath, disabled: !st.can || (st.edit && !cPath), act: st.can && (!st.edit || cPath) ? st.act : noop, b: B(st.can && (!st.edit || cPath) ? 'secondary' : 'off'), why: st.edit && !cPath ? '' : st.can ? '' : st.why,
          mark: st.done ? '✓' : String(i + 1), cBg: st.done ? DONE : '#FFFFFF', cFg: st.done ? '#FFFFFF' : '#4A4766', cBd: st.done ? DONE : '#CFCAE3'
        })),
        drd: d.drd.map((r, i) => ({
          ...r, id: id + '-drd-' + i, locked: locked || !cDrd, status: r.ok ? 'Approved' : 'Draft', pill: r.ok ? P.green : P.gray,
          open: () => this.setState({ drdOpen: String(i), taskOpen: '' }), openA: 'Open DRD item: ' + r.req, approveA: 'Approve: ' + r.req,
          ...(() => { const cb = chatBtn({ type: 'drd', deal: id, id: 'drd-' + i }, r.req); return { hasChat: !!cb.chatN, chatN: cb.chatN, chatA: cb.chatA }; })(),
          toggle: () => this.updDeal(id, (z) => { z.drd[i].ok = !z.drd[i].ok; return z; })
        })),
        approveAllOff: x.drdDone || locked || !cDrd, approveB: B(x.drdDone || locked || !cDrd ? 'off' : 'secondary'),
        approveAll: x.drdDone || locked || !cDrd ? noop : () => this.updDeal(id, (z) => { z.drd.forEach((r) => { r.ok = true; }); return z; }, 'All DRD items approved'),
        qStatus: d.aq ? d.aq.status : 'No quote', qPill: d.quoteAccepted ? P.green : d.aq && d.aq.status === 'Sent' ? P.amber : P.gray,
        showClose: !locked && cStage, isLost: !!d.lost, canReopen: !!d.lost && cStage,
        stageHint: !cStage ? '' : locked ? (d.lost ? 'Reopen the deal to change its stage.' : 'Closed Won deals are locked.') : 'Click a stage to move the deal.',
        lostText: d.lost ? 'Closed Lost · ' + d.lost.reason + (d.lost.competitor ? ' (' + d.lost.competitor + ')' : '') + (d.lost.note ? ' · ' + d.lost.note : '') : '',
        openLost: !cStage ? noop : () => this.setState({ modal: 'lost', lostForm: { reason: '', competitor: '', note: '' } }),
        reopen: !cStage ? noop : () => updRaw((z) => { z.stage = z.lost ? z.lost.from : 0; delete z.lost; return z; }, d.company + ' reopened'),
        closeOff: !x.canClose, closeB: B(x.canClose ? 'primary' : 'off'),
        closeNote: x.canClose ? 'All path-to-close steps done' : x.gatesMet + ' of ' + x.gates.length + ' path-to-close steps done',
        openClose: x.canClose && cStage ? () => this.setState({ modal: 'close', close: { reason: 'Strong product fit', amount: money(x.total) } }) : noop,
        confirmClose: () => { const c = this.state.close; this.updDeal(id, (z) => { z.closed = true; z.closeReason = c.reason; z.closeAmount = c.amount; if (!z.project) z.project = this.projectFull({ ...z, project: { lifecycle: 'notStarted', checkLabels: ['__drd__'].concat(this.settingsOf(this.state.data).onboarding) } }); return z; }, d.company + ' is Closed Won. Project created with an onboarding checklist.'); this.setState({ modal: '' }); this.openProject(id); },
        showCreate: d.closed && !d.project, closeReason: d.closeReason, closeAmount: d.closeAmount,
        create: () => { this.updDeal(id, (z) => { z.project = this.projectFull({ ...z, project: { lifecycle: 'notStarted', checkLabels: ['__drd__'].concat(this.settingsOf(this.state.data).onboarding) } }); return z; }, 'Project created with an onboarding checklist'); this.openProject(id); },
        showOpenProject: !!d.project, openProject: () => this.openProject(id),
        companyFields: [{ k: 'Industry', v: d.industry }, { k: 'Company size', v: d.size }, { k: 'Customer tier', v: d.tier }, { k: 'Strategic', v: d.strategic ? 'Yes' : 'No' }]
      };
      const QPILL = { Draft: P.gray, Sent: P.amber, Accepted: P.green, Superseded: P.gray };
      const ppuN = (l) => Number(l.ppu) || 0, seatN = (l) => Number(l.seats) || 0;
      const qTot = (q) => quoteTotals(q);
      const quotes = d.quotes || [];
      const selQ = quotes.find((q) => q.id === s.qSel) || quotes.find((q) => q.id === d.activeQ) || quotes[0] || null;
      const updQ = (qid, fn, msg) => G(cQuoteE, 'edit quotes')((z) => { const q = (z.quotes || []).find((y) => y.id === qid); if (q) { fn(q, z); (q.lines || []).forEach((l) => { if (!l.id) l.id = 'sl' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6); }); } return z; }, msg);
      const names = [];
      quotes.forEach((q) => { if (names.indexOf(q.name) < 0) names.push(q.name); });
      const nextName = 'Scenario ' + String.fromCharCode(65 + names.length);
      const addQuote = (src, name, ver, msg, prs) => {
        const nid = 'q' + Date.now();
        const nq = { id: nid, name, ver, status: 'Draft',
          lines: JSON.parse(JSON.stringify(src ? src.lines : (d.seedLines.length ? d.seedLines : [{ role: 'Solutions architect', hours: 40 }]))),
          lic: JSON.parse(JSON.stringify(src ? src.lic : [])) };
        if (!src && prs && prs.length) { nq.practices = prs.slice(); nq.lines.forEach((l0) => { l0.practice = prs[0]; }); prs.slice(1).forEach((p0) => nq.lines.push({ role: 'New line item', hours: 1, unit: 'h', rate: RATE, practice: p0 })); }
        nq.lines.forEach((l0) => { if (!l0.id) l0.id = 'sl' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6); });
        G(cQuoteC, 'create quotes')((z) => { z.quotes = (z.quotes || []).concat([nq]); if (!z.activeQ) z.activeQ = nid; return z; }, msg);
        this.setState({ qSel: nid });
      };
      const canCreate = !!d.se && !locked;
      qv = {
        none: !quotes.length, hasSel: !!selQ,
        createOff: !canCreate, createB: B(canCreate ? 'primary' : 'off'),
        createWhy: !d.se ? 'Choose an SE first' : locked ? 'Deal is closed' : 'Starts as ' + nextName + ' · draft',
        create: canCreate ? () => this.setState({ modal: 'newquote', nqP: [] }) : noop,
        nq: (() => { const sel = s.nqP || [], PRA = (SET.practices || []).filter((p0) => p0.active !== false);
          return { on: s.modal === 'newquote', name: nextName, none: !PRA.length, off: !sel.length, b: B(sel.length ? 'primary' : 'off'),
            opts: PRA.map((p0) => { const on = sel.indexOf(p0.id) >= 0; return { label: p0.name, sel: on ? 'true' : 'false', bg: on ? '#14112E' : '#FFFFFF', fg: on ? '#FFFFFF' : '#14112E', bd: on ? '#14112E' : '#CFCAE3',
              toggle: () => this.setState((st) => { const cur = st.nqP || []; return { nqP: cur.indexOf(p0.id) >= 0 ? cur.filter((u) => u !== p0.id) : cur.concat([p0.id]) }; }) }; }),
            cancel: () => this.setState({ modal: '', nqP: [] }),
            create: sel.length ? () => { addQuote(null, nextName, 1, nextName + ' created as a draft', sel); this.setState({ modal: '', nqP: [] }); } : noop }; })(),
        list: quotes.map((q) => {
          const t = qTot(q), isActive = q.id === d.activeQ, sel = !!selQ && q.id === selQ.id;
          return {
            name: q.name, ver: String(q.ver), status: q.status, pill: QPILL[q.status] || P.gray, isActive,
            selected: sel ? 'true' : 'false', bg: sel ? '#F8F6FF' : '#FFFFFF', totalText: money(t.total),
            select: () => this.setState({ qSel: q.id }),
            canActivate: !isActive && !locked && !d.quoteAccepted && q.status !== 'Superseded',
            activate: () => G(cQuoteE, 'edit quotes')((z) => { z.activeQ = q.id; return z; }, q.name + ' v' + q.ver + ' is now the active quote'),
            dupOff: !canCreate, dupB: B(canCreate ? 'secondary' : 'off'),
            duplicate: canCreate ? () => addQuote(q, nextName, 1, q.name + ' duplicated as ' + nextName) : noop
          };
        }),
        lines: [], lic: [], summary: [], send: noop, accept: noop, revise: noop, addLine: noop, addLic: noop, acceptB: B('off'), pill: P.gray
      };
      if (selQ) {
        const q = selQ, t = qTot(q), editable = cQuoteE && !locked && (q.status === 'Draft' || q.status === 'Sent');
        const nextVer = Math.max.apply(null, quotes.filter((y) => y.name === q.name).map((y) => y.ver)) + 1;
        const isActive = q.id === d.activeQ;
        Object.assign(qv, {
          title: q.name + ' · v' + q.ver, status: q.status, pill: QPILL[q.status] || P.gray,
          note: (isActive ? 'Active quote. It feeds the overview, pipeline and path to close.' : 'Not the active quote.') + (d.se ? ' Hours set by ' + d.se + '.' : ''),
          showSend: editable && q.status === 'Draft', missingCat: q.lines.some((l) => !l.practice || !l.svc),
          send: () => q.lines.some((l) => !l.practice || !l.svc) ? this.flash('Choose a practice and a service line on every line before sending.') : updQ(q.id, (y) => { y.status = 'Sent'; }, q.name + ' v' + q.ver + ' marked as sent'),
          showAccept: !locked && q.status === 'Sent', acceptOff: d.proposal < 1, acceptB: B(d.proposal >= 1 ? 'primary' : 'off'),
          accept: d.proposal >= 1 ? () => G(cQuoteE, 'edit quotes')((z) => {
            z.quotes.forEach((y) => { if (y.status === 'Accepted') y.status = 'Superseded'; });
            const y = z.quotes.find((u) => u.id === q.id); if (y) y.status = 'Accepted';
            z.activeQ = q.id; z.stage = Math.max(typeof z.stage === 'number' ? z.stage : 1, 2);
            return z;
          }, q.name + ' v' + q.ver + ' accepted and set as the active quote. Deal moved to Negotiating.') : noop,
          showRevise: !locked && q.status === 'Accepted', nextVer: String(nextVer),
          revise: () => addQuote(q, q.name, nextVer, q.name + ' v' + nextVer + ' drafted. v' + q.ver + ' stays active until the new version is accepted.'),
          why: locked ? 'Deal is closed. Quotes are read-only.' : q.status === 'Draft' && q.lines.some((l) => !l.practice || !l.svc) ? 'Choose a practice and service line on every line' : q.status === 'Accepted' ? 'Accepted quotes are locked' : q.status === 'Superseded' ? 'Replaced by a newer version' : q.status === 'Sent' && d.proposal < 1 ? 'Send the proposal first' : q.status === 'Draft' ? 'Mark it sent when it goes to the customer' : '',
          editable, noLines: !q.lines.length, noLic: !q.lic.length, costHead: isAdmin ? 'Cost ($ / h)' : '',
          lines: q.lines.map((l, i) => ({
            ...(() => { const PR = SET.practices || [], SV = SET.serviceLines || [];
              const opt = (arr, cur, ph) => [{ v: '', label: ph }].concat(arr.filter((o) => o.active !== false || o.id === cur).map((o) => ({ v: o.id, label: o.name + (o.active === false ? ' (inactive)' : '') })));
              return { ...payInfo(l, lineAmt(l), 'line ' + (i + 1), (fn) => updQ(q.id, (y) => fn(y.lines[i]))), pid: q.id + '-lp-' + i, sid: q.id + '-ls-' + i, mid: q.id + '-lm-' + i, yid: q.id + '-ly-' + i, practice: l.practice || '', svc: l.svc || '',
                prBd: l.practice ? '#CFCAE3' : '#E8A13C', svBd: l.svc ? '#CFCAE3' : '#E8A13C', practiceOpts: opt(PR, l.practice, 'Choose practice'), svcOpts: opt(SV, l.svc, 'Choose service line'),
                setPractice: (e) => { const v = e.target.value; updQ(q.id, (y) => { y.lines[i].practice = v; }); },
                setSvc: (e) => { const v = e.target.value; updQ(q.id, (y) => { y.lines[i].svc = v; }); },
                }; })(),
            item: l.role, qty: String(Number(l.hours) || 0), unit: l.unit === 'each' ? 'each' : 'h', rate: String(rateOf(l)), locked: !editable, canRemove: editable,
            itemLabel: 'Line item ' + (i + 1), qtyLabel: 'Quantity, line ' + (i + 1), unitLabel: 'Unit, line ' + (i + 1), rateLabel: 'Rate, line ' + (i + 1), removeLabel: 'Remove service line ' + (i + 1),
            costText: isAdmin ? (l.unit === 'each' ? 'n/a' : money(lineCost(l)) + (l.costRate !== undefined && l.costRate !== null && l.costRate !== '' ? ' · this deal' : ' · rate card')) : '',
            showCostInput: isAdmin && l.unit !== 'each', costRate: isAdmin ? String(costRateOf(l)) : '', costRateLabel: 'Cost per hour, line ' + (i + 1),
            setCostRate: isAdmin ? (e) => { const raw = String(e.target.value).trim(); updQ(q.id, (y) => { y.lines[i].costRate = raw === '' ? '' : Math.max(0, Math.min(99999, parseFloat(raw) || 0)); }); } : noop, amount: money(lineAmt(l)),
            dType: (l.disc || {}).type === 'flat' ? 'flat' : 'pct', dVal: (l.disc && l.disc.value) ? String(l.disc.value) : '', dTypeLabel: 'Discount type, line ' + (i + 1), dValLabel: 'Discount, line ' + (i + 1),
            hasDisc: !!discOf(lineGross(l), l.disc), discText: discOf(lineGross(l), l.disc) ? '−' + money(discOf(lineGross(l), l.disc)) + ((l.disc || {}).type === 'flat' ? '' : ' (' + l.disc.value + '%)') : '',
            setDType: (e) => { const v = e.target.value === 'flat' ? 'flat' : 'pct'; updQ(q.id, (y) => { y.lines[i].disc = { ...(y.lines[i].disc || {}), type: v }; }); },
            setDVal: (e) => { const v = Math.max(0, parseFloat(e.target.value) || 0); updQ(q.id, (y) => { y.lines[i].disc = { type: 'pct', ...(y.lines[i].disc || {}), value: v }; }); },
            setItem: (e) => { const v = e.target.value; updQ(q.id, (y) => { y.lines[i].role = v; }); },
            setQty: (e) => { const v = Math.max(0, Math.min(9999, parseInt(e.target.value, 10) || 0)); updQ(q.id, (y) => { y.lines[i].hours = v; }); },
            setUnit: (e) => { const v = e.target.value === 'each' ? 'each' : 'h'; updQ(q.id, (y) => { y.lines[i].unit = v; }); },
            setRate: (e) => { const v = Math.max(0, Math.min(999999, parseFloat(e.target.value) || 0)); updQ(q.id, (y) => { y.lines[i].rate = v; }); },
            remove: () => updQ(q.id, (y) => { y.lines.splice(i, 1); })
          })),
          addLine: editable ? () => updQ(q.id, (y) => { const lp = (y.lines[y.lines.length - 1] || {}).practice || (y.practices || [])[0] || ''; y.lines.push({ role: 'New line item', hours: 1, unit: 'h', rate: RATE, practice: lp }); }) : noop,
          lic: q.lic.map((l, i) => ({
            ...payInfo(l, licAmt(l), 'license line ' + (i + 1), (fn) => updQ(q.id, (y) => fn(y.lic[i]))), yid: q.id + '-ky-' + i, mid: q.id + '-km-' + i,
            vendor: vendorOf(l), vendorLabel: 'Vendor, license line ' + (i + 1),
            productOpts: (VENDORS[vendorOf(l)] || VENDORS['monday.com']).products.concat((VENDORS[vendorOf(l)] || VENDORS['monday.com']).products.indexOf(l.product) < 0 ? [l.product] : []).map((v) => ({ v, label: v })),
            planOpts: (VENDORS[vendorOf(l)] || VENDORS['monday.com']).plans.concat((VENDORS[vendorOf(l)] || VENDORS['monday.com']).plans.indexOf(l.plan) < 0 ? [l.plan] : []).map((v) => ({ v, label: v })),
            setVendor: (e) => { const v = e.target.value; const V = VENDORS[v] || VENDORS['monday.com']; updQ(q.id, (y) => { y.lic[i].vendor = v; if (V.products.indexOf(y.lic[i].product) < 0) y.lic[i].product = V.products[0]; if (V.plans.indexOf(y.lic[i].plan) < 0) y.lic[i].plan = V.plans[0]; }); },
            product: l.product, plan: l.plan, seats: String(l.seats), ppu: String(l.ppu), locked: !editable, canRemove: editable,
            productLabel: 'Product, license line ' + (i + 1), planLabel: 'Plan, license line ' + (i + 1), seatsLabel: 'Seats, license line ' + (i + 1), ppuLabel: 'Price per seat per month, license line ' + (i + 1), removeLabel: 'Remove license line ' + (i + 1),
            dType: (l.disc || {}).type === 'flat' ? 'flat' : 'pct', dVal: (l.disc && l.disc.value) ? String(l.disc.value) : '', dTypeLabel: 'Discount type, license line ' + (i + 1), dValLabel: 'Discount, license line ' + (i + 1),
            hasDisc: !!discOf(licGross(l), l.disc), discText: discOf(licGross(l), l.disc) ? '−' + money(discOf(licGross(l), l.disc)) + ((l.disc || {}).type === 'flat' ? '' : ' (' + l.disc.value + '%)') : '',
            setDType: (e) => { const v = e.target.value === 'flat' ? 'flat' : 'pct'; updQ(q.id, (y) => { y.lic[i].disc = { ...(y.lic[i].disc || {}), type: v }; }); },
            setDVal: (e) => { const v = Math.max(0, parseFloat(e.target.value) || 0); updQ(q.id, (y) => { y.lic[i].disc = { type: 'pct', ...(y.lic[i].disc || {}), value: v }; }); },
            setProduct: (e) => { const v = e.target.value; updQ(q.id, (y) => { y.lic[i].product = v; }); },
            setPlan: (e) => { const v = e.target.value; updQ(q.id, (y) => { y.lic[i].plan = v; }); },
            setSeats: (e) => { const v = Math.max(0, Math.min(9999, parseInt(e.target.value, 10) || 0)); updQ(q.id, (y) => { y.lic[i].seats = v; }); },
            setPpu: (e) => { const v = Math.max(0, Math.min(999, parseInt(e.target.value, 10) || 0)); updQ(q.id, (y) => { y.lic[i].ppu = v; }); },
            remove: () => updQ(q.id, (y) => { y.lic.splice(i, 1); })
          })),
          addLic: editable ? () => updQ(q.id, (y) => { y.lic.push({ vendor: 'monday.com', product: 'monday CRM', plan: 'Pro', seats: 10, ppu: 50, pay: 'Monthly', months: qTermOf(y) || 12 }); }) : noop,
          vendorOpts: Object.keys(VENDORS).map((v) => ({ v, label: v })),
          discLocked: !editable, discPctOn: (q.disc || {}).type === 'flat' ? 'false' : 'true', discFlatOn: (q.disc || {}).type === 'flat' ? 'true' : 'false',
          discPctBg: (q.disc || {}).type === 'flat' ? 'transparent' : '#FFFFFF', discFlatBg: (q.disc || {}).type === 'flat' ? '#FFFFFF' : 'transparent',
          discValLabel: (q.disc || {}).type === 'flat' ? 'Amount ($)' : 'Percent (%)', discVal: (q.disc && q.disc.value) ? String(q.disc.value) : '',
          discOn: (q.disc || {}).on || 'services', discReason: (q.disc || {}).reason || '',
          discNote: t.discAmt ? '−' + money(t.discAmt) + ' off ' + ({ services: 'services', licenses: 'licenses', all: 'the whole quote' })[(q.disc || {}).on || 'services'] + ' · ' + Math.round(t.discAmt / Math.max(1, ({ services: t.svcGross, licenses: t.arrGross, all: t.gross })[(q.disc || {}).on || 'services']) * 100) + '% of that subtotal' : 'No discount',
          discNoteFg: t.discAmt ? '#9E2A30' : '#6F6B89',
          setDiscPct: () => updQ(q.id, (y) => { y.disc = { ...(y.disc || {}), type: 'pct' }; }),
          setDiscFlat: () => updQ(q.id, (y) => { y.disc = { ...(y.disc || {}), type: 'flat' }; }),
          setDiscVal: (e) => { const v = Math.max(0, parseFloat(e.target.value) || 0); updQ(q.id, (y) => { y.disc = { type: 'pct', on: 'services', ...(y.disc || {}), value: v }; }); },
          setDiscOn: (e) => { const v = e.target.value; updQ(q.id, (y) => { y.disc = { type: 'pct', ...(y.disc || {}), on: v }; }); },
          setDiscReason: (e) => { const v = e.target.value; updQ(q.id, (y) => { y.disc = { type: 'pct', on: 'services', ...(y.disc || {}), reason: v }; }); },
          ...(() => { const PR = SET.practices || [], SV = SET.serviceLines || [], nm = (arr, idv, dflt) => ((arr.find((o) => o.id === idv) || {}).name) || dflt;
            // Quote preview: every line listed on its own, the way the customer reads the quote.
            const dTxt = (gross, ds) => { const a = discOf(gross, ds); return a ? '−' + money(a) + ((ds || {}).type === 'flat' ? ' discount' : ' (' + ds.value + '% off)') : ''; };
            const svc = q.lines.map((l, i) => { const b = payInfo(l, lineAmt(l), '', noop), each = l.unit === 'each';
              return { n: String(i + 1), item: l.role || 'Service', sub: nm(PR, l.practice, 'No practice') + ' · ' + nm(SV, l.svc, 'No service line'),
                qty: (Number(l.hours) || 0) + (each ? ' each' : ' h') + (b.showTotal ? ' /mo' : ''), rate: money(rateOf(l)) + (each ? ' each' : ' /h'),
                bill: b.billText, amt: b.amtPer + b.amtUnit, hasTot: b.showTotal, tot: 'Total ' + money(lineAmt(l)), hasDisc: !!discOf(lineGross(l), l.disc), disc: dTxt(lineGross(l), l.disc) }; });
            const lic = (q.lic || []).map((l, i) => { const b = payInfo(l, licAmt(l), '', noop);
              return { n: String(q.lines.length + i + 1), item: (l.product || 'License') + ' ' + (l.plan || ''), sub: (l.vendor || 'monday.com') + ' · License',
                qty: (Number(l.seats) || 0) + ' seats', rate: money(Number(l.ppu) || 0) + ' /seat /mo',
                bill: b.billText, amt: b.amtPer + b.amtUnit, hasTot: b.showTotal, tot: 'Total ' + money(licAmt(l)), hasDisc: !!discOf(licGross(l), l.disc), disc: dTxt(licGross(l), l.disc) }; });
            const on = (q.disc || {}).on || 'services', row = (k, v, strong) => ({ k, v, bt: strong ? '2px solid #14112E' : '1px solid #EEECF5', fw: strong ? '700' : '500', fs: strong ? '15px' : '13px', fg: strong ? '#14112E' : '#4A4766' });
            const totals = [].concat(svc.length ? [row('Services subtotal', money(t.svcGross))] : []).concat(lic.length ? [row('Licenses subtotal', money(t.arrGross))] : [])
              .concat(t.discAmt ? [row('Discount on ' + ({ services: 'services', licenses: 'licenses', all: 'the whole quote' })[on] + ((q.disc || {}).reason ? ' (' + q.disc.reason + ')' : ''), '−' + money(t.discAmt))] : [])
              .concat([row('Total', money(t.total), true)]);
            return { hasBreakdown: svc.length + lic.length > 0, pv: { title: q.name + ' · v' + q.ver, company: d.company || 'the customer', status: q.status, total: money(t.total), hasSvc: svc.length > 0, hasLic: lic.length > 0, svc, lic, totals,
              hasNote: t.lineDisc > 0 || lic.length > 0, note: [t.lineDisc ? 'Line discounts of ' + money(t.lineDisc) + ' are already taken off the amounts above.' : '', lic.length ? 'Licenses: ' + money(t.arrAnnual) + ' a year in recurring revenue (ARR).' : ''].filter(Boolean).join(' ') } }; })(),
          summary: (t.totalDisc ? [{ k: 'List price', v: money(t.list) }].concat(t.lineDisc ? [{ k: 'Line discounts', v: '−' + money(t.lineDisc) }] : []).concat(t.discAmt ? [{ k: 'Discount on total', v: '−' + money(t.discAmt) }] : []) : [])
            .concat([{ k: 'Services', v: money(t.svc) }, { k: 'ARR', v: money(t.arrAnnual) + '/yr' }, { k: 'License term value', v: money(t.arr) }, { k: 'Contract term', v: qTermOf(q) ? qTermOf(q) + ' months · ' + payMix(q).join(', ').toLowerCase() : 'One-time · upfront' }, { k: 'Contract value', v: money(t.total) }])
            .concat(isAdmin ? [{ k: 'Delivery cost', v: money(t.cost) }, { k: 'Services profit', v: money(t.svc - t.cost) + (t.svc ? ' · ' + Math.round((t.svc - t.cost) / t.svc * 100) + '%' : '') }] : [])
        });
      }
    }

    // Project status is its lifecycle: Not started (incl. a scheduled future start), Active, Closed.
    const lifeOf = (pj0) => { const td0 = new Date().toISOString().slice(0, 10); if (pj0.lifecycle === 'closed') return ['Closed', { bg: '#EEEDF4', fg: '#4A4766' }]; if (pj0.lifecycle === 'notStarted' || !pj0.dates.start || pj0.dates.start > td0) return ['Not started', P.amber]; return ['Active', P.green]; };
    const projects = withProject.map((y) => ({
      ...(() => { const pj0 = this.projectFull(y.d), su0 = pj0.setup || {}, logged = pj0.timelog.reduce((a, e) => a + (Number(e.hours) || 0), 0);
        const pmM = pj0.team.find((m) => m.role === 'Engagement manager') || pj0.team.find((m) => /project manager/i.test(m.role || '')), pmN = pmM ? pmM.name : '';
        const fmt = (iso) => { if (!iso) return 'Not set'; const d0 = new Date(iso + 'T00:00:00Z'); return d0.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' }); };
        const started = pj0.lifecycle !== 'notStarted';
        const hl = (y.d.lines || []).filter((l) => l.unit !== 'each'), hq = hl.reduce((a, l) => a + qtyOf(l), 0);
        const cr = su0.costRate !== undefined && su0.costRate !== '' ? Number(su0.costRate) || 0 : (hq ? hl.reduce((a, l) => a + lineCost(l), 0) / hq : cardRate(''));
        const billed = pj0.timelog.reduce((a, e) => a + this.billOf(e), 0);
        return { title: (String(su0.name || '').trim() || y.d.company + ' – ' + y.d.name), type: su0.billing || 'Time and materials', pm: pmN || 'Not assigned', hasPm: !!pmN, pmIni: pmN.split(' ').map((w) => w[0]).join('').slice(0, 2), pmFg: pmN ? '#14112E' : '#8C88A6',
          timeline: (started ? fmt(pj0.dates.start) : 'Not started') + ' → ' + fmt(pj0.dates.end), hoursShort: (Math.round(logged * 10) / 10) + ' / ' + y.hours + ' h', openA: 'Open project ' + y.d.company,
          _logged: logged, _total: y.hours, _billed: billed, _cost: logged * cr }; })(),
      company: y.d.company, code: this.projectFull(y.d).id, name: y.d.name + ' · from ' + dealCode(y.d), hoursText: this.projectFull(y.d).timelog.reduce((a, e) => a + (Number(e.hours) || 0), 0) + ' h logged of ' + y.hours + ' h total',
      people: (() => { const pj0 = this.projectFull(y.d); return [y.d.owner, y.d.se].concat((y.d.team || []).map((m) => m.name)).concat(pj0.team.map((m) => m.name)).filter((n, i, a) => n && a.indexOf(n) === i); })(),
      status: lifeOf(this.projectFull(y.d))[0], pill: lifeOf(this.projectFull(y.d))[1], open: () => this.openProject(y.d.id)
    }));
    const px = x && x.d.project ? x : null;
    let pv = { pjm: { startOn: false, closeOn: false, startB: {}, canStart: false, canClose: false, canReopen: false, showLog: false, hasNote: false }, keyHint: '', td: { chat: { posts: [], b: B('off') }, reqItems: [] }, hasTd: false, rp: { linked: [], others: [] }, rd: { linked: [] }, chat: { posts: [], b: B('off') }, statusOpts: [], typeOpts: [], reqOpts: [], keyItems: [], upcoming: [], phases: [], alloc: [], openPlan: () => {}, tabs: [], stats: [], dates: [], checks: [], ms: [], sel: { tasks: [] }, rates: [], slots: [], contacts: [], companyFields: [], reqs: [], log: [], fin: { tiles: [], pls: [] },
      statusPill: P.gray, addTaskB: B('off'), logTime: noop, addMember: noop, addContact: noop, openCompany: noop, promote: noop, addTask: noop, p0Toggle: noop };
    let tv = { budget: [], warns: [], msOpts: [], taskOpts: [], roleOpts: [], off: true, b: B('off'), save: noop };
    if (px) {
      const d = px.d, id = d.id, pj = this.projectFull(d);
      const updPRaw = (fn, msg) => this.updDeal(id, (z) => { const p = this.projectFull(z); fn(p, z); z.project = p; return z; }, msg);
      // Project lifecycle: not started → active (start date may be in the future) → closed (view only for everyone).
      const LC0 = this.projectFull(d).lifecycle, pjClosed = LC0 === 'closed', pjStarted = LC0 !== 'notStarted', tdy0 = new Date().toISOString().slice(0, 10);
      const pjCanLog = !pjClosed && pjStarted && !!this.projectFull(d).dates.start && this.projectFull(d).dates.start <= tdy0;
      const pjLockMsg = pjClosed ? 'This project is closed. It is view only.' : !pjStarted ? 'Start the project before logging time.' : 'Time can be logged from the start date.';
      const updP = (fn, msg) => pjClosed ? this.flash(pjLockMsg) : cProjE && (this.scopeOf(s, 'projects', 'es') === 'all' || onDeal0(d) || onProj0(d)) ? updPRaw(fn, msg) : this.flash('Your role can\'t edit this project.');
      const TP = (op) => pjClosed ? () => this.flash(pjLockMsg) : this.canDo(this.state, 'tasks', op) ? updPRaw : () => this.flash('Your role can\'t ' + ({ c: 'create', e: 'edit', d: 'delete' })[op] + ' tasks.');
      const fmtD = (v) => { if (!v) return 'Not set'; const t = new Date(v + 'T00:00:00'); return isNaN(t) ? v : t.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }); };
      const daysTo = (v) => { if (!v) return null; const t0 = new Date(); t0.setHours(0, 0, 0, 0); const n = Math.round((new Date(v + 'T00:00:00') - t0) / 86400000); return isNaN(n) ? null : n; };
      const rel = (n) => n === null ? '' : n < 0 ? (-n) + (n === -1 ? ' day ago' : ' days ago') : n === 0 ? 'today' : 'in ' + n + (n === 1 ? ' day' : ' days');
      const todayIso = new Date().toISOString().slice(0, 10);
      const hourly = (d.lines || []).filter((l) => l.unit !== 'each');
      // Service lines on the project mirror the active quote. Started = first time entry on the line; Completed = the day logged hours reach the line's total.
      const allLines = d.lines || [], keyOf = (l, i) => l.id || ('idx' + i);
      const lineOfEntry = (e) => { if (e.line) return e.line; const i = allLines.findIndex((l) => l.role === e.role); return i >= 0 ? keyOf(allLines[i], i) : ''; };
      const svcName = (l) => ((SET.serviceLines || []).find((o) => o.id === l.svc) || {}).name || 'Service line not set';
      const lineProg = (l, i) => { const k = keyOf(l, i), es = pj.timelog.filter((e) => lineOfEntry(e) === k).slice().sort((a, b) => String(a.date).localeCompare(String(b.date)));
        const used = es.reduce((a, e) => a + hrsN(e), 0), total = l.unit === 'each' ? 0 : qtyOf(l); let run = 0, done = '';
        if (total > 0) es.some((e) => { run += hrsN(e); if (run >= total) { done = e.date; return true; } return false; });
        return { k, used, total, start: es.length ? es[0].date : '', done }; };
      const psOf = (l) => { const pr = ((SET.practices || []).find((o) => o.id === l.practice) || {}).name, sv = ((SET.serviceLines || []).find((o) => o.id === l.svc) || {}).name;
        return { practice: pr || 'Not set', svc: sv || 'Not set', prFg: pr ? '#2E2A4D' : '#8C88A6', svFg: sv ? '#2E2A4D' : '#8C88A6' }; };
      const fixed = (d.lines || []).filter((l) => l.unit === 'each');
      const su = pj.setup || {};
      const hrsQ0 = hourly.reduce((a, l) => a + qtyOf(l), 0), CR0 = hrsQ0 ? Math.round(hourly.reduce((a, l) => a + lineCost(l), 0) / hrsQ0) : cardRate('');
      const CR = su.costRate !== undefined && su.costRate !== '' ? Number(su.costRate) || 0 : CR0;
      const ovr = (l) => su.rates && su.rates[l.role] !== undefined && su.rates[l.role] !== '' ? Number(su.rates[l.role]) || 0 : null;
      const rOf = (l) => ovr(l) !== null ? ovr(l) : rateOf(l);
      const quoteHours = hourly.reduce((a, l) => a + qtyOf(l), 0);
      const planned = su.hoursBudget !== undefined && su.hoursBudget !== '' ? Number(su.hoursBudget) || 0 : quoteHours;
      const hrsN = (e) => Number(e.hours) || 0;
      const used = pj.timelog.reduce((a, e) => a + hrsN(e), 0);
      const billed = pj.timelog.reduce((a, e) => a + this.billOf(e), 0);
      const hourlyRev = hourly.reduce((a, l) => a + (ovr(l) !== null ? qtyOf(l) * ovr(l) : lineAmt(l)), 0);
      const blended = quoteHours ? Math.round(hourlyRev / quoteHours) : RATE;
      const remaining = planned - used;
      const msById = {}; pj.milestones.forEach((m) => { msById[m.id] = m; });
      const taskById = {}; pj.tasks.forEach((t) => { taskById[t.id] = t; });
      const cur = pj.milestones.find((m) => !m.done) || null;
      const p0n = pj.checks.filter(Boolean).length, p0t = pj.checks.length;
      const ptab = ['overview', 'plan', 'requirements', 'time', 'files', 'financials', 'setup', 'log'].indexOf(s.ptab) >= 0 && !((s.ptab === 'financials' || s.ptab === 'setup') && !isAdmin) ? s.ptab : 'overview';
      const usedOn = (msId) => pj.timelog.filter((e) => e.ms === msId).reduce((a, e) => a + hrsN(e), 0);
      const usedTask = (tId) => pj.timelog.filter((e) => e.task === tId).reduce((a, e) => a + hrsN(e), 0);
      const estN = (t) => Number(t.est) || 0;
      const STS = SET.taskStatuses, doneStatus = (v) => !!(STS.find((u) => u.label === v) || {}).done;
      const stOf = (t) => (STS.some((u) => u.label === t.status) ? t.status : (t.done ? (STS.find((u) => u.done) || {}).label || 'Done' : STS[0].label));
      const stStyle = (t) => { const v = stOf(t); return doneStatus(v) ? { bg: '#E2F4E6', fg: '#1B6B35' } : /block/i.test(v) ? { bg: '#FBE4E5', fg: '#9E2A30' } : /progress/i.test(v) ? { bg: '#EEEAFE', fg: '#4B32B8' } : { bg: '#FFFFFF', fg: '#14112E' }; };
      const reqList = (d.drd || []).filter((r) => r.ok);
      const reqName = (k) => { const i = parseInt(String(k).slice(1), 10); return reqList[i] ? 'R' + (i + 1) + ' · ' + reqList[i].req : k; };
      const reqBtn = (kind, tid, sel, name) => ({ reqCount: sel.length ? String(sel.length) : '+', reqA: (sel.length ? sel.length + ' linked requirement' + (sel.length === 1 ? '' : 's') : 'Link requirements') + ' for ' + name,
        reqBg: sel.length ? '#EEEAFE' : '#FFFFFF', reqFg: sel.length ? '#4B32B8' : '#6F6B89', reqBd: sel.length ? '#D8D0FA' : '#E4E1F0',
        openReqs: () => this.setState({ reqPick: { kind, id: tid }, reqMin: false, reqOpen: '' }) });
      const rpT = s.reqPick ? (s.reqPick.kind === 'ms' ? pj.milestones.find((m) => m.id === s.reqPick.id) : pj.tasks.find((t) => t.id === s.reqPick.id)) : null;
      const rpSel = rpT ? (rpT.reqs || []) : [];
      const rpToggle = (k) => () => updP((p) => { const y = s.reqPick.kind === 'ms' ? p.milestones.find((m) => m.id === s.reqPick.id) : p.tasks.find((t) => t.id === s.reqPick.id); if (!y) return; const cur = y.reqs || []; y.reqs = cur.indexOf(k) >= 0 ? cur.filter((u) => u !== k) : cur.concat([k]); });
      const rpRow = (r, i) => { const k = 'r' + i, on = rpSel.indexOf(k) >= 0;
        return { code: 'R' + (i + 1), req: r.req, pain: r.pain || 'Not captured', bg: on ? '#F8F6FF' : 'transparent', on: on ? 'true' : 'false', box: on ? '#6A4FE0' : '#B8B3CE', fill: on ? '#6A4FE0' : '#FFFFFF', tick: on ? '#FFFFFF' : 'transparent',
          toggle: rpToggle(k), toggleA: (on ? 'Unlink ' : 'Link ') + 'R' + (i + 1), open: () => this.setState({ reqOpen: k, reqMin: true }) }; };
      const rp = rpT ? {
        show: !s.reqMin, min: !!s.reqMin, target: rpT.name, kind: s.reqPick.kind === 'ms' ? 'Phase' : 'Task',
        linked: reqList.map(rpRow).filter((r) => r.on === 'true'), others: reqList.map(rpRow).filter((r) => r.on !== 'true'),
        noLinked: !rpSel.length, noOthers: rpSel.length >= reqList.length, none: !reqList.length,
        summary: rpSel.length + ' of ' + reqList.length + ' linked',
        close: () => this.setState({ reqPick: null, reqMin: false }), minimise: () => this.setState({ reqMin: true }), restore: () => this.setState({ reqMin: false, reqOpen: '' })
      } : null;
      const rdI = s.reqOpen ? parseInt(String(s.reqOpen).slice(1), 10) : -1, rdR = reqList[rdI];
      const rd = rdR ? {
        code: 'R' + (rdI + 1), req: rdR.req, pain: rdR.pain || 'Not captured', champ: rdR.champ || '—', eb: rdR.eb || '—',
        status: 'Approved in DRD',
        linked: pj.tasks.filter((t) => (t.reqs || []).indexOf(s.reqOpen) >= 0).map((t) => ({ name: t.name, sub: ((msById[t.ms] || {}).name || '') + ' · ' + stOf(t) }))
          .concat(pj.milestones.filter((m) => (m.reqs || []).indexOf(s.reqOpen) >= 0).map((m) => ({ name: m.name, sub: 'Phase · ' + (m.done ? 'Done' : 'Open') }))),
        fromPicker: !!rp, close: () => this.setState({ reqOpen: '' }), back: () => this.setState({ reqOpen: '', reqMin: false })
      } : null;
      if (rd) rd.noLinked = !rd.linked.length;
      const alloc = pj.tasks.reduce((a, t) => a + estN(t), 0), unalloc = planned - alloc;
      const msBudget = (m) => Math.round(planned * (Number(m.share) || 0));
      const expIn = daysTo(pj.dates.expires);
      const AMBER = '#8A4B00', RED = '#9E2A30', MUT = '#5E5A78';
      const selId = (s.pMs && msById[s.pMs]) ? s.pMs : (cur ? cur.id : (pj.milestones.length ? pj.milestones[pj.milestones.length - 1].id : ''));
      const selM = msById[selId] || { id: '', name: 'No phases yet', due: '', share: 0, done: false };
      const openTime = (msId, taskId, who, note) => !pjCanLog ? this.flash(pjLockMsg) : this.setState({ modal: 'time', timeForm: { date: todayIso, hours: '', ms: msId || '', task: taskId || '', role: who || '', note: note || '', svc: '' } });
      const ROLE_SLOTS = ['Engagement manager', 'Lead SA', 'Support SA', 'SE', 'Sales rep'];
      const slots = [];
      ROLE_SLOTS.forEach((r) => {
        const ms = pj.team.filter((m) => m.role === r);
        if (!ms.length) slots.push({ role: r, name: 'Not assigned', nameFg: '#6F6B89', initials: '+', avBg: '#F3F1FA', avFg: '#6F6B89', cta: 'Assign', actLabel: 'Assign ' + r, act: () => this.openMember('project', r) });
        ms.forEach((m) => slots.push({ role: r, name: m.name, nameFg: '#14112E', initials: initials(m.name), avBg: '#EEEAFE', avFg: '#4B32B8', cta: 'Change', actLabel: 'Change ' + r, act: () => this.openMember('project', r) }));
      });
      pj.team.filter((m) => ROLE_SLOTS.indexOf(m.role) < 0).forEach((m) => slots.push({ role: m.role, name: m.name, nameFg: '#14112E', initials: initials(m.name), avBg: '#EEEAFE', avFg: '#4B32B8', cta: 'Remove', actLabel: 'Remove ' + m.name,
        act: () => updP((p) => { p.team = p.team.filter((y) => !(y.name === m.name && y.role === m.role)); }, m.name + ' removed from the project team') }));
      const champs = d.champions || [];
      const status = su.status === 'On hold' || su.status === 'Closed' ? su.status : p0n < p0t ? 'Onboarding' : cur ? cur.name : 'Closed out';
      const approved = d.drd.filter((r) => r.ok);
      pv = {
        ...chatBtn({ type: 'project', id: d.id }, d.company + ' project'),
        title: d.company + ' – ' + (String(su.name || '').trim() || d.name), company: d.company, companyLine: d.company + ' · ' + d.industry + ' · ' + d.tier + ' tier · ' + (su.billing || 'Time and materials'), strategic: d.strategic,
        pjm: (() => { const cLife = isAdmin || this.canAct(s, 'projectLifecycle'), pf = s.pjStart || {}, nd = pf.date || tdy0, dOk = !!nd;
          const addD = (iso, n) => { if (!iso) return iso; const t0 = new Date(iso + 'T00:00:00Z'); t0.setUTCDate(t0.getUTCDate() + n); return t0.toISOString().slice(0, 10); };
          const delta = pj.dates.start && nd ? Math.round((new Date(nd + 'T00:00:00Z') - new Date(pj.dates.start + 'T00:00:00Z')) / 86400000) : 0;
          const future = pjStarted && !pjClosed && pj.dates.start > tdy0;
          return { canStart: cLife && !pjStarted, canClose: cLife && pjStarted && !pjClosed, canReopen: cLife && pjClosed, showLog: !pjClosed,
            hasNote: pjClosed || !pjStarted || future, noteFg: pjClosed ? '#4A4766' : '#8A4B00',
            note: pjClosed ? 'Closed ' + fmtD(pj.closedAt) + ' · view only' : !pjStarted ? 'Not started yet · plan the work, then start the project' : 'Starts ' + fmtD(pj.dates.start) + ' · time logging opens then',
            startOn: s.modal === 'pjstart', closeOn: s.modal === 'pjclose', date: nd, setDate: (e) => { const v = e.target.value; this.setState({ pjStart: { date: v } }); },
            hasShift: !!delta, shiftNote: delta ? 'Phase dates, task due dates and the target end date move ' + Math.abs(delta) + (Math.abs(delta) === 1 ? ' day ' : ' days ') + (delta > 0 ? 'later' : 'earlier') + ' to match.' : '',
            startOff: !dOk, startB: B(dOk ? 'primary' : 'off'), startTxt: nd > tdy0 ? 'Schedule start' : 'Start project',
            openStart: () => this.setState({ modal: 'pjstart', pjStart: { date: tdy0 } }), openClose: () => this.setState({ modal: 'pjclose' }), cancel: () => this.setState({ modal: '' }),
            start: dOk ? () => { updPRaw((p) => { p.lifecycle = 'active'; p.startedAt = tdy0; if (delta) { p.dates.end = addD(p.dates.end, delta); p.dates.expires = addD(p.dates.expires, delta); p.milestones.forEach((m0) => { m0.due = addD(m0.due, delta); }); p.tasks.forEach((t0) => { if (t0.due) t0.due = addD(t0.due, delta); }); } p.dates.start = nd; }, nd > tdy0 ? 'Project scheduled to start ' + fmtD(nd) : 'Project started'); this.setState({ modal: '' }); } : noop,
            close: () => { updPRaw((p) => { p.lifecycle = 'closed'; p.closedAt = tdy0; }, 'Project closed. It is now view only.'); this.setState({ modal: '' }); },
            reopen: () => updPRaw((p) => { p.lifecycle = 'active'; p.closedAt = ''; }, 'Project reopened') }; })(),
        pid: pj.id, status: lifeOf(pj)[0], statusPill: lifeOf(pj)[1], phaseStatus: status, oldPill: su.status === 'On hold' ? P.amber : su.status === 'Closed' ? P.gray : p0n < p0t ? P.amber : cur ? P.violet : P.green,
        hasExpWarn: expIn !== null && expIn <= (Number(su.alertDays) || 30), expWarn: expIn === null ? '' : expIn < 0 ? 'Contract expired ' + rel(expIn) + '. No more work without a new contract.' : 'Contract expires ' + rel(expIn) + ' (' + fmtD(pj.dates.expires) + ')',
        expWarnFg: expIn !== null && expIn < 0 ? RED : AMBER,
        logTime: () => openTime(cur ? cur.id : '', ''),
        tabs: [['overview', 'Overview'], ['plan', 'Project plan'], ['requirements', 'Requirements ' + approved.length], ['time', 'Time log ' + pj.timelog.length], ['files', 'Files ' + (d.files || []).length]].concat(isAdmin ? [['financials', 'Financials'], ['setup', 'Setup']] : []).concat([['log', 'Change log']]).map(([k, label]) => ({
          label, go: () => this.setState({ ptab: k }), selected: ptab === k ? 'true' : 'false', bd: ptab === k ? accent : 'transparent', fg: ptab === k ? '#14112E' : '#5E5A78', fw: ptab === k ? '650' : '500'
        })),
        tabLog: ptab === 'log', tabOverview: ptab === 'overview', tabPlan: ptab === 'plan', tabReqs: ptab === 'requirements', tabTime: ptab === 'time', tabFiles: ptab === 'files', tabFin: ptab === 'financials', tabSetup: ptab === 'setup',
        stats: [
          { label: 'Total hours', value: planned + ' h', note: su.hoursBudget !== undefined && su.hoursBudget !== '' ? 'set by an admin in Setup' : 'from the accepted quote', noteFg: MUT },
          { label: 'Actual time logged', value: used + ' h', note: planned ? Math.round(used / planned * 100) + '% of total hours' : '', noteFg: planned && used > planned * 0.9 ? AMBER : MUT },
          { label: 'Hours remaining', value: remaining + ' h', note: remaining < 0 ? 'over budget' : 'left to deliver', noteFg: remaining < 0 ? RED : MUT },
          { label: 'Allocated to tasks', value: alloc + ' h', note: unalloc >= 0 ? unalloc + ' h unallocated' : (-unalloc) + ' h over-allocated', noteFg: unalloc < 0 ? RED : unalloc > 0 ? AMBER : '#1B6B35' },
          { label: 'Billed rate', value: money(blended), note: hourly.length > 1 ? 'blended across ' + hourly.length + ' roles' : 'from the deal quote', noteFg: MUT }
        ],
        dates: [
          { id: id + '-es', setupId: id + '-su-es', label: 'Engagement start', value: pjStarted ? pj.dates.start : '', note: pjStarted ? (pj.dates.start > tdy0 ? 'starts ' + fmtD(pj.dates.start) : 'hours start counting') : 'set when the project starts', noteFg: MUT, off: !cPDates, set: !cPDates ? noop : (e) => { const v = e.target.value; updP((p) => { p.dates.start = v; }); } },
          { id: id + '-ee', setupId: id + '-su-ee', label: 'Target end date', value: pj.dates.end, note: daysTo(pj.dates.end) === null ? '' : rel(daysTo(pj.dates.end)), noteFg: MUT, off: !cPDates, set: !cPDates ? noop : (e) => { const v = e.target.value; updP((p) => { p.dates.end = v; }); } },
          { id: id + '-ce', setupId: id + '-su-ce', label: 'Contract expires', value: pj.dates.expires, note: expIn === null ? 'required' : expIn < 0 ? 'expired' : rel(expIn), noteFg: expIn === null || expIn <= 30 ? (expIn !== null && expIn < 0 ? RED : AMBER) : MUT, off: !cPDates, set: !cPDates ? noop : (e) => { const v = e.target.value; updP((p) => { p.dates.expires = v; }); } }
        ],
        msSummary: (cur ? 'Current: ' + cur.name + ' · due ' + fmtD(cur.due) : 'All phases done') + ' · read-only here. Edit dates and tasks in the project plan.',
        openPlan: () => this.setState({ ptab: 'plan' }),
        phases: pj.milestones.map((m) => {
          const isCur = cur && m.id === cur.id, late = !m.done && m.due && daysTo(m.due) !== null && daysTo(m.due) < 0;
          const ts = pj.tasks.filter((t) => t.ms === m.id), u = usedOn(m.id), b = msBudget(m);
          return { name: m.name, due: m.due ? fmtD(m.due) : 'No date', dot: m.done ? '#2F8F5B' : late ? RED : isCur ? accent : '#CFCAE3',
            status: m.done ? 'Done' : late ? 'Overdue' : isCur ? 'In progress' : 'Upcoming', statusFg: m.done ? '#1B6B35' : late ? RED : isCur ? '#4B32B8' : MUT,
            hours: b ? u + ' / ' + b + ' h' : u + ' h', hoursFg: b && u > b ? RED : '#2E2A4D', tasks: ts.filter((t) => t.done).length + ' / ' + ts.length,
            ...(() => { const ks = ts.filter((t) => t.key), kOpen = ks.length && !(s.keyColl || {})[m.id];
              return { hasKeys: !!ks.length, noKeys: !ks.length, keyOpen: !!kOpen, keyExp: kOpen ? 'true' : 'false', keyRot: kOpen ? '90deg' : '0deg',
                keyCount: ks.length, keyToggleA: (kOpen ? 'Hide' : 'Show') + ' key milestones in ' + m.name,
                toggleKeys: () => this.setState((st) => ({ keyColl: { ...(st.keyColl || {}), [m.id]: !!kOpen } })),
                keys: ks.map((t) => ({ name: t.name, due: t.due ? fmtD(t.due) : (m.due ? fmtD(m.due) : 'No date'), status: stOf(t), bg: stStyle(t).bg === '#FFFFFF' ? '#F3F1FA' : stStyle(t).bg, fg: stStyle(t).fg })) }; })() };
        }),
        ms: pj.milestones.map((m) => {
          const isCur = cur && m.id === cur.id, sel = m.id === selId;
          return { name: m.name, meta: (m.done ? 'Done · ' : isCur ? 'Current · ' : '') + fmtD(m.due), selected: sel ? 'true' : 'false',
            bd: sel ? accent : '#E4E1F0', bg: sel ? '#F3F0FE' : '#FFFFFF', dot: m.done ? '#2F8F5B' : isCur ? accent : '#CFCAE3', select: () => this.setState({ pMs: m.id }) };
        }),
        sel: {
          kicker: selM.done ? 'Done' : cur && selM.id === cur.id ? 'Current phase' : 'Upcoming',
          name: selM.name, due: selM.due || '',
          hoursText: (selM.share ? usedOn(selM.id) + ' of ' + Math.round(planned * selM.share) + ' h logged' : usedOn(selM.id) + ' h logged') + ' · ' + pj.tasks.filter((t) => t.ms === selM.id && t.done).length + ' of ' + pj.tasks.filter((t) => t.ms === selM.id).length + ' tasks done',
          setDue: (e) => { const v = e.target.value; updP((p) => { const m = p.milestones.find((y) => y.id === selM.id); if (m) m.due = v; }); },
          doneCta: selM.done ? 'Reopen' : 'Mark done',
          toggleDone: () => updP((p) => { const m = p.milestones.find((y) => y.id === selM.id); if (m) m.done = !m.done; }, selM.done ? selM.name + ' reopened' : selM.name + ' marked done'),
          logTime: () => openTime(selM.id, ''),
          tasks: pj.tasks.filter((t) => t.ms === selM.id).map((t) => ({ id: id + '-' + t.id, name: t.name, done: t.done, fg: t.done ? '#6F6B89' : '#14112E', deco: t.done ? 'line-through' : 'none', logged: usedTask(t.id) ? usedTask(t.id) + ' h' : '',
            toggle: () => TP('e')((p) => { const y = p.tasks.find((u) => u.id === t.id); if (y) y.done = !y.done; }) })),
          noTasks: !pj.tasks.some((t) => t.ms === selM.id)
        },
        planSummary: pj.milestones.length + ' phases · ' + pj.tasks.length + ' tasks · ' + pj.tasks.filter((t) => t.done).length + ' done. Expand a phase to see and edit its tasks.',
        alloc: [
          { k: 'Total hours', v: planned + ' h', fg: '#14112E', note: su.hoursBudget !== undefined && su.hoursBudget !== '' ? 'Set by an admin in Setup' : 'Accepted quote: ' + (hourly.map((l) => qtyOf(l) + ' h ' + l.role).join(' + ') || 'no hourly lines') },
          { k: 'Allocated to tasks', v: alloc + ' h' + (planned ? ' · ' + Math.round(alloc / planned * 100) + '%' : ''), fg: '#14112E', note: 'Sum of estimated hours on the tasks below' },
          { k: unalloc >= 0 ? 'Unallocated' : 'Over-allocated', v: Math.abs(unalloc) + ' h', fg: unalloc < 0 ? RED : unalloc > 0 ? AMBER : '#1B6B35', note: 'Budget minus allocated' },
          { k: 'Actual time logged', v: used + ' h', fg: '#14112E', note: 'Sum of hours in the Time log' },
          { k: 'Remaining hours', v: (planned - used) + ' h', fg: planned - used < 0 ? RED : '#14112E', note: planned - used < 0 ? 'Over the total hours' : 'Total hours minus time logged' }
        ],
        allocNote: unalloc > 0 ? unalloc + ' of the total hours are not planned into any task yet. Add estimates to tasks below.' : unalloc < 0 ? 'Task estimates add up to more than the budget. Trim estimates or raise the budget in Setup.' : 'All of the total hours are planned into tasks.',
        rp: rp || { linked: [], others: [] }, hasRp: !!rp, rpShow: !!rp && !s.reqMin, rpMin: !!rp && !!s.reqMin,
        rd: rd || { linked: [] }, hasRd: !!rd,
        keyHint: isAdmin ? 'Open a task to mark it as a key milestone. Key milestones show under their phase on the Overview.' : 'The most important tasks. They show under their phase on the Overview.',
        statusOpts: SET.taskStatuses.map((u) => ({ v: u.label, label: u.label })), typeOpts: ['Task', 'Meeting', 'Call', 'Email', 'Note', 'Next step'].map((v) => ({ v, label: v })),
        reqOpts: [{ v: '', label: 'No requirement' }].concat(reqList.map((r, i) => ({ v: 'r' + i, label: 'R' + (i + 1) + ' · ' + r.req }))),
        keyItems: pj.tasks.filter((t) => t.key).map((t) => ({ name: t.name, ms: (msById[t.ms] || {}).name || '', due: t.due ? fmtD(t.due) : (msById[t.ms] && msById[t.ms].due ? fmtD(msById[t.ms].due) : 'No date'), status: stOf(t), bg: stStyle(t).bg === '#FFFFFF' ? '#F3F1FA' : stStyle(t).bg, fg: stStyle(t).fg })),
        hasKey: pj.tasks.some((t) => t.key),
        upcoming: pj.tasks.filter((t) => !t.done).slice().sort((a1, b1) => String(a1.due || (msById[a1.ms] || {}).due || '9999').localeCompare(String(b1.due || (msById[b1.ms] || {}).due || '9999'))).slice(0, 6).map((t) => {
          const due = t.due || (msById[t.ms] || {}).due || ''; const late = due && daysTo(due) !== null && daysTo(due) < 0;
          return { name: t.name, ms: (msById[t.ms] || {}).name || '—', owner: t.owner || 'Unassigned', ownerFg: t.owner ? '#14112E' : '#B4530B', due: due ? fmtD(due) : 'No date', dueFg: late ? RED : '#2E2A4D', status: stOf(t), bg: stStyle(t).bg === '#FFFFFF' ? '#F3F1FA' : stStyle(t).bg, fg: stStyle(t).fg }; }),
        upcomingEmpty: !pj.tasks.some((t) => !t.done),
        ownerOpts: [{ v: '', label: 'Unassigned' }].concat(pj.team.filter((m, i, arr) => arr.findIndex((y) => y.name === m.name) === i).map((m) => ({ v: m.name, label: m.name }))),
        plan: pj.milestones.map((m) => {
          const ts = pj.tasks.filter((t) => t.ms === m.id), isCur = cur && m.id === cur.id, nt = (s.planNew || {})[m.id] || '';
          const mOpen = !!(s.planOpen || {})[m.id];
          return {
            ...reqBtn('ms', m.id, m.reqs || [], m.name),
            open: mOpen, exp: mOpen ? 'true' : 'false', rot: mOpen ? '90deg' : '0deg', hdrBd: mOpen ? '#EEECF5' : 'transparent', toggleLabel: (mOpen ? 'Collapse ' : 'Expand ') + m.name,
            toggle: () => this.setState((st) => ({ planOpen: { ...(st.planOpen || {}), [m.id]: !mOpen } })),
            name: m.name, due: m.due || '', dot: m.done ? '#2F8F5B' : isCur ? accent : '#CFCAE3',
            nameLabel: 'Phase name', dueLabel: 'Target date for ' + m.name, removeLabel: 'Delete phase ' + m.name, newLabel: 'New task in ' + m.name,
            meta: ts.filter((t) => t.done).length + ' of ' + ts.length + ' tasks · ' + ts.reduce((a, t) => a + estN(t), 0) + ' h est',
            doneCta: m.done ? 'Reopen' : 'Mark done',
            setName: (e) => { const v = e.target.value; updP((p) => { const y = p.milestones.find((u) => u.id === m.id); if (y) y.name = v; }); },
            setDue: (e) => { const v = e.target.value; updP((p) => { const y = p.milestones.find((u) => u.id === m.id); if (y) y.due = v; }); },
            toggleDone: () => updP((p) => { const y = p.milestones.find((u) => u.id === m.id); if (y) y.done = !y.done; }, m.done ? m.name + ' reopened' : m.name + ' marked done'),
            remove: () => updP((p) => { p.milestones = p.milestones.filter((u) => u.id !== m.id); p.tasks = p.tasks.filter((t) => t.ms !== m.id); }, m.name + ' deleted with its tasks'),
            noTasks: !ts.length, newTask: nt, addOff: !nt.trim(), addB: B(nt.trim() ? 'secondary' : 'off'),
            setNewTask: (e) => { const v = e.target.value; this.setState((st) => ({ planNew: { ...(st.planNew || {}), [m.id]: v } })); },
            addTask: cTask && nt.trim() ? () => { const nm = String(((this.state.planNew || {})[m.id]) || '').trim(); TP('c')((p) => { p.tasks.push({ id: 't' + Date.now(), ms: m.id, name: nm, type: ((this.state.planNewType || {})[m.id]) || 'Task', done: false, owner: '', due: '' }); }, (((this.state.planNewType || {})[m.id]) || 'Task') + ' added to ' + m.name); this.setState((st) => ({ planNew: { ...(st.planNew || {}), [m.id]: '' } })); } : noop,
            newType: ((s.planNewType || {})[m.id]) || 'Task', setNewType: (e) => { const v = e.target.value; this.setState((st) => ({ planNewType: { ...(st.planNewType || {}), [m.id]: v } })); },
            tasks: ts.map((t) => ({
              id: t.id, phase: m.name, open: () => this.setState({ taskOpen: t.id, reqOpen: '' }), openA: 'Open task details: ' + t.name, rowBg: s.taskOpen === t.id ? '#F8F6FF' : 'transparent',
              hasReqs: (t.reqs || []).length > 0, hasChat: CHAT.some((p) => p.on.type === 'task' && p.on.deal === d.id && p.on.id === t.id),
              reqItems: (t.reqs || []).map((k) => ({ label: reqName(k), open: () => this.setState({ reqOpen: k }) })), noReqItems: !(t.reqs || []).length,
              desc: t.desc || '', setDesc: (e) => { const v = e.target.value; TP('e')((p) => { const y = p.tasks.find((u) => u.id === t.id); if (y) y.desc = v; }); },
              name: t.name, done: t.done, owner: t.owner || '', due: t.due || '', fg: t.done ? '#6F6B89' : '#14112E', deco: t.done ? 'line-through' : 'none',
              status: stOf(t), statusLabel: 'Status of ' + t.name, setStatus: (e) => { const v = e.target.value; TP('e')((p) => { const y = p.tasks.find((u) => u.id === t.id); if (y) { y.status = v; y.done = doneStatus(v); } }); },
              statusBg: stStyle(t).bg, statusFg: stStyle(t).fg,
              isKey: !!t.key, keyFg: t.key ? '#B4530B' : '#6F6B89', keyBg: t.key ? '#FDF1E6' : '#FFFFFF', keyBd: t.key ? '#F2C9A4' : '#CFCAE3', keyLine: t.key ? 'solid' : 'dashed',
              keyGlyph: t.key ? '◆' : '◇', keyText: t.key ? 'Key milestone' : 'Mark key', keyTip: t.key ? 'Key milestone: shown under its phase on the Overview. Click to remove.' : 'Mark as a key milestone so it shows under its phase on the Overview', keyOn: t.key ? 'true' : 'false', keyLabel: (t.key ? 'Remove key milestone: ' : 'Mark as key milestone: ') + t.name, canKey: isAdmin,
              toggleKey: isAdmin ? () => TP('e')((p) => { const y = p.tasks.find((u) => u.id === t.id); if (y) y.key = !y.key; }, t.key ? t.name + ' is no longer a key milestone' : t.name + ' marked as a key milestone') : noop,
              ...reqBtn('task', t.id, t.reqs || [], t.name), ...chatBtn({ type: 'task', id: t.id, deal: d.id }, t.name),
              req: t.req || '', reqLabel: 'Requirement for ' + t.name, setReq: (e) => { const v = e.target.value; TP('e')((p) => { const y = p.tasks.find((u) => u.id === t.id); if (y) y.req = v; }); },
              logged: estN(t) ? usedTask(t.id) + ' / ' + estN(t) + ' h' : usedTask(t.id) ? usedTask(t.id) + ' h' : '—', loggedFg: estN(t) && usedTask(t.id) > estN(t) ? RED : '#5E5A78',
              logTime: () => openTime(m.id, t.id, t.owner || '', 'Work on: ' + t.name), logLabel: 'Log time on ' + t.name,
              est: estN(t) ? String(estN(t)) : '', estLabel: 'Estimated hours for ' + t.name,
              setEst: (e) => { const v = Math.max(0, Math.min(999, parseFloat(e.target.value) || 0)); TP('e')((p) => { const y = p.tasks.find((u) => u.id === t.id); if (y) y.est = v; }); },
              doneLabel: 'Done: ' + t.name, nameLabel: 'Task name', ownerLabel: 'Assignee of ' + t.name, dueLabel: 'Due date for ' + t.name, removeLabel: 'Delete task ' + t.name,
              toggle: () => TP('e')((p) => { const y = p.tasks.find((u) => u.id === t.id); if (y) y.done = !y.done; }),
              setName: (e) => { const v = e.target.value; TP('e')((p) => { const y = p.tasks.find((u) => u.id === t.id); if (y) y.name = v; }); },
              ...(() => { const ty = t.type || 'Task', pc = ({ Task: { bg: '#EEEAFE', fg: '#4B32B8' }, Meeting: { bg: '#E7E2FB', fg: '#3E27A8' }, Call: { bg: '#E3EEFB', fg: '#1F4E8C' }, Email: { bg: '#EEEDF4', fg: '#4A4766' }, Note: { bg: '#EEEDF4', fg: '#4A4766' }, 'Next step': { bg: '#FDF0DC', fg: '#8A4B00' } })[ty] || { bg: '#EEEDF4', fg: '#4A4766' }; return { type: ty, typeBg: pc.bg, typeFg: pc.fg, typeA: 'Type of ' + t.name, setType: (e) => { const v = e.target.value; TP('e')((p) => { const y = p.tasks.find((u) => u.id === t.id); if (y) y.type = v; }, t.name + ' is now a ' + v.toLowerCase()); } }; })(),
              setOwner: (e) => { const v = e.target.value; TP('e')((p) => { const y = p.tasks.find((u) => u.id === t.id); if (y) y.owner = v; }); },
              setDue: (e) => { const v = e.target.value; TP('e')((p) => { const y = p.tasks.find((u) => u.id === t.id); if (y) y.due = v; }); },
              remove: () => TP('d')((p) => { p.tasks = p.tasks.filter((u) => u.id !== t.id); }, 'Task deleted')
            }))
          };
        }),
        newMsName: s.newMsName || '', newMsDue: s.newMsDue || '', addMsOff: !String(s.newMsName || '').trim(), addMsB: B(String(s.newMsName || '').trim() ? 'primary' : 'off'),
        addMs: String(s.newMsName || '').trim() ? () => { const nm = String(this.state.newMsName || '').trim(), due = this.state.newMsDue || ''; const nid = 'm' + Date.now(); updP((p) => { p.milestones.push({ id: nid, name: nm, share: 0, due, done: false }); if (due) p.milestones.sort((a, b) => (a.due || '9999').localeCompare(b.due || '9999')); }, nm + ' added to the plan'); this.setState((st) => ({ newMsName: '', newMsDue: '', planOpen: { ...(st.planOpen || {}), [nid]: true } })); } : noop,
        newTask: s.newTask || '', addTaskOff: !String(s.newTask || '').trim(), addTaskB: B(String(s.newTask || '').trim() ? 'secondary' : 'off'),
        addTask: cTask && String(s.newTask || '').trim() ? () => { const nm = String(this.state.newTask || '').trim(); TP('c')((p) => { p.tasks.push({ id: 't' + Date.now(), ms: selM.id, name: nm, done: false }); }, 'Task added to ' + selM.name); this.setState({ newTask: '' }); } : noop,
        su: (() => {
          const setSu = (k) => (e) => { const v = e.target.value; updP((p) => { p.setup = { ...(p.setup || {}), [k]: v }; }); };
          const ni = String(s.newCheck || '').trim();
          return {
            name: su.name || '', namePh: d.name, status: su.status || 'Active', billing: su.billing || 'Time and materials', alert: String(su.alertDays || 30),
            hours: su.hoursBudget !== undefined ? String(su.hoursBudget) : '', hoursPh: quoteHours + ' (from the quote)', cost: su.costRate !== undefined ? String(su.costRate) : '', costPh: String(CR0) + ' (from the rate card)',
            setName: setSu('name'), setStatus: setSu('status'), setBilling: setSu('billing'), setAlert: setSu('alertDays'), setHours: setSu('hoursBudget'), setCost: setSu('costRate'),
            rates: hourly.map((l) => ({ role: l.role, quote: money(rateOf(l)) + ' / h', value: ovr(l) !== null ? String(ovr(l)) : '', ph: String(rateOf(l)), label: 'Billed rate for ' + l.role,
              set: (e) => { const v = e.target.value; updP((p) => { p.setup = { ...(p.setup || {}), rates: { ...((p.setup || {}).rates || {}), [l.role]: v } }; }); } })),
            items: pj.checkLabels.map((l0, i) => ({ ...(() => { const N = pj.checkLabels.length, mv = (from, to) => { if (from < 1 || to < 1 || from >= N || to >= N || from === to) return; updP((p) => { const [lb] = p.checkLabels.splice(from, 1); const [ck] = p.checks.splice(from, 1); p.checkLabels.splice(to, 0, lb); p.checks.splice(to, 0, ck); }, 'Checklist reordered'); };
              return { canMove: i > 0, drag: i > 0 ? 'true' : 'false', grabCur: i > 0 ? 'grab' : 'default', upOff: i <= 1, downOff: i === 0 || i >= N - 1, upA: 'Move checklist item ' + (i + 1) + ' up', downA: 'Move checklist item ' + (i + 1) + ' down',
                up: () => mv(i, i - 1), down: () => mv(i, i + 1), dropBg: s.ckDragOver === 'p' + i ? '#F3F0FE' : 'transparent',
                dragStart: (e) => { this._ckDrag = i; try { e.dataTransfer.effectAllowed = 'move'; e.dataTransfer.setData('text/plain', String(i)); } catch (er) {} },
                dragOver: (e) => { if (i > 0 && this._ckDrag !== undefined) { e.preventDefault(); if (this.state.ckDragOver !== 'p' + i) this.setState({ ckDragOver: 'p' + i }); } },
                drop: (e) => { e.preventDefault(); const f = this._ckDrag; this._ckDrag = undefined; this.setState({ ckDragOver: '' }); if (f !== undefined) mv(f, i); },
                dragEnd: () => { this._ckDrag = undefined; this.setState({ ckDragOver: '' }); } }; })(), n: String(i + 1), text: i === 0 ? 'Promote approved DRD items' : l0, locked: i === 0, bg: i === 0 ? '#F6F5FB' : '#FFFFFF', canRemove: i > 0,
              label: 'Checklist item ' + (i + 1), removeLabel: 'Remove checklist item ' + (i + 1),
              set: (e) => { const v = e.target.value; updP((p) => { p.checkLabels[i] = v; }); },
              remove: () => updP((p) => { p.checkLabels.splice(i, 1); p.checks.splice(i, 1); }, 'Checklist item removed') })),
            newItem: s.newCheck || '', addOff: !ni, addB: B(ni ? 'secondary' : 'off'),
            addItem: ni ? () => { const t = String(this.state.newCheck || '').trim(); updP((p) => { p.checkLabels.push(t); p.checks.push(false); }, 'Checklist item added'); this.setState({ newCheck: '' }); } : noop
          };
        })(),
        p0Open: !(s.secs && s.secs.p0 === false), p0Exp: !(s.secs && s.secs.p0 === false) ? 'true' : 'false', p0Rot: !(s.secs && s.secs.p0 === false) ? '90deg' : '0deg',
        p0Toggle: () => this.setState((st) => ({ secs: { ...(st.secs || {}), p0: st.secs && st.secs.p0 === false } })),
        p0Text: p0n + ' of ' + p0t + ' done',
        checks: pj.checkLabels.map((l0, i) => (i === 0 ? 'Promote approved DRD items (' + approved.length + ')' : l0)).map((label, i) => ({
          label, id: id + '-p0-' + i, on: !!pj.checks[i], hint: i === 0 ? 'moves them to Requirements' : i === 3 ? 'kickoff is part of the Setup and kickoff phase' : '',
          toggle: () => updP((p) => { p.checks[i] = !p.checks[i]; })
        })),
        ratesNote: 'Carried over from the accepted quote. Logged hours, start and completion come from time logged against each service line.',
        rates: allLines.map((l, i) => { const g = lineProg(l, i), each = l.unit === 'each', rem = g.total - g.used;
          return { ...psOf(l), role: l.role + (each ? ' (fixed fee)' : ''), rate: each ? money(rateOf(l)) : money(rOf(l)) + ' / h', planned: each ? qtyOf(l) + ' ×' : g.total + ' h', used: g.used + ' h', remaining: each ? '—' : rem + ' h', remFg: !each && rem < 0 ? RED : '#14112E',
            started: g.start ? fmtD(g.start) : '—', completed: g.done ? fmtD(g.done) : g.start ? 'In progress' : '—', stFg: g.start ? '#2E2A4D' : '#8C88A6', cpFg: g.done ? '#1B6B35' : '#8C88A6' }; }),
        noRates: !(d.lines || []).length,
        reqNote: pj.checks[0] ? approved.length + ' approved DRD items promoted to this project.' : approved.length + ' approved DRD items are waiting to be promoted.',
        reqs: approved.map((r, i) => { const lt = pj.tasks.filter((t) => (t.reqs || []).indexOf('r' + i) >= 0).concat(pj.milestones.filter((m) => (m.reqs || []).indexOf('r' + i) >= 0).map((m) => ({ name: m.name + ' (phase)', status: m.done ? 'Done' : 'Open', done: m.done, isMs: true }))); return { n: 'R' + (i + 1), req: r.req, pain: r.pain, status: pj.checks[0] ? 'In project' : 'Waiting', pill: pj.checks[0] ? P.green : P.amber,
          open: () => this.setState({ reqOpen: 'r' + i }),
          tasks: lt.length ? lt.map((t) => t.isMs ? t.name : t.name + ' (' + stOf(t) + ')').join(', ') : 'No tasks linked yet', tasksFg: lt.length ? '#2E2A4D' : '#B4530B' }; }),
        reqWaiting: !pj.checks[0] && approved.length > 0,
        promote: () => updP((p) => { p.checks[0] = true; }, approved.length + ' requirements promoted to the project'),
        logSummary: used + ' h logged · ' + money(billed) + ' billable' + (planned ? ' · ' + remaining + ' h remaining' : ''),
        log: pj.timelog.slice().sort((a, b) => String(b.date).localeCompare(String(a.date))).map((e) => ({
          date: fmtD(e.date), by: e.by, hours: hrsN(e) + ' h', svc: (() => { const k = lineOfEntry(e), i = allLines.findIndex((l, j) => keyOf(l, j) === k); return i >= 0 ? svcName(allLines[i]) + ' · ' + allLines[i].role : '—'; })(), ms: e.ms && msById[e.ms] ? msById[e.ms].name : '—', task: e.task && taskById[e.task] ? taskById[e.task].name : '—',
          canRemove: isAdmin || e.by === ME,
          billed: (e.role || '—') + ' · ' + money(Number(e.rate) || 0) + '/h' + (e.billable === false ? ' · not billable (outside engagement dates)' : ''), removeLabel: 'Delete time entry from ' + fmtD(e.date),
          remove: () => (cLogD && !pjClosed ? updPRaw : () => this.flash(pjClosed ? pjLockMsg : 'Your role can\'t delete time entries.'))((p) => { p.timelog = p.timelog.filter((y) => y.id !== e.id); }, 'Time entry deleted')
        })),
        logEmpty: !pj.timelog.length,
        slots, teamRaw: pj.team, addMember: () => this.openMember('project', ''),
        companyFields: [{ k: 'Industry', v: d.industry }, { k: 'Company size', v: d.size }, { k: 'Customer tier', v: d.tier }, { k: 'Strategic', v: d.strategic ? 'Yes' : 'No' }],
        openCompany: () => this.openCompany(d.company),
        contacts: (d.contacts || []).map((c) => ({ name: c.name, email: c.email || 'No email yet', phone: c.phone || 'No phone yet',
          chips: [].concat(champs.indexOf(c.name) >= 0 ? [{ label: 'Champion', bg: '#E2F4E6', fg: '#1B6B35' }] : []).concat(d.eb === c.name ? [{ label: 'Economic buyer', bg: '#EEEAFE', fg: '#4B32B8' }] : []) })),
        addContact: () => this.openContact(false),
        fin: (() => {
          const contractRev = hourlyRev + fixed.reduce((a, l) => a + lineAmt(l), 0);
          const contractCost = planned * CR, contractProfit = contractRev - contractCost;
          const liveCost = used * CR, liveProfit = billed - liveCost;
          const pct = (n, dd) => dd ? Math.round(n / dd * 100) + '%' : '—';
          const row = (k, v, strong, fg) => ({ k, v, fw: strong ? '700' : '500', fg: fg || '#14112E' });
          return {
            tiles: [
              { k: 'Billed so far', v: money(billed), note: used + ' h logged × their rates', fg: '#14112E' },
              { k: 'Left to bill', v: money(Math.max(0, contractRev - billed)), note: pct(billed, contractRev) + ' of the contract billed', fg: '#14112E' },
              { k: 'Live margin', v: pct(liveProfit, billed), note: 'contract margin ' + pct(contractProfit, contractRev), fg: billed && liveProfit / billed < contractProfit / Math.max(1, contractRev) - 0.05 ? AMBER : '#1B6B35' }
            ],
            pls: [
              { title: 'Contract P&L', sub: 'What the accepted quote promised', rows: [row('Revenue', money(contractRev)), row('Cost (' + planned + ' h × ' + money(CR) + ')', '−' + money(contractCost), false, MUT), row('Profit', money(contractProfit), true, '#1B6B35'), row('Margin', pct(contractProfit, contractRev))] },
              { title: 'Live P&L', sub: 'Revenue billed and cost incurred so far', rows: [row('Revenue billed', money(billed)), row('Cost incurred (' + used + ' h × ' + money(CR) + ')', '−' + money(liveCost), false, MUT), row('Profit so far', money(liveProfit), true, liveProfit < 0 ? RED : '#1B6B35'), row('Margin', pct(liveProfit, billed))] }
            ],
            note: 'Time-and-materials revenue counts as earned when the hours are logged. Cost uses ' + money(CR) + ' per hour (rate card, or the Setup override).' + (px.arrAnnual ? ' Licenses (' + money(px.arrAnnual) + '/yr ARR) are billed separately and not part of this P&L.' : '')
          };
        })()
      };
      const tdItem = s.taskOpen ? [].concat(...pv.plan.map((m) => m.tasks)).find((t) => t.id === s.taskOpen) : null;
      if (tdItem) { pv.td = { ...tdItem, on: { type: 'task', id: tdItem.id, deal: d.id }, chat: { posts: [], b: B('off') }, close: () => this.setState({ taskOpen: '' }),
        del: () => { tdItem.remove(); this.setState({ taskOpen: '' }); } }; pv.hasTd = true; }
      const tf = s.timeForm || {};
      const tMs = tf.ms || '', tTask = tf.task || '';
      const hoursN = parseFloat(tf.hours) || 0;
      const svcLines = (d.lines || []).map((l, i) => ({ l, i, k: l.id || ('idx' + i) }));
      const tSvc = tf.svc && svcLines.some((o) => o.k === tf.svc) ? tf.svc : svcLines.length === 1 ? svcLines[0].k : '';
      const tSvcO = svcLines.find((o) => o.k === tSvc) || null;
      const tOk = hoursN > 0 && !!tSvc && (tMs || tTask) && (isAdmin || (cLog && pj.team.some((m) => m.name === ME)));
      const members = pj.team.filter((m, i, arr) => arr.findIndex((y) => y.name === m.name) === i);
      const rateFor = (name) => {
        const person = this.PEOPLE.find((pp) => pp.name === name);
        const line = person ? hourly.find((l) => l.role === person.role) : null;
        return line ? { role: line.role, rate: rOf(line) } : { role: 'Blended rate', rate: blended };
      };
      const onTeam = members.some((m) => m.name === ME);
      const memberOpts = isAdmin ? (members.length ? members : [{ name: ME, role: 'Admin' }]) : (onTeam ? members.filter((m) => m.name === ME) : [{ name: ME, role: meU.short }]);
      const tWho = isAdmin ? (tf.role && memberOpts.some((m) => m.name === tf.role) ? tf.role : (memberOpts.some((m) => m.name === ME) ? ME : memberOpts[0].name)) : ME;
      const tR = rateFor(tWho), tRole = tR.role, tRate = tR.rate;
      const tMsF = tMs || (tTask && taskById[tTask] ? taskById[tTask].ms : '');
      const scopes = [{ k: 'Project', used, budget: planned }];
      if (tSvcO && tSvcO.l.unit !== 'each') { const g = lineProg(tSvcO.l, tSvcO.i); scopes.push({ k: svcName(tSvcO.l) + ' · ' + tSvcO.l.role, used: g.used, budget: g.total }); }
      if (tMsF && msById[tMsF] && msBudget(msById[tMsF])) scopes.push({ k: msById[tMsF].name, used: usedOn(tMsF), budget: msBudget(msById[tMsF]) });
      if (tTask && taskById[tTask] && estN(taskById[tTask])) scopes.push({ k: taskById[tTask].name, used: usedTask(tTask), budget: estN(taskById[tTask]) });
      const tBudget = scopes.filter((c) => c.budget > 0).map((c) => {
        const left = c.budget - c.used, after = left - hoursN;
        return { total: c.budget + ' h', used: c.used + ' h', left: left >= 0 ? left + ' h' : (-left) + ' h over', leftFg: left < 0 ? RED : '#2E2A4D',
          after: !hoursN ? '—' : after >= 0 ? after + ' h' : (-after) + ' h over', k: c.k, v: (left >= 0 ? left + ' h remaining of ' + c.budget + ' h total' : 'already ' + (-left) + ' h over its ' + c.budget + ' h total') + (hoursN ? ' → ' + (after >= 0 ? after + ' h remaining' : (-after) + ' h over') : ''),
          fg: after < 0 ? RED : after <= c.budget * 0.1 ? AMBER : '#2E2A4D', ratio: (c.used + hoursN) / c.budget, over: Math.max(0, c.used + hoursN - c.budget), c };
      });
      const worst = tBudget.filter((r) => r.ratio > 0.9).sort((a, b) => b.ratio - a.ratio).slice(0, 1);
      const emName = (pj.team.find((m) => m.role === 'Engagement manager') || {}).name || 'an admin';
      const tDate = tf.date || todayIso, outWin = (pj.dates.start && tDate < pj.dates.start) || (pj.dates.end && tDate > pj.dates.end);
      const tWarns = hoursN ? worst.map((r) => {
        const pctOver = Math.round((r.ratio - 1) * 100);
        if (r.ratio <= 1) return { title: 'Close to budget.', text: r.k + ' will be at ' + Math.round(r.ratio * 100) + '% of its ' + r.c.budget + ' h.', bg: '#FDF8EC', bd: '#F1DFB5', fg: '#7A4A00' };
        if (r.ratio <= 1.2) return { title: 'Over budget.', text: r.k + ' goes ' + r.over + ' h over (' + pctOver + '%).', bg: '#FDF0DC', bd: '#EFC98C', fg: '#8A4B00' };
        return { title: 'Well over budget.', text: r.k + ' goes ' + r.over + ' h over (' + pctOver + '%). Let the engagement manager know.', bg: '#FBE4E5', bd: '#F0B9BD', fg: RED };
      }) : [];
      tv = {
        sub: d.company + ' – ' + d.name, date: tf.date || todayIso, hours: tf.hours || '', ms: tMs, svc: tSvc, svcBd: tSvc ? '#CFCAE3' : '#E8A13C', noSvc: !svcLines.length,
        svcOpts: [{ v: '', label: 'Choose a service line' }].concat(svcLines.map((o) => { const g = lineProg(o.l, o.i); return { v: o.k, label: svcName(o.l) + ' · ' + o.l.role + (o.l.unit === 'each' ? ' · fixed fee' : ' · ' + g.used + ' of ' + g.total + ' h') + (g.done ? ' · completed' : g.start ? '' : ' · not started') }; })),
        svcNote: !tSvcO ? 'Pick which service line from the quote this time is for.' : (() => { const g = lineProg(tSvcO.l, tSvcO.i), dt = tf.date || todayIso; return !g.start ? 'First time on this service line: it starts on ' + fmtD(dt) + '.' : dt < g.start ? 'This moves the start of this service line to ' + fmtD(dt) + '.' : 'Started ' + fmtD(g.start) + (g.done ? ' · completed ' + fmtD(g.done) : ''); })(), task: tTask, role: tWho, note: tf.note || '',
        msOpts: [{ v: '', label: 'No phase' }].concat(pj.milestones.map((m) => ({ v: m.id, label: m.name + (m.done ? ' (done)' : '') }))),
        taskOpts: [{ v: '', label: 'No task' }].concat(pj.tasks.filter((t) => !tMs || t.ms === tMs).map((t) => ({ v: t.id, label: t.name }))),
        whoLocked: !isAdmin, notOnTeam: !isAdmin && !onTeam,
        whoNote: isAdmin ? '' : onTeam ? '' : 'You are not on this project team, so you cannot log time here. Ask an admin to add you.',
        whoNoteFg: !isAdmin && !onTeam ? '#9E2A30' : '#5E5A78',
        roleOpts: memberOpts.map((m) => { const r = rateFor(m.name); return { v: m.name, label: m.name + ' · ' + m.role + ' · ' + r.role + ' ' + money(r.rate) + '/h' }; }),
        hint: !hoursN ? 'Enter the hours you worked.' : !tSvc ? 'Pick a service line.' : !(tMs || tTask) ? 'Pick a phase, a task, or both.' : tWho + ': ' + hoursN + ' h × ' + money(tRate) + ' (' + tRole + ') = ' + money(hoursN * tRate) + ' billable',
        hintFg: tOk ? '#1B6B35' : '#5E5A78',
        budget: (() => { const MUTF = '#8C88A6', row = (k, sub, tot, usd) => { const left = tot - usd, after = left - hoursN;
              return { k, sub, total: tot + ' h', used: usd + ' h', left: left >= 0 ? left + ' h' : (-left) + ' h over', leftFg: left < 0 ? RED : '#2E2A4D',
                after: !hoursN ? '—' : after >= 0 ? after + ' h' : (-after) + ' h over', fg: !hoursN ? MUTF : after < 0 ? RED : after <= tot * 0.1 ? AMBER : '#1B6B35', kFg: '#14112E' }; },
            empty = (k, sub) => ({ k, sub, total: '—', used: '—', left: '—', after: '—', leftFg: MUTF, fg: MUTF, kFg: MUTF });
            const g = tSvcO ? lineProg(tSvcO.l, tSvcO.i) : null, tk = tTask && taskById[tTask] ? taskById[tTask] : null;
            return [
              !tSvcO ? empty('Service line', 'Pick a service line above') : tSvcO.l.unit === 'each' ? empty('Service line', svcName(tSvcO.l) + ' · fixed fee, no hours budget') : row('Service line', svcName(tSvcO.l) + ' · ' + tSvcO.l.role, g.total, g.used),
              !tk ? empty('Task', 'No task picked') : !estN(tk) ? empty('Task', tk.name + ' · no estimate') : row('Task', tk.name + ' · estimated', estN(tk), usedTask(tTask)),
              row('Project pool', 'All service lines on this project', planned, used)
            ]; })(), hasBudget: true, warns: tWarns, hasWarn: tWarns.length > 0,
        warnFoot: (worst.length && worst[0].ratio > 1 && hoursN ? 'Saving notifies ' + emName + ' (engagement manager). ' : '') + 'Warnings never block logging.',
        outWin: !!outWin, outText: 'This date is outside the engagement window (' + fmtD(pj.dates.start) + ' to ' + fmtD(pj.dates.end) + '). The time is logged but not billable.',
        off: !tOk, b: B(tOk ? 'primary' : 'off'),
        save: tOk ? () => {
          const f = this.state.timeForm || {};
          const msFinal = f.ms || (f.task && taskById[f.task] ? taskById[f.task].ms : '');
          const dt = f.date || todayIso, billable = !((pj.dates.start && dt < pj.dates.start) || (pj.dates.end && dt > pj.dates.end));
          const esc = worst.length && worst[0].ratio > 1 ? { id: 'x' + Date.now(), date: todayIso, who: tWho, scope: worst[0].k, over: worst[0].over, pct: Math.round((worst[0].ratio - 1) * 100), to: emName, seen: false } : null;
          (cLog && pjCanLog ? updPRaw : () => this.flash(pjCanLog ? 'Your role can\'t log time.' : pjLockMsg))((p) => { p.timelog.push({ id: 'e' + Date.now(), date: dt, hours: parseFloat(f.hours) || 0, ms: msFinal, task: f.task || '', line: tSvc, role: tRole, rate: tRate, by: tWho, note: String(f.note || '').trim(), billable }); if (esc) p.escalations = (p.escalations || []).concat([esc]); },
            (parseFloat(f.hours) || 0) + ' h logged' + (msFinal && msById[msFinal] ? ' on ' + msById[msFinal].name : ''));
          this.setState({ modal: '' });
        } : noop
      };
    }

    const setForm = (form, k) => (e) => { const v = e.target.value; this.setState((st) => ({ [form]: { ...st[form], [k]: v } })); };
    const sf = s.seForm;
    const se = x ? {
      title: x.d.se ? 'Change the SE on ' + x.d.company : 'Choose an SE for ' + x.d.company,
      options: this.PEOPLE.filter((p) => p.role === 'Solutions engineer').map((p) => {
        const on = sf.pick === p.name, n = open.filter((y) => y.d.se === p.name).length, cur = x.d.se === p.name;
        return {
          name: p.name, initials: initials(p.name), load: (cur ? 'On this deal now · ' : '') + n + (n === 1 ? ' open deal' : ' open deals'),
          checked: on ? 'true' : 'false', bd: on ? accent : '#E4E1F0', ring: on ? accent : '#B8B3CE', bg: on ? '#F3F0FE' : '#FFFFFF', dot: on ? accent : 'transparent',
          pick: () => this.setState((st) => ({ seForm: { ...st.seForm, pick: p.name } }))
        };
      }),
      scope: sf.scope, note: sf.note,
      foot: 'The SE and ' + x.d.owner + ' (deal owner) are notified.',
      off: !sf.pick, b: B(sf.pick ? 'primary' : 'off'), cta: sf.pick ? 'Add ' + sf.pick + ' as SE' : 'Pick an SE',
      confirm: sf.pick ? () => {
        const f = this.state.seForm;
        this.updDeal(x.d.id, (z) => {
          z.se = f.pick; z.seRequested = true; z.seScope = f.scope; z.seNote = f.note;
          const cs = typeof z.stage === 'number' ? z.stage : ((z.quotes || []).some((u) => u.id === z.activeQ && u.status === 'Accepted') ? 2 : 0);
          z.stage = Math.max(cs, 1);
          return z;
        }, f.pick + ' is now the SE on ' + x.d.company + ' and has been notified');
        this.setState({ modal: '' });
      } : noop
    } : { options: [], confirm: noop, off: true, b: B('off') };

    const mf = s.memberForm;
    const mctx = mf.ctx === 'project' ? 'project' : 'deal';
    const taken = mctx === 'project' ? (pv.teamRaw || []).filter((m) => m.role === mf.role).map((m) => m.name) : dealNames;
    const mq = mf.q.trim().toLowerCase();
    const mOpts = this.PEOPLE.filter((p) => !(mctx === 'deal' && p.role === 'Solutions engineer'))
      .filter((p) => !mq || (p.name + ' ' + p.role).toLowerCase().indexOf(mq) >= 0)
      .map((p) => {
        const has = taken.indexOf(p.name) >= 0, on = mf.pick === p.name;
        return {
          name: p.name, role: p.role, initials: initials(p.name), hasTag: has, disabled: has, checked: on ? 'true' : 'false',
          bd: on ? accent : '#E4E1F0', bg: has ? '#F6F5FB' : on ? '#F3F0FE' : '#FFFFFF', fg: has ? '#5E5A78' : '#14112E', cur: has ? 'not-allowed' : 'pointer',
          pick: has ? noop : () => this.setState((st) => ({ memberForm: { ...st.memberForm, pick: p.name, role: st.memberForm.ctx === 'project' || st.memberForm.fixed ? st.memberForm.role : this.ROLES.indexOf(p.role) >= 0 ? p.role : st.memberForm.role } }))
        };
      });
    const mm = {
      title: mctx === 'project' ? (mf.fixed ? 'Assign ' + mf.role : 'Add to project team') : 'Add to deal team',
      sub: (x ? x.d.company + ' · ' : '') + 'Pick a person and their role on this ' + mctx + '.',
      showSeHint: mctx === 'deal' && !!x && !x.d.closed, toSe: x ? () => this.openSe(x.d.id) : noop,
      q: mf.q, options: mOpts, empty: mOpts.length === 0, role: mf.role, ctxLabel: mctx,
      off: !mf.pick, b: B(mf.pick ? 'primary' : 'off'), cta: mf.pick ? 'Add ' + mf.pick : 'Pick a person',
      confirm: mf.pick && x ? () => {
        const f = this.state.memberForm;
        const msg = f.pick + ' added to the ' + mctx + ' team as ' + f.role.toLowerCase() + '. The team is notified.';
        if (mctx === 'project') this.updDeal(x.d.id, (z) => { const p = this.projectFull(z); p.team = p.team.filter((m) => f.role === 'Support SA' ? !(m.role === f.role && m.name === f.pick) : m.role !== f.role).concat([{ name: f.pick, role: f.role }]); z.project = p; return z; }, msg);
        else this.updDeal(x.d.id, (z) => { z.team = (z.team || []).concat([{ name: f.pick, role: f.role }]); return z; }, msg);
        this.setState({ modal: '' });
      } : noop
    };


    const pickerOf = (form, pool, already, emptyBase) => {
      const f = s[form] || {}, q = String(f.q || '').trim().toLowerCase(), avail = pool.filter((p) => already.indexOf(p.name) < 0);
      const mode = f.mode || (avail.length ? 'existing' : 'new'), list = avail.filter((p) => !q || (p.name + ' ' + (p.email || '')).toLowerCase().indexOf(q) >= 0);
      const setF = (patch) => this.setState((st) => ({ [form]: { ...(st[form] || {}), ...patch } }));
      return { mode, picked: avail.find((p) => p.name === f.pick) || null,
        isExisting: mode === 'existing', isNew: mode === 'new', exOn: mode === 'existing' ? 'true' : 'false', newOn: mode === 'new' ? 'true' : 'false',
        exBg: mode === 'existing' ? '#FFFFFF' : 'transparent', newBg: mode === 'new' ? '#FFFFFF' : 'transparent',
        pickExisting: () => setF({ mode: 'existing' }), pickNew: () => setF({ mode: 'new' }), q: f.q || '', setQ: (e) => { const v = e.target.value; setF({ q: v }); },
        pool: list.map((p) => { const on = f.pick === p.name; return { name: p.name, sub: p.sub, sel: on ? 'true' : 'false', bg: on ? '#F3F0FE' : 'transparent', ring: on ? '#6A4FE0' : '#B8B3CE', dot: on ? '#6A4FE0' : 'transparent', pick: () => setF({ pick: p.name }) }; }),
        poolEmpty: !list.length, emptyText: avail.length ? 'No one matches that search.' : emptyBase };
    };
    const skPoolAll = [];
    D.deals.forEach((dd) => (dd.stakeholders || []).forEach((p) => { const ex = skPoolAll.find((u) => u.name === p.name); if (ex) ex.deals.push(dd.company); else skPoolAll.push({ name: p.name, email: p.email || '', role: p.role, deals: [dd.company] }); }));
    skPoolAll.forEach((p) => { p.sub = p.role + (p.email ? ' · ' + p.email : '') + ' · on ' + p.deals.length + (p.deals.length === 1 ? ' deal' : ' deals'); });
    const skPick = pickerOf('stakeForm', skPoolAll, x ? (x.d.stakeholders || []).map((p) => p.name) : [], 'No partner stakeholders tagged on other deals yet. Create a new one.');
    const kf = s.stakeForm;
    const kOk = !!kf.name.trim();
    const kNewOk = !!String(kf.name || '').trim(), kOk2 = skPick.mode === 'existing' ? !!skPick.picked : kNewOk;
    const sk = {
      ...skPick,
      sub: x ? x.d.company + ' · monday.com people working this deal with us' : '',
      name: kf.name, email: kf.email, role: kf.role, off: !kOk2, b: B(kOk2 ? 'primary' : 'off'),
      confirm: kOk2 && x ? () => {
        const f = this.state.stakeForm || {};
        const rec = skPick.mode === 'existing' ? { name: skPick.picked.name, email: skPick.picked.email, role: skPick.picked.role } : { name: String(f.name).trim(), email: String(f.email || '').trim(), role: f.role };
        this.updDeal(x.d.id, (z) => { z.stakeholders = (z.stakeholders || []).concat([rec]); return z; }, rec.name + ' tagged as ' + rec.role);
        this.setState({ modal: '' });
      } : noop
    };

    const cf = s.contactForm;
    const ctPool = [];
    if (x) {
      const addP = (name, email, phone, where) => { if (!name) return; const ex = ctPool.find((u) => u.name === name); if (ex) { ex.email = ex.email || email || ''; ex.phone = ex.phone || phone || ''; } else ctPool.push({ name, email: email || '', phone: phone || '', where }); };
      D.deals.filter((dd) => dd.company === x.d.company && dd.id !== x.d.id).forEach((dd) => (dd.contacts || []).forEach((c) => addP(c.name, c.email, c.phone, 'deal')));
      D.leads.filter((l) => l.company === x.d.company).forEach((l) => addP(l.contact, l.email, l.phone, 'lead'));
      ((D.companyInfo || {})[x.d.company] || {}).contacts && D.companyInfo[x.d.company].contacts.forEach((c) => addP(c.name, c.email, c.phone, 'company'));
      ctPool.forEach((p) => { p.sub = [p.email, p.phone].filter(Boolean).join(' · ') || 'No email or phone yet'; });
    }
    const ctPick = pickerOf('contactForm', ctPool, x ? (x.d.contacts || []).map((c) => c.name) : [], x ? 'Everyone at ' + x.d.company + ' is already on this deal. Create a new contact.' : '');
    const cOk = ctPick.mode === 'existing' ? !!ctPick.picked : !!cf.name.trim();
    const cv = {
      ...ctPick,
      title: cf.asEb ? 'New contact as economic buyer' : 'Add a contact',
      sub: cf.asEb ? 'They will be set as the economic buyer on this deal.' : 'They appear on the overview and in MEDDPICC.',
      company: x ? x.d.company : '', companyNote: x ? 'Saved to the ' + x.d.company + ' company record, so it shows on all its deals and projects.' : '',
      name: cf.name, email: cf.email, phone: cf.phone, off: !cOk, b: B(cOk ? 'primary' : 'off'),
      confirm: cOk && x ? () => {
        const f = this.state.contactForm;
        const rec = ctPick.mode === 'existing' ? { name: ctPick.picked.name, email: ctPick.picked.email, phone: ctPick.picked.phone } : { name: f.name.trim(), email: f.email.trim(), phone: f.phone.trim() };
        const nm = rec.name;
        this.updDeal(x.d.id, (z) => { z.contacts = (z.contacts || []).concat([rec]); if (f.asEb) z.eb = nm; return z; }, nm + ' added to ' + x.d.company);
        this.setState({ modal: '' });
      } : noop
    };

    // ---- companies and contacts
    const CHIP_CH = { bg: '#E2F4E6', fg: '#1B6B35' }, CHIP_EB = { bg: '#EEEAFE', fg: '#4B32B8' }, CHIP_LEAD = { bg: '#FDF0DC', fg: '#8A4B00' };
    const compMap = {};
    const ensureC = (name, b) => compMap[name] || (compMap[name] = { name, industry: b.industry || 'Not set', size: b.size || 'Not set', tier: b.tier || 'Not set', strategic: !!b.strategic, deals: [], leads: [], contacts: [] });
    all.forEach((y) => {
      const c = ensureC(y.d.company, y.d);
      c.deals.push(y);
      (y.d.contacts || []).forEach((ct) => {
        const ex = c.contacts.find((u) => u.name === ct.name);
        const roles = [].concat((y.d.champions || []).indexOf(ct.name) >= 0 ? ['Champion'] : []).concat(y.d.eb === ct.name ? ['Economic buyer'] : []);
        if (ex) { roles.forEach((r) => { if (ex.roles.indexOf(r) < 0) ex.roles.push(r); }); if (!ex.email && ct.email) ex.email = ct.email; if (!ex.phone && ct.phone) ex.phone = ct.phone; }
        else c.contacts.push({ name: ct.name, email: ct.email || '', phone: ct.phone || '', roles });
      });
    });
    D.leads.forEach((l) => {
      const c = ensureC(l.company, { industry: l.industry, size: l.size, tier: 'Not set', strategic: false });
      c.leads.push(l);
      if (!c.contacts.some((u) => u.name === l.contact)) c.contacts.push({ name: l.contact, email: l.email || '', phone: l.phone || '', roles: ['Lead contact'] });
    });
    Object.keys(D.companyInfo || {}).forEach((n) => {
      const inf = D.companyInfo[n], c = compMap[n] || (inf.created ? ensureC(n, { industry: inf.industry, size: inf.size, tier: inf.tier, strategic: inf.strategic }) : null); if (!c) return;
      ['industry', 'size', 'tier'].forEach((k) => { if (inf[k]) c[k] = inf[k]; });
      if (inf.strategic !== undefined) c.strategic = !!inf.strategic;
      (inf.contacts || []).forEach((ct) => { const ex = c.contacts.find((u) => u.name === ct.name); if (ex) { ex.title = ex.title || ct.title || ''; } else c.contacts.push({ name: ct.name, email: ct.email || '', phone: ct.phone || '', title: ct.title || '', roles: [] }); });
      const ppl = inf.people || {};
      c.contacts.forEach((u) => { u.dealRoles = u.roles.filter((r) => r === 'Champion' || r === 'Economic buyer'); const pm = ppl[u.name]; if (!pm) return;
        ['title', 'email', 'phone'].forEach((k) => { if (pm[k] !== undefined && pm[k] !== '') u[k] = pm[k]; });
        (pm.tags || []).forEach((t) => { if (u.roles.indexOf(t) < 0) u.roles.push(t); }); });
      const bc = inf.billing && inf.billing.contact; const bu = bc && c.contacts.find((u) => u.name === bc); if (bu && bu.roles.indexOf('Billing contact') < 0) bu.roles.push('Billing contact');
    });
    const CHIP_ALL = { Champion: CHIP_CH, 'Economic buyer': CHIP_EB, 'Decision maker': CHIP_EB, 'Executive sponsor': CHIP_EB, 'Power user': { bg: '#E3EEFB', fg: '#1F4E8C' }, 'Technical contact': { bg: '#E3EEFB', fg: '#1F4E8C' }, 'Billing contact': { bg: '#EEEDF4', fg: '#4A4766' }, 'Lead contact': CHIP_LEAD };
    const chipsOf = (roles) => roles.map((r) => ({ label: r, bg: (CHIP_ALL[r] || CHIP_LEAD).bg, fg: (CHIP_ALL[r] || CHIP_LEAD).fg }));
    const compStats = (c) => {
      const openD = c.deals.filter((y) => !y.d.closed && !y.d.lost), wonD = c.deals.filter((y) => y.d.closed), lostD = c.deals.filter((y) => y.d.lost);
      const projs = wonD.filter((y) => y.d.project);
      let billed = 0, leftToBill = 0;
      projs.forEach((y) => { const pj = this.projectFull(y.d); const b = pj.timelog.reduce((a, e) => a + this.billOf(e), 0); billed += b; leftToBill += Math.max(0, y.services - b); });
      return { openD, wonD, lostD, projs, billed, leftToBill,
        pipeline: openD.reduce((a, y) => a + y.total, 0), won: wonD.reduce((a, y) => a + y.contract, 0),
        arr: wonD.reduce((a, y) => a + (y.arrAnnual || 0), 0), seats: wonD.reduce((a, y) => a + (y.d.lic || []).reduce((b, l) => b + (Number(l.seats) || 0), 0), 0) };
    };
    const companyNames = Object.keys(compMap).sort();
    const companies = companyNames.map((n) => {
      const c = compMap[n], st = compStats(c);
      return { name: n, code: coCode(n), industry: c.industry, tier: c.tier, pipeline: money(st.pipeline), won: money(st.won), arr: st.arr ? money(st.arr) + '/yr' : '—', seats: st.seats ? String(st.seats) : '—', projects: String(st.projs.length),
        counts: c.deals.length + (c.deals.length === 1 ? ' deal' : ' deals') + ' · ' + c.leads.length + (c.leads.length === 1 ? ' lead' : ' leads') + ' · ' + c.contacts.length + (c.contacts.length === 1 ? ' contact' : ' contacts'),
        open: () => this.openCompany(n) };
    });
    const allContacts = [];
    companyNames.forEach((n) => compMap[n].contacts.forEach((ct) => allContacts.push({ ...ct, company: n })));
    let ctv = { tables: [], fields: [], chips: [], tags: [], ef: { b: B('off') }, openCompany: noop };
    const ctSel = allContacts.find((ct) => ct.company + '|' + ct.name === s.contactKey);
    if (ctSel) {
      const cDeals = all.filter((y) => y.d.company === ctSel.company && ((y.d.contacts || []).some((u) => u.name === ctSel.name) || y.d.contact === ctSel.name));
      const cLeads = D.leads.filter((l) => l.company === ctSel.company && l.contact === ctSel.name);
      const RR = (o) => ({ hasTag: false, tag: P.gray, tagText: '', canOpen: true, noOpen: false, value: '', ...o });
      const dRows = cDeals.map((y) => { const rr = []; if ((y.d.champions || []).indexOf(ctSel.name) >= 0) rr.push('Champion'); if (y.d.eb === ctSel.name) rr.push('Economic buyer');
        return RR({ title: y.d.name, sub: dealCode(y.d) + (rr.length ? ' · ' + rr.join(', ') + ' on this deal' : ''), status: y.d.lost ? 'Closed Lost' : STAGES[y.stage], pill: y.d.lost ? LOSTP : y.d.closed ? P.green : P.violet, value: money(y.total), openLabel: 'Open deal ' + y.d.name, open: () => this.openDeal(y.d.id) }); });
      const pRows = cDeals.filter((y) => y.d.project).map((y) => { const pj = this.projectFull(y.d);
        return RR({ title: y.d.name, sub: pj.id, status: (pj.milestones.find((m) => !m.done) || { name: 'Closed out' }).name, pill: P.amber, openLabel: 'Open project ' + pj.id, open: () => this.openProject(y.d.id) }); });
      const lRows = cLeads.map((l) => RR({ title: l.interest, sub: leadCode(l) + ' · ' + l.source, status: l.status, pill: (statusPill[l.status] || P.gray), openLabel: 'Open lead ' + l.contact, open: () => this.openLead(l.id) }));
      const TT = (title, rows, emptyText) => ({ title, rows, count: rows.length ? String(rows.length) : '', empty: !rows.length, emptyText });
      const TAGS = ['Champion', 'Economic buyer', 'Decision maker', 'Executive sponsor', 'Power user', 'Technical contact', 'Billing contact'];
      const fromDeal = ctSel.dealRoles || ctSel.roles.filter((r) => (r === 'Champion' || r === 'Economic buyer') && cDeals.length);
      const ef = s.ctEditForm || {}, editing = !!s.ctEdit;
      const efOk = !!String(ef.name || '').trim() && (String(ef.name || '').trim() === ctSel.name || !allContacts.some((u) => u.company === ctSel.company && u.name === String(ef.name).trim()));
      const setE = (k) => (e) => { const v = e.target.value; this.setState((st) => ({ ctEditForm: { ...(st.ctEditForm || {}), [k]: v } })); };
      ctv = {
        ...(() => { const ct = s.cttab === 'log' ? 'log' : 'overview';
          return { tabs: [['overview', 'Overview'], ['log', 'Change log']].map(([k, label]) => ({ label, go: () => this.setState({ cttab: k }), selected: ct === k ? 'true' : 'false', bd: ct === k ? accent : 'transparent', fg: ct === k ? '#14112E' : '#5E5A78', fw: ct === k ? '650' : '500' })),
            tabOverview: ct === 'overview', tabLog: ct === 'log' }; })(),
        ...chatBtn({ type: 'contact', id: ctSel.company + '|' + ctSel.name }, ctSel.name),
        editing, viewing: !editing,
        edit: () => this.setState({ ctEdit: true, ctEditForm: { name: ctSel.name, title: ctSel.title || '', email: ctSel.email || '', phone: ctSel.phone || '' } }),
        cancel: () => this.setState({ ctEdit: false }),
        ef: { name: ef.name || '', title: ef.title || '', email: ef.email || '', phone: ef.phone || '', setName: setE('name'), setTitle: setE('title'), setEmail: setE('email'), setPhone: setE('phone'),
          off: !efOk, b: B(efOk ? 'primary' : 'off'), note: efOk ? 'Name changes update this contact on every deal, lead and project.' : 'Name is required and must be unique at this company.',
          save: efOk ? () => this.saveContact(ctSel.company, ctSel.name) : noop },
        tags: TAGS.map((t) => { const on = ctSel.roles.indexOf(t) >= 0, locked = fromDeal.indexOf(t) >= 0;
          return { label: t, on: on ? 'true' : 'false', bg: on ? (CHIP_ALL[t] || CHIP_LEAD).bg : '#FFFFFF', fg: on ? (CHIP_ALL[t] || CHIP_LEAD).fg : '#4A4766', bd: on ? 'transparent' : '#CFCAE3', mark: on ? '✓ ' : '+ ',
            title: locked ? 'Set on a deal. Change it in the deal\'s Customer team.' : t === 'Billing contact' ? 'Used as the billing contact on the company Billing tab' : '',
            toggle: locked ? () => this.flash(t + ' is set on a deal. Change it in the deal\'s Customer team.') : () => this.toggleContactTag(ctSel.company, ctSel.name, t) }; }),
        tagNote: 'Champion and Economic buyer set on a deal stay on. Billing contact is shared with the company Billing tab (one per company).',
        name: ctSel.name, code: ctCode(ctSel.company, ctSel.name), company: ctSel.company, chips: chipsOf(ctSel.roles),
        openCompany: () => this.openCompany(ctSel.company),
        fields: [{ k: 'Company', v: ctSel.company }, { k: 'Job title', v: ctSel.title || 'Not added yet' }, { k: 'Email', v: ctSel.email || 'Not added yet' }, { k: 'Phone', v: ctSel.phone || 'Not added yet' }],
        tables: [TT('Deals', dRows, 'Not on any deal yet.'), TT('Projects', pRows, 'No projects yet.'), TT('Leads', lRows, 'No leads.')].map((tb) => ({ ...tb, cl: clOf('ct-' + tb.title) }))
      };
    }
    const cq = String(s.contactQ || '').trim().toLowerCase();
    const contacts = allContacts.filter((ct) => !cq || (ct.name + ' ' + ct.company + ' ' + ct.email + ' ' + ctCode(ct.company, ct.name)).toLowerCase().indexOf(cq) >= 0)
      .map((ct) => ({ name: ct.name, code: ctCode(ct.company, ct.name), open: () => this.openContactRecord(ct.company, ct.name), company: ct.company, email: ct.email || '—', phone: ct.phone || '—', chips: chipsOf(ct.roles), openCompany: () => this.openCompany(ct.company) }));
    let cv2 = { kpis: [], tables: [], fields: [], contacts: [], newExpansion: noop, tabs: [], ovTables: [], tabTable: { rows: [] }, basic: { rows: [], tierOpts: [] }, ctRows: [], ctForm: { b: B('off') }, contactsTop: [], tech: { rows: [], chips: [], cats: [], b: B('off') }, files: { rows: [], catOpts: [], srcOpts: [], toOpts: [], accOpts: [], fAccOpts: [], b: B('off') }, timeline: { up: [], past: [], preview: [] }, billing: { groups: [], billed: { rows: [] } } };
    const cSel = compMap[s.companyName];
    if (cSel) {
      const st = compStats(cSel);
      const stagePill = (y) => y.d.lost ? { bg: '#FBE4E5', fg: '#9E2A30' } : y.d.closed ? P.green : P.violet;
      const isExp = (y) => isExpDeal(y.d);
      const dealRows = cSel.deals.map((y) => ({ title: y.d.name, sub: (y.d.lost ? 'Lost · ' + y.d.lost.reason : y.d.closed ? 'Closed Won' + (y.d.closeAmount ? ' · ' + y.d.closeAmount : '') : 'Expected close ' + (y.d.expectedClose || 'not set')) + ' · owner ' + y.d.owner,
        hasTag: isExp(y), tag: { bg: '#E3EEFB', fg: '#1F4E8C' }, tagText: 'Expansion', status: STAGES[y.stage], pill: stagePill(y), value: money(y.total), canOpen: true, openLabel: 'Open deal ' + y.d.name, open: () => this.openDeal(y.d.id) }));
      const projRows = st.projs.map((y) => { const pj = this.projectFull(y.d); const used = pj.timelog.reduce((a, e) => a + (Number(e.hours) || 0), 0); const b = pj.timelog.reduce((a, e) => a + this.billOf(e), 0); const cur = pj.milestones.find((m) => !m.done);
        return { title: pj.id + ' · ' + y.d.name, sub: used + ' h logged of ' + y.hours + ' h total · ' + money(b) + ' billed', hasTag: false, tag: P.gray, tagText: '', status: pj.checks.filter(Boolean).length < 5 ? 'Onboarding' : cur ? cur.name : 'Closed out', pill: P.amber, value: money(y.services), canOpen: true, openLabel: 'Open project ' + pj.id, open: () => this.openProject(y.d.id) }; });
      const prodRows = [];
      st.wonD.forEach((y) => (y.d.lic || []).forEach((l) => { const term = termOf(l); const ann = (Number(l.seats) || 0) * (Number(l.ppu) || 0) * 12;
        prodRows.push({ title: l.product + ' ' + l.plan, sub: 'Vendor ' + vendorOf(l) + ' · ' + (Number(l.seats) || 0) + ' seats × ' + money(Number(l.ppu) || 0) + '/seat/mo · ' + term + ' months · from ' + y.d.name, hasTag: false, tag: P.gray, tagText: '', status: l.plan + ' tier', pill: P.gray, value: money(ann) + '/yr', canOpen: false, openLabel: '', open: noop }); }));
      const billRows = st.projs.map((y) => { const pj = this.projectFull(y.d); const b = pj.timelog.reduce((a, e) => a + this.billOf(e), 0);
        return { title: 'Services · ' + pj.id, sub: money(Math.max(0, y.services - b)) + ' left to bill of ' + money(y.services), hasTag: false, tag: P.gray, tagText: '', status: b ? 'Billing' : 'Not billed yet', pill: b ? P.violet : P.gray, value: money(b), canOpen: true, openLabel: 'Open project ' + pj.id, open: () => { this.openProject(y.d.id); this.setState({ ptab: 'time' }); } }; })
        .concat(st.arr ? [{ title: 'Licenses', sub: 'Billed through ' + st.wonD.reduce((a, y) => a.concat((y.d.lic || []).map(vendorOf)), []).filter((v, i, a) => a.indexOf(v) === i).join(' and '), hasTag: false, tag: P.gray, tagText: '', status: 'Recurring', pill: P.green, value: money(st.arr) + '/yr', canOpen: false, openLabel: '', open: noop }] : []);
      const leadRows = cSel.leads.map((l) => ({ title: l.contact, sub: l.source + ' · interest: ' + l.interest, hasTag: false, tag: P.gray, tagText: '', status: l.status, pill: (statusPill[l.status] || P.gray), value: '', canOpen: true, openLabel: 'Open lead ' + l.contact, open: () => this.openLead(l.id) }));
      const T = (title, rows0, emptyText) => { const rows = rows0.map((r) => ({ ...r, noOpen: !r.canOpen })); return { title, rows, count: rows.length ? String(rows.length) : '', empty: !rows.length, emptyText }; };
      cv2 = {
        ...chatBtn({ type: 'company', id: cSel.name }, cSel.name),
        name: cSel.name, code: coCode(cSel.name), strategic: cSel.strategic, line: cSel.industry + ' · size ' + cSel.size + ' · ' + cSel.tier + ' tier',
        kpis: [
          { label: 'Pipeline', value: money(st.pipeline), note: st.openD.length + (st.openD.length === 1 ? ' deal' : ' deals') + ' in pipeline' },
          { label: 'Lifetime value', value: money(st.won), note: st.wonD.length + ' won deal' + (st.wonD.length === 1 ? '' : 's') + ' · services + licenses · ' + st.lostD.length + ' lost' },
          (() => { const first = st.wonD.slice().sort((a1, b1) => String(a1.d.createdAt || '').localeCompare(String(b1.d.createdAt || '')))[0]; const isExp = (y) => isExpDeal(y.d); const expW = st.wonD.filter(isExp), expO = st.openD.filter(isExp), ev = expW.reduce((a, y) => a + y.contract, 0); const since = first && first.d.createdAt ? new Date(first.d.createdAt + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : '';
            return { label: 'Expansion value', value: money(ev), note: (expW.length ? expW.length + ' expansion deal' + (expW.length === 1 ? '' : 's') + ' won' + (st.won ? ' · ' + Math.round(ev / st.won * 100) + '% of lifetime' : '') : 'none won yet') + (since ? ' · customer since ' + since : '') + (expO.length ? ' · ' + money(expO.reduce((a, y) => a + y.total, 0)) + ' in pipeline' : '') }; })(),
          { label: 'ARR', value: st.arr ? money(st.arr) : '—', note: 'from won deals' },
          { label: 'Active projects', value: String(st.projs.length), note: st.projs.length ? 'from won deals' : 'none yet' }
        ],
        tables: [
          T('Deals', dealRows, 'No deals yet.'),
          T('Projects', projRows, 'No projects yet. Projects start when a deal is Closed Won.'),
          T('Products and seats', prodRows, 'No licenses sold yet.'),
          T('Billing', billRows, 'Nothing billed yet.'),
          T('Leads', leadRows, 'No open leads.')
        ],
        fields: [{ k: 'Industry', v: cSel.industry }, { k: 'Company size', v: cSel.size }, { k: 'Customer tier', v: cSel.tier }, { k: 'Strategic', v: cSel.strategic ? 'Yes' : 'No' }],
        contacts: cSel.contacts.map((ct) => ({ name: ct.name, open: () => this.openContactRecord(cSel.name, ct.name), openLabel: 'Open contact ' + ct.name, email: ct.email || 'No email yet', phone: ct.phone || 'No phone yet', chips: chipsOf(ct.roles) })), contactCount: String(cSel.contacts.length),
        newExpansion: () => cDealC ? this.newExpansion(cSel.name) : this.flash('Your role can\'t create deals.')
      };
      // ---- company tabs: overview, contacts, tables, billing, tech stack, timeline, files
      Object.assign(cv2, (() => {
        const CN = cSel.name, info = (D.companyInfo || {})[CN] || {};
        const tdy = new Date().toISOString().slice(0, 10);
        const fmtD = (v) => { if (!v) return 'No date'; const t = new Date(v + 'T00:00:00'); return isNaN(t) ? v : t.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }); };
        const me = meTag;
        const setK = (form, k) => (e) => { const v = e.target.value; this.setState((st0) => ({ [form]: { ...(st0[form] || {}), [k]: v } })); };
        const TABS = [['overview', 'Overview'], ['contacts', 'Contacts ' + cSel.contacts.length], ['deals', 'Deals ' + cSel.deals.length], ['projects', 'Projects ' + st.projs.length],
          ['products', 'Products'], ['billing', 'Billing'], ].concat(cLeadsMenu ? [['leads', 'Leads ' + cSel.leads.length]] : []).concat([['tech', 'Tech stack'], ['timeline', 'Timeline'], ['files', 'Files'], ['log', 'Change log']]);
        const ctab = TABS.some((t) => t[0] === s.ctab) ? s.ctab : 'overview';
        const go = (k) => () => this.setState({ ctab: k });
        const TBL = { deals: cv2.tables[0], projects: cv2.tables[1], products: cv2.tables[2], leads: cv2.tables[4] };
        const TAB_OF = { Deals: 'deals', Projects: 'projects', 'Products and seats': 'products', Billing: 'billing', Leads: 'leads' };

        // basic info
        const owners = cSel.deals.map((y) => y.d.owner).concat(cSel.leads.map((l) => l.owner)).filter((v, i, a) => v && a.indexOf(v) === i);
        const cf = s.coForm || {};
        const basicRows = [{ k: 'Website', v: info.website || 'Not set' }, { k: 'HQ location', v: info.hq || 'Not set' }, { k: 'Industry', v: cSel.industry }, { k: 'Company size', v: cSel.size },
          { k: 'Customer tier', v: cSel.tier }, { k: 'Strategic', v: cSel.strategic ? 'Yes' : 'No' }, { k: 'Owner (AE)', v: owners.join(', ') || 'Not set' }];
        const basic = {
          editing: !!s.coEdit, viewing: !s.coEdit, rows: basicRows,
          website: cf.website || '', hq: cf.hq || '', industry: cf.industry || '', size: cf.size || '', tier: cf.tier || 'Starter', strategic: cf.strategic || 'No',
          setWebsite: setK('coForm', 'website'), setHq: setK('coForm', 'hq'), setIndustry: setK('coForm', 'industry'), setSize: setK('coForm', 'size'), setTier: setK('coForm', 'tier'), setStrategic: setK('coForm', 'strategic'),
          tierOpts: ['Starter', 'Growth', 'Scale', 'Enterprise'].map((v) => ({ v, label: v })),
          sizeOpts: (() => { const std = ['1–50', '50–200', '200–500', '500–2,000', '2,000+'], cur = cf.size || ''; return [{ v: '', label: 'Not set' }].concat((cur && std.indexOf(cur) < 0 ? [cur] : []).concat(std).map((v) => ({ v, label: v }))); })(),
          edit: () => this.setState({ coEdit: true, coForm: { website: info.website || '', hq: info.hq || '', industry: cSel.industry === 'Not set' ? '' : cSel.industry, size: cSel.size === 'Not set' ? '' : cSel.size, tier: ['Starter', 'Growth', 'Scale', 'Enterprise'].indexOf(cSel.tier) >= 0 ? cSel.tier : 'Starter', strategic: cSel.strategic ? 'Yes' : 'No' } }),
          cancel: () => this.setState({ coEdit: false }),
          save: () => {
            const f = this.state.coForm || {}, strat = f.strategic === 'Yes';
            const pick = (v, old) => String(v || '').trim() || old;
            this.setState((st0) => {
              const ci = { ...(st0.data.companyInfo || {}) };
              ci[CN] = { ...(ci[CN] || {}), website: String(f.website || '').trim(), hq: String(f.hq || '').trim(), industry: pick(f.industry, ''), size: pick(f.size, ''), tier: f.tier, strategic: strat };
              const deals = st0.data.deals.map((d0) => d0.company === CN ? { ...d0, industry: pick(f.industry, d0.industry), size: pick(f.size, d0.size), tier: f.tier, strategic: strat } : d0);
              const leads = st0.data.leads.map((l0) => l0.company === CN ? { ...l0, industry: pick(f.industry, l0.industry), size: pick(f.size, l0.size) } : l0);
              return { data: { ...st0.data, companyInfo: ci, deals, leads }, coEdit: false };
            });
            this.flash('Company info saved. Deals for ' + CN + ' now use it too.');
          }
        };

        // contacts
        const ctf = s.ctForm || {}, ctOk = !!String(ctf.name || '').trim() && !cSel.contacts.some((u) => u.name === String(ctf.name || '').trim());
        const ctRows = cSel.contacts.map((ct) => ({ name: ct.name, title: ct.title || '', code: ctCode(CN, ct.name), chips: chipsOf(ct.roles), email: ct.email || '—', phone: ct.phone || '—', open: () => this.openContactRecord(CN, ct.name) }));
        const ctForm = {
          name: ctf.name || '', title: ctf.title || '', email: ctf.email || '', phone: ctf.phone || '',
          setName: setK('ctForm', 'name'), setTitle: setK('ctForm', 'title'), setEmail: setK('ctForm', 'email'), setPhone: setK('ctForm', 'phone'),
          off: !ctOk, b: B(ctOk ? 'primary' : 'off'),
          note: String(ctf.name || '').trim() && !ctOk ? 'A contact with that name already exists.' : 'Saved to the company. Add them to a deal from the deal page.',
          add: ctOk ? () => { const f = this.state.ctForm || {}; const nm = String(f.name).trim();
            this.updCompany(CN, (ci) => { ci.contacts = (ci.contacts || []).concat([{ name: nm, title: String(f.title || '').trim(), email: String(f.email || '').trim(), phone: String(f.phone || '').trim() }]); }, nm + ' added to ' + CN);
            this.setState({ ctForm: {} }); } : noop
        };

        // tech stack
        const TECH_CATS = ['CRM', 'ERP', 'Finance and billing', 'Email and calendar', 'Communication', 'Clinical', 'Data and BI', 'Integration', 'Work management', 'Other'];
        const techAuto = []; st.wonD.forEach((y) => (y.d.lic || []).forEach((l) => { const nm = l.product + ' (' + l.plan + ')'; if (!techAuto.some((t) => t.name === nm)) techAuto.push({ name: nm, category: 'Work management', note: (Number(l.seats) || 0) + ' seats', src: 'Sold by us · ' + dealCode(y.d), canRemove: false, remove: noop }); }));
        const techMan = (info.tech || []).map((t) => ({ name: t.name, category: t.category || 'Other', note: t.note || '', src: 'Added by ' + (t.by || 'the team'), canRemove: true,
          remove: () => this.updCompany(CN, (ci) => { ci.tech = (ci.tech || []).filter((u) => u.id !== t.id); }, t.name + ' removed from the tech stack') }));
        const techRows = techMan.concat(techAuto);
        const tf0 = s.techForm || {}, tOk = !!String(tf0.name || '').trim();
        const tech = {
          rows: techRows, empty: !techRows.length, chips: techRows.map((t) => ({ name: t.name })), count: String(techRows.length),
          cats: TECH_CATS.map((v) => ({ v, label: v })), name: tf0.name || '', category: tf0.category || 'CRM', note: tf0.note || '',
          setName: setK('techForm', 'name'), setCat: setK('techForm', 'category'), setNote: setK('techForm', 'note'),
          off: !tOk, b: B(tOk ? 'primary' : 'off'),
          add: tOk ? () => { const f = this.state.techForm || {}; const nm = String(f.name).trim();
            this.updCompany(CN, (ci) => { ci.tech = (ci.tech || []).concat([{ id: 't' + Date.now(), name: nm, category: f.category || 'CRM', note: String(f.note || '').trim(), by: me }]); }, nm + ' added to the tech stack');
            this.setState({ techForm: { category: f.category || 'CRM' } }); } : noop
        };

        // files, consolidated with access control
        const FILE_CATS = ['NDA', 'Contract', 'Signed contract', 'Vendor setup', 'Proposal', 'SOW', 'Invoice', 'Bill', 'Documentation', 'Discovery notes', 'Recording', 'Other'];
        const ACC = { edit: 'AE/SA can edit', view: 'AE/SA can view', none: 'AE/SA: no access' };
        const defAcc = (c) => /Invoice|Bill/.test(c) ? 'none' : /NDA|Contract/.test(c) ? 'view' : 'edit';
        const accOf = (f) => f.access || defAcc(f.category || '');
        const srcs = [{ key: 'co', label: 'Company (general)', kind: 'Company' }]
          .concat(cSel.deals.map((y) => ({ key: 'd:' + y.d.id, label: (y.d.project ? this.projectFull(y.d).id + ' / ' : '') + dealCode(y.d) + ' · ' + y.d.name, kind: y.d.project ? 'Project' : 'Deal', files: y.d.files || [], open: () => y.d.project ? (this.openProject(y.d.id), this.setState({ ptab: 'files' })) : this.openDeal(y.d.id, 'files') })))
          .concat(cSel.leads.map((l) => ({ key: 'l:' + l.id, label: leadCode(l) + ' · lead', kind: 'Lead', files: l.files || [], open: () => this.openLead(l.id) })));
        srcs[0].files = info.files || []; srcs[0].open = null;
        const flt = s.fileFlt || {};
        const allF = [];
        srcs.forEach((sc) => (sc.files || []).forEach((f) => allF.push({ f, sc })));
        const visible = allF.filter((o) => isAdmin || accOf(o.f) !== 'none');
        const fq = String(flt.q || '').trim().toLowerCase();
        const shown = visible.filter((o) => (!flt.cat || o.f.category === flt.cat) && (!flt.src || (flt.src === 'co' ? o.sc.key === 'co' : flt.src === o.sc.kind)) && (!fq || (o.f.name + ' ' + o.sc.label).toLowerCase().indexOf(fq) >= 0))
          .sort((a1, b1) => String(b1.f.date || '').localeCompare(String(a1.f.date || '')));
        const cff = s.cfForm || {}, cfKind = cff.kind === 'file' ? 'file' : 'link';
        const cfUrlOk = /^https?:\/\/\S+\.\S+/.test(String(cff.url || '').trim());
        const cfOk = cfKind === 'link' ? cfUrlOk : !!cff.fileName;
        const files = {
          rows: shown.map((o) => { const a = accOf(o.f), canEdit = isAdmin || a === 'edit';
            return { name: o.f.name, url: o.f.url || '', isLink: o.f.kind === 'link', isFile: o.f.kind !== 'link', category: o.f.category || 'Other',
              meta: o.sc.label + ' · ' + fmtD(o.f.date) + (o.f.by ? ' · ' + o.f.by : '') + (o.f.kind !== 'link' && o.f.size ? ' · ' + Math.max(1, Math.round(o.f.size / 1024)) + ' KB' : ''),
              acc: a, accText: ACC[a], accPill: a === 'none' ? { bg: '#FBE4E5', fg: '#9E2A30' } : a === 'view' ? P.amber : P.green, accLabel: 'Access for ' + o.f.name, isAdmin, notAdmin: !isAdmin,
              setAcc: (e) => { const v = e.target.value; this.updFiles(CN, o.sc.key, (list) => list.map((u) => u.id === o.f.id ? { ...u, access: v } : u), o.f.name + ': ' + ACC[v]); },
              canRemove: canEdit, removeLabel: 'Remove ' + o.f.name, remove: () => this.updFiles(CN, o.sc.key, (list) => list.filter((u) => u.id !== o.f.id), o.f.name + ' removed') }; }),
          count: String(visible.length), empty: !shown.length, emptyText: visible.length ? 'No files match these filters.' : 'No files yet.',
          summary: shown.length + ' of ' + visible.length + ' files',
          accOpts: Object.keys(ACC).map((k) => ({ v: k, label: ACC[k] })),
          rbacNote: '',
          catOpts: [{ v: '', label: 'All categories' }].concat(FILE_CATS.map((v) => ({ v, label: v }))), cat: flt.cat || '',
          srcOpts: [{ v: '', label: 'All sources' }, { v: 'co', label: 'Company' }, { v: 'Deal', label: 'Deals' }, { v: 'Project', label: 'Projects' }, { v: 'Lead', label: 'Leads' }], src: flt.src || '', q: flt.q || '',
          setCat: setK('fileFlt', 'cat'), setSrc: setK('fileFlt', 'src'), setQ: setK('fileFlt', 'q'),
          isLink: cfKind === 'link', isFile: cfKind === 'file', linkOn: cfKind === 'link' ? 'true' : 'false', fileOn: cfKind === 'file' ? 'true' : 'false',
          linkBg: cfKind === 'link' ? '#FFFFFF' : 'transparent', fileBg: cfKind === 'file' ? '#FFFFFF' : 'transparent',
          pickLink: () => this.setState((st0) => ({ cfForm: { ...(st0.cfForm || {}), kind: 'link' } })), pickFile: () => this.setState((st0) => ({ cfForm: { ...(st0.cfForm || {}), kind: 'file' } })),
          fUrl: cff.url || '', fName: cff.name || '', fCat: cff.category || 'NDA', fTo: cff.to || 'co', fAcc: cff.access || '',
          setUrl: setK('cfForm', 'url'), setName: setK('cfForm', 'name'), setFCat: setK('cfForm', 'category'), setTo: setK('cfForm', 'to'), setFAcc: setK('cfForm', 'access'),
          setPick: (e) => { const f0 = e.target.files && e.target.files[0]; this.setState((st0) => ({ cfForm: { ...(st0.cfForm || {}), fileName: f0 ? f0.name : '', fileSize: f0 ? f0.size : 0 } })); },
          fileNote: cff.fileName ? 'Selected: ' + cff.fileName + '. In this demo only the name is kept.' : 'In this demo only the file name is kept, not the file itself.',
          toOpts: srcs.map((sc) => ({ v: sc.key, label: sc.label })),
          fAccOpts: [{ v: '', label: 'Default for the category (' + ACC[defAcc(cff.category || 'NDA')] + ')' }].concat(Object.keys(ACC).map((k) => ({ v: k, label: ACC[k] }))),
          off: !cfOk, b: B(cfOk ? 'primary' : 'off'), cta: cfKind === 'link' ? 'Add link' : 'Add file',
          add: cfOk ? () => { const f = this.state.cfForm || {}, kind = f.kind === 'file' ? 'file' : 'link', url = String(f.url || '').trim();
            const nm = kind === 'link' ? (String(f.name || '').trim() || url.replace(/^https?:\/\//, '').slice(0, 60)) : f.fileName;
            const rec = { id: 'f' + Date.now(), kind, name: nm, url: kind === 'link' ? url : '', size: kind === 'file' ? f.fileSize || 0 : 0, category: f.category || 'NDA', date: tdy, by: me };
            if (isAdmin && f.access) rec.access = f.access;
            this.updFiles(CN, f.to || 'co', (list) => list.concat([rec]), nm + ' added');
            this.setState({ cfForm: { kind, category: f.category || 'NDA', to: f.to || 'co' } }); } : noop
        };

        // timeline: key lifecycle moments only
        const ev = [];
        const push = (date, kind, title, src, open) => { if (date) ev.push({ date, kind, title, src, open }); };
        cSel.leads.forEach((l) => push(l.createdAt, 'Lead', 'Lead created · ' + l.contact, leadCode(l), () => this.openLead(l.id)));
        cSel.deals.forEach((y) => {
          const dc = dealCode(y.d), od = () => this.openDeal(y.d.id);
          push(y.d.leadCreatedAt, 'Lead', 'Lead created · ' + y.d.contact, y.d.leadCode || dc, od);
          push(y.d.createdAt, 'Deal', 'Deal created · ' + y.d.name, dc, od);
          if (y.d.proposal === 2) push(y.d.signedAt, 'Deal', 'Proposal signed · ' + y.d.name, dc, od);
          if (y.d.paid) push(y.d.paidAt, 'Deal', 'Payment received · ' + y.d.name, dc, od);
          if (y.d.project) { const pj = this.projectFull(y.d), op = () => this.openProject(y.d.id);
            push(pj.dates.start, 'Project', (pj.dates.start <= tdy ? 'Project started · ' : 'Project starts · ') + y.d.name, pj.id, op);
            push(pj.dates.end, 'Project', (pj.dates.end < tdy ? 'Project ended · ' : 'Project ends (planned) · ') + y.d.name, pj.id, op); }
        });
        const KP = { Deal: P.violet, Project: P.amber, Lead: P.green };
        const evRow = (e) => ({ date: fmtD(e.date), kind: e.kind, pill: KP[e.kind] || P.gray, title: e.title, src: e.src, open: e.open, label: 'Open ' + e.src });
        const up = ev.filter((e) => e.date > tdy).sort((a1, b1) => a1.date.localeCompare(b1.date));
        const past = ev.filter((e) => e.date <= tdy).sort((a1, b1) => b1.date.localeCompare(a1.date));
        const timeline = { up: up.map(evRow), past: past.map(evRow), hasUp: up.length > 0, hasPast: past.length > 0, empty: !ev.length,
          preview: up.slice(0, 3).map((e) => ({ ...evRow(e), when: 'Next' })).concat(past.slice(0, 3).map((e) => ({ ...evRow(e), when: 'Recent' }))) };

        // billing and account setup
        const bi = info.billing || {};
        const setB = (k) => (e) => { const v = e.target.value; this.updCompany(CN, (ci) => { ci.billing = { ...(ci.billing || {}), [k]: v }; }); };
        const fld = (id, label, k, opts, ph, type) => ({ id: 'cb-' + id, label, value: bi[k] || '', set: setB(k), isSelect: !!opts, isText: !opts, opts: (opts || []).map((v) => ({ v, label: v || 'Not set' })), ph: ph || '', type: type || 'text' });
        const groups = [
          { title: 'Account setup', sub: 'Who this customer is to us and where invoices come from.', fields: [
            fld('status', 'Account status', 'status', ['Prospect', 'Active customer', 'Inactive']),
            fld('since', 'Customer since', 'since', null, '', 'date'),
            fld('system', 'Invoicing system', 'system', ['', 'Stripe', 'QuickBooks Online']),
            fld('acct', 'Account number in that system', 'acctRef', null, 'e.g. CUS-10482')] },
          { title: 'Billing info', sub: 'Used on every invoice for this account.', fields: [
            fld('contact', 'Billing contact', 'contact', [''].concat(cSel.contacts.map((u) => u.name))),
            fld('email', 'Billing email', 'email', null, 'ap@company.com', 'email'),
            fld('addr', 'Billing address', 'address', null, 'Street, city, postcode, country'),
            fld('terms', 'Payment terms', 'terms', ['Due on receipt', 'Net 15', 'Net 30', 'Net 45', 'Net 60']),
            fld('cur', 'Currency', 'currency', ['USD', 'CAD', 'EUR', 'GBP', 'AUD']),
            fld('tax', 'Tax ID / VAT number', 'taxId', null, 'Optional'),
            fld('po', 'PO required on invoices', 'po', ['No', 'Yes']),
            fld('pon', 'PO number', 'poNumber', null, 'If required'),
            fld('instr', 'Billing instructions', 'instructions', null, 'e.g. Upload invoices to their supplier portal; quote the PO on every invoice')] }
        ];
        if (isAdmin) groups.push({ title: 'Banking', sub: 'Used for refunds, credits and direct debit.', fields: [
          fld('bank', 'Bank name', 'bankName'), fld('holder', 'Account holder name', 'holder'),
          fld('accno', 'Account number', 'accountNo', null, 'Stored masked', 'password'), fld('routing', 'Routing / sort code', 'routing'), fld('swift', 'SWIFT / BIC', 'swift')] });
        const accTail = String(bi.accountNo || '').replace(/\s/g, '').slice(-4);
        const billing = {
          groups: groups.map((g) => ({ ...g, cl: clOf('bill-' + g.title), fields: g.fields.map((f0) => ({ ...f0, off: !isAdmin })) })),
          note: isAdmin ? (accTail ? 'Bank account on file ends in ' + accTail + '. ' : '') + 'Changes save as you type.' : '',
          billed: cv2.tables[3]
        };

        const short = (tb) => { const k = TAB_OF[tb.title]; const more = tb.rows.length > 3; return { ...tb, rows: tb.rows.slice(0, 3), hasMore: more, moreLabel: 'View all ' + tb.rows.length, more: go(k) }; };
        return {
          tabs: TABS.map(([k, label0]) => ({ label: k === 'tech' ? 'Tech stack ' + techRows.length : k === 'files' ? 'Files ' + visible.length : label0, go: go(k), selected: ctab === k ? 'true' : 'false', bd: ctab === k ? accent : 'transparent', fg: ctab === k ? '#14112E' : '#5E5A78', fw: ctab === k ? '650' : '500' })),
          tabLog: ctab === 'log', tabOverview: ctab === 'overview', tabContacts: ctab === 'contacts', tabBilling: ctab === 'billing', tabTech: ctab === 'tech', tabTimeline: ctab === 'timeline', tabFiles: ctab === 'files',
          isTableTab: !!TBL[ctab], tabTable: TBL[ctab] || { rows: [] },
          ovTables: cv2.tables.filter((tb) => tb.title !== 'Billing').map(short).map((tb) => ({ ...tb, cl: clOf('co-' + tb.title) })),
          basic, ctRows, ctEmpty: !ctRows.length, ctForm, contactsTop: cv2.contacts.slice(0, 4), contactsMore: cv2.contacts.length > 4, contactsMoreLabel: 'View all ' + cv2.contacts.length, goContacts: go('contacts'),
          tech, goTech: go('tech'), files, timeline, goTimeline: go('timeline'), billing
        };
      })());
    }
    // ---- global search
    const gqRaw = String(s.gq || '').trim(), gql = gqRaw.toLowerCase();
    const hit = (...vals) => vals.some((v) => String(v || '').toLowerCase().indexOf(gql) >= 0);
    const clearG = () => this.setState({ gq: '' });
    const goG = (fn) => () => { this.setState({ gq: '' }); fn(); };
    let gs = { has: false, empty: false, groups: [], summary: '', clear: clearG };
    if (gql.length >= 2) {
      const groups = [
        { label: 'Companies', items: companyNames.filter((n) => hit(n, coCode(n), compMap[n].industry)).map((n) => ({ code: coCode(n), title: n, sub: compMap[n].industry + ' · ' + compMap[n].deals.length + ' deals', go: goG(() => this.openCompany(n)) })) },
        { label: 'Deals', items: all.filter((y) => hit(y.d.name, y.d.company, dealCode(y.d), y.d.owner)).map((y) => ({ code: dealCode(y.d), title: y.d.company + ' · ' + y.d.name, sub: STAGES[y.stage] + ' · ' + money(y.total) + ' · owner ' + y.d.owner, go: goG(() => this.openDeal(y.d.id)) })) },
        { label: 'Projects', items: withProject.map((y) => ({ y, pj: this.projectFull(y.d) })).filter((o) => hit(o.pj.id, o.y.d.name, o.y.d.company, (o.pj.setup || {}).name)).map((o) => ({ code: o.pj.id, title: o.y.d.company + ' – ' + (String((o.pj.setup || {}).name || '').trim() || o.y.d.name), sub: o.pj.timelog.reduce((a, e) => a + (Number(e.hours) || 0), 0) + ' h logged of ' + o.y.hours + ' h total', go: goG(() => this.openProject(o.y.d.id)) })) },
        { label: 'Contacts', items: allContacts.filter((ct) => hit(ct.name, ct.email, ct.company, ct.phone, ctCode(ct.company, ct.name))).map((ct) => ({ code: ctCode(ct.company, ct.name), title: ct.name, sub: ct.company + (ct.email ? ' · ' + ct.email : ''), go: goG(() => this.openContactRecord(ct.company, ct.name)) })) },
        { label: 'Leads', items: D.leads.filter((l) => cLeadsMenu && hit(l.contact, l.company, leadCode(l), l.interest)).map((l) => ({ code: leadCode(l), title: l.contact + ' · ' + l.company, sub: l.status + ' · ' + l.source, go: goG(() => this.openLead(l.id)) })) }
      ].map((g) => ({ ...g, total: g.items.length, items: g.items.slice(0, 5) })).filter((g) => g.total > 0);
      const total = groups.reduce((a, g) => a + g.total, 0);
      gs = { has: true, empty: total === 0, groups, summary: total ? total + (total === 1 ? ' result' : ' results') + ' for "' + gqRaw + '"' : 'Searching for "' + gqRaw + '"', clear: clearG };
    } else if (gql.length) {
      gs = { has: true, empty: false, groups: [], summary: 'Type at least 2 characters', clear: clearG };
    }
    // ---- admin settings
    const setv = (() => {
      const canEdit = isAdmin;
      const PATHS = [['rep', 'When a monday.com rep is involved', 'Shown when the AE answers Yes to "Is a monday.com rep involved?"'], ['direct', 'When no rep is involved', 'Shown when the AE answers No']];
      const EXP = [['auto', 'Automatic', 'A deal is an expansion when its company already has a Closed Won deal. Nobody has to tag it.'], ['manual', 'Manual', 'The AE sets Deal type (New business or Expansion) on each deal.']];
      const setTab = canEdit && (s.setTab === 'users' || s.setTab === 'catalog') ? s.setTab : 'general', RL = SET.roles, UL = SET.users, invF = s.invForm || {}, nrl = String(s.newRole || '').trim();
      const MENU = [['home', 'My work'], ['companies', 'Companies'], ['contacts', 'Contacts'], ['leads', 'Leads'], ['deals', 'Deals'], ['projects', 'Projects'], ['settings', 'Settings']];
      const invName = String(invF.name || '').trim(), invEmail = String(invF.email || '').trim(), invRole = invF.role || 'AE';
      const invErr = invEmail && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(invEmail) ? 'Enter a valid email address.' : UL.some((u) => invEmail && String(u.email || '').toLowerCase() === invEmail.toLowerCase()) ? 'Someone with this email is already a user.' : UL.some((u) => invName && u.name.toLowerCase() === invName.toLowerCase()) ? 'A user with this name already exists.' : '';
      const invOk = canEdit && !!invName && !!invEmail && !invErr;
      const npt = String(s.newPath || '').trim(), ntp = String(s.newTpl || '').trim(), nsv = String(s.newStatus || '').trim(), ncr = String(s.newCostRole || '').trim();
      const statuses = SET.taskStatuses;
      return {
        statuses: statuses.map((st0, i) => ({ n: String(i + 1), label: st0.label, isDone: !!st0.done, doneOn: st0.done ? 'true' : 'false', doneTxt: st0.done ? 'Counts as done' : 'Mark as done status', doneBg: st0.done ? '#E2F4E6' : '#FFFFFF', doneFg: st0.done ? '#1B6B35' : '#4A4766',
          labelA: 'Status ' + (i + 1), canRemove: canEdit && statuses.length > 2 && !st0.done,
          set: (e) => { const v = e.target.value; this.updSettings((st) => { st.taskStatuses[i].label = v; }); },
          makeDone: canEdit ? () => this.updSettings((st) => { st.taskStatuses.forEach((u, j) => { u.done = j === i; }); }, st0.label + ' now counts as done') : noop,
          remove: () => this.updSettings((st) => { st.taskStatuses.splice(i, 1); }, 'Status removed') })),
        newStatus: s.newStatus || '', setNewStatus: (e) => { const v = e.target.value; this.setState({ newStatus: v }); },
        addStatusOff: !nsv || !canEdit, addStatusB: B(nsv && canEdit ? 'secondary' : 'off'),
        addStatus: nsv && canEdit ? () => { const t = String(this.state.newStatus || '').trim(); this.updSettings((st) => { const di = st.taskStatuses.findIndex((u) => u.done); st.taskStatuses.splice(di < 0 ? st.taskStatuses.length : di, 0, { label: t, done: false }); }, 'Status added'); this.setState({ newStatus: '' }); } : noop,
        costRows: (canEdit ? SET.costRates || [] : []).map((c0, i) => ({ role: c0.role, rate: String(c0.rate), roleA: 'Role ' + (i + 1), rateA: 'Cost per hour for ' + (c0.role || 'role ' + (i + 1)), removeA: 'Remove ' + (c0.role || 'role ' + (i + 1)),
          setRole: (e) => { const v = e.target.value; this.updSettings((st) => { st.costRates[i].role = v; }); },
          setRate: (e) => { const v = Math.max(0, Math.min(99999, parseFloat(e.target.value) || 0)); this.updSettings((st) => { st.costRates[i].rate = v; }); },
          remove: canEdit ? () => this.updSettings((st) => { st.costRates.splice(i, 1); }, (c0.role || 'Role') + ' removed from cost rates') : noop })),
        newCostRole: s.newCostRole || '', newCostRate: s.newCostRate || '',
        setNewCostRole: (e) => { const v = e.target.value; this.setState({ newCostRole: v }); }, setNewCostRate: (e) => { const v = e.target.value; this.setState({ newCostRate: v }); },
        addCostOff: !ncr || !canEdit, addCostB: B(ncr && canEdit ? 'secondary' : 'off'),
        addCost: ncr && canEdit ? () => { const r = String(this.state.newCostRole || '').trim(), v = parseFloat(this.state.newCostRate); this.updSettings((st) => { st.costRates.push({ role: r, rate: isNaN(v) ? (Number(st.defaultCost) || 0) : Math.max(0, v) }); }, r + ' added to cost rates'); this.setState({ newCostRole: '', newCostRate: '' }); } : noop,
        tabGeneral: setTab === 'general', tabUsers: setTab === 'users', tabCatalog: setTab === 'catalog',
        ...(() => { const allD = this.state.data.deals || [];
          const usedBy = (key, idv) => { const ds = allD.filter((d0) => (d0.quotes || []).some((q0) => (q0.lines || []).some((l0) => l0[key] === idv))); return { n: ds.length, p: ds.filter((d0) => d0.project).length }; };
          const rows = (lk, key, noun) => (SET[lk] || []).map((it, i) => { const u = usedBy(key, it.id), on = it.active !== false;
            return { name: it.name, labelA: noun + ' ' + (i + 1) + ' name', off: !canEdit, status: on ? 'Active' : 'Inactive', pillBg: on ? '#E2F4E6' : '#EEEDF4', pillFg: on ? '#1B6B35' : '#4A4766',
              used: u.n ? 'Used on ' + u.n + (u.n === 1 ? ' deal' : ' deals') + (u.p ? ' · ' + u.p + (u.p === 1 ? ' project' : ' projects') : '') : 'Not used yet',
              toggleTxt: on ? 'Deactivate' : 'Activate', toggleA: (on ? 'Deactivate ' : 'Activate ') + it.name,
              toggle: canEdit ? () => this.updSettings((st) => { st[lk][i].active = !on; }, it.name + (on ? ' deactivated. Existing quotes keep it.' : ' activated')) : noop,
              rename: canEdit ? (e) => { const v = e.target.value; this.updSettings((st) => { st[lk][i].name = v; }); } : noop,
              canDelete: canEdit && !u.n, delA: 'Delete ' + it.name, del: canEdit && !u.n ? () => this.updSettings((st) => { st[lk].splice(i, 1); }, it.name + ' deleted') : noop }; });
          const nP = String(s.newPr || '').trim(), nS = String(s.newSv || '').trim();
          const dupP = (SET.practices || []).some((x0) => x0.name.toLowerCase() === nP.toLowerCase()), dupS = (SET.serviceLines || []).some((x0) => x0.name.toLowerCase() === nS.toLowerCase());
          return { catPr: rows('practices', 'practice', 'Practice'), catSv: rows('serviceLines', 'svc', 'Service line'),
            newPr: s.newPr || '', setNewPr: (e) => { const v = e.target.value; this.setState({ newPr: v }); }, addPrOff: !nP || dupP || !canEdit, addPrB: B(nP && !dupP && canEdit ? 'secondary' : 'off'),
            addPr: nP && !dupP && canEdit ? () => { this.updSettings((st) => { st.practices.push({ id: 'pr-' + Date.now(), name: nP, active: true }); }, nP + ' added'); this.setState({ newPr: '' }); } : noop,
            newSv: s.newSv || '', setNewSv: (e) => { const v = e.target.value; this.setState({ newSv: v }); }, addSvOff: !nS || dupS || !canEdit, addSvB: B(nS && !dupS && canEdit ? 'secondary' : 'off'),
            addSv: nS && !dupS && canEdit ? () => { this.updSettings((st) => { st.serviceLines.push({ id: 'sv-' + Date.now(), name: nS, active: true }); }, nS + ' added'); this.setState({ newSv: '' }); } : noop }; })(),
        tabs: [['general', 'General']].concat(canEdit ? [['users', 'Users and roles'], ['catalog', 'Practices and services']] : []).map(([k, l]) => ({ label: l, sel: setTab === k ? 'true' : 'false', bg: setTab === k ? '#14112E' : '#FFFFFF', fg: setTab === k ? '#FFFFFF' : '#14112E', bd: setTab === k ? '#14112E' : '#CFCAE3', go: () => this.setState({ setTab: k }) })),
        userCount: UL.filter((u) => (u.status || 'Active') === 'Active').length + ' active · ' + UL.filter((u) => u.status === 'Invited').length + ' invited',
        roleOpts: RL.map((r) => ({ v: r.name, label: r.name })),
        userRows: (canEdit ? UL : []).map((u0, i) => { const self = u0.name === ME, st0 = u0.status || 'Active', pl = st0 === 'Active' ? P.green : st0 === 'Invited' ? P.amber : P.gray;
          return { name: u0.name, email: u0.email || '—', role: u0.role, roleA: 'Role for ' + u0.name, roleOff: self, status: st0, pillBg: pl.bg, pillFg: pl.fg,
            actTxt: st0 === 'Active' ? 'Deactivate' : 'Activate', actA: (st0 === 'Active' ? 'Deactivate ' : 'Activate ') + u0.name, actOff: self, actB: B(self ? 'off' : 'secondary'),
            setRole: self ? noop : (e) => { const v = e.target.value; this.updSettings((st) => { st.users[i].role = v; }, u0.name + ' is now ' + v); },
            hasNote: !!u0.resetAt, note: u0.resetAt ? (st0 === 'Invited' ? 'Invite resent ' : 'Reset link sent ') + u0.resetAt : '',
            impOff: self || st0 !== 'Active', impB: B(self || st0 !== 'Active' ? 'off' : 'secondary'), impA: 'Impersonate ' + u0.name,
            imp: self || st0 !== 'Active' ? noop : () => { const by = ME; this.setState({ imp: by, me: u0.name, role: u0.role === 'Admin' ? 'admin' : 'ae', screen: 'home', modal: '', taskOpen: '' }); this.flash('Now impersonating ' + u0.name); },
            resetTxt: st0 === 'Invited' ? 'Resend invite' : 'Reset password', resetOff: st0 === 'Deactivated', resetB: B(st0 === 'Deactivated' ? 'off' : 'secondary'), resetA: (st0 === 'Invited' ? 'Resend invite to ' : 'Send a password reset link to ') + u0.name,
            reset: st0 === 'Deactivated' ? noop : () => this.updSettings((st) => { st.users[i].resetAt = new Date().toISOString().slice(0, 10); }, (st0 === 'Invited' ? 'Invite resent to ' : 'Password reset link sent to ') + (u0.email || u0.name)),
            act: self ? noop : () => this.updSettings((st) => { st.users[i].status = st0 === 'Active' ? 'Deactivated' : 'Active'; }, u0.name + (st0 === 'Active' ? ' deactivated' : ' activated')) }; }),
        inv: { name: invF.name || '', email: invF.email || '', role: invRole, hasErr: !!invErr, err: invErr, off: !invOk, b: B(invOk ? 'primary' : 'off'),
          setName: (e) => { const v = e.target.value; this.setState((st) => ({ invForm: { ...(st.invForm || {}), name: v } })); },
          setEmail: (e) => { const v = e.target.value; this.setState((st) => ({ invForm: { ...(st.invForm || {}), email: v } })); },
          setRole: (e) => { const v = e.target.value; this.setState((st) => ({ invForm: { ...(st.invForm || {}), role: v } })); },
          send: invOk ? () => { this.updSettings((st) => { st.users.push({ name: invName, email: invEmail, role: invRole, status: 'Invited' }); }, 'Invite sent to ' + invEmail); this.setState({ invForm: {} }); } : noop },
        gridCols: '150px repeat(' + RL.length + ', minmax(96px, 1fr))', matrixMin: (150 + RL.length * 104) + 'px',
        roleCols: RL.map((r, ci) => { const n = UL.filter((u) => u.role === r.name && u.status !== 'Deactivated').length;
          return { name: r.name, count: String(n), canRemove: canEdit && !r.locked && !r.builtin && n === 0, removeA: 'Remove role ' + r.name,
            remove: canEdit && !r.locked && !r.builtin && n === 0 ? () => this.updSettings((st) => { st.roles.splice(ci, 1); }, 'Role ' + r.name + ' removed') : noop }; }),
        ...(() => { const pr = RL.find((r) => r.name === s.permRole) || RL.find((r) => !r.locked) || RL[0], pi = RL.indexOf(pr), lkR = !!pr.locked || !canEdit;
          const CELLF = (on, label, toggle) => ({ has: true, na: false, on: on ? 'true' : 'false', txt: pr.locked ? 'Always' : on ? 'Allowed' : 'Not allowed', bg: on ? '#E2F4E6' : '#FFFFFF', fg: on ? '#1B6B35' : '#5E5A78', bd: on ? '#BFE3C8' : '#CFCAE3', cur: lkR ? 'default' : 'pointer', off: lkR, a: label + ' for ' + pr.name + ': ' + (on ? 'allowed' : 'not allowed'), toggle: lkR ? noop : toggle });
          const OPN = { v: 'View', c: 'Create', e: 'Edit', d: 'Delete' };
          return { permTabs: RL.map((r) => ({ label: r.name, sel: r === pr ? 'true' : 'false', bg: r === pr ? '#14112E' : '#FFFFFF', fg: r === pr ? '#FFFFFF' : '#14112E', bd: r === pr ? '#14112E' : '#CFCAE3', go: () => this.setState({ permRole: r.name }) })),
            crudRows: [['leads', 'Leads', 'vce', 'Assigned = lead owner'], ['deals', 'Deals', 'vce', 'Assigned = on the deal team'], ['quotes', 'Quotes', 'vce', ''], ['tasks', 'Tasks', 'vced', 'On leads, deals and projects'], ['activities', 'Activities', 'vced', 'Meetings, calls, emails, notes and next steps'], ['projects', 'Projects', 've', 'Assigned = on the project or deal team. Created at Closed Won'], ['companies', 'Companies', 'vce', ''], ['contacts', 'Contacts', 'vce', ''], ['files', 'Files', 'vcd', 'Files and links on deals'], ['time', 'Time entries', 'cd', 'Own time on tasks and activities']].map(([k, l, ops, note]) => ({ label: l, note, hasNote: !!note, cells: ['v', 'c', 'e', 'd'].map((o) => { if (ops.indexOf(o) < 0) return { has: false, na: true, a: OPN[o] + ' ' + l + ': not available', off: true, toggle: noop };
              const on = !!pr.locked || !!((pr.crud || {})[k] || {})[o];
              const sk = o + 's', scoped = ['leads', 'deals', 'projects'].indexOf(k) >= 0 && (o === 'v' || o === 'e'), sc = pr.locked ? 'all' : (((pr.crud || {})[k] || {})[sk] || (k === 'leads' ? 'all' : 'own'));
              return { ...CELLF(on, OPN[o] + ' ' + l, () => this.updSettings((st) => { const rr = st.roles[pi]; rr.crud = rr.crud || this.defaultCrud(rr.name, rr); rr.crud[k] = { ...(rr.crud[k] || {}), [o]: !on }; if (o === 'v') rr.menu = { ...(rr.menu || {}), [k]: !on }; }, OPN[o] + ' ' + l.toLowerCase() + (on ? ' turned off for ' : ' allowed for ') + pr.name)),
                hasScope: scoped && on, scope: sc, scopeOff: lkR, scopeA: OPN[o] + ' scope for ' + l + ', ' + pr.name,
                setScope: lkR ? noop : (e) => { const v = e.target.value === 'all' ? 'all' : 'own'; this.updSettings((st) => { const rr = st.roles[pi]; rr.crud = rr.crud || this.defaultCrud(rr.name, rr); rr.crud[k] = { ...(rr.crud[k] || {}), [sk]: v }; }, pr.name + ': ' + OPN[o].toLowerCase() + ' ' + (v === 'all' ? 'all ' : 'assigned ') + l.toLowerCase()); } }; }) })),
            specGroups: [['Deal actions', [['dealStage', 'Move stages, close and reopen'], ['dealPath', 'Mark off Path to close'], ['dealDrd', 'Approve DRD items'], ['dealForecast', 'Set the forecast category']]], ['Lead actions', [['leadConvert', 'Convert leads to deals'], ['leadReassign', 'Reassign any lead (owners can always reassign their own)']]], ['Project actions', [['projectDates', 'Edit engagement and contract dates'], ['projectLifecycle', 'Start and close projects']]]].map(([gt, list]) => ({ title: gt, rows: list.map(([k, l]) => { const on = !!pr.locked || !!(pr.acts || {})[k];
              return { label: l, cells: [CELLF(on, l, () => this.updSettings((st) => { const rr = st.roles[pi]; rr.acts = { ...(rr.acts || this.defaultActs(rr.name)), [k]: !on }; }, l + (on ? ': turned off for ' : ': allowed for ') + pr.name))] }; }) })) }; })(),
        actGroupsOld: ['Deals', 'Leads', 'Tasks'].map((g) => ({ title: g, rows: [['dealStage', 'Deals', 'Move stages, close and reopen deals'], ['dealPath', 'Deals', 'Mark off Path to close steps'], ['dealDrd', 'Deals', 'Approve DRD items'], ['dealQuotes', 'Deals', 'Open, create and edit quotes'], ['dealForecast', 'Deals', 'Set the forecast category'], ['leadCreate', 'Leads', 'Create leads'], ['tasks', 'Tasks', 'Create tasks'], ['logTime', 'Tasks', 'Log time on own tasks']].filter((a) => a[1] === g).map(([k, , l]) => ({ label: l, cells: RL.map((r, ci) => { const on = !!r.locked || !!(r.acts || {})[k], lk = !!r.locked || !canEdit;
          return { on: on ? 'true' : 'false', txt: r.locked ? 'Always' : on ? 'Allowed' : 'Not allowed', bg: on ? '#E2F4E6' : '#FFFFFF', fg: on ? '#1B6B35' : '#5E5A78', bd: on ? '#BFE3C8' : '#CFCAE3', cur: lk ? 'default' : 'pointer', off: lk,
            a: l + ' for ' + r.name + ': ' + (on ? 'allowed' : 'not allowed'),
            toggle: lk ? noop : () => this.updSettings((st) => { const rr = st.roles[ci]; rr.acts = { ...(rr.acts || this.defaultActs(rr.name)), [k]: !on }; }, l + (on ? ': turned off for ' : ': allowed for ') + r.name) }; }) })) })),
        menuRows: MENU.map(([k, l]) => ({ label: l, cells: RL.map((r, ci) => { const on = !!r.locked || !!(r.menu || {})[k], lk = !!r.locked || !canEdit;
          return { on: on ? 'true' : 'false', txt: r.locked ? 'Always' : on ? 'Shown' : 'Hidden', bg: on ? '#E2F4E6' : '#FFFFFF', fg: on ? '#1B6B35' : '#5E5A78', bd: on ? '#BFE3C8' : '#CFCAE3', cur: lk ? 'default' : 'pointer', off: lk,
            a: l + ' for ' + r.name + ': ' + (on ? 'shown' : 'hidden'),
            toggle: lk ? noop : () => this.updSettings((st) => { const rr = st.roles[ci]; rr.menu = { ...(rr.menu || {}), [k]: !on }; if (rr.crud && rr.crud[k]) rr.crud[k] = { ...rr.crud[k], v: !on }; }, l + (on ? ' hidden for ' : ' shown for ') + r.name) }; }) })),
        newRole: s.newRole || '', setNewRole: (e) => { const v = e.target.value; this.setState({ newRole: v }); },
        addRoleOff: !nrl || !canEdit || RL.some((r) => r.name.toLowerCase() === nrl.toLowerCase()), addRoleB: B(nrl && canEdit && !RL.some((r) => r.name.toLowerCase() === nrl.toLowerCase()) ? 'secondary' : 'off'),
        addRole: nrl && canEdit && !RL.some((r) => r.name.toLowerCase() === nrl.toLowerCase()) ? () => { this.updSettings((st) => { st.roles.push({ name: nrl, menu: { home: true, companies: true, contacts: true, leads: false, deals: true, projects: true, settings: false }, acts: this.defaultActs(nrl), crud: this.defaultCrud(nrl, null) }); }, 'Role ' + nrl + ' added'); this.setState({ newRole: '' }); } : noop,
        pathRows: SET.pathSteps.map((p0, i) => { const HOW = { se: 'Done when an SE is chosen', drd: 'Done when every DRD item is approved', sent: 'Done when the proposal is marked sent', quote: 'Done when a quote is accepted', signed: 'Done when the proposal is marked signed', paid: 'Done when payment is marked received' };
          return { n: String(i + 1), label: p0.label, labelA: 'Path to close step ' + (i + 1), kind: p0.custom ? 'Manual' : 'Automatic', kindFg: p0.custom ? '#8A4B00' : '#1B6B35', how: p0.custom ? 'Marked done on the deal' : HOW[p0.key] || '',
            on: p0.on ? 'true' : 'false', onTxt: p0.on ? 'Required' : 'Off', onBg: p0.on ? '#E2F4E6' : '#FFFFFF', onFg: p0.on ? '#1B6B35' : '#4A4766', toggleA: (p0.on ? 'Turn off ' : 'Require ') + (p0.label || 'step ' + (i + 1)),
            canRemove: canEdit && !!p0.custom, noRemove: !(canEdit && !!p0.custom), removeA: 'Remove ' + (p0.label || 'step ' + (i + 1)),
            set: (e) => { const v = e.target.value; this.updSettings((st) => { st.pathSteps[i].label = v; }); },
            toggle: canEdit ? () => this.updSettings((st) => { st.pathSteps[i].on = !st.pathSteps[i].on; }, (p0.label || 'Step') + (p0.on ? ' turned off' : ' is required again')) : noop,
            remove: canEdit && p0.custom ? () => this.updSettings((st) => { st.pathSteps.splice(i, 1); }, (p0.label || 'Step') + ' removed') : noop }; }),
        newPath: s.newPath || '', setNewPath: (e) => { const v = e.target.value; this.setState({ newPath: v }); },
        addPathOff: !npt || !canEdit, addPathB: B(npt && canEdit ? 'secondary' : 'off'),
        addPath: npt && canEdit ? () => { const r = String(this.state.newPath || '').trim(); this.updSettings((st) => { const pi = st.pathSteps.findIndex((u) => u.key === 'paid'); st.pathSteps.splice(pi < 0 ? st.pathSteps.length : pi, 0, { key: 'c' + Date.now(), label: r, on: true, custom: true }); }, r + ' added to the path to close'); this.setState({ newPath: '' }); } : noop,
        ...(() => { const OB = SET.onboarding || [], N = OB.length + 1, nob = String(s.newOnb || '').trim();
          const mv = (from, to) => { if (!canEdit || from < 1 || to < 1 || from >= N || to >= N || from === to) return; this.updSettings((st) => { const [x0] = st.onboarding.splice(from - 1, 1); st.onboarding.splice(to - 1, 0, x0); }, 'Onboarding checklist reordered'); };
          const rows = ['__drd__'].concat(OB).map((l0, i) => ({ n: String(i + 1), text: i === 0 ? 'Promote approved DRD items' : l0, locked: i === 0 || !canEdit, bg: i === 0 ? '#F6F5FB' : '#FFFFFF', label: 'Onboarding item ' + (i + 1),
            canRemove: canEdit && i > 0, removeA: 'Remove onboarding item ' + (i + 1), canMove: canEdit && i > 0, drag: canEdit && i > 0 ? 'true' : 'false', grabCur: canEdit && i > 0 ? 'grab' : 'default',
            upOff: i <= 1, downOff: i === 0 || i >= N - 1, upA: 'Move onboarding item ' + (i + 1) + ' up', downA: 'Move onboarding item ' + (i + 1) + ' down', up: () => mv(i, i - 1), down: () => mv(i, i + 1),
            dropBg: s.ckDragOver === 's' + i ? '#F3F0FE' : 'transparent',
            dragStart: (e) => { this._obDrag = i; try { e.dataTransfer.effectAllowed = 'move'; e.dataTransfer.setData('text/plain', String(i)); } catch (er) {} },
            dragOver: (e) => { if (canEdit && i > 0 && this._obDrag !== undefined) { e.preventDefault(); if (this.state.ckDragOver !== 's' + i) this.setState({ ckDragOver: 's' + i }); } },
            drop: (e) => { e.preventDefault(); const f = this._obDrag; this._obDrag = undefined; this.setState({ ckDragOver: '' }); if (f !== undefined) mv(f, i); },
            dragEnd: () => { this._obDrag = undefined; this.setState({ ckDragOver: '' }); },
            set: (e) => { const v = e.target.value; if (canEdit && i > 0) this.updSettings((st) => { st.onboarding[i - 1] = v; }); },
            remove: canEdit && i > 0 ? () => this.updSettings((st) => { st.onboarding.splice(i - 1, 1); }, 'Onboarding item removed') : noop }));
          return { onbRows: rows, newOnb: s.newOnb || '', setNewOnb: (e) => { const v = e.target.value; this.setState({ newOnb: v }); }, addOnbOff: !nob || !canEdit, addOnbB: B(nob && canEdit ? 'secondary' : 'off'),
            addOnb: nob && canEdit ? () => { this.updSettings((st) => { st.onboarding.push(nob); }, 'Onboarding item added. New projects will include it.'); this.setState({ newOnb: '' }); } : noop }; })(),
        tplRows: (canEdit ? SET.dealTasks || [] : []).map((t0, i) => ({ title: t0.title, days: t0.days === undefined || t0.days === '' ? '' : String(t0.days), who: t0.owner === 'owner' ? 'owner' : '',
          titleA: 'Template task ' + (i + 1), daysA: 'Due, days after the deal is created, for ' + (t0.title || 'task ' + (i + 1)), whoA: 'Assignee for ' + (t0.title || 'task ' + (i + 1)), removeA: 'Remove ' + (t0.title || 'task ' + (i + 1)),
          setTitle: (e) => { const v = e.target.value; this.updSettings((st) => { st.dealTasks[i].title = v; }); },
          setDays: (e) => { const raw = String(e.target.value).trim(); this.updSettings((st) => { st.dealTasks[i].days = raw === '' ? '' : Math.max(0, Math.min(365, parseInt(raw, 10) || 0)); }); },
          setWho: (e) => { const v = e.target.value === 'owner' ? 'owner' : ''; this.updSettings((st) => { st.dealTasks[i].owner = v; }); },
          remove: canEdit ? () => this.updSettings((st) => { st.dealTasks.splice(i, 1); }, 'Template task removed. Existing deals keep it.') : noop })),
        tplEmpty: canEdit && !(SET.dealTasks || []).length,
        newTpl: s.newTpl || '', setNewTpl: (e) => { const v = e.target.value; this.setState({ newTpl: v }); },
        addTplOff: !ntp || !canEdit, addTplB: B(ntp && canEdit ? 'secondary' : 'off'),
        addTpl: ntp && canEdit ? () => { const r = String(this.state.newTpl || '').trim(); this.updSettings((st) => { st.dealTasks.push({ title: r, days: '', owner: 'owner' }); }, 'Template task added. New deals will include it.'); this.setState({ newTpl: '' }); } : noop,
        defaultCost: String(SET.defaultCost), setDefaultCost: (e) => { const v = Math.max(0, Math.min(99999, parseFloat(e.target.value) || 0)); this.updSettings((st) => { st.defaultCost = v; }); },
        defaultValue: String(SET.defaultValue || ''), setDefaultValue: (e) => { const v = parseInt(String(e.target.value).replace(/[^0-9]/g, ''), 10) || 0; this.updSettings((st) => { st.defaultValue = v; }); },
        expOpts: EXP.map(([k, title, sub]) => { const on = expRule === k; return { title, sub, on: on ? 'true' : 'false', bd: on ? accent : '#E4E1F0', bg: on ? '#F3F0FE' : '#FFFFFF', dot: on ? accent : 'transparent', ring: on ? accent : '#B8B3CE',
          pick: canEdit ? () => this.updSettings((st) => { st.expansion = { rule: k }; }, 'Expansion rule set to ' + title.toLowerCase()) : noop }; }),
        canEdit, readOnly: !canEdit,
        sub: canEdit ? 'Changes apply to every user straight away.' : '',
        paths: PATHS.map(([k, title, sub]) => {
          const rule = SET.lead[k] || { items: [], minYes: 0 }, n = rule.items.length, min = Math.min(Number(rule.minYes) || 0, n);
          const nv = String((s.newRule || {})[k] || '').trim();
          return {
            title, sub, minId: 'set-min-' + k, min: String(min), none: !n,
            minOpts: Array.from({ length: n + 1 }, (_, i) => ({ v: String(i), label: i === 0 ? 'None. Converts right away' : i === n ? 'All ' + n + ' (' + i + ' of ' + n + ')' : i + ' of ' + n })),
            setMin: (e) => { const v = parseInt(e.target.value, 10) || 0; this.updSettings((st) => { st.lead[k].minYes = v; }, 'Rule updated: ' + v + ' of ' + n + ' Yes answers needed'); },
            items: rule.items.map((it, i) => ({ n: String(i + 1), text: it.label, label: 'Question ' + (i + 1) + ', ' + title, removeLabel: 'Remove question ' + (i + 1), canRemove: canEdit,
              set: (e) => { const v = e.target.value; this.updSettings((st) => { st.lead[k].items[i].label = v; }); },
              remove: () => this.updSettings((st) => { st.lead[k].items.splice(i, 1); st.lead[k].minYes = Math.min(Number(st.lead[k].minYes) || 0, st.lead[k].items.length); }, 'Question removed') })),
            newLabel: 'New question, ' + title, newItem: (s.newRule || {})[k] || '',
            setNew: (e) => { const v = e.target.value; this.setState((st) => ({ newRule: { ...(st.newRule || {}), [k]: v } })); },
            addOff: !nv || !canEdit, addB: B(nv && canEdit ? 'secondary' : 'off'),
            add: nv && canEdit ? () => { const t = String((this.state.newRule || {})[k] || '').trim(); this.updSettings((st) => { st.lead[k].items.push({ key: 'q' + Date.now(), label: t }); }, 'Question added'); this.setState((st) => ({ newRule: { ...(st.newRule || {}), [k]: '' } })); } : noop
          };
        })
      };
    })();

    const comboOf = (key, val, form) => { const q = String(val || '').trim().toLowerCase(), open = s.combo === key;
      const matches = companyNames.filter((n) => !q || n.toLowerCase().indexOf(q) >= 0).slice(0, 6), exact = companyNames.some((n) => n.toLowerCase() === q);
      return { open, exp: open ? 'true' : 'false', hasNew: !!q && !exact, none: !matches.length && !q, newLabel: 'Use "' + String(val || '').trim() + '" as a new company',
        openIt: () => this.setState({ combo: key }), pickNew: () => this.setState({ combo: '' }),
        opts: matches.map((n) => ({ label: n, sub: coCode(n) + ' · ' + (compMap[n].industry || 'Industry not set'), sel: n.toLowerCase() === q ? 'true' : 'false', bg: n.toLowerCase() === q ? '#F3F0FE' : 'transparent',
          pick: () => this.setState((st) => ({ [form]: { ...(st[form] || {}), company: n }, combo: '' })) })) }; };
    const dView = s.dealView === 'board' ? 'board' : 'table';
    const dl = {
      isBoard: dView === 'board', isTable: dView === 'table', boardOn: dView === 'board' ? 'true' : 'false', tableOn: dView === 'table' ? 'true' : 'false',
      boardBg: dView === 'board' ? '#FFFFFF' : 'transparent', tableBg: dView === 'table' ? '#FFFFFF' : 'transparent',
      showBoard: () => this.setState({ dealView: 'board' }), showTable: () => this.setState({ dealView: 'table' }),
      newDeal: () => !cDealC ? this.flash('Your role can\'t create deals.') : this.setState({ modal: 'deal', dealForm: { owner: 'Dilbag Singh', source: 'Direct', type: 'new' } }),
      rows: all.slice().sort((a1, b1) => a1.stage - b1.stage || String(a1.d.expectedClose || '9').localeCompare(String(b1.d.expectedClose || '9'))).map((y) => ({
        code: dealCode(y.d), name: y.d.name, company: y.d.company, stage: STAGES[y.stage], pill: y.d.lost ? LOSTP : y.d.closed ? P.green : P.violet,
        type: isExpDeal(y.d) ? 'Expansion' : 'New business', value: money(y.total), fcat: y.d.fcat ? y.d.fcat + (y.d.prob !== undefined && y.d.prob !== '' ? ' · ' + y.d.prob + '%' : '') : '—',
        close: y.d.expectedClose || '—', owner: y.d.owner, open: () => this.openDeal(y.d.id) }))
    };
    const df = s.dealForm || {}, trd = (v) => String(v || '').trim();
    const ndCo0 = trd(df.company), ndCo = companyNames.find((n) => n.toLowerCase() === ndCo0.toLowerCase()) || ndCo0, ndKnown = companyNames.indexOf(ndCo) >= 0;
    const ndAutoExp = D.deals.some((o) => o.company === ndCo && o.closed);
    const ndMiss = [['company', 'company'], ['name', 'deal name'], ['first', 'first name'], ['last', 'last name']].filter(([k]) => !trd(df[k])).map((r) => r[1]);
    const ndOk = !ndMiss.length;
    const setD = (k) => (e) => { const v = e.target.value; this.setState((st) => ({ dealForm: { ...(st.dealForm || {}), [k]: v } })); };
    const nd = {
      company: df.company || '', name: df.name || '', first: df.first || '', last: df.last || '', email: df.email || '', phone: df.phone || '', owner: df.owner || 'Dilbag Singh',
      source: df.source || 'Direct', close: df.close || '', forecast: df.forecast || '', fcPh: 'Default ' + money(SET.defaultValue || 0), type: df.type || 'new',
      combo: comboOf('nd-co', df.company, 'dealForm'),
      setCompany: (e) => { const v = e.target.value; this.setState((st) => ({ dealForm: { ...(st.dealForm || {}), company: v }, combo: 'nd-co' })); }, setName: setD('name'), setFirst: setD('first'), setLast: setD('last'), setEmail: setD('email'), setPhone: setD('phone'), setOwner: setD('owner'),
      setSource: setD('source'), setClose: setD('close'), setForecast: setD('forecast'), setType: setD('type'),
      companyOpts: companyNames.map((n) => ({ v: n })), companyNote: !ndCo ? 'Pick an existing company or type a new one.' : ndKnown ? 'Existing company. Its contacts and details carry over.' : 'New company. It will be created with this deal.',
      companyFg: ndKnown ? '#1B6B35' : '#5E5A78',
      ownerOpts: this.PEOPLE.filter((pp) => pp.role === 'Account executive').map((pp) => ({ v: pp.name, label: pp.name })),
      sourceOpts: ['Direct', 'Existing customer'].concat(this.SOURCES).map((v) => ({ v, label: v })),
      typeManual: expRule === 'manual', typeAuto: expRule !== 'manual',
      typeText: ndCo ? (ndAutoExp ? 'Expansion: ' + ndCo + ' already has a Closed Won deal.' : 'New business: no won deals with ' + ndCo + ' yet.') : 'Deal type is set automatically once you pick the company.',
      hint: ndOk ? 'No lead needed. The deal starts at New deal.' : 'Still needed: ' + ndMiss.join(', '), hintFg: ndOk ? '#1B6B35' : '#5E5A78',
      off: !ndOk, b: B(ndOk ? 'primary' : 'off'), save: ndOk ? () => this.createDeal() : noop
    };

    const chatInfo = (on) => {
      if (!on) return null;
      const dd = D.deals.find((z) => z.id === (on.deal || on.id));
      if (on.type === 'ltask') { const l = D.leads.find((z) => z.id === on.lead), t = l && (l.tasks || []).find((z) => z.id === on.id); return t ? { kind: 'Lead task', name: t.title, sub: l.company } : null; }
      if (on.type === 'lead') { const l = D.leads.find((z) => z.id === on.id); return l ? { kind: 'Lead', name: l.company, sub: leadCode(l) + (l.contact ? ' · ' + l.contact : '') } : null; }
      if (on.type === 'deal') return dd ? { kind: 'Deal', name: dd.company + ' · ' + dd.name, sub: dealCode(dd) + ' · ' + (STAGES[(all.find((y) => y.d.id === dd.id) || {}).stage] || '') } : null;
      if (on.type === 'company') return { kind: 'Company', name: on.id, sub: coCode(on.id) };
      if (on.type === 'contact') { const pr = String(on.id).split('|'); return { kind: 'Contact', name: pr[1], sub: pr[0] }; }
      if (on.type === 'dact') { const a0 = dd && (dd.activities || []).find((z) => z.id === on.id); return a0 ? { kind: 'Deal activity', name: a0.title, sub: dd.company + ' · ' + dealCode(dd) } : null; }
      if (on.type === 'dtask') { const t0 = dd && (dd.tasks || []).find((z) => z.id === on.id); return t0 ? { kind: 'Deal task', name: t0.title, sub: dd.company + ' · ' + dealCode(dd) } : null; }
      if (on.type === 'drd') { const r0 = dd && (dd.drd || [])[parseInt(String(on.id).split('-')[1], 10)]; return r0 ? { kind: 'DRD item', name: r0.req, sub: dd.company + ' · ' + dealCode(dd) } : null; }
      if (!dd || !dd.project) return null;
      const pj = this.projectFull(dd);
      if (on.type === 'project') return { kind: 'Project', name: dd.company + ' project', sub: pj.id };
      if (on.type === 'ms') { const m = pj.milestones.find((z) => z.id === on.id); return m ? { kind: 'Phase', name: m.name, sub: dd.company + ' · ' + pj.id } : null; }
      const t = pj.tasks.find((z) => z.id === on.id), tm = t ? pj.milestones.find((z) => z.id === t.ms) : null;
      return t ? { kind: 'Task', name: t.name, sub: (tm ? tm.name + ' · ' : '') + dd.company } : null;
    };
    const cOn = s.chatOn || null, cInfo = chatInfo(cOn);
    const chatView = (cOn, prevOn) => {
      const cInfo = chatInfo(cOn);
      if (!cInfo) return { posts: [], b: B('off') };
      const dk = tk(cOn), draft = (s.chatDraft || {})[dk] || '', ok = !!draft.trim(), prev = chatInfo(prevOn);
      const firsts = this.PEOPLE.map((pp) => pp.name);
      const ps = CHAT.filter((p) => inScope(cOn, p)).sort((a1, b1) => String(b1.at).localeCompare(String(a1.at)));
      return { kind: cInfo.kind, count: ps.length ? String(ps.length) : '', target: cInfo.name, sub: cInfo.sub, draft, empty: !ps.length,
        roll: cOn.type === 'project' ? 'Includes posts on its tasks.' : cOn.type === 'company' ? 'Includes posts on its leads, deals, projects, contacts and tasks.' : '',
        hasBack: !!prev, backText: prev ? 'Back to ' + prev.name : '', back: () => this.setState({ chatOn: prevOn, chatPrev: null }),
        close: () => this.setState({ chatOn: null, chatPrev: null }),
        setDraft: (e) => { const v = e.target.value; this.setState((st) => ({ chatDraft: { ...(st.chatDraft || {}), [dk]: v } })); },
        off: !ok, b: B(ok ? 'primary' : 'off'),
        post: ok ? () => { const txt = String(((this.state.chatDraft || {})[dk]) || '').trim();
          const mentions = firsts.filter((n) => txt.toLowerCase().indexOf('@' + n.split(' ')[0].toLowerCase()) >= 0);
          this.setState((st) => ({ data: { ...st.data, chat: (st.data.chat || []).concat([{ id: 'c' + Date.now(), on: cOn, by: ME, at: new Date().toISOString(), text: txt, mentions }]) }, chatDraft: { ...(st.chatDraft || {}), [dk]: '' } }));
          this.flash(mentions.length ? 'Posted. ' + mentions.join(', ') + (mentions.length === 1 ? ' is' : ' are') + ' notified.' : 'Posted'); } : noop,
        posts: ps.map((p) => {
          const t = new Date(p.at), when = isNaN(t) ? '' : t.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) + ', ' + t.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
          const mine = p.by === ME, ci = tk(p.on) !== dk ? chatInfo(p.on) : null;
          return { by: mine ? p.by + ' (you)' : p.by, initials: initialsOf(p.by), when, text: p.text,
            hasMentions: (p.mentions || []).length > 0, mentionText: 'Notified: ' + (p.mentions || []).join(', '),
            hasCtx: !!ci, ctx: ci ? ci.kind + ': ' + ci.name : '', openCtx: ci ? () => this.setState({ chatOn: p.on, chatPrev: cOn }) : noop,
            canDelete: mine || isAdmin, del: () => { this.setState((st) => ({ data: { ...st.data, chat: (st.data.chat || []).filter((u) => u.id !== p.id),
              deals: st.data.deals.map((z) => ((z.chatter || []).concat(z.pchatter || [])).some((u) => u.id === p.id) ? { ...z, chatter: (z.chatter || []).filter((u) => u.id !== p.id), pchatter: (z.pchatter || []).filter((u) => u.id !== p.id) } : z) } })); this.flash('Post deleted'); } };
        }) };
    };
    const cht = cInfo ? chatView(cOn, s.chatPrev) : { posts: [], b: B('off') };
    const ncF = s.coForm || {}, ncName = String(ncF.name || '').trim();
    const ncDup = !!ncName && companyNames.some((n) => n.toLowerCase() === ncName.toLowerCase());
    const ncOk = !!ncName && !ncDup;
    const setNc = (k) => (e) => { const v = e.target.value; this.setState((st) => ({ coForm: { ...(st.coForm || {}), [k]: v } })); };
    const nc = { name: ncF.name || '', industry: ncF.industry || '', size: ncF.size || '', tier: ncF.tier || 'Starter', owner: ncF.owner || '',
      website: ncF.website || '', hq: ncF.hq || '', strategic: ncF.strategic || 'No',
      setName: setNc('name'), setIndustry: setNc('industry'), setSize: setNc('size'), setTier: setNc('tier'), setOwner: setNc('owner'),
      setWebsite: setNc('website'), setHq: setNc('hq'), setStrategic: setNc('strategic'),
      tierOpts: ['Starter', 'Growth', 'Scale', 'Enterprise'].map((v) => ({ v, label: v })),
      sizeOpts: [{ v: '', label: 'Not set' }].concat(['1–50', '50–200', '200–500', '500–2,000', '2,000+'].map((v) => ({ v, label: v }))),
      ownerOpts: [{ v: '', label: 'Not assigned yet' }].concat(this.PEOPLE.filter((pp) => pp.role === 'Account executive').map((pp) => ({ v: pp.name, label: pp.name }))),
      dupNote: ncDup ? ncName + ' already exists. Open it from the list instead.' : '', hasDup: ncDup,
      openForm: () => !cCoC ? this.flash('Your role can\'t add companies.') : this.setState({ modal: 'company', coForm: { tier: 'Starter', strategic: 'No' } }),
      off: !ncOk, b: B(ncOk ? 'primary' : 'off'),
      save: ncOk ? () => { const f = this.state.coForm || {}, nm = String(f.name).trim();
        this.updCompany(nm, (ci) => { ci.created = true; ci.website = String(f.website || '').trim(); ci.hq = String(f.hq || '').trim(); ci.industry = String(f.industry || '').trim(); ci.size = f.size || ''; ci.tier = f.tier || 'Starter'; ci.strategic = f.strategic === 'Yes'; }, nm + ' added');
        this.openCompany(nm); } : noop };

    let screen = s.screen;
    if (screen === 'company' && !cSel) screen = 'companies';
    if (screen === 'contact' && !ctSel) screen = 'contacts';
    if (screen === 'lead' && !lead) screen = 'leads';
    if (!cLeadsMenu && (screen === 'leads' || screen === 'lead')) screen = 'home';
    if (screen === 'deal' && !x) screen = 'deals';
    if (screen === 'project' && !px) screen = 'projects';
    if (!isAdmin) { const sk = { company: 'companies', contact: 'contacts', deal: 'deals', project: 'projects', lead: 'leads' }[screen] || screen; if (['home', 'companies', 'contacts', 'leads', 'deals', 'projects'].indexOf(sk) >= 0 && sk !== 'home' && !this.menuOn(SET, meU.short, sk)) screen = 'home'; }

    const tdL = screen === 'lead' && lead && s.taskOpen ? (lv.taskRows || []).find((t) => t.id === s.taskOpen) : null;
    const tdDrd = (() => {
      if (screen !== 'deal' || !x || s.drdOpen === undefined || s.drdOpen === '' || s.drdOpen === null) return null;
      const i = parseInt(s.drdOpen, 10), r = (x.d.drd || [])[i]; if (!r) return null;
      const id = x.d.id, locked = !!x.d.closed || !cDrd;
      const ok = !!r.ok;
      return { isTask: false, isDrd: true, isProj: false, kind: 'DRD item · ' + x.d.company, closeA: 'Close DRD item', nameLabel: 'Requirement', postA: 'Write a post on this DRD item',
        name: r.req, setName: locked ? noop : (e) => { const v = e.target.value; this.updDeal(id, (z) => { z.drd[i].req = v; return z; }); },
        status: ok ? 'Approved' : 'Draft', statusLabel: 'DRD status', statusBg: ok ? P.green.bg : P.gray.bg, statusFg: ok ? P.green.fg : P.gray.fg,
        statusOpts: [{ v: 'Draft', label: 'Draft' }, { v: 'Approved', label: 'Approved' }],
        setStatus: locked ? noop : (e) => { const v = e.target.value === 'Approved'; this.updDeal(id, (z) => { z.drd[i].ok = v; return z; }); },
        drdRows: [{ k: 'Pain point', v: r.pain || 'Not set' }, { k: 'Champion priority', v: r.champ || 'Not set' }, { k: 'Economic buyer priority', v: r.eb || 'Not set' }],
        reqItems: [], ownerOpts: [], on: { type: 'drd', deal: id, id: 'drd-' + i },
        close: () => this.setState({ drdOpen: '' }), del: noop };
    })();
    const tdD = screen === 'deal' && x && s.taskOpen ? ((dv.dt || {}).taskRows || []).find((t) => t.id === s.taskOpen) : null;
    const tdA = screen === 'deal' && x && s.taskOpen && !tdD ? (dv.activities || []).find((a) => a.id === s.taskOpen) : null;
    const tdBase = screen === 'project' && pv.hasTd ? { ...pv.td, isProj: true, kind: 'Task · ' + pv.td.phase, statusOpts: pv.statusOpts, ownerOpts: pv.ownerOpts, typeOpts: pv.typeOpts }
      : tdL ? { ...tdL, isProj: false, kind: 'Lead task · ' + lead.company, reqItems: [], statusOpts: lv.taskStatusOpts, ownerOpts: lv.taskOwnerOpts, on: { type: 'ltask', id: tdL.id, lead: lead.id },
        close: () => this.setState({ taskOpen: '' }), del: () => { tdL.remove(); this.setState({ taskOpen: '' }); } }
      : tdD ? { ...tdD, isProj: false, isDealTask: true, kind: 'Deal task · ' + x.d.company, reqItems: [], statusOpts: dv.dt.taskStatusOpts, ownerOpts: dv.dt.taskOwnerOpts, on: { type: 'dtask', id: tdD.id, deal: x.d.id },
        close: () => this.setState({ taskOpen: '' }), del: () => { tdD.remove(); this.setState({ taskOpen: '' }); } }
      : tdA ? { ...tdA, isTask: false, isAct: true, isProj: false, kind: 'Activity · ' + x.d.company, nameLabel: 'Activity summary', closeA: 'Close activity details', postA: 'Write a post on this activity',
        name: tdA.title, setName: tdA.setTitle, status: tdA.type, statusLabel: 'Activity type', statusBg: tdA.pill.bg, statusFg: tdA.pill.fg, setStatus: tdA.setType,
        statusOpts: ['Meeting', 'Call', 'Email', 'Note', 'Next step'].map((v) => ({ v, label: v })), ownerOpts: [], reqItems: [], on: { type: 'dact', id: tdA.id, deal: x.d.id },
        close: () => this.setState({ taskOpen: '' }), del: () => { tdA.remove(); this.setState({ taskOpen: '' }); } } : tdDrd;
    const td = tdBase ? { isTask: true, isDrd: false, closeA: 'Close task details', nameLabel: 'Task name', postA: 'Write a post on this task', ...tdBase, chat: chatView(tdBase.on, null) } : { chat: { posts: [], b: B('off') }, reqItems: [], statusOpts: [], ownerOpts: [], typeOpts: [] };
    const ACT = (() => {
      const st = D.activity || [], has = (on) => st.some((e) => e.key === 'create' && e.on.type === on.type && e.on.id === on.id);
      const born = [];
      D.leads.forEach((l) => { const on = { type: 'lead', id: l.id }; if (l.createdAt && !has(on)) born.push({ id: 'b-' + l.id, on, at: l.createdAt + 'T09:00:00', by: l.createdBy || 'Dilbag Singh', key: 'create', text: 'created the lead' }); });
      D.deals.forEach((dd) => { const on = { type: 'deal', id: dd.id }; if (dd.createdAt && !has(on)) born.push({ id: 'b-' + dd.id, on, at: dd.createdAt + 'T09:00:00', by: dd.createdBy || dd.owner || 'Dilbag Singh', key: 'create', text: dd.expansion ? 'created the expansion deal' : 'created the deal' }); });
      return st.concat(born);
    })();
    const actOn = screen === 'lead' && lead ? { type: 'lead', id: lead.id } : screen === 'deal' && x ? { type: 'deal', id: x.d.id } : screen === 'project' && px ? { type: 'project', id: px.d.id }
      : screen === 'company' && cSel ? { type: 'company', id: cSel.name } : screen === 'contact' && ctSel ? { type: 'contact', id: ctSel.company + '|' + ctSel.name } : null;
    const alog = (() => {
      const af = s.actF || {}, user = af.user || '', rng = af.range || 'any';
      const iso = (n) => { const t = new Date(); t.setDate(t.getDate() - n); return t.toISOString().slice(0, 10); };
      const since = rng === 'today' ? iso(0) : rng === '7' ? iso(6) : rng === '30' ? iso(29) : rng === 'custom' ? (af.from || '') : '', until = rng === 'custom' ? (af.to || '') : '';
      const AREAS = [
        ['Stage and status', ['stage', 'closed', 'lost', 'status', 'fcat', 'prob', 'expectedClose', 'quoteAccepted', 'paid', 'closeReason', 'closeAmount', 'checks', 'done', 'rep', 'critical', 'dealId']],
        ['People and ownership', ['owner', 'se', 'team', 'assignee', 'champions', 'eb', 'stakeholders', 'contacts', 'who', 'access', 'people']],
        ['Tasks and plan', ['tasks', 'milestones', 'ms', 'task', 'timelog', 'escalations', 'due', 'est', 'key', 'hours']],
        ['Files', ['files', 'url']],
        ['Pricing and products', ['quotes', 'lines', 'value', 'forecast', 'products', 'services', 'seats', 'lic']],
        ['Requirements and MEDDPICC', ['drd', 'reqs', 'med', 'seScope', 'seNote']],
        ['Account setup', ['billing', 'banking', 'tech', 'setup', 'tier', 'size', 'strategic']]
      ];
      const areaOf = (e) => {
        if (e.key === 'create' || e.key === 'conv' || e.key === 'del') return 'Record lifecycle';
        const root = (String(e.key).match(/^[A-Za-z]+/) || [''])[0];
        const hit = AREAS.find((a) => a[1].indexOf(root) >= 0);
        return hit ? hit[0] : 'Details';
      };
      const kindOf = (e) => {
        if (e.key === 'create') return 'Created'; if (e.key === 'conv') return 'Converted'; if (e.key === 'del') return 'Deleted';
        const sep = (String(e.key).match(/^[A-Za-z]+([:+\-])?/) || [])[1];
        return sep === '+' ? 'Added' : sep === '-' ? 'Removed' : 'Changed';
      };
      const area = af.area || '', kind = af.kind || '';
      const scoped = actOn ? ACT.filter((e) => inScope(actOn, e)) : [];
      const all = scoped;
      const dayOf = (e) => { const t = new Date(e.at); return isNaN(t) ? String(e.at).slice(0, 10) : t.getFullYear() + '-' + String(t.getMonth() + 1).padStart(2, '0') + '-' + String(t.getDate()).padStart(2, '0'); };
      const list = all.filter((e) => (!user || e.by === user) && (!area || areaOf(e) === area) && (!kind || kindOf(e) === kind) && (!since || dayOf(e) >= since) && (!until || dayOf(e) <= until)).sort((p, q) => String(q.at).localeCompare(String(p.at)));
      const areasPresent = ['Details'].concat(AREAS.map((a) => a[0])).concat(['Record lifecycle']).filter((a) => all.some((e) => areaOf(e) === a));
      const kindsPresent = ['Changed', 'Added', 'Removed', 'Created', 'Converted', 'Deleted'].filter((k0) => all.some((e) => kindOf(e) === k0));
      const fmtV = (k0, v0) => this.actFmt(k0, v0) || 'empty';
      const people = this.usersOf(s.data).map((u) => u.name).concat(all.map((e) => e.by)).filter((n, i, arr) => n && arr.indexOf(n) === i).sort();
      const setF = (k) => (e) => { const v = e.target.value; this.setState((st0) => ({ actF: { ...(st0.actF || {}), [k]: v } })); };
      const today = iso(0), yday = iso(1); let prevDay = '';
      const rows = list.map((e) => {
        const dy = dayOf(e), t = new Date(e.at), newDay = dy !== prevDay; prevDay = dy;
        const ci = tk(e.on) !== tk(actOn) ? chatInfo(e.on) : null;
        const mk = (k0, a0, b0, withField) => { const fa = this.actFmt(k0, a0), fb = this.actFmt(k0, b0);
          return { hasField: withField, field: this.actLab(k0), from: fa || 'empty', to: fb || 'empty', fromStyle: fa ? 'normal' : 'italic', toStyle: fb ? 'normal' : 'italic' }; };
        const changes = e.subs ? e.subs.map((z) => mk(z.k, z.from, z.to, true)) : e.f ? [mk(e.f, e.from, e.to, false)] : [];
        const text = e.f ? (e.from === undefined || e.from === null || e.from === '' ? 'set ' : e.to === undefined || e.to === null || e.to === '' ? 'cleared ' : 'changed ') + this.actLab(e.f) : e.text;
        const detail = e.subs ? ((e.other || []).length ? 'Also updated: ' + e.other.map((k) => this.actLab(k)).join(', ') : '') : e.detail || '';
        return { hasDay: newDay, day: dy === today ? 'Today' : dy === yday ? 'Yesterday' : isNaN(t) ? dy : t.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }),
          by: e.by, initials: initialsOf(e.by), text, changes, area: areaOf(e), kind: kindOf(e), time: isNaN(t) ? '' : t.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
          hasDetail: !!detail, detail, hasCtx: !!ci, ctx: ci ? 'In ' + ci.kind.toLowerCase() + ': ' + ci.name : '' };
      });
      return { rows, empty: !rows.length, emptyText: all.length ? 'No changes match these filters.' : 'No changes recorded yet. Edits made here will show up in this log.',
        count: rows.length + (rows.length === 1 ? ' change' : ' changes'), user, range: rng, isCustom: rng === 'custom', from: af.from || '', to: af.to || '',
        userOpts: [{ v: '', label: 'All people' }].concat(people.map((n) => ({ v: n, label: n }))),
        rangeOpts: [['any', 'Any time'], ['today', 'Today'], ['7', 'Last 7 days'], ['30', 'Last 30 days'], ['custom', 'Custom range']].map(([v, label]) => ({ v, label })),
        setUser: setF('user'), setRange: setF('range'), setFrom: setF('from'), setTo: setF('to'),
        area, kind, setArea: setF('area'), setKind: setF('kind'),
        areaOpts: [{ v: '', label: 'All areas' }].concat(areasPresent.map((a) => ({ v: a, label: a }))),
        kindOpts: [{ v: '', label: 'All change types' }].concat(kindsPresent.map((k0) => ({ v: k0, label: k0 }))),
        hasFilter: !!user || rng !== 'any' || !!area || !!kind, clear: () => this.setState({ actF: {} }) };
    })();
    const f = s.form;
    const trf = (v) => String(v || '').trim();
    const emailOk = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(trf(f.email));
    const lMiss = [['first', 'first name'], ['last', 'last name'], ['company', 'company'], ['email', 'email'], ['phone', 'phone'], ['needs', 'needs']].filter(([k]) => !trf(f[k])).map((r) => r[1]);
    const valid = !lMiss.length && emailOk;
    const known = companyNames.some((n) => n.toLowerCase() === trf(f.company).toLowerCase());
    // Duplicate-contact check: an email already on file suggests the existing contact instead of creating a second one.
    const nlEm = trf(f.email).toLowerCase(), ctHit = nlEm ? allContacts.find((ct) => String(ct.email || '').trim().toLowerCase() === nlEm) : null;
    const ctSame = !!ctHit && (trf(f.first) + ' ' + trf(f.last)).trim().toLowerCase() === String(ctHit.name).toLowerCase() && trf(f.company).toLowerCase() === String(ctHit.company).toLowerCase();
    const nlDup = { show: !!ctHit && !ctSame, linked: !!ctHit && ctSame,
      text: ctHit ? 'This contact already exists: ' + ctHit.name + ' at ' + ctHit.company + '.' : '',
      linkedText: ctHit ? 'Linked to the existing contact ' + ctHit.name + ' at ' + ctHit.company + '.' : '',
      who: ctHit ? ctHit.name + ' at ' + ctHit.company : '', openLabel: ctHit ? 'Open contact ' + ctHit.name : '',
      open: ctHit ? () => this.openContactRecord(ctHit.company, ctHit.name) : noop,
      use: ctHit ? () => { const pts = String(ctHit.name).trim().split(' ');
        this.setState((st) => ({ form: { ...st.form, first: pts[0] || '', last: pts.slice(1).join(' '), company: ctHit.company, phone: trf(st.form.phone) ? st.form.phone : (ctHit.phone || '') }, combo: '' })); } : noop };
    const chipSel2 = (on) => on ? { bg: '#14112E', fg: '#FFFFFF', bd: '#14112E' } : { bg: '#FFFFFF', fg: '#14112E', bd: '#CFCAE3' };
    const setFL = (k) => (e) => { const v = e.target.value; this.setState((st) => ({ form: { ...st.form, [k]: v } })); };
    const togF = (k, item) => () => this.setState((st) => { const cur = (st.form[k] || []); return { form: { ...st.form, [k]: cur.indexOf(item) >= 0 ? cur.filter((u) => u !== item) : cur.concat([item]) } }; });
    const nl = {
      name: (trf(f.company) || 'Company') + ' – ' + ((trf(f.first) + ' ' + trf(f.last)).trim() || 'Contact'),
      first: f.first || '', last: f.last || '', company: f.company || '', email: f.email || '', phone: f.phone || '', source: f.source || 'monday.com rep', needs: f.needs || '',
      combo: comboOf('nl-co', f.company, 'form'), prodMs: msOf('nl-prod', this.PRODUCTS, f.products, (pn) => togF('products', pn)), svcMs: msOf('nl-svc', this.SERVICES, f.services, (pn) => togF('services', pn)),
      setFirst: setFL('first'), setLast: setFL('last'), setCompany: (e) => { const v = e.target.value; this.setState((st) => ({ form: { ...st.form, company: v }, combo: 'nl-co' })); }, setEmail: setFL('email'), setPhone: setFL('phone'), setSource: setFL('source'), setNeeds: setFL('needs'),
      companyOpts: companyNames.map((n) => ({ v: n })), companyNote: !trf(f.company) ? companyNames.length + ' existing companies. Start typing to pick one.' : known ? 'Existing company. The lead joins its record.' : 'New company. It will be created with this lead.',
      companyFg: known ? '#1B6B35' : '#5E5A78', dup: nlDup,
      sourceOpts: this.SOURCES.map((v) => ({ v, label: v })),
      prodChips: this.PRODUCTS.map((pn) => { const on = (f.products || []).indexOf(pn) >= 0; return { label: pn, on: on ? 'true' : 'false', ...chipSel2(on), toggle: togF('products', pn) }; }),
      svcChips: this.SERVICES.map((pn) => { const on = (f.services || []).indexOf(pn) >= 0; return { label: pn, on: on ? 'true' : 'false', ...chipSel2(on), toggle: togF('services', pn) }; }),
      hint: lMiss.length ? 'Still needed: ' + lMiss.join(', ') : !emailOk ? 'Check the email address' : 'Ready to add', hintFg: valid ? '#1B6B35' : '#5E5A78',
      off: !valid, b: B(valid ? 'primary' : 'off'), save: valid ? () => this.saveLead() : noop
    };
    const setF = (k) => (e) => { const v = e.target.value; this.setState((st) => ({ form: { ...st.form, [k]: v } })); };
    const setC = (k) => (e) => { const v = e.target.value; this.setState((st) => ({ close: { ...st.close, [k]: v } })); };

    return {
      accent, ground,
      adminPressed: isAdmin ? 'true' : 'false', aePressed: isAdmin ? 'false' : 'true',
      roleA: isAdmin ? { bg: '#FFFFFF', fg: '#14112E' } : { bg: 'transparent', fg: '#D9D7E6' },
      roleB: isAdmin ? { bg: 'transparent', fg: '#D9D7E6' } : { bg: '#FFFFFF', fg: '#14112E' },
      me: ME, userOpts: this.usersOf(s.data).filter((u) => u.status === 'Active' || u.name === ME).map((u) => ({ v: u.name, label: u.name + ' · ' + u.short })),
      setMe: (e) => { const UL0 = this.usersOf(this.state.data), u = UL0.find((x0) => x0.name === e.target.value) || UL0[0]; this.setState({ me: u.name, role: u.role, modal: '', imp: '' }); this.flash('Signed in as ' + u.name + ' (' + u.short + ')'); },
      setAdmin: () => { this.setState({ role: 'admin' }); this.flash('Viewing as Admin'); },
      setAe: () => { this.setState({ role: 'ae' }); this.flash('Viewing as AE or SA'); },
      cl: (() => { const o = {}; ['k1', 'k2', 'k3', 'k4', 'k5', 'k6', 'k7', 'k8', 'k9', 'k10', 'k11', 'k12', 'k13', 'k14', 'k15', 'k16', 'k17', 'k18', 'k19', 'k20', 'k21', 'k22', 'k23', 'k24', 'k25', 'k26', 'k27', 'k28', 'k29', 'k30', 'k31', 'k32', 'k33', 'k34', 'k35', 'k36', 'k37', 'k38', 'k39', 'k40', 'k41', 'k42', 'k43', 'k44', 'k45', 'k46', 'k47', 'k48', 'k49', 'k50'].forEach((k) => { o[k] = clOf(k); }); return o; })(),
      cht, hasCht: !!cInfo, td, hasTd: !!tdBase, alog, sideOpen: !s.sideHidden, sideHiddenA: s.sideHidden ? 'true' : 'false', sideLabel: s.sideHidden ? 'Show side panel' : 'Hide side panel', toggleSide: () => this.setState((st) => ({ sideHidden: !st.sideHidden })),
      isAe: !isAdmin, isAdmin, isSettings: screen === 'settings', setv, isContact: screen === 'contact' && !!ctSel, ctv, goContacts: () => this.setState({ screen: 'contacts' }),
      askReset: () => this.setState({ modal: 'reset' }), doReset: () => this.doReset(), closeModal: () => this.setState({ modal: '', combo: '' }),
      qv, navOpen: s.navOpen !== false, navExpanded: s.navOpen !== false ? 'true' : 'false', navLabel: s.navOpen !== false ? 'Collapse menu' : 'Expand menu',
      toggleNav: () => this.setState((st) => ({ navOpen: st.navOpen === false })),
      secs: ['summary', 'buying', 'path', 'med', 'mix'].reduce((o, k) => { const on = !(s.secs && s.secs[k] === false); o[k] = { open: on, exp: on ? 'true' : 'false', rot: on ? '90deg' : '0deg', pb: on ? '4px' : '18px', pad: on ? '12px 20px 20px' : '8px 20px', toggle: () => this.setState((st) => ({ secs: { ...(st.secs || {}), [k]: !on } })) }; return o; }, {}),
      modalLost: s.modal === 'lost' && !!x,
      lv2: (() => {
        const f = s.lostForm || { reason: '', competitor: '', note: '' }, ok = !!f.reason;
        return { company: x ? x.d.company : '', reason: f.reason, competitor: f.competitor, note: f.note, showCompetitor: f.reason === 'Lost to a competitor', off: !ok, b: ok ? { bg: '#9E2A30', fg: '#FFFFFF', bd: '#9E2A30', cur: 'pointer' } : B('off'),
          confirm: ok && x ? () => {
            const from = x.stage;
            this.updDeal(x.d.id, (z) => { z.lost = { reason: f.reason, competitor: f.reason === 'Lost to a competitor' ? f.competitor.trim() : '', note: f.note.trim(), from: Math.min(from, 2) }; return z; }, x.d.company + ' marked Closed Lost · ' + f.reason.toLowerCase());
            this.setState({ modal: '' });
          } : noop };
      })(),
      af, ff, tv, modalTime: s.modal === 'time' && !!px, modalDTime: s.modal === 'dtime' && screen === 'deal' && !!x,
      setTDate: setForm('timeForm', 'date'), setTHours: setForm('timeForm', 'hours'), setTRole: setForm('timeForm', 'role'), setTNote: setForm('timeForm', 'note'),
      setTMs: (e) => { const v = e.target.value; this.setState((st) => ({ timeForm: { ...(st.timeForm || {}), ms: v, task: '' } })); },
      setTSvc: (e) => { const v = e.target.value; this.setState((st) => ({ timeForm: { ...(st.timeForm || {}), svc: v } })); },
      setTTask: (e) => { const v = e.target.value; this.setState((st) => ({ timeForm: { ...(st.timeForm || {}), task: v } })); },
      setNewTask: (e) => { const v = e.target.value; this.setState({ newTask: v }); },
      setNewCheck: (e) => { const v = e.target.value; this.setState({ newCheck: v }); },
      setNewMsName: (e) => { const v = e.target.value; this.setState({ newMsName: v }); }, setNewMsDue: (e) => { const v = e.target.value; this.setState({ newMsDue: v }); },
      setActType: setForm('actForm', 'type'), setActDate: setForm('actForm', 'date'), setActTitle: setForm('actForm', 'title'), setActDetails: setForm('actForm', 'details'),
      setFileUrl: setForm('fileForm', 'url'), setFileName: setForm('fileForm', 'name'), setFileCat: setForm('fileForm', 'category'),
      setFilePick: (e) => { const f0 = e.target.files && e.target.files[0]; this.setState((st) => ({ fileForm: { ...(st.fileForm || {}), fileName: f0 ? f0.name : '', fileSize: f0 ? f0.size : 0 } })); },
      setLostReason: setForm('lostForm', 'reason'), setLostComp: setForm('lostForm', 'competitor'), setLostNote: setForm('lostForm', 'note'),
      modalReset: s.modal === 'reset', modalLead: s.modal === 'lead', modalClose: s.modal === 'close' && !!x,
      modalSe: s.modal === 'se' && !!x, modalMember: s.modal === 'member' && !!x, modalStake: s.modal === 'stake' && !!x, modalContact: s.modal === 'contact' && !!x,
      se, mm, sk, cv,
      setSeScope: setForm('seForm', 'scope'), setSeNote: setForm('seForm', 'note'),
      setMemberQ: setForm('memberForm', 'q'), setMemberRole: setForm('memberForm', 'role'),
      setSkName: setForm('stakeForm', 'name'), setSkEmail: setForm('stakeForm', 'email'), setSkRole: setForm('stakeForm', 'role'),
      setCName: setForm('contactForm', 'name'), setCEmail: setForm('contactForm', 'email'), setCPhone: setForm('contactForm', 'phone'),
      nav,
      gs, gq: s.gq || '', setGq: (e) => { const v = e.target.value; this.setState({ gq: v }); },
      isCompanies: screen === 'companies', isCompany: screen === 'company', isContacts: screen === 'contacts', companies, cv2, contacts, contactsEmpty: !contacts.length, contactQ: s.contactQ || '',
      setContactQ: (e) => { const v = e.target.value; this.setState({ contactQ: v }); }, goCompanies: () => this.setState({ screen: 'companies' }),
      cmpSub: companies.length + ' companies', ctSub: allContacts.length + ' contacts across ' + companies.length + ' companies',
      teamScoped: !isAdmin, impOn: !!s.imp, impWho: ME + ' (' + meU.short + ')', impBy: s.imp || '',
      stopImp: () => { const by = this.state.imp; this.setState({ me: by, role: 'admin', imp: '', screen: 'settings', setTab: 'users', modal: '' }); this.flash('Back to ' + by); }, isHome: screen === 'home', isLeads: screen === 'leads', isLead: screen === 'lead', isDeals: screen === 'deals', isDeal: screen === 'deal', isProjects: screen === 'projects', isProject: screen === 'project',
      homeSub: 'Signed in as ' + meTag,
      kpis, queue, queueEmpty: queue.length === 0, queueCount: queue.length + (queue.length === 1 ? ' item' : ' items'), scenarios,
      leads, leadsEmpty: leads.length === 0, newLead: () => cLeadNew ? this.setState({ modal: 'lead' }) : noLeads(), lv, lff,
      goLeads: () => this.setState({ screen: 'leads' }), goDeals: () => this.setState({ screen: 'deals' }), goProjects: () => this.setState({ screen: 'projects' }),
      dl, nd, modalDeal: s.modal === 'deal', nc, modalCompany: s.modal === 'company',
      columns, dealsSub: open.length + ' open · ' + money(open.reduce((a, y) => a + y.total, 0)) + ' in pipeline',
      dv,
      ...(() => { const F = s.projF || {}, st0 = F.status || '', co0 = F.company || '', us0 = F.user || '';
        const list = projects.filter((p) => (!st0 || p.status === st0) && (!co0 || p.company === co0) && (!us0 || (us0 === '__me' ? p.people.indexOf(ME) >= 0 : p.people.indexOf(us0) >= 0)));
        const setF = (k) => (e) => { const v = e.target.value; this.setState((st) => ({ projF: { ...(st.projF || {}), [k]: v } })); };
        const cos = projects.map((p) => p.company).filter((n, i, a) => a.indexOf(n) === i).sort(), ppl = projects.reduce((a, p) => a.concat(p.people), []).filter((n, i, a) => a.indexOf(n) === i && n !== ME).sort();
        const sum = (k) => list.reduce((a, p) => a + (p[k] || 0), 0);
        const totals = [{ k: 'Hours logged', v: (Math.round(sum('_logged') * 10) / 10) + ' / ' + sum('_total') + ' h', fg: '#14112E' }].concat(isAdmin ? [{ k: 'Billed to date', v: money(sum('_billed')), fg: '#14112E' }, { k: 'Actual cost', v: money(sum('_cost')), fg: '#14112E' }, { k: 'Margin', v: (sum('_billed') - sum('_cost') < 0 ? '−' : '') + money(Math.abs(sum('_billed') - sum('_cost'))), fg: sum('_billed') - sum('_cost') < 0 ? '#9E2A30' : '#1B6B35' }] : []);
        return { projects: list, projectsEmpty: projects.length === 0,
          pf: { hasTotals: list.length > 0, totals, status: st0, company: co0, user: us0, setStatus: setF('status'), setCompany: setF('company'), setUser: setF('user'), active: !!(st0 || co0 || us0), noMatch: projects.length > 0 && !list.length,
            clear: () => this.setState({ projF: {} }), count: (st0 || co0 || us0 ? list.length + ' of ' : '') + projects.length + (projects.length === 1 ? ' project' : ' projects'),
            statusOpts: [{ v: '', label: 'All statuses' }].concat(['Not started', 'Active', 'Closed'].map((v) => ({ v, label: v }))),
            companyOpts: [{ v: '', label: 'All customers' }].concat(cos.map((v) => ({ v, label: v }))),
            userOpts: [{ v: '', label: 'Everyone' }, { v: '__me', label: 'Mine (' + ME + ')' }].concat(ppl.map((v) => ({ v, label: v }))) } }; })(), pv,
      form: f, nl,
      saveOff: !valid, saveB: B(valid ? 'primary' : 'off'), saveLead: valid ? () => this.saveLead() : noop,
      close: s.close, setReason: setC('reason'), setAmount: setC('amount'),
      toast: s.toast, hasToast: !!s.toast
    };
  }
}
