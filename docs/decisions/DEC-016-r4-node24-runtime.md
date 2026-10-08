# DEC-016 — R4 Node.js 24 runtime baseline

- **ID:** `DEC-016-R4-NODE24-RUNTIME`
- **Version:** `1.0.0`
- **Status:** `Ready`
- **Product owner:** методист відділення теорії судноводіння навчального центру «Норд-Вест»
- **Delivery / technical owner:** виконавець проєкту
- **Date:** 2026-10-02
- **Related artifacts:** [`../../CLAUDE.md`](../../CLAUDE.md), [`../../ABOUT.md`](../../ABOUT.md), [`../../TASK_SPEC.md`](../../TASK_SPEC.md), [`../../README.md`](../../README.md), [`../../package.json`](../../package.json), [`../../package-lock.json`](../../package-lock.json), [`DEC-005-r1-node22.md`](DEC-005-r1-node22.md), [`DEC-014-r4-scope.md`](DEC-014-r4-scope.md), [`../../EVIDENCE.md`](../../EVIDENCE.md), [`../../RUNBOOK.md`](../../RUNBOOK.md)

> **Approval and authority boundary:** On 2026-10-02, the user reported receiving an update that Node.js 24 is the correct project runtime. This decision adopts Node.js `24.x` as the current repository runtime baseline. The issuing authority, source document/version, and its publication date were not supplied and remain `Unknown`; no additional provenance is inferred. This is a runtime-baseline decision only. It does not verify application compatibility, install/start behavior, B-21, a second laptop, provider access, or release/deployment readiness.

## Context and constraints

DEC-005 selected Node.js `22.x` for the R1 runtime baseline and directed that a future runtime change receive a new versioned decision. The current `package.json` and root `package-lock.json` metadata also declare `22.x`. B-21 therefore stopped after `npm install` under Node `v24.21.0` exited successfully but emitted `EBADENGINE`; npm also reported one critical-severity vulnerability. `npm run dev` was not run. These are observed outcomes under the old declaration, not a compatibility verdict for Node 24.

DEC-002's earlier Node.js 24 stack decision was superseded by DEC-005 at the time. This new decision changes the current repository runtime authority; it does not rewrite either earlier record or claim that R1 was delivered on Node 24.

## Options considered

1. **Retain Node.js `22.x` as the active repository runtime.** Rejected for the current baseline because it conflicts with the user's reported correction that Node 24 is the correct version.
2. **Adopt Node.js `24.x` as the current repository runtime and synchronize active metadata.** **Selected.** This represents the user's correction as a versioned decision while keeping verification and B-21 acceptance separately gated.
3. **Leave the active runtime unspecified.** Rejected because package metadata and current setup guidance need one consistent runtime range.

## Decision and rationale

The active repository runtime baseline is Node.js `24.x`. Synchronize `package.json`, the root package metadata in `package-lock.json`, and current operational/user-facing runtime guidance to `24.x`. Mark DEC-005 `Superseded` as the active runtime authority after this successor is established, while retaining its text as the historical R1 decision and preserving the recorded Node.js 22 evidence/history. DEC-002 remains a historical decision superseded by DEC-005; its record is not rewritten.

The declared range is `24.x`, following the user's Node 24 correction; it is not narrowed to the observed `v24.21.0`. `@types/node` remains a type-definition dependency and is not changed by this runtime decision.

## Consequences, risks, and deferred work

- Current package metadata and current setup/runtime guidance must identify Node.js `24.x`; historical R1/R3 records, EVIDENCE entries, and RUNBOOK entries retain the versions and outcomes that were true when recorded.
- The previous `npm install` result remains a historical observation against the then-current `22.x` engine declaration. The decision does not convert its `EBADENGINE` warning into a pass.
- The critical-severity vulnerability reported by npm remains unresolved. This decision does not authorize `npm audit`, `npm audit fix`, dependency updates, or other remediation.
- Compatibility of the app/toolchain on Node 24, the local start path, and execution of the README commands remain `Needs verification` under a separately revised and explicitly approved B-21 contract.
- Cross-platform README guidance does not establish that a second laptop was available or verified. No such validation is claimed.
- No source, test, dependency, provider, secret, archive, checkpoint, deployment, commit, or push operation is authorized by this decision.

## Verification / revisit trigger

For this governance update, verify that DEC-016, the decision index, DEC-005's status, `package.json`, root `package-lock.json` engine metadata, `CLAUDE.md`, `ABOUT.md`, and the B-21 Draft contract consistently distinguish the active Node.js `24.x` baseline from historical Node.js 22 records. Check IDs, links, JSON validity, and the scoped diff. Do not run runtime or application commands under this decision.

Revisit if the user supplies authoritative runtime guidance that specifies a different supported range, or if the separately approved B-21 checks demonstrate a material incompatibility requiring a new bounded decision. B-21 must receive separate explicit approval before README edits or command execution.

## Linked task, evidence, and history boundary

- **Affected task:** [`TASK-SEA-R4-GOV-002`](../../TASK_SPEC.md), bounded runtime-baseline reconciliation.
- **Downstream task:** [`TASK-SEA-R4-B21-001`](../../TASK_SPEC.md) is revised to Draft v1.1 and requires separate explicit approval before README changes or runtime checks.
- **Evidence:** no new evidence is created by this decision; it records the baseline selection, not a successful install/start or compatibility result.
- **Operational history:** no RUNBOOK entry is created by this decision alone. Any later B-21 observations must be appended only after the approved checks occur.
