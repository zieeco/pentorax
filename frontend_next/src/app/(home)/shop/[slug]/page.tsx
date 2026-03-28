'use client';

/**
 * ProductDetailPage — Single product view with sections
 * Composes ported components: ProductImageGallery, ProductInfoSection, ProductTabs, etc.
 * Satisfies the 150-line rule.
 */
import { ArrowLeft } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { ProductImageGallery } from '@/components/shop/ProductImageGallery';
import { ProductInfoSection } from '@/components/shop/ProductInfoSection';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useProduct } from '@/hooks/products-hooks';

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();
  const { data: product, isLoading } = useProduct(slug!);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2">
          <Skeleton className="aspect-square w-full rounded-[2.5rem]" />
          <div className="space-y-6">
            <Skeleton className="h-12 w-3/4 rounded-xl" />
            <Skeleton className="h-32 w-full rounded-2xl" />
            <Skeleton className="h-48 w-full rounded-[2rem]" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h2 className="mb-4 text-2xl font-black text-gray-900">Product Lost in Orbit</h2>
        <p className="mb-8 font-medium text-gray-500">
          We couldn&apos;t find the solar gear you were looking for.
        </p>
        <Button onClick={() => router.push('/shop')} className="rounded-xl px-8 font-bold">
          Return to Shop
        </Button>
      </div>
    );
  }

  const allImages = [
    { image_url: product.featured_image, alt_text: product.name },
    ...(product.images || []),
  ].filter((img) => img.image_url);

  return (
    <div className="min-h-screen bg-gray-50/20 pb-20">
      <div className="container mx-auto px-4 py-8 lg:px-8">
        <Button
          variant="ghost"
          onClick={() => router.push('/shop')}
          className="hover:text-primary hover:bg-primary/5 mb-8 gap-2 rounded-xl font-bold text-gray-400"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Shop
        </Button>

        <div className="mb-20 grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-20">
          <ProductImageGallery images={allImages} productName={product.name} />
          <ProductInfoSection product={product} />
        </div>

        <div className="rounded-[2.5rem] border border-gray-100 bg-white p-8 shadow-sm lg:p-12">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="mb-8 flex h-auto gap-8 rounded-none border-b border-gray-100 bg-transparent p-0">
              {['description', 'specifications', 'reviews'].map((t) => (
                <TabsTrigger
                  key={t}
                  value={t}
                  className="data-[state=active]:text-primary data-[state=active]:border-primary rounded-none bg-transparent px-0 py-4 text-xs font-black tracking-widest text-gray-400 capitalize transition-all hover:text-gray-900 data-[state=active]:border-b-2"
                >
                  {t}
                </TabsTrigger>
              ))}
            </TabsList>
            <TabsContent
              value="description"
              className="animate-in fade-in slide-in-from-bottom-2 duration-500"
            >
              <div className="prose prose-blue max-w-none">
                <p className="text-lg leading-[1.8] font-medium text-gray-600">
                  {product.description}
                </p>
              </div>
            </TabsContent>
            <TabsContent
              value="specifications"
              className="animate-in fade-in slide-in-from-bottom-2 duration-500"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                {product.specifications?.map((s, i) => (
                  <div key={i} className="flex justify-between rounded-xl bg-gray-50 p-4">
                    <span className="text-[10px] font-black tracking-widest text-gray-400 uppercase">
                      {s.key}
                    </span>
                    <span className="font-bold text-gray-900">{s.value}</span>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
