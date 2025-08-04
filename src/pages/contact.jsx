import { Container, Typography, Box } from '@mui/material';
import ContactCard from '@/components/ContactCard.jsx';

const Contact = () => (
  <Container maxWidth='sm' sx={{ py: 10 }}>
    <ContactCard title={{ title: 'Say Hello', fontVariant: 'h2' }} />
    <Box sx={{ mt: 6, width: '100%' }}>
      <Typography variant='h5' gutterBottom>
        Our Studio
      </Typography>
      <Box sx={{ mt: 3 }}>
        <object
          data='https://www.openstreetmap.org/export/embed.html?bbox=-118.42781066894533%2C33.95019369509206%2C-118.0913543701172%2C34.1352505344048&amp;layer=mapnik&amp;marker=34.042772590641256%2C-118.25958251953125'
          width='100%'
          height='300'
          style={{ border: '1px solid #ccc', borderRadius: 4 }}
        />
      </Box>
    </Box>
  </Container>
);

export default Contact;
