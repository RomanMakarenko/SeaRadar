# RUNBOOK.md — delivery history and handoff

- **ID:** `RUNBOOK-SEA-001`
- **Version:** `0.9.0`
- **Status:** `Verified`
- **Product owner:** методист відділення теорії судноводіння навчального центру «Норд-Вест»
- **Delivery / technical owner:** виконавець проєкту
- **Date:** 2026-09-23
- **Related artifacts:** [`CLAUDE.md`](CLAUDE.md), [`PROJECT_BRIEF.md`](PROJECT_BRIEF.md), [`SPEC.md`](SPEC.md), [`TASK_SPEC.md`](TASK_SPEC.md), [`SPRINT-01.md`](SPRINT-01.md), [`EVIDENCE.md`](EVIDENCE.md), [`docs/decisions/DEC-001-mvp-contract.md`](docs/decisions/DEC-001-mvp-contract.md), [`docs/decisions/DEC-002-r1-stack.md`](docs/decisions/DEC-002-r1-stack.md), [`docs/decisions/DEC-005-r1-node22.md`](docs/decisions/DEC-005-r1-node22.md)

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
