import * as React from 'react';
import Head from 'next/head';
import { Login } from 'src/modules/Authentication';
import { PublicLayout } from 'src/layouts';

export default function LoginPage(): React.ReactElement {
  return (
    <>
      <Head>
        <title>A-Z Moving: login</title>
      </Head>

      <Login />
    </>
  );
}

LoginPage.getLayout = (page: React.ReactElement) => <PublicLayout>{page}</PublicLayout>;
