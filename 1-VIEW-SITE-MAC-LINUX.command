#!/bin/bash
cd "$(dirname "$0")"
if ! command -v node >/dev/null 2>&1; then
  echo
  echo " Node.js is not installed. Download the LTS version from https://nodejs.org"
  echo " Install it, then run this again."
  read -p " Press Enter to close..."
  exit 1
fi
echo
echo " Starting your portfolio... your browser will open automatically."
echo " Keep this window open while viewing. Press Ctrl+C to stop."
echo
node serve.mjs
