'use client';

/**
 * ProductVisualsSection - Image upload and preview
 * Ported from Vite to Next.js
 */
import { Image as ImageIcon, Loader2, Upload } from 'lucide-react';
import Image from 'next/image';
import type { UseFormRegister } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ProductVisualsSectionProps {
  register: UseFormRegister<any>;
  featuredImage: string;
  imagePreview: string;
  isUploading: boolean;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function ProductVisualsSection({
  register,
  featuredImage,
  imagePreview,
  isUploading,
  onImageUpload,
}: ProductVisualsSectionProps) {
  const displayImage = imagePreview || featuredImage;

  return (
    <Card className="overflow-hidden rounded-[2rem] border-gray-100 shadow-sm">
      <CardHeader className="border-b border-gray-100/50 bg-gray-50/50 p-6">
        <CardTitle className="flex items-center justify-between text-lg font-black text-gray-900">
          <span>Visuals</span>
          <ImageIcon className="h-5 w-5 text-gray-300" />
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6 p-6">
        <div className="space-y-1.5">
          <Label className="ml-1 text-[11px] font-bold tracking-widest text-gray-400 uppercase">
            Featured Image
          </Label>
          <div className="group relative flex aspect-square cursor-pointer items-center justify-center overflow-hidden rounded-[1.5rem] border border-gray-100 bg-gray-50 transition-all hover:bg-gray-100/50">
            {displayImage ? (
              <Image
                src={displayImage}
                fill
                className="object-cover transition-transform group-hover:scale-105"
                alt="Product Preview"
              />
            ) : (
              <div className="p-6 text-center">
                <ImageIcon className="mx-auto mb-2 h-10 w-10 text-gray-200" />
                <p className="text-[10px] font-bold text-gray-300 uppercase">Image Preview</p>
              </div>
            )}

            <div
              className={`absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/40 opacity-0 backdrop-blur-[2px] transition-opacity group-hover:opacity-100 ${isUploading ? 'opacity-100' : ''}`}
            >
              <Button variant="secondary" className="h-10 gap-2 rounded-xl font-bold" asChild>
                <label className="cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={onImageUpload}
                    disabled={isUploading}
                    className="hidden"
                  />
                  {isUploading ? (
                    <Loader2 className="text-primary h-4 w-4 animate-spin" />
                  ) : (
                    <Upload className="text-primary h-4 w-4" />
                  )}
                  <span>{isUploading ? 'Uploading...' : 'Change Image'}</span>
                </label>
              </Button>
            </div>
          </div>
          <p className="mt-2 text-center text-[10px] font-bold text-gray-400 uppercase">
            Max 5MB, JPG/PNG/WEBP
          </p>
        </div>

        <div className="space-y-1.5">
          <Label className="ml-1 text-[11px] font-bold tracking-widest text-gray-400 uppercase">
            Or Paste External URL
          </Label>
          <Input
            type="url"
            placeholder="https://images.unsplash.com/..."
            className="focus:border-primary rounded-xl border-gray-100 bg-gray-50/50 px-5 py-6 font-medium shadow-none focus:bg-white"
            {...register('featured_image')}
          />
        </div>
      </CardContent>
    </Card>
  );
}
