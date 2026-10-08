# Decision records

- **ID:** `DECISIONS-GOV-001`
- **Version:** `1.4.0`
- **Status:** `Ready`
- **Product owner:** методист відділення теорії судноводіння навчального центру «Норд-Вест»
- **Delivery / technical owner:** виконавець проєкту
- **Date:** 2026-10-03
- **Related artifacts:** [`../../CLAUDE.md`](../../CLAUDE.md), [`../../SPEC.md`](../../SPEC.md), [`../../TASK_SPEC.md`](../../TASK_SPEC.md), [`../../SPRINT-03.md`](../../SPRINT-03.md), [`../../EVIDENCE.md`](../../EVIDENCE.md), [`../../RUNBOOK.md`](../../RUNBOOK.md), [`../checkpoints/CHECKPOINT-01.md`](../checkpoints/CHECKPOINT-01.md), [`DEC-001-mvp-contract.md`](DEC-001-mvp-contract.md), [`DEC-002-r1-stack.md`](DEC-002-r1-stack.md), [`DEC-003-r1-handoff.md`](DEC-003-r1-handoff.md), [`DEC-004-checkpoint-convention.md`](DEC-004-checkpoint-convention.md), [`DEC-005-r1-node22.md`](DEC-005-r1-node22.md), [`DEC-006-r2-scope.md`](DEC-006-r2-scope.md), [`DEC-009-r2-current-task-status.md`](DEC-009-r2-current-task-status.md), [`DEC-010-r2-sparse-snapshot-demo-fallback.md`](DEC-010-r2-sparse-snapshot-demo-fallback.md), [`DEC-011-r2-task-authorization-reconciliation.md`](DEC-011-r2-task-authorization-reconciliation.md), [`DEC-012-r3-scope.md`](DEC-012-r3-scope.md), [`DEC-013-r3-t06-demo-mode-test.md`](DEC-013-r3-t06-demo-mode-test.md), [`DEC-014-r4-scope.md`](DEC-014-r4-scope.md), [`DEC-015-r4-archive-gate-deferral.md`](DEC-015-r4-archive-gate-deferral.md), [`DEC-016-r4-node24-runtime.md`](DEC-016-r4-node24-runtime.md), [`DEC-017-r4-sprint-assignment.md`](DEC-017-r4-sprint-assignment.md)

## Decision record format

Create one record per material stack, architecture, integration or scope decision. Each record must include:

- decision ID, version, date, status and owner;
- context and constraints;
- options considered, including why an option was not selected;
- chosen option and rationale;
- consequences, risks and deferred work;
- verification or revisit trigger;
- linked SPEC, TASK, EVIDENCE and RUNBOOK records.

A catalog entry or chat statement is not a decision. Do not select a technology until the MVP constraints are known and the record is reviewed.

## Current decisions

| Decision | Status | Selected baseline / boundary |
|---|---|---|
| [`DEC-001-mvp-contract.md`](DEC-001-mvp-contract.md) | `Ready` | Approved, versioned `PROJECT_BRIEF.md` contract; R1 is the only detailed release slice |
| [`DEC-002-r1-stack.md`](DEC-002-r1-stack.md) | `Superseded` | Historical R1 baseline: Node.js 24, TypeScript 6.x strict, Next.js + React, Leaflet, OSM Standard, Playwright Test |
| [`DEC-003-r1-handoff.md`](DEC-003-r1-handoff.md) | `Ready` | Named bounded sessions with canonical handoff through sprint, task, evidence and runbook artifacts |
| [`DEC-004-checkpoint-convention.md`](DEC-004-checkpoint-convention.md) | `Ready` | Canonical Markdown restart records at `docs/checkpoints/CHECKPOINT-0N.md` |
| [`DEC-005-r1-node22.md`](DEC-005-r1-node22.md) | `Superseded` | Historical R1 runtime decision: Node.js 22.x; current repository runtime authority is DEC-016 |
| [`DEC-006-r2-scope.md`](DEC-006-r2-scope.md) | `Ready` | R2 scope authorized; B-08 was the bounded implementation slice authorized by this decision |
| [`DEC-007-r2-b09-streaming-boundary.md`](DEC-007-r2-b09-streaming-boundary.md) | `Ready` | B-12 may extend the B-09 reader to forward multiple ordered messages over one bounded connection; B-12 implementation remains separately gated |
| [`DEC-009-r2-current-task-status.md`](DEC-009-r2-current-task-status.md) | `Ready` | B-08 remains historical under DEC-006; as of DEC-009's 2026-09-25 approval, no successor R2 task had been authorized. Later bounded B-14 authorization is recorded in DEC-011 |
| [`DEC-010-r2-sparse-snapshot-demo-fallback.md`](DEC-010-r2-sparse-snapshot-demo-fallback.md) | `Ready` | For successful AISStream snapshots with 0–2 vessels, show all three demo vessels; distinguish source colors and highlight selection without inflating AIS count |
| [`DEC-011-r2-task-authorization-reconciliation.md`](DEC-011-r2-task-authorization-reconciliation.md) | `Ready` | DEC-009 records the earlier authorization state; the later approved DEC-010/B-14 contract authorizes only its bounded UI slice; other R2 work remains gated |
| [`DEC-012-r3-scope.md`](DEC-012-r3-scope.md) | `Ready` | Sprint 3 authorizes only the bounded US-09 deterministic verification plan; implementation slices remain separately task-gated |
| [`DEC-013-r3-t06-demo-mode-test.md`](DEC-013-r3-t06-demo-mode-test.md) | `Ready` | R3-T06 verifies existing demo motion in the initial idle-demo mode without requesting a snapshot; implementation remains separately task-gated |
| [`DEC-014-r4-scope.md`](DEC-014-r4-scope.md) | `Ready` | R4 updates US-06/US-07 snapshot-retention contract and confirms US-10 handoff; B-18—B-21 remain separately task-gated; assignment was Unknown when decided, resolved by DEC-017 |
| [`DEC-015-r4-archive-gate-deferral.md`](DEC-015-r4-archive-gate-deferral.md) | `Ready` | Archive inspection is deferred from current B-20 closeout, not passed or permanently waived; B-20 remains subject to disposition on its other criteria |
| [`DEC-016-r4-node24-runtime.md`](DEC-016-r4-node24-runtime.md) | `Ready` | Current repository runtime baseline: Node.js 24.x; DEC-005's R1 decision remains historical and superseded as active runtime authority |
| [`DEC-017-r4-sprint-assignment.md`](DEC-017-r4-sprint-assignment.md) | `Ready` | R4 is assigned to Sprint 3b; assignment only, no Sprint 3b plan or checkpoint authorization |

## Pending decisions

| Decision | Status | Required input |
|---|---|---|
| Architecture beyond R1 client/local boundary | `Waiting for input` | Core flow, data boundaries and integrations when they become material |
| Sprint 2 / Sprint 3 allocation | `Partially resolved` | R2 scope is recorded in DEC-006 and its tasks remain separately gated; DEC-012 authorizes the bounded US-09 Sprint 3 plan and DEC-013 approves only the R3-T06 test-setup correction. Implementation slices remain separately task-gated and architecture beyond R2 is `Unknown` |
| R4 release-to-sprint assignment | `Resolved` | DEC-017 records the product owner's assignment of R4 to Sprint 3b; no Sprint 3b plan is created by that assignment |
| Second-laptop platform for US-10 | `Unknown` | Resolve the target OS or explicitly approve a cross-platform README target before B-21 |
| Quantitative success metric | `Needs verification` | Baseline, target, observation window and collection confirmation |
| AISStream service terms | `Needs verification` | Confirmed free-tier terms, availability and source behavior |
| Archive handling (deferred from B-20 by DEC-015) | `Deferred / Waiting for input` | Owner-approved archive format, destination/target, permission, recovery ownership, and separate bounded task/decision before archive work |

Future records should use `docs/decisions/DEC-<number>-<short-name>.md` and update this index after verification. A changed decision gets a new versioned record; the prior record is marked `Superseded` only after the replacement is approved.
