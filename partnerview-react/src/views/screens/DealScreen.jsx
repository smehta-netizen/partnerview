// Generated from the PartnerView design-canvas prototype. Edit freely.
import React from 'react';
import { on, list } from '../runtime';


export default function DealScreen({ v }) {
  return (
    <>
      <section className="s-e911df">
        <button className="s-849418" onClick={v.goDeals}>Back to deals</button>
        <div className="s-905b35">
          <div className="s-1631a8">
            <h1 className="s-8dd424">{v.dv?.company}{" \u00b7 "}{v.dv?.name}</h1>
            <span className="s-1e4be5" style={{ background: v.dv?.stagePill?.bg, color: v.dv?.stagePill?.fg }}>{v.dv?.stageLabel}</span>
            {on(v.dv?.strategic) && (<>
              <span className="s-c9d9d8">Strategic</span>
            </>)}
            {on(v.dv?.isExpansion) && (<>
              <span className="s-68bc38">Expansion</span>
            </>)}
          </div>
          <span className="s-963192">{v.dv?.code}</span>
        </div>
        <div className="s-d08feb">
          <div className="s-4b41f8">
            <ol className="s-697af1" aria-label="Deal stage">
              {list(v.dv?.stages).map((st, i0) => (<React.Fragment key={i0}>
                <li className="s-dd8d4b">
                  <button className="s-e6fe9d" onClick={st?.go} aria-current={st?.current} style={{ border: `1px solid ${st?.bd ?? ""}`, background: st?.bg, color: st?.fg, font: "inherit", fontWeight: "600", fontSize: "13px", textAlign: "left", cursor: st?.cur }}>{st?.label}</button>
                </li>
              </React.Fragment>))}
            </ol>
            <div className="s-15d625">
              {on(v.dv?.showClose) && (<>
                <button className="s-ba6aaf" onClick={v.dv?.openLost}>Mark Closed Lost</button>
                <button className="s-4dbc84" onClick={v.dv?.openClose} disabled={on(v.dv?.closeOff)} style={{ border: `1px solid ${v.dv?.closeB?.bd ?? ""}`, background: v.dv?.closeB?.bg, color: v.dv?.closeB?.fg, cursor: v.dv?.closeB?.cur, font: "inherit", fontWeight: "600" }}>Mark Closed Won</button>
              </>)}
              {on(v.dv?.canReopen) && (<>
                <button className="s-df395a" onClick={v.dv?.reopen}>Reopen deal</button>
              </>)}
              {on(v.dv?.showCreate) && (<>
                <button className="s-00493c" onClick={v.dv?.create}>Create project</button>
              </>)}
              {on(v.dv?.showOpenProject) && (<>
                <button className="s-df395a" onClick={v.dv?.openProject}>Open project</button>
              </>)}
            </div>
          </div>
          <div className="s-773835">
            <span className="s-78398b">{v.dv?.stageHint}</span>
            {on(v.dv?.showClose) && (<>
              <span className="s-78398b">{v.dv?.closeNote}</span>
            </>)}
            {on(v.dv?.isLost) && (<>
              <span className="s-877b85">{v.dv?.lostText}</span>
            </>)}
            {on(v.dv?.showCreate) && (<>
              <span className="s-eb6e82">{"Closed Won \u00b7 "}{v.dv?.closeReason}{" \u00b7 "}{v.dv?.closeAmount}</span>
            </>)}
            {on(v.dv?.showOpenProject) && (<>
              <span className="s-eb6e82">Closed Won · project created</span>
            </>)}
          </div>
        </div>
        <div className="s-e47a58">
          <div className="s-03c5dd" role="tablist" aria-label="Deal sections">
            {list(v.dv?.tabs).map((tb, i0) => (<React.Fragment key={i0}>
              <button className="s-176c4f" role="tab" aria-selected={tb?.selected} onClick={tb?.go} style={{ borderBottom: `2px solid ${tb?.bd ?? ""}`, background: "transparent", color: tb?.fg, font: "inherit", fontWeight: tb?.fw, cursor: "pointer" }}>{tb?.label}</button>
            </React.Fragment>))}
          </div>
          <div className="s-c0913e">
            <button className="s-cf516c" onClick={v.dv?.openChat} aria-label={v.dv?.chatA} title={v.dv?.chatA} style={{ border: `1px solid ${v.dv?.chatBd ?? ""}`, background: v.dv?.chatBg, color: v.dv?.chatFg, font: "inherit", fontSize: "12.5px", fontWeight: "600", cursor: "pointer" }}>
              <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"></path>
              </svg>
              <span>Chatter</span>
              <span className="s-42d1ef">{v.dv?.chatN}</span>
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
          <div className="s-7abffb">
            {on(v.dv?.tabOverview) && (<>
              <div className="s-89dbb6">
                <div className="s-f170d9">
                  <div className="s-e47a5c">
                    <div className="s-33f2a6">
                      <h2 className="s-fa1f03">
                        <button className="s-9797cf" onClick={v.secs?.summary?.toggle} aria-expanded={v.secs?.summary?.exp}>
                          <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: `rotate(${v.secs?.summary?.rot ?? ""})`, transition: "transform 0.15s" }}>
                            <path d="M9 6l6 6-6 6"></path>
                          </svg>
                          Deal summary
                        </button>
                      </h2>
                      <p className="s-96d2c1">{v.dv?.nextLine}</p>
                    </div>
                  </div>
                  {on(v.secs?.summary?.open) && (<>
                    <div className="s-7e0ee8">
                      {list(v.dv?.kpisA).map((k, i0) => (<React.Fragment key={i0}>
                        <div className="s-42c5ec">
                          <span className="s-a6cf94">{k?.label}</span>
                          <span className="s-f20400">{k?.value}</span>
                          <span className="s-344495" style={{ color: k?.noteFg }}>{k?.note}</span>
                        </div>
                      </React.Fragment>))}
                      {list(v.dv?.kpisB).map((k, i0) => (<React.Fragment key={i0}>
                        <div className="s-42c5ec">
                          <span className="s-a6cf94">{k?.label}</span>
                          <span className="s-f20400">{k?.value}</span>
                          <span className="s-344495" style={{ color: k?.noteFg }}>{k?.note}</span>
                        </div>
                      </React.Fragment>))}
                    </div>
                    <div className="s-be2a51">
                      <div className="s-08375e">
                        <div className="s-a7ef38">
                          <h3 className="s-a6df23">Needs attention</h3>
                          <span className="s-72d4cd">{v.dv?.attnCount}</span>
                        </div>
                        {list(v.dv?.attn).map((a, i0) => (<React.Fragment key={i0}>
                          <div className="s-397990">
                            <span className="s-436050" style={{ background: a?.pill?.bg, color: a?.pill?.fg }}>{a?.sev}</span>
                            <div className="s-4ad4e4">
                              <div className="s-ed872b">{a?.title}</div>
                              <div className="s-1afa54">{a?.detail}</div>
                            </div>
                            {on(a?.isBtn) && (<>
                              <button className="s-a8b099" onClick={a?.act}>{a?.cta}</button>
                            </>)}
                            {on(a?.isLink) && (<>
                              <a className="s-b61d4b" href={a?.href} onClick={a?.go}>{a?.cta}</a>
                            </>)}
                          </div>
                        </React.Fragment>))}
                        {on(v.dv?.attnEmpty) && (<>
                          <p className="s-6f3d1b">Nothing needs attention. Keep the next step current.</p>
                        </>)}
                      </div>
                      <div className="s-687b79" id="deal-basics">
                        <h3 className="s-a6df23">Deal basics</h3>
                        <div className="s-bc0172">
                          <label className="s-1afa54" htmlFor={v.dv?.nextId}>Next step</label>
                          <input className="s-21c180" id={v.dv?.nextId} type="text" value={v.dv?.nextStep ?? ""} onChange={v.dv?.setNext} placeholder="What happens next, and when?" />
                        </div>
                        <div className="s-c4dfd3">
                          <div className="s-8129f1">
                            <label className="s-1afa54" htmlFor={v.dv?.closeId}>Expected close</label>
                            <input className="s-439402" id={v.dv?.closeId} type="date" value={v.dv?.expectedClose ?? ""} onChange={v.dv?.setClose} />
                          </div>
                          <div className="s-8129f1">
                            <label className="s-1afa54" htmlFor={v.dv?.forecastId}>Estimated value ($)</label>
                            <input className="s-829100" id={v.dv?.forecastId} type="text" value={v.dv?.forecast ?? ""} onChange={v.dv?.setForecast} placeholder="0" />
                          </div>
                          <div className="s-8129f1">
                            <label className="s-1afa54" htmlFor={v.dv?.typeId}>Deal type</label>
                            <select className="s-ee072d" id={v.dv?.typeId} value={v.dv?.dtype ?? ""} onChange={v.dv?.setType} disabled={on(v.dv?.typeAuto)} title={v.dv?.typeNote} style={{ background: v.dv?.typeBg, color: "#14112E", font: "inherit", fontSize: "13px" }}>
                              <option value="new">New business</option>
                              <option value="exp">Expansion</option>
                            </select>
                          </div>
                        </div>
                        <span className="s-629d39">{v.dv?.typeNote}</span>
                        <div className="s-c4dfd3">
                          <div className="s-8129f1">
                            <label className="s-1afa54" htmlFor={v.dv?.fcatId}>Forecast category</label>
                            <select className="s-ee072d" id={v.dv?.fcatId} value={v.dv?.fcat ?? ""} onChange={v.dv?.setFcat} disabled={on(v.dv?.fcOff)} style={{ background: v.dv?.fcBg, color: "#14112E", font: "inherit", fontSize: "13px" }}>
                              {list(v.dv?.fcatOpts).map((o, i0) => (<React.Fragment key={i0}>
                                <option value={o?.v}>{o?.label}</option>
                              </React.Fragment>))}
                            </select>
                          </div>
                          <div className="s-8129f1">
                            <label className="s-1afa54" htmlFor={v.dv?.probId}>Probability (%)</label>
                            <input className="s-f9d4b3" id={v.dv?.probId} type="number" min="0" max="100" step="5" value={v.dv?.prob ?? ""} onChange={v.dv?.setProb} disabled={on(v.dv?.fcOff)} placeholder="\u2014" style={{ background: v.dv?.fcBg, color: "#14112E", fontVariantNumeric: "tabular-nums", fontSize: "13px" }} />
                          </div>
                        </div>
                        <span className="s-629d39">{v.dv?.fcNote}</span>
                      </div>
                    </div>
                    <div style={{ padding: v.secs?.mix?.pad, borderTop: "1px solid #EEECF5", display: "flex", flexDirection: "column", gap: "14px" }}>
                      <div className="s-8fd27d">
                        <h3 className="s-a6df23">
                          <button className="s-9797cf" onClick={v.secs?.mix?.toggle} aria-expanded={v.secs?.mix?.exp}>
                            <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: `rotate(${v.secs?.mix?.rot ?? ""})`, transition: "transform 0.15s" }}>
                              <path d="M9 6l6 6-6 6"></path>
                            </svg>
                            What we're selling
                          </button>
                        </h3>
                        <span className="s-72d4cd">{v.dv?.mix?.sub}</span>
                      </div>
                      {on(v.secs?.mix?.open) && (<>
                        {on(v.dv?.mix?.has) && (<>
                          <div className="s-c27c5e">
                            <span className="s-074b92">
                              <span className="s-ec2d63">Services</span>
                              <span className="s-5db75d">{v.dv?.mix?.svcText}</span>
                              <span className="s-72d4cd">{v.dv?.mix?.svcShare}</span>
                            </span>
                            <span className="s-074b92">
                              <span className="s-ec2d63">Licenses</span>
                              <span className="s-5db75d">{v.dv?.mix?.licText}</span>
                              <span className="s-72d4cd">{v.dv?.mix?.licShare}</span>
                            </span>
                          </div>
                          <div className="s-987eb2">
                            <div className="s-327517">
                              <div className="s-129036">
                                <span>Item</span>
                                <span>Quantity</span>
                                <span>Billed rate</span>
                                <span className="s-30489c">Discount</span>
                                <span className="s-30489c">Amount</span>
                              </div>
                              {list(v.dv?.mix?.lines).map((l, i0) => (<React.Fragment key={i0}>
                                <div className="s-8aba58">
                                  <span className="s-9b92d2">
                                    <span className="s-d51d46" aria-hidden="true" style={{ background: l?.color }}></span>
                                    <span className="s-33f2a6">
                                      <span className="s-14f60b">{l?.k}</span>
                                      <span className="s-9cb095">{l?.kind}</span>
                                    </span>
                                  </span>
                                  <span className="s-8c837d">{l?.qtyText}</span>
                                  <span className="s-8c837d">{l?.rateText}</span>
                                  <span className="s-647d9c" style={{ color: l?.discFg }}>{l?.discText}</span>
                                  <span className="s-952a6d">{l?.v}</span>
                                </div>
                              </React.Fragment>))}
                              {list(v.dv?.mix?.foot).map((f, i0) => (<React.Fragment key={i0}>
                                <div className="s-de6eb5" style={{ fontSize: f?.size }}>
                                  <span style={{ color: f?.fg, fontWeight: f?.fw }}>{f?.k}</span>
                                  <span className="s-42d1ef" style={{ color: f?.fg, fontWeight: f?.fw, whiteSpace: "nowrap" }}>{f?.v}</span>
                                </div>
                              </React.Fragment>))}
                            </div>
                          </div>
                          {on(v.dv?.mix?.showProfit) && (<>
                            <div className="s-2efdd0">
                              {list(v.dv?.mix?.tiles).map((t, i0) => (<React.Fragment key={i0}>
                                <div className="s-c852d3" style={{ background: t?.bg, display: "flex", flexDirection: "column", gap: "2px" }}>
                                  <span className="s-c77fbd">{t?.k}</span>
                                  <span className="s-7b96b3" style={{ color: t?.fg }}>{t?.v}</span>
                                  <span className="s-629d39">{t?.note}</span>
                                </div>
                              </React.Fragment>))}
                            </div>
                          </>)}
                        </>)}
                        {on(v.dv?.mix?.none) && (<>
                          <p className="s-62e046">{v.dv?.mix?.noneText}</p>
                        </>)}
                      </>)}
                    </div>
                  </>)}
                </div>
                <div className="s-f170d9">
                  <div className="s-9573a2">
                    <div className="s-33f2a6">
                      <h2 className="s-fa1f03">
                        <button className="s-9797cf" onClick={v.secs?.buying?.toggle} aria-expanded={v.secs?.buying?.exp}>
                          <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: `rotate(${v.secs?.buying?.rot ?? ""})`, transition: "transform 0.15s" }}>
                            <path d="M9 6l6 6-6 6"></path>
                          </svg>
                          Customer team
                        </button>
                      </h2>
                      <p className="s-96d2c1">{v.dv?.buyingNote}</p>
                    </div>
                    <button className="s-0e3a93" onClick={v.dv?.addContact}>+ Add contact</button>
                  </div>
                  {on(v.secs?.buying?.open) && (<>
                    <div className="s-987eb2">
                      <div className="s-839d5d">
                        <div className="s-e372a7">
                          <span>Name</span>
                          <span>Role in the deal</span>
                          <span>Email</span>
                          <span>Phone</span>
                          <span></span>
                        </div>
                        {list(v.dv?.contacts).map((c, i0) => (<React.Fragment key={i0}>
                          <div className="s-50110c">
                            <span className="s-a96149">{c?.name}</span>
                            <span className="s-07253a">
                              {list(c?.chips).map((ch, i1) => (<React.Fragment key={i1}>
                                <span className="s-8e07de" style={{ background: ch?.bg, color: ch?.fg }}>{ch?.label}</span>
                              </React.Fragment>))}
                              {on(c?.noChips) && (<>
                                <span className="s-1afa54">Not set</span>
                              </>)}
                            </span>
                            <span className="s-dd34d4">{c?.email}</span>
                            <span className="s-7fe044">{c?.phone}</span>
                            <button className="s-766d98" onClick={c?.open} aria-label={`Open ${c?.name ?? ""}`}>Open</button>
                          </div>
                        </React.Fragment>))}
                      </div>
                    </div>
                  </>)}
                </div>
                <div className="s-226423" style={{ padding: `18px 20px ${v.secs?.path?.pb ?? ""}` }}>
                  <div className="s-fa40fc">
                    <h2 className="s-fa1f03">
                      <button className="s-9797cf" onClick={v.secs?.path?.toggle} aria-expanded={v.secs?.path?.exp}>
                        <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: `rotate(${v.secs?.path?.rot ?? ""})`, transition: "transform 0.15s" }}>
                          <path d="M9 6l6 6-6 6"></path>
                        </svg>
                        Path to close
                      </button>
                    </h2>
                    <span className="s-3ec15a">{v.dv?.doneText}</span>
                  </div>
                  {on(v.secs?.path?.open) && (<>
                    {list(v.dv?.steps).map((sp, i0) => (<React.Fragment key={i0}>
                      <div className="s-1d8cf7">
                        <span className="s-3d2dc0" aria-hidden="true" style={{ border: `1px solid ${sp?.cBd ?? ""}`, background: sp?.cBg, color: sp?.cFg, display: "flex", alignItems: "center", justifyContent: "center", fontVariantNumeric: "tabular-nums", fontSize: "13px", fontWeight: "600" }}>{sp?.mark}</span>
                        <div className="s-4ad4e4">
                          <div className="s-1c9385">{sp?.title}</div>
                          <div className="s-1c20f5">{sp?.detail}</div>
                        </div>
                        {on(sp?.showCta) && (<>
                          <div className="s-d10d6e">
                            <button className="s-8f66bf" onClick={sp?.act} disabled={on(sp?.disabled)} style={{ border: `1px solid ${sp?.b?.bd ?? ""}`, background: sp?.b?.bg, color: sp?.b?.fg, cursor: sp?.b?.cur, font: "inherit", fontSize: "13px", fontWeight: "600", whiteSpace: "nowrap" }}>{sp?.cta}</button>
                            <span className="s-629d39">{sp?.why}</span>
                          </div>
                        </>)}
                        {on(sp?.done) && (<>
                          <span className="s-7571f6">Done</span>
                        </>)}
                      </div>
                    </React.Fragment>))}
                  </>)}
                </div>
                <div className="s-f170d9" id="meddpicc">
                  <div className="s-9573a2">
                    <div className="s-33f2a6">
                      <h2 className="s-fa1f03">
                        <button className="s-9797cf" onClick={v.secs?.med?.toggle} aria-expanded={v.secs?.med?.exp}>
                          <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: `rotate(${v.secs?.med?.rot ?? ""})`, transition: "transform 0.15s" }}>
                            <path d="M9 6l6 6-6 6"></path>
                          </svg>
                          MEDDPICC
                        </button>
                      </h2>
                      <p className="s-96d2c1">{v.dv?.medSummary}</p>
                    </div>
                    <div className="s-920069">
                      <div className="s-24e706" role="img" aria-label={v.dv?.medPctLabel}>
                        <div className="s-2f623b" style={{ width: v.dv?.medPct, background: v.accent, borderRadius: "999px" }}></div>
                      </div>
                      <span className="s-90677c">{v.dv?.medTotalText}</span>
                    </div>
                  </div>
                  {on(v.secs?.med?.open) && (<>
                    {list(v.dv?.medRows).map((r, i0) => (<React.Fragment key={i0}>
                      <div className="s-441dea" id={r?.anchor} style={{ background: r?.rowBg }}>
                        <div className="s-eb179e">
                          <button className="s-c2d6cb" onClick={r?.toggle} aria-expanded={r?.exp}>
                            <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6F6B89" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ transform: `rotate(${r?.rot ?? ""})`, transition: "transform 0.15s" }}>
                              <path d="M9 6l6 6-6 6"></path>
                            </svg>
                            <span className="s-ec4fcd" aria-hidden="true">{r?.letter}</span>
                            <span className="s-ed2cbf">{r?.title}</span>
                            <span className="s-61031d" style={{ color: r?.sumFg, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{r?.summary}</span>
                          </button>
                          <div className="s-e9f721">
                            {on(r?.scored) && (<>
                              <div className="s-c40d12" role="group" aria-label={`${r?.title ?? ""} score`}>
                                {list(r?.dots).map((dt, i1) => (<React.Fragment key={i1}>
                                  <button className="s-aee590" onClick={dt?.pick} aria-label={dt?.label} title={dt?.label} aria-pressed={dt?.on}>
                                    <span className="s-a9438b" aria-hidden="true" style={{ background: dt?.bg }}></span>
                                  </button>
                                </React.Fragment>))}
                              </div>
                              <span className="s-4739c2">{r?.scoreText}</span>
                            </>)}
                          </div>
                        </div>
                        {on(r?.open) && (<>
                          <div className="s-5f8f56">
                            {on(r?.hasPick) && (<>
                              <div className="s-2bf69b">
                                {list(r?.pick).map((p, i1) => (<React.Fragment key={i1}>
                                  <button className="s-c60d2a" onClick={p?.toggle} aria-pressed={p?.on} style={{ border: `1px solid ${p?.bd ?? ""}`, background: p?.bg, color: p?.fg, font: "inherit", fontSize: "12.5px", fontWeight: "600", cursor: "pointer" }}>{p?.label}</button>
                                </React.Fragment>))}
                                <button className="s-4b5d46" onClick={r?.newContact}>+ New contact</button>
                              </div>
                            </>)}
                            {on(r?.isList) && (<>
                              <div className="s-d08feb">
                                {list(r?.items).map((it, i1) => (<React.Fragment key={i1}>
                                  <div className="s-ca8dfa">
                                    <span className="s-cdaecb" aria-hidden="true">{it?.tag}</span>
                                    <input className="s-aee1a1" aria-label={it?.label} type="text" list={r?.dlId} value={it?.text ?? ""} onChange={it?.set} placeholder={r?.itemPh} />
                                    <button className="s-e20f3c" onClick={it?.remove} aria-label={it?.removeLabel}>×</button>
                                  </div>
                                </React.Fragment>))}
                                {on(r?.noItems) && (<>
                                  <p className="s-47e7b0">{r?.emptyText}</p>
                                </>)}
                                <button className="s-ed1cd4" onClick={r?.addItem}>{r?.addLabel}</button>
                                {on(r?.hasDl) && (<>
                                  <datalist id={r?.dlId}>
                                    {list(r?.dlOptions).map((o, i1) => (<React.Fragment key={i1}>
                                      {" "}
                                      <option value={o?.v}></option>
                                      {" "}
                                    </React.Fragment>))}
                                  </datalist>
                                </>)}
                              </div>
                            </>)}
                            {on(r?.isNote) && (<>
                              <label className="s-14ff23" htmlFor={r?.noteId}>{r?.title}{" notes"}</label>
                              <textarea className="s-cb3015" id={r?.noteId} value={r?.note ?? ""} onChange={r?.setNote} rows="3" placeholder={r?.ph} />
                            </>)}
                            {on(r?.isBudget) && (<>
                              <label className="s-14ff23" htmlFor={r?.inputId}>Customer budget</label>
                              <input className="s-a6394d" id={r?.inputId} type="text" value={r?.budget ?? ""} onChange={r?.setBudget} placeholder="e.g. $20,000 approved for this year" />
                            </>)}
                            {on(r?.isCrit) && (<>
                              <div className="s-420799">
                                <div className="s-8129f1">
                                  <label className="s-a6cf94" htmlFor={r?.dateId}>Date</label>
                                  <input className="s-15ab9a" id={r?.dateId} type="date" value={r?.critDate ?? ""} onChange={r?.setCritDate} />
                                </div>
                                <div className="s-8129f1">
                                  <label className="s-a6cf94" htmlFor={r?.labelId}>What happens then</label>
                                  <input className="s-15ab9a" id={r?.labelId} type="text" value={r?.critLabel ?? ""} onChange={r?.setCritLabel} placeholder="e.g. Go-live" />
                                </div>
                              </div>
                            </>)}
                            {on(r?.hasHint) && (<>
                              <span className="s-0c84db">{r?.hint}</span>
                            </>)}
                          </div>
                        </>)}
                      </div>
                    </React.Fragment>))}
                  </>)}
                </div>
              </div>
            </>)}
            {on(v.dv?.tabLog) && (<>
              <div className="s-f170d9">
                <div className="s-4f08a0">
                  <div>
                    <h2 className="s-fa1f03">Change log</h2>
                    <p className="s-b10591">{v.alog?.count}</p>
                  </div>
                  <div className="s-4b41f8">
                    <label className="s-2140d3" htmlFor="dv-log-user">Person</label>
                    <select className="s-05fe4e" id="dv-log-user" value={v.alog?.user ?? ""} onChange={v.alog?.setUser}>
                      {list(v.alog?.userOpts).map((o, i0) => (<React.Fragment key={i0}>
                        <option value={o?.v}>{o?.label}</option>
                      </React.Fragment>))}
                    </select>
                    <label className="s-2140d3" htmlFor="dv-log-range">Date</label>
                    <select className="s-05fe4e" id="dv-log-range" value={v.alog?.range ?? ""} onChange={v.alog?.setRange}>
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
            {on(v.dv?.tabDrd) && (<>
              <div className="s-c25b9c">
                <div className="s-73d6ec">
                  <div>
                    <h2 className="s-fa1f03">
                      <button className="s-72c5bc" onClick={v.cl?.k6?.toggle} aria-expanded={v.cl?.k6?.exp}>
                        <svg className="s-0d7706" aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ transform: `rotate(${v.cl?.k6?.rot ?? ""})`, transition: "transform 0.15s" }}>
                          <path d="M9 6l6 6-6 6"></path>
                        </svg>
                        <span>Detailed requirements</span>
                      </button>
                    </h2>
                    <p className="s-4a5e94">Owned by the AE. Only approved items move to the project.</p>
                  </div>
                  <button className="s-8f66bf" onClick={v.dv?.approveAll} disabled={on(v.dv?.approveAllOff)} style={{ border: `1px solid ${v.dv?.approveB?.bd ?? ""}`, background: v.dv?.approveB?.bg, color: v.dv?.approveB?.fg, cursor: v.dv?.approveB?.cur, font: "inherit", fontSize: "13px", fontWeight: "600" }}>Approve all</button>
                </div>
                {on(v.cl?.k6?.open) && (<>
                  <div className="s-987eb2">
                    <div className="s-0fbd06">
                      <div className="s-3627d6">
                        <span>OK</span>
                        <span>Requirement</span>
                        <span>Pain point</span>
                        <span>Champion</span>
                        <span>Economic buyer</span>
                        <span>Status</span>
                      </div>
                      {list(v.dv?.drd).map((r, i0) => (<React.Fragment key={i0}>
                        <div className="s-0c74e8">
                          <span>
                            <input className="s-807da2" type="checkbox" id={r?.id} aria-label={r?.approveA} checked={on(r?.ok)} disabled={on(r?.locked)} onChange={r?.toggle} />
                          </span>
                          <span className="s-9b92d2">
                            <button className="s-5125b8" onClick={r?.open} aria-label={r?.openA}>{r?.req}</button>
                            {on(r?.hasChat) && (<>
                              <span className="s-3435a3" title={r?.chatA}>
                                <svg aria-hidden="true" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                                </svg>
                                {r?.chatN}
                              </span>
                            </>)}
                          </span>
                          <span className="s-ec2d63">{r?.pain}</span>
                          <span className="s-ec2d63">{r?.champ}</span>
                          <span className="s-ec2d63">{r?.eb}</span>
                          <span>
                            <span className="s-1e4be5" style={{ background: r?.pill?.bg, color: r?.pill?.fg }}>{r?.status}</span>
                          </span>
                        </div>
                      </React.Fragment>))}
                    </div>
                  </div>
                </>)}
              </div>
            </>)}
            {on(v.dv?.tabTasks) && (<>
              <div className="s-89dbb6">
                <div className="s-b76d9e">
                  <div className="s-d8b471">
                    <div>
                      <h2 className="s-fa1f03">Tasks and activity</h2>
                      {" "}
                      <span className="s-3ec15a">{v.dv?.dt?.taskCount}{" \u00b7 "}{v.dv?.actCount}</span>
                      {" "}
                    </div>
                    <div className="s-6b30ef">
                      <span className="s-49344d">Add</span>
                      <div className="s-aa1ad0" role="group" aria-label="Add a task or an activity">
                        {list(v.dv?.dt?.kindSeg).map((g, i0) => (<React.Fragment key={i0}>
                          <button className="s-0596d6" aria-pressed={g?.sel} onClick={g?.go} style={{ background: g?.bg, color: g?.fg, font: "inherit", fontSize: "13px", fontWeight: "600", cursor: "pointer" }}>{g?.label}</button>
                        </React.Fragment>))}
                      </div>
                    </div>
                  </div>
                  <div className="s-fc3b61">
                    {on(v.dv?.dt?.addIsTask) && (<>
                      <div className="s-ee1926">
                        <input className="s-323711" aria-label="New task" type="text" value={v.dv?.dt?.taskTitle ?? ""} onChange={v.dv?.dt?.setTaskTitle} placeholder="Add a task" />
                        <input className="s-839a38" aria-label="New task due date" type="date" value={v.dv?.dt?.taskDue ?? ""} onChange={v.dv?.dt?.setTaskDue} />
                        <button className="s-76c783" onClick={v.dv?.dt?.addTask} disabled={on(v.dv?.dt?.taskOff)} style={{ border: `1px solid ${v.dv?.dt?.taskB?.bd ?? ""}`, background: v.dv?.dt?.taskB?.bg, color: v.dv?.dt?.taskB?.fg, cursor: v.dv?.dt?.taskB?.cur, font: "inherit", fontSize: "13px", fontWeight: "600" }}>Add task</button>
                      </div>
                    </>)}
                    {on(v.dv?.dt?.addIsAct) && (<>
                      <div className="s-cde7c7">
                        <div className="s-8129f1">
                          <label className="s-1afa54" htmlFor="act-type">Type</label>
                          <select className="s-1c9b9d" id="act-type" value={v.af?.type ?? ""} onChange={v.setActType}>
                            <option>Meeting</option>
                            <option>Call</option>
                            <option>Email</option>
                            <option>Note</option>
                            <option>Next step</option>
                          </select>
                        </div>
                        <div className="s-8129f1">
                          <label className="s-1afa54" htmlFor="act-date">{v.af?.dateLabel}</label>
                          <input className="s-439402" id="act-date" type="date" value={v.af?.date ?? ""} onChange={v.setActDate} />
                        </div>
                      </div>
                      <div className="s-bc0172">
                        <label className="s-1afa54" htmlFor="act-title">Summary</label>
                        <input className="s-21c180" id="act-title" type="text" value={v.af?.title ?? ""} onChange={v.setActTitle} placeholder={v.af?.titlePh} />
                      </div>
                      <div className="s-bc0172">
                        <label className="s-1afa54" htmlFor="act-details">
                          Details{" "}
                          <span className="s-963b92">(optional)</span>
                        </label>
                        <textarea className="s-024577" id="act-details" value={v.af?.details ?? ""} onChange={v.setActDetails} rows="3" placeholder="Who attended, what was agreed, links to recordings" />
                      </div>
                      <div className="s-9b2664">
                        <button className="s-ddba00" onClick={v.af?.save} disabled={on(v.af?.off)} style={{ border: `1px solid ${v.af?.b?.bd ?? ""}`, background: v.af?.b?.bg, color: v.af?.b?.fg, cursor: v.af?.b?.cur, font: "inherit", fontSize: "13px", fontWeight: "600" }}>Log activity</button>
                      </div>
                    </>)}
                  </div>
                </div>
                <div className="s-f170d9">
                  <div className="s-8141c1">
                    <div className="s-a981cb">
                      <h3 className="s-91adb2">All items</h3>
                      <span className="s-3ec15a">{v.dv?.dt?.itemsShown}</span>
                    </div>
                    <div className="s-addcc1">
                      <div className="s-aa1ad0" role="group" aria-label="Show">
                        {list(v.dv?.dt?.showSeg).map((g, i0) => (<React.Fragment key={i0}>
                          <button className="s-0596d6" aria-pressed={g?.sel} onClick={g?.go} style={{ background: g?.bg, color: g?.fg, font: "inherit", fontSize: "13px", fontWeight: "600", cursor: "pointer" }}>{g?.label}</button>
                        </React.Fragment>))}
                      </div>
                      <div className="s-ca8dfa">
                        <label className="s-1afa54" htmlFor="dt-filter">Person</label>
                        <select className="s-3876a4" id="dt-filter" value={v.dv?.dt?.filter ?? ""} onChange={v.dv?.dt?.setFilter}>
                          {list(v.dv?.dt?.filterOpts).map((o, i0) => (<React.Fragment key={i0}>
                            <option value={o?.v}>{o?.label}</option>
                          </React.Fragment>))}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="s-987eb2">
                    <div className="s-a2ccfa">
                      <div className="s-f55ed3">
                        <span>Type</span>
                        <span>Task or activity</span>
                        <span>Status</span>
                        <span>Person</span>
                        <span aria-sort={v.dv?.dt?.sortDir}>
                          <button className="s-cad930" onClick={v.dv?.dt?.toggleSort} aria-label={v.dv?.dt?.sortA}>
                            Date{" "}
                            <span aria-hidden="true">{v.dv?.dt?.sortArrow}</span>
                          </button>
                        </span>
                        <span className="s-30489c">Time logged</span>
                        <span className="s-2140d3">Log time</span>
                        <span className="s-2140d3">Open details</span>
                      </div>
                      {list(v.dv?.dt?.items).map((t, i0) => (<React.Fragment key={i0}>
                        <div className="s-ae70d6" style={{ background: t?.rowBg }}>
                          <span>
                            <span className="s-c0f0e0" style={{ background: t?.kindBg, color: t?.kindFg, fontSize: "11.5px", fontWeight: "600", whiteSpace: "nowrap" }}>{t?.kindLabel}</span>
                          </span>
                          <div className="s-b0b5e0">
                            <button className="s-9a6f42" onClick={t?.open} aria-label={t?.openA} title="Open details" style={{ color: t?.fg, textDecoration: t?.deco, font: "inherit", fontSize: "13.5px", fontWeight: "600", textAlign: "left", overflowWrap: "anywhere", cursor: "pointer" }}>{t?.name}</button>
                            {on(t?.tmpl) && (<>
                              <span className="s-76d7e7">Template</span>
                            </>)}
                            {on(t?.hasChat) && (<>
                              <span className="s-263e02" title={t?.chatA}>
                                <svg aria-hidden="true" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"></path>
                                </svg>
                                {t?.chatN}
                              </span>
                            </>)}
                          </div>
                          {on(t?.isTask) && (<>
                            <select className="s-5a0ae6" aria-label={t?.statusLabel} value={t?.status ?? ""} onChange={t?.setStatus} style={{ background: t?.statusBg, color: t?.statusFg, font: "inherit", fontSize: "12.5px", fontWeight: "600" }}>
                              {list(v.dv?.dt?.taskStatusOpts).map((o, i1) => (<React.Fragment key={i1}>
                                <option value={o?.v}>{o?.label}</option>
                              </React.Fragment>))}
                            </select>
                            <select className="s-f31bca" aria-label={t?.ownerLabel} value={t?.owner ?? ""} onChange={t?.setOwner}>
                              {list(v.dv?.dt?.taskOwnerOpts).map((o, i1) => (<React.Fragment key={i1}>
                                <option value={o?.v}>{o?.label}</option>
                              </React.Fragment>))}
                            </select>
                            <input className="s-d7571f" aria-label={t?.dueLabel} type="date" value={t?.due ?? ""} onChange={t?.setDue} />
                          </>)}
                          {on(t?.isAct) && (<>
                            <span className="s-5ad863">—</span>
                            <span className="s-d56e2b">{t?.who}</span>
                            <span className="s-daed79">{t?.when}</span>
                          </>)}
                          <span className="s-8ebc15" style={{ color: t?.loggedFg }}>{t?.logged}</span>
                          <button className="s-3d3bf8" onClick={t?.logTime} disabled={on(t?.logOff)} aria-label={t?.logLabel} title={t?.logTip} style={{ border: `1px solid ${t?.logBd ?? ""}`, background: t?.logBg, color: t?.logFg, font: "inherit", fontSize: "12px", fontWeight: "600", cursor: t?.logCur, whiteSpace: "nowrap" }}>Log time</button>
                          <button className="s-bc2e52" onClick={t?.open} aria-label={t?.openA} title="Open details">
                            <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M9 6l6 6-6 6"></path>
                            </svg>
                          </button>
                        </div>
                      </React.Fragment>))}
                      {on(v.dv?.dt?.itemsEmpty) && (<>
                        <p className="s-215cb5">{v.dv?.dt?.emptyText}</p>
                      </>)}
                    </div>
                  </div>
                </div>
              </div>
            </>)}
            {on(v.dv?.tabFiles) && (<>
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
                      <button className="s-518d5a" role="radio" aria-checked={v.ff?.linkOn} onClick={v.ff?.pickLink} style={{ background: v.ff?.linkBg, color: "#14112E", font: "inherit", fontSize: "13px", fontWeight: "600", cursor: "pointer" }}>Link</button>
                      <button className="s-518d5a" role="radio" aria-checked={v.ff?.fileOn} onClick={v.ff?.pickFile} style={{ background: v.ff?.fileBg, color: "#14112E", font: "inherit", fontSize: "13px", fontWeight: "600", cursor: "pointer" }}>File</button>
                    </div>
                  </div>
                  {on(v.cl?.k9?.open) && (<>
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
                      <button className="s-72c5bc" onClick={v.cl?.k10?.toggle} aria-expanded={v.cl?.k10?.exp}>
                        <svg className="s-0d7706" aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ transform: `rotate(${v.cl?.k10?.rot ?? ""})`, transition: "transform 0.15s" }}>
                          <path d="M9 6l6 6-6 6"></path>
                        </svg>
                        <span>Files and links</span>
                      </button>
                    </h2>
                    <span className="s-3ec15a">{v.dv?.fileCount}</span>
                  </div>
                  {on(v.cl?.k10?.open) && (<>
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
            {on(v.dv?.tabQuote) && (<>
              <div className="s-89dbb6">
                <div className="s-f170d9">
                  <div className="s-952bc5">
                    <div className="s-fefb4a">
                      <h2 className="s-fa1f03">
                        <button className="s-72c5bc" onClick={v.cl?.k11?.toggle} aria-expanded={v.cl?.k11?.exp}>
                          <svg className="s-0d7706" aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ transform: `rotate(${v.cl?.k11?.rot ?? ""})`, transition: "transform 0.15s" }}>
                            <path d="M9 6l6 6-6 6"></path>
                          </svg>
                          <span>Quotes</span>
                        </button>
                      </h2>
                      <p className="s-4a5e94">The active quote feeds the overview, the pipeline and the path to close. Accepted quotes lock; revise them as a new version.</p>
                    </div>
                    <div className="s-d10d6e">
                      <button className="s-8f66bf" onClick={v.qv?.create} disabled={on(v.qv?.createOff)} style={{ border: `1px solid ${v.qv?.createB?.bd ?? ""}`, background: v.qv?.createB?.bg, color: v.qv?.createB?.fg, cursor: v.qv?.createB?.cur, font: "inherit", fontSize: "13px", fontWeight: "600" }}>+ New quote</button>
                      <span className="s-629d39">{v.qv?.createWhy}</span>
                    </div>
                  </div>
                  {on(v.cl?.k11?.open) && (<>
                    {on(v.qv?.none) && (<>
                      <p className="s-d4f4e5">No quotes yet. The SE sets the hours to create the first scenario. Until then the overview shows the estimated value.</p>
                    </>)}
                    {list(v.qv?.list).map((q, i0) => (<React.Fragment key={i0}>
                      <div className="s-696018" style={{ background: q?.bg }}>
                        <button className="s-b76dba" onClick={q?.select} aria-pressed={q?.selected}>
                          <span className="s-1c9385">{q?.name}</span>
                          <span className="s-3ec15a">v{q?.ver}</span>
                          <span className="s-0ff21f" style={{ background: q?.pill?.bg, color: q?.pill?.fg }}>{q?.status}</span>
                          {on(q?.isActive) && (<>
                            <span className="s-a666f9">ACTIVE</span>
                          </>)}
                        </button>
                        <span className="s-eb11b8">{q?.totalText}</span>
                        {on(q?.canActivate) && (<>
                          <button className="s-ad5efa" onClick={q?.activate}>Make active</button>
                        </>)}
                        <button className="s-6ef826" onClick={q?.duplicate} disabled={on(q?.dupOff)} style={{ border: `1px solid ${q?.dupB?.bd ?? ""}`, background: q?.dupB?.bg, color: q?.dupB?.fg, cursor: q?.dupB?.cur, font: "inherit", fontSize: "12px", fontWeight: "600" }}>Duplicate</button>
                      </div>
                    </React.Fragment>))}
                  </>)}
                </div>
                {on(v.qv?.hasSel) && (<>
                  <div className="s-c5ec43">
                    <div className="s-73d6ec">
                      <div className="s-33f2a6">
                        <div className="s-b665df">
                          <h2 className="s-fa1f03">
                            <button className="s-72c5bc" onClick={v.cl?.k12?.toggle} aria-expanded={v.cl?.k12?.exp}>
                              <svg className="s-0d7706" aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ transform: `rotate(${v.cl?.k12?.rot ?? ""})`, transition: "transform 0.15s" }}>
                                <path d="M9 6l6 6-6 6"></path>
                              </svg>
                              <span>{v.qv?.title}</span>
                            </button>
                          </h2>
                          <span className="s-1e4be5" style={{ background: v.qv?.pill?.bg, color: v.qv?.pill?.fg }}>{v.qv?.status}</span>
                        </div>
                        <p className="s-4a5e94">{v.qv?.note}</p>
                      </div>
                      <div className="s-d10d6e">
                        <div className="s-4c0e3f">
                          {on(v.qv?.showSend) && (<>
                            <button className="s-47c6ef" onClick={v.qv?.send}>Mark sent</button>
                          </>)}
                          {on(v.qv?.showAccept) && (<>
                            <button className="s-8f66bf" onClick={v.qv?.accept} disabled={on(v.qv?.acceptOff)} style={{ border: `1px solid ${v.qv?.acceptB?.bd ?? ""}`, background: v.qv?.acceptB?.bg, color: v.qv?.acceptB?.fg, cursor: v.qv?.acceptB?.cur, font: "inherit", fontSize: "13px", fontWeight: "600" }}>Mark accepted</button>
                          </>)}
                          {on(v.qv?.showRevise) && (<>
                            <button className="s-47c6ef" onClick={v.qv?.revise}>Revise as v{v.qv?.nextVer}</button>
                          </>)}
                        </div>
                        <span className="s-629d39">{v.qv?.why}</span>
                      </div>
                    </div>
                    {on(v.cl?.k12?.open) && (<>
                      <div className="s-d08feb">
                        <span className="s-bb7b5d">Services · quantity × rate</span>
                        <div className="s-987eb2">
                          <div className="s-a2ccfa">
                            <div className="s-3c0f19">
                              <span>Line item</span>
                              <span>Qty</span>
                              <span>Unit</span>
                              <span>Rate ($)</span>
                              <span>Discount</span>
                              <span>{v.qv?.costHead}</span>
                              <span className="s-30489c">Amount</span>
                              <span></span>
                            </div>
                            {list(v.qv?.lines).map((ln, i0) => (<React.Fragment key={i0}>
                              <div className="s-584dfd">
                                <div className="s-9dc0a3">
                                  <label className="s-08e452" htmlFor={ln?.pid}>Practice *</label>
                                  <select className="s-a3af92" id={ln?.pid} value={ln?.practice ?? ""} onChange={ln?.setPractice} disabled={on(ln?.locked)} style={{ border: `1px solid ${ln?.prBd ?? ""}`, background: "#FFFFFF", color: "#14112E", font: "inherit", fontSize: "12.5px", minWidth: "150px" }}>
                                    {list(ln?.practiceOpts).map((o, i1) => (<React.Fragment key={i1}>
                                      <option value={o?.v}>{o?.label}</option>
                                    </React.Fragment>))}
                                  </select>
                                </div>
                                <div className="s-9dc0a3">
                                  <label className="s-08e452" htmlFor={ln?.sid}>Service line *</label>
                                  <select className="s-a3af92" id={ln?.sid} value={ln?.svc ?? ""} onChange={ln?.setSvc} disabled={on(ln?.locked)} style={{ border: `1px solid ${ln?.svBd ?? ""}`, background: "#FFFFFF", color: "#14112E", font: "inherit", fontSize: "12.5px", minWidth: "170px" }}>
                                    {list(ln?.svcOpts).map((o, i1) => (<React.Fragment key={i1}>
                                      <option value={o?.v}>{o?.label}</option>
                                    </React.Fragment>))}
                                  </select>
                                </div>
                                <div className="s-9dc0a3">
                                  <label className="s-08e452" htmlFor={ln?.yid}>Customer pays</label>
                                  <select className="s-3f11b5" id={ln?.yid} value={ln?.pay ?? ""} onChange={ln?.setPay} disabled={on(ln?.locked)}>
                                    <option>Upfront</option>
                                    <option>Monthly</option>
                                    <option>Quarterly</option>
                                  </select>
                                </div>
                                {on(ln?.showMonths) && (<>
                                  <div className="s-9dc0a3">
                                    <label className="s-08e452" htmlFor={ln?.mid}>{ln?.termHead}</label>
                                    <input className="s-a3af92" id={ln?.mid} type="number" min="1" max={ln?.termMax} step="1" value={ln?.months ?? ""} onChange={ln?.setMonths} disabled={on(ln?.locked)} placeholder={ln?.termPh} style={{ border: `1px solid ${ln?.moBd ?? ""}`, background: "#FFFFFF", color: "#14112E", font: "inherit", fontSize: "12.5px", width: "84px", fontVariantNumeric: "tabular-nums" }} />
                                  </div>
                                </>)}
                                <span className="s-645d65">{ln?.payNote}</span>
                              </div>
                              <div className="s-5f4f63">
                                <input className="s-3642bb" aria-label={ln?.itemLabel} type="text" value={ln?.item ?? ""} onChange={ln?.setItem} disabled={on(ln?.locked)} placeholder="e.g. Solutions architect" />
                                <input className="s-166ef9" aria-label={ln?.qtyLabel} type="number" min="0" step="1" value={ln?.qty ?? ""} onChange={ln?.setQty} disabled={on(ln?.locked)} />
                                <select className="s-515a9e" aria-label={ln?.unitLabel} value={ln?.unit ?? ""} onChange={ln?.setUnit} disabled={on(ln?.locked)}>
                                  <option value="h">hours</option>
                                  <option value="each">fixed</option>
                                </select>
                                <input className="s-166ef9" aria-label={ln?.rateLabel} type="number" min="0" step="5" value={ln?.rate ?? ""} onChange={ln?.setRate} disabled={on(ln?.locked)} />
                                <div className="s-466a03">
                                  <select className="s-d1be50" aria-label={ln?.dTypeLabel} value={ln?.dType ?? ""} onChange={ln?.setDType} disabled={on(ln?.locked)}>
                                    <option value="pct">%</option>
                                    <option value="flat">$</option>
                                  </select>
                                  <input className="s-68894c" aria-label={ln?.dValLabel} type="number" min="0" step="1" value={ln?.dVal ?? ""} onChange={ln?.setDVal} disabled={on(ln?.locked)} placeholder="0" />
                                </div>
                                <div className="s-8129f1">
                                  {on(ln?.showCostInput) && (<>
                                    <input className="s-166ef9" aria-label={ln?.costRateLabel} type="number" min="0" step="5" value={ln?.costRate ?? ""} onChange={ln?.setCostRate} />
                                  </>)}
                                  <span className="s-6b61a6">{ln?.costText}</span>
                                </div>
                                <span className="s-4906b9">
                                  <span className="s-1a179a">
                                    {ln?.amtPer}
                                    <span className="s-658509">{ln?.amtUnit}</span>
                                  </span>
                                  {on(ln?.showTotal) && (<>
                                    <span className="s-3c9f14" style={{ color: ln?.totalCol }}>{ln?.totalText}</span>
                                  </>)}
                                  {on(ln?.hasDisc) && (<>
                                    <span className="s-10fa0e">{ln?.discText}</span>
                                  </>)}
                                </span>
                                {on(ln?.canRemove) && (<>
                                  <button className="s-cbda31" onClick={ln?.remove} aria-label={ln?.removeLabel}>×</button>
                                </>)}
                              </div>
                            </React.Fragment>))}
                            {on(v.qv?.noLines) && (<>
                              <p className="s-8ac547">No service lines.</p>
                            </>)}
                          </div>
                        </div>
                        {on(v.qv?.editable) && (<>
                          <button className="s-5858de" onClick={v.qv?.addLine}>+ Add service line</button>
                        </>)}
                      </div>
                      <div className="s-d08feb">
                        <span className="s-bb7b5d">Licenses · seats × price per seat</span>
                        <div className="s-987eb2">
                          <div className="s-717daa">
                            <div className="s-e7fb92">
                              <span>Vendor</span>
                              <span>Product</span>
                              <span>Plan</span>
                              <span>Seats</span>
                              <span>$ / seat / mo</span>
                              <span>Discount</span>
                              <span className="s-30489c">Amount</span>
                              <span></span>
                            </div>
                            {list(v.qv?.lic).map((lc, i0) => (<React.Fragment key={i0}>
                              <div className="s-584dfd">
                                <div className="s-9dc0a3">
                                  <label className="s-08e452" htmlFor={lc?.yid}>Customer pays</label>
                                  <select className="s-3f11b5" id={lc?.yid} value={lc?.pay ?? ""} onChange={lc?.setPay} disabled={on(lc?.locked)}>
                                    <option>Upfront</option>
                                    <option>Monthly</option>
                                    <option>Quarterly</option>
                                  </select>
                                </div>
                                {on(lc?.showMonths) && (<>
                                  <div className="s-9dc0a3">
                                    <label className="s-08e452" htmlFor={lc?.mid}>{lc?.termHead}</label>
                                    <input className="s-a3af92" id={lc?.mid} type="number" min="1" max={lc?.termMax} step="1" value={lc?.months ?? ""} onChange={lc?.setMonths} disabled={on(lc?.locked)} placeholder={lc?.termPh} style={{ border: `1px solid ${lc?.moBd ?? ""}`, background: "#FFFFFF", color: "#14112E", font: "inherit", fontSize: "12.5px", width: "84px", fontVariantNumeric: "tabular-nums" }} />
                                  </div>
                                </>)}
                                <span className="s-645d65">{lc?.payNote}</span>
                              </div>
                              <div className="s-de3c14">
                                <select className="s-746124" aria-label={lc?.vendorLabel} value={lc?.vendor ?? ""} onChange={lc?.setVendor} disabled={on(lc?.locked)}>
                                  {list(v.qv?.vendorOpts).map((o, i1) => (<React.Fragment key={i1}>
                                    <option value={o?.v}>{o?.label}</option>
                                  </React.Fragment>))}
                                </select>
                                <select className="s-746124" aria-label={lc?.productLabel} value={lc?.product ?? ""} onChange={lc?.setProduct} disabled={on(lc?.locked)}>
                                  {list(lc?.productOpts).map((o, i1) => (<React.Fragment key={i1}>
                                    <option value={o?.v}>{o?.label}</option>
                                  </React.Fragment>))}
                                </select>
                                <select className="s-746124" aria-label={lc?.planLabel} value={lc?.plan ?? ""} onChange={lc?.setPlan} disabled={on(lc?.locked)}>
                                  {list(lc?.planOpts).map((o, i1) => (<React.Fragment key={i1}>
                                    <option value={o?.v}>{o?.label}</option>
                                  </React.Fragment>))}
                                </select>
                                <input className="s-166ef9" aria-label={lc?.seatsLabel} type="number" min="0" step="1" value={lc?.seats ?? ""} onChange={lc?.setSeats} disabled={on(lc?.locked)} />
                                <input className="s-166ef9" aria-label={lc?.ppuLabel} type="number" min="0" step="1" value={lc?.ppu ?? ""} onChange={lc?.setPpu} disabled={on(lc?.locked)} />
                                <div className="s-466a03">
                                  <select className="s-d1be50" aria-label={lc?.dTypeLabel} value={lc?.dType ?? ""} onChange={lc?.setDType} disabled={on(lc?.locked)}>
                                    <option value="pct">%</option>
                                    <option value="flat">$</option>
                                  </select>
                                  <input className="s-68894c" aria-label={lc?.dValLabel} type="number" min="0" step="1" value={lc?.dVal ?? ""} onChange={lc?.setDVal} disabled={on(lc?.locked)} placeholder="0" />
                                </div>
                                <span className="s-4906b9">
                                  <span className="s-1a179a">
                                    {lc?.amtPer}
                                    <span className="s-658509">{lc?.amtUnit}</span>
                                  </span>
                                  {on(lc?.showTotal) && (<>
                                    <span className="s-3c9f14" style={{ color: lc?.totalCol }}>{lc?.totalText}</span>
                                  </>)}
                                  {on(lc?.hasDisc) && (<>
                                    <span className="s-10fa0e">{lc?.discText}</span>
                                  </>)}
                                </span>
                                {on(lc?.canRemove) && (<>
                                  <button className="s-cbda31" onClick={lc?.remove} aria-label={lc?.removeLabel}>×</button>
                                </>)}
                              </div>
                            </React.Fragment>))}
                            {on(v.qv?.noLic) && (<>
                              <p className="s-8ac547">No licenses on this quote.</p>
                            </>)}
                          </div>
                        </div>
                        {on(v.qv?.editable) && (<>
                          <button className="s-5858de" onClick={v.qv?.addLic}>+ Add license line</button>
                        </>)}
                      </div>
                      <div className="s-620e22">
                        <span className="s-72d4cd">
                          Discount on the total{" "}
                          <span className="s-963b92">(applied after any line discounts)</span>
                        </span>
                        <div className="s-1e55f9">
                          <div className="s-bc0172">
                            <span className="s-a6cf94" id="q-disc-type">Type</span>
                            <div className="s-d1f9fb" role="radiogroup" aria-labelledby="q-disc-type">
                              <button className="s-fd6035" role="radio" aria-checked={v.qv?.discPctOn} onClick={v.qv?.setDiscPct} disabled={on(v.qv?.discLocked)} style={{ background: v.qv?.discPctBg, color: "#14112E", font: "inherit", fontSize: "13px", fontWeight: "600", cursor: "pointer" }}>% Percent</button>
                              <button className="s-fd6035" role="radio" aria-checked={v.qv?.discFlatOn} onClick={v.qv?.setDiscFlat} disabled={on(v.qv?.discLocked)} style={{ background: v.qv?.discFlatBg, color: "#14112E", font: "inherit", fontSize: "13px", fontWeight: "600", cursor: "pointer" }}>$ Flat</button>
                            </div>
                          </div>
                          <div className="s-bc0172">
                            <label className="s-a6cf94" htmlFor="q-disc-val">{v.qv?.discValLabel}</label>
                            <input className="s-884246" id="q-disc-val" type="number" min="0" step="1" value={v.qv?.discVal ?? ""} onChange={v.qv?.setDiscVal} disabled={on(v.qv?.discLocked)} placeholder="0" />
                          </div>
                          <div className="s-bc0172">
                            <label className="s-a6cf94" htmlFor="q-disc-on">Applies to</label>
                            <select className="s-1c9b9d" id="q-disc-on" value={v.qv?.discOn ?? ""} onChange={v.qv?.setDiscOn} disabled={on(v.qv?.discLocked)}>
                              <option value="services">Services</option>
                              <option value="licenses">Licenses</option>
                              <option value="all">Whole quote</option>
                            </select>
                          </div>
                          <div className="s-296fd6">
                            <label className="s-a6cf94" htmlFor="q-disc-reason">
                              Reason{" "}
                              <span className="s-963b92">(optional)</span>
                            </label>
                            <input className="s-21c180" id="q-disc-reason" type="text" value={v.qv?.discReason ?? ""} onChange={v.qv?.setDiscReason} disabled={on(v.qv?.discLocked)} placeholder="e.g. Multi-year commitment" />
                          </div>
                        </div>
                        <span className="s-3c9f14" style={{ color: v.qv?.discNoteFg }}>{v.qv?.discNote}</span>
                      </div>
                      <div className="s-01c459">
                        {list(v.qv?.summary).map((t, i0) => (<React.Fragment key={i0}>
                          <div className="s-af672a">
                            <div className="s-1c20f5">{t?.k}</div>
                            <div className="s-d51961">{t?.v}</div>
                          </div>
                        </React.Fragment>))}
                      </div>
                      {on(v.qv?.hasBreakdown) && (<>
                        <section className="s-49283e" aria-label="Quote preview">
                          <div className="s-d8e085">
                            <div className="s-955b71">
                              <span className="s-7d698d">Quote preview</span>
                              <span className="s-fff54c">{v.qv?.pv?.title}</span>
                              <span className="s-e000b9">{"Prepared for "}{v.qv?.pv?.company}</span>
                            </div>
                            <div className="s-4fad9e">
                              <span className="s-7d698d">Total</span>
                              <span className="s-f5449a">{v.qv?.pv?.total}</span>
                              <span className="s-a6cf94">{v.qv?.pv?.status}</span>
                            </div>
                          </div>
                          <div className="s-987eb2">
                            <div className="s-b91cd6">
                              <div className="s-6cb4d1">
                                <span>#</span>
                                <span>Item</span>
                                <span>Qty</span>
                                <span>Rate</span>
                                <span>Billing</span>
                                <span className="s-30489c">Amount</span>
                              </div>
                              {on(v.qv?.pv?.hasSvc) && (<>
                                <span className="s-0846db">Services</span>
                                {list(v.qv?.pv?.svc).map((r, i0) => (<React.Fragment key={i0}>
                                  <div className="s-c0caf0">
                                    <span className="s-963b92">{r?.n}</span>
                                    <span className="s-955b71">
                                      <span className="s-99c0d2">{r?.item}</span>
                                      <span className="s-08e452">{r?.sub}</span>
                                    </span>
                                    <span className="s-ec2d63">{r?.qty}</span>
                                    <span className="s-ec2d63">{r?.rate}</span>
                                    <span className="s-ec2d63">{r?.bill}</span>
                                    <span className="s-4fad9e">
                                      <span className="s-8601a8">{r?.amt}</span>
                                      {on(r?.hasTot) && (<>
                                        <span className="s-d95717">{r?.tot}</span>
                                      </>)}
                                      {on(r?.hasDisc) && (<>
                                        <span className="s-b52cf3">{r?.disc}</span>
                                      </>)}
                                    </span>
                                  </div>
                                </React.Fragment>))}
                              </>)}
                              {on(v.qv?.pv?.hasLic) && (<>
                                <span className="s-6e65be">Licenses</span>
                                {list(v.qv?.pv?.lic).map((r, i0) => (<React.Fragment key={i0}>
                                  <div className="s-c0caf0">
                                    <span className="s-963b92">{r?.n}</span>
                                    <span className="s-955b71">
                                      <span className="s-99c0d2">{r?.item}</span>
                                      <span className="s-08e452">{r?.sub}</span>
                                    </span>
                                    <span className="s-ec2d63">{r?.qty}</span>
                                    <span className="s-ec2d63">{r?.rate}</span>
                                    <span className="s-ec2d63">{r?.bill}</span>
                                    <span className="s-4fad9e">
                                      <span className="s-8601a8">{r?.amt}</span>
                                      {on(r?.hasTot) && (<>
                                        <span className="s-d95717">{r?.tot}</span>
                                      </>)}
                                      {on(r?.hasDisc) && (<>
                                        <span className="s-b52cf3">{r?.disc}</span>
                                      </>)}
                                    </span>
                                  </div>
                                </React.Fragment>))}
                              </>)}
                            </div>
                          </div>
                          <div className="s-2919c6">
                            {list(v.qv?.pv?.totals).map((t, i0) => (<React.Fragment key={i0}>
                              <div className="s-cc5de3" style={{ borderTop: t?.bt, fontWeight: t?.fw, fontSize: t?.fs, color: t?.fg }}>
                                <span>{t?.k}</span>
                                <span>{t?.v}</span>
                              </div>
                            </React.Fragment>))}
                          </div>
                          {on(v.qv?.pv?.hasNote) && (<>
                            <p className="s-39d546">{v.qv?.pv?.note}</p>
                          </>)}
                        </section>
                      </>)}
                    </>)}
                  </div>
                </>)}
              </div>
            </>)}
          </div>
          {on(v.sideOpen) && (<>
            <aside className="s-344502" aria-label="Company, contract, active quote, deal team and partners">
              <div className="s-f170d9">
                <div className="s-26dd74">
                  <div className="s-33f2a6">
                    {" "}
                    <span className="s-3e1c32">Company</span>
                    {" "}
                    <h2 className="s-0e1229">
                      <button className="s-72c5bc" onClick={v.cl?.k13?.toggle} aria-expanded={v.cl?.k13?.exp}>
                        <svg className="s-0d7706" aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ transform: `rotate(${v.cl?.k13?.rot ?? ""})`, transition: "transform 0.15s" }}>
                          <path d="M9 6l6 6-6 6"></path>
                        </svg>
                        <span>{v.dv?.company}</span>
                      </button>
                    </h2>
                  </div>
                  <button className="s-766d98" onClick={v.dv?.openCompany} aria-label="Open the company record">Open</button>
                </div>
                {on(v.cl?.k13?.open) && (<>
                  <div className="s-78081f">
                    {list(v.dv?.companyFields).map((f, i0) => (<React.Fragment key={i0}>
                      <div className="s-d926b6">
                        <span className="s-78398b">{f?.k}</span>
                        <span className="s-dbc6af">{f?.v}</span>
                      </div>
                    </React.Fragment>))}
                  </div>
                  <div className="s-de1c0f">
                    <span className="s-9148fa">Contract</span>
                    {list(v.dv?.contractRows).map((r, i0) => (<React.Fragment key={i0}>
                      <div className="s-cd1d0f">
                        <span className="s-c76201">{r?.k}</span>
                        <span className="s-30489c" style={{ fontWeight: r?.fw, color: r?.fg }}>{r?.v}</span>
                      </div>
                    </React.Fragment>))}
                  </div>
                </>)}
              </div>
              <div className="s-31755f">
                <div className="s-816b49">
                  <div className="s-33f2a6">
                    {" "}
                    <span className="s-254c4c">Primary contact</span>
                    {" "}
                    <h2 className="s-0e1229">
                      <button className="s-72c5bc" onClick={v.cl?.k14?.toggle} aria-expanded={v.cl?.k14?.exp}>
                        <svg className="s-0d7706" aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ transform: `rotate(${v.cl?.k14?.rot ?? ""})`, transition: "transform 0.15s" }}>
                          <path d="M9 6l6 6-6 6"></path>
                        </svg>
                        <span>{v.dv?.pc?.name}</span>
                      </button>
                    </h2>
                  </div>
                  <button className="s-766d98" onClick={v.dv?.pc?.open} aria-label="Open the contact record">Open</button>
                </div>
                {on(v.cl?.k14?.open) && (<>
                  <div className="s-8c532a">
                    {list(v.dv?.pc?.chips).map((ch, i0) => (<React.Fragment key={i0}>
                      <span className="s-fe6a2a" style={{ background: ch?.bg, color: ch?.fg }}>{ch?.label}</span>
                    </React.Fragment>))}
                  </div>
                  <div className="s-14109b">
                    <span className="s-78398b">Email</span>
                    <span className="s-392a00">{v.dv?.pc?.email}</span>
                  </div>
                  <div className="s-14109b">
                    <span className="s-78398b">Phone</span>
                    <span className="s-dbc6af">{v.dv?.pc?.phone}</span>
                  </div>
                  <div className="s-7be3f3">
                    <label className="s-a6cf94" htmlFor={v.dv?.pc?.selId}>Change primary contact</label>
                    <select className="s-f31bca" id={v.dv?.pc?.selId} value={v.dv?.pc?.name ?? ""} onChange={v.dv?.pc?.set}>
                      {list(v.dv?.pc?.opts).map((o, i0) => (<React.Fragment key={i0}>
                        <option value={o?.v}>{o?.label}</option>
                      </React.Fragment>))}
                    </select>
                  </div>
                </>)}
              </div>
              <div className="s-f170d9">
                <div className="s-1ec737">
                  <div>
                    <h2 className="s-91adb2">
                      <button className="s-72c5bc" onClick={v.cl?.k15?.toggle} aria-expanded={v.cl?.k15?.exp}>
                        <svg className="s-0d7706" aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ transform: `rotate(${v.cl?.k15?.rot ?? ""})`, transition: "transform 0.15s" }}>
                          <path d="M9 6l6 6-6 6"></path>
                        </svg>
                        <span>Active quote</span>
                      </button>
                    </h2>
                    {" "}
                    <span className="s-e02b7d">{v.dv?.qSub}</span>
                    {" "}
                  </div>
                  <span className="s-1e4be5" style={{ background: v.dv?.qPill?.bg, color: v.dv?.qPill?.fg }}>{v.dv?.qStatus}</span>
                </div>
                {on(v.cl?.k15?.open) && (<>
                  {list(v.dv?.qSections).map((qs, i0) => (<React.Fragment key={i0}>
                    <div className="s-b4557e">
                      <span className="s-a4506b">{qs?.h}</span>
                      {list(qs?.rows).map((r, i1) => (<React.Fragment key={i1}>
                        <div className="s-0b8c6f">
                          <span style={{ color: r?.kFg }}>{r?.k}</span>
                          <span className="s-fc35f6" style={{ color: r?.vFg, fontWeight: r?.fw, whiteSpace: "nowrap" }}>{r?.v}</span>
                        </div>
                      </React.Fragment>))}
                    </div>
                  </React.Fragment>))}
                  <div className="s-44a5ea">
                    <span className="s-af45e2">Services revenue</span>
                    <span className="s-959641">{v.dv?.netRevenue}</span>
                    <span className="s-c77fbd">Services revenue retained by AntlerWing</span>
                  </div>
                  {on(v.dv?.canQuote) && (<>
                    <div className="s-bf9b63">
                      {" "}
                      <button className="s-429dbd" onClick={v.dv?.goQuote}>Open quote →</button>
                      {" "}
                    </div>
                  </>)}
                </>)}
              </div>
              <div className="s-73c3b6">
                <div className="s-9870f5">
                  <h2 className="s-91adb2">
                    <button className="s-72c5bc" onClick={v.cl?.k16?.toggle} aria-expanded={v.cl?.k16?.exp}>
                      <svg className="s-0d7706" aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ transform: `rotate(${v.cl?.k16?.rot ?? ""})`, transition: "transform 0.15s" }}>
                        <path d="M9 6l6 6-6 6"></path>
                      </svg>
                      <span>
                        Deal team{" "}
                        <span className="s-e652a3">({v.dv?.teamCount})</span>
                      </span>
                    </button>
                  </h2>
                  <button className="s-15b8f0" onClick={v.dv?.addMember} disabled={on(v.dv?.addMemberOff)} style={{ border: `1px solid ${v.dv?.addMemberB?.bd ?? ""}`, background: v.dv?.addMemberB?.bg, color: v.dv?.addMemberB?.fg, cursor: v.dv?.addMemberB?.cur, font: "inherit", fontSize: "12.5px", fontWeight: "600" }}>+ Add member</button>
                </div>
                {on(v.cl?.k16?.open) && (<>
                  {list(v.dv?.team).map((m, i0) => (<React.Fragment key={i0}>
                    <div className="s-3a1f86">
                      <span className="s-9226a0" aria-hidden="true">{m?.initials}</span>
                      <span className="s-4ad4e4">
                        {" "}
                        <span className="s-6de5a7">{m?.name}</span>
                        {" "}
                        <span className="s-e02b7d">{m?.role}</span>
                        {" "}
                        {on(m?.hasSub) && (<>
                          {" "}
                          <span className="s-74072e">{m?.sub}</span>
                          {" "}
                        </>)}
                      </span>
                      {on(m?.canChange) && (<>
                        <button className="s-648015" onClick={m?.change}>Change</button>
                      </>)}
                      {on(m?.canRemove) && (<>
                        <button className="s-648015" onClick={m?.remove} aria-label={`Remove ${m?.name ?? ""} from the deal team`}>Remove</button>
                      </>)}
                    </div>
                  </React.Fragment>))}
                  <p className="s-57aad1">Name and role only. The owner is added automatically.</p>
                </>)}
              </div>
              <div className="s-73c3b6">
                <div className="s-9870f5">
                  <h2 className="s-91adb2">
                    <button className="s-72c5bc" onClick={v.cl?.k17?.toggle} aria-expanded={v.cl?.k17?.exp}>
                      <svg className="s-0d7706" aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ transform: `rotate(${v.cl?.k17?.rot ?? ""})`, transition: "transform 0.15s" }}>
                        <path d="M9 6l6 6-6 6"></path>
                      </svg>
                      <span>Partner stakeholders</span>
                    </button>
                  </h2>
                  <button className="s-aa28a6" onClick={v.dv?.addStake}>+ Tag</button>
                </div>
                {on(v.cl?.k17?.open) && (<>
                  {list(v.dv?.stakeholders).map((m, i0) => (<React.Fragment key={i0}>
                    <div className="s-3a1f86">
                      <span className="s-a7ab47" aria-hidden="true">{m?.initials}</span>
                      <span className="s-33f2a6">
                        <span className="s-6de5a7">{m?.name}</span>
                        <span className="s-eda018">{m?.sub}</span>
                      </span>
                    </div>
                  </React.Fragment>))}
                  {on(v.dv?.stakeEmpty) && (<>
                    <p className="s-62e046">None tagged yet.</p>
                  </>)}
                </>)}
              </div>
            </aside>
          </>)}
        </div>
      </section>
    </>
  );
}
