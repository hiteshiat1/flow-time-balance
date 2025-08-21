import { LogOut } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/Navigation";
import { useAuth } from "@/contexts/AuthContext";
import { ProfileSection } from "@/components/settings/ProfileSection";
import { WellnessGoalsSection } from "@/components/settings/WellnessGoalsSection";
import { NotificationSettings } from "@/components/settings/NotificationSettings";
import { QuietHoursSection } from "@/components/settings/QuietHoursSection";
import { AICoachSection } from "@/components/settings/AICoachSection";
import { CalendarIntegration } from "@/components/settings/CalendarIntegration";
import { HelpSupportSection } from "@/components/settings/HelpSupportSection";
import { toast } from "@/hooks/use-toast";

const Settings = () => {
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Signed out",
        description: "You have been successfully signed out.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-soft via-background to-accent-soft">
      <div className="container mx-auto px-4 py-6 max-w-md">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-semibold text-foreground mb-2">Settings</h1>
          <p className="text-sm text-muted-foreground">Customize your MeTime experience</p>
        </div>

        {/* Profile Section */}
        <ProfileSection />

        {/* Wellness Goals */}
        <WellnessGoalsSection />

        {/* Calendar Integration */}
        <CalendarIntegration />

        {/* Notifications */}
        <NotificationSettings />

        {/* Quiet Hours */}
        <QuietHoursSection />

        {/* AI Coach Settings */}
        <AICoachSection />

        {/* Help & Support */}
        <HelpSupportSection />

        {/* Logout Button */}
        <Card className="p-4 mb-6">
          <Button 
            variant="ghost" 
            className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={handleSignOut}
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