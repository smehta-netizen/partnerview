// Generated from the PartnerView design-canvas prototype. Edit freely.
import React from 'react';
import { on, list } from '../runtime';


export default function ContactsScreen({ v }) {
  return (
    <>
      <section className="s-7356d2">
        <div className="s-4678e7">
          <div>
            <h1 className="s-890aa1">Contacts</h1>
          </div>
          <input className="s-f628d3" id="ct-search" type="search" aria-label="Search contacts" value={v.contactQ ?? ""} onChange={v.setContactQ} placeholder="Search name, company or email" />
        </div>
        <div className="s-86dd31">
          <div className="s-d842c2">
            <div className="s-ac7dcb">
              <span>ID</span>
              <span>Name</span>
              <span>Company</span>
              <span>Role</span>
              <span>Email</span>
              <span>Phone</span>
            </div>
            {list(v.contacts).map((c, i0) => (<React.Fragment key={i0}>
              {" "}
              <button className="s-76cb94" onClick={c?.open}>
                <span className="s-7fe044">{c?.code}</span>
                <span className="s-1b0011">{c?.name}</span>
                <span>{c?.company}</span>
                <span className="s-8c532a">
                  {list(c?.chips).map((ch, i1) => (<React.Fragment key={i1}>
                    <span className="s-fe6a2a" style={{ background: ch?.bg, color: ch?.fg }}>{ch?.label}</span>
                  </React.Fragment>))}
                </span>
                <span className="s-0dc2d5">{c?.email}</span>
                <span className="s-7fe044">{c?.phone}</span>
              </button>
              {" "}
            </React.Fragment>))}
            {on(v.contactsEmpty) && (<>
              <p className="s-061ccc">No contacts match that search.</p>
            </>)}
          </div>
        </div>
      </section>
    </>
  );
}
