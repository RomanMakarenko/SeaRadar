# CHECKPOINT-21 — LIVE-009 bounded stream capture result

- **ID:** `CHECKPOINT-SEA-R2-021`
- **Version:** `1.0.0`
- **Status:** `Active`
- **Product owner:** методист відділення теорії судноводіння навчального центру «Норд-Вест»
- **Delivery / technical owner:** виконавець проєкту
- **Date:** 2026-09-26
- **Related artifacts:** [`../../TASK_SPEC.md`](../../TASK_SPEC.md), [`../../EVIDENCE.md`](../../EVIDENCE.md), [`../../RUNBOOK.md`](../../RUNBOOK.md), [`CHECKPOINT-03.md`](CHECKPOINT-03.md), [`CHECKPOINT-20.md`](CHECKPOINT-20.md), [`../decisions/DEC-009-r2-current-task-status.md`](../decisions/DEC-009-r2-current-task-status.md), `TASK-SEA-R2-B09B10-LIVE-009`, `E-SEA-075`.

## Outcome and status boundary

**LIVE-009's single approved connection/window received a transformer-accepted PositionReport and produced a verified minimized sample with matching provenance.** This supports the two bounded live criteria described below. It does not establish full Sprint 2 acceptance, release readiness, provider acknowledgement, or live UI/API end-to-end behavior. The historical CHECKPOINT-03 record is not rewritten; its recorded status remains **HOLD / not passed** pending human review and any superseding checkpoint decision.

## State at checkpoint

- **Branch:** `sprint2`; pre-existing modified and untracked paths were preserved.
- **Task / authorization:** `TASK-SEA-R2-B09B10-LIVE-009`; explicitly approved by the user with `continue LIVE-009`. Authorization was limited to one loader call, one reader connection and one maximum 15-second stream window.
- **Preflight:** `.env.local` was confirmed ignored and untracked without opening its contents. The two live sample/provenance paths and CHECKPOINT-21 were absent before the attempt.
- **Configuration:** installed CommonJS `@next/env` loader called once with a silent logger. Key presence was checked without outputting the value; no claim is made about key validity.
- **Reader result:** one existing-reader WebSocket connection/window ran for approximately 7 seconds. The local subscription-send callback ran (`subscribed: true`); this is not provider acknowledgement. Two text messages arrived in the same connection: the first was rejected by the existing transformer and discarded; the next passed the transformer. Reader stopped on that first accepted report. No retry or second connection occurred.
- **Sample / provenance:** the accepted report was projected to the allowlisted B-10 fields. No null normalization was required. `data/samples/live/position-report.sample.json` and `data/samples/live/PROVENANCE.md` were saved and their shape/correspondence verified without printing the payload. No raw envelope was persisted. Review found that `MetaData.latitude`/`longitude` differ from `Message.PositionReport.Latitude`/`Longitude`; LIVE-009 does not require these pairs to match, and the transformer validates the PositionReport pair. Provenance now records this distinction; the metadata pair's relationship to the report coordinates remains unexplained.
- **Timestamp:** 2026-09-26T14:38:17Z post-attempt observation.

## CHECKPOINT-03 criteria update

| Criterion | Current evidence state | Evidence and limitation |
|---|---|---|
| One real server-received AISStream PositionReport that passes validation | **SUPPORTED, bounded** | `E-SEA-075`: a server-side reader received a message that passed the existing transformer during this single window. The local subscription-send callback does not prove provider acknowledgement. |
| One actual sample with matching provenance | **SUPPORTED, bounded** | `E-SEA-075`: allowlisted sample and matching provenance saved and structurally/correspondence checked without payload output. |
| Safe key configuration | **SUPPORTED, bounded** | The loader/accessor indicated a configured value without exposing it. Key validity and provider acceptance remain unestablished. |
| Working demo | **SUPPORTED, local only** | Existing local/mock evidence remains unchanged. LIVE-009 did not verify live UI/API end-to-end behavior. |

These LIVE-009 observations support the two live criteria for human review. This checkpoint does not itself rewrite CHECKPOINT-03 or declare overall Sprint 2 acceptance; that status remains **HOLD / not passed** in the historical record until a human reviews and records a superseding decision.

## Changed paths and preservation boundary

- **Task-owned records:** `TASK_SPEC.md` (LIVE-009 outcome), `EVIDENCE.md` (append `E-SEA-075`), `RUNBOOK.md` (append LIVE-009 result), the two new live sample/provenance files, and this checkpoint.
- **Preserved:** every pre-existing modified and untracked path; no application/source/test/dependency/configuration path changed.
- No staging, reset, cleanup, commit, push or deployment occurred.

## Verification and evidence

- **Observed checks:** branch/worktree and target paths checked; `.env.local` ignore/tracked state confirmed without opening it. One in-memory Node invocation called the loader once and made one existing-reader connection. Only safe fixed outcomes/counters/booleans were emitted.
- **Saved artifacts:** sample allowlist/shape and provenance correspondence were verified without printing the message payload.
- **Evidence:** `E-SEA-075` records the observed result and its limits; RUNBOOK records authorization, operation boundary, result and handoff.
- **Final structural check:** `git diff --check` passed after all task-owned records were finalized (no output); the sample allowlist and provenance-link/essential-contents check passed without printing the payload.
- **Secret/network boundary:** no key value, raw provider envelope/error, close reason, `.env*` content or unrelated environment values were printed or persisted.

## Unknowns and blockers

- The local subscription-send callback is not an upstream acknowledgement; no provider acknowledgement was observed.
- Key validity is unknown. Live UI/API end-to-end behavior remains unverified.
- Full Sprint 2 acceptance and release readiness are not established. The historical CHECKPOINT-03 record remains HOLD until human review and a superseding decision, if approved.

## Rollback / recovery

The sample and provenance passed the bounded task's verification and are retained as task-owned evidence. If a factual defect is found, preserve current history and correct only through a superseding factual record; do not overwrite append-only evidence. Preserve all pre-existing paths. No reset, cleanup, commit, push or deployment is authorized.

## Handoff

1. Have a human review the LIVE-009 evidence and sample/provenance, with payload output still minimized.
2. Keep historical CHECKPOINT-03 at **HOLD / not passed** until a human records an explicit superseding status decision.
3. Do not infer provider acknowledgement, key validity, live UI/API end-to-end success or full Sprint 2 acceptance from this bounded capture.
4. No further live provider attempt is authorized by LIVE-009; any follow-on network action requires a separate bounded contract and explicit approval.
