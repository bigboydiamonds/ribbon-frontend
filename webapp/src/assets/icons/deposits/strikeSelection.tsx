import React from "react";

type SVGProps = React.SVGAttributes<SVGElement>;

export const ChartWaves: React.FC<SVGProps & { baseColor: string }> = ({
  baseColor,
  ...props
}) => (
  <svg
    width="459"
    height="64"
    viewBox="0 0 459 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0 18.2099L6.5025 21.4806C12.6225 24.7514 25.6275 31.2928 38.25 34.5635C50.8725 37.8342 63.8775 37.8342 76.5 40.0147C89.1225 42.1952 102.127 46.5562 114.75 43.2854C127.372 40.0147 140.378 29.1123 153 24.7514C165.622 20.3904 178.628 22.5709 191.25 19.3002C203.872 16.0294 216.878 7.30753 229.5 2.94657C242.122 -1.41439 255.128 -1.41439 267.75 6.21729C280.372 13.849 293.378 29.1123 306 32.383C318.622 35.6538 331.628 26.9318 344.25 25.8416C356.872 24.7514 369.878 31.2928 382.5 31.2928C395.122 31.2928 408.128 24.7514 420.75 24.7514C433.372 24.7514 446.378 31.2928 452.497 34.5635L459 37.8342V64H452.497C446.378 64 433.372 64 420.75 64C408.128 64 395.122 64 382.5 64C369.878 64 356.872 64 344.25 64C331.628 64 318.622 64 306 64C293.378 64 280.372 64 267.75 64C255.128 64 242.122 64 229.5 64C216.878 64 203.872 64 191.25 64C178.628 64 165.622 64 153 64C140.378 64 127.372 64 114.75 64C102.127 64 89.1225 64 76.5 64C63.8775 64 50.8725 64 38.25 64C25.6275 64 12.6225 64 6.5025 64H0V18.2099Z"
      fill="url(#paint0_linear)"
    />
    <defs>
      <linearGradient
        id="paint0_linear"
        x1="242.5"
        y1="3.21732e-06"
        x2="243.5"
        y2="64"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor={baseColor} stopOpacity="0.4" />
        <stop offset="1" stopColor={baseColor} stopOpacity="0.08" />
      </linearGradient>
    </defs>
  </svg>
);
