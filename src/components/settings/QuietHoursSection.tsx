import { useState } from "react";
import { Moon, Clock, Save, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useProfile } from "@/hooks/useProfile";

export const QuietHoursSection = () => {
  const { profile, updateWellnessPreferences } = useProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const quietHours = profile?.wellness_preferences?.quiet_hours || { start: "21:00", end: "07:00" };

  const handleEdit = () => {
    setStartTime(quietHours.start);
    setEndTime(quietHours.end);
    setIsEditing(true);
  };

  const handleSave = async () => {
    const success = await updateWellnessPreferences({
      quiet_hours: { start: startTime, end: endTime }
    });
    if (success) {
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  return (
    <div>
      <h3 className="text-sm font-medium text-muted-foreground mb-3 px-1">
        Preferences
      </h3>
      <Card className="overflow-hidden">
        <div className="flex items-center gap-3 p-4 hover:bg-muted/50 transition-colors">
          <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
            <Moon className="w-4 h-4 text-muted-foreground" />
          </div>
          <div className="flex-1">
            <p className="font-medium text-foreground">Quiet Hours</p>
            {isEditing ? (
              <div className="flex items-center gap-2 mt-2">
                <Input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-24"
                />
                <span className="text-muted-foreground">to</span>
                <Input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="w-24"
                />
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                {formatTime(quietHours.start)} - {formatTime(quietHours.end)}
              </p>
            )}
          </div>
          {isEditing ? (
            <div className="flex gap-1">
              <Button variant="ghost" size="sm" onClick={handleSave}>
                <Save className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={handleCancel}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <Button variant="ghost" size="sm" onClick={handleEdit}>
              <Clock className="w-4 h-4" />
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
};