# CHECKPOINT-04 — Follow-up to Sprint 2 checkpoint 03

- **ID:** `CHECKPOINT-SEA-R2-004`
- **Version:** `1.0.0`
- **Status:** `Active`
- **Product owner:** методист відділення теорії судноводіння навчального центру «Норд-Вест»
- **Delivery / technical owner:** виконавець проєкту
- **Date:** 2026-09-24
- **Related artifacts:** [`../../SPRINT-02.md`](../../SPRINT-02.md), [`../../TASK_SPEC.md`](../../TASK_SPEC.md), [`../../EVIDENCE.md`](../../EVIDENCE.md), [`../../RUNBOOK.md`](../../RUNBOOK.md), [`../decisions/DEC-004-checkpoint-convention.md`](../decisions/DEC-004-checkpoint-convention.md), [`CHECKPOINT-03.md`](CHECKPOINT-03.md), `TASK-SEA-R2-B09B10-LIVE-001`, `TASK-SEA-R2-B09B10-LIVE-002`, `E-SEA-026`, `E-SEA-031`–`E-SEA-039`, `E-SEA-051`–`E-SEA-053`.

## Checkpoint outcome and supersession

**HOLD — Sprint 2 checkpoint 03 is not passed.** This record supersedes `CHECKPOINT-03.md` only as the latest restart record after the additional authorized attempt. It does not erase or change the historical HOLD recorded in `CHECKPOINT-03.md`; the latest outcome for Sprint checkpoint 03 remains HOLD because neither live attempt produced a valid PositionReport or live sample.

## State at checkpoint

- **Last confirmed commit:** `4c8dea2` on branch `sprint2` at the start of the additional bounded attempt.
- **Current task:** `TASK-SEA-R2-B09B10-LIVE-002`; the user reviewed the new bounded contract and selected `continue` for exactly one additional attempt.
- **User-reported context:** the user reported that the locally configured key worked in Postman. This report was not independently verified and does not establish the cause of the reader result.
- **Latest live reader result:** the harness reported `SUBSCRIBED=yes` and the fixed `provider_error` code. The local reader sent the subscription; this does not prove provider acknowledgment. No valid PositionReport was received. The underlying cause remains unknown.
- **Attempt boundary:** the additional attempt used one reader invocation and one 15-second total deadline. No retry, provider troubleshooting, Postman inspection, or alternate live route was performed. This task's additional-attempt authorization is exhausted.
- **Sample state:** no `data/samples/live/` artifact exists. The synthetic B-10 sample and provenance remain unchanged.
- **Key safety:** the key was consumed only through the existing server-side accessor; `.env.local` was confirmed ignored and untracked without reading its contents. The key value was not emitted. Key validity remains unverified.
- **Demo evidence:** `E-SEA-026` and `E-SEA-051` remain local browser/mocked evidence, not live UI/API end-to-end proof.

## Sprint checkpoint criteria

| Criterion | State | Evidence and limitation |
|---|---|---|
| One real server-received AISStream PositionReport | **NOT MET** | `E-SEA-052` and `E-SEA-053`: each bounded attempt ended with fixed `provider_error`; no suitable message was received. |
| One actual sample with matching provenance | **NOT MET** | No live sample/provenance was created; synthetic fixture remains synthetic. |
| Safe key configuration | **SUPPORTED, bounded** | `E-SEA-031`–`E-SEA-033` and the two task path checks support local configuration/ignore boundaries; key validity/provider acceptance remain unknown. |
| Working demo | **SUPPORTED, local only** | `E-SEA-026` and `E-SEA-051` cover local selection/mocked interface behavior; no live UI/API integration is established. |

The live receipt and sample/provenance requirements are unmet; the overall Sprint checkpoint remains **HOLD**.

## Changed paths and review boundary

- **Changed for this attempt:** append-only `EVIDENCE.md` entry `E-SEA-053`, append-only `RUNBOOK.md` entry, and this new restart record.
- **Not created:** `data/samples/live/position-report.sample.json` and `data/samples/live/PROVENANCE.md`.
- **Preserved:** `CHECKPOINT-03.md`, the synthetic B-10 fixture/provenance, the reviewed task contract, the pre-existing `START.md` deletion, and all unrelated untracked paths.
- **No product changes:** no source, route, test, dependency, UI, Sprint/decision, or secret file was changed. No staging, commit, push, deployment, or cleanup was performed.

## Verification and evidence

- **Preflight:** imports of the existing accessor, reader and transformer passed under Node.js v22.23.2; `.env.local` was confirmed ignored and untracked without content inspection; live sample paths were absent.
- **Attempt:** one additional harness invocation returned `SUBSCRIBED=yes` and `RESULT=reader_error_provider_error` (exit 1). The reader's fixed code and subscription flag were the only transport diagnostics retained; no raw payload or provider error text was printed or saved.
- **Post-attempt:** both live sample paths remained absent; `git diff --check` passed for the documentation changes.
- **Evidence:** `E-SEA-053` records the additional attempt; `E-SEA-052` records the first attempt. This restart record summarizes those observations and is not evidence itself.
- **Secret boundary:** no key value or `.env.local` content was printed, manually inspected, or included in an artifact.

## Unknowns and blockers

- The cause of `provider_error` remains unknown. A locally sent subscription is not proof of provider acceptance; the user's Postman report does not establish this reader's behavior.
- Provider availability, key validity, provider acknowledgment, actual live receipt, sample provenance, live UI/API end-to-end behavior, complete R2 acceptance, and release readiness remain `Unknown` / `Needs verification`.
- No additional live request is authorized under `TASK-SEA-R2-B09B10-LIVE-002`. Any further provider attempt requires a new bounded task contract and explicit authorization.

## Rollback / recovery

No product change or sample needs rollback. Evidence and RUNBOOK are append-only; correct any later error with a superseding factual entry rather than rewriting history. Keep `CHECKPOINT-03.md` unchanged as the record of the first HOLD. Preserve the synthetic fixture and all pre-existing deleted/untracked paths. Do not reset the branch or alter secrets.

## Next-session handoff

1. Review `E-SEA-053`, the appended RUNBOOK record, and this checkpoint diff.
2. Keep Sprint checkpoint 03 at **HOLD / not passed**; do not infer that Postman success closes the missing live-receipt criterion.
3. Do not make another live request or attempt provider troubleshooting under the exhausted LIVE-002 authorization.
4. Preserve the current working-tree boundary. No commit/push, deployment or further provider access is authorized here.
