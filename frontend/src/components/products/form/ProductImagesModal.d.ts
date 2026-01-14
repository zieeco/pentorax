import type { ProductImage } from '@/types/product';
interface ProductImagesModalProps {
    isOpen: boolean;
    onClose: () => void;
    images: ProductImage[];
    onImagesChange: (images: ProductImage[]) => void;
    onImageUpload: (file: File) => Promise<string>;
    isUploading: boolean;
}
export declare function ProductImagesModal({ isOpen, onClose, images, onImagesChange, onImageUpload, isUploading, }: ProductImagesModalProps): import("react/jsx-runtime").JSX.Element;
export {};
