/**
 * ProductSpecificationsButton - Compact button section to open specifications modal
 */
import { ListTree } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ProductSpecificationsButtonProps {
  specCount: number;
  onClick: () => void;
}

export function ProductSpecificationsButton({ specCount, onClick }: ProductSpecificationsButtonProps) {
  return (
    <Card className="border-gray-100 shadow-sm">
      <CardHeader className="p-4">
        <CardTitle className="text-lg font-black text-gray-900 flex items-center justify-between">
          <span>Specifications</span>
          <ListTree className="h-5 w-5 text-gray-300" />
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-4 pt-0">
        <Button 
          type="button"
          variant="outline" 
          onClick={onClick}
          className="w-full"
        >
          <ListTree className="h-4 w-4 mr-2" />
          Manage Specifications
          {specCount > 0 && (
            <span className="ml-auto bg-primary text-white text-xs px-2 py-0.5 rounded-full">
              {specCount}
            </span>
          )}
        </Button>
        {specCount === 0 && (
          <p className="text-xs text-gray-500 mt-2 text-center">
            No specifications added yet
          </p>
        )}
        {specCount > 0 && (
          <p className="text-xs text-gray-500 mt-2 text-center">
            {specCount} {specCount === 1 ? 'specification' : 'specifications'}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
