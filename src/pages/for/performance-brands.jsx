import React from 'react';
import LandingPage from '@/components/landing/LandingPage';
import { useLandingPageCMSData } from '@/utils/useLandingPageCMSData';
import { transformCMSData } from '@/utils/cmsTransformAndManualConfigs';
import { enableTestVersionsByPage, performanceBrandsDefaultData, LoadingScreen } from '@/components/landing/landingPagesDefaultData';

const PerformanceBrands = () => {
  const shouldUseCMS = enableTestVersionsByPage.performanceBrands;
  
  const cmsResult = useLandingPageCMSData(shouldUseCMS ? 'combat-sports' : null);
  const data = cmsResult?.data ?? performanceBrandsDefaultData;
  const loading = cmsResult?.loading ?? false;
  const error = cmsResult?.error ?? null;
  
  const pageData = transformCMSData(data, 'combat-sports');

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

export default PerformanceBrands;
