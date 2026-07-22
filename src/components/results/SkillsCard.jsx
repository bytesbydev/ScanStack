
import React from "react";
import { TrendingUp } from "lucide-react";

const EMPTY_ARRAY = [];

const getLevelColor = (level) => {
  switch (level) {
    case "Expert":
      return "bg-blue-100 text-blue-700 border-blue-200";
    case "Advanced":
      return "bg-green-100 text-green-700 border-green-200";
    case "Intermediate":
      return "bg-yellow-100 text-yellow-700 border-yellow-200";
    case "Beginner":
      return "bg-gray-100 text-gray-700 border-gray-200";
    default:
      return "bg-gray-100 text-gray-700 border-gray-200";
  }
};

const getSeverityColor = (severity) => {
  switch (severity) {
    case "High":
      return "bg-red-100 text-red-700 border-red-300";
    case "Medium":
      return "bg-yellow-100 text-yellow-700 border-yellow-300";
    case "Low":
      return "bg-green-100 text-green-700 border-green-300";
    default:
      return "bg-gray-100 text-gray-700 border-gray-300";
  }
};

const getProficiency = (value) => {
  const proficiency = Number(value);

  if (!Number.isFinite(proficiency)) return 0;

  return Math.min(100, Math.max(0, proficiency));
};

const SkillItem = ({ skill }) => {
  const proficiency = getProficiency(skill?.proficiency);
  const label = skill?.label || "Unnamed skill";
  const level = skill?.level || "Not rated";

  return (
    <article className="border-2 border-gray-300 rounded-2xl p-4">
      <div className="flex justify-between items-center gap-3">
        <div className="flex items-center gap-2 min-w-0">
          <h3 className="font-medium break-words">{label}</h3>
          <TrendingUp
            className="size-4 text-green-600 shrink-0"
            aria-hidden="true"
          />
        </div>

        <span
          className={`px-2 py-1 text-xs border rounded-full shrink-0 ${getLevelColor(
            level
          )}`}
        >
          {level}
        </span>
      </div>

      <div className="flex items-center gap-4 mt-4">
        <div
          className="w-full bg-gray-200 h-2 rounded-full overflow-hidden"
          role="progressbar"
          aria-label={`${label} proficiency`}
          aria-valuenow={proficiency}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            style={{ width: `${proficiency}%` }}
            className="bg-gray-950 h-2 rounded-full transition-all"
          />
        </div>

        <span className="font-semibold shrink-0">
          {proficiency}%
        </span>
      </div>
    </article>
  );
};

const SkillsCard = ({
  title,
  icon,
  skills = EMPTY_ARRAY,
}) => {
  const isRecommended = title === "Recommended Skills to add";
  const validSkills = Array.isArray(skills) ? skills : [];

  return (
    <section
      className="border-2 border-gray-300 rounded-2xl p-5"
      aria-label={title}
    >
      <div className="flex items-center gap-3 mb-4">
        {icon}
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>

      {validSkills.length === 0 ? (
        <p className="text-sm text-gray-500 py-3">
          {isRecommended
            ? "No additional skills to recommend right now."
            : "No skills available to display."}
        </p>
      ) : isRecommended ? (
        <div className="mt-2 border-2 border-yellow-300 bg-yellow-50 rounded-2xl p-4">
          <p className="text-gray-700 mb-4">
            These skills are frequently requested in job postings
            for similar roles.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {validSkills.map((skill, index) => (
              <div
                key={`${skill?.label || "skill"}-${skill?.severity || "none"}-${index}`}
                className="flex items-center justify-between gap-3 border border-yellow-300 rounded-xl p-3 bg-white"
              >
                <h3 className="font-medium break-words">
                  {skill?.label || "Unnamed skill"}
                </h3>

                <span
                  className={`px-3 py-1 text-sm border rounded-full shrink-0 ${getSeverityColor(
                    skill?.severity
                  )}`}
                >
                  {skill?.severity || "Not rated"}
                </span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {validSkills.map((skill, index) => (
            <SkillItem
              key={`${skill?.label || "skill"}-${skill?.level || "none"}-${index}`}
              skill={skill}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default SkillsCard;
