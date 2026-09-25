# CHECKPOINT-09 — LIVE-005 harness preflight blocked

- **ID:** `CHECKPOINT-SEA-R2-009`
- **Version:** `1.0.0`
- **Status:** `Active`
- **Product owner:** методист відділення теорії судноводіння навчального центру «Норд-Вест»
- **Delivery / technical owner:** виконавець проєкту
- **Date:** 2026-09-25
- **Related artifacts:** [`../../CLAUDE.md`](../../CLAUDE.md), [`../../SPEC.md`](../../SPEC.md), [`../../TASK_SPEC.md`](../../TASK_SPEC.md), [`../../EVIDENCE.md`](../../EVIDENCE.md), [`../../RUNBOOK.md`](../../RUNBOOK.md), [`../decisions/DEC-004-checkpoint-convention.md`](../decisions/DEC-004-checkpoint-convention.md), [`CHECKPOINT-03.md`](CHECKPOINT-03.md), [`CHECKPOINT-08.md`](CHECKPOINT-08.md), `TASK-SEA-R2-B09B10-LIVE-005`, `E-SEA-059`.

## Checkpoint outcome and history

**HOLD — Sprint checkpoint 03 is not passed.** LIVE-005 was explicitly approved, but its bounded batch stopped at harness preflight after a JavaScript parse error. No AISStream reader invocation or provider connection occurred. This record follows CHECKPOINT-08; it does not rewrite prior checkpoints and is a restart summary, not evidence.

## State at checkpoint

- **Branch / baseline:** branch `sprint2`; `HEAD` `2147d93` (`fix(r2): decode websocket binary frames`).
- **Current task:** `TASK-SEA-R2-B09B10-LIVE-005`; the user reviewed the exact contract and said `continue`, authorizing at most ten attempts and immediate stop at first eligible sample.
- **Preflight:** Node.js v22.23.2. Both live sample targets were absent. `.env.local` was ignored and untracked without reading its contents.
- **Harness:** the inline `node --experimental-strip-types --input-type=module` source failed to parse with `SyntaxError: Unexpected identifier 'MetaData'`, exit 1. Module evaluation did not begin; `loadEnvConfig`, `getAISStreamApiKey`, and `startAISStreamReader` were not invoked.
- **Attempt count:** zero direct reader invocations; zero WebSocket/provider connections. The task stopped on the required harness preflight failure. No correction or retry was attempted.
- **Sample:** no live sample or provenance was created; the existing synthetic B-10 artifacts were not changed.
- **Timestamp:** post-failure UTC clock observation `2026-09-25T10:24:16Z`.

## Sprint checkpoint criteria

| Criterion | State | Evidence and limitation |
|---|---|---|
| One real server-received AISStream PositionReport | **NOT MET** | LIVE-005 stopped before any reader invocation. E-SEA-058 remains an unsuitable-message result from LIVE-004; no eligible report has been captured. |
| One actual sample with matching provenance | **NOT MET** | No live sample/provenance files exist. The existing B-10 sample remains synthetic. |
| Safe key configuration | **UNCHANGED; prior evidence only** | LIVE-005 confirmed only `.env.local` ignore/tracking status and did not load environment configuration or access the key. Earlier bounded evidence remains limited to its own task. |
| Working demo | **USER-SUPPLIED; not independently verified by this task** | The operator-provided screenshot remains separate visual evidence; this task made no live request and did not independently verify end-to-end behavior. |

The live receipt and sample/provenance criteria remain unmet; Sprint checkpoint 03 stays **HOLD**.

## Changed paths and Git boundary

- **Task-specific additions:** appended the LIVE-005 draft contract to `TASK_SPEC.md`; appended `E-SEA-059` to `EVIDENCE.md`; appended the LIVE-005 outcome to `RUNBOOK.md`; created this checkpoint.
- **Not created:** `data/samples/live/position-report.sample.json` and `data/samples/live/PROVENANCE.md`.
- **Preserved:** pre-existing modified `EVIDENCE.md`, `RUNBOOK.md`, `TASK_SPEC.md`; staged `sprint-2.png`; deleted `START.md`; and untracked `.agents/`, `.claude/skills/`, `README.pdf`, `reference/`, and `skills-lock.json`. No unrelated path was staged, reset, cleaned, or removed.
- **No product/test changes:** no source, route, test, dependency, configuration, build, or deployment action occurred.

## Verification and evidence

- **Commands/observations:** `node --version` returned `v22.23.2`; target-file checks reported both live paths absent; `git check-ignore` reported `.env.local` ignored and `git ls-files` reported it untracked. The inline Node harness command failed with a parse-time `SyntaxError` before module evaluation; exit 1. `git diff --check` passed after the LIVE-005 contract draft and before the post-attempt records; final documentation check remains to be run.
- **Evidence:** `E-SEA-059` records the approval, preflight failure, zero-attempt count, and limitations. E-SEA-058 and CHECKPOINT-08 remain unchanged historical context.
- **Secret / payload boundary:** no environment loader, key accessor, or reader ran after the parser failure. No provider payload or sample exists.
- **Status boundary:** the failure is local harness syntax, not a provider result. It does not establish key validity, provider acceptance, live receipt, vessel identity, traffic completeness, full R2 acceptance, or release readiness.

## Unknowns and blockers

- The harness source did not compile, so the approved live attempt batch did not begin.
- The LIVE-005 batch is stopped at preflight; no remaining attempt is used after a harness failure.
- Live receipt, actual sample/provenance, independently verified live UI/API behavior, complete R2 acceptance, and release readiness remain `Unknown` / `Needs verification`.
- Human review of the complete documentation diff remains pending.

## Rollback / recovery

No sample, source, or configuration change needs rollback. Preserve historical evidence. If this documentation diff is rejected, inspect and revise only the LIVE-005-specific contract/evidence/runbook/checkpoint additions; preserve all pre-existing staged, deleted, modified, and untracked paths. Any future live attempt after harness correction requires a new bounded contract and explicit review/authorization. Do not reset the branch or alter environment files.

## Handoff

1. Review the LIVE-005 draft, E-SEA-059, the new RUNBOOK entry, and this checkpoint.
2. Keep Sprint checkpoint 03 at **HOLD / not passed**; no live receipt or sample/provenance was obtained.
3. Treat LIVE-005 as stopped before attempt 1. Do not repair and rerun its harness under this exhausted batch.
4. Choose `continue`, `revise`, or `HOLD` for the documentation diff. No commit, push, or deployment is authorized.
