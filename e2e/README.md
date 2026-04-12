# Playwright TypeScript Framework

## What This Project Is

This folder is the Playwright + TypeScript automation project. The **PawShop static site** lives next to it at **`../web/`** (repository root), and local/CI test runs copy it into **`../dist/`** before serving it.

It includes:

- Playwright test runner configuration (`playwright.config.ts`)
- Shared fixtures and helpers under `src/`
- Linting and formatting setup (ESLint + Prettier)
- CI: GitHub Actions live at the **repository root** in `.github/workflows/` and run tests from `e2e/` against a local server serving `../dist/`

Use it as a base to build and run end-to-end browser tests.

Specs already live under `tests/e2e/`.

## How To Install

From this directory (`e2e/`):

```bash
npm install
npx playwright install
cp .env.example .env
```

Then update `.env` values as needed for your target environment. The default `BASE_URL` points to the local static server that Playwright starts automatically from `../web/`.

## How To Run Tests

After you add specs under `tests/e2e/`:

```bash
npm test              # run all tests
npm run test:headed   # run with visible browser
npm run test:debug    # debug mode
npm run test:ui       # Playwright UI mode
npm run test:report   # open last HTML report
```

Run one browser project:

```bash
npx playwright test --project=chromium
```

## ESLint

Config lives in `eslint.config.js` (flat config). From the repo root:

```bash
npm run lint       # check
npm run lint:fix   # auto-fix what ESLint can fix
```

In Cursor/VS Code, install the **ESLint** extension (`dbaeumer.vscode-eslint`); workspace settings enable flat config and fix-on-save. See `.vscode/settings.json`.

## How To Run With Cursor AI

1. Open this project folder in Cursor.
2. Open the AI chat panel and ask for changes (for example: "add a login spec", "fix lint errors", or "run tests").
3. Use AI to generate or refactor code, then review file diffs before accepting.
4. Run validation commands from the terminal:

```bash
npm run lint
npm run typecheck
npm test
```

If format-on-save is enabled in `.vscode/settings.json`, Cursor will auto-format files and apply ESLint fixes on save.
