/**
 * ProductRow - Single product table row
 */
import { useNavigate } from 'react-router-dom';
import { TableRow, TableCell } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Edit, Trash2, Copy, Package } from 'lucide-react';

interface Product {
  id: string;
  slug: string;
  name: string;
  short_description: string;
  price: string;
  compare_at_price: string | null;
  featured_image: string;
  category_name: string;
  is_active: boolean;
  is_featured: boolean;
  stock_quantity?: number;
  is_low_stock?: boolean;
}

interface ProductRowProps {
  product: Product;
  isSelected: boolean;
  onSelect: (checked: boolean) => void;
  onDelete: () => void;
  onDuplicate: () => void;
}

const formatPrice = (price: string | number) => {
  const num = typeof price === 'string' ? parseFloat(price) : price;
  return num.toLocaleString('en-NG');
};

export function ProductRow({
  product,
  isSelected,
  onSelect,
  onDelete,
  onDuplicate,
}: ProductRowProps) {
  const navigate = useNavigate();

  return (
    <TableRow>
      <TableCell>
        <Checkbox
          checked={isSelected}
          onCheckedChange={onSelect}
          aria-label={`Select ${product.name}`}
        />
      </TableCell>
      
      <TableCell>
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
            {product.featured_image ? (
              <img
                src={product.featured_image}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center">
                <Package className="h-6 w-6 text-gray-300" />
              </div>
            )}
          </div>
          <div className="min-w-0">
            <div className="font-bold text-gray-900 truncate max-w-[200px]">
              {product.name}
            </div>
            <div className="text-xs text-gray-400 truncate max-w-[200px]">
              {product.short_description}
            </div>
          </div>
        </div>
      </TableCell>
      
      <TableCell>
        <Badge variant="secondary" className="font-medium">
          {product.category_name || 'Uncategorized'}
        </Badge>
      </TableCell>
      
      <TableCell>
        <div className="font-bold text-gray-900">
          ₦{formatPrice(product.price)}
        </div>
        {product.compare_at_price && (
          <div className="text-xs text-gray-400 line-through">
            ₦{formatPrice(product.compare_at_price)}
          </div>
        )}
      </TableCell>
      
      <TableCell>
        {product.stock_quantity !== undefined ? (
          <Badge 
            variant={
              product.stock_quantity === 0 ? "destructive" :
              product.is_low_stock ? "outline" :
              "default"
            }
            className={
              product.stock_quantity === 0 ? "" :
              product.is_low_stock ? "border-orange-300 text-orange-700 bg-orange-50" :
              "bg-green-100 text-green-700 hover:bg-green-100"
            }
          >
            {product.stock_quantity === 0 ? 'Out of Stock' :
             product.is_low_stock ? `Low (${product.stock_quantity})` :
             `In Stock (${product.stock_quantity})`}
          </Badge>
        ) : (
          <span className="text-xs text-gray-400">N/A</span>
        )}
      </TableCell>
      
      <TableCell>
        <div className="flex flex-col gap-1">
          <Badge 
            variant={product.is_active ? "default" : "secondary"}
            className={product.is_active ? "bg-green-100 text-green-700 hover:bg-green-100" : ""}
          >
            {product.is_active ? 'Active' : 'Draft'}
          </Badge>
          {product.is_featured && (
            <Badge variant="outline" className="text-amber-600 border-amber-200">
              Featured
            </Badge>
          )}
        </div>
      </TableCell>
      
      <TableCell className="text-right">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem 
              onClick={() => navigator.clipboard.writeText(product.id)}
            >
              Copy ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate(`/dashboard/products/${product.slug}/edit`)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onDuplicate}>
              <Copy className="mr-2 h-4 w-4" />
              Duplicate
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              onClick={onDelete}
              className="text-red-600 focus:bg-red-50 focus:text-red-600"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}
