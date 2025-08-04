"use client";

import { useCallback } from "react";
import Header from "@/components/header";
import TableWithApi, { useTableFunctionFromRef } from "@/components/table-with-api";
import useFormManager from "@/hooks/useFormManager";
import useOpenStatus from "@/hooks/useOpenStatus"
import QuerySelect from "@/components/query-select"
import RadioGroupButton from "@/components/radio-group"
import { Button } from "@/components/ui/button"
import api from "@/lib/axios";
import DatePickerRange from "@/components/ui/datePickerRange"
import InputText from "@/components/input-text";
import TextAreaView from "@/components/text-area";
import { RecordWithAnyValue } from "@/interfaces/global";
import ModalView from "./ModalView"
import { COLUMNS, statusOptionsSearch, initialValues } from "../constants"

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
            client_id
        },
        handleChangeMultiInputs,
        handleChange
    } = useFormManager({
        initialValues
    })

    const handleCloseTicket = useCallback((ticketId) => async () => {
        try {
            await api.post("tickets/close_ticket", {
                ticket_id: ticketId,
            });
            fetchTableData()
        } catch (err) {
            console.log(err)
        }
    }, [fetchTableData])

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
        ticket_description,
        ticket_id,
        ticket_status
    }) => (
        <div className="flex flex-wrap gap-2 w-full items-end">
            <InputText
                className="w-[19%]"
                label="Ticket date"
                value={ticket_date}
                disabled
            />
            <InputText
                className="w-[19%]"
                label="Ticket end date"
                value={ticket_end_date}
                disabled
            />
            <InputText
                className="w-[19%]"
                label="Created at"
                value={created_at}
                disabled
            />
            <InputText
                className="w-[19%]"
                label="Updated at"
                value={updated_at}
                disabled
            />
            <Button className="cursor-pointer">Download Files</Button>
            <Button variant="destructive" className="cursor-pointer" disabled={ticket_status === "C"} onClick={handleCloseTicket(ticket_id)}>Close Ticket</Button>
            <InputText
                className="w-[19%]"
                label="Submitted by"
                value={submitted_by_name}
                disabled
            />
            <InputText
                className="w-[19%]"
                label="Support agent"
                value={support_agent_name}
                disabled
            />
            <InputText
                className="w-[19%]"
                label="Web developer"
                value={web_developer_name}
                disabled
            />
            <InputText
                className="w-[19%]"
                label="Oracle developer"
                value={oracle_developer_name}
                disabled
            />
            <InputText
                className="w-[19%]"
                label="Ticket status"
                value={ticket_status_name}
                disabled
            />
            <TextAreaView
                value={ticket_description}
                className="w-full"
                label="Ticket description"
                minHeight="120px"
                disabled
            />
        </div>
    ), [handleCloseTicket])

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
                    <InputText
                        className="w-[19%]"
                        label="Ticket Id"
                        value={ticket_id}
                        name="ticket_id"
                        onChange={handleChange}
                    />
                    <DatePickerRange
                        onChange={handleChange}
                        name="date"
                        label="Date"
                        value={date}
                    />
                    <QuerySelect
                        label="Client"
                        name="client_id"
                        className="w-[20%]"
                        endPoint="clients/get_clients_list"
                        value={client_id}
                        onChange={handleChange}
                    />
                    <RadioGroupButton
                        options={statusOptionsSearch}
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