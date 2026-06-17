from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pickle
import numpy as np

app = FastAPI()

# Mengizinkan Frontend (Next.js/React) untuk mengakses API ini
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load Model ML yang sudah dilatih
with open('model_forecasting_listrik.pkl', 'rb') as file:
    model_lr = pickle.load(file)

# Format data yang akan diterima dari Frontend
class PrediksiRequest(BaseModel):
    tahun: int

@app.get("/")
def read_root():
    return {"message": "API Forecasting Listrik Aktif!"}

@app.post("/api/predict")
def predict_electricity(data: PrediksiRequest):
    # Model sklearn membutuhkan input array 2D, misal: [[2030]]
    input_tahun = np.array([[data.tahun]])
    
    # Melakukan prediksi
    hasil_prediksi = model_lr.predict(input_tahun)
    
    return {
        "tahun": data.tahun,
        "estimasi_produksi_twh": round(hasil_prediksi[0], 2)
    }

# Cara menjalankan server:
# Ketik di terminal: uvicorn main:app --reload