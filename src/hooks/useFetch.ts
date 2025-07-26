"use client";
import { useEffect, useState } from "react";
import axios, { AxiosRequestConfig } from "axios";
import usePrevious from "./usePrevious";
import { RecordWithAnyValue } from "@/interfaces/global";

interface UseFetchProps {
  endpoint: string;
  params?: RecordWithAnyValue;
  disableParamsCheck?: boolean;
  callOnFirstRender?: boolean;
  onResponse?: (
    response?: RecordWithAnyValue,
    error?: string | unknown
  ) => void;
}

function useFetch<T = unknown>({
  endpoint,
  params,
  disableParamsCheck = false,
  callOnFirstRender = false,
  onResponse,
}: UseFetchProps) {
  const prevParams = usePrevious(params);
  const [isLoading, setIsLoading] = useState(false);

  const runQuery = async (
    _params?: RecordWithAnyValue,
    handler?: (data: T | undefined, error?: unknown) => void
  ) => {
    try {
      setIsLoading(true);
      const config: AxiosRequestConfig = { withCredentials: true };
      if (_params) {
        config.params = _params;
      } else if (params) {
        config.params = params;
      }
      const response = await axios.get<T>(`/api/${endpoint}`, config);
      handler?.(response.data, undefined);
      onResponse?.(response?.data, undefined);
    } catch (error) {
      handler?.(undefined, error);
      onResponse?.(undefined, error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (callOnFirstRender) {
      runQuery(); // Call with empty handler on mount
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!disableParamsCheck && callOnFirstRender) {
      const paramsChanged =
        JSON.stringify(prevParams) !== JSON.stringify(params);
      if (paramsChanged) {
        runQuery();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params, prevParams]);

  return { runQuery, isLoading };
}

export default useFetch;
