// components/products/ProductsHeader.tsx
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Plus, Package } from 'lucide-react';

export const ProductsHeader = () => (
  <div className="flex items-center justify-between">
    <div>
      <h1 className="text-3xl font-black text-gray-900 flex items-center gap-3">
        <Package className="h-8 w-8 text-primary" />
        Products
      </h1>
      <p className="text-gray-500 mt-1">Manage your product catalog</p>
    </div>
    <Button asChild>
      <Link to="/dashboard/products/new">
        <Plus className="mr-2 h-4 w-4" />
        Add Product
      </Link>
    </Button>
  </div>
);
