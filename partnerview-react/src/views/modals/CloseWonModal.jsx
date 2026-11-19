// Generated from the PartnerView design-canvas prototype. Edit freely.
import React from 'react';
import { on, list } from '../runtime';


export default function CloseWonModal({ v }) {
  return (
    <>
      <div className="s-d6accc">
        <div className="s-e560cc" role="dialog" aria-modal="true" aria-labelledby="close-title">
          <h2 className="s-ef9167" id="close-title">{"Close "}{v.dv?.company}{" as won"}</h2>
          <div className="s-d08feb">
            <label className="s-b34b0c" htmlFor="c-reason">Win reason</label>
            <select className="s-404a47" id="c-reason" value={v.close?.reason ?? ""} onChange={v.setReason}>
              <option>Strong product fit</option>
              <option>Price and value</option>
              <option>Rep relationship</option>
              <option>Timing</option>
            </select>
          </div>
          <div className="s-d08feb">
            <label className="s-b34b0c" htmlFor="c-amount">Actual close amount</label>
            <input className="s-5552ac" id="c-amount" value={v.close?.amount ?? ""} onChange={v.setAmount} />
          </div>
          <div className="s-e8558f">
            <button className="s-429d7a" onClick={v.dv?.confirmClose}>Confirm Closed Won</button>
            <button className="s-5e75ba" onClick={v.closeModal}>Cancel</button>
          </div>
        </div>
      </div>
    </>
  );
}
