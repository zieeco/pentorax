/**
 * ProductImageGallery component - Enhanced image gallery with zoom and lightbox
 * @module components/shop
 */
import { useState } from 'react';
import { Expand } from 'lucide-react';
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

  const openLightbox = () => {
    setIsLightboxOpen(true);
  };

  return (
    <>
      <div className="space-y-4">
        {/* Main Image with Zoom */}
        <div className="relative aspect-square rounded-lg overflow-hidden bg-muted border group">
          <img
            src={currentImage?.image_url || '/placeholder-product.png'}
            alt={currentImage?.alt_text || productName}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 cursor-zoom-in"
            onClick={openLightbox}
          />
          
          {/* Expand Icon */}
          <button
            onClick={openLightbox}
            className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
            aria-label="View full screen"
          >
            <Expand className="h-5 w-5" />
          </button>
        </div>

        {/* Thumbnail Gallery */}
        {images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-2">
            {images.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImageIndex(index)}
                className={`w-20 h-20 rounded-md overflow-hidden flex-shrink-0 border-2 transition-all ${
                  selectedImageIndex === index
                    ? 'border-primary ring-2 ring-primary/20'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <img
                  src={img.image_url}
                  alt={img.alt_text || `${productName} view ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      <ImageLightbox
        images={images}
        initialIndex={selectedImageIndex}
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
      />
    </>
  );
}
