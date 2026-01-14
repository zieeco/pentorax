import type { UseFormRegister, UseFormSetValue, UseFormWatch, FieldErrors } from 'react-hook-form';
import type { ProductFormData } from '@/types/product';
interface ProductBasicInfoSectionProps {
    register: UseFormRegister<ProductFormData>;
    setValue: UseFormSetValue<ProductFormData>;
    watch: UseFormWatch<ProductFormData>;
    errors: FieldErrors<ProductFormData>;
    isEditMode: boolean;
}
export declare function ProductBasicInfoSection({ register, setValue, watch, errors, isEditMode, }: ProductBasicInfoSectionProps): import("react/jsx-runtime").JSX.Element;
export {};
