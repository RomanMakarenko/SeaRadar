# NEXT_SESSION.md — DIAG-006 handoff and review checkpoint

- **ID:** `HANDOFF-SEA-R2-DIAG-006`
- **Version:** `1.0.0`
- **Status:** `Ready`
- **Owner:** виконавець проєкту
- **Date:** 2026-09-25
- **Related artifacts:** [`CLAUDE.md`](CLAUDE.md), [`SPEC.md`](SPEC.md), [`TASK_SPEC.md`](TASK_SPEC.md), [`EVIDENCE.md`](EVIDENCE.md), [`RUNBOOK.md`](RUNBOOK.md), [`docs/checkpoints/CHECKPOINT-16.md`](docs/checkpoints/CHECKPOINT-16.md), [`docs/decisions/DEC-004-checkpoint-convention.md`](docs/decisions/DEC-004-checkpoint-convention.md), `TASK-SEA-R2-B09B10-DIAG-006`, `TASK-SEA-R2-HANDOFF-002`, `E-SEA-066`

> **Restart from CHECKPOINT-16.** DIAG-006 completed one approved dynamic import of `@next/env`: `hasNamedLoadEnvConfig=false`, `defaultType="object"`, `defaultLoadEnvConfigProperty="accessor"`. The accessor descriptor was inspected without evaluating its getter or calling a package function. This is export-shape evidence only; the getter result and DIAG-001 loader failure cause remain unknown. `EVIDENCE.md` is factual evidence, and `RUNBOOK.md` is append-only operational history. No further diagnostic, provider request, commit, push, or deployment is authorized by this handoff.

## Поточний стан

- **Canonical restart record:** [`docs/checkpoints/CHECKPOINT-16.md`](docs/checkpoints/CHECKPOINT-16.md), under DEC-004. See [`E-SEA-066`](EVIDENCE.md#e-sea-066--diag-006-default-export-shape-inspected) for the observed result and limitations and the latest DIAG-006 entry in [`RUNBOOK.md`](RUNBOOK.md).
- **Verified bounded result:** branch `sprint2`; at the recorded DIAG-006 checkpoint, `HEAD` was `2147d93` (`fix(r2): decode websocket binary frames`) and matched local `origin/sprint2`. A single dynamic import succeeded. The imported namespace had no callable named `loadEnvConfig`; the default was an object with an own `loadEnvConfig` accessor descriptor. The getter was not evaluated. Recheck the worktree and refs before any action; this handoff did not query the remote.
- **Unresolved:** the accessor's returned value and the cause of DIAG-001's earlier loader failure remain unknown. DIAG-006 did not call the loader/key accessor, inspect `process.env`, or access any provider/network API.
- **Sprint status:** checkpoint 03 remains **HOLD / not passed**. No eligible server-received AISStream `PositionReport` and no matching live sample/provenance were established. The existing B-10 sample is synthetic; the user-supplied screenshot is not independent verification of live UI/API behavior. Do not infer R2 acceptance or release readiness.
- **Governance mismatch:** `CLAUDE.md` and `SPEC.md` still identify B-08 as the current task, while later task/evidence/checkpoint records document subsequent bounded R2 work. This handoff does not silently change either baseline; correction needs separate approved change control. Use current task-specific contracts and checkpoint records for restart facts, and surface the mismatch for human review.
- **Git preservation boundary:** the recorded pre-handoff state had modified `EVIDENCE.md`, `RUNBOOK.md`, and `TASK_SPEC.md`; deleted `START.md`; staged `sprint-2.png`; and untracked `.agents/`, `.claude/skills/`, `README.pdf`, checkpoint files 08–16, `reference/`, and `skills-lock.json`. Preserve all paths and recheck status before action; do not stage, reset, clean, or remove them.

## Наступний bounded крок

First perform a read-only Git boundary/ref check, then review this handoff and the complete current diff. Human reviewer should choose `continue`, `revise`, or `HOLD`. Do not start another diagnostic or provider request under this handoff. Any follow-up needs its own bounded task contract and explicit user authorization.

## Актуальний prompt для наступної сесії

```text
Продовжуй SeaRadar з canonical restart record `docs/checkpoints/CHECKPOINT-16.md`. Почни тільки з read-only перевірки `git status --short --branch`, `git diff --name-only`, `git diff --cached --name-only`, `git rev-parse HEAD` і `git rev-parse origin/sprint2`; збережи всі staged, modified, deleted та untracked paths і не роби stage/reset/clean/remove.

Прочитай `CLAUDE.md`, `SPEC.md`, поточні task записи в `TASK_SPEC.md`, E-SEA-066 у `EVIDENCE.md`, останній DIAG-006 запис у `RUNBOOK.md`, CHECKPOINT-16 і цей handoff. Переглянь повний diff, звір exact path boundary та фактичні claims, після чого зупинись для людського рішення `continue`, `revise` або `HOLD`.

DIAG-006 спостерігав: одна dynamic import успішна; `hasNamedLoadEnvConfig=false`; `defaultType=object`; `defaultLoadEnvConfigProperty=accessor`; getter і package functions не викликались. Результат getter та причина DIAG-001 loader failure невідомі. Sprint checkpoint 03 залишається HOLD/not passed: eligible live AISStream PositionReport і відповідні live sample/provenance відсутні. Governance-файли CLAUDE.md та SPEC.md іще називають B-08 current task; не виправляй їх у цьому handoff.

Не читай/друкуй `.env*` чи ключі, не оцінюй accessor, не викликай loader/key accessor, не перевіряй `process.env`, не роби AISStream/provider/network request і не створюй sample/provenance. Не запускай build/tests. Не роби commit/push/deploy. Подальша діагностика потребує нового bounded contract і окремої явної авторизації. Після review повідом changed files, реально виконані checks, unresolved Unknowns, preservation/recovery state і наступну дію.
```

## Handoff boundary

This document directs restart and human review only. CHECKPOINT-16 remains the canonical checkpoint; it is a summary, not evidence. Sprint checkpoint 03 stays `HOLD`. No accessor evaluation, loader diagnosis, live-provider access, build/test, commit, push, or deployment is authorized here.

## Історичний R1 handoff

Нижче збережено попередній R1 prompt без змін для відновлення історичного контексту.

---

# NEXT_SESSION.md — R1 handoff archive

- **ID:** `HANDOFF-SEA-R1-B07-001`
- **Version:** `1.0.0`
- **Status:** `Ready`
- **Owner:** виконавець проєкту
- **Date:** 2026-09-22
- **Related artifacts:** [`CLAUDE.md`](CLAUDE.md), [`SPEC.md`](SPEC.md), [`SPRINT-01.md`](SPRINT-01.md), [`TASK_SPEC.md`](TASK_SPEC.md), [`EVIDENCE.md`](EVIDENCE.md), [`RUNBOOK.md`](RUNBOOK.md), [`f215aae`](https://github.com/RomanMakarenko/SeaRadar/commit/f215aae)

```text
Продовж імплементацію SeaRadar з поточного стану гілки sprint1 після commit f215aae
(feat(r1): add demo vessel motion).

B-06 diff уже переглянуто, рішення: continue.
Commit f215aae запушений у origin/sprint1.

Перед змінами:

1. Прочитай CLAUDE.md, SPEC.md, SPRINT-01.md і TASK_SPEC.md.
2. Прочитай останні записи EVIDENCE.md, зокрема E-SEA-014 та E-SEA-015.
3. Прочитай останні два handoff-записи в RUNBOOK.md.
4. Перевір git status, git log -2 --oneline --decorate і git show --stat f215aae.
5. Не видаляй і не скидай pre-existing untracked paths:
   .agents/, .claude/, reference/, TASK_INITIAL.md,
   TASK_DECOMPOSE.md, skills-lock.json.
6. Створи або онови TASK_SPEC.md для наступного bounded slice:
   R1-B07-PLAYWRIGHT-SELECTION.
   Зроби це до редагування product/test code.

Після підготовки TASK_SPEC.md реалізуй тільки B-07 згідно зі SPRINT-01.md:

- Playwright Test як єдиний test runner;
- один browser project;
- dev-server запускається з конфігурації;
- тест перевіряє наявність трьох елементів із data-vessel-id;
- клік по кожному demo-судну відкриває картку з відповідним id;
- повторний клік не закриває картку;
- запити до OSM tile requests заблоковані;
- не додавати тести руху з controlled time;
- не додавати visual regression;
- не додавати AIS, API, search, pause, rewind, loop або іншу нову поведінку;
- не додавати зайві залежності;
- не змінювати B-06 product behavior;
- не змінювати файли поза новим TASK_SPEC.md та явно дозволеними B-07 paths.

Після реалізації виконай у порядку:

check → validate → build → targeted tests → demo gate

Зокрема фактично запусти та зафіксуй:

- git diff --check;
- npx tsc --noEmit;
- npm run build;
- npm ls --depth=0;
- targeted Playwright test command;
- перевірку, що tile requests блокуються;
- browser/manual checks лише якщо browser runtime доступний.

Не називай browser/manual acceptance виконаною без фактичного браузера.
Не називай планові перевірки evidence до їх запуску.

Після перевірок:

- додай лише фактичний B-07 evidence до EVIDENCE.md;
- додай лише фактичний B-07 handoff до RUNBOOK.md;
- онови TASK_SPEC.md observed status, limitations, rollback і next session;
- покажи changed files, команди та статуси;
- окремо вкажи Unknowns і blockers;
- підготуй human diff review;
- фінальний статус обери з:
  DONE, CONTINUE WITH APPROVAL або HOLD.

Не роби commit або push без окремого підтвердження.
```

## B-06 baseline and limitations — historical

- **Delivered commit:** `f215aae` — `feat(r1): add demo vessel motion`.
- **Remote:** `origin/sprint1` синхронізований із `f215aae`.
- **Evidence:** `E-SEA-014` — B-06 implementation checks; `E-SEA-015` — human `continue`, commit і push.
- **B-06 status:** `CONTINUE WITH APPROVAL`; наступний bounded slice — `R1-B07-PLAYWRIGHT-SELECTION`.
- **Known limitations:** browser/manual motion, selected-card, final-stop, hot-reload і unmount checks залишаються `UNKNOWN`/`BLOCKED`; Node.js 24 compatibility — `Needs verification`.
- **Pre-existing untracked paths:** `.agents/`, `.claude/`, `reference/`, `TASK_INITIAL.md`, `TASK_DECOMPOSE.md`, `skills-lock.json`; не видаляти та не додавати до B-07 commit.
