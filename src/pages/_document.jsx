import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        <meta charSet='UTF-8' />
        <meta
          name='description'
          content='Cyan Blue Films LLC - Professional commercial video production company based in sunny Los Angeles, California.'
        />
        <meta
          name='keywords'
          content='photography, videography, portfolio, film production, commercials'
        />
        <meta name='author' content='Cyan Blue Films' />
        <link rel='icon' href='/favicon.ico' />
        <link rel='canonical' href='https://cyanbluefilms.com' />

        {/* Open Graph tags */}
        <meta property='og:title' content='Cyan Blue Films' />
        <meta
          property='og:description'
          content='Cyan Blue Films LLC - Professional commercial video production company based in sunny Los Angeles, California.'
        />
        <meta property='og:type' content='website' />
        <meta property='og:url' content='https://cyanbluefilms.com' />
        <meta
          property='og:image'
          // content='https://cyanbluefilms.com/images/og-image.jpg'
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
