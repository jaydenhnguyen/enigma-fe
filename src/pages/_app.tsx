import * as React from 'react';
import Head from 'next/head';
import { AppProps as NextAppProps } from 'next/app';
import '../styles/_app.scss';
import '../styles/_core.scss';
import '../styles/tailwind.scss';
import { useScrollToTop } from '../hooks';
import { AllAppContexts } from '../shared';
import { AppThemeProvider } from '../theme/AppThemeProvider';
import { ToastContainer } from 'react-toastify';

type AppInitialProps = {
  pageProps: {
    user: unknown;
    dehydratedState: unknown;
  };
};

type AppProps = AppInitialProps & Omit<NextAppProps, 'pageProps'>;

function App({ Component, pageProps }: AppProps) {
  useScrollToTop();

  return (
    <>
      <Head>
        <title>AZ Moving Admin</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text
          y=%22.9em%22 font-size=%2290%22></text></svg>"
        />
      </Head>

      <AllAppContexts>
        <AppThemeProvider>
          <>
            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar
              newestOnTop
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              pauseOnHover
            />
            <Component {...pageProps} />
          </>
        </AppThemeProvider>
      </AllAppContexts>
    </>
  );
}

export default App;
