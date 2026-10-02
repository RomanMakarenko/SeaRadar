# RUNBOOK.md — delivery history and handoff

- **ID:** `RUNBOOK-SEA-001`
- **Version:** `0.29.0`
- **Status:** `Verified`
- **Product owner:** методист відділення теорії судноводіння навчального центру «Норд-Вест»
- **Delivery / technical owner:** виконавець проєкту
- **Date:** 2026-09-27
- **Related artifacts:** [`CLAUDE.md`](CLAUDE.md), [`PROJECT_BRIEF.md`](PROJECT_BRIEF.md), [`SPEC.md`](SPEC.md), [`TASK_SPEC.md`](TASK_SPEC.md), [`SPRINT-01.md`](SPRINT-01.md), [`EVIDENCE.md`](EVIDENCE.md), [`docs/checkpoints/CHECKPOINT-23.md`](docs/checkpoints/CHECKPOINT-23.md), [`docs/decisions/DEC-001-mvp-contract.md`](docs/decisions/DEC-001-mvp-contract.md), [`docs/decisions/DEC-002-r1-stack.md`](docs/decisions/DEC-002-r1-stack.md), [`docs/decisions/DEC-005-r1-node22.md`](docs/decisions/DEC-005-r1-node22.md), [`docs/decisions/DEC-011-r2-task-authorization-reconciliation.md`](docs/decisions/DEC-011-r2-task-authorization-reconciliation.md)

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

### 2026-09-22 — B-07 remote delivery

- **Session:** post-review delivery for `TASK-SEA-R1-B07-001` / `R1-B07-PLAYWRIGHT-SELECTION`.
- **Delivered commit:** `c89127f` — `feat(r1): add B-07 Playwright selection checks`.
- **Commit boundary:** exactly `.gitignore`, `EVIDENCE.md`, `RUNBOOK.md`, `TASK_SPEC.md`, `package-lock.json`, `package.json`, `playwright.config.ts` and `tests/vessel-selection.spec.ts`; the unexpected `sea-radar-s1.png` was removed from the commit index and preserved locally as untracked.
- **Commands and status:** `git commit --amend --no-edit` — `PASS`; `git show --stat --oneline HEAD` — `PASS`; `git diff HEAD^ HEAD --name-only` — `PASS`; `git push origin sprint1` — `PASS`, `f215aae..c89127f sprint1 -> sprint1`.
- **Remote state:** local and `origin/sprint1` point to `c89127f`; pre-existing excluded untracked paths remain outside the commit.
- **Evidence:** `E-SEA-018` records the bounded commit contents and remote synchronization.
- **Limitations:** Node.js 24 compatibility remains `Needs verification`; B-06 manual movement, final-stop, hot-reload and unmount checks remain `UNKNOWN`/`BLOCKED`.
- **Handoff:** B-07 is verified and delivered; no automatic transition to S2/S3. Next action requires a new bounded task and explicit approval.

### 2026-09-22 — B-06 manual movement confirmation

- **Session:** post-delivery clarification of the B-06 manual acceptance limitation.
- **User observation:** user reported that the rendered vessel arrows move in the running application.
- **Evidence:** `E-SEA-019` records this as a manual movement confirmation.
- **Status:** visible movement is now `PASS` based on the user's observation. Bearing orientation, final stop at speed `0`, hot-reload timer accumulation and unmount cleanup remain `UNKNOWN` because they were not reported or observed in this session.
- **Handoff:** this partial confirmation does not by itself change Sprint 1 to `DONE`; remaining B-06 checks and Node.js 24 compatibility still require evidence.

### 2026-09-22 — B-06 course orientation confirmation

- **Session:** follow-up to the B-06 manual movement confirmation.
- **User observation:** user confirmed the course-orientation check in response to item 1.
- **Evidence:** `E-SEA-020` records the reported manual confirmation.
- **Status:** visible arrow/course orientation is now `PASS` based on the user's confirmation. Final stop at `0 kn`, hot-reload timer accumulation, unmount cleanup and Node.js 24 compatibility remain `UNKNOWN`/`Needs verification`.
- **Handoff:** Sprint 1 remains not fully closed until the remaining B-06 runtime checks are evidenced.

### 2026-09-22 — B-06 final-stop confirmation

- **Session:** follow-up to the B-06 course-orientation confirmation.
- **User observation:** user confirmed item 2 after nine ticks.
- **Evidence:** `E-SEA-021` records the reported nine-tick final-stop observation.
- **Status:** final stop at the expected nine-tick boundary is now `PASS` based on the user's confirmation, including the item-2 `0 kn` outcome. Exact vessel ids, final coordinates and post-stop observation duration were not supplied.
- **Handoff:** remaining B-06 checks are hot-reload timer accumulation and unmount cleanup; Node.js 24 compatibility remains `Needs verification`.

### 2026-09-22 — B-06 reload reset confirmation

- **Session:** follow-up to the B-06 final-stop confirmation.
- **User observation:** user reported that after reload the demo vessels return to their initial points.
- **Evidence:** `E-SEA-022` records the reset-to-initial-points observation.
- **Status:** reset after reload is `PASS`. This is not by itself proof of no timer accumulation during hot reload, because a full page reload recreates the lifecycle.
- **Handoff:** hot-reload-specific timer accumulation, unmount cleanup and Node.js 24 compatibility remain open.

### 2026-09-22 — B-06 unmount error check

- **Session:** follow-up to the B-06 reload reset confirmation.
- **User observation:** user reported no errors during the item-4 unmount/reload check.
- **Evidence:** `E-SEA-023` records the no-error observation.
- **Status:** no-error observation is `PASS`; direct proof that every timer and Leaflet listener was cleared remains unavailable from this report alone.
- **Handoff:** Node.js 24 compatibility remains the only environment check; timer cleanup is supported by source evidence but not directly instrumented in this manual observation.

### 2026-09-22 — B-06 hot-reload cadence check

- **Session:** headed browser follow-up to the B-06 manual checks.
- **Procedure:** opened Chromium headed against the existing `127.0.0.1:3000` server; added and immediately reverted a temporary comment in `app/sea-map.tsx`; selected `demo-1`; observed card coordinates before and after the temporary Fast Refresh change and at two approximately 2100 ms intervals.
- **Observed:** coordinates progressed `51.00000, 1.45000` → `51.04000, 1.49500` → `51.05000, 1.51000` → `51.06000, 1.52500`; post-change readings advanced one literal route point per observation with no observed acceleration or skipped point. The temporary `app/sea-map.tsx` change was fully reverted. A single 404 console resource error was identified as the absent `/favicon.ico`.
- **Status:** hot-reload cadence/no-acceleration observation `PASS`; direct timer instrumentation and unmount cleanup remain not independently measured. Evidence: `E-SEA-024`.
- **Handoff:** only Node.js 24 compatibility remains as the primary open verification item; no commit or push was made for this evidence update.

### 2026-09-22 — R1 Node.js baseline changed to 22

- **Decision:** the project owner approved Node.js 22 as the R1 runtime baseline; DEC-005 records the change and supersedes DEC-002 for the current runtime value.
- **Changes:** `package.json` and `package-lock.json` now declare `node: 22.x`; current canonical governance, SPEC, Sprint 1 and task documents point to the Node.js 22 baseline; ABOUT.md was aligned; no product code was changed.
- **Environment:** active shell verified `node v22.23.2` and `npm 10.9.8`; the previously installed nvm Node.js `v24.1.0` was removed. `npm install --package-lock-only --ignore-scripts --no-audit --no-fund` returned `up to date` and `git diff --check` passed.
- **Evidence:** `E-SEA-025` and `DEC-005-R1-NODE22`.
- **Limitations:** historical entries retain the Node.js 24 wording that was true when they were recorded; `@types/node@24.13.6` remains a type-definition dependency, not the runtime requirement. No new product build or Playwright run was performed for this documentation/configuration-only change.
- **Handoff:** use Node.js 22.x for subsequent R1 checks; do not install or activate Node.js 24 unless a new approved decision changes the baseline.

### 2026-09-22 — R1 checks on Node.js 22

- **Commands and status:** `node --version` / `npm --version` — `v22.23.2` / `10.9.8`, `PASS`; `git diff --check` — `PASS`; `npx tsc --noEmit` — `PASS`; `npm run build` — `PASS`; `npm ls --depth=0` — completed with the pre-existing extraneous `@emnapi/runtime` and `@img/sharp-wasm32` entries; `npx playwright test tests/vessel-selection.spec.ts` — `PASS`, `1 passed (1.5s)` under one Chromium project.
- **Server:** Playwright reused the existing `127.0.0.1:3000` listener. Process inspection confirmed the server's executable is `/Users/romanmakarenko/.local/share/fnm/node-versions/v22.23.2/installation/bin/node`.
- **Build note:** Next.js emitted the existing warning that it ignored `/Users/romanmakarenko/package-lock.json` outside the repository; compilation, TypeScript and static generation completed successfully.
- **Evidence:** `E-SEA-026`.
- **Handoff:** the R1 checks requested for the Node.js 22 baseline are complete; no Node.js 24 runtime was installed or activated during these checks. No commit or push was performed.

### 2026-09-22 — Sprint 1 acceptance closure and delivery authorization

- **Acceptance:** the product owner confirmed all previously listed Sprint 1 gaps and authorized commit and push: “все підтверджую і коміть та пуш”.
- **Decision:** B-01 through B-07 are accepted; Sprint 1 status is `DONE` / `Verified`. Accepted limitations are the lack of direct timer/listener instrumentation for unmount cleanup, the known external package-lock warning and pre-existing extraneous dependency entries. No S2/S3 scope was started or inferred.
- **Evidence:** `E-SEA-027` plus the preceding implementation, check, review and Node.js 22 records through `E-SEA-026`.
- **Delivery:** prepare one bounded commit containing the approved tracked baseline/documentation changes and the new `DEC-005` record; preserve all pre-existing untracked paths; push only to `origin/sprint1`.

### 2026-09-22 — Sprint 2 planning decomposition and safe-start handoff

- **Task:** `TASK-SEA-R2-PLAN-001`.
- **Input:** staged `SPRINT-02.md` on branch `sprint2`; verified R1 baseline at `01aa336`.
- **Change:** appended a separate R2 planning section to `TASK_SPEC.md`; the completed R1 B-07 contract was not overwritten. The plan names bounded slices for R2 planning, B-08 secure configuration, B-09 reader/endpoint, B-10 sample/provenance, B-11 transformer, B-12 collector, B-13 UI and final acceptance.
- **Checks:** `git diff --check` — `PASS`; structural task-contract validator — `PASS`; tracked secret-env scan — `PASS` with no tracked `.env` or `.env.*.local` files. No product implementation command, live provider request or secret read was run.
- **Evidence:** `E-SEA-028`.
- **Blockers:** current `CLAUDE.md` and `SPEC.md` still mark Sprint 2 as `Waiting for MVP input`; human diff review is pending. The staged `SPRINT-02.md` and pre-existing staged `START.md` changes were not modified.
- **Rollback:** remove only the appended R2 section from `TASK_SPEC.md` after inspecting the diff if rejected; preserve R1 task history, append-only evidence/history, staged sprint input and unrelated untracked paths.
- **Handoff:** do not implement B-08 yet. After `continue` and governance authorization, create `TASK-SEA-R2-B08-001` with secure-configuration-only allowed paths. No commit or push was performed.

### 2026-09-23 — B-08 secure-configuration contract preparation

- **Session:** continuation from `HANDOFF-SEA-R2-PLAN-001`; bounded contract-only preparation for `TASK-SEA-R2-B08-001` / `R2-B08-SECURE-CONFIGURATION`.
- **Goal and scope:** define the next secure-configuration slice before any implementation; limit future changes to `.env.example`, `.gitignore`, separately authorized `.claude/settings.json` permission rules and `server/aisstream-config.ts`. B-09 through B-13 remain excluded.
- **Changed artifacts:** appended the B-08 draft contract to `TASK_SPEC.md`; appended `E-SEA-029` to `EVIDENCE.md`. No `.env.example`, `.gitignore`, `.claude/settings.json`, server, product, test or package path was changed.
- **Commands and status:** `git diff --check` — `PASS`; changed-path inspection — `PASS`; structural task-contract validator — `PASS`; tracked local-secret-path scan — `PASS` with none found; tracked HEAD non-empty `AISSTREAM_API_KEY` assignment scan — `PASS` with none found. No `.env.local` or `.env.*.local` file was created or read.
- **Governance and decisions:** the contract is intentionally `Draft`; current `CLAUDE.md` and `SPEC.md` still mark Sprint 2 `Waiting for MVP input`. The contract does not authorize implementation, live AISStream access, secret use, permission-file changes or B-09.
- **Blockers / Unknowns:** human review of the R2 planning slice and B-08 draft is pending; R2 scope authorization/decision record is pending; accessor behavior, permission refusal, live provider availability and R2 acceptance remain `Unknown`. A local secret-fixture refusal test remains unrun because creating or reading such files is prohibited by the handoff.
- **Rollback / recovery:** if the draft is rejected, remove only the appended B-08 contract from `TASK_SPEC.md` after inspecting the diff; preserve R1 task history, E-SEA-029, prior runbook history, staged `SPRINT-02.md`, pre-existing `START.md` deletion and excluded untracked/generated paths. Do not touch secret files.
- **Evidence:** `E-SEA-029` records the observed contract structure and secret-boundary scan; it does not claim B-08 implementation or runtime behavior.
- **Handoff:** obtain explicit human `continue` and R2 scope authorization. Then implement only the B-08 paths in `TASK-SEA-R2-B08-001`, run targeted checks and human diff review; do not start B-09. No commit or push was performed.

### 2026-09-23 — R2 scope authorization and governance synchronization

- **Session:** authorized continuation from `HANDOFF-SEA-R2-PLAN-001`; governance prelude for `TASK-SEA-R2-B08-001`.
- **Goal and scope:** record the product-owner R2/B-08 authorization and synchronize versioned governance artifacts before B-08 implementation. AISStream registration, real-key access and live provider requests remain deferred.
- **Changed artifacts:** added `docs/decisions/DEC-006-r2-scope.md`; updated `CLAUDE.md`, `SPEC.md`, `docs/decisions/README.md`, `TASK_SPEC.md`; appended `E-SEA-030`. The staged `SPRINT-02.md` and pre-existing staged `START.md` deletion were not modified. No B-08 implementation path was changed in this step.
- **Commands and status:** `git diff --check` — `PASS`; governance structural validator — `PASS`; staged/unstaged path inspection — `PASS`; no secret file was read or created; no dependency, product, server or permission-file implementation change was made.
- **Decision:** user confirmation “Підтверджую scope R2 і дозволяю перейти до B-08” is recorded by `DEC-006-R2-SCOPE`. R2 is authorized but task-gated; B-08 is the only current implementation slice; B-09…B-13 and Sprint 3 remain separately gated.
- **Blockers / Unknowns:** the B-08 permission settings change is still pending explicit configuration permission from the current Claude Code session; accessor behavior, permission refusal, provider availability, key validity and R2 acceptance remain `Unknown`. No AISStream registration is required for B-08.
- **Rollback / recovery:** if governance is rejected, restore only the newly changed governance paths after inspecting the diff; preserve append-only evidence/history, staged inputs, pre-existing deletion and excluded untracked/generated paths. Do not touch local secret files.
- **Evidence:** `E-SEA-030` records the actual authorization and artifact synchronization; it does not claim B-08 implementation or live provider behavior.
- **Handoff:** proceed with B-08 implementation only. The user does not need to register AISStream or provide a key for this slice; any future key must be placed locally and never sent in chat. No commit or push was performed.

### 2026-09-23 — B-08 partial implementation and verification hold

- **Session:** bounded implementation continuation for `TASK-SEA-R2-B08-001` after `DEC-006-R2-SCOPE` authorization.
- **Goal and scope:** implement and check the non-permission B-08 paths only; do not access a real key, contact AISStream or start B-09.
- **Changed artifacts:** added `.env.example` and `server/aisstream-config.ts`; verified `.gitignore` without changing it; appended `E-SEA-031`. `.claude/settings.json` was not created because the current session denied the configuration-skill action required for that permission change. No app, package, test, route, WebSocket, sample or UI path changed.
- **Commands and status:** `git diff --check` — `PASS`; changed-path/source validators — `PASS` for available paths; `git check-ignore --no-index` and tracked-env scan — `PASS`; corrected direct TypeScript check with `--ignoreConfig --types node` — `PASS`; normal `npx tsc --noEmit` — `PASS`; `npm run build` — `PASS` with the known external package-lock warning; `npm ls --depth=0` — completed with pre-existing extraneous packages; Node 22 missing/blank accessor assertions — `PASS`. The initial direct tsc invocation failed with TS5112 and the follow-up without Node types failed with TS2591; both were corrected without changing project files.
- **Observed behavior:** accessor reads only `process.env.AISSTREAM_API_KEY`, trims it and returns `null` for missing/whitespace values. No logging, network access, client import or dependency change was observed. `.env.example` contains only the empty placeholder.
- **Blockers / Unknowns:** project permission rules are absent because the configuration action was denied; permission refusal/allowance checks, final human diff review and B-08 acceptance remain pending. No real AISStream registration or key is needed for B-08.
- **Rollback / recovery:** restore only `.env.example` and `server/aisstream-config.ts` plus governance paths after inspecting the diff if the task is rejected; preserve append-only records, staged `SPRINT-02.md`, `START.md` deletion and all excluded untracked/generated paths. Never touch local secret files.
- **Evidence:** `E-SEA-031`; governance synchronization is `E-SEA-030`.
- **Handoff:** status is `HOLD` until the user explicitly permits the project `.claude/settings.json` deny-rule change in a session where the configuration action is allowed. Then create only that settings file, run the permission matrix and final checks, perform human diff review, and stop before B-09. No commit or push was performed.

### 2026-09-23 — B-08 permission rules completed; review pending

- **Session:** continuation for `TASK-SEA-R2-B08-001` after explicit user authorization for the exact project settings change.
- **Goal and scope:** create only `.claude/settings.json` with the three approved local-secret read deny rules; leave `.claude/settings.local.json` unchanged; verify the refusal matrix without reading secret content.
- **Changed artifacts:** added `.claude/settings.json`; updated `TASK_SPEC.md` acceptance/current status; appended `E-SEA-032` to `EVIDENCE.md`. No app, package, test, route, WebSocket, sample, UI or secret file changed.
- **Commands and status:** `git diff --check` — `PASS`; `.env`, `.env.local` and `.env.test.local` existence checks — `PASS` (all absent); read attempts for those paths — denied by project settings as expected; `.env.example` read allowance — `PASS`; `.claude/settings.local.json` inspection — unchanged.
- **Observed behavior:** the project settings file contains only the three authorized deny rules. The permission matrix blocks the specified secret paths while allowing `.env.example`. No secret content, real AISStream key or live provider request was accessed.
- **Blockers / Unknowns:** final human diff review remains pending; provider availability, real-key validity and R2 user-story acceptance remain `Unknown`. B-09 remains out of scope.
- **Rollback / recovery:** remove only the newly added `.claude/settings.json` after inspecting the diff if the settings change is rejected; preserve `.env.example`, accessor, append-only evidence/history, staged inputs and unrelated paths. Do not touch secret files. Product owner decides recovery acceptance.
- **Evidence:** `E-SEA-032`; prior non-permission checks are recorded in `E-SEA-031`.
- **Handoff:** perform human diff review and choose `continue`, `revise` or `HOLD`; if `continue`, stop before B-09 and do not commit or push without separate authorization.

### 2026-09-23 — B-08 final diff review and commit authorization

- **Session:** final review for `TASK-SEA-R2-B08-001` on branch `sprint2`.
- **Goal and scope:** review the complete B-08/governance boundary, correct review findings, and prepare only the selected paths for the user-authorized commit/push.
- **Review findings and corrections:** the stale current B-08 handoff in `TASK_SPEC.md` was updated; `SPEC.md`, `EVIDENCE.md` and `RUNBOOK.md` metadata dates/versions were aligned with the 2026-09-23 changes. Historical entries were preserved.
- **Commands and status:** `git diff --check` — `PASS`; `npx tsc --noEmit` — `PASS`; `npm run build` — `PASS` with the known external package-lock warning; final path and secret-fixture checks — `PASS`; prior permission matrix and accessor checks — `PASS`.
- **Decision:** final diff review is `PASS`; user explicitly authorized commit and push on `sprint2`. Only B-08/governance paths may be staged; pre-existing staged `SPRINT-02.md`/`START.md` and unrelated untracked paths must remain excluded.
- **Blockers / Unknowns:** R2 runtime acceptance, provider availability, real-key validity and B-09 readiness remain `Unknown` or separately gated.
- **Rollback / recovery:** if commit/push is rejected, preserve the working tree and revert only the selected B-08/governance commit after inspecting its contents; do not reset or delete pre-existing staged/untracked paths or secret files.
- **Evidence:** `E-SEA-033`; prior implementation and permission evidence are `E-SEA-031` and `E-SEA-032`.
- **Handoff:** commit and push only the selected B-08/governance paths, then stop before B-09. No production or live-provider action is authorized.

### 2026-09-23 — B-09 reader and intermediate route local verification

- **Session:** bounded implementation continuation for `TASK-SEA-R2-B09-001` on branch `sprint2` after contract review/continue.
- **Goal and scope:** add only the server-only AISStream reader, intermediate `GET /api/snapshot`, deterministic lifecycle tests and the requested empty local key-file placeholder. Do not add B-10–B-13 behavior, a live request, a real key, dependencies, UI, collector or transformer.
- **Changed artifacts:** updated the appended B-09 section in `TASK_SPEC.md`; added `server/aisstream-reader.ts`, `app/api/snapshot/route.ts` and `tests/snapshot-reader.spec.ts`; created a zero-byte ignored `.env.local` without reading or overwriting its contents. No package manifest, lockfile, Playwright configuration, existing B-07 test or B-08 path changed.
- **Commands and status:** official AISStream documentation fetch — endpoint/subscription requirements confirmed; `git diff --check` — `PASS`; B-09 structural validator — `PASS`; tracked secret-path/assignment scan — `PASS`; ignored zero-byte env-file metadata check — `PASS`; direct server TypeScript check — `PASS`; `npx tsc --noEmit` — `PASS`; `npm run build` — `PASS` with the known external package-lock warning; `npm ls --depth=0` — completed with pre-existing extraneous packages; `npx playwright test tests/snapshot-reader.spec.ts` — `PASS`, 7 tests; sanitized loopback no-key `curl` check — `PASS` against the existing local server.
- **Observed behavior:** fake WebSocket tests confirmed immediate exact subscription, a deadline starting before construction, pre-open `connect_failed`, post-subscription `raw: null` timeout, text raw success, binary/provider error, post-subscription disconnect, cancellation cleanup including a socket-created-during-abort race, and late-event suppression. The no-key route check returned HTTP 502 with the exact fixed Ukrainian message both in the focused test and over loopback. The built route is listed as a dynamic Node.js `/api/snapshot` handler.
- **Decision:** `CONTINUE WITH APPROVAL`; local checks pass, but final human diff review remains required. No commit or push was performed.
- **Blockers / Unknowns:** live provider availability, real-key validity, live connection/message receipt and complete R2 user-story acceptance remain `Unknown`/`Blocked`. Provider error semantics beyond the bounded WebSocket/message boundary are not live-verified.
- **Rollback / recovery:** inspect the complete diff, then remove only the three B-09 implementation files and the appended B-09 task section if rejected; preserve the verified B-08 baseline, append-only records, pre-existing staged/untracked/generated paths and any local secret file. Do not reset the branch or delete `.env.local`.
- **Evidence:** `E-SEA-034`; B-08 evidence remains `E-SEA-033` and earlier entries.
- **Handoff:** perform final human diff review and choose `continue`, `revise` or `HOLD`. If `continue`, a separate authorization is still required before any commit/push; the owner may now add the real key locally to `.env.local` but must never send it in chat or commit it. No live AISStream request has been run.

### 2026-09-23 — B-09 final human diff review

- **Session:** final bounded review for `TASK-SEA-R2-B09-001` on branch `sprint2`.
- **Decision:** user chose `continue`; B-09 local implementation is `DONE`/`Verified` within its approved boundary. This does not claim live provider availability, real-key validity or complete R2 acceptance.
- **Review result:** approved paths remain limited to `TASK_SPEC.md`, `server/aisstream-reader.ts`, `app/api/snapshot/route.ts`, `tests/snapshot-reader.spec.ts`, append-only evidence/history and the ignored zero-byte `.env.local` preflight artifact. No dependency, unrelated product path, B-10–B-13 behavior, secret content, commit or push was introduced.
- **Evidence:** `E-SEA-035` and local implementation checks in `E-SEA-034`.
- **Handoff:** the next action is either a separately authorized live-provider check using the locally stored key or a separately authorized commit/push. Do not paste the key into chat; preserve staged and unrelated untracked paths.

### 2026-09-23 — Sprint 2 decomposition human diff review

- **Session:** documentation-only review of the corrected `SPRINT-02.md` Part C decomposition for `SPRINT-SEA-R2-001`.
- **Goal and scope:** verify that the B-08…B-13 entries are complete and consistent after correcting metadata, R2/R3 verification wording, dependency boundaries and B-10/B-12 acceptance details. No product implementation or live provider access was in scope.
- **Changed artifacts:** `SPRINT-02.md` contains the local documentation corrections; `EVIDENCE.md` received `E-SEA-036`; no product source, test, dependency, secret or live-provider path changed. `SPRINT-02.md` remains untracked.
- **Commands and status:** decomposition metadata/entry/field validator — `PASS`; dependency/provenance/reason-value checks — `PASS`; trailing-whitespace check — `PASS`; `git status --short --branch` — expected pre-existing and local untracked paths only.
- **Review result:** all six bounded entries now have Goal, Non-goals, Check, Evidence, Acceptance, Dependency boundary, Handoff and Status. The R2 focused deterministic B-12 checks are explicitly separated from the R3 release-level test-suite boundary. B-10 sample fields and provenance classes are explicit.
- **Decision:** `CONTINUE WITH APPROVAL` for the next documentation/task-contract slice. This does not authorize B-10 implementation, live AISStream access, commit or push.
- **Blockers / Unknowns:** B-10…B-13 remain gated and unimplemented; live provider availability, real-key validity, full R2 acceptance and release readiness remain `Unknown`/`Needs verification`.
- **Rollback / recovery:** if the documentation review is rejected, inspect the file and restore only the local `SPRINT-02.md` documentation changes; preserve append-only evidence/history, product code, staged paths and unrelated untracked/generated paths.
- **Evidence:** `E-SEA-036`.
- **Handoff:** next bounded action is to prepare and review the separate B-10 sample/provenance task contract. Do not start B-10 implementation until that contract and its human review are complete; do not commit or push without separate authorization.

### 2026-09-23 — B-10 sample/provenance task contract prepared

- **Session:** contract-only preparation of `TASK-SEA-R2-B10-001` / `R2-B10-SAMPLE-PROVENANCE` after `E-SEA-036`.
- **Goal and scope:** define the sample artifact, allowed sources, provenance, verification, security and lifecycle gates before B-10 implementation; update the next-session handoff. No sample or product behavior was created.
- **Changed artifacts:** appended B-10 contract to `TASK_SPEC.md`; updated `NEXT_SESSION.md` with restart prompt and current state; appended `E-SEA-037` to `EVIDENCE.md`. `SPRINT-02.md` remains untracked and unchanged in this slice. No product code, `data/samples/` output, test, dependency or secret path was changed/read.
- **Commands and status:** `git status --short --branch` and `git log -3 --oneline --decorate` — inspected; contract structural validator — `PASS` after correcting an initial validator format/window mismatch; B-10 sample output absence checks — `PASS`; `git diff --check -- TASK_SPEC.md NEXT_SESSION.md EVIDENCE.md RUNBOOK.md` — `PASS` before append-only review records were appended.
- **Contract boundary:** B-10 defaults to documentation-derived or synthetic data with explicit provenance. Live AISStream access and real-key use require separate explicit authorization; sample retention terms remain `Unknown` until established.
- **Decision:** `CONTINUE WITH APPROVAL` for human review of the B-10 task contract. This does not authorize implementation, live capture, commit or push.
- **Blockers / Unknowns:** sample source/retention permission, provider availability, real-key validity, live receipt and complete R2 acceptance remain `Unknown`/`Needs verification`.
- **Rollback / recovery:** inspect the diff; if rejected, amend/remove only the appended B-10 task section and related current handoff references, preserving append-only history, B-08/B-09 records and all pre-existing staged/untracked/generated paths. No branch reset or secret-file operation.
- **Evidence:** `E-SEA-037`; preceding decomposition review `E-SEA-036`.
- **Handoff:** next session must human-review `TASK-SEA-R2-B10-001` against `SPRINT-02.md`, SPEC and DEC-006; record `continue`, `revise` or `HOLD`. Do not create sample files or start B-11 until separately authorized. No commit/push or live request was performed.

### 2026-09-23 — B-10 synthetic sample implementation and checks

- **Session:** bounded B-10 implementation for `TASK-SEA-R2-B10-001` after contract review recommendation and explicit user authorization for a documentation-derived or synthetic sample.
- **Goal and scope:** create one synthetic PositionReport fixture and its provenance for future B-11 transformer work. No live provider request, secret read, product code, test, dependency or endpoint change.
- **Changed artifacts:** added `data/samples/position-report.sample.json` and `data/samples/PROVENANCE.md`; updated B-10 status, verified criteria and current handoff in `TASK_SPEC.md`; appended `E-SEA-038` to `EVIDENCE.md`. Other existing staged/untracked paths were not changed.
- **Sample:** one synthetic `MetaData` / `Message.PositionReport` envelope, with all required fields/casing and matching coordinates within intended Dover bounds. `PROVENANCE.md` labels the data synthetic, describes the contract source and region context, distinguishes the UTC artifact creation date from synthetic `time_utc`, and states what the fixture does not prove.
- **Commands and status:** Node JSON/schema/provenance assertion — `PASS`; targeted credential-like scan of the two B-10 output files — `PASS` (no matches); Python trailing-whitespace check — `PASS`; `git diff --check` — `PASS`; `git status --short --branch`, `git diff --name-only`, and `find data/samples -maxdepth 1 -type f -print | sort` — inspected; only the two authorized sample outputs exist under `data/samples/`.
- **Decision:** `CONTINUE WITH APPROVAL`; implementation checks pass, but final human diff review remains pending. No commit or push was performed.
- **Blockers / Unknowns:** live provider availability, real-key validity, live message receipt, sample retention terms, complete R2 acceptance and release readiness remain `Unknown`/`Needs verification`.
- **Rollback / recovery:** after inspecting the diff, remove only the two B-10 sample files and restore the B-10 task status if rejected; preserve append-only evidence/history, pre-existing staged/untracked/generated paths and all secret files. Do not reset the branch.
- **Evidence:** `E-SEA-038`.
- **Handoff:** perform human diff review of the B-10 sample, provenance, task status and append-only records. B-11, live AISStream access, commit and push each remain separately gated.

### 2026-09-23 — B-10 final diff review

- **Session:** final human review of `TASK-SEA-R2-B10-001` after the synthetic sample checks in `E-SEA-038`.
- **Review scope:** inspected both B-10 sample outputs, their provenance, the B-10 task acceptance/status and current handoff, the implementation evidence, and the final Git path boundary.
- **Observed:** the fixture and provenance are consistent with the approved synthetic-data contract; only the two approved sample files are present under `data/samples/`. Targeted JSON/schema/provenance and credential-like checks, whitespace checks and `git diff --check` passed. Pre-existing staged/untracked paths and `START.md` deletion were preserved; no staged paths are present.
- **Decision:** user chose `continue` for B-10 review. B-10 is `Verified` within its bounded sample/provenance scope; no B-11 or live access authorization is inferred.
- **Blockers / Unknowns:** live AISStream availability, key validity, live receipt, retention terms, full R2 acceptance and release readiness remain `Unknown`/`Needs verification`.
- **Recovery:** if the B-10 review is later rejected, inspect the diff and remove only the two B-10 sample files / restore the task status; preserve append-only evidence/history and unrelated paths.
- **Evidence:** `E-SEA-039` (review); `E-SEA-038` (implementation checks).
- **Handoff:** stop after B-10. B-11 requires its own bounded task contract and explicit authorization. No live request, commit or push was performed.

### 2026-09-23 — B-10 remote delivery verification

- **Session:** post-push delivery verification for `TASK-SEA-R2-B10-001` on branch `sprint2`.
- **Goal and scope:** verify the user-authorized B-10 commit is synchronized to the remote and record the actual delivery state; no new product/sample changes, live request or secret access.
- **Delivery:** commit `72f8b94` (`feat(r2): add B-10 PositionReport sample`) is at local `HEAD` and `origin/sprint2`; `git ls-remote origin refs/heads/sprint2` returned `72f8b94eb9c88a92d84281be88d7629e458ed0e8`.
- **Commit boundary:** exactly `EVIDENCE.md`, `RUNBOOK.md`, `TASK_SPEC.md`, `data/samples/PROVENANCE.md` and `data/samples/position-report.sample.json`. `START.md` deletion and unrelated untracked inputs remain excluded.
- **Commands and status:** `git ls-remote origin refs/heads/sprint2`, `git status --short --branch`, `git log -1 --oneline --decorate` and `git show --format=fuller --stat --oneline HEAD` — `PASS` for the observed remote hash, local/remote refs, commit summary and preserved excluded paths.
- **Evidence:** `E-SEA-040` records the remote delivery check; `E-SEA-038` and `E-SEA-039` record the sample checks and human review.
- **Limitations / blockers:** no live AISStream request, real-key access, sample retention ruling, R2 acceptance or release readiness is established. B-11 remains separately gated.
- **Rollback / recovery:** inspect `git show 72f8b94`; if the delivered B-10 slice is rejected, product owner decides recovery. Do not reset the shared branch or alter excluded pre-existing paths.
- **Handoff:** B-10 is committed and pushed. Stop here; B-11 requires its own bounded task contract and explicit authorization.

### 2026-09-23 — B-11 PositionReport transformer contract

- **Session:** bounded contract preparation for `TASK-SEA-R2-B11-001` after verified B-10 delivery at `755c021`.
- **Goal and scope:** define a future pure PositionReport-to-`Vessel` transformer and focused deterministic checks; do not implement product or test code, access secrets, contact AISStream, or begin B-12.
- **Changed artifacts:** appended the B-11 contract to `TASK_SPEC.md`; appended `E-SEA-041` to `EVIDENCE.md`; appended this factual handoff. Updated EVIDENCE/RUNBOOK metadata versions to `0.11.0`. No transformer, test, sample, route, package, dependency, or pre-existing unrelated path changed.
- **Contract boundary:** status is `Draft`; future implementation paths are `server/position-report-transformer.ts` and `tests/position-report-transformer.spec.ts`. Input mapping, validation ranges/sentinels, null/zero handling, timestamp precision, immutability, exclusions, acceptance, stop conditions, rollback, and separate approval gates are recorded in `TASK_SPEC.md`.
- **Commands and status:** focused structural/content validator — initially `FAIL` on its own exact-string expectations, then `PASS` after correcting the validator to the actual equivalent contract wording; `git diff --check -- TASK_SPEC.md` — `PASS`; Git status/log/remote inspection — `PASS` for the observed baseline and preserved unrelated paths.
- **Evidence:** `E-SEA-041` records contract structure and formatting only; B-10 sample checks/review/delivery remain `E-SEA-038` through `E-SEA-040`.
- **Blockers / Unknowns:** no transformer behavior, test result, live observation, provider availability, real-key validity, full R2 acceptance, or release readiness is established. Human B-11 contract review and explicit implementation authorization remain pending.
- **Rollback / recovery:** if the contract is rejected before implementation, inspect the diff and remove only the appended B-11 section; preserve append-only history and all pre-existing unrelated paths. Do not reset the branch or alter secret files.
- **Handoff:** request human review of `TASK-SEA-R2-B11-001` and a `continue`, `revise`, or `HOLD` decision. Do not implement B-11, begin B-12, use live AISStream access, or commit/push without separate explicit authorization.

### 2026-09-23 — B-11 contract clarification and remote delivery

- **Session:** review and delivery of the clarified `TASK-SEA-R2-B11-001` v1.1.0 contract on branch `sprint2`.
- **Goal and scope:** resolve MMSI and timestamp ambiguities in the draft; verify the documentation diff; commit and push only if the result is ready. No transformer/test implementation, live AISStream access or secret access.
- **Changed artifacts:** revised the appended B-11 contract in `TASK_SPEC.md`; appended `E-SEA-042` to `EVIDENCE.md`; appended this handoff. Evidence and runbook metadata are now v0.12.0. The pre-existing `START.md` deletion and unrelated untracked paths are excluded.
- **Clarifications:** MMSI accepts a non-negative safe-integer JSON number or trimmed ASCII digit-only string; numeric values become canonical decimal text, while digit strings preserve leading zeros. No nine-digit/range restriction was added. Timestamp accepts only `YYYY-MM-DD HH:mm:ss[.fraction] +0000 UTC`; calendar/clock values are strict, fractions are padded or truncated to milliseconds without rounding, and conflicting offsets/timezone labels are rejected.
- **Commands and status:** focused structural/content validator — `PASS`; final `git diff --check -- TASK_SPEC.md EVIDENCE.md RUNBOOK.md` and staged patch check — `PASS`; complete selected-file diff review — `PASS` for scope and contract boundary; `git push origin sprint2` — `PASS`; `git ls-remote origin refs/heads/sprint2` — `PASS`, remote at `863a57d7eb552c3e600438bfa3a6af50567813af`.
- **Delivery:** commit `863a57d` (`docs(r2): clarify B-11 transformer contract`) contains exactly `EVIDENCE.md`, `RUNBOOK.md` and `TASK_SPEC.md`; push completed `755c021..863a57d sprint2 -> sprint2`. The pre-existing `START.md` deletion and unrelated untracked paths remain outside the commit.
- **Decision and authorization:** the user requested “if everything is ready, commit and push”; review found no documentation-scope blocker. This authorizes delivery of the reviewed contract/documentation slice only; B-11 implementation remains unauthorized.
- **Blockers / Unknowns:** transformer behavior, tests, live provider availability, real-key validity, complete R2 acceptance and release readiness remain unverified. Contract status remains `Draft`; B-12 remains gated.
- **Rollback / recovery:** inspect the delivery commit and revert only the selected B-11 documentation changes if rejected; preserve append-only history, the pre-existing `START.md` deletion and all unrelated untracked paths. Do not reset the shared branch or alter secret files.
- **Evidence:** `E-SEA-041` records original contract preparation; `E-SEA-042` records the clarification checks and delivery verification.
- **Handoff:** after verifying remote synchronization, stop. Human contract approval and separate explicit implementation authorization are still required before B-11 implementation; do not start B-12 or use live AISStream access.

### 2026-09-24 — B-11 transformer implementation and local checks

- **Session:** authorized implementation of `TASK-SEA-R2-B11-001` v1.1.0 on branch `sprint2`, after human contract decision `continue` and separate explicit implementation authorization.
- **Goal and scope:** implement the pure decoded PositionReport-to-`Vessel` mapping and deterministic focused checks only. No live provider request, endpoint/collector/UI wiring, dependency change, secret inspection, commit, push or B-12 work.
- **Changed artifacts:** updated the B-11 status/current handoff and appended the human approval record in `TASK_SPEC.md`; added `server/position-report-transformer.ts` and `tests/position-report-transformer.spec.ts`; appended `E-SEA-043` to `EVIDENCE.md` and this record. Pre-existing `START.md` deletion and unrelated untracked inputs remain excluded.
- **Implementation summary:** validates unknown decoded envelopes; normalizes approved MMSI and strict UTC timestamp forms; maps only nested report coordinates and `Sog`/`Cog`; returns `null` for invalid required data and optional motion values; ignores `TrueHeading` and unknown optional fields; does not mutate input.
- **Commands and status:** `npx playwright test tests/position-report-transformer.spec.ts` — `PASS`, 9 tests; `npx tsc --noEmit --strict --target ES2017 --module esnext --moduleResolution bundler --skipLibCheck --resolveJsonModule --esModuleInterop server/position-report-transformer.ts tests/position-report-transformer.spec.ts` — first invocation failed with `TS5112` because TypeScript 6 detected `tsconfig.json` while file paths were supplied; corrected `npx tsc --ignoreConfig --noEmit --strict --target ES2017 --module esnext --moduleResolution bundler --skipLibCheck --resolveJsonModule --esModuleInterop server/position-report-transformer.ts tests/position-report-transformer.spec.ts` — `PASS`; `npx tsc --noEmit` — `PASS`; `npm run build` — `PASS`; `git diff --check` — `PASS`; Python trailing-whitespace check on both new files — `PASS`. Next.js build output noted an ignored parent package-lock and `.env.local` as an environment source; no environment values were printed or manually inspected.
- **Manual comparison:** against the synthetic fixture, checked MMSI `999000001` → ID `"999000001"`, report coordinates `51.0/1.45` → `51/1.45`, timestamp `2026-09-23 15:00:00.000000000 +0000 UTC` → `2026-09-23T15:00:00.000Z`, `Sog 12.4` → `speedKnots 12.4`, and `Cog 123.4` → `courseDeg 123.4`.
- **Decision:** `CONTINUE WITH APPROVAL`; focused local checks passed, but human review of the complete implementation and documentation diff remains pending. B-11 is not declared `DONE`.
- **Blockers / Unknowns:** provider availability, real-key validity, live receipt, provider semantics beyond the approved contract, complete R2 acceptance and release readiness remain `Unknown`/`Needs verification`. The build automatically reported `.env.local` as loaded; its contents were not viewed or printed. The sample remains synthetic.
- **Rollback / recovery:** if the B-11 diff is rejected, inspect it and restore only `server/position-report-transformer.ts` and `tests/position-report-transformer.spec.ts` to the verified B-10 baseline; revise the B-11 task status/handoff accordingly. Preserve append-only history, `START.md` deletion, unrelated untracked/generated paths and secret files. Do not reset the branch.
- **Evidence:** `E-SEA-043`; contract clarification/delivery remains `E-SEA-042`.
- **Handoff:** review the changed-path list and full B-11 diff; choose `continue`, `revise` or `HOLD`. Do not start B-12, inspect secret files, make live requests, commit or push without separate authorization.

### 2026-09-24 — B-11 final diff review

- **Session:** final bounded review of `TASK-SEA-R2-B11-001` after the user requested “review B-11 diff and continue”.
- **Review scope:** read the transformer, focused Playwright spec and current B-11 task/evidence/handoff records; checked final Git status and tracked diff paths. Existing `START.md` deletion and pre-existing untracked paths were preserved.
- **Observed:** no functional or scope findings. The transformer follows the contract for MMSI, strict UTC timestamp/calendar validation, report-coordinate authority and bounds, optional Sog/Cog behavior, null handling, purity, and output shape. The tests cover the core mapping and invalid boundaries; recorded checks and sample comparisons remain `E-SEA-043`. No code changes were made during review.
- **Decision:** `DONE` for the bounded B-11 local task after the user directed continuation; final review is recorded as `E-SEA-044`. Live provider behavior and broader product acceptance are not claimed.
- **Unknowns:** live provider availability/receipt, real-key validity, provider semantics beyond the contract, full R2 acceptance and release readiness remain `Unknown`/`Needs verification`.
- **Recovery:** if the review decision is revised, inspect and restore only the B-11 implementation/test paths to the verified B-10 baseline; preserve append-only evidence/history and all unrelated paths. No commit or push was made.
- **Handoff:** B-11 local scope is verified. B-12 is not authorized by this decision and requires its own task contract, review and explicit implementation authorization.

### 2026-09-24 — B-11 commit and push verification

- **Session:** user-authorized commit and push of the reviewed B-11 implementation on `sprint2`.
- **Commit:** `9f1dc6a3d593165f77f6d55dd8fbffa8ccad8abd` — `feat(r2): implement B-11 PositionReport transformer`.
- **Commit boundary:** exactly `EVIDENCE.md`, `RUNBOOK.md`, `TASK_SPEC.md`, `server/position-report-transformer.ts` and `tests/position-report-transformer.spec.ts`; no unrelated path was staged.
- **Commands and status:** `git diff --cached --check` — `PASS`; `git commit` — `PASS`; `git push origin sprint2` — `PASS`; `git show --format=fuller --stat --oneline HEAD` — `PASS` for five-path scope; `git status --short --branch` and `git log -1 --oneline --decorate` — `PASS`; `git ls-remote origin refs/heads/sprint2` — `PASS`, remote hash matches local HEAD.
- **Observed working tree:** `START.md` remains a pre-existing deletion; `.agents/`, `.claude/skills/`, `NEXT_SESSION.md`, `README.pdf`, `SPRINT-02.md`, `reference/` and `skills-lock.json` remain untracked and unstaged.
- **Evidence:** `E-SEA-045` records commit boundary and remote synchronization; `E-SEA-043` and `E-SEA-044` record implementation checks and final review.
- **Handoff:** B-11 is committed and pushed. B-12 remains task-gated and was not started.

### 2026-09-24 — B-12 snapshot collector verification and review handoff

- **Session:** completion of the separately authorized local implementation for `TASK-SEA-R2-B12-001` on branch `sprint2`, followed by the user's final diff-review decision.
- **Goal and scope:** finish the bounded B-12 reader/collector/route slice, record actual local checks, and close the human review gate. No live AISStream request, real-key inspection, dependency change, B-13 work, commit or push.
- **Changed artifacts:** implementation/test changes are limited to `server/aisstream-reader.ts`, `server/snapshot-collector.ts`, `app/api/snapshot/route.ts`, `tests/snapshot-reader.spec.ts` and `tests/snapshot-collector.spec.ts`. Updated B-12 acceptance/handoff in `TASK_SPEC.md`; appended `E-SEA-046` and `E-SEA-047` to `EVIDENCE.md`; appended this delivery record. The pre-existing `START.md` deletion and unrelated untracked paths remain outside B-12.
- **Implementation summary:** the existing reader now streams ordered text events from one connection; the collector owns the one 15-second window, applies the existing B-11 transformer, deduplicates whole vessels by id/timestamp, stops at 100 unique vessels, discards partial data on failures, and cleans up on terminal events. The route returns the agreed success shape or fixed 502 errors and preserves abort behavior.
- **Commands and status:** `npx playwright test tests/snapshot-reader.spec.ts tests/snapshot-collector.spec.ts` — `PASS`, 17 tests; `npx tsc --noEmit` — `PASS`; `AISSTREAM_API_KEY= npm run build` — `PASS`; `git diff --check` and separate no-index whitespace checks for the two new files — `PASS`. IDE diagnostics requests timed out; standalone TypeScript validation passed. The build reported `.env.local` as an environment source and warned that `/Users/romanmakarenko/package-lock.json` is outside the repository, suggesting `turbopack.root`; it completed successfully. No environment value was manually inspected or printed and no live request was made.
- **Human review and decision:** the user stated “diff перевірив, continue”. The B-12 human diff-review gate is closed with decision `continue`; this does not authorize commit/push or live access.
- **Open Unknowns:** live provider availability, real-key validity, live receipt, actual AISStream event semantics, complete R2 user-story acceptance and release readiness remain `Unknown`/`Needs verification`. IDE diagnostics did not return before timeout.
- **Rollback / recovery:** no rollback was performed. If the decision is later revised, inspect the diff and restore only the five B-12 implementation/test paths to their verified pre-B-12 state; preserve append-only evidence/history, the pre-existing `START.md` deletion and all unrelated untracked paths. Do not reset the branch or touch secret files. Product owner decides recovery acceptance from the diff and evidence.
- **Evidence:** `E-SEA-046` records implementation checks and limitations; `E-SEA-047` records the user's review decision.
- **Handoff:** B-12 is `Verified` within its bounded local task scope. Stop here; B-13, live AISStream access, real-key use, commit and push each remain separately gated.

### 2026-09-24 — B-12 commit and remote delivery verification

- **Session:** user-authorized delivery of the reviewed B-12 slice, including the explicit request to add `SPRINT-02.md` to Git.
- **Goal and scope:** commit and push the five B-12 implementation/test paths and associated task/evidence/runbook records, plus the unchanged Sprint 2 plan. Do not alter unrelated staged/untracked paths or modify `SPRINT-02.md` contents.
- **Authorization and boundary:** the user requested commit/push and explicitly named the existing `SPRINT-02.md` for Git tracking. Its contents were read after the request and committed as-is; only its tracking status changed. No other excluded path was authorized for staging.
- **Commit:** `3de88ab2d4099a80abb45f010ec9069ed0ad3c70` — `feat(r2): implement B-12 snapshot collector`.
- **Commit boundary:** exactly `EVIDENCE.md`, `RUNBOOK.md`, `SPRINT-02.md`, `TASK_SPEC.md`, `app/api/snapshot/route.ts`, `server/aisstream-reader.ts`, `server/snapshot-collector.ts`, `tests/snapshot-collector.spec.ts` and `tests/snapshot-reader.spec.ts`.
- **Commands and status:** `git diff --check` — `PASS`; staged path inspection and `git diff --cached --check` — `PASS`; `git commit` — `PASS`; `git push origin sprint2` — `PASS`, `bf7cc4e..3de88ab sprint2 -> sprint2`; `git show --format=fuller --stat --oneline HEAD` and `git diff HEAD^ HEAD --name-only` — `PASS` for the nine-path boundary; `git ls-remote origin refs/heads/sprint2` — `PASS`, returned `3de88ab2d4099a80abb45f010ec9069ed0ad3c70`; local `HEAD` and `origin/sprint2` both point to `3de88ab`.
- **Observed working tree:** `START.md` remains a pre-existing deletion; `.agents/`, `.claude/skills/`, `NEXT_SESSION.md`, `README.pdf`, `reference/` and `skills-lock.json` remain untracked and excluded. No staged paths remained after delivery verification.
- **Evidence:** `E-SEA-048` records the commit boundary and remote synchronization; `E-SEA-046` and `E-SEA-047` record B-12 local checks and human review.
- **Limitations / blockers:** the delivery does not establish live AISStream receipt, real-key validity, complete R2 acceptance or release readiness. No live request, deployment, B-13 implementation, secret use or cleanup of unrelated paths occurred.
- **Rollback / recovery:** do not reset the shared branch. If recovery is requested, inspect the commit and revert only the reviewed B-12 delivery; preserve the now-tracked `SPRINT-02.md`, append-only history, pre-existing `START.md` deletion and unrelated untracked paths. Product owner decides recovery acceptance.
- **Handoff:** B-12 delivery and the user's request to track `SPRINT-02.md` are complete. Stop; any further implementation, live access or delivery requires its own authorization.

### 2026-09-24 — next-session handoff prepared after B-12 delivery

- **Session:** documentation-only restart preparation following the verified B-12 delivery on `sprint2`.
- **Goal and scope:** replace the obsolete B-12 contract-preparation prompt with a current handoff; clarify that the next bounded action is preparation of a B-13 task contract for human review only. No B-13 implementation or governance synchronization was performed.
- **Changed artifacts:** updated `TASK_SPEC.md` with the handoff task and B-12 delivery closure; refreshed the current portion of untracked `NEXT_SESSION.md` while retaining the historical R1 archive; appended `E-SEA-049` and this runbook record. `SPRINT-02.md`, `CLAUDE.md`, `SPEC.md`, decision records, source, tests and secret files were not changed or read for secret content.
- **Baseline and checks:** local `HEAD`, `origin/sprint2`, and remote `refs/heads/sprint2` were verified at `fef4a8fc51c9c0e41a8158e4e541af574f895741`. `git diff --check -- TASK_SPEC.md` — `PASS`; focused Python structure/content check for current handoff and preserved R1 archive — `PASS` after correcting a validator expectation; changed tracked path review showed only `TASK_SPEC.md` at that checkpoint. No build, product test, server, live request or secret access was performed.
- **Working tree boundary:** preserve pre-existing `START.md` deletion and untracked `.agents/`, `.claude/skills/`, `NEXT_SESSION.md`, `README.pdf`, `reference/`, and `skills-lock.json`. Handoff documentation changes remain local/uncommitted and were not staged.
- **Open governance issue:** `CLAUDE.md` and `SPEC.md` still identify B-08 as current, while Sprint/decision/index records contain historical wording predating the delivered B-12 state. These were not silently changed; synchronize them only under a separately bounded governance decision.
- **Evidence:** `E-SEA-049`; B-12 implementation/review/delivery evidence remains `E-SEA-046` through `E-SEA-048`.
- **Rollback / recovery:** inspect the documentation diff; if the handoff is rejected, restore only this task's edits to `TASK_SPEC.md` and `NEXT_SESSION.md` and preserve append-only evidence/history, `START.md` deletion, and all unrelated untracked paths. Do not reset the shared branch or stage/push this handoff without separate authorization.
- **Handoff:** next session verifies the baseline and local documentation diff, then prepares `TASK-SEA-R2-B13-001` for human review only. Stop after presenting the contract; implementation requires human `continue` and separate explicit authorization. Live AISStream access, real-key use, full R2 acceptance and release readiness remain unverified.

### 2026-09-24 — B-13 snapshot interface checks and code delivery

- **Session:** bounded B-13 v1.0.0 interface implementation, local verification, and delivery-record closeout.
- **Goal and scope:** connect the map UI to the existing same-origin snapshot endpoint under the approved B-13 contract. The delivered implementation commit contains exactly `app/globals.css`, `app/map-shell.tsx`, `app/sea-map.tsx`, and `tests/snapshot-interface.spec.ts`; no API/server/model/card/config/dependency or unrelated path was included.
- **Authorization and boundary:** the user accepted the B-13 contract and separately authorized its implementation; the user later requested commit/push. No live AISStream access, real-key use, deployment, or overall R2 acceptance was authorized or performed. The separate request to retain demo vessels until the first real snapshot was not implemented; it requires its own contract change and authorization.
- **Commit and remote:** `17006c615f7a93e84c7c554c624b8909691828fb` — `feat(r2): deliver B-13 snapshot interface`. `git diff HEAD^ HEAD --name-only` returned exactly the four paths above. Local `HEAD`, `origin/sprint2`, and remote `refs/heads/sprint2` were verified at this hash.
- **Commands and status:** `npx playwright test tests/vessel-selection.spec.ts tests/snapshot-interface.spec.ts` — `PASS`, 16 tests; `npx tsc --noEmit` — `PASS`; `npm run build` — `PASS` (Next.js warned that the parent-directory `package-lock.json` is outside the Git repository and was ignored). `git diff --check -- TASK_SPEC.md EVIDENCE.md` and focused TASK_SPEC/EVIDENCE assertions — `PASS`.
- **Changed documentation:** B-13 verification and delivery facts appended to `EVIDENCE.md` as `E-SEA-051`; B-13 current status, observed checks, code commit boundary and handoff updated in `TASK_SPEC.md`; this runbook entry added. `SPRINT-02.md`, `CLAUDE.md`, `SPEC.md`, decision records, source/tests beyond the existing delivered commit, and secret files were not changed for this documentation slice.
- **Working-tree boundary:** `START.md` remains deleted; `.agents/`, `.claude/skills/`, `NEXT_SESSION.md`, `README.pdf`, `reference/`, and `skills-lock.json` remain untracked and excluded. Only `TASK_SPEC.md`, `EVIDENCE.md`, and `RUNBOOK.md` are intended for the documentation closeout; no unrelated path is authorized for staging.
- **Open review / delivery checkpoint:** automated results and existing code-commit synchronization are verified. A separate human review of the exact current diff is still required before marking B-13 `DONE` or delivering this documentation closeout. Commit/push of these records has been explicitly requested; after the human `continue`, record its actual result without changing unrelated paths.
- **Evidence:** `E-SEA-051` records the B-13 automated checks and code-commit synchronization.
- **Limitations / blockers:** no live AISStream request or real-key inspection/use occurred. Provider availability/receipt, real-key validity, full R2 acceptance, final human implementation-diff acceptance and release readiness remain `Unknown`/unverified.
- **Rollback / recovery:** no rollback was performed. If the documentation diff is revised, edit only `TASK_SPEC.md`, `EVIDENCE.md`, and `RUNBOOK.md`; do not reset the branch or alter `START.md`/untracked paths. Recovery of B-13 code, if later requested, is limited to reverting its reviewed four-path commit with product-owner acceptance.
- **Handoff:** review the exact documentation diff and choose `continue`, `revise`, or `HOLD`. Keep any newer demo-retention behavior separately contract-gated.

### Human review — handoff diff

- **Decision:** on 2026-09-24 the user confirmed `diff перевірив` and chose `continue` for the documentation-only handoff diff.
- **Boundary:** this decision accepts the handoff checkpoint only; no commit/push or B-13 implementation authorization follows from it. No further product checks, live provider request, or secret access were performed.
- **Evidence:** `E-SEA-050`.

### 2026-09-24 — one bounded live AISStream attempt

- **Session / task:** `TASK-SEA-R2-B09B10-LIVE-001`; one user-authorized live attempt to verify receipt and, only if suitable data arrived, save one sanitized sample.
- **Boundary:** used only the existing server-side `getAISStreamApiKey()` accessor, `startAISStreamReader()` and the B-11 transformer. The attempt had one 15-second deadline and no retry. The key value and `.env.local` contents were not printed or manually inspected; no raw provider payload or error detail was saved. No repository harness, route, test, dependency, or UI behavior was added.
- **Commands and status:** one preliminary Node harness evaluation — `FAIL` at JavaScript parse time before reader startup/network activity; corrected harness invocation — `FAIL`, fixed reader result `provider_error`, exit 1; path check (`git check-ignore`, `git ls-files`, live-target absence) — `PASS`; `git diff --check` — `PASS`. Node.js `v22.23.2`.
- **Observed result:** the single live invocation received no suitable PositionReport. No sample/provenance files were created and no retry was performed. The existing synthetic B-10 sample/provenance remain unchanged. `.env.local` is ignored and untracked; its contents were not inspected.
- **Evidence:** `E-SEA-052` records the exact bounded outcome. `E-SEA-031`–`E-SEA-033` remain the existing B-08 configuration-boundary evidence; `E-SEA-026` and `E-SEA-051` remain local/mock demo evidence, not live UI/API end-to-end proof.
- **Checkpoint / status:** checkpoint 03 is recorded separately as `HOLD`, not passed. Live receipt and live sample/provenance criteria are unmet; the fixed `provider_error` does not establish its underlying cause. The task's one-attempt authorization is exhausted.
- **Open Unknowns:** provider availability, real-key validity, cause of the fixed reader error, live receipt, and full R2 acceptance remain unverified. No commit, push, deployment or further live request occurred.
- **Recovery / next action:** preserve all existing deleted/untracked paths. Do not retry under this task. Any further live investigation requires a new bounded contract and explicit authorization; first review the evidence, runbook and checkpoint diff.

### 2026-09-24 — additional live AISStream attempt under LIVE-002

- **Task / authorization:** `TASK-SEA-R2-B09B10-LIVE-002`; the user reviewed the bounded contract and selected `continue`. Exactly one additional attempt was authorized; no retries.
- **User-reported context:** the user reported that the configured key worked in Postman. This was not independently verified; no Postman session or key value was inspected.
- **Preflight:** Node.js v22.23.2 imports of the existing accessor, reader and transformer — `PASS`; `.env.local` ignored and untracked — `PASS` without reading its contents; both live sample paths absent — `PASS`; initial `git diff --check` — `PASS`.
- **Live attempt:** used the existing accessor/reader from a temporary in-memory harness with one connection and a 15-second total deadline. Output was `SUBSCRIBED=yes` followed by `RESULT=reader_error_provider_error` (exit 1). This records that the local reader sent its subscription, not that the provider acknowledged it. No suitable PositionReport was received; raw payload, provider error text and key were not exposed. No sample/provenance was written; no retry occurred.
- **Post-attempt checks:** both live sample paths remained absent; `git diff --check` — `PASS`. No source, route, test, dependency, or UI path changed.
- **Evidence:** `E-SEA-053` records the observed outcome; `E-SEA-052` records the initial attempt. B-08 configuration and local/mock demo evidence remain separate and do not resolve the live reader failure.
- **Checkpoint / status:** new `CHECKPOINT-04.md` records the second fixed `provider_error` outcome and keeps Sprint checkpoint 03 at `HOLD`, not passed. The underlying cause remains unknown. The one additional attempt is exhausted.
- **Limitations / next action:** provider availability, key validity, provider acknowledgment, live message receipt, live sample/provenance and full R2 acceptance remain unverified. No further live request, troubleshooting, commit, push or deployment is authorized. Review the E-053/RUNBOOK/checkpoint diff; any future attempt needs a new bounded contract and explicit authorization.

### 2026-09-24 — LIVE-003 stopped at key preflight

- **Task / authorization:** `TASK-SEA-R2-B09B10-LIVE-003`; the user instructed to proceed after receiving the bounded diagnostic summary. Exactly one attempt was authorized subject to its stop conditions.
- **Preflight:** `.env.local` ignore/tracking checks passed; both live sample targets were absent. Node.js v22.23.2 imported the existing accessor without loading env files; it returned no configured key in the inherited process (`KEY_CONFIGURED=no`, guarded exit 4).
- **Stop:** no reader invocation, socket, provider request, sample, evidence/checkpoint artifact or retry occurred. No key value or `.env.local` content was read, loaded or displayed. The one live-attempt allowance remains unused.
- **Status / next action:** `BLOCKED` before provider access; the current contract prohibits loading local env files, so the key in `.env.local` was unavailable to this direct Node process. Any future attempt requires a reviewed contract revision explicitly allowing safe in-memory environment loading, then a separate bounded reader invocation. Checkpoint 03 remains `HOLD`.

### 2026-09-24 — LIVE-003 bounded reader attempt

- **Authorization amendment:** the user stated “дозволяю програмі читати ключ”. `TASK_SPEC.md` records this as permission to use the installed Next.js `@next/env` loader in memory and then obtain the AISStream key only through the existing accessor, for LIVE-003's already-authorized unused attempt. No app server was started.
- **Preflight:** the first ESM named import of CommonJS `@next/env` failed before loading the environment; no key was loaded and no network call occurred. The corrected `require` path succeeded; output was `KEY_CONFIGURED=yes`, with no value exposed. Reader and transformer imports passed. The `.env.local` ignore/tracking checks and sample-target absence checks passed.
- **Attempt:** exactly one `startAISStreamReader()` invocation opened one WebSocket and sent the local subscription (`SUBSCRIBED=yes`). The wrapper observed a message event with non-string `data`, recording only `EVENT_CATEGORY=non_text_message`; the reader returned fixed `provider_error`. Final status: `READER_ERROR=provider_error`, `OUTCOME=reader_error` (exit 1). The event data was not decoded, displayed or saved. The 15-second timeout bounded the invocation; no retry occurred.
- **Sample / checks:** no valid PositionReport was received, so no live sample/provenance was created. Post-attempt checks confirmed both live sample targets remain absent. `E-SEA-055` records the event observation and limitations.
- **Checkpoint / status:** `CHECKPOINT-06.md` records the new outcome and preserves Sprint checkpoint 03 at `HOLD`; checkpoint 05 remains the preflight-stop record. The one LIVE-003 attempt is exhausted.
- **Limitations / next action:** the event category identifies why this reader call mapped to its fixed error, but does not establish what the frame contained or why its data was non-string. Do not patch source or retry under LIVE-003. A possible reader compatibility fix requires a separate task contract, deterministic test, and human review. No commit, push or deployment occurred.

### 2026-09-25 — reader compatibility fix and restart handoff

- **Session / task:** local implementation and handoff for `TASK-SEA-R2-B09B10-FIX-001` after the user authorized `continue`; no live-provider action was included.
- **Goal and scope:** normalize valid UTF-8 WebSocket `ArrayBuffer` frames at the existing reader boundary, preserve fixed failure mapping and lifecycle behavior, record observed local checks, and prepare a restartable handoff. No collector/API/UI behavior, dependency, sample, provider request, commit, push or deployment was added in this task.
- **Implementation paths already present at handoff start:** `server/aisstream-reader.ts`, `tests/snapshot-reader.spec.ts`, `tests/snapshot-collector.spec.ts`. The reader sets native `binaryType = "arraybuffer"`, forwards strings unchanged, strictly decodes UTF-8 `ArrayBuffer`, and maps unsupported types/invalid UTF-8 to `provider_error`. These diffs were already present when this documentation/handoff work began; no code or test file was edited in this handoff task.
- **Commands and status:** `AISSTREAM_API_KEY=test-only-no-secret npx playwright test tests/snapshot-reader.spec.ts tests/snapshot-collector.spec.ts tests/snapshot-interface.spec.ts` — `PASS`, 33 tests; `AISSTREAM_API_KEY=test-only-no-secret npx tsc --noEmit` — `PASS`; `AISSTREAM_API_KEY=test-only-no-secret npm run build` — `PASS`; scoped `git diff --check` — `PASS`. These are results from the implementation work; the build output reported `.env.local` as an environment source. No values were printed, but we cannot claim that file contents were not loaded by the build environment.
- **Handoff-documentation checks:** final `git diff --check` — `PASS`; Python trailing-whitespace checks for the current task/handoff/checkpoint documents — `PASS`; focused assertions for task/evidence/checkpoint IDs, preserved historical R1 archive and Sprint checkpoint 03 `HOLD` — `PASS`.
- **User report and provider boundary:** the user said “стій, запрацювало”; this is user-reported context, not an independently verified post-fix provider result. No new AISStream attempt, raw frame, valid live PositionReport, live sample or provenance was captured after the change. LIVE-003's earlier `SUBSCRIBED=yes` / non-text event / fixed `provider_error` observation is unchanged and does not reveal the frame contents or provider acceptance.
- **Evidence / checkpoint:** `E-SEA-056` records local implementation checks; `E-SEA-057` records the user report with its limitation. `CHECKPOINT-07.md` (`CHECKPOINT-SEA-R2-007`) is the new restart record; CHECKPOINT-03 through CHECKPOINT-06 remain unchanged. Sprint checkpoint 03 remains **HOLD / not passed** pending live receipt and sample/provenance evidence.
- **Git boundary:** at handoff preparation, branch is `sprint2`, `HEAD` and `origin/sprint2` both resolve to `4c8dea20b0ce471fbb1d126784ed665dd77aaf64`. `sprint-2.png` was already staged. `START.md` was already deleted; `EVIDENCE.md`, `RUNBOOK.md`, and `TASK_SPEC.md` were already modified before this documentation update; existing untracked handoff/checkpoint and other user files remain preserved. No staging, commit, push, reset, clean or deployment was performed.
- **Future commit preparation:** likely implementation candidates are the reader and two test paths plus the reviewed documentation records. Do not stage `EVIDENCE.md`, `RUNBOOK.md`, or `TASK_SPEC.md` wholesale without reviewing/separating their pre-existing changes. Keep the already-staged image, `START.md` deletion, old untracked paths and unrelated material out unless separately reviewed and explicitly requested. The exact future commit manifest remains subject to a fresh diff review and user decision.
- **Unknowns / blockers:** provider acceptance, live receipt, key validity, the content of the LIVE-003 non-text frame, live UI/API end-to-end behavior, full R2 acceptance and release readiness remain `Unknown` / `Needs verification`. Human review of this complete code-and-documentation state remains the next gate.
- **Recovery:** preserve all existing modifications, staged/untracked/deleted paths and local environment files. Revise only the FIX-001 status/handoff portion if rejected; correct append-only records with a superseding factual entry rather than rewriting history. Do not reset or clean the branch.
- **Handoff:** next session should read `CHECKPOINT-07.md`, `E-SEA-056`/`E-SEA-057`, the FIX-001 section and the current portion of `NEXT_SESSION.md`; verify the actual Git state, review exact diffs, then ask for `continue`, `revise` or `HOLD`. No further provider attempt, commit or push is authorized by this entry.

### 2026-09-25 — LIVE-004 post-fix bounded live attempt

- **Task / authorization:** `TASK-SEA-R2-B09B10-LIVE-004`; after reviewing the exact new bounded contract, the user said “продовжуй”. The contract limited this to one 15-second live reader attempt and one sanitized sample only if a suitable real PositionReport arrived; no retry.
- **Preflight:** Node.js v22.23.2 direct imports of the existing reader, key accessor and transformer — `PASS`; `.env.local` ignored — `PASS`; `.env.local` untracked — `PASS`; both live sample targets absent — `PASS`. No `.env.local` contents or key value were printed or manually inspected. `@next/env` loaded environment configuration in memory for the harness, and only the existing accessor supplied the key to the reader.
- **Attempt:** one inline `node --experimental-strip-types` harness invocation used `startAISStreamReader()` directly, without starting Next.js or calling `/api/snapshot`. No code, route, test, dependency, or harness file was added. The attempt ended after 1,747 ms with `CAPTURE_OUTCOME=unsuitable_message` (exit 1); no raw message or field values were displayed. The temporary reader was stopped, and no retry occurred.
- **Observed result:** a decoded text event reached the sample eligibility check but did not satisfy the required field/schema checks or B-11 transformer acceptance. The exact failing condition was not captured, so no cause is inferred. No sample/provenance was written; the post-attempt check confirmed both live sample paths absent. Existing synthetic sample files were not changed.
- **Post-attempt records:** `E-SEA-058` records the attempt and its limitations. `CHECKPOINT-08.md` records the outcome and keeps checkpoint 03 at `HOLD`. `git diff --check` was run after the append-only records.
- **Timestamp / environment:** 2026-09-25; local workspace, branch `sprint2`, Node.js v22.23.2. Exact attempt-start UTC was not captured; a post-attempt UTC clock check returned `2026-09-25T09:14:06Z`.
- **Limitations / blockers:** no suitable live PositionReport, live sample, or provenance was obtained. The result does not establish provider cause, key validity, or the contents of the received message. The operator's screenshot is separate UI evidence, not a substitute for the raw message. Overall checkpoint 03 remains `HOLD`; the one LIVE-004 attempt is exhausted.
- **Recovery / next action:** preserve all pre-existing staged/deleted/untracked paths. Any further provider attempt requires a new bounded contract and explicit review/authorization; do not retry under LIVE-004. Review this documentation diff and choose `continue`, `revise`, or `HOLD`. No commit, push or deployment occurred.

### 2026-09-25 — LIVE-005 preflight blocked before any reader attempt

- **Task / authorization:** `TASK-SEA-R2-B09B10-LIVE-005`; the user reviewed the exact contract and said `continue`, authorizing at most ten bounded attempts with immediate stop on the first eligible sample. The contract requires stopping the batch on harness preflight failure.
- **Preflight:** Node.js v22.23.2; both live sample targets absent; `.env.local` ignored and untracked without reading its contents. Branch `sprint2`, `HEAD` `2147d93`.
- **Harness result:** the inline `node --experimental-strip-types --input-type=module` command exited 1 with a parse-time JavaScript `SyntaxError` (`Unexpected identifier 'MetaData'`). The source did not evaluate, so `loadEnvConfig`, the key accessor, and reader were not invoked. No environment values/key were accessed and no network connection occurred.
- **Observed result:** zero reader attempts; no live message, sample, or provenance. The batch stopped at preflight as contracted; no harness repair or retry was performed. E-SEA-059 and CHECKPOINT-09 record the bounded outcome and limitations.
- **Timestamp:** post-failure UTC clock observation `2026-09-25T10:24:16Z`.
- **Limitations / blockers:** this is a harness syntax failure, not a provider outcome. Key validity, provider acceptance, live PositionReport receipt, and sample/provenance remain unknown. Sprint checkpoint 03 remains `HOLD`.
- **Recovery / next action:** preserve all pre-existing staged, deleted, and untracked paths. Any new live attempt after harness correction requires a newly reviewed bounded contract and explicit authorization; the LIVE-005 batch is stopped. No code, test, commit, push, or deployment occurred.

### 2026-09-25 — LIVE-006 stopped at key/configuration preflight

- **Task / authorization:** `TASK-SEA-R2-B09B10-LIVE-006`; the user reviewed the exact replacement contract and said `continue`, authorizing at most ten sequential attempts and immediate stop on first eligible sample. The contract requires stopping on syntax, key, or configuration preflight failure.
- **Preflight:** Node.js v22.23.2; native WebSocket API available; both live sample targets absent; `.env.local` ignored and untracked without reading its contents. Branch `sprint2`, `HEAD` `2147d93`. The exact inline harness passed syntax-only validation before runtime execution.
- **Observed result:** runtime harness output was `{"attempt":1,"elapsedMs":0,"outcome":"preflight_blocked"}`. It stopped before the reader call; zero direct reader invocations and zero provider connections. The fixed category does not distinguish an environment-loader exception from a missing accessor value. No key value or provider error detail was printed, and no sample/provenance was written. The batch stopped; no further attempts were made.
- **Post-run records:** E-SEA-060 records the bounded result and limitations. CHECKPOINT-10 records the outcome and keeps Sprint checkpoint 03 at `HOLD`. `git diff --check` is run after these records.
- **Timestamp:** post-run UTC clock observation `2026-09-25T11:12:59Z`.
- **Limitations / blockers:** this is a local configuration/accessor preflight block, not a provider result. Key availability/validity, provider acceptance, live receipt, and sample/provenance remain unknown.
- **Recovery / next action:** preserve all pre-existing staged, deleted, and untracked paths. LIVE-006 stopped before attempt 1; any future live request requires a new bounded contract and explicit review/authorization. No code, test, commit, push, or deployment occurred.

### 2026-09-25 — DIAG-001 identified environment-loader failure

- **Task / authorization:** `TASK-SEA-R2-B09B10-DIAG-001`; after reviewing the exact no-network diagnostic contract, the user said `continue`. The contract allowed one in-memory diagnostic only.
- **Preflight:** Node.js v22.23.2; `.env.local` ignored and untracked without reading its contents; branch `sprint2`, `HEAD` `2147d93`. The diagnostic used dynamic imports and a silent `@next/env` logger.
- **Observed result:** one diagnostic returned `{"outcome":"env_loader_failed","elapsedMs":29,"presentBeforeLoad":false}`. The modules imported, and the key accessor returned no value before environment loading. `loadEnvConfig()` threw; details were suppressed. The post-load accessor was not called. No reader invocation, WebSocket, or network API was used, and no credential value was output.
- **Post-run records:** E-SEA-061 records the result and its limitations. CHECKPOINT-11 records the local blocker and keeps Sprint checkpoint 03 at `HOLD`. `git diff --check` is run after these records.
- **Timestamp:** post-run UTC clock observation `2026-09-25T12:10:57Z`.
- **Unknown / blocker:** the failing stage is identified, but the loader exception's underlying cause is not. No provider result or sample exists.
- **Recovery / next action:** preserve all pre-existing staged, deleted, and untracked paths. Do not retry the loader or make a provider request under this one-shot diagnostic. Any investigation of the exception or live attempt requires a separate bounded contract and explicit review/authorization. No code, test, commit, push, or deployment occurred.

### 2026-09-25 — DIAG-002 stopped at sanitized module-import failure

- **Task / authorization:** `TASK-SEA-R2-B09B10-DIAG-002`; after reviewing the exact one-shot, no-network contract, the user said `continue`. The contract authorized a single in-memory classification and required stopping if module import failed.
- **Preflight:** Node.js v22.23.2; `.env.local` ignored and untracked without reading its contents; both live sample/provenance targets absent; branch `sprint2`, `HEAD` `2147d93`.
- **Observed result:** one inline invocation attempted to dynamically import `@next/env` and exited `1` with only `{"outcome":"module_import_failed","errorName":"OtherError","errorCode":"OtherCode","elapsedMs":24}`. Import failed before `loadEnvConfig()`; loader calls: zero. No retry or further debugging was made. The key accessor was not called; the harness did not inspect `process.env`; no reader, provider, WebSocket, or network API was used. No raw exception detail, path, environment value, sample, or provenance was emitted or created.
- **Post-run records:** E-SEA-062 records the sanitized result and limitations. CHECKPOINT-12 records the blocked diagnostic and keeps Sprint checkpoint 03 at `HOLD`. `git diff --check` is run after these records.
- **Timestamp:** post-run UTC clock observation `2026-09-25T12:31:44Z`.
- **Unknown / blocker:** the module import failure's underlying cause is unknown; DIAG-001's `loadEnvConfig()` exception remains unexplained. This run did not call the loader and does not classify that earlier exception.
- **Recovery / next action:** preserve all pre-existing staged, deleted, modified, and untracked paths. Do not retry the import or loader, or make a provider request under DIAG-002. Any follow-up requires a separate bounded contract and explicit review/authorization. No source, test, commit, push, or deployment occurred.

### 2026-09-25 — DIAG-003 ten import attempts remained blocked

- **Task / authorization:** `TASK-SEA-R2-B09B10-DIAG-003`; the user explicitly said `continue DIAG-003` and clarified `15 секунд на процес`. The contract allowed at most ten sequential fresh Node processes, each bounded to 15 seconds.
- **Preflight:** Node.js v22.23.2; `.env.local` ignored and untracked without reading its contents; both live sample/provenance targets absent; branch `sprint2`, `HEAD` `2147d93`.
- **Observed result:** one inline parent invocation ran ten sequential child processes. All ten dynamic imports of `@next/env` failed with the safe categories `module_import_failed` / `OtherError` / `OtherCode`. Per-attempt elapsed times were `21, 8, 9, 10, 9, 8, 13, 10, 9, 10 ms`; total parent-reported time was `478 ms`. The parent exited after attempt 10. No import succeeded, so `loadEnvConfig()` was called zero times. No timeout or invalid child output occurred; raw stderr was discarded and only schema-validated fixed JSON was emitted. The key accessor was not called; `process.env` was not inspected; no reader, provider, WebSocket, or network API was invoked.
- **Post-run records:** E-SEA-063 records the ten outcomes and limitations. CHECKPOINT-13 records the bounded result and keeps Sprint checkpoint 03 at `HOLD`. `git diff --check` is run after these records.
- **Timestamp:** post-run UTC clock observation `2026-09-25T12:44:57Z`.
- **Unknown / blocker:** the import exception's underlying cause remains unknown. Since no import succeeded, this run did not call the loader or classify DIAG-001's `loadEnvConfig()` exception.
- **Recovery / next action:** preserve all pre-existing staged, deleted, modified, and untracked paths. DIAG-003 is exhausted; do not repeat its attempts, inspect environment files, or make a provider request under this contract. Any further diagnosis requires a separate bounded contract and explicit authorization. No source, test, commit, push, or deployment occurred.

### 2026-09-25 — DIAG-004 second ten-attempt batch remained blocked

- **Task / authorization:** `TASK-SEA-R2-B09B10-DIAG-004`; the user explicitly said `continue DIAG-004`, authorizing up to ten new sequential attempts with a 30-second timeout per fresh Node process.
- **Preflight:** Node.js v22.23.2; `.env.local` ignored and untracked without reading its contents; both live sample/provenance targets absent; branch `sprint2`, `HEAD` `2147d93`.
- **Observed result:** one inline parent invocation ran ten sequential child processes. Every dynamic import of `@next/env` failed with safe categories `module_import_failed` / `OtherError` / `OtherCode`. Per-attempt elapsed times were `8, 7, 9, 7, 9, 9, 8, 8, 8, 11 ms`; total parent-reported time was `445 ms`. The parent exited after attempt 10. No import succeeded, so `loadEnvConfig()` was called zero times. No timeout or invalid child output occurred; raw stderr was discarded and only schema-validated fixed JSON was emitted. The key accessor was not called; `process.env` was not inspected; no reader, provider, WebSocket, or network API was invoked.
- **Post-run records:** E-SEA-064 records the ten outcomes and limitations. CHECKPOINT-14 records the bounded result and keeps Sprint checkpoint 03 at `HOLD`. `git diff --check` is run after these records.
- **Timestamp:** post-run UTC clock observation `2026-09-25T13:07:48Z`.
- **Unknown / blocker:** the import exception's underlying cause remains unknown. Since no import succeeded, this run did not call the loader or classify DIAG-001's `loadEnvConfig()` exception.
- **Recovery / next action:** preserve all pre-existing staged, deleted, modified, and untracked paths. DIAG-004 is exhausted; do not repeat its attempts, inspect environment files, or make a provider request under this contract. Any further diagnosis requires a separate bounded contract and explicit authorization. No source, test, commit, push, or deployment occurred.

### 2026-09-25 — DIAG-005 resolution/import comparison completed

- **Task / authorization:** `TASK-SEA-R2-B09B10-DIAG-005`; the user explicitly said `continue DIAG-005`. The contract allowed one CommonJS resolution check, one ESM resolution check, and one dynamic import; it excluded calling `loadEnvConfig()`.
- **Preflight:** Node.js v22.23.2; `.env.local` ignored and untracked without reading its contents; both live sample/provenance targets absent; branch `sprint2`, `HEAD` `2147d93`.
- **Observed result:** one inline invocation emitted `{"outcome":"comparison_completed","commonJsResolution":{"status":"resolved"},"esmResolution":{"status":"resolved"},"dynamicImport":{"status":"import_succeeded","hasLoadEnvConfig":false},"elapsedMs":13}`. Both resolution checks and the dynamic import succeeded, but the module namespace did not expose a callable named `loadEnvConfig` property. The default export was not inspected. No loader or key accessor was called; `process.env` was not inspected. No raw exception, resolved path/URL, environment value, sample, provenance, or network data was output or created.
- **Post-run records:** E-SEA-065 records the observed resolution/import statuses and limitations. CHECKPOINT-15 records the comparison and keeps Sprint checkpoint 03 at `HOLD`. `git diff --check` is run after these records.
- **Timestamp:** post-run UTC clock observation `2026-09-25T14:21:21Z`.
- **Unknown / blocker:** the expected named export is absent from the imported namespace; whether `loadEnvConfig` exists under a default export and the cause of DIAG-001's loader failure remain unknown.
- **Recovery / next action:** preserve all pre-existing staged, deleted, modified, and untracked paths. DIAG-005 is complete; do not inspect exports further, call the loader, or make a provider request under this contract. Any follow-up requires a separate bounded contract and explicit authorization. No source, test, commit, push, or deployment occurred.

### 2026-09-25 — DIAG-006 inspected the default export descriptor

- **Task / authorization:** `TASK-SEA-R2-B09B10-DIAG-006`; after the user explicitly said `continue DIAG-006`, one bounded export-shape inspection was authorized. The contract prohibited invoking package functions/getters, environment loading, key access and network activity.
- **Preflight:** Node.js v22.23.2; `.env.local` ignored and untracked without reading its contents; both live sample/provenance targets absent; branch `sprint2`, `HEAD` `2147d93`. The existing staged, modified, deleted and untracked paths were preserved.
- **Observed result:** one inline Node invocation performed one `await import("@next/env")` and emitted `{"outcome":"import_succeeded","hasNamedLoadEnvConfig":false,"defaultType":"object","defaultLoadEnvConfigProperty":"accessor","elapsedMs":22}`. The returned namespace lacked a callable named export; its default value was an object with an own accessor descriptor named `loadEnvConfig`. `Object.getOwnPropertyDescriptor` inspected the descriptor without invoking its getter. No package function/getter, loader, key accessor, `process.env`, reader, provider, or network API was invoked. No sample/provenance was read or created.
- **Post-run records:** E-SEA-066 records the exact safe result and limitations. CHECKPOINT-16 records the outcome and keeps Sprint checkpoint 03 at `HOLD`. `TASK_SPEC.md` marks only DIAG-006 `Verified`. `git diff --check` is run after these records.
- **Timestamp:** post-run UTC clock observation `2026-09-25T14:52:00Z`.
- **Unknown / blocker:** the descriptor is an accessor, so its getter's result remains unknown; DIAG-001's loader failure remains unexplained. Sprint checkpoint 03 remains `HOLD`, with no live receipt or sample/provenance.
- **Recovery / next action:** preserve all pre-existing staged, deleted, modified and untracked paths. DIAG-006 is complete; do not evaluate the accessor, call the loader, or make a provider request under this contract. Further investigation requires a separate bounded contract and explicit authorization. No product/source, test, dependency, configuration, commit, push or deployment action occurred.

### 2026-09-25 — Refreshed the next-session handoff after DIAG-006

- **Task / authorization:** `TASK-SEA-R2-HANDOFF-002`; documentation-only handoff preparation was approved. No diagnostic, provider/network activity, build/test, commit, push, or deployment was authorized or performed.
- **Preflight:** read-only status showed branch `sprint2`, `HEAD` and local `origin/sprint2` both at `2147d93b708f0e1a398c377181000093f945afca`. Preserved the existing modified `EVIDENCE.md`, `RUNBOOK.md`, `TASK_SPEC.md`, deleted `START.md`, staged `sprint-2.png`, and untracked paths including checkpoints 08–16. The remote was not queried.
- **Observed change:** appended the bounded handoff contract to `TASK_SPEC.md`; replaced only the active FIX-001 section of `NEXT_SESSION.md` with a DIAG-006 review handoff pointing to CHECKPOINT-16/E-SEA-066; appended E-SEA-067 and this history entry. The historical R1 archive was confirmed byte-for-byte identical to `HEAD:NEXT_SESSION.md`. `CLAUDE.md`, `SPEC.md`, and CHECKPOINT-16 were not changed.
- **Verification:** local handoff links resolved (10 targets); active handoff structural checks passed; `git diff --check` passed for the task and handoff paths; staged-path whitespace check passed; no trailing whitespace was found in the active handoff. See E-SEA-067. Final scoped diff and status review remain the human checkpoint.
- **Status / limitation:** handoff preparation is verified for documented content and preservation checks only. Sprint checkpoint 03 remains `HOLD / not passed`; no live PositionReport or sample/provenance was obtained. DIAG-006 getter result and DIAG-001 loader failure cause remain unknown. The B-08 task wording in governance baselines is disclosed but not corrected.
- **Recovery / next action:** preserve all pre-existing Git paths; human reviewer should inspect the complete diff and choose `continue`, `revise`, or `HOLD`. Any further diagnosis, accessor/loader use, provider request, or governance correction requires a separate bounded task and explicit authorization. No build/tests, staging, commit, push, or deployment occurred.

### 2026-09-25 — Prepared Draft R2 current-task governance proposal

- **Task / authorization:** `TASK-SEA-R2-GOV-003`; the user authorized a Draft proposal only. This did not approve a governance decision, synchronize baselines, or authorize a successor technical task.
- **Preflight:** read-only status showed branch `sprint2`, `HEAD` and local `origin/sprint2` both at `2147d93b708f0e1a398c377181000093f945afca`. Existing modified, staged, deleted, and untracked paths were preserved. The DEC-008 target path was absent before creation; no remote query was made.
- **Observed change:** appended the bounded GOV-003 contract to `TASK_SPEC.md`; created `docs/decisions/DEC-008-r2-current-task-status.md` as a non-authoritative `Draft`; appended E-SEA-068 and this history record after checks. No baseline, decision index, Sprint plan, prior decision, checkpoint, or product/source path was edited.
- **Verification:** structural required-marker check passed; all 9 relative links resolved; proposal trailing-whitespace check passed; `git diff --check` and staged diff whitespace checks passed for the checked tracked documentation paths. See E-SEA-068. Final full-diff/path-boundary review remains the human checkpoint.
- **Status / limitation:** preparation is verified only for documentation structure, links, whitespace, and declared boundaries. DEC-008 awaits product-owner review; it is not an approved decision. Sprint checkpoint 03 remains `HOLD / not passed`; no R2 acceptance, live receipt/sample/provenance, or release readiness is claimed.
- **Recovery / next action:** inspect and revise/remove only this task's appended contract and new Draft proposal if rejected; append-only history is not rewritten. Preserve all pre-existing Git paths. Reviewer chooses `continue`, `revise`, or `HOLD`; accepting the proposal or synchronizing canonical baselines requires separate explicit approval and a new bounded task. No provider/network, secret/environment, build/test, staging, commit, push, or deployment action occurred.

### 2026-09-25 — Recorded R2 current-task decision and corrected direct claims

- **Task / authorization:** `TASK-SEA-R2-GOV-004`; the user explicitly approved the task contract and instructed continuation. Scope was limited to the current-task decision/index and direct stale claims in `CLAUDE.md` and `SPEC.md`. No successor implementation or diagnostic task was authorized.
- **Preflight:** fresh status showed branch `sprint2`, `HEAD` and local `origin/sprint2` both at `2147d93b708f0e1a398c377181000093f945afca`; DEC-009 path was absent. Existing staged, modified, deleted, and untracked paths were preserved.
- **Observed changes:** created DEC-009 (`1.0.0`, `Ready`); updated `docs/decisions/README.md` to `0.7.0` with the verified entry; updated `CLAUDE.md` to `1.4.0` and `SPEC.md` to `1.2.0`, with direct B-08-current implications replaced by historical/current-authorization wording. Appended E-SEA-069 after checks. DEC-008 remains an unchanged Draft proposal; DEC-006 and DEC-007 remain unchanged.
- **Verification:** `git diff --check` passed for the changed tracked governance files; structural checks confirmed versions, links (zero broken), no trailing whitespace, the index entry, checkpoint 03 HOLD, and absence of exact stale B-08-current phrases. An initial broad regex flagged a historical B-08 mention adjacent to the explicit no-current-task statement; the exact-phrase check then passed. See E-SEA-069. Complete diff review and human checkpoint remain pending.
- **Status / limitation:** documentation synchronization is verified for the bounded claim/index consistency only. Sprint checkpoint 03 remains `HOLD / not passed`; no live receipt, sample/provenance, product acceptance, or release readiness is claimed. The Sprint catalog mismatch is deferred; `docs/README.md`, `docs/sprints/README.md`, and `SPRINT-02.md` were not edited.
- **Recovery / next action:** human reviewer should inspect the complete diff and choose `continue`, `revise`, or `HOLD`. If revising, preserve all pre-existing Git state and correct historical evidence only through a superseding append-only entry. No build/tests, provider/network request, environment/secret access, commit, push, or deployment occurred.

### 2026-09-25 — Implemented and checked sparse snapshot demo fallback

- **Task / authorization:** `TASK-SEA-R2-B14-MIXED-VESSELS-001`; DEC-010 and the bounded task contract were explicitly approved. No provider/network request, secret inspection, commit, push, or deployment was authorized or performed.
- **Observed changes:** synchronized the approved sparse-snapshot behavior in `SPEC.md` and `SPRINT-02.md`; added the approved DEC-010 record/index entry; implemented mixed AISStream/demo marker display, source colors, and selected-marker highlighting; added deterministic threshold and interaction coverage. Pre-existing `reference/` remains untouched.
- **Verification:** 17 targeted Playwright tests passed, including snapshot counts 0–4; `npx tsc --noEmit` passed; `npm run build` passed; see E-SEA-070. Build emitted a warning that a parent-directory package-lock was ignored and reported `.env.local` as an environment source; values were not inspected. `git diff --check` passed before append-only evidence/history updates and must be rerun afterward.
- **Status / limitation:** implementation checks passed for the mocked and bounded behavior only. No live AISStream receipt, provider behavior, user validation, Sprint checkpoint 03, or release readiness is established. Full diff review and human checkpoint remain pending.
- **Recovery / next action:** inspect the scoped diff and choose `continue`, `revise`, or `HOLD`; on revision, change only task-owned paths and preserve all pre-existing Git state and append-only records. Do not commit, push, deploy, access provider/network, or inspect secrets under this task.

### 2026-09-26 — DIAG-007 static environment-loader API inspection

- **Task / authorization:** `TASK-SEA-R2-B09B10-DIAG-007`; the user instructed “виконуй, доведи спрінт 2 докінця” after review of the exact Draft. This was applied only to DIAG-007 static inspection; it does not authorize subsequent runtime, provider, code-change, or Sprint acceptance work.
- **Preflight:** branch `sprint2`; `HEAD` `4b82a7a`; pre-existing modified/untracked paths were preserved. `docs/checkpoints/CHECKPOINT-17.md` was absent before creation. `git diff --check -- TASK_SPEC.md` passed before the inspection record append.
- **Timestamp:** 2026-09-26T10:44:32Z (post-inspection and final-check observation).
- **Observed result:** read `@next/env` v16.3.5 package metadata, declaration, bundled static source, and installed App Router environment-variable guide. Package metadata identifies `dist/index.js` as main and `dist/index.d.ts` as types; the declaration and guide show the named `loadEnvConfig` API and call signature. Bundled source uses getter-backed exports on the CommonJS module object; its loader source contains `.env*` reads. No package code was imported or executed; no getter, loader or accessor was invoked; no `.env*` file, credential, process environment, network, WebSocket, or provider was accessed.
- **Verification:** source facts were compared with DIAG-001 and DIAG-005/006. They confirm the documented static API shape but do not explain the DIAG-001 runtime exception. `E-SEA-071` records the findings and limitations. Final `git diff --check` is run after the append-only records.
- **Status / limitation:** DIAG-007 is complete as a static inspection only. Runtime compatibility, loader failure cause, key availability/validity, live receipt, sample/provenance, live UI/API end-to-end behavior, Sprint checkpoint 03, and release readiness remain unknown or unmet. Checkpoint 03 remains `HOLD / not passed`.
- **Recovery / next action:** preserve all pre-existing Git state and append-only history. Any loader execution, code fix, environment access, or provider request requires a separately bounded contract and explicit approval. No code, configuration, test, dependency, commit, push, or deployment change occurred.

### 2026-09-26 — LIVE-007 one-shot capture (HOLD)

- **Task / authorization:** `TASK-SEA-R2-B09B10-LIVE-007`; the user explicitly approved `continue LIVE-007`. Authorization was limited to one silent `@next/env` loader call and one reader attempt with a 15-second maximum; no retries were authorized.
- **Preflight:** branch `sprint2`; `.env.local` ignored and untracked, confirmed without opening its contents. Both sample targets and CHECKPOINT-18 were absent; existing modified and untracked worktree paths were preserved.
- **Observed operation:** one in-memory Node invocation loaded the existing TypeScript config accessor, AISStream reader and transformer; loaded environment configuration once through the installed CommonJS package; checked key presence without outputting the value; then made one connection/subscription attempt through the existing reader. The reader's local subscription-send callback fired; this does not establish provider acknowledgement. The first received WebSocket text message failed eligibility checks and the fixed result was `unsuitable_message` after approximately one second. Reader was stopped immediately. No retry, second connection, troubleshooting or alternate path was attempted.
- **Artifacts / data handling:** no live sample or provenance was created. Raw provider content, secret values, loader results and raw errors were not output or persisted. No application/source/test/dependency/configuration files were changed.
- **Evidence / status:** `E-SEA-072` records the bounded result. CHECKPOINT-03's real receipt and matching sample/provenance criteria remain not met; overall status remains `HOLD / not passed`. The exact unsuitability reason, key validity, provider behavior, live UI/API behavior and full Sprint 2 acceptance remain unknown.
- **Timestamp:** 2026-09-26T11:24:45Z post-attempt observation.
- **Verification / recovery:** target paths were confirmed absent after the attempt. Run `git diff --check` after appending the evidence and checkpoint. Preserve all existing and newly appended records; no cleanup, reset, commit, push or deployment is authorized. No further provider request is authorized by LIVE-007.

### 2026-09-26 — LIVE-008 one-shot capture (HOLD)

- **Task / authorization:** `TASK-SEA-R2-B09B10-LIVE-008`; the user explicitly approved `continue LIVE-008`. Authorization was limited to one silent `@next/env` loader call and one reader attempt with a 15-second maximum; no retries were authorized.
- **Preflight:** branch `sprint2`; `.env.local` ignored and untracked, confirmed without opening its contents. Both sample targets and CHECKPOINT-19 were absent; existing modified/untracked worktree paths were preserved.
- **Observed operation:** one in-memory Node invocation loaded the existing server modules through the installed TypeScript transpiler, invoked `@next/env` once, checked key presence without emitting the value, then made one reader attempt. The fixed reader result was `connect_failed` after about 4 seconds, before the local subscription-send callback (`subscribed: false`). No provider acknowledgement or PositionReport was observed. The attempt ended with no retry or second connection.
- **Artifacts / data handling:** no live sample or provenance was created. Raw provider content/error, credentials, loader results and environment values were not output or persisted. No application/source/test/dependency/configuration path was changed.
- **Evidence / status:** `E-SEA-073` records the attempt. CHECKPOINT-03's live receipt and matching sample/provenance criteria remain not met; overall status remains `HOLD / not passed`. The cause of the fixed connection error, key validity, provider behavior and full Sprint 2 acceptance remain unknown.
- **Timestamp:** 2026-09-26T13:06:36Z post-attempt observation.
- **Verification / recovery:** target paths were confirmed absent after the attempt. Run `git diff --check` after the append-only records and checkpoint. Preserve all existing and newly appended records; no cleanup, reset, commit, push or deployment is authorized. LIVE-008's single attempt is exhausted.

### 2026-09-26 — DIAG-008 instrumented connection-stage diagnostic

- **Task / authorization:** `TASK-SEA-R2-B09B10-DIAG-008`; the user explicitly approved `continue DIAG-008`. Authorization was limited to one silent loader call and one instrumented reader attempt with a 15-second maximum; no retries.
- **Preflight:** branch `sprint2`; `.env.local` ignored and untracked, confirmed without opening its contents. CHECKPOINT-20 and both live sample/provenance targets were absent; all pre-existing modified/untracked paths were preserved.
- **Observed operation:** one in-memory Node invocation instrumented only fixed WebSocket lifecycle categories, called `@next/env` once, checked key presence without outputting its value, and made one reader attempt. The sequence was `open_seen`, `subscription_send_callback`, then `message_transform_rejected` in about one second. The first text message was passed to the existing transformer for a boolean acceptance result and discarded. No provider acknowledgement was asserted; no raw message, event object, error or close reason was retained or emitted. The attempt ended with no retry or second connection.
- **Artifacts / data boundary:** no sample or provenance was created. No application/source/test/dependency/configuration path was changed; no raw payload or secret was output or persisted.
- **Evidence / status:** `E-SEA-074` records the observed lifecycle. This establishes that this attempt opened and locally sent the subscription, but it does not establish why the message was rejected or the cause of LIVE-008's earlier `connect_failed`. CHECKPOINT-03 remains `HOLD / not passed`.
- **Timestamp:** 2026-09-26T13:50:43Z post-attempt observation.
- **Verification / recovery:** CHECKPOINT-20 and sample/provenance targets remained absent after the attempt. Run `git diff --check` after the task-owned records. Preserve all prior state; no cleanup, reset, commit, push or deployment. DIAG-008's single attempt is exhausted.

### 2026-09-26 — LIVE-009 bounded stream capture

- **Task / authorization:** `TASK-SEA-R2-B09B10-LIVE-009`; the user explicitly approved `continue LIVE-009`. Scope was one silent `@next/env` loader invocation, one server-side reader connection and one hard 15-second stream window; transformer-rejected text messages could be discarded while continuing within that same connection.
- **Preflight:** branch `sprint2`; `.env.local` ignored and untracked, confirmed without opening its contents. Both sample targets and CHECKPOINT-21 were absent before the attempt. Pre-existing modified/untracked paths were preserved.
- **Observed operation:** one in-memory invocation called the CommonJS loader once with a silent logger, checked key presence without printing its value, and started one existing-reader WebSocket. Local subscription-send callback ran; this is not provider acknowledgement. Two messages were received in the same connection: the first was rejected by the existing transformer and discarded; the next passed the transformer. The accepted report was projected to the allowlisted B-10 fields, with no null normalization required. The reader stopped on acceptance after approximately 7 seconds; no retry or second connection occurred.
- **Artifacts / data boundary:** created `data/samples/live/position-report.sample.json` and `data/samples/live/PROVENANCE.md` from the accepted message. Verified the saved allowlisted shape and provenance correspondence without printing the payload. No raw provider envelope, key, raw error, close reason or unrelated environment value was emitted or persisted.
- **Evidence / status:** `E-SEA-075` and CHECKPOINT-21 record the outcome. This supports the bounded live receipt and sample/provenance criteria for this attempt. Do not rewrite the historical CHECKPOINT-03 record; it remains `HOLD / not passed` until human review/superseding decision. No claim of full Sprint 2 acceptance, release readiness, provider acknowledgement or live UI/API end-to-end behavior.
- **Timestamp:** 2026-09-26T14:38:17Z post-attempt observation.
- **Verification / recovery:** `git diff --check` passed after all task-owned records and CHECKPOINT-21 were finalized (no output). The sample allowlist and provenance-link/essential-contents check passed without printing the sample payload. No tests/build, source edits, cleanup, staging, commit, push or deployment. Preserve the new sample/provenance and all pre-existing paths.

### 2026-09-26 — User-approved CHECKPOINT-03 status review

- **Task / authorization:** `TASK-SEA-R2-CHECKPOINT-03-STATUS-001`; the user explicitly instructed `Затверди статус CHECKPOINT-03 за результатами CHECKPOINT-21`. Scope was a review of CHECKPOINT-03 criteria against the existing LIVE-009 evidence and a superseding status record; no technical/provider work.
- **Review:** CHECKPOINT-21 and `E-SEA-075` support the live PositionReport receipt and matching sample/provenance criteria. Safe key handling remains supported only at the configured-value/secret-boundary level, not key validity. Working demo remains supported locally only.
- **Decision:** the user's approval is recorded in `E-SEA-076` and CHECKPOINT-22. CHECKPOINT-03's defined criteria are recorded as `PASS / VERIFIED`; the earlier checkpoint record now has artifact status `Superseded`, points to CHECKPOINT-22, and retains its original 2026-09-24 HOLD findings as historical. This does not claim full Sprint 2 acceptance or release readiness.
- **Verification / recovery:** formatting/link checks and `git diff --check` are run after task-owned records are finalized. No provider/network request, secret/environment access, tests/build, source edits, cleanup, staging, commit, push or deployment. Preserve all prior workspace state and the LIVE-009 sample/provenance.

### 2026-09-27 — B-13 exact-commit review and closeout

- **Task / authorization:** `TASK-SEA-R2-B13-REVIEW-001`; the user first approved the exact read-only review contract with `continue B13-REVIEW-001`, then separately chose `continue` after receiving the no-findings review report. This authorizes only the bounded review closeout records.
- **Review scope/result:** inspected B-13 commit `17006c615f7a93e84c7c554c624b8909691828fb` against first parent `fef4a8fc51c9c0e41a8158e4e541af574f895741`. The commit changes exactly `app/globals.css`, `app/map-shell.tsx`, `app/sea-map.tsx`, and `tests/snapshot-interface.spec.ts`. No defect against the approved security/data-flow, state/behavior, path/scope, or evidence-boundary criteria was reported.
- **Decision / artifacts:** user's `continue` disposition recorded in `TASK_SPEC.md`; B-13 task and review gate status set to `Verified`. Appended `E-SEA-077` and created `docs/checkpoints/CHECKPOINT-23.md`. No implementation/test path was edited; pre-existing B-14 changes and unrelated paths were preserved.
- **Verification:** `git diff --check -- TASK_SPEC.md EVIDENCE.md RUNBOOK.md` passed with no output. Focused validation of CHECKPOINT-23 passed for whitespace, relative links, metadata and review anchors. `E-SEA-077` records the review boundary and limitations.
- **Limitations / recovery:** no application tests, typecheck, build, provider/network request, secret/environment access, current combined worktree diff, staging, commit, push or deployment occurred. This review does not establish live UI/API behavior, B-14 acceptance, full Sprint 2 acceptance or release readiness. Preserve append-only records and all existing modified/untracked paths; correct any factual issue with a superseding record, not by rewriting history. Further R2 work requires a new bounded contract and explicit approval.

### 2026-09-27 — SPEC R2 authorization chronology reconciliation

- **Task / authorization:** `TASK-SEA-R2-B14-SPEC-STATUS-001`; the user explicitly approved the bounded contract with `continue B14-SPEC-STATUS-001` after the B-14 review found contradictory present-tense authorization claims in `SPEC.md:85` and `SPEC.md:107`.
- **Observed changes:** versioned `SPEC.md` from 1.3.0 to 1.4.0; clarified that DEC-009 records the authorization state when approved and that DEC-010 plus the approved B-14 task later authorize only that bounded sparse-snapshot UI slice. Created DEC-011 to record this chronology without changing DEC-009/DEC-010 or authorizing other R2 work; added it to `docs/decisions/README.md`. Appended `E-SEA-078`. B-14 remains Active and its review remains open.
- **Verification:** `git diff --check -- SPEC.md TASK_SPEC.md EVIDENCE.md RUNBOOK.md docs/decisions/README.md` passed with no output. Focused checks passed for metadata, relative links, authorization chronology/boundary, DEC-011 index entry, and the still-Active B-14 task. No application tests, typecheck or build were run.
- **Limitations / recovery:** no app/source/test changes, tests, typecheck, build, provider/network, environment/secret access, commit, push or deployment. This correction does not close B-14 review, create CHECKPOINT-24, or establish full Sprint 2 acceptance or release readiness. Preserve all pre-existing worktree paths and append-only history; any further technical work requires its own approved bounded contract.

### 2026-09-27 — SPEC correction disposition and B-14 re-review handoff

- **Task / authorization:** the user selected `continue` after reviewing the corrected SPEC/decision chronology diff. This records acceptance only of `TASK-SEA-R2-B14-SPEC-STATUS-001`; it does not accept B-14 or Sprint 2.
- **Disposition / artifacts:** marked the bounded documentation task `Verified`; superseded the old B-14 review contract because its target fingerprint was stale. Added Draft `TASK-SEA-R2-B14-REVIEW-002` for the corrected seven-path target, fingerprint `0c3e8153f453d10d73564f247bf6ef88b51d947b30a6ddbd2b3a6a22cf1b7b86` against base `4b82a7aa1bdc2c70d3963a6bc02aef8517ad98d7`. The staged target diff was empty; no review was performed under this Draft contract.
- **Verification:** `git diff --check -- TASK_SPEC.md` passed. Focused assertions passed for the correction task's final status, superseded prior review, new draft approval gate, and separation from B-14/Sprint acceptance. An initial assertion failed because it searched for a different literal than the equivalent wording in the contract; corrected assertion passed.
- **Handoff / limitations:** next action is exact user approval `continue B14-REVIEW-002`, then a read-only review of the frozen target. No app tests, typecheck, build, provider/network, environment/secrets, commit, push, deployment or CHECKPOINT-24 occurred. Preserve all pre-existing worktree changes and append-only history.

### 2026-09-27 — B-14 review finding remediation

- **Task / authorization:** `TASK-SEA-R2-B14-REMEDIATION-001`; the user explicitly approved it with `continue B14-REMEDIATION-001`. Scope was limited to stabilizing the sparse-snapshot marker array and clarifying the DEC-009 decision-index row.
- **Observed changes:** `app/map-shell.tsx` memoizes derived map vessels by snapshot identity, so selection-only updates do not send a new vessel-array identity to the map reconciliation effect. `tests/snapshot-interface.spec.ts` retains AIS/demo element handles across selection transfer and verifies the nodes stay connected. `docs/decisions/README.md` dates the DEC-009 authorization statement to 2026-09-25 and points to DEC-011 for the later narrow B-14 authorization.
- **Verification:** `npx playwright test tests/snapshot-interface.spec.ts tests/vessel-selection.spec.ts` passed 17/17; `npx tsc --noEmit` passed; `npm run build` passed (Next.js 16.3.5/Turbopack). Pre-append `git diff --check` passed for the source, test, index and task paths; final append-only records require a final diff check. The test was not run against pre-fix code; its expected pre-fix failure was not directly observed.
- **Limitations / handoff:** build output identified `.env.local` as an environment source; its contents were not inspected. No provider/network request, direct secret/environment inspection, commit, push or deployment. B-14 review remains open; no CHECKPOINT-24 or Sprint 2 acceptance is claimed. Human diff disposition is required, then a separate fresh B-14 review contract/approval is required before review.

### 2026-09-27 — Final append-only record whitespace check

- After `E-SEA-080` and the remediation execution note were appended, `git diff --check -- app/map-shell.tsx tests/snapshot-interface.spec.ts docs/decisions/README.md TASK_SPEC.md EVIDENCE.md RUNBOOK.md` passed with no output. No paths outside the approved remediation set plus task/evidence/runbook records were changed by this remediation.

### 2026-09-27 — B-14 remediation disposition and replacement review handoff

- **Disposition:** the user supplied `continue` for the remediation diff. This accepts only `TASK-SEA-R2-B14-REMEDIATION-001`; it does not pass the B-14 review or accept Sprint 2. The remediation task is recorded `Verified` for its bounded changes and checks.
- **Review target:** `TASK-SEA-R2-B14-REVIEW-002` is marked `Superseded` because remediation changed its frozen target. Draft `TASK-SEA-R2-B14-REVIEW-003` freezes the exact seven-path unstaged diff against base `4b82a7aa1bdc2c70d3963a6bc02aef8517ad98d7`, fingerprint `3c413600f35500e9acb83e514891c76283a3fab9271ad5fe0605b95292b75e2d`; staged target diff was empty at preparation. No review was performed.
- **Verification:** the hash/path preflight reported the seven expected paths and empty staged target. Focused assertions and `git diff --check` are recorded in E-SEA-081 after execution.
- **Handoff / limitations:** B-14 review remains open. Next action requires exact approval `continue B14-REVIEW-003`; no CHECKPOINT-24, B-14 acceptance, Sprint 2 acceptance, test/build, provider/network, environment/secrets, commit, push or deployment occurred in this closeout.

### 2026-09-27 — Replacement review contract record validation

- `git diff --check -- TASK_SPEC.md EVIDENCE.md RUNBOOK.md app/map-shell.tsx tests/snapshot-interface.spec.ts docs/decisions/README.md` passed. Structural assertions passed for the exact seven-path target, empty staged target, SHA-256 `3c413600f35500e9acb83e514891c76283a3fab9271ad5fe0605b95292b75e2d`, remediation/review lifecycle statuses, and explicit `continue B14-REVIEW-003` gate. Recorded as `E-SEA-082`.
- **Handoff:** the read-only post-remediation review has not been performed. Await exact user approval `continue B14-REVIEW-003`; no B-14 or Sprint 2 acceptance is implied.

### 2026-09-27 — Post-remediation B-14 review and SPEC correction handoff

- **Task / authorization:** `TASK-SEA-R2-B14-REVIEW-003`; user approved the exact read-only review with `continue B14-REVIEW-003`, then dispositioned the result with `продовжуй`. That disposition authorizes closeout records and preparation of a separate bounded correction contract only.
- **Review result:** the frozen seven-path target matched base `4b82a7aa1bdc2c70d3963a6bc02aef8517ad98d7` and SHA-256 `3c413600f35500e9acb83e514891c76283a3fab9271ad5fe0605b95292b75e2d`. One medium inconsistency was confirmed at `SPEC.md:69`: the stale no-current-R2-task statement conflicts with the later B-14 authorization in the SPEC and DEC-011. Review recommendation is `FAIL`; no other confirmed finding. B-14 stays Active; no CHECKPOINT-24 is created.
- **Disposition / handoff:** recorded as `E-SEA-083`; review task is `Verified` for review completion, not acceptance. Draft `TASK-SEA-R2-B14-SPEC-STATUS-002` freezes the current SPEC diff fingerprint `3c60f5d201762b02ddb89edd9c8f948c71a72fabf218eb6ec7abd60ba9d9cf2d`, with staged SPEC diff empty. Next action requires exact approval `continue B14-SPEC-STATUS-002` before editing SPEC.
- **Limitations:** no tests, typecheck, build, application code, provider/network, environment/secrets, commit, push or deployment occurred. Sprint 2 acceptance and release readiness remain unestablished.

### 2026-09-27 — SPEC authorization-scope wording correction

- **Task / authorization:** `TASK-SEA-R2-B14-SPEC-STATUS-002`; user explicitly approved the exact bounded documentation contract with `continue B14-SPEC-STATUS-002`.
- **Observed change:** `SPEC.md` version advanced from 1.4.0 to 1.5.0; the date is 2026-09-27. Only the stale R2 scope-status sentence was revised to distinguish DEC-009's 2026-09-25 state from the later, B-14-only authorization in DEC-010 and the approved B-14 task. No other SPEC section/product scope was changed.
- **Verification:** focused textual/metadata assertions passed; `git diff --check -- SPEC.md TASK_SPEC.md EVIDENCE.md RUNBOOK.md` passed. Recorded as `E-SEA-084`.
- **Handoff / limitations:** waiting for the user's `continue`, `revise`, or `HOLD` disposition on the SPEC diff. B-14 review remains failed/open pending a fresh review contract after this correction; no CHECKPOINT-24 or Sprint 2 acceptance is claimed. No tests/typecheck/build, provider/network, environment/secrets, commit, push or deployment occurred.

### 2026-09-27 — SPEC correction disposition and B-14 review handoff

- **Disposition:** the user selected `continue` for `TASK-SEA-R2-B14-SPEC-STATUS-002`. This accepts only the bounded SPEC wording/metadata diff; the correction task is closed `Verified` for its defined scope, as recorded in E-SEA-085. This is not a B-14 review pass or Sprint 2 acceptance.
- **Verification:** focused structural/path/fingerprint assertions and `git diff --check -- SPEC.md TASK_SPEC.md EVIDENCE.md RUNBOOK.md` passed before the append-only closeout records were finalized. The frozen review target still matches the exact seven paths and SHA-256 `bda55292cd56688e1b7c6919caa20e6a545e125a742a6399ffb015375ccf7afa`; the staged target is empty.
- **Handoff:** Draft `TASK-SEA-R2-B14-REVIEW-004` is prepared, but no review has been performed. Await exact approval `continue B14-REVIEW-004` before inspecting the target. B-14 remains open; no CHECKPOINT-24 is created. No tests/typecheck/build, application execution, provider/network, environment/secrets, commit, push or deployment occurred.

### 2026-09-27 — B-14 post-correction review and accepted closeout

- **Task / authorization:** `TASK-SEA-R2-B14-REVIEW-004`; user approved exact read-only review with `continue B14-REVIEW-004`, then selected `continue` on the PASS report. The latter authorizes only this B-14 review closeout and the checkpoint permitted by the contract.
- **Preflight / review:** exact seven-path diff and staged boundary matched base `4b82a7aa1bdc2c70d3963a6bc02aef8517ad98d7`, fingerprint `bda55292cd56688e1b7c6919caa20e6a545e125a742a6399ffb015375ccf7afa`, staged target empty. All six review oracles passed by static inspection; recommendation `PASS`, no findings.
- **Closeout:** `TASK-SEA-R2-B14-REVIEW-004` and `TASK-SEA-R2-B14-MIXED-VESSELS-001` are `Verified` for scoped criteria. `E-SEA-086` records the facts, and `docs/checkpoints/CHECKPOINT-24.md` records B-14's bounded PASS. This does not accept all of Sprint 2 or establish live provider behavior, user validation, or release readiness.
- **Verification:** review contract prohibited tests/typecheck/build/application execution/network/secrets; none were run/accessed. Final whitespace and focused record/path assertions are performed after this closeout is written.
- **Handoff / recovery:** B-14 review is closed for its approved slice. Preserve the implementation and all existing worktree paths. No code edits, staging, reset, cleanup, commit, push or deployment occurred. Any final Sprint 2 acceptance activity remains separately gated; do not infer it from CHECKPOINT-24.

### 2026-09-27 — Sprint 2 bounded acceptance review

- **Task / disposition:** `TASK-SEA-R2-SPRINT02-ACCEPTANCE-REVIEW-001`; the user reported that clicking “Завантажити справжні позиції” loads real ships, then selected `continue SPRINT02-ACCEPTANCE-REVIEW-001`.
- **Review result:** bounded task evidence supports B-08…B-14 for their scoped criteria; CHECKPOINT-22 supports only CHECKPOINT-03's defined criteria. The user's report supports the core live click-to-display flow as human-reported evidence, not an independent runtime observation. No explicit confirmation was supplied for live marker-to-card matching or every manual US-05…US-08 behavior.
- **Recommendation / closeout:** `CONTINUE WITH APPROVAL`; `TASK-SEA-R2-SPRINT02-ACCEPTANCE-REVIEW-001` is `Verified` for review completion only. No overall Sprint 2 PASS checkpoint is created. Part C's B-10…B-13 statuses are treated as an earlier plan snapshot against later delivered task records; neither source was rewritten. Evidence: `E-SEA-087`.
- **Verification / boundary:** `git diff --check` and focused structural/path checks are run after this closeout. No tests, typecheck, build, application execution, provider/network request, environment loading, secret access, source changes, staging, reset, cleanup, commit, push, or deployment occurred. US-09/US-10 and release readiness remain outside scope.
- **Handoff:** any remaining manual acceptance detail requires a separately reviewed bounded contract and explicit approval; no technical follow-up is authorized by this review.

### 2026-09-28 — Sprint 2 bounded manual acceptance closeout

- **Task / authorization:** `TASK-SEA-R2-MANUAL-ACCEPTANCE-001`; exact approval `continue SPRINT02-MANUAL-ACCEPTANCE-001`, followed by the user's `continue` disposition on the bounded manual report.
- **Observed:** user-provided local-browser screenshot showed one same-origin `GET /api/snapshot` with HTTP 200 and an AISStream snapshot label, 15-second window, displayed UTC time, count 4, and incomplete-sample wording; OSM tile requests were blocked. The user reported seeing the loading state, confirming the selected marker/card ID correspondence, observing a stationary live marker for about five seconds, and receiving the exact no-key UI message after a separate local launch with an empty process key. The user confirmed the development server was stopped. No vessel identifiers or external lookup details were retained.
- **Result / limits:** PASS for the bounded manual outcomes reported and screenshot-visible success response; this does not establish overall Sprint 2 acceptance. The exact live-request duration, initial idle-state details, all loading subdetails, and no-key HTTP metadata were not separately captured. The no-key route's source checks for a missing key before calling the snapshot collector; no server-side egress instrumentation was used. An external site lookup was excluded from evidence.
- **Verification:** `git diff --check -- EVIDENCE.md RUNBOOK.md` and focused structural assertions were run after appending E-SEA-088 and this handoff. No tests, typecheck, build, further app run, provider request, secret/environment inspection, source changes, checkpoint, staging, reset, cleanup, commit, push, or deployment occurred.
- **Handoff:** E-SEA-088 records the scoped observations. No CHECKPOINT-25 or overall Sprint 2 PASS was created. Preserve current worktree state; any further acceptance work requires its own bounded contract and explicit approval.

### 2026-09-28 — Sprint 2 acceptance review after manual observations

- **Task / authorization:** `TASK-SEA-R2-SPRINT02-ACCEPTANCE-REVIEW-002`; the user approved the exact read-only review with `continue SPRINT02-ACCEPTANCE-REVIEW-002`, then selected `CONTINUE WITH APPROVAL` on the report. The latter authorizes only bounded review closeout.
- **Review result:** E-SEA-088 closes the previously missing user-reported live marker/card correspondence and records screenshot-visible HTTP 200/snapshot metadata, loading, stationary-marker and no-key outcomes. These are bounded local/manual observations, not an independently instrumented end-to-end trace. B-08…B-14 and CHECKPOINT-03 remain supported only within their recorded task/checkpoint scopes.
- **Open gaps:** initial idle-demo details, individual loading subdetails, exact live request duration and no-key HTTP metadata remain uncaptured/UNKNOWN. The manual acceptance task still has `Draft` status in TASK_SPEC.md although E-SEA-088 records approved execution and disposition; this record inconsistency was not changed by this review. Recommendation remains `CONTINUE WITH APPROVAL`, not overall Sprint 2 PASS.
- **Disposition / artifacts:** `TASK-SEA-R2-SPRINT02-ACCEPTANCE-REVIEW-002` is `Verified` for bounded review completion only; appended E-SEA-089. No acceptance checkpoint was created because the oracle did not support PASS. US-09/US-10, full MVP acceptance, release readiness and deployment remain outside scope.
- **Verification / boundary:** `git diff --check -- TASK_SPEC.md` and focused closeout assertions passed; final `git diff --check -- TASK_SPEC.md EVIDENCE.md RUNBOOK.md` and append-only record assertions are run after this entry. No tests, typecheck, build, app execution, provider/network, environment/secrets, raw sample inspection, source changes, staging, reset, cleanup, commit, push or deployment occurred.
- **Handoff / recovery:** resolve whether the uncaptured manual details block acceptance and reconcile the manual task lifecycle only with a separate bounded contract/approval. Preserve all existing modified/untracked paths and scoped checkpoints; do not infer Sprint 2 acceptance.

### 2026-09-28 — final Sprint 2 review closeout validation

- `git diff --check -- TASK_SPEC.md EVIDENCE.md RUNBOOK.md` passed with no output.
- Focused assertions passed for one E-SEA-089 record, bounded review status, retained `CONTINUE WITH APPROVAL` recommendation, explicit UNKNOWNs, disclosed manual-task status mismatch, and absence of a Sprint 2 acceptance checkpoint. No other verification was performed.

### 2026-09-28 — Final Sprint 2 evidence sufficiency review and closeout

- **Task / authorization:** `TASK-SEA-R2-SPRINT02-FINAL-EVIDENCE-REVIEW-003`; the user approved the exact read-only contract with `continue SPRINT02-FINAL-EVIDENCE-REVIEW-003`, then selected `continue` on the report. This authorizes bounded closeout only.
- **Review result:** static inspection found existing mocked Playwright evidence for initial demo label/markers and loading lock/state, including the disabled button, loading label, no markers/cards while pending, retained map, and prevention of an overlapping request. E-SEA-051 records 16 earlier passing tests; none were rerun. The loading test starts with no selection/card, so the transition from an already selected demo marker/card into loading remains `UNKNOWN` against the explicit B-13 state requirement.
- **Disposition / records:** recommendation remains `CONTINUE WITH APPROVAL`, not Sprint 2 PASS. The user selected `continue`; `TASK-SEA-R2-SPRINT02-FINAL-EVIDENCE-REVIEW-003` is `Verified` for review completion only and E-SEA-090 records the result. `TASK-SEA-R2-MANUAL-ACCEPTANCE-001` is marked `Verified` for its bounded manual execution/report only; E-SEA-088 limitations remain explicit. No Sprint 2 acceptance checkpoint was created.
- **Limits / next gate:** exact live-request duration and no-key HTTP metadata are uncaptured but not canonical product acceptance criteria. A separate bounded test-change/check contract and explicit approval are needed to verify selected-card clearing during loading. US-09/US-10, full MVP acceptance, release readiness, and deployment remain out of scope.
- **Verification / boundary:** final `git diff --check -- TASK_SPEC.md EVIDENCE.md RUNBOOK.md` and focused assertions are run after this entry. No tests, typecheck, build, application execution, provider/network, environment/secrets, raw sample inspection, source/test changes, staging, reset, cleanup, commit, push or deployment occurred.

### 2026-09-28 — Final evidence review closeout validation

- `git diff --check -- TASK_SPEC.md EVIDENCE.md RUNBOOK.md` passed with no output.
- The first focused validation attempt had one assertion-literal mismatch (`does not establish` vs. the recorded `do not directly exercise`); the corrected assertion matched the contract wording and all seven assertions passed. E-SEA-091 records this correction. No product tests or runtime checks were run.

### 2026-09-28 — Selected-card loading regression and bounded R2 acceptance

- **Task / authorization:** `TASK-SEA-R2-SPRINT02-SELECTION-LOADING-FINAL-001`; exact approval `continue SPRINT02-SELECTION-LOADING-FINAL-001` preceded the test change. After review of the diff, targeted result, and matrix, the user selected `continue` on the bounded PASS recommendation.
- **Change / verification:** added one selected-demo-card-to-loading regression case to `tests/snapshot-interface.spec.ts`. `npx playwright test tests/snapshot-interface.spec.ts` passed all 17 tests (13.2 s); `git diff --check -- tests/snapshot-interface.spec.ts TASK_SPEC.md` passed with no output. Snapshot was mocked and OSM tile traffic blocked. No provider/network, manual app, build, typecheck, package install, or environment/secret access occurred.
- **Acceptance / records:** evidence synthesis in `E-SEA-092` supports bounded R2 `PASS / VERIFIED`; created `docs/checkpoints/CHECKPOINT-25.md` after the user's explicit `continue`. CHECKPOINT-22/23/24 remain scoped supporting records. The checkpoint does not accept US-09/US-10, full MVP, release readiness, or deployment.
- **Limitations / recovery:** exact live request duration and no-key HTTP metadata remain uncaptured and are not separate canonical product acceptance criteria. The test proves mocked interface behavior only; it does not independently establish live provider behavior, key validity, provider acknowledgement, or live UI/API transport. Preserve all unrelated and pre-existing paths; no staging, reset, cleanup, commit, push, or deployment occurred.
- **Handoff:** bounded R2 acceptance review is closed as recorded in CHECKPOINT-25. Further work outside this accepted scope requires its own authorization.

### 2026-09-30 — R3-T09 independent review and bounded handoff

- **Task / authorization:** `TASK-SEA-R3-TEST-009`. Independent review input was HEAD `946f13a25baec27a7124a329ae4dcf3334ca43c3`. After reviewing the report and the `CONTINUE WITH APPROVAL` recommendation, the user replied `продовжуй`; this authorized the bounded append-only evidence/runbook and new-checkpoint closeout and selected `CONTINUE WITH APPROVAL`.
- **Review result:** fresh read-only reviewer found no static contract-to-test mismatch in T01–T03 or T05–T07. T04 is a confirmed test-coverage gap: current 100-item assertions do not prove all returned MMSIs are distinct and equal the submitted set. Inspection of the collector found no product behavior defect. No remediation was made.
- **Evidence boundary:** raw T02–T07 test outputs were unavailable; their recorded summaries do not independently verify execution. T01 `--list` establishes selection only. Test execution is `Unknown` to this review; no full-suite/build outcome is established. The review did not run tests, build, runtime, network/provider checks, or access secrets.
- **Disposition / artifacts:** bounded T09 handoff is `CONTINUE WITH APPROVAL`, not Sprint `DONE`. `E-SEA-093` records the static review and limitations; `docs/checkpoints/CHECKPOINT-26.md` records the handoff. Existing T04 gap remains unresolved and separately gated.
- **Worktree boundary:** preserved pre-existing `.idea/vcs.xml`, `TASK_SPEC.md`, and untracked `.mcp.json`; `.mcp.json` was not accessed. No source/test/config changes, staging, reset, cleanup, commit, push, or deployment occurred.
- **Documentation validation:** `git diff --check -- EVIDENCE.md RUNBOOK.md` passed with no output. Focused checks passed for trailing whitespace across EVIDENCE/RUNBOOK/CHECKPOINT-26, one E-SEA-093 record, required disposition/limitation fields, and all checkpoint local links.

### 2026-09-30 — Sprint 3 retrospective documentation reconciliation

- **Task / authorization:** `TASK-SEA-DOC-RETRO-001`. After reviewing its bounded contract, the user instructed `продовжуй`, authorizing one append-only retrospective record in EVIDENCE and one RUNBOOK entry. No Sprint 3 implementation scope was added.
- **Reconciled history:** E-SEA-094 maps T01–T08 to their existing `TASK_SPEC.md` records and distinguishes task-record summaries from Git artifact history. T01 records test selection only (21 Node-project and 24 Chromium-project tests); T02–T07 records targeted pass counts of 10, 13, 13, 15, 1, and 3. T06's old `HOLD` and later DEC-013 test-only revision, and T07's recorded browser-launch block followed by Chromium installation and targeted pass, remain visible as historical sequence rather than being rewritten. T08's unresolved T04 coverage finding is preserved. T09 remains documented in E-SEA-093 and CHECKPOINT-26.
- **Evidence boundary:** T02–T07 counts are task-record summaries; raw terminal output was not retained, so execution remains `Unknown` to this reconciliation. Git commits `d778844`, `f66ef56`, `cb5a8e7`, and `946f13a` corroborate repository planning/change history only, not test execution. T01 `--list` proves selection, not execution. No full-suite/build result is established; Sprint 3 is not declared `DONE`.
- **Changes / verification:** appended E-SEA-094 and this RUNBOOK reconciliation entry only. `git diff --check -- EVIDENCE.md RUNBOOK.md` passed with no output. Focused structural checks passed for unique IDs, append-only placement, required metadata/limitations, local links, whitespace, and claim-to-source traceability. No tests or build were run.
- **Worktree / operational boundary:** no edits to source, tests, configuration, prior task closeouts, E-SEA-093, the prior T09 RUNBOOK entry, or CHECKPOINT-26; no `.mcp.json` or secret access, provider/network activity, staging, commit, push, or deployment. Existing unrelated working-tree changes were preserved.
- **Handoff:** the prior T01–T08 task-record summaries are now indexed in the canonical retrospective evidence/history trail, with their verification limits explicit. Any T04 remediation, historical test rerun, or full-suite/build assessment requires its own reviewed bounded contract and explicit approval.

### 2026-09-30 — T04 complete MMSI-set assertion

- **Task / authorization:** `TASK-SEA-R3-T04-COVERAGE-001`. The user approved the Draft contract, separately approved the test-only diff before execution, and after review of the observed result instructed `продовжуй` to authorize factual closeout records.
- **Change / verification:** updated only the existing 100-vessel case in `tests/snapshot-collector.spec.ts`; it now checks that the 100 returned MMSIs are distinct and their full set equals the 100 submitted MMSIs. `npx playwright test --project=node tests/snapshot-collector.spec.ts` passed all 15 tests in 591 ms. `git diff --check -- tests/snapshot-collector.spec.ts` passed with no output.
- **Outcome / evidence:** `TASK-SEA-R3-T04-COVERAGE-001` is `Verified` for this bounded test-only follow-up. `E-SEA-095` records the observed command, result, and limitations. No product behavior defect was established and no product source was changed.
- **Limitations:** only the focused Node collector spec ran. No full suite, build, runtime, provider/network check, secret access, or deployment occurred. Sprint 3 completion, full MVP acceptance, live-provider behavior, and release readiness remain unestablished by this task.
- **Worktree / operations:** post-run `git status --short` showed the authorized test file plus the pre-existing modified/untracked paths; no additional generated path was observed. No staging, commit, push, deployment, or destructive Git operation occurred. Existing `.mcp.json` remained unaccessed.
- **Handoff:** preserve the test diff and append-only records. Further test scope, product remediation, or broader verification requires a separate reviewed bounded contract and explicit approval.

### 2026-09-30 — Fresh targeted R3 execution evidence for T02, T06, and T07

- **Task / authorization:** `TASK-SEA-R3-EVIDENCE-REFRESH-001`. After review of its Draft contract, the user instructed `продовжуй`, authorizing the three listed targeted commands. After review of the results, the user instructed `продовжуй` to authorize this factual closeout.
- **T02:** `npx playwright test --project=node tests/position-report-transformer.spec.ts` — **PASS**, 10 passed (406 ms).
- **T06:** `npx playwright test --project=chromium tests/demo-movement.spec.ts` — **PASS**, 1 passed (809 ms test duration; 1.5 s total).
- **T07:** `npx playwright test --project=chromium tests/snapshot-interface.spec.ts --grep "R3 snapshot UI states"` — **PASS**, 3 passed (1.5 s total).
- **Evidence / outcome:** `E-SEA-096` records the observed commands and outcomes. `TASK-SEA-R3-EVIDENCE-REFRESH-001` is `Verified` for these fresh targeted runs. E-SEA-094's historical evidence limitation remains unchanged; these runs do not recreate the prior outputs.
- **Limitations:** no full suite, build, T01 execution, provider/network check, secret access, browser installation, or deployment occurred. These passes alone do not establish Sprint 3 `DONE`, full MVP acceptance, or release readiness. T09 status reconciliation remains out of scope.
- **Worktree / operations:** after the runs, status showed only the existing `.idea/vcs.xml` modification, `TASK_SPEC.md`, and untracked `.mcp.json`; no generated test path appeared. `.mcp.json` was not accessed. No commit or push was performed.
- **Handoff:** any further test execution, T09 status reconciliation, or broader validation requires a separate reviewed bounded contract and explicit authorization.

### 2026-09-30 — Post-T04 Sprint 3 evidence and gate reconciliation

- **Task / authorization:** `TASK-SEA-R3-GATE-RECONCILE-001`. After the current evidence matrix and bounded `DONE` recommendation were presented, the user instructed `виконуй`; the closeout records this as authorization for the listed documentation and selection of the recommended disposition.
- **Evidence review:** E-SEA-093/CHECKPOINT-26 accurately preserve the independent review state at their input revision, including the then-open T04 coverage gap. E-SEA-095 later records the exact test-only correction and fresh 15-test collector-spec pass. E-SEA-096 records fresh T02 (10), T06 (1), and T07 (3) targeted passes. T01 records Node/Chromium test selection (21/24), not test execution. No static review mismatch remains unresolved within the documented matrix.
- **Disposition / artifacts:** `DONE` for the bounded test-only Sprint 3 scope; no full MVP, release, or deployment claim. Appended E-SEA-097 and this RUNBOOK entry, updated only the gate-reconciliation task's own status/closeout in `TASK_SPEC.md`, and created CHECKPOINT-27. CHECKPOINT-26, E-SEA-093–096, SPRINT-03.md, DEC-012/DEC-013, and all T01–T09 status fields remain unchanged.
- **Limitations:** no full suite or build result; no live-provider/network behavior, broad user validation, full MVP acceptance, release readiness, or deployment readiness was established. No test or build command was run for this documentation closeout.
- **Worktree / operations:** preserved pre-existing `.idea/vcs.xml` and untracked `.mcp.json`; `.mcp.json` was not accessed. No source/test/config changes, secrets, staging, commit, push, deployment, or destructive Git operations.
- **Verification / handoff:** `git diff --check -- TASK_SPEC.md EVIDENCE.md RUNBOOK.md` produced no output; `git diff --no-index --check /dev/null docs/checkpoints/CHECKPOINT-27.md` produced no whitespace diagnostics (expected non-zero diff status for the new file). Focused checks passed for unique IDs, required checkpoint metadata, T01–T09 matrix coverage, append-only placement, and all checkpoint local links. No tests/build were run. Preserve historical evidence/checkpoints; any broader validation or scope change needs its own reviewed bounded contract and explicit authorization.

### 2026-10-02 — B-18 R4 UI state closeout and task handoff

- **Task / authorization:** `TASK-SEA-R4-B18-001`. The user approved the exact B-18 contract and, after reviewing the implementation/check results, instructed `continue B-18, далі R4 task breakdown`; B-18 is recorded as `Verified` for its bounded acceptance only.
- **Observed result:** `app/map-shell.tsx` was the only product path changed. `npx tsc --noEmit` passed; unchanged demo-movement and vessel-selection Playwright specs passed (2 total); the one-off mocked Chromium check passed for the B-18 response states, retention/replacement, selection behavior and response-body timestamps/count while blocking OSM tiles; scoped diff review and `git diff --check -- app/map-shell.tsx TASK_SPEC.md` passed. `E-SEA-098` records the observed details.
- **Deviation / limitations:** IDE lint and build were invoked outside the B-18 verification contract and are not counted as pass gates. The attempted `npm run dev -- --hostname 127.0.0.1` exited 1 although the existing endpoint responded; cause was not established. No B-19 suite, full suite/build, live provider, secrets, archive, deployment, or README checks were performed.
- **Handoff:** updated the R4 task register in `TASK_SPEC.md` against DEC-014. B-19 remains Draft and separately approval-gated; B-20/B-21 retain their prerequisites and unresolved inputs. No checkpoint, commit, or push was made. Preserve all pre-existing staged, modified and untracked paths; `.mcp.json` was not accessed.
- **Verification / recovery:** perform documentation-only ID/link/append-placement and scoped whitespace checks; no product tests/build are to be rerun for this closeout. Preserve append-only history; any factual correction requires a dated amendment. B-19 execution requires approval of its exact task contract.

### 2026-10-02 — B-20 automated gates and bounded secret comparison

- **Session / authorization:** B-20 (`TASK-SEA-R4-B20-001`) execution after the user approved the exact contract, authorized one manually initiated live-source attempt without retry, and approved a bounded in-memory comparison of the relevant `.env.local` key value. B-20 is Active; this entry is a partial execution checkpoint, not final acceptance.
- **Changed artifacts:** updated only B-20 approval/status/checkpoint content in `TASK_SPEC.md`; appended E-SEA-099 to `EVIDENCE.md` and this factual entry. No product or test files were edited.
- **Observed commands:** `npx playwright test` — PASS, 56 passed in 13.2 s; `npx tsc --noEmit` — PASS, no output; `npx next build` — PASS, Next.js 16.3.5/Turbopack with TypeScript and static page generation complete. These are the exact executed commands; no additional build/test command was run.
- **Secret boundary:** `.env.local` is not tracked. An inline one-off in-memory comparison emitted only `ENV_LOCAL_TRACKED=NO; WORKTREE=NO_MATCH; NEXT_STATIC=NO_MATCH`; no value was printed or written. The worktree scope used tracked and non-ignored untracked files, excluding `.env*`, `.mcp.json`, `.git`, `node_modules`, and `.next` except `.next/static`. `.mcp.json` was not accessed. No archive was inspected.
- **Pending / blockers:** the change request assigns the no-key UI interaction and the one live-source button attempt to the owner manually; neither observation has been supplied. Archive inspection remains blocked pending format, target, and permission. Do not mark B-20 Verified or infer live-source availability.
- **Recovery / handoff:** preserve all pre-existing staged, modified, and untracked paths. No product rollback is needed; do not use reset/checkout/broad cleanup. Owner to perform the no-key check, restore their local setup, then perform at most one live-source attempt and report only visible time/count or source unavailability. No commit, push, archive, publish, or deployment occurred. Evidence: E-SEA-099.

### 2026-10-02 — B-20 owner-reported manual checks

- **Disposition / source:** after the partial B-20 result was presented, the user selected `continue`, then reported `виконав, все працює коректно` after the requested no-key and single live-source manual sequence. No screenshot or exact display metadata was supplied.
- **Observed report / limits:** record the manual outcome only as a high-level user report. No-key UI details (exact message, retained demo set/source, and motion) were not individually enumerated. The live attempt's actual response time and vessel count, or an explicit source-unavailable result, remain unrecorded; do not infer them from the general report.
- **Status / evidence:** `E-SEA-100` records this report with final manual acceptance detail `UNKNOWN`. B-20 remains Active; archive inspection remains blocked pending format, target, and permission. Do not make another live request.
- **Handoff / recovery:** ask only for the missing displayed time and vessel count, or explicit unavailability, without requesting a key, `.env.local`, screenshot containing vessel details, or another attempt. Preserve existing staged/modified/untracked paths and append-only records; no commit, push, archive, publish, or deployment occurred.

### 2026-10-02 — B-20 live-result metadata follow-up

- **Source / observation:** the user supplied the live interface line `AISStream · знімок за 15 с · отримано 13:03:44 UTC · суден: 4 · вибірка неповна`, completing the previously missing response time/count for the one authorized attempt. The user also reported that after page reload the demo data appear again, and stated this was all available from the run.
- **Status / limits:** record the live result and reload behavior as owner-reported manual evidence in E-SEA-101. No second request was made; no key, vessel identifiers, screenshot, or raw response was received. The earlier E-SEA-100 remains accurate as the state before the follow-up; E-SEA-101 supplies the later metadata.
- **Handoff:** B-20 is ready for human review of the updated evidence/diff, with archive inspection still blocked pending format, target, and permission. Keep B-20 Active until disposition; no commit or push was performed.
