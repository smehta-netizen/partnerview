// Generated from the PartnerView design-canvas prototype. Edit freely.
import React from 'react';
import { on, list } from '../runtime';


export default function NewCompanyModal({ v }) {
  return (
    <>
      <div className="s-d6accc">
        <div className="s-89b90d" role="dialog" aria-modal="true" aria-labelledby="nc-title">
          <div className="s-bc0172">
            <h2 className="s-ef9167" id="nc-title">New company</h2>
            <p className="s-105eaf">Add the account first. Contacts, deals and files can follow from its page.</p>
          </div>
          <div className="s-d08feb">
            <label className="s-b34b0c" htmlFor="nc-name">
              Company name{" "}
              <span className="s-d484b9">*</span>
            </label>
            <input className="s-8d3c8a" id="nc-name" type="text" value={v.nc?.name ?? ""} onChange={v.nc?.setName} autoComplete="off" placeholder="e.g. Northwind Clinics" />
            {on(v.nc?.hasDup) && (<>
              <span className="s-017b7f">{v.nc?.dupNote}</span>
            </>)}
          </div>
          <div className="s-a08bce">
            <div className="s-4cc8a6">
              <label className="s-b34b0c" htmlFor="nc-web">Website</label>
              <input className="s-8d3c8a" id="nc-web" type="text" value={v.nc?.website ?? ""} onChange={v.nc?.setWebsite} placeholder="company.com" />
            </div>
            <div className="s-4cc8a6">
              <label className="s-b34b0c" htmlFor="nc-hq">HQ location</label>
              <input className="s-8d3c8a" id="nc-hq" type="text" value={v.nc?.hq ?? ""} onChange={v.nc?.setHq} placeholder="City, country" />
            </div>
            <div className="s-4cc8a6">
              <label className="s-b34b0c" htmlFor="nc-ind">Industry</label>
              <input className="s-8d3c8a" id="nc-ind" type="text" value={v.nc?.industry ?? ""} onChange={v.nc?.setIndustry} placeholder="e.g. Healthcare" />
            </div>
            <div className="s-4cc8a6">
              <label className="s-b34b0c" htmlFor="nc-size">Company size</label>
              <select className="s-8d3c8a" id="nc-size" value={v.nc?.size ?? ""} onChange={v.nc?.setSize}>
                {list(v.nc?.sizeOpts).map((o, i0) => (<React.Fragment key={i0}>
                  <option value={o?.v}>{o?.label}</option>
                </React.Fragment>))}
              </select>
            </div>
            <div className="s-4cc8a6">
              <label className="s-b34b0c" htmlFor="nc-tier">Customer tier</label>
              <select className="s-8d3c8a" id="nc-tier" value={v.nc?.tier ?? ""} onChange={v.nc?.setTier}>
                {list(v.nc?.tierOpts).map((o, i0) => (<React.Fragment key={i0}>
                  <option value={o?.v}>{o?.label}</option>
                </React.Fragment>))}
              </select>
            </div>
            <div className="s-4cc8a6">
              <label className="s-b34b0c" htmlFor="nc-strat">Strategic</label>
              <select className="s-8d3c8a" id="nc-strat" value={v.nc?.strategic ?? ""} onChange={v.nc?.setStrategic}>
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </select>
            </div>
          </div>
          <div className="s-e8558f">
            <button className="s-93a0d4" onClick={v.nc?.save} disabled={on(v.nc?.off)} style={{ border: `1px solid ${v.nc?.b?.bd ?? ""}`, background: v.nc?.b?.bg, color: v.nc?.b?.fg, cursor: v.nc?.b?.cur, font: "inherit", fontWeight: "600" }}>Add company</button>
            <button className="s-5e75ba" onClick={v.closeModal}>Cancel</button>
          </div>
        </div>
      </div>
    </>
  );
}
