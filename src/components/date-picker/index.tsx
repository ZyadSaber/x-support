"use client"

import { memo, useCallback, useState } from "react"
import { ChevronDownIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Label } from "@/components/ui/label"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

const DatePicker = () => {
    const [open, setOpen] = useState(false)

    return (
        <div className="flex flex-col gap-3">
            <Label htmlFor="date" className="px-1">
                Date of birth
            </Label>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        id="date"
                        className="w-48 justify-between font-normal"
                    >
                        {/* {date ? date.toLocaleDateString() : "Select date"} */}
                        23-08-2025
                        <ChevronDownIcon />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                    <Calendar
                        mode="single"
                        // selected={date}
                        captionLayout="dropdown"
                    // onSelect={(date) => {
                    //     setDate(date)
                    //     setOpen(false)
                    // }}
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}

export default memo(DatePicker)