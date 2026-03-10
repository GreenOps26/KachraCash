"use client";

import { ReactNode } from "react";
import { Toaster } from "sonner";

export function AppProvider({ children }: { children: ReactNode }) {
  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#1F2937",
            color: "#FEF3C7",
            border: "1px solid #EC4899",
          },
        }}
      />
      {children}
    </>
  );
}
