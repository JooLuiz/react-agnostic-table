import { useEffect, useMemo, useState } from "react";

import styles from "./TableComponent.module.css";
import themes from "../../themes/themes.module.css";

import PaginationComponent from "../PaginationComponent";
import SearchComponent from "../SearchComponent";
import FilterComponent from "../FilterComponent";

import renderHeaders from "../../utils/renderHeaders";
import renderBody from "../../utils/renderBody";
import calculateTotalPages from "../../utils/calculateTotalPages";
import getCurrentPageContent from "../../utils/getCurrentPageContent";
import sortData from "../../utils/sortData";
import getValidHeaders from "../../utils/getValidHeaders";
import { ALL_SEARCH_KEY } from "../../utils/consts";
import exportToCsv from "../../utils/exportToCsv";

const TableComponent = ({
  data,
  headers,
  title,
  pagination = {},
  sorting = {},
  search = {},
  filter = {},
  export: exportConfig = {},
  styling = {},
}: TableComponentProps) => {
  const {
    pageSize = 10,
    currentPage: paramCurrentPage = 1,
    location: paginationLocation,
    isExternal: isExternalPagination = false,
    onChange: onPaginationChange,
  } = pagination;

  const {
    sortableHeaders,
    isExternal: isExternalSorting = false,
    onSort: onSortingCallback,
  } = sorting;

  const {
    show: showSearchInput = false,
    searchableHeaders,
    isExternal: isExternalSearch = false,
    onSearch: onSearchCallback,
    searchAllFieldsLabel,
  } = search;

  const {
    show: showFilterInput = false,
    location: filterLocation = "center",
    filterableHeaders = [],
    onFilter: onFilterCallback,
    applyFilterLabel,
    cancelFilterLabel,
    title: filterTitle
  } = filter;

  const {
    show: showExportButton = false,
    onExport: onExportCallback,
    exportLabel,
    fileName,
  } = exportConfig;

  const {
    containerClassNames,
    titleClassNames,
    colorPalette = "classic",
  } = styling;

  const [currentPage, setCurrentPage] = useState(
    Math.max(paramCurrentPage, 1)
  );

  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchKey, setSearchKey] = useState(ALL_SEARCH_KEY);
  const [activeFilters, setActiveFilters] = useState<ActiveTableFilters>({});

  const validSortableHeaders = useMemo(() => {
    return getValidHeaders(headers, sortableHeaders);
  }, [headers, sortableHeaders]);

  const validSearchableHeaders = useMemo(() => {
    return getValidHeaders(headers, searchableHeaders);
  }, [headers, searchableHeaders]);

  const validFilterableHeaders = useMemo(() => {
    const requestedFilterHeaders = filterableHeaders.map(({ id }) => id);
    const validFilterHeaderIds = getValidHeaders(headers, requestedFilterHeaders);

    return filterableHeaders.filter(({ id }) => validFilterHeaderIds.includes(id));
  }, [filterableHeaders, headers]);

  const handleSort = (key: string) => {
    if (!validSortableHeaders.includes(key)) {
      return;
    }

    let direction: SortDirection | null = "asc";

    if (sortConfig && sortConfig.key === key) {
      if (sortConfig.direction === "asc") {
        direction = "desc";
      } else if (sortConfig.direction === "desc") {
        direction = null;
      }
    }

    const newConfig = direction ? { key, direction } : null;
    setSortConfig(newConfig);
    setCurrentPage(1);

    if (onSortingCallback) {
      onSortingCallback(key, direction);
    }
  };

  const handleSearchChange = (term: string, key: string) => {
    setSearchTerm(term);
    setSearchKey(key);
    setCurrentPage(1);
  };

  const handleFilterApply = (filters: ActiveTableFilters) => {
    setActiveFilters(filters);
    setCurrentPage(1);
  };

  const processedData = useMemo(() => {
    let filterProcessedData = data;

    if (Object.keys(activeFilters).length > 0 && validFilterableHeaders.length > 0) {
      filterProcessedData = data.filter((row) =>
        validFilterableHeaders.every(({ id, type }) => {
          const filterValue = activeFilters[id];

          if (filterValue === undefined) {
            return true;
          }

          const rowValue = row[id];
          const normalizedRowValue =
            typeof rowValue === "string" || typeof rowValue === "number"
              ? String(rowValue).toLowerCase()
              : "";

          if (type === "checkbox") {
            if (!Array.isArray(filterValue) || filterValue.length === 0) {
              return true;
            }

            return filterValue.some((value) => normalizedRowValue === value.toLowerCase());
          }

          if (type === "radio") {
            if (typeof filterValue !== "string") {
              return true;
            }

            return normalizedRowValue === filterValue.toLowerCase();
          }

          if (typeof filterValue !== "string") {
            return true;
          }

          return normalizedRowValue.includes(filterValue.toLowerCase());
        })
      );
    }

    let searchProcessedData = filterProcessedData;
    const normalizedTerm = searchTerm.trim().toLowerCase();

    if (!isExternalSearch && normalizedTerm.length > 0 && validSearchableHeaders.length > 0) {
      const targetSearchKeys =
        searchKey === ALL_SEARCH_KEY || !validSearchableHeaders.includes(searchKey)
          ? validSearchableHeaders
          : [searchKey];

      searchProcessedData = filterProcessedData.filter((row) =>
        targetSearchKeys.some((headerKey) => {
          const value = row[headerKey];

          if (typeof value === "string" || typeof value === "number") {
            return String(value).toLowerCase().includes(normalizedTerm);
          }

          return false;
        })
      );
    }

    if (isExternalSorting || !sortConfig) {
      return searchProcessedData;
    }

    const decoratedData = searchProcessedData.map((row, index) => ({
      row,
      index,
    }));

    const sortedData = sortData(decoratedData, sortConfig);

    return sortedData.map((entry) => entry.row);
  }, [
    activeFilters,
    data,
    isExternalSearch,
    isExternalSorting,
    searchKey,
    searchTerm,
    sortConfig,
    validFilterableHeaders,
    validSearchableHeaders,
  ]);

  const totalPages = calculateTotalPages(processedData.length, pageSize);

  useEffect(() => {
    if (isExternalPagination) {
      setCurrentPage(paramCurrentPage);
    }
  }, [paramCurrentPage, isExternalPagination]);

  useEffect(() => {
    if (onPaginationChange) {
      onPaginationChange(currentPage);
    }
  }, [currentPage, onPaginationChange]);

  useEffect(() => {
    if (searchKey !== ALL_SEARCH_KEY && !validSearchableHeaders.includes(searchKey)) {
      setSearchKey(ALL_SEARCH_KEY);
    }
  }, [searchKey, validSearchableHeaders]);

  useEffect(() => {
    setActiveFilters((currentFilters) => {
      const validFilterIds = new Set(validFilterableHeaders.map(({ id }) => id));
      let hasChanges = false;

      const nextFilters = Object.entries(currentFilters).reduce<ActiveTableFilters>(
        (acc, [key, value]) => {
          if (validFilterIds.has(key)) {
            acc[key] = value;
          } else {
            hasChanges = true;
          }

          return acc;
        },
        {}
      );

      return hasChanges ? nextFilters : currentFilters;
    });
  }, [validFilterableHeaders]);

  useEffect(() => {
    if (onSearchCallback) {
      onSearchCallback(searchTerm, searchKey);
    }
  }, [onSearchCallback, searchKey, searchTerm]);

  useEffect(() => {
    if (onFilterCallback) {
      onFilterCallback(activeFilters);
    }
  }, [activeFilters, onFilterCallback]);

  const paginatedData = useMemo(() => {
    return getCurrentPageContent(processedData, pageSize, currentPage);
  }, [processedData, pageSize, currentPage]);

  const handleExport = () => {
    if (onExportCallback) {
      onExportCallback(processedData);
      return;
    }

    exportToCsv(processedData, headers, fileName);
  };

  const exportButtonLabel = exportLabel?.trim() || "Download";
  const shouldRenderTopControls = showSearchInput || showFilterInput || showExportButton;

  return (
    <div
      className={`table-container ${styles.tableContainer} ${themes.tableThemes} ${containerClassNames}`}
      data-theme={colorPalette}
    >
      {title && (
        <div className={`table-title ${styles.tableTitle} ${titleClassNames}`}>
          {title}
        </div>
      )}
      {shouldRenderTopControls && (
        <div className={styles.topControlsContainer}>
          {(showSearchInput || showFilterInput) && (
            <div className={styles.searchAndFilterWrapper}>
              {showSearchInput && (
                <SearchComponent
                  headers={headers}
                  validSearchableHeaders={validSearchableHeaders}
                  searchTerm={searchTerm}
                  searchKey={searchKey}
                  onSearchChange={handleSearchChange}
                  searchAllFieldsLabel={searchAllFieldsLabel}
                />
              )}

              {showFilterInput && (
                <FilterComponent
                  headers={headers}
                  data={data}
                  filterableHeaders={validFilterableHeaders}
                  location={filterLocation}
                  appliedFilters={activeFilters}
                  onApply={handleFilterApply}
                  applyFilterLabel={applyFilterLabel}
                  cancelFilterLabel={cancelFilterLabel}
                  title={filterTitle}
                />
              )}
            </div>
          )}

          {showExportButton && (
            <button type="button" className={styles.exportButton} onClick={handleExport}>
              {exportButtonLabel}
            </button>
          )}
        </div>
      )}
      <div className={`table-wrapper ${styles.tableWrapper}`}>
        <table className={`table-element ${styles.tableElement}`}>
          <thead className={`table-header ${styles.tableHead}`}>
            {renderHeaders(
              headers,
              validSortableHeaders,
              sortConfig,
              handleSort,
              styles
            )}
          </thead>
          <tbody className="table-body">
            {renderBody(headers, paginatedData, styles)}
          </tbody>
        </table>
      </div>
      {
        !isExternalPagination && (
          <PaginationComponent
            currentPage={currentPage ?? 0}
            totalPages={totalPages}
            paginationLocation={paginationLocation}
            onPageChange={setCurrentPage}
          />
        )
      }
    </div>
  );
};

export { TableComponent };
