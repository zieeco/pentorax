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
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-20 text-center">
      <div className="bg-primary/5 mb-6 rounded-full p-6">
        <Construction className="text-primary h-16 w-16" />
      </div>
      <h1 className="mb-3 text-3xl font-black text-gray-900">{title}</h1>
      <p className="mb-8 max-w-md font-medium text-gray-500">
        This page is being built to give you the best solar energy experience. Check back soon!
      </p>
      <Button asChild className="rounded-xl font-bold">
        <Link href="/">Back to Home</Link>
      </Button>
    </div>
  );
}
