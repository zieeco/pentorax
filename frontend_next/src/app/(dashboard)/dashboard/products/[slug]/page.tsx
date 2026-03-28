'use client';

/**
 * Edit Product Page
 */
import { use } from 'react';
import { ProductForm } from '@/components/dashboard/products/form/ProductForm';
import { ProductFormSkeleton } from '@/components/dashboard/products/form/ProductFormSkeleton';
import { useCategories, useProduct } from '@/hooks/products-hooks';

export default function EditProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { data: product, isLoading: productLoading } = useProduct(slug);
  const { data: categories = [] } = useCategories();

  if (productLoading) {
    return (
      <div className="container mx-auto py-8">
        <ProductFormSkeleton />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <ProductForm slug={slug} initialData={product} categories={categories} />
    </div>
  );
}
