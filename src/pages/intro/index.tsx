import * as React from 'react';
import Head from 'next/head';
import { PublicLayout } from 'src/layouts';
import { Introduction } from 'src/modules/Introduction';

export default function IntroPage(): React.ReactElement {
  return (
    <>
      <Head>
        <title>A-Z Moving: Introduction</title>
      </Head>

      <Introduction />
    </>
  );
}

IntroPage.getLayout = (page: React.ReactElement) => <PublicLayout>{page}</PublicLayout>;
