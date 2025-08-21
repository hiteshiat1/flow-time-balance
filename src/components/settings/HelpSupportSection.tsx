import { HelpCircle, Mail, MessageSquare, Book, ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";

export const HelpSupportSection = () => {
  const handleContactSupport = () => {
    toast({
      title: "Contact Support",
      description: "Support form will open in a future update. For now, please email support@metime.app",
    });
  };

  const handleViewDocs = () => {
    toast({
      title: "Documentation",
      description: "User guide and documentation coming soon!",
    });
  };

  const handleFeedback = () => {
    toast({
      title: "Send Feedback",
      description: "Feedback form will be available in a future update.",
    });
  };

  const supportItems = [
    {
      icon: HelpCircle,
      label: "Help Center",
      description: "Browse frequently asked questions",
      action: handleViewDocs,
    },
    {
      icon: Mail,
      label: "Contact Support",
      description: "Get help from our support team",
      action: handleContactSupport,
    },
    {
      icon: MessageSquare,
      label: "Send Feedback",
      description: "Help us improve MeTime",
      action: handleFeedback,
    },
    {
      icon: Book,
      label: "User Guide",
      description: "Learn how to use MeTime effectively",
      action: handleViewDocs,
    },
  ];

  return (
    <div>
      <h3 className="text-sm font-medium text-muted-foreground mb-3 px-1">
        Support
      </h3>
      <Card className="overflow-hidden">
        {supportItems.map((item, index) => (
          <div key={item.label}>
            <div 
              className="flex items-center gap-3 p-4 hover:bg-muted/50 transition-colors cursor-pointer"
              onClick={item.action}
            >
              <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                <item.icon className="w-4 h-4 text-muted-foreground" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-foreground">{item.label}</p>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
              <ExternalLink className="w-4 h-4 text-muted-foreground" />
            </div>
            {index < supportItems.length - 1 && (
              <Separator className="ml-14" />
            )}
          </div>
        ))}
      </Card>
    </div>
  );
};