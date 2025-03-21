import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/index.css";

function DetectorPage() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      {/* Title/Heading */}
      <h1 className="text-5xl md:text-6xl font-bold text-red-500 mb-6">
        Detection in Progress
      </h1>

      {/* Subtitle */}
      <p className="text-xl md:text-2xl text-gray-700 text-center max-w-2xl mb-8">
        Please wait while we analyze your current 3D print for errors...
      </p>

      {/* Larger Spinner */}
      <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-red-500 mb-8"></div>

      {/* "Go Back" Button */}
      <button
        onClick={() => navigate(-1)}
        className="px-6 py-3 text-lg bg-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-400 transition-all"
      >
        Go Back
      </button>
    </main>
  );
}

export default DetectorPage;
