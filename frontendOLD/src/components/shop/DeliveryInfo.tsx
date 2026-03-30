/**
 * DeliveryInfo component - Display delivery and shipping information
 * @module components/shop
 */
import { Truck, Package, MapPin, Clock, ShieldCheck } from 'lucide-react';

interface DeliveryInfoProps {
  inStock: boolean;
  isLowStock?: boolean;
}

export function DeliveryInfo({ inStock, isLowStock }: DeliveryInfoProps) {
  // Calculate estimated delivery based on stock status
  const getEstimatedDelivery = () => {
    if (!inStock) return 'Currently unavailable';
    if (isLowStock) return '2-3 business days';
    return '1-2 business days';
  };

  const deliveryDate = getEstimatedDelivery();

  return (
    <div className="space-y-4 border-t border-b border-gray-200 py-6 my-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Delivery Information</h3>
      
      <div className="space-y-3">
        {/* Estimated Delivery */}
        <div className="flex items-start gap-3">
          <Clock className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <p className="font-semibold text-gray-900">Estimated Delivery</p>
            <p className="text-sm text-gray-600">
              {inStock ? (
                <>
                  <span className="font-medium text-primary">{deliveryDate}</span>
                  {' '}within Lagos. Other states may take 3-5 business days.
                </>
              ) : (
                <span className="text-gray-500">Product out of stock</span>
              )}
            </p>
          </div>
        </div>

        {/* Free Shipping */}
        <div className="flex items-start gap-3">
          <Truck className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <p className="font-semibold text-gray-900">Free Shipping</p>
            <p className="text-sm text-gray-600">
              On orders over <span className="font-medium">₦100,000</span>. Standard shipping ₦5,000.
            </p>
          </div>
        </div>

        {/* Installation Available */}
        <div className="flex items-start gap-3">
          <Package className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <p className="font-semibold text-gray-900">Professional Installation</p>
            <p className="text-sm text-gray-600">
              Available nationwide. Book during checkout or contact support.
            </p>
          </div>
        </div>

        {/* Delivery Coverage */}
        <div className="flex items-start gap-3">
          <MapPin className="h-5 w-5 text-orange-600 mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <p className="font-semibold text-gray-900">Nationwide Delivery</p>
            <p className="text-sm text-gray-600">
              We deliver to all 36 states in Nigeria. Remote areas may incur additional fees.
            </p>
          </div>
        </div>

        {/* Warranty */}
        <div className="flex items-start gap-3">
          <ShieldCheck className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <p className="font-semibold text-gray-900">Warranty Included</p>
            <p className="text-sm text-gray-600">
              All products come with manufacturer warranty. Extended warranty available.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
