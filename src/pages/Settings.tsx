import { 
  Bell, 
  Calendar, 
  User, 
  Moon, 
  Volume2, 
  Smartphone, 
  ChevronRight,
  LogOut,
  HelpCircle
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Navigation } from "@/components/Navigation";

const Settings = () => {
  const settingsSections = [
    {
      title: "Account",
      items: [
        {
          icon: User,
          label: "Profile",
          description: "Manage your personal information",
          hasArrow: true
        },
        {
          icon: Calendar,
          label: "Calendar Integration",
          description: "Connect Google & Apple Calendar",
          hasArrow: true
        }
      ]
    },
    {
      title: "Notifications",
      items: [
        {
          icon: Bell,
          label: "Activity Reminders",
          description: "Get notified about wellness activities",
          hasSwitch: true,
          enabled: true
        },
        {
          icon: Volume2,
          label: "Sound Effects",
          description: "Play sounds during activities",
          hasSwitch: true,
          enabled: true
        },
        {
          icon: Smartphone,
          label: "Push Notifications",
          description: "Receive notifications on your device",
          hasSwitch: true,
          enabled: false
        }
      ]
    },
    {
      title: "Preferences",
      items: [
        {
          icon: Moon,
          label: "Quiet Hours",
          description: "9:00 PM - 7:00 AM",
          hasArrow: true
        }
      ]
    },
    {
      title: "Support",
      items: [
        {
          icon: HelpCircle,
          label: "Help & Support",
          description: "Get help and contact support",
          hasArrow: true
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-soft via-background to-accent-soft">
      <div className="container mx-auto px-4 py-6 max-w-md">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-semibold text-foreground mb-2">Settings</h1>
          <p className="text-sm text-muted-foreground">Customize your MeTime experience</p>
        </div>

        {/* Profile Card */}
        <Card className="p-4 mb-6 bg-gradient-to-r from-card to-primary-soft/30">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-foreground">Alex Chen</h3>
              <p className="text-sm text-muted-foreground">alex.chen@company.com</p>
            </div>
            <Button variant="ghost" size="sm">
              Edit
            </Button>
          </div>
        </Card>

        {/* Wellness Goals */}
        <Card className="p-4 mb-6">
          <h3 className="font-medium text-foreground mb-3">Daily Wellness Goal</h3>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Target activities per day</p>
              <p className="text-2xl font-bold text-primary">6</p>
            </div>
            <Button variant="outline" size="sm">
              Adjust
            </Button>
          </div>
        </Card>

        {/* Settings Sections */}
        <div className="space-y-6 mb-6">
          {settingsSections.map((section, sectionIndex) => (
            <div key={sectionIndex}>
              <h3 className="text-sm font-medium text-muted-foreground mb-3 px-1">
                {section.title}
              </h3>
              <Card className="overflow-hidden">
                {section.items.map((item, itemIndex) => (
                  <div key={itemIndex}>
                    <div className="flex items-center gap-3 p-4 hover:bg-muted/50 transition-colors">
                      <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                        <item.icon className="w-4 h-4 text-muted-foreground" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{item.label}</p>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                      {item.hasSwitch && (
                        <Switch 
                          defaultChecked={item.enabled} 
                          className="data-[state=checked]:bg-primary"
                        />
                      )}
                      {item.hasArrow && (
                        <ChevronRight className="w-4 h-4 text-muted-foreground" />
                      )}
                    </div>
                    {itemIndex < section.items.length - 1 && (
                      <Separator className="ml-14" />
                    )}
                  </div>
                ))}
              </Card>
            </div>
          ))}
        </div>

        {/* AI Coaching Settings */}
        <Card className="p-4 mb-6">
          <h3 className="font-medium text-foreground mb-3">AI Wellness Coach</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Coaching Style</p>
                <p className="text-xs text-muted-foreground">Gentle encouragement</p>
              </div>
              <Button variant="outline" size="sm">
                Change
              </Button>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Suggestion Frequency</p>
                <p className="text-xs text-muted-foreground">Smart scheduling enabled</p>
              </div>
              <Switch defaultChecked className="data-[state=checked]:bg-primary" />
            </div>
          </div>
        </Card>

        {/* Logout Button */}
        <Card className="p-4 mb-6">
          <Button 
            variant="ghost" 
            className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </Card>

        {/* Version Info */}
        <div className="text-center mb-6">
          <p className="text-xs text-muted-foreground">MeTime v1.0.0</p>
          <p className="text-xs text-muted-foreground">Built with ❤️ for your wellness</p>
        </div>

        <Navigation />
      </div>
    </div>
  );
};

export default Settings;