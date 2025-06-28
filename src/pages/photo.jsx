import { Box } from '@mui/material';
import ImageButton from '../components/ui/ImageButton';

const categories = [
  { name: 'City', image: '/images/city.jpg' },
  { name: 'Street', image: '/images/street.jpg' },
  { name: 'People', image: '/images/people.jpg' },
  { name: 'Product', image: '/images/product.jpg' },
];

const Photo = () => {
  return (
    // REVIEW background option; require child width + px
    // <Box
    //   sx={{
    //     width: '100vw',
    //     height: '100vh',
    //     backgroundImage: 'url(/images/photo-bg.png)',
    //     backgroundSize: 'cover',
    //     backgroundPosition: 'center',
    //     display: 'flex',
    //     flexDirection: 'column',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //   }}
    // >
    <Box
      sx={{
        pt: 15,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        // width: '50rem',
        // px: 2
      }}
    >
      {categories.map((category, index) => {
        console.log('category =>', category);
        return (
          <ImageButton
            key={index}
            imageUrl={category.image}
            text={category.name}
            href='/gallery'
            width='100%'
          />
        );
      })}
    </Box>
    // </Box>
  );
};

export default Photo;
