import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface TimePickerProps {
  value?: string;
  onChange: (time: string) => void;
  className?: string;
  disabled?: boolean;
}

export const TimePicker: React.FC<TimePickerProps> = ({
  value,
  onChange,
  className,
  disabled = false
}) => {
  const parseTime = (timeString: string) => {
    if (!timeString) return { hour: "9", minute: "00", period: "AM" };
    
    try {
      const [time, period] = timeString.split(" ");
      const [hour, minute] = time.split(":");
      return { hour, minute: minute || "00", period: period || "AM" };
    } catch {
      return { hour: "9", minute: "00", period: "AM" };
    }
  };

  const formatTime = (hour: string, minute: string, period: string) => {
    return `${hour}:${minute} ${period}`;
  };

  const { hour, minute, period } = parseTime(value || "");

  const handleHourChange = (newHour: string) => {
    const newTime = formatTime(newHour, minute, period);
    onChange(newTime);
  };

  const handleMinuteChange = (newMinute: string) => {
    const newTime = formatTime(hour, newMinute, period);
    onChange(newTime);
  };

  const handlePeriodChange = (newPeriod: string) => {
    const newTime = formatTime(hour, minute, newPeriod);
    onChange(newTime);
  };

  // Generate hours 1-12
  const hours = Array.from({ length: 12 }, (_, i) => (i + 1).toString());
  
  // Generate minutes in 15-minute intervals
  const minutes = ["00", "15", "30", "45"];
  
  const periods = ["AM", "PM"];

  return (
    <div className={`flex gap-2 ${className}`}>
      <div className="flex-1">
        <Label className="text-sm text-muted-foreground mb-1 block">Hour</Label>
        <Select value={hour} onValueChange={handleHourChange} disabled={disabled}>
          <SelectTrigger>
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
      </div>

      <div className="flex-1">
        <Label className="text-sm text-muted-foreground mb-1 block">Minute</Label>
        <Select value={minute} onValueChange={handleMinuteChange} disabled={disabled}>
          <SelectTrigger>
            <SelectValue placeholder="Min" />
          </SelectTrigger>
          <SelectContent>
            {minutes.map((m) => (
              <SelectItem key={m} value={m}>
                {m}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex-1">
        <Label className="text-sm text-muted-foreground mb-1 block">Period</Label>
        <Select value={period} onValueChange={handlePeriodChange} disabled={disabled}>
          <SelectTrigger>
            <SelectValue placeholder="AM/PM" />
          </SelectTrigger>
          <SelectContent>
            {periods.map((p) => (
              <SelectItem key={p} value={p}>
                {p}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};