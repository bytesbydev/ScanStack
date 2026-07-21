
import React from "react";
import {
  Target,
  Eye,
  FileCheck,
  TrendingUp,
} from "lucide-react";

import ProgressBar from "../common/ProgressBar";

const getScore = (value) => {
  const score = Number(value);

  if (!Number.isFinite(score)) return 0;

  return Math.min(100, Math.max(0, score));
};

const StatsCards = ({ statsData = {} }) => {
  const atsScore = getScore(statsData?.atsScore);
  const readabilityScore = getScore(statsData?.readabilityScore);
  const keywordMatch = getScore(statsData?.keywordMatch);

  const wordCount = Number(statsData?.wordCount);
  const safeWordCount =
    Number.isFinite(wordCount) && wordCount >= 0
      ? wordCount
      : 0;

  const cards = [
    {
      title: "ATS Score",
      value: `${atsScore}%`,
      icon: <Target className="size-4 text-blue-600" />,
      progress: atsScore,
      description:
        atsScore >= 80
          ? "Good"
          : atsScore >= 60
          ? "Fair"
          : "Needs work",
    },
    {
      title: "Readability",
      value: `${readabilityScore}%`,
      icon: <Eye className="size-4 text-green-600" />,
      progress: readabilityScore,
      description: "Easy to scan",
    },
    {
      title: "Word Count",
      value: safeWordCount,
      icon: <FileCheck className="size-4 text-amber-600" />,
      description: "Optimal: 400–600",
    },
    {
      title: "Keyword Match",
      value: `${keywordMatch}%`,
      icon: <TrendingUp className="size-4 text-purple-600" />,
      progress: keywordMatch,
      description: "Compared with job requirements",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.title}
          className="rounded-2xl border border-gray-200 bg-white p-4"
        >
          <div className="mb-2 flex items-center gap-2">
            {card.icon}

            <h4 className="text-sm font-medium text-gray-700">
              {card.title}
            </h4>
          </div>

          <p className="mb-2 text-3xl font-semibold text-gray-900">
            {card.value}
          </p>

          {"progress" in card && (
            <ProgressBar progress={card.progress} />
          )}

          <p className="mt-2 text-xs text-gray-600">
            {card.description}
          </p>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
