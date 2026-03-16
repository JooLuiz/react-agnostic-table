export default function renderHeaders(
  headers: Record<string, string>,
  sortableHeaders?: string[],
  sortConfig?: SortConfig | null,
  handleSort?: (key: string) => void,
  headerStyles?: StyleType,
  headerClassNames?: string,
  headerItemClassNames?: string
) {
  const mountedRows = Object.keys(headers).map((headerKey) => {
    const isSortable = sortableHeaders?.includes(headerKey) ?? false;
    const isSorted = sortConfig?.key === headerKey;
    const isAscActive = isSorted && sortConfig?.direction === "asc";
    const isDescActive = isSorted && sortConfig?.direction === "desc";
    const ariaSort =
      isSortable && isSorted
        ? sortConfig?.direction === "asc"
          ? "ascending"
          : "descending"
        : "none";

    return (
      <th
        key={headerKey}
        aria-sort={ariaSort}
        scope="col"
        className={`table-header-row-item ${headerItemClassNames || ""} ${headerStyles?.headerCell || ""} ${isSortable ? headerStyles?.sortableHeader || "" : ""}`}
        onClick={() => isSortable && handleSort?.(headerKey)}
      >
        {isSortable ? (
          <button
            type="button"
            className={`${headerStyles?.sortableHeaderButton || ""}`}
          >
            <span className={`${headerStyles?.headerContent || ""}`}>
              <span>{headers[headerKey]}</span>
              <span
                className={`${headerStyles?.sortIndicator || ""}`}
                aria-hidden="true"
              >
                <span
                  className={`${headerStyles?.sortIcon || ""} ${isAscActive ? headerStyles?.sortIconActive || "" : ""
                    }`}
                >
                  ▲
                </span>
                <span
                  className={`${headerStyles?.sortIcon || ""} ${isDescActive ? headerStyles?.sortIconActive || "" : ""
                    }`}
                >
                  ▼
                </span>
              </span>
            </span>
          </button>
        ) : (
          <span className={`${headerStyles?.headerContent || ""}`}>
            {headers[headerKey]}
          </span>
        )}
      </th>
    );
  });

  return (
    <tr
      className={`table-header-row ${headerClassNames} ${headerStyles?.headerRow}`}
    >
      {mountedRows}
    </tr>
  );
}
