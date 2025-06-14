import * as React from 'react';
import Head from 'next/head';
import { PublicLayout } from 'src/layouts';
import { ContactUs } from 'src/modules/ContactUs';

export default function ContactPage(): React.ReactElement {
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
