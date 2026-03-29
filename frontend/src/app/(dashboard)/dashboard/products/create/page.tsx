'use client';

/**
 * Create Product Page
 */
import { ProductForm } from '@/components/dashboard/products/form/ProductForm';
import { useCategories } from '@/hooks/products-hooks';

export default function CreateProductPage() {
  const { data: categories = [] } = useCategories();

  return (
    <div className="container mx-auto py-8">
      <ProductForm categories={categories} />
    </div>
  );
}
