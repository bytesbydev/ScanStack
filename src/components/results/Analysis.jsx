
import React from "react";
import { TrendingUp, AlertTriangle, Target } from "lucide-react";

const EMPTY_ARRAY = [];

const getStatusStyles = (type) => {
  switch (type) {
    case "success":
      return { bg: "bg-green-100", dot: "bg-green-600" };
    case "warning":
      return { bg: "bg-amber-100", dot: "bg-amber-600" };
    case "danger":
      return { bg: "bg-red-100", dot: "bg-red-600" };
    default:
      return { bg: "bg-gray-100", dot: "bg-gray-600" };
  }
};

const getPercentage = (value) => {
  const number = Number(value);

  if (!Number.isFinite(number)) return 0;

  return Math.min(100, Math.max(0, number));
};

const Analysis = ({
  trendingKeywords = EMPTY_ARRAY,
  atsAnalysis = EMPTY_ARRAY,
  performanceStats = EMPTY_ARRAY,
}) => {
  const keywords = Array.isArray(trendingKeywords)
    ? trendingKeywords
    : [];

  const atsItems = Array.isArray(atsAnalysis)
    ? atsAnalysis
    : [];

  const stats = Array.isArray(performanceStats)
    ? performanceStats
    : [];

  return (
    <section className="space-y-6" aria-label="Resume analysis details">
      {/* Trending Keywords */}
      <section className="p-4 sm:p-5 rounded-2xl border border-gray-200 bg-slate-50">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp
            className="size-5 text-blue-600"
            aria-hidden="true"
          />
          <h3 className="font-medium text-gray-900 text-sm sm:text-base">
            Most Requested Keywords
          </h3>
        </div>

        {keywords.length === 0 ? (
          <p className="text-sm text-gray-500">
            No keyword data available.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {keywords.map((item, index) => {
              const keyword = item?.keyword || "Unnamed keyword";
              const frequency = getPercentage(item?.frequency);
              const inResume = Boolean(item?.inResume);

              return (
                <div
                  key={`${keyword}-${index}`}
                  className={`p-3 rounded-xl border ${
                    inResume
                      ? "bg-green-50 border-green-200"
                      : "bg-white border-amber-200"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <h4 className="font-medium text-gray-900 break-words">
                      {keyword}
                    </h4>

                    {inResume ? (
                      <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700 shrink-0">
                        In Resume
                      </span>
                    ) : (
                      <AlertTriangle
                        className="size-4 text-amber-600 shrink-0"
                        aria-label="Keyword missing from resume"
                      />
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <div
                      className="w-full h-2 bg-gray-200 rounded-full overflow-hidden"
                      role="progressbar"
                      aria-label={`${keyword} frequency`}
                      aria-valuenow={frequency}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    >
                      <div
                        style={{ width: `${frequency}%` }}
                        className={`h-full ${
                          inResume ? "bg-green-500" : "bg-amber-500"
                        }`}
                      />
                    </div>

                    <span className="text-xs font-medium shrink-0">
                      {frequency}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* ATS Analysis */}
      <section className="p-4 sm:p-5 rounded-2xl bg-blue-50 border border-blue-200">
        <h3 className="font-medium text-gray-900 mb-4 flex items-center gap-2 text-sm sm:text-base">
          <Target
            className="size-4 text-blue-600"
            aria-hidden="true"
          />
          ATS Compatibility Analysis
        </h3>

        {atsItems.length === 0 ? (
          <p className="text-sm text-gray-500">
            No ATS compatibility details available.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {atsItems.map((item, index) => {
              const styles = getStatusStyles(item?.type);

              return (
                <div
                  key={`${item?.title || "analysis"}-${index}`}
                  className="flex gap-3"
                >
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center mt-1 shrink-0 ${styles.bg}`}
                    aria-hidden="true"
                  >
                    <div className={`w-2 h-2 rounded-full ${styles.dot}`} />
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 text-sm sm:text-base">
                      {item?.title || "Analysis detail"}
                    </h4>

                    <p className="text-sm text-gray-600 break-words">
                      {item?.description || "No description available."}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Performance */}
      <section className="pt-6 border-t border-gray-200">
        <h3 className="text-sm font-medium text-gray-700 mb-4">
          Estimated Performance
        </h3>

        {stats.length === 0 ? (
          <p className="text-sm text-gray-500">
            No performance estimates available.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {stats.map((item, index) => (
              <p
                key={`${item?.label || "stat"}-${index}`}
                className="text-sm text-gray-600 break-words"
              >
                <strong className="text-gray-900">
                  {item?.label || "Metric"}:
                </strong>{" "}
                {item?.value ?? "Not available"}
              </p>
            ))}
          </div>
        )}
      </section>
    </section>
  );
};

export default Analysis;
