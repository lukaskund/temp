# PawShop v1

Static e-commerce demo site with GitHub Pages deployment and Playwright end-to-end tests.

## Project Structure

- `web/`: site source served by GitHub Pages
- `e2e/`: Playwright + TypeScript test project
- `.github/workflows/pages.yml`: CI/CD pipeline for test and deploy

## CI/CD

The GitHub Actions workflow does two things:

1. On pull requests to `main`, it copies `web/` into `dist/`, installs `e2e/` dependencies, and runs the Chrome Playwright suite.
2. On pushes to `main`, it runs the same test job first and then deploys `dist/` to GitHub Pages.

`dist/` is build output only. The source of truth for the site is `web/`.

## Local Test Commands

From `e2e/`:

```bash
npm ci
npm run typecheck
npm run lint
npm test
```

The default Playwright config starts a local server for the built site and runs the Chrome suite against `http://127.0.0.1:4173/`.

## Notes

- There is no root Node project anymore.
- If you change the site, edit files in `web/`.
- If you change automation, edit files in `e2e/`.

## Deployed Site

https://lukaskund.github.io/temp/
