import { useMemo, useState } from "react";
import { PaginationComponent } from "react-agnostic-table";

import PlaygroundPanel from "../components/PlaygroundPanel";
import PropsTable from "../components/PropsTable";
import { paginationProps } from "../data/docsData";

const PaginationDocsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationLocation, setPaginationLocation] = useState<"left" | "center" | "right">("center");

  const paginationCode = useMemo(() => {
    return `<PaginationComponent
  currentPage={${currentPage}}
  totalPages={12}
  paginationLocation="${paginationLocation}"
  onPageChange={(page) => setCurrentPage(page)}
/>`;
  }, [currentPage, paginationLocation]);

  return (
    <div className="page-content">
      <section className="section-header">
        <h1>PaginationComponent</h1>
        <p>Standalone pagination controls with page navigation and alignment options.</p>
      </section>

      <PlaygroundPanel
        title="Pagination playground"
        description="Switch between code and rendered controls while changing alignment and active page."
        code={paginationCode}
        controls={
          <div className="control-grid">
            <label>
              Current page
              <input
                type="number"
                min={1}
                max={12}
                value={currentPage}
                onChange={(event) => setCurrentPage(Math.max(1, Math.min(12, Number(event.target.value) || 1)))}
              />
            </label>
            <label>
              Alignment
              <select
                value={paginationLocation}
                onChange={(event) => setPaginationLocation(event.target.value as "left" | "center" | "right")}
              >
                <option value="left">left</option>
                <option value="center">center</option>
                <option value="right">right</option>
              </select>
            </label>
          </div>
        }
      >
        <PaginationComponent
          currentPage={currentPage}
          totalPages={12}
          paginationLocation={paginationLocation}
          onPageChange={setCurrentPage}
        />
      </PlaygroundPanel>

      <PropsTable title="Props (`PaginationComponentProps`)" rows={paginationProps} />
    </div>
  );
};

export default PaginationDocsPage;
