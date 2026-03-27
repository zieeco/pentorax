/**
 * Product utility functions
 * Reusable helper functions for product operations
 */

/**
 * Format price with Nigerian Naira formatting
 */
export function formatPrice(price: string | number): string {
  const num = typeof price === 'string' ? parseFloat(price) : price;
  return num.toLocaleString('en-NG');
}

/**
 * Calculate discount percentage
 */
export function calculateDiscount(price: string | number, comparePrice: string | number): number {
  const priceNum = typeof price === 'string' ? parseFloat(price) : price;
  const comparePriceNum =
    typeof comparePrice === 'string' ? parseFloat(comparePrice) : comparePrice;

  if (comparePriceNum <= priceNum) return 0;

  return Math.round(((comparePriceNum - priceNum) / comparePriceNum) * 100);
}

/**
 * Generate slug from product name
 */
export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

/**
 * Check if product is low stock
 */
export function isLowStock(stockQuantity: number, threshold: number): boolean {
  return stockQuantity > 0 && stockQuantity <= threshold;
}

/**
 * Get stock status badge variant
 */
export function getStockStatusVariant(
  stockQuantity: number,
  isLowStock: boolean
): 'destructive' | 'outline' | 'default' {
  if (stockQuantity === 0) return 'destructive';
  if (isLowStock) return 'outline';
  return 'default';
}

/**
 * Get stock status text
 */
export function getStockStatusText(stockQuantity: number, isLowStock: boolean): string {
  if (stockQuantity === 0) return 'Out of Stock';
  if (isLowStock) return `Low (${stockQuantity})`;
  return `In Stock (${stockQuantity})`;
}

/**
 * Validate product form data
 */
export function validateProductForm(data: any): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!data.name || data.name.trim() === '') {
    errors.push('Product name is required');
  }

  if (!data.price || parseFloat(data.price) <= 0) {
    errors.push('Valid price is required');
  }

  if (!data.description || data.description.trim() === '') {
    errors.push('Product description is required');
  }

  if (!data.category_id) {
    errors.push('Category is required');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Format file size for display
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

/**
 * Validate image file
 */
export function validateImageFile(file: File): {
  isValid: boolean;
  error?: string;
} {
  const maxSize = 5 * 1024 * 1024; // 5MB
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];

  if (!allowedTypes.includes(file.type)) {
    return {
      isValid: false,
      error: 'Only JPG, PNG, and WEBP images are allowed',
    };
  }

  if (file.size > maxSize) {
    return {
      isValid: false,
      error: `Image size must be less than ${formatFileSize(maxSize)}`,
    };
  }

  return { isValid: true };
}
