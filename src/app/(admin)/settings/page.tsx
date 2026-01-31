"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Loader2, Settings, User, Bell, Shield, Palette, Database } from "lucide-react";
import { toast } from "sonner";
import api from "@/lib/axios";
import { authClient } from "@/lib/auth-client";

export default function SettingsPage() {
  const [loading, setLoading] = useState(false);
  const { data: session } = authClient.useSession();

  const [systemSettings, setSystemSettings] = useState({
    notifications: true,
    maintenanceMode: false,
    publicRegistration: true,
    debugMode: false
  });

  const handleToggle = (key: keyof typeof systemSettings) => {
    setSystemSettings(prev => ({ ...prev, [key]: !prev[key] }));
    toast.success(`${key.charAt(0).toUpperCase() + key.slice(1)} updated`);
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Logic to save profile using the user API
      toast.success("Profile updated successfully");
    } catch (err) {
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-10">
      <div>
        <h1 className="text-4xl font-bold tracking-tight flex items-center gap-3">
          <Settings className="h-10 w-10 text-primary" />
          Settings
        </h1>
        <p className="text-muted-foreground mt-2 text-lg">
          Configure your personal profile and system-wide preferences.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-[200px_1fr]">
        <aside className="space-y-2">
          <Button variant="ghost" className="w-full justify-start gap-2 bg-primary/10 text-primary">
            <User className="h-4 w-4" /> Profile
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-2">
            <Bell className="h-4 w-4" /> Notifications
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-2">
            <Shield className="h-4 w-4" /> Security
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-2">
            <Palette className="h-4 w-4" /> Appearance
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-2">
            <Database className="h-4 w-4" /> System Info
          </Button>
        </aside>

        <div className="space-y-6">
          <Card className="border-none shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" /> Account Information
              </CardTitle>
              <CardDescription>Manage your public profile details.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" defaultValue={session?.user?.name || ""} placeholder="Your Name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" defaultValue={session?.user?.email || ""} disabled />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Input id="bio" placeholder="Tell us about yourself" />
                </div>
                <Button type="submit" disabled={loading}>
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Save Changes
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" /> System Configuration
              </CardTitle>
              <CardDescription>Global application settings (Admin only).</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive system alerts via email.</p>
                </div>
                <Switch
                  checked={systemSettings.notifications}
                  onCheckedChange={() => handleToggle('notifications')}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base text-destructive">Maintenance Mode</Label>
                  <p className="text-sm text-muted-foreground">Take the application offline for users.</p>
                </div>
                <Switch
                  checked={systemSettings.maintenanceMode}
                  onCheckedChange={() => handleToggle('maintenanceMode')}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Public Registration</Label>
                  <p className="text-sm text-muted-foreground">Allow new users to sign up themselves.</p>
                </div>
                <Switch
                  checked={systemSettings.publicRegistration}
                  onCheckedChange={() => handleToggle('publicRegistration')}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}