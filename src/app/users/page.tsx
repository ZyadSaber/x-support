"use client";

import { useCallback } from "react";
import Header from "@/components/header";
import TableWithApi, { useTableFunctionFromRef } from "@/components/table-with-api";
import useFormManager from "@/hooks/useFormManager";
import InputText from "@/components/input-text";
import RadioGroupButton from "@/components/radio-group"
import { Button } from "@/components/ui/button"
import useOpenStatus from "@/hooks/useOpenStatus"
import api from "@/lib/axios";
import { RecordWithAnyValue } from "@/interfaces/global";
import ModalView from "./partials/ModalView"
import { COLUMNS, statusOptions, initialValues } from "./constants"

//SA >> SUPER ADMIN
//A >> ADMIN
//S >> SUPPORT
//D >> DEV

const UsersPage = () => {
    const { tableValuesRef, fetchTableData } = useTableFunctionFromRef()

    const { isOpen, handleOpen, handleClose } = useOpenStatus()

    const {
        values: {
            selectedRecord,
            user_role,
            name,
            user_name,
        },
        handleChange
    } = useFormManager({
        initialValues
    })

    const handleShowItem = useCallback((type: string) => (record?: RecordWithAnyValue) => {
        if (type === "N") {
            handleChange("selectedRecord", {
                record_status: "n"
            })
        } else if (type === "U") {
            handleChange("selectedRecord", {
                ...record,
                record_status: "u"
            })
        }
        handleOpen()
    }, [handleChange, handleOpen])

    const handleDelete = useCallback(async (record: RecordWithAnyValue) => {
        try {
            await api.post("tickets/post_client_ticket", {
                ...record,
                record_status: "d"
            });
            fetchTableData()
        } catch (err) {
            console.log(err)
        }
    }, [fetchTableData])

    const handleSearch = useCallback(() => {
        fetchTableData({
            user_role,
            name,
            user_name,
        })
    }, [fetchTableData, name, user_name, user_role])

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
            <Header pageTitle="X-Support Tickets" />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-wrap gap-2 mb-5 items-end">
                    <InputText
                        className="w-[19%]"
                        label="User name"
                        value={user_name}
                        name="user_name"
                        onChange={handleChange}
                    />
                    <InputText
                        className="w-[19%]"
                        label="Name"
                        value={name}
                        name="name"
                        onChange={handleChange}
                    />
                    <RadioGroupButton
                        options={statusOptions}
                        name="user_role"
                        value={user_role}
                        onChange={handleChange}
                        label="User Role"
                    />
                    <Button className="cursor-pointer h-full" onClick={handleSearch}>Search</Button>
                </div>
                <TableWithApi
                    ref={tableValuesRef}
                    onClickOpen={handleShowItem("N")}
                    AddButtonLabel="Add New User"
                    columns={COLUMNS}
                    endPoint="users/get_users_data"
                    expandable
                    rowKey="ticket_id"
                    handleEdit={handleShowItem("U")}
                    handleDelete={handleDelete}
                />
            </main>
            {isOpen && <ModalView
                isOpen={isOpen}
                selectedRecord={selectedRecord}
                handleClose={handleClose}
                runQuery={fetchTableData}
            />}
        </div>
    )
}

export default UsersPage