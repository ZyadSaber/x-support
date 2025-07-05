"use client";
import { useState, useCallback, useEffect } from "react";
import { RecordWithAnyValue } from "@/interfaces/global";
import usePrevious from "./usePrevious";

interface UseFormManagerProps {
  initialValues: RecordWithAnyValue;
}

const useFormManager = ({ initialValues }: UseFormManagerProps) => {
  const [values, setValues] = useState<
    RecordWithAnyValue | typeof initialValues
  >(initialValues);

  const preValues = usePrevious(initialValues);

  const areInitialValuesChanged = useCallback(
    () => !Object.is(JSON.stringify(preValues), JSON.stringify(initialValues)),
    [initialValues, preValues]
  );

  useEffect(() => {
    if (areInitialValuesChanged()) {
      setValues(initialValues);
    }
  }, [areInitialValuesChanged, initialValues]);

  const handleInputChange = useCallback(
    (name: string) => (e: { target: { value?: string | number } }) => {
      setValues((prev) => ({
        ...prev,
        [name]: e?.target?.value,
      }));
    },
    []
  );

  const handleChange = useCallback(
    (
      name: string,
      value:
        | string
        | number
        | boolean
        | null
        | RecordWithAnyValue
        | RecordWithAnyValue[]
    ) => {
      setValues((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
    []
  );

  const handleChangeMultiInputs = useCallback(
    (newValues: RecordWithAnyValue) => {
      setValues((prev) => ({
        ...prev,
        ...newValues,
      }));
    },
    []
  );

  const resetValues = useCallback(
    () => setValues(initialValues),
    [initialValues]
  );

  return {
    values,
    handleInputChange,
    handleChangeMultiInputs,
    resetValues,
    handleChange,
  };
};

export default useFormManager;
