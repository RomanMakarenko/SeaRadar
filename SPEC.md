# SPEC.md — SeaRadar project contract

- **ID:** `SPEC-SEA-001`
- **Version:** `0.1.0`
- **Status:** `Draft`
- **Owner:** `Waiting for MVP input`
- **Date:** 2026-09-21
- **Related artifacts:** [`CLAUDE.md`](CLAUDE.md), [`TASK_SPEC.md`](TASK_SPEC.md), [`EVIDENCE.md`](EVIDENCE.md), [`RUNBOOK.md`](RUNBOOK.md)

> Цей документ є reviewer-oriented contract shell. MVP input ще не надано. Незаповнені поля мають статус `Unknown`, а не є припущеннями про продукт.

## Problem

`Unknown — Waiting for MVP input.`

## Primary user

`Unknown — Waiting for MVP input.`

## User / JTBD

- **When:** `Unknown`
- **I want to:** `Unknown`
- **So I can:** `Unknown`
- **Constraints:** `Unknown`
- **Evidence status:** `Waiting for MVP input`

## Value proposition

- **Problem:** `Unknown`
- **Alternative today:** `Unknown`
- **Promised outcome:** `Unknown`
- **Proof signal:** `Unknown`
- **Claims excluded until verified:** adoption, production impact, scalability, revenue and user validation.

## Desired outcome

`Unknown — не визначати feature-first; спочатку потрібен один bounded outcome.`

## Success metric

| Поле | Значення |
|---|---|
| Name | `Unknown` |
| Unit | `Unknown` |
| Baseline | `Unknown` |
| Target | `Unknown` |
| Observation window | `Unknown` |
| Collection method | `Unknown` |
| Guardrail metric | `Unknown` |
| Status | `Waiting for MVP input` |

## Core flow

`Unknown — trigger → AI-assisted/product step → human checkpoint → observable result`.

## Scope

### In scope

- Один bounded MVP release slice після отримання та узгодження MVP input.
- Тільки поведінка, потрібна для перевірки визначеного outcome.

### Non-goals

- Вибір stack або architecture до decision record.
- Три sprint plans до затвердження MVP scope.
- Autonomous approval/merge/deployment.
- Production readiness, масштабування, billing, додаткові інтеграції та широкі ролі, якщо вони не потрібні core flow.

## Release slice

`Unknown — буде визначено після фіксації user, JTBD, core flow і success signal.`

## Acceptance criteria

1. Primary user, JTBD, outcome і межі scope зафіксовані в цій SPEC.
2. Release slice має observable acceptance та reproducible verification path.
3. Кожен task має bounded contract у `TASK_SPEC.md` або пов'язаному task record.
4. Кожен заявлений результат має evidence у `EVIDENCE.md`.
5. Непідтверджені claims позначені `Unknown` або `Needs verification`.

**Current acceptance status:** `Blocked — Waiting for MVP input`.

## Verification plan

До надходження MVP input: structural/content review документів та Git status.

Після надходження MVP input: targeted checks, tests, demo quality gate і handoff, визначені в sprint/task contracts. Команди поки `Unknown`, бо stack не обраний.

## Assumptions

- Проєкт має бути організований як AI-assisted delivery з human checkpoints. `Assumption — підтвердити з owner.`
- MVP складатиметься з трьох sprint-ів, згідно з intake note. `Waiting for MVP input.`

## Open decisions

- Який продукт і його bounded core flow?
- Хто primary user та owner рішення?
- Який stack та architecture відповідають MVP constraints?
- Які baseline, target і observation window метрики?
- Які рівні verification потрібні для кожного slice?

## MVP input gate

Роботу над product implementation не починати, доки owner не надасть MVP specification і не буде узгоджено: user/JTBD, outcome, scope/non-goals, acceptance, success metric, constraints та спосіб delivery у трьох sprint-ах.
