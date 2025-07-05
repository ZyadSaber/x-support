"use client";

import { useCallback } from "react";
import Header from "@/components/header";
import useFormManager from "@/hooks/useFormManager";
import useOpenStatus from "@/hooks/useOpenStatus"
import { RecordWithAnyValue } from "@/interfaces/global";
import ShowDataDialog from "./partials/ShowDataDialog"
import TableWithApi from "@/components/table-with-api";
import api from "@/lib/axios";
import { AxiosError } from "axios";
import { useAuth } from "@/hooks/useAuth";
import { COLUMNS } from "./constants"

const ClientsServerDataPage = () => {

    const { user } = useAuth()
    const { user_name } = user || {}

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

    const handleSubmit = useCallback(async () => {
        try {
            await api.post("client_server/update_user_access", {
                ...selectedRecord,
                user_name
            });
        } catch (err) {
            // const axiosError = err as AxiosError<ErrorResponse>;
            // setError(
            //     axiosError.response?.data?.error ||
            //     axiosError.message ||
            //     'An error occurred'
            // );
        } finally {

        }
    }, []);

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
        } else if (type === "S") {
            handleChangeMultiInputs({
                selectedRecord: record,
                type
            })
        }
        handleOpen()
    }, [handleChangeMultiInputs, handleOpen])

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
                    onClickOpen={handleShowItem("N")}
                    AddButtonLabel="Add New Server"
                    columns={COLUMNS}
                    endPoint="client_server/get_data"
                    callOnFirstRender
                    handleEdit={handleShowItem("U")}
                    actionButtons={actionButtons}
                />
            </main>
            <ShowDataDialog
                isOpen={isOpen}
                selectedRecord={selectedRecord}
                type={type}
                handleClose={handleClose}
                runQuery={() => { }}
            />
        </div>
    );
}

export default ClientsServerDataPage