import { useState, useEffect } from 'react';

/**
 * Custom hook to fetch landing page data from CMS
 * @param {string|null} pageName - Name of the page/sheet to fetch, null to skip
 * @returns {Object|null} { data, loading, error } or null if pageName is null
 */
export const useLandingPageCMSData = (pageName) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(!!pageName);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!pageName) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`/api/cms?page=${encodeURIComponent(pageName)}`);
        
        if (!response.ok) {
          setError(`Failed to fetch CMS data: ${response.status}`);
          return;
        }
        
        const cmsData = await response.json();
        setData(cmsData);
      } catch (err) {
        console.error('CMS fetch error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [pageName]);

  return pageName ? { data, loading, error } : null;
};