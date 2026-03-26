"use client";

import * as React from "react";
import {
  format,
  subDays,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
} from "date-fns";
import { ka } from "date-fns/locale";
import { Calendar as CalendarIcon, Check } from "lucide-react";
import { DateRange } from "react-day-picker";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DateRangeFilterProps {
  onFilter: (dateFrom: string, dateTo: string) => void;
}

export default function DateRangeFilter({ onFilter }: DateRangeFilterProps) {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: new Date(),
  });

  const handleApply = () => {
    if (date?.from && date?.to) {
      onFilter(format(date.from, "yyyy-MM-dd"), format(date.to, "yyyy-MM-dd"));
    } else {
      onFilter("", "");
    }
    setOpen(false);
  };

  const setPreset = (preset: string) => {
    const today = new Date();
    switch (preset) {
      case "today":
        setDate(undefined);
        break;
      case "lastWeek":
        setDate({ from: subDays(today, 7), to: today });
        break;
      case "lastMonth":
        setDate({
          from: startOfMonth(subDays(today, 30)),
          to: endOfMonth(subDays(today, 30)),
        });
        break;
      case "lastYear":
        setDate({
          from: startOfYear(subDays(today, 365)),
          to: endOfYear(subDays(today, 365)),
        });
        break;
    }
  };

  return (
    <div className="grid gap-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button id="date" variant={"outline"}>
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y", { locale: ka })} -{" "}
                  {format(date.to, "LLL dd, y", { locale: ka })}
                </>
              ) : (
                format(date.from, "LLL dd, y", { locale: ka })
              )
            ) : (
              <span>აირჩიეთ პერიოდი</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 shadow-2xl" align="end">
          <div className="flex flex-col md:flex-row">
            {/* სწრაფი შერჩევის მენიუ (Presets) */}
            <div className="flex flex-col border-b md:border-b-0 md:border-r  p-2 sm:w-[160px]">
              <div className="px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                შერჩევა
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="justify-start font-normal hover:bg-slate-900 text-slate-300"
                onClick={() => setPreset("today")}
              >
                დღეს
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="justify-start font-normal hover:bg-slate-900 text-slate-300"
                onClick={() => setPreset("lastWeek")}
              >
                წინა კვირა
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="justify-start font-normal hover:bg-slate-900 text-slate-300"
                onClick={() => setPreset("lastMonth")}
              >
                წინა თვე
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="justify-start font-normal hover:bg-slate-900 text-slate-300"
                onClick={() => setPreset("lastYear")}
              >
                წინა წელი
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="justify-start font-normal hover:bg-slate-900 text-slate-300"
                onClick={() => setDate(undefined)}
              >
                გასუფთავება
              </Button>
            </div>

            {/* კალენდრის ნაწილი */}
            <div className="p-2">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
                numberOfMonths={2}
                locale={ka}
                className="bg-transparent text-slate-200"
              />

              {/* ქვედა ღილაკები */}
              <div className="flex items-center justify-end gap-2 border-t border-slate-800 pt-2 mt-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setOpen(false)}
                >
                  გაუქმება
                </Button>
                <Button
                  size="sm"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white"
                  onClick={handleApply}
                >
                  გაფილტვრა
                </Button>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
