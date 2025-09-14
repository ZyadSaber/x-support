import { memo, useCallback } from "react"
import useFormManager from "@/hooks/useFormManager"
import api from "@/lib/axios";
import { RecordWithAnyValue } from "@/interfaces/global"
import { statusOptions } from "../constants"
import Modal from "@/components/modal"
import CheckBox from "@/components/checkbox"
import InputText from "@/components/input-text"
import RadioGroupButton from "@/components/radio-group";
import useAuth from "@/components/auth/hooks/useAuth";
import getCurrentDate from "@/lib/getCurrentDate";

interface ModalViewProps {
    selectedRecord: RecordWithAnyValue;
    isOpen: boolean;
    handleClose: () => void;
    runQuery: () => void
}

const ModalView = ({ selectedRecord, isOpen, handleClose, runQuery }: ModalViewProps) => {
    const { id: userId } = useAuth();
    const {
        values: {
            id,
            user_description,
            user_name,
            user_disabled,
            user_role,
            record_status
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

    const isNewRecord = record_status === "n"

    const handleSave = useCallback(async () => {
        try {
            await api.post("tickets/post_client_ticket", {
                id,
                user_description,
                user_name,
                user_disabled,
                user_role,
                record_status
            });
            handleClose()
            runQuery()
        } catch (err) {
            console.log(err)
        }
    }, [id, user_description, user_name, user_disabled, user_role, record_status, handleClose, runQuery])

    return (
        <Modal
            isOpen={isOpen}
            handleClose={handleClose}
            title={isNewRecord ? "New user" : "Edit user"}
            handleSave={handleSave}
        >
            <div className="gap-4 mt-2 mb-2 flex flex-wrap items-end">
                <InputText
                    name="user_name"
                    value={user_name}
                    onChange={handleChange}
                    label="User name"
                    className="w-[48%]"
                />
                <InputText
                    name="user_description"
                    value={user_description}
                    onChange={handleChange}
                    label="Name"
                    className="w-[48%]"
                />
                <RadioGroupButton
                    options={statusOptions}
                    name="user_role"
                    value={user_role}
                    onChange={handleChange}
                    label="User Role"
                />
                <CheckBox
                    label="User disabled"
                />
            </div>
        </Modal>
    )
}

export default memo(ModalView)