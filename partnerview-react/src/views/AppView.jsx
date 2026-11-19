// Generated from the PartnerView design-canvas prototype. Edit freely.
import React from 'react';
import { on, list } from './runtime';
import antlerwingLogo from '../assets/antlerwing-logo.png';
import TaskDrawer from './panels/TaskDrawer';
import ChatPanel from './panels/ChatPanel';
import HomeScreen from './screens/HomeScreen';
import LeadsScreen from './screens/LeadsScreen';
import LeadScreen from './screens/LeadScreen';
import DealsScreen from './screens/DealsScreen';
import DealScreen from './screens/DealScreen';
import ProjectsScreen from './screens/ProjectsScreen';
import ProjectScreen from './screens/ProjectScreen';
import CompaniesScreen from './screens/CompaniesScreen';
import CompanyScreen from './screens/CompanyScreen';
import ContactsScreen from './screens/ContactsScreen';
import ContactScreen from './screens/ContactScreen';
import SettingsScreen from './screens/SettingsScreen';
import ResetDemoModal from './modals/ResetDemoModal';
import NewCompanyModal from './modals/NewCompanyModal';
import NewDealModal from './modals/NewDealModal';
import NewLeadModal from './modals/NewLeadModal';
import MarkLostModal from './modals/MarkLostModal';
import CloseWonModal from './modals/CloseWonModal';
import ChooseSeModal from './modals/ChooseSeModal';
import TeamMemberModal from './modals/TeamMemberModal';
import StakeholderModal from './modals/StakeholderModal';
import DealTaskTimeModal from './modals/DealTaskTimeModal';
import LogTimeModal from './modals/LogTimeModal';
import NewContactModal from './modals/NewContactModal';

export default function AppView({ v }) {
  return (
    <>
      <div className="s-b2bcbe" style={{ background: `radial-gradient(1100px 520px at 38% 0%, #ECE8FD 0%, ${v.ground ?? ""} 62%)`, backgroundColor: v.ground, color: "#14112E", fontFamily: "'Geist', system-ui, -apple-system, 'Segoe UI', sans-serif", fontSize: "14px", lineHeight: "1.5" }}>
        <header className="s-d1850b">
          <div className="s-1c8248">
            <button className="s-b295b1" onClick={v.toggleNav} aria-expanded={v.navExpanded} aria-label={v.navLabel} title={v.navLabel}>
              <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="16" rx="2"></rect>
                <path d="M9 4v16"></path>
              </svg>
            </button>
            <div className="s-f265ed">
              <img className="s-08c326" src={antlerwingLogo} alt="" />
              <span className="s-f8aa43">AntlerWing</span>
            </div>
            <span className="s-238b29" aria-hidden="true"></span>
            <span className="s-bd57d1">PartnerView</span>
            <span className="s-8f0b94">
              <span className="s-b8e4ce" aria-hidden="true"></span>
              <span>Demo environment</span>
            </span>
          </div>
          <div className="s-87a5e1">
            {" "}
            <label className="s-14ff23" htmlFor="g-search">Search PartnerView</label>
            {" "}
            <div className="s-3420cc">
              <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D9D7E6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="7"></circle>
                <path d="M20 20l-3.5-3.5"></path>
              </svg>
              <input className="s-a93c5b" id="g-search" type="search" value={v.gq ?? ""} onChange={v.setGq} placeholder="Search companies, deals, projects, contacts or IDs (DL-1002, PRJ-1005)" autoComplete="off" />
              {on(v.gs?.has) && (<>
                <button className="s-067e1e" onClick={v.gs?.clear} aria-label="Clear search">×</button>
              </>)}
            </div>
            {on(v.gs?.has) && (<>
              <div className="s-a9e22a" role="region" aria-label="Search results">
                <div className="s-dfaecc">{v.gs?.summary}</div>
                {list(v.gs?.groups).map((g, i0) => (<React.Fragment key={i0}>
                  <div className="s-6f5dbd">
                    <div className="s-356fd4">{g?.label}</div>
                    {list(g?.items).map((r, i1) => (<React.Fragment key={i1}>
                      {" "}
                      <button className="s-4a4877" onClick={r?.go}>
                        <span className="s-c5f709">{r?.code}</span>
                        <span className="s-4ad4e4">
                          <span className="s-6825e9">{r?.title}</span>
                          <span className="s-376b40">{r?.sub}</span>
                        </span>
                      </button>
                      {" "}
                    </React.Fragment>))}
                  </div>
                </React.Fragment>))}
                {on(v.gs?.empty) && (<>
                  <p className="s-a46d12">No matches. Try a company name, a contact, or an ID like DL-1002, PRJ-1005 or CO-…</p>
                </>)}
              </div>
            </>)}
          </div>
          <div className="s-c28934">
            <div className="s-ca8dfa">
              <label className="s-7c6c56" htmlFor="signed-in">Signed in as</label>
              <select className="s-ddc0e0" id="signed-in" value={v.me ?? ""} onChange={v.setMe}>
                {list(v.userOpts).map((o, i0) => (<React.Fragment key={i0}>
                  <option value={o?.v}>{o?.label}</option>
                </React.Fragment>))}
              </select>
            </div>
            <button className="s-605825" onClick={v.askReset}>
              <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 12a9 9 0 1 0 3-6.7"></path>
                <path d="M3 4v5h5"></path>
              </svg>
              <span>Reset demo data</span>
              <span className="s-9470c2">Demo only</span>
            </button>
          </div>
        </header>
        <div className="s-502eb0">
          {on(v.navOpen) && (<>
            <nav className="s-4b10e2" aria-label="Main">
              {list(v.nav).map((n, i0) => (<React.Fragment key={i0}>
                <button className="s-cde45c" onClick={n?.go} aria-current={n?.current} style={{ background: n?.bg, color: n?.fg, fontWeight: n?.fw }}>
                  <span>{n?.label}</span>
                  <span className="s-3ec15a">{n?.count}</span>
                </button>
              </React.Fragment>))}
              <div className="s-6f66e0">Lean MVP scope: CRM and Delivery. Sample data only.</div>
            </nav>
          </>)}
          <main className="s-ceab60">
            {on(v.impOn) && (<>
              <div className="s-1edad7" role="status">
                <p className="s-e5fd77">
                  <strong className="s-1c9385">{"Impersonating "}{v.impWho}.</strong>
                  {" "}{"You see what they see. Changes are recorded as "}{v.impBy}{" acting as them."}
                </p>
                <button className="s-348b1e" onClick={v.stopImp}>Stop impersonating</button>
              </div>
            </>)}
            {on(v.hasTd) && <TaskDrawer v={v} />}
            {on(v.hasCht) && <ChatPanel v={v} />}
            {on(v.isHome) && <HomeScreen v={v} />}
            {on(v.isLeads) && <LeadsScreen v={v} />}
            {on(v.isLead) && <LeadScreen v={v} />}
            {on(v.isDeals) && <DealsScreen v={v} />}
            {on(v.isDeal) && <DealScreen v={v} />}
            {on(v.isProjects) && <ProjectsScreen v={v} />}
            {on(v.isProject) && <ProjectScreen v={v} />}
            {on(v.isCompanies) && <CompaniesScreen v={v} />}
            {on(v.isCompany) && <CompanyScreen v={v} />}
            {on(v.isContacts) && <ContactsScreen v={v} />}
            {on(v.isContact) && <ContactScreen v={v} />}
            {on(v.isSettings) && <SettingsScreen v={v} />}
          </main>
        </div>
        {on(v.pv?.pjm?.startOn) && (<>
          <div className="s-d6accc">
            <div className="s-e560cc" role="dialog" aria-modal="true" aria-labelledby="pjs-title">
              <h2 className="s-ef9167" id="pjs-title">Start the project</h2>
              <p className="s-cdfe44">Pick the engagement start date: today or a future date. Time logging opens on that date.</p>
              <div className="s-d08feb">
                <label className="s-b34b0c" htmlFor="pjs-date">Engagement start</label>
                <input className="s-ce3055" id="pjs-date" type="date" value={v.pv?.pjm?.date ?? ""} onChange={v.pv?.pjm?.setDate} />
              </div>
              {on(v.pv?.pjm?.hasShift) && (<>
                <p className="s-105eaf">{v.pv?.pjm?.shiftNote}</p>
              </>)}
              <div className="s-63a21a">
                <button className="s-4d2251" onClick={v.pv?.pjm?.cancel}>Cancel</button>
                <button className="s-c454f0" onClick={v.pv?.pjm?.start} disabled={on(v.pv?.pjm?.startOff)} style={{ border: `1px solid ${v.pv?.pjm?.startB?.bd ?? ""}`, background: v.pv?.pjm?.startB?.bg, color: v.pv?.pjm?.startB?.fg, cursor: v.pv?.pjm?.startB?.cur, font: "inherit", fontWeight: "600" }}>{v.pv?.pjm?.startTxt}</button>
              </div>
            </div>
          </div>
        </>)}
        {on(v.pv?.pjm?.closeOn) && (<>
          <div className="s-d6accc">
            <div className="s-e560cc" role="dialog" aria-modal="true" aria-labelledby="pjc-title">
              <h2 className="s-ef9167" id="pjc-title">Close the project?</h2>
              <p className="s-cdfe44">Once closed, the project is view only for everyone. No one can log time or change the plan, tasks, setup or files.</p>
              <div className="s-63a21a">
                <button className="s-4d2251" onClick={v.pv?.pjm?.cancel}>Cancel</button>
                <button className="s-b92805" onClick={v.pv?.pjm?.close}>Close project</button>
              </div>
            </div>
          </div>
        </>)}
        {on(v.qv?.nq?.on) && (<>
          <div className="s-d6accc">
            <div className="s-b4c7b6" role="dialog" aria-modal="true" aria-labelledby="nq-title">
              <h2 className="s-ef9167" id="nq-title">{"New quote \u00b7 "}{v.qv?.nq?.name}</h2>
              <p className="s-cdfe44">Which practices is this quote for? Pick one or more. Each gets its own service lines.</p>
              <div className="s-192902" role="group" aria-label="Practices">
                {list(v.qv?.nq?.opts).map((o, i0) => (<React.Fragment key={i0}>
                  <button className="s-eb2ac8" aria-pressed={o?.sel} onClick={o?.toggle} style={{ border: `1px solid ${o?.bd ?? ""}`, background: o?.bg, color: o?.fg, font: "inherit", fontSize: "13px", fontWeight: "600", cursor: "pointer" }}>{o?.label}</button>
                </React.Fragment>))}
              </div>
              {on(v.qv?.nq?.none) && (<>
                <p className="s-b6b9f2">No active practices. An admin can add them in Settings › Practices and services.</p>
              </>)}
              <div className="s-63a21a">
                <button className="s-4d2251" onClick={v.qv?.nq?.cancel}>Cancel</button>
                <button className="s-c454f0" onClick={v.qv?.nq?.create} disabled={on(v.qv?.nq?.off)} style={{ border: `1px solid ${v.qv?.nq?.b?.bd ?? ""}`, background: v.qv?.nq?.b?.bg, color: v.qv?.nq?.b?.fg, cursor: v.qv?.nq?.b?.cur, font: "inherit", fontWeight: "600" }}>Create quote</button>
              </div>
            </div>
          </div>
        </>)}
        {on(v.modalReset) && <ResetDemoModal v={v} />}
        {on(v.modalCompany) && <NewCompanyModal v={v} />}
        {on(v.modalDeal) && <NewDealModal v={v} />}
        {on(v.modalLead) && <NewLeadModal v={v} />}
        {on(v.modalLost) && <MarkLostModal v={v} />}
        {on(v.modalClose) && <CloseWonModal v={v} />}
        {on(v.modalSe) && <ChooseSeModal v={v} />}
        {on(v.modalMember) && <TeamMemberModal v={v} />}
        {on(v.modalStake) && <StakeholderModal v={v} />}
        {on(v.modalDTime) && <DealTaskTimeModal v={v} />}
        {on(v.modalTime) && <LogTimeModal v={v} />}
        {on(v.modalContact) && <NewContactModal v={v} />}
        <div className="s-823817" role="status" aria-live="polite">
          {on(v.hasToast) && (<>
            <div className="s-f73da8">
              <span className="s-ae52bb" aria-hidden="true"></span>
              <span>{v.toast}</span>
            </div>
          </>)}
        </div>
      </div>
    </>
  );
}
