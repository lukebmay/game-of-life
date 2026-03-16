/*
 * Author: Luke Benjamin May
 * Website: lukemay.com
 *
 * Copyright © 2025-2026 Luke B. May. All rights reserved.
 *
 * This is part of my personal portfolio.
 * No permission is granted to copy, modify, distribute, or use this code.
 */
import clsx from "clsx";
import React from "react";
import CopyrightNotice from "./Footer/CopyrightNotice";
import DebugInfo from "./Footer/DebugInfo";
import HelpButton from "./Footer/HelpButton";

const Footer: React.FC = () => {
  const cmpClass = "cmp_footer";

  return (
    <div className={clsx("flex p-0 lg:p-2 gap-2 lg:gap-5 items-around justify-center relative", cmpClass)}>
      <div
        className={clsx(
          "lg:flex-1 flex flex-col lg:flex-row items-around justify-evenly lg:justify-evenly pt-3",
        )}
      >
        <DebugInfo />
        <CopyrightNotice />
      </div>
      <HelpButton className="absolute right-5 lg:right-8 top-1/2 -translate-y-1/2 w-8 h-8 text-primary" />
    </div>
  );
};

export default Footer;
