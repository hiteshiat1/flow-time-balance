import { useState } from "react";
import { Target, Minus, Plus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useProfile } from "@/hooks/useProfile";

export const WellnessGoalsSection = () => {
  const { profile, updateWellnessPreferences } = useProfile();
  const [isAdjusting, setIsAdjusting] = useState(false);
  const [tempGoal, setTempGoal] = useState(0);

  const currentGoal = profile?.wellness_preferences?.daily_goal || 6;

  const handleAdjust = () => {
    setTempGoal(currentGoal);
    setIsAdjusting(true);
  };

  const handleSave = async () => {
    await updateWellnessPreferences({ daily_goal: tempGoal });
    setIsAdjusting(false);
  };

  const handleCancel = () => {
    setIsAdjusting(false);
    setTempGoal(0);
  };

  const adjustGoal = (delta: number) => {
    const newGoal = Math.max(1, Math.min(20, tempGoal + delta));
    setTempGoal(newGoal);
  };

  return (
    <Card className="p-4 mb-6">
      <div className="flex items-center gap-2 mb-3">
        <Target className="w-5 h-5 text-primary" />
        <h3 className="font-medium text-foreground">Daily Wellness Goal</h3>
      </div>
      
      {isAdjusting ? (
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => adjustGoal(-1)}
              disabled={tempGoal <= 1}
            >
              <Minus className="w-4 h-4" />
            </Button>
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">{tempGoal}</p>
              <p className="text-sm text-muted-foreground">activities per day</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => adjustGoal(1)}
              disabled={tempGoal >= 20}
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex gap-2">
            <Button variant="default" size="sm" onClick={handleSave} className="flex-1">
              Save Goal
            </Button>
            <Button variant="outline" size="sm" onClick={handleCancel}>
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Target activities per day</p>
            <p className="text-2xl font-bold text-primary">{currentGoal}</p>
          </div>
          <Button variant="outline" size="sm" onClick={handleAdjust}>
            Adjust
          </Button>
        </div>
      )}
    </Card>
  );
};