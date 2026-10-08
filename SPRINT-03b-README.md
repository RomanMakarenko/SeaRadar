# SeaRadar — Sprint 3b / R4 summary

- **ID:** `SPRINT-SEA-S3B-README-001`
- **Version:** `1.0.0`
- **Status:** `Draft — descriptive companion pending human review`
- **Product owner:** методист відділення теорії судноводіння навчального центру «Норд-Вест»
- **Delivery / technical owner:** виконавець проєкту
- **Date:** 2026-10-07
- **Related artifacts:** [`SPRINT-03b.md`](SPRINT-03b.md), [`TASK_SPEC.md`](TASK_SPEC.md), [`EVIDENCE.md`](EVIDENCE.md), [`RUNBOOK.md`](RUNBOOK.md), [`DEC-014`](docs/decisions/DEC-014-r4-scope.md), [`DEC-015`](docs/decisions/DEC-015-r4-archive-gate-deferral.md), [`DEC-017`](docs/decisions/DEC-017-r4-sprint-assignment.md), [`CHECKPOINT-28`](docs/checkpoints/CHECKPOINT-28.md)

> Цей README — описовий companion до канонічного плану [`SPRINT-03b.md`](SPRINT-03b.md), а не заміна плану, контракт приймання або самостійний доказ. Статуси, обмеження й evidence-класи нижче наведені за пов'язаними task, checkpoint та evidence записами. Нові продуктові перевірки під час підготовки цього підсумку не запускалися.

## Результат коротко

- **Sprint 3b:** `DONE` лише для bounded planning/traceability outcome, зафіксованого в `SPRINT-03b.md` v1.2.0 та [`E-SEA-115`](EVIDENCE.md#e-sea-115--owner-disposition-for-bounded-sprint-3b-exit).
- **R4 загалом:** не позначено `DONE`; ширші критерії приймання залишаються `Unknown`.
- **Архів:** перевірку відкладено за [`DEC-015`](docs/decisions/DEC-015-r4-archive-gate-deferral.md). Це не pass і не постійне скасування; передумови й будь-яка майбутня дія залишаються окремо task-gated.

## Зафіксовані bounded результати

| Slice | Записаний результат | Evidence та межа висновку |
|---|---|---|
| **B-18 — UI state та source/attempt status** | `Verified` у межах bounded UI implementation і перевірок. | [`TASK-SEA-R4-B18-001`](TASK_SPEC.md), [`E-SEA-098`](EVIDENCE.md). Не підтверджує live-provider behavior або ширше R4-приймання. |
| **B-19 — browser contract tests** | `Verified` для погоджених browser cases і захисту movement/selection regressions. | [`TASK-SEA-R4-B19-001`](TASK_SPEC.md), [`CHECKPOINT-28`](docs/checkpoints/CHECKPOINT-28.md). У записах збережено початковий результат 22 passed / 1 failed, подальші виправлення та фінальні targeted reruns; окремого B-19 E-SEA запису в поточному R4 діапазоні не зазначено. |
| **B-20 — final acceptance і secret boundary** | `Verified` за критеріями після відкладення archive gate. | [`TASK-SEA-R4-B20-001`](TASK_SPEC.md), [`E-SEA-099`–`E-SEA-102`](EVIDENCE.md). Archive inspection відкладено, не пройдено й не waived; owner-reported manual outcomes відрізняються від незалежно спостережених командних результатів. |
| **B-21 — installation/start README** | `Verified — owner-accepted closure`. | [`TASK-SEA-R4-B21-001`](TASK_SPEC.md), [`E-SEA-103`–`E-SEA-104`](EVIDENCE.md). У поточному проході `npm install` і Playwright були denied before execution; `npm run dev`, `npx tsc --noEmit` та `npx next build` не запускалися. Це не доказ setup на іншому ноутбуці. |
| **GATE-b — другий ноутбук** | Owner-accepted на підставі агрегованого owner report. | [`E-SEA-109`](EVIDENCE.md#e-sea-109--owner-reported-gate-b-second-laptop-result) та [`E-SEA-110`](EVIDENCE.md#e-sea-110--owner-acceptance-of-gate-b). Не є незалежною чи command-by-command перевіркою; точні команди, Node/npm версії, Windows build і час виконання залишаються невідомими. |
| **Sprint 3b disposition** | Owner закрив bounded Sprint outcome як `DONE`, залишивши archive gate відкладеним. | [`TASK-SEA-R4-S3B-EXIT-001`](TASK_SPEC.md), [`E-SEA-115`](EVIDENCE.md). Попереднє `CONTINUE WITH APPROVAL` збережено як історичне; воно не переписує попередній стан. |

## Межі висновку та відкриті питання

- Цей Sprint `DONE` не означає overall R4 `DONE`, full MVP acceptance, release readiness або deployment readiness.
- Ширші R4 acceptance criteria, які не визначені bounded планом, залишаються `Unknown`.
- Archive format/type and scope, safe logical target, exact permission/action boundary та recovery owner/approach залишаються `Unknown` / `Waiting for input`. Архів не створювали, не читали й не інспектували.
- GATE-b прийнято за owner report, але точних командних результатів і незалежного підтвердження в цих записах немає.
- Owner-reported результати, незалежні checks, denied-before-execution команди та not-run команди — різні evidence-класи; не об'єднувати їх у твердження «все перевірено незалежно».

## Канонічні джерела та handoff

- Канонічний bounded план і Sprint disposition: [`SPRINT-03b.md`](SPRINT-03b.md).
- Scope, owner inputs і task dispositions: [`TASK_SPEC.md`](TASK_SPEC.md).
- Фактичні evidence та їх обмеження: [`EVIDENCE.md`](EVIDENCE.md), записи E-SEA-098–E-SEA-115.
- Історія виконання та handoff: [`RUNBOOK.md`](RUNBOOK.md).
- Scope authorization та archive deferral: [`DEC-014`](docs/decisions/DEC-014-r4-scope.md), [`DEC-015`](docs/decisions/DEC-015-r4-archive-gate-deferral.md), [`DEC-017`](docs/decisions/DEC-017-r4-sprint-assignment.md).
- Бounded checkpoint: [`CHECKPOINT-28`](docs/checkpoints/CHECKPOINT-28.md).

Цей summary не авторизує нову реалізацію, перевірку архіву, provider/network-запит, release чи deployment. Будь-яка така робота потребує окремого reviewed bounded contract і явного схвалення.
