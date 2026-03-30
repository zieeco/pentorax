'use client';

/**
 * SubscriberTable — Table list of newsletter subscribers
 * Extracted from newsletter/page.tsx for 150-line rule compliance
 */
import { format } from 'date-fns';
import { ArrowUpDown, Calendar, Mail } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface Subscriber {
  id: string;
  email: string;
  full_name: string;
  created_at: string;
  is_active: boolean;
}

interface SubscriberTableProps {
  subscribers: Subscriber[];
  isLoading: boolean;
}

export function SubscriberTable({ subscribers, isLoading }: SubscriberTableProps) {
  return (
    <Card className="border-border bg-card overflow-hidden rounded-[2.5rem] shadow-sm">
      <Table>
        <TableHeader className="bg-muted/30">
          <TableRow className="border-none hover:bg-transparent">
            <TableHead className="text-muted-foreground px-8 py-5 text-[10px] font-black tracking-widest uppercase">
              Subscriber Information
            </TableHead>
            <TableHead className="text-muted-foreground px-6 py-5 text-[10px] font-black tracking-widest uppercase">
              Email Address
            </TableHead>
            <TableHead className="text-muted-foreground px-6 py-5 text-[10px] font-black tracking-widest uppercase">
              Date Joined <ArrowUpDown className="ml-1 inline h-2.5 w-2.5" />
            </TableHead>
            <TableHead className="text-muted-foreground px-8 py-5 text-right text-[10px] font-black tracking-widest uppercase">
              Status
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            Array(8)
              .fill(0)
              .map((_, i) => (
                <TableRow key={i} className="border-border/50">
                  <TableCell className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <div className="bg-muted h-10 w-10 animate-pulse rounded-full" />
                      <div className="bg-muted h-4 w-32 animate-pulse rounded-lg" />
                    </div>
                  </TableCell>
                  <TableCell colSpan={3} className="px-6 py-5">
                    <div className="bg-muted/30 h-4 w-full animate-pulse rounded-lg" />
                  </TableCell>
                </TableRow>
              ))
          ) : subscribers.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="h-80 text-center">
                <div className="flex flex-col items-center justify-center space-y-4">
                  <div className="border-border bg-muted/30 rounded-full border p-6">
                    <Mail className="text-muted-foreground/40 h-8 w-8" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-foreground text-lg font-black">
                      No subscribers matching your search
                    </p>
                    <p className="text-muted-foreground text-sm font-medium">
                      Try verifying your filters or search terms.
                    </p>
                  </div>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            subscribers.map((subscriber) => (
              <TableRow
                key={subscriber.id}
                className="group border-border/50 hover:bg-muted/30 transition-colors"
              >
                <TableCell className="px-8 py-5">
                  <div className="flex items-center">
                    <div className="bg-primary/5 text-primary group-hover:bg-primary flex h-10 w-10 items-center justify-center rounded-2xl font-black transition-all duration-300 group-hover:text-white">
                      {subscriber.full_name.charAt(0).toUpperCase()}
                    </div>
                    <div className="ml-4">
                      <div className="group-hover:text-primary text-foreground text-sm font-black transition-colors">
                        {subscriber.full_name}
                      </div>
                      <div className="text-muted-foreground/50 text-[10px] font-bold tracking-tighter uppercase">
                        Verified Member
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="px-6 py-5">
                  <div className="text-muted-foreground text-sm font-bold">{subscriber.email}</div>
                </TableCell>
                <TableCell className="px-6 py-5">
                  <div className="text-muted-foreground flex items-center text-xs font-black">
                    <Calendar className="mr-2 h-3.5 w-3.5" />
                    {format(new Date(subscriber.created_at), 'MMMM dd, yyyy')}
                  </div>
                </TableCell>
                <TableCell className="px-8 py-5 text-right">
                  <Badge
                    className={`rounded-xl border px-3 py-1 text-[9px] font-black uppercase shadow-none ${subscriber.is_active ? 'bg-secondary/10 text-secondary border-secondary/20' : 'border-border bg-muted text-muted-foreground'}`}
                  >
                    {subscriber.is_active ? 'Subscription Active' : 'Unsubscribed'}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </Card>
  );
}
