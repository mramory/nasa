"use client";

import {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
  memo,
  useMemo,
} from "react";
import { format, subDays } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DatePickerWithPresetsProps {
  default: Date | DateRange | undefined;
  setDate: Dispatch<SetStateAction<Date | DateRange | undefined>>;
}

export const DatePickerWithPresets = memo(function DatePickerWithPresets({
  default: defaultDate,
  setDate: throwDate,
}: DatePickerWithPresetsProps) {
  const range = useMemo(() => {
    return {
      from: subDays(new Date(), 7),
      to: new Date(),
    };
  }, []);

  const dateType = useMemo(() => {
    if (defaultDate instanceof Date || defaultDate === undefined)
      return "single";
    else return "range";
  }, [defaultDate]);

  const [mode, setMode] = useState<"single" | "range">(dateType);

  const onSelectChange = (value: string) => {
    if (parseInt(value) >= 0) {
      throwDate(subDays(new Date(), parseInt(value)));
      if (mode === "range") {
        setMode("single");
      }
    } else {
      if (mode === "single") {
        setMode("range");
      }
    }
  };

  useEffect(() => {
    if (mode === "range" && dateType === "single") {
      throwDate(range);
    }
  }, [mode]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !defaultDate && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          <span>Pick a date</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex w-auto flex-col space-y-2 p-2">
        <Select onValueChange={onSelectChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="0">Today</SelectItem>
            <SelectItem value="1">Yesterday</SelectItem>
            <SelectItem value="-1">Select Range</SelectItem>
          </SelectContent>
        </Select>
        <div className="rounded-md border">
          {mode === "single" ? (
            <Calendar
              toDate={new Date()}
              mode="single"
              selected={defaultDate as Date | undefined}
              onSelect={throwDate}
            />
          ) : (
            <Calendar
              toDate={new Date()}
              mode="range"
              defaultMonth={range?.from}
              selected={(defaultDate as DateRange | undefined) || range}
              onSelect={throwDate}
            />
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
});
