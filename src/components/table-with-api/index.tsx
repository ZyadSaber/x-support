import { useState, useCallback, forwardRef, memo, useImperativeHandle } from "react"
import { Button } from "@/components/ui/button";
import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
} from "@/components/ui/table";
import useFetch from "@/hooks/useFetch";
import { RecordWithAnyValue } from "@/interfaces/global";
import { TableWithApiProps } from "./interface"

// Define the interface for the table ref
interface TableRef {
    runQuery: (params: RecordWithAnyValue) => Promise<any>;
}

const TableWithApi = ({
    onClickOpen,
    AddButtonLabel,
    columns,
    tableParams,
    callOnFirstRender,
    endPoint,
    handleEdit,
    handleDelete,
    actionButtons
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
            <div className="w-full text-center">
                <Button className="p-2 cursor-pointer" variant="default" onClick={onClickOpen}>
                    {AddButtonLabel}
                </Button>
            </div>
            <div className="rounded-lg overflow-x-auto border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 shadow-2xl mt-8">
                <Table>
                    <TableHeader>
                        <TableRow className="backdrop-blur-md bg-white/70 dark:bg-slate-900/70 sticky top-0 z-10">
                            {columns.map((col, index) => (
                                <TableHead key={index}>{col.label}</TableHead>
                            ))}
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {dataSource.map((record: RecordWithAnyValue, index: number) => (
                            <TableRow
                                key={index}
                                className={
                                    (index % 2 === 0 ? "bg-slate-50 dark:bg-slate-900/40" : "bg-white dark:bg-slate-900/60")
                                }
                            >
                                {columns.map((col, index) => (
                                    <TableCell key={index}>
                                        {isLoading ? <span className="block h-4 w-24 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" /> : record[col.dataIndex]}
                                    </TableCell>
                                ))}
                                <TableCell>
                                    <div className="flex gap-2">
                                        <Button className="p-2 cursor-pointer" variant="default" onClick={() => handleEdit?.(record)}>
                                            Edit
                                        </Button>
                                        <Button className="p-2 cursor-pointer" variant="destructive" onClick={() => handleDelete?.(record)}>
                                            Delete
                                        </Button>
                                        {actionButtons?.map(({ title, type, onClick }, index) => (
                                            <Button key={index} className="p-2 cursor-pointer" variant={type} onClick={() => onClick?.(record)}>
                                                {title}
                                            </Button>
                                        ))}
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </>
    )
}

export default memo(forwardRef(TableWithApi))
export { default as useTableFunctionFromRef } from "./hooks/useTableFunctionFromRef"