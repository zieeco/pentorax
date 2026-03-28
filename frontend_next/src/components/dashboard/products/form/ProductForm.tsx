'use client';

/**
 * ProductFormView - Main layout assembly for Product Form
 * Satisfies the 150-line rule by delegating logic to useProductForm hook.
 */
import { useProductForm } from '@/hooks/use-product-form';
import { AISuggestionsAlert } from './AISuggestionsAlert';
import { ProductBasicInfoSection } from './ProductBasicInfoSection';
import { ProductCategorizationSection } from './ProductCategorizationSection';
import { ProductDeleteButton } from './ProductDeleteButton';
import { ProductFormHeader } from './ProductFormHeader';
import { ProductImagesButton } from './ProductImagesButton';
import { ProductImagesModal } from './ProductImagesModal';
import { ProductInventorySection } from './ProductInventorySection';
import { ProductPricingSection } from './ProductPricingSection';
import { ProductSpecificationsButton } from './ProductSpecificationsButton';
import { ProductSpecificationsModal } from './ProductSpecificationsModal';
import { ProductVisualsSection } from './ProductVisualsSection';

interface ProductFormProps {
  slug?: string;
  initialData?: any;
  categories: any[];
}

export function ProductForm({ slug, initialData, categories }: ProductFormProps) {
  const form = useProductForm(slug, initialData);

  return (
    <div className="animate-in slide-in-from-bottom-6 mx-auto max-w-6xl space-y-8 pb-20 duration-500">
      <ProductFormHeader
        isEditMode={form.isEditMode}
        isSubmitting={form.isSubmitting}
        isDirty={form.isDirty}
        onBack={() => window.history.back()}
        onSave={form.handleSubmit}
      />

      <form
        onSubmit={form.handleSubmit}
        className="grid gap-6 md:grid-cols-1 lg:grid-cols-[320px_1fr_320px] xl:grid-cols-[380px_1fr_380px]"
      >
        {/* LEFT COLUMN */}
        <div className="space-y-6">
          <ProductInventorySection register={form.register} errors={form.errors} />
          <ProductImagesButton
            imageCount={form.productImages.length}
            onClick={() => form.setIsImagesModalOpen(true)}
          />
          {(form.showAiSuggestions || form.isAiLoading) && (
            <AISuggestionsAlert
              specifications={form.aiSuggestions}
              isLoading={form.isAiLoading}
              onAccept={form.handleAcceptAISuggestions}
              onReject={form.handleRejectAISuggestions}
            />
          )}
          <ProductSpecificationsButton
            specCount={form.specifications.length}
            onClick={() => form.setIsSpecsModalOpen(true)}
          />
          {form.isEditMode && (
            <ProductDeleteButton
              productName={initialData?.name || ''}
              isDeleting={form.isDeleting}
              onDelete={form.handleDelete}
            />
          )}
        </div>

        {/* MIDDLE COLUMN */}
        <div className="space-y-6">
          <ProductBasicInfoSection
            register={form.register}
            setValue={form.setValue}
            watch={form.watch}
            errors={form.errors}
            isEditMode={form.isEditMode}
          />
          <ProductPricingSection
            register={form.register}
            control={form.control}
            errors={form.errors}
            categories={categories}
          />
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-6">
          <ProductCategorizationSection
            setValue={form.setValue}
            isActive={form.watch('is_active')}
            isFeatured={form.watch('is_featured')}
          />
          <ProductVisualsSection
            register={form.register}
            featuredImage={form.watch('featured_image')}
            imagePreview={form.imagePreview}
            isUploading={form.isUploading}
            onImageUpload={form.handleImageUpload}
          />
        </div>
      </form>

      <ProductImagesModal
        isOpen={form.isImagesModalOpen}
        onClose={() => form.setIsImagesModalOpen(false)}
        images={form.productImages}
        onImagesChange={form.setProductImages}
        onImageUpload={async (file) => (await form.uploadImage.mutateAsync(file)).data.url}
        isUploading={form.uploadImage.isPending}
      />
      <ProductSpecificationsModal
        isOpen={form.isSpecsModalOpen}
        onClose={() => form.setIsSpecsModalOpen(false)}
        specifications={form.specifications}
        onSpecificationsChange={form.setSpecifications}
      />
    </div>
  );
}
