// Generated from the PartnerView design-canvas prototype. Edit freely.
import React from 'react';
import { on, list } from '../runtime';


export default function TaskDrawer({ v }) {
  return (
    <>
      <div className={["aw-scrim", "s-38b0fe"].join(" ")} onClick={v.td?.close}></div>
      <aside className={["aw-drawer", "s-01df01"].join(" ")} role="dialog" aria-modal="true" aria-labelledby="td-name">
        <div className="s-4c3b8b">
          <div className="s-445cdb">
            <span className="s-052c9a">{v.td?.kind}</span>
            <button className="s-ce60ee" onClick={v.td?.close} aria-label={v.td?.closeA} title="Close">×</button>
          </div>
          <label className="s-2140d3" htmlFor="td-name">{v.td?.nameLabel}</label>
          <input className="s-7ac915" id="td-name" type="text" value={v.td?.name ?? ""} onChange={v.td?.setName} />
          <div className="s-4b41f8">
            <select className="s-02b4ec" aria-label={v.td?.statusLabel} value={v.td?.status ?? ""} onChange={v.td?.setStatus} style={{ background: v.td?.statusBg, color: v.td?.statusFg, font: "inherit", fontSize: "12.5px", fontWeight: "600" }}>
              {list(v.td?.statusOpts).map((o, i0) => (<React.Fragment key={i0}>
                <option value={o?.v}>{o?.label}</option>
              </React.Fragment>))}
            </select>
            {on(v.td?.isProj) && (<>
              <select className="s-02b4ec" aria-label="Type" value={v.td?.type ?? ""} onChange={v.td?.setType} style={{ background: v.td?.typeBg, color: v.td?.typeFg, font: "inherit", fontSize: "12.5px", fontWeight: "600" }}>
                {list(v.td?.typeOpts).map((o, i0) => (<React.Fragment key={i0}>
                  <option value={o?.v}>{o?.label}</option>
                </React.Fragment>))}
              </select>
            </>)}
            {on(v.td?.isProj) && (<>
              {on(v.td?.canKey) && (<>
                <button className="s-4e7366" onClick={v.td?.toggleKey} aria-pressed={v.td?.keyOn} title={v.td?.keyTip} style={{ border: `1px ${v.td?.keyLine ?? ""} ${v.td?.keyBd ?? ""}`, background: v.td?.keyBg, color: v.td?.keyFg, font: "inherit", fontSize: "12.5px", fontWeight: "600", cursor: "pointer" }}>
                  <span aria-hidden="true">{v.td?.keyGlyph}</span>
                  {v.td?.keyText}
                </button>
              </>)}
            </>)}
            {on(v.td?.isProj) && (<>
              {on(v.td?.isKey) && (<>
                {on(v.isAe) && (<>
                  <span className="s-e8e136">
                    <span aria-hidden="true">◆</span>
                    Key milestone
                  </span>
                </>)}
              </>)}
            </>)}
          </div>
        </div>
        <div className="s-67e264">
          {on(v.td?.isTask) && (<>
            <div className="s-c71e8e">
              <div className="s-d08feb">
                <label className="s-f3044f" htmlFor="td-owner">Assignee</label>
                <select className="s-a5011f" id="td-owner" value={v.td?.owner ?? ""} onChange={v.td?.setOwner}>
                  {list(v.td?.ownerOpts).map((o, i0) => (<React.Fragment key={i0}>
                    <option value={o?.v}>{o?.label}</option>
                  </React.Fragment>))}
                </select>
              </div>
              <div className="s-d08feb">
                <label className="s-f3044f" htmlFor="td-due">Due date</label>
                <input className="s-a5011f" id="td-due" type="date" value={v.td?.due ?? ""} onChange={v.td?.setDue} />
              </div>
              {on(v.td?.isProj) && (<>
                <div className="s-d08feb">
                  <label className="s-f3044f" htmlFor="td-est">Estimated hours</label>
                  <input className="s-32be25" id="td-est" type="number" min="0" step="1" value={v.td?.est ?? ""} onChange={v.td?.setEst} placeholder="0" />
                </div>
              </>)}
              {on(v.td?.isProj) && (<>
                <div className="s-d08feb">
                  <span className="s-f3044f">Actual time logged</span>
                  <div className="s-a930f6">
                    <span className="s-207586" style={{ color: v.td?.loggedFg }}>{v.td?.logged}</span>
                    <button className="s-774852" onClick={v.td?.logTime}>Log time</button>
                  </div>
                </div>
              </>)}
              {on(v.td?.isDealTask) && (<>
                <div className="s-d08feb">
                  <span className="s-f3044f">Time logged</span>
                  <div className="s-a930f6">
                    <span className="s-207586" style={{ color: v.td?.loggedFg }}>{v.td?.logged}</span>
                    <button className="s-1036a2" onClick={v.td?.logTime} disabled={on(v.td?.logOff)} title={v.td?.logTip} aria-label={v.td?.logLabel} style={{ border: `1px solid ${v.td?.logBd ?? ""}`, background: v.td?.logBg, color: v.td?.logFg, font: "inherit", fontSize: "12.5px", fontWeight: "600", cursor: v.td?.logCur }}>Log time</button>
                  </div>
                </div>
              </>)}
            </div>
            <div className="s-d08feb">
              <label className="s-7cd25f" htmlFor="td-desc">Description</label>
              <textarea className="s-fc575e" id="td-desc" value={v.td?.desc ?? ""} onChange={v.td?.setDesc} rows="5" placeholder="What needs to happen, what done looks like, and any links the team needs." />
            </div>
          </>)}
          {on(v.td?.isAct) && (<>
            <div className="s-c71e8e">
              <div className="s-d08feb">
                <span className="s-f3044f">Logged by</span>
                <span className="s-28a120">
                  {v.td?.who}
                  {on(v.td?.hasRole) && (<>
                    <span className="s-1afa54">{v.td?.role}</span>
                  </>)}
                </span>
              </div>
              <div className="s-d08feb">
                <label className="s-f3044f" htmlFor="td-adate">{v.td?.dateLabel}</label>
                <input className="s-0b6032" id="td-adate" type="date" value={v.td?.date ?? ""} onChange={v.td?.setDate} />
              </div>
              <div className="s-d08feb">
                <span className="s-f3044f">Time logged</span>
                <div className="s-a930f6">
                  <span className="s-207586" style={{ color: v.td?.loggedFg }}>{v.td?.logged}</span>
                  <button className="s-1036a2" onClick={v.td?.logTime} disabled={on(v.td?.logOff)} aria-label={v.td?.logLabel} style={{ border: `1px solid ${v.td?.logBd ?? ""}`, background: v.td?.logBg, color: v.td?.logFg, font: "inherit", fontSize: "12.5px", fontWeight: "600", cursor: v.td?.logCur }}>Log time</button>
                </div>
              </div>
            </div>
            <div className="s-d08feb">
              <label className="s-7cd25f" htmlFor="td-adetails">Details</label>
              <textarea className="s-fc575e" id="td-adetails" value={v.td?.details ?? ""} onChange={v.td?.setDetails} rows="5" placeholder="Who attended, what was agreed, links to recordings" />
            </div>
          </>)}
          {on(v.td?.isDrd) && (<>
            <div className="s-e2cc18">
              {list(v.td?.drdRows).map((f, i0) => (<React.Fragment key={i0}>
                <div className="s-fc127a">
                  <span className="s-78398b">{f?.k}</span>
                  <span className="s-392a00">{f?.v}</span>
                </div>
              </React.Fragment>))}
            </div>
          </>)}
          {on(v.td?.isProj) && (<>
            <div className="s-620e22">
              <div className="s-223058">
                <h3 className="s-7cd25f">Requirements</h3>
                <button className="s-6f4ac8" onClick={v.td?.openReqs}>Link requirements</button>
              </div>
              {list(v.td?.reqItems).map((r, i0) => (<React.Fragment key={i0}>
                <button className="s-d0b680" onClick={r?.open}>
                  <span className="s-acee96">
                    <svg aria-hidden="true" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                      <path d="M14 3v6h6"></path>
                    </svg>
                  </span>
                  <span className="s-4ad4e4">{r?.label}</span>
                  <span className="s-963b92" aria-hidden="true">›</span>
                </button>
              </React.Fragment>))}
              {on(v.td?.noReqItems) && (<>
                <p className="s-62e046">No requirements linked yet.</p>
              </>)}
            </div>
          </>)}
          <div className="s-620e22">
            <h3 className="s-7cd25f">
              Chatter{" "}
              <span className="s-c5e12b">{v.td?.chat?.count}</span>
            </h3>
            <textarea className="s-047f0a" aria-label={v.td?.postA} value={v.td?.chat?.draft ?? ""} onChange={v.td?.chat?.setDraft} rows="2" placeholder="Ask a question or share an update. Type @ and a first name to notify someone." />
            <button className="s-4a90a4" onClick={v.td?.chat?.post} disabled={on(v.td?.chat?.off)} style={{ border: `1px solid ${v.td?.chat?.b?.bd ?? ""}`, background: v.td?.chat?.b?.bg, color: v.td?.chat?.b?.fg, cursor: v.td?.chat?.b?.cur, font: "inherit", fontSize: "13px", fontWeight: "600" }}>Post</button>
            <div className="s-fc3a5f">
              {list(v.td?.chat?.posts).map((m, i0) => (<React.Fragment key={i0}>
                <div className="s-840c07">
                  <span className="s-d6fa6d" aria-hidden="true">{m?.initials}</span>
                  <div className="s-599a2a">
                    <div className="s-6370aa">
                      <span className="s-fc34ba">{m?.by}</span>
                      <span className="s-ec7e25">{m?.when}</span>
                    </div>
                    <p className="s-adc0a9">{m?.text}</p>
                    {on(m?.hasMentions) && (<>
                      <span className="s-d56b2f">{m?.mentionText}</span>
                    </>)}
                  </div>
                  {on(m?.canDelete) && (<>
                    <button className="s-669f1f" onClick={m?.del} aria-label="Delete post">×</button>
                  </>)}
                </div>
              </React.Fragment>))}
              {on(v.td?.chat?.empty) && (<>
                <p className="s-842b63">No posts yet.</p>
              </>)}
            </div>
          </div>
        </div>
        <div className="s-ff5abf">
          {on(v.td?.isDrd) && (<>
            <span></span>
          </>)}
          {on(v.td?.isTask) && (<>
            <button className="s-5290b6" onClick={v.td?.del}>Delete task</button>
          </>)}
          {on(v.td?.isAct) && (<>
            <button className="s-5290b6" onClick={v.td?.del}>Delete activity</button>
          </>)}
          <button className="s-d43d3d" onClick={v.td?.close}>Done</button>
        </div>
      </aside>
    </>
  );
}
