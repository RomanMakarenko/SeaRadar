# CHECKPOINT-01 — R1 decomposition and session handoff

- **ID:** `CHECKPOINT-SEA-R1-001`
- **Version:** `1.0.1`
- **Status:** `Ready`
- **Product owner:** методист відділення теорії судноводіння навчального центру «Норд-Вест»
- **Delivery / technical owner:** виконавець проєкту
- **Date:** 2026-09-22
- **Related artifacts:** [`../../SPEC.md`](../../SPEC.md), [`../../TASK_SPEC.md`](../../TASK_SPEC.md), [`../../SPRINT-01.md`](../../SPRINT-01.md), [`../../EVIDENCE.md`](../../EVIDENCE.md), [`../../RUNBOOK.md`](../../RUNBOOK.md), [`../decisions/DEC-003-r1-handoff.md`](../decisions/DEC-003-r1-handoff.md), [`../decisions/DEC-004-checkpoint-convention.md`](../decisions/DEC-004-checkpoint-convention.md)

## Checkpoint purpose

Restart the next Claude Code session from the approved R1 decomposition and handoff strategy without replaying the current chat. This checkpoint covers documentation and planning only. No product implementation has started.

## State at checkpoint

- **Last confirmed commit:** `41db3d7` — governance artifacts aligned with the approved MVP baseline.
- **Current task:** `TASK-SEA-R1-DECOMP-001` — documentation-only decomposition, diff review and restart checkpoint.
- **Sprint state:** R1 / Sprint 1 is the only detailed sprint; B-01…B-07 are decomposed into seven named sessions.
- **Next authorized action:** after product-owner review, create a separate task contract for `R1-B01-SCAFFOLD`.
- **Implementation state:** no product source, package manifest, lockfile, dependency, runtime or browser test was added by this task.

## What was recorded

- `SPRINT-01.md` now contains session contracts for:
  - `R1-B01-SCAFFOLD`
  - `R1-B02-MAP`
  - `R1-B03-VESSEL-MODEL`
  - `R1-B04-VESSEL-CARD`
  - `R1-B05-DEMO-ROUTES`
  - `R1-B06-MOTION`
  - `R1-B07-PLAYWRIGHT-SELECTION`
- Handoff protocol is canonicalized across `SPRINT-01.md`, `TASK_SPEC.md`, `EVIDENCE.md` and `RUNBOOK.md`.
- `DEC-003-R1-HANDOFF` records the handoff strategy.
- `DEC-004-CHECKPOINT-CONVENTION` records `docs/checkpoints/CHECKPOINT-0N.md` as the restart-record path.
- `E-SEA-004` records the decomposition validation.
- `E-SEA-005` records the selected diff review and final scoped checkpoint validation.

## Diff review

- **Reviewed tracked paths:** `EVIDENCE.md`, `RUNBOOK.md`, `SPEC.md`, `SPRINT-01.md`, `TASK_SPEC.md`, `docs/decisions/README.md`.
- **Selected new paths for this checkpoint:** `docs/decisions/DEC-003-r1-handoff.md`, `docs/decisions/DEC-004-checkpoint-convention.md`, this file.
- **Diff check:** `git diff --check` — `PASS`.
- **Scope check:** tracked diff contains no unexpected paths; no product implementation paths changed.
- **User-declared manual inputs, not task output:** `reference/` was manually added with a React example project and TypeScript pattern references; `.agents/skills/shadcn` was manually installed; the Feature-Sliced skill was installed from `https://github.com/feature-sliced/skills.git` (local installation path not independently verified).
- **Other untracked paths explicitly excluded:** `.agents/` except the user-declared skill path, `.claude/`, `skills-lock.json`, `TASK_INITIAL.md` and `TASK_DECOMPOSE.md`.
- **Review limitation:** the selected documentation changes are reviewed for scope and consistency; the manually added references and skills are recorded as user inputs but not audited or used by this task; product behavior, build, tests, deployment and user validation were not run.

## Verification and evidence

- **Commands actually run:** `git diff --check`; `git status --short`; `git diff --name-only`; `git diff --stat`; scoped Python checkpoint/metadata/link/scope validator.
- **Observed:** whitespace check passed; tracked changes were limited to the six listed governance files; user-declared manual inputs and other untracked paths were visible and excluded; the checkpoint path exists; scoped validation passed. A broader scan found an unrelated `/LICENSE` reference under excluded untracked `reference/`.
- **Evidence:** `E-SEA-004` for decomposition and `E-SEA-005` for the selected diff review and scoped checkpoint validation.
- **Status boundary:** this checkpoint does not claim that any B-01…B-07 planned check has passed.

## Unknowns and blockers

- Product-owner review of the selected diff and this checkpoint is pending.
- R1 implementation, dependencies, build, tests and runtime evidence do not exist yet.
- Checkpoint archive/publication format is not approved; only this Markdown restart record is authorized.
- User-declared `reference/` and `.agents/skills/shadcn` are manual inputs, not task output; they require separate review before use or commit. The Feature-Sliced skill source is user-declared from `https://github.com/feature-sliced/skills.git`; local path is not independently verified.
- `.claude/`, `skills-lock.json`, `TASK_INITIAL.md` and `TASK_DECOMPOSE.md` remain outside this task and require separate review before any commit.
- AISStream terms, quantitative metrics, S2/S3 scope and architecture beyond R1 remain Unknown or Needs verification.

## Rollback / recovery

Return to commit `41db3d7` after inspecting the diff if this planning/checkpoint slice is rejected. Do not delete unrelated untracked paths. If the next session finds the checkpoint stale, append a superseding checkpoint rather than rewriting this record.

## Next-session handoff

1. Read this checkpoint completely.
2. Read the latest `TASK_SPEC.md`, `SPRINT-01.md`, `EVIDENCE.md` and `RUNBOOK.md`.
3. Wait for the product-owner decision: `continue`, `revise` or `HOLD`.
4. If `continue`, create a new task contract for `R1-B01-SCAFFOLD`; do not implement from this checkpoint alone.
5. At the end of B-01, append evidence and RUNBOOK handoff, review the diff, then create the next checkpoint only if accepted.
