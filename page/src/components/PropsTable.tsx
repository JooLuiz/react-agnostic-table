type PropRow = {
  prop: string;
  type: string;
  defaultValue?: string;
  description: string;
};

type PropsTableProps = {
  title: string;
  rows: PropRow[];
};

const PropsTable = ({ title, rows }: PropsTableProps) => {
  return (
    <section className="props-table-section">
      <h3>{title}</h3>
      <div className="props-table-wrapper">
        <table className="props-table">
          <thead>
            <tr>
              <th>Prop</th>
              <th>Type</th>
              <th>Default</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.prop}>
                <td>{row.prop}</td>
                <td>
                  <code>{row.type}</code>
                </td>
                <td>{row.defaultValue ?? "-"}</td>
                <td>{row.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default PropsTable;
