# DEC-010 — R2 sparse snapshot demo fallback and marker distinction

- **ID:** `DEC-010-R2-SPARSE-SNAPSHOT-DEMO-FALLBACK`
- **Version:** `1.0.0`
- **Status:** `Ready`
- **Product owner:** методист відділення теорії судноводіння навчального центру «Норд-Вест»
- **Delivery / technical owner:** виконавець проєкту
- **Date:** 2026-09-25
- **Related artifacts:** [`../../SPEC.md`](../../SPEC.md), [`../../SPRINT-02.md`](../../SPRINT-02.md), [`../../TASK_SPEC.md`](../../TASK_SPEC.md), [`DEC-006-r2-scope.md`](DEC-006-r2-scope.md), [`DEC-009-r2-current-task-status.md`](DEC-009-r2-current-task-status.md), [`../../EVIDENCE.md`](../../EVIDENCE.md), [`../../RUNBOOK.md`](../../RUNBOOK.md), `TASK-SEA-R2-B14-MIXED-VESSELS-001`.

> **Approval:** The product owner approved this decision and its linked bounded task contract on 2026-09-25. This authorizes only the bounded sparse-snapshot UI change below; it does not authorize provider/network access, secret access, commit, push, or deployment. Sprint checkpoint 03 remains `HOLD / not passed`.

## Context and constraints

The approved R2 contract distinguishes the existing training/demo display from real AISStream snapshot vessels. In the implementation, `VesselSource` is currently `"demo" | "aisstream"`; `DEMO_VESSELS` contains three simulated vessels. A successful snapshot currently renders only the returned AISStream vessels, including zero vessels; loading and error states clear all vessel markers. Source colors and selected-marker highlighting are not currently represented separately on the markers.

The product owner requested that when a request returns fewer than three vessels, all demo vessels also appear; training and demo vessels use different colors; and the selected vessel is highlighted. This changes the currently approved sparse/empty snapshot display contract in `SPEC.md` and `SPRINT-02.md`, so it requires this reviewed decision and versioned baseline synchronization before implementation.

**Terminology mapping confirmed for this decision:** the requested training/received vessels map to the AISStream snapshot source and the supplemental demo vessels map to the existing `DEMO_VESSELS`. AISStream remains identified as the source in product metadata; synthetic demo vessels must not inflate or be presented as the AIS count.

The decision does not authorize an AISStream request, environment or secret access, provider changes, live acceptance, or a claim that Sprint checkpoint 03 has passed. CHECKPOINT-16's `HOLD / not passed` remains unchanged.

## Options considered

1. **Show all three demo vessels when a successful AISStream snapshot contains fewer than three AISStream vessels, including a zero-vessel snapshot; use source colors plus a separate selected outline. Approved.** This follows the request literally, preserves a useful map when a successful sample is sparse, and keeps the actual AIS count distinct from synthetic markers.
2. **Add only enough demos to reach three total markers.** Not selected: the user specified showing demo vessels, and separately clarified that all demo vessels should be shown.
3. **Always show all demos alongside every snapshot.** Not selected: the request conditions the fallback on fewer than three returned vessels.
4. **Retain the current sparse/empty behavior.** Rejected: it does not provide demo context when the received AIS sample is sparse, contrary to the approved product request.

## Decision and rationale

Approved on 2026-09-25: if a validated successful AISStream snapshot contains 0–2 AISStream vessels, display all three existing demo vessels alongside those snapshot vessels. If it contains 3 or more AISStream vessels, display only the snapshot vessels. Preserve the existing AISStream snapshot label/count, which reports the server result only. For a successful empty snapshot, keep the existing empty-result message while showing the three demo markers. Loading and error states remain marker-free. Demo fallback markers remain stationary in mixed snapshot mode; initial demo-mode motion remains unchanged.

AISStream and demo markers receive distinct source colors. The selected marker receives an additional visible outline/ring without losing its source color. Selection and card behavior continue to work for both sources. No API, server collector, transport, payload, identifier, timestamp, or vessel schema changes are authorized.

This decision authorizes versioned synchronization of `SPEC.md` and `SPRINT-02.md`, the DEC-010 decision-index entry, and only the bounded implementation in `TASK-SEA-R2-B14-MIXED-VESSELS-001`. It does not establish Sprint 2 acceptance or authorize any other R2 task.

## Consequences, risks, and deferred work

- A sparse snapshot can display more markers than its AIS `count`; the source-specific marker metadata and unchanged AIS-only label must make this distinction clear.
- In a zero-result snapshot, demo markers coexist with the message that no AIS positions were received; tests and revised contract must verify this is not misleading.
- Live sample availability and AISStream behavior are not changed or established.
- Marker color choices should preserve contrast for both course-bearing and neutral markers; the selected outline must remain independently visible.
- This decision does not alter error behavior, loading behavior, demo routes/motion in idle mode, map bounds, source schemas, or any data-collection logic.
- Sprint checkpoint 03 remains `HOLD / not passed`; no R2 acceptance or release-readiness outcome is inferred.

## Verification / revisit trigger

Verify the versioned SPEC/SPRINT wording and decision links against this approved decision. Implementation checks use deterministic mocked snapshots (0, 1, 2, 3, and 4 AIS vessels), not provider/network access. Revisit if the product owner changes the fallback threshold, demo count, or behavior for loading/error states.

## Linked task and evidence boundary

- **Task contract:** `TASK-SEA-R2-B14-MIXED-VESSELS-001` — approved; implementation in progress under its allowed-path boundary.
- **Evidence:** none yet. This decision records the approved behavior only; it does not establish implementation, test, user validation, live data, or release acceptance.
- **Operational history:** no RUNBOOK entry until actual checks have been performed.
