import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="description" content="CyanBlue Films - Professional video production and photography" />
        <meta name="keywords" content="photography, videography, portfolio, film production" />
        <meta name="author" content="CyanBlue Films" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://cyanbluefilms.com" />
        
        {/* Open Graph tags */}
        <meta property="og:title" content="CyanBlue Films" />
        <meta property="og:description" content="Professional video production and photography portfolio" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://cyanbluefilms.com" />
        <meta property="og:image" content="https://cyanbluefilms.com/images/og-image.jpg" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="CyanBlue Films" />
        <meta name="twitter:description" content="Professional video production and photography portfolio" />
        <meta name="twitter:image" content="https://cyanbluefilms.com/images/twitter-image.jpg" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}