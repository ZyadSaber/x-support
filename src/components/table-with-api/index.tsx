import { useState, useCallback, forwardRef, memo, useImperativeHandle } from "react"
import useFetch from "@/hooks/useFetch";
import { RecordWithAnyValue } from "@/interfaces/global";
import { TableWithApiProps } from "./interface"
import BaseTable from "@/components/base-table";

interface TableRef {
    runQuery: (params: RecordWithAnyValue) => Promise<any>;
}

const TableWithApi = ({
    tableParams,
    callOnFirstRender,
    endPoint,
    ...params
}: TableWithApiProps,
    ref?: React.ForwardedRef<TableRef>
) => {
    const [dataSource, setDataSource] = useState<RecordWithAnyValue[]>([])

    const handleApiResponse = useCallback((data?: RecordWithAnyValue, error?: string | unknown) => {
        if (error) {
            return
        }
        setDataSource(data?.data || [])
    }, [])

    const { isLoading, runQuery } = useFetch({
        endpoint: endPoint,
        params: tableParams,
        callOnFirstRender: callOnFirstRender,
        onResponse: handleApiResponse
    })

    useImperativeHandle(ref, () => ({
        runQuery,
    }));

    return (
        <>
            <BaseTable
                dataSource={dataSource}
                isLoading={isLoading}
                {...params}
            />
        </>
    )
}

export default memo(forwardRef(TableWithApi))
export { default as useTableFunctionFromRef } from "./hooks/useTableFunctionFromRef"