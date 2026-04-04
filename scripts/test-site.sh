#!/usr/bin/env bash

set -euo pipefail

required_files=(
  "index.html"
  "styles.css"
  "script.js"
)

for file in "${required_files[@]}"; do
  if [[ ! -f "$file" ]]; then
    echo "Missing required file: $file"
    exit 1
  fi
done

grep -q '<!doctype html>' index.html || {
  echo "index.html is missing a doctype"
  exit 1
}

grep -q 'href="styles.css"' index.html || {
  echo "index.html does not reference styles.css"
  exit 1
}

grep -q 'src="script.js"' index.html || {
  echo "index.html does not reference script.js"
  exit 1
}

grep -q '<title>' index.html || {
  echo "index.html is missing a title"
  exit 1
}

echo "Static site checks passed."
