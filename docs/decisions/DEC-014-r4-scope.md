# DEC-014 — R4 product-scope change

- **ID:** `DEC-014-R4-SCOPE`
- **Version:** `1.0.0`
- **Status:** `Ready`
- **Product owner:** методист відділення теорії судноводіння навчального центру «Норд-Вест»
- **Delivery / technical owner:** виконавець проєкту
- **Date:** 2026-10-01
- **Related artifacts:** [`../../PROJECT_BRIEF.md`](../../PROJECT_BRIEF.md), [`../../SPEC.md`](../../SPEC.md), [`../../TASK_SPEC.md`](../../TASK_SPEC.md), [`../../SPRINT-03b-CHANGE-REQUEST.md`](../../SPRINT-03b-CHANGE-REQUEST.md), [`DEC-012-r3-scope.md`](DEC-012-r3-scope.md), [`DEC-013-r3-t06-demo-mode-test.md`](DEC-013-r3-t06-demo-mode-test.md), [`../sprints/README.md`](../sprints/README.md), [`../../EVIDENCE.md`](../../EVIDENCE.md), [`../../RUNBOOK.md`](../../RUNBOOK.md), [`../checkpoints/CHECKPOINT-06.md`](../checkpoints/CHECKPOINT-06.md), `TASK-SEA-R4-GOV-001`

> **Approval and boundary:** On 2026-10-01, the user explicitly approved the R4 B-18–B-21 product scope and subsequently approved the exact `TASK-SEA-R4-GOV-001` governance synchronization contract with “продовжуй”. This decision authorizes the versioned governance synchronization in that task only. It does not authorize implementation, test execution, final acceptance, live-provider access, secret access, README command execution, checkpoint creation, archive work, publishing, deployment, commit, or push.

## Context and constraints

The change request `SPRINT-03b-CHANGE-REQUEST.md` records a changed requirement for US-06 and US-07 after classroom experience: when a snapshot attempt fails or returns no vessels, retain the displayed vessel set and its truthful source/time label, and separately report the latest attempt. Replace the displayed set only on a nonempty successful response. It also specifies browser acceptance cases, final acceptance, and an installation/start handoff for a second laptop.

The approved baseline in `PROJECT_BRIEF.md` v1.0.0 and `SPEC.md` v1.6.0 predates this change. Their change-control rules require new synchronized versions and a linked decision before work under a changed product contract. `DEC-012` remains limited to its bounded R3/US-09 verification plan; it is not amended by this record. Each technical task remains separately gated by its own reviewed task contract and explicit approval.

The request calls the work a Sprint 03 change request and an R4 release, while the sprint catalog records Sprint 3 as R3 and Sprint 2 as Unknown. No canonical sprint assignment for this R4 change is established. The second laptop's operating system and the archive format, publication target, and recovery owner are also unspecified.

## Options considered

1. **Keep the prior US-06/US-07 contract unchanged.** Rejected: the product owner explicitly approved the changed R4 behavior after the reported classroom experience.
2. **Treat scope approval as authorization to implement and accept all B-18–B-21 work.** Rejected: a scope decision is not a task contract or execution approval; implementation and acceptance require their own bounded contracts and explicit approvals.
3. **Formalize the approved product change in versioned brief/SPEC documents and this decision, while retaining separate task gates and unresolved delivery inputs.** **Selected.** This records the approved outcome without assigning a sprint, inferring platform/archive details, or claiming execution or evidence.

## Decision and rationale

Approve the following R4 product-contract change:

- The displayed vessel set and its source label/time are independent from the result of the latest attempt.
- Before the first attempt, no attempt-result row is shown; the initial displayed set is demo data.
- While a request is loading, retain the displayed set/source, continue demo movement, disable the request button, and show the loading attempt status.
- Empty and failed attempts retain the displayed set/source. Their separate attempt status uses the response-body timestamp (`collectedAt` for empty results, `attemptedAt` for structured errors); a missing or unparseable body uses the specified no-response text without inventing a time.
- Only a nonempty successful response replaces the displayed set and source label. A selected vessel is updated if its ID remains in the new set; otherwise selection/card are cleared. Preserve the specified first-success map reset and subsequent viewport behavior.
- Page reload restores demo data and the persistent notice explains this. R4 does not introduce merging, history, persistence between reloads, timed refresh, monitoring, or claims of area completeness.
- US-10 retains the installation/start handoff requirement. Its second-laptop OS or cross-platform target must be resolved in the separate B-21 task contract.

The B-18 UI implementation, B-19 browser tests, B-20 final acceptance, and B-21 README work remain **separately task-gated**. This decision neither authorizes their execution nor establishes that any criterion passed. No stack, dependency, or architecture change is selected.

**Release/sprint mapping:** `Unknown`. Do not classify this as Sprint 3b or Sprint 4 and do not change the sprint catalog until the product owner resolves the assignment.

## Consequences, risks, and deferred work

- `PROJECT_BRIEF.md` and `SPEC.md` may be versioned to reflect this approved contract; those edits must remain consistent with this decision.
- DEC-012, DEC-013, prior sprint records, and historical checkpoints remain unchanged.
- The user selected `-3b` as a preferred suffix for a future R4 checkpoint, but the checkpoint path/ID still must be checked against DEC-004's sequential convention and the existing checkpoint sequence in a separately approved closeout contract. No checkpoint is created here.
- Live-provider attempts and any credential/secret operation require a later exact task and explicit safe authorization. Secret values must never be printed or stored.
- Archive format, destination/publication target, and recovery ownership remain `Waiting for input`; no archive is created, inspected, or published.
- No EVIDENCE or RUNBOOK entry is created by this decision: it records an approved contract, not an observed implementation or verification result.

## Verification / revisit trigger

For this governance synchronization, verify that the versioned brief and SPEC, this decision, and the decision index agree; links and IDs resolve uniquely; sprint assignment and deferred inputs remain marked `Unknown`/`Waiting for input`; and no wording implies implementation, test, provider, or acceptance results. Do not run product tests/build or provider/secret checks under this record.

Revisit this decision only if the product owner changes the approved R4 behavior or its non-goals, resolves the R4 sprint assignment or laptop platform, approves archive handling, or proposes a stack/architecture change requiring a separate decision.

## Linked task and evidence boundary

- **Scope synchronization task:** `TASK-SEA-R4-GOV-001` defines the allowed documentation paths and acceptance checks for this governance slice.
- **Downstream tasks:** B-18, B-19, B-20, and B-21 remain separate and require exact task-contract approval before execution.
- **Evidence:** none at decision creation. No implementation or acceptance is established by this decision.
- **Operational history:** append a RUNBOOK handoff only after authorized factual verification; do not rewrite prior records.
