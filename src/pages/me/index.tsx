import * as React from 'react';
import Head from 'next/head';
import { PrivateLayout } from 'src/layouts';
import { Profile } from 'src/modules/Profile';

export default function ProfilePage(): React.ReactElement {
  return (
    <>
      <Head>
        <title>A-Z Moving: Profile</title>
      </Head>

      <Profile />
    </>
  );
}

ProfilePage.getLayout = (page: React.ReactElement) => <PrivateLayout>{page}</PrivateLayout>;
