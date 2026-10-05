# DEC-015 — R4 archive-gate deferral

- **ID:** `DEC-015-R4-ARCHIVE-GATE-DEFERRAL`
- **Version:** `1.0.0`
- **Status:** `Ready`
- **Product owner:** методист відділення теорії судноводіння навчального центру «Норд-Вест»
- **Delivery / technical owner:** виконавець проєкту
- **Date:** 2026-10-02
- **Related artifacts:** [`../../CLAUDE.md`](../../CLAUDE.md), [`../../SPEC.md`](../../SPEC.md), [`../../TASK_SPEC.md`](../../TASK_SPEC.md), [`../../SPRINT-03b-CHANGE-REQUEST.md`](../../SPRINT-03b-CHANGE-REQUEST.md), [`DEC-014-r4-scope.md`](DEC-014-r4-scope.md), [`README.md`](README.md), [`../../EVIDENCE.md`](../../EVIDENCE.md), [`../../RUNBOOK.md`](../../RUNBOOK.md), [`../checkpoints/CHECKPOINT-06.md`](../checkpoints/CHECKPOINT-06.md)

> **Approval and boundary:** On 2026-10-02, the user requested approval of a scope change to defer the archive gate. This decision removes archive inspection from the current B-20 acceptance/closeout gate. It does not pass or permanently waive archive work, accept B-20, create or inspect an archive, create a checkpoint, or authorize B-21 or any other implementation.

## Context and constraints

B-20 recorded automated checks, bounded secret-boundary checks, and owner-reported manual outcomes. Its prior contract still listed inspection of an approved archive as a blocked gate pending archive format, target, permission, and recovery ownership. Those inputs remain unresolved. The user requested that the archive gate be deferred so the unresolved archive work does not continue to block the current B-20 closeout path.

DEC-014 remains unchanged: it approves the R4 product-contract change, not downstream implementation or acceptance, and the official sprint assignment remains `Unknown`. The existing `docs/checkpoints/CHECKPOINT-06.md` is an R2 checkpoint; it must not be reused or overwritten. No archive or checkpoint operation is in scope here.

## Options considered

1. **Keep archive inspection as a B-20 blocker and only postpone the inspection date.** Rejected: this would not implement the requested scope change; B-20 would remain blocked by the unresolved archive inputs.
2. **Remove archive inspection from current B-20/R4 closeout and record archive handling as deferred follow-up.** **Selected.** This allows B-20's remaining criteria and human disposition to be considered independently while preserving archive work as unresolved, separately gated work.
3. **Treat the deferral as a waiver or as proof of archive safety.** Rejected: no archive has been created or inspected, and the inputs needed for safe archive handling remain unknown.

## Decision and rationale

Defer archive inspection from the current B-20 acceptance/closeout gate. Archive format, destination/target, permission, and recovery ownership remain `Waiting for input`; they must be specified in a separately reviewed and explicitly approved future task or decision before archive work begins.

This decision does not change any other B-20 acceptance criterion or decide whether the remaining results are acceptable. B-20 remains subject to human review and disposition against its remaining criteria; it is not automatically `Verified`. B-21 remains `Draft` and requires accepted B-20 plus separate explicit approval of its exact task contract. No archive is created, read, inspected, packaged, or published under this decision.

## Consequences, risks, and deferred work

- The B-20 task contract is versioned to reflect that archive inspection is deferred rather than a current blocking acceptance gate.
- Deferred archive work is not passed, waived permanently, or supported by evidence. E-SEA-099–102 and prior RUNBOOK entries remain historical records of the earlier blocked state and are not rewritten.
- Do not start archive work until its format, destination/target, permission, and recovery owner are supplied and a bounded task is separately reviewed and approved.
- The unique R4 checkpoint ID/path remains unresolved; do not reuse the existing R2 `CHECKPOINT-06.md`.
- R4's official sprint assignment remains `Unknown`. This record does not assign R4 to Sprint 3b or Sprint 4.
- No product, test, README, provider, secret, deployment, commit, or push authorization is implied.

## Verification / revisit trigger

Verify that this decision, the decision index, and the current B-20 contract agree that archive inspection is deferred from current B-20 closeout, remains unresolved follow-up, and is neither passed nor permanently waived. Verify links and decision/task IDs resolve uniquely. Do not run product tests/build, provider/network, secret, archive, README-command, or deployment checks under this decision.

Revisit archive handling when the product owner supplies archive format, destination/target, permission, and recovery ownership and requests a separately bounded archive task. Revisit B-20 only through human review and disposition of its remaining acceptance criteria; archive deferral alone does not establish acceptance.

## Linked task and evidence boundary

- **Affected task:** [`TASK-SEA-R4-B20-001`](../../TASK_SPEC.md), updated to version `1.1.0` for this scope change.
- **Downstream task:** B-21 remains separately gated on accepted B-20 and approval of its exact contract.
- **Evidence:** no new evidence is created; this decision records a scope boundary, not an observed archive or runtime result.
- **Operational history:** no RUNBOOK entry is added for this decision alone.
