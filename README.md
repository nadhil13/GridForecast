<div align="center">
  <img src="https://img.icons8.com/color/96/000000/electrical-energy.png" width="80" alt="Energy Logo"/>
  <h1>National Electricity Demand Forecasting</h1>
  <p><em>AI-Powered Demand Predictions & Historical Analytics</em></p>

  <p>
    <a href="#about-the-project">About</a> •
    <a href="#architecture">Architecture</a> •
    <a href="#quick-start">Quick Start</a> •
    <a href="#deployment-guide-option-a">Deployment</a>
  </p>
</div>

---

## ⚡ About The Project
This project is an advanced web application that utilizes Machine Learning (Linear Regression) to predict the national electricity demand based on historical data. It offers an interactive dashboard for exploratory data analysis (EDA) and a forecasting engine with confidence intervals.

### 🔥 Features
- **Exploratory Data Analysis**: Interactive charts showing 35 years of grid data (1990–2024).
- **AI Forecast Engine**: Predict future electricity consumption in Terawatt-hours (TWh).
- **High Performance UI**: Built with Next.js App Router, Framer Motion, and Lazy Loaded charts for blazingly fast load times.

---

## 🏗️ Architecture

The repository is structured as a Monorepo containing two main parts:

### 1. Frontend (`/frontend`)
- **Framework**: Next.js 16 (React 19)
- **Styling**: Tailwind CSS & Framer Motion
- **Charts**: Recharts (dynamically loaded)

### 2. Backend (Root Directory)
- **Framework**: FastAPI (Python)
- **Machine Learning**: Scikit-Learn (`model_forecasting_listrik.pkl`)
- **Task**: Serves the `/api/predict` endpoint to generate future electricity estimates.

---

## 🚀 Quick Start (Local Development)

### Prerequisites
- [Node.js](https://nodejs.org/en/) (v18+)
- [Python](https://www.python.org/downloads/) (3.9+)

### Installation

1. **Start the Backend**
   ```bash
   pip install -r requirements.txt
   uvicorn main:app --reload
   ```
   *The API will run on `http://127.0.0.1:8000`*

2. **Start the Frontend**
   Open a new terminal and navigate to the `frontend` folder:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   *The Website will run on `http://localhost:3000`*

*(Alternatively, you can just double click the `jalankan_proyek.bat` script on Windows!)*

---

## 🌍 Deployment Guide (Option A - Highly Recommended)

To ensure high performance and stability, we recommend separating the deployment of the Frontend and Backend.

### Step 1: Deploy Backend to Render / Railway
1. Create a new Web Service on [Render.com](https://render.com) or [Railway.app](https://railway.app).
2. Connect this GitHub repository.
3. Configure the build:
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
4. Once deployed, copy your new backend URL (e.g., `https://my-backend.onrender.com`).

### Step 2: Deploy Frontend to Vercel
1. Log in to [Vercel](https://vercel.com).
2. Create a **New Project** and select this repository.
3. In the project configuration:
   - **Root Directory**: Select `frontend`
   - **Framework Preset**: Next.js
4. **Important**: Go to `frontend/src/features/forecast/` and update the API URL to point to your new Render/Railway backend URL instead of `http://localhost:8000`.
5. Click **Deploy**.

🎉 **Your High-Performance Fullstack App is now live!**
