import React from "react";
import { ThemeToggle } from "../theme/theme-toggle";

export default function HeaderButtons() {
  return (
    <div className="mb-4 flex justify-between items-center">
      <div className="flex items-center space-x-2 ml-auto">
        <ThemeToggle />
      </div>
    </div>
  );
}
