'use client';

/**
 * CaseStudyCard — mission-critical performance logs
 * Precision-engineered card for case study visualization.
 * Adheres to 150-line rule.
 */
import { MapPin, TrendingUp, Zap } from 'lucide-react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

interface CaseStudyCardProps {
  study: {
    title: string;
    description: string;
    image: string;
    location: string;
    capacity: string;
    savings: string;
  };
}

export function CaseStudyCard({ study }: CaseStudyCardProps) {
  return (
    <Card className="group flex h-full flex-col overflow-hidden rounded-[2.5rem] border border-gray-100 bg-white shadow-sm transition-all duration-700 hover:shadow-2xl">
      <div className="relative h-72 shrink-0 overflow-hidden">
        <Image
          src={study.image}
          alt={study.title}
          fill
          className="object-cover transition-transform duration-1000 group-hover:scale-110 group-hover:rotate-1"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/20 to-transparent" />
        <div className="absolute right-6 bottom-6 left-6 flex items-end justify-between">
          <Badge className="bg-primary flex items-center gap-2 border-none px-4 py-1 text-[10px] font-black tracking-widest text-white uppercase italic">
            <Zap className="h-3 w-3" /> {study.capacity}
          </Badge>
        </div>
      </div>

      <div className="flex flex-grow flex-col p-10">
        <h3 className="group-hover:text-primary mb-4 text-2xl leading-none font-black tracking-tighter lowercase italic transition-colors">
          {study.title}
        </h3>
        <p className="mb-8 line-clamp-3 text-sm leading-relaxed font-medium text-gray-500 lowercase">
          {study.description}
        </p>

        <div className="mt-auto space-y-4 border-t border-gray-50 pt-6">
          <div className="flex items-center gap-3 text-[10px] font-black tracking-widest text-gray-400 uppercase italic">
            <MapPin className="h-3 w-3" /> {study.location}
          </div>
          <div className="flex items-center gap-3 text-[10px] font-black tracking-widest text-green-600 uppercase italic transition-transform group-hover:translate-x-1">
            <TrendingUp className="h-4 w-4" /> {study.savings}
          </div>
        </div>
      </div>
    </Card>
  );
}
