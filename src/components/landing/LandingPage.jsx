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
  secondaryBg: isDarkBackground ? '#333333' : '#f5f5f5',
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

const ResponsiveCard = ({ title, description, icon, height = 300, colors }) => (
  <Box
    sx={{
      width: { xs: '90vw', sm: '280px' },
      height,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      p: 3,
      m: 1,
      textAlign: 'center',
      backgroundColor: colors?.secondaryBg || '#222',
      color: colors?.titleText || '#fff',
      borderRadius: 2,
    }}
  >
    {typeof icon === 'string' ? (
      <Avatar src={icon} sx={{ width: 80, height: 80 }} />
    ) : (
      <Box component={icon} sx={{ fontSize: 48, color: accentColor }} />
    )}
    <CardContent>
      <Typography variant='h6' gutterBottom>
        {title}
      </Typography>
      <Typography variant='body2'>{description}</Typography>
    </CardContent>
  </Box>
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
  videoSection,
  packageHighlightsSection,
  testimonialsSection,
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
    50,
  );

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
            {/* Left: Video box */}
            {/* <Box sx={{ flex: 1 }}>
              <Box
                sx={{
                  flex: 1,
                  backgroundColor: 'rgba(0,0,0,0.6)',
                  borderRadius: 2,
                  p: 2,
                  display: 'flex',
                  justifyContent: 'center',
                  aspectRatio: '16/9',
                }}
              >
                <iframe
                  width='100%'
                  height='100%'
                  src={heroSection.videoUrl}
                  title='Hero Video'
                  frameBorder='0'
                  allowFullScreen
                />
              </Box>
            </Box> */}

            {/* Title & CTA box */}
            <Box
              sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                mt: {xs: '100%', sm: '100%', md: '70%', lg: '50%'},
              }}
            >
              {/* Main Title */}
              {/* <Box mb={10}> */}
              <Box mb={4}>
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
                        src={videoSection?.thumbnail}
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
                        videoUrl={videoSection.videoUrl}
                      />
                    </Box>
                  </>
                ) : (
                  <Typography
                    variant='h5'
                    align='center'
                    color='#fff'
                    fontWeight={300}
                    className='typewriter cursor'
                    sx={{
                      pb: 3,
                      textTransform: 'uppercase',
                      fontFamily: 'monospace',
                      // fontFamily: '"Helvetica Neue", Arial, sans-serif',
                      whiteSpace: 'normal',
                      overflow: 'hidden',
                      '&::after': {
                        content: '"|"',
                        ml: '2px',
                        animation: 'blink 1s step-end infinite',
                      },
                    }}
                  >
                    {typedTitle}
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

                {/* <ContactCard
                title={{
                  title: 'Book a FREE consultation today',
                  fontVariant: 'h5',
                }}
                hideProjectType
                // buttonColor={accentColor}
              /> */}
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
            <Grid
              container
              justifyContent='space-evenly'
              width={{ xs: '90vw', sm: '60vw' }}
            >
              {benefitsSection?.cards?.map((card, i) => (
                <ResponsiveCard
                  key={i}
                  {...card}
                  height={360}
                  colors={colors}
                />
              ))}
            </Grid>
          </Container>
        </Box>
      )}

      {/* MAIN VIDEO DEMO SECTION */}
      {videoSection && (
        <Box
          sx={{
            width: '100vw',
            backgroundColor: colors.tertiaryBg,
            py: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <SectionHeader
            title={videoSection?.title}
            subtitle={videoSection?.subtitle}
            colors={colors}
          />

          {/* MAIN FEATURE VIDEO */}
          <Box
            sx={{
              backgroundColor: 'rgb(0, 0, 0, 1)',
              borderRadius: 1,
              p: 1,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              aspectRatio: '16/9',
              width: { xs: '95dvw', sm: '70vw' },
              mx: 'auto',
            }}
          >
            <iframe
              width='100%'
              height='100%'
              src={videoSection.videoUrl}
              title='Hero Video'
              frameBorder='0'
              allowFullScreen
            />
          </Box>
        </Box>
      )}

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
              {/* ANCHOR HERE!!! */}
              <CircularInfographic
                colors={colors}
                center={
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
            <Grid
              container
              spacing={2}
              maxWidth={1100}
              justifyContent='space-around'
            >
              {packageHighlightsSection?.videos?.map((video, i) => (
                <Grid item key={i} xs={12} sm={6} md={4}>
                  <Typography
                    variant='h5'
                    align='center'
                    gutterBottom
                    color={colors.titleText}
                  >
                    {video?.title}
                  </Typography>
                  <Typography
                    variant='h6'
                    align='center'
                    gutterBottom
                    color={colors.subtitleText}
                  >
                    {video?.description}
                  </Typography>
                  <iframe
                    style={{
                      minWidth: 350,
                      height: 'auto',
                      aspectRatio: '16/9',
                    }}
                    // width='100%'
                    // height='240'

                    src={
                      video.videoUrl ||
                      'https://www.youtube.com/embed/dQw4w9WgXcQ'
                    }
                    // title={`Social Cut ${i + 1}`}
                    frameBorder='0'
                    allowFullScreen
                  />
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>
      )}

      {/* TESTIMONIALS SECTION */}
      {testimonialsSection && (
        <Box
          sx={{
            width: '100vw',
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${testimonialsSection?.imageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            py: 8,
          }}
        >
          <Container>
            <SectionHeader
              title='Client Testimonials'
              colors={{ titleText: '#f5f5f5', subtitleText: '#f5f5f5' }}
              // titleVariant='h4'
            />
            <Grid container spacing={2} justifyContent='center'>
              {testimonialsSection?.testimonials?.map((t, i) => (
                <Box key={i} fontStyle='italic'>
                  <ResponsiveCard
                    key={t?.quote}
                    icon={t?.avatar || t?.icon}
                    title={t?.name}
                    description={t?.quote}
                    height='fit-content'
                    colors={{ secondaryBg: '#222', titleText: '#fff' }}
                  />
                </Box>
              ))}
            </Grid>
          </Container>
        </Box>
      )}

      {/* FAQ SECTION */}
      {faqSection && (
        <Box sx={{ width: '100vw', backgroundColor: colors.primaryBg, pt: 8 }}>
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
