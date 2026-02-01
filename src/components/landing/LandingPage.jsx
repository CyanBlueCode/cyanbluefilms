import React, { useState } from 'react';
import Image from 'next/image';
import {
  Box,
  Container,
  Typography,
  Grid,
  CardContent,
  Button,
  Modal,
  Avatar,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import {
  KeyboardArrowDown,
  PlayArrow,
  Close,
  ExpandMore,
} from '@mui/icons-material';
import ContactSection from '@/components/ContactSection';
import CallBooking from '@/components/landing/CallBooking';
import CircularInfographic from '@/components/landing/CircularInfographic';
import AnimatedCardCarousel from '@/components/ui/AnimatedCardCarousel';
import ScrollingLogos from '@/components/ui/ScrollingLogos';
import {
  SportsMma,
  SportsKabaddi,
  Videocam,
  MovieFilter,
  Movie,
  Instagram,
  YouTube,
  ConnectedTv,
  Devices,
  Map,
  LocalAtm,
} from '@mui/icons-material';
// import TikTok from '../../public/images/tiktok-logo.svg';
import { generateVideoUrl } from '@/utils/imagekit';
import useTypewriter from '@/utils/useTypewriter';

const accentColor = 'cyanBlue.main';

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

const VideoModal = ({ videoUrl, open, onClose }) => (
  <Modal
    open={open}
    onClose={onClose}
    slotProps={{
      backdrop: {
        sx: { backgroundColor: 'rgba(0, 0, 0, 0.9)' },
      },
    }}
  >
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: { xs: '100dvw', sm: '80dvw' },
        // height: '50vh',
        // maxWidth: '960px',
        // maxHeight: '540px',
        aspectRatio: '16/9',
        bgcolor: 'black',
      }}
    >
      <Button
        onClick={onClose}
        sx={{
          position: 'absolute',
          top: -50,
          right: 8,
          minWidth: 'auto',
          width: 32,
          height: 32,
          color: 'white',
          zIndex: 1,
          '&:hover': { bgcolor: 'black' },
        }}
      >
        <Close fontSize='small' />
      </Button>
      <iframe
        width='100%'
        height='100%'
        src={videoUrl}
        title='Video'
        frameBorder='0'
        allowFullScreen
      />
    </Box>
  </Modal>
);

const renderStackedTextArray = (text) =>
  Array.isArray(text)
    ? text.map((line, i) => (
        <React.Fragment key={i}>
          {line}
          {i < text.length - 1 && <br />}
        </React.Fragment>
      ))
    : text;

export const SectionHeader = ({
  title,
  subtitle,
  titleVariant = 'h3',
  colors,
  fontWeight = 600,
  isUpperCase = true,
}) => (
  <>
    <Typography
      variant={titleVariant}
      align='center'
      color={colors?.titleText || '#191919'}
      textTransform={isUpperCase ? 'uppercase' : 'none'}
      fontWeight={fontWeight}
      gutterBottom
    >
      {title}
    </Typography>
    <Typography
      variant='h6'
      align='center'
      pb={5}
      px={2}
      fontWeight={400}
      color={colors?.subtitleText || '#191919'}
      sx={{ maxWidth: { xs: '90vw', sm: '70vw', md: '50vw' } }}
    >
      {subtitle}
    </Typography>
  </>
);

const LandingPage = ({
  heroSection,
  benefitsSection,
  mainVideoSection,
  secondaryVideoSection,
  packageHighlightsSection,
  clientBrandsSection,
  faqSection,
  contactSection,
  isDarkBackground = false,
  isLightText = false,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const colors = getColors(isDarkBackground, isLightText);
  const packageIconStyles = {
    sx: { color: 'white', fontSize: { xs: 35, sm: 50, md: 50, lg: 60 } },
  };
  const typedTitle = useTypewriter(
    Array.isArray(heroSection?.title)
      ? heroSection.title.join(' ')
      : heroSection?.title || '',
    60,
  );

  // Generate background video URL if provided
  const backgroundVideoUrl = heroSection?.backgroundVideo
    ? generateVideoUrl(heroSection.backgroundVideo)
    : null;

  // Generate poster frame URL if provided
  const posterFrameUrl = heroSection?.backgroundVideo?.posterFramePath
    ? `https://ik.imagekit.io/cyanbluefilms${heroSection.backgroundVideo.posterFramePath}`
    : null;

  // Render video section function
  const renderVideoSection = (section, backgroundColor = colors.tertiaryBg) => {
    if (!section) return null;

    return (
      <Box
        sx={{
          width: '100vw',
          backgroundColor,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          py: 4,
        }}
      >
        <SectionHeader
          title={section?.title}
          subtitle={section?.subtitle}
          colors={colors}
        />

        <Box
          sx={{
            backgroundColor: 'rgb(0, 0, 0, 1)',
            border: 'none',
            aspectRatio: '16/9',
            width: { xs: '100vw', sm: '70vw' },
            position: 'relative',
            mt: 4
          }}
        >
          <iframe
            width='100%'
            height='100%'
            src={`${section.videoUrl}?modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&vq=hd1440`}
            title={section.title || 'Video'}
            frameBorder='0'
            allowFullScreen
            style={{ position: 'absolute', top: 0, left: 0 }}
          />
        </Box>
      </Box>
    );
  };

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
            pt: 10,
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
              {/* <Box mb={10}> */}
              <Box mb={4}>
                {/* REVIEW original hero should be deprecated */}
                {heroSection?.useOriginalHero ? (
                  <>
                    <Typography
                      variant='h2'
                      align='center'
                      color='#fff'
                      fontWeight={600}
                      sx={{
                        fontSize: { xs: '1.8rem', sm: '2.5rem', md: '3.75rem' },
                        pb: 3,
                        textTransform: 'uppercase',
                      }}
                    >
                      {renderStackedTextArray(heroSection?.title)}
                    </Typography>
                    {/* <Typography
                      variant='body1'
                      align='center'
                      color='#f5f5f5'
                      fontWeight={600}
                      sx={{
                        fontSize: { xs: '0.9rem', sm: '1rem', md: '1.125rem' },
                        px: 3,
                        pb: 5,
                      }}
                    >
                      {renderStackedTextArray(heroSection?.subtitle)}
                    </Typography> */}
                    <Box
                      sx={{
                        position: 'relative',
                        width: '100%',
                        maxWidth: { xs: '70vw', sm: '60vw', md: '50vw' },
                        aspectRatio: '16/9',
                        mx: 'auto',
                        mb: 5,
                      }}
                    >
                      <Image
                        src={mainVideoSection?.thumbnail}
                        alt='Main Video Thumb'
                        fill
                        style={{
                          objectFit: 'cover',
                          borderRadius: '8px',
                          cursor: 'pointer',
                        }}
                        onClick={() => setModalOpen(true)}
                      />
                      <Button
                        onClick={() => setModalOpen(true)}
                        sx={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                          bgcolor: accentColor,
                          color: '#fff',
                          fontSize: 24,
                          borderRadius: '50%',
                          width: 64,
                          height: 64,
                        }}
                      >
                        <PlayArrow fontSize='large' />
                      </Button>
                      <VideoModal
                        open={modalOpen}
                        onClose={() => setModalOpen(false)}
                        videoUrl={mainVideoSection.videoUrl}
                      />
                    </Box>
                  </>
                ) : (
                  // NOTE version w/o non-breaking cursor
                  // <Typography
                  //   variant='h5'
                  //   align='center'
                  //   color='#fff'
                  //   fontWeight={300}
                  //   className='typewriter cursor'
                  //   sx={{
                  //     pb: 3,
                  //     textTransform: 'uppercase',
                  //     fontFamily: 'monospace',
                  //     whiteSpace: 'normal',
                  //     overflow: 'hidden',
                  //     '&::after': {
                  //       content: '"|"',
                  //       ml: '2px',
                  //       animation: 'blink 1s step-end infinite',
                  //     },
                  //   }}
                  // >
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
                )}
              </Box>
              <Box>
                <CallBooking
                  theme='dark'
                  buttonConfig={{
                    text: 'Book a call',
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
        <Box sx={{ width: '100vw', backgroundColor: colors.primaryBg, py: 8 }}>
          <Container>
            <SectionHeader
              title={benefitsSection?.title}
              subtitle={benefitsSection?.subtitle}
              colors={colors}
            />
            <AnimatedCardCarousel
              items={benefitsSection?.cards || []}
              colors={colors}
              cardHeight={360}
            />
          </Container>
        </Box>
      )}

      {/* MAIN VIDEO DEMO SECTION */}
      {renderVideoSection(mainVideoSection)}

      {/* PACKAGE HIGHLIGHTS SECTION */}
      {packageHighlightsSection && (
        <Box sx={{ width: '100vw', backgroundColor: colors.primaryBg, py: 8 }}>
          <Container>
            <SectionHeader
              title={packageHighlightsSection?.title}
              subtitle={packageHighlightsSection?.subtitle}
              colors={colors}
            />
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                mb: 4,
                maxWidth: 1200,
                mx: 'auto',
              }}
            >
              {/* <Image
                src={packageHighlightsSection?.packageGraphic}
                alt='Design Graphic'
                // NOTE hack to force auto height/width for next/image
                width={0}
                height={0}
                sizes={1200}
                style={{ width: '100%', height: 'auto' }}
              /> */}
              <CircularInfographic
                colors={colors}
                centerIcon={
                  <MovieFilter
                    sx={{
                      color: 'white',
                      fontSize: { xs: 40, md: 60, lg: 100 },
                    }}
                  />
                }
                items={[
                  {
                    icon: <Instagram {...packageIconStyles} />,
                    msg: 'Ready to go short-form posts for Instagram, TikTok, and other social media sites',
                  },
                  {
                    icon: <ConnectedTv {...packageIconStyles} />,
                    msg: 'Use as looping background video in-store or at conventions/events',
                  },
                  {
                    icon: <YouTube {...packageIconStyles} />,
                    msg: 'Run attention grabbing YouTube ads, or embed the videos directly on your website',
                  },
                  {
                    icon: <Devices {...packageIconStyles} />,
                    msg: 'Get high-quality content for all device formats from phone screens to laptops to TVs',
                  },
                  {
                    icon: <Map {...packageIconStyles} />,
                    msg: 'Boost your presence and credibility on Google Maps/Yelp',
                  },
                  {
                    icon: <LocalAtm {...packageIconStyles} />,
                    msg: 'Includes multiple cuts perfect for paid ads on all platforms + A/B testing',
                  },
                ]}
              />
            </Box>
            {/* SOCIAL VIDEO CARDS */}
            <Box mt={4}>
              {/* <SectionHeader
              title={packageHighlightsSection?.title2}
              subtitle={packageHighlightsSection?.subtitle2}
              colors={colors}
            /> */}
              <AnimatedCardCarousel
                items={packageHighlightsSection?.videos || []}
                colors={colors}
                cardHeight={400}
                autoScrollInterval={0}
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
            <SectionHeader
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
      <Box pt={4} backgroundColor={colors.primaryBg}>
      {renderVideoSection(secondaryVideoSection, colors.primaryBg)}
      </Box>

      {/* FAQ SECTION */}
      {faqSection && (
        <Box sx={{ width: '100vw', backgroundColor: colors.primaryBg, pt: 4 }}>
          <Container>
            <SectionHeader
              title='FAQs'
              subtitle='Find answers to common questions about our services'
              colors={colors}
            />
            <Box px={{ xs: 0, sm: 7 }}>
              {faqSection.map((faq, i) => (
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
        backgroundImage={contactSection?.backgroundImage}
        colors={colors}
      />
    </Box>
  );
};

export default LandingPage;
