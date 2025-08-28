-- Fix search_path security issue for functions
CREATE OR REPLACE FUNCTION public.update_user_streak(user_id_param uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    last_activity_date_val date;
    current_date_val date;
    days_diff integer;
    current_streak integer;
    has_activity_today boolean;
BEGIN
    -- Get current date
    current_date_val := CURRENT_DATE;
    
    -- Check if user has completed any activity today
    SELECT EXISTS(
        SELECT 1 FROM user_activities 
        WHERE user_id = user_id_param 
        AND scheduled_date = current_date_val 
        AND completed = true
    ) INTO has_activity_today;
    
    -- If no activity completed today, exit early
    IF NOT has_activity_today THEN
        RETURN;
    END IF;
    
    -- Get user's current streak data
    SELECT p.last_activity_date, p.streak_count
    INTO last_activity_date_val, current_streak
    FROM profiles p
    WHERE p.user_id = user_id_param;
    
    -- If no previous activity date, set streak to 1
    IF last_activity_date_val IS NULL THEN
        UPDATE profiles 
        SET streak_count = 1, last_activity_date = current_date_val
        WHERE profiles.user_id = user_id_param;
        RETURN;
    END IF;
    
    -- Calculate days difference
    days_diff := current_date_val - last_activity_date_val;
    
    -- Update streak based on days difference
    IF days_diff = 0 THEN
        -- Same day, no change needed
        RETURN;
    ELSIF days_diff = 1 THEN
        -- Consecutive day, increment streak
        UPDATE profiles 
        SET streak_count = COALESCE(current_streak, 0) + 1, 
            last_activity_date = current_date_val
        WHERE profiles.user_id = user_id_param;
    ELSIF days_diff > 5 THEN
        -- More than 5 days gap, reset streak
        UPDATE profiles 
        SET streak_count = 1, last_activity_date = current_date_val
        WHERE profiles.user_id = user_id_param;
    ELSE
        -- 2-5 days gap, reset to 1
        UPDATE profiles 
        SET streak_count = 1, last_activity_date = current_date_val
        WHERE profiles.user_id = user_id_param;
    END IF;
END;
$$;

-- Fix search_path for existing functions
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, display_name)
  VALUES (
    NEW.id, 
    COALESCE(NEW.raw_user_meta_data->>'display_name', split_part(NEW.email, '@', 1))
  );
  RETURN NEW;
END;
$$;