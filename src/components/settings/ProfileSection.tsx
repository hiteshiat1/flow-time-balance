import { useState } from "react";
import { User, Edit2, Save, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { useProfile } from "@/hooks/useProfile";

export const ProfileSection = () => {
  const { user } = useAuth();
  const { profile, updateProfile } = useProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState("");

  const handleEdit = () => {
    setDisplayName(profile?.display_name || "");
    setIsEditing(true);
  };

  const handleSave = async () => {
    const success = await updateProfile({ display_name: displayName });
    if (success) {
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setDisplayName("");
  };

  const getUserDisplayName = () => {
    if (profile?.display_name) return profile.display_name;
    if (user?.email) return user.email.split('@')[0];
    return "User";
  };

  return (
    <Card className="p-4 mb-6 bg-gradient-to-r from-card to-primary-soft/30">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
          <User className="w-6 h-6 text-primary" />
        </div>
        <div className="flex-1">
          {isEditing ? (
            <Input
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="font-medium text-foreground mb-1"
              placeholder="Enter your name"
            />
          ) : (
            <h3 className="font-medium text-foreground">{getUserDisplayName()}</h3>
          )}
          <p className="text-sm text-muted-foreground">{user?.email}</p>
        </div>
        {isEditing ? (
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={handleSave}>
              <Save className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={handleCancel}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        ) : (
          <Button variant="ghost" size="sm" onClick={handleEdit}>
            <Edit2 className="w-4 h-4" />
          </Button>
        )}
      </div>
    </Card>
  );
};