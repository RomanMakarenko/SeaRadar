# Project documentation

- **ID:** `DOCS-SEA-001`
- **Version:** `0.2.0`
- **Status:** `Ready`
- **Product owner:** методист відділення теорії судноводіння навчального центру «Норд-Вест»
- **Delivery / technical owner:** виконавець проєкту
- **Date:** 2026-09-22
- **Related artifacts:** [`../CLAUDE.md`](../CLAUDE.md), [`../PROJECT_BRIEF.md`](../PROJECT_BRIEF.md), [`../SPEC.md`](../SPEC.md), [`../TASK_SPEC.md`](../TASK_SPEC.md), [`../EVIDENCE.md`](../EVIDENCE.md), [`../RUNBOOK.md`](../RUNBOOK.md), [`sprints/README.md`](sprints/README.md), [`decisions/README.md`](decisions/README.md)

## Canonical records

- [`../CLAUDE.md`](../CLAUDE.md) — stable rules for AI-assisted work and artifact governance.
- [`../PROJECT_BRIEF.md`](../PROJECT_BRIEF.md) — approved but changeable customer MVP baseline.
- [`../SPEC.md`](../SPEC.md) — durable project contract derived from the approved brief.
- [`../TASK_SPEC.md`](../TASK_SPEC.md) — current bounded task contract.
- [`../EVIDENCE.md`](../EVIDENCE.md) — append-only factual verification ledger.
- [`../RUNBOOK.md`](../RUNBOOK.md) — append-only delivery history and handoff.
- [`../SPRINT-01.md`](../SPRINT-01.md) — only currently detailed sprint/release record, R1.
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

The MVP contract and R1 baseline are approved for governance purposes. Product implementation is not yet verified and remains gated by an active bounded `TASK_SPEC.md`, a human diff checkpoint and fresh evidence. Sprint 2 and Sprint 3 plans remain intentionally absent and are `Waiting for input`.
