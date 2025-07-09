import * as React from 'react';
import Head from 'next/head';
import { NextPage } from 'next';
import { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';
import 'src/styles/_app.scss';
import 'src/styles/_core.scss';
import 'src/styles/tailwind.scss';
import { useScrollToTop } from 'src/hooks/';
import { AllAppContexts, LayoutProvider, UserContextProvider } from 'src/shared/context';
import { AppThemeProvider } from 'src/theme/AppThemeProvider';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function App({ Component, pageProps }: AppPropsWithLayout) {
  useScrollToTop();

  const getLayout = Component.getLayout ?? ((page) => page);

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
            <LayoutProvider>
              <UserContextProvider>{getLayout(<Component {...pageProps} />)}</UserContextProvider>
            </LayoutProvider>
          </>
        </AppThemeProvider>
      </AllAppContexts>
    </>
  );
}

export default App;
