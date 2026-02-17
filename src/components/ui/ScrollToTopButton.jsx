'use client';
import { useState, useEffect } from 'react';
import { Fab } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useRouter } from 'next/navigation';

const ScrollToTopButton = ({ route = '/' }) => {
  const [show, setShow] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [savedPosition, setSavedPosition] = useState(null);
  const [isAtTop, setIsAtTop] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const atTop = currentScrollY < 100;
      
      setIsAtTop(atTop);

      if (atTop && savedPosition) {
        setShow(true);
      } else {
        setShow(currentScrollY > 300 && currentScrollY < lastScrollY);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, savedPosition]);

  const handleClick = () => {
    if (isAtTop && savedPosition) {
      window.scrollTo({ top: savedPosition, behavior: 'smooth' });
      setSavedPosition(null);
    } else {
      setSavedPosition(window.scrollY);
      router.push(route);
    }
  };

  return (
    <Fab
      onClick={handleClick}
      sx={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        opacity: show ? 0.7 : 0,
        visibility: show ? 'visible' : 'hidden',
        transition: 'opacity 0.3s, visibility 0.3s',
        '&:hover': {
          opacity: 0.9,
        },
      }}
      aria-label={isAtTop && savedPosition ? 'return to position' : 'scroll to top'}
    >
      {isAtTop && savedPosition ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
    </Fab>
  );
};

export default ScrollToTopButton;
