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

# TASK-SEA-R2-B12-001 — Bounded snapshot collector

- **Version:** `1.0.0`
- **Status:** `Verified`
- **Product owner:** методист відділення теорії судноводіння навчального центру «Норд-Вест»
- **Delivery / technical owner:** виконавець проєкту
- **Date:** 2026-09-24
- **Related artifacts:** [`CLAUDE.md`](CLAUDE.md), [`SPEC.md`](SPEC.md), [`PROJECT_BRIEF.md`](PROJECT_BRIEF.md), [`SPRINT-02.md`](SPRINT-02.md), [`TASK_SPEC.md`](TASK_SPEC.md), [`EVIDENCE.md`](EVIDENCE.md), [`RUNBOOK.md`](RUNBOOK.md), [`docs/decisions/DEC-006-r2-scope.md`](docs/decisions/DEC-006-r2-scope.md), [`docs/decisions/DEC-007-r2-b09-streaming-boundary.md`](docs/decisions/DEC-007-r2-b09-streaming-boundary.md), `TASK-SEA-R2-B09-001`, `TASK-SEA-R2-B11-001`, `E-SEA-034`, `E-SEA-043`, `E-SEA-044`, [`server/aisstream-reader.ts`](server/aisstream-reader.ts), [`app/api/snapshot/route.ts`](app/api/snapshot/route.ts), [`server/position-report-transformer.ts`](server/position-report-transformer.ts).

## Goal, predecessor and authorization gate

- **Goal:** collect a bounded set of AISStream `PositionReport` messages and return the approved final snapshot response, using the existing pure B-11 transformer and a deterministic event-source/clock seam.
- **Backlog:** `B-12` / `R2-B12-SNAPSHOT-COLLECTOR`.
- **SPEC outcome:** `SPEC-SEA-001 / US-05…US-08`; this bounded task does not satisfy or close a user story by itself.
- **Predecessors:** verified B-09 intermediate reader/route and B-11 transformer. B-10 remains a synthetic sample; it is not evidence of live provider behavior.
- **Boundary decision:** on 2026-09-24, the user approved a narrow B-09 transport-boundary extension for B-12 through [`DEC-007-R2-B09-STREAMING-BOUNDARY`](docs/decisions/DEC-007-r2-b09-streaming-boundary.md), now `Ready`. The extension is limited to delivering multiple raw text events during one bounded attempt so the collector can create the final snapshot. It does not reopen or rewrite the historical B-09 acceptance record. DEC-007 is the approved B-12-specific exception to the unchanged `SPRINT-02.md` Part C wording.
- **Authorization gate:** the task contract is `Ready` after the human review decision `continue` on 2026-09-24. The user explicitly authorized the bounded B-12 implementation on 2026-09-24; this does not authorize live AISStream requests, real-key use, commit or push. DEC-007 resolves the transport-boundary governance conflict without changing the B-09 historical acceptance.

## Причина зміни межі — пояснення для замовника

У B-09 ми навмисно реалізували проміжний крок: сервер відкриває одне з'єднання, надсилає підписку та повертає перше отримане повідомлення як сирий текст. Після цього reader закриває з'єднання. Така поведінка відповідала меті B-09 — перевірити серверну межу читання та проміжний endpoint до появи перетворювача й збирача.

У B-12 мета вже інша: зібрати **знімок**, а не одне повідомлення. За затвердженим контрактом потрібно приймати повідомлення протягом обмеженого вікна до 15 секунд, об'єднати повторні повідомлення за MMSI, залишити останню позицію за часом повідомлення і припинити збір після 100 унікальних суден або завершення вікна. Для цього з'єднання має залишатися відкритим після першої позиції та передавати наступні повідомлення до завершення спроби.

Якби B-12 залишився лише поверх незміненого одноразового reader, він міг би отримати не більше одного повідомлення з одного підключення. Такий результат не відповідав би ані вимозі зібрати кілька суден, ані правилам дедуплікації та вибору найновішої позиції. Альтернатива — відкрити окреме друге WebSocket-з'єднання без повторного використання B-09 reader — створила б дві реалізації одного транспортного lifecycle і ризик розбіжностей у підписці, тайм-ауті, обробці помилок та закритті ресурсів.

Тому запропоноване вузьке розширення змінює лише межу передачі повідомлень: B-09 reader зможе віддати collector-у послідовність сирих текстових подій замість завершення на першій події. Collector залишатиметься окремою відповідальністю: декодує повідомлення, використовує B-11 transformer, веде набір суден і формує одну фінальну відповідь. Зберігаються AISStream, серверне підключення, затверджена підписка та bounding box, 15-секундне загальне вікно, ліміт 100, фіксовані повідомлення про помилки, захист ключа та одноразовий характер запиту. Безперервний моніторинг, історія, зберігання, повторне використання попереднього знімка та зміни інтерфейсу не додаються.

Для замовника практичний наслідок — це не нова функція і не розширення продуктового обсягу, а необхідна технічна зміна між уже прийнятими кроками, щоб кнопка в майбутньому могла отримати саме знімок із кількох суден. Зміна збільшує обсяг локальних перевірок lifecycle reader-а: треба довести, що всі повідомлення в одній спробі передаються collector-у, а з'єднання й таймери закриваються один раз при кожному результаті. Це буде перевірятися фіктивними подіями та контрольованим часом без реального ключа й без мережевого запиту. Такі перевірки доведуть локальну логіку, але не доступність AISStream і не отримання реального трафіку.

## Owner and exact paths

- **Planning path:** цей append-only B-12 section у `TASK_SPEC.md`; не переписувати історію B-08…B-11 та попередні записи.
- **Future implementation paths — only after both authorization gates:**
  - `server/aisstream-reader.ts` — вузько розширити reader з first-message completion до доставки послідовності raw text events протягом одного обмеженого lifecycle; зберегти transport/error/security constraints нижче.
  - `server/snapshot-collector.ts` — новий bounded collector: decode, B-11 transformation, per-MMSI selection, completion and final result.
  - `app/api/snapshot/route.ts` — замінити проміжну raw-відповідь B-09 на фінальний B-12 response, зберігши шлях endpoint, Node runtime, no-key guard, фіксований error envelope та серверну межу ключа.
  - `tests/snapshot-reader.spec.ts` — оновити лише focused B-09 reader lifecycle checks, щоб перевірити багатоповідомленнєву межу й зберегти раніше погоджені subscription/error/cancellation гарантії.
  - `tests/snapshot-collector.spec.ts` — додати focused deterministic collector checks з fake event source та controlled clock.
- **Append-only records after actual implementation checks and review:** `EVIDENCE.md` and `RUNBOOK.md`.
- **Excluded paths:** all `.env*` files and credentials; `server/aisstream-config.ts`; `server/position-report-transformer.ts`; B-10 sample/provenance under `data/`; `app/vessel-model.ts`; all UI/map/demo paths and B-13 work; `tests/vessel-selection.spec.ts`; package manifests/lockfile, dependencies, Playwright config and test-runner configuration; `CLAUDE.md`, `SPEC.md`, `PROJECT_BRIEF.md`, `SPRINT-02.md`, `docs/decisions/`; generated files; `NEXT_SESSION.md`, `README.pdf`, `.agents/`, `.claude/skills/`, `reference/`, `skills-lock.json`, the pre-existing `START.md` deletion and all other unrelated paths. Do not inspect, modify, stage or clean excluded paths.

## Inputs and behavioral boundary

- **Read-only inputs:** B-12 Part C in `SPRINT-02.md`; verified B-09 reader and route; verified B-11 transformer and its focused tests; shared `Vessel` shape in `app/vessel-model.ts`; DEC-006 and this task contract. The B-10 fixture is synthetic and may be used only as a shape fixture.
- **Reader/event-source responsibility:** connect only to the already approved AISStream endpoint and send the exact B-09 subscription immediately after open: `{ APIKey, BoundingBoxes: [[[50.75, 0.95], [51.25, 1.95]]], FilterMessageTypes: ['PositionReport'] }`. Deliver each received text message to the collector in arrival order. The reader does not parse JSON, transform vessels, deduplicate, choose latest timestamps, expose payloads in errors/logs, or create a second connection for the collector.
- **Reader lifecycle:** the collector owns the single 15,000 ms total deadline, starts it before invoking/constructing the event source (and therefore before WebSocket construction), and includes connect/open/subscription time. The reader/event source has no second independent window timer; it reports whether open/subscription succeeded and forwards subsequent text events. If the deadline fires before successful open/subscription, return `connect_failed`; if it fires after subscription, return the successful `window_elapsed` snapshot. After subscription, provider error maps to `provider_error`, and an unexpected close before normal completion maps to `disconnected`. A non-text/binary message maps to `provider_error`. The collector's deadline or 100-vessel completion stops the reader. Success, failure, timeout and cancellation clear the collector deadline and close/clean reader resources once; events after settlement have no effect.
- **Collector input:** each reader text event is parsed as one JSON value and passed to `transformPositionReport` from B-11. A valid JSON PositionReport that the B-11 transformer rejects (`null`, including invalid required identity/time/position) is ignored and does not create a vessel or abort the attempt. A text event that is not valid JSON is a provider payload failure and terminates the attempt with the existing fixed `provider_error` mapping. No raw payload is included in a response, message or log.
- **Identity and updates:** use transformed `Vessel.id` (MMSI string) as the uniqueness key. The first valid vessel for an id is retained until a later valid report for the same id has a strictly newer B-11 normalized millisecond timestamp; then replace the entire vessel object. For equal timestamps retain the first accepted object. Older reports do not replace newer data. Invalid reports do not replace a valid vessel.
- **Window result:** when the full deadline elapses after the connection has opened and subscription was sent, return a successful snapshot, including an empty snapshot if there are no valid vessels. `reason` is `window_elapsed`, `truncated` is `false`, and `windowSeconds` is `15`.
- **Limit result:** when the 100th unique valid vessel is accepted, stop immediately and return a successful snapshot with exactly 100 vessels, `reason: 'limit_reached'`, and `truncated: true`. Duplicate messages for existing ids do not increase the count or trigger the limit. The configured limit remains 100; do not accept or return a 101st unique vessel.
- **Errors and partial data:** any reader/provider failure after zero or more accepted messages returns the fixed HTTP 502 error response and discards all collected vessels; partial data is never returned as success. Use only B-09 code/message pairs: `no_api_key` — `Ключ AISStream не налаштовано`; `connect_failed` — `Не вдалося підключитися до джерела`; `provider_error` — `Джерело повернуло помилку`; `disconnected` — `З'єднання з джерелом розірвано`; `internal` — `Внутрішня помилка сервера`. Do not add a public error code or include provider text, raw payload, key, stack or socket details. `no_api_key` is detected before opening a socket.
- **Cancellation:** abort stops the reader, clears the collector deadline and rejects/cancels without returning a partial snapshot or adding a public cancellation error code. The route preserves B-09 cancellation behavior for an aborted request; no late event may settle or mutate a completed attempt.
- **One-shot completion:** the collector produces exactly one terminal result. On every terminal path, the deadline and reader resources are cleaned up exactly once. Any queued/late callback after completion is ignored.
- **Clock and constants:** inject a clock/timer and a fakeable event-source boundary so deterministic tests control time and events without network access. Production uses the approved 15-second window and 100-vessel limit; no caller-controlled query parameter or UI-configurable limit/window is added. `attemptedAt` is captured at route attempt start and `collectedAt` at successful completion using the server clock; tests use a controlled clock.
- **Final response contract:** successful HTTP 200 response has exactly the approved fields and values:

  ```json
  { "ok": true, "vessels": [], "collectedAt": "<timestamp>", "windowSeconds": 15, "count": 0, "truncated": false, "reason": "window_elapsed" }
  ```

  `vessels` contains the final whole `Vessel` objects, `count` equals `vessels.length`, and `reason` is exactly `window_elapsed` or `limit_reached`. Failure remains HTTP 502:

  ```json
  { "ok": false, "attemptedAt": "<timestamp>", "error": { "code": "<fixed code>", "message": "<fixed message>" } }
  ```

  No B-13 UI state/text behavior or additional response field is part of this task.

## Expected output

1. A B-09-compatible, injectable server reader boundary that delivers multiple raw text events during one bounded attempt, retaining the exact approved provider endpoint/subscription, key isolation and fixed error mapping.
2. One new server-side collector using the B-11 transformer for validation and mapping, with 15-second/100-vessel constants, deterministic deduplication/latest-timestamp behavior, whole-snapshot success and no partial success.
3. `GET /api/snapshot` updated from the B-09 intermediate raw response to the final B-12 success/error response contract above.
4. Focused deterministic reader and collector checks. No live provider call, real key, new dependency, UI, persistence, continuous stream, history or release-level suite.
5. Factual append-only evidence and delivery handoff only after actual checks and final human diff review.

## Acceptance criteria

- [x] The reader sends the exact existing subscription immediately after WebSocket open and forwards multiple text messages in order from the same connection; it does not stop after the first text message.
- [x] The total 15-second deadline starts before socket creation and includes connection and subscription time; successful open/subscription with no valid PositionReport by the deadline returns an empty success, while failure to reach subscription by the deadline maps to `connect_failed`.
- [x] The collector uses the existing B-11 transformer and existing `Vessel` structure without changing B-11 paths or behavior; invalid transformed reports are not included and no position defaults to `0,0`.
- [x] Repeated MMSI produces one vessel; strictly newer timestamp replaces the entire object; older timestamp does not replace it; equal timestamp retains the first accepted object; comparison follows B-11 millisecond precision.
- [x] The collection ends at the 15-second window with `reason: 'window_elapsed'`, including the empty-success case, or immediately upon accepting the 100th unique valid vessel with `reason: 'limit_reached'`, `count: 100`, and `truncated: true`.
- [x] Provider error, unexpected disconnect, malformed JSON payload, or internal failure after partial input returns the fixed HTTP 502 contract and never exposes the collected partial set, raw provider text, socket details, key or stack.
- [x] No-key returns the exact B-09 `no_api_key` response and does not construct a socket. Cancellation returns/rejects without a partial response or new public code.
- [x] Reader and collector settle once; timer, listener and socket cleanup occurs exactly once on window, limit, error, disconnect and cancellation; late events do not change the result.
- [x] Deterministic fake-event/controlled-clock checks cover: window elapsed; deadline before connection/subscription; limit reached; duplicate MMSI; newer, older and equal timestamps; invalid transformed reports; provider error after partial input; disconnect after partial input; cancellation after partial input; malformed JSON; repeated/late terminal events; exactly-once completion and cleanup; and success/error response shapes.
- [x] Existing B-09 guarantees (Node.js Route Handler, exact endpoint/subscription, fixed errors, no-key behavior, secret isolation and cancellation cleanup) remain covered after updating the reader lifecycle tests.
- [x] No package/dependency, B-11 transformer, sample, shared model, UI/map/demo, B-13 or unrelated path is changed; no live request or secret access occurs.
- [x] Final human diff review explicitly chose `continue`; commit/push remain separately gated.

**Current acceptance status:** `Verified` for the bounded B-12 local implementation after targeted checks and the user's final diff-review decision `continue` on 2026-09-24. This does not establish live provider behavior, complete R2 user-story acceptance or release readiness.

## Verification

### Contract-preparation checks

1. Verify branch/HEAD/remote baseline and preserve the pre-existing deletion/untracked paths.
2. Compare the proposed reader extension, exact paths, final response shape, timing, dedupe, failure, cancellation and customer rationale against `SPRINT-02.md` Part A/Part C, B-09, B-11, `SPEC.md` and DEC-006.
3. Run `git diff --check -- TASK_SPEC.md`; inspect the complete B-12 append and verify the only changed path is `TASK_SPEC.md`.
4. Validate required metadata, separate authorization gates, the B-09 extension, exact allowed/excluded paths, customer rationale, response/error behavior, acceptance, stop conditions and rollback.
5. Do not read or scan secret files, run the app/build, call AISStream, append implementation evidence, update the read-only `SPRINT-02.md`, or modify `NEXT_SESSION.md` during contract preparation.

- **Expected:** the contract is structurally complete and ready for human review; all implementation acceptance remains unchecked. This contract-preparation check is not evidence of reader, collector, route or provider behavior.

### Future implementation checks — requirements, not observed results

1. Run `git diff --check` and inspect the complete changed-path boundary.
2. Run focused `npx playwright test tests/snapshot-reader.spec.ts tests/snapshot-collector.spec.ts` with fake events and controlled time; no network or real key.
3. Run `npx tsc --noEmit`, the repository's required build check, and relevant direct server type checking if required by the implementation; record exact commands and results. Avoid commands that load local environment files unless required and separately reviewed; never inspect their values.
4. Verify the final route response shape and all fixed error mappings through deterministic tests. A no-key check must use an injected/missing configuration seam or a safe blank-key setup that does not inspect a secret file.
5. Inspect that B-09 transport invariants and B-11 transformer behavior are retained; confirm timer/socket cleanup and no partial-success path.
6. Do not run live AISStream requests, use a real key, add release-level R3 tests, perform B-13 UI checks, or claim live provider availability from these tests.

- **Evidence boundary:** fake-source/controlled-clock checks can establish only local reader/collector/route behavior under the tested event sequences. They cannot establish AISStream availability, real-key validity, actual message receipt, vessel identity, completeness of traffic, complete R2 user-story acceptance or release readiness.

## Stop conditions

- Stop before implementation if this Draft is not human-reviewed with `continue` and a separate explicit B-12 implementation authorization is absent.
- DEC-007 now resolves the B-12-specific conflict with `SPRINT-02.md` Part C. Stop before implementation if DEC-007 is superseded/revoked or if the proposed B-12 boundary materially changes; keep the Sprint file read-only in this task. Also stop if exact subscription, fixed messages, timing boundary or response semantics conflict with the approved product contract; if any required path beyond the listed future implementation paths is needed; or if a dependency, live provider request, real key or secret-file access appears necessary.
- Stop if implementation would require changing B-08 key handling or B-11 transformation semantics, modifying UI/shared vessel model, adding public error codes, returning partial data, opening a second parallel provider connection, or introducing continuous/persistent behavior.
- Stop after implementation if the reader fails to forward later messages, the deadline omits connection time, equal/older timestamps replace the accepted vessel, duplicates consume the unique limit, error/cancellation returns partial success, a key/provider detail is exposed, cleanup or completion occurs more than once, tests fail, or unexpected paths change.
- **Exit decision:** `DONE` only after separately authorized implementation, focused checks, factual evidence, final human diff review and explicit `continue`; otherwise `CONTINUE WITH APPROVAL` or `HOLD`.

## Rollback / recovery

If this Draft is revised or rejected before implementation, inspect the diff and remove or revise only the appended B-12 section in `TASK_SPEC.md`; preserve verified B-08…B-11 history, append-only evidence/runbook history, the pre-existing `START.md` deletion and all unrelated staged/untracked/generated paths. If a later authorized B-12 implementation is rejected, inspect the diff and restore only `server/aisstream-reader.ts`, `server/snapshot-collector.ts`, `app/api/snapshot/route.ts`, `tests/snapshot-reader.spec.ts` and `tests/snapshot-collector.spec.ts` to their last verified pre-B-12 state. Do not reset the shared branch, delete local files, stop unrelated processes, or inspect/alter secret files. Product owner decides recovery acceptance based on reviewed diff and actual evidence.

## Human contract review

- **Date:** 2026-09-24.
- **Decision:** `continue` — the task contract and customer-facing rationale are approved as the contract for any future separately authorized implementation.
- **Review scope:** contract consistency against Sprint 2 Part A/Part C and DEC-007, including response shapes, one-connection boundary, 15-second total window, 100-vessel limit, timestamp deduplication, fixed errors, cancellation, cleanup, deterministic verification and excluded paths.
- **Outcome:** no contract blocker identified. The B-12 implementation acceptance criteria below remain unchecked and are not claimed as satisfied.
- **Authorization boundary:** this decision approves the contract only. It is not the separate explicit authorization required before changing implementation or test paths, and it does not authorize live AISStream access, real-key use, commit or push.

## Implementation authorization

- **Date:** 2026-09-24.
- **User authorization:** the user explicitly authorized B-12 implementation with “дозволяю B-12 реалізацію”.
- **Authorized scope:** only the implementation and deterministic tests in the exact future paths listed above; task acceptance, verification, excluded paths, no-live-provider/no-secret constraints, and separate commit/push gate remain unchanged.
- **Status:** implementation work may proceed. Final acceptance remains gated by actual checks and a separate human diff review.

## Implementation checkpoint — completed local checks

- **Date:** 2026-09-24.
- **Implemented paths:** `server/aisstream-reader.ts`, new `server/snapshot-collector.ts`, `app/api/snapshot/route.ts`, `tests/snapshot-reader.spec.ts`, and new `tests/snapshot-collector.spec.ts`. The implementation remained within the authorized B-12 paths; no live provider request, real-key inspection, dependency change, commit or push was performed.
- **Targeted tests:** `npx playwright test tests/snapshot-reader.spec.ts tests/snapshot-collector.spec.ts` — passed, 17 tests.
- **Type check:** `npx tsc --noEmit` — passed (exit 0; no diagnostics printed).
- **Build:** `AISSTREAM_API_KEY= npm run build` — passed. Next.js reported `.env.local` as an environment source; no value was manually inspected or printed, and no live request was made. The build also warned that `/Users/romanmakarenko/package-lock.json` is outside the repository and suggested configuring `turbopack.root`; build completed successfully.
- **Whitespace check:** `git diff --check` — passed; separate no-index whitespace checks for the two new files produced no diagnostics.
- **Diagnostics note:** IDE diagnostics requests timed out; the standalone TypeScript check passed.
- **Acceptance boundary:** the checks establish only the tested local reader/collector/route behavior. Live provider behavior, complete R2 user-story acceptance, demo readiness and release readiness are not established.

## Final human implementation review

- **Date:** 2026-09-24.
- **Source:** user decision: “diff перевірив, continue”.
- **Decision:** `continue`; user completed the final diff review and accepted the bounded B-12 implementation for continuation.
- **Outcome:** B-12 is `Verified` within this task's local scope. This is not commit/push authorization and does not claim live AISStream behavior, complete R2 acceptance or release readiness.
- **Evidence:** implementation checks are recorded in `E-SEA-046`; final human review is recorded in `E-SEA-047`.

## Handoff

- **Contract / task status:** `Verified` for bounded B-12 local implementation after checks and the user's `continue` decision on 2026-09-24. Contract review, implementation authorization and final diff review are recorded above.
- **Evidence boundary:** baseline commit `bf7cc4e1cd1a8029ccdaf82155ee45ede055824d` was synchronized with `origin/sprint2`. Deterministic implementation checks and the human review decision are recorded in `E-SEA-046` and `E-SEA-047`; product behavior with AISStream and real-key validity remain unverified.
- **Open Unknowns/blockers:** live provider availability, real-key validity, live receipt, actual AISStream event semantics, complete R2 user-story acceptance and release readiness remain `Unknown`/`Needs verification`. `CLAUDE.md` and `SPEC.md` still describe B-08 as current; governance-status synchronization is a separate documentation decision and remains outside this task. DEC-007 is `Ready` and resolves the B-12 transport-boundary conflict.
- **Delivery completed:** commit `3de88ab` (`feat(r2): implement B-12 snapshot collector`) delivered the reviewed implementation and unchanged `SPRINT-02.md`; documentation follow-up `fef4a8f` (`docs(r2): record B-12 remote delivery`) is also synchronized with `origin/sprint2`. `E-SEA-048` records the implementation delivery; the follow-up commit removes the absolute local path from the runbook entry.
- **Next bounded action:** prepare the B-13 task contract for human review only. B-13 implementation, live AISStream, real-key use and any further commit/push remain separately gated.
- **Rollback / recovery:** no rollback was performed. If the `continue` decision is revised, inspect the diff and restore only the five B-12 implementation/test paths to their verified pre-B-12 state; preserve append-only records, the pre-existing `START.md` deletion, the now-user-authorized `SPRINT-02.md` path and all unrelated untracked paths. Product owner decides recovery acceptance from the reviewed diff and evidence.

## Delivery authorization — commit, push and Sprint 2 tracking

- **Date:** 2026-09-24.
- **User authorization:** the user requested “давай закомітимо та запушимо, також додай в гіт /Users/romanmakarenko/Documents/code/SeaRadar/SPRINT-02.md”.
- **Exact delivery scope:** commit and push the five B-12 implementation/test paths plus `TASK_SPEC.md`, `EVIDENCE.md`, `RUNBOOK.md`, and the existing `SPRINT-02.md`; no other pre-existing or untracked path is authorized for staging.
- **Sprint-file boundary:** `SPRINT-02.md` remains content-read-only. The user specifically authorized tracking this existing file as-is; it will not be edited. This is a one-time exception only to its previously excluded staging boundary.
- **Preservation:** leave the `START.md` deletion and all other unrelated untracked inputs unstaged and unchanged. No live AISStream request, real-key use, B-13 work, or deployment is authorized by this delivery instruction.
- **Status:** completed. Exact authorized paths were committed as `3de88ab` and pushed; the local and remote branch were subsequently verified at `fef4a8f`. No other path was added to that delivery.

# TASK-SEA-R2-DEC007-001 — B-12 transport-boundary decision record

- **Version:** `1.0.0`
- **Status:** `Verified`
- **Product owner:** методист відділення теорії судноводіння навчального центру «Норд-Вест»
- **Delivery / technical owner:** виконавець проєкту
- **Date:** 2026-09-24
- **Related artifacts:** [`CLAUDE.md`](CLAUDE.md), [`TASK_SPEC.md`](TASK_SPEC.md), [`SPRINT-02.md`](SPRINT-02.md), [`docs/decisions/README.md`](docs/decisions/README.md), [`docs/decisions/DEC-006-r2-scope.md`](docs/decisions/DEC-006-r2-scope.md), `TASK-SEA-R2-B09-001`, `TASK-SEA-R2-B12-001`.

## Goal and boundary

- **Goal:** prepare `DEC-007`, obtain the product owner's approval and update the decision index for the narrowly scoped B-09 reader-boundary extension for B-12.
- **Approved decision:** one existing B-09 WebSocket attempt forwards multiple ordered raw text messages to B-12's collector; no second connection, transformer change, continuous service or product-scope expansion.
- **This is documentation only:** it does not approve B-12 implementation, endpoint/test changes, live provider access, secret access, commit or push. Those remain separately gated.

## Owner and allowed paths

- `TASK_SPEC.md` — this bounded preparation contract and the B-12 cross-reference.
- `docs/decisions/DEC-007-r2-b09-streaming-boundary.md` — the approved B-12 boundary decision record.
- `docs/decisions/README.md` — register the approved record in the current-decisions index.
- **Excluded:** `SPRINT-02.md` (read-only); `CLAUDE.md`, `SPEC.md`, implementation/tests, `EVIDENCE.md`, `RUNBOOK.md`, all secrets and all unrelated/pre-existing paths.

## Acceptance and verification

- [x] DEC-007 has the required metadata, context, options, approved decision, rationale, consequences/risks, verification trigger and links to the B-12 task and related evidence/records.
- [x] The user approved DEC-007 on 2026-09-24; status is `Ready`, and the record does not authorize implementation.
- [x] The Part C conflict is explicitly resolved for B-12 by DEC-007; the read-only `SPRINT-02.md` remains unchanged.
- [x] The approved decision is registered in `docs/decisions/README.md`; no sprint, code, test, evidence or runbook path changed.
- **Targeted checks:** `git diff --check -- TASK_SPEC.md` and the DEC-007 structural check passed. `git diff --no-index --check /dev/null docs/decisions/DEC-007-r2-b09-streaming-boundary.md` emitted no whitespace diagnostics; exit status `1` reflected the expected new-file difference. Full documentation diff and changed-path boundary were inspected.
- **Observed result:** DEC-007 is `Ready`; the B-12 transport-boundary exception is recorded and indexed. B-12's own task contract remains `Draft` pending its separate review. No implementation, live provider request, secret access, commit or push occurred.
- **Rollback:** inspect and remove/revise only the appended DEC007 task section and the DEC-007 entry/file. Preserve all historical and pre-existing paths.
- **Next gate:** human review of `TASK-SEA-R2-B12-001`; implementation remains separately authorized only after that review and explicit user authorization.

# TASK-SEA-R2-HANDOFF-001 — Next-session transfer preparation

- **Version:** `1.0.0`
- **Status:** `Verified`
- **Product owner:** методист відділення теорії судноводіння навчального центру «Норд-Вест»
- **Delivery / technical owner:** виконавець проєкту
- **Date:** 2026-09-24
- **Related artifacts:** [`CLAUDE.md`](CLAUDE.md), [`SPEC.md`](SPEC.md), [`SPRINT-02.md`](SPRINT-02.md), [`TASK_SPEC.md`](TASK_SPEC.md), [`EVIDENCE.md`](EVIDENCE.md), [`RUNBOOK.md`](RUNBOOK.md), [`NEXT_SESSION.md`](NEXT_SESSION.md), `TASK-SEA-R2-B12-001`, `E-SEA-046`, `E-SEA-047`, `E-SEA-048`.

## Goal and boundary

- **Goal:** refresh the restart handoff after the bounded B-12 implementation and delivery, so the next session can resume from the verified remote baseline without replaying this conversation.
- **Output:** an accurate `NEXT_SESSION.md` prompt and factual B-12 delivery closure/current next gate in this task record.
- **Scope:** documentation only. B-13 implementation is not part of this task; the next session may prepare a B-13 task contract for human review only.
- **Authorization:** the user requested project handoff preparation on 2026-09-24. This does not authorize B-13 implementation, live provider access, secret use, or commit/push.

## Allowed paths and exclusions

- **Allowed:** `TASK_SPEC.md` (this section and current B-12 delivery closure), `NEXT_SESSION.md`, append-only `EVIDENCE.md`, append-only `RUNBOOK.md` after checks.
- **Read-only:** `CLAUDE.md`, `SPEC.md`, `SPRINT-02.md`, `DEC-006`, `DEC-007`, implementation/tests, current Git history and remote refs.
- **Excluded:** product/source/test/runtime/configuration paths, `CLAUDE.md`, `SPEC.md`, `SPRINT-02.md`, decision records/index, secrets and all unrelated/pre-existing paths. Do not stage or clean excluded/untracked paths.

## Expected output and acceptance

- [x] `NEXT_SESSION.md` names `fef4a8f` as the delivered baseline and describes B-12 as `Verified`/delivered only within its bounded local scope.
- [x] The next bounded action is B-13 contract preparation for human review only; B-13 implementation requires a separate reviewed contract and explicit authorization.
- [x] Live AISStream availability/receipt, real-key validity, complete R2 acceptance, and release readiness remain `Unknown`/unverified.
- [x] Existing `START.md` deletion and unrelated untracked inputs are preserved; `NEXT_SESSION.md` remains untracked; `SPRINT-02.md` remains unchanged.
- [x] The stale B-12 delivery gate is closed by the factual delivery record above; append-only evidence/history are extended only after checks.
- [x] No commit, push, product command, live request, or secret access occurs.

## Verification, stop and recovery

- **Checks:** `HEAD`, local `origin/sprint2`, and remote `refs/heads/sprint2` were verified at `fef4a8fc51c9c0e41a8158e4e541af574f895741`; `git diff --check -- TASK_SPEC.md EVIDENCE.md RUNBOOK.md` passed; focused Python checks confirmed required handoff content, preserved R1 archive and no trailing whitespace; changed-path and staged-path inspection confirmed the documented boundary and no staged paths.
- **Observed result:** all six acceptance criteria passed. `TASK_SPEC.md`, `EVIDENCE.md`, and `RUNBOOK.md` are locally modified; `NEXT_SESSION.md` remains untracked. Existing `START.md` deletion and other untracked paths remain preserved. Initial structural validator had one mismatched expected phrase; the check was corrected to the actual approved wording and passed. No product tests/build/server/live request/secret access/commit/push occurred.
- **Stop if:** a ref differs from the recorded baseline, handoff requires changing `SPRINT-02.md`/governance decisions or product behavior, or any secret/live-provider operation is proposed. Record the blocker and ask for a separate decision rather than silently expanding scope.
- **Recovery:** inspect the documentation diff; restore only the handoff edits in `TASK_SPEC.md` and `NEXT_SESSION.md` if rejected. Never reset the shared branch or alter prior append-only evidence/runbook entries, `START.md`, or unrelated local paths.
- **Human review:** user confirmed `diff перевірив` and chose `continue` for this handoff diff on 2026-09-24. This accepts the documentation-only handoff checkpoint; it does not authorize commit/push or B-13 implementation. Recorded in `E-SEA-050`.
- **Exit:** `Verified` for the documentation-only handoff at the local workspace checkpoint; commit/push and B-13 implementation remain unauthorized.

# TASK-SEA-R2-B13-001 — R2 snapshot interface

- **Version:** `1.0.0`
- **Status:** `Verified`
- **Product owner:** методист відділення теорії судноводіння навчального центру «Норд-Вест»
- **Delivery / technical owner:** виконавець проєкту
- **Date:** 2026-09-24
- **Related artifacts:** [`CLAUDE.md`](CLAUDE.md), [`PROJECT_BRIEF.md`](PROJECT_BRIEF.md), [`SPEC.md`](SPEC.md), [`SPRINT-02.md`](SPRINT-02.md), [`TASK_SPEC.md`](TASK_SPEC.md), [`EVIDENCE.md`](EVIDENCE.md), [`RUNBOOK.md`](RUNBOOK.md), [`docs/decisions/DEC-006-r2-scope.md`](docs/decisions/DEC-006-r2-scope.md), [`docs/decisions/DEC-007-r2-b09-streaming-boundary.md`](docs/decisions/DEC-007-r2-b09-streaming-boundary.md), `TASK-SEA-R2-B12-001`, `E-SEA-046`–`E-SEA-051`, `E-SEA-077`, [`docs/checkpoints/CHECKPOINT-23.md`](docs/checkpoints/CHECKPOINT-23.md), [`app/map-shell.tsx`](app/map-shell.tsx), [`app/sea-map.tsx`](app/sea-map.tsx), [`app/vessel-card.tsx`](app/vessel-card.tsx), [`app/api/snapshot/route.ts`](app/api/snapshot/route.ts), [`server/snapshot-collector.ts`](server/snapshot-collector.ts), [`tests/vessel-selection.spec.ts`](tests/vessel-selection.spec.ts), [`tests/snapshot-interface.spec.ts`](tests/snapshot-interface.spec.ts).

## Goal, predecessor and authorization gate

- **Goal:** connect the existing map, demo vessels, shared marker/card behavior and `GET /api/snapshot` to the approved B-13 one-shot interface state flow.
- **Backlog:** `B-13` / `R2-B13-INTERFACE`.
- **SPEC outcome:** `SPEC-SEA-001 / US-05…US-08`; this bounded task does not by itself close those user stories or complete R2 acceptance.
- **Predecessors:** verified B-07 selection behavior, B-08 server-only key accessor, B-09 reader/route boundary, B-11 transformer and B-12 final snapshot response. B-10 remains a synthetic sample and is not live-provider evidence.
- **Governance:** R2 is authorized by `DEC-006`; B-13 remained individually task-gated. `DEC-007` authorizes only the B-12 transport-boundary exception and did not itself authorize B-13 implementation, live-provider access or delivery. This contract introduced no change to scope, API contract, provider, security boundary or `SPRINT-02.md`.
- **Gate history:** the user accepted this contract and separately authorized the B-13 implementation on 2026-09-24. The implementation and local checks are recorded below. Live AISStream access, real-key use, deployment and overall R2 acceptance remain outside that authorization. The user separately authorized the code and delivery-record commit/push requests; the final human review of this implementation/documentation diff remains a distinct checkpoint.

## Owner and allowed paths

- **Contract-preparation path:** append this B-13 contract to `TASK_SPEC.md`; retain all prior task and handoff history.
- **Implementation paths used by the authorized delivery (`17006c6`):**
  - `app/map-shell.tsx` — one-shot request/state ownership, source/status copy, selection reset and button behavior.
  - `app/sea-map.tsx` — render the supplied demo or snapshot vessels through the existing Leaflet marker lifecycle; ensure demo motion is stopped while loading and real snapshots remain stationary.
  - `app/globals.css` — only the minimal existing-panel/status styling needed for the specified states; no visual redesign.
  - `tests/snapshot-interface.spec.ts` — one focused Playwright spec using intercepted/mocked `GET /api/snapshot` responses; no live network or credentials.
- **Append-only records after actual checks and final review:** `EVIDENCE.md` and `RUNBOOK.md`.
- **Read-only inputs:** `CLAUDE.md`, `PROJECT_BRIEF.md`, `SPEC.md`, `SPRINT-02.md`, DEC-006, DEC-007, B-07/B-12 implementation and tests, existing map/card/model/CSS and current dependency/test configuration.
- **Excluded paths:** all `.env*` files, credentials, `server/`, `app/api/`, `app/vessel-model.ts`, `app/vessel-card.tsx`, B-08/B-09/B-11/B-12 implementation paths, `data/`, package manifests/lockfile, Playwright/test-runner configuration, existing B-07 and B-12 tests, `CLAUDE.md`, `PROJECT_BRIEF.md`, `SPEC.md`, `SPRINT-02.md`, decision records/index, `NEXT_SESSION.md`, `README.pdf`, `.agents/`, `.claude/skills/`, `reference/`, `skills-lock.json`, the pre-existing `START.md` deletion, generated files and all unrelated paths. Do not inspect, modify, stage or clean excluded paths.

## Inputs and behavior contract

- **API boundary:** call only the existing same-origin `GET /api/snapshot`; do not change its URL, request method, headers, response schema, fixed error mappings, Node.js runtime or server/key handling. Do not include a key or credential in browser code, request data, response handling, logs or test fixtures.
- **Idle demo:** on initial load, preserve the current three moving demo vessels and existing `Демонстраційні дані` source label. Preserve B-07 marker IDs, marker click-to-card mapping, repeated-click persistence and card formatting.
- **Loading:** clicking the single enabled `Завантажити справжні позиції` button starts one request. While pending, disable the button, stop/unmount demo motion, remove demo markers, clear the selected vessel/card and show `Завантаження…`; retain the base map. Do not allow overlapping requests or stale completion to replace a later state. After an attempt settles, a user may click again to start a new one-shot attempt; there is no automatic retry, polling or history. A page reload returns to the initial demo state; do not persist results.
- **Successful non-empty snapshot:** render exactly the returned `vessels` as stationary AISStream markers using the existing marker icon and card. Selecting a marker opens its matching card; repeated selection must not switch to another vessel. Show the literal status `AISStream · знімок за 15 с · отримано HH:MM:SS UTC · суден: N · вибірка неповна`, where time is formatted from `collectedAt` in UTC and `N` is the returned `count`. If `truncated` is true, append ` · зупинено на ліміті 100`. The `15` denotes configured window length, not measured elapsed duration. On the first non-empty success only, return the map to its existing initial center/zoom; subsequent successful non-empty attempts must not force a view change. Do not animate or interpolate AIS vessels.
- **Successful empty snapshot:** represent `ok: true` with zero vessels as `empty`, not as a transport error or proof that no vessels exist. Show the same AISStream status label with `суден: 0` and the exact explanation `За час збору позицій не отримано`; render no vessels/card and keep the base map.
- **Error:** any fixed B-12 error response results in an empty map state: remove all demo/snapshot markers and the selected card, show source/status `Даних на карті немає`, and show `Не вдалося отримати дані: <message>` using only the fixed response message. For `no_api_key`, the exact UI text is `Не вдалося отримати дані: Ключ AISStream не налаштовано`. Do not preserve an earlier snapshot after a failed new attempt. A page reload restores the demo state.
- **Rejected/malformed response copy:** Sprint/API contracts specify fixed messages for server error responses but do not define the UI message for browser fetch rejection or an invalid JSON/schema response. For either case, show the fixed text `Не вдалося отримати дані: Сервіс не повернув коректну відповідь`. Do not expose raw response, exception, stack or provider text. The user approved this fallback on 2026-09-24; do not change it without review.
- **Latest attempt / races:** the loading lock prevents concurrent user attempts; clear the selected vessel on each attempt and on empty/error completion. An attempt that has settled may be followed by a fresh user-initiated request. No public API error code or response shape is added by the UI.
- **Map boundary:** preserve the existing base map, tile source/attribution, bounds, map interaction and client-only Leaflet import/lifecycle. Do not add a map library, redesign, new region, map persistence or external request beyond existing basemap tiles and the same-origin snapshot request.

## Expected output

1. One button wired to the existing B-12 endpoint and the specified idle/loading/success/empty/error state transitions.
2. Reuse of the existing shared `Vessel`, marker icon, card, selection and formatting behavior; demo motion exists only in idle-demo and snapshot vessels are stationary.
3. Minimal deterministic browser coverage of the state transitions and regressions, using mocked endpoint responses and blocked external tile requests; no live AISStream request or real key.
4. Factual append-only evidence and runbook handoff after the authorized implementation checks and final human diff review.

## Acceptance criteria — implementation and review verified

- [x] Initial page load preserves three demo vessels, their movement, source label, shared card behavior and all existing B-07 assertions.
- [x] One button triggers one same-origin snapshot request; while pending it is disabled and demo vessels, selection and card are absent while the base map remains.
- [x] A second click cannot start an overlapping request; a later user-initiated attempt can start only after the previous attempt settles.
- [x] A non-empty success renders exactly the returned MMSI IDs once each, keeps them stationary, opens the matching existing card and displays the exact status text using response count/time/truncation values.
- [x] First non-empty success resets the map to the existing initial center/zoom; later success does not reset a user-adjusted view.
- [x] Empty success renders no vessels/card and displays the exact empty explanation and the success status with count zero; it is distinct from an error.
- [x] Fixed API error responses render no vessels/card, use `Даних на карті немає`, and show the exact response message; the no-key UI text matches exactly. No prior snapshot is retained.
- [x] Network rejection and malformed response render no vessels/card and show exactly `Не вдалося отримати дані: Сервіс не повернув коректну відповідь`, without exposing raw details.
- [x] Reload returns to idle-demo; no UI state is persisted, no automatic retry/polling/history is added, and AIS vessels never move. A later attempt requires a fresh user click after settlement.
- [x] The unchanged B-07 Playwright test and focused snapshot-interface cases passed with mocked responses and blocked OSM tiles.
- [x] A separate security/path review confirms no key, secret, provider/raw error, stack, or unvalidated response payload is exposed, and no excluded server/API/model/card/config/dependency path changed; see `E-SEA-077` and CHECKPOINT-23.
- [x] Final human diff review disposition: user chose `continue` on 2026-09-27; commit/push remain separately authorized only.

**Human review:** user chose `continue` for this B-13 contract and approved the generic fallback copy on 2026-09-24. That accepted the task contract, not the later implementation diff. The user separately authorized B-13 implementation and later requested delivery; live AISStream access, real-key use and overall R2 acceptance remain outside this task.

**Current acceptance status:** `Verified` for the bounded B-13 interface task after the exact-commit security/path review and the user's `continue` disposition on 2026-09-27. This does not claim live UI/API end-to-end behavior, full R2 acceptance, or release readiness; see `E-SEA-077` and CHECKPOINT-23.

## Verification plan

### Contract-preparation checks — historical checkpoint, 2026-09-24

1. The B-12 baseline and preservation boundaries were inspected; no paths were staged.
2. The proposed contract was compared with the R2 scope, decisions, B-12 response shape and current UI/API boundaries.
3. `git diff --check -- TASK_SPEC.md` and focused structure/content checks passed after correcting a validator expectation.
4. These checks established only that the proposed contract was bounded and structurally consistent; they did not prove UI behavior, browser acceptance, provider availability, key validity, full R2 acceptance or release readiness.

### Implementation verification — observed 2026-09-24

1. `npx playwright test tests/vessel-selection.spec.ts tests/snapshot-interface.spec.ts` — **PASS**, 16 tests (B-07 and B-13 mocked browser cases; external OSM tile requests blocked by the tests).
2. `npx tsc --noEmit` — **PASS** (exit success).
3. `npm run build` — **PASS**; Next.js reported that `/Users/romanmakarenko/package-lock.json` is outside the repository and was ignored.
4. `git show --format=fuller --stat --oneline HEAD` and `git diff HEAD^ HEAD --name-only` confirmed that B-13 commit `17006c615f7a93e84c7c554c624b8909691828fb` contains exactly the four authorized implementation/test paths. `git rev-parse HEAD`, `git rev-parse origin/sprint2`, and `git ls-remote origin refs/heads/sprint2` agreed on the same commit.
5. No live AISStream request or real-key inspection/use was performed. The browser tests use deterministic mocked responses; these checks do not establish live provider behavior, overall R2 acceptance or release readiness.
6. At the time of the 2026-09-24 implementation verification, the implementation/security-path review and final human diff decision remained pending. They were subsequently completed under `TASK-SEA-R2-B13-REVIEW-001`; see `E-SEA-077` and CHECKPOINT-23.

## Stop conditions

- **Original implementation gate (satisfied):** contract review and separate explicit user authorization were required before implementation; both were obtained before the B-13 code change.
- Stop if implementing the approved text/state requires changing the B-12 API response/error contract, server/key handling, shared `Vessel` model/card, B-07 test/config, a dependency, an excluded path or any product scope beyond `SPRINT-02.md`.
- Stop if the interface cannot stop demo motion while retaining the base map within the allowed paths, if exact copy/empty-vs-error semantics remain ambiguous, or if live access/real-key inspection would be required for an acceptance check.
- Stop after implementation if overlapping requests are possible, an old result overwrites a newer attempt, error preserves stale vessels, empty is confused with failure, a marker/card mismatch occurs, AIS markers move, demo motion continues during loading, map reset violates the first-success rule, key/provider text leaks, tests fail, or unexpected paths change.
- **Exit decision:** `DONE` only after authorized implementation, targeted checks, factual evidence and final human `continue`; otherwise `CONTINUE WITH APPROVAL` or `HOLD`.

## Rollback / recovery

No rollback was performed. If recovery is requested, inspect the reviewed diff and revert only `app/map-shell.tsx`, `app/sea-map.tsx`, `app/globals.css` and `tests/snapshot-interface.spec.ts` to the B-12 baseline at `fef4a8f`; do not reset the shared branch, touch secrets, stop unrelated processes, or alter unrelated/untracked paths. The product owner decides recovery acceptance based on the actual diff and evidence.

## Handoff

- **Contract-preparation checkpoint (historical):** the B-13 contract was reviewed and accepted on 2026-09-24; that decision alone did not authorize implementation, live provider access, real-key use, or delivery.
- **Implementation and checks:** the separately authorized B-13 interface implementation is committed as `17006c615f7a93e84c7c554c624b8909691828fb` (`feat(r2): deliver B-13 snapshot interface`) on `sprint2`. The commit contains exactly `app/globals.css`, `app/map-shell.tsx`, `app/sea-map.tsx`, and `tests/snapshot-interface.spec.ts`. On 2026-09-24, `npx playwright test tests/vessel-selection.spec.ts tests/snapshot-interface.spec.ts` passed all 16 tests; `npx tsc --noEmit` succeeded; `npm run build` succeeded. The build emitted a warning that Next.js ignored `/Users/romanmakarenko/package-lock.json` because it is outside this repository.
- **Delivery state:** before this documentation closeout, local `HEAD`, `origin/sprint2` and remote `refs/heads/sprint2` were verified at `17006c615f7a93e84c7c554c624b8909691828fb`. Delivery records are being updated under the separately authorized documentation commit/push request; record that delivery only after verifying its outcome.
- **Review outcome:** on 2026-09-27, the exact-commit security/path and final-diff review passed with no findings; the user chose `continue`. The scoped B-13 task status is `Verified`; see `E-SEA-077` and CHECKPOINT-23.
- **Limitations / next action:** automated checks establish bounded mocked local behavior only. No live AISStream request, real-key validity/receipt, full R2 acceptance or release readiness is established. Preserve all unrelated changes and paths; any further technical work requires its own bounded contract and approval.

# TASK-SEA-R2-B09B10-LIVE-001 — One live AISStream receipt and provenance

- **Version:** `1.0.0`
- **Status:** `Active`
- **Product owner:** методист відділення теорії судноводіння навчального центру «Норд-Вест»
- **Delivery / technical owner:** виконавець проєкту
- **Date:** 2026-09-24
- **Related artifacts:** [`CLAUDE.md`](CLAUDE.md), [`SPRINT-02.md`](SPRINT-02.md), [`TASK_SPEC.md`](TASK_SPEC.md), [`EVIDENCE.md`](EVIDENCE.md), [`RUNBOOK.md`](RUNBOOK.md), [`docs/decisions/DEC-004-checkpoint-convention.md`](docs/decisions/DEC-004-checkpoint-convention.md), `TASK-SEA-R2-B09-001`, `TASK-SEA-R2-B10-001`, `E-SEA-031`–`E-SEA-039`, [`server/aisstream-config.ts`](server/aisstream-config.ts), [`server/aisstream-reader.ts`](server/aisstream-reader.ts), [`data/samples/position-report.sample.json`](data/samples/position-report.sample.json), [`data/samples/PROVENANCE.md`](data/samples/PROVENANCE.md).

## Goal and authorization

- **Goal:** make one bounded live attempt through the existing server-side AISStream reader, capture one actual `PositionReport` if received, preserve one sanitized sample with truthful provenance, and record whether the B-08…B-10 evidence supports Sprint 2 checkpoint 03.
- **Sprint outcome:** `SPRINT-02.md` session 3 expects a live server-received message, a sample with provenance, secure key configuration, and working demo. This task does not claim the checkpoint passes unless each criterion has supporting evidence.
- **Authorization:** on 2026-09-24 the user explicitly authorized using the locally configured real key for a live check and separately confirmed permission to save one sanitized `PositionReport`. This authorization is limited to this one task; it does not authorize inspecting or printing the key, further attempts, production activity, or broad R2 acceptance.
- **Capture boundary:** `GET /api/snapshot` and `collectSnapshot` return transformed `Vessel[]`, not the raw provider message. Do not reconstruct or relabel a transformed vessel as a `PositionReport`. For this bounded sample only, the proposed method invokes the existing `getAISStreamApiKey()` accessor and `startAISStreamReader()` directly from a one-shot server-side harness; the harness is not added to the repository and does not change or expose a product route. The Node 22.23.2 preflight successfully imported the existing reader module with built-in type stripping without loading the key or contacting AISStream.
- **Human gate:** review the exact diff and select `continue`, `revise` or `HOLD` before any environment loading, WebSocket connection, live attempt, sample creation or checkpoint record. The direct reader method is part of the review scope.
- **Review decision:** on 2026-09-24 the user selected `continue` and authorized this bounded contract. This authorizes only the one attempt and one sanitized sample described here.

## Allowed paths and exclusions

- **Contract preparation now:** only this appended section in `TASK_SPEC.md`.
- **After contract `continue`, if actual capture succeeds:** `data/samples/live/position-report.sample.json`; `data/samples/live/PROVENANCE.md`; append-only `EVIDENCE.md` and `RUNBOOK.md`; and `docs/checkpoints/CHECKPOINT-03.md` after evidence is recorded.
- **Read-only inputs:** the B-08 accessor, B-09 reader, B-12 snapshot collector/route, B-10 synthetic fixture/provenance, relevant Sprint 2/checkpoint convention, and existing B-07 demo evidence.
- **Excluded:** all code, routes, configuration, tests, package files/dependencies, `.env*` contents, credentials, UI/demo-retention behavior, `SPEC.md`, `SPRINT-02.md`, decision records, commit/push/deployment, and all unrelated, deleted or untracked paths. Do not alter or overwrite the existing synthetic B-10 sample or its provenance.

## Inputs and bounded behavior

- **Key handling:** use only the existing server-side accessor to supply the configured key to the reader. Never read, echo, log, copy into command output, artifact, or evidence the key or `.env.local` contents. Do not include raw WebSocket frames or provider error text in output.
- **One attempt:** one direct server-side reader invocation, one WebSocket connection, one 15-second total deadline including connect/open/subscription, no retry or polling. On the first valid text `PositionReport`, select only that one message, stop the reader, and close resources exactly once. On timeout, connection/provider error, malformed payload, or no suitable message, stop and do not retry.
- **Sample output:** if and only if one actual valid message arrives, retain a single sanitized JSON object at `data/samples/live/position-report.sample.json`. Preserve the provider field names/casing needed by the B-11 sample contract (`MetaData.MMSI`, `ShipName`, `latitude`, `longitude`, `time_utc`, and `Message.PositionReport.Sog`, `Cog`, `TrueHeading`, `Latitude`, `Longitude`). Retain only those needed fields; record a schema-permitted omission in provenance or do not save if a required field is absent/uncertain. No raw logs, key, credentials, private local path or unrelated fields.
- **Provenance:** `data/samples/live/PROVENANCE.md` must state origin `live`, retrieval time in UTC (separate from vessel observation time), source as the existing AISStream reader, fields retained/omitted, sanitization, region/filter context, and limits. Never claim more than the single message observed. Do not change the synthetic fixture provenance.
- **Demo evidence:** the existing B-07 automated demo-selection evidence (`E-SEA-026`) and mocked B-13 interface evidence (`E-SEA-051`) may be referenced as local demo evidence, but must not be presented as live UI/API end-to-end validation. This task does not change demo behavior or implement the separately gated demo-retention request.

## Expected output and acceptance

1. One live attempt is performed only after human `continue`, through the existing server-side reader/accessor; observed result is recorded accurately without exposing the key or raw provider text.
2. If a valid message is received, exactly one sanitized actual `PositionReport` and matching provenance are saved at the new live sample paths; existing synthetic sample files remain unchanged. If none is received, no sample is fabricated and B-10 live-sample acceptance remains unresolved.
3. The stored JSON parses, contains one message only, follows the approved field casing/shape, and passes a targeted scan for secret-like values and private paths.
4. The ignored/untracked status of `.env.local` is checked without reading its contents; it is not tracked or included in any artifact.
5. Evidence distinguishes existing local demo tests from the live reader result. Checkpoint 03 is created only after the observed outcomes are appended to `EVIDENCE.md`; it is marked passed only if the live-message, sample/provenance, safe-configuration and demo criteria are each supported. A checkpoint file itself is not evidence.
6. No product code, route, test, dependency, Sprint/decision contract or unrelated working-tree path changes; no commit, push or deployment occurs.

## Verification and stop conditions

- **Before live attempt:** after human `continue`, verify that the installed runtime can execute the one-shot harness without adding a dependency or repository code; verify `.env.local` is ignored and not tracked without viewing contents; prepare the bounded timer/cleanup and sanitized output path. If the safe harness cannot be run as contracted, stop and report the blocker rather than add a route or helper file.
- **After one attempt:** validate only the sanitized output; check JSON cardinality/shape, provenance consistency, absence of secrets/private paths, exact changed paths, and `git diff --check`. Append factual evidence/runbook records only after observed checks; then create the checkpoint record referencing evidence IDs.
- **Stop if:** human review does not select `continue`; the environment key is absent (without inspecting it); the one request errors/times out/yields no suitable message; the direct harness requires an unapproved dependency/code/path; sanitization is uncertain; any key/raw provider/error data could be exposed; or unrelated paths change. Never retry in this task.
- **Exit decision:** `DONE` only for a successful bounded live capture plus sanitized sample/provenance, supported demo and safe-config evidence, factual records, and final human review. Otherwise `CONTINUE WITH APPROVAL` or `HOLD`; do not mark checkpoint 03 passed or claim full R2/release readiness without all criterion-level evidence.

## Rollback / recovery

No live action has been performed for this Draft. If rejected before execution, remove only this appended task section. If a newly created live sample fails sanitization before evidence append, remove only the new `data/samples/live/` artifacts and leave the synthetic fixture unchanged. Evidence and RUNBOOK are append-only; after they are appended, correct any error by a superseding entry, not by rewriting history. Do not reset the branch or alter unrelated/deleted/untracked paths.

# TASK-SEA-R2-B09B10-LIVE-002 — One additional live AISStream receipt attempt

- **Version:** `1.0.0`
- **Status:** `Active`
- **Product owner:** методист відділення теорії судноводіння навчального центру «Норд-Вест»
- **Delivery / technical owner:** виконавець проєкту
- **Date:** 2026-09-24
- **Related artifacts:** [`CLAUDE.md`](CLAUDE.md), [`SPRINT-02.md`](SPRINT-02.md), [`TASK_SPEC.md`](TASK_SPEC.md), [`EVIDENCE.md`](EVIDENCE.md), [`RUNBOOK.md`](RUNBOOK.md), [`docs/decisions/DEC-004-checkpoint-convention.md`](docs/decisions/DEC-004-checkpoint-convention.md), [`docs/checkpoints/CHECKPOINT-03.md`](docs/checkpoints/CHECKPOINT-03.md), `TASK-SEA-R2-B09B10-LIVE-001`, `E-SEA-052`, [`server/aisstream-config.ts`](server/aisstream-config.ts), [`server/aisstream-reader.ts`](server/aisstream-reader.ts), [`server/position-report-transformer.ts`](server/position-report-transformer.ts).

## Goal and authorization

- **Goal:** after the first authorized attempt ended with the fixed `provider_error`, make at most one additional live attempt through the existing server-side reader; if one valid PositionReport arrives, save the one previously approved sanitized sample and truthful provenance; record the resulting checkpoint status.
- **User-reported context:** on 2026-09-24 the user asked “спробуй ще раз” and reported that the locally configured `AISSTREAM_API_KEY` worked in Postman. This is user-reported context, not independently verified evidence and not an explanation of the earlier reader error.
- **Authorization boundary:** the user's request authorizes preparation of this new bounded contract. No second live connection, environment loading, sample creation, or checkpoint update may occur until this exact contract is reviewed and the user selects `continue`. A continued contract authorizes exactly one additional attempt only; no retry or troubleshooting loop.
- **Retained sample consent:** the prior explicit permission to retain one sanitized PositionReport applies only if the single permitted sample path is still absent; do not create multiple live samples.

## Allowed paths and exclusions

- **Contract preparation:** this appended `TASK_SPEC.md` section only.
- **After contract `continue`:** if one suitable message is received, create only `data/samples/live/position-report.sample.json` and `data/samples/live/PROVENANCE.md`; append factual records to `EVIDENCE.md` and `RUNBOOK.md`; after evidence is recorded, create `docs/checkpoints/CHECKPOINT-04.md` as a superseding restart record referencing historical `CHECKPOINT-03.md` and the new outcome. If no suitable message is received, create no sample and still append the factual result plus a HOLD checkpoint record.
- **Read-only inputs:** prior live task and `E-SEA-052`; existing key accessor, reader and transformer; synthetic sample/provenance; Sprint 2 checkpoint criteria; `CHECKPOINT-03.md`; B-08 configuration and existing demo evidence.
- **Excluded:** product/source code, routes, tests, dependencies, `.env*` contents, credentials, UI/demo behavior, `SPEC.md`, `SPRINT-02.md`, decisions, commit/push/deployment, and all unrelated, deleted or untracked paths. Do not modify or overwrite the synthetic sample/provenance or the prior HOLD checkpoint.

## Bounded behavior and data handling

- **Key handling:** obtain the configured key only through `getAISStreamApiKey()`; use the existing ignored local environment configuration without reading or printing its contents. Never emit the key, raw WebSocket frame, provider error text, stack or other secret detail.
- **One additional attempt:** one direct `startAISStreamReader()` invocation, one WebSocket connection, one 15-second total deadline including connect/open/subscription, no retries or polling. Stop and close once on the first suitable valid PositionReport, a fixed reader error, malformed/unsuitable first message, or deadline.
- **Safe diagnostic signal:** the temporary in-memory harness may record only whether `onSubscribed` fired, the reader's fixed error enum, and a final outcome enum. It must not log, persist, parse for display, or expose provider error text or any raw message. The harness is not added to the repository.
- **Sample:** if and only if one actual valid message arrives and required B-11 fields are present, store one sanitized JSON object at `data/samples/live/position-report.sample.json`, retaining only `MetaData.MMSI`, `ShipName`, `latitude`, `longitude`, `time_utc` and `Message.PositionReport.Sog`, `Cog`, `TrueHeading`, `Latitude`, `Longitude`. Sanitize ShipName conservatively and document normalization. If a required field is absent or uncertain, do not save the sample.
- **Provenance:** record live origin, UTC retrieval time separately from vessel observation time, existing reader/subscription region context, fields kept/omitted, sanitation and limitations. Never claim more than one message was observed.
- **Checkpoint:** `CHECKPOINT-03.md` remains an immutable record of the initial HOLD. Create a subsequent canonical `CHECKPOINT-04.md` only after the new evidence is appended; state whether it supersedes the latest checkpoint-03 outcome, and mark Sprint checkpoint 03 passed only if live receipt, sample/provenance, safe configuration and demo criteria all have supported evidence.

## Acceptance and verification

1. Before any live attempt, complete contract review with user `continue`; verify the live sample targets are still absent and `.env.local` remains ignored/untracked without reading its contents; confirm the existing runtime/accessor/reader can run the temporary harness without repository changes.
2. Perform exactly one additional live attempt with the 15-second total limit and stage-only safe diagnostics. On any error, timeout, malformed/unsuitable message or missing key, stop without retry and save no sample.
3. If captured, verify the single sanitized sample parses, contains the required exact field casing and one PositionReport, and matches its provenance; do not expose its payload in terminal output.
4. Append `E-SEA-053` factual evidence and a RUNBOOK record. Distinguish the user's Postman report from the actual reader result and make no causal claim based on either alone.
5. Create a superseding `CHECKPOINT-04.md` after evidence. Mark overall Sprint checkpoint 03 passed only if each criterion is supported; otherwise record `HOLD` and unmet criteria.
6. Run `git diff --check`, check the exact allowed-path boundary and preserve all pre-existing deleted/untracked paths. No commit, push, deployment or product-code change.

## Stop conditions and recovery

- Stop before live access unless the exact contract receives `continue`; stop if the key is unavailable, runtime import fails, sample paths unexpectedly exist, a new dependency/path is needed, or any secret/raw provider detail could be exposed.
- Stop after this one attempt regardless of outcome. No second retry, provider troubleshooting, Postman access, key validation by display, or alternate live route is authorized.
- If the capture fails, preserve the existing HOLD state and do not fabricate sample data. Append the actual result and a new HOLD checkpoint only.
- If a newly written sample fails sanitization before evidence append, remove only the two new live sample artifacts. Keep the synthetic fixture and prior checkpoint unchanged. Evidence/RUNBOOK are append-only; correct later errors with superseding entries. Preserve unrelated deleted/untracked paths; do not reset or stage.
- **Current status:** `Active`; on 2026-09-24 the user reviewed this contract and chose `continue`. Exactly one additional live attempt was performed and is recorded as `E-SEA-053`; result was fixed `provider_error` after `onSubscribed`, with no valid PositionReport and no sample written. No retry occurred; final human review of the evidence/runbook/checkpoint diff remains pending.

# TASK-SEA-R2-B09B10-LIVE-003 — One bounded AISStream event-source diagnostic

- **Version:** `1.0.0`
- **Status:** `Active`
- **Product owner:** методист відділення теорії судноводіння навчального центру «Норд-Вест»
- **Delivery / technical owner:** виконавець проєкту
- **Date:** 2026-09-24
- **Related artifacts:** [`CLAUDE.md`](CLAUDE.md), [`SPRINT-02.md`](SPRINT-02.md), [`TASK_SPEC.md`](TASK_SPEC.md), [`EVIDENCE.md`](EVIDENCE.md), [`RUNBOOK.md`](RUNBOOK.md), [`docs/checkpoints/CHECKPOINT-03.md`](docs/checkpoints/CHECKPOINT-03.md), [`docs/checkpoints/CHECKPOINT-04.md`](docs/checkpoints/CHECKPOINT-04.md), `TASK-SEA-R2-B09-001`, `TASK-SEA-R2-B09B10-LIVE-001`, `TASK-SEA-R2-B09B10-LIVE-002`, `E-SEA-052`, `E-SEA-053`, [`server/aisstream-config.ts`](server/aisstream-config.ts), [`server/aisstream-reader.ts`](server/aisstream-reader.ts), [`server/position-report-transformer.ts`](server/position-report-transformer.ts).

## Goal and authorization gate

- **Goal:** make at most one newly authorized live diagnostic attempt through the existing server-side reader and distinguish, using non-sensitive event categories only, which reader event produced a post-subscription `provider_error`. Capture one actual sanitized PositionReport only if one is received and the user authorizes this contract.
- **Reason:** `E-SEA-053` records `SUBSCRIBED=yes` and the reader's fixed `provider_error`, but does not distinguish a post-subscription WebSocket `error` event from a non-text message. No reproducible local code defect has been established. The user's Postman report remains unverified; this task does not inspect Postman or infer cause from it.
- **Predecessor status:** `LIVE-001` and `LIVE-002` attempts are exhausted. Their records and the existing `HOLD` checkpoint remain immutable; this contract authorizes no request until its own review gate is satisfied.
- **Authorization:** a human review decision of `continue` on this exact contract explicitly authorizes exactly one diagnostic invocation, use of the real key only through `getAISStreamApiKey()`, and saving exactly one sanitized live sample/provenance if the valid-message criteria below pass. It does not authorize a retry, provider troubleshooting loop, Postman access, source changes, commit, push or deployment.

## Allowed paths and exclusions

- **Contract preparation:** append only this section to `TASK_SPEC.md`; do not alter earlier task sections.
- **After this contract receives `continue`, if a valid PositionReport is received:** create only `data/samples/live/position-report.sample.json` and `data/samples/live/PROVENANCE.md`; append factual results to `EVIDENCE.md` and `RUNBOOK.md`; then create `docs/checkpoints/CHECKPOINT-05.md` as the next restart record, retaining checkpoint 03/04 history.
- **After `continue`, if no valid PositionReport is received:** create no sample; append the observed event category and bounded outcome to `EVIDENCE.md` and `RUNBOOK.md`; create `CHECKPOINT-05.md` with `HOLD` after the evidence entries.
- **Read-only inputs:** existing key accessor, reader, transformer, approved subscription contract, E-SEA-052/053, B-10 synthetic fixture/provenance and latest checkpoint records.
- **Excluded:** every source, route, test, config, dependency and UI path; all `.env*` contents and credentials; Postman sessions/data; changes to endpoint, subscription, bounding box, timeout, error mapping or provider; all other sample paths; `SPEC.md`, `SPRINT-02.md`, decision records, commit/push/deployment and unrelated/deleted/untracked paths. Do not inspect, overwrite, stage or clean excluded paths.

## Bounded diagnostic behavior and data handling

- **Key boundary:** invoke the existing `getAISStreamApiKey()` accessor only. Never read, print, log, copy, return or persist the key or `.env.local` contents. Do not run `next dev`, Playwright, the API route, build commands or other tooling that may load local environment files.
- **One attempt:** one direct `startAISStreamReader()` invocation, one WebSocket connection and one total 15-second deadline including connection/open/subscription. No retry, polling or second route. Stop and clean up exactly once at the first terminal result.
- **Safe event classification:** use a temporary in-memory WebSocket wrapper/factory around the existing injected reader boundary. It may record only a fixed event-category enum (`pre_subscription_error_event`, `post_subscription_error_event`, `pre_subscription_close`, `post_subscription_close`, `non_text_message`, `text_message`, or `none`), the reader's fixed error enum, and whether local `onSubscribed` fired. If a close event occurs, the close code may be recorded as a number only; never record close reason. The final outcome must be one of `position_report_captured`, `no_valid_position_report`, `reader_error`, `timeout`, `key_missing`, or `harness_failure`. Do not access or output raw frame contents, error objects/messages, provider payloads, stack traces or headers. If this classification cannot be implemented without a product-path change or inspecting event contents beyond type, stop.
- **Message handling:** parse text frames as JSON in memory and pass only the parsed value to the existing B-11 transformer. If a valid PositionReport with the required sample fields arrives, stop after that one message and write one sanitized sample with matching provenance under the allowed paths. Do not print or persist the raw frame. If JSON parsing fails, transformation rejects the message, or required sample fields are absent, save no sample and stop without retry.
- **Sanitization/provenance:** retain only the agreed B-10/B-11 fields: `MetaData.MMSI`, `ShipName`, `latitude`, `longitude`, `time_utc`, and `Message.PositionReport.Sog`, `Cog`, `TrueHeading`, `Latitude`, `Longitude`. Record live origin, UTC retrieval time separately from observation time, the exact one-message limit, fields omitted/normalized, sanitization and limitations. Preserve the existing synthetic fixture/provenance unchanged.
- **No causal overclaim:** event category can distinguish reader branches only; it does not prove why the provider/transport emitted an event, validate the key, or establish provider acceptance. A local `onSubscribed` remains evidence only of local send.

## Expected output and acceptance

1. Exactly one bounded attempt is run only after explicit `continue` for this contract; the actual fixed outcome and sanitized event category are recorded without secrets/raw provider data.
2. If a valid PositionReport arrives, one and only one sanitized sample and matching provenance are created. Otherwise no sample is fabricated or saved.
3. All resources close once; no retry, polling, Postman inspection, product code/test/config/dependency change or unexpected path change occurs.
4. Evidence and checkpoint distinguish event observation from provider cause, key validity, provider acknowledgment, complete Sprint acceptance and release readiness. Checkpoint 03 remains `HOLD` unless the full Sprint criteria gain supported evidence; a checkpoint record is not evidence.
5. The final diff is reviewed and the user chooses `continue`, `revise` or `HOLD` for the documentation/evidence result. This review does not authorize another live attempt.

## Verification and stop conditions

- **Before attempt:** after contract `continue`, verify `.env.local` ignore/tracking status and the live sample targets' absence without reading env-file contents; verify the runtime imports needed modules without loading env files or starting the app; prepare the one-shot timer, cleanup and event-category-only output. If any check requires reading a secret or starting Next/Playwright, stop.
- **After attempt:** validate the sanitized sample/provenance if created without printing its payload; verify exact changed paths, one-attempt bound, append-only evidence, checkpoint links and `git diff --check`. No app tests/build or provider-side diagnosis is included.
- **Stop before attempt if:** this exact contract is not reviewed with `continue`; key is missing; the harness/runtime cannot meet the boundaries; sample targets unexpectedly exist; classification needs logging event contents; or any new dependency/path is required.
- **Stop after the single attempt regardless of outcome.** Do not troubleshoot the provider, inspect Postman, retry, test another key, modify product code or declare the cause known. A confirmed source defect requires a separate fix contract and deterministic test.

## Rollback / recovery

Before execution, revise/remove only this appended Draft section if rejected; preserve all prior records and working-tree state. If a newly created sample fails sanitization before evidence is appended, remove only the two new live sample artifacts. After EVIDENCE/RUNBOOK append, correct factual mistakes with a superseding append-only record rather than rewriting history. Never reset the branch, alter secrets, touch unrelated/deleted/untracked paths, or change CHECKPOINT-03/04.

## Current status and handoff

- **Status:** `Draft`; contract-preparation approval is not a live-attempt authorization. No new key use, provider request, sample, evidence entry or checkpoint update has occurred under this contract.
- **Known blocker:** exact cause of the two fixed `provider_error` results remains `Unknown`; current evidence does not justify a source patch.
- **Next action:** human review of this exact contract. If approved, perform exactly one bounded diagnostic attempt; if revised or held, do not access AISStream. A failed-to-isolate result leaves the cause unknown and checkpoint 03 on `HOLD`.

### Human contract review and authorization — 2026-09-24

- **Decision:** after receiving the contract summary, the user instructed: “зроби, твоя задача зараз що б запрацювало”. This is treated as `continue` for exactly `TASK-SEA-R2-B09B10-LIVE-003`.
- **Authorization boundary:** exactly one diagnostic invocation as specified above, with key consumption only through `getAISStreamApiKey()`; no retry, source change, Postman access, commit, push or deployment.
- **Status:** `Active`; at the time of this record, preflight and the single attempt have not yet run.

### Preflight stop — key unavailable to the invoking process — 2026-09-24

- **Observed:** ignore/tracking and live-sample-target preflight checks passed. A Node.js v22.23.2 process directly imported `getAISStreamApiKey()` without loading local env files; the accessor returned `null`, reported only as `KEY_CONFIGURED=no`. The guarded command exited 4 as intended.
- **Boundary:** no `.env.local` content or key value was read, printed or loaded. No reader invocation, WebSocket connection, provider request, sample, evidence entry or checkpoint was created by the attempt; the single live-attempt allowance remains unused.
- **Status:** `BLOCKED before provider attempt`. The current contract prohibits loading local env files, so the key stored there is not available in the inherited Node process. Any next attempt requires a reviewed contract revision that expressly authorizes a safe in-memory environment-loading method, followed by the one bounded reader call. Until then, stop; checkpoint 03 remains `HOLD`.

### Authorization amendment — in-memory environment loading — 2026-09-24

- **User authorization:** the user explicitly stated: “дозволяю програмі читати ключ”. This authorizes resolving the LIVE-003 preflight blocker for the already-authorized, still-unused single reader attempt; it does not authorize a second attempt.
- **Method:** use the installed `@next/env` `loadEnvConfig(process.cwd())` loader documented by this repository's Next.js guide at `node_modules/next/dist/docs/01-app/02-guides/environment-variables.md` (the guide describes loading `.env*` into `process.env` outside the Next.js runtime). Do not start `next dev`, build, Playwright, the API route or any application server.
- **Secret boundary:** the loader may populate environment values in memory. Do not print, log, inspect, copy or persist `.env*` values. Only `getAISStreamApiKey()` may obtain the AISStream value, and only that returned value may be passed to the existing reader. Do not access or use other loaded values.
- **Attempt boundary:** if the accessor still returns no key, stop before network access. Otherwise run exactly one existing-reader invocation, one WebSocket connection, 15-second total connection/reader deadline, fixed event categories only, and the previously specified sample sanitization. No retry or provider troubleshooting.
- **Post-attempt records:** preserve E-SEA-054 and CHECKPOINT-05 as the preflight-stop record. After the one attempt, append the factual outcome to `EVIDENCE.md` and `RUNBOOK.md`; if no valid PositionReport is received, create no sample. Create `docs/checkpoints/CHECKPOINT-06.md` as the next restart record, retaining all earlier checkpoint history. No other paths are authorized.
- **Status:** this amendment supersedes only the former prohibition on in-memory env loading for this one bounded LIVE-003 attempt. All other scope, stop conditions, exclusions and human diff-review requirements remain in force. Sprint checkpoint 03 remains `HOLD` unless supported evidence closes its acceptance criteria.

### LIVE-003 bounded attempt outcome — 2026-09-24

- **Environment preflight:** an initial ESM named import of the CommonJS `@next/env` package failed before the loader ran or any key was loaded. The corrected `require("@next/env")` preflight loaded the environment in memory, and the accessor reported only `KEY_CONFIGURED=yes`; runtime imports passed. No key value or `.env*` content was emitted or inspected.
- **Attempt:** exactly one reader invocation opened one WebSocket, locally sent the subscription (`SUBSCRIBED=yes`), then observed a message event whose `data` type was non-string. The reader returned its fixed `provider_error`; wrapper output was `EVENT_CATEGORY=non_text_message`, `READER_ERROR=provider_error`, `OUTCOME=reader_error`. Exit status was 1. The harness inspected only `typeof event.data`; it did not decode, print or persist frame contents.
- **Sample / retry:** no valid PositionReport was received; no sample or provenance was created; both live sample targets were absent after the attempt. No retry or provider troubleshooting occurred. The single LIVE-003 attempt allowance is now exhausted.
- **Outcome and boundary:** the event category identifies the reader branch responsible for this attempt's fixed error, but does not establish the contents or origin of the non-string data, key validity, provider cause or provider acceptance. Do not change product code under LIVE-003; a possible reader compatibility fix requires a separate reviewed task contract and deterministic test.
- **Handoff:** `E-SEA-055`, the appended RUNBOOK record and `CHECKPOINT-06.md` capture this attempt. Sprint checkpoint 03 remains `HOLD`; final human review of the complete documentation diff remains pending.

# TASK-SEA-R2-B09B10-FIX-001 — WebSocket UTF-8 binary JSON compatibility

- **Version:** `1.0.0`
- **Status:** `Active`
- **Product owner:** методист відділення теорії судноводіння навчального центру «Норд-Вест»
- **Delivery / technical owner:** виконавець проєкту
- **Date:** 2026-09-25
- **Related artifacts:** [`CLAUDE.md`](CLAUDE.md), [`SPEC.md`](SPEC.md), [`SPRINT-02.md`](SPRINT-02.md), [`TASK_SPEC.md`](TASK_SPEC.md), [`EVIDENCE.md`](EVIDENCE.md), [`RUNBOOK.md`](RUNBOOK.md), [`docs/decisions/DEC-006-r2-scope.md`](docs/decisions/DEC-006-r2-scope.md), `TASK-SEA-R2-B12-001`, `TASK-SEA-R2-B09B10-LIVE-003`, `E-SEA-055`, [`server/aisstream-reader.ts`](server/aisstream-reader.ts), [`tests/snapshot-reader.spec.ts`](tests/snapshot-reader.spec.ts), [`tests/snapshot-collector.spec.ts`](tests/snapshot-collector.spec.ts).

## Goal and bounded outcome

Amend the B-12 reader input boundary so the existing snapshot flow can accept a WebSocket binary frame only when it is valid UTF-8 JSON, while retaining the existing endpoint, subscription, collector behavior, fixed errors, 15-second window, 100-vessel limit, one-shot lifecycle, and response/UI contracts. This is a local compatibility fix; it does not establish that the LIVE-003 frame contained JSON or a PositionReport, or that AISStream accepted the subscription.

## Authorization gates

- **Current decision:** this section is `Draft`. Approval of the preceding implementation plan authorized preparation of this contract only; it did not authorize source changes, live-provider access, or use of the real key.
- **Implementation gate:** do not edit implementation or test paths until the user reviews this exact contract and explicitly chooses `continue`.
- **Live gate:** no provider connection or real-key use is included. A new live verification needs a separate bounded contract and explicit authorization after the local fix is reviewed.

## Owner and exact paths

- **Planning path:** this append-only section in `TASK_SPEC.md`; preserve the historical B-09, B-12, and LIVE-003 records.
- **Implementation paths after `continue`:**
  - `server/aisstream-reader.ts` — configure the native Node WebSocket's `binaryType` as `arraybuffer`; forward text data unchanged and strictly decode `ArrayBuffer` data as UTF-8 text.
  - `tests/snapshot-reader.spec.ts` — deterministic reader tests for text/binary data, decode failures, error mapping, and one-time lifecycle cleanup.
  - `tests/snapshot-collector.spec.ts` — route/collector regression proving a valid UTF-8 JSON binary fixture reaches the existing snapshot transformation/response path.
- **Append-only records after checks and final human review:** `EVIDENCE.md` and `RUNBOOK.md`.
- **Excluded:** `.env*`, credentials, Postman, provider calls, sample/provenance paths, `server/snapshot-collector.ts`, `app/api/snapshot/route.ts`, `app/map-shell.tsx`, `app/sea-map.tsx`, dependencies/manifests, test-runner configuration, decision records, checkpoint history, and all unrelated or pre-existing changed/deleted/untracked paths.

## Inputs and behavior

- Node.js 22 WebSocket types in the installed runtime expose `binaryType` values `blob` and `arraybuffer`; standard text frames arrive as strings and binary frames use the configured representation. Confirm the installed runtime's applicable documentation/types before implementation.
- The native reader must set `binaryType = "arraybuffer"` before message delivery. A string is passed to the collector unchanged. An `ArrayBuffer` is decoded with `TextDecoder("utf-8", { fatal: true })` and passed to the collector as text.
- Any other runtime data type, invalid UTF-8, or decode failure maps to the existing fixed `provider_error`; do not stringify arbitrary objects, inspect/log raw bytes, include payload or decoder details in errors, or retain decoded live data.
- The existing collector remains responsible for JSON parsing and PositionReport transformation. Malformed JSON continues to map to `provider_error`; valid JSON that is not a recognized PositionReport continues to follow the existing collector behavior. No API/UI response shape changes and no partial success are introduced.
- Preserve event order, exactly-once completion/cleanup, ignored late events, exact subscription, and one WebSocket per snapshot. Do not add a decoder dependency or a second transport path.

## Acceptance criteria

- [ ] Native WebSocket binary delivery is configured to `arraybuffer`; ordinary string messages still pass through unchanged.
- [ ] A valid UTF-8 `ArrayBuffer` is decoded to the expected text and delivered once to the collector boundary.
- [ ] Invalid UTF-8, unsupported data types, and decoder exceptions map to one fixed `provider_error`, with exactly-once cleanup and no late delivery.
- [ ] A deterministic route/collector test sends a valid UTF-8 JSON `ArrayBuffer` PositionReport fixture and verifies the existing successful snapshot envelope and vessel mapping.
- [ ] Existing provider-error, disconnect, cancellation, no-key, partial-data, and B-13 mocked UI behavior remain unchanged and covered by focused checks.
- [ ] No real key, `.env*` file contents, provider connection, raw live frame, or new sample/provenance is accessed or created.
- [ ] The implementation stays within the exact paths above; append-only evidence/handoff is added only after checks and human diff review.
- [ ] Human diff review chooses `continue`, `revise`, or `HOLD` before any further task. A live-provider retry remains separately gated.

## Verification — requirements, not observed results

1. Run focused `npx playwright test tests/snapshot-reader.spec.ts tests/snapshot-collector.spec.ts tests/snapshot-interface.spec.ts`, `npx tsc --noEmit`, and the repository build check after implementation authorization. Use a non-secret test-only `AISSTREAM_API_KEY` environment value for commands that may load Next environment configuration; never expose or use the real key.
2. Verify unchanged fixed API error/success shapes, binary decode behavior, test cleanup, no partial success, and exact changed paths. Run `git diff --check`.
3. No live AISStream request is part of these checks. Local fixtures/build cannot establish provider acceptance, real frame format, live PositionReport receipt, or live UI/API success.

## Stop conditions and recovery

Stop if the installed runtime does not deliver `ArrayBuffer` after the native socket is configured, if a required frame is not strict UTF-8, if supporting it would require guessing provider-specific framing, if a new dependency/path is needed, or if raw frame inspection/logging is proposed. Do not fall back to `Blob`/arbitrary-object stringification under this contract; prepare a separate reviewed amendment if runtime evidence requires another representation. On rejection, restore only this appended draft section before implementation; after authorized implementation, recovery may touch only its allowed paths and must preserve all pre-existing work. Do not reset, clean, commit, push, deploy, retry AISStream, or rewrite append-only history.

## Human contract review and implementation authorization — 2026-09-25

- **Decision:** after reviewing this exact bounded contract, the user instructed: “continue, зроби вже проект робочим”. This is `continue` and authorizes the implementation paths and local checks listed above.
- **Boundary:** this does not authorize a live AISStream request, real-key access, raw-frame inspection, sample creation, commit, push, or deployment. A separate live-verification contract and explicit authorization remain required.
- **Status:** `Active`; local implementation/checks are recorded below; final human diff review remains pending.

## Observed implementation and local checks — 2026-09-25

- **Implementation:** `server/aisstream-reader.ts` sets native WebSocket `binaryType = "arraybuffer"`, forwards string messages unchanged, and strictly decodes UTF-8 `ArrayBuffer` messages. Unsupported types and invalid UTF-8 map to the fixed `provider_error`. Reader/collector tests cover decoding, route success, failures and cleanup.
- **Commands and status:** `AISSTREAM_API_KEY=test-only-no-secret npx playwright test tests/snapshot-reader.spec.ts tests/snapshot-collector.spec.ts tests/snapshot-interface.spec.ts` — `PASS`, 33 tests; `AISSTREAM_API_KEY=test-only-no-secret npx tsc --noEmit` — `PASS`; `AISSTREAM_API_KEY=test-only-no-secret npm run build` — `PASS`; scoped `git diff --check` — `PASS`.
- **Build environment limitation:** Next.js output reported `.env.local` as an environment source. No value was printed, but this task cannot claim that the file or its contents were not loaded by the build environment.
- **User-reported context:** the user said “стій, запрацювало”. The observation is recorded as user-reported only; no post-fix live provider attempt, raw frame, PositionReport, sample or provenance was captured independently in this task.
- **Acceptance boundary:** local compatibility behavior and deterministic checks are supported by the results above. Provider acceptance, live receipt, live UI/API end-to-end success, key validity, and the original LIVE-003 frame contents remain `Unknown` / `Needs verification`. Sprint checkpoint 03 remains `HOLD`.
- **Next gate:** keep task status `Active` pending final human diff review. No live request, real-key inspection, commit, push or deployment is authorized by this record.

# TASK-SEA-R2-B09B10-LIVE-004 — One post-fix live PositionReport sample

- **Version:** `1.0.0`
- **Status:** `Active`
- **Product owner:** методист відділення теорії судноводіння навчального центру «Норд-Вест»
- **Delivery / technical owner:** виконавець проєкту
- **Date:** 2026-09-25
- **Related artifacts:** [`CLAUDE.md`](CLAUDE.md), [`SPRINT-02.md`](SPRINT-02.md), [`TASK_SPEC.md`](TASK_SPEC.md), [`EVIDENCE.md`](EVIDENCE.md), [`RUNBOOK.md`](RUNBOOK.md), [`docs/decisions/DEC-004-checkpoint-convention.md`](docs/decisions/DEC-004-checkpoint-convention.md), [`docs/checkpoints/CHECKPOINT-07.md`](docs/checkpoints/CHECKPOINT-07.md), `TASK-SEA-R2-B09B10-LIVE-003`, `TASK-SEA-R2-B09B10-FIX-001`, `E-SEA-055`–`E-SEA-057`, [`server/aisstream-config.ts`](server/aisstream-config.ts), [`server/aisstream-reader.ts`](server/aisstream-reader.ts), [`server/position-report-transformer.ts`](server/position-report-transformer.ts), [`data/samples/position-report.sample.json`](data/samples/position-report.sample.json), [`data/samples/PROVENANCE.md`](data/samples/PROVENANCE.md).

## Goal and authorization

- **Goal:** perform exactly one post-fix bounded AISStream reader attempt; if it receives one valid real `PositionReport`, retain one sanitized sample and matching provenance to close only the live-receipt/sample evidence gap.
- **Predecessor boundary:** the LIVE-001, LIVE-002 and LIVE-003 attempt allowances are exhausted. This task authorizes a new attempt only after review of this exact contract; it does not reuse or reinterpret prior events or the operator-provided UI screenshot as a raw sample.
- **Operator authorization:** on 2026-09-25, the operator authorized obtaining one live sample, confirmed that one sanitized sample and provenance may be saved, and approved retaining the actual `MMSI` and `ShipName`. That authorization does not waive this contract's review gate and does not authorize retry, code changes, commit, push, deployment, or full Sprint 2 acceptance.
- **Human gate:** before loading local environment configuration, connecting to AISStream, creating sample files, or appending outcome records, the operator must review this exact contract and explicitly choose `continue`. This `Draft` preparation alone is not a live-request authorization.

## Allowed paths and exclusions

- **Contract preparation:** this appended section in `TASK_SPEC.md` only.
- **After explicit `continue`:** if a suitable live message is received, create only `data/samples/live/position-report.sample.json` and `data/samples/live/PROVENANCE.md`; append factual results to `EVIDENCE.md` and `RUNBOOK.md`; after evidence is appended, create `docs/checkpoints/CHECKPOINT-08.md` as the next restart record. If no suitable message is received, create no sample, append only the verified outcome, and create the checkpoint with `HOLD`.
- **Read-only inputs:** existing key accessor, reader, transformer, synthetic sample/provenance, LIVE-003/FIX-001 records, current checkpoint, Sprint 2 checkpoint criteria and checkpoint convention.
- **Excluded:** product/source code, routes, tests, dependencies, configuration, all `.env*` contents and credentials, UI/demo behavior, existing synthetic sample/provenance, `SPEC.md`, `SPRINT-02.md`, decision records, historical checkpoints, commit, push, deployment, and every unrelated, staged, deleted or untracked path. Do not inspect, overwrite, stage, reset, or clean excluded paths.

## One-attempt boundary and data handling

- **Preflight:** after `continue`, verify the two live sample targets do not already exist and `.env.local` is ignored and untracked without reading its contents. Do not start Next.js, run the API route, build, Playwright, or print environment values. If a target exists or the safe direct reader harness cannot be prepared without an unapproved path/dependency, stop before network access.
- **Key access:** use `@next/env` `loadEnvConfig(process.cwd())` to load existing local environment configuration into process memory, then obtain the AISStream key only through `getAISStreamApiKey()` and pass it only to `startAISStreamReader()`. Do not inspect, print, log, copy, persist, or otherwise expose the key or any other loaded environment value. If no key is returned, stop before network access.
- **Attempt:** one direct server-side reader invocation; one WebSocket; one total 15-second deadline including connect, open and subscription; no retry, polling, second route, or provider troubleshooting. Stop and clean up once at the first valid report, error, malformed/unsuitable message, or deadline. Capture through the reader's decoded `onText` callback; do not use `/api/snapshot`, which returns transformed vessels rather than the original PositionReport.
- **Eligibility and retained fields:** only save if one actual decoded JSON message is a valid `PositionReport` accepted by the existing B-11 transformer and contains all agreed sample fields with expected primitive types: `MetaData.MMSI`, `MetaData.ShipName`, `MetaData.latitude`, `MetaData.longitude`, `MetaData.time_utc`, `Message.PositionReport.Sog`, `Cog`, `TrueHeading`, `Latitude`, and `Longitude`. Preserve the actual `MMSI` and `ShipName` as received, as explicitly authorized; retain only the listed fields and do not invent, normalize, or fill missing values. If a required field is absent, malformed, or uncertain, save no sample and stop.
- **Sanitization:** parse and select the approved fields in memory, then persist only the single sanitized JSON object. Never print or persist the raw frame, API key, provider error detail, stack, private path, or unrelated fields. Do not expose sample payload in terminal output or chat.
- **Provenance:** identify origin as one live AISStream reader capture; state UTC artifact retrieval time separately from `MetaData.time_utc`; record the configured reader subscription/bounding-box context, the exact retained fields, that MMSI/ShipName were retained unmodified, the one-message limit, and limitations. Do not claim provider endorsement, vessel identity beyond the received fields, traffic completeness, or more than this one message.

## Expected outcome and acceptance

1. The new task receives explicit human `continue` before any environment loading or provider request.
2. Preflight confirms allowed sample targets are absent and the ignored/untracked state of `.env.local` without opening it; the temporary harness adds no repository path.
3. Exactly one post-fix reader attempt occurs with a 15-second total bound and no retry. Its outcome is recorded without secrets or raw payload. On error, timeout, malformed/unsuitable message, or missing key/fields, no sample is written.
4. On successful receipt, exactly one valid sanitized `PositionReport` is written to the live sample path with matching provenance; JSON cardinality, field casing/types, provenance, secret/path scan, and changed-path boundary are checked. Existing synthetic files remain unchanged.
5. Append-only evidence records only observed facts and limitations. Create `CHECKPOINT-08.md` after evidence; leave the historical checkpoint files unchanged and keep Sprint checkpoint 03 `HOLD` unless every criterion has supported evidence (live receipt, matching sample/provenance, bounded safe configuration, and working demo).
6. Run `git diff --check`; no product code, route, test, dependency, configuration, unrelated path, commit, push, or deployment changes occur.

## Verification and stop conditions

- **Before attempt:** after contract `continue`, verify the allowed path boundary and missing live-sample targets; confirm `.env.local` ignore/tracking status without reading contents; use only the approved in-memory loader/accessor/reader path. If runtime loading, the key, paths, or safe one-shot lifecycle is not as contracted, stop before opening a socket.
- **After attempt:** if a sample exists, parse it without printing its payload; assert one message envelope and required exact fields/types; compare provenance to the actual capture; run a targeted secret-like/private-path check on the two new outputs, inspect changed paths, and run `git diff --check`. Append evidence/runbook/checkpoint only after these observations.
- **Stop:** no contract `continue`; missing key; pre-existing sample target; timeout/error/malformed/unsuitable message; uncertain sanitization; unexpected path; or any need to modify code, add a dependency, inspect a secret, expose raw content, or exceed one attempt. Never retry under this task.
- **Exit decision:** `DONE` only for the bounded capture if the required live sample and provenance plus checks and final human diff review pass. Otherwise `HOLD`. This task cannot by itself close Sprint 2 or declare full R2 acceptance.

## Rollback / recovery

Before execution, revise or remove only this appended draft section if rejected. If a new live sample is created but fails validation before evidence is appended, remove only the two new live sample files and preserve the synthetic fixture. Evidence and RUNBOOK are append-only; after recording, correct errors only through a superseding factual entry. Do not reset the branch or alter any pre-existing staged, deleted, modified or untracked path.

## Human review and observed attempt outcome — 2026-09-25

- **Contract review:** after reviewing this exact bounded contract, the user said `продовжуй`, authorizing exactly the attempt and boundaries recorded above.
- **Observed outcome:** the single post-fix invocation ended after 1,747 ms with `CAPTURE_OUTCOME=unsuitable_message` (exit 1). No sample/provenance was written; both target paths were confirmed absent after the attempt. `E-SEA-058` and `CHECKPOINT-08.md` record the observed result and limitations.
- **Disposition:** the one LIVE-004 attempt is exhausted. No retry, provider troubleshooting, code change, commit, push, or deployment is authorized. Sprint checkpoint 03 remains `HOLD`.
- **Status:** `Active` pending final human diff review of the task/evidence/runbook/checkpoint records; the live receipt/sample acceptance criterion was not met.

# TASK-SEA-R2-B09B10-LIVE-005 — Bounded live PositionReport capture batch

- **Version:** `1.0.0`
- **Status:** `Draft`
- **Product owner:** методист відділення теорії судноводіння навчального центру «Норд-Вест»
- **Delivery / technical owner:** виконавець проєкту
- **Date:** 2026-09-25
- **Related artifacts:** [`CLAUDE.md`](CLAUDE.md), [`SPRINT-02.md`](SPRINT-02.md), [`TASK_SPEC.md`](TASK_SPEC.md), [`EVIDENCE.md`](EVIDENCE.md), [`RUNBOOK.md`](RUNBOOK.md), [`docs/decisions/DEC-004-checkpoint-convention.md`](docs/decisions/DEC-004-checkpoint-convention.md), [`docs/checkpoints/CHECKPOINT-08.md`](docs/checkpoints/CHECKPOINT-08.md), `TASK-SEA-R2-B09B10-LIVE-004`, `E-SEA-058`, [`server/aisstream-config.ts`](server/aisstream-config.ts), [`server/aisstream-reader.ts`](server/aisstream-reader.ts), [`server/position-report-transformer.ts`](server/position-report-transformer.ts), [`data/samples/position-report.sample.json`](data/samples/position-report.sample.json), [`data/samples/PROVENANCE.md`](data/samples/PROVENANCE.md).

## Goal and authorization

- **Goal:** obtain at most one eligible live AISStream `PositionReport` sample with matching provenance, stopping the batch immediately after the first successful capture. This task addresses only the live receipt/sample gap; it does not establish full Sprint 2 acceptance.
- **Predecessor boundary:** LIVE-004's one attempt is exhausted and cannot be repeated under that contract. This is a new batch of at most ten attempts; it does not reuse or reinterpret earlier events, screenshots, or synthetic fixtures as a live sample.
- **Operator authorization:** on 2026-09-25 the operator said: “повтори, даю апрув на 10 спроб, але одразу закінчи при першому успішному результату”. The prior approval to retain one sanitized sample with actual `MMSI` and `ShipName` remains limited to the fields and handling below. This authorization does not waive review of this exact contract and does not authorize code changes, provider troubleshooting beyond this bound, commit, push, deployment, or full Sprint 2 acceptance.
- **Human gate:** before loading environment configuration, accessing the key, connecting, creating sample files, or appending attempt outcomes, the operator must review this exact contract and explicitly choose `continue`. This `Draft` preparation is not authorization to access the provider.

## Allowed paths and exclusions

- **Contract preparation:** this appended section in `TASK_SPEC.md` only.
- **After explicit `continue`:** on the first eligible message only, create `data/samples/live/position-report.sample.json` and `data/samples/live/PROVENANCE.md`; append factual outcomes to `EVIDENCE.md` and `RUNBOOK.md`; then create `docs/checkpoints/CHECKPOINT-09.md`. If the batch ends without an eligible sample, create no sample files, append only verified outcomes to `EVIDENCE.md` and `RUNBOOK.md`, then create the checkpoint with `HOLD`.
- **Read-only inputs:** existing key accessor, reader, transformer, synthetic sample/provenance, LIVE-004 and earlier task records, CHECKPOINT-08, Sprint 2 checkpoint criteria, and checkpoint convention.
- **Excluded:** product/source code, routes, tests, dependencies, configuration, all `.env*` contents and credentials, UI/demo behavior, existing synthetic sample/provenance, `SPEC.md`, `SPRINT-02.md`, decision records, historical checkpoints, commit, push, deployment, and every unrelated, staged, deleted, or untracked path. Do not inspect, overwrite, stage, reset, or clean excluded paths.

## Bounded attempt policy and data handling

- **Preflight:** only after `continue`, confirm both live sample targets are absent and `.env.local` is ignored and untracked without reading its contents. Do not start Next.js, call `/api/snapshot`, run a build/test suite, or print environment values. If a target exists or the safe in-memory harness needs an unapproved path/dependency, stop before network access.
- **Key access:** use `@next/env` `loadEnvConfig(process.cwd())` to load configured environment values into process memory, then obtain the AISStream key only through `getAISStreamApiKey()` and pass it only to `startAISStreamReader()`. Do not inspect, print, log, copy, persist, or otherwise expose the key or any loaded environment value. If no key is returned, stop the batch before network access.
- **Attempt definition:** one attempt is one direct `startAISStreamReader()` invocation and one WebSocket. No concurrent sockets or reconnect within an attempt. Start its 15-second wall-clock deadline immediately before reader invocation; the deadline covers connect, open, subscription, and message eligibility handling. On timeout or reader error, stop and clean up that reader before any next attempt.
- **Maximum and pacing:** at most ten new attempts in this batch. Between unsuccessful attempts, wait exactly 60 seconds before the next connection; no parallel attempts, extra retry, polling, or provider troubleshooting. This fixed delay is a conservative task safety bound, not a verified AISStream rate-limit requirement; no provider quota is asserted. Maximum bounded waiting is 10 × 15 seconds plus 9 × 60 seconds (10 minutes 30 seconds), excluding setup and teardown. Stop early on preflight/harness failure or the first successful sample.
- **Message handling:** process decoded text only through the reader's `onText` callback. For malformed JSON, non-eligible messages, or messages rejected by sample checks, retain no payload and continue listening within the same attempt until an eligible message, reader error, or deadline. Keep any eligibility state/counters in memory; do not record payload-derived values or provider error details.
- **Success eligibility:** require both `transformPositionReport(message) !== null` and the following exact fields with expected primitive types: `MetaData.MMSI`, `MetaData.ShipName`, `MetaData.latitude`, `MetaData.longitude`, `MetaData.time_utc`, `Message.PositionReport.Sog`, `Cog`, `TrueHeading`, `Latitude`, and `Longitude`. The transformer alone does not guarantee all capture-specific fields. Missing, malformed, or uncertain fields do not qualify.
- **First-success stop:** on the first eligible decoded message, immediately stop the reader and deadline timer and end the entire batch—no additional message processing or connection. Select only the approved fields in memory, preserving actual `MMSI` and `ShipName` unmodified under the prior operator approval, and write exactly one sanitized sample plus matching provenance. If writing or validating that success fails, stop and record the failure; do not make another attempt.
- **Sanitization and provenance:** never print or persist the raw frame, key, provider error text, stack, private path, or unrelated fields. Provenance must distinguish artifact capture time in UTC from `MetaData.time_utc`, identify the source as this direct live AISStream reader capture, state the actual configured subscription/bounding-box context, list retained fields, note unmodified MMSI/ShipName retention and the one-message limit, and record limitations. Do not claim provider endorsement, vessel identity beyond the received fields, or traffic completeness.
- **Outcome recording:** record only attempt number, elapsed time, and fixed non-sensitive categories such as `deadline_no_eligible`, `reader_error`, `eligible_sample`, or `preflight_blocked`, plus totals. Never retain or log rejected event content or raw provider error details.

## Expected outcome and acceptance

1. The operator reviews this exact contract and explicitly says `continue` before environment loading or any provider access.
2. Preflight confirms both sample targets absent and `.env.local` ignored/untracked without opening it; the temporary harness creates no repository file.
3. No more than ten sequential reader invocations occur, each bounded by 15 seconds, with 60 seconds between failed attempts. Ineligible events do not prematurely end an otherwise healthy attempt. The batch stops immediately at first success; no retry follows success.
4. On success, exactly one live sanitized sample and matching provenance exist, with required exact fields/types and no raw frame/key/unrelated data. Existing synthetic sample files remain unchanged.
5. On exhaustion or preflight/runtime failure, no sample/provenance is created; only observed bounded outcomes are appended and CHECKPOINT-09 remains `HOLD`.
6. Evidence, runbook, and checkpoint are appended/created only after observed outcomes; `git diff --check` passes. No code, route, test, dependency, configuration, unrelated path, commit, push, or deployment changes occur.

## Verification and stop conditions

- **Before first attempt:** after `continue`, verify allowed paths and absent sample targets, confirm `.env.local` ignore/tracking status without reading contents, and verify the in-memory reader/transformer harness. If key/configuration, runtime, paths, or safe lifecycle is not as contracted, stop before opening a socket.
- **During the batch:** enforce the per-attempt deadline and 60-second cooldown in the caller; stop/clean up the reader and timer on success, error, or deadline. Do not exceed ten attempts or continue after the first success.
- **After success:** parse/validate without printing sample contents; assert one envelope and all required exact fields/types; verify provenance against the captured source/time; check only the allowed paths and `git diff --check`. Append evidence/runbook/checkpoint only after these observations.
- **After exhaustion/failure:** verify no sample was created, append only observed fixed outcomes, and keep Sprint checkpoint 03 at `HOLD`. Stop if an unexpected path, unsafe data handling, unclear provider state, or any need for out-of-scope changes arises.
- **Exit decision:** `DONE` only for this bounded capture if the sample, provenance, verification, and final human diff review pass; otherwise `HOLD`. LIVE-005 alone cannot close Sprint 2.

## Rollback / recovery

Before execution, revise or remove only this appended draft section if rejected. If a new sample is created but fails validation before outcome records are appended, remove only the two new live sample files and preserve synthetic fixtures. Once recorded, EVIDENCE and RUNBOOK remain append-only; correct errors with a superseding factual entry. Do not reset the branch or alter any pre-existing staged, deleted, modified, or untracked path.

# TASK-SEA-R2-B09B10-LIVE-006 — Replacement bounded live PositionReport capture batch

- **Version:** `1.0.0`
- **Status:** `Draft`
- **Product owner:** методист відділення теорії судноводіння навчального центру «Норд-Вест»
- **Delivery / technical owner:** виконавець проєкту
- **Date:** 2026-09-25
- **Related artifacts:** [`CLAUDE.md`](CLAUDE.md), [`SPRINT-02.md`](SPRINT-02.md), [`TASK_SPEC.md`](TASK_SPEC.md), [`EVIDENCE.md`](EVIDENCE.md), [`RUNBOOK.md`](RUNBOOK.md), [`docs/decisions/DEC-004-checkpoint-convention.md`](docs/decisions/DEC-004-checkpoint-convention.md), [`docs/checkpoints/CHECKPOINT-09.md`](docs/checkpoints/CHECKPOINT-09.md), `TASK-SEA-R2-B09B10-LIVE-005`, `E-SEA-059`, [`server/aisstream-config.ts`](server/aisstream-config.ts), [`server/aisstream-reader.ts`](server/aisstream-reader.ts), [`server/position-report-transformer.ts`](server/position-report-transformer.ts), [`data/samples/position-report.sample.json`](data/samples/position-report.sample.json), [`data/samples/PROVENANCE.md`](data/samples/PROVENANCE.md).

## Goal and authorization

- **Goal:** obtain at most one eligible live AISStream `PositionReport` sample with matching provenance; stop the complete batch immediately after the first successful capture. This task addresses only the live receipt/sample gap and does not establish full Sprint 2 acceptance.
- **Predecessor boundary:** LIVE-005 stopped before attempt 1 because its inline JavaScript harness failed parsing. No provider call or attempt occurred under LIVE-005. This replacement batch is independently bounded and does not reuse prior events, screenshots, or synthetic fixtures as a live sample.
- **Operator request:** on 2026-09-25 the user said “виконуй 10 спроб”. The earlier instruction remains in force: stop at the first successful result. Existing approval covers retaining one sanitized sample with actual `MMSI` and `ShipName`, limited to the handling and fields below. This request does not waive review of this exact replacement contract or authorize code changes, extra provider troubleshooting, commit, push, deployment, or full Sprint 2 acceptance.
- **Human gate:** before loading environment configuration, accessing the key, connecting, creating sample files, or appending outcome records, the operator must review this exact LIVE-006 contract and explicitly choose `continue`. No provider or secret access is authorized by this draft or by the earlier LIVE-005 `continue`.

## Allowed paths and exclusions

- **Contract preparation:** this appended LIVE-006 section in `TASK_SPEC.md` only.
- **After explicit LIVE-006 `continue`:** on the first eligible message only, create `data/samples/live/position-report.sample.json` and `data/samples/live/PROVENANCE.md`; append factual outcomes to `EVIDENCE.md` and `RUNBOOK.md`; then create `docs/checkpoints/CHECKPOINT-10.md`. If the batch ends without an eligible sample or is blocked before a reader attempt, create no sample files, append only verified outcomes to `EVIDENCE.md` and `RUNBOOK.md`, then create CHECKPOINT-10 with `HOLD`.
- **Read-only inputs:** existing key accessor, reader, transformer, synthetic sample/provenance, LIVE-004/LIVE-005 and earlier records, CHECKPOINT-09, Sprint 2 checkpoint criteria, and checkpoint convention.
- **Excluded:** product/source code, routes, tests, dependencies, configuration, all `.env*` contents and credentials, UI/demo behavior, existing synthetic sample/provenance, `SPEC.md`, `SPRINT-02.md`, decision records, historical checkpoints, commit, push, deployment, and every unrelated, staged, deleted, or untracked path. Do not inspect, overwrite, stage, reset, or clean excluded paths.

## Bounded attempt policy and data handling

- **Preflight order:** after LIVE-006 `continue`, first verify both live sample targets are absent and `.env.local` is ignored/untracked without reading its contents. Prepare the complete inline harness without loading environment values. Syntax-check that exact harness with Node's syntax-check mode; syntax validation must not evaluate imports or run code. If syntax check fails, stop before environment loading and do not repair/retry within this contract. Only after syntax validation passes may the harness load environment configuration in memory.
- **Key access:** use `@next/env` `loadEnvConfig(process.cwd())`, then obtain the AISStream key only through `getAISStreamApiKey()` and pass it only to `startAISStreamReader()`. Do not inspect, print, log, copy, persist, or expose the key or any loaded environment value. If no key is returned, stop the batch before network access.
- **Attempt definition:** one attempt is one direct `startAISStreamReader()` invocation and one WebSocket. No concurrent sockets or reconnect within an attempt. Start its 15-second wall-clock deadline immediately before reader invocation; it covers connect, open, subscription, and message eligibility handling. Stop and clean up the reader at timeout, reader error, or success before any next attempt.
- **Maximum and pacing:** at most ten sequential attempts in this batch. Between unsuccessful attempts, wait exactly 60 seconds before the next connection; no parallel attempts, extra retry, polling, or provider troubleshooting. The pause is a conservative task safety bound, not a verified AISStream rate-limit requirement. Maximum bounded waiting is 10 × 15 seconds plus 9 × 60 seconds (10 minutes 30 seconds), excluding setup/teardown. Stop early on preflight/harness failure or first successful sample.
- **Message handling:** process decoded text only through the reader's `onText` callback. For malformed JSON, non-eligible messages, or sample-check failures, retain no payload and continue listening within that same attempt until an eligible message, reader error, or deadline. Keep eligibility state/counters only in memory; do not record payload-derived values or provider error details.
- **Success eligibility:** require both `transformPositionReport(message) !== null` and these exact fields with expected primitive types: `MetaData.MMSI`, `MetaData.ShipName`, `MetaData.latitude`, `MetaData.longitude`, `MetaData.time_utc`, `Message.PositionReport.Sog`, `Cog`, `TrueHeading`, `Latitude`, and `Longitude`. The transformer alone does not validate all sample fields. Missing, malformed, or uncertain fields do not qualify.
- **First-success stop:** on the first eligible message, immediately stop the reader and timer and end the batch. Select only the approved fields in memory, preserve actual `MMSI` and `ShipName` unmodified under existing operator approval, and write exactly one sanitized sample plus matching provenance. If writing or validation fails, stop and record the failure; do not attempt another connection.
- **Sanitization and provenance:** never print or persist raw frames, the key, provider error text, stack, private path, or unrelated fields. Provenance must distinguish artifact capture time in UTC from the sample's `MetaData.time_utc`; identify the source as this direct AISStream reader capture; state the configured subscription/bounding-box context; list retained fields; note actual unmodified MMSI/ShipName retention and the one-message limit; and state limitations. Do not claim provider endorsement, identity beyond received fields, or traffic completeness.
- **Outcome recording:** record only attempt number, elapsed time, and fixed non-sensitive categories such as `deadline_no_eligible`, `reader_error`, `eligible_sample`, `preflight_blocked`, or `harness_syntax_blocked`, plus totals. Never retain/log rejected event contents or raw provider error details.

## Expected outcome and acceptance

1. The operator reviews the exact LIVE-006 contract and explicitly says `continue` before environment loading or any provider access.
2. Target absence and `.env.local` ignore/tracking status are confirmed without reading its contents. The exact inline harness passes syntax-only validation before any environment loading; a failure ends the task before a reader invocation.
3. No more than ten sequential reader invocations occur, each bounded to 15 seconds, with 60 seconds between failed attempts. Ineligible events do not end a healthy attempt. The batch stops immediately after the first eligible sample, with no later connection.
4. On success, exactly one live sanitized sample and matching provenance exist with all required fields/types and no raw frame, key, or unrelated data. Existing synthetic files remain unchanged.
5. On exhaustion or preflight/runtime failure, no sample/provenance is created; only observed outcomes are appended and CHECKPOINT-10 remains `HOLD`.
6. Evidence, runbook, and checkpoint are appended/created only after observed outcomes; `git diff --check` passes. No source, route, test, dependency, configuration, unrelated path, commit, push, or deployment changes occur.

## Verification and stop conditions

- **Before first attempt:** after LIVE-006 `continue`, verify allowed paths and absent sample targets; confirm `.env.local` ignore/tracking state without reading contents; syntax-check the exact harness without executing it or evaluating imports. Any syntax/runtime-preflight, key/configuration, path, or lifecycle failure stops before network access.
- **During the batch:** enforce the per-attempt deadline and 60-second cooldown in the caller; stop/clean up the reader and timer on success, error, or deadline. Never exceed ten attempts or continue after success.
- **After success:** validate the sample without printing its payload; assert one envelope and every required field/type; compare provenance with captured source/time; inspect only allowed paths and run `git diff --check`. Append evidence/runbook/checkpoint only after these checks.
- **After exhaustion/failure:** verify no sample was created, append only observed fixed outcomes, and leave Sprint checkpoint 03 at `HOLD`. Stop if any unexpected path, unsafe handling, unclear provider state, or out-of-scope change is needed.
- **Exit decision:** `DONE` only if the bounded sample, provenance, checks, and final human review pass; otherwise `HOLD`. LIVE-006 alone cannot close Sprint 2.

## Rollback / recovery

Before execution, revise or remove only this appended draft section if rejected. If a new sample exists but fails validation before outcome records are appended, remove only the two new live sample files and preserve synthetic fixtures. EVIDENCE and RUNBOOK are append-only; correct recorded facts only with a superseding entry. Do not reset the branch or alter any pre-existing staged, deleted, modified, or untracked path.

# TASK-SEA-R2-B09B10-DIAG-001 — In-memory AISStream configuration preflight diagnosis

- **Version:** `1.0.0`
- **Status:** `Draft`
- **Product owner:** методист відділення теорії судноводіння навчального центру «Норд-Вест»
- **Delivery / technical owner:** виконавець проєкту
- **Date:** 2026-09-25
- **Related artifacts:** [`CLAUDE.md`](CLAUDE.md), [`TASK_SPEC.md`](TASK_SPEC.md), [`EVIDENCE.md`](EVIDENCE.md), [`RUNBOOK.md`](RUNBOOK.md), [`docs/decisions/DEC-004-checkpoint-convention.md`](docs/decisions/DEC-004-checkpoint-convention.md), [`docs/checkpoints/CHECKPOINT-10.md`](docs/checkpoints/CHECKPOINT-10.md), `TASK-SEA-R2-B09B10-LIVE-006`, `E-SEA-060`, [`server/aisstream-config.ts`](server/aisstream-config.ts).

## Goal and authorization

- **Goal:** identify which local configuration preflight stage blocked LIVE-006 without displaying, logging, copying, or persisting any credential and without making a network connection.
- **Predecessor boundary:** LIVE-006 stopped before its first reader invocation with fixed outcome `preflight_blocked`; its harness intentionally did not distinguish an environment-loader exception from a missing value returned by the key accessor. This diagnostic does not resume or authorize any LIVE-006 attempt.
- **Operator request:** on 2026-09-25 the user asked to prepare a bounded task to diagnose the preflight cause, without displaying the key and without network access, then confirmed `так`. That authorizes preparation of this draft only; the exact diagnostic still requires review and explicit `continue`.
- **Human gate:** before loading local environment configuration or accessing the key accessor, the operator must review this exact contract and explicitly choose `continue`.

## Allowed paths and exclusions

- **Contract preparation:** this appended section in `TASK_SPEC.md` only.
- **After explicit `continue`:** run one temporary in-memory diagnostic only; append factual results to `EVIDENCE.md` and `RUNBOOK.md`; then create `docs/checkpoints/CHECKPOINT-11.md` with Sprint checkpoint 03 remaining `HOLD`.
- **Read-only inputs:** `@next/env` package API, `getAISStreamApiKey()` implementation, current LIVE-006 outcome and checkpoint convention.
- **Excluded:** all `.env*` file contents read by the operator, key values or other environment values in output/logs, any WebSocket/HTTP/DNS/network request, `startAISStreamReader()`, provider troubleshooting, sample/provenance access or creation, product/source code, tests, dependencies, configuration, unrelated paths, historical records, commit, push, and deployment.

## Single-run diagnostic policy and data handling

- **Preflight:** after `continue`, verify the current branch/worktree boundary and `.env.local` ignored/untracked status without opening the file. Use one in-memory Node invocation only; do not create a script or artifact file.
- **Module diagnosis:** dynamically import `@next/env` and `server/aisstream-config.ts` in separate guarded stages. If either import fails, emit only a fixed category (`loader_module_import_failed` or `accessor_module_import_failed`) and stop.
- **Presence snapshot:** call only `getAISStreamApiKey()` and convert its result immediately to a boolean (`present_before_load`). Do not retain or output the returned string. If the accessor throws, emit `accessor_failed_before_load` and stop.
- **Environment loader:** invoke `loadEnvConfig(process.cwd(), false, silentLogger)` once to load configured values into process memory. Do not read `.env*` contents directly; do not print loader details or returned objects. If it throws, emit `env_loader_failed` with only the already computed boolean and stop.
- **Post-load accessor:** call the accessor once more, immediately convert the result to a boolean (`present_after_load`), and discard the string. If it throws, emit `accessor_failed_after_load` with the pre-load boolean only. Otherwise emit `diagnostic_complete` with the two presence booleans only; never output the key, length, hash, prefix/suffix, source value, or any unrelated environment value.
- **One-shot boundary:** exactly one diagnostic invocation, no retries, no reader, no provider call, no sample. The observation can distinguish import failure, loader failure, and accessor presence only; it does not establish credential validity or provider acceptance. Even `present_after_load: true` does not authorize a live connection.
- **Output and timing:** emit a fixed JSON object containing only a diagnostic category, elapsed milliseconds, and the approved boolean presence indicators where available. Suppress logger output and raw exception details. Never display local file paths, stack traces, loaded environment objects, or secret-derived values other than presence booleans.

## Expected outcome and acceptance

1. The user reviews this exact diagnostic scope and explicitly says `continue` before environment loading or accessor use.
2. One Node invocation returns a fixed category identifying module import, accessor, or environment-loader outcome; when the accessor can be called safely, only its pre/post presence booleans are reported.
3. No network APIs, reader, sample files, or provider connection are used; no credential value or unrelated environment value appears in output or saved records.
4. Only observed fixed categories/booleans, command status, and timestamp are appended to evidence/runbook; CHECKPOINT-11 keeps Sprint checkpoint 03 at `HOLD`.
5. `git diff --check` passes and no source, test, dependency, configuration, sample, or unrelated path changes occur.

## Verification and stop conditions

- **Before run:** validate this contract, confirm `.env.local` ignore/tracking status without reading its contents, and inspect the installed `@next/env` type signature only if needed. Do not start an application or use any network-capable API.
- **During run:** execute the diagnostic exactly once with a silent logger and guarded stages. Emit only the fixed result schema. If a stage fails, stop immediately; do not add debugging output or repeat the loader/accessor call.
- **After run:** verify output contains only approved category/booleans and elapsed time; verify no sample path was created; append EVIDENCE/RUNBOOK and create CHECKPOINT-11 only after observation; run `git diff --check`.
- **Exit decision:** `DONE` only when one diagnostic result is recorded with no credential disclosure and no network access; otherwise `HOLD`. This diagnostic does not authorize any live AISStream attempt.

## Rollback / recovery

Before execution, revise or remove only this appended draft if rejected. The one-shot diagnostic creates no persistent output except append-only evidence/runbook/checkpoint records. Correct recorded factual errors with a superseding entry; do not reset the branch, inspect environment files, or alter any pre-existing staged, deleted, modified, or untracked path.

# TASK-SEA-R2-B09B10-DIAG-002 — Sanitized environment-loader error classification

- **Version:** `1.0.0`
- **Status:** `Active`
- **Product owner:** методист відділення теорії судноводіння навчального центру «Норд-Вест»
- **Delivery / technical owner:** виконавець проєкту
- **Date:** 2026-09-25
- **Related artifacts:** [`CLAUDE.md`](CLAUDE.md), [`TASK_SPEC.md`](TASK_SPEC.md), [`EVIDENCE.md`](EVIDENCE.md), [`RUNBOOK.md`](RUNBOOK.md), [`docs/decisions/DEC-004-checkpoint-convention.md`](docs/decisions/DEC-004-checkpoint-convention.md), [`docs/checkpoints/CHECKPOINT-11.md`](docs/checkpoints/CHECKPOINT-11.md), `TASK-SEA-R2-B09B10-DIAG-001`, `E-SEA-061`, [`node_modules/@next/env/dist/index.js`](node_modules/@next/env/dist/index.js), [`node_modules/@next/env/dist/index.d.ts`](node_modules/@next/env/dist/index.d.ts).

## Goal and authorization

- **Goal:** safely classify why the single `loadEnvConfig()` call in DIAG-001 failed, using only error class/code categories and no raw exception text, paths, environment values, credentials, or network access.
- **Predecessor boundary:** DIAG-001 observed `env_loader_failed` after successful module imports and `presentBeforeLoad: false`; raw exception details were suppressed. DIAG-001 is complete; this task neither repeats nor extends its diagnostic.
- **Operator request:** on 2026-09-25 the user said `продовжуй` after being asked whether to prepare a separate bounded task to investigate the loader failure without network access or secret disclosure. This authorizes drafting this contract only. Explicit review and `continue` are still required before running the loader.
- **Human gate:** before importing/running `@next/env` or calling `loadEnvConfig()`, the operator must review this exact contract and explicitly choose `continue`.

## Allowed paths and exclusions

- **Contract preparation:** this appended DIAG-002 section in `TASK_SPEC.md` only.
- **After explicit `continue`:** run one in-memory loader classification only; append observed facts to `EVIDENCE.md` and `RUNBOOK.md`; create `docs/checkpoints/CHECKPOINT-12.md`, keeping Sprint checkpoint 03 at `HOLD`.
- **Read-only inputs:** installed `@next/env` implementation/type signature, prior DIAG-001 outcome, and checkpoint convention.
- **Excluded:** all direct reads of `.env*` file contents; the key accessor and credential values; `startAISStreamReader()`; any WebSocket/HTTP/DNS/network request; provider troubleshooting; sample/provenance files; product/source code, tests, dependencies, configuration, unrelated paths, historical records, commit, push, and deployment.

## One-shot error-classification policy

- **Preflight:** after `continue`, verify the worktree boundary and `.env.local` ignored/untracked status without opening it. Use one in-memory Node invocation; create no script or artifact file.
- **Loader call:** dynamically import `@next/env`, then call `loadEnvConfig(process.cwd(), false, safeLogger)` exactly once. Do not call `getAISStreamApiKey()` or inspect `process.env`. Do not print/retain loader return values or any environment data.
- **Safe logger:** provide `info()` as a no-op. In `error(...args)`, ignore all message/string arguments entirely; only if an argument is an actual `Error`, immediately map its `name` to `Error`, `TypeError`, `RangeError`, `SyntaxError`, `ReferenceError`, or `OtherError`, and map its `code` to a fixed allowlist (`ENOENT`, `EACCES`, `EPERM`, `EIO`, `EINVAL`, `EISDIR`, `ENOTDIR`, `ELOOP`, `ERR_INVALID_ARG_TYPE`, `ERR_INVALID_ARG_VALUE`, `ERR_OUT_OF_RANGE`, or `OtherCode`). Store only category counts in memory. The logger must not stringify or retain raw arguments.
- **Thrown exception:** catch any exception from import or the single loader call. Report only a fixed stage (`module_import_failed` or `loader_threw`), sanitized error-name category, and whitelisted error-code category. Do not output exception messages, stacks, causes, paths, environment contents, or values. If the loader returns while calling the logger, report `loader_returned_with_log_errors` and only the safe category counts; otherwise report `loader_returned_no_log_errors`.
- **One-shot boundary:** exactly one loader call; no accessor, retry, `NODE_ENV` change, environment reset, reader, provider call, sample, or further debugging. This classification may identify an error class/code, but does not authorize changing environment files or making a provider request.
- **Output:** fixed JSON only: outcome category, elapsed milliseconds, sanitized `name`/`code` categories where applicable, and counts. Never output raw logger text or any local path.

## Expected outcome and acceptance

1. The operator reviews the exact DIAG-002 contract and explicitly says `continue` before the loader runs.
2. One inline Node invocation imports the installed loader and calls it once with the safe logger; any thrown or logged errors are reduced to fixed categories/allowlisted codes.
3. No accessor/key access, environment value output, direct `.env*` read, network request, reader, provider connection, or sample/provenance access occurs.
4. EVIDENCE/RUNBOOK record only the fixed result, category counts, command status, timestamp, and limitations; CHECKPOINT-12 keeps Sprint checkpoint 03 at `HOLD`.
5. `git diff --check` passes and no source, test, dependency, configuration, sample, or unrelated path changes occur.

## Verification and stop conditions

- **Before run:** validate this contract and `.env.local` ignore/tracking status without opening the file. Do not start Next.js or any network-capable API.
- **During run:** make exactly one loader call. Ensure the logger never exposes its arguments and catches only fixed metadata. If module import fails, report its safe category and stop without retry.
- **After run:** validate the output against the fixed schema; verify no credential/value/path/message appears; verify no sample paths were created; append evidence/runbook/checkpoint only after observation; run `git diff --check`.
- **Exit decision:** `DONE` only when the single run is recorded with no secret disclosure or network access; otherwise `HOLD`. DIAG-002 does not authorize a live AISStream attempt.

## Rollback / recovery

Before execution, revise or remove only this appended draft if rejected. The one-shot classification creates no persistent output except the append-only evidence/runbook/checkpoint records. Correct recorded factual errors only with a superseding entry. Do not retry, change `.env*`, reset the branch, or alter any pre-existing staged, deleted, modified, or untracked path.

# TASK-SEA-R2-B09B10-DIAG-003 — Bounded import/loader classification retries

- **Version:** `1.0.0`
- **Status:** `Verified`
- **Product owner:** методист відділення теорії судноводіння навчального центру «Норд-Вест»
- **Delivery / technical owner:** виконавець проєкту
- **Date:** 2026-09-25
- **Related artifacts:** [`CLAUDE.md`](CLAUDE.md), [`TASK_SPEC.md`](TASK_SPEC.md), [`EVIDENCE.md`](EVIDENCE.md), [`RUNBOOK.md`](RUNBOOK.md), [`docs/decisions/DEC-004-checkpoint-convention.md`](docs/decisions/DEC-004-checkpoint-convention.md), [`docs/checkpoints/CHECKPOINT-12.md`](docs/checkpoints/CHECKPOINT-12.md), `TASK-SEA-R2-B09B10-DIAG-002`, `E-SEA-062`, [`node_modules/@next/env/dist/index.js`](node_modules/@next/env/dist/index.js), [`node_modules/@next/env/dist/index.d.ts`](node_modules/@next/env/dist/index.d.ts).

## Goal and authorization

- **Goal:** determine whether the sanitized `@next/env` import failure from DIAG-002 is transient across fresh local Node processes and, on the first successful import only, capture the sanitized outcome of one `loadEnvConfig()` call.
- **Predecessor boundary:** DIAG-002 attempted one dynamic import and observed `module_import_failed` / `OtherError` / `OtherCode`; it did not call `loadEnvConfig()`. This contract does not claim that repeating the import will reveal the hidden cause.
- **Operator request:** on 2026-09-25 the user said `даю 10 шот контракт` after DIAG-002 stopped at import and clarified `15 секунд на процес`. This authorizes preparing a contract for at most ten new local attempts, with a 15-second process timeout per attempt. It does not authorize execution before review of this exact contract and a separate explicit `continue`.
- **Human gate:** the operator must review this exact DIAG-003 contract and explicitly say `continue` before any new import or loader call.

## Allowed paths and exclusions

- **Contract preparation:** this appended DIAG-003 section in `TASK_SPEC.md` only.
- **After explicit `continue`:** run the bounded local diagnostic only; append observed facts to `EVIDENCE.md` and `RUNBOOK.md`; create `docs/checkpoints/CHECKPOINT-13.md`, keeping Sprint checkpoint 03 at `HOLD`.
- **Read-only inputs:** installed `@next/env` implementation/type signature and DIAG-002/E-SEA-062 outcome.
- **Excluded:** direct reads of `.env*` file contents; key accessor or credential-value inspection; changes to `NODE_ENV`, environment, files, or dependencies; `startAISStreamReader()`; WebSocket/HTTP/DNS/network/provider requests; sample/provenance access; product/source/test changes; unrelated paths; commit, push, and deployment.

## Bounded attempt policy

- **Preflight:** after `continue`, verify branch/worktree boundary, that both live sample targets remain absent, and `.env.local` is ignored/untracked without opening it. Use no Next.js server or network-capable API.
- **Attempts:** at most ten new, sequential child-process attempts, each in a fresh Node process. Each child has a 15-second process timeout (maximum 150 seconds of child execution time total; parent orchestration overhead excluded). No concurrent attempts and no retries inside a child. The parent may pass through the existing process environment to the child but must not inspect, print, or mutate it.
- **Per-child operation:** dynamically import `@next/env`. If import succeeds, call `loadEnvConfig(process.cwd(), false, safeLogger)` exactly once in that child and stop the entire batch after that child reports its sanitized result, whether the loader returns or throws. If import fails, emit only its sanitized category and proceed to the next child, unless the process timed out or the harness output is invalid; either of those conditions stops the entire batch immediately.
- **Safe logger and exception handling:** use a no-op `info()`. In `error(...args)`, ignore all strings/message arguments; for actual `Error` objects immediately retain only a safe name category (`Error`, `TypeError`, `RangeError`, `SyntaxError`, `ReferenceError`, `OtherError`) and fixed code allowlist (`ENOENT`, `EACCES`, `EPERM`, `EIO`, `EINVAL`, `EISDIR`, `ENOTDIR`, `ELOOP`, `ERR_INVALID_ARG_TYPE`, `ERR_INVALID_ARG_VALUE`, `ERR_OUT_OF_RANGE`, `OtherCode`). Catch import/loader errors and emit fixed stage/outcome plus safe categories only. Never stringify, persist, or display raw exception/logger arguments, stderr, stacks, causes, paths, or values.
- **Stop rules:** stop on the first successful module import after its single loader call; stop immediately on loader return/throw, timeout, invalid harness output, or other harness failure. If all ten imports fail, stop at ten. No further attempts or diagnosis under this contract.
- **Output:** fixed JSON with attempt number, outcome category, elapsed milliseconds, and safe error-name/code categories or logger category counts only. No raw child stdout/stderr is relayed; reject any child output that does not match the fixed schema without displaying it.
- **No secrets/network:** do not call the key accessor or inspect `process.env`; the approved loader may internally load environment configuration into memory, but its return values and environment contents must not be read or emitted. No environment file is opened directly by the harness.

## Expected outcome and acceptance

1. The operator explicitly approves this exact contract with `continue` before execution.
2. No more than ten fresh sequential child processes run; each is bounded to fifteen seconds (at most 150 seconds of child execution time total, excluding parent orchestration overhead). No parallelism, retries inside a child, or extra loader calls occur.
3. The batch stops on the first successful import after at most one loader call, or earlier on timeout/invalid output/harness failure; if all imports fail, it stops after attempt ten.
4. Only schema-valid fixed JSON categories are reported. No secret, environment value, raw message, path, stack, stderr, or provider payload is disclosed or persisted.
5. Evidence, runbook, and checkpoint record the observed attempts and limitations only; checkpoint 03 remains `HOLD`; `git diff --check` passes.

## Verification and stop conditions

- **Before run:** verify approved paths and preflight facts without opening `.env*`; validate this contract and run `git diff --check`.
- **During run:** count each child process; enforce its timeout; discard stderr; validate only safe JSON output. Stop exactly under the rules above. Do not attempt corrective imports, installs, file edits, environment resets, or loader retries after a loader outcome.
- **After run:** record only observed fixed categories, counts, command status, UTC timestamp, and limitations. Verify no sample/provenance or unrelated paths changed; run `git diff --check`.
- **Exit decision:** `DONE` only for the bounded diagnostic record with no secret disclosure or network access; outcome may still be `BLOCKED` and the original import/loader cause may remain unknown. DIAG-003 does not authorize another diagnostic or any live AISStream attempt.

## Rollback / recovery

Before execution, revise or remove only this appended draft if rejected. The diagnostic creates no persistent output except append-only evidence/runbook/checkpoint records. Preserve historical evidence and every pre-existing staged, deleted, modified, and untracked path. Do not change `.env*`, reset the branch, or repeat attempts after the stop condition; any further work needs another bounded contract and explicit authorization.

# TASK-SEA-R2-B09B10-DIAG-004 — Second bounded import/loader classification batch

- **Version:** `1.0.0`
- **Status:** `Verified`
- **Product owner:** методист відділення теорії судноводіння навчального центру «Норд-Вест»
- **Delivery / technical owner:** виконавець проєкту
- **Date:** 2026-09-25
- **Related artifacts:** [`CLAUDE.md`](CLAUDE.md), [`TASK_SPEC.md`](TASK_SPEC.md), [`EVIDENCE.md`](EVIDENCE.md), [`RUNBOOK.md`](RUNBOOK.md), [`docs/decisions/DEC-004-checkpoint-convention.md`](docs/decisions/DEC-004-checkpoint-convention.md), [`docs/checkpoints/CHECKPOINT-13.md`](docs/checkpoints/CHECKPOINT-13.md), `TASK-SEA-R2-B09B10-DIAG-003`, `E-SEA-063`, [`node_modules/@next/env/dist/index.js`](node_modules/@next/env/dist/index.js), [`node_modules/@next/env/dist/index.d.ts`](node_modules/@next/env/dist/index.d.ts).

## Goal and authorization

- **Goal:** make one further bounded check for transient `@next/env` import behavior across fresh local Node processes and, on the first successful import only, obtain the sanitized result of one `loadEnvConfig()` call.
- **Predecessor boundary:** DIAG-003 used ten fresh processes with a 15-second timeout; all imports failed with `OtherError` / `OtherCode`, and the loader was never called. DIAG-004 is a distinct batch of up to ten new attempts; it does not alter or repeat DIAG-003's historical record and is not expected to reveal hidden error details by repetition alone.
- **Operator request:** on 2026-09-25 the user said `продовжуй даю ще 10 спроб по 30 секунд` after DIAG-003 was recorded. This authorizes preparing this second contract for up to ten new attempts, each with a 30-second process timeout. Execution still requires review of this exact contract and a separate explicit `continue`.
- **Human gate:** do not start a child process, import `@next/env`, or call `loadEnvConfig()` until the operator explicitly says `continue` for DIAG-004.

## Allowed paths and exclusions

- **Contract preparation:** this appended DIAG-004 section in `TASK_SPEC.md` only.
- **After explicit `continue`:** execute the bounded local batch only; append observed facts to `EVIDENCE.md` and `RUNBOOK.md`; create `docs/checkpoints/CHECKPOINT-14.md`, keeping Sprint checkpoint 03 at `HOLD`.
- **Read-only inputs:** installed `@next/env` implementation/type signature and DIAG-003/E-SEA-063 result.
- **Excluded:** direct reads of `.env*` file contents; key accessor or credential-value inspection; changes to `NODE_ENV`, environment, files, dependencies, or configuration; `startAISStreamReader()`; any WebSocket/HTTP/DNS/network/provider request; sample/provenance access; product/source/test changes; unrelated paths; commit, push, and deployment.

## Bounded attempt policy

- **Preflight:** after `continue`, verify the worktree/branch boundary, both live sample targets absent, and `.env.local` ignored/untracked without opening it. Use no Next.js server or network-capable API.
- **Attempts:** at most ten new sequential child-process attempts, each in a fresh Node process with a 30-second process timeout (maximum 300 seconds of child execution time total; parent orchestration overhead excluded). No concurrent attempts or retries within a child. The parent may pass through the existing process environment but must not inspect, print, or mutate it.
- **Per-child operation:** dynamically import `@next/env`. If import succeeds, call `loadEnvConfig(process.cwd(), false, safeLogger)` exactly once in that child and stop the batch once that child returns its sanitized outcome, whether the loader returns or throws. If import fails, emit only safe categories and continue to the next attempt, unless the child times out, exits unexpectedly, or produces output outside the fixed schema; any such harness failure stops the batch immediately.
- **Safe logger and exception handling:** `info()` is a no-op. In `error(...args)`, ignore all strings/message arguments; for actual `Error` objects retain only a safe name category (`Error`, `TypeError`, `RangeError`, `SyntaxError`, `ReferenceError`, `OtherError`) and fixed code allowlist (`ENOENT`, `EACCES`, `EPERM`, `EIO`, `EINVAL`, `EISDIR`, `ENOTDIR`, `ELOOP`, `ERR_INVALID_ARG_TYPE`, `ERR_INVALID_ARG_VALUE`, `ERR_OUT_OF_RANGE`, `OtherCode`). Catch import/loader errors and report fixed stage/outcome plus safe categories only. Never stringify, persist, or display raw logger/exception arguments, stderr, stacks, causes, paths, or values.
- **Stop rules:** stop on first successful import after its single loader call; stop immediately on loader return/throw, timeout, invalid output, or other harness failure. If every import fails, stop after attempt ten. No follow-up troubleshooting or attempts are authorized by this contract.
- **Output:** fixed JSON only: attempt number, outcome, elapsed milliseconds, and safe categories/counts. The parent discards child stderr and never relays raw child output; invalid output is reduced to a fixed harness-failure category without display.
- **No secrets/network:** do not call the key accessor or inspect `process.env`. The approved loader may internally read environment configuration into memory only if a module import succeeds; do not inspect or emit its return values or environment contents. The harness must not directly open environment files.

## Expected outcome and acceptance

1. The operator explicitly approves this exact DIAG-004 contract with `continue` before execution.
2. No more than ten fresh sequential Node child processes run, each with a 30-second timeout (at most 300 seconds child execution time total, excluding parent orchestration overhead).
3. The batch stops after the first successful import and at most one loader call, after ten import failures, or earlier on timeout/invalid output/harness failure.
4. Only fixed schema-valid JSON categories are reported; no secret, environment value, raw error text, path, stack, stderr, or provider payload is disclosed or persisted.
5. EVIDENCE/RUNBOOK/CHECKPOINT-14 record observed facts only; checkpoint 03 remains `HOLD`; `git diff --check` passes.

## Verification and stop conditions

- **Before run:** verify the approved paths and preflight facts without opening `.env*`; validate this contract and run `git diff --check`.
- **During run:** count each fresh process, enforce its 30-second timeout, discard stderr, validate safe output, and obey stop rules exactly. Do not repair imports, install packages, edit files, reset environment, or retry after a loader outcome.
- **After run:** record observed categories/counts, per-attempt and total elapsed time, command status, UTC timestamp, and limitations. Verify no sample/provenance or unrelated path changed; run `git diff --check`.
- **Exit decision:** record `DONE` for completing the bounded batch safely, even if its result remains `BLOCKED`; the underlying import or loader cause may remain unknown. DIAG-004 authorizes no further diagnostic or live AISStream request.

## Rollback / recovery

Before execution, revise or remove only this appended draft if rejected. The batch creates no persistent output except append-only evidence/runbook/checkpoint records. Preserve historical evidence and all pre-existing staged, deleted, modified, and untracked paths. Do not change `.env*`, reset the branch, or continue after a stop condition; further work requires another bounded contract and explicit authorization.

# TASK-SEA-R2-B09B10-DIAG-005 — Safe module-resolution comparison

- **Version:** `1.0.0`
- **Status:** `Verified`
- **Product owner:** методист відділення теорії судноводіння навчального центру «Норд-Вест»
- **Delivery / technical owner:** виконавець проєкту
- **Date:** 2026-09-25
- **Related artifacts:** [`CLAUDE.md`](CLAUDE.md), [`TASK_SPEC.md`](TASK_SPEC.md), [`EVIDENCE.md`](EVIDENCE.md), [`RUNBOOK.md`](RUNBOOK.md), [`docs/decisions/DEC-004-checkpoint-convention.md`](docs/decisions/DEC-004-checkpoint-convention.md), [`docs/checkpoints/CHECKPOINT-14.md`](docs/checkpoints/CHECKPOINT-14.md), `TASK-SEA-R2-B09B10-DIAG-004`, `E-SEA-064`, [`node_modules/@next/env/dist/index.d.ts`](node_modules/@next/env/dist/index.d.ts).

## Goal and authorization

- **Goal:** distinguish package-resolution failure from module-evaluation failure by comparing CommonJS resolution, ESM resolution, and one dynamic import of `@next/env`, while emitting only fixed status flags and allowlisted error categories.
- **Predecessor boundary:** DIAG-003 and DIAG-004 each observed ten fresh-process import failures as `OtherError` / `OtherCode`. Neither batch called `loadEnvConfig()`. Repeating attempts is exhausted; DIAG-005 is one comparison run, not another retry batch.
- **Operator request:** on 2026-09-25 the user said `тоді продовжимо` after being told the next useful step was a bounded safe resolution/import comparison. This authorizes drafting this contract only. Execution requires the user's explicit `continue DIAG-005` after reviewing this exact contract.
- **Human gate:** do not run resolution checks or import `@next/env` until the operator explicitly approves DIAG-005.

## Allowed paths and exclusions

- **Contract preparation:** this appended DIAG-005 section in `TASK_SPEC.md` only.
- **After explicit approval:** perform one inline Node.js comparison; append observed facts to `EVIDENCE.md` and `RUNBOOK.md`; create `docs/checkpoints/CHECKPOINT-15.md`, keeping Sprint checkpoint 03 at `HOLD`.
- **Read-only inputs:** DIAG-004/E-SEA-064 and Node.js module-resolution APIs.
- **Excluded:** `loadEnvConfig()`; direct reads of `.env*` contents; key accessor or credential/environment-value inspection; reader, WebSocket, HTTP, DNS, network/provider requests; package installation or edits to dependencies/configuration/source/tests; sample/provenance access; unrelated paths; commit, push, and deployment.

## One-shot diagnostic policy

- **Preflight:** after approval, confirm worktree boundary, live sample/provenance targets absent, and `.env.local` ignored/untracked without opening it. Use one Node.js v22 inline invocation from the repository root. No Next.js server or network-capable API.
- **Resolution checks:** in the same process, perform exactly one `createRequire(import.meta.url).resolve("@next/env")` check and exactly one `import.meta.resolve("@next/env")` check. Retain only `resolved` / `failed` flags and sanitized error categories; do not print, persist, or report resolved paths/URLs.
- **Import check:** attempt exactly one `await import("@next/env")`, regardless of resolution-check outcomes. Report only `import_succeeded` or `import_failed`, plus a boolean for whether the expected `loadEnvConfig` export exists. Do not call the export.
- **Safe error classification:** never access message, stack, cause, path, or arbitrary properties beyond guarded `name` and `code`. Map names only to `Error`, `TypeError`, `RangeError`, `SyntaxError`, `ReferenceError`, `AggregateError`, or `OtherError`. Map codes only to `ERR_MODULE_NOT_FOUND`, `MODULE_NOT_FOUND`, `ERR_PACKAGE_PATH_NOT_EXPORTED`, `ERR_PACKAGE_IMPORT_NOT_DEFINED`, `ERR_UNSUPPORTED_DIR_IMPORT`, `ERR_REQUIRE_ESM`, `ERR_UNKNOWN_FILE_EXTENSION`, `ERR_INVALID_PACKAGE_CONFIG`, `ERR_UNSUPPORTED_RESOLVE_REQUEST`, `ERR_INVALID_ARG_TYPE`, `ERR_INVALID_ARG_VALUE`, `ENOENT`, `EACCES`, `EPERM`, or `OtherCode`. A thrown value that is not an `Error` maps to `OtherError` / `OtherCode`.
- **Output:** one fixed JSON object containing the three resolution/import flags, export-presence boolean if import succeeds, elapsed milliseconds, and safe name/code categories for failed checks. No raw exception, resolved path/URL, environment data, or child stderr is output or persisted.
- **Stop boundary:** one invocation only, no retries. If the harness cannot guarantee the fixed output schema or detects unexpected output, stop and report only `harness_failure`; do not rerun or debug under DIAG-005.
- **No environment/provider access:** do not inspect `process.env`, call the key accessor or loader, open environment files directly, or contact any network/provider. Importing the package is the only module evaluation authorized.

## Expected outcome and acceptance

1. The operator explicitly approves this exact DIAG-005 contract before the Node invocation.
2. One inline invocation performs one CommonJS resolution check, one ESM resolution check, and one dynamic import at most; no loader call or retries occur.
3. Output contains only fixed statuses, allowlisted error categories, and elapsed time; no paths, raw errors, secrets, environment values, or network data appear.
4. EVIDENCE/RUNBOOK/CHECKPOINT-15 record observed facts only and keep checkpoint 03 at `HOLD`.
5. `git diff --check` passes and no dependency, source, configuration, test, sample, or unrelated path changes occur.

## Verification and stop conditions

- **Before run:** validate allowed paths and preflight facts without opening `.env*`; review the exact contract; run `git diff --check`.
- **During run:** perform only the two resolution checks and one dynamic import. No error strings or resolved locations may reach output. Stop on unexpected harness behavior; no retries.
- **After run:** validate the output against the fixed schema, record UTC timestamp and command status, confirm no sample/provenance or unrelated path changed, and run `git diff --check`.
- **Exit decision:** mark only the observed comparison as verified; the root cause may remain unknown. DIAG-005 authorizes no loader call, further diagnosis, or live AISStream request.

## Rollback / recovery

Before execution, revise or remove only this appended draft if rejected. The one-shot check creates no persistent output except append-only evidence/runbook/checkpoint records. Preserve historical evidence and all pre-existing staged, deleted, modified, and untracked paths. Do not edit dependencies, inspect environment files, or repeat the diagnostic; further work requires a new bounded contract and explicit authorization.

# TASK-SEA-R2-B09B10-DIAG-006 — Inspect the package default export safely

- **Version:** `1.0.0`
- **Status:** `Verified`
- **Product owner:** методист відділення теорії судноводіння навчального центру «Норд-Вест»
- **Delivery / technical owner:** виконавець проєкту
- **Date:** 2026-09-25
- **Related artifacts:** [`CLAUDE.md`](CLAUDE.md), [`TASK_SPEC.md`](TASK_SPEC.md), [`EVIDENCE.md`](EVIDENCE.md), [`RUNBOOK.md`](RUNBOOK.md), [`docs/decisions/DEC-004-checkpoint-convention.md`](docs/decisions/DEC-004-checkpoint-convention.md), [`docs/checkpoints/CHECKPOINT-15.md`](docs/checkpoints/CHECKPOINT-15.md), `TASK-SEA-R2-B09B10-DIAG-005`, `E-SEA-065`, [`node_modules/@next/env/dist/index.d.ts`](node_modules/@next/env/dist/index.d.ts).

## Goal and authorization

- **Goal:** determine whether the `@next/env` dynamic-import namespace exposes `loadEnvConfig` through its `default` export, without invoking the export or reading environment configuration.
- **Predecessor boundary:** DIAG-005 observed successful CommonJS resolution, ESM resolution, and dynamic import, while `typeof namespace.loadEnvConfig` was false. DIAG-005 did not inspect `namespace.default`. This diagnostic checks only export shape; it does not explain the earlier `loadEnvConfig()` exception.
- **Operator request:** on 2026-09-25 the user requested checking the `default` export in a new bounded contract after DIAG-005. This authorizes preparing this contract only. Execution requires a separate explicit `continue DIAG-006` after reviewing this exact contract.
- **Human gate:** do not import `@next/env` or inspect its exports until the operator explicitly approves DIAG-006.

## Allowed paths and exclusions

- **Contract preparation:** this appended DIAG-006 section in `TASK_SPEC.md` only.
- **After explicit approval:** perform one inline Node.js export-shape inspection; append observed facts to `EVIDENCE.md` and `RUNBOOK.md`; create `docs/checkpoints/CHECKPOINT-16.md`, keeping Sprint checkpoint 03 at `HOLD`.
- **Read-only inputs:** DIAG-005/E-SEA-065 and the installed package's observed import shape.
- **Excluded:** calling `loadEnvConfig()` or any other package function; direct reads of `.env*` contents; key accessor or credential/environment-value inspection; reader, WebSocket, HTTP, DNS, network/provider requests; package installation or edits to dependencies/configuration/source/tests; sample/provenance access; unrelated paths; commit, push, and deployment.

## One-shot export-shape policy

- **Preflight:** after approval, confirm worktree boundary, live sample/provenance targets absent, and `.env.local` ignored/untracked without opening it. Use one Node.js v22 inline invocation from the repository root; no Next.js server or network-capable API.
- **Import:** perform exactly one `await import("@next/env")`. On import failure, emit only `import_failed` and safe name/code categories; do not retry.
- **Named/default metadata:** on import success, report only whether the namespace has a callable named `loadEnvConfig` property, the `default` value's fixed type category (`undefined`, `null`, `object`, `function`, or `primitive`), and a fixed descriptor category for its own `loadEnvConfig` property (`absent`, `data_function`, `data_non_function`, or `accessor`). Do not enumerate namespace/default keys, serialize either object, call a getter, or invoke any function. Use `Object.getOwnPropertyDescriptor` to classify the default property's descriptor without invoking it.
- **Safe error classification:** never access message, stack, cause, path, or arbitrary properties beyond guarded `name` and `code`. Map names only to `Error`, `TypeError`, `RangeError`, `SyntaxError`, `ReferenceError`, `AggregateError`, or `OtherError`. Map codes only to `ERR_MODULE_NOT_FOUND`, `MODULE_NOT_FOUND`, `ERR_PACKAGE_PATH_NOT_EXPORTED`, `ERR_PACKAGE_IMPORT_NOT_DEFINED`, `ERR_UNSUPPORTED_DIR_IMPORT`, `ERR_REQUIRE_ESM`, `ERR_UNKNOWN_FILE_EXTENSION`, `ERR_INVALID_PACKAGE_CONFIG`, `ERR_UNSUPPORTED_RESOLVE_REQUEST`, `ERR_INVALID_ARG_TYPE`, `ERR_INVALID_ARG_VALUE`, `ENOENT`, `EACCES`, `EPERM`, or `OtherCode`. Non-Error thrown values map to `OtherError` / `OtherCode`.
- **Output:** one fixed JSON object with import status, named-export boolean, default-type/descriptor categories when import succeeds, elapsed milliseconds, and sanitized error categories if import fails. No raw exception, namespace/default contents, resolved paths, environment data, or stderr.
- **No environment/provider access:** do not inspect `process.env`, call the key accessor or loader, open environment files directly, or contact any network/provider. Importing the package is the only module evaluation authorized.
- **Stop boundary:** one invocation, one import, no retries. If a fixed output cannot be guaranteed or unexpected output occurs, report only `harness_failure`; do not rerun or debug under DIAG-006.

## Expected outcome and acceptance

1. The operator explicitly approves this exact DIAG-006 contract with `continue DIAG-006` before execution.
2. One dynamic import is attempted; only approved export-shape metadata is inspected; no package function or getter is invoked.
3. Output contains only fixed categories, booleans, and elapsed time; no raw errors, paths, secrets, environment values, or network data appear.
4. EVIDENCE/RUNBOOK/CHECKPOINT-16 record observed facts only and keep checkpoint 03 at `HOLD`.
5. `git diff --check` passes; no dependency, source, configuration, test, sample, or unrelated path changes occur.

## Verification and stop conditions

- **Before run:** validate allowed paths and preflight facts without opening `.env*`; review this exact contract; run `git diff --check`.
- **During run:** perform one import and fixed metadata checks only. Do not invoke or evaluate a getter; do not access environment values. Stop on unexpected harness behavior without retry.
- **After run:** validate output schema, record UTC timestamp and command status, confirm no sample/provenance or unrelated path changed, and run `git diff --check`.
- **Exit decision:** mark only the observed export shape as verified; whether any callable is safely usable and the original loader failure cause may remain unknown. DIAG-006 authorizes no loader call, further diagnosis, or live AISStream request.

## Rollback / recovery

Before execution, revise or remove only this appended draft if rejected. The one-shot inspection creates no persistent output except append-only evidence/runbook/checkpoint records. Preserve historical evidence and every pre-existing staged, deleted, modified, and untracked path. Do not inspect environment files, invoke exports, or repeat the diagnostic; further work requires a new bounded contract and explicit authorization.

# TASK-SEA-R2-HANDOFF-002 — Refresh the next-session handoff

- **Version:** `1.0.0`
- **Status:** `Verified`
- **Product owner:** методист відділення теорії судноводіння навчального центру «Норд-Вест»
- **Delivery / technical owner:** виконавець проєкту
- **Date:** 2026-09-25
- **Related artifacts:** [`CLAUDE.md`](CLAUDE.md), [`SPEC.md`](SPEC.md), [`NEXT_SESSION.md`](NEXT_SESSION.md), [`TASK_SPEC.md`](TASK_SPEC.md), [`EVIDENCE.md`](EVIDENCE.md), [`RUNBOOK.md`](RUNBOOK.md), [`docs/checkpoints/CHECKPOINT-16.md`](docs/checkpoints/CHECKPOINT-16.md), [`docs/decisions/DEC-004-checkpoint-convention.md`](docs/decisions/DEC-004-checkpoint-convention.md), `E-SEA-066`.

## Goal and constraints

- **Goal:** replace the stale active FIX-001 next-session handoff with an accurate, restartable handoff to the current verified documentation checkpoint, without changing product behavior or reopening diagnostics.
- **Scope alignment:** this handoff documents the currently observed R2 state and does not claim R2 acceptance; Sprint checkpoint 03 remains `HOLD` because the live PositionReport and matching sample/provenance criteria are unmet.
- **Governance discrepancy:** `CLAUDE.md` and `SPEC.md` still name B-08 as the current task. Do not silently amend those baselines here; flag the discrepancy and require separate approved change control before correction.
- **Authorization:** documentation handoff only. No accessor evaluation, loader invocation, environment inspection, live provider/network request, sample/provenance access, build/test, stage, commit, push, or deployment is authorized.

## Allowed paths and preservation boundary

- `TASK_SPEC.md`: append this contract and update only its status after checks.
- `NEXT_SESSION.md`: replace only the active section above `## Історичний R1 handoff`; preserve the R1 archive byte-for-byte.
- `EVIDENCE.md`: append one factual handoff verification record after checks.
- `RUNBOOK.md`: append one factual operational handoff record after checks.
- **Read-only anchors:** `CLAUDE.md`, `SPEC.md`, `docs/checkpoints/CHECKPOINT-16.md`, DIAG-006/E-SEA-066 records, and DEC-004.
- Preserve every pre-existing staged, modified, deleted, and untracked path. Do not stage, reset, clean, remove, or overwrite unrelated paths.

## Handoff acceptance and verification

1. `NEXT_SESSION.md` identifies CHECKPOINT-16 as the canonical restart summary, links E-SEA-066 and the latest RUNBOOK record, and states the exact DIAG-006 result and its limits.
2. The handoff states Sprint checkpoint 03 `HOLD`, the missing live receipt/sample/provenance, unresolved getter/loader cause, and the explicit authorization boundary for any future work.
3. The next-session prompt begins with read-only Git status/path/ref checks and review of canonical records; it does not direct implementation or live access.
4. The governance mismatch is disclosed without changing `CLAUDE.md` or `SPEC.md`; the historical R1 archive remains unchanged.
5. After checks, append E-SEA-067 and a RUNBOOK entry using observed results only; do not edit CHECKPOINT-16 unless a factual defect is verified.
6. Run `git diff --check`, a scoped trailing-whitespace check, validate handoff links/claims, inspect the scoped diff and final Git boundary. No build/test is relevant or authorized.

## Stop conditions and recovery

Stop and request human direction if the Git boundary materially differs from the preflight, the R1 archive cannot be preserved, or factual consistency requires changing a governance baseline. If rejected, revise only the task-specific appended contract, active handoff section, and this task's append-only records; preserve all pre-existing Git state and historical evidence. No rollback of product code is applicable.

# TASK-SEA-R2-GOV-003 — Draft current-task governance reconciliation

- **Version:** `1.0.0`
- **Status:** `Active`
- **Product owner:** методист відділення теорії судноводіння навчального центру «Норд-Вест»
- **Delivery / technical owner:** виконавець проєкту
- **Date:** 2026-09-25
- **Related artifacts:** [`CLAUDE.md`](CLAUDE.md), [`SPEC.md`](SPEC.md), [`TASK_SPEC.md`](TASK_SPEC.md), [`NEXT_SESSION.md`](NEXT_SESSION.md), [`EVIDENCE.md`](EVIDENCE.md), [`RUNBOOK.md`](RUNBOOK.md), [`docs/decisions/README.md`](docs/decisions/README.md), [`docs/decisions/DEC-006-r2-scope.md`](docs/decisions/DEC-006-r2-scope.md), [`docs/decisions/DEC-007-r2-b09-streaming-boundary.md`](docs/decisions/DEC-007-r2-b09-streaming-boundary.md), [`docs/checkpoints/CHECKPOINT-16.md`](docs/checkpoints/CHECKPOINT-16.md), `E-SEA-066`, `E-SEA-067`.

## Goal and decision boundary

- **Goal:** prepare a non-authoritative, reviewable Draft decision proposal addressing stale canonical wording that still identifies B-08 as the current R2 task, without selecting a new authorized implementation task or changing any canonical baseline.
- **Observed context:** `CLAUDE.md` v1.3.0 and `SPEC.md` v1.1.0 identify B-08 as current. Later task-specific records document separately bounded work through DIAG-006 and HANDOFF-002. CHECKPOINT-16 and `NEXT_SESSION.md` disclose the discrepancy and require separate change control. DEC-006 authorized R2 and B-08; later activity does not by itself make a completed task the currently authorized next task.
- **Approval boundary:** the user authorized preparation of a Draft proposal only. This task does not approve the proposed decision, update canonical status, authorize a successor task, or authorize any technical/provider work. A separate explicit human decision is required before accepting the proposal or synchronizing baselines.
- **Acceptance state:** Sprint checkpoint 03 remains `HOLD / not passed`; this task makes no R2 acceptance, live receipt, sample/provenance, or release-readiness claim.

## Allowed paths and preservation boundary

- `TASK_SPEC.md`: append this bounded contract only.
- `docs/decisions/DEC-008-r2-current-task-status.md`: create a new `Draft` proposal only if the path is absent; never overwrite an existing file.
- `EVIDENCE.md` and `RUNBOOK.md`: append factual preparation/check results only after the checks have actually run.
- **Read-only inputs:** `CLAUDE.md`, `SPEC.md`, `NEXT_SESSION.md`, `docs/decisions/README.md`, DEC-006, DEC-007, `docs/README.md`, `docs/sprints/README.md`, `SPRINT-02.md`, CHECKPOINT-03, CHECKPOINT-16, relevant `TASK_SPEC.md` records, E-SEA-066/E-SEA-067, and corresponding RUNBOOK entries.
- **Excluded:** edits to `CLAUDE.md`, `SPEC.md`, `docs/decisions/README.md`, `docs/README.md`, `docs/sprints/README.md`, `SPRINT-02.md`, DEC-006/DEC-007, prior task contracts, historical checkpoints, and existing append-only history except the allowed factual append after checks; all product/source/test/dependency/configuration paths; `.env*`, credentials, reader/loader/accessor/provider/network activity; stage/reset/clean/remove, commit, push, deployment; all pre-existing unrelated paths.
- Preserve every pre-existing staged, modified, deleted, and untracked path. Do not infer that the latest checkpoint's task label is a new standing authorization.

## Draft proposal requirements

1. The new record follows `docs/decisions/README.md` and contains ID, version, date, status, owner, context/constraints, options including rejected alternatives, proposed choice/rationale, consequences/risks/deferred work, a review/verification trigger, and links to relevant SPEC/TASK/EVIDENCE/RUNBOOK records.
2. Mark the record `Draft` and explicitly state it is not an approved decision and has no effect on canonical baselines.
3. Present a conservative proposed resolution: do not identify any R2 technical task as currently authorized until the product owner selects and approves a new bounded task; distinguish governance review as a next action from authorization to implement. The product owner may reject or revise this proposal.
4. Options must distinguish at least: (a) retain B-08 as the historical task authorized by DEC-006 but remove the stale implication that it remains current; (b) explicitly name another bounded task only after its own contract and approval; (c) leave the existing wording unchanged. Explain why option (c) risks misleading operators given the recorded later task history, without treating that history as proof of new standing authorization.
5. Identify the impact surface for later review: direct stale claims in `CLAUDE.md` and `SPEC.md`; other Sprint-2 status statements in `docs/README.md` and `docs/sprints/README.md`; and the separately controlled `SPRINT-02.md`/DEC-007 relationship. Do not silently expand this task to synchronize any of those files.
6. Keep DEC-006 and DEC-007 historical records intact; do not mark either superseded. The decision index is not updated until the proposal is approved and the resulting record verified.

## Verification, checkpoint, and stop conditions

- Before creating DEC-008, verify the fresh Git boundary/ref values and that the exact target path does not exist; preserve all pre-existing paths.
- Validate decision metadata, Draft/non-authoritative language, options, proposed choice, approval/revisit trigger, record links, checkpoint HOLD statement, and exclusion of technical/provider activity against the read-only source records.
- Run `git diff --check` on the authorized documentation paths; inspect the complete diff and confirm no excluded path changed. Run only documentation/Git structural checks; do not run product build/tests.
- Stop if DEC-008 already exists, the decision requires guessing an approved successor task, any baseline must be edited to express the proposal, the Git boundary changes unexpectedly, or a check would require secret/environment/provider access.
- Append EVIDENCE/RUNBOOK only with observed facts after verification. Human review must choose `continue`, `revise`, or `HOLD` for the proposal before it is treated as an approved decision or used to update other canonical artifacts.

## Rollback / recovery

If this draft-preparation slice is rejected, inspect the diff and revise/remove only the newly appended `TASK-SEA-R2-GOV-003` section and the new DEC-008 proposal. Correct factual evidence/runbook errors only through superseding append-only entries. Preserve all pre-existing staged, modified, deleted, and untracked paths; do not reset, clean, stage, or remove them. No product rollback applies.

# TASK-SEA-R2-GOV-004 — Authorize current-task decision and baseline correction

- **Version:** `1.0.0`
- **Status:** `Verified`
- **Product owner:** методист відділення теорії судноводіння навчального центру «Норд-Вест»
- **Delivery / technical owner:** виконавець проєкту
- **Date:** 2026-09-25
- **Related artifacts:** [`CLAUDE.md`](CLAUDE.md), [`SPEC.md`](SPEC.md), [`TASK_SPEC.md`](TASK_SPEC.md), [`docs/decisions/README.md`](docs/decisions/README.md), [`docs/decisions/DEC-006-r2-scope.md`](docs/decisions/DEC-006-r2-scope.md), [`docs/decisions/DEC-008-r2-current-task-status.md`](docs/decisions/DEC-008-r2-current-task-status.md), [`NEXT_SESSION.md`](NEXT_SESSION.md), [`EVIDENCE.md`](EVIDENCE.md), [`RUNBOOK.md`](RUNBOOK.md), [`docs/checkpoints/CHECKPOINT-16.md`](docs/checkpoints/CHECKPOINT-16.md), `E-SEA-068`.

## Goal and approval boundary

- **Goal:** define an explicitly reviewable, documentation-only task to record the proposed R2 current-task governance resolution and correct only direct stale B-08-current claims in the canonical baselines.
- **Proposed resolution:** B-08 remains the historical bounded task selected by DEC-006; no R2 technical task is currently authorized until a new bounded task is separately reviewed and explicitly approved. This does not change authorized R2 scope and does not establish Sprint 2 acceptance.
- **User decision recorded:** the user selected `continue` on the DEC-008 proposal and selected direct stale claims only as the synchronization scope. This is not treated as product-owner signoff unless the product owner explicitly confirms that decision; do not infer approval identity or authority.
- **Human gate:** this contract is `Draft`. Do not create an approved decision record, update the decision index, or edit canonical baselines until the product owner explicitly approves this exact task contract and the planned decision record. A separate diff review is required after execution.
- **Acceptance boundary:** Sprint checkpoint 03 remains `HOLD / not passed`. This task must not claim R2 acceptance, live provider receipt, matching sample/provenance, release readiness, or authorize implementation/diagnostics.

## Allowed paths and preservation boundary

- `TASK_SPEC.md`: append this contract; update its status only after the approval/execution gates are satisfied.
- After explicit product-owner approval of this exact task and decision text: create `docs/decisions/DEC-009-r2-current-task-status.md` as the approved versioned decision; update `docs/decisions/README.md` with the verified DEC-009 entry and required index metadata/version; update only the current-task statements and required metadata/related links in `CLAUDE.md` and `SPEC.md`.
- `EVIDENCE.md` and `RUNBOOK.md`: append factual outcomes only after verification; never rewrite prior entries.
- **Read-only inputs:** DEC-006, DEC-007, DEC-008, `docs/decisions/README.md`, `NEXT_SESSION.md`, CHECKPOINT-16, the relevant B-08 and later task records, E-SEA-066…E-SEA-068, and corresponding RUNBOOK entries.
- **Excluded:** `docs/README.md`, `docs/sprints/README.md`, `SPRINT-02.md`, DEC-006/007/008 content, historical task contracts/checkpoints, all product/source/test/dependency/configuration paths, environment/secrets, provider/network activity, build/tests, staging/reset/clean/remove, commit, push, deployment, and unrelated pre-existing paths.
- Preserve every pre-existing staged, modified, deleted, and untracked path. Do not alter the new or existing untracked paths except the specifically allowed new DEC-009 after approval.

## Proposed decision record and baseline wording

1. Create a new approved decision record at the verified-absent path `docs/decisions/DEC-009-r2-current-task-status.md` rather than overwrite DEC-008. The new record must link DEC-008 as its Draft proposal/source, preserve DEC-006's historical authorization, present the accepted current authorization boundary, and explicitly state that no successor task or Sprint 2 acceptance is authorized/inferred.
2. Keep DEC-008 unchanged as a historical Draft proposal; do not label it approved or superseded. Add DEC-009 to the index only after DEC-009's approval/status and links have been verified. Apply the decision-index version/date update only after inspecting and recording the exact version in the reviewed diff; do not assume a generic increment rule.
3. In `CLAUDE.md` §1, replace only wording that implies B-08 remains the current task. Preserve that DEC-006 authorized R2 and B-08 historically, and state that no R2 technical task is currently authorized pending separate bounded-task approval. Add the DEC-009 link and bump the document version/date according to inspected convention.
4. In `SPEC.md` Scope, Release slice, Open decisions, and Change-control gate, correct only B-08-as-current implications. Preserve R2 scope, B-08's historical DEC-006 authorization, and individual gates on later tasks. Add the DEC-009 link and bump version/date according to inspected convention.
5. Proposed version targets for review: new DEC-009 `1.0.0`, decision index `0.7.0`, `CLAUDE.md` `1.4.0`, and `SPEC.md` `1.2.0`. These targets are proposals, not established repository rules; confirm each against the existing convention and obtain approval before using different values or changing this list.

## Verification, checkpoint, and stop conditions

- Before execution, confirm a fresh Git boundary/ref snapshot, exact allowed paths, DEC-009 path absence, explicit product-owner approval, and approved wording/version targets. Never overwrite a pre-existing DEC-009.
- Verify the DEC-009 metadata/status, decision choice, links, historical boundary, index consistency, and matched current-task wording across CLAUDE.md and SPEC.md. Confirm no direct claim remains that B-08 is currently authorized, except explicitly historical wording.
- Confirm checkpoint 03 remains `HOLD / not passed`, and no implementation, provider, live-receipt, sample/provenance, acceptance, or release-readiness claim appears.
- Run only documentation/Git structural checks: `git diff --check` on changed paths, local-link/content/version checks, full diff review, and final changed-path boundary review. Do not run build/tests or inspect environment/secrets.
- Stop without canonical edits if the product owner has not approved the contract and exact decision text, the decision-index/version convention remains unresolved, the boundary changed unexpectedly, or replacement wording requires guessing.

## Checkpoint and recovery

- **Checkpoint:** after contract review, before any canonical edit; then after verified decision/index changes, before baseline synchronization; finally inspect the complete diff for human `continue`, `revise`, or `HOLD`.
- **Rollback/recovery:** if rejected before execution, revise only this appended Draft contract. If later canonical changes are rejected, inspect and revise only the authorized paths through a new versioned change record; do not reset or erase pre-existing staged, modified, deleted, or untracked state, and do not rewrite append-only evidence/history. No product rollback applies.

# TASK-SEA-R2-B14-MIXED-VESSELS-001 — Sparse snapshot demo fallback and marker distinction

- **Version:** `1.0.0`
- **Status:** `Verified`
- **Product owner:** методист відділення теорії судноводіння навчального центру «Норд-Вест»
- **Delivery / technical owner:** виконавець проєкту
- **Date:** 2026-09-25
- **Related artifacts:** [`CLAUDE.md`](CLAUDE.md), [`SPEC.md`](SPEC.md), [`SPRINT-02.md`](SPRINT-02.md), [`TASK_SPEC.md`](TASK_SPEC.md), [`EVIDENCE.md`](EVIDENCE.md), [`RUNBOOK.md`](RUNBOOK.md), [`docs/decisions/DEC-009-r2-current-task-status.md`](docs/decisions/DEC-009-r2-current-task-status.md), [`docs/decisions/DEC-010-r2-sparse-snapshot-demo-fallback.md`](docs/decisions/DEC-010-r2-sparse-snapshot-demo-fallback.md)

## Goal and authorization boundary

- **Goal:** when a successful AISStream snapshot contains fewer than three vessels, display all three existing demo vessels alongside the returned AISStream vessels; give AISStream and demo markers distinct source colors; highlight the selected marker independently of source color.
- **Terminology:** the implementation's source categories are `aisstream` and `demo`. AISStream snapshot vessels remain identified by their actual source; synthetic demo markers must not inflate or be presented as AIS data.
- **Governance:** the product owner explicitly approved this exact bounded contract and DEC-010 on 2026-09-25. DEC-010 authorizes only the specified UI change; it does not establish Sprint 2 acceptance or authorize other R2 work.
- **Decision:** DEC-010 is approved; synchronize SPEC/SPRINT baselines before implementation.

## Allowed paths and preservation boundary

- **Approved contract / decision:** `TASK_SPEC.md` (this task only), `docs/decisions/DEC-010-r2-sparse-snapshot-demo-fallback.md`, `docs/decisions/README.md`.
- **Authorized baseline synchronization and implementation:** `SPEC.md`, `SPRINT-02.md`; implementation paths `app/map-shell.tsx`, `app/sea-map.tsx`, `app/globals.css`; tests `tests/snapshot-interface.spec.ts`, `tests/vessel-selection.spec.ts`.
- **After verification only:** append facts to `EVIDENCE.md` and `RUNBOOK.md`.
- **Read-only inputs:** current `SPEC.md`, `SPRINT-02.md`, DEC-009, decision index, app map/model/card sources, current browser tests, and installed Next.js documentation relevant to touched APIs (read before code changes).
- **Excluded:** AISStream/provider/network requests; environment, secret or key access; changes to source collectors, API, vessel schema, package/dependencies, other product features, `PROJECT_BRIEF.md`, DEC-006/DEC-009, unrelated historical records, `reference/`, and all unrelated or pre-existing Git paths; no commit, push, deployment, staging/reset/clean/removal.

## Behavior and constraints

1. For a validated successful AISStream snapshot with 0, 1, or 2 AISStream vessels, display the returned AISStream vessels plus all three existing `DEMO_VESSELS`.
2. For snapshots with 3 or more AISStream vessels, display only the snapshot vessels. Do not alter the API payload, server collector, unique-vessel count, timestamp, or incomplete-sample label.
3. For a successful zero-vessel snapshot, retain the existing empty-result status/message while the demo markers are visible. Loading and error states remain empty as currently specified; no fallback is added on a failed request.
4. Supplemental demo vessels in mixed snapshot mode are stationary. Existing initial demo-mode motion is unchanged.
5. Markers expose source identity and selected state in testable DOM metadata. AISStream and demo use visibly distinct colors; selected state uses an additional visible outline/ring that does not replace source color and works for both course and neutral glyphs.
6. Selection/card behavior remains intact. Selection may transfer between AISStream and demo markers; only the selected marker receives the selected style. Reconcile selection without rebuilding markers solely because selection changed.
7. No UI text may imply synthetic demo markers came from AISStream; the displayed snapshot count remains the server's AIS-only count.

## Acceptance and verification

- Browser fixtures for AISStream counts 0, 1, 2, 3, and 4 verify expected marker IDs/sources: append all 3 demo IDs only for 0–2; none for 3+.
- The label/count remains 0/1/2/3/4 according to the snapshot and never includes demo markers; zero retains its empty message.
- Source-specific colors are testable via source metadata and CSS computed styles or stable class/style assertions; selected marker metadata/style changes when selection moves between sources and remains distinct from source color.
- Initial three-demo motion/selection, loading cleanup, error cleanup, and B-07 card behavior remain unchanged.
- The relevant installed Next.js guide was read before code changes. Run `npx playwright test tests/snapshot-interface.spec.ts tests/vessel-selection.spec.ts`, `npx tsc --noEmit`, `npm run build`, and `git diff --check`. Record actual output and limitations only.
- Do not call AISStream or access secrets. No evidence/runbook entry until checks have run.

## Stop conditions, checkpoints, and recovery

- **Approval checkpoint passed:** the product owner approved this bounded contract and DEC-010 on 2026-09-25. Verify baseline synchronization before code changes; no acceptance outcome is claimed until implementation checks run.
- **Stop during execution** if actual source semantics conflict with the terminology assumption, if tests require network/provider access, if any change exceeds allowed paths, if the existing marker lifecycle would require out-of-scope behavior, or if an acceptance oracle cannot distinguish real snapshot count from synthetic markers.
- **Rollback/recovery:** use the approved decision/task contract to revert only task-owned changes after inspecting the diff; preserve earlier evidence/history and every pre-existing staged, modified, deleted, and untracked path. Append corrections rather than rewriting verified evidence. No commit/push/deployment is authorized.

## Final implementation review outcome — 2026-09-27

- `TASK-SEA-R2-B14-REVIEW-003` completed its read-only review of the exact approved post-remediation target and found one medium governance inconsistency at `SPEC.md:69`; the review recommendation is `FAIL`, and this implementation task remains `Active` pending correction and a fresh review.
- User disposition `продовжуй` records only this review outcome and authorizes its closeout records and preparation of a separate bounded correction contract. It does not approve a code/document correction or accept B-14/Sprint 2.
- No CHECKPOINT-24 is created. See `E-SEA-083` and the corresponding RUNBOOK entry.

# TASK-SEA-R2-SPRINT02-RETRO-README-001 — Sprint 2 retrospective README

- **Version:** `1.0.0`
- **Status:** `Verified` — retrospective status wording updated and accepted after human review; no broader acceptance is implied.
- **Product owner:** методист відділення теорії судноводіння навчального центру «Норд-Вест»
- **Delivery / technical owner:** виконавець проєкту
- **Date:** 2026-09-26
- **Related artifacts:** [`SPRINT-02.md`](SPRINT-02.md), [`SPRINT-02-README.md`](SPRINT-02-README.md), [`README.md`](README.md), [`TASK_SPEC.md`](TASK_SPEC.md), [`EVIDENCE.md`](EVIDENCE.md), [`RUNBOOK.md`](RUNBOOK.md), [`docs/decisions/DEC-006-r2-scope.md`](docs/decisions/DEC-006-r2-scope.md), [`docs/decisions/DEC-009-r2-current-task-status.md`](docs/decisions/DEC-009-r2-current-task-status.md), [`docs/decisions/DEC-010-r2-sparse-snapshot-demo-fallback.md`](docs/decisions/DEC-010-r2-sparse-snapshot-demo-fallback.md)

## Goal and authorization boundary

- **Goal:** add a separate, factual Sprint 2 retrospective README that records both delivered bounded work and the way it was carried out, links its claims to existing evidence, and embeds the existing `sprint-2.png` screenshot with a source-accurate caption.
- **Document role:** `SPRINT-02-README.md` is a descriptive companion, not a replacement for the Sprint 2 contract, task contracts, append-only evidence, runbook, or checkpoints. It must distinguish verified local/mock behavior from live-provider evidence and state that Sprint checkpoint 03 remains `HOLD / not passed`; overall Sprint 2 acceptance and release readiness are not established.
- **Screenshot limitation:** the image shows an AISStream-labeled UI snapshot/count and a vessel card. It may be described as visual evidence of the displayed interface only; it does not independently prove API transport, provider provenance, live data, or end-to-end acceptance. Do not reconstruct or assert raw payload details from the image.
- **Approval boundary:** the user explicitly approved this exact documentation-only bounded contract on 2026-09-26. This authorizes only the README companion and root README navigation/status wording below; it does not authorize additional R2 technical/provider work.

## Allowed paths and preservation boundary

- **After explicit contract approval:** `SPRINT-02-README.md` (new companion retrospective) and `README.md` (add a discoverability link and correct only the obsolete Sprint 2 overview wording while keeping the R1 scope clear).
- **Contract record:** append this bounded task and any approval/status update to `TASK_SPEC.md` only.
- **Read-only sources:** `SPRINT-02.md`, `EVIDENCE.md`, `RUNBOOK.md`, `docs/checkpoints/CHECKPOINT-03.md` through `CHECKPOINT-16.md`, DEC-006/009/010, relevant route/reader/collector/transformer/client source, and `sprint-2.png`.
- **Excluded:** edits to `SPRINT-02.md`, `docs/sprints/README.md`, evidence/checkpoint history, decision records/index, implementation/tests/config/dependencies, or `sprint-2.png`; provider/network requests; environment/secret access; build/test execution; staging/reset/clean/removal; commit, push, or deployment. Preserve every unrelated pre-existing modified, staged, deleted, and untracked path.

## Content and acceptance

1. Include standard document metadata (`ID`, `Version`, `Status`, `Owner`, `Date`, `Related artifacts`) and explain that this is a retrospective companion, not a canonical plan/evidence source.
2. Describe the bounded process: scope/task contract first, explicit per-task review/approval and checkpoints, minimal allowed paths, deterministic fixtures/fakes or mocked API tests, targeted checks, human diff review, append-only evidence/handoffs, and preservation of HOLD outcomes. Link to source records rather than duplicating long transcripts.
3. Summarize B-08 through B-14 using actual EVIDENCE/RUNBOOK observations and evidence IDs. Mark synthetic sample, mocked/local checks, unsuccessful live attempts, gated items, and the still-pending B-14 human diff review accurately; do not treat planned checks in `SPRINT-02.md` as executed facts.
4. Describe the implemented data path at a high level (`GET /api/snapshot` client request → server route/reader/collector/transformer → snapshot UI) with file links. Separate architecture/code and mocked verification from successful live-provider receipt.
5. Embed the unchanged image by relative Markdown path (`![...](sprint-2.png)`) and state what is visibly present plus the screenshot's evidential limits.
6. State that checkpoint 03 is `HOLD / not passed`, live PositionReport/sample provenance and full Sprint acceptance remain unverified, and the next step is human review; link relevant contracts, E-* records, and checkpoint/runbook sources.
7. Root `README.md` links to the new retrospective and no longer says Sprint 2 is undetailed/unauthorized; it continues to identify R1 as the scope of the original README and does not imply R2 acceptance.

## Verification

After approval and writing:

- Validate the README structure, metadata, internal relative links, image target, evidence IDs, and claim/status consistency against read-only sources.
- Confirm the screenshot file was not changed and changed paths are only the approved paths plus the contract record.
- Run `git diff --check`; do not run application tests/build or provider/network actions for this documentation-only task.
- Do not append EVIDENCE/RUNBOOK entries under this contract; this README links the existing append-only records, and no new product/runtime verification is in scope.

## Stop conditions, checkpoint, and recovery

- **Stop before README edits** unless the user explicitly approves this Draft contract; approval of the general implementation plan does not supersede the task-specific approval boundary.
- Stop if an intended statement lacks an existing evidence anchor, the image is missing/changed, the Sprint status cannot be described without guessing, or a requested edit would alter excluded canonical records or expand the task.
- After the task contract approval, pause after the README diff for human review and `continue`, `revise`, or `HOLD`.
- **Rollback/recovery:** revise or remove only this task's own README text/link after inspecting its diff; preserve all unrelated and pre-existing Git state. Do not rewrite append-only history. No commit/push/deployment is authorized.

## Current-state addendum — 2026-09-28

- **Trigger / authorization:** the user explicitly requested that the existing retrospective record what was completed and how, noting that substantial content is already present. Continue the previously approved documentation-only task; preserve and update its existing material rather than replacing it.
- **Current status source of truth:** after this contract's original approval, later evidence and decisions changed several statements in the 2026-09-26 draft. Use `E-SEA-075`, `E-SEA-087`–`E-SEA-092`, `CHECKPOINT-21`–`CHECKPOINT-25`, current `TASK_SPEC.md`, and current `RUNBOOK.md`. CHECKPOINT-03's original HOLD is historical/superseded; CHECKPOINT-22 records PASS/VERIFIED only for CHECKPOINT-03's defined criteria; CHECKPOINT-25 records PASS/VERIFIED for bounded R2 acceptance. Neither is full MVP, release, or deployment acceptance.
- **Output boundary remains:** `SPRINT-02-README.md` and the existing Sprint 2 summary/navigation sentence in root `README.md`; update this task section in `TASK_SPEC.md` to record the present approval/status. Do not change `SPRINT-02.md`, the sprint catalog, `SPRINT-02-README.pdf`, `sprint-2.png`, implementation, tests, samples, references, or append-only evidence/checkpoint records.
- **Content update:** retain sound existing sections and screenshot. Correct stale R2/checkpoint/B-14 status; update B-08…B-14 outcomes using current evidence classes; record the approved bounded acceptance and selected-card→loading test; explain both what was done and the bounded, contract-first, human-reviewed, evidence-led method. Clearly separate mocked/local checks, static reviews, user-reported/manual observations, and the one bounded live capture. Keep request duration/no-key HTTP metadata, provider acknowledgement/key validity, US-09/US-10, full MVP, release, and deployment limitations accurate.
- **Verification / review gate:** validate current metadata, referenced evidence IDs, relative links, image target and unchanged screenshot; verify changed paths; run `git diff --check` only (no product tests/build/provider/network). Present the exact diff and checks, then wait for a separate `continue`, `revise`, or `HOLD`; do not mark this task Verified or commit/push before that disposition.

## Human disposition and closeout — 2026-09-28

- **Requested correction:** the user asked for an explicit statement that bounded Sprint 2 was complete. `SPRINT-02-README.md` now distinguishes the retrospective's `Draft` status from Sprint 2 / R2 being `ЗАВЕРШЕНО` only within the bounded `PASS / VERIFIED` scope of CHECKPOINT-25.
- **Review decision:** after reviewing the changed wording, the user selected `continue`; this authorizes closeout of this documentation task only. It does not authorize commit, push, deployment, broader MVP acceptance, or additional R2 work.
- **Verification:** the status wording was checked against CHECKPOINT-25/CHECKPOINT-22; the focused README check found 65 resolving local links and passed its whitespace check. `git diff --check -- TASK_SPEC.md` passed for this closeout. No application tests/build, network/provider activity, or secret/environment access was performed.
- **Outcome:** this retrospective task is `Verified`. No EVIDENCE.md or RUNBOOK.md entry was added; the change records document status wording, not new product/runtime evidence.

# TASK-SEA-R2-SPRINT02-README-PDF-001 — Export Sprint 2 README to PDF

- **Version:** `1.0.0`
- **Status:** `Active`
- **Product owner:** методист відділення теорії судноводіння навчального центру «Норд-Вест»
- **Delivery / technical owner:** виконавець проєкту
- **Date:** 2026-09-26
- **Related artifacts:** [`SPRINT-02-README.md`](SPRINT-02-README.md), [`sprint-2.png`](sprint-2.png), [`TASK_SPEC.md`](TASK_SPEC.md)

## Goal and authorization boundary

- **Goal:** export the current `SPRINT-02-README.md` as a readable PDF at `SPRINT-02-README.pdf`, preserving its text, headings, table, links as feasible, and embedded screenshot.
- **Authorization:** the user directly requested this file conversion on 2026-09-26. This task does not authorize changing the Markdown source, screenshot, other docs, application code, or historical records.

## Allowed paths and constraints

- **Output:** create `SPRINT-02-README.pdf` only if the path does not already exist; do not overwrite an existing file without review and separate approval.
- **Read-only inputs:** `SPRINT-02-README.md`, `sprint-2.png`, and locally installed PDF/rendering tools.
- **Excluded:** edits to `SPRINT-02-README.md`, `README.md`, `sprint-2.png`, `TASK_SPEC.md` beyond this task record, `EVIDENCE.md`, `RUNBOOK.md`, app/test/config/dependency files; network/package installation; secret/environment access; staging, commit, push, or deployment.

## Acceptance and verification

- The resulting file is a valid PDF, readable in page order, includes the Ukrainian text and embedded image, and stays within the repository root as `SPRINT-02-README.pdf`.
- Inspect the generated PDF visually and verify format/page count using locally available tools. Confirm source Markdown and screenshot are unchanged and `git diff --check` passes.
- No application tests or build are needed for this export.

## Stop and recovery

- Stop without writing if no local renderer can produce the requested PDF while preserving the image, if output would require a new dependency/network access, or if the output path already exists.
- If export/visual checks fail, remove only the newly generated task-owned PDF after inspecting it; preserve all prior repository changes. No source rollback, commit, push, or deployment is authorized.

# TASK-SEA-R2-B09B10-DIAG-007 — Static inspection of the installed environment-loader API

- **Version:** `1.0.0`
- **Status:** `Verified`
- **Product owner:** методист відділення теорії судноводіння навчального центру «Норд-Вест»
- **Delivery / technical owner:** виконавець проєкту
- **Date:** 2026-09-26
- **Related artifacts:** [`TASK_SPEC.md`](TASK_SPEC.md), [`EVIDENCE.md`](EVIDENCE.md), [`RUNBOOK.md`](RUNBOOK.md), [`docs/decisions/DEC-009-r2-current-task-status.md`](docs/decisions/DEC-009-r2-current-task-status.md), [`docs/checkpoints/CHECKPOINT-16.md`](docs/checkpoints/CHECKPOINT-16.md), `TASK-SEA-R2-B09B10-DIAG-001`–`DIAG-006`, `E-SEA-061`–`E-SEA-066`.

## Goal and authorization boundary

- **Goal:** use read-only inspection of the locally installed `@next/env` package and the installed Next.js documentation to identify the declared export shape, supported import/API form, and whether the prior loader failure can be explained statically.
- **Context:** DIAG-001 recorded a sanitized `loadEnvConfig()` failure; DIAG-005/006 found an importable default object with an own accessor descriptor named `loadEnvConfig`, without evaluating the accessor. The getter result and loader failure cause remain unknown.
- **Purpose boundary:** this is a source/documentation inspection only. It must not attempt to prove runtime behavior, load environment configuration, access credentials, or make a provider request. Any proposed runtime diagnosis or code change requires a new separately reviewed task.
- **Approval boundary:** the user reviewed the presented scope and instructed on 2026-09-26: “виконуй, доведи спрінт 2 докінця”. This is treated as approval to execute this exact DIAG-007 static inspection only. The broader request does not waive separate contract/approval gates for any subsequent runtime, provider, code-change, or Sprint acceptance work.

## Allowed paths and preservation boundary

- **Contract preparation:** append this section to `TASK_SPEC.md` only.
- **After explicit `continue DIAG-007`:** read-only inspection of installed `node_modules/@next/env/` package metadata, export/source/type files, and only the relevant installed guide(s) under `node_modules/next/dist/docs/`; append observed results to `EVIDENCE.md` and `RUNBOOK.md`; create `docs/checkpoints/CHECKPOINT-17.md`, preserving Sprint checkpoint 03 as `HOLD / not passed`.
- **Read-only records:** `E-SEA-061`–`E-SEA-066`, DIAG-001 through DIAG-006 contracts/outcomes, CHECKPOINT-11 through CHECKPOINT-16, and DEC-009 for the current authorization boundary.
- **Excluded:** invoking Node or any package code; importing `@next/env`; evaluating getters; calling `loadEnvConfig()` or the key accessor; inspecting `process.env`; opening or reading any `.env*` file; application/server startup; WebSocket, HTTP, DNS, provider or other network access; changing source, tests, dependencies, configuration, docs outside the task-owned append-only records, or generated files; sample/provenance access; staging, commit, push, deployment, reset, or cleanup. Preserve all pre-existing modified, staged, deleted, and untracked paths.

## Inspection protocol

1. After approval, confirm the branch/worktree boundary and record the pre-existing changed-path list without modifying it. Do not inspect environment-file contents or values.
2. Read only package metadata, static source and declaration files needed to identify the package's declared entry points, export mapping, `loadEnvConfig` definition/signature, and any relevant wrapper/getter implementation. Do not execute, import, evaluate, or stringify package objects/functions.
3. Read the relevant locally installed Next.js documentation guide(s) from `node_modules/next/dist/docs/` and record the exact guide path(s) used. Do not fetch documentation from the network.
4. Compare only what the static package files and installed guide actually establish with DIAG-001 and DIAG-005/006. Separate confirmed source facts from hypotheses. If this cannot explain the prior failure, record the cause as `Unknown`; do not infer it from the accessor descriptor.
5. Stop after one static inspection pass. Do not troubleshoot by trying alternate imports, invoking the getter/loader, changing files, or repeating diagnostics.

## Acceptance and verification

1. The product owner explicitly approves this exact contract with `continue DIAG-007` before any package or guide inspection.
2. The static review records the installed package version, declared entry/export shape, relevant function/signature/source facts, and exact guide path(s), without copying secrets or unrelated package contents.
3. Every conclusion distinguishes observed static facts from runtime behavior; the earlier loader exception remains `Unknown` unless the inspected source directly explains it without execution.
4. Only after the inspection, append a factual `E-*` record and RUNBOOK entry and create CHECKPOINT-17. All records state no package code was executed, no environment or credential was accessed, no network/provider call occurred, and checkpoint 03 remains `HOLD / not passed`.
5. `git diff --check` passes; no changed paths beyond this task's authorized append-only records occur, and every pre-existing path remains preserved.

## Stop conditions, checkpoint, and recovery

- Stop if the required installed package files or relevant documentation cannot be located/read locally, if inspection would require code execution or an environment-file read, if source facts are ambiguous, or if any scope/path boundary would be exceeded. Record only the blocker; do not guess or switch to a runtime experiment.
- **Exit decision:** `DONE` means only that this static inspection was completed and recorded safely. It does not fix the loader, establish key validity, authorize a provider request, produce a live PositionReport/sample, or pass Sprint checkpoint 03.
- If this Draft is rejected, revise or remove only this appended task section after review. After execution, preserve append-only records; correct errors only with a superseding factual entry. No code rollback, commit, push, or deployment is authorized.

# TASK-SEA-R2-B09B10-LIVE-007 — One bounded live PositionReport and provenance capture

- **Version:** `1.0.0`
- **Status:** `Verified`
- **Product owner:** методист відділення теорії судноводіння навчального центру «Норд-Вест»
- **Delivery / technical owner:** виконавець проєкту
- **Date:** 2026-09-26
- **Related artifacts:** [`SPRINT-02.md`](SPRINT-02.md), [`TASK_SPEC.md`](TASK_SPEC.md), [`EVIDENCE.md`](EVIDENCE.md), [`RUNBOOK.md`](RUNBOOK.md), [`docs/checkpoints/CHECKPOINT-03.md`](docs/checkpoints/CHECKPOINT-03.md), [`docs/checkpoints/CHECKPOINT-17.md`](docs/checkpoints/CHECKPOINT-17.md), [`docs/checkpoints/CHECKPOINT-18.md`](docs/checkpoints/CHECKPOINT-18.md), [`docs/decisions/DEC-009-r2-current-task-status.md`](docs/decisions/DEC-009-r2-current-task-status.md), `TASK-SEA-R2-B09B10-LIVE-001`–`LIVE-007`, `E-SEA-052`–`E-SEA-072`.

## Goal and authorization boundary

- **Goal:** attempt once to receive one eligible live AISStream `PositionReport` through the existing server-side reader and, only if validation succeeds, save the allowlisted sample fields with provenance sufficient to address the two unmet CHECKPOINT-03 criteria.
- **Predecessor state:** DIAG-007 confirmed the installed package's static CommonJS export shape and documented API, but did not execute the loader or resolve DIAG-001's runtime failure. Earlier live tasks are exhausted; this is a new, one-attempt task and does not resume them.
- **Credential boundary:** the approved `@next/env` loader will read the project's configured `.env*` files into process memory. The real `AISSTREAM_API_KEY` may therefore be loaded and used by the existing server reader, but its value must never be printed, logged, copied into the conversation, or persisted in evidence/sample/provenance. Do not directly open or display any `.env*` content.
- **Operator approval:** the user explicitly approved this exact runtime credential/provider operation by saying `continue LIVE-007` after the contract was prepared. Authorization is limited to this single loader invocation and single bounded reader attempt described here.
- **Pass boundary:** this task can address CHECKPOINT-03's live receipt and matching sample/provenance rows only. It cannot claim full Sprint 2 acceptance or release readiness.

## Allowed paths and preservation boundary

- **Contract preparation:** this appended section in `TASK_SPEC.md` only.
- **After explicit `continue LIVE-007`:** one bounded in-memory invocation; create `data/samples/live/position-report.sample.json` and `data/samples/live/PROVENANCE.md` only if an eligible report is actually received and validated and neither path already exists; append factual results to `EVIDENCE.md` and `RUNBOOK.md`; create `docs/checkpoints/CHECKPOINT-18.md` recording whether the CHECKPOINT-03 criteria remain HOLD or are supported by this attempt.
- **Read-only inputs:** existing AISStream reader/config accessor/transformer/collector, `SPRINT-02.md`, current synthetic sample schema/provenance, E-SEA-031–039 and E-SEA-052–071, CHECKPOINT-03, CHECKPOINT-17, and DEC-009.
- **Excluded:** changes to application/source/test/dependency/configuration files; any additional task or provider attempt; retries, batches, polling, alternate provider/endpoints, raw-payload logging, manually fabricated or documentation-derived live samples, direct `.env*` reads, secret output, deployment, staging, commit, push, reset, or cleanup. Preserve every pre-existing modified, staged, deleted, and untracked path.

## Bounded capture protocol

1. **Preflight:** only after explicit approval, confirm branch/worktree and changed-path boundary; verify `.env.local` remains ignored/untracked without opening it; verify both target sample paths and `CHECKPOINT-18.md` are absent. If any target exists, stop without overwrite.
2. **Load configuration once:** use the locally installed CommonJS package entry, consistent with the installed metadata/source, to obtain `loadEnvConfig`; call it exactly once for the repository root with a silent logger. Do not inspect or emit its return values, `process.env`, key contents, loaded file contents, paths, raw errors, or logger arguments. Convert any needed accessor result immediately to a boolean and discard the string. If import, loader, accessor, or harness preflight fails, stop before opening a reader or making a provider request.
3. **Single reader attempt:** if safe preflight succeeds and a configured key is present, call the existing server-side reader/transformer path once with the existing AISStream bounds and a hard 15-second total deadline including connection and subscription. Accept only one eligible PositionReport that passes the existing transformer/validation rules. No retry or second connection; stop immediately on fixed reader error, disconnect, invalid/unsuitable message, timeout, or harness anomaly.
4. **Data minimization:** never print or persist the raw provider envelope. For an eligible message, write only the contract-required `MetaData` and `Message.PositionReport` fields to the sample after validation. Provenance must record actual live source, observed UTC capture time, configured coverage area, the fact the message was server-received, and that the sample is sanitized; exclude credentials, local secret paths, raw error details, and unrelated environment values.
5. **Failure path:** if no eligible report is received, create no sample or provenance files; emit only fixed outcome categories; append actual evidence/runbook/checkpoint facts and leave CHECKPOINT-03 `HOLD / not passed`. Do not troubleshoot or retry under this task.
6. **Success path:** validate the saved allowlisted sample structure and provenance-to-sample correspondence without printing the payload. Append evidence/runbook facts and create CHECKPOINT-18. Do not rewrite CHECKPOINT-03's historical record; CHECKPOINT-18 may state that its two unmet criteria are now supported only if the message and matching provenance are both verified.

## Acceptance and verification

1. The operator explicitly approves this exact contract with `continue LIVE-007` before any `.env*` loader invocation or provider request.
2. The task executes at most one local loader call and at most one 15-second server-reader attempt; a failed preflight causes zero provider connections; there are no retries.
3. **To mark the CHECKPOINT-03 receipt/provenance criteria supported:** an actual server-received AISStream PositionReport passes the existing validator, the corresponding allowlisted sample is saved, and provenance records matching live source/time/area facts. A provider error, timeout, unsuitable message, mock, screenshot, user report, or synthetic fixture does not pass these criteria.
4. No credential value, raw provider payload/error, environment value, or `.env*` content appears in output or saved artifacts. If a credential-bearing output or unexpected path/change is detected, stop and preserve state; do not continue.
5. Evidence, RUNBOOK and CHECKPOINT-18 record only observations actually made. `git diff --check` passes. No application tests/build are run unless a separate task authorizes them.
6. `DONE` is allowed only if the one-shot was safely recorded; `CHECKPOINT-03` becomes supported only on the success path. Otherwise task outcome is `HOLD` and the checkpoint remains `HOLD / not passed`.

## Stop conditions and recovery

- Stop before loader invocation if this exact contract has not been explicitly approved, a target path exists, `.env.local` is tracked/not ignored, the existing reader/config boundary differs from the contract, or the invocation cannot guarantee fixed safe output.
- Stop before provider connection on any import/loader/accessor/preflight failure. Stop the only reader attempt immediately on any terminal result; no troubleshooting or retry is permitted.
- If an eligible sample is written but fails validation before evidence is appended, remove only the two newly created task-owned sample files after inspection; preserve all existing files and append-only history. If any result was recorded, correct facts only through a superseding record.
- This contract authorizes no runtime work until the exact `continue LIVE-007` approval. Any follow-on live UI/API verification or remaining Sprint acceptance requires another bounded contract and explicit approval.

## Observed execution result

- **Task outcome:** `HOLD` for the target acceptance; the one-shot attempt was completed and safely recorded. This does not pass the live receipt/sample criteria.
- **Observed:** one `@next/env` CommonJS loader call; one existing server-side AISStream reader attempt. The local subscription-send callback ran, then the first received WebSocket text message failed eligibility checks and produced fixed outcome `unsuitable_message` after approximately one second. The reader stopped immediately; no retry or second connection occurred.
- **Artifacts:** no live sample or provenance files were created. No secret, environment value, raw provider envelope or raw error was emitted or persisted.
- **Evidence / checkpoint:** `E-SEA-072` and [`CHECKPOINT-18.md`](docs/checkpoints/CHECKPOINT-18.md) record the result. CHECKPOINT-03 remains `HOLD / not passed`; both live receipt and matching sample/provenance criteria remain unmet.
- **Verification:** final `git diff --check` passed after all task-owned records were written. No tests/build, cleanup, staging, commit, push or deployment occurred.

# TASK-SEA-R2-B09B10-LIVE-008 — One fresh bounded capture with transformer-aligned eligibility

- **Version:** `1.0.0`
- **Status:** `Verified`
- **Product owner:** методист відділення теорії судноводіння навчального центру «Норд-Вест»
- **Delivery / technical owner:** виконавець проєкту
- **Date:** 2026-09-26
- **Related artifacts:** [`SPRINT-02.md`](SPRINT-02.md), [`TASK_SPEC.md`](TASK_SPEC.md), [`EVIDENCE.md`](EVIDENCE.md), [`RUNBOOK.md`](RUNBOOK.md), [`docs/checkpoints/CHECKPOINT-03.md`](docs/checkpoints/CHECKPOINT-03.md), [`docs/checkpoints/CHECKPOINT-18.md`](docs/checkpoints/CHECKPOINT-18.md), [`docs/checkpoints/CHECKPOINT-19.md`](docs/checkpoints/CHECKPOINT-19.md), [`docs/decisions/DEC-009-r2-current-task-status.md`](docs/decisions/DEC-009-r2-current-task-status.md), `TASK-SEA-R2-B09B10-LIVE-007`–`LIVE-008`, `E-SEA-072`–`E-SEA-073`.

## Goal and authorization boundary

- **Goal:** make one fresh bounded AISStream reader attempt and capture one eligible PositionReport plus minimized sample/provenance only if the existing `transformPositionReport` accepts it.
- **Rationale / limitation:** LIVE-007 ended with fixed `unsuitable_message`, but its harness applied additional eligibility checks to metadata coordinates and numeric `Sog`/`Cog`/`TrueHeading` beyond the transformer's required MMSI, timestamp and report coordinates. The raw message was not retained, so the cause of LIVE-007's result is unknown. LIVE-008 must not repeat those extra checks; this revision does not claim they caused the previous result.
- **Predecessor / attempt boundary:** LIVE-007 is complete and cannot be resumed. This is a separate fresh attempt, not a retry within LIVE-007. The product owner explicitly approved this exact contract by saying `continue LIVE-008`; this authorizes only the single attempt and paths stated here.
- **Credential boundary:** only the installed `@next/env` loader may load configured `.env*` files into process memory; key values must never be printed, logged, persisted or sent to chat. Do not directly open or display `.env*` contents.
- **Pass boundary:** this task can address only CHECKPOINT-03's live receipt and matching sample/provenance criteria. It cannot establish full Sprint 2 acceptance or release readiness.

## Allowed paths and preservation boundary

- **Contract preparation:** this appended section of `TASK_SPEC.md` only.
- **After explicit approval:** one in-memory invocation; create `data/samples/live/position-report.sample.json` and `data/samples/live/PROVENANCE.md` only if one report passes the existing transformer and both paths are absent; append factual results to `EVIDENCE.md` and `RUNBOOK.md`; create `docs/checkpoints/CHECKPOINT-19.md` with the observed outcome.
- **Read-only inputs:** existing reader, config accessor, transformer, sample/provenance schema, `SPRINT-02.md`, `E-SEA-031`–`E-SEA-039`, `E-SEA-052`–`E-SEA-072`, CHECKPOINT-03, CHECKPOINT-18 and DEC-009.
- **Excluded:** source/test/dependency/configuration changes; additional provider attempts; retry, polling, alternate endpoints/providers; raw-envelope logging/storage; secrets or direct `.env*` reads; synthetic/live provenance conflation; reset, cleanup, staging, commit, push or deployment. Preserve every pre-existing path.

## Bounded capture and sample protocol

1. **Preflight after approval only:** verify branch/worktree boundary; `.env.local` ignored and untracked without opening it; all three output targets absent. Stop if any preflight condition fails.
2. **Loader:** call the locally installed CommonJS `@next/env` loader exactly once for the repository root with a silent logger. Emit no loader values, key contents, environment values, paths, raw errors or logger arguments. Check key presence without outputting the value; if unavailable or loader/accessor/harness setup fails, stop before any connection.
3. **Reader:** make at most one call to the existing AISStream reader using its configured filter and bounding box, with a hard 15-second deadline including connection and subscription. Accept a message only when the existing `transformPositionReport` returns a vessel. Stop on the first reader error, disconnect, malformed/unsuitable message, timeout or harness anomaly. No retries or second connection.
4. **Allowlisted sample projection:** after transformer acceptance, persist only the B-10 schema fields: `MetaData` (`MMSI`, `ShipName`, `latitude`, `longitude`, `time_utc`) and `Message.PositionReport` (`Sog`, `Cog`, `TrueHeading`, `Latitude`, `Longitude`). Preserve finite numeric optional report values; represent absent/non-numeric optional `Sog`, `Cog` or `TrueHeading` as `null` (the product contract allows unavailable speed/course without rejecting the position). Preserve metadata coordinates only if finite and in geographic range; otherwise write `null` and disclose that normalization in provenance. Do not make metadata coordinates or optional report values additional transformer-eligibility criteria. Required MMSI, UTC timestamp and report coordinates remain governed by the existing transformer.
5. **Provenance:** record actual AISStream source, UTC local receipt time, configured coverage box, server-side receipt, sample path and sanitization; state that optional invalid/unavailable fields or metadata coordinates were stored as `null` if applicable. Never store credentials, raw envelope/error, secret paths or unrelated environment values.
6. **Failure path:** if no eligible report passes the transformer, create neither sample nor provenance; emit only a fixed outcome category, append factual EVIDENCE/RUNBOOK and create CHECKPOINT-19 with CHECKPOINT-03 still `HOLD / not passed`. Do not troubleshoot or retry.
7. **Success path:** verify saved allowlisted structure and provenance/sample correspondence without printing the sample. Append factual EVIDENCE/RUNBOOK and create CHECKPOINT-19. Do not rewrite CHECKPOINT-03 history.

## Acceptance and verification

1. **Approval observed:** the user explicitly approved this exact contract with `continue LIVE-008` before the loader invocation and provider connection.
2. At most one loader call and one reader attempt of 15 seconds; no second connection, retries, polling or alternate provider.
3. The live-receipt criterion is supported only if a real server-received PositionReport passes the existing transformer. Matching sample and provenance must also be saved and verified before the corresponding criterion is supported.
4. No secret, environment value, raw provider envelope/error or `.env*` content may appear in output or saved artifacts.
5. Evidence, RUNBOOK and CHECKPOINT-19 contain only observed facts; `git diff --check` passes. No tests/build are authorized.
6. Failure outcome is `HOLD`; overall checkpoint 03 remains `HOLD / not passed` unless this attempt satisfies both live criteria. Success does not establish overall Sprint 2 acceptance or release readiness.

## Stop conditions and recovery

- **Operator approval:** the user approved this exact task with `continue LIVE-008`; no authorization extends to another loader invocation, reader attempt or follow-on task. Stop before connection on any preflight, loader, accessor or harness failure.
- Stop the sole reader attempt at the first terminal event. Do not retain raw payload to diagnose a failure and do not repeat the attempt under this contract.
- If sample writing begins but verification fails, preserve state and inspect only the two newly created task-owned files; recovery may remove only those files, with no other cleanup. Append corrections to evidence/history rather than rewriting earlier entries.
- A further live UI/API check or other remaining Sprint acceptance requires its own contract and explicit approval.

## Observed execution result

- **Task outcome:** `HOLD` for the target acceptance; the single attempt was completed and safely recorded. This does not pass the live receipt/sample criteria.
- **Observed:** one `@next/env` CommonJS loader call and one existing server-side AISStream reader attempt. The reader returned fixed code `connect_failed` after approximately four seconds, before the local subscription-send callback (`subscribed: false`). No PositionReport was observed. No retry or second connection occurred.
- **Artifacts:** no live sample or provenance files were created. No secret, environment value, raw provider envelope or raw error was emitted or persisted.
- **Evidence / checkpoint:** `E-SEA-073` and [`CHECKPOINT-19.md`](docs/checkpoints/CHECKPOINT-19.md) record the result. CHECKPOINT-03 remains `HOLD / not passed`; both live criteria remain unmet.
- **Verification:** final `git diff --check` passed after all task-owned records were written. No tests/build, cleanup, staging, commit, push or deployment occurred.

# TASK-SEA-R2-B09B10-DIAG-008 — One instrumented connection-stage diagnostic

- **Version:** `1.0.0`
- **Status:** `Verified`
- **Product owner:** методист відділення теорії судноводіння навчального центру «Норд-Вест»
- **Delivery / technical owner:** виконавець проєкту
- **Date:** 2026-09-26
- **Related artifacts:** [`TASK_SPEC.md`](TASK_SPEC.md), [`SPRINT-02.md`](SPRINT-02.md), [`EVIDENCE.md`](EVIDENCE.md), [`RUNBOOK.md`](RUNBOOK.md), [`docs/checkpoints/CHECKPOINT-03.md`](docs/checkpoints/CHECKPOINT-03.md), [`docs/checkpoints/CHECKPOINT-19.md`](docs/checkpoints/CHECKPOINT-19.md), [`docs/checkpoints/CHECKPOINT-20.md`](docs/checkpoints/CHECKPOINT-20.md), [`docs/decisions/DEC-009-r2-current-task-status.md`](docs/decisions/DEC-009-r2-current-task-status.md), `TASK-SEA-R2-B09B10-LIVE-007`–`DIAG-008`, `E-SEA-072`–`E-SEA-074`.

## Goal and authorization boundary

- **Goal:** distinguish, in one new bounded diagnostic attempt, whether a future fixed reader failure occurs before WebSocket open, after open but before local subscription-send, or later; emit only a fixed safe stage category and close immediately.
- **Current evidence:** LIVE-008 returned fixed `connect_failed` before the reader's local subscription-send callback. The existing reader collapses pre-subscription socket error/close/start failure into that same code. No raw error or close detail was retained; the specific cause remains unknown.
- **Approval:** the user explicitly approved this exact contract by saying `continue DIAG-008`. Authorization was limited to one loader invocation and one instrumented reader attempt as defined here.
- **Credential boundary:** if approved, the existing `@next/env` loader may be called once with a silent logger and key presence checked without outputting the key. Do not open `.env*` directly or emit secrets, environment values, raw errors, close reasons or provider payloads.
- **Scope boundary:** this is one instrumented diagnostic attempt only, not a retry policy or Sprint acceptance. It may classify the connection stage but cannot guarantee the underlying cause; no unbounded “repeat until success” loop is permitted.

## Allowed paths and preservation boundary

- **Contract preparation:** this appended section in `TASK_SPEC.md` only.
- **After exact approval:** one in-memory diagnostic invocation; append factual result to `EVIDENCE.md` and `RUNBOOK.md`; create `docs/checkpoints/CHECKPOINT-20.md`. No sample/provenance files are created by this diagnostic.
- **Read-only inputs:** current reader, config accessor and transformer; LIVE-008 evidence/checkpoint; SPRINT-02 and DEC-009.
- **Excluded:** source/test/dependency/configuration edits; direct `.env*` reads; raw error/reason/payload output or persistence; retry, polling, multiple connections, alternate endpoint/provider; sample/provenance creation; cleanup, reset, staging, commit, push or deployment. Preserve all existing modified and untracked paths.

## Bounded diagnostic protocol

1. After explicit approval, verify branch/worktree boundary and confirm `.env.local` is ignored/untracked without opening it. Confirm `CHECKPOINT-20.md` is absent.
2. Use the installed CommonJS `@next/env` loader once with a silent logger. If loader, accessor, WebSocket availability or harness preflight fails, stop before connecting and record only a fixed category.
3. Make at most one existing-reader attempt, with a hard 15-second deadline including connection and subscription. Use an in-memory WebSocket wrapper only to track fixed lifecycle facts: `open_seen`, `error_before_open`, `close_before_open`, `error_after_open`, `close_after_open`, `subscription_send_callback`, `timeout_before_open`, or `timeout_after_open`. Do not capture raw event objects, error messages, close reasons, subscription contents or provider payloads for output or persistence.
4. Stop immediately on the first terminal state; no retry or second connection. A message may be passed to the existing transformer solely to record a boolean acceptance result, then discarded without sample/provenance creation.
5. Append only observed stage categories and timing/boolean facts to EVIDENCE/RUNBOOK; create CHECKPOINT-20. Keep CHECKPOINT-03 `HOLD / not passed` because this diagnostic alone does not produce matching live sample/provenance.

## Acceptance and verification

1. **Approval observed:** the user explicitly approved `continue DIAG-008` before the loader/accessor and network operation.
2. At most one loader call and one 15-second reader/connection attempt; no retries, polling or alternate endpoints.
3. Output/artifacts contain only fixed lifecycle categories, booleans, coarse elapsed duration and observed task metadata; no secret, raw error/reason or raw payload.
4. `EVIDENCE.md`, `RUNBOOK.md` and CHECKPOINT-20 report only observed facts. `git diff --check` passes. No tests/build or sample/provenance changes occur.
5. Outcome is `DONE` only for safely recorded diagnostic observations; underlying cause and Sprint checkpoint remain `Unknown`/`HOLD` unless evidence actually resolves the cause and separate acceptance evidence exists.

## Stop conditions and recovery

- **Operator approval:** the user approved this exact task with `continue DIAG-008`; this does not authorize another runtime, credential, WebSocket, provider or network action.
- Stop before connection on any preflight/import/loader/accessor/harness failure. Stop the only attempt at the first terminal event; no retries under this contract.
- If any raw secret, error detail, close reason or provider payload appears in output, stop and preserve state. Correct evidence only through a superseding factual record.
- Any follow-on provider retry or product change requires another separately reviewed bounded contract and explicit approval.

# TASK-SEA-R2-B09B10-LIVE-009 — One bounded stream window for first eligible report

- **Version:** `1.0.0`
- **Status:** `Verified`
- **Product owner:** методист відділення теорії судноводіння навчального центру «Норд-Вест»
- **Delivery / technical owner:** виконавець проєкту
- **Date:** 2026-09-26
- **Related artifacts:** [`SPRINT-02.md`](SPRINT-02.md), [`TASK_SPEC.md`](TASK_SPEC.md), [`EVIDENCE.md`](EVIDENCE.md), [`RUNBOOK.md`](RUNBOOK.md), [`docs/checkpoints/CHECKPOINT-03.md`](docs/checkpoints/CHECKPOINT-03.md), [`docs/checkpoints/CHECKPOINT-20.md`](docs/checkpoints/CHECKPOINT-20.md), [`docs/checkpoints/CHECKPOINT-21.md`](docs/checkpoints/CHECKPOINT-21.md), [`docs/decisions/DEC-009-r2-current-task-status.md`](docs/decisions/DEC-009-r2-current-task-status.md), `TASK-SEA-R2-B09B10-LIVE-007`–`LIVE-009`, `E-SEA-072`–`E-SEA-075`.

## Goal and authorization boundary

- **Goal:** make one bounded AISStream WebSocket connection and receive messages for up to the existing 15-second window, continuing past transformer-rejected messages in that same connection until the first transformer-accepted PositionReport or a terminal result; save one minimized sample/provenance only on acceptance.
- **Current evidence:** DIAG-008 observed WebSocket open and local subscription-send callback, then one text message that the existing transformer rejected. The raw message was discarded; its exact contents/rejection reason remain unknown. LIVE-008's earlier `connect_failed` cause also remains unknown.
- **Predecessor / attempt boundary:** LIVE-007, LIVE-008 and DIAG-008 are complete. This is a fresh single connection/window, not a retry within those tasks. The user explicitly approved this exact contract by saying `continue LIVE-009`; authorization is limited to the one connection/window and paths stated here.
- **Credential boundary:** if approved, use the installed `@next/env` loader exactly once with a silent logger; check key presence without outputting its value. Do not directly open `.env*` files or emit secrets, environment values, raw errors or payloads.
- **Pass boundary:** this task can address CHECKPOINT-03's live receipt and matching sample/provenance criteria only; it cannot establish full Sprint 2 acceptance or release readiness.

## Allowed paths and preservation boundary

- **Contract preparation:** this appended section in `TASK_SPEC.md` only.
- **After explicit approval:** one in-memory invocation; create `data/samples/live/position-report.sample.json` and `data/samples/live/PROVENANCE.md` only if a message passes the existing transformer and both files are absent; append factual outcome to `EVIDENCE.md` and `RUNBOOK.md`; create `docs/checkpoints/CHECKPOINT-21.md`.
- **Read-only inputs:** existing AISStream reader/config accessor/transformer/collector; current B-10 sample/provenance; `SPRINT-02.md`; `E-SEA-031`–`E-SEA-039`, `E-SEA-052`–`E-SEA-074`; CHECKPOINT-03, CHECKPOINT-20 and DEC-009.
- **Excluded:** source/test/dependency/configuration edits; more than one loader call, WebSocket connection or 15-second window; reconnect/retry, polling or alternate endpoints/providers; raw-envelope logging/storage; direct `.env*` reads; sample fabrication; reset, cleanup, staging, commit, push or deployment. Preserve all pre-existing modified and untracked paths.

## Bounded capture protocol

1. **Preflight after approval only:** verify branch/worktree boundary; `.env.local` ignored and untracked without opening it; both live sample targets and CHECKPOINT-21 absent. Stop without overwrite if any target exists.
2. **Loader:** call the installed CommonJS `@next/env` loader exactly once for the repository root with a silent logger. Emit no loader values, key contents, paths, raw errors, logger arguments or environment values. If loader/accessor/harness preflight fails or the key is absent, stop before connection.
3. **One stream window:** start one existing server-side reader connection with the configured PositionReport filter and bounding box. Use a hard 15-second total deadline including connection/subscription. In that same connection, pass each text message only to JSON parsing and the existing transformer; if the transformer returns null, discard that message and continue only within this window. Stop immediately on the first accepted report, fixed reader error, disconnect, timeout, or harness anomaly. Never open a second connection.
4. **Sample projection on first accepted report:** retain only the B-10 allowlisted fields: `MetaData` (`MMSI`, `ShipName`, `latitude`, `longitude`, `time_utc`) and `Message.PositionReport` (`Sog`, `Cog`, `TrueHeading`, `Latitude`, `Longitude`). For optional report numeric fields, preserve finite numbers and represent absent/non-numeric values as `null`; for metadata coordinates, preserve only finite in-range numbers and otherwise use `null`; use `null` for unavailable/non-string `ShipName`. Disclose any such normalization in provenance. These projection rules must not reject a message already accepted by the existing transformer.
5. **Data minimization:** raw text may exist transiently only while parsing/transforming the current event. Do not retain, log, output or persist raw envelopes. Keep at most the first accepted sanitized projection; immediately stop the reader once accepted.
6. **Provenance:** record AISStream source, observed UTC receipt time, provider message time, configured coverage area, server-side receipt, one-window boundary, matching sample path, and any null normalization; exclude credentials, secret paths, raw errors and unrelated environment values.
7. **Failure path:** if no message passes the transformer during the single window, or a terminal reader error occurs first, create no sample/provenance. Emit only fixed outcome categories and safe counters/booleans; append actual EVIDENCE/RUNBOOK facts and create CHECKPOINT-21 with CHECKPOINT-03 still `HOLD / not passed`. No retry or follow-on troubleshooting.
8. **Success path:** validate saved allowlisted sample shape and provenance correspondence without printing the sample; append factual EVIDENCE/RUNBOOK and create CHECKPOINT-21. Do not rewrite CHECKPOINT-03 history.

## Acceptance and verification

1. The user explicitly approves this exact contract with `continue LIVE-009` before any loader/accessor call or network activity.
2. At most one loader call, one WebSocket connection and one 15-second window; transformer-rejected messages may be skipped only within that same connection/window. No retries, reconnects, polling, batches or alternate providers.
3. Live receipt is supported only if an actual server-received message passes the existing transformer. The matching sanitized sample and provenance must also be saved and verified before marking the sample/provenance criterion supported.
4. No secret, environment value, raw provider message/error or `.env*` contents may appear in output or saved artifacts.
5. `EVIDENCE.md`, `RUNBOOK.md` and CHECKPOINT-21 contain only observed facts; `git diff --check` passes. No tests/build or source changes are authorized.
6. Failure outcome is `HOLD`; overall CHECKPOINT-03 remains `HOLD / not passed` unless both live criteria are supported. Success does not establish full Sprint 2 acceptance or release readiness.

## Stop conditions and recovery

- Before the exact `continue LIVE-009` approval, do not invoke the loader/accessor, construct a reader/WebSocket, or make network requests.
- Stop before connection on failed preflight, loader, accessor or harness setup. Stop the one connection/window at its first terminal outcome; no retry under this contract.
- If sample files are created but fail verification, preserve state and inspect only those newly created task-owned sample/provenance files; remove only those files if recovery is necessary. Correct evidence/history only through a superseding factual record.
- Any follow-on live attempt or product change requires a separately reviewed bounded contract and explicit approval; no “repeat until success” loop is authorized.

## Observed execution result

- **Task outcome:** `DONE`; one approved bounded LIVE-009 stream window completed, and both live receipt and matching sample/provenance criteria are supported for this attempt. This does not establish full Sprint 2 acceptance or release readiness.
- **Authorization / observed:** the user explicitly approved this exact contract with `continue LIVE-009`. One installed CommonJS `@next/env` loader call was made with a silent logger; key presence was checked without outputting its value. One existing-reader WebSocket connection/window ran for approximately 7 seconds (within the 15-second maximum). The local subscription-send callback ran (`subscribed: true`, not provider acknowledgement). Two text messages were observed in the same connection: first transformer-rejected and discarded, then a transformer-accepted PositionReport. The reader stopped on that first accepted report; no retry or second connection occurred.
- **Artifacts:** the accepted report was reduced to the allowlisted B-10 fields, with no null normalization required. `data/samples/live/position-report.sample.json` and `data/samples/live/PROVENANCE.md` were created and verified for structure/correspondence without printing the payload. No raw provider envelope was persisted. `E-SEA-075` and [`CHECKPOINT-21.md`](docs/checkpoints/CHECKPOINT-21.md) record this outcome.
- **Interpretation:** this bounded attempt supports CHECKPOINT-03's live receipt and sample/provenance criteria. The local send callback is not provider acknowledgement. The historical CHECKPOINT-03 record is not rewritten; it remains `HOLD / not passed` pending human review and a superseding checkpoint decision. This does not establish live UI/API behavior, overall Sprint 2 acceptance or release readiness.
- **Verification:** `git diff --check` passed after all task-owned records were written (no output); saved sample allowlist and provenance correspondence check passed without printing the payload. No tests/build, cleanup, staging, commit, push or deployment occurred.

# TASK-SEA-R2-CHECKPOINT-03-STATUS-001 — Supersede checkpoint status after LIVE-009 review

- **Version:** `1.0.0`
- **Status:** `Verified`
- **Product owner:** методист відділення теорії судноводіння навчального центру «Норд-Вест»
- **Delivery / technical owner:** виконавець проєкту
- **Date:** 2026-09-26
- **Related artifacts:** [`docs/checkpoints/CHECKPOINT-03.md`](docs/checkpoints/CHECKPOINT-03.md), [`docs/checkpoints/CHECKPOINT-21.md`](docs/checkpoints/CHECKPOINT-21.md), [`docs/checkpoints/CHECKPOINT-22.md`](docs/checkpoints/CHECKPOINT-22.md), [`EVIDENCE.md`](EVIDENCE.md), [`RUNBOOK.md`](RUNBOOK.md), `E-SEA-075`–`E-SEA-076`, `TASK-SEA-R2-B09B10-LIVE-009`.

## Goal and authorization

- **Goal:** review CHECKPOINT-03's existing criteria against CHECKPOINT-21 / E-SEA-075 and record the user's requested current status decision without claiming broader Sprint 2 acceptance.
- **Authorization:** the user explicitly instructed: `Затверди статус CHECKPOINT-03 за результатами CHECKPOINT-21`. This authorizes the bounded documentation/status update below.
- **Decision boundary:** mark the two live criteria supported by LIVE-009; retain the previously supported safe-configuration and local-demo boundaries; set current checkpoint outcome to `PASS / VERIFIED`. Preserve the original dated HOLD conclusion as historical, supersede CHECKPOINT-03 with a new current checkpoint, and make no claim of full Sprint 2 acceptance or release readiness.

## Allowed paths and preservation boundary

- `TASK_SPEC.md` (this task contract and outcome), `docs/checkpoints/CHECKPOINT-03.md` (supersession pointer/version/status only; preserve historical findings), new `docs/checkpoints/CHECKPOINT-22.md`, append-only `EVIDENCE.md`, and append-only `RUNBOOK.md`.
- Read-only basis: CHECKPOINT-03, CHECKPOINT-21, E-SEA-075, LIVE-009 task contract, DEC-004 and DEC-009.
- No source, test, dependency, configuration, product-scope or unrelated documentation edits; no new provider/network request, secrets/environment access, tests/build, reset, cleanup, staging, commit, push or deployment.

## Acceptance, verification and recovery

1. Map every CHECKPOINT-03 criterion to existing verified evidence; don't treat CHECKPOINT-21 as evidence for broader demo/API behavior.
2. Preserve the old HOLD facts as historical, with a clear supersession pointer to CHECKPOINT-22; record `PASS / VERIFIED` only for CHECKPOINT-03's defined criteria.
3. Record the user's decision and rationale in CHECKPOINT-22 and append-only EVIDENCE/RUNBOOK; update this task to `Verified` after final checks.
4. Validate links, metadata, factual/status boundaries and changed paths; run `git diff --check` plus whitespace/link checks for new untracked Markdown files. No tests/build.
5. If review finds a criterion unsupported, stop and preserve `HOLD`; correct only task-owned records and never fabricate evidence. No rollback of LIVE-009 sample/provenance.

## Observed execution result

- **Task outcome:** `DONE` — the user's explicit status approval has been recorded; CHECKPOINT-03's defined criteria are `PASS / VERIFIED` in the superseding CHECKPOINT-22. The original 2026-09-24 HOLD findings remain intact as historical; no full Sprint 2 acceptance or release readiness is claimed.
- **Decision records:** `E-SEA-076` and RUNBOOK record the user's authorization and basis. CHECKPOINT-03 artifact status is `Superseded`; CHECKPOINT-22 is the current scoped verified status record.
- **Verification:** relative links and formatting checks passed for CHECKPOINT-03/CHECKPOINT-22; `git diff --check` passed after task-owned updates (no output). No provider/network request, tests/build, secret/environment access, cleanup, staging, commit, push or deployment occurred.

# TASK-SEA-R2-B13-REVIEW-001 — Security, path, and final diff review

- **Version:** `1.0.0`
- **Status:** `Verified`
- **Product owner:** методист відділення теорії судноводіння навчального центру «Норд-Вест»
- **Delivery / technical owner:** виконавець проєкту
- **Date:** 2026-09-26
- **Related artifacts:** [`TASK_SPEC.md`](TASK_SPEC.md), [`SPRINT-02.md`](SPRINT-02.md), [`EVIDENCE.md`](EVIDENCE.md), [`RUNBOOK.md`](RUNBOOK.md), [`docs/checkpoints/CHECKPOINT-23.md`](docs/checkpoints/CHECKPOINT-23.md), [`docs/decisions/DEC-007-r2-b09-streaming-boundary.md`](docs/decisions/DEC-007-r2-b09-streaming-boundary.md), `TASK-SEA-R2-B13-001`, `E-SEA-051`, `E-SEA-077`, B-13 commit `17006c615f7a93e84c7c554c624b8909691828fb`, B-12 baseline `fef4a8fc51c9c0e41a8158e4e541af574f895741`.

## Goal and authorization gate

- **Goal:** perform the two still-open B-13 acceptance reviews: security/response-path review and final human diff review, isolating the B-13 implementation from later B-14 changes.
- **State when this review contract was drafted (2026-09-26):** B-13 implementation and its 16 mocked Playwright cases, TypeScript check, and build were recorded as passing; the security/path review and final human diff review were still unchecked. Those earlier checks were not treated as substitutes for this review.
- **Review target:** inspect the immutable B-13 change `fef4a8fc51c9c0e41a8158e4e541af574f895741..17006c615f7a93e84c7c554c624b8909691828fb`, limited to the four paths recorded in that commit: `app/globals.css`, `app/map-shell.tsx`, `app/sea-map.tsx`, and `tests/snapshot-interface.spec.ts`. The review does not use the current combined worktree diff as the B-13 change because later B-14 edits overlap these paths.
- **Authorization:** the user explicitly approved this exact contract with `continue B13-REVIEW-001`, authorizing the read-only review. After receiving the review report, the user separately chose `continue` on 2026-09-27, authorizing closure of the review gate and the documentation records specified below.

## Review scope and acceptance oracle

After exact approval, conduct a read-only review of the target commit and its four-path diff against the approved B-13 task contract and the recorded B-13 evidence. Check:

1. **Security/data flow:** the client uses only the same-origin snapshot endpoint; no key/secret or server-only configuration enters client code, request/response artifacts, logs, UI, or tests; unvalidated/raw server/provider error detail is not surfaced; fixed error copy and rejected/malformed-response behavior match the contract.
2. **State/behavior:** idle/loading/success/empty/error and retry-after-settlement behavior remain consistent with the task contract; no stale response/state, overlapping requests, preserved stale vessels on error, unintended motion, or selection/card regression is evident in the diff.
3. **Path/scope:** the B-13 commit changes exactly the four allowed implementation/test paths and does not change server/API/model/card/configuration/dependency or other excluded paths. Keep B-14 changes outside this review.
4. **Evidence boundary:** distinguish static findings and recorded mocked test/build results from live provider behavior and complete R2 acceptance. Do not rerun tests/build as part of this review contract.

## Allowed paths and preservation boundary

- **Contract preparation:** this appended section in `TASK_SPEC.md` was initially recorded as Draft; it was approved with `continue B13-REVIEW-001` before review.
- **Review execution:** read-only inspect the exact B-13 commit diff and referenced contract/evidence; report findings and recommendation. Do not edit implementation or the current worktree.
- **After separate disposition `continue`:** update the B-13 task's review checkboxes/status, append factual review results to `EVIDENCE.md` and `RUNBOOK.md`, and create `docs/checkpoints/CHECKPOINT-23.md` for a passing review. If findings require code changes, do not fix them under this contract; prepare a separate bounded remediation contract. `revise` or `HOLD` leaves B-13 open and does not create a passing checkpoint.
- **Preserve:** all current modified/untracked paths, especially later B-14 changes to overlapping files. Do not stage, reset, clean, overwrite or otherwise alter any implementation/test file.
- **Excluded:** all source/test changes, `.env*` files and contents, credentials, environment loading, provider/network requests, application execution, tests/build, dependency/config changes, PDF/README/Sprint-plan edits, B-14 review, commit, push and deployment.

## Stop conditions, recovery, and final disposition

- Stop and report `HOLD` if the exact commit/baseline is unavailable, changed-path scope is not exactly the four listed paths, B-14/current-worktree changes cannot be cleanly excluded, a prohibited value is encountered, or a claim cannot be checked without executing the application or accessing secrets/network.
- Record each review finding with file/line, concrete behavior and severity; distinguish confirmed issues from questions/limitations. Do not claim a clean review until each acceptance oracle above has been examined.
- After the review report, the user chooses `continue`, `revise`, or `HOLD`. Only a separate `continue` authorizes closing the B-13 review gate and appending records. `revise` requires a new bounded fix contract; `HOLD` preserves the current status.
- **Recovery:** before approval, this Draft could have been revised or removed. After review, preserve all findings and history; correct records only through a superseding factual entry. No rollback of B-13/B-14 implementation is authorized.

## Observed review and disposition

- **Review result (2026-09-27):** `PASS — no findings`. The reviewer examined only commit `17006c615f7a93e84c7c554c624b8909691828fb` against first parent `fef4a8fc51c9c0e41a8158e4e541af574f895741` and confirmed the exact four-path boundary. The review found no defect against this contract's security/data-flow, state/behavior, path/scope, or evidence-boundary criteria.
- **User disposition:** the user chose `continue` after the review report on 2026-09-27. This authorizes recording the passing review and closing this review gate; it does not authorize commit, push, deployment, provider access, or broader Sprint 2 acceptance.
- **Evidence / checkpoint:** `E-SEA-077` records the review; [`CHECKPOINT-23.md`](docs/checkpoints/CHECKPOINT-23.md) records the bounded outcome. The B-13 task is `Verified` for its scoped implementation and review criteria.
- **Limitations:** no tests, typecheck, build, current combined worktree diff, secrets, or network were accessed/run during this review. The result applies only to the immutable B-13 commit, not later B-14 changes, live provider behavior, full R2 acceptance, or release readiness.

# TASK-SEA-R2-B14-REVIEW-001 — Sparse snapshot implementation diff review

- **Version:** `1.0.0`
- **Status:** `Superseded`
- **Product owner:** методист відділення теорії судноводіння навчального центру «Норд-Вест»
- **Delivery / technical owner:** виконавець проєкту
- **Date:** 2026-09-27
- **Related artifacts:** [`TASK_SPEC.md`](TASK_SPEC.md), [`EVIDENCE.md`](EVIDENCE.md), [`RUNBOOK.md`](RUNBOOK.md), [`SPRINT-02.md`](SPRINT-02.md), [`SPEC.md`](SPEC.md), [`SPRINT-02-README.md`](SPRINT-02-README.md), [`docs/decisions/DEC-009-r2-current-task-status.md`](docs/decisions/DEC-009-r2-current-task-status.md), [`docs/decisions/DEC-010-r2-sparse-snapshot-demo-fallback.md`](docs/decisions/DEC-010-r2-sparse-snapshot-demo-fallback.md), `TASK-SEA-R2-B14-MIXED-VESSELS-001`, `E-SEA-070`, base `4b82a7aa1bdc2c70d3963a6bc02aef8517ad98d7`.

## Goal and approval gate

- **Goal:** perform the pending read-only final diff review of the already implemented B-14 sparse-snapshot behavior, using the approved task contract, DEC-010 and E-SEA-070 as the review oracle; keep this isolated from later B-13 closeout documentation and all other pre-existing worktree changes.
- **Current recorded state:** B-14 task contract and DEC-010 were explicitly approved; E-SEA-070 records the bounded implementation checks as passing. The implementation task remains `Active`; the RUNBOOK and Sprint retrospective say the full diff review and human checkpoint remain pending. Recorded automated checks are not substitutes for this review.
- **Review target:** the unstaged tracked diff at base commit `4b82a7aa1bdc2c70d3963a6bc02aef8517ad98d7` across exactly these seven paths: `SPEC.md`, `SPRINT-02.md`, `app/globals.css`, `app/map-shell.tsx`, `app/sea-map.tsx`, `docs/decisions/README.md`, and `tests/snapshot-interface.spec.ts`. The SHA-256 fingerprint of `git diff BASE -- <these paths>` at contract preparation is `cb3321cc810b13b847288bb83083b0caf081c9dee38c12814b7c2efe0d3edc87`. `tests/vessel-selection.spec.ts` has no diff against this base. The approved untracked DEC-010 record is read-only context, not part of this tracked-patch fingerprint.
- **Authorization:** this appended review contract is Draft. Do not inspect the target patch or begin the review until the user explicitly approves this exact contract with `continue B14-REVIEW-001`.

## Review scope and acceptance oracle

After exact approval, review only the frozen target above against `TASK-SEA-R2-B14-MIXED-VESSELS-001`, DEC-010, E-SEA-070, and the relevant installed task evidence. Confirm:

1. **Sparse fallback:** successful AIS snapshots of 0–2 AIS vessels display exactly the returned AIS vessels plus all three existing demo vessels; 3+ display only AIS vessels. Demo vessels do not alter the AIS count, status, timestamp, truncation state, or source identity.
2. **Zero/loading/error semantics:** a successful empty snapshot preserves its empty-result text while demo markers show; loading and error states remain marker-free; error does not activate the demo fallback.
3. **Visual and selection behavior:** source colors remain distinct for course and neutral markers; selection highlight is independently visible and applies only to the selected marker across both sources; card/selection behavior and stated marker-lifecycle constraints remain intact; supplemental demos remain stationary and initial demo motion remains unchanged.
4. **Baseline and path scope:** SPEC/SPRINT wording and DEC-010 index synchronization reflect only the approved behavior. The tracked changed-path set is exactly the seven paths named above; no server/API/model/schema/config/dependency or excluded path is included. Do not attribute unrelated worktree changes to B-14.
5. **Evidence boundary:** treat E-SEA-070 as prior mocked/local test, typecheck, build and bounded behavior evidence only. Do not infer provider behavior, user validation, complete Sprint 2 acceptance, or release readiness.

Do not run tests, typecheck, build, application code, provider/network operations, or access environment/secrets as part of this review.

## Allowed paths and preservation boundary

- **Contract preparation now:** append this Draft review contract to `TASK_SPEC.md` only.
- **After `continue B14-REVIEW-001`:** inspect the exact tracked diff and read-only evidence listed above; report findings and recommendation only. Do not modify implementation, tests, the current working tree, README/PDF, or append-only records during review.
- **Only after a separate user disposition `continue` on the review report:** update the B-14 task's review/status records in `TASK_SPEC.md`, append the factual review result to `EVIDENCE.md` and `RUNBOOK.md`, and create `docs/checkpoints/CHECKPOINT-24.md` if the review passes. If any fix is required, do not change code under this contract; prepare a separate bounded remediation contract. `revise` or `HOLD` leaves B-14 open and creates no passing checkpoint.
- Preserve every current modified, deleted and untracked path. Do not stage, reset, clean, overwrite, commit, push or deploy.
- Excluded: `.env*` files/content, credentials, environment loading, provider/network requests, application execution, tests/build, dependency/config changes, PDF/README edits, unrelated documents or code, B-13 review history, commit, push, and deployment.

## Stop conditions, verification, and recovery

- Stop and report `HOLD` if the base commit or fingerprint differs, the target changed-path set is not exact, staged/unstaged changes make the review boundary ambiguous, a prohibited value is encountered, or an acceptance claim would require executing the app or accessing network/secrets.
- Record review findings with file/line, concrete behavior and severity; distinguish defects from limitations. Do not claim a clean review until all five acceptance oracles are examined.
- After the review report, the user chooses `continue`, `revise`, or `HOLD`. Only a separate `continue` authorizes closeout records. `revise` requires a new bounded remediation contract; `HOLD` preserves the current task status.
- After disposition and any authorized closeout, run `git diff --check` for task-owned documentation and focused checks for checkpoint metadata, relative links, evidence IDs, review disposition and path boundaries. No tests/build.
- **Recovery:** before approval, revise or remove only this Draft. Thereafter preserve review findings and append-only history; correct factual errors through superseding records. No code rollback is authorized.
- **Disposition:** the review identified a medium governance contradiction in the original target; it was not a passing review. The corrected target has a different fingerprint, so this frozen review contract is superseded by `TASK-SEA-R2-B14-REVIEW-002`; no B-14 acceptance is implied.

# TASK-SEA-R2-B14-SPEC-STATUS-001 — Reconcile SPEC task-authorization status

- **Version:** `1.0.0`
- **Status:** `Active`
- **Product owner:** методист відділення теорії судноводіння навчального центру «Норд-Вест»
- **Delivery / technical owner:** виконавець проєкту
- **Date:** 2026-09-27
- **Related artifacts:** [`SPEC.md`](SPEC.md), [`TASK_SPEC.md`](TASK_SPEC.md), [`EVIDENCE.md`](EVIDENCE.md), [`RUNBOOK.md`](RUNBOOK.md), [`docs/decisions/DEC-009-r2-current-task-status.md`](docs/decisions/DEC-009-r2-current-task-status.md), [`docs/decisions/DEC-010-r2-sparse-snapshot-demo-fallback.md`](docs/decisions/DEC-010-r2-sparse-snapshot-demo-fallback.md), [`docs/decisions/README.md`](docs/decisions/README.md), `TASK-SEA-R2-B14-MIXED-VESSELS-001`, `TASK-SEA-R2-B14-REVIEW-001`, `E-SEA-070`.

## Goal and authorization gate

- **Goal:** correct the present-tense task-authorization claims in `SPEC.md` that conflict with the later, explicitly approved bounded B-14 task, while retaining DEC-009's rule that no other R2 technical work is authorized by inference.
- **Finding basis:** the B-14 review identified `SPEC.md:85` and `SPEC.md:107` as saying no R2 technical task is currently authorized; `SPEC.md:114`, DEC-010, and the approved B-14 task record the subsequent bounded B-14 authorization. The review did not find an implementation defect, but cannot pass while these present-tense claims conflict.
- **Authorization:** after the review finding and recommendation to revise, the user explicitly approved this exact contract with `continue B14-SPEC-STATUS-001` on 2026-09-27. This authorizes only the documentation-only, versioned reconciliation described below; it does not close B-14 review or authorize any other R2 work.

## Proposed bounded change and allowed paths

- **After exact approval:**
  - `SPEC.md`: bump version to `1.4.0`, update date and add the new decision link; correct only the authorization chronology/status language in Release slice, Assumptions and Unknowns, Open decisions, and Change-control gate.
  - New `docs/decisions/DEC-011-r2-task-authorization-reconciliation.md`: record that DEC-009 captured the then-current boundary, the later approved DEC-010/B-14 contract authorizes only that bounded B-14 slice, and no other R2 work is authorized or implied. Do not rewrite or supersede DEC-009/DEC-010 and do not authorize any new technical scope.
  - `docs/decisions/README.md`: add DEC-011 to the decision catalog and update its metadata version/date.
  - `TASK_SPEC.md`: record this task's authorized execution/outcome after approval.
  - Only after actual verification, append factual entries to `EVIDENCE.md` and `RUNBOOK.md`.
- **Contract preparation now:** this appended Draft section in `TASK_SPEC.md` only.
- **Explicitly excluded:** all application/source/test changes, `CLAUDE.md`, `SPRINT-02.md`, `SPRINT-02-README.md`, root `README.md`, PDFs, other checkpoints, DEC-009/DEC-010 contents, provider/network, environment/secrets, tests/build, and all unrelated or pre-existing modified/untracked paths.
- No edit under this contract may broaden the approved B-14 feature, declare B-14 complete, close its review, create CHECKPOINT-24, or claim Sprint 2 acceptance or release readiness. A fresh read-only B-14 review of the corrected target requires its own explicit bounded authorization.

## Acceptance and verification

1. The corrected wording preserves the chronology: DEC-009 was the approved boundary when adopted; DEC-010 plus the explicitly approved B-14 task later authorize only the scoped B-14 slice; no other R2 implementation/diagnostic work is authorized without its own contract and approval.
2. Keep DEC-009 and DEC-010 historical decision contents unchanged. DEC-011 must explicitly create no new product scope or technical authorization.
3. Remove the contradiction in the current SPEC statements at the cited areas; link SPEC 1.4.0 to DEC-011 and keep status, metadata, evidence IDs and task links consistent.
4. Check DEC-011 metadata and options/decision/consequences/revisit fields; verify its relative links and DEC-011 index entry. Check all changed paths against this contract and run `git diff --check` after task-owned records are complete.
5. Do not run application tests, typecheck, build, provider/network operations, or environment/secret access for this documentation-only task.
6. After checks, stop for human diff review and a separate `continue`, `revise`, or `HOLD` disposition. Do not treat approval of this contract as approval of a final diff or as closure of the B-14 review.

## Stop, preservation, and recovery

- Stop if the correction would change R2 product scope, alter DEC-009/DEC-010, require edits outside the allowed paths, or cannot resolve the contradiction without a new product decision.
- Preserve all pre-existing modified, staged, deleted and untracked paths; do not stage, reset, clean, overwrite, commit, push or deploy.
- Before approval, this Draft could be revised or removed. After execution, preserve append-only evidence and prior decision history; correct errors only through superseding factual records. No code rollback applies.

## Observed execution and final disposition

- **Authorization:** the user explicitly approved this exact task with `continue B14-SPEC-STATUS-001` on 2026-09-27.
- **Observed output:** SPEC version 1.4.0 now dates DEC-009's no-successor status to its approval, records the later DEC-010/B-14 bounded authorization only, and retains separate approval gates for other R2 technical work. Created DEC-011 and its decision-index entry. DEC-009 and DEC-010 remain unchanged; B-14 task status remains Active and its review remains open.
- **Verification:** whitespace, metadata, relative-link, chronology/boundary, decision-index and B-14 status checks passed. No app tests, typecheck, build, provider/network, secret/environment access, commit, push or deployment occurred.
- **User disposition:** the user selected `continue` on 2026-09-27 after review of the corrected documentation diff. This accepts only the bounded SPEC/decision chronology correction; it does not pass the B-14 implementation review or accept Sprint 2.
- **Evidence / operational record:** `E-SEA-079` and the 2026-09-27 RUNBOOK entry record the final disposition and verification.
- **Status:** `Verified` for this bounded documentation correction only. The original B-14 review target is superseded because its fingerprint is stale; a fresh review is specified separately below.

# TASK-SEA-R2-B14-REVIEW-002 — Re-review corrected B-14 sparse snapshot diff

- **Version:** `1.0.0`
- **Status:** `Superseded`
- **Product owner:** методист відділення теорії судноводіння навчального центру «Норд-Вест»
- **Delivery / technical owner:** виконавець проєкту
- **Date:** 2026-09-27
- **Related artifacts:** [`TASK_SPEC.md`](TASK_SPEC.md), [`EVIDENCE.md`](EVIDENCE.md), [`RUNBOOK.md`](RUNBOOK.md), [`SPRINT-02.md`](SPRINT-02.md), [`SPEC.md`](SPEC.md), [`docs/decisions/DEC-009-r2-current-task-status.md`](docs/decisions/DEC-009-r2-current-task-status.md), [`docs/decisions/DEC-010-r2-sparse-snapshot-demo-fallback.md`](docs/decisions/DEC-010-r2-sparse-snapshot-demo-fallback.md), [`docs/decisions/DEC-011-r2-task-authorization-reconciliation.md`](docs/decisions/DEC-011-r2-task-authorization-reconciliation.md), `TASK-SEA-R2-B14-MIXED-VESSELS-001`, `TASK-SEA-R2-B14-SPEC-STATUS-001`, `E-SEA-070`, `E-SEA-078`, `E-SEA-079`, base `4b82a7aa1bdc2c70d3963a6bc02aef8517ad98d7`.

## Goal and approval gate

- **Goal:** perform a new read-only review of the exact corrected B-14 tracked diff, including the formerly finding-bearing SPEC authorization chronology; assess it against the approved B-14 implementation contract, DEC-010, DEC-011, and bounded evidence.
- **Prior review / remediation:** `TASK-SEA-R2-B14-REVIEW-001` identified a medium contradiction in the SPEC wording and did not pass. `TASK-SEA-R2-B14-SPEC-STATUS-001` corrected that wording, and the user accepted that documentation diff with `continue` on 2026-09-27. This does not resolve or pass the B-14 implementation review by itself.
- **Frozen target:** unstaged tracked diff against base commit `4b82a7aa1bdc2c70d3963a6bc02aef8517ad98d7` across exactly `SPEC.md`, `SPRINT-02.md`, `app/globals.css`, `app/map-shell.tsx`, `app/sea-map.tsx`, `docs/decisions/README.md`, and `tests/snapshot-interface.spec.ts`. SHA-256 fingerprint of `git diff BASE -- <these seven paths>` at contract preparation: `0c3e8153f453d10d73564f247bf6ef88b51d947b30a6ddbd2b3a6a22cf1b7b86`. The staged diff across these paths was empty at preparation. Untracked DEC-010/DEC-011 records and all other pre-existing worktree changes are not part of this fingerprint.
- **Supersession:** the user approved `TASK-SEA-R2-B14-REMEDIATION-001` after this contract was drafted, changing its frozen target. This contract's fingerprint is stale; no review was performed under this contract. It is superseded by Draft `TASK-SEA-R2-B14-REVIEW-003`.
- **Authorization:** this review contract is Superseded. Do not use it to inspect the target patch or claim a review; the replacement requires the user's explicit approval with `continue B14-REVIEW-003`.

## Review scope and acceptance oracle

After exact approval, review only the frozen target and read-only relevant contracts/evidence. Confirm:

1. **Sparse fallback:** successful AIS snapshots of 0–2 AIS vessels display exactly returned AIS vessels plus all three existing demo vessels; 3+ display only AIS vessels. Demo vessels do not alter AIS count, status, timestamp, truncation state, or source identity.
2. **Empty/loading/error semantics:** a successful empty snapshot preserves its empty-result text while demo markers show; loading and error states remain marker-free; errors do not activate fallback.
3. **Visual/selection behavior:** source colors remain distinct; selection highlight is independently visible and applies only to the selected marker; card/selection behavior and marker lifecycle stay within B-14 scope; supplemental demos remain stationary and initial demo motion remains unchanged.
4. **Authorization chronology and scope:** corrected SPEC text consistently distinguishes DEC-009's dated state from the later DEC-010/B-14 authorization, DEC-011 adds no scope, and the remainder of the target contains only the approved B-14 slice. The tracked changed-path set must remain exactly the seven paths above.
5. **Evidence boundary:** treat E-SEA-070 as prior bounded local/mock verification only. Do not infer provider behavior, user validation, Sprint 2 acceptance, or release readiness.

Do not run tests, typecheck, build, application code, provider/network operations, or access environment/secrets.

## Allowed paths and preservation boundary

- **Contract preparation now:** this Draft section in `TASK_SPEC.md` only, plus the bounded closeout records for `TASK-SEA-R2-B14-SPEC-STATUS-001` authorized by the user's `continue` disposition.
- **After exact `continue B14-REVIEW-002`:** read and inspect only the frozen patch and relevant task/decision/evidence records; report findings and recommendation. Do not alter implementation, tests, README/PDF, or append-only records during review.
- **Only after a separate user disposition `continue` on the review report:** update B-14 task/review status in `TASK_SPEC.md`, append factual review results to `EVIDENCE.md` and `RUNBOOK.md`, and create `docs/checkpoints/CHECKPOINT-24.md` only if all criteria pass. Findings requiring fixes need a separate bounded remediation contract; `revise` or `HOLD` leaves B-14 open.
- Preserve all existing modified, deleted and untracked paths. Do not stage, reset, clean, overwrite, commit, push or deploy.
- Excluded: `.env*`, credentials, provider/network, application execution, tests/build, dependency/config changes, unrelated worktree paths, and all commit/push/deployment activity.

## Stop conditions, verification, and recovery

- Stop with `HOLD` if the base, fingerprint, exact path set, or staged/unstaged boundary differs; if a prohibited value is encountered; or if an acceptance claim requires runtime, network, or secret access.
- Report findings with file/line, concrete behavior and severity. Do not report a clean review until all five oracles have been examined.
- After the review report, wait for a separate user disposition. Run focused documentation/path checks only after any authorized closeout; no tests/build.
- Preserve prior review findings and append-only history. No code rollback or implementation change is authorized by this contract.

# TASK-SEA-R2-B14-REMEDIATION-001 — Resolve sparse marker reconciliation and authorization-index findings

- **Version:** `1.0.0`
- **Status:** `Verified`
- **Product owner:** методист відділення теорії судноводіння навчального центру «Норд-Вест»
- **Delivery / technical owner:** виконавець проєкту
- **Date:** 2026-09-27
- **Related artifacts:** [`TASK_SPEC.md`](TASK_SPEC.md), [`EVIDENCE.md`](EVIDENCE.md), [`RUNBOOK.md`](RUNBOOK.md), [`SPEC.md`](SPEC.md), [`SPRINT-02.md`](SPRINT-02.md), [`docs/decisions/README.md`](docs/decisions/README.md), [`docs/decisions/DEC-009-r2-current-task-status.md`](docs/decisions/DEC-009-r2-current-task-status.md), [`docs/decisions/DEC-010-r2-sparse-snapshot-demo-fallback.md`](docs/decisions/DEC-010-r2-sparse-snapshot-demo-fallback.md), [`docs/decisions/DEC-011-r2-task-authorization-reconciliation.md`](docs/decisions/DEC-011-r2-task-authorization-reconciliation.md), `TASK-SEA-R2-B14-MIXED-VESSELS-001`, `TASK-SEA-R2-B14-REVIEW-002`, `E-SEA-070`, `E-SEA-079`, base `4b82a7aa1bdc2c70d3963a6bc02aef8517ad98d7`.

## Goal and approval gate

- **Goal:** resolve the two findings reported by the read-only B-14 review: preserve marker DOM identity when selection changes in a sparse snapshot, and make the DEC-009 entry in the current decision index historically precise alongside the later bounded B-14 authorization.
- **Disposition / authorization:** after the review report, the user requested a bounded B-14 remediation contract and then explicitly approved this exact contract with `continue B14-REMEDIATION-001` on 2026-09-27. Authorization is limited to the two listed fixes and checks; it does not pass B-14 review.
- **Frozen pre-change input:** base commit `4b82a7aa1bdc2c70d3963a6bc02aef8517ad98d7`; current diff across exactly `app/map-shell.tsx`, `docs/decisions/README.md`, and `tests/snapshot-interface.spec.ts`; fingerprint `c316d28f4b1a171db092bdb9bcb1a0eee83456b8c681151bc5a38d4cb5deb899`. The staged diff across these paths was empty at contract preparation. This fingerprint protects the existing B-14 changes from accidental attribution or overwrite; it is not a fingerprint of the post-remediation result.
- **Authorization:** the user explicitly approved this exact contract with `continue B14-REMEDIATION-001` on 2026-09-27. This authorizes only the two listed remediation changes and prescribed checks; it does not pass B-14 review or authorize broader R2 work.

## Findings and bounded change

1. **Stable marker identity on selection:** in sparse success/empty state, keep the derived marker-array reference stable while the snapshot is unchanged, so a selection-only rerender does not cause the map reconciliation effect to remove and recreate all markers. Preserve the B-14 threshold, AIS-only count/label, fallback markers, loading/error behavior, source colors, selection ring, and card behavior. Add a deterministic regression assertion to the existing snapshot interface test: retain the AIS and demo marker elements across selection transfer, assert they remain connected, and assert selected metadata moves to exactly one marker.
2. **Historical DEC-009 index wording:** change only the DEC-009 row in `docs/decisions/README.md` to identify its no-successor authorization statement as the state when DEC-009 was approved (2026-09-25), and point readers to DEC-011 for the later bounded B-14 authorization. Do not modify DEC-009/DEC-010/DEC-011 contents, their status, or any broader R2 authorization.

## Allowed paths and preservation boundary

- **Contract preparation now:** append this Draft section in `TASK_SPEC.md` only.
- **After exact approval:** `app/map-shell.tsx`, `tests/snapshot-interface.spec.ts`, and `docs/decisions/README.md` for only the two changes listed above; `TASK_SPEC.md` for execution/outcome record; append-only `EVIDENCE.md` and `RUNBOOK.md` only after actual verification.
- **Before source edits:** read the relevant installed Next.js guide under `node_modules/next/dist/docs/` as required by project instructions. Do not use or inspect other implementation paths; if a change appears necessary outside the allowed paths, stop and request a new contract.
- **Excluded:** all other app/source/test files, `SPEC.md`, `SPRINT-02.md`, README/PDF files, decision record contents, checkpoints, provider/network operations, `.env*` files, credentials/secrets/environment values, dependency/config changes, staging/reset/clean/removal, commit, push and deployment. Preserve every existing modified, staged, deleted and untracked path.
- This remediation cannot declare the B-14 implementation task complete, pass the review, create CHECKPOINT-24, or accept Sprint 2. A fresh read-only review of the post-remediation target requires a separate bounded contract and explicit approval.

## Acceptance and verification

1. For a successful snapshot with fewer than three AIS vessels, changing selection between AIS and demo markers leaves the same marker DOM elements connected; selected metadata/ring moves to exactly the selected marker, and no marker array is needlessly reconciled solely due to selection state.
2. The regression test fails against the current behavior and passes after the bounded correction. Existing 0/1/2/3/4 threshold, empty, loading/error, color, selection/card and motion checks remain passing.
3. The DEC-009 index row explicitly dates its statement to the authorization state recorded on 2026-09-25 and no longer conflicts with the DEC-011 row describing the later, B-14-only authorization.
4. Changed paths remain within the allowed set; pre-change B-14 work and unrelated modified/untracked paths are preserved; DEC-009/DEC-010/DEC-011 contents are unchanged.
5. Read the relevant installed Next.js guide before source changes. After implementation, run `npx playwright test tests/snapshot-interface.spec.ts tests/vessel-selection.spec.ts`, `npx tsc --noEmit`, `npm run build`, and `git diff --check`. Do not make provider/network requests or inspect secrets/environment contents. Record actual results and limitations only.
6. After checks, stop for human diff review and a separate `continue`, `revise`, or `HOLD` disposition. Even `continue` on this remediation does not pass B-14 review; a new read-only review contract remains required.

## Stop conditions, checkpoint, and recovery

- Stop with `HOLD` if the pre-change base, exact path set, fingerprint, or staged/unstaged boundary differs; if the requested fix requires a new path or changes B-14 product behavior; if a test/build would access a provider or require environment/secret inspection; or if the marker-identity assertion cannot be made deterministic without out-of-scope instrumentation.
- **Checkpoint:** after contract approval and preflight but before edits; after focused regression tests; after all authorized checks and diff review. No checkpoint artifact is created by this task.
- **Recovery:** inspect each task-owned diff and restore only this task's changes if rejected, without resetting or cleaning the workspace or touching existing B-14/unrelated changes. Preserve append-only evidence/history; no commit, push or deployment.

## Observed execution and disposition

- **Authorization:** the user explicitly approved this contract with `continue B14-REMEDIATION-001` on 2026-09-27. Preflight matched the frozen base/path/fingerprint; staged diff was empty.
- **Observed changes:** memoized sparse-snapshot `mapVessels` by snapshot identity; added a regression assertion retaining AIS/demo marker element handles through selection transfer; updated only the DEC-009 index row to date its state to 2026-09-25 and refer to DEC-011 for the later B-14 scope.
- **Verification:** the authorized Playwright command passed 17/17 tests; `npx tsc --noEmit` passed; `npm run build` passed (Next.js 16.3.5/Turbopack); final `git diff --check` and focused path/behavior/index/evidence assertions passed. No provider/network request or direct environment/secret inspection occurred.
- **Limitations:** the new regression test was not executed against the pre-remediation code, so its expected pre-fix failure was not directly observed. The build reported `.env.local` as an environment source; its contents were not inspected. No commit, push, deployment or checkpoint creation occurred.
- **Human diff disposition:** the user supplied `continue` on 2026-09-27 for this remediation diff. This accepts only the bounded remediation diff; it does not pass B-14 review or accept Sprint 2.
- **Closeout:** `TASK-SEA-R2-B14-REMEDIATION-001` is `Verified` for its bounded fixes and prescribed checks. `TASK-SEA-R2-B14-REVIEW-002` is `Superseded` because its frozen fingerprint predates the remediation; no review was performed under it. Draft replacement `TASK-SEA-R2-B14-REVIEW-003` freezes the post-remediation target and awaits exact user approval.
- **Current status:** remediation closed as `Verified`; B-14 review remains open. This task does not pass B-14 review, create CHECKPOINT-24, or establish Sprint 2 acceptance. A fresh approved read-only review is required.

# TASK-SEA-R2-B14-REVIEW-003 — Review post-remediation B-14 sparse snapshot diff

- **Version:** `1.0.0`
- **Status:** `Verified`
- **Product owner:** методист відділення теорії судноводіння навчального центру «Норд-Вест»
- **Delivery / technical owner:** виконавець проєкту
- **Date:** 2026-09-27
- **Related artifacts:** [`TASK_SPEC.md`](TASK_SPEC.md), [`EVIDENCE.md`](EVIDENCE.md), [`RUNBOOK.md`](RUNBOOK.md), [`SPRINT-02.md`](SPRINT-02.md), [`SPEC.md`](SPEC.md), [`docs/decisions/DEC-009-r2-current-task-status.md`](docs/decisions/DEC-009-r2-current-task-status.md), [`docs/decisions/DEC-010-r2-sparse-snapshot-demo-fallback.md`](docs/decisions/DEC-010-r2-sparse-snapshot-demo-fallback.md), [`docs/decisions/DEC-011-r2-task-authorization-reconciliation.md`](docs/decisions/DEC-011-r2-task-authorization-reconciliation.md), `TASK-SEA-R2-B14-MIXED-VESSELS-001`, `TASK-SEA-R2-B14-REMEDIATION-001`, `E-SEA-070`, `E-SEA-080`, base `4b82a7aa1bdc2c70d3963a6bc02aef8517ad98d7`.

## Goal and approval gate

- **Goal:** conduct a fresh read-only review of the exact post-remediation B-14 tracked diff against the approved B-14 implementation contract, DEC-010, DEC-011, and bounded evidence; determine whether the former findings are resolved and whether the complete B-14 slice meets its review oracle.
- **Review history:** `TASK-SEA-R2-B14-REVIEW-002` is superseded because remediation changed its frozen target. Its findings were addressed within `TASK-SEA-R2-B14-REMEDIATION-001`, but no post-remediation review has occurred. The user's `continue` disposition accepted only the remediation diff.
- **Frozen target:** unstaged tracked diff against base commit `4b82a7aa1bdc2c70d3963a6bc02aef8517ad98d7` across exactly `SPEC.md`, `SPRINT-02.md`, `app/globals.css`, `app/map-shell.tsx`, `app/sea-map.tsx`, `docs/decisions/README.md`, and `tests/snapshot-interface.spec.ts`. SHA-256 fingerprint of `git diff BASE -- <these seven paths>` at contract preparation: `3c413600f35500e9acb83e514891c76283a3fab9271ad5fe0605b95292b75e2d`. The staged diff across these paths was empty at preparation. Untracked DEC-010/DEC-011 records and all other pre-existing worktree changes are not part of this fingerprint.
- **Authorization:** this replacement review contract is Draft. Do not inspect the target patch or begin review until the user explicitly approves this exact contract with `continue B14-REVIEW-003`.

## Review scope and acceptance oracle

After exact approval, inspect only the frozen target and read-only relevant contracts/evidence. Confirm:

1. **Sparse fallback:** successful AIS snapshots of 0–2 AIS vessels display exactly returned AIS vessels plus all three existing demo vessels; 3+ display only AIS vessels. Demo vessels do not alter AIS count, status, timestamp, truncation state, or source identity.
2. **Empty/loading/error semantics:** successful empty snapshots preserve their empty-result text while demo markers show; loading and error states remain marker-free; errors do not activate fallback.
3. **Visual/selection behavior:** source colors remain distinct; selection highlight is independently visible and applies only to the selected marker; card/selection behavior and marker lifecycle stay within B-14 scope; supplemental demos remain stationary and initial demo motion remains unchanged.
4. **Remediation findings:** derived marker-array identity remains stable for a selection-only rerender with the same snapshot, and the regression assertion exercises AIS↔demo selection while verifying the same marker DOM elements remain connected and selected metadata transfers to exactly one marker.
5. **Authorization chronology and scope:** SPEC and decision index consistently distinguish DEC-009's dated 2026-09-25 state from the later DEC-010/B-14 authorization; DEC-011 adds no scope; the complete target contains only the approved B-14 slice. The tracked changed-path set must remain exactly the seven paths above.
6. **Evidence boundary:** treat E-SEA-070/E-SEA-080 as local/mock verification only. Do not infer provider behavior, user validation, Sprint 2 acceptance, or release readiness.

Do not run tests, typecheck, build, application code, provider/network operations, or access environment/secrets.

## Allowed paths and preservation boundary

- **Contract preparation and authorized closeout:** this Draft section and remediation/review status lines in `TASK_SPEC.md`; append-only `EVIDENCE.md` and `RUNBOOK.md` for the actual remediation disposition and contract preparation.
- **After exact `continue B14-REVIEW-003`:** read and inspect only the frozen patch and relevant task/decision/evidence records; report findings and recommendation. Do not alter implementation, tests, README/PDF, or append-only records during review.
- **Only after a separate user disposition `continue` on the review report:** update B-14 task/review status in `TASK_SPEC.md`, append factual review results to `EVIDENCE.md` and `RUNBOOK.md`, and create `docs/checkpoints/CHECKPOINT-24.md` only if all criteria pass. Findings requiring fixes need a separate bounded remediation contract; `revise` or `HOLD` leaves B-14 open.
- Preserve all existing modified, deleted and untracked paths. Do not stage, reset, clean, overwrite, commit, push or deploy.
- **Excluded:** `.env*`, credentials, provider/network, application execution, tests/build, unrelated worktree paths, and all commit/push/deployment activity.

## Stop conditions, verification, and recovery

- Stop with `HOLD` if the base, fingerprint, exact path set, or staged/unstaged boundary differs; if a prohibited value is encountered; or if an acceptance claim requires runtime, network, or secret access.
- Report findings with file/line, concrete behavior and severity. Do not report a clean review until all six oracles have been examined.
- After the review report, wait for a separate user disposition. Run focused documentation/path checks only after any authorized closeout; no tests/build.
- Preserve prior review findings and append-only history. No code rollback or implementation change is authorized by this review contract.

## Observed review and disposition

- **Authorization:** the user explicitly approved this exact review contract with `continue B14-REVIEW-003` on 2026-09-27. Preflight matched the frozen base, exact seven-path unstaged target and fingerprint `3c413600f35500e9acb83e514891c76283a3fab9271ad5fe0605b95292b75e2d`; staged target was empty.
- **Review result:** one medium governance inconsistency was confirmed at `SPEC.md:69`: the scope section says no R2 technical task is currently authorized under DEC-009, while `SPEC.md:85`, `SPEC.md:107`, DEC-011 and the approved B-14 task record the later bounded B-14 authorization. This prevents a consistent reading of current R2 authorization.
- **Recommendation:** `FAIL` for the authorization-chronology oracle; no other confirmed finding in the reviewed target. This review task is `Verified` for completion of its bounded review, not as a B-14 pass. The B-14 implementation task remains `Active`; no CHECKPOINT-24 is created.
- **User disposition:** the user selected `продовжуй` on 2026-09-27. This authorizes closeout records and preparation of a separate bounded correction contract only; it is not approval to edit SPEC or acceptance of B-14/Sprint 2.
- **Evidence / handoff:** `E-SEA-083` and the 2026-09-27 RUNBOOK entry record the factual review result. Draft `TASK-SEA-R2-B14-SPEC-STATUS-002` freezes the correction input and awaits exact approval `continue B14-SPEC-STATUS-002`.

# TASK-SEA-R2-B14-SPEC-STATUS-002 — Correct stale R2 authorization wording in SPEC scope

- **Version:** `1.0.0`
- **Status:** `Verified`
- **Product owner:** методист відділення теорії судноводіння навчального центру «Норд-Вест»
- **Delivery / technical owner:** виконавець проєкту
- **Date:** 2026-09-27
- **Related artifacts:** [`SPEC.md`](SPEC.md), [`TASK_SPEC.md`](TASK_SPEC.md), [`EVIDENCE.md`](EVIDENCE.md), [`RUNBOOK.md`](RUNBOOK.md), [`docs/decisions/DEC-009-r2-current-task-status.md`](docs/decisions/DEC-009-r2-current-task-status.md), [`docs/decisions/DEC-010-r2-sparse-snapshot-demo-fallback.md`](docs/decisions/DEC-010-r2-sparse-snapshot-demo-fallback.md), [`docs/decisions/DEC-011-r2-task-authorization-reconciliation.md`](docs/decisions/DEC-011-r2-task-authorization-reconciliation.md), `TASK-SEA-R2-B14-REVIEW-003`, `E-SEA-083`, base `4b82a7aa1bdc2c70d3963a6bc02aef8517ad98d7`.

## Goal and approval gate

- **Goal:** make the single stale present-tense authorization statement in the SPEC scope summary consistent with DEC-009's historical date and the later, narrowly bounded B-14 authorization.
- **Finding:** `TASK-SEA-R2-B14-REVIEW-003` confirmed that `SPEC.md:69` says no R2 technical task is currently authorized, contradicting the later B-14 authorization recorded elsewhere in the same SPEC and DEC-011.
- **Frozen pre-change input:** unstaged tracked diff for `SPEC.md` against base `4b82a7aa1bdc2c70d3963a6bc02aef8517ad98d7`; SHA-256 fingerprint `3c60f5d201762b02ddb89edd9c8f948c71a72fabf218eb6ec7abd60ba9d9cf2d`. Staged diff for `SPEC.md` was empty at contract preparation. This freezes the existing approved SPEC/B-14 work and is not a fingerprint of the correction result.
- **Authorization:** the user explicitly approved this exact contract with `continue B14-SPEC-STATUS-002` on 2026-09-27. Approval is limited to the single SPEC wording correction, required version/date metadata update, and prescribed textual checks; no broader scope is authorized.

## Bounded change and acceptance

After exact approval:

1. Update only the stale scope-status wording in `SPEC.md` line 69 so that it states DEC-009 recorded the then-current boundary as of its 2026-09-25 approval, and that later DEC-010 plus the approved B-14 task authorize only the sparse-snapshot UI slice. State that all other R2 technical tasks remain separately gated. Preserve surrounding product scope and terminology.
2. Bump SPEC metadata from `1.4.0` to `1.5.0` and update its date to 2026-09-27. Do not edit any other SPEC section, decision record, decision index, sprint plan, implementation, test, README/PDF, or checkpoint.
3. Confirm the revised scope sentence agrees with `DEC-009`, `DEC-010`, `DEC-011`, the B-14 task, and the already-corrected SPEC authorization chronology; the B-14 implementation task and review remain unaccepted pending a fresh review.
4. Run focused textual/metadata checks and `git diff --check` only. Do not run tests, typecheck, build, application code, provider/network, or inspect environment/secrets.
5. After verification, stop for human diff disposition. Any post-correction B-14 review requires a new frozen review contract and separate explicit approval.

## Allowed paths and preservation boundary

- **Contract preparation now:** this Draft section in `TASK_SPEC.md` only, plus the closeout records for `TASK-SEA-R2-B14-REVIEW-003` authorized by the user's `продовжуй` disposition.
- **After exact approval:** only `SPEC.md` for the single scope-summary sentence and required metadata bump; `TASK_SPEC.md` for this task's execution/outcome record; append-only `EVIDENCE.md` and `RUNBOOK.md` after actual verification.
- Preserve every pre-existing modified, staged, deleted and untracked path. Do not stage, reset, clean, overwrite, commit, push or deploy.
- **Excluded:** all other SPEC sections and canonical artifacts, decision files/index, SPRINT-02.md, source/tests, README/PDF, checkpoints, provider/network, `.env*`, secrets/credentials, environment values, tests/build, dependencies/configuration, and all commit/push/deployment activity.

## Stop conditions, verification, and recovery

- Stop if the pre-change base, SPEC diff fingerprint or staged/unstaged boundary differs; if correcting this sentence requires changing product scope or other paths; or if any acceptance claim needs runtime, network or secret access.
- Record only observed text/metadata/path/check results. Do not mark B-14 passing or create CHECKPOINT-24 under this task.
- After diff review, wait for a separate `continue`, `revise`, or `HOLD` disposition. No application checks are authorized.
- Recovery: inspect the exact task-owned SPEC diff and restore only the sentence/metadata change if rejected; preserve all prior B-14 content and append-only history. No destructive Git operations, commit, push or deployment.

## Observed execution — awaiting human diff disposition

- **Authorization:** the user explicitly approved this contract with `continue B14-SPEC-STATUS-002` on 2026-09-27. Preflight matched base `4b82a7aa1bdc2c70d3963a6bc02aef8517ad98d7`, the frozen SPEC diff fingerprint, and an empty staged SPEC diff.
- **Observed change:** `SPEC.md` is versioned from 1.4.0 to 1.5.0, metadata date remains current at 2026-09-27, and only the stale R2 scope-status sentence is revised to distinguish DEC-009's historical state from the later bounded B-14 authorization. No other SPEC section or product behavior was changed.
- **Verification:** `git diff --check -- SPEC.md TASK_SPEC.md EVIDENCE.md RUNBOOK.md` passed. Focused assertions passed for SPEC version/date, absence of the stale present-tense authorization sentence, the corrected DEC-009/DEC-010/B-14 scope wording, retained DEC-011 boundary, exact approved documentation paths and empty staged set.
- **Human diff disposition:** the user selected `continue` on 2026-09-27 for this SPEC correction. This accepts only the bounded wording/metadata diff; it does not pass B-14 review or establish Sprint 2 acceptance.
- **Closeout:** `TASK-SEA-R2-B14-SPEC-STATUS-002` is `Verified` for its bounded correction and prescribed checks. `E-SEA-084` and the RUNBOOK entry record the result. Draft `TASK-SEA-R2-B14-REVIEW-004` freezes the updated seven-path B-14 target and awaits exact approval `continue B14-REVIEW-004`.
- **Current status:** this documentation task is closed as `Verified`; B-14 remains `Active` and requires a fresh read-only review. No CHECKPOINT-24 is created.

# TASK-SEA-R2-B14-REVIEW-004 — Re-review B-14 after SPEC chronology correction

- **Version:** `1.0.0`
- **Status:** `Verified`
- **Product owner:** методист відділення теорії судноводіння навчального центру «Норд-Вест»
- **Delivery / technical owner:** виконавець проєкту
- **Date:** 2026-09-27
- **Related artifacts:** [`TASK_SPEC.md`](TASK_SPEC.md), [`EVIDENCE.md`](EVIDENCE.md), [`RUNBOOK.md`](RUNBOOK.md), [`SPEC.md`](SPEC.md), [`SPRINT-02.md`](SPRINT-02.md), [`docs/decisions/DEC-009-r2-current-task-status.md`](docs/decisions/DEC-009-r2-current-task-status.md), [`docs/decisions/DEC-010-r2-sparse-snapshot-demo-fallback.md`](docs/decisions/DEC-010-r2-sparse-snapshot-demo-fallback.md), [`docs/decisions/DEC-011-r2-task-authorization-reconciliation.md`](docs/decisions/DEC-011-r2-task-authorization-reconciliation.md), `TASK-SEA-R2-B14-MIXED-VESSELS-001`, `TASK-SEA-R2-B14-REMEDIATION-001`, `TASK-SEA-R2-B14-REVIEW-003`, `TASK-SEA-R2-B14-SPEC-STATUS-002`, `E-SEA-070`, `E-SEA-080`, `E-SEA-083`, `E-SEA-084`, base `4b82a7aa1bdc2c70d3963a6bc02aef8517ad98d7`.

## Goal and approval gate

- **Goal:** conduct a fresh read-only review of the exact post-correction B-14 tracked diff against the approved B-14 implementation contract, DEC-010, DEC-011, and bounded evidence; verify that the prior marker-lifecycle and authorization-chronology findings are resolved and reassess all B-14 acceptance oracles.
- **Review history:** `TASK-SEA-R2-B14-REVIEW-003` is a completed historical review with a `FAIL` recommendation due to the stale SPEC sentence at `SPEC.md:69`. The user accepted the bounded correction under `TASK-SEA-R2-B14-SPEC-STATUS-002`. No post-correction B-14 review has occurred.
- **Frozen target:** unstaged tracked diff against base commit `4b82a7aa1bdc2c70d3963a6bc02aef8517ad98d7` across exactly `SPEC.md`, `SPRINT-02.md`, `app/globals.css`, `app/map-shell.tsx`, `app/sea-map.tsx`, `docs/decisions/README.md`, and `tests/snapshot-interface.spec.ts`. SHA-256 fingerprint of `git diff BASE -- <these seven paths>` at contract preparation: `bda55292cd56688e1b7c6919caa20e6a545e125a742a6399ffb015375ccf7afa`. Staged diff across these paths was empty at preparation. Untracked DEC-010/DEC-011 records and all other pre-existing worktree changes are not part of this fingerprint.
- **Authorization:** Draft only. Do not inspect the target patch or begin review until the user explicitly approves this exact contract with `continue B14-REVIEW-004`.

## Review scope and acceptance oracle

After exact approval, inspect only the frozen target and relevant read-only task/decision/evidence records. Confirm:

1. **Sparse fallback:** successful AIS snapshots of 0–2 vessels show exactly the returned AIS vessels plus all three existing demo vessels; 3+ show only AIS vessels. Demo vessels do not alter AIS count, status, timestamp, truncation state, or source identity.
2. **Empty/loading/error semantics:** successful empty snapshots preserve the empty-result message while demo markers show; loading and error states remain marker-free; errors do not activate fallback.
3. **Visual/selection behavior:** source colors remain distinct; selection highlight is independently visible and applies only to the selected marker; card/selection behavior and marker lifecycle remain within B-14 scope; supplemental demos remain stationary and initial demo motion remains unchanged.
4. **Remediation behavior:** derived marker-array identity remains stable for a selection-only rerender with the same snapshot, and the regression assertion retains the same AIS/demo marker DOM elements through selection transfer while selection metadata moves to exactly one marker.
5. **Authorization chronology and path scope:** SPEC and decision index consistently distinguish DEC-009's dated 2026-09-25 state from the later DEC-010/B-14 authorization; DEC-011 adds no scope; the target contains only the approved B-14 slice. The tracked changed-path set remains exactly the seven paths above.
6. **Evidence boundary:** treat E-SEA-070/E-SEA-080 as local/mock verification only. Do not infer provider behavior, user validation, Sprint 2 acceptance, or release readiness.

Do not run tests, typecheck, build, application code, provider/network operations, or access environment/secrets.

## Allowed paths and preservation boundary

- **Contract preparation now:** this Draft section in `TASK_SPEC.md` only, plus factual closeout records for `TASK-SEA-R2-B14-SPEC-STATUS-002` authorized by the user's `continue` disposition.
- **After exact `continue B14-REVIEW-004`:** inspect the frozen patch and relevant read-only contracts/evidence; report findings and recommendation only. Do not change implementation, tests, README/PDF, or append-only records during review.
- **Only after a separate user disposition `continue` on the review report:** update B-14 task/review status in `TASK_SPEC.md`, append factual review results to `EVIDENCE.md` and `RUNBOOK.md`, and create `docs/checkpoints/CHECKPOINT-24.md` only if all criteria pass. Any finding requiring fixes needs a separate bounded remediation contract; `revise` or `HOLD` leaves B-14 open.
- Preserve all existing modified, deleted and untracked paths. Do not stage, reset, clean, overwrite, commit, push or deploy.
- **Excluded:** `.env*`, credentials, provider/network, application execution, tests/build, unrelated worktree paths, and all commit/push/deployment activity.

## Stop conditions, verification, and recovery

- Stop with `HOLD` if the base, fingerprint, exact path set, or staged/unstaged boundary differs; if a prohibited value is encountered; or if an acceptance claim requires runtime, network, or secret access.
- Report findings with file/line, concrete behavior and severity. Do not report a clean review until all six oracles have been examined.
- After the review report, wait for a separate user disposition. No tests/build are authorized.
- Preserve prior findings and append-only history. No implementation or rollback change is authorized by this review contract.

## Observed review and user disposition

- **Authorization:** the user explicitly approved this exact read-only contract with `continue B14-REVIEW-004` on 2026-09-27. Preflight matched the exact seven-path unstaged target against base `4b82a7aa1bdc2c70d3963a6bc02aef8517ad98d7`, fingerprint `bda55292cd56688e1b7c6919caa20e6a545e125a742a6399ffb015375ccf7afa`; staged target was empty.
- **Review result:** all six contract oracles passed by static inspection of the frozen target and authorized read-only records; no findings. Recommendation: `PASS`. Sparse/empty/loading/error behavior, source colors and selection ring, stationary fallback and unchanged demo motion, stable marker-array identity and regression assertions, authorization chronology/path scope, and evidence limitations align with the approved contracts.
- **Evidence boundary:** E-SEA-070 and E-SEA-080 support only prior local/mock checks. This review did not run tests, typecheck, build, app code, provider/network, or access environment/secrets. It makes no claim of live provider behavior, user validation, release readiness, or full Sprint 2 acceptance.
- **Human disposition:** the user selected `continue` on 2026-09-27 for the PASS review report. This accepts only the bounded B-14 review outcome and authorizes its closeout; it does not accept Sprint 2.
- **Closeout:** `TASK-SEA-R2-B14-REVIEW-004` and `TASK-SEA-R2-B14-MIXED-VESSELS-001` are `Verified` for their scoped criteria. `E-SEA-086` records the review. `CHECKPOINT-24` captures B-14's scoped PASS; overall Sprint 2 acceptance remains unestablished.
- **Recovery / handoff:** preserve the reviewed implementation and append-only history. No implementation change, staging, commit, push, deployment, provider request, or secret/environment inspection occurred. Any remaining Sprint 2 acceptance work requires its own explicit bounded gate.

# TASK-SEA-R2-SPRINT02-ACCEPTANCE-REVIEW-001 — Final Sprint 2 acceptance review

- **Version:** `1.0.0`
- **Status:** `Verified`
- **Product owner:** методист відділення теорії судноводіння навчального центру «Норд-Вест»
- **Delivery / technical owner:** виконавець проєкту
- **Date:** 2026-09-27
- **Related artifacts:** [`SPEC.md`](SPEC.md), [`SPRINT-02.md`](SPRINT-02.md), [`TASK_SPEC.md`](TASK_SPEC.md), [`EVIDENCE.md`](EVIDENCE.md), [`RUNBOOK.md`](RUNBOOK.md), [`docs/decisions/DEC-004-checkpoint-convention.md`](docs/decisions/DEC-004-checkpoint-convention.md), [`docs/decisions/DEC-006-r2-scope.md`](docs/decisions/DEC-006-r2-scope.md), [`docs/decisions/DEC-009-r2-current-task-status.md`](docs/decisions/DEC-009-r2-current-task-status.md), [`docs/decisions/DEC-010-r2-sparse-snapshot-demo-fallback.md`](docs/decisions/DEC-010-r2-sparse-snapshot-demo-fallback.md), [`docs/decisions/DEC-011-r2-task-authorization-reconciliation.md`](docs/decisions/DEC-011-r2-task-authorization-reconciliation.md), [`docs/checkpoints/CHECKPOINT-03.md`](docs/checkpoints/CHECKPOINT-03.md), [`docs/checkpoints/CHECKPOINT-21.md`](docs/checkpoints/CHECKPOINT-21.md), [`docs/checkpoints/CHECKPOINT-22.md`](docs/checkpoints/CHECKPOINT-22.md), [`docs/checkpoints/CHECKPOINT-23.md`](docs/checkpoints/CHECKPOINT-23.md), [`docs/checkpoints/CHECKPOINT-24.md`](docs/checkpoints/CHECKPOINT-24.md), `E-SEA-075`–`E-SEA-086`, `TASK-SEA-R2-B13-REVIEW-001`, `TASK-SEA-R2-B14-REVIEW-004`.

## Goal and approval boundary

- **Goal:** conduct a bounded, read-only review of the approved Sprint 2 scope and its existing implementation/evidence records; produce a criterion-by-criterion acceptance matrix, identify contradictions or evidence gaps, and recommend `PASS`, `CONTINUE WITH APPROVAL`, or `HOLD` without assuming the user's/product owner's final disposition.
- **Scope:** Sprint 2 / R2 outcomes for US-05…US-08 and B-08…B-13, plus the separately approved B-14 sparse-snapshot UI addition in DEC-010. CHECKPOINT-03's current scoped result must be read through CHECKPOINT-22; CHECKPOINT-03 itself is historical/superseded. CHECKPOINT-23 and CHECKPOINT-24 support only their separately bounded B-13 and B-14 results.
- **Exclusions:** this is not acceptance of all MVP requirements. US-09, US-10, overall release readiness, deployment, provider availability/key validity, user validation, and live UI/API end-to-end behavior are not inferred from Sprint 2 task completion or scoped checkpoints. Do not re-open or rewrite historical HOLD records.
- **Known reconciliation point:** Part C of `SPRINT-02.md` contains planned `Gated / not implemented` statuses for B-10…B-13; later task-specific records and checkpoints record completed bounded work. Determine and report whether the task/evidence chronology resolves this as a plan-vs-outcome distinction. Do not edit `SPRINT-02.md` or silently rewrite any historical claim under this review.
- **Authorization:** this contract is Draft. Do not begin the acceptance review until the user explicitly approves this exact task with `continue SPRINT02-ACCEPTANCE-REVIEW-001`. Approval authorizes only the read-only review described here, not a provider request, runtime check, source change, final product-owner disposition, or release activity.

## Review method and acceptance oracle

After exact approval, review canonical contracts, latest task outcomes, evidence, runbook handoffs, and current checkpoint pointers. Use the individual immutable B-13 commit review and the frozen B-14 review record rather than attributing the combined current worktree diff to either slice. Do not treat a planned check, README/PDF, screenshot, template, or prior task approval as evidence that a command ran or a product outcome was accepted.

Prepare a matrix with one row per applicable Sprint 2 criterion, including B-08…B-14 and CHECKPOINT-03's scoped criteria. For each row state: criterion/source, latest task/evidence/checkpoint anchors, evidence class (`local automated`, `static review`, `bounded live capture`, or `human disposition`), result (`SUPPORTED`, `NOT SUPPORTED`, or `UNKNOWN`), and limitation. At minimum assess:

1. **Scope and governance:** R2 remains limited to approved US-05…US-08; B-14 is the only later specifically authorized addition; no unrelated or Sprint 3 work is implied. Reconcile the dated DEC-009 / later DEC-010 and DEC-011 chronology without extending authorization.
2. **B-08…B-12:** verify latest task statuses and direct evidence for the server-side secret boundary, reader/endpoint, sample/provenance, transformer, and bounded collector. Distinguish local deterministic checks from the one bounded live capture recorded in E-SEA-075/CHECKPOINT-21. Do not claim key validity or provider acknowledgement.
3. **B-13:** verify the approved implementation/review outcome from its immutable commit and CHECKPOINT-23/E-SEA-077. Treat mocked interface tests as local evidence only; identify that no live UI/API end-to-end check is recorded.
4. **B-14:** verify the scoped UI decision, implementation/remediation records, and PASS review in E-SEA-086/CHECKPOINT-24. Preserve its explicit limitation that this does not establish provider behavior, user validation, or full Sprint 2 acceptance.
5. **Checkpoint chain:** verify CHECKPOINT-22 is the current `PASS / VERIFIED` decision for CHECKPOINT-03's defined criteria and preserves the earlier HOLD as historical; do not confuse that bounded status with overall Sprint 2 acceptance.
6. **Gaps and plan reconciliation:** record each applicable criterion not proven by existing evidence, including live UI/API end-to-end behavior or manual user flow if the criterion requires it. If evidence is insufficient, contradictory, or would require executing the app, running tests/build, using network/provider, reading secrets/environment, or obtaining a new product decision, classify it as `UNKNOWN`/`HOLD` and do not recommend overall `PASS`.
7. **Bounded recommendation:** `PASS` may be recommended only if every in-scope Sprint 2 criterion has direct, current, internally consistent evidence and no unresolved blocking acceptance gap. Otherwise recommend `CONTINUE WITH APPROVAL` or `HOLD`, list each separate bounded follow-up needed, and state that none is authorized by this review.

## Allowed paths and preservation boundary

- **Contract preparation now:** this appended Draft in `TASK_SPEC.md` only.
- **After exact approval:** read-only inspection of `SPEC.md`, `SPRINT-02.md`, `TASK_SPEC.md`, `EVIDENCE.md`, `RUNBOOK.md`, DEC-004/006/009/010/011, CHECKPOINT-03 and CHECKPOINT-21…24, referenced B-08…B-14 task records, and referenced implementation/test paths only as needed to resolve criteria. Respect frozen B-13/B-14 review boundaries; do not use the current combined worktree diff to attribute historical task changes.
- **Review output:** provide the acceptance matrix, evidence anchors, findings, limitations, and recommendation in the conversation. Do not edit source, tests, plan, SPEC, evidence, runbook, checkpoint, README/PDF, sample, or decision files during the review.
- **Only after a separate user disposition `continue` on the review report:** update this task's outcome in `TASK_SPEC.md`; append factual review results to `EVIDENCE.md` and `RUNBOOK.md`; create a new Sprint 2 acceptance checkpoint only if the review oracle supports a passing recommendation and the user disposition explicitly accepts that result. `revise` or `HOLD` records no overall PASS; any remediation, additional test, provider/runtime check, or product decision needs its own bounded contract and approval.
- Preserve all modified, staged, and untracked paths, including current B-13/B-14 worktree changes, README/PDF, sample data, and historical checkpoints. Do not stage, reset, clean, overwrite, commit, push, or deploy.

## Stop conditions and verification

- Stop with `HOLD` if any criterion's source of truth cannot be reconciled, evidence is absent or materially contradictory, frozen review boundaries cannot be respected, or an oracle requires an excluded operation.
- Do not run tests, typecheck, build, application code, provider/network requests, environment loading, or inspect credentials/secrets. Do not browse live services or expose sample payload values.
- Do not edit documents or create a checkpoint during the read-only review. After any separately authorized closeout, verify only task-owned documentation, evidence IDs, links, checkpoint references, changed paths, and `git diff --check`; report the actual command/result.
- `PASS` is a scoped Sprint 2 review recommendation, not authorization to deploy, publish, commit, or declare the entire MVP/release ready. The user/product owner retains the final acceptance disposition.

## Recovery and handoff

Before approval, revise or remove only this Draft contract. After review, preserve findings and task/evidence history; correct factual errors only through a superseding record. Do not reset, clean, discard, or roll back existing implementation or worktree changes. If any criterion remains open, hand off its exact evidence gap and require a separate bounded task contract plus explicit approval before work.

## Review outcome and disposition — 2026-09-27

- **Review status:** `Verified` for completion of this bounded read-only acceptance review; this status is not overall Sprint 2 acceptance.
- **Recommendation:** `CONTINUE WITH APPROVAL`. Existing B-08…B-14 slices and CHECKPOINT-03's scoped criteria are supported by their task/evidence records and scoped checkpoints. The user reported that clicking “Завантажити справжні позиції” loads real ships; record this as human-reported evidence supporting the core live click-to-display flow, not as an independently observed or instrumented test.
- **Open acceptance detail:** the report does not explicitly confirm live-response marker-to-card matching or the full set of manual US-05…US-08 behaviors. Existing mocked tests support local UI behavior but do not independently establish these live/manual details. Therefore the acceptance oracle for a Sprint 2 `PASS` is not fully met.
- **Plan reconciliation:** Part C's B-10…B-13 `Gated / not implemented` labels are an earlier plan snapshot; later task/evidence records describe delivered bounded slices. `SPRINT-02.md` and historical records were not rewritten.
- **Disposition:** the user supplied the additional live-flow observation and then `continue SPRINT02-ACCEPTANCE-REVIEW-001` on 2026-09-27. This authorizes recording this review outcome only; it does not explicitly accept an overall `PASS`. No Sprint 2 acceptance checkpoint is created.
- **Evidence / verification:** `E-SEA-087`; final documentation checks are recorded there. No tests, typecheck, build, application execution, provider/network request, environment loading, or secret access was performed for this review/closeout.
- **Handoff:** any remaining manual acceptance detail requires a separately reviewed bounded contract and explicit approval. US-09/US-10, release readiness and deployment remain outside this review.

# TASK-SEA-R2-MANUAL-ACCEPTANCE-001 — Remaining Sprint 2 manual acceptance

- **Version:** `1.0.0`
- **Status:** `Verified` — bounded manual pass completed and reported; uncaptured subdetails remain unresolved and this is not Sprint 2 acceptance.
- **Product owner:** методист відділення теорії судноводіння навчального центру «Норд-Вест»
- **Delivery / technical owner:** виконавець проєкту
- **Date:** 2026-09-27
- **Related artifacts:** [`SPEC.md`](SPEC.md), [`SPRINT-02.md`](SPRINT-02.md), [`TASK_SPEC.md`](TASK_SPEC.md), [`EVIDENCE.md`](EVIDENCE.md), [`RUNBOOK.md`](RUNBOOK.md), [`docs/decisions/DEC-006-r2-scope.md`](docs/decisions/DEC-006-r2-scope.md), [`docs/decisions/DEC-009-r2-current-task-status.md`](docs/decisions/DEC-009-r2-current-task-status.md), [`docs/decisions/DEC-010-r2-sparse-snapshot-demo-fallback.md`](docs/decisions/DEC-010-r2-sparse-snapshot-demo-fallback.md), [`docs/decisions/DEC-011-r2-task-authorization-reconciliation.md`](docs/decisions/DEC-011-r2-task-authorization-reconciliation.md), [`docs/checkpoints/CHECKPOINT-22.md`](docs/checkpoints/CHECKPOINT-22.md), [`docs/checkpoints/CHECKPOINT-23.md`](docs/checkpoints/CHECKPOINT-23.md), [`docs/checkpoints/CHECKPOINT-24.md`](docs/checkpoints/CHECKPOINT-24.md), `TASK-SEA-R2-SPRINT02-ACCEPTANCE-REVIEW-001`, `E-SEA-075`, `E-SEA-077`, `E-SEA-087`.

## Goal and authorization boundary

- **Goal:** perform one bounded manual browser acceptance pass for the remaining Sprint 2 criteria not directly evidenced by the approved record, without changing application code or expanding R2 scope.
- **Gap basis:** `E-SEA-087` records the user's report that the button loads real ships as human-reported evidence. The remaining explicit gap is a sanitized manual observation that one live AIS vessel marker opens its matching existing card and that the visible snapshot status/count/time describe the received AIS set; also check the contracted loading and no-key UI states without modifying secret files.
- **Scope:** existing local R2 application only; B-13 button/loading/live-success/card behavior and no-key message; observe the applicable B-14 sparse/normal snapshot presentation for the actual returned count. Existing mocked tests and CHECKPOINT-22/23/24 remain the evidence for cases not safely/reliably inducible in this one pass. This task does not reopen or supersede those records.
- **Approval gate:** this Draft authorizes nothing. Do not start the application or make a provider request until the user explicitly approves this exact contract with `continue SPRINT02-MANUAL-ACCEPTANCE-001`. Approval authorizes only the operations enumerated below; it does not accept Sprint 2 or authorize code changes, diagnostics, another request, commit/push, deployment, or release activity.

## Owner, allowed paths, and preservation

- **Contract preparation now:** append this task contract in `TASK_SPEC.md` only.
- **After exact approval, read-only inputs:** the artifacts listed above and the existing app/API implementation as needed to follow the documented flow; do not inspect the current combined worktree diff to attribute earlier slices.
- **After approved manual checks:** append factual `EVIDENCE.md` and `RUNBOOK.md` records only if checks actually occur and the user provides a separate `continue` disposition on the manual-check report. Create a checkpoint only if every in-scope criterion passes and a separate disposition explicitly accepts that bounded result.
- **Implementation paths:** none. Do not modify source, tests, configuration, `SPEC.md`, `SPRINT-02.md`, decision records, samples, README/PDF, checkpoints, or any other existing/untracked paths.
- Preserve every current modified, staged, deleted, and untracked path. Do not stage, reset, clean, overwrite, commit, push, or deploy.

## Permitted manual operations after approval

1. Read the task contract, relevant user-facing behavior clauses, and necessary source paths; do not read secret files or print environment values.
2. Start one local, non-production development-server session using the existing project command, then use the local browser at the existing application origin. No build, typecheck, automated test, package installation, or alternate server is permitted.
3. Observe the initial demo state, click the existing snapshot button once, and inspect only visible UI plus request metadata (method, same-origin path, status, count/timing). Do not inspect or copy the response body in developer tools.
4. Allow **at most one** user-triggered live snapshot request to AISStream for this contract, through the existing UI and server route. The existing application may use its already configured server-side key through its existing accessor; do not read, load manually, echo, copy, validate, or otherwise handle the key. If the route reports `no_api_key`, stop the live portion; do not troubleshoot configuration or retry.
5. If a live vessel appears, select one AIS marker and verify visually that its existing card corresponds to that marker; compare only the rendered identity and visible fields needed for the check. Record pass/fail without retaining ship name, MMSI, coordinates, raw payload, response body, key, or screenshot.
6. For the no-key UI state, if separately approved with this contract, use a separate local server invocation with `AISSTREAM_API_KEY` explicitly set to an empty process value (for example, `AISSTREAM_API_KEY= npm run dev`) so the app exercises its existing no-key route. Do not rename, edit, inspect, or remove `.env.local`; do not emit the process environment. If the expected no-key response is not obtained immediately, stop without configuration troubleshooting.
7. Block external map-tile requests if available in the browser setup; no other external service is in scope. Stop the local development server after the single manual pass and report whether it exited normally.

## Acceptance criteria and evidence to record

- [ ] Initial state shows the existing demo label/markers and the snapshot button; no unrelated UI or source change is needed.
- [ ] One click enters the contracted loading state when observable: button disabled, demo selection/card cleared, loading label visible; a second click cannot start an overlapping attempt. If the live request settles too quickly to observe a loading detail, record it as `UNKNOWN`, not `PASS`.
- [ ] The single request uses same-origin `GET /api/snapshot`; record only request count, status and elapsed time, not its body. No credential appears in visible UI or request metadata inspected.
- [ ] On live success with at least one AIS vessel, at least one rendered AIS marker is visibly selectable and opens its matching existing card. Record the correspondence as pass/fail only; retain no identifying vessel data.
- [ ] The visible AIS status reports the response's AIS count and UTC time and identifies the sample as incomplete; demo fallback markers, if applicable for the observed AIS count, do not inflate that AIS count. Do not force or alter the provider response to exercise a different threshold.
- [ ] AIS markers remain stationary during a brief observation; the result has no stale demo selection/card. Record only observed behavior and a bounded observation duration.
- [ ] In the separate blank-key session, if performed, the UI displays the exact no-key copy `Не вдалося отримати дані: Ключ AISStream не налаштовано`, with no provider request and no secret-file changes.
- [ ] Failed, empty, or unsuitable live outcomes are recorded exactly as observed with sanitized fixed categories. They do not establish successful live acceptance; do not retry.
- [ ] Human review selects `continue`, `revise`, or `HOLD` after the report. `Verified`/checkpoint creation is not automatic and requires the disposition boundary above.

## Verification boundary and stop conditions

- The task may use the existing app's runtime behavior and make at most one live provider request only after exact approval. It may not run tests/typecheck/build, perform a second request, retry, investigate provider failures, inspect environment/secret content, change configuration/source, or use a second provider path.
- Stop before starting if the working tree has changed such that the manual procedure would require touching unrelated paths, if local startup requires a dependency/config change, or if safe secret isolation cannot be maintained.
- Stop immediately if raw payload, key material, private environment data, unexpected external traffic, unexpected source changes, a second request, or a provider/tool error detail is exposed; do not copy it into evidence.
- If no eligible live vessel is displayed, the live marker/card criterion remains `UNKNOWN`/`NOT SUPPORTED` for this attempt. Do not convert the prior user report into an independently observed result, and do not retry under this contract.
- A successful manual pass would support only the observed local R2 flow. It would not establish continuous provider availability, key validity beyond the observed successful request, complete AIS coverage, user validation beyond this pass, US-09/US-10, release readiness, or deployment readiness.

## Targeted checks, rollback, and handoff

- **Contract preparation checks:** `git diff --check -- TASK_SPEC.md`; structural assertions for task ID/status, exact approval gate, allowed/excluded paths, one-request cap, no-secret rule, acceptance oracle, stop conditions, and recovery; inspect changed-path boundary. No runtime/product check is part of contract preparation.
- **Expected result now:** only this Draft contract is appended to `TASK_SPEC.md`; no EVIDENCE/RUNBOOK/checkpoint or implementation file is changed.
- **Recovery:** before approval, revise or remove only this appended Draft section. After an approved manual pass, preserve the append-only evidence; correct factual errors only with a superseding factual record. Never reset/clean the shared worktree or alter local secret files.
## Bounded manual outcome — 2026-09-28

- **Outcome:** `Verified` for completion of the one authorized manual pass and its report only. E-SEA-088 records screenshot-visible same-origin HTTP 200 and snapshot status/count/time plus user-reported loading, live marker/card correspondence, stationary marker and no-key UI message. The user separately selected `continue` on that report.
- **Unresolved observations:** initial idle-demo label/selection-clearing details, individual loading-state subdetails, exact live request duration, and no-key HTTP metadata were not separately captured. No-key no-provider behavior is supported by the route's missing-key guard, not server-side egress instrumentation.
- **Boundary:** this status closes the bounded manual attempt; it does not certify the unobserved details, overall Sprint 2, US-09/US-10, release readiness, or deployment. See E-SEA-088 and subsequent final-evidence review.
- **Handoff:** no additional runtime or provider action is authorized. Any remaining behavior check requires a separate bounded contract and exact approval.

# TASK-SEA-R2-SPRINT02-ACCEPTANCE-REVIEW-002 — Reassess Sprint 2 acceptance after manual evidence

- **Version:** `1.0.0`
- **Status:** `Verified` — bounded read-only review completed; recommendation remains `CONTINUE WITH APPROVAL`, not Sprint 2 acceptance.
- **Product owner:** методист відділення теорії судноводіння навчального центру «Норд-Вест»
- **Delivery / technical owner:** виконавець проєкту
- **Date:** 2026-09-28
- **Related artifacts:** [`SPEC.md`](SPEC.md), [`SPRINT-02.md`](SPRINT-02.md), [`TASK_SPEC.md`](TASK_SPEC.md), [`EVIDENCE.md`](EVIDENCE.md), [`RUNBOOK.md`](RUNBOOK.md), [`docs/decisions/DEC-006-r2-scope.md`](docs/decisions/DEC-006-r2-scope.md), [`docs/decisions/DEC-009-r2-current-task-status.md`](docs/decisions/DEC-009-r2-current-task-status.md), [`docs/decisions/DEC-010-r2-sparse-snapshot-demo-fallback.md`](docs/decisions/DEC-010-r2-sparse-snapshot-demo-fallback.md), [`docs/decisions/DEC-011-r2-task-authorization-reconciliation.md`](docs/decisions/DEC-011-r2-task-authorization-reconciliation.md), [`docs/checkpoints/CHECKPOINT-22.md`](docs/checkpoints/CHECKPOINT-22.md), [`docs/checkpoints/CHECKPOINT-23.md`](docs/checkpoints/CHECKPOINT-23.md), [`docs/checkpoints/CHECKPOINT-24.md`](docs/checkpoints/CHECKPOINT-24.md), `TASK-SEA-R2-SPRINT02-ACCEPTANCE-REVIEW-001`, `TASK-SEA-R2-MANUAL-ACCEPTANCE-001`, `E-SEA-075`–`E-SEA-088`.

## Goal and authorization boundary

- **Goal:** perform a fresh, read-only assessment of whether the newly recorded bounded manual observations in E-SEA-088 close the specific acceptance gap identified by E-SEA-087, and determine whether current evidence supports a Sprint 2 / R2 acceptance recommendation.
- **Scope:** approved Sprint 2 / R2 criteria US-05…US-08 and B-08…B-14, plus CHECKPOINT-03's already superseded, scoped result as currently recorded by CHECKPOINT-22. Reconcile E-SEA-087 with E-SEA-088 and the approved B-13/B-14 records without extending their claims.
- **Exclusions:** US-09, US-10, full MVP acceptance, release/deployment readiness, broad user validation, provider availability/key validity, any new live or diagnostic operation, source/test changes, and README/PDF or sample updates.
- **Approval:** this Draft authorizes no review or other operation. Begin only after explicit approval of this exact contract with `continue SPRINT02-ACCEPTANCE-REVIEW-002`. Approval authorizes only the read-only assessment and report described here; it does not itself accept Sprint 2 or authorize any follow-up task.

## Review method and acceptance oracle

After exact approval, review only the canonical contracts, dated decision records, task outcomes, evidence, runbook, and scoped checkpoints listed above. Treat E-SEA-088 as a sanitized user-reported/manual observation plus screenshot-visible metadata; do not infer facts beyond what it records. Do not inspect raw live sample values or the retrospective README/PDF.

Prepare an acceptance matrix for each applicable criterion with: source; latest task/evidence/checkpoint anchors; evidence class (`local automated`, `static review`, `bounded live capture`, `manual user report`, or `human disposition`); status (`SUPPORTED`, `NOT SUPPORTED`, or `UNKNOWN`); and limitation. Assess at minimum:

1. **Scope and governance:** only approved R2 scope and the bounded B-14 addition are considered; DEC-009/010/011 chronology is consistent; CHECKPOINT-22 is used for the current scoped CHECKPOINT-03 result.
2. **B-08…B-12:** direct evidence supports only their bounded local behavior and the single authorized live receipt/sample; do not claim key validity or provider acknowledgement.
3. **B-13 / US-05…US-08:** distinguish mocked UI tests, static review, E-SEA-088 screenshot-visible facts, and user-reported manual observations. Assess each recorded criterion, including any loading detail not explicitly observed, without promoting `UNKNOWN` to `SUPPORTED`.
4. **B-14:** keep CHECKPOINT-24's PASS bounded to its approved UI criteria; do not infer live provider behavior or user validation.
5. **Overall recommendation:** recommend `PASS` only if every applicable Sprint 2/R2 criterion has sufficient current evidence and no blocking acceptance detail remains; otherwise recommend `CONTINUE WITH APPROVAL` or `HOLD` and name each remaining gap. State explicitly that US-09/US-10 and overall MVP/release readiness are outside this task.

The review output is a matrix and recommendation in the conversation. Do not edit records, create a checkpoint, run tests/typecheck/build, start the app, make provider/network requests, inspect environment/secrets, or access raw sample values during review.

## Allowed paths, preservation, and closeout gate

- **Contract preparation now:** this appended Draft in `TASK_SPEC.md` only.
- **After exact approval:** read-only inspection of the listed contracts, task records, evidence, runbook, decisions, and checkpoints only as needed for the matrix. Do not inspect implementation diffs or raw sample payloads.
- **After report:** stop for a separate user disposition `continue`, `revise`, or `HOLD`. Only after a separate `continue` may this task's outcome be recorded in `TASK_SPEC.md` and factual review results be appended to `EVIDENCE.md` and `RUNBOOK.md`. A new Sprint 2 acceptance checkpoint may be created only if the review oracle supports `PASS` and the user explicitly accepts that bounded result. `revise` or `HOLD` records no overall PASS.
- Any follow-up needing manual behavior not already evidenced, code/test changes, application execution, provider/network, secret/environment access, or new product decisions requires its own reviewed bounded contract and explicit approval.
- Preserve all existing committed and uncommitted paths, including the live sample, Sprint retrospective files, screenshots, and `reference/`. Do not stage, reset, clean, overwrite, commit, push, deploy, or change those paths under this task.

## Verification, stop conditions, and recovery

- **Contract preparation check:** run `git diff --check -- TASK_SPEC.md` and focused structural checks for the task ID/status, exact approval gate, criteria, evidence boundary, allowed paths, stop conditions, and recovery. Expected change now: this Draft section only.
- **Stop:** if records conflict or evidence is insufficient to classify a criterion, preserve `UNKNOWN`/`HOLD`; do not seek new evidence under this contract.
- **Recovery:** before approval, revise or remove only this Draft section. After review, preserve the report and append-only history; correct factual errors only through a superseding record. Never reset, clean, or roll back shared work.
## Review outcome and disposition — 2026-09-28

- **Review status:** `Verified` for completion of this bounded read-only review only. Recommendation: `CONTINUE WITH APPROVAL`; this is not overall Sprint 2 acceptance.
- **Matrix outcome:** scope/governance and dated DEC-009/010/011 chronology are `SUPPORTED`; B-08…B-12 are `SUPPORTED` for bounded local behavior and the single live receipt/sample in E-SEA-075; B-13/US-05…US-08 are supported by scoped mocked/static evidence plus E-SEA-088's screenshot-visible and user-reported results, with explicit manual details still `UNKNOWN`; B-14 is `SUPPORTED` only for CHECKPOINT-24's scoped criteria; CHECKPOINT-03 is `PASS / VERIFIED` only for the criteria captured in CHECKPOINT-22.
- **E-SEA-087 reconciliation:** E-SEA-088 closes the previously missing reported marker/card correspondence and adds bounded live UI success, loading, stationary-marker and no-key outcomes. Its screenshot-visible HTTP 200/snapshot metadata is not an instrumented trace; the no-key no-egress claim remains based on source guard, not network instrumentation.
- **Open details:** initial idle-demo details, individual loading subdetails, exact live request duration, and no-key HTTP metadata remain uncaptured/`UNKNOWN`. Existing mocked tests support local UI behavior but do not convert these live/manual observations to `SUPPORTED`. `TASK-SEA-R2-MANUAL-ACCEPTANCE-001` remains marked `Draft` despite E-SEA-088/RUNBOOK recording its approved execution and disposition; this lifecycle inconsistency is reported, not edited under this review.
- **Disposition:** user selected `CONTINUE WITH APPROVAL` on the review report. This authorizes closeout of this review only, not a Sprint 2 PASS. No checkpoint is created because the review oracle does not support PASS.
- **Evidence / verification:** `E-SEA-089`; final documentation check results are recorded there. No tests, typecheck, build, application execution, provider/network, environment loading, secret access, source changes, staging, reset, cleanup, commit, push, or deployment occurred.
- **Handoff:** resolve whether the uncaptured manual details are acceptance-blocking and reconcile the manual task lifecycle only through a separate bounded contract/approval. US-09/US-10, full MVP acceptance, release readiness and deployment remain outside this review.

# TASK-SEA-R2-SPRINT02-FINAL-EVIDENCE-REVIEW-003 — Final evidence sufficiency review

- **Version:** `1.0.0`
- **Status:** `Verified` — bounded read-only review completed; recommendation is `CONTINUE WITH APPROVAL`, not overall Sprint 2 acceptance.
- **Product owner:** методист відділення теорії судноводіння навчального центру «Норд-Вест»
- **Delivery / technical owner:** виконавець проєкту
- **Date:** 2026-09-28
- **Related artifacts:** [`SPEC.md`](SPEC.md), [`SPRINT-02.md`](SPRINT-02.md), [`TASK_SPEC.md`](TASK_SPEC.md), [`EVIDENCE.md`](EVIDENCE.md), [`RUNBOOK.md`](RUNBOOK.md), [`docs/checkpoints/CHECKPOINT-22.md`](docs/checkpoints/CHECKPOINT-22.md), [`docs/checkpoints/CHECKPOINT-23.md`](docs/checkpoints/CHECKPOINT-23.md), [`docs/checkpoints/CHECKPOINT-24.md`](docs/checkpoints/CHECKPOINT-24.md), `TASK-SEA-R2-SPRINT02-ACCEPTANCE-REVIEW-002`, `TASK-SEA-R2-MANUAL-ACCEPTANCE-001`, `E-SEA-051`, `E-SEA-075`, `E-SEA-077`, `E-SEA-087`–`E-SEA-089`.

## Goal and approval boundary

- **Goal:** determine whether already-recorded local/mock UI test evidence directly covers the idle/loading details left uncaptured by E-SEA-088; reconcile the manual acceptance task's Draft lifecycle label against its approval/outcome records; and determine whether all in-scope Sprint 2 acceptance criteria now have sufficient evidence for a final recommendation.
- **Scope:** US-05…US-08 / B-13 idle/loading criteria only as necessary to assess the open details from E-SEA-089; task/evidence/checkpoint reconciliation for B-08…B-14 and CHECKPOINT-03 solely by reference to current scoped records. No new product behavior, live acceptance or expanded R2 scope.
- **Approval:** Draft only. Begin only after the user explicitly approves this exact read-only review with `continue SPRINT02-FINAL-EVIDENCE-REVIEW-003`. Approval does not itself accept Sprint 2 or authorize a runtime action.

## Review method and acceptance oracle

After exact approval, inspect only the canonical records listed above and the existing B-13 automated test source(s) named by those records, starting with `tests/snapshot-interface.spec.ts`. Do not run the tests. Do not inspect raw live sample values, retrospective README/PDF, unrelated code, or the combined worktree diff.

Prepare a criterion matrix showing each open idle/loading detail; the exact existing assertion/evidence anchor, if any; evidence class (`local automated`, `manual user report`, `static review`, or `UNKNOWN`); and result (`SUPPORTED`, `NOT SUPPORTED`, or `UNKNOWN`). Then reassess the acceptance gap without upgrading mocked behavior into live-provider evidence. Specifically:

1. Establish whether an existing assertion directly covers the initial idle label/markers/button and each observable loading detail from the prior manual contract: disabled button, cleared demo selection/card, loading label, and prevention of overlapping requests.
2. Keep live request duration and no-key HTTP metadata distinct from product behavior; determine from the canonical R2 contract whether either is a blocking acceptance criterion, and cite the source.
3. Reconcile `TASK-SEA-R2-MANUAL-ACCEPTANCE-001`'s status against its exact approval, E-SEA-088, and the user's recorded `continue`. Do not change the task status during review.
4. Recommend `PASS` only if every applicable in-scope Sprint 2 criterion has sufficient direct, current, internally consistent evidence and no blocking gap remains. Otherwise recommend `CONTINUE WITH APPROVAL` or `HOLD`, preserving each `UNKNOWN` and naming its separate bounded follow-up.
5. Keep CHECKPOINT-22/23/24 bounded to their recorded criteria; US-09/US-10, full MVP acceptance, release readiness, deployment, key validity, provider availability, and broad user validation remain excluded.

No tests, typecheck, build, app execution, provider/network request, environment/secret access, or new data collection is authorized.

## Allowed paths and closeout gate

- **Contract preparation now:** this appended Draft in `TASK_SPEC.md` only.
- **After exact approval:** read-only inspection of the listed records and the B-13 test source(s) explicitly referenced by them; no edits during review.
- **Only after a separate user disposition `continue` on the report:** record this task's outcome in `TASK_SPEC.md`; if the approval/evidence chronology supports it, correct the manual acceptance task's status and add its factual outcome there; append factual results to `EVIDENCE.md` and `RUNBOOK.md`. Create a Sprint 2 acceptance checkpoint only if the oracle supports `PASS` and the user explicitly accepts that bounded result. `revise` or `HOLD` creates no overall PASS.
- Any missing criterion that needs new tests, runtime/manual execution, provider/network, secrets/environment, code changes, or a new product decision requires a separate reviewed bounded contract and explicit approval.
- Preserve all existing modified and untracked paths. Do not stage, reset, clean, overwrite, commit, push, deploy, or change unrelated paths.

## Verification, stop conditions, and recovery

- **Contract preparation check:** run `git diff --check -- TASK_SPEC.md` and focused structural assertions for task ID/status, exact approval gate, inspection boundary, criteria, allowed paths, closeout gate, and recovery. Expected change now: this appended Draft section only.
- **Stop:** if an acceptance requirement cannot be traced to an authorized canonical source, if test assertions do not directly establish a criterion, or if resolving a detail requires prohibited execution, preserve `UNKNOWN`/`HOLD` and report the specific gap.
- **Recovery:** before approval, revise or remove only this appended Draft. After review, preserve append-only evidence/runbook history; correct factual errors only through a superseding record. Never reset, clean, or roll back shared work.
## Review outcome and disposition — 2026-09-28

- **Review status / recommendation:** `Verified` for the bounded read-only review only; recommendation `CONTINUE WITH APPROVAL`. The user selected `continue` on this report. This does not accept Sprint 2.
- **Existing idle/loading evidence:** `tests/snapshot-interface.spec.ts:73-90` and `tests/vessel-selection.spec.ts:9-48` cover the initial demo label/three markers and marker/card behavior in mocked browser tests. `tests/snapshot-interface.spec.ts:93-127` uses a 700 ms mocked response and asserts the disabled button, loading label, absence of markers/cards while pending, retained map, blocked overlapping click and later request. E-SEA-051 records 16 passed B-07/B-13 mocked Playwright tests; tests were not rerun for this review.
- **Remaining B-13 gap:** the loading test starts without a selected marker/card. The existing tests do not directly exercise `select demo marker/card → click snapshot → verify selection/card clear while pending`. This is an explicit B-13 state requirement in this task's Inputs and behavior contract and the Sprint 2 loading behavior; result remains `UNKNOWN`. Resolving it needs a separate bounded test-change/check contract and approval.
- **Non-blocking evidence limits:** exact live-request duration and no-key HTTP metadata remain uncaptured, but the canonical product acceptance clauses specify no duration threshold or required no-key HTTP status. The configured 15-second window is not measured elapsed time. These omissions are limitations, not independent acceptance blockers. No-key UI text is user-reported in E-SEA-088; no-provider behavior relies on the route guard, not egress instrumentation.
- **Manual task lifecycle:** `TASK-SEA-R2-MANUAL-ACCEPTANCE-001` is now `Verified` for completion of the bounded manual pass/report only. Its recorded outcomes, separate user disposition, limitations, and evidence link E-SEA-088 are added above. This does not mark unobserved details as passed.
- **Scope summary:** R2 governance and B-08…B-12 are supported within their records; B-13 remains supported for tested/mock and reported behavior with the explicit selected-card-to-loading transition unknown; B-14 and CHECKPOINT-03 remain scoped to CHECKPOINT-24 and CHECKPOINT-22 respectively. US-09/US-10, full MVP acceptance, release readiness, and deployment are outside scope.
- **Closeout:** appended E-SEA-090 and RUNBOOK handoff. No Sprint 2 acceptance checkpoint is created because this review does not recommend `PASS`. No tests, typecheck, build, application execution, provider/network request, environment/secret access, raw sample inspection, source changes, staging, reset, cleanup, commit, push, or deployment occurred.

# TASK-SEA-R2-SPRINT02-SELECTION-LOADING-FINAL-001 — Verify selected-card clearing and close R2 acceptance

- **Version:** `1.0.0`
- **Status:** `Verified`
- **Product owner:** методист відділення теорії судноводіння навчального центру «Норд-Вест»
- **Delivery / technical owner:** виконавець проєкту
- **Date:** 2026-09-28
- **Related artifacts:** [`SPEC.md`](SPEC.md), [`SPRINT-02.md`](SPRINT-02.md), [`TASK_SPEC.md`](TASK_SPEC.md), [`EVIDENCE.md`](EVIDENCE.md), [`RUNBOOK.md`](RUNBOOK.md), [`tests/snapshot-interface.spec.ts`](tests/snapshot-interface.spec.ts), [`tests/vessel-selection.spec.ts`](tests/vessel-selection.spec.ts), [`docs/checkpoints/CHECKPOINT-22.md`](docs/checkpoints/CHECKPOINT-22.md), [`docs/checkpoints/CHECKPOINT-23.md`](docs/checkpoints/CHECKPOINT-23.md), [`docs/checkpoints/CHECKPOINT-24.md`](docs/checkpoints/CHECKPOINT-24.md), `TASK-SEA-R2-SPRINT02-FINAL-EVIDENCE-REVIEW-003`, `TASK-SEA-R2-MANUAL-ACCEPTANCE-001`, `E-SEA-051`, `E-SEA-075`, `E-SEA-077`, `E-SEA-088`–`E-SEA-091`.

## Goal and approval boundary

- **Goal:** add one deterministic mocked regression test for the only remaining identified B-13 evidence gap — transitioning from a selected demo vessel/card into loading — then reassess the approved Sprint 2 / R2 acceptance matrix using current evidence.
- **Scope:** one test-only addition for B-13 / US-05…US-08 selection-to-loading behavior; targeted execution of the existing snapshot-interface Playwright spec; final evidence synthesis limited to already-approved R2 scope and CHECKPOINT-22/23/24 records. No new product behavior or scope.
- **Approval:** Draft only. Do not edit tests or run the test until the user explicitly approves this exact contract with `continue SPRINT02-SELECTION-LOADING-FINAL-001`. Approval does not itself accept Sprint 2.

## Implementation and acceptance oracle

After exact approval, add one focused case to `tests/snapshot-interface.spec.ts` using the existing Playwright route-interception and tile-blocking helpers. The case must:

1. Navigate to the initial demo state, select a demo marker and verify its matching card is open.
2. Start one mocked `GET /api/snapshot` with a deterministic delay long enough to observe pending state; do not contact the live provider.
3. While pending, assert the button is disabled, the loading label is shown, the selected demo marker/card are removed, the base map remains, and a second click does not increase the intercepted request count.
4. Fulfill the mocked request and verify the pending state settles without restoring the stale demo selection/card.

Only the new focused test may be added to the implementation target. Do not edit application source, production configuration, package manifests, other tests, generated files, or unrelated B-14 behavior. If the test reveals a product-code failure, stop and report it; do not fix production code under this contract.

After the targeted test passes, prepare a final matrix for R2 scope (US-05…US-08, B-08…B-14, and CHECKPOINT-03's scoped result through CHECKPOINT-22). Use only the recorded task/evidence/checkpoint records and the test result from this task. Keep the live/manual evidence class distinct from local mocked tests. The exact live request duration and no-key HTTP metadata remain non-blocking unless a canonical product criterion says otherwise; do not invent thresholds.

Recommend overall bounded Sprint 2/R2 `PASS` only if the new regression assertion passes and every applicable criterion has sufficient current, internally consistent evidence. Otherwise recommend `CONTINUE WITH APPROVAL` or `HOLD`, listing the exact unresolved criterion. US-09/US-10, full MVP acceptance, release/deployment readiness, provider availability/key validity and broad user validation remain out of scope.

## Allowed paths and closeout gate

- **Contract preparation now:** append this Draft in `TASK_SPEC.md` only.
- **After exact approval:** edit only `tests/snapshot-interface.spec.ts`; read the relevant installed Next.js guide under `node_modules/next/dist/docs/` before any code edit as required by the repository instructions; inspect only the canonical records listed above and the scoped test source.
- **Targeted checks after edit:** `npx playwright test tests/snapshot-interface.spec.ts` and `git diff --check -- tests/snapshot-interface.spec.ts TASK_SPEC.md`. Do not run a build, typecheck, package install, manual app session, live request, or test against provider services. Stop if the existing Playwright setup cannot be shown to use the mocked route and block external tile traffic.
- **After reporting the exact diff, test result, and acceptance matrix:** stop for separate user disposition `continue`, `revise`, or `HOLD`. Only after a separate `continue` may this task be marked `Verified` and factual results appended to `EVIDENCE.md`/`RUNBOOK.md`. Create a Sprint 2 acceptance checkpoint only if the full R2 oracle supports `PASS` and the user's disposition explicitly accepts that bounded result; do not create one for `CONTINUE WITH APPROVAL` or `HOLD`.
- Preserve all existing modified and untracked paths; add no staging, reset, cleanup, commit, push, deployment, provider/network, environment/secret, or raw sample operations.

## Stop conditions, verification, and recovery

- Stop if the existing test harness would make an unmocked snapshot/provider request, if the expected state cannot be asserted within the test-only path, if any external request other than existing blocked tile traffic is observed, or if a product source change appears necessary.
- If the targeted test fails, report the exact failure and do not broaden the fix. A product-code remediation requires a new bounded contract and explicit approval.
- **Contract preparation check:** `git diff --check -- TASK_SPEC.md` plus focused assertions for task ID/status, exact approval gate, one-file target, mock/no-provider boundary, targeted command, final acceptance oracle, stop conditions, and recovery. Expected change now: this Draft section only.
- **Recovery:** before approval, revise or remove only this appended Draft. After implementation, preserve the test change and observed result; correct factual errors only by a superseding record. Never reset, clean, or discard shared work.
## Closeout — 2026-09-28

- **Authorization / disposition:** the user approved the exact contract with `continue SPRINT02-SELECTION-LOADING-FINAL-001` before implementation and selected `continue` after reviewing the test diff, targeted result, and PASS recommendation. The latter accepts only this bounded R2 result; US-09/US-10, full MVP acceptance, release readiness, and deployment remain out of scope.
- **Observed:** added the single scoped regression test to `tests/snapshot-interface.spec.ts`. `npx playwright test tests/snapshot-interface.spec.ts` passed all 17 tests; `git diff --check -- tests/snapshot-interface.spec.ts TASK_SPEC.md` passed with no output. The test uses a mocked snapshot response and blocks external OSM tiles; no provider/network or secret/environment access occurred.
- **Acceptance / checkpoint:** the complete bounded R2 evidence matrix supports `PASS`; `E-SEA-092` records the synthesis and `docs/checkpoints/CHECKPOINT-25.md` records the scoped acceptance decision. CHECKPOINT-22/23/24 remain scoped supporting records, not broader claims.
- **Limitations:** live request duration and no-key HTTP metadata remain uncaptured and are not separate canonical acceptance criteria. The local Playwright result proves mocked UI behavior only; it does not independently establish provider availability, key validity, provider acknowledgement, or live UI/API transport. US-09/US-10 and release/deployment readiness remain unverified/out of scope.
- **Recovery:** preserve the focused test and append-only evidence/checkpoint. Any correction must be recorded as an additional factual record; do not reset, clean, or discard shared work.
- **Handoff:** this bounded R2 acceptance task is `Verified`; no further technical or delivery action is authorized by this closeout.

# TASK-SEA-DOC-TWO-SPRINT-README-001 — Root README and Sprint 1 guide

- **Version:** `1.0.0`
- **Status:** `Verified` — bounded documentation task completed and accepted; no broader product or delivery authorization.
- **Product owner:** методист відділення теорії судноводіння навчального центру «Норд-Вест»
- **Delivery / technical owner:** виконавець проєкту
- **Date:** 2026-09-28
- **Related artifacts:** [`CLAUDE.md`](CLAUDE.md), [`SPEC.md`](SPEC.md), [`SPRINT-01.md`](SPRINT-01.md), [`SPRINT-02.md`](SPRINT-02.md), [`SPRINT-02-README.md`](SPRINT-02-README.md), [`CHECKPOINT-22`](docs/checkpoints/CHECKPOINT-22.md), [`CHECKPOINT-25`](docs/checkpoints/CHECKPOINT-25.md), [`EVIDENCE.md`](EVIDENCE.md), [`RUNBOOK.md`](RUNBOOK.md).

## Goal and approval boundary

- **Goal:** rename the existing root R1 guide to `SPRINT-01-README.md` and create a new root `README.md` that serves as a concise project landing page summarizing verified Sprint 1 and bounded Sprint 2 outcomes.
- **Scope:** documentation/navigation only. The new landing page links to the detailed R1 guide, both sprint contracts, the Sprint 2 retrospective, and canonical acceptance/evidence records. This does not change product scope, sprint acceptance, implementation, or canonical evidence paths.
- **Approval / disposition:** the user approved this exact contract with `continue README-TWO-SPRINTS-001` before the README changes and selected `continue` after reviewing the exact diff and checks. This accepts only this bounded documentation task; it does not authorize changes to product scope, other project records, tests, runtime, provider/network, commit, push, or deployment.

## Owner, paths, and preservation

- **Contract preparation now:** append this section in `TASK_SPEC.md` only.
- **After exact approval — allowed paths:** `README.md` (the new landing page), `SPRINT-01-README.md` (rename of the current root guide with only necessary self-identification/artifact-tree updates), and this section of `TASK_SPEC.md` only for task closeout after review.
- **Read-only inputs:** `CLAUDE.md`, `SPEC.md`, `SPRINT-01.md`, `SPRINT-02.md`, the current root `README.md`, `SPRINT-02-README.md`, `docs/checkpoints/CHECKPOINT-22.md`, `docs/checkpoints/CHECKPOINT-25.md`, and relevant entries in `EVIDENCE.md` and `RUNBOOK.md`.
- **Excluded paths:** all nested README files and sprint catalogs; `SPRINT-01.md`, `SPRINT-02.md`, `SPRINT-02-README.md`, checkpoints, `EVIDENCE.md`, `RUNBOOK.md`, decisions, `README.pdf`, images, samples, references, application/source/tests/configuration, generated files and all other paths. Do not rewrite historical records.
- Preserve all existing modified, staged, deleted, and untracked paths, including the current README/TASK_SPEC changes and untracked Sprint 2 retrospective/PDF, live samples, and `reference/`. Do not stage, reset, clean, overwrite, commit, push, or deploy.

## Content contract and acceptance criteria

- The existing root R1 guide is preserved under `SPRINT-01-README.md`; update its self-identification and artifact-tree entry to the new filename, keeping valid relative asset and document links.
- The new root `README.md` identifies the project and summarizes:
  - Sprint 1 as `DONE / Verified`, with B-01…B-07 accepted; link to `SPRINT-01.md` and the renamed R1 guide for full scope/run instructions.
  - Sprint 2 as bounded `PASS / VERIFIED` only for US-05…US-08, B-08…B-14, and the defined CHECKPOINT-03 criteria; link to CHECKPOINT-25 as the authoritative result and to `SPRINT-02.md` for the contract.
  - `SPRINT-02-README.md` as a `Draft` descriptive companion, not evidence or a replacement for the sprint contract/checkpoints.
  - Evidence boundaries: one bounded live capture and matching sample/provenance do not establish provider acknowledgement, key validity, general availability, or an independently evidenced live UI/API end-to-end path; mocked/local tests, static review, screenshot-visible facts, and user-reported observations remain distinct.
  - CHECKPOINT-22 supersedes the original CHECKPOINT-03 `HOLD` only for its defined criteria; Sprint 3 remains waiting for MVP input and unauthorized.
  - The bounded R2 result is not full MVP acceptance, release readiness, or deployment approval.
- New root links resolve. Statuses, scope and limitations match canonical records; no unsupported implementation, live, release, or user-validation claim is introduced.
- The landing page stays an overview and directs readers to the detailed sprint and evidence sources rather than duplicating their full content.

## Verification, stop conditions, and recovery

- **Contract preparation check:** inspect the exact appended task section and run `git diff --check -- TASK_SPEC.md`. Expected change now: this Draft section only. Stop here and request the exact approval above.
- **After approval:** inspect the allowed-path diff, verify root Markdown links and image references, search textual references to distinguish root README from nested/historical references, cross-check claims against canonical sources, and run `git diff --check` plus a focused Markdown/internal-link check. No app tests/build, network/provider operation, or secret/environment access is needed or allowed.
- **Stop conditions:** stop if implementing the requested role/path change requires editing a path outside this contract, canonical acceptance claims conflict, or a link/evidence boundary cannot be verified. Preserve `Unknown` and report the gap; do not silently broaden scope.
- **Human checkpoint:** after showing the exact diff and checks, stop for `continue`, `revise`, or `HOLD`. No subsequent changes are authorized by this task without a new bounded approval.
- **Recovery:** before approval, revise or remove only this appended Draft section. After approval, if rejected or checks fail, inspect the diff and restore only task-owned README changes to the pre-task state; preserve all unrelated changes and historical records. Never use a destructive reset or cleanup.

## Closeout — 2026-09-28

- **Authorization / disposition:** the user approved this exact contract with `continue README-TWO-SPRINTS-001` and selected `continue` after reviewing the README changes and verification results.
- **Observed:** the new root `README.md` is a two-sprint overview; the former root guide is present as `SPRINT-01-README.md`. The R1 guide's original content was preserved, with the title and artifact-tree identity updated; its pre-existing R2 status edit was retained. `SPRINT-02-README.md` remains `Draft` and unchanged.
- **Verification:** `git diff --check -- TASK_SPEC.md` and `git diff --check -- README.md TASK_SPEC.md` passed. Focused assertions against `SPRINT-01.md`, `CHECKPOINT-22.md`, `CHECKPOINT-25.md`, and the Sprint 2 retrospective passed; 20 local Markdown links across the two README files resolved, and whitespace checks passed. The first path-check command had a Python quoting syntax error; the corrected check confirmed the expected source/target file state. No application tests/build, network/provider operation, secret/environment access, staging, commit, push, or deployment occurred.
- **Evidence boundary:** no new EVIDENCE/RUNBOOK record was created because those paths were excluded by this task contract. The canonical supporting records remain `E-SEA-027`, CHECKPOINT-22, and CHECKPOINT-25. The bounded R2 result is not full MVP acceptance, release readiness, deployment approval, provider acknowledgement, key validity, or independently evidenced live UI/API end-to-end behavior.
- **Changed paths:** `README.md`, `SPRINT-01-README.md`, and this task contract/closeout in `TASK_SPEC.md`. Pre-existing modified/untracked files were preserved; no staging or commit was performed.
- **Handoff:** this bounded README task is `Verified`. No follow-on task, commit, push, or delivery action is authorized by this closeout.

# TASK-SEA-DOC-R2-RETRO-STATUS-001 — Verify Sprint 2 retrospective status

- **Version:** `1.0.0`
- **Status:** `Verified`
- **Owner:** виконавець проєкту
- **Date:** 2026-09-28
- **Related artifacts:** [`SPRINT-02-README.md`](SPRINT-02-README.md), [`CHECKPOINT-25`](docs/checkpoints/CHECKPOINT-25.md), [`TASK_SPEC.md`](TASK_SPEC.md)

## Goal and authorization

- **Goal:** replace the stale document-level `Draft` label with `Verified` in the retrospective metadata. Sprint 2's completed bounded acceptance remains stated separately in the body and is not changed.
- **Authorization:** the user explicitly requested: “онови статус ретроспективи на Verified”. This authorizes only the one-line metadata update and this task record; it does not reopen Sprint 2 or authorize other edits/delivery.

## Paths, acceptance, and verification

- **Allowed paths:** the status metadata line in `SPRINT-02-README.md`; this task section in `TASK_SPEC.md` for contract and later closeout only.
- **Read-only source:** `CHECKPOINT-25.md` confirms bounded Sprint 2 acceptance; no other content changes are required.
- **Acceptance:** the retrospective metadata reads `Status: Verified`; the Sprint 2 body status remains `ЗАВЕРШЕНО` for its approved bounded scope; no other README content changes.
- **Check:** inspect the focused diff and run `git diff --check -- SPRINT-02-README.md TASK_SPEC.md`. No application tests/build, network/provider access, secrets, staging, commit, push, or deployment.
- **Human checkpoint:** the user reviewed the status correction and then explicitly requested commit and push; this is the `continue` disposition for this change.
- **Observed:** `SPRINT-02-README.md` now labels the retrospective `Verified`; its separate Sprint 2 status remains `ЗАВЕРШЕНО` for the bounded acceptance scope.
- **Verification:** focused checks passed for the metadata, retained Sprint 2 completion statement, and whitespace; `git diff --check -- TASK_SPEC.md` passed. No application tests/build, network/provider access, or secrets were used.
- **Recovery:** if rejected, restore only the task-owned status line to its prior text; preserve all other working-tree changes.

# TASK-SEA-DOC-SPRINT-README-DELIVERY-001 — Commit and push sprint documentation

- **Version:** `1.0.0`
- **Status:** `Active`
- **Owner:** виконавець проєкту
- **Date:** 2026-09-28
- **Related artifacts:** [`README.md`](README.md), [`SPRINT-01-README.md`](SPRINT-01-README.md), [`SPRINT-02-README.md`](SPRINT-02-README.md), [`TASK_SPEC.md`](TASK_SPEC.md)

## Goal and authorization

- **Goal:** commit and push the requested completed sprint documentation on the current `sprint2` branch.
- **Authorization:** the user explicitly requested “закоміть ... та запуш” and specifically named `SPRINT-01-README.md` and `SPRINT-02-README.md`.

## Paths and delivery boundary

- **Allowed paths for this documentation commit:** `README.md`, `SPRINT-01-README.md`, `SPRINT-02-README.md`, and `TASK_SPEC.md` (the related task records and the current retrospective status).
- **Status consistency:** update only the two current-status references in root `README.md` from `Draft` to `Verified`, matching the accepted retrospective metadata. Preserve all other content.
- **Excluded:** `SPRINT-02-README.pdf`, `data/samples/live/`, `reference/`, and all other existing or untracked paths. Do not stage unrelated files, rewrite history, amend, force-push, or deploy.
- **Delivery target:** current branch `sprint2` and its configured remote `origin/sprint2`; stop if the branch or remote relationship changes, if upstream diverged, or if push cannot proceed as a fast-forward.

## Acceptance and checks

- Review the exact four-path diff, ensure the two readmes and task records are in scope, and confirm unrelated untracked paths remain untouched.
- Run `git diff --check` on the selected paths; no application tests/build, network/provider or secret/environment access.
- Create a normal commit with a concise documentation message and the required attribution trailer; push the commit to `origin/sprint2` without force.
- After verified delivery, append a factual closeout with commit/push result and observed branch state; no EVIDENCE.md/RUNBOOK.md entry is needed for this documentation delivery.

# TASK-SEA-R3-PLAN-001 — Authorize and decompose Sprint 3

- **Version:** `1.0.0`
- **Status:** `Verified`
- **Product owner:** методист відділення теорії судноводіння навчального центру «Норд-Вест»
- **Delivery / technical owner:** виконавець проєкту
- **Date:** 2026-09-29
- **Related artifacts:** [`CLAUDE.md`](CLAUDE.md), [`SPEC.md`](SPEC.md), [`SPRINT-03.md`](SPRINT-03.md), [`docs/sprints/README.md`](docs/sprints/README.md), [`docs/decisions/DEC-001-mvp-contract.md`](docs/decisions/DEC-001-mvp-contract.md), [`docs/decisions/DEC-010-r2-sparse-snapshot-demo-fallback.md`](docs/decisions/DEC-010-r2-sparse-snapshot-demo-fallback.md), [`docs/checkpoints/CHECKPOINT-05.md`](docs/checkpoints/CHECKPOINT-05.md)

## Goal and authorization boundary

- **Goal:** formalize the user-approved US-09, test-only Sprint 3 outcome and decompose it into small, independently verifiable tasks with explicit goals, non-goals and acceptance criteria.
- **Approval:** on 2026-09-29, the user approved the SPRINT-03.md scope as the official Sprint 3 MVP input and explicitly authorized resolving governance and identifier conflicts before preparing the decomposition.
- **Scope:** documentation and governance only. This task creates/updates the Sprint 3 decision, synchronizes governing status/catalog, and structures the Sprint 3 plan. It does not implement tests or product changes and does not claim Sprint 3 acceptance.
- **SPEC outcome:** `SPEC-SEA-001 / US-09 reproducible data-integrity and movement checks`, bounded to the test-only scope approved in SPRINT-03.md.

## Allowed paths and preservation

- `TASK_SPEC.md` — this task contract and closeout only.
- `docs/decisions/DEC-012-r3-scope.md` — new decision record.
- `docs/decisions/README.md` — decision index entry and pending-decision status.
- `SPEC.md` — Sprint 3 scope/status synchronization and required version metadata.
- `CLAUDE.md` — current phase/status synchronization.
- `docs/sprints/README.md` — Sprint 3 catalog/creation-state synchronization.
- `SPRINT-03.md` — canonical Sprint 3 decomposition.
- `README.md`, `SPRINT-01-README.md`, and `docs/README.md` — current summary status only, per the user's additional approval on 2026-09-29.
- **Excluded:** source, tests, package manifests, `EVIDENCE.md`, `RUNBOOK.md`, all existing checkpoints, `.mcp.json`, `.idea/vcs.xml`, secrets, historical decision/evidence/runbook records, and unrelated paths. Preserve the pre-existing user-authored `SPRINT-03.md` content except for this explicitly authorized decomposition; preserve the unrelated `.idea/vcs.xml` modification and untracked `.mcp.json`.

## Inputs, constraints, and expected output

- **Inputs:** current approved PROJECT_BRIEF/SPEC acceptance for US-09; the user's 2026-09-29 scope approval; existing R1 Playwright/Node 22 baseline; DEC-010's existing B-14 allocation; CHECKPOINT-05 and CHECKPOINT-25 history; the sprint/decision conventions.
- **Constraint:** reuse the existing Playwright Test stack and R1 runtime baseline only. No new dependency, architecture decision, provider/network access, secret/environment access, date, or broader success metric is inferred. Stop if implementation would require one.
- **IDs:** use unique R3-qualified task IDs after repository-wide collision checks. Do not reuse B-14. Reserve the next unused checkpoint number/ID only for the future Sprint 3 result; do not create or fill that checkpoint during this planning task.
- **Expected output:** a linked decision, synchronized governance status, and Sprint 3 slices for test-oracle/fixture setup; converter cases; collector ordering/deduplication; collector limits/timing; collector failures/cancellation/resource cleanup; browser movement; browser snapshot/UI states; and independent review/closeout. Each slice has a goal, explicit non-goals, inputs/outputs, observable acceptance criteria, dependencies, allowed paths, targeted verification, checkpoint/review, stop conditions, and recovery.
- Remove stale B-07 conditional work; B-07 remains a verified R1 baseline. Keep production changes excluded unless a separate task authorizes a minimal fix for a confirmed contract discrepancy. The sprint plan does not authorize implementation; each technical slice remains separately task-gated.

## Acceptance and verification

- Sprint 3 has one observable US-09 outcome and explicit non-goals; no unrelated R2 history or acceptance is changed.
- Decision, SPEC, CLAUDE, sprint catalog, and SPRINT-03 agree on authorized scope, current status, Unknowns, and implementation gate.
- No task or checkpoint ID collides with existing records; CHECKPOINT-05 remains unchanged and the future R3 checkpoint is only referenced, not created.
- Every Sprint 3 task has simple, literal, observable acceptance criteria and a targeted verification method; automated tests use deterministic fixtures/clocks and no live provider connection.
- Markdown structure, required metadata, relative links, IDs, status/scope cross-references and `git diff --check` pass for allowed documentation paths. No runtime command or product test is required or claimed.

## Checkpoint, stop conditions, and recovery

- **Checkpoint:** after governance/doc checks, present exact changed paths, diff, observed checks, unresolved Unknowns, and rollback note for human review. Do not create the future Sprint 3 acceptance checkpoint during planning.
- **Stop if:** the approved test-only outcome conflicts with an existing approved contract; an unused ID cannot be established; a new dependency/architecture or production feature is required; or a required product decision remains Unknown. Preserve unresolved items as `Unknown`/`Needs approval`.
- **Recovery:** if the documentation diff is rejected, restore only this task's changes in the allowed paths after review. Preserve historical records, staged/unstaged user changes, and untracked files. No reset, clean, provider access, or deployment is authorized. On 2026-09-29, the user explicitly authorized committing and pushing the ready task-owned documentation paths after review; exclude `.idea/vcs.xml`, `.mcp.json`, and any other unrelated paths.

## Closeout — 2026-09-29

- **Authorization / disposition:** the user explicitly instructed to commit and push the completed work after the documentation checkpoint review.
- **Observed:** Sprint 3 governance, decision record, canonical decomposition, and current summary/status references were updated within the allowed documentation paths. Nine bounded R3 tasks have explicit goals, non-goals, inputs/outputs, dependencies, allowed paths, acceptance criteria, targeted checks, checkpoints/reviews, stop conditions, and recovery paths.
- **Verification:** `git diff --check` and staged `git diff --cached --check` passed. Structural checks passed for Markdown links/whitespace/final newlines, all nine task IDs/required fields, and the reserved CHECKPOINT-26 boundary. No application test, build, runtime, provider, or secret/environment command was run or claimed.
- **Delivery:** commit `f66ef56` (`docs(r3): authorize and decompose Sprint 3`) was created and pushed to `origin/sprint3`. `.idea/vcs.xml` and `.mcp.json` were excluded and preserved.
- **Limitations:** this verifies the bounded documentation/governance result only. R3 implementation, runtime acceptance, full MVP acceptance, release readiness, and deployment remain unverified and unauthorized by this task. No `EVIDENCE.md` or `RUNBOOK.md` entry was added because no runtime verification was performed.
- **Recovery:** the documentation is pushed. Make any correction in a new reviewed bounded change; do not rewrite history or discard unrelated local changes. A remote revert requires explicit owner authorization.
- **Handoff:** this planning task is `Verified`. Each R3 implementation slice still requires its own reviewed bounded `TASK_SPEC.md` contract and explicit approval.

# TASK-SEA-R3-TEST-001 — Playwright project boundary and test oracle

- **Version:** `1.0.0`
- **Status:** `Verified`
- **Product owner:** методист відділення теорії судноводіння навчального центру «Норд-Вест»
- **Delivery / technical owner:** виконавець проєкту
- **Date:** 2026-09-29
- **Related artifacts:** [`SPRINT-03.md`](SPRINT-03.md), [`docs/decisions/DEC-012-r3-scope.md`](docs/decisions/DEC-012-r3-scope.md), [`playwright.config.ts`](playwright.config.ts), [`tests/position-report-transformer.spec.ts`](tests/position-report-transformer.spec.ts), [`tests/snapshot-collector.spec.ts`](tests/snapshot-collector.spec.ts), [`data/samples/position-report.sample.json`](data/samples/position-report.sample.json)

## Goal and authorization boundary

- **Goal:** establish the Playwright project boundary and record the independent literal-oracle mapping needed by later R3 test tasks.
- **Current state:** the existing configuration has only the `chromium` project.
- **Approval:** on 2026-09-29, after this exact contract was presented for review, the user instructed `продовжуй`; this is recorded as approval of the bounded R3-T01 contract.
- **Authorized bounded slice:** add a `node` project for the converter and collector specs while preserving browser specs in `chromium`. This task does not authorize any later R3 test task or product-code change.

## Inputs and expected output

- **Inputs:** the approved US-09 scope and task definitions in `SPRINT-03.md`; DEC-012; current Playwright configuration and direct specs; saved synthetic sample.
- **Expected output:** a `node`/`chromium` test-project map and a literal-oracle map for subsequent R3 test scenarios, with synthetic fixtures identified as synthetic. Detailed case expectations remain defined by their bounded acceptance criteria in `SPRINT-03.md`.
- **Dependencies:** none.

## Constraints and allowed paths

- Reuse the existing Playwright Test and Node.js 22 baseline. No new runner, dependency, package script, runtime, or architecture is in scope.
- **Allowed implementation paths after approval:** `playwright.config.ts`, `tests/position-report-transformer.spec.ts`, `tests/snapshot-collector.spec.ts`.
- `data/samples/position-report.sample.json` is read-only. Product/source files, `package.json`, existing browser specs, and all unrelated paths are excluded.
- Preserve existing Chromium test behavior. `node` means these two specs are selected by the Node project without a browser fixture; it does not promise that no development server starts. `webServer` is currently configured globally; changing that boundary is excluded and requires a separate reviewed contract and approval.
- Expected values must be literal and independent of production functions. Do not infer expected results by calling the transformer, collector, or route/model implementation under test.

## Acceptance and verification

- `node` is the explicit target for `position-report-transformer.spec.ts` and `snapshot-collector.spec.ts`; `chromium` remains the target for existing browser specs and later R3 browser tasks.
- The Node project list contains only the intended direct specs; the Chromium project list retains the existing browser specs and excludes the two direct Node specs.
- The R3 scenario-to-project/oracle map is explicit, consistent with `SPRINT-03.md`, and labels synthetic inputs; no application behavior or browser behavior is changed.
- **Targeted checks, only after explicit approval:** `npx playwright test --project=node --list` and `npx playwright test --project=chromium --list`. Expected result: each command lists only the specs assigned to that project. These are planned checks, not observed results.
- Do not run Playwright or modify implementation files while this contract remains `Draft`.

## Checkpoint, stop conditions, and recovery

- **Checkpoint:** first review this exact task contract and obtain explicit user approval. After approved implementation, review the configuration diff and project lists before writing assertions for later slices.
- **Stop if:** preserving Chromium behavior or selecting only the direct specs requires a new runner/dependency, product-code change, package-manifest change, global `webServer` change, broader architecture, provider/network access, or any path outside the allowlist. Return for a separate bounded contract rather than expanding this task.
- **Recovery:** if the Draft is rejected, revise or remove only this appended section after review. After implementation approval, recover only this slice's reviewed configuration/test diff; preserve unrelated staged, unstaged, and untracked paths. No reset, clean, commit, push, or evidence/runbook update is authorized by this Draft.

## Closeout — 2026-09-29

- **Authorization / disposition:** the user reviewed the R3-T01 diff and instructed `виконай`; this is recorded as approval to accept and close this bounded task.
- **Observed change:** `playwright.config.ts` now defines a `node` project matching only `position-report-transformer.spec.ts` and `snapshot-collector.spec.ts`; `chromium` ignores those two files. The existing Chromium device configuration and global `webServer` remain unchanged. No test/source files, package manifests, or dependencies were changed.
- **Verification:** `npx playwright test --project=node --list` passed and listed 21 tests in the two intended files. `npx playwright test --project=chromium --list` passed and listed 24 tests in the existing three browser spec files, excluding the two direct Node specs. `git diff --check -- playwright.config.ts TASK_SPEC.md` passed. The two direct specs contain no `page`, `context`, or `browser` fixture references. No test cases were executed; no build or runtime check was run.
- **Limitations:** list-only output verifies project selection, not test behavior or that a future Node test run avoids the globally configured dev server. Moving `webServer` requires a separate reviewed contract and approval. No `EVIDENCE.md` or `RUNBOOK.md` update was authorized or made.
- **Recovery:** if the reviewed boundary must be reverted, restore only this task's `playwright.config.ts` diff through a new bounded reviewed change; preserve unrelated `.idea/vcs.xml` and `.mcp.json`. No reset, clean, commit, or push was performed.
- **Handoff:** R3-T01 is `Verified`. R3-T02 (converter acceptance cases) is the next planned slice and still requires its own reviewed bounded `TASK_SPEC.md` contract and explicit approval before changes.

# TASK-SEA-R3-TEST-002 — PositionReport transformer acceptance

- **Version:** `1.0.0`
- **Status:** `Verified`
- **Product owner:** методист відділення теорії судноводіння навчального центру «Норд-Вест»
- **Delivery / technical owner:** виконавець проєкту
- **Date:** 2026-09-29
- **Related artifacts:** [`SPRINT-03.md`](SPRINT-03.md), [`docs/decisions/DEC-012-r3-scope.md`](docs/decisions/DEC-012-r3-scope.md), [`TASK_SPEC.md`](TASK_SPEC.md), [`tests/position-report-transformer.spec.ts`](tests/position-report-transformer.spec.ts), [`data/samples/position-report.sample.json`](data/samples/position-report.sample.json), [`server/position-report-transformer.ts`](server/position-report-transformer.ts)

## Goal and authorization boundary

- **Goal:** complete the deterministic US-09 acceptance coverage for mapping valid PositionReport input and rejecting invalid required values or normalizing invalid optional values.
- **Scope:** add or refine assertions only in the existing transformer spec. Retain passing coverage; avoid duplicating cases already covered unless needed to make the expected value explicit and independent.
- **Approval:** on 2026-09-29, after reviewing this exact bounded contract, the user said `перевірив, продовжуй`; this is recorded as explicit approval for R3-T02 implementation.
- **Authorization boundary:** changes are limited to the single test file and criteria below. Product/source changes remain unauthorized.

## Inputs and expected output

- **Inputs:** the approved R3-T02 criteria in `SPRINT-03.md`; the existing converter spec; the saved synthetic PositionReport sample; current transformer behavior as the subject under test only.
- **Expected output:** focused deterministic assertions with literal expected values for the saved sample and the specified valid/invalid synthetic variants. Synthetic inputs must be clearly identified; do not modify the saved sample.
- **Dependencies:** `TASK-SEA-R3-TEST-001` is `Verified`.

## Constraints and allowed paths

- **Allowed implementation path after approval:** `tests/position-report-transformer.spec.ts` only.
- `data/samples/position-report.sample.json` and `server/position-report-transformer.ts` are read-only. No product-code fixes, other tests, package manifests, dependencies, provider/network access, secrets/environment access, or unrelated cleanup.
- Reuse the existing Node Playwright project and current test helpers. Expected results must be literal and must not be computed by calling the transformer or any other production function.

## Acceptance and verification

- The saved sample maps to literal `{ id: "999000001", name: "SYNTHETIC TRAINING VESSEL", lat: 51, lon: 1.45, speedKnots: 12.4, courseDeg: 123.4, timestamp: "2026-09-23T15:00:00.000Z", source: "aisstream" }`.
- Missing or whitespace-only vessel name produces `null`; speed `0` remains `0`, while `102.3`, `-1`, and missing speed produce `null`; course `360` produces `null`.
- Invalid required positions are rejected: coordinates `(91,181)`, `(95,-200)`, string-valued coordinates, missing or empty MMSI, and a timestamp that does not parse. Invalid coordinates never produce a vessel at `(0,0)`.
- All assertions pass under the Node project with no browser fixture or real-time wait.
- **Targeted check, only after explicit approval:** `npx playwright test --project=node tests/position-report-transformer.spec.ts`. Expected result: the focused spec passes. This is a planned check, not an observed result.

## Checkpoint, stop conditions, and recovery

- **Checkpoint:** before implementation, review the expected literal objects and synthetic input cases against the contract and current spec. After implementation, review the focused test diff and observed output.
- **Stop if:** an acceptance case exposes production behavior that differs from the contract, or implementation requires changing production code, the saved sample, another path, a dependency, or test semantics beyond this slice. Preserve the failure and seek a separate reviewed remediation contract; do not fix product code here.
- **Recovery:** if this Draft is rejected, revise or remove only this appended section after review. After approval, recover only this slice's own test-spec diff; preserve all unrelated staged, unstaged, and untracked paths. No commit, push, evidence/runbook update, or destructive Git command is authorized by this Draft.

## Closeout — 2026-09-29

- **Authorization / disposition:** after reviewing the R3-T02 diff, the user instructed `продовжуй`; this is recorded as acceptance of the bounded result.
- **Observed change:** added literal converter assertions for missing/whitespace-only vessel names, coordinate pairs `(91,181)` and `(95,-200)`, and speed `-1`; retained the existing exact sample mapping and required/optional field coverage. Only `tests/position-report-transformer.spec.ts` was changed for implementation.
- **Verification:** `npx playwright test --project=node tests/position-report-transformer.spec.ts` passed all 10 tests. `git diff --check -- tests/position-report-transformer.spec.ts TASK_SPEC.md` passed. No other test suite, build, or runtime check was run.
- **Limitations:** this result covers only the bounded PositionReport transformer cases; collector, browser, full MVP, live-provider, release, and deployment behavior remain unverified. No `EVIDENCE.md` or `RUNBOOK.md` update was made under this task contract.
- **Recovery:** restore only this task's test additions through a new reviewed bounded change if needed. Preserve the earlier R3-T01 config diff and unrelated `.idea/vcs.xml` / `.mcp.json`; no commit or push was performed.
- **Handoff:** R3-T02 is `Verified`. R3-T03 (collector ordering, uniqueness, and full-object replacement) is next and requires its own reviewed bounded contract and explicit approval before implementation.

# TASK-SEA-R3-TEST-003 — Snapshot collector ordering and replacement

- **Version:** `1.0.0`
- **Status:** `Verified`
- **Product owner:** методист відділення теорії судноводіння навчального центру «Норд-Вест»
- **Delivery / technical owner:** виконавець проєкту
- **Date:** 2026-09-29
- **Related artifacts:** [`SPRINT-03.md`](SPRINT-03.md), [`docs/decisions/DEC-012-r3-scope.md`](docs/decisions/DEC-012-r3-scope.md), [`TASK-SEA-R3-TEST-001` project-boundary contract](TASK_SPEC.md), [`TASK-SEA-R3-TEST-002` converter contract](TASK_SPEC.md), [`tests/snapshot-collector.spec.ts`](tests/snapshot-collector.spec.ts), [`server/snapshot-collector.ts`](server/snapshot-collector.ts)

## Goal and authorization boundary

- **Goal:** verify that the snapshot collector retains one latest complete vessel per MMSI, applies the existing equal-timestamp first-accepted rule, and replaces prior vessel fields rather than merging stale values.
- **Current state:** R3-T01 and R3-T02 are `Verified`. The existing collector spec covers duplicate counts, latest-vs-later-arriving-older reports, and equal timestamps; the required explicit replacement of a named vessel by a complete object with `name: null` remains to be verified.
- **Approval:** on 2026-09-29, after reviewing this exact bounded contract, the user said `продовжуй`; this is recorded as approval for R3-T03 implementation.
- **Authorization boundary:** changes are limited to `tests/snapshot-collector.spec.ts` and the acceptance criteria below. Product/source changes remain unauthorized.

## Inputs and expected output

- **Inputs:** the approved R3-T03 acceptance criteria in `SPRINT-03.md`; the existing collector spec, fake reader/timer helpers, and its synthetic message builder; current collector behavior as the subject under test only.
- **Expected output:** deterministic collector assertions using the existing fake source/timer seams and literal expected vessel/result values. Synthetic messages and mutations are identified as synthetic; no live reader/provider is used.
- **Dependencies:** `TASK-SEA-R3-TEST-001` and `TASK-SEA-R3-TEST-002` are `Verified`.

## Constraints and allowed paths

- **Allowed implementation path after approval:** `tests/snapshot-collector.spec.ts` only.
- `server/snapshot-collector.ts`, `server/position-report-transformer.ts`, `server/aisstream-reader.ts`, and all sample files are read-only. No product-code fixes, other test files, package manifests, dependencies, live sockets/provider, network access, secrets/environment access, or unrelated cleanup.
- Reuse the current Playwright `node` project, fake reader, fake timer, and synthetic message helper. Do not derive expected values by calling the transformer/collector or using collector constants as expected results.

## Acceptance and verification

- Repeated identical messages for one MMSI produce exactly one vessel.
- A newer timestamp is retained even when its older-timestamp message arrives later; the test asserts the complete retained vessel against literal expected fields.
- When two reports normalize to the same timestamp, the first accepted report remains; the input and normalized timestamp are explicit literals.
- A later complete synthetic report with the same MMSI and no usable vessel name replaces the previous object: expected `name` is literal `null`, newer fields are asserted, and stale values from the earlier object (including optional motion fields omitted by the later report) do not remain.
- All expected vessel/result fields are literal and independent of production logic; test paths do not use a live WebSocket or browser fixture and contain no real-time wait.
- **Targeted check, only after explicit approval:** `npx playwright test --project=node tests/snapshot-collector.spec.ts`. Expected result: the focused spec passes. This is a planned check, not an observed result.

## Checkpoint, stop conditions, and recovery

- **Checkpoint:** before implementation, review the exact synthetic input order, timestamps after normalization, and complete expected vessel objects. After implementation, review the collector-spec diff and actual focused-test output.
- **Stop if:** any case indicates a production mismatch, requires changing freshness/tie rules or the vessel schema, or needs changes outside the single allowed test file. Preserve the failure and request a separate reviewed remediation contract; do not edit product code here.
- **Recovery:** if this Draft is rejected, revise or remove only this appended section after review. After approval, recover only this slice's test-spec diff; preserve all unrelated staged, unstaged, and untracked paths. No commit, push, evidence/runbook update, or destructive Git command is authorized by this Draft.

## Closeout — 2026-09-29

- **Authorization / disposition:** after reviewing the R3-T03 diff, the user instructed `продовжуй`; this is recorded as acceptance of the bounded result.
- **Observed change:** strengthened duplicate-message coverage to assert exactly one vessel and added a literal whole-object replacement case where a newer report has `name: null` and absent optional motion fields. Existing out-of-order freshness and equal-timestamp-first assertions remain in place. Only `tests/snapshot-collector.spec.ts` changed for this implementation.
- **Verification:** `npx playwright test --project=node tests/snapshot-collector.spec.ts` passed all 13 tests. `git diff --check -- tests/snapshot-collector.spec.ts TASK_SPEC.md` passed. No other test suite, build, or runtime check was run.
- **Limitations:** this verifies only the bounded ordering/uniqueness/replacement slice; exact collection-window and limit acceptance remains R3-T04. No `EVIDENCE.md` or `RUNBOOK.md` update was made under this task contract.
- **Recovery:** restore only the R3-T03 assertions through a new reviewed bounded change if needed. Preserve earlier R3-T01/R3-T02 changes and unrelated `.idea/vcs.xml` / `.mcp.json`; no commit or push was performed.
- **Handoff:** R3-T03 is `Verified`. R3-T04 (collection window, vessel limit, and successful completion) is next and requires its own reviewed bounded contract and explicit approval before implementation.

# TASK-SEA-R3-TEST-004 — Snapshot collector window, limit, and successful completion

- **Version:** `1.0.0`
- **Status:** `Verified`
- **Product owner:** методист відділення теорії судноводіння навчального центру «Норд-Вест»
- **Delivery / technical owner:** виконавець проєкту
- **Date:** 2026-09-29
- **Related artifacts:** [`SPRINT-03.md`](SPRINT-03.md), [`docs/decisions/DEC-012-r3-scope.md`](docs/decisions/DEC-012-r3-scope.md), [`TASK-SEA-R3-TEST-001` project-boundary contract](TASK_SPEC.md), [`TASK-SEA-R3-TEST-003` collector contract](TASK_SPEC.md), [`tests/snapshot-collector.spec.ts`](tests/snapshot-collector.spec.ts), [`server/snapshot-collector.ts`](server/snapshot-collector.ts)

## Goal and authorization boundary

- **Goal:** verify the existing collector's successful completion at the 15-second window and the 100-unique-vessel limit using the injected reader, timer, and clock.
- **Current state:** R3-T01 and R3-T03 are `Verified`. The collector spec already has basic empty-window, duplicate-input, and 100-vessel cases; this slice will make the 100/101 boundary, no-early-completion condition, 15,000 ms window, and `collectedAt` oracle explicit and independent of collector constants.
- **Approval:** on 2026-09-29, after reviewing this exact bounded contract, the user said `продовжуй`; this is recorded as approval for R3-T04 implementation.
- **Authorization boundary:** after approval, changes remain limited to the acceptance criteria below in `tests/snapshot-collector.spec.ts`. Product/source changes remain unauthorized.

## Inputs and expected output

- **Inputs:** the approved R3-T04 criteria in `SPRINT-03.md`; the existing snapshot collector spec, fake reader/timer, synthetic report builder, and injected clock; current collector behavior as the subject under test only.
- **Expected output:** deterministic assertions for limit completion, window completion, and literal completion time; no live provider, WebSocket, browser fixture, or real-time wait.
- **Dependencies:** `TASK-SEA-R3-TEST-001` and `TASK-SEA-R3-TEST-003` are `Verified`.

## Constraints and allowed paths

- **Allowed implementation path after approval:** `tests/snapshot-collector.spec.ts` only.
- `server/snapshot-collector.ts`, `server/position-report-transformer.ts`, `server/aisstream-reader.ts`, route-level B-12 tests, all other test files, sample files, and package manifests are read-only. No product-code fixes, dependency changes, live sockets/provider, network access, secrets/environment access, or unrelated cleanup.
- Reuse the existing injected fake reader/timer/clock and synthetic report helper. For R3-T04 collector assertions, use literal `100`, `101` boundary expectations, `15_000` milliseconds, and literal `collectedAt`; do not use `SNAPSHOT_VESSEL_LIMIT` or `SNAPSHOT_WINDOW_MS` as expected values or as the collector test's loop boundary. Do not globally replace `Date` or wait in real time.

## Acceptance and verification

- Exactly 100 distinct valid MMSIs reach a successful result with literal `count: 100`, exactly 100 vessels, `truncated: true`, and `reason: "limit_reached"`; send a 101st distinct report and assert its MMSI is absent from the result.
- Send 100 reports for one MMSI and demonstrate the collector has not completed at the limit: its injected window timer remains runnable after those reports. Firing that timer then returns one vessel, literal `count: 1`, `truncated: false`, and `reason: "window_elapsed"`.
- With an open subscription and no reports, assert the injected deadline is literal `15_000` ms, fire the fake timer without real-time waiting, and assert successful empty output with `count: 0` and `reason: "window_elapsed"`.
- Assert `collectedAt` against a literal ISO timestamp matching the injected clock at completion; do not compute the expected value using the clock fixture or collector output.
- Keep assertions scoped to successful collection/window behavior; do not alter the result schema, timing, vessel limit, API route behavior, or other R3-T03 acceptance cases.
- **Targeted check, only after explicit approval:** `npx playwright test --project=node tests/snapshot-collector.spec.ts`. Expected result: the focused spec passes. This is a planned check, not an observed result.

## Checkpoint, stop conditions, and recovery

- **Checkpoint:** before implementation, review the exact 100/101 inputs, fake-timer ordering, literal 15,000 ms deadline, and literal `collectedAt` oracle. After implementation, review the scoped test diff and actual focused-test output.
- **Stop if:** a case reveals a product mismatch, requires changing the 15-second window, 100-vessel limit, completion semantics, or result schema, or needs changes outside the single allowed test file. Preserve the failure and request a separate reviewed remediation contract; do not edit product code here.
- **Recovery:** if this Draft is rejected, revise or remove only this appended section after review. After approval, recover only this slice's test-spec diff; preserve all unrelated staged, unstaged, and untracked paths. No commit, push, evidence/runbook update, or destructive Git command is authorized by this Draft.

## Closeout — 2026-09-29

- **Authorization / disposition:** after reviewing the R3-T04 diff and focused test output, the user instructed `продовжуй`; this is recorded as acceptance of the bounded result.
- **Observed change:** the collector tests now use literal 100-vessel input and expected count, assert the 101st MMSI is absent, establish that 100 duplicate reports leave the window timer runnable, assert the literal 15,000 ms deadline, and compare `collectedAt` to a literal ISO timestamp matching the injected clock. Only `tests/snapshot-collector.spec.ts` changed for this implementation.
- **Verification:** `npx playwright test --project=node tests/snapshot-collector.spec.ts` passed all 13 tests. `git diff --check -- tests/snapshot-collector.spec.ts TASK_SPEC.md` passed. No other test suite, build, or runtime check was run.
- **Limitations:** this verifies only the bounded collection-window, vessel-limit, and successful-completion slice; collector failure/cancellation lifecycle and browser/UI behavior remain unverified by this task. No `EVIDENCE.md` or `RUNBOOK.md` update was made under this task contract.
- **Recovery:** restore only the R3-T04 test changes through a new reviewed bounded change if needed. Preserve prior R3-T01/R3-T03 work and unrelated `.idea/vcs.xml` / `.mcp.json`; no commit or push was performed.
- **Handoff:** R3-T04 is `Verified`. R3-T05 (collector errors, cancellation, and resource cleanup) is next and requires its own reviewed bounded contract and explicit approval before implementation.

# TASK-SEA-R3-TEST-005 — Snapshot collector errors, cancellation, and cleanup

- **Version:** `1.0.0`
- **Status:** `Verified`
- **Product owner:** методист відділення теорії судноводіння навчального центру «Норд-Вест»
- **Delivery / technical owner:** виконавець проєкту
- **Date:** 2026-09-29
- **Related artifacts:** [`SPRINT-03.md`](SPRINT-03.md), [`docs/decisions/DEC-012-r3-scope.md`](docs/decisions/DEC-012-r3-scope.md), [`TASK-SEA-R3-TEST-001` project-boundary contract](TASK_SPEC.md), [`TASK-SEA-R3-TEST-003` collector contract](TASK_SPEC.md), [`TASK-SEA-R3-TEST-004` window and limit contract](TASK_SPEC.md), [`tests/snapshot-collector.spec.ts`](tests/snapshot-collector.spec.ts), [`server/snapshot-collector.ts`](server/snapshot-collector.ts), [`server/aisstream-reader.ts`](server/aisstream-reader.ts)

## Goal and authorization boundary

- **Goal:** verify that collector failures and cancellation never become partial success, terminal outcomes clean up the reader and timer exactly once, and late events do not change a settled outcome.
- **Current state:** R3-T01, R3-T03, and R3-T04 are `Verified`. Existing tests cover a pre-subscription timeout, provider errors/disconnects, cancellation, and late terminal events, but they do not yet cover the full three-message partial-input cases, pre-open socket error mapping, post-limit provider error, and absence of pending fake timer callbacks across terminal paths.
- **Approval:** on 2026-09-29, after reviewing this exact bounded contract, the user said `продовжуй` and `схвалюю`; this is recorded as approval for R3-T05 implementation.
- **Authorization boundary:** after approval, changes remain limited to the acceptance criteria below in `tests/snapshot-collector.spec.ts`. Product/source changes remain unauthorized.

## Inputs and expected output

- **Inputs:** the approved R3-T05 criteria in `SPRINT-03.md`; existing fake reader/timer and synthetic report helper; a deterministic fake WebSocket for the pre-open error case if needed; current collector/reader behavior as the subject under test only.
- **Expected output:** deterministic lifecycle assertions for failed connection, provider error/disconnect, limit success followed by a late error, and cancellation; no live provider or network access.
- **Dependencies:** `TASK-SEA-R3-TEST-001` and `TASK-SEA-R3-TEST-003` are `Verified`. T04 has also been verified; it supplies the same existing fake timer seam but is not a product-code dependency.

## Constraints and allowed paths

- **Allowed implementation path after approval:** `tests/snapshot-collector.spec.ts` only.
- `server/snapshot-collector.ts`, `server/aisstream-reader.ts`, `server/position-report-transformer.ts`, route-level B-12 tests, all other test files, sample files, and package manifests are read-only. No product-code fixes, dependency changes, live sockets/provider, network access, secrets/environment access, or unrelated cleanup.
- Reuse the injected collector reader/timer seams and existing synthetic message builder. Any WebSocket needed to assert pre-open socket-error mapping must be a local fake supplied through the reader's existing factory seam; it must not instantiate a live socket. No real-time waits or global clock replacement.

## Acceptance and verification

- A connection that has not subscribed by the injected 15,000 ms timeout returns `{ ok: false, code: "connect_failed" }`; a fake socket `error` before `open` also maps to `connect_failed`. Assert the fake socket closes once and the collector timer has no pending callback.
- After three valid synthetic vessel reports, a provider error returns `{ ok: false, code: "provider_error" }`; a disconnect returns `{ ok: false, code: "disconnected" }`. Neither terminal result contains or resolves to a partial success snapshot.
- After the collector succeeds at the existing 100-unique-vessel limit, a subsequent provider error does not replace that success or trigger cleanup a second time.
- Aborting after subscription and partial input rejects with `SnapshotReadCancelled`, never resolves successfully, stops the reader once, clears the timer once, and leaves no pending fake timer callback.
- For each covered terminal path, assert reader/socket cleanup and timer cleanup are idempotent, with no pending fake timer callbacks after settlement; late reader events do not change the established outcome.
- Keep assertions scoped to existing collector/reader lifecycle semantics; do not alter error mapping, cancellation behavior, result schema, collection timing, or API route behavior.
- **Targeted check, only after explicit approval:** `npx playwright test --project=node tests/snapshot-collector.spec.ts`. Expected result: the focused spec passes. This is a planned check, not an observed result.

## Checkpoint, stop conditions, and recovery

- **Checkpoint:** before implementation, review the fake socket event ordering and every terminal outcome's literal error/result expectation, stop/close counts, and timer state. After implementation, review the scoped test diff and actual focused-test output.
- **Stop if:** any case reveals a product mismatch, requires changing collector/reader error semantics or lifecycle behavior, or needs changes outside the single allowed test file. Preserve the failure and request a separate reviewed remediation contract; do not edit product code here.
- **Recovery:** if this Draft is rejected, revise or remove only this appended section after review. After approval, recover only this slice's test-spec diff; preserve all unrelated staged, unstaged, and untracked paths. No commit, push, evidence/runbook update, or destructive Git command is authorized by this Draft.

## Closeout — 2026-09-29

- **Authorization / disposition:** after reviewing the R3-T05 diff and focused test output, the user instructed `продовжуй`; this is recorded as acceptance of the bounded result.
- **Observed change:** added a pending-callback count to the fake timer; a deterministic fake WebSocket pre-open error case; three-report partial-input cases for provider error/disconnect; a post-limit late-error case; and explicit no-pending-timer/once-only cleanup assertions across covered terminal paths. Only `tests/snapshot-collector.spec.ts` changed for this implementation.
- **Verification:** `npx playwright test --project=node tests/snapshot-collector.spec.ts` passed all 15 tests. `git diff --check -- tests/snapshot-collector.spec.ts TASK_SPEC.md` passed. No other test suite, build, or runtime check was run.
- **Limitations:** this verifies only the bounded collector/reader error, cancellation, and cleanup slice; browser/UI behavior and other Sprint 3 acceptance remain unverified. No `EVIDENCE.md` or `RUNBOOK.md` update was made under this task contract.
- **Recovery:** restore only the R3-T05 test changes through a new reviewed bounded change if needed. Preserve prior R3-T01–T04 work and unrelated `.idea/vcs.xml` / `.mcp.json`; no commit or push was performed.
- **Handoff:** R3-T05 is `Verified`. R3-T06 (demo movement and route end) is next and requires its own reviewed bounded contract and explicit approval before implementation.

# TASK-SEA-R3-TEST-006 — Demo vessel movement and route end

- **Version:** `1.1.0`
- **Status:** `Verified`
- **Product owner:** методист відділення теорії судноводіння навчального центру «Норд-Вест»
- **Delivery / technical owner:** виконавець проєкту
- **Date:** 2026-09-30
- **Related artifacts:** [`SPRINT-03.md`](SPRINT-03.md), [`docs/decisions/DEC-012-r3-scope.md`](docs/decisions/DEC-012-r3-scope.md), [`docs/decisions/DEC-013-r3-t06-demo-mode-test.md`](docs/decisions/DEC-013-r3-t06-demo-mode-test.md), [`TASK-SEA-R3-TEST-001` project-boundary contract](TASK_SPEC.md), [`tests/demo-movement.spec.ts`](tests/demo-movement.spec.ts), [`app/sea-map.tsx`](app/sea-map.tsx), [`app/vessel-model.ts`](app/vessel-model.ts), [`app/vessel-card.tsx`](app/vessel-card.tsx)

## Goal and authorization boundary

- **Goal:** verify the existing `demo-1` movement sequence and route-end freeze with the browser's controlled clock, without changing product behavior.
- **Current state:** R3-T01 is `Verified` and provides the Chromium test project. Source inspection confirmed that an empty successful snapshot enters snapshot mode, where fallback demo markers remain stationary; movement runs in idle-demo mode. DEC-013 approves testing the existing moving mode instead. This resolves the setup mismatch without changing product behavior; the amended implementation has now been separately approved and verified.
- **Approval:** on 2026-09-30, after review of this exact bounded implementation contract, the user instructed `продовжуй`; this is recorded as approval for the test-only implementation and its targeted check.
- **Disposition:** on 2026-09-29, the user chose `HOLD T06` under the original empty-snapshot setup. On 2026-09-30, the user approved option 2 in DEC-013 and the versioned scope synchronization, then separately approved the amended implementation contract. The bounded test passed; product behavior was not changed.
- **Authorization boundary:** implementation was limited to the new `tests/demo-movement.spec.ts` and the acceptance criteria below. Product/source changes remain unauthorized.

## Inputs and expected output

- **Inputs:** the approved R3-T06 sequence and literal values in `SPRINT-03.md`; the existing initial idle-demo mode and demo-vessel UI as the subject under test; Chromium's controlled `page.clock` and a guarded snapshot route that must receive no request.
- **Expected output:** deterministic browser assertions for the initial demo position, each two-second movement step through route end, and unchanged terminal state after one further step. No live snapshot provider or map tile request is used.
- **Dependencies:** `TASK-SEA-R3-TEST-001` browser project is `Verified`.

## Constraints and allowed paths

- **Allowed implementation path after approval:** new `tests/demo-movement.spec.ts` only.
- `app/sea-map.tsx`, `app/vessel-model.ts`, `app/vessel-card.tsx`, other tests, package manifests, and all product files are read-only. No product-code fixes, route/schema changes, dependency changes, live provider/network requests, secrets/environment access, or unrelated cleanup.
- Freeze `page.clock` before navigation at `2026-09-29T12:00:00.000Z`; start in the initial idle-demo mode and do not trigger snapshot loading. Install an `/api/snapshot` route guard that aborts and counts unexpected requests; assert the count is zero. Block external OpenStreetMap tile requests. Do not use live provider requests, `waitForTimeout`, real-time waiting, or a global clock replacement.

## Acceptance and implementation gate

- **Resolved setup mismatch:** the former setup required a successful empty `/api/snapshot` response, which moved the map to snapshot mode. Source inspection found that snapshot-mode fallback demo markers do not initialize or advance their motion states. Under approved DEC-013 option 2, T06 instead starts in the existing initial idle-demo mode and asserts no snapshot request; it does not test fallback movement.
- The Sprint 3 movement oracle remains the documented literal sequence: initial `51.00000, 1.45000`; t=2s `51.01000, 1.45000`; t=4s `51.02000, 1.46500`; t=6s `51.03000, 1.48000`; t=8s `51.04000, 1.49500`; t=10s `51.05000, 1.51000`; t=12s `51.06000, 1.52500`; t=14s `51.07000, 1.54000`; t=16s `51.08000, 1.55500`; t=18s `51.09000, 1.57000`. Its endpoint oracle remains `0 kn`, `43°`, `12:00:18 UTC`, unchanged after one further 2,000 ms tick.
- **Implementation gate:** before implementation, the user must review and explicitly approve this revised bounded contract. That approval was recorded on 2026-09-30 before the test edit and targeted command. Do not infer that the empty-snapshot fallback moves; if the initial idle-demo route fails the literal oracle, stop and retain `HOLD` without product edits.

## Checkpoint, stop conditions, and recovery

- **Checkpoint:** before implementation, review that the page clock is frozen before navigation/timers, the `/api/snapshot` route guard reports zero requests, tile requests are blocked, and every timestamp/coordinate/card value is literal. After separately approved implementation, review the scoped browser-test diff and actual targeted-test output.
- **Stop if:** the initial idle-demo route differs from any expected literal, the test requires a product change, cannot block external tile requests, the route guard sees a snapshot request, or changes outside the single new test file are required. Preserve the observed discrepancy and retain `HOLD`; do not edit product code here.
- **Recovery:** if recovery is needed, restore only this slice's new test file through a new reviewed bounded change; preserve all unrelated staged, unstaged, and untracked paths. No commit, push, evidence/runbook update, or destructive Git command was authorized or performed under this task.

### Change-control history — DEC-013 option 2 approved

On 2026-09-30, the user approved option 2 in DEC-013 and authorized the versioned contract synchronization recorded in this task. The effective R3-T06 acceptance criteria are stated above and in `SPRINT-03.md` v1.1.0. The `HOLD` selected on 2026-09-29 applied to the former empty-snapshot setup. The user later separately approved this revised bounded implementation contract; implementation and verification are recorded in the closeout below.

## Closeout — 2026-09-30

- **Authorization / disposition:** after reviewing the scoped T06 test change and targeted result, the user instructed `продовжуй`; this is recorded as acceptance of the bounded implementation.
- **Observed change:** added `tests/demo-movement.spec.ts` for initial idle-demo movement across the literal route and endpoint freeze. The test installs the controlled clock before navigation, blocks OSM tile requests, guards `/api/snapshot` and asserts zero requests, selects `demo-1`, checks each two-second coordinate, and verifies endpoint speed/course/time remain unchanged after one further tick. No product code changed.
- **Verification:** `npx playwright test --project=chromium tests/demo-movement.spec.ts` passed 1 test (645 ms; 1.3 s total). The untracked test's `git diff --no-index --check /dev/null tests/demo-movement.spec.ts` produced no whitespace diagnostics. No other test suite, build, or runtime check was run.
- **Limitations:** this verifies only the literal demo movement route and route-end freeze in initial idle-demo mode; it does not test sparse-snapshot fallback movement. T07 remains the empty-success snapshot UI case. No `EVIDENCE.md` or `RUNBOOK.md` update was made under this task contract.
- **Recovery:** restore only this slice's new test file through a new reviewed bounded change if needed; preserve prior work and unrelated staged, unstaged, and untracked paths. No commit or push was performed.
- **Handoff:** R3-T06 is `Verified`. Its dependency is satisfied for T08, but T08 was not started and still requires its own reviewed bounded contract and explicit approval. T09 remains dependent on T08.

# TASK-SEA-R3-TEST-007 — Snapshot UI error, empty, and successful states

- **Version:** `1.0.0`
- **Status:** `Verified`
- **Product owner:** методист відділення теорії судноводіння навчального центру «Норд-Вест»
- **Delivery / technical owner:** виконавець проєкту
- **Date:** 2026-09-29
- **Related artifacts:** [`SPRINT-03.md`](SPRINT-03.md), [`docs/decisions/DEC-012-r3-scope.md`](docs/decisions/DEC-012-r3-scope.md), [`TASK-SEA-R3-TEST-001` project-boundary contract](TASK_SPEC.md), [`tests/snapshot-interface.spec.ts`](tests/snapshot-interface.spec.ts), [`app/map-shell.tsx`](app/map-shell.tsx), [`app/vessel-card.tsx`](app/vessel-card.tsx)

## Goal and authorization boundary

- **Goal:** verify the existing snapshot UI's error, empty-success, and successful-vessel-with-missing-motion-data states using mocked API responses.
- **Current state:** R3-T01 is `Verified` and provides the Chromium project. R3-T06 remains on `HOLD`; T07 depends only on the browser project and is an independent test-only slice.
- **Approval:** on 2026-09-29, after reviewing this exact bounded contract, the user said `продовжуй`; this is recorded as approval for R3-T07 implementation.
- **Authorization boundary:** after approval, changes remain limited to the acceptance criteria below in `tests/snapshot-interface.spec.ts`. Product/source changes remain unauthorized.

## Inputs and expected output

- **Inputs:** the approved R3-T07 criteria in `SPRINT-03.md`; the existing snapshot-interface tests and their browser/mock patterns; literal mocked API responses for each UI state.
- **Expected output:** focused browser assertions for the visible error, empty-success, and selected-vessel card states. No live provider or external map tile request is used.
- **Dependencies:** `TASK-SEA-R3-TEST-001` Chromium project is `Verified`. R3-T06 is not a dependency for this slice.

## Constraints and allowed paths

- **Allowed implementation path after approval:** `tests/snapshot-interface.spec.ts` only.
- `app/map-shell.tsx`, `app/vessel-card.tsx`, `app/sea-map.tsx`, other tests, package manifests, and all product files are read-only. No product-code fixes, API/schema changes, dependency changes, live provider/network requests, secrets/environment access, or unrelated cleanup.
- Mock every `/api/snapshot` response and block external OpenStreetMap tile requests in every new R3 case. Do not use `waitForTimeout`, real-time waits, or browser-clock changes as a substitute for the server collector clock.
- Group every new R3 test under a title containing the exact phrase `R3 snapshot UI states`, so the targeted command excludes unrelated existing cases.

## Acceptance and verification

- **Error state:** fulfill the mocked endpoint with the supported fixed error `{ code: "connect_failed", message: "Не вдалося підключитися до джерела" }`. Assert `[data-source="none"]` displays `Даних на карті немає`, the `role="status"` text is `Не вдалося отримати дані: Не вдалося підключитися до джерела`, and there are zero `[data-vessel-id]` markers and zero `[data-vessel-card-id]` cards.
- **Empty-success state:** fulfill the mocked endpoint with status 200 and `successBody([])`. Assert the `[data-source="aisstream"]` summary includes `суден: 0`, the `role="status"` text is `За час збору позицій не отримано`, and the fallback contains three `[data-vessel-source="demo"]` markers and no `[data-vessel-source="aisstream"]` markers or card.
- **Vessel without motion data:** fulfill status 200 with one vessel whose `speedKnots` and `courseDeg` are both `null`. Click its `[data-vessel-id="<id>"]` marker; assert `[data-vessel-card-id="<id>"]` is visible, the `Швидкість` and `Курс` values each display `Немає даних`, and the selected marker (not the card) has `data-icon="neutral"`.
- Assert visible UI output for each mocked state; do not infer live-provider availability or change UI semantics.
- **Verification:** the initial `npx playwright test --project=chromium tests/snapshot-interface.spec.ts --grep "R3 snapshot UI states"` attempt selected all three cases but could not launch Chromium because the browser executable was absent; assertions did not execute. After the user authorized the local browser download, `npx playwright install chromium` completed, installing Chrome for Testing / Headless Shell `153.0.8010.12` (Playwright Chromium `v1243`), and the same targeted test command passed all 3 tests. The corresponding `--list` command selected exactly those 3 cases. `git diff --check -- tests/snapshot-interface.spec.ts TASK_SPEC.md` passed.

## Checkpoint, stop conditions, and recovery

- **Checkpoint:** before implementation, review each mocked response, the visible UI oracle, tile blocking, and the grep grouping. After implementation, review the scoped diff and actual targeted-test output.
- **Stop if:** any assertion requires product changes, a live provider, an external tile request, a real-time wait, or edits outside the single allowed test file. Preserve the observed discrepancy and request a separate reviewed remediation contract; do not edit product code here.
- **Recovery:** if this Draft is rejected, revise or remove only this appended section after review. After approval, recover only this slice's test changes; preserve all unrelated staged, unstaged, and untracked paths. No commit, push, evidence/runbook update, or destructive Git command is authorized by this Draft.

## Closeout — 2026-09-30

- **Authorization / disposition:** after reviewing the R3-T07 diff and targeted test result, the user instructed `продовжуй`; this is recorded as acceptance of the bounded result.
- **Observed change:** added three tests grouped under `R3 snapshot UI states` for the fixed API error, empty successful snapshot, and successful selected vessel with missing speed/course. Every case mocks the snapshot endpoint and blocks OSM tile requests. Only `tests/snapshot-interface.spec.ts` changed for this implementation.
- **Verification:** the targeted R3 UI test command passed all 3 tests; the grep list contained exactly those three cases; `git diff --check -- tests/snapshot-interface.spec.ts TASK_SPEC.md` passed. No other test suite, build, or runtime check was run.
- **Limitations:** this verifies only the bounded snapshot UI states. R3-T06 remains on `HOLD`; the T08 review dependency on T01–T07 is therefore incomplete, and T08/T09 have not been performed. No `EVIDENCE.md` or `RUNBOOK.md` update was made under this task contract.
- **Recovery:** restore only the R3-T07 test additions through a new reviewed bounded change if needed. Preserve prior R3-T01–T06 work and unrelated `.idea/vcs.xml` / `.mcp.json`; no commit or push was performed.
- **Handoff:** R3-T07 is `Verified`. R3-T08 depends on R3-T01…T07 and cannot proceed while T06 remains on `HOLD`; resolve the T06 scope blocker through a separately reviewed decision before starting T08. R3-T09 remains dependent on T08.

# TASK-SEA-R3-PLAN-002 — Prepare a T06 test-setup scope-change proposal

- **Version:** `1.0.0`
- **Status:** `Verified`
- **Product owner:** методист відділення теорії судноводіння навчального центру «Норд-Вест»
- **Delivery / technical owner:** виконавець проєкту
- **Date:** 2026-09-30
- **Related artifacts:** [`SPRINT-03.md`](SPRINT-03.md), [`docs/decisions/DEC-010-r2-sparse-snapshot-demo-fallback.md`](docs/decisions/DEC-010-r2-sparse-snapshot-demo-fallback.md), [`docs/decisions/DEC-012-r3-scope.md`](docs/decisions/DEC-012-r3-scope.md), proposed [`DEC-013`](docs/decisions/DEC-013-r3-t06-demo-mode-test.md), [`TASK-SEA-R3-TEST-006` T06 contract](TASK_SPEC.md)

## Goal and authorization boundary

- **Goal:** prepare a reviewable change-control proposal that makes the R3-T06 movement oracle testable in the existing moving demo mode without changing product behavior.
- **Current state:** the R3-T06 empty-snapshot setup enters snapshot mode, where supplemental demo markers are stationary; DEC-010 explicitly preserves stationary fallback markers and unchanged idle-demo motion. T06 is on `HOLD` pending this scope decision.
- **Approval:** on 2026-09-30, the user selected `Reopen T06 scope`, authorizing preparation of a decision proposal and proposed task-contract amendment only.
- **Authorization boundary:** proposal documents only. This does not authorize updating the effective Sprint 3 plan, implementing tests, changing product behavior, or closing T06.

## Inputs and expected output

- **Inputs:** the approved T06 acceptance criteria in `SPRINT-03.md`; existing behavior described by DEC-010 and read-only inspected source; T06's recorded HOLD.
- **Expected output:** a new `DEC-013` in `Draft` status plus an explicit proposed T06 test-setup amendment in this task record. The recommendation is to begin in the initial idle-demo mode, keep the literal route oracle, and not claim that sparse-snapshot fallback markers move.
- **Dependencies:** T06 blocker verified by source inspection; DEC-010 and DEC-012 are current `Ready` records.

## Constraints and allowed paths

- **Allowed paths:** `TASK_SPEC.md` and new `docs/decisions/DEC-013-r3-t06-demo-mode-test.md` only.
- Do not edit `SPRINT-03.md`, `docs/decisions/README.md`, DEC-010 or DEC-012, tests, application source, `EVIDENCE.md`, or `RUNBOOK.md` under this proposal task. Do not change the approved baseline before the user reviews and approves the decision proposal.
- Do not infer movement in snapshot mode. The proposal must preserve the exact literal route coordinates and endpoint card oracle from current R3-T06, keep the controlled page clock before navigation, block OSM tile requests, and prohibit real waits and live provider requests.

## Acceptance and verification

- DEC-013 states the mismatch, considers retaining HOLD, a test-only setup change to initial idle-demo mode, and a product behavior change; it recommends only the test-only setup revision and marks it `Draft` pending explicit user approval.
- The proposed T06 contract amendment replaces only the infeasible empty-snapshot/fallback setup with the initial moving demo state. It retains demo-1 selection, the existing literal t=0…18s route values, terminal `0 kn`/`43°`/`12:00:18 UTC`, the extra 2,000ms frozen-end assertion, tile blocking, and no-real-wait rule.
- The proposal explicitly says the T06 `HOLD` remains effective until the decision and versioned Sprint contract are approved. No tests or implementation are performed under this task.
- **Observed structural checks:** `git diff --check -- TASK_SPEC.md docs/decisions/DEC-013-r3-t06-demo-mode-test.md` passed with no output. `rg` confirmed one definition each for `TASK-SEA-R3-PLAN-002`, `TASK-SEA-R3-TEST-006`, and `DEC-013-R3-T06-DEMO-MODE-TEST`; all related local artifact paths exist. No tests or implementation commands were run.

## Checkpoint, stop conditions, and recovery

- **Checkpoint:** review DEC-013 options/rationale and the proposed T06 acceptance side-by-side with DEC-010 and current `SPRINT-03.md`; do not merge proposed criteria into effective sprint scope before user approval.
- **Stop if:** the proposed mode cannot be entered without an unapproved product change, the route oracle needs revision, or the decision requires changes to other baselines. Preserve the HOLD and ask for a bounded follow-up decision.
- **Recovery:** if rejected, remove only the DEC-013 Draft and proposed-amendment text introduced by this task; preserve the original T06 HOLD, verified T01–T05/T07 work, and unrelated working-tree changes. No implementation, tests, commit, push, evidence/runbook update, or destructive Git command is authorized here.

# TASK-SEA-R3-PLAN-003 — Synchronize approved T06 scope change

- **Version:** `1.0.0`
- **Status:** `Verified`
- **Product owner:** методист відділення теорії судноводіння навчального центру «Норд-Вест»
- **Delivery / technical owner:** виконавець проєкту
- **Date:** 2026-09-30
- **Related artifacts:** [`SPRINT-03.md`](SPRINT-03.md), [`docs/decisions/DEC-013-r3-t06-demo-mode-test.md`](docs/decisions/DEC-013-r3-t06-demo-mode-test.md), [`docs/decisions/README.md`](docs/decisions/README.md), [`DEC-010`](docs/decisions/DEC-010-r2-sparse-snapshot-demo-fallback.md), [`DEC-012`](docs/decisions/DEC-012-r3-scope.md), [`TASK-SEA-R3-TEST-006` T06 contract](TASK_SPEC.md)

## Goal and authorization boundary

- **Goal:** synchronize the user's approved option 2 from DEC-013 into versioned Sprint 3, T06, and decision-index records without changing product or test behavior.
- **Approval:** on 2026-09-30, the user explicitly selected `Схвалити варіант 2` for DEC-013; the bounded documentation synchronization plan was approved before these edits.
- **Authorization boundary:** governance documents only. This does not authorize editing or running `tests/demo-movement.spec.ts`, changing product code, completing T06, or starting T08/T09.

## Inputs and expected output

- **Inputs:** approved DEC-013 option 2; original T06 literal movement and route-end oracle; DEC-010, DEC-012, and the current Sprint 3 test-only boundary.
- **Expected output:** DEC-013 `Ready` v1.1.0; `SPRINT-03.md` v1.1.0 with a narrow T06 no-snapshot-request exception; the R3-T06 task contract v1.1.0 reflecting the same setup and retaining a separate implementation approval gate; decisions index v1.1.0 with DEC-013 catalogued as `Ready`.
- **Dependencies:** DEC-013 option 2 explicitly approved; DEC-010 and DEC-012 remain unchanged.

## Constraints and allowed paths

- **Allowed paths:** `TASK_SPEC.md`, `SPRINT-03.md`, `docs/decisions/DEC-013-r3-t06-demo-mode-test.md`, and `docs/decisions/README.md` only.
- Preserve all route coordinates, t=0…18s time steps, endpoint card values, and the extra 2,000ms frozen-end assertion exactly. Freeze `page.clock` before navigation; start in initial idle-demo mode; block OSM tiles; guard `/api/snapshot`, abort and count unexpected requests, and assert zero requests; use no live provider requests or real-time waits.
- Do not claim sparse-snapshot fallback markers move. Do not edit DEC-010, DEC-012, `SPEC.md`, application source, tests, `EVIDENCE.md`, or `RUNBOOK.md`. Preserve all pre-existing unrelated staged, unstaged, and untracked changes.
- T06 test implementation remains separately task-gated: it needs its own reviewed bounded contract and explicit approval. If initial idle-demo movement does not satisfy the literal oracle, stop and retain `HOLD`; do not change product behavior.

## Acceptance and verification

- DEC-013 records option 2 as the approved decision (`Ready`) and retains the test/product implementation boundaries.
- Sprint 3 and T06 are versioned and describe the same initial idle-demo setup and narrow no-request exception; T07 remains the empty-success UI case. **Current handoff:** the former T06 setup `HOLD` was resolved by DEC-013 and the v1.1 contract sync; T06 implementation still needs separate explicit approval; T08 cannot start until T06 is verified, and T09 remains gated on T08.
- The literal route and endpoint oracle is unchanged; local links and task/decision IDs are unique.
- **Observed verification:** `git diff --check` passed on the three tracked allowed paths; the untracked DEC-013 file passed `git diff --no-index --check`. Structural checks confirmed one declaration each for `TASK-SEA-R3-PLAN-003`, `TASK-SEA-R3-TEST-006`, and `DEC-013-R3-T06-DEMO-MODE-TEST`; all linked governance targets exist; the 10 literal route coordinates match between `SPRINT-03.md` and T06; decision status/version and zero-request route-guard wording are present. No application tests, builds, or runtime checks were run.

## Checkpoint, stop conditions, and recovery

- **Checkpoint:** review the four-file diff against DEC-013, DEC-010, DEC-012, and the original literal T06 oracle before accepting the synchronized contracts.
- **Stop if:** updating a contract would require changing route literals, product behavior, tests, or any path outside the allowed list; preserve the last approved documents and ask for a new bounded decision.
- **Recovery:** revert only the documentation edits introduced by this task, retaining the user's approval record and all pre-existing worktree changes. No commit, push, deployment, evidence/runbook update, or destructive Git command is authorized.

# TASK-SEA-R3-TEST-008 — Review findings and bounded remediation disposition

- **Version:** `1.0.0`
- **Status:** `Verified`
- **Product owner:** методист відділення теорії судноводіння навчального центру «Норд-Вест»
- **Delivery / technical owner:** виконавець проєкту
- **Date:** 2026-09-30
- **Related artifacts:** [`SPRINT-03.md`](SPRINT-03.md), [`TASK-SEA-R3-TEST-001` through `TASK-SEA-R3-TEST-007`](TASK_SPEC.md), [`DEC-012-r3-scope.md`](docs/decisions/DEC-012-r3-scope.md), [`DEC-013-r3-t06-demo-mode-test.md`](docs/decisions/DEC-013-r3-t06-demo-mode-test.md), [`docs/checkpoints/CHECKPOINT-25.md`](docs/checkpoints/CHECKPOINT-25.md)

## Goal and authorization boundary

- **Goal:** compare the approved R3-T01…T07 test/config diffs and recorded targeted outcomes with their Sprint 3/task acceptance criteria; identify findings and record a human disposition.
- **Approval / disposition:** on 2026-09-30, after review of the T08 report, the user selected `CONTINUE WITH APPROVAL`. The T04 coverage gap is accepted as an unresolved limitation for the next bounded step; no remediation is authorized by T08.
- **Authorization boundary:** read-only review of the approved T01…T07 diffs and linked contracts; record review findings and disposition in `TASK_SPEC.md` only. No source/test edits, test reruns, builds, or automatic fixes.

## Inputs and expected output

- **Inputs:** `SPRINT-03.md` v1.1.0; T01…T07 task contracts and closeouts; DEC-010, DEC-012, DEC-013; the actual test/config diffs and the previously recorded targeted command outcomes.
- **Expected output:** task-by-task findings or explicit no-finding results, evidence limitations, and a human disposition. A coverage gap is not evidence of a product defect.
- **Dependencies:** R3-T01…T07 have task records and recorded targeted outcomes; T06 is `Verified`.

## Constraints and allowed paths

- **Allowed paths:** read-only review of the approved R3-T01…T07 diffs; `TASK_SPEC.md` only for findings and disposition.
- Do not change tests, product source, configuration, `SPRINT-03.md`, `EVIDENCE.md`, or `RUNBOOK.md`; do not rerun tests or builds under T08.
- Preserve historical closeout statements as dated facts. Record any superseding current handoff separately rather than rewriting prior history.

## Acceptance and observed review

- **T01:** no acceptance mismatch found in the Node/Chromium project boundary. The recorded `--list` outcomes establish selection counts only; they do not establish test execution.
- **T02:** no test/contract mismatch found in the reviewed transformer cases; `TASK_SPEC.md` records 10 targeted tests passed.
- **T03:** no test/contract mismatch found in ordering, uniqueness, and replacement cases; `TASK_SPEC.md` records 13 targeted tests passed.
- **T04 — coverage gap:** `tests/snapshot-collector.spec.ts:367–379` checks a 100-entry result and excludes the 101st MMSI, but does not assert that all 100 returned MMSIs are distinct and match the submitted set. A duplicate/omission combination could satisfy the current assertions. This is a test-coverage gap, not a confirmed product defect. The user accepted it as an unresolved limitation under `CONTINUE WITH APPROVAL`; no remediation was made or authorized by this task.
- **T05:** no test/contract mismatch found in the reviewed terminal error, cancellation, and cleanup cases; `TASK_SPEC.md` records 15 targeted tests passed.
- **T06:** no test/contract mismatch found; the test follows DEC-013's idle-demo setup and `TASK_SPEC.md` records 1 targeted browser test passed.
- **T07:** no test/contract mismatch found in the reviewed snapshot UI cases; `TASK_SPEC.md` records 3 targeted tests passed. Its earlier T06 `HOLD` handoff was historically accurate when written; T06 is now `Verified`. Preserve the historical entry and use this T08 record as the superseding handoff.
- **Evidence limitations:** this review did not rerun tests or build. T02…T07 command outcomes are recorded summaries, not retained raw output; T01 records test-list results only. No full-suite/build outcome or `EVIDENCE.md`/`RUNBOOK.md` entry was established by this review.
- **Observed disposition:** `CONTINUE WITH APPROVAL`. T08 is `Verified` with the T04 coverage gap unresolved; this is not a Sprint `DONE` decision. T09 remains a separate bounded task and approval gate.

## Checkpoint, stop conditions, and recovery

- **Checkpoint:** human reviewed the findings and selected `CONTINUE WITH APPROVAL`; no test/product remediation was performed.
- **Stop if:** a later action would alter the T04 test, product behavior, or a path outside a separately approved bounded contract. Preserve the finding and request that contract before any edit or rerun.
- **Recovery:** no implementation diff was created under T08. Preserve this factual review record; add any correction as a dated amendment rather than rewriting accepted history.

# TASK-SEA-R3-TEST-009 — Independent review and Sprint 3 checkpoint

- **Version:** `1.0.0`
- **Status:** `Verified — bounded T09 review and handoff only`
- **Product owner:** методист відділення теорії судноводіння навчального центру «Норд-Вест»
- **Delivery / technical owner:** виконавець проєкту
- **Date:** 2026-09-30
- **Related artifacts:** [`SPRINT-03.md`](SPRINT-03.md), [`TASK-SEA-R3-TEST-001` through `TASK-SEA-R3-TEST-008`](TASK_SPEC.md), [`DEC-012-r3-scope.md`](docs/decisions/DEC-012-r3-scope.md), [`DEC-013-r3-t06-demo-mode-test.md`](docs/decisions/DEC-013-r3-t06-demo-mode-test.md), [`EVIDENCE.md`](EVIDENCE.md), [`RUNBOOK.md`](RUNBOOK.md), [`CHECKPOINT-25.md`](docs/checkpoints/CHECKPOINT-25.md), future [`CHECKPOINT-26.md`](docs/checkpoints/CHECKPOINT-26.md)

## Goal and authorization boundary

- **Goal:** obtain an independent read-only review of the approved R3 work and available verification evidence, then prepare a factual, bounded Sprint 3 handoff in the new CHECKPOINT-26.
- **Authorization:** this contract was prepared as a separate prerequisite, with the user’s authorization limited to editing `TASK_SPEC.md`. That authorization does not execute T09. T09 execution requires human review of this contract and separate explicit approval.
- **Current disposition:** T08 is `Verified` with `CONTINUE WITH APPROVAL`. The T04 test-coverage gap remains unresolved; it is not a confirmed product defect, and no remediation is authorized. Do not call Sprint 3 `DONE` on the current evidence.

## Inputs and expected output

- **Inputs:** `SPRINT-03.md` v1.1.0; task contracts and approved diffs for T01–T08; DEC-010, DEC-012, DEC-013; available command outputs; current `EVIDENCE.md`, `RUNBOOK.md`, and CHECKPOINT-25.
- **Evidence limitation:** T02–T07 command outcomes in `TASK_SPEC.md` are summaries, not retained raw outputs. T01 `--list` results establish test selection, not execution. Treat unavailable raw outputs as `Unknown`; do not reconstruct them from memory or describe task summaries as raw command output. Do not rerun tests/builds as part of this review.
- **Expected output:** findings (including explicit no-finding results where supported), evidence limitations, append-only factual evidence and delivery history, and a new `docs/checkpoints/CHECKPOINT-26.md` with a supported handoff and human exit disposition.
- **Dependencies:** T01–T08 task records and review are available; T08 disposition is recorded. The independent reviewer must be confirmed eligible before review begins.

## Constraints and allowed paths

- **Review:** read-only review of the approved R3 task contracts/diffs and available verification outputs. Reviewer must have no author-session history and no edit rights; do not assume the current author session qualifies.
- **Allowed write paths during T09 execution only:** append-only `EVIDENCE.md`; append-only `RUNBOOK.md`; create new `docs/checkpoints/CHECKPOINT-26.md`. The separate preparation of this task contract in `TASK_SPEC.md` is a prerequisite, not an addition to T09 execution paths.
- Do not edit `TASK_SPEC.md`, `SPRINT-03.md`, decision records, source, tests, configuration, or existing checkpoints during T09. Do not run tests/builds, access secrets, make provider requests, commit, push, publish, or deploy under this task.
- Preserve CHECKPOINT-05 and CHECKPOINT-25 and all pre-existing unrelated staged, unstaged, and untracked work.

## Acceptance and verification

- Reviewer independence and read-only access are confirmed before review; the review boundary and exact input revisions are recorded.
- Each finding or no-finding result is tied to an approved criterion and an inspected source. Distinguish directly observed output from task-record summaries; unsupported execution claims remain `Unknown`.
- T04’s uniqueness/full-input-set coverage gap and the absence of authorized remediation are stated accurately. No product defect, test pass, full-suite/build result, or release claim is invented.
- Append evidence only for facts observed during the authorized review; append a factual RUNBOOK handoff; create CHECKPOINT-26 with evidence links, limitations, recovery, and the human-selected exit disposition. Choose `HOLD` if missing evidence prevents a credible handoff; otherwise the continuation remains `CONTINUE WITH APPROVAL`. Do not select Sprint `DONE` while the T04 gap remains unresolved under the current contract.
- **Targeted check after authorized T09 work:** `git diff --check -- EVIDENCE.md RUNBOOK.md docs/checkpoints/CHECKPOINT-26.md`; check local links and verify each checkpoint claim against the actual available sources. No application tests or builds.

## Checkpoint, stop conditions, and recovery

- **Checkpoint:** first present this Draft contract for human review and obtain explicit T09 execution approval. After the authorized review, present the final diff, evidence limitations, and checkpoint for human disposition. Contract approval alone does not authorize a commit or push.
- **Stop if:** no reviewer meets the independence/access requirements; a required source or result is unavailable and prevents a credible handoff; a claim would exceed available evidence; scope would require another path, test rerun, product/test change, or Sprint-contract change. Preserve the current state and request a new bounded decision rather than expanding scope.
- **Recovery:** do not rewrite earlier evidence, RUNBOOK entries, or checkpoints. Record factual corrections as dated append-only amendments. Human owner decides whether to continue, revise, or hold; no destructive Git operation is authorized.

# TASK-SEA-DOC-RETRO-001 — Retrospective Sprint 3 documentation reconciliation

- **Version:** `1.0.0`
- **Status:** `Draft — prepared for human review; retrospective evidence/runbook writes require explicit approval after review`
- **Product owner:** методист відділення теорії судноводіння навчального центру «Норд-Вест»
- **Delivery / technical owner:** виконавець проєкту
- **Date:** 2026-09-30
- **Related artifacts:** [`SPEC.md`](SPEC.md), [`SPRINT-03.md`](SPRINT-03.md), [`TASK-SEA-R3-TEST-001` through `TASK-SEA-R3-TEST-009`](TASK_SPEC.md), [`DEC-012-r3-scope.md`](docs/decisions/DEC-012-r3-scope.md), [`DEC-013-r3-t06-demo-mode-test.md`](docs/decisions/DEC-013-r3-t06-demo-mode-test.md), [`EVIDENCE.md`](EVIDENCE.md), [`RUNBOOK.md`](RUNBOOK.md), [`CHECKPOINT-26.md`](docs/checkpoints/CHECKPOINT-26.md)

## Goal and authorization boundary

- **Goal:** make the recorded history of Sprint 3 tasks T01–T08 discoverable in the canonical evidence and delivery records, while preserving evidence provenance and limitations.
- **Task class:** administrative documentation reconciliation only; this does not add or authorize a Sprint 3 implementation slice, product behavior, test change, test rerun, or T04 remediation.
- **Approval gate:** this Draft records the bounded contract. Do not append retrospective records until the user has reviewed this contract and explicitly approved continuing. Approval of the plan or preparation of this Draft alone does not authorize those append operations.

## Inputs and expected output

- **Inputs:** T01–T08 task contracts and closeouts in `TASK_SPEC.md`; `SPRINT-03.md`; DEC-012 and DEC-013; Git history relevant to R3 planning and the T01–T07 changes (`d778844`, `f66ef56`, `cb5a8e7`, `946f13a`); the existing T09 record E-SEA-093, RUNBOOK handoff, and CHECKPOINT-26.
- **Source classes:** task closeouts establish what the repository records about those tasks; Git history establishes committed artifact/change history only; E-SEA-093 and CHECKPOINT-26 establish the bounded T09 review and its evidence limits. None of these sources turns a task-record summary into retained raw command output.
- **Expected output after separate approval:** one append-only retrospective record in `EVIDENCE.md` (next available ID expected: `E-SEA-094`) mapping T01–T08 to their existing task records and evidence classes, plus one dated append-only reconciliation/handoff entry in `RUNBOOK.md`. Do not duplicate or amend the existing T09 entries.
- **Evidence limitation:** T01 `--list` records selection only. T02–T07 pass counts in `TASK_SPEC.md` are recorded summaries; raw command outputs were not retained. Their execution is not independently established by this reconciliation. Full-suite and build outcomes remain `Unknown`.
- **Dependencies:** existing R3 task records, relevant Git history, E-SEA-093, and CHECKPOINT-26 are available for read-only inspection. If a claim cannot be traced to those sources, omit it or retain `Unknown`.

## Constraints and allowed paths

- **Contract preparation:** append this task contract to `TASK_SPEC.md` only.
- **Allowed write paths after the approval gate:** append one retrospective record to `EVIDENCE.md`; append one dated reconciliation/handoff entry to `RUNBOOK.md`. These are the only execution write paths.
- Do not edit prior task records, E-SEA-093, the existing T09 RUNBOOK entry, CHECKPOINT-26, `SPRINT-03.md`, decision records, source, tests, or configuration. Do not create another checkpoint.
- Do not reconstruct raw output, rerun tests/builds, access secrets or `.mcp.json`, make provider/network requests, stage, commit, push, deploy, or perform destructive Git operations.
- Preserve all pre-existing staged, unstaged, and untracked changes.

## Acceptance and verification

- The retrospective record maps T01–T08 to their existing task records and distinguishes recorded summaries, Git artifact history, and T09 review evidence.
- T01 is described as test selection only. T02–T07 counts are explicitly attributed to task-record summaries, with execution remaining `Unknown` absent raw output. No full-suite/build success or Sprint `DONE` claim is made.
- T08's recorded static-review result and unresolved T04 coverage gap are described without classifying T04 as a confirmed product defect or implying remediation. T09 remains represented by E-SEA-093 and CHECKPOINT-26.
- IDs, local links, append-only placement, source attribution, status, timestamp, limitations, recovery, and handoff are checked against the repository conventions. No unsupported claim is introduced.
- **Targeted checks after the approved documentation writes:** `git diff --check -- TASK_SPEC.md EVIDENCE.md RUNBOOK.md`; focused structural checks for unique identifiers, required fields, local links, append-only placement, and claim-to-source traceability. No application tests or builds.

## Checkpoint, stop conditions, and recovery

- **Checkpoint:** first present this Draft contract for human review. Continue to EVIDENCE/RUNBOOK only after explicit approval of this contract and its stated limits; then present the resulting documentation diff for human review and disposition.
- **Stop if:** source records conflict, a proposed claim cannot be traced, raw output would need to be reconstructed, or completing the record requires a path or action outside this contract. Keep unsupported outcomes `Unknown` and request a new bounded decision rather than expanding scope.
- **Recovery:** preserve all existing records. Correct any factual error with a dated append-only amendment; do not rewrite T01–T09 closeouts, E-SEA-093, the RUNBOOK handoff, or CHECKPOINT-26. No destructive Git operation is authorized.

# TASK-SEA-R3-T04-COVERAGE-001 — T04 complete MMSI-set assertion

- **Version:** `1.0.0`
- **Status:** `Verified`
- **Product owner:** методист відділення теорії судноводіння навчального центру «Норд-Вест»
- **Delivery / technical owner:** виконавець проєкту
- **Date:** 2026-09-30
- **Related artifacts:** [`SPEC.md`](SPEC.md), [`SPRINT-03.md`](SPRINT-03.md), [`TASK-SEA-R3-TEST-004` T04 contract](TASK_SPEC.md), [`TASK-SEA-R3-TEST-008` review finding](TASK_SPEC.md), [`TASK-SEA-R3-TEST-009` review handoff](TASK_SPEC.md), [`DEC-012-r3-scope.md`](docs/decisions/DEC-012-r3-scope.md), [`EVIDENCE.md`](EVIDENCE.md), [`CHECKPOINT-26.md`](docs/checkpoints/CHECKPOINT-26.md), [`tests/snapshot-collector.spec.ts`](tests/snapshot-collector.spec.ts)

## Goal and authorization boundary

- **Goal:** strengthen the existing T04 100-vessel test so it verifies that all returned MMSIs are distinct and that the complete returned MMSI set equals the 100 submitted MMSIs.
- **Task class:** narrowly bounded, test-only verification follow-up to the existing T04 acceptance criterion; it does not create a new Sprint 3 task, revise T04's product contract, or claim a product defect.
- **Finding:** T08/T09 review records identify a coverage gap: the current test checks 100 results and excludes the 101st MMSI, but does not assert uniqueness of all returned IDs or equality with the submitted set. This contract addresses only that assertion gap.
- **Approval gate:** this Draft records the proposed scope only. Do not edit tests or run the targeted check until the user has reviewed this contract and explicitly approved implementation and verification. Any later product change requires a separate contract and authorization.

## Inputs and expected output

- **Inputs:** the existing T04 criterion in `SPRINT-03.md`; the T04 test and helpers in `tests/snapshot-collector.spec.ts`; the T08/T09 finding and evidence limitations in `TASK_SPEC.md`, `EVIDENCE.md`, and `CHECKPOINT-26.md`; DEC-012.
- **Expected output after separate approval:** update only the existing `stops at exactly 100 unique valid vessels` test to retain its existing 100-item boundary, successful `limit_reached` result, `count`, `truncated`, and 101st-MMSI exclusion checks, and add assertions that the 100 returned MMSIs are pairwise distinct and their complete set equals the submitted 100 MMSIs. Use the expected submitted MMSI list as the test input oracle; do not derive expected values from collector output. Reuse the existing `positionReport` builder and `createAttempt` fixture; add no helper, dependency, or unrelated case.
- **Existing behavior and limits:** test-only assertions do not change the collector's behavior or prove broader product correctness. The collector implementation remains read-only. Preserve the historical T04 closeout and T08/T09 findings; do not retroactively rewrite them.
- **Dependencies:** the existing `TASK-SEA-R3-TEST-004` contract and focused collector test are available; the T04/T08/T09 records remain authoritative for their historical scope and evidence limitations.

## Constraints and allowed paths

- **Contract preparation:** append this contract to `TASK_SPEC.md` only.
- **Allowed implementation path after separate approval:** `tests/snapshot-collector.spec.ts` only. `server/snapshot-collector.ts`, other source, other tests, Sprint/decision records, configuration, package manifests, and dependencies are read-only/out of scope.
- **Allowed records after observed verification and review:** factual task closeout in this section of `TASK_SPEC.md`; append-only `EVIDENCE.md` and `RUNBOOK.md`, only after their allowed paths are included in the explicitly approved execution boundary.
- Do not modify `SPRINT-03.md`, DEC-012/013, existing T04/T08/T09 records, E-SEA-094, or CHECKPOINT-26. Do not create another checkpoint or label this work as a new T10.
- Do not run the test before implementation diff review and explicit approval of that test diff. Do not run a full suite/build, inspect secrets or `.mcp.json`, make provider/network requests, stage, commit, push, deploy, or perform destructive Git operations.
- Preserve all pre-existing staged, unstaged, and untracked changes.

## Acceptance and verification

- The test uses one 100-MMSI submitted list and asserts that returned MMSIs contain 100 distinct IDs and have exact set equality with that submitted list.
- Existing assertions remain: success, `count: 100`, `truncated: true`, `reason: 'limit_reached'`, result length 100, and exclusion of the 101st MMSI; existing reader/timer cleanup assertions remain unchanged.
- No product source or behavior, additional test scenario, unrelated assertion, dependency, or configuration changes.
- **Targeted check after separate approval and reviewed test diff:** `npx playwright test --project=node tests/snapshot-collector.spec.ts`. This verifies the focused Node collector spec only; it does not establish full-suite/build results, live-provider behavior, complete Sprint 3 acceptance, or release readiness.
- Record the exact command outcome and limitations only after it is actually observed. If the test fails, preserve the observed failure and stop; do not infer a product defect or edit product code under this task.

## Checkpoint, stop conditions, and recovery

- **Checkpoint 1:** present this Draft contract for human review. Only explicit approval authorizes the test implementation stage.
- **Checkpoint 2:** after the test-only edit, inspect the exact diff and present it for human review. Run the targeted check only after explicit approval of that diff.
- **Checkpoint 3:** after the command, present the diff and observed result for human `continue`, `revise`, or `HOLD`; append factual evidence/runbook records only within the separately approved paths.
- **Stop if:** the existing T04 criterion cannot be verified by test-only assertions; the expected MMSI set is not independent of collector output; any product behavior/source, broader cleanup, contract change, extra path, or new Sprint/decision authorization appears necessary; or the targeted check fails. Preserve Unknowns and request a new bounded task rather than expanding scope.
- **Recovery:** if the approved test diff is rejected, restore only this task's edit to `tests/snapshot-collector.spec.ts`. Preserve this contract and all historical evidence unless the human reviewer directs a factual amendment; never reset or alter unrelated/pre-existing paths. No destructive Git operation is authorized.

## Observed implementation, verification, and handoff

- **Authorization:** after review of this Draft contract, the user instructed `продовжуй` to authorize implementation. After review of the test-only diff, the user separately instructed `продовжуй` to authorize the targeted check. After review of the passing result and diff, the user instructed `продовжуй` to authorize factual closeout records.
- **Implementation:** updated only the existing 100-vessel case in `tests/snapshot-collector.spec.ts`. One 100-MMSI expected list is used for submitted reports; the returned MMSIs are asserted to contain 100 distinct IDs and to equal the submitted list. Existing boundary, limit metadata, 101st-MMSI exclusion, and cleanup assertions remain.
- **Targeted check:** `npx playwright test --project=node tests/snapshot-collector.spec.ts` — **PASS**, 15 tests passed (591 ms).
- **Diff check:** `git diff --check -- tests/snapshot-collector.spec.ts` — **PASS**, no output. Post-run `git status --short` showed the authorized test path alongside the previously present changes; no additional generated path was observed.
- **Observed outcome:** `Verified` for this bounded test-coverage follow-up. The passing focused spec demonstrates the assertions in this test under its existing Node test setup; it does not establish a broader product claim.
- **Limitations:** no full suite, build, runtime, live-provider/network check, secret access, or deployment was performed. Sprint 3 remains subject to its other acceptance gates; this task does not declare Sprint 3 `DONE` or establish release readiness.
- **Evidence / history:** `E-SEA-095` records the observed command and result; the dated RUNBOOK handoff records the bounded change and its limitations. Historical T04/T08/T09 records, E-SEA-094, and CHECKPOINT-26 remain unchanged.
- **Recovery / next action:** if a later review rejects this test-only change, revert only the change in `tests/snapshot-collector.spec.ts`. Any additional test behavior, product change, or broader verification requires a separate bounded contract and approval.

# TASK-SEA-R3-EVIDENCE-REFRESH-001 — Fresh targeted execution evidence for T02, T06, and T07

- **Version:** `1.0.0`
- **Status:** `Verified`
- **Product owner:** методист відділення теорії судноводіння навчального центру «Норд-Вест»
- **Delivery / technical owner:** виконавець проєкту
- **Date:** 2026-09-30
- **Related artifacts:** [`SPRINT-03.md`](SPRINT-03.md), [`TASK-SEA-R3-TEST-002` T02](TASK_SPEC.md), [`TASK-SEA-R3-TEST-006` T06](TASK_SPEC.md), [`TASK-SEA-R3-TEST-007` T07](TASK_SPEC.md), [`TASK-SEA-DOC-RETRO-001`](TASK_SPEC.md), [`EVIDENCE.md`](EVIDENCE.md), [`RUNBOOK.md`](RUNBOOK.md), [`E-SEA-094`](EVIDENCE.md), [`E-SEA-095`](EVIDENCE.md), [`DEC-012`](docs/decisions/DEC-012-r3-scope.md), [`DEC-013`](docs/decisions/DEC-013-r3-t06-demo-mode-test.md)

## Goal and authorization boundary

- **Goal:** obtain fresh, directly observed targeted-test outcomes for the existing T02, T06, and T07 acceptance checks whose historical command output was not retained.
- **Current evidence:** E-SEA-094 records T02, T06, and T07 pass counts as task-record summaries, with execution `Unknown` to that retrospective absent raw output. T01 `--list` establishes selection only. E-SEA-095 records a fresh passing run of the current collector spec for the bounded T04 follow-up; it does not retroactively recreate historical outputs. Do not rewrite those records or claim Sprint 3 is `DONE`.
- **Task class:** read-only targeted execution/evidence refresh for three already-approved acceptance checks. This is not a new Sprint task or T10, does not change test/product behavior, and does not resolve unrelated task-status discrepancies such as T09's current Draft status.
- **Approval gate:** this Draft defines scope only. Do not run any command below until the user has reviewed this exact contract and explicitly authorized the three targeted checks. Approval of this contract-preparation step alone is not execution authorization.

## Inputs and expected output

- **Inputs:** R3-T02, T06, and T07 contracts and acceptance criteria; their existing tests; the T01–T08 evidence limitations in E-SEA-094; the T04 follow-up evidence in E-SEA-095; and the Sprint 3 blocking checks in `SPRINT-03.md`.
- **Expected output after separate execution approval:** directly observed outcomes from these commands, recorded only after they run:
  - T02: `npx playwright test --project=node tests/position-report-transformer.spec.ts`
  - T06: `npx playwright test --project=chromium tests/demo-movement.spec.ts`
  - T07: `npx playwright test --project=chromium tests/snapshot-interface.spec.ts --grep "R3 snapshot UI states"`
- **Future closeout:** after all authorized commands finish and the user reviews the resulting facts, append one factual evidence record (next ID expected: `E-SEA-096`), one dated RUNBOOK handoff, and a factual closeout in this task section. Record each exact command and observed status/count from its actual output, environment/date, limitations, and any failure. The expected ID must be rechecked before writing. Do not describe the previous task summaries as raw output or alter historical closeouts.
- **Dependencies:** the approved R3-T02, T06, and T07 contracts and their targeted tests are present; T06 uses the DEC-013-approved idle-demo setup and T07's command isolates its three R3 cases.

## Constraints and allowed paths

- **Contract preparation:** append this Draft to `TASK_SPEC.md` only.
- **After separate execution approval:** run only the three commands above, in the listed order. No source/test/configuration edit is authorized. After observed outcomes and separate human review, the only documentation write paths proposed are this task's closeout in `TASK_SPEC.md`, append-only `EVIDENCE.md`, and append-only `RUNBOOK.md`.
- `SPRINT-03.md`, prior task closeouts, E-SEA-094/095, E-SEA-093, CHECKPOINT-26, decision records, tests, application source, package files, and configuration remain read-only. Do not reconcile T09 status or modify any historical checkpoint in this task.
- Do not install or download a browser. If a command cannot launch its configured browser, stop and report the observed blocker; request a separate contract/authorization before any installation or environment change. Do not run a full suite/build, contact the live provider, make other network requests, access secrets or `.mcp.json`, stage, commit, push, publish, deploy, or perform destructive Git operations.
- Preserve existing modified/untracked paths, including `.idea/vcs.xml` and `.mcp.json`; do not inspect `.mcp.json`.

## Acceptance and verification

- Each command is invoked only after separate explicit authorization, and the observed result is traceable to that exact command and the corresponding task criterion.
- T02 verifies only its approved transformer cases; T06 verifies only the DEC-013-approved demo movement and route-end case; T07 verifies only the three `R3 snapshot UI states` cases. Passing these checks alone does not establish all Sprint 3 gates, full-suite/build status, live-provider behavior, full MVP acceptance, or release readiness.
- All outcomes, including command errors, failed assertions, and unavailable-browser blockers, are reported faithfully. Any non-pass is a stop; do not change code or broaden the run in response.
- **Checks after future documentation closeout:** `git diff --check -- TASK_SPEC.md EVIDENCE.md RUNBOOK.md`; focused checks for unique evidence/task IDs, append-only placement, required fields, and claim-to-output traceability. No application tests/build beyond the three approved commands.

## Checkpoint, stop conditions, and recovery

- **Checkpoint 1:** present this Draft for human review; only explicit authorization of this exact contract permits the three runs.
- **Checkpoint 2:** after the runs, compare the actual output with the individual T02/T06/T07 acceptance criteria and present the observed results before making any closeout/evidence/runbook write.
- **Stop if:** any command needs an unapproved browser installation, external service, secret, source/test/configuration change, or additional path; if output differs from its task oracle; or if one command fails. Preserve the actual failure/blocker and Unknowns; do not infer a product defect or rerun an expanded suite.
- **Recovery:** contract preparation changes only this appended Draft section. After separately approved runs, recovery is limited to correcting/removing only this task's own closeout/evidence/history amendments by a new reviewed factual correction; never rewrite existing T02/T06/T07 closeouts, E-SEA-094/095, E-SEA-093, or CHECKPOINT-26. No destructive Git operation is authorized.

## Observed execution, verification, and handoff — 2026-09-30

- **Authorization:** after reviewing the exact Draft contract, the user instructed `продовжуй`; this authorized the three listed targeted runs. After reviewing their observed results, the user separately instructed `продовжуй` to authorize this factual documentation closeout.
- **T02:** `npx playwright test --project=node tests/position-report-transformer.spec.ts` — **PASS**, 10 tests passed (406 ms).
- **T06:** `npx playwright test --project=chromium tests/demo-movement.spec.ts` — **PASS**, 1 test passed (809 ms test duration; 1.5 s total).
- **T07:** `npx playwright test --project=chromium tests/snapshot-interface.spec.ts --grep "R3 snapshot UI states"` — **PASS**, 3 tests passed (1.5 s total).
- **Observed worktree:** after the three runs, `git status --short --branch` showed only the pre-existing `.idea/vcs.xml` modification, this task's `TASK_SPEC.md` modification, and pre-existing untracked `.mcp.json`; no test-generated path was observed. `.mcp.json` was not accessed.
- **Evidence / history:** `E-SEA-096` records these three directly observed results. The dated RUNBOOK entry records commands, counts, and limitations. E-SEA-094's statement about unavailable historical outputs remains an accurate account of those earlier runs; these are fresh 2026-09-30 observations, not reconstructed historical outputs.
- **Limitations:** no full suite, build, provider/network check, secret access, browser installation, or deployment was performed. T01 `--list` remains selection-only. Passing these three targeted checks does not establish every Sprint 3 gate, Sprint `DONE`, full MVP acceptance, or release readiness. T09's Draft status discrepancy remains outside this task.
- **Recovery / handoff:** preserve all historical records and the three observed outcomes. Any further verification, T09 status reconciliation, code change, or broader validation requires its own reviewed bounded contract and explicit authorization.

# TASK-SEA-R3-T09-STATUS-RECONCILE-001 — Reconcile T09 review status

- **Version:** `1.0.0`
- **Status:** `Draft — prepared for human review; changing the T09 status requires separate explicit approval`
- **Product owner:** методист відділення теорії судноводіння навчального центру «Норд-Вест»
- **Delivery / technical owner:** виконавець проєкту
- **Date:** 2026-09-30
- **Related artifacts:** [`TASK-SEA-R3-TEST-009`](TASK_SPEC.md), [`SPRINT-03.md`](SPRINT-03.md), [`E-SEA-093`](EVIDENCE.md), [`E-SEA-096`](EVIDENCE.md), [`RUNBOOK.md`](RUNBOOK.md), [`CHECKPOINT-26.md`](docs/checkpoints/CHECKPOINT-26.md)

## Goal and authorization boundary

- **Goal:** propose a narrowly scoped correction to the current T09 task status so it reflects the completed bounded independent review and handoff recorded in E-SEA-093, the T09 RUNBOOK entry, and CHECKPOINT-26.
- **Task class:** documentation status reconciliation only. It does not add or authorize a Sprint 3 implementation slice, revise product behavior, rerun tests, or change the Sprint exit decision.
- **Current state:** T09 remains `Draft` until the owner reviews and explicitly approves this contract and the bounded status correction below. Approval to prepare this Draft, including approval of the preceding plan, is not approval to change the T09 status.
- **Proposed T09 status after separate approval:** `Verified — bounded T09 review and handoff only`. This wording describes the review and handoff recorded in CHECKPOINT-26. It does not mean Sprint 3 is `DONE`, establish test execution beyond available evidence, or claim full MVP acceptance, release readiness, or deployment readiness.

## Inputs and expected output

- **Inputs:** E-SEA-093's independent review and evidence limits; the existing T09 RUNBOOK entry; CHECKPOINT-26's bounded verification and `CONTINUE WITH APPROVAL` disposition; E-SEA-096's handoff requiring a separate reconciliation contract; and the Sprint 3 task-closure and completion gates in `SPRINT-03.md`.
- **Evidence limitation:** the raw authorization transcript is not retained in the repository. E-SEA-093, RUNBOOK, and CHECKPOINT-26 record the authorization and its limited scope. CHECKPOINT-26's `Verified` applies only to bounded T09 review and handoff. Its recorded Sprint disposition is `CONTINUE WITH APPROVAL`, not `DONE`. Do not turn historical evidence limits or later targeted test runs into broader T09 or Sprint claims.
- **Expected output after separate explicit approval:** change only the `Status` metadata value under `TASK-SEA-R3-TEST-009` to the proposed wording above. Keep the T09 task body, historical evidence, RUNBOOK entry, CHECKPOINT-26, E-SEA-093, E-SEA-096, and `SPRINT-03.md` unchanged.

## Constraints and allowed paths

- **Contract preparation:** append this Draft contract to `TASK_SPEC.md` only.
- **Allowed write path after separate approval:** the `Status` metadata value for `TASK-SEA-R3-TEST-009` in `TASK_SPEC.md` only. No other field, record, or file is authorized by this contract.
- Do not edit E-SEA-093, E-SEA-096, the T09 RUNBOOK entry, CHECKPOINT-26, `SPRINT-03.md`, other task contracts, source, tests, configuration, or decision records. Do not mark Sprint 3 `DONE`.
- Do not run tests/builds, access secrets or `.mcp.json`, make provider/network requests, stage, commit, push, publish, deploy, or perform destructive Git operations.
- Preserve all pre-existing staged, unstaged, and untracked changes.

## Acceptance and verification

- The proposed status is traceable to the bounded T09 review and handoff recorded by E-SEA-093, RUNBOOK, and CHECKPOINT-26, and is consistent with CHECKPOINT-26's scope.
- The status wording does not imply that Sprint 3 is complete or alter the historical `CONTINUE WITH APPROVAL` disposition. Unverified test execution, full-suite/build results, full MVP acceptance, and release/deployment readiness remain unclaimed.
- Any later status edit occurs only after explicit owner approval of this contract and changes only the T09 `Status` metadata value.
- **Targeted check after the separately approved status edit:** inspect the focused diff to confirm only the approved T09 status value changed; run `git diff --check -- TASK_SPEC.md`. No application tests or builds.

## Checkpoint, stop conditions, and recovery

- **Checkpoint 1:** present this Draft for human review. Do not change the T09 status until the owner explicitly approves this contract and the proposed wording.
- **Checkpoint 2:** after any separately approved one-field status edit, present the focused diff and check result for human review. No commit or push is authorized.
- **Stop if:** the owner does not approve the proposed wording; the cited records no longer support it; the wording could imply Sprint `DONE` or broader verification; or reconciliation would require changing another field, path, or historical claim. Preserve the current status and request a new bounded decision rather than expanding scope.
- **Recovery:** during this contract-preparation stage, revise or remove only this appended Draft section after inspecting the diff. If a separately approved status edit is later rejected on review, recovery is limited to the T09 status field and requires human review; do not rewrite any historical evidence or unrelated work.

# TASK-SEA-R3-GATE-RECONCILE-001 — Post-T04 Sprint 3 evidence and gate reconciliation

- **Version:** `1.0.0`
- **Status:** `Verified — bounded post-T04 evidence/gate reconciliation and documentation closeout only`
- **Product owner:** методист відділення теорії судноводіння навчального центру «Норд-Вест»
- **Delivery / technical owner:** виконавець проєкту
- **Date:** 2026-09-30
- **Related artifacts:** [`SPRINT-03.md`](SPRINT-03.md), [`TASK-SEA-R3-TEST-001` through `TASK-SEA-R3-TEST-009`](TASK_SPEC.md), [`TASK-SEA-R3-T04-COVERAGE-001`](TASK_SPEC.md), [`TASK-SEA-R3-EVIDENCE-REFRESH-001`](TASK_SPEC.md), [`E-SEA-093` through `E-SEA-096`](EVIDENCE.md), [`RUNBOOK.md`](RUNBOOK.md), [`CHECKPOINT-26.md`](docs/checkpoints/CHECKPOINT-26.md), [`DEC-012-r3-scope.md`](docs/decisions/DEC-012-r3-scope.md), [`DEC-013-r3-t06-demo-mode-test.md`](docs/decisions/DEC-013-r3-t06-demo-mode-test.md)

## Goal and authorization boundary

- **Goal:** perform a bounded, read-only reconciliation of the T04 coverage finding recorded in E-SEA-093/CHECKPOINT-26 against the later test-only follow-up in E-SEA-095, then assess current Sprint 3 evidence and remaining exit gates against `SPRINT-03.md` without rewriting the historical review.
- **Task class:** documentation/evidence review only. No implementation, test execution, task-status edit, or Sprint scope change is included.
- **Current evidence boundary:** CHECKPOINT-26 records what was found at its reviewed input revision and remains a valid historical record. E-SEA-095 later records the narrowly scoped T04 assertion change and passing focused collector spec. The reconciliation must distinguish that later evidence from the earlier checkpoint and must not claim that the original finding was false at review time.
- **Approval gate:** this Draft defines a proposed review and documentation scope only. Do not begin the review or write any closeout records until the user reviews this exact contract and explicitly authorizes it. Preparation of this Draft and prior `продовжуй` instructions for other slices do not authorize this task.

## Inputs and expected output

- **Inputs:** the T01–T09 task contracts/current statuses in `TASK_SPEC.md`; the Sprint 3 blocking criteria and exit gate in `SPRINT-03.md`; E-SEA-093–096; CHECKPOINT-26; the relevant dated RUNBOOK handoffs; DEC-012 and DEC-013; and the existing T04 follow-up test diff/record as documented by E-SEA-095.
- **Review questions:** (1) whether E-SEA-095 directly addresses the specific uniqueness/full-submitted-MMSI-set gap found at the T04 review input; (2) which Sprint 3 blocking criteria are supported by current records and which remain Unknown or only supported by task-record summaries; and (3) what bounded current disposition is supported by those sources. Trace every conclusion to a source and preserve its evidence class.
- **Evidence distinctions:** E-SEA-095 is direct evidence of the scoped T04 test change and focused command result, not proof of all T04 behavior or all Sprint gates. E-SEA-096 is fresh direct evidence for T02, T06, and T07 only. E-SEA-094 records T01 selection and T02–T07 task-record summaries; Git history does not prove command execution. Do not upgrade summaries to raw output, or infer full-suite/build, live-provider, full MVP, release, or deployment outcomes.
- **Expected output after separate review approval:** a criterion-to-evidence matrix and a recommendation limited to `DONE`, `CONTINUE WITH APPROVAL`, or `HOLD` as supported by `SPRINT-03.md`. A `DONE` recommendation is permitted only if each blocking criterion has sufficient traceable evidence; otherwise state the exact remaining gate(s) and recommend continuation or hold. The human owner retains the exit decision.
- **Expected records after a further explicit closeout approval:** append one current reconciliation record to `EVIDENCE.md` (next ID expected: `E-SEA-097`, recheck uniqueness before writing); append one dated RUNBOOK handoff; and create a new `docs/checkpoints/CHECKPOINT-27.md` to record the post-E-SEA-095 state and bounded disposition. Update this task section with observed review/closeout facts only. Do not amend CHECKPOINT-26.
- **Dependencies:** E-SEA-093–096, CHECKPOINT-26, current task contracts, and Sprint 3 gate criteria are available for read-only comparison. If the sources conflict or a criterion cannot be assessed within these paths, preserve it as Unknown and stop rather than expanding scope.

## Constraints and allowed paths

- **Contract preparation:** append this Draft to `TASK_SPEC.md` only.
- **After separate review approval:** read-only inspection of the inputs listed above; no source/test execution or changes.
- **After a further explicit closeout approval:** write only this task's factual closeout in `TASK_SPEC.md`, one append-only record in `EVIDENCE.md`, one append-only entry in `RUNBOOK.md`, and new `docs/checkpoints/CHECKPOINT-27.md`.
- `CHECKPOINT-26.md`, E-SEA-093–096, prior task closeouts, `SPRINT-03.md`, decision records, source, tests, configuration, and package files remain read-only. Do not change any T01–T09 status, reconcile T09 status, modify Sprint scope/status, or mark the Sprint `DONE` as a side effect of this documentation task.
- Do not run tests, build, typecheck, application/runtime or provider/network commands; do not access secrets or `.mcp.json`; do not install dependencies; do not stage, commit, push, publish, deploy, or perform destructive Git operations.
- Preserve all pre-existing modified, staged, and untracked paths, including `.idea/vcs.xml` and `.mcp.json`; do not inspect `.mcp.json`.

## Acceptance and verification

- The review explicitly states that CHECKPOINT-26's T04 finding was accurate for its recorded review input and that E-SEA-095 is later evidence addressing that exact test-coverage gap; neither record is rewritten.
- Every Sprint 3 blocking criterion is mapped to a current source, evidence class, observed scope, and limitation. Task summaries, direct command outputs, static inspection, and Unknowns remain distinct.
- Any recommendation follows the SPRINT-03 gate and does not imply more than the available records establish. Do not infer `DONE` solely from all task statuses reading `Verified` or from the T04 follow-up pass.
- Closeout records, if separately approved, use unique IDs, correct metadata and local links, append-only placement, exact claim-to-source attribution, explicit limitations, recovery, and handoff. CHECKPOINT-27 does not replace or alter CHECKPOINT-26.
- **Targeted checks after an approved documentation closeout:** `git diff --check -- TASK_SPEC.md EVIDENCE.md RUNBOOK.md docs/checkpoints/CHECKPOINT-27.md`; focused structural checks for unique IDs, required fields, local links, append-only placement, and source attribution. No application tests or builds.

## Checkpoint, stop conditions, and recovery

- **Checkpoint 1:** present this Draft for human review; no review or closeout write occurs without explicit approval of the exact scope.
- **Checkpoint 2:** after the read-only review, present the evidence matrix, proposed disposition, limitations, and exact remaining gates. Do not write EVIDENCE/RUNBOOK/CHECKPOINT-27 until the user separately authorizes the factual closeout.
- **Checkpoint 3:** after approved closeout writes and structural checks, present the focused diff and check results for human disposition. No commit or push is authorized.
- **Stop if:** an alleged T04 conclusion needs a test rerun or code change; the evidence conflicts; any blocking criterion requires new execution; a current task/status edit or prior-record rewrite appears necessary; or the proposed disposition exceeds what the evidence supports. Record unresolved gates as Unknown and request a new bounded contract rather than expanding this task.
- **Recovery:** during contract preparation, revise or remove only this appended Draft section after inspecting the diff. After separately approved review/closeout, correct only this task's own documentation by a reviewed factual amendment; preserve E-SEA-093–096, CHECKPOINT-26, all historical task records, and unrelated worktree changes. No destructive Git operation is authorized.

## Observed closeout — 2026-09-30

- **Authorization / disposition:** after the post-T04 evidence matrix and recommendation `DONE` within the approved Sprint 3 scope were presented, the user instructed `виконуй`. This authorized the bounded factual closeout and selected the recommended `DONE` disposition. `SPRINT-03.md` and Sprint scope/status metadata were not changed.
- **Observed review:** CHECKPOINT-26's T04 coverage finding was accurate for its review input. E-SEA-095 is later evidence of the test-only correction: the 100-vessel case now asserts 100 distinct returned MMSIs and equality with the complete submitted set; the focused collector spec passed 15 tests. E-SEA-096 records fresh targeted passes for T02 (10), T06 (1), and T07 (3). Together with the current collector-spec pass for T03–T05 and T01's recorded project-selection checks, the sources support the SPRINT-03 blocking gates for the bounded test-only scope.
- **Evidence limits:** T01 `--list` verifies project test selection, not test execution. E-SEA-094's historical summaries remain summaries; E-SEA-095/E-SEA-096 provide later direct command results only for the specified focused specs. No full-suite/build, live-provider, broad user-validation, full-MVP, release, or deployment outcome is established; these are not claimed as Sprint 3 results.
- **Artifacts:** E-SEA-097, the append-only RUNBOOK handoff dated 2026-09-30, and CHECKPOINT-27 record this post-E-SEA-095 review and bounded disposition. CHECKPOINT-26 and E-SEA-093–096 remain unchanged. No T01–T09 task status was edited.
- **Verification:** `git diff --check -- TASK_SPEC.md EVIDENCE.md RUNBOOK.md` passed with no output. `git diff --no-index --check /dev/null docs/checkpoints/CHECKPOINT-27.md` produced no whitespace diagnostics (the expected non-zero diff status reflects the new untracked file). Focused structural checks passed for IDs, required metadata, local links, append-only placement, and source attribution. No application tests/build or provider/network commands were run for this closeout.
- **Worktree / recovery / handoff:** preserved pre-existing `.idea/vcs.xml` and untracked `.mcp.json`; `.mcp.json` was not accessed. No source/test/config change, staging, commit, push, deployment, or destructive Git operation occurred. Preserve prior evidence and checkpoint history; any broader verification or scope change requires its own reviewed bounded contract and explicit approval.

# TASK-SEA-R3-README-001 — Sprint 3 retrospective and root README update

- **Version:** `1.0.0`
- **Status:** `Verified — bounded README draft and root update only; companion awaits human review`
- **Product owner:** методист відділення теорії судноводіння навчального центру «Норд-Вест»
- **Delivery / technical owner:** виконавець проєкту
- **Date:** 2026-10-01
- **Related artifacts:** [`SPEC.md`](SPEC.md), [`SPRINT-03.md`](SPRINT-03.md), [`SPRINT-03-README.md`](SPRINT-03-README.md), [`SPRINT-02-README.md`](SPRINT-02-README.md), [`DEC-012-r3-scope.md`](docs/decisions/DEC-012-r3-scope.md), [`DEC-013-r3-t06-demo-mode-test.md`](docs/decisions/DEC-013-r3-t06-demo-mode-test.md), [`E-SEA-093`–`E-SEA-097`](EVIDENCE.md), [`CHECKPOINT-26.md`](docs/checkpoints/CHECKPOINT-26.md), [`CHECKPOINT-27.md`](docs/checkpoints/CHECKPOINT-27.md)

## Goal and authorization boundary

- **Goal:** create a factual descriptive retrospective companion `SPRINT-03-README.md` and update the root `README.md` to reflect the current bounded Sprint 3 outcome in CHECKPOINT-27/E-SEA-097.
- **Task class:** documentation-only summary based on existing records. Do not re-run, recreate, or imply any historical command or user-validation result.
- **Approval gate:** this Draft records proposed scope only. Do not create or edit either README until the user explicitly approves this exact task contract. Approval of a broader documentation plan is not approval of this task's final bounded paths/content.
- **Canonical boundary:** `SPRINT-03.md` remains the approved canonical Sprint 3 plan with its existing `Ready` metadata. The retrospective companion and root README are summaries, not replacements for the plan, EVIDENCE, RUNBOOK, task contracts, or checkpoints.

## Inputs and expected outputs

- **Read-only inputs:** `SPRINT-03.md`, `SPEC.md`, DEC-012/DEC-013, T01–T09 task records, E-SEA-093–097, R3 RUNBOOK entries, CHECKPOINT-26/27, and the root README plus SPRINT-01/02 companion conventions.
- **Output 1:** new root `SPRINT-03-README.md`, using the descriptive companion pattern in `SPRINT-02-README.md`. Summarize approved scope, bounded `DONE` outcome, work performed and methods, criterion/evidence map for T01–T09, T04 follow-up, DEC-013's T06 test-setup change, source links, evidence distinctions, limitations, and handoff. Set its document status to `Draft` pending human review; clearly label it as a retrospective companion, not canonical plan or evidence.
- **Output 2:** update root `README.md`'s project-status table, R3 summary, evidence-boundary text, and document links to reflect `DONE` for the test-only Sprint 3 scope and link the new companion. Preserve clear separation from full MVP acceptance, live-provider validation, release/deployment readiness, and overall product acceptance. Clarify that `SPRINT-03.md` remains the plan record with `Ready` metadata.
- **Evidence rules:** cite exact sources for reported work and observed focused checks. State that T01 `--list` confirms selection, not execution; E-SEA-095 directly records the collector spec (15 passed) and T04 set/uniqueness follow-up; E-SEA-096 directly records T02 (10), T06 (1), and T07 (3) focused passes. Do not present E-SEA-094 historical summaries as retained raw output or turn any check into full-suite/build/provider evidence.

## Constraints and allowed paths

- **Contract preparation:** append this Draft to `TASK_SPEC.md` only.
- **After explicit approval of this contract:** write only the new `SPRINT-03-README.md` and root `README.md`; the final factual closeout may update only this task's own status/closeout section in `TASK_SPEC.md`.
- `SPRINT-03.md`, `SPEC.md`, DEC-012/DEC-013, EVIDENCE, RUNBOOK, checkpoints, docs catalogs, source, tests, configuration, and package files are read-only for this task. Do not add evidence or delivery-history entries because this summary creates no new observations.
- Preserve current uncommitted modifications and untracked paths, including `.idea/vcs.xml`, EVIDENCE.md, RUNBOOK.md, TASK_SPEC.md, `.mcp.json`, and CHECKPOINT-27; do not inspect `.mcp.json` or secrets.
- No application tests, build, runtime, provider/network command, dependency install, stage, commit, push, publication, deployment, or destructive Git operation.

## Acceptance and verification

- `SPRINT-03-README.md` follows the existing R2 companion's descriptive role and metadata convention; claims are traceable to the approved Sprint scope and existing records; the bounded disposition and all limitations are explicit.
- The R3 matrix differentiates task-record/static-review evidence, T01 test selection, and fresh direct focused results in E-SEA-095/E-SEA-096. The original CHECKPOINT-26 T04 finding is described as accurate at its input revision and later addressed by E-SEA-095; CHECKPOINT-26 is not rewritten.
- Root README no longer describes R3 only as a future plan, but does not overstate `DONE` beyond the bounded test-only Sprint scope or change canonical plan status/scope.
- All new/modified Markdown local links resolve; document/task IDs are unique; required metadata and evidence references exist; `git diff --check` passes on changed tracked Markdown, with a separate whitespace check for the new untracked file.
- **Targeted verification:** Markdown/source attribution review, local-link and structure checks, and focused Git diff review only. No app tests or build.

## Checkpoint, stop conditions, and recovery

- **Checkpoint 1:** user reviews and explicitly approves this Draft contract. Do not write either README before approval.
- **Checkpoint 2:** after approval and documentation edits, present the focused diff and observed structural/whitespace checks for human review. No commit or push is authorized.
- **Stop if:** source records conflict, the wording requires asserting unverified behavior or test execution, the README update would imply broad MVP/release/deployment acceptance, or any path beyond the allowed README files/task closeout is needed.
- **Recovery:** revise only the new companion, root README, or this task's own closeout section after inspection. Preserve all prior evidence/checkpoints, canonical sprint records, and unrelated worktree changes.

## Observed closeout — 2026-10-01

- **Authorization:** after reviewing this bounded contract, the user instructed `продовжуй`, authorizing the README changes within its allowed paths.
- **Changes:** created `SPRINT-03-README.md` as a descriptive retrospective draft and updated root `README.md` to reflect `DONE` only for the bounded test-only Sprint 3 scope. The guide maps T01–T09 to their existing sources, distinguishes direct focused runs from test-selection/historical summaries, explains the T04 test-only follow-up and DEC-013 T06 setup change, and records limitations. `SPRINT-03.md`, EVIDENCE, RUNBOOK, decisions, and checkpoints were not changed by this task.
- **Human review status:** the new companion retains `Draft — descriptive retrospective companion pending human review`; its content and the root README update are presented for review. The canonical plan retains its existing `Ready` metadata.
- **Evidence limits:** the documentation summarizes existing records only. T01 `--list` proves selection rather than execution; no full-suite/build, live-provider, broad user-validation, full-MVP, release, or deployment result is inferred. No application tests/build were run for this task.
- **Worktree boundary:** preserved prior closeout changes in EVIDENCE.md, RUNBOOK.md, TASK_SPEC.md, and CHECKPOINT-27.md, plus `.idea/vcs.xml` and untracked `.mcp.json`; `.mcp.json` and secrets were not accessed. No staging, commit, push, publication, deployment, or destructive Git operation occurred.

# TASK-SEA-R3-PDF-001 — Sprint 3 retrospective PDF

- **Version:** `1.0.0`
- **Status:** `Verified — execution-focused Sprint 3 retrospective PDF created and checked`
- **Product owner:** методист відділення теорії судноводіння навчального центру «Норд-Вест»
- **Delivery / technical owner:** виконавець проєкту
- **Date:** 2026-10-01
- **Related artifacts:** [`SPRINT-03-README.md`](SPRINT-03-README.md), [`SPRINT-03.md`](SPRINT-03.md), [`CHECKPOINT-27`](docs/checkpoints/CHECKPOINT-27.md), [`E-SEA-095`–`E-SEA-097`](EVIDENCE.md)

## Goal and authorization boundary

- **Goal:** create a readable PDF derivative of the Sprint 3 retrospective companion for convenient review.
- **Source status:** `SPRINT-03-README.md` remains `Draft — descriptive retrospective companion pending human review`; the PDF must carry this draft status and must not imply human acceptance of the source.
- **Approval gate:** this contract records proposed scope only. Do not create the PDF until the user explicitly approves this exact contract. Approval of the broader plan or this Draft alone does not authorize PDF generation.
- **Outcome boundary:** `DONE` means only the bounded test-only Sprint 3 scope recorded by CHECKPOINT-27. The PDF is a formatted derivative, not canonical plan, independent evidence, or a new scope/acceptance decision.

## Inputs and expected output

- **Read-only inputs:** `SPRINT-03-README.md` as the narrative source; `CHECKPOINT-27.md` and E-SEA-095–097 for factual cross-checks; existing local PDF tooling documentation if needed.
- **Output:** new root `SPRINT-03-RETROSPECTIVE.pdf`; no overwrite if that path already exists.
- Preserve the retrospective's T01–T09 account, bounded outcome, E-SEA-095/E-SEA-096 targeted results, T04 follow-up, DEC-013 T06 test setup, historic CHECKPOINT-26 context, evidence distinctions, limitations, references, and handoff. Keep it faithful to the approved source; do not add unsupported facts.

## Constraints and allowed paths

- **Contract preparation:** append this Draft contract to `TASK_SPEC.md` only.
- **After explicit approval:** create only `SPRINT-03-RETROSPECTIVE.pdf` and update only this task's own status/closeout in `TASK_SPEC.md`.
- `SPRINT-03-README.md`, `SPRINT-03.md`, `README.md`, EVIDENCE, RUNBOOK, decisions, checkpoints, source, tests, configuration, and package files are read-only for this task.
- Use only an already available local PDF generation/inspection tool. Do not install dependencies, change project configuration, or use an online converter or external service. If no suitable local tool is available, stop and report the blocker.
- Preserve pre-existing uncommitted changes and untracked files, including `.idea/vcs.xml`, `EVIDENCE.md`, `README.md`, `RUNBOOK.md`, `TASK_SPEC.md`, `.mcp.json`, `SPRINT-03-README.md`, and `docs/checkpoints/CHECKPOINT-27.md`; do not inspect `.mcp.json` or secrets.
- Do not run application tests/build, provider/network commands, stage, commit, push, publish, deploy, or perform destructive Git operations.

## Acceptance and verification

- PDF opens/renders locally and is legible with sensible page breaks, typography, table layout, Draft status, source references, and non-claims.
- Facts are consistent with CHECKPOINT-27 and E-SEA-095–097. T01 `--list` is described as test selection, not test execution; do not imply a full-suite/build result, live-provider/network validation, broad user validation, full MVP acceptance, release readiness, or deployment readiness.
- Record the available generation/inspection tool and actual command/result. Inspect PDF text/metadata or equivalent where supported, and review the generated artifact visually if a local renderer is available. Do not claim a check that could not be performed.
- Review focused changes and whitespace/integrity checks for the generated PDF and task closeout; exclude unrelated pre-existing changes.

## Checkpoint, stop conditions, and recovery

- **Checkpoint 1:** user reviews and explicitly approves this exact Draft task contract. No PDF generation before approval.
- **Checkpoint 2:** after generation and factual/layout checks, present the PDF and actual command results for human review; no commit or push is authorized.
- **Stop if:** the source/checkpoint conflict, PDF generation requires installing or changing dependencies, the target already exists, a claim requires going beyond approved evidence, or an allowed path is insufficient.
- **Recovery:** preserve the Markdown source and existing worktree changes. If a newly generated PDF fails verification, regenerate only that task-authorized output after inspection or stop and report the blocker; do not rewrite source/evidence history.

## Observed closeout — 2026-10-01

- **Authorization:** after the Draft contract was presented, the user reiterated the direct request to create the Sprint 3 PDF and clarified that the emphasis must be on work performed and how it was carried out. This was treated as explicit authorization for the bounded PDF task.
- **Output:** created root `SPRINT-03-RETROSPECTIVE.pdf`, a three-page landscape PDF. Its opening centers the T01–T09 work/evidence matrix; the execution method and targeted commands follow, then bounded disposition, limitations, sources, and document metadata. The PDF retains the source companion's Draft/pending-review status and bounded test-only outcome.
- **Method:** used installed Playwright/Chromium and an inline local Markdown-to-HTML renderer; no dependencies were installed and no project configuration or source README was changed.
- **Verification:** `file SPRINT-03-RETROSPECTIVE.pdf` identified PDF 1.4. Local PDFKit opened the final PDF and extracted 7,066 characters across 3 pages. Normalized-text checks passed for Draft status, T01–T09 markers, E-SEA-095 and targeted pass counts (10/15/1/3), T01 selection-vs-execution language, and full-suite/deployment limitations. All three final pages were rendered with macOS PDFKit/Quartz and visually reviewed; the final layout places the work/evidence matrix first and has no orphaned source note. `git diff --check -- TASK_SPEC.md` passed with no output.
- **Verification notes:** the built-in PDF Read preview could not render because `pdftoppm` is unavailable; local PDFKit/Quartz provided page rendering. An earlier layout pass exposed a fixed-footer overlap and was regenerated. An initial text-marker check did not account for PDF line wrapping (`1` and `passed` split across lines); after whitespace normalization the check passed. No application tests, build, runtime, provider/network checks, or secret access were performed.
- **Worktree boundary:** only this task's contract/status/closeout and the requested new PDF were changed. Temporary local page-preview images were removed. Existing changes to `.idea/vcs.xml`, EVIDENCE, README, RUNBOOK, `.mcp.json`, `SPRINT-03-README.md`, and CHECKPOINT-27 were preserved; `.mcp.json` was not accessed. No staging, commit, push, publication, deployment, or destructive Git operation occurred.
- **Handoff:** PDF is available for human review. The source `SPRINT-03-README.md` remains `Draft`; this PDF does not promote it to accepted status or claim more than the bounded Sprint 3 test-only outcome.

# TASK-SEA-R4-PLAN-001 — R4 task decomposition and authorization gate

- **Version:** `1.0.0`
- **Status:** `Draft — documentation plan only; R4 implementation not authorized`
- **Product owner:** методист відділення теорії судноводіння навчального центру «Норд-Вест»
- **Delivery / technical owner:** виконавець проєкту
- **Date:** 2026-10-01
- **Related artifacts:** [`CLAUDE.md`](CLAUDE.md), [`SPEC.md`](SPEC.md), [`SPRINT-03b-CHANGE-REQUEST.md`](SPRINT-03b-CHANGE-REQUEST.md), [`SPRINT-03.md`](SPRINT-03.md), [`docs/decisions/DEC-012-r3-scope.md`](docs/decisions/DEC-012-r3-scope.md), [`docs/decisions/DEC-014-r4-scope.md`](docs/decisions/DEC-014-r4-scope.md), [`docs/decisions/DEC-004-checkpoint-convention.md`](docs/decisions/DEC-004-checkpoint-convention.md), [`docs/decisions/README.md`](docs/decisions/README.md), [`docs/sprints/README.md`](docs/sprints/README.md), [`docs/checkpoints/CHECKPOINT-06.md`](docs/checkpoints/CHECKPOINT-06.md), [`EVIDENCE.md`](EVIDENCE.md), [`RUNBOOK.md`](RUNBOOK.md)

## Goal and authorization boundary

- **Goal:** analyze the supplied R4 change request and decompose it into bounded B-18, B-19, B-20 and B-21 contracts with explicit goals, requirements, non-goals, acceptance, verification, stop/recovery and human review checkpoints.
- **Outcome:** a proposed plan in this canonical task file. The entries below are Draft contracts; they do not make R4 `Ready`, authorize code/test/README implementation, authorize provider access, authorize access to secret values, or authorize archive publication, commit, push or deployment.
- **Governance boundary:** DEC-012 authorizes only the bounded test-only R3/US-09 scope and remains unchanged. The user approved the R4 product-scope change on 2026-10-01; DEC-014 records that approval. This resolves the R4 scope-decision prerequisite but does not approve this decomposition or any B-18—B-21 implementation/acceptance task.
- **Worktree boundary:** preserve all pre-existing changes. At task preparation the known unrelated paths are `.idea/vcs.xml`, `SPRINT-02.md`, staged `SPRINT-03b-CHANGE-REQUEST.md`, untracked `.mcp.json`, and `SPRINT-03-RETROSPECTIVE.pdf`. Do not inspect `.mcp.json` or secrets and do not stage/commit/push these paths.

## R4 outcome and non-goals

**Proposed goal:** when a snapshot attempt fails or yields no vessels, retain the last displayed dataset and its honest source/time label, and separately show the latest attempt result. Only a nonempty successful response atomically replaces the displayed set.

**Request-level non-goals:** timed refresh; snapshot history or comparison; indicators that a vessel left the area; persistence of a real snapshot across page refresh; merging datasets; claiming monitoring or complete area coverage; broad refactoring, new dependencies/stack, or unapproved architecture changes.

## Ordered stages and gates

| Stage | Contract | Goal / output | Entry gate | Exit / human checkpoint |
|---|---|---|---|---|
| G0 | Governance and task authorization | Reconcile the approved R4 outcome, versioned decision and individual task boundaries; resolve prerequisites | R4 product scope and DEC-014 are approved; this decomposition still requires human review | Scope decision and task contracts have unique IDs, allowed paths and observable acceptance. Each technical task still requires its own explicit approval before execution. |
| B-18 | `TASK-SEA-R4-B18-001` | Implement only the R4 UI state/copy contract | G0 approved and B-18 contract separately approved | Targeted UI verification and diff review; no B-19 work until human disposition. |
| B-19 | `TASK-SEA-R4-B19-001` | Browser tests for new state contract | B-18 accepted; B-19 contract separately approved | All required cases pass; only explicitly changed legacy state assertions differ; movement/selection regressions stay unchanged. |
| B-20 | `TASK-SEA-R4-B20-001` | Final automated/manual/live-source and secret-boundary acceptance | B-19 accepted; exact checks and permitted manual actions approved | Report automated, manual and provider outcomes separately; source unavailability is a valid recorded outcome, not a pass for live success. |
| B-21 | `TASK-SEA-R4-B21-001` | Verified second-laptop install/start README | Target OS or approved cross-platform target is defined; B-20 commands/results available | Every command in README has an observed result; evidence limitations and unsupported setups are explicit. |
| Closeout | separately approved task | Append factual evidence/history and create unique checkpoint record | B-18—B-21 outcomes reviewed; checkpoint path/ID and any archive scope resolved | Evidence, handoff, limitations and next action are human-reviewed. No archive publication absent separate authorization. |

## Decision and documentation register

- This task is the planning source for proposed R4 work. Record each accepted task-local decision here in the relevant task’s **Decision log** table with the decision, approver, date, rationale and affected contract/version. A proposal, assumption or chat statement is not an accepted decision.
- **Accepted product-scope decision:** on 2026-10-01, the user approved the R4 B-18—B-21 product scope; `DEC-014-r4-scope.md` records the decision. This satisfies scope approval only. This decomposition remains `Draft`, and each downstream task requires its own reviewed contract and explicit approval.
- A material product/scope/stack/architecture decision must also have its own versioned `docs/decisions/DEC-<number>-<name>.md` record, with options, rationale, consequences, revisit trigger and links. Do not edit DEC-012 to rewrite R3 history.
- Append factual verification only after it occurs: `EVIDENCE.md` for observed facts and `RUNBOOK.md` for delivery/handoff. Plans, intended commands and unverified outcomes do not belong in either log.
- After every completed stage, stop for human review and `continue` / `revise` / `HOLD`. At that checkpoint, remind the owner to commit and push the reviewed stage. Do not execute either action without separate explicit authorization; isolate the stage’s paths from all pre-existing changes.

## Shared constraints, recovery and current blockers

- R4 product scope is approved by `DEC-014-r4-scope.md`; that approval does not promote this Draft decomposition or any downstream task. Every downstream contract remains `Draft` until reviewed and explicitly approved on its own. Approval of this decomposition would still not authorize implementation beyond the exact task contract approved.
- Exact allowed paths are listed per downstream contract and must be rechecked against the current tree immediately before that task. Do not expand them to accommodate incidental cleanup.
- If an acceptance criterion, environment, source, ID, secret check or path is unclear, stop and record `Unknown` / `Blocked` rather than infer a result.
- The second laptop’s OS is unspecified. B-21 must either receive the OS/prerequisites from the owner or be explicitly approved as cross-platform instructions; no OS-specific claim is made by this plan.
- The archive format, publication target and recovery owner are not defined and remain `Waiting for input`. B-20 cannot claim an archive scan until a permitted archive target exists. Do not create or publish an archive under this contract.
- The working tree has existing staged, unstaged and untracked changes. Preserve them; a later commit must contain only the reviewed, authorized stage. No commit/push is authorized here.
- Recovery: revise only the new R4 Draft sections in `TASK_SPEC.md` after reviewing the diff. Do not rewrite prior task, evidence, runbook, decision or checkpoint history.

## Acceptance and verification for this planning task

- B-18—B-21 each have a separate goal, requirements, non-goals, exact proposed paths, dependencies, acceptance criteria, targeted checks, stop conditions, recovery path, decision log and handoff.
- Every criterion is traceable to the change request; R3/R2 behavior not superseded by the request remains a regression constraint.
- The plan distinguishes requested outcome, proposed task contract, accepted decision, observed evidence and unresolved blocker.
- IDs are unique; cross-links resolve; no historical record is overwritten; B-18 may become `Verified` only after its bounded checks and human disposition are recorded, while B-19—B-21 remain `Draft` pending their individual approvals.
- Run `git diff --check -- TASK_SPEC.md`; run targeted structural checks for contract fields, unique IDs and local links; review only the appended diff. Do not run product tests/build, use a live provider, inspect secrets, archive, stage, commit or push as part of this planning task.

## Checkpoints and exit

1. Human reviews the decomposition and any unresolved scope/prerequisite decisions.
2. The R4 product/scope approval and governance record are established by DEC-014; G0's remaining checkpoint is human review of this decomposition. That review does not waive any downstream task-specific approval.
3. Each implementation stage requires separate contract approval, its own targeted checks, observed evidence and human diff disposition.
4. After each stage, present the actual result and remind the owner to commit and push; pause for instruction. No commit/push is implied by the reminder.

---

# TASK-SEA-R4-B18-001 — UI state and source/attempt status

- **Version:** `1.0.0`
- **Status:** `Verified — implementation and bounded B-18 checks accepted by the user on 2026-10-01; see E-SEA-098`
- **Product owner:** методист відділення теорії судноводіння навчального центру «Норд-Вест»
- **Delivery / technical owner:** виконавець проєкту
- **Date:** 2026-10-01
- **Related artifacts:** [`TASK-SEA-R4-PLAN-001`](TASK_SPEC.md), [`SPRINT-03b-CHANGE-REQUEST.md`](SPRINT-03b-CHANGE-REQUEST.md), [`DEC-012`](docs/decisions/DEC-012-r3-scope.md), [`app/map-shell.tsx`](app/map-shell.tsx), [`tests/snapshot-interface.spec.ts`](tests/snapshot-interface.spec.ts)

## Goal, desired behavior and boundary

- **Goal:** preserve the last displayed set and its provenance independently from the latest attempt’s outcome.
- Before the first attempt, show no attempt row; keep the initial demo set with source label `Демонстраційні дані`.
- During a request, retain the displayed set/source label and let demo movement continue; disable the request button; show the attempt row `Завантаження…`.
- Empty and error outcomes must not replace the displayed set or source label. The separate attempt row uses only response-body time: `collectedAt` for empty, `attemptedAt` for structured failure. Missing/unparseable response uses the exact no-body message and no time.
- Only a nonempty valid success atomically replaces the set and updates the source label using the contract in the change request. It reports success count/time and stops demo movement.
- On replacement, update the selected card with the new vessel object when its `id` remains; otherwise clear selection and close the card. Preserve initial-map reset on first nonempty success and preserve viewport on later success.
- Preserve sparse-snapshot display behavior, null motion-field presentation and truncated-limit suffix; no browser clock is used to invent attempt or source times.
- Keep panel order: button, source label, attempt row, persistent refresh note, card.

## Non-goals

No changes to API/provider/collector semantics, data merge/history/persistence, automatic refresh, map movement/selection design, live connectivity, unrelated R2/R3 tests, dependencies, general refactor, secrets or deployment.

## Inputs, paths and dependencies

- **Read-only inputs:** change request; G0-approved scope decision; current `app/map-shell.tsx`, `app/globals.css`, `app/sea-map.tsx`, `app/vessel-card.tsx`, and relevant snapshot/movement/selection tests.
- **Proposed implementation paths:** `app/map-shell.tsx` only. If a CSS change is required to preserve the current layout/accessibility, stop and amend/re-approve this contract before editing `app/globals.css`.
- **Append-only factual records:** `EVIDENCE.md` and `RUNBOOK.md` only after checks and human approval; no such append is in scope before implementation.
- **Excluded:** all other files, especially API/server/provider, test specs (B-19), README (B-21), `SPEC.md`, prior decisions/checkpoints, env/secrets, package files.
- **Prerequisite:** G0 scope decision plus explicit human approval of this exact B-18 contract.

## Acceptance criteria

- All specified literal loading/empty/error/no-body/success strings and timestamp sources match the request.
- Empty/error/loading retain both prior marker set and source label; demo continues moving on unsuccessful attempt; only nonempty valid success replaces the set.
- A selected ID present in the replacement is represented by the updated vessel; absent ID closes the card.
- Button is locked while in flight; initial view reset occurs only on first nonempty success; later success preserves user viewport.
- Sparse success behavior, missing speed/course (`Немає даних`, `data-icon="neutral"`) and truncated suffix remain intact.
- Persistent refresh note is present; source label and attempt result remain distinct; no browser-time timestamp is introduced.
- No disallowed path or behavior changes; diff is scoped and human-reviewed.

## Verification, stop and recovery

- **Targeted verification:** use a one-off local Playwright browser check with mocked `GET /api/snapshot` responses (loading, empty, structured error, no-body, and nonempty success); block external OSM tile requests; do not add or edit repository test files. Run the unchanged `tests/demo-movement.spec.ts` and `tests/vessel-selection.spec.ts` as relevant regressions, plus `npx tsc --noEmit` and scoped diff review. Existing `tests/snapshot-interface.spec.ts` assertions that require the superseded R2 loading/empty/error behavior are not B-18 pass gates; B-19 owns authorized test changes and the full 12-case matrix. No check may call the live provider.
- Stop if server response shape cannot support the requested timestamp/message, preserving the behavior requires an out-of-scope path, or an unchanged accepted behavior conflicts with the request. Record the conflict and ask for a new contract.
- Recovery: revert only B-18-authorized edits after human decision; preserve all pre-existing worktree changes. Do not reset/clean the repository.

## Decision log and stage handoff

| Decision | State | Approver/date | Rationale / record |
|---|---|---|---|
| Separate displayed-set/source state from latest-attempt state | Approved product contract by DEC-014; B-18 implementation separately approved | User / 2026-10-01 | User explicitly approved the exact B-18 contract on 2026-10-01; B-19/B-20/B-21 gates remain separate |

## Observed execution and disposition — 2026-10-02

- **Authorization / disposition:** the user approved the exact B-18 contract on 2026-10-01 and, after reviewing the implementation and reported checks, instructed `continue B-18, далі R4 task breakdown`. This accepts the bounded B-18 result only; it does not approve B-19 execution or Git publication.
- **Changed product path:** `app/map-shell.tsx` only. No repository test, API/provider, CSS, dependency, or README path was changed for B-18.
- **Observed targeted checks:** `npx tsc --noEmit` — PASS (no output); `npx playwright test tests/demo-movement.spec.ts tests/vessel-selection.spec.ts --project=chromium` — PASS (2 passed); one-off Chromium browser check with mocked `GET /api/snapshot` — PASS for loading, demo movement, empty/error/no-body retention, nonempty replacement, response-body time/count, and selection update/clear, with external OSM requests blocked; `git diff --check -- app/map-shell.tsx TASK_SPEC.md` — PASS (no output); scoped diff review completed.
- **Out-of-contract operations / limitations:** IDE lint returned no problems and IDE build returned `isSuccess=true`, `problems=[]`; both were run outside the B-18 verification list and are not B-18 acceptance gates. `npm run dev -- --hostname 127.0.0.1` exited 1; the existing local endpoint on port 3000 responded, and the launch failure's cause was not established. No B-19 browser suite, full suite, provider/live-network, secret, archive, deployment, or README check was performed.
- **Evidence:** `E-SEA-098` records the observed B-18 checks and their limits. No checkpoint was created; no commit or push was performed.

At completion, present the exact diff, checks and limits; request human `continue` / `revise` / `HOLD`, and remind the owner to commit and push this reviewed stage. Do not perform Git publication without explicit authorization.

---

# TASK-SEA-R4-B19-001 — R4 browser contract tests

- **Version:** `1.0.0`
- **Status:** `Verified — B-19 acceptance cases and protected movement/selection regressions pass; diff reviewed and closeout directed by the user (2026-10-02)`
- **Product owner:** методист відділення теорії судноводіння навчального центру «Норд-Вест»
- **Delivery / technical owner:** виконавець проєкту
- **Date:** 2026-10-01
- **Related artifacts:** [`TASK-SEA-R4-PLAN-001`](TASK_SPEC.md), [`TASK-SEA-R4-B18-001`](TASK_SPEC.md), [`SPRINT-03b-CHANGE-REQUEST.md`](SPRINT-03b-CHANGE-REQUEST.md), [`tests/snapshot-interface.spec.ts`](tests/snapshot-interface.spec.ts), [`tests/demo-movement.spec.ts`](tests/demo-movement.spec.ts), [`tests/vessel-selection.spec.ts`](tests/vessel-selection.spec.ts)

## Goal and test boundary

- **Goal:** prove the B-18 UI contract deterministically in the browser using mocked `GET /api/snapshot` responses; do not use AISStream or infer provider availability.
- Use literal timestamps in mocked response bodies and assertions. Use Playwright `page.clock` for movement/freeze checks; do not use `waitForTimeout`.
- Modify only the legacy B-16 state tests whose contract changed (failure and empty result now retain shown vessels/source). List each modified legacy test and the reason.
- `tests/demo-movement.spec.ts` and `tests/vessel-selection.spec.ts` must remain byte-for-byte unchanged unless a separate approved contract explicitly changes that restriction.

## Required cases and acceptance

1. Nonempty success with `collectedAt` replaces the set, updates source/attempt rows, and stops demo movement.
2. Repeated request while pending retains previous markers/source, locks the button and shows `Завантаження…`.
3. Empty response after success retains previous set/source timestamp and reports empty attempt using response `collectedAt`.
4. Error after success retains set/source and reports `attemptedAt` plus fixed error text.
5. Failure from initial demo leaves demo set/source and movement intact while showing attempt status.
6. Selected vessel present in new set updates its card data; absent vessel closes card and clears selection.
7. Null `speedKnots` and `courseDeg` render `Немає даних` and `data-icon="neutral"`.
8. `truncated: true` keeps the ` · зупинено на ліміті 100` source suffix.
9. Second nonempty success after user pans/zooms preserves center and zoom.
10. Advancing `page.clock` after nonempty success does not move real-vessel coordinates.
11. No-body response retains set and shows `Спроба: не вдалося отримати дані: Немає відповіді сервера` without time.
12. Persistent refresh-after-reload note is present.

**Regression gate:** every required case passes; only contract-obsolete B-16 error/empty expectations change; movement and selection specs remain unmodified and pass. Record exact changed test names and targeted command output.

## Non-goals, paths, verification and recovery

- **Non-goals:** production/source changes, API changes, actual network/provider testing, new dependencies, general test cleanup, timing sleeps, relaxing movement/selection regressions.
- **Proposed allowed path:** `tests/snapshot-interface.spec.ts` only. The two untouched regression specs above are read-only. Append factual results only after the tests run and review is accepted.
- **Prerequisite:** G0 and B-18 accepted; explicit approval of this exact test contract.
- **Check:** `npx playwright test tests/snapshot-interface.spec.ts`; include only another targeted command if added to the separately approved final execution contract. Run full suite only if B-20 contract approves it.
- **Stop:** any demo-movement/selection regression, need to edit source, or request to change tests beyond R2 B-16 contract deltas; update/re-approve scope rather than expanding it.
- **Recovery:** revert only this test file’s authorized changes after review; preserve prior files/worktree; no destructive Git commands.

## Decision log and stage handoff

| Decision | State | Approver/date | Rationale / record |
|---|---|---|---|
| Use mocked response-body timestamps and controlled page clock | Approved | User (explicit approval recorded in conversation; exact approval date not recorded) | Included in the explicitly approved B-19 contract |

## Observed B-19 execution and blocker — 2026-10-02

- **Targeted command:** `npx playwright test tests/snapshot-interface.spec.ts` — **FAIL**; 22 passed, 1 failed.
- **Failure:** `adds all demo vessels only when a successful snapshot contains fewer than three AIS vessels` expected `[data-source="aisstream"]` and `суден: 0` for an initial empty response. The locator was absent because the empty attempt correctly retains the initial demo source. This remaining legacy assertion needs reconciliation within the approved empty-result contract.
- **Stop boundary:** stopped immediately as required by the approved execution plan. The separately approved regression command `npx playwright test tests/demo-movement.spec.ts tests/vessel-selection.spec.ts` was not run. No movement/selection regression pass is claimed; those two files were not edited.
- **Changed legacy cases and reason:** loading/pending cases now expect retained vessels/source until replacement; empty and structured-error cases now expect displayed-set retention plus body timestamp in attempt status; malformed/no-body cases now expect retained data and the fixed no-response message; the view-reset case now checks pan/zoom preservation and the persistent reload note; stationary snapshot coverage now uses `page.clock` instead of `waitForTimeout` and checks the success attempt row. The zero-vessel branch in `adds all demo vessels only when a successful snapshot contains fewer than three AIS vessels` remains unresolved due the stop condition.
- **New coverage exercised in the run:** successful replacement/freezing, failure movement, selection update/clear, plus the existing truncated and null-motion assertions. These passing cases do not override the failed overall command.
- **Not run:** the regression command, full suite, build/typecheck, provider/live-network, secret, archive, deployment, or README checks. No evidence ID was created; no commit/push occurred.

## Continuation authorization — 2026-10-02

- **Disposition:** the user instructed `continue B-19 з виправленням нульового випадку` after the recorded targeted-test failure.
- **Bounded correction:** update only the zero-vessel branch of `adds all demo vessels only when a successful snapshot contains fewer than three AIS vessels` to assert that an initial empty attempt retains the demo source and vessels while reporting its attempt status. Preserve positive-count source/count assertions.
- **Verification resumes:** rerun `npx playwright test tests/snapshot-interface.spec.ts`; if it passes, run the separately approved `npx playwright test tests/demo-movement.spec.ts tests/vessel-selection.spec.ts`. No other test/build/typecheck/provider checks are authorized.

## Resumed verification — 2026-10-02

- **Correction:** the zero-vessel iteration of `adds all demo vessels only when a successful snapshot contains fewer than three AIS vessels` now asserts that the initial empty attempt retains the demo source/vessels and reports the literal attempt time; positive vessel counts retain their AIS source/count assertions.
- **Targeted command:** `npx playwright test tests/snapshot-interface.spec.ts` — PASS on rerun, 23 passed. The earlier 22/23 failure is retained above as execution history.
- **Regression command:** `npx playwright test tests/demo-movement.spec.ts tests/vessel-selection.spec.ts` — PASS, 2 passed.
- **Changed legacy test names and reasons:** `locks a repeated request while retaining the displayed snapshot` (pending request retains existing markers/source); `retains a selected demo card while loading and clears it after replacement` (selection persists until valid replacement); `renders snapshot markers and keeps them stationary with exact status` (deterministic clock freeze and success attempt row); `retains the displayed snapshot after an empty collection attempt` (empty attempt retains prior source/set and reports its own time); generated tests `retains demo vessels after the no_api_key API error`, `retains demo vessels after the connect_failed API error`, `retains demo vessels after the provider_error API error`, `retains demo vessels after the disconnected API error`, and `retains demo vessels after the internal API error` (structured errors retain demo/source and report attemptedAt); `retains the previous snapshot when a later request fails` (error after success retains prior data/card); `adds all demo vessels only when a successful snapshot contains fewer than three AIS vessels` (zero response retains demo while positive counts retain sparse-overlay behavior); `retains demo vessels after invalid JSON` and `retains demo vessels after invalid snapshot shape` (malformed responses retain display and use fixed fallback); `retains the snapshot and shows the exact no-body fallback` (no-body response retains the snapshot and reports no timestamp); `resets the view on the first non-empty success only and returns to demo on reload` (assert panned center/zoom preservation and persistent reload note); R3 tests `retains demo vessels after a fixed error response` and `retains demo vessels after an empty snapshot response` (align superseded expectations with current contract). New tests cover demo motion stopping/continuing and selected-vessel update/clear on replacement.
- **Scope/evidence:** only `tests/snapshot-interface.spec.ts` and this B-19 task record were edited for B-19. The protected movement/selection files remain unchanged. No new EVIDENCE ID; no commit or push. Status at that checkpoint was Active pending human diff review and disposition.

## Final review and B-19 closeout — 2026-10-02

- **Human disposition:** the user instructed `переглянь diff і закрий B-19`; the reviewed bounded change is accepted for B-19 closeout.
- **Review result:** changes stay within the approved test and B-19 task-record paths; no product/API/config changes or protected regression edits. The review found that the later structured-error test used the same timestamp as its displayed snapshot, which did not distinguish `attemptedAt` from the source timestamp. The error fixture/assertion now use `NEXT_COLLECTED_AT`, and the targeted suite was rerun.
- **Final verification:** `npx playwright test tests/snapshot-interface.spec.ts` — PASS (23 passed); `npx playwright test tests/demo-movement.spec.ts tests/vessel-selection.spec.ts` — PASS (2 passed); `git diff --check -- tests/snapshot-interface.spec.ts TASK_SPEC.md` — PASS (no output); protected regression specs have no staged or unstaged diff.
- **Acceptance:** all 12 B-19 cases are covered by the passing snapshot suite; both protected regression tests pass. No live/provider, build, typecheck, secret, archive, deployment, or full-suite checks are claimed.
- **Handoff:** B-19 is `Verified`; B-20 still requires its own exact task approval and any live/secret/archive actions remain independently gated. No Evidence ID, commit, or push was created/performed.

At completion, present test names, commands and observed results, request human disposition, and remind the owner to commit and push this reviewed stage. No commit/push without separate explicit authorization.

---

# TASK-SEA-R4-B20-001 — Final acceptance and security-boundary checks

- **Version:** `1.0.0`
- **Status:** `Active — automated, secret-boundary, and owner-reported manual results recorded; archive check blocked; human disposition pending`
- **Product owner:** методист відділення теорії судноводіння навчального центру «Норд-Вест»
- **Delivery / technical owner:** виконавець проєкту
- **Date:** 2026-10-01
- **Related artifacts:** [`TASK-SEA-R4-PLAN-001`](TASK_SPEC.md), [`TASK-SEA-R4-B18-001`](TASK_SPEC.md), [`TASK-SEA-R4-B19-001`](TASK_SPEC.md), [`SPRINT-03b-CHANGE-REQUEST.md`](SPRINT-03b-CHANGE-REQUEST.md), [`EVIDENCE.md`](EVIDENCE.md), [`RUNBOOK.md`](RUNBOOK.md)

## Goal and acceptance

- **Goal:** independently record what the approved R4 behavior establishes through automated checks, what was manually observed, and whether a live source attempt was available.
- Required automated gates: all approved tests green; `tsc --noEmit` succeeds; `next build` succeeds. Record the exact commands and actual outputs. A planned or unrun command is `Unknown`/`Blocked`, not passed.
- No-key manual gate: demo works and moves; clicking the snapshot button leaves the demo set/source intact and shows the exact no-key attempt message.
- Live-source gate: one manually approved attempt records actual response time and vessel count, OR records that the source was unavailable. Do not claim live success from mocks or replace unavailable-source outcome with a mock result.
- Secret exposure gates from the change request: verify `.env.local` is not tracked; assess the working tree and `.next/static` and, if an approved archive exists, its contents for exposure. Never print or store secret values. This task does not inspect `.env.local` or read a credential by default. The owner must either perform any literal-value comparison locally without returning the value, or explicitly approve a safe bounded method before an agent does it.
- Archive check remains blocked until archive format/target and permission are supplied; no archive is created/published here.

## Non-goals, paths, gates and recovery

- **Non-goals:** code/test fixes, key troubleshooting, provider retry, broad scan/exfiltration of secrets, outputting credential values, creating/publishing archive, deployment or full product release claims.
- **Proposed paths:** no product/source/test file edits; append factual verification/handoff only to `EVIDENCE.md` and `RUNBOOK.md` after observations; update only this task’s closeout in `TASK_SPEC.md`.
- **Prerequisite:** accepted B-18/B-19, separate exact B-20 authorization, owner authorization for any live request and explicit consent for any secret-value comparison method.
- **Stop:** build/test failure, secret appears in output/artifact, unsafe access requested, source attempt exceeds single approved request, or result cannot be distinguished from mocks. Preserve outputs safely and ask owner for recovery; do not reveal secret.
- **Recovery:** no product rollback in this acceptance-only slice; record accurate failed/blocked outcomes append-only; only remediate through a separate approved contract.

## Decision log and stage handoff

| Decision | State | Approver/date | Rationale / record |
|---|---|---|---|
| A source-unavailable outcome is reportable without claiming live success | Approved; one manually initiated live attempt only, no retries | User authorization / 2026-10-02 | Explicit R4 acceptance alternative; record only response time and vessel count or unavailability |
| Secret value must not be emitted or recorded | Approved; bounded in-memory comparison only, output match/no-match | User authorization / 2026-10-02 | Do not print or store the value; approved targets are worktree files and `.next/static` |

## Execution checkpoint — 2026-10-02

- **Authorization:** the user approved this exact B-20 contract, authorized exactly one manually initiated live-source request with no retries, and approved a bounded in-memory comparison of the relevant `.env.local` `AISSTREAM_API_KEY` value against worktree files and `.next/static`; the value must never be printed or stored.
- **Observed gates:** `npx playwright test` — PASS (56 passed); `npx tsc --noEmit` — PASS (no output); `npx next build` — PASS (Next.js 16.3.5). `.env.local` is not tracked; the bounded comparison reported no match in the scanned worktree or `.next/static`. See `E-SEA-099`.
- **Owner-reported manual outcomes:** after the requested checks, the user reported that they completed them successfully. The live UI result was `AISStream · знімок за 15 с · отримано 13:03:44 UTC · суден: 4 · вибірка неповна`; this satisfies the single-attempt live-result record as a user-reported observation, not an independent network trace. The user also reports that reloading the page shows demo data. The no-key check is reported complete and correct, but the exact message and retained-set/motion details were not separately transcribed. Archive inspection remains blocked pending its format, target, and permission. B-20 remains Active pending human disposition; no broader acceptance is claimed.

At completion, present each gate as PASS/FAIL/BLOCKED/UNKNOWN with evidence links; request human disposition and remind the owner to commit and push the reviewed stage. No commit/push without separate explicit authorization.

---
# TASK-SEA-R4-B21-001 — Verified install/start README

- **Version:** `1.1.0`
- **Status:** `Verified — owner-accepted closure on 2026-10-02 based on E-SEA-103/E-SEA-104; current command-level and second-laptop limits remain explicit`
- **Product owner:** методист відділення теорії судноводіння навчального центру «Норд-Вест»
- **Delivery / technical owner:** виконавець проєкту
- **Date:** 2026-10-02
- **Related artifacts:** [`TASK-SEA-R4-PLAN-001`](TASK_SPEC.md), [`TASK-SEA-R4-B20-001`](TASK_SPEC.md), [`SPRINT-03b-CHANGE-REQUEST.md`](SPRINT-03b-CHANGE-REQUEST.md), [`README.md`](README.md), [`DEC-016-r4-node24-runtime.md`](docs/decisions/DEC-016-r4-node24-runtime.md), [`DEC-005-r1-node22.md`](docs/decisions/DEC-005-r1-node22.md), [`EVIDENCE.md`](EVIDENCE.md), [`RUNBOOK.md`](RUNBOOK.md)

## Goal and README requirements

- **Goal:** give a second laptop’s operator an executable, accurate installation/start guide and explain the R4 snapshot/failure contract.
- Include prerequisites and install/start steps, environment-variable **names only** (never values), commands for the checks actually run, snapshot-not-monitoring semantics, preservation of the displayed set after error/empty response, reload returning to demo, incomplete-sample/known limitations, and handoff/source links.
- Target is cross-platform by the user’s selection recorded below; do not infer that the second laptop was available. Use the current Node.js `24.x` baseline from approved DEC-016, not DEC-005’s historical R1 environment.
- Prohibited wording from the change request: do not use claims equivalent to “monitoring” or “all vessels in the area”; do not promise completeness, persistent snapshots, source availability or checks not actually observed.
- After separate approval of this revised contract, execute every command included in README on the authorized Node 24.x environment and record exact observed output/status. If the target OS is not available for verification, label that limitation and stop short of claiming verified second-laptop setup.

## Non-goals, paths, verification and recovery

- **Non-goals:** unrelated README rewrite, new dependencies, deployment instructions unless specifically in scope, archive publication, product changes, or claims beyond current evidence.
- **Proposed allowed paths after approval:** `README.md` for content; `TASK_SPEC.md` only for this task's contract/status/closeout; append-only `EVIDENCE.md` for observed facts and `RUNBOOK.md` for delivery/handoff. Do not edit those logs before observations or approval.
- **Prerequisite:** accepted B-20 results; approved cross-platform target; DEC-016 is `Ready`; separate explicit approval of this revised B-21 v1.1 contract.
- **Acceptance:** every README command has an observed result on Node.js 24.x; setup/version/env guidance matches canonical records; no secret values; no prohibited product claims; all local links resolve; changes stay within the approved paths; human content review completed. No second-laptop validation is claimed unless performed.
- **Stop:** command depends on unavailable key/provider, unsupported OS assumption, missing required prerequisite, or contradiction with source evidence. Mark exact limitation and request a bounded revision.
- **Recovery:** revise only approved README/task paths; append factual evidence/history only to the approved logs and never rewrite prior records. Preserve unrelated worktree changes.

## Decision log and stage handoff

| Decision | State | Approver/date | Rationale / record |
|---|---|---|---|
| README targets a specific OS or an approved cross-platform baseline | Cross-platform selected | User / 2026-10-02 | User selected cross-platform instructions; this resolves the target choice only, not B-21 task approval or implementation authorization |
| Every README command must be executed before it is presented as verified | Approved; exact command and observed status must be recorded | User / 2026-10-02 | User approved the exact B-21 task contract after B-20 acceptance; no unexecuted command may be presented as verified |
| Adopt Node.js 24.x for current repository runtime | Recorded by successor decision DEC-016; revised B-21 contract still requires separate explicit approval | User report / 2026-10-02 | The user reports receiving an update that Node 24 is correct; the issuer/version of that update was not supplied |
| Execute B-21 v1.1 under Node.js 24.x | Approved; exact contract and listed commands | User / 2026-10-02 | User explicitly selected `Approve B-21 v1.1 (Recommended)`; second-laptop verification, dependency changes, and `npm audit fix` remain excluded |

## Initial execution checkpoint — 2026-10-02

- **Authorization:** the user approved the exact B-21 contract after accepting B-20; only `README.md` and this B-21 contract/closeout are in scope.
- **README draft:** added cross-platform install/start guidance, R4 snapshot/error semantics, limitations, and the B-20 check commands linked to E-SEA-099. No second-laptop validation is claimed.
- **Observed command:** `npm install` exited successfully (`up to date`, 35 packages audited) but emitted `EBADENGINE`: package requires Node `22.x`, current runtime is Node `v24.21.0` with npm `11.19.0`. npm also reported one critical-severity vulnerability. No audit or fix command was run; no dependency files were intentionally edited.
- **Stop / blocked:** Node 22.x is the approved baseline. `nvm ls` could not run because `nvm` is unavailable (`command not found`). Per the task boundary, do not run `npm run dev` or claim install/start verification until the approved Node runtime is available. B-20 test/type/build outcomes remain linked to E-SEA-099; that record does not capture the Node version, so those results are not represented as Node 22 verification.
- **Not run:** `npm run dev` and any B-21-specific check under Node 22; no second laptop was available. No provider, secret, archive, or checkpoint operation was performed.
- **Recovery / handoff:** resume only after the runtime baseline is resolved; then run each README command under that baseline, record exact output/status in this B-21 closeout, and review all scoped changes. Do not change dependencies or use `npm audit fix` under this task.

## Revised contract draft — 2026-10-02

- **Reason / history boundary:** DEC-016 establishes Node.js `24.x` as the current repository runtime and supersedes DEC-005 as the active runtime decision. The preceding install result remains accurate for the time it occurred: `npm install` succeeded on Node `v24.21.0` / npm `11.19.0`, emitted `EBADENGINE` against the then-current `22.x` package declaration, and reported one critical-severity vulnerability. No audit/fix command was run.
- **Status:** this v1.1 contract is `Draft` and awaits separate explicit approval. It does not authorize a README edit or command execution.
- **Commands to verify after approval:** `npm install`, `npm run dev`, `npx playwright test`, `npx tsc --noEmit`, and `npx next build`, as currently included in README. Record each actual runtime/version and exact outcome; preserve the local-only server boundary; stop on failures or any requirement for provider/key access.
- **Evidence/history:** after checks and review, append actual factual results to `EVIDENCE.md` and the delivery handoff to `RUNBOOK.md`; update only this B-21 closeout in `TASK_SPEC.md`. No evidence or runbook entry is created by this draft.
- **Limitations:** no second laptop is available for verification; cross-platform wording is not proof of setup on another machine. The archive gate remains deferred under DEC-015 and is unrelated to B-21. The critical-severity install notice is unresolved; this task does not authorize audit remediation or dependency changes.
- **Approval checkpoint:** present the exact B-21 v1.1 contract for explicit human approval before changing `README.md` or running any listed command.

At completion, present the focused README diff and command results, request human disposition, and remind the owner to commit and push the reviewed stage. No commit/push without separate explicit authorization.

## Explicit approval of B-21 v1.1 — 2026-10-02

- **Authorization:** the user explicitly selected `Approve B-21 v1.1 (Recommended)` after being shown the exact scope and commands. This authorizes the listed README update and B-21 checks on Node.js 24.x, plus append-only EVIDENCE/RUNBOOK records of actual results.
- **Boundaries retained:** no second-laptop validation, provider/key access, dependency changes, `npm audit fix`, archive/checkpoint action, commit, or push is authorized.
- **Execution state:** B-21 is Active. Record each command's actual status and output after execution; stop on failures, runtime mismatch, or unexpected changes.

## Owner confirmation record checkpoint — 2026-10-02

- **Task ID / goal:** `TASK-SEA-R4-B21-001` — record the user's confirmation that Node.js 24 was used throughout the project and that project development/testing stages are accepted as passed on that runtime.
- **Allowed paths:** this B-21 closeout section in `TASK_SPEC.md`; append-only `EVIDENCE.md` entry `E-SEA-103`.
- **Expected diff:** append this dated checkpoint and one owner-reported evidence entry; preserve all prior history and command-level outcomes; do not promote B-21 to `Verified` or claim unobserved exact command outputs.
- **Targeted checks:** `git diff --check -- TASK_SPEC.md EVIDENCE.md`; verify `E-SEA-103` is unique, the new task/evidence links resolve, and only the two allowed paths changed for this slice.
- **Checkpoint / stop / recovery:** present the focused diff for human review. If the user report conflicts with historical records, preserve those records and identify the conflict rather than silently rewriting them; any correction must be a dated append-only amendment.

- **Owner-reported confirmation:** the user states that Node.js 24 was used throughout the project and that development/testing stages were all conducted on it, and asks that those stages be considered passed. Record this as owner-reported project-level confirmation, not independent machine output. Historical records naming Node.js 22 remain unchanged; exact B-21 command outcomes remain limited to their separately recorded observed/blocked status.

## Owner-accepted B-21 closure checkpoint — 2026-10-02

- **Task ID / goal:** `TASK-SEA-R4-B21-001` — review the current B-21 diff and close the task on the owner's explicit acceptance of the Node.js 24 project-level development/testing confirmation in E-SEA-103.
- **Authorization:** the user instructed: `Переглянь diff і закрий B-21 за owner-підтвердженням`. This is an explicit owner disposition to accept B-21 with the command-level and second-laptop limitations stated below; it does not authorize presenting unrun commands as executed.
- **Reviewed inputs:** current B-21 README changes, B-21 v1.1 contract and approval/checkpoints, E-SEA-103, and historical Node runtime records E-SEA-025/E-SEA-026.
- **Allowed paths:** `README.md`; B-21 status/closeout and the superseding R4 task-register status follow-up in `TASK_SPEC.md`; append-only `EVIDENCE.md` entry `E-SEA-104`.
- **Expected diff:** update the R4 README status and verification boundary to show owner-accepted B-21 closure; mark B-21 closed by owner acceptance with explicit limits; append a dated R4 status follow-up superseding the prior B-21 `Draft` status; append E-SEA-104. Preserve historical evidence and all unrelated worktree paths; do not run package, dev-server, test, or build commands.
- **Acceptance boundary:** project-level Node.js 24 development/testing is accepted based on the user's report. This is not independent command output and does not make the current B-21 README commands freshly executed; second-laptop setup remains unverified.
- **Targeted checks:** `git diff --check -- README.md TASK_SPEC.md EVIDENCE.md`; verify E-SEA-104 uniqueness, new local links, and the focused diff. No runtime/test/build check is part of this owner-disposition step.
- **Checkpoint / recovery:** present the reviewed diff and closeout for human visibility. If any new edit would alter earlier records or exceed these paths, stop; correct history only through a dated append-only amendment.

## Owner-accepted closure — 2026-10-02

- **Disposition:** after review of the B-21 README diff and the owner-confirmation record, the user instructed: `Переглянь diff і закрий B-21 за owner-підтвердженням`. B-21 v1.1 is closed by owner acceptance, with the specific limitations below; this is not a claim that every listed README command was freshly executed.
- **Acceptance basis:** the user confirms Node.js 24 was used throughout the project and accepts the project development/testing stages on that runtime as passed. See owner-reported E-SEA-103 and this closure disposition in E-SEA-104.
- **Command-level status:** the earlier `npm install` on Node `v24.21.0` succeeded against the then-current `22.x` engine declaration but emitted `EBADENGINE` and one critical-severity vulnerability notice. In the current B-21 continuation, `npm install` and `npx playwright test` were denied before execution; `npm run dev`, `npx tsc --noEmit`, and `npx next build` were not run. These statuses are not converted into fresh command passes.
- **Limits:** no second-laptop setup was tested; the user's project-level report is owner-reported, not independent runtime or per-command output. Historical E-SEA-025/E-SEA-026 entries describing Node.js 22 checks remain unchanged. The archive gate remains deferred by DEC-015; no dependency remediation, archive/checkpoint action, commit, or push occurred.
- **README disposition:** the current R4 status and B-21 verification note now identify owner-accepted closure and link E-SEA-103 while distinguishing the project-level acceptance from fresh command-by-command verification.
- **Recovery / handoff:** preserve E-SEA-103/E-SEA-104 and historical records. Any future request for fresh install/start/test/build or second-laptop validation requires its own permitted execution path and must be reported as new evidence, not backfilled into this closure.

---
# TASK-SEA-R4-GOV-001 — R4 governance contract synchronization

- **Version:** `1.0.0`
- **Status:** `Verified — governance synchronization committed and pushed; downstream R4 tasks remain gated`
- **Product owner:** методист відділення теорії судноводіння навчального центру «Норд-Вест»
- **Delivery / technical owner:** виконавець проєкту
- **Date:** 2026-10-01
- **Related artifacts:** [`PROJECT_BRIEF.md`](PROJECT_BRIEF.md), [`SPEC.md`](SPEC.md), [`TASK-SEA-R4-PLAN-001`](TASK_SPEC.md), [`SPRINT-03b-CHANGE-REQUEST.md`](SPRINT-03b-CHANGE-REQUEST.md), [`DEC-012-r3-scope.md`](docs/decisions/DEC-012-r3-scope.md), [`DEC-014-r4-scope.md`](docs/decisions/DEC-014-r4-scope.md), [`docs/decisions/README.md`](docs/decisions/README.md), [`docs/sprints/README.md`](docs/sprints/README.md)

## Goal and authorization boundary

- **Goal:** formalize the user's approved R4 B-18–B-21 product scope in the versioned project contracts and a linked decision record, while retaining independent approval gates for every implementation/acceptance task.
- **Approval:** On 2026-10-01, after review of this exact Draft contract, the user explicitly instructed `продовжуй`. This authorizes only the governance synchronization below; it does not authorize B-18, B-19, B-20, or B-21 implementation or acceptance work.
- **G1 output:** synchronized, versioned `PROJECT_BRIEF.md` and `SPEC.md`; one new R4 scope decision record using a verified unique ID/path; and its entry in `docs/decisions/README.md`.
- **Scope boundary:** R4 remains a release label only. Sprint assignment is `Unknown`; neither Sprint 3b nor Sprint 4 is inferred. This contract does not authorize a change to `docs/sprints/README.md`.

## Inputs and expected contract changes

- **Read-only inputs:** `SPRINT-03b-CHANGE-REQUEST.md`; current `PROJECT_BRIEF.md`, `SPEC.md`, `TASK_SPEC.md`, `DEC-012-r3-scope.md`, decision index, and sprint catalog.
- Version the brief and SPEC together. Reflect the approved behavior for US-06/US-07: the displayed vessel set and source label/time are distinct from last-attempt status/time; loading, empty, and error retain the displayed set; only a nonempty success replaces it; timestamps come from response payloads; and page reload restores demo data.
- Record the US-10/README handoff requirement without assuming the second laptop's OS or choosing cross-platform versus OS-specific instructions.
- Add a decision with the required context, constraints, options, decision/rationale, consequences/deferred work, revisit/verification trigger, and links to SPEC/TASK/EVIDENCE/RUNBOOK. Before creation, verify decision ID and path uniqueness. In this execution, `DEC-014-r4-scope.md` was the verified available next decision path.
- Add the new decision to the index. Leave the pre-existing DEC-008 index omission unchanged; do not rewrite DEC-012/DEC-013 or any checkpoint.
- State in the decision that scope synchronization is not authorization to implement or execute B-18, B-19, B-20, or B-21.

## Non-goals and deferred Unknowns

- No sprint/release assignment, sprint catalog update, new canonical sprint record, or change to prior decisions/checkpoints.
- No B-18 UI implementation, B-19 tests, B-20 acceptance/build/provider/key/secret operation, B-21 README edit/command execution, or downstream task-status promotion.
- No reading or recording secret values; no live-provider attempt; no archive creation, inspection, or publication; no deployment, staging, commit, or push.
- Second-laptop OS/cross-platform target remains `Unknown`. Archive format, destination/publication target, and recovery owner remain `Waiting for input`.
- Do not create EVIDENCE/RUNBOOK entries or a checkpoint: no runtime or acceptance observation is authorized by this contract.

## Allowed paths and worktree boundary

- **For execution after explicit approval:** `PROJECT_BRIEF.md`, `SPEC.md`, one verified new `docs/decisions/DEC-<number>-r4-scope.md`, `docs/decisions/README.md`, and `TASK_SPEC.md` only for this task's approval/status/closeout fields.
- The change request and historical decisions are read-only inputs. All other files are excluded.
- Preserve the existing staged, unstaged, and untracked paths; do not stage or include them. Do not inspect `.mcp.json` or secrets.

## Acceptance and verification

- Brief, SPEC, and decision state the same approved R4 outcome, scope boundaries, and separate task gates; synchronized metadata and local links are correct.
- The selected decision ID/path is unique; the index links the record without silently changing unrelated entries.
- Sprint mapping, OS target, archive packaging, and B-18–B-21 execution remain explicitly unresolved/gated rather than inferred or claimed.
- After approval, use only documentation/content, ID/link, and scoped diff checks; `git diff --check` must pass for the authorized paths. Do not run product tests, build, runtime, provider, secret, or README command checks.
- Present the exact diff and actual check outputs for human review. Record no evidence/history beyond observed checks that the relevant canonical log is authorized to contain.

## Stop, recovery and checkpoint

- Stop without editing the G1 output paths if this exact contract is not approved, the decision ID/path conflicts, or a correct contract would require resolving sprint assignment, laptop OS, archive ownership, or another deferred Unknown.
- Recovery is limited to a human-approved revision of this task contract; preserve historical records and all unrelated worktree state. Never reset/clean or broadly stage the repository.
- At completion, pause for human diff review and `continue` / `revise` / `HOLD`. Remind the owner to commit and push the reviewed stage; do not perform either action without a separate explicit authorization.

## Observed execution and checkpoint — 2026-10-01

- **Authorization:** the user responded `продовжуй` after review of this exact contract; governance synchronization proceeded under this task only.
- **Changed paths:** `PROJECT_BRIEF.md`, `SPEC.md`, `docs/decisions/DEC-014-r4-scope.md` (new), `docs/decisions/README.md`, and this task's approval/status/closeout fields in `TASK_SPEC.md`.
- **Observed checks:** `git diff --check -- PROJECT_BRIEF.md SPEC.md TASK_SPEC.md docs/decisions/README.md` passed with no output. A read-only local-link/EOF check over the five governance files reported `checked_files=5; broken_local_links=[]`. A targeted search found one DEC-014 decision heading.
- **Not run:** product build/tests, runtime/manual acceptance, provider/network or secret checks, README command checks, checkpoint/archive work.
- **Evidence IDs:** none; no runtime or acceptance evidence was generated.
- **Current checkpoint at initial closeout:** awaiting the user's diff review and `continue` / `revise` / `HOLD`; no commit/push performed. Preserve unrelated pre-existing worktree changes.

## Follow-up checkpoint — 2026-10-01

- **Observed Git outcome:** commit `1c2f1d9b3484829bda97ed289b87ef11ecc5d52e` (`docs(r4): sync approved governance scope`) contains only the five G1 governance paths and was pushed to `origin/sprint3b`; `HEAD` and `origin/sprint3b` were confirmed equal before this follow-up. Unrelated staged, modified, and untracked paths remained untouched.
- **Human disposition:** the user instructed `продовжуй R4 task breakdown`; this proceeds to the next documentation/planning slice and does not approve B-18—B-21 execution or claim a separate technical diff review.
- **Handoff:** reconcile the R4 task breakdown to DEC-014 in this file only; preserve individual downstream task gates and unresolved sprint, laptop-platform, and archive inputs.

## R4 task-breakdown reconciliation — 2026-10-02

- **Basis:** DEC-014 approves the R4 product contract only; it does not authorize downstream task execution. This reconciliation updates the bounded task register after the accepted B-18 closeout and does not alter DEC-014 or historical R3 records.
- **B-18:** `TASK-SEA-R4-B18-001` is `Verified` for its scoped UI contract and checks, with factual details in `E-SEA-098`.
- **B-19:** `TASK-SEA-R4-B19-001` remains `Draft`. B-18 acceptance now satisfies its prerequisite, but the exact B-19 contract still requires separate explicit approval before any test edit or execution.
- **B-20:** remains separately gated on accepted B-19 and its own exact approval. Live-source execution needs explicit authorization; a safe secret-comparison method and permitted archive target remain unresolved/blocked.
- **B-21:** remains separately gated on accepted B-20, its own exact approval, and an owner decision on target OS or explicit cross-platform scope.
- **Unresolved:** R4 sprint assignment remains `Unknown`; archive format, publication target and recovery owner remain `Waiting for input`.
- **Handoff:** next action is review of the existing B-19 Draft for explicit task approval only. No B-19 implementation, provider/secret/archive operation, checkpoint, commit, or push is authorized by this reconciliation.

## B-21 owner-accepted task-register status follow-up — 2026-10-02

- **Reason / history boundary:** this dated addendum records the user's later owner-accepted closure of B-21 and supersedes the preceding `B-21 remains Draft` statement; that statement remains an accurate record of its earlier point in the sequence.
- **B-21:** `Verified — owner-accepted closure` based on the user's Node.js 24 project-level development/testing confirmation in E-SEA-103 and the explicit closure disposition in E-SEA-104. This does not claim fresh command-by-command B-21 execution or second-laptop validation.
- **Command-level limits:** current B-21 `npm install` and `npx playwright test` attempts were denied before execution; `npm run dev`, `npx tsc --noEmit`, and `npx next build` were not run in this continuation. The prior install warning remains historical; no audit remediation or dependency change was made.
- **Other R4 state:** B-18–B-20 remain accepted in their bounded scopes; the archive gate remains deferred by DEC-015, the unique R4 checkpoint ID/path remains unresolved, and official R4 sprint assignment remains `Unknown`.
- **Handoff:** preserve E-SEA-103/E-SEA-104 and historical Node.js 22 records. Any future fresh command or second-laptop verification requires a new bounded authorization; no archive/checkpoint action, commit, or push was performed for this closure.

## R4 B-18–B-21 owner-confirmation follow-up — 2026-10-03

- **Goal / source:** record the user's clarification that “вже все перевірено” means all checks for B-18 through B-21 have been verified. The scope was clarified by the user on 2026-10-03; see owner-reported evidence E-SEA-105.
- **Allowed paths:** this dated R4 task-register follow-up in `TASK_SPEC.md`; append-only `EVIDENCE.md` entry E-SEA-105; the R4 summary row in `README.md`.
- **Expected / observed:** record the user's confirmation as owner-reported completion of B-18–B-21 checks, link E-SEA-105 from the README summary, and preserve each task's existing bounded acceptance record. No commands were rerun for this documentation update and no per-command outputs were supplied with the confirmation.
- **Acceptance boundary:** this owner report does not convert command attempts denied or not run in the current B-21 continuation into fresh agent-observed results and does not independently verify second-laptop setup. Archive inspection remains deferred under DEC-015; the unique R4 checkpoint path and official R4 sprint assignment remain unresolved.
- **Targeted checks:** `git diff --check -- README.md TASK_SPEC.md EVIDENCE.md`; verify E-SEA-105 is unique, its task references resolve, and EVIDENCE remains append-only. No runtime, package, test, build, provider, secret, archive, or checkpoint command is part of this update.
- **Recovery / handoff:** preserve prior evidence and task history. If later supplied details identify a specific failed or unverified B-18–B-21 check, record a dated correction without rewriting this owner-reported statement or earlier observations. No task status is changed by this follow-up alone.
