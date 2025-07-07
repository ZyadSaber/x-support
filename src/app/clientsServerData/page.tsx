"use client";

import { useCallback } from "react";
import Header from "@/components/header";
import useFormManager from "@/hooks/useFormManager";
import useOpenStatus from "@/hooks/useOpenStatus"
import { RecordWithAnyValue } from "@/interfaces/global";
import TableWithApi, { useTableFunctionFromRef } from "@/components/table-with-api";
import api from "@/lib/axios";
import ShowDataDialog from "./partials/ShowDataDialog"
import { COLUMNS } from "./constants"

const ClientsServerDataPage = () => {
    const { tableValuesRef, fetchTableData } = useTableFunctionFromRef()

    const { isOpen, handleOpen, handleClose } = useOpenStatus()

    const {
        values: {
            selectedRecord,
            type
        },
        handleChangeMultiInputs
    } = useFormManager({
        initialValues: {
            data: [],
            selectedRecord: {},
            type: "S"
        }
    })

    const handleUpdateRecordWithUserName = useCallback(async (record) => {
        try {
            await api.post("client_server/update_user_access", record);
        } catch (err) {
            console.log(err)
        } finally {
            fetchTableData()
        }
    }, [fetchTableData])

    const handleDelete = useCallback(async (record) => {
        try {
            await api.post("client_server/post_data", {
                ...record,
                record_status: "d"
            });
            fetchTableData()
        } catch (err) {
            console.log(err)
        }
    }, [fetchTableData])

    const handleShowItem = useCallback((type: string) => (record?: RecordWithAnyValue) => {
        if (type === "N") {
            handleChangeMultiInputs({
                selectedRecord: {
                    record_status: "n"
                },
                type
            })
        } else if (type === "U") {
            handleChangeMultiInputs({
                selectedRecord: {
                    ...record,
                    record_status: "u"
                },
                type
            })
            handleUpdateRecordWithUserName(record)
        } else if (type === "S") {
            handleChangeMultiInputs({
                selectedRecord: record,
                type
            })
            handleUpdateRecordWithUserName(record)
        }
        handleOpen()
    }, [handleChangeMultiInputs, handleOpen, handleUpdateRecordWithUserName])

    const actionButtons = [
        {
            title: "Show data",
            type: "secondary" as const,
            onClick: handleShowItem("S")
        }
    ]

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-slate-100 to-purple-100 dark:from-slate-900 dark:via-slate-950 dark:to-blue-950">
            <Header pageTitle="Client Server Data" />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <TableWithApi
                    ref={tableValuesRef}
                    onClickOpen={handleShowItem("N")}
                    AddButtonLabel="Add New Server"
                    columns={COLUMNS}
                    endPoint="client_server/get_data"
                    callOnFirstRender
                    handleEdit={handleShowItem("U")}
                    handleDelete={handleDelete}
                    actionButtons={actionButtons}
                />
            </main>
            <ShowDataDialog
                isOpen={isOpen}
                selectedRecord={selectedRecord}
                type={type}
                handleClose={handleClose}
                runQuery={fetchTableData}
            />
        </div>
    );
}

export default ClientsServerDataPage