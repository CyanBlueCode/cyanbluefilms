import React from 'react';
import LandingPage from '@/components/landing/LandingPage';
import { useLandingPageCMSData } from '@/utils/useLandingPageCMSData';
import { transformCMSData } from '@/utils/cmsTransformAndManualConfigs';
import { enableTestVersionsByPage, actionSportsDefaultData, LoadingScreen } from '@/components/landing/landingPagesDefaultData';

const ActionSports = () => {
  const shouldUseCMS = enableTestVersionsByPage.actionSports;
  
  const cmsResult = useLandingPageCMSData(shouldUseCMS ? 'action-sports' : null);
  const data = cmsResult?.data ?? actionSportsDefaultData;
  const loading = cmsResult?.loading ?? false;
  const error = cmsResult?.error ?? null;
  
  const pageData = transformCMSData(data, 'action-sports');

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

export default ActionSports;
