/**
 * ProductFormPage - Create/Edit product form
 * Three-column layout: Inventory | Basic Information | Categorization & Visuals
 */
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Loader2 } from 'lucide-react';
import { ProductFormSkeleton } from '@/components/products/form/ProductFormSkeleton';
import { toast } from 'sonner';
import {
  useProduct,
  useCategories,
  useCreateProduct,
  useUpdateProduct,
  useDeleteProduct,
  useUploadProductImage,
} from '@/hooks';
import { ProductFormHeader } from '@/components/products/form/ProductFormHeader';
import { ProductInventorySection } from '@/components/products/form/ProductInventorySection';
import { ProductBasicInfoSection } from '@/components/products/form/ProductBasicInfoSection';
import { ProductPricingSection } from '@/components/products/form/ProductPricingSection';
import { ProductCategorizationSection } from '@/components/products/form/ProductCategorizationSection';
import { ProductVisualsSection } from '@/components/products/form/ProductVisualsSection';
import { ProductDeleteButton } from '@/components/products/form/ProductDeleteButton';
import type { ProductFormData } from '@/types/product';
import { generateSlug, validateImageFile } from '@/utils/product-utils';

export default function ProductFormPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const isEditMode = !!slug;

  // Fetch data
  const { data: product, isLoading: productLoading } = useProduct(slug || '', {
    enabled: isEditMode,
  });
  const { data: categories = [] } = useCategories();

  // Mutations
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();
  const uploadImage = useUploadProductImage();

  // Form state
  const [imagePreview, setImagePreview] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);

  // Form setup
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isDirty },
  } = useForm<ProductFormData>({
    defaultValues: {
      name: '',
      slug: '',
      description: '',
      short_description: '',
      price: '',
      compare_at_price: '',
      category_id: '',
      featured_image: '',
      is_active: true,
      is_featured: false,
      sku: '',
      stock_quantity: '0',
      low_stock_threshold: '5',
    },
  });

  const watchName = watch('name');
  const watchedValues = watch();

  // Populate form when product data is loaded (edit mode)
  useEffect(() => {
    if (isEditMode && product) {
      reset({
        name: product.name || '',
        slug: product.slug || '',
        description: product.description || '',
        short_description: product.short_description || '',
        price: product.price ? product.price.toString() : '',
        compare_at_price: product.compare_at_price ? product.compare_at_price.toString() : '',
        category_id: product.category_id || '',
        featured_image: product.featured_image || '',
        is_active: product.is_active ?? true,
        is_featured: product.is_featured ?? false,
        sku: product.sku || '',
        stock_quantity: product.stock_quantity?.toString() || '0',
        low_stock_threshold: product.low_stock_threshold?.toString() || '5',
      });
      
      if (product.featured_image) {
        setImagePreview(product.featured_image);
      }
    }
  }, [product, isEditMode, reset]);

  // Auto-generate slug when name changes (only in create mode)
  useEffect(() => {
    if (!isEditMode && watchName) {
      setValue('slug', generateSlug(watchName), { shouldDirty: true });
    }
  }, [watchName, isEditMode, setValue]);

  // Form submission handler
  const onSubmit = async (data: ProductFormData) => {
    try {
      const payload = {
        name: data.name,
        description: data.description,
        short_description: data.short_description,
        price: data.price,
        compare_at_price: data.compare_at_price || undefined,
        category_id: data.category_id,
        featured_image: data.featured_image || undefined,
        is_active: data.is_active,
        is_featured: data.is_featured,
        sku: data.sku || undefined,
        stock_quantity: data.stock_quantity ? parseInt(data.stock_quantity) : undefined,
        low_stock_threshold: data.low_stock_threshold ? parseInt(data.low_stock_threshold) : undefined,
      };

      if (isEditMode && slug) {
        await updateProduct.mutateAsync({ slug, data: payload });
        toast.success('Product updated successfully');
      } else {
        await createProduct.mutateAsync({
          ...payload,
          slug: data.slug,
        });
        toast.success('Product created successfully');
      }
      
      navigate('/dashboard/products');
    } catch (error: any) {
      toast.error(error?.response?.data?.detail || 'Failed to save product');
    }
  };

  // Delete handler
  const handleDelete = async () => {
    if (!slug) return;
    
    try {
      await deleteProduct.mutateAsync(slug);
      toast.success('Product deleted successfully');
      navigate('/dashboard/products');
    } catch (error) {
      toast.error('Failed to delete product');
    }
  };

  // Image upload handler
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate image
    const validation = validateImageFile(file);
    if (!validation.isValid) {
      toast.error(validation.error);
      return;
    }

    try {
      setIsUploading(true);
      const response = await uploadImage.mutateAsync(file);
      const imageUrl = response.data.url;
      
      setValue('featured_image', imageUrl, { shouldDirty: true });
      setImagePreview(imageUrl);
      toast.success('Image uploaded successfully');
    } catch (error: any) {
      toast.error(error?.response?.data?.error || 'Failed to upload image');
    } finally {
      setIsUploading(false);
    }
  };

  const isSubmitting = createProduct.isPending || updateProduct.isPending;
  const isDeleting = deleteProduct.isPending;

  // Loading state
  if (isEditMode && productLoading) {
    return <ProductFormSkeleton />;
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in slide-in-from-bottom-6 duration-500">
      {/* Header */}
      <ProductFormHeader
        isEditMode={isEditMode}
        isSubmitting={isSubmitting}
        isDirty={isDirty}
        onBack={() => navigate('/dashboard/products')}
        onSave={handleSubmit(onSubmit)}
      />

      {/* Form - Three Column Grid Layout */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid xl:grid-cols-[380px_1fr_380px] lg:grid-cols-[320px_1fr_320px] md:grid-cols-1 gap-4"
      >
        {/* LEFT COLUMN - Inventory */}
        <div className="space-y-6">
          <ProductInventorySection
            register={register}
            errors={errors}
          />

          {/* Delete Button */}
          {isEditMode && (
            <ProductDeleteButton
              productName={product?.name || ''}
              isDeleting={isDeleting}
              onDelete={handleDelete}
            />
          )}
        </div>

        {/* MIDDLE COLUMN - Basic Information & Pricing */}
        <div className="space-y-6">
          <ProductBasicInfoSection
            register={register}
            errors={errors}
            isEditMode={isEditMode}
          />

          <ProductPricingSection
            register={register}
            setValue={setValue}
            errors={errors}
            categories={categories}
            categoryId={watchedValues.category_id}
          />
        </div>

        {/* RIGHT COLUMN - Categorization & Visuals */}
        <div className="space-y-6">
          <ProductCategorizationSection
            setValue={setValue}
            isActive={watchedValues.is_active}
            isFeatured={watchedValues.is_featured}
          />

          <ProductVisualsSection
            register={register}
            featuredImage={watchedValues.featured_image}
            imagePreview={imagePreview}
            isUploading={isUploading}
            onImageUpload={handleImageUpload}
          />
        </div>
      </form>
    </div>
  );
}
