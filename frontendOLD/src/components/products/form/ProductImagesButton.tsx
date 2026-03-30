/**
 * ProductImagesButton - Compact button section to open images modal
 */
import { ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ProductImagesButtonProps {
  imageCount: number;
  onClick: () => void;
}

export function ProductImagesButton({ imageCount, onClick }: ProductImagesButtonProps) {
  return (
    <Card className="border-gray-100 shadow-sm">
      <CardHeader className="p-4">
        <CardTitle className="text-lg font-black text-gray-900 flex items-center justify-between">
          <span>Product Images</span>
          <ImageIcon className="h-5 w-5 text-gray-300" />
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-4 pt-0">
        <Button 
          type="button"
          variant="outline" 
          onClick={onClick}
          className="w-full"
        >
          <ImageIcon className="h-4 w-4 mr-2" />
          Manage Images
          {imageCount > 0 && (
            <span className="ml-auto bg-primary text-white text-xs px-2 py-0.5 rounded-full">
              {imageCount}
            </span>
          )}
        </Button>
        {imageCount === 0 && (
          <p className="text-xs text-gray-500 mt-2 text-center">
            No images added yet
          </p>
        )}
        {imageCount > 0 && (
          <p className="text-xs text-gray-500 mt-2 text-center">
            {imageCount} {imageCount === 1 ? 'image' : 'images'} in gallery
          </p>
        )}
      </CardContent>
    </Card>
  );
}
