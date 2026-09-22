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
