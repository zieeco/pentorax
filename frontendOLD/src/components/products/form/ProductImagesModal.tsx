/**
 * ProductImagesModal - Modal dialog for managing product images
 */
import { useState } from 'react';
import { X, Upload, ArrowUp, ArrowDown, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import type { ProductImage } from '@/types/product';

interface ProductImagesModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: ProductImage[];
  onImagesChange: (images: ProductImage[]) => void;
  onImageUpload: (file: File) => Promise<string>;
  isUploading: boolean;
}

export function ProductImagesModal({
  isOpen,
  onClose,
  images,
  onImagesChange,
  onImageUpload,
  isUploading,
}: ProductImagesModalProps) {
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      try {
        setUploadingIndex(images.length + i);
        const imageUrl = await onImageUpload(file);
        
        const newImage: ProductImage = {
          image_url: imageUrl,
          alt_text: file.name.replace(/\.[^/.]+$/, ''),
          position: images.length + i,
        };
        
        onImagesChange([...images, newImage]);
      } catch (error) {
        console.error('Upload failed:', error);
      } finally {
        setUploadingIndex(null);
      }
    }
    
    e.target.value = '';
  };

  const handleAltTextChange = (index: number, altText: string) => {
    const updated = [...images];
    updated[index] = { ...updated[index], alt_text: altText };
    onImagesChange(updated);
  };

  const handleDelete = (index: number) => {
    const updated = images.filter((_, i) => i !== index);
    const reindexed = updated.map((img, i) => ({ ...img, position: i }));
    onImagesChange(reindexed);
  };

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const updated = [...images];
    [updated[index - 1], updated[index]] = [updated[index], updated[index - 1]];
    updated[index - 1].position = index - 1;
    updated[index].position = index;
    onImagesChange(updated);
  };

  const handleMoveDown = (index: number) => {
    if (index === images.length - 1) return;
    const updated = [...images];
    [updated[index], updated[index + 1]] = [updated[index + 1], updated[index]];
    updated[index].position = index;
    updated[index + 1].position = index + 1;
    onImagesChange(updated);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ImageIcon className="h-5 w-5 text-primary" />
            Manage Product Images
          </DialogTitle>
          <DialogDescription>
            Upload and manage additional product images for the gallery
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Upload Section */}
          <div>
            <Label htmlFor="modal-images-upload" className="cursor-pointer">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary hover:bg-primary/5 transition-colors">
                <Upload className="h-10 w-10 text-gray-400 mx-auto mb-3" />
                <p className="text-sm font-medium text-gray-700">
                  Click to upload images
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  PNG, JPG, WebP up to 10MB (multiple files supported)
                </p>
              </div>
            </Label>
            <Input
              id="modal-images-upload"
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileSelect}
              disabled={isUploading}
              className="hidden"
            />
          </div>

          {/* Images Grid */}
          {images.length > 0 ? (
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-gray-700">
                Images ({images.length})
              </h4>
              <div className="space-y-2">
                {images.map((image, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors bg-white"
                  >
                    {/* Thumbnail */}
                    <div className="w-20 h-20 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                      <img
                        src={image.image_url}
                        alt={image.alt_text || 'Product image'}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Alt Text Input */}
                    <div className="flex-1 min-w-0">
                      <Label htmlFor={`modal-alt-${index}`} className="text-xs text-gray-600">
                        Alt Text
                      </Label>
                      <Input
                        id={`modal-alt-${index}`}
                        value={image.alt_text || ''}
                        onChange={(e) => handleAltTextChange(index, e.target.value)}
                        placeholder="Descriptive text for image"
                        className="mt-1"
                      />
                    </div>

                    {/* Position Badge */}
                    <div className="flex-shrink-0">
                      <span className="inline-block px-2.5 py-1 text-xs font-semibold bg-primary/10 text-primary rounded">
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
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-lg">
              <ImageIcon className="h-16 w-16 text-gray-300 mx-auto mb-3" />
              <p className="text-sm font-medium">No images yet</p>
              <p className="text-xs text-gray-400 mt-1">
                Upload images to create a product gallery
              </p>
            </div>
          )}

          {/* Uploading Indicator */}
          {uploadingIndex !== null && (
            <div className="text-sm text-gray-600 flex items-center justify-center gap-2 py-2 bg-blue-50 rounded-md">
              <div className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full" />
              Uploading image {uploadingIndex + 1}...
            </div>
          )}
        </div>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button type="button" variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
