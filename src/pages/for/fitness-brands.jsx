import React from 'react';
import LandingPage from '@/components/landing/LandingPage';
import { useLandingPageCMSData } from '@/utils/useLandingPageCMSData';
import { transformCMSData } from '@/utils/cmsTransformAndManualConfigs';
import { enableTestVersionsByPage, fitnessBrandsDefaultData, LoadingScreen } from '@/components/landing/landingPagesDefaultData';

const FitnessBrands = () => {
  const shouldUseCMS = enableTestVersionsByPage.fitnessBrands;
  
  const cmsResult = useLandingPageCMSData(shouldUseCMS ? 'fitness-brands' : null);
  const data = cmsResult?.data ?? fitnessBrandsDefaultData;
  const loading = cmsResult?.loading ?? false;
  const error = cmsResult?.error ?? null;
  
  const pageData = transformCMSData(data, 'fitness-brands');

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

export default FitnessBrands;
