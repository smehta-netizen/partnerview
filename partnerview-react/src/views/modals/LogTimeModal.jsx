// Generated from the PartnerView design-canvas prototype. Edit freely.
import React from 'react';
import { on, list } from '../runtime';


export default function LogTimeModal({ v }) {
  return (
    <>
      <div className="s-d6accc">
        <div className="s-f132c2" role="dialog" aria-modal="true" aria-labelledby="time-title">
          <div className="s-bc0172">
            <h2 className="s-ef9167" id="time-title">Log time</h2>
            <p className="s-8d7f09">{v.tv?.sub}</p>
          </div>
          <div className="s-ba0ec7">
            <div className="s-4cc8a6">
              <label className="s-b34b0c" htmlFor="t-date">Date</label>
              <input className="s-404a47" id="t-date" type="date" value={v.tv?.date ?? ""} onChange={v.setTDate} />
            </div>
            <div className="s-4cc8a6">
              <label className="s-b34b0c" htmlFor="t-hours">Hours</label>
              <input className="s-c96c86" id="t-hours" type="number" min="0.25" step="0.25" value={v.tv?.hours ?? ""} onChange={v.setTHours} placeholder="e.g. 2" />
            </div>
          </div>
          <div className="s-d08feb">
            <label className="s-b34b0c" htmlFor="t-svc">Service line *</label>
            <select className="s-920ce3" id="t-svc" value={v.tv?.svc ?? ""} onChange={v.setTSvc} style={{ border: `1px solid ${v.tv?.svcBd ?? ""}`, background: "#FFFFFF", color: "#14112E", font: "inherit" }}>
              {list(v.tv?.svcOpts).map((o, i0) => (<React.Fragment key={i0}>
                <option value={o?.v}>{o?.label}</option>
              </React.Fragment>))}
            </select>
            <span className="s-629d39">{v.tv?.svcNote}</span>
          </div>
          <div className="s-d08feb">
            <label className="s-b34b0c" htmlFor="t-ms">Phase</label>
            <select className="s-404a47" id="t-ms" value={v.tv?.ms ?? ""} onChange={v.setTMs}>
              {list(v.tv?.msOpts).map((o, i0) => (<React.Fragment key={i0}>
                <option value={o?.v}>{o?.label}</option>
              </React.Fragment>))}
            </select>
          </div>
          <div className="s-d08feb">
            <label className="s-b34b0c" htmlFor="t-task">Task</label>
            <select className="s-404a47" id="t-task" value={v.tv?.task ?? ""} onChange={v.setTTask}>
              {list(v.tv?.taskOpts).map((o, i0) => (<React.Fragment key={i0}>
                <option value={o?.v}>{o?.label}</option>
              </React.Fragment>))}
            </select>
            <span className="s-629d39">Tag a phase, a task, or both. Picking a task fills in its phase.</span>
          </div>
          <div className="s-d08feb">
            <label className="s-b34b0c" htmlFor="t-role">Who worked</label>
            <select className="s-404a47" id="t-role" value={v.tv?.role ?? ""} onChange={v.setTRole} disabled={on(v.tv?.whoLocked)}>
              {list(v.tv?.roleOpts).map((o, i0) => (<React.Fragment key={i0}>
                <option value={o?.v}>{o?.label}</option>
              </React.Fragment>))}
            </select>
            <span className="s-957b2a" style={{ color: v.tv?.whoNoteFg }}>{v.tv?.whoNote}</span>
          </div>
          <div className="s-d08feb">
            <label className="s-b34b0c" htmlFor="t-note">
              Note{" "}
              <span className="s-c5e12b">(optional)</span>
            </label>
            <input className="s-240b15" id="t-note" type="text" value={v.tv?.note ?? ""} onChange={v.setTNote} placeholder="What did you work on?" />
          </div>
          {on(v.tv?.hasBudget) && (<>
            <div className="s-cc00bd">
              <div className="s-325464">Hours: logged and remaining</div>
              <div className="s-f083fe">
                <span>Budget</span>
                <span className="s-30489c">Total / est.</span>
                <span className="s-30489c">Logged</span>
                <span className="s-30489c">Remaining</span>
                <span className="s-30489c">After this entry</span>
              </div>
              {list(v.tv?.budget).map((r, i0) => (<React.Fragment key={i0}>
                <div className="s-0d72c5">
                  <span className="s-c45f87">
                    <span className="s-21a1be" style={{ color: r?.kFg }}>{r?.k}</span>
                    <span className="s-625c41">{r?.sub}</span>
                  </span>
                  <span className="s-fd96e8">{r?.total}</span>
                  <span className="s-fd96e8">{r?.used}</span>
                  <span className="s-3749ee" style={{ color: r?.leftFg }}>{r?.left}</span>
                  <span className="s-3749ee" style={{ color: r?.fg }}>{r?.after}</span>
                </div>
              </React.Fragment>))}
            </div>
          </>)}
          {on(v.tv?.hasWarn) && (<>
            <div className="s-d08feb" role="status">
              {list(v.tv?.warns).map((w, i0) => (<React.Fragment key={i0}>
                <p className="s-f37d7f" style={{ border: `1px solid ${w?.bd ?? ""}`, background: w?.bg, color: w?.fg, fontSize: "13px" }}>
                  <strong>{w?.title}</strong>
                  {" "}{w?.text}
                </p>
              </React.Fragment>))}
              <span className="s-629d39">{v.tv?.warnFoot}</span>
            </div>
          </>)}
          {on(v.tv?.outWin) && (<>
            <p className="s-f8acb4" role="status">{v.tv?.outText}</p>
          </>)}
          <p className="s-6234b2" style={{ color: v.tv?.hintFg }}>{v.tv?.hint}</p>
          <div className="s-e8558f">
            <button className="s-93a0d4" onClick={v.tv?.save} disabled={on(v.tv?.off)} style={{ border: `1px solid ${v.tv?.b?.bd ?? ""}`, background: v.tv?.b?.bg, color: v.tv?.b?.fg, cursor: v.tv?.b?.cur, font: "inherit", fontWeight: "600" }}>Log time</button>
            <button className="s-5e75ba" onClick={v.closeModal}>Cancel</button>
          </div>
        </div>
      </div>
    </>
  );
}
