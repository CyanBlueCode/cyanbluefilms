/**
 * Generates an optimized ImageKit URL with transformations
 * @param {string} filePath - Path to the image file
 * @param {Object} options - Transformation options
 * @returns {string} Optimized image URL
 */
export const generateImageKitUrl = (filePath, options = {}) => {
  const baseUrl = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT;

  // Build transformation string
  const transformations = [];

  if (options.width) transformations.push(`w-${options.width}`);
  if (options.height) transformations.push(`h-${options.height}`);
  if (options.crop) transformations.push(`c-${options.crop}`);
  if (options.quality) transformations.push(`q-${options.quality}`);
  if (options.format) transformations.push(`f-${options.format}`);

  // Always add progressive loading
  transformations.push('pr-true');

  const trParam = transformations.join(',');

  // Add cache buster for production
  const cacheBuster =
    process.env.NODE_ENV === 'production' ? `&v=${Date.now()}` : '';

  return `${baseUrl}${filePath}${
    trParam ? `?tr=${trParam}${cacheBuster}` : ''
  }`;
};

/**
 * Generates an optimized video URL from ImageKit
 * @param {Object} options - Video configuration options
 * @returns {string} Optimized video URL
 */
export const generateVideoUrl = (options = {}) => {
  const {
    filePath,
    vidWidth = '1920',
    codec = 'h264',
    audio = false,
    forceRatio,
    custom
  } = options;

  if (!filePath) return '';

  const baseUrl = 'https://ik.imagekit.io/cyanbluefilms';
  const transformations = [`w-${vidWidth}`, `vc-${codec}`];
  
  if (!audio) transformations.push('ac-none');
  if (forceRatio) transformations.push(`ar-${forceRatio.replace(':', '-')}`);
  if (custom) transformations.push(custom.replace(/^,/, ''));

  return `${baseUrl}${filePath}?tr=${transformations.join(',')}`;
};

/**
 * Generates a thumbnail URL for gallery display
 * @param {string} filePath - Path to the image file
 * @returns {string} Thumbnail URL
 */
export const getThumbnailUrl = (filePath) =>
  generateImageKitUrl(filePath, {
    width: 800,
    height: 800,
    crop: 'at_least',
    quality: 85,
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
    quality: 85,
    format: 'webp',
  });
