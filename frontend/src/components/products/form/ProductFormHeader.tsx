/**
 * ProductFormHeader - Form header with navigation and save button
 */
import { Button } from '@/components/ui/button';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';

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
          className="hover:bg-gray-200 rounded-md transition-colors"
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
        className="font-black px-8 py-6 rounded-xl shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin mr-2" />
            <span>Saving...</span>
          </>
        ) : (
          <>
            <Save className="h-5 w-5 mr-2" />
            <span>Save Product</span>
          </>
        )}
      </Button>
    </div>
  );
}
