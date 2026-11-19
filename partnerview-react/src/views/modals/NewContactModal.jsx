// Generated from the PartnerView design-canvas prototype. Edit freely.
import React from 'react';
import { on, list } from '../runtime';


export default function NewContactModal({ v }) {
  return (
    <>
      <div className="s-d6accc">
        <div className="s-4391a8" role="dialog" aria-modal="true" aria-labelledby="contact-title">
          <div className="s-bc0172">
            <h2 className="s-ef9167" id="contact-title">{v.cv?.title}</h2>
            <p className="s-8d7f09">{v.cv?.sub}</p>
          </div>
          <div className="s-d08feb">
            <label className="s-b34b0c" htmlFor="ct-company">Company</label>
            <input className="s-e203b1" id="ct-company" value={v.cv?.company ?? ""} readOnly={true} aria-describedby="ct-company-note" />
            <span className="s-629d39" id="ct-company-note">{v.cv?.companyNote}</span>
          </div>
          <div className="s-714644" role="radiogroup" aria-label="Choose an existing person or create a new one">
            <button className="s-4398bb" role="radio" aria-checked={v.cv?.exOn} onClick={v.cv?.pickExisting} style={{ background: v.cv?.exBg, color: "#14112E", font: "inherit", fontSize: "13px", fontWeight: "600", cursor: "pointer" }}>Choose existing</button>
            <button className="s-4398bb" role="radio" aria-checked={v.cv?.newOn} onClick={v.cv?.pickNew} style={{ background: v.cv?.newBg, color: "#14112E", font: "inherit", fontSize: "13px", fontWeight: "600", cursor: "pointer" }}>Create new</button>
          </div>
          {on(v.cv?.isExisting) && (<>
            <div className="s-620e22">
              <input className="s-16344a" type="search" aria-label="Search people" value={v.cv?.q ?? ""} onChange={v.cv?.setQ} placeholder="Search by name or email" autoComplete="off" />
              <div className="s-ca4ce4" role="listbox" aria-label="People">
                {list(v.cv?.pool).map((o, i0) => (<React.Fragment key={i0}>
                  <button className="s-386ca0" role="option" aria-selected={o?.sel} onClick={o?.pick} style={{ background: o?.bg, color: "#14112E", font: "inherit", textAlign: "left", cursor: "pointer" }}>
                    <span className="s-745eda" aria-hidden="true" style={{ border: `2px solid ${o?.ring ?? ""}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span className="s-1e8eb3" style={{ background: o?.dot }}></span>
                    </span>
                    <span className="s-79b66a">
                      <span className="s-2660ec">{o?.name}</span>
                      <span className="s-b78d28">{o?.sub}</span>
                    </span>
                  </button>
                </React.Fragment>))}
                {on(v.cv?.poolEmpty) && (<>
                  <p className="s-78d2f8">{v.cv?.emptyText}</p>
                </>)}
              </div>
            </div>
          </>)}
          {on(v.cv?.isNew) && (<>
            <div className="s-64bd62">
              <div className="s-d08feb">
                <label className="s-b34b0c" htmlFor="ct-name">Name</label>
                <input className="s-240b15" id="ct-name" value={v.cv?.name ?? ""} onChange={v.setCName} placeholder="e.g. Sam Rivera" />
              </div>
              <div className="s-f739ca">
                <div className="s-d08feb">
                  <label className="s-b34b0c" htmlFor="ct-email">Email</label>
                  <input className="s-240b15" id="ct-email" type="email" value={v.cv?.email ?? ""} onChange={v.setCEmail} />
                </div>
                <div className="s-d08feb">
                  <label className="s-b34b0c" htmlFor="ct-phone">Phone</label>
                  <input className="s-240b15" id="ct-phone" type="tel" value={v.cv?.phone ?? ""} onChange={v.setCPhone} />
                </div>
              </div>
            </div>
          </>)}
          <div className="s-e8558f">
            <button className="s-93a0d4" onClick={v.cv?.confirm} disabled={on(v.cv?.off)} style={{ border: `1px solid ${v.cv?.b?.bd ?? ""}`, background: v.cv?.b?.bg, color: v.cv?.b?.fg, cursor: v.cv?.b?.cur, font: "inherit", fontWeight: "600" }}>Add contact</button>
            <button className="s-5e75ba" onClick={v.closeModal}>Cancel</button>
          </div>
        </div>
      </div>
    </>
  );
}
