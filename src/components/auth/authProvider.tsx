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

    useEffect(() => {
        if (pathname !== '/' && !authLoading && !user) {
            router.push('/');
        }
    }, [authLoading, pathname, router, user]);

    const handleUserResponse = useCallback(
        (response: RecordWithAnyValue | unknown, error: unknown) => {
            if (error) {
                const axiosError = error as AxiosError;
                handleChangeMultiInputs({
                    error:
                        (axiosError.response?.data as ErrorResponse)?.error ||
                        axiosError.message ||
                        "An error occurred",
                    user: null,
                    authLoading: false
                });
            } else {
                handleChange("user", (response as RecordWithAnyValue)?.user);
                handleChangeMultiInputs({
                    user: (response as RecordWithAnyValue)?.user,
                    authLoading: false
                })
            }
        },
        [handleChange, handleChangeMultiInputs]
    );

    const { runQuery, isLoading } = useFetch({
        endpoint: "auth/me",
        callOnFirstRender: true,
        onResponse: handleUserResponse,
    });

    useEffect(() => {
        if (pathname === '/' && user && !authLoading) {
            router.push('/home')
        }
    }, [authLoading, pathname, router, user])

    const disableLogin = authLoading || (pathname === '/' && user) || isLoading

    if (disableLogin) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
                <LoadingSpinner />
            </div>
        );
    }

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