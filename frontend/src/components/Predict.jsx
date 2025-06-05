import React, { useState } from "react";
import axios from "axios";

export default function Predict() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [prediction, setPrediction] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const onFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
      setPrediction("");
      setStatus("");
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Pilih gambar dulu ya!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      setPrediction("");
      setStatus("");

      const res = await axios.post("http://localhost:8000/predict", formData);

      setPrediction(
        `🖼️ Prediksi: ${res.data.prediction} (Confidence: ${res.data.confidence})`
      );
      setStatus("success");
    } catch (err) {
      console.error(err);
      setPrediction("⚠️ Terjadi kesalahan saat prediksi.");
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-12"
      style={{
        background: "linear-gradient(135deg, #69DDFF 0%, #DBBADD 100%)",
      }}
    >
      <style>
        {`
          .text-gradient {
            background: linear-gradient(90deg, #69ddff, #dbbadd);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
          .text-glow {
            text-shadow: 0 0 8px rgba(105, 221, 255, 0.7);
          }
        `}
      </style>

      <div className="bg-white bg-opacity-90 backdrop-blur-md rounded-2xl shadow-2xl p-10 max-w-lg w-full">
        <h1
          className="font-poppins text-5xl font-extrabold italic tracking-wide leading-tight drop-shadow-xl mb-8 text-center text-gradient text-glow"
          style={{ lineHeight: "1.1" }}
        >
          Prediksi Gambar Anjing & Kucing
        </h1>

        <form onSubmit={onSubmit} className="flex flex-col items-center gap-6">
          <label
            htmlFor="file-upload"
            className="w-full cursor-pointer rounded-lg border-2 border-primaryLight border-dashed p-6 flex flex-col items-center justify-center text-primaryLight hover:border-primary transition-colors duration-300 select-none"
          >
            {preview ? (
              <img
                src={preview}
                alt="preview"
                className="max-h-64 rounded-lg object-contain mb-4 transition-opacity duration-700 opacity-100"
              />
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 mb-3 text-primaryLight"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7 16v-4m0 0V8m0 4h10m4 0a2 2 0 01-2 2H7a2 2 0 01-2-2V8a2 2 0 012-2h10a2 2 0 012 2v4z"
                  />
                </svg>
                <span className="text-primaryLight font-semibold">
                  Klik atau seret gambar di sini
                </span>
                <span className="text-xs text-primaryLight mt-1">
                  Format: JPG, PNG (max 5MB)
                </span>
              </>
            )}
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              onChange={onFileChange}
              className="hidden"
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg text-white font-semibold text-lg transition-colors duration-300 ${
              loading
                ? "bg-primaryLight cursor-not-allowed"
                : "bg-primary hover:bg-primaryLight active:scale-95"
            }`}
          >
            {loading ? (
              <div className="flex justify-center items-center gap-2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
                Memproses...
              </div>
            ) : (
              "Prediksi"
            )}
          </button>

          {prediction && (
            <div
              className={`mt-6 p-4 rounded-md text-center font-semibold ${
                status === "success"
                  ? "bg-accent text-accentDark"
                  : "bg-red-200 text-red-700"
              } transition-all duration-500`}
              role="alert"
            >
              {prediction}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
