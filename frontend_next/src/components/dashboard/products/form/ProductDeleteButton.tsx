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

      <AlertDialogContent className="rounded-[2rem] border-gray-100 p-8 shadow-2xl">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-2xl font-black tracking-tight text-gray-900">
            Destructive Action
          </AlertDialogTitle>
          <AlertDialogDescription className="pt-2 font-medium text-gray-500">
            Are you absolutely sure you want to permanently delete{' '}
            <span className="font-black text-gray-900">&quot;{productName}&quot;</span>? This data
            will be wiped from our catalog and cannot be recovered.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="gap-3 pt-6">
          <AlertDialogCancel className="h-12 rounded-xl border-gray-100 font-bold hover:bg-gray-50">
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
