@echo off
title Anuj Portfolio - Viewer
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
echo.
echo  Starting your portfolio... your browser will open automatically.
echo  Keep this window open while viewing. Close it to stop.
echo.
node serve.mjs
pause
