import { RecordWithAnyValue } from "@/interfaces/global";
import { useRef, useCallback } from "react";

// Define the interface for the table ref
interface TableRef {
  runQuery: (params: RecordWithAnyValue) => Promise<any>;
}

// Define the return type for the hook
interface UseTableFunctionFromRefReturn {
  tableValuesRef: React.RefObject<TableRef>;
  fetchTableData: (nextParams?: RecordWithAnyValue) => Promise<any>;
}

const useCreateTableActionsFromRefToForm =
  (): UseTableFunctionFromRefReturn => {
    const tableValuesRef = useRef<TableRef>(null);

    const fetchTableData = useCallback(
      async (nextParams: RecordWithAnyValue) =>
        await tableValuesRef.current?.runQuery(nextParams),
      [tableValuesRef]
    );

    return {
      tableValuesRef,
      fetchTableData,
    };
  };

export default useCreateTableActionsFromRefToForm;
