# TASK_SPEC.md — bounded task contract

- **ID:** `TASK-SEA-R1-B04-001`
- **Version:** `1.2.0`
- **Status:** `Active`
- **Product owner:** методист відділення теорії судноводіння навчального центру «Норд-Вест»
- **Delivery / technical owner:** виконавець проєкту
- **Date:** 2026-09-22
- **Related artifacts:** [`CLAUDE.md`](CLAUDE.md), [`SPEC.md`](SPEC.md), [`SPRINT-01.md`](SPRINT-01.md), [`EVIDENCE.md`](EVIDENCE.md), [`RUNBOOK.md`](RUNBOOK.md), [`docs/decisions/DEC-002-r1-stack.md`](docs/decisions/DEC-002-r1-stack.md), [`docs/decisions/DEC-003-r1-handoff.md`](docs/decisions/DEC-003-r1-handoff.md)

## Goal and linked outcome

- **Goal:** відкрити картку саме обраного демонстраційного судна за кліком і показати всі поля в узгодженому форматі без HTML-інтерпретації назви.
- **Backlog:** `B-04` / `R1-B04-VESSEL-CARD`.
- **SPEC outcome:** `SPEC-SEA-001 / R1 map foundation`.
- **Predecessor:** `TASK-SEA-R1-B03-001` / B-03 vessel model and static marker. This contract supersedes the predecessor for the active bounded slice; B-03 evidence/history remain append-only.
- **Desired behavior:** один клік по статичному demo marker відкриває картку `DEMO_VESSEL`; повторний клік і клік по карті не скидають вибір; джерело, ідентифікатор, назва, координати, швидкість, курс і час читаються з тієї самої структури `Vessel`.

## Owner and allowed paths

- **Product owner:** методист відділення теорії судноводіння навчального центру «Норд-Вест» — приймає межі та outcome.
- **Delivery / technical owner:** виконавець проєкту — реалізує bounded slice, запускає перевірки, веде evidence і handoff.
- **Planning path:** `TASK_SPEC.md`.
- **Implementation paths:**
  - `app/vessel-card.tsx`
  - `app/sea-map.tsx`
  - `app/map-shell.tsx`
  - `app/globals.css`
- **Append-only records:** `EVIDENCE.md` і `RUNBOOK.md` можна змінювати лише додаванням фактичного результату після перевірок.
- **Excluded paths:** `app/vessel-model.ts`, `app/map-config.ts`, `app/page.tsx`, `app/layout.tsx`, `package.json`, `package-lock.json`, `reference/`, `.agents/`, `.claude/`, `skills-lock.json`, `TASK_INITIAL.md`, `TASK_DECOMPOSE.md`, `docs/checkpoints/`, `SPEC.md`, S2/S3 plans, tests, secrets and unrelated files.

## Inputs and constraints

- **Inputs:** approved `SPEC.md` and `SPRINT-01.md` B-04 contract; accepted B-03 map/model implementation; R1 stack decision `DEC-002-r1-stack.md`; current `sprint1` branch; B-03 evidence and limitations.
- **Explicit authorization:** product owner authorized transition to B-04 with the user decision `continue` after B-03 human diff review.
- **Stack baseline:** Node.js 24; TypeScript strict; Next.js App Router + React; Leaflet 1.9.x; OpenStreetMap Standard; npm lock-file.
- **Vessel input:** reuse `Vessel` and `DEMO_VESSEL` from `app/vessel-model.ts`; do not add another vessel, route, movement state or data source.
- **Selection:** `MapShell` owns `Vessel | null`; marker selection is forwarded through the existing client-only dynamic map boundary. Repeated selection of the same `id` keeps the current card; map clicks do not clear selection; a close button is not allowed.
- **Card fields:** render `id`, `name`, coordinates, speed, course, timestamp and source. React text rendering must treat a name such as `<b>Демо</b>` as literal text; do not use `dangerouslySetInnerHTML` or HTML string interpolation for user/data values.
- **Formatting:** coordinates use `toFixed(5)` with trailing zeros; finite speed uses at most one decimal, strips an unnecessary trailing `.0`, and appends ` kn`; numeric `0` remains `0 kn`; null/invalid values use `Немає даних`; course uses `Math.round(value) % 360` and `°`; a valid ISO timestamp displays `HH:MM:SS UTC`; source displays `Демонстраційні дані` or `AISStream`.
- **Panel order:** a disabled, nonfunctional future-action button placeholder may appear first; the source label remains second; the selected vessel card appears third. No real-data behavior, search or button action is added.
- **Non-goals:** automatic motion, timers, routes, three vessels, AIS data, real-data fetching, search, close button, map-click deselection, API/server logic, Playwright, future placeholders beyond the required inert button, or new dependencies.
- **Network boundary:** map tiles may require external network during manual verification; build must not depend on tile availability.

## Expected output

A minimal B-04 slice that:

1. keeps the existing client-only Leaflet lifecycle and B-03 marker attributes/icon behavior;
2. makes the single demo marker selectable without recreating the map for selection callback changes;
3. stores the selected vessel in the shell and renders the card only for that selection;
4. formats every approved card field and distinguishes numeric zero from unknown values;
5. renders names as text nodes without HTML interpretation;
6. keeps repeated marker clicks and map clicks from closing or changing the current card;
7. preserves cleanup of marker listeners, marker, tile layer, map and resize resources;
8. contains no B-05+ product behavior.

## Acceptance criteria

- [ ] Clicking the one marker selects `demo-1` and opens exactly one card for that vessel.
- [ ] The card contains `id`, name, coordinates, speed, course, timestamp and source in the approved order/format.
- [ ] Coordinates use five decimal places; speed uses the approved one-decimal/no-trailing-zero format and preserves `0 kn`; course uses rounded degrees; timestamp is UTC `HH:MM:SS UTC`.
- [ ] Null/invalid/unknown values display exactly `Немає даних`; source values display `Демонстраційні дані` or `AISStream`.
- [ ] A name containing literal `<b>Демо</b>` is displayed as text and does not create a bold HTML element or execute markup.
- [ ] Repeated click on the selected marker leaves the card open and unchanged; a map click does not clear the selection; no close button is rendered.
- [ ] Panel order is the inert future button placeholder, source label, then selected card; no real-data action is wired.
- [ ] Marker click listeners, marker, map and resize resources are cleaned up on unmount; no motion/timer/route logic exists.
- [ ] No B-05+ behavior, dependency, test framework or excluded path is introduced.
- [ ] `EVIDENCE.md` and `RUNBOOK.md` contain only actual B-04 results and limitations after verification.
- [ ] Human diff review confirms `continue`, `revise` or `HOLD` before B-05.

**Current acceptance status:** `Implementation, type/build/source checks and delivery commit are verified; browser visual/DOM acceptance remains UNKNOWN/BLOCKED, Node.js 24 compatibility is Needs verification, and final human B-04 diff decision is pending.`

## Verification

### Pre-edit checks

- **Commands:** `git status --short`; inspect B-03 implementation and current contract; read B-04 requirements in `SPRINT-01.md`, `PROJECT_BRIEF.md` and installed Next.js guidance.
- **Expected:** only authorized B-04 implementation and record paths change; B-03 shared model/map configuration remain reusable and untouched; no dependency or excluded path change is needed.
- **Observed:** B-03 accepted continuation was explicitly authorized by the user; the repository contains the B-03 model, marker and client-only map implementation; no vessel-card component exists before this slice.

### Post-edit checks

1. `git diff --check` — no whitespace errors.
2. `npx tsc --noEmit` — strict type-check; Node 24 compatibility is not claimed when the environment reports another runtime.
3. `npm run build` — client-only map/card composition builds without SSR/browser-global errors.
4. Targeted source/scope checks — allowed paths only; one demo marker; exact field formatting; null versus zero; literal name rendering; required panel order; no `dangerouslySetInnerHTML`, map-click clearing, close button, motion, routes, AIS, API/server logic, tests or dependencies.
5. `npm run dev` — server binds to the existing loopback address when no pre-existing server occupies it; do not stop a server not started by this task.
6. Browser/manual check when a browser runtime is available — click `[data-vessel-id="demo-1"]`, inspect all card fields, repeated click, map click, literal `<b>Демо</b>` behavior, no close button and panel order.
7. If browser runtime is unavailable, record DOM/visual acceptance as `UNKNOWN`/`BLOCKED`; HTTP/build checks are supplemental and are not visual acceptance.

- **Expected result:** executed checks pass, or exact failures/limitations are recorded as `FAIL`/`BLOCKED`/`UNKNOWN`.
- **Evidence sources:** command output, component/source diff, live DOM attributes/card text, manual checklist if available, and environment details.

## Checkpoint and stop conditions

- **Checkpoint:** after implementation checks and human diff review, append B-04 evidence and RUNBOOK handoff; create a checkpoint record only if the slice is accepted and the path is authorized by the applicable decision convention.
- **Stop before implementation if:** an unapproved dependency/architecture or path outside this contract is required, or B-05+ behavior is needed.
- **Stop after implementation if:** type-check/build fails, the marker is not selectable, card formatting or literal rendering is wrong, selection is cleared by repeated/map clicks, cleanup is absent, or the diff contains unexpected paths.
- **Exit decision:** `DONE` only after evidence and human review; otherwise `CONTINUE WITH APPROVAL` or `HOLD`.

## Risks and open questions

- Current environment previously reported Node.js `v22.16.0`, while the R1 baseline is Node.js 24; compatibility remains `Needs verification` until checked in the current session.
- Browser/manual visual verification may remain unavailable; no automated browser claim may replace it.
- OSM tiles require network access; build success does not prove tile availability.
- The inert future-action button is a layout placeholder only; real-data loading and AIS behavior remain outside B-04.
- Product metrics, AISStream availability, architecture beyond R1 and S2/S3 remain `Unknown`/`Waiting for MVP input`.

## Rollback / recovery

If B-04 is rejected or a check fails, restore the last accepted B-03 commit by reverting only the B-04 implementation paths and this task-contract state after inspecting the diff; preserve append-only `EVIDENCE.md` and `RUNBOOK.md` history and excluded untracked inputs. Do not delete or rewrite prior evidence. The recovery point is `bad4df2`.

## Handoff

At the end of this slice, record:

- actual changed files;
- commands and manual checks actually run with status;
- new evidence ID and limitations;
- unresolved Unknowns and blockers;
- rollback/recovery path;
- human decision `continue`, `revise` or `HOLD`;
- next bounded session: `R1-B05-DEMO-ROUTES` only after accepted B-04.
