"use client";

import { createContext, useContext, useState } from "react";

type SidebarContextValue = {
  open: boolean;
  toggle: () => void;
  close: () => void;
};

const SidebarContext = createContext<SidebarContextValue | null>(null);

export function AdminSidebarProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <SidebarContext.Provider
      value={{
        open,
        toggle: () => setOpen((v) => !v),
        close: () => setOpen(false),
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export function useAdminSidebar() {
  const ctx = useContext(SidebarContext);
  if (!ctx) {
    throw new Error("useAdminSidebar must be used within AdminSidebarProvider");
  }
  return ctx;
}
