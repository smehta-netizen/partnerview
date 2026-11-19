// Generated from the PartnerView design-canvas prototype. Edit freely.
import React from 'react';
import { on, list } from '../runtime';


export default function ResetDemoModal({ v }) {
  return (
    <>
      <div className="s-d6accc">
        <div className="s-420908" role="dialog" aria-modal="true" aria-labelledby="reset-title">
          <span className="s-d8b631">For demo purposes only</span>
          <h2 className="s-ef9167" id="reset-title">Reset demo data?</h2>
          <p className="s-2319f8">This is a demo environment. Resetting clears every change made here and restores the 9 sample records: 3 leads and 6 deals. No real customer data is touched.</p>
          <div className="s-e8558f">
            <button className="s-6c5175" onClick={v.doReset}>Reset demo data</button>
            <button className="s-5e75ba" onClick={v.closeModal}>Keep my changes</button>
          </div>
        </div>
      </div>
    </>
  );
}
