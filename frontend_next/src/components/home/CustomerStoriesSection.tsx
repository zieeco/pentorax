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
    <div className="group relative h-64 cursor-pointer overflow-hidden rounded-lg shadow-lg">
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-110"
      />
      <div className="bg-opacity-40 absolute inset-0 bg-black" />
      <div className="absolute inset-0 flex items-center justify-center">
        <Play
          className="h-16 w-16 text-white opacity-80 transition-opacity group-hover:opacity-100"
          fill="currentColor"
        />
      </div>
    </div>
  );
}

export function CustomerStoriesSection() {
  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-gray-800">
          Discover Our Reliability Through Customer Experiences
        </h2>
        <p className="mt-4 text-lg text-gray-600">
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
            className="rounded-md bg-gray-800 px-8 py-3 font-semibold hover:bg-gray-700"
          >
            <Link href="/blog">
              More Customer Stories <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
