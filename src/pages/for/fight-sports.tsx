import React from 'react';
import LandingPage from '@/components/landing/LandingPage';
import { useLandingPageCMSData } from '@/utils/useLandingPageCMSData';
import { transformCMSData } from '@/utils/cmsTransformAndManualConfigs';
import {
  enableTestVersionsByPage,
  fightSportsDefaultData,
  LoadingScreen,
} from '@/components/landing/landingPagesDefaultData';

const FightSports = () => {
  const shouldUseCMS = enableTestVersionsByPage.fightSports;

  const cmsResult = useLandingPageCMSData(shouldUseCMS ? 'fight-sports' : null);
  const data = cmsResult?.data ?? fightSportsDefaultData;
  const loading = cmsResult?.loading ?? false;
  const error = cmsResult?.error ?? null;

  const pageData = transformCMSData(data, 'fight-sports');

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

export default FightSports;
