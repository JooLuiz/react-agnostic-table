import { ReactNode } from "react";

export default function renderBody(
  headers: Record<string, string>,
  data: Record<string, string | number | React.ReactNode>[],
  rowClassNames?: string,
  rowItemClassNames?: string
) {
  const mountedRows = data.map((dataItem, rowIndex) => {
    const mountedRowItems = Object.keys(headers).map((headerKey) => {
      return (
        <td
          key={`${headerKey}-${rowIndex}`}
          className={`table-body-row-item ${rowItemClassNames}`}
        >
          {dataItem[headerKey] as ReactNode}
        </td>
      );
    });

    return (
      <tr key={`row-${rowIndex}`} className={`table-body-row ${rowClassNames}`}>
        {mountedRowItems}
      </tr>
    );
  });

  return mountedRows;
}
