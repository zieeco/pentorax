/**
 * ComingSoonPage — Reusable placeholder for public pages under development
 */
import { Construction } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface ComingSoonPageProps {
  title: string;
}

export function ComingSoonPage({ title }: ComingSoonPageProps) {
  return (
    <div className="bg-background flex min-h-[60vh] flex-col items-center justify-center px-4 py-20 text-center">
      <div className="bg-primary/5 mb-6 rounded-full p-6">
        <Construction className="text-primary h-16 w-16" />
      </div>
      <h1 className="font-quicksand text-foreground mb-3 text-3xl font-black">{title}</h1>
      <p className="text-muted-foreground mb-8 max-w-md font-medium">
        This page is being built to give you the best solar energy experience. Check back soon!
      </p>
      <Button
        asChild
        className="font-quicksand h-14 rounded-2xl px-10 font-black tracking-widest shadow-lg transition-all hover:scale-105 active:scale-95"
      >
        <Link href="/">Back to Home</Link>
      </Button>
    </div>
  );
}
