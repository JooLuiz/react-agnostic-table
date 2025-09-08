import { useMemo, useState } from "react";
import renderBody from "../../utils/renderBody";
import renderHeaders from "../../utils/renderHeaders";
import styles from "./TableComponent.module.css";
import PaginationComponent from "../PaginationComponent";

const TableComponent = ({ params }: TableComponentTypes) => {
  const {
    headers,
    data,
    title,
    pageSize = 10,
    titleClassNames,
    containerClassNames,
    paginationLocation,
  } = params;
  const totalPages = Math.ceil(data.length / Math.max(pageSize, 1));
  const [currentPage, setCurrentPage] = useState(
    Math.max(params.currentPage ?? 1, 1)
  );

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * Math.max(pageSize, 1);
    const endIndex = startIndex + Math.max(pageSize, 1);
    return data.slice(startIndex, endIndex);
  }, [currentPage, pageSize]);

  return (
    <div
      className={`table-container ${styles.tableContainer} ${containerClassNames}`}
    >
      {title && (
        <div className={`table-title ${styles.tableTitle} ${titleClassNames}`}>
          {title}
        </div>
      )}
      <div className={`table-wrapper ${styles.tableWrapper}`}>
        <table className={`table-element ${styles.tableElement}`}>
          <thead className={`table-header ${styles.tableHead}`}>
            {renderHeaders(headers, styles)}
          </thead>
          <tbody className="table-body">
            {renderBody(headers, paginatedData, styles)}
          </tbody>
        </table>
      </div>
      <PaginationComponent
        params={{
          currentPage: currentPage ?? 0,
          totalPages: totalPages,
          paginationLocation,
          onCurrentPageChangeCallback: setCurrentPage,
        }}
      />
    </div>
  );
};

export { TableComponent };
