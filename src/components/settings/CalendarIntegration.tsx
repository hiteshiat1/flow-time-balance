import { Calendar, ExternalLink, CheckCircle, AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";

export const CalendarIntegration = () => {
  // Mock connection states - in a real app, this would come from user settings/database
  const googleConnected = false;
  const appleConnected = false;

  const handleGoogleConnect = async () => {
    // In a real implementation, this would initiate OAuth flow
    toast({
      title: "Google Calendar",
      description: "Calendar integration will be available in a future update.",
    });
  };

  const handleAppleConnect = async () => {
    // In a real implementation, this would handle CalDAV connection
    toast({
      title: "Apple Calendar", 
      description: "Calendar integration will be available in a future update.",
    });
  };

  const handleDisconnect = async (provider: string) => {
    toast({
      title: `${provider} Calendar`,
      description: `${provider} calendar disconnected successfully.`,
    });
  };

  return (
    <div>
      <h3 className="text-sm font-medium text-muted-foreground mb-3 px-1">
        Account
      </h3>
      <Card className="overflow-hidden">
        {/* Google Calendar */}
        <div className="p-4 hover:bg-muted/50 transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
              <Calendar className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <p className="font-medium text-foreground">Google Calendar</p>
                {googleConnected ? (
                  <Badge variant="secondary" className="bg-wellness-energy/20 text-wellness-energy">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Connected
                  </Badge>
                ) : (
                  <Badge variant="outline" className="border-muted-foreground/30">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    Not Connected
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                {googleConnected 
                  ? "Wellness activities synced with your Google Calendar" 
                  : "Connect to sync wellness activities"
                }
              </p>
            </div>
            {googleConnected ? (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleDisconnect("Google")}
              >
                Disconnect
              </Button>
            ) : (
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleGoogleConnect}
              >
                <ExternalLink className="w-4 h-4 mr-1" />
                Connect
              </Button>
            )}
          </div>
        </div>

        <Separator className="ml-14" />

        {/* Apple Calendar */}
        <div className="p-4 hover:bg-muted/50 transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
              <Calendar className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <p className="font-medium text-foreground">Apple Calendar</p>
                {appleConnected ? (
                  <Badge variant="secondary" className="bg-wellness-energy/20 text-wellness-energy">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Connected
                  </Badge>
                ) : (
                  <Badge variant="outline" className="border-muted-foreground/30">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    Not Connected
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                {appleConnected 
                  ? "Wellness activities synced with your Apple Calendar" 
                  : "Connect to sync wellness activities via CalDAV"
                }
              </p>
            </div>
            {appleConnected ? (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleDisconnect("Apple")}
              >
                Disconnect
              </Button>
            ) : (
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleAppleConnect}
              >
                <ExternalLink className="w-4 h-4 mr-1" />
                Connect
              </Button>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};