# DEC-007 — B-12 B-09 reader boundary

- **ID:** `DEC-007-R2-B09-STREAMING-BOUNDARY`
- **Version:** `1.0.0`
- **Status:** `Ready`
- **Product owner:** методист відділення теорії судноводіння навчального центру «Норд-Вест»
- **Delivery / technical owner:** виконавець проєкту
- **Date:** 2026-09-24
- **Related artifacts:** [`../../CLAUDE.md`](../../CLAUDE.md), [`../../SPEC.md`](../../SPEC.md), [`../../TASK_SPEC.md`](../../TASK_SPEC.md), [`../../EVIDENCE.md`](../../EVIDENCE.md), [`../../RUNBOOK.md`](../../RUNBOOK.md), [`../../SPRINT-02.md`](../../SPRINT-02.md), [`README.md`](README.md), [`DEC-006-r2-scope.md`](DEC-006-r2-scope.md), `TASK-SEA-R2-B09-001`, `TASK-SEA-R2-B12-001`, `E-SEA-043`, `E-SEA-044`, [`../../server/aisstream-reader.ts`](../../server/aisstream-reader.ts), [`../../app/api/snapshot/route.ts`](../../app/api/snapshot/route.ts), [`../../server/position-report-transformer.ts`](../../server/position-report-transformer.ts).

> **Review state:** The user approved this decision record on 2026-09-24. It authorizes only the bounded B-12 exception defined below; it does not authorize B-12 implementation, live provider access, commit or push.

## Context and constraints

B-09's accepted intermediate reader opens one AISStream WebSocket, sends the approved subscription, returns the first text message (or the approved no-message result), and closes the connection. B-09 intentionally did not parse, transform, deduplicate or collect messages. Its verified implementation and historical acceptance record are to remain unchanged.

B-12's approved product slice is a bounded snapshot: receive events during one 15-second total window, retain at most 100 unique vessels, select a vessel's latest valid position by the normalized message timestamp, and return either one complete snapshot or a fixed error response without partial success. The already-verified B-11 transformer provides the mapping from a decoded PositionReport to the shared Vessel shape.

The current `SPRINT-02.md` Part C says B-12 does not change the B-09 transport contract. That statement conflicts with the B-12 collection outcome: the existing first-message reader cannot provide multiple events from one connection. On 2026-09-24, the user explicitly approved a narrow, task-specific exception to the Part C clause by approving this decision record. `SPRINT-02.md` remains unchanged; this record provides the approved B-12-specific clarification.

Constraints retained:

- Keep the provider endpoint, exact approved subscription, bounding box, server-only key boundary and fixed B-09 public error mapping.
- Keep one WebSocket connection and one total 15-second attempt; the deadline includes connection/open/subscription time.
- Stop on the deadline or 100 unique valid vessels; use the existing B-11 transformer; never return partial success after provider/transport/internal failure.
- Keep B-09's verified historical acceptance intact. B-12 owns the new multi-event reader integration, collector and final route response behavior.
- No live AISStream request, real-key use, dependency, UI, persistence, continuous connection, history, release-level test or B-13 behavior is authorized by this decision.

## Options considered

1. **Keep B-09 first-message completion and implement B-12 on top of it.** Rejected: one attempt cannot collect multiple events or meet the snapshot's deduplication/latest-position behavior.
2. **Open a separate second WebSocket for the collector while leaving the B-09 reader untouched.** Rejected: creates parallel implementations of endpoint subscription, deadline, error mapping and resource cleanup, increasing divergence and lifecycle risk without adding product value.
3. **Narrowly extend the B-09 reader boundary so the same connection forwards ordered raw text events to B-12.** **Proposed selection.** Reuses the existing transport boundary while keeping parsing/transformation/collection in B-12 and mapping in B-11.
4. **Change B-12 to return only one event or defer the snapshot outcome.** Rejected for this proposed decision: it would not deliver the already-approved B-12 outcome and would require a separate product-scope decision.

## Decision and rationale

Approved on 2026-09-24: extend the B-09 reader boundary for B-12 only. During one bounded attempt, the existing reader forwards each text message, in arrival order, from its single WebSocket connection to the B-12 collector instead of completing on the first text message. The collector owns the single 15-second timer (started before event-source/WebSocket construction), parses the text, invokes the unchanged B-11 transformer, applies the 100-unique-vessel limit and timestamp-selection rules, then produces the final B-12 snapshot or fixed error response.

For B-12 only, this decision supersedes the sentence in `SPRINT-02.md` Part C that disallows changing the B-09 transport contract. It does not change the Sprint file or the B-09 task's historical acceptance. The B-12 task contract remains independently subject to human review and explicit implementation authorization. This decision does not authorize B-12 implementation; that gate remains closed until both are satisfied.

The choice is limited to the minimum transport capability required by the snapshot outcome. It avoids a second socket implementation and preserves B-09's provider and secret boundary. B-09 reader lifecycle changes must be covered by updated deterministic reader tests; B-12 collection rules must be tested separately with a fake event source and controlled clock.

## Consequences, risks and deferred work

- The reader's success lifecycle changes for B-12 from first-message completion to multi-message forwarding; it must still stop and clean up exactly once on deadline, limit, error, disconnect or cancellation.
- The collector, not the reader, owns the one total deadline; this avoids competing window timers and ensures connect/open/subscription time counts toward 15 seconds.
- A transport/provider error after messages have arrived discards the collected set and returns the fixed B-09 error envelope; partial snapshots are not successful results.
- Same-connection multi-event handling adds lifecycle and ordering cases. Mitigation is deterministic fake-source/controlled-clock coverage for window, limit, duplicates, newer/older/equal timestamps, partial-input errors, disconnect, abort, late events and exactly-once cleanup.
- Existing B-09 history, endpoint path, subscription shape, Node.js runtime, no-key guard, fixed error messages and secret isolation remain unchanged. The final endpoint's success body is the B-12 contract, not B-09's intermediate raw body.
- No claim about AISStream availability, actual live receipt, real-key validity, vessel identity, traffic completeness, full R2 acceptance or release readiness follows from this design decision or local tests.
- Updating the read-only `SPRINT-02.md` is deferred. Any later synchronization of that planning artifact requires separate authorization and review; this record is the authoritative B-12-specific exception while the Sprint file remains unchanged.

## Verification / revisit trigger

The product owner approved this record on 2026-09-24. The B-12 task contract still requires its own human review, and implementation still requires separate explicit authorization. After authorized implementation, verify the boundary with local deterministic reader/collector/route tests, a focused changed-path review, and append-only factual evidence; do not use a live provider call as a substitute for these checks.

Revisit with a new versioned decision if B-12 requires a second connection, a longer/continuous stream, a different provider/subscription, a changed deadline or limit, a new public error/partial-success policy, a B-11 transformer change, or any behavior beyond the bounded snapshot. Reconcile the Sprint planning text only through a separately authorized documentation change.