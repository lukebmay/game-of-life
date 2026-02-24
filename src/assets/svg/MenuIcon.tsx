import { type SvgIconProps } from "@svg/svgIcon";
import React from "react";

const SvgIcon: React.FC<SvgIconProps> = ({ size = "1.5rem", className, ...rest }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    className={`w-[${size}] h-[${size}] ${className}`}
    fill="currentColor"
    {...rest}
  >
    <path
      d="M4 6H20M4 12H20M4 18H20"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default SvgIcon;

