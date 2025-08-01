"use client";

import { useRef, useEffect } from "react";

const usePrevious = <T>(value?: T): T => {
  const ref = useRef<T>(null);

  useEffect(() => {
    ref.current = value;
  });

  return ref.current as T;
};

export default usePrevious;
