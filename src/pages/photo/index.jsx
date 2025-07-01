// import { Box } from '@mui/material';
// import ImageButton from '../../components/ui/ImageButton';

// const categories = [
//   { name: 'City', image: '/images/city.jpg' },
//   { name: 'Street', image: '/images/street.jpg' },
//   { name: 'People', image: '/images/people.jpg' },
//   { name: 'Product', image: '/images/product.jpg' },
// ];

// const Photo = () => {
//   return (
//     // REVIEW version with image background; require child width + padding x
//     // <Box
//     //   sx={{
//     //     width: '100vw',
//     //     height: '100vh',
//     //     backgroundImage: 'url(/images/photo-bg.png)',
//     //     backgroundSize: 'cover',
//     //     backgroundPosition: 'center',
//     //     display: 'flex',
//     //     flexDirection: 'column',
//     //     justifyContent: 'center',
//     //     alignItems: 'center',
//     //   }}
//     // >
//     <Box
//       sx={{
//         pt: 15,
//         display: 'flex',
//         flexDirection: 'column',
//         justifyContent: 'center',
//         alignItems: 'center',
//         // width: '50rem',
//         // px: 2
//       }}
//     >
//       {categories.map((category, index) => {
//         console.log('category =>', category);
//         return (
//           <ImageButton
//             key={index}
//             imageUrl={category.image}
//             text={category.name}
//             href={`/photo/${category?.name?.toLocaleLowerCase()}`}
//             width='100%'
//           />
//         );
//       })}
//     </Box>
//     // </Box>
//   );
// };

// export default Photo;

import { Box } from '@mui/material';
import ImageButton from '../../components/ui/ImageButton';

const categories = [
  { name: 'City', image: '/images/city.jpg' },
  { name: 'Street', image: '/images/street.jpg' },
  { name: 'People', image: '/images/people.jpg' },
  { name: 'Product', image: '/images/product.jpg' },
];

const Photo = () => (
  <Box
    sx={{
      pt: 15,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    {categories.map((category, index) => (
      <ImageButton
        key={index}
        imageUrl={category.image}
        text={category.name}
        href={`/photo/${category.name.toLowerCase()}`}
        width='100%'
      />
    ))}
  </Box>
);

export default Photo;
