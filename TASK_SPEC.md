# TASK_SPEC.md — bounded task contract

- **ID:** `TASK-SEA-R1-B05-001`
- **Version:** `1.3.0`
- **Status:** `Active`
- **Product owner:** методист відділення теорії судноводіння навчального центру «Норд-Вест»
- **Delivery / technical owner:** виконавець проєкту
- **Date:** 2026-09-22
- **Related artifacts:** [`CLAUDE.md`](CLAUDE.md), [`SPEC.md`](SPEC.md), [`SPRINT-01.md`](SPRINT-01.md), [`EVIDENCE.md`](EVIDENCE.md), [`RUNBOOK.md`](RUNBOOK.md), [`docs/decisions/DEC-002-r1-stack.md`](docs/decisions/DEC-002-r1-stack.md), [`docs/decisions/DEC-003-r1-handoff.md`](docs/decisions/DEC-003-r1-handoff.md)

## Goal and linked outcome

- **Goal:** додати три незалежні статичні демонстраційні судна з літеральними маршрутами та початковими станами в узгодженій структурі даних.
- **Backlog:** `B-05` / `R1-B05-DEMO-ROUTES`.
- **SPEC outcome:** `SPEC-SEA-001 / R1 map foundation`.
- **Predecessor:** `TASK-SEA-R1-B04-001` / B-04 vessel selection and card. This contract supersedes the predecessor for the active bounded slice; B-04 evidence/history remain append-only.
- **Desired behavior:** на карті видно рівно `demo-1`, `demo-2`, `demo-3`; кожне судно має назву, швидкість, початковий курс і 8–12 явних точок маршруту в межах `MAP_CONFIG.bounds`; клік передає правильний `Vessel` до вже наявної картки.

## Owner and allowed paths

- **Product owner:** методист відділення теорії судноводіння навчального центру «Норд-Вест» — приймає межі та outcome.
- **Delivery / technical owner:** виконавець проєкту — реалізує bounded slice, запускає перевірки, веде evidence і handoff.
- **Planning path:** `TASK_SPEC.md`.
- **Implementation paths:**
  - `app/vessel-model.ts`
  - `app/sea-map.tsx`
- **Append-only records:** `EVIDENCE.md` і `RUNBOOK.md` можна змінювати лише додаванням фактичного результату після перевірок.
- **Excluded paths:** `app/map-shell.tsx`, `app/vessel-card.tsx`, `app/map-config.ts`, `app/page.tsx`, `app/layout.tsx`, `app/globals.css`, `package.json`, `package-lock.json`, `reference/`, `.agents/`, `.claude/`, `skills-lock.json`, `TASK_INITIAL.md`, `TASK_DECOMPOSE.md`, `docs/checkpoints/`, `SPEC.md`, S2/S3 plans, tests, secrets and unrelated files.

## Inputs and constraints

- **Inputs:** approved `SPEC.md` and `SPRINT-01.md` B-05 contract; accepted B-04 implementation at `addc7ba`; R1 stack decision `DEC-002-r1-stack.md`; current `sprint1` branch; B-04 evidence and limitations.
- **Explicit authorization:** the user requested continuation after the delivered B-04 slice; this authorizes preparation and implementation of the next bounded B-05 contract, subject to the checks and final human diff decision.
- **Stack baseline:** Node.js 24; TypeScript strict; Next.js App Router + React; Leaflet 1.9.x; OpenStreetMap Standard; npm lock-file.
- **Vessel input:** keep the shared `Vessel` and `VesselSource` from `app/vessel-model.ts`; demo-only route data must not become a required field of the shared AIS-compatible shape.
- **Demo data:** exactly three deterministic vessels `demo-1`, `demo-2`, `demo-3`; names `Демо-судно 1`…`Демо-судно 3`; each route has 8–12 explicit `[lat, lon]` points, all inside inclusive `MAP_CONFIG.bounds`; each speed is a finite numeric literal; vessel `lat/lon` equal the first route point; `source` is `demo`; initial `courseDeg` is an explicit value consistent with the first route segment.
- **Selection:** preserve `MapShell` ownership of `Vessel | null`, stable callback ref and id-preserving selection from B-04; do not clear selection on map click or repeated marker click; do not add a close button.
- **Marker contract:** retain `data-vessel-id`, `data-icon="course"|"neutral"`, course glyph behavior and client-only Leaflet lifecycle for every marker. Remove every marker click listener and marker during cleanup.
- **Non-goals:** timers, automatic motion, route playback, route polylines, pause, rewind, loop, current route index, card updates from motion, AIS data, real-data loading, search, API/server logic, Playwright, new dependencies, future UI placeholders and B-07 behavior.
- **Network boundary:** map tiles may require external network during manual verification; build must not depend on tile availability.

## Expected output

A minimal B-05 slice that:

1. preserves the existing `Vessel` shape and B-04 card/selection behavior;
2. adds one literal demo-specific route dataset with exactly three vessels and 8–12 points per route;
3. renders one static Leaflet marker for each demo vessel at its first route point;
4. exposes the required marker attributes and forwards each marker click to its matching vessel;
5. keeps explicit initial course/source/name/speed values and all route points inside configured bounds;
6. preserves cleanup of all marker listeners, markers, tile layer, map and resize resources;
7. contains no B-06 motion or B-07 testing behavior.

## Acceptance criteria

- [ ] The dataset contains exactly `demo-1`, `demo-2` and `demo-3`, each with the approved name, source and finite literal speed.
- [ ] Each route has 8–12 explicit points; every point is inside inclusive `MAP_CONFIG.bounds`; each vessel starts at its route's first point.
- [ ] Initial courses are explicit and consistent with the first route segment; no runtime route builder, interpolation, random value or motion calculation is added.
- [ ] The map creates exactly three static interactive markers with matching `data-vessel-id` and `data-icon` attributes.
- [ ] Clicking any marker passes that vessel to the existing selection state and opens the matching B-04 card; repeated selection and map clicks preserve the card.
- [ ] Marker click listeners, markers, map, tile layer and resize resources are cleaned up on unmount.
- [ ] No timer, playback, position update, route polyline, AIS, API/server logic, new dependency, test framework or excluded path is introduced.
- [ ] `EVIDENCE.md` and `RUNBOOK.md` contain only actual B-05 results and limitations after verification.
- [ ] Human diff review confirms `continue`, `revise` or `HOLD` before B-06.

**Current acceptance status:** `Implementation, type/build/source/data checks and supplemental loopback HTTP check are PASS; npm run dev was blocked by the pre-existing port listener; browser visual/DOM acceptance is UNKNOWN/BLOCKED; Node.js 24 compatibility is Needs verification; final human B-05 diff decision is pending.`

## Verification

### Pre-edit checks

- **Commands:** `git status --short`; inspect `git show addc7ba`; read B-05 requirements in `SPRINT-01.md`, current B-04 implementation and installed Next.js guidance.
- **Expected:** only the authorized B-05 implementation and record paths change; B-04 selection/card semantics and client-only map boundary remain reusable; no dependency or excluded path change is needed.
- **Observed:** B-04 commit `addc7ba` is the current delivered baseline; the user requested continuation; `app/vessel-model.ts` has one demo vessel and `app/sea-map.tsx` has one marker lifecycle; no B-05 route dataset exists.

### Post-edit checks

1. `git diff --check` — no whitespace errors.
2. `npx tsc --noEmit` — strict type-check; Node 24 compatibility is not claimed when the environment reports another runtime.
3. `npm run build` — client-only map composition builds without SSR/browser-global errors.
4. `npm ls --depth=0` — dependency tree remains unchanged.
5. Targeted source/data checks — allowed paths only; exactly three IDs/markers; 8–12 explicit points per route; all points in bounds; literal finite speeds; first-point coordinates; initial course/source/name; marker attributes and per-marker listener cleanup; no B-06/B-07 behavior or unexpected paths.
6. `npm run dev` — server binds to the existing loopback address when no pre-existing server occupies it; do not stop a server not started by this task.
7. Browser/manual check when a browser runtime is available — direct open, three marker elements, click each marker and inspect matching card, repeated click, map click, static positions and icon attributes. If unavailable, record DOM/visual acceptance as `UNKNOWN`/`BLOCKED`; HTTP/build checks are supplemental.

- **Expected result:** executed checks pass, or exact failures/limitations are recorded as `FAIL`/`BLOCKED`/`UNKNOWN`.
- **Evidence sources:** command output, component/model diff, route data inspection, live DOM attributes/card text if available, manual checklist if available, and environment details.

## Checkpoint and stop conditions

- **Checkpoint:** after implementation checks and human diff review, append B-05 evidence and RUNBOOK handoff; create a checkpoint record only if the slice is accepted and the path is authorized by the applicable decision convention.
- **Stop before implementation if:** an unapproved dependency/architecture or path outside this contract is required, or B-06+ behavior is needed.
- **Stop after implementation if:** type-check/build fails, route bounds/cardinality are wrong, a marker is not selectable, marker cleanup is absent, B-04 selection/card behavior regresses, or the diff contains unexpected paths.
- **Exit decision:** `DONE` only after evidence and human review; otherwise `CONTINUE WITH APPROVAL` or `HOLD`.

## Risks and open questions

- Current environment previously reported Node.js `v22.16.0`, while the R1 baseline is Node.js 24; compatibility remains `Needs verification` until checked in the current session.
- Browser/manual visual verification may remain unavailable; no automated browser claim may replace it.
- OSM tiles require network access; build success does not prove tile availability.
- Initial course literals must remain consistent with the first route segment; route azimuth calculation and movement are explicitly deferred to B-06.
- Product metrics, AISStream availability, architecture beyond R1 and S2/S3 remain `Unknown`/`Waiting for MVP input`.

## Rollback / recovery

If B-05 is rejected or a check fails, restore only `app/vessel-model.ts`, `app/sea-map.tsx` and the task-contract state to the B-04 delivered baseline at `addc7ba` after inspecting the diff; preserve append-only `EVIDENCE.md` and `RUNBOOK.md` history and excluded untracked inputs. Do not reset the shared branch or rewrite prior evidence.

## Handoff

At the end of this slice, record:

- actual changed files;
- commands and manual checks actually run with status;
- new evidence ID and limitations;
- unresolved Unknowns and blockers;
- rollback/recovery path;
- human decision `continue`, `revise` or `HOLD`;
- next bounded session: `R1-B06-MOTION` only after accepted B-05.
