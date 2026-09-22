# TASK_SPEC.md — bounded task contract

- **ID:** `TASK-SEA-R1-B03-001`
- **Version:** `1.1.0`
- **Status:** `Active`
- **Product owner:** методист відділення теорії судноводіння навчального центру «Норд-Вест»
- **Delivery / technical owner:** виконавець проєкту
- **Date:** 2026-09-22
- **Related artifacts:** [`CLAUDE.md`](CLAUDE.md), [`SPEC.md`](SPEC.md), [`SPRINT-01.md`](SPRINT-01.md), [`EVIDENCE.md`](EVIDENCE.md), [`RUNBOOK.md`](RUNBOOK.md), [`docs/decisions/DEC-002-r1-stack.md`](docs/decisions/DEC-002-r1-stack.md), [`docs/decisions/DEC-003-r1-handoff.md`](docs/decisions/DEC-003-r1-handoff.md)

## Goal and linked outcome

- **Goal:** показати одне коректно описане демонстраційне судно на карті Дуврської протоки зі значком, орієнтованим за курсом або нейтральним, якщо курс невідомий.
- **Backlog:** `B-03` / `R1-B03-VESSEL-MODEL`.
- **SPEC outcome:** `SPEC-SEA-001 / R1 map foundation`.
- **Predecessor:** `TASK-SEA-R1-B02-001` / B-02 map slice. Цей контракт supersedes the predecessor for the active bounded slice; B-02 evidence/history remain append-only.
- **Desired behavior:** одна спільна структура `Vessel` описує demo/AIS судно; один статичний demo marker розміщується в межах `MAP_CONFIG.bounds`; джерело явно показане як `Демонстраційні дані`.

## Owner and allowed paths

- **Product owner:** методист відділення теорії судноводіння навчального центру «Норд-Вест» — приймає межі та outcome.
- **Delivery / technical owner:** виконавець проєкту — реалізує bounded slice, запускає перевірки, веде evidence і handoff.
- **Planning path:** `TASK_SPEC.md`.
- **Implementation paths:**
  - `app/vessel-model.ts`
  - `app/sea-map.tsx`
  - `app/map-shell.tsx`
  - `app/globals.css`
- **Append-only records:** `EVIDENCE.md` і `RUNBOOK.md` можна змінювати лише додаванням фактичного результату після перевірок.
- **Excluded paths:** `reference/`, `.agents/`, `.claude/`, `skills-lock.json`, `TASK_INITIAL.md`, `TASK_DECOMPOSE.md`, `docs/checkpoints/`, `SPEC.md`, `SPRINT-01.md`, `app/page.tsx`, `app/map-config.ts`, `app/layout.tsx`, package files, S2/S3 plans, secrets and unrelated files.

## Inputs and constraints

- **Inputs:** approved `SPEC.md` and `SPRINT-01.md` B-03 contract; existing B-02 map implementation; R1 stack decision `DEC-002-r1-stack.md`; current `sprint1` branch; B-02 evidence and limitations.
- **Explicit authorization:** product owner authorized transition to the next bounded task after B-02 human review decision `continue`.
- **Stack baseline:** Node.js 24; TypeScript strict; Next.js App Router + React; Leaflet 1.9.x; OpenStreetMap Standard; npm lock-file.
- **Vessel model:** `id: string`; `name: string | null`; `lat`, `lon`; `speedKnots: number | null`; `courseDeg: number | null` in `[0, 360)` representing movement course; `timestamp: string` containing ISO 8601 with timezone; `source: "demo" | "aisstream"`. Empty name normalizes to `null`; numeric zero and `null` remain distinct.
- **Demo data:** exactly one deterministic vessel for this slice, with id `demo-1`, literal values, source `demo`, coordinate inside the configured bounds, and no route or movement state.
- **Icon contract:** rendered marker exposes `data-vessel-id="<id>"` and `data-icon="course"|"neutral"`. A numeric course uses the course glyph; `null` uses a neutral circular glyph. Rotate only a child glyph, never Leaflet's outer positioning element.
- **Source label:** visible exact text `Демонстраційні дані` with `data-source="demo"`.
- **Non-goals:** movement, timers, routes, three vessels, cards, AIS data, buttons, API/server logic, data fetching, Playwright, future placeholders, or new dependencies.
- **Network boundary:** map tiles may require external network during manual verification; build must not depend on tile availability.

## Expected output

A minimal B-03 slice that:

1. defines the approved shared vessel model and one literal demo vessel;
2. preserves the existing client-only Leaflet lifecycle and map configuration;
3. adds exactly one static Leaflet marker with the required test attributes;
4. renders course/neutral glyph styling without corrupting Leaflet marker positioning;
5. displays the exact demonstration source label;
6. cleans up the marker with the existing map instance on unmount;
7. contains no B-04+ product behavior.

## Acceptance criteria

- [x] `Vessel` contains all approved fields and `DEMO_VESSEL` has valid literal values — source check passed.
- [x] Demo coordinates are within `MAP_CONFIG.bounds`; exactly one demo marker is created — source/bounds check passed.
- [ ] The marker is visible on the map and has `data-vessel-id="demo-1"` — live browser DOM remains unverified.
- [ ] The marker has `data-icon="course"` for a numeric course or `data-icon="neutral"` for `courseDeg === null`; the visible glyph matches that state and course orientation — source branch passed, visual state remains unverified.
- [ ] The exact visible source label is `Демонстраційні дані` and is marked `data-source="demo"` — source/HTML markup passed, live browser visibility remains unverified.
- [x] Marker and related DOM/listeners are cleaned up with map unmount; no timer or movement logic exists — source check passed.
- [x] No card, route, second vessel, AIS, button, server/API logic, test framework, dependency, or excluded path is introduced — scope check passed.
- [x] `EVIDENCE.md` and `RUNBOOK.md` contain only actual B-03 results and limitations — `E-SEA-010` and handoff appended.
- [ ] Human diff review confirms `continue`, `revise` or `HOLD` before B-04.

**Current acceptance status:** `Implementation and automated/source checks verified; browser visual acceptance is UNKNOWN/BLOCKED, Node.js 24 compatibility is Needs verification, and final human diff review is pending.`

## Verification

### Pre-edit checks

- **Commands:** `git status --short`; inspect B-02 implementation and current task contract; read B-03 requirements in `SPRINT-01.md`.
- **Expected:** only the authorized B-03 implementation and record paths change; no package or excluded path changes.
- **Observed:** B-02 map implementation exists on `sprint1`; no vessel model or marker source existed before this slice; the previous B-02 task contract was superseded by this contract before implementation.

### Post-edit checks

1. `git diff --check` — no whitespace errors.
2. `npx tsc --noEmit` — strict type-check; Node 24 compatibility is not claimed when the environment reports another runtime.
3. `npm run build` — client-only Leaflet lifecycle still builds without SSR/browser-global errors.
4. Targeted source/scope checks — valid model fields, exactly one demo literal/marker, coordinate bounds, required attributes/source text, and absence of B-03+ behavior or unexpected paths.
5. `npm run dev` — server binds to the existing loopback address.
6. Browser/manual check when a browser runtime is available — direct open, visible vessel within bounds, icon state/orientation, exact source label, and no visible map artifact.
7. If browser runtime is unavailable, record visual acceptance as `UNKNOWN`/`BLOCKED`; HTTP/build/tile checks are supplemental and are not visual acceptance.

- **Expected result:** executed checks pass, or exact failures/limitations are recorded as `FAIL`/`BLOCKED`/`UNKNOWN`.
- **Evidence sources:** command output, model/source diff, map DOM attributes, manual checklist if available, and environment details.

## Checkpoint and stop conditions

- **Checkpoint:** after implementation checks and human diff review, append B-03 evidence and RUNBOOK handoff; create a checkpoint record only if the slice is accepted and the path is authorized by the applicable decision convention.
- **Stop before implementation if:** an unapproved dependency/architecture or path outside this contract is required, or B-04+ behavior is needed.
- **Stop after implementation if:** build/type-check fails, Leaflet is no longer client-only, more than one marker is introduced, required attributes/source label are absent, or the diff contains unexpected paths.
- **Exit decision:** `DONE` only after evidence and human review; otherwise `CONTINUE WITH APPROVAL` or `HOLD`.

## Risks and open questions

- Current environment previously reported Node.js `v22.16.0`, while the R1 baseline is Node.js 24; compatibility remains `Needs verification` until checked in the current session.
- Browser/manual visual verification may remain unavailable; no automated browser claim may replace it.
- OSM tiles require network access; build success does not prove tile availability.
- Exact demo literals are implementation-owned within the approved schema; they must remain deterministic and inside configured bounds.
- Product metrics, AISStream availability, architecture beyond R1 and S2/S3 remain `Unknown`/`Waiting for MVP input`.

## Rollback / recovery

If B-03 is rejected or a check fails, restore the last accepted B-02 commit by reverting only the B-03 implementation paths and task-contract state after inspecting the diff; preserve append-only `EVIDENCE.md` and `RUNBOOK.md` history and excluded untracked inputs. Do not delete or rewrite prior evidence.

## Handoff

At the end of this slice, record:

- actual changed files;
- commands and manual checks actually run with status;
- new evidence ID and limitations;
- unresolved Unknowns and blockers;
- rollback/recovery path;
- human decision `continue`, `revise` or `HOLD`;
- next bounded session: `R1-B04-VESSEL-CARD` only after accepted B-03.
