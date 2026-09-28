# CHECKPOINT-20 — DIAG-008 instrumented connection-stage result

- **ID:** `CHECKPOINT-SEA-R2-020`
- **Version:** `1.0.0`
- **Status:** `Active`
- **Product owner:** методист відділення теорії судноводіння навчального центру «Норд-Вест»
- **Delivery / technical owner:** виконавець проєкту
- **Date:** 2026-09-26
- **Related artifacts:** [`../../TASK_SPEC.md`](../../TASK_SPEC.md), [`../../EVIDENCE.md`](../../EVIDENCE.md), [`../../RUNBOOK.md`](../../RUNBOOK.md), [`CHECKPOINT-03.md`](CHECKPOINT-03.md), [`CHECKPOINT-19.md`](CHECKPOINT-19.md), [`../decisions/DEC-009-r2-current-task-status.md`](../decisions/DEC-009-r2-current-task-status.md), `TASK-SEA-R2-B09B10-DIAG-008`, `E-SEA-074`.

## Outcome and status boundary

**DIAG-008's single instrumented attempt was completed and recorded.** The WebSocket opened, the existing reader's local subscription-send callback ran, and the first text message was not accepted by the existing transformer. Raw message/error details were not captured. This does not establish the reason for the transform rejection or the cause of LIVE-008's earlier `connect_failed`. CHECKPOINT-03 remains **HOLD / not passed**.

## State at checkpoint

- **Branch:** `sprint2`; pre-existing modified and untracked paths were preserved.
- **Task / authorization:** `TASK-SEA-R2-B09B10-DIAG-008`, explicitly approved with `continue DIAG-008`; scope was one loader call and at most one instrumented reader attempt.
- **Preflight:** `.env.local` was confirmed ignored and untracked without opening it. CHECKPOINT-20 and the two live sample/provenance paths were absent before the attempt and remained absent afterward.
- **Configuration:** installed CommonJS `@next/env` loader called once with a silent logger. Key presence was checked without outputting the value. No claim is made about key validity.
- **Lifecycle observations:** fixed categories observed in order: `open_seen`, `subscription_send_callback`, `message_transform_rejected`, within approximately one second. The transformer was used only to produce a boolean acceptance result; the text payload was discarded. `subscription_send_callback` means the local send returned and is not provider acknowledgement.
- **Attempt boundary:** the first received text message ended the attempt. No retry, polling or second connection occurred.
- **Timestamp:** 2026-09-26T13:50:43Z post-attempt observation.

## Diagnostic interpretation

| Question | State | Evidence and limitation |
|---|---|---|
| Did this attempt reach WebSocket open? | **YES, bounded** | `E-SEA-074`: `open_seen` observed. |
| Did the existing reader locally send its subscription? | **YES, bounded** | `subscription_send_callback` observed. This is not provider acknowledgement. |
| Did the first text message pass the existing transformer? | **NO** | `message_transform_rejected`; raw message was discarded, so the exact reason is unknown. |
| What caused LIVE-008's prior `connect_failed`? | **UNKNOWN** | This separate attempt successfully reached open/send, but does not identify why the earlier attempt failed. |
| Are CHECKPOINT-03 live receipt and sample/provenance criteria met? | **NO** | No transformer-accepted PositionReport or matching sample/provenance was produced. |

The diagnostic provides lifecycle facts for this attempt only. It does not establish provider acknowledgement, key validity, a provider root cause, live application/API success, full Sprint 2 acceptance or release readiness.

## Changed paths and preservation boundary

- **Task-owned records:** `TASK_SPEC.md` (DIAG-008 approval/outcome), `EVIDENCE.md` (append `E-SEA-074`), `RUNBOOK.md` (append DIAG-008 result), and this checkpoint.
- **Not created:** live sample and provenance files.
- **Preserved:** every pre-existing modified and untracked path; no application/source/test/dependency/configuration path changed.
- No staging, reset, cleanup, commit, push or deployment occurred.

## Verification and evidence

- **Observed checks:** branch/worktree and target paths checked; `.env.local` ignore/tracked state confirmed without opening it. One in-memory Node invocation called the loader once and made one instrumented reader attempt; output contained fixed categories and booleans only.
- **Evidence:** `E-SEA-074` records exact observed stage categories and limits; RUNBOOK records the authorization, operation and handoff.
- **Final structural check:** `git diff --check` passed after all task-owned records were finalized (no output).
- **Secret/network boundary:** no key value, raw payload, raw error, close reason or `.env*` content was emitted or persisted.

## Unknowns and blockers

- The exact reason the first text message failed transformation is unknown; raw content was intentionally discarded.
- The cause of LIVE-008's earlier `connect_failed` remains unknown; the later successful open/send does not prove whether the earlier failure was transient or caused by local/network/provider state.
- CHECKPOINT-03 live receipt and matching sample/provenance, live API/UI behavior, complete Sprint 2 acceptance and release readiness remain unverified.
- DIAG-008's single attempt is exhausted. Further provider/network activity needs a separate bounded contract and explicit approval.

## Rollback / recovery

No sample or product change needs rollback. Preserve this checkpoint and append-only evidence/history; correct facts only through a superseding record. Preserve all pre-existing paths. No reset, cleanup, commit, push or deployment is authorized.

## Handoff

1. Keep CHECKPOINT-03 at **HOLD / not passed**.
2. Do not infer the transformer's rejection reason or the cause of LIVE-008's earlier `connect_failed` from these lifecycle observations.
3. Do not retry DIAG-008; its single attempt is exhausted.
4. Any follow-on provider attempt, raw diagnostic capture, or application change requires a separate bounded contract and explicit approval.
