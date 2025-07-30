"use client";
import { useCallback, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { AxiosError } from "axios";
import useFormManager from "@/hooks/useFormManager";
import useFetch from "@/hooks/useFetch";
import LoadingSpinner from "@/components/loading-spinner"
import { RecordWithAnyValue } from "@/interfaces/global";
import { AuthProviderContext } from "./constants"
import { AuthProviderProps } from "./interface"

interface ErrorResponse {
    error: string;
}

const AuthProvider = ({
    children
}: AuthProviderProps) => {
    const router = useRouter();
    const pathname = usePathname();

    const {
        values: {
            user,
            authLoading
        },
        handleChange,
        handleChangeMultiInputs,
    } = useFormManager({
        initialValues: {
            user: null,
            error: null,
            authLoading: true,
        },
    });

    // Redirect to root if not authenticated, but only on non-root pages
    useEffect(() => {
        if (pathname !== '/' && !authLoading && !user) {
            router.push('/');
        }
    }, [authLoading, pathname, router, user]);

    const handleUserResponse = useCallback(
        (response: RecordWithAnyValue | unknown, error: unknown) => {
            if (error) {
                const axiosError = error as AxiosError;
                if (axiosError.response?.status === 401) {
                    handleChange("user", null);
                    handleChangeMultiInputs({
                        user: null,
                    });
                } else {
                    handleChangeMultiInputs({
                        error:
                            (axiosError.response?.data as ErrorResponse)?.error ||
                            axiosError.message ||
                            "An error occurred",
                        user: null,
                    });
                }
            } else {
                handleChange("user", (response as RecordWithAnyValue)?.user);
            }
            handleChange("authLoading", false);
        },
        [handleChange, handleChangeMultiInputs]
    );

    const { runQuery } = useFetch({
        endpoint: "auth/me",
        callOnFirstRender: true,
        onResponse: handleUserResponse,
    });

    // Don't render children if not authenticated and not on root
    useEffect(() => {
        if (pathname === '/' && user && !authLoading) {
            router.push('/home')
        }
    }, [authLoading, pathname, router, user])

    if (authLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
                <LoadingSpinner />
            </div>
        );
    }

    const disableLogin = authLoading || user

    return (
        <AuthProviderContext.Provider value={{
            ...user,
            refetch: runQuery,
            disableLogin
        }}>
            {children}
        </AuthProviderContext.Provider>
    )
}

export default AuthProvider