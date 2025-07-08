import { useEffect, useState } from 'react';
import { Employee } from '../Type/EmployeesType';
import { fakeEmployees } from '../data/emoployeesData';

export const useEmployees = (searchTerm: string, currentPage: number, itemsPerPage: number) => {
  const [filteredData, setFilteredData] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(false);
  const [error] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => {
      const filtered = fakeEmployees.filter((emp) =>
        emp.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
      const start = (currentPage - 1) * itemsPerPage;
      const paginated = filtered.slice(start, start + itemsPerPage);
      setFilteredData(paginated);
      setLoading(false);
    }, 300);

    return () => clearTimeout(timeout);
  }, [searchTerm, currentPage, itemsPerPage]);

  const totalCount = fakeEmployees.filter((emp) =>
    emp.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.email.toLowerCase().includes(searchTerm.toLowerCase())
  ).length;

  return {
    employees: filteredData,
    loading,
    error,
    totalCount,
    totalPages: Math.ceil(totalCount / itemsPerPage),
  };
};
