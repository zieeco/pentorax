interface Category {
    id: string;
    name: string;
    slug: string;
}
interface ProductsFiltersProps {
    searchInput: string;
    categoryFilter: string;
    categories: Category[];
    onSearchInputChange: (value: string) => void;
    onSearch: (e: React.FormEvent) => void;
    onCategoryChange: (category: string) => void;
}
export declare function ProductsFilters({ searchInput, categoryFilter, categories, onSearchInputChange, onSearch, onCategoryChange, }: ProductsFiltersProps): import("react/jsx-runtime").JSX.Element;
export {};
