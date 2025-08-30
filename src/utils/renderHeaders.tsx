export default function renderHeaders(
  headers: Record<string, string>,
  headerClassNames?: string,
  headerItemClassNames?: string
) {
  const mountedRows = Object.keys(headers).map((headerKey) => {
    return (
      <th
        key={headerKey}
        className={`table-header-row-item ${headerItemClassNames}`}
      >
        {headers[headerKey]}
      </th>
    );
  });

  return (
    <tr className={`table-header-row ${headerClassNames}`}>{mountedRows}</tr>
  );
}
