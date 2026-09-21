# Decision records

- **ID:** `DECISIONS-GOV-001`
- **Version:** `0.1.0`
- **Status:** `Draft`
- **Owner:** `Waiting for MVP input`
- **Date:** 2026-09-21

## Decision record format

Create one record per material stack, architecture, integration or scope decision. Each record must include:

- decision ID, version, date, status and owner;
- context and constraints;
- options considered, including why an option was not selected;
- chosen option and rationale;
- consequences, risks and deferred work;
- verification or revisit trigger;
- linked SPEC, TASK, EVIDENCE and RUNBOOK records.

A catalog entry or chat statement is not a decision. Do not select a technology until the MVP constraints are known and the record is reviewed.

## Pending decisions

| Decision | Status | Required input |
|---|---|---|
| Stack selection | `Waiting for MVP input` | MVP outcome, constraints, delivery environment and verification needs |
| Architecture boundary | `Waiting for MVP input` | Core flow, data boundaries, integrations and non-goals |
| Sprint allocation | `Waiting for MVP input` | Approved release slice and exactly three sprint outcomes |

Future records should use `docs/decisions/DEC-<number>-<short-name>.md` and update this index after verification.
