import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
      setEvents((prev) => [newEvent, ...prev.slice(0, 4)]); // keep last 5
    }, 5000); // every 5s

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      {/* Header */}
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-red-600">
          3D Print Monitoring Dashboard
        </h1>
        <p className="text-gray-600 mt-3 text-lg">
          Track print status, view live feed, and monitor anomalies in real time.
        </p>
      </header>

      {/* Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {/* Live Feed Card */}
        <div className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center relative group">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Live Camera Feed
          </h2>
          <img
            src="/3dprinter.jpg"
            alt="3D Printer"
            className="w-full h-64 object-contain rounded-lg shadow transition-opacity duration-300 group-hover:opacity-0"
            onMouseEnter={startCamera}
          />
          <video
            ref={videoRef}
            autoPlay
            muted
            className="absolute top-16 inset-x-6 w-[calc(100%-3rem)] h-64 object-cover rounded-lg shadow opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            onMouseLeave={stopCamera}
          />
          <p className="text-sm text-gray-500 mt-3">Hover to activate camera</p>
        </div>

        {/* Status Card */}
        <div className="bg-white p-6 rounded-xl shadow-md flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Current Print Status
            </h2>
            <div className="flex items-center gap-3 mb-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100">
                <span className="text-green-600 text-lg">✔</span>
              </span>
              <p className="text-lg text-gray-700">
                <span className="font-semibold text-green-600">Status: OK</span>
              </p>
            </div>
            <p className="text-gray-600">
              No anomalies detected. Print is running smoothly and within expected parameters.
            </p>
          </div>
          <div className="mt-6">
            <Link
              to="/detect"
              className="w-full block text-center px-6 py-3 bg-red-500 text-white text-lg font-semibold rounded-lg 
                        hover:bg-red-600 transition shadow-md"
            >
              🚀 Start Monitoring
            </Link>
          </div>
        </div>

        {/* Controls / Logs Card */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Controls & Logs
          </h2>
          <div className="space-y-4">
            <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
              📜 View Print History
            </button>
            <button className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
              ⚠️ View Error Reports
            </button>
            <button className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
              🛠 System Health Check
            </button>
            <button className="w-full px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition">
              ⬇ Export Logs
            </button>
          </div>
          {/* Auto-updating Recent Events */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Recent Events</h3>
            <ul className="text-sm text-gray-600 space-y-2">
              {events.map((event, index) => (
                <li key={index} className="flex items-center gap-2">
                  <span className="text-purple-500">✔</span>
                  {event}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Home;
