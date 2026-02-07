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

// Icon configurations for landing pages
const combatSportsIcons = {
  color: '#fff',
  benefitCardsIcons: [
    SportsMma,
    SportsKabaddi,
    Videocam,
    Videocam,
    SportsKabaddi,
  ],
  infographicIcons: [Instagram, ConnectedTv, YouTube, Devices, Map, LocalAtm],
  centerIcon: MovieFilter,
};

const fightSportsIcons = {
  color: '#fff',
  benefitCardsIcons: [
    SportsMma,
    SportsKabaddi,
    Videocam,
    Videocam,
    SportsKabaddi,
  ],
  infographicIcons: [Instagram, ConnectedTv, YouTube, Devices, Map, LocalAtm],
  centerIcon: MovieFilter,
};

// Page icon mapping
const pageIconConfigs = {
  'combat-sports': combatSportsIcons,
  'fight-sports': fightSportsIcons,
};

/**
 * Transforms CMS data into format expected by LandingPage component
 * @param {Object} cmsData - Raw CMS data from Google Sheets
 * @param {string} pageName - Page name for icon config above
 * @returns {Object} Transformed data with React elements
 */
export const transformCMSData = (cmsData, pageName) => {
  const transformed = { ...cmsData };
  const iconConfig = pageIconConfigs[pageName] || combatSportsIcons;

  // Console log icon values from sheets for marketing team
  if (transformed.benefitCardsIcons) {
    console.log(
      'Benefit Cards Icons from Sheet:',
      transformed.benefitCardsIcons,
    );
    delete transformed.benefitCardsIcons;
  }
  if (transformed.infographicIcons) {
    console.log('Infographic Icons from Sheet:', transformed.infographicIcons);
    delete transformed.infographicIcons;
  }

  // Transform text fields
  transformTextFields(transformed);

  // Add icons
  addIcons(transformed, iconConfig);

  return transformed;
};

const transformTextFields = (data) => {
  const {
    heroSection,
    mainVideoSection,
    benefitsSection,
    packageHighlightsSection,
    secondaryVideoSection,
    clientBrandsSection,
    faqSection,
    contactSection,
  } = data;

  // Hero section
  if (heroSection?.title) {
    heroSection.title = parseJSXString(heroSection.title);
  }
  if (heroSection?.subtitle) {
    heroSection.subtitle = heroSection.subtitle.map((subtitle) =>
      parseJSXString(subtitle),
    );
  }
  if (heroSection?.callButtonText) {
    heroSection.callButtonText = parseJSXString(heroSection.callButtonText);
  }

  // Main video section
  if (mainVideoSection?.title) {
    mainVideoSection.title = parseJSXString(mainVideoSection.title);
  }
  if (mainVideoSection?.subtitle) {
    mainVideoSection.subtitle = parseJSXString(mainVideoSection.subtitle);
  }

  // Benefits section
  if (benefitsSection) {
    if (benefitsSection.title) {
      benefitsSection.title = parseJSXString(benefitsSection.title);
    }
    if (benefitsSection.subtitle) {
      benefitsSection.subtitle = parseJSXString(benefitsSection.subtitle);
    }
    if (benefitsSection.cards) {
      benefitsSection.cards = benefitsSection.cards.map((card) => ({
        ...card,
        title: parseJSXString(card.title),
        description: parseJSXString(card.description),
      }));
    }
  }

  // Package highlights section
  if (packageHighlightsSection) {
    if (packageHighlightsSection.title) {
      packageHighlightsSection.title = parseJSXString(
        packageHighlightsSection.title,
      );
    }
    if (packageHighlightsSection.subtitle) {
      packageHighlightsSection.subtitle = parseJSXString(
        packageHighlightsSection.subtitle,
      );
    }
    if (packageHighlightsSection.title2) {
      packageHighlightsSection.title2 = parseJSXString(
        packageHighlightsSection.title2,
      );
    }
    if (packageHighlightsSection.subtitle2) {
      packageHighlightsSection.subtitle2 = parseJSXString(
        packageHighlightsSection.subtitle2,
      );
    }

    if (packageHighlightsSection.videos) {
      packageHighlightsSection.videos = packageHighlightsSection.videos.map(
        (video) => ({
          ...video,
          title: parseJSXString(video.title),
        }),
      );
    }

    if (packageHighlightsSection.infographic) {
      const infographic = packageHighlightsSection.infographic;
      if (infographic.subtitle) {
        infographic.subtitle = parseJSXString(infographic.subtitle);
      }
      if (infographic.centerText) {
        infographic.centerText = parseJSXString(infographic.centerText);
      }
      if (infographic.items) {
        infographic.items = infographic.items.map((item) => ({
          ...item,
          msg: parseJSXString(item.msg),
        }));
      }
    }
  }

  // Secondary video section
  if (secondaryVideoSection) {
    if (secondaryVideoSection.title) {
      secondaryVideoSection.title = parseJSXString(secondaryVideoSection.title);
    }
    if (secondaryVideoSection.subtitle) {
      secondaryVideoSection.subtitle = parseJSXString(
        secondaryVideoSection.subtitle,
      );
    }
  }

  // Client brands section
  if (clientBrandsSection?.title) {
    clientBrandsSection.title = parseJSXString(clientBrandsSection.title);
  }

  // FAQ section
  if (faqSection) {
    if (faqSection.title) {
      faqSection.title = parseJSXString(faqSection.title);
    }
    if (faqSection.subtitle) {
      faqSection.subtitle = parseJSXString(faqSection.subtitle);
    }
    if (faqSection.items) {
      faqSection.items = faqSection.items.map((faq) => ({
        ...faq,
        question: parseJSXString(faq.question),
        answer: parseJSXString(faq.answer),
      }));
    }
  }

  // Contact section
  if (contactSection) {
    if (contactSection.title) {
      contactSection.title = parseJSXString(contactSection.title);
    }
    if (contactSection.contactTitle) {
      contactSection.contactTitle = parseJSXString(contactSection.contactTitle);
    }
    if (contactSection.callBookingTitle) {
      contactSection.callBookingTitle = parseJSXString(contactSection.callBookingTitle);
    }
  }
};

const addIcons = (data, iconConfig) => {
  // Benefit cards icons
  if (data.benefitsSection?.cards) {
    data.benefitsSection.cards = data.benefitsSection.cards.map(
      (card, index) => ({
        ...card,
        icon: iconConfig.benefitCardsIcons[index] || Videocam,
      }),
    );
  }

  // Infographic icons
  if (data.packageHighlightsSection?.infographic) {
    const infographic = data.packageHighlightsSection.infographic;

    // Center icon
    const CenterIcon = iconConfig.centerIcon;
    infographic.centerIcon = (
      <CenterIcon
        sx={{
          color: iconConfig.color,
          fontSize: { xs: 40, md: 60, lg: 100 },
        }}
      />
    );

    // Item icons
    if (infographic.items) {
      infographic.items = infographic.items.map((item, index) => {
        const IconComponent = iconConfig.infographicIcons[index] || Devices;
        return {
          ...item,
          icon: (
            <IconComponent
              sx={{
                color: iconConfig.color,
                fontSize: { xs: 35, sm: 50, md: 50, lg: 60 },
              }}
            />
          ),
        };
      });
    }
  }
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
      ...parts
        .map((part, index) => [
          index > 0 ? '\u00A0' : null,
          parseHTMLString(part),
        ])
        .flat()
        .filter(Boolean),
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
