# temp

Static site prepared for GitHub Pages with GitHub Actions CI/CD.

## Files

- `index.html`
- `styles.css`
- `script.js`

## CI/CD

The repository includes a GitHub Actions workflow at `.github/workflows/pages.yml`.

- `test` job verifies the required static files and checks that `index.html` references the CSS and JavaScript files.
- `deploy` job runs only after tests pass and publishes the site to GitHub Pages on pushes to `main`.

## GitHub Pages Setup

1. Open the repository on GitHub.
2. Go to `Settings` -> `Pages`.
3. Under `Build and deployment`, choose `GitHub Actions`.
5. Save.

The site will be published at:

`https://lukaskund.github.io/temp/`
