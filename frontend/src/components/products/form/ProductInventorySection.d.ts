import type { UseFormRegister, FieldErrors } from 'react-hook-form';
import type { ProductFormData } from '@/types/product';
interface ProductInventorySectionProps {
    register: UseFormRegister<ProductFormData>;
    errors: FieldErrors<ProductFormData>;
}
export declare function ProductInventorySection({ register, errors, }: ProductInventorySectionProps): import("react/jsx-runtime").JSX.Element;
export {};
