"use client";
import useLocalStorageState from "@/hook/useLocalStorage";
import { createContext, useContext, ReactNode, useMemo } from "react";

interface DarkModeContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const DarkModeContext = createContext<DarkModeContextType | undefined>(
  undefined,
);

export function DarkModeProvider({
  children,
}: {
  readonly children: ReactNode;
}) {
  const root =
    typeof document !== "undefined" ? document.documentElement : null;
  const initial = root?.classList.contains("dark-mode") ?? false;

  const [isDarkMode, setIsDarkMode] = useLocalStorageState(
    "isDarkMode",
    initial,
  );

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const next = !prev;
      if (root) {
        root.classList.toggle("dark-mode", next);
        root.classList.toggle("light-mode", !next);
      }
      return next;
    });
  };

  const value = useMemo(() => ({ isDarkMode, toggleDarkMode }), [isDarkMode]);

  return (
    <DarkModeContext.Provider value={value}>
      {children}
    </DarkModeContext.Provider>
  );
}

export function useDarkMode(): DarkModeContextType {
  const context = useContext(DarkModeContext);
  if (!context)
    throw new Error("useDarkMode must be used within DarkModeProvider");
  return context;
}
