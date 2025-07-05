"use client";

import { memo } from "react";
import Link from "next/link";
import { PcCase, User, TicketPlus, Ticket, ClipboardMinus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import Header from "@/components/header";

const HomePage = () => {
    const { user } = useAuth();

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">

            <Header pageTitle="X-Support Dashboard" />
            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Welcome Section */}
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                        Welcome back, {user?.name}! 👋
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400">
                        Here&apos;s what&apos;s happening with your account today.
                    </p>
                </div>

                {/* User Info Card */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    <Card className="shadow-xl border-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                                <User className="h-5 w-5 text-blue-500" />
                                <span>Profile Information</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-600 dark:text-slate-400">Full Name</span>
                                    <span className="text-slate-900 dark:text-slate-100">{user?.name}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-600 dark:text-slate-400">User Data</span>
                                    <span className="text-slate-900 dark:text-slate-100">{`${user?.user_name} - ${user?.id}`}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-600 dark:text-slate-400">Login Status</span>
                                    <span className="px-2 py-1 bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400 ext-xs rounded-full">
                                        Online
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-600 dark:text-slate-400">Account Type</span>
                                    <span className="text-slate-900 dark:text-slate-100">{user?.user_role}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-600 dark:text-slate-400">Last Login</span>
                                    <span className="text-slate-900 dark:text-slate-100">{user?.last_login_time}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="shadow-xl border-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle>Quick Stats</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-600 dark:text-slate-400">New Tickets</span>
                                    <span className="text-slate-900 dark:text-slate-100">0</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-600 dark:text-slate-400">Current Tickets</span>
                                    <span className="text-slate-900 dark:text-slate-100">0</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-600 dark:text-slate-400">Other Tickets</span>
                                    <span className="text-slate-900 dark:text-slate-100">0</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-600 dark:text-slate-400">Closed Tickets</span>
                                    <span className="text-slate-900 dark:text-slate-100">0</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="shadow-xl border-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle>Current Tickets</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-slate-900 dark:text-slate-100">Client 1</span>
                                    <span className="text-sm text-slate-600 dark:text-slate-400">T270625-0200/1</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-slate-900 dark:text-slate-100">Client 2</span>
                                    <span className="text-sm text-slate-600 dark:text-slate-400">T270625-0200/2</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-slate-900 dark:text-slate-100">Client 3</span>
                                    <span className="text-sm text-slate-600 dark:text-slate-400">T270625-0200/3</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Dashboard Content */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <Card className="shadow-xl border-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle>Common Links</CardTitle>
                            <CardDescription>
                                Common tasks and shortcuts
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 gap-4">
                                <Link href="/clientsServerData">
                                    <Button variant="outline" className="h-12 w-full cursor-pointer">
                                        <PcCase className="h-4 w-4 mr-2" />
                                        Clients Server Data
                                    </Button>
                                </Link>
                                <Link href="#">
                                    <Button variant="outline" className="h-12 w-full cursor-pointer">
                                        <TicketPlus className="h-4 w-4 mr-2" />
                                        Current Tickets
                                    </Button>
                                </Link>
                                <Link href="#">
                                    <Button variant="outline" className="h-12 w-full cursor-pointer">
                                        <Ticket className="h-4 w-4 mr-2" />
                                        All Tickets
                                    </Button>
                                </Link>
                                <Link href="#">
                                    <Button variant="outline" className="h-12 w-full cursor-pointer">
                                        <ClipboardMinus className="h-4 w-4 mr-2" />
                                        Tickets Report
                                    </Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );
};

export default memo(HomePage); 