# DEC-013 — R3-T06 demo-mode test setup

- **ID:** `DEC-013-R3-T06-DEMO-MODE-TEST`
- **Version:** `1.1.0`
- **Status:** `Ready`
- **Product owner:** методист відділення теорії судноводіння навчального центру «Норд-Вест»
- **Delivery / technical owner:** виконавець проєкту
- **Date:** 2026-09-30
- **Related artifacts:** [`../../SPEC.md`](../../SPEC.md), [`../../TASK_SPEC.md`](../../TASK_SPEC.md), [`../../SPRINT-03.md`](../../SPRINT-03.md), [`DEC-010-r2-sparse-snapshot-demo-fallback.md`](DEC-010-r2-sparse-snapshot-demo-fallback.md), [`DEC-012-r3-scope.md`](DEC-012-r3-scope.md), [`../../EVIDENCE.md`](../../EVIDENCE.md), [`../../RUNBOOK.md`](../../RUNBOOK.md), `TASK-SEA-R3-PLAN-002`, `TASK-SEA-R3-PLAN-003`, `TASK-SEA-R3-TEST-006`.

> **Approval:** On 2026-09-30, the user explicitly approved option 2 after review of this proposal. This decision authorizes only the versioned Sprint 3/T06 contract synchronization for a test-only setup change; it does not authorize test implementation, test execution, or product behavior changes. T06 remains separately task-gated.

## Context and constraints

`DEC-012` authorizes a bounded test-only Sprint 3 verification plan. The current R3-T06 procedure in `SPRINT-03.md` asks the browser test to mock a successful empty snapshot, wait for demo fallback markers, and then assert that `demo-1` moves. Source inspection found that this setup changes the map to snapshot mode. Snapshot mode displays supplemental demo markers but does not initialize or advance their motion states.

`DEC-010` explicitly preserves stationary demo fallback markers in sparse snapshot mode and leaves idle-demo motion unchanged. Therefore, satisfying the existing T06 procedure and motion oracle simultaneously would require a product behavior change outside the authorized test-only scope. T06 was placed on `HOLD` on 2026-09-29. No product change is proposed here.

A second existing Sprint 3 rule says each new browser case mocks the snapshot API. The approved initial idle-demo test does not invoke that API; it installs a route guard and asserts that no request occurs rather than trigger a snapshot response that would switch the page into snapshot mode.

## Options considered

1. **Keep R3-T06 on `HOLD` with its current acceptance unchanged.** This option would avoid changing scope but leave the demo movement verification unavailable under the specified setup.
2. **Revise only the R3-T06 test setup to verify motion in the initial idle-demo mode. Selected and approved on 2026-09-30.** Preserve the literal route and endpoint oracle, freeze the page clock before navigation, select `demo-1`, block OSM tile requests, and assert that no snapshot API request occurs. Do not assert that sparse-snapshot fallback markers move. This tests the existing moving mode without changing product behavior; it requires a narrow exception to the Sprint 3 snapshot-mocking rule for this case.
3. **Make demo fallback markers move in snapshot mode. Not recommended and not authorized.** This changes product behavior and conflicts with DEC-010; it would require a separate product-scope decision and implementation contract, not this test-only correction.

## Decision and rationale

Option 2 was selected and approved on 2026-09-30 as a test-only correction to the R3-T06 procedure. Update the versioned Sprint 3 contract and T06 task contract before implementation. Keep the existing route oracle unchanged:

- Freeze `page.clock` at `2026-09-29T12:00:00.000Z` before navigation.
- Install an `/api/snapshot` route guard that aborts and counts any unexpected request; do not trigger snapshot loading. Assert the request count remains zero.
- Block external OpenStreetMap tile requests in the test.
- Start on the existing initial idle-demo page, select `demo-1`, and assert the same literal initial coordinate and every two-second route coordinate through t=18s.
- At the endpoint, assert `0 kn`, `43°`, and `12:00:18 UTC`; after one further 2,000 ms tick, assert the final coordinate and card values, including the last-step time, remain unchanged.
- Do not add product code, change route data, movement rules, UI semantics, or the sparse-snapshot behavior tested by T07.

This replaces only the infeasible empty-snapshot/fallback setup and adds a narrow no-request exception to the Sprint 3 browser-fixture rule. T07 remains responsible for empty-success UI behavior.

## Consequences, risks, and deferred work

- DEC-013 and its versioned contract synchronization are complete; `SPRINT-03.md` and the T06 task contract now carry the approved setup. The 2026-09-29 T06 `HOLD` remains historical; implementation is still separately task-gated.
- The decision index records DEC-013 as `Ready`. No T06 test implementation or product behavior change is authorized by this decision.
- A separate reviewed bounded R3-T06 implementation contract and explicit approval are still required before changing or adding tests.
- If the initial idle-demo state does not move deterministically under the controlled page clock, stop and retain `HOLD`; do not alter application behavior under this decision.
- No changes to `SPEC.md`, DEC-010, DEC-012, product code, evidence, or runbook are part of this proposal.

## Verification / revisit trigger

Verify that the versioned Sprint wording, T06 contract, and decision index agree; preserve the literal route oracle and confirm that the approved initial idle-demo setup requires no snapshot API request. Revisit if the initial idle-demo route does not satisfy the literal oracle, the product owner requests different behavior, or synchronization would require changes outside this decision's boundary.

## Linked task and evidence boundary

- **Proposal task:** `TASK-SEA-R3-PLAN-002` prepared the Draft. `TASK-SEA-R3-PLAN-003` records the approved versioned contract synchronization; neither task authorizes test implementation.
- **Evidence:** none. Source inspection identified the setup mismatch; no T06 tests or browser movement checks were run.
- **Operational history:** append a RUNBOOK entry only after a resulting bounded work item is factually verified.
