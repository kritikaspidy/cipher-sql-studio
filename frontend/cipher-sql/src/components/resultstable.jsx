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

function ResultsTable({ rows }) {
  if (!rows || rows.length === 0) {
    return (
      <div className="results-table__empty-state">
        <p className="results-table__empty-title">No rows returned</p>
        <p className="results-table__empty-text">
          Try adjusting your query conditions.
        </p>
      </div>
    );
  }

  const columns = Object.keys(rows[0]);

  return (
    <div className="results-table">
      <div className="results-table__wrapper">
        <table className="results-table__table">
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column}>{column}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((column) => {
                  const formattedValue = formatCellValue(column, row[column]);

                  return (
                    <td key={column}>
                      {formattedValue === null ? (
                        <span className="results-table__null">NULL</span>
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
  );
}

export default ResultsTable;