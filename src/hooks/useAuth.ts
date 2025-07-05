import { useCallback } from "react";
import { JWTPayload } from "@/lib/auth";
import { AxiosError } from "axios";
import useFormManager from "./useFormManager";
import useFetch from "./useFetch";
import { RecordWithAnyValue } from "@/interfaces/global";

interface UseAuthReturn {
  user: JWTPayload | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

interface ErrorResponse {
  error: string;
}

export const useAuth = (): UseAuthReturn => {
  const {
    values: { user, error, isLoading },
    handleChange,
    handleChangeMultiInputs,
  } = useFormManager({
    initialValues: {
      user: null,
      error: null,
      isLoading: true,
    },
  });

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
        handleChange("user", response?.user);
      }
      handleChange("isLoading", false);
    },
    [handleChange, handleChangeMultiInputs]
  );

  const { runQuery } = useFetch({
    endpoint: "auth/me",
    callOnFirstRender: true,
    onResponse: handleUserResponse,
  });

  return {
    user,
    isLoading,
    error,
    refetch: runQuery,
  } as UseAuthReturn;
};
