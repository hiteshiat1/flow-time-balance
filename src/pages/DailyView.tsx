import { Calendar, Clock, Plus, Sparkles, CheckCircle, Play, Pause, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TimePicker } from "@/components/ui/time-picker";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Navigation } from "@/components/Navigation";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { formatInTimeZone, toZonedTime } from "date-fns-tz";
import { format, parse, isAfter, isBefore, addMinutes } from "date-fns";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

const addActivitySchema = z.object({
  title: z.string().min(1, "Title is required"),
  type: z.enum(["focus", "energy", "calm", "rest"]),
  time: z.string().min(1, "Time is required"),
  duration: z.number().min(1, "Duration must be at least 1 minute"),
  description: z.string().optional(),
});

type AddActivityForm = z.infer<typeof addActivitySchema>;

interface Activity {
  id: string;
  time: string;
  title: string;
  type: string;
  duration: string;
  durationInSeconds: number;
  description: string;
  completed: boolean;
  current: boolean;
  inProgress: boolean;
}

const DailyView = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [userTimezone, setUserTimezone] = useState<string>(Intl.DateTimeFormat().resolvedOptions().timeZone);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [loading, setLoading] = useState(true);

  // Update current time every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  // Get user's timezone from location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        () => {
          // Keep detected timezone
          setUserTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone);
        },
        () => {
          // Fallback to browser timezone
          setUserTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone);
        }
      );
    }
  }, []);

  const currentTime = formatInTimeZone(currentDateTime, userTimezone, 'h:mm a');
  const currentDate = formatInTimeZone(currentDateTime, userTimezone, 'EEEE, MMMM d, yyyy');

  const [schedule, setSchedule] = useState<Activity[]>([]);

  const [activeTimer, setActiveTimer] = useState<{
    activityId: string;
    remainingSeconds: number;
  } | null>(null);

  // Load user's activities from database
  const fetchActivities = async () => {
    if (!user) return;
    
    try {
      const today = formatInTimeZone(currentDateTime, userTimezone, 'yyyy-MM-dd');
      
      const { data, error } = await supabase
        .from('user_activities')
        .select('*')
        .eq('user_id', user.id)
        .eq('scheduled_date', today)
        .order('scheduled_time');

      if (error) throw error;

      const activities: Activity[] = (data || []).map((activity, index) => ({
        id: activity.id,
        time: activity.scheduled_time,
        title: activity.title,
        type: activity.type,
        duration: `${activity.duration_minutes} min`,
        durationInSeconds: activity.duration_minutes * 60,
        description: activity.description || '',
        completed: activity.completed,
        current: false,
        inProgress: false
      }));

      // Set the first non-completed activity as current
      if (activities.length > 0) {
        const firstIncomplete = activities.findIndex(a => !a.completed);
        if (firstIncomplete !== -1) {
          activities[firstIncomplete].current = true;
        }
      }

      setSchedule(activities);
    } catch (error: any) {
      console.error('Error fetching activities:', error);
      toast({
        title: "Error loading activities",
        description: "Please try again",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Load activities when user or date changes
  useEffect(() => {
    if (user) {
      fetchActivities();
    }
  }, [user, currentDateTime.toDateString()]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const form = useForm<AddActivityForm>({
    resolver: zodResolver(addActivitySchema),
    defaultValues: {
      title: "",
      type: "calm",
      time: "",
      duration: 15,
      description: "",
    },
  });

  const handleAddActivity = async (data: AddActivityForm) => {
    if (!user) return;

    try {
      const today = formatInTimeZone(currentDateTime, userTimezone, 'yyyy-MM-dd');
      
      const { data: newActivity, error } = await supabase
        .from('user_activities')
        .insert({
          user_id: user.id,
          title: data.title,
          type: data.type,
          scheduled_time: data.time,
          duration_minutes: data.duration,
          description: data.description || '',
          scheduled_date: today
        })
        .select()
        .single();

      if (error) throw error;

      // Add to local state
      const activity: Activity = {
        id: newActivity.id,
        time: newActivity.scheduled_time,
        title: newActivity.title,
        type: newActivity.type,
        duration: `${newActivity.duration_minutes} min`,
        durationInSeconds: newActivity.duration_minutes * 60,
        description: newActivity.description || '',
        completed: false,
        current: false,
        inProgress: false
      };

      setSchedule(prev => {
        const updated = [...prev, activity];
        // Sort by time
        return updated.sort((a, b) => {
          try {
            const today = formatInTimeZone(currentDateTime, userTimezone, 'yyyy-MM-dd');
            const timeA = parse(`${today} ${a.time}`, 'yyyy-MM-dd h:mm a', new Date());
            const timeB = parse(`${today} ${b.time}`, 'yyyy-MM-dd h:mm a', new Date());
            return timeA.getTime() - timeB.getTime();
          } catch {
            return 0;
          }
        });
      });

      form.reset();
      setIsAddDialogOpen(false);
      toast({
        title: "Activity Added!",
        description: `${data.title} scheduled for ${data.time}`,
      });
    } catch (error: any) {
      console.error('Error adding activity:', error);
      toast({
        title: "Error adding activity",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  // Timer effect
  useEffect(() => {
    if (!activeTimer || activeTimer.remainingSeconds <= 0) return;

    const interval = setInterval(() => {
      setActiveTimer(prev => {
        if (!prev || prev.remainingSeconds <= 1) {
          // Activity completed
          if (prev?.activityId) {
            handleActivityCompletion(prev.activityId);
          }
          return null;
        }
        return { ...prev, remainingSeconds: prev.remainingSeconds - 1 };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [activeTimer]);

  const handleActivityCompletion = async (activityId: string) => {
    if (!user) return;

    try {
      // Update in database
      const { error } = await supabase
        .from('user_activities')
        .update({ 
          completed: true, 
          completed_at: new Date().toISOString() 
        })
        .eq('id', activityId)
        .eq('user_id', user.id);

      if (error) throw error;

      // Update user streak
      const { error: streakError } = await supabase.rpc('update_user_streak', {
        user_id_param: user.id
      });
      
      if (streakError) {
        console.error('Error updating streak:', streakError);
      }

      // Update local state
      setSchedule(prev => {
        const updated = prev.map(item => {
          if (item.id === activityId) {
            return { ...item, completed: true, current: false, inProgress: false };
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
    } catch (error: any) {
      console.error('Error completing activity:', error);
      toast({
        title: "Error updating activity",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  const handleStartActivity = (activityId: string) => {
    const activity = schedule.find(item => item.id === activityId);
    if (!activity) return;

    // Set activity as in progress
    setSchedule(prev => prev.map(item => 
      item.id === activityId 
        ? { ...item, inProgress: true }
        : item
    ));

    // Start timer
    setActiveTimer({
      activityId,
      remainingSeconds: activity.durationInSeconds
    });

    toast({
      title: `${activity.title} Started!`,
      description: `Focus on your ${activity.type} activity for ${activity.duration}`,
    });
  };

  const handleCompleteActivity = async (activityId: string) => {
    await handleActivityCompletion(activityId);
  };

  // Check if activity can be started based on current time
  const canStartActivity = (activityTime: string) => {
    try {
      const today = formatInTimeZone(currentDateTime, userTimezone, 'yyyy-MM-dd');
      const activityDateTime = parse(`${today} ${activityTime}`, 'yyyy-MM-dd h:mm a', new Date());
      const activityZonedTime = toZonedTime(activityDateTime, userTimezone);
      const currentZonedTime = toZonedTime(currentDateTime, userTimezone);
      
      // Allow starting 5 minutes before scheduled time
      const startWindow = addMinutes(activityZonedTime, -5);
      
      return isAfter(currentZonedTime, startWindow) || 
             format(currentZonedTime, 'h:mm a') === activityTime;
    } catch (error) {
      console.error('Error parsing activity time:', error);
      return false;
    }
  };

  // Check if activity is about to start (within 10 minutes)
  const isAboutToStart = (activityTime: string) => {
    try {
      const today = formatInTimeZone(currentDateTime, userTimezone, 'yyyy-MM-dd');
      const activityDateTime = parse(`${today} ${activityTime}`, 'yyyy-MM-dd h:mm a', new Date());
      const activityZonedTime = toZonedTime(activityDateTime, userTimezone);
      const currentZonedTime = toZonedTime(currentDateTime, userTimezone);
      
      const timeDiff = activityZonedTime.getTime() - currentZonedTime.getTime();
      const minutesUntil = Math.ceil(timeDiff / (1000 * 60));
      
      return minutesUntil <= 10 && minutesUntil > 0;
    } catch (error) {
      return false;
    }
  };

  const getTimeStatus = (activityTime: string) => {
    try {
      const today = formatInTimeZone(currentDateTime, userTimezone, 'yyyy-MM-dd');
      const activityDateTime = parse(`${today} ${activityTime}`, 'yyyy-MM-dd h:mm a', new Date());
      const activityZonedTime = toZonedTime(activityDateTime, userTimezone);
      const currentZonedTime = toZonedTime(currentDateTime, userTimezone);
      
      if (isBefore(currentZonedTime, activityZonedTime)) {
        const timeDiff = activityZonedTime.getTime() - currentZonedTime.getTime();
        const minutesUntil = Math.ceil(timeDiff / (1000 * 60));
        
        if (minutesUntil > 60) {
          const hours = Math.floor(minutesUntil / 60);
          const mins = minutesUntil % 60;
          return `Starts in ${hours}h ${mins}m`;
        }
        return `Starts in ${minutesUntil}m`;
      }
      return null;
    } catch (error) {
      return null;
    }
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-soft via-background to-accent-soft flex items-center justify-center">
        <div className="text-center">
          <Sparkles className="w-8 h-8 text-primary gentle-pulse mx-auto mb-4" />
          <p className="text-muted-foreground">Loading your wellness plan...</p>
        </div>
      </div>
    );
  }

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
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm" className="text-primary">
                  <Plus className="w-4 h-4 mr-1" />
                  Add
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add New Activity</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(handleAddActivity)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Activity Title</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. Morning Meditation" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="type"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Activity Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select activity type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="focus">Focus</SelectItem>
                              <SelectItem value="energy">Energy</SelectItem>
                              <SelectItem value="calm">Calm</SelectItem>
                              <SelectItem value="rest">Rest</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="time"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Scheduled Time</FormLabel>
                          <FormControl>
                            <TimePicker 
                              value={field.value} 
                              onChange={field.onChange}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="duration"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Duration (minutes)</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              placeholder="15" 
                              {...field}
                              onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description (optional)</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Brief description of the activity..." 
                              className="resize-none"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="flex gap-2 pt-4">
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => setIsAddDialogOpen(false)}
                        className="flex-1"
                      >
                        Cancel
                      </Button>
                      <Button type="submit" className="flex-1">
                        Add Activity
                      </Button>
                    </div>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>

          <div className="space-y-3">
            {schedule.length === 0 ? (
              <Card className="p-8 text-center bg-muted/30">
                <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">No activities scheduled</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Start your wellness journey by adding your first activity
                </p>
                <Button 
                  onClick={() => setIsAddDialogOpen(true)}
                  className="bg-primary hover:bg-primary/90"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add First Activity
                </Button>
              </Card>
            ) : (
              schedule.map((item, index) => (
              <Card 
                key={index} 
                className={`p-4 transition-all duration-300 ${
                  item.current 
                    ? 'ring-2 ring-primary bg-gradient-to-r from-primary-soft to-accent-soft shadow-lg' 
                    : item.completed 
                      ? 'bg-muted/50 opacity-75' 
                      : isAboutToStart(item.time) && !item.completed
                        ? 'ring-2 ring-accent bg-gradient-to-r from-accent-soft to-primary-soft shadow-md'
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
                   ) : item.inProgress ? (
                     <div className="flex flex-col items-center gap-1">
                       <div className="flex items-center gap-1 text-primary">
                         <Pause className="w-4 h-4" />
                         <span className="text-xs font-medium">In Progress</span>
                       </div>
                       {activeTimer && activeTimer.activityId === item.id && (
                         <div className="text-center">
                           <div className="text-lg font-mono font-bold text-primary">
                             {Math.floor(activeTimer.remainingSeconds / 60)}:{(activeTimer.remainingSeconds % 60).toString().padStart(2, '0')}
                           </div>
                           <span className="text-xs text-muted-foreground">remaining</span>
                         </div>
                       )}
                     </div>
                   ) : (
                      <div className="flex flex-col items-end gap-1">
                        {!canStartActivity(item.time) && !item.completed ? (
                          <div className="text-center">
                            <div className="flex items-center gap-1 text-muted-foreground mb-1">
                              <Clock className="w-3 h-3" />
                              <span className="text-xs">Not time yet</span>
                            </div>
                            {getTimeStatus(item.time) && (
                              <span className="text-xs text-accent font-medium">
                                {getTimeStatus(item.time)}
                              </span>
                            )}
                          </div>
                        ) : (
                          <div className="flex gap-1">
                            <Button 
                              size="sm" 
                              variant={item.current ? "default" : "outline"}
                              className={item.current ? "bg-primary hover:bg-primary/90" : ""}
                              onClick={() => handleStartActivity(item.id)}
                              disabled={!canStartActivity(item.time)}
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
                    )}
                 </div>
               </Card>
              ))
            )}
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