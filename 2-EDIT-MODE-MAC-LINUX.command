#!/bin/bash
cd "$(dirname "$0")"
if ! command -v node >/dev/null 2>&1; then
  echo
  echo " Node.js is not installed. Download the LTS version from https://nodejs.org"
  read -p " Press Enter to close..."
  exit 1
fi
if [ ! -d node_modules ]; then
  echo
  echo " First run: installing packages (1-3 minutes)..."
  npm install || { echo " npm install failed. Use 1-VIEW-SITE-MAC-LINUX.command instead (no install needed)."; read -p " Press Enter..."; exit 1; }
fi
echo
echo " Starting edit mode at http://localhost:3000"
( sleep 6; (open http://localhost:3000 || xdg-open http://localhost:3000) >/dev/null 2>&1 ) &
npm run dev
