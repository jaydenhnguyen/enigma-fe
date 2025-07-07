import { useState, useCallback } from 'react';
import { UseAppTableParams, UseAppTableReturns } from 'src/shared/types';

export function useAppTable({
  initialPage = 1,
  initialItemsPerPage = 10,
  initialSearchTerm = ''
}: UseAppTableParams = {}): UseAppTableReturns {
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [itemsPerPage] = useState(initialItemsPerPage);

  const handleSearch = useCallback((term: string, onSearchChange: (term: string, page: number) => void) => {
    setSearchTerm(term);
    setCurrentPage(1);
    onSearchChange(term, 1);
  }, []);

  const handlePageChange = useCallback((page: number, onPageChange: (page: number) => void) => {
    setCurrentPage(page);
    onPageChange(page);
  }, []);

  const resetToFirstPage = useCallback(() => {
    setCurrentPage(1);
  }, []);

  return {
    searchTerm,
    currentPage,
    itemsPerPage,
    setSearchTerm,
    setCurrentPage,
    handleSearch,
    handlePageChange,
    resetToFirstPage
  };
}
