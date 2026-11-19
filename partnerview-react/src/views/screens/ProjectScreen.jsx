// Generated from the PartnerView design-canvas prototype. Edit freely.
import React from 'react';
import { on, list } from '../runtime';


export default function ProjectScreen({ v }) {
  return (
    <>
      <section className="s-e911df">
        <button className="s-849418" onClick={v.goProjects}>Back to projects</button>
        <div className="s-622fdc">
          <div className="s-33f2a6">
            <h1 className="s-8dd424">{v.pv?.title}</h1>
            <div className="s-afef23">
              <span>{v.pv?.companyLine}</span>
              {on(v.pv?.strategic) && (<>
                <span className="s-14f0cf">Strategic</span>
              </>)}
            </div>
          </div>
          <div className="s-ead29a">
            <div className="s-2c9e28">
              <span className="s-963192">{v.pv?.pid}</span>
              <span className="s-8c449c" style={{ background: v.pv?.statusPill?.bg, color: v.pv?.statusPill?.fg }}>{v.pv?.status}</span>
              {on(v.pv?.pjm?.canStart) && (<>
                <button className="s-a78d47" onClick={v.pv?.pjm?.openStart}>Start project</button>
              </>)}
              {on(v.pv?.pjm?.canClose) && (<>
                <button className="s-a78d47" onClick={v.pv?.pjm?.openClose}>Close project</button>
              </>)}
              {on(v.pv?.pjm?.canReopen) && (<>
                <button className="s-a78d47" onClick={v.pv?.pjm?.reopen}>Reopen project</button>
              </>)}
              {on(v.pv?.pjm?.showLog) && (<>
                <button className="s-7ec685" onClick={v.pv?.logTime}>Log time</button>
              </>)}
            </div>
            {on(v.pv?.pjm?.hasNote) && (<>
              <span className="s-7a5f5b" style={{ color: v.pv?.pjm?.noteFg }}>{v.pv?.pjm?.note}</span>
            </>)}
            {on(v.pv?.hasExpWarn) && (<>
              <span className="s-3c9f14" style={{ color: v.pv?.expWarnFg }}>{v.pv?.expWarn}</span>
            </>)}
          </div>
        </div>
        <div className="s-e47a58">
          <div className="s-03c5dd" role="tablist" aria-label="Project sections">
            {list(v.pv?.tabs).map((tb, i0) => (<React.Fragment key={i0}>
              <button className="s-176c4f" role="tab" aria-selected={tb?.selected} onClick={tb?.go} style={{ borderBottom: `2px solid ${tb?.bd ?? ""}`, background: "transparent", color: tb?.fg, font: "inherit", fontWeight: tb?.fw, cursor: "pointer" }}>{tb?.label}</button>
            </React.Fragment>))}
          </div>
          <div className="s-c0913e">
            <button className="s-cf516c" onClick={v.pv?.openChat} aria-label={v.pv?.chatA} title={v.pv?.chatA} style={{ border: `1px solid ${v.pv?.chatBd ?? ""}`, background: v.pv?.chatBg, color: v.pv?.chatFg, font: "inherit", fontSize: "12.5px", fontWeight: "600", cursor: "pointer" }}>
              <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"></path>
              </svg>
              <span>Chatter</span>
              <span className="s-42d1ef">{v.pv?.chatN}</span>
            </button>
            <button className="s-014443" onClick={v.toggleSide} aria-pressed={v.sideHiddenA} title={v.sideLabel}>
              <svg aria-hidden="true" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="16" rx="2"></rect>
                <path d="M15 4v16"></path>
              </svg>
              {v.sideLabel}
            </button>
          </div>
        </div>
        <div className="s-863d40">
          <div className="s-acab10">
            {on(v.pv?.rpShow) && (<>
              <div className="s-6b5cee">
                <div className="s-75c693" role="dialog" aria-modal="true" aria-labelledby="rp-title">
                  <div className="s-0ffd52">
                    <div className="s-33f2a6">
                      {" "}
                      <span className="s-a6cf94">{v.pv?.rp?.kind}{" \u00b7 "}{v.pv?.rp?.summary}</span>
                      {" "}
                      <h2 className="s-c493cb" id="rp-title">{v.pv?.rp?.target}</h2>
                    </div>
                    <div className="s-cf5a83">
                      <button className="s-147f4e" onClick={v.pv?.rp?.minimise} aria-label="Minimise" title="Minimise">–</button>
                      <button className="s-147f4e" onClick={v.pv?.rp?.close} aria-label="Close" title="Close">×</button>
                    </div>
                  </div>
                  <span className="s-396e31">Linked</span>
                  {list(v.pv?.rp?.linked).map((r, i0) => (<React.Fragment key={i0}>
                    <div className="s-518760" style={{ background: r?.bg }}>
                      <button className="s-6ffb44" onClick={r?.toggle} role="checkbox" aria-checked={r?.on} aria-label={r?.toggleA} style={{ border: `1.5px solid ${r?.box ?? ""}`, background: r?.fill, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                        <svg aria-hidden="true" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={r?.tick} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 12l5 5 9-10"></path>
                        </svg>
                      </button>
                      <button className="s-81ef58" onClick={r?.open}>
                        <span className="s-2660ec">
                          <span className="s-3bc30a">{r?.code}</span>
                          {" "}{r?.req}
                        </span>
                        <span className="s-a6cf94">{"Pain point: "}{r?.pain}</span>
                      </button>
                    </div>
                  </React.Fragment>))}
                  {on(v.pv?.rp?.noLinked) && (<>
                    <p className="s-9626c6">Nothing linked yet. Tick a requirement below.</p>
                  </>)}
                  <span className="s-b170ab">Not linked</span>
                  {list(v.pv?.rp?.others).map((r, i0) => (<React.Fragment key={i0}>
                    <div className="s-518760" style={{ background: r?.bg }}>
                      <button className="s-6ffb44" onClick={r?.toggle} role="checkbox" aria-checked={r?.on} aria-label={r?.toggleA} style={{ border: `1.5px solid ${r?.box ?? ""}`, background: r?.fill, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                        <svg aria-hidden="true" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={r?.tick} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 12l5 5 9-10"></path>
                        </svg>
                      </button>
                      <button className="s-81ef58" onClick={r?.open}>
                        <span className="s-2660ec">
                          <span className="s-3bc30a">{r?.code}</span>
                          {" "}{r?.req}
                        </span>
                        <span className="s-a6cf94">{"Pain point: "}{r?.pain}</span>
                      </button>
                    </div>
                  </React.Fragment>))}
                  {on(v.pv?.rp?.noOthers) && (<>
                    <p className="s-9626c6">Every requirement is linked.</p>
                  </>)}
                  {on(v.pv?.rp?.none) && (<>
                    <p className="s-9626c6">No approved requirements yet. Approve DRD items on the deal first.</p>
                  </>)}
                  <div className="s-aa5627">
                    <button className="s-d43d3d" onClick={v.pv?.rp?.close}>Done</button>
                  </div>
                </div>
              </div>
            </>)}
            {on(v.pv?.rpMin) && (<>
              <div className="s-a97c82" role="status">
                <span className="s-847eaf">
                  Linking requirements ·{" "}
                  <strong>{v.pv?.rp?.target}</strong>
                  {" "}{"\u00b7 "}{v.pv?.rp?.summary}
                </span>
                <button className="s-7dbe13" onClick={v.pv?.rp?.restore}>Restore</button>
                <button className="s-6beec6" onClick={v.pv?.rp?.close} aria-label="Close">×</button>
              </div>
            </>)}
            {on(v.pv?.hasRd) && (<>
              <div className="s-bada01">
                <div className="s-75c693" role="dialog" aria-modal="true" aria-labelledby="rd-title">
                  <div className="s-0ffd52">
                    <div className="s-33f2a6">
                      {" "}
                      <span className="s-052c9a">{"Requirement "}{v.pv?.rd?.code}{" \u00b7 "}{v.pv?.rd?.status}</span>
                      {" "}
                      <h2 className="s-c493cb" id="rd-title">{v.pv?.rd?.req}</h2>
                    </div>
                    <button className="s-7f5780" onClick={v.pv?.rd?.close} aria-label="Close">×</button>
                  </div>
                  <div className="s-50c63f">
                    <span className="s-78398b">Pain point it solves</span>
                    <span className="s-dbc6af">{v.pv?.rd?.pain}</span>
                  </div>
                  <div className="s-50c63f">
                    <span className="s-78398b">Champion priority</span>
                    <span className="s-21a1be">{v.pv?.rd?.champ}</span>
                  </div>
                  <div className="s-50c63f">
                    <span className="s-78398b">Economic buyer priority</span>
                    <span className="s-21a1be">{v.pv?.rd?.eb}</span>
                  </div>
                  <span className="s-b170ab">Linked tasks and phases</span>
                  {list(v.pv?.rd?.linked).map((l, i0) => (<React.Fragment key={i0}>
                    <div className="s-8a789d">
                      <span className="s-2660ec">{l?.name}</span>
                      <span className="s-a6cf94">{l?.sub}</span>
                    </div>
                  </React.Fragment>))}
                  {on(v.pv?.rd?.noLinked) && (<>
                    <p className="s-c512ad">Nothing is linked to this requirement yet.</p>
                  </>)}
                  <div className="s-63a21a">
                    {on(v.pv?.rd?.fromPicker) && (<>
                      <button className="s-f7d19b" onClick={v.pv?.rd?.back}>Back to linking</button>
                    </>)}
                    <button className="s-d43d3d" onClick={v.pv?.rd?.close}>Close</button>
                  </div>
                </div>
              </div>
            </>)}
            {on(v.pv?.tabOverview) && (<>
              <div className="s-89dbb6">
                <div className="s-f170d9">
                  <div className="s-59e6c8">
                    {list(v.pv?.stats).map((k, i0) => (<React.Fragment key={i0}>
                      <div className="s-db8c36">
                        <span className="s-a6cf94">{k?.label}</span>
                        <span className="s-7b96b3">{k?.value}</span>
                        <span className="s-344495" style={{ color: k?.noteFg }}>{k?.note}</span>
                      </div>
                    </React.Fragment>))}
                    {list(v.pv?.dates).map((k, i0) => (<React.Fragment key={i0}>
                      <div className="s-1407bc">
                        <label className="s-a6cf94" htmlFor={k?.id}>{k?.label}</label>
                        <input className="s-c8c645" id={k?.id} type="date" value={k?.value ?? ""} onChange={k?.set} disabled={on(k?.off)} />
                        <span className="s-344495" style={{ color: k?.noteFg }}>{k?.note}</span>
                      </div>
                    </React.Fragment>))}
                  </div>
                </div>
                <div className="s-f170d9">
                  <div className="s-e8bdb1">
                    <div>
                      <h2 className="s-fa1f03">
                        <button className="s-72c5bc" onClick={v.cl?.k18?.toggle} aria-expanded={v.cl?.k18?.exp}>
                          <svg className="s-0d7706" aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ transform: `rotate(${v.cl?.k18?.rot ?? ""})`, transition: "transform 0.15s" }}>
                            <path d="M9 6l6 6-6 6"></path>
                          </svg>
                          <span>Phases</span>
                        </button>
                      </h2>
                      <p className="s-96d2c1">{v.pv?.msSummary}</p>
                    </div>
                    <button className="s-ed37ba" onClick={v.pv?.openPlan}>Open project plan</button>
                  </div>
                  {on(v.cl?.k18?.open) && (<>
                    <div className="s-987eb2">
                      <div className="s-39c389">
                        <div className="s-4bfac7">
                          <span>Phase</span>
                          <span>Target date</span>
                          <span>Status</span>
                          <span className="s-30489c">Hours</span>
                          <span className="s-30489c">Tasks</span>
                        </div>
                        {list(v.pv?.phases).map((m, i0) => (<React.Fragment key={i0}>
                          <div className="s-46d1b1">
                            <span className="s-9b92d2">
                              {on(m?.hasKeys) && (<>
                                <button className="s-bb4a3f" onClick={m?.toggleKeys} aria-expanded={m?.keyExp} aria-label={m?.keyToggleA} title={m?.keyToggleA}>
                                  <svg aria-hidden="true" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" style={{ transform: `rotate(${m?.keyRot ?? ""})`, transition: "transform 0.15s" }}>
                                    <path d="M9 6l6 6-6 6"></path>
                                  </svg>
                                </button>
                              </>)}
                              {on(m?.noKeys) && (<>
                                <span className="s-e97393" aria-hidden="true"></span>
                              </>)}
                              <span className="s-9370d0" aria-hidden="true" style={{ background: m?.dot }}></span>
                              <span className="s-21a1be">{m?.name}</span>
                              {on(m?.hasKeys) && (<>
                                <span className="s-465b59" title="Key milestones">
                                  <span aria-hidden="true">◆</span>
                                  {m?.keyCount}
                                </span>
                              </>)}
                            </span>
                            <span className="s-3b0208">{m?.due}</span>
                            <span className="s-21a1be" style={{ color: m?.statusFg }}>{m?.status}</span>
                            <span className="s-89dafb" style={{ color: m?.hoursFg }}>{m?.hours}</span>
                            <span className="s-035765">{m?.tasks}</span>
                          </div>
                          {on(m?.keyOpen) && (<>
                            {list(m?.keys).map((k, i1) => (<React.Fragment key={i1}>
                              <div className="s-2ac34f">
                                <span className="s-fb5225">
                                  <span className="s-ee1113" aria-hidden="true">◆</span>
                                  <span className="s-33f2a6">{k?.name}</span>
                                </span>
                                <span className="s-3b0208">{k?.due}</span>
                                <span>
                                  <span className="s-0ff21f" style={{ background: k?.bg, color: k?.fg }}>{k?.status}</span>
                                </span>
                                <span></span>
                                <span></span>
                              </div>
                            </React.Fragment>))}
                          </>)}
                        </React.Fragment>))}
                      </div>
                    </div>
                  </>)}
                </div>
                <div className="s-29dac2">
                  <div className="s-43e5ac">
                    <h2 className="s-fa1f03">
                      <button className="s-9797cf" onClick={v.pv?.p0Toggle} aria-expanded={v.pv?.p0Exp}>
                        <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: `rotate(${v.pv?.p0Rot ?? ""})`, transition: "transform 0.15s" }}>
                          <path d="M9 6l6 6-6 6"></path>
                        </svg>
                        Onboarding checklist
                      </button>
                    </h2>
                    <span className="s-3ec15a">{v.pv?.p0Text}</span>
                  </div>
                  {on(v.pv?.p0Open) && (<>
                    {list(v.pv?.checks).map((c, i0) => (<React.Fragment key={i0}>
                      <div className="s-08ba7a">
                        <input className="s-807da2" type="checkbox" id={c?.id} checked={on(c?.on)} onChange={c?.toggle} />
                        <label className="s-c66ab4" htmlFor={c?.id}>{c?.label}</label>
                        <span className="s-0c84db">{c?.hint}</span>
                      </div>
                    </React.Fragment>))}
                  </>)}
                </div>
                <div className="s-f170d9">
                  <div className="s-16e813">
                    <h2 className="s-fa1f03">
                      <button className="s-72c5bc" onClick={v.cl?.k20?.toggle} aria-expanded={v.cl?.k20?.exp}>
                        <svg className="s-0d7706" aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ transform: `rotate(${v.cl?.k20?.rot ?? ""})`, transition: "transform 0.15s" }}>
                          <path d="M9 6l6 6-6 6"></path>
                        </svg>
                        <span>Rates and hours from the deal</span>
                      </button>
                    </h2>
                    <p className="s-96d2c1">{v.pv?.ratesNote}</p>
                  </div>
                  {on(v.cl?.k20?.open) && (<>
                    <div className="s-987eb2">
                      <div className="s-e69a18">
                        <div className="s-39d6c1">
                          <span>Role or item</span>
                          <span>Practice</span>
                          <span>Service line</span>
                          <span>Billed rate</span>
                          <span className="s-30489c">Total hours</span>
                          <span className="s-30489c">Logged</span>
                          <span className="s-30489c">Remaining</span>
                          <span>Started</span>
                          <span>Completed</span>
                        </div>
                        {list(v.pv?.rates).map((r, i0) => (<React.Fragment key={i0}>
                          <div className="s-34fec7">
                            <span className="s-21a1be">{r?.role}</span>
                            <span style={{ color: r?.prFg }}>{r?.practice}</span>
                            <span style={{ color: r?.svFg }}>{r?.svc}</span>
                            <span className="s-42d1ef">{r?.rate}</span>
                            <span className="s-647d9c">{r?.planned}</span>
                            <span className="s-647d9c">{r?.used}</span>
                            <span className="s-2b339b" style={{ color: r?.remFg }}>{r?.remaining}</span>
                            <span className="s-42d1ef" style={{ color: r?.stFg }}>{r?.started}</span>
                            <span className="s-811938" style={{ color: r?.cpFg }}>{r?.completed}</span>
                          </div>
                        </React.Fragment>))}
                        {on(v.pv?.noRates) && (<>
                          <p className="s-c70e0f">The deal's quote has no service lines.</p>
                        </>)}
                      </div>
                    </div>
                  </>)}
                </div>
              </div>
            </>)}
            {on(v.pv?.tabLog) && (<>
              <div className="s-f170d9">
                <div className="s-4f08a0">
                  <div>
                    <h2 className="s-fa1f03">Change log</h2>
                    <p className="s-b10591">{v.alog?.count}</p>
                  </div>
                  <div className="s-4b41f8">
                    <label className="s-2140d3" htmlFor="pv-log-user">Person</label>
                    <select className="s-05fe4e" id="pv-log-user" value={v.alog?.user ?? ""} onChange={v.alog?.setUser}>
                      {list(v.alog?.userOpts).map((o, i0) => (<React.Fragment key={i0}>
                        <option value={o?.v}>{o?.label}</option>
                      </React.Fragment>))}
                    </select>
                    <label className="s-2140d3" htmlFor="pv-log-range">Date</label>
                    <select className="s-05fe4e" id="pv-log-range" value={v.alog?.range ?? ""} onChange={v.alog?.setRange}>
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
            {on(v.pv?.tabPlan) && (<>
              <div className="s-64bd62">
                <div className="s-8fd27d">
                  <div>
                    <h2 className="s-fa1f03">Project plan</h2>
                  </div>
                  <button className="s-ed37ba" onClick={v.pv?.logTime}>Log time</button>
                </div>
                <div className="s-f170d9">
                  <div className="s-aee896">
                    {list(v.pv?.alloc).map((k, i0) => (<React.Fragment key={i0}>
                      <div className="s-972f06">
                        <span className="s-a6cf94">{k?.k}</span>
                        <span className="s-14bdcb" style={{ color: k?.fg }}>{k?.v}</span>
                        <span className="s-629d39">{k?.note}</span>
                      </div>
                    </React.Fragment>))}
                  </div>
                </div>
                <div className="s-789029">
                  <div className="s-54df36">
                    <label className="s-a6cf94" htmlFor="new-ms-name">New phase</label>
                    <input className="s-51dd65" id="new-ms-name" type="text" value={v.pv?.newMsName ?? ""} onChange={v.setNewMsName} placeholder="e.g. Data migration" />
                  </div>
                  <div className="s-bc0172">
                    <label className="s-a6cf94" htmlFor="new-ms-due">Target date</label>
                    <input className="s-839a38" id="new-ms-due" type="date" value={v.pv?.newMsDue ?? ""} onChange={v.setNewMsDue} />
                  </div>
                  <button className="s-cd4bd2" onClick={v.pv?.addMs} disabled={on(v.pv?.addMsOff)} style={{ border: `1px solid ${v.pv?.addMsB?.bd ?? ""}`, background: v.pv?.addMsB?.bg, color: v.pv?.addMsB?.fg, cursor: v.pv?.addMsB?.cur, font: "inherit", fontSize: "13px", fontWeight: "600" }}>Add phase</button>
                </div>
                {list(v.pv?.plan).map((m, i0) => (<React.Fragment key={i0}>
                  <div className="s-f170d9">
                    <div className="s-4b68df" style={{ borderBottom: `1px solid ${m?.hdrBd ?? ""}` }}>
                      <button className="s-282913" onClick={m?.toggle} aria-expanded={m?.exp} aria-label={m?.toggleLabel}>
                        <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: `rotate(${m?.rot ?? ""})`, transition: "transform 0.15s" }}>
                          <path d="M9 6l6 6-6 6"></path>
                        </svg>
                      </button>
                      <span className="s-38c0c4" aria-hidden="true" style={{ background: m?.dot }}></span>
                      <input className="s-2cacba" aria-label={m?.nameLabel} type="text" value={m?.name ?? ""} onChange={m?.setName} />
                      <input className="s-6b6bc9" aria-label={m?.dueLabel} type="date" value={m?.due ?? ""} onChange={m?.setDue} />
                      <button className="s-44847d" onClick={m?.openReqs} aria-label={m?.reqA} title={m?.reqA} style={{ border: `1px solid ${m?.reqBd ?? ""}`, background: m?.reqBg, color: m?.reqFg, font: "inherit", fontSize: "12px", fontWeight: "600", cursor: "pointer" }}>
                        <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                          <path d="M14 3v6h6"></path>
                          <path d="M8 13h8"></path>
                          <path d="M8 17h5"></path>
                        </svg>
                        <span>{m?.reqCount}</span>
                      </button>
                      <span className="s-6bf8ce">{m?.meta}</span>
                      <button className="s-3c4394" onClick={m?.toggleDone}>{m?.doneCta}</button>
                      <button className="s-70692b" onClick={m?.remove} aria-label={m?.removeLabel}>×</button>
                    </div>
                    {on(m?.open) && (<>
                      <div className="s-987eb2">
                        <div className="s-b95ccb">
                          <div className="s-ab4252">
                            <span>Type</span>
                            <span>Item</span>
                            <span>Status</span>
                            <span>Assignee</span>
                            <span>Due date</span>
                            <span className="s-30489c">Estimated hours</span>
                            <span className="s-30489c">Actual time logged</span>
                            <span className="s-2140d3">Log time</span>
                            <span className="s-2140d3">Open task</span>
                          </div>
                          {list(m?.tasks).map((t, i1) => (<React.Fragment key={i1}>
                            <div className="s-30a78b" style={{ background: t?.rowBg }}>
                              <select className="s-9d3513" aria-label={t?.typeA} value={t?.type ?? ""} onChange={t?.setType} style={{ background: t?.typeBg, color: t?.typeFg, font: "inherit", fontSize: "12px", fontWeight: "600" }}>
                                {list(v.pv?.typeOpts).map((o, i2) => (<React.Fragment key={i2}>
                                  <option value={o?.v}>{o?.label}</option>
                                </React.Fragment>))}
                              </select>
                              <div className="s-b0b5e0">
                                <button className="s-9a6f42" onClick={t?.open} aria-label={t?.openA} title="Open task details" style={{ color: t?.fg, textDecoration: t?.deco, font: "inherit", fontSize: "13.5px", fontWeight: "600", textAlign: "left", overflowWrap: "anywhere", cursor: "pointer" }}>{t?.name}</button>
                                {on(t?.isKey) && (<>
                                  <span className="s-1c2ec9" title="Key milestone">
                                    <span aria-hidden="true">◆</span>
                                    Key
                                  </span>
                                </>)}
                                {on(t?.hasReqs) && (<>
                                  <span className="s-607a5d" title={t?.reqA}>
                                    <svg aria-hidden="true" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                      <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                                      <path d="M14 3v6h6"></path>
                                    </svg>
                                    {t?.reqCount}
                                  </span>
                                </>)}
                                {on(t?.hasChat) && (<>
                                  <span className="s-607a5d" title={t?.chatA}>
                                    <svg aria-hidden="true" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                      <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"></path>
                                    </svg>
                                    {t?.chatN}
                                  </span>
                                </>)}
                              </div>
                              <select className="s-5a0ae6" aria-label={t?.statusLabel} value={t?.status ?? ""} onChange={t?.setStatus} style={{ background: t?.statusBg, color: t?.statusFg, font: "inherit", fontSize: "12.5px", fontWeight: "600" }}>
                                {list(v.pv?.statusOpts).map((o, i2) => (<React.Fragment key={i2}>
                                  <option value={o?.v}>{o?.label}</option>
                                </React.Fragment>))}
                              </select>
                              <select className="s-f31bca" aria-label={t?.ownerLabel} value={t?.owner ?? ""} onChange={t?.setOwner}>
                                {list(v.pv?.ownerOpts).map((o, i2) => (<React.Fragment key={i2}>
                                  <option value={o?.v}>{o?.label}</option>
                                </React.Fragment>))}
                              </select>
                              <input className="s-d7571f" aria-label={t?.dueLabel} type="date" value={t?.due ?? ""} onChange={t?.setDue} />
                              <input className="s-b0d3df" aria-label={t?.estLabel} type="number" min="0" step="1" value={t?.est ?? ""} onChange={t?.setEst} placeholder="0" />
                              <span className="s-f6cd2f" style={{ color: t?.loggedFg }}>{t?.logged}</span>
                              <button className="s-1595ae" onClick={t?.logTime} aria-label={t?.logLabel}>Log time</button>
                              <button className="s-bc2e52" onClick={t?.open} aria-label={t?.openA} title="Open task details">
                                <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M9 6l6 6-6 6"></path>
                                </svg>
                              </button>
                            </div>
                          </React.Fragment>))}
                          {on(m?.noTasks) && (<>
                            <p className="s-8ac547">No tasks yet.</p>
                          </>)}
                          <div className="s-776218">
                            <select className="s-955d13" aria-label="Type of the new item" value={m?.newType ?? ""} onChange={m?.setNewType}>
                              {list(v.pv?.typeOpts).map((o, i1) => (<React.Fragment key={i1}>
                                <option value={o?.v}>{o?.label}</option>
                              </React.Fragment>))}
                            </select>
                            <input className="s-196f0f" aria-label={m?.newLabel} type="text" value={m?.newTask ?? ""} onChange={m?.setNewTask} placeholder="Add a task, meeting, call or note" />
                            <button className="s-0e0c57" onClick={m?.addTask} disabled={on(m?.addOff)} style={{ border: `1px solid ${m?.addB?.bd ?? ""}`, background: m?.addB?.bg, color: m?.addB?.fg, cursor: m?.addB?.cur, font: "inherit", fontSize: "13px", fontWeight: "600" }}>Add task</button>
                          </div>
                        </div>
                      </div>
                    </>)}
                  </div>
                </React.Fragment>))}
              </div>
            </>)}
            {on(v.pv?.tabReqs) && (<>
              <div className="s-f170d9">
                <div className="s-315c58">
                  <h2 className="s-fa1f03">
                    <button className="s-72c5bc" onClick={v.cl?.k22?.toggle} aria-expanded={v.cl?.k22?.exp}>
                      <svg className="s-0d7706" aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ transform: `rotate(${v.cl?.k22?.rot ?? ""})`, transition: "transform 0.15s" }}>
                        <path d="M9 6l6 6-6 6"></path>
                      </svg>
                      <span>Requirements from the DRD</span>
                    </button>
                  </h2>
                </div>
                {on(v.cl?.k22?.open) && (<>
                  <div className="s-987eb2">
                    <div className="s-1fa813">
                      <div className="s-904a58">
                        <span>#</span>
                        <span>Requirement</span>
                        <span>Pain point it solves</span>
                        <span>Linked tasks</span>
                        <span>Status</span>
                      </div>
                      {list(v.pv?.reqs).map((r, i0) => (<React.Fragment key={i0}>
                        <div className="s-df01c3">
                          <span className="s-c6aebd">{r?.n}</span>
                          <span>
                            <button className="s-d2f3a1" onClick={r?.open}>{r?.req}</button>
                          </span>
                          <span className="s-ec2d63">{r?.pain}</span>
                          <span className="s-9a27ce" style={{ color: r?.tasksFg }}>{r?.tasks}</span>
                          <span>
                            <span className="s-0ff21f" style={{ background: r?.pill?.bg, color: r?.pill?.fg }}>{r?.status}</span>
                          </span>
                        </div>
                      </React.Fragment>))}
                    </div>
                  </div>
                  {on(v.pv?.reqWaiting) && (<>
                    <div className="s-d34d14">
                      <span className="s-e000b9">The SA promotes approved DRD items as the first onboarding step.</span>
                      <button className="s-b27775" onClick={v.pv?.promote}>Promote to project</button>
                    </div>
                  </>)}
                </>)}
              </div>
            </>)}
            {on(v.pv?.tabTime) && (<>
              <div className="s-f170d9">
                <div className="s-951b15">
                  <div>
                    <h2 className="s-fa1f03">
                      <button className="s-72c5bc" onClick={v.cl?.k23?.toggle} aria-expanded={v.cl?.k23?.exp}>
                        <svg className="s-0d7706" aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ transform: `rotate(${v.cl?.k23?.rot ?? ""})`, transition: "transform 0.15s" }}>
                          <path d="M9 6l6 6-6 6"></path>
                        </svg>
                        <span>Time log</span>
                      </button>
                    </h2>
                    <p className="s-96d2c1">{v.pv?.logSummary}</p>
                  </div>
                  <button className="s-b27775" onClick={v.pv?.logTime}>Log time</button>
                </div>
                {on(v.cl?.k23?.open) && (<>
                  <div className="s-987eb2">
                    <div className="s-8ad925">
                      <div className="s-a7f0fb">
                        <span>Date</span>
                        <span>Who</span>
                        <span className="s-30489c">Hours</span>
                        <span>Service line</span>
                        <span>Phase</span>
                        <span>Task</span>
                        <span>Billed rate</span>
                        <span></span>
                      </div>
                      {list(v.pv?.log).map((e, i0) => (<React.Fragment key={i0}>
                        <div className="s-2eac2c">
                          <span className="s-dea291">{e?.date}</span>
                          <span>{e?.by}</span>
                          <span className="s-2b339b">{e?.hours}</span>
                          <span className="s-ec2d63">{e?.svc}</span>
                          <span className="s-ec2d63">{e?.ms}</span>
                          <span className="s-ec2d63">{e?.task}</span>
                          <span className="s-7fe044">{e?.billed}</span>
                          {on(e?.canRemove) && (<>
                            <button className="s-bee9e5" onClick={e?.remove} aria-label={e?.removeLabel}>×</button>
                          </>)}
                        </div>
                      </React.Fragment>))}
                      {on(v.pv?.logEmpty) && (<>
                        <p className="s-c70e0f">No time logged yet.</p>
                      </>)}
                    </div>
                  </div>
                </>)}
              </div>
            </>)}
            {on(v.pv?.tabFiles) && (<>
              <p className="s-105eaf">Files and links from the deal come over with the project. Anything added here is shared with the deal record.</p>
              <div className="s-89dbb6">
                <div className="s-fc2763">
                  <div className="s-73d6ec">
                    <div>
                      <h2 className="s-fa1f03">
                        <button className="s-72c5bc" onClick={v.cl?.k24?.toggle} aria-expanded={v.cl?.k24?.exp}>
                          <svg className="s-0d7706" aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ transform: `rotate(${v.cl?.k24?.rot ?? ""})`, transition: "transform 0.15s" }}>
                            <path d="M9 6l6 6-6 6"></path>
                          </svg>
                          <span>Add a file or link</span>
                        </button>
                      </h2>
                      <p className="s-4a5e94">Proposals, SOWs, signed contracts, recordings, shared folders.</p>
                    </div>
                    <div className="s-d1f9fb" role="radiogroup" aria-label="What are you adding?">
                      <button className="s-518d5a" role="radio" aria-checked={v.ff?.linkOn} onClick={v.ff?.pickLink} style={{ background: v.ff?.linkBg, color: "#14112E", font: "inherit", fontSize: "13px", fontWeight: "600", cursor: "pointer" }}>Link</button>
                      <button className="s-518d5a" role="radio" aria-checked={v.ff?.fileOn} onClick={v.ff?.pickFile} style={{ background: v.ff?.fileBg, color: "#14112E", font: "inherit", fontSize: "13px", fontWeight: "600", cursor: "pointer" }}>File</button>
                    </div>
                  </div>
                  {on(v.cl?.k24?.open) && (<>
                    {on(v.ff?.isLink) && (<>
                      <div className="s-c492d1">
                        <div className="s-8129f1">
                          <label className="s-1afa54" htmlFor="f-url">URL</label>
                          <input className="s-21c180" id="f-url" type="url" value={v.ff?.url ?? ""} onChange={v.setFileUrl} placeholder="https://" />
                        </div>
                        <div className="s-8129f1">
                          <label className="s-1afa54" htmlFor="f-name">Name</label>
                          <input className="s-21c180" id="f-name" type="text" value={v.ff?.name ?? ""} onChange={v.setFileName} placeholder="e.g. Proposal in Prospero" />
                        </div>
                      </div>
                    </>)}
                    {on(v.ff?.isFile) && (<>
                      <div className="s-bc0172">
                        <label className="s-1afa54" htmlFor="f-file">File</label>
                        <input className="s-616ab6" id="f-file" type="file" onChange={v.setFilePick} />
                        <span className="s-0c84db">{v.ff?.fileNote}</span>
                      </div>
                    </>)}
                    <div className="s-4bda7e">
                      <div className="s-a07249">
                        <label className="s-1afa54" htmlFor="f-cat">Category</label>
                        <select className="s-1c9b9d" id="f-cat" value={v.ff?.category ?? ""} onChange={v.setFileCat}>
                          <option>Proposal</option>
                          <option>SOW</option>
                          <option>NDA</option>
                          <option>Contract</option>
                          <option>Signed contract</option>
                          <option>Vendor setup</option>
                          <option>Invoice</option>
                          <option>Bill</option>
                          <option>Documentation</option>
                          <option>Discovery notes</option>
                          <option>Recording</option>
                          <option>Other</option>
                        </select>
                      </div>
                      <button className="s-ddba00" onClick={v.ff?.save} disabled={on(v.ff?.off)} style={{ border: `1px solid ${v.ff?.b?.bd ?? ""}`, background: v.ff?.b?.bg, color: v.ff?.b?.fg, cursor: v.ff?.b?.cur, font: "inherit", fontSize: "13px", fontWeight: "600" }}>{v.ff?.cta}</button>
                    </div>
                  </>)}
                </div>
                <div className="s-f170d9">
                  <div className="s-493b3a">
                    <h2 className="s-fa1f03">
                      <button className="s-72c5bc" onClick={v.cl?.k25?.toggle} aria-expanded={v.cl?.k25?.exp}>
                        <svg className="s-0d7706" aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ transform: `rotate(${v.cl?.k25?.rot ?? ""})`, transition: "transform 0.15s" }}>
                          <path d="M9 6l6 6-6 6"></path>
                        </svg>
                        <span>Files and links</span>
                      </button>
                    </h2>
                    <span className="s-3ec15a">{v.dv?.fileCount}</span>
                  </div>
                  {on(v.cl?.k25?.open) && (<>
                    {list(v.dv?.files).map((f, i0) => (<React.Fragment key={i0}>
                      <div className="s-d00382">
                        <span className="s-00437a" aria-hidden="true">
                          {on(f?.isLink) && (<>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M10 13a5 5 0 0 0 7.07 0l3-3a5 5 0 0 0-7.07-7.07l-1.5 1.5"></path>
                              <path d="M14 11a5 5 0 0 0-7.07 0l-3 3a5 5 0 0 0 7.07 7.07l1.5-1.5"></path>
                            </svg>
                          </>)}
                          {on(f?.isFile) && (<>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                              <path d="M14 3v6h6"></path>
                            </svg>
                          </>)}
                        </span>
                        <div className="s-4ad4e4">
                          {on(f?.isLink) && (<>
                            {" "}
                            <a className="s-9a5c14" href={f?.url} target="_blank" rel="noopener noreferrer">{f?.name}</a>
                            {" "}
                          </>)}
                          {on(f?.isFile) && (<>
                            {" "}
                            <span className="s-d9a844">{f?.name}</span>
                            {" "}
                          </>)}
                          <div className="s-9a4628">{f?.meta}</div>
                        </div>
                        <span className="s-c1eda3">{f?.category}</span>
                        {on(f?.canRemove) && (<>
                          <button className="s-bfb177" onClick={f?.remove} aria-label={f?.removeLabel}>×</button>
                        </>)}
                      </div>
                    </React.Fragment>))}
                    {on(v.dv?.filesEmpty) && (<>
                      <p className="s-d4f4e5">No files or links yet.</p>
                    </>)}
                  </>)}
                </div>
              </div>
            </>)}
            {on(v.pv?.tabSetup) && (<>
              <div className="s-89dbb6">
                <p className="s-06def0">Changes here update the overview, time logging and financials straight away.</p>
                <div className="s-088946">
                  <h2 className="s-257a5f">
                    <button className="s-72c5bc" onClick={v.cl?.k26?.toggle} aria-expanded={v.cl?.k26?.exp}>
                      <svg className="s-0d7706" aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ transform: `rotate(${v.cl?.k26?.rot ?? ""})`, transition: "transform 0.15s" }}>
                        <path d="M9 6l6 6-6 6"></path>
                      </svg>
                      <span>General</span>
                    </button>
                  </h2>
                  {on(v.cl?.k26?.open) && (<>
                    <div className="s-979d35">
                      <div className="s-8129f1">
                        <label className="s-1afa54" htmlFor="su-name">Service (project name)</label>
                        <input className="s-21c180" id="su-name" type="text" value={v.pv?.su?.name ?? ""} onChange={v.pv?.su?.setName} placeholder={v.pv?.su?.namePh} />
                      </div>
                      <div className="s-8129f1">
                        <label className="s-1afa54" htmlFor="su-id">Project ID</label>
                        <input className="s-ae9e6e" id="su-id" type="text" value={v.pv?.pid ?? ""} readOnly={true} />
                      </div>
                      <div className="s-8129f1">
                        <label className="s-1afa54" htmlFor="su-billing">Billing type</label>
                        <select className="s-1c9b9d" id="su-billing" value={v.pv?.su?.billing ?? ""} onChange={v.pv?.su?.setBilling}>
                          <option>Time and materials</option>
                          <option>Fixed fee</option>
                        </select>
                      </div>
                    </div>
                  </>)}
                </div>
                <div className="s-088946">
                  <h2 className="s-257a5f">
                    <button className="s-72c5bc" onClick={v.cl?.k27?.toggle} aria-expanded={v.cl?.k27?.exp}>
                      <svg className="s-0d7706" aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ transform: `rotate(${v.cl?.k27?.rot ?? ""})`, transition: "transform 0.15s" }}>
                        <path d="M9 6l6 6-6 6"></path>
                      </svg>
                      <span>Dates and contract</span>
                    </button>
                  </h2>
                  {on(v.cl?.k27?.open) && (<>
                    <div className="s-f739ca">
                      {list(v.pv?.dates).map((k, i0) => (<React.Fragment key={i0}>
                        <div className="s-8129f1">
                          <label className="s-1afa54" htmlFor={k?.setupId}>{k?.label}</label>
                          <input className="s-439402" id={k?.setupId} type="date" value={k?.value ?? ""} onChange={k?.set} />
                        </div>
                      </React.Fragment>))}
                      <div className="s-8129f1">
                        <label className="s-1afa54" htmlFor="su-alert">Warn before contract expiry</label>
                        <select className="s-1c9b9d" id="su-alert" value={v.pv?.su?.alert ?? ""} onChange={v.pv?.su?.setAlert}>
                          <option value="14">14 days</option>
                          <option value="30">30 days</option>
                          <option value="60">60 days</option>
                          <option value="90">90 days</option>
                        </select>
                      </div>
                    </div>
                  </>)}
                </div>
                <div className="s-088946">
                  <div>
                    <h2 className="s-257a5f">
                      <button className="s-72c5bc" onClick={v.cl?.k28?.toggle} aria-expanded={v.cl?.k28?.exp}>
                        <svg className="s-0d7706" aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ transform: `rotate(${v.cl?.k28?.rot ?? ""})`, transition: "transform 0.15s" }}>
                          <path d="M9 6l6 6-6 6"></path>
                        </svg>
                        <span>Budget and rates</span>
                      </button>
                    </h2>
                    <p className="s-96d2c1">Defaults come from the deal's accepted quote. Leave a field empty to use the quote value.</p>
                  </div>
                  {on(v.cl?.k28?.open) && (<>
                    <div className="s-a08bce">
                      <div className="s-8129f1">
                        <label className="s-1afa54" htmlFor="su-hours">Total hours</label>
                        <input className="s-829100" id="su-hours" type="number" min="0" step="1" value={v.pv?.su?.hours ?? ""} onChange={v.pv?.su?.setHours} placeholder={v.pv?.su?.hoursPh} />
                      </div>
                      <div className="s-8129f1">
                        <label className="s-1afa54" htmlFor="su-cost">Cost rate ($ / h)</label>
                        <input className="s-829100" id="su-cost" type="number" min="0" step="1" value={v.pv?.su?.cost ?? ""} onChange={v.pv?.su?.setCost} placeholder={v.pv?.su?.costPh} />
                      </div>
                    </div>
                    <div className="s-e2cc18">
                      <div className="s-e9da25">
                        <span>Role</span>
                        <span>Billed rate on the quote</span>
                        <span>Billed rate on this project</span>
                      </div>
                      {list(v.pv?.su?.rates).map((r, i0) => (<React.Fragment key={i0}>
                        <div className="s-1463e1">
                          <span className="s-21a1be">{r?.role}</span>
                          <span className="s-7f788e">{r?.quote}</span>
                          <input className="s-62d629" aria-label={r?.label} type="number" min="0" step="5" value={r?.value ?? ""} onChange={r?.set} placeholder={r?.ph} />
                        </div>
                      </React.Fragment>))}
                    </div>
                  </>)}
                </div>
                <div className="s-35da20">
                  <div>
                    <h2 className="s-257a5f">
                      <button className="s-72c5bc" onClick={v.cl?.k29?.toggle} aria-expanded={v.cl?.k29?.exp}>
                        <svg className="s-0d7706" aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ transform: `rotate(${v.cl?.k29?.rot ?? ""})`, transition: "transform 0.15s" }}>
                          <path d="M9 6l6 6-6 6"></path>
                        </svg>
                        <span>Onboarding checklist items</span>
                      </button>
                    </h2>
                    <p className="s-96d2c1">The first item always promotes the approved DRD requirements.</p>
                  </div>
                  {on(v.cl?.k29?.open) && (<>
                    {list(v.pv?.su?.items).map((it, i0) => (<React.Fragment key={i0}>
                      <div className="s-cb8b4d" draggable={it?.drag} onDragStart={it?.dragStart} onDragOver={it?.dragOver} onDrop={it?.drop} onDragEnd={it?.dragEnd} style={{ background: it?.dropBg }}>
                        <span className="s-88a906" aria-hidden="true" title="Drag to reorder" style={{ cursor: it?.grabCur, userSelect: "none" }}>⋮⋮</span>
                        <span className="s-c3d219" aria-hidden="true">{it?.n}</span>
                        <input className="s-ba0286" aria-label={it?.label} type="text" value={it?.text ?? ""} onChange={it?.set} disabled={on(it?.locked)} style={{ background: it?.bg, color: "#14112E", font: "inherit", fontSize: "13px" }} />
                        {on(it?.canMove) && (<>
                          <button className="s-359829" onClick={it?.up} aria-label={it?.upA} disabled={on(it?.upOff)}>↑</button>
                          <button className="s-359829" onClick={it?.down} aria-label={it?.downA} disabled={on(it?.downOff)}>↓</button>
                        </>)}
                        {on(it?.canRemove) && (<>
                          <button className="s-bfb177" onClick={it?.remove} aria-label={it?.removeLabel}>×</button>
                        </>)}
                      </div>
                    </React.Fragment>))}
                    <div className="s-f79253">
                      <label className="s-14ff23" htmlFor="su-new-item">New checklist item</label>
                      <input className="s-2a2cb3" id="su-new-item" type="text" value={v.pv?.su?.newItem ?? ""} onChange={v.setNewCheck} placeholder="Add a checklist item" />
                      <button className="s-931481" onClick={v.pv?.su?.addItem} disabled={on(v.pv?.su?.addOff)} style={{ border: `1px solid ${v.pv?.su?.addB?.bd ?? ""}`, background: v.pv?.su?.addB?.bg, color: v.pv?.su?.addB?.fg, cursor: v.pv?.su?.addB?.cur, font: "inherit", fontSize: "13px", fontWeight: "600" }}>Add</button>
                    </div>
                  </>)}
                </div>
              </div>
            </>)}
            {on(v.pv?.tabFin) && (<>
              <div className="s-89dbb6">
                <div className="s-f739ca">
                  {list(v.pv?.fin?.tiles).map((t, i0) => (<React.Fragment key={i0}>
                    <div className="s-9ece3c">
                      <span className="s-009915">{t?.k}</span>
                      <span className="s-01e93b" style={{ color: t?.fg }}>{t?.v}</span>
                      <span className="s-629d39">{t?.note}</span>
                    </div>
                  </React.Fragment>))}
                </div>
                <div className="s-7fbe1d">
                  {list(v.pv?.fin?.pls).map((pl, i0) => (<React.Fragment key={i0}>
                    <div className="s-f170d9">
                      <div className="s-8a1179">
                        <h2 className="s-257a5f">{pl?.title}</h2>
                        <p className="s-c2bcb3">{pl?.sub}</p>
                      </div>
                      {list(pl?.rows).map((r, i1) => (<React.Fragment key={i1}>
                        <div className="s-3b1837">
                          <span className="s-ec2d63">{r?.k}</span>
                          <span className="s-42d1ef" style={{ fontWeight: r?.fw, color: r?.fg }}>{r?.v}</span>
                        </div>
                      </React.Fragment>))}
                    </div>
                  </React.Fragment>))}
                </div>
                <p className="s-06def0">{v.pv?.fin?.note}</p>
              </div>
            </>)}
          </div>
          {on(v.sideOpen) && (<>
            <aside className="s-344502" aria-label="Project team, company and contacts">
              <div className="s-057f50">
                <div className="s-9870f5">
                  <h2 className="s-91adb2">
                    <button className="s-72c5bc" onClick={v.cl?.k30?.toggle} aria-expanded={v.cl?.k30?.exp}>
                      <svg className="s-0d7706" aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ transform: `rotate(${v.cl?.k30?.rot ?? ""})`, transition: "transform 0.15s" }}>
                        <path d="M9 6l6 6-6 6"></path>
                      </svg>
                      <span>Project team</span>
                    </button>
                  </h2>
                  <button className="s-3c4394" onClick={v.pv?.addMember}>+ Add</button>
                </div>
                {on(v.cl?.k30?.open) && (<>
                  {list(v.pv?.slots).map((m, i0) => (<React.Fragment key={i0}>
                    <div className="s-f007e2">
                      <span className="s-1762b0" aria-hidden="true" style={{ background: m?.avBg, color: m?.avFg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11.5px", fontWeight: "700" }}>{m?.initials}</span>
                      <span className="s-4ad4e4">
                        {" "}
                        <span className="s-98a285">{m?.role}</span>
                        {" "}
                        <span className="s-6de5a7" style={{ color: m?.nameFg }}>{m?.name}</span>
                        {" "}
                      </span>
                      <button className="s-648015" onClick={m?.act} aria-label={m?.actLabel}>{m?.cta}</button>
                    </div>
                  </React.Fragment>))}
                  <p className="s-20e365">SE and sales rep come over from the deal.</p>
                </>)}
              </div>
              <div className="s-d5147a">
                <div className="s-962b5b">
                  <h2 className="s-91adb2">
                    <button className="s-72c5bc" onClick={v.cl?.k31?.toggle} aria-expanded={v.cl?.k31?.exp}>
                      <svg className="s-0d7706" aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ transform: `rotate(${v.cl?.k31?.rot ?? ""})`, transition: "transform 0.15s" }}>
                        <path d="M9 6l6 6-6 6"></path>
                      </svg>
                      <span>Company</span>
                    </button>
                  </h2>
                  <button className="s-766d98" onClick={v.pv?.openCompany} aria-label="Open the company record">Open</button>
                </div>
                {on(v.cl?.k31?.open) && (<>
                  {list(v.pv?.companyFields).map((f, i0) => (<React.Fragment key={i0}>
                    <div className="s-9d768a">
                      <span className="s-78398b">{f?.k}</span>
                      <span className="s-dbc6af">{f?.v}</span>
                    </div>
                  </React.Fragment>))}
                </>)}
              </div>
              <div className="s-057f50">
                <div className="s-9870f5">
                  <h2 className="s-91adb2">
                    <button className="s-72c5bc" onClick={v.cl?.k32?.toggle} aria-expanded={v.cl?.k32?.exp}>
                      <svg className="s-0d7706" aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ transform: `rotate(${v.cl?.k32?.rot ?? ""})`, transition: "transform 0.15s" }}>
                        <path d="M9 6l6 6-6 6"></path>
                      </svg>
                      <span>Customer team</span>
                    </button>
                  </h2>
                  <button className="s-3c4394" onClick={v.pv?.addContact}>+ Add contact</button>
                </div>
                {on(v.cl?.k32?.open) && (<>
                  {list(v.pv?.contacts).map((c, i0) => (<React.Fragment key={i0}>
                    <div className="s-968c2e">
                      <div className="s-b36eaf">
                        <span className="s-21a1be">{c?.name}</span>
                        {list(c?.chips).map((ch, i1) => (<React.Fragment key={i1}>
                          <span className="s-fe6a2a" style={{ background: ch?.bg, color: ch?.fg }}>{ch?.label}</span>
                        </React.Fragment>))}
                      </div>
                      <span className="s-0dc2d5">{c?.email}</span>
                      <span className="s-7fe044">{c?.phone}</span>
                    </div>
                  </React.Fragment>))}
                </>)}
              </div>
            </aside>
          </>)}
        </div>
      </section>
    </>
  );
}
