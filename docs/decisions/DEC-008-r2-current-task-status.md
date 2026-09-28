# DEC-008 — R2 current-task governance status (proposal)

- **ID:** `DEC-008-R2-CURRENT-TASK-STATUS`
- **Version:** `1.0.0`
- **Status:** `Draft`
- **Product owner:** методист відділення теорії судноводіння навчального центру «Норд-Вест»
- **Delivery / technical owner:** виконавець проєкту
- **Date:** 2026-09-25
- **Related artifacts:** [`../../CLAUDE.md`](../../CLAUDE.md), [`../../SPEC.md`](../../SPEC.md), [`../../TASK_SPEC.md`](../../TASK_SPEC.md), [`../../NEXT_SESSION.md`](../../NEXT_SESSION.md), [`../../EVIDENCE.md`](../../EVIDENCE.md), [`../../RUNBOOK.md`](../../RUNBOOK.md), [`DEC-006-r2-scope.md`](DEC-006-r2-scope.md), [`DEC-007-r2-b09-streaming-boundary.md`](DEC-007-r2-b09-streaming-boundary.md), [`../checkpoints/CHECKPOINT-16.md`](../checkpoints/CHECKPOINT-16.md), `E-SEA-066`, `E-SEA-067`.

> **Draft only — not an approved decision.** This proposal does not change `CLAUDE.md`, `SPEC.md`, the decision index, `SPRINT-02.md`, or any task authorization. It selects no implementation, diagnostic, or provider task. Sprint checkpoint 03 remains `HOLD / not passed`.

## Context and constraints

The approved governance baseline is internally stale about R2's current task:

- `CLAUDE.md` v1.3.0 (§1) says B-08 is the current task.
- `SPEC.md` v1.1.0 (Scope, Release slice, Open decisions, and Change-control gate) likewise identifies B-08 as the current bounded task.
- DEC-006 authorized R2 and selected `TASK-SEA-R2-B08-001` as the bounded task at that time. It did not authorize the entire R2 implementation; later tasks each required their own bounded contract and review.
- Subsequent task-specific records document individually bounded work through B-09…B-13 and later live-attempt/diagnostic tasks. CHECKPOINT-16 records the DIAG-006 result as a checkpoint-specific task, not as a standing next implementation authorization. HANDOFF-002 and `NEXT_SESSION.md` explicitly disclose the baseline mismatch and require separate change control.
- The latest acceptance checkpoint remains **HOLD**: no eligible live AISStream `PositionReport` with matching live sample/provenance was established. The synthetic B-10 sample and task-level local verification do not satisfy that gap.

The decision must distinguish the historical task authorized by DEC-006, subsequent completed bounded work, the latest restart/review action, and authorization for any future work. It must not infer that task history, a checkpoint, or a broad `continue` authorizes a successor task. DEC-006 and DEC-007 remain historical approved records unless a separately approved decision explicitly supersedes one.

## Options considered

1. **Proposed: retain B-08 as the historical bounded task originally authorized by DEC-006, but state that no R2 technical task is currently authorized until the product owner selects and approves a new bounded contract.** This avoids promoting a completed diagnostic or implementation task into an unapproved standing task and makes the next governance review distinct from permission to implement.
2. **Name a different R2 task as current.** Defer unless and until the product owner identifies the exact task, its contract and its explicit authorization. Later task records alone do not supply standing authorization.
3. **Leave the current B-08 wording unchanged.** Not recommended: it may lead a future operator to treat B-08 as still active despite its verified task record and later individually gated task history.
4. **Treat DIAG-006 or HANDOFF-002 as the new current task because they are latest in the records.** Rejected: DIAG-006 was a completed one-shot export-shape diagnostic; HANDOFF-002 was a completed documentation-only handoff. Neither record authorizes future work.

## Proposed decision — pending product-owner approval

Keep DEC-006's historical meaning intact: it authorized R2 and selected B-08 as the bounded task at that point. For the present governance state, do not identify any R2 implementation or diagnostic task as currently authorized. Mark the current technical task as **none currently authorized / next task awaits a separately reviewed bounded contract and explicit approval**. Treat governance review of this proposal as a review action only, not as permission to implement, inspect secrets, diagnose the loader, contact AISStream, or claim R2 acceptance.

This proposed wording does not make DEC-006 `Superseded` and does not change the authorized R2 scope. It records the difference between historical authorization and current authorization. If approved, a later bounded documentation task should update versioned canonical artifacts consistently and update the decision index only after the replacement decision is approved and verified.

## Consequences, risks, and deferred work

- `CLAUDE.md` and `SPEC.md` would no longer imply that B-08 remains the active task after approval and a separate authorized synchronization slice.
- B-08 remains the task historically selected by DEC-006; subsequent bounded records remain historical records and retain their actual status/evidence.
- No new implementation or diagnostic task becomes authorized. Any successor requires its own bounded contract and explicit approval.
- Sprint checkpoint 03 remains `HOLD / not passed`; no live receipt, matching live sample/provenance, full R2 acceptance, or release readiness is inferred.
- `docs/README.md` and `docs/sprints/README.md` also contain Sprint 2 wording that describes the plan as absent or waiting for input. Their scope/status requires impact review before any baseline synchronization; this proposal does not edit them.
- `SPRINT-02.md` has its own approved plan and DEC-007 exception history. Any change to its plan text remains separately gated; this proposal does not revise it or DEC-007.
- Leaving the existing wording until the proposal is approved avoids an unreviewed canonical change but means the stale label remains visible temporarily.

## Verification / revisit trigger

This record is a proposal and has not been approved or verified as a decision. Before acceptance, the product owner should review the options and confirm or revise the proposed current-task statement. If approved, create/authorize a separate bounded synchronization task that identifies exact affected paths, versions, replacement wording, link/index updates, and checks before editing any canonical baseline. Revisit if a new R2 task is explicitly approved, the R2 scope changes, or a governance record changes the definition of the current task.

## Linked task and evidence boundary

- **Preparation task:** `TASK-SEA-R2-GOV-003` — bounded preparation of this Draft proposal; it does not approve this decision.
- **Relevant evidence:** `E-SEA-066` records only the DIAG-006 export-shape observation; `E-SEA-067` records handoff verification and the disclosed mismatch. These entries do not establish future-task authorization or Sprint 2 acceptance.
- **Operational history:** see the latest DIAG-006 and HANDOFF-002 entries in `RUNBOOK.md`; history is append-only and is not rewritten by this proposal.
