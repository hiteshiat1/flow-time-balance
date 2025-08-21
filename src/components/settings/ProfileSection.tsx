import { useState } from "react";
import { User, Edit2, Save, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { useProfile } from "@/hooks/useProfile";

export const ProfileSection = () => {
  const { user } = useAuth();
  const { profile, updateProfile } = useProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState(profile?.display_name || "");

  const handleSave = async () => {
    await updateProfile({ display_name: displayName });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setDisplayName(profile?.display_name || "");
    setIsEditing(false);
  };

  if (!user || !profile) return null;

  return (
    <Card className="p-4 mb-6 bg-gradient-to-r from-card to-primary-soft/30">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
          <User className="w-6 h-6 text-primary" />
        </div>
        <div className="flex-1">
          {isEditing ? (
            <div className="space-y-2">
              <Label htmlFor="display-name" className="text-sm text-muted-foreground">
                Display Name
              </Label>
              <Input
                id="display-name"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="h-8"
              />
            </div>
          ) : (
            <>
              <h3 className="font-medium text-foreground">
                {profile.display_name || "Update your name"}
              </h3>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </>
          )}
        </div>
        <div className="flex gap-2">
          {isEditing ? (
            <>
              <Button variant="ghost" size="sm" onClick={handleSave}>
                <Save className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={handleCancel}>
                <X className="w-4 h-4" />
              </Button>
            </>
          ) : (
            <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)}>
              <Edit2 className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};