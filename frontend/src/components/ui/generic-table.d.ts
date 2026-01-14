import type { ColumnDef } from '@tanstack/react-table';
export interface BaseResource {
    id: string;
    [key: string]: any;
}
export interface TableColumn<T = any> {
    accessorKey: string;
    label: string;
    sortable?: boolean;
    accessor?: (item: T) => any;
    render?: (value: any, item: T) => React.ReactNode;
    width?: number;
}
export interface ActionItem<T = any> {
    label: string;
    onClick: (item: T) => void;
    variant?: 'default' | 'destructive';
    separator?: boolean;
}
interface CreateColumnsOptions<T extends BaseResource> {
    columns: TableColumn<T>[];
    actions?: ActionItem<T>[];
    resourceName?: string;
    enableSelection?: boolean;
}
export declare function createTableColumns<T extends BaseResource>({ columns, actions, resourceName, enableSelection, }: CreateColumnsOptions<T>): ColumnDef<T>[];
export {};
