/*
 * Author: Luke Benjamin May
 * Website: lukemay.com
 *
 * Copyright © 2025-2026 Luke B. May. All rights reserved.
 *
 * This is part of my personal portfolio.
 * No permission is granted to copy, modify, distribute, or use this code.
 */
import { useAppStore } from "@store/appStore";
import CloseIcon from "@svg/CloseIcon";
import clsx from "clsx";
import React, { useEffect, useRef, useState } from "react";
import Author from "./Help/Author.tsx";
import Instructions from "./Help/Instructions.tsx";
import Project from "./Help/Project.tsx";

const Help: React.FC = () => {
  const cmpClass = "cmp_help";

  const isHelpVisible = useAppStore((state) => state.isHelpVisible);
  const toggleIsHelpVisible = useAppStore((state) => state.toggleIsHelpVisible);

  const modalRef = useRef<HTMLDialogElement>(null);

  type ViewType = "instructions" | "project" | "author";
  const [activeView, setActiveView] = useState<ViewType>("instructions");

  useEffect(() => {
    const modal = modalRef.current;
    if (!modal) return;

    if (isHelpVisible) {
      modal.showModal();
    } else {
      modal.close();
    }
  }, [isHelpVisible]);

  useEffect(() => {
    const modal = modalRef.current;
    if (!modal) return;

    const handleClose = () => {
      if (isHelpVisible) toggleIsHelpVisible();
    };

    modal.addEventListener("close", handleClose);
    return () => modal.removeEventListener("close", handleClose);
  }, [isHelpVisible, toggleIsHelpVisible]);

  return (
    <dialog ref={modalRef} id="help-modal" className={clsx("modal", cmpClass)}>
      <div className={clsx("modal-box", "w-full", "max-w-5xl", "flex", "flex-col", "h-[90vh]")}>
        <div className={clsx("w-full", "pl-3", "pt-3", "pr-3", "relative")}>
          <div className={clsx("absolute", "right-0", "top-0", "text-base-300")}>
            <button
              type="button"
              className={clsx("cursor-pointer", "focus:outline-none")}
              onClick={toggleIsHelpVisible}
            >
              <CloseIcon />
            </button>
          </div>
          <div
            className={clsx(
              "w-full",
              "text-center",
              "flex",
              "flex-row",
              "gap-2",
              "justify-evenly",
              "text-xl",
              "lg:text-2xl",
              "pb-5",
            )}
          >
            <a
              className={clsx(
                activeView === "instructions" && "underline font-bold",
                "cursor-pointer",
              )}
              onClick={() => setActiveView("instructions")}
            >
              Instructions
            </a>
            <a
              className={clsx(activeView === "project" && "underline font-bold", "cursor-pointer")}
              onClick={() => setActiveView("project")}
            >
              Project
            </a>
            <a
              className={clsx(activeView === "author" && "underline font-bold", "cursor-pointer")}
              onClick={() => setActiveView("author")}
            >
              Author
            </a>
          </div>
          <hr className={clsx("text-inherit")} />
        </div>
        <div className="overflow-auto">
          {activeView === "instructions" && <Instructions />}
          {activeView === "project" && <Project />}
          {activeView === "author" && <Author />}
        </div>
      </div>

      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

export default Help;
