
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Home, Download, FileCheck } from "lucide-react";

const ResultHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const result = location.state?.result;

  const handleExport = () => {
    if (!result) {
      alert("No analysis results available to export.");
      return;
    }

    const report = {
      generatedAt: new Date().toISOString(),
      ...result,
    };

    const blob = new Blob(
      [JSON.stringify(report, null, 2)],
      { type: "application/json" }
    );

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "scanstack-resume-report.json";
    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(url);
  };

  return (
    <header className="sticky top-0 z-10 border-b bg-white">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          {/* Left side */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-blue-600 flex items-center justify-center">
              <FileCheck
                className="size-4 sm:size-5 text-white"
                aria-hidden="true"
              />
            </div>

            <div>
              <h1 className="text-lg sm:text-xl font-semibold text-gray-900">
                ScanStack
              </h1>
              <p className="text-xs text-gray-500">
                Resume Analysis Results
              </p>
            </div>
          </div>

          {/* Right side buttons */}
          <div className="flex flex-wrap sm:flex-nowrap gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="flex items-center text-sm font-medium bg-blue-50 text-blue-700 border border-blue-200 rounded-lg px-3 py-2 hover:bg-blue-100 transition"
            >
              <Home className="size-4 mr-2" aria-hidden="true" />
              New Analysis
            </button>

            <button
              type="button"
              onClick={handleExport}
              disabled={!result}
              className="flex items-center text-sm font-medium bg-blue-600 text-white rounded-lg px-3 py-2 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              <Download className="size-4 mr-2" aria-hidden="true" />
              Export Report
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default ResultHeader;
