# CHECKPOINT-05 — LIVE-003 preflight blocked before provider attempt

- **ID:** `CHECKPOINT-SEA-R2-005`
- **Version:** `1.0.0`
- **Status:** `Active`
- **Product owner:** методист відділення теорії судноводіння навчального центру «Норд-Вест»
- **Delivery / technical owner:** виконавець проєкту
- **Date:** 2026-09-24
- **Related artifacts:** [`../../SPRINT-02.md`](../../SPRINT-02.md), [`../../TASK_SPEC.md`](../../TASK_SPEC.md), [`../../EVIDENCE.md`](../../EVIDENCE.md), [`../../RUNBOOK.md`](../../RUNBOOK.md), [`../decisions/DEC-004-checkpoint-convention.md`](../decisions/DEC-004-checkpoint-convention.md), [`CHECKPOINT-03.md`](CHECKPOINT-03.md), [`CHECKPOINT-04.md`](CHECKPOINT-04.md), `TASK-SEA-R2-B09B10-LIVE-003`, `E-SEA-052`–`E-SEA-054`.

## Checkpoint outcome and supersession

**HOLD — Sprint 2 checkpoint 03 is not passed.** This is the latest restart record after LIVE-003 stopped at its key preflight. It does not supersede the historical results in CHECKPOINT-03 or CHECKPOINT-04, and it records no provider outcome because the reader was not invoked.

## State at checkpoint

- **Last confirmed commit:** `4c8dea2` on branch `sprint2`; no commit or source change was made during this preflight.
- **Current task:** `TASK-SEA-R2-B09B10-LIVE-003`. The user instructed the assistant to proceed; the instruction was recorded as `continue` for exactly one attempt subject to the task's stop conditions.
- **Preflight result:** `.env.local` ignore/tracking checks passed and the live sample targets were absent. A direct Node.js v22.23.2 invocation of the existing `getAISStreamApiKey()` accessor, without loading local environment files, returned `null`; only `KEY_CONFIGURED=no` was printed. The guard exited 4 as intended.
- **Attempt boundary:** the key-missing stop condition applied before reader startup. No reader invocation, WebSocket connection, provider request, retry, or live provider event occurred. The one-attempt allowance remains unused.
- **User-reported context:** the user previously reported that the key was stored in `.env.local` and worked through Postman. This was not independently verified; neither the file contents nor Postman was inspected.
- **Sample state:** no live sample or provenance was created. The existing synthetic B-10 sample/provenance remain unchanged.
- **Checkpoint status:** Sprint checkpoint 03 remains **HOLD**; this preflight does not resolve the missing live PositionReport or sample/provenance criteria.

## Sprint checkpoint criteria

| Criterion | State | Evidence and limitation |
|---|---|---|
| One real server-received AISStream PositionReport | **NOT MET** | `E-SEA-052` and `E-SEA-053` record two earlier attempts ending in fixed `provider_error`; `E-SEA-054` records that LIVE-003 stopped before reader startup. |
| One actual sample with matching provenance | **NOT MET** | No live sample/provenance exists; the synthetic fixture remains synthetic. |
| Safe key configuration | **SUPPORTED, bounded** | Prior `E-SEA-031`–`E-SEA-033` support the local configuration/ignore boundary. LIVE-003's direct Node process did not receive a configured value; this does not establish the contents or validity of `.env.local`. |
| Working demo | **SUPPORTED, local only** | `E-SEA-026` and `E-SEA-051` cover local/mock behavior, not a live UI/API flow. |

The live receipt and sample/provenance requirements remain unmet; the overall Sprint checkpoint remains **HOLD**.

## Changed paths and review boundary

- **Changed for this bounded documentation outcome:** `TASK_SPEC.md` (LIVE-003 status and preflight record), append-only `EVIDENCE.md` entry `E-SEA-054`, append-only `RUNBOOK.md` entry, and this restart record.
- **Not created:** `data/samples/live/position-report.sample.json` and `data/samples/live/PROVENANCE.md`.
- **Preserved:** `CHECKPOINT-03.md`, `CHECKPOINT-04.md`, the synthetic B-10 fixture/provenance, all pre-existing deleted/untracked paths and unrelated files.
- **No product changes:** no source, route, test, dependency, UI, Sprint/decision or secret path was changed. No staging, commit, push, deployment or cleanup occurred.

## Verification and evidence

- **Preflight:** `.env.local` ignore/tracking checks passed; live sample targets were absent; the existing key accessor returned `null` in the invoking Node.js v22.23.2 process (`KEY_CONFIGURED=no`, guarded exit 4). No local env file was loaded or inspected.
- **Provider attempt:** none. No reader, socket or provider request was started; no provider event or PositionReport was received.
- **Documentation check:** `git diff --check -- TASK_SPEC.md EVIDENCE.md RUNBOOK.md` and the no-index whitespace check for new `docs/checkpoints/CHECKPOINT-05.md` emitted no whitespace diagnostics. A structural check for required checkpoint sections, evidence reference and HOLD outcome passed.
- **Evidence:** `E-SEA-054` records the preflight observation; `E-SEA-052` and `E-SEA-053` record the two earlier live attempts. This checkpoint summarizes those facts and is not evidence itself.
- **Secret boundary:** no key value or `.env.local` content was printed, manually inspected or loaded.

## Unknowns and blockers

- The current LIVE-003 contract prohibits tools that load local environment files. The direct Node process therefore could not access a value the user reported as stored in `.env.local`.
- The cause of the two earlier `provider_error` outcomes, key validity, provider availability/acceptance, live receipt, sample provenance, live UI/API end-to-end behavior, complete R2 acceptance and release readiness remain `Unknown` / `Needs verification`.
- Any future provider attempt requires a reviewed contract revision that explicitly authorizes a safe in-memory environment-loading method, followed by a separate `continue` for that exact revised contract. No attempt is authorized by this checkpoint.

## Rollback / recovery

No sample artifact or product change needs rollback. Evidence and RUNBOOK are append-only; if a later factual correction is needed, append a superseding record rather than rewriting history. Keep CHECKPOINT-03 and CHECKPOINT-04 unchanged, preserve the synthetic fixture and all pre-existing deleted/untracked paths, and do not reset the branch or alter secrets.

## Next-session handoff

1. Review `E-SEA-054`, the appended RUNBOOK record, `TASK_SPEC.md` and this checkpoint diff.
2. Keep Sprint checkpoint 03 at **HOLD / not passed**; do not infer that the Postman report proves this reader's key availability or provider behavior.
3. Do not start the reader or make a provider request under the current preflight result. A reviewed contract revision and separate authorization are required before any environment-loading step or live attempt.
4. Preserve the working-tree boundary. No commit/push, deployment, provider troubleshooting, Postman inspection or env-file access is authorized by this record.
