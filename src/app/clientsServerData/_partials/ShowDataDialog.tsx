import { memo, useCallback } from "react"
import InputText from "@/components/input-text"
import Input from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import useFormManager from "@/hooks/useFormManager"
import api from "@/lib/axios";
import { RecordWithAnyValue } from "@/interfaces/global"
import { modalTitle } from "../constants"
import Modal from "@/components/modal"

interface ShowDataDialogProps {
    selectedRecord: RecordWithAnyValue;
    isOpen: boolean;
    type: "N" | "U" | "S";
    handleClose: () => void;
    runQuery: () => void
}

const ShowDataDialog = ({ selectedRecord, isOpen, type, handleClose, runQuery }: ShowDataDialogProps) => {

    const {
        values: {
            client_name,
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

    const showFiledData = type !== "S"


    const handleSave = useCallback(async () => {
        try {
            await api.post("client_server/post_data", {
                client_name,
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
    }, [anydesk_number, anydesk_password, client_name, database_password, database_user_name, handleClose, id, record_status, runQuery, server_name, server_user_name, user_name_password])

    return (
        <Modal
            isOpen={isOpen}
            handleClose={handleClose}
            handleSave={handleSave}
            title={modalTitle[type]}
        >
            <div className="gap-4 mt-2 mb-2 flex flex-wrap justify-between">
                <InputText
                    name="client_name"
                    value={client_name}
                    onChange={handleChange}
                    label="Client name"
                    className="w-[48%]"
                    disabled={!showFiledData}
                />
                <InputText
                    name="server_name"
                    value={server_name}
                    onChange={handleChange}
                    label="Server name"
                    className="w-[48%]"
                    disabled={!showFiledData}
                />
                <InputText
                    name="anydesk_number"
                    value={anydesk_number}
                    onChange={handleChange}
                    label="AnyDesk number"
                    className="w-[48%]"
                    disabled={!showFiledData}
                />
                <InputText
                    name="anydesk_password"
                    value={anydesk_password}
                    onChange={handleChange}
                    label="AnyDesk Password"
                    className="w-[48%]"
                    disabled={!showFiledData}
                />
                <InputText
                    name="server_user_name"
                    value={server_user_name}
                    onChange={handleChange}
                    label="Server user name"
                    className="w-[48%]"
                    disabled={!showFiledData}
                />
                <InputText
                    name="user_name_password"
                    value={user_name_password}
                    onChange={handleChange}
                    label="Server password"
                    className="w-[48%]"
                    disabled={!showFiledData}
                />
                <InputText
                    name="database_user_name"
                    value={database_user_name}
                    onChange={handleChange}
                    label="Database user name"
                    className="w-[48%]"
                    disabled={!showFiledData}
                />
                <InputText
                    name="database_password"
                    value={database_password}
                    onChange={handleChange}
                    label="Database password"
                    className="w-[48%]"
                    disabled={!showFiledData}
                />
            </div>
        </Modal>
    )
}

export default memo(ShowDataDialog)