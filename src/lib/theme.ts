"use client";

export type Theme = "dark" | "light" | "system";

export function getTheme(): Theme {
  if (typeof window === "undefined") {
    return "system";
  }
  return (localStorage.getItem("theme") as Theme) || "system";
}

export function setTheme(theme: Theme) {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem("theme", theme);

  const root = document.documentElement;
  root.classList.remove("light", "dark");

  if (theme === "system") {
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";
    root.classList.add(systemTheme);
  } else {
    root.classList.add(theme);
  }
}

export function getSystemTheme(): "light" | "dark" {
  if (typeof window === "undefined") {
    return "light";
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function getEffectiveTheme(): "light" | "dark" {
  const theme = getTheme();
  if (theme === "system") {
    return getSystemTheme();
  }
  return theme;
}
