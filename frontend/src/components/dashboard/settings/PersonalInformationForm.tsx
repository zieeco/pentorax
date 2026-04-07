'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function PersonalInformationForm() {
  return (
    <Card className="border-border bg-card overflow-hidden rounded-[2.5rem] shadow-sm">
      <CardHeader className="border-border/50 bg-muted/20 border-b p-8 pb-4">
        <CardTitle className="text-foreground text-xl font-black">Personal Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-8 p-8">
        <div className="flex items-center gap-6">
          <div className="border-background bg-muted text-muted-foreground/30 flex h-20 w-20 items-center justify-center rounded-[2rem] border-2 text-3xl font-black shadow-xl">
            JD
          </div>
          <div>
            <Button className="h-auto rounded-xl px-4 py-2 text-xs font-bold">Update Avatar</Button>
            <p className="text-muted-foreground mt-2 text-[10px] font-bold tracking-widest uppercase">
              Recommended: 200×200px PNG
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label className="text-muted-foreground ml-1 text-[10px] font-black tracking-widest uppercase">
              Full Name
            </Label>
            <Input
              defaultValue="John Doe"
              className="focus:border-primary bg-muted/30 h-12 rounded-xl border-transparent font-bold"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-muted-foreground ml-1 text-[10px] font-black tracking-widest uppercase">
              Email Address
            </Label>
            <Input
              defaultValue="john.doe@pentorax.com"
              className="focus:border-primary bg-muted/30 h-12 rounded-xl border-transparent font-bold"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
