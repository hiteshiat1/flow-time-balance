import { Calendar, ExternalLink, Check, AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

export const CalendarIntegration = () => {
  const { toast } = useToast();

  // Mock connection states - in real app, these would come from user preferences
  const integrations = [
    {
      name: "Google Calendar",
      icon: "🗓️",
      connected: false,
      description: "Sync wellness activities with Google Calendar"
    },
    {
      name: "Apple Calendar",
      icon: "📅", 
      connected: false,
      description: "Connect via CalDAV for Apple Calendar sync"
    }
  ];

  const handleConnect = (provider: string) => {
    toast({
      title: "Calendar Integration",
      description: `${provider} integration coming soon! This will sync your wellness activities.`,
    });
  };

  const handleDisconnect = (provider: string) => {
    toast({
      title: "Disconnected",
      description: `${provider} has been disconnected`,
    });
  };

  return (
    <div>
      <h3 className="text-sm font-medium text-muted-foreground mb-3 px-1">
        Account
      </h3>
      <Card className="overflow-hidden">
        <div className="flex items-center gap-3 p-4 hover:bg-muted/50 transition-colors">
          <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
            <Calendar className="w-4 h-4 text-muted-foreground" />
          </div>
          <div className="flex-1">
            <p className="font-medium text-foreground">Calendar Integration</p>
            <p className="text-sm text-muted-foreground">Connect Google & Apple Calendar</p>
          </div>
          <ExternalLink className="w-4 h-4 text-muted-foreground" />
        </div>
        
        <Separator className="ml-14" />
        
        <div className="p-4 ml-11 space-y-3">
          {integrations.map((integration, index) => (
            <div key={integration.name} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-lg">{integration.icon}</span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-foreground">{integration.name}</span>
                    {integration.connected ? (
                      <Badge variant="secondary" className="bg-wellness-energy/10 text-wellness-energy">
                        <Check className="w-3 h-3 mr-1" />
                        Connected
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-muted-foreground">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        Not connected
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">{integration.description}</p>
                </div>
              </div>
              <Button
                variant={integration.connected ? "outline" : "default"}
                size="sm"
                onClick={() => integration.connected ? 
                  handleDisconnect(integration.name) : 
                  handleConnect(integration.name)
                }
              >
                {integration.connected ? "Disconnect" : "Connect"}
              </Button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};