
import React from "react";

const getScore = (value) => {
  const score = Number(value);

  if (!Number.isFinite(score)) return 0;

  return Math.min(100, Math.max(0, score));
};

const SectionBreakdown = ({ result }) => {
  const skillCategories = Array.isArray(result?.skillCategories)
    ? result.skillCategories
    : [];

  return (
    <section className="w-full" aria-labelledby="section-breakdown-title">
      <h2
        id="section-breakdown-title"
        className="text-lg font-semibold text-gray-900 mb-4"
      >
        Section Breakdown
      </h2>

      {skillCategories.length === 0 ? (
        <p className="text-sm text-gray-500 py-3">
          No section scores are available for this resume.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {skillCategories.map((category, index) => {
            const score = getScore(category?.score);
            const section = category?.section || "Unnamed section";

            return (
              <div
                key={`${section}-${index}`}
                className="flex items-center justify-between gap-3 p-2 rounded-lg hover:bg-gray-50"
              >
                <span className="text-sm sm:text-base text-gray-700 break-words">
                  {section}
                </span>

                <div className="flex items-center gap-2 w-1/2 sm:w-2/3 shrink-0">
                  <div
                    className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden"
                    role="progressbar"
                    aria-label={`${section} score`}
                    aria-valuenow={score}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  >
                    <div
                      className="h-full bg-gray-900 rounded-full transition-all duration-300"
                      style={{ width: `${score}%` }}
                    />
                  </div>

                  <span
                    className={`text-xs sm:text-sm font-medium ${
                      score >= 80
                        ? "text-green-600"
                        : score >= 60
                        ? "text-amber-600"
                        : "text-red-600"
                    }`}
                  >
                    {score}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default SectionBreakdown;
