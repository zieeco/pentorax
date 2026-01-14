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
export declare function ProductsTable({ products, selectedIds, isAllSelected, isSomeSelected, onSelectRow, onSelectAll, onClearSelection, onDelete, onDuplicate, onBulkDelete, onBulkActivate, onBulkDeactivate, }: ProductsTableProps): import("react/jsx-runtime").JSX.Element;
export {};
