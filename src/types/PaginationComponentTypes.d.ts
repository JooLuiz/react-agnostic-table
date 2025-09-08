interface PaginationComponentTypes {
  params: {
    currentPage: number;
    totalPages: number;
    paginationLocation?: Locations;
    onCurrentPageChangeCallback?(newPage: number): void;
  };
}
