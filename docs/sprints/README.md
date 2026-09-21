# Sprint planning convention

- **ID:** `SPRINT-GOV-001`
- **Version:** `0.1.0`
- **Status:** `Draft`
- **Owner:** `Waiting for MVP input`
- **Date:** 2026-09-21

## Boundary

SeaRadar will be decomposed into exactly three MVP sprints only after `SPEC.md` is populated and the stack/architecture decisions are approved. Until then, `S1`, `S2` and `S3` plan files intentionally do not exist.

## Required sprint contract

Each future `S1`, `S2` or `S3` record must contain:

- one observable outcome and explicit non-goals;
- linked SPEC and task IDs;
- ordered small slices with owner, input and expected output;
- allowed/affected paths and dependencies;
- verification command or manual check for every slice;
- checkpoint after each slice and human diff review;
- blocking vs advisory demo checks;
- readiness assumptions, safe fixtures, fallback and blocking Unknowns;
- rollback/recovery path;
- exit decision: `DONE`, `CONTINUE WITH APPROVAL` or `HOLD`;
- evidence links and a RUNBOOK handoff, including on `HOLD`.

## Creation gate

Create sprint files only when the owner approves the MVP contract, success metric, stack decision, architecture decision and three-sprint boundaries. Do not fill dates, tasks or technical choices from assumptions.
