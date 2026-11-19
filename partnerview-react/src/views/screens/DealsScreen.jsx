// Generated from the PartnerView design-canvas prototype. Edit freely.
import React from 'react';
import { on, list } from '../runtime';


export default function DealsScreen({ v }) {
  return (
    <>
      <section className="s-7356d2">
        <div className="s-4678e7">
          <div>
            <h1 className="s-890aa1">Deals</h1>
          </div>
          <div className="s-b665df">
            <div className="s-d1f9fb" role="radiogroup" aria-label="Deals view">
              <button className="s-4398bb" role="radio" aria-checked={v.dl?.tableOn} onClick={v.dl?.showTable} style={{ background: v.dl?.tableBg, color: "#14112E", font: "inherit", fontSize: "13px", fontWeight: "600", cursor: "pointer" }}>Table</button>
              <button className="s-4398bb" role="radio" aria-checked={v.dl?.boardOn} onClick={v.dl?.showBoard} style={{ background: v.dl?.boardBg, color: "#14112E", font: "inherit", fontSize: "13px", fontWeight: "600", cursor: "pointer" }}>Board</button>
            </div>
            <button className="s-023022" onClick={v.dl?.newDeal}>+ New deal</button>
          </div>
        </div>
        {on(v.dl?.isBoard) && (<>
          <div className="s-afc24c">
            {list(v.columns).map((c, i0) => (<React.Fragment key={i0}>
              <div className="s-fa869b">
                <div className="s-d09a4c">
                  <span className="s-1c9385">
                    {c?.name}{" "}
                    <span className="s-e652a3">{c?.count}</span>
                  </span>
                  <span className="s-7fe044">{c?.total}</span>
                </div>
                {list(c?.cards).map((d, i1) => (<React.Fragment key={i1}>
                  <button className="s-a19f14" onClick={d?.open}>
                    <span className="s-658142">
                      <span className="s-1c9385">{d?.company}</span>
                      {on(d?.strategic) && (<>
                        <span className="s-2054a1">Strategic</span>
                      </>)}
                    </span>
                    <span className="s-1c20f5">{d?.name}</span>
                    <span className="s-fc694b">{d?.code}</span>
                    <span className="s-d31caa">{d?.totalText}</span>
                    <span className="s-ac066f" style={{ background: d?.pill?.bg, color: d?.pill?.fg }}>{d?.chip}</span>
                    {on(d?.hasFcat) && (<>
                      <span className="s-fc694b">{d?.fcat}</span>
                    </>)}
                  </button>
                </React.Fragment>))}
              </div>
            </React.Fragment>))}
          </div>
        </>)}
        {on(v.dl?.isTable) && (<>
          <div className="s-86dd31">
            <div className="s-ac27b8">
              <div className="s-6b417e">
                <span>ID</span>
                <span>Deal</span>
                <span>Company</span>
                <span>Owner (AE)</span>
                <span>Stage</span>
                <span>Expected close</span>
                <span>Type</span>
                <span>Forecast category</span>
                <span className="s-30489c">Value</span>
              </div>
              {list(v.dl?.rows).map((r, i0) => (<React.Fragment key={i0}>
                {" "}
                <button className="s-2674e6" onClick={r?.open}>
                  <span className="s-7fe044">{r?.code}</span>
                  <span className="s-14df4b">{r?.name}</span>
                  <span className="s-72d5d9">{r?.company}</span>
                  <span className="s-ec2d63">{r?.owner}</span>
                  <span>
                    <span className="s-3ce5c1" style={{ background: r?.pill?.bg, color: r?.pill?.fg }}>{r?.stage}</span>
                  </span>
                  <span className="s-7fe044">{r?.close}</span>
                  <span className="s-ec2d63">{r?.type}</span>
                  <span className="s-ec2d63">{r?.fcat}</span>
                  <span className="s-647d9c">{r?.value}</span>
                </button>
                {" "}
              </React.Fragment>))}
            </div>
          </div>
        </>)}
      </section>
    </>
  );
}
