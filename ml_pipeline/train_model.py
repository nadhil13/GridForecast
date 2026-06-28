"""
GridForecast - Machine Learning Pipeline
This script demonstrates how the linear regression model is trained
on historical electricity production data to forecast future demand.
"""
import pandas as pd
import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.svm import SVR
import pickle
import os

# 1. Historical Data (Mock Data simulating 1990 - 2024 Indonesian Grid Demand in TWh)
np.random.seed(42)
data = {
    'year': np.arange(1990, 2025),
    'production_twh': [
        (y * 8.89565585112206) - 17692.938055580187 + np.random.normal(0, 5) for y in range(1990, 2025)
    ]
}

df = pd.DataFrame(data)

# 2. Prepare Features and Target
X = df[['year']]
y = df['production_twh']

# 3. Initialize and Train the Models
# Linear Regression Model
lr_model = LinearRegression()
lr_model.fit(X, y)

# SVR Model (Linear Kernel)
svr_model = SVR(kernel='linear', C=100)
svr_model.fit(X, y)

print("Linear Regression Trained Successfully!")
print(f"Coefficient: {lr_model.coef_[0]}")
print(f"Intercept: {lr_model.intercept_}")
print(f"R^2 Score: {lr_model.score(X, y):.4f}\n")

print("SVR Trained Successfully!")
print(f"Coefficient: {svr_model.coef_[0][0]}")
print(f"Intercept: {svr_model.intercept_[0]}")
print(f"R^2 Score: {svr_model.score(X, y):.4f}\n")

# 4. Save the Models
os.makedirs('output', exist_ok=True)

# Save LR Model
lr_path = 'output/model_forecasting_listrik.pkl'
with open(lr_path, 'wb') as f:
    pickle.dump(lr_model, f)
print(f"Linear Regression saved to {lr_path}")

# Save SVR Model
svr_path = 'output/model_svr.pkl'
with open(svr_path, 'wb') as f:
    pickle.dump(svr_model, f)
print(f"SVR saved to {svr_path}")
