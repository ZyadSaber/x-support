"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { type Theme, getTheme, setTheme } from "@/lib/theme";
import { ThemeProviderContext } from "./constants"
import { ThemeProviderProps } from "./interface"

const ThemeProvider = ({
    children,
    defaultTheme = "system",
    storageKey = "theme",
    ...props
}: ThemeProviderProps) => {
    const pathname = usePathname();

    useEffect(() => {
        const savedTheme = localStorage.getItem(storageKey) as Theme | null;

        if (savedTheme) {
            setTheme(savedTheme);
        } else if (defaultTheme) {
            setTheme(defaultTheme);
        }
    }, [defaultTheme, storageKey]);

    const value = {
        theme: getTheme(),
        setTheme: (theme: Theme) => {
            localStorage.setItem(storageKey, theme);
            setTheme(theme);
        },
    };

    return (
        <ThemeProviderContext.Provider {...props} value={value}>
            {children}
        </ThemeProviderContext.Provider>
    );
}

export default ThemeProvider