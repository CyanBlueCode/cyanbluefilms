import React from 'react';
import { Box, Typography } from '@mui/material';

export const TitleSection = ({
  title,
  subtitle,
  titleVariant = 'h3',
  color = '#eaeaea',
  fontWeight = 600,
  isUpperCase = true,
  isPageTitle = false,
  colors,
  px,
  pt = 2,
  pb = 6,
}) =>
  isPageTitle ? (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        mx: 'auto',
        px: px,
        pt: pt,
        pb: pb,
        maxWidth: '90vw',
      }}
    >
      <Typography
        variant={titleVariant}
        align='center'
        color={colors?.titleText || color}
        textTransform={isUpperCase ? 'uppercase' : 'capitalize'}
        fontWeight={fontWeight}
        sx={{ mb: subtitle ? 2 : 0, px: 1 }}
      >
        {title}
      </Typography>
      {subtitle && (
        <Typography
          variant='h6'
          align='center'
          px={2}
          fontWeight={400}
          color={colors?.subtitleText || color}
        >
          {subtitle}
        </Typography>
      )}
    </Box>
  ) : (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        mx: 'auto',
        px: px,
        pt: pt,
        pb: pb,
        maxWidth: '90vw',
      }}
    >
      <Typography
        variant={titleVariant}
        align='center'
        color={colors?.titleText || color}
        textTransform={isUpperCase ? 'uppercase' : 'none'}
        fontWeight={fontWeight}
        gutterBottom
      >
        {title}
      </Typography>
      {subtitle && (
        <Typography
          variant='h6'
          align='center'
          px={2}
          fontWeight={400}
          color={colors?.subtitleText || color}
        >
          {subtitle}
        </Typography>
      )}
    </Box>
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
