'use client';

import { Trash2 } from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';
import { BulkAction, BulkActionsToolbar } from '@/components/ui/bulk-actions-toolbar';
import {
  useBulkActivateProducts,
  useBulkDeactivateProducts,
  useBulkDeleteProducts,
} from '@/hooks/products-hooks';

interface ProductBulkActionsProps {
  selectedIds: string[];
  totalDisplayed: number;
  onClearSelection: () => void;
  onSuccess?: () => void;
}

export function ProductBulkActions({
  selectedIds,
  totalDisplayed,
  onClearSelection,
  onSuccess,
}: ProductBulkActionsProps) {
  const bulkDelete = useBulkDeleteProducts();
  const bulkActivate = useBulkActivateProducts();
  const bulkDeactivate = useBulkDeactivateProducts();

  const handleBulkAction = (
    action: 'activate' | 'deactivate' | 'delete',
    ids: string[],
    label: string
  ) => {
    if (action === 'delete') {
      if (!confirm(`Delete ${ids.length} products?`)) return;
      bulkDelete.mutate(ids, {
        onSuccess: () => {
          toast.success(`Deleted ${ids.length} products`);
          onClearSelection();
          onSuccess?.();
        },
      });
    } else if (action === 'activate') {
      bulkActivate.mutate(ids, {
        onSuccess: () => {
          toast.success(`Activated ${ids.length} products`);
          onClearSelection();
          onSuccess?.();
        },
      });
    } else {
      bulkDeactivate.mutate(ids, {
        onSuccess: () => {
          toast.success(`Deactivated ${ids.length} products`);
          onClearSelection();
          onSuccess?.();
        },
      });
    }
  };

  const actions: BulkAction[] = [
    {
      id: 'activate',
      label: 'Activate',
      variant: 'default',
      onClick: (ids) => handleBulkAction('activate', ids, 'Activated'),
    },
    {
      id: 'deactivate',
      label: 'Deactivate',
      variant: 'secondary',
      onClick: (ids) => handleBulkAction('deactivate', ids, 'Deactivated'),
    },
    {
      id: 'delete',
      label: 'Delete',
      icon: Trash2,
      variant: 'destructive',
      onClick: (ids) => handleBulkAction('delete', ids, 'Deleted'),
    },
  ];

  return (
    <BulkActionsToolbar
      selectedCount={selectedIds.length}
      totalCount={totalDisplayed}
      onClearSelection={onClearSelection}
      actions={actions}
      selectedIds={selectedIds}
      resourceName="product"
    />
  );
}
