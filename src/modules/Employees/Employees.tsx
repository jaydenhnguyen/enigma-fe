import { useRouter } from 'next/router';
import { useState } from 'react';
import { AppTable } from 'src/components/common/AppTable';
import { useEmployees } from '../Employees/hooks/useEmployees';
import { useAppTable } from 'src/components/common/AppTable/hooks/useAppTable';
import { Employee } from '../Employees/Type/EmployeesType';
import { EmployeeTable } from './EmployeesTable';

export const Employees = () => {
  const router = useRouter();
  const {
    searchTerm,
    currentPage,
    itemsPerPage,
    handleSearch,
    handlePageChange,
  } = useAppTable();

  const [sortBy, setSortBy] = useState<keyof Employee | undefined>();
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');

  const { employees, loading, error, totalCount, totalPages } = useEmployees(
    searchTerm,
    currentPage,
    itemsPerPage
  );

  const handleRowClick = (employeeId: string) => {
    router.push(`/employees/${employeeId}`);
  };

  
  const handleSort = (key: keyof Employee) => {
    if (key === sortBy) {
      setOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortBy(key);
      setOrder('asc');
    }
  };

  return (
    <AppTable<Employee>
      title="Employees"
      data={employees}
      totalCount={totalCount}
      totalPages={totalPages}
      currentPage={currentPage}
      itemsPerPage={itemsPerPage}
      loading={loading}
      error={error ?? undefined}
      searchTerm={searchTerm}
      onSearch={(term) => handleSearch(term, () => {})}
      onSort={handleSort}
      onPageChange={(page) => handlePageChange(page, () => {})}
      onRefresh={() => window.location.reload()}
      renderTable={EmployeeTable(handleRowClick)}
      addButtonText="Add Employee"
      searchPlaceholder="Search employees..."
    />
  );
};
