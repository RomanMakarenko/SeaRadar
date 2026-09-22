# RUNBOOK.md — delivery history and handoff

- **ID:** `RUNBOOK-SEA-001`
- **Version:** `0.4.0`
- **Status:** `Active`
- **Product owner:** методист відділення теорії судноводіння навчального центру «Норд-Вест»
- **Delivery / technical owner:** виконавець проєкту
- **Date:** 2026-09-22
- **Related artifacts:** [`CLAUDE.md`](CLAUDE.md), [`PROJECT_BRIEF.md`](PROJECT_BRIEF.md), [`SPEC.md`](SPEC.md), [`TASK_SPEC.md`](TASK_SPEC.md), [`SPRINT-01.md`](SPRINT-01.md), [`EVIDENCE.md`](EVIDENCE.md), [`docs/decisions/DEC-001-mvp-contract.md`](docs/decisions/DEC-001-mvp-contract.md), [`docs/decisions/DEC-002-r1-stack.md`](docs/decisions/DEC-002-r1-stack.md)

## Purpose and boundary

`RUNBOOK.md` is an append-only operational history. It records goals, commands, decisions, blockers, recovery and handoff for a new operator. It is not the project specification, not the evidence ledger and not a full chat transcript.

## Entry format

Each entry must include: date/session, goal and scope, changed artifacts, commands and actual status, decisions and rationale, blockers/Unknowns, rollback or recovery, evidence links, handoff and next action.

## Entries

### 2026-09-21 — governance baseline setup

- **Session:** initial SeaRadar project setup.
- **Goal and scope:** create project-management infrastructure before MVP implementation; preserve a bounded AI workflow and explicit evidence boundary.
- **Changed artifacts:** created `CLAUDE.md`, `SPEC.md`, `TASK_SPEC.md`, `EVIDENCE.md`, this `RUNBOOK.md`, `docs/README.md`, `docs/sprints/README.md`, `docs/decisions/README.md`, `.gitignore`. `START.md` remains pending explicit owner authorization for deletion.
- **Commands and status:** `git init` — `PASS`; `find`/`git status --short`/Python structural-content checklist — `PASS`; temporary intake note deletion — `BLOCKED by explicit-permission requirement`.
- **Decisions:** `EVIDENCE.md` is this project's canonical evidence path; no stack, architecture, sprint task, product behavior or metric was invented; future work is exactly three sprint plans after MVP input and approval.
- **Blockers / Unknowns:** MVP specification, primary user/JTBD, outcome, success metric, constraints, owner, stack and architecture are pending.
- **Rollback / recovery:** restore `START.md` from the pre-setup workspace only if the owner explicitly requests it; otherwise revert the setup changes through Git after inspecting the diff. No product code or destructive operation was performed.
- **Evidence:** `E-SEA-001` records the initial structural baseline; `E-SEA-002` remains `UNKNOWN` until checks run.
- **Handoff:** owner to provide the MVP specification. Next bounded action: update `SPEC.md`, create stack/architecture decision records, then decompose approved scope into S1–S3.

### 2026-09-22 — approved MVP baseline and R1 governance alignment

- **Session:** clarification and bounded governance update for `TASK-SEA-GOV-001`.
- **Goal and scope:** analyze `TASK_INITIAL.md`; record that `PROJECT_BRIEF.md` is the approved but changeable MVP baseline; detail only current Sprint 1 / R1; record the selected R1 stack, ownership split and unresolved Unknowns; do not implement product code.
- **Changed artifacts:** updated `ABOUT.md`, `CLAUDE.md`, `PROJECT_BRIEF.md`, `SPEC.md`, `TASK_SPEC.md`, `SPRINT-01.md`, `docs/README.md`, `docs/sprints/README.md`, `docs/decisions/README.md`, `EVIDENCE.md` and this `RUNBOOK.md`; added `docs/decisions/DEC-001-mvp-contract.md` and `docs/decisions/DEC-002-r1-stack.md`. `START.md` and untracked `TASK_INITIAL.md` were left untouched.
- **Interaction and decisions:** the user confirmed the brief is approved, may change, and currently has only Sprint 1 detail. Product ownership is the methodist role; delivery/technical ownership is the executor role. The current R1 stack is Node.js 24, TypeScript 6.x strict, Next.js App Router + React, Leaflet, OpenStreetMap Standard and Playwright Test. Future changes require a versioned decision record; S2/S3 remain absent and waiting for input.
- **Commands and status:** final `git diff --check` — `PASS`; final `git status --short` / `git diff --stat` — `PASS` (documentation-only changes observed); final `find . -maxdepth 3 -type f -print | sort` — `PASS`; final Python metadata/scope/link validator — `PASS` (13 required files); complete governance diff review — `CONTINUE WITH APPROVAL` pending human checkpoint. An initial overly broad validator produced a false positive for intentional `EVIDENCE_LOG.md` prose; the corrected validator passed.
- **Blockers / Unknowns:** quantitative metric baseline/target/window, AISStream service terms and availability, architecture beyond R1, Sprint 2/3 outcomes/owners/dates, runtime implementation, build/tests, user validation and deployment remain `Unknown` or `Needs verification`.
- **Rollback / recovery:** inspect the complete diff, then restore the pre-task files from Git if the owner rejects the alignment; do not delete `START.md` or `TASK_INITIAL.md`; do not rewrite prior evidence entries.
- **Evidence:** `E-SEA-003` records the observed structural/content checks and their limitations.
- **Handoff:** product owner reviews the complete diff and chooses `continue`, `revise` or `HOLD`. After approval, create a new bounded task for the first R1 implementation slice; do not infer or implement S2/S3.

### 2026-09-22 — R1 decomposition and handoff strategy

- **Session:** documentation-only planning session for `TASK-SEA-R1-DECOMP-001`.
- **Goal and scope:** record the approved seven-session decomposition for B-01…B-07 and the canonical handoff strategy; explicitly do not execute product implementation.
- **Changed artifacts:** updated `TASK_SPEC.md`, `SPRINT-01.md`, `SPEC.md`, `docs/decisions/README.md`, `EVIDENCE.md` and this `RUNBOOK.md`; added `docs/decisions/DEC-003-r1-handoff.md`. No product source, package manifest, lockfile, dependency or S2/S3 plan was added.
- **Interaction and decisions:** the user agreed that named bounded sessions with a concise handoff are rational for token economy and continuity. Selected protocol: plan in `SPRINT-01.md`, current contract in `TASK_SPEC.md`, observed facts in `EVIDENCE.md`, operational handoff in `RUNBOOK.md`; no full chat transcript or unapproved checkpoint directory.
- **Decomposition:** `R1-B01-SCAFFOLD`, `R1-B02-MAP`, `R1-B03-VESSEL-MODEL`, `R1-B04-VESSEL-CARD`, `R1-B05-DEMO-ROUTES`, `R1-B06-MOTION`, `R1-B07-PLAYWRIGHT-SELECTION`.
- **Commands and status:** `git diff --check` — `PASS`; final Python decomposition/metadata/link validator — `PASS`; `find . -maxdepth 3 -type f -print | sort` — `PASS`; documentation diff review — `CONTINUE WITH APPROVAL` pending product-owner review. No runtime or implementation command was run.
- **Blockers / Unknowns:** actual checks, evidence and acceptance for B-01…B-07 remain unexecuted; checkpoint archive convention remains pending; metric, AISStream, S2/S3 and architecture-beyond-R1 Unknowns are unchanged.
- **Rollback / recovery:** restore the pre-task documentation files from Git after inspecting the diff if the owner rejects the plan; preserve prior evidence and runbook history; do not touch product source because none is in scope.
- **Evidence:** `E-SEA-004` records the structural verification and its limitations.
- **Handoff:** wait for product-owner review. The next bounded action is a separate task contract for `R1-B01-SCAFFOLD`; do not begin it from this task.

### 2026-09-22 — CHECKPOINT-01 restart handoff

- **Session:** diff review and restart checkpoint for `TASK-SEA-R1-DECOMP-001`.
- **Goal and scope:** inspect the selected documentation diff and create a small canonical checkpoint so the next session can restart without replaying the chat; no product implementation.
- **Changed artifacts:** updated `TASK_SPEC.md`, `EVIDENCE.md`, `RUNBOOK.md`, `docs/decisions/README.md`; added `docs/decisions/DEC-004-checkpoint-convention.md` and `docs/checkpoints/CHECKPOINT-01.md`. Unrelated untracked paths were not modified.
- **Diff review:** `git diff --check` — `PASS`; tracked diff paths were exactly `EVIDENCE.md`, `RUNBOOK.md`, `SPEC.md`, `SPRINT-01.md`, `TASK_SPEC.md` and `docs/decisions/README.md`; scoped checkpoint/metadata/link/scope validator — `PASS`.
- **Observed state:** last confirmed commit is `41db3d7`; R1 decomposition is recorded; no product source, package manifest, lockfile, dependency, runtime or browser test was added; S2/S3 remain absent.
- **Excluded working-tree items:** `.agents/`, `.claude/`, `reference/`, `skills-lock.json`, `TASK_INITIAL.md` and `TASK_DECOMPOSE.md` remain untracked and outside this checkpoint. A broader link scan found an unrelated `/LICENSE` reference under `reference/`; it was not changed.
- **Blockers / Unknowns:** product-owner review is pending; B-01…B-07 checks remain unexecuted; checkpoint archive/publication remains pending; product metrics, AISStream, S2/S3 and architecture-beyond-R1 Unknowns remain unchanged.
- **Rollback / recovery:** return to commit `41db3d7` after inspecting the selected diff if this checkpoint is rejected; do not delete unrelated untracked paths or rewrite prior evidence.
- **Evidence:** `E-SEA-005` records the selected diff review and scoped validation.
- **Handoff:** next session must read `docs/checkpoints/CHECKPOINT-01.md`, `TASK_SPEC.md`, `SPRINT-01.md`, `EVIDENCE.md` and this `RUNBOOK.md`; wait for `continue`, `revise` or `HOLD` before creating the B-01 task contract.

### 2026-09-22 — user-provided references and installed skills

- **Session:** user clarification for `CHECKPOINT-01`.
- **User-declared manual inputs:** the user manually added `reference/` with an example React project and TypeScript pattern references; manually installed the shadcn skill at `.agents/skills/shadcn`; and installed a Feature-Sliced skill from `https://github.com/feature-sliced/skills.git`.
- **Scope boundary:** these inputs are recorded for the next session but were not audited, executed, incorporated into product code or treated as evidence. The local installation path for the Feature-Sliced skill was not independently verified.
- **Commands and status:** no new inspection or use of those resources was performed; no files within them were changed.
- **Handoff:** the next session may review these resources only under a separate bounded task contract; keep them outside the current decomposition/checkpoint diff until explicitly selected.

### 2026-09-22 — B-01 task contract

- **Session:** continuation from `CHECKPOINT-SEA-R1-001`; bounded contract preparation for `R1-B01-SCAFFOLD`.
- **Goal and scope:** create the task contract for B-01 before any product implementation; preserve the R1 boundary and exclude manually added untracked inputs.
- **Changed artifacts:** updated `TASK_SPEC.md`; appended `E-SEA-006` to `EVIDENCE.md`. No product source, package manifest, lock-file, dependency or runtime configuration was added.
- **Decision:** product-owner `continue` was received; the selected next slice is `TASK-SEA-R1-B01-001`. Implementation remains gated by human review of the completed contract.
- **Commands and status:** `git diff --check` — `PASS`; `git status --short` / `git diff --stat` — `PASS` for scoped inspection; `find . -maxdepth 2 -type f | sort` — `PASS` for confirming no scaffold exists.
- **Observed state:** `TASK_SPEC.md` contains the B-01 goal, allowed paths, non-goals, acceptance criteria, verification plan, stop conditions and rollback. No `package.json`, lock-file or product source was present in the inspected tree.
- **Blockers / Unknowns:** human review of `TASK_SPEC.md` remains required before implementation; exact package-manager resolution and runtime behavior remain unverified; S2/S3 and architecture-beyond-R1 Unknowns are unchanged.
- **Rollback / recovery:** restore the pre-contract `TASK_SPEC.md` after inspecting the diff if the contract is rejected; preserve append-only evidence and prior RUNBOOK history; do not touch excluded untracked paths.
- **Evidence:** `E-SEA-006` records the contract preparation and structural checks.
- **Handoff:** review `TASK_SPEC.md`; if accepted, implement only `R1-B01-SCAFFOLD`, then run its targeted checks and append actual evidence before any B-02 transition. Current decision: `CONTINUE WITH APPROVAL`.

### 2026-09-22 — B-01 scaffold implementation and targeted checks

- **Session:** implementation continuation for `TASK-SEA-R1-B01-001` / `R1-B01-SCAFFOLD`.
- **Goal and scope:** create the minimum Next.js App Router + React + TypeScript strict scaffold, verify local startup and strict typing, and exclude all B-02+ functionality.
- **Changed artifacts:** added `package.json`, `package-lock.json`, `tsconfig.json`, `app/layout.tsx`, `app/page.tsx`, `app/globals.css`; updated `.gitignore`; Next.js 16 generated its managed `nextjs-agent-rules` block in `CLAUDE.md`; updated the active contract and appended `E-SEA-007`. No Leaflet, map, vessel, AIS, motion, Playwright or server feature was added.
- **Commands and status:** `npm install --no-audit --no-fund` — `PASS`; `npm ls --depth=0` — `PASS`; `npm run dev` plus HTTP request to loopback — `PASS`; `npx tsc --noEmit` — initially `FAIL` because the broad include traversed excluded `reference/`, then `PASS` after narrowing `tsconfig.json`; `git diff --check` — `PASS`; targeted source search — `PASS`.
- **Observed state:** `http://127.0.0.1:3000/` returned the `SeaRadar` heading and `R1 application scaffold.` paragraph. `next-env.d.ts` remains generated and ignored per Next.js guidance. The environment is Node.js `v22.16.0`, not the R1 Node.js 24 baseline.
- **Blockers / Unknowns:** human diff review remains pending; Node.js 24 compatibility is unverified in this environment; real browser/manual visual check and `next build` were not run; all R1/S2/S3 Unknowns remain unchanged.
- **Rollback / recovery:** remove only the B-01 implementation paths and restore the prior contract version after inspecting the diff if the slice is rejected; preserve append-only evidence/history and do not touch excluded untracked inputs. If removing the Next.js-managed block, note that a future `next dev` will recreate it unless the approved exception remains.
- **Evidence:** `E-SEA-007` records installation, dependency, dev-server, type-check and scope observations.
- **Handoff:** perform human diff review and decide `continue`, `revise` or `HOLD`. Do not start `R1-B02-MAP` until B-01 is accepted and Node.js 24/manual/build limitations are resolved or explicitly accepted.

### 2026-09-22 — B-02 map implementation and verification handoff

- **Session:** implementation continuation for `TASK-SEA-R1-B02-001` / `R1-B02-MAP`.
- **Goal and scope:** add only the client-side Leaflet map foundation for the Dover Strait, with approved OSM Standard configuration, full-area layout and resize lifecycle; exclude B-03+ behavior.
- **Changed artifacts:** updated `TASK_SPEC.md`, `package.json`, `package-lock.json`, `app/layout.tsx`, `app/page.tsx`, `app/globals.css`; added `app/map-config.ts`, `app/map-shell.tsx` and `app/sea-map.tsx`. Excluded untracked inputs remained untouched.
- **Commands and status:** `npm install` dependency preparation — `PASS`; `npm ls --depth=0` — `PASS`; `npx tsc --noEmit` — `PASS`; `npm run build` — `PASS`; `git diff --check` — `PASS`; targeted B-03+ scope search — `PASS`; `npm run dev` — `PASS`; `lsof` confirmed `127.0.0.1:3000` — `PASS`; direct-open and refresh HTTP requests — `PASS` with status `200`; OSM tile probe — `PASS` with status `200` and `image/png`.
- **Decisions and rationale:** retained the client boundary as `MapShell` plus dynamically loaded `SeaMap`; kept map constants in one module; imported Leaflet CSS from the root layout; retained loopback/port pinning and Node.js 24 declaration from the B-01 review corrections. Updated the task contract to list the actual map component paths.
- **Blockers / Unknowns:** no browser automation/runtime (`chromium-cli`, Chromium, Chrome, Playwright or Electron) was available, so rendered map visibility, attribution, initial center/zoom, bounds, resize artifacts and unmount cleanup remain `UNKNOWN`. Runtime is Node.js `v22.16.0`, so Node.js 24 compatibility remains `Needs verification`. Next.js emitted the existing external package-lock warning while the build passed.
- **Rollback / recovery:** inspect the B-02 diff, then restore the B-01 accepted commit and remove only B-02 dependency/source paths if rejected; preserve append-only history and excluded untracked inputs. Do not begin B-03 from an unaccepted B-02 slice.
- **Evidence:** `E-SEA-008` records the actual automated, source, HTTP/runtime and tile-probe results and the browser limitation.
- **Handoff:** human owner must review the diff and choose `continue`, `revise` or `HOLD`. Next bounded action is `R1-B03-VESSEL-MODEL` only after B-02 browser/manual acceptance or an explicit decision to accept the limitation.

### 2026-09-22 — B-02 Next.js-guidance reverification and handoff preparation

- **Session:** fresh verification continuation for `TASK-SEA-R1-B02-001` / `R1-B02-MAP`.
- **Goal and scope:** re-read the installed Next.js 16 guidance, verify that the existing B-02 Server/Client composition follows it, normalize exact type dependency versions, rerun bounded checks, and prepare a reviewable handoff without starting B-03.
- **Changed artifacts:** normalized exact `@types/leaflet` and `@types/node` versions in `package.json`/`package-lock.json`; corrected the B-01 predecessor wording and current observed status in `TASK_SPEC.md`; appended `E-SEA-009` to `EVIDENCE.md`. Map source and excluded untracked inputs were not changed.
- **Next.js guidance review:** read the installed App Router project-structure, layouts/pages, Server and Client Components, CSS, lazy-loading, `use client`, root layout and TypeScript guides. The implementation conforms: `app/page.tsx` remains server-rendered, `MapShell` owns `next/dynamic(..., { ssr: false })`, Leaflet is imported at runtime inside the client effect, global/external CSS is imported from the root layout, and generated `next-env.d.ts` remains ignored and included through `tsconfig.json`.
- **Commands and status:** exact `npm install --save-exact --save-dev @types/leaflet@1.9.22 @types/node@24.13.6 --registry=https://registry.npmjs.org --no-audit --no-fund` — `PASS` with expected Node.js engine warning; manifest/lock exactness — `PASS`; `npm ls --depth=0` — `PASS`; `npx tsc --noEmit` — `PASS`; `npm run build` — `PASS`; `git diff --check` — `PASS`; targeted B-03+ scope and required-path checks — `PASS`; single package-manager lock check — `PASS`; `npm run dev` plus `lsof` — `PASS` on `127.0.0.1:3000`; direct-open and refresh HTTP requests — `PASS` with status `200`; OSM tile probe — `PASS` with status `200` and `image/png`; browser availability probe — `BLOCKED` because no supported browser runtime was installed.
- **Blockers / Unknowns:** rendered map visibility, attribution, initial center/zoom, bounds interaction, resize artifacts and unmount cleanup remain `UNKNOWN`; HTTP/build/tile checks do not substitute for browser visual acceptance. Node.js `v22.16.0` remains below the Node.js 24 baseline, so compatibility is `Needs verification`. The build retained the existing warning about ignoring `/Users/romanmakarenko/package-lock.json` outside the repository.
- **Rollback / recovery:** if the review rejects the slice, restore the B-02 dependency/source changes and contract updates from the last accepted B-01 commit after inspecting the diff; preserve append-only evidence/history and excluded untracked inputs. No commit, push, deployment or destructive operation was performed.
- **Evidence:** `E-SEA-009` records the fresh Next.js guidance review, exact dependency normalization, automated/runtime results and browser limitation.
- **Handoff:** current state is `CONTINUE WITH APPROVAL`, not B-02 `DONE`. Human review must choose `continue`, `revise` or `HOLD`; only after acceptance may the next bounded session start `R1-B03-VESSEL-MODEL`.

### 2026-09-22 — B-03 vessel model and static marker implementation handoff

- **Session:** bounded implementation continuation for `TASK-SEA-R1-B03-001` / `R1-B03-VESSEL-MODEL` after the human `continue` decision for B-02.
- **Goal and scope:** define the shared vessel structure, add one deterministic `demo-1` vessel inside the Dover bounds, render one static Leaflet marker with course/neutral icon branches and required data attributes, and show the exact source label. Motion, routes, cards, AIS, timers, APIs and dependencies remain out of scope.
- **Changed artifacts:** updated `TASK_SPEC.md`, `app/sea-map.tsx`, `app/map-shell.tsx`, `app/globals.css`; added `app/vessel-model.ts`. `package.json`, `package-lock.json`, `app/map-config.ts`, `app/page.tsx`, `app/layout.tsx` and excluded untracked inputs were not changed.
- **Implementation details:** `Vessel` and `VesselSource` are defined in `app/vessel-model.ts`; `DEMO_VESSEL` uses `demo-1`, center coordinate `(51.0, 1.45)`, speed `12`, course `135`, ISO timestamp `2026-09-22T12:00:00Z` and source `demo`. `SeaMap` creates one `L.divIcon`/`L.marker`, assigns `dataset.vesselId` and `dataset.icon`, rotates only the child glyph, and removes the marker during cleanup. `MapShell` renders `Демонстраційні дані` with `data-source="demo"`.
- **Commands and status:** `git diff --check` — `PASS`; `npx tsc --noEmit` — `PASS`; `npm run build` — `PASS`; targeted B-03 source, bounds and marker-cardinality checks — `PASS`; `npm run dev` on the required port — `BLOCKED` because `127.0.0.1:3000` was already occupied; existing SeaRadar server confirmed by `lsof`, and direct HTTP request — `PASS` with status `200`; browser availability probe — `BLOCKED` because no supported browser runtime was installed.
- **Blockers / Unknowns:** browser visual acceptance of vessel visibility, live DOM attributes, orientation/neutral rendering, source-label visibility, refresh/resize behavior and unmount cleanup remains `UNKNOWN`; Node.js `v22.16.0` is below the Node.js 24 baseline, so compatibility remains `Needs verification`; the build retained the existing external package-lock warning.
- **Rollback / recovery:** inspect the B-03 diff and restore the last accepted B-02 commit by reverting only B-03 implementation paths and task-contract state if rejected; preserve append-only evidence/history and excluded untracked inputs. Do not stop the pre-existing dev server as part of this bounded handoff.
- **Evidence:** `E-SEA-010` records the actual B-03 source, build, type, HTTP and environment checks and their limitations.
- **Handoff:** status is `CONTINUE WITH APPROVAL`; human owner must review the B-03 diff and choose `continue`, `revise` or `HOLD`. Next bounded action is `R1-B04-VESSEL-CARD` only after B-03 acceptance.

### 2026-09-22 — B-04 vessel selection and card implementation handoff

- **Session:** bounded implementation continuation for `TASK-SEA-R1-B04-001` / `R1-B04-VESSEL-CARD` after the user `continue` decision for B-03.
- **Goal and scope:** make the single static demo marker selectable, store the selected `Vessel` in the client shell, render the approved card formats as text, and preserve selection on repeated marker/map clicks. Motion, routes, three vessels, AIS, real-data loading, search, close controls, APIs and dependencies remained out of scope.
- **Changed artifacts:** updated `TASK_SPEC.md`, `app/sea-map.tsx`, `app/map-shell.tsx`, `app/globals.css`; added `app/vessel-card.tsx`. `app/vessel-model.ts`, `app/map-config.ts`, `app/page.tsx`, `app/layout.tsx`, package files and excluded untracked inputs were not changed.
- **Implementation details:** `MapShell` owns `Vessel | null` selection and passes a stable callback through the existing `ssr: false` dynamic map boundary. `SeaMap` retains the client-only Leaflet import/lifecycle, makes the marker interactive, forwards marker clicks, does not clear selection on map clicks, and removes the listener during cleanup. `VesselCard` renders id, name, coordinates, speed, course, UTC time and source using React text nodes; formatting preserves coordinate trailing zeros and numeric `0 kn`, and maps unknown values to `Немає даних`. The panel order is the disabled future-data button, source label and selected card.
- **Commands and status:** `git diff --check` — `PASS`; `npx tsc --noEmit` — `PASS`; `npm run build` — `PASS` with the existing external package-lock warning; corrected targeted B-04 source/scope checks — `PASS`; `npm run dev` — `BLOCKED` with `EADDRINUSE` because `127.0.0.1:3000` was occupied by the pre-existing Node PID `79575`; `lsof` and direct HTTP request — `PASS` supplemental with status `200`; browser availability probe — `BLOCKED` because no supported browser runtime was installed.
- **Blockers / Unknowns:** live marker/card DOM, exact visual formatting, literal `<b>Демо</b>` rendering, repeated/map click persistence, panel order, resize behavior and unmount cleanup remain `UNKNOWN`; Node.js `v22.16.0` is below the Node.js 24 baseline, so compatibility remains `Needs verification`; the build retained the existing warning about ignoring `/Users/romanmakarenko/package-lock.json` outside the repository.
- **Rollback / recovery:** inspect the B-04 diff and restore the B-03 implementation/task contract from commit `bad4df2` by reverting only B-04 paths if rejected; preserve append-only evidence/history and excluded untracked inputs. Do not stop the pre-existing dev server as part of this handoff.
- **Evidence:** `E-SEA-011` records the actual B-04 type, build, source/scope, HTTP and environment checks and their limitations.
- **Handoff:** status is `CONTINUE WITH APPROVAL`; human owner must review the B-04 diff and choose `continue`, `revise` or `HOLD`. Next bounded action is `R1-B05-DEMO-ROUTES` only after B-04 acceptance.

### 2026-09-22 — B-04 commit and next-session handoff preparation

- **Session:** delivery handoff preparation after `TASK-SEA-R1-B04-001` implementation verification.
- **Goal and scope:** make the next session restartable from the pushed B-04 commit without replaying the conversation; no B-05 implementation was started.
- **Changed artifacts:** updated the B-04 acceptance-status line in `TASK_SPEC.md`; appended `E-SEA-012` to `EVIDENCE.md`; appended this delivery handoff. Product implementation remains in commit `addc7ba`.
- **Commands and status:** `git diff --check`, `npx tsc --noEmit`, `npm run build` and targeted B-04 source/scope checks — `PASS`; `git push origin sprint1` — `PASS`; `git log -1` confirmed `addc7ba` at both `sprint1` and `origin/sprint1`; final `git status --short` showed only excluded pre-existing untracked inputs.
- **Delivery state:** branch `sprint1` is synchronized with `origin/sprint1` at `addc7ba` (`feat(r1): add B-04 vessel selection card`). The commit contains only the seven B-04/task/evidence files; `.agents/`, `.claude/`, `reference/`, `TASK_INITIAL.md`, `TASK_DECOMPOSE.md` and `skills-lock.json` were not staged.
- **Blockers / Unknowns:** browser visual/DOM acceptance remains `UNKNOWN/BLOCKED` because no supported browser runtime is installed; Node.js 24 compatibility remains `Needs verification` because the environment is Node.js `v22.16.0`; `npm run dev` remains blocked by the pre-existing listener on `127.0.0.1:3000`.
- **Rollback / recovery:** inspect `git show addc7ba`; if B-04 is rejected, restore the last accepted B-03 state at `bad4df2` by reverting only the B-04 implementation/task-contract changes while preserving append-only evidence/history and excluded untracked inputs.
- **Evidence:** `E-SEA-011` records implementation checks; `E-SEA-012` records commit/push and branch synchronization.
- **Next session start:** read `TASK_SPEC.md`, the latest `EVIDENCE.md` entries `E-SEA-011` and `E-SEA-012`, and the latest two `RUNBOOK.md` entries; inspect `git show addc7ba`; perform the human B-04 diff review and explicitly choose `continue`, `revise` or `HOLD`. Only after `continue`, create the bounded `TASK-SEA-R1-B05-001` contract and start `R1-B05-DEMO-ROUTES`.

### 2026-09-22 — B-05 demo routes implementation handoff

- **Session:** bounded implementation continuation for `TASK-SEA-R1-B05-001` / `R1-B05-DEMO-ROUTES` after the user requested continuation from the delivered B-04 slice.
- **Goal and scope:** add exactly three static demo vessels with ten literal route points each, initial positions/courses/speeds, and one selectable marker per vessel; preserve B-04 card/selection semantics and exclude B-06 motion, timers, playback, AIS and B-07 tests.
- **Changed artifacts:** updated `TASK_SPEC.md`, `app/vessel-model.ts` and `app/sea-map.tsx`; `app/map-shell.tsx`, `app/vessel-card.tsx`, `app/map-config.ts`, `app/globals.css`, package files and excluded untracked inputs were not changed.
- **Implementation details:** `RoutePoint` and demo-specific `DemoVessel` keep route data out of the shared `Vessel` shape. `DEMO_VESSELS` contains `demo-1`…`demo-3`, each with ten explicit points inside the configured bounds, literal speeds, first-point coordinates and initial courses `0`, `90` and `180` consistent with their first route segments. `DEMO_VESSEL` remains an alias for B-04 compatibility. `SeaMap` loops over the dataset, sets marker data attributes, forwards the matching vessel on click and removes every marker listener/marker during cleanup.
- **Commands and status:** `git diff --check` — `PASS`; `npx tsc --noEmit` — `PASS`; `npm run build` — `PASS` with the existing external package-lock warning; `npm ls --depth=0` — `PASS` for unchanged direct dependencies, with extraneous `@emnapi/runtime` and `@img/sharp-wasm32` reported; targeted structural/data/course/scope validators — `PASS`; `lsof` — `PASS` confirming the pre-existing loopback listener; supplemental `curl` — `PASS` with `HTTP 200 text/html`; browser availability probe — `BLOCKED` because no supported browser runtime was installed.
- **Decisions and rationale:** kept implementation to the two B-05 paths; kept `MapShell` and `VesselCard` unchanged because existing `Vessel | null` selection accepts all three snapshots; kept route data static and explicit so playback/azimuth calculation remains B-06 scope; did not stop the pre-existing server.
- **Blockers / Unknowns:** live DOM/visual checks for three markers, matching card clicks, selection persistence, icon state, static positions and unmount cleanup remain `UNKNOWN/BLOCKED`; Node.js `v22.23.2` is below the Node.js 24 baseline, so compatibility remains `Needs verification`; `npm run dev` was not started because `127.0.0.1:3000` was already occupied.
- **Rollback / recovery:** inspect the B-05 diff and restore only `TASK_SPEC.md`, `app/vessel-model.ts` and `app/sea-map.tsx` to the B-04 delivered baseline at `addc7ba` if rejected; preserve append-only evidence/history and excluded untracked inputs; do not reset the shared branch.
- **Evidence:** `E-SEA-013` records the actual B-05 checks and limitations.
- **Handoff:** current status is `CONTINUE WITH APPROVAL`, not `DONE`; commit/push this bounded slice only after final diff review. The next session must inspect the delivered B-05 commit, perform the human diff review and choose `continue`, `revise` or `HOLD`. Only after `continue` may it start `R1-B06-MOTION`.

### 2026-09-22 — B-06 motion implementation handoff

- **Session:** bounded implementation continuation for `TASK-SEA-R1-B06-001` / `R1-B06-MOTION` after the user reviewed B-05 and chose `continue`.
- **Goal and scope:** advance the three existing literal demo routes every 2000 ms, compute the current-segment great-circle bearing, update marker and selected-card snapshots together, stop each vessel at its final point with speed `0`, and clean up the interval on unmount. Pause, rewind, loop, AIS, API, search, dependencies and B-07 tests remained out of scope.
- **Changed artifacts:** updated `TASK_SPEC.md`, `app/sea-map.tsx`, `app/map-shell.tsx`, `EVIDENCE.md` and this `RUNBOOK.md`; `app/vessel-model.ts`, `app/vessel-card.tsx`, `app/map-config.ts`, `app/page.tsx`, `app/layout.tsx`, `app/globals.css`, package files and excluded untracked inputs were not changed.
- **Implementation details:** `SeaMap` owns one lifecycle-scoped motion state array and one `DEMO_TICK_MS = 2000` interval. Each tick advances unfinished vessels by one literal route index, derives a normalized great-circle bearing from the traversed segment, updates the Leaflet marker and forwards the same `Vessel` snapshot through `onVesselUpdate`. `MapShell` replaces the selected snapshot only when its ID matches, so the card follows the marker without changing B-04 selection persistence. Finished vessels are skipped after reaching the final point; cleanup clears the interval and existing map resources.
- **Commands and status:** `git diff --check` — `PASS`; `npx tsc --noEmit` — `PASS`; `npm run build` — `PASS` with the existing external package-lock warning; `npm ls --depth=0` — `PASS` for the unchanged direct dependency set; targeted motion/scope validator — `PASS`; `npm run dev` — `BLOCKED` with `EADDRINUSE` because pre-existing Node PID `79575` owned `127.0.0.1:3000`; `lsof` — `PASS` confirming that listener; supplemental `curl` — `PASS` with `HTTP 200 text/html`; browser availability probe — `BLOCKED` because no supported browser runtime was installed; runtime observed as Node.js `v22.16.0`, npm `11.4.2`, Next.js `16.3.5`.
- **Decisions and rationale:** kept B-05 route literals unchanged; used one interval rather than one timer per vessel; kept motion in the existing client-only Leaflet lifecycle; forwarded per-tick snapshots to the existing selected-vessel state instead of creating a second card-specific motion calculation; did not stop the pre-existing server and did not add a dependency.
- **Blockers / Unknowns:** browser/manual observation of visible movement, course orientation, selected-card updates, final `0 kn` stop, hot-reload timer count and unmount cleanup remains `UNKNOWN/BLOCKED`; Node.js 24 compatibility remains `Needs verification`; no B-07 tests were run or added.
- **Rollback / recovery:** inspect the B-06 diff and restore only `TASK_SPEC.md`, `app/sea-map.tsx` and `app/map-shell.tsx` to the B-05 delivered state at `70fbf29` if rejected; preserve append-only evidence/history and excluded untracked inputs; do not reset the shared branch or stop the pre-existing server.
- **Evidence:** `E-SEA-014` records the actual B-06 automated, source, dependency, HTTP and environment checks and limitations.
- **Handoff:** current status is `CONTINUE WITH APPROVAL`, not `DONE`; no commit or push was made because final human B-06 diff review is pending. Next bounded action is human review of the three tracked B-06 paths and selection of `continue`, `revise` or `HOLD`; only after `continue` may the next session start `R1-B07-PLAYWRIGHT-SELECTION`.

### 2026-09-22 — B-06 review decision and remote delivery

- **Session:** post-review delivery handoff for `TASK-SEA-R1-B06-001` / `R1-B06-MOTION`.
- **Goal and scope:** record the human `continue` decision, commit the already verified B-06 slice with its evidence/history, push it to `origin/sprint1`, and provide the next session with a restart point.
- **Changed artifacts:** no new product code; the reviewed B-06 files and records are delivered in commit `f215aae`. The commit contains `TASK_SPEC.md`, `app/sea-map.tsx`, `app/map-shell.tsx`, `EVIDENCE.md` and `RUNBOOK.md` only.
- **Review and decision:** B-06 diff review confirmed the bounded scope and consistency of interval lifecycle, route advancement, bearing calculation, selected-card synchronization and cleanup. Human decision: `continue`.
- **Commands and status:** `git diff --check` — `PASS`; `git show --stat f215aae` — `PASS`; `git push origin sprint1` — `PASS`, `70fbf29..f215aae sprint1 -> sprint1`; `git log -2 --oneline --decorate` — `PASS`, local and remote refs at `f215aae`; final `git status --short` — only pre-existing excluded untracked inputs.
- **Blockers / Unknowns:** browser/manual movement, card, final-stop, hot-reload and unmount checks remain `UNKNOWN`/`BLOCKED`; Node.js 24 compatibility remains `Needs verification`; no B-07 tests have been added or run.
- **Rollback / recovery:** if the B-06 delivery is rejected, inspect `f215aae` and restore the B-05 implementation state at `70fbf29` without rewriting append-only evidence/history or deleting excluded untracked inputs.
- **Evidence:** `E-SEA-015` records the human decision, commit contents, remote synchronization and remaining limitations.
- **Handoff:** current status is `CONTINUE WITH APPROVAL`; next session is `R1-B07-PLAYWRIGHT-SELECTION`, starting from `f215aae`. It must first read `TASK_SPEC.md`, `SPRINT-01.md`, `E-SEA-014`, `E-SEA-015` and the latest two `RUNBOOK.md` entries, then verify the working tree and inspect `git show --stat f215aae` before preparing the B-07 contract.

### 2026-09-22 — B-07 Playwright selection handoff

- **Session:** bounded implementation continuation for `TASK-SEA-R1-B07-001` / `R1-B07-PLAYWRIGHT-SELECTION` after B-06 commit `f215aae` and human `continue` decision recorded in `E-SEA-015`.
- **Goal and scope:** add one Playwright Test runner/project and one focused Chromium spec for three demo-vessel markers, matching cards, repeated-click persistence and blocked OSM tile requests; do not modify B-06 product behavior or add motion/visual/AIS/API/search behavior.
- **Changed artifacts:** updated `TASK_SPEC.md`, `package.json`, `package-lock.json`, `.gitignore`; added `playwright.config.ts` and `tests/vessel-selection.spec.ts`; `app/`, `EVIDENCE.md` and this `RUNBOOK.md` were not product-code inputs to the spec, with this entry appended only after checks.
- **Implementation details:** `playwright.config.ts` declares exactly one `chromium` project, uses the configured `baseURL` `http://127.0.0.1:3000`, and configures `webServer` to run `npm run dev` with `reuseExistingServer: true`. The spec intercepts `https://tile.openstreetmap.org/**` before navigation, aborts observed tile requests, asserts zero completed tile requests, finds exactly three `[data-vessel-id]` markers, checks `demo-1`…`demo-3`, opens each matching `[data-vessel-card-id]` card and confirms it remains visible after a repeated marker click. Generated Playwright output directories are ignored.
- **Commands and status:** `git diff --check` — `PASS`; `npx tsc --noEmit` — `PASS`; `npm run build` — `PASS`; `npm ls --depth=0` — `PASS` for the authorized `@playwright/test@1.63.0` addition, with pre-existing extraneous packages reported; inline structural/config/scope validator — `PASS`; `npx playwright test --list` — `PASS`, one `[chromium]` test; `npx playwright install chromium` — `PASS`; `npx playwright test tests/vessel-selection.spec.ts` — `PASS`, `1 passed (2.8s)` using one worker; `lsof` — `PASS`, pre-existing PID `79575` listens on `127.0.0.1:3000`; supplemental `curl` — `PASS`, `HTTP 200 text/html; charset=utf-8`; runtime commands — Node.js `v22.23.2`, npm `10.9.8`, Next.js `16.3.5`, Playwright `1.63.0`.
- **Decisions and rationale:** used the single required Playwright dependency and Chromium only; kept tile blocking in the test rather than changing the map; reused the existing server through the configured Playwright `webServer` boundary; did not stop or replace the pre-existing listener and did not add a test runner, product dependency or product code.
- **Blockers / Unknowns:** Node.js 24 compatibility remains `Needs verification` because this environment runs Node.js `v22.23.2`. Automated selection and tile-block checks passed, but this B-07 run does not establish B-06 manual visual movement, course orientation, final stop, hot-reload timer count or unmount cleanup; those remain `UNKNOWN`/`BLOCKED`. The Playwright server was reused rather than freshly started because port `3000` was occupied.
- **Rollback / recovery:** inspect the B-07 diff and restore only `TASK_SPEC.md`, `package.json`, `package-lock.json`, `playwright.config.ts`, `tests/vessel-selection.spec.ts` and `.gitignore` to the B-06 delivered state at `f215aae` if rejected; preserve append-only evidence/history, pre-existing excluded untracked inputs and the unrelated pre-existing server.
- **Evidence:** `E-SEA-016` records the actual B-07 checks and limitations.
- **Handoff:** current status is `CONTINUE WITH APPROVAL`; human diff review must choose `continue`, `revise` or `HOLD` before any commit/push or next bounded action. No commit or push was made in this session.

### 2026-09-22 — B-07 human diff review

- **Session:** human review closure for `TASK-SEA-R1-B07-001` / `R1-B07-PLAYWRIGHT-SELECTION`.
- **Review scope:** checked the B-07 contract against the tracked diff and new Playwright config/spec; verified no `app/` product paths, unrelated dependencies, extra runners, visual regression, motion assertions or pre-existing untracked paths entered the slice.
- **Observed:** one Chromium project and configured dev server remain in the config; the targeted selection/tile-block test passed; the diff is bounded to the authorized B-07 paths plus append-only evidence/history and generated-output ignores.
- **Decision:** `continue`; no correctness, scope or test-boundary blockers found. Human review is closed and commit/push is authorized.
- **Limitations:** Node.js 24 compatibility remains `Needs verification`; B-06 manual movement, final-stop, hot-reload and unmount checks remain `UNKNOWN`/`BLOCKED`.
- **Next action:** commit and push the verified B-07 slice, then record remote synchronization.
