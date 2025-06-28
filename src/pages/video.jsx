import { Box, Typography } from '@mui/material';

const VIDEOS = [
  {
    id: 'dQw4w9WgXcQ',
    title: 'Project Aurora',
    description: 'Commercial project for tech brand',
  },
  {
    id: 'oHg5SJYRHA0',
    title: 'Urban Dreams',
    description: 'Short film about city life',
  },
  {
    id: 'jNQXAC9IVRw',
    title: 'Mountain Odyssey',
    description: 'Documentary about alpine exploration',
  },
];

const Video = () => (
  <Box sx={{ py: 4 }}>
    {VIDEOS.map((video, index) => (
      <Box key={index} sx={{ mb: 8, width: '100%' }}>
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            paddingTop: '56.25%', // 16:9 aspect ratio
            mb: 2,
          }}
        >
          <iframe
            src={`https://www.youtube.com/embed/${video.id}`}
            title={video.title}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              border: 'none',
            }}
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
          />
        </Box>
        <Typography variant='h4' gutterBottom>
          {video.title}
        </Typography>
        <Typography variant='body1'>{video.description}</Typography>
      </Box>
    ))}
  </Box>
);

export default Video;
