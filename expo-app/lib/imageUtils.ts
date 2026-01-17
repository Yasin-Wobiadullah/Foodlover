/**
 * Supabase Image Transformation Utilities
 * 
 * Provides helper functions to optimize images using Supabase's dynamic image transformation API.
 * Transforms storage URLs to render URLs with sizing and quality parameters.
 */

export interface ImageTransformOptions {
  width?: number;
  height?: number;
  quality?: number; // 20-100, default 80
  resize?: 'cover' | 'contain' | 'fill';
}

/**
 * Transform a Supabase storage URL to use the render API with optimization parameters
 * 
 * @param url - Original Supabase storage URL
 * @param options - Transformation options (width, height, quality, resize mode)
 * @returns Transformed URL with optimization parameters, or original URL if not a Supabase URL
 * 
 * @example
 * const optimized = getTransformedImageUrl(
 *   'https://project.supabase.co/storage/v1/object/public/bucket/image.jpg',
 *   { width: 400, height: 400, quality: 75, resize: 'cover' }
 * );
 * // Returns: https://project.supabase.co/storage/v1/render/image/public/bucket/image.jpg?width=400&height=400&quality=75&resize=cover
 */
export function getTransformedImageUrl(
  url: string | null | undefined,
  options: ImageTransformOptions = {}
): string {
  // Return fallback for null/undefined URLs
  if (!url) {
    return 'https://via.placeholder.com/400';
  }

  // Check if it's a Supabase storage URL
  if (!url.includes('/storage/v1/object/')) {
    return url; // Return original if not a Supabase URL
  }

  // Convert object URL to render URL
  const renderUrl = url.replace('/storage/v1/object/', '/storage/v1/render/image/');

  // Build query parameters
  const params = new URLSearchParams();
  
  if (options.width) {
    params.append('width', options.width.toString());
  }
  
  if (options.height) {
    params.append('height', options.height.toString());
  }
  
  if (options.quality) {
    const quality = Math.max(20, Math.min(100, options.quality));
    params.append('quality', quality.toString());
  }
  
  if (options.resize) {
    params.append('resize', options.resize);
  }

  const queryString = params.toString();
  return queryString ? `${renderUrl}?${queryString}` : renderUrl;
}

/**
 * Get optimized URL for recipe card images (3:4 aspect ratio)
 */
export function getRecipeCardImageUrl(url: string | null | undefined): string {
  return getTransformedImageUrl(url, {
    width: 400,
    height: 533,
    quality: 75,
    resize: 'cover',
  });
}

/**
 * Get optimized URL for recipe card images (1:1 aspect ratio for grid)
 */
export function getRecipeCardSquareImageUrl(url: string | null | undefined): string {
  return getTransformedImageUrl(url, {
    width: 400,
    height: 400,
    quality: 75,
    resize: 'cover',
  });
}

/**
 * Get thumbnail URL for recipe hero image placeholder (small, lower quality)
 */
export function getRecipeThumbnailUrl(url: string | null | undefined): string {
  return getTransformedImageUrl(url, {
    width: 400,
    height: 400,
    quality: 60,
    resize: 'cover',
  });
}

/**
 * Get optimized URL for ingredient avatar images
 */
export function getIngredientImageUrl(url: string | null | undefined): string {
  return getTransformedImageUrl(url, {
    width: 128,
    height: 128,
    quality: 70,
    resize: 'cover',
  });
}

/**
 * Get full resolution image URL (no transformation)
 */
export function getFullImageUrl(url: string | null | undefined): string {
  return url || 'https://via.placeholder.com/1200';
}
