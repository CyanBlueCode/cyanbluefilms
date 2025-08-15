'use client';
import { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Menu,
  MenuItem,
  Button,
  Slide,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useRouter } from 'next/router';
import Link from 'next/link';

const HideOnScroll = ({ children }) => {
  const [lastScrollY, setLastScrollY] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setVisible(currentScrollY < lastScrollY || currentScrollY < 10);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <Slide appear={false} direction='down' in={visible}>
      {children}
    </Slide>
  );
};

const CustomAppBar = () => {
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState(null);
  const [projectsMenuAnchor, setProjectsMenuAnchor] = useState(null);
  const isMobileMenuOpen = Boolean(mobileMenuAnchor);
  const isProjectsMenuOpen = Boolean(projectsMenuAnchor);
  const { pathname } = useRouter();

  const navItems = [
    { name: 'Home', href: '/' },
    {
      name: 'Projects',
      href: '/projects',
      subItems: [
        { name: 'Film', href: '/film' },
        { name: 'Photo', href: '/photo' },
      ],
    },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const handleProjectsHover = (event) => {
    setProjectsMenuAnchor(event.currentTarget);
  };

  const handleProjectsClose = () => {
    setProjectsMenuAnchor(null);
  };

  const hideNavigation = !!pathname.includes('/landing/');
  const dynamicTextColor =
    ['/', '/film'].includes(pathname) || hideNavigation ? 'white' : 'black';

  return (
    <HideOnScroll>
      <AppBar color='transparent' elevation={0}>
        {/* <AppBar color='default' elevation={1}> */}
        <Toolbar>
          {/* Text Logo */}
          <Typography
            variant='h5'
            sx={{
              flexGrow: 1,
              textAlign: 'left',
              color: dynamicTextColor,
              fontWeight: 1000,
            }}
          >
            {hideNavigation ? (
              'CYAN BLUE FILMS'
            ) : (
              <Link href='/'>CYAN BLUE FILMS</Link>
            )}
          </Typography>
          {/* Desktop Navigation */}
          {!hideNavigation && (
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
              {navItems.map((item) =>
                item.subItems ? (
                  <Box
                    key={item.name}
                    onMouseEnter={handleProjectsHover}
                    onMouseLeave={handleProjectsClose}
                    sx={{ position: 'relative' }}
                  >
                    <Button
                      href={item.href}
                      sx={{ color: dynamicTextColor, textTransform: 'none' }}
                    >
                      {item.name}
                    </Button>

                    <Menu
                      anchorEl={projectsMenuAnchor}
                      open={isProjectsMenuOpen}
                      onClose={handleProjectsClose}
                      slotProps={{
                        list: {
                          onMouseLeave: handleProjectsClose,
                          sx: { pointerEvents: 'auto' },
                        },
                      }}
                      sx={{ pointerEvents: 'none' }}
                    >
                      {item.subItems.map((subItem) => (
                        <MenuItem
                          key={subItem.name}
                          href={subItem.href}
                          component='a'
                          onClick={handleProjectsClose}
                          sx={{
                            minWidth: 75,
                            display: 'flex',
                            justifyContent: 'center',
                            '&:hover': {
                              // FIXME temp color
                              backgroundColor: '#00B7EB',
                            },
                          }}
                        >
                          <Typography
                            variant='caption'
                            sx={{ fontWeight: 1000 }}
                          >
                            {subItem.name}
                          </Typography>
                        </MenuItem>
                      ))}
                    </Menu>
                  </Box>
                ) : (
                  <Button
                    key={item.name}
                    href={item.href}
                    sx={{ color: dynamicTextColor, textTransform: 'none' }}
                  >
                    {item.name}
                  </Button>
                )
              )}
            </Box>
          )}

          {!hideNavigation && (
            <>
              {/* Mobile Menu Button */}
              <IconButton
                color={dynamicTextColor}
                aria-label='open menu'
                edge='end'
                onClick={(e) => setMobileMenuAnchor(e.currentTarget)}
                sx={{ display: { md: 'none' } }}
              >
                <MenuIcon style={{ color: dynamicTextColor }} />
              </IconButton>

              {/* Mobile Menu */}
              <Menu
                anchorEl={mobileMenuAnchor}
                open={isMobileMenuOpen}
                onClose={() => setMobileMenuAnchor(null)}
                slotProps={{
                  paper: {
                    sx: {
                      width: '9rem',
                      display: 'flex',
                      flexDirection: 'column',
                      p: 0,
                    },
                  },
                }}
              >
                {navItems.map((item) => (
                  <Box key={item.name} sx={{ width: '100%' }}>
                    <MenuItem
                      component='a'
                      href={item.href}
                      sx={{
                        width: '100%',
                        justifyContent: 'center',
                        fontWeight: 'bold',
                        '&:hover': {
                          // FIXME temp color
                          backgroundColor: '#00B7EB',
                        },
                      }}
                      onClick={() => setMobileMenuAnchor(null)}
                    >
                      {item.name}
                    </MenuItem>

                    {item.subItems?.map((sub) => (
                      <MenuItem
                        key={sub.name}
                        component='a'
                        href={sub.href}
                        sx={{
                          width: '100%',
                          justifyContent: 'center',
                          color: '#828282',
                          fontWeight: 'bold',
                          fontSize: '0.9rem',
                          '&:hover': {
                            // FIXME temp color
                            backgroundColor: '#00B7EB',
                          },
                        }}
                        onClick={() => setMobileMenuAnchor(null)}
                      >
                        {sub.name}
                      </MenuItem>
                    ))}
                  </Box>
                ))}
              </Menu>
            </>
          )}
        </Toolbar>
      </AppBar>
    </HideOnScroll>
  );
};

export default CustomAppBar;
