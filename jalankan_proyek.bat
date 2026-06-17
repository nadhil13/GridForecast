@echo off
echo ===================================================
echo MENYALAKAN SISTEM FORECASTING LISTRIK NASIONAL
echo ===================================================

echo [1/2] Menyalakan Backend API (FastAPI)...
:: Perintah ini membuka terminal baru, masuk ke folder backend, mengaktifkan env, dan menjalankan uvicorn
start "Backend FastAPI" cmd /k "uvicorn main:app --reload"

echo [2/2] Menyalakan Frontend Web (Next.js)...
:: Perintah ini membuka terminal baru, masuk ke folder frontend, dan menjalankan Next.js
start "Frontend Next.js" cmd /k "cd frontend && npm run dev"

echo Selesai! Server sedang proses booting...
exit