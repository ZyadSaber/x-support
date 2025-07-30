import { memo, useCallback } from "react"
import Input from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

interface InputTextProps {
    name?: string;
    value: string;
    onChange?: (name: string, value: string) => void;
    disabled?: boolean;
    label?: string;
    className?: string;
}

const InputText = ({
    name,
    value,
    onChange,
    disabled,
    label,
    className
}: InputTextProps) => {

    const handleChange = useCallback(event => {
        onChange(name, event?.target?.value)
    }, [name, onChange])

    return (
        <div className={cn(
            "grid gap-3",
            className
        )}>
            <Label htmlFor={name}>{label}</Label>
            <Input
                id={name}
                value={value}
                onChange={handleChange}
                disabled={disabled}
            />
        </div>
    )
}

export default memo(InputText)