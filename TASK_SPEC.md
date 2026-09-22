# TASK_SPEC.md — bounded task contract

- **ID:** `TASK-SEA-R1-B02-001`
- **Version:** `1.0.0`
- **Status:** `Active`
- **Product owner:** методист відділення теорії судноводіння навчального центру «Норд-Вест»
- **Delivery / technical owner:** виконавець проєкту
- **Date:** 2026-09-22
- **Related artifacts:** [`CLAUDE.md`](CLAUDE.md), [`SPEC.md`](SPEC.md), [`SPRINT-01.md`](SPRINT-01.md), [`EVIDENCE.md`](EVIDENCE.md), [`RUNBOOK.md`](RUNBOOK.md), [`docs/checkpoints/CHECKPOINT-01.md`](docs/checkpoints/CHECKPOINT-01.md), [`docs/decisions/DEC-002-r1-stack.md`](docs/decisions/DEC-002-r1-stack.md), [`docs/decisions/DEC-003-r1-handoff.md`](docs/decisions/DEC-003-r1-handoff.md), [`docs/decisions/DEC-004-checkpoint-convention.md`](docs/decisions/DEC-004-checkpoint-convention.md)

## Goal and linked outcome

- **Goal:** показати стабільну клієнтську карту Дуврської протоки на всю доступну область.
- **Backlog:** `B-02` / `R1-B02-MAP`.
- **SPEC outcome:** `SPEC-SEA-001 / R1 map foundation`.
- **Predecessor:** B-01 scaffold exists on branch `sprint1`; E-SEA-007 records targeted scaffold checks, while the B-01 `next build`, Node.js 24 compatibility and human diff review remain unresolved limitations.
- **Desired behavior:** Leaflet завантажується лише на клієнті, карта використовує OSM Standard з атрибуцією, район і початковий вид беруться з одного конфігураційного модуля, а пряме відкриття, оновлення та зміна розміру не створюють сірої карти або артефактів.

## Owner and allowed paths

- **Product owner:** методист відділення теорії судноводіння навчального центру «Норд-Вест» — приймає межі та outcome.
- **Delivery / technical owner:** виконавець проєкту — реалізує bounded slice, запускає перевірки, веде evidence і handoff.
- **Planning path:** `TASK_SPEC.md`.
- **Implementation paths:**
  - `package.json`
  - `package-lock.json`
  - `tsconfig.json`
  - `.gitignore`, лише для потрібних Node/Next/Leaflet generated files
  - `app/layout.tsx`
  - `app/page.tsx`
  - `app/globals.css`
  - `app/map-config.ts`
  - `app/map-shell.tsx`
  - `app/sea-map.tsx`
- **Conditional path:** `CLAUDE.md` не редагувати вручну. Збережений Next.js-managed `nextjs-agent-rules` блок є попередньо погодженим generated exception; інші зміни не дозволені.
- **Append-only records:** `EVIDENCE.md` і `RUNBOOK.md` можна змінювати лише додаванням фактичного результату після перевірок.
- **Excluded paths:** `reference/`, `.agents/`, `.claude/`, `skills-lock.json`, `TASK_INITIAL.md`, `TASK_DECOMPOSE.md`, `docs/checkpoints/`, `SPEC.md`, S2/S3 plans, secrets and unrelated files.

## Inputs and constraints

- **Inputs:** approved `SPEC.md`; B-02 contract in `SPRINT-01.md`; R1 stack decision `DEC-002-r1-stack.md`; current `sprint1` branch; B-01 evidence and review findings.
- **Explicit authorization:** product owner requested transition to B-02 after B-01 build/diff review.
- **Stack baseline:** Node.js 24; TypeScript 6.x with `strict`; Next.js App Router + React; Leaflet 1.9.x; OpenStreetMap Standard; npm lock-file.
- **B-01 corrections in this slice:** pin dev server to `127.0.0.1:3000`; declare Node.js 24 and align `@types/node` with the declared runtime. These corrections are limited to the review findings and do not add product behavior.
- **Map constants:** bounds southwest `[50.75, 0.95]`, northeast `[51.25, 1.95]`; initial center `[51.00, 1.45]`; zoom `10`; tile URL `https://tile.openstreetmap.org/{z}/{x}/{y}.png`; attribution `© OpenStreetMap contributors`.
- **Constraints:** Leaflet must not be evaluated during server rendering; create and remove exactly one map instance per mounted component; resize must call `invalidateSize`; no vessel, marker, motion, card, AIS, button, API/server logic, Playwright or future placeholder.
- **Network boundary:** map tiles may require external network during manual verification; build must not depend on tile availability.
- **Governance constraint:** do not claim manual map acceptance until direct open, refresh and resize observations are actually performed and recorded.

## Expected output

A minimal map slice that:

1. installs Leaflet 1.9.x and its TypeScript declarations;
2. serves the app on loopback port 3000;
3. renders a full-area Leaflet map from a client-only component;
4. uses the configured Dover Strait bounds, center and zoom;
5. renders OSM Standard tiles and visible attribution when network is available;
6. cleans up the Leaflet instance and resize listeners on unmount;
7. builds successfully without accessing browser globals during server compilation;
8. contains no B-03+ product behavior.

## In scope

- Update the B-01 runtime/command declarations identified by the review.
- Add Leaflet dependency and lock-file entries.
- Add one map configuration module.
- Add a client-only map component with lifecycle, tile layer and resize handling.
- Render the map from the root page and provide explicit full-area CSS.
- Run the B-02 checks and record actual results.

## Non-goals

- Vessel data, vessel model, markers, icons, cards or source labels.
- Motion, timers, routes, AISStream, API/server logic or data fetching.
- Buttons, controls beyond the map's required attribution and built-in navigation controls.
- Playwright, browser test files, visual regression or other test frameworks.
- S2/S3 planning or implementation.
- Deployment, publication, production readiness, performance or user-validation claims.
- Cleanup or audit of excluded untracked inputs.

## Acceptance criteria

- [x] `package.json` has Leaflet 1.9.x, matching declarations, Node.js 24 declaration and `npm run dev` pinned to `127.0.0.1:3000`.
- [x] `package-lock.json` is consistent with the manifest and no second package-manager lock-file is introduced.
- [x] Map constants exist in one configuration module and match the approved Dover Strait values exactly.
- [x] Leaflet is loaded only from client-side code; `next build` completes without `window`/Leaflet SSR errors.
- [ ] OSM Standard tile URL and `© OpenStreetMap contributors` attribution are configured and visible when tiles are available.
- [ ] The map fills the available viewport and has the configured initial center/zoom and bounds.
- [ ] Direct open and refresh show the map; resize does not leave gray, clipped or duplicated map artifacts; unmount removes the map and resize observers/listeners.
- [x] No vessels, markers, motion, cards, AIS, buttons, server/API logic or test framework is introduced.
- [x] `EVIDENCE.md` and `RUNBOOK.md` contain actual B-02 results and limitations; no planned check is presented as executed evidence.
- [ ] Human diff review confirms `continue`, `revise` or `HOLD` before B-03.

**Current acceptance status:** `Next.js-guidance review, implementation review and automated/runtime checks re-verified; browser visual acceptance remains UNKNOWN because no browser automation/runtime is available; Node.js 24 compatibility and human diff review remain pending.`

## Verification

### Pre-edit checks

- **Commands:** `git status --short`; inspect current B-01 tree; read B-02 requirements and installed Next.js guidance.
- **Expected:** only approved B-01 work and excluded untracked inputs exist; no Leaflet or map source exists.
- **Observed:** B-01 scaffold is present on `sprint1`; no Leaflet dependency or map source existed before this slice; Next.js 16 guidance confirms server components are default, browser APIs require client boundaries, and global CSS may be imported from the root layout.

### Post-edit checks

1. `npm install --save-exact --save-dev @types/leaflet@1.9.22 @types/node@24.13.6 --registry=https://registry.npmjs.org --no-audit --no-fund` — exact manifest/lock consistency.
2. `npx tsc --noEmit` — strict type-check of app and generated Next types.
3. `npm run build` — server compilation, TypeScript and static generation.
4. `git diff --check` — no whitespace errors.
5. `npm run dev` — server binds to `127.0.0.1:3000`.
6. Manual browser checklist — direct open, refresh, initial center/zoom, bounds, visible attribution, resize and cleanup behavior; record tile/network limitations.
7. Targeted scope search — no B-03+ functionality or unexpected paths.

- **Expected result:** all executed checks pass, or exact failures are recorded as `FAIL`/`BLOCKED`; Node.js 24 compatibility is not claimed while the environment reports Node.js 22.16.0.
- **Latest observed:** exact dependency normalization, `npm ls --depth=0`, `npx tsc --noEmit`, `npm run build`, `git diff --check`, targeted scope/path checks, loopback binding, direct-open/refresh HTTP requests and the OSM tile probe passed. Browser visual checks could not run because `chromium-cli`, Chromium, Chrome, Playwright and Electron are unavailable; visual map acceptance remains `UNKNOWN`.
- **Evidence sources:** command output, manifest/lock, map configuration, diff, build output and manual checklist/screenshot if available.

## Checkpoint and stop conditions

- **Checkpoint:** after build/manual checks and human diff review, append B-02 evidence and RUNBOOK handoff; create a new checkpoint record only if the slice is accepted.
- **Stop before implementation if:** Leaflet requires an unapproved architecture/dependency, a path outside this contract must change, a secret/external service is required for build, or B-03+ behavior is needed.
- **Stop after implementation if:** build fails, map is not client-only, diff contains unexpected paths, initial view/attribution is wrong, or manual resize behavior is unverified.
- **Exit decision:** `DONE` only after evidence and human review; otherwise `CONTINUE WITH APPROVAL` or `HOLD`.

## Risks and open questions

- Current environment reports Node.js `v22.16.0`, while the R1 baseline is Node.js 24; compatibility remains `Needs verification`.
- OSM tiles require network access; a successful build does not prove tile availability.
- Browser/manual visual verification is not substitutable with build output or an HTTP response.
- Leaflet version and type declarations must be recorded from the actual npm installation.
- Product metrics, AISStream availability, architecture beyond R1 and S2/S3 remain unchanged `Unknown`/`Waiting for MVP input`.

## Rollback / recovery

If B-02 is rejected or a check fails, restore only the B-02 implementation/dependency paths and the B-01 review corrections after inspecting the diff; preserve prior B-01 evidence/history and excluded untracked inputs. Do not delete or rewrite append-only records. The last accepted commit remains the recovery point until this slice is accepted.

## Handoff

At the end of this slice, record:

- actual changed files;
- commands and manual checks actually run with status;
- new evidence ID and limitations;
- unresolved Unknowns and blockers;
- rollback/recovery path;
- human decision `continue`, `revise` or `HOLD`;
- next bounded session: `R1-B03-VESSEL-MODEL` only after accepted B-02.
