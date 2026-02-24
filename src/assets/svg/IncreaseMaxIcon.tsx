import { type SvgIconProps } from "@svg/svgIcon";
import React from "react";

const SvgIcon: React.FC<SvgIconProps> = ({ size = "1.5rem", className, ...rest }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    className={`w-[${size}] h-[${size}] ${className}`}
    fill="none"
    {...rest}
  >
    <path d="M13 9H10V16H6V9L3 9V8L8 3L13 8V9Z" fill="currentColor" />
    <path d="M14 2H2V0H14V2Z" fill="currentColor" />
  </svg>
);

export default SvgIcon;
