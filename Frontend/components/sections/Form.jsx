"use client"; 

import { useState } from "react";

export default function Form() {
  const [formData, setFormData] = useState({
    Ages: 25,
    Gender: "Male",
    Height: 175,
    Weight: 75,
    "Activity Level": "Moderate", 
    Deficiency: "None" 
  });

  const [loading, setLoading] = useState(false);
  const [scanning, setScanning] = useState(false); // New state for OCR
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const parsedValue = isNaN(value) ? value : Number(value);
    setFormData((prev) => ({ ...prev, [name]: parsedValue }));
  };

  // --- 🚨 NEW: HANDLES IMAGE UPLOAD & OCR 🚨 ---
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const uploadData = new FormData();
    uploadData.append('file', file);

    setScanning(true);
    setError(null);

    try {
      const response = await fetch("http://127.0.0.1:5000/upload-report", {
        method: "POST",
        body: uploadData,
      });

      const data = await response.json();

      if (response.ok) {
        // Auto-fill the form with data extracted from the image
        setFormData((prev) => ({
          ...prev,
          Ages: data.extracted_stats.Ages || prev.Ages,
          Gender: data.extracted_stats.Gender || prev.Gender,
          Deficiency: data.suggested_deficiency
        }));
        alert("Report scanned successfully! Form updated.");
      } else {
        setError(data.error || "Failed to read the image.");
      }
    } catch (err) {
      setError("Could not connect to the OCR service.");
    } finally {
      setScanning(false);
    }
  };

  const getDietRecommendation = async (patientData) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patientData),
      });

      const data = await response.json();

      if (response.ok) {
        setResult(data.recommended_diet); 
      } else {
        setError(data.error || "Something went wrong.");
      }
    } catch (err) {
      setError("Could not connect to the server. Is Flask running?");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const heightInMeters = formData.Height / 100;
    const calculatedBMI = formData.Weight / (heightInMeters * heightInMeters);
    const finalDataToSend = { ...formData, BMI: calculatedBMI };
    getDietRecommendation(finalDataToSend);
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px", fontFamily: "sans-serif" }}>
      
      {/* RESULT CARD */}
      {result && (
        <div style={{ backgroundColor: "#ffffff", border: "2px solid #4CAF50", borderRadius: "12px", padding: "30px", marginBottom: "30px", boxShadow: "0px 10px 20px rgba(0,0,0,0.1)" }}>
          <h2 style={{ margin: "0 0 15px 0", color: "#333", textAlign: "center" }}>📊 Your Clinical Diet Plan</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "10px" }}>
            {Object.entries(result).map(([key, value]) => (
              <div key={key} style={{ background: "#f4f4f4", padding: "10px", borderRadius: "8px" }}>
                <strong>{key.replace(/_/g, " ")}:</strong> 
                <span style={{ float: "right", color: "#4CAF50", fontWeight: "bold" }}>
                  {typeof value === 'number' ? value.toFixed(1) : String(value)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {error && <div style={{ background: "#f8d7da", color: "#721c24", padding: "15px", borderRadius: "8px", marginBottom: "20px" }}>{error}</div>}

      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>🩺 Clinical Planner</h2>
      
      {/* --- 🚨 NEW: IMAGE UPLOAD SECTION 🚨 --- */}
      <div style={{ marginBottom: "25px", padding: "20px", border: "2px dashed #0070f3", borderRadius: "10px", textAlign: "center", background: "#f0f7ff" }}>
        <p style={{ margin: "0 0 10px 0", fontWeight: "bold", color: "#0070f3" }}>Scan Blood Test Report</p>
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleFileUpload} 
          disabled={scanning}
          style={{ cursor: "pointer" }}
        />
        {scanning && <p style={{ marginTop: "10px", color: "#666" }}>🔄 Scanning image with AI...</p>}
      </div>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        {Object.keys(formData).map((key) => (
          <div key={key} style={{ display: "flex", flexDirection: "column" }}>
            <label style={{ fontSize: "14px", fontWeight: "bold", marginBottom: "5px" }}>{key}</label>
            <input
              type={typeof formData[key] === "number" ? "number" : "text"}
              name={key}
              value={formData[key]}
              onChange={handleChange}
              required
              style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }}
            />
          </div>
        ))}

        <button 
          type="submit" 
          disabled={loading || scanning} 
          style={{ padding: "15px", background: "#0070f3", color: "white", border: "none", borderRadius: "8px", fontWeight: "bold", cursor: "pointer" }}
        >
          {loading ? "Generating Plan..." : "Get Diet Recommendation"}
        </button>
      </form>
    </div>
  );
}