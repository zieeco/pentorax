/**
 * CheckoutForm Component
 * Shipping information form for checkout
 */
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Mail, User, Phone, MapPin, Building, Home, Lock } from 'lucide-react';

interface CheckoutFormData {
  email: string;
  shipping_name: string;
  shipping_phone: string;
  shipping_address: string;
  shipping_city: string;
  shipping_state: string;
}

interface CheckoutFormProps {
  onSubmit: (data: CheckoutFormData) => void;
  isSubmitting?: boolean;
}

export default function CheckoutForm({ onSubmit, isSubmitting }: CheckoutFormProps) {
  const [formData, setFormData] = useState<CheckoutFormData>({
    email: '',
    shipping_name: '',
    shipping_phone: '',
    shipping_address: '',
    shipping_city: '',
    shipping_state: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Card className="p-8 shadow-xl rounded-3xl border-0 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-blue-600" />
      
      <div className="flex items-center justify-between mb-8">
        <div>
           <h2 className="text-2xl font-bold">Shipping Details</h2>
           <p className="text-muted-foreground text-sm">Where should we send your order?</p>
        </div>
        <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
          <MapPin className="w-5 h-5" />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Contact Info Group */}
        <div className="space-y-4">
           <h3 className="text-sm font-semibold text-muted-foreground tracking-wider uppercase">Contact Information</h3>
           
           <div className="grid md:grid-cols-2 gap-4">
             {/* Full Name */}
             <div className="space-y-2">
               <Label htmlFor="shipping_name">Full Name</Label>
               <div className="relative">
                 <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                 <Input
                   id="shipping_name"
                   name="shipping_name"
                   required
                   value={formData.shipping_name}
                   onChange={handleChange}
                   placeholder="John Doe"
                   className="pl-10 h-11 bg-muted/30 border-muted-foreground/20 focus:border-primary focus:bg-background transition-all"
                 />
               </div>
             </div>

             {/* Phone */}
             <div className="space-y-2">
               <Label htmlFor="shipping_phone">Phone Number</Label>
               <div className="relative">
                 <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                 <Input
                   id="shipping_phone"
                   name="shipping_phone"
                   type="tel"
                   required
                   value={formData.shipping_phone}
                   onChange={handleChange}
                   placeholder="+234 800 000 0000"
                   className="pl-10 h-11 bg-muted/30 border-muted-foreground/20 focus:border-primary focus:bg-background transition-all"
                 />
               </div>
             </div>
           </div>

           {/* Email */}
           <div className="space-y-2">
             <Label htmlFor="email">Email Address</Label>
             <div className="relative">
               <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
               <Input
                 id="email"
                 name="email"
                 type="email"
                 required
                 value={formData.email}
                 onChange={handleChange}
                 placeholder="your@email.com"
                 className="pl-10 h-11 bg-muted/30 border-muted-foreground/20 focus:border-primary focus:bg-background transition-all"
               />
             </div>
           </div>
        </div>

        <div className="h-px bg-border/50 my-6" />

        {/* Address Group */}
        <div className="space-y-4">
           <h3 className="text-sm font-semibold text-muted-foreground tracking-wider uppercase">Delivery Address</h3>
           
           {/* Address */}
           <div className="space-y-2">
             <Label htmlFor="shipping_address">Street Address</Label>
             <div className="relative">
               <Home className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
               <Input
                 id="shipping_address"
                 name="shipping_address"
                 required
                 value={formData.shipping_address}
                 onChange={handleChange}
                 placeholder="123 Main Street"
                 className="pl-10 h-11 bg-muted/30 border-muted-foreground/20 focus:border-primary focus:bg-background transition-all"
               />
             </div>
           </div>

           {/* City & State */}
           <div className="grid md:grid-cols-2 gap-4">
             <div className="space-y-2">
               <Label htmlFor="shipping_city">City</Label>
               <div className="relative">
                 <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                 <Input
                   id="shipping_city"
                   name="shipping_city"
                   required
                   value={formData.shipping_city}
                   onChange={handleChange}
                   placeholder="Lagos"
                   className="pl-10 h-11 bg-muted/30 border-muted-foreground/20 focus:border-primary focus:bg-background transition-all"
                 />
               </div>
             </div>

             <div className="space-y-2">
               <Label htmlFor="shipping_state">State</Label>
               <div className="relative">
                 <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                 <Input
                   id="shipping_state"
                   name="shipping_state"
                   required
                   value={formData.shipping_state}
                   onChange={handleChange}
                   placeholder="Lagos"
                   className="pl-10 h-11 bg-muted/30 border-muted-foreground/20 focus:border-primary focus:bg-background transition-all"
                 />
               </div>
             </div>
           </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          size="lg"
          className="w-full h-14 mt-8 text-lg font-medium shadow-lg hover:shadow-primary/25 transition-all rounded-xl"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
              Processing...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Lock className="w-5 h-5" />
              Pay Securely
            </span>
          )}
        </Button>
        <p className="text-center text-xs text-muted-foreground mt-4">
          By clicking "Pay Securely", you agree to our Terms of Service.
        </p>
      </form>
    </Card>
  );
}
