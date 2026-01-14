import type { UseFormRegister, FieldErrors, Control } from 'react-hook-form';
import type { ProductFormData } from '@/types/product';
import type { Category } from '@/types/product';
interface ProductPricingSectionProps {
    register: UseFormRegister<ProductFormData>;
    control: Control<ProductFormData>;
    errors: FieldErrors<ProductFormData>;
    categories: Category[];
}
export declare function ProductPricingSection({ register, control, errors, categories, }: ProductPricingSectionProps): import("react/jsx-runtime").JSX.Element;
export {};
