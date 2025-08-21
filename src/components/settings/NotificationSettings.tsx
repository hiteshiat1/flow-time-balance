import { Bell, Volume2, Smartphone } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useProfile } from "@/hooks/useProfile";

export const NotificationSettings = () => {
  const { profile, updateNotificationPreferences } = useProfile();

  const notificationPrefs = profile?.notification_preferences || {};

  const handleToggle = async (key: string, value: boolean) => {
    await updateNotificationPreferences({ [key]: value });
  };

  const notificationItems = [
    {
      icon: Bell,
      label: "Activity Reminders",
      description: "Get notified about wellness activities",
      key: "daily_reminders",
      enabled: notificationPrefs.daily_reminders ?? true
    },
    {
      icon: Volume2,
      label: "Sound Effects",
      description: "Play sounds during activities",
      key: "sound_effects",
      enabled: notificationPrefs.sound_effects ?? true
    },
    {
      icon: Smartphone,
      label: "Push Notifications",
      description: "Receive notifications on your device",
      key: "push_notifications",
      enabled: notificationPrefs.push_notifications ?? false
    }
  ];

  return (
    <div>
      <h3 className="text-sm font-medium text-muted-foreground mb-3 px-1">
        Notifications
      </h3>
      <Card className="overflow-hidden">
        {notificationItems.map((item, index) => (
          <div key={item.key}>
            <div className="flex items-center gap-3 p-4 hover:bg-muted/50 transition-colors">
              <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                <item.icon className="w-4 h-4 text-muted-foreground" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-foreground">{item.label}</p>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
              <Switch
                checked={item.enabled}
                onCheckedChange={(checked) => handleToggle(item.key, checked)}
                className="data-[state=checked]:bg-primary"
              />
            </div>
            {index < notificationItems.length - 1 && (
              <Separator className="ml-14" />
            )}
          </div>
        ))}
      </Card>
    </div>
  );
};