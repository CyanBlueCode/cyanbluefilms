import fetch from 'node-fetch';

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

export default async function handler(req, res) {
  const { folder } = req.query;

  if (!folder) {
    return res.status(400).json({ error: 'Folder parameter is required' });
  }

  try {
    const response = await fetch(
      `https://api.imagekit.io/v1/files?path=${encodeURIComponent(folder)}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Basic ${Buffer.from(
            process.env.IMAGEKIT_PRIVATE_KEY + ':'
          ).toString('base64')}`,
        },
      }
    );

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`ImageKit API error: ${response.status} - ${error}`);
    }

    const data = await response.json();

    // Filter for images only and map to simpler format
    const images = data
      .filter((file) => file.fileType === 'image')
      .filter((file) => !file.name.toLowerCase().includes('cover'))
      .map((file) => ({
        id: file.fileId,
        name: file.name,
        filePath: file.filePath,
        width: file.width,
        height: file.height,
      }));

    // Sort images by name
    images.sort((a, b) => a.name.localeCompare(b.name));

    res.status(200).json(images);
  } catch (error) {
    console.error('ImageKit API error:', error);
    res.status(500).json({ error: error.message });
  }
}
