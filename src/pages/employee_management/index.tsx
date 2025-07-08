import * as React from 'react';
import Head from 'next/head';
import { PrivateLayout } from 'src/layouts';
import { Button } from '@mui/material';
import { EmployeeDetailPopup } from 'src/components/EmployeeDetailPopup';
import {Employees} from 'src/modules/Employees/Employees';
export default function EmployeeManagementPage(): React.ReactElement {
  const [isOpenDetailPopup, setIsOpenDetailPopup] = React.useState<boolean>(false);

  return (
    <>
      <Head>
        <title>A-Z Moving: Employee Management</title>
      </Head>
      <Employees></Employees>
      
      {/* <Button variant="contained" onClick={() => setIsOpenDetailPopup(true)}>
        Open the employee modal example
      </Button> */}

      <EmployeeDetailPopup isOpen={isOpenDetailPopup} onClose={() => setIsOpenDetailPopup(false)} onSave={() => {}} />
    </>
  );
}

EmployeeManagementPage.getLayout = (page: React.ReactElement) => <PrivateLayout>{page}</PrivateLayout>;
