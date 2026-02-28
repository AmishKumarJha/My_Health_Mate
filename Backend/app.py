from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd

app = Flask(__name__)
CORS(app)

# 1. Load the new Regression model and columns
model = joblib.load('diet_model.pkl')
model_columns = joblib.load('model_columns.pkl')
target_columns = joblib.load('target_columns.pkl') # Loads the names of the predicted outputs

@app.route('/predict', methods=['POST'])
def predict():
    try:
        json_data = request.json
        
        # 2. Convert incoming data into a DataFrame
        df = pd.DataFrame([json_data])
        
        # 3. One-Hot Encode (Converts Gender and Activity Level to numbers)
        df_encoded = pd.get_dummies(df)
        
        # 4. Align with training columns
        df_encoded = df_encoded.reindex(columns=model_columns, fill_value=0)
        
        # 5. Make the prediction (This will now output an array of numbers)
        prediction = model.predict(df_encoded)
        
        # 6. Map the predicted numbers back to their column names!
        # Example: {"Calories": 2000, "Protein": 150, "Carbs": 200}
        result_dict = dict(zip(target_columns, prediction[0]))
        
        return jsonify({
            'status': 'success',
            'recommended_diet': result_dict
        })

    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True, port=5000)