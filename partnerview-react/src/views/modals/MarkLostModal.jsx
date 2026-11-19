// Generated from the PartnerView design-canvas prototype. Edit freely.
import React from 'react';
import { on, list } from '../runtime';


export default function MarkLostModal({ v }) {
  return (
    <>
      <div className="s-d6accc">
        <div className="s-fce469" role="dialog" aria-modal="true" aria-labelledby="lost-title">
          <div className="s-bc0172">
            <h2 className="s-ef9167" id="lost-title">{"Close "}{v.lv2?.company}{" as lost"}</h2>
            <p className="s-8d7f09">The deal leaves the open pipeline and its quotes lock. The reason feeds win/loss reporting.</p>
          </div>
          <div className="s-d08feb">
            <label className="s-b34b0c" htmlFor="l-reason">
              Lost reason{" "}
              <span className="s-d484b9" aria-hidden="true">*</span>
              <span className="s-14ff23">required</span>
            </label>
            <select className="s-404a47" id="l-reason" value={v.lv2?.reason ?? ""} onChange={v.setLostReason}>
              <option value="">Pick a reason</option>
              <option>Lost to a competitor</option>
              <option>Price or budget</option>
              <option>No decision / went dark</option>
              <option>Timing / project postponed</option>
              <option>Doing it in-house</option>
              <option>Not a fit for us</option>
            </select>
          </div>
          {on(v.lv2?.showCompetitor) && (<>
            <div className="s-d08feb">
              <label className="s-b34b0c" htmlFor="l-comp">Which competitor?</label>
              <input className="s-240b15" id="l-comp" value={v.lv2?.competitor ?? ""} onChange={v.setLostComp} placeholder="Partner or vendor name" />
            </div>
          </>)}
          <div className="s-d08feb">
            <label className="s-b34b0c" htmlFor="l-note">
              What did we learn?{" "}
              <span className="s-c5e12b">(optional)</span>
            </label>
            <textarea className="s-a02c7a" id="l-note" value={v.lv2?.note ?? ""} onChange={v.setLostNote} rows="3" placeholder="What tipped it, and what we would do differently" />
          </div>
          <div className="s-e8558f">
            <button className="s-93a0d4" onClick={v.lv2?.confirm} disabled={on(v.lv2?.off)} style={{ border: `1px solid ${v.lv2?.b?.bd ?? ""}`, background: v.lv2?.b?.bg, color: v.lv2?.b?.fg, cursor: v.lv2?.b?.cur, font: "inherit", fontWeight: "600" }}>Mark Closed Lost</button>
            <button className="s-5e75ba" onClick={v.closeModal}>Cancel</button>
          </div>
        </div>
      </div>
    </>
  );
}
