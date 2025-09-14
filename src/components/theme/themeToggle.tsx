"use client";

import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

interface ThemeToggleProps {
    className?: string;
    variant?: "default" | "outline" | "ghost";
    size?: "default" | "sm" | "lg" | "icon";
}

export function ThemeToggle({
    className = "bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800",
    variant = "outline",
    size = "icon"
}: ThemeToggleProps) {
    const { isDark, toggleTheme, mounted } = useTheme();

    if (!mounted) {
        return (
            <Button
                variant={variant}
                size={size}
                className={className}
                disabled
            >
                <Sun className="h-4 w-4" />
            </Button>
        );
    }

    return (
        <Button
            variant={variant}
            size={size}
            onClick={toggleTheme}
            className={className}
            aria-label="Toggle theme"
        >
            {isDark ? (
                <Sun className="h-4 w-4" />
            ) : (
                <Moon className="h-4 w-4" />
            )}
        </Button>
    );
} 