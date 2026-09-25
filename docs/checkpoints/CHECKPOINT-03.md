# CHECKPOINT-03 — B-08…B-10 live receipt and demo evidence

- **ID:** `CHECKPOINT-SEA-R2-003`
- **Version:** `1.0.0`
- **Status:** `Active`
- **Product owner:** методист відділення теорії судноводіння навчального центру «Норд-Вест»
- **Delivery / technical owner:** виконавець проєкту
- **Date:** 2026-09-24
- **Related artifacts:** [`../../SPRINT-02.md`](../../SPRINT-02.md), [`../../TASK_SPEC.md`](../../TASK_SPEC.md), [`../../EVIDENCE.md`](../../EVIDENCE.md), [`../../RUNBOOK.md`](../../RUNBOOK.md), [`../decisions/DEC-004-checkpoint-convention.md`](../decisions/DEC-004-checkpoint-convention.md), `TASK-SEA-R2-B09B10-LIVE-001`, `E-SEA-026`, `E-SEA-031`–`E-SEA-039`, `E-SEA-051`, `E-SEA-052`.

## Checkpoint outcome

**HOLD — checkpoint 03 is not passed.** One authorized live attempt ended with the reader's fixed `provider_error` result; no valid PositionReport or live sample/provenance was produced. This restart record summarizes evidence and is not itself evidence.

## State at checkpoint

- **Last confirmed commit:** `4c8dea2` on branch `sprint2` at the start of this bounded task.
- **Current task:** `TASK-SEA-R2-B09B10-LIVE-001` — one live receipt attempt and checkpoint evidence.
- **Attempt authorization:** exactly one direct server-side reader invocation, 15-second total deadline, no retries. That attempt has been consumed; this task does not authorize another.
- **Live reader result:** the corrected one-shot harness returned the fixed `provider_error` code. No valid PositionReport was received or retained. The underlying cause is unknown.
- **Sample state:** no `data/samples/live/` files were created. The existing synthetic B-10 sample and provenance were left unchanged.
- **Safe configuration:** prior B-08 evidence `E-SEA-031`–`E-SEA-033` records the accessor and secret-boundary checks. During this task `.env.local` was confirmed ignored and untracked without viewing its contents. This does not establish real-key validity.
- **Demo evidence:** `E-SEA-026` and `E-SEA-051` support existing local browser/demo behavior; B-13 interface checks use mocked responses. They are not live UI/API end-to-end evidence.

## Sprint checkpoint criteria

| Criterion | State | Evidence and limitation |
|---|---|---|
| One real server-received AISStream PositionReport | **NOT MET** | `E-SEA-052`: one attempt ended with fixed `provider_error`; no suitable message was received. |
| One actual sample with matching provenance | **NOT MET** | No live sample/provenance was created; synthetic fixture remains synthetic. |
| Safe key configuration | **SUPPORTED, bounded** | `E-SEA-031`–`E-SEA-033` and `E-SEA-052` path check support local configuration/ignore boundaries; key validity and provider acceptance remain unknown. |
| Working demo | **SUPPORTED, local only** | `E-SEA-026` and `E-SEA-051` cover local selection/mocked interface behavior; no live API/UI integration is established. |

Since both live receipt and live sample/provenance criteria are unmet, the overall checkpoint remains **HOLD**.

## Changed paths and review boundary

- **Changed by this bounded task:** `EVIDENCE.md` (append `E-SEA-052`), `RUNBOOK.md` (append this attempt record), and this new checkpoint.
- **Not created:** `data/samples/live/position-report.sample.json` and `data/samples/live/PROVENANCE.md`.
- **Preserved:** existing synthetic sample/provenance; pre-existing `TASK_SPEC.md` modification; pre-existing `START.md` deletion and unrelated untracked paths. No source, route, test, dependency, Sprint/decision, secret or UI path was changed.
- **Delivery:** no staging, commit, push, deployment or cleanup was performed.

## Verification and evidence

- **Commands/observations actually made:** one initial harness evaluation failed parsing before reader startup; one corrected Node.js v22.23.2 invocation used the existing server accessor/reader and the 15-second deadline, then returned `CAPTURE_FAILED:reader_provider_error` (exit 1); `git check-ignore` confirmed `.env.local` ignored; `git ls-files` confirmed it is not tracked; checks confirmed both live sample paths absent; `git diff --check` passed for the appended records and task contract.
- **Evidence:** `E-SEA-052` records the live attempt and its limitations. Prior demo/config evidence is referenced above.
- **Secret boundary:** no key value, `.env.local` content, raw provider message or provider error detail was printed or stored.
- **Status boundary:** this record does not establish provider availability/cause, real-key validity, vessel identity, traffic completeness, full R2 acceptance or release readiness.

## Unknowns and blockers

- Cause of the fixed `provider_error` result is unknown; this evidence does not distinguish key validity, provider behavior, connection state or a transient service condition.
- Live provider availability, actual live receipt, live sample provenance, live UI/API end-to-end behavior, complete R2 acceptance and release readiness remain `Unknown` / `Needs verification`.
- The single-attempt authorization is exhausted. Do not retry or troubleshoot against the provider under this task.

## Rollback / recovery

No sample artifact or product change needs rollback. Evidence and RUNBOOK are append-only; if a correction is needed, append a superseding factual record rather than rewriting these entries. Preserve the synthetic fixture and all pre-existing deleted/untracked paths. Do not reset the branch or alter secrets.

## Next-session handoff

1. Review `E-SEA-052`, the appended RUNBOOK record and this checkpoint diff.
2. Keep checkpoint 03 at **HOLD / not passed** unless new, separately authorized evidence closes the live receipt and sample/provenance criteria.
3. Do not make another live request under `TASK-SEA-R2-B09B10-LIVE-001`; any new attempt requires a new bounded task contract and explicit authorization.
4. Preserve the working-tree boundary; no commit/push or deployment is authorized here.
