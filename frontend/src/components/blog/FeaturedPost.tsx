'use client';

/**
 * FeaturedPost — mission-critical narrative asset
 * Precision-engineered hero for featured blog content.
 * Adheres to 150-line rule.
 */
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { BlogPost } from '@/services/blog.service';

interface FeaturedPostProps {
  post: BlogPost;
}

export function FeaturedPost({ post }: FeaturedPostProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="group mb-24 block">
      <div className="border-border/50 bg-brand-dark relative flex min-h-[600px] items-end overflow-hidden rounded-[4rem] border text-white shadow-2xl">
        <Image
          src={
            post.featured_image ||
            'https://images.unsplash.com/photo-1466611653911-954ffaa13b6f?auto=format&fit=crop&w=1200&q=80'
          }
          alt={post.title}
          fill
          className="object-cover opacity-40 grayscale transition-all duration-1000 group-hover:scale-105 group-hover:grayscale-0"
        />
        <div className="from-brand-dark via-brand-dark/40 absolute inset-0 bg-gradient-to-t to-transparent opacity-80" />

        <div className="relative z-10 max-w-4xl p-12 lg:p-24">
          <Badge className="bg-primary mb-10 rounded-full border-none px-5 py-1.5 text-[10px] font-black tracking-widest text-white uppercase italic shadow-lg">
            Featured Narrative
          </Badge>
          <h2 className="group-hover:text-primary mb-8 text-4xl leading-none font-black tracking-tighter lowercase italic transition-colors lg:text-7xl">
            {post.title}
          </h2>
          <p className="mb-12 line-clamp-2 max-w-2xl text-xl leading-relaxed font-medium text-white/70 lowercase">
            {post.excerpt}
          </p>
          <div className="text-primary flex items-center gap-4 text-[10px] font-black tracking-widest uppercase italic transition-transform group-hover:translate-x-4">
            Initialize Full Synchronize <ArrowRight className="h-4 w-4" />
          </div>
        </div>
      </div>
    </Link>
  );
}
