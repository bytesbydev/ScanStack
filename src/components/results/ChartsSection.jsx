
import React, { useMemo } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  RadialLinearScale,
  BarElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

import { Bar, Radar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  RadialLinearScale,
  BarElement,
  Tooltip,
  Legend,
  Filler
);

const getScore = (value) => {
  const score = Number(value);

  if (!Number.isFinite(score)) return 0;

  return Math.min(100, Math.max(0, score));
};

const radarOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "bottom",
    },
  },
  scales: {
    r: {
      beginAtZero: true,
      min: 0,
      max: 100,
      ticks: {
        stepSize: 20,
      },
      pointLabels: {
        font: {
          size: 12,
        },
      },
    },
  },
};

const barOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      min: 0,
      max: 100,
      ticks: {
        stepSize: 20,
      },
    },
  },
};

const ChartsSection = ({
  sectionScores = [],
  industryComparison = [],
}) => {
  const validSectionScores = Array.isArray(sectionScores)
    ? sectionScores.filter(
        (item) => item && typeof item.section === "string"
      )
    : [];

  const validIndustryComparison = Array.isArray(industryComparison)
    ? industryComparison.filter(
        (item) => item && typeof item.aspect === "string"
      )
    : [];

  const sectionChartData = useMemo(
    () => ({
      labels: validSectionScores.map((item) => item.section),
      datasets: [
        {
          label: "Score",
          data: validSectionScores.map((item) =>
            getScore(item.score)
          ),
          backgroundColor: "#2563EB",
          borderRadius: 6,
        },
      ],
    }),
    [validSectionScores]
  );

  const radarChartData = useMemo(
    () => ({
      labels: validIndustryComparison.map((item) => item.aspect),
      datasets: [
        {
          label: "Your Resume",
          data: validIndustryComparison.map((item) =>
            getScore(item.yourScore)
          ),
          backgroundColor: "rgba(37,99,235,0.3)",
          borderColor: "#2563EB",
          borderWidth: 2,
        },
        {
          label: "Industry Avg",
          data: validIndustryComparison.map((item) =>
            getScore(item.industry)
          ),
          backgroundColor: "rgba(16,185,129,0.2)",
          borderColor: "#10B981",
          borderWidth: 2,
        },
      ],
    }),
    [validIndustryComparison]
  );

  return (
    <section
      className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      aria-label="Resume analysis charts"
    >
      {/* Bar Chart */}
      <div className="p-4 sm:p-5 rounded-2xl border border-gray-200 bg-white">
        <h2 className="font-semibold mb-4 text-sm sm:text-base">
          Section Completeness
        </h2>

        {validSectionScores.length > 0 ? (
          <div className="h-64 sm:h-80">
            <Bar
              data={sectionChartData}
              options={barOptions}
              aria-label="Bar chart showing resume section scores"
              role="img"
            />
          </div>
        ) : (
          <p className="h-64 sm:h-80 flex items-center justify-center text-sm text-gray-500">
            No section score data available.
          </p>
        )}
      </div>

      {/* Radar Chart */}
      <div className="p-4 sm:p-5 rounded-2xl border border-gray-200 bg-white">
        <h2 className="font-semibold mb-4 text-sm sm:text-base">
          Industry Benchmark
        </h2>

        {validIndustryComparison.length > 0 ? (
          <div className="h-64 sm:h-80 flex justify-center items-center">
            <Radar
              data={radarChartData}
              options={radarOptions}
              aria-label="Radar chart comparing resume scores with industry averages"
              role="img"
            />
          </div>
        ) : (
          <p className="h-64 sm:h-80 flex items-center justify-center text-sm text-gray-500">
            No industry comparison data available.
          </p>
        )}
      </div>
    </section>
  );
};

export default ChartsSection;
