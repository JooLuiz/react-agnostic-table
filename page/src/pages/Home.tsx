import TableComponent from "react-agnostic-table";

import { tableFilterHeaders, tableHeaders, tableRows } from "../data/docsData";

type HomePageProps = {
  theme: "dark" | "light";
};

const HomePage = ({ theme }: HomePageProps) => {
  const resolvedColorPalette = theme === "dark" ? "modernDark" : "classic";

  return (
    <div className="page-content">
      <section className="hero-section">
        <p className="hero-tag">React Agnostic Table</p>
        <h1>Build interactive data tables faster.</h1>
        <p>
          A lightweight table package with sorting, pagination, search, filtering, CSV export and
          themes built in. You can use it in dashboards, admin pages, and micro front-end modules
          without re-building table behavior every time.
        </p>
      </section>

      <section className="advantages-grid">
        <article className="feature-card">
          <h3>Composable Features</h3>
          <p>Enable only what you need: pagination, sorting, search, filters, and CSV export.</p>
        </article>
        <article className="feature-card">
          <h3>Customizable Styling</h3>
          <p>Use built-in palettes or your own class names to match any design system.</p>
        </article>
        <article className="feature-card">
          <h3>Internal or External Control</h3>
          <p>Operate in client mode by default, or connect callbacks for server-side workflows.</p>
        </article>
      </section>

      <section className="examples-section">
        <h2>Examples</h2>
        <p>Scroll to compare common implementation patterns with rendered results.</p>

        <div className="example-card">
          <h3>Basic table setup</h3>
          <pre className="playground-code">
            <code>{`<TableComponent
  headers={headers}
  data={rows}
  title="Users"
  pagination={{ pageSize: 5 }}
  styling={{ colorPalette: "${resolvedColorPalette}" }}
/>`}</code>
          </pre>
          <TableComponent
            headers={tableHeaders}
            data={tableRows}
            title="Users"
            pagination={{ pageSize: 5 }}
            styling={{ colorPalette: resolvedColorPalette }}
          />
        </div>

        <div className="example-card">
          <h3>Search, filter, and export enabled</h3>
          <pre className="playground-code">
            <code>{`<TableComponent
  headers={headers}
  data={rows}
  search={{ show: true, searchableHeaders: ["name", "group"] }}
  filter={{ show: true, filterableHeaders }}
  export={{ show: true, exportLabel: "Export CSV" }}
  styling={{ colorPalette: "${resolvedColorPalette}" }}
/>`}</code>
          </pre>
          <TableComponent
            headers={tableHeaders}
            data={tableRows}
            title="Interactive users"
            pagination={{ pageSize: 5 }}
            search={{ show: true, searchableHeaders: ["name", "group"], searchAllFieldsLabel: "All fields" }}
            filter={{ show: true, filterableHeaders: tableFilterHeaders }}
            export={{ show: true, exportLabel: "Export CSV" }}
            styling={{ colorPalette: resolvedColorPalette }}
          />
        </div>
      </section>
    </div>
  );
};

export default HomePage;
