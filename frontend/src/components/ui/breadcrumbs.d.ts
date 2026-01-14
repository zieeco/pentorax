export interface BreadcrumbItem {
    label: string;
    href?: string;
}
interface BreadcrumbsProps {
    items: BreadcrumbItem[];
    className?: string;
}
export declare function Breadcrumbs({ items, className }: BreadcrumbsProps): import("react/jsx-runtime").JSX.Element;
export {};
