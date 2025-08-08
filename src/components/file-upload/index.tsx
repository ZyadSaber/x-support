import { memo } from "react"
import Input from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import axios from "axios";

interface FileUploadPops {
    name?: string;
    onChange?: (name: string, value: string) => void;
    disabled?: boolean;
    label?: string;
    className?: string;
    multiple?: boolean;
    dir: string;
}

const FileUpload = ({
    name,
    onChange,
    disabled,
    label,
    className,
    multiple,
    dir,
}: FileUploadPops) => {
    const handleFileUpload = async (event) => {
        try {
            const filesToUpload = new FormData()
            filesToUpload.set("file", event?.target?.files?.[0])
            const { data } = await axios.post("/api/auth/upload_files", filesToUpload, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true,
                params: {
                    dir
                }
            });
            const { success, path } = data
            if (success === true) {
                onChange(name, path)
            }
        } catch (error) { }
    }

    return (
        <div className={cn(
            "grid gap-3",
            className
        )}>
            <Label htmlFor={name}>{label}</Label>
            <Input
                id={name}
                onChange={handleFileUpload}
                disabled={disabled}
                type="file"
                multiple={multiple}
            />
        </div>
    )
}

export default memo(FileUpload)