import { Brain, Sparkles, MessageSquare } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useProfile } from "@/hooks/useProfile";

export const AICoachSection = () => {
  const { profile, updateProfile } = useProfile();

  const coachingStyles = [
    { 
      id: "gentle", 
      label: "Gentle Encouragement", 
      description: "Supportive and understanding approach",
      icon: "🌸"
    },
    { 
      id: "motivational", 
      label: "Motivational", 
      description: "Energetic and inspiring guidance",
      icon: "⚡"
    },
    { 
      id: "direct", 
      label: "Direct & Focused", 
      description: "Clear, concise instructions",
      icon: "🎯"
    },
  ];

  const currentStyle = profile?.wellness_preferences?.coaching_style || "gentle";
  const suggestionFrequency = profile?.wellness_preferences?.suggestion_frequency ?? true;

  const handleStyleChange = async (style: string) => {
    await updateProfile({
      wellness_preferences: {
        ...profile?.wellness_preferences,
        coaching_style: style as "gentle" | "motivational" | "direct",
      },
    });
  };

  const handleFrequencyChange = async (enabled: boolean) => {
    await updateProfile({
      wellness_preferences: {
        ...profile?.wellness_preferences,
        suggestion_frequency: enabled,
      },
    });
  };

  return (
    <Card className="p-4 mb-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 bg-wellness-focus/20 rounded-full flex items-center justify-center">
          <Brain className="w-4 h-4 text-wellness-focus" />
        </div>
        <h3 className="font-medium text-foreground">AI Wellness Coach</h3>
      </div>
      
      <div className="space-y-4">
        {/* Coaching Style */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <MessageSquare className="w-4 h-4 text-muted-foreground" />
            <p className="text-sm font-medium text-foreground">Coaching Style</p>
          </div>
          <div className="grid gap-2">
            {coachingStyles.map((style) => (
              <Button
                key={style.id}
                variant={currentStyle === style.id ? "default" : "outline"}
                className="justify-start h-auto p-3"
                onClick={() => handleStyleChange(style.id)}
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">{style.icon}</span>
                  <div className="text-left">
                    <p className="font-medium">{style.label}</p>
                    <p className="text-xs text-muted-foreground">{style.description}</p>
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </div>

        <Separator />

        {/* Suggestion Frequency */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium text-foreground">Smart Suggestions</p>
              <p className="text-xs text-muted-foreground">
                {suggestionFrequency ? "AI will suggest activities based on your patterns" : "Manual activity selection only"}
              </p>
            </div>
          </div>
          <Switch
            checked={suggestionFrequency}
            onCheckedChange={handleFrequencyChange}
            className="data-[state=checked]:bg-primary"
          />
        </div>
      </div>
    </Card>
  );
};