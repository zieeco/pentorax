'use client';

/**
 * Account & Global Settings Page
 * Refactored: Sidebar, PersonalInfoForm, NotificationsForm extracted
 * Status: Refactored to < 60 lines
 */
import { Save, Settings } from 'lucide-react';
import React from 'react';
import { EmailNotificationsForm } from '@/components/dashboard/settings/EmailNotificationsForm';
import { PersonalInformationForm } from '@/components/dashboard/settings/PersonalInformationForm';
import { SettingsSidebar } from '@/components/dashboard/settings/SettingsSidebar';
import { Button } from '@/components/ui/button';

export default function SettingsPage() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 space-y-8 duration-700">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-foreground flex items-center gap-3 text-3xl font-black tracking-tight">
            <Settings className="text-primary h-8 w-8" />
            Control Center
          </h1>
          <p className="text-muted-foreground mt-1 font-medium">
            Manage your account preferences, security, and global PentoraX settings.
          </p>
        </div>
        <Button className="bg-primary shadow-primary/20 gap-2 rounded-xl font-bold shadow-xl">
          <Save className="h-4 w-4" />
          Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        {/* Navigation Sidebar */}
        <SettingsSidebar />

        {/* Content Area */}
        <div className="space-y-8 lg:col-span-3">
          <PersonalInformationForm />
          <EmailNotificationsForm />
        </div>
      </div>
    </div>
  );
}
