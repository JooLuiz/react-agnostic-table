import { useEffect, useMemo, useState } from "react";
import TableComponent from "react-agnostic-table";

import PlaygroundPanel from "../components/PlaygroundPanel";
import PropsTable from "../components/PropsTable";
import {
  type PropDocRow,
  tableFilterHeaders,
  tableHeaders,
  tableRootProps,
  tableRows,
} from "../data/docsData";

const paginationConfigProps: PropDocRow[] = [
  { prop: "isExternal", type: "boolean", defaultValue: "false", description: "External pagination mode." },
  { prop: "currentPage", type: "number", defaultValue: "1", description: "Current page for external mode." },
  { prop: "pageSize", type: "number", defaultValue: "10", description: "Rows per page." },
  {
    prop: "location",
    type: "\"left\" | \"center\" | \"right\"",
    description: "Pagination controls alignment.",
  },
  { prop: "onChange", type: "(page: number) => void", description: "Called when page changes." },
];

const sortingConfigProps: PropDocRow[] = [
  { prop: "isExternal", type: "boolean", defaultValue: "false", description: "External sorting mode." },
  { prop: "sortableHeaders", type: "string[]", description: "Headers available for sorting." },
  {
    prop: "onSort",
    type: "(sortKey: string, direction: \"asc\" | \"desc\" | null) => void",
    description: "Called whenever sorting changes.",
  },
];

const searchConfigProps: PropDocRow[] = [
  { prop: "show", type: "boolean", defaultValue: "false", description: "Shows search controls." },
  { prop: "isExternal", type: "boolean", defaultValue: "false", description: "External search mode." },
  { prop: "searchableHeaders", type: "string[]", description: "Headers available for searching." },
  { prop: "searchAllFieldsLabel", type: "string", description: "Custom \"All\" option label." },
  { prop: "onSearch", type: "(searchTerm: string, searchKey: string) => void", description: "Search callback." },
];

const filterConfigProps: PropDocRow[] = [
  { prop: "show", type: "boolean", defaultValue: "false", description: "Shows filter trigger button." },
  {
    prop: "location",
    type: "\"left\" | \"center\" | \"right\"",
    defaultValue: "\"center\"",
    description: "Filter modal placement.",
  },
  { prop: "filterableHeaders", type: "FilterableHeader[]", description: "Filter field definitions." },
  { prop: "onFilter", type: "(filters: ActiveTableFilters) => void", description: "Filter callback." },
  { prop: "applyFilterLabel", type: "string", defaultValue: "\"Apply\"", description: "Apply button label." },
  { prop: "cancelFilterLabel", type: "string", defaultValue: "\"Cancel\"", description: "Cancel button label." },
  { prop: "title", type: "string", defaultValue: "\"Filters\"", description: "Filter modal title." },
];

const exportConfigProps: PropDocRow[] = [
  { prop: "show", type: "boolean", defaultValue: "false", description: "Shows export button." },
  { prop: "onExport", type: "(data: TableRowData[]) => void", description: "Override callback for custom export." },
  { prop: "exportLabel", type: "string", defaultValue: "\"download\"", description: "Export button text." },
  { prop: "fileName", type: "string", defaultValue: "\"table-export\"", description: "Base filename for CSV download." },
];

const stylingConfigProps: PropDocRow[] = [
  { prop: "containerClassNames", type: "string", description: "Extra classes for table container." },
  { prop: "titleClassNames", type: "string", description: "Extra classes for title element." },
  {
    prop: "colorPalette",
    type: "\"classic\" | \"modernDark\" | \"softEarth\"",
    defaultValue: "\"classic\"",
    description: "Built-in color themes.",
  },
];

type DocsPageProps = {
  theme: "dark" | "light";
};

const DocsPage = ({ theme }: DocsPageProps) => {
  const [showSearch, setShowSearch] = useState(true);
  const [showFilter, setShowFilter] = useState(true);
  const [showExport, setShowExport] = useState(true);
  const [colorPalette, setColorPalette] = useState<"classic" | "modernDark" | "softEarth">(
    theme === "dark" ? "modernDark" : "classic"
  );

  useEffect(() => {
    setColorPalette(theme === "dark" ? "modernDark" : "classic");
  }, [theme]);

  const tablePlaygroundCode = useMemo(() => {
    return `<TableComponent
  headers={headers}
  data={rows}
  title="Playground table"
  pagination={{ pageSize: 5, location: "center" }}
  sorting={{ sortableHeaders: ["name", "age"] }}
  search={{ show: ${showSearch}, searchableHeaders: ["name", "group"] }}
  filter={{ show: ${showFilter}, filterableHeaders }}
  export={{ show: ${showExport}, exportLabel: "Export CSV", fileName: "users-report" }}
  styling={{ colorPalette: "${colorPalette}" }}
/>`;
  }, [colorPalette, showExport, showFilter, showSearch]);

  return (
    <div className="page-content">
      <section className="section-header">
        <h1>Table Component Documentation</h1>
        <p>
          This page details every `TableComponent` prop and gives an interactive playground where
          you can switch between code and rendered behavior.
        </p>
      </section>

      <PlaygroundPanel
        title="Table playground"
        description="Toggle features and theme to inspect behavior. Switch to the code tab to copy the current setup."
        code={tablePlaygroundCode}
        controls={
          <div className="control-grid">
            <label>
              <input type="checkbox" checked={showSearch} onChange={() => setShowSearch((value) => !value)} />
              Show search
            </label>
            <label>
              <input type="checkbox" checked={showFilter} onChange={() => setShowFilter((value) => !value)} />
              Show filter
            </label>
            <label>
              <input type="checkbox" checked={showExport} onChange={() => setShowExport((value) => !value)} />
              Show export
            </label>
            <label>
              Color palette
              <select value={colorPalette} onChange={(event) => setColorPalette(event.target.value as "classic" | "modernDark" | "softEarth")}>
                <option value="classic">classic</option>
                <option value="modernDark">modernDark</option>
                <option value="softEarth">softEarth</option>
              </select>
            </label>
          </div>
        }
      >
        <TableComponent
          headers={tableHeaders}
          data={tableRows}
          title="Playground table"
          pagination={{ pageSize: 5, location: "center" }}
          sorting={{ sortableHeaders: ["name", "age"] }}
          search={{ show: showSearch, searchableHeaders: ["name", "group"], searchAllFieldsLabel: "All fields" }}
          filter={{ show: showFilter, filterableHeaders: tableFilterHeaders }}
          export={{ show: showExport, exportLabel: "Export CSV", fileName: "users-report" }}
          styling={{ colorPalette }}
        />
      </PlaygroundPanel>

      <PropsTable title="Root Props (`TableComponentProps`)" rows={tableRootProps} />
      <PropsTable title="`pagination` (`TablePaginationConfig`)" rows={paginationConfigProps} />
      <PropsTable title="`sorting` (`TableSortingConfig`)" rows={sortingConfigProps} />
      <PropsTable title="`search` (`TableSearchConfig`)" rows={searchConfigProps} />
      <PropsTable title="`filter` (`TableFilterConfig`)" rows={filterConfigProps} />
      <PropsTable title="`export` (`TableExportConfig`)" rows={exportConfigProps} />
      <PropsTable title="`styling` (`TableStylingConfig`)" rows={stylingConfigProps} />
    </div>
  );
};

export default DocsPage;
