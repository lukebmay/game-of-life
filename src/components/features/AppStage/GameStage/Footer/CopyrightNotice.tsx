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

const CopyrightNotice: React.FC = () => {
  const cmpClass = "cmp_copyright-notice";

  return (
    <div className={clsx("text-center", cmpClass)}>
      <span className="font-bold text-[8px] lg:text-base">
        <span className="lg:block">© 2026 </span>
        <span className="lg:block">Luke Benjamin May </span>
      </span>
      <span className="hidden lg:block text-[10px] text-base-400 mt-0.5">All rights reserved</span>
    </div>
  );
};

export default CopyrightNotice;
