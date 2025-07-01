import Layout from '../components/layout/Layout';
import '../styles/global.css';

const App = ({ Component, pageProps }) => (
  <Layout>
    <Component {...pageProps} />
  </Layout>
);

export default App;
