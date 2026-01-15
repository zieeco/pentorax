/**
 * ProductDetailPage - Single product view
 */
import { useParams, useNavigate } from 'react-router-dom';
import { useProduct, useAddToCart, useReviews } from '@/hooks';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { RelatedProducts } from '@/components/shop/RelatedProducts';
import { ProductImageGallery } from '@/components/shop/ProductImageGallery';
import { DeliveryInfo } from '@/components/shop/DeliveryInfo';
import { RecentlyViewed, trackProductView } from '@/components/shop/RecentlyViewed';
import { WishlistButton } from '@/components/shop/WishlistButton';
import { ShareButton } from '@/components/shop/ShareButton';
import { SizeGuideButton } from '@/components/shop/SizeGuideButton';
import { NotifyMeButton } from '@/components/shop/NotifyMeButton';
import { ChatWidget } from '@/components/shop/ChatWidget';
import { ShoppingCart, Star, ArrowLeft, Check } from 'lucide-react';
import { toast } from 'sonner';
import { useState, useEffect } from 'react';


export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);

  const { data: product, isLoading } = useProduct(slug!);
  const { data: reviews = [] } = useReviews(product?.id || '', { enabled: !!product?.id });
  const addToCart = useAddToCart();

  // Track product view - MUST be before early returns
  useEffect(() => {
    if (product?.id) {
      trackProductView(product.id);
    }
  }, [product?.id]);

  const handleAddToCart = () => {
    if (!product) return;
    
    addToCart.mutate(
      { productId: product.id, quantity },
      {
        onSuccess: () => {
          toast.success(`${product.name} added to cart`);
        },
        onError: () => {
          toast.error('Failed to add to cart');
        },
      }
    );
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Skeleton className="h-96 w-full mb-8" />
        <Skeleton className="h-8 w-3/4 mb-4" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-muted-foreground">Product not found</p>
        <Button onClick={() => navigate('/shop')} className="mt-4">
          Back to Shop
        </Button>
      </div>
    );
  }

  const averageRating = reviews.length > 0
    ? reviews.reduce((sum: number, r: { rating: number }) => sum + r.rating, 0) / reviews.length
    : 0;

  // Combine featured image with additional images
  const allImages = [
    { image_url: product.featured_image, alt_text: product.name },
    ...(product.images || [])
  ].filter(img => img.image_url);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate('/shop')}
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Shop
        </Button>

        {/* Breadcrumbs Navigation */}
        <Breadcrumbs 
          items={[
            { label: 'Shop', href: '/shop' },
            { label: product.category?.name || 'Products', href: `/shop?category=${product.category?.slug || ''}` },
            { label: product.name }
          ]}
          className="mb-6"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
          {/* Product Images */}
          <ProductImageGallery 
            images={allImages}
            productName={product.name}
          />

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              {product.is_featured && (
                <Badge className="mb-2 bg-accent">Featured</Badge>
              )}
              <h1 className="text-4xl font-bold mb-2">{product.name}</h1>
              <p className="text-muted-foreground">{product.short_description}</p>
            </div>

            {/* Reviews */}
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(averageRating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                ({reviews.length} reviews)
              </span>
            </div>

            {/* Price */}
            <div>
              <div className="text-3xl font-bold text-primary">
                ₦{Number(product.price).toLocaleString()}
              </div>
              {product.compare_at_price && Number(product.compare_at_price) > 0 && (
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm text-muted-foreground line-through">
                    ₦{Number(product.compare_at_price).toLocaleString()}
                  </span>
                  <span className="text-sm font-semibold text-green-600">
                    {Math.round(((Number(product.compare_at_price) - Number(product.price)) / Number(product.compare_at_price)) * 100)}% off
                  </span>
                </div>
              )}
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-4 flex-wrap">
              {product.in_stock ? (
                <>
                  <div className="flex items-center gap-2 text-green-600">
                    <Check className="h-5 w-5" />
                    <span className="font-medium">In Stock</span>
                  </div>
                  {product.is_low_stock && product.stock_quantity !== undefined && (
                    <Badge variant="destructive" className="animate-pulse">
                      Only {product.stock_quantity} left!
                    </Badge>
                  )}
                </>
              ) : (
                <Badge variant="destructive">Out of Stock</Badge>
              )}
            </div>

            {/* Wishlist & Share */}
            <div className="flex gap-2">
              <WishlistButton productId={product.id} variant="icon" />
              <ShareButton productName={product.name} variant="icon" />
            </div>

            {/* Quantity and Add to Cart */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center justify-center border rounded-md w-full sm:w-auto">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </Button>
                <span className="px-4 py-2 min-w-[3rem] text-center">{quantity}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </Button>
              </div>

              <Button
                size="lg"
                className="flex-1"
                onClick={handleAddToCart}
                disabled={!product.in_stock || addToCart.isPending}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                {addToCart.isPending ? 'Adding...' : 'Add to Cart'}
              </Button>
            </div>

            {/* Stock Notification */}
            <NotifyMeButton 
              productId={product.id}
              productName={product.name}
              inStock={product.in_stock}
              className="w-full"
            />

            {/* Size Guide */}
            <SizeGuideButton 
              categorySlug={product.category?.slug}
              variant="link"
              className="w-full justify-center"
            />

            {/* Delivery Info */}
            <DeliveryInfo 
              inStock={product.in_stock}
              isLowStock={product.is_low_stock}
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-12">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="reviews">Reviews ({reviews.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="mt-6">
              <div className="prose prose-sm max-w-none">
                <p className="text-muted-foreground leading-relaxed">{product.description}</p>
              </div>
            </TabsContent>

            <TabsContent value="specifications" className="mt-6">
              {product.specifications && product.specifications.length > 0 ? (
                <div className="space-y-2">
                  {product.specifications.map((spec) => (
                    <div key={spec.id} className="flex justify-between py-3 border-b last:border-0">
                      <span className="font-medium text-gray-900">{spec.key}</span>
                      <span className="text-muted-foreground">{spec.value}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-8">
                  No specifications available for this product.
                </p>
              )}
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              {reviews.length > 0 ? (
                <div className="space-y-6">
                  <div className="flex items-center gap-6 pb-6 border-b">
                    <div className="text-center">
                      <div className="text-4xl font-bold">{averageRating.toFixed(1)}</div>
                      <div className="flex items-center gap-1 mt-2">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-5 w-5 ${
                              i < Math.round(averageRating)
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Based on {reviews.length} reviews
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {reviews.map((review) => (
                      <div key={review.id} className="border rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm font-medium">{review.user_email}</span>
                        </div>
                        {review.comment && (
                          <p className="text-sm text-muted-foreground mt-2">{review.comment}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-12">
                  No reviews yet. Be the first to review this product!
                </p>
              )}
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Related Products */}
        {product && (
          <RelatedProducts 
            currentProductId={product.id}
            categoryId={product.category_id}
            limit={4}
          />
        )}

        {/* Recently Viewed */}
        {product && (
          <RecentlyViewed 
            currentProductId={product.id}
            maxItems={4}
          />
        )}
      </div>
      
      {/* Live Chat Widget */}
      {product && <ChatWidget productId={product.id} />}
    </div>
  );
}
