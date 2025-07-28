import * as React from 'react';
import Head from 'next/head';
import { ContactUs } from 'src/modules/ContactUs';
import { PublicLayout } from 'src/layouts';

export default function ContactPage(): React.JSX.Element {
  return (
    <>
      <Head>
        <title>A-Z Moving: Contact Us</title>
      </Head>

      <ContactUs />
    </>
  );
}

ContactPage.getLayout = (page: React.ReactElement) => <PublicLayout>{page}</PublicLayout>;
