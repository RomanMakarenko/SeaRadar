# EVIDENCE.md — фактичний evidence ledger

- **ID:** `EVIDENCE-SEA-001`
- **Version:** `0.29.0`
- **Status:** `Verified`
- **Product owner:** методист відділення теорії судноводіння навчального центру «Норд-Вест»
- **Delivery / technical owner:** виконавець проєкту
- **Date:** 2026-09-27
- **Related artifacts:** [`CLAUDE.md`](CLAUDE.md), [`PROJECT_BRIEF.md`](PROJECT_BRIEF.md), [`SPEC.md`](SPEC.md), [`TASK_SPEC.md`](TASK_SPEC.md), [`SPRINT-01.md`](SPRINT-01.md), [`EVIDENCE.md`](EVIDENCE.md), [`RUNBOOK.md`](RUNBOOK.md), [`docs/checkpoints/CHECKPOINT-23.md`](docs/checkpoints/CHECKPOINT-23.md), [`docs/decisions/DEC-001-mvp-contract.md`](docs/decisions/DEC-001-mvp-contract.md), [`docs/decisions/DEC-002-r1-stack.md`](docs/decisions/DEC-002-r1-stack.md), [`docs/decisions/DEC-005-r1-node22.md`](docs/decisions/DEC-005-r1-node22.md), [`docs/decisions/DEC-011-r2-task-authorization-reconciliation.md`](docs/decisions/DEC-011-r2-task-authorization-reconciliation.md)

## Purpose and boundary

Це canonical, append-only журнал фактичних перевірок. План, template, documented example або текст у чаті не є evidence. Кожен запис має відділяти expected від observed і маркувати Unknown.

Не змішувати цей файл із `RUNBOOK.md`, не перейменовувати в `EVIDENCE_LOG.md` без окремого decision record.

## Entry schema

Для кожного запису використовувати:

- **Evidence ID**
- **Related SPEC/TASK ID**
- **Claim under verification**
- **Source** — command, file, diff, log або screenshot
- **Expected**
- **Observed**
- **Timestamp / environment**
- **Status** — `PASS`, `FAIL`, `BLOCKED`, `UNKNOWN`, `SUPERSEDED`
- **Reviewer / owner**
- **Limitations and follow-up**

## Evidence entries

### E-SEA-001 — initial repository baseline

- **Related SPEC/TASK ID:** `SPEC-SEA-001`; `TASK-SEA-TEMPLATE-001`
- **Claim under verification:** repository begins without product implementation and requires governance setup.
- **Source:** initial tree inspection and `START.md` read during setup.
- **Expected:** current tree contains only the pre-existing intake note and IntelliJ metadata; no runtime or product implementation is claimed.
- **Observed:** before setup, `START.md` and `.idea/` were present; no source, tests, build manifest, Git metadata, or project rules were present.
- **Timestamp / environment:** 2026-09-21; macOS; local SeaRadar workspace.
- **Status:** `PASS`
- **Reviewer / owner:** `Pending owner review`
- **Limitations and follow-up:** this verifies only the initial structural baseline; it proves no product behavior, stack, deployment, user validation, or production readiness.

### E-SEA-002 — governance baseline verification

- **Related SPEC/TASK ID:** `SPEC-SEA-001`; `TASK-SEA-TEMPLATE-001`
- **Claim under verification:** canonical governance artifacts and future-work conventions are present without speculative MVP content.
- **Source:** `find`, `git status --short`, and a Python structural/content checklist run after creating the baseline.
- **Expected:** required canonical files exist; MVP, stack, architecture, sprint tasks and product claims remain pending/Unknown.
- **Observed:** all required canonical files and directories were present; `S1.md`, `S2.md`, `S3.md`, `EVIDENCE_LOG.md` and `docs/SPEC.md` were absent; required headings were found; `START.md` remained present because deletion requires explicit owner authorization.
- **Timestamp / environment:** 2026-09-21; macOS; local SeaRadar workspace.
- **Status:** `PASS`
- **Reviewer / owner:** `Pending owner review`
- **Limitations and follow-up:** temporary `START.md` still needs an explicit owner decision; Git status was inspected but files are not committed; no runtime checks exist yet.

### E-SEA-003 — approved MVP/R1 governance alignment

- **Related SPEC/TASK ID:** `SPEC-SEA-001`; `TASK-SEA-GOV-001`; `DEC-001-MVP-CONTRACT`; `DEC-002-R1-STACK`
- **Claim under verification:** the approved MVP baseline, current R1 stack, owners, decision links and future-sprint boundaries are represented consistently without product implementation claims.
- **Source:** user clarification recorded in the 2026-09-22 session; final `git diff --check`; final `git status --short`; final `git diff --stat`; final `find . -maxdepth 3 -type f -print | sort`; final Python structural/content validation; final Python Markdown relative-link validation; complete governance diff review.
- **Expected:** required governance files and metadata exist; DEC-001/002 links resolve; S2/S3 plan paths remain absent; canonical duplicate paths and secret literals are absent; whitespace and relative-link checks pass.
- **Observed:** final `git diff --check` passed; 13 required governance files were present, including `ABOUT.md`; final structural/content validation passed; Markdown relative-link validation passed; SPRINT-02/03, `docs/sprints/S2.md`, `docs/sprints/S3.md`, `docs/tasks` and `docs/checkpoints` remained absent; no secret literal was found by the validator; changed files contained governance documentation only.
- **Timestamp / environment:** 2026-09-22; macOS 15 / local SeaRadar workspace; no runtime dependencies installed.
- **Status:** `PASS`
- **Reviewer / owner:** delivery/technical owner — executor role; product-owner checkpoint pending.
- **Limitations and follow-up:** this verifies documentation structure and content only; it does not verify application behavior, build, tests, AISStream availability, user validation, deployment or production readiness. An initial overly broad duplicate-text check flagged the intentional sentence documenting `EVIDENCE_LOG.md`; the corrected link-focused validator passed. Human review of the diff is still required before the task is `Verified`.

### E-SEA-004 — R1 decomposition and handoff strategy recorded

- **Related SPEC/TASK ID:** `SPEC-SEA-001`; `TASK-SEA-R1-DECOMP-001`; `DEC-003-R1-HANDOFF`
- **Claim under verification:** Sprint 1 has seven named bounded sessions with per-session goals, non-goals, checks, evidence anchors, acceptance criteria and handoff; the handoff strategy is recorded without product implementation.
- **Source:** user approval in the 2026-09-22 session; `git diff --check`; final Python decomposition/metadata/link validator; `find . -maxdepth 3 -type f -print | sort`; complete documentation diff review.
- **Expected:** all B-01…B-07 sessions are represented one-to-one; DEC-003 exists and links resolve; S2/S3 and product source paths remain absent; planned checks are clearly distinguished from observed evidence.
- **Observed:** `git diff --check` passed; seven named sessions were found; every session contains the required goal, non-goals, check, evidence, acceptance and handoff labels; metadata and Markdown links passed; no implementation files, dependencies or S2/S3 plans were added.
- **Timestamp / environment:** 2026-09-22; macOS 15 / local SeaRadar workspace; runtime not started.
- **Status:** `PASS`
- **Reviewer / owner:** delivery/technical owner — executor role; product-owner review before R1-B01 remains required.
- **Limitations and follow-up:** this proves only the decomposition and documentation structure. It does not prove any B-01…B-07 check, runtime behavior, build, tests or acceptance. The next implementation slice requires a separate task contract after the human checkpoint.

### E-SEA-005 — restart checkpoint and selected diff review

- **Related SPEC/TASK ID:** `SPEC-SEA-001`; `TASK-SEA-R1-DECOMP-001`; `DEC-004-CHECKPOINT-CONVENTION`; `CHECKPOINT-SEA-R1-001`
- **Claim under verification:** the current R1 planning state and selected documentation diff are captured in a restartable checkpoint without including unrelated working-tree paths.
- **Source:** `git diff --check`; `git status --short`; `git diff --name-only`; `git diff --stat`; scoped Python checkpoint/metadata/link/scope validator; `docs/checkpoints/CHECKPOINT-01.md`.
- **Expected:** selected tracked diff has no unexpected paths; checkpoint and decision links resolve; S2/S3 and product implementation paths remain absent; unrelated untracked paths are explicitly excluded.
- **Observed:** `git diff --check` passed; tracked changes were limited to `EVIDENCE.md`, `RUNBOOK.md`, `SPEC.md`, `SPRINT-01.md`, `TASK_SPEC.md` and `docs/decisions/README.md`; scoped validator passed; `CHECKPOINT-01.md` and `DEC-004` exist; `.agents/`, `.claude/`, `reference/`, `skills-lock.json`, `TASK_INITIAL.md` and `TASK_DECOMPOSE.md` remain untracked and excluded.
- **Timestamp / environment:** 2026-09-22; macOS 15 / local SeaRadar workspace; runtime not started.
- **Status:** `PASS`
- **Reviewer / owner:** delivery/technical owner — executor role; product-owner review pending.
- **Limitations and follow-up:** the checkpoint records only documentation/planning state. It is not a commit, archive, product acceptance or implementation evidence. A broader repository-wide link scan also found an unrelated `/LICENSE` reference under untracked `reference/`; that path was excluded from this task and requires separate review.

### E-SEA-006 — B-01 task contract created

- **Related SPEC/TASK ID:** `SPEC-SEA-001`; `TASK-SEA-R1-B01-001`; `CHECKPOINT-SEA-R1-001`
- **Claim under verification:** the next bounded implementation slice has an explicit task contract before product code is started.
- **Source:** updated `TASK_SPEC.md`; `git diff --check`; `git status --short`; `git diff --stat`; shallow tree inspection with `find . -maxdepth 2 -type f | sort`.
- **Expected:** B-01 contract defines scope, allowed paths, non-goals, acceptance and verification; no product scaffold or dependency is created by contract preparation; excluded untracked inputs remain outside the slice.
- **Observed:** `TASK_SPEC.md` now contains `TASK-SEA-R1-B01-001`; `git diff --check` passed; the diff stat showed only `TASK_SPEC.md`; no `package.json`, lock-file or product source was present in the inspected tree; excluded untracked inputs remained visible and unchanged.
- **Timestamp / environment:** 2026-09-22; macOS 15 / local SeaRadar workspace; runtime not started.
- **Status:** `PASS`
- **Reviewer / owner:** delivery/technical owner — executor role; human review of the new contract remains required before implementation.
- **Limitations and follow-up:** this verifies contract structure and the no-implementation boundary only. It does not verify B-01 runtime behavior, dependencies, build, tests or acceptance. Next action is human review of `TASK_SPEC.md`, followed by implementation only if the contract remains accepted.

### E-SEA-007 — B-01 scaffold targeted checks

- **Related SPEC/TASK ID:** `SPEC-SEA-001`; `TASK-SEA-R1-B01-001`; `SPRINT-SEA-R1-001`
- **Claim under verification:** the minimal B-01 scaffold installs, type-checks under strict TypeScript, starts locally and exposes no B-02+ functionality.
- **Source:** `package.json`; `package-lock.json`; `app/layout.tsx`; `app/page.tsx`; `app/globals.css`; `tsconfig.json`; `.gitignore`; `npm install --no-audit --no-fund`; `npm ls --depth=0`; `npx tsc --noEmit`; `npm run dev` with an HTTP request to `http://127.0.0.1:3000/`; `git diff --check`; targeted source search.
- **Expected:** the minimum Next.js App Router + React + TypeScript strict scaffold is available; the dev server serves the minimal page; no Leaflet, vessel, AIS, motion or test functionality is introduced; generated files and dependencies remain bounded.
- **Observed:** npm installation passed and produced `package-lock.json`; installed direct packages were Next.js `16.3.5`, React/React DOM `19.3.0`, TypeScript `6.0.3` and the required type packages; the dev server served the expected `SeaRadar` heading and `R1 application scaffold.` paragraph; strict type-check passed after narrowing `tsconfig.json` to `app/**` and generated Next types; `git diff --check` passed; targeted source search found no excluded B-02+ functionality.
- **Timestamp / environment:** 2026-09-22; macOS 15; Node.js `v22.16.0`; npm `11.4.2`; local SeaRadar workspace.
- **Status:** `PASS`
- **Reviewer / owner:** delivery/technical owner — executor role; human diff review remains pending.
- **Limitations and follow-up:** the R1 baseline specifies Node.js 24 but the observed environment is Node.js 22.16.0; compatibility on Node.js 24 remains `Needs verification`. A real browser/manual visual check and `next build` were not run. Next.js 16 generated a managed `nextjs-agent-rules` block in `CLAUDE.md`; the product owner approved retaining that generated exception and it is not a manual governance rewrite.

### E-SEA-008 — B-02 map implementation and automated/runtime checks

- **Related SPEC/TASK ID:** `SPEC-SEA-001`; `TASK-SEA-R1-B02-001`; `SPRINT-SEA-R1-001`
- **Claim under verification:** the bounded B-02 implementation compiles, serves on the required loopback address, uses the approved Leaflet/OSM configuration, and introduces no B-03+ functionality.
- **Source:** `package.json`; `package-lock.json`; `app/map-config.ts`; `app/map-shell.tsx`; `app/sea-map.tsx`; `app/page.tsx`; `app/layout.tsx`; `app/globals.css`; `npm run build`; `npx tsc --noEmit`; `npm ls --depth=0`; `git diff --check`; targeted scope search; `lsof`; HTTP requests to `http://127.0.0.1:3000/`; OSM tile probe.
- **Expected:** Leaflet 1.9.x and matching declarations are installed; the build succeeds without Leaflet/`window` SSR errors; the dev server listens on `127.0.0.1:3000`; direct open and refresh return the page; the configured OSM tile endpoint responds when network is available; no vessels, markers, motion, cards, AIS, buttons, API/server logic or test framework are added.
- **Observed:** `npm run build` passed with static route generation; `npx tsc --noEmit` passed; `npm ls --depth=0` reported Leaflet `1.9.4`, `@types/leaflet` `1.9.22`, `@types/node` `24.13.6` and the existing Next/React/TypeScript packages; `git diff --check` passed; targeted scope search passed; `lsof` showed Node listening at `127.0.0.1:3000`; direct-open and refresh HTTP requests each returned status `200` and `text/html`; the OSM tile probe returned status `200` with `image/png`; the map constants and client-only dynamic import are present in the inspected source.
- **Timestamp / environment:** 2026-09-22; macOS 15; Node.js `v22.16.0`; npm `11.4.2`; Next.js `16.3.5`; local SeaRadar workspace.
- **Status:** `PASS` for automated, source and HTTP/runtime checks; `UNKNOWN` for browser visual acceptance.
- **Reviewer / owner:** delivery/technical owner — executor role; human diff review remains pending.
- **Limitations and follow-up:** `chromium-cli`, Chromium, Chrome, Playwright and Electron were not available in the environment, so direct visual map visibility, rendered attribution, initial center/zoom, bounds interaction, resize artifacts and unmount cleanup could not be observed in a real browser. The Next.js build emitted the existing warning that it ignored `/Users/romanmakarenko/package-lock.json` outside the repository; the build still passed. Node.js 24 compatibility remains `Needs verification` because the observed runtime is Node.js 22.16.0.

### E-SEA-009 — B-02 reverification after Next.js guidance review

- **Related SPEC/TASK ID:** `SPEC-SEA-001`; `TASK-SEA-R1-B02-001`; `SPRINT-SEA-R1-001`
- **Claim under verification:** B-02 remains compatible with the installed Next.js 16 App Router guidance and its dependency, build, loopback runtime and scope checks are reproducible after the prior review.
- **Source:** installed guides under `node_modules/next/dist/docs/01-app/` for project structure, layouts/pages, Server and Client Components, CSS, lazy loading, `use client`, root layout and TypeScript; `CLAUDE.md`; `package.json`; `package-lock.json`; `TASK_SPEC.md`; exact dependency-install command; `npm ls --depth=0`; `npx tsc --noEmit`; `npm run build`; `git diff --check`; targeted scope/path checks; `lsof`; direct-open and refresh HTTP requests; OSM tile probe; browser availability probe.
- **Expected:** Server/Client boundaries, `next/dynamic` usage, CSS imports, root layout and generated type-file handling match Next.js guidance; exact dependency versions are recorded; all automated/runtime checks pass; browser-only claims remain unknown if no browser is available.
- **Observed:** Next.js guidance review found no violation: `app/page.tsx` is a Server Component, `MapShell` is the Client Component containing `ssr: false`, Leaflet is dynamically imported inside the client effect, global/external CSS is imported from the root layout, and `next-env.d.ts` remains generated and ignored. The exact command `npm install --save-exact --save-dev @types/leaflet@1.9.22 @types/node@24.13.6 --registry=https://registry.npmjs.org --no-audit --no-fund` completed `up to date` with only the expected Node.js 24 engine warning. Manifest/lock exactness checks, `npm ls --depth=0`, `npx tsc --noEmit`, `npm run build`, `git diff --check`, targeted B-03+ scope search, required-path check, single package-manager lock check, loopback binding, direct-open and refresh HTTP requests, and the OSM tile probe all passed. Browser availability probe reported `chromium-cli`, Chromium, Chrome, Playwright and Electron unavailable.
- **Timestamp / environment:** 2026-09-22; macOS 15; Node.js `v22.16.0`; npm `11.4.2`; Next.js `16.3.5`; local SeaRadar workspace.
- **Status:** `PASS` for Next.js guidance, source, dependency, build, type, diff, scope, HTTP/runtime and tile checks; `UNKNOWN` for browser visual acceptance.
- **Reviewer / owner:** delivery/technical owner — executor role; human diff review remains pending.
- **Limitations and follow-up:** no real browser observation was possible, so rendered map visibility, attribution, initial center/zoom, bounds interaction, resize artifacts and unmount cleanup remain `UNKNOWN`; the HTTP and tile checks do not substitute for visual acceptance. Node.js 24 compatibility remains `Needs verification` because the observed runtime is Node.js 22.16.0. The Next.js build retained the existing warning about ignoring `/Users/romanmakarenko/package-lock.json` outside the repository. Next action is human diff review and an explicit `continue`, `revise` or `HOLD` decision; do not start B-03 before that decision.

### E-SEA-010 — B-03 vessel model and static marker implementation checks

- **Related SPEC/TASK ID:** `SPEC-SEA-001`; `TASK-SEA-R1-B03-001`; `SPRINT-SEA-R1-001`
- **Claim under verification:** the bounded B-03 slice defines one approved demo vessel, renders one static course-oriented Leaflet marker with the required attributes, and exposes the exact demonstration source label without adding B-04+ behavior.
- **Source:** `TASK_SPEC.md`; `app/vessel-model.ts`; `app/sea-map.tsx`; `app/map-shell.tsx`; `app/globals.css`; `git diff --check`; `npx tsc --noEmit`; `npm run build`; targeted B-03 source/bounds/cardinality checks; `npm run dev`; `lsof`; HTTP request to `http://127.0.0.1:3000/`; browser availability probe.
- **Expected:** the model has all approved fields and one deterministic `demo-1` literal inside the configured bounds; one marker is created with `data-vessel-id` and `data-icon`; the course glyph uses the child transform and neutral branch is present for `null`; the source label is exactly `Демонстраційні дані`; no motion, timers, routes, card, AIS, dependency or excluded path is introduced; automated checks pass.
- **Observed:** `git diff --check` passed; `npx tsc --noEmit` passed; `npm run build` passed with the existing warning about ignoring `/Users/romanmakarenko/package-lock.json` outside the repository; targeted source checks passed for the model fields, demo literal, required dataset assignments, source label, glyph styles, absence of timers, coordinate `(51.0, 1.45)` inside bounds `[50.75, 0.95]`–`[51.25, 1.95]`, and exactly one `L.marker(` call. The required `npm run dev` command could not start because port `127.0.0.1:3000` was already occupied by Node PID `79575`; `lsof` showed the existing SeaRadar dev server and a direct HTTP request to that loopback endpoint returned status `200`. A temporary alternate-port start was also refused by Next.js because the same project already had the existing dev server. No browser DOM/visual check was performed.
- **Timestamp / environment:** 2026-09-22; macOS 15; Node.js `v22.16.0`; npm `11.4.2`; Next.js `16.3.5`; local SeaRadar workspace.
- **Status:** `PASS` for type, build, diff and source/scope checks; `PASS` for supplemental loopback HTTP response via the existing server; `BLOCKED` for starting a second dev server because port/project lock was already in use; `UNKNOWN` for browser visual acceptance and Node.js 24 compatibility.
- **Reviewer / owner:** delivery/technical owner — executor role; final human B-03 diff review remains pending.
- **Limitations and follow-up:** `chromium-cli`, Chromium, Chrome, Playwright and Electron were unavailable, so visible vessel placement, marker attributes in the live DOM, glyph orientation/neutral rendering, source-label visibility, refresh/resize behavior and unmount cleanup remain `UNKNOWN`. The existing server was not stopped because it was not started by this bounded check. Human diff review must choose `continue`, `revise` or `HOLD` before B-04; the last accepted B-02 commit remains the recovery point.

### E-SEA-011 — B-04 vessel selection and card implementation checks

- **Related SPEC/TASK ID:** `SPEC-SEA-001`; `TASK-SEA-R1-B04-001`; `SPRINT-SEA-R1-001`
- **Claim under verification:** the bounded B-04 slice makes the single demo marker selectable and renders a correctly formatted card for the selected vessel without HTML interpretation or B-05+ behavior.
- **Source:** `TASK_SPEC.md`; `app/vessel-card.tsx`; `app/sea-map.tsx`; `app/map-shell.tsx`; `app/globals.css`; `git diff --check`; `npx tsc --noEmit`; `npm run build`; targeted B-04 source/scope checks; `npm run dev`; `lsof`; HTTP request to `http://127.0.0.1:3000/`; browser availability probe; `node --version`; `npm --version`; `npx next --version`.
- **Expected:** one interactive `demo-1` marker selects one card containing id, name, coordinates, speed, course, timestamp and source in the approved formats; numeric zero remains distinct from unknown; literal names remain text; repeated/map clicks do not clear selection; no close button, motion, routes, AIS, API/server logic, dependency or excluded path is introduced.
- **Observed:** `git diff --check` passed; `npx tsc --noEmit` passed; `npm run build` passed with the existing warning about ignoring `/Users/romanmakarenko/package-lock.json` outside the repository; the corrected targeted source/scope checks passed for allowed paths, one marker, interactive marker selection, formatting tokens, literal rendering, panel order and forbidden behavior; `npm run dev` exited `1` with `EADDRINUSE` because `127.0.0.1:3000` was already occupied by Node PID `79575`; `lsof` confirmed the listener and a direct HTTP request returned `200 text/html`; browser tools were unavailable; the observed environment was Node.js `v22.16.0`, npm `11.4.2`, Next.js `16.3.5`.
- **Timestamp / environment:** 2026-09-22; macOS 15; Node.js `v22.16.0`; npm `11.4.2`; Next.js `16.3.5`; local SeaRadar workspace.
- **Status:** `PASS` for type, build, diff and corrected source/scope checks; `PASS` for supplemental loopback HTTP response via the existing server; `BLOCKED` for starting a second dev server because port `127.0.0.1:3000` was already in use; `UNKNOWN` for browser visual/DOM acceptance and Node.js 24 compatibility.
- **Reviewer / owner:** delivery/technical owner — executor role; final human B-04 diff review remains pending.
- **Limitations and follow-up:** no browser observation verified marker click behavior, live card content, literal `<b>Демо</b>` rendering, repeated/map click selection persistence, panel order, resize behavior or unmount cleanup. The first local targeted assertion script failed because its own ordering assertion matched the `VesselCard` import rather than the rendered element; the corrected validator passed. The existing server was not stopped because it was not started by this bounded check. Human diff review must choose `continue`, `revise` or `HOLD` before B-05; the B-03 commit `bad4df2` remains the recovery point.

### E-SEA-012 — B-04 delivery commit and remote branch handoff

- **Related SPEC/TASK ID:** `SPEC-SEA-001`; `TASK-SEA-R1-B04-001`; `SPRINT-SEA-R1-001`
- **Claim under verification:** the verified B-04 implementation is committed on the first sprint branch and pushed to the configured remote without including excluded untracked inputs.
- **Source:** `git status --short`; `git log -1 --oneline --decorate`; `git remote -v`; `git push origin sprint1` output.
- **Expected:** branch `sprint1` contains the B-04 commit; `origin/sprint1` points to the same commit; excluded untracked inputs remain outside the commit; no unexpected tracked changes remain after push.
- **Observed:** commit `addc7ba` (`feat(r1): add B-04 vessel selection card`) is at `HEAD -> sprint1` and `origin/sprint1`; push completed as `bad4df2..addc7ba sprint1 -> sprint1`; `git status --short` lists only the pre-existing excluded untracked paths `.agents/`, `.claude/`, `TASK_DECOMPOSE.md`, `TASK_INITIAL.md`, `reference/` and `skills-lock.json`.
- **Timestamp / environment:** 2026-09-22; macOS 15; local SeaRadar workspace; remote `origin` is `git@github.com:RomanMakarenko/SeaRadar.git`.
- **Status:** `PASS` for commit/remote delivery and excluded-path boundary; `UNKNOWN` for browser visual/DOM acceptance and Node.js 24 compatibility as recorded in `E-SEA-011`.
- **Reviewer / owner:** delivery/technical owner — executor role; final human B-04 diff decision remains pending.
- **Limitations and follow-up:** remote delivery does not substitute for live browser acceptance or final human review. The next session must inspect commit `addc7ba`, review the B-04 diff, and choose `continue`, `revise` or `HOLD` before creating the B-05 task contract.

### E-SEA-013 — B-05 demo routes implementation checks

- **Related SPEC/TASK ID:** `SPEC-SEA-001`; `TASK-SEA-R1-B05-001`; `SPRINT-SEA-R1-001`
- **Claim under verification:** the bounded B-05 slice adds exactly three static demo vessels with literal route data and preserves the B-04 marker selection boundary without adding B-06 motion.
- **Source:** `TASK_SPEC.md`; `app/vessel-model.ts`; `app/sea-map.tsx`; `git diff --check`; `npx tsc --noEmit`; `npm run build`; `npm ls --depth=0`; targeted Python structural/data/course validator; `lsof -nP -iTCP:3000 -sTCP:LISTEN`; `curl http://127.0.0.1:3000/`; `node --version`; `npm --version`; `npx next --version`; browser availability probe.
- **Expected:** `demo-1`…`demo-3` exist once; each route has 8–12 literal points within the configured bounds; each vessel starts at its first point with an explicit consistent initial course and literal speed; exactly three markers forward matching selections and clean up listeners; no timers, motion, route playback, AIS, API/server logic, dependencies or excluded paths are added.
- **Observed:** `git diff --check` passed; strict TypeScript passed; `npm run build` passed with the existing warning about ignoring `/Users/romanmakarenko/package-lock.json` outside the repository; `npm ls --depth=0` showed the unchanged direct dependency set and reported extraneous `@emnapi/runtime` and `@img/sharp-wasm32` packages; the final structural/data validator passed for exactly three IDs, three ten-point routes, inclusive bounds, literal speeds, first-point positions, initial courses, marker loop, attributes, listener cleanup and absence of `setInterval`/`setTimeout`; initial course consistency checks passed; the existing SeaRadar listener on `127.0.0.1:3000` was observed via `lsof` and supplemental `curl` returned `HTTP 200 text/html`; no browser runtime was available.
- **Timestamp / environment:** 2026-09-22; macOS 15; Node.js `v22.23.2`; npm `10.9.8`; Next.js `16.3.5`; local SeaRadar workspace; existing listener PID `79575`.
- **Status:** `PASS` for diff, type, build, source/data/scope and supplemental loopback HTTP checks; `UNKNOWN`/`BLOCKED` for browser visual/DOM acceptance; `UNKNOWN` for Node.js 24 compatibility.
- **Reviewer / owner:** delivery/technical owner — executor role; final human B-05 diff review remains pending.
- **Limitations and follow-up:** no browser verified three live markers, marker clicks, matching cards, repeated/map-click selection persistence, visual icon state, static positions or unmount cleanup. `npm run dev` was not started because the required port was already occupied by a pre-existing server; the existing server was not stopped. The next session must inspect the B-05 diff/commit and choose `continue`, `revise` or `HOLD` before B-06.

### E-SEA-014 — B-06 motion implementation checks

- **Related SPEC/TASK ID:** `SPEC-SEA-001`; `TASK-SEA-R1-B06-001`; `SPRINT-SEA-R1-001`
- **Claim under verification:** the bounded B-06 slice adds one 2000 ms motion interval for the three existing demo routes, computes the current-segment bearing, updates markers and the selected card from the same snapshots, stops at the final point with speed `0`, and cleans up the timer.
- **Source:** `TASK_SPEC.md`; `app/sea-map.tsx`; `app/map-shell.tsx`; unchanged `app/vessel-model.ts`; installed Next.js guidance; `git diff --check`; `npx tsc --noEmit`; `npm run build`; `npm ls --depth=0`; targeted Python motion/scope validator; `npm run dev`; `lsof -nP -iTCP:3000 -sTCP:LISTEN`; `curl http://127.0.0.1:3000/`; browser availability probe; runtime version commands.
- **Expected:** exactly one `2000` ms interval is created for the map lifecycle and cleared on cleanup; each unfinished vessel advances one literal route point per tick; the course is normalized great-circle azimuth of the traversed segment; the final tick sets speed to numeric `0`; markers and the selected card receive the same updated vessel snapshot; no B-07 or unrelated behavior/dependency/path is added.
- **Observed:** `git diff --check` passed; strict TypeScript passed; `npm run build` passed with the existing warning about ignoring `/Users/romanmakarenko/package-lock.json` outside the repository; `npm ls --depth=0` passed with the unchanged direct dependency set; the targeted validator passed for the 2000 ms interval, single timer, cleanup, route-index advancement, normalized bearing source, final speed `0`, finished-vessel guard, marker updates, selected-card update callback, selection wiring, forbidden behavior absence and unchanged B-05 dataset; tracked diff paths were exactly `TASK_SPEC.md`, `app/map-shell.tsx` and `app/sea-map.tsx`; `npm run dev` exited `1` with `EADDRINUSE` because the pre-existing Node PID `79575` listened on `127.0.0.1:3000`; supplemental `curl` returned `HTTP 200 text/html`; no supported browser runtime was available.
- **Timestamp / environment:** 2026-09-22; macOS; Node.js `v22.16.0`; npm `11.4.2`; Next.js `16.3.5`; local SeaRadar workspace; pre-existing listener PID `79575`.
- **Status:** `PASS` for diff, type, build, dependency, source/scope and supplemental loopback HTTP checks; `BLOCKED` for starting a new dev server due to the pre-existing listener; `UNKNOWN`/`BLOCKED` for browser/manual motion, card, hot-reload and unmount acceptance; `UNKNOWN` for Node.js 24 compatibility.
- **Reviewer / owner:** delivery/technical owner — executor role; final human B-06 diff review remains pending.
- **Limitations and follow-up:** source checks do not prove rendered marker movement, visible course orientation, selected-card updates, final stop, hot-reload timer count or unmount cleanup. No browser-based manual acceptance was claimed. Human diff review must choose `continue`, `revise` or `HOLD`; the B-05 commit `70fbf29` is the recovery point if this slice is rejected.

### E-SEA-015 — B-06 review decision and remote delivery

- **Related SPEC/TASK ID:** `SPEC-SEA-001`; `TASK-SEA-R1-B06-001`; `SPRINT-SEA-R1-001`
- **Claim under verification:** the reviewed B-06 diff was accepted for continuation, committed without unrelated tracked paths, and pushed to the sprint branch.
- **Source:** human review decision in the current session; `git diff --check`; `git show --stat f215aae`; `git log -2 --oneline --decorate`; `git push origin sprint1`; final `git status --short`.
- **Expected:** the B-06 implementation and its actual evidence/handoff records are committed as one bounded delivery; `origin/sprint1` points to the same commit; pre-existing excluded untracked inputs remain outside the commit.
- **Observed:** the diff review confirmed `continue`; commit `f215aae` (`feat(r1): add demo vessel motion`) contains exactly `EVIDENCE.md`, `RUNBOOK.md`, `TASK_SPEC.md`, `app/map-shell.tsx` and `app/sea-map.tsx`; push completed `70fbf29..f215aae sprint1 -> sprint1`; `HEAD -> sprint1` and `origin/sprint1` both point to `f215aae`; final status lists only the pre-existing excluded untracked paths `.agents/`, `.claude/`, `reference/`, `TASK_INITIAL.md`, `TASK_DECOMPOSE.md` and `skills-lock.json`.
- **Timestamp / environment:** 2026-09-22; macOS; local SeaRadar workspace; branch `sprint1`.
- **Status:** `PASS` for human diff decision, bounded commit contents, remote push and excluded-path boundary.
- **Reviewer / owner:** delivery/technical owner — executor role; human decision recorded as `continue`.
- **Limitations and follow-up:** this delivery evidence does not change the B-06 browser/manual limitation, which remains `UNKNOWN`/`BLOCKED`; Node.js 24 compatibility remains `Needs verification`. Next bounded action is `R1-B07-PLAYWRIGHT-SELECTION` from commit `f215aae`.

### E-SEA-016 — B-07 Playwright selection checks

- **Related SPEC/TASK ID:** `SPEC-SEA-001`; `TASK-SEA-R1-B07-001`; `SPRINT-SEA-R1-001`
- **Claim under verification:** the bounded B-07 slice adds Playwright Test as the only runner, one Chromium browser project with a configured Next.js dev server, and a browser check for all three demo-vessel selections while blocking OSM tile requests.
- **Source:** `TASK_SPEC.md`; `package.json`; `package-lock.json`; `playwright.config.ts`; `tests/vessel-selection.spec.ts`; `.gitignore`; installed Next.js Playwright guidance; `git diff --check`; `npx tsc --noEmit`; `npm run build`; `npm ls --depth=0`; `npx playwright test --list`; inline B-07 structural/config scope validator; `npx playwright install chromium`; `npx playwright test tests/vessel-selection.spec.ts`; `lsof -nP -iTCP:3000 -sTCP:LISTEN`; `curl http://127.0.0.1:3000/`; runtime version commands.
- **Expected:** exactly one Chromium project and one Playwright Test spec; `webServer` starts `npm run dev` on the configured loopback `baseURL`; the spec finds exactly `demo-1`…`demo-3`, opens each matching card, keeps it visible after a repeated click, and aborts observed OSM tile requests before navigation; no motion, visual regression, extra runner, unrelated dependency or product path is added.
- **Observed:** `git diff --check` passed; strict application TypeScript check passed; `npm run build` passed; `npm ls --depth=0` listed the authorized `@playwright/test@1.63.0` plus the pre-existing extraneous `@emnapi/runtime` and `@img/sharp-wasm32`; the structural/config validator passed with one Chromium project, configured `npm run dev`, base URL, tile interception and forbidden-scope checks; `npx playwright test --list` listed one test under `[chromium]`; Chromium `153.0.8010.12` installed successfully; targeted Playwright test passed with `1 passed (2.8s)` using `1 worker`; the test observed and aborted OSM tile requests and asserted zero completed tile requests; `lsof` showed pre-existing Node PID `79575` on `127.0.0.1:3000`; supplemental `curl` returned `HTTP 200 text/html; charset=utf-8`; product files under `app/` were unchanged; `npm install --save-dev @playwright/test` emitted the expected `EBADENGINE` warning because the current Node.js `v22.23.2` is below the package engine baseline `24.x`; `npm run build` emitted the existing warning that Next.js ignored `/Users/romanmakarenko/package-lock.json` outside this Git repository.
- **Timestamp / environment:** 2026-09-22; macOS 15; Node.js `v22.23.2`; npm `10.9.8`; Next.js `16.3.5`; Playwright `1.63.0`; local SeaRadar workspace; existing listener PID `79575`.
- **Status:** `PASS` for diff, strict application type-check, build, dependency/scope/config checks, browser installation, targeted selection test, tile-block assertions and supplemental loopback HTTP; `Needs verification` for Node.js 24 compatibility; B-06 manual motion/final-stop/hot-reload/unmount acceptance remains outside B-07 and `UNKNOWN`/`BLOCKED`.
- **Reviewer / owner:** delivery/technical owner — executor role; human B-07 diff review is pending.
- **Limitations and follow-up:** the targeted headless browser test does not provide manual visual acceptance of movement, course orientation, final stop, hot reload or unmount cleanup; those remain B-06 limitations. The Playwright `webServer` reused the pre-existing listener because `reuseExistingServer: true`; this task did not start or stop that process. Node.js 24 compatibility is not verified on the current Node.js 22 runtime. Human diff review must choose `continue`, `revise` or `HOLD` before any commit or next bounded action.

### E-SEA-017 — B-07 human diff review decision

- **Related SPEC/TASK ID:** `SPEC-SEA-001`; `TASK-SEA-R1-B07-001`; `SPRINT-SEA-R1-001`
- **Claim under verification:** the B-07 diff was human-reviewed against its bounded contract and accepted for commit and push without unrelated product changes.
- **Source:** current human review; `TASK_SPEC.md`; `.gitignore`; `package.json`; `package-lock.json`; `playwright.config.ts`; `tests/vessel-selection.spec.ts`; `git diff --check`; `npx playwright test tests/vessel-selection.spec.ts`; `git status --short`.
- **Expected:** the diff contains only the authorized Playwright runner/config/spec, generated-output ignores and evidence/contract updates; the test remains green with one Chromium project; no `app/` product path, extra runner, extra dependency or pre-existing untracked path is included.
- **Observed:** review found no correctness, scope or test-boundary blockers; the final targeted test passed with `1 passed`; the config has one Chromium project and configured `webServer`; the spec covers all three IDs, matching cards, repeated clicks and blocked OSM requests; `app/` is unchanged; pre-existing untracked paths remain outside the planned commit.
- **Status:** `PASS`; human decision is `continue`; commit and push are explicitly authorized by the user.
- **Reviewer / owner:** delivery/technical owner — executor role.
- **Limitations and follow-up:** Node.js 24 compatibility remains `Needs verification`; B-06 manual visual limitations remain `UNKNOWN`/`BLOCKED`. Remote delivery is recorded separately after the push completes.

### E-SEA-018 — B-07 remote delivery

- **Related SPEC/TASK ID:** `SPEC-SEA-001`; `TASK-SEA-R1-B07-001`; `SPRINT-SEA-R1-001`
- **Claim under verification:** the reviewed B-07 slice was committed without unrelated paths and pushed to `origin/sprint1`.
- **Source:** `git commit --amend`; `git show --stat --oneline HEAD`; `git diff HEAD^ HEAD --name-only`; `git push origin sprint1`; final `git status --short`; `git log -2 --oneline --decorate`.
- **Expected:** the B-07 commit contains only the authorized implementation, test, dependency, contract and append-only history files; `origin/sprint1` points to the delivered commit; pre-existing excluded untracked paths remain outside the commit.
- **Observed:** commit `c89127f` (`feat(r1): add B-07 Playwright selection checks`) contains exactly `.gitignore`, `EVIDENCE.md`, `RUNBOOK.md`, `TASK_SPEC.md`, `package-lock.json`, `package.json`, `playwright.config.ts` and `tests/vessel-selection.spec.ts`; push completed `f215aae..c89127f sprint1 -> sprint1`; local and remote delivery target is `c89127f`; `sea-radar-s1.png` was intentionally kept untracked after an unexpected staged inclusion was removed from the commit; all other pre-existing excluded untracked paths remain present.
- **Status:** `PASS` for bounded commit contents, remote push and excluded-path boundary.
- **Reviewer / owner:** delivery/technical owner — executor role; human B-07 decision is `continue`.
- **Limitations and follow-up:** Node.js 24 compatibility remains `Needs verification`; B-06 manual visual movement, course, final-stop, hot-reload and unmount checks remain `UNKNOWN`/`BLOCKED`. No automatic transition to S2/S3 is authorized.

### E-SEA-019 — B-06 manual movement confirmation

- **Related SPEC/TASK ID:** `SPEC-SEA-001`; `TASK-SEA-R1-B06-001`; `SPRINT-SEA-R1-001`
- **Claim under verification:** visible B-06 demo-vessel movement has been manually observed in the running application.
- **Source:** user confirmation in the current session: “я перевірив, стрілки рухаються”.
- **Expected:** the rendered vessel arrows visibly move between demo route positions.
- **Observed:** user reports that the arrows move. This confirms visible movement only; no claim is made here about bearing orientation, final stop at speed `0`, hot-reload timer count or unmount cleanup.
- **Status:** `PASS` for the reported manual movement observation; `UNKNOWN` for the remaining B-06 manual checks.
- **Reviewer / owner:** user/manual reviewer; delivery/technical owner records the report.
- **Limitations and follow-up:** the exact browser session, observed tick count, final route position and console/unmount observations were not supplied. Node.js 24 compatibility remains `Needs verification`.

### E-SEA-020 — B-06 course orientation confirmation

- **Related SPEC/TASK ID:** `SPEC-SEA-001`; `TASK-SEA-R1-B06-001`; `SPRINT-SEA-R1-001`
- **Claim under verification:** the visible B-06 vessel arrows are oriented according to their current route course.
- **Source:** user confirmation in the current session: “1 підтверджую” in response to the course-orientation check.
- **Expected:** each rendered arrow points along the vessel's current route segment, including the updated direction after movement.
- **Observed:** user confirms the course-orientation check. Exact vessel id, segment, observed bearing and capture details were not supplied.
- **Status:** `PASS` for the reported manual course-orientation observation.
- **Reviewer / owner:** user/manual reviewer; delivery/technical owner records the report.
- **Limitations and follow-up:** final stop at `0 kn`, no timer accumulation after hot reload, unmount cleanup and Node.js 24 compatibility remain unverified.

### E-SEA-021 — B-06 final-stop confirmation

- **Related SPEC/TASK ID:** `SPEC-SEA-001`; `TASK-SEA-R1-B06-001`; `SPRINT-SEA-R1-001`
- **Claim under verification:** the demo-vessel motion reaches the last literal route point after the expected nine ticks and stops at `0 kn`.
- **Source:** user confirmation in the current session: “2 підтверджую 9 тіків”.
- **Expected:** with ten route points and a two-second interval, the final point is reached after nine ticks; the vessel then remains at the final point with speed `0 kn`.
- **Observed:** user confirms the item-2 final-stop check after nine ticks. Exact vessel id, final coordinates and duration of the post-stop observation were not supplied.
- **Status:** `PASS` for the reported nine-tick final-stop observation.
- **Reviewer / owner:** user/manual reviewer; delivery/technical owner records the report.
- **Limitations and follow-up:** hot-reload timer accumulation, unmount cleanup and Node.js 24 compatibility remain unverified.

### E-SEA-022 — B-06 reload reset confirmation

- **Related SPEC/TASK ID:** `SPEC-SEA-001`; `TASK-SEA-R1-B06-001`; `SPRINT-SEA-R1-001`
- **Claim under verification:** reloading the application resets demo vessels to their initial literal route points.
- **Source:** user confirmation in the current session: “3 підтверджую, після релоуда повертаються до початкових точок”.
- **Expected:** after a page reload, demo vessels restart from route index `0`.
- **Observed:** user reports that after reload the vessels return to their initial points.
- **Status:** `PASS` for reset-to-initial-points after reload.
- **Limitations and follow-up:** a full page reload also tears down and recreates the map lifecycle, so this observation alone does not prove that hot reload never accumulates timers. The hot-reload-specific timer check, unmount cleanup and Node.js 24 compatibility remain unverified.

### E-SEA-023 — B-06 unmount error check

- **Related SPEC/TASK ID:** `SPEC-SEA-001`; `TASK-SEA-R1-B06-001`; `SPRINT-SEA-R1-001`
- **Claim under verification:** unmounting or reloading the map does not produce runtime errors.
- **Source:** user confirmation in the current session: “4 підтверджую, помилок нема”.
- **Expected:** after unmount/reload, no console or runtime errors appear and no stale map update causes an exception.
- **Observed:** user reports no errors during the item-4 check.
- **Status:** `PASS` for the reported no-error observation.
- **Limitations and follow-up:** absence of errors does not independently prove that every timer and Leaflet listener was cleared; direct cleanup instrumentation was not supplied. Node.js 24 compatibility remains `Needs verification`.

### E-SEA-024 — B-06 hot-reload cadence check

- **Related SPEC/TASK ID:** `SPEC-SEA-001`; `TASK-SEA-R1-B06-001`; `SPRINT-SEA-R1-001`
- **Claim under verification:** after a temporary source hot reload, the demo vessel continues advancing by one route point every 2000 ms without timer acceleration or route-point skipping.
- **Source:** headed Chromium observation using an inline Playwright browser session; temporary comment added and immediately reverted in `app/sea-map.tsx`; browser coordinate readings; `curl` check for the reported 404 resource; final `git diff --check` and product-path diff.
- **Expected:** after the temporary Fast Refresh change, coordinates advance one literal route point per approximately 2000 ms; no duplicate-timer acceleration or skipped point appears; the temporary product edit leaves no final diff.
- **Observed:** headed browser readings were `initial=51.00000, 1.45000`, then `after_hmr_restart=51.04000, 1.49500`, `after_hmr_tick_1=51.05000, 1.51000`, and `after_hmr_tick_2=51.06000, 1.52500`; the two post-change readings advanced by one route point per 2100 ms observation; `git diff --check` passed and `app/sea-map.tsx` had no remaining diff. The browser reported one 404 console resource error; `curl` identified it as the absent `/favicon.ico`, not a JavaScript or map-timer error.
- **Status:** `PASS` for the observed one-point-per-approximately-2000-ms cadence and no observed timer acceleration/skipping after the temporary hot-reload change.
- **Reviewer / owner:** delivery/technical owner — executor role.
- **Limitations and follow-up:** the observation did not instrument `setInterval`/`clearInterval` directly and did not independently prove unmount cleanup. Node.js 24 compatibility remains `Needs verification`.

### E-SEA-025 — R1 Node.js baseline changed to 22

- **Related SPEC/TASK ID:** `SPEC-SEA-001`; `TASK-SEA-R1-B07-001`; `SPRINT-SEA-R1-001`; `DEC-005-R1-NODE22`
- **Claim under verification:** the official R1 runtime baseline is Node.js 22.x and Node.js 24 is not required or active for this project.
- **Source:** project-owner instruction in the current session; `package.json`; `package-lock.json`; `CLAUDE.md`; `SPEC.md`; `SPRINT-01.md`; `TASK_SPEC.md`; `docs/decisions/README.md`; `docs/decisions/DEC-005-r1-node22.md`; shell runtime output.
- **Expected:** current engine requirements and canonical baseline documents identify Node.js 22.x; the active shell uses Node.js 22; the previously installed Node.js 24 runtime is removed; no product code changes are needed.
- **Observed:** `package.json` and the root package-lock engine both read `22.x`; canonical governance and R1 documents point to DEC-005 and Node.js 22; shell output is `node v22.23.2` / `npm 10.9.8`; `nvm uninstall 24.1.0` completed with `Uninstalled node v24.1.0`; `npm install --package-lock-only --ignore-scripts --no-audit --no-fund` reported `up to date`; `git diff --check` passed.
- **Status:** `PASS` for baseline/document/package alignment and removal of the local Node.js 24 installation.
- **Limitations and follow-up:** historical EVIDENCE/RUNBOOK entries retain their original Node.js 24 wording as append-only delivery history; `@types/node@24.13.6` remains a development type-definition package and is not the runtime baseline. No new product build or Playwright run was required for this documentation/configuration-only change.

### E-SEA-026 — R1 checks on Node.js 22

- **Related SPEC/TASK ID:** `SPEC-SEA-001`; `TASK-SEA-R1-B07-001`; `SPRINT-SEA-R1-001`; `DEC-005-R1-NODE22`
- **Claim under verification:** the existing R1 type, build, dependency and focused browser checks pass on the approved Node.js 22 runtime.
- **Source:** shell command output from the current session; `package.json`; `package-lock.json`; `playwright.config.ts`; `tests/vessel-selection.spec.ts`; existing dev-server process inspection.
- **Expected:** Node.js 22 is active; format, strict TypeScript, production build, dependency tree and targeted Playwright selection checks pass without Node.js 24.
- **Observed:** `node --version` returned `v22.23.2`; `npm --version` returned `10.9.8`; `git diff --check` passed; `npx tsc --noEmit` passed; `npm run build` passed with the existing Next.js warning about an external `/Users/romanmakarenko/package-lock.json`; `npm ls --depth=0` completed with only the pre-existing extraneous `@emnapi/runtime` and `@img/sharp-wasm32` entries; `npx playwright test tests/vessel-selection.spec.ts` passed `1 passed (1.5s)` under one `[chromium]` project. The reused server's executable was `/Users/romanmakarenko/.local/share/fnm/node-versions/v22.23.2/installation/bin/node`.
- **Status:** `PASS` for all requested Node.js 22 checks.
- **Limitations and follow-up:** Playwright reused the existing listener on `127.0.0.1:3000` through the configured `reuseExistingServer: true`; no new server was started or stopped. The dependency tree still reports the pre-existing extraneous packages; this does not affect the passing checks.

### E-SEA-027 — Sprint 1 acceptance closure

- **Related SPEC/TASK ID:** `SPEC-SEA-001`; `SPRINT-SEA-R1-001`; `DEC-005-R1-NODE22`
- **Claim under verification:** Sprint 1 B-01 through B-07 acceptance is closed and the verified delivery is authorized for commit and push.
- **Source:** product-owner confirmation in the current session: “все підтверджую і коміть та пуш”; prior implementation, check, review and delivery evidence `E-SEA-001` through `E-SEA-026`.
- **Expected:** all previously listed Sprint 1 acceptance gaps are either confirmed or explicitly accepted; Sprint 1 may be marked `DONE`; no S2/S3 work is inferred or started.
- **Observed:** the product owner confirmed all listed gaps and authorized commit/push. The accepted set includes B-02/B-03/B-04 visual limitations, B-06 cleanup evidence without direct timer/listener instrumentation, the known external package-lock warning, pre-existing extraneous dependency entries, and the Node.js 22 baseline. No S2/S3 implementation was added.
- **Status:** `PASS`; Sprint 1 acceptance decision is `DONE`.
- **Reviewer / owner:** product owner — acceptance role; delivery/technical owner records the decision.
- **Limitations:** this record closes the acceptance decision; it does not retroactively turn source/manual evidence into direct instrumentation. Sprint 2 and Sprint 3 remain outside the approved scope.

### E-SEA-028 — Sprint 2 planning decomposition

- **Related SPEC/TASK ID:** `SPEC-SEA-001`; `TASK-SEA-R2-PLAN-001`; `SPRINT-02.md`; `SPRINT-SEA-R1-001`.
- **Claim under verification:** the staged Sprint 2 input was decomposed into bounded planning slices without overwriting the verified R1 task contract or starting R2 implementation.
- **Source:** current `CLAUDE.md`, `SPEC.md`, `SPRINT-02.md`, prior `TASK_SPEC.md`, `git status --short --branch`, staged diff, current `TASK_SPEC.md` after the append-only R2 section, and structural validator output.
- **Expected:** R1 B-07 task history remains intact; R2 planning has a separate task ID; B-08…B-13 each have goals, non-goals, allowed output, acceptance/evidence boundaries, stop conditions and recovery; no secret or product implementation is read or changed.
- **Observed:** R1 `TASK-SEA-R1-B07-001` remains present and unchanged before the appended R2 section. `TASK-SEA-R2-PLAN-001` is present with status `Active`; the plan contains bounded rows for B-08 through B-13, governance gate, verification, stop conditions, rollback and handoff. `git diff --check` passed. Structural checks found all required R1/R2 markers and no literal credential. `git ls-files` found no tracked `.env` or `.env.*.local` files. No app/server/data/test implementation was changed.
- **Status:** `PASS` for the planning/documentation slice only.
- **Limitations:** human diff review is pending; current governance artifacts still mark Sprint 2 `Waiting for MVP input`; no R2 code, live AISStream connection, sample capture, secret access or product acceptance was performed. The staged `SPRINT-02.md` and pre-existing staged `START.md` changes were not altered by this slice.

### E-SEA-029 — B-08 secure-configuration task contract

- **Related SPEC/TASK ID:** `SPEC-SEA-001`; `TASK-SEA-R2-B08-001`; `TASK-SEA-R2-PLAN-001`; `SPRINT-02.md`.
- **Claim under verification:** the next R2 bounded slice has a separate draft contract for secure configuration and a server-only key accessor, without starting implementation or authorizing B-09.
- **Source:** current `CLAUDE.md`, `SPEC.md`, `PROJECT_BRIEF.md`, `SPRINT-02.md`, `TASK_SPEC.md`, `docs/decisions/README.md`; `git status --short --branch`; staged/unstaged diff names; `git diff --check`; structural contract validator; tracked-path and key-assignment scan.
- **Expected:** the R1 B-07 contract and R2 planning section remain intact; the B-08 draft names only `.env.example`, `.gitignore`, separately authorized `.claude/settings.json` permission rules and `server/aisstream-config.ts`; B-09+ behavior, live provider access, dependency changes and secret reads remain excluded.
- **Observed:** `TASK-SEA-R2-B08-001` was appended with `Draft` status, governance gate, allowed/excluded paths, acceptance criteria, verification, stop conditions, rollback and handoff. The R1 B-07 contract and `TASK-SEA-R2-PLAN-001` remain present. Before this append, staged paths were `SPRINT-02.md` and pre-existing `START.md`; no B-08 implementation path was changed. `git diff --check` passed; the structural validator passed; `git ls-files` found no tracked local secret path; the tracked HEAD scan found no non-empty `AISSTREAM_API_KEY` assignment. No `.env.local` or `.env.*.local` file was read or created.
- **Timestamp / environment:** 2026-09-23; macOS; local SeaRadar workspace; Node.js/runtime not used for this contract-only check.
- **Status:** `PASS` for contract/document boundary and secret-path scan; `UNKNOWN` for accessor behavior, permission refusal, provider availability and all R2 product acceptance.
- **Reviewer / owner:** delivery/technical owner — executor role; human review and R2 scope authorization remain pending.
- **Limitations and follow-up:** the current `CLAUDE.md`/`SPEC.md` governance gate still says Sprint 2 `Waiting for MVP input`; no implementation, permission-file edit, live request, dependency change or secret access was performed. A refusal test using a local secret fixture is not run because this session explicitly forbids creating or reading such a file. Obtain explicit `continue` and R2 authorization before implementing B-08.

### E-SEA-030 — R2 scope authorization and governance synchronization

- **Related SPEC/TASK ID:** `SPEC-SEA-001` v1.1.0; `TASK-SEA-R2-B08-001`; `TASK-SEA-R2-PLAN-001`; `DEC-006-R2-SCOPE`.
- **Claim under verification:** the product owner's explicit R2/B-08 authorization is represented in versioned governance artifacts without claiming R2 implementation or acceptance.
- **Source:** user confirmation in the current session: “Підтверджую scope R2 і дозволяю перейти до B-08”; `DEC-006-r2-scope.md`; `CLAUDE.md`; `SPEC.md`; `docs/decisions/README.md`; `TASK_SPEC.md`; `git diff --check`; governance structural validator; staged/unstaged path inspection.
- **Expected:** R2 is authorized as task-gated; B-08 is the current bounded slice; Sprint 3 and B-09…B-13 remain separately gated; R1 B-07 history and staged `SPRINT-02.md`/`START.md` paths remain untouched.
- **Observed:** `DEC-006-R2-SCOPE` was added with status `Ready`; `CLAUDE.md` is v1.3.0 and identifies R2 as authorized with B-08 task-gated; `SPEC.md` is v1.1.0 and links R2/DEC-006; the decision index lists DEC-006 and marks Sprint 2 allocation partially resolved; `TASK-SEA-R2-B08-001` is v1.0.0/`Active` and links DEC-006. `git diff --check` passed; governance validator passed; staged paths remained `SPRINT-02.md` and pre-existing `START.md`; no B-08 implementation path was changed in this governance step.
- **Timestamp / environment:** 2026-09-23; macOS; local SeaRadar workspace; no live provider or secret access.
- **Status:** `PASS` for governance synchronization and recorded authorization.
- **Reviewer / owner:** product owner — scope authorization; delivery/technical owner — artifact update.
- **Limitations and follow-up:** this evidence does not prove B-08 accessor behavior, permission refusal, AISStream availability, key validity or any R2 user-story acceptance. Proceed only with B-08 paths; do not start B-09.

### E-SEA-031 — B-08 partial implementation checks

- **Related SPEC/TASK ID:** `SPEC-SEA-001` v1.1.0; `TASK-SEA-R2-B08-001`; `DEC-006-R2-SCOPE`.
- **Claim under verification:** the non-permission B-08 configuration and accessor slice is bounded and passes its available local checks without reading a real key or contacting AISStream.
- **Source:** `.env.example`; unchanged `.gitignore`; `server/aisstream-config.ts`; `git diff --check`; changed-path and source-boundary validators; `git check-ignore --no-index`; `git ls-files`; direct TypeScript check; `npx tsc --noEmit`; `npm run build`; `npm ls --depth=0`; Node 22 `--experimental-strip-types` assertions.
- **Expected:** `.env.example` contains only `AISSTREAM_API_KEY=`; existing ignore rules protect local env files while allowing the example; accessor returns `null` for missing/blank input without logging, network access or client imports; no dependencies or product paths change.
- **Observed:** `.env.example` exactly matched the one-line empty placeholder; `.gitignore` was byte-for-byte unchanged and `git check-ignore --no-index` passed for `.env.local` and `.env.test.local` while `.env.example` was not ignored; no local env path was tracked. Source checks passed for the accessor boundary. The first direct TypeScript command failed with TS5112 because TypeScript 6 refuses a file argument while loading `tsconfig.json`; the corrected `--ignoreConfig` command then required `--types node` and passed. Normal `npx tsc --noEmit` passed; `npm run build` passed with the pre-existing external package-lock warning; `npm ls --depth=0` completed with the pre-existing extraneous `@emnapi/runtime` and `@img/sharp-wasm32`; missing/blank accessor assertions passed. No `.env.local` or `.env.*.local` file was created/read, no real key was used, and no live AISStream request was made.
- **Timestamp / environment:** 2026-09-23; macOS; Node.js 22; Next.js 16.3.5; TypeScript 6.0.3; npm dependency tree unchanged.
- **Status:** `PASS` for the available `.env.example`, ignore-boundary, source, type, build and missing/blank accessor checks; `BLOCKED` for project permission rules because the session denied the requested configuration-skill action before `.claude/settings.json` could be created.
- **Reviewer / owner:** delivery/technical owner — executor role.
- **Limitations and follow-up:** `.claude/settings.json` was not created, so B-08 is incomplete and the permission refusal matrix remains unverified. No human final diff review or commit/push was performed. The exact permission change needs explicit approval in a session that permits project settings modification; after that, rerun the settings checks and review the complete B-08 diff. AISStream registration is not required for this slice.

### E-SEA-032 — B-08 permission rules and refusal matrix

- **Related SPEC/TASK ID:** `SPEC-SEA-001` v1.1.0; `TASK-SEA-R2-B08-001`; `DEC-006-R2-SCOPE`.
- **Claim under verification:** the approved project-level deny rules were created narrowly and block reads of the specified local secret paths without changing the local settings file.
- **Source:** user authorization in session; `.claude/settings.json` creation result; unchanged `.claude/settings.local.json`; `test ! -e` checks for `.env`, `.env.local` and `.env.test.local`; read attempts for those absent paths; `.env.example` read allowance.
- **Expected:** only `Read(./.env)`, `Read(./.env.local)` and `Read(./.env.*.local)` are denied; secret-path checks are blocked; `.env.example` remains readable; no secret file is accessed.
- **Observed:** `.claude/settings.json` was created with the three approved deny rules. `.claude/settings.local.json` was not changed. `.env`, `.env.local` and `.env.test.local` were confirmed absent before permission checks; read attempts were denied by the active project permission settings. `.env.example` remained readable. No secret content, real key or live AISStream request was used.
- **Timestamp / environment:** 2026-09-23; macOS; Node.js 22; Claude Code project settings active.
- **Status:** `PASS` for settings creation and the available permission refusal/allowance matrix; final human diff review remains pending.
- **Reviewer / owner:** delivery/technical owner — executor role.
- **Limitations and follow-up:** this evidence does not prove real-key safety, provider availability or R2 user-story acceptance. Perform the human diff review and choose `continue`, `revise` or `HOLD` before B-09 or commit/push. AISStream registration is not required for this slice.

### E-SEA-033 — B-08 final diff review

- **Related SPEC/TASK ID:** `SPEC-SEA-001` v1.1.0; `TASK-SEA-R2-B08-001`; `DEC-006-R2-SCOPE`.
- **Claim under verification:** the final B-08 diff is bounded, internally consistent and ready for the user-authorized commit/push.
- **Source:** final working-tree diff/status; `.env.example`; `.claude/settings.json`; `server/aisstream-config.ts`; `git diff --check`; `npx tsc --noEmit`; `npm run build`; secret-path absence checks; prior permission matrix and accessor checks.
- **Expected:** no B-08 scope drift or secret exposure; documentation reflects the completed settings step; final checks pass; no commit includes staged/untracked paths outside the selected B-08/governance boundary.
- **Observed:** the review found and corrected the stale B-08 handoff and metadata dates/versions. The final patch check and TypeScript validation passed; the production build passed with the known external package-lock warning; required B-08 paths were present, secret fixture paths were absent, and no application/package/test/live-provider paths changed. The user explicitly authorized commit and push on branch `sprint2`.
- **Timestamp / environment:** 2026-09-23; macOS; Node.js 22; Next.js 16.3.5; TypeScript 6.0.3.
- **Status:** `PASS` for final diff review and commit boundary.
- **Reviewer / owner:** delivery/technical owner — executor role; user authorization for commit/push.
- **Limitations and follow-up:** this evidence does not claim R2 runtime acceptance, provider availability, real-key validity or B-09 readiness. Commit only the selected B-08/governance paths; preserve pre-existing staged and unrelated untracked paths. Stop before B-09.

### E-SEA-034 — B-09 reader and intermediate route local checks

- **Related SPEC/TASK ID:** `SPEC-SEA-001` v1.1.0; `TASK-SEA-R2-B09-001` v1.0.0; `DEC-006-R2-SCOPE`.
- **Claim under verification:** the bounded B-09 server reader, intermediate route and deterministic lifecycle tests satisfy the approved local contract without reading a real key or contacting AISStream.
- **Source:** official AISStream documentation (`https://aisstream.io/documentation`); `TASK_SPEC.md`; `SPRINT-02.md`; `server/aisstream-config.ts`; `server/aisstream-reader.ts`; `app/api/snapshot/route.ts`; `tests/snapshot-reader.spec.ts`; `git diff --check`; structural B-09 validator; tracked-path secret scan; ignored-file metadata check; direct TypeScript check; `npx tsc --noEmit`; `npm run build`; `npm ls --depth=0`; `npx playwright test tests/snapshot-reader.spec.ts`; sanitized loopback `curl` check.
- **Expected:** the reader uses the documented server endpoint and exact subscription, starts the 15-second deadline before construction, returns the first text message or `raw: null`, maps fixed failures without provider/key text, cleans socket/timer once, exposes a Node.js route, and keeps the local key file empty and ignored.
- **Observed:** the official documentation confirmed `wss://stream.aisstream.io/v0/stream` and the required subscription fields. The route built as a dynamic Node.js handler. Direct server type-check passed; normal TypeScript validation passed; production build passed; dependency inspection showed no new dependency; structural validation and `git diff --check` passed. The focused Playwright spec ran 7 tests and all 7 passed, covering immediate subscription, total-window timing, raw/null, connection/provider/disconnect/binary mappings, cancellation cleanup including an abort race, and blank-key route behavior. The existing local server returned the expected no-key loopback response with HTTP 502 and `no_api_key`. `.env.local` exists as a zero-byte ignored path; its contents were not read or printed. No real key, live request or provider payload was used.
- **Timestamp / environment:** 2026-09-23; macOS; Node.js 22.x; Next.js 16.3.5; TypeScript 6.0.3; Playwright 1.63.0.
- **Status:** `PASS` for bounded local implementation checks; `UNKNOWN`/`BLOCKED` for live provider availability, real-key validity, live connection/message receipt and complete R2 user-story acceptance.
- **Reviewer / owner:** delivery/technical owner — executor role; final human diff review remains required.
- **Limitations and follow-up:** the test suite uses fake WebSocket/timer boundaries and cannot prove AISStream availability or live payload semantics. The build retains the pre-existing warning about the external `/Users/romanmakarenko/package-lock.json`; `npm ls --depth=0` retains pre-existing extraneous `@emnapi/runtime` and `@img/sharp-wasm32`. Do not add the local key to chat or repository files; final human diff review must choose `continue`, `revise` or `HOLD` before any commit/push.

### E-SEA-035 — B-09 final human diff review

- **Related SPEC/TASK ID:** `TASK-SEA-R2-B09-001` v1.0.0; `E-SEA-034`.
- **Claim under verification:** the bounded B-09 implementation diff was reviewed and accepted for continuation without authorizing commit/push or live provider access.
- **Source:** user instruction `continue`; complete working-tree diff; `TASK_SPEC.md`; `server/aisstream-reader.ts`; `app/api/snapshot/route.ts`; `tests/snapshot-reader.spec.ts`; `EVIDENCE.md`; `RUNBOOK.md`; final `git diff --check`.
- **Expected:** only the approved B-09 paths and append-only records changed; no secret content, dependency, unrelated product behavior, B-10–B-13 scope, commit or push is introduced.
- **Observed:** the review decision was `continue`. The approved B-09 implementation paths and governance records are bounded; `.env.local` remains ignored and its contents were not read; no package manifest, lockfile, UI/map path, existing B-07 test or B-08 file changed. No commit or push was performed.
- **Timestamp / environment:** 2026-09-23; macOS; branch `sprint2`.
- **Status:** `PASS` for final bounded diff review; live provider availability, real-key validity and complete R2 user-story acceptance remain `Unknown`/`Needs verification`.
- **Reviewer / owner:** delivery/technical owner — executor role; user decision `continue`.
- **Limitations and follow-up:** B-09 is verified only as a local intermediate reader/route slice. A separate authorization is required for live AISStream access, and a separate explicit authorization is required before commit/push.

### E-SEA-036 — Sprint 2 decomposition human diff review

- **Related SPEC/TASK ID:** `SPRINT-SEA-R2-001` v1.0.0; `TASK-SEA-R2-PLAN-001`; `SPRINT-02.md`.
- **Claim under verification:** the corrected R2 B-08…B-13 decomposition is internally consistent and ready for continued documentation work without authorizing product implementation, live provider access or delivery.
- **Source:** complete `SPRINT-02.md` review after the requested corrections; metadata/entry/field structural validator; dependency-boundary and contract-text inspection; trailing-whitespace check; `git status --short --branch`.
- **Expected:** Sprint 2 metadata is present; all six bounded entries contain Goal, Non-goals, Check, Evidence, Acceptance, Dependency boundary, Handoff and Status; B-10 provenance/schema boundary is explicit; B-12 R2 deterministic-check scope is distinguished from the R3 release-level suite; product code, secrets and unrelated paths remain outside the change.
- **Observed:** all six entries and required fields are present; metadata is complete; dependencies are explicit from B-08 through B-13; B-10 identifies the approved PositionReport fields and live/documentation/synthetic provenance classes; B-12 distinguishes focused deterministic checks from the R3 release-level suite; trailing-whitespace validation passed. `SPRINT-02.md` remains untracked, and no product code, secret content, live request, commit or push was introduced.
- **Timestamp / environment:** 2026-09-23; macOS; local SeaRadar workspace; branch `sprint2`.
- **Status:** `PASS` for the bounded documentation review; `CONTINUE WITH APPROVAL` for the next documentation/task-contract slice.
- **Reviewer / owner:** delivery/technical owner — executor role; review recorded at the user's request.
- **Limitations and follow-up:** this review proves document structure and consistency only. It does not prove B-10…B-13 implementation, AISStream availability, real-key validity, user-story acceptance or release readiness. B-10 still requires its own task contract and explicit implementation authorization; commit/push remains separately unauthorized.

### E-SEA-037 — B-10 sample/provenance task contract preparation

- **Related SPEC/TASK ID:** `SPEC-SEA-001` v1.1.0; `TASK-SEA-R2-B10-001` v1.0.0; `SPRINT-SEA-R2-001`; `DEC-006-R2-SCOPE`.
- **Claim under verification:** a bounded B-10 contract and next-session handoff are prepared before any sample data or B-10 implementation is created.
- **Source:** `TASK_SPEC.md` B-10 appended section; `NEXT_SESSION.md`; `SPRINT-02.md` B-10 entry; `SPEC.md`; `DEC-006-r2-scope.md`; `git status --short --branch`; structural contract validator; B-10 output-path absence checks; `git diff --check`.
- **Expected:** the contract defines goal, authorization gate, allowed/excluded paths, sample source and schema, provenance, acceptance, future checks, stop conditions, rollback and handoff; the sample defaults to documentation-derived or synthetic data and does not authorize a live request or use of a real key.
- **Observed:** `TASK-SEA-R2-B10-001` was appended with status `Draft`. Structural checks passed for metadata, gate, future output paths, origin classes, security boundary, acceptance, verification, stop/rollback/handoff and separate live authorization. Both future sample paths were absent when checked. `git diff --check` passed. `NEXT_SESSION.md` was updated to identify B-10 contract review as the next bounded task. No product code, sample, dependency, live request or commit/push was performed. An initial ad hoc metadata validator failed because its metadata window/format expectation did not match the document; the corrected validator passed all assertions.
- **Timestamp / environment:** 2026-09-23; macOS; local SeaRadar workspace; branch `sprint2`.
- **Status:** `PASS` for contract-preparation structure and path boundary; `PENDING` for human diff review; B-10 implementation remains unauthorized.
- **Reviewer / owner:** delivery/technical owner — executor role; product-owner/human review pending.
- **Limitations and follow-up:** this verifies only contract and handoff documentation. It does not prove sample existence, AISStream availability, real-key validity, live receipt, sample retention permission, B-11 readiness, user-story acceptance or release readiness. Review the B-10 contract and explicitly choose `continue`, `revise` or `HOLD`; a separate authorization is still required before implementation or live provider access.

### E-SEA-038 — B-10 synthetic PositionReport sample checks

- **Related SPEC/TASK ID:** `SPEC-SEA-001` v1.1.0; `TASK-SEA-R2-B10-001` v1.0.0; `SPRINT-SEA-R2-001`; `DEC-006-R2-SCOPE`.
- **Claim under verification:** the authorized synthetic B-10 sample and provenance are internally consistent with the approved field contract and do not claim live data.
- **Source:** user contract-review authorization (“даю дозвіл”) followed by explicit implementation authorization (“Дозволяю реалізацію B-10 на документаційному або синтетичному зразку.”); `data/samples/position-report.sample.json`; `data/samples/PROVENANCE.md`; `TASK_SPEC.md`; `SPRINT-02.md`; Node JSON/schema/provenance assertion; targeted credential-like-value scan; whitespace and Git path checks.
- **Expected:** one JSON message envelope contains all agreed `MetaData` and `Message.PositionReport` fields with exact casing; paired coordinates agree and lie within the intended Dover bounds; provenance labels the fixture synthetic, distinguishes its synthetic `time_utc` from the artifact creation date, and makes no live-observation claim; only approved B-10 paths change.
- **Observed:** JSON parsing and assertions passed for one envelope, exact field names/casing and types, matching coordinates within `[[50.75, 0.95], [51.25, 1.95]]`, and required provenance statements. The two B-10 outputs contain no matched credential-like assignments/token pattern. The new `data/samples/` tree contains only the approved sample and provenance files. `git diff --check` and Python trailing-whitespace checks passed. Existing unrelated staged/untracked paths were left untouched; tracked changes remain in existing `TASK_SPEC.md`, `EVIDENCE.md` and `RUNBOOK.md` modifications.
- **Timestamp / environment:** 2026-09-23; macOS; local SeaRadar workspace; branch `sprint2`.
- **Status:** `PASS` for sample structure, provenance consistency and bounded path checks; final human diff review remains pending.
- **Reviewer / owner:** delivery/technical owner — implementation/checks; user authorized synthetic or documentation-derived sample implementation.
- **Limitations and follow-up:** this proves only local fixture structure and recorded provenance, not vessel identity, AISStream availability, live receipt, provider semantics beyond the task contract, retention terms, or R2 acceptance. Final human diff review must choose `continue`, `revise` or `HOLD` before B-11. Live access, commit and push remain separately unauthorized.

### E-SEA-039 — B-10 final human diff review

- **Related SPEC/TASK ID:** `SPEC-SEA-001` v1.1.0; `TASK-SEA-R2-B10-001` v1.0.0; `SPRINT-SEA-R2-001`; `DEC-006-R2-SCOPE`.
- **Claim under verification:** the completed B-10 sample/provenance diff is bounded, accurately described and accepted for continuation without authorizing B-11 or external/live operations.
- **Source:** user review decision (“continue B-10 review”); inspected `data/samples/position-report.sample.json`, `data/samples/PROVENANCE.md`, B-10 section of `TASK_SPEC.md`, `E-SEA-038`, latest `RUNBOOK.md` entry; final Git status/path inspection and `git diff --check`.
- **Expected:** only the two authorized sample outputs plus append-only B-10 task/evidence/history changes are included; fixture/provenance match the contract; pre-existing deletion/untracked inputs remain untouched; no B-11, live request, secret access, commit or push is introduced.
- **Observed:** the review found the one-envelope synthetic sample, required fields/casing, matching in-bounds coordinates and non-live provenance consistent with B-10. `data/samples/` contains only the approved JSON and provenance files. `git diff --check` passed; tracked worktree modifications are `TASK_SPEC.md`, `EVIDENCE.md`, `RUNBOOK.md` plus the pre-existing `START.md` deletion; no staged paths are present. User decision: `continue`.
- **Timestamp / environment:** 2026-09-23; macOS; local SeaRadar workspace; branch `sprint2`.
- **Status:** `PASS`; B-10 is verified within its bounded sample/provenance scope.
- **Reviewer / owner:** user — final B-10 review decision; delivery/technical owner — checks and recordkeeping.
- **Limitations and follow-up:** this review does not establish live observation, AISStream availability, real-key validity, sample retention terms, R2 acceptance or release readiness. B-11 needs a separate task contract and explicit authorization; live access, commit and push remain separately gated.

### E-SEA-040 — B-10 remote delivery

- **Related SPEC/TASK ID:** `SPEC-SEA-001` v1.1.0; `TASK-SEA-R2-B10-001` v1.0.0; `E-SEA-038`; `E-SEA-039`.
- **Claim under verification:** the reviewed B-10 sample/provenance delivery commit is present on `origin/sprint2` and excludes unrelated working-tree paths.
- **Source:** `git ls-remote origin refs/heads/sprint2`; `git status --short --branch`; `git log -1 --oneline --decorate`; `git show --format=fuller --stat --oneline HEAD`.
- **Expected:** local `HEAD` and `origin/sprint2` point to the B-10 delivery commit; its five changed paths are the approved sample and B-10 records; pre-existing deletion/untracked inputs remain excluded.
- **Observed:** `git ls-remote` returned `72f8b94eb9c88a92d84281be88d7629e458ed0e8` for `refs/heads/sprint2`; `HEAD` and `origin/sprint2` both point to `72f8b94` (`feat(r2): add B-10 PositionReport sample`). The commit contains exactly `EVIDENCE.md`, `RUNBOOK.md`, `TASK_SPEC.md`, `data/samples/PROVENANCE.md` and `data/samples/position-report.sample.json`. `git status --short --branch` showed only the pre-existing `START.md` deletion and excluded untracked inputs.
- **Timestamp / environment:** 2026-09-23; macOS; local SeaRadar workspace; branch `sprint2`.
- **Status:** `PASS` for remote branch synchronization and bounded commit contents.
- **Reviewer / owner:** delivery/technical owner — delivery verification; user authorization for commit/push was provided.
- **Limitations and follow-up:** remote delivery does not establish live AISStream observation, provider availability, sample retention terms, R2 acceptance or release readiness. B-11 remains separately task-gated; do not begin it without its own contract and explicit authorization.

### E-SEA-041 — B-11 task contract preparation

- **Related SPEC/TASK ID:** `SPEC-SEA-001` v1.1.0; `TASK-SEA-R2-B11-001` v1.0.0 (Draft); `TASK-SEA-R2-B10-001`; `DEC-006-R2-SCOPE`.
- **Claim under verification:** a B-11 transformer task contract is appended before implementation and keeps implementation, live access, and delivery separately gated.
- **Source:** B-11 entry in `SPRINT-02.md`; `DEC-006-r2-scope.md`; `app/vessel-model.ts`; B-10 sample and provenance; new B-11 section in `TASK_SPEC.md`; Git status/log/remote inspection; focused structural assertions; `git diff --check -- TASK_SPEC.md`.
- **Expected:** the contract defines the pure mapping/validation boundary, exact future implementation/test paths, observable acceptance, implementation gate, stop conditions, rollback, and handoff; no transformer, test, data, dependency, live request, or unrelated path is added.
- **Observed:** `TASK-SEA-R2-B11-001` was appended with version `1.0.0` and status `Draft`. The contract specifies MMSI-to-string ID, trimmed/null name, UTC ISO-millisecond time, authoritative nested report coordinates and bounds/sentinels, optional speed/course null/zero behavior, `source: "aisstream"`, purity, future paths `server/position-report-transformer.ts` and `tests/position-report-transformer.spec.ts`, acceptance, gates, stop/recovery, and handoff. The corrected structural validator passed; `git diff --check -- TASK_SPEC.md` passed. Initial ad hoc exact-string assertions needed correction to match equivalent wording in the contract; no contract content change was needed for those validator mismatches. Git inspection showed `HEAD` and `origin/sprint2` at `755c021`; existing `START.md` deletion and untracked paths remain outside this change.
- **Timestamp / environment:** 2026-09-23; macOS; local SeaRadar workspace; branch `sprint2`.
- **Status:** `PASS` for contract structure and patch formatting; `PENDING` for human contract review and separate implementation authorization.
- **Reviewer / owner:** delivery/technical owner — contract preparation and structural check.
- **Limitations and follow-up:** this evidence verifies documentation only. No transformer or test exists or was run; no live provider/key access or B-11 acceptance is claimed. Human review must choose `continue`, `revise` or `HOLD`; obtain separate explicit authorization before implementation. B-12 remains gated.

### E-SEA-042 — B-11 MMSI/timestamp contract clarification and delivery

- **Related SPEC/TASK ID:** `SPEC-SEA-001` v1.1.0; `TASK-SEA-R2-B11-001` v1.1.0 (Draft); `E-SEA-041`; `DEC-006-R2-SCOPE`.
- **Claim under verification:** the reviewed B-11 contract makes MMSI input forms and UTC timestamp syntax/precision explicit, and the bounded documentation change is delivered to `origin/sprint2`.
- **Source:** revised B-11 section in `TASK_SPEC.md`; focused structural/content validator; `git diff --check`; complete selected-file diff review; Git commit, push, status and remote-ref outputs.
- **Expected:** only B-11 contract clarification and append-only evidence/runbook records are committed; the contract remains Draft and no implementation, test, secret access or live request is included; remote branch matches the delivery commit.
- **Observed:** structural assertions passed for the version/status, MMSI accepted/rejected forms and conversions, UTC-only timestamp grammar, strict calendar/clock validation, fraction padding/truncation without rounding, acceptance coverage, authorization gates and clarification history. `git diff --check -- TASK_SPEC.md EVIDENCE.md RUNBOOK.md` and the staged patch check passed. Review confirmed no transformer/test implementation or B-11 acceptance claim. Commit `863a57d` (`docs(r2): clarify B-11 transformer contract`) contains exactly these three documentation paths; push completed `755c021..863a57d sprint2 -> sprint2`, and `git ls-remote origin refs/heads/sprint2` returned `863a57d7eb552c3e600438bfa3a6af50567813af`.
- **Timestamp / environment:** 2026-09-23; macOS; local SeaRadar workspace; branch `sprint2`.
- **Status:** `PASS` for contract clarity, bounded documentation review and remote delivery verification; implementation and B-11 acceptance remain unauthorized/unstarted.
- **Reviewer / owner:** delivery/technical owner — contract review and checks; user explicitly requested commit/push if the clarified contract was ready.
- **Limitations and follow-up:** these checks establish documentation structure and delivery only. No transformer behavior, tests, live provider observation, real-key validity, complete R2 acceptance or release readiness is established. B-11 contract remains `Draft`; implementation requires separate human `continue` and explicit authorization. B-12 remains task-gated.

### E-SEA-043 — B-11 PositionReport transformer implementation checks

- **Related SPEC/TASK ID:** `SPEC-SEA-001` v1.1.0; `TASK-SEA-R2-B11-001` v1.1.0; `SPRINT-SEA-R2-001`; `E-SEA-042`; `DEC-006-R2-SCOPE`.
- **Claim under verification:** the authorized pure transformer maps valid decoded sample-shaped PositionReport envelopes to the shared `Vessel` shape and rejects invalid required fields, within the local B-11 contract.
- **Source:** `TASK_SPEC.md`; `server/position-report-transformer.ts`; `tests/position-report-transformer.spec.ts`; `app/vessel-model.ts`; synthetic fixture `data/samples/position-report.sample.json` and `data/samples/PROVENANCE.md`; Playwright and TypeScript command output; Git status/diff checks.
- **Expected:** deterministic offline mapping and validation; required identity/time/report position failures return `null`; invalid optional motion maps to `null`, zero remains valid; report coordinates are authoritative; input is not mutated; only authorized B-11 paths plus append-only task/evidence/history records change.
- **Observed:** `npx playwright test tests/position-report-transformer.spec.ts` passed all 9 tests. `npx tsc --noEmit` passed. `npx tsc --ignoreConfig --noEmit --strict --target ES2017 --module esnext --moduleResolution bundler --skipLibCheck --resolveJsonModule --esModuleInterop server/position-report-transformer.ts tests/position-report-transformer.spec.ts` passed. The initial invocation `npx tsc --noEmit --strict --target ES2017 --module esnext --moduleResolution bundler --skipLibCheck --resolveJsonModule --esModuleInterop server/position-report-transformer.ts tests/position-report-transformer.spec.ts` exited nonzero with TypeScript 6.0.3 error `TS5112` because it detected `tsconfig.json`; the corrected command passed. `npm run build` passed (Next.js 16.3.5); its output warned that the parent `/Users/romanmakarenko/package-lock.json` is outside this repository and reported `.env.local` as an environment source. No environment values were printed or manually inspected, and no live AISStream request was made. `git diff --check` passed for tracked changes; a separate Python trailing-whitespace check passed for both new untracked code files.
- **Manual sample comparison:** sample `MetaData.MMSI` `999000001` maps to `id: "999000001"`; `Message.PositionReport.Latitude/Longitude` `51.0/1.45` map to `lat/lon` `51/1.45`; `MetaData.time_utc` `2026-09-23 15:00:00.000000000 +0000 UTC` maps to `2026-09-23T15:00:00.000Z`; `Sog` `12.4` maps to `speedKnots: 12.4`; `Cog` `123.4` maps to `courseDeg: 123.4`. These compare only to the synthetic fixture.
- **Timestamp / environment:** 2026-09-24; macOS; local SeaRadar workspace; branch `sprint2`.
- **Status:** `PASS` for focused local transformer behavior, type checks, build and recorded fixture comparisons; final human diff review and full B-11 acceptance remain pending.
- **Reviewer / owner:** delivery/technical owner — implementation and local checks.
- **Limitations and follow-up:** no live observation, provider availability/semantics beyond the approved contract, real-key validity, R2 user-story acceptance or release readiness is established. Preserve the synthetic fixture limitation. Human diff review is required before marking B-11 `DONE`; B-12 remains task-gated.

### E-SEA-044 — B-11 final diff review

- **Related SPEC/TASK ID:** `SPEC-SEA-001` v1.1.0; `TASK-SEA-R2-B11-001` v1.1.0; `E-SEA-043`; `DEC-006-R2-SCOPE`.
- **Claim under verification:** the B-11 transformer/test implementation and associated records conform to the approved bounded task, with no functional blocker found in the final review.
- **Source:** user instruction “review B-11 diff and continue”; `server/position-report-transformer.ts`; `tests/position-report-transformer.spec.ts`; B-11 section of `TASK_SPEC.md`; E-043 and final changed-path/status inspection.
- **Expected:** mapping, validation, null/zero behavior, timestamp precision, purity and test coverage match the B-11 contract; no excluded implementation path or B-12 work is introduced; pre-existing deletion and untracked paths remain untouched.
- **Observed:** review found no functional or scope findings. MMSI parsing preserves digit-string leading zeros and limits numeric input to non-negative safe integers; timestamp grammar and calendar/clock checks match the UTC contract; coordinates come only from the nested report and enforce inclusive ranges; optional Sog/Cog validation preserves zero; unknown fields and `TrueHeading` do not affect mapping; output matches `Vessel` and the transformer leaves input unchanged. The focused suite and checks remain as recorded in `E-SEA-043`. No implementation changes were made during this review. The user directed `continue` after requesting the review.
- **Timestamp / environment:** 2026-09-24; local SeaRadar workspace; branch `sprint2`.
- **Status:** `PASS` for final bounded B-11 diff review; B-11 is `DONE` within its local task scope.
- **Reviewer / owner:** delivery/technical owner — code/diff review; user — instruction to continue.
- **Limitations and follow-up:** this review does not establish live AISStream observation, provider availability or semantics beyond the task contract, real-key validity, R2 user-story acceptance or release readiness. B-12 requires its own task contract, review and explicit implementation authorization; it was not started.

### E-SEA-045 — B-11 commit and remote delivery

- **Related SPEC/TASK ID:** `SPEC-SEA-001` v1.1.0; `TASK-SEA-R2-B11-001` v1.1.0; `E-SEA-043`; `E-SEA-044`.
- **Claim under verification:** the user-authorized B-11 implementation and review records were committed on `sprint2` and the same commit is present on `origin/sprint2`.
- **Source:** explicit user request to commit and push; staged path inspection; `git diff --cached --check`; `git commit`; `git push origin sprint2`; `git show --format=fuller --stat --oneline HEAD`; `git status --short --branch`; `git log -1 --oneline --decorate`; `git ls-remote origin refs/heads/sprint2`.
- **Expected:** only the five reviewed B-11 paths are in the commit; local HEAD and remote sprint2 point to the same commit; pre-existing deletion and untracked paths remain unstaged and untouched.
- **Observed:** commit `9f1dc6a3d593165f77f6d55dd8fbffa8ccad8abd` (`feat(r2): implement B-11 PositionReport transformer`) contains exactly `EVIDENCE.md`, `RUNBOOK.md`, `TASK_SPEC.md`, `server/position-report-transformer.ts` and `tests/position-report-transformer.spec.ts`. `git push origin sprint2` completed `1687875..9f1dc6a sprint2 -> sprint2`. `git status` and `git log` showed `HEAD` and `origin/sprint2` at `9f1dc6a`; `git ls-remote origin refs/heads/sprint2` returned the same full hash. `START.md` remains deleted and the unrelated untracked paths remain unstaged.
- **Timestamp / environment:** 2026-09-24; local SeaRadar workspace; branch `sprint2`.
- **Status:** `PASS` for scoped commit, push and remote synchronization.
- **Reviewer / owner:** delivery/technical owner — commit boundary and remote verification; user — explicit commit/push request.
- **Limitations and follow-up:** delivery does not establish live AISStream receipt, provider availability, real-key validity, complete R2 acceptance or release readiness. B-12 remains separately task-gated.

### E-SEA-046 — B-12 snapshot collector implementation checks

- **Related SPEC/TASK ID:** `SPEC-SEA-001` v1.1.0; `TASK-SEA-R2-B12-001` v1.0.0; `DEC-006-R2-SCOPE`; `DEC-007-R2-B09-STREAMING-BOUNDARY`; `E-SEA-034`; `E-SEA-043`.
- **Claim under verification:** the authorized B-12 reader/collector/route slice follows its local contract under deterministic fake-event and controlled-time checks, without a live AISStream request or real-key inspection.
- **Source:** `server/aisstream-reader.ts`; `server/snapshot-collector.ts`; `app/api/snapshot/route.ts`; `tests/snapshot-reader.spec.ts`; `tests/snapshot-collector.spec.ts`; `npx playwright test tests/snapshot-reader.spec.ts tests/snapshot-collector.spec.ts`; `npx tsc --noEmit`; `AISSTREAM_API_KEY= npm run build`; `git diff --check`; separate no-index whitespace checks for the two new files.
- **Expected:** one ordered text-event stream over the approved reader connection; one collector-owned 15-second deadline and 100-unique-vessel limit; deterministic timestamp selection; fixed error responses without partial data; cancellation and exactly-once cleanup; no excluded path or network/key activity.
- **Observed:** focused Playwright checks passed: `17 passed`. `npx tsc --noEmit` exited successfully with no diagnostics printed. `AISSTREAM_API_KEY= npm run build` passed. `git diff --check` passed; the two new untracked files had no whitespace diagnostics in separate no-index checks. The implementation and tests cover ordered same-socket messages, deadline boundary, empty success, deduplication and timestamp ordering, 100-vessel completion, malformed payloads, post-partial failures, cancellation, late events, cleanup and route response shapes. IDE diagnostics requests timed out; the standalone TypeScript check passed. The build output reported `.env.local` as an environment source and warned that `/Users/romanmakarenko/package-lock.json` is outside the repository and suggested `turbopack.root`; the build completed. No environment value was manually inspected or printed, and no live request was made.
- **Timestamp / environment:** 2026-09-24; macOS; local SeaRadar workspace; branch `sprint2`.
- **Status:** `PASS` for the recorded focused local checks; `UNKNOWN`/`Needs verification` for live provider availability, real-key validity, live receipt, actual AISStream event semantics, complete R2 user-story acceptance and release readiness.
- **Reviewer / owner:** delivery/technical owner — implementation and local checks.
- **Limitations and follow-up:** test doubles establish behavior only for the exercised event sequences. The automatic `.env.local` source notice is recorded; its contents were not manually read or printed. No live AISStream request, deployment, commit or push was performed. Final human diff-review decision is recorded separately in `E-SEA-047`.

### E-SEA-047 — B-12 final human diff review

- **Related SPEC/TASK ID:** `TASK-SEA-R2-B12-001` v1.0.0; `E-SEA-046`; `DEC-007-R2-B09-STREAMING-BOUNDARY`.
- **Claim under verification:** the user completed the final B-12 diff review and accepted continuation of the bounded local implementation.
- **Source:** user message: “diff перевірив, continue”; B-12 implementation diff and changed-path list; `TASK_SPEC.md`; local checks recorded in `E-SEA-046`.
- **Expected:** record only the user's stated review decision; do not infer authorization for live access, commit/push, B-13, or overall R2 acceptance.
- **Observed:** the user stated that they reviewed the diff and chose `continue`. The decision closes the B-12 human review gate and accepts the bounded task for local scope. This record does not attribute unstated review findings or authorize external/live operations or delivery.
- **Timestamp / environment:** 2026-09-24; local SeaRadar workspace; branch `sprint2`.
- **Status:** `PASS` for the user's explicit B-12 diff-review decision; live provider behavior, full R2 acceptance and release readiness remain unverified.
- **Reviewer / owner:** user — final diff-review decision; delivery/technical owner — evidence recording.
- **Limitations and follow-up:** no commit or push authorization is implied. B-13, live AISStream access, real-key use and overall product acceptance remain separately gated.

### E-SEA-048 — B-12 commit and remote delivery

- **Related SPEC/TASK ID:** `TASK-SEA-R2-B12-001` v1.0.0; `E-SEA-046`; `E-SEA-047`; `SPRINT-SEA-R2-001` v1.0.0.
- **Claim under verification:** the user-authorized B-12 implementation, records and unchanged `SPRINT-02.md` were committed on `sprint2` and the commit was pushed to `origin/sprint2` without unrelated paths.
- **Source:** user request to commit/push and include `SPRINT-02.md`; staged path inspection; `git diff --cached --check`; `git commit`; `git push origin sprint2`; `git show --format=fuller --stat --oneline HEAD`; `git diff HEAD^ HEAD --name-only`; `git ls-remote origin refs/heads/sprint2`; `git status --short --branch`.
- **Expected:** the delivery commit contains exactly the five B-12 implementation/test paths, `TASK_SPEC.md`, `EVIDENCE.md`, `RUNBOOK.md`, and `SPRINT-02.md`; local and remote sprint2 refs agree; the pre-existing `START.md` deletion and other untracked paths remain excluded.
- **Observed:** commit `3de88ab2d4099a80abb45f010ec9069ed0ad3c70` (`feat(r2): implement B-12 snapshot collector`) contains exactly those nine paths. `git push origin sprint2` completed `bf7cc4e..3de88ab sprint2 -> sprint2`. `git ls-remote origin refs/heads/sprint2` returned `3de88ab2d4099a80abb45f010ec9069ed0ad3c70`; `HEAD` and `origin/sprint2` both point to `3de88ab`. `SPRINT-02.md` was committed as-is and was not edited. `START.md` remains deleted and `.agents/`, `.claude/skills/`, `NEXT_SESSION.md`, `README.pdf`, `reference/` and `skills-lock.json` remain untracked and excluded.
- **Timestamp / environment:** 2026-09-24; local SeaRadar workspace; branch `sprint2`; remote `origin`.
- **Status:** `PASS` for exact commit contents, push and remote synchronization.
- **Reviewer / owner:** delivery/technical owner — commit boundary and remote check; user — explicit commit/push and Sprint-file tracking authorization.
- **Limitations and follow-up:** delivery does not establish live AISStream receipt, real-key validity, complete R2 acceptance or release readiness. B-13 and live access remain separately gated.

### E-SEA-049 — B-12 delivery handoff preparation

- **Related SPEC/TASK ID:** `TASK-SEA-R2-HANDOFF-001`; `TASK-SEA-R2-B12-001`; `E-SEA-046`; `E-SEA-047`; `E-SEA-048`.
- **Claim under verification:** the restart handoff was updated to the delivered B-12 baseline and identifies B-13 contract preparation as the next review-gated action, without authorizing implementation.
- **Source:** `TASK_SPEC.md`; `NEXT_SESSION.md`; `git status --short --branch`; `git log -3 --oneline --decorate`; `git rev-parse HEAD`; `git rev-parse origin/sprint2`; `git ls-remote origin refs/heads/sprint2`; `git diff --check -- TASK_SPEC.md`; focused Python structure/content check.
- **Expected:** local, tracking, and remote refs agree at `fef4a8fc51c9c0e41a8158e4e541af574f895741`; B-12 scope/limitations are stated accurately; B-13 remains contract-preparation/review only; historic R1 handoff is retained; unrelated and secret paths remain untouched.
- **Observed:** local `HEAD`, `origin/sprint2`, and remote `refs/heads/sprint2` were verified at `fef4a8fc51c9c0e41a8158e4e541af574f895741`. `git diff --check -- TASK_SPEC.md` passed and the focused handoff structure/content check passed after correcting an initial validator expectation that did not match the chosen wording. The working tree retained the pre-existing `START.md` deletion and unrelated untracked paths; no staged paths were present. The handoff distinguishes verified local B-12 behavior from unverified live provider/full R2/release claims and keeps B-13 implementation gated.
- **Timestamp / environment:** 2026-09-24; local SeaRadar workspace; branch `sprint2`.
- **Status:** `PASS` for the recorded baseline and handoff structure checks. No product tests, build, server, live request, or secret access was performed for this documentation task.
- **Reviewer / owner:** delivery/technical owner — handoff content and scoped checks.
- **Limitations and follow-up:** governance status in `CLAUDE.md`/`SPEC.md` and historical plan/decision wording remains inconsistent and was not changed. Handoff records remain local/uncommitted; B-13 contract review and separate implementation authorization remain pending.

### E-SEA-050 — human review of handoff diff

- **Related SPEC/TASK ID:** `TASK-SEA-R2-HANDOFF-001`.
- **Claim under verification:** the user reviewed the documentation-only handoff diff and accepted it to continue, without authorizing commit/push or B-13 implementation.
- **Source:** user's messages `diff перевірив` and selected `continue` in the handoff review.
- **Expected:** record the human review choice narrowly; do not infer authorization beyond the handoff documentation checkpoint.
- **Observed:** user confirmed `diff перевірив` and selected `continue`. No commit, push, B-13 implementation, live request, or secret access was authorized or performed by this review decision.
- **Timestamp / environment:** 2026-09-24; local SeaRadar workspace; branch `sprint2`.
- **Status:** `PASS` for the recorded human review choice only.
- **Reviewer / owner:** user — handoff diff review and decision.
- **Limitations and follow-up:** the decision does not approve or verify B-13 contract content, B-13 implementation, commit/push, live provider behavior, complete R2 acceptance, or release readiness.

### E-SEA-051 — B-13 interface implementation checks and code delivery

- **Related SPEC/TASK ID:** `SPEC-SEA-001 / US-05…US-08`; `TASK-SEA-R2-B13-001` v1.0.0; `TASK-SEA-R2-B07-001`; `E-SEA-050`.
- **Claim under verification:** the separately authorized B-13 interface slice passed its bounded local automated checks and its exact four-path implementation commit is synchronized to `origin/sprint2`.
- **Source:** `npx playwright test tests/vessel-selection.spec.ts tests/snapshot-interface.spec.ts`; `npx tsc --noEmit`; `npm run build`; `git show --format=fuller --stat --oneline HEAD`; `git diff HEAD^ HEAD --name-only`; `git rev-parse HEAD`; `git rev-parse origin/sprint2`; `git ls-remote origin refs/heads/sprint2`.
- **Expected:** all 16 B-07/snapshot-interface Playwright cases pass using mocked API responses and blocked OSM tiles; TypeScript and production build succeed; commit `17006c615f7a93e84c7c554c624b8909691828fb` contains exactly `app/globals.css`, `app/map-shell.tsx`, `app/sea-map.tsx`, and `tests/snapshot-interface.spec.ts`; local and remote sprint2 refs agree.
- **Observed:** Playwright reported `16 passed (12.6s)`; `npx tsc --noEmit` exited successfully; `npm run build` completed successfully (Next.js emitted an out-of-repository `package-lock.json` warning). The implementation commit is `17006c615f7a93e84c7c554c624b8909691828fb` (`feat(r2): deliver B-13 snapshot interface`), its path list was exactly the four expected paths, and local `HEAD`, `origin/sprint2`, and remote `refs/heads/sprint2` all resolved to that hash.
- **Timestamp / environment:** 2026-09-24; local SeaRadar workspace; branch `sprint2`; remote `origin`.
- **Status:** `PASS` for the bounded mocked UI checks, typecheck, build, and exact code-commit/remote synchronization.
- **Reviewer / owner:** delivery/technical owner — commands, commit boundary and ref synchronization. No separate human implementation-diff review decision is claimed by this evidence.
- **Limitations and follow-up:** no live AISStream request or real-key inspection/use occurred. These local checks do not establish provider availability/receipt, key validity, full R2 acceptance, final human implementation-diff acceptance or release readiness. The separately requested delivery-record commit/push is not covered by this code-delivery evidence.

### E-SEA-052 — One bounded live AISStream attempt

- **Related SPEC/TASK ID:** `TASK-SEA-R2-B09B10-LIVE-001`; `TASK-SEA-R2-B09-001`; `TASK-SEA-R2-B10-001`; `E-SEA-031`–`E-SEA-039`; `E-SEA-026`; `E-SEA-051`.
- **Claim under verification:** one user-authorized live attempt used the existing server-side key accessor and reader, without exposing the key or raw provider payload, and stopped without retry when no suitable PositionReport was received.
- **Source:** one Node.js 22.23.2 invocation of `getAISStreamApiKey()`, `startAISStreamReader()` and the existing PositionReport transformer; fixed harness stdout; `git check-ignore` and `git ls-files` checks for `.env.local` without reading its contents; live sample-path existence checks; `git diff --check`.
- **Expected:** one connection with a 15-second total deadline; capture only the first valid PositionReport; otherwise close and stop without retry or sample fabrication.
- **Observed:** the first harness evaluation failed at JavaScript parsing before starting the reader and did not create a connection. After correcting that harness-only syntax issue, exactly one bounded live reader invocation terminated with the fixed `provider_error` code. No valid PositionReport was received by the harness, no raw provider/error text was retained, and the attempt was not retried. No live sample or provenance file was created; the existing synthetic B-10 fixture/provenance were not changed. `.env.local` was confirmed ignored and not tracked without inspecting its contents. `git diff --check` passed and both live sample targets remained absent.
- **Timestamp / environment:** 2026-09-24; UTC clock sampled at 16:03:53Z after the attempt (exact connection start time was not separately captured); macOS; Node.js v22.23.2; local SeaRadar workspace; branch `sprint2`.
- **Status:** `FAIL` for the single live-message receipt criterion; no conclusion is made about the underlying provider cause. B-08 configuration-boundary evidence remains separate; existing demo evidence remains local/mock-based.
- **Reviewer / owner:** delivery/technical owner — bounded invocation and result recording.
- **Limitations and follow-up:** no live PositionReport, live sample/provenance, live UI/API end-to-end result, full checkpoint 03 pass, complete R2 acceptance or release readiness is established. This task permits no retry; any further live attempt requires a new explicit authorization. The single `provider_error` result does not establish whether the key, provider, connection or transient service state caused the error.

### E-SEA-053 — One additional bounded live AISStream attempt

- **Related SPEC/TASK ID:** `TASK-SEA-R2-B09B10-LIVE-002`; `TASK-SEA-R2-B09B10-LIVE-001`; `E-SEA-052`; `E-SEA-031`–`E-SEA-039`; `E-SEA-026`; `E-SEA-051`.
- **Claim under verification:** one additional user-authorized attempt used the existing server-side accessor and reader, captured only non-sensitive lifecycle status, and stopped without retry when no valid PositionReport arrived.
- **Source:** one Node.js v22.23.2 invocation of `getAISStreamApiKey()`, `startAISStreamReader()` and the B-11 transformer; harness status output; preflight imports; `.env.local` ignore/tracking checks without reading contents; live sample-path absence check; `git diff --check`; user's report that the configured key worked in Postman (unverified by this task).
- **Expected:** one connection and one 15-second total deadline; report only whether the reader sent its subscription, a fixed reader error enum, and a final outcome enum; capture one suitable PositionReport or stop without retry.
- **Observed:** preflight imports passed; `.env.local` was ignored and untracked without content inspection; both live sample targets were absent. The single additional reader invocation reported `SUBSCRIBED=yes` and `RESULT=reader_error_provider_error` (exit 1). The reader had sent the subscription, but no provider acknowledgment or valid PositionReport was observed. No raw payload/provider error text or key was printed or saved, no sample/provenance file was created, and no retry was made. `git diff --check` passed.
- **User-reported context:** the user said the configured key worked through Postman. This report is recorded as context only; the Postman session, key and provider response were not inspected, and the report does not establish why this reader attempt returned `provider_error`.
- **Timestamp / environment:** 2026-09-24; UTC clock sampled at 16:29:20Z after the attempt (exact connection start time was not separately captured); macOS; Node.js v22.23.2; local SeaRadar workspace; branch `sprint2`.
- **Status:** `FAIL` for the additional live-message receipt criterion. The reader error occurred after its local subscription send; the underlying provider/connection/key cause remains unknown. The one additional attempt allowed by this contract is exhausted.
- **Reviewer / owner:** delivery/technical owner — bounded attempt and evidence recording.
- **Limitations and follow-up:** the attempt proves only that the existing reader invoked `onSubscribed` before receiving a fixed `provider_error`; it does not prove provider acceptance, key validity, live receipt, sample provenance, live UI/API end-to-end behavior, checkpoint 03 completion, overall R2 acceptance or release readiness. No further live attempt or provider troubleshooting is authorized by this task.

### E-SEA-054 — LIVE-003 preflight blocked before provider connection

- **Related SPEC/TASK ID:** `TASK-SEA-R2-B09B10-LIVE-003`; `TASK-SEA-R2-B09B10-LIVE-002`; `E-SEA-053`; `CHECKPOINT-04`.
- **Claim under verification:** determine whether the approved accessor can obtain a configured key from the invoking Node process before the one bounded reader attempt, without loading or exposing local secret-file contents.
- **Source:** Node.js v22.23.2 direct import and call of `getAISStreamApiKey()` under the inherited process environment; `.env.local` ignore/tracking checks; live sample target existence checks. No reader or WebSocket invocation.
- **Expected:** if the accessor returns no key, stop before connecting and record no provider outcome.
- **Observed:** ignore/tracking checks passed and both live sample targets were absent. The accessor returned `null`; output was only `KEY_CONFIGURED=no`. The guarded command exited 4. No `.env.local` content or key value was read, printed or loaded. No reader invocation, WebSocket connection, AISStream request, PositionReport, sample or checkpoint update occurred.
- **Timestamp / environment:** 2026-09-24; macOS; Node.js v22.23.2; local SeaRadar workspace; branch `sprint2`.
- **Status:** `BLOCKED` before the provider attempt. The one live-attempt allowance in LIVE-003 remains unused; this observation does not establish key invalidity, provider behavior or connectivity.
- **Limitations and follow-up:** the current LIVE-003 contract prohibits local env loading, so a key stored only in `.env.local` is unavailable to the inherited Node process. Any further attempt requires a reviewed contract revision explicitly authorizing a safe in-memory environment-loading method and a separate continue before connecting. Checkpoint 03 remains `HOLD`.

### E-SEA-055 — LIVE-003 non-text message event

- **Related SPEC/TASK ID:** `TASK-SEA-R2-B09B10-LIVE-003`; `TASK-SEA-R2-B09B10-LIVE-002`; `E-SEA-054`; `CHECKPOINT-05`.
- **Claim under verification:** one bounded, user-authorized reader attempt used the existing key accessor and reader after safe in-memory environment loading, and classified the event producing the fixed reader error without exposing secret or frame contents.
- **Source:** one Node.js v22.23.2 harness invocation using the installed `@next/env` loader, `getAISStreamApiKey()`, `startAISStreamReader()`, the existing PositionReport transformer, and a temporary event wrapper that recorded only event category and fixed reader error. The repository's Next.js environment-variable guide was consulted. No app server, build, test runner or alternate provider route was started.
- **Expected:** one reader invocation, one WebSocket, 15-second maximum deadline, no retry; record only key-configured boolean, local subscription flag, fixed event category, fixed reader error and bounded outcome. Save a single sanitized sample only if one valid PositionReport arrives.
- **Observed:** accessor availability was `KEY_CONFIGURED=yes`; the single reader invocation reported `SUBSCRIBED=yes`, then the wrapper observed `EVENT_CATEGORY=non_text_message`. The reader returned `READER_ERROR=provider_error`; final outcome was `reader_error` (exit 1). The harness inspected only `typeof event.data`; it did not decode, print or persist the message data. No valid PositionReport was received, no sample/provenance was created, and no retry occurred. Both live sample targets were absent after the attempt. No key value or `.env*` contents were emitted or inspected.
- **Preflight note:** an initial ESM named import of the CommonJS `@next/env` package failed before `loadEnvConfig` ran and before any key was loaded; no network call occurred in that preflight. The corrected CommonJS import and runtime-module preflight passed before the one reader invocation.
- **Timestamp / environment:** 2026-09-24; macOS; Node.js v22.23.2; local SeaRadar workspace; branch `sprint2`.
- **Status:** `FAIL` for the live PositionReport receipt criterion; `non_text_message` is the observed reader event category for this invocation. This identifies the code path, not the data contents or underlying provider/transport cause.
- **Limitations and follow-up:** the observation does not establish whether the non-string event data contains a PositionReport, why it was non-string, key validity, provider acceptance, ongoing availability, sample provenance, live UI/API end-to-end behavior, full R2 acceptance or release readiness. No further live attempt or source troubleshooting is authorized under LIVE-003. Any reader compatibility change requires a separate reviewed contract and deterministic test. Checkpoint 03 remains `HOLD`.

### E-SEA-056 — WebSocket UTF-8 binary compatibility local checks

- **Related SPEC/TASK ID:** `TASK-SEA-R2-B09B10-FIX-001`; `TASK-SEA-R2-B12-001`; `TASK-SEA-R2-B09B10-LIVE-003`; `E-SEA-055`; `CHECKPOINT-06`.
- **Claim under verification:** the authorized reader-boundary change accepts strict UTF-8 `ArrayBuffer` messages while retaining the existing deterministic snapshot behavior for text, errors and cleanup.
- **Source:** changes in `server/aisstream-reader.ts`, `tests/snapshot-reader.spec.ts`, `tests/snapshot-collector.spec.ts`; test/type/build command output and scoped diff check from the implementation work.
- **Expected:** configure native WebSocket delivery as `arraybuffer`; pass strings unchanged; strictly decode `ArrayBuffer` as UTF-8; map unsupported input or invalid UTF-8 to fixed `provider_error`; preserve existing route envelope and cleanup behavior.
- **Observed:** the reader sets `binaryType = "arraybuffer"`; valid UTF-8 `ArrayBuffer` text reaches the collector boundary; unsupported input and invalid UTF-8 map to `provider_error`. The route fixture verifies an UTF-8 binary PositionReport can use the existing snapshot path. `AISSTREAM_API_KEY=test-only-no-secret npx playwright test tests/snapshot-reader.spec.ts tests/snapshot-collector.spec.ts tests/snapshot-interface.spec.ts` — `PASS`, 33 tests; `AISSTREAM_API_KEY=test-only-no-secret npx tsc --noEmit` — `PASS`; `AISSTREAM_API_KEY=test-only-no-secret npm run build` — `PASS`; scoped `git diff --check` — `PASS`.
- **Build environment note:** Next.js output identified `.env.local` as an environment source. No environment value was printed, but the build's environment loader may have read the file; this evidence does not claim the file or its contents were untouched.
- **Timestamp / environment:** 2026-09-25; local SeaRadar workspace, branch `sprint2`; exact UTC execution time and runtime version were not recorded in this entry.
- **Status:** `PASS` for the bounded local reader compatibility checks only.
- **Reviewer / owner:** implementation/check execution by delivery/technical owner; final human diff review remains pending.
- **Limitations and follow-up:** no post-fix AISStream attempt occurred in this task. These local fixtures do not establish the LIVE-003 frame contents, provider acceptance, live receipt, a valid live PositionReport, key validity, live UI/API end-to-end behavior, full R2 acceptance or release readiness. No raw frame, live sample or provenance was captured. Checkpoint 03 remains `HOLD`.

### E-SEA-057 — User report that the application worked

- **Related SPEC/TASK ID:** `TASK-SEA-R2-B09B10-FIX-001`; `TASK-SEA-R2-B09B10-LIVE-003`; `E-SEA-056`; `E-SEA-055`; `CHECKPOINT-06`.
- **Claim under verification:** the user reported that the application began working after the local reader compatibility change.
- **Source:** user statement in this session: “стій, запрацювало”.
- **Expected:** preserve the user's report without inferring a specific AISStream message, successful provider acknowledgment, or sample.
- **Observed:** the user made the quoted statement. No further detail about the visible state was supplied in that statement, and the assistant did not independently observe or repeat a live request after the code change.
- **Timestamp / environment:** 2026-09-25; user report in this session; runtime/source not independently captured.
- **Status:** `UNKNOWN` for independent live verification; the statement is retained as user-reported context only.
- **Reviewer / owner:** user report; not independently reviewed as live-provider evidence.
- **Limitations and follow-up:** this report does not establish provider acceptance, key validity, live PositionReport receipt, sample/provenance, or live UI/API end-to-end behavior. Keep Sprint checkpoint 03 at `HOLD`; any further live attempt requires a separate bounded contract and explicit authorization.

### E-SEA-058 — LIVE-004 post-fix bounded live attempt

- **Related SPEC/TASK ID:** `TASK-SEA-R2-B09B10-LIVE-004`; `TASK-SEA-R2-B09B10-LIVE-003`; `TASK-SEA-R2-B09B10-FIX-001`; `E-SEA-055`–`E-SEA-057`; `CHECKPOINT-07`.
- **Claim under verification:** one newly authorized post-fix reader attempt can receive a suitable live PositionReport and save its sanitized sample/provenance.
- **Source:** one Node.js v22.23.2 invocation using the installed `@next/env` loader, the existing `getAISStreamApiKey()` accessor, `startAISStreamReader()` and `transformPositionReport()`. Preflight confirmed `.env.local` ignored and untracked without reading contents and both live sample targets absent. The runtime/import check passed before the attempt.
- **Expected:** exactly one WebSocket attempt with a 15-second total deadline, one suitable PositionReport or a bounded stop, no retry, and no key/raw payload in output or saved artifacts.
- **Observed:** the single invocation exited 1 after 1,747 ms with `CAPTURE_OUTCOME=unsuitable_message`. A decoded text event reached the harness, but it did not meet the approved sample eligibility checks or transformer acceptance. The payload was not displayed or persisted; the specific failing field/condition was not recorded. The reader was stopped; no retry occurred. Post-attempt checks confirmed neither live sample file exists.
- **Timestamp / environment:** 2026-09-25; macOS; local workspace on `sprint2`; Node.js v22.23.2. Exact attempt-start UTC was not separately captured; the post-attempt UTC clock check returned `2026-09-25T09:14:06Z`.
- **Status:** `FAIL` for live PositionReport/sample receipt under this bounded attempt. The result does not identify the raw message contents, provider cause, key validity, or why the eligibility check failed.
- **Reviewer / owner:** bounded attempt and evidence recorded by delivery/technical owner; final human diff review is pending.
- **Limitations and follow-up:** no valid live PositionReport, live sample, or provenance was obtained. The operator-provided UI screenshot remains separate visual/user-supplied evidence and was not used to reconstruct this raw message. Sprint checkpoint 03 remains `HOLD`; no additional attempt is authorized by LIVE-004. No build, test suite, commit, push, or deployment was run or performed.

### E-SEA-059 — LIVE-005 preflight blocked before any reader attempt

- **Related SPEC/TASK ID:** `TASK-SEA-R2-B09B10-LIVE-005`; `TASK-SEA-R2-B09B10-LIVE-004`; `E-SEA-058`; `CHECKPOINT-08`.
- **Claim under verification:** the bounded LIVE-005 reader batch can receive an eligible live PositionReport and save a sanitized sample/provenance.
- **Source:** after the user explicitly approved the LIVE-005 contract, preflight observed Node.js v22.23.2, both live sample targets absent, and `.env.local` ignored and untracked without reading its contents. The inline Node harness command was submitted for syntax/runtime preflight.
- **Expected:** safe harness initialization followed by no more than ten sequential 15-second reader attempts, a 60-second pause between unsuccessful attempts, and immediate batch stop on first eligible sample.
- **Observed:** the inline Node command exited 1 with a JavaScript `SyntaxError` (`Unexpected identifier 'MetaData'`) while parsing the harness source. Parsing failed before module evaluation; `loadEnvConfig`, `getAISStreamApiKey`, and `startAISStreamReader` were not invoked. **Reader attempts: 0.** No environment values were loaded by this command, no key was accessed, no provider connection was made, and no sample/provenance was created. The batch stopped at the required harness preflight failure; no correction/retry was made under LIVE-005.
- **Timestamp / environment:** 2026-09-25; post-failure UTC clock observation `2026-09-25T10:24:16Z`; macOS, Node.js v22.23.2; branch `sprint2`, `HEAD` `2147d93`.
- **Status:** `BLOCKED` before any live attempt. This is not an AISStream/provider result and does not establish key validity, provider acceptance, or sample eligibility.
- **Reviewer / owner:** bounded preflight and evidence recorded by delivery/technical owner; human diff review pending.
- **Limitations and follow-up:** no live data was received. Existing synthetic sample/provenance are unchanged; Sprint checkpoint 03 remains `HOLD`. Any future provider attempt after harness correction requires a new reviewed bounded contract and explicit authorization. No build, test suite, commit, push, or deployment was run or performed.

### E-SEA-060 — LIVE-006 stopped at key/configuration preflight

- **Related SPEC/TASK ID:** `TASK-SEA-R2-B09B10-LIVE-006`; `TASK-SEA-R2-B09B10-LIVE-005`; `E-SEA-059`; `CHECKPOINT-09`.
- **Claim under verification:** a newly authorized bounded AISStream reader batch can receive an eligible live PositionReport and save one sanitized sample/provenance.
- **Source:** after the user explicitly approved LIVE-006, the approved inline harness passed Node syntax-only validation and ran its in-memory preflight. Preflight before execution confirmed Node.js v22.23.2, both live sample targets absent, and `.env.local` ignored and untracked without reading its contents.
- **Expected:** after the syntax-only gate, a usable key/configuration would permit sequential reader attempts, each with a 15-second deadline and 60-second pause after failure, stopping on first eligible sample.
- **Observed:** the first harness invocation emitted only `{"attempt":1,"elapsedMs":0,"outcome":"preflight_blocked"}`. It stopped before `startAISStreamReader()`; **direct reader attempts: 0; WebSocket connections: 0**. The fixed outcome does not distinguish an environment-loader exception from a missing accessor value. No key value or provider error was printed; no provider request or sample/provenance resulted. The batch stopped at preflight and no further attempt was made.
- **Timestamp / environment:** 2026-09-25; post-run UTC clock observation `2026-09-25T11:12:59Z`; macOS, Node.js v22.23.2; branch `sprint2`, `HEAD` `2147d93`.
- **Status:** `BLOCKED` before any reader attempt. This is not an AISStream/provider result and does not establish key validity, provider acceptance, or sample eligibility.
- **Reviewer / owner:** bounded preflight and evidence recorded by delivery/technical owner; final human diff review pending.
- **Limitations and follow-up:** no live report, sample, or provenance was obtained. Existing synthetic artifacts are unchanged; Sprint checkpoint 03 remains `HOLD`. Any further provider attempt requires a new reviewed bounded contract and explicit authorization. No build, test suite, commit, push, or deployment was run or performed.

### E-SEA-061 — DIAG-001 identified environment-loader failure

- **Related SPEC/TASK ID:** `TASK-SEA-R2-B09B10-DIAG-001`; `TASK-SEA-R2-B09B10-LIVE-006`; `E-SEA-060`; `CHECKPOINT-10`.
- **Claim under verification:** identify the local preflight stage that blocked LIVE-006 without displaying a credential or making a network request.
- **Source:** one approved in-memory Node.js v22.23.2 diagnostic using dynamic imports of `@next/env` and `getAISStreamApiKey()`, with loader logging suppressed. Preflight confirmed `.env.local` ignored and untracked without reading its contents.
- **Expected:** one fixed category distinguishing module import, pre-load accessor, environment loader, and post-load accessor outcomes; only key-presence booleans may be reported.
- **Observed:** output was `{"outcome":"env_loader_failed","elapsedMs":29,"presentBeforeLoad":false}`. Both modules imported and the accessor completed before loading, reporting no key present in the initial process environment. `loadEnvConfig()` then threw; its exception detail was intentionally suppressed. The post-load accessor was not called. No `startAISStreamReader()` or network API was invoked; no key value or unrelated environment value was printed or persisted.
- **Timestamp / environment:** 2026-09-25; post-run UTC clock observation `2026-09-25T12:10:57Z`; macOS, Node.js v22.23.2; branch `sprint2`, `HEAD` `2147d93`.
- **Status:** `VERIFIED` for identifying the failing stage as `loadEnvConfig()` in this one diagnostic run. The underlying exception cause remains `Unknown`; no credential availability after loading or provider acceptance was established.
- **Reviewer / owner:** one-shot diagnostic and evidence recorded by delivery/technical owner; final human diff review pending.
- **Limitations and follow-up:** diagnosis used one invocation only. No provider request, reader attempt, sample, or provenance was created. Sprint checkpoint 03 remains `HOLD`. Any follow-up to inspect the loader failure or make another live request needs a separate bounded contract and explicit authorization. No build, test suite, commit, push, or deployment was run or performed.

### E-SEA-062 — DIAG-002 stopped at sanitized module-import failure

- **Related SPEC/TASK ID:** `TASK-SEA-R2-B09B10-DIAG-002`; `TASK-SEA-R2-B09B10-DIAG-001`; `E-SEA-061`; `CHECKPOINT-11`.
- **Claim under verification:** classify the local environment-loader failure using sanitized error metadata only, without inspecting environment values or making a network request.
- **Source:** after the user explicitly approved DIAG-002, one inline Node.js v22.23.2 invocation attempted a dynamic import of `@next/env` with fixed-category error handling. Preflight confirmed `.env.local` was ignored and untracked without reading its contents; live sample/provenance targets were absent.
- **Expected:** if the module import succeeds, call `loadEnvConfig()` exactly once and report only sanitized categories; if import fails, report its safe category and stop without retry.
- **Observed:** the invocation exited `1` and emitted only `{"outcome":"module_import_failed","errorName":"OtherError","errorCode":"OtherCode","elapsedMs":24}`. Import failed before `loadEnvConfig()`; **loader calls: 0**. The sanitized categories do not reveal the underlying import exception. The key accessor was not called; the harness did not inspect `process.env`; no reader, provider, WebSocket, or network API was invoked. No environment value, raw exception message, stack, or path was output; no sample/provenance was created.
- **Timestamp / environment:** 2026-09-25; post-run UTC clock observation `2026-09-25T12:31:44Z`; macOS, Node.js v22.23.2; branch `sprint2`, `HEAD` `2147d93`.
- **Status:** `BLOCKED` for the stated loader-error classification; the authorized one-shot stopped at module import as required. This result does not explain the DIAG-001 loader exception or establish key availability/validity.
- **Reviewer / owner:** bounded diagnostic and evidence recorded by delivery/technical owner; human diff review pending.
- **Limitations and follow-up:** no loader call or further debugging was authorized after import failure. Sprint checkpoint 03 remains `HOLD`; no provider request or live sample was obtained. Any follow-up requires a separate bounded contract and explicit review/authorization. No build, test suite, commit, push, or deployment was run or performed.

### E-SEA-063 — DIAG-003 ten import attempts remained blocked

- **Related SPEC/TASK ID:** `TASK-SEA-R2-B09B10-DIAG-003`; `TASK-SEA-R2-B09B10-DIAG-002`; `E-SEA-062`; `CHECKPOINT-12`.
- **Claim under verification:** determine whether the DIAG-002 `@next/env` dynamic-import failure is transient across up to ten fresh local Node processes; call the loader once only if an import succeeds.
- **Source:** after the user approved DIAG-003 and clarified a 15-second process limit, one inline Node.js v22.23.2 parent invocation ran sequential child processes with 15-second timeouts, safe output validation, and stderr discarded. Preflight confirmed `.env.local` ignored/untracked without reading contents and both live sample/provenance targets absent.
- **Expected:** stop at first successful module import after one sanitized loader call, or after ten import failures; stop sooner on timeout or invalid harness output.
- **Observed:** all ten fresh-process imports failed with the same safe categories `module_import_failed` / `OtherError` / `OtherCode`. Per-attempt elapsed milliseconds were `21, 8, 9, 10, 9, 8, 13, 10, 9, 10`; parent-reported total elapsed time was `478 ms`. The parent invocation completed and emitted only fixed JSON; it stopped after attempt 10. **Successful imports: 0; `loadEnvConfig()` calls: 0.** The key accessor was not called and the harness did not inspect `process.env`. No raw exception detail, stderr, path, environment value, reader/provider/network activity, sample, or provenance was output or created.
- **Timestamp / environment:** 2026-09-25; post-run UTC clock observation `2026-09-25T12:44:57Z`; macOS, Node.js v22.23.2; branch `sprint2`, `HEAD` `2147d93`.
- **Status:** `VERIFIED` for the bounded observation that the import failure recurred in all ten fresh processes. This does not establish the underlying cause or classify the earlier `loadEnvConfig()` exception.
- **Reviewer / owner:** bounded diagnostic and evidence recorded by delivery/technical owner; human diff review pending.
- **Limitations and follow-up:** the loader was never imported successfully or invoked. No provider request or live sample was obtained; Sprint checkpoint 03 remains `HOLD`. Further diagnosis requires a separate bounded contract and explicit authorization. No build, test suite, commit, push, or deployment was run or performed.

### E-SEA-064 — DIAG-004 second ten-attempt batch remained blocked

- **Related SPEC/TASK ID:** `TASK-SEA-R2-B09B10-DIAG-004`; `TASK-SEA-R2-B09B10-DIAG-003`; `E-SEA-063`; `CHECKPOINT-13`.
- **Claim under verification:** determine whether the repeated DIAG-003 `@next/env` import failure is transient across a second bounded batch of fresh local Node processes; call the loader once only if an import succeeds.
- **Source:** after the user explicitly approved DIAG-004, one inline Node.js v22.23.2 parent invocation ran sequential child processes with 30-second timeouts, safe output validation, and stderr discarded. Preflight confirmed `.env.local` ignored/untracked without reading its contents and both live sample/provenance targets absent.
- **Expected:** stop at first successful module import after one sanitized loader call, or after ten import failures; stop sooner on timeout or invalid harness output.
- **Observed:** all ten fresh-process imports failed with safe categories `module_import_failed` / `OtherError` / `OtherCode`. Per-attempt elapsed milliseconds were `8, 7, 9, 7, 9, 9, 8, 8, 8, 11`; parent-reported total elapsed time was `445 ms`. The parent invocation completed and emitted fixed JSON; it stopped after attempt 10. **Successful imports: 0; `loadEnvConfig()` calls: 0.** The key accessor was not called and the harness did not inspect `process.env`. No raw exception detail, stderr, path, environment value, reader/provider/network activity, sample, or provenance was output or created.
- **Timestamp / environment:** 2026-09-25; post-run UTC clock observation `2026-09-25T13:07:48Z`; macOS, Node.js v22.23.2; branch `sprint2`, `HEAD` `2147d93`.
- **Status:** `VERIFIED` for the bounded observation that the import failure recurred in all ten DIAG-004 fresh processes. This does not establish the underlying cause or classify the earlier `loadEnvConfig()` exception.
- **Reviewer / owner:** bounded diagnostic and evidence recorded by delivery/technical owner; human diff review pending.
- **Limitations and follow-up:** no loader call or provider request was made; Sprint checkpoint 03 remains `HOLD`. Any further diagnosis requires a separate bounded contract and explicit authorization. No build, test suite, commit, push, or deployment was run or performed.

### E-SEA-065 — DIAG-005 resolution/import comparison completed

- **Related SPEC/TASK ID:** `TASK-SEA-R2-B09B10-DIAG-005`; `TASK-SEA-R2-B09B10-DIAG-004`; `E-SEA-064`; `CHECKPOINT-14`.
- **Claim under verification:** distinguish package-resolution failure from module-evaluation failure for `@next/env` using one local comparison and safe output only.
- **Source:** after the user explicitly approved DIAG-005, one inline Node.js v22.23.2 invocation performed a CommonJS `createRequire().resolve()` check, an ESM `import.meta.resolve()` check, and one dynamic import. Preflight confirmed `.env.local` ignored/untracked without reading its contents and both live sample/provenance targets absent.
- **Expected:** fixed resolved/failed flags for both resolution APIs, fixed dynamic-import result, and a boolean for the expected named `loadEnvConfig` export; no path or raw error output.
- **Observed:** output was `{"outcome":"comparison_completed","commonJsResolution":{"status":"resolved"},"esmResolution":{"status":"resolved"},"dynamicImport":{"status":"import_succeeded","hasLoadEnvConfig":false},"elapsedMs":13}`. Both resolution checks succeeded and the dynamic import completed, but the imported namespace did not expose a callable named `loadEnvConfig` property. The `default` export was not inspected. `loadEnvConfig()` was not called; the key accessor was not called; `process.env` was not inspected. No raw exception, resolved path/URL, environment value, reader/provider/network activity, sample, or provenance was emitted or created.
- **Timestamp / environment:** 2026-09-25; post-run UTC clock observation `2026-09-25T14:21:21Z`; macOS, Node.js v22.23.2; branch `sprint2`, `HEAD` `2147d93`.
- **Status:** `VERIFIED` for successful CommonJS resolution, ESM resolution, and dynamic import with absent named export in this run. The package entry's export shape and original `loadEnvConfig()` failure cause remain unknown.
- **Reviewer / owner:** bounded diagnostic and evidence recorded by delivery/technical owner; human diff review pending.
- **Limitations and follow-up:** this comparison does not establish whether `loadEnvConfig` is available through a default export or whether that export is safe/usable; no export was invoked. Sprint checkpoint 03 remains `HOLD`. Any follow-up requires a separate bounded contract and explicit authorization. No build, test suite, commit, push, or deployment was run or performed.

### E-SEA-066 — DIAG-006 default export shape inspected

- **Related SPEC/TASK ID:** `TASK-SEA-R2-B09B10-DIAG-006`; `TASK-SEA-R2-B09B10-DIAG-005`; `E-SEA-065`; `CHECKPOINT-15`.
- **Claim under verification:** determine whether the `@next/env` dynamic-import namespace exposes `loadEnvConfig` through its default export, without invoking an export/getter or loading environment configuration.
- **Source:** after the user explicitly approved DIAG-006, one inline Node.js v22.23.2 invocation performed one dynamic import and inspected only the named-export boolean, default value type, and own property descriptor category. Preflight confirmed `.env.local` ignored/untracked without reading its contents and both live sample/provenance targets absent.
- **Expected:** fixed export-shape metadata only; no package function/getter invocation, loader call, key access, environment inspection, or network activity.
- **Observed:** output was `{"outcome":"import_succeeded","hasNamedLoadEnvConfig":false,"defaultType":"object","defaultLoadEnvConfigProperty":"accessor","elapsedMs":22}`. Dynamic import succeeded; the namespace did not expose a callable named `loadEnvConfig`; the default value was an object whose own `loadEnvConfig` property descriptor was an accessor. The descriptor was inspected without invoking its getter. No package function or getter was invoked; `loadEnvConfig()` was not called; the key accessor was not called; `process.env` was not inspected. No raw exception, object contents, path, environment value, reader/provider/network activity, sample, or provenance was emitted or created.
- **Timestamp / environment:** 2026-09-25; post-run UTC clock observation `2026-09-25T14:52:00Z`; macOS, Node.js v22.23.2; branch `sprint2`, `HEAD` `2147d93`.
- **Status:** `VERIFIED` for the bounded export-shape observation. The accessor body was not evaluated, so whether it returns a callable export and the cause of DIAG-001's earlier loader failure remain `Unknown`.
- **Reviewer / owner:** bounded diagnostic and evidence recorded by delivery/technical owner; human diff review pending.
- **Limitations and follow-up:** this task establishes only that the default object has an own accessor property named `loadEnvConfig`; it does not establish the getter's result, safety/usability, or explain the earlier loader exception. Sprint checkpoint 03 remains `HOLD`. Any follow-up requires a separate bounded contract and explicit authorization. No build, test suite, commit, push, or deployment was run or performed.

### E-SEA-067 — DIAG-006 next-session handoff verified

- **Related SPEC/TASK ID:** `TASK-SEA-R2-HANDOFF-002`; `TASK-SEA-R2-B09B10-DIAG-006`; `E-SEA-066`; `CHECKPOINT-16`; `DEC-004-CHECKPOINT-CONVENTION`.
- **Claim under verification:** the active next-session handoff accurately routes review to CHECKPOINT-16 and E-SEA-066, preserves the historical R1 archive, and does not imply Sprint 2 acceptance or authorize further diagnostics.
- **Source:** documentation-only handoff update. Initial read-only Git observation recorded branch `sprint2`, `HEAD` and local `origin/sprint2` at `2147d93b708f0e1a398c377181000093f945afca`; pre-existing paths included modified `EVIDENCE.md`, `RUNBOOK.md`, `TASK_SPEC.md`, deleted `START.md`, staged `sprint-2.png`, and the untracked paths listed in the handoff/task contract. No remote query was made.
- **Expected:** current handoff facts match CHECKPOINT-16/E-SEA-066; local links resolve; R1 archive is unchanged; only the four contract-authorized documentation paths are changed by this slice; formatting/path-boundary checks pass.
- **Observed:** `NEXT_SESSION.md` now identifies CHECKPOINT-16 as the restart record, summarizes the DIAG-006 output and unresolved getter/loader cause, keeps Sprint checkpoint 03 at `HOLD`, discloses the B-08 governance mismatch without changing `CLAUDE.md`/`SPEC.md`, and starts the next-session prompt with read-only Git checks. A structural check found 10 local links with existing targets and zero trailing-whitespace lines in `NEXT_SESSION.md`; the R1 archive matched `HEAD:NEXT_SESSION.md` byte-for-byte. `git diff --check` passed on `TASK_SPEC.md`/`NEXT_SESSION.md`; the staged-path whitespace check passed. The handoff slice edited only `TASK_SPEC.md` and `NEXT_SESSION.md` and appended this record plus a RUNBOOK entry; pre-existing paths were preserved.
- **Timestamp / environment:** 2026-09-25; UTC clock observation before record append `2026-09-25T15:23:12Z`; macOS; branch `sprint2`; no runtime or network activity.
- **Status:** `VERIFIED` for the handoff content, links, archive preservation, and scoped documentation checks described above; final diff review remains for the human reviewer.
- **Limitations and follow-up:** this record verifies documentation structure and Git preservation only. It does not verify product/runtime behavior, live AISStream receipt, a sample/provenance, key state, the DIAG-006 getter, the loader cause, or R2 acceptance. `CLAUDE.md` and `SPEC.md` remain unchanged; any governance correction or further technical work requires separate approved change control and a bounded task. No build/tests, commit, push, or deployment occurred.

### E-SEA-068 — Draft current-task governance proposal prepared

- **Related SPEC/TASK ID:** `TASK-SEA-R2-GOV-003`; `DEC-008-R2-CURRENT-TASK-STATUS`; `E-SEA-067`; `CHECKPOINT-16`.
- **Claim under verification:** prepare a non-authoritative Draft proposal addressing stale B-08 current-task wording without changing canonical baselines, authorizing a successor task, or claiming R2 acceptance.
- **Source:** created `docs/decisions/DEC-008-r2-current-task-status.md` after confirming the path was absent. Read-only preflight/recheck showed branch `sprint2`, `HEAD` and local `origin/sprint2` both at `2147d93b708f0e1a398c377181000093f945afca`; pre-existing modified, staged, deleted, and untracked paths were preserved.
- **Expected:** proposal metadata and review sections conform to the task contract; Draft/non-authoritative and approval boundaries are explicit; relative links resolve; no prohibited baseline/index/history path is changed; documentation whitespace checks pass.
- **Observed:** the proposal is marked `Draft` and explicitly pending product-owner approval; it distinguishes B-08's historical DEC-006 authorization from current authorization, selects no successor technical task, keeps checkpoint 03 at `HOLD / not passed`, and identifies deferred baseline/index review boundaries. A structural check found all required sections/markers and 9 relative links with existing targets; a trailing-whitespace check found zero lines. `git diff --check` and staged diff whitespace checks passed for `TASK_SPEC.md`, `EVIDENCE.md`, and `RUNBOOK.md`. The decision index, `CLAUDE.md`, `SPEC.md`, `docs/README.md`, `docs/sprints/README.md`, `SPRINT-02.md`, DEC-006, and DEC-007 were not edited in this slice.
- **Timestamp / environment:** 2026-09-25; UTC observation `2026-09-25T17:05:13Z`; macOS; branch `sprint2`; no runtime or network activity.
- **Status:** `VERIFIED` for the proposal's documented structure, link targets, whitespace, and stated authorization boundary only; human review and product-owner decision remain pending.
- **Limitations and follow-up:** this is a Draft proposal, not an approved governance decision or baseline correction. No successor task is authorized; no provider request, secret/environment inspection, build, or tests were performed. Sprint checkpoint 03 remains `HOLD / not passed`. The reviewer must inspect the diff and choose `continue`, `revise`, or `HOLD`; acceptance and any canonical synchronization require separate explicit approval and bounded task.

### E-SEA-069 — Current-task governance decision synchronized

- **Related SPEC/TASK ID:** `TASK-SEA-R2-GOV-004`; `DEC-009-R2-CURRENT-TASK-STATUS`; `DEC-006-R2-SCOPE`; `DEC-008-R2-CURRENT-TASK-STATUS`; `E-SEA-068`; `CHECKPOINT-16`.
- **Claim under verification:** the approved governance decision distinguishes DEC-006's historical B-08 selection from current R2 technical-task authorization, and the scoped canonical wording/index consistently state that no R2 technical task is currently authorized.
- **Source:** after the user explicitly approved GOV-004 and said continue, created DEC-009 as `Ready`, added it to the decision index, corrected the direct current-task wording in `CLAUDE.md` and `SPEC.md`, and updated the corresponding versions/date/related links. The approved scope excluded the Sprint catalogs and `SPRINT-02.md`.
- **Expected:** DEC-009 and its index entry agree; CLAUDE/SPEC preserve DEC-006's historical scope/task authorization but no longer imply B-08 is current; checkpoint 03 remains HOLD; local links and whitespace checks pass; excluded paths remain unchanged.
- **Observed:** DEC-009 is `Ready` at `1.0.0`; the decision index is `0.7.0`, `CLAUDE.md` is `1.4.0`, and `SPEC.md` is `1.2.0`, all dated 2026-09-25. The index contains DEC-009; updated baselines link it. A structural check found 8, 12, 21, and 9 local links in CLAUDE.md, SPEC.md, the decision index, and DEC-009 respectively, with zero broken links or trailing-whitespace lines. Exact obsolete B-08-current phrases were absent. `git diff --check` passed on the changed tracked governance paths. CHECKPOINT-16 and DEC-009 preserve Sprint checkpoint 03 `HOLD / not passed`; no excluded sprint catalog or plan path was edited.
- **Timestamp / environment:** 2026-09-25; UTC observation `2026-09-25T17:54:43Z`; macOS; branch `sprint2`; no runtime or network activity.
- **Status:** `VERIFIED` for the scoped governance record, index, baseline wording, relative links, whitespace, and path-boundary checks only; human review of the complete diff remains pending.
- **Limitations and follow-up:** no R2 technical task is authorized by this decision or synchronization. The Sprint 2 catalog inconsistency in `docs/README.md` and `docs/sprints/README.md` remains deferred by the user's scope choice. This record does not establish live provider receipt, sample/provenance, product/runtime acceptance, or release readiness. No build/tests, provider/network request, secret/environment inspection, commit, push, or deployment occurred.

### E-SEA-070 — Sparse snapshot fallback UI checks

- **Related SPEC/TASK ID:** `TASK-SEA-R2-B14-MIXED-VESSELS-001`; `DEC-010-R2-SPARSE-SNAPSHOT-DEMO-FALLBACK`; `E-SEA-069`.
- **Claim under verification:** the bounded UI implementation displays all three demo markers for successful snapshots with 0–2 AISStream vessels, omits them for 3+, preserves the AIS-only count, distinguishes sources visually, and highlights selection without changing loading/error behavior.
- **Source:** deterministic Playwright fixtures in `tests/snapshot-interface.spec.ts` and `tests/vessel-selection.spec.ts`; implementation in `app/map-shell.tsx`, `app/sea-map.tsx`, and `app/globals.css`. No provider request or secret value was requested or inspected.
- **Expected:** targeted browser tests pass for counts 0, 1, 2, 3, and 4 and existing selection/loading/error cases; TypeScript and production build pass; diff whitespace check passes.
- **Observed:** `npx playwright test tests/snapshot-interface.spec.ts tests/vessel-selection.spec.ts` passed all 17 tests (12.4 s), including the 0–4 threshold matrix. `npx tsc --noEmit` exited successfully with no output. `npm run build` completed successfully (Next.js 16.3.5, Turbopack; TypeScript and static page generation passed). Build output warned that the parent-directory `package-lock.json` was ignored because it is outside the repository and reported `.env.local` as an environment source; its contents were not inspected. `git diff --check` passed before the evidence append; rerun after the append for final whitespace status.
- **Timestamp / environment:** 2026-09-25T20:53:09Z; macOS; branch `sprint2`.
- **Status:** `VERIFIED` for the targeted mocked browser scenarios, TypeScript check, production build, and observed implementation behavior covered by those checks. Full diff review and human checkpoint remain pending.
- **Limitations and follow-up:** this does not verify live AISStream behavior/receipt, provider connectivity, user validation, Sprint checkpoint 03, or release readiness. Build loaded the configured environment source but no environment values were read or used intentionally by this task. No commit, push, or deployment was performed.

### E-SEA-071 — DIAG-007 static environment-loader API inspection

- **Related SPEC/TASK ID:** `TASK-SEA-R2-B09B10-DIAG-007`; `TASK-SEA-R2-B09B10-DIAG-001`–`DIAG-006`; `E-SEA-061`–`E-SEA-066`; `CHECKPOINT-16`; `DEC-009-R2-CURRENT-TASK-STATUS`.
- **Claim under verification:** determine from installed package declarations/source and the installed Next.js guide what `@next/env` API/import shape is documented and whether the previous loader failure can be explained statically.
- **Source:** read-only inspection of `node_modules/@next/env/package.json`, `node_modules/@next/env/dist/index.d.ts`, `node_modules/@next/env/dist/index.js`, and `node_modules/next/dist/docs/01-app/02-guides/environment-variables.md`. No package code was executed or imported.
- **Expected:** record only static package/API facts and document paths; do not evaluate getters, call the loader/accessor, inspect environment values or `.env*` contents, or access network/provider resources.
- **Observed:** installed `@next/env` package version is `16.3.5`; package metadata declares `dist/index.js` as `main` and `dist/index.d.ts` as `types`. The declaration exposes named `loadEnvConfig(dir: string, dev?: boolean, log?: Log, forceReload?: boolean, onReload?)`. The installed App Router guide documents `import { loadEnvConfig } from '@next/env'` followed by `loadEnvConfig(projectDir)`. Static bundled source assigns a module object to `module.exports` and defines getter-backed exports, including `loadEnvConfig`; its loader implementation includes `.env*` file reads. No getter or function was invoked, no `.env*` file was opened, and no environment value, key accessor, process environment, reader, network API, or provider was accessed.
- **Conclusion / status:** the documented named import and loader signature are confirmed as static package/documentation facts. These facts do not identify why DIAG-001's loader invocation failed; the runtime cause remains `Unknown`. No inference is made that the loader can safely be invoked in this workspace.
- **Timestamp / environment:** 2026-09-26T10:44:32Z post-inspection/final-check observation; local SeaRadar workspace on branch `sprint2`, HEAD `4b82a7a`.
- **Verification:** `git diff --check -- TASK_SPEC.md` passed before this evidence append; final `git diff --check` is required after the append.
- **Limitations and follow-up:** this source inspection does not prove runtime import interoperability or loader behavior, explain the earlier exception, establish key availability/validity, capture a live PositionReport/sample/provenance, verify live UI/API behavior, or pass Sprint checkpoint 03. Any runtime loader experiment, code change, or provider attempt requires its own bounded contract and explicit approval. Checkpoint 03 remains `HOLD / not passed`; no commit, push, or deployment occurred.

### E-SEA-072 — LIVE-007 one-shot capture outcome

- **Related SPEC/TASK ID:** `TASK-SEA-R2-B09B10-LIVE-007`; `CHECKPOINT-03`; `CHECKPOINT-17`; `DEC-009-R2-CURRENT-TASK-STATUS`.
- **Authorization:** the user explicitly approved the exact contract with `continue LIVE-007`; scope was one `@next/env` loader invocation and at most one existing AISStream reader attempt, with no retries.
- **Preflight:** branch `sprint2`; HEAD `4b82a7a` at prior LIVE-007 preflight; `.env.local` was confirmed ignored and untracked without opening it. Both live sample paths and `CHECKPOINT-18.md` were absent before and after the attempt. Pre-existing modified/untracked paths were preserved.
- **Observed:** one in-memory Node invocation called the installed CommonJS `@next/env` loader once with a silent logger, checked key presence without emitting its value, then invoked the existing server-side reader once using its configured PositionReport filter and bounding box. The reader's subscription-send callback ran (`subscribed: true`; this is not provider acknowledgement). Within about one second, the first received WebSocket text message was rejected by the existing transformer/approved sample eligibility checks; the harness emitted only the fixed category `unsuitable_message` and stopped the reader immediately. No retry or second connection occurred.
- **Artifacts / data boundary:** no live sample or provenance file was created. The raw provider message, credential, loader output, environment values and raw errors were not emitted or persisted. No source, test, dependency or configuration file was changed.
- **Timestamp / environment:** 2026-09-26T11:24:45Z post-attempt observation; local SeaRadar workspace on branch `sprint2`.
- **Verification:** target-path absence was checked after the attempt. `git diff --check` is run after the append-only records and checkpoint are written.
- **Conclusion / status:** this attempt did not produce an eligible server-received PositionReport or matching sample/provenance. The CHECKPOINT-03 receipt and provenance criteria remain **NOT MET**; checkpoint 03 remains **HOLD / not passed**. The reason the message was unsuitable, key validity, provider behavior, and full R2 acceptance remain unknown. No commit, push, deployment, cleanup, or further provider request occurred.

### E-SEA-073 — LIVE-008 one-shot capture outcome

- **Related SPEC/TASK ID:** `TASK-SEA-R2-B09B10-LIVE-008`; `CHECKPOINT-03`; `CHECKPOINT-18`; `DEC-009-R2-CURRENT-TASK-STATUS`.
- **Authorization:** the user explicitly approved the exact LIVE-008 contract with `continue LIVE-008`; scope was one `@next/env` loader invocation and at most one existing AISStream reader attempt, with no retry.
- **Preflight:** branch `sprint2`; `.env.local` was confirmed ignored and untracked without opening it. The sample, provenance and CHECKPOINT-19 targets were absent before and after the attempt. Pre-existing modified/untracked paths were preserved.
- **Observed:** one in-memory Node invocation called the installed CommonJS `@next/env` loader once with a silent logger, checked key presence without outputting the value, then called the existing server-side reader once. The reader returned its fixed `connect_failed` error code after about 4 seconds; its local subscription-send callback did not run (`subscribed: false`). No provider acknowledgement, PositionReport or sample was observed. The reader attempt ended; no retry or second connection occurred.
- **Artifacts / data boundary:** no live sample or provenance file was created. No credential, raw provider message, raw error, loader result or environment value was emitted or persisted. No application/source/test/dependency/configuration file was changed.
- **Timestamp / environment:** 2026-09-26T13:06:36Z post-attempt observation; local SeaRadar workspace on branch `sprint2`.
- **Verification:** target paths were checked absent after the attempt. `git diff --check` is run after the append-only records and checkpoint are written.
- **Conclusion / status:** no eligible server-received PositionReport or matching sample/provenance was produced. The CHECKPOINT-03 live receipt and provenance criteria remain **NOT MET**; checkpoint 03 remains **HOLD / not passed**. The cause of `connect_failed`, key validity, provider behavior and full R2 acceptance remain unknown. No commit, push, deployment, cleanup or further provider request occurred.

### E-SEA-074 — DIAG-008 instrumented connection-stage result

- **Related SPEC/TASK ID:** `TASK-SEA-R2-B09B10-DIAG-008`; `TASK-SEA-R2-B09B10-LIVE-007`–`LIVE-008`; `CHECKPOINT-03`; `CHECKPOINT-19`; `DEC-009-R2-CURRENT-TASK-STATUS`.
- **Authorization:** the user explicitly approved DIAG-008 with `continue DIAG-008`; scope was one `@next/env` loader invocation and one in-memory instrumented reader attempt, maximum 15 seconds, with no retries.
- **Preflight:** branch `sprint2`; `.env.local` was confirmed ignored and untracked without opening it. CHECKPOINT-20 was absent before and after the attempt; both live sample/provenance paths remain absent. Existing modified/untracked paths were preserved.
- **Observed:** one in-memory Node invocation called the installed CommonJS loader once, checked key presence without outputting its value, and made one reader attempt with a wrapper that recorded only fixed lifecycle categories. Within about one second, observed `open_seen` followed by `subscription_send_callback`; the first text message produced `message_transform_rejected`. No raw event/error/close detail or message payload was emitted or persisted; no sample/provenance was created. The attempt ended immediately; no retry or second connection occurred.
- **Diagnostic conclusion:** this attempt establishes that this connection opened and the existing reader's local subscription-send callback ran, then a text message was not accepted by the transformer. It does not establish the content or cause of that rejection, provider acknowledgement, key validity, nor the cause of LIVE-008's earlier `connect_failed`.
- **Timestamp / environment:** 2026-09-26T13:50:43Z post-attempt observation; local SeaRadar workspace on branch `sprint2`.
- **Verification:** checkpoint and sample targets were confirmed absent after the attempt. `git diff --check` is run after the task-owned records and checkpoint are written.
- **Status boundary:** diagnostic observations are recorded; CHECKPOINT-03 remains **HOLD / not passed**. No full Sprint 2 acceptance, release readiness, provider root cause or live API success is claimed. No commit, push, deployment or cleanup occurred.

### E-SEA-075 — LIVE-009 bounded stream capture

- **Related SPEC/TASK ID:** `TASK-SEA-R2-B09B10-LIVE-009`; `CHECKPOINT-03`; `CHECKPOINT-20`; `DEC-009-R2-CURRENT-TASK-STATUS`.
- **Authorization:** the user explicitly approved LIVE-009 with `continue LIVE-009`; scope was one `@next/env` loader invocation and one server-side AISStream WebSocket connection/window, maximum 15 seconds, with no reconnect or retry.
- **Preflight:** branch `sprint2`; `.env.local` was confirmed ignored and untracked without opening it. Both live sample paths and CHECKPOINT-21 were absent before the attempt. Pre-existing modified/untracked paths were preserved.
- **Observed:** one in-memory Node invocation called the installed CommonJS loader once with a silent logger, checked key presence without outputting its value, and made one reader connection. The local subscription-send callback ran (`subscribed: true`; this is not provider acknowledgement). Two text messages were processed in the same connection: the first was rejected by the existing transformer and discarded; the second passed the transformer. The accepted report and observed UTC receipt time were projected to the allowlisted sample fields; no null normalization was required. The reader stopped after acceptance within approximately 7 seconds. No retry or second connection occurred.
- **Saved artifacts / verification:** `data/samples/live/position-report.sample.json` and `data/samples/live/PROVENANCE.md` were created after transformer acceptance. Saved sample structure and provenance correspondence were verified without printing the payload. The raw provider envelope was not persisted.
- **Timestamp / environment:** 2026-09-26T14:38:17Z post-attempt observation; local SeaRadar workspace on branch `sprint2`.
- **Secret boundary:** no key value, raw provider payload/error, loader result or unrelated environment value was printed or persisted; `.env*` files were not directly opened.
- **Conclusion / status:** this attempt supports the CHECKPOINT-03 live receipt criterion and matching sample/provenance criterion. It does not establish provider acknowledgement beyond local send, full Sprint 2 acceptance, release readiness, user validation or live UI/API end-to-end behavior. The historical CHECKPOINT-03 record is not rewritten; see CHECKPOINT-21. No tests/build, cleanup, staging, commit, push or deployment occurred.
- **Verification:** `git diff --check` passed after the task-owned records and CHECKPOINT-21 were written (no output). Sample allowlist and provenance-link/essential-contents check passed without printing the sample payload.

### E-SEA-076 — User-approved CHECKPOINT-03 status review

- **Related SPEC/TASK ID:** `TASK-SEA-R2-CHECKPOINT-03-STATUS-001`; `CHECKPOINT-03`; `CHECKPOINT-21`; `CHECKPOINT-22`; `E-SEA-075`.
- **Source / authorization:** the user explicitly instructed on 2026-09-26: `Затверди статус CHECKPOINT-03 за результатами CHECKPOINT-21`.
- **Expected:** review every CHECKPOINT-03 criterion against its cited evidence; update only the scoped checkpoint status when its unmet live criteria are supported by later evidence; preserve the original dated HOLD facts and retain limits on broader acceptance claims.
- **Observed:** CHECKPOINT-21 / E-SEA-075 supports the bounded live receipt and matching sample/provenance criteria. The other two CHECKPOINT-03 criteria remain bounded as before: safe configuration supported without key-validity claim; working demo supported locally only. The user-approved decision records CHECKPOINT-03's defined criteria as `PASS / VERIFIED` in CHECKPOINT-22 and marks the older CHECKPOINT-03 record `Superseded`, retaining its original 2026-09-24 HOLD outcome as historical.
- **Status / limitations:** scoped CHECKPOINT-03 criteria are approved as verified. This does not establish full Sprint 2 acceptance, release readiness, provider acknowledgement, live UI/API end-to-end behavior or user validation. No new runtime/provider request was made.
- **Verification:** formatting/link/record checks and `git diff --check` are run after the task-owned records are finalized.

### E-SEA-077 — B-13 exact-commit security/path review and user disposition

- **Related SPEC/TASK ID:** `SPEC-SEA-001 / US-05…US-08`; `TASK-SEA-R2-B13-001`; `TASK-SEA-R2-B13-REVIEW-001`; `CHECKPOINT-23`; `E-SEA-051`.
- **Claim under verification:** the immutable B-13 implementation commit meets the approved security/data-flow, UI state/behavior, exact path/scope, and evidence-boundary review criteria; record the user's disposition without extending the claim to B-14 or full R2 acceptance.
- **Source:** read-only review of `fef4a8fc51c9c0e41a8158e4e541af574f895741..17006c615f7a93e84c7c554c624b8909691828fb`, the four changed files (`app/globals.css`, `app/map-shell.tsx`, `app/sea-map.tsx`, `tests/snapshot-interface.spec.ts`), B-13 task contract, and E-SEA-051; user disposition `continue` after the review report.
- **Expected:** assess same-origin endpoint use, validation/error boundaries, request/state behavior, map/selection behavior, and changed-path boundary; avoid inspecting later B-14 work or executing tests/build/network/secrets.
- **Observed:** no defect against the approved review criteria was found. The commit changes exactly the four allowed paths. Client handling uses the same-origin snapshot endpoint, validates response data, and avoids rendering raw exception/provider text; the reviewed state/motion/selection behavior matches the contract. The user chose `continue` on 2026-09-27; the scoped B-13 task and review gate are recorded as `Verified` in TASK_SPEC and CHECKPOINT-23.
- **Timestamp / environment:** 2026-09-27; local SeaRadar workspace, branch `sprint2`; immutable commit range as listed above. Exact review completion time was not captured.
- **Status:** `PASS` for the static review of this exact B-13 commit and the user's recorded disposition.
- **Reviewer / owner:** delegated read-only reviewer for commit inspection; user for final `continue` disposition; delivery/technical owner for recording and bounded checks.
- **Verification:** `git diff --check -- TASK_SPEC.md EVIDENCE.md RUNBOOK.md` passed with no output; focused checkpoint-23 whitespace, relative-link, metadata, evidence-ID, disposition and commit-anchor validation passed.
- **Limitations and follow-up:** no tests, typecheck, build, current combined worktree diff, secrets, environment files, or network were accessed/run for this review. The result excludes later B-14 changes and does not establish live UI/API behavior, provider acknowledgement, full R2 acceptance, or release readiness. No implementation file changed; no commit, push, or deployment occurred.

### E-SEA-078 — R2 authorization chronology corrected in SPEC

- **Related SPEC/TASK ID:** `SPEC-SEA-001` v1.4.0; `TASK-SEA-R2-B14-SPEC-STATUS-001`; `TASK-SEA-R2-B14-REVIEW-001`; `DEC-009`; `DEC-010`; `DEC-011`.
- **Claim under verification:** the SPEC expresses DEC-009's authorization status as of its approval date and the later bounded B-14 authorization consistently, without implying broader R2 authority.
- **Source / authorization:** approved bounded contract `TASK-SEA-R2-B14-SPEC-STATUS-001` with user approval `continue B14-SPEC-STATUS-001` on 2026-09-27; changed `SPEC.md`, `DEC-011-r2-task-authorization-reconciliation.md`, and the decision catalog.
- **Expected:** correct only the stale present-tense authorization claims; preserve DEC-009/DEC-010 contents and authorize no additional R2 scope.
- **Observed:** SPEC was versioned to 1.4.0; the release-slice, confirmed-status, open-decision and change-control text now distinguishes DEC-009's 2026-09-25 state from the later DEC-010/B-14 approval. DEC-011 records that chronology without changing DEC-009/DEC-010 or granting any new technical authorization; the decision index now links and lists DEC-011. B-14 remains under its separate review gate; no B-14 PASS or Sprint 2 acceptance is claimed.
- **Timestamp / environment:** 2026-09-27; local SeaRadar workspace, branch `sprint2`. Exact completion time not captured.
- **Status:** `PASS` for this bounded documentation consistency correction, pending the required human diff disposition.
- **Reviewer / owner:** delivery/technical owner for the documentation changes and focused checks; user for the bounded task approval. Final diff disposition remains pending.
- **Verification:** `git diff --check -- SPEC.md TASK_SPEC.md EVIDENCE.md RUNBOOK.md docs/decisions/README.md` passed with no output. Focused checks passed for metadata, relative links, authorization chronology/boundary, DEC-011 index entry, and the still-Active B-14 task. No application tests, typecheck or build were run.
- **Limitations and follow-up:** no application tests, typecheck, build, provider/network, environment or secret access occurred. This evidence does not close B-14 review, establish live behavior, full Sprint 2 acceptance, release readiness, or user validation. No source/test changes, commit, push, or deployment occurred.

### E-SEA-079 — SPEC correction disposition and fresh B-14 review contract

- **Related SPEC/TASK ID:** `SPEC-SEA-001` v1.4.0; `TASK-SEA-R2-B14-SPEC-STATUS-001`; `TASK-SEA-R2-B14-REVIEW-001`; `TASK-SEA-R2-B14-REVIEW-002`; `DEC-011`.
- **Claim under verification:** the user accepted the bounded SPEC authorization-chronology correction; the changed B-14 review target is separately frozen for a new review contract and remains unreviewed.
- **Source / disposition:** corrected-document diff and user disposition `continue` on 2026-09-27; approved correction contract `TASK-SEA-R2-B14-SPEC-STATUS-001`.
- **Expected:** close only the documentation correction, preserve the B-14 implementation review gate, and require fresh explicit approval before reviewing the changed target.
- **Observed:** `TASK-SEA-R2-B14-SPEC-STATUS-001` is recorded `Verified` for its bounded documentation correction. The user disposition does not pass B-14 or accept Sprint 2. The earlier B-14 review contract is superseded because its frozen target changed. Draft `TASK-SEA-R2-B14-REVIEW-002` records the exact seven-path unstaged diff from base `4b82a7aa1bdc2c70d3963a6bc02aef8517ad98d7`, fingerprint `0c3e8153f453d10d73564f247bf6ef88b51d947b30a6ddbd2b3a6a22cf1b7b86`; staged diff was empty at contract preparation. No fresh review has been performed.
- **Timestamp / environment:** 2026-09-27; local SeaRadar workspace, branch `sprint2`; exact completion time not captured.
- **Status:** `PASS` for the bounded SPEC correction's human disposition and the preparation/boundary checks of the replacement review contract; B-14 review itself remains open.
- **Verification:** `git diff --check -- TASK_SPEC.md` passed. Focused task-status, review-approval-gate and no-acceptance-claim assertions passed after correcting an assertion whose literal expected phrase did not match the contract's equivalent wording.
- **Limitations and follow-up:** no app tests, typecheck, build, provider/network, environment/secrets, commit, push or deployment. Review `TASK-SEA-R2-B14-REVIEW-002` only after exact approval `continue B14-REVIEW-002`; this record does not create CHECKPOINT-24 or establish full Sprint 2 acceptance/release readiness.

### E-SEA-080 — B-14 sparse marker and authorization-index remediation

- **Related SPEC/TASK ID:** `TASK-SEA-R2-B14-REMEDIATION-001`; `TASK-SEA-R2-B14-MIXED-VESSELS-001`; `TASK-SEA-R2-B14-REVIEW-002`; `DEC-009`; `DEC-010`; `DEC-011`.
- **Claim under verification:** a selection-only render in sparse snapshot mode preserves existing marker DOM nodes, and the decision index dates DEC-009's no-successor state while acknowledging the later bounded B-14 authorization.
- **Source / authorization:** exact user approval `continue B14-REMEDIATION-001` on 2026-09-27; modified only `app/map-shell.tsx`, `tests/snapshot-interface.spec.ts`, and the DEC-009 row in `docs/decisions/README.md`, plus task/evidence/runbook records.
- **Expected:** keep `mapVessels` reference stable for the same snapshot, exercise AIS↔demo selection without detaching marker nodes, preserve the existing B-14 threshold/state/count behavior, and remove the current-decision-index ambiguity without widening R2 authorization.
- **Observed:** `mapVessels` is memoized by snapshot identity. The browser regression test retains handles to AIS and demo marker elements, switches selection between sources, and confirms both remain connected while selection metadata transfers. The DEC-009 index summary now dates the no-successor status to 2026-09-25 and refers to DEC-011 for the later B-14-only authorization. Existing behavior and related targeted tests passed.
- **Timestamp / environment:** 2026-09-27; local SeaRadar workspace, branch `sprint2`; exact completion time not captured.
- **Verification:** `npx playwright test tests/snapshot-interface.spec.ts tests/vessel-selection.spec.ts` passed all 17 tests (14.2 s); `npx tsc --noEmit` exited successfully with no output; `npm run build` completed successfully with Next.js 16.3.5/Turbopack. `git diff --check -- app/map-shell.tsx tests/snapshot-interface.spec.ts docs/decisions/README.md TASK_SPEC.md` passed. Focused assertions passed for the three-path boundary, empty staged target, memoized value, marker-identity test, and DEC-009/DEC-011 wording.
- **Limitations and follow-up:** the new regression test was not run against the pre-remediation implementation, so its expected pre-fix failure was not directly observed. The build reported `.env.local` as an environment source; its contents were not inspected. No provider/network request, direct secret/environment inspection, commit, push or deployment occurred. This evidence does not pass the B-14 review, create CHECKPOINT-24, or establish Sprint 2 acceptance/release readiness; a fresh approved review of the post-remediation diff remains required.

### E-SEA-081 — B-14 remediation disposition and replacement review contract

- **Related SPEC/TASK ID:** `TASK-SEA-R2-B14-REMEDIATION-001`; `TASK-SEA-R2-B14-REVIEW-002`; `TASK-SEA-R2-B14-REVIEW-003`; `DEC-009`; `DEC-010`; `DEC-011`.
- **Claim under verification:** the user accepted only the bounded remediation diff; remediation is closed for its prescribed checks; B-14 review remains open under a fresh, unapproved review contract.
- **Source / disposition:** user-provided `continue` for the remediation diff on 2026-09-27; actual workspace fingerprint and staged-boundary preflight for the replacement target.
- **Expected:** record the disposition without expanding it to B-14 or Sprint 2 acceptance, mark the stale review target superseded, and freeze a new target requiring independent explicit approval.
- **Observed:** remediation task marked `Verified`; prior draft review `TASK-SEA-R2-B14-REVIEW-002` marked `Superseded` because its fingerprint predates remediation; Draft `TASK-SEA-R2-B14-REVIEW-003` records the exact seven-path diff from base `4b82a7aa1bdc2c70d3963a6bc02aef8517ad98d7`, fingerprint `3c413600f35500e9acb83e514891c76283a3fab9271ad5fe0605b95292b75e2d`. The staged diff across the seven target paths was empty at preparation. No post-remediation review was performed.
- **Timestamp / environment:** 2026-09-27; local SeaRadar workspace, branch `sprint2`; exact completion time not captured.
- **Status:** `PASS` for remediation disposition recording and preparation of the replacement review contract; B-14 review remains open and the replacement contract is unapproved.
- **Verification:** target path set and fingerprint command reported exactly the seven specified unstaged paths and an empty staged target; `git diff --check` and focused assertions for task statuses, hash/path contract and approval gate are to be recorded after running below.
- **Limitations and follow-up:** no review of the post-remediation patch, tests, typecheck, build, provider/network, environment/secrets, commit, push, deployment, checkpoint, B-14 acceptance or Sprint 2 acceptance occurred in this step. Next action requires exact approval `continue B14-REVIEW-003`.

### E-SEA-082 — Replacement review contract record checks

- **Related TASK ID:** `TASK-SEA-R2-B14-REVIEW-003`; `TASK-SEA-R2-B14-REMEDIATION-001`; `E-SEA-081`.
- **Claim under verification:** the new review contract still matches its frozen target and the bounded closeout records pass whitespace/structural validation.
- **Source:** local Git diff and structural assertions on 2026-09-27.
- **Expected:** exact seven-path unstaged target, empty staged target, unchanged fingerprint `3c413600f35500e9acb83e514891c76283a3fab9271ad5fe0605b95292b75e2d`, remediation/review lifecycle statuses and explicit replacement approval gate.
- **Observed:** `git diff --check -- TASK_SPEC.md EVIDENCE.md RUNBOOK.md app/map-shell.tsx tests/snapshot-interface.spec.ts docs/decisions/README.md` passed. Structural assertions passed for the seven expected paths, empty staged target, matching SHA-256, remediation `Verified`, review 002 `Superseded`, review 003 `Draft`, explicit `continue B14-REVIEW-003` gate, and E-SEA-081 references in both append-only records.
- **Timestamp / environment:** 2026-09-27; local SeaRadar workspace, branch `sprint2`; exact completion time not captured.
- **Status:** `PASS` for bounded record validation and contract-target consistency only.
- **Limitations:** this was not a B-14 code review and did not run tests, typecheck, build, application code, provider/network, or inspect environment/secrets. It does not establish B-14 or Sprint 2 acceptance. Exact user approval `continue B14-REVIEW-003` is required before review.

### E-SEA-083 — Post-remediation B-14 review finding and disposition

- **Related SPEC/TASK ID:** `TASK-SEA-R2-B14-REVIEW-003`; `TASK-SEA-R2-B14-SPEC-STATUS-002`; `TASK-SEA-R2-B14-MIXED-VESSELS-001`; `DEC-009`; `DEC-010`; `DEC-011`.
- **Claim under verification:** the approved post-remediation B-14 diff was reviewed within its frozen boundary; one authorization-chronology inconsistency remains, and the user's disposition authorizes only review closeout and preparation of a bounded correction contract.
- **Source / authorization:** exact user approval `continue B14-REVIEW-003` on 2026-09-27; read-only review of the seven-path unstaged diff from base `4b82a7aa1bdc2c70d3963a6bc02aef8517ad98d7`, fingerprint `3c413600f35500e9acb83e514891c76283a3fab9271ad5fe0605b95292b75e2d`; user disposition `продовжуй` on 2026-09-27.
- **Expected:** assess all six review oracles, report concrete findings and do not claim B-14/Sprint 2 acceptance; after disposition, record the finding and freeze a separate correction contract.
- **Observed:** one medium governance inconsistency confirmed at `SPEC.md:69`: it says no R2 technical task is currently authorized under DEC-009, conflicting with the later bounded B-14 authorization recorded in `SPEC.md:85`, `SPEC.md:107`, DEC-011 and the approved B-14 task. Recommendation: `FAIL` for authorization chronology; no other confirmed finding in the reviewed target. The review task is `Verified` for completion of review only; B-14 implementation remains `Active`, and no CHECKPOINT-24 was created. Draft `TASK-SEA-R2-B14-SPEC-STATUS-002` freezes the current SPEC diff from the same base, fingerprint `3c60f5d201762b02ddb89edd9c8f948c71a72fabf218eb6ec7abd60ba9d9cf2d`; staged SPEC diff was empty at preparation. The correction contract awaits exact approval `continue B14-SPEC-STATUS-002`.
- **Timestamp / environment:** 2026-09-27; local SeaRadar workspace, branch `sprint2`; exact completion time not captured.
- **Status:** `FAIL` for the SPEC authorization-chronology oracle; other examined review criteria had no confirmed defect. This is not B-14 acceptance.
- **Verification / limitations:** target path/fingerprint/staged-boundary preflight matched. No tests, typecheck, build, application code, provider/network, environment/secrets, commit, push or deployment were run/accessed during review or closeout. Fresh B-14 review after any correction requires a new frozen review contract and explicit approval.

### E-SEA-084 — SPEC authorization-scope wording correction

- **Related SPEC/TASK ID:** `SPEC-SEA-001` v1.5.0; `TASK-SEA-R2-B14-SPEC-STATUS-002`; `TASK-SEA-R2-B14-REVIEW-003`; `TASK-SEA-R2-B14-MIXED-VESSELS-001`; `DEC-009`; `DEC-010`; `DEC-011`.
- **Claim under verification:** the scope summary states DEC-009's historical approval-date boundary and the later bounded B-14 authorization consistently, without implying authorization for other R2 work.
- **Source / authorization:** exact user approval `continue B14-SPEC-STATUS-002` on 2026-09-27; pre-change SPEC diff against base `4b82a7aa1bdc2c70d3963a6bc02aef8517ad98d7`, SHA-256 `3c60f5d201762b02ddb89edd9c8f948c71a72fabf218eb6ec7abd60ba9d9cf2d`, with staged SPEC diff empty.
- **Expected:** edit only the stale SPEC scope sentence and required version/date metadata; retain the existing DEC-011 authorization boundary and all other R2 scope gates.
- **Observed:** SPEC metadata is v1.5.0 dated 2026-09-27; the scope sentence now says DEC-009 recorded the no-successor state as of 2026-09-25 and that later DEC-010 plus the approved B-14 contract authorize only the sparse-snapshot UI slice. It states all other R2 technical tasks remain separately gated. Focused assertions and `git diff --check -- SPEC.md TASK_SPEC.md EVIDENCE.md RUNBOOK.md` passed.
- **Status:** `PASS` for this bounded documentation consistency correction and structural checks; awaiting human diff disposition. It does not pass B-14 review or establish Sprint 2 acceptance.
- **Limitations:** no application tests, typecheck, build, provider/network, environment/secrets, commit, push, deployment or checkpoint creation occurred. A fresh post-correction B-14 review requires a separate bounded contract and explicit approval.

### E-SEA-085 — SPEC correction disposition and review handoff

- **Related SPEC/TASK ID:** `TASK-SEA-R2-B14-SPEC-STATUS-002`; `TASK-SEA-R2-B14-REVIEW-004`; `E-SEA-084`; `DEC-009`; `DEC-010`; `DEC-011`.
- **Source / authorization:** the user selected `continue` for the bounded SPEC correction on 2026-09-27.
- **Expected:** record acceptance of only the SPEC wording/metadata diff; keep B-14 and Sprint 2 acceptance unresolved; freeze a fresh review contract and stop before review absent its exact approval.
- **Observed:** `TASK-SEA-R2-B14-SPEC-STATUS-002` is recorded `Verified` for its bounded correction. Draft `TASK-SEA-R2-B14-REVIEW-004` freezes exactly seven unstaged paths against base `4b82a7aa1bdc2c70d3963a6bc02aef8517ad98d7` with fingerprint `bda55292cd56688e1b7c6919caa20e6a545e125a742a6399ffb015375ccf7afa`; the staged target is empty. It requires exact approval `continue B14-REVIEW-004` before inspection/review.
- **Verification:** on 2026-09-27, `git diff --check -- SPEC.md TASK_SPEC.md EVIDENCE.md RUNBOOK.md` and focused structural/path/fingerprint assertions passed. Assertions confirmed corrected SPEC chronology, the Verified correction task, exact seven-path target, matching fingerprint, empty staged target, and REVIEW-004 remaining Draft and approval-gated.
- **Status / limitations:** PASS for this bounded documentation disposition and review-contract preflight only. No B-14 review was conducted, no CHECKPOINT-24 was created, and neither B-14 nor Sprint 2 is accepted. No tests, typecheck, build, application execution, provider/network or environment/secret access occurred. Further action awaits `continue B14-REVIEW-004`.

### E-SEA-086 — B-14 post-correction review and disposition

- **Related SPEC/TASK ID:** `TASK-SEA-R2-B14-REVIEW-004`; `TASK-SEA-R2-B14-MIXED-VESSELS-001`; `TASK-SEA-R2-B14-REMEDIATION-001`; `E-SEA-070`; `E-SEA-080`; `E-SEA-085`; `DEC-009`; `DEC-010`; `DEC-011`; `CHECKPOINT-24`.
- **Source / authorization:** exact user approval `continue B14-REVIEW-004` on 2026-09-27, followed by the user's `continue` disposition of the review report on 2026-09-27.
- **Expected:** conduct only the read-only review in the frozen boundary; report findings and recommendation; after a separate continue, close the scoped B-14 review and checkpoint only if all criteria pass.
- **Preflight observed:** exactly seven unstaged target paths matched the contract against base `4b82a7aa1bdc2c70d3963a6bc02aef8517ad98d7`, fingerprint `bda55292cd56688e1b7c6919caa20e6a545e125a742a6399ffb015375ccf7afa`; staged target was empty.
- **Review observed:** all six contract oracles passed by static inspection; no findings; recommendation `PASS`. The reviewed code and records support the approved threshold, AIS-only count, empty/loading/error semantics, source-specific colors, independent selection outline/card behavior, stationary fallback, unchanged idle-demo motion, marker identity remediation, historical authorization chronology, and stated local/mock evidence boundary.
- **Disposition / status:** the user selected `continue` for the bounded review result. `TASK-SEA-R2-B14-REVIEW-004` and `TASK-SEA-R2-B14-MIXED-VESSELS-001` are recorded `Verified` for scoped review/implementation criteria. `CHECKPOINT-24` records B-14's scoped PASS. This does not establish overall Sprint 2 acceptance, live provider behavior, user validation, or release readiness.
- **Verification / limitations:** this review did not run application tests, typecheck, build, app code, provider/network, or access environment/secrets. E-SEA-070/E-SEA-080 record prior local/mock checks only. No code or test path was edited during review/closeout; no staging, commit, push, deployment or provider request occurred.

### E-SEA-087 — Sprint 2 bounded acceptance review

- **Related SPEC/TASK ID:** `SPEC-SEA-001` v1.5.0; `TASK-SEA-R2-SPRINT02-ACCEPTANCE-REVIEW-001`; `SPRINT-SEA-R2-001`; `DEC-006`; `DEC-009`; `DEC-010`; `DEC-011`; `CHECKPOINT-22`; `CHECKPOINT-23`; `CHECKPOINT-24`; `E-SEA-075`–`E-SEA-086`.
- **Claim under verification:** review the current bounded Sprint 2 / R2 acceptance evidence for US-05…US-08 and B-08…B-14, reconcile the plan/outcome chronology, and state remaining gaps without changing historical records or implying broader MVP acceptance.
- **Source:** read-only review of `SPEC.md`, `SPRINT-02.md`, B-08…B-14 task records, E-SEA-031…E-SEA-086, DEC-006/009/010/011, and CHECKPOINT-21…24. User report in this conversation: clicking “Завантажити справжні позиції” loads real ships; user then dispositioned `continue SPRINT02-ACCEPTANCE-REVIEW-001`.
- **Expected:** classify each in-scope criterion by evidence class and limitation; do not run tests/runtime/provider activity, inspect secrets/environment, rewrite the plan/history, or create a passing checkpoint unless the oracle supports PASS and that result is explicitly accepted.
- **Observed matrix summary:** governance scope and dated authorization chronology — `SUPPORTED` (static review); B-08…B-12 bounded implementation — `SUPPORTED` (task evidence, local checks, and for receipt/sample only the bounded LIVE-009 capture); B-13 — `SUPPORTED` for the immutable reviewed commit and mocked local tests, with live UI detail limited to the user report; B-14 — `SUPPORTED` for its scoped mocked checks/review in CHECKPOINT-24; CHECKPOINT-03's four criteria — `SUPPORTED` as the bounded PASS in CHECKPOINT-22. The user report supports the core live click-to-display flow as **human-reported**, not independently observed. It does not explicitly establish live-response marker-to-card matching or every manual US-05…US-08 behavior.
- **Plan reconciliation:** `SPRINT-02.md` Part C's B-10…B-13 `Gated / not implemented` entries are an earlier plan snapshot; later task/evidence records document completed bounded slices. The plan and historical records were left unchanged.
- **Recommendation / status:** `CONTINUE WITH APPROVAL`; task `Verified` for review completion only. A remaining manual-acceptance detail prevents an overall Sprint 2 `PASS` recommendation. No overall acceptance checkpoint was created. US-09/US-10, release readiness, deployment, provider availability/key validity, and user validation beyond the stated report are not inferred.
- **Timestamp / environment:** 2026-09-27; local SeaRadar workspace; no runtime/provider operation.
- **Verification:** `git diff --check` and focused structural/path checks were run after the append-only closeout; results are recorded in the final handoff. No tests, typecheck, build, application code, network/provider, environment loading, or secret access occurred.
- **Reviewer / owner:** delivery/technical owner — read-only evidence synthesis; user — reported live-flow observation and `continue` disposition.
- **Limitations and follow-up:** user-reported observation is not an independently captured trace and is limited to the stated button-to-real-ships outcome. Any additional manual/live acceptance verification requires a separately reviewed bounded contract and explicit approval. No code change, checkpoint, staging, reset, cleanup, commit, push, or deployment occurred.

### E-SEA-088 — Sprint 2 bounded manual acceptance observations

- **Related SPEC/TASK ID:** `SPEC-SEA-001` v1.5.0; `TASK-SEA-R2-MANUAL-ACCEPTANCE-001`; `TASK-SEA-R2-SPRINT02-ACCEPTANCE-REVIEW-001`; `SPRINT-SEA-R2-001`; `DEC-006`; `DEC-009`; `DEC-010`; `DEC-011`; `CHECKPOINT-22`; `CHECKPOINT-23`; `CHECKPOINT-24`; `E-SEA-075`; `E-SEA-087`.
- **Source / authorization:** the user approved `continue SPRINT02-MANUAL-ACCEPTANCE-001` and later selected `continue` on the bounded manual report on 2026-09-28. Source material: user-provided local-browser screenshot and subsequent user-reported observations. Vessel identity values, coordinates, external lookup content, response body, credentials, and screenshots were not retained here.
- **Expected:** one local UI-triggered live snapshot request; visible successful AIS snapshot and selectable marker/card correspondence; brief stationary-marker observation; separately blank-key UI response; no secret-file change, retry, or code edit.
- **Observed — live pass:** screenshot shows one same-origin `GET /api/snapshot` with HTTP 200 and the UI label `AISStream`, 15-second window, displayed time `22:20:15 UTC`, AIS count `4`, and incomplete-sample wording. The screenshot's Network panel shows OSM tile requests blocked by the browser rule. The request duration was not captured in the supplied view.
- **Observed — user-reported UI checks:** loading state was seen; selected marker ID matched the card ID; the card identified AISStream as its source; the live marker remained stationary during an approximately five-second observation. Only pass/fail outcomes are recorded; no vessel identity or card fields are reproduced.
- **Observed — no-key pass:** after launching the local server with `AISSTREAM_API_KEY` explicitly empty for that process, the user reported the exact UI message `Не вдалося отримати дані: Ключ AISStream не налаштовано`. The server was reported stopped after the check. `app/api/snapshot/route.ts` checks for a missing key and returns before calling `collectSnapshot`; no provider request was independently instrumented during this no-key run.
- **Status:** `PASS` for the manually reported live marker/card, loading, stationary-marker, and no-key UI outcomes, plus the screenshot-visible local HTTP 200 and snapshot label. This is a bounded local manual result only; it does not establish overall Sprint 2 acceptance.
- **Limitations:** initial idle-demo label/selection-clearing details, all individual loading-state subdetails, exact request duration, and no-key HTTP metadata were not separately captured. The outside-site lookup was not used as evidence. The no-key no-provider behavior is supported by the route's key guard, not by server-side network instrumentation. No raw response body, environment value, or secret was read or recorded.
- **Timestamp / environment:** 2026-09-28; local browser against the non-production development server; exact completion time not captured.
- **Verification / disposition:** the user selected `continue` for this bounded report. No source/config/test edits, tests, typecheck, build, retry, additional live snapshot request, checkpoint, staging, reset, cleanup, commit, push, or deployment occurred. No overall Sprint 2 PASS is claimed.
- **Handoff:** retain the existing scope boundary. CHECKPOINT-22/23/24 remain scoped records only; this manual result does not accept other unverified acceptance criteria, US-09/US-10, release readiness, or deployment.
