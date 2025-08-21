import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface NotificationPreferences {
  daily_reminders: boolean;
  wellness_breaks: boolean;
  achievements: boolean;
  push_notifications: boolean;
}

interface WellnessPreferences {
  daily_goal: number;
  coaching_style: 'gentle' | 'motivational' | 'direct';
  suggestion_frequency: boolean;
  quiet_hours: {
    enabled: boolean;
    start: string;
    end: string;
  };
}

interface Profile {
  id: string;
  user_id: string;
  display_name: string | null;
  created_at: string;
  updated_at: string;
  notification_preferences: NotificationPreferences;
  wellness_preferences: WellnessPreferences;
}

export const useProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        return;
      }

      // Parse and type the JSON data properly
      const profileData: Profile = {
        ...data,
        notification_preferences: (data.notification_preferences as unknown as NotificationPreferences) || {
          daily_reminders: true,
          wellness_breaks: true,
          achievements: true,
          push_notifications: false,
        },
        wellness_preferences: (data.wellness_preferences as unknown as WellnessPreferences) || {
          daily_goal: 6,
          coaching_style: 'gentle',
          suggestion_frequency: true,
          quiet_hours: {
            enabled: false,
            start: '21:00',
            end: '07:00',
          },
        },
      };
      
      setProfile(profileData);
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user || !profile) return;

    try {
      // Convert typed objects back to Json for Supabase
      const dbUpdates: Record<string, any> = {};
      
      Object.keys(updates).forEach(key => {
        if (key !== 'id' && key !== 'user_id' && key !== 'created_at') {
          dbUpdates[key] = updates[key as keyof Profile];
        }
      });
      
      dbUpdates.updated_at = new Date().toISOString();

      const { error } = await supabase
        .from('profiles')
        .update(dbUpdates)
        .eq('user_id', user.id);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to update profile. Please try again.",
          variant: "destructive",
        });
        return;
      }

      setProfile(prev => prev ? { ...prev, ...updates } : null);
      toast({
        title: "Success",
        description: "Profile updated successfully!",
      });
    } catch (error) {
      toast({
        title: "Error", 
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [user]);

  return {
    profile,
    loading,
    updateProfile,
    refetchProfile: fetchProfile,
  };
};