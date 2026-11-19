// Generated from the PartnerView design-canvas prototype. Edit freely.
import React from 'react';
import { on, list } from '../runtime';


export default function StakeholderModal({ v }) {
  return (
    <>
      <div className="s-d6accc">
        <div className="s-4391a8" role="dialog" aria-modal="true" aria-labelledby="stake-title">
          <div className="s-bc0172">
            <h2 className="s-ef9167" id="stake-title">Tag a partner stakeholder</h2>
            <p className="s-8d7f09">{v.sk?.sub}</p>
          </div>
          <div className="s-714644" role="radiogroup" aria-label="Choose an existing person or create a new one">
            <button className="s-4398bb" role="radio" aria-checked={v.sk?.exOn} onClick={v.sk?.pickExisting} style={{ background: v.sk?.exBg, color: "#14112E", font: "inherit", fontSize: "13px", fontWeight: "600", cursor: "pointer" }}>Choose existing</button>
            <button className="s-4398bb" role="radio" aria-checked={v.sk?.newOn} onClick={v.sk?.pickNew} style={{ background: v.sk?.newBg, color: "#14112E", font: "inherit", fontSize: "13px", fontWeight: "600", cursor: "pointer" }}>Create new</button>
          </div>
          {on(v.sk?.isExisting) && (<>
            <div className="s-620e22">
              <input className="s-16344a" type="search" aria-label="Search people" value={v.sk?.q ?? ""} onChange={v.sk?.setQ} placeholder="Search by name or email" autoComplete="off" />
              <div className="s-ca4ce4" role="listbox" aria-label="People">
                {list(v.sk?.pool).map((o, i0) => (<React.Fragment key={i0}>
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
                {on(v.sk?.poolEmpty) && (<>
                  <p className="s-78d2f8">{v.sk?.emptyText}</p>
                </>)}
              </div>
            </div>
          </>)}
          {on(v.sk?.isNew) && (<>
            <div className="s-64bd62">
              <div className="s-d08feb">
                <label className="s-b34b0c" htmlFor="sk-name">Name</label>
                <input className="s-240b15" id="sk-name" value={v.sk?.name ?? ""} onChange={v.setSkName} placeholder="e.g. Jordan Lee" />
              </div>
              <div className="s-d08feb">
                <label className="s-b34b0c" htmlFor="sk-email">
                  Email{" "}
                  <span className="s-c5e12b">(optional)</span>
                </label>
                <input className="s-240b15" id="sk-email" type="email" value={v.sk?.email ?? ""} onChange={v.setSkEmail} placeholder="name@monday.com" />
              </div>
              <div className="s-d08feb">
                <label className="s-b34b0c" htmlFor="sk-role">Role</label>
                <select className="s-404a47" id="sk-role" value={v.sk?.role ?? ""} onChange={v.setSkRole}>
                  <option>monday.com rep</option>
                  <option>CPM</option>
                  <option>Other partner contact</option>
                </select>
              </div>
            </div>
          </>)}
          <div className="s-e8558f">
            <button className="s-93a0d4" onClick={v.sk?.confirm} disabled={on(v.sk?.off)} style={{ border: `1px solid ${v.sk?.b?.bd ?? ""}`, background: v.sk?.b?.bg, color: v.sk?.b?.fg, cursor: v.sk?.b?.cur, font: "inherit", fontWeight: "600" }}>Tag stakeholder</button>
            <button className="s-5e75ba" onClick={v.closeModal}>Cancel</button>
          </div>
        </div>
      </div>
    </>
  );
}
