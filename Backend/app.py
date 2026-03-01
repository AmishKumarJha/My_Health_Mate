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

# ===============================
# 1️⃣ MODEL LOADING
# ===============================

try:
    BASE_DIR = os.path.dirname(os.path.abspath(__file__))
    MODEL_PATH = os.path.join(BASE_DIR, "models", "diet_model.pkl")
    COLUMNS_PATH = os.path.join(BASE_DIR, "models", "model_columns.pkl")

    model = joblib.load(MODEL_PATH)
    model_columns = joblib.load(COLUMNS_PATH)

    print("✅ ML Model loaded successfully")

except Exception as e:
    print(f"❌ Error loading model: {e}")


# ===============================
# 2️⃣ CLINICAL DEFICIENCY ADVICE
# ===============================

CLINICAL_ADVICE = {
    "Iron": "Focus on spinach, lentils, red meat, and Vitamin C for absorption.",
    "Vitamin D": "Include fatty fish, egg yolks, and get 15-20 mins of sunlight.",
    "Vitamin B12": "Prioritize eggs, dairy, and fortified cereals.",
    "Calcium": "Include milk, cheese, yogurt, and leafy greens.",
    "None": "All parameters look great! Maintain a balanced diet."
}


# ===============================
# 3️⃣ OCR EXTRACTION FUNCTION
# ===============================

def extract_health_data(image_bytes):
    """Processes image and extracts health data using OCR + Regex."""
    
    img = Image.open(io.BytesIO(image_bytes))
    img = img.convert('L')  # Convert to grayscale for better OCR

    text = pytesseract.image_to_string(img)

    print("\n--- OCR RAW TEXT START ---")
    print(text)
    print("--- OCR RAW TEXT END ---\n")

    # Extract Hemoglobin
    hb_match = re.search(r"(?:Hb|Hemoglobin)[\s:]*(\d+\.?\d*)", text, re.IGNORECASE)

    # Extract Age
    age_match = re.search(r"Age[^\d]*(\d+)", text, re.IGNORECASE)

    # Extract Gender
    gender_match = re.search(r"Gender[^\w]*(Male|Female)", text, re.IGNORECASE)

    extracted = {
        "Hemoglobin": float(hb_match.group(1)) if hb_match else None,
        "Ages": int(age_match.group(1)) if age_match else 25,
        "Gender": gender_match.group(1) if gender_match else "Female"
    }

    # Basic deficiency logic
    deficiency = "None"
    if extracted["Hemoglobin"] and extracted["Hemoglobin"] < 12.0:
        deficiency = "Iron"

    return extracted, deficiency


# ===============================
# 4️⃣ ROUTES
# ===============================

@app.route('/')
def home():
    return jsonify({"status": "Backend running successfully"})


@app.route('/upload-report', methods=['POST'])
def upload_report():
    """Receives blood report image from frontend."""

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
    """Calorie prediction using Gradient Boosting model."""

    try:
        json_data = request.json
        user_deficiency = json_data.get('Deficiency', 'None')

        # Prepare dataframe
        df = pd.DataFrame([json_data])

        # Encode categorical columns
        df_encoded = pd.get_dummies(df)

        # Match training columns
        df_encoded = df_encoded.reindex(columns=model_columns, fill_value=0)

        # Predict
        prediction = model.predict(df_encoded)

        # Since we predict only ONE value (Calories)
        predicted_calories = float(prediction[0])

        result_dict = {
            "Calories": round(predicted_calories, 2)
        }

        # Add clinical advice
        advice = CLINICAL_ADVICE.get(
            user_deficiency.title(),
            f"Focus on {user_deficiency} rich foods."
        )

        result_dict["Clinical_Advice"] = advice
        result_dict["Status"] = f"Plan adjusted for {user_deficiency}"

        return jsonify({
            'status': 'success',
            'recommended_diet': result_dict
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500


# ===============================
# 5️⃣ RUN SERVER
# ===============================

if __name__ == '__main__':
    app.run(debug=True, port=5000)