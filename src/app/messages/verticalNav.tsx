"use client";
import { Button } from "@/components/ui/button";

import { useContext } from "react";
import { DashboardLayoutContext } from "@/context/DashboardLayoutContext";
import { trpc } from "@/lib/trpc/trpc-client";

export default function VerticalNav() {
  const { setIsOpened } = useContext(DashboardLayoutContext);
  const { deleteMessageProcedure } = trpc;
  const data = deleteMessageProcedure.useQuery({ id: "sadads" });
  console.log(data.data);
  return (
    <div className="w-72 sm:block hidden">
      <div>
        <div className="flex justify-center">
          <Button className="w-2/4 h-12" onClick={() => setIsOpened(true)}>
            Compose
          </Button>
        </div>
      </div>
    </div>
  );
}
