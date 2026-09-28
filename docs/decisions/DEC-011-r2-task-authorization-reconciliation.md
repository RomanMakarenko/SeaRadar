# DEC-011 — R2 task authorization chronology reconciliation

- **ID:** `DEC-011-R2-TASK-AUTHORIZATION-RECONCILIATION`
- **Version:** `1.0.0`
- **Status:** `Ready`
- **Product owner:** методист відділення теорії судноводіння навчального центру «Норд-Вест»
- **Delivery / technical owner:** виконавець проєкту
- **Date:** 2026-09-27
- **Related artifacts:** [`../../SPEC.md`](../../SPEC.md), [`../../TASK_SPEC.md`](../../TASK_SPEC.md), [`../../EVIDENCE.md`](../../EVIDENCE.md), [`../../RUNBOOK.md`](../../RUNBOOK.md), [`DEC-009-r2-current-task-status.md`](DEC-009-r2-current-task-status.md), [`DEC-010-r2-sparse-snapshot-demo-fallback.md`](DEC-010-r2-sparse-snapshot-demo-fallback.md), `TASK-SEA-R2-B14-MIXED-VESSELS-001`, `TASK-SEA-R2-B14-REVIEW-001`, `TASK-SEA-R2-B14-SPEC-STATUS-001`, `E-SEA-078`.

> **Approval:** The user explicitly approved the bounded documentation task `TASK-SEA-R2-B14-SPEC-STATUS-001` with `continue B14-SPEC-STATUS-001`. This decision reconciles chronology only; it grants no new product scope, implementation, diagnostic, provider, or release authorization.

## Context and constraints

`DEC-009` was approved on 2026-09-25 and accurately recorded that no successor R2 technical task had then been authorized. Its task contract limited that decision to clarifying the authorization status at that point; it did not preclude a later, separately approved bounded task. Subsequently, the product owner approved `DEC-010` and `TASK-SEA-R2-B14-MIXED-VESSELS-001`, authorizing only the specified sparse-snapshot UI change. The B-14 implementation remains under its separate final review gate.

The current SPEC wording at approval time continued to state without a date qualifier that no R2 technical task was currently authorized, while another SPEC section already named the later DEC-010/B-14 authorization. The B-14 review identified this as a present-tense governance contradiction. This record reconciles the timeline and does not alter DEC-009 or DEC-010.

## Options considered

1. **Keep the present-tense SPEC claims and treat the mismatch as harmless.** Rejected: the canonical contract would simultaneously deny and describe the later approved B-14 authorization.
2. **Rewrite or supersede DEC-009.** Rejected: DEC-009 remains a valid historical record of the authorization state when approved; its history must not be rewritten to reflect later approvals.
3. **Clarify the decision chronology in a new decision record and update the linked SPEC version, leaving DEC-009 and DEC-010 unchanged.** **Selected.** This makes the bounded later B-14 authorization explicit while preserving the rule that no other R2 task is authorized by inference.

## Decision and rationale

As of its 2026-09-25 approval, DEC-009 recorded that no successor R2 implementation or diagnostic task was authorized. Later, DEC-010 and the separately approved B-14 task contract authorized only the sparse-snapshot UI slice. That task's final review remains separate and open until its finding is resolved and its review disposition is recorded.

No other R2 implementation or diagnostic work is authorized by DEC-010, this record, or the B-14 approval. Any other R2 technical task requires its own reviewed bounded contract and explicit approval. This decision does not establish B-14 acceptance, full Sprint 2 acceptance, release readiness, live provider behavior, or user validation.

## Consequences, risks, and deferred work

- `DEC-009` and `DEC-010` remain unchanged and retain their original meaning and dates.
- `SPEC.md` version 1.4.0 distinguishes the DEC-009 state at its approval date from the later, narrowly scoped B-14 authorization.
- The B-14 implementation review remains open; this record does not close it or authorize CHECKPOINT-24.
- Other R2 work, live/provider activity, and overall Sprint 2 acceptance remain separately task-gated or unverified.
- The stale statements in other documents, including the Sprint retrospective and Sprint plan, are outside this decision's allowed paths and remain deferred.

## Verification / revisit trigger

Verify SPEC metadata, DEC-011 links and decision-index entry, the dated authorization wording, and that no additional R2 scope was introduced. Revisit only if the product owner approves another R2 task or changes the scope/authorization boundary. Record factual verification in `E-SEA-078` and `RUNBOOK.md`; these records do not establish product acceptance.

## Linked task and evidence boundary

- **Task / authorization:** `TASK-SEA-R2-B14-SPEC-STATUS-001`; the explicit approval is limited to the SPEC/decision chronology correction specified there.
- **Review finding:** `TASK-SEA-R2-B14-REVIEW-001` identified the contradiction at `SPEC.md:85` and `SPEC.md:107`; B-14 review is not marked passing by this decision.
- **Evidence:** `E-SEA-078` records the documentation diff and structural checks only after they are actually run.
- **Operational history:** `RUNBOOK.md` records the factual execution and handoff; no tests/build/provider activity is implied.
