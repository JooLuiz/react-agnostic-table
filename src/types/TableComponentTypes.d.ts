interface TableComponentTypes {
  params: {
    headers: Record<string, string>;
    data: Record<string, number | string | React.ReactNode>[];
    title?: string;
    externalPagination?: boolean;
    currentPage?: number;
    pageSize?: number;
    totalPages?: number;
    paginationLocation?: Locations;
    onPageChangeCallback?(page: number): void;
    //isFilterable?: boolean;
    //externalFiltering?: boolean;
    //filters?: FilterOption[];
    //filtersModalPlace?: Locations;
    //onSearchCallback?(newTerm: string): void;
    //onFilterCallback?(filters: Record<string, string | string[]>): void;
    sortableHeaders?: string[];
    externalSorting?: boolean;
    onSortingCallback?: (sortKey: string, direction: SortDirection | null) => void;
    containerClassNames?: string;
    titleClassNames?: string;
    colorPalette?: TableColorPalette;
  };
}

type Locations = "right" | "left" | "center";
type SortDirection = "asc" | "desc";
type TableColorPalette = "classic" | "modernDark" | "softEarth";

interface SortConfig {
  key: string;
  direction: SortDirection;
}

interface FilterOption {
  key: string;
  label: string;
  type: "checkbox" | "date" | "input" | "dropdown" | "radio";
  values?: string[];
}
