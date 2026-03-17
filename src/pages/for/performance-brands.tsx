import React from 'react';
import LandingPage from '@/components/landing/LandingPage';
import { useLandingPageCMSData } from '@/utils/useLandingPageCMSData';
import { transformCMSData } from '@/utils/cmsTransformAndManualConfigs';
import {
  enableTestVersionsByPage,
  combatSportsDefaultData,
  LoadingScreen,
} from '@/components/landing/landingPagesDefaultData';
// TODO need to update new defaults to combatSports/performanceBrands default data

const PerformanceBrands = () => {
  const shouldUseCMS = enableTestVersionsByPage.performanceBrands;

  const cmsResult = useLandingPageCMSData(
    shouldUseCMS ? 'performance-brands' : null,
  );
  const data = cmsResult?.data ?? combatSportsDefaultData;
  const loading = cmsResult?.loading ?? false;
  const error = cmsResult?.error ?? null;

  const pageData = transformCMSData(data, 'performance-brands');

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
