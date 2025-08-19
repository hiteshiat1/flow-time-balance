import { Calendar, Clock, Plus, Sparkles, CheckCircle, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navigation } from "@/components/Navigation";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const DailyView = () => {
  const { toast } = useToast();
  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const currentDate = new Date().toLocaleDateString([], { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  const [schedule, setSchedule] = useState([
    {
      id: 1,
      time: "9:00 AM",
      title: "Morning Focus Session",
      type: "focus",
      duration: "25 min",
      description: "Deep work block with breathing exercise",
      completed: true,
      current: false
    },
    {
      id: 2,
      time: "10:30 AM",
      title: "Hydration Reminder",
      type: "energy",
      duration: "2 min",
      description: "Drink water + quick stretch",
      completed: true,
      current: false
    },
    {
      id: 3,
      time: "12:00 PM",
      title: "Mindful Lunch Break",
      type: "calm",
      duration: "30 min",
      description: "Eat slowly, practice gratitude",
      completed: false,
      current: true
    },
    {
      id: 4,
      time: "2:30 PM",
      title: "Power Walk",
      type: "energy",
      duration: "15 min",
      description: "Get outside, boost energy",
      completed: false,
      current: false
    },
    {
      id: 5,
      time: "6:00 PM",
      title: "Wind Down Meditation",
      type: "calm",
      duration: "12 min",
      description: "Transition from work to evening",
      completed: false,
      current: false
    }
  ]);

  const handleStartActivity = (activityId: number) => {
    const activity = schedule.find(item => item.id === activityId);
    if (!activity) return;

    // Show activity started toast
    toast({
      title: `${activity.title} Started!`,
      description: `Focus on your ${activity.type} activity for ${activity.duration}`,
    });

    // Simulate activity completion after a delay (in real app, this would be a timer)
    setTimeout(() => {
      setSchedule(prev => {
        const updated = prev.map(item => {
          if (item.id === activityId) {
            return { ...item, completed: true, current: false };
          }
          return item;
        });

        // Set next activity as current
        const currentIndex = updated.findIndex(item => item.id === activityId);
        const nextActivity = updated[currentIndex + 1];
        if (nextActivity && !nextActivity.completed) {
          updated[currentIndex + 1] = { ...nextActivity, current: true };
        }

        return updated;
      });

      toast({
        title: "Activity Completed! 🎉",
        description: `Great job on completing ${activity.title}`,
      });
    }, 2000); // 2 seconds for demo purposes
  };

  const handleCompleteActivity = (activityId: number) => {
    setSchedule(prev => {
      const updated = prev.map(item => {
        if (item.id === activityId) {
          return { ...item, completed: true, current: false };
        }
        return item;
      });

      // Set next activity as current
      const currentIndex = updated.findIndex(item => item.id === activityId);
      const nextActivity = updated[currentIndex + 1];
      if (nextActivity && !nextActivity.completed) {
        updated[currentIndex + 1] = { ...nextActivity, current: true };
      }

      return updated;
    });

    const activity = schedule.find(item => item.id === activityId);
    toast({
      title: "Activity Completed! 🎉",
      description: `Great job on completing ${activity?.title}`,
    });
  };

  const completedCount = schedule.filter(item => item.completed).length;
  const remainingCount = schedule.filter(item => !item.completed).length;

  const getActivityTypeClass = (type: string) => {
    switch (type) {
      case 'energy': return 'activity-energy';
      case 'calm': return 'activity-calm';
      case 'focus': return 'activity-focus';
      case 'rest': return 'activity-rest';
      default: return 'activity-calm';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-soft via-background to-accent-soft">
      <div className="container mx-auto px-4 py-6 max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sparkles className="w-6 h-6 text-primary gentle-pulse" />
            <h1 className="text-2xl font-semibold text-foreground">MeTime</h1>
          </div>
          <p className="text-sm text-muted-foreground">{currentDate}</p>
          <p className="text-lg font-medium text-primary">{currentTime}</p>
        </div>

        {/* Today's Wellness Plan */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-foreground">Today's Plan</h2>
            <Button variant="ghost" size="sm" className="text-primary">
              <Plus className="w-4 h-4 mr-1" />
              Add
            </Button>
          </div>

          <div className="space-y-3">
            {schedule.map((item, index) => (
              <Card 
                key={index} 
                className={`p-4 transition-all duration-300 ${
                  item.current 
                    ? 'ring-2 ring-primary bg-gradient-to-r from-primary-soft to-accent-soft shadow-lg breathing-animation' 
                    : item.completed 
                      ? 'bg-muted/50 opacity-75' 
                      : 'bg-card hover:shadow-md'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="flex flex-col items-center min-w-[60px]">
                    <span className="text-xs font-medium text-muted-foreground">
                      {item.time}
                    </span>
                    {item.current && (
                      <div className="w-2 h-2 bg-primary rounded-full mt-1 gentle-pulse" />
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className={`font-medium ${item.completed ? 'text-muted-foreground line-through' : 'text-foreground'}`}>
                        {item.title}
                      </h3>
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${getActivityTypeClass(item.type)}`}
                      >
                        {item.type}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {item.description}
                    </p>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3 h-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{item.duration}</span>
                    </div>
                  </div>
                  
                  {item.completed ? (
                    <div className="flex items-center gap-1 text-primary">
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-xs font-medium">Done</span>
                    </div>
                  ) : (
                    <div className="flex gap-1">
                      <Button 
                        size="sm" 
                        variant={item.current ? "default" : "outline"}
                        className={item.current ? "bg-primary hover:bg-primary/90" : ""}
                        onClick={() => handleStartActivity(item.id)}
                      >
                        <Play className="w-3 h-3 mr-1" />
                        {item.current ? "Start" : "Begin"}
                      </Button>
                      {!item.current && (
                        <Button 
                          size="sm" 
                          variant="ghost"
                          onClick={() => handleCompleteActivity(item.id)}
                          className="text-xs px-2"
                        >
                          Skip
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <Card className="p-4 mb-20 bg-gradient-to-r from-card to-primary-soft/30">
          <div className="flex justify-between items-center">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">{completedCount}</p>
              <p className="text-xs text-muted-foreground">Completed</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-accent">{remainingCount}</p>
              <p className="text-xs text-muted-foreground">Remaining</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-wellness-energy">5</p>
              <p className="text-xs text-muted-foreground">Day Streak</p>
            </div>
          </div>
        </Card>

        <Navigation />
      </div>
    </div>
  );
};

export default DailyView;