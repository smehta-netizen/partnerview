// Generated from the PartnerView design-canvas prototype. Edit freely.
import React from 'react';
import { on, list } from '../runtime';


export default function SettingsScreen({ v }) {
  return (
    <>
      <section className="s-7356d2">
        <div className="s-4678e7">
          <h1 className="s-890aa1">Settings</h1>
        </div>
        <div className="s-192902" role="tablist" aria-label="Settings sections">
          {list(v.setv?.tabs).map((tb, i0) => (<React.Fragment key={i0}>
            <button className="s-f838f0" role="tab" aria-selected={tb?.sel} onClick={tb?.go} style={{ border: `1px solid ${tb?.bd ?? ""}`, background: tb?.bg, color: tb?.fg, font: "inherit", fontSize: "13px", fontWeight: "600", cursor: "pointer" }}>{tb?.label}</button>
          </React.Fragment>))}
        </div>
        {on(v.setv?.tabGeneral) && (<>
          <div className="s-7356d2">
            <div className="s-f170d9">
              <div className="s-94bfdd">
                <h2 className="s-fa1f03">
                  <button className="s-72c5bc" onClick={v.cl?.k43?.toggle} aria-expanded={v.cl?.k43?.exp}>
                    <svg className="s-0d7706" aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ transform: `rotate(${v.cl?.k43?.rot ?? ""})`, transition: "transform 0.15s" }}>
                      <path d="M9 6l6 6-6 6"></path>
                    </svg>
                    <span>Lead checklist</span>
                  </button>
                </h2>
                <p className="s-96d2c1">The questions an AE answers on every lead. A lead can become a deal once it has enough Yes answers.</p>
              </div>
              {on(v.cl?.k43?.open) && (<>
                {list(v.setv?.paths).map((p, i0) => (<React.Fragment key={i0}>
                  <div className="s-1f35cf">
                    <div className="s-dae405">
                      <div className="s-33f2a6">
                        <h3 className="s-91adb2">{p?.title}</h3>
                        {" "}
                        <span className="s-72d4cd">{p?.sub}</span>
                        {" "}
                      </div>
                      <div className="s-bc0172">
                        <label className="s-a6cf94" htmlFor={p?.minId}>Yes answers needed to create a deal</label>
                        <select className="s-839a38" id={p?.minId} value={p?.min ?? ""} onChange={p?.setMin} disabled={on(v.setv?.readOnly)}>
                          {list(p?.minOpts).map((o, i1) => (<React.Fragment key={i1}>
                            <option value={o?.v}>{o?.label}</option>
                          </React.Fragment>))}
                        </select>
                      </div>
                    </div>
                    {list(p?.items).map((it, i1) => (<React.Fragment key={i1}>
                      <div className="s-ca8dfa">
                        <span className="s-f73a68">{it?.n}</span>
                        <input className="s-d0cdcf" aria-label={it?.label} type="text" value={it?.text ?? ""} onChange={it?.set} disabled={on(v.setv?.readOnly)} />
                        {on(it?.canRemove) && (<>
                          <button className="s-bfb177" onClick={it?.remove} aria-label={it?.removeLabel}>×</button>
                        </>)}
                      </div>
                    </React.Fragment>))}
                    {on(p?.none) && (<>
                      <p className="s-62e046">No questions. Leads on this path can convert right away.</p>
                    </>)}
                    {on(v.setv?.canEdit) && (<>
                      <div className="s-1cdf88">
                        <input className="s-2a2cb3" aria-label={p?.newLabel} type="text" value={p?.newItem ?? ""} onChange={p?.setNew} placeholder="Add a question, e.g. Budget confirmed" />
                        <button className="s-76c783" onClick={p?.add} disabled={on(p?.addOff)} style={{ border: `1px solid ${p?.addB?.bd ?? ""}`, background: p?.addB?.bg, color: p?.addB?.fg, cursor: p?.addB?.cur, font: "inherit", fontSize: "13px", fontWeight: "600" }}>Add</button>
                      </div>
                    </>)}
                  </div>
                </React.Fragment>))}
              </>)}
            </div>
            <div className="s-3d71d5">
              <div>
                <h2 className="s-fa1f03">
                  <button className="s-72c5bc" onClick={v.cl?.k49?.toggle} aria-expanded={v.cl?.k49?.exp}>
                    <svg className="s-0d7706" aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ transform: `rotate(${v.cl?.k49?.rot ?? ""})`, transition: "transform 0.15s" }}>
                      <path d="M9 6l6 6-6 6"></path>
                    </svg>
                    <span>Path to close</span>
                  </button>
                </h2>
                <p className="s-96d2c1">The steps a deal must complete before it can be marked Closed Won. Changes apply to all open deals.</p>
              </div>
              {on(v.cl?.k49?.open) && (<>
                {list(v.setv?.pathRows).map((ps, i0) => (<React.Fragment key={i0}>
                  <div className="s-ca8dfa">
                    <span className="s-f2a19b">{ps?.n}</span>
                    <div className="s-599a2a">
                      <input className="s-0a38b7" aria-label={ps?.labelA} type="text" value={ps?.label ?? ""} onChange={ps?.set} disabled={on(v.setv?.readOnly)} />
                      <span className="s-08e452">
                        <strong className="s-21a1be" style={{ color: ps?.kindFg }}>{ps?.kind}</strong>
                        {" "}{"\u00b7 "}{ps?.how}
                      </span>
                    </div>
                    <button className="s-6cc37a" onClick={ps?.toggle} aria-pressed={ps?.on} aria-label={ps?.toggleA} disabled={on(v.setv?.readOnly)} style={{ background: ps?.onBg, color: ps?.onFg, font: "inherit", fontSize: "12px", fontWeight: "600", cursor: "pointer" }}>{ps?.onTxt}</button>
                    {on(ps?.canRemove) && (<>
                      <button className="s-bfb177" onClick={ps?.remove} aria-label={ps?.removeA}>×</button>
                    </>)}
                    {on(ps?.noRemove) && (<>
                      <span className="s-ccd718" aria-hidden="true"></span>
                    </>)}
                  </div>
                </React.Fragment>))}
                {on(v.setv?.canEdit) && (<>
                  <div className="s-1cdf88">
                    <input className="s-1ee8ab" aria-label="New path-to-close step" type="text" value={v.setv?.newPath ?? ""} onChange={v.setv?.setNewPath} placeholder="Add a step, e.g. Legal review complete" />
                    <button className="s-76c783" onClick={v.setv?.addPath} disabled={on(v.setv?.addPathOff)} style={{ border: `1px solid ${v.setv?.addPathB?.bd ?? ""}`, background: v.setv?.addPathB?.bg, color: v.setv?.addPathB?.fg, cursor: v.setv?.addPathB?.cur, font: "inherit", fontSize: "13px", fontWeight: "600" }}>Add</button>
                  </div>
                </>)}
              </>)}
            </div>
            <div className="s-3d71d5">
              <div>
                <h2 className="s-fa1f03">
                  <button className="s-72c5bc" onClick={v.cl?.k44?.toggle} aria-expanded={v.cl?.k44?.exp}>
                    <svg className="s-0d7706" aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ transform: `rotate(${v.cl?.k44?.rot ?? ""})`, transition: "transform 0.15s" }}>
                      <path d="M9 6l6 6-6 6"></path>
                    </svg>
                    <span>Expansion deals</span>
                  </button>
                </h2>
                <p className="s-96d2c1">How a deal counts as new business or an expansion. Expansion value on each company page adds up the expansion deals that were won.</p>
              </div>
              {on(v.cl?.k44?.open) && (<>
                <div className="s-620e22" role="radiogroup" aria-label="Expansion rule">
                  {list(v.setv?.expOpts).map((o, i0) => (<React.Fragment key={i0}>
                    <button className="s-bd677a" role="radio" aria-checked={o?.on} onClick={o?.pick} disabled={on(v.setv?.readOnly)} style={{ border: `1.5px solid ${o?.bd ?? ""}`, background: o?.bg, color: "#14112E", font: "inherit", textAlign: "left", cursor: "pointer" }}>
                      <span className="s-6591a1" aria-hidden="true" style={{ border: `2px solid ${o?.ring ?? ""}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <span className="s-f973aa" style={{ background: o?.dot }}></span>
                      </span>
                      <span>
                        <span className="s-ed43eb">{o?.title}</span>
                        <span className="s-14c720">{o?.sub}</span>
                      </span>
                    </button>
                  </React.Fragment>))}
                </div>
              </>)}
            </div>
            <div className="s-3d71d5">
              <div>
                <h2 className="s-fa1f03">
                  <button className="s-72c5bc" onClick={v.cl?.k45?.toggle} aria-expanded={v.cl?.k45?.exp}>
                    <svg className="s-0d7706" aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ transform: `rotate(${v.cl?.k45?.rot ?? ""})`, transition: "transform 0.15s" }}>
                      <path d="M9 6l6 6-6 6"></path>
                    </svg>
                    <span>Task statuses</span>
                  </button>
                </h2>
                <p className="s-96d2c1">The statuses people pick on project plan tasks. One status counts as done.</p>
              </div>
              {on(v.cl?.k45?.open) && (<>
                {list(v.setv?.statuses).map((st, i0) => (<React.Fragment key={i0}>
                  <div className="s-ca8dfa">
                    <span className="s-f2a19b">{st?.n}</span>
                    <input className="s-d0cdcf" aria-label={st?.labelA} type="text" value={st?.label ?? ""} onChange={st?.set} disabled={on(v.setv?.readOnly)} />
                    <button className="s-3f96d8" onClick={st?.makeDone} aria-pressed={st?.doneOn} disabled={on(v.setv?.readOnly)} style={{ background: st?.doneBg, color: st?.doneFg, font: "inherit", fontSize: "12px", fontWeight: "600", cursor: "pointer" }}>{st?.doneTxt}</button>
                    {on(st?.canRemove) && (<>
                      <button className="s-bfb177" onClick={st?.remove} aria-label="Remove status">×</button>
                    </>)}
                  </div>
                </React.Fragment>))}
                {on(v.setv?.canEdit) && (<>
                  <div className="s-1cdf88">
                    <input className="s-2a2cb3" aria-label="New status" type="text" value={v.setv?.newStatus ?? ""} onChange={v.setv?.setNewStatus} placeholder="Add a status, e.g. Waiting on customer" />
                    <button className="s-76c783" onClick={v.setv?.addStatus} disabled={on(v.setv?.addStatusOff)} style={{ border: `1px solid ${v.setv?.addStatusB?.bd ?? ""}`, background: v.setv?.addStatusB?.bg, color: v.setv?.addStatusB?.fg, cursor: v.setv?.addStatusB?.cur, font: "inherit", fontSize: "13px", fontWeight: "600" }}>Add</button>
                  </div>
                </>)}
              </>)}
            </div>
            <div className="s-c413ca">
              <div className="s-3ed7d3">
                <h2 className="s-fa1f03">
                  <button className="s-72c5bc" onClick={v.cl?.k46?.toggle} aria-expanded={v.cl?.k46?.exp}>
                    <svg className="s-0d7706" aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ transform: `rotate(${v.cl?.k46?.rot ?? ""})`, transition: "transform 0.15s" }}>
                      <path d="M9 6l6 6-6 6"></path>
                    </svg>
                    <span>Default estimated value</span>
                  </button>
                </h2>
                <p className="s-96d2c1">Used for a new deal when the AE hasn't entered an estimated value and there's no quote yet.</p>
              </div>
              {on(v.cl?.k46?.open) && (<>
                <div className="s-7cb312">
                  <label className="s-a6cf94" htmlFor="set-defval">Amount ($)</label>
                  <input className="s-d3198d" id="set-defval" type="text" inputMode="numeric" value={v.setv?.defaultValue ?? ""} onChange={v.setv?.setDefaultValue} disabled={on(v.setv?.readOnly)} />
                </div>
              </>)}
            </div>
            <div className="s-3d71d5">
              <div>
                <h2 className="s-fa1f03">
                  <button className="s-72c5bc" onClick={v.cl?.k50?.toggle} aria-expanded={v.cl?.k50?.exp}>
                    <svg className="s-0d7706" aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ transform: `rotate(${v.cl?.k50?.rot ?? ""})`, transition: "transform 0.15s" }}>
                      <path d="M9 6l6 6-6 6"></path>
                    </svg>
                    <span>Onboarding checklist</span>
                  </button>
                </h2>
                <p className="s-96d2c1">The first steps on every new project. Changes apply to projects created from now on. Existing projects keep their list.</p>
              </div>
              {on(v.cl?.k50?.open) && (<>
                {list(v.setv?.onbRows).map((ob, i0) => (<React.Fragment key={i0}>
                  <div className="s-cb8b4d" draggable={ob?.drag} onDragStart={ob?.dragStart} onDragOver={ob?.dragOver} onDrop={ob?.drop} onDragEnd={ob?.dragEnd} style={{ background: ob?.dropBg }}>
                    <span className="s-88a906" aria-hidden="true" title="Drag to reorder" style={{ cursor: ob?.grabCur, userSelect: "none" }}>⋮⋮</span>
                    <span className="s-f2a19b" aria-hidden="true">{ob?.n}</span>
                    <input className="s-ba0286" aria-label={ob?.label} type="text" value={ob?.text ?? ""} onChange={ob?.set} disabled={on(ob?.locked)} style={{ background: ob?.bg, color: "#14112E", font: "inherit", fontSize: "13.5px" }} />
                    {on(ob?.canMove) && (<>
                      <button className="s-359829" onClick={ob?.up} aria-label={ob?.upA} disabled={on(ob?.upOff)}>↑</button>
                      <button className="s-359829" onClick={ob?.down} aria-label={ob?.downA} disabled={on(ob?.downOff)}>↓</button>
                    </>)}
                    {on(ob?.canRemove) && (<>
                      <button className="s-bfb177" onClick={ob?.remove} aria-label={ob?.removeA}>×</button>
                    </>)}
                  </div>
                </React.Fragment>))}
                {on(v.setv?.canEdit) && (<>
                  <div className="s-e3baa2">
                    <input className="s-2a2cb3" aria-label="New onboarding checklist item" type="text" value={v.setv?.newOnb ?? ""} onChange={v.setv?.setNewOnb} placeholder="Add an item, e.g. Share the project plan" />
                    <button className="s-76c783" onClick={v.setv?.addOnb} disabled={on(v.setv?.addOnbOff)} style={{ border: `1px solid ${v.setv?.addOnbB?.bd ?? ""}`, background: v.setv?.addOnbB?.bg, color: v.setv?.addOnbB?.fg, cursor: v.setv?.addOnbB?.cur, font: "inherit", fontSize: "13px", fontWeight: "600" }}>Add</button>
                  </div>
                </>)}
              </>)}
            </div>
            {on(v.isAdmin) && (<>
              <div className="s-3d71d5">
                <div>
                  <h2 className="s-fa1f03">
                    <button className="s-72c5bc" onClick={v.cl?.k48?.toggle} aria-expanded={v.cl?.k48?.exp}>
                      <svg className="s-0d7706" aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ transform: `rotate(${v.cl?.k48?.rot ?? ""})`, transition: "transform 0.15s" }}>
                        <path d="M9 6l6 6-6 6"></path>
                      </svg>
                      <span>Deal task template</span>
                    </button>
                  </h2>
                  <p className="s-96d2c1">Tasks added to every new deal. Changes apply only to deals created from now on. Existing deals keep their tasks.</p>
                </div>
                {on(v.cl?.k48?.open) && (<>
                  <div className="s-987eb2">
                    <div className="s-014d2e">
                      <div className="s-7f8e08">
                        <span>Task</span>
                        <span>Due (days after creation)</span>
                        <span>Assignee</span>
                        <span></span>
                      </div>
                      {list(v.setv?.tplRows).map((tp, i0) => (<React.Fragment key={i0}>
                        <div className="s-8be541">
                          <input className="s-51dd65" aria-label={tp?.titleA} type="text" value={tp?.title ?? ""} onChange={tp?.setTitle} />
                          <input className="s-d3198d" aria-label={tp?.daysA} type="number" min="0" step="1" value={tp?.days ?? ""} onChange={tp?.setDays} placeholder="No due date" />
                          <select className="s-51dd65" aria-label={tp?.whoA} value={tp?.who ?? ""} onChange={tp?.setWho}>
                            <option value="">Unassigned</option>
                            <option value="owner">Deal owner (AE)</option>
                          </select>
                          <button className="s-70692b" onClick={tp?.remove} aria-label={tp?.removeA}>×</button>
                        </div>
                      </React.Fragment>))}
                      {on(v.setv?.tplEmpty) && (<>
                        <p className="s-62e046">No template tasks. New deals start with an empty task list.</p>
                      </>)}
                      <div className="s-b9b7b5">
                        <input className="s-7fd266" aria-label="New template task" type="text" value={v.setv?.newTpl ?? ""} onChange={v.setv?.setNewTpl} placeholder="Add a task, e.g. Send the welcome email" />
                        <button className="s-76c783" onClick={v.setv?.addTpl} disabled={on(v.setv?.addTplOff)} style={{ border: `1px solid ${v.setv?.addTplB?.bd ?? ""}`, background: v.setv?.addTplB?.bg, color: v.setv?.addTplB?.fg, cursor: v.setv?.addTplB?.cur, font: "inherit", fontSize: "13px", fontWeight: "600" }}>Add</button>
                      </div>
                    </div>
                  </div>
                </>)}
              </div>
            </>)}
          </div>
        </>)}
        {on(v.setv?.tabUsers) && (<>
          <div className="s-7356d2">
            <div className="s-f170d9">
              <div className="s-b638d8">
                <h2 className="s-fa1f03">Users</h2>
                <span className="s-3ec15a">{v.setv?.userCount}</span>
              </div>
              <div className="s-987eb2">
                <div className="s-e69a18">
                  <div className="s-a51797">
                    <span>Name</span>
                    <span>Email</span>
                    <span>Role</span>
                    <span>Status</span>
                    <span></span>
                  </div>
                  {list(v.setv?.userRows).map((u, i0) => (<React.Fragment key={i0}>
                    <div className="s-456cee">
                      <span className="s-5f88c0">{u?.name}</span>
                      <span className="s-765a8e">{u?.email}</span>
                      <select className="s-ffc0b1" aria-label={u?.roleA} value={u?.role ?? ""} onChange={u?.setRole} disabled={on(u?.roleOff)}>
                        {list(v.setv?.roleOpts).map((o, i1) => (<React.Fragment key={i1}>
                          <option value={o?.v}>{o?.label}</option>
                        </React.Fragment>))}
                      </select>
                      <span className="s-8f6112">
                        <span className="s-c0f0e0" style={{ background: u?.pillBg, color: u?.pillFg, fontSize: "12px", fontWeight: "600" }}>{u?.status}</span>
                        {on(u?.hasNote) && (<>
                          <span className="s-629d39">{u?.note}</span>
                        </>)}
                      </span>
                      <div className="s-a55309">
                        <button className="s-8597b3" onClick={u?.imp} aria-label={u?.impA} disabled={on(u?.impOff)} style={{ border: `1px solid ${u?.impB?.bd ?? ""}`, background: u?.impB?.bg, color: u?.impB?.fg, cursor: u?.impB?.cur, font: "inherit", fontSize: "12px", fontWeight: "600", whiteSpace: "nowrap" }}>Impersonate</button>
                        <button className="s-8597b3" onClick={u?.reset} aria-label={u?.resetA} disabled={on(u?.resetOff)} style={{ border: `1px solid ${u?.resetB?.bd ?? ""}`, background: u?.resetB?.bg, color: u?.resetB?.fg, cursor: u?.resetB?.cur, font: "inherit", fontSize: "12px", fontWeight: "600", whiteSpace: "nowrap" }}>{u?.resetTxt}</button>
                        <button className="s-8597b3" onClick={u?.act} aria-label={u?.actA} disabled={on(u?.actOff)} style={{ border: `1px solid ${u?.actB?.bd ?? ""}`, background: u?.actB?.bg, color: u?.actB?.fg, cursor: u?.actB?.cur, font: "inherit", fontSize: "12px", fontWeight: "600", whiteSpace: "nowrap" }}>{u?.actTxt}</button>
                      </div>
                    </div>
                  </React.Fragment>))}
                </div>
              </div>
              <div className="s-ed0d35">
                <h3 className="s-cd24ce">Invite a user</h3>
                <div className="s-3c2b6e">
                  <div className="s-78ad91">
                    <label className="s-a6cf94" htmlFor="inv-name">Full name</label>
                    <input className="s-51dd65" id="inv-name" type="text" value={v.setv?.inv?.name ?? ""} onChange={v.setv?.inv?.setName} placeholder="e.g. Priya Shah" />
                  </div>
                  <div className="s-bdff49">
                    <label className="s-a6cf94" htmlFor="inv-email">Work email</label>
                    <input className="s-51dd65" id="inv-email" type="email" value={v.setv?.inv?.email ?? ""} onChange={v.setv?.inv?.setEmail} placeholder="name@company.com" />
                  </div>
                  <div className="s-ecaa07">
                    <label className="s-a6cf94" htmlFor="inv-role">Role</label>
                    <select className="s-db8ed7" id="inv-role" value={v.setv?.inv?.role ?? ""} onChange={v.setv?.inv?.setRole}>
                      {list(v.setv?.roleOpts).map((o, i0) => (<React.Fragment key={i0}>
                        <option value={o?.v}>{o?.label}</option>
                      </React.Fragment>))}
                    </select>
                  </div>
                  <button className="s-5f2c97" onClick={v.setv?.inv?.send} disabled={on(v.setv?.inv?.off)} style={{ border: `1px solid ${v.setv?.inv?.b?.bd ?? ""}`, background: v.setv?.inv?.b?.bg, color: v.setv?.inv?.b?.fg, cursor: v.setv?.inv?.b?.cur, font: "inherit", fontSize: "13px", fontWeight: "600" }}>Send invite</button>
                </div>
                {on(v.setv?.inv?.hasErr) && (<>
                  <p className="s-9ac829">{v.setv?.inv?.err}</p>
                </>)}
              </div>
            </div>
            <div className="s-3d71d5">
              <div>
                <h2 className="s-fa1f03">Roles and menu access</h2>
                <p className="s-96d2c1">Choose which left-menu items each role sees.</p>
              </div>
              <div className="s-987eb2">
                <div style={{ minWidth: v.setv?.matrixMin }}>
                  <div className="s-9a39ca" style={{ gridTemplateColumns: v.setv?.gridCols, gap: "8px", alignItems: "center", paddingBottom: "8px", borderBottom: "1px solid #E4E1F0", fontSize: "12px", fontWeight: "600", color: "#5E5A78" }}>
                    <span>Menu item</span>
                    {list(v.setv?.roleCols).map((rc, i0) => (<React.Fragment key={i0}>
                      <span className="s-9c7729">
                        <span className="s-16abc3">{rc?.name}</span>
                        <span className="s-6cbf1e">{rc?.count}</span>
                        {on(rc?.canRemove) && (<>
                          <button className="s-3f80be" onClick={rc?.remove} aria-label={rc?.removeA}>×</button>
                        </>)}
                      </span>
                    </React.Fragment>))}
                  </div>
                  {list(v.setv?.menuRows).map((mr, i0) => (<React.Fragment key={i0}>
                    <div className="s-9a39ca" style={{ gridTemplateColumns: v.setv?.gridCols, gap: "8px", alignItems: "center", padding: "6px 0", borderBottom: "1px solid #F1EFF7" }}>
                      <span className="s-2660ec">{mr?.label}</span>
                      {list(mr?.cells).map((ce, i1) => (<React.Fragment key={i1}>
                        <button className="s-e4bac5" onClick={ce?.toggle} aria-pressed={ce?.on} aria-label={ce?.a} disabled={on(ce?.off)} style={{ border: `1px solid ${ce?.bd ?? ""}`, background: ce?.bg, color: ce?.fg, font: "inherit", fontSize: "12px", fontWeight: "600", cursor: ce?.cur }}>{ce?.txt}</button>
                      </React.Fragment>))}
                    </div>
                  </React.Fragment>))}
                </div>
              </div>
              <div className="s-b9b7b5">
                <input className="s-dd4017" aria-label="New role name" type="text" value={v.setv?.newRole ?? ""} onChange={v.setv?.setNewRole} placeholder="Add a role, e.g. Project manager" />
                <button className="s-76c783" onClick={v.setv?.addRole} disabled={on(v.setv?.addRoleOff)} style={{ border: `1px solid ${v.setv?.addRoleB?.bd ?? ""}`, background: v.setv?.addRoleB?.bg, color: v.setv?.addRoleB?.fg, cursor: v.setv?.addRoleB?.cur, font: "inherit", fontSize: "13px", fontWeight: "600" }}>Add role</button>
              </div>
            </div>
            <div className="s-65a6fa">
              <div>
                <h2 className="s-fa1f03">Roles and permissions</h2>
                <p className="s-96d2c1">Pick a role, then choose what it can view, create, edit and delete.</p>
              </div>
              <div className="s-192902" role="group" aria-label="Role">
                {list(v.setv?.permTabs).map((g, i0) => (<React.Fragment key={i0}>
                  <button className="s-8c1935" aria-pressed={g?.sel} onClick={g?.go} style={{ border: `1px solid ${g?.bd ?? ""}`, background: g?.bg, color: g?.fg, font: "inherit", fontSize: "13px", fontWeight: "600", cursor: "pointer" }}>{g?.label}</button>
                </React.Fragment>))}
              </div>
              <div className="s-987eb2">
                <div className="s-327517">
                  <div className="s-c8dfd0">
                    <span>Record</span>
                    <span>View</span>
                    <span>Create</span>
                    <span>Edit</span>
                    <span>Delete</span>
                  </div>
                  {list(v.setv?.crudRows).map((cr, i0) => (<React.Fragment key={i0}>
                    <div className="s-36c6ae">
                      <span className="s-a1e891">
                        <span className="s-2660ec">{cr?.label}</span>
                        {on(cr?.hasNote) && (<>
                          <span className="s-08e452">{cr?.note}</span>
                        </>)}
                      </span>
                      {list(cr?.cells).map((ce, i1) => (<React.Fragment key={i1}>
                        {on(ce?.na) && (<>
                          <span className="s-5ad863" aria-label={ce?.a}>—</span>
                        </>)}
                        {on(ce?.has) && (<>
                          <span className="s-ddce23">
                            <button className="s-e4bac5" onClick={ce?.toggle} aria-pressed={ce?.on} aria-label={ce?.a} disabled={on(ce?.off)} style={{ border: `1px solid ${ce?.bd ?? ""}`, background: ce?.bg, color: ce?.fg, font: "inherit", fontSize: "12px", fontWeight: "600", cursor: ce?.cur }}>{ce?.txt}</button>
                            {on(ce?.hasScope) && (<>
                              <select className="s-33cd92" aria-label={ce?.scopeA} value={ce?.scope ?? ""} onChange={ce?.setScope} disabled={on(ce?.scopeOff)}>
                                <option value="all">All records</option>
                                <option value="own">Assigned only</option>
                              </select>
                            </>)}
                          </span>
                        </>)}
                      </React.Fragment>))}
                    </div>
                  </React.Fragment>))}
                  {list(v.setv?.specGroups).map((sg, i0) => (<React.Fragment key={i0}>
                    <p className="s-c56c3d">{sg?.title}</p>
                    {list(sg?.rows).map((cr, i1) => (<React.Fragment key={i1}>
                      <div className="s-36c6ae">
                        <span className="s-2660ec">{cr?.label}</span>
                        {list(cr?.cells).map((ce, i2) => (<React.Fragment key={i2}>
                          <button className="s-e4bac5" onClick={ce?.toggle} aria-pressed={ce?.on} aria-label={ce?.a} disabled={on(ce?.off)} style={{ border: `1px solid ${ce?.bd ?? ""}`, background: ce?.bg, color: ce?.fg, font: "inherit", fontSize: "12px", fontWeight: "600", cursor: ce?.cur }}>{ce?.txt}</button>
                        </React.Fragment>))}
                      </div>
                    </React.Fragment>))}
                  </React.Fragment>))}
                </div>
              </div>
            </div>
          </div>
        </>)}
        {on(v.setv?.tabCatalog) && (<>
          <div className="s-7356d2">
            <div className="s-3d71d5">
              <div>
                <h2 className="s-fa1f03">Practices</h2>
                <p className="s-96d2c1">Each quote line belongs to a practice. Rename any time. A practice used on a deal or project can be deactivated but not deleted.</p>
              </div>
              {list(v.setv?.catPr).map((cp, i0) => (<React.Fragment key={i0}>
                <div className="s-4b41f8">
                  <input className="s-b8a2f7" aria-label={cp?.labelA} type="text" value={cp?.name ?? ""} onChange={cp?.rename} disabled={on(cp?.off)} />
                  <span className="s-3ce5c1" style={{ background: cp?.pillBg, color: cp?.pillFg }}>{cp?.status}</span>
                  <span className="s-205952">{cp?.used}</span>
                  <button className="s-6f4ac8" onClick={cp?.toggle} disabled={on(cp?.off)} aria-label={cp?.toggleA}>{cp?.toggleTxt}</button>
                  {on(cp?.canDelete) && (<>
                    <button className="s-70692b" onClick={cp?.del} aria-label={cp?.delA} title="Delete">×</button>
                  </>)}
                </div>
              </React.Fragment>))}
              {on(v.setv?.canEdit) && (<>
                <div className="s-b9b7b5">
                  <input className="s-7fd266" aria-label="Add a practice" type="text" value={v.setv?.newPr ?? ""} onChange={v.setv?.setNewPr} placeholder="Add a practice" />
                  <button className="s-76c783" onClick={v.setv?.addPr} disabled={on(v.setv?.addPrOff)} style={{ border: `1px solid ${v.setv?.addPrB?.bd ?? ""}`, background: v.setv?.addPrB?.bg, color: v.setv?.addPrB?.fg, cursor: v.setv?.addPrB?.cur, font: "inherit", fontSize: "13px", fontWeight: "600" }}>Add</button>
                </div>
              </>)}
            </div>
            <div className="s-3d71d5">
              <div>
                <h2 className="s-fa1f03">Service lines</h2>
                <p className="s-96d2c1">
                  The service line on each quote line. It drives how projects, revenue and forecast are mapped. Same rules: rename freely, deactivate when in use, delete only when unused.
                </p>
              </div>
              {list(v.setv?.catSv).map((cp, i0) => (<React.Fragment key={i0}>
                <div className="s-4b41f8">
                  <input className="s-b8a2f7" aria-label={cp?.labelA} type="text" value={cp?.name ?? ""} onChange={cp?.rename} disabled={on(cp?.off)} />
                  <span className="s-3ce5c1" style={{ background: cp?.pillBg, color: cp?.pillFg }}>{cp?.status}</span>
                  <span className="s-205952">{cp?.used}</span>
                  <button className="s-6f4ac8" onClick={cp?.toggle} disabled={on(cp?.off)} aria-label={cp?.toggleA}>{cp?.toggleTxt}</button>
                  {on(cp?.canDelete) && (<>
                    <button className="s-70692b" onClick={cp?.del} aria-label={cp?.delA} title="Delete">×</button>
                  </>)}
                </div>
              </React.Fragment>))}
              {on(v.setv?.canEdit) && (<>
                <div className="s-b9b7b5">
                  <input className="s-7fd266" aria-label="Add a service line" type="text" value={v.setv?.newSv ?? ""} onChange={v.setv?.setNewSv} placeholder="Add a service line" />
                  <button className="s-76c783" onClick={v.setv?.addSv} disabled={on(v.setv?.addSvOff)} style={{ border: `1px solid ${v.setv?.addSvB?.bd ?? ""}`, background: v.setv?.addSvB?.bg, color: v.setv?.addSvB?.fg, cursor: v.setv?.addSvB?.cur, font: "inherit", fontSize: "13px", fontWeight: "600" }}>Add</button>
                </div>
              </>)}
            </div>
            <div className="s-3d71d5">
              <div>
                <h2 className="s-fa1f03">
                  <button className="s-72c5bc" onClick={v.cl?.k47?.toggle} aria-expanded={v.cl?.k47?.exp}>
                    <svg className="s-0d7706" aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ transform: `rotate(${v.cl?.k47?.rot ?? ""})`, transition: "transform 0.15s" }}>
                      <path d="M9 6l6 6-6 6"></path>
                    </svg>
                    <span>Cost rates</span>
                  </button>
                </h2>
                <p className="s-96d2c1">Internal cost per hour for each line item role on quotes. It drives delivery cost and profit on deals and projects.</p>
              </div>
              {on(v.cl?.k47?.open) && (<>
                <div className="s-1de325">
                  <span>Role (line item)</span>
                  <span>Cost ($ / h)</span>
                  <span></span>
                </div>
                {list(v.setv?.costRows).map((cr, i0) => (<React.Fragment key={i0}>
                  <div className="s-e6757b">
                    <input className="s-d3198d" aria-label={cr?.roleA} type="text" value={cr?.role ?? ""} onChange={cr?.setRole} />
                    <input className="s-d3198d" aria-label={cr?.rateA} type="number" min="0" step="5" value={cr?.rate ?? ""} onChange={cr?.setRate} />
                    <button className="s-70692b" onClick={cr?.remove} aria-label={cr?.removeA}>×</button>
                  </div>
                </React.Fragment>))}
                <div className="s-d4f442">
                  <input className="s-8d5941" aria-label="New role" type="text" value={v.setv?.newCostRole ?? ""} onChange={v.setv?.setNewCostRole} placeholder="Add a role, e.g. Data engineer" />
                  <input className="s-8d5941" aria-label="Cost per hour for the new role" type="number" min="0" step="5" value={v.setv?.newCostRate ?? ""} onChange={v.setv?.setNewCostRate} placeholder={v.setv?.defaultCost} />
                  <button className="s-76c783" onClick={v.setv?.addCost} disabled={on(v.setv?.addCostOff)} style={{ border: `1px solid ${v.setv?.addCostB?.bd ?? ""}`, background: v.setv?.addCostB?.bg, color: v.setv?.addCostB?.fg, cursor: v.setv?.addCostB?.cur, font: "inherit", fontSize: "13px", fontWeight: "600" }}>Add</button>
                </div>
                <div className="s-f6e35f">
                  <label className="s-24c920" htmlFor="set-defcost">Cost for roles not listed above ($ / h)</label>
                  <input className="s-d7692f" id="set-defcost" type="number" min="0" step="5" value={v.setv?.defaultCost ?? ""} onChange={v.setv?.setDefaultCost} />
                </div>
              </>)}
            </div>
          </div>
        </>)}
      </section>
    </>
  );
}
