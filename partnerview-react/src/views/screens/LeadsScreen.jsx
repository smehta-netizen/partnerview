// Generated from the PartnerView design-canvas prototype. Edit freely.
import React from 'react';
import { on, list } from '../runtime';


export default function LeadsScreen({ v }) {
  return (
    <>
      <section className="s-7356d2">
        <div className="s-4678e7">
          <div>
            <h1 className="s-890aa1">Leads</h1>
          </div>
          <button className="s-023022" onClick={v.newLead}>+ New lead</button>
        </div>
        <div className="s-86dd31">
          <div className="s-106f8a">
            <div className="s-ad4363">
              <span>ID</span>
              <span>Lead</span>
              <span>Company</span>
              <span>Owner (AE)</span>
              <span>Status</span>
              <span>Source</span>
              <span>Products and services</span>
              <span>Email</span>
              <span className="s-30489c">Est. value</span>
            </div>
            {list(v.leads).map((l, i0) => (<React.Fragment key={i0}>
              {" "}
              <button className="s-f33794" onClick={l?.open}>
                <span className="s-7fe044">{l?.code}</span>
                <span className="s-14df4b">{l?.name}</span>
                <span className="s-72d5d9">{l?.company}</span>
                <span className="s-ec2d63">{l?.ownerText}</span>
                <span>
                  <span className="s-1e4be5" style={{ background: l?.pill?.bg, color: l?.pill?.fg }}>{l?.status}</span>
                </span>
                <span className="s-ec2d63">{l?.source}</span>
                <span className="s-ec2d63">{l?.interest}</span>
                <span className="s-403920">{l?.email}</span>
                <span className="s-647d9c">{l?.valueText}</span>
              </button>
              {" "}
            </React.Fragment>))}
            {on(v.leadsEmpty) && (<>
              <p className="s-731d89">No open leads. Add one with New lead.</p>
            </>)}
          </div>
        </div>
      </section>
    </>
  );
}
