import ImageButton from '../components/ui/ImageButton';

const categories = [
  { name: 'FILM', image: '/images/film.jpg', href: '/film' },
  { name: 'PHOTO', image: '/images/photo.jpg', href: '/photo' }
];

const Projects = () =>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
             alignItems: 'center'
          }}
        >
          {categories.map(({image, name, href}, index) => (
            <ImageButton
              key={index}
              imageUrl={image}
              text={name}
              href={href}
              width='100%'
            />
          ))}
        </div>

export default Projects;