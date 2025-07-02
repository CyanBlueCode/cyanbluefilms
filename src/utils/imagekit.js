/**
 * Generates an optimized ImageKit URL with transformations
 * @param {string} filePath - Path to the image file
 * @param {Object} options - Transformation options
 * @returns {string} Optimized image URL
 */

export const generateImageKitUrl = (filePath, options = {}) => {
  const baseUrl = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT;
  const transformations = [];

  if (options.width) transformations.push(`w-${options.width}`);
  if (options.height) transformations.push(`h-${options.height}`);
  if (options.crop) transformations.push(`c-${options.crop}`);
  if (options.quality) transformations.push(`q-${options.quality}`);
  if (options.format) transformations.push(`f-${options.format}`);
  transformations.push('pr-true');

  const trString = transformations.join(',');

  return `${baseUrl}${filePath}?tr=${trString}`;
};

// NOTE image request size controls here
// constructed params should look like: ?tr=w-600,h-600,c-at_least,q-80,f-webp

/**
 * Generates a thumbnail URL for gallery display
 * @param {string} filePath - Path to the image file
 * @returns {string} Thumbnail URL
 */
export const getThumbnailUrl = (filePath) =>
  generateImageKitUrl(filePath, {
    width: 600,
    height: 600,
    crop: 'at_least',
    quality: 80,
    format: 'webp',
  });

/**
 * Generates an optimized URL for lightbox display
 * @param {string} filePath - Path to the image file
 * @returns {string} Optimized image URL
 */
export const getOptimizedImageUrl = (filePath) =>
  generateImageKitUrl(filePath, {
    quality: 85,
    format: 'webp',
  });

/**
 * Generates a cover image URL with specific dimensions
 * @param {string} filePath - Path to the cover image
 * @returns {string} Cover image URL
 */
export const getCoverImageUrl = (filePath) =>
  generateImageKitUrl(filePath, {
    width: 800,
    height: 800,
    crop: 'at_least',
    quality: 80,
    format: 'webp',
  });
