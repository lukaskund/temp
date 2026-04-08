# temp

GitHub Pages site with GitHub Actions CI/CD and Playwright end-to-end tests.

## CI/CD

- Pull requests targeting `main` build the site, start a local web server from `dist/`, and run the Playwright test suite.
- Pushes to `main` run the same build-and-test flow first, then deploy `dist/` to GitHub Pages only if tests pass.

## Local Commands

- `npm run build` creates the deployable site in `dist/`.
- `npm run test:e2e` runs Playwright against the local web server serving `dist/`.

The site is published at:

[https://lukaskund.github.io/temp/](https://lukaskund.github.io/temp/)
