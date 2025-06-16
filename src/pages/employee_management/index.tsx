import * as React from 'react';
import Head from 'next/head';
import { PrivateLayout } from 'src/layouts';

export default function EmployeeManagementPage(): React.ReactElement {
  return (
    <>
      <Head>
        <title>A-Z Moving: Employee Management</title>
      </Head>

      <div>this is Employee Management page</div>
    </>
  );
}

EmployeeManagementPage.getLayout = (page: React.ReactElement) => <PrivateLayout>{page}</PrivateLayout>;
