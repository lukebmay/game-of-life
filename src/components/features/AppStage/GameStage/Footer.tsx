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
    <div className={clsx("flex p-2 gap-5 items-around relative", cmpClass)}>
      <div
        className={clsx(
          "flex-1 flex flex-col lg:flex-row items-around justify-center lg:justify-evenly pt-3",
        )}
      >
        <DebugInfo />
        <CopyrightNotice />
      </div>
      <HelpButton className="max-lg:mr-5 lg:absolute lg:right-5 text-primary" />
    </div>
  );
};

export default Footer;
