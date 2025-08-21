import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface Profile {
  id: string;
  user_id: string;
  display_name: string | null;
  wellness_preferences: {
    daily_goal?: number;
    coaching_style?: string;
    suggestion_frequency?: boolean;
    quiet_hours?: { start: string; end: string };
  };
  notification_preferences: {
    daily_reminders?: boolean;
    wellness_breaks?: boolean;
    achievements?: boolean;
    sound_effects?: boolean;
    push_notifications?: boolean;
  };
  created_at: string;
  updated_at: string;
}

export const useProfile = () => {
  const { user } = useAuth();
  const { toast } = useToast();
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

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (data) {
        setProfile(data as Profile);
      }
    } catch (error: any) {
      console.error('Error fetching profile:', error);
      toast({
        title: "Error loading profile",
        description: "Please try again",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user || !profile) return false;

    try {
      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('user_id', user.id);

      if (error) throw error;

      setProfile(prev => prev ? { ...prev, ...updates } : null);
      
      toast({
        title: "Settings updated",
        description: "Your preferences have been saved",
      });
      
      return true;
    } catch (error: any) {
      console.error('Error updating profile:', error);
      toast({
        title: "Error updating settings",
        description: "Please try again",
        variant: "destructive",
      });
      return false;
    }
  };

  const updateWellnessPreferences = async (preferences: any) => {
    return updateProfile({
      wellness_preferences: { ...profile?.wellness_preferences, ...preferences }
    });
  };

  const updateNotificationPreferences = async (preferences: any) => {
    return updateProfile({
      notification_preferences: { ...profile?.notification_preferences, ...preferences }
    });
  };

  useEffect(() => {
    fetchProfile();
  }, [user]);

  return {
    profile,
    loading,
    updateProfile,
    updateWellnessPreferences,
    updateNotificationPreferences,
    refetch: fetchProfile
  };
};