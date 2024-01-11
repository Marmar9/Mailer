// app/providers.tsx
"use client";
import { ThemeProvider } from "next-themes";
import React from "react";

export function NEXTThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}
