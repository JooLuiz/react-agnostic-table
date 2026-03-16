import { useEffect, useMemo, useState } from "react";

import styles from "./TableComponent.module.css";
import themes from "../../themes/tableThemes.module.css";

import PaginationComponent from "../PaginationComponent";

import renderHeaders from "../../utils/renderHeaders";
import renderBody from "../../utils/renderBody";
import calculateTotalPages from "../../utils/calculateTotalPages";
import getCurrentPageContent from "../../utils/getCurrentPageContent";
import normalizeSortValue from "../../utils/normalizeSortValue";

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
    colorPalette = "classic",
  } = params;
  const [currentPage, setCurrentPage] = useState(
    Math.max(paramCurrentPage, 1)
  );

  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);

  const validSortableHeaders = useMemo(() => {
    const headerKeys = new Set(Object.keys(headers));
    return (sortableHeaders ?? []).filter((headerKey) =>
      headerKeys.has(headerKey)
    );
  }, [headers, sortableHeaders]);

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

  const processedData = useMemo(() => {
    if (externalSorting || !sortConfig) {
      return data;
    }

    const decoratedData = data.map((row, index) => ({ row, index }));

    decoratedData.sort((left, right) => {
      const rawLeft = left.row[sortConfig.key];
      const rawRight = right.row[sortConfig.key];
      const valueLeft = normalizeSortValue(rawLeft);
      const valueRight = normalizeSortValue(rawRight);
      const directionSign = sortConfig.direction === "asc" ? 1 : -1;

      if (valueLeft === null && valueRight === null) {
        return left.index - right.index;
      }

      if (valueLeft === null) {
        return 1;
      }

      if (valueRight === null) {
        return -1;
      }

      if (typeof valueLeft === "string" || typeof valueRight === "string") {
        const leftString = String(valueLeft);
        const rightString = String(valueRight);
        const compared = leftString.localeCompare(rightString, undefined, {
          numeric: true,
          sensitivity: "base",
        });

        if (compared !== 0) {
          return compared * directionSign;
        }

        return left.index - right.index;
      }

      const compared = valueLeft - valueRight;

      if (compared !== 0) {
        return compared * directionSign;
      }

      return left.index - right.index;
    });

    return decoratedData.map((entry) => entry.row);
  }, [data, sortConfig, externalSorting]);

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
