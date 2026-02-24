import { type SvgIconProps } from "@svg/svgIcon";
import React from "react";

const SvgIcon: React.FC<SvgIconProps> = ({ size = "1.5rem", className, ...rest }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    className={`w-[${size}] h-[${size}] ${className}`}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    fill="none"
    color="currentColor"
    {...rest}
  >
    <path d="M16 4L19 7L16 10" /> <path d="M4 7L18 7" /> <path d="M7 20L4 17L7 14" />{" "}
    <path d="M19 17L5 17" />
  </svg>
);

export default SvgIcon;
