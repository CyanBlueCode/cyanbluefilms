import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/layout/Layout';
import '../styles/global.css';
import {
  GlobalContextProvider,
  ShowConstructionBannerContextProvider,
} from '../context/GlobalContext';
import { getPageTitle } from '../components/ui/pageTitles';
// NOTE MS Clarity - Remove when PostHog is implemented
import { initClarity } from '../utils/clarityAnalytics';

const App = ({ Component, pageProps }) => {
  const router = useRouter();

  // NOTE MS Clarity - Remove when PostHog is implemented
  useEffect(() => {
    initClarity();
  }, []);

  useEffect(() => {
    document.title = getPageTitle(router.pathname);
  }, [router.pathname]);

  return (
    <GlobalContextProvider>
      <ShowConstructionBannerContextProvider>
        {/* REVIEW temp construction banner code */}
        <Layout hideConstructionBanner={pageProps.hideConstructionBanner}>
          <Component {...pageProps} />
        </Layout>
      </ShowConstructionBannerContextProvider>
    </GlobalContextProvider>
  );
};

export default App;
