import { useState } from "react";
import { Bot, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useProfile } from "@/hooks/useProfile";

export const AICoachSection = () => {
  const { profile, updateWellnessPreferences } = useProfile();
  const [isChangingStyle, setIsChangingStyle] = useState(false);

  const coachingStyle = profile?.wellness_preferences?.coaching_style || "gentle";
  const suggestionFrequency = profile?.wellness_preferences?.suggestion_frequency ?? true;

  const coachingStyles = [
    { value: "gentle", label: "Gentle Encouragement", description: "Soft, supportive guidance" },
    { value: "motivational", label: "Motivational", description: "Energetic and inspiring" },
    { value: "mindful", label: "Mindful Guide", description: "Calm and centered approach" },
    { value: "practical", label: "Practical Coach", description: "Direct and action-oriented" }
  ];

  const handleStyleChange = async (newStyle: string) => {
    await updateWellnessPreferences({ coaching_style: newStyle });
    setIsChangingStyle(false);
  };

  const handleFrequencyToggle = async (enabled: boolean) => {
    await updateWellnessPreferences({ suggestion_frequency: enabled });
  };

  const getCurrentStyleLabel = () => {
    const style = coachingStyles.find(s => s.value === coachingStyle);
    return style?.label || "Gentle Encouragement";
  };

  const getCurrentStyleDescription = () => {
    const style = coachingStyles.find(s => s.value === coachingStyle);
    return style?.description || "Soft, supportive guidance";
  };

  return (
    <Card className="p-4 mb-6">
      <div className="flex items-center gap-2 mb-3">
        <Bot className="w-5 h-5 text-primary" />
        <h3 className="font-medium text-foreground">AI Wellness Coach</h3>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-foreground">Coaching Style</p>
            {isChangingStyle ? (
              <Select value={coachingStyle} onValueChange={handleStyleChange}>
                <SelectTrigger className="w-full mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {coachingStyles.map((style) => (
                    <SelectItem key={style.value} value={style.value}>
                      <div>
                        <div className="font-medium">{style.label}</div>
                        <div className="text-xs text-muted-foreground">{style.description}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <p className="text-xs text-muted-foreground">{getCurrentStyleDescription()}</p>
            )}
          </div>
          {!isChangingStyle && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setIsChangingStyle(true)}
            >
              <Sparkles className="w-4 h-4 mr-1" />
              Change
            </Button>
          )}
        </div>
        
        <Separator />
        
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-foreground">Smart Scheduling</p>
            <p className="text-xs text-muted-foreground">
              {suggestionFrequency ? "AI suggests optimal times" : "Manual scheduling only"}
            </p>
          </div>
          <Switch
            checked={suggestionFrequency}
            onCheckedChange={handleFrequencyToggle}
            className="data-[state=checked]:bg-primary"
          />
        </div>
      </div>
    </Card>
  );
};