import { memo, useCallback } from "react"
import Input from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import useFormManager from "@/hooks/useFormManager"
import api from "@/lib/axios";
import { RecordWithAnyValue } from "@/interfaces/global"
import { modalTitle } from "../constants"
import Modal from "@/components/modal"
import InputText from "@/components/input-text"

interface ModalViewProps {
    selectedRecord: RecordWithAnyValue;
    isOpen: boolean;
    type: "N" | "U";
    handleClose: () => void;
    runQuery: () => void
}

const ModalView = ({ selectedRecord, isOpen, type, handleClose, runQuery }: ModalViewProps) => {

    const {
        values: {
            ticket_name,
            server_name,
            anydesk_number,
            anydesk_password,
            server_user_name,
            user_name_password,
            database_user_name,
            database_password,
            record_status,
            id
        },
        handleInputChange,
        handleChange
    } = useFormManager({
        initialValues: selectedRecord
    })


    const handleSave = useCallback(async () => {
        try {
            await api.post("client_server/post_data", {
                ticket_name,
                server_name,
                anydesk_number,
                anydesk_password,
                server_user_name,
                user_name_password,
                database_user_name,
                database_password,
                record_status,
                id
            });
            handleClose()
            runQuery()
        } catch (err) {
            console.log(err)
        }
    }, [anydesk_number, anydesk_password, database_password, database_user_name, handleClose, id, record_status, runQuery, server_name, server_user_name, ticket_name, user_name_password])

    return (
        <Modal
            isOpen={isOpen}
            handleClose={handleClose}
            title={modalTitle[type]}
            handleSave={handleSave}
        >
            <div className="gap-4 mt-2 mb-2 flex flex-wrap justify-between">
                <InputText
                    name="ticket_name"
                    value={ticket_name}
                    onChange={handleChange}
                    label="Ticket name"
                    className="w-[40%]"
                />
                <div className="grid gap-3 w-[48%]">
                    <Label htmlFor="server_name">Server name</Label>
                    <Input
                        id="server_name"
                        value={server_name}
                        onChange={handleInputChange("server_name")}
                    />
                </div>
                <div className="grid gap-3 w-[48%]">
                    <Label htmlFor="anydesk_number">AnyDesk number</Label>
                    <Input
                        id="anydesk_number"
                        value={anydesk_number}
                        onChange={handleInputChange("anydesk_number")}
                    />
                </div>
                <div className="grid gap-3 w-[48%]">
                    <Label htmlFor="anydesk_password">AnyDesk Password</Label>
                    <Input
                        id="anydesk_password"
                        onChange={handleInputChange("anydesk_password")}
                        value={anydesk_password}
                    />
                </div>
                <div className="grid gap-3 w-[48%]">
                    <Label htmlFor="server_user_name">Server user name</Label>
                    <Input
                        id="server_user_name"
                        onChange={handleInputChange("server_user_name")}
                        value={server_user_name}
                    />
                </div>
                <div className="grid gap-3 w-[48%]">
                    <Label htmlFor="user_name_password">Server password</Label>
                    <Input
                        id="user_name_password"
                        onChange={handleInputChange("user_name_password")}
                        value={user_name_password}
                    />
                </div>
                <div className="grid gap-3 w-[48%]">
                    <Label htmlFor="database_user_name">Database user name</Label>
                    <Input
                        id="database_user_name"
                        onChange={handleInputChange("database_user_name")}
                        value={database_user_name}
                    />
                </div>
                <div className="grid gap-3 w-[48%]">
                    <Label htmlFor="database_password">Database password</Label>
                    <Input
                        id="database_password"
                        onChange={handleInputChange("database_password")}
                        value={database_password}
                    />
                </div>
            </div>
        </Modal>
    )
}

export default memo(ModalView)