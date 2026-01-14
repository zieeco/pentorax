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
export declare function ProductRow({ product, isSelected, onSelect, onDelete, onDuplicate, }: ProductRowProps): import("react/jsx-runtime").JSX.Element;
export {};
