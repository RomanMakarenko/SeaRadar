# Sprint planning convention

- **ID:** `SPRINT-GOV-001`
- **Version:** `0.2.0`
- **Status:** `Ready`
- **Product owner:** методист відділення теорії судноводіння навчального центру «Норд-Вест»
- **Delivery / technical owner:** виконавець проєкту
- **Date:** 2026-09-22
- **Related artifacts:** [`../../SPEC.md`](../../SPEC.md), [`../../TASK_SPEC.md`](../../TASK_SPEC.md), [`../../SPRINT-01.md`](../../SPRINT-01.md), [`../decisions/DEC-001-mvp-contract.md`](../decisions/DEC-001-mvp-contract.md), [`../decisions/DEC-002-r1-stack.md`](../decisions/DEC-002-r1-stack.md), [`../../EVIDENCE.md`](../../EVIDENCE.md), [`../../RUNBOOK.md`](../../RUNBOOK.md)

## Boundary

The approved MVP baseline currently has one detailed sprint record: root-level [`SPRINT-01.md`](../../SPRINT-01.md), release R1. Sprint 2 and Sprint 3 are intentionally absent and remain `Unknown` / `Waiting for input`; their tasks, dates, owners and outcomes must not be inferred from the high-level three-sprint statement.

## Required sprint contract

Each future `S1`, `S2` or `S3` record must contain:

- one observable outcome and explicit non-goals;
- linked SPEC and task IDs;
- ordered small slices with owner, input and expected output;
- allowed/affected paths and dependencies;
- verification command or manual check for every slice;
- checkpoint after each slice and human diff review;
- blocking vs advisory demo checks;
- readiness assumptions, safe fixtures, fallback and blocking Unknowns;
- rollback/recovery path;
- exit decision: `DONE`, `CONTINUE WITH APPROVAL` or `HOLD`;
- evidence links and a RUNBOOK handoff, including on `HOLD`.

## Current catalog

| Sprint | Release | Status | Canonical record |
|---|---|---|---|
| Sprint 1 | R1 | `Ready` | [`../../SPRINT-01.md`](../../SPRINT-01.md) |
| Sprint 2 | Unknown | `Waiting for input` | Not created |
| Sprint 3 | Unknown | `Waiting for input` | Not created |

## Creation gate

Create future sprint files only when the product owner approves the corresponding MVP outcome, scope, success signal, stack/architecture implications and task boundaries. Do not fill dates, tasks or technical choices from assumptions.
