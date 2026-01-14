import type { Product } from '@/types/product';
interface ProductGridProps {
    products: Product[];
    isLoading?: boolean;
}
export declare function ProductGrid({ products, isLoading }: ProductGridProps): import("react/jsx-runtime").JSX.Element;
export {};
