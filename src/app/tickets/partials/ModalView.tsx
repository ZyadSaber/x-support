import { memo, useCallback } from "react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import Input from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import useFormManager from "@/hooks/useFormManager"
import api from "@/lib/axios";
import { RecordWithAnyValue } from "@/interfaces/global"
import { modalTitle } from "../constants"

interface ModalViewProps {
    selectedRecord: RecordWithAnyValue;
    isOpen: boolean;
    type: "N" | "U" | "S";
    handleClose: () => void;
    runQuery: () => void
}

const ModalView = ({ selectedRecord, isOpen, type, handleClose, runQuery }: ModalViewProps) => {

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
        handleInputChange
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
        <Dialog open={isOpen}>
            <form>
                <DialogContent onClose={handleClose} className="max-w-[380px] sm:w-[1200px]">
                    <DialogHeader>
                        <DialogTitle>{modalTitle[type]}</DialogTitle>
                    </DialogHeader>
                    <div className="gap-4 mt-2 mb-2 flex flex-wrap justify-between">
                        <div className="grid gap-3 w-[48%]" hidden={!showFiledData}>
                            <Label htmlFor="client_name">Client name</Label>
                            <Input
                                id="client_name"
                                disabled={!showFiledData}
                                value={client_name}
                                onChange={handleInputChange("client_name")}
                            />
                        </div>
                        <div className="grid gap-3 w-[48%]" hidden={!showFiledData}>
                            <Label htmlFor="server_name">Server name</Label>
                            <Input
                                id="server_name"
                                disabled={!showFiledData}
                                value={server_name}
                                onChange={handleInputChange("server_name")}
                            />
                        </div>
                        <div className="grid gap-3 w-[48%]">
                            <Label htmlFor="anydesk_number">AnyDesk number</Label>
                            <Input
                                id="anydesk_number"
                                disabled={!showFiledData}
                                value={anydesk_number}
                                onChange={handleInputChange("anydesk_number")}
                            />
                        </div>
                        <div className="grid gap-3 w-[48%]">
                            <Label htmlFor="anydesk_password">AnyDesk Password</Label>
                            <Input
                                id="anydesk_password"
                                disabled={!showFiledData}
                                onChange={handleInputChange("anydesk_password")}
                                value={anydesk_password}
                            />
                        </div>
                        <div className="grid gap-3 w-[48%]">
                            <Label htmlFor="server_user_name">Server user name</Label>
                            <Input
                                id="server_user_name"
                                disabled={!showFiledData}
                                onChange={handleInputChange("server_user_name")}
                                value={server_user_name}
                            />
                        </div>
                        <div className="grid gap-3 w-[48%]">
                            <Label htmlFor="user_name_password">Server password</Label>
                            <Input
                                id="user_name_password"
                                disabled={!showFiledData}
                                onChange={handleInputChange("user_name_password")}
                                value={user_name_password}
                            />
                        </div>
                        <div className="grid gap-3 w-[48%]">
                            <Label htmlFor="database_user_name">Database user name</Label>
                            <Input
                                id="database_user_name"
                                disabled={!showFiledData}
                                onChange={handleInputChange("database_user_name")}
                                value={database_user_name}
                            />
                        </div>
                        <div className="grid gap-3 w-[48%]">
                            <Label htmlFor="database_password">Database password</Label>
                            <Input
                                id="database_password"
                                disabled={!showFiledData}
                                onChange={handleInputChange("database_password")}
                                value={database_password}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" hidden={!showFiledData} onClick={handleSave}>Save</Button>
                        <DialogClose asChild>
                            <Button variant="outline" onClick={handleClose}>Cancel</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}

export default memo(ModalView)