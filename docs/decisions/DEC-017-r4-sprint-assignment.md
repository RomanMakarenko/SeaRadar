# DEC-017 — R4 Sprint 3b assignment

- **ID:** `DEC-017-R4-SPRINT-ASSIGNMENT`
- **Version:** `1.0.0`
- **Status:** `Ready`
- **Product owner:** методист відділення теорії судноводіння навчального центру «Норд-Вест»
- **Delivery / technical owner:** виконавець проєкту
- **Date:** 2026-10-03
- **Related artifacts:** [`../../TASK_SPEC.md`](../../TASK_SPEC.md), [`DEC-014-r4-scope.md`](DEC-014-r4-scope.md), [`DEC-015-r4-archive-gate-deferral.md`](DEC-015-r4-archive-gate-deferral.md), [`README.md`](README.md), [`../sprints/README.md`](../sprints/README.md), [`../../SPRINT-03b-CHANGE-REQUEST.md`](../../SPRINT-03b-CHANGE-REQUEST.md), [`../../EVIDENCE.md`](../../EVIDENCE.md), [`../../RUNBOOK.md`](../../RUNBOOK.md)

> **Approval and boundary:** On 2026-10-03, the product owner explicitly confirmed: “Підтверджую: зафіксуй моє рішення R4 у Sprint 3b в DEC-017”. This decision records the R4-to-Sprint-3b assignment. It does not approve the revised checkpoint task or authorize checkpoint creation.

## Context and constraints

DEC-014 approved the R4 product-contract change but left its release-to-sprint mapping `Unknown`. DEC-015 deferred archive inspection from the current B-20 closeout gate without passing or permanently waiving archive work. The product owner has now resolved only the sprint-assignment input by explicitly assigning R4 to Sprint 3b.

The assignment is distinct from a Sprint 3b plan or implementation authorization. Sprint 3b has no canonical sprint plan in this record. R4 implementation slices remain task-gated; the final checkpoint requires approval of its exact revised task contract. Archive format, destination/target, permission, and recovery ownership remain unresolved under DEC-015.

## Options considered

1. **Assign R4 to Sprint 3b. Selected.** This directly records the product owner's explicit assignment.
2. **Assign R4 to Sprint 4. Rejected.** This conflicts with the owner's stated assignment.
3. **Leave the assignment `Unknown`. Rejected.** The owner has now supplied the missing assignment input; retaining `Unknown` would contradict the explicit confirmation.

## Decision and rationale

R4 is assigned to Sprint 3b. This decision resolves the `R4 release-to-sprint assignment` pending item carried in the decision index and supersedes only that `Unknown` status from DEC-014; DEC-014 remains unchanged as the historical product-scope decision.

This assignment does not create or approve a Sprint 3b plan, alter R4 product scope, authorize implementation or test execution, establish final R4 acceptance, or imply release/deployment readiness. It does not create `CHECKPOINT-28.md`; the checkpoint task must first be revised to reflect this decision and receive fresh explicit approval. It does not change DEC-015's archive deferral.

## Consequences, risks, and deferred work

- The decision index lists DEC-017 and resolves only the R4 assignment pending item.
- The sprint catalog lists the Sprint 3b/R4 mapping as assignment-only and states that no Sprint 3b plan has been created. The catalog entry is not a substitute for the required sprint contract.
- `TASK-SEA-R4-CHECKPOINT-001` is revised to v1.1.0 to link this decision and reflect Sprint 3b. The revised exact task contract remains Draft pending fresh explicit approval.
- Preserve existing B-18–B-21 evidence classes and limitations. Owner-reported confirmation is not independent command-by-command verification or second-laptop validation.
- Archive work remains deferred and separately gated; no archive is created, read, inspected, packaged, or published.

## Verification / revisit trigger

Verify that the decision index, assignment-only catalog entry if present, and revised checkpoint task consistently state R4 → Sprint 3b; local links and IDs resolve uniquely; no Sprint 3b plan or checkpoint file is created; and DEC-015's archive boundary and other unresolved inputs remain intact. These documentation checks do not re-run product tests or establish R4 acceptance.

Revisit this decision only if the product owner changes the R4 sprint assignment or separately approves a Sprint 3b plan/scope requiring its own bounded contract.

## Linked task and evidence boundary

- **Assignment synchronization task:** [`TASK-SEA-R4-ASSIGN-001`](../../TASK_SPEC.md) records the bounded documentation paths and checks.
- **Checkpoint task:** [`TASK-SEA-R4-CHECKPOINT-001`](../../TASK_SPEC.md) v1.1.0 cites this decision and requires fresh explicit approval before checkpoint creation.
- **Evidence:** no new EVIDENCE or RUNBOOK result is created by this decision. The owner's assignment is the decision input; it is not independent verification of implementation or tests.
