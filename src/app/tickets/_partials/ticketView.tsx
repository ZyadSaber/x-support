"use client";

import { useCallback } from "react";
import Header from "@/components/header";
import TableWithApi, { useTableFunctionFromRef } from "@/components/table-with-api";
import useFormManager from "@/hooks/useFormManager";
import useOpenStatus from "@/hooks/useOpenStatus"
import { Label } from "@/components/ui/label"
import Input from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import RadioGroupButton from "@/components/radio-group"
import { Button } from "@/components/ui/button"
import api from "@/lib/axios";
import DatePickerRange from "@/components/ui/datePickerRange"
import { RecordWithAnyValue } from "@/interfaces/global";
import ModalView from "./ModalView"
import { COLUMNS, statusOptions, initialValues } from "../constants"

interface TicketViewProps {
    id?: string;
}


const TicketView = ({ id }: TicketViewProps) => {
    const { tableValuesRef, fetchTableData } = useTableFunctionFromRef()

    const { isOpen, handleOpen, handleClose } = useOpenStatus()

    const {
        values: {
            selectedRecord,
            type,
            ticket_id,
            date,
            client_name,
            ticket_status,
        },
        handleInputChange,
        handleChangeMultiInputs,
        handleChange
    } = useFormManager({
        initialValues
    })

    const renderExpanded = useCallback(({
        ticket_date,
        ticket_end_date,
        created_at,
        updated_at,
        submitted_by_name,
        support_agent_name,
        web_developer_name,
        oracle_developer_name,
        ticket_status_name,
        ticket_description
    }) => (
        <div className="flex flex-wrap gap-2 w-full items-end">
            <div className="grid gap-3 w-[19%]">
                <Label htmlFor="client_name">Ticket date</Label>
                <Input
                    disabled
                    value={ticket_date}
                />
            </div>
            <div className="grid gap-3 w-[19%]">
                <Label htmlFor="client_name">Ticket end date</Label>
                <Input
                    disabled
                    value={ticket_end_date}
                />
            </div>
            <div className="grid gap-3 w-[19%]">
                <Label htmlFor="client_name">Created at</Label>
                <Input
                    disabled
                    value={created_at}
                />
            </div>
            <div className="grid gap-3 w-[19%]">
                <Label htmlFor="client_name">Updated at</Label>
                <Input
                    disabled
                    value={updated_at}
                />
            </div>
            <Button className="cursor-pointer">Download Files</Button>
            <Button variant="destructive" className="cursor-pointer">Close Ticket</Button>
            <div className="grid gap-3 w-[19%]">
                <Label htmlFor="client_name">Submitted by</Label>
                <Input
                    disabled
                    value={submitted_by_name}
                />
            </div>
            <div className="grid gap-3 w-[19%]">
                <Label htmlFor="client_name">Support agent</Label>
                <Input
                    disabled
                    value={support_agent_name}
                />
            </div>
            <div className="grid gap-3 w-[19%]">
                <Label htmlFor="client_name">Web developer</Label>
                <Input
                    disabled
                    value={web_developer_name}
                />
            </div>
            <div className="grid gap-3 w-[19%]">
                <Label htmlFor="client_name">Oracle developer</Label>
                <Input
                    disabled
                    value={oracle_developer_name}
                />
            </div>
            <div className="grid gap-3 w-[19%]">
                <Label htmlFor="client_name">Ticket status</Label>
                <Input
                    disabled
                    value={ticket_status_name}
                />
            </div>
            <div className="grid gap-3 w-full">
                <Label htmlFor="client_name">Ticket description</Label>
                <Textarea
                    disabled
                    value={ticket_description}
                    className="min-h-22"
                />
            </div>
        </div>
    ), [])

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
            date_from: date[0],
            date_to: date[1],
            client_name,
            ticket_id,
            ticket_status,
            id
        })
    }, [client_name, date, fetchTableData, id, ticket_id, ticket_status])

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
            <Header pageTitle="X-Support Tickets" />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-wrap gap-2 mb-5 items-end">
                    <div className="grid gap-3 w-[19%]">
                        <Label htmlFor="ticket_id">Ticket Id</Label>
                        <Input
                            value={ticket_id}
                            name="ticket_id"
                            onChange={handleInputChange("ticket_id")}
                        />
                    </div>
                    <DatePickerRange
                        onChange={handleChange}
                        name="date"
                        label="Date"
                        value={date}
                    />
                    <div className="grid gap-3 w-[19%]">
                        <Label htmlFor="client_name">Client name</Label>
                        <Input
                            value={client_name}
                            name="client_name"
                            onChange={handleInputChange("client_name")}
                        />
                    </div>
                    <RadioGroupButton
                        options={statusOptions}
                        name="ticket_status"
                        value={ticket_status}
                        onChange={handleChange}
                        label="Ticket status"
                    />
                    <Button className="cursor-pointer h-full" onClick={handleSearch}>Search</Button>
                </div>
                <TableWithApi
                    ref={tableValuesRef}
                    onClickOpen={handleShowItem("N")}
                    AddButtonLabel="Add New Ticket"
                    columns={COLUMNS}
                    endPoint="tickets/get_tickets_data"
                    callOnFirstRender
                    expandable
                    rowKey="ticket_id"
                    renderExpanded={renderExpanded}
                    handleEdit={handleShowItem("U")}
                    handleDelete={handleDelete}
                />
            </main>
            <ModalView
                isOpen={isOpen}
                selectedRecord={selectedRecord}
                type={type}
                handleClose={handleClose}
                runQuery={fetchTableData}
            />
        </div>
    )
}

export default TicketView