function formatCellValue(column, value) {
  if (value === null) return null;

  const columnName = String(column).toLowerCase();

  const isDateField =
    columnName.includes("created_at") ||
    columnName.includes("updated_at") ||
    columnName.includes("timestamp") ||
    columnName.includes("date");

  if (isDateField) {
    const parsedDate = new Date(value);
    if (!Number.isNaN(parsedDate.getTime())) {
      return parsedDate.toLocaleString();
    }
  }

  return String(value);
}

function SchemaViewer({ schemaData }) {
  if (!schemaData || schemaData.length === 0) {
    return (
      <section className="schema-viewer">
        <h2 className="schema-viewer__title">Schema</h2>
        <p className="schema-viewer__empty">No schema data available.</p>
      </section>
    );
  }

  return (
    <section className="schema-viewer">
      <div className="schema-viewer__header">
        <div>
          <p className="schema-viewer__eyebrow">Reference</p>
          <h2 className="schema-viewer__title">Schema & sample data</h2>
        </div>
      </div>

      <div className="schema-viewer__list">
        {schemaData.map((table) => (
          <article key={table.name} className="schema-viewer__table-card">
            {/* TABLE HEADER */}
            <div className="schema-viewer__table-head">
              <h3 className="schema-viewer__table-name">{table.name}</h3>
              <span className="schema-viewer__table-pill">
                {table.columns?.length || 0} columns
              </span>
            </div>

            {/* COLUMNS */}
            <div className="schema-viewer__columns">
              {table.columns?.map((col) => (
                <div key={col.column_name} className="schema-viewer__column-row">
                  <span className="schema-viewer__column-name">
                    {col.column_name}
                  </span>
                  <span className="schema-viewer__column-type">
                    {col.data_type}
                  </span>
                </div>
              ))}
            </div>

            {/* SAMPLE TABLE */}
            {table.sampleRows?.length ? (
              <div className="schema-viewer__sample-wrap">
                <p className="schema-viewer__sample-title">Sample rows</p>

                <div className="schema-viewer__table-scroll">
                  <table className="schema-viewer__sample-table">
                    <thead>
                      <tr>
                        {Object.keys(table.sampleRows[0]).map((key) => (
                          <th key={key}>{key}</th>
                        ))}
                      </tr>
                    </thead>

                    <tbody>
                      {table.sampleRows.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                          {Object.entries(row).map(([key, value]) => {
                            const formattedValue = formatCellValue(key, value);

                            return (
                              <td key={key}>
                                {formattedValue === null ? (
                                  <span className="schema-viewer__null">NULL</span>
                                ) : (
                                  formattedValue
                                )}
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}

export default SchemaViewer;