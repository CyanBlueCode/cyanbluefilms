import { createTheme } from '@mui/material/styles';

export default createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#0d47a1',
    },
    secondary: {
      main: '#e65100',
    },
    cyanBlue: {
      main: '#00B7EB',
    },
    background: {
      default: '#000000',
      paper: '#000000',
    },
    text: {
      primary: '#ffffff',
      secondary: '#b0b0b0',
    },
  },
  typography: {
    fontFamily: '"Helvetica Neue", Arial, sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '4rem',
      letterSpacing: '-0.01562em',
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
});
