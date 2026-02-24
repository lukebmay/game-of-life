import clsx from "clsx";
import React from "react";

const Brand: React.FC = () => {
  const cmpClass = "cmp_brand";

  return (
    <div className={clsx("flex", "flex-row", "text-3xl", "justify-around", cmpClass)}>
      Conway's Game of Life
    </div>
  );
};

export default Brand;

