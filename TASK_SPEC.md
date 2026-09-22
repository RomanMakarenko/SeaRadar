# TASK_SPEC.md — bounded task contract

- **ID:** `TASK-SEA-GOV-001`
- **Version:** `1.0.0`
- **Status:** `Active`
- **Product owner:** методист відділення теорії судноводіння навчального центру «Норд-Вест»
- **Delivery / technical owner:** виконавець проєкту
- **Date:** 2026-09-22
- **Related artifacts:** [`CLAUDE.md`](CLAUDE.md), [`PROJECT_BRIEF.md`](PROJECT_BRIEF.md), [`SPEC.md`](SPEC.md), [`SPRINT-01.md`](SPRINT-01.md), [`EVIDENCE.md`](EVIDENCE.md), [`RUNBOOK.md`](RUNBOOK.md), [`docs/decisions/DEC-001-mvp-contract.md`](docs/decisions/DEC-001-mvp-contract.md), [`docs/decisions/DEC-002-r1-stack.md`](docs/decisions/DEC-002-r1-stack.md)

## Goal and linked outcome

- **Goal:** привести governance-артефакти до узгодженого стану після підтвердження MVP baseline та поточного R1 stack.
- **SPEC outcome:** `SPEC-SEA-001 / approved MVP contract with R1 as the only detailed release slice`.
- **Current behavior:** canonical artifacts still describe MVP input, stack selection and sprint authorization as pending.
- **Desired behavior:** approved baseline, current R1 decisions, explicit Unknowns, owners and change-control path are recorded consistently.

## Owner and allowed paths

- **Product owner:** методист відділення теорії судноводіння навчального центру «Норд-Вест» — приймає продуктову специфікацію та scope.
- **Delivery / technical owner:** виконавець проєкту — веде артефакти, decision records та structural verification.
- **Allowed paths:**
  - `CLAUDE.md`
  - `PROJECT_BRIEF.md`
  - `SPEC.md`
  - `TASK_SPEC.md`
  - `SPRINT-01.md`
  - `ABOUT.md`
  - `docs/README.md`
  - `docs/sprints/README.md`
  - `docs/decisions/README.md`
  - `docs/decisions/DEC-001-mvp-contract.md`
  - `docs/decisions/DEC-002-r1-stack.md`
  - `EVIDENCE.md`
  - `RUNBOOK.md`
- **Affected paths:** the paths above; no product source, package manifest, lockfile, runtime configuration or secret file.

## Inputs and constraints

- **Inputs:** approved `PROJECT_BRIEF.md`; current R1 details in `SPRINT-01.md`; owner clarification recorded in the session on 2026-09-22.
- **Constraints:** no product implementation; no dependency installation; no secret access; no production, deployment or user-validation claims; no Sprint 2/3 plans or inferred requirements; preserve append-only history in `EVIDENCE.md` and `RUNBOOK.md`.
- **Dependencies:** structural/content checks only; runtime stack is not implemented in this governance slice.

## Expected output

A reviewable governance baseline in which the approved and changeable MVP contract, R1 stack decision, owners, current scope and unresolved Unknowns are cross-linked without creating duplicate canonical artifacts.

## In scope

- Promote the confirmed MVP contract to a versioned `Ready` baseline.
- Record the current R1 stack and MVP-contract decisions with options considered only where evidenced.
- Mark R1 as the only detailed sprint; keep S2/S3 absent and `Waiting for input`.
- Align project guidance and documentation indexes.
- Append factual verification to `EVIDENCE.md` and interaction/handoff history to `RUNBOOK.md` after checks run.

## Non-goals

- Product implementation or runtime setup.
- Creating Sprint 2/3 plans, checkpoint templates or missing tutorial directories.
- Choosing unconfirmed metrics, dates, service terms, architecture beyond the R1 boundary or deployment model.
- Reading, writing, displaying or validating secrets.
- Deleting `START.md` or `TASK_INITIAL.md`.

## Acceptance criteria

- [ ] All changed long-lived artifacts have ID, Version, Status, Owner and Related artifacts metadata where applicable.
- [ ] `PROJECT_BRIEF.md` is marked as the approved but changeable MVP baseline.
- [ ] `SPEC.md` is `Ready`, links the brief and R1, and keeps metrics/service terms/S2-S3 Unknown or Needs verification where unconfirmed.
- [ ] R1 stack is recorded in a formal decision record; future changes require a new versioned decision record.
- [ ] Product owner and delivery/technical owner are distinct and consistently named.
- [ ] `EVIDENCE.md` and `RUNBOOK.md` retain existing entries and receive append-only records after verification.
- [ ] No S2/S3 plan or duplicate canonical path is created.
- [ ] Structural/content checks and `git diff --check` pass; no runtime or secret claims are made.
- [ ] Human checkpoint: review complete diff before marking this task `Verified`.

**Current acceptance status:** `Structural checks PASS; human diff checkpoint pending before Verified.`

## Verification

- **Targeted commands:** `git diff --check`; `git status --short`; `git diff --stat`; `find . -maxdepth 3 -type f | sort`; metadata/link/Unknown checks; absence checks for S2/S3 and duplicate canonical paths.
- **Manual check:** inspect the complete diff against this task and confirm append-only sections were not rewritten.
- **Expected result:** all required governance files and decision links exist; R1 is the only detailed sprint; S2/S3 remain absent and explicitly unknown; no secret or runtime claim is introduced.
- **Observed result:** `git diff --check` PASS; final structural/content validation PASS; Markdown relative-link validation PASS; S2/S3 paths absent; human product-owner checkpoint pending.

## Checkpoint and stop conditions

- **Checkpoint:** after the bounded governance slice, run structural checks and review the full diff before final status.
- **Stop when:** scope expands; a referenced fact is not in the supplied artifacts or user clarification; a new dependency is needed; an append-only history would need rewriting; a secret or runtime claim is encountered; rollback is unclear.
- **Exit decision:** `CONTINUE WITH APPROVAL` until the human diff review; then `DONE` only if acceptance and evidence are satisfied.

## Risks and open questions

- Quantitative success metric baseline, target and observation window remain `Unknown`.
- AISStream terms, availability and source behavior remain `Needs verification`.
- Sprint 2/3 scope, owners, dates and architecture remain `Waiting for input`.
- No runtime implementation or user validation exists in this task.

## Rollback / recovery

After reviewing the diff, restore the pre-task files from Git if the governance alignment is rejected. Keep `START.md` and untracked `TASK_INITIAL.md` untouched. If only one artifact is rejected, revert that artifact and append the decision to `RUNBOOK.md`; do not rewrite prior evidence.

## Handoff

After verification and human diff review, the next bounded action is to define and approve the first R1 implementation task (B-01 or an explicitly selected slice) in a new task contract. Do not implement product code as part of this task.
