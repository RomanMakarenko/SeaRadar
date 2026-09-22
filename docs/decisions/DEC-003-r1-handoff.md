# DEC-003 — R1 bounded-session handoff strategy

- **ID:** `DEC-003-R1-HANDOFF`
- **Version:** `1.0.0`
- **Status:** `Ready`
- **Product owner:** методист відділення теорії судноводіння навчального центру «Норд-Вест»
- **Delivery / technical owner:** виконавець проєкту
- **Date:** 2026-09-22
- **Related artifacts:** [`../../SPEC.md`](../../SPEC.md), [`../../TASK_SPEC.md`](../../TASK_SPEC.md), [`../../SPRINT-01.md`](../../SPRINT-01.md), [`../../EVIDENCE.md`](../../EVIDENCE.md), [`../../RUNBOOK.md`](../../RUNBOOK.md), [`DEC-001-mvp-contract.md`](DEC-001-mvp-contract.md), [`DEC-002-r1-stack.md`](DEC-002-r1-stack.md)

## Context and constraints

Sprint 1 contains seven backlog slices B-01…B-07. The work is conducted across separate Claude Code sessions, so the next session needs enough verified context without replaying the full conversation. The project requires bounded tasks, human checkpoints, append-only evidence and an explicit handoff.

Constraints: reduce context repetition without losing facts; do not treat plans as evidence; use canonical artifacts; keep implementation and future-sprint scope out of this documentation decision.

## Options considered

1. **Carry the complete conversation into every session.** Rejected as inefficient and difficult to audit; chat is not a canonical project record.
2. **Use a short canonical handoff across `SPRINT-01.md`, `TASK_SPEC.md`, `EVIDENCE.md` and `RUNBOOK.md`.** **Selected.** This keeps the next session focused on one bounded slice while preserving plan, contract, facts and operational history in their designated artifacts.
3. **Create a separate transcript/checkpoint directory for every session.** Deferred; no such canonical path is currently approved, and it would duplicate the roles of the existing artifacts.

## Decision and protocol

Use one named bounded session per R1 slice:

- `R1-B01-SCAFFOLD`
- `R1-B02-MAP`
- `R1-B03-VESSEL-MODEL`
- `R1-B04-VESSEL-CARD`
- `R1-B05-DEMO-ROUTES`
- `R1-B06-MOTION`
- `R1-B07-PLAYWRIGHT-SELECTION`

At session start, read the latest sprint contract, current `TASK_SPEC.md`, relevant evidence and the last RUNBOOK handoff. Before edits, confirm task ID, goal, allowed paths, non-goals and targeted check. At session end, record only:

- actual changed files;
- commands/manual checks actually run and their status;
- evidence IDs and limitations;
- unresolved Unknowns or blockers;
- rollback/recovery path;
- next named session and its bounded starting point.

A handoff is complete only after the current session's diff is reviewed and the next task is explicit. A new session must not infer that a planned check passed merely because it appears in the decomposition.

## Consequences, risks and deferred work

- Context is smaller and every session has a clear entry and exit boundary.
- `RUNBOOK.md` remains operational history, `EVIDENCE.md` remains factual verification, `TASK_SPEC.md` remains the active contract, and `SPRINT-01.md` remains the plan.
- The protocol adds documentation discipline and requires a final human checkpoint at every slice.
- Session size may need adjustment if a slice proves too large or too small; this does not authorize scope expansion.
- Checkpoint archive format and path remain deferred to a separate decision.

## Verification / revisit trigger

Verify the protocol after the first R1 session by checking that its handoff can start the next session without replaying the chat and without confusing plan with evidence. Revisit this decision if handoffs omit required facts, cause scope drift, or the owner approves a different collaboration model.
