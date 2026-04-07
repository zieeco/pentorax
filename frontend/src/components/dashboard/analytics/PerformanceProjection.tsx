'use client';

import { LineChart, Target } from 'lucide-react';
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function PerformanceProjection() {
  return (
    <Card className="border-border bg-card overflow-hidden rounded-[2.5rem] shadow-sm lg:col-span-2">
      <CardHeader className="flex flex-row items-center justify-between p-8 pb-4">
        <CardTitle className="text-foreground flex items-center gap-2 text-xl font-black">
          <Target className="text-primary h-5 w-5" />
          Performance Projection
        </CardTitle>
        <Badge className="bg-primary/5 text-primary border-primary/10 rounded-lg text-[9px] font-bold uppercase shadow-none">
          Beta
        </Badge>
      </CardHeader>
      <CardContent className="p-8 pt-0">
        <div className="border-border bg-muted/20 flex h-64 items-center justify-center rounded-[2rem] border border-dashed">
          <div className="text-center">
            <LineChart className="text-muted-foreground/30 mx-auto mb-4 h-12 w-12" />
            <p className="text-muted-foreground font-bold">
              Interactive data visualizations are being calibrated.
            </p>
            <p className="text-muted-foreground/40 mt-1 text-[10px] font-medium uppercase">
              Ready in v1.4.0
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
