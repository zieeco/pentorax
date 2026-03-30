'use client';

/**
 * RestockDialog — Quick inventory restock dialog
 * Extracted from dashboard/page.tsx for 150-line rule compliance
 */
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface RestockDialogProps {
  item: { slug: string; name: string; stock: number } | null;
  newStock: string;
  isUpdating: boolean;
  onStockChange: (value: string) => void;
  onClose: () => void;
  onConfirm: () => void;
}

export function RestockDialog({
  item,
  newStock,
  isUpdating,
  onStockChange,
  onClose,
  onConfirm,
}: RestockDialogProps) {
  return (
    <Dialog open={!!item} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="rounded-3xl border-none shadow-2xl sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-foreground text-xl font-black">Adjust Inventory</DialogTitle>
        </DialogHeader>
        <div className="py-6">
          <p className="text-muted-foreground mb-4 text-sm font-medium">
            Updating stock for <span className="text-foreground font-black">{item?.name}</span>.{' '}
            Currently <span className="text-primary font-black">{item?.stock} units</span> in
            warehouse.
          </p>
          <div className="space-y-2">
            <Label className="text-muted-foreground text-[10px] font-black tracking-widest uppercase">
              New Stock Quantity
            </Label>
            <Input
              type="number"
              placeholder="Enter units..."
              className="focus-visible:ring-primary/20 focus-visible:border-primary border-border bg-muted/30 rounded-xl py-6 text-lg font-bold"
              value={newStock}
              onChange={(e) => onStockChange(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter className="gap-3 pt-2 pb-2">
          <Button variant="outline" className="rounded-xl font-bold" onClick={onClose}>
            Cancel
          </Button>
          <Button
            className="shadow-primary/20 rounded-xl px-8 font-bold shadow-lg"
            onClick={onConfirm}
            disabled={isUpdating}
          >
            {isUpdating ? 'Updating...' : 'Update Inventory'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
