import type { ProductImage } from '@/types/product';
interface ProductImagesSectionProps {
    images: ProductImage[];
    onImagesChange: (images: ProductImage[]) => void;
    onImageUpload: (file: File) => Promise<string>;
    isUploading: boolean;
}
export declare function ProductImagesSection({ images, onImagesChange, onImageUpload, isUploading, }: ProductImagesSectionProps): import("react/jsx-runtime").JSX.Element;
export {};
