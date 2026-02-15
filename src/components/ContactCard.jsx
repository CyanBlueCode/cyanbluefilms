import { useState } from 'react';
import {
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
  Card,
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

const ContactCard = ({
  title = { title: 'Say Hello', fontVariant: 'h2' },
  hideProjectType = false,
  colors = {
    primaryBg: '#000000',
    titleText: '#ffffff',
    bodyText: '#ffffff',
  },
}) => {
  const fieldSx = {
    '& .MuiInputLabel-root': { color: colors?.bodyText },
    '& .MuiOutlinedInput-root': {
      color: colors?.bodyText,
      '& fieldset': { borderColor: colors?.bodyText },
      '&:hover fieldset': { borderColor: colors?.bodyText },
      '&.Mui-focused fieldset': { borderColor: colors?.bodyText },
    },
    '& .MuiInputLabel-root.Mui-focused': { color: colors?.bodyText },
  };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    message: '',
    [process.env.NEXT_PUBLIC_HONEYPOT_FIELD || 'website_url']: '',
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'phone') {
      // Only allow numbers, spaces, parentheses, hyphens, and plus signs
      const phoneValue = value.replace(/[^0-9\s()+-]/g, '');
      setFormData({ ...formData, [name]: phoneValue });
    } else {
      setFormData({ ...formData, [name]: value });
    }
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
    <Card
      sx={{
        backgroundColor: colors?.primaryBg || 'white',
        borderRadius: '8px',
        p: 3,
        pt: 1,
        boxShadow: 'none',
        '&:before': { display: 'none' },
      }}
    >
      { title?.title && <Typography variant={title?.fontVariant} gutterBottom color={colors?.titleText}>
        {title.title}
      </Typography>}

      <Box component='form' onSubmit={handleSubmit}>
        {/* NOTE basic honeypot for bots */}
        <TextField
          name={process.env.NEXT_PUBLIC_HONEYPOT_FIELD || 'website_url'}
          value={
            formData[process.env.NEXT_PUBLIC_HONEYPOT_FIELD || 'website_url']
          }
          onChange={handleChange}
          sx={{ display: 'none' }}
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
          sx={fieldSx}
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
          inputProps={{
            pattern: '[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$'
          }}
          sx={fieldSx}
        />

        <TextField
          fullWidth
          label='Phone'
          name='phone'
          type='phone'
          value={formData.phone}
          onChange={handleChange}
          margin='normal'
          sx={fieldSx}
        />

        {!hideProjectType && (
          <FormControl fullWidth margin='normal' required sx={fieldSx}>
            <InputLabel>Project Type</InputLabel>
            <Select
              name='projectType'
              value={formData.projectType}
              onChange={handleChange}
              label='Project Type'
              MenuProps={{
                PaperProps: {
                  sx: {
                    backgroundColor: colors?.primaryBg,
                    color: colors?.titleText,
                    '& .MuiMenuItem-root': {
                      color: colors?.titleText,
                      '&:hover': {
                        backgroundColor: colors?.secondaryBg,
                      },
                    },
                  },
                },
              }}
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
        )}

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
          sx={fieldSx}
        />

        <Button
          type='submit'
          variant='outlined'
          sx={{
            mt: 3,
            backgroundColor: 'transparent',
            borderWidth: '2px',
            borderColor: '#666666',
            borderRadius: '8px',
            color: colors?.titleText,
            fontSize: '1.2rem',
            '&:hover': {
              backgroundColor: 'transparent',
              borderColor: colors?.titleText,
            },
          }}
          fullWidth
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </Button>
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
    </Card>
  );
};

export default ContactCard;