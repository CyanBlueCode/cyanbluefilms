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
} from '@mui/material';
import { KeyboardArrowDown, PlayArrow, Close } from '@mui/icons-material';
import ContactCard from '@/components/ContactCard';
import CallBooking from '@/components/landing/CallBooking';

const accentColor = 'cyanBlue.main';

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

const ResponsiveCard = ({ title, description, icon, height = 300 }) => (
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
      backgroundColor: '#222',
      color: '#fff',
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

const SectionHeader = ({
  title,
  subtitle,
  titleVariant = 'h3',
  color = '#191919',
}) => (
  <>
    <Typography
      variant={titleVariant}
      align='center'
      color={color}
      textTransform='uppercase'
      fontWeight={600}
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
      color={color}
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
  contactSection,
}) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <Box sx={{ width: '100vw', overflowX: 'hidden' }}>
      {/* HERO SECTION */}
      {heroSection && (
        <Box
          sx={{
            position: 'relative',
            width: '100vw',
            height: '100dvh',
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${heroSection?.imageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            py: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
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

            {/* Right: Title & CTA box */}
            <Box
              sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <Box>
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
                {/* ANCHOR */}
                {/* IMAGE VIDEO MODAL */}
                <Box
                  sx={{
                    position: 'relative',
                    width: '100%',
                    maxWidth: { xs: '90vw', sm: '70vw', md: '50vw' },
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
              </Box>
              <Box>
                <CallBooking
                  theme='dark'
                  buttonConfig={{
                    text: 'Book a FREE consultation today',
                    color: 'primary',
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
        <Box sx={{ width: '100vw', backgroundColor: '#f5f5f5', py: 8 }}>
          <Container>
            <SectionHeader
              title={benefitsSection?.title}
              subtitle={benefitsSection?.subtitle}
            />
            <Grid
              container
              justifyContent='space-evenly'
              width={{ xs: '90vw', sm: '60vw' }}
            >
              {benefitsSection?.cards?.map((card, i) => (
                <ResponsiveCard key={i} {...card} />
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
            backgroundColor: '#eaeaea',
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
        <Box sx={{ width: '100vw', backgroundColor: '#fff', py: 8 }}>
          <Container>
            <SectionHeader
              title={packageHighlightsSection?.title}
              subtitle={packageHighlightsSection?.subtitle}
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
              <Image
                src={packageHighlightsSection?.packageGraphic}
                alt='Design Graphic'
                // NOTE hack to force auto height/width for next/image
                width={0}
                height={0}
                sizes={1200}
                style={{ width: '100%', height: 'auto' }}
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
                  <Typography variant='h5' align='center' gutterBottom>
                    {video?.title}
                  </Typography>
                  <Typography variant='h6' align='center' gutterBottom>
                    {video?.description}
                  </Typography>
                  <iframe
                    width='100%'
                    height='240'
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
              color='#f5f5f5'
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
                  />
                </Box>
              ))}
            </Grid>
          </Container>
        </Box>
      )}
      {console.log(' =>', contactSection?.backgroundImage)}

      {/* CONTACT / BOOK A CALL SECTION */}
      <Box
        sx={{
          width: '100vw',
          py: 8,
          backgroundImage: contactSection?.backgroundImage
            ? `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${contactSection.backgroundImage})`
            : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Container>
          <Typography
            variant='h4'
            align='center'
            // color='#f5f5f5'
            pt={5}
            pb={3}
            gutterBottom
          >
            Upgrade Your Marketing Today
          </Typography>
          <Box px={{ xs: 0, sm: 7 }}>
            <ContactCard
              title={{
                title: 'Let us know how we can help',
                fontVariant: 'h5',
              }}
              // hideProjectType
              // buttonColor={accentColor}
            />
          </Box>
          <Typography
            variant='h4'
            align='center'
            // color='#f5f5f5'
            pt={5}
            pb={3}
            gutterBottom
          >
            Book a Call
          </Typography>
          <CallBooking theme='light' />
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage;
