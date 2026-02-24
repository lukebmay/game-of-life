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
import FieldSet from "@ui/FieldSet";
import clsx from "clsx";
import React from "react";

const Settings: React.FC = () => {
  const cmpClass = "cmp_settings_debug-info";

  const isDebugInfoVisible = useAppStore((state) => state.isDebugInfoVisible);
  const toggleIsDebugInfoVisible = useAppStore((state) => state.toggleIsDebugInfoVisible);
  const resetIsDebugInfoVisible = useAppStore((state) => state.resetIsDebugInfoVisible);

  const resetHandler = () => {
    resetIsDebugInfoVisible();
  };

  return (
    <FieldSet
      title="Debug Info"
      className={clsx("flex", "flex-row", "justify-around", cmpClass)}
      onReset={resetHandler}
    >
      <label className={clsx("label", "flex", "flex-col")}>
        Show Render Times
        <input
          id="settings_show-debug"
          type="checkbox"
          className={clsx("toggle", "toggle-primary")}
          checked={isDebugInfoVisible}
          onChange={(value_) => toggleIsDebugInfoVisible()}
        />
        {isDebugInfoVisible ? "Yes" : "No"}
      </label>
    </FieldSet>
  );
};

export default Settings;
