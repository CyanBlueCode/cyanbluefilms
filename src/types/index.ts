import { ReactElement, ReactNode } from 'react';
import { TypographyProps } from '@mui/material';

export type TypographyVariant = TypographyProps['variant'];

export interface LandingPageProps {
    heroSection?: {
        title: string | ReactElement;
        subtitle?: (string | ReactElement)[];
        callButtonText?: string | ReactElement;
        backgroundVideo?: {
            filePath: string;
            posterFramePath?: string;
            vidWidth?: number;
            codec?: string;
            audio?: boolean;
        };
        imageUrl?: string; // REVIEW deprecated?
    };
    benefitsSection?: {
        title: string | ReactElement;
        subtitle?: string | ReactElement;
        cards: Array<{
            title: string | ReactElement;
            description: string | ReactElement;
            icon?: any;
        }>;
    };
    mainVideoSection?: VideoSectionData;
    secondaryVideoSection?: VideoSectionData;
    packageHighlightsSection?: {
        title: string;
        subtitle: string;
        title2?: string;
        subtitle2?: string;
        packageGraphic?: string;
        videos: Array<{ title: string; videoUrl: string; }>;
        infographic: {
            title?: string;
            subtitle?: string;
            centerText?: string;
            centerIcon?: ReactElement;
            items?: Array<{ msg: string; imageSrc: string; icon: ReactElement }>;
        }
    };
    processSection?: any;
    clientBrandsSection?: any;
    faqSection?: {
        title: string | ReactElement;
        subtitle?: string | ReactElement;
        items: Array<{
            question: string | ReactElement;
            answer: string | ReactElement;
        }>;
    };
    contactSection?: any;
    isDarkBackground?: boolean;
    isLightText?: boolean;
}

export interface VideoSectionData {
    title?: string | ReactElement;
    subtitle?: string | ReactElement;
    videoUrl?: string;
    imageUrl?: string;
}

export interface ColorTheme {
    titleText?: string;
    bodyText?: string;
    primaryBg?: string;
    secondaryBg?: string;
    tertiaryBg?: string;
    subtitleText?: string;
}

export interface ApiResponse<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}