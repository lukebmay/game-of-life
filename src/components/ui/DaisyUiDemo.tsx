import clsx from "clsx";
import React from "react";

const DaisyUiDemo: React.FC = () => {
  const cmpClass = "cmp_controls";

  const onClick = () => {
    console.log("foo");
  };

  return (
    <div
      className={clsx(
        "flex",
        "flex-row",
        "justify-around",
        "self-strecch",
        "p-3",
        "gap-2",
        cmpClass,
      )}
    >
      <button className="btn" onClick={onClick}>
        Btn
      </button>
      <button className="btn btn-primary" onClick={onClick}>
        Primary
      </button>
      <button className="btn btn-secondary" onClick={onClick}>
        Secondary
      </button>
      <button className="btn btn-accent" onClick={onClick}>
        Accent
      </button>
      <button className="btn btn-info" onClick={onClick}>
        Info
      </button>
      <button className="btn btn-success" onClick={onClick}>
        Success
      </button>
      <button className="btn btn-warning" onClick={onClick}>
        Warning
      </button>
      <button className="btn btn-error" onClick={onClick}>
        Error
      </button>
    </div>
  );
};

export default DaisyUiDemo;

