import Layout from '../components/layout/Layout';
import '../styles/global.css';
import {
  GlobalContextProvider,
  ShowConstructionBannerContextProvider,
} from '../context/GlobalContext';

const App = ({ Component, pageProps }) => (
  <GlobalContextProvider>
    <ShowConstructionBannerContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ShowConstructionBannerContextProvider>
  </GlobalContextProvider>
);

export default App;
