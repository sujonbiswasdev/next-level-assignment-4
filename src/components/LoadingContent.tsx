import React from "react";

const LoadingContent = ({ data }: { data: string }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 z-50">
      <div
        role="status"
        className="flex flex-col items-center justify-center"
        aria-live="polite"
        aria-busy="true"
      >
        {/* Professional spinner with overlayed gradient, shadow, and svg */}
        <span className="relative flex h-20 w-20 mb-8">
          <span className="animate-spin absolute h-full w-full rounded-full border-8 border-t-blue-600 border-b-blue-400 border-l-transparent border-r-transparent shadow-lg" />
          <svg
            className="absolute top-0 left-0 h-full w-full"
            viewBox="0 0 80 80"
            fill="none"
          >
            <circle
              cx="40"
              cy="40"
              r="32"
              stroke="url(#spin-gradient)"
              strokeWidth="8"
              opacity="0.25"
            />
            <defs>
              <linearGradient
                id="spin-gradient"
                x1="8"
                y1="8"
                x2="72"
                y2="72"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#60A5FA" />
                <stop offset="1" stopColor="#3B82F6" />
              </linearGradient>
            </defs>
          </svg>
        </span>
        <span className="text-lg sm:text-xl font-semibold text-gray-700 text-center">
          Please wait while we prepare your {data}...
        </span>
      </div>
    </div>
  );
};

export default LoadingContent;