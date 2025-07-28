import * as React from 'react';
import Head from 'next/head';
import { PublicLayout } from 'src/layouts';
import { AboutUs } from 'src/modules/AboutUs';

export default function AboutUsPage(): React.ReactElement {
  return (
    <>
      <Head>
        <title>A-Z Moving: About us</title>
      </Head>

      <AboutUs />
    </>
  );
}

AboutUsPage.getLayout = (page: React.ReactElement) => <PublicLayout>{page}</PublicLayout>;
