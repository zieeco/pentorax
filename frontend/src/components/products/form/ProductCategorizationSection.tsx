/**
 * ProductCategorizationSection - Product status and visibility toggles
 */
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { UseFormSetValue } from 'react-hook-form';
import type { ProductFormData } from '@/types/product';

interface ProductCategorizationSectionProps {
  isActive: boolean;
  isFeatured: boolean;
  setValue: UseFormSetValue<ProductFormData>;
}

// Custom Switch component
function CustomSwitch({
  checked,
  onCheckedChange,
  id,
}: {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  id?: string;
}) {
  return (
    <button
      type="button"
      id={id}
      onClick={() => onCheckedChange(!checked)}
      className={`w-11 h-6 rounded-full transition-all relative flex-shrink-0 ${
        checked ? 'bg-primary' : 'bg-gray-200'
      }`}
    >
      <div
        className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all shadow-sm ${
          checked ? 'left-6' : 'left-1'
        }`}
      />
    </button>
  );
}

export function ProductCategorizationSection({
  isActive,
  isFeatured,
  setValue,
}: ProductCategorizationSectionProps) {
  return (
    <Card className="border-gray-100 shadow-sm">
      <CardHeader className="p-4">
        <CardTitle className="text-lg font-black text-gray-900">
          Categorization
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-4 pt-0 space-y-6">
        <div className="space-y-4 pt-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-bold text-gray-900">Active Status</p>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                Visible to customers
              </p>
            </div>
            <CustomSwitch
              id="is_active"
              checked={isActive}
              onCheckedChange={(checked) =>
                setValue('is_active', checked, { shouldDirty: true })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-bold text-gray-900">Featured</p>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                Top of catalog
              </p>
            </div>
            <CustomSwitch
              id="is_featured"
              checked={isFeatured}
              onCheckedChange={(checked) =>
                setValue('is_featured', checked, { shouldDirty: true })
              }
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
