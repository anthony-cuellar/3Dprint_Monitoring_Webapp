import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import "../css/index.css"; // Adjust if needed

function SuccessPage() {
  const navigate = useNavigate();

  // Tracks whether we've passed the 10-second mark
  const [isPrinted, setIsPrinted] = useState(false);

  useEffect(() => {
    // 10 seconds = 10,000 milliseconds
    const timer = setTimeout(() => {
      setIsPrinted(true);
    }, 10000);

    // Cleanup if this component unmounts before 10s
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white p-4">
      <h1 className="text-5xl md:text-6xl font-bold text-green-500 mb-6">
        Success!
      </h1>

      {/* If not yet printed, show "It's now printing..." */}
      {!isPrinted && (
        <p className="text-xl md:text-2xl text-gray-700 text-center max-w-2xl">
          Great news! No issues were detected in your 3D print.
          <br />
          It’s now printing…
          <span className="block text-sm text-gray-500 mt-2">
            (For prototype reason, this page will update after 10 seconds.)
          </span>
        </p>
      )}

      {/* After 10 seconds, show the "Printed model successfully." message and a Go Back button */}
      {isPrinted && (
        <div className="flex flex-col items-center">
          <p className="text-xl md:text-2xl text-gray-700 text-center max-w-2xl mb-4">
            Printed model successfully!
          </p>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-2 bg-green-500 text-white text-lg font-semibold 
                       rounded-full hover:bg-green-600 transition"
          >
            Back to Home
          </button>
        </div>
      )}
    </main>
  );
}

export default SuccessPage;
