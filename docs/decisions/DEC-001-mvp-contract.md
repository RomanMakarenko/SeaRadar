# DEC-001 — approved MVP contract and R1 boundary

- **ID:** `DEC-001-MVP-CONTRACT`
- **Version:** `1.0.0`
- **Status:** `Ready`
- **Product owner:** методист відділення теорії судноводіння навчального центру «Норд-Вест»
- **Delivery / technical owner:** виконавець проєкту
- **Date:** 2026-09-22
- **Related artifacts:** [`PROJECT_BRIEF.md`](../../PROJECT_BRIEF.md), [`SPEC.md`](../../SPEC.md), [`SPRINT-01.md`](../../SPRINT-01.md), [`TASK_SPEC.md`](../../TASK_SPEC.md), [`EVIDENCE.md`](../../EVIDENCE.md), [`RUNBOOK.md`](../../RUNBOOK.md)

## Context and constraints

`PROJECT_BRIEF.md` contains the customer problem, primary user, user stories US-01…US-10, constraints and acceptance expectations for SeaRadar. The user confirmed in the clarification interaction on 2026-09-22 that it is the approved MVP specification, while allowing future changes. Only Sprint 1 / R1 is currently detailed; Sprint 2 and Sprint 3 must not be inferred from the brief's high-level three-sprint intent.

Constraints: preserve Unknowns; do not claim implementation, deployment, user validation or production readiness; use one canonical path per artifact; require bounded task contracts and human checkpoints.

## Options considered

1. **Keep the governance shell blocked until more MVP input arrives.** Rejected for the current baseline because the user explicitly approved `PROJECT_BRIEF.md` as the MVP specification.
2. **Use `PROJECT_BRIEF.md` as the approved, versioned MVP contract and detail only R1.** **Selected.** This reflects the user's clarification while preserving future change control and the absence of S2/S3 detail.
3. **Invent complete S2/S3 plans from the high-level three-sprint statement.** Deferred/rejected because no requirements, owners, dates or acceptance criteria for those sprints were supplied.

## Decision and rationale

`PROJECT_BRIEF.md` is the approved source baseline. `SPEC.md` mirrors its confirmed contract and is `Ready` at version 1.0.0. `SPRINT-01.md` is the only current detailed release plan. Product ownership belongs to the methodist role; delivery/technical ownership belongs to the executor role.

The brief remains changeable. A material change requires a new version of the brief and SPEC, a decision record, an updated bounded task contract and a new evidence/handoff trail before implementation against the changed scope.

## Consequences, risks and deferred work

- The project can proceed to an R1 implementation task without treating future sprint details as known.
- Product acceptance and technical delivery responsibilities are distinct.
- Quantitative metric baseline/target/window, AISStream service terms, S2/S3 scope and architecture beyond R1 remain `Unknown` or `Needs verification`.
- The current decision does not prove any runtime behavior or user validation.

## Verification / revisit trigger

Verify this decision at the human review of the governance diff and at each scope change. Supersede it with a new `DEC-<number>-...` record when the approved MVP contract, ownership model or release boundary changes.
