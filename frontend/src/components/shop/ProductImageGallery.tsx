'use client';

/**
 * ProductImageGallery component - Enhanced image gallery with zoom and lightbox
 * Refactored for Next.js 16 and premium styling.
 */
import { ChevronLeft, ChevronRight, Expand } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ImageLightbox } from './ImageLightbox';

interface ImageData {
  image_url: string;
  alt_text?: string;
}

interface ProductImageGalleryProps {
  images: ImageData[];
  productName: string;
}

export function ProductImageGallery({ images, productName }: ProductImageGalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const currentImage = images[selectedImageIndex];

  return (
    <div className="space-y-6">
      {/* Main Image with Zoom */}
      <div className="group border-border bg-card relative aspect-square overflow-hidden rounded-[2.5rem] border shadow-xl transition-all duration-500">
        <Image
          src={currentImage?.image_url || '/placeholder-product.png'}
          alt={currentImage?.alt_text || productName}
          fill
          className="cursor-zoom-in object-cover transition-transform duration-700 group-hover:scale-110"
          onClick={() => setIsLightboxOpen(true)}
          priority
        />

        <Button
          onClick={() => setIsLightboxOpen(true)}
          className="text-foreground border-border bg-card/90 hover:bg-card absolute top-6 right-6 h-12 w-12 rounded-2xl opacity-0 shadow-xl ring-1 backdrop-blur-md transition-all duration-300 group-hover:opacity-100 active:scale-95"
          aria-label="View full screen"
          size="icon"
        >
          <Expand className="h-5 w-5" />
        </Button>

        {images.length > 1 && (
          <div className="pointer-events-none absolute inset-x-6 bottom-6 flex justify-between opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <Button
              variant="secondary"
              size="icon"
              className="bg-card/80 hover:bg-card pointer-events-auto h-10 w-10 rounded-xl shadow-lg"
              onClick={() =>
                setSelectedImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
              }
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="bg-card/80 hover:bg-card pointer-events-auto h-10 w-10 rounded-xl shadow-lg"
              onClick={() =>
                setSelectedImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
              }
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      {/* Thumbnail Gallery */}
      {images.length > 1 && (
        <div className="scrollbar-hide flex gap-4 overflow-x-auto px-2 pb-4">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => setSelectedImageIndex(index)}
              className={`relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-2xl border-2 transition-all duration-300 ${
                selectedImageIndex === index
                  ? 'border-primary ring-primary/10 scale-105 ring-4'
                  : 'border-transparent opacity-60 hover:opacity-100'
              }`}
            >
              <Image
                src={img.image_url}
                alt={img.alt_text || `${productName} view ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}

      <ImageLightbox
        images={images}
        initialIndex={selectedImageIndex}
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
      />
    </div>
  );
}
