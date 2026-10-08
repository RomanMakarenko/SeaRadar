# SPEC.md — SeaRadar project contract

- **ID:** `SPEC-SEA-001`
- **Version:** `1.7.0`
- **Status:** `Ready`
- **Product owner:** методист відділення теорії судноводіння навчального центру «Норд-Вест»
- **Delivery / technical owner:** виконавець проєкту
- **Date:** 2026-10-01
- **Related artifacts:** [`PROJECT_BRIEF.md`](PROJECT_BRIEF.md), [`TASK_SPEC.md`](TASK_SPEC.md), [`SPRINT-01.md`](SPRINT-01.md), [`SPRINT-02.md`](SPRINT-02.md), [`docs/decisions/DEC-001-mvp-contract.md`](docs/decisions/DEC-001-mvp-contract.md), [`docs/decisions/DEC-002-r1-stack.md`](docs/decisions/DEC-002-r1-stack.md), [`docs/decisions/DEC-003-r1-handoff.md`](docs/decisions/DEC-003-r1-handoff.md), [`docs/decisions/DEC-005-r1-node22.md`](docs/decisions/DEC-005-r1-node22.md), [`docs/decisions/DEC-006-r2-scope.md`](docs/decisions/DEC-006-r2-scope.md), [`docs/decisions/DEC-009-r2-current-task-status.md`](docs/decisions/DEC-009-r2-current-task-status.md), [`docs/decisions/DEC-010-r2-sparse-snapshot-demo-fallback.md`](docs/decisions/DEC-010-r2-sparse-snapshot-demo-fallback.md), [`docs/decisions/DEC-011-r2-task-authorization-reconciliation.md`](docs/decisions/DEC-011-r2-task-authorization-reconciliation.md), [`docs/decisions/DEC-012-r3-scope.md`](docs/decisions/DEC-012-r3-scope.md), [`docs/decisions/DEC-014-r4-scope.md`](docs/decisions/DEC-014-r4-scope.md), [`SPRINT-03.md`](SPRINT-03.md), [`SPRINT-03b-CHANGE-REQUEST.md`](SPRINT-03b-CHANGE-REQUEST.md), [`EVIDENCE.md`](EVIDENCE.md), [`RUNBOOK.md`](RUNBOOK.md)

> Це поточна затверджена MVP-база, перенесена з `PROJECT_BRIEF.md` і доповнена погодженою зміною R4 за `DEC-014`. Подальша зміна контракту потребує нових версій `PROJECT_BRIEF.md` і цього документа та пов'язаного decision record до роботи за зміненим scope. Погодження R4 не замінює окрему авторизацію технічних task.

## Problem

На заняттях з основ судноводіння викладачу потрібен простий локальний інструмент для показу карти Дуврської протоки, руху навчальних суден і, пізніше, знімка справжніх суден. Публічні сайти перевантажені, залежать від реєстрації або реклами й не дають викладачу достатнього контролю над тим, що бачать курсанти.

## Primary user

Викладач відділення теорії судноводіння навчального центру «Норд-Вест». Курсанти є глядачами на проєкторі й не користуються програмою самостійно.

## User / JTBD

- **When:** перед або під час заняття з основ судноводіння;
- **I want to:** відкрити карту Дуврської протоки, показати рух навчальних суден, відкрити їхні дані та за кнопкою отримати знімок справжніх суден;
- **So I can:** пояснити курс, швидкість, зміну положення й межі актуальності AIS-даних на живому прикладі без залежності від поточного трафіку для навчальної частини;
- **Constraints:** один викладач на одному ноутбуці; локальний запуск; район один і фіксований; карта та справжні дані потребують інтернету; ключ AISStream не потрапляє у вихідний код, передані файли або UI; продукт не використовується для реальної навігації.
- **Evidence status:** підтверджено затвердженим `PROJECT_BRIEF.md`; реалізація ще не перевірена.

## Value proposition

- **Problem:** публічні сайти стеження за суднами заважають поясненню через рекламу, глобальний масштаб, перевантажений інтерфейс і обмеження доступу до деталей.
- **Alternative today:** публічні сайти стеження за суднами.
- **Promised outcome:** викладач запускає локальний інструмент і керовано показує навчальну та, коли доступна, справжню обстановку в Дуврській протоці.
- **Proof signal:** приймання US-01…US-10 за відтворюваними перевірками й ручним проходженням історій.
- **Claims excluded until verified:** adoption, production impact, scalability, revenue, user validation, безперервна доступність AISStream і повнота картини суден.

## Desired outcome

Отримати працездатний локальний навчальний посібник, який частинами можна запускати й приймати: спочатку карта та демонстраційні судна, потім знімок AIS-даних за кнопкою, а наприкінці — відтворювані перевірки відсутності спотворення даних та інструкція встановлення.

## Success metric

| Поле | Значення |
|---|---|
| Name | Acceptance coverage of approved MVP |
| Unit | Пройдені перевірки користувацьких історій та data-integrity checks |
| Baseline | `Unknown — implementation checks have not run` |
| Target | `Needs verification — US-01…US-10 and US-09 checks accepted at final handoff` |
| Observation window | `Unknown — release/checkpoint schedule is not supplied` |
| Collection method | `EVIDENCE.md`, targeted tests, manual acceptance and checkpoint review |
| Guardrail metric | `No secret exposure, no scope drift, no claims beyond observed evidence` |
| Status | `Needs verification` |

## Core flow

1. Викладач запускає локальний застосунок.
2. Бачить карту Дуврської протоки та демонстраційні судна.
3. Переміщує карту, наближає її та клікає по судну для відкриття картки.
4. Показує рух і зупинку демонстраційних суден.
5. Натискає одну кнопку для короткого збору справжніх AIS-повідомлень.
6. Бачить набір AISStream, час і кількість отриманих суден, обмеження повноти або зрозуміле повідомлення про результат спроби; якщо успішний знімок містить менше трьох AISStream-суден, карта додатково показує всі три демо-судна з окремим кольором джерела. Порожня чи невдала спроба не стирає показаний набір і його підпис; лише непорожній успіх замінює набір.
7. Після оновлення сторінки знову бачить демонстраційні дані й постійну підказку про це.
8. Після кожного bounded slice проходить людський checkpoint і отримує фактичний evidence/handoff.

## Scope

### In scope

- **R1 / verified baseline:** US-01…US-04 — карта, демонстраційне судно, значок, вибір і картка.
- **R2 / authorized release slice:** US-05…US-08 — справжні судна за кнопкою, підписи та повідомлення про помилки; R2 деталізований у `SPRINT-02.md`; DEC-006 historically selected B-08 as its bounded task. DEC-009 recorded that no successor R2 task had been authorized as of its 2026-09-25 approval. Later, DEC-010 and the approved `TASK-SEA-R2-B14-MIXED-VESSELS-001` authorize only the bounded sparse-snapshot UI slice; all other R2 technical tasks remain separately gated.
- **Final planned acceptance:** US-09 — відтворювані перевірки цілісності даних; US-10 — фінальна інструкція встановлення. Їхня implementation acceptance не заявляється виконаною.
- Локальний запуск на `http://localhost:3000` loopback.
- Один фіксований район: Дуврська протока.
- Демонстраційні та справжні судна як одна узгоджена структура даних.
- Для успішного AISStream-знімка з 0–2 отриманими суднами показувати всі три демо-судна додатково; AISStream-лічильник і підпис описують лише фактичний знімок. Маркери AISStream і демо мають різні кольори, а вибраний маркер має окреме помітне виділення.

### Non-goals

- Зони, тривоги, сповіщення, історія руху, сліди, replay, пошук і фільтри.
- Кілька районів, збереження налаштувань, безперервне real-time оновлення, вхід за паролем, кілька користувачів, віддалений сервер або хмара.
- Рекомендації, прогнози, «розумні» функції та використання для реальної навігації.
- Sprint 3 / R3 не додає продуктних функцій: його scope обмежений перевірками US-09 за DEC-012 та `SPRINT-03.md`. Дати, метрики поза цією перевіркою й архітектура понад погоджений stack залишаються `Unknown`; кожна технічна задача окремо task-gated.
- **R4 / approved product-contract change:** за DEC-014 уточнює US-06/US-07: набір суден і підпис джерела на карті незалежні від результату останньої спроби; loading, empty та error зберігають попередній показаний набір; лише непорожній успіх атомарно замінює його; час спроби та знімка береться з response body, не з браузерного годинника; після перезавантаження показуються demo data з постійною підказкою. Рядок спроби до першого натискання відсутній, під час запиту показує `Завантаження…`, а результатні тексти відповідають US-07 у `PROJECT_BRIEF.md`. Підпис джерела відповідає встановленому формату US-06 у `PROJECT_BRIEF.md`. US-10 залишається вимогою фінальної інструкції. Реалізація, тестування, приймання та README залишаються окремо task-gated. Sprint/release allocation для R4 не визначено (`Unknown`).

## Release slice

`R1 — карта й демонстраційні судна` деталізований у `SPRINT-01.md` і є verified baseline. `R2 — знімок справжніх позицій` авторизований decision record `DEC-006-R2-SCOPE` і деталізований у `SPRINT-02.md`; B-08 був bounded task, історично вибраним DEC-006. DEC-009 зафіксував, що на момент його затвердження successor R2 task ще не був авторизований. Пізніше DEC-010 і окремо затверджений `TASK-SEA-R2-B14-MIXED-VESSELS-001` авторизували лише зазначену зміну sparse-snapshot UI; її acceptance визначено `CHECKPOINT-25`, і це не дозволяє жодну іншу R2 implementation/diagnostic task. DEC-012 авторизував обмежений Sprint 3 / R3 план перевірок US-09, деталізований у `SPRINT-03.md`; це не є автоматичним прийманням, авторизацією імплементації чи дозволом змінювати продукт. DEC-014 затвердив R4 product-contract change для US-06/US-07 та підтвердив US-10 handoff requirement; assignment цього change до спринту лишається `Unknown`, а всі B-18—B-21 execution tasks потребують окремого approved bounded contract. Архітектура понад погоджений stack залишається `Unknown`.

## Acceptance criteria

1. `PROJECT_BRIEF.md` є затвердженим, але версійованим джерелом MVP-контракту.
2. Викладач може пройти US-01…US-08 руками за інструкцією та побачити очікувану поведінку.
3. Перевірки US-09 відтворювано демонструють правила вибору найсвіжіших повідомлень, унікальності, Unknown/null, координат і обмеження збору.
4. US-10 має бути виконана фінальною інструкцією встановлення та запуску.
5. Кожен заявлений результат має evidence з expected/observed і limitation.
6. Непідтверджені claims позначені `Unknown` або `Needs verification`; product implementation, deployment і user validation не вважаються виконаними без evidence.
7. За успішного AISStream-знімка з 0–2 суднами на карті є три додаткові маркери `demo`; для 3+ суден додаткові демо-маркери відсутні; AIS count не збільшується через демо; джерела мають різні кольори, а вибраний маркер окремо підсвічений.
8. За погодженим R4 контрактом loading, empty та error не видаляють показаний набір або його source label; лише непорожній успіх замінює набір, а окремий рядок спроби використовує час із відповіді сервера. Це acceptance requirement, не assertion, що implementation уже перевірено.
9. Після reload повертаються demo data з постійною підказкою; installation/start інструкція US-10 має пройти окреме приймання на явно визначеній цільовій платформі.

**Current acceptance status:** `Ready as a contract; implementation acceptance is not yet verified.`

## Verification plan

- **Поточний governance slice:** structural/content review canonical artifacts, decision links, Unknown markers, append-only history and Git diff.
- **R1 implementation:** `check → validate → build → targeted tests → demo gate` після затвердження конкретного implementation task.
- **Final acceptance:** запуск за інструкцією, ручне проходження US-01…US-08, запуск US-09 checks, перевірка сценарію без ключа, щонайменше одна спроба справжнього знімка або чесний evidence про недоступність джерела, перевірка відсутності ключа у переданих файлах.

## Assumptions and Unknowns

- **Confirmed:** `PROJECT_BRIEF.md` затверджений як поточна MVP-база; R1 verified; R2 scope та історичний вибір B-08 авторизовані `DEC-006-R2-SCOPE`; DEC-009 зафіксував відсутність successor task станом на його затвердження, а DEC-010 та `TASK-SEA-R2-B14-MIXED-VESSELS-001` пізніше авторизували лише B-14 sparse-snapshot slice. Інші R2 implementation/diagnostic tasks залишаються task-gated; див. DEC-011. Stack із `SPRINT-01.md` прийнятий як поточний R1 baseline.
- **Needs verification:** умови безкоштовного AISStream, стабільність джерела, фактична кількість суден і поведінка джерела при обриві зв'язку.
- **Unknown:** точні baseline/target/observation window продуктових метрик, дати sprint-ів, архітектура поза погодженим R1 stack, implementation/runtime evidence, assignment R4 до спринту та операційна система другого ноутбука. Bounded Sprint 3 scope і перелік task slices визначені DEC-012 та `SPRINT-03.md`; R4 product-contract change затверджений DEC-014, але його implementation acceptance не перевірено.

## Open decisions

- Архітектурна деталізація поза R1 — `Unknown`.
- R2 scope та outcome US-05…US-08 — авторизовані `DEC-006-R2-SCOPE`; B-08 був історичним task-gated slice. `DEC-009` фіксує стан авторизації на дату його затвердження; пізніші `DEC-010` та `TASK-SEA-R2-B14-MIXED-VESSELS-001` дозволяють лише sparse-snapshot UI slice, що залишається під review. Жодна інша R2 technical task цим не авторизована; див. уточнення хронології в `DEC-011`.
- Scope та outcome Sprint 3 / R3 затверджені `DEC-012` і деталізовані в `SPRINT-03.md`; implementation slices залишаються окремо task-gated.
- R4 contract change щодо US-06/US-07 та US-10 handoff затверджено `DEC-014`; release-to-sprint mapping лишається `Unknown`, а B-18—B-21 implementation окремо task-gated.
- Точні metric baseline, target та observation window — `Needs verification`; target OS для другого ноутбука — `Unknown`.
- Будь-яка подальша зміна approved brief, scope або R1 stack — нові узгоджені версії brief/SPEC і пов'язаний decision record.

## Change-control gate

`DEC-006-R2-SCOPE` історично авторизував R2 scope та вибрав B-08 як bounded task; `DEC-009-R2-CURRENT-TASK-STATUS` зафіксував межі авторизації станом на дату його затвердження; `DEC-010-R2-SPARSE-SNAPSHOT-DEMO-FALLBACK` та пов'язаний B-14 contract згодом затвердили лише точкове UI-доповнення. Хронологію та межі уточнює `DEC-011-R2-TASK-AUTHORIZATION-RECONCILIATION`. Кожна інша R2 implementation або diagnostic task потребує окремого reviewed bounded task contract і explicit approval. `DEC-012-R3-SCOPE` і `SPRINT-03.md` визначають чинний обмежений R3 test scope; кожен технічний slice залишається окремо task-gated і потребує reviewed bounded task contract та explicit approval. Подальше розширення approved brief, scope або stack потребує нової версії `PROJECT_BRIEF.md`/`SPEC.md`, пов'язаного decision record і bounded task contract. Delivery/technical owner фіксує зміни, evidence та handoff; product owner приймає продуктові зміни. Для погодженого R4 контракту див. `DEC-014`: він оновлює US-06/US-07 та підтверджує US-10 handoff, але не знімає окремі approval gates B-18—B-21. R4 sprint mapping, OS другого ноутбука й archive ownership лишаються `Unknown` або `Waiting for input`.
