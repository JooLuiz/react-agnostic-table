import styles from "./PaginationComponent.module.css";
import PrettyIcons from "js-pretty-icons"

const PaginationComponent = ({
  totalPages,
  currentPage,
  onPageChange,
  paginationLocation = "center",
}: PaginationComponentProps) => {
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
          ${paginationLocation === "center" &&
        styles.paginationWrapperAlignedCenter
        }
          ${paginationLocation === "right" &&
        styles.paginationWrapperAlignedRight
        }`}
    >
      <div className={`pagination-container ${styles.paginationContainer}`}>
        <button
          aria-label="First Page"
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className={`pagination-button-first ${styles.paginationButton}`}
        >
          <PrettyIcons icon="double-chevron-left" width={16} height={16} />
        </button>
        <button
          aria-label="Previous Page"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`pagination-button-previous ${styles.paginationButton}`}
        >
          <PrettyIcons icon="chevron-left" width={16} height={16} />
        </button>

        {visiblePages.map((page) => (
          <button
            key={page}
            aria-label={`Page ${page}`}
            aria-current={page === currentPage ? "page" : undefined}
            onClick={() => onPageChange(page)}
            className={`pagination-button-current-page ${styles.paginationButtonPages
              } ${page === currentPage && styles.paginationButtonCurrentPage}`}
          >
            {page}
          </button>
        ))}

        <button
          aria-label="Next Page"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`pagination-button-next ${styles.paginationButton}`}
        >
          <PrettyIcons icon="chevron-right" width={16} height={16} />
        </button>
        <button
          aria-label="Last Page"
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className={`pagination-button-last ${styles.paginationButton}`}
        >
          <PrettyIcons icon="double-chevron-right" width={16} height={16} />
        </button>
      </div>
    </div>
  );
};

export { PaginationComponent };
