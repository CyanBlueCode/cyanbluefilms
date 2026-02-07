import React from 'react';
import LandingPage from '@/components/landing/LandingPage';
import { useLandingPageCMSData } from '@/utils/useLandingPageCMSData';
import { transformCMSData } from '@/utils/cmsTransformAndManualConfigs';
import { enableTestVersionsByPage, highOctaneDefaultData, LoadingScreen } from '@/components/landing/landingPagesDefaultData';

const HighOctane = () => {
  const shouldUseCMS = enableTestVersionsByPage.highOctane;
  
  const cmsResult = useLandingPageCMSData(shouldUseCMS ? 'high-octane' : null);
  const data = cmsResult?.data ?? highOctaneDefaultData;
  const loading = cmsResult?.loading ?? false;
  const error = cmsResult?.error ?? null;
  
  const pageData = transformCMSData(data, 'high-octane');

  if (loading) return <LoadingScreen />;

  if (error) {
    console.warn('CMS Error, using fallback data:', error);
  }

  return (
    <LandingPage isDarkBackground={true} isLightText={true} {...pageData} />
  );
};

export const getStaticProps = async () => ({
  props: {
    hideConstructionBanner: true,
  },
});

export default HighOctane;
