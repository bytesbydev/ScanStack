
import React from "react";
import { Award } from "lucide-react";
import InsightSection from "./InsightSection";
import SectionBreakdown from "./SectionBreakdown";

const getValidScore = (value) => {
  const score = Number(value);

  if (!Number.isFinite(score)) return 0;

  return Math.min(100, Math.max(0, score));
};

const getScoreColor = (score) => {
  if (score >= 80) return "text-green-600";
  if (score >= 60) return "text-amber-600";
  return "text-red-600";
};

const getBadgeColor = (score) => {
  if (score >= 80) return "bg-green-500";
  if (score >= 60) return "bg-amber-500";
  return "bg-red-500";
};

const getScoreLabel = (score) => {
  if (score >= 80) return "Excellent";
  if (score >= 60) return "Good";
  return "Needs Improvement";
};

const getScoreDescription = (score) => {
  if (score >= 80) {
    return "Your resume has a strong foundation. Review the suggestions below to identify opportunities for further improvement.";
  }

  if (score >= 60) {
    return "Your resume has a good starting point. Addressing the suggestions below may improve its clarity and compatibility with applicant tracking systems.";
  }

  return "Your resume has room for improvement. Start with the suggestions below to strengthen its content, formatting, and compatibility with applicant tracking systems.";
};

const ScoreSection = ({ result }) => {
  if (!result) {
    return (
      <div
        className="text-center py-10 text-gray-500"
        role="status"
        aria-live="polite"
      >
        Loading analysis...
      </div>
    );
  }

  const atsScore = getValidScore(result?.statsData?.atsScore);

  return (
    <section className="w-full space-y-6" aria-labelledby="quality-score-title">
      {/* Header */}
      <div className="flex items-start gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center shrink-0">
          <Award className="w-5 h-5 text-white" aria-hidden="true" />
        </div>

        <div>
          <h2
            id="quality-score-title"
            className="text-lg sm:text-xl font-semibold text-gray-900"
          >
            Overall Quality Score
          </h2>

          <p className="text-sm text-gray-500">
            Based on content, formatting, and ATS compatibility
          </p>
        </div>
      </div>

      {/* Score Card */}
      <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-6">
        <span className="text-sm font-medium text-gray-700">
          Resume Score
        </span>

        {/* Score and Badge */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-3">
          <div
            className="flex items-end gap-2"
            aria-label={`Resume score: ${atsScore} out of 100`}
          >
            <span
              className={`text-3xl sm:text-5xl font-bold ${getScoreColor(
                atsScore
              )}`}
            >
              {atsScore}
            </span>

            <span className="text-lg sm:text-2xl text-gray-600">
              /100
            </span>
          </div>

          <div
            className={`w-fit px-4 py-2 rounded-xl text-white font-semibold text-sm sm:text-base ${getBadgeColor(
              atsScore
            )}`}
          >
            {getScoreLabel(atsScore)}
          </div>
        </div>

        {/* Progress Bar */}
        <div
          className="w-full h-3 bg-gray-200 rounded-full mt-5 overflow-hidden"
          role="progressbar"
          aria-label="Overall resume score"
          aria-valuenow={atsScore}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className="h-full bg-gray-900 rounded-full transition-all duration-300"
            style={{ width: `${atsScore}%` }}
          />
        </div>

        {/* Description */}
        <p className="text-sm text-gray-500 mt-3">
          {getScoreDescription(atsScore)}
        </p>

        {/* Insights */}
        <div className="mt-6">
          <InsightSection result={result} />
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200" />

      {/* Section Breakdown */}
      <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-5">
        <SectionBreakdown result={result} />
      </div>
    </section>
  );
};

export default ScoreSection;
