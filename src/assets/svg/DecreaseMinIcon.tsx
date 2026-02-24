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
    <path d="M13 7H10V0H6V7L3 7V8L8 13L13 8V7Z" fill="currentColor" />
    <path d="M14 14H2V16H14V14Z" fill="currentColor" />
  </svg>
);

export default SvgIcon;
