// Generated from the PartnerView design-canvas prototype. Edit freely.
import React from 'react';
import { on, list } from '../runtime';


export default function CompanyScreen({ v }) {
  return (
    <>
      <section className="s-e911df">
        <button className="s-849418" onClick={v.goCompanies}>Back to companies</button>
        <div className="s-622fdc">
          <div className="s-33f2a6">
            <div className="s-b665df">
              <h1 className="s-8dd424">{v.cv2?.name}</h1>
              {on(v.cv2?.strategic) && (<>
                <span className="s-c9d9d8">Strategic</span>
              </>)}
            </div>
            <p className="s-6f447e">{v.cv2?.line}</p>
          </div>
          <div className="s-2c9e28">
            <span className="s-963192">{v.cv2?.code}</span>
            <button className="s-7ec685" onClick={v.cv2?.newExpansion}>+ Expansion deal</button>
          </div>
        </div>
        <div className="s-e47a58">
          <div className="s-03c5dd" role="tablist" aria-label="Company sections">
            {list(v.cv2?.tabs).map((tb, i0) => (<React.Fragment key={i0}>
              <button className="s-8d3def" role="tab" aria-selected={tb?.selected} onClick={tb?.go} style={{ borderBottom: `2px solid ${tb?.bd ?? ""}`, background: "transparent", color: tb?.fg, font: "inherit", fontSize: "13.5px", fontWeight: tb?.fw, cursor: "pointer" }}>{tb?.label}</button>
            </React.Fragment>))}
          </div>
          <div className="s-c0913e">
            <button className="s-cf516c" onClick={v.cv2?.openChat} aria-label={v.cv2?.chatA} title={v.cv2?.chatA} style={{ border: `1px solid ${v.cv2?.chatBd ?? ""}`, background: v.cv2?.chatBg, color: v.cv2?.chatFg, font: "inherit", fontSize: "12.5px", fontWeight: "600", cursor: "pointer" }}>
              <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"></path>
              </svg>
              <span>Chatter</span>
              <span className="s-42d1ef">{v.cv2?.chatN}</span>
            </button>
            {on(v.cv2?.tabOverview) && (<>
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
        {on(v.cv2?.tabOverview) && (<>
          <div className="s-f170d9">
            <div className="s-aee896">
              {list(v.cv2?.kpis).map((k, i0) => (<React.Fragment key={i0}>
                <div className="s-db8c36">
                  <span className="s-a6cf94">{k?.label}</span>
                  <span className="s-7b96b3">{k?.value}</span>
                  <span className="s-629d39">{k?.note}</span>
                </div>
              </React.Fragment>))}
            </div>
          </div>
          <div className="s-863d40">
            <div className="s-acab10">
              {list(v.cv2?.ovTables).map((tb, i0) => (<React.Fragment key={i0}>
                <div className="s-f170d9">
                  <div className="s-2cbdac">
                    <h2 className="s-257a5f">
                      <button className="s-72c5bc" onClick={tb?.cl?.toggle} aria-expanded={tb?.cl?.exp}>
                        <svg className="s-0d7706" aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ transform: `rotate(${tb?.cl?.rot ?? ""})`, transition: "transform 0.15s" }}>
                          <path d="M9 6l6 6-6 6"></path>
                        </svg>
                        <span>
                          {tb?.title}{" "}
                          <span className="s-e652a3">{tb?.count}</span>
                        </span>
                      </button>
                    </h2>
                    {on(tb?.hasMore) && (<>
                      <button className="s-c11f8f" onClick={tb?.more}>{tb?.moreLabel}</button>
                    </>)}
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
              <div className="s-f170d9">
                <div className="s-2cbdac">
                  <h2 className="s-257a5f">
                    <button className="s-72c5bc" onClick={v.cl?.k33?.toggle} aria-expanded={v.cl?.k33?.exp}>
                      <svg className="s-0d7706" aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ transform: `rotate(${v.cl?.k33?.rot ?? ""})`, transition: "transform 0.15s" }}>
                        <path d="M9 6l6 6-6 6"></path>
                      </svg>
                      <span>Timeline</span>
                    </button>
                  </h2>
                  <button className="s-c11f8f" onClick={v.cv2?.goTimeline}>View full timeline</button>
                </div>
                {on(v.cl?.k33?.open) && (<>
                  {list(v.cv2?.timeline?.preview).map((e, i0) => (<React.Fragment key={i0}>
                    {" "}
                    <button className="s-bf06a1" onClick={e?.open} aria-label={e?.label}>
                      <span className="s-629d39">{e?.when}</span>
                      <span className="s-dea291">{e?.date}</span>
                      <span>
                        <span className="s-00a1c9" style={{ background: e?.pill?.bg, color: e?.pill?.fg }}>{e?.kind}</span>
                      </span>
                      <span className="s-33f2a6">{e?.title}</span>
                      <span className="s-629d39">{e?.src}</span>
                    </button>
                    {" "}
                  </React.Fragment>))}
                  {on(v.cv2?.timeline?.empty) && (<>
                    <p className="s-4e74a7">Nothing on the timeline yet.</p>
                  </>)}
                </>)}
              </div>
            </div>
            {on(v.sideOpen) && (<>
              <aside className="s-344502" aria-label="Company details and contacts">
                <div className="s-9a33a4">
                  <div className="s-43e5ac">
                    <h2 className="s-91adb2">
                      <button className="s-72c5bc" onClick={v.cl?.k34?.toggle} aria-expanded={v.cl?.k34?.exp}>
                        <svg className="s-0d7706" aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ transform: `rotate(${v.cl?.k34?.rot ?? ""})`, transition: "transform 0.15s" }}>
                          <path d="M9 6l6 6-6 6"></path>
                        </svg>
                        <span>Basic info</span>
                      </button>
                    </h2>
                    {on(v.cv2?.basic?.viewing) && (<>
                      <button className="s-648015" onClick={v.cv2?.basic?.edit}>Edit</button>
                    </>)}
                  </div>
                  {on(v.cl?.k34?.open) && (<>
                    {on(v.cv2?.basic?.viewing) && (<>
                      {list(v.cv2?.basic?.rows).map((f, i0) => (<React.Fragment key={i0}>
                        <div className="s-22fa9f">
                          <span className="s-78398b">{f?.k}</span>
                          <span className="s-392a00">{f?.v}</span>
                        </div>
                      </React.Fragment>))}
                    </>)}
                    {on(v.cv2?.basic?.editing) && (<>
                      <div className="s-e252d6">
                        <div className="s-bc0172">
                          <label className="s-a6cf94" htmlFor="co-web">Website</label>
                          <input className="s-51dd65" id="co-web" type="text" value={v.cv2?.basic?.website ?? ""} onChange={v.cv2?.basic?.setWebsite} placeholder="company.com" />
                        </div>
                        <div className="s-bc0172">
                          <label className="s-a6cf94" htmlFor="co-hq">HQ location</label>
                          <input className="s-51dd65" id="co-hq" type="text" value={v.cv2?.basic?.hq ?? ""} onChange={v.cv2?.basic?.setHq} placeholder="City, country" />
                        </div>
                        <div className="s-bc0172">
                          <label className="s-a6cf94" htmlFor="co-ind">Industry</label>
                          <input className="s-51dd65" id="co-ind" type="text" value={v.cv2?.basic?.industry ?? ""} onChange={v.cv2?.basic?.setIndustry} />
                        </div>
                        <div className="s-bc0172">
                          <label className="s-a6cf94" htmlFor="co-size">Company size</label>
                          <select className="s-51dd65" id="co-size" value={v.cv2?.basic?.size ?? ""} onChange={v.cv2?.basic?.setSize}>
                            {list(v.cv2?.basic?.sizeOpts).map((o, i0) => (<React.Fragment key={i0}>
                              <option value={o?.v}>{o?.label}</option>
                            </React.Fragment>))}
                          </select>
                        </div>
                        <div className="s-db9dad">
                          <div className="s-8129f1">
                            <label className="s-a6cf94" htmlFor="co-tier">Customer tier</label>
                            <select className="s-51dd65" id="co-tier" value={v.cv2?.basic?.tier ?? ""} onChange={v.cv2?.basic?.setTier}>
                              {list(v.cv2?.basic?.tierOpts).map((o, i0) => (<React.Fragment key={i0}>
                                <option value={o?.v}>{o?.label}</option>
                              </React.Fragment>))}
                            </select>
                          </div>
                          <div className="s-8129f1">
                            <label className="s-a6cf94" htmlFor="co-strat">Strategic</label>
                            <select className="s-51dd65" id="co-strat" value={v.cv2?.basic?.strategic ?? ""} onChange={v.cv2?.basic?.setStrategic}>
                              <option value="No">No</option>
                              <option value="Yes">Yes</option>
                            </select>
                          </div>
                        </div>
                        <span className="s-629d39">Industry, size, tier and strategic also update this company's deals.</span>
                        <div className="s-71b76f">
                          <button className="s-856e32" onClick={v.cv2?.basic?.save}>Save</button>
                          <button className="s-7a4d7d" onClick={v.cv2?.basic?.cancel}>Cancel</button>
                        </div>
                      </div>
                    </>)}
                  </>)}
                </div>
                <div className="s-9a33a4">
                  <div className="s-7ef018">
                    <h2 className="s-91adb2">
                      <button className="s-72c5bc" onClick={v.cl?.k35?.toggle} aria-expanded={v.cl?.k35?.exp}>
                        <svg className="s-0d7706" aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ transform: `rotate(${v.cl?.k35?.rot ?? ""})`, transition: "transform 0.15s" }}>
                          <path d="M9 6l6 6-6 6"></path>
                        </svg>
                        <span>
                          Contacts{" "}
                          <span className="s-e652a3">({v.cv2?.contactCount})</span>
                        </span>
                      </button>
                    </h2>
                    <button className="s-c11f8f" onClick={v.cv2?.goContacts}>Manage</button>
                  </div>
                  {on(v.cl?.k35?.open) && (<>
                    {list(v.cv2?.contactsTop).map((c, i0) => (<React.Fragment key={i0}>
                      <button className="s-72c843" onClick={c?.open} aria-label={c?.openLabel}>
                        <span className="s-b36eaf">
                          <span className="s-21a1be">{c?.name}</span>
                          {list(c?.chips).map((ch, i1) => (<React.Fragment key={i1}>
                            <span className="s-fe6a2a" style={{ background: ch?.bg, color: ch?.fg }}>{ch?.label}</span>
                          </React.Fragment>))}
                        </span>
                        <span className="s-0dc2d5">{c?.email}</span>
                      </button>
                    </React.Fragment>))}
                    {on(v.cv2?.contactsMore) && (<>
                      <button className="s-38d6c8" onClick={v.cv2?.goContacts}>{v.cv2?.contactsMoreLabel}</button>
                    </>)}
                  </>)}
                </div>
                <div className="s-d3a2f2">
                  <div className="s-ad948e">
                    <h2 className="s-91adb2">
                      <button className="s-72c5bc" onClick={v.cl?.k36?.toggle} aria-expanded={v.cl?.k36?.exp}>
                        <svg className="s-0d7706" aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ transform: `rotate(${v.cl?.k36?.rot ?? ""})`, transition: "transform 0.15s" }}>
                          <path d="M9 6l6 6-6 6"></path>
                        </svg>
                        <span>
                          Tech stack{" "}
                          <span className="s-e652a3">({v.cv2?.tech?.count})</span>
                        </span>
                      </button>
                    </h2>
                    <button className="s-c11f8f" onClick={v.cv2?.goTech}>Manage</button>
                  </div>
                  {on(v.cl?.k36?.open) && (<>
                    <div className="s-2bf69b">
                      {list(v.cv2?.tech?.chips).map((t, i0) => (<React.Fragment key={i0}>
                        <span className="s-cef2d3">{t?.name}</span>
                      </React.Fragment>))}
                    </div>
                    {on(v.cv2?.tech?.empty) && (<>
                      <p className="s-62e046">No tools recorded yet.</p>
                    </>)}
                  </>)}
                </div>
              </aside>
            </>)}
          </div>
        </>)}
        {on(v.cv2?.isTableTab) && (<>
          <div className="s-f170d9">
            <div className="s-2cbdac">
              <h2 className="s-257a5f">
                <button className="s-72c5bc" onClick={v.cl?.k37?.toggle} aria-expanded={v.cl?.k37?.exp}>
                  <svg className="s-0d7706" aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ transform: `rotate(${v.cl?.k37?.rot ?? ""})`, transition: "transform 0.15s" }}>
                    <path d="M9 6l6 6-6 6"></path>
                  </svg>
                  <span>{v.cv2?.tabTable?.title}</span>
                </button>
              </h2>
              <span className="s-72d4cd">{v.cv2?.tabTable?.count}</span>
            </div>
            {on(v.cl?.k37?.open) && (<>
              {list(v.cv2?.tabTable?.rows).map((r, i0) => (<React.Fragment key={i0}>
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
              {on(v.cv2?.tabTable?.empty) && (<>
                <p className="s-4e74a7">{v.cv2?.tabTable?.emptyText}</p>
              </>)}
            </>)}
          </div>
        </>)}
        {on(v.cv2?.tabLog) && (<>
          <div className="s-f170d9">
            <div className="s-4f08a0">
              <div>
                <h2 className="s-fa1f03">Change log</h2>
                <p className="s-b10591">{v.alog?.count}</p>
              </div>
              <div className="s-4b41f8">
                <label className="s-2140d3" htmlFor="cv2-log-user">Person</label>
                <select className="s-05fe4e" id="cv2-log-user" value={v.alog?.user ?? ""} onChange={v.alog?.setUser}>
                  {list(v.alog?.userOpts).map((o, i0) => (<React.Fragment key={i0}>
                    <option value={o?.v}>{o?.label}</option>
                  </React.Fragment>))}
                </select>
                <label className="s-2140d3" htmlFor="cv2-log-range">Date</label>
                <select className="s-05fe4e" id="cv2-log-range" value={v.alog?.range ?? ""} onChange={v.alog?.setRange}>
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
        {on(v.cv2?.tabContacts) && (<>
          <div className="s-89dbb6">
            <div className="s-d3a2f2">
              <h2 className="s-257a5f">
                <button className="s-72c5bc" onClick={v.cl?.k38?.toggle} aria-expanded={v.cl?.k38?.exp}>
                  <svg className="s-0d7706" aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ transform: `rotate(${v.cl?.k38?.rot ?? ""})`, transition: "transform 0.15s" }}>
                    <path d="M9 6l6 6-6 6"></path>
                  </svg>
                  <span>Add a contact</span>
                </button>
              </h2>
              {on(v.cl?.k38?.open) && (<>
                <div className="s-c7fcdf">
                  <div className="s-8129f1">
                    <label className="s-a6cf94" htmlFor="nc-name">Name</label>
                    <input className="s-51dd65" id="nc-name" type="text" value={v.cv2?.ctForm?.name ?? ""} onChange={v.cv2?.ctForm?.setName} placeholder="Full name" />
                  </div>
                  <div className="s-8129f1">
                    <label className="s-a6cf94" htmlFor="nc-title">Job title</label>
                    <input className="s-51dd65" id="nc-title" type="text" value={v.cv2?.ctForm?.title ?? ""} onChange={v.cv2?.ctForm?.setTitle} placeholder="e.g. Operations director" />
                  </div>
                  <div className="s-8129f1">
                    <label className="s-a6cf94" htmlFor="nc-email">Email</label>
                    <input className="s-51dd65" id="nc-email" type="email" value={v.cv2?.ctForm?.email ?? ""} onChange={v.cv2?.ctForm?.setEmail} placeholder="name@company.com" />
                  </div>
                  <div className="s-8129f1">
                    <label className="s-a6cf94" htmlFor="nc-phone">Phone</label>
                    <input className="s-51dd65" id="nc-phone" type="tel" value={v.cv2?.ctForm?.phone ?? ""} onChange={v.cv2?.ctForm?.setPhone} placeholder="Optional" />
                  </div>
                </div>
                <div className="s-d78b09">
                  <span className="s-629d39">{v.cv2?.ctForm?.note}</span>
                  <button className="s-ddba00" onClick={v.cv2?.ctForm?.add} disabled={on(v.cv2?.ctForm?.off)} style={{ border: `1px solid ${v.cv2?.ctForm?.b?.bd ?? ""}`, background: v.cv2?.ctForm?.b?.bg, color: v.cv2?.ctForm?.b?.fg, cursor: v.cv2?.ctForm?.b?.cur, font: "inherit", fontSize: "13px", fontWeight: "600" }}>Add contact</button>
                </div>
              </>)}
            </div>
            <div className="s-86dd31">
              <div className="s-c8d2c3">
                <div className="s-9b990a">
                  <span>ID</span>
                  <span>Name</span>
                  <span>Role</span>
                  <span>Email</span>
                  <span>Phone</span>
                </div>
                {list(v.cv2?.ctRows).map((c, i0) => (<React.Fragment key={i0}>
                  {" "}
                  <button className="s-b0df5a" onClick={c?.open}>
                    <span className="s-7fe044">{c?.code}</span>
                    <span className="s-33f2a6">
                      <span className="s-9601d7">{c?.name}</span>
                      <span className="s-98a285">{c?.title}</span>
                    </span>
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
                {on(v.cv2?.ctEmpty) && (<>
                  <p className="s-061ccc">No contacts yet.</p>
                </>)}
              </div>
            </div>
          </div>
        </>)}
        {on(v.cv2?.tabBilling) && (<>
          <div className="s-89dbb6">
            <p className="s-06def0">{v.cv2?.billing?.note}</p>
            {list(v.cv2?.billing?.groups).map((g, i0) => (<React.Fragment key={i0}>
              <div className="s-72e2bc">
                <div>
                  <h2 className="s-257a5f">
                    <button className="s-72c5bc" onClick={g?.cl?.toggle} aria-expanded={g?.cl?.exp}>
                      <svg className="s-0d7706" aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ transform: `rotate(${g?.cl?.rot ?? ""})`, transition: "transform 0.15s" }}>
                        <path d="M9 6l6 6-6 6"></path>
                      </svg>
                      <span>{g?.title}</span>
                    </button>
                  </h2>
                  <p className="s-4a5e94">{g?.sub}</p>
                </div>
                {on(g?.cl?.open) && (<>
                  <div className="s-979d35">
                    {list(g?.fields).map((f, i1) => (<React.Fragment key={i1}>
                      <div className="s-8129f1">
                        <label className="s-a6cf94" htmlFor={f?.id}>{f?.label}</label>
                        {on(f?.isText) && (<>
                          <input className="s-51dd65" id={f?.id} type={f?.type} value={f?.value ?? ""} onChange={f?.set} disabled={on(f?.off)} placeholder={f?.ph} autoComplete="off" />
                        </>)}
                        {on(f?.isSelect) && (<>
                          <select className="s-51dd65" id={f?.id} value={f?.value ?? ""} onChange={f?.set} disabled={on(f?.off)}>
                            {list(f?.opts).map((o, i2) => (<React.Fragment key={i2}>
                              <option value={o?.v}>{o?.label}</option>
                            </React.Fragment>))}
                          </select>
                        </>)}
                      </div>
                    </React.Fragment>))}
                  </div>
                </>)}
              </div>
            </React.Fragment>))}
            <div className="s-f170d9">
              <div className="s-2cbdac">
                <h2 className="s-257a5f">
                  <button className="s-72c5bc" onClick={v.cl?.k39?.toggle} aria-expanded={v.cl?.k39?.exp}>
                    <svg className="s-0d7706" aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ transform: `rotate(${v.cl?.k39?.rot ?? ""})`, transition: "transform 0.15s" }}>
                      <path d="M9 6l6 6-6 6"></path>
                    </svg>
                    <span>Billed so far</span>
                  </button>
                </h2>
                <span className="s-72d4cd">from the time log and licenses</span>
              </div>
              {on(v.cl?.k39?.open) && (<>
                {list(v.cv2?.billing?.billed?.rows).map((r, i0) => (<React.Fragment key={i0}>
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
                {on(v.cv2?.billing?.billed?.empty) && (<>
                  <p className="s-4e74a7">{v.cv2?.billing?.billed?.emptyText}</p>
                </>)}
              </>)}
            </div>
          </div>
        </>)}
        {on(v.cv2?.tabTech) && (<>
          <div className="s-89dbb6">
            <div className="s-1c17d3">
              <div className="s-296fd6">
                <label className="s-a6cf94" htmlFor="ts-name">Tool</label>
                <input className="s-51dd65" id="ts-name" type="text" value={v.cv2?.tech?.name ?? ""} onChange={v.cv2?.tech?.setName} placeholder="e.g. HubSpot, NetSuite, Slack" />
              </div>
              <div className="s-7dd75b">
                <label className="s-a6cf94" htmlFor="ts-cat">Category</label>
                <select className="s-51dd65" id="ts-cat" value={v.cv2?.tech?.category ?? ""} onChange={v.cv2?.tech?.setCat}>
                  {list(v.cv2?.tech?.cats).map((o, i0) => (<React.Fragment key={i0}>
                    <option value={o?.v}>{o?.label}</option>
                  </React.Fragment>))}
                </select>
              </div>
              <div className="s-c0e65e">
                <label className="s-a6cf94" htmlFor="ts-note">Note</label>
                <input className="s-51dd65" id="ts-note" type="text" value={v.cv2?.tech?.note ?? ""} onChange={v.cv2?.tech?.setNote} placeholder="How they use it, integration needs" />
              </div>
              <button className="s-306e66" onClick={v.cv2?.tech?.add} disabled={on(v.cv2?.tech?.off)} style={{ border: `1px solid ${v.cv2?.tech?.b?.bd ?? ""}`, background: v.cv2?.tech?.b?.bg, color: v.cv2?.tech?.b?.fg, cursor: v.cv2?.tech?.b?.cur, font: "inherit", fontSize: "13px", fontWeight: "600" }}>Add tool</button>
            </div>
            <div className="s-f170d9">
              {list(v.cv2?.tech?.rows).map((t, i0) => (<React.Fragment key={i0}>
                <div className="s-16548e">
                  <span className="s-76cb05">
                    <span className="s-6de5a7">{t?.name}</span>
                    <span className="s-98a285">{t?.note}</span>
                  </span>
                  <span className="s-a4b0cc">{t?.category}</span>
                  <span className="s-017a07">{t?.src}</span>
                  {on(t?.canRemove) && (<>
                    <button className="s-bee9e5" onClick={t?.remove} aria-label="Remove tool">×</button>
                  </>)}
                </div>
              </React.Fragment>))}
              {on(v.cv2?.tech?.empty) && (<>
                <p className="s-061ccc">No tools recorded yet.</p>
              </>)}
            </div>
          </div>
        </>)}
        {on(v.cv2?.tabTimeline) && (<>
          <div className="s-f170d9">
            {on(v.cv2?.timeline?.hasUp) && (<>
              <div className="s-070a50">Coming up</div>
              {list(v.cv2?.timeline?.up).map((e, i0) => (<React.Fragment key={i0}>
                {" "}
                <button className="s-b4d68e" onClick={e?.open} aria-label={e?.label}>
                  <span className="s-dea291">{e?.date}</span>
                  <span>
                    <span className="s-00a1c9" style={{ background: e?.pill?.bg, color: e?.pill?.fg }}>{e?.kind}</span>
                  </span>
                  <span className="s-33f2a6">{e?.title}</span>
                  <span className="s-629d39">{e?.src}</span>
                </button>
                {" "}
              </React.Fragment>))}
            </>)}
            {on(v.cv2?.timeline?.hasPast) && (<>
              <div className="s-bfb1fb">Past</div>
              {list(v.cv2?.timeline?.past).map((e, i0) => (<React.Fragment key={i0}>
                {" "}
                <button className="s-b4d68e" onClick={e?.open} aria-label={e?.label}>
                  <span className="s-dea291">{e?.date}</span>
                  <span>
                    <span className="s-00a1c9" style={{ background: e?.pill?.bg, color: e?.pill?.fg }}>{e?.kind}</span>
                  </span>
                  <span className="s-33f2a6">{e?.title}</span>
                  <span className="s-629d39">{e?.src}</span>
                </button>
                {" "}
              </React.Fragment>))}
            </>)}
            {on(v.cv2?.timeline?.empty) && (<>
              <p className="s-061ccc">Nothing on the timeline yet.</p>
            </>)}
          </div>
        </>)}
        {on(v.cv2?.tabFiles) && (<>
          <div className="s-89dbb6">
            <div className="s-72e2bc">
              <div className="s-73d6ec">
                <div>
                  <h2 className="s-257a5f">
                    <button className="s-72c5bc" onClick={v.cl?.k40?.toggle} aria-expanded={v.cl?.k40?.exp}>
                      <svg className="s-0d7706" aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ transform: `rotate(${v.cl?.k40?.rot ?? ""})`, transition: "transform 0.15s" }}>
                        <path d="M9 6l6 6-6 6"></path>
                      </svg>
                      <span>Add a file or link</span>
                    </button>
                  </h2>
                  <p className="s-4a5e94">NDAs, contracts, vendor setup, proposals, invoices, bills and documentation.</p>
                </div>
                <div className="s-d1f9fb" role="radiogroup" aria-label="What are you adding?">
                  <button className="s-fd6035" role="radio" aria-checked={v.cv2?.files?.linkOn} onClick={v.cv2?.files?.pickLink} style={{ background: v.cv2?.files?.linkBg, color: "#14112E", font: "inherit", fontSize: "13px", fontWeight: "600", cursor: "pointer" }}>Link</button>
                  <button className="s-fd6035" role="radio" aria-checked={v.cv2?.files?.fileOn} onClick={v.cv2?.files?.pickFile} style={{ background: v.cv2?.files?.fileBg, color: "#14112E", font: "inherit", fontSize: "13px", fontWeight: "600", cursor: "pointer" }}>Upload</button>
                </div>
              </div>
              {on(v.cl?.k40?.open) && (<>
                <div className="s-cfb65f">
                  {on(v.cv2?.files?.isLink) && (<>
                    <div className="s-8129f1">
                      <label className="s-a6cf94" htmlFor="cf-url">URL</label>
                      <input className="s-51dd65" id="cf-url" type="url" value={v.cv2?.files?.fUrl ?? ""} onChange={v.cv2?.files?.setUrl} placeholder="https://" />
                    </div>
                    <div className="s-8129f1">
                      <label className="s-a6cf94" htmlFor="cf-name">Name</label>
                      <input className="s-51dd65" id="cf-name" type="text" value={v.cv2?.files?.fName ?? ""} onChange={v.cv2?.files?.setName} placeholder="e.g. Mutual NDA" />
                    </div>
                  </>)}
                  {on(v.cv2?.files?.isFile) && (<>
                    <div className="s-8129f1">
                      <label className="s-a6cf94" htmlFor="cf-file">File</label>
                      <input className="s-616ab6" id="cf-file" type="file" onChange={v.cv2?.files?.setPick} />
                      <span className="s-0c84db">{v.cv2?.files?.fileNote}</span>
                    </div>
                  </>)}
                  <div className="s-8129f1">
                    <label className="s-a6cf94" htmlFor="cf-cat">Category</label>
                    <select className="s-51dd65" id="cf-cat" value={v.cv2?.files?.fCat ?? ""} onChange={v.cv2?.files?.setFCat}>
                      {list(v.cv2?.files?.catOpts).map((o, i0) => (<React.Fragment key={i0}>
                        <option value={o?.v}>{o?.label}</option>
                      </React.Fragment>))}
                    </select>
                  </div>
                  <div className="s-8129f1">
                    <label className="s-a6cf94" htmlFor="cf-to">Attach to</label>
                    <select className="s-51dd65" id="cf-to" value={v.cv2?.files?.fTo ?? ""} onChange={v.cv2?.files?.setTo}>
                      {list(v.cv2?.files?.toOpts).map((o, i0) => (<React.Fragment key={i0}>
                        <option value={o?.v}>{o?.label}</option>
                      </React.Fragment>))}
                    </select>
                  </div>
                  {on(v.isAdmin) && (<>
                    <div className="s-8129f1">
                      <label className="s-a6cf94" htmlFor="cf-acc">Who can access</label>
                      <select className="s-51dd65" id="cf-acc" value={v.cv2?.files?.fAcc ?? ""} onChange={v.cv2?.files?.setFAcc}>
                        {list(v.cv2?.files?.fAccOpts).map((o, i0) => (<React.Fragment key={i0}>
                          <option value={o?.v}>{o?.label}</option>
                        </React.Fragment>))}
                      </select>
                    </div>
                  </>)}
                </div>
                <div className="s-9b2664">
                  <button className="s-ddba00" onClick={v.cv2?.files?.add} disabled={on(v.cv2?.files?.off)} style={{ border: `1px solid ${v.cv2?.files?.b?.bd ?? ""}`, background: v.cv2?.files?.b?.bg, color: v.cv2?.files?.b?.fg, cursor: v.cv2?.files?.b?.cur, font: "inherit", fontSize: "13px", fontWeight: "600" }}>{v.cv2?.files?.cta}</button>
                </div>
              </>)}
            </div>
            <div className="s-f170d9">
              <div className="s-bbf07f">
                <div className="s-296fd6">
                  <label className="s-a6cf94" htmlFor="ff-q">Search files</label>
                  <input className="s-51dd65" id="ff-q" type="search" value={v.cv2?.files?.q ?? ""} onChange={v.cv2?.files?.setQ} placeholder="Name or source" />
                </div>
                <div className="s-98a41f">
                  <label className="s-a6cf94" htmlFor="ff-cat">Category</label>
                  <select className="s-51dd65" id="ff-cat" value={v.cv2?.files?.cat ?? ""} onChange={v.cv2?.files?.setCat}>
                    {list(v.cv2?.files?.catOpts).map((o, i0) => (<React.Fragment key={i0}>
                      <option value={o?.v}>{o?.label}</option>
                    </React.Fragment>))}
                  </select>
                </div>
                <div className="s-0ca684">
                  <label className="s-a6cf94" htmlFor="ff-src">Source</label>
                  <select className="s-51dd65" id="ff-src" value={v.cv2?.files?.src ?? ""} onChange={v.cv2?.files?.setSrc}>
                    {list(v.cv2?.files?.srcOpts).map((o, i0) => (<React.Fragment key={i0}>
                      <option value={o?.v}>{o?.label}</option>
                    </React.Fragment>))}
                  </select>
                </div>
                <span className="s-e42288">{v.cv2?.files?.summary}</span>
              </div>
              {list(v.cv2?.files?.rows).map((f, i0) => (<React.Fragment key={i0}>
                <div className="s-0aa36d">
                  <div className="s-b49e3c">
                    {on(f?.isLink) && (<>
                      <a className="s-9a5c14" href={f?.url} target="_blank" rel="noopener noreferrer">{f?.name}</a>
                    </>)}
                    {on(f?.isFile) && (<>
                      <span className="s-d9a844">{f?.name}</span>
                    </>)}
                    <div className="s-9a4628">{f?.meta}</div>
                  </div>
                  <span className="s-8db912">{f?.category}</span>
                  {on(f?.isAdmin) && (<>
                    <select className="s-3ff7e8" aria-label={f?.accLabel} value={f?.acc ?? ""} onChange={f?.setAcc} style={{ background: f?.accPill?.bg, color: f?.accPill?.fg, font: "inherit", fontSize: "12px", fontWeight: "600" }}>
                      {list(v.cv2?.files?.accOpts).map((o, i1) => (<React.Fragment key={i1}>
                        <option value={o?.v}>{o?.label}</option>
                      </React.Fragment>))}
                    </select>
                  </>)}
                  {on(f?.notAdmin) && (<>
                    <span className="s-0ff21f" style={{ background: f?.accPill?.bg, color: f?.accPill?.fg }}>{f?.accText}</span>
                  </>)}
                  {on(f?.canRemove) && (<>
                    <button className="s-bee9e5" onClick={f?.remove} aria-label={f?.removeLabel}>×</button>
                  </>)}
                </div>
              </React.Fragment>))}
              {on(v.cv2?.files?.empty) && (<>
                <p className="s-061ccc">{v.cv2?.files?.emptyText}</p>
              </>)}
            </div>
          </div>
        </>)}
      </section>
    </>
  );
}
