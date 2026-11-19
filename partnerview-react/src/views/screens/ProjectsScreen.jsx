// Generated from the PartnerView design-canvas prototype. Edit freely.
import React from 'react';
import { on, list } from '../runtime';


export default function ProjectsScreen({ v }) {
  return (
    <>
      <section className="s-7356d2">
        <div className="s-4678e7">
          <div>
            <h1 className="s-890aa1">Projects</h1>
            <p className="s-5a1119">{v.pf?.count}</p>
          </div>
          <div className="s-1e55f9">
            <div className="s-bc0172">
              <label className="s-a6cf94" htmlFor="pf-status">Status</label>
              <select className="s-91140e" id="pf-status" value={v.pf?.status ?? ""} onChange={v.pf?.setStatus}>
                {list(v.pf?.statusOpts).map((o, i0) => (<React.Fragment key={i0}>
                  <option value={o?.v}>{o?.label}</option>
                </React.Fragment>))}
              </select>
            </div>
            <div className="s-bc0172">
              <label className="s-a6cf94" htmlFor="pf-company">Customer</label>
              <select className="s-91140e" id="pf-company" value={v.pf?.company ?? ""} onChange={v.pf?.setCompany}>
                {list(v.pf?.companyOpts).map((o, i0) => (<React.Fragment key={i0}>
                  <option value={o?.v}>{o?.label}</option>
                </React.Fragment>))}
              </select>
            </div>
            <div className="s-bc0172">
              <label className="s-a6cf94" htmlFor="pf-user">Person</label>
              <select className="s-91140e" id="pf-user" value={v.pf?.user ?? ""} onChange={v.pf?.setUser}>
                {list(v.pf?.userOpts).map((o, i0) => (<React.Fragment key={i0}>
                  <option value={o?.v}>{o?.label}</option>
                </React.Fragment>))}
              </select>
            </div>
            {on(v.pf?.active) && (<>
              <button className="s-364cc5" onClick={v.pf?.clear}>Clear filters</button>
            </>)}
          </div>
        </div>
        <div className="s-f170d9">
          <div className="s-987eb2">
            <div className="s-31bdb5">
              <div className="s-2234e5">
                <span>Project</span>
                <span>Customer</span>
                <span>Type</span>
                <span>PM</span>
                <span>Timeline</span>
                <span>Status</span>
                <span className="s-30489c">Hours</span>
              </div>
              {list(v.projects).map((p, i0) => (<React.Fragment key={i0}>
                {" "}
                <button className="s-346d05" onClick={p?.open} aria-label={p?.openA}>
                  <span className="s-955b71">
                    <span className="s-a52b90">{p?.title}</span>
                    <span className="s-3ec15a">{p?.code}{" \u00b7 "}{p?.name}</span>
                  </span>
                  <span className="s-48d631">{p?.company}</span>
                  <span>
                    <span className="s-f1430d">{p?.type}</span>
                  </span>
                  <span className="s-9b92d2">
                    {on(p?.hasPm) && (<>
                      <span className="s-a38dae" aria-hidden="true">{p?.pmIni}</span>
                    </>)}
                    <span className="s-33f2a6" style={{ color: p?.pmFg }}>{p?.pm}</span>
                  </span>
                  <span className="s-8ee2fc">{p?.timeline}</span>
                  <span>
                    <span className="s-1e4be5" style={{ background: p?.pill?.bg, color: p?.pill?.fg }}>{p?.status}</span>
                  </span>
                  <span className="s-caed6a">{p?.hoursShort}</span>
                </button>
                {" "}
              </React.Fragment>))}
            </div>
          </div>
          {on(v.pf?.hasTotals) && (<>
            <div className="s-3e2ad5">
              <span className="s-99c0d2">Totals for this view</span>
              {list(v.pf?.totals).map((tt, i0) => (<React.Fragment key={i0}>
                <span>
                  {tt?.k}{" "}
                  <strong className="s-1c9385" style={{ color: tt?.fg }}>{tt?.v}</strong>
                </span>
              </React.Fragment>))}
            </div>
          </>)}
          {on(v.projectsEmpty) && (<>
            <p className="s-731d89">No projects yet. Close a deal to create one.</p>
          </>)}
          {on(v.pf?.noMatch) && (<>
            <p className="s-731d89">No projects match these filters.</p>
          </>)}
        </div>
      </section>
    </>
  );
}
