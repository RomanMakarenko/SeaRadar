# DEC-012 — R3 / Sprint 3 scope authorization

- **ID:** `DEC-012-R3-SCOPE`
- **Version:** `1.0.0`
- **Status:** `Ready`
- **Product owner:** методист відділення теорії судноводіння навчального центру «Норд-Вест»
- **Delivery / technical owner:** виконавець проєкту
- **Date:** 2026-09-29
- **Related artifacts:** [`../../PROJECT_BRIEF.md`](../../PROJECT_BRIEF.md), [`../../SPEC.md`](../../SPEC.md), [`../../TASK_SPEC.md`](../../TASK_SPEC.md), [`../../SPRINT-03.md`](../../SPRINT-03.md), [`../sprints/README.md`](../sprints/README.md), [`DEC-001-mvp-contract.md`](DEC-001-mvp-contract.md), [`DEC-005-r1-node22.md`](DEC-005-r1-node22.md), [`DEC-010-r2-sparse-snapshot-demo-fallback.md`](DEC-010-r2-sparse-snapshot-demo-fallback.md), [`../checkpoints/CHECKPOINT-25.md`](../checkpoints/CHECKPOINT-25.md), `TASK-SEA-R3-PLAN-001`.

> **Approval:** On 2026-09-29, the user explicitly approved the test-only outcome and scope in `SPRINT-03.md` as Sprint 3 MVP input, and authorized formalizing governance and identifier conflicts before decomposition. This decision authorizes the Sprint 3 plan only; each technical slice remains separately task-gated.

## Context and constraints

`DEC-001` deliberately left Sprint 2 and Sprint 3 undetailed rather than inferring their tasks from the high-level three-sprint intent. The approved project contract already includes US-09 acceptance for reproducible checks of data freshness, uniqueness, unknown/null values, coordinate validation and collection limits. The user supplied `SPRINT-03.md` as concrete test-only input for that existing outcome and explicitly approved this bounded scope on 2026-09-29.

Existing identifiers must remain stable. `B-14` is assigned to the R2 sparse-snapshot UI slice by DEC-010 and its task contract. `docs/checkpoints/CHECKPOINT-05.md` is an existing R2 LIVE-003 HOLD record, and `CHECKPOINT-25.md` closes bounded R2 acceptance. Neither may be reused or rewritten. B-07 is already part of verified R1 and is not new Sprint 3 work.

## Options considered

1. **Keep Sprint 3 entirely blocked despite the user's supplied and explicitly approved scope.** Rejected: the user supplied the missing bounded US-09 outcome and explicitly approved its use as Sprint 3 input.
2. **Treat R3 as permission for broad product changes, live-provider testing, or unrestricted implementation.** Rejected: the approved source scope is test-only, excludes automated live connectivity and new features, and allows production fixes only for confirmed discrepancies through a separate bounded task and approval.
3. **Authorize the bounded test-only Sprint 3 plan, retain the existing Playwright/Node 22 baseline, and keep implementation slices separately task-gated.** **Selected.** This records the provided scope without inferring dates, architecture changes, provider behavior, full MVP acceptance, or release readiness.

## Decision and rationale

Approved on 2026-09-29: Sprint 3 / R3 is authorized as a bounded US-09 verification slice whose observable outcome is a repeatable, deterministic test suite demonstrating the specified converter, collector, demo-movement, and R2 snapshot/UI behaviors. The task breakdown and per-slice acceptance criteria are defined in `SPRINT-03.md` and linked to `TASK-SEA-R3-PLAN-001`.

Use the existing approved Playwright Test runner and Node.js 22 baseline. Node-side converter/collector tests use the approved injectable event-source and clock seams; browser checks use Playwright's controlled page clock and mocked `GET /api/snapshot` responses. Test expectations are literal and independent of the implementation. No new dependency or architecture change is authorized by this decision.

The success signal is that all listed deterministic cases pass, the independent review findings and limitations are recorded in the future Sprint 3 checkpoint, and any confirmed deviation is either minimally fixed under a separately approved bounded task or explicitly left blocked. Zero defects is a valid result. This does not establish full MVP acceptance, live-provider availability, deployment readiness, or runtime evidence.

## Scope and non-goals

**In scope:**

- Deterministic Node tests for converter mapping, null/invalid fields, coordinates, MMSI and timestamp handling.
- Deterministic Node tests for collector deduplication, timestamp ordering/ties, whole-object replacement, unique-vessel limits, time-window outcomes, failures, cancellation, completion timestamp and resource cleanup.
- Browser tests for existing demo-vessel movement/route-end behavior and existing R2 snapshot error/empty/success UI states.
- Independent review of the test diff/results; record findings, limitations and the bounded outcome.

**Non-goals:**

- New product features, general refactoring, coverage targets, changed collection rules, live WebSocket/provider automation, environment/secret access, production deployment, or broad release/MVP acceptance.
- Production-code changes under this plan. A confirmed mismatch may motivate a separate bounded remediation contract and explicit approval; this decision does not authorize that remediation.
- New runtime/dependency/architecture decisions, unapproved scope, inferred dates, or claims beyond observed evidence.

## Consequences, risks, and deferred work

- Sprint 3 now has an approved plan; implementation remains task-gated. Each technical slice requires its own reviewed bounded task contract and explicit approval before code/test changes.
- The existing B-14 allocation remains R2-only. Sprint 3 uses unique `TASK-SEA-R3-TEST-*` IDs, not B-14…B-17, and does not rewrite R2 history.
- The Sprint 3 acceptance record is reserved as `docs/checkpoints/CHECKPOINT-26.md` / `CHECKPOINT-SEA-R3-026`; it must only be created after the relevant work and evidence exist. CHECKPOINT-05 and CHECKPOINT-25 remain unchanged.
- Sprint dates, success metrics beyond this bounded test outcome, architecture beyond the approved stack, live provider behavior, full MVP acceptance, and release/deployment readiness remain `Unknown` or out of scope.

## Verification / revisit trigger

Verify that `SPEC.md`, `CLAUDE.md`, the sprint catalog, and `SPRINT-03.md` agree with this record; all task/checkpoint identifiers are unique; no historical record is overwritten; and each task has an observable oracle, bounded paths and a targeted check. Revisit only if the product owner changes the US-09 outcome, expands scope, requests a stack/architecture change, or approves a new success criterion.

## Linked task and evidence boundary

- **Approval / planning task:** `TASK-SEA-R3-PLAN-001` records the bounded documentation work and the user's explicit approval.
- **Evidence:** none at decision creation. This record authorizes the plan only; it does not establish that tests ran, defects exist, a remediation is needed, or Sprint 3 passed.
- **Operational history:** record factual verification and handoff only after the approved documentation checks are actually performed. No EVIDENCE/RUNBOOK entry is created by this decision alone.
