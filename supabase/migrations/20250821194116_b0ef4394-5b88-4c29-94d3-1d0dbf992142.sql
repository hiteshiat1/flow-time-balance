-- Create user_activities table for storing scheduled wellness activities
CREATE TABLE public.user_activities (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('focus', 'energy', 'calm', 'rest')),
  scheduled_time TEXT NOT NULL,
  duration_minutes INTEGER NOT NULL DEFAULT 15,
  description TEXT,
  completed BOOLEAN NOT NULL DEFAULT false,
  completed_at TIMESTAMP WITH TIME ZONE,
  scheduled_date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.user_activities ENABLE ROW LEVEL SECURITY;

-- Create policies for user access
CREATE POLICY "Users can view their own activities" 
ON public.user_activities 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own activities" 
ON public.user_activities 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own activities" 
ON public.user_activities 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own activities" 
ON public.user_activities 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_user_activities_updated_at
BEFORE UPDATE ON public.user_activities
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create index for better performance
CREATE INDEX idx_user_activities_user_date ON public.user_activities(user_id, scheduled_date);
CREATE INDEX idx_user_activities_scheduled_time ON public.user_activities(scheduled_date, scheduled_time);