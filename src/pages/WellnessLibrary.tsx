import { Search, Filter, Play, Clock, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Navigation } from "@/components/Navigation";

const WellnessLibrary = () => {
  const categories = [
    { name: "Energy", type: "energy", count: 12 },
    { name: "Calm", type: "calm", count: 18 },
    { name: "Focus", type: "focus", count: 8 },
    { name: "Rest", type: "rest", count: 15 }
  ];

  const activities = [
    {
      title: "4-7-8 Breathing",
      category: "calm",
      duration: "3 min",
      rating: 4.9,
      description: "Calm your nervous system with this powerful breathing technique",
      difficulty: "Beginner",
      featured: true
    },
    {
      title: "Desk Stretches",
      category: "energy",
      duration: "5 min",
      rating: 4.7,
      description: "Release tension and boost energy without leaving your desk",
      difficulty: "Beginner"
    },
    {
      title: "Power Posing",
      category: "focus",
      duration: "2 min",
      rating: 4.8,
      description: "Build confidence and focus with body language",
      difficulty: "Beginner"
    },
    {
      title: "Progressive Relaxation",
      category: "rest",
      duration: "12 min",
      rating: 4.9,
      description: "Systematic muscle relaxation for deep rest",
      difficulty: "Intermediate"
    },
    {
      title: "Walking Meditation",
      category: "calm",
      duration: "10 min",
      rating: 4.6,
      description: "Mindful movement to center yourself",
      difficulty: "Beginner"
    },
    {
      title: "Energy Boost Sequence",
      category: "energy",
      duration: "7 min",
      rating: 4.8,
      description: "Quick movements to revitalize your body",
      difficulty: "Intermediate"
    }
  ];

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
        <div className="text-center mb-6">
          <h1 className="text-2xl font-semibold text-foreground mb-2">Wellness Library</h1>
          <p className="text-sm text-muted-foreground">Discover activities for every moment</p>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search activities..." 
            className="pl-10 bg-card border-border"
          />
        </div>

        {/* Categories */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {categories.map((category) => (
            <Card 
              key={category.name}
              className={`p-4 text-center cursor-pointer transition-all duration-300 hover:shadow-md ${getActivityTypeClass(category.type)} border`}
            >
              <h3 className="font-medium mb-1">{category.name}</h3>
              <p className="text-sm opacity-80">{category.count} activities</p>
            </Card>
          ))}
        </div>

        {/* Featured Activity */}
        <div className="mb-6">
          <h2 className="text-lg font-medium text-foreground mb-3">Featured Today</h2>
          {activities.filter(a => a.featured).map((activity, index) => (
            <Card key={index} className="p-4 bg-gradient-to-r from-primary-soft to-accent-soft border-primary/20">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center float-animation">
                  <Play className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-medium text-foreground">{activity.title}</h3>
                    <Badge variant="outline" className={getActivityTypeClass(activity.category)}>
                      {activity.category}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{activity.description}</p>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {activity.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-current text-accent" />
                      {activity.rating}
                    </div>
                    <span>{activity.difficulty}</span>
                  </div>
                </div>
                <Button size="sm" className="bg-primary hover:bg-primary/90">
                  Start
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* All Activities */}
        <div className="mb-24">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-medium text-foreground">All Activities</h2>
            <Button variant="ghost" size="sm">
              <Filter className="w-4 h-4 mr-1" />
              Filter
            </Button>
          </div>
          
          <div className="space-y-3">
            {activities.filter(a => !a.featured).map((activity, index) => (
              <Card key={index} className="p-4 hover:shadow-md transition-all duration-300">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                    <Play className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium text-foreground">{activity.title}</h3>
                      <Badge variant="outline" className={`${getActivityTypeClass(activity.category)} text-xs`}>
                        {activity.category}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{activity.description}</p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {activity.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-current text-accent" />
                        {activity.rating}
                      </div>
                      <span>{activity.difficulty}</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Start
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <Navigation />
      </div>
    </div>
  );
};

export default WellnessLibrary;