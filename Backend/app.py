import os
import io
import re
import pytesseract
from PIL import Image, ImageEnhance
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# --- 1. CONFIGURATION ---
# On Mac, Tesseract is usually at this path. Check 'which tesseract' in terminal.
pytesseract.pytesseract.tesseract_cmd = r'/opt/homebrew/bin/tesseract'

# --- 2. DIET DATABASE ---
DIET_DATABASE = {
    "Iron": {
        "Goal": "Increase Hemoglobin & Iron absorption",
        "Schedule": {
            "Monday": "Spinach Omelet, Lentil Soup, Grilled Lamb",
            "Tuesday": "Fortified Oats, Turkey Wrap, Beef Stir-fry",
            "Wednesday": "Pumpkin Seeds, Chickpea Salad, Spinach Lasagna",
            "Thursday": "Tofu Scramble, Quinoa Bowl, Roast Chicken",
            "Friday": "Boiled Eggs, Sardines on Toast, Beef Stew",
            "Saturday": "Kale Smoothie, Falafel Plate, Steak & Spinach",
            "Sunday": "Buckwheat Pancakes, Lentil Dal, Grilled Salmon"
        }
    },
    "None": {
        "Goal": "General Health Maintenance",
        "Schedule": {
            "Monday": "Mediterranean Salad, Grilled Chicken",
            "Tuesday": "High Protein Quinoa Bowl",
            "Wednesday": "Plant-based Whole Foods Day",
            "Thursday": "Lean Poultry & Complex Carbs",
            "Friday": "Omega-3 Rich Seafood Day",
            "Saturday": "Fiber-rich Fruit & Nut Day",
            "Sunday": "Restorative Vegetable Soups"
        }
    }
}

# --- 3. EXTRACTION LOGIC ---
def extract_data(image_bytes):
    # Enhance image for better OCR
    img = Image.open(io.BytesIO(image_bytes)).convert('L')
    img = ImageEnhance.Contrast(img).enhance(2.0)
    
    # Extract text
    text = pytesseract.image_to_string(img)
    print("--- OCR EXTRACTED TEXT ---")
    print(text)
    
    # Simple Regex to find Hemoglobin (Hb)
    # Looks for 'Hb' or 'Hemoglobin' followed by a number
    hb_match = re.search(r"(?:Hb|Hemoglobin)[\s:]*(\d+\.?\d*)", text, re.IGNORECASE)
    age_match = re.search(r"Age[^\d]*(\d+)", text, re.IGNORECASE)
    
    hb_val = float(hb_match.group(1)) if hb_match else 13.5
    age_val = int(age_match.group(1)) if age_match else 25
    
    return {"Ages": age_val, "Hemoglobin": hb_val}

# --- 4. ROUTE ---
@app.route('/predict-weekly', methods=['POST'])
def predict_weekly():
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400
    
    try:
        file = request.files['file']
        stats = extract_data(file.read())
        
        # Local logic: If Hb < 12, it's an Iron deficiency
        deficiency = "Iron" if stats["Hemoglobin"] < 12.0 else "None"
        plan = DIET_DATABASE.get(deficiency)

        return jsonify({
            'status': 'success',
            'extracted_info': stats,
            'deficiency_found': deficiency,
            'goal': plan["Goal"],
            'weekly_diet': plan["Schedule"]
        })
    except Exception as e:
        return jsonify({'error': f"OCR Processing failed: {str(e)}"}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)