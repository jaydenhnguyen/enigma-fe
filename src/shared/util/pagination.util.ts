export function getPaginationRange({ currentPage, pageSize }: { currentPage: number; pageSize: number }): {
  start: number;
  end: number;
} {
  const start = (currentPage - 1) * pageSize + 1;
  const end = currentPage * pageSize;

  return { start, end };
}

export function getPageCount({ total, pageSize }: { total: number; pageSize: number }): number {
  return Math.ceil(total / pageSize);
}
