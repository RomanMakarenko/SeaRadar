# EVIDENCE.md — фактичний evidence ledger

- **ID:** `EVIDENCE-SEA-001`
- **Version:** `0.17.0`
- **Status:** `Verified`
- **Product owner:** методист відділення теорії судноводіння навчального центру «Норд-Вест»
- **Delivery / technical owner:** виконавець проєкту
- **Date:** 2026-09-24
- **Related artifacts:** [`CLAUDE.md`](CLAUDE.md), [`PROJECT_BRIEF.md`](PROJECT_BRIEF.md), [`SPEC.md`](SPEC.md), [`TASK_SPEC.md`](TASK_SPEC.md), [`SPRINT-01.md`](SPRINT-01.md), [`EVIDENCE.md`](EVIDENCE.md), [`RUNBOOK.md`](RUNBOOK.md), [`docs/decisions/DEC-001-mvp-contract.md`](docs/decisions/DEC-001-mvp-contract.md), [`docs/decisions/DEC-002-r1-stack.md`](docs/decisions/DEC-002-r1-stack.md), [`docs/decisions/DEC-005-r1-node22.md`](docs/decisions/DEC-005-r1-node22.md)

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
