import { type SvgIconProps } from "@svg/svgIcon";
import React from "react";

const SvgIcon: React.FC<SvgIconProps> = ({ size = "1.5rem", className, ...rest }) => (
  <svg
    width={size}
    height={size}
    viewBox="-0.5 0 7 7"
    xmlns="http://www.w3.org/2000/svg"
    className={`w-[${size}] h-[${size}] ${className}`}
    fill="currentColor"
    {...rest}
  >
    <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g transform="translate(-347.000000, -3766.000000)" fill="currentColor">
        <g id="icons" transform="translate(56.000000, 160.000000)">
          <path d="M296.494737,3608.57322 L292.500752,3606.14219 C291.83208,3605.73542 291,3606.25002 291,3607.06891 L291,3611.93095 C291,3612.7509 291.83208,3613.26444 292.500752,3612.85767 L296.494737,3610.42771 C297.168421,3610.01774 297.168421,3608.98319 296.494737,3608.57322"></path>
        </g>
      </g>
    </g>
  </svg>
);

export default SvgIcon;

