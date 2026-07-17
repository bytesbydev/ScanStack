
import React from "react";
import Navbar from "../components/common/Navbar";
import HeroSection from "../components/Home/HeroSection";
import UploadBox from "../components/Home/UploadBox";
import FeatureSection from "../components/Home/FeatureSection";

const Home = () => {
  return (
    <div className="home-container w-full">
      <Navbar />

      <main className="w-full">
        <div className="flex w-full justify-center px-4 pb-12 sm:px-6 lg:px-8">
          <div className="w-full max-w-3xl lg:max-w-4xl">
            <HeroSection />
            <UploadBox />
            <FeatureSection />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
