import type { ProductSpecification } from '@/types/product';
interface ProductSpecificationsModalProps {
    isOpen: boolean;
    onClose: () => void;
    specifications: ProductSpecification[];
    onSpecificationsChange: (specs: ProductSpecification[]) => void;
}
export declare function ProductSpecificationsModal({ isOpen, onClose, specifications, onSpecificationsChange, }: ProductSpecificationsModalProps): import("react/jsx-runtime").JSX.Element;
export {};
