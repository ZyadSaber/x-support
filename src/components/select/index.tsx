import { useCallback } from "react"
import LoadingSpinner from "../loading-spinner"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { SelectProps } from "./interface"

const SelectView = ({
    className,
    name,
    label,
    placeholder,
    value,
    onChange,
    options,
    loading,
    disabled
}: SelectProps) => {

    const handleChange = useCallback((value: string) => {
        onChange(name, value)
    }, [name, onChange])

    return (
        <div className={cn(
            "grid gap-3 ",
            className
        )}>
            <Label htmlFor={name}>{label}</Label>
            <Select value={value} name={name} onValueChange={handleChange} disabled={disabled}  >
                <SelectTrigger className="w-full">
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent >
                    {
                        loading ?
                            <div className="w-full flex justify-center items-center p-2">
                                <LoadingSpinner />
                            </div> :
                            <>
                                {options.map((option, index) => (
                                    <SelectItem key={index} value={option.key}>{option.value}</SelectItem>
                                ))}
                            </>
                    }
                </SelectContent>
            </Select>
        </div>
    )
}

export default SelectView
export * from "./interface"