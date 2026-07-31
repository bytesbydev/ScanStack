
import React from "react";

const FeaturesCard = ({ icon, title, description }) => {
  return (
    <article className="flex items-start gap-4 bg-white p-4 sm:p-5 rounded-lg shadow-sm w-full">
      {icon && (
        <img
          src={icon}
          alt=""
          aria-hidden="true"
          className="h-8 w-8 sm:h-10 sm:w-10 shrink-0 object-contain"
          loading="lazy"
        />
      )}

      <div className="min-w-0">
        <h3 className="text-base sm:text-lg font-medium text-gray-900">
          {title}
        </h3>

        <p className="text-sm sm:text-[15px] mt-2 text-gray-600 leading-relaxed">
          {description}
        </p>
      </div>
    </article>
  );
};

export default FeaturesCard;
