# TASK_SPEC.md — bounded task contract

- **ID:** `TASK-SEA-R1-B06-001`
- **Version:** `1.0.0`
- **Status:** `Active`
- **Product owner:** методист відділення теорії судноводіння навчального центру «Норд-Вест»
- **Delivery / technical owner:** виконавець проєкту
- **Date:** 2026-09-22
- **Related artifacts:** [`CLAUDE.md`](CLAUDE.md), [`SPEC.md`](SPEC.md), [`SPRINT-01.md`](SPRINT-01.md), [`EVIDENCE.md`](EVIDENCE.md), [`RUNBOOK.md`](RUNBOOK.md), [`docs/decisions/DEC-002-r1-stack.md`](docs/decisions/DEC-002-r1-stack.md)

## Goal and linked outcome

- **Goal:** додати bounded рух трьох demo-суден по їхніх уже погоджених literal маршрутах із передбачуваною зупинкою на останній точці.
- **Backlog:** `B-06` / `R1-B06-MOTION`.
- **SPEC outcome:** `SPEC-SEA-001 / R1 map and demonstration vessels`.
- **Predecessor:** `TASK-SEA-R1-B05-001` / B-05 demo routes; користувач явно надав рішення `continue` після commit `70fbf29`.
- **Desired behavior:** кожні 2000 мс усі demo-судна переходять до наступної точки; курс стає азимутом поточного відрізка; вибрана картка отримує той самий оновлений стан; після прибуття на останню точку швидкість стає `0` і стан більше не змінюється.

## Owner and allowed paths

- **Product owner:** методист відділення теорії судноводіння навчального центру «Норд-Вест» — приймає межі та outcome.
- **Delivery / technical owner:** виконавець проєкту — реалізує bounded slice, запускає перевірки, веде evidence і handoff.
- **Planning path:** `TASK_SPEC.md`.
- **Implementation paths:**
  - `app/sea-map.tsx`
  - `app/map-shell.tsx`
- **Append-only records:** `EVIDENCE.md` і `RUNBOOK.md` можна змінювати лише додаванням фактичного результату після перевірок.
- **Excluded paths:** `app/vessel-model.ts`, `app/map-config.ts`, `app/vessel-card.tsx`, `app/page.tsx`, `app/layout.tsx`, `app/globals.css`, `package.json`, `package-lock.json`, `reference/`, `.agents/`, `.claude/`, `skills-lock.json`, `TASK_INITIAL.md`, `TASK_DECOMPOSE.md`, `docs/checkpoints/`, `SPEC.md`, S2/S3 plans, tests, secrets and unrelated files.

## Inputs and constraints

- **Inputs:** approved `SPEC.md` and `SPRINT-01.md` B-06 contract; accepted B-05 implementation at `70fbf29`; existing literal route data in `app/vessel-model.ts`; installed Next.js guidance read before implementation.
- **Explicit authorization:** user requested implementation of only B-06 after reviewing B-05 and choosing `continue`.
- **Stack baseline:** Node.js 24; TypeScript strict; Next.js App Router + React; Leaflet 1.9.x; npm lock-file. No dependency changes are authorized.
- **Tick:** exactly `2000` ms; one interval for the map lifecycle, not one timer per vessel; no timer accumulation across renders or hot reload; clear interval on unmount.
- **Motion:** use each vessel's existing literal route; move one route index per tick; initial state is the first route point; do not mutate the shared literal dataset.
- **Course:** initial literal course remains unchanged; on arrival at route index `i > 0`, set `courseDeg` to the great-circle azimuth from route point `i - 1` to `i`, normalized to `[0, 360)`; retain the last segment course at the final point.
- **Time and speed:** motion timestamps use the real browser time; each tick's updated vessels share that tick timestamp; on the tick that reaches the last point set `speedKnots` to numeric `0`; later ticks do not update finished vessels.
- **Shared selected state:** marker position/course and the selected card must be updated from the same per-tick vessel snapshot; selection behavior from B-04 remains unchanged.
- **Leaflet boundary:** preserve the existing client-only dynamic import and map/marker cleanup lifecycle. Marker DOM attributes remain `data-vessel-id` and `data-icon="course"|"neutral"`.

## Expected output

A minimal B-06 slice that:

1. keeps B-05 literal routes and the shared `Vessel` shape unchanged;
2. advances all three demo vessels once per 2000 ms interval;
3. updates marker position, course glyph and marker attributes from each current snapshot;
4. forwards each changed snapshot so the selected B-04 card reflects the same coordinates, course, timestamp and speed;
5. stops each vessel at its last literal route point with `speedKnots: 0` and no further state changes;
6. clears the single interval and all existing map resources during unmount;
7. contains no pause, rewind, loop, AIS, API, search, new dependency, Playwright test or B-07 behavior.

## Acceptance criteria

- [ ] The interval period is exactly `2000` ms and one lifecycle owns it; cleanup calls `clearInterval` and does not leave timers after unmount.
- [ ] Each tick moves every unfinished demo vessel to exactly its next literal route point; no interpolation, random route, loop or rewind is introduced.
- [ ] Each moved vessel's `courseDeg` is the normalized great-circle azimuth of the segment just traversed; the final tick preserves that course and changes speed to numeric `0`.
- [ ] Finished vessels remain at their final point with speed `0` and receive no further movement updates.
- [ ] Marker coordinates and icon orientation/attributes reflect the current vessel snapshot.
- [ ] If a vessel is selected, its card receives the same snapshot as its marker and updates through the final stop.
- [ ] B-04 repeated selection and map-click persistence remain intact; no close button is added.
- [ ] No excluded path, dependency, test framework, AIS/API behavior, pause, rewind, loop, search or B-07 behavior is introduced.
- [ ] `EVIDENCE.md` and `RUNBOOK.md` contain only actual B-06 results and limitations after verification.
- [ ] Human diff review confirms `continue`, `revise` or `HOLD` before B-07.

**Current acceptance status:** `Implementation and automated/source checks PASS; npm run dev is BLOCKED by the pre-existing port listener; browser/manual motion acceptance is UNKNOWN/BLOCKED; Node.js 24 compatibility is Needs verification; final human B-06 diff review is pending.`

## Verification

### Pre-edit checks

- **Commands:** `git status --short`; `git show --stat 70fbf29`; read `CLAUDE.md`, `SPEC.md`, `SPRINT-01.md`, current `TASK_SPEC.md`, latest `EVIDENCE.md` including `E-SEA-013`, latest `RUNBOOK.md` handoff, current B-05 source and installed Next.js guidance.
- **Expected:** only the new B-06 contract is changed before implementation; existing B-05 route literals and B-04 selection/card boundary are understood; no dependency or excluded path is needed.
- **Observed:** pre-edit tree contained only the previously recorded excluded untracked inputs; B-05 commit `70fbf29` contains the route dataset and marker loop; motion is absent; Next.js client/lazy-loading guidance was read.

### Post-edit checks

1. `git diff --check` — no whitespace errors.
2. `npx tsc --noEmit` — strict type-check.
3. `npm run build` — client-only map composition builds without SSR/browser-global errors.
4. `npm ls --depth=0` — direct dependency tree remains unchanged.
5. Targeted source checks — exactly one `2000` ms interval; interval cleanup; route-index advancement; azimuth formula; final speed `0`; marker updates; selected-card update callback; absence of pause/rewind/loop/AIS/API/search/test behavior; allowed paths only.
6. `npm run dev` — start only if `127.0.0.1:3000` is free; do not stop a server not started by this task.
7. Browser/manual check when a browser runtime is available — observe at least two ticks, marker movement/course, selected-card updates and final `0 kn` stop; inspect hot reload timer behavior and unmount cleanup. If unavailable, record browser acceptance as `UNKNOWN`/`BLOCKED`; source/build checks do not replace it.

- **Expected result:** executed checks pass, or exact failures/limitations are recorded as `FAIL`/`BLOCKED`/`UNKNOWN`.
- **Evidence sources:** command output, B-06 source diff, targeted motion checks, live DOM/card observations if available, and environment details.

## Checkpoint and stop conditions

- **Checkpoint:** after implementation checks and human diff review, append B-06 evidence and RUNBOOK handoff; do not create a checkpoint record unless the path is authorized by the applicable decision convention.
- **Stop before implementation if:** an unapproved dependency/architecture or path outside this contract is required, or B-07 behavior is needed.
- **Stop after implementation if:** type-check/build fails, interval cleanup is absent, a vessel skips/loops route points, azimuth/final speed is wrong, selected card diverges, B-04 selection regresses, or unexpected paths appear.
- **Exit decision:** `DONE` only after evidence and human review; otherwise `CONTINUE WITH APPROVAL` or `HOLD`.

## Risks and open questions

- Browser/manual visual verification may remain unavailable; source checks cannot prove rendered movement or unmount cleanup.
- Current runtime may be below the Node.js 24 R1 baseline; compatibility remains `Needs verification` until checked in the current session.
- OSM tiles require network access; build success does not prove tile availability.
- Controlled-time automated motion tests are explicitly deferred; B-06 motion evidence is manual/source-level only.
- Product metrics, AISStream availability, architecture beyond R1 and S2/S3 remain `Unknown`/`Waiting for MVP input`.

## Rollback / recovery

If B-06 is rejected or a check fails, inspect the diff and restore only `TASK_SPEC.md`, `app/sea-map.tsx` and `app/map-shell.tsx` to the B-05 delivered state at `70fbf29`; preserve append-only `EVIDENCE.md` and `RUNBOOK.md` history and excluded untracked inputs. Do not reset the shared branch or rewrite prior evidence.

## Handoff

At the end of this slice, record:

- actual changed files;
- commands and manual checks actually run with status;
- new evidence ID and limitations;
- unresolved Unknowns and blockers;
- rollback/recovery path;
- human decision `continue`, `revise` or `HOLD`;
- next bounded session: `R1-B07-PLAYWRIGHT-SELECTION` only after accepted B-06.
