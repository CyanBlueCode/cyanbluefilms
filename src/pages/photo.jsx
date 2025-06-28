import ImageButton from '../components/ui/ImageButton';

const categories = [
  { name: 'Street Photography', image: '/images/street.jpg' },
  { name: 'City / Landscape', image: '/images/city.jpg' },
  { name: 'Portraits', image: '/images/portraits.jpg' },
  { name: 'Nature', image: '/images/nature.jpg' },
];

const Photo = () => {
  return (
    <div
      style={{
        paddingTop: '6rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      {categories.map((category, index) => (
        <ImageButton
          key={index}
          imageUrl={category.image}
          text={category.name}
          href='/gallery'
          width='100%'
        />
      ))}
    </div>
  );
}

export default Photo;