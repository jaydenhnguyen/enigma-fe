import { useState, useCallback } from 'react';
import { UseTablePageParams, UseTablePageReturn } from '..';

export function useTablePage({
  initialPage = 1,
  initialItemsPerPage = 10,
  initialSearchTerm = ''
}: UseTablePageParams = {}): UseTablePageReturn {
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
