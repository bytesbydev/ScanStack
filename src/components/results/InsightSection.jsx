
import React from "react";
import InsightCard from "./InsightCard";

const InsightSection = ({ result }) => {
  const strengths = Array.isArray(result?.strengths)
    ? result.strengths
    : [];

  const improvements = Array.isArray(result?.improvements)
    ? result.improvements
    : [];

  const criticalIssues = Array.isArray(result?.criticalIssues)
    ? result.criticalIssues
    : [];

  return (
    <section
      className="flex flex-col md:flex-row gap-4 mt-6"
      aria-label="Resume insights"
    >
      <InsightCard
        title="Strengths"
        type="strength"
        data={strengths}
      />

      <InsightCard
        title="Improvements"
        type="improvement"
        data={improvements}
      />

      <InsightCard
        title="Critical Issues"
        type="critical"
        data={criticalIssues}
      />
    </section>
  );
};

export default InsightSection;
