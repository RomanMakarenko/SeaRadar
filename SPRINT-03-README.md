# SeaRadar — Sprint 3 / R3

- **ID:** `SPRINT-SEA-R3-RETROSPECTIVE-001`
- **Version:** `1.0.0`
- **Status:** `Draft — descriptive retrospective companion pending human review`
- **Product owner:** методист відділення теорії судноводіння навчального центру «Норд-Вест»
- **Delivery / technical owner:** виконавець проєкту
- **Date:** 2026-10-01
- **Related artifacts:** [`SPEC.md`](SPEC.md), [`SPRINT-03.md`](SPRINT-03.md), [`TASK_SPEC.md`](TASK_SPEC.md), [`EVIDENCE.md`](EVIDENCE.md), [`RUNBOOK.md`](RUNBOOK.md), [`DEC-012`](docs/decisions/DEC-012-r3-scope.md), [`DEC-013`](docs/decisions/DEC-013-r3-t06-demo-mode-test.md), [`CHECKPOINT-26`](docs/checkpoints/CHECKPOINT-26.md), [`CHECKPOINT-27`](docs/checkpoints/CHECKPOINT-27.md)

> Це описовий retrospective companion до канонічного плану [`SPRINT-03.md`](SPRINT-03.md), а не його заміна й не самостійний доказ. Команди, фактичні результати й limitations наведено за [`EVIDENCE.md`](EVIDENCE.md), RUNBOOK та checkpoints. Документ очікує людського review.

## Стан коротко

- **Поточний результат:** `DONE` для bounded test-only scope Sprint 3, записаний у [`CHECKPOINT-27`](docs/checkpoints/CHECKPOINT-27.md) та [`E-SEA-097`](EVIDENCE.md).
- **Мета:** відтворювано перевірити наявні правила US-09 для перетворення AIS-повідомлень, збору snapshot, руху demo-суден і станів snapshot UI. Нову продуктову поведінку не додавали.
- **Канонічний план:** [`SPRINT-03.md`](SPRINT-03.md) лишається планом Sprint 3 зі статусом `Ready`; цей README не змінює його scope чи metadata.
- **Межа висновку:** Sprint 3 `DONE` не означає повного MVP-приймання, live-provider validation, release readiness або deployment readiness.

## Що виконано

| Slice | Що зроблено / перевірено | Evidence і межа висновку |
|---|---|---|
| **T01 — межі Playwright-проєктів** | Розділено прямі Node-перевірки converter/collector та browser-перевірки Chromium; зафіксовано літеральні оракули й правила fixtures. `--list` вибрав 21 Node і 24 Chromium тести. | [`TASK-SEA-R3-TEST-001`](TASK_SPEC.md), [`E-SEA-094`](EVIDENCE.md). `--list` підтверджує вибір тестів, а не їх виконання. |
| **T02 — PositionReport transformer** | Додано/підтверджено literal cases для мапування, optional і некоректних значень. Свіжий targeted запуск: **10 passed**. | [`E-SEA-096`](EVIDENCE.md); прямий результат focused Node spec. |
| **T03 — порядок і заміна суден** | Перевірено deduplication, вибір новішої позиції, tie behavior та заміну цілого vessel object. | Collector spec — **15 passed** у свіжому запуску E-SEA-095; покриває T03–T05. |
| **T04 — вікно й ліміт збору** | Після незалежного review додано перевірку, що 100 повернутих MMSI унікальні й повністю дорівнюють поданому набору; MMSI №101 відхиляється. | [`E-SEA-095`](EVIDENCE.md), focused collector spec — **15 passed**. Це закрило саме test-coverage gap, зафіксований у CHECKPOINT-26 для його input revision; product defect не встановлено. |
| **T05 — помилки, cancellation, cleanup** | У collector spec перевірено failure/cancellation paths і закриття reader/timer ресурсів, включно з пізніми terminal events. | Той самий свіжий collector-spec запуск — **15 passed**, E-SEA-095; без live provider. |
| **T06 — рух demo-суден** | Перевірено literal маршрут і зупинку в кінцевій точці керованим browser clock. Після узгодження DEC-013 тест стартує в idle-demo mode, ставить route guard із нульовими `/api/snapshot` запитами та блокує зовнішні OSM tiles. | [`DEC-013`](docs/decisions/DEC-013-r3-t06-demo-mode-test.md), [`E-SEA-096`](EVIDENCE.md): свіжий Chromium targeted запуск — **1 passed**. Зміна стосувалася тестового setup, не product behavior. |
| **T07 — snapshot UI стани** | Перевірено error, empty success та success із судном без speed/course на підмінених API-відповідях. | [`E-SEA-096`](EVIDENCE.md): свіжий Chromium targeted запуск — **3 passed**; це mocked UI evidence. |
| **T08 — review findings** | Findings звірялися з дозволеним diff і Sprint acceptance; T04 coverage gap передали на окремий test-only follow-up. | [`TASK-SEA-R3-TEST-008`](TASK_SPEC.md), [`E-SEA-093`](EVIDENCE.md), [`CHECKPOINT-26`](docs/checkpoints/CHECKPOINT-26.md). Зміни production-коду не робилися. |
| **T09 — independent review і handoff** | Незалежний read-only review зафіксував відсутність статичних mismatch у T01–T03 і T05–T07 та знайшов T04 coverage gap. Пізніша звірка врахувала E-SEA-095 і E-SEA-096. | Історичний результат review — [`CHECKPOINT-26`](docs/checkpoints/CHECKPOINT-26.md), `CONTINUE WITH APPROVAL` для тодішнього handoff; поточний bounded result — [`CHECKPOINT-27`](docs/checkpoints/CHECKPOINT-27.md), `DONE`. CHECKPOINT-26 не переписували. |

### Свіжі targeted команди

Ці результати спостерігалися 2026-09-30 і записані в E-SEA-095/E-SEA-096. Для цього retrospective README команди повторно не запускали.

```bash
npx playwright test --project=node tests/snapshot-collector.spec.ts
# E-SEA-095: 15 passed

npx playwright test --project=node tests/position-report-transformer.spec.ts
# E-SEA-096: 10 passed

npx playwright test --project=chromium tests/demo-movement.spec.ts
# E-SEA-096: 1 passed

npx playwright test --project=chromium tests/snapshot-interface.spec.ts --grep "R3 snapshot UI states"
# E-SEA-096: 3 passed
```

T01 selection checks у task record — `npx playwright test --project=node --list` та `npx playwright test --project=chromium --list`. Вони підтверджують, що було вибрано 21 і 24 тести відповідно, а не що ці тести виконувалися.

## Як виконували роботу

1. **Затвердили вузький scope.** [`DEC-012`](docs/decisions/DEC-012-r3-scope.md) авторизував перевірки наявної US-09 поведінки на поточному Playwright/Node 22 baseline. Scope не дозволяв додавати product features, автоматизувати live provider або змінювати production code без окремого contract і дозволу.
2. **Розбили роботу на bounded slices.** T01–T09 мали окремі контракти в `TASK_SPEC.md`, allowed paths, observable acceptance, targeted checks і stop/recovery умови. Кожна зміна проходила окремий людський review.
3. **Зробили перевірки детермінованими.** Node specs використовували fixtures, fake event sources та контрольований timer; browser tests — Playwright clock і mocked snapshot responses. Зовнішні OSM tile requests блокувалися у відповідних browser checks.
4. **Узгодили T06 test setup.** Початкове empty-snapshot setup переводило сторінку в snapshot mode, де demo fallback markers не рухаються. DEC-013 погодив test-only перехід на початковий idle-demo mode із керованим годинником та route guard; самі product routes не змінювалися.
5. **Зафіксували finding, не приховуючи його.** Незалежний review виявив, що T04 тест на 100 суден не доводив унікальність і повну рівність набору MMSI. Історичний CHECKPOINT-26 залишився правдивим для свого review input.
6. **Закрили finding окремим тестовим slice.** Після явного схвалення додали oracle на 100 distinct IDs і повну рівність submitted/returned sets; свіжий collector spec пройшов 15 тестів. Product code не змінювався.
7. **Оновили доказову оцінку.** Свіжі targeted перевірки T02/T06/T07 записали в E-SEA-096, а пост-T04 матрицю й поточний disposition — в E-SEA-097 та CHECKPOINT-27. Це дозволило закрити лише затверджений Sprint 3 scope.

У T07 task history спочатку зафіксовано блок запуску через відсутній локальний Chromium; після окремо схваленої локальної підготовки браузера targeted перевірку виконали. Деталі залишаються в `TASK_SPEC.md` та відповідних dated records.

## Докази, limitations та non-claims

- E-SEA-095/E-SEA-096 містять прямі результати тільки перелічених focused specs. Старі pass-count summaries у E-SEA-094 не перетворюються на raw command output.
- T01 `--list` доводить project/test selection, не виконання вибраних тестів.
- У доступному Sprint 3 evidence немає результату повного test suite чи build; їх не слід виводити з targeted прогонів.
- Live-provider/network behavior, broad user validation, повне MVP-приймання, release readiness і deployment readiness не перевірялися цією роботою.
- R3 не додавав нових продуктних функцій. Не встановлюються provider availability, key validity чи повнота AIS картини.
- CHECKPOINT-26 зберігає історичний `CONTINUE WITH APPROVAL` і finding. CHECKPOINT-27 записує поточний `DONE` тільки для bounded test-only scope.

## Джерела та handoff

- План і затверджений scope: [`SPRINT-03.md`](SPRINT-03.md), [`DEC-012`](docs/decisions/DEC-012-r3-scope.md), [`DEC-013`](docs/decisions/DEC-013-r3-t06-demo-mode-test.md).
- Точні фактичні результати та limitations: [`EVIDENCE.md`](EVIDENCE.md), записи `E-SEA-093`–`E-SEA-097`.
- Незалежний review і поточний checkpoint: [`CHECKPOINT-26`](docs/checkpoints/CHECKPOINT-26.md), [`CHECKPOINT-27`](docs/checkpoints/CHECKPOINT-27.md).
- Task contracts/closeouts: [`TASK_SPEC.md`](TASK_SPEC.md); delivery chronology: [`RUNBOOK.md`](RUNBOOK.md).
- Подальші перевірки понад bounded Sprint 3 scope потребують окремого reviewed task contract і явного схвалення. Не трактувати цей README як дозвіл на нову реалізацію, provider access, release або deployment.
