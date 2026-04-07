/**
 * AuthLogo - Shared logo component used across all auth pages
 */
import Image from 'next/image';
import Link from 'next/link';

export function AuthLogo() {
  return (
    <Link href="/" className="flex items-center space-x-2">
      <Image
        src="/pentorax.jpeg"
        alt="Pentorax Logo"
        width={32}
        height={32}
        className="rounded-lg object-contain"
      />
      <span className="text-foreground font-quicksand text-xl font-extrabold">PentoraX</span>
    </Link>
  );
}
