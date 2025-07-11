import { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Snackbar,
  Alert,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';

const PROJECT_TYPES = [
  'Commercial',
  'Documentary',
  'Narrative Film',
  'Short Form Content',
  'Brand Content',
  'Collaboration',
  'Other',
];

const Contact = () => {
  // Update state to include new fields
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    message: '',
    [process.env.NEXT_PUBLIC_HONEYPOT_FIELD || 'website_url']: '', // Honeypot
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSnackbarMessage('Message sent successfully!');
        setSnackbarSeverity('success');
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          projectType: '',
          message: '',
          [process.env.NEXT_PUBLIC_HONEYPOT_FIELD || 'website_url']: '',
        });
      } else {
        throw new Error(data.error || 'Failed to send message');
      }
    } catch (error) {
      setSnackbarMessage(error.message || 'Error sending message');
      setSnackbarSeverity('error');
    } finally {
      setOpenSnackbar(true);
      setIsSubmitting(false);
    }
  };

  return (
    <Container maxWidth='sm' sx={{ py: 10 }}>
      <Typography variant='h2' gutterBottom>
        Say Hello
      </Typography>

      <Box component='form' onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <TextField
          name={process.env.NEXT_PUBLIC_HONEYPOT_FIELD || 'website_url'}
          value={
            formData[process.env.NEXT_PUBLIC_HONEYPOT_FIELD || 'website_url']
          }
          onChange={handleChange}
          sx={{ display: 'none' }} // Hide visually
          aria-hidden='true'
        />

        <TextField
          fullWidth
          label='Name'
          name='name'
          value={formData.name}
          onChange={handleChange}
          margin='normal'
          required
        />

        <TextField
          fullWidth
          label='Email'
          name='email'
          type='email'
          value={formData.email}
          onChange={handleChange}
          margin='normal'
          required
        />

        <TextField
          fullWidth
          label='Phone'
          name='phone'
          type='phone'
          value={formData.phone}
          onChange={handleChange}
          margin='normal'
        />

        <FormControl fullWidth margin='normal' required>
          <InputLabel>Project Type</InputLabel>
          <Select
            name='projectType'
            value={formData.projectType}
            onChange={handleChange}
            label='Project Type'
          >
            <MenuItem value=''>
              <em>Select project type</em>
            </MenuItem>
            {PROJECT_TYPES.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          fullWidth
          label='Message'
          name='message'
          value={formData.message}
          onChange={handleChange}
          margin='normal'
          required
          multiline
          rows={5}
        />

        <Button
          type='submit'
          variant='contained'
          color='primary'
          sx={{ mt: 3 }}
          fullWidth
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </Button>
      </Box>

      {/* Studio map */}
      <Box sx={{ mt: 6, width: '100%' }}>
        <Typography variant='h5' gutterBottom>
          Our Studio
        </Typography>
        <Box sx={{ mt: 3 }}>
          <object
            // NOTE: embedded map only zoomed in at correct level on initial load; known Chrome cache issue. difficult problem.
            data='https://www.openstreetmap.org/export/embed.html?bbox=-118.42781066894533%2C33.95019369509206%2C-118.0913543701172%2C34.1352505344048&amp;layer=mapnik&amp;marker=34.042772590641256%2C-118.25958251953125'
            width='100%'
            height='300'
            style={{ border: '1px solid #ccc', borderRadius: 4 }}
          />
          {/* <Typography variant='body2' sx={{ mt: 1 }}>
            <a
              // G-Maps nav to link
              href='https://www.google.com/maps/dir/?api=1&destination=409+W+Olympic+Blvd,+Los+Angeles,+CA+90015'
              target='_blank'
              rel='noreferrer'
            >
              409 W. Olympic Blvd. Los Angeles, CA 90015
            </a>
          </Typography> */}
        </Box>
      </Box>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Contact;
