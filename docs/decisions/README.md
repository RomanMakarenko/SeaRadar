# Decision records

- **ID:** `DECISIONS-GOV-001`
- **Version:** `0.6.0`
- **Status:** `Ready`
- **Product owner:** методист відділення теорії судноводіння навчального центру «Норд-Вест»
- **Delivery / technical owner:** виконавець проєкту
- **Date:** 2026-09-23
- **Related artifacts:** [`../../CLAUDE.md`](../../CLAUDE.md), [`../../SPEC.md`](../../SPEC.md), [`../../TASK_SPEC.md`](../../TASK_SPEC.md), [`../../EVIDENCE.md`](../../EVIDENCE.md), [`../../RUNBOOK.md`](../../RUNBOOK.md), [`../checkpoints/CHECKPOINT-01.md`](../checkpoints/CHECKPOINT-01.md), [`DEC-001-mvp-contract.md`](DEC-001-mvp-contract.md), [`DEC-002-r1-stack.md`](DEC-002-r1-stack.md), [`DEC-003-r1-handoff.md`](DEC-003-r1-handoff.md), [`DEC-004-checkpoint-convention.md`](DEC-004-checkpoint-convention.md), [`DEC-005-r1-node22.md`](DEC-005-r1-node22.md), [`DEC-006-r2-scope.md`](DEC-006-r2-scope.md)

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
| [`DEC-005-r1-node22.md`](DEC-005-r1-node22.md) | `Ready` | Current R1 runtime baseline: Node.js 22.x |
| [`DEC-006-r2-scope.md`](DEC-006-r2-scope.md) | `Ready` | R2 scope authorized; B-08 is the current bounded implementation slice |

## Pending decisions

| Decision | Status | Required input |
|---|---|---|
| Architecture beyond R1 client/local boundary | `Waiting for input` | Core flow, data boundaries and integrations when they become material |
| Sprint 2 / Sprint 3 allocation | `Partially resolved` | R2 scope and B-08 authorization are recorded in DEC-006; B-09…B-13 and Sprint 3 still require separate input/gates |
| Quantitative success metric | `Needs verification` | Baseline, target, observation window and collection confirmation |
| AISStream service terms | `Needs verification` | Confirmed free-tier terms, availability and source behavior |
| Checkpoint archive packaging/publication | `Waiting for input` | Owner-approved archive format, publication target and recovery ownership |

Future records should use `docs/decisions/DEC-<number>-<short-name>.md` and update this index after verification. A changed decision gets a new versioned record; the prior record is marked `Superseded` only after the replacement is approved.
