'use client';
import { useState, useEffect } from 'react';
import { LinearProgress, Box } from '@mui/material';

const CountdownProgress = ({ interval }) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    let start;
    let rafId;

    const step = (timestamp) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const next = Math.max(100 - (elapsed / interval) * 100, 0);
      setProgress(next);
      if (elapsed < interval) {
        rafId = requestAnimationFrame(step);
      }
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [interval]);

  return (
    <Box sx={{ width: '10rem' }}>
      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{
          height: 8,
          borderRadius: 4,
          backgroundColor: 'rgba(255,255,255,0.2)',
          '& .MuiLinearProgress-bar': {
            backgroundColor: '#fff',
            borderRadius: 4,
          },
          zIndex: 3
        }}
      />
    </Box>
  );
};

export default CountdownProgress;