// Generated from the PartnerView design-canvas prototype. Edit freely.
import React from 'react';
import { on, list } from '../runtime';


export default function ContactScreen({ v }) {
  return (
    <>
      <section className="s-e911df">
        <button className="s-849418" onClick={v.goContacts}>Back to contacts</button>
        <div className="s-622fdc">
          <div className="s-33f2a6">
            <div className="s-b665df">
              <h1 className="s-8dd424">{v.ctv?.name}</h1>
              {list(v.ctv?.chips).map((ch, i0) => (<React.Fragment key={i0}>
                <span className="s-1e4be5" style={{ background: ch?.bg, color: ch?.fg }}>{ch?.label}</span>
              </React.Fragment>))}
            </div>
            <p className="s-6f447e">
              <button className="s-6d3999" onClick={v.ctv?.openCompany}>{v.ctv?.company}</button>
            </p>
          </div>
          <span className="s-963192">{v.ctv?.code}</span>
        </div>
        <div className="s-e47a58">
          <div className="s-03c5dd" role="tablist" aria-label="Contact sections">
            {list(v.ctv?.tabs).map((tb, i0) => (<React.Fragment key={i0}>
              <button className="s-176c4f" role="tab" aria-selected={tb?.selected} onClick={tb?.go} style={{ borderBottom: `2px solid ${tb?.bd ?? ""}`, background: "transparent", color: tb?.fg, font: "inherit", fontWeight: tb?.fw, cursor: "pointer" }}>{tb?.label}</button>
            </React.Fragment>))}
          </div>
          <div className="s-c0913e">
            <button className="s-cf516c" onClick={v.ctv?.openChat} aria-label={v.ctv?.chatA} title={v.ctv?.chatA} style={{ border: `1px solid ${v.ctv?.chatBd ?? ""}`, background: v.ctv?.chatBg, color: v.ctv?.chatFg, font: "inherit", fontSize: "12.5px", fontWeight: "600", cursor: "pointer" }}>
              <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"></path>
              </svg>
              <span>Chatter</span>
              <span className="s-42d1ef">{v.ctv?.chatN}</span>
            </button>
            {on(v.ctv?.tabOverview) && (<>
              <button className="s-014443" onClick={v.toggleSide} aria-pressed={v.sideHiddenA} title={v.sideLabel}>
                <svg aria-hidden="true" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="16" rx="2"></rect>
                  <path d="M15 4v16"></path>
                </svg>
                {v.sideLabel}
              </button>
            </>)}
          </div>
        </div>
        {on(v.ctv?.tabOverview) && (<>
          <div className="s-863d40">
            <div className="s-acab10">
              {list(v.ctv?.tables).map((tb, i0) => (<React.Fragment key={i0}>
                <div className="s-f170d9">
                  <div className="s-2cbdac">
                    <h2 className="s-257a5f">
                      <button className="s-72c5bc" onClick={tb?.cl?.toggle} aria-expanded={tb?.cl?.exp}>
                        <svg className="s-0d7706" aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ transform: `rotate(${tb?.cl?.rot ?? ""})`, transition: "transform 0.15s" }}>
                          <path d="M9 6l6 6-6 6"></path>
                        </svg>
                        <span>{tb?.title}</span>
                      </button>
                    </h2>
                    <span className="s-72d4cd">{tb?.count}</span>
                  </div>
                  {on(tb?.cl?.open) && (<>
                    {list(tb?.rows).map((r, i1) => (<React.Fragment key={i1}>
                      {on(r?.canOpen) && (<>
                        {" "}
                        <button className="s-337dba" onClick={r?.open} aria-label={r?.openLabel}>
                          <span className="s-921d3d">
                            <span className="s-6de5a7">{r?.title}</span>
                            <span className="s-98a285">{r?.sub}</span>
                          </span>
                          {on(r?.hasTag) && (<>
                            <span className="s-8e07de" style={{ background: r?.tag?.bg, color: r?.tag?.fg }}>{r?.tagText}</span>
                          </>)}
                          <span className="s-8e07de" style={{ background: r?.pill?.bg, color: r?.pill?.fg }}>{r?.status}</span>
                          <span className="s-45ae1a">{r?.value}</span>
                          <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6F6B89" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9 6l6 6-6 6"></path>
                          </svg>
                        </button>
                        {" "}
                      </>)}
                      {on(r?.noOpen) && (<>
                        <div className="s-5dbbe2">
                          <span className="s-921d3d">
                            <span className="s-6de5a7">{r?.title}</span>
                            <span className="s-98a285">{r?.sub}</span>
                          </span>
                          {on(r?.hasTag) && (<>
                            <span className="s-8e07de" style={{ background: r?.tag?.bg, color: r?.tag?.fg }}>{r?.tagText}</span>
                          </>)}
                          <span className="s-8e07de" style={{ background: r?.pill?.bg, color: r?.pill?.fg }}>{r?.status}</span>
                          <span className="s-45ae1a">{r?.value}</span>
                          <span className="s-4e2ed6" aria-hidden="true"></span>
                        </div>
                      </>)}
                    </React.Fragment>))}
                    {on(tb?.empty) && (<>
                      <p className="s-4e74a7">{tb?.emptyText}</p>
                    </>)}
                  </>)}
                </div>
              </React.Fragment>))}
            </div>
            {on(v.sideOpen) && (<>
              <aside className="s-344502" aria-label="Contact details">
                <div className="s-9a33a4">
                  <div className="s-43e5ac">
                    <h2 className="s-91adb2">
                      <button className="s-72c5bc" onClick={v.cl?.k41?.toggle} aria-expanded={v.cl?.k41?.exp}>
                        <svg className="s-0d7706" aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ transform: `rotate(${v.cl?.k41?.rot ?? ""})`, transition: "transform 0.15s" }}>
                          <path d="M9 6l6 6-6 6"></path>
                        </svg>
                        <span>Contact details</span>
                      </button>
                    </h2>
                    {on(v.ctv?.viewing) && (<>
                      <button className="s-648015" onClick={v.ctv?.edit}>Edit</button>
                    </>)}
                  </div>
                  {on(v.cl?.k41?.open) && (<>
                    {on(v.ctv?.viewing) && (<>
                      {list(v.ctv?.fields).map((f, i0) => (<React.Fragment key={i0}>
                        <div className="s-22fa9f">
                          <span className="s-78398b">{f?.k}</span>
                          <span className="s-392a00">{f?.v}</span>
                        </div>
                      </React.Fragment>))}
                    </>)}
                    {on(v.ctv?.editing) && (<>
                      <div className="s-e252d6">
                        <div className="s-bc0172">
                          <label className="s-a6cf94" htmlFor="ce-name">Full name</label>
                          <input className="s-51dd65" id="ce-name" type="text" value={v.ctv?.ef?.name ?? ""} onChange={v.ctv?.ef?.setName} />
                        </div>
                        <div className="s-bc0172">
                          <label className="s-a6cf94" htmlFor="ce-title">Job title</label>
                          <input className="s-51dd65" id="ce-title" type="text" value={v.ctv?.ef?.title ?? ""} onChange={v.ctv?.ef?.setTitle} placeholder="e.g. Head of operations" />
                        </div>
                        <div className="s-bc0172">
                          <label className="s-a6cf94" htmlFor="ce-email">Email</label>
                          <input className="s-51dd65" id="ce-email" type="email" value={v.ctv?.ef?.email ?? ""} onChange={v.ctv?.ef?.setEmail} />
                        </div>
                        <div className="s-bc0172">
                          <label className="s-a6cf94" htmlFor="ce-phone">Phone</label>
                          <input className="s-51dd65" id="ce-phone" type="tel" value={v.ctv?.ef?.phone ?? ""} onChange={v.ctv?.ef?.setPhone} />
                        </div>
                        <span className="s-629d39">{v.ctv?.ef?.note}</span>
                        <div className="s-71b76f">
                          <button className="s-0e0c57" onClick={v.ctv?.ef?.save} disabled={on(v.ctv?.ef?.off)} style={{ border: `1px solid ${v.ctv?.ef?.b?.bd ?? ""}`, background: v.ctv?.ef?.b?.bg, color: v.ctv?.ef?.b?.fg, cursor: v.ctv?.ef?.b?.cur, font: "inherit", fontSize: "13px", fontWeight: "600" }}>Save</button>
                          <button className="s-7a4d7d" onClick={v.ctv?.cancel}>Cancel</button>
                        </div>
                      </div>
                    </>)}
                  </>)}
                </div>
                <div className="s-d3a2f2">
                  <h2 className="s-91adb2">
                    <button className="s-72c5bc" onClick={v.cl?.k42?.toggle} aria-expanded={v.cl?.k42?.exp}>
                      <svg className="s-0d7706" aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ transform: `rotate(${v.cl?.k42?.rot ?? ""})`, transition: "transform 0.15s" }}>
                        <path d="M9 6l6 6-6 6"></path>
                      </svg>
                      <span>Tags</span>
                    </button>
                  </h2>
                  {on(v.cl?.k42?.open) && (<>
                    <div className="s-2bf69b">
                      {list(v.ctv?.tags).map((t, i0) => (<React.Fragment key={i0}>
                        <button className="s-890a3b" aria-pressed={t?.on} onClick={t?.toggle} title={t?.title} style={{ border: `1px solid ${t?.bd ?? ""}`, background: t?.bg, color: t?.fg, font: "inherit", fontSize: "12.5px", fontWeight: "600", cursor: "pointer" }}>{t?.mark}{t?.label}</button>
                      </React.Fragment>))}
                    </div>
                    <span className="s-629d39">{v.ctv?.tagNote}</span>
                  </>)}
                </div>
              </aside>
            </>)}
          </div>
        </>)}
        {on(v.ctv?.tabLog) && (<>
          <div className="s-f170d9">
            <div className="s-4f08a0">
              <div>
                <h2 className="s-fa1f03">Change log</h2>
                <p className="s-b10591">{v.alog?.count}</p>
              </div>
              <div className="s-4b41f8">
                <label className="s-2140d3" htmlFor="ctv-log-user">Person</label>
                <select className="s-05fe4e" id="ctv-log-user" value={v.alog?.user ?? ""} onChange={v.alog?.setUser}>
                  {list(v.alog?.userOpts).map((o, i0) => (<React.Fragment key={i0}>
                    <option value={o?.v}>{o?.label}</option>
                  </React.Fragment>))}
                </select>
                <label className="s-2140d3" htmlFor="ctv-log-range">Date</label>
                <select className="s-05fe4e" id="ctv-log-range" value={v.alog?.range ?? ""} onChange={v.alog?.setRange}>
                  {list(v.alog?.rangeOpts).map((o, i0) => (<React.Fragment key={i0}>
                    <option value={o?.v}>{o?.label}</option>
                  </React.Fragment>))}
                </select>
                <select className="s-05fe4e" aria-label="Area of change" value={v.alog?.area ?? ""} onChange={v.alog?.setArea}>
                  {list(v.alog?.areaOpts).map((o, i0) => (<React.Fragment key={i0}>
                    <option value={o?.v}>{o?.label}</option>
                  </React.Fragment>))}
                </select>
                {on(v.alog?.isCustom) && (<>
                  <input className="s-05fe4e" aria-label="From date" type="date" value={v.alog?.from ?? ""} onChange={v.alog?.setFrom} />
                  <span className="s-a6cf94">to</span>
                  <input className="s-05fe4e" aria-label="To date" type="date" value={v.alog?.to ?? ""} onChange={v.alog?.setTo} />
                </>)}
                {on(v.alog?.hasFilter) && (<>
                  <button className="s-b9b4b5" onClick={v.alog?.clear}>Clear filters</button>
                </>)}
              </div>
            </div>
            {list(v.alog?.rows).map((e, i0) => (<React.Fragment key={i0}>
              {on(e?.hasDay) && (<>
                <div className="s-dbd029">{e?.day}</div>
              </>)}
              <div className="s-55ff8a">
                <span className="s-b2c0d2" aria-hidden="true">{e?.initials}</span>
                <div className="s-599a2a">
                  <p className="s-86e328">
                    <strong className="s-8601a8">{e?.by}</strong>
                    {" "}{e?.text}
                  </p>
                  {list(e?.changes).map((c, i1) => (<React.Fragment key={i1}>
                    <div className="s-294c5b">
                      {on(c?.hasField) && (<>
                        <span className="s-f0494c">{c?.field}</span>
                      </>)}
                      <span className="s-845b67" style={{ fontStyle: c?.fromStyle, overflowWrap: "anywhere" }}>
                        <span className="s-14ff23">Previous value:{" "}</span>
                        {c?.from}
                      </span>
                      <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6F6B89" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14"></path>
                        <path d="M13 6l6 6-6 6"></path>
                      </svg>
                      <span className="s-809294" style={{ fontStyle: c?.toStyle, overflowWrap: "anywhere" }}>
                        <span className="s-14ff23">New value:{" "}</span>
                        {c?.to}
                      </span>
                    </div>
                  </React.Fragment>))}
                  {on(e?.hasDetail) && (<>
                    <span className="s-23aa12">{e?.detail}</span>
                  </>)}
                  <div className="s-e8f072">
                    <span className="s-3e3c9d">{e?.area}</span>
                    <span className="s-08e452">{e?.kind}</span>
                    {on(e?.hasCtx) && (<>
                      <span className="s-a2c65a">{e?.ctx}</span>
                    </>)}
                  </div>
                </div>
                <span className="s-a68937">{e?.time}</span>
              </div>
            </React.Fragment>))}
            {on(v.alog?.empty) && (<>
              <p className="s-279233">{v.alog?.emptyText}</p>
            </>)}
          </div>
        </>)}
      </section>
    </>
  );
}
