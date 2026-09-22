# DEC-006 — R2 scope authorization

- **ID:** `DEC-006-R2-SCOPE`
- **Version:** `1.0.0`
- **Status:** `Ready`
- **Product owner:** методист відділення теорії судноводіння навчального центру «Норд-Вест»
- **Delivery / technical owner:** виконавець проєкту
- **Date:** 2026-09-23
- **Related artifacts:** [`../../CLAUDE.md`](../../CLAUDE.md), [`../../PROJECT_BRIEF.md`](../../PROJECT_BRIEF.md), [`../../SPEC.md`](../../SPEC.md), [`../../TASK_SPEC.md`](../../TASK_SPEC.md), [`../../SPRINT-02.md`](../../SPRINT-02.md), [`../../EVIDENCE.md`](../../EVIDENCE.md), [`../../RUNBOOK.md`](../../RUNBOOK.md), [`DEC-005-r1-node22.md`](DEC-005-r1-node22.md)

## Context and constraints

The approved MVP contract already names US-05…US-08 for the AISStream snapshot, but Sprint 2 was previously held at `Waiting for MVP input`. The product owner has now explicitly confirmed the R2 scope and authorized transition to B-08. The change must remain bounded: B-08 prepares secure configuration and a server-only accessor; it does not perform a live AISStream request, read a real key, implement the reader/endpoint, or claim R2 acceptance.

The real `AISSTREAM_API_KEY` must never be entered into chat, committed, logged, returned to a client, or included in a delivered file. Sprint 3, architecture beyond the authorized R2 boundary, provider availability and final user acceptance remain unresolved.

## Options considered

1. **Authorize the R2 scope and start with B-08 as a separately gated bounded task.** **Selected.** This records the product-owner decision while preserving task-level review and evidence gates for B-08 and later slices.
2. **Keep Sprint 2 at `Waiting for MVP input`.** Rejected because the product owner explicitly confirmed the R2 scope and authorized B-08.
3. **Authorize the entire R2 implementation and acceptance in one step.** Rejected because B-09…B-13 require separate task contracts, checks, evidence and human review; this decision does not claim their implementation or acceptance.

## Decision and rationale

R2 is authorized as the next release slice for US-05…US-08, with implementation remaining task-gated. `TASK-SEA-R2-B08-001` is the current bounded task. It may proceed through governance and implementation checks only within its allowed paths: `.env.example`, `.gitignore`, separately authorized `.claude/settings.json` permission rules, and `server/aisstream-config.ts`.

B-09 reader/endpoint, B-10 sample/provenance, B-11 transformer, B-12 collector and B-13 UI remain planned follow-up tasks. Each requires its own bounded contract and review; no live provider request is authorized by this record.

## Consequences, risks and deferred work

- Canonical governance artifacts may identify Sprint 2 as authorized but task-gated rather than waiting for input.
- B-08 can establish an empty environment template, local-secret ignore boundary, narrowly scoped read-deny rules and a server-only accessor without requiring the real key.
- The existing R1 product behavior and B-07 checks remain unchanged.
- AISStream registration and key provisioning are deferred until a later authorized live-connection task; the key must remain outside chat and repository files.
- Provider terms, availability, sample capture, R2 runtime behavior, user validation and final acceptance remain `Unknown` or `Needs verification`.

## Verification / revisit trigger

Verify this decision through B-08's actual checks, human diff review and append-only evidence. Revisit with a new versioned decision if the R2 scope, provider, secret-handling boundary, runtime, architecture or task order changes. B-09 and later work must not start without their own task contract and approval gate.
