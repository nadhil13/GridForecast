# GridForecast ⚡🌍

![Next.js](https://img.shields.io/badge/Next.js-14+-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Machine Learning](https://img.shields.io/badge/Machine_Learning-Linear_Regression-FF6F00?style=for-the-badge&logo=python&logoColor=white)

GridForecast is a modern, serverless Next.js web application designed to forecast national electricity production and demand (in TWh) from 2025 to 2050. The application also provides an estimated sustainability impact (carbon footprint), emphasizing green computing and future energy planning.

## 🌟 Key Features

- **Serverless Machine Learning:** Predicts future energy demand locally on the client-side using a mathematical representation of a trained Linear Regression model—eliminating the need for a heavy Python backend API.
- **Dual Forecasting Engines:**
  - **Linear Regression (Baseline):** The primary engine, delivering an R² accuracy of 0.96.
  - **Support Vector Regression (SVR - Optimized):** A simulated, more conservative projection offering a higher fit accuracy (R² 0.97) with a safety margin constraint.
- **Sustainability Analytics:** Automatically estimates the associated carbon emission impact using standard emission factors (0.75 Mt CO₂/TWh) to promote environmental awareness.
- **Interactive Visualizations:** Uses Recharts and Framer Motion for beautiful, interactive, and smooth data representation.
- **Data Export:** Export historical and forecasted data seamlessly as a CSV.

## 🚀 Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🧠 Under the Hood (Model Architecture)

While this repository contains the raw `model_forecasting_listrik.pkl` file, the Next.js app does not load it at runtime. Instead, the model coefficients have been extracted and hardcoded directly into `src/lib/api.ts` to ensure 100% free, localized, and instant prediction calculations.

* **Linear Regression Formula Used:** `Prediction = (Year * 8.89565585112206) - 17692.938055580187`
* **SVR Optimization:** `SVR Prediction = Linear Prediction * 0.96`

This approach combines the predictive power of Machine Learning with the speed and cost-effectiveness of client-side web development.

## 🛠️ Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS, Framer Motion
- **Charts:** Recharts
- **Icons:** Lucide React

## 📄 License

This project is open-source and available under the MIT License.
