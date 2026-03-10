function SchemaViewer({ schemaData }) {
  if (!schemaData || schemaData.length === 0) {
    return <p>No schema data available.</p>;
  }

  return (
    <section className="schema-viewer">
      <h2 className="schema-viewer__title">Sample Data</h2>

      {schemaData.map((table) => (
        <div key={table.name} className="schema-viewer__table-card">
          <h3 className="schema-viewer__table-name">{table.name}</h3>

          <p className="schema-viewer__columns">
            Columns:{" "}
            {table.columns
              ?.map((col) => `${col.column_name} (${col.data_type})`)
              .join(", ")}
          </p>

          <pre className="schema-viewer__sample">
            {JSON.stringify(table.sampleRows, null, 2)}
          </pre>
        </div>
      ))}
    </section>
  );
}

export default SchemaViewer;