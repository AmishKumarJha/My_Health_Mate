import os
import io
import re
import joblib
import pandas as pd
import pytesseract
from PIL import Image
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# --- 1. CONFIGURATION & MODEL LOADING ---
# Load your XGBoost model and columns
# Ensure these files are inside your 'models' folder
try:
    model = joblib.load('models/diet_model.pkl')
    model_columns = joblib.load('models/model_columns.pkl')
    target_columns = joblib.load('models/target_columns.pkl')
    print("✅ ML Models loaded successfully")
except Exception as e:
    print(f"❌ Error loading models: {e}")

# Clinical Database for deficiencies
CLINICAL_ADVICE = {
    "Iron": "Focus on spinach, lentils, red meat, and Vitamin C for absorption.",
    "Vitamin D": "Include fatty fish, egg yolks, and get 15-20 mins of sunlight.",
    "Vitamin B12": "Prioritize eggs, dairy, and fortified cereals.",
    "Calcium": "Include milk, cheese, yogurt, and leafy greens.",
    "None": "All parameters look great! Maintain a balanced diet."
}

# --- 2. OCR DATA EXTRACTION LOGIC ---
def extract_health_data(image_bytes):
    """Processes image and extracts numbers via Regex."""
    img = Image.open(io.BytesIO(image_bytes))
    img = img.convert('L') # Convert to grayscale for better OCR on lined paper
    text = pytesseract.image_to_string(img)
    
    print("--- OCR RAW TEXT START ---")
    print(text)
    print("--- OCR RAW TEXT END ---")

    # Regex patterns to find data in the report you provided
    # Looks for 'Hb' or 'Hemoglobin' followed by a decimal number
    hb_match = re.search(r"(?:Hb|Hemoglobin)[\s:]*(\d+\.?\d*)", text, re.IGNORECASE)
    # Looks for 'Age' followed by a number
    age_match = re.search(r"Age[^\d]*(\d+)", text, re.IGNORECASE)
    # Looks for 'Gender' followed by text
    gender_match = re.search(r"Gender[^\w]*(Male|Female)", text, re.IGNORECASE)

    extracted = {
        "Hemoglobin": float(hb_match.group(1)) if hb_match else None,
        "Ages": int(age_match.group(1)) if age_match else 25,
        "Gender": gender_match.group(1) if gender_match else "Female"
    }
    
    # Logic: Flag 'Iron' if Hemoglobin is low (Normal female > 12.0)
    deficiency = "None"
    if extracted["Hemoglobin"] and extracted["Hemoglobin"] < 12.0:
        deficiency = "Iron"
        
    return extracted, deficiency

# --- 3. ROUTES ---

@app.route('/upload-report', methods=['POST'])
def upload_report():
    """Endpoint for Next.js to send the image of the blood test."""
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    
    file = request.files['file']
    try:
        stats, suggested_deficiency = extract_health_data(file.read())
        return jsonify({
            'extracted_stats': stats,
            'suggested_deficiency': suggested_deficiency
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/predict', methods=['POST'])
def predict():
    """Standard prediction route using XGBoost + Clinical Logic."""
    try:
        json_data = request.json
        user_deficiency = json_data.get('Deficiency', 'None')
        
        # Prepare data for AI model
        df = pd.DataFrame([json_data])
        df_encoded = pd.get_dummies(df)
        df_encoded = df_encoded.reindex(columns=model_columns, fill_value=0)
        
        # XGBoost Prediction
        prediction = model.predict(df_encoded)
        result_dict = dict(zip(target_columns, prediction[0].tolist()))
        
        # Attach Clinical Advice
        advice = CLINICAL_ADVICE.get(user_deficiency.title(), f"Focus on {user_deficiency} rich foods.")
        result_dict["Clinical_Advice"] = advice
        result_dict["Status"] = f"Plan adjusted for {user_deficiency}"

        return jsonify({
            'status': 'success',
            'recommended_diet': result_dict
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    # On Mac, the default host is 127.0.0.1
    app.run(debug=True, port=5000)