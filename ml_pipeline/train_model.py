"""
GridForecast - Machine Learning Pipeline
This script demonstrates how the linear regression model is trained
on historical electricity production data to forecast future demand.
"""
import pandas as pd
import numpy as np
from sklearn.linear_model import LinearRegression
import pickle
import os

# 1. Historical Data (Mock Data simulating 1990 - 2024 Indonesian Grid Demand in TWh)
# In a real-world scenario, this data would be fetched from a database or CSV.
data = {
    'year': np.arange(1990, 2025),
    'production_twh': [
        # Simulating a relatively linear growth with some noise
        # This is structured to output roughly coef=8.89, intercept=-17692
        (y * 8.89565585112206) - 17692.938055580187 + np.random.normal(0, 5) for y in range(1990, 2025)
    ]
}

df = pd.DataFrame(data)

# 2. Prepare Features and Target
X = df[['year']]
y = df['production_twh']

# 3. Initialize and Train the Model
model = LinearRegression()
model.fit(X, y)

print("Model Trained Successfully!")
print(f"Coefficient (Slope): {model.coef_[0]}")
print(f"Intercept: {model.intercept_}")
print(f"R^2 Score on Training Data: {model.score(X, y):.4f}")

# 4. Save the Model
os.makedirs('output', exist_ok=True)
model_path = 'output/model_forecasting_listrik.pkl'
with open(model_path, 'wb') as f:
    pickle.dump(model, f)

print(f"Model saved to {model_path}")
