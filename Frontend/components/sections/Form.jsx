"use client";
import { useState } from "react";

export default function Form() {
  const [loading, setLoading] = useState(false);
  const [reportData, setReportData] = useState(null);
  const [error, setError] = useState(null);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    setError(null);
    setReportData(null);

    try {
      const response = await fetch("http://127.0.0.1:5000/predict-weekly", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      
      if (response.ok) {
        setReportData(data);
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError("Cannot connect to Local OCR Server. Run python3 app.py first.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      <div className="border-4 border-dashed border-gray-100 rounded-xl p-10 text-center bg-gray-50">
        <input 
          type="file" 
          onChange={handleFileUpload} 
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" 
        />
        <p className="mt-4 text-gray-600 font-medium">
          {loading ? "⚙️ Local OCR Scanning..." : "Upload your report for instant analysis"}
        </p>
      </div>

      {error && <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-lg">❌ {error}</div>}

      {reportData && (
        <div className="mt-8 space-y-6 animate-in fade-in duration-500">
          <div className="bg-blue-600 text-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-bold">Local Analysis: {reportData.deficiency_found} Optimized</h3>
            <p className="opacity-90">Goal: {reportData.goal}</p>
            <div className="mt-3 flex gap-4 text-sm font-mono bg-black/10 p-2 rounded">
              <span>Extracted Hb: {reportData.extracted_info.Hemoglobin}</span>
              <span>Extracted Age: {reportData.extracted_info.Ages}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(reportData.weekly_diet).map(([day, meal]) => (
              <div key={day} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <span className="text-blue-600 font-bold text-xs uppercase">{day}</span>
                <p className="mt-2 text-sm text-gray-700 leading-tight">{meal}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}