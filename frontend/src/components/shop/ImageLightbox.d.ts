interface ImageData {
    image_url: string;
    alt_text?: string;
}
interface ImageLightboxProps {
    images: ImageData[];
    initialIndex: number;
    isOpen: boolean;
    onClose: () => void;
}
export declare function ImageLightbox({ images, initialIndex, isOpen, onClose }: ImageLightboxProps): import("react/jsx-runtime").JSX.Element | null;
export {};
