@echo off
title Anuj Portfolio - Edit Mode
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo.
  echo  Node.js is not installed. Download the LTS version from https://nodejs.org
  echo  Install it, then double-click this file again.
  echo.
  pause
  exit /b 1
)
if not exist node_modules (
  echo.
  echo  First run: installing packages. This takes 1-3 minutes...
  echo.
  call npm install
  if errorlevel 1 (
    echo.
    echo  npm install failed. Check your internet connection and try again.
    echo  If it keeps failing, use 1-VIEW-SITE-WINDOWS.bat instead - it needs no install.
    pause
    exit /b 1
  )
)
echo.
echo  Starting edit mode at http://localhost:3000  (first page load takes a few seconds)
echo.
start "" http://localhost:3000
call npm run dev
pause
