# SPRINT-02 - Реліз R2: знімок справжніх позицій

- **ID:** `SPRINT-SEA-R2-001`
- **Version:** `1.0.0`
- **Status:** `Ready`
- **Product owner:** методист відділення теорії судноводіння навчального центру «Норд-Вест»
- **Delivery / technical owner:** виконавець проєкту
- **Date:** 2026-09-23
- **Related artifacts:** [`PROJECT_BRIEF.md`](PROJECT_BRIEF.md), [`SPEC.md`](SPEC.md), [`TASK_SPEC.md`](TASK_SPEC.md), [`EVIDENCE.md`](EVIDENCE.md), [`RUNBOOK.md`](RUNBOOK.md), [`docs/decisions/DEC-006-r2-scope.md`](docs/decisions/DEC-006-r2-scope.md)

Другий тиждень, заняття 3 і 4. Закриває US-05…US-08 з `PROJECT_BRIEF.md`. Завдання першого тижня лишаються чинними.

---

## Лист замовника № 1

> Подивилися першу версію - карта й навчальні судна нас влаштовують. Оформили ключ доступу до AISStream, передаємо окремо, не поштою.
>
> Нагадуємо, що важливо для нас на цьому етапі. Кнопка одна. Поки триває збір - удруге натиснути не можна. Знімок короткий: кілька секунд, не більше сотні суден - нам не потрібна вся протока, нам потрібен приклад. Поруч із картою завжди написано, що ми бачимо: навчальні судна чи справжні, коли отримані, скільки, і що це не всі судна району. Якщо за час збору нічого не прийшло - так і написати, а не "суден немає". Якщо помилка - зрозуміла фраза про причину. Без ключа навчальна частина працює як раніше.
>
> Поки нам досить, щоб після натискання кнопки на карті з'являвся результат цієї спроби. Якщо спроба не вдалася - хай карта буде порожньою з поясненням; навчальні судна повернуться після оновлення сторінки, це нормально.
>
> Ключ не повинен опинитися у файлах, які ви нам передаєте, і на екрані.

---

## Частина A. Що робимо

### Узгоджені значення

- **Джерело:** AISStream, WebSocket, тільки з сервера застосунку (Route Handler, `runtime = 'nodejs'`). Підписка надсилається одразу після відкриття з'єднання: `{ APIKey, BoundingBoxes: [[[lat_sw, lon_sw], [lat_ne, lon_ne]]], FilterMessageTypes: ['PositionReport'] }`. Підтвердження підписки джерело не надсилає.
- **Ключ:** змінна `AISSTREAM_API_KEY`, читається тільки на сервері; `.env.example` з рядком `AISSTREAM_API_KEY=` закомічений; `.env.local` зі справжнім значенням у `.gitignore`. Значення не виводиться в термінал, логи, відповіді та клієнтський код і не вводиться в чат з агентом.
- **Формат повідомлення:** за документацією `PositionReport` містить `MetaData` (`MMSI`, `ShipName`, `latitude`, `longitude`, `time_utc` рядком вигляду `2024-01-01 12:00:00.123456789 +0000 UTC`) і `Message.PositionReport` (`Sog`, `Cog`, `TrueHeading`, координати). Джерела полів: `id` ← `MetaData.MMSI`; `name` ← `MetaData.ShipName` (пробіли по краях обрізаються, порожнє → `null`); `timestamp` ← `MetaData.time_utc` в ISO з мілісекундами; `lat`, `lon` ← `Message.PositionReport.Latitude/Longitude`; `speedKnots` ← `Sog`; `courseDeg` ← `Cog`. Регістр і точний набір полів підтверджуються збереженим зразком; перетворювач пишеться за зразком.
- **Зразок:** `data/samples/position-report.sample.json` у вихідній структурі плюс `data/samples/PROVENANCE.md` (час отримання UTC, район, факт живого отримання, відмінності від документації). Якщо умови AISStream не дозволяють зберігати справжнє повідомлення - приклад з документації або синтетичний приклад за схемою з позначкою "не отриманий із живого джерела".
- **Валідація позиції:** `lat` в [-90, 90], `lon` в [-180, 180]; 91/181 ("недоступно"), значення поза діапазоном і нечислові - позиція відкидається; час має парситися; MMSI непорожній. Швидкість 102.3, поза [0, 102.2], відсутня або нечислова → `null`; курс 360, поза [0, 360), відсутній або нечисловий → `null`; позиція при цьому приймається. Невалідна позиція не створює судно з координатами 0,0.
- **Збір:** строк 15 секунд від початку серверної обробки, включно зі з'єднанням і надсиланням підписки; до 100 унікальних суден з валідною позицією, при досягненні - негайне завершення; одна позиція на `id` - найновіша за `time_utc` (порівняння з точністю до мілісекунди), нове повідомлення замінює об'єкт судна цілком, при рівних мітках лишається прийнята першою; помилка провайдера, розрив або скасування не повертають частковий набір; результат завершується один раз, пізні події його не змінюють; в усіх результатах закриваються з'єднання й таймери; `collectedAt` і `attemptedAt` - за переданим годинником. Джерело подій і годинник - параметри збирача, щоб тести подавали повідомлення й рухали час без мережі. Константи 15 і 100 - у конфігурації.
- **Endpoint `GET /api/snapshot`.** Успіх - HTTP 200: `{ ok: true, vessels, collectedAt, windowSeconds, count, truncated, reason: 'window_elapsed' | 'limit_reached' }`; порожній успіх - те саме з `vessels: []`, `count: 0`. Помилка - HTTP 502: `{ ok: false, attemptedAt, error: { code, message } }`. Коди й фіксовані `message`: `no_api_key` - "Ключ AISStream не налаштовано"; `connect_failed` - "Не вдалося підключитися до джерела" (помилка сокета до відкриття - негайно; кінець строку без відкриття або без надісланої підписки); `provider_error` - "Джерело повернуло помилку"; `disconnected` - "З'єднання з джерелом розірвано" (закриття після підписки до штатного завершення); `internal` - "Внутрішня помилка сервера". Сирий текст помилки в `message` не потрапляє. Час спроби інтерфейс бере тільки з відповіді. Проміжна форма відповіді до збирача (B-09): HTTP 200 `{ ok: true, raw: <повідомлення або null>, collectedAt }`.
- **Стани інтерфейсу - результат останньої спроби:**
  - *idle-demo* - демонстрація, підпис "Демонстраційні дані";
  - *loading* - демотаймер зупинений, судна, вибір і картка прибрані, підпис "Завантаження…", кнопка заблокована, базова карта лишається;
  - *success* - набір на карті, підпис "AISStream · знімок за 15 с · отримано HH:MM:SS UTC · суден: N · вибірка неповна" (при `truncated` в кінець додається " · зупинено на ліміті 100"; "15" - константа вікна, не фактична тривалість); при першому непорожньому успіху карта повертається до початкового виду, далі вид не чіпається;
  - *empty* - той самий підпис із "суден: 0" і повідомлення "За час збору позицій не отримано";
  - *error* - підпис "Даних на карті немає" і повідомлення "Не вдалося отримати дані: <message>".
- **Тексти:** кнопка "Завантажити справжні позиції"; часи - `HH:MM:SS UTC`. Тексти - частина контракту для майбутніх тестів.
- Справжні судна між завантаженнями не рухаються. Значки й картка - ті самі, що для демонстрації.

### Завдання

**B-08. Конфігурація ключа.** `.env.example`, `.gitignore`, серверний модуль читання змінної. Критерій: `.env.local` не в `git ls-files`; модуль повертає "ключ відсутній" без винятку; після B-09 без ключа endpoint відповідає `no_api_key`.

**B-09. Reader (серверний модуль, який відкриває з'єднання з AISStream і читає повідомлення) та endpoint.** `GET /api/snapshot`: відкриття WebSocket, підписка одразу після відкриття, перше отримане повідомлення як є у проміжній формі (`raw: null` - за строк при живому з'єднанні повідомлень не було); строк 15 с; помилки за форматом; ресурси закриваються при завершенні, помилці та скасуванні. Критерій: живий запит повертає повідомлення, `raw: null` або помилку за форматом; ключ не в логах і відповіді.

**B-10. Зразок і провенанс.** Файли в `data/samples/`. Критерій: у провенансі вказаний факт живого отримання або його відсутність.

**B-11. Перетворювач.** `PositionReport` → судно за правилами валідації, за зразком. Критерій: три поля звірені зі зразком вручну; невалідна позиція не створює судно.

**B-12. Збирач.** Правила збору й відповідь endpoint. Критерій: живий запит повертає набір з метаданими; повторний запит не нашаровується на попередній.

**B-13. Інтерфейс R2.** Кнопка, стани й тексти вище; значки й картка перевикористовуються. Критерій: один MMSI з відповіді зіставлений зі значком і карткою; без ключа - "Не вдалося отримати дані: Ключ AISStream не налаштовано"; тести B-07 зелені.

### Результат тижня

**Після заняття 3:** B-08…B-10 - сервер отримує одне справжнє повідомлення, зразок з провенансом збережений, ключ налаштований безпечно, демонстрація працює; checkpoint 03.

**Після заняття 4:** B-11…B-13 - кнопка завантажує знімок за правилами, справжні судна й картки на карті, підписи та повідомлення; checkpoint 04.

Автоматична release-level перевірка всіх правил збору як окремий test suite - завдання релізу R3. У R2 bounded B-12 може мати focused deterministic checks із fake event source і controlled clock для локальної поведінки; checkpoint окремо фіксує фактично виконані автоматичні та ручні перевірки, не підміняючи ними повну release-level acceptance.

### Приклади очікуваної поведінки

- Два однакові повідомлення про судно A → на карті одне судно A.
- A з `time_utc` 12:01 і позицією P2, потім A з 12:00 і P1 → на карті A в P2.
- Швидкість 0 → "0 kn"; швидкість 102.3 → "Немає даних".
- 100 повідомлень про одне судно → одне судно; збір триває до кінця вікна.
- Обрив з'єднання після трьох позицій → помилка, на карті суден немає.
- Натискання під час демонстрації → демонстрація зупинена, до результату на карті суден немає.

---

## Частина B. Як робимо з Claude Code

Тут "ми" - той, хто веде агента: на занятті це ментор, при повторенні у своїй копії - ви.

### Метод тижня

З'являється зовнішній сервіс і секрет. Три місця - браузер, сервер застосунку, зовнішнє джерело - і агент має розуміти, що де виконується. Складність зростає: перш ніж міняти код, потрібно дослідити документацію та реально отримані дані; правила збору - контракт з кількома результатами, і кожен результат перевіряється окремо.

### Порядок роботи

**Дослідження до правок (заняття 3).** Агент звіряє checkpoint 02 з кодом, читає це завдання й документацію AISStream та пропонує reader з тестовою межею (підставні повідомлення й керований час) - без реалізації. Перевіряємо, що агент не вигадав формат повідомлення: він має посилатися на документацію й чекати на зразок.

**Секрет до коду (B-08).** Порядок обов'язковий: спочатку `.env.example`, `.gitignore` і правила Claude Code в `.claude/settings.json`, які забороняють агенту читати файли з секретами - deny на `Read(./.env)`, `Read(./.env.local)`, `Read(./.env.*.local)` (одним глобом з винятком `.env.example` deny не виражається; точний синтаксис - за встановленою версією CLI). Потім перевірка на фіктивному файлі: просимо агента прочитати `.env.local` і `.env.example` - відмова на першому, успіх на другому. Тільки потім справжній ключ - він не вводиться в чат з агентом і не показується в терміналі. `CLAUDE.md` і `.gitignore` захистом не вважаються.

**Reader (B-09).** Один запит з повним контрактом: строк, підписка одразу після відкриття, проміжна форма відповіді, коди й тексти помилок, закриття ресурсів при всіх результатах, ключ тільки на сервері, заборона на збирач та інтерфейс; критерій - запит без ключа дає `no_api_key`. Пастки: підписка надіслана не одразу - сервіс закриває з'єднання; Route Handler на Edge runtime замість Node; `time_utc` з наносекундами не парситься напряму.

**Зразок (B-10).** Живий запит виконується тільки після того, як людина прочитала серверний код, який читає ключ; сам запит може зробити агент. Провенанс пишеться одразу. Три різні факти, які агент має розділяти у звіті: з'єднання відкрилося; повідомлення отримано; локальний код перевірено.

**Перетворювач (B-11).** Пишеться за зразком, а не за документацією. Вимагаємо звірки трьох полів вручну з файлом зразка.

**Збирач (B-12).** Найдорожчий запит тижня. Перелічуємо в ньому всі результати: вікно минуло при живому з'єднанні, ліміт, з'єднання не відкрилося, помилка провайдера після частини повідомлень, скасування. Вимагаємо завершення результату рівно один раз. Пастки: проміс резолвиться двічі; таймер вікна не очищається після ліміту; у разі помилки повертаються "вже зібрані" позиції.

**Інтерфейс (B-13).** Тексти й стани - літералами з частини A. Агент може "дбайливо" зберегти попередній набір у разі помилки - це суперечить стану *error* з частини A (суден немає), повертаємо на доопрацювання. Перевірка руками у браузері: один MMSI з живої відповіді - значок - картка; без ключа (перейменувати `.env.local`, перезапустити) - повідомлення про відсутність ключа.

**Review.** Окремо перевіряємо: ключ не в клієнтському бандлі і не у відповіді; підпис називає вибірку неповною; зникнення судна з нового набору не трактується як вихід з району.

### Приклади запитів

- "Звір docs/checkpoints/CHECKPOINT-02.md з кодом. Прочитай docs/tasks/SPRINT-02.md і документацію AISStream. Запропонуй мінімальний серверний reader з можливістю подати тестові повідомлення й керований час. Карту не змінюй, нічого не реалізуй."
- "Додай .env.example з рядком AISSTREAM_API_KEY= без значення, .env.local у .gitignore, у .claude/settings.json - deny на Read(./.env), Read(./.env.local), Read(./.env.*.local). Я створю фіктивний .env.local - спробуй прочитати його і .env.example, покажи відмову й успіх."
- "Розгорни reader у збирач за правилами SPRINT-02: строк 15 с включно зі з'єднанням і підпискою, до 100 унікальних суден, остання за time_utc позиція на id, при рівному часі - перша прийнята. Частковий набір після помилки не повертай як успіх. Результат завершується один раз. Джерело подій і годинник - параметри. Формат відповіді - із завдання."
- "Покажи diff з фокусом на зміні джерела й перевикористанні відображення. Перевір, що ключ не потрапляє в клієнтський код і відповідь. Код не змінюй."

### Що ви маєте зрозуміти до кінця тижня

- Чому ключ живе на сервері і що було б при підключенні з браузера.
- Чим правило permissions відрізняється від рядка в `CLAUDE.md`.
- Чому "одна позиція на id" порівнює час повідомлення, а не порядок приходу.
- Чим порожній успіх відрізняється від помилки і чому інтерфейс говорить про них різними словами.
- Що таке "неповна вибірка" мовою користувача.

### Nice to have між заняттями

- Зареєструвати свій ключ AISStream (безкоштовно) і повторити шлях "кнопка → знімок" у своїй копії.
- Порівняти збережений зразок із прикладом з документації й виписати відмінності.
- Попросити свіжу сесію Claude Code перевірити diff checkpoint 04 на витік секрету в клієнтський код.

---

## Частина C. Bounded decomposition R2

Ця частина деталізує B-08…B-13 за аналогією з Part C у `SPRINT-01.md`. Це план роботи, а не evidence: запланований check не вважається виконаним до фактичного запуску та запису спостереженого результату в `EVIDENCE.md`. Кожна задача має окремий task contract, human diff review і явне рішення `continue`, `revise` або `HOLD`.

### `R2-B08-SECURE-CONFIG` — безпечна конфігурація ключа

- **B-08:** `.env.example`, ignore-boundary, project permission rules і server-only accessor для `AISSTREAM_API_KEY`.
- **Goal:** підготувати безпечне локальне зберігання ключа без читання або передачі реального значення.
- **Non-goals:** WebSocket, Route Handler, live AISStream-запит, reader, sample, transformer, collector і UI.
- **Check:** `git ls-files` для local env paths; permission matrix; accessor assertions для missing/blank input; direct TypeScript check; `npx tsc --noEmit`; `npm run build`; `git diff --check`; перевірка відсутності ключа у diff.
- **Evidence:** `E-SEA-031`, `E-SEA-032`, `E-SEA-033`; commits `b5ef3fb` і `2ae10a1`.
- **Acceptance:** `.env.local` не tracked; accessor повертає `null` для missing/blank; значення не потрапляє в логи, response або client bundle; B-09 може безпечно відрізнити відсутній ключ.
- **Dependency boundary:** R2 scope authorization і затверджений server-only configuration boundary; внутрішньої implementation-залежності від B-09…B-13 немає.
- **Handoff:** передати server-only accessor і permission boundary; наступна — `R2-B09-AISSTREAM-READER`.
- **Status:** `Verified / DONE`.

### `R2-B09-AISSTREAM-READER` — reader та проміжний endpoint

- **B-09:** Node.js WebSocket reader і `GET /api/snapshot` з intermediate raw response.
- **Goal:** відкрити AISStream, одразу надіслати підписку й повернути перше text-повідомлення або `raw: null` без трансформації в судна.
- **Non-goals:** sample/provenance, PositionReport transformer, dedupe, collector, 100-vessel limit, final vessel response, UI та continuous stream.
- **Check:** direct server type-check; `npx tsc --noEmit`; `npm run build`; `npm ls --depth=0`; deterministic Playwright tests для exact subscription, 15-second total window, raw/null, fixed errors, cancellation і cleanup; no-key loopback check; `git diff --check`.
- **Evidence:** `E-SEA-034` — local implementation checks; `E-SEA-035` — final human diff review; commit `a5ab905`.
- **Acceptance:** Node.js route використовує documented endpoint, fixed bounds і `FilterMessageTypes: ['PositionReport']`; key не повертається; resources cleanup exactly once; live provider availability залишається окремим `Unknown`.
- **Dependency boundary:** залежить від verified `R2-B08-SECURE-CONFIG`; не включає B-10 sample capture, B-11 transformer або B-12 collector.
- **Handoff:** передати intermediate response і lifecycle boundary; наступна — `R2-B10-SAMPLE-PROVENANCE`.
- **Status:** `Verified / DONE` для bounded local slice; live connection/message receipt — `Unknown`.

### `R2-B10-SAMPLE-PROVENANCE` — sample і provenance

- **B-10:** `data/samples/position-report.sample.json` і `data/samples/PROVENANCE.md` у погодженій структурі.
- **Goal:** зафіксувати один перевірюваний PositionReport sample та чесно описати його походження.
- **Non-goals:** transformer, validation runtime, collector, final endpoint response, UI та редагування B-09 reader.
- **Check:** schema/content inspection; звірка з документацією AISStream; перевірка provenance щодо UTC часу, району, факту live отримання та відмінностей; secret scan; `git diff --check`.
- **Evidence:** фактичний sample diff, provenance inspection і окремий `E-*` запис після перевірки; live capture або його відсутність має бути явно позначено.
- **Acceptance:** sample явно зберігає погоджену PositionReport-структуру з `MetaData.MMSI`, `MetaData.ShipName`, `MetaData.latitude`, `MetaData.longitude`, `MetaData.time_utc` і `Message.PositionReport` полями, потрібними для transformer (`Sog`, `Cog`, `TrueHeading`, `Latitude`, `Longitude`), або provenance пояснює відсутність необов'язкового поля; provenance розрізняє live, documentation-derived і synthetic data; реальний ключ не збережений у sample або provenance.
- **Dependency boundary:** використовує B-09 raw-message boundary як джерело для можливого live capture; documentation-derived або synthetic sample дозволений, якщо live capture не авторизований чи недоступний.
- **Handoff:** передати canonical sample і provenance limitations; наступна — `R2-B11-POSITION-TRANSFORMER`.
- **Status:** `Gated / not implemented`; окремий task contract і human `continue` потрібні.

### `R2-B11-POSITION-TRANSFORMER` — перетворювач PositionReport

- **B-11:** перетворити один PositionReport у спільну структуру судна за правилами `SPRINT-02.md` і sample.
- **Goal:** отримати детермінований transformer з коректними `id`, `name`, координатами, timestamp, speed, course і source.
- **Non-goals:** WebSocket, live access, collection window, dedupe, 100-vessel limit, endpoint orchestration та UI.
- **Check:** deterministic fixture tests або equivalent checks для valid/invalid coordinates, MMSI, timestamp, name, speed, course, `null` і заборони fallback у `0,0`; ручна звірка щонайменше трьох полів із sample.
- **Evidence:** test output, fixture/source diff і manual comparison; новий `E-*` запис після фактичної перевірки.
- **Acceptance:** valid position створює одну узгоджену vessel structure; invalid position не створює судно; невідомі speed/course стають `null`; перетворювач не змінює raw sample.
- **Dependency boundary:** залежить від canonical sample і provenance з verified `R2-B10-SAMPLE-PROVENANCE`; не відкриває WebSocket і не змінює B-09 transport boundary.
- **Handoff:** передати transformer contract і validation results; наступна — `R2-B12-SNAPSHOT-COLLECTOR`.
- **Status:** `Gated / not implemented`; path і task contract мають бути зафіксовані до implementation.

### `R2-B12-SNAPSHOT-COLLECTOR` — bounded snapshot collector

- **B-12:** зібрати повідомлення за 15 секунд, до 100 унікальних суден, з latest-by-`time_utc` правилами та без partial success.
- **Goal:** перетворити потік reader events у завершений snapshot response за всіма правилами збору.
- **Non-goals:** зміна reader transport contract, sample capture, UI button/state, continuous updates, persistence та history.
- **Check:** deterministic fake event source і controlled clock для window elapsed, limit reached, duplicate MMSI, older/equal timestamps, provider error after partial input, disconnect, cancellation і exactly-once completion; response shape inspection.
- **Evidence:** повний test output, collector diff і окремий `E-*` запис; live availability не підміняється локальним test evidence.
- **Acceptance:** endpoint повертає повний response contract із `vessels`, `collectedAt`, `windowSeconds`, `count`, `truncated` і `reason` зі значенням `window_elapsed` або `limit_reached`; помилка після часткових events не повертає partial success; timer/socket cleanup не дублюється.
- **Dependency boundary:** залежить від verified `R2-B09-AISSTREAM-READER` transport lifecycle і `R2-B11-POSITION-TRANSFORMER`; не змінює raw reader contract.
- **Handoff:** передати final server response contract і error/empty behavior; наступна — `R2-B13-INTERFACE`.
- **Status:** `Gated / not implemented`; залежить від verified B-11 transformer.

### `R2-B13-INTERFACE` — інтерфейс R2

- **B-13:** кнопка, loading/success/empty/error states, підписи, повторне використання значків і картки.
- **Goal:** дати викладачу один зрозумілий шлях від демонстраційних суден до результату останньої snapshot attempt.
- **Non-goals:** нові джерела даних, client-side key handling, continuous stream, search, filters, history, map redesign та зміна B-07 behavior.
- **Check:** deterministic route fixtures або mocked endpoint для idle/loading/success/empty/error; button lock during loading; fixed Ukrainian texts; no-key path; browser regression для B-07; manual check з обмеженнями network.
- **Evidence:** Playwright/manual output, screenshot або checklist із network limitations і окремий `E-*` запис після фактичного проходження.
- **Acceptance:** під час loading демо-стан прибраний за контрактом; success/empty/error показують результат останньої спроби; один MMSI може бути зіставлений із marker/card; ключ відсутній у client bundle та response.
- **Dependency boundary:** залежить від verified `R2-B12-SNAPSHOT-COLLECTOR` response contract і збережених B-07 marker/card behavior; не додає нове джерело даних або client-side key handling.
- **Handoff:** передати R2 UI limitations і результат US-05…US-08 review; наступний крок — human review R2 closure, не автоматичний Sprint 3.
- **Status:** `Gated / not implemented`; залежить від verified B-12 response contract.

### Sprint 2 decomposition boundary

- B-08 і B-09 мають локальне verified evidence, але це не є повним live R2 acceptance.
- B-10…B-13 залишаються окремо task-gated; їхні checks та evidence вище є планом до виконання.
- Жоден planned live check не означає, що AISStream availability, real-key validity або повнота трафіку вже підтверджені.
- До кожної наступної implementation сесії потрібно оновити `TASK_SPEC.md`, перевірити allowed paths і отримати human `continue`.
