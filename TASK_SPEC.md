# TASK_SPEC.md — bounded task contract

- **ID:** `TASK-SEA-TEMPLATE-001`
- **Version:** `0.1.0`
- **Status:** `Draft`
- **Owner:** `Waiting for MVP input`
- **Date:** 2026-09-21
- **Related artifacts:** [`CLAUDE.md`](CLAUDE.md), [`SPEC.md`](SPEC.md), [`EVIDENCE.md`](EVIDENCE.md), [`RUNBOOK.md`](RUNBOOK.md)

> `Template — no active task.` Цей файл описує executor contract, але не створює вигадану роботу. Перед реалізацією його потрібно заповнити для конкретного bounded slice або створити пов'язаний task record за цим самим contract.

## Goal and linked outcome

- **Goal:** `Waiting for MVP input`
- **SPEC outcome:** `SPEC-SEA-001 / desired outcome — Unknown`
- **Current/desired behavior:** `Unknown`

## Owner and allowed paths

- **Owner:** `Waiting for MVP input`
- **Allowed paths:** `Unknown — визначити до початку ітерації`
- **Affected paths:** `Unknown`

## Inputs and constraints

- **Inputs:** `MVP specification — pending`
- **Constraints:** не вибирати stack без decision record; не розширювати scope; не читати/записувати secrets; не додавати unrelated cleanup.
- **Dependencies:** `Unknown`

## Expected output

`Unknown — конкретний reviewable increment визначається після MVP input.`

## In scope

`Unknown — Waiting for MVP input.`

## Non-goals

- Будь-які зміни поза allowed paths.
- Редизайн або масовий cleanup, не потрібні acceptance.
- Claims про deployment, production readiness, adoption або user validation.

## Acceptance criteria

- [ ] Observable result сформульований у термінах поведінки.
- [ ] Scope і non-goals погоджені з `SPEC-SEA-001`.
- [ ] Verification command/manual check має expected signal.
- [ ] Evidence entry має посилання на task ID.
- [ ] Human checkpoint виконаний до переходу далі.

**Current acceptance status:** `Blocked — no active task until MVP input.`

## Verification

- **Targeted command:** `Unknown — stack не обраний`
- **Manual check:** перевірити diff, acceptance, evidence anchor і відсутність scope drift.
- **Expected result:** `Unknown`
- **Observed result:** `Not run`

## Checkpoint and stop conditions

- **Checkpoint:** після кожного slice переглянути diff і targeted signal.
- **Stop when:** scope expands; contract unclear; affected paths unexpected; verification oracle unavailable; rollback невизначений; з'являється потреба в непогодженому dependency.
- **Exit decision:** `HOLD — waiting for MVP input`

## Risks and open questions

- Product outcome, stack, architecture, owners і acceptance не визначені.
- Неясно, які checks будуть blocking, advisory або demo-only.

## Rollback / recovery

До появи active task: не виконувати зміни продукту. Для майбутньої роботи описати повернення до останнього `Verified` стану, owner рішення про rollback і evidence, яке підтверджує recovery.

## Handoff

Наступна дія: отримати MVP specification, після чого створити конкретний task contract і decision records до реалізації.
