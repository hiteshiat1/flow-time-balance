import { Calendar, TrendingUp, Award, Target, Flame } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress as ProgressBar } from "@/components/ui/progress";
import { Navigation } from "@/components/Navigation";

const Progress = () => {
  const weeklyProgress = [
    { day: "Mon", completed: 6, total: 6 },
    { day: "Tue", completed: 5, total: 6 },
    { day: "Wed", completed: 6, total: 6 },
    { day: "Thu", completed: 4, total: 6 },
    { day: "Fri", completed: 3, total: 6 },
    { day: "Sat", completed: 0, total: 4 },
    { day: "Sun", completed: 0, total: 4 }
  ];

  const achievements = [
    {
      title: "Early Bird",
      description: "Complete 5 morning activities",
      progress: 5,
      total: 5,
      completed: true,
      icon: "🌅"
    },
    {
      title: "Mindful Moments",
      description: "7-day meditation streak",
      progress: 5,
      total: 7,
      completed: false,
      icon: "🧘"
    },
    {
      title: "Energy Booster",
      description: "Complete 10 energy activities",
      progress: 7,
      total: 10,
      completed: false,
      icon: "⚡"
    },
    {
      title: "Wellness Warrior",
      description: "30-day activity streak",
      progress: 14,
      total: 30,
      completed: false,
      icon: "🏆"
    }
  ];

  const categoryStats = [
    { name: "Energy", completed: 12, color: "wellness-energy", percentage: 85 },
    { name: "Calm", completed: 18, color: "wellness-calm", percentage: 90 },
    { name: "Focus", completed: 8, color: "wellness-focus", percentage: 70 },
    { name: "Rest", completed: 10, color: "wellness-rest", percentage: 75 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-soft via-background to-accent-soft">
      <div className="container mx-auto px-4 py-6 max-w-md">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-semibold text-foreground mb-2">Your Progress</h1>
          <p className="text-sm text-muted-foreground">Track your wellness journey</p>
        </div>

        {/* Current Streak */}
        <Card className="p-6 mb-6 bg-gradient-to-r from-primary-soft to-accent-soft text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Flame className="w-6 h-6 text-accent breathing-animation" />
            <span className="text-3xl font-bold text-primary">14</span>
          </div>
          <p className="text-sm text-muted-foreground">Day Streak</p>
          <p className="text-xs text-muted-foreground mt-1">Keep going! You're on fire 🔥</p>
        </Card>

        {/* Weekly Overview */}
        <div className="mb-6">
          <h2 className="text-lg font-medium text-foreground mb-3">This Week</h2>
          <Card className="p-4">
            <div className="grid grid-cols-7 gap-2">
              {weeklyProgress.map((day, index) => (
                <div key={day.day} className="text-center">
                  <p className="text-xs text-muted-foreground mb-2">{day.day}</p>
                  <div 
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all duration-300 ${
                      day.completed === day.total 
                        ? 'bg-primary text-primary-foreground' 
                        : day.completed > 0 
                          ? 'bg-accent text-accent-foreground' 
                          : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {day.completed}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">/{day.total}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-border">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Weekly Goal</span>
                <span className="font-medium text-foreground">24/38 activities</span>
              </div>
              <ProgressBar value={63} className="mt-2" />
            </div>
          </Card>
        </div>

        {/* Category Progress */}
        <div className="mb-6">
          <h2 className="text-lg font-medium text-foreground mb-3">Category Breakdown</h2>
          <div className="grid grid-cols-2 gap-3">
            {categoryStats.map((category) => (
              <Card key={category.name} className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-foreground">{category.name}</h3>
                  <span className="text-sm font-medium text-primary">{category.percentage}%</span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{category.completed} completed</p>
                <ProgressBar value={category.percentage} className="h-2" />
              </Card>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="mb-6">
          <h2 className="text-lg font-medium text-foreground mb-3">Achievements</h2>
          <div className="space-y-3">
            {achievements.map((achievement, index) => (
              <Card key={index} className={`p-4 transition-all duration-300 ${achievement.completed ? 'bg-gradient-to-r from-primary-soft to-accent-soft' : 'bg-card'}`}>
                <div className="flex items-start gap-3">
                  <div className={`text-2xl ${achievement.completed ? 'filter-none' : 'grayscale opacity-50'}`}>
                    {achievement.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium text-foreground">{achievement.title}</h3>
                      {achievement.completed && (
                        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                          Completed
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{achievement.description}</p>
                    <div className="flex items-center gap-2">
                      <ProgressBar 
                        value={(achievement.progress / achievement.total) * 100} 
                        className="flex-1 h-2"
                      />
                      <span className="text-xs text-muted-foreground">
                        {achievement.progress}/{achievement.total}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Stats Summary */}
        <Card className="p-4 mb-6">
          <h3 className="font-medium text-foreground mb-3">Monthly Summary</h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-primary">142</p>
              <p className="text-xs text-muted-foreground">Total Activities</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-accent">47</p>
              <p className="text-xs text-muted-foreground">Hours Practiced</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-wellness-energy">89%</p>
              <p className="text-xs text-muted-foreground">Goal Achievement</p>
            </div>
          </div>
        </Card>

        <Navigation />
      </div>
    </div>
  );
};

export default Progress;