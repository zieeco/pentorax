'use client';

/**
 * ImageLightbox component - Full-screen image viewer with navigation
 * Ported to Next.js and premium shadcn/ui.
 */
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

interface ImageData {
  image_url: string;
  alt_text?: string;
}

interface ImageLightboxProps {
  images: ImageData[];
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
}

export function ImageLightbox({ images, initialIndex, isOpen, onClose }: ImageLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  useEffect(() => {
    const handleKeyboard = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goToPrevious();
      if (e.key === 'ArrowRight') goToNext();
    };
    if (isOpen) document.addEventListener('keydown', handleKeyboard);
    return () => document.removeEventListener('keydown', handleKeyboard);
  }, [isOpen, goToPrevious, goToNext]);

  if (!isOpen) return null;

  return (
    <div
      className="animate-in fade-in bg-background/95 fixed inset-0 z-[100] flex items-center justify-center backdrop-blur-xl duration-300"
      onClick={onClose}
    >
      <Button
        variant="ghost"
        size="icon"
        className="text-foreground hover:bg-foreground/10 absolute top-6 right-6 z-50 h-12 w-12 rounded-2xl"
        onClick={onClose}
      >
        <X className="h-6 w-6" />
      </Button>

      {images.length > 1 && (
        <>
          <Button
            variant="ghost"
            size="icon"
            className="text-foreground hover:bg-foreground/10 absolute left-6 z-50 h-16 w-16 rounded-3xl transition-transform active:scale-90"
            onClick={(e) => {
              e.stopPropagation();
              goToPrevious();
            }}
          >
            <ChevronLeft className="h-10 w-10" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-foreground hover:bg-foreground/10 absolute right-6 z-50 h-16 w-16 rounded-3xl transition-transform active:scale-90"
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
          >
            <ChevronRight className="h-10 w-10" />
          </Button>
        </>
      )}

      <div
        className="relative flex h-full max-h-[85vh] w-full max-w-5xl items-center justify-center p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={images[currentIndex].image_url}
          alt={images[currentIndex].alt_text || `Product image ${currentIndex + 1}`}
          fill
          className="animate-in zoom-in-95 object-contain duration-500"
          priority
        />
      </div>

      {images.length > 1 && (
        <div className="border-foreground/10 bg-foreground/10 text-foreground absolute bottom-10 left-1/2 -translate-x-1/2 rounded-2xl border px-6 py-2 text-xs font-black backdrop-blur-md">
          {currentIndex + 1} / {images.length}
        </div>
      )}
    </div>
  );
}
