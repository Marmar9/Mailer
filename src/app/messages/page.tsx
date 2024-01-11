"use client";
import { useContext } from "react";
import MailsTable from "./mailsTabel";
import { Button } from "@/components/ui/button";
import { DashboardLayoutContext } from "@/context/DashboardLayoutContext";
import { useSession } from "next-auth/react";
export default function Page() {
  const { setIsOpened, isOpened } = useContext(DashboardLayoutContext);
  const { data } = useSession();
  console.log(data?.user?.name);
  return (
    <>
      <MailsTable />
      <Button
        className=" fixed bottom-16 right-10 w-36 h-12 sm:hidden block"
        onClick={() => {
          setIsOpened(true);
        }}
      >
        Compose
      </Button>
    </>
  );
}
