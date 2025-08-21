import { useState } from "react";
import { Target, Plus, Minus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useProfile } from "@/hooks/useProfile";

export const WellnessGoalsSection = () => {
  const { profile, updateProfile } = useProfile();
  const [dailyGoal, setDailyGoal] = useState(profile?.wellness_preferences?.daily_goal || 6);

  const handleUpdateGoal = async (newGoal: number) => {
    const goal = Math.max(1, Math.min(20, newGoal)); // Limit between 1-20
    setDailyGoal(goal);
    
    await updateProfile({
      wellness_preferences: {
        ...profile?.wellness_preferences,
        daily_goal: goal,
      },
    });
  };

  return (
    <Card className="p-4 mb-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 bg-wellness-energy/20 rounded-full flex items-center justify-center">
          <Target className="w-4 h-4 text-wellness-energy" />
        </div>
        <h3 className="font-medium text-foreground">Daily Wellness Goal</h3>
      </div>
      
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Target activities per day</p>
          <div className="flex items-center gap-3 mt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleUpdateGoal(dailyGoal - 1)}
              disabled={dailyGoal <= 1}
            >
              <Minus className="w-4 h-4" />
            </Button>
            <span className="text-2xl font-bold text-primary min-w-[2rem] text-center">
              {dailyGoal}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleUpdateGoal(dailyGoal + 1)}
              disabled={dailyGoal >= 20}
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs text-muted-foreground">Recommended: 4-8</p>
          <p className="text-xs text-muted-foreground">activities per day</p>
        </div>
      </div>
    </Card>
  );
};