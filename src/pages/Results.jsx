
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

import ResultHeader from "../components/results/ResultHeader";
import ScoreSection from "../components/results/ScoreSection";
import SkillsAnalysis from "../components/results/SkillsAnalysis";
import SuggestionSection from "../components/results/SuggestionSection";
import RecomendedSkills from "../components/results/RecomendedSkills";

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const result = location.state?.result;

  if (!result) {
    return (
      <div className="min-h-screen bg-gray-50">
        <ResultHeader />

        <main className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
          <h1 className="text-2xl font-semibold text-gray-800">
            No Analysis Found
          </h1>

          <p className="mt-2 text-gray-600">
            Please upload your resume to generate an analysis report.
          </p>

          <button
            onClick={() => navigate("/")}
            className="mt-5 rounded-lg bg-blue-600 px-5 py-2.5 text-white transition hover:bg-blue-700"
          >
            Analyze Resume
          </button>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ResultHeader />

      <main className="flex justify-center px-3 py-6 sm:px-6 sm:py-10">
        <div className="w-full max-w-6xl space-y-6">
          <div>
            <h1 className="text-xl font-semibold sm:text-2xl">
              Resume Analysis Report
            </h1>

            <p className="text-sm text-gray-600 sm:text-base">
              Comprehensive breakdown with actionable recommendations
            </p>
          </div>

          <div className="rounded-2xl border border-gray-300 bg-white p-4 sm:p-5">
            <ScoreSection result={result} />
          </div>

          <div className="rounded-2xl border border-gray-300 bg-white p-4 sm:p-5">
            <SkillsAnalysis result={result} />
          </div>

          <div className="rounded-2xl border border-gray-300 bg-white p-4 sm:p-5">
            <SuggestionSection result={result} />
          </div>

          <div className="rounded-2xl border border-gray-300 bg-white p-4 sm:p-5">
            <RecomendedSkills result={result} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Results;
