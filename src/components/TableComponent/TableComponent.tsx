import { useEffect, useState } from "react";
import renderBody from "../../utils/renderBody";
import renderHeaders from "../../utils/renderHeaders";

const TableComponent = ({ params }: TableComponentTypes) => {
  const { headers, data, title, titleClassNames, containerClassNames } = params;
  const [tableData, setTableData] = useState();

  return (
    <div className={`table-container ${containerClassNames}`}>
      {title && <div className={`table-title ${titleClassNames}`}>{title}</div>}
      <div className="table-wrapper">
        <table className="table-element">
          <thead className="table-header">{renderHeaders(headers)}</thead>
          <tbody className="table-body">{renderBody(headers, data)}</tbody>
        </table>
      </div>
    </div>
  );
};

export { TableComponent };
