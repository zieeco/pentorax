/**
 * ProductsPage - Admin product management list view
 * Uses URL search params for bookmarkable pagination
 */
import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { 
  useProductsPaginated, 
  useCategories, 
  useDeleteProduct, 
  useDuplicateProduct,
  useBulkDeleteProducts,
  useBulkActivateProducts,
  useBulkDeactivateProducts
} from '@/hooks/useApi';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableHead, 
  TableRow, 
  TableCell 
} from '@/components/ui/table';
import { BulkActionsToolbar, type BulkAction } from '@/components/ui/bulk-actions-toolbar';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from '@/components/ui/pagination';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Copy, 
  Loader2, 
  Package,
  Filter,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { toast } from 'sonner';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';

// Helper to format price
const formatPrice = (price: string | number) => {
  const num = typeof price === 'string' ? parseFloat(price) : price;
  return num.toLocaleString('en-NG');
};

// Page size options
const PAGE_SIZE_OPTIONS = [10, 20, 50, 100];
const DEFAULT_PAGE_SIZE = 20;

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

interface Category {
  id: string;
  name: string;
  slug: string;
}

export default function ProductsPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [searchInput, setSearchInput] = useState(searchParams.get('search') || '');

  // Get params from URL with defaults (ecommerce standard: page, per_page, sort, order)
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const perPage = parseInt(searchParams.get('per_page') || String(DEFAULT_PAGE_SIZE), 10);
  const search = searchParams.get('search') || '';
  const categoryFilter = searchParams.get('category') || '';

  // Update URL params helper
  const updateParams = (updates: Record<string, string | null>) => {
    const newParams = new URLSearchParams(searchParams);
    
    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === '') {
        newParams.delete(key);
      } else {
        newParams.set(key, value);
      }
    });
    
    setSearchParams(newParams);
  };

  // Fetch products with filters and pagination from URL params
  const { data: paginatedData, isLoading, refetch } = useProductsPaginated({ 
    search: search || undefined, 
    category: categoryFilter || undefined,
    page: currentPage,
    per_page: perPage,
  });
  
  const products = paginatedData?.results || [];
  const totalCount = paginatedData?.count || 0;
  const totalPages = paginatedData?.totalPages || 1;
  const hasNext = paginatedData?.hasNext || false;
  const hasPrevious = paginatedData?.hasPrevious || false;
  
  const { data: categories = [] } = useCategories();
  
  const deleteProduct = useDeleteProduct();
  const duplicateProduct = useDuplicateProduct();
  const bulkDelete = useBulkDeleteProducts();
  const bulkActivate = useBulkActivateProducts();
  const bulkDeactivate = useBulkDeactivateProducts();

  // Handle row selection
  const handleSelectRow = (productId: string, checked: boolean) => {
    setSelectedIds(prev => 
      checked 
        ? [...prev, productId]
        : prev.filter(id => id !== productId)
    );
  };

  const handleSelectAll = (checked: boolean) => {
    setSelectedIds(checked ? (products as Product[]).map(p => p.id) : []);
  };

  const handleClearSelection = () => setSelectedIds([]);

  // Pagination handlers - update URL params
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      updateParams({ page: page === 1 ? null : String(page) });
      setSelectedIds([]); // Clear selection on page change
    }
  };

  const handlePageSizeChange = (newSize: string) => {
    updateParams({ 
      per_page: newSize === String(DEFAULT_PAGE_SIZE) ? null : newSize,
      page: null, // Reset to page 1 when changing size
    });
    setSelectedIds([]);
  };

  const handleCategoryChange = (category: string) => {
    updateParams({ 
      category: category === 'all' ? null : category,
      page: null, // Reset to page 1 when filtering
    });
    setSelectedIds([]);
  };

  // CRUD Handlers
  const handleDelete = async (slug: string) => {
    deleteProduct.mutate(slug, {
      onSuccess: () => {
        toast.success('Product deleted successfully');
        refetch();
      },
      onError: () => {
        toast.error('Failed to delete product');
      },
    });
  };

  const handleDuplicate = (slug: string) => {
    duplicateProduct.mutate(slug, {
      onSuccess: () => {
        toast.success('Product duplicated successfully');
        refetch();
      },
      onError: () => {
        toast.error('Failed to duplicate product');
      },
    });
  };

  const handleBulkDelete = async (ids: string[]) => {
    try {
      await bulkDelete.mutateAsync(ids);
      toast.success(`Deleted ${ids.length} product${ids.length > 1 ? 's' : ''}`);
      setSelectedIds([]);
      refetch();
    } catch (error) {
      toast.error('Failed to delete products');
    }
  };

  const handleBulkActivate = async (ids: string[]) => {
    try {
      await bulkActivate.mutateAsync(ids);
      toast.success(`Activated ${ids.length} product${ids.length > 1 ? 's' : ''}`);
      setSelectedIds([]);
      refetch();
    } catch (error) {
      toast.error('Failed to activate products');
    }
  };

  const handleBulkDeactivate = async (ids: string[]) => {
    try {
      await bulkDeactivate.mutateAsync(ids);
      toast.success(`Deactivated ${ids.length} product${ids.length > 1 ? 's' : ''}`);
      setSelectedIds([]);
      refetch();
    } catch (error) {
      toast.error('Failed to deactivate products');
    }
  };
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateParams({ 
      search: searchInput || null,
      page: null, // Reset to page 1 on search
    });
  };

  // Bulk actions configuration
  const bulkActions: BulkAction[] = [
    {
      id: 'delete',
      label: 'Delete Selected',
      icon: Trash2,
      variant: 'destructive',
      onClick: handleBulkDelete,
    },
    {
      id: 'activate',
      label: 'Activate Selected',
      icon: Package,
      variant: 'default',
      onClick: handleBulkActivate,
    },
    {
      id: 'deactivate',
      label: 'Deactivate Selected',
      icon: Package,
      variant: 'secondary',
      onClick: handleBulkDeactivate,
    },
  ];

  const isAllSelected = (products as Product[]).length > 0 && selectedIds.length === (products as Product[]).length;
  const isSomeSelected = selectedIds.length > 0 && !isAllSelected;

  // Calculate showing range
  const showingFrom = totalCount === 0 ? 0 : ((currentPage - 1) * perPage) + 1;
  const showingTo = Math.min(currentPage * perPage, totalCount);

  return (
    <div className="space-y-6">
      {/* Header */}
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

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
        <form onSubmit={handleSearch} className="flex gap-4 flex-wrap">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search products..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select 
            value={categoryFilter || 'all'} 
            onValueChange={handleCategoryChange}
          >
            <SelectTrigger className="w-[180px]">
              <Filter className="h-4 w-4 mr-2 text-gray-400" />
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {(categories as Category[]).map((cat) => (
                <SelectItem key={cat.id} value={cat.slug}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Button type="submit" variant="secondary">
            <Search className="mr-2 h-4 w-4" />
            Search
          </Button>
        </form>
      </div>

      {/* Bulk Actions Toolbar */}
      <BulkActionsToolbar
        selectedCount={selectedIds.length}
        totalCount={(products as Product[]).length}
        onClearSelection={handleClearSelection}
        actions={bulkActions}
        selectedIds={selectedIds}
        resourceName="product"
      />

      {/* Products Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-3 text-gray-600">Loading products...</span>
          </div>
        ) : (products as Product[]).length === 0 ? (
          <div className="text-center py-20">
            <Package className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 mb-4">No products found</p>
            <Button asChild>
              <Link to="/dashboard/products/new">
                <Plus className="mr-2 h-4 w-4" />
                Add Your First Product
              </Link>
            </Button>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50/50">
                <TableHead className="w-12">
                  <Checkbox
                    checked={isAllSelected || (isSomeSelected && 'indeterminate')}
                    onCheckedChange={handleSelectAll}
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
              {(products as Product[]).map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedIds.includes(product.id)}
                      onCheckedChange={(checked) => handleSelectRow(product.id, !!checked)}
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
                        <DropdownMenuItem onClick={() => handleDuplicate(product.slug)}>
                          <Copy className="mr-2 h-4 w-4" />
                          Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          onClick={() => handleDelete(product.slug)}
                          className="text-red-600 focus:bg-red-50 focus:text-red-600"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      {/* Pagination Bar */}
      {!isLoading && totalCount > 0 && (
        <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
          {/* Items per page selector */}
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500">Items per page:</span>
            <Select 
              value={String(perPage)} 
              onValueChange={handlePageSizeChange}
            >
              <SelectTrigger className="w-[80px] h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {PAGE_SIZE_OPTIONS.map((size) => (
                  <SelectItem key={size} value={String(size)}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <span className="text-sm text-gray-500">
              Showing {showingFrom} - {showingTo} of {totalCount}
            </span>
          </div>

          {/* Page navigation */}
          {totalPages > 1 && (
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={!hasPrevious}
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous
              </Button>
              
              <div className="flex items-center gap-1">
                {/* First page */}
                {currentPage > 2 && (
                  <Button
                    variant={currentPage === 1 ? "secondary" : "ghost"}
                    size="sm"
                    onClick={() => handlePageChange(1)}
                    className="w-8 h-8 p-0"
                  >
                    1
                  </Button>
                )}
                
                {/* Ellipsis before */}
                {currentPage > 3 && (
                  <span className="px-2 text-gray-400">...</span>
                )}
                
                {/* Previous page */}
                {currentPage > 1 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handlePageChange(currentPage - 1)}
                    className="w-8 h-8 p-0"
                  >
                    {currentPage - 1}
                  </Button>
                )}
                
                {/* Current page */}
                <Button
                  variant="secondary"
                  size="sm"
                  className="w-8 h-8 p-0"
                >
                  {currentPage}
                </Button>
                
                {/* Next page */}
                {currentPage < totalPages && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handlePageChange(currentPage + 1)}
                    className="w-8 h-8 p-0"
                  >
                    {currentPage + 1}
                  </Button>
                )}
                
                {/* Ellipsis after */}
                {currentPage < totalPages - 2 && (
                  <span className="px-2 text-gray-400">...</span>
                )}
                
                {/* Last page */}
                {currentPage < totalPages - 1 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handlePageChange(totalPages)}
                    className="w-8 h-8 p-0"
                  >
                    {totalPages}
                  </Button>
                )}
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={!hasNext}
              >
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
