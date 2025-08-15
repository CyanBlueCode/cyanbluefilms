import Cal, { getCalApi } from '@calcom/embed-react';
import { useEffect } from 'react';
import { Button, Typography } from '@mui/material';

const CallBooking = ({ theme, buttonConfig }) => {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: 'call' });
      cal('ui', {
        // theme: buttonConfig?.theme,
        cssVarsPerTheme: {
          light: { 'cal-brand': buttonConfig?.color || '#00B7EB' },
        },
        hideEventTypeDetails: false,
        layout: 'month_view',
      });
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return buttonConfig ? (
    <Button
      variant='contained'
      color='primary'
      sx={{
        height: '100px',
        width: '250px',
        borderRadius: '8px',
        fontSize: '1.5rem',
        boxShadow: 'none',
        '&:hover': {
          boxShadow: 'none',
        },
      }}
      data-cal-namespace='call'
      data-cal-link='cyanblue/call'
      data-cal-config={`{"layout":"month_view","theme":"${theme}"}`}
    >
      <Typography variant='h6' sx={{ color: 'white', fontWeight: 800 }}>
        {buttonConfig?.text}
      </Typography>
    </Button>
  ) : (
    <Cal
      namespace='call'
      calLink='cyanblue/call'
      style={{ width: '100%', overflow: 'auto' }}
      config={{ layout: 'month_view', theme }}
    />
  );
};

export default CallBooking;
