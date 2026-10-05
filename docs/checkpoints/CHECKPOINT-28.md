# CHECKPOINT-28 — R4 bounded closeout and handoff

- **ID:** `CHECKPOINT-SEA-R4-028`
- **Version:** `1.0.0`
- **Status:** `Verified — bounded evidence synthesis and checkpoint-authoring checks only; no overall R4 disposition`
- **Product owner:** методист відділення теорії судноводіння навчального центру «Норд-Вест»
- **Delivery / technical owner:** виконавець проєкту
- **Date:** 2026-10-03
- **Related artifacts:** [`../../SPEC.md`](../../SPEC.md), [`../../TASK_SPEC.md`](../../TASK_SPEC.md), [`../../EVIDENCE.md`](../../EVIDENCE.md), [`../../README.md`](../../README.md), [`../../RUNBOOK.md`](../../RUNBOOK.md), [`../decisions/DEC-004-checkpoint-convention.md`](../decisions/DEC-004-checkpoint-convention.md), [`../decisions/DEC-014-r4-scope.md`](../decisions/DEC-014-r4-scope.md), [`../decisions/DEC-015-r4-archive-gate-deferral.md`](../decisions/DEC-015-r4-archive-gate-deferral.md), [`../decisions/DEC-017-r4-sprint-assignment.md`](../decisions/DEC-017-r4-sprint-assignment.md), [`CHECKPOINT-06.md`](CHECKPOINT-06.md), [`CHECKPOINT-27.md`](CHECKPOINT-27.md), `E-SEA-098`–`E-SEA-106`, `TASK-SEA-R4-CHECKPOINT-001`

## Outcome and authority boundary

This record consolidates the available bounded B-18–B-21 task outcomes and their evidence limitations. It does **not** declare overall R4 `DONE`, full MVP acceptance, release/deployment readiness, or second-laptop validation. B-18–B-20 are accepted/verified only within their recorded scopes; B-21 is closed by owner acceptance with the limitations below. E-SEA-105 is an owner-reported confirmation, not independent command-by-command verification.

R4 is assigned to Sprint 3b by DEC-017. This is an assignment only; no Sprint 3b plan is created or approved here. Archive inspection remains deferred by DEC-015, not passed or permanently waived.

## Reviewed inputs and evidence matrix

| Slice | Recorded disposition | Evidence basis and limits |
|---|---|---|
| B-18 — R4 UI state/attempt retention | `Verified` for bounded implementation and targeted checks | E-SEA-098 records the scoped UI change and observed typecheck, 2 targeted Playwright regressions, mocked-browser behavior and scoped diff checks. It does not establish a live-provider flow, full suite/build gate, or archive result. |
| B-19 — browser contract tests | `Verified` for the approved browser cases and protected regressions | `TASK-SEA-R4-B19-001` records the initial 22-pass/1-fail stop, bounded zero-vessel assertion correction, rerun of `npx playwright test tests/snapshot-interface.spec.ts` (23 passed), protected movement/selection command (2 passed), subsequent timestamp fixture correction and rerun, and user-accepted diff. Preserve the failed first run as history; no separate B-19 E-SEA entry is listed in the current R4 evidence range. |
| B-20 — final acceptance and secret boundary | `Verified` for current criteria after archive deferral | E-SEA-099–E-SEA-102 record automated checks and bounded secret-boundary result, plus owner-reported manual outcomes. The owner-reported live result was one 15-second snapshot at 13:03:44 UTC with 4 vessels and incomplete-sample wording; reload returned to demo. The no-key details are owner-confirmed. Archive inspection is excluded from the current gate by DEC-015 and remains unresolved follow-up. |
| B-21 — install/start README | `Verified — owner-accepted closure` | E-SEA-103–E-SEA-104 record the owner's project-level Node.js 24/testing acceptance and explicit B-21 closure. This is not independent runtime or command-by-command evidence and does not establish a second-laptop setup. Current continuation outcomes remain: `npm install` and `npx playwright test` were denied before execution; `npm run dev`, `npx tsc --noEmit`, and `npx next build` were not run. Historical command records remain unchanged. |
| B-18–B-21 combined confirmation | Owner-reported `PASS` for recording the confirmation | E-SEA-105 records the owner's statement that all B-18–B-21 checks were verified. It includes no per-command output, timestamps, or execution mapping and does not independently verify the checks or second laptop. |

## Current state, limitations, and unresolved inputs

- Prior task evidence and command outcomes remain authoritative for their recorded scope. Do not convert owner reports, denied commands, or not-run commands into fresh observed passes.
- Historical Node.js 22 observations remain unchanged. The later project-level Node.js 24 confirmation is owner-reported; exact command-to-runtime mapping and reconciliation of the historical records are not independently established by that confirmation.
- No second-laptop setup was tested. The cross-platform README target does not prove an installation on another machine.
- Archive format, destination/target, permission, and recovery ownership remain `Waiting for input`. No archive was created, read, inspected, packaged, or published.
- Sprint 3b is assignment-only under DEC-017; no Sprint 3b plan or overall R4 acceptance is implied.
- No product/provider/secret/runtime checks were performed for this checkpoint authoring. `.mcp.json` was not accessed.

## Changed paths and verification

- **Changed paths for this checkpoint task:** created this file and appended E-SEA-106 to `EVIDENCE.md`. Existing checkpoints, tasks, README, RUNBOOK, decisions, source, tests, and unrelated working-tree paths were not edited by this task.
- **Checkpoint-authoring checks:** see E-SEA-106 for the exact whitespace and focused structural checks run, with observed outcomes. These checks validate this documentation record and its local references only; they do not repeat or independently validate B-18–B-21 execution.
- **Evidence IDs:** E-SEA-098–E-SEA-104 record the bounded task evidence; E-SEA-105 records owner-reported combined confirmation; E-SEA-106 records only the checkpoint-authoring checks.

## Recovery and handoff

Preserve this new checkpoint and the append-only evidence entry. If this newly created checkpoint must be withdrawn before acceptance, remove only `docs/checkpoints/CHECKPOINT-28.md` under an explicit human decision; do not rewrite existing evidence or historical checkpoints. Correct any factual error by a dated superseding append-only record.

Next bounded action: human review of this checkpoint and E-SEA-106, then choose `continue`, `revise`, or `HOLD`. Any future archive handling, second-laptop validation, command-specific re-verification, broader R4 disposition, or Sprint 3b planning requires its own reviewed bounded contract and explicit authorization. No commit or push is authorized by this checkpoint.
