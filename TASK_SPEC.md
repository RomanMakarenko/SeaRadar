# TASK_SPEC.md — bounded task contract

- **ID:** `TASK-SEA-R1-B07-001`
- **Version:** `1.1.0`
- **Status:** `Verified`
- **Product owner:** методист відділення теорії судноводіння навчального центру «Норд-Вест»
- **Delivery / technical owner:** виконавець проєкту
- **Date:** 2026-09-22
- **Related artifacts:** [`CLAUDE.md`](CLAUDE.md), [`SPEC.md`](SPEC.md), [`SPRINT-01.md`](SPRINT-01.md), [`EVIDENCE.md`](EVIDENCE.md), [`RUNBOOK.md`](RUNBOOK.md), [`docs/decisions/DEC-002-r1-stack.md`](docs/decisions/DEC-002-r1-stack.md), [`docs/decisions/DEC-005-r1-node22.md`](docs/decisions/DEC-005-r1-node22.md), [`f215aae`](https://github.com/RomanMakarenko/SeaRadar/commit/f215aae)

## Goal and linked outcome

- **Goal:** додати єдиний Playwright Test runner і відтворювану browser-перевірку B-04/B-05 вибору demo-суден без мережевої залежності OSM tiles.
- **Backlog:** `B-07` / `R1-B07-PLAYWRIGHT-SELECTION`.
- **SPEC outcome:** `SPEC-SEA-001 / R1 map and demonstration vessels`.
- **Predecessor:** `TASK-SEA-R1-B06-001`; commit `f215aae`; human decision `continue` за `E-SEA-015`.
- **Desired behavior:** один Playwright browser project запускає dev server зі своєї конфігурації; тест знаходить три marker elements за `data-vessel-id`, клікає кожен, перевіряє matching card id, перевіряє persistence при повторному кліку та блокує OSM tile requests.

## Owner and allowed paths

- **Product owner:** методист відділення теорії судноводіння навчального центру «Норд-Вест» — приймає межі та outcome.
- **Delivery / technical owner:** виконавець проєкту — реалізує bounded slice, запускає перевірки, веде evidence і handoff.
- **Planning path:** `TASK_SPEC.md`.
- **Implementation paths:**
  - `package.json`
  - `package-lock.json`
  - `playwright.config.ts`
  - `tests/vessel-selection.spec.ts`
  - `.gitignore`
- **Append-only records:** `EVIDENCE.md` і `RUNBOOK.md` можна змінювати лише додаванням фактичного результату після перевірок.
- **Excluded paths:** `app/`, `reference/`, `.agents/`, `.claude/`, `skills-lock.json`, `TASK_INITIAL.md`, `TASK_DECOMPOSE.md`, `NEXT_SESSION.md`, `SPEC.md`, `SPRINT-01.md`, `docs/`, secrets and unrelated files. Product behavior from B-06 must remain unchanged.

## Inputs and constraints

- **Inputs:** approved `SPEC.md` and `SPRINT-01.md` B-07 contract; accepted B-06 implementation at `f215aae`; existing Next.js App Router and client-only Leaflet boundary; installed Next.js Playwright guidance read before implementation.
- **Explicit authorization:** user requested continuation of only B-07 from `NEXT_SESSION.md`; after human review, commit and push were authorized and completed for the verified delivery.
- **Stack baseline:** Node.js 22; TypeScript strict; Next.js App Router + React; Leaflet 1.9.x; Playwright Test as the only test runner. `@playwright/test` is the one dependency required by this B-07 stack slice; no other dependency is authorized.
- **Runner:** Playwright Test configuration must declare exactly one browser project. The project must use Chromium only and must not add Firefox/WebKit projects or another test framework.
- **Server:** `webServer` in `playwright.config.ts` must launch the configured `npm run dev` command on `http://127.0.0.1:3000`, with `reuseExistingServer: true` so a pre-existing listener is not stopped or replaced. The test must use the configured `baseURL`.
- **Network isolation:** each test must block requests to `https://tile.openstreetmap.org/**` before navigation. The test must assert that no OSM tile request reaches the server; blocked requests are expected and are not a test failure.
- **Selection checks:** locate exactly three elements using `[data-vessel-id]`; collect their ids and assert `demo-1`, `demo-2`, `demo-3` once each. Clicking each marker must expose `[data-vessel-card-id="<id>"]`. Clicking the same marker again must leave the matching card visible.
- **Motion boundary:** do not wait for or assert motion, controlled time, route advancement, final stop, course changes or timer behavior. Existing B-06 motion code is out of scope and must not be edited.
- **Scope boundary:** no visual regression, screenshot assertions, AIS/API/search/pause/rewind/loop behavior, extra browser projects, extra test runners, unrelated dependency or product changes.

## Expected output

A minimal B-07 slice that:

1. adds Playwright Test as the required single test runner dependency and no other dependency;
2. configures one Chromium browser project and a `webServer` for the existing `npm run dev` command;
3. adds one focused selection spec covering three markers, matching card ids and repeated-click persistence;
4. blocks and verifies OSM tile requests without changing the product map or B-06 behavior;
5. keeps generated test output ignored and changes only the explicitly allowed paths plus append-only evidence/history after verification.

## Acceptance criteria

- [x] `playwright.config.ts` has exactly one browser project, Chromium only, configured `baseURL`, and a `webServer` that starts `npm run dev`.
- [x] The targeted Playwright command runs through Playwright Test only and passes with one browser project.
- [x] The test finds exactly three `[data-vessel-id]` elements and verifies ids `demo-1`, `demo-2`, `demo-3`.
- [x] Each demo marker click reveals the card with the same `data-vessel-card-id`.
- [x] A repeated click on the same demo marker leaves its matching card visible.
- [x] OSM tile requests are intercepted/aborted before navigation and the test verifies that the blocked request was observed.
- [x] No B-06 motion assertions, controlled-time helpers, visual regression or unrelated behavior is introduced.
- [x] No test runner other than Playwright Test and no dependency other than `@playwright/test` is added.
- [x] `EVIDENCE.md` and `RUNBOOK.md` contain only actual B-07 results and limitations after verification.
- [x] Human diff review chooses `continue`, `revise` or `HOLD` before any later task or commit.

**Current acceptance status:** `B-07 verified; human diff review decision is continue; commit and push are authorized.`

## Verification

### Pre-edit checks

- **Commands:** `git status --short`; `git log -2 --oneline --decorate`; `git show --stat f215aae`; read `CLAUDE.md`, `SPEC.md`, `SPRINT-01.md`, latest `EVIDENCE.md` entries `E-SEA-014`/`E-SEA-015`, latest two `RUNBOOK.md` entries, current app boundary and installed Next.js Playwright guidance.
- **Expected:** B-06 is the accepted baseline; only the B-07 contract changes before product/test implementation; no browser test files or Playwright dependency currently exist.
- **Observed:** completed before this contract update; B-06 is at `f215aae` locally and on `origin/sprint1`; pre-existing excluded untracked inputs remain; no Playwright test/config was present; existing direct dependency tree has no `@playwright/test`.

### Post-edit checks

1. `git diff --check` — no whitespace errors.
2. `npx tsc --noEmit` — strict application and config type-check if the config is included by the repository setup.
3. `npm run build` — B-06 product build remains green.
4. `npm ls --depth=0` — only the authorized Playwright dependency change is present; no unrelated dependency is added.
5. Targeted source/config checks — exactly one Playwright browser project, Chromium only, configured dev server/base URL, three-id/card assertions, tile route interception, no forbidden behavior or excluded paths.
6. Browser installation if needed: `npx playwright install chromium`; record actual result and environment. Do not install Firefox/WebKit.
7. Targeted Playwright command: `npx playwright test tests/vessel-selection.spec.ts`; record full actual output.
8. Tile-block verification: rely on the test's observed intercepted OSM request and zero fulfilled OSM tile requests; record actual assertion output.
9. Browser/manual demo gate only if a browser runtime is available; do not claim manual acceptance from source checks or Playwright headless output alone.

- **Expected result:** all executed checks pass, or exact failures/limitations are recorded as `FAIL`/`BLOCKED`/`UNKNOWN`.
- **Evidence sources:** command output, Playwright config/spec, dependency tree, test report and browser/runtime details.

### Observed result

- `git diff --check`, `npx tsc --noEmit`, `npm run build`, `npm ls --depth=0`, structural/config scope validation, `npx playwright test --list`, Chromium installation and `npx playwright test tests/vessel-selection.spec.ts` all passed. The targeted test reported `1 passed (2.8s)` with one `[chromium]` project and asserted blocked OSM requests with zero completed tile requests.
- `lsof` showed the pre-existing Node PID `79575` listening on `127.0.0.1:3000`; Playwright reused it through `reuseExistingServer: true`. Supplemental `curl` returned `HTTP 200 text/html; charset=utf-8`. No product file under `app/` changed.
- Current limitations: the B-07 checks were executed on Node.js `v22.23.2`; B-06 manual movement, course, final-stop, hot-reload and unmount checks remain `UNKNOWN`/`BLOCKED`; no fresh dev server was started or stopped. These do not block the B-07 automated selection slice.

## Checkpoint and stop conditions

- **Checkpoint:** after implementation checks and human diff review, append only actual B-07 evidence and RUNBOOK handoff; do not create a checkpoint record unless separately authorized.
- **Stop before implementation if:** Playwright requires an unapproved dependency/architecture or a path outside this contract, or product code must change to make the selection test pass.
- **Stop after implementation if:** type-check/build/test fails, more than one browser project or test runner appears, tiles are not blocked, card selection mismatches, repeated click closes the card, B-06 product paths change, or unexpected paths appear.
- **Exit decision:** `DONE` only after evidence and human review; otherwise `CONTINUE WITH APPROVAL` or `HOLD`.

## Risks and open questions

- Browser binaries may be unavailable or incompatible with the current environment; targeted test status must remain `BLOCKED`/`UNKNOWN` if installation or launch cannot be completed.
- The current runtime is the approved Node.js 22 R1 baseline; no Node.js 24 compatibility claim is required.
- A pre-existing `127.0.0.1:3000` listener may be reused by Playwright; its provenance and freshness are not established by this task.
- Headless Playwright selection checks do not replace manual visual acceptance of movement, course orientation, final stop, hot reload or unmount cleanup; those B-06 limitations remain.
- Product metrics, AISStream availability, architecture beyond R1 and S2/S3 remain `Unknown`/`Waiting for MVP input`.

## Rollback / recovery

If B-07 is rejected or a check fails, inspect the diff and restore only `TASK_SPEC.md`, `package.json`, `package-lock.json`, `playwright.config.ts`, `tests/vessel-selection.spec.ts` and `.gitignore` to the B-06 delivered state at `f215aae`; preserve append-only evidence/history and excluded untracked inputs. Do not reset the shared branch, remove the pre-existing server, or delete unrelated generated/local files without authorization.

## Handoff

Current handoff:

- **Changed files:** `TASK_SPEC.md`, `package.json`, `package-lock.json`, `.gitignore`, `playwright.config.ts`, `tests/vessel-selection.spec.ts`, plus append-only `EVIDENCE.md` and `RUNBOOK.md`.
- **Checks:** `git diff --check`, `npx tsc --noEmit`, `npm run build`, `npm ls --depth=0`, structural/config validator, Playwright list, Chromium install, targeted Playwright test and loopback HTTP check — `PASS`.
- **Evidence:** `E-SEA-016`; B-07 checks ran on the approved Node.js 22 runtime; B-06 visual/manual limitations remain `UNKNOWN`/`BLOCKED`.
- **Rollback:** restore the B-07 paths to `f215aae` only after inspecting the diff; preserve append-only history and excluded untracked inputs; do not reset the branch or stop the pre-existing server.
- **Human decision:** `continue`; the current diff review found no scope, correctness or test-boundary blockers.
- **Delivery:** verified B-07 commit `c89127f` is pushed to `origin/sprint1`.
- **Next bounded action:** human review of the delivered commit; no automatic transition to S2/S3.
