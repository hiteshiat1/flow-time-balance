import { Search, Filter, Play, Clock, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Navigation } from "@/components/Navigation";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const WellnessLibrary = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  const categories = [
    { name: "All", type: null, count: 30 },
    { name: "Energy", type: "energy", count: 8 },
    { name: "Calm", type: "calm", count: 10 },
    { name: "Focus", type: "focus", count: 6 },
    { name: "Rest", type: "rest", count: 6 }
  ];

  const activities = [
    // Featured
    {
      title: "4-7-8 Breathing",
      category: "calm",
      duration: "3 min",
      rating: 4.9,
      description: "Calm your nervous system with this powerful breathing technique",
      difficulty: "Beginner",
      featured: true
    },
    // Energy Activities
    {
      title: "Desk Stretches",
      category: "energy",
      duration: "5 min",
      rating: 4.7,
      description: "Release tension and boost energy without leaving your desk",
      difficulty: "Beginner"
    },
    {
      title: "Energy Boost Sequence",
      category: "energy",
      duration: "7 min",
      rating: 4.8,
      description: "Quick movements to revitalize your body",
      difficulty: "Intermediate"
    },
    {
      title: "Morning Activation",
      category: "energy",
      duration: "4 min",
      rating: 4.6,
      description: "Wake up your body with gentle movements",
      difficulty: "Beginner"
    },
    {
      title: "Power Pump",
      category: "energy",
      duration: "6 min",
      rating: 4.7,
      description: "High-energy routine to boost motivation",
      difficulty: "Advanced"
    },
    {
      title: "Vitality Flow",
      category: "energy",
      duration: "8 min",
      rating: 4.5,
      description: "Dynamic sequence to increase energy levels",
      difficulty: "Intermediate"
    },
    {
      title: "Quick Energizer",
      category: "energy",
      duration: "3 min",
      rating: 4.4,
      description: "Fast energy boost for busy schedules",
      difficulty: "Beginner"
    },
    {
      title: "Active Recovery",
      category: "energy",
      duration: "10 min",
      rating: 4.6,
      description: "Gentle movement to restore energy",
      difficulty: "Beginner"
    },
    {
      title: "Momentum Builder",
      category: "energy",
      duration: "5 min",
      rating: 4.8,
      description: "Build physical and mental momentum",
      difficulty: "Intermediate"
    },
    // Calm Activities
    {
      title: "Walking Meditation",
      category: "calm",
      duration: "10 min",
      rating: 4.6,
      description: "Mindful movement to center yourself",
      difficulty: "Beginner"
    },
    {
      title: "Box Breathing",
      category: "calm",
      duration: "4 min",
      rating: 4.8,
      description: "Square breathing pattern for instant calm",
      difficulty: "Beginner"
    },
    {
      title: "Body Scan Meditation",
      category: "calm",
      duration: "12 min",
      rating: 4.7,
      description: "Progressive awareness throughout your body",
      difficulty: "Beginner"
    },
    {
      title: "Mindful Breathing",
      category: "calm",
      duration: "6 min",
      rating: 4.5,
      description: "Simple breath awareness practice",
      difficulty: "Beginner"
    },
    {
      title: "Stress Release",
      category: "calm",
      duration: "8 min",
      rating: 4.9,
      description: "Let go of tension and worry",
      difficulty: "Intermediate"
    },
    {
      title: "Evening Wind Down",
      category: "calm",
      duration: "15 min",
      rating: 4.6,
      description: "Peaceful transition into rest mode",
      difficulty: "Beginner"
    },
    {
      title: "Anxiety Relief",
      category: "calm",
      duration: "7 min",
      rating: 4.8,
      description: "Techniques to ease anxious feelings",
      difficulty: "Intermediate"
    },
    {
      title: "Loving Kindness",
      category: "calm",
      duration: "9 min",
      rating: 4.7,
      description: "Cultivate compassion and inner peace",
      difficulty: "Beginner"
    },
    {
      title: "Nature Sounds",
      category: "calm",
      duration: "20 min",
      rating: 4.4,
      description: "Relaxation with natural soundscapes",
      difficulty: "Beginner"
    },
    // Focus Activities
    {
      title: "Power Posing",
      category: "focus",
      duration: "2 min",
      rating: 4.8,
      description: "Build confidence and focus with body language",
      difficulty: "Beginner"
    },
    {
      title: "Concentration Builder",
      category: "focus",
      duration: "8 min",
      rating: 4.6,
      description: "Strengthen your ability to concentrate",
      difficulty: "Intermediate"
    },
    {
      title: "Mental Clarity",
      category: "focus",
      duration: "5 min",
      rating: 4.7,
      description: "Clear mental fog and sharpen thinking",
      difficulty: "Beginner"
    },
    {
      title: "Attention Training",
      category: "focus",
      duration: "10 min",
      rating: 4.5,
      description: "Develop sustained attention skills",
      difficulty: "Advanced"
    },
    {
      title: "Flow State Prep",
      category: "focus",
      duration: "6 min",
      rating: 4.8,
      description: "Prepare your mind for deep work",
      difficulty: "Intermediate"
    },
    {
      title: "Cognitive Reset",
      category: "focus",
      duration: "4 min",
      rating: 4.6,
      description: "Refresh your mental state",
      difficulty: "Beginner"
    },
    // Rest Activities
    {
      title: "Progressive Relaxation",
      category: "rest",
      duration: "12 min",
      rating: 4.9,
      description: "Systematic muscle relaxation for deep rest",
      difficulty: "Intermediate"
    },
    {
      title: "Sleep Preparation",
      category: "rest",
      duration: "15 min",
      rating: 4.7,
      description: "Gentle routine to prepare for sleep",
      difficulty: "Beginner"
    },
    {
      title: "Deep Rest",
      category: "rest",
      duration: "20 min",
      rating: 4.8,
      description: "Profound relaxation for complete restoration",
      difficulty: "Beginner"
    },
    {
      title: "Power Nap Prep",
      category: "rest",
      duration: "5 min",
      rating: 4.5,
      description: "Quick relaxation before a short nap",
      difficulty: "Beginner"
    },
    {
      title: "Tension Release",
      category: "rest",
      duration: "8 min",
      rating: 4.6,
      description: "Release physical and mental tension",
      difficulty: "Beginner"
    },
    {
      title: "Restorative Breathing",
      category: "rest",
      duration: "10 min",
      rating: 4.7,
      description: "Breathing practice for deep restoration",
      difficulty: "Beginner"
    }
  ];

  const filteredActivities = activities.filter(activity => {
    const matchesCategory = selectedCategory === null || activity.category === selectedCategory;
    const matchesSearch = activity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         activity.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredActivities = filteredActivities.filter(a => a.featured);
  const regularActivities = filteredActivities.filter(a => !a.featured);

  const handleStartActivity = (activity: any) => {
    toast({
      title: "Activity Started",
      description: `Starting ${activity.title} - ${activity.duration}`,
    });
  };

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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Categories */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {categories.map((category) => (
            <Card 
              key={category.name}
              onClick={() => setSelectedCategory(category.type)}
              className={`p-4 text-center cursor-pointer transition-all duration-300 hover:shadow-md border
                ${selectedCategory === category.type ? 'ring-2 ring-primary shadow-lg' : ''}
                ${category.type ? getActivityTypeClass(category.type) : 'bg-card'}`}
            >
              <h3 className="font-medium mb-1">{category.name}</h3>
              <p className="text-sm opacity-80">{category.count} activities</p>
            </Card>
          ))}
        </div>

        {/* Featured Activity */}
        {featuredActivities.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-medium text-foreground mb-3">Featured Today</h2>
            {featuredActivities.map((activity, index) => (
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
                  <Button 
                    size="sm" 
                    className="bg-primary hover:bg-primary/90"
                    onClick={() => handleStartActivity(activity)}
                  >
                    Start
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* All Activities */}
        <div className="mb-24">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-medium text-foreground">
              {selectedCategory ? `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Activities` : 'All Activities'}
              {searchQuery && ` (${regularActivities.length} results)`}
            </h2>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => {
                setSelectedCategory(null);
                setSearchQuery("");
              }}
            >
              <Filter className="w-4 h-4 mr-1" />
              Clear
            </Button>
          </div>
          
          {regularActivities.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No activities found</p>
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-2"
                onClick={() => {
                  setSelectedCategory(null);
                  setSearchQuery("");
                }}
              >
                Clear filters
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {regularActivities.map((activity, index) => (
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
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleStartActivity(activity)}
                    >
                      Start
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        <Navigation />
      </div>
    </div>
  );
};

export default WellnessLibrary;