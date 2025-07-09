import { Employee } from '../Employees/Type/EmployeesType';
import { Table, TableColumn, dateRenderer, statusBadgeRenderer, emptyValueRenderer } from 'src/components/common/Table';
import classes from '../Employees/constants/Employees.module.scss';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import { useState } from 'react';
import { AppPopUp, ControlTextField, EmployeeDetailPopup } from 'src/components';
import { useForm, Controller } from 'react-hook-form';
import { TextField } from '@mui/material';

export const EmployeeTable = (onRowClick: (id: string) => void) => (data: Employee[], loading: boolean) => {
  if (loading) return <div>Loading...</div>;
  const sortConfig = 1;
  const handleSortClick = (key: keyof Employee) => {};
  const { control, handleSubmit } = useForm();

  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleEditClick = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedEmployee(null);
    setIsModalOpen(false);
  };
  const columns: TableColumn<Employee>[] = [
    {
      key: 'firstName',
      label: 'firstName',
      sortable: true,
      className: classes['nameColumn'],
    },
    {
      key: 'lastName',
      label: 'lastName',
      sortable: true,
      className: classes['nameColumn'],
      //   render: dateRenderer
    },
    {
      key: 'dob',
      label: 'dob',
      sortable: true,
      render: dateRenderer,
    },
    {
      key: 'drivingLicenseType',
      label: 'drivingLicenseType',
      sortable: true,
      //   className: classes['emailColumn']
    },
    {
      key: 'email',
      label: 'email',
      sortable: true,
    },
    {
      key: 'roles',
      label: 'roles',
      sortable: true,
    },
    {
      key: 'phoneNumber',
      label: 'phoneNumber',
      sortable: true,
    },
    {
      key: ' ' as keyof Employee,
      label: ' ',
      sortable: false,
      render: (_, row) => (
        <IconButton
          onClick={(e) => {
            e.stopPropagation(); // To prevent row click
            handleEditClick(row);
          }}
          aria-label="edit"
        >
          <EditIcon fontSize="small" />
        </IconButton>
      ),
    },
  ];
  return (
    <>
      <Table data={data} columns={columns} loading={loading} rowKey="id" emptyMessage="No employees found" />

      <EmployeeDetailPopup
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={() => {}}
        selectedEmployee={selectedEmployee as Employee}
      />
    </>
  );
};
