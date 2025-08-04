import { createTheme } from '@mui/material/styles';

export default createTheme({
  palette: {
    primary: {
      main: '#0d47a1', // Deep blue
    },
    secondary: {
      main: '#e65100', // Amber
    },
    cyanBlue: {
      main: '#19C2FF',
    },
    background: {
      default: '#f5f5f5',
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
