interface ImageData {
    image_url: string;
    alt_text?: string;
}
interface ProductImageGalleryProps {
    images: ImageData[];
    productName: string;
}
export declare function ProductImageGallery({ images, productName }: ProductImageGalleryProps): import("react/jsx-runtime").JSX.Element;
export {};
