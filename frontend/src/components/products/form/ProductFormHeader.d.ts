interface ProductFormHeaderProps {
    isEditMode: boolean;
    isSubmitting: boolean;
    isDirty: boolean;
    onBack: () => void;
    onSave: () => void;
}
export declare function ProductFormHeader({ isEditMode, isSubmitting, isDirty, onBack, onSave, }: ProductFormHeaderProps): import("react/jsx-runtime").JSX.Element;
export {};
