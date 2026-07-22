@echo off
echo Starting Arrow English AI Studio...
cd /d "%~dp0"
start http://localhost:5173/
npm run dev
