"use client"

import { memo, useCallback } from "react";
import Image from "next/image";
import NextLink from "next/link";
import { Button } from "@/components/ui/button";
import { LogOut, Bell } from "lucide-react";
import api from "@/lib/axios";
import { ThemeToggle } from "@/components/theme/themeToggle";
import useAuth from "@/components/auth/hooks/useAuth";
import { useRouter } from "next/navigation";

interface HeaderTitleProps {
    pageTitle: string
}

const Header = ({ pageTitle }: HeaderTitleProps) => {
    const router = useRouter()
    const { refetch: refetchAuth } = useAuth();

    const handleLogout = useCallback(async () => {
        await api.post('/auth/logout');
        refetchAuth();
        router.push('/');
    }, [refetchAuth, router])

    return (
        <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <NextLink href="/home">
                        <div className="flex items-center space-x-4">
                            <Image src="/logo.svg" alt="logo" width={40} height={40} />
                            <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                                {pageTitle}
                            </h1>
                        </div>
                    </NextLink>
                    <div className="flex items-center space-x-4">
                        <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
                            <Bell className="h-5 w-5" />
                        </button>
                        <ThemeToggle />
                        <Button
                            onClick={handleLogout}
                            variant="outline"
                            size="sm"
                            className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800"
                        >
                            <LogOut className="h-4 w-4 mr-2" />
                            Logout
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default memo(Header)