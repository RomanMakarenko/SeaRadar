# SeaRadar

SeaRadar — навчальний проєкт інтерактивної карти суден у районі Дуврської протоки. Цей файл є загальною точкою входу: підсумовує перевірені bounded результати R1–R3 і посилається на канонічні плани, checkpoints та evidence; повні контракти, команди й обмеження наведені у пов'язаних артефактах.

## Стан проєкту

| Спринт | Статус | Межа результату |
|---|---|---|
| **Sprint 1 / R1** | `DONE / Verified` | Прийняті B-01…B-07: локальна карта, демонстраційні судна та їхня взаємодія. Див. [R1 guide](SPRINT-01-README.md) і [контракт Sprint 1](SPRINT-01.md). |
| **Sprint 2 / R2** | `PASS / VERIFIED` — bounded acceptance | Лише US-05…US-08, B-08…B-14 і визначені критерії CHECKPOINT-03. Авторитетний результат — [CHECKPOINT-25](docs/checkpoints/CHECKPOINT-25.md); план — [SPRINT-02.md](SPRINT-02.md). |
| **Sprint 3 / R3** | `DONE — bounded test-only scope` | Перевірки наявної US-09 поведінки завершені в погоджених межах; поточний результат — [CHECKPOINT-27](docs/checkpoints/CHECKPOINT-27.md). Канонічний план [SPRINT-03.md](SPRINT-03.md) зберігає `Ready` metadata; опис виконання — [SPRINT-03-README.md](SPRINT-03-README.md). |

Bounded результати Sprint 2 та Sprint 3 не означають повного MVP-приймання, live-provider validation, release readiness чи дозволу на deployment.

## Перевірені результати R1–R3

- **R1:** побудовано локальну Leaflet/OSM-карту з трьома demo-суднами, картками вибраного судна, літеральними маршрутами та їхнім рухом. B-07 додає цільову браузерну перевірку вибору й картки. R1 не включав реальні AIS-дані, API або production deployment. Запуск, команди перевірок і деталі реалізації залишаються у [SPRINT-01-README.md](SPRINT-01-README.md).
- **R2:** bounded slices охопили безпечну server-side конфігурацію, snapshot reader/API, перетворення й збір позицій, snapshot UI та demo fallback для sparse snapshot. Приймання обмежене B-08…B-14 і наведеними вище критеріями; локальну поведінку перевіряли fixtures/mocks. Детальний опис процесу й evidence-класи є у [SPRINT-02-README.md](SPRINT-02-README.md), який має статус `Verified` і є описовим companion, а не контрактом чи доказом.
- **R3:** bounded test-only scope перевірок US-09 має disposition `DONE` у [CHECKPOINT-27](docs/checkpoints/CHECKPOINT-27.md) та [E-SEA-097](EVIDENCE.md). Свіжі targeted результати: transformer — 10 тестів, collector — 15, demo movement — 1, snapshot UI — 3 ([E-SEA-095–096](EVIDENCE.md)); T01 `--list` підтвердив вибір Node/Chromium tests, не їх виконання. Первісна T04 coverage gap усунута тестовим follow-up. [SPRINT-03.md](SPRINT-03.md) залишається канонічним планом; опис роботи й процесу — у [SPRINT-03-README.md](SPRINT-03-README.md).

## Як виконували роботу

Робота велася обмеженими кроками: перед зміною фіксували task contract, перевіряли дозволені шляхи й критерії, виконували targeted checks, а потім переглядали diff і зупинялися на людському рішенні. Для локальної поведінки використовували детерміновані fixtures/mocks; фактичні перевірки й обмеження записували окремо від delivery history. Детальні методи Sprint 1 і Sprint 2 — у відповідних guide-файлах вище.

## Межі доказів і поточні обмеження

- Sprint 2 acceptance обмежене критеріями CHECKPOINT-25; CHECKPOINT-22 замінює початковий `HOLD` у CHECKPOINT-03 тільки для чотирьох визначених там критеріїв.
- Один bounded live capture і відповідний sample/provenance не доводять provider acknowledgement, чинність ключа чи загальну доступність провайдера.
- Mock/local tests, static review, screenshot-visible спостереження та повідомлені користувачем результати є різними класами evidence. Немає незалежно підтвердженого live UI/API end-to-end шляху.
- Sprint 3 `DONE` охоплює лише погоджений test-only scope перевірок US-09; це не повне MVP-приймання. US-10 (фінальна інструкція встановлення), full-suite/build результат, ширша user validation, live-provider behavior та release/deployment readiness цими записами не встановлені.

## Документи та перевірені записи

- [Проєктний контракт](SPEC.md)
- [Sprint 1: контракт і closure](SPRINT-01.md) · [R1 guide та запуск](SPRINT-01-README.md)
- [Sprint 2: контракт](SPRINT-02.md) · [Sprint 2 retrospective — Verified](SPRINT-02-README.md)
- [Sprint 3 / R3: canonical plan](SPRINT-03.md) · [retrospective companion](SPRINT-03-README.md) · [CHECKPOINT-27 — bounded `DONE`](docs/checkpoints/CHECKPOINT-27.md) · [DEC-012 scope authorization](docs/decisions/DEC-012-r3-scope.md)
- [CHECKPOINT-25 — bounded R2 acceptance](docs/checkpoints/CHECKPOINT-25.md) · [CHECKPOINT-22 — scoped CHECKPOINT-03 result](docs/checkpoints/CHECKPOINT-22.md)
- [EVIDENCE.md — фактичні результати й обмеження](EVIDENCE.md) · [RUNBOOK.md — delivery history та handoff](RUNBOOK.md) · [TASK_SPEC.md — bounded task contracts](TASK_SPEC.md)
