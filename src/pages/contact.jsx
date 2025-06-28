import { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Snackbar,
  Alert,
} from '@mui/material';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulate form submission
    setTimeout(() => {
      setSnackbarMessage('Message sent successfully!');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
      setFormData({ name: '', email: '', message: '' });
    }, 1000);
  };

  return (
    <Container maxWidth='sm' sx={{ py: 4 }}>
      <Typography variant='h2' gutterBottom>
        Contact Us
      </Typography>

      <Box component='form' onSubmit={handleSubmit} sx={{ mt: 3 }}>
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
          label='Message'
          name='message'
          value={formData.message}
          onChange={handleChange}
          margin='normal'
          required
          multiline
          rows={4}
        />

        <Button
          type='submit'
          variant='contained'
          color='primary'
          sx={{ mt: 3 }}
          fullWidth
        >
          Send Message
        </Button>
      </Box>

      <Box sx={{ mt: 6, width: '100%' }}>
        <Typography variant='h5' gutterBottom>
          Our Studio
        </Typography>
        <Box
          sx={{
            width: '100%',
            height: 300,
            backgroundColor: '#e0e0e0',
            borderRadius: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography>Google Map Embed Here</Typography>
        </Box>
        <Typography variant='body1' sx={{ mt: 2 }}>
          123 Cinema Street, Los Angeles, CA 90028
        </Typography>
      </Box>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
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
}

export default Contact;

// TODO https://www.emailjs.com/ version; update & uncomment after account sign up & credentials
// import { useState } from 'react';
// import emailjs from 'emailjs-com';
// import {
//   Container,
//   TextField,
//   Button,
//   Typography,
//   Box,
//   Snackbar,
//   Alert
// } from '@mui/material';

// const Contact = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     message: ''
//   });
//   const [errors, setErrors] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [openSnackbar, setOpenSnackbar] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState('');
//   const [snackbarSeverity, setSnackbarSeverity] = useState('success');

//   const validate = () => {
//     const newErrors = {};
//     if (!formData.name.trim()) newErrors.name = 'Name is required';
//     if (!formData.email.trim()) {
//       newErrors.email = 'Email is required';
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
//       newErrors.email = 'Email is invalid';
//     }
//     if (!formData.message.trim()) newErrors.message = 'Message is required';
//     return newErrors;
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));

//     // Clear error when user types
//     if (errors[name]) {
//       setErrors(prev => ({ ...prev, [name]: null }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const validationErrors = validate();

//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       // Replace with your EmailJS service details
//       await emailjs.send(
//         'your_service_id',
//         'your_template_id',
//         {
//           from_name: formData.name,
//           reply_to: formData.email,
//           message: formData.message,
//           to_email: 'hello@cyanbluefilms.com'
//         },
//         'your_user_id'
//       );

//       setSnackbarMessage('Message sent successfully!');
//       setSnackbarSeverity('success');
//       setFormData({ name: '', email: '', message: '' });
//     } catch (error) {
//       console.error('Failed to send email:', error);
//       setSnackbarMessage('Failed to send message. Please try again later.');
//       setSnackbarSeverity('error');
//     } finally {
//       setIsSubmitting(false);
//       setOpenSnackbar(true);
//     }
//   };

//   return (
//     <Container maxWidth="sm" sx={{ py: 4 }}>
//       <Typography variant="h2" gutterBottom>
//         Contact Us
//       </Typography>

//       <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
//         <TextField
//           fullWidth
//           label="Name"
//           name="name"
//           value={formData.name}
//           onChange={handleChange}
//           margin="normal"
//           required
//           error={!!errors.name}
//           helperText={errors.name}
//         />

//         <TextField
//           fullWidth
//           label="Email"
//           name="email"
//           type="email"
//           value={formData.email}
//           onChange={handleChange}
//           margin="normal"
//           required
//           error={!!errors.email}
//           helperText={errors.email}
//         />

//         <TextField
//           fullWidth
//           label="Message"
//           name="message"
//           value={formData.message}
//           onChange={handleChange}
//           margin="normal"
//           required
//           multiline
//           rows={4}
//           error={!!errors.message}
//           helperText={errors.message}
//         />

//         <Button
//           type="submit"
//           variant="contained"
//           color="primary"
//           sx={{ mt: 3 }}
//           fullWidth
//           disabled={isSubmitting}
//         >
//           {isSubmitting ? 'Sending...' : 'Send Message'}
//         </Button>
//       </Box>

//       <Box sx={{ mt: 6, width: '100%' }}>
//         <Typography variant="h5" gutterBottom>
//           Our Studio
//         </Typography>
//         <Box sx={{
//           width: '100%',
//           height: 300,
//           backgroundColor: '#e0e0e0',
//           borderRadius: 1,
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center'
//         }}>
//           <Typography>Google Map Embed Here</Typography>
//         </Box>
//         <Typography variant="body1" sx={{ mt: 2 }}>
//           123 Cinema Street, Los Angeles, CA 90028
//         </Typography>
//       </Box>

//       <Snackbar
//         open={openSnackbar}
//         autoHideDuration={6000}
//         onClose={() => setOpenSnackbar(false)}
//       >
//         <Alert
//           onClose={() => setOpenSnackbar(false)}
//           severity={snackbarSeverity}
//           sx={{ width: '100%' }}
//         >
//           {snackbarMessage}
//         </Alert>
//       </Snackbar>
//     </Container>
//   );
// };

// export default Contact;
