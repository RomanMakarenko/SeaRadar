# SPRINT-03b — R4 bounded disposition and handoff

- **ID:** `SPRINT-SEA-S3B-001`
- **Version:** `1.2.0`
- **Status:** `Verified — bounded Sprint 3b exit DONE; overall R4 completion remains unclaimed`
- **Product owner:** методист відділення теорії судноводіння навчального центру «Норд-Вест»
- **Delivery / technical owner:** виконавець проєкту
- **Date:** 2026-10-07
- **Related artifacts:** [`SPEC.md`](SPEC.md), [`TASK_SPEC.md`](TASK_SPEC.md), [`SPRINT-03b-CHANGE-REQUEST.md`](SPRINT-03b-CHANGE-REQUEST.md), [`TASK-SEA-R4-PLAN-001`](TASK_SPEC.md), [`TASK-SEA-R4-S3B-PLAN-001`](TASK_SPEC.md), [`DEC-014`](docs/decisions/DEC-014-r4-scope.md), [`DEC-015`](docs/decisions/DEC-015-r4-archive-gate-deferral.md), [`DEC-017`](docs/decisions/DEC-017-r4-sprint-assignment.md), [`DEC-016`](docs/decisions/DEC-016-r4-node24-runtime.md), [`docs/sprints/README.md`](docs/sprints/README.md), [`CHECKPOINT-28`](docs/checkpoints/CHECKPOINT-28.md), [`EVIDENCE.md`](EVIDENCE.md), [`RUNBOOK.md`](RUNBOOK.md)

> **Approval boundary:** DEC-017 assigns R4 to Sprint 3b but is not itself approval of this plan. The owner explicitly approved this exact `SPRINT-03b.md` v1.0.0 on 2026-10-06. That approval authorizes the v1.0.0 plan as a Ready planning record only; it does not authorize implementation, test execution, archive operation, deployment, commit, or push. The v1.1.0 supplement was authorized only as the bounded documentation change in `TASK-SEA-R4-S3B-GATE-B-STATUS-SYNC-001`; after focused diff review, the owner chose `continue` on 2026-10-07, approving v1.1.0 as a planning record only. This does not authorize implementation, test execution, archive operation, deployment, commit, or push. Each future technical or closeout slice requires its own reviewed task contract and explicit approval.

## Outcome and success signal

**Bounded outcome:** provide one traceable, evidence-bounded Sprint 3b disposition for the approved R4 change by mapping B-18–B-21's recorded outcomes, their evidence classes and limitations, and unresolved follow-up gates. No product behavior is changed by this plan; the record does not claim overall R4 `DONE`, full MVP acceptance, release readiness, or deployment readiness.

**Success signal:** the owner approved this canonical plan; each B-18–B-21 status links to its task/evidence basis and limitations; owner-reported and independently observed results remain distinguished; unresolved inputs remain visible; and any future exit decision is explicitly made by the owner against observed evidence. The current bounded planning exit is `CONTINUE WITH APPROVAL`, not overall R4 `DONE`.

## Scope and non-goals

### In scope

- Reconcile the already recorded B-18–B-21 task dispositions with the approved R4 product contract, DEC-015 archive deferral, DEC-017 Sprint 3b assignment, CHECKPOINT-28, EVIDENCE, and RUNBOOK.
- Preserve the evidence class of each result: targeted observed checks, owner-reported observations, owner-accepted closure, denied-before-execution commands, and not-run commands must not be conflated.
- Identify which follow-up inputs remain unresolved and require a separately reviewed contract or decision before any related action.
- Obtain human review of this plan and its focused diff before changing this plan's status from `Draft`.

### Non-goals

- No new UI/product implementation or test changes; no re-running B-18–B-21 commands under this plan.
- No fresh live-provider request, credential/secret inspection, archive creation/inspection/package/publication, second-laptop validation, deployment, staging, commit, or push.
- No claim of full MVP acceptance, overall R4 `DONE`, complete vessel coverage, provider availability, release readiness, or deployment readiness.
- No reuse or modification of `docs/checkpoints/CHECKPOINT-06.md` (existing R2 record). CHECKPOINT-28 is the existing bounded R4 closeout; this plan creates no checkpoint.
- No new stack, runtime, dependency, architecture, dates, or metrics inferred from prior sprint records. Current runtime authority remains DEC-016; this plan does not revalidate it.

## Approved scope and governance

- DEC-014 approves the R4 product-contract change for US-06/US-07 and the US-10 installation/start handoff requirement. It does not authorize implementation or acceptance.
- The root `SPRINT-03b-CHANGE-REQUEST.md` is the R4 scope input. Its example prompt uses a stale `docs/tasks/` path; the actual change-request file is at the repository root.
- DEC-017 assigns R4 to Sprint 3b only. It does not create or approve a sprint plan, authorize work, or establish final acceptance.
- `TASK-SEA-R4-PLAN-001` remains a Draft B-18–B-21 decomposition; it is not this canonical plan and is not promoted here.
- DEC-012 remains the separate R3/US-09 test-only scope and is not expanded by this plan.
- This plan is a Draft until the owner explicitly approves this exact version. Each future implementation, test, acceptance, checkpoint, or archive task requires its own reviewed bounded contract and explicit approval.

## Current bounded task record

| Slice | Task | Recorded disposition | Basis and limits |
|---|---|---|---|
| B-18 — R4 UI state and source/attempt status | `TASK-SEA-R4-B18-001` | `Verified` within its bounded UI implementation and checks | E-SEA-098. Does not establish live-provider behavior or overall R4 acceptance. |
| B-19 — R4 browser contract tests | `TASK-SEA-R4-B19-001` | `Verified` for approved browser cases and protected movement/selection regressions | Task record and CHECKPOINT-28 preserve the first 22-pass/1-fail result, subsequent corrections, final targeted reruns, and regression boundary. No separate B-19 E-SEA entry is identified in the current R4 evidence range. |
| B-20 — final acceptance and secret boundary | `TASK-SEA-R4-B20-001` v1.1.0 | `Verified` under the criteria after archive deferral | E-SEA-099–102. Archive inspection was deferred, not passed or permanently waived. Owner-reported manual outcomes remain distinct from independently observed command results. |
| B-21 — installation/start README | `TASK-SEA-R4-B21-001` v1.1.0 | `Verified — owner-accepted closure` | E-SEA-103–104. The current continuation's `npm install` and Playwright attempts were denied before execution; `npm run dev`, `npx tsc --noEmit`, and `npx next build` were not run. No second-laptop setup was tested. |
| Combined B-18–B-21 owner confirmation | E-SEA-105 | Owner-reported confirmation only | No per-command output, timestamps, or execution mapping; not independent verification or second-laptop validation. |
| R4 checkpoint authoring | CHECKPOINT-28 / E-SEA-106 | Accepted bounded checkpoint authoring only | Does not establish overall R4 `DONE`, full MVP acceptance, release/deployment readiness, archive result, or second-laptop validation. |
| Unscoped owner statement | E-SEA-107 | `PASS` only for recording the statement; underlying checks `UNKNOWN` | The statement `все перевірено і працює` has no supplied referent/scope and is not attributed to R4 or B-18–B-21. |

Prior failed, denied, not-run, and owner-reported records remain part of the history. Do not rewrite them or upgrade their evidence class.

## Ordered bounded slices and checkpoints

| Order | Slice / task | Owner, input, expected output | Allowed paths / dependencies | Check and human checkpoint |
|---|---|---|---|---|
| 1 | Canonical Sprint 3b plan authoring — `TASK-SEA-R4-S3B-PLAN-001` | Delivery/technical owner; approved R4 scope, current task/evidence records, DEC-014/015/017, sprint convention; output this Draft plan and catalog row | `SPRINT-03b.md`, the Sprint 3b row in `docs/sprints/README.md`, and this task's section in `TASK_SPEC.md` only. Precondition met: the owner approved the exact planning task, including outcome, scope, success signal, stack/architecture boundary, and task boundaries, on 2026-10-06; this Sprint plan's separate approval remains pending. | Structural/link/ID/whitespace checks only; present focused diff to owner. Keep plan `Draft` pending explicit approval of this exact plan. No product tests/build. |
| 2 | Any remaining product, verification, platform, checkpoint, or archive follow-up | No task ID or owner action is authorized by this plan. Inputs and outcomes must be specified in a separate reviewed task/decision; output is `Unknown` or `Blocked` until then. | None authorized here. Each follow-up needs its own exact allowed paths and explicit approval. | Stop before action; owner reviews the proposed bounded contract and chooses `continue`, `revise`, or `HOLD`. |
| 3 | Sprint/R4 exit disposition | Product owner with evidence from the applicable separately approved tasks; output is an explicit `DONE`, `CONTINUE WITH APPROVAL`, or `HOLD` for the stated bounded scope only. | No new checkpoint or evidence path authorized by this plan; CHECKPOINT-28 remains unchanged. | Review evidence, limitations, and unresolved inputs. Do not infer overall R4 or MVP completion from plan approval or B-18–B-21 statuses. |

## Blocking and advisory gates

**Blocking for this plan to become `Ready`:** the owner reviews and explicitly approves this exact plan; its scope/outcome/success signal and task boundaries remain consistent with approved records; task IDs and links resolve uniquely; and it preserves the stated evidence limitations and blockers. Plan approval does not authorize technical work.

**Blocking for any broader R4 `DONE` or release claim:** a separate owner disposition against explicit criteria and supporting evidence is required. This plan does not define new product acceptance criteria or convert unknowns into passes.

**Advisory/deferred:** archive handling remains separately deferred under DEC-015; it is neither a current B-20 pass nor a permanent waiver. Second-laptop validation remains undocumented. Neither may be represented as complete. Whether either item blocks a broader future R4 disposition is not decided here.

## Readiness assumptions and unresolved inputs

- **Confirmed:** DEC-014 records approved R4 behavior; DEC-017 assigns R4 to Sprint 3b; B-18–B-21 have the bounded dispositions shown above; CHECKPOINT-28 and E-SEA-106 record bounded closeout authorship.
- **Unknown / waiting for input:** archive format, target, permission, and recovery owner; second-laptop OS and actual setup validation; any broader R4 acceptance criteria beyond the recorded bounded tasks; any new architecture or runtime implications; any quantitative success metric or observation window.
- **Safe fixtures/fallback:** none are applicable to this documentation-only slice; no product/runtime check is authorized. If a future technical task is approved, it must specify its own safe fixture/fallback and checks.
- **Explicit safety boundary:** `.mcp.json`, credential values, and archives are not read by this plan. No live provider or external network check is performed. No product tests/build are executed.
- **Fallback:** when an input is unavailable, retain `Unknown`/`Waiting for input` and choose `CONTINUE WITH APPROVAL` or `HOLD`; do not infer success or create work outside an approved contract.

## Verification plan

For plan authoring only:

1. Recheck task/plan IDs and local links against current files.
2. Confirm every recorded task disposition and E-SEA reference against `TASK_SPEC.md`, `EVIDENCE.md`, DEC-014/015/017, and CHECKPOINT-28 without rerunning product commands.
3. Run `git diff --check -- SPRINT-03b.md docs/sprints/README.md TASK_SPEC.md` after changes.
4. Perform focused structural checks for required sprint sections, unique identifiers, link targets, status boundaries, and unchanged archive/second-laptop/overall-R4 limitations.
5. Review only the authorized focused diff and request the owner's explicit plan disposition.

These are documentation checks; they do not independently validate any B-18–B-21 product behavior or command result.

## Rollback, exit, and handoff

- Before owner acceptance, under explicit human direction remove only this newly created `SPRINT-03b.md` and restore only the Sprint 3b catalog row and this task section to their pre-task state. Preserve all pre-existing staged, modified, and untracked paths and all historical records; do not use broad reset/cleanup.
- **Current exit:** `CONTINUE WITH APPROVAL` — this plan is Ready after owner approval; implementation and any broader R4 disposition remain separately gated. No overall R4 `DONE`, release, or deployment is claimed.
- After plan review, the owner chooses `continue`, `revise`, or `HOLD`; separately select the bounded sprint exit decision only when its criteria and evidence are explicit.
- Handoff references: B-18–B-21 contracts, E-SEA-098–E-SEA-107, DEC-014/015/017, CHECKPOINT-28, EVIDENCE.md, and RUNBOOK.md. No new evidence or RUNBOOK entry is created by this plan.

## Supplemental disposition — GATE-b and Sprint 3b exit

- **Date:** 2026-10-07. This supplement records information received after the original plan text; it does not rewrite the historical task/evidence table above.
- **GATE-b:** owner-accepted based on the aggregate owner report in [`E-SEA-109`](EVIDENCE.md#e-sea-109--owner-reported-gate-b-second-laptop-result) and the explicit acceptance in [`E-SEA-110`](EVIDENCE.md#e-sea-110--owner-acceptance-of-gate-b). This is not independent or command-by-command verification. Exact command outcomes, Node/npm versions, Windows build, and execution time remain unknown.
- **Sprint 3b exit:** the owner selected `CONTINUE WITH APPROVAL`. This confirms the plan's existing bounded exit disposition; Sprint 3b is not closed as `DONE`.
- **Retained boundaries:** DEC-015 archive inspection remains separately deferred. No broader R4 `DONE`, full MVP acceptance, release readiness, or deployment readiness is established by this supplement.

## Supplemental disposition — bounded Sprint 3b closure

- **Date:** 2026-10-07. This dated entry supersedes only the prior Sprint-exit selection; the earlier `CONTINUE WITH APPROVAL` remains preserved as the historical decision at that time.
- **Owner disposition:** the owner chose to keep the DEC-015 archive gate deferred and close Sprint 3b as `DONE` for the bounded outcome in this plan only.
- **Basis and boundary:** the disposition closes the bounded planning/traceability outcome, not overall R4 or MVP acceptance. It does not establish release/deployment readiness or independent verification of owner-reported results. Broader R4 acceptance criteria remain `Unknown`.
- **Archive status:** archive handling remains deferred, not passed and not permanently waived. Required archive prerequisites remain `Unknown` / `Waiting for input`; no archive action is authorized or performed. DEC-015 is unchanged.
- **Evidence / task:** recorded in [`E-SEA-115`](EVIDENCE.md#e-sea-115--owner-disposition-for-bounded-sprint-3b-exit) and [`TASK-SEA-R4-S3B-EXIT-001`](TASK_SPEC.md). The archive-input task is complete only for recording the owner's decision to retain deferral.
