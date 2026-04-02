interface TablePaginationConfig {
  isExternal?: boolean;
  currentPage?: number;
  pageSize?: number;
  totalPages?: number;
  location?: Locations;
  onChange?: (page: number) => void;
}

interface TableSortingConfig {
  isExternal?: boolean;
  sortableHeaders?: string[];
  onSort?: (sortKey: string, direction: SortDirection | null) => void;
}

interface TableSearchConfig {
  show?: boolean;
  isExternal?: boolean;
  searchableHeaders?: string[];
  onSearch?: (searchTerm: string, searchKey: string) => void;
  searchAllFieldsLabel?: string;
}

type TableRowData = Record<string, number | string | React.ReactNode>;

interface FilterableHeader {
  id: string;
  type: "input" | "checkbox" | "radio" | "date" | "datetime";
  filterValues?: string[];
}

type TableFilterValue = string | string[];
type ActiveTableFilters = Record<string, TableFilterValue>;

interface TableFilterConfig {
  show?: boolean;
  location?: Locations;
  filterableHeaders?: FilterableHeader[];
  onFilter?: (filters: ActiveTableFilters) => void;
  applyFilterLabel?: string;
  cancelFilterLabel?: string;
  title?: string;
}

interface TableExportConfig {
  show?: boolean;
  onExport?: (data: TableRowData[]) => void;
  exportLabel?: string;
  fileName?: string;
}

interface TableStylingConfig {
  containerClassNames?: string;
  titleClassNames?: string;
  colorPalette?: TableColorPalette;
}

interface TableComponentProps {
  headers: Record<string, string>;
  data: TableRowData[];
  title?: string;
  pagination?: TablePaginationConfig;
  sorting?: TableSortingConfig;
  search?: TableSearchConfig;
  filter?: TableFilterConfig;
  export?: TableExportConfig;
  styling?: TableStylingConfig;
}

type Locations = "right" | "left" | "center";
type SortDirection = "asc" | "desc";
type TableColorPalette = "classic" | "modernDark" | "softEarth";

interface SortConfig {
  key: string;
  direction: SortDirection;
}
