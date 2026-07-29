import React from "react";
import LoaderStep from "./LoaderStep";
import ProgressBar from "../common/ProgressBar";
import {
  FileSearch,
  Brain,
  Lightbulb,
} from "lucide-react";

const steps = [
  {
    icon: FileSearch,
    title: "Parsing Resume",
    time: "1–2s",
  },
  {
    icon: Brain,
    title: "Analyzing Skills",
    time: "1–2s",
  },
  {
    icon: Lightbulb,
    title: "Generating Insights",
    time: "1–2s",
  },
];

const getProgress = (value) => {
  const number = Number(value);

  if (!Number.isFinite(number)) return 0;

  return Math.min(100, Math.max(0, number));
};

const AnaylsisLoader = ({ progress = 0 }) => {
  const safeProgress = getProgress(progress);

  const currentStep =
    safeProgress >= 89
      ? 3
      : safeProgress >= 42
      ? 2
      : safeProgress >= 10
      ? 1
      : 0;

  return (
    <section
      className="w-full"
      aria-label="Resume analysis progress"
    >
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">
          Analyzing Your Resume
        </h2>

        <p className="text-sm sm:text-base text-gray-500 mt-1">
          Processing your resume...
        </p>
      </div>

      {/* Steps */}
      <div className="space-y-3">
        {steps.map((step, index) => {
          const isComplete = currentStep > index;
          const isActive = currentStep === index;

          return (
            <LoaderStep
              key={step.title}
              icon={step.icon}
              title={step.title}
              time={step.time}
              status={
                isComplete
                  ? "completed"
                  : isActive
                  ? "active"
                  : "pending"
              }
            />
          );
        })}
      </div>

      {/* Progress */}
      <div className="mt-6">
        <div className="flex justify-between mb-2 text-sm sm:text-base">
          <span className="font-medium">Progress</span>

          <span className="font-semibold">
            {Math.round(safeProgress)}%
          </span>
        </div>

        <div
          role="progressbar"
          aria-label="Resume analysis progress"
          aria-valuenow={Math.round(safeProgress)}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <ProgressBar progress={safeProgress} />
        </div>
      </div>
    </section>
  );
};

export default AnaylsisLoader;