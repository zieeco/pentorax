/**
 * ProductImagesSection - Manage additional product images
 * Allows uploading, reordering, and deleting product images
 */
import { useState } from 'react';
import { Upload, X, ArrowUp, ArrowDown, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { ProductImage } from '@/types/product';

interface ProductImagesSectionProps {
  images: ProductImage[];
  onImagesChange: (images: ProductImage[]) => void;
  onImageUpload: (file: File) => Promise<string>;
  isUploading: boolean;
}

export function ProductImagesSection({
  images,
  onImagesChange,
  onImageUpload,
  isUploading,
}: ProductImagesSectionProps) {
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      try {
        setUploadingIndex(images.length + i);
        const imageUrl = await onImageUpload(file);
        
        // Add new image with next position
        const newImage: ProductImage = {
          image_url: imageUrl,
          alt_text: file.name.replace(/\.[^/.]+$/, ''), // Remove extension
          position: images.length + i,
        };
        
        onImagesChange([...images, newImage]);
      } catch (error) {
        console.error('Upload failed:', error);
      } finally {
        setUploadingIndex(null);
      }
    }
    
    // Reset input
    e.target.value = '';
  };

  const handleAltTextChange = (index: number, altText: string) => {
    const updated = [...images];
    updated[index] = { ...updated[index], alt_text: altText };
    onImagesChange(updated);
  };

  const handleDelete = (index: number) => {
    const updated = images.filter((_, i) => i !== index);
    // Reindex positions
    const reindexed = updated.map((img, i) => ({ ...img, position: i }));
    onImagesChange(reindexed);
  };

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const updated = [...images];
    [updated[index - 1], updated[index]] = [updated[index], updated[index - 1]];
    // Update positions
    updated[index - 1].position = index - 1;
    updated[index].position = index;
    onImagesChange(updated);
  };

  const handleMoveDown = (index: number) => {
    if (index === images.length - 1) return;
    const updated = [...images];
    [updated[index], updated[index + 1]] = [updated[index + 1], updated[index]];
    // Update positions
    updated[index].position = index;
    updated[index + 1].position = index + 1;
    onImagesChange(updated);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <ImageIcon className="h-5 w-5 text-primary" />
          Product Images
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Add additional product images (besides the featured image)
        </p>
      </div>

      {/* Upload Button */}
      <div>
        <Label htmlFor="product-images-upload" className="cursor-pointer">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary hover:bg-primary/5 transition-colors">
            <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-700">
              Click to upload images
            </p>
            <p className="text-xs text-gray-500 mt-1">
              PNG, JPG, WebP up to 10MB (multiple files supported)
            </p>
          </div>
        </Label>
        <Input
          id="product-images-upload"
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileSelect}
          disabled={isUploading}
          className="hidden"
        />
      </div>

      {/* Images List */}
      {images.length > 0 ? (
        <div className="space-y-3">
          {images.map((image, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
            >
              {/* Thumbnail */}
              <div className="w-16 h-16 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                <img
                  src={image.image_url}
                  alt={image.alt_text || 'Product image'}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Alt Text Input */}
              <div className="flex-1 min-w-0">
                <Label htmlFor={`alt-text-${index}`} className="text-xs text-gray-600">
                  Alt Text
                </Label>
                <Input
                  id={`alt-text-${index}`}
                  value={image.alt_text || ''}
                  onChange={(e) => handleAltTextChange(index, e.target.value)}
                  placeholder="Descriptive text for image"
                  className="mt-1"
                />
              </div>

              {/* Position Badge */}
              <div className="flex-shrink-0">
                <span className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded">
                  #{index + 1}
                </span>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1 flex-shrink-0">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => handleMoveUp(index)}
                  disabled={index === 0}
                  className="h-8 w-8 p-0"
                >
                  <ArrowUp className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => handleMoveDown(index)}
                  disabled={index === images.length - 1}
                  className="h-8 w-8 p-0"
                >
                  <ArrowDown className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(index)}
                  className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <ImageIcon className="h-12 w-12 text-gray-300 mx-auto mb-2" />
          <p className="text-sm">No additional images yet</p>
          <p className="text-xs text-gray-400 mt-1">
            Upload images to create a product gallery
</p>
        </div>
      )}

      {/* Uploading Indicator */}
      {uploadingIndex !== null && (
        <div className="text-sm text-gray-600 flex items-center gap-2">
          <div className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full" />
          Uploading image {uploadingIndex + 1}...
        </div>
      )}
    </div>
  );
}
