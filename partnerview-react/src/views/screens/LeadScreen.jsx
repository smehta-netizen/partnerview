// Generated from the PartnerView design-canvas prototype. Edit freely.
import React from 'react';
import { on, list } from '../runtime';


export default function LeadScreen({ v }) {
  return (
    <>
      <section className="s-e911df">
        <button className="s-849418" onClick={v.goLeads}>Back to leads</button>
        <div className="s-622fdc">
          <div className="s-33f2a6">
            <div className="s-c28934">
              <h1 className="s-8dd424">{v.lv?.name}</h1>
              <span className="s-1e4be5" style={{ background: v.lv?.pill?.bg, color: v.lv?.pill?.fg }}>{v.lv?.status}</span>
            </div>
            <div className="s-3bef69">
              <label className="s-21a1be" htmlFor="lead-owner-h">Owner (AE)</label>
              {on(v.lv?.canAssign) && (<>
                <select className="s-3bb7b5" id="lead-owner-h" value={v.lv?.ownerSel ?? ""} onChange={v.lv?.assign}>
                  {list(v.lv?.assignOpts).map((o, i0) => (<React.Fragment key={i0}>
                    <option value={o?.v}>{o?.label}</option>
                  </React.Fragment>))}
                </select>
              </>)}
              {on(v.lv?.cannotAssign) && (<>
                <span className="s-99c0d2">{v.lv?.ownerText}</span>
              </>)}
            </div>
          </div>
          <span className="s-963192">{v.lv?.code}</span>
        </div>
        <div className="s-d08feb">
          <div className="s-4b41f8">
            <ol className="s-765354" aria-label="Lead stage">
              {list(v.lv?.stages).map((st, i0) => (<React.Fragment key={i0}>
                <li className="s-f50716">
                  <button className="s-6f613c" onClick={st?.go} aria-current={st?.current} title={st?.title} style={{ border: `1px solid ${st?.bd ?? ""}`, background: st?.bg, color: st?.fg, font: "inherit", fontWeight: "600", fontSize: "13px", textAlign: "left", cursor: st?.cur }}>{st?.label}</button>
                </li>
              </React.Fragment>))}
            </ol>
            {on(v.lv?.hasDeal) && (<>
              <button className="s-8e3755" onClick={v.lv?.openDeal}>{v.lv?.dealLabel}</button>
            </>)}
          </div>
          <span className="s-72d4cd">{v.lv?.stageNote}</span>
        </div>
        <div className="s-e47a58">
          <div className="s-03c5dd" role="tablist" aria-label="Lead sections">
            {list(v.lv?.tabs).map((tb, i0) => (<React.Fragment key={i0}>
              <button className="s-176c4f" role="tab" aria-selected={tb?.selected} onClick={tb?.go} style={{ borderBottom: `2px solid ${tb?.bd ?? ""}`, background: "transparent", color: tb?.fg, font: "inherit", fontWeight: tb?.fw, cursor: "pointer" }}>{tb?.label}</button>
            </React.Fragment>))}
          </div>
          <div className="s-c0913e">
            <button className="s-cf516c" onClick={v.lv?.openChat} aria-label={v.lv?.chatA} title={v.lv?.chatA} style={{ border: `1px solid ${v.lv?.chatBd ?? ""}`, background: v.lv?.chatBg, color: v.lv?.chatFg, font: "inherit", fontSize: "12.5px", fontWeight: "600", cursor: "pointer" }}>
              <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"></path>
              </svg>
              <span>Chatter</span>
              <span className="s-42d1ef">{v.lv?.chatN}</span>
            </button>
            {on(v.lv?.tabOverview) && (<>
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
        {on(v.lv?.tabOverview) && (<>
          <div className="s-9f90e7">
            <div className="s-1e98ca">
              <div className="s-f170d9">
                <div className="s-dbe277">
                  <h2 className="s-fa1f03">Lead details</h2>
                  {on(v.lv?.viewing) && (<>
                    <button className="s-d0f0bd" onClick={v.lv?.edit}>
                      <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 20h9"></path>
                        <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"></path>
                      </svg>
                      Edit
                    </button>
                  </>)}
                </div>
                {on(v.lv?.viewing) && (<>
                  <div className="s-6bbc16">
                    {list(v.lv?.dfields).map((f, i0) => (<React.Fragment key={i0}>
                      <div className="s-277db9">
                        <span className="s-a6cf94">{f?.k}</span>
                        {on(f?.isLink) && (<>
                          <button className="s-62c6a1" onClick={f?.go}>{f?.v}</button>
                        </>)}
                        {on(f?.noLink) && (<>
                          <span className="s-ed2cbf" style={{ color: f?.fg, overflowWrap: "anywhere" }}>{f?.v}</span>
                        </>)}
                      </div>
                    </React.Fragment>))}
                  </div>
                </>)}
                {on(v.lv?.editing) && (<>
                  <div className="s-0f3108">
                    <div className="s-8129f1">
                      <label className="s-a6cf94" htmlFor="ld-first">
                        First name{" "}
                        <span className="s-d484b9">*</span>
                      </label>
                      <input className="s-51dd65" id="ld-first" type="text" value={v.lv?.first ?? ""} onChange={v.lv?.setFirst} />
                    </div>
                    <div className="s-8129f1">
                      <label className="s-a6cf94" htmlFor="ld-last">
                        Last name{" "}
                        <span className="s-d484b9">*</span>
                      </label>
                      <input className="s-51dd65" id="ld-last" type="text" value={v.lv?.last ?? ""} onChange={v.lv?.setLast} />
                    </div>
                    <div className="s-8129f1">
                      <label className="s-a6cf94" htmlFor="ld-email">
                        Email{" "}
                        <span className="s-d484b9">*</span>
                      </label>
                      <input className="s-51dd65" id="ld-email" type="email" value={v.lv?.email ?? ""} onChange={v.lv?.setEmail} />
                    </div>
                    <div className="s-8129f1">
                      <label className="s-a6cf94" htmlFor="ld-phone">
                        Phone{" "}
                        <span className="s-d484b9">*</span>
                      </label>
                      <input className="s-51dd65" id="ld-phone" type="tel" value={v.lv?.phone ?? ""} onChange={v.lv?.setPhone} />
                    </div>
                    <div className="s-8129f1">
                      <label className="s-a6cf94" htmlFor="ld-source">
                        Lead source{" "}
                        <span className="s-d484b9">*</span>
                      </label>
                      <select className="s-51dd65" id="ld-source" value={v.lv?.source ?? ""} onChange={v.lv?.setSource}>
                        {list(v.lv?.sourceOpts).map((o, i0) => (<React.Fragment key={i0}>
                          <option value={o?.v}>{o?.label}</option>
                        </React.Fragment>))}
                      </select>
                    </div>
                    <div className="s-8129f1">
                      <label className="s-a6cf94" htmlFor="ld-owner">
                        Owner (AE){" "}
                        <span style={{ color: v.lv?.hint?.fg }}>{v.lv?.hint?.owner}</span>
                      </label>
                      <select className="s-51dd65" id="ld-owner" value={v.lv?.ownerSel ?? ""} onChange={v.lv?.setOwner} disabled={on(v.lv?.cannotAssign)}>
                        {list(v.lv?.assignOpts).map((o, i0) => (<React.Fragment key={i0}>
                          <option value={o?.v}>{o?.label}</option>
                        </React.Fragment>))}
                      </select>
                    </div>
                    <div className="s-8129f1">
                      <label className="s-a6cf94" htmlFor="ld-ind">
                        Industry{" "}
                        <span style={{ color: v.lv?.hint?.fg }}>{v.lv?.hint?.industry}</span>
                      </label>
                      <input className="s-51dd65" id="ld-ind" type="text" value={v.lv?.industry ?? ""} onChange={v.lv?.setIndustry} placeholder="e.g. Logistics" />
                    </div>
                    <div className="s-8129f1">
                      <label className="s-a6cf94" htmlFor="ld-val">
                        Estimated value ($){" "}
                        <span style={{ color: v.lv?.hint?.fg }}>{v.lv?.hint?.value}</span>
                      </label>
                      <input className="s-d3198d" id="ld-val" type="text" inputMode="numeric" value={v.lv?.value ?? ""} onChange={v.lv?.setValue} placeholder="e.g. 15,000" />
                    </div>
                  </div>
                  <div className="s-002f06">
                    <span className="s-11fcdc" style={{ color: v.lv?.editHintFg }}>{v.lv?.editHint}</span>
                    <div className="s-b9b7b5">
                      <button className="s-1f0d9f" onClick={v.lv?.save} disabled={on(v.lv?.saveOff)} style={{ border: `1px solid ${v.lv?.saveB?.bd ?? ""}`, background: v.lv?.saveB?.bg, color: v.lv?.saveB?.fg, cursor: v.lv?.saveB?.cur, font: "inherit", fontWeight: "600" }}>Save</button>
                      <button className="s-f7d19b" onClick={v.lv?.cancelEdit}>Cancel</button>
                    </div>
                  </div>
                </>)}
              </div>
              <div className="s-72e2bc">
                <h2 className="s-fa1f03">
                  <button className="s-72c5bc" onClick={v.cl?.k2?.toggle} aria-expanded={v.cl?.k2?.exp}>
                    <svg className="s-0d7706" aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ transform: `rotate(${v.cl?.k2?.rot ?? ""})`, transition: "transform 0.15s" }}>
                      <path d="M9 6l6 6-6 6"></path>
                    </svg>
                    <span>What they need</span>
                  </button>
                </h2>
                {on(v.cl?.k2?.open) && (<>
                  <div className="s-bc0172">
                    <label className="s-a6cf94" htmlFor="ld-needs">
                      Needs{" "}
                      <span className="s-d484b9">*</span>
                    </label>
                    <textarea className="s-386417" id="ld-needs" value={v.lv?.needs ?? ""} rows="3" onChange={v.lv?.setNeeds} placeholder="The problem they want solved, in their words" />
                  </div>
                  <div className="s-d08feb">
                    <span className="s-a6cf94">Products</span>
                    <div className="s-a8a903">
                      {" "}
                      <button className="s-61b68c" aria-haspopup="listbox" aria-expanded={v.lv?.prodMs?.exp} onClick={v.lv?.prodMs?.toggleOpen} style={{ border: `1px solid ${v.lv?.prodMs?.bd ?? ""}`, background: "#FFFFFF", color: "#14112E", font: "inherit", fontSize: "13px", textAlign: "left", cursor: "pointer" }}>
                        <span className="s-1bcaee" style={{ color: v.lv?.prodMs?.sumFg }}>{v.lv?.prodMs?.summary}</span>
                        <span className="s-e1f28b">
                          {on(v.lv?.prodMs?.hasCount) && (<>
                            <span className="s-4a0360">{v.lv?.prodMs?.count}</span>
                          </>)}
                          <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4A4766" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: `rotate(${v.lv?.prodMs?.rot ?? ""})`, transition: "transform 0.15s" }}>
                            <path d="M6 9l6 6 6-6"></path>
                          </svg>
                        </span>
                      </button>
                      {" "}
                      {on(v.lv?.prodMs?.open) && (<>
                        <div className="s-5a6d2b" role="listbox" aria-multiselectable="true">
                          {list(v.lv?.prodMs?.opts).map((o, i0) => (<React.Fragment key={i0}>
                            <button className="s-e0155d" role="option" aria-selected={o?.sel} onClick={o?.toggle} style={{ background: o?.bg, color: "#14112E", font: "inherit", fontSize: "13px", textAlign: "left", cursor: "pointer" }}>
                              <span className="s-eb5a19" aria-hidden="true" style={{ border: `1.5px solid ${o?.box ?? ""}`, background: o?.fill, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={o?.tick} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M5 12l5 5 9-10"></path>
                                </svg>
                              </span>
                              <span>{o?.label}</span>
                            </button>
                          </React.Fragment>))}
                          <div className="s-7668ef">
                            <span className="s-629d39">{v.lv?.prodMs?.countText}</span>
                            <button className="s-379cf6" onClick={v.lv?.prodMs?.close}>Done</button>
                          </div>
                        </div>
                      </>)}
                    </div>
                  </div>
                  <div className="s-d08feb">
                    <span className="s-a6cf94">Services</span>
                    <div className="s-a8a903">
                      {" "}
                      <button className="s-61b68c" aria-haspopup="listbox" aria-expanded={v.lv?.svcMs?.exp} onClick={v.lv?.svcMs?.toggleOpen} style={{ border: `1px solid ${v.lv?.svcMs?.bd ?? ""}`, background: "#FFFFFF", color: "#14112E", font: "inherit", fontSize: "13px", textAlign: "left", cursor: "pointer" }}>
                        <span className="s-1bcaee" style={{ color: v.lv?.svcMs?.sumFg }}>{v.lv?.svcMs?.summary}</span>
                        <span className="s-e1f28b">
                          {on(v.lv?.svcMs?.hasCount) && (<>
                            <span className="s-4a0360">{v.lv?.svcMs?.count}</span>
                          </>)}
                          <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4A4766" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: `rotate(${v.lv?.svcMs?.rot ?? ""})`, transition: "transform 0.15s" }}>
                            <path d="M6 9l6 6 6-6"></path>
                          </svg>
                        </span>
                      </button>
                      {" "}
                      {on(v.lv?.svcMs?.open) && (<>
                        <div className="s-5a6d2b" role="listbox" aria-multiselectable="true">
                          {list(v.lv?.svcMs?.opts).map((o, i0) => (<React.Fragment key={i0}>
                            <button className="s-e0155d" role="option" aria-selected={o?.sel} onClick={o?.toggle} style={{ background: o?.bg, color: "#14112E", font: "inherit", fontSize: "13px", textAlign: "left", cursor: "pointer" }}>
                              <span className="s-eb5a19" aria-hidden="true" style={{ border: `1.5px solid ${o?.box ?? ""}`, background: o?.fill, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={o?.tick} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M5 12l5 5 9-10"></path>
                                </svg>
                              </span>
                              <span>{o?.label}</span>
                            </button>
                          </React.Fragment>))}
                          <div className="s-7668ef">
                            <span className="s-629d39">{v.lv?.svcMs?.countText}</span>
                            <button className="s-379cf6" onClick={v.lv?.svcMs?.close}>Done</button>
                          </div>
                        </div>
                      </>)}
                    </div>
                  </div>
                </>)}
              </div>
              <div className="s-72e2bc">
                <h2 className="s-fa1f03">
                  <button className="s-72c5bc" onClick={v.cl?.k3?.toggle} aria-expanded={v.cl?.k3?.exp}>
                    <svg className="s-0d7706" aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ transform: `rotate(${v.cl?.k3?.rot ?? ""})`, transition: "transform 0.15s" }}>
                      <path d="M9 6l6 6-6 6"></path>
                    </svg>
                    <span>Next step and notes</span>
                  </button>
                </h2>
                {on(v.cl?.k3?.open) && (<>
                  <div className="s-bc0172">
                    <label className="s-a6cf94" htmlFor="ld-next">
                      Next step{" "}
                      <span style={{ color: v.lv?.hint?.fg }}>{v.lv?.hint?.next}</span>
                    </label>
                    <input className="s-51dd65" id="ld-next" type="text" value={v.lv?.nextStep ?? ""} onChange={v.lv?.setNext} placeholder="What happens next, and when?" />
                  </div>
                  <div className="s-bc0172">
                    <label className="s-a6cf94" htmlFor="ld-notes">Notes</label>
                    <textarea className="s-386417" id="ld-notes" value={v.lv?.notes ?? ""} rows="3" onChange={v.lv?.setNotes} placeholder="Anything the team should know" />
                  </div>
                </>)}
              </div>
            </div>
            {on(v.sideOpen) && (<>
              <div className="s-344502">
                <div className="s-f170d9">
                  <div className="s-9573a2">
                    <div>
                      <h2 className="s-fa1f03">
                        <button className="s-72c5bc" onClick={v.cl?.k1?.toggle} aria-expanded={v.cl?.k1?.exp}>
                          <svg className="s-0d7706" aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ transform: `rotate(${v.cl?.k1?.rot ?? ""})`, transition: "transform 0.15s" }}>
                            <path d="M9 6l6 6-6 6"></path>
                          </svg>
                          <span>Lead checklist</span>
                        </button>
                      </h2>
                      <p className="s-96d2c1">{v.lv?.ruleText}</p>
                    </div>
                    <span className="s-dea291" style={{ color: v.lv?.repCountFg }}>{v.lv?.repCount}</span>
                  </div>
                  {on(v.cl?.k1?.open) && (<>
                    <div className="s-dbdc53">
                      <span className="s-05854e" id="lead-rep-q">Is a monday.com rep involved?</span>
                      <div className="s-d1f9fb" role="radiogroup" aria-labelledby="lead-rep-q">
                        <button className="s-20a245" role="radio" aria-checked={v.lv?.yesPressed} onClick={v.lv?.repYes} style={{ background: v.lv?.yBg, color: "#14112E", font: "inherit", fontSize: "13px", fontWeight: "600", cursor: "pointer" }}>Yes</button>
                        <button className="s-20a245" role="radio" aria-checked={v.lv?.noPressed} onClick={v.lv?.repNo} style={{ background: v.lv?.nBg, color: "#14112E", font: "inherit", fontSize: "13px", fontWeight: "600", cursor: "pointer" }}>No</button>
                      </div>
                    </div>
                    <div className="s-55d53b">
                      {list(v.lv?.repFields).map((f, i0) => (<React.Fragment key={i0}>
                        {" "}
                        <button className="s-4c9ccd" role="switch" aria-checked={f?.on} onClick={f?.toggle}>
                          <span>{f?.label}</span>
                          <span className="s-f265ed">
                            <span className="s-7cf764" aria-hidden="true" style={{ color: f?.stateFg }}>{f?.state}</span>
                            <span className="s-fd734a" aria-hidden="true" style={{ border: `1px solid ${f?.trackBd ?? ""}`, background: f?.trackBg, display: "flex", alignItems: "center" }}>
                              <span className="s-07a736" style={{ background: f?.knobBg, boxShadow: "0 1px 2px rgba(20, 17, 46, 0.25)", marginLeft: f?.knobX }}></span>
                            </span>
                          </span>
                        </button>
                        {" "}
                      </React.Fragment>))}
                    </div>
                    <div className="s-0e6d4c">
                      <span className="s-b34b0c">Lead details needed to convert</span>
                      <div className="s-2bf69b">
                        {list(v.lv?.needs2).map((n, i0) => (<React.Fragment key={i0}>
                          <span className="s-ac0b1f" style={{ background: n?.bg, color: n?.fg }}>
                            <span aria-hidden="true">{n?.mark}</span>
                            {n?.label}
                          </span>
                        </React.Fragment>))}
                      </div>
                    </div>
                    <div className="s-294fad">
                      <span className="s-a54188" style={{ color: v.lv?.convNoteFg }}>{v.lv?.convNote}</span>
                      {on(v.lv?.notConverted) && (<>
                        <button className="s-93a0d4" onClick={v.lv?.convert} disabled={on(v.lv?.convertOff)} style={{ border: `1px solid ${v.lv?.convB?.bd ?? ""}`, background: v.lv?.convB?.bg, color: v.lv?.convB?.fg, cursor: v.lv?.convB?.cur, font: "inherit", fontWeight: "600" }}>Convert to deal</button>
                      </>)}
                      {on(v.lv?.hasDeal) && (<>
                        <button className="s-5e75ba" onClick={v.lv?.openDeal}>{v.lv?.dealLabel}</button>
                      </>)}
                    </div>
                  </>)}
                </div>
                <div className="s-f170d9">
                  <div className="s-a949af">
                    <h2 className="s-fa1f03">
                      <button className="s-72c5bc" onClick={v.cl?.k4?.toggle} aria-expanded={v.cl?.k4?.exp}>
                        <svg className="s-0d7706" aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ transform: `rotate(${v.cl?.k4?.rot ?? ""})`, transition: "transform 0.15s" }}>
                          <path d="M9 6l6 6-6 6"></path>
                        </svg>
                        <span>Tasks</span>
                      </button>
                    </h2>
                    <span className="s-3ec15a">{v.lv?.taskCount}</span>
                  </div>
                  {on(v.cl?.k4?.open) && (<>
                    {list(v.lv?.tasks).map((t, i0) => (<React.Fragment key={i0}>
                      <div className="s-69c7db">
                        <input className="s-0425b6" type="checkbox" aria-label={t?.doneLabel} checked={on(t?.done)} onChange={t?.toggle} />
                        <button className="s-3cf3e9" onClick={t?.open} title="Open task details" style={{ color: t?.fg, textDecoration: t?.deco, textAlign: "left", cursor: "pointer" }}>{t?.title}</button>
                        <span className="s-3c9f14" style={{ color: t?.dueFg, whiteSpace: "nowrap" }}>{t?.dueText}</span>
                        <button className="s-bee9e5" onClick={t?.remove} aria-label={t?.removeLabel}>×</button>
                      </div>
                    </React.Fragment>))}
                    {on(v.lv?.noTasks) && (<>
                      <p className="s-1701af">No tasks yet.</p>
                    </>)}
                    <div className="s-f4e1c0">
                      <input className="s-d629c1" aria-label="New task" type="text" value={v.lv?.taskTitle ?? ""} onChange={v.lv?.setTaskTitle} placeholder="Add a task, e.g. Send the SMP form" />
                      <input className="s-839a38" aria-label="Task due date" type="date" value={v.lv?.taskDue ?? ""} onChange={v.lv?.setTaskDue} />
                      <button className="s-76c783" onClick={v.lv?.addTask} disabled={on(v.lv?.taskOff)} style={{ border: `1px solid ${v.lv?.taskB?.bd ?? ""}`, background: v.lv?.taskB?.bg, color: v.lv?.taskB?.fg, cursor: v.lv?.taskB?.cur, font: "inherit", fontSize: "13px", fontWeight: "600" }}>Add task</button>
                    </div>
                  </>)}
                </div>
              </div>
            </>)}
          </div>
        </>)}
        {on(v.lv?.tabTasks) && (<>
          <div className="s-f170d9">
            <div className="s-4cdd3e">
              <h2 className="s-fa1f03">Tasks</h2>
              <span className="s-3ec15a">{v.lv?.taskCount}</span>
            </div>
            <div className="s-987eb2">
              <div className="s-0fbd06">
                <div className="s-fb9d47">
                  <span>Task</span>
                  <span>Status</span>
                  <span>Assignee</span>
                  <span>Due date</span>
                  <span className="s-2140d3">Open task</span>
                </div>
                {list(v.lv?.taskRows).map((t, i0) => (<React.Fragment key={i0}>
                  <div className="s-5fbdad" style={{ background: t?.rowBg }}>
                    <div className="s-b0b5e0">
                      <button className="s-9a6f42" onClick={t?.open} aria-label={t?.openA} title="Open task details" style={{ color: t?.fg, textDecoration: t?.deco, font: "inherit", fontSize: "13.5px", fontWeight: "600", textAlign: "left", overflowWrap: "anywhere", cursor: "pointer" }}>{t?.name}</button>
                      {on(t?.hasChat) && (<>
                        <span className="s-263e02" title={t?.chatA}>
                          <svg aria-hidden="true" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"></path>
                          </svg>
                          {t?.chatN}
                        </span>
                      </>)}
                    </div>
                    <select className="s-5a0ae6" aria-label={t?.statusLabel} value={t?.status ?? ""} onChange={t?.setStatus} style={{ background: t?.statusBg, color: t?.statusFg, font: "inherit", fontSize: "12.5px", fontWeight: "600" }}>
                      {list(v.lv?.taskStatusOpts).map((o, i1) => (<React.Fragment key={i1}>
                        <option value={o?.v}>{o?.label}</option>
                      </React.Fragment>))}
                    </select>
                    <select className="s-f31bca" aria-label={t?.ownerLabel} value={t?.owner ?? ""} onChange={t?.setOwner}>
                      {list(v.lv?.taskOwnerOpts).map((o, i1) => (<React.Fragment key={i1}>
                        <option value={o?.v}>{o?.label}</option>
                      </React.Fragment>))}
                    </select>
                    <input className="s-d7571f" aria-label={t?.dueLabel} type="date" value={t?.due ?? ""} onChange={t?.setDue} />
                    <button className="s-bc2e52" onClick={t?.open} aria-label={t?.openA} title="Open task details">
                      <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 6l6 6-6 6"></path>
                      </svg>
                    </button>
                  </div>
                </React.Fragment>))}
                {on(v.lv?.noTasks) && (<>
                  <p className="s-215cb5">No tasks yet.</p>
                </>)}
              </div>
            </div>
            <div className="s-6675da">
              <input className="s-323711" aria-label="New task" type="text" value={v.lv?.taskTitle ?? ""} onChange={v.lv?.setTaskTitle} placeholder="Add a task" />
              <input className="s-839a38" aria-label="New task due date" type="date" value={v.lv?.taskDue ?? ""} onChange={v.lv?.setTaskDue} />
              <button className="s-76c783" onClick={v.lv?.addTask} disabled={on(v.lv?.taskOff)} style={{ border: `1px solid ${v.lv?.taskB?.bd ?? ""}`, background: v.lv?.taskB?.bg, color: v.lv?.taskB?.fg, cursor: v.lv?.taskB?.cur, font: "inherit", fontSize: "13px", fontWeight: "600" }}>Add task</button>
            </div>
          </div>
        </>)}
        {on(v.lv?.tabFiles) && (<>
          <div className="s-89dbb6">
            <div className="s-fc2763">
              <div className="s-73d6ec">
                <div>
                  <h2 className="s-fa1f03">
                    <button className="s-72c5bc" onClick={v.cl?.k9?.toggle} aria-expanded={v.cl?.k9?.exp}>
                      <svg className="s-0d7706" aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ transform: `rotate(${v.cl?.k9?.rot ?? ""})`, transition: "transform 0.15s" }}>
                        <path d="M9 6l6 6-6 6"></path>
                      </svg>
                      <span>Add a file or link</span>
                    </button>
                  </h2>
                  <p className="s-4a5e94">Proposals, SOWs, signed contracts, recordings, shared folders.</p>
                </div>
                <div className="s-d1f9fb" role="radiogroup" aria-label="What are you adding?">
                  <button className="s-518d5a" role="radio" aria-checked={v.lff?.linkOn} onClick={v.lff?.pickLink} style={{ background: v.lff?.linkBg, color: "#14112E", font: "inherit", fontSize: "13px", fontWeight: "600", cursor: "pointer" }}>Link</button>
                  <button className="s-518d5a" role="radio" aria-checked={v.lff?.fileOn} onClick={v.lff?.pickFile} style={{ background: v.lff?.fileBg, color: "#14112E", font: "inherit", fontSize: "13px", fontWeight: "600", cursor: "pointer" }}>File</button>
                </div>
              </div>
              {on(v.cl?.k9?.open) && (<>
                {on(v.lff?.isLink) && (<>
                  <div className="s-c492d1">
                    <div className="s-8129f1">
                      <label className="s-1afa54" htmlFor="f-url">URL</label>
                      <input className="s-21c180" id="f-url" type="url" value={v.lff?.url ?? ""} onChange={v.setFileUrl} placeholder="https://" />
                    </div>
                    <div className="s-8129f1">
                      <label className="s-1afa54" htmlFor="f-name">Name</label>
                      <input className="s-21c180" id="f-name" type="text" value={v.lff?.name ?? ""} onChange={v.setFileName} placeholder="e.g. Proposal in Prospero" />
                    </div>
                  </div>
                </>)}
                {on(v.lff?.isFile) && (<>
                  <div className="s-bc0172">
                    <label className="s-1afa54" htmlFor="f-file">File</label>
                    <input className="s-616ab6" id="f-file" type="file" onChange={v.setFilePick} />
                    <span className="s-0c84db">{v.lff?.fileNote}</span>
                  </div>
                </>)}
                <div className="s-4bda7e">
                  <div className="s-a07249">
                    <label className="s-1afa54" htmlFor="f-cat">Category</label>
                    <select className="s-1c9b9d" id="f-cat" value={v.lff?.category ?? ""} onChange={v.setFileCat}>
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
                  <button className="s-ddba00" onClick={v.lff?.save} disabled={on(v.lff?.off)} style={{ border: `1px solid ${v.lff?.b?.bd ?? ""}`, background: v.lff?.b?.bg, color: v.lff?.b?.fg, cursor: v.lff?.b?.cur, font: "inherit", fontSize: "13px", fontWeight: "600" }}>{v.lff?.cta}</button>
                </div>
              </>)}
            </div>
            <div className="s-f170d9">
              <div className="s-493b3a">
                <h2 className="s-fa1f03">
                  <button className="s-72c5bc" onClick={v.cl?.k10?.toggle} aria-expanded={v.cl?.k10?.exp}>
                    <svg className="s-0d7706" aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ transform: `rotate(${v.cl?.k10?.rot ?? ""})`, transition: "transform 0.15s" }}>
                      <path d="M9 6l6 6-6 6"></path>
                    </svg>
                    <span>Files and links</span>
                  </button>
                </h2>
                <span className="s-3ec15a">{v.lv?.fileCount}</span>
              </div>
              {on(v.cl?.k10?.open) && (<>
                {list(v.lv?.files).map((f, i0) => (<React.Fragment key={i0}>
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
                {on(v.lv?.filesEmpty) && (<>
                  <p className="s-d4f4e5">No files or links yet.</p>
                </>)}
              </>)}
            </div>
          </div>
        </>)}
        {on(v.lv?.tabLog) && (<>
          <div className="s-f170d9">
            <div className="s-4f08a0">
              <div>
                <h2 className="s-fa1f03">Change log</h2>
                <p className="s-b10591">{v.alog?.count}</p>
              </div>
              <div className="s-4b41f8">
                <label className="s-2140d3" htmlFor="lv-log-user">Person</label>
                <select className="s-05fe4e" id="lv-log-user" value={v.alog?.user ?? ""} onChange={v.alog?.setUser}>
                  {list(v.alog?.userOpts).map((o, i0) => (<React.Fragment key={i0}>
                    <option value={o?.v}>{o?.label}</option>
                  </React.Fragment>))}
                </select>
                <label className="s-2140d3" htmlFor="lv-log-range">Date</label>
                <select className="s-05fe4e" id="lv-log-range" value={v.alog?.range ?? ""} onChange={v.alog?.setRange}>
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
