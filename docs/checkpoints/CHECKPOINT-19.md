# CHECKPOINT-19 — LIVE-008 bounded capture outcome

- **ID:** `CHECKPOINT-SEA-R2-019`
- **Version:** `1.0.0`
- **Status:** `Active`
- **Product owner:** методист відділення теорії судноводіння навчального центру «Норд-Вест»
- **Delivery / technical owner:** виконавець проєкту
- **Date:** 2026-09-26
- **Related artifacts:** [`../../TASK_SPEC.md`](../../TASK_SPEC.md), [`../../EVIDENCE.md`](../../EVIDENCE.md), [`../../RUNBOOK.md`](../../RUNBOOK.md), [`CHECKPOINT-03.md`](CHECKPOINT-03.md), [`CHECKPOINT-18.md`](CHECKPOINT-18.md), [`../decisions/DEC-009-r2-current-task-status.md`](../decisions/DEC-009-r2-current-task-status.md), `TASK-SEA-R2-B09B10-LIVE-008`, `E-SEA-073`.

## Outcome and status boundary

**LIVE-008's single attempt was completed and recorded; CHECKPOINT-03 remains `HOLD / not passed`.** The existing reader returned fixed code `connect_failed` before its local subscription-send callback. No PositionReport or live sample/provenance was obtained. The cause is unknown; no retry is authorized.

## State at checkpoint

- **Branch:** `sprint2` at preflight; all pre-existing modified and untracked paths were preserved.
- **Task / authorization:** `TASK-SEA-R2-B09B10-LIVE-008`, explicitly approved by the user with `continue LIVE-008`; authorization was limited to one loader call and one reader attempt.
- **Preflight:** `.env.local` was confirmed ignored and untracked without opening it. The live sample, provenance and CHECKPOINT-19 targets were absent before the attempt. They remained absent afterward.
- **Configuration:** the installed CommonJS `@next/env` loader was called once with a silent logger. Key presence was checked without exposing its value; the reader was started, so the accessor indicated a configured value. This does not establish key validity or provider acceptance.
- **Reader result:** one existing server-side reader attempt was made with the configured AISStream filter and bounding box, under a 15-second deadline. The reader returned fixed code `connect_failed` after approximately 4 seconds; the local subscription-send callback did not run (`subscribed: false`). No provider acknowledgement or PositionReport was observed. No retry or second connection occurred.
- **Sample state:** `data/samples/live/position-report.sample.json` and `data/samples/live/PROVENANCE.md` were not created.
- **Timestamp:** 2026-09-26T13:06:36Z post-attempt observation.

## CHECKPOINT-03 criteria

| Criterion | State | Evidence and limitation |
|---|---|---|
| One real server-received AISStream PositionReport that passes validation | **NOT MET** | `E-SEA-073`: the reader returned `connect_failed` before subscription-send; no PositionReport was observed. |
| One actual sample with matching provenance | **NOT MET** | No live sample or provenance file was created. The existing B-10 synthetic sample remains unchanged. |
| Safe key configuration | **SUPPORTED, bounded** | LIVE-008 only checked that the accessor indicated a configured value; key validity and provider acceptance remain unknown. |
| Working demo | **SUPPORTED, local only** | Existing local/mocked evidence remains unchanged; LIVE-008 did not establish live UI/API behavior. |

The two live criteria remain unmet; CHECKPOINT-03 remains **HOLD / not passed**. This record does not establish full R2 acceptance or release readiness.

## Changed paths and preservation boundary

- **Task-owned records:** `TASK_SPEC.md` (LIVE-008 approval/outcome), `EVIDENCE.md` (append `E-SEA-073`), `RUNBOOK.md` (append LIVE-008 result), and this checkpoint.
- **Not created:** both live sample/provenance files.
- **Preserved:** every pre-existing modified and untracked path; no application/source/test/dependency/configuration path was changed.
- No staging, reset, cleanup, commit, push or deployment occurred.

## Verification and evidence

- **Observed checks:** branch, changed paths and output targets inspected; `.env.local` ignore/tracked state checked without opening it. One in-memory Node invocation called the loader once and made one reader attempt; only fixed outcome categories were emitted.
- **Evidence:** `E-SEA-073` records the observed result. RUNBOOK records the authorization, operation boundary, result and handoff.
- **Final structural check:** `git diff --check` passed after all task-owned records were finalized (no output).
- **Secret/network boundary:** no key value, raw provider envelope/error, `.env*` content or unrelated environment values were printed or persisted. No retry, second request or troubleshooting occurred.

## Unknowns and blockers

- The cause of `connect_failed` is unknown; evidence does not distinguish key validity, local/network connection state, provider behavior or a transient service condition.
- No eligible live PositionReport, matching sample/provenance, live UI/API behavior, complete Sprint 2 acceptance or release readiness was established.
- LIVE-008's single attempt is exhausted. A further provider request requires a separate bounded contract and explicit approval.

## Rollback / recovery

No sample or product change needs rollback. Preserve this checkpoint and append-only evidence/history; correct factual errors only through a superseding record. Preserve all pre-existing paths. No reset, cleanup, commit, push or deployment is authorized.

## Handoff

1. Keep CHECKPOINT-03 at **HOLD / not passed**.
2. Do not infer the cause of `connect_failed` or key validity from this attempt.
3. Do not retry LIVE-008; its single attempt is exhausted.
4. Any further live API/UI verification or remaining Sprint 2 acceptance requires a new bounded contract and explicit approval.
