// Generated from the PartnerView design-canvas prototype. Edit freely.
import React from 'react';
import { on, list } from '../runtime';


export default function NewDealModal({ v }) {
  return (
    <>
      <div className="s-d6accc">
        <div className="s-3ccc23" role="dialog" aria-modal="true" aria-labelledby="nd-title">
          <div className="s-bc0172">
            <h2 className="s-ef9167" id="nd-title">New deal</h2>
            <p className="s-105eaf">For opportunities that skip the lead stage, such as existing customers or direct asks.</p>
          </div>
          <div className="s-d08feb">
            <label className="s-b34b0c" htmlFor="nd-company">
              Company{" "}
              <span className="s-d484b9">*</span>
            </label>
            <div className="s-a8a903">
              {" "}
              <input className="s-99d881" id="nd-company" type="text" role="combobox" aria-expanded={v.nd?.combo?.exp} aria-autocomplete="list" autoComplete="off" value={v.nd?.company ?? ""} onChange={v.nd?.setCompany} onClick={v.nd?.combo?.openIt} placeholder="Search companies or type a new one" />
              {" "}
              {on(v.nd?.combo?.open) && (<>
                <div className="s-5a6d2b" role="listbox">
                  {list(v.nd?.combo?.opts).map((o, i0) => (<React.Fragment key={i0}>
                    <button className="s-e9edb7" role="option" aria-selected={o?.sel} onClick={o?.pick} style={{ background: o?.bg, color: "#14112E", font: "inherit", fontSize: "13px", textAlign: "left", cursor: "pointer" }}>
                      <span className="s-21a1be">{o?.label}</span>
                      <span className="s-629d39">{o?.sub}</span>
                    </button>
                  </React.Fragment>))}
                  {on(v.nd?.combo?.hasNew) && (<>
                    <button className="s-145f2e" onClick={v.nd?.combo?.pickNew}>{"+ "}{v.nd?.combo?.newLabel}</button>
                  </>)}
                  {on(v.nd?.combo?.none) && (<>
                    <p className="s-b12af8">No matching companies.</p>
                  </>)}
                </div>
              </>)}
            </div>
            <span className="s-344495" style={{ color: v.nd?.companyFg }}>{v.nd?.companyNote}</span>
          </div>
          <div className="s-d08feb">
            <label className="s-b34b0c" htmlFor="nd-name">
              Deal name{" "}
              <span className="s-d484b9">*</span>
            </label>
            <input className="s-99d881" id="nd-name" type="text" value={v.nd?.name ?? ""} onChange={v.nd?.setName} placeholder="e.g. CRM phase 3" />
          </div>
          <div className="s-a08bce">
            <div className="s-4cc8a6">
              <label className="s-b34b0c" htmlFor="nd-first">
                Contact first name{" "}
                <span className="s-d484b9">*</span>
              </label>
              <input className="s-99d881" id="nd-first" type="text" value={v.nd?.first ?? ""} onChange={v.nd?.setFirst} />
            </div>
            <div className="s-4cc8a6">
              <label className="s-b34b0c" htmlFor="nd-last">
                Contact last name{" "}
                <span className="s-d484b9">*</span>
              </label>
              <input className="s-99d881" id="nd-last" type="text" value={v.nd?.last ?? ""} onChange={v.nd?.setLast} />
            </div>
            <div className="s-4cc8a6">
              <label className="s-b34b0c" htmlFor="nd-email">Contact email</label>
              <input className="s-99d881" id="nd-email" type="email" value={v.nd?.email ?? ""} onChange={v.nd?.setEmail} />
            </div>
            <div className="s-4cc8a6">
              <label className="s-b34b0c" htmlFor="nd-phone">Contact phone</label>
              <input className="s-99d881" id="nd-phone" type="tel" value={v.nd?.phone ?? ""} onChange={v.nd?.setPhone} />
            </div>
            <div className="s-4cc8a6">
              <label className="s-b34b0c" htmlFor="nd-owner">
                Owner (AE){" "}
                <span className="s-d484b9">*</span>
              </label>
              <select className="s-99d881" id="nd-owner" value={v.nd?.owner ?? ""} onChange={v.nd?.setOwner}>
                {list(v.nd?.ownerOpts).map((o, i0) => (<React.Fragment key={i0}>
                  <option value={o?.v}>{o?.label}</option>
                </React.Fragment>))}
              </select>
            </div>
            <div className="s-4cc8a6">
              <label className="s-b34b0c" htmlFor="nd-source">Source</label>
              <select className="s-99d881" id="nd-source" value={v.nd?.source ?? ""} onChange={v.nd?.setSource}>
                {list(v.nd?.sourceOpts).map((o, i0) => (<React.Fragment key={i0}>
                  <option value={o?.v}>{o?.label}</option>
                </React.Fragment>))}
              </select>
            </div>
            <div className="s-4cc8a6">
              <label className="s-b34b0c" htmlFor="nd-close">Expected close</label>
              <input className="s-99d881" id="nd-close" type="date" value={v.nd?.close ?? ""} onChange={v.nd?.setClose} />
            </div>
            <div className="s-4cc8a6">
              <label className="s-b34b0c" htmlFor="nd-fc">Estimated value ($)</label>
              <input className="s-99d881" id="nd-fc" type="text" inputMode="numeric" value={v.nd?.forecast ?? ""} onChange={v.nd?.setForecast} placeholder={v.nd?.fcPh} />
            </div>
          </div>
          {on(v.nd?.typeManual) && (<>
            <div className="s-d08feb">
              <label className="s-b34b0c" htmlFor="nd-type">Deal type</label>
              <select className="s-99d881" id="nd-type" value={v.nd?.type ?? ""} onChange={v.nd?.setType}>
                <option value="new">New business</option>
                <option value="exp">Expansion</option>
              </select>
            </div>
          </>)}
          {on(v.nd?.typeAuto) && (<>
            <p className="s-d5ef9b">{v.nd?.typeText}</p>
          </>)}
          <div className="s-8fd27d">
            <span className="s-3c9f14" style={{ color: v.nd?.hintFg }}>{v.nd?.hint}</span>
            <div className="s-b9b7b5">
              <button className="s-93a0d4" onClick={v.nd?.save} disabled={on(v.nd?.off)} style={{ border: `1px solid ${v.nd?.b?.bd ?? ""}`, background: v.nd?.b?.bg, color: v.nd?.b?.fg, cursor: v.nd?.b?.cur, font: "inherit", fontWeight: "600" }}>Create deal</button>
              <button className="s-5e75ba" onClick={v.closeModal}>Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
