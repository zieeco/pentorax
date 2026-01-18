/**
 * ProductBasicInfoSection - Basic product information fields
 */
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Package, Sparkles, Loader2 } from 'lucide-react';
import type { UseFormRegister, UseFormSetValue, UseFormWatch, FieldErrors } from 'react-hook-form';
import type { ProductFormData } from '@/types/product';  
import { productsApi } from '@/services';
import { toast } from 'sonner';
import { useState } from 'react';

interface ProductBasicInfoSectionProps {
  register: UseFormRegister<ProductFormData>;
  setValue: UseFormSetValue<ProductFormData>;
  watch: UseFormWatch<ProductFormData>;
  errors: FieldErrors<ProductFormData>;
  isEditMode: boolean;
}

export function ProductBasicInfoSection({
  register,
  setValue,
  watch,
  errors,
  isEditMode,
}: ProductBasicInfoSectionProps) {
  const [isRefining, setIsRefining] = useState(false);
  
  const handleAIRefine = async () => {
    const description = watch('description');
    const productName = watch('name');
    
    if (!description) {
      toast.error('Please enter a description first');
      return;
    }
    
    setIsRefining(true);
    try {
      const response = await productsApi.refineDescription({
        description,
        product_name: productName || '',
      });
      
      setValue('description', response.data.refined_description, { shouldDirty: true });
      toast.success('Description refined by AI!');
    } catch (error: any) {
      console.error('AI refinement failed:', error);
      toast.error(error?.response?.data?.error || 'Failed to refine description');
    } finally {
      setIsRefining(false);
    }
  };
  return (
    <Card className="border-gray-100 shadow-sm">
      <CardHeader className="p-4">
        <CardTitle className="text-lg font-black text-gray-900 flex items-center space-x-2">
          <Package className="h-5 w-5 text-primary" />
          <span>Basic Information</span>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-4 pt-0 space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <Label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">
              Product Name
            </Label>
            <Input
              placeholder="e.g., PX-550 Mono Panel"
              className="px-5 py-4 bg-gray-50 border-transparent focus:bg-white focus:border-primary shadow-sm"
              {...register('name', { required: 'Name is required' })}
            />
            {errors.name && (
              <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
            )}
          </div>
          
          <div className="space-y-1.5">
            <Label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">
              Slug
            </Label>
            <Input
              placeholder="auto-generated-slug"
              disabled={isEditMode}
              className="px-5 py-4 bg-gray-50 border-transparent focus:bg-white focus:border-primary shadow-sm disabled:opacity-50"
              {...register('slug')}
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">
            Short Summary
          </Label>
          <Input
            placeholder="Brief summary for catalog cards"
            className="px-5 py-4 bg-gray-50 border-transparent focus:bg-white focus:border-primary shadow-sm"
            {...register('short_description')}
          />
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">
              Full Description
            </Label>
            <button
              type="button"
              onClick={handleAIRefine}
              disabled={isRefining}
              className="text-[10px] font-black uppercase text-primary flex items-center space-x-1 hover:underline disabled:opacity-50"
            >
              {isRefining ? (
                <Loader2 className="h-3 w-3 animate-spin" />
              ) : (
                <Sparkles className="h-3 w-3" />
              )}
              <span>{isRefining ? 'Refining...' : 'AI Refine'}</span>
            </button>
          </div>
          <Textarea
            rows={5}
            placeholder="Enter detailed technical specifications and benefits..."
            className="px-5 py-4 bg-gray-50 border-transparent focus:bg-white focus:border-primary shadow-sm resize-none"
            {...register('description', { required: 'Description is required' })}
          />
          {errors.description && (
            <p className="text-sm text-red-500 mt-1">{errors.description.message}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
