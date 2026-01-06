@echo off
echo ====================================
echo LearnHub - Starting Application
echo ====================================
echo.
echo Tech Stack:
echo - Frontend: React + PWA
echo - Backend: Python + Flask  
echo - Database: SQLite
echo - AI: Rule-based + Content-based filtering
echo.
echo ====================================
echo Step 1: Starting Backend (Flask)
echo ====================================
cd backend
start cmd /k "python app.py"
timeout /t 5

echo.
echo ====================================
echo Step 2: Starting Frontend (React PWA)
echo ====================================
cd ../frontend
start cmd /k "npm run dev"

echo.
echo ====================================
echo Application Started!
echo ====================================
echo Backend: http://localhost:5000
echo Frontend: http://localhost:5173
echo.
echo Press any key to close this window...
pause > nul
