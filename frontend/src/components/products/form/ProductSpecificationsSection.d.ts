import type { ProductSpecification } from '@/types/product';
interface ProductSpecificationsSectionProps {
    specifications: ProductSpecification[];
    onSpecificationsChange: (specs: ProductSpecification[]) => void;
}
export declare function ProductSpecificationsSection({ specifications, onSpecificationsChange, }: ProductSpecificationsSectionProps): import("react/jsx-runtime").JSX.Element;
export {};
