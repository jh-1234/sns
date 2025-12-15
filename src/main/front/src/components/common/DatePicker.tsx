import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { Calendar } from "../ui/calendar";

interface DatePickerProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  placeholder?: string;
  fromYear?: number;
  toYear?: number;
}

const DatePicker = ({
  date,
  setDate,
  placeholder,
  fromYear = 1900,
  toYear = new Date().getFullYear(),
}: DatePickerProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start bg-transparent py-6 text-left font-normal",
            !date && "text-muted-foreground",
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? (
            format(date, "yyyy년 MM월 dd일", { locale: ko })
          ) : (
            <span>{placeholder}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          captionLayout="dropdown"
          fromYear={fromYear}
          toYear={toYear}
          locale={ko}
        />

        <div className="border-t p-3">
          <Button
            variant={"ghost"}
            className="w-full text-sm text-red-500 hover:text-red-600"
            onClick={() => setDate(undefined)}
          >
            날짜초기화
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;
