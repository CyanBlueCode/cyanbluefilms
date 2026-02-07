import React from 'react';
import LandingPage from '@/components/landing/LandingPage';
import { useLandingPageCMSData } from '@/utils/useLandingPageCMSData';
import { transformCMSData } from '@/utils/cmsTransformAndManualConfigs';
import { enableTestVersionsByPage, agencyPartnersDefaultData, LoadingScreen } from '@/components/landing/landingPagesDefaultData';

const AgencyPartners = () => {
  const shouldUseCMS = enableTestVersionsByPage.agencyPartners;
  
  const cmsResult = useLandingPageCMSData(shouldUseCMS ? 'agency-partners' : null);
  const data = cmsResult?.data ?? agencyPartnersDefaultData;
  const loading = cmsResult?.loading ?? false;
  const error = cmsResult?.error ?? null;
  
  const pageData = transformCMSData(data, 'agency-partners');

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

export default AgencyPartners;
