"use client";

import { useCallback } from "react";
import Header from "@/components/header";
import TableWithApi, { useTableFunctionFromRef } from "@/components/table-with-api";
import useFormManager from "@/hooks/useFormManager";
import useOpenStatus from "@/hooks/useOpenStatus"
import { COLUMNS } from "./constants"

const TicketsPage = () => {
    const { tableValuesRef, fetchTableData } = useTableFunctionFromRef()

    const { isOpen, handleOpen, handleClose } = useOpenStatus()
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
            <Header pageTitle="X-Support Tickets" />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <TableWithApi
                    ref={tableValuesRef}
                    // onClickOpen={handleShowItem("N")}
                    AddButtonLabel="Add New Server"
                    columns={COLUMNS}
                    endPoint="tickets/get_tickets_data"
                    callOnFirstRender
                // handleEdit={handleShowItem("U")}
                // handleDelete={handleDelete}
                // actionButtons={actionButtons}
                />
            </main>
        </div>
    )
}

export default TicketsPage