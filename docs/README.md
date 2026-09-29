# Project documentation

- **ID:** `DOCS-SEA-001`
- **Version:** `0.3.0`
- **Status:** `Ready`
- **Product owner:** методист відділення теорії судноводіння навчального центру «Норд-Вест»
- **Delivery / technical owner:** виконавець проєкту
- **Date:** 2026-09-29
- **Related artifacts:** [`../CLAUDE.md`](../CLAUDE.md), [`../PROJECT_BRIEF.md`](../PROJECT_BRIEF.md), [`../SPEC.md`](../SPEC.md), [`../TASK_SPEC.md`](../TASK_SPEC.md), [`../EVIDENCE.md`](../EVIDENCE.md), [`../RUNBOOK.md`](../RUNBOOK.md), [`sprints/README.md`](sprints/README.md), [`decisions/README.md`](decisions/README.md), [`../SPRINT-03.md`](../SPRINT-03.md), [`decisions/DEC-012-r3-scope.md`](decisions/DEC-012-r3-scope.md)

## Canonical records

- [`../CLAUDE.md`](../CLAUDE.md) — stable rules for AI-assisted work and artifact governance.
- [`../PROJECT_BRIEF.md`](../PROJECT_BRIEF.md) — approved but changeable customer MVP baseline.
- [`../SPEC.md`](../SPEC.md) — durable project contract derived from the approved brief.
- [`../TASK_SPEC.md`](../TASK_SPEC.md) — current bounded task contract.
- [`../EVIDENCE.md`](../EVIDENCE.md) — append-only factual verification ledger.
- [`../RUNBOOK.md`](../RUNBOOK.md) — append-only delivery history and handoff.
- [`../SPRINT-01.md`](../SPRINT-01.md) — verified R1 sprint record.
- [`../SPRINT-02.md`](../SPRINT-02.md) — bounded R2 sprint record; see its acceptance/checkpoint boundaries.
- [`../SPRINT-03.md`](../SPRINT-03.md) — approved R3/US-09 test plan; implementation slices remain task-gated.
- [`sprints/README.md`](sprints/README.md) — convention and catalog for current/future sprint plans.
- [`decisions/README.md`](decisions/README.md) — index and convention for material decisions.

## Working order

1. Read the current tree, `CLAUDE.md`, `PROJECT_BRIEF.md` and `SPEC.md`.
2. Record material product, scope, stack or architecture decisions in `docs/decisions/`.
3. Fill `TASK_SPEC.md` for one bounded slice before implementation.
4. Verify with targeted checks and record observed results in `EVIDENCE.md`.
5. Append the operational result and handoff to `RUNBOOK.md`.
6. Review the complete diff at the human checkpoint before marking the task `Verified`.

There is one canonical path per artifact. Templates and examples must not diverge from the canonical records. Changes to the approved brief or stack require a new versioned decision record and linked task contract.

## Current gate

The MVP contract and R1 baseline are approved; bounded R2 acceptance is recorded in CHECKPOINT-25. Sprint 3's US-09 test-only plan is authorized by DEC-012 and detailed in `SPRINT-03.md`; its technical slices remain gated by separate bounded task contracts, explicit approval, human diff checkpoints and fresh evidence. This plan does not establish US-09 execution, full MVP acceptance, release readiness or deployment.
