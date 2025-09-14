"use client"

import { useState, useCallback, useMemo, Fragment } from "react"
import { ChevronRight, ChevronDown, Expand } from "lucide-react";
import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell
} from "@/components/ui/table";
import LoadingSpinner from "@/components/loading-spinner"
import { Button } from "@/components/ui/button";
import { RecordWithAnyValue } from "@/interfaces/global";
import { BaseTableProps } from "./interface"
import generateFixedColumns from "./helpers/generateFixedColumns";
import useBoundingClientRef from "./hooks/useBoundingClientRef";

const BaseTable = ({
    AddButtonLabel,
    onClickOpen,
    columns,
    dataSource,
    isLoading,
    handleEdit,
    handleDelete,
    actionButtons,
    rowKey,
    renderExpanded
}: BaseTableProps) => {

    const [expanded, setExpanded] = useState<number | string>(undefined);
    const [ref, rect] = useBoundingClientRef();

    const toggleRow = useCallback((key: string | number) => () => {
        setExpanded(prev => prev === key ? undefined : key);
    }, []);

    const showExpandColumn = !!renderExpanded;
    // const showActionColumn = !!onPressActionIcon;
    const containerWidthNumber = rect?.width ?? 200

    const adjustedColumns = useMemo(
        () =>
            generateFixedColumns({
                containerWidthNumber,
                columnsFromProps: columns,
                showExpandColumn,
            }) || [],
        [containerWidthNumber, columns, showExpandColumn],
    );

    return (
        <>
            <div className="w-full text-center" ref={ref}>
                <Button className="p-2 cursor-pointer" variant="default" onClick={onClickOpen} disabled={isLoading}>
                    {AddButtonLabel}
                </Button>
            </div>
            <div className="rounded-lg overflow-x-auto border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 shadow-2xl mt-8">
                <Table className="table-fixed">
                    <TableHeader>
                        <TableRow className="backdrop-blur-md bg-white/70 dark:bg-slate-900/70 sticky top-0 z-10">
                            {renderExpanded &&
                                <TableHead className="w-[50px]" >
                                    <Expand />
                                </TableHead>
                            }
                            {adjustedColumns.map((col, index) => (
                                <TableHead style={{
                                    width: `${col.width}px`
                                }} key={index}>{col.label}</TableHead>
                            ))}
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ?
                            <TableRow>
                                <TableCell colSpan={columns.length + 2}>
                                    <div className="w-full flex justify-center items-center p-5">
                                        <LoadingSpinner />
                                    </div>
                                </TableCell>
                            </TableRow>
                            :
                            dataSource.map((record: RecordWithAnyValue, index: number) => (
                                <Fragment key={index}>
                                    <TableRow
                                        className={
                                            (index % 2 === 0 ? "bg-slate-50 dark:bg-slate-900/40" : "bg-white dark:bg-slate-900/60")
                                        }
                                    >
                                        {renderExpanded && <TableCell className="w-[25px]">
                                            <button
                                                aria-label={record[rowKey] === expanded ? 'Collapse row' : 'Expand row'}
                                                onClick={toggleRow(record[rowKey])}
                                                className="w-full flex justify-center items-center"
                                            >
                                                {record[rowKey] === expanded ? <ChevronDown /> : <ChevronRight />}
                                            </button>
                                        </TableCell>}
                                        {columns.map((col, index) => (
                                            <TableCell key={index}>
                                                {isLoading ? <span className="block h-4 w-24 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" /> : record[col.dataIndex]?.toString()}
                                            </TableCell>
                                        ))}
                                        <TableCell>
                                            <div className="flex gap-2">
                                                <Button disabled={isLoading} className="p-2 cursor-pointer" variant="default" onClick={() => handleEdit?.(record)}>
                                                    Edit
                                                </Button>
                                                <Button disabled={isLoading} className="p-2 cursor-pointer" variant="destructive" onClick={() => handleDelete?.(record)}>
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
                                    {renderExpanded && record[rowKey] === expanded && (
                                        <TableRow>
                                            <TableCell colSpan={columns.length + 2} className="pr-7 pl-7 pt-3 pb-3 ">
                                                {renderExpanded(record)}
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </Fragment>
                            ))}
                    </TableBody>
                </Table>
            </div>
        </>
    )
}

export default BaseTable

export * from "./interface"