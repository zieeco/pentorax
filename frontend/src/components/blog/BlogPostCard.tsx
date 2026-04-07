'use client';

/**
 * BlogPostCard — mission-critical narrative atom
 * Precision-engineered card for standard blog content.
 * Adheres to 150-line rule.
 */
import { ArrowRight, Calendar, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { BlogPost } from '@/services/blog.service';

interface BlogPostCardProps {
  post: BlogPost;
}

export function BlogPostCard({ post }: BlogPostCardProps) {
  const categoryName = typeof post.category === 'object' ? post.category.name : 'Intelligence';
  const date = new Date(post.created_at).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <Link href={`/blog/${post.slug}`} className="group flex h-full flex-col">
      <Card className="border-border bg-card flex h-full flex-col overflow-hidden rounded-[2.5rem] shadow-sm transition-all duration-700 group-hover:-translate-y-2 hover:shadow-2xl">
        <div className="relative h-64 shrink-0 overflow-hidden">
          <Image
            src={
              post.featured_image ||
              'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=600&q=80'
            }
            alt={post.title}
            fill
            className="object-cover grayscale transition-all duration-1000 group-hover:scale-110 group-hover:grayscale-0"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
        </div>

        <div className="flex flex-grow flex-col p-8">
          <div className="mb-6 flex items-center gap-4">
            <Badge className="bg-primary/10 text-primary border-none text-[9px] font-black tracking-widest uppercase italic">
              {categoryName}
            </Badge>
            <div className="bg-border h-px flex-grow" />
            <span className="text-muted-foreground flex items-center gap-2 text-[10px] font-black tracking-widest uppercase italic">
              <Calendar className="h-3 w-3" /> {date}
            </span>
          </div>

          <h3 className="group-hover:text-primary mb-4 line-clamp-2 text-2xl leading-tight font-black tracking-tighter lowercase italic transition-colors">
            {post.title}
          </h3>
          <p className="text-muted-foreground mb-8 line-clamp-3 text-sm leading-relaxed font-medium lowercase">
            {post.excerpt}
          </p>

          <div className="border-border mt-auto flex items-center justify-between border-t pt-6">
            <div className="text-muted-foreground flex items-center gap-3 text-[10px] font-black tracking-widest uppercase italic">
              <User className="h-3 w-3" /> {post.author?.name || 'Pentorax Intelligence'}
            </div>
            <ArrowRight className="text-primary h-4 w-4 opacity-0 transition-all group-hover:translate-x-2 group-hover:opacity-100" />
          </div>
        </div>
      </Card>
    </Link>
  );
}
