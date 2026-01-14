interface ProductsPaginationProps {
    currentPage: number;
    totalPages: number;
    perPage: number;
    totalCount: number;
    hasNext: boolean;
    hasPrevious: boolean;
    onPageChange: (page: number) => void;
    onPageSizeChange: (size: string) => void;
}
export declare function ProductsPagination({ currentPage, totalPages, perPage, totalCount, hasNext, hasPrevious, onPageChange, onPageSizeChange, }: ProductsPaginationProps): import("react/jsx-runtime").JSX.Element | null;
export {};
