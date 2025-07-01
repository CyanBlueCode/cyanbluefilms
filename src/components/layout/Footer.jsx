import { Box, Typography } from '@mui/material';

const Footer = () => (
  <Box
    component='footer'
    sx={{
      py: 2,
      mt: 'auto',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: 'black',
    }}
  >
    <Typography variant='caption' color='white' fontWeight={600}>
      © {new Date().getFullYear()} Cyan Blue Films LLC. All rights reserved.
    </Typography>
    <Typography variant='caption' color='white' fontWeight={600}>
      From California with Love ♥
    </Typography>
  </Box>
);

export default Footer;
