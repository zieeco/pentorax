/**
 * ProductVisualsSection - Image upload and preview
 */
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Image as ImageIcon, Loader2 } from 'lucide-react';
import type { UseFormRegister } from 'react-hook-form';
import type { ProductFormData } from '@/types/product';

interface ProductVisualsSectionProps {
  register: UseFormRegister<ProductFormData>;
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
    <Card className="border-gray-100 shadow-sm">
      <CardHeader className="p-4">
        <CardTitle className="text-lg font-black text-gray-900 flex items-center justify-between">
          <span>Visuals</span>
          <ImageIcon className="h-5 w-5 text-gray-300" />
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-4 pt-0 space-y-6">
        <div className="space-y-1.5">
          <Label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">
            Upload Image
          </Label>
          <div className="relative">
            <label className="block w-full cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={onImageUpload}
                disabled={isUploading}
                className="hidden"
              />
              <div className="rounded-md p-2 bg-primary text-white shadow-sm hover:bg-primary/90 transition-all text-center font-semibold">
                {isUploading ? (
                  <span className="flex items-center justify-center">
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Uploading...
                  </span>
                ) : (
                  'Browse'
                )}
              </div>
            </label>
          </div>
          <p className="text-xs text-gray-400 ml-1">Max 5MB, JPG/PNG/WEBP</p>
        </div>

        <div className="space-y-1.5">
          <Label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">
            Or Paste Image URL
          </Label>
          <Input
            type="url"
            placeholder="https://..."
            className="px-5 py-4 bg-gray-50 border-transparent focus:bg-white focus:border-primary shadow-sm"
            {...register('featured_image')}
          />
        </div>

        <div className="aspect-square bg-gray-50 rounded-md overflow-hidden border border-gray-100 flex items-center justify-center relative group">
          {displayImage ? (
            <img
              src={displayImage}
              className="w-full h-full object-cover transition-transform group-hover:scale-105"
              alt="Preview"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          ) : (
            <div className="text-center p-6">
              <ImageIcon className="h-10 w-10 text-gray-200 mx-auto mb-2" />
              <p className="text-[10px] font-bold text-gray-300 uppercase">
                Image Preview
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
