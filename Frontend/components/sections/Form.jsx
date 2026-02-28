"use client"; 

import { useState } from "react";

export default function Form() {
  // 1. UPDATED: Only 5 inputs required for the new model!
  const [formData, setFormData] = useState({
    Ages: 25,
    Gender: "Male",
    Height: 175,
    Weight: 75,
    "Activity Level": "Moderate" // Ensure this matches exactly how it's spelled in your dataset
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const parsedValue = isNaN(value) ? value : Number(value);
    setFormData((prev) => ({ ...prev, [name]: parsedValue }));
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
        setResult(data.recommended_diet); // This is now an object of macro numbers/meal data!
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
    getDietRecommendation(formData);
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px", fontFamily: "sans-serif" }}>
      
      {/* --- UPDATED RESULT CARD FOR REGRESSION OUTPUT --- */}
      {result && (
        <div style={{ backgroundColor: "#ffffff", border: "2px solid #4CAF50", borderRadius: "12px", padding: "30px", marginBottom: "30px", boxShadow: "0px 10px 20px rgba(0,0,0,0.1)" }}>
          <h2 style={{ margin: "0 0 15px 0", color: "#333", textAlign: "center" }}>📊 Your Detailed Macro Plan</h2>
          
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
            {/* Loops through the predicted macros and displays them neatly */}
            {Object.entries(result).map(([key, value]) => (
              <div key={key} style={{ background: "#f4f4f4", padding: "10px", borderRadius: "8px" }}>
                <strong>{key.replace(/_/g, " ")}:</strong> 
                <span style={{ float: "right", color: "#4CAF50", fontWeight: "bold" }}>
                  {typeof value === 'number' ? value.toFixed(1) : value}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {error && <div style={{ background: "#f8d7da", color: "#721c24", padding: "15px", borderRadius: "8px", marginBottom: "20px" }}><p>❌ Error: {error}</p></div>}

      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>🩺 Enter Your Stats</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        
        {Object.keys(formData).map((key) => (
          <div key={key} style={{ display: "flex", flexDirection: "column" }}>
            <label style={{ fontSize: "14px", fontWeight: "bold", marginBottom: "5px", color: "#444" }}>{key}</label>
            <input
              type={typeof formData[key] === "number" ? "number" : "text"}
              name={key}
              value={formData[key]}
              onChange={handleChange}
              step="any"
              required
              style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ccc", fontSize: "15px" }}
            />
          </div>
        ))}

        <button type="submit" disabled={loading} style={{ marginTop: "10px", padding: "15px", background: loading ? "#ccc" : "#0070f3", color: "white", border: "none", borderRadius: "8px", cursor: loading ? "not-allowed" : "pointer", fontWeight: "bold", fontSize: "18px" }}>
          {loading ? "Calculating..." : "Generate Detailed Plan"}
        </button>
      </form>
    </div>
  );
}