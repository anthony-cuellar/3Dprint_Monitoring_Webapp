import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/index.css";

function DetectorPage() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [showPrototype, setShowPrototype] = useState(false);

  // Smooth progress simulation (fast start, slow end)
  useEffect(() => {
    if (progress < 100) {
      const timer = setTimeout(() => {
        setProgress((prev) =>
          prev < 90 ? prev + Math.floor(Math.random() * 5 + 2) : prev + 1
        );
      }, 200);

      return () => clearTimeout(timer);
    } else {
      // Once loading reaches 100, reveal results
      setTimeout(() => {
        setShowPrototype(true);
      }, 800);
    }
  }, [progress]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 via-pink-50 to-gray-200 p-6">
      {/* Header */}
      <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-500 mb-4 animate-pulse">
        Detection in Progress
      </h1>
      <p className="text-xl md:text-2xl text-gray-700 text-center max-w-2xl mb-10">
        Please wait while we analyze your current 3D print for errors...
      </p>

      {/* Loading Bar */}
      <div className="w-full max-w-lg bg-gray-200 rounded-full h-8 mb-6 shadow-lg overflow-hidden relative">
        <div
          className="h-8 bg-gradient-to-r from-red-400 via-pink-500 to-purple-500 text-sm font-bold text-white flex items-center justify-center transition-all duration-500 animate-gradient-x"
          style={{ width: `${progress}%` }}
        >
          {progress}%
        </div>
        {/* Shimmer effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/20 via-transparent to-white/20 animate-shimmer"></div>
      </div>

      <button
        onClick={() => navigate(-1)}
        className="px-6 py-3 text-lg bg-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-400 transition-all mb-10"
      >
        Go Back
      </button>

      {/* Prototype Results Section */}
      <section
        className={`
          flex flex-col items-center transition-all duration-700 transform
          ${showPrototype ? "scale-100 opacity-100" : "scale-75 opacity-0"}
        `}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-red-500 mb-3 animate-bounce">
          Prototype Results
        </h2>
        <p className="text-md md:text-lg text-gray-700 text-center max-w-md mb-4">
          Simulation complete. Would you like to view the success or error flow?
        </p>

        <div className="space-x-4">
          <button
            onClick={() => navigate("/success")}
            className="px-6 py-2 text-md bg-green-500 text-white rounded-md font-semibold
                       hover:bg-green-600 transition-all shadow-md hover:scale-105"
          >
            ✅ Successful
          </button>
          <button
            onClick={() => navigate("/error")}
            className="px-6 py-2 text-md bg-red-500 text-white rounded-md font-semibold
                       hover:bg-red-600 transition-all shadow-md hover:scale-105"
          >
            ❌ Unsuccessful
          </button>
        </div>
      </section>
    </main>
  );
}

export default DetectorPage;
