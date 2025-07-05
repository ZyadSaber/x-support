"use client";

import { useState, useEffect } from "react";
import { type Theme, getTheme, setTheme, getEffectiveTheme } from "@/lib/theme";

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>("system");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setThemeState(getTheme());
  }, []);

  const updateTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    setTheme(newTheme);
  };

  const toggleTheme = () => {
    const currentTheme = getTheme();
    const newTheme: Theme = currentTheme === "light" ? "dark" : "light";
    updateTheme(newTheme);
  };

  const isDark = mounted && getEffectiveTheme() === "dark";

  return {
    theme,
    setTheme: updateTheme,
    toggleTheme,
    isDark,
    mounted,
  };
}
