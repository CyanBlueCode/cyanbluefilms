import { Container, Box } from '@mui/material';
import ContactCard from '@/components/ContactCard.jsx';
import CallBooking from '@/components/landing/CallBooking';
import { SectionHeader } from '@/utils/TextHelpers';

const ContactSection = ({
  title = 'Upgrade Your Marketing Today',
  titleVariant = 'h3',
  isUpperCase = true,
  contactTitle,
  contactTitleVariant = 'h5',
  callBookingTitle = 'Book a call',
  callBookingTitleVariant = 'h4',
  backgroundImage,
  showMap = false,
  containerMaxWidth = 'lg',
  containerSx = {},
  colors = {
    primaryBg: '#000000',
    titleText: '#ffffff',
  },
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
      <SectionHeader
        title={title}
        titleVariant={titleVariant}
        isUpperCase={isUpperCase}
        colors={colors}
        pb={2}
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
      <SectionHeader
        title={callBookingTitle}
        titleVariant={callBookingTitleVariant}
        isUpperCase={isUpperCase}
        colors={colors}
      />
      <CallBooking theme={colors?.titleText === '#ffffff' ? 'dark' : 'light'} />
      {showMap && (
        <Box
          sx={{
            width: '100%',
            mt: { xs: '50px', sm: '-50px' },
            backgroundColor: '#000',
            zIndex: 1,
          }}
        >
          <SectionHeader
            title='Our studio'
            titleVariant={callBookingTitleVariant}
            isUpperCase={isUpperCase}
            colors={colors}
          />
          <Box>
            <object
              data='https://www.openstreetmap.org/export/embed.html?bbox=-118.42781066894533%2C33.95019369509206%2C-118.0913543701172%2C34.1352505344048&amp;layer=mapnik&amp;marker=34.042772590641256%2C-118.25958251953125'
              width='100%'
              height='300'
              style={{ border: 'none', borderRadius: 8, filter: 'invert(1) hue-rotate(180deg)' }}
            />
          </Box>
        </Box>
      )}
    </Container>
  </Box>
);

export default ContactSection;
