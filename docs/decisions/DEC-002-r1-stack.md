# DEC-002 — R1 technology baseline

- **ID:** `DEC-002-R1-STACK`
- **Version:** `1.0.0`
- **Status:** `Ready`
- **Product owner:** методист відділення теорії судноводіння навчального центру «Норд-Вест»
- **Delivery / technical owner:** виконавець проєкту
- **Date:** 2026-09-22
- **Related artifacts:** [`PROJECT_BRIEF.md`](../../PROJECT_BRIEF.md), [`SPEC.md`](../../SPEC.md), [`SPRINT-01.md`](../../SPRINT-01.md), [`TASK_SPEC.md`](../../TASK_SPEC.md), [`EVIDENCE.md`](../../EVIDENCE.md), [`RUNBOOK.md`](../../RUNBOOK.md)

## Context and constraints

`SPRINT-01.md` records the current R1 technical values and says the customer left the stack choice to the executor. The product is local to the instructor's laptop, the first slice needs a browser map and demo vessels, and the project rules require a formal decision before implementation. No dependency installation or runtime verification is part of this governance task.

## Options considered

1. **Adopt the stack specified in the current R1 sprint brief.** **Selected.** It is the only concrete stack option evidenced in the supplied artifacts and matches the R1 browser-map scope.
2. **Defer stack selection until later MVP input.** Rejected for R1 because the sprint brief already records a chosen baseline and implementation tasks require a stable target.
3. **Alternative technology stack.** `Unknown — no competing stack was specified or evaluated in the supplied input.`

## Decision and rationale

The current R1 baseline is:

- Node.js 24;
- TypeScript 6.x with `strict`;
- Next.js App Router with React;
- Leaflet 1.9.x, connected only on the client;
- OpenStreetMap Standard tile layer with attribution;
- Playwright Test as the only test runner.

This is a current, versioned baseline, not a permanent commitment. It keeps the R1 implementation bounded and leaves no unsupported technology choice to be inferred from the governance artifacts.

## Consequences, risks and deferred work

- Product implementation tasks may target this baseline after their own bounded task contract is approved.
- The repository currently has no runtime implementation, build result or test result; this decision does not claim any of them.
- Architecture details beyond the R1 client/local boundary remain `Unknown` and require a separate decision if material.
- Future stack changes require a new decision record; this record becomes `Superseded` only after that replacement is approved.

## Verification / revisit trigger

Verify the baseline during the R1 implementation check/build/test gate. Revisit if the selected versions are unavailable, fail the approved acceptance criteria, conflict with a later constraint, or the product owner approves a changed delivery environment.
