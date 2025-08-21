import { Search, Filter, Play, Clock, Star, BookOpen, Calendar, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Navigation } from "@/components/Navigation";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { wellnessActivities, WellnessActivity } from "@/data/wellnessActivities";

const WellnessLibrary = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedActivities, setExpandedActivities] = useState<Set<string>>(new Set());
  const [selectedActivity, setSelectedActivity] = useState<WellnessActivity | null>(null);
  const { toast } = useToast();

  const categories = [
    { name: "All", type: null, count: wellnessActivities.length },
    { name: "Energy", type: "energy", count: wellnessActivities.filter(a => a.category === "energy").length },
    { name: "Calm", type: "calm", count: wellnessActivities.filter(a => a.category === "calm").length },
    { name: "Focus", type: "focus", count: wellnessActivities.filter(a => a.category === "focus").length },
    { name: "Rest", type: "rest", count: wellnessActivities.filter(a => a.category === "rest").length }
  ];

  const filteredActivities = wellnessActivities.filter(activity => {
    const matchesCategory = selectedCategory === null || activity.category === selectedCategory;
    const matchesSearch = activity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         activity.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         activity.benefits.some(benefit => benefit.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredActivities = filteredActivities.filter(a => a.featured);
  const regularActivities = filteredActivities.filter(a => !a.featured);

  const handleStartActivity = (activity: WellnessActivity) => {
    toast({
      title: "Activity Ready",
      description: `View instructions for ${activity.title} to get started`,
    });
    setSelectedActivity(activity);
  };

  const handleScheduleActivity = (activity: WellnessActivity) => {
    toast({
      title: "Schedule Activity",
      description: `Navigate to Daily View to schedule ${activity.title}`,
    });
    // In a real app, this would navigate to DailyView with pre-filled activity data
  };

  const toggleActivityExpansion = (activityTitle: string) => {
    const newExpanded = new Set(expandedActivities);
    if (newExpanded.has(activityTitle)) {
      newExpanded.delete(activityTitle);
    } else {
      newExpanded.add(activityTitle);
    }
    setExpandedActivities(newExpanded);
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
              <Card key={index} className="bg-gradient-to-r from-primary-soft to-accent-soft border-primary/20">
                <CardHeader className="pb-2">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center float-animation">
                      <Play className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <CardTitle className="text-lg">{activity.title}</CardTitle>
                        <Badge variant="outline" className={getActivityTypeClass(activity.category)}>
                          {activity.category}
                        </Badge>
                      </div>
                      <CardDescription className="mb-2">{activity.description}</CardDescription>
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
                    <div className="flex flex-col gap-2">
                      <Button 
                        size="sm" 
                        className="bg-primary hover:bg-primary/90"
                        onClick={() => handleStartActivity(activity)}
                      >
                        <BookOpen className="w-3 h-3 mr-1" />
                        View
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleScheduleActivity(activity)}
                      >
                        <Calendar className="w-3 h-3 mr-1" />
                        Schedule
                      </Button>
                    </div>
                  </div>
                </CardHeader>
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
              {regularActivities.map((activity, index) => {
                const isExpanded = expandedActivities.has(activity.title);
                return (
                  <Card key={index} className="hover:shadow-md transition-all duration-300">
                    <CardHeader className="pb-2">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                          <Play className="w-4 h-4 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <CardTitle className="text-base">{activity.title}</CardTitle>
                            <Badge variant="outline" className={`${getActivityTypeClass(activity.category)} text-xs`}>
                              {activity.category}
                            </Badge>
                          </div>
                          <CardDescription className="mb-2">{activity.description}</CardDescription>
                          <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
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
                          <div className="flex items-center gap-2">
                            <Button 
                              size="sm"
                              onClick={() => handleStartActivity(activity)}
                            >
                              <BookOpen className="w-3 h-3 mr-1" />
                              Instructions
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleScheduleActivity(activity)}
                            >
                              <Calendar className="w-3 h-3 mr-1" />
                              Schedule
                            </Button>
                            <Collapsible 
                              open={isExpanded} 
                              onOpenChange={() => toggleActivityExpansion(activity.title)}
                            >
                              <CollapsibleTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                                  {isExpanded ? 'Less' : 'More'}
                                </Button>
                              </CollapsibleTrigger>
                            </Collapsible>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <Collapsible 
                      open={isExpanded} 
                      onOpenChange={() => toggleActivityExpansion(activity.title)}
                    >
                      <CollapsibleContent>
                        <CardContent className="pt-0">
                          <div className="space-y-4">
                            <div>
                              <h4 className="font-medium text-sm mb-2 text-primary">Key Benefits</h4>
                              <ul className="text-sm text-muted-foreground space-y-1">
                                {activity.benefits.slice(0, 3).map((benefit, idx) => (
                                  <li key={idx}>• {benefit}</li>
                                ))}
                              </ul>
                            </div>
                            
                            <div>
                              <h4 className="font-medium text-sm mb-2 text-primary">Pro Tips</h4>
                              <ul className="text-sm text-muted-foreground space-y-1">
                                {activity.tips.slice(0, 2).map((tip, idx) => (
                                  <li key={idx}>• {tip}</li>
                                ))}
                              </ul>
                            </div>
                            
                            <div className="bg-muted/30 p-3 rounded-lg">
                              <h4 className="font-medium text-sm mb-1 text-primary">Scientific Backing</h4>
                              <p className="text-xs text-muted-foreground">{activity.scientificBacking}</p>
                            </div>
                          </div>
                        </CardContent>
                      </CollapsibleContent>
                    </Collapsible>
                  </Card>
                );
              })}
            </div>
          )}
        </div>

        {/* Activity Detail Dialog */}
        <Dialog open={!!selectedActivity} onOpenChange={() => setSelectedActivity(null)}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            {selectedActivity && (
              <>
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    {selectedActivity.title}
                    <Badge variant="outline" className={getActivityTypeClass(selectedActivity.category)}>
                      {selectedActivity.category}
                    </Badge>
                  </DialogTitle>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {selectedActivity.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-current text-accent" />
                      {selectedActivity.rating}
                    </div>
                    <span>{selectedActivity.difficulty}</span>
                  </div>
                </DialogHeader>
                
                <div className="space-y-6">
                  <div>
                    <p className="text-muted-foreground">{selectedActivity.description}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-3">Step-by-Step Instructions</h3>
                    <ol className="space-y-2">
                      {selectedActivity.instructions.map((instruction, idx) => (
                        <li key={idx} className="flex gap-3">
                          <span className="flex-shrink-0 w-6 h-6 bg-primary/10 text-primary rounded-full text-sm flex items-center justify-center font-medium">
                            {idx + 1}
                          </span>
                          <span className="text-sm">{instruction}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-3">Benefits</h3>
                    <ul className="space-y-2">
                      {selectedActivity.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span className="text-sm">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-3">Pro Tips</h3>
                    <ul className="space-y-2">
                      {selectedActivity.tips.map((tip, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-accent mt-1">💡</span>
                          <span className="text-sm">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <h4 className="font-medium mb-2 text-sm">Easier Modification</h4>
                      <p className="text-sm text-muted-foreground">{selectedActivity.modifications.easier}</p>
                    </div>
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <h4 className="font-medium mb-2 text-sm">Harder Modification</h4>
                      <p className="text-sm text-muted-foreground">{selectedActivity.modifications.harder}</p>
                    </div>
                  </div>
                  
                  <div className="bg-primary/5 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2 text-primary">Scientific Backing</h3>
                    <p className="text-sm text-muted-foreground">{selectedActivity.scientificBacking}</p>
                  </div>
                  
                  <div className="flex gap-3">
                    <Button 
                      onClick={() => handleScheduleActivity(selectedActivity)} 
                      className="flex-1"
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      Schedule This Activity
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => setSelectedActivity(null)}
                    >
                      Close
                    </Button>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>

        <Navigation />
      </div>
    </div>
  );
};

export default WellnessLibrary;