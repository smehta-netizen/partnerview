// Generated from the PartnerView design-canvas prototype. Edit freely.
import React from 'react';
import { on, list } from '../runtime';


export default function ChooseSeModal({ v }) {
  return (
    <>
      <div className="s-d6accc">
        <div className="s-89b90d" role="dialog" aria-modal="true" aria-labelledby="se-title">
          <div className="s-bc0172">
            <h2 className="s-ef9167" id="se-title">{v.se?.title}</h2>
            <p className="s-8d7f09">The SE scopes the work, drafts the proposal in Prospero and sets the hours on the quote. They join the deal team and get notified.</p>
          </div>
          <div className="s-620e22" role="radiogroup" aria-labelledby="se-pick">
            <span className="s-b34b0c" id="se-pick">Solutions engineer</span>
            {list(v.se?.options).map((o, i0) => (<React.Fragment key={i0}>
              <button className="s-f988b9" role="radio" aria-checked={o?.checked} onClick={o?.pick} style={{ border: `1.5px solid ${o?.bd ?? ""}`, background: o?.bg, color: "#14112E", font: "inherit", textAlign: "left", cursor: "pointer" }}>
                <span className="s-e39d1d" aria-hidden="true">{o?.initials}</span>
                <span className="s-4ad4e4">
                  <span className="s-6de5a7">{o?.name}</span>
                  <span className="s-e02b7d">{o?.load}</span>
                </span>
                <span className="s-520fc6" aria-hidden="true" style={{ border: `2px solid ${o?.ring ?? ""}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span className="s-4b3c1e" style={{ background: o?.dot }}></span>
                </span>
              </button>
            </React.Fragment>))}
          </div>
          <div className="s-d08feb">
            <label className="s-b34b0c" htmlFor="se-scope">What do you need from the SE?</label>
            <select className="s-404a47" id="se-scope" value={v.se?.scope ?? ""} onChange={v.setSeScope}>
              <option>Scope the work and draft the proposal</option>
              <option>Set the hours on the quote</option>
              <option>Review the quote before it goes out</option>
            </select>
          </div>
          <div className="s-d08feb">
            <label className="s-b34b0c" htmlFor="se-note">
              Note for the SE{" "}
              <span className="s-c5e12b">(optional)</span>
            </label>
            <textarea className="s-a02c7a" id="se-note" value={v.se?.note ?? ""} onChange={v.setSeNote} rows="3" placeholder="Context from the right-fit call, deadlines, anything they should know" />
          </div>
          <p className="s-06def0">{v.se?.foot}</p>
          <div className="s-e8558f">
            <button className="s-93a0d4" onClick={v.se?.confirm} disabled={on(v.se?.off)} style={{ border: `1px solid ${v.se?.b?.bd ?? ""}`, background: v.se?.b?.bg, color: v.se?.b?.fg, cursor: v.se?.b?.cur, font: "inherit", fontWeight: "600" }}>{v.se?.cta}</button>
            <button className="s-5e75ba" onClick={v.closeModal}>Cancel</button>
          </div>
        </div>
      </div>
    </>
  );
}
