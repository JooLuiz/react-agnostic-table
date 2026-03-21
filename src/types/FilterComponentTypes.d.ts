interface FilterComponentProps {
  headers: Record<string, string>;
  data: Record<string, number | string | React.ReactNode>[];
  filterableHeaders: FilterableHeader[];
  location?: Locations;
  appliedFilters: ActiveTableFilters;
  onApply: (filters: ActiveTableFilters) => void;
  applyFilterLabel?: string;
  cancelFilterLabel?: string;
  title?: string;
}
