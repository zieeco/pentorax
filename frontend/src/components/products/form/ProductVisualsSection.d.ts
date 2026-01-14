import type { UseFormRegister } from 'react-hook-form';
import type { ProductFormData } from '@/types/product';
interface ProductVisualsSectionProps {
    register: UseFormRegister<ProductFormData>;
    featuredImage: string;
    imagePreview: string;
    isUploading: boolean;
    onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export declare function ProductVisualsSection({ register, featuredImage, imagePreview, isUploading, onImageUpload, }: ProductVisualsSectionProps): import("react/jsx-runtime").JSX.Element;
export {};
