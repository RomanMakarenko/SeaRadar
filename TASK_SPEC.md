# TASK_SPEC.md — bounded task contract

- **ID:** `TASK-SEA-R1-DECOMP-001`
- **Version:** `1.1.0`
- **Status:** `Active`
- **Product owner:** методист відділення теорії судноводіння навчального центру «Норд-Вест»
- **Delivery / technical owner:** виконавець проєкту
- **Date:** 2026-09-22
- **Related artifacts:** [`CLAUDE.md`](CLAUDE.md), [`SPEC.md`](SPEC.md), [`SPRINT-01.md`](SPRINT-01.md), [`EVIDENCE.md`](EVIDENCE.md), [`RUNBOOK.md`](RUNBOOK.md), [`docs/decisions/DEC-003-r1-handoff.md`](docs/decisions/DEC-003-r1-handoff.md), [`docs/decisions/DEC-004-checkpoint-convention.md`](docs/decisions/DEC-004-checkpoint-convention.md), [`docs/checkpoints/CHECKPOINT-01.md`](docs/checkpoints/CHECKPOINT-01.md)

## Goal and linked outcome

- **Goal:** зафіксувати перевірювану декомпозицію Sprint 1 / R1, стратегію handoff між bounded sessions і checkpoint для перезапуску сесії без запуску product implementation.
- **SPEC outcome:** `SPEC-SEA-001 / R1 plan with explicit session boundaries, reproducible handoffs and a restartable checkpoint`.
- **Current behavior:** `SPRINT-01.md` містить backlog B-01…B-07, але не має окремих session contracts, handoff protocol і checkpoint record.
- **Desired behavior:** кожна сесія має назву, goal, non-goals, checks, evidence, acceptance і наступний handoff; checkpoint фіксує останній перевірений стан і межі наступної сесії; runtime code не створюється.

## Owner and allowed paths

- **Product owner:** методист відділення теорії судноводіння навчального центру «Норд-Вест» — приймає межі та outcome.
- **Delivery / technical owner:** виконавець проєкту — веде decomposition, decision records, evidence, checkpoint і handoff.
- **Allowed paths:**
  - `TASK_SPEC.md`
  - `SPRINT-01.md`
  - `SPEC.md`
  - `EVIDENCE.md`
  - `RUNBOOK.md`
  - `docs/decisions/README.md`
  - `docs/decisions/DEC-003-r1-handoff.md`
  - `docs/decisions/DEC-004-checkpoint-convention.md`
  - `docs/checkpoints/CHECKPOINT-01.md`
- **Affected paths:** тільки перелічені governance-документи; product source, package manifest, lockfile, runtime configuration і secrets не зачіпати.

## Inputs and constraints

- **Inputs:** approved `SPEC.md`; current R1 backlog in `SPRINT-01.md`; user approval of bounded handoff strategy; explicit request to inspect the diff and create a restartable checkpoint in the 2026-09-22 session.
- **Constraints:** не реалізовувати B-01…B-07; не встановлювати dependencies; не створювати S2/S3 plans; не вигадувати acceptance або runtime evidence; зберегти один canonical path на кожен артефакт; не включати сторонні untracked paths до checkpoint без review.
- **Dependencies:** актуальний R1 backlog, decision-record convention і повний diff поточного робочого дерева.

## Expected output

`SPRINT-01.md` містить сім коротких session contracts для B-01…B-07 та reusable handoff protocol; `DEC-003-r1-handoff.md` фіксує обране рішення; `DEC-004-checkpoint-convention.md` фіксує record path; `CHECKPOINT-01.md` містить перевірений handoff для restart; `RUNBOOK.md` і `EVIDENCE.md` містять фактичні записи цієї bounded documentation роботи.

## In scope

- Decompose B-01…B-07 into named sessions: `R1-B01-SCAFFOLD`, `R1-B02-MAP`, `R1-B03-VESSEL-MODEL`, `R1-B04-VESSEL-CARD`, `R1-B05-DEMO-ROUTES`, `R1-B06-MOTION`, `R1-B07-PLAYWRIGHT-SELECTION`.
- Record per-session goals, non-goals, checks, evidence anchors, acceptance and handoff.
- Record the handoff strategy and its alternatives, rationale, risks and revisit trigger.
- Inspect the complete current diff and record a documentation checkpoint for the next session.
- Verify documentation structure and links only.

## Non-goals

- Product implementation, dependency installation, build, runtime or browser tests.
- Creating Sprint 2/3 plans or an unrequested checkpoint archive format.
- Including or modifying unrelated untracked paths such as `.agents/`, `.claude/`, `reference/`, `skills-lock.json`, `TASK_INITIAL.md` or `TASK_DECOMPOSE.md`.
- Committing or pushing this documentation change without a separate request.
- Treating a planned check or documented acceptance criterion as executed evidence.

## Acceptance criteria

- [ ] Seven named R1 sessions map one-to-one to B-01…B-07.
- [ ] Every session has observable goal, explicit non-goals, targeted check, evidence source, acceptance criterion and handoff.
- [ ] Handoff strategy distinguishes plan from observed evidence and uses canonical artifacts only.
- [ ] DEC-003 records selected option, alternatives, rationale, consequences and revisit trigger.
- [ ] DEC-004 and CHECKPOINT-01 record the restartable checkpoint convention and current state.
- [ ] S2/S3 remain absent and no product implementation paths change.
- [ ] Structural/content and Markdown-link checks pass.
- [ ] Human checkpoint: product owner reviews the decomposition and checkpoint before R1 implementation begins.

**Current acceptance status:** `Structural checks PASS; diff reviewed for documentation scope; product-owner checkpoint pending; implementation intentionally not started.`

## Verification

- **Targeted commands:** `git diff --check`; `git status --short`; `git diff --stat`; `find . -maxdepth 3 -type f | sort`; metadata/heading/link checks; absence checks for S2/S3 and product source.
- **Manual check:** inspect the complete diff including untracked files selected for the task; compare decomposition to B-01…B-07; confirm no planned check is reported as executed.
- **Expected result:** seven session contracts, DEC-003, DEC-004 and CHECKPOINT-01 exist; no runtime files or dependencies are added; unrelated untracked paths are explicitly excluded.
- **Observed result:** `git diff --check` PASS; final documentation diff review PASS for in-scope files; scoped checkpoint/metadata/link/scope validation PASS; `CHECKPOINT-01.md` exists; unrelated untracked paths identified and excluded.

## Checkpoint and stop conditions

- **Checkpoint:** record `CHECKPOINT-01.md`, run structural/content checks, inspect the complete selected diff, then wait for product-owner review before starting `R1-B01-SCAFFOLD`.
- **Stop when:** the requested checkpoint would require implementation, a session boundary is ambiguous, a new dependency or unrelated path is needed, or a planned check is mistaken for evidence.
- **Exit decision:** `CONTINUE WITH APPROVAL` — plan and restart checkpoint are recorded; implementation is not authorized by this task.

## Risks and open questions

- Session sizes may need revision after observing actual task complexity.
- Exact command and evidence details become concrete only when each session starts.
- Checkpoint archive packaging/publication remains `Needs verification`; this task creates only a Markdown restart record.
- User-declared manual inputs: `reference/` contains a React example and TypeScript pattern references; `.agents/skills/shadcn` is manually installed; Feature-Sliced was installed from `https://github.com/feature-sliced/skills.git` but its local path is not independently verified. These inputs are outside this task and unaudited.
- `.claude/`, `skills-lock.json`, `TASK_INITIAL.md` and `TASK_DECOMPOSE.md` are also outside this task and require separate review before any commit.
- Metric, AISStream, S2/S3 and architecture-beyond-R1 Unknowns remain unchanged.

## Rollback / recovery

If the decomposition or checkpoint is rejected, restore the pre-task versions of `TASK_SPEC.md`, `SPRINT-01.md`, `SPEC.md`, `docs/decisions/README.md`, `EVIDENCE.md` and `RUNBOOK.md` from Git after inspecting the diff; remove only the newly created DEC-004/checkpoint files if explicitly authorized. Do not delete or rewrite prior evidence history and do not touch unrelated untracked paths.

## Handoff

This task ends after the plan, diff review and checkpoint are recorded. The next bounded action is a separate task contract for `R1-B01-SCAFFOLD`; it must begin by reading `CHECKPOINT-01.md`, the latest `SPRINT-01.md`, `TASK_SPEC.md`, `EVIDENCE.md` and `RUNBOOK.md`, and must not start before the product-owner checkpoint.
