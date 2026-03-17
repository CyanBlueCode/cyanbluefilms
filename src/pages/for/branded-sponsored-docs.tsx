import React from 'react';
import LandingPage from '@/components/landing/LandingPage';
import { useLandingPageCMSData } from '@/utils/useLandingPageCMSData';
import { transformCMSData } from '@/utils/cmsTransformAndManualConfigs';
import { enableTestVersionsByPage, brandedSponsoredDocsDefaultData, LoadingScreen } from '@/components/landing/landingPagesDefaultData';

const BrandedSponsoredDocs = () => {
  const shouldUseCMS = enableTestVersionsByPage.brandedSponsoredDocs;
  
  const cmsResult = useLandingPageCMSData(shouldUseCMS ? 'branded-sponsored-docs' : null);
  const data = cmsResult?.data ?? brandedSponsoredDocsDefaultData;
  const loading = cmsResult?.loading ?? false;
  const error = cmsResult?.error ?? null;
  
  const pageData = transformCMSData(data, 'branded-sponsored-docs');

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

export default BrandedSponsoredDocs;
