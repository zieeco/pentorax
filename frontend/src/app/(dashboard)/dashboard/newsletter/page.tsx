'use client';

/**
 * Newsletter Management Page
 * Refactored: NewsletterHeader, NewsletterStats, NewsletterFilters, SubscriberTable extracted
 * Status: Refactored to < 150 lines
 */
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { TrendingUp } from 'lucide-react';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import { NewsletterFilters } from '@/components/dashboard/NewsletterFilters';
import { NewsletterHeader } from '@/components/dashboard/NewsletterHeader';
import { NewsletterStats } from '@/components/dashboard/NewsletterStats';
import { SubscriberTable } from '@/components/dashboard/SubscriberTable';
import { Card, CardContent } from '@/components/ui/card';
import { newsletterApi } from '@/services';

interface Subscriber {
  id: string;
  email: string;
  full_name: string;
  created_at: string;
  is_active: boolean;
}

export default function NewsletterSubscribersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');

  const {
    data: subscribers = [],
    isLoading,
    refetch,
    isRefetching,
  } = useQuery<Subscriber[]>({
    queryKey: ['newsletter-subscribers', statusFilter, searchTerm],
    queryFn: async () => {
      const params: any = {};
      if (statusFilter === 'active') params.is_active = true;
      if (statusFilter === 'inactive') params.is_active = false;
      if (searchTerm) params.search = searchTerm;
      const res = await newsletterApi.list(params);
      return res.data;
    },
  });

  const handleExport = async () => {
    try {
      const res = await newsletterApi.export();
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `pentorax_subscribers_${format(new Date(), 'yyyy-MM-dd')}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      toast.success('Audience Exported');
    } catch (e) {
      toast.error('Export Failed');
    }
  };

  const stats = useMemo(
    () => ({
      total: subscribers.length,
      active: subscribers.filter((s) => s.is_active).length,
      inactive: subscribers.filter((s) => !s.is_active).length,
    }),
    [subscribers]
  );

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 space-y-8 duration-700">
      <NewsletterHeader
        onExport={handleExport}
        onRefresh={() => refetch()}
        isRefetching={isRefetching}
      />
      <NewsletterStats {...stats} />
      <NewsletterFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
      />
      <SubscriberTable subscribers={subscribers} isLoading={isLoading} />
      <Card className="bg-brand-indigo/[0.03] border-brand-indigo/10 rounded-[2rem] shadow-none">
        <CardContent className="flex items-center gap-4 p-6">
          <div className="bg-brand-indigo/10 rounded-2xl p-3">
            <TrendingUp className="text-brand-indigo h-5 w-5" />
          </div>
          <div>
            <p className="text-brand-indigo text-sm font-black tracking-wider uppercase">
              Retention Optimizer
            </p>
            <p className="mt-0.5 text-xs font-medium text-gray-500">
              Your audience has grown by 12% this month. Strategy: Target unsubscribed users with a
              custom re-engagement offer.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
