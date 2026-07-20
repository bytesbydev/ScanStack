
import React from "react";
import { AlertCircle } from "lucide-react";

const priorityStyles = {
  high: {
    icon: "text-red-600",
    badge: "border-red-200 bg-red-50 text-red-700",
  },
  medium: {
    icon: "text-amber-500",
    badge: "border-amber-200 bg-amber-50 text-amber-700",
  },
  low: {
    icon: "text-blue-500",
    badge: "border-blue-200 bg-blue-50 text-blue-700",
  },
};

const SuggestionCard = ({ suggestions = {}, priority }) => {
  const level = priority?.toLowerCase() || "high";
  const styles = priorityStyles[level] || priorityStyles.high;

  const {
    title,
    category,
    timeToFix,
    impact,
    before,
    after,
  } = suggestions || {};

  return (
    <article className="w-full space-y-4 rounded-2xl border border-gray-200 bg-white p-4 sm:p-5">
      {/* Title */}
      <div className="flex items-start gap-3">
        <AlertCircle
          aria-hidden="true"
          className={`mt-1 h-5 w-5 shrink-0 ${styles.icon}`}
        />

        <h3 className="text-sm font-semibold leading-snug text-gray-900 sm:text-base">
          {title || "Resume improvement suggestion"}
        </h3>
      </div>

      {/* Metadata */}
      <div className="flex flex-wrap items-center gap-2 text-xs sm:gap-3 sm:text-sm">
        <span
          className={`rounded-md border px-2 py-1 font-medium capitalize ${styles.badge}`}
        >
          {level} priority
        </span>

        {category && (
          <span className="rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-slate-700">
            {category}
          </span>
        )}

        {timeToFix && (
          <span className="text-gray-500">
            Estimated time: {timeToFix}
          </span>
        )}
      </div>

      {/* Impact */}
      {impact && (
        <p className="text-sm leading-relaxed text-gray-600">
          {impact}
        </p>
      )}

      {/* Before and After */}
      {(before || after) && (
        <div className="space-y-3">
          {before && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-3">
              <p className="mb-1 text-xs font-medium text-red-700">
                Before
              </p>

              <p className="whitespace-pre-wrap break-words text-sm text-gray-700">
                {before}
              </p>
            </div>
          )}

          {after && (
            <div className="rounded-lg border border-green-200 bg-green-50 p-3">
              <p className="mb-1 text-xs font-medium text-green-700">
                After
              </p>

              <p className="whitespace-pre-wrap break-words text-sm text-gray-700">
                {after}
              </p>
            </div>
          )}
        </div>
      )}
    </article>
  );
};

export default SuggestionCard;
