import { useEffect } from 'react';
import Layout from '../components/layout/Layout';
import '../styles/global.css';
import {
  GlobalContextProvider,
  ShowConstructionBannerContextProvider,
} from '../context/GlobalContext';
// TEMPORARY: MS Clarity - Remove when PostHog is implemented
import { initClarity } from '../utils/clarityAnalytics';

const App = ({ Component, pageProps }) => {
  useEffect(() => {
    // TEMPORARY: MS Clarity - Delay to avoid blocking first paint
    const timer = setTimeout(() => {
      initClarity();
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

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
