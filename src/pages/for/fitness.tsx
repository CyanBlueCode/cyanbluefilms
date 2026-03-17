import React from 'react';
import LandingPage from '@/components/landing/LandingPage';
import { useLandingPageCMSData } from '@/utils/useLandingPageCMSData';
import { transformCMSData } from '@/utils/cmsTransformAndManualConfigs';
import { enableTestVersionsByPage, fitnessDefaultData, LoadingScreen } from '@/components/landing/landingPagesDefaultData';

const Fitness = () => {
  const shouldUseCMS = enableTestVersionsByPage.fitness;
  
  const cmsResult = useLandingPageCMSData(shouldUseCMS ? 'fitness' : null);
  const data = cmsResult?.data ?? fitnessDefaultData;
  const loading = cmsResult?.loading ?? false;
  const error = cmsResult?.error ?? null;
  
  const pageData = transformCMSData(data, 'fitness');

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

export default Fitness;
