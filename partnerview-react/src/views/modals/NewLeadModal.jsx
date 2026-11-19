// Generated from the PartnerView design-canvas prototype. Edit freely.
import React from 'react';
import { on, list } from '../runtime';


export default function NewLeadModal({ v }) {
  return (
    <>
      <div className="s-d6accc">
        <div className="s-3ccc23" role="dialog" aria-modal="true" aria-labelledby="lead-title">
          <div className="s-bc0172">
            <h2 className="s-ef9167" id="lead-title">New lead</h2>
            <p className="s-105eaf">
              Lead name:{" "}
              <strong>{v.nl?.name}</strong>
            </p>
          </div>
          <div className="s-a08bce">
            <div className="s-4cc8a6">
              <label className="s-b34b0c" htmlFor="nl-first">
                First name{" "}
                <span className="s-d484b9">*</span>
              </label>
              <input className="s-51dd65" id="nl-first" type="text" value={v.nl?.first ?? ""} onChange={v.nl?.setFirst} placeholder="e.g. Sam" />
            </div>
            <div className="s-4cc8a6">
              <label className="s-b34b0c" htmlFor="nl-last">
                Last name{" "}
                <span className="s-d484b9">*</span>
              </label>
              <input className="s-51dd65" id="nl-last" type="text" value={v.nl?.last ?? ""} onChange={v.nl?.setLast} placeholder="e.g. Rivera" />
            </div>
          </div>
          <div className="s-d08feb">
            <label className="s-b34b0c" htmlFor="nl-company">
              Company{" "}
              <span className="s-d484b9">*</span>
            </label>
            <div className="s-a8a903">
              {" "}
              <input className="s-51dd65" id="nl-company" type="text" role="combobox" aria-expanded={v.nl?.combo?.exp} aria-autocomplete="list" autoComplete="off" value={v.nl?.company ?? ""} onChange={v.nl?.setCompany} onClick={v.nl?.combo?.openIt} placeholder="Search companies or type a new one" />
              {" "}
              {on(v.nl?.combo?.open) && (<>
                <div className="s-5a6d2b" role="listbox">
                  {list(v.nl?.combo?.opts).map((o, i0) => (<React.Fragment key={i0}>
                    <button className="s-e9edb7" role="option" aria-selected={o?.sel} onClick={o?.pick} style={{ background: o?.bg, color: "#14112E", font: "inherit", fontSize: "13px", textAlign: "left", cursor: "pointer" }}>
                      <span className="s-21a1be">{o?.label}</span>
                      <span className="s-629d39">{o?.sub}</span>
                    </button>
                  </React.Fragment>))}
                  {on(v.nl?.combo?.hasNew) && (<>
                    <button className="s-145f2e" onClick={v.nl?.combo?.pickNew}>{"+ "}{v.nl?.combo?.newLabel}</button>
                  </>)}
                  {on(v.nl?.combo?.none) && (<>
                    <p className="s-b12af8">No matching companies.</p>
                  </>)}
                </div>
              </>)}
            </div>
            <span className="s-344495" style={{ color: v.nl?.companyFg }}>{v.nl?.companyNote}</span>
          </div>
          <div className="s-a08bce">
            <div className="s-4cc8a6">
              <label className="s-b34b0c" htmlFor="nl-email">
                Email{" "}
                <span className="s-d484b9">*</span>
              </label>
              <input className="s-51dd65" id="nl-email" type="email" value={v.nl?.email ?? ""} onChange={v.nl?.setEmail} placeholder="name@company.com" />
            </div>
            <div className="s-4cc8a6">
              <label className="s-b34b0c" htmlFor="nl-phone">
                Phone{" "}
                <span className="s-d484b9">*</span>
              </label>
              <input className="s-51dd65" id="nl-phone" type="tel" value={v.nl?.phone ?? ""} onChange={v.nl?.setPhone} placeholder="+1 555 0100" />
            </div>
          </div>
          {on(v.nl?.dup?.show) && (<>
            <div className="s-d27f7e" role="status">
              <p className="s-f1c30e">
                This contact already exists:{" "}
                <button className="s-40d34f" onClick={v.nl?.dup?.open} aria-label={v.nl?.dup?.openLabel}>{v.nl?.dup?.who}</button>
              </p>
              <button className="s-4f274b" onClick={v.nl?.dup?.use}>Use this contact</button>
            </div>
          </>)}
          {on(v.nl?.dup?.linked) && (<>
            <p className="s-7cd31c" role="status">
              Linked to the existing contact{" "}
              <button className="s-40d34f" onClick={v.nl?.dup?.open} aria-label={v.nl?.dup?.openLabel}>{v.nl?.dup?.who}</button>
            </p>
          </>)}
          <div className="s-d08feb">
            <label className="s-b34b0c" htmlFor="nl-source">
              Lead source{" "}
              <span className="s-d484b9">*</span>
            </label>
            <select className="s-51dd65" id="nl-source" value={v.nl?.source ?? ""} onChange={v.nl?.setSource}>
              {list(v.nl?.sourceOpts).map((o, i0) => (<React.Fragment key={i0}>
                <option value={o?.v}>{o?.label}</option>
              </React.Fragment>))}
            </select>
          </div>
          <div className="s-d08feb">
            <label className="s-b34b0c" htmlFor="nl-needs">
              Needs{" "}
              <span className="s-d484b9">*</span>
            </label>
            <textarea className="s-78ca65" id="nl-needs" value={v.nl?.needs ?? ""} onChange={v.nl?.setNeeds} rows="3" placeholder="What problem do they want solved?" />
          </div>
          <div className="s-d08feb">
            <span className="s-b34b0c">
              Products{" "}
              <span className="s-c5e12b">(optional now)</span>
            </span>
            <div className="s-a8a903">
              {" "}
              <button className="s-61b68c" aria-haspopup="listbox" aria-expanded={v.nl?.prodMs?.exp} onClick={v.nl?.prodMs?.toggleOpen} style={{ border: `1px solid ${v.nl?.prodMs?.bd ?? ""}`, background: "#FFFFFF", color: "#14112E", font: "inherit", fontSize: "13px", textAlign: "left", cursor: "pointer" }}>
                <span className="s-1bcaee" style={{ color: v.nl?.prodMs?.sumFg }}>{v.nl?.prodMs?.summary}</span>
                <span className="s-e1f28b">
                  {on(v.nl?.prodMs?.hasCount) && (<>
                    <span className="s-4a0360">{v.nl?.prodMs?.count}</span>
                  </>)}
                  <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4A4766" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: `rotate(${v.nl?.prodMs?.rot ?? ""})`, transition: "transform 0.15s" }}>
                    <path d="M6 9l6 6 6-6"></path>
                  </svg>
                </span>
              </button>
              {" "}
              {on(v.nl?.prodMs?.open) && (<>
                <div className="s-5a6d2b" role="listbox" aria-multiselectable="true">
                  {list(v.nl?.prodMs?.opts).map((o, i0) => (<React.Fragment key={i0}>
                    <button className="s-e0155d" role="option" aria-selected={o?.sel} onClick={o?.toggle} style={{ background: o?.bg, color: "#14112E", font: "inherit", fontSize: "13px", textAlign: "left", cursor: "pointer" }}>
                      <span className="s-eb5a19" aria-hidden="true" style={{ border: `1.5px solid ${o?.box ?? ""}`, background: o?.fill, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={o?.tick} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 12l5 5 9-10"></path>
                        </svg>
                      </span>
                      <span>{o?.label}</span>
                    </button>
                  </React.Fragment>))}
                  <div className="s-7668ef">
                    <span className="s-629d39">{v.nl?.prodMs?.countText}</span>
                    <button className="s-379cf6" onClick={v.nl?.prodMs?.close}>Done</button>
                  </div>
                </div>
              </>)}
            </div>
          </div>
          <div className="s-d08feb">
            <span className="s-b34b0c">
              Services{" "}
              <span className="s-c5e12b">(optional now)</span>
            </span>
            <div className="s-a8a903">
              {" "}
              <button className="s-61b68c" aria-haspopup="listbox" aria-expanded={v.nl?.svcMs?.exp} onClick={v.nl?.svcMs?.toggleOpen} style={{ border: `1px solid ${v.nl?.svcMs?.bd ?? ""}`, background: "#FFFFFF", color: "#14112E", font: "inherit", fontSize: "13px", textAlign: "left", cursor: "pointer" }}>
                <span className="s-1bcaee" style={{ color: v.nl?.svcMs?.sumFg }}>{v.nl?.svcMs?.summary}</span>
                <span className="s-e1f28b">
                  {on(v.nl?.svcMs?.hasCount) && (<>
                    <span className="s-4a0360">{v.nl?.svcMs?.count}</span>
                  </>)}
                  <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4A4766" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: `rotate(${v.nl?.svcMs?.rot ?? ""})`, transition: "transform 0.15s" }}>
                    <path d="M6 9l6 6 6-6"></path>
                  </svg>
                </span>
              </button>
              {" "}
              {on(v.nl?.svcMs?.open) && (<>
                <div className="s-5a6d2b" role="listbox" aria-multiselectable="true">
                  {list(v.nl?.svcMs?.opts).map((o, i0) => (<React.Fragment key={i0}>
                    <button className="s-e0155d" role="option" aria-selected={o?.sel} onClick={o?.toggle} style={{ background: o?.bg, color: "#14112E", font: "inherit", fontSize: "13px", textAlign: "left", cursor: "pointer" }}>
                      <span className="s-eb5a19" aria-hidden="true" style={{ border: `1.5px solid ${o?.box ?? ""}`, background: o?.fill, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={o?.tick} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 12l5 5 9-10"></path>
                        </svg>
                      </span>
                      <span>{o?.label}</span>
                    </button>
                  </React.Fragment>))}
                  <div className="s-7668ef">
                    <span className="s-629d39">{v.nl?.svcMs?.countText}</span>
                    <button className="s-379cf6" onClick={v.nl?.svcMs?.close}>Done</button>
                  </div>
                </div>
              </>)}
            </div>
          </div>
          <div className="s-8fd27d">
            <span className="s-3c9f14" style={{ color: v.nl?.hintFg }}>{v.nl?.hint}</span>
            <div className="s-b9b7b5">
              <button className="s-93a0d4" onClick={v.nl?.save} disabled={on(v.nl?.off)} style={{ border: `1px solid ${v.nl?.b?.bd ?? ""}`, background: v.nl?.b?.bg, color: v.nl?.b?.fg, cursor: v.nl?.b?.cur, font: "inherit", fontWeight: "600" }}>Add lead</button>
              <button className="s-5e75ba" onClick={v.closeModal}>Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
