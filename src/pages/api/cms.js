import { fetchSheetData } from '@/utils/googleSheets';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { page } = req.query;

  if (!page) {
    return res.status(400).json({ error: 'Page parameter is required' });
  }

  try {
    const data = await fetchSheetData(page);
    
    // Cache for 5 minutes in development, 1 hour in production
    const cacheTime = process.env.NODE_ENV === 'development' ? 300 : 3600;
    res.setHeader('Cache-Control', `s-maxage=${cacheTime}, stale-while-revalidate`);
    
    res.status(200).json(data);
  } catch (error) {
    console.error('CMS API Error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch CMS data',
      message: error.message 
    });
  }
}