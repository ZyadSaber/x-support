"use client"

import { memo, useCallback, useState } from "react"
import { ChevronDownIcon } from "lucide-react"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

interface DatePickerProps {
    showTime?: boolean;
    onChange?: (name: string, value: string) => void;
    value: string;
    name: string;
    label: string;
    className?: string
    disabled?: boolean
}

const DatePicker = ({ value, onChange, name, label, className, disabled }: DatePickerProps) => {
    const [open, setOpen] = useState(false)

    const handleChange = useCallback((date: Date) => {
        onChange?.(name, format(date, "yyyy-MM-dd"))
    }, [name, onChange])

    return (
        <div className={cn(
            "flex flex-col gap-3",
            className
        )}>
            <Label htmlFor="date" className="px-1">
                {label}
            </Label>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        id="date"
                        className="w-full justify-between font-normal"
                        disabled={disabled}
                    >
                        <span>
                            {value}
                        </span>
                        <ChevronDownIcon />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        mode="single"
                        selected={new Date(value)}
                        captionLayout="dropdown"
                        onSelect={handleChange}
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}

export default memo(DatePicker)