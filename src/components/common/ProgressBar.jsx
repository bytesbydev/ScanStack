
import React from "react";

const ProgressBar = ({ progress = 0 }) => {
  const value = Number(progress);

  const safeProgress = Number.isFinite(value)
    ? Math.min(100, Math.max(0, value))
    : 0;

  return (
    <div
      className="w-full h-2 sm:h-2.5 bg-gray-200 overflow-hidden rounded-full"
      role="progressbar"
      aria-label="Progress"
      aria-valuenow={safeProgress}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className="h-full bg-linear-to-r from-indigo-600 to-indigo-500 rounded-full transition-all duration-300 ease-in-out"
        style={{ width: `${safeProgress}%` }}
      />
    </div>
  );
};

export default ProgressBar;
