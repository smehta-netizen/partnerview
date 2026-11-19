// Generated from the PartnerView design-canvas prototype. Edit freely.
import React from 'react';
import { on, list } from '../runtime';


export default function DealTaskTimeModal({ v }) {
  return (
    <>
      <div className="s-55b3e5">
        <div className="s-5167f3" role="dialog" aria-modal="true" aria-labelledby="dtime-title">
          <div className="s-bc0172">
            <h2 className="s-ef9167" id="dtime-title">Log time</h2>
            <p className="s-8d7f09">{v.dv?.dtm?.sub}</p>
          </div>
          <div className="s-ba0ec7">
            <div className="s-4cc8a6">
              <label className="s-b34b0c" htmlFor="dt-date">Date</label>
              <input className="s-404a47" id="dt-date" type="date" value={v.dv?.dtm?.date ?? ""} onChange={v.dv?.dtm?.setDate} />
            </div>
            <div className="s-4cc8a6">
              <label className="s-b34b0c" htmlFor="dt-hours">Hours</label>
              <input className="s-9c3272" id="dt-hours" type="number" min="0.25" step="0.25" value={v.dv?.dtm?.hours ?? ""} onChange={v.dv?.dtm?.setHours} placeholder="e.g. 2" />
            </div>
          </div>
          <div className="s-d08feb">
            <label className="s-b34b0c" htmlFor="dt-note">
              Note{" "}
              <span className="s-c5e12b">(optional)</span>
            </label>
            <input className="s-404a47" id="dt-note" type="text" value={v.dv?.dtm?.note ?? ""} onChange={v.dv?.dtm?.setNote} placeholder="What did you work on?" />
          </div>
          <p className="s-7597f9">
            Logged as{" "}
            <strong className="s-9075cb">{v.dv?.dtm?.who}</strong>
            {" "}{"\u00b7 "}{v.dv?.dtm?.already}
          </p>
          <div className="s-e8558f">
            <button className="s-93a0d4" onClick={v.dv?.dtm?.save} disabled={on(v.dv?.dtm?.off)} style={{ border: `1px solid ${v.dv?.dtm?.b?.bd ?? ""}`, background: v.dv?.dtm?.b?.bg, color: v.dv?.dtm?.b?.fg, cursor: v.dv?.dtm?.b?.cur, font: "inherit", fontWeight: "600" }}>Log time</button>
            <button className="s-5e75ba" onClick={v.closeModal}>Cancel</button>
          </div>
        </div>
      </div>
    </>
  );
}
