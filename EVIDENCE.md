# EVIDENCE.md — фактичний evidence ledger

- **ID:** `EVIDENCE-SEA-001`
- **Version:** `0.2.0`
- **Status:** `Active`
- **Product owner:** методист відділення теорії судноводіння навчального центру «Норд-Вест»
- **Delivery / technical owner:** виконавець проєкту
- **Date:** 2026-09-22
- **Related artifacts:** [`CLAUDE.md`](CLAUDE.md), [`PROJECT_BRIEF.md`](PROJECT_BRIEF.md), [`SPEC.md`](SPEC.md), [`TASK_SPEC.md`](TASK_SPEC.md), [`SPRINT-01.md`](SPRINT-01.md), [`EVIDENCE.md`](EVIDENCE.md), [`RUNBOOK.md`](RUNBOOK.md), [`docs/decisions/DEC-001-mvp-contract.md`](docs/decisions/DEC-001-mvp-contract.md), [`docs/decisions/DEC-002-r1-stack.md`](docs/decisions/DEC-002-r1-stack.md)

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

### E-SEA-003 — approved MVP/R1 governance alignment

- **Related SPEC/TASK ID:** `SPEC-SEA-001`; `TASK-SEA-GOV-001`; `DEC-001-MVP-CONTRACT`; `DEC-002-R1-STACK`
- **Claim under verification:** the approved MVP baseline, current R1 stack, owners, decision links and future-sprint boundaries are represented consistently without product implementation claims.
- **Source:** user clarification recorded in the 2026-09-22 session; final `git diff --check`; final `git status --short`; final `git diff --stat`; final `find . -maxdepth 3 -type f -print | sort`; final Python structural/content validation; final Python Markdown relative-link validation; complete governance diff review.
- **Expected:** required governance files and metadata exist; DEC-001/002 links resolve; S2/S3 plan paths remain absent; canonical duplicate paths and secret literals are absent; whitespace and relative-link checks pass.
- **Observed:** final `git diff --check` passed; 13 required governance files were present, including `ABOUT.md`; final structural/content validation passed; Markdown relative-link validation passed; SPRINT-02/03, `docs/sprints/S2.md`, `docs/sprints/S3.md`, `docs/tasks` and `docs/checkpoints` remained absent; no secret literal was found by the validator; changed files contained governance documentation only.
- **Timestamp / environment:** 2026-09-22; macOS 15 / local SeaRadar workspace; no runtime dependencies installed.
- **Status:** `PASS`
- **Reviewer / owner:** delivery/technical owner — executor role; product-owner checkpoint pending.
- **Limitations and follow-up:** this verifies documentation structure and content only; it does not verify application behavior, build, tests, AISStream availability, user validation, deployment or production readiness. An initial overly broad duplicate-text check flagged the intentional sentence documenting `EVIDENCE_LOG.md`; the corrected link-focused validator passed. Human review of the diff is still required before the task is `Verified`.
