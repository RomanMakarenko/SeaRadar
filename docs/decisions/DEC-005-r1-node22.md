# DEC-005 — R1 Node.js 22 baseline

- **ID:** `DEC-005-R1-NODE22`
- **Version:** `1.0.0`
- **Status:** `Ready`
- **Product owner:** методист відділення теорії судноводіння навчального центру «Норд-Вест»
- **Delivery / technical owner:** виконавець проєкту
- **Date:** 2026-09-22
- **Related artifacts:** [`../../CLAUDE.md`](../../CLAUDE.md), [`../../SPEC.md`](../../SPEC.md), [`../../SPRINT-01.md`](../../SPRINT-01.md), [`../../TASK_SPEC.md`](../../TASK_SPEC.md), [`../../package.json`](../../package.json), [`DEC-002-r1-stack.md`](DEC-002-r1-stack.md), [`../../EVIDENCE.md`](../../EVIDENCE.md), [`../../RUNBOOK.md`](../../RUNBOOK.md)

## Context and constraints

The approved R1 stack previously declared Node.js 24. The active project environment is Node.js `v22.23.2`, and the product owner explicitly approved Node.js 22 as the runtime baseline. The previous Node.js 24 verification was stopped after `npm ci`; it did not establish a requirement to retain Node.js 24. No product behavior or application architecture changes are part of this decision.

## Options considered

1. **Adopt Node.js 22.x for the R1 runtime baseline.** **Selected.** It matches the approved working environment and the product owner's explicit preference.
2. **Keep Node.js 24.x.** Rejected because it does not match the approved delivery environment and is unnecessary for the current R1 scope.
3. **Leave the runtime version unspecified.** Rejected because reproducible installation and delivery require an explicit runtime range.

## Decision and rationale

The R1 runtime baseline is changed from Node.js 24.x to Node.js 22.x. The repository runtime requirement is recorded as `"node": "22.x"` in `package.json` and `package-lock.json`. TypeScript, Next.js, React, Leaflet, OpenStreetMap and Playwright Test remain unchanged.

The `@types/node` 24.x development package is a type-definition dependency, not the runtime executable requirement; it is therefore unchanged by this decision unless a separate dependency decision is approved.

## Consequences, risks and deferred work

- Developers and checks should use Node.js 22.x for the R1 baseline.
- The earlier DEC-002 Node.js 24 decision is superseded; its historical text remains unchanged as a record of the prior decision.
- Existing B-07 checks were run on Node.js `v22.23.2`; this decision does not claim new build or test execution beyond the evidence already recorded.
- A future runtime change requires another versioned decision record and corresponding contract updates.

## Verification / revisit trigger

Verify the Node.js 22 baseline with the normal R1 check/validate/build/test gate when the next bounded task runs. Revisit if Node.js 22 becomes unavailable, fails an approved acceptance criterion, or the product owner approves a different delivery environment.