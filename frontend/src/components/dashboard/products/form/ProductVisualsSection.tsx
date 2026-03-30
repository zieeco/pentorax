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
    <Card className="border-border bg-card overflow-hidden rounded-[2rem] shadow-sm">
      <CardHeader className="border-border/50 bg-muted/20 border-b p-6">
        <CardTitle className="text-foreground flex items-center justify-between text-lg font-black">
          <span>Visuals</span>
          <ImageIcon className="text-muted-foreground/50 h-5 w-5" />
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6 p-6">
        <div className="space-y-1.5">
          <Label className="text-muted-foreground ml-1 text-[11px] font-bold tracking-widest uppercase">
            Featured Image
          </Label>
          <div className="group border-border bg-muted/20 hover:bg-muted/30 relative flex aspect-square cursor-pointer items-center justify-center overflow-hidden rounded-[1.5rem] border transition-all">
            {displayImage ? (
              <Image
                src={displayImage}
                fill
                className="object-cover transition-transform group-hover:scale-105"
                alt="Product Preview"
              />
            ) : (
              <div className="p-6 text-center">
                <ImageIcon className="text-muted-foreground/30 mx-auto mb-2 h-10 w-10" />
                <p className="text-muted-foreground/50 text-[10px] font-bold uppercase">
                  Image Preview
                </p>
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
          <p className="text-muted-foreground mt-2 text-center text-[10px] font-bold uppercase">
            Max 5MB, JPG/PNG/WEBP
          </p>
        </div>

        <div className="space-y-1.5">
          <Label className="text-muted-foreground ml-1 text-[11px] font-bold tracking-widest uppercase">
            Or Paste External URL
          </Label>
          <Input
            type="url"
            placeholder="https://images.unsplash.com/..."
            className="focus:border-primary border-border bg-muted/20 focus:bg-card rounded-xl px-5 py-6 font-medium shadow-none"
            {...register('featured_image')}
          />
        </div>
      </CardContent>
    </Card>
  );
}
