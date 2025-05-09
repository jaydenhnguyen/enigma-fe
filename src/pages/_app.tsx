import * as React from 'react';
import Head from 'next/head';
import { AppProps as NextAppProps } from 'next/app';
import { CssBaseline } from '@mui/material';
import '../styles/fonts';
import '../styles/_app.scss';
import '../styles/_core.scss';
import '../styles/tailwind.scss';

type AppInitialProps = {
  pageProps: {
    user: unknown;
    dehydratedState: unknown;
  };
};

type AppProps = AppInitialProps & Omit<NextAppProps, 'pageProps'>;

function EnigmaApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>AZ moving Admin</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text
          y=%22.9em%22 font-size=%2290%22></text></svg>"
        />
      </Head>

      {/*<ThemeProvider theme={}>*/}
      <CssBaseline />

      <Component {...pageProps} />
      {/*</ThemeProvider>*/}
    </>
  );
}

export default EnigmaApp;
