# PartnerView (React)

This is the PartnerView CRM and delivery prototype, ported from the Claude design canvas (v173) to a standard React + Vite app. Its behaviour, seed data and visuals match the prototype.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
```

## How it is organised

```
index.html                    Page shell and the Geist font
src/main.jsx                  Mounts <App accent ground />
src/App.jsx                   Connects the logic class to the views
src/logic/DCLogic.js          Base class (just React.Component)
src/logic/PartnerViewLogic.js All state, seed data, permissions, calculations and handlers.
                              renderVals() builds one view-model object, called `v` in the views.
src/views/AppView.jsx         Header, left nav, impersonation banner, toast; mounts the pieces below
src/views/screens/*.jsx       One file per screen: Home, Leads, Lead, Deals, Deal, Projects, Project,
                              Companies, Company, Contacts, Contact, Settings
src/views/modals/*.jsx        Dialogs: new lead, new deal, log time, choose SE, close won, ...
src/views/panels/*.jsx        Task / activity drawer and the chatter panel
src/views/runtime.js          on() and list(), the helpers that replace the prototype's sc-if / sc-for
src/styles/app.css            Global rules, plus the static styles pulled out of the markup as classes
src/assets/                   AntlerWing logo
tools/canvas-to-react/        The converter that generated src/views and app.css (see below)
```

### Data flow

1. `PartnerViewLogic` is a React class component. It holds everything in `this.state`, including `state.data` (leads, deals, quotes, projects, settings).
2. On every render, `renderVals()` turns the state into a flat view-model. Event handlers are included as functions, e.g. `v.qv.addLine` or `v.setTSvc`.
3. The views are presentational only: they read `v` and call its handlers. No business logic lives in JSX.

### Styling

- Static declarations from the prototype's inline styles are now CSS classes in `app.css`, named `s-<hash>`. Identical style sets share one class.
- Values that depend on state, such as colours, widths and borders driven by data, stay as inline `style={{ ... }}` objects.
- Brand colours and the Geist font are unchanged.

### Persistence

The demo saves its data and the current UI position, such as which screen and record are open, to `localStorage` under `aw-partnerview-demo-v17`. "Reset demo data" in the header clears it. There is no backend; replacing these reads and writes with API calls is the next step for production.

## Regenerating from a newer prototype

If the canvas prototype changes, download its `Main.dc.html` and run:

```bash
python3 tools/canvas-to-react/convert.py path/to/Main.dc.html .
```

This rewrites `src/views/**`, `src/styles/app.css` and `src/logic/PartnerViewLogic.js`. Hand edits to those files will be overwritten, so once the team starts developing in React, stop regenerating.

## Notes for engineering

- All roles, permissions (CRUD, record scope, actions, menu access) and sample users are in `PartnerViewLogic`, in `defaultSettings()`, `USERS` and `canDo`/`scopeOf`/`canAct`. Sign-in is simulated with the "Signed in as" picker.
- Quote maths lives in `monthsOf`, `lineAmt`, `licAmt`, `payInfo` and `quoteTotals`. Service-line start and completion dates are derived from the time log in `lineProg`.
- The generated views keep the prototype's ARIA attributes, labels and keyboard focus styles.
