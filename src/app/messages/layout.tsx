"use client";
import Navbar from "@/components/navbar";
import VerticalNav from "./verticalNav";
import React from "react";
import { DashboardLayoutContext } from "@/context/DashboardLayoutContext";
import { CreateMessagePopover } from "./createMessagePopover";
export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
  currentPath: string;
}) {
  const [isOpened, setIsOpened] = React.useState<boolean>(false);

  return (
    <DashboardLayoutContext.Provider value={{ isOpened, setIsOpened }}>
      <section className=" flex flex-col h-full box-border">
        <Navbar />
        <div className="flex-1 flex h-full">
          <VerticalNav />
          {children}
          {isOpened && <CreateMessagePopover />}
        </div>
      </section>
    </DashboardLayoutContext.Provider>
  );
}
