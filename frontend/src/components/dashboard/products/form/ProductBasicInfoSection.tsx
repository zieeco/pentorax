'use client';

/**
 * ProductBasicInfoSection - Basic product information fields
 * Ported from Vite to Next.js
 */
import { Loader2, Package, Sparkles } from 'lucide-react';
import { useState } from 'react';
import type { FieldErrors, UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { productsApi } from '@/services';

interface ProductBasicInfoSectionProps {
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
  watch: UseFormWatch<any>;
  errors: FieldErrors<any>;
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
      toast.error(error?.response?.data?.error || 'Failed to refine description');
    } finally {
      setIsRefining(false);
    }
  };

  return (
    <Card className="border-border bg-card overflow-hidden rounded-[2rem] shadow-sm">
      <CardHeader className="border-border/50 bg-muted/20 border-b p-6">
        <CardTitle className="text-foreground flex items-center space-x-2 text-lg font-black">
          <Package className="text-primary h-5 w-5" />
          <span>Basic Information</span>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6 p-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-1.5">
            <Label className="text-muted-foreground ml-1 text-[11px] font-bold tracking-widest uppercase">
              Product Name
            </Label>
            <Input
              placeholder="e.g., PX-550 Mono Panel"
              className="focus:border-primary border-border bg-muted/20 focus:bg-card rounded-xl px-5 py-6 font-medium shadow-none"
              {...register('name', { required: 'Name is required' })}
            />
            {errors.name && (
              <p className="text-destructive mt-1 text-sm">{errors.name.message as string}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label className="text-muted-foreground ml-1 text-[11px] font-bold tracking-widest uppercase">
              Slug
            </Label>
            <Input
              placeholder="auto-generated-slug"
              disabled={isEditMode}
              className="focus:border-primary border-border bg-muted/20 focus:bg-card rounded-xl px-5 py-6 font-medium shadow-none disabled:opacity-50"
              {...register('slug')}
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label className="text-muted-foreground ml-1 text-[11px] font-bold tracking-widest uppercase">
            Short Summary
          </Label>
          <Input
            placeholder="Brief summary for catalog cards"
            className="focus:border-primary border-border bg-muted/20 focus:bg-card rounded-xl px-5 py-6 font-medium shadow-none"
            {...register('short_description')}
          />
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label className="text-muted-foreground ml-1 text-[11px] font-bold tracking-widest uppercase">
              Full Description
            </Label>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleAIRefine}
              disabled={isRefining}
              className="text-primary flex h-auto items-center space-x-1 p-0 text-[10px] font-black uppercase hover:bg-transparent hover:underline disabled:opacity-50"
            >
              {isRefining ? (
                <Loader2 className="h-3 w-3 animate-spin" />
              ) : (
                <Sparkles className="h-3 w-3" />
              )}
              <span>{isRefining ? 'Refining...' : 'AI Refine'}</span>
            </Button>
          </div>
          <Textarea
            rows={5}
            placeholder="Enter detailed technical specifications and benefits..."
            className="focus:border-primary border-border bg-muted/20 focus:bg-card resize-none rounded-xl px-5 py-4 font-medium shadow-none"
            {...register('description', { required: 'Description is required' })}
          />
          {errors.description && (
            <p className="text-destructive mt-1 text-sm">{errors.description.message as string}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
