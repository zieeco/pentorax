'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import {
  useCreateProduct,
  useDeleteProduct,
  useUpdateProduct,
  useUploadProductImage,
} from '@/hooks/products-hooks';
import { productsApi } from '@/services';
import type { ProductFormData, ProductImage, ProductSpecification } from '@/types/product';
import { generateSlug, validateImageFile } from '@/utils/product-utils';

export function useProductForm(slug?: string, initialData?: any) {
  const router = useRouter();
  const isEditMode = !!slug;

  // Mutations
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();
  const uploadImage = useUploadProductImage();

  // Component states
  const [imagePreview, setImagePreview] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);
  const [productImages, setProductImages] = useState<ProductImage[]>([]);
  const [specifications, setSpecifications] = useState<ProductSpecification[]>([]);

  const [isImagesModalOpen, setIsImagesModalOpen] = useState(false);
  const [isSpecsModalOpen, setIsSpecsModalOpen] = useState(false);

  const [aiSuggestions, setAiSuggestions] = useState<ProductSpecification[]>([]);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [showAiSuggestions, setShowAiSuggestions] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    reset,
    formState: { errors, isDirty },
  } = useForm<any>({
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

  useEffect(() => {
    if (initialData) {
      reset({
        ...initialData,
        price: initialData.price?.toString() || '',
        compare_at_price: initialData.compare_at_price?.toString() || '',
        stock_quantity: initialData.stock_quantity?.toString() || '0',
        low_stock_threshold: initialData.low_stock_threshold?.toString() || '5',
      });
      if (initialData.featured_image) setImagePreview(initialData.featured_image);
      if (initialData.images) setProductImages(initialData.images);
      if (initialData.specifications) setSpecifications(initialData.specifications);
    }
  }, [initialData, reset]);

  useEffect(() => {
    if (!isEditMode && watchName) {
      setValue('slug', generateSlug(watchName), { shouldDirty: true });
    }
  }, [watchName, isEditMode, setValue]);

  const generateAISpecs = async (imageUrl: string) => {
    try {
      setIsAiLoading(true);
      setShowAiSuggestions(false);
      const res = await productsApi.generateSpecifications({
        image_url: imageUrl,
        product_name: watchedValues.name || '',
      });
      if (res.data.specifications?.length > 0) {
        setAiSuggestions(res.data.specifications);
        setShowAiSuggestions(true);
      }
    } catch (err) {
      console.error('AI error:', err);
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const validation = validateImageFile(file);
    if (!validation.isValid) return toast.error(validation.error);

    try {
      setIsUploading(true);
      const res = await uploadImage.mutateAsync(file);
      setValue('featured_image', res.data.url, { shouldDirty: true });
      setImagePreview(res.data.url);
      toast.success('Image uploaded');
      await generateAISpecs(res.data.url);
    } catch (err) {
      toast.error('Upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  const onSubmit = async (data: any) => {
    try {
      const payload = {
        ...data,
        images: productImages,
        specifications: specifications,
      };
      if (isEditMode) {
        await updateProduct.mutateAsync({ slug: slug!, data: payload });
        toast.success('Product updated');
      } else {
        await createProduct.mutateAsync(payload);
        toast.success('Product created');
      }
      router.push('/dashboard/products');
    } catch (err) {
      toast.error('Failed to save');
    }
  };

  return {
    isEditMode,
    register,
    handleSubmit: handleSubmit(onSubmit),
    watch,
    setValue,
    control,
    errors,
    isDirty,
    imagePreview,
    isUploading,
    productImages,
    setProductImages,
    specifications,
    setSpecifications,
    isImagesModalOpen,
    setIsImagesModalOpen,
    isSpecsModalOpen,
    setIsSpecsModalOpen,
    aiSuggestions,
    isAiLoading,
    showAiSuggestions,
    setShowAiSuggestions,
    handleImageUpload,
    isSubmitting: createProduct.isPending || updateProduct.isPending,
    isDeleting: deleteProduct.isPending,
    handleDelete: async () => {
      if (!slug) return;
      await deleteProduct.mutateAsync(slug);
      toast.success('Deleted');
      router.push('/dashboard/products');
    },
    uploadImage,
    handleAcceptAISuggestions: (specs: any[]) => {
      setSpecifications(specs);
      setShowAiSuggestions(false);
      toast.success('AI suggestions accepted');
    },
    handleRejectAISuggestions: () => {
      setShowAiSuggestions(false);
      toast.info('AI suggestions rejected');
    },
  };
}
