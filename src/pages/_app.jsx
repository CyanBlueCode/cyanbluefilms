import Layout from '../components/layout/Layout';
import '../styles/global.css';
import {
  GlobalContextProvider,
  ShowConstructionBannerContextProvider,
} from '../context/GlobalContext';

const App = ({ Component, pageProps }) => (
  <GlobalContextProvider>
    <ShowConstructionBannerContextProvider>
      {/* REVIEW temp construction banner code */}
      <Layout hideConstructionBanner={pageProps.hideConstructionBanner}>
        <Component {...pageProps} />
      </Layout>
    </ShowConstructionBannerContextProvider>
  </GlobalContextProvider>
);

export default App;
