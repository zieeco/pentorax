'use client';

/**
 * ProductImagesModal - Modal dialog for managing product images
 * Ported from Vite to Next.js
 */
import { ArrowDown, ArrowUp, Image as ImageIcon, Loader2, Trash2, Upload, X } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ProductImagesModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: any[];
  onImagesChange: (images: any[]) => void;
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
        const newImage = {
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

  const handleAltTextChange = (idx: number, text: string) => {
    const updated = [...images];
    updated[idx] = { ...updated[idx], alt_text: text };
    onImagesChange(updated);
  };

  const handleDelete = (idx: number) => {
    const updated = images.filter((_, i) => i !== idx).map((img, i) => ({ ...img, position: i }));
    onImagesChange(updated);
  };

  const handleMove = (idx: number, dir: 'up' | 'down') => {
    if ((dir === 'up' && idx === 0) || (dir === 'down' && idx === images.length - 1)) return;
    const targetIdx = dir === 'up' ? idx - 1 : idx + 1;
    const updated = [...images];
    [updated[idx], updated[targetIdx]] = [updated[targetIdx], updated[idx]];
    updated[idx].position = idx;
    updated[targetIdx].position = targetIdx;
    onImagesChange(updated);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] max-w-4xl gap-0 overflow-y-auto rounded-[2.5rem] border-gray-100 p-0 shadow-2xl">
        <DialogHeader className="border-b border-gray-100 bg-gray-50/30 p-8">
          <DialogTitle className="flex items-center gap-3 text-2xl font-black text-gray-900">
            <ImageIcon className="text-primary h-8 w-8" />
            Media Gallery
          </DialogTitle>
          <DialogDescription className="font-medium text-gray-500">
            Add and arrange product showcases
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-8 p-8">
          <div>
            <label className="group block w-full cursor-pointer">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileSelect}
                disabled={isUploading}
                className="hidden"
              />
              <div className="group-hover:border-primary group-hover:bg-primary/5 rounded-[2rem] border-2 border-dashed border-gray-200 p-12 text-center transition-all duration-300">
                <div className="bg-primary/10 mx-auto mb-4 w-fit rounded-2xl p-4 transition-transform group-hover:scale-110">
                  <Upload className="text-primary h-8 w-8" />
                </div>
                <p className="text-sm font-black tracking-wider text-gray-900 uppercase">
                  Drag & Drop or Click
                </p>
                <p className="mt-2 text-[10px] font-bold tracking-widest text-gray-400 uppercase">
                  Multi-select supported • PNG, JPG, WebP
                </p>
              </div>
            </label>
          </div>

          <div className="space-y-4">
            <h4 className="px-1 text-[10px] font-black tracking-[0.2em] text-gray-400 uppercase">
              Managed Assets ({images.length})
            </h4>
            <div className="grid gap-3">
              {images.map((img, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 rounded-[1.5rem] border border-gray-100 bg-white p-4 transition-all duration-300 hover:shadow-lg hover:shadow-gray-200/50"
                >
                  <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl border border-gray-50">
                    <Image src={img.image_url} alt={img.alt_text} fill className="object-cover" />
                  </div>
                  <div className="min-w-0 flex-1 space-y-2">
                    <Label className="ml-1 text-[10px] font-black tracking-wider text-gray-400 uppercase">
                      SEO Alt Text
                    </Label>
                    <Input
                      value={img.alt_text}
                      onChange={(e) => handleAltTextChange(i, e.target.value)}
                      className="h-10 rounded-xl border-gray-100 bg-gray-50/30 font-bold focus:bg-white"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleMove(i, 'up')}
                      disabled={i === 0}
                      className="h-8 w-8 rounded-lg hover:bg-gray-100"
                    >
                      <ArrowUp className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleMove(i, 'down')}
                      disabled={i === images.length - 1}
                      className="h-8 w-8 rounded-lg hover:bg-gray-100"
                    >
                      <ArrowDown className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(i)}
                    className="hover:bg-destructive/10 hover:text-destructive h-10 w-10 rounded-xl text-gray-300 transition-colors"
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {uploadingIndex !== null && (
            <div className="bg-primary/90 animate-in slide-in-from-bottom-4 sticky right-0 bottom-4 left-0 flex items-center justify-between rounded-2xl px-6 py-4 text-white shadow-2xl backdrop-blur-md">
              <span className="text-sm font-black tracking-wider uppercase">
                Processing Asset {uploadingIndex + 1}...
              </span>
              <Loader2 className="h-5 w-5 animate-spin" />
            </div>
          )}
        </div>

        <div className="flex justify-end border-t border-gray-100 bg-gray-50/50 p-6">
          <Button onClick={onClose} className="rounded-xl px-8 font-bold">
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
