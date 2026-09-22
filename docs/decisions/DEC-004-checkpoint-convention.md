# DEC-004 — restart checkpoint record convention

- **ID:** `DEC-004-CHECKPOINT-CONVENTION`
- **Version:** `1.0.0`
- **Status:** `Ready`
- **Product owner:** методист відділення теорії судноводіння навчального центру «Норд-Вест»
- **Delivery / technical owner:** виконавець проєкту
- **Date:** 2026-09-22
- **Related artifacts:** [`../../SPEC.md`](../../SPEC.md), [`../../TASK_SPEC.md`](../../TASK_SPEC.md), [`../../SPRINT-01.md`](../../SPRINT-01.md), [`../../EVIDENCE.md`](../../EVIDENCE.md), [`../../RUNBOOK.md`](../../RUNBOOK.md), [`DEC-003-r1-handoff.md`](DEC-003-r1-handoff.md), [`../checkpoints/CHECKPOINT-01.md`](../checkpoints/CHECKPOINT-01.md)

## Context and constraints

The user requested a diff review and a restartable checkpoint before restarting the Claude Code session. `SPRINT-01.md` already describes checkpoint records, while the repository previously had no `docs/checkpoints/` directory or approved record path. A checkpoint must preserve facts and handoff without claiming that product implementation or planned checks were executed.

## Options considered

1. **Keep checkpoint information only in chat or RUNBOOK.** Rejected because a restart needs one discoverable bounded record, while RUNBOOK remains the append-only operational history.
2. **Create a canonical Markdown record at `docs/checkpoints/CHECKPOINT-0N.md` for each accepted slice.** **Selected.** It matches the existing Sprint 1 convention and keeps checkpoint content separate from evidence and delivery history.
3. **Create a checkpoint archive or publish it externally now.** Deferred; archive format, publication and recovery ownership require separate authorization and are not needed for this restart.

## Decision and rationale

Use `docs/checkpoints/CHECKPOINT-0N.md` as the canonical restart record path. `CHECKPOINT-01.md` captures the current documentation/decomposition state and points to the next bounded task. Each checkpoint must include metadata, scope/status, changed files, checks actually run, evidence IDs, limitations, unresolved Unknowns, rollback/recovery, handoff and the explicit next action.

A checkpoint is not evidence by itself: commands and observations must also be represented in `EVIDENCE.md`. A checkpoint is not a commit, archive, deployment authorization or product acceptance unless those are separately recorded and authorized.

## Consequences, risks and deferred work

- A new session can restart from one small record without replaying the chat.
- `docs/checkpoints/` becomes an approved canonical documentation path; no duplicate checkpoint naming should be introduced.
- Archive packaging, publication, retention and owner approval remain deferred.
- The checkpoint must list unrelated untracked paths as excluded when they have not been reviewed.

## Verification / revisit trigger

Verify the convention at the first R1 implementation checkpoint by confirming that the next session can start from the record and that no planned check is mistaken for observed evidence. Supersede this decision if the product owner approves another checkpoint format or publication workflow.
