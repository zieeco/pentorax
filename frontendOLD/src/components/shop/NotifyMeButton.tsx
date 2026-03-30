/**
 * NotifyMeButton component - Subscribe to stock notifications for out-of-stock products
 * @module components/shop
 */

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Bell } from 'lucide-react';
import { useSubscribeStockNotification } from '@/hooks';

interface NotifyMeButtonProps {
  productId: string;
  productName: string;
  inStock: boolean;
  className?: string;
}

export function NotifyMeButton({ 
  productId, 
  productName,
  inStock,
  className 
}: NotifyMeButtonProps) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const subscribe = useSubscribeStockNotification();

  // Don't show button if product is in stock
  if (inStock) {
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    subscribe.mutate(
      { productId, email },
      {
        onSuccess: () => {
          setEmail('');
          setOpen(false);
        },
      }
    );
  };

  return (
    <>
      <Button
        variant="outline"
        onClick={() => setOpen(true)}
        className={className}
      >
        <Bell className="mr-2 h-4 w-4" />
        Notify Me When Available
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Get Notified</DialogTitle>
            <DialogDescription>
              Enter your email and we'll notify you when <strong>{productName}</strong> is back in stock.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={subscribe.isPending}
              />
            </div>

            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={subscribe.isPending}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={subscribe.isPending || !email}
              >
                {subscribe.isPending ? 'Subscribing...' : 'Notify Me'}
              </Button>
            </div>
          </form>

          <p className="text-xs text-muted-foreground mt-4">
            We'll send you one email when this product is back in stock. You can unsubscribe anytime.
          </p>
        </DialogContent>
      </Dialog>
    </>
  );
}
