// Generated from the PartnerView design-canvas prototype. Edit freely.
import React from 'react';
import { on, list } from '../runtime';


export default function CompaniesScreen({ v }) {
  return (
    <>
      <section className="s-7356d2">
        <div className="s-4678e7">
          <div>
            <h1 className="s-890aa1">Companies</h1>
          </div>
          <button className="s-023022" onClick={v.nc?.openForm}>+ New company</button>
        </div>
        <div className="s-86dd31">
          <div className="s-5a6f60">
            <div className="s-a1c9f4">
              <span>ID</span>
              <span>Company</span>
              <span>Industry</span>
              <span>Tier</span>
              <span className="s-30489c">Pipeline</span>
              <span className="s-30489c">Lifetime value</span>
              <span className="s-30489c">ARR</span>
              <span className="s-30489c">Projects</span>
            </div>
            {list(v.companies).map((c, i0) => (<React.Fragment key={i0}>
              {" "}
              <button className="s-a18df8" onClick={c?.open}>
                <span className="s-7fe044">{c?.code}</span>
                <span className="s-33f2a6">
                  <span className="s-808f96">{c?.name}</span>
                  <span className="s-98a285">{c?.counts}</span>
                </span>
                <span className="s-ec2d63">{c?.industry}</span>
                <span>
                  <span className="s-ec4ead">{c?.tier}</span>
                </span>
                <span className="s-647d9c">{c?.pipeline}</span>
                <span className="s-647d9c">{c?.won}</span>
                <span className="s-647d9c">{c?.arr}</span>
                <span className="s-647d9c">{c?.projects}</span>
              </button>
              {" "}
            </React.Fragment>))}
          </div>
        </div>
      </section>
    </>
  );
}
