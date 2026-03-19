import { useEffect, useMemo, useState } from "react";

import styles from "./TableComponent.module.css";
import themes from "../../themes/themes.module.css";

import PaginationComponent from "../PaginationComponent";
import SearchComponent from "../SearchComponent";

import renderHeaders from "../../utils/renderHeaders";
import renderBody from "../../utils/renderBody";
import calculateTotalPages from "../../utils/calculateTotalPages";
import getCurrentPageContent from "../../utils/getCurrentPageContent";
import sortData from "../../utils/sortData";
import getValidHeaders from "../../utils/getValidHeaders";
import { ALL_SEARCH_KEY } from "../../utils/consts";

const TableComponent = ({ params }: TableComponentTypes) => {
  const {
    data,
    pageSize = 10,
    currentPage: paramCurrentPage = 1,
    headers,
    title,
    titleClassNames,
    containerClassNames,
    paginationLocation,
    externalPagination = false,
    onPageChangeCallback,
    sortableHeaders,
    externalSorting = false,
    onSortingCallback,
    showSearchInput = false,
    searchableHeaders,
    externalSearch = false,
    onSearchCallback,
    colorPalette = "classic",
  } = params;
  const [currentPage, setCurrentPage] = useState(
    Math.max(paramCurrentPage, 1)
  );

  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchKey, setSearchKey] = useState(ALL_SEARCH_KEY);

  const validSortableHeaders = useMemo(() => {
    return getValidHeaders(headers, sortableHeaders);
  }, [headers, sortableHeaders]);

  const validSearchableHeaders = useMemo(() => {
    return getValidHeaders(headers, searchableHeaders);
  }, [headers, searchableHeaders]);

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

  const processedData = useMemo(() => {
    let searchProcessedData = data;
    const normalizedTerm = searchTerm.trim().toLowerCase();

    if (!externalSearch && normalizedTerm.length > 0 && validSearchableHeaders.length > 0) {
      const targetSearchKeys =
        searchKey === ALL_SEARCH_KEY || !validSearchableHeaders.includes(searchKey)
          ? validSearchableHeaders
          : [searchKey];

      searchProcessedData = data.filter((row) =>
        targetSearchKeys.some((headerKey) => {
          const value = row[headerKey];

          if (typeof value === "string" || typeof value === "number") {
            return String(value).toLowerCase().includes(normalizedTerm);
          }

          return false;
        })
      );
    }

    if (externalSorting || !sortConfig) {
      return searchProcessedData;
    }

    const decoratedData = searchProcessedData.map((row, index) => ({
      row,
      index,
    }));

    const sortedData = sortData(decoratedData, sortConfig);

    return sortedData.map((entry) => entry.row);
  }, [
    data,
    externalSearch,
    externalSorting,
    searchKey,
    searchTerm,
    sortConfig,
    validSearchableHeaders,
  ]);

  const totalPages = calculateTotalPages(processedData.length, pageSize);

  useEffect(() => {
    if (externalPagination) {
      setCurrentPage(paramCurrentPage);
    }
  }, [paramCurrentPage, externalPagination]);

  useEffect(() => {
    if (onPageChangeCallback) {
      onPageChangeCallback(currentPage);
    }
  }, [currentPage, onPageChangeCallback]);

  useEffect(() => {
    if (searchKey !== ALL_SEARCH_KEY && !validSearchableHeaders.includes(searchKey)) {
      setSearchKey(ALL_SEARCH_KEY);
    }
  }, [searchKey, validSearchableHeaders]);

  useEffect(() => {
    if (onSearchCallback) {
      onSearchCallback(searchTerm, searchKey);
    }
  }, [onSearchCallback, searchKey, searchTerm]);

  const paginatedData = useMemo(() => {
    return getCurrentPageContent(processedData, pageSize, currentPage);
  }, [processedData, pageSize, currentPage]);

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
      {showSearchInput && (
        <SearchComponent
          headers={headers}
          validSearchableHeaders={validSearchableHeaders}
          searchTerm={searchTerm}
          searchKey={searchKey}
          onSearchChange={handleSearchChange}
        />
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
        !externalPagination && (
          <PaginationComponent
            params={{
              currentPage: currentPage ?? 0,
              totalPages: totalPages,
              paginationLocation,
              onPageChange: setCurrentPage,
            }}
          />
        )
      }
    </div>
  );
};

export { TableComponent };
