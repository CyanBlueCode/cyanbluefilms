import { useEffect } from 'react';
import Layout from '../components/layout/Layout';
import '../styles/global.css';
import {
  GlobalContextProvider,
  ShowConstructionBannerContextProvider,
} from '../context/GlobalContext';
// NOTE MS Clarity - Remove when PostHog is implemented
import { initClarity } from '../utils/clarityAnalytics';

const App = ({ Component, pageProps }) => {
  // NOTE MS Clarity - Remove when PostHog is implemented
  useEffect(() => {
    initClarity();
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
