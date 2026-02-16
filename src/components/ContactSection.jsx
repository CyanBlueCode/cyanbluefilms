import { Container, Box } from '@mui/material';
import ContactCard from '@/components/ContactCard.jsx';
import CallBooking from '@/components/landing/CallBooking';
import { TitleSection } from '@/utils/TextHelpers';

const ContactSection = ({
  title = 'Upgrade Your Marketing Today',
  titleVariant = 'h3',
  isUpperCase = true,
  contactTitle,
  contactTitleVariant = 'h5',
  callBookingTitle = 'Book a call',
  // callBookingTitleVariant,
  backgroundImage,
  showMap = false,
  containerMaxWidth = 'lg',
  containerSx = {},
  isPageTitle = false,
  colors,
}) => (
  <Box
    sx={{
      width: '100vw',
      pt: 8,
      backgroundColor: colors?.primaryBg,
      backgroundImage: backgroundImage
        ? `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${backgroundImage})`
        : 'none',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}
  >
    <Container maxWidth={containerMaxWidth} sx={containerSx}>
      <TitleSection
        title={title}
        titleVariant={titleVariant}
        isUpperCase={isUpperCase}
        colors={colors}
        isPageTitle={isPageTitle}
      />
      <Box pb={4}>
        <ContactCard
          title={{
            title: contactTitle,
            fontVariant: contactTitleVariant,
          }}
          colors={colors}
        />
      </Box>
      <TitleSection
        title={callBookingTitle}
        // titleVariant={callBookingTitleVariant}
        isUpperCase={isUpperCase}
        colors={colors}
      />
      <CallBooking theme='dark' />
      {showMap && (
        <>
          {/* NOTE black box to hide cal.com logo */}
          <Box
            sx={{
              backgroundColor: '#000',
              height: '40px',
              width: '100%',
              mt: { xs: 0, sm: '-70px' },
              zIndex: 1,
            }}
          />
          <Box
            sx={{
              width: '100%',
              backgroundColor: '#000',
              zIndex: 1,
            }}
          >
            <TitleSection
              title='Our DTLA Studio'
              // titleVariant={callBookingTitleVariant}
              isUpperCase={isUpperCase}
              colors={colors}
            />
            <Box>
              <object
                data='https://www.openstreetmap.org/export/embed.html?bbox=-118.42781066894533%2C33.95019369509206%2C-118.0913543701172%2C34.1352505344048&amp;layer=mapnik&amp;marker=34.042772590641256%2C-118.25958251953125'
                width='100%'
                height='300'
                style={{
                  border: 'none',
                  borderRadius: 8,
                  filter: 'invert(1) hue-rotate(180deg)',
                }}
              />
            </Box>
          </Box>
        </>
      )}
    </Container>
  </Box>
);

export default ContactSection;
