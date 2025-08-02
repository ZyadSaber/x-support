"use client";

import { useCallback, useState } from "react";
import { DateRange } from "react-day-picker";
import { ChevronDownIcon } from "lucide-react";
import { format } from "date-fns"
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerRangeProps {
  showTime?: boolean;
  onChange?: (name: string, value: string[]) => void;
  value: string[];
  name: string;
  label: string;
}

const DatePickerRange = ({
  showTime,
  onChange,
  value,
  name,
  label
}: DatePickerRangeProps) => {
  const [open, setOpen] = useState(false)
  const [dateFrom, dateTo] = value || [];
  const _dateFrom = dateFrom ? new Date(dateFrom) : undefined;
  const _dateTo = dateTo ? new Date(dateTo) : undefined;

  const computeValue = {
    from: _dateFrom,
    to: _dateTo,
    time_from: dateFrom && dateFrom.split(" ")[1] ? dateFrom.split(" ")[1] : undefined,
    time_to: dateTo && dateTo.split(" ")[1] ? dateTo.split(" ")[1] : undefined,
  };

  const formatRange = useCallback((range: DateRange | undefined) => {
    const { from, to } = range || {}
    const formatDateType = showTime ? "yyyy-MM-dd hh:mm aa" : "yyyy-MM-dd"
    const fromDate = from ? format(from, formatDateType) : ""
    const toDate = to ? format(to, formatDateType) : ""
    return `${fromDate} ~ ${toDate}`
  }, [showTime]);

  const handleSelect = useCallback((range: DateRange | undefined) => {
    const { from, to } = range || {}
    const formatDateType = showTime ? "yyyy-MM-dd HH:MM" : "yyyy-MM-dd"
    const fromDate = from ? format(from, formatDateType) : ""
    const toDate = to ? format(to, formatDateType) : ""
    onChange?.(name, [fromDate, toDate])
  }, [name, onChange, showTime]);

  const handleTimeChange = useCallback((which: "from" | "to",) => (event) => {
    const _value = event?.target?.value
    const [hours, minutes] = _value.split(":").map(Number);
    // if (which === "from" && computeValue.from) {
    //   const newFrom = new Date().setHours(hours, minutes, 0, 0);
    //   handleSelect({ to: computeValue.to, from: new Date(newFrom) })
    // } else if (which === "to" && computeValue.to) {
    //   const newTo = computeValue.to.setHours(hours, minutes, 0, 0);
    //   handleSelect({ from: computeValue.from, to: new Date(newTo) })
    // }
  }, []);

  return (
    <div className="flex flex-col gap-3">
      <Label htmlFor="date" className="px-1">
        {label}
      </Label>
      <Popover
        open={open}
        onOpenChange={setOpen}
      >
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className="w-64 justify-between font-normal transition-shadow focus:ring-2 focus:ring-primary/50 hover:shadow-md bg-white dark:bg-slate-900/60"
            aria-label="Select date range"
          >
            <span>{formatRange(computeValue)}</span>
            <ChevronDownIcon className="ml-2" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="range"
            selected={computeValue}
            numberOfMonths={2}
            captionLayout="dropdown"
            onSelect={handleSelect}
          />
          {showTime && computeValue?.from && (
            <div className="flex flex-col gap-2 p-4 border-t">
              <div className="flex items-center gap-2">
                <span className="w-16">From:</span>
                <input
                  type="time"
                  value={computeValue?.time_from}
                  onChange={handleTimeChange("from")}
                  className="border rounded px-2 py-1"
                />
              </div>
              {computeValue?.to && (
                <div className="flex items-center gap-2">
                  <span className="w-16">To:</span>
                  <input
                    type="time"
                    value={computeValue?.time_to}
                    onChange={handleTimeChange("to")}
                    className="border rounded px-2 py-1"
                  />
                </div>
              )}
              {computeValue?.from && computeValue?.to && (
                <Button
                  className="mt-2"
                  onClick={() => setOpen(false)}
                  type="button"
                >
                  Done
                </Button>
              )}
            </div>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default DatePickerRange