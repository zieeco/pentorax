'use client';

/**
 * BlogPage — Mission-critical narrative hub
 * Precision-engineered repository for institutional knowledge and energy insights.
 * Adheres to 150-line rule.
 */
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { BlogPostCard } from '@/components/blog/BlogPostCard';
import { CategoryFilter } from '@/components/blog/CategoryFilter';
import { FeaturedPost } from '@/components/blog/FeaturedPost';
import { Badge } from '@/components/ui/badge';
import { useBlogPosts } from '@/hooks/blog-hooks';

export default function BlogPage() {
  const [category, setCategory] = useState<string | undefined>();
  const { data: posts = [], isLoading } = useBlogPosts({ category });

  const featured = posts[0];
  const regular = posts.slice(1);

  return (
    <div className="bg-background min-h-screen pb-24">
      {/* High-Stakes Header */}
      <section className="border-border bg-muted/30 relative overflow-hidden border-b py-32">
        <div className="relative z-10 container mx-auto px-4 text-center lg:px-8">
          <Badge className="bg-primary/20 text-primary mb-8 rounded-full border-none px-4 py-1 text-[10px] leading-none font-black tracking-widest uppercase italic shadow-sm">
            Intelligence Hub
          </Badge>
          <h1 className="text-foreground mb-8 text-6xl leading-none font-black tracking-tighter lowercase italic md:text-9xl">
            Energy <br />
            <span className="text-primary not-italic">Insights.</span>
          </h1>
          <p className="text-muted-foreground mx-auto max-w-2xl text-xl font-medium lowercase shadow-sm">
            Latest updates from our labs, success stories, and expert takes on the clean energy
            revolution.
          </p>
        </div>
      </section>

      {/* Main Narrative Hub */}
      <section className="container mx-auto px-4 py-24 lg:px-8">
        <CategoryFilter selected={category} onSelect={setCategory} />

        {isLoading ? (
          <div className="flex items-center justify-center py-32">
            <Loader2 className="text-primary h-10 w-10 animate-spin" />
          </div>
        ) : posts.length > 0 ? (
          <>
            {featured && <FeaturedPost post={featured} />}
            <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
              {regular.map((post) => (
                <BlogPostCard key={post.id} post={post} />
              ))}
            </div>
          </>
        ) : (
          <div className="border-border bg-muted/30 rounded-[4rem] border py-32 text-center">
            <p className="text-muted-foreground text-[10px] font-black tracking-widest uppercase italic">
              No matching intelligence logs found in current sector.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
