import { useMemo, useState } from "react";
import { FilterComponent } from "react-agnostic-table";

import PlaygroundPanel from "../components/PlaygroundPanel";
import PropsTable from "../components/PropsTable";
import { filterProps, tableFilterHeaders, tableHeaders, tableRows } from "../data/docsData";

type FilterState = Record<string, string | string[]>;

const FilterDocsPage = () => {
  const [location, setLocation] = useState<"left" | "center" | "right">("center");
  const [appliedFilters, setAppliedFilters] = useState<FilterState>({});

  const filteredRows = useMemo(() => {
    const groupFilter = appliedFilters.group;
    const nameFilter = appliedFilters.name;
    const activeFilter = appliedFilters.isActive;

    return tableRows.filter((row) => {
      const passGroup =
        !Array.isArray(groupFilter) || groupFilter.length === 0
          ? true
          : groupFilter.includes(row.group);
      const passName =
        typeof nameFilter !== "string" || nameFilter.length === 0
          ? true
          : row.name.toLowerCase().includes(nameFilter.toLowerCase());
      const passActive =
        typeof activeFilter !== "string" || activeFilter.length === 0
          ? true
          : row.isActive.toLowerCase() === activeFilter.toLowerCase();

      return passGroup && passName && passActive;
    });
  }, [appliedFilters]);

  const filterCode = useMemo(() => {
    return `<FilterComponent
  headers={headers}
  data={rows}
  filterableHeaders={filterableHeaders}
  location="${location}"
  appliedFilters={appliedFilters}
  onApply={(filters) => setAppliedFilters(filters)}
/>`;
  }, [location]);

  return (
    <div className="page-content">
      <section className="section-header">
        <h1>FilterComponent</h1>
        <p>Standalone filter trigger and modal with support for input, checkbox, and radio filters.</p>
      </section>

      <PlaygroundPanel
        title="Filter playground"
        description="Open the modal, apply filters, and inspect both state and filtered preview."
        code={filterCode}
        controls={
          <div className="control-grid">
            <label>
              Modal location
              <select value={location} onChange={(event) => setLocation(event.target.value as "left" | "center" | "right")}>
                <option value="left">left</option>
                <option value="center">center</option>
                <option value="right">right</option>
              </select>
            </label>
          </div>
        }
      >
        <div className="stack-block">
          <FilterComponent
            headers={tableHeaders}
            data={tableRows}
            filterableHeaders={tableFilterHeaders}
            location={location}
            appliedFilters={appliedFilters}
            onApply={setAppliedFilters}
          />

          <div className="preview-box">
            <strong>Applied filters</strong>
            <pre>
              <code>{JSON.stringify(appliedFilters, null, 2)}</code>
            </pre>
            <strong>Filtered preview ({filteredRows.length})</strong>
            <ul>
              {filteredRows.map((row) => (
                <li key={`${row.name}-${row.group}`}>
                  {row.name} - group {row.group} - active: {row.isActive}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </PlaygroundPanel>

      <PropsTable title="Props (`FilterComponentProps`)" rows={filterProps} />
    </div>
  );
};

export default FilterDocsPage;
