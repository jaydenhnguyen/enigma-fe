import * as React from 'react';
import Head from 'next/head';
import { PrivateLayout } from 'src/layouts';
import { Employees } from 'src/modules/Employees/Employees';

export default function EmployeeManagementPage(): React.ReactElement {
  return (
    <>
      <Head>
        <title>A-Z Moving: Employee Management</title>
      </Head>
      <Employees />
    </>
  );
}

EmployeeManagementPage.getLayout = (page: React.ReactElement) => <PrivateLayout>{page}</PrivateLayout>;
