import { useState } from "react";
import { Moon, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useProfile } from "@/hooks/useProfile";

export const QuietHoursSection = () => {
  const { profile, updateProfile } = useProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [startTime, setStartTime] = useState(
    profile?.wellness_preferences?.quiet_hours?.start || "21:00"
  );
  const [endTime, setEndTime] = useState(
    profile?.wellness_preferences?.quiet_hours?.end || "07:00"
  );

  const quietHoursEnabled = profile?.wellness_preferences?.quiet_hours?.enabled ?? false;

  const handleToggleQuietHours = async (enabled: boolean) => {
    await updateProfile({
      wellness_preferences: {
        ...profile?.wellness_preferences,
        quiet_hours: {
          enabled,
          start: startTime,
          end: endTime,
        },
      },
    });
  };

  const handleSaveQuietHours = async () => {
    await updateProfile({
      wellness_preferences: {
        ...profile?.wellness_preferences,
        quiet_hours: {
          enabled: quietHoursEnabled,
          start: startTime,
          end: endTime,
        },
      },
    });
    setIsEditing(false);
  };

  const formatTimeRange = () => {
    const start12 = new Date(`2000-01-01T${startTime}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
    const end12 = new Date(`2000-01-01T${endTime}`).toLocaleTimeString('en-US', {
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true,
    });
    return `${start12} - ${end12}`;
  };

  return (
    <div>
      <h3 className="text-sm font-medium text-muted-foreground mb-3 px-1">
        Preferences
      </h3>
      <Card className="overflow-hidden">
        <div className="p-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
              <Moon className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-foreground">Quiet Hours</p>
              <p className="text-sm text-muted-foreground">
                {quietHoursEnabled ? formatTimeRange() : "Disabled"}
              </p>
            </div>
            <Switch
              checked={quietHoursEnabled}
              onCheckedChange={handleToggleQuietHours}
              className="data-[state=checked]:bg-primary"
            />
          </div>

          {quietHoursEnabled && (
            <>
              <Separator className="mb-4" />
              {isEditing ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="start-time" className="text-sm">Start Time</Label>
                      <Input
                        id="start-time"
                        type="time"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="end-time" className="text-sm">End Time</Label>
                      <Input
                        id="end-time"
                        type="time"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" onClick={handleSaveQuietHours}>
                      Save
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setIsEditing(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      No notifications during these hours
                    </span>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)}>
                    Edit
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </Card>
    </div>
  );
};