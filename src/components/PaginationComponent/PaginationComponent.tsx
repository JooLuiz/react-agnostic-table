import { useEffect, useState } from "react";
import styles from "./PaginationComponent.module.css";

const PaginationComponent = ({ params }: PaginationComponentTypes) => {
  const { totalPages, onCurrentPageChangeCallback, paginationLocation } =
    params;

  const [currentPage, setCurrentPage] = useState<number>(params.currentPage);

  useEffect(() => {
    if (onCurrentPageChangeCallback) {
      onCurrentPageChangeCallback(currentPage);
    }
  }, [currentPage]);

  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  let startPage = Math.max(1, currentPage - 2);
  let endPage = Math.min(totalPages, currentPage + 2);

  if (endPage - startPage < 4) {
    if (currentPage - 2 < 1) {
      endPage = Math.min(totalPages, 5);
    } else if (currentPage + 2 > totalPages) {
      startPage = Math.max(1, totalPages - 4);
    }
  }

  const visiblePages = pageNumbers.slice(startPage - 1, endPage);

  return (
    <div
      className={`pagination-wrapper 
          ${styles.paginationWrapper}
          ${
            paginationLocation === "center" &&
            styles.paginationWrapperAlignedCenter
          }
          ${
            paginationLocation === "right" &&
            styles.paginationWrapperAlignedRight
          }`}
    >
      <div className={`pagination-container ${styles.paginationContainer}`}>
        <button
          onClick={() => setCurrentPage(1)}
          disabled={currentPage === 1}
          className={`pagination-button-first ${styles.paginationButton}`}
        >
          {/* Switch to Use Icons */}
          {"<<"}
        </button>
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className={`pagination-button-previous ${styles.paginationButton}`}
        >
          {/* Switch to Use Icons */}
          {"<"}
        </button>

        {visiblePages.map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`pagination-button-current-page ${
              styles.paginationButtonPages
            } ${page === currentPage && styles.paginationButtonCurrentPage}`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`pagination-button-next ${styles.paginationButton}`}
        >
          {/* Switch to Use Icons */}
          {">"}
        </button>
        <button
          onClick={() => setCurrentPage(totalPages)}
          disabled={currentPage === totalPages}
          className={`pagination-button-last ${styles.paginationButton}`}
        >
          {/* Switch to Use Icons */}
          {">>"}
        </button>
      </div>
    </div>
  );
};

export { PaginationComponent };
