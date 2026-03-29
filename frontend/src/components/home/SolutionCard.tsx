/**
 * SolutionCard — Individual solution card with hover effects
 * Used inside SolutionsSection grid
 */
'use client';

import { ArrowRight, Award, CheckCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

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
      className="group relative flex h-full flex-col space-y-4"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image */}
      <div className="relative overflow-hidden">
        {badge && (
          <Badge className="absolute top-2 left-2 z-20 bg-gradient-to-r from-amber-400 to-orange-500 text-white">
            <Award className="mr-1 h-3 w-3" />
            {badge}
          </Badge>
        )}
        <Image
          src={image}
          alt={title}
          width={400}
          height={160}
          className="h-40 w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-400 opacity-0 transition-opacity duration-500 group-hover:opacity-50" />

        {/* Efficiency overlay */}
        <div
          className={`absolute right-2 bottom-2 left-2 transform transition-all duration-500 ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
        >
          <div className="rounded-lg bg-white/90 p-2 backdrop-blur-sm">
            <div className="mb-1 flex items-center justify-between">
              <span className="text-xs font-medium text-gray-700">Efficiency</span>
              <span className="text-xs font-bold text-green-600">{ratingScore * 20}%</span>
            </div>
            <Progress value={ratingScore * 20} className="h-1.5" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-800 transition-colors duration-300 group-hover:text-blue-600">
            {title}
          </h3>
          <ArrowRight
            className={`h-4 w-4 text-blue-600 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`}
          />
        </div>

        {stats.length > 0 && (
          <div className="mb-3 grid grid-cols-2 gap-2">
            {stats.map((s, i) => (
              <div
                key={i}
                className={`rounded-lg bg-gray-50 p-2 text-center transition-all duration-300 ${isHovered ? 'scale-105' : ''}`}
              >
                <div className="text-sm font-bold text-blue-600">{s.value}</div>
                <div className="text-xs text-gray-600">{s.label}</div>
              </div>
            ))}
          </div>
        )}

        <p className="mt-auto mb-3 text-sm text-gray-600">{description}</p>

        {features.length > 0 && (
          <div
            className={`mb-3 space-y-1 overflow-hidden transition-all duration-500 ${isHovered ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'}`}
          >
            {features.slice(0, 3).map((f, i) => (
              <div key={i} className="flex items-center text-xs text-gray-700">
                <CheckCircle className="mr-2 h-3 w-3 flex-shrink-0 text-green-500" />
                {f}
              </div>
            ))}
          </div>
        )}

        {testimonial && isHovered && (
          <div className="mb-3 rounded-lg border-l-2 border-blue-400 bg-blue-50 p-2">
            <p className="text-xs text-gray-700 italic">&ldquo;{testimonial}&rdquo;</p>
          </div>
        )}

        <Button
          asChild
          className="mt-auto bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:scale-105 hover:shadow-lg"
        >
          <Link href={link ?? '#'}>
            Learn More <ArrowRight className="ml-2 h-3 w-3" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
