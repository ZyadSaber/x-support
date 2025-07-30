"use client";
import { useEffect, useState, useRef } from "react";
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
  const [isLoading, setIsLoading] = useState(false);
  const lastParamsRef = useRef<RecordWithAnyValue | undefined>(params);
  const prevParams = usePrevious(lastParamsRef.current);

  const runQuery = async (
    _params?: RecordWithAnyValue,
    handler?: (data: T | undefined, error?: unknown) => void
  ) => {
    try {
      setIsLoading(true);
      const config: AxiosRequestConfig = { withCredentials: true };
      // Merge params from props and _params, with _params taking precedence
      const mergedParams = { ...(params || {}), ...(_params || {}) };
      if (Object.keys(mergedParams).length > 0) {
        config.params = mergedParams;
        lastParamsRef.current = mergedParams;
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
        JSON.stringify(prevParams) !== JSON.stringify(lastParamsRef.current);
      if (paramsChanged) {
        runQuery();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params, prevParams]);

  return { runQuery, isLoading };
}

export default useFetch;
