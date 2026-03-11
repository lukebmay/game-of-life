import { type SvgIconProps } from "@svg/svgIcon";
import clsx from "clsx";
import React from "react";

const SvgIcon: React.FC<SvgIconProps> = ({ size = "1.5rem", className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    className={clsx(className)}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 6H20M4 12H20M4 18H20" />
  </svg>
);

export default SvgIcon;
