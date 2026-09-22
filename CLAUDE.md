# SeaRadar — правила роботи з проєктом

- **ID:** `GOV-SEA-001`
- **Version:** `1.3.0`
- **Status:** `Ready`
- **Product owner:** методист відділення теорії судноводіння навчального центру «Норд-Вест»
- **Delivery / technical owner:** виконавець проєкту
- **Date:** 2026-09-23
- **Related artifacts:** [`PROJECT_BRIEF.md`](PROJECT_BRIEF.md), [`SPEC.md`](SPEC.md), [`TASK_SPEC.md`](TASK_SPEC.md), [`docs/decisions/DEC-001-mvp-contract.md`](docs/decisions/DEC-001-mvp-contract.md), [`docs/decisions/DEC-002-r1-stack.md`](docs/decisions/DEC-002-r1-stack.md), [`docs/decisions/DEC-005-r1-node22.md`](docs/decisions/DEC-005-r1-node22.md), [`docs/decisions/DEC-006-r2-scope.md`](docs/decisions/DEC-006-r2-scope.md)

## 1. Статус baseline

Цей файл є стабільним operational contract для людей та AI-асистентів.

- **Product / MVP:** `Ready — approved PROJECT_BRIEF.md / SPEC.md baseline; changes require a version bump and decision record`
- **Stack / architecture:** `Ready for R1 only — current stack is recorded in DEC-005; architecture beyond R1 is Unknown`
- **Sprint 1 / R1:** `Verified — delivered baseline; historical limitations remain recorded`
- **Sprint 2 / R2:** `Ready — scope authorized by DEC-006; implementation remains task-gated, current task B-08`
- **Sprint 3:** `Waiting for MVP input — no plans or requirements are authorized`
- **Sprint dates:** `Unknown`
- **Current phase:** R2 governance authorized; B-08 implementation remains bounded and task-gated

Не вигадувати поведінку SeaRadar, користувачів, метрики, архітектуру поза авторизованим R2, тести, deployment, production readiness або user validation. Підтверджені зміни до brief, scope або stack оформлювати новою версією та пов'язаним decision record до реалізації.

## 2. Канонічні артефакти

| Артефакт | Канонічний шлях | Роль | Правило оновлення |
|---|---|---|---|
| Project contract | `SPEC.md` | Довгоживуча специфікація проблеми, користувача, outcome, scope і acceptance | Редагувати після узгодженого рішення про зміну контракту |
| Task contract | `TASK_SPEC.md` | Контракт однієї малої перевірюваної роботи | Оновлювати до початку роботи та при зміні scope |
| Evidence | `EVIDENCE.md` | Фактичний журнал перевірених результатів | Тільки append-only; не замінювати планом або narration |
| Delivery history | `RUNBOOK.md` | Операційна історія, рішення, blockers і handoff | Тільки append-only після фактичної перевірки |
| Sprint convention | `docs/sprints/README.md` | Формат майбутніх S1–S3 планів | Змінювати лише разом із governance-рішенням |
| Decision convention | `docs/decisions/README.md` | Формат stack/architecture/scope decision records | Додавати окремий record на кожне рішення |

Не створювати паралельні canonical names (`EVIDENCE_LOG.md`, `docs/SPEC.md`, дублікати templates) без окремого decision record. У цьому проєкті `EVIDENCE.md` є canonical evidence path.

## 3. Статуси та metadata

Кожен довгоживучий артефакт повинен мати: `ID`, `Version`, `Status`, `Owner`, `Date`, `Related artifacts`.

Використовувати такі статуси:

- `Draft` — створено, але не погоджено;
- `Ready` — контракт погоджено та можна виконувати;
- `Active` — робота триває;
- `Verified` — результат підтверджений свіжим evidence;
- `Superseded` — замінено новою версією.

Для значень усередині документів використовувати окремі маркери: `Confirmed`, `Assumption`, `Unknown`, `Needs verification`, `Blocked`, `Waiting for MVP input`.

Template, documented example, catalog entry або текст у плані не є доказом фізичного файлу, виконання команди чи якості результату.

## 4. Контрольований AI workflow

Перед кожною зміною:

1. Прочитати актуальний tree, пов'язані артефакти та affected paths.
2. Зафіксувати task ID, goal, allowed paths, expected diff і targeted check у `TASK_SPEC.md`.
3. Перевірити, що зміна підтримує scope `SPEC.md`.

Під час роботи:

- робити один bounded slice за ітерацію;
- не додавати unrelated cleanup, redesign або dependency без рішення;
- не змінювати файли поза allowed paths;
- явно маркувати assumptions та Unknowns;
- не читати й не записувати secrets/credentials без окремого дозволу;
- зупинятися, якщо scope розширився, contract неясний або немає oracle для перевірки.

Після зміни людина має перевірити diff і обрати `continue`, `revise` або `HOLD`. Не вважати відсутність помилки моделі evidence.

## 5. Acceptance, verification і rollback

Кожен task має містити:

- observable acceptance criteria;
- targeted commands або manual checks;
- expected та observed result;
- checkpoint після slice;
- stop conditions;
- rollback/recovery path.

Рішення sprint: `DONE`, `CONTINUE WITH APPROVAL` або `HOLD`. Для demo окремо розділяти blocking checks, advisory checks, evidence anchors і межу claims. Demo readiness не є deployment authorization.

Rollback має описувати, як повернутися до останнього підтвердженого стану, хто приймає рішення і яке evidence потрібне. Не виконувати production, publish, migration або destructive commands без окремої авторизації.

## 6. Правила артефактів

- `SPEC.md` — contract про проблему, primary user/JTBD, value proposition, success metric, core flow, scope, non-goals, release slice та acceptance. Не є task plan або evidence.
- `TASK_SPEC.md` — contract конкретної роботи: owner, input, output, constraints, verification, checkpoint, exit і rollback. До MVP це inactive template.
- `EVIDENCE.md` — лише спостережені факти: source, expected, observed, timestamp, status і limitations. Не називати documented example фактичним виконанням.
- `RUNBOOK.md` — історія delivery та handoff; не повний chat transcript, не специфікація і не заміна evidence.
- `docs/sprints/` — лише майбутні S1, S2, S3 після затвердження SPEC і stack. Кожен sprint має один observable outcome.
- `docs/decisions/` — окремі записи рішень із context, options, decision, rationale, consequences, owner і verification trigger.

## 7. Change control та звіт

Зміну scope, canonical path, статусу або decision оформити перед реалізацією та пов'язати через IDs. Не тихо переписувати історію. Evidence і RUNBOOK дописувати лише після перевірки.

Фінальний звіт кожної роботи має містити:

1. змінені файли;
2. фактичні команди та їх статус;
3. evidence links/IDs;
4. unresolved Unknowns та blockers;
5. rollback або recovery note;
6. handoff і наступний bounded action.

## 8. Порядок перевірки

Поки runtime і stack не обрані, використовувати structural/content checks для Markdown та Git. Після вибору stack порядок за замовчуванням:

```text
check → validate → build → targeted tests → demo gate
```

Не звітувати про команду, яку не запускали, і не підміняти `Unknown` правдоподібним результатом.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
