import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"; 
import "../css/index.css";

function Home() {
  const videoRef = useRef(null);

  // --- Live Camera ---
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Error accessing webcam:", err);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  // --- Recent Events ---
  const [events, setEvents] = useState([
    "Print started successfully",
    "Layer 45 completed",
    "No anomalies detected",
  ]);

  useEffect(() => {
    const possibleEvents = [
      "Layer 46 completed",
      "Layer 47 completed",
      "Temperature stable at 210°C",
      "Filament feeding smoothly",
      "No anomalies detected",
      "Cooling fan speed adjusted",
      "Bed leveling confirmed",
    ];

    const interval = setInterval(() => {
      const newEvent =
        possibleEvents[Math.floor(Math.random() * possibleEvents.length)];
      setEvents((prev) => [newEvent, ...prev.slice(0, 4)]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      {/* Header */}
      <motion.header
        className="text-center mb-12"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-red-600">
          3D Print Monitoring Dashboard
        </h1>
        <p className="text-gray-600 mt-3 text-lg">
          Track print status, view live feed, and monitor anomalies in real time.
        </p>
      </motion.header>

      {/* Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {/* Live Feed Card */}
        <motion.div
          className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center relative group min-h-[400px]"
          onMouseEnter={startCamera}
          onMouseLeave={stopCamera}
          whileHover={{ y: -5, boxShadow: "0px 8px 20px rgba(0,0,0,0.15)" }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Live Camera Feed
          </h2>
          <img
            src="/3dprinter.jpg"
            alt="3D Printer"
            className="w-full h-64 object-contain rounded-lg shadow transition-opacity duration-300 group-hover:opacity-0"
          />
          <video
            ref={videoRef}
            autoPlay
            muted
            className="absolute top-16 inset-x-6 w-[calc(100%-3rem)] h-64 object-cover rounded-lg shadow opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          />
          <p className="text-sm text-gray-500 mt-3">Hover to activate camera</p>
        </motion.div>

        {/* Status Card */}
        <motion.div
          className="bg-white p-6 rounded-xl shadow-md flex flex-col justify-between min-h-[400px]"
          whileHover={{ y: -5, boxShadow: "0px 8px 20px rgba(0,0,0,0.15)" }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Current Print Status
            </h2>
            <div className="flex items-center gap-3 mb-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100">
                <span className="text-green-600 text-lg animate-pulse">●</span>
              </span>
              <p className="text-lg text-gray-700">
                <span className="font-semibold text-green-600">Status: OK</span>
              </p>
            </div>
            <p className="text-gray-600">
              No anomalies detected. Print is running smoothly and within expected parameters.
            </p>
          </div>
          <motion.div whileHover={{ scale: 1.05 }} className="mt-6">
            <Link
              to="/detect"
              className="w-full block text-center px-6 py-3 bg-red-500 text-white text-lg font-semibold rounded-lg 
                        hover:bg-red-600 transition shadow-md"
            >
              🚀 Start Monitoring
            </Link>
          </motion.div>
        </motion.div>

        {/* Controls / Logs Card */}
        <motion.div
          className="bg-white p-6 rounded-xl shadow-md min-h-[400px] flex flex-col"
          whileHover={{ y: -5, boxShadow: "0px 8px 20px rgba(0,0,0,0.15)" }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Controls & Logs
          </h2>
          <div className="space-y-4 flex-1">
            {[
              { label: "📜 View Print History", color: "bg-blue-500 hover:bg-blue-600" },
              { label: "⚠️ View Error Reports", color: "bg-red-500 hover:bg-red-600" },
              { label: "🛠 System Health Check", color: "bg-green-500 hover:bg-green-600" },
              { label: "⬇ Export Logs", color: "bg-gray-500 hover:bg-gray-600" },
            ].map((btn, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.05 }}
                className={`w-full px-4 py-2 text-white rounded-lg transition ${btn.color}`}
              >
                {btn.label}
              </motion.button>
            ))}
          </div>
          {/* Auto-updating Recent Events */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Recent Events
            </h3>
            <ul className="text-sm text-gray-600 space-y-2">
              {events.map((event, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                  className="flex items-center gap-2"
                >
                  <span className="text-purple-500">✔</span>
                  {event}
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </main>
  );
}

export default Home;
