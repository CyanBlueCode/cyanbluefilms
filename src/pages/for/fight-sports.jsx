import React from 'react';
import LandingPage from '@/components/landing/LandingPage';
import { useLandingPageCMSData } from '@/utils/useLandingPageCMSData';
import { transformCMSData } from '@/utils/cmsTransformAndManualConfigs';
import {
  enableTestVersionsByPage,
  fightSportsDefaultData,
} from '@/components/landing/landingPagesDefaultData';

const FightSports = () => {
  const shouldUseCMS = enableTestVersionsByPage.fightSports;

  const cmsResult = useLandingPageCMSData(shouldUseCMS ? 'fight-sports' : null);
  const data = cmsResult?.data ?? fightSportsDefaultData;
  const loading = cmsResult?.loading ?? false;
  const error = cmsResult?.error ?? null;

  const pageData = transformCMSData(data, 'fight-sports');

  if (loading) {
    return (
      <div
        style={{
          width: '100vw',
          height: '100vh',
          backgroundColor: '#000',
          backgroundImage: 'url(/images/landing/leo_poster-frame.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
    );
  }

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
