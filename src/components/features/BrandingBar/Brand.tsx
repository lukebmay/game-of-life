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

const Brand: React.FC = () => {
  const cmpClass = "cmp_brand";

  return (
    <div
      className={clsx(
        "flex-1 text-center whitespace-nowrap font-bold p-2",
        "tracking-tight", // tighten space between letters
        "text-[clamp(1.25rem,5.2vw,1.875rem)]", // scale font instead of wrapping
        cmpClass,
      )}
    >
      Conway's Game of Life
    </div>
  );
};

export default Brand;
