# Menggunakan image Python yang ringan
FROM python:3.9-slim

# Menyiapkan direktori kerja
WORKDIR /app

# Menyalin file requirements dan menginstalnya
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Menyalin seluruh kode backend
COPY main.py .
COPY model_forecasting_listrik.pkl .

# Mengekspos port 8000
EXPOSE 8000

# Menjalankan server FastAPI menggunakan Uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
