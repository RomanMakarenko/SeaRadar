# RUNBOOK.md — delivery history and handoff

- **ID:** `RUNBOOK-SEA-001`
- **Version:** `0.2.0`
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
