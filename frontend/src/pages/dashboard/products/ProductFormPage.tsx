/**
 * ProductFormPage - Create/Edit product form
 * Fixed layout and Switch component
 */
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { 
  useProduct, 
  useCategories, 
  useCreateProduct, 
  useUpdateProduct,
  useDeleteProduct,
  useUploadProductImage
} from '@/hooks/useApi';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { 
  ArrowLeft, 
  Save, 
  Trash2, 
  Loader2,
  Package,
  Zap,
  Image as ImageIcon,
  Sparkles
} from 'lucide-react';
import { toast } from 'sonner';

interface ProductFormData {
  name: string;
  slug: string;
  description: string;
  short_description: string;
  price: string;
  compare_at_price: string;
  category_id: string;
  featured_image: string;
  is_active: boolean;
  is_featured: boolean;
  sku: string;
  stock_quantity: string;
  low_stock_threshold: string;
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

// Custom Switch component to avoid Radix UI layout issues
const CustomSwitch: React.FC<{ 
  checked: boolean; 
  onCheckedChange: (checked: boolean) => void;
  id?: string;
}> = ({ checked, onCheckedChange, id }) => (
  <button
    type="button"
    id={id}
    onClick={() => onCheckedChange(!checked)}
    className={`w-11 h-6 rounded-full transition-all relative flex-shrink-0 ${checked ? 'bg-primary' : 'bg-gray-200'}`}
  >
    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all shadow-sm ${checked ? 'left-6' : 'left-1'}`}></div>
  </button>
);

// Helper to generate slug from name
const generateSlug = (name: string) => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
};

export default function ProductFormPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const isEditMode = !!slug;

  // Fetch product data if editing
  const { data: product, isLoading: productLoading } = useProduct(slug || '');
  const { data: categories = [] } = useCategories();
  
  // Mutations
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();

  // Form setup
  const { register, handleSubmit, watch, setValue, reset, formState: { errors, isDirty } } = useForm<ProductFormData>({
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
    }
  });

  // Watch name for auto-slug generation
  const watchName = watch('name');

  // Populate form when product data is loaded (edit mode)
  useEffect(() => {
    if (isEditMode && product) {
      reset({
        name: product.name || '',
        slug: product.slug || '',
        description: product.description || '',
        short_description: product.short_description || '',
        price: product.price || '',
        compare_at_price: product.compare_at_price || '',
        category_id: product.category_id || '',
        featured_image: product.featured_image || '',
        is_active: product.is_active ?? true,
        is_featured: product.is_featured ?? false,
        sku: product.sku || '',
        stock_quantity: product.stock_quantity?.toString() || '0',
        low_stock_threshold: product.low_stock_threshold?.toString() || '5',
      });
    }
  }, [product, isEditMode, reset]);

  // Auto-generate slug when name changes (only in create mode)
  useEffect(() => {
    if (!isEditMode && watchName) {
      setValue('slug', generateSlug(watchName), { shouldDirty: true });
    }
  }, [watchName, isEditMode, setValue]);

  // Form submission
  const onSubmit = async (data: ProductFormData) => {
    try {
      if (isEditMode && slug) {
        await updateProduct.mutateAsync({
          slug,
          data: {
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
          },
        });
        toast.success('Product updated successfully');
      } else {
        await createProduct.mutateAsync({
          name: data.name,
          slug: data.slug,
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

  // Image upload
  const uploadImage = useUploadProductImage();
  const [imagePreview, setImagePreview] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size must be less than 5MB');
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

  if (isEditMode && productLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-3 text-gray-600">Loading product...</span>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in slide-in-from-bottom-6 duration-500">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate('/dashboard/products')}
            className="hover:bg-gray-200 rounded-xl transition-colors"
          >
            <ArrowLeft className="h-6 w-6 text-gray-600" />
          </Button>
          <div>
            <h1 className="text-3xl font-black text-gray-900">{isEditMode ? 'Edit Product' : 'New Product'}</h1>
            <p className="text-gray-500 font-medium">Create a new product for your catalog</p>
          </div>
        </div>
        <Button 
          onClick={handleSubmit(onSubmit)}
          disabled={isSubmitting || !isDirty}
          className="font-black px-8 py-6 rounded-[1.25rem] shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
        >
          {isSubmitting ? (
            <Loader2 className="h-5 w-5 animate-spin mr-2" />
          ) : (
            <Save className="h-5 w-5 mr-2" />
          )}
          <span>Save Product</span>
        </Button>
      </div>

      {/* Form - Grid Layout */}
      <form onSubmit={handleSubmit(onSubmit)} className="grid lg:grid-cols-3 gap-8">
        {/* Left Column - 2 columns wide */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info Card */}
          <Card className="rounded-[2rem] border-gray-100 shadow-sm">
            <CardHeader className="p-8">
              <CardTitle className="text-lg font-black text-gray-900 flex items-center space-x-2">
                <Package className="h-5 w-5 text-primary" />
                <span>Basic Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 pt-0 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <Label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                    Product Name
                  </Label>
                  <Input
                    placeholder="e.g., PX-550 Mono Panel"
                    className="px-5 py-4 bg-gray-50 border-transparent rounded-2xl focus:bg-white focus:border-primary shadow-sm"
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
                    className="px-5 py-4 bg-gray-50 border-transparent rounded-2xl focus:bg-white focus:border-primary shadow-sm disabled:opacity-50"
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
                  className="px-5 py-4 bg-gray-50 border-transparent rounded-2xl focus:bg-white focus:border-primary shadow-sm"
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
                    className="text-[10px] font-black uppercase text-primary flex items-center space-x-1 hover:underline"
                  >
                    <Sparkles className="h-3 w-3" />
                    <span>AI Refine</span>
                  </button>
                </div>
                <Textarea
                  rows={5}
                  placeholder="Enter detailed technical specifications and benefits..."
                  className="px-5 py-4 bg-gray-50 border-transparent rounded-2xl focus:bg-white focus:border-primary shadow-sm resize-none"
                  {...register('description', { required: 'Description is required' })}
                />
                {errors.description && (
                  <p className="text-sm text-red-500 mt-1">{errors.description.message}</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Pricing & Category Card */}
          <Card className="rounded-[2rem] border-gray-100 shadow-sm">
            <CardHeader className="p-8">
              <CardTitle className="text-lg font-black text-gray-900 flex items-center space-x-2">
                <Zap className="h-5 w-5 text-primary" />
                <span>Pricing & Category</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 pt-0">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-1.5">
                  <Label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                    Retail Price (₦)
                  </Label>
                  <Input
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    className="px-5 py-4 bg-gray-50 border-transparent rounded-2xl focus:bg-white focus:border-primary shadow-sm"
                    {...register('price', { required: 'Price is required' })}
                  />
                  {errors.price && (
                    <p className="text-sm text-red-500 mt-1">{errors.price.message}</p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <Label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                    Compare Price (₦)
                  </Label>
                  <Input
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    className="px-5 py-4 bg-gray-50 border-transparent rounded-2xl focus:bg-white focus:border-primary shadow-sm"
                    {...register('compare_at_price')}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                    Category
                  </Label>
                  <Select 
                    value={watch('category_id')}
                    onValueChange={(value) => setValue('category_id', value, { shouldDirty: true })}
                  >
                    <SelectTrigger className="px-5 py-4 bg-gray-50 border-transparent rounded-2xl focus:bg-white focus:border-primary shadow-sm">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {(categories as Category[]).map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-8">
          {/* Status & Visibility Card */}
          <Card className="rounded-[2rem] border-gray-100 shadow-sm">
            <CardHeader className="p-8">
              <CardTitle className="text-lg font-black text-gray-900">Categorization</CardTitle>
            </CardHeader>
            <CardContent className="p-8 pt-0 space-y-6">
              <div className="space-y-4 pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-gray-900">Active Status</p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Visible to customers</p>
                  </div>
                  <CustomSwitch
                    id="is_active"
                    checked={watch('is_active')}
                    onCheckedChange={(checked) => setValue('is_active', checked, { shouldDirty: true })}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-gray-900">Featured</p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Top of catalog</p>
                  </div>
                  <CustomSwitch
                    id="is_featured"
                    checked={watch('is_featured')}
                    onCheckedChange={(checked) => setValue('is_featured', checked, { shouldDirty: true })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Image & Media Card */}
          <Card className="rounded-[2rem] border-gray-100 shadow-sm">
            <CardHeader className="p-8">
              <CardTitle className="text-lg font-black text-gray-900 flex items-center justify-between">
                <span>Visuals</span>
                <ImageIcon className="h-5 w-5 text-gray-300" />
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 pt-0 space-y-6">
              <div className="space-y-1.5">
                <Label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                  Upload Image
                </Label>
                <div className="relative">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={isUploading}
                    className="px-5 py-4 bg-gray-50 border-transparent rounded-2xl focus:bg-white focus:border-primary shadow-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary/90"
                  />
                  {isUploading && (
                    <div className="absolute right-4 top-1/2 -translate-y-1/2">
                      <Loader2 className="h-4 w-4 animate-spin text-primary" />
                    </div>
                  )}
                </div>
                <p className="text-xs text-gray-400 ml-1">Max 5MB, JPG/PNG/WEBP</p>
              </div>

              <div className="space-y-1.5">
                <Label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                  Or Paste Image URL
                </Label>
                <Input
                  type="url"
                  placeholder="https://..."
                  className="px-5 py-4 bg-gray-50 border-transparent rounded-2xl focus:bg-white focus:border-primary shadow-sm"
                  {...register('featured_image')}
                />
              </div>

              <div className="aspect-square bg-gray-50 rounded-3xl overflow-hidden border border-gray-100 flex items-center justify-center relative group">
                {(imagePreview || watch('featured_image')) ? (
                  <img 
                    src={imagePreview || watch('featured_image')} 
                    className="w-full h-full object-cover transition-transform group-hover:scale-105" 
                    alt="Preview"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                ) : (
                  <div className="text-center p-6">
                    <ImageIcon className="h-10 w-10 text-gray-200 mx-auto mb-2" />
                    <p className="text-[10px] font-bold text-gray-300 uppercase">Image Preview</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Inventory Management Card */}
          <Card className="rounded-[2rem] border-gray-100 shadow-sm">
            <CardHeader className="p-8">
              <CardTitle className="text-lg font-black text-gray-900 flex items-center space-x-2">
                <Package className="h-5 w-5 text-primary" />
                <span>Inventory</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 pt-0 space-y-6">
              <div className="space-y-1.5">
                <Label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                  SKU (Stock Keeping Unit)
                </Label>
                <Input
                  placeholder="e.g., SP-500W-001"
                  className="px-5 py-4 bg-gray-50 border-transparent rounded-2xl focus:bg-white focus:border-primary shadow-sm"
                  {...register('sku')}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                    Stock Qty
                  </Label>
                  <Input
                    type="number"
                    min="0"
                    placeholder="0"
                    className="px-5 py-4 bg-gray-50 border-transparent rounded-2xl focus:bg-white focus:border-primary shadow-sm"
                    {...register('stock_quantity')}
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                    Low Alert
                  </Label>
                  <Input
                    type="number"
                    min="0"
                    placeholder="5"
                    className="px-5 py-4 bg-gray-50 border-transparent rounded-2xl focus:bg-white focus:border-primary shadow-sm"
                    {...register('low_stock_threshold')}
                  />
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4">
                <p className="text-xs text-blue-600 font-medium">
                  <span className="font-bold">Tip:</span> Low stock alerts trigger when quantity reaches or falls below the threshold.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Delete Button */}
          {isEditMode && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button 
                  type="button"
                  variant="destructive"
                  disabled={isDeleting}
                  className="w-full rounded-xl py-6"
                >
                  {isDeleting ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Trash2 className="mr-2 h-4 w-4" />
                  )}
                  Delete Product
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Product</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete "{product?.name}"? This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>
      </form>
    </div>
  );
}
