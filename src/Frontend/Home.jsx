import { Link } from "react-router-dom";
import "../css/index.css";

function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-white">
      <h1 className="text-4xl md:text-6xl font-bold text-red-500 mb-4">
        3D Print Error Detection
      </h1>
      <p className="text-lg text-gray-600 max-w-lg text-center">
        Automatically monitor and detect printing anomalies in real time — before they ruin your print.
      </p>

      <img
        src="/3dprinter.jpg"
        alt="3D Printer"
        className="w-64 h-auto mt-8 rounded shadow"
      />

      <div className="mt-6 p-4 bg-gray-50 rounded shadow max-w-lg w-full text-center">
        <h2 className="text-2xl font-bold text-red-500 mb-2">Current Print Status</h2>
        <p className="text-gray-700">No errors detected. Print running smoothly.</p>
      </div>

      {/* Use <Link> from React Router to go to /detect */}
      <Link
        to="/detect"
        className="mt-6 px-6 py-2 bg-red-500 text-white font-semibold rounded-full 
                   hover:bg-red-600 transition inline-block"
      >
        Start Now
      </Link>
    </main>
  );
}

export default Home;
