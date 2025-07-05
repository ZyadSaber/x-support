"use client";

import { createContext, useContext, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { type Theme, getTheme, setTheme } from "@/lib/theme";


type ThemeProviderProps = {
    children: React.ReactNode;
    defaultTheme?: Theme;
    storageKey?: string;
};

type ThemeProviderState = {
    theme: Theme;
    setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
    theme: "system",
    setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
    children,
    defaultTheme = "system",
    storageKey = "theme",
    ...props
}: ThemeProviderProps) {
    const router = useRouter();
    const pathname = usePathname();
    const { user, isLoading: authLoading } = useAuth();

    useEffect(() => {
        const savedTheme = localStorage.getItem(storageKey) as Theme | null;

        if (savedTheme) {
            setTheme(savedTheme);
        } else if (defaultTheme) {
            setTheme(defaultTheme);
        }
    }, [defaultTheme, storageKey]);

    // Redirect to root if not authenticated, but only on non-root pages
    useEffect(() => {
        if (pathname !== '/' && !authLoading && !user) {
            router.push('/');
        }
    }, [authLoading, user, router, pathname]);

    const value = {
        theme: getTheme(),
        setTheme: (theme: Theme) => {
            localStorage.setItem(storageKey, theme);
            setTheme(theme);
        },
    };

    if (authLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    // Don't render children if not authenticated and not on root
    if (pathname !== '/' && !user && !authLoading) {
        return null;
    }

    return (
        <ThemeProviderContext.Provider {...props} value={value}>
            {children}
        </ThemeProviderContext.Provider>
    );
}

export const useThemeProvider = () => {
    const context = useContext(ThemeProviderContext);

    if (context === undefined)
        throw new Error("useThemeProvider must be used within a ThemeProvider");

    return context;
}; 