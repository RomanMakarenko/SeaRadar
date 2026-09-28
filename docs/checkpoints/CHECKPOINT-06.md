# CHECKPOINT-06 — LIVE-003 non-text message event

- **ID:** `CHECKPOINT-SEA-R2-006`
- **Version:** `1.0.0`
- **Status:** `Active`
- **Product owner:** методист відділення теорії судноводіння навчального центру «Норд-Вест»
- **Delivery / technical owner:** виконавець проєкту
- **Date:** 2026-09-24
- **Related artifacts:** [`../../SPRINT-02.md`](../../SPRINT-02.md), [`../../TASK_SPEC.md`](../../TASK_SPEC.md), [`../../EVIDENCE.md`](../../EVIDENCE.md), [`../../RUNBOOK.md`](../../RUNBOOK.md), [`../decisions/DEC-004-checkpoint-convention.md`](../decisions/DEC-004-checkpoint-convention.md), [`CHECKPOINT-03.md`](CHECKPOINT-03.md), [`CHECKPOINT-04.md`](CHECKPOINT-04.md), [`CHECKPOINT-05.md`](CHECKPOINT-05.md), `TASK-SEA-R2-B09B10-LIVE-003`, `E-SEA-052`–`E-SEA-055`.

## Checkpoint outcome and supersession

**HOLD — Sprint 2 checkpoint 03 is not passed.** This is the latest restart record after the one LIVE-003 reader attempt. It preserves CHECKPOINT-05 as the record of the earlier preflight stop and does not rewrite CHECKPOINT-03/04/05. The attempt classified the reader's fixed `provider_error` path but produced no valid PositionReport or live sample.

## State at checkpoint

- **Last confirmed commit:** `4c8dea2` on branch `sprint2`; no commit or source change occurred during LIVE-003.
- **Current task:** `TASK-SEA-R2-B09B10-LIVE-003`. The user authorized the program to read the key; the task amendment allowed the installed `@next/env` loader in memory and retained accessor-only key consumption for the previously approved, unused single attempt.
- **Key boundary:** `loadEnvConfig(process.cwd())` populated environment state in memory. The existing accessor returned a configured value, reported only as `KEY_CONFIGURED=yes`. No key value or `.env*` content was printed or inspected. The key's validity was not tested independently.
- **Live reader result:** the one reader invocation reported `SUBSCRIBED=yes`; the temporary wrapper observed `non_text_message` based only on `typeof event.data`. The reader returned fixed `provider_error` (`OUTCOME=reader_error`, exit 1). No raw frame or error detail was decoded, retained or displayed.
- **Attempt boundary:** one reader invocation, one WebSocket, 15-second maximum deadline, no retry or provider troubleshooting. The LIVE-003 attempt allowance is exhausted.
- **Sample state:** no valid PositionReport was received, and no live sample or provenance was created. Both authorized live sample targets remained absent; the synthetic B-10 sample/provenance remain unchanged.
- **User-reported context:** the user previously reported that the key was stored in `.env.local` and worked through Postman. This was not independently verified; the file and Postman session were not inspected.

## Sprint checkpoint criteria

| Criterion | State | Evidence and limitation |
|---|---|---|
| One real server-received AISStream PositionReport | **NOT MET** | `E-SEA-052` and `E-SEA-053` record earlier `provider_error` outcomes; `E-SEA-054` records the preflight stop; `E-SEA-055` records this attempt's non-text message event and fixed reader error. |
| One actual sample with matching provenance | **NOT MET** | No live sample/provenance was created; the synthetic fixture remains synthetic. |
| Safe key configuration | **SUPPORTED, bounded** | Prior B-08 evidence supports the local configuration boundary; this attempt confirms only that the accessor returned a value after in-memory environment loading, not that the key is valid or accepted. |
| Working demo | **SUPPORTED, local only** | `E-SEA-026` and `E-SEA-051` cover local/mock behavior, not a live UI/API flow. |

The live receipt and sample/provenance criteria remain unmet; the overall Sprint checkpoint remains **HOLD**.

## Changed paths and review boundary

- **Changed for this bounded diagnostic outcome:** `TASK_SPEC.md` (authorization amendment and outcome), append-only `EVIDENCE.md` entry `E-SEA-055`, append-only `RUNBOOK.md` entry, and this restart record.
- **Not created:** `data/samples/live/position-report.sample.json` and `data/samples/live/PROVENANCE.md`.
- **Preserved:** CHECKPOINT-03, CHECKPOINT-04 and CHECKPOINT-05; the synthetic B-10 fixture/provenance; all pre-existing deleted/untracked paths and unrelated files.
- **No product changes:** no source, route, test, dependency, UI, Sprint/decision or secret path was changed. No staging, commit, push, deployment or cleanup occurred.

## Verification and evidence

- **Environment setup:** repository documentation for Next.js environment variables was read. `@next/env` was already resolvable; Node.js v22.23.2 runtime imports of the accessor, reader and transformer passed after using CommonJS `require` for the CommonJS package. An initial ESM named import failed before the loader ran; no key was loaded and no network call occurred in that failed preflight.
- **Preflight:** `.env.local` ignore/tracking checks passed; the live sample targets were absent; the accessor output only `KEY_CONFIGURED=yes` after in-memory environment loading.
- **Attempt:** one invocation returned `SUBSCRIBED=yes`, `EVENT_CATEGORY=non_text_message`, `READER_ERROR=provider_error`, `SAMPLE_SAVED=no`, `OUTCOME=reader_error` (exit 1). No raw content, key, provider error text or close reason was printed or saved.
- **Post-attempt:** both live sample targets remained absent. `git diff --check` for tracked documentation and no-index whitespace checks for CHECKPOINT-05/06 emitted no diagnostics; the LIVE-003 documentation structure check passed.
- **Evidence:** `E-SEA-055` records this attempt; `E-SEA-054` records the earlier key preflight stop; `E-SEA-052/053` record the previous two attempts. This checkpoint is a summary, not evidence itself.
- **Secret boundary:** no key value or `.env*` content was printed or manually inspected. Only the existing accessor returned the AISStream key to the one authorized reader invocation.

## Unknowns and blockers

- The non-string `event.data` observation identifies the reader branch that maps this attempt to `provider_error`. The data content and whether it represents a binary-encoded PositionReport remain unknown because the frame was not decoded.
- The underlying reason for the non-string data, provider/transport behavior, key validity, provider acceptance, live sample provenance, live UI/API end-to-end behavior, complete R2 acceptance and release readiness remain `Unknown` / `Needs verification`.
- LIVE-003 permits no further live attempt or source troubleshooting. A reader compatibility fix requires a separate reviewed task contract and deterministic tests; do not patch product code under this diagnostic contract.

## Rollback / recovery

No product change or sample needs rollback. Evidence and RUNBOOK are append-only; correct a later factual error with a superseding entry rather than rewriting history. Preserve CHECKPOINT-03/04/05, the synthetic fixture and all pre-existing deleted/untracked paths. Do not reset the branch or alter secrets.

## Next-session handoff

1. Review `E-SEA-055`, the appended RUNBOOK entry, the LIVE-003 amendment and this checkpoint diff.
2. Keep Sprint checkpoint 03 at **HOLD / not passed**; `SUBSCRIBED=yes` and event classification do not establish provider acknowledgment or a valid live message.
3. Do not retry. The next bounded action, if approved, is a separate task contract to determine how the existing reader should safely handle the observed non-string message data, with deterministic tests and no live-provider request.
4. Preserve the working-tree boundary. No commit/push, deployment, provider troubleshooting, Postman inspection or further secret access is authorized by this record.
