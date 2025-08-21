import { Bell, Volume2, Smartphone } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useProfile } from "@/hooks/useProfile";

export const NotificationSettings = () => {
  const { profile, updateProfile } = useProfile();

  const handleNotificationChange = async (key: string, value: boolean) => {
    const currentPrefs = profile?.notification_preferences || {
      daily_reminders: true,
      wellness_breaks: true,
      achievements: true,
      push_notifications: false,
    };

    await updateProfile({
      notification_preferences: {
        ...currentPrefs,
        [key]: value,
      },
    });
  };

  const notificationItems = [
    {
      icon: Bell,
      label: "Activity Reminders",
      description: "Get notified about wellness activities",
      key: "daily_reminders",
      enabled: profile?.notification_preferences?.daily_reminders ?? true,
    },
    {
      icon: Volume2,
      label: "Sound Effects",
      description: "Play sounds during activities",
      key: "wellness_breaks",
      enabled: profile?.notification_preferences?.wellness_breaks ?? true,
    },
    {
      icon: Smartphone,
      label: "Push Notifications",
      description: "Receive notifications on your device",
      key: "push_notifications",
      enabled: profile?.notification_preferences?.push_notifications ?? false,
    },
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
                onCheckedChange={(checked) => handleNotificationChange(item.key, checked)}
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