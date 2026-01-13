import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Wrench, Loader2 } from 'lucide-react';
import SEO from '@/components/SEO';
import { useProducts, useAddToCart } from '@/hooks';
import { toast } from 'sonner';

// Helper to format price (API returns string)
const formatPrice = (price: string | number) => {
  const num = typeof price === 'string' ? parseFloat(price) : price;
  return num.toLocaleString('en-NG');
};

const AccessoriesPage: React.FC = () => {
  // Fetch products from accessories category
  const { data: products = [], isLoading, isError } = useProducts({ category: 'accessories' });
  const addToCart = useAddToCart();

  const handleAddToCart = (e: React.MouseEvent, productId: string, productName: string) => {
    e.preventDefault();
    addToCart.mutate(
      { productId, quantity: 1 },
      {
        onSuccess: () => toast.success(`${productName} added to cart`),
        onError: () => toast.error('Failed to add to cart'),
      }
    );
  };

  return (
    <>
      <SEO
        title="Solar Accessories | Cables, Connectors, Monitoring & More"
        description="Complete range of solar accessories including monitoring systems, cables, connectors, mounting brackets, and surge protection. Quality components for reliable solar installations."
        keywords="solar accessories, solar cables, mc4 connectors, solar monitoring, mounting brackets, surge protection"
        ogImage="/accessories.png"
      />

      <div className="bg-gray-50 py-24 min-h-screen">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-4">
              <Wrench className="h-10 w-10 text-primary" />
              <h1 className="text-4xl font-extrabold text-gray-900">
                Solar <span className="text-primary">Accessories</span>
              </h1>
            </div>
            <p className="text-gray-600 max-w-2xl text-lg">
              Essential accessories for complete solar installations. Monitoring systems, cables, connectors, mounting hardware, and protection devices.
            </p>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-3 text-gray-600">Loading products...</span>
            </div>
          )}

          {/* Error State */}
          {isError && (
            <div className="text-center py-20">
              <p className="text-red-500 mb-4">Failed to load products. Please try again.</p>
              <Link to="/shop" className="text-primary hover:underline">
                Browse all products
              </Link>
            </div>
          )}

          {/* Empty State */}
          {!isLoading && !isError && products.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500 mb-4">No accessories available at the moment.</p>
              <Link to="/shop" className="text-primary hover:underline">
                Browse all products
              </Link>
            </div>
          )}

          {/* Products Grid */}
          {!isLoading && products.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {products.map((product) => (
                <div key={product.id} className="bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all border border-gray-100 group">
                  <Link to={`/shop/${product.slug}`} className="block">
                    <div className="h-64 overflow-hidden relative">
                      <img 
                        src={product.featured_image || 'https://via.placeholder.com/400x300?text=Accessory'} 
                        alt={product.name} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                      />
                      {product.in_stock && (
                        <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                          In Stock
                        </div>
                      )}
                      {product.discount_percentage > 0 && (
                        <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                          -{product.discount_percentage}%
                        </div>
                      )}
                    </div>
                    <div className="p-8">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
                      <p className="text-gray-500 text-sm mb-6 line-clamp-2">{product.short_description}</p>
                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex flex-col">
                          <span className="text-2xl font-black text-primary">₦{formatPrice(product.price)}</span>
                          {product.compare_at_price && parseFloat(String(product.compare_at_price)) > parseFloat(String(product.price)) && (
                            <span className="text-sm text-gray-400 line-through">₦{formatPrice(product.compare_at_price)}</span>
                          )}
                        </div>
                        <button 
                          onClick={(e) => handleAddToCart(e, product.id, product.name)}
                          disabled={addToCart.isPending}
                          className="p-3 bg-gray-900 text-white rounded-xl hover:bg-primary transition-colors shadow-lg shadow-black/5 active:scale-90 disabled:opacity-50"
                        >
                          <ShoppingCart className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-primary to-blue-700 rounded-3xl p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Need Installation Accessories?</h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Our installation team can provide a complete accessories list for your solar project
            </p>
            <Link 
              to="/contact" 
              className="inline-block bg-secondary px-8 py-4 rounded-lg font-bold text-gray-900 hover:scale-105 transition-transform"
            >
              Get Accessories List
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccessoriesPage;
