# CHECKPOINT-08 — LIVE-004 post-fix receipt attempt

- **ID:** `CHECKPOINT-SEA-R2-008`
- **Version:** `1.0.0`
- **Status:** `Active`
- **Product owner:** методист відділення теорії судноводіння навчального центру «Норд-Вест»
- **Delivery / technical owner:** виконавець проєкту
- **Date:** 2026-09-25
- **Related artifacts:** [`../../CLAUDE.md`](../../CLAUDE.md), [`../../SPEC.md`](../../SPEC.md), [`../../TASK_SPEC.md`](../../TASK_SPEC.md), [`../../EVIDENCE.md`](../../EVIDENCE.md), [`../../RUNBOOK.md`](../../RUNBOOK.md), [`../decisions/DEC-004-checkpoint-convention.md`](../decisions/DEC-004-checkpoint-convention.md), [`CHECKPOINT-03.md`](CHECKPOINT-03.md), [`CHECKPOINT-07.md`](CHECKPOINT-07.md), `TASK-SEA-R2-B09B10-LIVE-004`, `E-SEA-058`.

## Checkpoint outcome and history

**HOLD — Sprint checkpoint 03 is not passed.** This record follows CHECKPOINT-07 and appends the observed outcome of one post-fix LIVE-004 attempt. It does not rewrite CHECKPOINT-03 through CHECKPOINT-07 and is not itself evidence.

## State at checkpoint

- **Branch / baseline:** branch `sprint2`; starting `HEAD` was `2147d93` (`fix(r2): decode websocket binary frames`).
- **Current task:** `TASK-SEA-R2-B09B10-LIVE-004`; the user reviewed the new bounded contract and said `продовжуй`, authorizing one post-fix attempt.
- **Preflight:** Node.js v22.23.2 runtime imports passed. The live sample targets were absent; `.env.local` was ignored and untracked without manually reading its contents. `@next/env` loaded local environment configuration into process memory; the existing accessor supplied the key to the reader. No value was printed or manually inspected.
- **Attempt:** one direct reader invocation with a 15-second total deadline. It exited 1 after 1,747 ms with `CAPTURE_OUTCOME=unsuitable_message`. A decoded text event reached the sample eligibility check but did not satisfy required sample checks or B-11 transformer acceptance. The exact failing condition and payload were not recorded. No retry occurred.
- **Sample:** no live sample or provenance was created; post-attempt checks confirmed both approved sample paths remain absent. Existing synthetic B-10 artifacts were not changed.
- **Operator screenshot:** the user-provided `sprint-2.png` shows the local UI reporting AISStream and displaying vessel data. It is separate visual evidence; this task did not inspect it from disk or use it to construct a raw PositionReport.

## Sprint checkpoint criteria

| Criterion | State | Evidence and limitation |
|---|---|---|
| One real server-received AISStream PositionReport | **NOT MET** | `E-SEA-058`: one decoded text event reached the reader callback, but it did not pass PositionReport/sample eligibility. No valid report was retained; payload contents and failing condition remain unknown. |
| One actual sample with matching provenance | **NOT MET** | No live sample/provenance files were created. The existing B-10 sample remains synthetic. |
| Safe key configuration | **SUPPORTED, bounded** | `.env.local` was ignored/untracked and used only through in-memory environment loading plus the existing accessor. This does not prove key validity or provider acceptance. Existing B-08 evidence remains bounded. |
| Working demo | **USER-SUPPLIED; not independently verified by this task** | The operator provided a screenshot of the local UI showing AISStream status and vessel data. This task did not independently verify end-to-end source origin or live API/UI behavior. |

Because the live receipt and actual sample/provenance criteria remain unmet, checkpoint 03 stays **HOLD**.

## Changed paths and Git boundary

- **Changed in this task:** appended LIVE-004 to `TASK_SPEC.md`; appended `E-SEA-058` to `EVIDENCE.md`; appended the LIVE-004 record to `RUNBOOK.md`; created this checkpoint.
- **Not created:** `data/samples/live/position-report.sample.json` and `data/samples/live/PROVENANCE.md`.
- **Preserved:** the pre-existing staged `sprint-2.png`, deleted `START.md`, `.agents/`, `.claude/skills/`, `README.pdf`, `reference/`, and `skills-lock.json`. No unrelated path was modified, staged, committed, pushed, or cleaned.
- **No product/test changes:** no source, route, test, dependency, configuration, build, or deployment action was performed for this task.

## Verification and evidence

- **Commands/observations:** `node --version` returned `v22.23.2`; direct `--experimental-strip-types` import check for the accessor/reader/transformer/`@next/env` passed; preflight checks confirmed live sample targets absent, `.env.local` ignored and untracked; one inline `node --experimental-strip-types` reader harness attempt ended `CAPTURE_OUTCOME=unsuitable_message`, exit 1, elapsed 1,747 ms; post-attempt check confirmed sample targets absent; `git diff --check` was run after appending records.
- **Evidence:** `E-SEA-058` records the single attempt and its limitations. `E-SEA-055`–`E-SEA-057` and CHECKPOINT-03 through CHECKPOINT-07 remain historical context and are unchanged.
- **Secret / payload boundary:** the harness did not print or persist the API key, raw provider message, provider error detail, or sample payload. The key was obtained through the existing accessor after in-memory environment loading and passed only to the reader.
- **Status boundary:** this record does not establish provider cause, key validity, the contents of the unsuitable message, vessel identity beyond the operator screenshot, traffic completeness, complete R2 acceptance, or release readiness.

## Unknowns and blockers

- The first decoded message did not satisfy sample eligibility; the precise failed field or transformer condition was not recorded, and the provider payload was not retained.
- The single LIVE-004 attempt is exhausted. No retry or provider troubleshooting is authorized under this task.
- Live sample provenance, independently verified live UI/API end-to-end behavior, complete R2 acceptance, and release readiness remain `Unknown` / `Needs verification`.
- Human review of the complete LIVE-004 documentation diff remains pending.

## Rollback / recovery

No product or sample change needs rollback. Do not remove or alter the historical evidence. If this documentation diff is rejected, inspect it and revise only the LIVE-004 task/evidence/runbook/checkpoint additions; preserve all pre-existing staged, deleted and untracked paths. Any factual correction to EVIDENCE or RUNBOOK must be a superseding append-only entry. Do not reset the branch or alter environment files.

## Handoff

1. Review `TASK-SEA-R2-B09B10-LIVE-004`, `E-SEA-058`, the new RUNBOOK entry and this checkpoint.
2. Keep Sprint checkpoint 03 at **HOLD / not passed** absent a valid live PositionReport and matching sample/provenance plus support for all other checkpoint criteria.
3. Do not retry AISStream under LIVE-004. Any further live attempt requires a new bounded contract and explicit authorization.
4. Choose `continue`, `revise` or `HOLD` for the documentation/evidence diff. No commit, push or deployment is authorized.
