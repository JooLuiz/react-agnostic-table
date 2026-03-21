interface PaginationComponentProps {
  currentPage: number;
  totalPages: number;
  onPageChange(newPage: number): void;
  paginationLocation?: Locations;
}
