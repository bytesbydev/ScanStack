
import React from "react";
import SkillsCard from "./SkillsCard";
import { AlertCircle, Code2, Users } from "lucide-react";

const SkillsAnalysis = ({ result }) => {
  const technicalSkills = Array.isArray(result?.technicalSkills)
    ? result.technicalSkills
    : [];

  const softSkills = Array.isArray(result?.softSkills)
    ? result.softSkills
    : [];

  const recommendedSkills = Array.isArray(result?.recommendedSkills)
    ? result.recommendedSkills
    : [];

  return (
    <section aria-labelledby="skills-analysis-title">
      <div className="flex items-center gap-3 mb-6">
        <div className="size-10 rounded-lg bg-blue-600 flex items-center justify-center shrink-0">
          <Code2 className="size-5 text-white" aria-hidden="true" />
        </div>

        <div>
          <h2
            id="skills-analysis-title"
            className="text-lg font-semibold text-gray-900"
          >
            Skill Detection & Analysis
          </h2>

          <p className="text-sm text-gray-500">
            Detected skills with estimated proficiency levels
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <SkillsCard
          title="Technical Skills"
          icon={<Code2 className="text-blue-600" aria-hidden="true" />}
          skills={technicalSkills}
        />

        <SkillsCard
          title="Soft Skills"
          icon={<Users className="text-green-600" aria-hidden="true" />}
          skills={softSkills}
        />

        <SkillsCard
          title="Recommended Skills to add"
          icon={<AlertCircle className="text-red-600" aria-hidden="true" />}
          skills={recommendedSkills}
        />
      </div>
    </section>
  );
};

export default SkillsAnalysis;
