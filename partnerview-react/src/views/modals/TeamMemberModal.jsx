// Generated from the PartnerView design-canvas prototype. Edit freely.
import React from 'react';
import { on, list } from '../runtime';


export default function TeamMemberModal({ v }) {
  return (
    <>
      <div className="s-d6accc">
        <div className="s-94a9dd" role="dialog" aria-modal="true" aria-labelledby="member-title">
          <div className="s-bc0172">
            <h2 className="s-ef9167" id="member-title">{v.mm?.title}</h2>
            <p className="s-8d7f09">{v.mm?.sub}</p>
          </div>
          {on(v.mm?.showSeHint) && (<>
            <div className="s-4d9f71">
              <span className="s-9de35e">Adding a solutions engineer? Use the SE picker so they get the scope.</span>
              <button className="s-538336" onClick={v.mm?.toSe}>Choose SE</button>
            </div>
          </>)}
          <div className="s-d08feb">
            <label className="s-b34b0c" htmlFor="m-q">Search people</label>
            <input className="s-240b15" id="m-q" type="search" value={v.mm?.q ?? ""} onChange={v.setMemberQ} placeholder="Name or role" />
          </div>
          <div className="s-236361" role="radiogroup" aria-label="People">
            {list(v.mm?.options).map((o, i0) => (<React.Fragment key={i0}>
              <button className="s-578067" role="radio" aria-checked={o?.checked} disabled={on(o?.disabled)} onClick={o?.pick} style={{ border: `1.5px solid ${o?.bd ?? ""}`, background: o?.bg, color: o?.fg, font: "inherit", textAlign: "left", cursor: o?.cur }}>
                <span className="s-1baf3a" aria-hidden="true">{o?.initials}</span>
                <span className="s-4ad4e4">
                  <span className="s-6de5a7">{o?.name}</span>
                  <span className="s-e02b7d">{o?.role}</span>
                </span>
                {on(o?.hasTag) && (<>
                  <span className="s-96d91d">On team</span>
                </>)}
              </button>
            </React.Fragment>))}
            {on(v.mm?.empty) && (<>
              <p className="s-9fde33">No one matches that search.</p>
            </>)}
          </div>
          <div className="s-d08feb">
            <label className="s-b34b0c" htmlFor="m-role">{"Role on this "}{v.mm?.ctxLabel}</label>
            <select className="s-404a47" id="m-role" value={v.mm?.role ?? ""} onChange={v.setMemberRole}>
              <option>Account executive</option>
              <option>Solutions architect</option>
              <option>Project manager</option>
              <option>Consultant</option>
              <option>Professional services lead</option>
              <option>Engagement manager</option>
              <option>Lead SA</option>
              <option>Support SA</option>
              <option>SE</option>
              <option>Sales rep</option>
            </select>
          </div>
          <p className="s-06def0">{"Name and role only. Everyone on the "}{v.mm?.ctxLabel}{" team is notified."}</p>
          <div className="s-e8558f">
            <button className="s-93a0d4" onClick={v.mm?.confirm} disabled={on(v.mm?.off)} style={{ border: `1px solid ${v.mm?.b?.bd ?? ""}`, background: v.mm?.b?.bg, color: v.mm?.b?.fg, cursor: v.mm?.b?.cur, font: "inherit", fontWeight: "600" }}>{v.mm?.cta}</button>
            <button className="s-5e75ba" onClick={v.closeModal}>Cancel</button>
          </div>
        </div>
      </div>
    </>
  );
}
