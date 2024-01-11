import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

import { TRPCReactQueryProvider } from "@/components/providers/trpc-provider";
import { NEXTThemeProvider } from "@/components/providers/theme-provider";
import { ModeToggle } from "@/components/ModeToggle";
import NEXTSessionProvider from "@/components/providers/session-provider";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NEXTSessionProvider>
          <TRPCReactQueryProvider>
            <NEXTThemeProvider>
              <ModeToggle />
              {children}
              <Toaster />
            </NEXTThemeProvider>
          </TRPCReactQueryProvider>
        </NEXTSessionProvider>
      </body>
    </html>
  );
}
