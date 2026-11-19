// Generated from the PartnerView design-canvas prototype. Edit freely.
import React from 'react';
import { on, list } from '../runtime';


export default function ChatPanel({ v }) {
  return (
    <>
      <div className={["aw-scrim", "s-f3c744"].join(" ")} onClick={v.cht?.close}></div>
      <aside className={["aw-drawer", "s-da7781"].join(" ")} role="dialog" aria-modal="true" aria-labelledby="cht-title">
        <div className="s-dea1cb">
          {on(v.cht?.hasBack) && (<>
            <button className="s-ed3ef5" onClick={v.cht?.back}>{"\u2190 "}{v.cht?.backText}</button>
          </>)}
          <div className="s-0ffd52">
            <div className="s-33f2a6">
              {" "}
              <span className="s-052c9a">{"Chatter \u00b7 "}{v.cht?.kind}</span>
              {" "}
              <h2 className="s-989fdc" id="cht-title">{v.cht?.target}</h2>
              <p className="s-c2bcb3">{v.cht?.sub}</p>
            </div>
            <button className="s-ce60ee" onClick={v.cht?.close} aria-label="Close chatter" title="Close">×</button>
          </div>
        </div>
        <div className="s-3fe28b">
          <textarea className="s-047f0a" aria-label="Write a post" value={v.cht?.draft ?? ""} onChange={v.cht?.setDraft} rows="3" placeholder="Ask a question or share an update. Type @ and a first name to notify someone." />
          <div className="s-223058">
            <span className="s-ec7e25">{v.cht?.roll}</span>
            <button className="s-f54529" onClick={v.cht?.post} disabled={on(v.cht?.off)} style={{ border: `1px solid ${v.cht?.b?.bd ?? ""}`, background: v.cht?.b?.bg, color: v.cht?.b?.fg, cursor: v.cht?.b?.cur, font: "inherit", fontSize: "13px", fontWeight: "600" }}>Post</button>
          </div>
        </div>
        <div className="s-be581d">
          {list(v.cht?.posts).map((m, i0) => (<React.Fragment key={i0}>
            <div className="s-8d8574">
              <span className="s-d6fa6d" aria-hidden="true">{m?.initials}</span>
              <div className="s-599a2a">
                <div className="s-6370aa">
                  <span className="s-fc34ba">{m?.by}</span>
                  <span className="s-ec7e25">{m?.when}</span>
                </div>
                {on(m?.hasCtx) && (<>
                  <button className="s-50477f" onClick={m?.openCtx} title="Open this conversation">{m?.ctx}</button>
                </>)}
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
          {on(v.cht?.empty) && (<>
            <p className="s-9f76f9">No posts yet. Start the conversation here. Everyone on this item sees it.</p>
          </>)}
        </div>
      </aside>
    </>
  );
}
