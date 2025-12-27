/**
 * CheckoutPage - Order checkout with Paystack
 */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart, useCreateOrder, useInitializePayment } from '@/hooks/useApi';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { data: cart, isLoading: cartLoading } = useCart();
  const createOrder = useCreateOrder();
  const initializePayment = useInitializePayment();

  const [formData, setFormData] = useState({
    email: '',
    shipping_name: '',
    shipping_phone: '',
    shipping_address: '',
    shipping_city: '',
    shipping_state: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!cart || cart.items.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    try {
      // Create order
      const orderResponse = await createOrder.mutateAsync({
        ...formData,
        items: cart.items.map(item => ({
          product_id: item.product.id,
          quantity: item.quantity,
        })),
      });

      const order = orderResponse.data;

      // Initialize payment
      const paymentResponse = await initializePayment.mutateAsync(order.id);

      // Redirect to Paystack (or show payment modal)
      if (paymentResponse.data.authorization_url) {
        window.location.href = paymentResponse.data.authorization_url;
      } else {
        toast.success('Order created successfully!');
        navigate(`/orders/${order.id}`);
      }
    } catch (error) {
      toast.error('Failed to process order');
      console.error(error);
    }
  };

  if (cartLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
        <Button onClick={() => navigate('/shop')}>Continue Shopping</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-r from-primary to-secondary py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-white">Checkout</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <h2 className="text-2xl font-semibold mb-6">Shipping Information</h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <Label htmlFor="shipping_name">Full Name *</Label>
                  <Input
                    id="shipping_name"
                    name="shipping_name"
                    required
                    value={formData.shipping_name}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <Label htmlFor="shipping_phone">Phone Number *</Label>
                  <Input
                    id="shipping_phone"
                    name="shipping_phone"
                    type="tel"
                    required
                    value={formData.shipping_phone}
                    onChange={handleInputChange}
                    placeholder="+234 800 000 0000"
                  />
                </div>

                <div>
                  <Label htmlFor="shipping_address">Street Address *</Label>
                  <Input
                    id="shipping_address"
                    name="shipping_address"
                    required
                    value={formData.shipping_address}
                    onChange={handleInputChange}
                    placeholder="123 Main Street"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="shipping_city">City *</Label>
                    <Input
                      id="shipping_city"
                      name="shipping_city"
                      required
                      value={formData.shipping_city}
                      onChange={handleInputChange}
                      placeholder="Lagos"
                    />
                  </div>

                  <div>
                    <Label htmlFor="shipping_state">State *</Label>
                    <Input
                      id="shipping_state"
                      name="shipping_state"
                      required
                      value={formData.shipping_state}
                      onChange={handleInputChange}
                      placeholder="Lagos"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full mt-6"
                  disabled={createOrder.isPending || initializePayment.isPending}
                >
                  {createOrder.isPending || initializePayment.isPending
                    ? 'Processing...'
                    : 'Proceed to Payment'}
                </Button>
              </form>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-4">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                {cart.items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {item.product.name} x{item.quantity}
                    </span>
                    <span className="font-medium">
                      ₦{item.subtotal.toLocaleString()}
                    </span>
                  </div>
                ))}
                
                <div className="border-t pt-3 flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-primary">₦{cart.total.toLocaleString()}</span>
                </div>
              </div>

              <div className="text-sm text-muted-foreground">
                <p>• Secure payment via Paystack</p>
                <p>• Shipping calculated after order</p>
                <p>• Free delivery on orders over ₦500,000</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
