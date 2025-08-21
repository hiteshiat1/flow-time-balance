import { HelpCircle, MessageCircle, Book, Mail, ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

export const HelpSupportSection = () => {
  const { toast } = useToast();

  const handleSupport = (type: string) => {
    toast({
      title: "Support",
      description: `${type} support will be available soon! Thank you for your patience.`,
    });
  };

  const supportOptions = [
    {
      icon: MessageCircle,
      label: "Live Chat",
      description: "Chat with our support team",
      action: () => handleSupport("Live chat")
    },
    {
      icon: Book,
      label: "Help Center", 
      description: "Browse our knowledge base",
      action: () => handleSupport("Help center")
    },
    {
      icon: Mail,
      label: "Email Support",
      description: "Send us a detailed message",
      action: () => handleSupport("Email")
    }
  ];

  return (
    <div>
      <h3 className="text-sm font-medium text-muted-foreground mb-3 px-1">
        Support
      </h3>
      <Card className="overflow-hidden">
        <div className="flex items-center gap-3 p-4 hover:bg-muted/50 transition-colors">
          <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
            <HelpCircle className="w-4 h-4 text-muted-foreground" />
          </div>
          <div className="flex-1">
            <p className="font-medium text-foreground">Help & Support</p>
            <p className="text-sm text-muted-foreground">Get help and contact support</p>
          </div>
          <ExternalLink className="w-4 h-4 text-muted-foreground" />
        </div>

        <Separator className="ml-14" />

        <div className="p-4 ml-11 space-y-3">
          {supportOptions.map((option, index) => (
            <div key={option.label}>
              <Button
                variant="ghost"
                className="w-full justify-start p-0 h-auto"
                onClick={option.action}
              >
                <div className="flex items-center gap-3 w-full">
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                    <option.icon className="w-3 h-3 text-primary" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-foreground">{option.label}</p>
                    <p className="text-xs text-muted-foreground">{option.description}</p>
                  </div>
                </div>
              </Button>
              {index < supportOptions.length - 1 && <Separator className="my-2" />}
            </div>
          ))}
        </div>

        <Separator className="ml-14" />
        
        <div className="p-4 ml-11">
          <div className="text-center">
            <p className="text-xs text-muted-foreground mb-1">App Version</p>
            <p className="text-xs font-medium text-foreground">MeTime v1.0.0</p>
            <p className="text-xs text-muted-foreground mt-1">Built with ❤️ for your wellness</p>
          </div>
        </div>
      </Card>
    </div>
  );
};