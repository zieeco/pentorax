'use client';

/**
 * BlogPostPage — Mission-critical narrative deployment
 * Precision-engineered interface for single blog asset visualization.
 * Adheres to 150-line rule.
 */
import { ArrowLeft, Calendar, Clock, Share2, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { use } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useBlogPost } from '@/hooks/blog-hooks';

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { data: post, isLoading } = useBlogPost(slug);

  if (isLoading) return <PostSkeleton />;
  if (!post) return <PostNotFound />;

  const date = new Date(post.published_at || post.created_at).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
  const categoryName = typeof post.category === 'object' ? post.category.name : 'Intelligence';

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Immersive Header */}
      <section className="relative overflow-hidden bg-gray-900 py-32 text-white">
        <div className="absolute inset-0 opacity-20">
          <Image
            src={
              post.featured_image ||
              'https://images.unsplash.com/photo-1466611653911-954ffaa13b6f?auto=format&fit=crop&w=1200&q=80'
            }
            alt={post.title}
            fill
            className="object-cover grayscale"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />
        <div className="relative z-10 container mx-auto px-4 lg:px-8">
          <Button
            asChild
            variant="ghost"
            className="group mb-12 -ml-4 text-white/60 hover:text-white"
          >
            <Link href="/blog" className="flex items-center gap-3 italic">
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />{' '}
              Narrative Repository
            </Link>
          </Button>
          <div className="mb-8 flex flex-wrap items-center gap-6">
            <Badge className="bg-primary rounded-full border-none px-4 py-1 text-[10px] font-black tracking-widest text-white uppercase italic">
              {categoryName}
            </Badge>
            <span className="flex items-center gap-2 text-[10px] font-black tracking-widest text-white/40 uppercase italic">
              <Calendar className="h-3 w-3" /> {date}
            </span>
            <span className="flex items-center gap-2 text-[10px] font-black tracking-widest text-white/40 uppercase italic">
              <Clock className="h-3 w-3" /> {post.read_time || '5 MIN'} READ
            </span>
          </div>
          <h1 className="mb-12 max-w-5xl text-4xl leading-none font-black tracking-tighter lowercase italic text-shadow-sm md:text-7xl lg:text-8xl">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-white/60">
            <Image
              src={post.author?.image || 'https://via.placeholder.com/100'}
              alt={post.author?.name || 'Author'}
              width={48}
              height={48}
              className="border-primary/20 rounded-full border-2"
            />
            <div className="pt-1">
              <p className="mb-0.5 text-[10px] font-black tracking-widest text-white/30 uppercase">
                Primary Author
              </p>
              <p className="text-sm font-black italic">
                {post.author?.name || 'Pentorax Intelligence'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Content Deployment */}
      <article className="relative mx-auto max-w-4xl px-4 py-24 lg:px-8">
        <div className="absolute top-24 left-0 hidden -translate-x-32 flex-col gap-8 xl:flex">
          <Button
            variant="outline"
            size="icon"
            className="hover:bg-primary h-14 w-14 rounded-2xl border-gray-100 shadow-sm transition-all hover:text-white"
          >
            <Share2 className="h-5 w-5" />
          </Button>
        </div>

        <div
          className="prose prose-2xl prose-gray prose-headings:font-black prose-headings:italic prose-headings:tracking-tighter prose-headings:lowercase prose-p:font-medium prose-p:text-gray-600 prose-p:leading-relaxed prose-img:rounded-[3rem] prose-img:shadow-2xl prose-a:text-primary prose-a:font-black prose-a:no-underline hover:prose-a:underline max-w-none transition-all"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>

      {/* Narrative Footer CTA */}
      <section className="container mx-auto px-4 py-24 lg:px-8">
        <div className="relative overflow-hidden rounded-[4rem] bg-gray-900 p-12 text-center text-white shadow-2xl lg:p-24">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1600&q=40')] bg-cover bg-center opacity-10" />
          <h2 className="relative z-10 mb-12 text-4xl leading-none font-black tracking-tighter uppercase italic md:text-6xl">
            Power Your <br />
            <span className="text-primary not-italic text-shadow-sm">Vision.</span>
          </h2>
          <Button
            asChild
            size="lg"
            className="bg-primary relative z-10 h-20 rounded-[2.5rem] px-16 font-black tracking-widest text-white uppercase italic shadow-xl transition-all hover:bg-white hover:text-gray-900"
          >
            <Link href="/contact">Synchronize With Experts</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

function PostSkeleton() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gray-900 py-32">
        <div className="container mx-auto px-4">
          <Skeleton className="h-40 w-full rounded-3xl bg-gray-800" />
        </div>
      </div>
      <div className="mx-auto max-w-4xl space-y-8 px-4 py-24">
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-5/6" />
        <Skeleton className="h-8 w-4/6" />
      </div>
    </div>
  );
}

function PostNotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center p-8 text-center">
      <h2 className="mb-8 text-4xl font-black italic">Narrative Log Void.</h2>
      <Button asChild className="h-16 rounded-2xl bg-gray-900 px-10 italic">
        <Link href="/blog">Return to Hub</Link>
      </Button>
    </div>
  );
}
