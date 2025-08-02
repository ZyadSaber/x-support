import { useCallback } from "react"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

interface TextAreaViewProps {
    name?: string;
    value: string;
    onChange?: (name: string, value: string) => void;
    disabled?: boolean;
    label?: string;
    className?: string;
    minHeight?: string
}

const TextAreaView = ({ name, value, onChange, disabled, label, className, minHeight }: TextAreaViewProps) => {

    const handleChange = useCallback(event => {
        onChange(name, event?.target?.value)
    }, [name, onChange])

    return (
        <div className={cn(
            "grid gap-3",
            className
        )}>
            <Label htmlFor={name}>{label}</Label>
            <Textarea
                name={name}
                disabled={disabled}
                value={value}
                className="h-full"
                onChange={handleChange}
                style={{
                    minHeight: minHeight
                }}
            />
        </div>
    )
}

export default TextAreaView