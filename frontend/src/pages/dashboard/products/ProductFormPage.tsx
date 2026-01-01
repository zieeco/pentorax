/**
 * ProductFormPage - Create/Edit product form
 * Uses existing UI components: Input, Textarea, Select, Switch, Button, Label
 */
import { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { 
  useProduct, 
  useCategories, 
  useCreateProduct, 
  useUpdateProduct,
  useDeleteProduct 
} from '@/hooks/useApi';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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
  Package
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
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

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
    <div className="space-y-6 makx-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/dashboard/products">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-black text-gray-900 flex items-center gap-3">
              <Package className="h-8 w-8 text-primary" />
              {isEditMode ? 'Edit Product' : 'New Product'}
            </h1>
            <p className="text-gray-500 mt-1">
              {isEditMode ? `Editing: ${product?.name}` : 'Create a new product for your catalog'}
            </p>
          </div>
        </div>

        {isEditMode && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" disabled={isDeleting}>
                {isDeleting ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Trash2 className="mr-2 h-4 w-4" />
                )}
                Delete
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

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Basic Info */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>Product name, description, and identifiers</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Product Name *</Label>
                <Input
                  id="name"
                  placeholder="e.g., Solar Panel 300W"
                  {...register('name', { required: 'Name is required' })}
                />
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="slug">Slug</Label>
                <Input
                  id="slug"
                  placeholder="auto-generated-from-name"
                  {...register('slug')}
                  disabled={isEditMode}
                  className={isEditMode ? 'bg-gray-50' : ''}
                />
                <p className="text-xs text-gray-400">URL-friendly identifier</p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="short_description">Short Description</Label>
              <Input
                id="short_description"
                placeholder="Brief product summary (shown in cards)"
                {...register('short_description')}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Full Description *</Label>
              <Textarea
                id="description"
                placeholder="Detailed product description..."
                rows={4}
                {...register('description', { required: 'Description is required' })}
              />
              {errors.description && (
                <p className="text-sm text-red-500">{errors.description.message}</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Pricing & Category */}
        <Card>
          <CardHeader>
            <CardTitle>Pricing & Category</CardTitle>
            <CardDescription>Set product pricing and categorization</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="price">Price (₦) *</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  {...register('price', { required: 'Price is required' })}
                />
                {errors.price && (
                  <p className="text-sm text-red-500">{errors.price.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="compare_at_price">Compare at Price (₦)</Label>
                <Input
                  id="compare_at_price"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  {...register('compare_at_price')}
                />
                <p className="text-xs text-gray-400">Original price (for discounts)</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="category_id">Category *</Label>
                <Select 
                  value={watch('category_id')}
                  onValueChange={(value) => setValue('category_id', value, { shouldDirty: true })}
                >
                  <SelectTrigger>
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

        {/* Image */}
        <Card>
          <CardHeader>
            <CardTitle>Product Image</CardTitle>
            <CardDescription>Featured image URL for the product</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="featured_image">Image URL</Label>
              <Input
                id="featured_image"
                type="url"
                placeholder="https://example.com/image.jpg"
                {...register('featured_image')}
              />
            </div>
            {watch('featured_image') && (
              <div className="mt-4">
                <p className="text-sm text-gray-500 mb-2">Preview:</p>
                <div className="h-40 w-40 rounded-lg overflow-hidden bg-gray-100">
                  <img 
                    src={watch('featured_image')} 
                    alt="Preview" 
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '';
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Status */}
        <Card>
          <CardHeader>
            <CardTitle>Status</CardTitle>
            <CardDescription>Control product visibility and featuring</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="is_active" className="text-base">Active</Label>
                <p className="text-sm text-gray-500">Product is visible on the storefront</p>
              </div>
              <Switch
                id="is_active"
                checked={watch('is_active')}
                onCheckedChange={(checked) => setValue('is_active', checked, { shouldDirty: true })}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="is_featured" className="text-base">Featured</Label>
                <p className="text-sm text-gray-500">Show in featured products section</p>
              </div>
              <Switch
                id="is_featured"
                checked={watch('is_featured')}
                onCheckedChange={(checked) => setValue('is_featured', checked, { shouldDirty: true })}
              />
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4">
          <Button variant="outline" type="button" asChild>
            <Link to="/dashboard/products">Cancel</Link>
          </Button>
          <Button type="submit" disabled={isSubmitting || !isDirty}>
            {isSubmitting ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : ( 
              <Save className="mr-2 h-4 w-4" />
            )}
            {isEditMode ? 'Update Product' : 'Create Product'}
          </Button>
        </div>
      </form>
    </div>
  );
}
