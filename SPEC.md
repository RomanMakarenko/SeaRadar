# SPEC.md — SeaRadar project contract

- **ID:** `SPEC-SEA-001`
- **Version:** `1.0.0`
- **Status:** `Ready`
- **Product owner:** методист відділення теорії судноводіння навчального центру «Норд-Вест»
- **Delivery / technical owner:** виконавець проєкту
- **Date:** 2026-09-22
- **Related artifacts:** [`PROJECT_BRIEF.md`](PROJECT_BRIEF.md), [`TASK_SPEC.md`](TASK_SPEC.md), [`SPRINT-01.md`](SPRINT-01.md), [`docs/decisions/DEC-001-mvp-contract.md`](docs/decisions/DEC-001-mvp-contract.md), [`docs/decisions/DEC-002-r1-stack.md`](docs/decisions/DEC-002-r1-stack.md), [`EVIDENCE.md`](EVIDENCE.md), [`RUNBOOK.md`](RUNBOOK.md)

> Це поточна затверджена MVP-база, перенесена з `PROJECT_BRIEF.md`. Вона може змінюватися: зміна контракту потребує нової версії цього документа та пов'язаного decision record до початку роботи за зміненим scope.

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
6. Бачить отримані судна, час збору, кількість і обмеження повноти даних або зрозуміле повідомлення про невдачу.
7. Після кожного bounded slice проходить людський checkpoint і отримує фактичний evidence/handoff.

## Scope

### In scope

- **R1 / поточний release slice:** US-01…US-04 — карта, демонстраційне судно, значок, вибір і картка; US-05…US-08 — справжні судна за кнопкою, підписи та повідомлення про помилки; US-09 — відтворювані перевірки цілісності даних; US-10 — фінальна інструкція встановлення.
- Локальний запуск на `http://localhost:3000` loopback.
- Один фіксований район: Дуврська протока.
- Демонстраційні та справжні судна як одна узгоджена структура даних.

### Non-goals

- Зони, тривоги, сповіщення, історія руху, сліди, replay, пошук і фільтри.
- Кілька районів, збереження налаштувань, безперервне real-time оновлення, вхід за паролем, кілька користувачів, віддалений сервер або хмара.
- Рекомендації, прогнози, «розумні» функції та використання для реальної навігації.
- S2/S3 plans, їхні дати, owners, задачі та додатковий scope — `Waiting for MVP input`.

## Release slice

`R1 — карта й демонстраційні судна` деталізований у `SPRINT-01.md` і є єдиним поточно авторизованим sprint plan. Він використовує поточний stack baseline з `DEC-002-r1-stack.md`. Подальші sprint-и не деталізувати з припущень; їх можна створити лише після окремого погодження меж і decision records.

## Acceptance criteria

1. `PROJECT_BRIEF.md` є затвердженим, але версійованим джерелом MVP-контракту.
2. Викладач може пройти US-01…US-08 руками за інструкцією та побачити очікувану поведінку.
3. Перевірки US-09 відтворювано демонструють правила вибору найсвіжіших повідомлень, унікальності, Unknown/null, координат і обмеження збору.
4. US-10 має бути виконана фінальною інструкцією встановлення та запуску.
5. Кожен заявлений результат має evidence з expected/observed і limitation.
6. Непідтверджені claims позначені `Unknown` або `Needs verification`; product implementation, deployment і user validation не вважаються виконаними без evidence.

**Current acceptance status:** `Ready as a contract; implementation acceptance is not yet verified.`

## Verification plan

- **Поточний governance slice:** structural/content review canonical artifacts, decision links, Unknown markers, append-only history and Git diff.
- **R1 implementation:** `check → validate → build → targeted tests → demo gate` після затвердження конкретного implementation task.
- **Final acceptance:** запуск за інструкцією, ручне проходження US-01…US-08, запуск US-09 checks, перевірка сценарію без ключа, щонайменше одна спроба справжнього знімка або чесний evidence про недоступність джерела, перевірка відсутності ключа у переданих файлах.

## Assumptions and Unknowns

- **Confirmed:** `PROJECT_BRIEF.md` затверджений як поточна MVP-база; деталізований лише R1; stack із `SPRINT-01.md` прийнятий як поточний R1 baseline.
- **Needs verification:** умови безкоштовного AISStream, стабільність джерела, фактична кількість суден і поведінка джерела при обриві зв'язку.
- **Unknown:** точні baseline/target/observation window метрики, дати sprint-ів, деталізація S2/S3, architecture beyond R1, implementation/runtime evidence.

## Open decisions

- Архітектурна деталізація поза R1 — `Unknown`.
- Межі та outcome Sprint 2 і Sprint 3 — `Waiting for MVP input`.
- Точні metric baseline, target та observation window — `Needs verification`.
- Будь-яка зміна approved brief, scope або R1 stack — новий versioned decision record і версія SPEC.

## Change-control gate

Не починати роботу за зміненими вимогами, поки product owner не затвердить нову версію `PROJECT_BRIEF.md`/`SPEC.md`, пов'язаний decision record і bounded task contract. Delivery/technical owner фіксує зміни, evidence та handoff; product owner приймає продуктову зміну.
