'use client';

/**
 * SolutionCard — Individual solution card with hover effects
 * Used inside SolutionsSection grid
 */
import { ArrowRight, Award, CheckCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card } from '../ui/card';

interface SolutionCardProps {
  image: string;
  title: string;
  ratingScore: number;
  description: string;
  features?: string[];
  stats?: { value: string; label: string }[];
  badge?: string;
  testimonial?: string;
  link?: string;
}

export function SolutionCard({
  image,
  title,
  ratingScore,
  description,
  features = [],
  stats = [],
  badge,
  testimonial,
  link,
}: SolutionCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group bg-card relative flex h-full flex-col space-y-4 rounded-[1rem] p-6 shadow-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <Card className="relative aspect-video overflow-hidden rounded-sm">
        {badge && (
          <Badge className="font-quicksand absolute top-4 left-4 z-20 border-none bg-gradient-to-r from-amber-500 to-orange-600 text-[10px] font-black tracking-widest text-white">
            <Award className="mr-1.5 h-3.5 w-3.5" />
            {badge}
          </Badge>
        )}
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="bg-primary/20 absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        {/* Efficiency overlay */}
        <div
          className={`absolute right-4 bottom-4 left-4 transform transition-all duration-500 ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
        >
          <div className="bg-background/90 border-border/50 rounded-2xl border p-4 shadow-lg backdrop-blur-md">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-foreground/70 text-[10px] font-black tracking-widest">
                Efficiency
              </span>
              <span className="text-primary text-xs font-black">
                {(ratingScore * 20).toFixed(0)}%
              </span>
            </div>
            <Progress value={ratingScore * 20} className="h-2" />
          </div>
        </div>
      </Card>

      {/* Content */}
      <div className="flex flex-1 flex-col px-2">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="font-quicksand text-foreground group-hover:text-primary text-xl font-black transition-colors duration-300">
            {title}
          </h3>
          <ArrowRight
            className={`text-primary h-5 w-5 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`}
          />
        </div>

        {stats.length > 0 && (
          <div className="mb-4 grid grid-cols-2 gap-3">
            {stats.map((s, i) => (
              <div
                key={i}
                className="bg-muted flex flex-col items-center justify-center rounded-2xl py-3 transition-transform duration-300 group-hover:scale-[1.02]"
              >
                <div className="text-primary text-base font-black">{s.value}</div>
                <div className="text-muted-foreground text-[9px] font-black tracking-widest">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        )}

        <p className="text-muted-foreground mb-4 line-clamp-2 text-sm leading-relaxed font-medium">
          {description}
        </p>

        {features.length > 0 && (
          <div
            className={`mb-4 space-y-2 overflow-hidden transition-all duration-500 ${isHovered ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}
          >
            {features.slice(0, 3).map((f, i) => (
              <div key={i} className="text-foreground/80 flex items-center text-xs font-medium">
                <CheckCircle className="text-primary mr-2.5 h-4 w-4 flex-shrink-0" />
                {f}
              </div>
            ))}
          </div>
        )}

        {testimonial && isHovered && (
          <div className="bg-primary/5 border-primary mb-4 rounded-2xl border-l-4 p-4 shadow-sm">
            <p className="text-muted-foreground text-xs leading-relaxed font-medium">
              &ldquo;{testimonial}&rdquo;
            </p>
          </div>
        )}

        <Button
          asChild
          className="bg-primary text-primary-foreground font-quicksand mt-auto h-14 rounded-2xl font-black tracking-widest shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <Link href={link ?? '#'}>
            Explore Solution{' '}
            <ArrowRight className="ml-2.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
