/**
 * CustomerStoriesSection — 3-column video story cards
 * Original: frontend/src/components/landing/CustomerStories.tsx
 */
import { ArrowRight, Play } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface StoryCardProps {
  image: string;
  title: string;
}

function StoryCard({ image, title }: StoryCardProps) {
  return (
    <div className="group relative h-64 cursor-pointer overflow-hidden rounded-3xl shadow-lg">
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-black/40 transition-opacity group-hover:opacity-60" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-primary/20 flex h-16 w-16 items-center justify-center rounded-full backdrop-blur-md transition-transform group-hover:scale-110">
          <Play
            className="text-primary-foreground h-8 w-8 transition-opacity"
            fill="currentColor"
          />
        </div>
      </div>
    </div>
  );
}

export function CustomerStoriesSection() {
  return (
    <section className="bg-background py-20">
      <div className="container mx-auto px-4 text-center lg:px-8">
        <h1 className="font-quicksand text-foreground mb-4 text-4xl leading-none font-black tracking-tighter md:text-5xl">
          Discover Our Reliability Through Customer Experiences
        </h1>
        <p className="text-muted-foreground mt-4 text-lg font-medium">
          Listen to the experiences and personal stories of our esteemed customers
        </p>
        <div className="mx-auto mt-12 grid max-w-7xl gap-8 md:grid-cols-3">
          <StoryCard
            image="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=400&q=80"
            title="Residential Solar Success Story"
          />
          <StoryCard
            image="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=400&q=80"
            title="Commercial Solar Transformation"
          />
          <StoryCard
            image="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80"
            title="Industrial Solar Implementation"
          />
        </div>
        <div className="mt-12">
          <Button
            asChild
            variant="default"
            className="hover:bg-brand-dark/90 bg-brand-dark h-16 rounded-2xl px-12 font-black tracking-widest transition-all"
          >
            <Link href="/blog" className="font-quicksand">
              More Customer Stories <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
