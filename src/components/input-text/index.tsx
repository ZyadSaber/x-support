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
    type?: string;
    required?: boolean;
    placeholder?: string;
    icon?: React.ReactNode;
}

const InputText = ({
    name,
    value,
    onChange,
    disabled,
    label,
    className,
    type,
    icon,
    required,
    placeholder
}: InputTextProps) => {

    const handleChange = useCallback(event => {
        onChange(name, event?.target?.value)
    }, [name, onChange])

    return (
        <div className={cn(
            "grid gap-3 relative",
            className
        )}>
            <Label htmlFor={name} className="text-sm font-medium">
                {label}
            </Label>
            <div className="relative">
                {icon}
                <Input
                    id={name}
                    placeholder={placeholder}
                    value={value}
                    onChange={handleChange}
                    className={
                        cn(icon ? "pl-10" : "", "h-11 bg-white/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 focus:border-blue-500 dark:focus:border-blue-400")
                    }
                    required={required}
                    disabled={disabled}
                    type={type}
                />
            </div>
        </div>
    )
}

export default memo(InputText)