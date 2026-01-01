/**
 * ProductDetailPage - Single product view
 */
import { useParams, useNavigate } from 'react-router-dom';
import { useProduct, useAddToCart, useReviews } from '@/hooks/useApi';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { ShoppingCart, Star, ArrowLeft, Check, Truck } from 'lucide-react';
import { toast } from 'sonner';
import { useState } from 'react';

// Helper to format price (API returns string)
const formatPrice = (price: string | number) => {
  const num = typeof price === 'string' ? parseFloat(price) : price;
  return num.toLocaleString('en-NG');
};

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const { data: product, isLoading } = useProduct(slug!);
  const { data: reviews = [] } = useReviews(product?.id);
  const addToCart = useAddToCart();

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
  
  const currentImage = allImages[selectedImageIndex]?.image_url || product.featured_image;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate('/shop')}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Shop
        </Button>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Product Images - Gallery */}
          <div className="space-y-4">
            <div className="aspect-square rounded-lg overflow-hidden bg-muted border">
              <img
                src={currentImage || '/placeholder-product.png'}
                alt={product.name}
                className="w-full h-full object-cover transition-all duration-300 hover:scale-105"
              />
            </div>
            {/* Thumbnail Gallery */}
            {allImages.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {allImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`w-20 h-20 rounded-md overflow-hidden flex-shrink-0 border-2 transition-all ${
                      selectedImageIndex === index
                        ? 'border-primary ring-2 ring-primary/20'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={img.image_url}
                      alt={img.alt_text || `${product.name} view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              {product.is_featured && (
                <Badge className="mb-2 bg-accent">Featured</Badge>
              )}
              <h1 className="text-4xl font-bold mb-2">{product.name}</h1>
              <p className="text-muted-foreground">{product.short_description}</p>
            </div>

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

            {/* Stock Status */}
            <div className="flex items-center gap-4">
              {product.in_stock ? (
                <div className="flex items-center gap-2 text-green-600">
                  <Check className="h-5 w-5" />
                  <span className="font-medium">In Stock</span>
                </div>
              ) : (
                <span className="text-red-500 font-medium">Out of Stock</span>
              )}
              <div className="flex items-center gap-2 text-muted-foreground">
                <Truck className="h-4 w-4" />
                <span className="text-sm">Free shipping on orders over ₦100,000</span>
              </div>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-bold text-primary">
                ₦{formatPrice(product.price)}
              </span>
              {product.compare_at_price && parseFloat(product.compare_at_price) > parseFloat(product.price) && (
                <>
                  <span className="text-xl text-muted-foreground line-through">
                    ₦{formatPrice(product.compare_at_price)}
                  </span>
                  <Badge variant="destructive">
                    Save {product.discount_percentage}%
                  </Badge>
                </>
              )}
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center border rounded-md">
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
                disabled={addToCart.isPending}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                {addToCart.isPending ? 'Adding...' : 'Add to Cart'}
              </Button>
            </div>

            <div className="prose prose-sm max-w-none">
              <h3 className="font-semibold text-lg mb-2">Description</h3>
              <p className="text-muted-foreground">{product.description}</p>
            </div>

            {product.specifications && product.specifications.length > 0 && (
              <div>
                <h3 className="font-semibold text-lg mb-3">Specifications</h3>
                <div className="space-y-2">
                  {product.specifications.map((spec) => (
                    <div key={spec.id} className="flex justify-between py-2 border-b">
                      <span className="font-medium">{spec.key}</span>
                      <span className="text-muted-foreground">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Reviews Section */}
        {reviews.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
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
                    {review.is_verified_purchase && (
                      <Badge variant="secondary" className="text-xs">
                        Verified Purchase
                      </Badge>
                    )}
                  </div>
                  <p className="text-muted-foreground">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
