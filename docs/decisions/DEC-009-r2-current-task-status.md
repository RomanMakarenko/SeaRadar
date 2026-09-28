# DEC-009 — R2 current-task authorization status

- **ID:** `DEC-009-R2-CURRENT-TASK-STATUS`
- **Version:** `1.0.0`
- **Status:** `Ready`
- **Product owner:** методист відділення теорії судноводіння навчального центру «Норд-Вест»
- **Delivery / technical owner:** виконавець проєкту
- **Date:** 2026-09-25
- **Related artifacts:** [`../../CLAUDE.md`](../../CLAUDE.md), [`../../SPEC.md`](../../SPEC.md), [`../../TASK_SPEC.md`](../../TASK_SPEC.md), [`README.md`](README.md), [`DEC-006-r2-scope.md`](DEC-006-r2-scope.md), [`DEC-008-r2-current-task-status.md`](DEC-008-r2-current-task-status.md), [`../checkpoints/CHECKPOINT-16.md`](../checkpoints/CHECKPOINT-16.md), [`../../EVIDENCE.md`](../../EVIDENCE.md), [`../../RUNBOOK.md`](../../RUNBOOK.md), `TASK-SEA-R2-GOV-004`, `E-SEA-068`.

> **Approval:** This decision was approved on 2026-09-25 after review of the GOV-004 contract and the DEC-008 proposed resolution. It authorizes this governance clarification only; no implementation or diagnostic task is thereby authorized.

## Context and constraints

DEC-006 authorized R2 as the next release slice and selected `TASK-SEA-R2-B08-001` as the bounded task at that time. Later R2 work was conducted through separately reviewed task contracts, and the available task/checkpoint history does not itself authorize a successor task as the current next implementation task. `CLAUDE.md` v1.3.0 and `SPEC.md` v1.1.0 continued to identify B-08 as current, conflating historical authorization with present authorization.

DEC-008 documented the mismatch and proposed a conservative resolution as a non-authoritative Draft. The user approved the proposed resolution and, in GOV-004, limited synchronization to direct B-08-current claims in `CLAUDE.md` and `SPEC.md`. The separate Sprint 2 catalog inconsistency is deferred; this decision does not authorize changes to `docs/README.md`, `docs/sprints/README.md`, or `SPRINT-02.md`.

The latest acceptance state remains unchanged: CHECKPOINT-16 records Sprint checkpoint 03 as **HOLD / not passed** because the live PositionReport and matching sample/provenance criteria were not met. This decision does not change R2 scope or establish product, runtime, provider, release, or acceptance outcomes.

## Options considered

1. **Retain B-08 as the historical bounded task selected by DEC-006 and state that no R2 technical task is currently authorized pending a separately reviewed and explicitly approved task.** **Selected.** This separates past authorization from present authorization and does not promote task history into standing permission.
2. **Name a different recorded implementation or diagnostic task as currently authorized.** Rejected: no approved successor task was selected through this decision; a new task requires its own bounded contract and explicit approval.
3. **Leave B-08 identified as the current task.** Rejected: that wording conflicts with later task-specific history and may mislead operators about what remains authorized.
4. **Treat the most recent diagnostic or handoff as standing authorization for further technical work.** Rejected: a completed bounded task or handoff does not authorize a successor.

## Decision and rationale

Approved on 2026-09-25: DEC-006's authorization of R2 and its selection of B-08 remain historical. **No R2 implementation or diagnostic task is currently authorized.** A future R2 technical task may proceed only after the product owner selects it, a separate bounded task contract is reviewed, and explicit approval is given for that task.

This decision authorizes only the documentation correction in GOV-004. It does not change R2 scope, authorize a provider/network request, authorize environment or secret access, or approve any implementation, diagnostic, or acceptance activity. DEC-006 and DEC-007 remain historical records with their existing status and meaning. DEC-008 remains the Draft proposal that informed this approved decision; it is not represented as an approved decision or a successor task.

## Consequences, risks and deferred work

- `CLAUDE.md` and `SPEC.md` may state that B-08 was the historical task selected by DEC-006, while making clear that no R2 technical task is currently authorized.
- R2 remains authorized as a release-scope decision, but implementation remains task-gated. This record authorizes no new technical task.
- Sprint checkpoint 03 remains `HOLD / not passed`; no live receipt, matching sample/provenance, full R2 acceptance, or release readiness is inferred.
- The contradictory Sprint 2 catalog wording in `docs/README.md` and `docs/sprints/README.md` is outside this decision's approved synchronization scope and remains deferred for separate review.
- `SPRINT-02.md`, DEC-006, and DEC-007 remain unchanged; no historical task, checkpoint, or evidence is rewritten.

## Verification / revisit trigger

Verify the synchronized baseline wording and decision index against this record, `TASK-SEA-R2-GOV-004`, and the documented change paths. Revisit if the product owner explicitly authorizes a new R2 technical task, changes the R2 scope, or approves correction of the deferred Sprint 2 catalog statements. Sprint checkpoint 03 may change only with its own required evidence and review; this decision does not satisfy those criteria.

## Linked task and evidence boundary

- **Approval/task:** `TASK-SEA-R2-GOV-004` records the reviewed bounded documentation task and its limits.
- **Proposal source:** `DEC-008-R2-CURRENT-TASK-STATUS` remains a Draft proposal; this approved decision records the selected resolution without rewriting that proposal.
- **Evidence:** `E-SEA-068` verifies only the proposal's documentation structure, links, whitespace, and stated boundary. It does not establish R2 acceptance or authorize technical work. The factual verification of this synchronization belongs in subsequent append-only evidence/runbook entries.
