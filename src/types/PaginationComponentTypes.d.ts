interface PaginationComponentTypes {
  params: {
    currentPage: number;
    totalPages: number;
    onPageChange(newPage: number): void;
    paginationLocation?: Locations;
  };
}
