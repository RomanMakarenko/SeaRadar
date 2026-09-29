# SPRINT-03 — Реліз R3: відтворювані перевірки даних і руху

- **ID:** `SPRINT-SEA-R3-001`
- **Version:** `1.1.0`
- **Status:** `Ready — scope затверджено; реалізація залишається task-gated`
- **Product owner:** методист відділення теорії судноводіння навчального центру «Норд-Вест»
- **Delivery / technical owner:** виконавець проєкту
- **Date:** 2026-09-30
- **Related artifacts:** [`PROJECT_BRIEF.md`](PROJECT_BRIEF.md), [`SPEC.md`](SPEC.md), [`TASK_SPEC.md`](TASK_SPEC.md), [`docs/decisions/DEC-012-r3-scope.md`](docs/decisions/DEC-012-r3-scope.md), [`docs/decisions/DEC-013-r3-t06-demo-mode-test.md`](docs/decisions/DEC-013-r3-t06-demo-mode-test.md), [`docs/sprints/README.md`](docs/sprints/README.md), [`docs/checkpoints/CHECKPOINT-25.md`](docs/checkpoints/CHECKPOINT-25.md), майбутній checkpoint `docs/checkpoints/CHECKPOINT-26.md`.

> **Межа схвалення:** DEC-012 затверджує цей обмежений план Sprint 3. Жодну задачу реалізації цим не авторизовано. Перед кожною зміною коду або тестів потрібні окремий reviewed bounded contract у `TASK_SPEC.md` та явне схвалення. Production-код не змінювати, доки тест не покаже підтверджене розходження; для виправлення потрібні окремий контракт і дозвіл.

## Результат і критерій успіху

**Результат:** надати відтворювані детерміновані докази для наявних правил US-09: перетворення повідомлення позиції, збір знімка, рух демонстраційних суден і наявні стани інтерфейсу R2. Нової поведінки продукту не додаємо.

**Критерій успіху:** кожен наведений нижче сценарій має незалежне літеральне очікування й проходить у цільовому проєкті Playwright Test; незалежний review фіксує findings та обмеження (їх може не бути); обмежений результат записаний у майбутньому checkpoint R3. Невдалий тест фіксується як розходження, а не як дозвіл змінювати production-код. Нуль дефектів — прийнятний результат.

## Межі та non-goals

### У scope

- Лише Playwright Test: Node-перевірки наявного перетворювача й збирача та Chromium-перевірки руху й інтерфейсу.
- Збережений `data/samples/position-report.sample.json` і явно позначені синтетичні варіанти; вихідний зразок не змінювати.
- Літеральні очікування, підмінене джерело подій/годинник збирача та керований `page.clock` там, де тестується рух у браузері. Нові R3 browser-кейси не використовують `waitForTimeout` або інше реальне очікування.
- Кожен новий browser-кейс блокує зовнішні OSM tile-запити. Якщо кейс викликає snapshot API, відповідь `GET /api/snapshot` підміняється fixture. Вузький виняток R3-T06 описаний нижче: він не викликає snapshot API, а встановлює route guard, який перериває та рахує неочікувані запити, і перевіряє, що їх немає.
- Незалежний read-only review дозволеного diff і фактичних результатів перевірок.

### Поза scope

- Нові функції продукту, загальний рефакторинг, цілі покриття, зміна правил збору, автоматизація живого WebSocket/провайдера, зовнішні мережеві запити, доступ до environment/secrets, deployment або повне MVP/release acceptance.
- Зміни production-коду в межах цього плану. Підтверджене розходження може бути підставою для окремого bounded remediation task та явного схвалення; цей план remediation не дозволяє.
- Новий тестовий framework, dependency, runtime чи архітектура. Використовувати тільки наявний Playwright Test і затверджений baseline Node.js 22.
- Acceptance Sprint 2, роботу R2 B-14 або нову роботу B-07. B-07 входить до перевіреного baseline R1; не створювати його повторно й не перейменовувати тут.

## Послідовні невеликі задачі

Кожна задача — окремий bounded slice із власним reviewed та явно схваленим контрактом у `TASK_SPEC.md`; залежні slices не можна починати до виконання їхніх залежностей. `Allowed paths` нижче — максимальний перелік можливих шляхів майбутньої реалізації; конкретний контракт має його звузити за потреби. Вихідні файли коду — read-only у межах цього плану.

### R3-T01 — Межа Playwright-проєктів та оракул тестів

- **Task ID:** `TASK-SEA-R3-TEST-001`
- **Мета:** визначити, як наявний Playwright Test розділяє прямі Node-перевірки й браузерні перевірки, та зафіксувати літеральні очікування/правила fixtures до написання assertions.
- **Не робимо:** не додаємо runner/dependency, не змінюємо поведінку продукту, не генеруємо очікування з тестованого коду, не змінюємо наявну Chromium-поведінку.
- **Вхід / результат:** `playwright.config.ts`, наявні тести й збережений зразок; погоджена карта подальших сценаріїв з літеральними оракулами й цільовими проєктами.
- **Залежності:** немає.
- **Allowed paths:** `playwright.config.ts`, `tests/position-report-transformer.spec.ts`, `tests/snapshot-collector.spec.ts`. `data/samples/position-report.sample.json` — read-only.
- **Критерії приймання:** Playwright Test лишається єдиним runner; converter/collector запускаються без браузера; наявні браузерні тести лишаються в проєкті `chromium`; очікуване значення кожного подальшого тесту зафіксоване літералом; синтетичні входи явно позначені як synthetic.
- **Targeted check:** `npx playwright test --project=node --list` та `npx playwright test --project=chromium --list`. Назва Node-only проєкту — `node`, наявного browser-проєкту — `chromium`.
- **Checkpoint / review:** перевірити diff конфігурації та карту оракулів до написання тест-кейсів.
- **Stop / recovery:** зупинитися, якщо потрібні новий runner, dependency, runtime чи архітектура. У разі відхилення відновити лише власні зміни цього slice до review.

### R3-T02 — Перетворювач PositionReport

- **Task ID:** `TASK-SEA-R3-TEST-002`
- **Мета:** підтвердити наявними правилами US-09, що transformer правильно мапить валідний вхід і відкидає або зануляє некоректні поля.
- **Не робимо:** не змінюємо transformer, збережений sample чи набір підтримуваних AIS-полів.
- **Вхід / результат:** збережений sample та названі синтетичні варіанти; цільові assertions перетворювача.
- **Залежності:** оракул/межа проєктів R3-T01.
- **Allowed paths:** `tests/position-report-transformer.spec.ts`; `data/samples/position-report.sample.json` — read-only. `server/position-report-transformer.ts` — read-only без окремо схваленої remediation-задачі.
- **Критерії приймання:** збережений sample дає літеральний об'єкт `{ id: "999000001", name: "SYNTHETIC TRAINING VESSEL", lat: 51, lon: 1.45, speedKnots: 12.4, courseDeg: 123.4, timestamp: "2026-09-23T15:00:00.000Z", source: "aisstream" }`; відсутня/пробільна назва → `null`; швидкість `0` → `0`, `102.3`, `-1` та відсутня швидкість → `null`; курс `360` → `null`; координати `(91,181)`, `(95,-200)`, координати-рядки, відсутній/порожній MMSI та час, що не парситься, відкидають позицію; некоректні координати не створюють судно в `(0,0)`.
- **Targeted check:** `npx playwright test --project=node tests/position-report-transformer.spec.ts`.
- **Checkpoint / review:** людина переглядає літеральні очікування до запуску; після запуску — focused test diff.
- **Stop / recovery:** при розходженні зберегти фактичний failure і зупинитися до будь-яких product edits; у разі відхилення відновити лише тестову зміну цього slice.

### R3-T03 — Порядок, унікальність і заміна суден у збирачі

- **Task ID:** `TASK-SEA-R3-TEST-003`
- **Мета:** перевірити, що збирач тримає один повний, правильно впорядкований об'єкт на MMSI.
- **Не робимо:** не змінюємо tie-breaking, freshness, схему судна чи правила збору.
- **Вхід / результат:** детерміноване тестове джерело з literal timestamps/positions; focused collector tests.
- **Залежності:** R3-T01; дозволено повторно використовувати helpers R3-T02, але очікувані результати не обчислюються production-функціями.
- **Allowed paths:** `tests/snapshot-collector.spec.ts`; `server/snapshot-collector.ts` і `server/position-report-transformer.ts` — read-only без окремо схваленої remediation-задачі.
- **Критерії приймання:** повторні однакові повідомлення дають одне судно; новіше повідомлення зберігається, якщо старіше надходить пізніше; при однаковому часі лишається перша прийнята позиція; повний пізніший об'єкт з `name: null` замінює попереднє ім'я без збереження застарілих полів.
- **Targeted check:** `npx playwright test --project=node tests/snapshot-collector.spec.ts`.
- **Checkpoint / review:** перевірити кожен literal expected object і підтвердити, що тест не рахує очікування transformer/collector-функцією.
- **Stop / recovery:** розходження лише фіксуються; у разі відхилення відновити лише тестову зміну цього slice.

### R3-T04 — Вікно, ліміт і успішне завершення збору

- **Task ID:** `TASK-SEA-R3-TEST-004`
- **Мета:** підтвердити правила успішного завершення збирача з підміненим джерелом і керованим годинником.
- **Не робимо:** не змінюємо 15-секундне вікно, ліміт 100 суден чи схему результату.
- **Вхід / результат:** детерміноване тестове джерело, injected timer/clock; тести успішного завершення.
- **Залежності:** R3-T01 та R3-T03.
- **Allowed paths:** `tests/snapshot-collector.spec.ts`; `server/snapshot-collector.ts` — read-only без окремо схваленої remediation-задачі.
- **Критерії приймання:** 100 унікальних суден повертають `reason: 'limit_reached'`, `truncated: true`, а судно 101 не приймається; 100 повідомлень про одне судно не завершують збір завчасно; після просування injected timer до 15 000 ms без повідомлень у відкритій підписці успіх має `count: 0` та `reason: 'window_elapsed'`; `collectedAt` дорівнює literal часу injected clock у момент завершення.
- **Targeted check:** `npx playwright test --project=node tests/snapshot-collector.spec.ts`.
- **Checkpoint / review:** перевірити керування часом і literal timestamps; без реального очікування та глобальної заміни `Date`.
- **Stop / recovery:** зупинитися, якщо потрібна глобальна підміна годинника або зміна правил збору; у разі відхилення відновити лише тестові зміни цього slice.

### R3-T05 — Помилки, скасування й очищення ресурсів збирача

- **Task ID:** `TASK-SEA-R3-TEST-005`
- **Мета:** підтвердити, що помилка/скасування не повертають частковий успіх і рівно один раз закривають reader/timer ресурси.
- **Не робимо:** не тестуємо живого провайдера, retries, змінені error semantics чи транспорт.
- **Вхід / результат:** fake event source, керований timer і лічильники stop/close/clear; focused lifecycle tests.
- **Залежності:** R3-T01 та R3-T03.
- **Allowed paths:** `tests/snapshot-collector.spec.ts`; `server/snapshot-collector.ts` і `server/aisstream-reader.ts` — read-only без окремо схваленої remediation-задачі.
- **Критерії приймання:** невідкрите до timeout з'єднання та socket error до відкриття дають `connect_failed`; provider error/disconnect після трьох валідних повідомлень дає `provider_error`/`disconnected`, не повертаючи частковий успіх; provider error після завершення за лімітом не замінює успіх і не завершує збір вдруге; скасування до кінця вікна відхиляє запит без успішного результату, закриває reader і очищає timers; після кожного terminal result немає відкритих fake connections або pending timer callbacks.
- **Targeted check:** `npx playwright test --project=node tests/snapshot-collector.spec.ts`.
- **Checkpoint / review:** перевірити лічильники fake source і стан timers на всіх terminal paths.
- **Stop / recovery:** зупинитися, якщо тест звертається до справжнього socket/provider або потребує зміни семантики; у разі відхилення відновити лише тестові зміни цього slice.

### R3-T06 — Рух демонстраційних суден і кінець маршруту

- **Task ID:** `TASK-SEA-R3-TEST-006`
- **Мета:** перевірити наявний рух demo-суден і завершення маршруту керованим годинником сторінки.
- **Не робимо:** не змінюємо маршрути, інтервал руху, обчислення курсу чи вибір судна.
- **Вхід / результат:** наявна demo-сторінка та `page.clock`; focused browser assertions.
- **Залежності:** browser project з R3-T01.
- **Allowed paths:** новий `tests/demo-movement.spec.ts`. `app/sea-map.tsx`, `app/vessel-model.ts` та `app/vessel-card.tsx` — read-only без окремо схваленої remediation-задачі.
- **Критерії приймання:** перед навігацією заморозити `page.clock` на `2026-09-29T12:00:00.000Z`; почати в наявному початковому idle-demo режимі й не запускати snapshot loading. Встановити route guard на `/api/snapshot`, який перериває та рахує будь-який неочікуваний запит; перевірити, що лічильник дорівнює нулю. Заблокувати зовнішні OSM tile-запити. Вибрати `demo-1` і перевірити літеральну координату після кожного `page.clock.runFor(2_000)`: початково `51.00000, 1.45000`; t=2s `51.01000, 1.45000`; t=4s `51.02000, 1.46500`; t=6s `51.03000, 1.48000`; t=8s `51.04000, 1.49500`; t=10s `51.05000, 1.51000`; t=12s `51.06000, 1.52500`; t=14s `51.07000, 1.54000`; t=16s `51.08000, 1.55500`; t=18s `51.09000, 1.57000`. На кінцевій точці картка також показує `0 kn`, курс `43°` і час останнього кроку `12:00:18 UTC`. Після наступних 2 000 ms усі кінцеві значення, включно з часом останнього кроку, лишаються незмінними. Не стверджувати, що sparse-snapshot fallback markers рухаються; це не поведінка, яку перевіряє T06. `waitForTimeout`, інші реальні очікування та live provider requests заборонені.
- **Targeted check:** `npx playwright test --project=chromium tests/demo-movement.spec.ts`; встановити snapshot route guard і перевірити нуль запитів до `/api/snapshot`, заблокувати зовнішні OSM tile-запити. Запуск команди лишається окремо task-gated.
- **Checkpoint / review:** перевірити, що clock встановлений до navigation/timers, snapshot route guard не зафіксував запитів, OSM tiles заблоковані, а assertions стосуються вибраного судна та зберігають усі literal route/card values.
- **Stop / recovery:** якщо початковий idle-demo рух не збігається з літеральним оракулом, зупинитися й залишити T06 на `HOLD`; не змінювати product behavior. Зупинитися також, якщо не вдається блокувати tiles або route guard бачить snapshot request; у разі відхилення відновити лише тестову зміну цього slice.

### R3-T07 — Помилка, порожня відповідь та успішні стани snapshot UI

- **Task ID:** `TASK-SEA-R3-TEST-007`
- **Мета:** перевірити наявні стани R2 через детерміновані підмінені відповіді `GET /api/snapshot`.
- **Не робимо:** не перевіряємо доступність провайдера, не змінюємо UI-контракт і не виконуємо справжній API/provider request.
- **Вхід / результат:** mocked responses і наявні Chromium helpers; focused interface assertions.
- **Залежності:** browser project з R3-T01.
- **Allowed paths:** `tests/snapshot-interface.spec.ts`. `app/map-shell.tsx` і `app/vessel-card.tsx` — read-only без окремо схваленої remediation-задачі.
- **Критерії приймання:** error response показує нуль суден, `Даних на карті немає` і `Не вдалося отримати дані: <message>`; empty success показує `суден: 0` і `За час збору позицій не отримано`; успішний snapshot містить судно без швидкості/курсу, тест клікає його marker для відкриття картки, а картка показує `Немає даних` та `data-icon="neutral"`. Кожна відповідь підмінена; кожен R3-кейс блокує зовнішні OSM tile-запити й обходиться без `waitForTimeout`/реального очікування. Браузерний clock не є заміною годинника server collector.
- **Targeted check:** `npx playwright test --project=chromium tests/snapshot-interface.spec.ts --grep "R3 snapshot UI states"`; усі нові R3-кейси мають бути згруповані під назвою `R3 snapshot UI states`, щоб не запускати наявні unrelated cases.
- **Checkpoint / review:** перевірити, що кожен кейс використовує потрібну mocked response й перевіряє видимий UI, а не роботу мережі/провайдера.
- **Stop / recovery:** зупинитися, якщо тест звертається до реального провайдера або потребує зміни UI semantics; у разі відхилення відновити лише тестову зміну цього slice.

### R3-T08 — Review findings і рішення щодо обмеженого виправлення

- **Task ID:** `TASK-SEA-R3-TEST-008`
- **Мета:** звірити diff R3-T01…T07 і результати тестів із затвердженими контрактами R1/R2/US-09; класифікувати кожне розходження як підтверджене, не відтворене або невідоме.
- **Не робимо:** не застосовуємо автоматичні виправлення, рефакторинг, розширення assertions або не пов'язані з Sprint 3 findings.
- **Вхід / результат:** reviewed contracts, точні diff-и, фактичний test output і таблиця findings (може бути порожня).
- **Залежності:** R3-T01…T07.
- **Allowed paths:** read-only review затвердженого diff; лише `TASK_SPEC.md` для closeout findings/disposition. Змінювати source заборонено. Будь-яке product-виправлення потребує нового bounded contract у `TASK_SPEC.md` та явного схвалення до редагування.
- **Критерії приймання:** кожен finding посилається на критерій та спостережений failure; нуль findings зафіксований як прийнятний результат; під цим task немає production edit; повторний targeted test запускається лише в межах окремо схваленої задачі.
- **Targeted check:** незалежний source/test review і звірка з літеральними acceptance criteria; нових runtime-команд понад схвалені попередні slice немає.
- **Checkpoint / review:** людина переглядає findings та обмеження і обирає `continue`, `revise` або `HOLD`.
- **Stop / recovery:** зупинитися при непідтвердженій поведінці, scope expansion або unsupported product claim; у разі відхилення зберегти test output і відновлювати лише власну документаційну зміну.

### R3-T09 — Незалежний review і checkpoint Sprint 3

- **Task ID:** `TASK-SEA-R3-TEST-009`
- **Мета:** отримати незалежний read-only review та фактичний обмежений handoff після завершення схвалених тестів/review.
- **Не робимо:** не створюємо evidence до запуску перевірок, не переписуємо R2 checkpoints, не архівуємо/публікуємо зовні й не оголошуємо повне MVP/release readiness.
- **Вхід / результат:** затверджений diff, фактичні test outputs, findings/limitations і людський disposition; майбутній запис `docs/checkpoints/CHECKPOINT-26.md`, ID `CHECKPOINT-SEA-R3-026`.
- **Залежності:** R3-T01…T08 та окреме схвалення кожної implementation-задачі.
- **Allowed paths:** read-only review; після фактичної перевірки та в межах майбутнього bounded task — append-only `EVIDENCE.md`, append-only `RUNBOOK.md` і `docs/checkpoints/CHECKPOINT-26.md`. `CHECKPOINT-05.md` та `CHECKPOINT-25.md` незмінні.
- **Критерії приймання:** reviewer не має author-session history та права на редагування; findings і limitations явні; checkpoint 26 містить лише спостережені перевірки й exit decision (`DONE`, `CONTINUE WITH APPROVAL` або `HOLD`); claims про US-09, повне MVP, live-provider, release чи deployment не виходять за межі доказів.
- **Targeted check:** структурні/link/whitespace checks майбутнього checkpoint; звірити кожне твердження з output команд і затвердженими task contracts.
- **Checkpoint / review:** людина переглядає фінальний diff і checkpoint; commit/archive цим планом не дозволені.
- **Stop / recovery:** за неповних acceptance evidence обрати `HOLD` або `CONTINUE WITH APPROVAL`; factual correction додавати новим записом, не переписувати прийняту історію.

## Blocking та advisory перевірки

**Blocking для `DONE`:** усі acceptance assertions R3-T02…T07 проходять за затвердженими targeted commands; межа Node/browser-проєктів і literal-oracle rules проходять у R3-T01; немає несанкціонованих production edits чи зовнішніх запитів до провайдера; findings незалежного review мають людський disposition; CHECKPOINT-26 містить фактичні результати команд, limitations, evidence links і handoff. Непідтверджене remediation для підтвердженого розходження не дозволяє `DONE`; потрібен `CONTINUE WITH APPROVAL` або `HOLD`.

**Advisory:** необов'язковий повторний запуск вже перевіреного B-07 може бути записаний як нове спостереження, але не є критерієм Sprint 3. Відсоток coverage, live-provider checks, ручна production readiness і deployment checks не є gates Sprint 3 і не мають заявлятися як результат.

## Gate завершення

- R3-T01…T09 окремо схвалені й закриті з власними targeted checks та людським review.
- Вже перевірений B-07 не змінюється. Це не нова задача Sprint 3; необов'язковий повторний запуск є новим спостереженням і не замінює наявного evidence.
- Правило інтерфейсу «показуємо результат останньої спроби» не змінюється.
- Checkpoint 26 містить фактичний обмежений результат, findings, limitations, rollback/recovery і handoff. Нуль дефектів прийнятний.
- Exit decision: `DONE`, `CONTINUE WITH APPROVAL` або `HOLD`. Наявність плану чи зелених тестів сама по собі не є повним MVP acceptance або дозволом на release/deployment.

## Readiness, risks і recovery

- **Confirmed:** затверджений R1 stack використовує Node.js 22 і Playwright Test; у репозиторії вже є прямі specs для converter/collector і Chromium specs. У кожній окремій задачі спершу перевірити чинне coverage, щоб доповнювати тести, а не дублювати їх.
- **Unknown:** фактичні результати нової acceptance matrix R3; чи всі наявні тести вже покривають кожен випадок; підтверджена product mismatch; дати/розклад занять; поведінка live provider; архітектура поза погодженим baseline.
- **Припущення готовності:** детерміновані тести використовують наявні injection points джерела подій/timer та наявні mocked browser route helpers. Якщо injection point або project boundary відсутній, зупинитися й підготувати окремий reviewed task; не додавати dependency і не змінювати production code за припущенням.
- **Rollback/recovery:** кожен slice відновлює лише власні затверджені зміни тестів/config/docs після людського review. Зберігати всі R1/R2 records, evidence, checkpoints і сторонні staged/unstaged/untracked файли. У межах цього sprint plan не робити reset, clean, commit, push, deployment, доступ до secrets або запит до provider.

## Метод виконання

1. Перед авторизацією кожної задачі переглянути її literal oracle та точні allowed paths.
2. Виконувати один bounded slice за раз; expected/observed і limitations записувати лише після фактичної перевірки.
3. Node-тести використовують injected source/clock, без реального WebSocket і глобальної підміни годинника. Browser-тести встановлюють `page.clock` перед навігацією/timers, блокують зовнішні tile-запити й не використовують реальне очікування. Відповідь `/api/snapshot` підміняється fixture, якщо тест викликає API; єдиний виняток — R3-T06, який ставить route guard і перевіряє відсутність запитів.
4. Після кожного slice переглядати diff. Свіжа незалежна сесія перевіряє фінальний diff та outputs без права запису; disposition приймає людина.
5. Evidence, RUNBOOK handoff і checkpoint створювати лише після фактичної перевірки та за окремо визначеною межею дозволених шляхів.
