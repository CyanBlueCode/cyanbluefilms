import React from 'react';
import { Typography } from '@mui/material';

export const SectionHeader = ({
  title,
  subtitle,
  titleVariant = 'h3',
  color = '#191919',
  fontWeight = 600,
  isUpperCase = true,
}) => (
  <>
    <Typography
      variant={titleVariant}
      align='center'
      color={color}
      textTransform={isUpperCase ? 'uppercase' : 'none'}
      fontWeight={fontWeight}
      gutterBottom
    >
      {title}
    </Typography>
    <Typography
      variant='h6'
      align='center'
      pb={5}
      px={2}
      fontWeight={400}
      color={color}
      sx={{ maxWidth: { xs: '90vw', sm: '70vw', md: '50vw' } }}
    >
      {subtitle}
    </Typography>
  </>
);

export const renderStackedTextArray = (text) =>
  Array.isArray(text)
    ? text.map((line, i) => (
        <React.Fragment key={i}>
          {line}
          {i < text.length - 1 && <br />}
        </React.Fragment>
      ))
    : text;