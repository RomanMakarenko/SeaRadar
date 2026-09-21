# EVIDENCE.md — фактичний evidence ledger

- **ID:** `EVIDENCE-SEA-001`
- **Version:** `0.1.0`
- **Status:** `Active`
- **Owner:** `Waiting for MVP input`
- **Date:** 2026-09-21
- **Related artifacts:** [`CLAUDE.md`](CLAUDE.md), [`SPEC.md`](SPEC.md), [`TASK_SPEC.md`](TASK_SPEC.md), [`RUNBOOK.md`](RUNBOOK.md)

## Purpose and boundary

Це canonical, append-only журнал фактичних перевірок. План, template, documented example або текст у чаті не є evidence. Кожен запис має відділяти expected від observed і маркувати Unknown.

Не змішувати цей файл із `RUNBOOK.md`, не перейменовувати в `EVIDENCE_LOG.md` без окремого decision record.

## Entry schema

Для кожного запису використовувати:

- **Evidence ID**
- **Related SPEC/TASK ID**
- **Claim under verification**
- **Source** — command, file, diff, log або screenshot
- **Expected**
- **Observed**
- **Timestamp / environment**
- **Status** — `PASS`, `FAIL`, `BLOCKED`, `UNKNOWN`, `SUPERSEDED`
- **Reviewer / owner**
- **Limitations and follow-up**

## Evidence entries

### E-SEA-001 — initial repository baseline

- **Related SPEC/TASK ID:** `SPEC-SEA-001`; `TASK-SEA-TEMPLATE-001`
- **Claim under verification:** repository begins without product implementation and requires governance setup.
- **Source:** initial tree inspection and `START.md` read during setup.
- **Expected:** current tree contains only the pre-existing intake note and IntelliJ metadata; no runtime or product implementation is claimed.
- **Observed:** before setup, `START.md` and `.idea/` were present; no source, tests, build manifest, Git metadata, or project rules were present.
- **Timestamp / environment:** 2026-09-21; macOS; local SeaRadar workspace.
- **Status:** `PASS`
- **Reviewer / owner:** `Pending owner review`
- **Limitations and follow-up:** this verifies only the initial structural baseline; it proves no product behavior, stack, deployment, user validation, or production readiness.

### E-SEA-002 — governance baseline verification

- **Related SPEC/TASK ID:** `SPEC-SEA-001`; `TASK-SEA-TEMPLATE-001`
- **Claim under verification:** canonical governance artifacts and future-work conventions are present without speculative MVP content.
- **Source:** `find`, `git status --short`, and a Python structural/content checklist run after creating the baseline.
- **Expected:** required canonical files exist; MVP, stack, architecture, sprint tasks and product claims remain pending/Unknown.
- **Observed:** all required canonical files and directories were present; `S1.md`, `S2.md`, `S3.md`, `EVIDENCE_LOG.md` and `docs/SPEC.md` were absent; required headings were found; `START.md` remained present because deletion requires explicit owner authorization.
- **Timestamp / environment:** 2026-09-21; macOS; local SeaRadar workspace.
- **Status:** `PASS`
- **Reviewer / owner:** `Pending owner review`
- **Limitations and follow-up:** temporary `START.md` still needs an explicit owner decision; Git status was inspected but files are not committed; no runtime checks exist yet.
