import { Calendar, BookOpen, TrendingUp, Settings, LogOut } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Navigation = () => {
  const location = useLocation();
  const { signOut } = useAuth();
  
  const navItems = [
    {
      icon: Calendar,
      label: "Today",
      href: "/dashboard",
      active: location.pathname === "/dashboard"
    },
    {
      icon: BookOpen,
      label: "Library",
      href: "/library",
      active: location.pathname === "/library"
    },
    {
      icon: TrendingUp,
      label: "Progress",
      href: "/progress",
      active: location.pathname === "/progress"
    },
    {
      icon: Settings,
      label: "Settings",
      href: "/settings",
      active: location.pathname === "/settings"
    }
  ];

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <>
      <div className="fixed top-4 right-4 z-50">
        <Button
          onClick={handleSignOut}
          variant="ghost"
          size="sm"
          className="text-muted-foreground hover:text-foreground"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </Button>
      </div>
      
      <nav className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-sm border-t border-border">
        <div className="container mx-auto px-4 max-w-md">
          <div className="flex items-center justify-around py-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition-all duration-300",
                  item.active
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
              >
                <item.icon className={cn("w-5 h-5", item.active && "gentle-pulse")} />
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
};