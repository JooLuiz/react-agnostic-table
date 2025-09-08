export default function renderHeaders(
  headers: Record<string, string>,
  headerStyles?: StyleType,
  headerClassNames?: string,
  headerItemClassNames?: string
) {
  const mountedRows = Object.keys(headers).map((headerKey) => {
    return (
      <th
        key={headerKey}
        className={`table-header-row-item ${headerItemClassNames} ${headerStyles?.headerCell}`}
      >
        {headers[headerKey]}
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
