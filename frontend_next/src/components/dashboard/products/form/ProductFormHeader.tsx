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
          className="rounded-md transition-colors hover:bg-gray-200"
        >
          <ArrowLeft className="h-6 w-6 text-gray-600" />
        </Button>
        <div>
          <h1 className="text-2xl font-black text-gray-900">
            {isEditMode ? 'Edit Product' : 'New Product'}
          </h1>
          <p className="text-sm font-medium text-gray-500">
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
