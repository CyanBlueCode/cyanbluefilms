const PAGE_TITLES = {
  '/': 'Cyan Blue Films',
  '/work': 'Work - Cyan Blue Films',
  '/about': 'About - Cyan Blue Films',
  '/contact': 'Contact - Cyan Blue Films',
  '/film': 'Film - Cyan Blue Films',
  '/for/action-sports': 'Action Sports - Cyan Blue Films',
  '/for/agency-partners': 'Agency Partners - Cyan Blue Films',
  '/for/branded-sponsored-docs': 'Branded Docs - Cyan Blue Films',
  '/for/combat-sports': 'Combat Sports - Cyan Blue Films',
  '/for/fight-sports': 'Fight Sports - Cyan Blue Films',
  '/for/fitness-brands': 'Fitness Brands - Cyan Blue Films',
  '/for/fitness': 'Fitness - Cyan Blue Films',
  '/for/high-octane': 'Action Sports - Cyan Blue Films',
};

export const getPageTitle = (pathname) =>
  PAGE_TITLES[pathname] || 'Cyan Blue Films';

export default PAGE_TITLES;
