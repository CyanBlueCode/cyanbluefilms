import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Modal,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import {
  KeyboardArrowDown,
  Close,
  ExpandMore,
} from '@mui/icons-material';
import ContactSection from '@/components/ContactSection';
import CallBooking from '@/components/landing/CallBooking';
import CircularInfographic from '@/components/landing/CircularInfographic';
import AnimatedCardCarousel from '@/components/ui/AnimatedCardCarousel';
import ScrollingLogos from '@/components/ui/ScrollingLogos';
import ProcessSection from '@/components/ui/ProcessSection';
import VideoSection from '@/components/ui/VideoSection';
import { TitleSection } from '@/utils/TextHelpers';
import { generateVideoUrl } from '@/utils/imagekit';
import useTypewriter from '@/utils/useTypewriter';

// Color theme variables
const getColors = (isDarkBackground, isLightText) => ({
  // Background colors
  primaryBg: isDarkBackground ? '#000' : '#ffffff',
  secondaryBg: isDarkBackground ? '#222222' : '#f5f5f5',
  tertiaryBg: isDarkBackground ? '#000' : '#eaeaea',

  // Text colors
  titleText: isLightText ? '#ffffff' : '#191919',
  subtitleText: isLightText ? '#f5f5f5' : '#191919',
  bodyText: isLightText ? '#e0e0e0' : '#333333',
});

const LandingPage = ({
  heroSection,
  benefitsSection,
  mainVideoSection,
  secondaryVideoSection,
  packageHighlightsSection,
  processSection,
  clientBrandsSection,
  faqSection,
  contactSection,
  isDarkBackground = false,
  isLightText = false,
}) => {
  const colors = getColors(isDarkBackground, isLightText);
  const typedTitle = useTypewriter(heroSection?.title || '', 60);

  // Generate background video URL if provided
  const backgroundVideoUrl = heroSection?.backgroundVideo
    ? generateVideoUrl(heroSection.backgroundVideo)
    : null;

  // Generate poster frame URL if provided
  const posterFrameUrl = heroSection?.backgroundVideo?.posterFramePath
    ? `https://ik.imagekit.io/cyanbluefilms${heroSection.backgroundVideo.posterFramePath}`
    : null;

  return (
    <Box sx={{ width: '100vw', overflowX: 'hidden' }}>
      {/* HERO SECTION */}
      {heroSection && (
        <Box
          sx={{
            position: 'relative',
            width: '100vw',
            height: '100dvh',
            backgroundImage: !backgroundVideoUrl
              ? `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${heroSection?.imageUrl})`
              : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            pt: 15,
            pb: 20,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            overflow: 'hidden',
          }}
        >
          {/* Background Video */}
          {backgroundVideoUrl && (
            <>
              <video
                autoPlay
                muted
                loop
                playsInline
                preload='metadata'
                poster={posterFrameUrl}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  zIndex: -2,
                }}
              >
                <source src={backgroundVideoUrl} type='video/mp4' />
              </video>
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  backgroundColor: 'rgba(0, 0, 0, 0.4)',
                  zIndex: -1,
                }}
              />
            </>
          )}
          <Container
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              justifyContent: 'space-evenly',
              alignItems: 'center',
              gap: 4,
            }}
          >
            {/* Title & CTA box */}
            <Box
              sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                mt: { xs: '100%', sm: '100%', md: '70%', lg: '50%' },
              }}
            >
              {/* Main Title */}
              <Box mb={4}>
                <Typography
                  variant='h5'
                  align='center'
                  color='#fff'
                  fontWeight={300}
                  sx={{
                    pb: 3,
                    textTransform: 'uppercase',
                    fontFamily: 'monospace',
                    whiteSpace: 'normal',
                    overflow: 'hidden',
                  }}
                >
                  {/* NOTE forcing non-break between cursor & last word */}
                  {typedTitle.split(' ').map((word, i, arr) => (
                    <span key={i}>
                      {word}
                      {i === arr.length - 1 && (
                        <span
                          style={{ animation: 'blink 1s step-end infinite' }}
                        >
                          |
                        </span>
                      )}
                      {i < arr.length - 1 && ' '}
                    </span>
                  ))}
                </Typography>
              </Box>
              <Box>
                <CallBooking
                  theme='dark'
                  buttonConfig={{
                    text: heroSection?.callButtonText || 'Book a call',
                    color: 'cyanBlue.main',
                  }}
                />
              </Box>
            </Box>
          </Container>

          {/* ANIMATED DOWN CHEVRON */}
          <Box
            onClick={() =>
              window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })
            }
            sx={{
              position: 'absolute',
              bottom: 20,
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 10,
              cursor: 'pointer',
            }}
          >
            <KeyboardArrowDown
              sx={{
                color: '#fff',
                fontSize: 50,
                opacity: 0.9,
                animation: 'bounce 1s infinite',
                '@keyframes bounce': {
                  '0%, 100%': { transform: 'translateY(0)' },
                  '50%': { transform: 'translateY(-10px)' },
                },
              }}
            />
          </Box>
        </Box>
      )}

      {/* BENEFITS SECTION */}
      {benefitsSection && (
        <Box sx={{ width: '100vw', backgroundColor: colors.primaryBg, pt: 8 }}>
          <Container>
            <TitleSection
              title={benefitsSection?.title}
              subtitle={benefitsSection?.subtitle}
              colors={colors}
            />
            <AnimatedCardCarousel
              items={benefitsSection?.cards || []}
              colors={colors}
              cardHeight={360}
              shouldInfiniteAutoScroll={false}
            />
          </Container>
        </Box>
      )}

      {/* MAIN VIDEO DEMO SECTION */}
      <VideoSection
        section={mainVideoSection}
        colors={colors}
        backgroundColor={colors.tertiaryBg}
      />

      {/* PACKAGE HIGHLIGHTS SECTION */}
      {packageHighlightsSection && (
        <Box sx={{ width: '100vw', backgroundColor: colors.primaryBg, pb: 8 }}>
          <Container>
            <TitleSection
              title={packageHighlightsSection?.title}
              subtitle={packageHighlightsSection?.subtitle}
              colors={colors}
              py={4}
            />
            {/* SOCIAL VIDEO CARDS */}
            <Box my={4}>
              {/* <TitleSection
              title={packageHighlightsSection?.title2}
              subtitle={packageHighlightsSection?.subtitle2}
              colors={colors}
            /> */}
              <AnimatedCardCarousel
                items={packageHighlightsSection?.videos || []}
                colors={colors}
                cardHeight={400}
                autoScrollInterval={0}
                shouldInfiniteAutoScroll={false}
                customCardRenderer={(video) => (
                  <Box
                    sx={{
                      width: { xs: 300, sm: 350, md: 400 },
                      height: { xs: 375, sm: 438, md: 500 },
                      backgroundColor: colors?.secondaryBg || '#222',
                      borderRadius: 2,
                      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                      overflow: 'hidden',
                    }}
                  >
                    <iframe
                      width='100%'
                      height='100%'
                      src={
                        video.videoUrl.includes('vimeo')
                          ? `${video.videoUrl}?title=0&amp;byline=0&amp;portrait=1&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479`
                          : `${video.videoUrl}?modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&vq=hd1080`
                      }
                      title={video.title}
                      frameBorder='0'
                      allowFullScreen
                    />
                  </Box>
                )}
              />
            </Box>
            {/* CIRCULAR INFOGRAPHIC */}
            {packageHighlightsSection?.infographic && (
              <>
                <TitleSection
                  title={packageHighlightsSection.infographic.title}
                  subtitle={packageHighlightsSection.infographic.subtitle}
                  colors={colors}
                  pt={4}
                />
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    my: 2,
                    maxWidth: 1200,
                    mx: 'auto',
                  }}
                >
                  <CircularInfographic
                    colors={colors}
                    centerIcon={packageHighlightsSection.infographic.centerIcon}
                    centerText={packageHighlightsSection.infographic.centerText}
                    items={packageHighlightsSection.infographic.items}
                  />
                </Box>
              </>
            )}
          </Container>
        </Box>
      )}

      {/* CLIENT BRANDS SECTION */}
      {clientBrandsSection && (
        <Box
          sx={{
            width: '100vw',
            minHeight: '50vh',
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${clientBrandsSection?.backgroundImagePath})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
          }}
        >
          <Container>
            <TitleSection
              title={clientBrandsSection?.title}
              subtitle={clientBrandsSection?.subtitle}
              colors={colors}
            />
            <ScrollingLogos
              clientBrands={clientBrandsSection?.clientBrands}
              animationDuration={clientBrandsSection?.animationDuration}
              logoHeight={clientBrandsSection?.logoHeight}
            />
          </Container>
        </Box>
      )}

      {/* LONG FORM WORK SECTION */}
      <VideoSection
        section={secondaryVideoSection}
        colors={colors}
        backgroundColor={colors.primaryBg}
      />

      {/* PROCESS SECTION */}
      {processSection &&
        !(
          processSection.hideSection === true ||
          (typeof processSection.hideSection === 'string' &&
            processSection.hideSection.toLowerCase() === 'true')
        ) && (
          <ProcessSection
            title={processSection.title}
            subtitle={processSection.subtitle}
            data={processSection.data}
            colors={colors}
          />
        )}

      {/* FAQ SECTION */}
      {faqSection && (
        <Box sx={{ width: '100vw', backgroundColor: colors.primaryBg, pt: 4 }}>
          <Container>
            <TitleSection
              title={faqSection.title}
              subtitle={faqSection.subtitle}
              colors={colors}
            />
            <Box px={{ xs: 0, sm: 7 }}>
              {faqSection?.items?.map((faq, i) => (
                <Accordion
                  key={i}
                  sx={{
                    mb: 1,
                    borderRadius: '8px !important',
                    boxShadow: 'none',
                    backgroundColor: colors.secondaryBg,
                    '&:before': { display: 'none' },
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMore sx={{ color: colors.titleText }} />}
                  >
                    <Typography
                      variant='body1'
                      fontWeight={500}
                      color={colors.titleText}
                    >
                      {faq.question}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ textAlign: 'start' }}>
                    <Typography color={colors.bodyText}>
                      {faq.answer}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Box>
          </Container>
        </Box>
      )}

      {/* CONTACT / BOOK A CALL SECTION */}
      <ContactSection
        title={contactSection?.title}
        titleVariant={contactSection?.titleVariant}
        isUpperCase={contactSection?.isUpperCase}
        contactTitle={contactSection?.contactTitle}
        contactTitleVariant={contactSection?.contactTitleVariant}
        callBookingTitle={contactSection?.callBookingTitle}
        callBookingTitleVariant={contactSection?.callBookingTitleVariant}
        backgroundImage={contactSection?.backgroundImage}
        colors={colors}
      />
      <Box
        sx={{
          position: 'absolute',
          backgroundColor: '#000',
          height: '40px',
          width: '100%',
          mt: '-50px',
          zIndex: 1,
        }}
      />
    </Box>
  );
};

export default LandingPage;
