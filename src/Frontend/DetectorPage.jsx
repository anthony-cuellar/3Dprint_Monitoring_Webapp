import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/index.css";

function DetectorPage() {
  const navigate = useNavigate();
  const [showPrototype, setShowPrototype] = useState(false);

  // After 5 seconds, reveal the prototype section
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPrototype(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      {/* Spinner / Detection Section (always visible) */}
      <h1 className="text-5xl md:text-6xl font-bold text-red-500 mb-4">
        Detection in Progress
      </h1>
      <p className="text-xl md:text-2xl text-gray-700 text-center max-w-2xl mb-6">
        Please wait while we analyze your current 3D print for errors...
      </p>

      <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-red-500 mb-6"></div>

      <button
        onClick={() => navigate(-1)}
        className="px-6 py-3 text-lg bg-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-400 transition-all mb-10"
      >
        Go Back
      </button>

      {/* PROTOTYPE RESULTS SECTION: fade/zoom in after 5s */}
      <section
        className={`
          flex flex-col items-center transition-all duration-700 transform
          ${showPrototype ? "scale-100 opacity-100" : "scale-75 opacity-0"}
        `}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-red-500 mb-3">
          Prototype Results
        </h2>
        <p className="text-md md:text-lg text-gray-700 text-center max-w-md mb-4">
          Simulation complete. Would you like to view the success or error flow?
        </p>

        <div className="space-x-4">
          <button
            onClick={() => navigate("/success")}
            className="px-5 py-2 text-md bg-green-500 text-white rounded-md font-semibold
                       hover:bg-green-600 transition-all"
          >
            Successful
          </button>
          <button
            onClick={() => navigate("/error")}
            className="px-5 py-2 text-md bg-red-500 text-white rounded-md font-semibold
                       hover:bg-red-600 transition-all"
          >
            Unsuccessful
          </button>
        </div>
      </section>
    </main>
  );
}

export default DetectorPage;
