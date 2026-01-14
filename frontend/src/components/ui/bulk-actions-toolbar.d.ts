export interface BulkAction {
    id: string;
    label: string;
    icon?: React.ComponentType<{
        className?: string;
    }>;
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
    onClick: (selectedIds: string[]) => void;
    disabled?: boolean;
    loading?: boolean;
}
interface BulkActionsToolbarProps {
    selectedCount: number;
    totalCount: number;
    onClearSelection: () => void;
    actions: BulkAction[];
    selectedIds: string[];
    resourceName: string;
    className?: string;
}
export declare function BulkActionsToolbar({ selectedCount, totalCount, onClearSelection, actions, selectedIds, resourceName, className, }: BulkActionsToolbarProps): import("react/jsx-runtime").JSX.Element | null;
export {};
