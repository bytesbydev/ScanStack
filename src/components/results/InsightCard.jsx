
import React from "react";
import { CheckCircle2, AlertCircle } from "lucide-react";

const InsightCard = ({ type, title, data = [] }) => {
  const validData = Array.isArray(data) ? data : [];

  const cardStyles = {
    strength: "bg-green-50 border-green-200",
    improvement: "bg-amber-50 border-amber-200",
    critical: "bg-red-50 border-red-200",
  };

  const styles = cardStyles[type] || "bg-gray-50 border-gray-200";

  return (
    <section
      className={`w-full md:w-1/3 rounded-2xl p-4 border ${styles}`}
      aria-label={title}
    >
      <h3 className="text-xl font-bold mb-4">{title}</h3>

      {validData.length === 0 ? (
        <p className="text-sm text-gray-500">
          {type === "critical"
            ? "No critical issues identified."
            : type === "strength"
            ? "No strengths available."
            : "No improvements suggested."}
        </p>
      ) : (
        <ul className="space-y-2">
          {validData.map((item, index) => {
            const label =
              typeof item === "string"
                ? item
                : item?.label;

            if (!label) return null;

            return (
              <li
                key={`${label}-${index}`}
                className="flex items-start gap-2"
              >
                {type === "strength" && (
                  <CheckCircle2
                    className="w-4 h-4 text-green-600 mt-0.5 shrink-0"
                    aria-hidden="true"
                  />
                )}

                {type === "improvement" && (
                  <span
                    className="w-4 h-4 mt-0.5 shrink-0 flex items-center justify-center"
                    aria-hidden="true"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
                  </span>
                )}

                {type === "critical" && (
                  <AlertCircle
                    className="w-4 h-4 text-red-600 mt-0.5 shrink-0"
                    aria-hidden="true"
                  />
                )}

                <span className="text-sm text-gray-700 break-words">
                  {label}
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
};

export default InsightCard;
