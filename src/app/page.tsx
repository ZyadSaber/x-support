"use client";

import { memo, useCallback, useState } from "react";
import Image from "next/image";
import { AxiosError } from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Input from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react";
import { ThemeToggle } from "@/components/theme/themeToggle";
import useFormManager from "@/hooks/useFormManager";
import useAuth from "@/components/auth/hooks/useAuth";
import api from "@/lib/axios";

interface ErrorResponse {
  error: string;
}

const HomePage = () => {
  const { refetch, disableLogin } = useAuth();
  const [error, setError] = useState<string | null>(null)

  const {
    values: {
      showPassword,
      isLoading,
      user_name,
      password
    },
    handleChange,
    handleInputChange,
    resetValues
  } = useFormManager({
    initialValues: {
      showPassword: false,
      isLoading: false,
      user_name: "",
      password: ""
    }
  })

  const fieldsDisabled = disableLogin || isLoading

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    handleChange("isLoading", true);

    try {
      const endpoint = '/auth/login';
      const body = { user_name, password };
      await api.post(endpoint, body);
      refetch();
      resetValues();
    } catch (err) {
      const axiosError = err as AxiosError<ErrorResponse>;
      setError(
        axiosError.response?.data?.error ||
        axiosError.message ||
        'An error occurred'
      );
    } finally {
      handleChange("isLoading", false);
    }
  };

  const changeShowPassword = useCallback(() => {
    handleChange("showPassword", !showPassword)
  }, [handleChange, showPassword])

  // Show login form only
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4 relative">
      <div className="absolute top-4 right-4">
        <ThemeToggle
          className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800"
        />
      </div>

      <div className="w-full max-w-md">
        <div className="text-center mb-8 flex flex-col gap-2.5 items-center">
          <Image src="/logo.svg" alt="logo" width={100} height={100} />
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">
            Welcome Back
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Sign in to your account to continue
          </p>
        </div>

        <Card className="shadow-xl border-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-2xl font-semibold text-center">
              Sign In
            </CardTitle>
            <CardDescription className="text-center">
              Enter your credentials below to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* User Name Field */}
              <div className="space-y-2">
                <Label htmlFor="user_name" className="text-sm font-medium">
                  User Name
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                  <Input
                    id="user_name"
                    placeholder="Enter your user name"
                    value={user_name}
                    onChange={handleInputChange("user_name")}
                    className="pl-10 h-11 bg-white/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 focus:border-blue-500 dark:focus:border-blue-400"
                    required
                    disabled={fieldsDisabled}
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={handleInputChange("password")}
                    className="pl-10 pr-10 h-11 bg-white/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 focus:border-blue-500 dark:focus:border-blue-400"
                    required
                    disabled={fieldsDisabled}
                  />
                  <button
                    type="button"
                    onClick={changeShowPassword}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                    disabled={fieldsDisabled}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {error && (
                <div className="text-red-500 text-sm text-center bg-red-50 dark:bg-red-900/20 p-3 rounded-md">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                className="w-full h-11 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-medium transition-colors"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Signing in...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <span>Sign In</span>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default memo(HomePage);