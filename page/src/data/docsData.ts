export const tableHeaders: Record<string, string> = {
  name: "Name",
  age: "Age",
  group: "Group",
  isActive: "Active",
};

export const tableRows = [
  { name: "Ana", age: 30, group: "A", isActive: "yes" },
  { name: "Bruno", age: 27, group: "B", isActive: "no" },
  { name: "Carla", age: 35, group: "A", isActive: "yes" },
  { name: "Daniel", age: 24, group: "C", isActive: "no" },
  { name: "Elisa", age: 29, group: "B", isActive: "yes" },
];

export const tableFilterHeaders = [
  { id: "name", type: "input" as const },
  { id: "group", type: "checkbox" as const },
  { id: "isActive", type: "radio" as const },
];

export type PropDocRow = {
  prop: string;
  type: string;
  defaultValue?: string;
  description: string;
};

export const tableRootProps: PropDocRow[] = [
  {
    prop: "headers",
    type: "Record<string, string>",
    description: "Maps row keys to column labels.",
  },
  {
    prop: "data",
    type: "TableRowData[]",
    description: "Row content for the table body.",
  },
  { prop: "title", type: "string", description: "Optional title shown above the table." },
  { prop: "pagination", type: "TablePaginationConfig", defaultValue: "{}", description: "Pagination behavior." },
  { prop: "sorting", type: "TableSortingConfig", defaultValue: "{}", description: "Sorting behavior." },
  { prop: "search", type: "TableSearchConfig", defaultValue: "{}", description: "Search behavior." },
  { prop: "filter", type: "TableFilterConfig", defaultValue: "{}", description: "Filter behavior." },
  { prop: "export", type: "TableExportConfig", defaultValue: "{}", description: "CSV export behavior." },
  { prop: "styling", type: "TableStylingConfig", defaultValue: "{}", description: "Styling and color palette options." },
];

export const paginationProps: PropDocRow[] = [
  { prop: "currentPage", type: "number", description: "Current selected page." },
  { prop: "totalPages", type: "number", description: "Total amount of pages available." },
  { prop: "onPageChange", type: "(page: number) => void", description: "Callback fired when page changes." },
  {
    prop: "paginationLocation",
    type: "\"left\" | \"center\" | \"right\"",
    defaultValue: "\"center\"",
    description: "Controls alignment of pagination controls.",
  },
];

export const searchProps: PropDocRow[] = [
  { prop: "headers", type: "Record<string, string>", description: "Header labels map." },
  { prop: "validSearchableHeaders", type: "string[]", description: "Keys available in the dropdown." },
  { prop: "searchTerm", type: "string", description: "Current search value." },
  { prop: "searchKey", type: "string", description: "Selected key for searching." },
  { prop: "onSearchChange", type: "(term: string, key: string) => void", description: "Called on input and key updates." },
  { prop: "searchAllFieldsLabel", type: "string", description: "Custom label for the all fields option." },
];

export const filterProps: PropDocRow[] = [
  { prop: "headers", type: "Record<string, string>", description: "Header labels map." },
  { prop: "data", type: "TableRowData[]", description: "Table rows used to infer options." },
  { prop: "filterableHeaders", type: "FilterableHeader[]", description: "Filter controls definition." },
  {
    prop: "location",
    type: "\"left\" | \"center\" | \"right\"",
    defaultValue: "\"center\"",
    description: "Modal position behavior.",
  },
  { prop: "appliedFilters", type: "ActiveTableFilters", description: "Current applied filters." },
  { prop: "onApply", type: "(filters: ActiveTableFilters) => void", description: "Called when user applies filters." },
  { prop: "applyFilterLabel", type: "string", defaultValue: "\"Apply\"", description: "Apply button text." },
  { prop: "cancelFilterLabel", type: "string", defaultValue: "\"Cancel\"", description: "Cancel button text." },
  { prop: "title", type: "string", defaultValue: "\"Filters\"", description: "Filter modal title." },
];
