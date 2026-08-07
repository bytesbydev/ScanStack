
import React, { useEffect, useState } from "react";
import Navbar from "../components/common/Navbar";
import AnaylsisLoader from "../components/loader/AnaylsisLoader";
import { useLocation, useNavigate } from "react-router-dom";
import aiAnalysis from "../utils/aiAnalysis";

const Analyzing = () => {
  const location = useLocation();
  const navigate = useNavigate();
const parsedData = location.state?.parsedData;
const resumeText = location.state?.resumeText;

  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!parsedData || !resumeText) {
  navigate("/", { replace: true });
  return;
}

    let active = true;
    let navigationTimer;

    const timers = [];

    const runAnalysis = async () => {
      try {
        setError("");
        setProgress(10);

        timers.push(setTimeout(() => {
          if (active) setProgress(25);
        }, 1000));

        timers.push(setTimeout(() => {
          if (active) setProgress(42);
        }, 2000));

        timers.push(setTimeout(() => {
          if (active) setProgress(67);
        }, 3000));

        timers.push(setTimeout(() => {
          if (active) setProgress(89);
        }, 4000));

       const result = await aiAnalysis({
  resumeText,
  parsedData,
});
if (result?.error) {
  throw new Error(result.error);
}


        if (!active) return;

        setProgress(100);

        navigationTimer = setTimeout(() => {
          if (active) {
           navigate("/results", {
  state: { result },
  replace: true,
});
          }
        }, 700);
      } catch (err) {
        if (!active) return;

        console.error("Analysis failed:", err);
        setError(
          "Resume analysis failed. Please check your connection and try again."
        );
      }
    };

    runAnalysis();

    return () => {
      active = false;
      timers.forEach(clearTimeout);
      clearTimeout(navigationTimer);
    };
  }, [parsedData, navigate]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="flex items-center justify-center px-4 py-10 sm:py-16">
        <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:max-w-lg sm:p-8 md:max-w-xl">
          {error ? (
            <div className="py-6 text-center">
              <h2 className="text-xl font-semibold text-gray-800">
                Analysis Failed
              </h2>

              <p className="mt-3 text-sm text-gray-600">
                {error}
              </p>

              <button
                onClick={() =>
                  navigate("/", { replace: true })
                }
                className="mt-5 rounded-lg bg-blue-600 px-5 py-2.5 text-white transition hover:bg-blue-700"
              >
                Try Again
              </button>
            </div>
          ) : (
            <AnaylsisLoader progress={progress} />
          )}
        </div>
      </main>
    </div>
  );
};

export default Analyzing;
