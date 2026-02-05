import React from 'react';
import { 
  SportsMma, 
  SportsKabaddi, 
  Videocam, 
  MovieFilter,
  Instagram,
  YouTube,
  ConnectedTv,
  Devices,
  Map,
  LocalAtm,
} from '@mui/icons-material';

/**
 * Transforms CMS data into format expected by LandingPage component
 * @param {Object} cmsData - Raw CMS data from Google Sheets
 * @returns {Object} Transformed data with React elements
 */
export const transformCMSData = (cmsData) => {
  const transformed = { ...cmsData };

  // Transform heroSection
  if (transformed.heroSection) {
    if (transformed.heroSection.title) {
      transformed.heroSection.title = parseJSXString(transformed.heroSection.title);
    }
    if (transformed.heroSection.subtitle) {
      transformed.heroSection.subtitle = transformed.heroSection.subtitle.map(subtitle => parseJSXString(subtitle));
    }
  }

  // Transform mainVideoSection
  if (transformed.mainVideoSection) {
    if (transformed.mainVideoSection.title) {
      transformed.mainVideoSection.title = parseJSXString(transformed.mainVideoSection.title);
    }
    if (transformed.mainVideoSection.subtitle) {
      transformed.mainVideoSection.subtitle = parseJSXString(transformed.mainVideoSection.subtitle);
    }
  }

  // Transform benefitsSection
  if (transformed.benefitsSection) {
    if (transformed.benefitsSection.title) {
      transformed.benefitsSection.title = parseJSXString(transformed.benefitsSection.title);
    }
    if (transformed.benefitsSection.subtitle) {
      transformed.benefitsSection.subtitle = parseJSXString(transformed.benefitsSection.subtitle);
    }
    if (transformed.benefitsSection.cards) {
      transformed.benefitsSection.cards = transformed.benefitsSection.cards.map((card, index) => ({
        ...card,
        title: parseJSXString(card.title),
        description: parseJSXString(card.description),
        icon: getDefaultIcon(index),
      }));
    }
  }

  // Transform packageHighlightsSection
  if (transformed.packageHighlightsSection) {
    if (transformed.packageHighlightsSection.title) {
      transformed.packageHighlightsSection.title = parseJSXString(transformed.packageHighlightsSection.title);
    }
    if (transformed.packageHighlightsSection.subtitle) {
      transformed.packageHighlightsSection.subtitle = parseJSXString(transformed.packageHighlightsSection.subtitle);
    }
    if (transformed.packageHighlightsSection.title2) {
      transformed.packageHighlightsSection.title2 = parseJSXString(transformed.packageHighlightsSection.title2);
    }
    if (transformed.packageHighlightsSection.subtitle2) {
      transformed.packageHighlightsSection.subtitle2 = parseJSXString(transformed.packageHighlightsSection.subtitle2);
    }
    if (transformed.packageHighlightsSection.videos) {
      transformed.packageHighlightsSection.videos = transformed.packageHighlightsSection.videos.map(video => ({
        ...video,
        title: parseJSXString(video.title),
      }));
    }
    if (transformed.packageHighlightsSection.infographic) {
      const infographic = transformed.packageHighlightsSection.infographic;
      
      if (infographic.subtitle) {
        infographic.subtitle = parseJSXString(infographic.subtitle);
      }
      if (infographic.centerText) {
        infographic.centerText = parseJSXString(infographic.centerText);
      }
      
      infographic.centerIcon = (
        <MovieFilter
          sx={{
            color: 'white',
            fontSize: { xs: 40, md: 60, lg: 100 },
          }}
        />
      );

      if (infographic.items) {
        infographic.items = infographic.items.map((item, index) => ({
          ...item,
          msg: parseJSXString(item.msg),
          icon: getInfographicIcon(index),
        }));
      }
    }
  }

  // Transform secondaryVideoSection
  if (transformed.secondaryVideoSection) {
    if (transformed.secondaryVideoSection.title) {
      transformed.secondaryVideoSection.title = parseJSXString(transformed.secondaryVideoSection.title);
    }
    if (transformed.secondaryVideoSection.subtitle) {
      transformed.secondaryVideoSection.subtitle = parseJSXString(transformed.secondaryVideoSection.subtitle);
    }
  }

  // Transform clientBrandsSection
  if (transformed.clientBrandsSection) {
    if (transformed.clientBrandsSection.title) {
      transformed.clientBrandsSection.title = parseJSXString(transformed.clientBrandsSection.title);
    }
  }

  // Transform FAQ section
  if (transformed.faqSection) {
    transformed.faqSection = transformed.faqSection.map(faq => ({
      ...faq,
      question: parseJSXString(faq.question),
      answer: parseJSXString(faq.answer),
    }));
  }

  return transformed;
};

/**
 * Parses string with HTML entities and &nbsp; into JSX
 * @param {string} str - String to parse
 * @returns {React.ReactElement|string} JSX element or string
 */
const parseJSXString = (str) => {
  if (!str || typeof str !== 'string') return str;
  
  // Handle &nbsp; specifically
  if (str.includes('&nbsp;')) {
    const parts = str.split('&nbsp;');
    return React.createElement(
      React.Fragment,
      null,
      ...parts.map((part, index) => [
        index > 0 ? '\u00A0' : null,
        parseHTMLString(part)
      ]).flat().filter(Boolean)
    );
  }
  
  return parseHTMLString(str);
};

/**
 * Parses HTML string into JSX elements
 * @param {string} str - HTML string
 * @returns {React.ReactElement|string} JSX element or string
 */
const parseHTMLString = (str) => {
  if (!str || typeof str !== 'string') return str;
  
  // Simple HTML parsing for common tags
  if (str.includes('<strong>') || str.includes('<br />')) {
    return <span dangerouslySetInnerHTML={{ __html: str }} />;
  }
  
  return str;
};

/**
 * Gets default icon for benefit cards based on index
 * @param {number} index - Card index
 * @returns {React.Component} Icon component
 */
const getDefaultIcon = (index) => {
  const icons = [SportsMma, SportsKabaddi, Videocam, Videocam, SportsKabaddi];
  return icons[index] || Videocam;
};

/**
 * Gets icon for infographic items based on index
 * @param {number} index - Item index
 * @returns {React.ReactElement} Icon element with styling
 */
const getInfographicIcon = (index) => {
  const icons = [Instagram, ConnectedTv, YouTube, Devices, Map, LocalAtm];
  const IconComponent = icons[index] || Devices;
  
  return (
    <IconComponent 
      sx={{ 
        color: 'white', 
        fontSize: { xs: 35, sm: 50, md: 50, lg: 60 } 
      }} 
    />
  );
};