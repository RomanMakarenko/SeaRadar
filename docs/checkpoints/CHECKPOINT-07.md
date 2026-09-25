# CHECKPOINT-07 — reader compatibility and handoff

- **ID:** `CHECKPOINT-SEA-R2-007`
- **Version:** `1.0.0`
- **Status:** `Active`
- **Product owner:** методист відділення теорії судноводіння навчального центру «Норд-Вест»
- **Delivery / technical owner:** виконавець проєкту
- **Date:** 2026-09-25
- **Related artifacts:** [`../../CLAUDE.md`](../../CLAUDE.md), [`../../SPEC.md`](../../SPEC.md), [`../../TASK_SPEC.md`](../../TASK_SPEC.md), [`../../EVIDENCE.md`](../../EVIDENCE.md), [`../../RUNBOOK.md`](../../RUNBOOK.md), [`../../NEXT_SESSION.md`](../../NEXT_SESSION.md), [`../decisions/DEC-004-checkpoint-convention.md`](../decisions/DEC-004-checkpoint-convention.md), [`CHECKPOINT-03.md`](CHECKPOINT-03.md), [`CHECKPOINT-06.md`](CHECKPOINT-06.md), `TASK-SEA-R2-B09B10-FIX-001`, `E-SEA-055`–`E-SEA-057`.

## Checkpoint outcome and supersession

**ACTIVE — local reader compatibility change and deterministic checks are recorded; final human diff review is pending. Sprint 2 checkpoint 03 remains HOLD / not passed.** This restart record follows CHECKPOINT-06 and does not rewrite CHECKPOINT-03 through CHECKPOINT-06. It is a handoff summary, not evidence.

## State at checkpoint

- **Last confirmed commit:** branch `sprint2`; local `HEAD` and `origin/sprint2` both resolved to `4c8dea20b0ce471fbb1d126784ed665dd77aaf64` (`docs(r2): record B-13 interface delivery`) during handoff preparation. The remote branch was not queried in this task.
- **Current task:** `TASK-SEA-R2-B09B10-FIX-001`, authorized for the listed implementation and local checks after the user said “continue, зроби вже проект робочим”. No live AISStream request, real-key inspection, sample creation, commit, push or deployment was authorized by that contract.
- **Local implementation:** `server/aisstream-reader.ts` sets native WebSocket `binaryType = "arraybuffer"`; text messages pass through unchanged; `ArrayBuffer` is strictly decoded as UTF-8. Unsupported data and invalid UTF-8 map to the existing fixed `provider_error`. `tests/snapshot-reader.spec.ts` and `tests/snapshot-collector.spec.ts` cover binary decode, failure mapping, cleanup and route-level fixture behavior.
- **Recorded local checks:** focused Playwright suite — 33 passed; TypeScript — passed; build — passed; scoped `git diff --check` — passed. See `E-SEA-056` for command details and limits.
- **Build environment boundary:** Next.js build output identified `.env.local` as an environment source. No value was printed, but the file or its contents may have been loaded by the build environment; this checkpoint does not claim otherwise.
- **User-reported context:** the user said “стій, запрацювало”. This remains user-reported, with no independent post-fix live observation from the assistant. See `E-SEA-057`.
- **Live evidence:** none after the compatibility change. LIVE-003's earlier `SUBSCRIBED=yes`, non-text event and fixed `provider_error` remain as recorded in `E-SEA-055`; the frame was not decoded or saved. No valid live PositionReport, sample or provenance was obtained.

## Sprint checkpoint criteria

| Criterion | State | Evidence and limitation |
|---|---|---|
| One real server-received AISStream PositionReport | **NOT MET** | `E-SEA-055` records the pre-fix non-text event and fixed reader error; `E-SEA-056` is local deterministic compatibility evidence only. |
| One actual sample with matching provenance | **NOT MET** | No live sample/provenance was created. |
| Safe key configuration | **SUPPORTED, bounded** | Existing B-08 records remain bounded; the build reported `.env.local` as an environment source, and this task makes no claim that its contents were not loaded. Key validity/provider acceptance remain unknown. |
| Working demo | **USER-REPORTED; not independently verified here** | `E-SEA-057` records the user's brief statement; the assistant made no post-fix live request. |

The live receipt and sample/provenance criteria remain unmet; overall Sprint checkpoint 03 remains **HOLD**.

## Changed paths and Git boundary

- **Compatibility implementation/test paths already modified at handoff-task start:** `server/aisstream-reader.ts`, `tests/snapshot-reader.spec.ts`, `tests/snapshot-collector.spec.ts`; this documentation/handoff task made no additional code/test edits.
- **Current record/handoff paths:** `TASK_SPEC.md` (FIX-001 observed-results section), append-only `EVIDENCE.md` entries `E-SEA-056`/`E-SEA-057`, append-only `RUNBOOK.md` entry, updated current handoff in pre-existing untracked `NEXT_SESSION.md`, and this new checkpoint.
- **Pre-existing working-tree state preserved:** `sprint-2.png` was already staged; `START.md` was already deleted; `EVIDENCE.md`, `RUNBOOK.md`, and `TASK_SPEC.md` were already modified before this documentation update; `.agents/`, `.claude/skills/`, `NEXT_SESSION.md`, `README.pdf`, `docs/checkpoints/CHECKPOINT-03.md` through `CHECKPOINT-06.md`, `reference/`, and `skills-lock.json` were already untracked. Do not stage, remove, rewrite, reset or clean these broadly.
- **Delivery:** no staging, commit, push, deployment or cleanup occurred. A future candidate commit requires complete diff review and an explicit user decision. The three already-modified canonical documents must not be staged wholesale until their pre-existing changes are distinguished; the staged image and unrelated paths remain excluded unless separately reviewed and authorized.

## Verification and evidence

- **Implementation evidence:** `E-SEA-056` records the implementation behavior, 33 focused Playwright tests, TypeScript/build results, scoped whitespace check, and environment limitation.
- **User report:** `E-SEA-057` records the exact statement and explicitly marks independent live verification as unknown.
- **Prior live observation:** `E-SEA-055`; it records only the pre-fix non-text event category and fixed reader error, not frame contents or provider acceptance.
- **Documentation verification:** `git diff --check` — `PASS`; Python trailing-whitespace checks for `TASK_SPEC.md`, `EVIDENCE.md`, `RUNBOOK.md`, `NEXT_SESSION.md`, and this checkpoint — `PASS`; focused assertions for FIX-001/E-056/E-057/checkpoint IDs, preserved R1 archive, and checkpoint HOLD — `PASS`.

## Unknowns and blockers

Provider acceptance, real-key validity, contents of the LIVE-003 frame, live PositionReport receipt, sample provenance, live UI/API end-to-end behavior, complete R2 acceptance and release readiness remain `Unknown` / `Needs verification`. No further live attempt is authorized by this checkpoint. Human diff review of the current code and documentation boundary remains pending.

## Rollback / recovery

Preserve all pre-existing modified, staged, deleted and untracked paths. If the FIX-001 change is rejected, inspect the exact diff and restore only the approved reader/test implementation paths; do not reset the shared branch. Correct factual evidence/runbook history with a superseding entry rather than rewriting earlier records. Do not touch local environment files or credentials.

## Next-session handoff

1. Read this checkpoint, `TASK_SPEC.md` FIX-001, `E-SEA-055`–`E-SEA-057`, the latest `RUNBOOK.md` entry and the current `NEXT_SESSION.md` handoff.
2. Recheck actual `git status`, staged and unstaged diffs, and refs; review every candidate path and preserve the staged image, deletion and unrelated untracked material.
3. Choose `continue`, `revise` or `HOLD` for the implementation and handoff. Keep Sprint checkpoint 03 at **HOLD** absent live receipt and sample/provenance evidence.
4. Do not retry AISStream, inspect `.env.local`/the real key, stage, commit, push or deploy without separate explicit authorization.
