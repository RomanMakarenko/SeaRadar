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

# TASK-SEA-R2-B09-001 — AISStream reader and intermediate snapshot route

- **Version:** `1.0.0`
- **Status:** `Verified`
- **Product owner:** методист відділення теорії судноводіння навчального центру «Норд-Вест»
- **Delivery / technical owner:** виконавець проєкту
- **Date:** 2026-09-23
- **Related artifacts:** [`CLAUDE.md`](CLAUDE.md), [`SPEC.md`](SPEC.md), [`PROJECT_BRIEF.md`](PROJECT_BRIEF.md), [`SPRINT-02.md`](SPRINT-02.md), [`TASK_SPEC.md`](TASK_SPEC.md), [`EVIDENCE.md`](EVIDENCE.md), [`RUNBOOK.md`](RUNBOOK.md), [`docs/decisions/README.md`](docs/decisions/README.md), [`docs/decisions/DEC-006-r2-scope.md`](docs/decisions/DEC-006-r2-scope.md), predecessor B-08 commits [`b5ef3fb`](https://github.com/RomanMakarenko/SeaRadar/commit/b5ef3fb) and [`2ae10a1`](https://github.com/RomanMakarenko/SeaRadar/commit/2ae10a1)

## Goal and gate

- **Goal:** додати мінімальний server-only AISStream reader і `GET /api/snapshot`, який повертає перше сире повідомлення провайдера або `raw: null` у проміжній формі, не перетворюючи дані на судна і не додаючи partial-success behavior.
- **Backlog:** `B-09` / `R2-B09-AISSTREAM-READER-ROUTE`.
- **SPEC outcome:** `SPEC-SEA-001 / US-05…US-08`; цей task не закриває користувацьку історію самостійно.
- **Predecessor:** `TASK-SEA-R2-B08-001`; B-08 має статус `Verified` / `DONE` у commit `2ae10a1`.
- **Governance gate:** R2 scope authorization записана у `SPEC.md` v1.1.0 та `DEC-006-R2-SCOPE`. Межі B-09 були переглянуті в approved plan; реалізацію дозволено в межах перелічених paths. Фінальний human diff review після checks може обрати `continue`, `revise` або `HOLD`; commit/push окремо не авторизовані.

## Owner and allowed paths

- **Planning path for this task:** `TASK_SPEC.md` — лише append-only section; R1 B-07, R2 planning та B-08 history не переписувати.
- **Future B-09 implementation paths after approval:**
  - `server/aisstream-reader.ts` — server-only reader;
  - `app/api/snapshot/route.ts` — Next.js Route Handler;
  - `tests/snapshot-reader.spec.ts` — один focused deterministic spec для reader/route boundary, якщо test implementation authorization збережена в цьому task contract.
- **Append-only records:** `EVIDENCE.md` і `RUNBOOK.md` можуть оновлюватися лише після фактичних implementation checks; цей contract-preparation slice їх не змінює.
- **Excluded paths:** `.env`, `.env.*.local` (except the zero-byte root `.env.local` preflight artifact described below), `.env.example`, `.gitignore`, `.claude/settings.json`, `.claude/settings.local.json`, `app/` UI/map/demo paths, `components/`, `lib/`, `data/`, shared vessel model/card paths, `package.json`, `package-lock.json`, `playwright.config.ts`, existing `tests/vessel-selection.spec.ts`, `CLAUDE.md`, `SPEC.md`, `SPRINT-02.md`, `docs/decisions/`, `NEXT_SESSION.md`, `README.pdf`, `.agents/`, `reference/`, `skills-lock.json` and generated files.
- **Local preflight artifact:** if the root `.env.local` path is absent, create it as a zero-byte ignored file without reading, printing, overwriting or otherwise inspecting its contents. If it already exists, preserve it and do not read it. It contains no key until the owner adds one locally; it is never evidence of provider connectivity.

## Inputs and constraints

- **Inputs:** approved `PROJECT_BRIEF.md`/`SPEC.md`, `SPRINT-02.md` B-09 contract, verified B-08 accessor `getAISStreamApiKey(): string | null` in `server/aisstream-config.ts`, Node.js 22.x baseline, TypeScript strict configuration and Next.js 16.3.5 App Router.
- **Server boundary:** `app/api/snapshot/route.ts` must explicitly export `runtime = 'nodejs'`; Edge runtime is not allowed. The API key is read only through the B-08 server accessor and never imported by client code.
- **Transport/dependency boundary:** reuse the approved runtime/provider boundary. No `ws` package, WebSocket dependency, new test runner or unrelated dependency may be added; if Node.js 22's available WebSocket mechanism is insufficient, stop for a separate decision rather than changing package manifests.
- **Provider boundary:** use the documented AISStream WebSocket endpoint `wss://stream.aisstream.io/v0/stream`. The subscription is sent immediately after open and has exactly the fields `APIKey`, `BoundingBoxes: [[[50.75, 0.95], [51.25, 1.95]]]` and `FilterMessageTypes: ['PositionReport']`. The key is never printed, logged, returned, committed or placed in client-reachable output. The provider documentation requires one complete subscription within three seconds of connecting; B-09 sends it immediately from the open handler.
- **Timing boundary:** the total 15-second deadline starts before connection and includes connection establishment and subscription transmission. A successful open with no message by the deadline may return `raw: null`; a connection that never reaches the required open/subscription boundary maps to `connect_failed`.
- **Test boundary:** deterministic tests must be able to inject a fake WebSocket/event source and clock or equivalent lifecycle seams. Tests must not require a live network, real key or provider availability.
- **Raw-message boundary:** B-09 returns only the first text provider message as the unchanged wire string in the reader's intermediate `raw` field, without JSON parsing, PositionReport transformation, validation, deduplication, collection or merging. A first non-text/binary payload is treated as the fixed `provider_error` path; no provider payload is exposed. Abort cancellation is cleanup-only: the reader closes resources once and prevents a late response, without adding a public error code.

## Expected output

1. `server/aisstream-reader.ts` with one bounded server-side read attempt that opens AISStream, subscribes immediately, observes the first raw message or the no-message deadline, and closes its resources.
2. `app/api/snapshot/route.ts` with `GET /api/snapshot`, explicit Node.js runtime and the intermediate response forms only:

   ```json
   { "ok": true, "raw": "<first message or null>", "collectedAt": "<timestamp>" }
   ```

   ```json
   { "ok": false, "attemptedAt": "<timestamp>", "error": { "code": "<fixed code>", "message": "<fixed message>" } }
   ```

3. One focused deterministic test spec covering the reader/route lifecycle without a live AISStream request or real credential.
4. No transformer, collector, sample, UI or final vessel snapshot behavior.

## Fixed response and error contract

- **No key:** HTTP `502`; code `no_api_key`; message `Ключ AISStream не налаштовано`; no WebSocket is opened.
- **Connection failure:** HTTP `502`; code `connect_failed`; message `Не вдалося підключитися до джерела`.
- **Provider error:** HTTP `502`; code `provider_error`; message `Джерело повернуло помилку`.
- **Unexpected disconnect:** HTTP `502`; code `disconnected`; message `З'єднання з джерелом розірвано`.
- **Internal failure:** HTTP `502`; code `internal`; message `Внутрішня помилка сервера`.
- Raw provider error text, socket error text and the API key must not appear in any public message, response, log or client-reachable bundle. No new public error code may be invented in this task.

## Acceptance criteria

- [x] `GET /api/snapshot` is a Node.js Route Handler with an explicit `runtime = 'nodejs'` export and no client import boundary violation.
- [x] Missing or blank `AISSTREAM_API_KEY` returns HTTP `502` with the exact `no_api_key` response and does not construct or open a WebSocket.
- [x] The WebSocket subscription is sent immediately after the open event and matches the exact approved shape, including the Dover bounding box and `FilterMessageTypes: ['PositionReport']`.
- [x] The 15-second deadline is started before connection and includes connect/open/subscription time; it is not restarted after connection.
- [x] The first text provider message is returned unchanged as a wire string in `raw`; a first binary/non-text payload maps to fixed `provider_error`; an opened and subscribed connection with no message by the deadline returns HTTP `200` with `raw: null`.
- [x] Connection, provider-error, disconnect and internal failure paths use only the fixed HTTP `502` codes/messages above and do not expose provider text or credentials.
- [x] Success, error, timeout and `AbortSignal` cancellation close the WebSocket and clear the deadline timer exactly once; late events cannot change a completed result.
- [x] Deterministic tests cover immediate subscription, total-window timing, first raw/null result, fixed connection/provider/disconnect mappings, cancellation and exactly-once cleanup without network access or a real key.
- [x] No PositionReport transformer/validation, sample/provenance, collector, dedupe/latest timestamp, 100-vessel limit, final vessel response, partial success, UI, map, demo-vessel, persistence, polling, history, continuous stream, B-10, B-11, B-12 or B-13 behavior is introduced.
- [x] No package manifest, lockfile, dependency, Playwright configuration, existing B-07 test or B-08 file changes are introduced.
- [x] Final human diff review completed with decision `continue`; commit/push remain separately unauthorized.

**Current acceptance status:** `Verified; bounded local B-09 implementation is accepted. Live provider availability, real-key validity and complete R2 user-story acceptance remain unverified.`

## Verification

### Pre-edit checks

- **Reads/commands:** current `CLAUDE.md`, `SPEC.md`, `PROJECT_BRIEF.md`, `SPRINT-02.md`, B-08 section of `TASK_SPEC.md`, latest EVIDENCE/RUNBOOK entries, decision index and `DEC-006-R2-SCOPE`; `git status --short --branch`; `git log -3 --oneline --decorate`; remote ancestry for `b5ef3fb` and `2ae10a1`; changed-path inspection.
- **Expected:** B-08 is `Verified`/`DONE`; `origin/sprint2` contains both B-08 commits; R1 B-07 and R2 planning remain intact; only this new planning section is proposed; pre-existing staged/untracked paths remain excluded; no tracked local secret file exists.
- **Observed:** these pre-edit checks were completed before this section was appended; current B-08 status and remote ancestry were confirmed, and no B-09 implementation path was changed.

### Post-contract checks

1. `git diff --check` — Markdown/patch integrity.
2. `git diff --name-only` and full diff inspection — only `TASK_SPEC.md` changes; R1 B-07, R2 planning and B-08 history remain intact; staged `SPRINT-02.md`/`START.md` and untracked paths remain untouched.
3. Structural/content validation — metadata, B-09 ID, goal/gate, allowed/excluded paths, response/error contract, acceptance, evidence boundary, stop conditions, rollback and handoff are present.
4. Secret-boundary validation — inspect tracked paths/text only; do not read, create or output `.env`, `.env.local` or `.env.*.local`; confirm no literal credential or key assignment is introduced.
5. Human diff review — explicit `continue`, `revise` or `HOLD` is required before B-09 implementation.

- **Observed result:** `git diff --check`, structural/content validation, tracked-path secret scan, direct server type-check, normal `npx tsc --noEmit`, `npm run build`, `npm ls --depth=0` and the focused Playwright spec passed. The zero-byte `.env.local` path is ignored and was not read. Human diff review completed with decision `continue`; no commit/push was performed.
- **Evidence boundary:** these checks and the approved diff prove the local reader/route lifecycle and response boundary only. They do not prove provider availability, real-key validity, live connection/message receipt or any complete R2 user story.
- **Implementation checks:** direct server type-check used TypeScript 6 with `--ignoreConfig`; the normal application check, production build, dependency inspection, deterministic tests and no-key route check were run. A live connection/open or message receipt remains `Unknown`/`Blocked` unless separately authorized with a locally stored key.

## Checkpoint and stop conditions

- **Checkpoint:** contract review/continue preceded implementation, and final human diff review followed the local checks. No new checkpoint record is required for this bounded slice.
- **Stop before implementation if:** the contract review/continue is withdrawn; the runtime requires an unapproved dependency; a test seam cannot inject WebSocket/events and time; a live key/request is required; or implementation needs an excluded path beyond the explicitly authorized zero-byte `.env.local` preflight artifact.
- **Stop after implementation if:** the route runs on Edge; subscription is delayed or malformed; the 15-second window starts after connect; socket/timer cleanup leaks or double-closes; partial data becomes success; provider/raw/key text is exposed; the no-key mapping is wrong; deterministic lifecycle checks fail; unexpected paths change; or B-10…B-13 behavior appears.
- **Exit decision:** `DONE` for the bounded local B-09 implementation after passing checks and human `continue`. Provider availability, real-key validity and R2 user-story acceptance remain unverified.

## Rollback / recovery

If this contract is rejected, inspect the diff and remove only the appended B-09 section from `TASK_SPEC.md`, restoring the document to the verified B-08 boundary represented by `2ae10a1`. If a later B-09 implementation is rejected, restore only `server/aisstream-reader.ts`, `app/api/snapshot/route.ts`, the focused B-09 test and this B-09 section to the B-08 baseline after inspecting the diff. Preserve append-only evidence/history, staged `SPRINT-02.md`, staged `START.md` deletion, untracked/generated paths and all secret files. Do not reset the branch, delete local secret files or stop unrelated processes.

## Handoff

- **Changed files in this B-09 slice:** `TASK_SPEC.md`, `server/aisstream-reader.ts`, `app/api/snapshot/route.ts`, `tests/snapshot-reader.spec.ts`, plus the ignored zero-byte `.env.local` preflight artifact. No package, UI, map, B-07 test or B-08 file changed.
- **Checks:** contract structural validation, `git diff --check`, tracked-path secret scan, direct server type-check, `npx tsc --noEmit`, `npm run build`, `npm ls --depth=0`, focused Playwright spec and no-key loopback check passed; final human diff review chose `continue`.
- **Evidence boundary:** local reader/route behavior is supported by deterministic tests and approved diff review; live provider availability, real-key validity and R2 user-story acceptance remain `Unknown`/`Needs verification`.
- **Open blockers:** no local B-09 blocker remains. Provider availability, real-key validity, live connection/message receipt and complete R2 user-story acceptance remain `Unknown`/`Needs verification`.
- **Next bounded action:** if desired, separately authorize a sanitized live-provider check with the locally stored key; otherwise keep B-10 through B-13 separately gated. Commit/push still require explicit authorization.

# TASK-SEA-R2-B10-001 — PositionReport sample and provenance

- **Version:** `1.0.0`
- **Status:** `Verified`
- **Product owner:** методист відділення теорії судноводіння навчального центру «Норд-Вест»
- **Delivery / technical owner:** виконавець проєкту
- **Date:** 2026-09-23
- **Related artifacts:** [`CLAUDE.md`](CLAUDE.md), [`SPEC.md`](SPEC.md), [`PROJECT_BRIEF.md`](PROJECT_BRIEF.md), [`SPRINT-02.md`](SPRINT-02.md), [`TASK_SPEC.md`](TASK_SPEC.md), [`EVIDENCE.md`](EVIDENCE.md), [`RUNBOOK.md`](RUNBOOK.md), [`docs/decisions/DEC-006-r2-scope.md`](docs/decisions/DEC-006-r2-scope.md), `TASK-SEA-R2-B09-001`, `E-SEA-034`, `E-SEA-035`, `E-SEA-036`.

## Goal and gate

- **Goal:** create one small, inspectable `PositionReport` sample with truthful provenance for B-11 transformer work, without presenting synthetic or documentation-derived data as live AIS data.
- **Backlog:** `B-10` / `R2-B10-SAMPLE-PROVENANCE`.
- **SPEC outcome:** `SPEC-SEA-001 / US-05…US-08`; this bounded task does not satisfy any user story by itself.
- **Predecessors:** verified B-08 secure configuration and bounded B-09 intermediate raw reader. B-09 local evidence does not establish live provider connectivity or receipt of a provider message.
- **Authorization gate:** this section prepares the contract only. No sample files are created and no B-10 implementation/live capture is authorized until human diff review records `continue` for this contract. Live AISStream access, use of a real key, commit and push each require separate explicit authorization.

## Owner and allowed paths

- **Planning path for this contract:** append-only B-10 section in `TASK_SPEC.md`; do not rewrite R1, R2 planning, B-08 or B-09 history.
- **Contract-preparation paths:** `TASK_SPEC.md`, `NEXT_SESSION.md`; after structural checks only, append actual contract-preparation facts to `EVIDENCE.md` and `RUNBOOK.md`.
- **Future B-10 implementation paths, only after contract review and explicit implementation `continue`:**
  - `data/samples/position-report.sample.json` — one sanitized sample object;
  - `data/samples/PROVENANCE.md` — provenance and limitations for that exact sample.
- **Excluded paths:** all `.env*` files, credentials, `server/`, `app/`, `tests/`, `package.json`, `package-lock.json`, `playwright.config.ts`, `.gitignore`, `.claude/`, all map/UI/product paths, B-09 reader/route, `SPEC.md`, `SPRINT-02.md`, decisions, generated files and unrelated/untracked paths. Do not inspect `.env.local` or any secret path.

## Inputs and constraints

- **Read-only inputs:** approved sample/provenance clauses in `SPRINT-02.md`; `TASK-SEA-R2-B09-001`; B-08/B-09 evidence and human-review records; the PositionReport field contract in `SPRINT-02.md`; AISStream documentation if reachable without credentials. Do not read secret files or call the provider.
- **Permitted sample origin:** use a clearly identified documentation-derived example or a clearly identified synthetic fixture. A locally captured live sample is out of scope unless the user separately authorizes a live request and confirms that retaining the sanitized payload is permitted. Never invent a live capture or claim that a documentation example was received from AISStream.
- **Sample payload boundary:** one JSON object representing the agreed `PositionReport` message shape with `MetaData` and `Message.PositionReport`; preserve source field names/casing and include fields required by the B-11 contract: `MetaData.MMSI`, `ShipName`, `latitude`, `longitude`, `time_utc`; `Message.PositionReport.Sog`, `Cog`, `TrueHeading`, `Latitude`, `Longitude`. If a source does not provide a field, omit it only when the provenance records that omission and it is consistent with the documented schema; do not manufacture missing provider metadata while labelling the object documentation-derived.
- **Sanitization:** sample must contain no API key, credential, access token, private local path, or unrelated personal data. Use only a non-sensitive synthetic MMSI for a synthetic example. Do not include raw logs or transport frames beyond the single intended sample object.
- **Timestamp and coordinates:** provenance states whether timestamps are source-example values or synthetic, and identifies the time/coordinate context without implying actual receipt. It records the configured Dover bounds only as the intended sample context, not as proof that a vessel was observed there.
- **No implementation expansion:** no transformer, validation runtime, collector, endpoint modification, live request, UI, persistence, dependency or automated release-level test suite is part of B-10.

## Expected output

After this task receives its own implementation authorization, the only B-10 deliverables are:

1. `data/samples/position-report.sample.json` — one parseable JSON sample using the approved `MetaData` / `Message.PositionReport` shape and explicit origin.
2. `data/samples/PROVENANCE.md` — metadata for the exact sample, including origin class (`live`, `documentation-derived`, or `synthetic`), retrieval/creation UTC timestamp for this artifact (not misrepresented as vessel observation time), source reference when applicable, intended region context, field omissions/normalization, sanitization and limitations.
3. Append-only factual `EVIDENCE.md` and `RUNBOOK.md` entries after checks and human review; these must distinguish sample artifact checks from live provider evidence.

## Acceptance criteria

- [x] A focused sample exists at the agreed canonical path, parses as JSON, and contains one message object only.
- [x] The payload preserves exact agreed field names/casing and includes the B-11 input fields, or explicitly documented schema-based omissions; no transformer-derived vessel object is included.
- [x] Provenance identifies the actual origin as documentation-derived or synthetic unless separately authorized live evidence proves otherwise; it distinguishes artifact creation time from any timestamp inside the example.
- [x] Provenance explains source, intended region context, field differences/omissions, sanitization, and what the example does not prove.
- [x] No credential/key, unapproved personal data, unrelated data, raw logs, or claim of live receipt without evidence is present.
- [x] Human diff review explicitly selected `continue` before B-11; B-11 remains separately task-gated.
- [x] No B-09 source, product behavior, dependency, endpoint, test framework, live request or secret path is changed/read.

**Current acceptance status:** `Verified; B-10 sample, provenance, targeted checks and final human diff review are complete. B-11, live AISStream access, commit and push remain separately gated.`

## Verification

### Contract preparation checks

1. `git status --short --branch` and current `git log -3 --oneline --decorate` — verify branch and preserve pre-existing paths.
2. Full review of this appended section and `SPRINT-02.md` B-10 decomposition — verify scope, field list, provenance classes, gates, allowed/excluded paths and rollback.
3. `git diff --check -- TASK_SPEC.md NEXT_SESSION.md EVIDENCE.md RUNBOOK.md` — Markdown/patch integrity after editing.
4. Structural validator — verify ID, metadata, Draft gate, outputs, acceptance, paths, checks, stop conditions, rollback and handoff.
5. Secret boundary — inspect only named non-secret documentation paths; do not enumerate/read/print `.env*` contents or search them.

### Future sample checks (requirements, not observed results)

1. Parse `position-report.sample.json` with a JSON parser and assert exactly one top-level message object and required/cased paths.
2. For a documentation-derived sample, compare it to its cited AISStream documentation source without claiming live receipt; for a synthetic sample, compare its field names and shape to the approved B-10/B-11 contract. Verify all claimed fields and any omissions.
3. Review `PROVENANCE.md` against the actual sample origin and inspect both B-10 output files for credential/secret patterns without opening secret files.
4. Run `git diff --check`; inspect changed paths to confirm only the two B-10 sample files plus post-check append-only records changed.
5. Do not run `npm run build` or product tests for this documentation/data-only slice unless a future contract specifically makes them relevant.

- **Evidence boundary:** structural/JSON checks prove only the sample artifact and documentation are internally inspectable. They do not prove a live observation, provider availability, vessel identity, field semantics beyond cited docs, R2 acceptance or complete traffic coverage.

## Checkpoint and stop conditions

- **Checkpoint:** first checkpoint is human review of this contract. A second explicit `continue` is required before creating B-10 sample/provenance files. Before B-11, review the completed B-10 diff and evidence separately.
- **Stop before implementation if:** this contract is not approved; exact example/source or field shape cannot be established; live capture is necessary to meet the intended claim; retention terms are unclear; a secret, credentials, dependency or excluded path would be needed; or sample values could be mistaken for real vessel observations.
- **Stop after implementation if:** provenance origin is ambiguous; sample is malformed or contains unapproved data; field casing differs from the cited contract; any claim implies unsupported live capture; an unexpected path changes; or a credential/secret appears.
- **Exit decision:** `DONE` only after authorized sample creation, targeted checks, evidence, and human `continue`; otherwise `CONTINUE WITH APPROVAL` or `HOLD`.

## Rollback / recovery

If the contract is revised or rejected before implementation, inspect the diff and amend/remove only this appended B-10 section; preserve B-08/B-09 history and all pre-existing staged/untracked/generated paths. If a later B-10 sample is rejected, after inspection remove only `data/samples/position-report.sample.json` and `data/samples/PROVENANCE.md` created by this task, then return to the last verified B-09 baseline; do not reset the branch or delete/inspect secret files. The product owner decides whether recovery is accepted, based on the reviewed diff and recorded evidence.

## Handoff

- **Current changed files:** B-10 contract in `TASK_SPEC.md`; synthetic sample `data/samples/position-report.sample.json`; `data/samples/PROVENANCE.md`; append-only `EVIDENCE.md` and `RUNBOOK.md` updates after checks. No product code, test or dependency changed.
- **Current checks:** sample JSON/schema/provenance assertions, targeted credential-like-value scan, whitespace checks and final changed-path inspection; observed results are recorded in `EVIDENCE.md`.
- **Unknowns:** live provider availability, real-key validity, live message receipt, sample retention terms, full R2 acceptance and release readiness remain `Unknown`/`Needs verification`.
- **Next bounded action:** human review of the completed B-10 diff and evidence. Do not begin B-11, make a live request, commit or push without their separate authorization.

### B-10 implementation update — synthetic sample

- **Review and authorization:** user approved continuation of the B-10 contract (`continue`) and explicitly authorized implementation using a documentation-derived or synthetic sample. No live request, secret access, commit or push was authorized.
- **Changed paths:** `data/samples/position-report.sample.json` and `data/samples/PROVENANCE.md`; this append-only task status update. No product code, tests, dependencies or other implementation paths changed.
- **Observed:** one synthetic `MetaData` / `Message.PositionReport` fixture was created with the agreed fields/casing, synthetic values, and coordinates matching inside the intended Dover bounds. Provenance distinguishes artifact creation time from the synthetic `time_utc` value and states the fixture is not live or documentation-derived.
- **Checks:** Node JSON/schema/provenance assertion — `PASS`; credential-like value scan of the two B-10 outputs — `PASS`; `git diff --check` — `PASS` for the selected tracked paths. A final changed-path/diff review is still pending.
- **Limitations:** this fixture proves only the sample's structural consistency with the agreed task field contract; it proves no live observation, provider behavior, vessel identity, or R2 acceptance.
- **Decision boundary:** implementation checks passed; final human diff review is recorded below. B-11, live AISStream access, commit and push remain separately gated.

### B-10 final human diff review

- **Review scope:** inspected the sample JSON, provenance, B-10 acceptance/status update, `E-SEA-038`, `RUNBOOK.md` handoff, and the final changed-path boundary.
- **Observed:** the payload is one synthetic PositionReport envelope with all required field names/casing, matching coordinates within the intended Dover bounds, and no transformer-derived object. Provenance identifies synthetic origin, records UTC creation date at day precision, and disclaims live receipt/observation. The sample directory contains only the two approved B-10 files; no product, test or dependency paths changed.
- **Checks:** JSON/schema/provenance and credential-like scan — `PASS`; whitespace and `git diff --check` — `PASS`; final Git inspection confirmed the only existing tracked modifications are `EVIDENCE.md`, `RUNBOOK.md`, `TASK_SPEC.md`, and the pre-existing `START.md` deletion; staged paths remain empty.
- **Decision:** user selected `continue` for the B-10 review. B-10 is `Verified` within this bounded sample/provenance scope. This does not authorize B-11, live provider access, commit or push.
- **Recovery:** if this review is later rejected, inspect the diff and remove only the two B-10 sample files and revert B-10 task status; preserve append-only evidence/history and all pre-existing staged/untracked paths.
- **Next action:** stop at B-10. B-11 requires its own bounded task contract and explicit authorization.

### B-10 post-review delivery update

- **Observed delivery:** commit `72f8b94` (`feat(r2): add B-10 PositionReport sample`) is present at local `HEAD` and `origin/sprint2`; remote ref verified by `git ls-remote origin refs/heads/sprint2` as `72f8b94eb9c88a92d84281be88d7629e458ed0e8`.
- **Commit boundary:** exactly the B-10 sample, provenance, task, evidence and runbook paths were committed; pre-existing `START.md` deletion and unrelated untracked paths remain excluded.
- **Delivery status:** B-10 sample/provenance is verified, committed and pushed. This does not authorize live AISStream access or B-11.
- **Handoff:** stop after B-10. Prepare a separate B-11 bounded contract and obtain explicit authorization before implementation.

# TASK-SEA-R2-B11-001 — PositionReport transformer

- **Version:** `1.1.0`
- **Status:** `Verified`
- **Product owner:** методист відділення теорії судноводіння навчального центру «Норд-Вест»
- **Delivery / technical owner:** виконавець проєкту
- **Date:** 2026-09-23
- **Related artifacts:** [`CLAUDE.md`](CLAUDE.md), [`SPEC.md`](SPEC.md), [`SPRINT-02.md`](SPRINT-02.md), [`TASK_SPEC.md`](TASK_SPEC.md), [`EVIDENCE.md`](EVIDENCE.md), [`RUNBOOK.md`](RUNBOOK.md), [`docs/decisions/DEC-006-r2-scope.md`](docs/decisions/DEC-006-r2-scope.md), `TASK-SEA-R2-B10-001`, `E-SEA-038`, `E-SEA-039`, `E-SEA-040`, [`app/vessel-model.ts`](app/vessel-model.ts), [`data/samples/position-report.sample.json`](data/samples/position-report.sample.json), [`data/samples/PROVENANCE.md`](data/samples/PROVENANCE.md).

## Goal and gate

- **Goal:** define a pure, deterministic transformation from one decoded AISStream `PositionReport` envelope to the shared `Vessel` shape, or `null` when required identity, time, or position data is invalid.
- **Backlog:** `B-11` / `R2-B11-POSITION-TRANSFORMER`.
- **SPEC outcome:** `SPEC-SEA-001 / US-05…US-08`; this bounded task does not satisfy a user story by itself.
- **Predecessor:** verified `TASK-SEA-R2-B10-001`; use its canonical sample and provenance as the fixture/source-shape reference. The fixture is synthetic and is not evidence of live provider receipt.
- **Authorization gate:** this section prepares the contract only. Implementation and tests remain unauthorized until this contract is human-reviewed, the user chooses `continue`, and implementation is explicitly authorized. B-10 review/authorization does not carry forward. Live AISStream access, real-key use, commit and push each remain separately gated.

## Owner and allowed paths

- **Planning path:** append-only B-11 section in `TASK_SPEC.md`; do not rewrite R1, R2 planning, B-08, B-09 or B-10 history.
- **Read-only inputs:** `SPRINT-02.md` B-11 contract; `app/vessel-model.ts`; `data/samples/position-report.sample.json`; `data/samples/PROVENANCE.md`; verified B-10 evidence and `DEC-006-R2-SCOPE`.
- **Future implementation paths, only after review and explicit authorization:**
  - `server/position-report-transformer.ts` — one pure server-side transformer and its input validation.
  - `tests/position-report-transformer.spec.ts` — focused deterministic transformer checks only.
- **Append-only records after actual checks:** `EVIDENCE.md` and `RUNBOOK.md`.
- **Excluded paths:** all other `server/` files; `app/`, including changes to `app/vessel-model.ts`; `app/api/`; `data/`; UI/map components; package manifests/lockfile; Playwright configuration; `.env*`, credentials and `.claude/`; `SPRINT-02.md`; decisions; generated files; unrelated or pre-existing paths. Do not inspect or access secret files.

## Inputs and transformation contract

- **Input boundary:** one already-decoded JSON-like envelope containing `MetaData` and `Message.PositionReport`. This is a pure mapping/validation boundary; no transport, parsing of WebSocket frames or network access is included.
- **Output boundary:** `Vessel | null` using the existing shape in `app/vessel-model.ts`. The result has `source: "aisstream"`; `id` is a string. Do not add fields to or modify the shared type.
- **Identity:** map `MetaData.MMSI` to `Vessel.id`. Accept either a JSON non-negative safe integer or a non-empty ASCII digit-only string. Reject missing, fractional, negative, non-finite, unsafe numeric, blank, signed, or other non-digit values. Convert numeric input to its canonical base-10 decimal string; trim surrounding whitespace from string input and preserve its remaining digits, including leading zeros. Do not impose a nine-digit or upper-range restriction not present in the approved Sprint contract.
- **Name:** map `MetaData.ShipName`, trim surrounding whitespace, and use `null` for missing, non-string, or blank values.
- **Timestamp:** map `MetaData.time_utc`. Accept only the UTC form shown by the approved Sprint/sample contract: `YYYY-MM-DD HH:mm:ss[.fraction] +0000 UTC`, with an optional fraction of 1–9 digits. Validate the calendar date and clock fields rather than allowing invalid values to normalize; reject other offsets or timezone labels because they conflict with the `time_utc` UTC marker. Return UTC ISO 8601 with exactly millisecond precision (`.sssZ`): right-pad fractions shorter than three digits with zeros and truncate digits after the third without rounding. Missing, malformed, or invalid timestamps reject the vessel.
- **Position:** use `Message.PositionReport.Latitude` and `Longitude`, not the metadata coordinates. Both must be finite numbers with latitude in `[-90, 90]` and longitude in `[-180, 180]`; unavailable sentinels `91`/`181`, missing values, non-numeric values, and out-of-range values reject the vessel. Never substitute `0,0`. Do not add a requirement that metadata coordinates match the report coordinates.
- **Optional motion fields:** map `Sog` to `speedKnots`; absent, non-numeric, sentinel `102.3`, or values outside `[0, 102.2]` become `null`. Map `Cog` to `courseDeg`; absent, non-numeric, sentinel `360`, or values outside `[0, 360)` become `null`. Preserve valid numeric zero. Invalid optional fields do not reject a valid position.
- **Other fields:** `TrueHeading` and unknown optional fields do not affect this transformation; course comes from `Cog`. Unknown extra fields must not prevent a valid report from being transformed.
- **Purity:** do not mutate the input envelope or saved sample; no module-level mutable state, clock, I/O, logging, WebSocket lifecycle, or environment access.

## Expected output

After separate implementation authorization, produce only the pure transformer and focused deterministic spec at the two future implementation paths above, plus factual append-only evidence/runbook updates after checks. No endpoint wiring, collector, deduplication, vessel limit, UI, dependency, new test runner, live request, or release-level suite is part of B-11.

## Acceptance criteria

- [x] A valid sample-shaped envelope produces one `Vessel` with `source: "aisstream"`, string `id` from MMSI, trimmed-or-null name, report coordinates, ISO UTC timestamp at millisecond precision, and correctly mapped speed/course.
- [x] MMSI accepts only non-negative safe-integer JSON numbers or trimmed ASCII digit-only strings; rejects fractional/negative/unsafe/non-digit/blank input; converts numbers to base-10 strings and preserves digit strings' leading zeros without adding a nine-digit/range rule.
- [x] `time_utc` accepts only `YYYY-MM-DD HH:mm:ss[.fraction] +0000 UTC` with 1–9 fractional digits when present; rejects nonzero offsets, conflicting timezone labels, malformed or impossible calendar/clock values; outputs `.sssZ`, pads shorter fractions, and truncates longer fractions without rounding.
- [x] Name, timestamp, latitude and longitude follow the field/type rules above; malformed envelope, missing/invalid identity, unparseable time, or invalid position returns `null` rather than throwing or producing a vessel at `0,0`.
- [x] Latitude/longitude inclusive bounds and unavailable/out-of-range/non-numeric cases are covered; report coordinates are authoritative even if metadata coordinates differ.
- [x] Missing, non-numeric, sentinel and out-of-range speed/course become `null`; valid zero speed/course remain numeric zero and do not reject an otherwise valid vessel.
- [x] Unknown optional fields and `TrueHeading` do not alter the mapping or prevent a valid report from being accepted; `Cog`, not `TrueHeading`, supplies course.
- [x] Output field names/types match the existing shared `Vessel` structure and input/sample objects remain unchanged.
- [x] Focused deterministic tests cover valid mapping; numeric and digit-string MMSI conversion plus invalid MMSI types/boundaries; exact UTC timestamp parsing, fractional padding/truncation, rejected offsets and impossible dates; invalid/malformed required fields; position bounds/sentinels; optional-field null/zero cases; unknown optional fields; and input non-mutation, all without network access or credentials.
- [x] At least three output fields are manually compared with `data/samples/position-report.sample.json`; actual comparisons and test output are recorded in evidence after implementation.
- [x] No B-09 transport, endpoint, collector, deduplication, 100-vessel limit, UI, dependency, live provider or unrelated path is changed.
- [x] Human diff review was completed at the user's direction; the separate explicit implementation authorization preceded implementation. B-12 and later work remain task-gated.

**Current acceptance status:** `DONE for bounded B-11 scope after final diff review at the user's direction; focused checks and synthetic fixture comparisons passed. E-SEA-043 records implementation checks; E-SEA-044 records final review. Live data, complete R2 acceptance and release readiness are not claimed.`

## Verification

### Contract-preparation checks

1. Inspect the B-11 Sprint entry, B-10 contract/sample/provenance, shared `Vessel` type, decision gate, Git status and recent delivered baseline.
2. Validate this contract's ID/metadata, gate, exact future paths, field mappings, validation ranges/sentinels, acceptance, excluded paths, stop conditions, rollback and handoff.
3. Run `git diff --check` on `TASK_SPEC.md`, `EVIDENCE.md` and `RUNBOOK.md`; inspect the complete diff and changed-path boundary.
4. Append factual contract-preparation evidence/runbook only after these checks. Do not claim any transformer/test result or B-11 acceptance.

### Future implementation checks (requirements, not observed results)

1. Add deterministic fixtures/assertions at `tests/position-report-transformer.spec.ts`, with no live network or credential.
2. Run the focused transformer spec and relevant type check; record the exact command/output and environment.
3. Manually compare at least three mapped output fields against the saved synthetic sample and record each comparison.
4. Inspect immutability, invalid-position rejection (including no `0,0` fallback), and optional-field null/zero behavior; run `git diff --check` and verify only the future allowed paths plus post-check records changed.

- **Evidence boundary:** contract structure and review prove only that the task boundary is documented. Future fixture tests/manual comparisons prove only local transformation behavior against the synthetic contract sample; they do not prove live observation, AISStream availability, vessel identity, provider semantics beyond the approved field contract, R2 user-story acceptance, or release readiness.

## Stop conditions

- Stop before implementation if human review does not choose `continue` and explicit implementation authorization is absent.
- Stop if timestamp syntax/precision or an input-type rule cannot be implemented as written, if the shared output type needs modification, or if an excluded path/dependency, endpoint orchestration, secret, real key or live request appears necessary.
- Stop after implementation if required invalid inputs produce a vessel, optional unknown values reject a valid position, zero values are lost, `0,0` is used as fallback, output differs from the agreed `Vessel` shape, the input is mutated, checks fail, or unexpected paths change.
- **Exit decision:** `DONE` only after authorized implementation, focused checks, recorded manual comparison, evidence, and human diff review; otherwise `CONTINUE WITH APPROVAL` or `HOLD`.

## Rollback / recovery

If the B-11 contract is revised or rejected before implementation, inspect the diff and remove only this appended B-11 section; preserve earlier task history, append-only evidence/runbook history and all unrelated staged/untracked/generated paths. If a later authorized B-11 implementation is rejected, inspect the diff and restore only `server/position-report-transformer.ts` and `tests/position-report-transformer.spec.ts` to the verified B-10 baseline; do not reset the shared branch, delete local files, or alter unrelated paths. The product owner decides whether recovery is accepted.

## Handoff

- **Current changed paths:** B-11 task contract/status, `server/position-report-transformer.ts`, `tests/position-report-transformer.spec.ts`, and append-only `EVIDENCE.md`/`RUNBOOK.md` records.
- **Contract status:** `Verified`; B-11 is `DONE` within its bounded local scope after the requested review and user decision to continue.
- **Evidence:** `E-SEA-043` records implementation checks and synthetic comparisons; `E-SEA-044` records final diff review. No live data is claimed.
- **Open unknowns:** live provider availability, real-key validity, live receipt, full R2 acceptance and release readiness remain `Unknown`/`Needs verification`.
- **Next bounded action:** B-12 requires its own task contract, human review and explicit implementation authorization. Do not start B-12 or any later slice under this authorization.

### B-11 contract clarification — v1.1.0

- **Trigger:** contract review requested explicit MMSI and timestamp rules before approval for delivery.
- **MMSI rule:** narrowed accepted inputs to non-negative safe-integer JSON numbers or trimmed ASCII digit-only strings; documented string conversion and rejected malformed values without imposing a nine-digit/range rule.
- **Timestamp rule:** aligned accepted syntax to the UTC form evidenced by the Sprint/example (`+0000 UTC`), defined strict date/clock validation and sub-millisecond padding/truncation, and rejected conflicting offsets/timezone labels.
- **Status and boundary at clarification:** contract remained `Draft`; no transformer, test, live-provider request, secret access, or implementation authorization was included.

### Human review and implementation authorization — 2026-09-24

- **Contract decision:** the user reviewed `TASK-SEA-R2-B11-001` v1.1.0 and chose `continue`.
- **Implementation authorization:** the user separately authorized B-11 implementation. This authorization does not authorize live AISStream access, secret handling, commit, push, B-12, or any later task.
- **Status at authorization:** `Active`; the requirements above remain unchanged. At that point, implementation, tests, and B-11 acceptance were not yet verified.

### Implementation check checkpoint — 2026-09-24

- **Observed:** focused Playwright spec passed (9 tests); scoped TypeScript check with `--ignoreConfig`, repository `npx tsc --noEmit`, and `npm run build` passed; `git diff --check` and the new-file whitespace check passed. A first scoped TypeScript invocation failed with `TS5112` because TypeScript 6 detected `tsconfig.json`; the corrected invocation passed.
- **Sample comparison:** MMSI `999000001` → ID `"999000001"`; report coordinates `51.0/1.45` → `51/1.45`; sample UTC timestamp → `2026-09-23T15:00:00.000Z`; `Sog 12.4` → speed `12.4`; `Cog 123.4` → course `123.4`.
- **Evidence:** `E-SEA-043`. The fixture is synthetic; provider behavior, live receipt, full R2 acceptance and release readiness are not established.
- **Checkpoint decision:** implementation checks passed locally; stop for human diff review. B-11 remains `Active`, not `DONE`; B-12 is not authorized.

### Final diff review — 2026-09-24

- **Review requested:** the user asked to “review B-11 diff and continue”.
- **Observed:** final review found no functional or scope findings; implementation and focused tests align with this task contract. No code changes were made during the review.
- **Decision:** `DONE` for bounded local B-11 scope. Review outcome is `E-SEA-044`; live provider behavior, complete R2 acceptance and release readiness remain unverified.
- **Next gate:** B-12 remains separately task-gated; its own contract, review and explicit implementation authorization are required.
