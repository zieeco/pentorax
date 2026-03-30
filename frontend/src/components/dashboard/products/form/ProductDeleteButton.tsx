'use client';

/**
 * ProductDeleteButton - Delete product with confirmation dialog
 * Ported from Vite to Next.js
 */
import { Loader2, Trash2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

interface ProductDeleteButtonProps {
  productName: string;
  isDeleting: boolean;
  onDelete: () => void;
}

export function ProductDeleteButton({
  productName,
  isDeleting,
  onDelete,
}: ProductDeleteButtonProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          type="button"
          variant="destructive"
          disabled={isDeleting}
          className="shadow-destructive/10 h-auto w-full rounded-2xl py-6 font-black tracking-widest uppercase shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          {isDeleting ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Deleting...
            </>
          ) : (
            <>
              <Trash2 className="mr-2 h-5 w-5" />
              Delete Product
            </>
          )}
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="border-border bg-card rounded-[2rem] p-8 shadow-2xl">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-foreground text-2xl font-black tracking-tight">
            Destructive Action
          </AlertDialogTitle>
          <AlertDialogDescription className="text-muted-foreground pt-2 font-medium">
            Are you absolutely sure you want to permanently delete{' '}
            <span className="text-foreground font-black">&quot;{productName}&quot;</span>? This data
            will be wiped from our catalog and cannot be recovered.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="gap-3 pt-6">
          <AlertDialogCancel className="border-border hover:bg-muted h-12 rounded-xl font-bold">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onDelete}
            className="bg-destructive hover:bg-destructive/90 shadow-destructive/20 h-12 rounded-xl px-8 text-xs font-black tracking-widest text-white uppercase shadow-lg"
          >
            Confirm Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
