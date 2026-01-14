import type { ProductSpecification } from '@/types/product';
interface AISuggestionsAlertProps {
    specifications: ProductSpecification[];
    isLoading: boolean;
    onAccept: (specs: ProductSpecification[]) => void;
    onReject: () => void;
}
export declare function AISuggestionsAlert({ specifications, isLoading, onAccept, onReject, }: AISuggestionsAlertProps): import("react/jsx-runtime").JSX.Element | null;
export {};
