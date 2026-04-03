import { useMemo, useState } from "react";
import { SearchComponent } from "react-agnostic-table";

import PlaygroundPanel from "../components/PlaygroundPanel";
import PropsTable from "../components/PropsTable";
import { searchProps, tableRows } from "../data/docsData";

const searchHeaders = {
  name: "Name",
  group: "Group",
  isActive: "Active",
};

const SearchDocsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchKey, setSearchKey] = useState("All");

  const filteredRows = useMemo(() => {
    const normalizedTerm = searchTerm.trim().toLowerCase();

    if (normalizedTerm.length === 0) {
      return tableRows;
    }

    const headersToSearch =
      searchKey === "All" ? ["name", "group", "isActive"] : [searchKey];

    return tableRows.filter((row) =>
      headersToSearch.some((headerKey) =>
        String(row[headerKey as keyof typeof row]).toLowerCase().includes(normalizedTerm)
      )
    );
  }, [searchKey, searchTerm]);

  const searchCode = useMemo(() => {
    return `<SearchComponent
  headers={headers}
  validSearchableHeaders={["name", "group", "isActive"]}
  searchTerm="${searchTerm}"
  searchKey="${searchKey}"
  onSearchChange={(term, key) => {
    setSearchTerm(term);
    setSearchKey(key);
  }}
/>`;
  }, [searchKey, searchTerm]);

  return (
    <div className="page-content">
      <section className="section-header">
        <h1>SearchComponent</h1>
        <p>
          Standalone search controls with input and key selector. In this demo, the callback filters
          a local data preview.
        </p>
      </section>

      <PlaygroundPanel
        title="Search playground"
        description="Type in the input and select search key to inspect behavior."
        code={searchCode}
      >
        <div className="stack-block">
          <SearchComponent
            headers={searchHeaders}
            validSearchableHeaders={["name", "group", "isActive"]}
            searchTerm={searchTerm}
            searchKey={searchKey}
            onSearchChange={(term: string, key: string) => {
              setSearchTerm(term);
              setSearchKey(key);
            }}
            searchAllFieldsLabel="All fields"
          />

          <div className="preview-box">
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

      <PropsTable title="Props (`SearchComponentProps`)" rows={searchProps} />
    </div>
  );
};

export default SearchDocsPage;
