import * as React from 'react';
import Head from 'next/head';
import { Contact } from 'src/modules/Contact';
import { PublicLayout } from 'src/layouts';

export default function ContactPage(): React.JSX.Element {
  return (
    <>
      <Head>
        <title>A-Z Moving: Contact Us</title>
      </Head>
      <Contact />
    </>
  );
}

ContactPage.getLayout = (page: React.ReactElement) => <PublicLayout>{page}</PublicLayout>;
