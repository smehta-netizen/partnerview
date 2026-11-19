// Generated from the PartnerView design-canvas prototype. Edit freely.
import React from 'react';
import { on, list } from '../runtime';


export default function HomeScreen({ v }) {
  return (
    <>
      <section className="s-7356d2">
        <div className="s-4678e7">
          <h1 className="s-890aa1">My work</h1>
        </div>
        <div className="s-c71e8e">
          {list(v.kpis).map((k, i0) => (<React.Fragment key={i0}>
            <div className="s-48808d">
              <div className="s-e000b9">{k?.label}</div>
              <div className="s-694bc5">{k?.value}</div>
              <div className="s-8156b0">{k?.note}</div>
            </div>
          </React.Fragment>))}
        </div>
        <div className="s-7adc92">
          <button className="s-014443" onClick={v.toggleSide} aria-pressed={v.sideHiddenA} title={v.sideLabel}>
            <svg aria-hidden="true" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="16" rx="2"></rect>
              <path d="M15 4v16"></path>
            </svg>
            {v.sideLabel}
          </button>
        </div>
        <div className="s-9f90e7">
          <div className="s-775a54">
            <div className="s-7ef018">
              <h2 className="s-f646f6">Needs my action</h2>
              <span className="s-3ec15a">{v.queueCount}</span>
            </div>
            {list(v.queue).map((q, i0) => (<React.Fragment key={i0}>
              <div className="s-103118">
                <div className="s-9f1660">
                  <span className="s-78ac78" style={{ background: q?.pill?.bg, color: q?.pill?.fg }}>{q?.tag}</span>
                  <div className="s-33f2a6">
                    <div className="s-21a1be">{q?.title}</div>
                    <div className="s-1c20f5">{q?.detail}</div>
                  </div>
                </div>
                <button className="s-47c6ef" onClick={q?.go}>{q?.cta}</button>
              </div>
            </React.Fragment>))}
            {on(v.queueEmpty) && (<>
              <p className="s-6bbb05">Nothing waiting on you.</p>
            </>)}
          </div>
          {on(v.sideOpen) && (<>
            <div className="s-5f8958">
              <div className="s-933dad">
                <span className="s-469ac6" aria-hidden="true"></span>
                <span>Demo guide</span>
              </div>
              <h2 className="s-7d18c4">Six things to try</h2>
              <p className="s-06ba34">Changes stay in this browser. Reset demo data starts over.</p>
              {list(v.scenarios).map((t, i0) => (<React.Fragment key={i0}>
                <div className="s-b459b2">
                  <span className="s-6bed4d" aria-hidden="true" style={{ border: `1px solid ${t?.dotBd ?? ""}`, background: t?.dotBg, color: t?.dotFg, display: "flex", alignItems: "center", justifyContent: "center", fontVariantNumeric: "tabular-nums", fontSize: "12px", fontWeight: "600" }}>{t?.mark}</span>
                  <div className="s-4ad4e4">
                    <div className="s-21a1be">{t?.title}</div>
                    <div className="s-e000b9">{t?.detail}</div>
                  </div>
                  <button className="s-cb7e59" onClick={t?.go}>{t?.cta}</button>
                </div>
              </React.Fragment>))}
            </div>
          </>)}
        </div>
      </section>
    </>
  );
}
