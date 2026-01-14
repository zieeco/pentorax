import type { UseFormSetValue } from 'react-hook-form';
import type { ProductFormData } from '@/types/product';
interface ProductCategorizationSectionProps {
    isActive: boolean;
    isFeatured: boolean;
    setValue: UseFormSetValue<ProductFormData>;
}
export declare function ProductCategorizationSection({ isActive, isFeatured, setValue, }: ProductCategorizationSectionProps): import("react/jsx-runtime").JSX.Element;
export {};
