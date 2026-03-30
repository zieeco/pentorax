'use client';

/**
 * ProductFormHeader - Form header with navigation and save button
 * Ported from Vite to Next.js
 */
import { ArrowLeft, Loader2, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ProductFormHeaderProps {
  isEditMode: boolean;
  isSubmitting: boolean;
  isDirty: boolean;
  onBack: () => void;
  onSave: () => void;
}

export function ProductFormHeader({
  isEditMode,
  isSubmitting,
  isDirty,
  onBack,
  onSave,
}: ProductFormHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="hover:bg-muted rounded-md transition-colors"
        >
          <ArrowLeft className="text-muted-foreground h-6 w-6" />
        </Button>
        <div>
          <h1 className="text-foreground text-2xl font-black">
            {isEditMode ? 'Edit Product' : 'New Product'}
          </h1>
          <p className="text-muted-foreground text-sm font-medium">
            {isEditMode ? 'Update product details' : 'Create a new product for your catalog'}
          </p>
        </div>
      </div>

      <Button
        type="button"
        onClick={onSave}
        disabled={isSubmitting || !isDirty}
        className="shadow-primary/20 h-auto rounded-xl px-8 py-6 font-black shadow-xl transition-all hover:scale-105 active:scale-95"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            <span>Saving...</span>
          </>
        ) : (
          <>
            <Save className="mr-2 h-5 w-5" />
            <span>Save Product</span>
          </>
        )}
      </Button>
    </div>
  );
}
