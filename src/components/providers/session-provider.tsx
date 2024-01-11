"use client";
import { SessionProvider } from "next-auth/react";

export default function NEXTSessionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SessionProvider>{children}</SessionProvider>;
}
