import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/index.css"; // Tailwind or your CSS

function ErrorPage() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white p-4">
      <h1 className="text-5xl md:text-6xl font-bold text-red-500 mb-6">
        Error Detected. Stopped the printing.
      </h1>
      <p className="text-xl md:text-2xl text-gray-700 text-center max-w-2xl mb-8">
        We found an issue with your 3D print. Please review and try again.
      </p>

      {/* Two Buttons */}
      <div className="space-x-4">
        {/* 1. Retry Detection */}
        <button
          onClick={() => navigate("/detect")}
          className="px-6 py-2 text-lg bg-red-500 text-white font-semibold rounded-full 
                     hover:bg-red-600 transition-all"
        >
          Retry Detection
        </button>

        {/* 2. Go Back Home */}
        <button
          onClick={() => navigate("/")}
          className="px-6 py-2 text-lg bg-gray-300 text-gray-700 font-semibold rounded-full 
                     hover:bg-gray-400 transition-all"
        >
          Go Back Home
        </button>
      </div>
    </main>
  );
}

export default ErrorPage;
