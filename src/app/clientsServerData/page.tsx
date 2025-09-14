"use client";

import { useCallback } from "react";
import Header from "@/components/header";
import InputText from "@/components/input-text";
import useFormManager from "@/hooks/useFormManager";
import useOpenStatus from "@/hooks/useOpenStatus"
import { RecordWithAnyValue } from "@/interfaces/global";
import TableWithApi, { useTableFunctionFromRef } from "@/components/table-with-api";
import { Button } from "@/components/ui/button"
import api from "@/lib/axios";
import ShowDataDialog from "./_partials/ShowDataDialog"
import { COLUMNS } from "./constants"

const ClientsServerDataPage = () => {
    const { tableValuesRef, fetchTableData } = useTableFunctionFromRef()

    const { isOpen, handleOpen, handleClose } = useOpenStatus()

    const {
        values: {
            selectedRecord,
            type,
            client_name
        },
        handleChangeMultiInputs,
        handleChange
    } = useFormManager({
        initialValues: {
            selectedRecord: {},
            type: "N",
            client_name: ""
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
        }
        handleOpen()
    }, [handleChangeMultiInputs, handleOpen, handleUpdateRecordWithUserName])

    const handleSearch = useCallback(() => {
        fetchTableData({
            client_name
        })
    }, [fetchTableData, client_name])

    const renderExpanded = useCallback(({
        anydesk_number,
        anydesk_password,
        server_user_name,
        user_name_password,
        database_user_name,
        database_password,
        updated_at,
        created_at
    }) => (
        <div className="flex flex-wrap gap-2 w-full items-end">
            <InputText
                name="anydesk_number"
                value={anydesk_number}
                disabled
                label="AnyDesk number"
                className="w-[48%]"
            />
            <InputText
                name="anydesk_password"
                value={anydesk_password}
                disabled
                label="AnyDesk Password"
                className="w-[48%]"
            />
            <InputText
                name="server_user_name"
                value={server_user_name}
                disabled
                label="Server user name"
                className="w-[48%]"
            />
            <InputText
                name="user_name_password"
                value={user_name_password}
                disabled
                label="Server password"
                className="w-[48%]"
            />
            <InputText
                name="database_user_name"
                value={database_user_name}
                disabled
                label="Database user name"
                className="w-[48%]"
            />
            <InputText
                name="database_password"
                value={database_password}
                disabled
                label="Database password"
                className="w-[48%]"
            />
            <InputText
                className="w-[48%]"
                label="Created at"
                value={created_at}
                disabled
            />
            <InputText
                className="w-[48%]"
                label="Updated at"
                value={updated_at}
                disabled
            />
        </div>
    ), [])

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-slate-100 to-purple-100 dark:from-slate-900 dark:via-slate-950 dark:to-blue-950">
            <Header pageTitle="Client Server Data" />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-wrap gap-2 mb-5 items-end">
                    <InputText
                        className="w-[25%]"
                        label="Client name"
                        value={client_name}
                        name="client_name"
                        onChange={handleChange}
                    />
                    <Button className="cursor-pointer h-full" onClick={handleSearch}>Search</Button>
                </div>
                <TableWithApi
                    rowKey="id"
                    ref={tableValuesRef}
                    onClickOpen={handleShowItem("N")}
                    AddButtonLabel="Add New Server"
                    columns={COLUMNS}
                    endPoint="client_server/get_data"
                    callOnFirstRender
                    handleEdit={handleShowItem("U")}
                    handleDelete={handleDelete}
                    renderExpanded={renderExpanded}
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