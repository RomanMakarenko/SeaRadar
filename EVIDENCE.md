# EVIDENCE.md — фактичний evidence ledger

- **ID:** `EVIDENCE-SEA-001`
- **Version:** `0.4.0`
- **Status:** `Active`
- **Product owner:** методист відділення теорії судноводіння навчального центру «Норд-Вест»
- **Delivery / technical owner:** виконавець проєкту
- **Date:** 2026-09-22
- **Related artifacts:** [`CLAUDE.md`](CLAUDE.md), [`PROJECT_BRIEF.md`](PROJECT_BRIEF.md), [`SPEC.md`](SPEC.md), [`TASK_SPEC.md`](TASK_SPEC.md), [`SPRINT-01.md`](SPRINT-01.md), [`EVIDENCE.md`](EVIDENCE.md), [`RUNBOOK.md`](RUNBOOK.md), [`docs/decisions/DEC-001-mvp-contract.md`](docs/decisions/DEC-001-mvp-contract.md), [`docs/decisions/DEC-002-r1-stack.md`](docs/decisions/DEC-002-r1-stack.md)

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
