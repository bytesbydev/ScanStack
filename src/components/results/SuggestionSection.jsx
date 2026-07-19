
import React, { useState } from "react";
import { Lightbulb } from "lucide-react";
import SuggestionCard from "./SuggestionCard";

const priorities = ["high", "medium", "low"];

const priorityInfo = {
  high: {
    message:
      "High priority items have the most significant impact on recruiter perception and ATS compatibility. Address these first.",
    style: "border-red-400 bg-red-50",
  },
  medium: {
    message:
      "Medium priority items improve resume quality and help you stand out from other candidates.",
    style: "border-amber-400 bg-amber-50",
  },
  low: {
    message:
      "Low priority items provide small refinements for a more polished professional impression.",
    style: "border-blue-400 bg-blue-50",
  },
};

const SuggestionSection = ({ result }) => {
  const suggestions = Array.isArray(result?.suggestions)
    ? result.suggestions
    : [];

  const [selected, setSelected] = useState("high");

  const filteredSuggestions = suggestions.filter(
    (item) =>
      item.priority?.toLowerCase() === selected
  );

  const totalTime = filteredSuggestions.reduce((sum, item) => {
    const minutes = Number.parseInt(item.timeToFix, 10);
    return sum + (Number.isFinite(minutes) && minutes > 0 ? minutes : 0);
  }, 0);

  const info = priorityInfo[selected];

  return (
    <section className="w-full" aria-labelledby="suggestions-heading">
      {/* Header */}
      <div className="mb-6 flex items-start gap-3 sm:items-center">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-600">
          <Lightbulb className="h-5 w-5 text-white" />
        </div>

        <div>
          <h3
            id="suggestions-heading"
            className="text-lg font-semibold text-gray-900 sm:text-xl"
          >
            Improvement Suggestions
          </h3>

          <p className="text-sm text-gray-500">
            Prioritized recommendations with before/after examples
          </p>
        </div>
      </div>

      {/* Priority Tabs */}
      <div
        role="group"
        aria-label="Filter suggestions by priority"
        className="flex flex-col gap-2 rounded-2xl bg-gray-200 p-2 sm:flex-row"
      >
        {priorities.map((priority) => (
          <button
            key={priority}
            type="button"
            onClick={() => setSelected(priority)}
            aria-pressed={selected === priority}
            className={`w-full rounded-xl px-3 py-2 text-sm font-medium capitalize transition sm:w-1/3 ${
              selected === priority
                ? "bg-white shadow"
                : "bg-transparent hover:bg-white/50"
            }`}
          >
            {priority} priority
          </button>
        ))}
      </div>

      {/* Priority Information */}
      <div
        aria-live="polite"
        className={`mt-6 rounded-2xl border p-4 text-sm sm:text-base ${info.style}`}
      >
        {info.message}
      </div>

      {/* Suggestions */}
      <div className="mt-6 flex flex-col space-y-4">
        {filteredSuggestions.length > 0 ? (
          filteredSuggestions.map((item, index) => (
            <SuggestionCard
              key={`${selected}-${item.title || "suggestion"}-${index}`}
              suggestions={item}
              priority={item.priority}
            />
          ))
        ) : (
          <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 px-4 py-8 text-center">
            <Lightbulb className="mx-auto h-8 w-8 text-gray-400" />

            <h4 className="mt-3 font-medium text-gray-800">
              No {selected} priority suggestions
            </h4>

            <p className="mt-1 text-sm text-gray-500">
              There are no suggestions in this category for your resume.
            </p>
          </div>
        )}
      </div>

      {/* Summary */}
      <div className="mt-6 flex flex-col gap-2 border-t border-gray-200 pt-4 text-sm text-gray-600 sm:flex-row sm:items-center sm:justify-between">
        <p aria-live="polite">
          <span className="font-medium text-gray-900">
            {filteredSuggestions.length}
          </span>{" "}
          {selected} priority{" "}
          {filteredSuggestions.length === 1 ? "item" : "items"}
        </p>

        <p>
          Estimated time to fix:{" "}
          <span className="font-medium text-gray-900">
            {totalTime} minutes
          </span>
        </p>
      </div>
    </section>
  );
};

export default SuggestionSection;
