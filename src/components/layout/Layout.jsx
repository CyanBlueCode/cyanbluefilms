'use client';
import { Container, CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../styles/theme';
import CustomAppBar from './AppBar';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <CustomAppBar />
      <Container
        component='main'
        maxWidth='lg'
        sx={{
          minHeight: '100vh',
          minWidth: '100vw',
          overflow: 'hidden',
        }}
      >
        {children}
      </Container>
      <Footer />
    </ThemeProvider>
  );
};

export default Layout;
