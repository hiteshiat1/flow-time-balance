import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect } from "react";

interface TimePickerProps {
  value?: string;
  onChange: (time: string) => void;
  placeholder?: string;
}

export function TimePicker({ value, onChange, placeholder = "Select time" }: TimePickerProps) {
  const [hour, setHour] = useState<string>("");
  const [minute, setMinute] = useState<string>("");
  const [period, setPeriod] = useState<string>("AM");

  // Parse initial value
  useEffect(() => {
    if (value) {
      const timeMatch = value.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
      if (timeMatch) {
        setHour(timeMatch[1]);
        setMinute(timeMatch[2]);
        setPeriod(timeMatch[3].toUpperCase());
      }
    }
  }, [value]);

  // Update parent when time changes
  useEffect(() => {
    if (hour && minute && period) {
      const formattedTime = `${hour}:${minute} ${period}`;
      onChange(formattedTime);
    }
  }, [hour, minute, period, onChange]);

  const hours = Array.from({ length: 12 }, (_, i) => (i + 1).toString());
  const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));

  return (
    <div className="flex gap-2">
      <Select value={hour} onValueChange={setHour}>
        <SelectTrigger className="w-20">
          <SelectValue placeholder="Hour" />
        </SelectTrigger>
        <SelectContent>
          {hours.map((h) => (
            <SelectItem key={h} value={h}>
              {h}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={minute} onValueChange={setMinute}>
        <SelectTrigger className="w-20">
          <SelectValue placeholder="Min" />
        </SelectTrigger>
        <SelectContent className="max-h-60">
          {minutes.filter((_, i) => i % 5 === 0).map((m) => (
            <SelectItem key={m} value={m}>
              {m}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={period} onValueChange={setPeriod}>
        <SelectTrigger className="w-20">
          <SelectValue placeholder="AM/PM" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="AM">AM</SelectItem>
          <SelectItem value="PM">PM</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}