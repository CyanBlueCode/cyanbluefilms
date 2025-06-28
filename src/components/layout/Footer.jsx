import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component='footer'
      sx={{
        py: 2,
        mt: 'auto',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <Typography variant='body2' color='text.secondary'>
        © {new Date().getFullYear()} Cyan Blue Films LLC. All rights reserved.
      </Typography>
      <Typography variant='body2' color='text.secondary'>
        From California with Love ♥
      </Typography>
    </Box>
  );
}

export default Footer;