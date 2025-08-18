import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Heart, Target, TrendingUp, Calendar, BookOpen, BarChart3 } from 'lucide-react';

const Landing = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Heart className="h-12 w-12 text-primary" />,
      title: "Wellness Tracking",
      description: "Monitor your mental and physical wellness with personalized daily check-ins and mood tracking."
    },
    {
      icon: <Target className="h-12 w-12 text-primary" />,
      title: "Goal Setting",
      description: "Set meaningful wellness goals and track your progress with intelligent insights and recommendations."
    },
    {
      icon: <TrendingUp className="h-12 w-12 text-primary" />,
      title: "Progress Analytics",
      description: "Visualize your wellness journey with detailed analytics and trend analysis over time."
    },
    {
      icon: <Calendar className="h-12 w-12 text-primary" />,
      title: "Daily Routines",
      description: "Build healthy habits with customizable daily routines and gentle reminders."
    },
    {
      icon: <BookOpen className="h-12 w-12 text-primary" />,
      title: "Wellness Library",
      description: "Access curated content, exercises, and resources to support your wellness journey."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-foreground mb-6">
            Your Personal <span className="text-primary">Wellness</span> Companion
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Transform your well-being with MeTime - the app that helps you track, understand, and improve your wellness journey every single day.
          </p>
        </div>
      </section>

      {/* Features Carousel */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            Discover What Makes MeTime Special
          </h2>
          
          <Carousel className="w-full max-w-5xl mx-auto">
            <CarouselContent>
              {features.map((feature, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <Card className="h-full">
                    <CardContent className="p-6 text-center space-y-4">
                      <div className="flex justify-center">
                        {feature.icon}
                      </div>
                      <h3 className="text-xl font-semibold text-foreground">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-foreground mb-8">
            Why Choose MeTime?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">100%</div>
              <div className="text-muted-foreground">Privacy Focused</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">24/7</div>
              <div className="text-muted-foreground">Always Available</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">∞</div>
              <div className="text-muted-foreground">Unlimited Tracking</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-6">
            Ready to Start Your Wellness Journey?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of users who have transformed their well-being with MeTime. 
            Start your free account today and take the first step towards a healthier, happier you.
          </p>
          <Button 
            size="lg" 
            className="text-lg px-8 py-6"
            onClick={() => navigate('/auth')}
          >
            Get Started Free
          </Button>
          <p className="text-sm text-muted-foreground mt-4">
            No credit card required • Start immediately
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t">
        <div className="max-w-4xl mx-auto text-center text-muted-foreground">
          <p>&copy; 2024 MeTime. Your wellness, your journey.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;