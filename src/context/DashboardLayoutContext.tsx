import { DashboardLayoutContextProps } from "@/types/main";
import React from "react";
export const DashboardLayoutContext =
  React.createContext<DashboardLayoutContextProps>({
    isOpened: false,
    setIsOpened: () => {},
  });
