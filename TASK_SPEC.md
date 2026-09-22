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

---

# TASK-SEA-R2-PLAN-001 — Sprint 2 decomposition and safe start

- **Version:** `1.0.0`
- **Status:** `Active`
- **Product owner:** методист відділення теорії судноводіння навчального центру «Норд-Вест»
- **Delivery / technical owner:** виконавець проєкту
- **Date:** 2026-09-22
- **Related artifacts:** [`CLAUDE.md`](CLAUDE.md), [`SPEC.md`](SPEC.md), [`PROJECT_BRIEF.md`](PROJECT_BRIEF.md), [`SPRINT-02.md`](SPRINT-02.md), [`EVIDENCE.md`](EVIDENCE.md), [`RUNBOOK.md`](RUNBOOK.md), [`docs/decisions/README.md`](docs/decisions/README.md), [`docs/checkpoints/CHECKPOINT-01.md`](docs/checkpoints/CHECKPOINT-01.md)

## Goal and boundary

- **Goal:** перетворити наданий `SPRINT-02.md` на послідовність малих bounded sessions із цілями, non-goals, allowed paths, observable acceptance criteria, targeted checks, evidence anchors, stop conditions і rollback/recovery.
- **Backlog:** `R2-PLANNING`; наступний bounded slice — `TASK-SEA-R2-B08-001`.
- **SPEC outcome:** `SPEC-SEA-001 / US-05…US-08`.
- **Current boundary:** цей розділ є planning/governance slice. Product code, endpoint, WebSocket, sample data, UI та secrets не змінюються.

## Governance gate

`SPRINT-02.md` зараз є staged contract input на гілці `sprint2`. Чинні `CLAUDE.md`, `SPEC.md` і `docs/decisions/README.md` все ще позначають Sprint 2 як `Waiting for MVP input`. Тому цей розділ фіксує план, але не підміняє versioned scope decision і не авторизує implementation сам по собі.

До першої implementation-зміни B-08 потрібні:

1. human diff review цього planning slice з рішенням `continue`, `revise` або `HOLD`;
2. підтвердження, що R2 scope можна авторизувати, або versioned SPEC/decision record за правилами governance;
3. окремий task contract `TASK-SEA-R2-B08-001`.

До цього моменту заборонені живий AISStream-запит, читання/створення/передача реального ключа, `.env.local`, нові залежності та product implementation.

## Owner and allowed paths

- **Planning path:** цей canonical `TASK_SPEC.md`.
- **Read-only inputs:** `CLAUDE.md`, `SPEC.md`, `PROJECT_BRIEF.md`, `SPRINT-01.md`, `SPRINT-02.md`, `docs/decisions/README.md`, `docs/checkpoints/CHECKPOINT-01.md`, останні записи `EVIDENCE.md` і `RUNBOOK.md`.
- **Append-only records after checks:** `EVIDENCE.md`, `RUNBOOK.md`.
- **No implementation paths in this slice:** `app/`, `components/`, `lib/`, `server/`, `data/`, `app/api/`, `tests/`, `.env*`, `package.json`, `package-lock.json`, `playwright.config.ts`, `.claude/settings.json`, `SPEC.md`, `CLAUDE.md`, `docs/decisions/`.
- **Excluded local inputs:** `.agents/`, `.claude/`, `reference/`, `skills-lock.json`, `NEXT_SESSION.md`, `README.pdf` and generated files. Do not delete, reset or inspect secrets in excluded paths.

## Sprint 2 bounded decomposition

Це план, а не виконані результати. Кожен рядок стає окремим task contract перед implementation. Наступний slice не поглинається попереднім без нового checkpoint/review.

| Order | Task / goal | Non-goals | Allowed output | Acceptance and evidence |
|---|---|---|---|---|
| 0 | `R2-PLANNING`: встановити governance gate, порядок залежностей і handoff. | Scope approval, код, secrets, dependency, live provider access. | Цей розділ `TASK_SPEC.md`; append-only planning evidence/runbook після перевірок. | B-08…B-13 мають окремі межі, checks, stop і rollback; конфлікт статусу S2 явно зафіксований. Structural Git/Markdown check і human diff review. |
| 1 | `B-08`: безпечна конфігурація та server-only accessor ключа. | WebSocket, route handler, live key, UI, provider request. | `.env.example`, `.gitignore`, окремо авторизовані permission rules, один server-only config module. | `.env.local` не tracked; accessor повертає missing-key без exception; заборонений secret read відхиляється, `.env.example` читається; ключ не в source/output. Evidence — фактичні команди й limitations. |
| 2 | `B-09`: мінімальний Node.js Route Handler і AISStream reader з intermediate raw form. | Transformer, dedupe, collector, UI, partial success після provider failure. | Server reader, `GET /api/snapshot`, fixed error mapping, injectable event/clock boundary. | Subscription одразу після open; 15 секунд включають connect/subscribe; перше raw message або `raw: null`; ресурси закриті на success/error/cancel; Node runtime; ключ не у response/logs. Evidence окремо розділяє live connection, message receipt і local checks. |
| 3 | `B-10`: sample і provenance. | Inferred live data, secret, UI, transformer behavior. | `data/samples/position-report.sample.json`, `data/samples/PROVENANCE.md`. | Явно вказано live/documentation/synthetic походження, UTC context і differences; секрету немає. Evidence не називає sample live без фактичного спостереження. |
| 4 | `B-11`: pure `PositionReport` transformer з validation. | WebSocket lifecycle, collector, endpoint, UI. | Server-safe pure transformer і focused deterministic checks. | MMSI/name/time/position/speed/course відповідають sample; invalid position не стає `0,0`; invalid/sentinel speed/course стають `null`; valid position з unknown optional fields приймається. Evidence містить три ручні field comparisons і actual output. |
| 5 | `B-12`: bounded collector і final snapshot result. | Інший provider, continuous stream, history, replay, filters, persistence. | Collector з injected source/clock, 15-second/100-vessel constants, dedupe/latest timestamp, one-shot completion, endpoint forms. | Window, limit, provider error, disconnect, cancellation, equal timestamps, stale messages і repeated invocation мають observable results; partial data не стає success після failure; timers/sockets закриваються один раз. Evidence називає реально пройдені та manual/unknown cases. |
| 6 | `B-13`: R2 UI integration і copy. | Redesign, new map library, AIS movement, persistence, polling. | Одна кнопка, idle/loading/success/empty/error states, shared Vessel/marker/card rendering. | Loading прибирає demo vessels/selection і блокує повтор; copy відповідає контракту; MMSI → marker/card; real vessels не рухаються; failed attempt дає empty explained map, demo повертається після reload; B-07 green. Evidence розділяє browser/manual і automated checks. |
| 7 | `R2-ACCEPTANCE`: final verification, demo gate, handoff. | Production publish, deployment, archive publication, unapproved commit/push. | Fresh checks, human diff review, append-only evidence/runbook і checkpoint лише за окремим authorization. | Порядок `check → validate → build → targeted tests → demo gate`; blocking/advisory checks і limitations розділені; рішення `DONE`, `CONTINUE WITH APPROVAL` або `HOLD`. |

## Expected output of this planning slice

1. R1 B-07 contract і його evidence/history залишаються без змін; R2 план доданий окремим розділом.
2. B-08…B-13 мають dependency order і окремі criteria/evidence boundaries.
3. Server, external provider, client і shared data boundaries явно розділені.
4. Збережені без додавання правила: 15 секунд, ліміт 100, dedupe/latest timestamp, empty ≠ error, one-shot cleanup.
5. Реалізація, AISStream availability, sample capture та R2 acceptance не оголошуються виконаними.

## Acceptance criteria

- [x] Перший Sprint task не переписаний; R1 B-07 metadata, acceptance, verification, rollback і handoff збережені.
- [x] R2 planning має новий ID, власний status і дату.
- [x] B-08…B-13 декомпозовані в окремі bounded slices з goals, non-goals, allowed output, acceptance та evidence boundary.
- [x] Secret handling, `.env.local`, live provider access і implementation явно поза межами цього slice.
- [x] Поточний governance status S2 показаний як gate, а не мовчки змінений.
- [ ] Human diff review: `continue`, `revise` або `HOLD` — pending.
- [ ] Окремий B-08 task contract — створюється лише після review і governance authorization.

**Current acceptance status:** `Planning slice prepared; implementation not started; human diff review pending.`

## Verification

### Pre-edit checks

- **Reads / commands:** актуальні `CLAUDE.md`, `SPEC.md`, `PROJECT_BRIEF.md`, `SPRINT-01.md`, staged `SPRINT-02.md`, decision index, checkpoint, latest `EVIDENCE.md`/`RUNBOOK.md`; `git status --short --branch`; staged diff.
- **Observed:** `sprint2` базується на `01aa336`; staged input — `SPRINT-02.md`; current governance marks S2 `Waiting for MVP input`; R2 implementation paths не змінені.

### Post-edit checks

1. `git diff --check` — patch/whitespace integrity.
2. `git diff --name-only` і diff inspection — R1 history preserved; no implementation path changed.
3. Structural Markdown/content check — metadata, new task ID, B-08…B-13, acceptance, evidence, stop and rollback present.
4. Secret-boundary check — цей slice не містить реального credential і не читає `.env.local` або `.env.*.local`.
5. Human diff review — explicit `continue`, `revise` або `HOLD` before B-08.

- **Expected:** checks 1–4 pass; check 5 remains pending until human review.
- **Evidence boundary:** planning evidence proves only document/diff structure; it does not prove product behavior, live provider availability or user acceptance.

## Stop conditions

- R2 implementation запитується без governance decision і окремого B-08 contract.
- Будь-який check вимагає читання, друку, створення або передачі реального secret.
- Наступний task потребує неузгодженої dependency, runtime, architecture або path.
- Staged `SPRINT-02.md` змінюється несподівано або суперечить approved MVP contract.
- Плановий check видається за evidence без фактичного command/manual observation.
- Human diff review обирає `revise` або `HOLD`.

## Rollback / recovery

Цей planning slice змінює тільки доданий розділ `TASK_SPEC.md` і, після фактичних checks, append-only evidence/history. Якщо його відхилено, після огляду diff видалити лише доданий R2 section і повернути TASK_SPEC до verified R1 B-07 стану. Не reset-ити branch, не видаляти staged `SPRINT-02.md`, untracked paths або generated files, не зупиняти server і не торкатися secret files.

## Handoff

- **Changed files:** `TASK_SPEC.md` — лише доданий R2 planning section; product/server/data/test/config implementation не змінені.
- **Checks:** pre-edit artifact/Git inspection виконано; post-edit structural checks і human diff review потрібні перед B-08.
- **Evidence boundary:** R2 product evidence ще немає; live connection, sample capture і user acceptance — `Unknown`.
- **Open blockers:** current `SPEC.md`/`CLAUDE.md` S2 gate; human diff review; versioned scope decision якщо product owner підтверджує новий release slice.
- **Next bounded action:** після `continue` та governance authorization створити `TASK-SEA-R2-B08-001` з allowed paths лише для secure configuration і server-only accessor; B-09 не включати.

## R2 authorization update

- **Decision:** product owner confirmed R2 scope and authorized transition to B-08 in the current session; `DEC-006-R2-SCOPE` and `SPEC.md` v1.1.0 record the governance change.
- **Boundary:** B-08 is the only active implementation slice. B-09…B-13 remain separately gated; no live AISStream request or real-key handling is authorized by this task.
- **Review state:** explicit user `continue` applies to this governance transition; implementation remains subject to the B-08 checks and final human diff review.

# TASK-SEA-R2-B08-001 — Secure configuration and server-only key accessor

- **Version:** `1.0.0`
- **Status:** `Verified`
- **Product owner:** методист відділення теорії судноводіння навчального центру «Норд-Вест»
- **Delivery / technical owner:** виконавець проєкту
- **Date:** 2026-09-23
- **Related artifacts:** [`CLAUDE.md`](CLAUDE.md), [`SPEC.md`](SPEC.md), [`PROJECT_BRIEF.md`](PROJECT_BRIEF.md), [`SPRINT-02.md`](SPRINT-02.md), [`TASK_SPEC.md`](TASK_SPEC.md), [`EVIDENCE.md`](EVIDENCE.md), [`RUNBOOK.md`](RUNBOOK.md), [`docs/decisions/README.md`](docs/decisions/README.md), [`docs/decisions/DEC-006-r2-scope.md`](docs/decisions/DEC-006-r2-scope.md)

## Goal and gate

- **Goal:** підготувати безпечну конфігурацію змінної `AISSTREAM_API_KEY` і один server-only accessor для наступного B-09 reader, не відкриваючи ключ і не змінюючи product behavior.
- **Backlog:** `B-08` / `R2-B08-SECURE-CONFIGURATION`.
- **SPEC outcome:** `SPEC-SEA-001 / US-05…US-08`; цей task не закриває користувацьку історію самостійно.
- **Predecessor:** `TASK-SEA-R2-PLAN-001`; R1 B-07 contract і product behavior мають залишатися незмінними.
- **Governance gate:** R2 scope authorization is now recorded in `SPEC.md` v1.1.0 and `DEC-006-R2-SCOPE`; B-08 is the current task-gated slice. Implementation must remain within this contract, and B-09+ still require separate contracts, checks and human review.

## Owner and allowed paths

- **Planning path:** `TASK_SPEC.md` — цей окремий task contract; R1 розділ вище не переписувати.
- **Implementation paths:**
  - `.env.example`
  - `.gitignore`
  - `.claude/settings.json` — лише окремо дозволені permission rules для secret-file reads
  - `server/aisstream-config.ts` — один server-only accessor; directory may be created only for this slice
- **Append-only records after checks:** `EVIDENCE.md` і `RUNBOOK.md`.
- **Excluded paths:** `.env`, `.env.local`, `.env.*.local`, `app/`, `components/`, `lib/`, `data/`, `app/api/`, `tests/`, `package.json`, `package-lock.json`, `playwright.config.ts`, `CLAUDE.md`, `SPEC.md`, `SPRINT-02.md`, `docs/decisions/`, `.agents/`, `reference/`, `skills-lock.json`, `NEXT_SESSION.md`, `README.pdf` та generated files.

## Inputs and constraints

- **Inputs:** approved `PROJECT_BRIEF.md`/`SPEC.md` contract, staged `SPRINT-02.md` input, R2 planning section above, and the installed Claude Code permission syntax; no live provider access.
- **No secret access:** не читати, не створювати, не виводити та не передавати `.env`, `.env.local` або `.env.*.local`; реальний `AISSTREAM_API_KEY` не вводиться в чат і не виводиться в термінал.
- **No dependency change:** не встановлювати залежності та не змінювати package manifests/lockfile.
- **Example boundary:** `.env.example` може містити лише порожній placeholder `AISSTREAM_API_KEY=` і не може містити credential-like value.
- **Accessor boundary:** `server/aisstream-config.ts` може читати тільки `process.env.AISSTREAM_API_KEY`; missing or blank input returns `null` without throwing; the value is not logged, returned from an endpoint, imported by client code or embedded in a response.
- **Permission boundary:** `.claude/settings.json` may contain only the approved deny rules for reads of `.env`, `.env.local` and `.env.*.local`, using the syntax verified for the installed CLI; no broad unrelated permission changes.
- **Scope boundary:** B-09 reader/endpoint, WebSocket, transformer, collector, sample data, UI, live request, API response and provider error mapping are excluded.

## Expected output

1. A tracked `.env.example` with an empty `AISSTREAM_API_KEY=` placeholder only.
2. `.gitignore` that ignores local secret environment files while keeping `.env.example` trackable.
3. The smallest separately authorized secret-read deny rules in `.claude/settings.json`.
4. One server-only accessor returning `string | null` for the configured key, without client imports or logging.
5. No product map, demo vessel, B-07 test, dependency or live-provider change.

## Acceptance criteria

- [x] `.env.example` contains the required empty placeholder and no real or example credential.
- [x] `git check-ignore` confirms `.env.local` and `.env.*.local` are ignored; `.env.example` is not ignored; no local secret file is tracked.
- [x] `.claude/settings.json` contains only the verified deny rules for the specified secret-file read patterns; unrelated permissions are unchanged.
- [x] `server/aisstream-config.ts` is server-only by path/import boundary, returns `null` for missing/blank configuration without exception, and does not log or expose the value.
- [x] No implementation path outside this contract changes; no dependency or live AISStream request is introduced.
- [x] Human diff review chooses `continue`, `revise` or `HOLD` before B-09 or any commit/push.

**Current acceptance status:** `DONE; implementation, permission matrix and final diff review passed; the user-authorized commit was pushed to `origin/sprint2`.`

## Verification

### Pre-edit checks

- **Commands/reads:** read current governance artifacts and R2 planning section; inspect `git status --short --branch`, staged/unstaged names and implementation tree; verify no tracked local environment file; verify the B-07 contract remains intact.
- **Expected:** Sprint 2 remains gated; only this task-contract append is planned; no B-08 implementation paths have changed.
- **Observed:** current `CLAUDE.md`/`SPEC.md` still say `Waiting for MVP input`; staged paths are `SPRINT-02.md` and pre-existing `START.md`; unstaged paths before this contract are `EVIDENCE.md`, `RUNBOOK.md` and `TASK_SPEC.md`; no tracked `.env*` or `.claude/settings.json` exists; R1 B-07 contract remains present.

### Post-edit checks

1. `git diff --check` — Markdown/patch integrity.
2. `git diff --name-only` and diff inspection — only the contract append plus append-only evidence/history; no B-08 implementation path changed.
3. Structural task-contract check — B-08 ID, goal, gate, allowed paths, non-goals, acceptance, checks, stop conditions and rollback are present.
4. Secret-boundary check — `git ls-files`/text scan finds no tracked local secret file or literal credential; do not create or inspect `.env.local` fixtures.
5. Human diff review — explicit `continue`, `revise` or `HOLD` before changing implementation paths.

- **Expected result:** checks 1–4 pass; implementation and human review remain pending.
- **Evidence boundary:** this contract preparation proves only document structure and current repository boundary. It does not prove permission refusal, accessor behavior, provider availability, secret safety under a real key or any R2 user story.

### Implementation attempt observed

- `git diff --check`, ignore/tracking checks, source-boundary checks, direct server TypeScript check with `--ignoreConfig --types node`, normal `npx tsc --noEmit`, `npm run build`, `npm ls --depth=0` and missing/blank accessor assertions were run. Available non-permission checks passed; the build retained the known external package-lock warning and the dependency tree retained pre-existing extraneous packages.
- `.env.example` and `server/aisstream-config.ts` were added; `.gitignore` was verified unchanged. `.claude/settings.json` was not created because the current configuration-skill action was denied. No secret file, real key or live AISStream request was used.
- **Observed status:** `HOLD` for incomplete B-08; permission rules, permission matrix and final human diff review remain pending. Evidence: `E-SEA-031`.

### Permission rules and verification update

- The user explicitly authorized creation of `.claude/settings.json` with the three approved deny rules. The file was created without changing `.claude/settings.local.json`.
- The three secret-path read checks were denied by the active project permission settings; the checked paths were confirmed absent before the checks. `.env.example` remained readable and unchanged.
- **Observed status:** `CONTINUE WITH APPROVAL`; B-08 implementation and permission checks passed, while final human diff review remains pending. Evidence: `E-SEA-032`.

## Checkpoint and stop conditions

- **Checkpoint:** after implementation checks and human diff review, append only actual B-08 evidence and RUNBOOK handoff; do not create a checkpoint record unless separately authorized.
- **Stop before implementation if:** governance authorization or human `continue` is absent; permission syntax needs an unapproved broad rule; any check would require reading/creating/displaying a secret file; a dependency, endpoint, client import or unrelated path is required.
- **Stop after implementation if:** a secret appears in tracked files/output/logs; `.env.example` is ignored or contains a value; local secret paths are not ignored; the accessor throws for missing input, logs/exports the value or becomes client-importable; unexpected paths change.
- **Exit decision:** `DONE` only after actual checks and human review; otherwise `CONTINUE WITH APPROVAL` or `HOLD`.

## Rollback / recovery

If B-08 is rejected or a check fails, inspect the diff and restore only `.env.example`, `.gitignore`, `.claude/settings.json` and `server/aisstream-config.ts` to their pre-slice state; preserve append-only evidence/history, staged `SPRINT-02.md`, pre-existing `START.md` deletion and excluded untracked/generated paths. Never delete or reset a local secret file. The product owner decides whether recovery is accepted; evidence must show the failed check and restored boundary.

## Handoff

- **Changed files:** governance synchronization plus `.env.example`, `.claude/settings.json` and `server/aisstream-config.ts`; `.gitignore` verified unchanged; append-only `EVIDENCE.md`/`RUNBOOK.md` updated.
- **Checks:** governance, source/ignore/type/build/accessor and permission-matrix checks passed; final human diff review completed with `continue` authorization for this commit/push.
- **Evidence:** `E-SEA-030` records R2 authorization; `E-SEA-031` records non-permission B-08 checks; `E-SEA-032` records settings creation and permission matrix; `E-SEA-033` records final review and commit boundary.
- **Open blockers:** no B-08 blocker remains. Provider availability, real-key validity and R2 user-story acceptance remain `Unknown`; B-09 and later slices remain separately gated. No AISStream registration or key is needed for this slice.
- **Next bounded action:** after the authorized commit/push, stop before B-09. Any further implementation requires a separate bounded task and review.
