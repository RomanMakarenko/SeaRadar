# NEXT_SESSION.md — FIX-001 implementation handoff

- **ID:** `HANDOFF-SEA-R2-FIX-001`
- **Version:** `1.0.0`
- **Status:** `Ready`
- **Owner:** виконавець проєкту
- **Date:** 2026-09-25
- **Related artifacts:** [`CLAUDE.md`](CLAUDE.md), [`SPEC.md`](SPEC.md), [`SPRINT-02.md`](SPRINT-02.md), [`TASK_SPEC.md`](TASK_SPEC.md), [`EVIDENCE.md`](EVIDENCE.md), [`RUNBOOK.md`](RUNBOOK.md), [`docs/checkpoints/CHECKPOINT-07.md`](docs/checkpoints/CHECKPOINT-07.md), [`docs/decisions/DEC-004-checkpoint-convention.md`](docs/decisions/DEC-004-checkpoint-convention.md), `TASK-SEA-R2-B09B10-FIX-001`, `E-SEA-056`, `E-SEA-057`

> FIX-001 has a local WebSocket binary-frame compatibility change and passing deterministic checks. The user reported “стій, запрацювало”; this is not independently verified live-provider evidence. This handoff replaces the obsolete B-13 contract-preparation prompt while preserving the historical R1 archive. `RUNBOOK.md` is the operational history; `EVIDENCE.md` records facts and their limitations. No live retry, commit, push or deployment is authorized here.

## Поточний стан

- **Verified baseline:** branch `sprint2`; current `HEAD` and local `origin/sprint2` both resolve to `4c8dea20b0ce471fbb1d126784ed665dd77aaf64` (`docs(r2): record B-13 interface delivery`). Recheck refs/status before any future delivery; the remote was not queried in this handoff task.
- **FIX-001 status:** `server/aisstream-reader.ts` configures `binaryType = "arraybuffer"` and strictly decodes UTF-8 `ArrayBuffer` frames. The recorded focused Playwright command passed 33 tests; recorded TypeScript, build and scoped whitespace checks passed. See `E-SEA-056`; these are local checks, not proof of live AISStream behavior. Final human diff review remains pending.
- **User report:** “стій, запрацювало” is preserved in `E-SEA-057` as a user-reported observation only. The assistant did not independently observe a post-fix live result or receive a raw frame/sample.
- **Current local Git state:** nothing was staged by this handoff work. `sprint-2.png` was already staged. `EVIDENCE.md`, `RUNBOOK.md`, `TASK_SPEC.md`, reader and two test files were modified; `START.md` was already deleted; `NEXT_SESSION.md` and checkpoint files 03–06 were already untracked. Other existing untracked paths include `.agents/`, `.claude/skills/`, `README.pdf`, `reference/`, and `skills-lock.json`. Preserve all of them; do not stage/clean/overwrite broadly.
- **Build boundary:** the successful build output reported `.env.local` as an environment source. No value was printed, but do not claim the file or its contents were not loaded by the build environment. Do not inspect `.env.local` or real key contents.
- **Open Unknowns:** provider acceptance, key validity, live AISStream receipt, LIVE-003 frame contents, live UI/API end-to-end behavior, full R2 acceptance, and release readiness remain `Unknown` / `Needs verification`. Sprint checkpoint 03 remains **HOLD / not passed**; no sample/provenance was created.

## Наступний bounded крок

Review the full current diff and this handoff; then choose `continue`, `revise` or `HOLD` for the local FIX-001 implementation and documentation. Keep Sprint checkpoint 03 at `HOLD`. Do not make a live-provider request, inspect `.env.local`/the real key, create a sample, stage, commit, push or deploy without separate explicit authorization.

## Актуальний prompt для наступної сесії

```text
Продовжуй SeaRadar із поточного стану. Почни з read-only перевірки `git status --short --branch`, `git diff --name-only`, `git diff --cached --name-only`, `git rev-parse HEAD` і `git rev-parse origin/sprint2`; не припускай, що refs лишилися без змін.

Прочитай `CLAUDE.md`, `SPEC.md`, `TASK_SPEC.md` розділ `TASK-SEA-R2-B09B10-FIX-001`, `EVIDENCE.md` записи E-SEA-055—057, `RUNBOOK.md` останні записи та `docs/checkpoints/CHECKPOINT-07.md`. Переглянь повний diff і перевір exact path boundary перед рішенням `continue`, `revise` або `HOLD`.

Факти: reader задає native WebSocket `binaryType = "arraybuffer"`, рядки передає незмінно, а `ArrayBuffer` декодує strict UTF-8; invalid UTF-8/unsupported types -> `provider_error`. Записано 33 focused Playwright tests, TypeScript, build і scoped `git diff --check` як PASS. Build output повідомив `.env.local` як environment source; не стверджуй, що він не завантажив її. Користувач сказав “стій, запрацювало”, але це лише user-reported observation; асистент не виконував post-fix live attempt. Sprint checkpoint 03 залишається HOLD; live receipt/sample/provenance не підтверджені.

Не читай/друкуй/копіюй `.env.local` або реальний ключ. Не роби live AISStream-запит, sample capture, commit, push, deploy, reset чи clean без окремої явної авторизації. Не stage широкі шляхи: `sprint-2.png` уже staged; `START.md` уже deleted; `TASK_SPEC.md`, `EVIDENCE.md`, `RUNBOOK.md` мали попередні зміни; збережи всі pre-existing untracked paths. Підготуй точний candidate commit manifest тільки після повного diff review і явного рішення користувача.
```

## Handoff boundary

FIX-001 implementation and local checks are recorded; no post-fix live result has been independently verified. The current handoff is for human diff review and decision only. Preserve Sprint checkpoint 03 as `HOLD`. No commit, push, deployment, live-provider access or real-key inspection is authorized by this handoff.

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
