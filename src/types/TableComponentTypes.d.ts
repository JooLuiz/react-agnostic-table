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
    isFilterable?: boolean;
    externalFiltering?: boolean;
    filters?: FilterOption[];
    filtersModalPlace?: Locations;
    onSearchCallback?(newTerm: string): void;
    onFilterCallback?(filters: Record<string, string | string[]>): void;
    containerClassNames?: string;
    titleClassNames?: string;
  };
}

type Locations = "right" | "left" | "center";

interface FilterOption {
  key: string;
  label: string;
  type: "checkbox" | "date" | "input" | "dropdown" | "radio";
  values?: string[];
}
