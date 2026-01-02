/**
 * ProductsTable - Table display with bulk actions
 */
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableHead, 
  TableRow, 
  TableCell 
} from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { BulkActionsToolbar, type BulkAction } from '@/components/ui/bulk-actions-toolbar';
import { ProductRow } from '@/components/products/ProductRow';
import { Trash2, Package as PackageIcon } from 'lucide-react';

interface Product {
  id: string;
  slug: string;
  name: string;
  short_description: string;
  price: string;
  compare_at_price: string | null;
  discount_percentage: number;
  featured_image: string;
  category_name: string;
  is_active: boolean;
  is_featured: boolean;
  in_stock: boolean;
  created_at: string;
  sku?: string;
  stock_quantity?: number;
  is_low_stock?: boolean;
}

interface ProductsTableProps {
  products: Product[];
  selectedIds: string[];
  isAllSelected: boolean;
  isSomeSelected: boolean;
  onSelectRow: (productId: string, checked: boolean) => void;
  onSelectAll: (checked: boolean) => void;
  onClearSelection: () => void;
  onDelete: (slug: string) => void;
  onDuplicate: (slug: string) => void;
  onBulkDelete: (ids: string[]) => void;
  onBulkActivate: (ids: string[]) => void;
  onBulkDeactivate: (ids: string[]) => void;
}

export function ProductsTable({
  products,
  selectedIds,
  isAllSelected,
  isSomeSelected,
  onSelectRow,
  onSelectAll,
  onClearSelection,
  onDelete,
  onDuplicate,
  onBulkDelete,
  onBulkActivate,
  onBulkDeactivate,
}: ProductsTableProps) {
  const bulkActions: BulkAction[] = [
    {
      id: 'delete',
      label: 'Delete Selected',
      icon: Trash2,
      variant: 'destructive',
      onClick: onBulkDelete,
    },
    {
      id: 'activate',
      label: 'Activate Selected',
      icon: PackageIcon,
      variant: 'default',
      onClick: onBulkActivate,
    },
    {
      id: 'deactivate',
      label: 'Deactivate Selected',
      icon: PackageIcon,
      variant: 'secondary',
      onClick: onBulkDeactivate,
    },
  ];

  return (
    <>
      {/* Bulk Actions Toolbar */}
      <BulkActionsToolbar
        selectedCount={selectedIds.length}
        totalCount={products.length}
        onClearSelection={onClearSelection}
        actions={bulkActions}
        selectedIds={selectedIds}
        resourceName="product"
      />

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50/50">
              <TableHead className="w-12">
                <Checkbox
                  checked={isAllSelected || (isSomeSelected && 'indeterminate')}
                  onCheckedChange={onSelectAll}
                  aria-label="Select all"
                />
              </TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <ProductRow
                key={product.id}
                product={product}
                isSelected={selectedIds.includes(product.id)}
                onSelect={(checked) => onSelectRow(product.id, checked)}
                onDelete={() => onDelete(product.slug)}
                onDuplicate={() => onDuplicate(product.slug)}
              />
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
