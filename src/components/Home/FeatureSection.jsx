
import React from "react";
import FeaturesCard from "./FeaturesCard";
import AiIcon from "../../assets/image1.png";
import AtsIcon from "../../assets/image2.png";

const features = [
  {
    heading: "What We Analyze",
    description:
      "Resume content, ATS compatibility, skill detection, formatting, and industry-relevant keywords.",
    icon: AiIcon,
  },
  {
    heading: "Your Privacy",
    description:
      "Your resume is used for analysis. Review how your data is processed before uploading sensitive personal information.",
    icon: AtsIcon,
  },
];

const FeatureSection = () => {
  return (
    <section
      className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-10 sm:mt-12 px-3 sm:px-0"
      aria-label="Features and privacy information"
    >
      {features.map((item) => (
        <FeaturesCard
          key={item.heading}
          title={item.heading}
          description={item.description}
          icon={item.icon}
        />
      ))}
    </section>
  );
};

export default FeatureSection;
