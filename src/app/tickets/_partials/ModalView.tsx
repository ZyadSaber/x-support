import { memo, useCallback } from "react"
import TextAreaView from "@/components/text-area";
import useFormManager from "@/hooks/useFormManager"
import api from "@/lib/axios";
import { RecordWithAnyValue } from "@/interfaces/global"
import QuerySelect from "@/components/query-select"
import FileUpload from "@/components/file-upload"
import { modalTitle, statusOptions } from "../constants"
import Modal from "@/components/modal"
import InputText from "@/components/input-text"
import RadioGroupButton from "@/components/radio-group";
import DatePicker from "@/components/date-picker";
import useAuth from "@/components/auth/hooks/useAuth";
import getCurrentDate from "@/lib/getCurrentDate";

interface ModalViewProps {
    selectedRecord: RecordWithAnyValue;
    isOpen: boolean;
    type: "N" | "U";
    handleClose: () => void;
    runQuery: () => void
}

const ModalView = ({ selectedRecord, isOpen, type, handleClose, runQuery }: ModalViewProps) => {
    const { id: userId } = useAuth();
    const {
        values: {
            ticket_id,
            ticket_name,
            ticket_status,
            client_id,
            ticket_date,
            ticket_end_date,
            ticket_description,
            submitted_by,
            support_agent,
            web_developer,
            oracle_developer,
            files,
            record_status,
            ticket_file
        },
        handleChange
    } = useFormManager({
        initialValues: {
            ticket_status: "O",
            ticket_date: getCurrentDate(),
            submitted_by: userId,
            ...selectedRecord,
        }
    })

    const handleSave = useCallback(async () => {
        try {
            await api.post("tickets/post_client_ticket", {
                ticket_id,
                ticket_name,
                ticket_status,
                client_id,
                ticket_date,
                ticket_end_date,
                ticket_description,
                submitted_by,
                support_agent,
                web_developer,
                oracle_developer,
                files,
                record_status,
                ticket_file
            });
            handleClose()
            runQuery()
        } catch (err) {
            console.log(err)
        }
    }, [client_id, files, ticket_file, handleClose, oracle_developer, record_status, runQuery, submitted_by, support_agent, ticket_date, ticket_description, ticket_end_date, ticket_id, ticket_name, ticket_status, web_developer])

    const isClosedTicket = ticket_status === "C"

    return (
        <Modal
            isOpen={isOpen}
            handleClose={handleClose}
            title={modalTitle[type]}
            handleSave={handleSave}
        >
            <div className="gap-4 mt-2 mb-2 flex flex-wrap items-end">
                <InputText
                    name="ticket_name"
                    value={ticket_name}
                    onChange={handleChange}
                    disabled={isClosedTicket}
                    label="Ticket name"
                    className="w-[33%]"
                />
                <QuerySelect
                    label="Client"
                    name="client_id"
                    className="w-[33%]"
                    endPoint="clients/get_clients_list"
                    value={client_id}
                    onChange={handleChange}
                    disabled={isClosedTicket}
                />
                <RadioGroupButton
                    options={statusOptions}
                    name="ticket_status"
                    value={ticket_status}
                    onChange={handleChange}
                    disabled={isClosedTicket}
                    label="Ticket status"
                />
                <QuerySelect
                    label="Submitted by"
                    name="submitted_by"
                    className="w-[23.5%]"
                    endPoint="users/get_users_list"
                    value={submitted_by}
                    onChange={handleChange}
                    disabled
                />
                <QuerySelect
                    label="Support agent"
                    name="support_agent"
                    className="w-[23.5%]"
                    endPoint="users/get_users_list"
                    value={support_agent}
                    onChange={handleChange}
                    disabled={isClosedTicket}
                />
                <QuerySelect
                    label="Web developer"
                    name="web_developer"
                    className="w-[23.5%]"
                    endPoint="users/get_users_list"
                    value={web_developer}
                    onChange={handleChange}
                    disabled={isClosedTicket}
                />
                <QuerySelect
                    label="Oracle developer"
                    name="oracle_developer"
                    className="w-[23.5%]"
                    endPoint="users/get_users_list"
                    value={oracle_developer}
                    onChange={handleChange}
                    disabled={isClosedTicket}
                />
                <DatePicker
                    name="ticket_date"
                    value={ticket_date}
                    label="Ticket Date"
                    onChange={handleChange}
                    disabled={isClosedTicket}
                    className="w-[23.5%]"
                />
                <DatePicker
                    name="ticket_end_date"
                    value={ticket_end_date}
                    label="Ticket end Date"
                    onChange={handleChange}
                    disabled
                    className="w-[23.5%]"
                />
                <FileUpload
                    className="w-[48%]"
                    label="Upload Files"
                    name="ticket_file"
                    onChange={handleChange}
                    disabled={isClosedTicket}
                    dir="ticketsFiles"
                />
                <TextAreaView
                    value={ticket_description}
                    name="ticket_description"
                    onChange={handleChange}
                    disabled={isClosedTicket}
                    className="w-full"
                    label="Ticket description"
                    minHeight="120px"
                />
            </div>
        </Modal>
    )
}

export default memo(ModalView)